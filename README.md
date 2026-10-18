# Cloud Infrastructure Studies

最終更新日: 2026-10-17

2026-10-17 AIP-C01 Domain 4移行: `/aws/generative-ai-developer-professional/domain4` に全3タスク・16スキル、84表（th234・td1388）、22図、140リスト項目、36外部リンク出現、2コード、26目次、練習問題12問を全文移行。原本の明色テーマ、点・番号・入れ子・インデント、シンタックスハイライト、単一/複数選択の採点・正誤・解説・得点・回答進捗・リセットを保持。全108横スクロール領域に固有の読み上げ名を付与。Domain 4は原本削除後103件、Chromeは1440/768/390px・全22SVGの自然倍率とviewBox内包・全問・導線・CSS破壊検出を含む6件成功。axe違反0・コンソールエラー0。原本400008バイトをバイト一致・SHA-256付きでローカルarchiveへ保存し、テストは固定Git由来fixtureのみを使用。全体Vitestは301ファイル・3021件中3020成功、失敗1件は作業前からのAIBナビ期待値。型検査・全体ESLint・対象Markdown lint成功。`bun run build`・`bun run lint` は2026-10-17の進捗同期で成功。npm・目視確認は未実施（Playwrightによる3画面幅の自動レイアウト検証は上記のとおり成功）。

2026-10-17 Domain 3の横線整理: 各Step・Task見出しの上罫線をなくし、原本の区切り線27本だけを保持。本文・表・図・リスト装飾は維持。Red `6b2bb8cf`、Green `74d8461a`。関連106件、1440/768/390pxの追加ブラウザ1件、対象ESLint成功。npm・ビルド未実行。

2026-10-17 AIP-C01 Domain 3移行: `/aws/generative-ai-developer-professional/domain3` に全4タスク・15スキル、44表・19図・189リスト項目・125外部リンク出現・練習問題10問を全文移行。ライト配色、点・番号・入れ子、300px目次、クイズの回答・正誤・解答表示・集計・リセットを保持。ホーム・Headerから詳細版へ移動可能。原本削除後のDomain 3検証105件、AIP関連回帰450件、1440/768/390pxを含むChrome 6件が成功。全図の自然倍率とviewBox内包、CSS破壊5種、DOM欠落5種、axe違反0を検証。図・表のキーボード横スクロールと閉じたモバイル目次の非表示を補完。原本306478バイトをバイト一致・SHA-256付きでローカルarchiveへ保存し、テストは固定Git由来fixtureのみを使用。実装 `75a38b02`、原本保存 `e9cbf3f3`。npm・ビルド未実行、目視確認はユーザー担当。最終全体テスト・型検査・lintの結果は移行進捗の現在地を参照。

2026-10-16 Domain 2練習問題の選択・採点: 全15問の選択肢の点を除き、11問をラジオボタン、4問をチェックボックスにした。選択後に「答えと解説」を開くと正誤を表示し、開いた後の選択変更にも追従。複数選択は正解集合の完全一致、未回答は案内表示。選択・開閉状態は問題ごとに独立し、原本の問題文・選択肢・解説は保持。採点22件と目次通知順の回帰を含む関連141件が成功。全体2808件中2807成功、既存AIBナビ期待値1件のみ失敗。ブラウザ9シナリオを検証し、1440pxで見つけた目次上書きは通知順に依存しない選択へ修正して3画面幅を再確認。最新実装HEAD `fa93bb13`（採点 `d11350ad`）。型検査・ESLint・Markdown lint成功。npm・ビルド未実行。

2026-10-16 Domain 2末尾案内文の削除: ユーザー指定により末尾の完了案内文を表示とテスト期待値から除外。原本監査fixtureは固定Gitの証跡として保持し、表示の期待値から対象段落と強調要素だけを除く。関連16ファイル・118件、1440pxブラウザ1件、対象ESLint成功。末尾文削除実装 `4d52589e`（Red `b0e57c77`）。npm・ビルド未実行。

2026-10-16 AIP-C01 Domain 2表示の再精査: 共通Mermaidのdark初期化から継承されていたmainBkg等をページ内のライト描画設定で明示的に置換し、非推奨initからconfig frontmatterへ移行。全42図のノード・状態図・シーケンス図の背景と実際の文字の色、およびコントラスト比を検証。Python・JSON・CloudWatch Logs Insightsの全9コードを原文・空行・インデントを保持してハイライトし、セクション境界と5つのTask見出しの横線を最大1本へ整理。15問は選択肢と解説を保持したカード形式へ改善。全文fixtureは改変せず、関連251件・ブラウザ8件と追加コントラスト検証が成功。表示改善実装 `aefa7b6e`。型検査・全体ESLint・対象Markdown lint成功。全体Vitestの最終結果はMIGRATION_PROGRESS.md参照。npm・ビルド未実行、目視確認はユーザー担当。

Google Cloud (GCP)、AWS、Cisco、CompTIA の資格試験対策およびエンジニアリング・DevOps名著（『Accelerate』、『Site Reliability Engineering』、『The DevOps Handbook』、『Release It!』、『Infrastructure as Code』など）の学習を目的とした、インタラクティブな学習用 Next.js アプリケーションです。

## 🚀 特徴

- **AWS AIP-C01 生成AI開発:** `/aws/generative-ai-developer-professional` に全5ドメイン・Step 1〜20・直前対策・ロードマップ・付録・参考資料を収録。76表・34図・60本文リスト項目・64外部リンク出現を保持し、原本300px目次と点・番号を原本のライトテーマで提供。ホームとHeaderから各ドメインへ移動でき、横スクロール図・表・コードはキーボードでも操作可能。

- **AIP-C01 ドメイン3詳細:** `/aws/generative-ai-developer-professional/domain3` に全4タスク・15スキル・44表・19図・練習問題10問を収録。原本のライト配色、点・番号・入れ子、目次、回答・正誤・解答表示・リセットを保持し、ホームとHeaderから移動できます。
- **AIP-C01 ドメイン2詳細:** `/aws/generative-ai-developer-professional/domain2` に全5タスク・25スキル・96表・42図・9コード・練習問題15問を収録。図の背景と文字のコントラスト、Python/JSON/Logs Insightsのハイライト、区切り線の整理、15問の選択式問題カードと解説開閉時の採点に対応。原本の点と番号、230項目の目次、解答の開閉を保持し、ホームとHeaderから移動できます。
- **AIP-C01 ドメイン1詳細:** `/aws/generative-ai-developer-professional/domain1` に全6タスク・28スキル・51表・21図を収録。原本のライト配色、点と番号、63項目の目次、16項目の学習チェックリストを保持し、ホームとHeaderから移動できます。

- **ネットワークを下位層から学ぶ:** [Tanenbaum & Wetherall『Computer Networks』着想の入門ガイド](app/recommended-books/computer-networks-tanenbaum/page.tsx)をBooksに追加。全10ステップ、21図、12表、10チェック項目を掲載。原本の全文・CSS宣言・リストの点と番号を固定fixtureとブラウザで検証。

- **セキュアなコンテナCI/CD実践:** [構築ガイド](app/gcl/hands-on/secure-cicd-pipeline-guide/page.tsx)をHands-onに追加。Artifact Registry・Binary Authorization・Cloud Buildの12セクション、4図、6表、9コード例を掲載。

- **詳細な試験ガイド & 名著解説 & 運用ツール:** Associate Cloud Engineer (ACE)、Generative AI Leader、Cloud Digital Leader (CDL)、Associate Google Workspace Administrator (AGWA)、Professional Cloud Network Engineer (PCNE)、Professional Cloud Architect (PCA)、Professional Agentic Architect、CCNA、CCNA Automation、CompTIA Network+、AWS SAA、AWS CloudOps Engineer Associate (SOA-C03)、AWS DVA-C02 ドメイン2（セキュリティ）、名著『Accelerate』、『Site Reliability Engineering』、『The DevOps Handbook』、『Release It!』、『Infrastructure as Code』、『TCP/IP Illustrated, Volume 1』、CLIコマンド実践ワンライナー集の広範なトピックを網羅。
- **AWS DVA-C02 開発:** `/aws/developer-associate/domain1` に全29スキル・116表・31図・18コード・15練習問題を収録。原本ライト配色・見出し書体・288pxサイドバーを保持し、本文は14px。リストの点・番号、コードの言語見出し、開閉式目次と解説を原本に合わせて移行。
- **AWS DVA-C02 セキュリティ:** `/aws/developer-associate/domain2` に24 Steps・110表・35図・40コード・12練習問題を収録。原本のライト配色・見出しフォントを保持し、ユーザー指定で本文・表・コード・目次・図を14pxに調整。20項目の自己採点チェックリスト、開閉式目次、番号・点を保持したリストを提供。
- **AWS DVA-C02 デプロイ:** `/aws/developer-associate/domain3` に4 Task・26 Steps・80表・39図・32コード・9チェック項目を収録。原本のライト配色・Source Serif 4・290pxサイドバーと、リストの点・継続番号を保持し、本文・図は14px。構文ハイライトは原本に近い色で実装。
- **データ駆動ナビゲーション:** `app/constants.ts` を正本とし、ハンバーガー Drawer が GCP/AWS/Cisco/CompTIA/Books/Tools をプロバイダ別に自動グルーピング。新試験・ガイド追加は ① `app/constants.ts` の `ALL_EXAMS` にエントリ追加 ② `app/globals.css` に `icon-theme-<id>` ユーティリティ追加 ③ ページ作成 の 3 ステップで Header は自動反映（直接編集不要）。
- **視覚的な学習体験:** セクションごとに最適化されたデザインテーマ（Aurora, Sapphire, Laboratory, Gold）。
- **統一ガイドレイアウト:** サイドバー付きガイドは左端固定の280pxナビゲーションと、残りの画面幅をすべて使うメインコンテンツへ統一。モバイルでは本文を幅100%へ切り替え。DVA-C02は原本優先の指定によりドメイン1が288px、ドメイン2が300px、ドメイン3が290px幅を保持。
- **最新の技術解説:** Hypercomputer, SAIF, 責任ある AI 6原則など、試験頻出の高度なトピックを体系化。
- **テスト済みのコンテンツ:** ユニットテスト（Vitest）と E2E テスト（Playwright）により、正確な情報提供と表示を保証。
- **モダンな実装:** ホームとガイドのセクション分割、ガイド単位のテーマトークン、CSS Modules、アクセシビリティ対応、専用SVGコンポーネントによる高品質なコードベース。

## 🛠 技術スタック

- **Frontend:** Next.js 16 (App Router), React 19
- **Styling:** Tailwind CSS 4, CSS Modules, Lucide React
- **Testing:** Vitest, Playwright
- **Runtime:** Bun / Node.js
- **Container:** Docker (Bun alpine, multi-stage build, standalone output)
- **Hosting:** Netlify (Free Plan, `@netlify/plugin-nextjs`)

## 📦 セットアップ

### 🐳 Docker で起動する（推奨）

Docker がインストールされていれば、ローカル環境への依存なしに起動できます。

```bash
# 開発サーバー（hot reload）
make dev

# 本番ビルド & 起動
make prod

# 停止
make down

# CSS キャッシュを含む一括リビルド
bun run docker:rebuild

# コマンド一覧
make help
```

| コマンド | 内容 |
|---|---|
| `make dev` | 開発サーバー（hot reload、ソース bind mount） |
| `make dev-d` | 開発サーバーをバックグラウンドで起動 |
| `make prod` | 本番イメージをビルドして起動 |
| `make build` | 本番イメージのみビルド |
| `make down` | コンテナを停止・削除 |
| `make clean` | コンテナ + 名前付きボリュームを削除 |
| `make prune` | イメージ・キャッシュも含めて全削除 |
| `make logs` | 本番コンテナのログを表示 |
| `make logs-dev` | 開発コンテナのログを表示 |
| `make shell` | 本番コンテナ内シェル（デバッグ用） |
| `make shell-dev` | 開発コンテナ内シェル（デバッグ用） |
| `bun run docker:rebuild` | コンテナ停止 → 本番イメージ作成 → 開発コンテナ再構築・起動 |

> **本番イメージサイズ:** standalone モードにより約 256MB（通常の Next.js + node_modules 全体比で大幅削減）
> **注意:** `next.config.ts` の `output` は環境変数 `NEXT_OUTPUT_MODE` で切り替え。Docker は `standalone`、Netlify は未設定（SSR）。

---

### ☁️ Netlify へのデプロイ

`netlify.toml` に設定済み。Netlify 管理画面でリポジトリを接続するだけで自動デプロイが有効になります。

| 設定 | 値 |
|---|---|
| ビルドコマンド | `bun run build` |
| パブリッシュディレクトリ | `.next` |
| プラグイン | `@netlify/plugin-nextjs` |

---

### ローカル（Bun）で起動する

**【パッケージマネージャー方針】**
本リポジトリではコマンドの実行に **Bun** を使用します。

#### プリレクイジット

- Bun 1.x

#### インストール

```bash
bun install
```

#### 開発サーバーの起動

```bash
bun run dev
```

#### ビルド

```bash
bun run build
```

#### Lint

```bash
bun run lint
```

#### Markdown lint

```bash
bun run markdownlint -- path/to/file.md
```

## 🧪 テストの実行

### ユニットテスト (Vitest)

```bash
bun run test
```

デプロイガイドの全量テストと、5種類の移行漏れを検出する検証は次のコマンドで実行できます。

```bash
bun run test -- __tests__/aws/developer-associate/domain3
bun scripts/check-dva-deployment-mutations.mjs
```

### E2E テスト (Playwright)

```bash
# ブラウザのインストール（初回のみ）
bunx playwright install

# テスト実行
bun run test:e2e
```

### Performance テスト (Playwright `perf` project)

主要 7 ページの Core Web Vitals (LCP / CLS / TBT) を `e2e/perf-budgets.json` の閾値と比較します。

```bash
bun run test:perf
```

深掘り分析用に Lighthouse CI を手動起動できます（`.lighthouseci/` に HTML/JSON が出力されます）。

```bash
bun run build && bun run perf:report
```

### Security テスト (`bun audit` ラッパー)

`bun audit --json` を集計し、`high` / `critical` の脆弱性検出時に exit 1 を返します。

```bash
bun run test:security
```

### md-to-html 監査の自己テスト

ガイド Markdown を単一 HTML へ変換する `md-to-html` スキルには、転写漏れとデザイン漏れを
検出する 2 本の監査スクリプトが同梱されています。その自己テストを実行します。

```bash
bun run test:md-to-html
```

## 📂 ディレクトリ構造

- `app/`: 各試験セクションのページとスタイル。
- `components/`: ヘッダー、フッター等の共通コンポーネント。
- `__tests__/`: ユニット・コンポーネントテスト。
- `e2e/`: Playwright によるシナリオテスト。

## 📝 ライセンス

Private Project

## 🤖 AI Skills (AI エージェント向け)

本プロジェクトの開発や移行作業を補助するための専用 AI スキルが用意されています。

- **`infra-md-to-nextjs-migration.skill`**: Markdown 形式の試験対策コンテンツを `Next.js` アプリケーションへ安全に移行するためのルールと手順（JSX構造、SVG変換、TypeScript Strict対応）を定義したスキルです。

**Gemini CLI での利用方法:**

```bash
# プロジェクト内にインストール
gemini skills install infra-md-to-nextjs-migration.skill --scope workspace
```

※ インストール後、Gemini CLI の対話セッションで `/skills reload` を実行して有効化してください。

セキュアCI/CDガイドの横長図（図3・図4）は、左端がスクロール不能にならない安全な中央寄せへ修正済み（2026-10-02）。
