---
paths:
  - "package.json"
  - "scripts/**"
  - "__tests__/**"
  - ".agents/skills/**"
  - ".claude/skills/**"
  - ".gemini/skills/**"
---

# プロセス衛生管理ルール (Process Hygiene Rules)

(最終更新日: 2026-09-26)

## 経緯

2026-09-26 に以下の2件の障害が発生した。再発を防ぐため本ルールを策定する。

1. **`bun test` 誤用によるテストプロセスのハングアップ** — `bun run test` の代わりに `bun test` を直接実行したため、Vitest 専用の API が解決されず CPU 99% を占有したまま終了しないプロセスが2本残留した（ CPU 累計 778 時間 / 889 時間消費）。
2. **ストレステスト用子プロセスの孤立（オーファン化）** — シェルスクリプト内で `(while true; do :; done) &` を 9 本起動したが、親プロセスが途中で切断されたため `kill $STRESS_PIDS` が実行されず、9 本の無限ループが 9 日間バックグラウンドに残留した。

---

## § 1. テスト実行コマンドの禁止事項（絶対厳守）

### 1-1. `bun test` は本リポジトリで**使用禁止**

このリポジトリのユニットテストは **Vitest** で実装されている。`bun test`（`run` なし）は Bun 組み込みのネイティブテストランナーを起動するため、以下の不整合が起きる：

- `// @vitest-environment jsdom` ディレクティブが無視される
- `vi.mock(...)` などの Vitest 固有 API が解決されない
- React Testing Library の JSDOM ライフサイクルが正常に動作しない
- プロセスがビジーウェイト状態に陥り、CPU 99% を占有したまま終了しない

| ❌ 禁止 | ✅ 正規 |
|---------|---------|
| `bun test <path>` | `bun run test <path>` |
| `bun test __tests__/...` | `bun run test __tests__/...` |
| `bun test` (引数なし) | `bun run test` |

**例外**: `test:md-to-html` スクリプト（`package.json` に定義済み）は Bun 組み込みランナーで動作するよう設計されているため、`bun run test:md-to-html` で実行する。`bun test` を直接呼ぶのは当該スクリプト定義内のみ許可する。

### 1-2. エージェントへの義務

エージェントがテストコマンドを提案・実行する際は、必ず以下を確認する：

```bash
# 正規コマンド例（常にこの形式を使う）
bun run test                             # 全テスト
bun run test __tests__/gcl/foo/bar/      # 特定ディレクトリ
bun run test __tests__/gcl/foo/bar.test.tsx  # 特定ファイル
```

---

## § 2. バックグラウンドプロセスを伴うシェルスクリプトの衛生管理

### 2-1. `trap` の必須使用

バックグラウンドプロセス（`&`）を起動するシェルスクリプトには、必ず以下のパターンで `trap` を設定すること：

```bash
# ✅ 正しい書き方 — 通常終了・Ctrl-C・TERM で子プロセスを停止する
# jobs -p はジョブリーダー PID のみを返しパイプラインメンバーを見落とす場合がある。
# スクリプト自身や呼び出し元のプロセスグループへの誤爆を防ぐため、自 pgid と一致しない
# （独立グループに分離された）場合のみグループ宛てに kill し、同一の場合は追跡 PID のみを終了する。
cleanup() {
  local pid pgid self_pgid
  self_pgid=$(ps -o pgid= -p $$ 2>/dev/null | tr -d ' ')
  for pid in $(jobs -p); do
    pgid=$(ps -o pgid= -p "$pid" 2>/dev/null | tr -d ' ')
    if [ -n "$pgid" ] && [ "$pgid" != "$self_pgid" ]; then
      kill -- "-$pgid" 2>/dev/null
    else
      kill "$pid" 2>/dev/null
    fi
  done
  wait
}
trap cleanup EXIT
trap 'cleanup; exit 130' INT   # ハンドラ後に必ず exit（しないとスクリプトが続行する）
trap 'cleanup; exit 143' TERM

# ...バックグラウンドプロセスを起動...
for i in $(seq 1 9); do
  (while true; do :; done) &
done
STRESS_PIDS=$(jobs -p)

# ...処理本体...
```

`INT` / `TERM` の trap はハンドラ実行後にスクリプトを継続させるため、必ず `exit` で終了させる。`EXIT` の trap は通常終了時の後始末として残す。ただし **`SIGKILL`（`kill -9`）は trap できず後始末は一切実行されない**ため、その場合は § 3 の検出スクリプト等による外部からのクリーンアップが必要になる。

### 2-2. ストレステストを行う場合の追加ルール

- バックグラウンドプロセスを起動したら、スクリプト末尾の `kill` より前に `echo "BGPIDs: $STRESS_PIDS"` 等でPIDを記録すること
- スクリプト終了後に、記録した PID を `ps -o pid=,ppid=,command= -p <記録したPID（カンマ区切り）>` で確認し、出力が空（全停止）であることを確認してからターミナルを閉じること。残存 PID の `ppid` が `1`（親が消え launchd/init へ付け替え済み）なら孤立プロセスとして `kill <pid>` で停止する。サブシェルは親の argv を継承し `ps` にループ本文が現れないため、`grep "while true"` では検出できない
- CI 環境以外（ローカル端末）で長時間のバックグラウンドプロセスを使ったテストを実行する場合は、当日中に必ず後始末を確認すること

---

## § 3. ゾンビプロセス検出スクリプト

本リポジトリには `scripts/check-zombie-tests.mjs` を用意している。疑わしい場合は次のコマンドで確認する：

```bash
bun run test:check-zombies
```

このスクリプトは以下を検出・報告する：

1. `bun test __tests__/` パターンのプロセス（Vitest 未経由の誤実行）
2. CPU 時間が 60 分超の `bun` / `node` プロセス（長時間ハング候補）
3. `bash -c` / `zsh -c` のインラインコマンドで `while true` を実行し、親から切り離された（`ppid` が `1`）プロセス（ストレステスト残骸候補。スクリプト内サブシェルは § 2-2 の PID 記録で確認する）

---

## § 4. このファイルの管理

このファイルは `.agents/rules/process-hygiene.md` が正本であり、以下の2つはミラーである：

- `.claude/rules/process-hygiene.md`
- `.gemini/rules/process-hygiene.md`

`__tests__/skills/agent-mirror-sync.test.ts` が3系統の同一性を機械的に検証する。
