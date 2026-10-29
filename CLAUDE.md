# CLAUDE.md

## 2026-10-29: SAP-C02 Domain 3

`app/aws/solutions-architect-professional/domain3/` に Server `page.tsx`、Client `SapDomain3Guide.tsx` / `NavBar.tsx`、memo化した `Diagram.tsx`、7分割の `sections/`、定数・原本テーマJSON・全派生色JSON・スコープCSSを追加。全5タスク・77表・16図・3コード例・64リスト項目・90外部リンク出現・72目次・22チェック項目を原本から移行した。リストの点・番号・階層と段落余白、表の構造空白除去・読み上げ名、チェック進捗を保持。ホーム・HeaderのDomain 3（25%）導線と明色フッターへ統合。`bun scripts/migrate-sap-domain3.mjs <foundation|task31|task32|task33|task34|task35|appendix>` で固定Git原本から再生成できる。

## 2026-10-29: 移行済み原本の一括アーカイブ

直下に残っていた移行済み4教材（DDIA、SAP-C02 Domain 2、DVA-C02 Domain 4、SCS-C03総合ガイド）のHTMLと対応Markdown、計8ファイルを `archive/Books/html|md/` と `archive/Aws/html|md/<試験・ドメイン>/` へ移動した。内容は変更せず、全ファイルのバイト一致・SHA-256一致を確認。Git管理外の保存先・サイズ・ハッシュ・復元元コミット `8e888247` は `docs/migration-inventory/completed-guides-2026-10-29.archive.json` に記録している。移動コミットは `bb338096`。

原本不在下で4教材の関連49ファイル・409テストすべて成功。アプリ実装への変更はなし。直下のHTMLは未移行8件のみ。静的集計1285ソース・412対応・491テストファイルは不変。npm・ビルドは未実行。過去の「原本を直下に保持」という記述は移動前の履歴として扱う。

## 2026-10-29: SAP-C02 Domain 2

`app/aws/solutions-architect-professional/domain2/` に Server `page.tsx`、Client `SapDomain2Guide.tsx` / `NavBar.tsx`、memo化した `Diagram.tsx`、8分割の `sections/`、定数とテーマJSON、スコープCSSを追加。全6タスク・66表・23図・5コード例・51リスト項目・81外部リンク出現・23チェック項目を原本から移行。原本単体のMermaid派生色を全量固定し、黒塗りを防止。ホーム・HeaderのDomain 2（29%）導線と明色フッターを統合。`bun scripts/migrate-sap-domain2.mjs <foundation|task21|task22|task23|task24|task25|task26|appendix>` で固定Git原本から本文を再生成できる。

## 2026-10-29: DDIA 学習ガイド

`app/recommended-books/designing-data-intensive-applications/` に Server `page.tsx`、Client `DdiaGuide.tsx` / `NavBar.tsx`、`constants.ts`、スコープ付き `page.css` を追加。原本の12章立て・14図・13チェック項目を保持し、Books導線へ統合。固定Git由来fixtureで本文・属性・階層・CSS値・図DSLを全量照合する。

Updated 2026-10-29

2026-10-29 DVA-C02 Domain 4付録A: 原文を保持した13問のカード表示と、各設問で回答を選ぶ即時採点を実装。12問はラジオボタン、問11はチェックボックスで2つ以上の選択時に集合の完全一致を判定する。選択変更・解除と設問ごとの独立状態に対応。正誤は色と記号で示し、各問の直下へ既存の正解・解説を同じ文言で表示する。元の解答一覧も保持。選択前の全文は空白・句読点・コード・リンクまで固定fixtureと完全一致する。`PracticeQuestion.tsx` と付録専用 `practice.css` を追加し、再生成処理にも反映した。

検証: 関連17ファイル・225件、型検査・対象ESLint成功。Chromeで1440/768/390pxの実コンポーネント静的描画に対し、全文不変・13カード・全選択肢・解答表の収まりを検証する3件が成功。採点操作はVitestで全13問・誤答・回答変更・複数選択の過不足と解除を検証した。ページ全体のブラウザー操作検証とは区別する。npm・ビルド・開発サーバーは未実行。Red `a2411128`、カード装飾 `a14ff9a5`、採点Red `67a4776a`、採点Green `a1b51073`。

2026-10-29 DVA-C02 Domain 4 Mermaid黒塗り修正: ページの部分的なthemeVariablesが共通dark初期化とマージされ、未指定のmainBkg（#0f2040）・clusterBkg（#0d1a2e）等が残っていた。原本単体の全派生色を `render-theme.json` へ固定し、`Diagram.tsx` から使用する。`bun scripts/gen-dva-troubleshooting-theme.mjs` とscaffold再生成にも反映。Red `e0eb617d`、修正 `b2cc12f2`。関連15ファイル・219テスト、型検査・対象ESLint成功。Chromeで全34図の修正前の配色不一致を再現し、修正後のSVGノード・グループ・ラベル色が原本単体と完全一致する1件が成功。npm・ビルド・開発サーバーは未実行。

SVG検証は `PLAYWRIGHT_BROWSER_CHANNEL=chrome bunx --no-install playwright test --config=playwright.mermaid.config.ts` で実行する。ページ全体のレイアウト検証とは区別する。

2026-10-29 DVA-C02 Domain 4移行: `/aws/developer-associate/domain4` に全3タスク・24スキル（Step 0〜24）・33セクション、159表・34図・25コード例・181リスト項目・練習問題13問を全文移行。原本のライト配色、288px目次、Hero、表、点・番号・入れ子・字下げを保持。コードは空行・字下げ・等幅フォントとJSON/Pythonの構文色を保持する。目次の現在位置・モバイル開閉・hash/focus、図の原本DSL・テーマ・自然倍率、ホームとHeaderのDomain 4（18%）、共有フッターの明色切替を実装した。 実体: `app/aws/developer-associate/domain4/page.tsx`（metadata）、`TroubleshootingGuide.tsx` と `sections/`（Server本文）、`NavBar.tsx`（Client目次）、`Diagram.tsx`（共有Mermaid）、`CodeBlock.tsx`（静的構文色）、`constants.ts`、`mermaid-theme.json`、`page.css`。

検証: 2026-10-29 全体Vitestは462ファイル・4252件すべて成功（`bun run test -- --maxWorkers=4`）。DVA関連13ファイル・182件成功。最終整形後のDomain 4＋原本抽出は6ファイル・27件成功、共有フッター3件も成功。34図すべてのMermaid構文解析、全本文・表結合・リスト階層・コード行・CSS宣言の全量比較と欠落検出を含む。型検査・全体ESLint成功。原本HTMLは保持し、テストは固定Git由来fixtureのみを参照する。npm・本番ビルドは依頼に従い未実行。ブラウザーE2Eは今回未実行、目視確認はユーザー担当。

2026-10-28 SAP/SCS Domain 1テスト修正: 本文訂正を `__tests__/helpers/domain1-source-corrections.ts` に明示し、固定Git由来fixtureを保持したまま表示期待値へ適用。SAPのフォーカス枠改善もCSS比較で検証する。対象28ファイル・222件成功。テスト変更のみのためE2E・本番ビルドは省略。全体の最終結果は `MIGRATION_PROGRESS.md` の現在地を参照。

2026-10-27 AIB-C01 Domain 4移行: `/aws/ai-business-strategist/domain4` に全4タスク・19スキル、54表（th162・td883）・12図・54リスト項目・8外部リンク出現・32目次・練習問題6問・チェックリスト22項目を全文移行。原本のライト配色・302px目次・全幅メインコンテンツ（`calc(100% - 302px)`）・Hero濃紺グラデーション・表ヘッダー/Blockquote/H3左ボーダー・点/番号/階層/字下げ・Mermaidライトテーマ全変数とラッパー透過・チェックリスト進捗カウンター/バーを完全復元。本文はServer Component、目次とチェックリスト操作はClientへ分離し、全画面共通フッターの明色テーマ切替、Tailwind `@theme` トークン化（`--color-aib-d4-*` 21変数）を適用。ホームとHeaderへDomain 4（24%）を追加。原本HTML（229767バイト・SHA-256 `63197732f3772f0a4b0b5b33893ee4c54ef3a6c21b3ea145b9f4b1d087cc902a`）およびMarkdown（86525バイト・SHA-256 `ab92b5932b0d7356e171bfe0765049bd7a97745d0a666d53119ca6f1cba0b7af`）を `archive/Aws/html|md/ai-business-strategist/domain4/` へバイト一致・SHA-256一致で移動・退避し、直下から原本を削除。保存先とハッシュを `docs/migration-inventory/aws-ai-business-strategist-domain4-guide.archive.json` に記録。原本不在下でDomain 4全5テストファイル（30件）およびAIB関連＋共通Footer全16ファイル（107件）が100%成功することを検証。TypeScript型検査・ESLint成功。

2026-10-27 SCS-C03 Domain 1移行: `/aws/security-specialty/domain1` に全3タスク・13スキル、51表（th135・td810）・9図・9コード（64行）・130リスト項目・62外部リンク出現・48目次・確認問題8問・チェックリスト19項目を全文移行。原本のライト配色・300px目次・点/番号/階層/字下げ・コード行構造を保持。本文はServer Component、目次とチェックリスト操作はClientへ分離し、全画面共通フッターの明色テーマ切替、MermaidDiagramラッパー透過・自然倍率表示、Tailwind `@theme` トークン化（`--color-scs-d1-*` 24変数）を適用。ホームとHeaderへDomain 1（16%）を追加。原本HTML（267824バイト・SHA-256 `e977a30b0d1a29790c8512544afa4ef7082faf7b4906c07440b6086d2a5f2b34`）およびMarkdown（90105バイト・SHA-256 `afafae0d45d08f3b25960541aba88dec19b0d987847a808b72c824f57bd0bc3c`）を `archive/Aws/html|md/security-specialty/domain1/` へバイト一致・SHA-256一致で移動・退避し、直下から原本を削除。保存先とハッシュを `docs/migration-inventory/aws-scs-c03-domain1-guide.archive.json` に記録。固定Git `90bc905f` 由来fixtureで原本・archive不在でも全17テストファイル（139件）＋共通Footer 3件の計18ファイル・142件が100%成功することを検証。TypeScript型検査・ESLint成功。

2026-10-27 ANS-C01 Domain 4原本アーカイブ退避: 直下に残存していた `Ans-c01-domain4-network-security-compliance-governance-guide.html`（274038バイト・SHA-256 `ca19a5e8...`）および `Ans-c01-domain4-network-security-compliance-governance-guide.md`（133787バイト・SHA-256 `7a74575c...`）を `archive/Aws/html|md/advanced-networking-specialty/domain4/` へバイト一致・SHA-256一致で移動・退避。保存先と完全なハッシュを `docs/migration-inventory/aws-ans-c01-domain4-guide.archive.json` に記録。直下から原本を削除し、原本不在下で全15テストファイル（97件）の100%成功、および固定Git `c2b4535c` 由来fixtureのバイト一致再生成を検証。TypeScript型検査・全体ESLint成功。

2026-10-27 ANS-C01 Domain 3原本アーカイブ退避: 直下に残存していた `Ans-c01-domain3-network-management-operation-guide.html`（356451バイト・SHA-256 `c413d557...`）および `Ans-c01-domain3-network-management-operation-guide.md`（107870バイト・SHA-256 `af7d1fee...`）を `archive/Aws/html|md/advanced-networking-specialty/domain3/` へバイト一致・SHA-256一致で移動・退避。保存先と完全なハッシュを `docs/migration-inventory/aws-ans-c01-domain3-guide.archive.json` に記録。直下から原本を削除し、原本不在下で全13テストファイル（98件）の100%成功、および固定Git `ead3ccbc` 由来fixtureのバイト一致再生成を検証。TypeScript型検査・全体ESLint成功。

2026-10-26 SAP-C02総合ガイド移行: `/aws/solutions-architect-professional` にStep 0〜23・全4ドメイン、143表（th333・td1863）・50図・39リスト項目・175外部リンク出現・167目次・105参考文献・練習問題12問を全文移行。原本のライト配色・点/番号/階層/字下げを保持し、サイドバーは標準280pxへ対応付けた。本文はServer Component、目次とクイズ操作はClientに分離。ホームとHeaderへ総合ガイドを追加し、Domain 1詳細も保持。原本のコードブロックとチェックボックスは0件。
対象14ファイル・111件＋共通Footer3件、ブラウザー5件、型検査・全体ESLint・対象Markdown lint成功。1440/768/390pxで全50SVGの自然倍率・viewBox内包、原本CSSとの全リスト計算済みスタイル一致、167目次のhash/focusとモバイル開閉、12問の採点・解説・集計・リセット、横はみ出しなし、axe違反0・コンソールエラー0を確認。 全体Vitestは431ファイル・4009件中4003件成功。失敗6件は着手前からのSAP-C02 Domain 1（design 1件・mutations 5件）のみ。

原本HTML509866バイト・Markdown140000バイトは `archive/Aws/html/solutions-architect-professional/` と `archive/Aws/md/solutions-architect-professional/` へバイト一致・SHA-256一致で移動済み。ハッシュと保存先は `docs/migration-inventory/aws-sap-c02-guide.archive.json` に記録。archiveはローカル専用・Git管理外で、CIは固定Git `f27f2e68c7608666ba3bf58e6eff83c0b6d3d1cc` 由来fixtureを使用し、原本・archiveなしでも再生成できる。

npm・本番ビルドは未実行、目視確認はユーザー担当。既存3000番は停止せず、一時コピー・新規キャッシュ・webpackの開発サーバーを3017番で使ってブラウザー検証した。127.0.0.1では開発リソースが拒否されたため、localhostで再実行した。 静的集計1188ソース・382対応（32%）・450テストファイル、133ルート。静的集計とテスト実行成功数・行カバレッジは区別する。

2026-10-26 ANS-C01総合ガイドのコード表示修正: 全14ブロック・168行を1行1つのcode要素へ統合し、単語・記号ごとの縦並びを解消。空行6か所は余白0の空段落で保持し、ブラウザーのinnerTextにも原本どおり残す。コード本文・インデント・空行・22種の構文トークンは固定fixtureと完全一致する。

検証: ANS関連73ファイル・552件成功。ブラウザー8件成功（コード専用3件＋総合ガイド既存5件）。1440/768/390pxで全168行の表示位置と全14ブロックのコピー対象テキストを検証し、既存の図・リスト・目次・導線・axe検証も成功。型検査・全体ESLint成功。全体Vitestは今回は再実行せず、直近の全体結果は2026-10-25の3897件中3891件成功・既存SAP-C02の6件失敗。npm・ビルド未実行、目視確認はユーザー担当。

Red `cc139326` / Green `00a04e3c`。修正前はDOM1件とブラウザー3件で分断・コピー文字列不一致を再現。原本fixtureとarchiveは変更していない。追加テストは `__tests__/aws/advanced-networking-specialty/code-layout.test.tsx` と `e2e/aws-ans-c01-code-layout.spec.ts`。

2026-10-25 ANS-C01総合ガイド移行: `/aws/advanced-networking-specialty` に全4ドメイン・16タスク、104表（th251・td1463）・39図・14コード・380リスト項目・187外部リンク出現・27目次・91参考文献を全文移行。原本のライト配色・点/番号/階層/字下げ・コード全行と22種の構文トークンを保持。サイドバーは標準280pxへ対応付け、本文はServer Component、目次操作はClientに分離。ホームの概要リンクとHeaderへ総合ガイドを追加し、既存4ドメイン詳細も保持した。原本にチェックボックス・クイズの実体はなく追加していない。

検証: ANS関連72ファイル・551件成功。ブラウザー5件成功（1440/768/390px・リスト装飾破壊検出・ホーム/Header導線）。全39SVGの自然倍率・viewBox内包、原本CSSとの全リスト計算済みスタイル一致、27目次・開閉・hash/focus、横はみ出しなし、axe違反0・コンソールエラー0を確認。型検査・全体ESLint成功。npm・ビルドはユーザー指定により未実行。目視確認はユーザー担当。

全体Vitestは416ファイル・3897件中3891件成功。失敗6件は着手前からのSAP-C02 Domain 1（design 1件・mutations 5件）で、今回の移行に由来する失敗はない。 静的集計は1175ソース・371対応（32%）・433テストファイル、App Routerは132ルート。静的集計はテスト実行成功数や行カバレッジとは区別する。

原本HTML（514642バイト）・Markdown（169011バイト）は内容を変更せず `archive/Aws/html/advanced-networking-specialty/` と `archive/Aws/md/advanced-networking-specialty/` へ移動済み。移動前後のバイト一致・SHA-256一致を確認し、保存先と完全なハッシュを `docs/migration-inventory/aws-ans-c01-guide.archive.json` に記録した。archiveはローカル専用・Git管理外。CIは固定Git `6ed18037dc3b87fb6fefe40c895c93776319b72c` のコミット済みfixtureを使用し、原本・archiveがない一時作業ディレクトリでも同じfixtureを再生成できる。

2026-10-24 SCS-C03完全ガイド移行: `/aws/security-specialty` に全6ドメイン・16タスク、101表・40図・27コードブロック・251リスト項目・219外部リンク出現・56目次・確認問題8問を全文移行。原本のライト配色、点・番号・階層・字下げ、コード全行と構文色、円グラフの暗黙のbase配色を保持。サイドバーはリポジトリ標準の280pxへ対応付けた。本文はServer Component、目次とクイズだけをClient Componentへ分離し、ホームとHeaderへ導線を追加した。

検証: 全体Vitest401ファイル・3779件成功（`bun run test -- --maxWorkers=4 --testTimeout=30000 --retry=1`）。対象18ファイル・138件。型検査・全体ESLint成功。Chrome5件成功（1440/768/390px・リスト装飾破壊検出・ホーム/Header導線）。全40SVGの自然倍率・viewBox内包、目次のhash/focus・モバイル開閉、全8問の採点・解説・集計・リセット、横はみ出しなし、axe違反0・コンソールエラー0を確認。npm・ビルドはユーザー指定により未実行。

開発環境の注意（2026-10-24解消）: 通常のTurbopackでSVGが40図中1図で止まり、スクロールもできなかった原因は共通フッターの `body:has(...)` だった。Mermaidは採寸用の一時要素を `<body>` 直下へ挿入するため、挿入のたびに文書全体のスタイル再計算が強制されていた（`body:has(> ...)` でも停止）。フッターの明色ルールを兄弟結合子 `:is(<ページルート>) ~ .footer` に変更し、Turbopackで40図が約5秒で描画されることと、SCSのChrome5件の成功を確認した（`--webpack` の指定は不要）。webpackでだけ停止しなかった理由は未解明。回帰テストは `__tests__/components/Footer.palette.test.ts`。ビルドは未実行。

原本HTML・Markdownは内容を変更せず直下に保持し、`archive/Aws/html/security-specialty/` と `archive/Aws/md/security-specialty/` にバイト一致・SHA-256一致でコピー済み。保存先と完全なハッシュは `docs/migration-inventory/aws-scs-c03-guide.archive.json` に記録。archiveはローカル専用・Git管理外で、CIは固定Git `71ff4c1a4e31847687477659cf16076fb4264a63` 由来のコミット済みfixtureを使用する。原本・archiveがない一時作業ディレクトリでもfixture再生成のバイト一致を検証済み。

構成: `app/aws/security-specialty/page.tsx`（metadata）、`SecuritySpecialtyGuide.tsx`（全8区画の組立）、`sections/`（導入・Domain 1〜6・復習の全文）、`NavBar.tsx`（56目次・hash/focus・scroll spy）、`Quiz.tsx`（単一/複数選択・採点・解説・進捗・リセット）、`Diagram.tsx` / `constants.ts` / `mermaid-pie-theme.json`（全40図）、`page.css`（スコープ付き原本CSS）。

2026-10-24 AWS SAP-C02 Domain 1移行: `/aws/solutions-architect-professional/domain1` に全5タスク・49表（th135・td686）・19図・1コード（21行）・213リスト項目・130外部リンク出現・78目次・確認問題6問を全文移行。原本ライト配色・340px目次・直下aタグ構造・点/番号/階層/余白・コード全行と構文色・全69スクロール領域の固有ラベルを保持。対象Vitest8ファイル・53件、型検査、全体ESLint、Markdown lintすべて成功。検証結果・段階別コミットはMIGRATION_PROGRESS.mdの最新記録を参照。

2026-10-21 ANS-C01 Domain 4移行: `/aws/advanced-networking-specialty/domain4` に全3タスク・58表（th148・td999）・31図・14コード・181リスト項目・176外部リンク出現・99目次・確認問題8問を全文移行。原本ライト配色・300px目次・点/番号/階層/余白・コード全行と構文色を保持。単一選択7問・複数選択1問の33選択肢と8解答開閉を保持し、採点や永続化は追加していない。ホームとHeaderへDomain 4（24%）を追加。原本HTML・Markdownは `archive/Aws/html|md/advanced-networking-specialty/domain4/` へバイト一致で保存後に直下から削除し、完全なハッシュを `docs/migration-inventory/aws-ans-c01-domain4-guide.archive.json` に記録。固定Git `c2b4535c7fdf4ec40872a9e093c184b22c0ac954` 由来fixture（`15e57d87`・`af45f5d8`・`717ff01e`・`24fd796e`・`bc3999a1`・`3782b32c`・`dace8727`・`836d4531` は旧版の固定値）で原本・archive不在でも全文・順序・表構造・コード行・トークン・CSSを検証する。npm・ビルド未実行、表示は自動検証の結果で判定し、ユーザーへ目視確認を求めない。検証結果・段階別コミットはMIGRATION_PROGRESS.mdの最新記録を参照。

最終検証: 全体Vitest373ファイル・3579件すべて成功（`bun run test -- --maxWorkers=4 --testTimeout=30000`、再試行なし）。Domain 4は15ファイル・97件。Chromeは1440/768/390px・装飾破壊検出・ホーム/Header導線の5件成功。全31SVGの自然倍率・viewBox内包、全リストの原本計算済みCSSとの一致、99目次・モバイル開閉・hash/focus、33選択肢・8解答開閉、横はみ出しなし、axe違反0・コンソールエラー0を確認。型検査・全体ESLint・対象Markdown lint成功。

2026-10-21 ANS-C01 Domain 3移行: `/aws/advanced-networking-specialty/domain3` に全3タスク・91表（th237・td1190）・26図・7コード・38リスト項目・34外部リンク出現・52目次・シナリオ8問を全文移行。白背景・300px目次・リストの点と階層・インデント・構文ハイライト・解答開閉を保持。本文はServer Component、目次操作はClientのNavBarへ分離。原本HTML・Markdownは `archive/Aws/html|md/advanced-networking-specialty/domain3/` へバイト一致で保存後に直下から削除し、固定Git `ead3ccbc77b05f1e80bef5d64042a2704c2bf238` 由来（`15e57d87`・`717ff01e`・`e035a60f`・`670b47ec`・`3782b32c`・`dace8727`・`836d4531` は旧版の固定値）fixtureで原本・archive不在でも全文・順序・表構造・コード行・トークン・CSSを検証する。ホームとHeaderへDomain 3（20%）を追加し、Domain 1・2の導線を保持。原本由来のコード色2系統だけを同系色でAA補正し、本文リンクに下線を追加。原本にチェックボックス実体はなく、追加していない。npm・ビルドは依頼に従い未実行、表示は自動検証の結果で判定し、ユーザーへ目視確認を求めない。検証結果と段階別コミットはMIGRATION_PROGRESS.mdの最新記録を参照。

2026-10-20 ANS-C01 Domain 2移行: `/aws/advanced-networking-specialty/domain2` に全4タスク・57表（th150・td803）・26図・11コード・86リスト項目・43外部リンク出現・59目次・確認問題8問を全文移行。原本のライト配色・300px目次・点と番号・インデント・構文ハイライト・解答解説の折りたたみを保持。操作状態はClientのNavBarに限定し、本文はServer Component。ホームとHeaderのDomain 1導線を保持したままDomain 2を追加。原本HTML・Markdownは `archive/Aws/html|md/advanced-networking-specialty/domain2/` へバイト一致で保存後に直下から削除（`fd574555`。保存時のHTML SHA-256 `c1842b2f…` は修正前の旧版で廃止。現在のarchive原本は固定Git `c5c1000f` とバイト一致するHTML SHA-256 `aa28eb6d…` で、再生成fixtureの元）し、固定Git由来fixtureで全量照合する。コミット・npm・ビルド未実行。手動の目視確認は未実施で、Chrome自動検証（1440/768/390px・導線を含む5件成功）で代替。検証結果はMIGRATION_PROGRESS.mdの最新記録を参照。

2026-10-20 ANS-C01 Domain 1移行: `/aws/advanced-networking-specialty/domain1` に全6タスク、75表（th189・td1016）、15図、7コード、301リスト項目、94外部リンク出現、12目次、練習問題6問、チェック10項目を全文移行。原本のライト配色・300px目次・点と番号・独自カウンター・インデント・コードの色/太字/斜体を保持。単一選択4問・複数選択2問の即時採点、選択変更、解説開閉、集計・リセットとチェック完了数・進捗・クリアに対応。ANSをホームとHeaderへ登録し、Domain 1へ直接接続。対象16ファイル・140件、Chromeの1440/768/390pxを含む5件が成功。全リストの計算済みCSSを原本CSSの隔離iframeと全量照合し、全15SVGの自然倍率・viewBox内包、独自番号、キーボード操作、axe違反0・コンソールエラー0を確認。全体Vitestは329ファイル・3269件すべて成功。型検査・全体ESLint・最終変更箇所のESLint・対象Markdown lint成功。原本HTML・Markdownは保持し、テストは固定Git由来fixtureを使用。npm・ビルドは依頼に従い未実行、表示は自動検証の結果で判定し、ユーザーへ目視確認を求めない。最新実装HEAD `d9195d44`。

2026-10-20 AIP-C01 Domain 5移行: `/aws/generative-ai-developer-professional/domain5` に全2タスク・14スキル、47表（th119・td713）、18図、206リスト項目、92外部リンク出現、2コード、41目次、練習問題5問、チェック23項目を全文移行。原本のライト配色・300px目次・点と番号・入れ子・インデント・Python/Logs Insightsの色分けを保持。全問の提出・採点・正誤・解説・進捗・リセットとタスク別チェック数を検証。原本Git由来fixtureで全文・順序・構造・全CSSを照合し、本文等7種の欠落とCSS破壊5種を検出。対象12ファイル・88件とChromeの1440/768/390pxを含む4件が成功し、全18SVGの自然倍率・viewBox内包・axe違反0・コンソールエラー0を確認。原本由来の問題補助文のコントラスト不足だけを既存の濃い補助文字色へ補正。HTML・Markdown原本は保持し、テストはarchiveに依存しない。npm・ビルドは依頼に従い未実行。表示は自動検証の結果で判定し、ユーザーへ目視確認を求めない。全体Vitestは313ファイル・3128件すべて成功。型検査・全体ESLint・最終変更箇所のESLint・対象Markdown lint成功。最新実装HEAD `efa67cc5`（最終表示修正 `ce42e381`）。

2026-10-17 AIP-C01 Domain 4移行: `/aws/generative-ai-developer-professional/domain4` に全3タスク・16スキル、84表（th234・td1388）、22図、140リスト項目、36外部リンク出現、2コード、26目次、練習問題12問を全文移行。原本の明色テーマ、点・番号・入れ子・インデント、シンタックスハイライト、単一/複数選択の採点・正誤・解説・得点・回答進捗・リセットを保持。全108横スクロール領域に固有の読み上げ名を付与。Domain 4は原本削除後103件、Chromeは1440/768/390px・全22SVGの自然倍率とviewBox内包・全問・導線・CSS破壊検出を含む6件成功。axe違反0・コンソールエラー0。原本400008バイトをバイト一致・SHA-256付きでローカルarchiveへ保存し、テストは固定Git由来fixtureのみを使用。全体Vitestは301ファイル・3021件中3020成功、失敗1件は作業前からのAIBナビ期待値。型検査・全体ESLint・対象Markdown lint成功。`bun run build`・`bun run lint` は2026-10-17の進捗同期で成功。npm・目視確認は未実施（Playwrightによる3画面幅の自動レイアウト検証は上記のとおり成功）。

2026-10-17 Domain 3の横線整理: 各Step・Task見出しの上罫線をなくし、原本の区切り線27本だけを保持。本文・表・図・リスト装飾は維持。Red `6b2bb8cf`、Green `74d8461a`。関連106件、1440/768/390pxの追加ブラウザ1件、対象ESLint成功。npm・ビルド未実行。

2026-10-17 AIP-C01 Domain 3移行: `/aws/generative-ai-developer-professional/domain3` に全4タスク・15スキル、44表・19図・189リスト項目・125外部リンク出現・練習問題10問を全文移行。ライト配色、点・番号・入れ子、300px目次、クイズの回答・正誤・解答表示・集計・リセットを保持。ホーム・Headerから詳細版へ移動可能。原本削除後のDomain 3検証105件、AIP関連回帰450件、1440/768/390pxを含むChrome 6件が成功。全図の自然倍率とviewBox内包、CSS破壊5種、DOM欠落5種、axe違反0を検証。図・表のキーボード横スクロールと閉じたモバイル目次の非表示を補完。原本306478バイトをバイト一致・SHA-256付きでローカルarchiveへ保存し、テストは固定Git由来fixtureのみを使用。実装 `75a38b02`、原本保存 `e9cbf3f3`。npm・ビルド未実行、表示は自動検証の結果で判定し、ユーザーへ目視確認を求めない。最終全体テスト・型検査・lintの結果は移行進捗の現在地を参照。

2026-10-16 Domain 2練習問題の選択・採点: 全15問の選択肢の点を除き、11問をラジオボタン、4問をチェックボックスにした。選択後に「答えと解説」を開くと正誤を表示し、開いた後の選択変更にも追従。複数選択は正解集合の完全一致、未回答は案内表示。選択・開閉状態は問題ごとに独立し、原本の問題文・選択肢・解説は保持。採点22件と目次通知順の回帰を含む関連141件が成功。全体2808件中2807成功、既存AIBナビ期待値1件のみ失敗。ブラウザ9シナリオを検証し、1440pxで見つけた目次上書きは通知順に依存しない選択へ修正して3画面幅を再確認。最新実装HEAD `fa93bb13`（採点 `d11350ad`）。型検査・ESLint・Markdown lint成功。npm・ビルド未実行。

2026-10-16 Domain 2末尾案内文の削除: ユーザー指定により末尾の完了案内文を表示とテスト期待値から除外。原本監査fixtureは固定Gitの証跡として保持し、表示の期待値から対象段落と強調要素だけを除く。関連16ファイル・118件、1440pxブラウザ1件、対象ESLint成功。末尾文削除実装 `4d52589e`（Red `b0e57c77`）。npm・ビルド未実行。

2026-10-16 AIP-C01 Domain 2表示の再精査: 共通Mermaidのdark初期化から継承されていたmainBkg等をページ内のライト描画設定で明示的に置換し、非推奨initからconfig frontmatterへ移行。全42図のノード・状態図・シーケンス図の背景と実際の文字の色、およびコントラスト比を検証。Python・JSON・CloudWatch Logs Insightsの全9コードを原文・空行・インデントを保持してハイライトし、セクション境界と5つのTask見出しの横線を最大1本へ整理。15問は選択肢と解説を保持したカード形式へ改善。全文fixtureは改変せず、関連251件・ブラウザ8件と追加コントラスト検証が成功。表示改善実装 `aefa7b6e`。型検査・全体ESLint・対象Markdown lint成功。全体Vitestの最終結果はMIGRATION_PROGRESS.md参照。npm・ビルド未実行、表示は自動検証の結果で判定し、ユーザーへ目視確認を求めない。

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

GCP/AWS/Cisco/CompTIA 資格試験対策およびエンジニアリング・DevOps名著（『Accelerate』、『Site Reliability Engineering』など）の学習を目的としたNext.js学習アプリ。

試験データの正本は `app/constants.ts` の `ALL_EXAMS` 配列で、`EXAMS` は `HANDS_ON_ENABLED` フラグで `ALL_EXAMS` をフィルタした派生値（編集対象ではない）。ナビゲーションは `app/navigation.ts` の `toNavTree(EXAMS)` で自動生成されるため、新試験追加時は **`Header.tsx` を直接編集しない**。新試験追加の手順は ① `app/constants.ts` の `ALL_EXAMS` にエントリ追加、② `app/globals.css` に `icon-theme-<id>` ユーティリティ追加、③ 試験ページ作成 の 3 ファイルのみ変更すれば Header に自動反映される。

## コマンド

```bash
# 開発（ローカル）
bun run dev          # Turbopack で開発サーバー起動（localhost:3000）
bun run build        # プロダクションビルド
bun run lint         # ESLint
bun run markdownlint -- <file> # Markdown lint（プロジェクト固定版）
bun scripts/check-dva-deployment-mutations.mjs # DVAデプロイの5種類の欠落検出・原状復元

# テスト
bun run test         # Vitest（ユニット・コンポーネント）
bun run test:watch   # Vitest ウォッチモード（単一ファイル: vitest run __tests__/foo.test.tsx）
bun run test:e2e     # Playwright E2E（chromium project: smoke / nav / a11y / visual / 各ドメイン）
bun run test:perf    # Playwright perf project: Core Web Vitals (LCP/CLS/TBT) を perf-budgets.json と比較
bun run test:security # bun audit --json を集計し high/critical 検出時に exit 1 (scripts/security-audit.mjs)
bun run test:md-to-html # md-to-html スキルの監査 2 本の自己テスト (bun test にパス明示)

# カバレッジ可視化
bun run dashboard    # 静的スキャンで docs/coverage-dashboard.html を再生成

# パフォーマンス手動レポート（深掘り分析用）
bun run build && bun run perf:report  # @lhci/cli autorun。.lighthouseci/ に JSON/HTML 出力
```

初回E2Eテスト前: `bunx playwright install`

カバレッジダッシュボードは `__tests__/` と `e2e/` の静的解析（`import '@/...'` と `page.goto('/...')` の抽出）で生成される単一 HTML。`@vitest/coverage-v8` 等のランタイム計測ではないため、テスト追加時は `bun run dashboard` を再実行する。

```bash
# Docker
bun run docker:rebuild # コンテナ停止 → 本番イメージ作成 → 開発コンテナ再構築・起動
make dev             # 開発サーバー起動（hot reload、bind mount）
make prod            # 本番ビルド & 起動（standalone、256MB）
make down            # コンテナ停止・削除
make logs            # 本番コンテナのログ表示
make logs-dev        # 開発コンテナのログ表示
make shell           # 本番コンテナ内シェル（デバッグ用）
make clean           # コンテナ + 名前付きボリューム削除
make help            # コマンド一覧
```

Docker 関連ファイル: `Dockerfile`（本番）、`Dockerfile.dev`（開発）、`compose.yaml`、`.dockerignore`

```bash
# Netlify（CI/CD 自動ビルド）
# netlify.toml に従い Netlify が自動実行。手動トリガー不要。
# ローカルで Netlify モード（output=undefined）のビルド確認:
bun run build   # NEXT_OUTPUT_MODE 未設定で実行
```

## アーキテクチャ

**ルーティング:** Next.js 16 App Router。全ページは `app/` 配下。

```text
app/
  layout.tsx                        # ルートレイアウト（Header/DisclaimerBanner/Footer、フォント定義）
  page.tsx                          # トップページ（データ抽出とセクション合成）
  globals.css                       # グローバルスタイル（デザイントークン定義）
  constants.ts                      # 試験データ正本（ALL_EXAMS / STATS。EXAMS は派生）。新試験はここに追加するだけ
  navigation.ts                     # toNavTree(EXAMS) adapter → NavGroup[] を生成し Header が参照
  gcl/
    associate-cloud-engineer/
      page.tsx                      # ACE 試験対策ページ
      ace.css                       # Aurora テーマ（ページ固有）
      complete-advanced-guide/
        page.tsx                    # 完全試験対策ガイドページ
        page.css                    # ページ固有スタイル
        constants.ts                # 定数（Mermaidダイアグラム等）
        NavBar.tsx                  # サイドバーナビ
      section1/
        page.tsx                    # Section 1 完全ガイド（Server。メタデータ定義）
        Section1Guide.tsx           # 本文＋インタラクション（client。進捗バー/scroll spy/チェックリスト）
        NavBar.tsx                  # サイドバーナビ
        constants.ts                # Mermaid 図定義（diag-6 修正済み）
        page.css                    # ページ固有スタイル（token 整合）
      section2/
        page.tsx                    # Section 2 完全ガイド（Server。メタデータ定義）
        Section2Guide.tsx           # 本文＋インタラクション（client。進捗バー/scroll spy/チェックリスト）
        NavBar.tsx                  # サイドバーナビ
        constants.ts                # Mermaid 図定義（21図）
        page.css                    # ページ固有スタイル（token 整合）
      section3/
        page.tsx                    # Section 3 完全ガイド（Server。メタデータ定義）
        AceSection3Guide.tsx        # 本文＋インタラクション（client。進捗バー/scroll spy/チェックリスト）
        NavBar.tsx                  # サイドバーナビ
        constants.ts                # Mermaid 図定義（10図）
        page.module.css             # ページ固有スタイル（token 整合）
      cloud-load-balancing-guide/
        page.tsx                    # Cloud Load Balancing 完全入門（Server。メタデータ定義）
        CloudLoadBalancingGuide.tsx # 本文＋インタラクション（client。進捗バー/scroll spy/コピー機能）
        NavBar.tsx                  # サイドバーナビ
        constants.ts                # Mermaid 図定義（6図）
        page.module.css             # ページ固有スタイル（CSS Modules、token 整合）
      domain1/page.tsx              # Domain 1: 環境設定
      domain2/
        page.tsx                    # Domain 2: 計画と実装
        constants.ts                # Domain 2 固有定数
        domain2.css                 # ページ固有スタイル
        layout.tsx                  # Domain 2 レイアウト
        Chapter17.tsx / Chapter18.tsx  # セクションコンポーネント
      domain3/
        page.tsx                    # Domain 3: 運用管理
        constants.ts                # Domain 3 固有定数
        domain3.css                 # ページ固有スタイル
        layout.tsx                  # Domain 3 レイアウト
      domain4/
        page.tsx                    # Domain 4: アクセスとセキュリティ
        constants.ts                # Domain 4 固有定数
        domain4.css                 # ページ固有スタイル
        layout.tsx                  # Domain 4 レイアウト
  comptia/
    network-plus/
      page.tsx                      # CompTIA Network+ (N10-009 / V9) 完全ガイド (Server)
      ComptiaNetworkPlusGuide.tsx   # 本文＋インタラクション (Client。全13セクション、Mermaid等)
      NavBar.tsx                    # サイドバーナビ (IntersectionObserver)
      constants.ts                  # Mermaid 図定義（4図）
      page.css                      # ページ固有スタイル（サイドバー幅280px契約準拠）
      networking-concepts-guide/
        page.tsx                    # Domain 1.0: Networking Concepts ガイド (Server)
        ComptiaNetworkingConceptsGuide.tsx # 本文＋インタラクション (Client。8ステップ、Mermaid 19図)
        NavBar.tsx                  # サイドバーナビ (ScrollSpy)
        constants.ts                # Mermaid 図定義（19図）、ナビ項目
        page.css                    # ページ固有スタイル（サイドバー幅280px契約準拠）
      network-implementation-guide/
        page.tsx                    # Domain 2.0: Network Implementation ガイド (Server)
        ComptiaNetworkImplementationGuide.tsx # 本文＋インタラクション (Client。Step 0〜5、Mermaid 10図)
        NavBar.tsx                  # サイドバーナビ (ScrollSpy)
        constants.ts                # Mermaid 図定義（10図）、ナビ項目
        page.css                    # ページ固有スタイル（サイドバー幅280px契約準拠）
      network-operations-guide/
        page.tsx                    # Domain 3.0: Network Operations ガイド (Server)
        ComptiaNetworkOperationsGuide.tsx # 本文＋インタラクション (Client。8トピック、Mermaid 10図)
        NavBar.tsx                  # サイドバーナビ (ScrollSpy)
        constants.ts                # Mermaid 図定義（10図）、ナビ項目
        page.css                    # ページ固有スタイル（サイドバー幅280px契約準拠）
      network-security-guide/
        page.tsx                    # Domain 4.0: Network Security ガイド (Server)
        ComptiaNetworkSecurityGuide.tsx # 本文＋インタラクション (Client。3ステップ、Mermaid 7図)
        NavBar.tsx                  # サイドバーナビ (ScrollSpy)
        constants.ts                # Mermaid 図定義（7図）、ナビ項目
        page.css                    # ページ固有スタイル（サイドバー幅280px契約準拠）
      network-troubleshooting-guide/
        page.tsx                    # Domain 5.0: Network Troubleshooting ガイド (Server)
        ComptiaNetworkTroubleshootingGuide.tsx # 本文＋インタラクション (Client。8セクション、Mermaid 2図)
        NavBar.tsx                  # サイドバーナビ (ScrollSpy)
        constants.ts                # Mermaid 図定義（2図）、ナビ項目
        page.css                    # ページ固有スタイル（サイドバー幅280px契約準拠）
    hands-on/
      secure-cicd-pipeline-guide/
        page.tsx                    # セキュアなコンテナCI/CDガイド（Server）
        SecureCicdPipelineGuide.tsx  # 原本全文・12セクション・6表・9コード
        NavBar.tsx                  # 目次・scroll spy・フォーカス移動
        constants.ts                # Mermaid 4図・NAV_ITEMS
        page.css                    # 原本CSS・リストマーカー保持
      cloud-load-balancing-guide/
        page.tsx                    # Cloud Load Balancing 完全入門（Server。メタデータ定義）
        CloudLoadBalancingGuide.tsx # 本文＋インタラクション
        NavBar.tsx                  # サイドバーナビ
        constants.ts                # Mermaid 図定義（6図）
        page.module.css             # ページ固有スタイル
      develop-your-gcp-network/
        page.tsx                    # GCPネットワーク完全入門（Server。メタデータ定義）
        DevelopYourGcpNetworkGuide.tsx # 本文＋インタラクション
        NavBar.tsx                  # サイドバーナビ
        constants.ts                # Mermaid 図定義（14図）
        page.css                    # ページ固有スタイル
      build-a-secure-google-cloud-network/
        page.tsx                    # 安全なGoogle Cloudネットワーク構築（Server。メタデータ定義）
        BuildASecureGoogleCloudNetworkGuide.tsx # 本文＋インタラクション
        NavBar.tsx                  # サイドバーナビ
        constants.ts                # Mermaid 図定義（11図）
        page.css                    # ページ固有スタイル
      set-up-an-app-dev-environment-on-google-cloud/
        page.tsx                    # アプリ開発環境構築 完全ガイド（Server。メタデータ定義）
        SetUpAnAppDevEnvironmentGuide.tsx # 本文＋インタラクション（client。Mermaid等）
        NavBar.tsx                  # サイドバーナビ
        constants.ts                # Mermaid 図定義（14図）
        page.css                    # ページ固有スタイル
      gcp-security-fundamentals-guide/
        page.tsx                    # Google Cloud セキュリティ基礎 完全ガイド（Server。メタデータ定義）
        GcpSecurityFundamentalsGuide.tsx # 本文＋インタラクション（client。Mermaid等）
        NavBar.tsx                  # サイドバーナビ
        constants.ts                # Mermaid 図定義（16図）
        page.css                    # ページ固有スタイル
      griffin-wordpress-gke-guide/
        page.tsx                    # Team Griffin チャレンジラボ 完全解説ガイド（Server。メタデータ定義）
        GriffinWordPressGkeGuide.tsx # 本文＋インタラクション（client。Mermaid等）
        NavBar.tsx                  # サイドバーナビ
        constants.ts                # Mermaid 図定義（3図）
        page.css                    # ページ固有スタイル
    genai-leader/
      page.tsx                      # Generative AI Leader トップ
      genai-leader.css              # Sapphire テーマ（ページ固有）
      constants.ts                  # 共通定数（作成日など）
      section1/
        page.tsx                    # Section 1: AI の基礎と ML の概念
        section1.css                # ページ固有スタイル
        components/                 # 分割されたセクションコンポーネント（Batch E）
      section2/
        page.tsx                    # Section 2: Google Cloud の Gen AI サービス
        section2.css                # ページ固有スタイル
        components/                 # 分割されたセクションコンポーネント（Batch E）
      section3/page.tsx             # Section 3: Gen AI ソリューションの開発
      section4/page.tsx             # Section 4: 責任ある AI
    cloud-digital-leader/
      layout.tsx                    # CDL 共通レイアウト
      page.tsx                      # CDL トップページ
      constants.ts                  # CDL 共通定数
      cdl.css                       # CDL 共通テーマ（--cdl-* トークン定義）
      components/
        SectionCard.tsx             # 共通カードコンポーネント
        shared/
          TableComponent.tsx        # 共通テーブルコンポーネント
      section1/
        page.tsx                    # Section 1: デジタルトランスフォーメーション
        components/sections/        # 分割されたセクションコンポーネント
      section2/
        page.tsx                    # Section 2: データとクラウドの基礎
        components/sections/        # 分割されたセクションコンポーネント
      section3/
        page.tsx                    # Section 3: AI によるイノベーション
        section3.css                # ページ固有スタイル（plain CSS）
        constants.ts                # Section 3 固有定数
        components/sections/        # 分割されたセクションコンポーネント
      section4/
        page.tsx                    # Section 4: インフラ&アプリのモダナイゼーション
        section4.module.css         # ページ固有スタイル（CSS Modules）
        constants.ts                # Section 4 固有定数（NAV_LINKS, MIGRATION_STRATEGIES）
        components/sections/        # 分割されたセクションコンポーネント
      section5/
        page.tsx                    # Section 5: セキュリティ＆コンプライアンス
        section5.module.css         # ページ固有スタイル（CSS Modules）
        constants.ts                # Section 5 固有定数
        components/sections/        # 分割されたセクションコンポーネント
      section6/
        page.tsx                    # Section 6: コスト管理・SRE・サステナビリティ
        components/                 # 分割されたセクションコンポーネント
    agwa/
      page.tsx                      # AGWA トップページ
      section1/
        page.tsx                    # Section 1: アカウント・ドメイン・ディレクトリ管理
        page.css                    # ページ固有スタイル
      section2/
        page.tsx                    # Section 2: コアサービス管理
        page.css                    # ページ固有スタイル
      section3/
        page.tsx                    # Section 3: データガバナンスとコンプライアンスの管理
        AgwaSection3Guide.tsx       # 本文＋全Mermaid図＋インタラクション
        NavBar.tsx                  # サイドバーナビ
        constants.ts                # Mermaid図定義
        AgwaSection3Guide.module.css # ページ固有スタイル（CSS Modules）
      section4/
        page.tsx                    # Section 4: セキュリティポリシーとアクセス制御の管理
        AgwaSection4Guide.tsx       # 本文＋全Mermaid図＋インタラクション
        NavBar.tsx                  # サイドバーナビ
        constants.ts                # Mermaid図定義
        page.css                    # ページ固有スタイル
      section5/
        page.tsx                    # Section 5: ブラウザとエンドポイントの管理 (Server)
        AgwaSection5Guide.tsx       # 本文＋全Mermaid図＋インタラクション (Client)
        NavBar.tsx                  # サイドバーナビ
        constants.ts                # Mermaid図定義 (10図)
        page.css                    # ページ固有スタイル
      section6/
        page.tsx                    # Section 6: 監視とトラブルシューティング (Server)
        NavBar.tsx                  # サイドバーナビ
        constants.ts                # 目次定義
        page.module.css             # ページ固有スタイル（CSS Modules）
        components/sections/        # AgwaSection6Guide 本文コンポーネント
    professional-cloud-network-engineer/
      page.tsx                      # PCNE 試験対策ページ（概要・ドメイン別解説）
      components/                   # セクションコンポーネント（Section1-6 + Summary）
      section1-vpc-design/
        page.tsx                    # Section 1: VPCネットワーク設計 完全ガイド (Server)
        PcneSection1VpcDesignGuide.tsx # 本文＋インタラクション (Client。全10セクション、31 Mermaid図等)
        NavBar.tsx                  # サイドバーナビ (IntersectionObserver)
        constants.ts                # Mermaid 図定義 (31図)
        page.css                    # ページ固有スタイル
      section2-vpc-implementation/
        page.tsx                    # Section 2: VPCネットワークの実装 完全ガイド (Server)
        PcneSection2VpcImplementationGuide.tsx # 本文＋インタラクション (Client。全9セクション、17 Mermaid図等)
        NavBar.tsx                  # サイドバーナビ (IntersectionObserver)
        constants.ts                # Mermaid 図定義 (17図)
        page.css                    # ページ固有スタイル
      section3-load-balancing/
        page.tsx                    # Section 3: ロードバランシングとトラフィック管理 完全ガイド (Server)
        PcneSection3LoadBalancingGuide.tsx # 本文＋インタラクション (Client。全7セクション、10 Mermaid図等)
        NavBar.tsx                  # サイドバーナビ (IntersectionObserver)
        constants.ts                # Mermaid 図定義 (10図)
        page.css                    # ページ固有スタイル
      section4-cdn-dns-ipam/
        page.tsx                    # Section 4: CDN・DNS・IPアドレス管理 完全ガイド (Server)
        PcneSection4CdnDnsIpamGuide.tsx # 本文＋インタラクション (Client。全6セクション、20 Mermaid図等)
        NavBar.tsx                  # サイドバーナビ (IntersectionObserver)
        constants.ts                # Mermaid 図定義 (20図)
        page.css                    # ページ固有スタイル
      section5-network-security/
        page.tsx                    # Section 5: ネットワークセキュリティの設計と実装 完全ガイド (Server)
        PcneSection5NetworkSecurityGuide.tsx # 本文＋インタラクション (Client。全7セクション、17 Mermaid図等)
        NavBar.tsx                  # サイドバーナビ (IntersectionObserver)
        constants.ts                # Mermaid 図定義 (17図)
        page.css                    # ページ固有スタイル
      section6-network-ops-monitoring/
        page.tsx                    # Section 6: ネットワーク操作と監視 完全ガイド (Server)
        PcneSection6NetworkOpsMonitoringGuide.tsx # 本文＋インタラクション (Client。全7セクション、20 Mermaid図等)
        NavBar.tsx                  # サイドバーナビ (IntersectionObserver)
        constants.ts                # Mermaid 図定義 (20図)
        page.css                    # ページ固有スタイル
    professional-cloud-network-engineer-step-by-step/
      page.tsx                      # PCNE ステップバイステップ実践ガイド
      components/                   # セクションコンポーネント（Section1-6）
    professional-cloud-architect/
      page.tsx                      # Professional Cloud Architect（PCA）認定試験 完全対策ガイド (Server)
      PcaGuide.tsx                  # 本文＋インタラクション (Client。全6セクション、17 Mermaid図、25テーブル等)
      NavBar.tsx                    # サイドバーナビ (IntersectionObserver)
      constants.ts                  # Mermaid 図定義 (17図)
      page.css                      # ページ固有スタイル
      section1-design-planning/
        page.tsx                    # PCA Section 1: 設計と計画 完全ガイド (Server)
        PcaSection1Guide.tsx        # 本文＋インタラクション (Client。全10セクション、17 Mermaid図、14テーブル等)
        NavBar.tsx                  # サイドバーナビ (IntersectionObserver)
        constants.ts                # Mermaid 図定義 (17図)
        page.css                    # ページ固有スタイル
      section2-managing-provisioning/
        page.tsx                    # PCA Section 2: 管理とプロビジョニング 完全ガイド (Server)
        PcaSection2Guide.tsx        # 本文＋インタラクション (Client。全6セクション、17 Mermaid図、25テーブル等)
        NavBar.tsx                  # サイドバーナビ (IntersectionObserver)
        constants.ts                # Mermaid 図定義 (17図)
        page.css                    # ページ固有スタイル
      section3-security-compliance/
        page.tsx                    # PCA Section 3: セキュリティとコンプライアンスの設計 完全ガイド (Server)
        PcaSection3Guide.tsx        # 本文＋インタラクション (Client。全6セクション、26 Mermaid図、40テーブル等)
        NavBar.tsx                  # サイドバーナビ (IntersectionObserver)
        constants.ts                # Mermaid 図定義 (26図)
        page.css                    # ページ固有スタイル
      section4-process-optimization/
        page.tsx                    # PCA Section 4: 技術的・ビジネスプロセスの分析と最適化 完全ガイド (Server)
        PcaSection4Guide.tsx        # 本文＋インタラクション (Client。全7セクション、15 Mermaid図、26テーブル等)
        NavBar.tsx                  # サイドバーナビ (IntersectionObserver)
        constants.ts                # Mermaid 図定義 (15図)
        page.css                    # ページ固有スタイル
      section5-managing-implementation/
        page.tsx                    # PCA Section 5: 実装の管理 完全ガイド (Server)
        PcaSection5Guide.tsx        # 本文＋インタラクション (Client。全5セクション、13 Mermaid図、15テーブル等)
        NavBar.tsx                  # サイドバーナビ (IntersectionObserver)
        constants.ts                # Mermaid 図定義 (13図)
        page.css                    # ページ固有スタイル
      section6-operational-excellence/
        page.tsx                    # PCA Section 6: ソリューションと運用の卓越性の確保 完全ガイド (Server)
        PcaSection6Guide.tsx        # 本文＋インタラクション (Client。全8セクション、14 Mermaid図、23テーブル等)
        NavBar.tsx                  # サイドバーナビ (IntersectionObserver)
        constants.ts                # Mermaid 図定義 (14図)
        page.css                    # ページ固有スタイル
    professional-cloud-developer/
      page.tsx                      # Professional Cloud Developer（PCD）認定試験 完全対策ガイド (Server)
      ProfessionalCloudDeveloperGuide.tsx # 本文＋インタラクション (Client。全4セクション、13 Mermaid図、19テーブル等)
      NavBar.tsx                    # サイドバーナビ (IntersectionObserver)
      constants.ts                  # Mermaid 図定義 (13図)
      page.css                      # ページ固有スタイル
      section1/
        page.tsx                    # PCD Section 1: 高可用性・セキュア・信頼性の高いクラウドネイティブアプリケーションの設計 (Server)
        Section1Guide.tsx           # 本文＋インタラクション (Client。全3サブセクション・28トピック、19 Mermaid図、10テーブル等)
        NavBar.tsx                  # サイドバーナビ (IntersectionObserver)
        constants.ts                # Mermaid 図定義 (19図)
        page.css                    # ページ固有スタイル
      section2/
        page.tsx                    # PCD Section 2: アプリケーションのビルドとテスト (Server)
        Section2Guide.tsx           # 本文＋インタラクション (Client。全3サブセクション・13トピック、8 Mermaid図、7テーブル等)
        NavBar.tsx                  # サイドバーナビ (IntersectionObserver)
        constants.ts                # Mermaid 図定義 (8図)
        page.css                    # ページ固有スタイル
      section3/
        page.tsx                    # PCD Section 3: デプロイのためのクラウドネイティブアプリケーション構成 (Server)
        Section3Guide.tsx           # 本文＋インタラクション (Client。全2サブセクション・7トピック、8 Mermaid図、5テーブル等)
        NavBar.tsx                  # サイドバーナビ (IntersectionObserver)
        constants.ts                # Mermaid 図定義 (8図)
        page.css                    # ページ固有スタイル
      section4/
        page.tsx                    # PCD Section 4: Google Cloudサービスとのアプリケーション統合 (Server)
        Section4Guide.tsx           # 本文＋インタラクション (Client。全3サブセクション・11トピック、15 Mermaid図、7テーブル等)
        NavBar.tsx                  # サイドバーナビ (IntersectionObserver)
        constants.ts                # Mermaid 図定義 (15図)
        page.css                    # ページ固有スタイル
    professional-agentic-architect/
      page.tsx                      # Professional Agentic Architect 認定試験 技術ガイド (Server)
      ProfessionalAgenticArchitectGuide.tsx # 本文＋インタラクション (Client。全10セクション、21 Mermaid図、8テーブル等)
      NavBar.tsx                    # サイドバーナビ (IntersectionObserver)
      constants.ts                  # Mermaid 図定義 (21図)
      page.css                      # ページ固有スタイル
      section1/
        page.tsx                    # Section 1: ローコードツールでのエージェント構築 (Server)
        Section1Guide.tsx           # 本文＋インタラクション (Client。全7 Mermaid図、11テーブル等)
        NavBar.tsx                  # サイドバーナビ (IntersectionObserver)
        constants.ts                # Mermaid 図定義 (7図)
        page.css                    # ページ固有スタイル
      section2/
        page.tsx                    # Section 2: コーディングエージェント開発 (Server)
        Section2Guide.tsx           # 本文＋インタラクション (Client。全7 Mermaid図、6テーブル等)
        NavBar.tsx                  # サイドバーナビ (IntersectionObserver)
        constants.ts                # Mermaid 図定義 (7図)
        page.css                    # ページ固有スタイル
      section3/
        page.tsx                    # Section 3: カスタムエージェントの開発 (Server)
        Section3Guide.tsx           # 本文＋インタラクション (Client。全15 Mermaid図、16テーブル等)
        NavBar.tsx                  # サイドバーナビ (IntersectionObserver)
        constants.ts                # Mermaid 図定義 (15図)
        page.css                    # ページ固有スタイル
      section4/
        page.tsx                    # Section 4: 評価とデプロイ (Server)
        Section4Guide.tsx           # 本文＋インタラクション (Client。全9 Mermaid図、12テーブル等)
        NavBar.tsx                  # サイドバーナビ (IntersectionObserver)
        constants.ts                # Mermaid 図定義 (9図)
        page.css                    # ページ固有スタイル
      section5/
        page.tsx                      # Section 5: セキュリティとガバナンス (Server)
        Section5Guide.tsx           # 本文＋インタラクション (Client。全9 Mermaid図、13テーブル等)
        NavBar.tsx                  # サイドバーナビ (IntersectionObserver)
        constants.ts                # Mermaid 図定義 (9図)
        page.css                    # ページ固有スタイル
  cisco/
    devnet-professional/
      page.tsx                      # Cisco Certified DevNet Professional 認定 徹底解説ガイド（Server）
      DevNetProfessionalGuide.tsx   # 本文＋インタラクション（client。全13セクション、Mermaid等）
      NavBar.tsx                    # サイドバーナビ（IntersectionObserver）
      constants.ts                  # Mermaid 図定義（6図）
      page.module.css               # ページ固有スタイル（CSS Modules）
    devnet-associate/
      page.tsx                      # Cisco Certified DevNet Associate (200-901 / CCNA Automation) 完全対策ガイド（Server）
      DevNetAssociateGuide.tsx      # 本文＋全体ラッパー（Client）
      NavBar.tsx                    # サイドバー目次ナビ（ScrollSpy、280px）
      constants.ts                  # 全34図 Mermaid 定義、NAV_ITEMS
      Diagram.tsx                   # MermaidDiagram メモ化コンポーネント
      page.css                      # ページ固有スタイル（グローバル3層トークン参照、280pxサイドバー契約）
      sections/                     # 9コンポーネント分割（HeroSection, SectionIntro, Section1〜7）
    ccde/
      complete-guide/
        page.tsx                    # Cisco CCDE試験 完全ガイド（Server。メタデータ定義）
        CcdeGuide.tsx               # 本文＋インタラクション（client。全12セクション、Mermaid等）
        NavBar.tsx                  # ヘッダー下部ナビ（IntersectionObserver）
        constants.ts                # Mermaid 図定義（5図）
        page.css                    # ページ固有スタイル
    ccna/
      beginner-guide/
        page.tsx                    # Cisco CCNA試験 完全ガイド（Server。メタデータ定義）
        CcnaBeginnerGuide.tsx       # 本文＋インタラクション（client。全12セクション、Mermaid等）
        NavBar.tsx                  # サイドバーナビ（IntersectionObserver）
        constants.ts                # Mermaid 図定義（5図）
        page.css                    # ページ固有スタイル
      automation-software-development-design/
        page.tsx                    # CCNA Automation ソフトウェア開発と設計 完全ガイド（Server。メタデータ定義）
        CcnaSoftwareDevDesignGuide.tsx # 本文＋インタラクション（client。全13セクション、Mermaid等）
        NavBar.tsx                  # サイドバーナビ（IntersectionObserver）
        constants.ts                # Mermaid 図定義（12図）
        page.css                    # ページ固有スタイル
      automation-api-guide/
        page.tsx                    # CCNA Automation API 完全ガイド（Server。メタデータ定義）
      automation-application-deployment-security/
        page.tsx                    # CCNA Automation Application Deployment and Security 完全ガイド
      automation-cisco-platforms-and-development/
        page.tsx                    # CCNA Automation Cisco Platforms and Development 徹底解説ガイド（Server。メタデータ定義）
        CcnaCiscoPlatformsDevelopmentGuide.tsx # 本文＋インタラクション（client。全13セクション、Mermaid等）
        NavBar.tsx                  # サイドバーナビ（IntersectionObserver）
        constants.ts                # Mermaid 図定義（10図）
        page.module.css             # ページ固有スタイル
      automation-infrastructure-and-automation/
        page.tsx                    # CCNA Automation 5.0 Infrastructure and Automation ステップバイステップ解説ガイド（Server。メタデータ定義）
        CcnaInfraAutomationGuide.tsx # 本文＋インタラクション（client。全17セクション、15個のMermaid図等）
        NavBar.tsx                  # サイドバーナビ（IntersectionObserver）
        constants.ts                # Mermaid 図定義（15図）
        page.css                    # ページ固有スタイル
      automation-network-fundamentals/
        page.tsx                    # CCNAAUTO 200-901 6.0 Network Fundamentals 完全ガイド
      security-fundamentals/
        page.tsx                    # CCNA 200-301 Security Fundamentals 完全ガイド（Server。メタデータ定義）
        CcnaSecurityFundamentalsGuide.tsx # 本文＋インタラクション（client。全12章、10個のMermaid図等）
        NavBar.tsx                  # サイドバーナビ（IntersectionObserver）
        constants.ts                # Mermaid 図定義（10図）
        page.css                    # ページ固有スタイル
      network-fundamentals-guide/
        page.tsx                    # CCNA 200-301 Network Fundamentals ネットワークの基礎 入門ガイド（Server。メタデータ定義）
        CcnaNetworkFundamentalsGuide.tsx # 本文＋インタラクション（client。全10章、10個のMermaid図等）
        NavBar.tsx                  # サイドバーナビ（IntersectionObserver）
        constants.ts                # Mermaid 図定義（10図）
        page.css                    # ページ固有スタイル
      network-access-guide/
        page.tsx                    # CCNA 200-301 Network Access 徹底解説ガイド（Server。メタデータ定義）
        CcnaNetworkAccessGuide.tsx  # 本文＋インタラクション（client。全15セクション、17個のMermaid図等）
        NavBar.tsx                  # サイドバーナビ（IntersectionObserver）
        constants.ts                # Mermaid 図定義（17図）
        page.css                    # ページ固有スタイル
      ip-connectivity-guide/
        page.tsx                    # CCNA 200-301 IP Connectivity 完全ガイド（Server。メタデータ定義）
        CcnaIpConnectivityGuide.tsx # 本文＋インタラクション（client。全6章＋まとめ、Mermaid等）
        NavBar.tsx                  # サイドバーナビ（IntersectionObserver）
        constants.ts                # Mermaid 図定義（7図）
        page.css                    # ページ固有スタイル
      ip-services-guide/
        page.tsx                    # CCNA 200-301 IP Services 完全ガイド（Server。メタデータ定義）
        CcnaIpServicesGuide.tsx     # 本文＋インタラクション（client。全12セクション、Mermaid等）
        NavBar.tsx                  # サイドバーナビ
        constants.ts                # Mermaid 図定義（18図）
        page.css                    # ページ固有スタイル
      automation-programmability/
        page.tsx                    # CCNA 200-301 6.0 自動化とプログラマビリティ 完全ガイド（Server。メタデータ定義）
        CcnaAutomationProgrammabilityGuide.tsx # 本文＋インタラクション（client。全10セクション、Mermaid等）
        NavBar.tsx                  # サイドバーナビ
        constants.ts                # Mermaid 図定義（7図）
        page.css                    # ページ固有スタイル
  aws/
    solutions-architect-associate/
      page.tsx                      # AWS Certified Solutions Architect – Associate (SAA-C03) 完全対策ガイド (Server)
      SaaGuide.tsx                  # 本文＋インタラクション (Client)
      NavBar.tsx                    # サイドバーナビ
      constants.ts                  # Mermaid 図定義（21図）
      page.css                      # ページ固有スタイル
      domain1/
        page.tsx                    # ドメイン1: セキュアなアーキテクチャの設計 (Server)
        Domain1Guide.tsx            # ドメイン1本文＋インタラクション (Client)
        NavBar.tsx                  # ドメイン1サイドバーナビ
        constants.ts                # Mermaid 図定義（14図）
        page.css                    # ドメイン1ページ固有スタイル
      domain2/
        page.tsx                    # ドメイン2: 回復力のあるアーキテクチャの設計 (Server)
        Domain2Guide.tsx            # ドメイン2本文＋インタラクション (Client)
        NavBar.tsx                  # ドメイン2サイドバーナビ
        constants.ts                # Mermaid 図定義（25図）
        page.css                    # ドメイン2ページ固有スタイル
      domain3/
        page.tsx                    # ドメイン3: 高性能なアーキテクチャの設計 (Server)
        Domain3Guide.tsx            # ドメイン3本文＋インタラクション (Client)
        NavBar.tsx                  # ドメイン3サイドバーナビ
        constants.ts                # Mermaid 図定義（27図）
        page.css                    # ドメイン3ページ固有スタイル
      domain4/
        page.tsx                    # ドメイン4: コスト最適化アーキテクチャの設計 (Server)
        Domain4Guide.tsx            # ドメイン4本文＋インタラクション (Client)
        NavBar.tsx                  # ドメイン4サイドバーナビ
        constants.ts                # Mermaid 図定義（29図）
        page.css                    # ドメイン4ページ固有スタイル
    solutions-architect-professional/
      page.tsx                      # SAP-C02総合ガイドのmetadata・CSS
      SolutionsArchitectProfessionalGuide.tsx # Server、6区画の全文
      NavBar.tsx                    # Client、167目次・開閉・scroll spy・hash/focus
      Quiz.tsx                      # Client、12問の採点・解説・集計・進捗・リセット
      constants.ts                  # 50図・目次・原本ライト描画設定・解答キー
      Diagram.tsx                   # memo化・自然倍率・原本配色・固有名
      page.css                      # 全CSS・標準280px・点/番号/階層
      sections/                     # Foundation, Domain1〜4, Revision
    solutions-architect-professional/domain1/
      page.tsx                      # SAP-C02 Domain 1 組織の複雑さに対応する設計 (Server)
      SapDomain1Guide.tsx           # 全文構成コンポーネント (Server)
      NavBar.tsx                    # 78目次・直下aタグ構造・scroll spy・モバイル開閉 (Client)
      Quiz.tsx                      # 確認シナリオ6問・即時採点・解説開閉・スコア集計 (Client)
      Diagram.tsx                   # Mermaid図レンダラー (preserveNaturalScale, lightテーマ)
      constants.ts                  # NAV_ITEMS(78件)・DIAGRAMS(19図)単一正本
      mermaid-theme.json            # 原本ライト配色テーマ定義
      page.css                      # 原本ライト配色・340pxサイドバー・table-scroll・クイズスタイル
      sections/                     # 9分割セクション (Foundation, Task11~15, Summary, QuizSection, References)
    cloudops-engineer-associate/
      page.tsx                      # AWS Certified CloudOps Engineer - Associate (SOA-C03) 完全ガイド (Server)
      CloudOpsGuide.tsx             # 本文＋インタラクション (Client)
      NavBar.tsx                    # サイドバーナビ (IntersectionObserver)
      Diagram.tsx                   # Mermaid 図レンダラー
      CodeBlock.tsx                 # シンタックスハイライトコードブロック
      constants.ts                  # ナビ項目・Mermaid 図・コードブロック定数
      page.css                      # ウォームペーパーライトテーマ・280pxサイドバー契約
      sections/                     # 分割セクション (HeroSection, SectionIntro, SectionDomain1~5, SectionAppendix)
    developer-associate/domain1/
      page.tsx                      # DVA-C02 AWSサービスを使用した開発 (Server、metadata、自己ホストフォント、CSS)
      DevelopmentGuide.tsx          # memo化した全本文 (Client)
      NavBar.tsx                    # 38目次・見出しscroll spy・drawer・hashとfocus
      constants.ts                  # 原本38目次と31図の単一正本
      Diagram.tsx                   # 原本ライト配色・14px採寸・自然倍率・memo化
      mermaid-theme.json            # 原本設定から独立解決したMermaid派生色
      CodeBlock.tsx                 # 言語見出し付き18コード例・空行・構文色
      page.css                      # 原本ライト配色・Source Serif 4・本文14px・288px幅・点と番号
      sections/                     # 導入・Task見出し・29スキル・総まとめ等の38コンポーネント
    developer-associate/domain2/
      page.tsx                      # DVA-C02 ドメイン2 セキュリティ (Server、metadata、CSS)
      SecurityGuide.tsx             # 全本文と20項目のチェック状態 (Client)
      NavBar.tsx                    # 26目次・scroll spy・モバイル開閉・hashとfocus
      constants.ts                  # 単一目次正本・原本35図・チェック件数
      Diagram.tsx                   # memo化・原本ライト配色・自然倍率のMermaid図
      mermaid-theme.json            # 原本から独立解決したMermaid設定（共通ダーク設定の混入を防ぐ）
      CodeBlock.tsx                 # 40コード例の空行・インデント・構文色
      ChecklistItem.tsx             # Context経由のチェック項目
      page.css                      # 原本ライト配色・Source Serif 4・本文と図14px・300px幅・点と番号の装飾
    developer-associate/domain3/
      page.tsx                      # DVA-C02 デプロイ (Server、metadata、自己ホストフォント、CSS)
      DeploymentGuide.tsx           # memo化した全33節の本文 (Client)
      NavBar.tsx                    # h1/h2の33目次・scroll spy・モバイル開閉・hashとfocus
      constants.ts                  # 単一目次正本・原本39図・チェック件数
      Diagram.tsx                   # config frontmatter・原本ライト配色・自然倍率・memo化
      mermaid-theme.json            # 固定Git原本を独立初期化した派生色（共通dark設定の混入を防止）
      CodeBlock.tsx                 # 32コード例の空行・インデント・近似色の構文ハイライト
      Checklist.tsx                 # 9チェックの件数・進捗・全完了表示（ローカル状態）
      page.css                      # 原本ライト配色・Source Serif 4・14px・290px幅・点と番号
      sections/                     # s1〜s33（導入・4 Task・26 Steps・演習・付録）
    advanced-networking-specialty/
      page.tsx                      # ANS-C01総合ガイドのmetadata・CSS
      AdvancedNetworkingGuide.tsx    # Server、6区画の本文を構成
      NavBar.tsx                    # Client、27目次・開閉・scroll spy・hash/focus
      constants.ts                  # 全39図・目次・原本のライト設定
      Diagram.tsx                   # memo化・自然倍率・原本配色・固有の読み上げ名
      page.css                      # 全CSS・標準280px目次・点と番号と階層
      sections/                     # Foundation, Domain1〜4, Revision
    advanced-networking-specialty/domain4/
      page.tsx                      # ANS-C01 Domain 4 (Server、metadata、CSS)
      AnsDomain4Guide.tsx            # 導入・Task41〜43・復習を原本の順序で構成
      NavBar.tsx                    # 99目次・開閉・scroll spy・hash/focus
      constants.ts                  # 31図・目次・原本のライト設定
      Diagram.tsx                   # 原本配色・自然倍率・固有の読み上げ名
      page.css                      # 300px目次・全CSS・リストの点/番号/入れ子
      sections/                     # Foundation, Task41〜43, Revision（33選択肢・8解答）
    advanced-networking-specialty/domain3/
      page.tsx                      # ANS-C01 Domain 3 (Server、metadata、CSS)
      AnsDomain3Guide.tsx            # 導入・3タスク・復習参考資料の5区分 (Server)
      NavBar.tsx                    # 52目次・モバイル開閉・scroll spy・hash/focus
      constants.ts                  # 26図・52目次・原本Mermaidライト設定
      Diagram.tsx                   # memo・自然倍率・固有読み上げ名・横スクロール
      page.css                      # 原本白背景・300px目次・リスト装飾・7コードの色と改行
      sections/                     # Foundation, Task31〜33, Revision（シナリオ8問）
    advanced-networking-specialty/domain2/
      page.tsx                      # ANS-C01 Domain 2 (Server、metadata、CSS)
      AnsDomain2Guide.tsx            # 導入・4タスク・復習の6区分 (Server)
      NavBar.tsx                    # 59目次・モバイル開閉・scroll spy・hash/focus
      constants.ts                  # 26図・59目次・原本Mermaidライト設定
      Diagram.tsx                   # memo・自然倍率・読み上げ名・横スクロール
      page.css                      # 原本ライト配色・300px目次・点/番号・11コード装飾
      sections/                     # Foundation, Task21〜24, Revision（確認問題8問）
    advanced-networking-specialty/domain1/
      page.tsx                      # ANS-C01 Domain 1 (Server、metadata、CSS)
      AnsDomain1Guide.tsx            # 導入・6タスク・復習の8区分 (Server)
      NavBar.tsx                    # 12目次・モバイル開閉・scroll spy・hash/focus
      Quiz.tsx                      # 全6問の即時採点・選択変更・解説・集計・リセット
      Checklist.tsx                 # 10チェック・完了数・進捗・全完了表示・クリア
      constants.ts                  # 原本15図・12目次・Mermaidライト設定
      Diagram.tsx                   # memo・自然倍率・読み上げ名・横スクロール
      page.css                      # 原本CSS・300px目次・点/番号/独自カウンター・コード装飾
      sections/                     # Foundation, Task11〜16, Revision
    generative-ai-developer-professional/
      page.tsx                      # AIP-C01 全5ドメイン・Step 1〜20 (Server、metadata、CSS)
      AipGuide.tsx                  # 導入・5ドメイン・直前対策・付録・参考資料の本文 (Server)
      NavBar.tsx                    # 48目次・scroll spy・モバイル開閉・hash/focus・Escape (Client)
      constants.ts                  # 単一目次正本と34図のMermaid DSL
      Diagram.tsx                   # memo化・説明・自然倍率・キーボードスクロール
      page.css                      # 原本ライトテーマ・300px幅・点と番号・全文装飾
      sections/                     # Foundation, Domain1〜3, Operations, Revision の6区間
      domain1/
        page.tsx                    # Domain 1詳細版 (Server、metadata、CSS)
        AipDomain1Guide.tsx          # 導入・6タスク・まとめ・参考資料 (Server)
        NavBar.tsx                  # 63目次・モバイル開閉・scroll spy・hash/focus (Client)
        Checklist.tsx               # 16チェックと完了数 (Client、永続化なし)
        constants.ts                # 原本21図・目次・Mermaidテーマと配置設定
        Diagram.tsx                 # memo・原本ライト設定・自然倍率・説明
        page.css                    # 原本ライト配色・300px幅・通常/チェックリスト装飾
        sections/                   # Foundation, Task11〜16, Revision の8区間
      domain2/
        page.tsx                    # Domain 2詳細版 (Server、metadata、CSS)
        AipDomain2Guide.tsx          # 導入・5タスク・復習の7区分 (Server)
        NavBar.tsx                  # 原本230目次・開閉・scroll spy・hash/focus (Client)
        PracticeQuestion.tsx        # 15問の単一/複数選択・解説開閉時の正誤判定 (Client)
        CodeBlock.tsx               # 原文保持のPython/JSON/Logs Insights構文ハイライト
        constants.ts                # 原本42図・単一目次・Mermaid配色と配置設定
        Diagram.tsx                 # memo・原本ライト設定・自然倍率・説明
        page.css                    # 原本ライト配色・300px幅・点と番号・コード行
        sections/                   # Foundation, Task21〜25, Revision
      domain3/
        page.tsx                    # Domain 3詳細版 (Server、metadata、CSS)
        AipDomain3Guide.tsx          # 導入・4タスク・復習の6区分 (Server)
        NavBar.tsx                  # 原本目次・開閉・scroll spy・hash/focus (Client)
        PracticeQuestion.tsx        # 全10問の回答・正誤・解答表示・集計・リセット (Client)
        constants.ts                # 原本19図・目次・Mermaidライト設定
        Diagram.tsx                 # memo・自然倍率・キーボード横スクロール
        page.css                    # 原本ライト配色・300px幅・点と番号・入れ子
        sections/                   # Foundation, Task31〜34, Revision
      domain4/
        page.tsx                    # Domain 4詳細版 (Server、metadata、CSS)
        AipDomain4Guide.tsx          # 導入・3タスク・復習の5区分 (Server)
        NavBar.tsx                  # 26目次・モバイル開閉・scroll spy・hash/focus
        Quiz.tsx                    # 全12問の単一/複数選択・採点・解説・集計・リセット
        constants.ts                # 原本22図・26目次・Mermaid明色設定
        Diagram.tsx                 # 自然倍率・キーボード横スクロール・固有名
        page.css                    # 原本明色・300px目次・点と番号・入れ子・色分け
        sections/                   # Foundation, Task41〜43, Revision
      domain5/
        page.tsx                    # Domain 5詳細版 (Server、metadata、CSS)
        AipDomain5Guide.tsx          # 導入・Task 5.1/5.2・復習の4区分 (Server)
        NavBar.tsx                  # 41目次・開閉・scroll spy・hash/focus・目次内追従
        Quiz.tsx                    # 全5問の選択・提出・採点・解説・集計・リセット
        Checklist.tsx               # タスク別23チェックと完了数 (Client)
        constants.ts                # 原本18図・41目次・Mermaidライト設定
        Diagram.tsx                 # memo・自然倍率・固有名・横スクロール
        page.css                    # 原本ライト配色・300px目次・点と番号・コード色分け
        sections/                   # Foundation, Task51, Task52, Revision
    ai-business-strategist/
      page.tsx                      # AWS Certified AI Business Strategist (AIB-C01) 初学者向け完全ガイド (Server)
      AiBusinessStrategistGuide.tsx # 本文・レイアウトコンポーネント (Client)
      NavBar.tsx                    # サイドバーナビ・scroll spy・モバイル対応 (280px契約)
      constants.ts                  # NAV_ITEMS (26目次)・DIAGRAMS (16図)
      Diagram.tsx                   # Mermaid 図レンダラー (16図、ライトテーマ、自然倍率)
      mermaid-theme.json            # ライトテーマ Mermaid 設定
      page.css                      # 原本ライトテーマ・280pxサイドバー契約
      sections/                     # Hero, Step0, Domain1~4, CrossDomain, Appendices の8分割コンポーネント
    ai-business-strategist/domain1/
      page.tsx                      # AWS Certified AI Business Strategist (AIB-C01) Domain 1 (Server)
      AiBusinessStrategistDomain1Guide.tsx # 本文コンポーネント (Client)
      NavBar.tsx                    # サイドバーナビ・scroll spy・モバイル対応
      constants.ts                  # NAV_ITEMS・DIAGRAMS (16図)
      Diagram.tsx                   # Mermaid 図レンダラー (16図)
      page.css                      # 原本ライトテーマ・300pxサイドバー
      sections/                     # Hero, Sec0, Step1~13, AppendixA~E の19分割コンポーネント
    ai-business-strategist/domain2/
      page.tsx                      # AWS Certified AI Business Strategist (AIB-C01) Domain 2 (Server)
      AiBusinessStrategistDomain2Guide.tsx # 本文コンポーネント (Client)
      NavBar.tsx                    # サイドバーナビ・scroll spy・モバイル対応
      constants.ts                  # NAV_ITEMS・DIAGRAMS (20図)
      Diagram.tsx                   # Mermaid 図レンダラー (20図、ライトテーマ、自然倍率)
      mermaid-theme.json            # ライトテーマ Mermaid 設定
      page.css                      # 原本ライトテーマ・302pxサイドバー
      sections/                     # Hero, Sec1, Sec2, Skill2_1_1~5, Skill2_2_1~5, Skill2_3_1~4, Sec6~11 の26分割コンポーネント
    ai-business-strategist/domain3/
      page.tsx                      # AWS Certified AI Business Strategist (AIB-C01) Domain 3 (Server)
      AiBusinessStrategistDomain3Guide.tsx # 本文コンポーネント (Client)
      NavBar.tsx                    # サイドバーナビ・scroll spy・モバイル対応
      constants.ts                  # NAV_ITEMS・DIAGRAMS (10図)
      Diagram.tsx                   # Mermaid 図レンダラー (10図、ライトテーマ、自然倍率)
      mermaid-theme.json            # ライトテーマ Mermaid 設定
      page.css                      # 原本ライトテーマ・302pxサイドバー
      sections/                     # Hero, Sec1~Sec5, Sec6~Sec10 の8分割コンポーネント
  recommended-books/
    accelerate/
      page.tsx                      # 『Accelerate』LeanとDevOpsの科学 完全ガイド (Server)
      AccelerateGuide.tsx           # 本文＋インタラクション (Client。DORA 5指標、24能力等)
      NavBar.tsx                    # サイドバーナビ (IntersectionObserver)
      constants.ts                  # Mermaid 図定義（6図）
      page.css                      # ページ固有スタイル
    site-reliability-engineering/
      page.tsx                      # 『Site Reliability Engineering』Googleのプロダクション運用 完全ガイド (Server)
      SreGuide.tsx                  # 本文＋インタラクション (Client。SLI/SLO/SLA、トイル撲滅、Mermaid 15図等)
      NavBar.tsx                    # サイドバーナビ (IntersectionObserver)
      constants.ts                  # Mermaid 図定義（15図）
      page.css                      # ページ固有スタイル
    the-devops-handbook/
      page.tsx                      # 『The DevOps Handbook』第2版 完全ガイド (Server)
      TheDevOpsHandbookGuide.tsx    # 本文＋インタラクション (Client。全23章・6パート、Mermaid 19図、チェックリスト等)
      NavBar.tsx                    # サイドバーナビ (IntersectionObserver)
      constants.ts                  # Mermaid 図定義（19図）
      page.css                      # ページ固有スタイル
    release-it/
      page.tsx                      # 『Release It!』本番対応ソフトウェア設計・デプロイ 完全ガイド (Server)
      ReleaseItGuide.tsx            # 本文＋インタラクション (Client。4部17章、Mermaid 14図、チェックリスト等)
      NavBar.tsx                    # サイドバーナビ (IntersectionObserver)
      constants.ts                  # Mermaid 図定義（14図）
      page.css                      # ページ固有スタイル
    infrastructure-as-code/
      page.tsx                      # 『Infrastructure as Code』実践ガイド (Server)
      InfrastructureAsCodeGuide.tsx # 本文＋インタラクション (Client。5部22章、Mermaid 26図、チェックリスト等)
      NavBar.tsx                    # サイドバーナビ (IntersectionObserver)
      constants.ts                  # Mermaid 図定義（26図）
      page.css                      # ページ固有スタイル
    understanding-the-linux-kernel/
      page.tsx                      # 『Understanding the Linux Kernel』完全解説ガイド (Server)
      UnderstandingTheLinuxKernelGuide.tsx # 本文＋インタラクション (Client。22部、Mermaid 45図、チェックリスト等)
      NavBar.tsx                    # サイドバーナビ (IntersectionObserver)
      constants.ts                  # Mermaid 図定義（45図）
      page.css                      # ページ固有スタイル
    unix-linux-sysadmin-handbook/
      page.tsx                      # 『UNIX and Linux System Administration Handbook』完全解説ガイド (Server)
      UnixLinuxSysadminHandbookGuide.tsx # 本文＋インタラクション (Client。原著4パート・31章、Mermaid 29図、チェックリスト等)
      NavBar.tsx                    # サイドバーナビ (IntersectionObserver)
      constants.ts                  # Mermaid 図定義（29図）
      page.css                      # ページ固有スタイル
    systems-performance/
      page.tsx                      # 『Systems Performance: Enterprise and the Cloud』実践ガイド (Server)
      SystemsPerformanceGuide.tsx   # 本文＋インタラクション (Client。16章+付録、Mermaid 18図、チェックリスト等)
      NavBar.tsx                    # サイドバーナビ (IntersectionObserver)
      constants.ts                  # Mermaid 図定義（18図）
      page.css                      # ページ固有スタイル
    operating-systems-three-easy-pieces/
      page.tsx                      # 『Operating Systems: Three Easy Pieces（OSTEP）』完全学習ガイド (Server)
      OperatingSystemsThreeEasyPiecesGuide.tsx # 本文＋インタラクション (Client。57章+付録、Mermaid 56図、チェックリスト等)
      NavBar.tsx                    # サイドバーナビ (IntersectionObserver)
      constants.ts                  # Mermaid 図定義（56図）
      page.css                      # ページ固有スタイル
    computer-networks-tanenbaum/
      page.tsx                      # Tanenbaum & Wetherall『Computer Networks』着想の入門ガイド (Server)
      ComputerNetworksTanenbaumGuide.tsx # 全10ステップ・21図・12表・10チェック項目の本文 (Client)
      NavBar.tsx                    # 47アンカー・scroll spy・モバイル開閉・フォーカス管理
      constants.ts                  # 原本の目次と21図のDSL
      page.css                      # ページ固有CSS。全宣言・リストマーカーを原本fixtureと照合
    computer-networking-topdown/
      page.tsx                      # 『Computer Networking: A Top-Down Approach』完全学習ガイド (Server)
      ComputerNetworkingTopdownGuide.tsx # 本文＋インタラクション (Client。全10部、Mermaid 41図、チェックリスト等)
      NavBar.tsx                    # サイドバーナビ (IntersectionObserver)
      constants.ts                  # Mermaid 図定義（41図）
      page.css                      # ページ固有スタイル
    high-performance-browser-networking/
      page.tsx                      # 『High Performance Browser Networking』完全解説ガイド (Server)
      HighPerformanceBrowserNetworkingGuide.tsx # 本文＋インタラクション (Client。全5部18章、Mermaid 33図、チェックリスト等)
      NavBar.tsx                    # サイドバーナビ (IntersectionObserver)
      constants.ts                  # Mermaid 図定義（33図）
      page.css                      # ページ固有スタイル
    kubernetes-in-action/
      page.tsx                      # 『Kubernetes in Action, 第2版』完全解説ガイド (Server)
      KubernetesInActionGuide.tsx   # 本文＋インタラクション (Client。全6部18章+2026年動向、Mermaid 41図、チェックリスト等)
      NavBar.tsx                    # サイドバーナビ (IntersectionObserver)
      constants.ts                  # ナビ・Mermaid・参考文献定義（41図）
      page.css                      # ページ固有スタイル
    terraform-up-and-running/
      page.tsx                      # 『Terraform: Up & Running』完全解説ガイド (Server)
      TerraformUpAndRunningGuide.tsx # 本文＋インタラクション (Client。全11部、Mermaid 19図、チェックリスト等)
      NavBar.tsx                    # サイドバーナビ (IntersectionObserver)
      constants.ts                  # ナビ・Mermaid・参考文献定義（19図）
      page.css                      # ページ固有スタイル
      sections/                     # セクション分割コンポーネント (SectionIntro, Section0-11, SectionRoadmap, SectionAppendix, SectionReferences)
    tcpip-illustrated-vol1/
      page.tsx                      # 『TCP/IP Illustrated, Volume 1: The Protocols』完全解説ガイド (Server)
      TcpipIllustratedVol1Guide.tsx # 本文＋インタラクション (Client。全20部+付録、Mermaid 35図、チェックリスト等)
      NavBar.tsx                    # サイドバーナビ (IntersectionObserver)
      constants.ts                  # ナビ・Mermaid・参考文献定義（35図）
      page.css                      # ページ固有スタイル
      sections/                     # セクション分割コンポーネント (SectionIntro, SectionParts1to4, SectionParts5to8, SectionParts9to11, SectionParts12to17, SectionParts18to19, SectionAppendix)
  cli/
    page.tsx                        # CLIコマンド実践ワンライナー集 (Server)
    CliGuide.tsx                    # 本文＋インタラクション (全15セクション、Mermaid 7図等)
    NavBar.tsx                      # サイドバーナビ (IntersectionObserver)
    constants.ts                    # ナビ・Mermaid・参考文献定義
    page.css                        # ページ固有スタイル


components/
  Header.tsx                        # ハンバーガー Drawer ナビ。toNavTree(EXAMS) の結果を描画するため直接編集不要。検索フィルタ・active リンク判定 (usePathname)・最近見たページ表示を内包
  Footer.tsx                        # ライト／ダーク配色に追従する共通フッター・免責事項
  DisclaimerBanner.tsx              # 免責事項バナー。Header 直下に sticky で貼り付き（top: var(--header-h)）、scroll 中も Header→Disclaimer→本文 の順序を保つ
  DiagramSVG.tsx                    # SVG ダイアグラム共通コンポーネント（ariaLabel または decorative 必須）
  RecentPageRecorder.tsx            # 'use client'、DOM レス。usePathname 監視で lib/recentPages.pushRecent を呼ぶ。layout.tsx に 1 度だけ配置
  sections/home/                    # ホームの Hero / ExamCard / ExamCatalog / Stats

lib/
  utils.ts                          # cn() (clsx + tailwind-merge)
  recentPages.ts                    # 最近見たページ履歴 (localStorage, MAX 5件, SSR safe, 型ガード)

__tests__/                          # Vitest（jsdom環境）
e2e/                                # Playwright（Chromiumのみ）
archive/                            # 移行済み資料の正規アーカイブ
  Cisco/
    html/                           # Cisco HTML資料
    md/                             # Cisco Markdown資料
  Gcl_Archive/                      # Cisco以外の旧GCP資料
  Aws/                              # AWS資料
```

## CSSデザイントークン（3層アーキテクチャ）

**Layer 1 – グローバルセマンティック** (`app/globals.css` の `@theme {}`):

- `--color-background`, `--color-foreground`, `--color-muted`, `--color-border` 等
- Tailwind v4 の `@theme` で定義するため `tailwind.config.js` は存在しない

**Layer 2 – 共有プリミティブ** (同 `@theme`):

- `--font-body`, `--font-mono`, `--radius-*`

**Layer 3 – ページ固有テーマ** (`app/globals.css` の `@theme`):

- Aurora（ACE）、Sapphire/Laboratory/Gold/Executive（Generative AI Leader 各セクション）
- テーマトークンと新しいテーマカラーはすべてグローバルな `@theme` に集約

ページ固有の `.css` / `.module.css` は `app/globals.css` に存在する `--color-*` トークンのみを参照する。コンポーネントレベルで新しい `--*` を定義したり、テーマごとにCSSファイルを追加・インポートしたりしない。新しいテーマカラーが必要な場合は、先に `app/globals.css` の `@theme` へ追加する。

## テスト構成

- **Vitest:** `__tests__/**/*.test.{ts,tsx}` と `.agents/skills/fix-mermaid/scripts/restore_diagrams.test.ts`、jsdom環境、`@` エイリアスが `./` に解決される
- **Playwright:** `e2e/` 配下、Chromiumのみ、`baseURL: http://localhost:3000`、CIでは`bun run dev`を自動起動
- **移行忠実性テストは移行元アーカイブを読まない**: `/archive/` は `.gitignore` 済みのローカル専用資産で CI には存在しない。移行元との照合が必要なテストは、コミット済み fixture（`docs/migration-inventory/<slug>.json` と `<slug>.fidelity.json`）を `import` する。fidelity fixture の対象・セレクタは `scripts/archive-fidelity-config.mjs` が正本で、`bun scripts/gen-fidelity-fixture.mjs <slug>|--all` で生成する（抽出ロジックは生成側・検証側が `scripts/archive-fidelity-extraction.mjs` を共有）。詳細は `.agents/rules/tdd-commit-workflow.md` §1-3。

**🚨 開発時の必須ルール（TDD & Step-by-step Commit） 🚨**
全てのコード実装において、正準の `.agents/rules/tdd-commit-workflow.md` に定義されたルールを厳守すること。`.claude/rules/tdd-commit-workflow.md` と `.gemini/rules/tdd-commit-workflow.md` は同期ミラーである。
1. **Step 0 — Inventory:** 移行タスクでは移行元からインベントリを機械抽出し、実装前にコミットする。
2. **Step 1 — Fail:** プロダクションコードを書く前に、必ずFailするテストを書いてコミットする。
3. **Step 2 — Pass:** テストをPassさせる実装を行いコミットする。
4. **Step 3 — Refactor:** リファクタリング/統合を行いコミットする。
※ LLMはタスク実行前に必ずこのルールをPlanに組み込み、まとめて実装・コミットすることを避けること。

**ガイド Markdown → 単一 HTML 変換タスク時**: `.agents/skills/md-to-html/SKILL.md` を読むこと。デザインの正は `Gcp-pca-section4-process-optimization.html`（暗色テーマ / `<section>` を使わないフラット構造 / `pre.mermaid` インライン / 脚注 `.footnote-ref` + `.ref-grid`）。転写漏れとデザイン漏れを検出する 2 本の監査（`bun run test:md-to-html` で自己テスト）が Green の前提条件であり、**両方 exit 0 になるまでコミットしない**。生成した HTML を `app/` 配下へ移す作業は別スキル（`html-to-nextjs-migration`）の責務で、本スキルからは `app/` を編集しない。

**HTML → Next.js 移行タスク時**: まず `.agents/skills/html-to-nextjs-migration/SKILL.md` の「正準リファレンス」を読むこと。GCPトークンマップ・サイドバー配置値・MermaidDiagram契約・ガイドページのファイル構成が前出しされており、参照 `page.tsx`/`NavBar.tsx`/`MermaidDiagram.tsx`/`page.css` や `globals.css` の再読込・再 grep が不要になる（ソースHTMLは100%読む — 要約・スキップ厳禁）。

## 制約事項

- **Netlify デプロイ**: `netlify.toml` + `@netlify/plugin-nextjs` で構成。`next.config.ts` の `output` は環境変数 `NEXT_OUTPUT_MODE` で切り替え（Docker: `standalone`、Netlify: 未設定）。
- **Docker dev コンテナの `.next` 権限**: `Dockerfile.dev` で `mkdir -p /app/.next` を `chown` より前に実行し、named volume (`dev_next_cache`) を `nextjs` ユーザー所有で初期化すること。ボリューム再作成が必要な場合は `docker volume rm infra_dev_next_cache`。
- **`DisclaimerBanner`**: `components/DisclaimerBanner.tsx` は `'use client'` の Client Component。**`position: sticky; top: var(--header-h)`** で Header 直下に貼り付き、flow 内に居続けるため `body { padding-top }` は不要（過去 fixed 配置で `padding-top: calc(--header-h + --disclaimer-height)` を盛っていた結果、sticky Header の natural position が下にずれて scroll 開始まで Disclaimer と縦並び順が入れ替わる不具合が発生していたため修正済）。ResizeObserver は `--disclaimer-height` の動的同期を継続（ページ内 SectionNav が `--fixed-offset = calc(--header-h + --disclaimer-height)` を `top` 値として参照しているため、合計実高さは引き続き必要）。免責事項テキストの変更はこのファイルのみ編集する。
- `litellm` / `dspy` の追加禁止（脆弱性懸念）
- **フォントは自己ホスト（`next/font/google` 禁止）**: `next/font/google` はビルド時に Google Fonts へ HTTP 取得を行い、CDN が旧リビジョンの CSS（実体削除済みの woff2 URL）を返すと `Failed to fetch <family> from Google Fonts.` で **ビルドが失敗**する（Netlify CI で実際に発生）。全 11 ファミリは `@fontsource-variable/*` / `@fontsource/*` へ移行済みで、`app/layout.tsx`（Noto Sans JP / JetBrains Mono / DM Sans）と `app/gcl/genai-leader/section1〜4/page.tsx` が該当 CSS を `import` する。**可変フォントのファミリ名は `'<Name> Variable'`**（例 `'Noto Sans JP Variable'`）であり、`app/globals.css` の `@theme` の `--font-*` トークンで `'<Name> Variable', '<Name>', <generic>` の順に指定する。新しいフォントを追加する場合も `bun add @fontsource-variable/<name>` → CSS import → `@theme` にトークン追加の手順を踏み、`next/font` を使わない。この制約は `__tests__/fonts/self-hosted-fonts.test.ts` が検証する。
- **Client/Server コンポーネント境界**: ページ固有のアンカーナビなど状態やブラウザAPIに依存するUIは `'use client'` ディレクティブを含む専用コンポーネントとして切り出し、メインの `page.tsx` を Server Component として維持すること。Client コンポーネント内でサーバー専用 API（`fs`, `cookies`, `headers` など）を呼び出すことは明示的に禁止し、渡す Props は JSON シリアライズ可能なものに限定すること。
- **コードブロック内の改行 (`.code-block`)**: JSX変換時、コード内の改行に `{"\n"}` を使用せず、各行を `<div className="code-line">...</div>` でラップすること。`.code-line` は `white-space: pre` を適用してインデントを保持し、`map` 展開時は安定した `key` を付与すること。
- **表形式データの構造化**: テキストのスペース揃えで列を表現したデータは、フォント変更による列ズレを防ぐため、必ず `<table>` 要素に変換すること。その際、必ず `<thead>` と `<th scope="col">` を用いたセマンティックな構造にすること。
- **CSS変数・テーマトークンの適用**: `globals.css` の3層アーキテクチャ CSS 変数（`--color-background`, `--color-foreground`, `--color-border` など）を厳格に使用すること。独自のローカル変数定義や `--color-bg-primary` のような実在しないトークンの使用は避ける。コンポーネントレベルの CSS 内で新たなカスタムプロパティ（`--*`）を定義することは禁止する。
- **サイドバーガイドのレイアウト契約**: サイドバーを持つガイド画面は、デスクトップでサイドバーを左端へ固定し幅を `280px` に統一する。メイン領域は `margin-left: 280px`、`width: calc(100% - 280px)`、`max-width: none` で残り幅をすべて使い、本文全体を再制限する `content-inner` 等の最大幅は設けない。レスポンシブ規則では `margin-left: 0`、`width: 100%` へ戻す。DVA-C02ドメイン1は288px、ドメイン2は300px、ドメイン3は290pxの原本幅をユーザー指定により優先し、専用の移行テストで検証する。AIP-C01（総合ガイドとDomain 1〜4）も原本の300pxを例外として優先し、サイドバー幅 `300px`・メイン `margin-left: 300px`・`width: calc(100% - 300px)` を揃え、各ドメインの専用デザインテストとE2Eで検証する。ANS-C01 Domain 1〜4も原本の300pxを承認済み例外として同じ3値で揃え、各ドメインの `design.test.ts` で検証する。SAP-C02 Domain 1は原本の340pxを承認済み例外とし、サイドバー幅 `340px`・メイン `margin-left: 340px`・`width: calc(100% - 340px)` を `__tests__/guide-content-widths.test.ts` の専用ブロックで検証する。この共通契約は `__tests__/guide-content-widths.test.ts` の130ケースで登録済み43スタイルシートを検証する。
- **グローバルメニューの運用（データ駆動）**: ナビゲーションは `app/constants.ts` の `ALL_EXAMS` を正本としている（`EXAMS` はそこから派生する公開値）。新ページ追加時は `ALL_EXAMS` に `Exam` エントリを追加し（`status: 'coming-soon'` → ページ完成後 `'available'` または省略）、`app/navigation.ts` の `toNavTree` が自動でグルーピングするため **`components/Header.tsx` は直接編集しない**。
- **PCNE セクションページの `metadata.title` 規約**: `PCNE S<n>: <セクション名> | Google Cloud 認定試験対策` に統一する。Next.js の `title.template` は **それを定義したセグメント自身には適用されず、子孫ルートに継承される**。`app/gcl/professional-cloud-network-engineer/layout.tsx` は `title` をプレーン文字列で置いているだけで新しい `template` を定義していないため、ルート `app/layout.tsx` の `template: '%s | Cloud Infrastructure Studies'` は **PCNE サブツリーにもそのまま継承される**（実際の `<title>` は `PCNE S<n>: … | Google Cloud 認定試験対策 | Cloud Infrastructure Studies`）。`| Google Cloud 認定試験対策` はその上に乗せる PCNE 固有の命名規約であり、`__tests__/gcl/professional-cloud-network-engineer/section-title-convention.test.ts` はこの規約への準拠のみを検証する。
- **移行元ファイルのアーカイブ**: 移行元は削除せず `archive/` 配下へ移動する。Cisco資料の正規保存先は `archive/Cisco/html/` と `archive/Cisco/md/` とし、`Gcl_Archive/Cisco` は作成・使用しない。
- 新試験を追加する場合: ① `app/constants.ts` の `ALL_EXAMS` にエントリ追加 ② `app/globals.css` に `icon-theme-<id>` ユーティリティ追加 ③ 試験ページ作成 — この 3 ファイルのみ変更すれば Header に自動反映される。
- ページ固有の共通定数は `constants.ts` に集約する（`app/gcl/genai-leader/constants.ts` 参照）
- **z-index レイヤリング**: グローバル UI のスタッキング順は `Header (sticky z-50)` → `DisclaimerBanner (sticky z-40, top: var(--header-h))` → ページ内 sticky/fixed (`z-index: 100` を使うページが多い、`top: var(--fixed-offset)`) → `Header ドロワー (z-[200])`。Header と Disclaimer は両方 sticky で flow 内、ドロワーは fixed inset-0 で全画面オーバーレイ。ページ側で 100 を超える z-index を新規に導入する場合は、ドロワーを覆い隠さないか必ず確認すること。
- **Tailwind v4 動的クラス**: テンプレートリテラルで組み立てた class 名（例: `` `before:bg-[var(--color-theme-${id}-fg)]` ``）は JIT が拾えないため意図したスタイルが当たらない。バリエーション分の class 文字列をソース内に **静的に列挙** すること（`components/Header.tsx` の `ACCENT_CLASS` Record 参照）。

## セキュアCI/CDガイドの移行検証（2026-10-02）

`/gcl/hands-on/secure-cicd-pipeline-guide` をHands-onへ登録済み。40見出し・106表セル・41リスト項目・59外部リンク・9コード・4図を固定インベントリで照合し、原本のCSS宣言、リストマーカー、参考文献01〜23、コード枠の余白・角丸も検証する。共有モック・抽出ヘルパーは `__tests__/helpers/migration-test-utils.tsx`。原本は `archive/Gcl/Hands-on/html/Secure-cicd-pipeline-guide.html` と `archive/Gcl/Hands-on/md/Secure-cicd-pipeline-guide.md` に保持する。ユーザー指示によりnpm・ビルド・Playwright・目視確認は実施しない。全体Vitestには移行前からPAA Section 5の既知の失敗2件がある。

### 2026-10-02: CI/CD図3・図4の左端切れ修正

ページCSSの `.mermaid-target { justify-content: center; }` が、共通Mermaidコンポーネントの `safe center` を詳細度で上書きし、横長SVGの左側が負のスクロール領域へはみ出していた。ページの指定を `safe center` に変更し、収まる図は中央寄せ、収まらない図は左寄せへ退避させる。図のDSL・自然倍率・文字サイズは保持。

Red: `39af7f41`、Green: `1b2c58d0`。図3・図4の内外ラッパーのCSSカスケードを再現する回帰テストを追加。`bun run test -- secure-cicd-pipeline-guide MermaidDiagram guide-content-widths` は156件成功（ガイドは19件）。ブラウザの描画・スクロール位置の実測は未実施、npm・ビルド・Playwrightは実行しない。

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## 共通フッター（2026-10-20）

`Footer.tsx` は `Footer.module.css` で暗色ページと明色ガイドの配色を切り替える。ページルートとフッターは `<body>` 直下の兄弟なので、兄弟結合子 `:is(<ページルート>) ~ .footer` で判定し、クライアント遷移にも追従する。`body:has()` は使わない（Mermaidの採寸のたびに文書全体の再計算が起き、描画とスクロールが停止するため）。新規ライトページではセレクター一覧への追加とブラウザ検証が必要。免責文言は `components/disclaimer.ts` を上部バナーと共有する。640px以下では1列表示。共通フッターの `z-index` は `auto` を維持し、固定サイドバーより手前へ配置しない。
