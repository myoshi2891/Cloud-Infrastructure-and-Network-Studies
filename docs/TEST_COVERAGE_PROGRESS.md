# テストカバレッジ・網羅性進捗レポート

最終更新日: 2026-10-07

[coverage-dashboard.html](coverage-dashboard.html)（2026年10月7日JSTに `bun scripts/generate-coverage-dashboard.mjs` で再生成）の静的スキャン結果です。テストファイルの存在と対応付けを集計し、実行成功や行カバレッジを保証する指標ではありません。AWS DVA-C02 ドメイン2の全量・CSS・操作・ナビ検証26件と、3画面幅のE2E検証を反映しています。

---

## 1. 全体サマリー

プロジェクト全体のテストカバレッジとリソース状況は以下の通りです。

- **ソースファイル総数:** 822 ファイル
- **テストカバー済みソース数:** 250 ファイル
- **全体カバレッジ達成率:** **30%**
- **テストファイル総数:** 218 ファイル (Vitest 4.x + Playwright 1.x)

---

## 2. ドメイン別カバレッジマトリクス

各試験対策ページおよび共通モジュールのテストカテゴリ別の網羅状況です。

> **集計スコープ:** 本マトリクスは `scripts/lib/classifier.mjs` の `DOMAINS` / `domainOf()` が分類する 9 ドメイン **455 ファイル（カバー済み 113 ファイル / 25%）** のみを対象とします。全体サマリー（822 ファイル / 250 ファイル）との差分 **367 ファイル（うちカバー済み 137 ファイル）** は、DVA・Booksを含む、現時点で `domainOf()` が `null` を返す未分類ソースです。これらをドメイン行として集計するには `classifier.mjs` の `DOMAINS` / `domainOf()` へのドメイン追加が必要です。

| ドメイン | 進捗 (カバー数/総数) | 達成率 | Unit | Integration | E2E | Smoke | Visual | A11y | Perf | Security |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Associate Cloud Engineer (ACE)** | 14 / 42 | **33%** | ⚠️ 33% | ❌ 0% | ⚠️ 2% | ❌ 0% | ✅ 実装 | ✅ 実装 | ✅ 実装 | ✅ 実装 |
| **Generative AI Leader (GCL)** | 5 / 24 | **21%** | ⚠️ 21% | ❌ 0% | ⚠️ 4% | ❌ 0% | ✅ 実装 | ✅ 実装 | ✅ 実装 | ✅ 実装 |
| **Cloud Digital Leader (CDL)** | 21 / 167 | **13%** | ⚠️ 13% | ❌ 0% | ⚠️ 1% | ❌ 0% | ✅ 実装 | ✅ 実装 | ✅ 実装 | ✅ 実装 |
| **Google Workspace Admin (AGWA)** | 11 / 35 | **31%** | ⚠️ 31% | ❌ 0% | ⚠️ 3% | ❌ 0% | ✅ 実装 | ✅ 実装 | ✅ 実装 | ✅ 実装 |
| **Professional Cloud Network Engineer (PCNE)** | 16 / 43 | **37%** | ⚠️ 37% | ❌ 0% | ⚠️ 2% | ❌ 0% | ✅ 実装 | ✅ 実装 | ✅ 実装 | ✅ 実装 |
| **PCNE Step-by-Step** | 7 / 11 | **64%** | ⚠️ 55% | ❌ 0% | ⚠️ 9% | ❌ 0% | ✅ 実装 | ✅ 実装 | ✅ 実装 | ✅ 実装 |
| **Cisco CCNA** | 22 / 66 | **33%** | ⚠️ 33% | ❌ 0% | ❌ 0% | ❌ 0% | ❌ 0% | ❌ 0% | ❌ 0% | ✅ 実装 |
| **Cisco DevNet / Automation** | 2 / 21 | **10%** | ⚠️ 10% | ❌ 0% | ❌ 0% | ❌ 0% | ❌ 0% | ❌ 0% | ❌ 0% | ✅ 実装 |
| **共通 (components / lib / navigation)** | 15 / 46 | **33%** | ⚠️ 28% | ⚠️ 9% | ⚠️ 2% | ⚠️ 2% | ✅ 実装 | ✅ 実装 | ✅ 実装 | ✅ 実装 |

> **凡例:**
> - ✅ **実装済み（Visual / A11y / Performance / Security）**: 対応テストが1件以上
> - ✅ **実装済み（その他のカテゴリ）**: 80% 以上カバー
> - ⚠️ **部分的**: 0%〜80% 未満カバー
> - ❌ **未実装**: 対応テスト 0 件

---

## 3. テストカテゴリ別の網羅性と課題

### ① Unit（単体テスト）

DVAセキュリティは原本fixtureに対して見出し249件・表110件・リスト234項目・外部リンク158件・コード40件・図35件を全文と順序で照合。全CSS宣言、コードの空行と余白、点・番号、チェック20項目、目次26件も検証する。DVAは現在の9ドメイン分類外で、全体集計に含める。

セキュアCI/CDガイドには原本全文・構造・CSS宣言・コード枠のカスケード・目次操作・ナビ登録を検証する19テストを追加。図集計器の回帰テストも追加。Hands-onは現在の9ドメイン分類外で、全体サマリーの対象には含まれる。

- **現状**: PCNE（37%）や PCNE Step-by-Step（55%）など、比較的新しい移行セクションでは TDD 開発ルールに従って単体テストが整備されています。AGWA は Section 1〜6 を含む12テストファイルで、移行本文、テーブル構造、リンク順序、Section 2/4のスクロール末尾判定を検証しています。CCNA（33%）/ DevNet（10%）は独立ドメインとして集計されています。
- **課題**: 移行元の HTML から復元されたコンポーネントや追加コンポーネントのテストカバレッジ底上げが必要です。

### ② Integration（結合テスト）

DVAカードとAWS Headerナビへの登録、URL・表示名・色トークンを検証する2件を追加。

- **現状**: 共通ロジックである `lib/navigation.test.ts`, `lib/recentPages.test.ts`, `lib/utils.test.ts` の3件が共通ソース46件中4件を部分的（9%）にカバーし、正準対象 `lib/recentPages.ts`、`lib/utils.ts`、`app/navigation.ts` をすべて保護します。
- **課題**: 試験ドメインごとのコンポーネント間連携（例: `navigation` から各セクションページへの遷移ロジック）を検証する結合テストが全ドメインで未実装です。

### ③ E2E（エンドツーエンドテスト）

DVAセキュリティの1440px・768px・390pxで、全表・全図・リストの点と番号・目次とhash/focus・固定Headerの遮蔽・横スクロール・チェック操作・図の自然倍率・コンソールエラー・axeを検証。3件成功、各幅で違反0件。

`e2e/secure-cicd-pipeline-guide.spec.ts` に1440px/390pxの図倍率・リスト・番号・アンカー検証を追加したが、ユーザー指示により実行しない。実行済みとして扱わない。

- **現状**: GCP系6ドメインと共通で Playwright による基本的なナビゲーションフローをカバーしています。新たに独立集計したCCNA / DevNetは0%です。
- **課題**: 主要なユーザー導線や、アコーディオン・スクロールスパイ・ドロワー開閉などのインタラクティブ操作が完全にカバーされていません。

### ④ Smoke（スモークテスト）

- **現状**: `__tests__/smoke.test.tsx` の 1 件のみ。
- **課題**: 各ドメインがビルド後に正常に描画できるかを検証する軽量なスモークテストが不足しています。

### ⑤ 横断品質（Visual, A11y, Performance, Security）

- **現状**: 従来のGCP系6ドメインと共通では Visual / A11y / Performance / Security が実装済みです。新たに独立集計したCCNA / DevNetはSecurityのみ対象テストがあり、他3カテゴリは未実装です。
- **課題**: CCNA / DevNetを横断E2Eの対象へ追加したうえで、`.github/workflows/` への CI 統合とLCP / CLS / TBT閾値の段階的なチューニングが必要です。

---

## 4. 優先度別ネクストアクション

- [x] DVA-C02 ドメイン2の全量移行・リスト装飾・ナビ登録・3画面幅E2E（a11y違反0件）。

- [x] セキュアCI/CDガイドの全量移行・CSS宣言照合・コード枠回帰テスト・Hands-on統合（2026-10-02）。
- [ ] 既存6失敗を別タスクで調査する（PAA Section 5の表セル・リスト2件、Header SAAの重複リンク1件、DevNet表セル1件、Ciscoテーマ所有権2件）。

ダッシュボードで推奨されている優先度順のタスクリストです。

### 🔴 P0: 最優先タスク (完了)

- [x] **共通基盤カバレッジ補強**
  - **対象**: `lib/recentPages.ts`, `lib/utils.ts`, `app/navigation.ts`
  - **内容**: 主要ユーティリティの回帰防止のため、Integration/Unit テストを追加。
  - **推奨ツール**: Vitest

### 🟡 P1: 重要タスク（ドメイン品質・E2E） (完了)

- [x] **`cloud-digital-leader` クリティカルパス E2E テストの作成**
  - **内容**: 主要セクション of ユーザー導線自動回帰検出用テスト。
  - **推奨ツール**: Playwright
- [x] **`pcne` クリティカルパス E2E テストの作成**
  - **推奨ツール**: Playwright
- [x] **`pcne-step` クリティカルパス E2E テストの作成**
  - **推奨ツール**: Playwright
- [x] **`agwa` ページ単体テストの追加**
  - **内容**: Section 3 テストを正規配置へ移動し、移行抽出ヘルパーと Mermaid モックを共通化。Section 4 はリンク順序と列見出し数を厳密検証。
  - **推奨ツール**: Vitest + React Testing Library
- [x] **`agwa` クリティカルパス E2E テストの作成**
  - **推奨ツール**: Playwright

### 🟡 P1: Cisco E2E（未完了）

- [ ] **`ccna` クリティカルパス E2E テストの作成**
  - **推奨ツール**: Playwright
- [ ] **`devnet` クリティカルパス E2E テストの作成**
  - **推奨ツール**: Playwright

### 🔵 P2: 横断品質（完了）

- [x] **サイドバーガイドの横断レイアウト回帰テスト**
  - **対象**: AWS / Cisco / GCP のサイドバー付き全24スタイルシート
  - **内容**: 左端固定280pxサイドバー、残り幅100%のメイン領域、レスポンシブ時の幅100%復帰を73ケースで検証。
  - **推奨ツール**: Vitest
- [x] **Visual 回帰テストの導入**
  - **対象**: 導入時点の主要7ドメイン
  - **内容**: レンダリング崩れ（特にダークモードやレスポンシブ表示）の自動検知。
  - **推奨ツール**: Playwright (`toHaveScreenshot`)
- [x] **A11y (アクセシビリティ) 自動テストの導入**
  - **内容**: `aria-label` の欠損やコントラスト比不足などの WCAG 違反の自動監視。
  - **推奨ツール**: `@axe-core/playwright`
- [x] **Performance テストの導入**
  - **対象**: 全ドメインの主要 7 ページ（`e2e/helpers/critical-pages.ts`）
  - **内容**: `bun run test:perf` で Playwright `perf` project が LCP / CLS / TBT を計測し、`e2e/perf-budgets.json` の閾値と比較する。本テストは主に dev サーバー計測を対象としており、その目的は CI/CD パイプラインにおける「テスト疎通の確認（疎通確認）」です。バジェット値は本番ビルドの実測値に基づいて段階的に引き締め調整されています。また、深掘り分析用に `bun run perf:report`（`@lhci/cli` autorun）も併設。
  - **推奨ツール**: Playwright `PerformanceObserver` + `@lhci/cli`
- [x] **Security テストの導入**
  - **対象**: `package.json` の全依存パッケージ
  - **内容**: `bun run test:security` で `scripts/security-audit.mjs` が `bun audit --json` を起動し、`high` / `critical` 検知時に exit 1 を返す。
  - **推奨ツール**: `bun audit`（Bun 1.3.12 同梱）

---

## 5. 主な未カバーソースファイル一覧（抜粋）

カバレッジ向上のターゲットとなる主な未カバーファイルです。

- **AGWA (Google Workspace Admin)**
  - `app/gcl/agwa/section1/page.tsx`
  - `app/gcl/agwa/section1/page.css`
- **ACE (Associate Cloud Engineer)**
  - `app/gcl/associate-cloud-engineer/architecture-guide/page.tsx`
  - `app/gcl/associate-cloud-engineer/domain1/page.tsx`
  - `app/gcl/associate-cloud-engineer/domain2/Chapter17.tsx`
- **CDL (Cloud Digital Leader)**
  - 各セクションの `DiagramSVG.tsx` および `SectionCard.tsx`
  - `section1` から `section4` までのコンポーネント群（`Section0.tsx` 〜 `Section14.tsx` 等）
- **GCL (Generative AI Leader)**
  - `app/gcl/genai-leader/section1/components/` 内の各セクションコンポーネント
  - `app/gcl/genai-leader/section2/components/` 内の各セクションコンポーネント
- **Cisco CCNA**
  - 各ガイドの `NavBar.tsx` と `constants.ts`
  - 一部ガイドの本体コンポーネントと `page.tsx`
- **Cisco DevNet / Automation**
  - Associate / Professionalの `NavBar.tsx`, `constants.ts`, `page.tsx`
  - `app/cisco/devnet-associate/DevNetAssociateGuide.tsx`

---

## 6. テスト実行とダッシュボード更新コマンド

テストの追加や修正を行った後は、以下のコマンドを実行して品質維持とダッシュボードの更新を行います。

```bash
# 1. 単体・結合テストの実行 (Vitest)
bun run test

# 2. E2Eテストの実行 (Playwright)
bun run test:e2e

# 3. カバレッジダッシュボードの再生成
bun run dashboard
```

*(※ `bun run dashboard` を実行すると [coverage-dashboard.html](coverage-dashboard.html) がスキャンされ最新情報に更新されます。)*

---

## 7. 次回セッションでのテスト追加再開プロンプト

最新実装HEADは `0807b644`。AWS DVA-C02 ドメイン2を `/aws/developer-associate/domain2` に移行し、ホーム・AWSナビへ登録済み。移行・統合26件、幅契約とミラー同期を含む関連170件が成功。1440px・768px・390pxのE2E 3件も成功し、各幅でaxe違反0件。本文・表行・図・リスト点の削除を検出する変異チェック4件も成功。原本はバイト一致を確認してローカルarchiveへ退避した。今回の全体テストと型・Lintの最終結果は2026-10-07実行記録を参照。次回は既存の失敗を別タスクで調査する。今回のユーザー指示によりnpm・ビルドは未実行、目視確認はユーザーが担当する。

あなたは熟練したテストエンジニアであり、Next.js (App Router) / TypeScript / Vitest / Playwright のテストスペシャリストです。
現在、[docs/TEST_COVERAGE_PROGRESS.md](TEST_COVERAGE_PROGRESS.md) の既存 **🔴 P0 / 🟡 P1 / 🔵 P2** は完了済みですが、CCNA / DevNetの独立集計によりCisco向けP1 E2Eが新たに未完了として可視化されています。登録済み43スタイルシートの横断レイアウト契約は `guide-content-widths.test.ts` の130ケースで保護されています。DVAの幅・固定配置は専用の移行テストで保護されています。次フェーズではCisco E2Eを優先し、以下の候補もステップバイステップで進めてください。

AGWA の移行検証は Section 1〜6 と共有抽出ヘルパーへ同期済みです。最新の実行記録は 2026-08-15T03:13:14Z、対象コミット `9ddf12a`、スコープは `bun run test` による全体Vitestで、131ファイル・1118件が成功しました。`bun run lint` も全体スコープで成功しています。

直近のレビュー対応では、Section 4 NavBar の最下部スクロール回帰テストを追加し、Section 5 のテーブル構造検証と Mermaid モックのアクセシビリティ契約を強化しました。Section 6 は `components/sections/` と CSS Modules の構成へ移行済みです。ユーザー指示に従い、ビルドと目視確認は実施していません。

以下の要件を厳守して実装を進めてください。
1. **TDD（テスト駆動開発）の厳格な遵守**:
   正準の `.agents/rules/tdd-commit-workflow.md`（`.claude` / `.gemini` は同期ミラー）に従い、必ず以下の 4 ステップを繰り返してください。
   - **Step 0 — Inventory**: 移行タスクでは移行元からインベントリを機械抽出し、実装前にコミットする。 (`chore(migration): add content inventory for ...`)
   - **Step 1 — Fail**: まずテストコードを作成し、失敗（Fail）することを確認してコミットする。 (`test: add failing tests for ...`)
   - **Step 2 — Pass**: テストを通す最小限の実装（または既存コードの修正）を行いコミットする。 (`feat/fix/test: implement ... to pass tests`)
   - **Step 3 — Refactor**: コード整理・リファクタリング、ビルド確認後にコミットする。 (`refactor: ...`)
2. **コミットの義務とトークン消費抑制**:
   無駄なループを防ぐため、1つのテストファイル（または1つの小さなテストケース群）ごとに実装と検証を終えること。ユーザーがコミットを明示的に認可している場合だけ、その都度 `git add` と `git commit` を行って進捗を確定させてから、次のテスト作成に進むこと。未認可ならコミット可能な状態で停止すること。
3. **個人情報 (PII) の排除**:
   追加・作成するテストコードやドキュメントには、絶対パス（例: `/Users/username/...`）などの個人を特定できる情報を含めず、常にリポジトリ相対パスや環境依存しない形式で記述すること。
4. **次フェーズ候補（🟢 P3: 残課題）**:
   - **CI 統合**: `.github/workflows/` を追加し、`bun run test` / `bun run test:e2e` / `bun run test:perf` / `bun run test:security` を PR ゲートとして自動実行する。
   - **Smoke テスト拡充**: 「2. ドメイン別カバレッジマトリクス」で全ドメインが ❌ 0% の Smoke 列を埋めるため、各ドメインのトップページに対する軽量レンダリングテストを追加する。
   - **Integration テスト導入**: ドメインごとの「ナビ → セクション遷移」「ScrollSpy → SectionNav 連動」等のコンポーネント間連携テストを Vitest + Testing Library で追加する。
   - **Unit カバレッジ底上げ**: CDL（13%）/ GCL（21%）/ DevNet（10%）の未カバーコンポーネントから優先的に追加する。具体的ターゲットは「5. 主な未カバーソースファイル一覧」を参照。
   - **Performance バジェットのチューニング**: `e2e/perf-budgets.json` の初期バジェット値は、本番ビルドの実測値に基づいて段階的に引き締め調整されました（LCP: 3000ms, CLS: 0.1, TBT: 200ms）。

開始時は上記候補からひとつを選び、対応する優先度ラベル（🟢 P3）と「Smoke / Integration / Unit / CI / Perf チューニング」のどのトラックかを宣言してから着手してください。

## 2026-10-07: AWS DVA-C02 ドメイン2移行の実行記録

- 対象: `app/aws/developer-associate/domain2/`。最新実装 `0807b644`。静的集計はソース822件・対応250件（30%）・テストファイル218件。DVAは現在のドメイン分類外。
- 原本固定インベントリ: h1:4、h2:26、h3:219、h4:0、表110件（th:264、td:1348）、リスト234項目、外部リンク158件、Mermaid35図、コード40件、本文177件。
- 移行・統合26件成功。サイドバー幅契約130件、3系統ミラー同期14件を含む関連170件成功。
- 原本HTML・Markdownを直下とarchiveの双方から一時的に外したfixture-only実行でも26件成功。復元後の原本はGit固定リビジョンとバイト一致。原本退避後に同時実行した初回はチェック操作が5秒の制限に達したため、判定を維持して静的本文をmemo化し、再描画を防ぐ回帰テストとfixture-only実行で成功を確認した。
- 本文・表行・図・リスト点を一時的に削除した4変異を、それぞれ照合テストが検出。原状復元済み。
- E2E: 1440px・768px・390pxの3件成功（最終の本文memo化後も成功）、各幅でaxe違反0件。実SVG35図のDSL描画、自然幅、チェック操作後の幅不変、点・番号・チェックマーカーを検証。
- TypeScript、全体ESLint、対象Markdown lint成功。npmと本番ビルドはユーザーの禁止に従い未実行。目視確認はユーザー担当。
- 最終全体Vitestは212ファイル・2236件中2230成功・既存6失敗。追加の失敗なし。移行前は210ファイル・2210件のうち2204成功・既存6失敗（PAA Section 5のtd/li、Header SAAのリンク重複、DevNet td、Cisco theme-token-ownershipの2件）。
- 手順・コマンド変更なし。ルール/スキルの3系統同期は既存の14テストで確認済み。

## 2026-10-04: Tanenbaumガイド移行の実行記録

- 対象実装: `5eb7ed51`。ルート: `/recommended-books/computer-networks-tanenbaum`。
- 原本固定fixtureでh1:1・h2:17・h3:31・表12件・th39件・td235件・本文リスト64項目・外部リンク26件・本文注釈66件・Mermaid21図を全文・順序・件数まで照合。原本CSSの全宣言もトークン解決後に照合する。
- ガイド23テストを含む関連141テスト成功。図は実Mermaidパーサーでも21点すべて解析成功。
- 原本HTML・Markdown・archiveを持たない独立ディレクトリでも23テスト成功。テストはコミット済みfixtureのみを期待値として使う。
- 本文削除・表の1行削除・図の1点削除・リストの点削除で、各々のテストが失敗することを実行確認し、原状復元した。
- `bun run test:e2e -- --config=playwright.tanenbaum.config.ts --workers=1`: 3001番で1440px・768px・390pxの3件成功。点・番号・チェックリストのマーカー非表示、21図の自然倍率とスクロール後の保持、47目次リンク、フォーカス、チェック数更新、横はみ出しなし、コンソールエラーなし、各画面幅でa11y違反0件を検証。
- ブラウザ検証でチェックリストのCSS優先順位とスクロール領域のキーボード操作を検出し、Redコミット後にページ側で修正。共通Mermaidコンポーネントは変更していない。
- 全体Lint・型チェック成功。変更したMarkdownのlintも0件。
- 初回全体Vitestは2115成功/6失敗（既知2件と並列実行時のタイムアウト4件）。並列数2の再実行は2119成功/既知2失敗（最終の追加2テストより前）。既知失敗はPAA Section 5の表セル・リスト照合で、本移行の対象外。
- 最終実装 `5eb7ed51` の `bun run test -- --maxWorkers=2`: 206ファイル中205成功、2123テスト中2121成功・同じ既知2失敗。実行開始2026-10-04 00:12:45 JST、172.59秒。タイムアウトは再発していない。
- npm・ビルドはユーザー指定により実行していない。目視確認は未実施（自動のDOM検証とPlaywright検証で代替）。初期のE2E試行はポート制限・Chromium未導入・3000番の別サーバーの404で失敗したが、3001番で上記の検証が成功している。
- 静的カバレッジ: ソース725件、カバー241件（33%）、テストファイル210件。Booksはドメイン表では未分類として全体集計に含まれる。

## 2026-10-02: セキュアCI/CDガイド移行の実行記録

- [x] 固定インベントリ3種で本文・構造・CSS・図を全量照合。
- [x] Hands-on登録、原本アーカイブ、共有ヘルパー移動を段階別コミット。
- [x] `bun run test -- secure-cicd-pipeline-guide`: 18件成功。
- [x] `bunx --no-install tsc --noEmit` と `bun run lint`: 成功。
- [x] 原本を直下から外した状態の全体Vitest: 203ファイル中202成功、2094件中2092成功・既知の2件失敗（CSS追加回帰テストより前）。移行前は200ファイル中199成功、2076件中2074成功・同じ2件失敗。
- [x] 最終実装 `6d9e25df` と共有ヘルパー参照同期後の全体Vitest: 203ファイル中202成功、2095件中2093成功・既知の2件失敗。今回の18テストとミラー同期14テストは全件成功。
- ビルド・npmは禁止、Playwright・目視確認はユーザーが対応する。初回Playwright試行はサンドボックスの接続制限（EPERM）で実行前に停止し、ブラウザ起動・検証は行っていない。

### 2026-10-02: CI/CD図3・図4の左端切れ修正

ページCSSの `.mermaid-target { justify-content: center; }` が、共通Mermaidコンポーネントの `safe center` を詳細度で上書きし、横長SVGの左側が負のスクロール領域へはみ出していた。ページの指定を `safe center` に変更し、収まる図は中央寄せ、収まらない図は左寄せへ退避させる。図のDSL・自然倍率・文字サイズは保持。

Red: `39af7f41`、Green: `1b2c58d0`。図3・図4の内外ラッパーのCSSカスケードを再現する回帰テストを追加。`bun run test -- secure-cicd-pipeline-guide MermaidDiagram guide-content-widths` は156件成功（ガイドは19件）。ブラウザの描画・スクロール位置の実測はユーザー対応、npm・ビルド・Playwrightは実行しない。
