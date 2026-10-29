# Cloud Infrastructure Studies

最終更新日: 2026-10-29

## 2026-10-29: 移行済み原本の一括アーカイブ

直下に残っていた移行済み4教材（DDIA、SAP-C02 Domain 2、DVA-C02 Domain 4、SCS-C03総合ガイド）のHTMLと対応Markdown、計8ファイルを `archive/Books/html|md/` と `archive/Aws/html|md/<試験・ドメイン>/` へ移動した。内容は変更せず、全ファイルのバイト一致・SHA-256一致を確認。Git管理外の保存先・サイズ・ハッシュ・復元元コミット `8e888247` は `docs/migration-inventory/completed-guides-2026-10-29.archive.json` に記録している。移動コミットは `bb338096`。

原本不在下で4教材の関連49ファイル・409テストすべて成功。アプリ実装への変更はなし。直下のHTMLは未移行8件のみ。静的集計1285ソース・412対応・491テストファイルは不変。npm・ビルドは未実行。過去の「原本を直下に保持」という記述は移動前の履歴として扱う。

## 2026-10-29: SAP-C02 Domain 2 移行

`/aws/solutions-architect-professional/domain2` へ全6タスクを移行。66表（th173・td1153）・23図・5コード例・51リスト項目・81外部リンク出現・73目次・23チェック項目を保持した。原本の明色配色、Hero・表・コールアウト・点と番号・入れ子と字下げ・コードの空行と構文色を復元。目次の開閉・hash/focus・現在位置、タスクごとのチェック進捗、ホーム・Headerの29%導線と明色フッターに対応する。原本HTML/Markdownは保持。

インベントリ `09d07298`、全量Red `51772c2e`、基盤 `45e2ea68`、Task 2.1 `33c49274`、2.2 `2b9f4717`、2.3 `4ccebd90`、2.4 `30712e32`、2.5 `fa46bdff`、2.6 `3288aee2`、付録 `de24ef17`、統合Red `b44909a5`、導線統合 `5ef9760d`、表hydration Red `51e06a74` → Green `26047545` の段階別コミット。固定Git fixtureの全文・表結合・リスト階層・配置順・コード行・CSS宣言値・図DSLと、原本単体のMermaid全派生色を検証した。全体Vitestは470ファイル・4346件すべて成功（`bun run test -- --maxWorkers=4`）。その後の表の読み上げ名補正（Red `6f94a51d` → Green `74647040`）では、最終関連6ファイル・183件、型検査・対象ESLintが成功。全体ESLintも成功済み。SAPの旧ナビ期待値は `16cb2eb4` で3項目の完全一致へ更新し、HeaderのDomain 2リンクも検証した。fixture・インベントリの再生成一致も確認。静的集計1285ソース・412対応（32%）・491テストファイル・138ルートは実行成功数とは区別する。npm・ビルド・開発サーバー・ブラウザーE2Eは未実行、目視確認はユーザー担当。作業開始時のDDIA 2ファイルの差分は保持し、今回のコミットから除外。

## 2026-10-29: DDIA 学習ガイド移行

`/recommended-books/designing-data-intensive-applications` に原本の本文・17表（53見出しセル・221データセル）・14図・61リスト項目・8外部リンクを移行。12項目の目次、13項目のチェック進捗、点・番号・入れ子のリスト装飾、Hero・表・コールアウト・脚注・参考文献を保持。Booksのホーム・Header共通導線へ統合した。原本HTML/Markdownは保持する。

原本インベントリ `8b1a92b6`、全量Red `ea329623`、抽出・モック補正 `54ad2bd4`、本文Green `3d589e5d`、導線Red `067b7b34`、統合Green `a2d9e7cd`、整形 `80afd377`。固定Git由来fixtureで全要素・属性・階層・順序・本文・CSS宣言値・図DSLを照合。14図すべての構文解析、目次開閉・hash/focus・チェック進捗、欠落検出を検証した。全体Vitestは468ファイル・4316件すべて成功（`bun run test -- --maxWorkers=4`）。DDIA単独15件、共通幅契約を含む148件成功。型検査・全体ESLint・対象Markdown lint成功。固定Git fixtureと原本インベントリの再生成一致も確認。静的集計は1270ソース・408対応（32%）・489テストファイルで、実行成功数とは区別する。npm・ビルド・開発サーバー・ブラウザーE2Eは未実行、目視確認はユーザー担当。

2026-10-29 DVA-C02 Domain 4付録A: 原文を保持した13問のカード表示と、各設問で回答を選ぶ即時採点を実装。12問はラジオボタン、問11はチェックボックスで2つ以上の選択時に集合の完全一致を判定する。選択変更・解除と設問ごとの独立状態に対応。正誤は色と記号で示し、各問の直下へ既存の正解・解説を同じ文言で表示する。元の解答一覧も保持。選択前の全文は空白・句読点・コード・リンクまで固定fixtureと完全一致する。`PracticeQuestion.tsx` と付録専用 `practice.css` を追加し、再生成処理にも反映した。

検証: 関連17ファイル・225件、型検査・対象ESLint成功。Chromeで1440/768/390pxの実コンポーネント静的描画に対し、全文不変・13カード・全選択肢・解答表の収まりを検証する3件が成功。採点操作はVitestで全13問・誤答・回答変更・複数選択の過不足と解除を検証した。ページ全体のブラウザー操作検証とは区別する。npm・ビルド・開発サーバーは未実行。Red `a2411128`、カード装飾 `a14ff9a5`、採点Red `67a4776a`、採点Green `a1b51073`。

2026-10-29 DVA-C02 Domain 4 Mermaid黒塗り修正: ページの部分的なthemeVariablesが共通dark初期化とマージされ、未指定のmainBkg（#0f2040）・clusterBkg（#0d1a2e）等が残っていた。原本単体の全派生色を `render-theme.json` へ固定し、`Diagram.tsx` から使用する。`bun scripts/gen-dva-troubleshooting-theme.mjs` とscaffold再生成にも反映。Red `e0eb617d`、修正 `b2cc12f2`。関連15ファイル・219テスト、型検査・対象ESLint成功。Chromeで全34図の修正前の配色不一致を再現し、修正後のSVGノード・グループ・ラベル色が原本単体と完全一致する1件が成功。npm・ビルド・開発サーバーは未実行。

SVG検証は `PLAYWRIGHT_BROWSER_CHANNEL=chrome bunx --no-install playwright test --config=playwright.mermaid.config.ts` で実行する。ページ全体のレイアウト検証とは区別する。

2026-10-29 DVA-C02 Domain 4移行: `/aws/developer-associate/domain4` に全3タスク・24スキル（Step 0〜24）・33セクション、159表・34図・25コード例・181リスト項目・練習問題13問を全文移行。原本のライト配色、288px目次、Hero、表、点・番号・入れ子・字下げを保持。コードは空行・字下げ・等幅フォントとJSON/Pythonの構文色を保持する。目次の現在位置・モバイル開閉・hash/focus、図の原本DSL・テーマ・自然倍率、ホームとHeaderのDomain 4（18%）、共有フッターの明色切替を実装した。

検証: 2026-10-29 全体Vitestは462ファイル・4252件すべて成功（`bun run test -- --maxWorkers=4`）。DVA関連13ファイル・182件成功。最終整形後のDomain 4＋原本抽出は6ファイル・27件成功、共有フッター3件も成功。34図すべてのMermaid構文解析、全本文・表結合・リスト階層・コード行・CSS宣言の全量比較と欠落検出を含む。型検査・全体ESLint成功。原本HTMLは保持し、テストは固定Git由来fixtureのみを参照する。npm・本番ビルドは依頼に従い未実行。ブラウザーE2Eは今回未実行、目視確認はユーザー担当。

2026-10-28 SAP/SCS Domain 1のテスト期待値を本文訂正・フォーカス枠改善へ追従。原本fixtureは保持し、全量比較と欠落検出を維持。対象28ファイル・222件成功。全体の最終結果は `MIGRATION_PROGRESS.md` の現在地を参照。

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

開発環境の注意（2026-10-24対処済み）: 通常のTurbopackでSVGが40図中1図で止まり、スクロールもできなかった。共通フッターの `body:has(...)` が関与しているという観測に基づく仮説で、プロファイラ等による因果の確認はしていない。Mermaidは採寸用の一時要素を `<body>` 直下へ挿入するため、挿入のたびに文書全体のスタイル再計算が起きると推定している（`body:has(> ...)` でも停止を観測）。フッターの明色ルールを兄弟結合子 `:is(<ページルート>) ~ .footer` に変更した後、Turbopackで40図が約5秒で描画されることと、SCSのChrome5件の成功を確認した（`--webpack` の指定は不要）。webpackでだけ停止しなかった理由は未解明。`__tests__/components/Footer.palette.test.ts` はフッターのセレクターに `:has()` を使わないことだけを検証し、描画停止そのものは再現しない。経緯はMIGRATION_PROGRESS.mdの最新記録を参照。ビルドは未実行。

原本HTML・Markdownは内容を変更せず直下に保持し、`archive/Aws/html/security-specialty/` と `archive/Aws/md/security-specialty/` にバイト一致・SHA-256一致でコピー済み。保存先と完全なハッシュは `docs/migration-inventory/aws-scs-c03-guide.archive.json` に記録。archiveはローカル専用・Git管理外で、CIは固定Git `71ff4c1a4e31847687477659cf16076fb4264a63` 由来のコミット済みfixtureを使用する。原本・archiveがない一時作業ディレクトリでもfixture再生成のバイト一致を検証済み。

2026-10-21 ANS-C01 Domain 4移行: `/aws/advanced-networking-specialty/domain4` に全3タスク・58表（th148・td999）・31図・14コード・181リスト項目・176外部リンク出現・99目次・確認問題8問を全文移行。原本ライト配色・300px目次・点/番号/階層/余白・コード全行と構文色を保持。単一選択7問・複数選択1問の33選択肢と8解答開閉を保持し、採点や永続化は追加していない。ホームとHeaderへDomain 4（24%）を追加。原本HTML・Markdownはそれぞれ `archive/Aws/html/advanced-networking-specialty/domain4/` と `archive/Aws/md/advanced-networking-specialty/domain4/` にアーカイブ済みで、リポジトリ直下には残っていない。内容はレビュー指摘に基づき訂正済み。固定Git `c2b4535c7fdf4ec40872a9e093c184b22c0ac954` 由来fixture（`15e57d87`・`af45f5d8`・`717ff01e`・`24fd796e`・`bc3999a1`・`3782b32c`・`dace8727`・`836d4531` は旧版の固定値）で原本・archiveに依存せず検証する。npm・ビルド未実行。手動の目視確認は未実施で、表示は自動検証の結果で判定し、ユーザーへ目視確認を求めない。検証結果・段階別コミットはMIGRATION_PROGRESS.mdの最新記録を参照。

最終検証: 全体Vitest373ファイル・3579件すべて成功（`bun run test -- --maxWorkers=4 --testTimeout=30000`、再試行なし）。Domain 4は15ファイル・97件。Chromeは1440/768/390px・装飾破壊検出・ホーム/Header導線の5件成功。全31SVGの自然倍率・viewBox内包、全リストの原本計算済みCSSとの一致、99目次・モバイル開閉・hash/focus、33選択肢・8解答開閉、横はみ出しなし、axe違反0・コンソールエラー0を確認。型検査・全体ESLint・対象Markdown lint成功。

2026-10-20 ANS-C01 Domain 2移行: `/aws/advanced-networking-specialty/domain2` に全4タスク・57表（th150・td803）・26図・11コード・86リスト項目・43外部リンク出現・59目次・確認問題8問を全文移行。原本のライト配色・300px目次・点と番号・インデント・構文ハイライト・解答解説の折りたたみを保持。操作状態はClientのNavBarに限定し、本文はServer Component。ホームとHeaderのDomain 1導線を保持したままDomain 2を追加。原本HTML・Markdownは `archive/Aws/html|md/advanced-networking-specialty/domain2/` へ保存し、固定Git由来fixtureで全量照合する。コミット・npm・ビルド未実行、目視確認は未実施（自動検証で代替）。検証結果はMIGRATION_PROGRESS.mdの最新記録を参照。

2026-10-20 ANS-C01 Domain 1移行: `/aws/advanced-networking-specialty/domain1` に全6タスク、75表（th189・td1016）、15図、7コード、301リスト項目、94外部リンク出現、12目次、練習問題6問、チェック10項目を全文移行。原本のライト配色・300px目次・点と番号・独自カウンター・インデント・コードの色/太字/斜体を保持。単一選択4問・複数選択2問の即時採点、選択変更、解説開閉、集計・リセットとチェック完了数・進捗・クリアに対応。ANSをホームとHeaderへ登録し、Domain 1へ直接接続。対象16ファイル・140件、Chromeの1440/768/390pxを含む5件が成功。全リストの計算済みCSSを原本CSSの隔離iframeと全量照合し、全15SVGの自然倍率・viewBox内包、独自番号、キーボード操作、axe違反0・コンソールエラー0を確認。全体Vitestは329ファイル・3269件すべて成功。型検査・全体ESLint・最終変更箇所のESLint・対象Markdown lint成功。原本HTML・Markdownは保持し、テストは固定Git由来fixtureを使用。npm・ビルドは依頼に従い未実行、目視確認はユーザー担当。最新実装HEAD `d9195d44`。

2026-10-20 AIP-C01 Domain 5移行: `/aws/generative-ai-developer-professional/domain5` に全2タスク・14スキル、47表（th119・td713）、18図、206リスト項目、92外部リンク出現、2コード、41目次、練習問題5問、チェック23項目を全文移行。原本のライト配色・300px目次・点と番号・入れ子・インデント・Python/Logs Insightsの色分けを保持。全問の提出・採点・正誤・解説・進捗・リセットとタスク別チェック数を検証。原本Git由来fixtureで全文・順序・構造・全CSSを照合し、本文等7種の欠落とCSS破壊5種を検出。対象12ファイル・88件とChromeの1440/768/390pxを含む4件が成功し、全18SVGの自然倍率・viewBox内包・axe違反0・コンソールエラー0を確認。原本由来の問題補助文のコントラスト不足だけを既存の濃い補助文字色へ補正。HTML・Markdown原本は保持し、テストはarchiveに依存しない。npm・ビルドは依頼に従い未実行。目視確認はユーザー担当。全体Vitestは313ファイル・3128件すべて成功。型検査・全体ESLint・最終変更箇所のESLint・対象Markdown lint成功。最新実装HEAD `efa67cc5`（最終表示修正 `ce42e381`）。

2026-10-17 AIP-C01 Domain 4移行: `/aws/generative-ai-developer-professional/domain4` に全3タスク・16スキル、84表（th234・td1388）、22図、140リスト項目、36外部リンク出現、2コード、26目次、練習問題12問を全文移行。原本の明色テーマ、点・番号・入れ子・インデント、シンタックスハイライト、単一/複数選択の採点・正誤・解説・得点・回答進捗・リセットを保持。全108横スクロール領域に固有の読み上げ名を付与。Domain 4は原本削除後103件、Chromeは1440/768/390px・全22SVGの自然倍率とviewBox内包・全問・導線・CSS破壊検出を含む6件成功。axe違反0・コンソールエラー0。原本400008バイトをバイト一致・SHA-256付きでローカルarchiveへ保存し、テストは固定Git由来fixtureのみを使用。全体Vitestは301ファイル・3021件中3020成功、失敗1件は作業前からのAIBナビ期待値。型検査・全体ESLint・対象Markdown lint成功。`bun run build`・`bun run lint` は2026-10-17の進捗同期で成功。npm・目視確認は未実施（Playwrightによる3画面幅の自動レイアウト検証は上記のとおり成功）。

2026-10-17 Domain 3の横線整理: 各Step・Task見出しの上罫線をなくし、原本の区切り線27本だけを保持。本文・表・図・リスト装飾は維持。Red `6b2bb8cf`、Green `74d8461a`。関連106件、1440/768/390pxの追加ブラウザ1件、対象ESLint成功。npm・ビルド未実行。

2026-10-17 AIP-C01 Domain 3移行: `/aws/generative-ai-developer-professional/domain3` に全4タスク・15スキル、44表・19図・189リスト項目・125外部リンク出現・練習問題10問を全文移行。ライト配色、点・番号・入れ子、300px目次、クイズの回答・正誤・解答表示・集計・リセットを保持。ホーム・Headerから詳細版へ移動可能。原本削除後のDomain 3検証105件、AIP関連回帰450件、1440/768/390pxを含むChrome 6件が成功。全図の自然倍率とviewBox内包、CSS破壊5種、DOM欠落5種、axe違反0を検証。図・表のキーボード横スクロールと閉じたモバイル目次の非表示を補完。原本306478バイトをバイト一致・SHA-256付きでローカルarchiveへ保存し、テストは固定Git由来fixtureのみを使用。実装 `75a38b02`、原本保存 `e9cbf3f3`。npm・ビルド未実行、目視確認はユーザー担当。最終全体テスト・型検査・lintの結果は移行進捗の現在地を参照。

2026-10-16 Domain 2練習問題の選択・採点: 全15問の選択肢の点を除き、11問をラジオボタン、4問をチェックボックスにした。選択後に「答えと解説」を開くと正誤を表示し、開いた後の選択変更にも追従。複数選択は正解集合の完全一致、未回答は案内表示。選択・開閉状態は問題ごとに独立し、原本の問題文・選択肢・解説は保持。採点22件と目次通知順の回帰を含む関連141件が成功。全体2808件中2807成功、既存AIBナビ期待値1件のみ失敗。ブラウザ9シナリオを検証し、1440pxで見つけた目次上書きは通知順に依存しない選択へ修正して3画面幅を再確認。最新実装HEAD `fa93bb13`（採点 `d11350ad`）。型検査・ESLint・Markdown lint成功。npm・ビルド未実行。

2026-10-16 Domain 2末尾案内文の削除: ユーザー指定により末尾の完了案内文を表示とテスト期待値から除外。原本監査fixtureは固定Gitの証跡として保持し、表示の期待値から対象段落と強調要素だけを除く。関連16ファイル・118件、1440pxブラウザ1件、対象ESLint成功。末尾文削除実装 `4d52589e`（Red `b0e57c77`）。npm・ビルド未実行。

2026-10-16 AIP-C01 Domain 2表示の再精査: 共通Mermaidのdark初期化から継承されていたmainBkg等をページ内のライト描画設定で明示的に置換し、非推奨initからconfig frontmatterへ移行。全42図のノード・状態図・シーケンス図の背景と実際の文字の色、およびコントラスト比を検証。Python・JSON・CloudWatch Logs Insightsの全9コードを原文・空行・インデントを保持してハイライトし、セクション境界と5つのTask見出しの横線を最大1本へ整理。15問は選択肢と解説を保持したカード形式へ改善。全文fixtureは改変せず、関連251件・ブラウザ8件と追加コントラスト検証が成功。表示改善実装 `aefa7b6e`。型検査・全体ESLint・対象Markdown lint成功。全体Vitestの最終結果はMIGRATION_PROGRESS.md参照。npm・ビルド未実行、目視確認はユーザー担当。

Google Cloud (GCP)、AWS、Cisco、CompTIA の資格試験対策およびエンジニアリング・DevOps名著（『Accelerate』、『Site Reliability Engineering』、『The DevOps Handbook』、『Release It!』、『Infrastructure as Code』など）の学習を目的とした、インタラクティブな学習用 Next.js アプリケーションです。

## 🚀 特徴

- **AWS ANS-C01 ネットワーク管理・運用:** `/aws/advanced-networking-specialty/domain3` に全3タスク・91表・26図・7コード・シナリオ8問を収録。原本の白背景・リスト装飾・解答解説の開閉を保持し、ホームとHeaderから移動できます。
- **AWS ANS-C01 ネットワーク実装:** `/aws/advanced-networking-specialty/domain2` に全4タスク・57表・26図・11コード・確認問題8問を収録。ライト配色、リストの点・番号と解答解説の折りたたみを保持。ホームとHeaderから移動できます。
- **AWS ANS-C01 ネットワーク設計:** `/aws/advanced-networking-specialty/domain1` に全6タスク、75表・15図・7コード・練習問題6問・チェック10項目を収録。原本の点・番号・参考資料カードの独自番号を保持し、選択式問題の採点・解説・リセットと学習進捗に対応。ホームとHeaderから移動できます。

- **AIP-C01 ドメイン5詳細:** `/aws/generative-ai-developer-professional/domain5` に評価・検証・トラブルシュートの全14スキル、47表・18図・練習問題5問・チェック23項目を収録。原本の点・番号・コード色分けと、提出後の採点・解説・リセットを保持。

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

### 共通フッター

各学習ページのライト／ダーク配色に合わせたフッターに、免責事項を掲載しています。スマートフォンではサイト名と免責事項を縦に並べます。
