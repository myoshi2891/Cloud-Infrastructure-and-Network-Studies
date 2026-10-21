# Project Overview: Cloud Infrastructure Studies

Updated 2026-10-20

2026-10-20 ANS-C01 Domain 2移行: `/aws/advanced-networking-specialty/domain2` に全4タスク・57表（th150・td803）・26図・11コード・86リスト項目・43外部リンク出現・59目次・確認問題8問を全文移行。原本のライト配色・300px目次・点と番号・インデント・構文ハイライト・解答解説の折りたたみを保持。操作状態はClientのNavBarに限定し、本文はServer Component。ホームとHeaderのDomain 1導線を保持したままDomain 2を追加。原本HTML・Markdownは `archive/Aws/html|md/advanced-networking-specialty/domain2/` へバイト一致で保存後に直下から削除（`fd574555`。保存時のHTML SHA-256 `c1842b2f…` は修正前の旧版で廃止。現在のarchive原本は固定Git `c5c1000f` とバイト一致するHTML SHA-256 `aa28eb6d…` で、再生成fixtureの元）し、固定Git由来fixtureで全量照合する。コミット・npm・ビルド未実行。手動の目視確認は未実施で、Chrome自動検証（1440/768/390px・導線を含む5件成功）で代替。検証結果はMIGRATION_PROGRESS.mdの最新記録を参照。

2026-10-20 ANS-C01 Domain 1移行: `/aws/advanced-networking-specialty/domain1` に全6タスク、75表（th189・td1016）、15図、7コード、301リスト項目、94外部リンク出現、12目次、練習問題6問、チェック10項目を全文移行。原本のライト配色・300px目次・点と番号・独自カウンター・インデント・コードの色/太字/斜体を保持。単一選択4問・複数選択2問の即時採点、選択変更、解説開閉、集計・リセットとチェック完了数・進捗・クリアに対応。ANSをホームとHeaderへ登録し、Domain 1へ直接接続。対象16ファイル・140件、Chromeの1440/768/390pxを含む5件が成功。全リストの計算済みCSSを原本CSSの隔離iframeと全量照合し、全15SVGの自然倍率・viewBox内包、独自番号、キーボード操作、axe違反0・コンソールエラー0を確認。全体Vitestは329ファイル・3269件すべて成功。型検査・全体ESLint・最終変更箇所のESLint・対象Markdown lint成功。原本HTML・Markdownは保持し、テストは固定Git由来fixtureを使用。npm・ビルドは依頼に従い未実行、目視確認はユーザー担当。最新実装HEAD `d9195d44`。

2026-10-20 AIP-C01 Domain 5移行: `/aws/generative-ai-developer-professional/domain5` に全2タスク・14スキル、47表（th119・td713）、18図、206リスト項目、92外部リンク出現、2コード、41目次、練習問題5問、チェック23項目を全文移行。原本のライト配色・300px目次・点と番号・入れ子・インデント・Python/Logs Insightsの色分けを保持。全問の提出・採点・正誤・解説・進捗・リセットとタスク別チェック数を検証。原本Git由来fixtureで全文・順序・構造・全CSSを照合し、本文等7種の欠落とCSS破壊5種を検出。対象12ファイル・88件とChromeの1440/768/390pxを含む4件が成功し、全18SVGの自然倍率・viewBox内包・axe違反0・コンソールエラー0を確認。原本由来の問題補助文のコントラスト不足だけを既存の濃い補助文字色へ補正。HTML・Markdown原本は保持し、テストはarchiveに依存しない。npm・ビルドは依頼に従い未実行。目視確認はユーザー担当。全体Vitestは313ファイル・3128件すべて成功。型検査・全体ESLint・最終変更箇所のESLint・対象Markdown lint成功。最新実装HEAD `efa67cc5`（最終表示修正 `ce42e381`）。

2026-10-17 AIP-C01 Domain 4移行: `/aws/generative-ai-developer-professional/domain4` に全3タスク・16スキル、84表（th234・td1388）、22図、140リスト項目、36外部リンク出現、2コード、26目次、練習問題12問を全文移行。原本の明色テーマ、点・番号・入れ子・インデント、シンタックスハイライト、単一/複数選択の採点・正誤・解説・得点・回答進捗・リセットを保持。全108横スクロール領域に固有の読み上げ名を付与。Domain 4は原本削除後103件、Chromeは1440/768/390px・全22SVGの自然倍率とviewBox内包・全問・導線・CSS破壊検出を含む6件成功。axe違反0・コンソールエラー0。原本400008バイトをバイト一致・SHA-256付きでローカルarchiveへ保存し、テストは固定Git由来fixtureのみを使用。全体Vitestは301ファイル・3021件中3020成功、失敗1件は作業前からのAIBナビ期待値。型検査・全体ESLint・対象Markdown lint成功。`bun run build`・`bun run lint` は2026-10-17の進捗同期で成功。npm・目視確認は未実施（Playwrightによる3画面幅の自動レイアウト検証は上記のとおり成功）。

2026-10-17 Domain 3の横線整理: 各Step・Task見出しの上罫線をなくし、原本の区切り線27本だけを保持。本文・表・図・リスト装飾は維持。Red `6b2bb8cf`、Green `74d8461a`。関連106件、1440/768/390pxの追加ブラウザ1件、対象ESLint成功。npm・ビルド未実行。

2026-10-17 AIP-C01 Domain 3移行: `/aws/generative-ai-developer-professional/domain3` に全4タスク・15スキル、44表・19図・189リスト項目・125外部リンク出現・練習問題10問を全文移行。ライト配色、点・番号・入れ子、300px目次、クイズの回答・正誤・解答表示・集計・リセットを保持。ホーム・Headerから詳細版へ移動可能。原本削除後のDomain 3検証105件、AIP関連回帰450件、1440/768/390pxを含むChrome 6件が成功。全図の自然倍率とviewBox内包、CSS破壊5種、DOM欠落5種、axe違反0を検証。図・表のキーボード横スクロールと閉じたモバイル目次の非表示を補完。原本306478バイトをバイト一致・SHA-256付きでローカルarchiveへ保存し、テストは固定Git由来fixtureのみを使用。実装 `75a38b02`、原本保存 `e9cbf3f3`。npm・ビルド未実行、目視確認はユーザー担当。最終全体テスト・型検査・lintの結果は移行進捗の現在地を参照。

2026-10-16 Domain 2練習問題の選択・採点: 全15問の選択肢の点を除き、11問をラジオボタン、4問をチェックボックスにした。選択後に「答えと解説」を開くと正誤を表示し、開いた後の選択変更にも追従。複数選択は正解集合の完全一致、未回答は案内表示。選択・開閉状態は問題ごとに独立し、原本の問題文・選択肢・解説は保持。採点22件と目次通知順の回帰を含む関連141件が成功。全体2808件中2807成功、既存AIBナビ期待値1件のみ失敗。ブラウザ9シナリオを検証し、1440pxで見つけた目次上書きは通知順に依存しない選択へ修正して3画面幅を再確認。最新実装HEAD `fa93bb13`（採点 `d11350ad`）。型検査・ESLint・Markdown lint成功。npm・ビルド未実行。

2026-10-16 Domain 2末尾案内文の削除: ユーザー指定により末尾の完了案内文を表示とテスト期待値から除外。原本監査fixtureは固定Gitの証跡として保持し、表示の期待値から対象段落と強調要素だけを除く。関連16ファイル・118件、1440pxブラウザ1件、対象ESLint成功。末尾文削除実装 `4d52589e`（Red `b0e57c77`）。npm・ビルド未実行。

2026-10-16 AIP-C01 Domain 2表示の再精査: 共通Mermaidのdark初期化から継承されていたmainBkg等をページ内のライト描画設定で明示的に置換し、非推奨initからconfig frontmatterへ移行。全42図のノード・状態図・シーケンス図の背景と実際の文字の色、およびコントラスト比を検証。Python・JSON・CloudWatch Logs Insightsの全9コードを原文・空行・インデントを保持してハイライトし、セクション境界と5つのTask見出しの横線を最大1本へ整理。15問は選択肢と解説を保持したカード形式へ改善。全文fixtureは改変せず、関連251件・ブラウザ8件と追加コントラスト検証が成功。表示改善実装 `aefa7b6e`。型検査・全体ESLint・対象Markdown lint成功。全体Vitestの最終結果はMIGRATION_PROGRESS.md参照。npm・ビルド未実行、目視確認はユーザー担当。

このプロジェクトは、Google Cloud / AWS / Cisco / CompTIA のクラウド・ネットワーク資格試験対策およびエンジニアリング・DevOps名著（『Accelerate』など）の解説を目的とした学習用 Next.js アプリケーションです。
試験ガイド、重要ポイントの解説、およびテスト対策コンテンツを提供します。

## 主な技術スタック

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4, CSS Modules (一部カスタム CSS)
- **Testing:** Vitest (Unit/Component), Playwright (E2E)
- **Runtime:** Bun / Node.js

## 開発と実行

主要なコマンドは `package.json` に定義されています。**【リポジトリ標準】コマンドの実行には必ず `bun` を使用してください（bun 推奨、詳細は `README.md` を参照）。**

- **開発サーバー起動:** `bun run dev`
- **ビルド:** `bun run build`
- **単体テスト実行:** `bun run test` (Vitest) ⚠️ **必ず `bun run test` を使うこと。`bun test`（`run` なし）は絶対に使用禁止。** `bun test` は Bun 組み込みランナーを起動し、Vitest 専用の JSDOM / vi.mock が機能せずプロセスが CPU 99% を占有したまま終了しなくなる（2026-09-26 障害事例: 累計 1,600 時間以上の CPU を無駄に消費）。
- **E2E テスト実行:** `bunx playwright install`（初回のみ）、その後 `bun run test:e2e` (Playwright `chromium` project)
- **Performance テスト実行:** `bun run test:perf` (Playwright `perf` project: LCP / CLS / TBT を [e2e/perf-budgets.json](e2e/perf-budgets.json) と比較)
- **md-to-html 監査の自己テスト:** `bun run test:md-to-html`（実体は `bun test` に 2 本のテストファイルのパスを明示指定。`bun test` は `./` で始まらない引数をファイル名フィルタとして解釈するため、パスは必ず `./` から書く）
- **Security テスト実行:** `bun run test:security` (`bun audit --json` を [scripts/security-audit.mjs](scripts/security-audit.mjs) が集計し、high/critical 検出で exit 1)
- **Performance 手動レポート:** `bun run build && bun run perf:report` (`@lhci/cli` autorun → `.lighthouseci/` に HTML/JSON 出力)
- **Lint 実行:** `bun run lint`
- **DVAデプロイ欠落検出:** `bun scripts/check-dva-deployment-mutations.mjs`（本文・表行・図・点・継続番号の5変異を検出し原状復元）
- **Markdown lint 実行:** `bun run markdownlint -- path/to/file.md`
- **Docker 一括リビルド:** `bun run docker:rebuild`（コンテナ停止 → 本番イメージ作成 → 開発コンテナ再構築・起動）
- **ゾンビプロセス診断:** `bun run test:check-zombies`（`bun test` 誤用・長時間ハングプロセス・`while true` 残骸ループを自動検出。異常を感じたら最初に実行する）

## プロジェクト構造

- `/app/aws/advanced-networking-specialty/domain2`: ANS-C01ネットワーク実装。Server `page.tsx` / `AnsDomain2Guide.tsx` / 6区分、Client `NavBar.tsx`、`constants.ts` / `Diagram.tsx` / `page.css`。57表・26図・11コード・確認問題8問・59目次を保持し、ホーム・Headerから接続。
- `/app/aws/advanced-networking-specialty/domain1`: ANS-C01ネットワーク設計。Server `page.tsx` / `AnsDomain1Guide.tsx` / 8区分、Client `NavBar.tsx` / `Quiz.tsx` / `Checklist.tsx`、`constants.ts` / `Diagram.tsx` / `page.css`。75表・15図・7コード・6問・10チェック・12目次を原本どおり保持し、ホーム・Headerから接続。

- `/app`: Next.js App Router のページコンポーネント。
  - `/app/gcl/hands-on`: GCP ハンズオン実践ガイド群（`cloud-load-balancing-guide`, `develop-your-gcp-network`, `build-a-secure-google-cloud-network`, `set-up-an-app-dev-environment-on-google-cloud`, `gcp-security-fundamentals-guide`, `gke-private-cluster-security-guide`, `iap-tcp-forwarding-best-practices-guide`, `terraform-gcp-challenge-lab-guide`, `griffin-wordpress-gke-guide`, `secure-cicd-pipeline-guide`）。
  - `/app/gcl/genai-leader`: Generative AI Leader 試験対策ページ（Section 1〜4、section1/2 はコンポーネント分割済み）。
  - `/app/gcl/cloud-digital-leader`: Cloud Digital Leader 試験対策ページ（Section 1〜6、各セクションはコンポーネント分割済み）。
  - `/app/gcl/agwa`: Associate Google Workspace Administrator 試験対策ページ（Section 1〜6、既存の各セクション別ガイドとサイドバーナビゲーションを含む）。
  - `/app/gcl/professional-cloud-network-engineer`: PCNE 試験対策ページ（概要・ドメイン別解説、`section1-vpc-design`、`section2-vpc-implementation`、`section3-load-balancing`、`section4-cdn-dns-ipam`、`section5-network-security` および `section6-network-ops-monitoring` 完全ガイド含む）。
  - `/app/gcl/professional-cloud-network-engineer-step-by-step`: PCNE ステップバイステップ実践ガイド。
  - `/app/gcl/professional-cloud-architect`: Professional Cloud Architect（PCA）試験 完全対策ガイド（`section1-design-planning`、`section2-managing-provisioning`、`section3-security-compliance`、`section4-process-optimization`、`section5-managing-implementation`、`section6-operational-excellence` 完全ガイド含む）。
  - `/app/gcl/professional-cloud-developer`: Professional Cloud Developer（PCD）認定試験 完全対策学習ガイド（`section1`、`section2`、`section3`、`section4` 完全ガイド含む）。
  - `/app/gcl/professional-agentic-architect`: Professional Agentic Architect 認定試験 技術ガイド（概要・技術ガイド本体、および `section1`、`section2`、`section3`、`section4`、`section5` 完全ガイド含む。ライトテーマデザイン、全量完全移植済み）。
  - `/app/cisco/ccde/complete-guide`: Cisco CCDE 認定 完全ガイド。
  - `/app/cisco/devnet-professional`: Cisco Certified DevNet Professional 認定 徹底解説ガイド（CSS Modules）。
  - `/app/cisco/devnet-associate`: Cisco Certified DevNet Associate (200-901 / CCNA Automation) 完全対策ガイド（全7章+導入構成、全112表、Mermaid 34図、グローバルテーマトークン完全準拠、280pxサイドバー契約）。
  - `/components/sections/home`: ホームの Hero / ExamCard / ExamCatalog / Stats セクション。
  - `/app/cisco/ccna/beginner-guide`: Cisco CCNA試験 完全ガイド。
  - `/app/cisco/ccna/automation-software-development-design`: CCNA Automation ソフトウェア開発と設計 完全ガイド。
  - `/app/cisco/ccna/automation-api-guide`: CCNA Automation API 完全ガイド。
  - `/app/cisco/ccna/automation-application-deployment-security`: CCNA Automation アプリケーションの展開とセキュリティ 完全ガイド。
  - `/app/cisco/ccna/automation-cisco-platforms-and-development`: CCNA Automation Cisco Platforms and Development 徹底解説ガイド。
  - `/app/cisco/ccna/automation-infrastructure-and-automation`: CCNA Automation 5.0 Infrastructure and Automation ステップバイステップ解説ガイド。
  - `/app/cisco/ccna/automation-network-fundamentals`: CCNAAUTO 200-901 6.0 Network Fundamentals 完全ガイド。
  - `/app/cisco/ccna/network-access-guide`: CCNA 200-301 Network Access 徹底解説ガイド。
  - `/app/cisco/ccna/ip-connectivity-guide`: CCNA 200-301 IP Connectivity 完全ガイド。
  - `/app/cisco/ccna/ip-services-guide`: CCNA 200-301 IP Services 完全ガイド。
  - `/app/cisco/ccna/automation-programmability`: CCNA 200-301 6.0 自動化とプログラマビリティ 完全ガイド。
  - `/app/cisco/ccna/security-fundamentals`: CCNA 200-301 Security Fundamentals 完全ガイド。
  - `/app/cisco/ccna/network-fundamentals-guide`: CCNA 200-301 Network Fundamentals ネットワークの基礎 入門ガイド。
  - `/app/comptia/network-plus`: CompTIA Network+ (N10-009 / V9) 完全ガイド（`networking-concepts-guide`, `network-implementation-guide`, `network-operations-guide`, `network-security-guide`, `network-troubleshooting-guide` を含む）。
  - `/app/aws/solutions-architect-associate`: AWS Certified Solutions Architect – Associate (SAA-C03) 完全対策ガイド（`domain1` を含む）。
  - `/app/aws/cloudops-engineer-associate`: AWS Certified CloudOps Engineer - Associate (SOA-C03) 完全ガイド（全5ドメイン・13タスク・53スキル、Mermaid 68図、テーブル206点、コードブロック10点、練習問題20問完全収録、280pxサイドバー契約）。
  - `/app/aws/developer-associate/domain1`: DVA-C02 AWSサービスを使用した開発。Server `page.tsx`、Client `DevelopmentGuide.tsx` / `NavBar.tsx`、`constants.ts`、`Diagram.tsx`、`mermaid-theme.json`、`CodeBlock.tsx`、`page.css`、38分割セクション。29スキル・116表・31図・18コード・363リスト項目（目次38項目を含む）・15練習問題を全文移行。原本ライト配色・Source Serif 4・288px幅を保持し、本文・表・コード・目次・図は14px。自己ホストTablerアイコン、点・番号・入れ子、native detailsを保持。コードのコメント・属性色は14pxでのコントラストを改善。ホーム・Headerに両DVAドメインを登録。
  - `/app/aws/developer-associate/domain2`: DVA-C02 セキュリティ。Server `page.tsx`、Client `SecurityGuide.tsx` / `NavBar.tsx`、`constants.ts`、`Diagram.tsx`、`CodeBlock.tsx`、`ChecklistItem.tsx`、`page.css`、`sections/`。110表・35図・40コード・20チェック・26目次、点と番号の装飾を全量移行。原本のライト配色・Source Serif 4・300pxサイドバーを保持。ユーザー指定で本文・表・コード・目次・図は14px（0.875rem、ルート1rem=16px）、見出しも縮小。`mermaid-theme.json` と `preserveChartTheme` で図の原本配色も保持。
  - `/app/aws/developer-associate/domain3`: DVA-C02 デプロイ。Server `page.tsx`、Client `DeploymentGuide.tsx` / `NavBar.tsx`、`constants.ts`、`Diagram.tsx`、`mermaid-theme.json`、`CodeBlock.tsx`、`Checklist.tsx`、`page.css`、33分割セクション。80表・39図・32コード・63リスト項目・137外部リンク・135本文ブロックを全文移行。原本ライト配色・Source Serif 4・290pxサイドバーを保持し、本文・表・コード・目次・図は14px。点・番号・`ol start=4`、9チェック、10解説を保持。原本の独立解決済み派生色を注入し、共通dark設定による黒塗りを防止。実Mermaidパーサー40件で配色・構文を検証。構文ハイライトはユーザー指定により近似色で実装し、追加依存なし。
  - `/app/aws/generative-ai-developer-professional`: AIP-C01全5ドメイン・Step 1〜20・付録・参考資料。Server `page.tsx` / `AipGuide.tsx`、Client `NavBar.tsx`、`constants.ts`、`Diagram.tsx`、`page.css`、6分割セクション。76表・34図・60本文リスト項目・64外部リンク出現・8行JSONを全文移行。原本のライトテーマを保持し、300px幅・48目次・点と番号・hash/focus・自然倍率を保持。横スクロール図・表・コードはキーボード操作可能。
  - `/app/aws/generative-ai-developer-professional/domain2`: Domain 2詳細版。Server `page.tsx` / `AipDomain2Guide.tsx` と7区分の本文、Client `NavBar.tsx` / `PracticeQuestion.tsx`、`constants.ts` / `Diagram.tsx` / `CodeBlock.tsx` / `page.css`。15問は点なしの選択肢と解説開閉時の完全一致採点に対応。描画frontmatterで共通dark値の継承を遮断し、9コードの構文色、罫線最大1本、15問題カードを実装。原本ライト配色・300px幅、全5タスク・25スキル・96表・42図・9コード・296リスト項目・230リンク出現・230目次・15問の解答開閉を保持。全文・装飾・自然倍率・SVG見切れ・操作・a11yを検証し、ホームとHeaderから詳細版へ移動可能。
  - `/app/aws/generative-ai-developer-professional/domain3`: Domain 3詳細版。Server `page.tsx` / `AipDomain3Guide.tsx` と6区分の本文、Client `NavBar.tsx` / `PracticeQuestion.tsx`、`constants.ts` / `Diagram.tsx` / `page.css`。全4タスク・15スキル、44表・19図・189リスト項目・125外部リンク出現・10問を原本のライト配色・300px目次で保持。点・番号・入れ子・全量照合・自然倍率・SVG見切れ・クイズ操作・表と図のキーボード操作・a11y・ホーム/Header導線を検証。
  - `/app/aws/generative-ai-developer-professional/domain5`: Domain 5詳細版。Server `page.tsx` / `AipDomain5Guide.tsx` / 4区分の本文、Client `NavBar.tsx` / `Quiz.tsx` / `Checklist.tsx`、`constants.ts` / `Diagram.tsx` / `page.css`。47表・18図・5問・23チェック・41目次を原本どおり保持。全文・装飾・操作・3画面幅を検証。ホームとHeaderから接続。
  - `/app/aws/generative-ai-developer-professional/domain4`: Domain 4詳細版。Server `page.tsx` / `AipDomain4Guide.tsx` と5区分の本文、Client `NavBar.tsx` / `Quiz.tsx`、`constants.ts` / `Diagram.tsx` / `page.css`。全3タスク・16スキル・84表・22図・2コード・140リスト項目・36外部リンク出現・26目次・12問を原本の明色・300px目次で保持。全CSS宣言、点・番号・入れ子、コード色分け、単一/複数選択の採点・集計・リセットを検証。108スクロール領域の固有名、自然倍率、SVG見切れ、3画面幅、axe違反0を確認。ホームとHeaderから詳細版へ接続。
  - `/app/aws/generative-ai-developer-professional/domain1`: Domain 1詳細版。Server `page.tsx` / `AipDomain1Guide.tsx` と8区分の本文、Client `NavBar.tsx` / `Checklist.tsx`、`constants.ts` / `Diagram.tsx` / `page.css`。原本ライト配色・300px幅、全6タスク・28スキル・51表・21図・137リスト項目・123リンク出現・63目次・16チェックを保持。原本のMermaid描画設定を使用し、チェック完了前後のa11yと点・番号を検証。ホームとHeaderから詳細版へ移動可能。
  - `/app/aws/ai-business-strategist`: AWS Certified AI Business Strategist (AIB-C01) 初学者向けステップバイステップ完全ガイド。Server `page.tsx`、Client `AiBusinessStrategistGuide.tsx` / `NavBar.tsx`、`constants.ts`、`Diagram.tsx`、`page.css`、8分割セクション。全4ドメイン・横断編・試験対策・付録A〜C（82表・16図・236リスト項目・112外部リンク・134本文ブロック）完全収録、280pxサイドバー契約、ライトテーマデザイン完全再現。
  - `/app/aws/ai-business-strategist/domain1`: AWS Certified AI Business Strategist (AIB-C01) Domain 1: AI Fundamentals and Literacy 完全ガイド。Server `page.tsx`、Client `AiBusinessStrategistDomain1Guide.tsx` / `NavBar.tsx`、`constants.ts`、`Diagram.tsx`、`page.css`、19分割セクション。全3タスク・13スキル・付録A〜E（55表・16図・150リスト項目・86外部リンク・99本文ブロック）完全収録、300pxサイドバー、ライトテーマデザイン完全再現。
  - `/app/aws/ai-business-strategist/domain2`: AWS Certified AI Business Strategist (AIB-C01) Domain 2: AI Strategy and Business Value Creation 完全ガイド。Server `page.tsx`、Client `AiBusinessStrategistDomain2Guide.tsx` / `NavBar.tsx`、`constants.ts`、`Diagram.tsx`、`mermaid-theme.json`、`page.css`、26分割セクション。全3タスク・14スキル・練習問題10問・直前チェックリスト（67表・20図・237リスト項目・153本文ブロック）完全収録、302pxサイドバー、ライトテーマデザイン完全再現。
  - `/app/aws/ai-business-strategist/domain3`: AWS Certified AI Business Strategist (AIB-C01) Domain 3: AI Governance and Responsible AI 完全ガイド。Server `page.tsx`、Client `AiBusinessStrategistDomain3Guide.tsx` / `NavBar.tsx`、`constants.ts`、`Diagram.tsx`、`mermaid-theme.json`、`page.css`、8分割セクション。全3タスク・10スキル・確認問題5問・参考URL（32表・10図・81リスト項目・32外部リンク・40本文ブロック）完全収録、302pxサイドバー、ライトテーマデザイン完全再現。
  - `/app/recommended-books/accelerate`: 『Accelerate』LeanとDevOpsの科学 完全ガイド（DORA 5指標、24の能力、Westrum組織文化モデル、AI支援開発時代の最新知見）。
  - `/app/recommended-books/site-reliability-engineering`: 『Site Reliability Engineering』Googleのプロダクション運用 完全ガイド（原則・実践・マネジメント、SLI/SLO/SLA、エラーバジェット、トイル撲滅、AI時代のSRE最新動向）。
  - `/app/recommended-books/the-devops-handbook`: 『The DevOps Handbook』DevOpsバイブル 完全ガイド（全23章・6パート構成、3つの道、技術的実践、シフトレフトセキュリティ、2026年AI時代のDORA・プラットフォームエンジニアリング最新知見）。
  - `/app/recommended-books/release-it`: 『Release It!』本番対応ソフトウェア設計・デプロイ 完全ガイド（初版・第2版対応、4部17章構成、サーキットブレーカー・バルクヘッド・タイムアウト等12パターン/12アンチパターン、ゼロダウンタイムデプロイ、カオスエンジニアリング、Mermaid 14図）。
  - `/app/recommended-books/infrastructure-as-code`: 『Infrastructure as Code』実践ガイド（Kief Morris 原著、5部22章構成、クラウドインフラ原則・CUPID設計・スタック分離・テストピラミッド・GitOps・Policy as Code・2026年最新エコシステム、Mermaid 26図）。
  - `/app/recommended-books/understanding-the-linux-kernel`: 『Understanding the Linux Kernel』完全解説ガイド（Daniel P. Bovet, Marco Cesati 原著、22部構成、メモリアドレス・プロセス・割り込み・同期・メモリ管理・VFS・ページキャッシュ・2026年最新動向、Mermaid 45図）。
  - `/app/recommended-books/unix-linux-sysadmin-handbook`: 『UNIX and Linux System Administration Handbook』完全解説ガイド（Evi Nemeth et al. 原著、4パート・31章構成、基本管理・ネットワーキング・ストレージ・運用実践・セキュリティ、Mermaid 29図）。
  - `/app/recommended-books/systems-performance`: 『Systems Performance: Enterprise and the Cloud』実践ガイド（Brendan Gregg 原著、16章+付録構成、USE法・perf・eBPF・クラウド性能分析、Mermaid 18図）。
  - `/app/recommended-books/operating-systems-three-easy-pieces`: 『Operating Systems: Three Easy Pieces（OSTEP）』完全学習ガイド（Remzi H. Arpaci-Dusseau, Andrea C. Arpaci-Dusseau 原著、57章+付録構成、仮想化・並行性・永続性・セキュリティ・xv6、Mermaid 56図）。
  - `/app/recommended-books/computer-networks-tanenbaum`: Tanenbaum & Wetherall『Computer Networks』着想の入門ガイド。Serverルート、Client本文、NavBar、constants、page.cssの5ファイル構成。全10ステップ、21図、12表、10チェック項目、47アンカーを原本fixture・CSS全宣言照合で検証。
  - `/app/recommended-books/computer-networking-topdown`: 『Computer Networking: A Top-Down Approach』完全学習ガイド（James F. Kurose, Keith W. Ross 原著、全10部構成、アプリケーション層〜物理層、2026年最新動向、Mermaid 41図）。
  - `/app/recommended-books/high-performance-browser-networking`: 『High Performance Browser Networking』完全解説ガイド（Ilya Grigorik 原著、全5部18章構成、TCP/UDP/TLS/ワイヤレス/HTTP/ブラウザAPI、2026年最新動向、Mermaid 33図）。
  - `/app/recommended-books/kubernetes-in-action`: 『Kubernetes in Action, Second Edition』完全解説ガイド（Marko Lukša 原著、全6部18章+2026年最新動向、Mermaid 41図、テーブル15点、チェックリスト19点、参考文献27点）。
  - `/app/recommended-books/terraform-up-and-running`: 『Terraform: Up & Running』完全解説ガイド（Yevgeniy Brikman 原著、全11部構成、S3ネイティブロック・OpenTofu・terraform test・Ephemeral Resources・Stacks等2026年最新動向、Mermaid 19図、テーブル18点、コードブロック31点、チェックリスト9点、参考文献7点）。
  - `/app/recommended-books/tcpip-illustrated-vol1`: 『TCP/IP Illustrated, Volume 1: The Protocols（第2版）』完全解説ガイド（W. Richard Stevens, Kevin R. Fall 原著、全20部+付録構成、Mermaid 35図、テーブル22点、コードブロック16点、チェックリスト10点、参考文献15点）。
  - `/app/cli`: CLIコマンド実践ワンライナー集（基礎知識・パイプライン・主要コマンド・シナリオ・ベストプラクティス・リファレンス全15セクション完全解説ガイド、Mermaid 7図）。
- `/app/constants.ts`: 試験データ正本（`ALL_EXAMS` / `STATS`）。編集対象は `ALL_EXAMS` で、公開値 `EXAMS` は `HANDS_ON_ENABLED` フラグで `ALL_EXAMS` をフィルタした派生値（直接編集しない）。`provider: 'GCP' | 'AWS' | 'Cisco' | 'CompTIA' | 'Books' | 'Tools'` で分類され、`toNavTree` が自動グルーピング。
- AWS: `app/aws/` 配下（`solutions-architect-associate/page.tsx` 完全対策ガイド、`solutions-architect-associate/domain1/page.tsx` ドメイン1ガイド、`solutions-architect-associate/domain2/page.tsx` ドメイン2ガイド、`solutions-architect-associate/domain3/page.tsx` ドメイン3ガイド、`solutions-architect-associate/domain4/page.tsx` ドメイン4ガイド、`cloudops-engineer-associate/page.tsx` 完全対策ガイド、`developer-associate/domain1/page.tsx` DVA-C02開発、`developer-associate/domain2/page.tsx` DVA-C02セキュリティ、`developer-associate/domain3/page.tsx` DVA-C02デプロイ、`ai-business-strategist/page.tsx` AIB-C01初学者向け完全ガイド、`ai-business-strategist/domain1/page.tsx` AIB-C01ドメイン1、`ai-business-strategist/domain2/page.tsx` AIB-C01ドメイン2、`ai-business-strategist/domain3/page.tsx` AIB-C01ドメイン3）
- Cisco: `app/cisco/` 配下（`ccna/beginner-guide/page.tsx` 完全ガイド、`ccna/automation-software-development-design/page.tsx`、`ccna/automation-application-deployment-security/page.tsx`、`ccna/automation-cisco-platforms-and-development/page.tsx`、`ccna/automation-infrastructure-and-automation/page.tsx`、`ccna/ip-connectivity-guide/page.tsx`、`ccna/ip-services-guide/page.tsx`、`ccna/automation-programmability/page.tsx` 含む）
- `/components`: 共通コンポーネント（Header: ハンバーガー Drawer ナビ、Footer、DisclaimerBanner など）。
- `/__tests__`: Vitest によるユニットテスト。`restore_diagrams.test.ts` はスキル配下から標準実行へ追加される。
- `/e2e`: Playwright による E2E テスト。
- `/archive`: 移行済みの旧式 HTML / Markdown 学習ガイド資料。Cisco 資料の正規保存先は `/archive/Cisco/html` および `/archive/Cisco/md` とし、`/Gcl_Archive/Cisco` は使用禁止。
- `/Aws`: AWS 関連の古い資料（アーカイブ済み）。

## 開発コンベンション

- **テスト駆動（絶対厳守）:** 実装の際は必ず正準の `.agents/rules/tdd-commit-workflow.md` に従うこと。`.claude/rules/tdd-commit-workflow.md` と `.gemini/rules/tdd-commit-workflow.md` は同期ミラーである。以下のステップを厳格に繰り返し、各ステップ完了後に**即コミット（繰り越し禁止）**する。ただしコミットはユーザーの認可がある場合のみ実行する。
  1. **Step 0 — Inventory:** 移行タスクでは移行元から `docs/migration-inventory/<slug>.json` を機械抽出してコミット (`chore(migration): add content inventory for ...`)
  2. **Step 1 — Fail:** インベントリを `import` した失敗テストを先に作成し、失敗を確認してコミット (`test: add failing tests for ...`)
  3. **Step 2 — Pass:** テストをPassさせる実装を行いコミット (`feat/fix: implement ... to pass tests`)
  4. **Step 3 — Refactor:** コード整理・ルーティング統合・`bun run lint` / `bun run build` 確認後にコミット (`refactor/docs: integrate ... into routing and update docs`)
- **テスト強度（絶対厳守）:** 同ルール §2 の合格基準を満たすこと。特に **`getAllByText(regexp).length > 0` のみ**の検証と、件数の `toBeGreaterThan(0)` 検証は**禁止**（要約して移行してもパスしてしまうため）。件数は必ず `toBe(n)`、文言は空白除去後の完全部分文字列一致で全量検証する。テンプレートは同ルール §3 をコピーして使う。
- **エージェント設定の3系統同期:** `.agents/` が正本、`.claude/` と `.gemini/` はその複製。片方だけ更新しないこと。`__tests__/skills/agent-mirror-sync.test.ts` が同一性を検証する。
- **UI デザイン:** 各セクションごとに固有のテーマカラー（Aurora, Sapphire, Laboratory, Gold）が設定されています。
- **スタイリング:** CSS 変数は `app/globals.css` で定義された 3層トークンアーキテクチャに従ってください。
- **保守性:** 共通の定数（作成日など）は `app/gcl/genai-leader/constants.ts` に集約されています。

## デプロイ

- **Netlify**: `netlify.toml` + `@netlify/plugin-nextjs` で構成。`next.config.ts` の `output` は環境変数 `NEXT_OUTPUT_MODE` で制御（Docker ビルド時: `standalone`、Netlify ビルド時: 未設定）。
- **Docker**: `Dockerfile`（本番 standalone）、`Dockerfile.dev`（開発 hot reload）。CSS キャッシュを含む一括再構築は `bun run docker:rebuild`、個別操作は `make dev` / `make prod` を使用。開発コンテナの `.next` ボリューム (`infra_dev_next_cache`) は `nextjs` ユーザー（UID 1001）所有で初期化される。

## 注意事項

- **`DisclaimerBanner`**: `components/DisclaimerBanner.tsx`（`'use client'`）。**`position: sticky; top: var(--header-h)`** で Header 直下に貼り付き、flow 内に留まる。**`body { padding-top }` は使わない**（過去に `fixed` + `padding-top` としていた結果、sticky Header の natural position がずれ、スクロール開始まで Header と Disclaimer の縦並び順が入れ替わる不具合が発生したため修正済み）。ResizeObserver による `--disclaimer-height` の同期は継続する（ページ内 SectionNav が `--fixed-offset = calc(--header-h + --disclaimer-height)` を `top` 値として参照するため）。免責事項テキストの変更はこのファイルのみ編集する。
- `litellm` や `dspy` は脆弱性の懸念があるため、プロジェクトへの追加は禁止されています。
- **フォントは自己ホスト（`next/font/google` 禁止）**: `next/font/google` はビルド時に Google Fonts へ HTTP 取得を行うため、CDN が旧リビジョンの CSS（実体が削除済みの woff2 URL）を返すと `Failed to fetch <family> from Google Fonts.` でビルドが失敗します（Netlify CI で実際に発生）。全 11 ファミリは `@fontsource-variable/*` / `@fontsource/*` に移行済みで、`app/layout.tsx`（Noto Sans JP / JetBrains Mono / DM Sans）と `app/gcl/genai-leader/section1〜4/page.tsx` が該当 CSS を `import` します。**可変フォントのファミリ名は `'<Name> Variable'`**（例 `'Noto Sans JP Variable'`）であり、`app/globals.css` の `@theme` の `--font-*` トークンで `'<Name> Variable', '<Name>', <generic>` の順に指定します。フォントを追加する場合も `bun add @fontsource-variable/<name>` → CSS import → `@theme` にトークン追加の手順とし、`next/font` は使用しません。この制約は `__tests__/fonts/self-hosted-fonts.test.ts` が検証します。
- **Client/Server コンポーネント境界**: ページ固有のアンカーナビなど状態やブラウザAPIに依存するUIは `'use client'` ディレクティブを含む専用コンポーネントとして切り出し、メインの `page.tsx` を Server Component として維持してください。また、Client コンポーネント内でサーバー専用API (`fs`, `cookies`, `headers`) を参照することは禁止し、PropsはJSONシリアライズ可能なものに限定してください。
- **コードブロック内の改行 (`.code-block`)**: JSX変換時、コード内の改行に `{"\n"}` を使用せず、各行を `<div className="code-line">...</div>` でラップしてください。`.code-line` は `white-space: pre` 等でインデントを保持し、`map` での展開時には安定した `key` を付与してください。
- **表形式データの構造化**: テキストのスペース揃えで列を表現したデータは、フォント変更による列ズレを防ぐため、必ず `<table>` 要素に変換してください。その際、必ず `<thead>` を含め、見出しセルには `<th scope="col">` を使用してください。
- **CSS変数・テーマトークンの適用**: `app/globals.css` の3層アーキテクチャ CSS 変数（`--color-background`, `--color-foreground`, `--color-card` など）を厳格に使用すること。テーマトークンと新しいテーマカラーはすべて同ファイルの `@theme` に集約し、ページ固有の CSS Modules は既存の `--color-*` トークンのみを参照する。コンポーネントの CSS 内で新しいカスタムプロパティ (`--*`) を定義したり、テーマごとのCSSファイルを追加・インポートしたりしない。
- **サイドバーガイドのレイアウト契約**: サイドバーを持つガイド画面は、デスクトップでサイドバーを左端へ固定し幅を `280px` に統一してください。メイン領域は `margin-left: 280px`、`width: calc(100% - 280px)`、`max-width: none` で残り幅をすべて使用し、本文全体を再制限する `content-inner` 等の最大幅は設けません。レスポンシブ規則では `margin-left: 0`、`width: 100%` へ戻します。DVA-C02ドメイン1は288px、ドメイン2は300px、ドメイン3は290pxの原本幅をユーザー指定により優先し、専用の移行テストで検証します。AIP-C01（総合ガイドとDomain 1〜4）も原本の300pxを例外として優先し、サイドバー幅 `300px`・メイン `margin-left: 300px`・`width: calc(100% - 300px)` を揃え、各ドメインの専用デザインテストとE2Eで検証します。この共通契約は `__tests__/guide-content-widths.test.ts` で登録済み43スタイルシートを検証します。
- **グローバルメニューの運用（データ駆動）**: ナビゲーションは `app/constants.ts` の `ALL_EXAMS` を正本とし（`EXAMS` はそこから派生する公開値）、`app/navigation.ts` の `toNavTree()` が provider 別グループを自動生成するため **`components/Header.tsx` は直接編集しない**。新試験追加時は `ALL_EXAMS` にエントリを追加し（`status: 'coming-soon'` → 完成後に省略）、`app/globals.css` に `icon-theme-<id>` を追加すれば Drawer に自動反映される。
- ページコンポーネント（`page.tsx`）が巨大化するのを防ぐため、各セクションは必ず `components/sections/` に分割し、スタイリングには CSS Modules (`*.module.css`) を使用してください。セクション間で共通のスタイル（例: `SectionBase.module.css`）を利用する場合は、CSS 内での `@import` を避け、各 TSX ファイルから直接 `import baseStyles from './SectionBase.module.css'` のようにインポートして適用してください。
- ASCIIダイアグラムの使用を避け、専用の SVG コンポーネント (`DiagramSVG.tsx` 等) に置き換えてください。型の制約（Discriminated Union）により、アクセシビリティを担保するための `ariaLabel="説明文"` または `decorative={true}` の指定が必須となります。
- アクセシビリティ（`aria-label` 等の付与）を徹底し、コンポーネントやユーティリティ関数には Docstrings (JSDoc) を追加してください。
- **移行作業の同期とHTMLファイルアーカイブルール**: HTMLの移行作業時には必ず `.gemini/rules/migration-progress-sync.md`（3系統同一内容）に従い進捗を同期してください。また、**移行元ファイルは絶対に削除せず、移行完了後に `archive/` 配下の適切なディレクトリへ移動（アーカイブ）してください。Cisco 資料は `archive/Cisco/html/` と `archive/Cisco/md/` を使用し、`Gcl_Archive/Cisco` は作成・使用しないでください**。
- **Mermaid図解の幅・配置契約**: `Diagram` や `.mermaid-wrap` に個別の `maxWidth` インラインスタイル（`maxWidth: 800px` 等）を設定して幅を人工的に制限することは**絶対禁止**です。コンテンツ領域の全幅 (`width: 100%`) を活用し、`margin: 1.5rem auto 2rem` で親コンテナ内中央に配置してください。
- **ユーザー手動確認ゼロ原則（手動・目視確認依頼の全廃）**:
  - ユーザーに目視チェックやスクリーンショット撮影・確認作業を依頼することを**厳禁**とします。
  - テキスト全量一致の検証は `bun scripts/verify-html-migration.mjs` および `bun run test`（Vitest。`bun test` 直接実行は禁止）による全自動 DOM 照合で 100% 合格を判定してください。
  - レイアウト・スクロール被り・レスポンシブ崩れは `bun run test:e2e` (Playwright) で全自動検出・証明してください。
- **移行の忠実性とコンテンツ・デザインの網羅性 (絶対遵守・手抜き・独自改変厳禁)**: 移行元の HTML/Markdown に含まれる情報・デザインは、**一切の省略・要約・抜粋・文言短縮・独自の補足列追加・装飾削除を厳禁**とします。
  - **コンテンツの完全性**: 「詳細手順」「CSV フォーマット例」「全テーブルの列構成とセル文言」「注釈」「解説文章」「JSDoc」「補足スキル項目」「全出典リンク」「免責事項」などを100%そのまま全量移転すること。
  - **ビジュアルデザインの完全性**: 元HTMLの `:root` CSSカラー変数、`h1` グラデーションテキスト (`background-clip: text`)、`h2` 左アクセントバー (`border-left`)、`th` 白文字・背景色、`.badge` ピル型 (`border-radius: 999px`)、`.callout` アクセントバー、インラインコード装飾、コードブロック構文ハイライト (`.code-comment`, `.code-keyword` 等) を100%全量移植すること。
  - **事前コンテンツ目録の作成**: 移行開始前に元ファイルの「見出し数・表の行数/列構造/セル文言・Mermaid図数・出典リンク数・CSSスタイル要素」を抽出・把握すること。
  - **TDDでの網羅性テスト作成**: Step 1 (Red) の時点で大枠見出しだけでなく、表内の文言、補足スキル、デザイン要素（CSS定義、構文ハイライトスパン、中央寄せ等）が存在することを検証する厳密なテストを作成すること。
  - **全量照合セルフレビュー**: Step 2 (Green) 完了時、元ファイルと作成した TSX/CSS をセルフレビューし、文字数や行数・見た目の大幅な乖離・省略がないことを照合してからコミットすること。
- **異常なトークン消費の防止とステップごとのコミット義務**: 無駄なループを防ぐため、複数のステップにまたがる複雑な実装を行う際は、必ず計画を立て、1つのステップ（またはコンポーネント）ごとに実装とテストを完了させ、**そのステップの完了と同時に必ず `git status`, `git add`, `git commit` を実行して作業を確定させてから**次のステップに進んでください。
- **システムツールのパラメータ必須要件の厳守と自己レビュー義務 (`update_topic` 等)**: `update_topic` や `write_file` などのシステムツールを呼び出す際は、スキーマで要求されている**必須パラメーター（例: `strategic_intent` や `file_path` など）が全て含まれていることを実行前に必ず確認**してください。エラーとリトライの無限ループを防止するため、ツール呼び出し前の `<thought>` ブロック内で「これから使うツールの必須パラメータは何か？」「それらの値はセットされているか？」を明示的に自己レビューしてから実行してください。

## AI Skills

本プロジェクトにはAIエージェント（Gemini CLI 等）向けの専用スキルが用意されています。

- **`infra-md-to-nextjs-migration`**: Markdownの学習資料からNext.js（App Router）の `page.tsx` および `constants.ts` への移行ワークフローを定義したスキルです（スキル名は `infra-md-to-nextjs-migration`、インストール用パッケージファイルは `infra-md-to-nextjs-migration.skill` です）。
- **`infra-md-to-html`**: リポジトリ直下のガイド Markdown を、`Gcp-pca-section4-process-optimization.html` のデザイン（暗色テーマ / サイドバー + スクロールスパイ / `pre.mermaid` インライン / 脚注 + `.ref-grid`）で単一 HTML へ変換するスキルです。転写漏れとデザイン漏れを検出する 2 本の監査スクリプトを同梱し、両方 exit 0 がコミットの前提条件になります。正本は [.agents/skills/md-to-html/](.agents/skills/md-to-html/) で、`.claude/` / `.gemini/` 配下は読み取り用ミラーです。監査スクリプトは常に `.agents/skills/md-to-html/scripts/*` を実行し、ミラー側のコピーは実行しません。

**インストール・利用手順 (Gemini CLI)**:

```bash
# プロジェクト（ワークスペース）スコープでインストール
gemini skills install infra-md-to-nextjs-migration.skill --scope workspace
```

対話セッション内では `/skills reload` を実行してスキルを有効化し、「MDを移行して」などのトリガーワードで呼び出してください。

## セキュアCI/CDガイドの移行検証（2026-10-02）

`/gcl/hands-on/secure-cicd-pipeline-guide` をHands-onへ登録済み。40見出し・106表セル・41リスト項目・59外部リンク・9コード・4図を固定インベントリで照合し、原本のCSS宣言、リストマーカー、参考文献01〜23、コード枠の余白・角丸も検証する。共有モック・抽出ヘルパーは `__tests__/helpers/migration-test-utils.tsx`。原本は `archive/Gcl/Hands-on/html/Secure-cicd-pipeline-guide.html` と `archive/Gcl/Hands-on/md/Secure-cicd-pipeline-guide.md` に保持する。ユーザー指示によりnpm・ビルド・Playwright・目視確認は実施しない。全体Vitestには移行前からPAA Section 5の既知の失敗2件がある。

### 2026-10-02: CI/CD図3・図4の左端切れ修正

ページCSSの `.mermaid-target { justify-content: center; }` が、共通Mermaidコンポーネントの `safe center` を詳細度で上書きし、横長SVGの左側が負のスクロール領域へはみ出していた。ページの指定を `safe center` に変更し、収まる図は中央寄せ、収まらない図は左寄せへ退避させる。図のDSL・自然倍率・文字サイズは保持。

Red: `39af7f41`、Green: `1b2c58d0`。図3・図4の内外ラッパーのCSSカスケードを再現する回帰テストを追加。`bun run test -- secure-cicd-pipeline-guide MermaidDiagram guide-content-widths` は156件成功（ガイドは19件）。ブラウザの描画・スクロール位置の実測は未実施、npm・ビルド・Playwrightは実行しない。

## 共通フッター（2026-10-20）

`Footer.tsx` は `Footer.module.css` で暗色ページと明色ガイドの配色を切り替える。ページルートを `body:has()` で判定するため、クライアント遷移にも追従する。新規ライトページではセレクター一覧への追加とブラウザ検証が必要。免責文言は `components/disclaimer.ts` を上部バナーと共有する。640px以下では1列表示。共通フッターの `z-index` は `auto` を維持し、固定サイドバーより手前へ配置しない。
