import { Diagram } from '../Diagram';
/** 原本のdomain1本文を全量移行。 */
export default function Domain1() {
    return <div className="guide-part" data-part="domain1">
    <h2 id="2-ドメイン1-fm統合データ管理コンプライアンス31" tabIndex={-1}>{"\n                    2. ドメイン1: FM統合・データ管理・コンプライアンス(31%)\n                "}</h2>

    <p>{"\n                    最大配点のドメインです。"}<strong>{"「FMを選ぶ → データを整える → 検索で補強する →\n                        プロンプトを管理する」"}</strong>{"までを扱います。\n                "}</p>

    <Diagram id="chart-4" label="\n                    2. ドメイン1: FM統合・データ管理・コンプライアンス(31%)\n                の図解"/>

    <hr />

    <h3 id="step-1-タスク11-要件を分析しgenaiソリューションを設計する" tabIndex={-1}>{"\n                    Step 1. タスク1.1 要件を分析しGenAIソリューションを設計する\n                "}</h3>

    <p><strong>{"狙い"}</strong>{":\n                    ビジネス要件から、FM・統合パターン・デプロイ戦略を決め、PoCで妥当性を検証し、再利用部品を標準化する。\n                "}</p>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"スキル"}</th><th scope="col">{"主なサービス/概念"}</th><th scope="col">{"一言ポイント"}</th></tr></thead><tbody><tr className="odd"><td>{"1.1.1 アーキテクチャ設計"}</td><td>{"Bedrock、統合パターン"}</td><td>{"要件(精度・遅延・コスト・規制)→ 設計の順で考える"}</td></tr><tr className="even"><td>{"1.1.2 PoC"}</td><td>{"Amazon Bedrock"}</td><td>{"本番投資の前に、実現性・性能・価値を小さく検証"}</td></tr><tr className="odd"><td>{"1.1.3 標準コンポーネント"}</td><td>{"Well-Architected Framework、Generative AI Lens"}</td><td>{"複数環境で一貫した実装にする"}</td></tr></tbody></table></div>

    <h4>{"1.1.1 要件から設計へ(考え方)"}</h4>

    <p>{"\n                    初学者がまず身につけるべきは「"}<strong>{"ユースケースを分類し、必要な構成要素を逆算する"}</strong>{"」ことです。\n                "}</p>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"ユースケース"}</th><th scope="col">{"典型構成"}</th><th scope="col">{"主な論点"}</th></tr></thead><tbody><tr className="odd"><td>{"社内文書Q&A"}</td><td>{"RAG(Knowledge Bases + FM)"}</td><td>{"検索精度、アクセス制御、鮮度"}</td></tr><tr className="even"><td>{"業務自動化"}</td><td>{"エージェント + ツール(Lambda/API)"}</td><td>{"権限境界、停止条件、人手承認"}</td></tr><tr className="odd"><td>{"文書処理(契約書・請求書)"}</td><td>{"Bedrock Data Automation / Textract + FM + Step Functions"}</td><td>{"構造化出力、検証"}</td></tr><tr className="even"><td>{"チャットボット"}</td><td>{"Converse + 会話履歴(DynamoDB) + Guardrails"}</td><td>{"コンテキスト管理、安全性"}</td></tr><tr className="odd"><td>{"大量バッチ要約"}</td><td>{"バッチ推論 + S3"}</td><td>{"コスト最適化"}</td></tr></tbody></table></div>

    <Diagram id="chart-5" label="1.1.1 要件から設計へ(考え方)の図解"/>

    <div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"ベストプラクティス"}</div><p>{"\n                            「まずプロンプト → 次にRAG →\n                            それでも足りなければカスタマイズ(微調整)」の順で試す。コストと運用負荷が低い順です。\n                        "}</p></div></div>

    <h4>{"1.1.2 PoC のやり方"}</h4>

    <ol><li>{"\n                        成功指標を先に決める(例: 正答率80%以上、応答3秒以内、1問あたりコスト上限)\n                    "}</li><li>{"代表的な質問・文書の"}<strong>{"評価用データセット"}</strong>{"を用意する"}</li><li>{"Bedrock のコンソール/Playground と少数のモデルで素早く試す"}</li><li>{"\n                        指標を満たすかを測定し、"}<strong>{"本番移行の可否(Go/No-Go)"}</strong>{"を判断する\n                    "}</li></ol>

    <h4>{"1.1.3 標準化(Well-Architected Generative AI Lens)"}</h4>

    <p>{"\n                    AWS Well-Architected Framework には Generative AI Lens\n                    があり、GenAIワークロード向けのベストプラクティスとレビュー観点が整理されています。AWS\n                    Well-Architected Tool\n                    でレビューを実施でき、"}<strong>{"組織共通のテンプレート(IaC、プロンプトテンプレート、ガードレール設定)"}</strong>{"を部品化して再利用すると、環境間の品質差を減らせます。\n                "}</p>

    <div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"試験での着眼点"}</div><p>{"\n                            「複数チーム・複数環境で一貫した実装」→\n                            共通部品(CDK/CloudFormation、Service Catalog、Prompt Management)と\n                            Well-Architected Generative AI Lens。\n                        "}</p></div></div>

    <hr />

    <h3 id="step-2-タスク12-fmを選定構成する" tabIndex={-1}>{"Step 2. タスク1.2 FMを選定・構成する"}</h3>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"スキル"}</th><th scope="col">{"主なサービス/概念"}</th><th scope="col">{"一言ポイント"}</th></tr></thead><tbody><tr className="odd"><td>{"1.2.1 FM評価・選定"}</td><td>{"ベンチマーク、能力分析"}</td><td>{"精度・遅延・コスト・コンテキスト長・対応言語で比較"}</td></tr><tr className="even"><td>{"1.2.2 動的モデル選択"}</td><td>{"Lambda、API Gateway、AppConfig"}</td><td><strong>{"コード変更なし"}</strong>{"でモデルやプロバイダを切り替える\n                                "}</td></tr><tr className="odd"><td>{"1.2.3 耐障害性"}</td><td>{"Step Functions、クロスリージョン推論"}</td><td>{"サーキットブレーカー、グレースフルデグレード"}</td></tr><tr className="even"><td>{"1.2.4 カスタマイズFMのライフサイクル"}</td><td>{"SageMaker AI、Model Registry、LoRA"}</td><td>{"バージョン管理、ロールバック、廃止"}</td></tr></tbody></table></div>

    <h4>{"1.2.1 FMの選び方"}</h4>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"比較軸"}</th><th scope="col">{"確認すること"}</th></tr></thead><tbody><tr className="odd"><td>{"品質"}</td><td>{"自社タスクでの評価結果(公開ベンチマークだけに頼らない)"}</td></tr><tr className="even"><td>{"レイテンシ"}</td><td>{"時間制約のあるUIなら低遅延モデル"}</td></tr><tr className="odd"><td>{"コスト"}</td><td>{"\n                                    入力/出力トークン単価。簡単な問い合わせは小型モデルで十分なことが多い\n                                "}</td></tr><tr className="even"><td>{"コンテキスト長"}</td><td>{"長文書を扱うか"}</td></tr><tr className="odd"><td>{"モダリティ"}</td><td>{"画像・音声・動画の入力が必要か"}</td></tr><tr className="even"><td>{"リージョン/コンプライアンス"}</td><td>{"利用可能リージョン、データ処理場所"}</td></tr></tbody></table></div>

    <h4>{"1.2.2 コード変更なしでモデルを切り替える"}</h4>

    <Diagram id="chart-6" label="1.2.2 コード変更なしでモデルを切り替えるの図解"/>

    <ul><li><strong>{"AppConfig"}</strong>{"\n                        にモデルID・温度・最大トークンなどを置く(機能フラグ的に運用)\n                    "}</li><li>{"\n                        段階的デプロイ(一部のユーザーだけ新モデル)や"}<strong>{"自動ロールバック"}</strong>{"ができる\n                    "}</li><li>{"Converse API を使えば、モデル変更時のリクエスト整形コードの差が小さい"}</li></ul>

    <div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"試験での着眼点"}</div><p>{"\n                            「再デプロイなしでモデルを切り替えたい」「段階的に展開したい」→\n                            "}<strong>{"AppConfig"}</strong>{"。\n                        "}</p></div></div>

    <h4>{"1.2.3 耐障害性の設計"}</h4>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"障害"}</th><th scope="col">{"対策"}</th></tr></thead><tbody><tr className="odd"><td>{"特定リージョンの容量不足・スロットリング"}</td><td><strong>{"クロスリージョン推論"}</strong>{"(推論プロファイル)"}</td></tr><tr className="even"><td>{"下流(モデル/ツール)の連続失敗"}</td><td><strong>{"サーキットブレーカー"}</strong>{"(Step Functions + DynamoDB\n                                    で状態管理)、再試行は指数バックオフ\n                                "}</td></tr><tr className="odd"><td>{"モデル全体の停止"}</td><td><strong>{"フォールバックモデル"}</strong>{"、キャッシュ回答、定型回答へのデグレード\n                                "}</td></tr><tr className="even"><td>{"一時的エラー"}</td><td>{"再試行(Retry/Catch)、ジッタ付きバックオフ"}</td></tr></tbody></table></div>

    <Diagram id="chart-7" label="1.2.3 耐障害性の設計の図解"/>

    <div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"ベストプラクティス"}</div><p>{"\n                            グレースフルデグレード = 「止めない。品質や機能を下げて継続する」。例:\n                            RAGが落ちたら一般知識だけで回答し、その旨を明示。\n                        "}</p></div></div>

    <h4>{"1.2.4 カスタマイズモデルのライフサイクル"}</h4>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"フェーズ"}</th><th scope="col">{"サービス/手法"}</th></tr></thead><tbody><tr className="odd"><td>{"微調整"}</td><td>{"\n                                    SageMaker AI(ドメイン特化)。"}<strong>{"LoRA"}</strong>{"\n                                    やアダプタなどパラメータ効率の良い手法で計算コストを抑える\n                                "}</td></tr><tr className="even"><td>{"バージョン管理"}</td><td><strong>{"SageMaker Model Registry"}</strong>{"(承認ステータスを持つ)\n                                "}</td></tr><tr className="odd"><td>{"デプロイ"}</td><td>{"\n                                    自動化パイプライン(CodePipeline 等)、SageMaker エンドポイント\n                                "}</td></tr><tr className="even"><td>{"失敗時"}</td><td><strong>{"ロールバック"}</strong>{"(前バージョンへ戻す)"}</td></tr><tr className="odd"><td>{"廃止"}</td><td>{"古いモデルを退役させ新モデルへ置き換える計画を持つ"}</td></tr></tbody></table></div>

    <p><strong>{"LoRA を一言で"}</strong>{":\n                    モデル全体ではなく"}<strong>{"小さな追加行列(アダプタ)だけ"}</strong>{"を学習する手法。学習コストと保存サイズが小さく、複数のアダプタを切り替えやすい。\n                "}</p>

    <hr />

    <h3 id="step-3-タスク13-fm向けのデータ検証加工パイプライン" tabIndex={-1}>{"\n                    Step 3. タスク1.3 FM向けのデータ検証・加工パイプライン\n                "}</h3>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"スキル"}</th><th scope="col">{"主なサービス"}</th><th scope="col">{"一言ポイント"}</th></tr></thead><tbody><tr className="odd"><td>{"1.3.1 データ品質検証"}</td><td>{"\n                                    AWS Glue Data Quality、SageMaker Data\n                                    Wrangler、Lambda、CloudWatch\n                                "}</td><td>{"品質ルールで自動検査し、メトリクスで可視化"}</td></tr><tr className="even"><td>{"1.3.2 マルチモーダル処理"}</td><td>{"\n                                    Bedrock マルチモーダルモデル、SageMaker Processing、Amazon\n                                    Transcribe\n                                "}</td><td>{"テキスト/画像/音声/表形式ごとに前処理"}</td></tr><tr className="odd"><td>{"1.3.3 入力整形"}</td><td>{"Bedrock API の JSON、会話形式"}</td><td><strong>{"モデル固有の形式"}</strong>{"に合わせる"}</td></tr><tr className="even"><td>{"1.3.4 入力品質向上"}</td><td>{"Bedrock、Comprehend、Lambda"}</td><td>{"整形・エンティティ抽出・正規化"}</td></tr></tbody></table></div>

    <Diagram id="chart-8" label="\n                    Step 3. タスク1.3 FM向けのデータ検証・加工パイプライン\n                の図解"/>

    <p><strong>{"入力整形の例"}</strong>{"(Converse API 形式のイメージ):"}</p>

    <div className="code-block" role="region" aria-label="Converse API 入力JSON例"><div className="code-line">{"{"}</div>
    <div className="code-line">{"  \"modelId\": \"<モデルIDまたは推論プロファイルID>\","}</div>
    <div className="code-line">{"  \"system\": [{ \"text\": \"あなたは社内ヘルプデスクの回答担当です。根拠のない回答はしないでください。\" }],"}</div>
    <div className="code-line">{"  \"messages\": ["}</div>
    <div className="code-line">{"    { \"role\": \"user\", \"content\": [{ \"text\": \"経費精算の締め日はいつですか?\" }] }"}</div>
    <div className="code-line">{"  ],"}</div>
    <div className="code-line">{"  \"inferenceConfig\": { \"maxTokens\": 512, \"temperature\": 0.2 }"}</div>
    <div className="code-line">{"}"}</div></div>

    <div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"ベストプラクティス"}</div><ul style={{ "marginTop": "0px", "marginRight": "0px", "marginBottom": "0px", "marginLeft": "0px", "margin": "0px" }}><li>{"\n                                「ゴミを入れればゴミが出る」。"}<strong>{"取り込み前に"}</strong>{"欠損・重複・文字化け・PIIを検査する\n                            "}</li><li>{"\n                                品質ルールの違反件数を CloudWatch\n                                メトリクスにして、閾値超えでアラーム\n                            "}</li><li>{"\n                                日本語など多言語は文字コード・正規化(全角半角、表記ゆれ)を揃える\n                            "}</li><li>{"\n                                会話アプリは\n                                role(user/assistant)の"}<strong>{"交互形式"}</strong>{"と履歴の長さ上限に注意\n                            "}</li></ul></div></div>

    <div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"試験での着眼点"}</div><p>{"\n                            「データ品質ルールを宣言的に定義して自動チェック」→\n                            "}<strong>{"Glue Data Quality"}</strong>{"。「入力のエンティティ抽出」→\n                            "}<strong>{"Comprehend"}</strong>{"。「音声→テキスト」→\n                            "}<strong>{"Transcribe"}</strong>{"。\n                        "}</p></div></div>

    <hr />

    <h3 id="step-4-タスク14-ベクトルストアを設計実装する" tabIndex={-1}>{"\n                    Step 4. タスク1.4 ベクトルストアを設計・実装する\n                "}</h3>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"スキル"}</th><th scope="col">{"主なサービス/概念"}</th><th scope="col">{"一言ポイント"}</th></tr></thead><tbody><tr className="odd"><td>{"1.4.1 ベクトルDBアーキテクチャ"}</td><td>{"\n                                    Bedrock Knowledge Bases、OpenSearch Service(Neural\n                                    plugin)、RDS/Aurora、DynamoDB\n                                "}</td><td>{"用途と運用負荷でストアを選ぶ"}</td></tr><tr className="even"><td>{"1.4.2 メタデータ設計"}</td><td>{"S3 オブジェクトメタデータ、タグ"}</td><td>{"検索の絞り込み精度を上げる"}</td></tr><tr className="odd"><td>{"1.4.3 高性能化"}</td><td>{"\n                                    OpenSearch シャーディング、複数インデックス、階層インデックス\n                                "}</td><td>{"スケール時の性能設計"}</td></tr><tr className="even"><td>{"1.4.4 データソース統合"}</td><td>{"文書管理システム、社内Wiki"}</td><td>{"コネクタで取り込む"}</td></tr><tr className="odd"><td>{"1.4.5 データ保守"}</td><td>{"増分更新、変更検知、同期、定期更新"}</td><td>{"古い情報を残さない"}</td></tr></tbody></table></div>

    <h4>{"1.4.1 ベクトルストアの選び方"}</h4>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"選択肢"}</th><th scope="col">{"向く場面"}</th><th scope="col">{"特徴"}</th></tr></thead><tbody><tr className="odd"><td><strong>{"Bedrock Knowledge Bases(マネージド)"}</strong></td><td>{"早く・運用少なくRAGを作りたい"}</td><td>{"\n                                    取り込み・チャンク化・埋め込み・検索をマネージドで提供。裏のベクトルストアを選択\n                                "}</td></tr><tr className="even"><td><strong>{"Amazon OpenSearch Service"}</strong></td><td>{"高度な検索(ハイブリッド、細かなスコア調整)が必要"}</td><td>{"\n                                    k-NN/ベクトル検索 + 全文検索。シャード設計や運用の自由度が高い\n                                "}</td></tr><tr className="odd"><td><strong>{"Aurora PostgreSQL + pgvector"}</strong></td><td>{"既存のRDBとデータを同居させたい"}</td><td>{"SQLでメタデータ条件と併用しやすい"}</td></tr><tr className="even"><td><strong>{"DynamoDB(メタデータ)+ ベクトルDB"}</strong></td><td>{"文書メタデータ・状態管理を別管理"}</td><td>{"ベクトル自体は専用ストア、属性はDynamoDB"}</td></tr></tbody></table></div>

    <p>{"\n                    Knowledge Bases が選べるベクトルストアの種類は追加されています(例: OpenSearch\n                    Serverless、Aurora、S3 Vectors\n                    など)。"}<strong>{"最新の対応一覧は公式ドキュメントで確認"}</strong>{"してください。\n                "}</p>

    <Diagram id="chart-9" label="1.4.1 ベクトルストアの選び方の図解"/>

    <h4>{"1.4.2 メタデータ設計"}</h4>

    <p>{"メタデータは「"}<strong>{"意味検索の前に候補を絞る"}</strong>{"」ための鍵です。"}</p>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"メタデータ例"}</th><th scope="col">{"用途"}</th></tr></thead><tbody><tr className="odd"><td>{"更新日時・文書バージョン"}</td><td>{"最新版だけを検索"}</td></tr><tr className="even"><td>{"作成者・部署"}</td><td>{"権限に応じた絞り込み(部署別アクセス制御)"}</td></tr><tr className="odd"><td>{"ドメイン分類タグ(人事、法務、製品)"}</td><td>{"トピック別検索"}</td></tr><tr className="even"><td>{"言語"}</td><td>{"多言語環境での絞り込み"}</td></tr></tbody></table></div>

    <p>{"\n                    Knowledge Bases\n                    ではS3のデータ文書に対応するメタデータファイル("}<code>{"<ファイル名>.metadata.json"}</code>{")を置き、検索時にフィルタ条件として使います。\n                "}</p>

    <div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"ベストプラクティス"}</div><p>{"\n                            アクセス制御に関わるメタデータ(部署・機密レベル)は"}<strong>{"検索フィルタで必ず適用"}</strong>{"し、FMにはアクセス権のない文書を渡さない。フィルタ値は"}<strong>{"認証済み ID からサーバー側で生成"}</strong>{"するか、ACL 対応データソースでは認証済み ID に基づく\n                            "}<code>{"userContext"}</code>{"\n                            を渡す(クライアント送信の権限フィルタは信用しない)。Lake Formation\n                            が制御するのは Knowledge Base\n                            のサービスロールのデータアクセスであり、呼び出しユーザーごとの取得範囲ではない。\n                        "}</p></div></div>

    <h4>{"1.4.3 高性能化の考え方(OpenSearch)"}</h4>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"論点"}</th><th scope="col">{"方針"}</th></tr></thead><tbody><tr className="odd"><td>{"シャーディング"}</td><td>{"\n                                    データ量と検索負荷に応じてシャード数を設計。"}<strong>{"後から変えにくい"}</strong>{"ので事前に見積もる\n                                "}</td></tr><tr className="even"><td>{"複数インデックス"}</td><td>{"\n                                    法務・製品・人事など"}<strong>{"ドメインごとに分ける"}</strong>{"と、検索対象が絞れて高速・高精度\n                                "}</td></tr><tr className="odd"><td>{"階層インデックス"}</td><td>{"要約インデックス → 詳細インデックスの二段階検索"}</td></tr><tr className="even"><td>{"メモリ"}</td><td>{"\n                                    ベクトルは大量のメモリを使う。次元数の削減や量子化などで調整\n                                "}</td></tr></tbody></table></div>

    <h4>{"1.4.5 データ保守(鮮度を保つ)"}</h4>

    <Diagram id="chart-10" label="1.4.5 データ保守(鮮度を保つ)の図解"/>

    <ul><li><strong>{"増分更新"}</strong>{": 変更分だけ再取り込み(全再構築より安く速い)"}</li><li><strong>{"変更検知"}</strong>{": S3イベント通知 → EventBridge → 同期処理"}</li><li><strong>{"削除の反映"}</strong>{"を忘れない(消した文書が検索に残るとハルシネーション・情報漏えいの原因)\n                    "}</li></ul>

    <div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"試験での着眼点"}</div><p>{"\n                            「最新の情報を常に反映」→ 変更検知 + 増分同期。「運用最小」→ Knowledge\n                            Bases。「全文検索 + ベクトルのハイブリッド」→ OpenSearch。\n                        "}</p></div></div>

    <hr />

    <h3 id="step-5-タスク15-fm補強のための検索機構を設計する" tabIndex={-1}>{"\n                    Step 5. タスク1.5 FM補強のための検索機構を設計する\n                "}</h3>

    <p>{"RAGの品質は"}<strong>{"検索の質"}</strong>{"で決まります。流れを先に押さえましょう。"}</p>

    <Diagram id="chart-11" label="\n                    Step 5. タスク1.5 FM補強のための検索機構を設計する\n                の図解"/>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"スキル"}</th><th scope="col">{"主なサービス/概念"}</th><th scope="col">{"一言ポイント"}</th></tr></thead><tbody><tr className="odd"><td>{"1.5.1 文書の分割"}</td><td>{"Bedrock チャンク機能、Lambda"}</td><td>{"固定長・階層・セマンティック"}</td></tr><tr className="even"><td>{"1.5.2 埋め込みの選択"}</td><td>{"Titan Embeddings、Bedrock 埋め込みモデル"}</td><td>{"次元数・ドメイン適合で選ぶ"}</td></tr><tr className="odd"><td>{"1.5.3 ベクトル検索"}</td><td>{"OpenSearch、Aurora pgvector、Knowledge Bases"}</td><td>{"検索基盤を構築"}</td></tr><tr className="even"><td>{"1.5.4 高度な検索"}</td><td>{"ハイブリッド検索、Reranker"}</td><td>{"関連度・精度を上げる"}</td></tr><tr className="odd"><td>{"1.5.5 クエリ処理"}</td><td>{"クエリ拡張、分解、変換"}</td><td>{"あいまい/複合質問への対応"}</td></tr><tr className="even"><td>{"1.5.6 アクセス統一"}</td><td>{"関数呼び出し、MCPクライアント"}</td><td>{"検索をツールとして標準化"}</td></tr></tbody></table></div>

    <h4>{"1.5.1 チャンク戦略(最頻出)"}</h4>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"戦略"}</th><th scope="col">{"仕組み"}</th><th scope="col">{"向く場面"}</th><th scope="col">{"注意"}</th></tr></thead><tbody><tr className="odd"><td>{"デフォルト"}</td><td>{"約300トークンごと。文の境界を尊重"}</td><td>{"まず試す"}</td><td>{"万能ではない"}</td></tr><tr className="even"><td>{"固定長"}</td><td>{"最大トークン数 + オーバーラップ"}</td><td>{"単純な文書"}</td><td>{"文脈が途切れやすい → オーバーラップで補う"}</td></tr><tr className="odd"><td>{"階層(親子)"}</td><td>{"小さい子チャンクで検索 → 大きい親チャンクを返す"}</td><td>{"長い構造化文書"}</td><td>{"検索精度と十分な文脈を両立"}</td></tr><tr className="even"><td>{"セマンティック"}</td><td>{"意味のまとまりで分割(FMを使う)"}</td><td>{"意味境界が重要な文書"}</td><td><strong>{"追加のFM費用"}</strong>{"がかかる"}</td></tr><tr className="odd"><td>{"なし"}</td><td>{"分割しない"}</td><td>{"事前に分割済み"}</td><td>{"ページ番号の引用・フィルタが使えない場合がある"}</td></tr></tbody></table></div>

    <div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"ベストプラクティス"}</div><p>{"\n                            チャンクは「"}<strong>{"小さすぎると文脈不足、大きすぎるとノイズ増・コスト増"}</strong>{"」。評価データで比較して決める。表・見出しなど構造を壊さない。\n                        "}</p></div></div>

    <p>{"\n                    出典:\n                    "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking.html">{"How content chunking works for knowledge bases"}</a></p>

    <h4>{"1.5.2 埋め込みモデルの選び方"}</h4>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"観点"}</th><th scope="col">{"説明"}</th></tr></thead><tbody><tr className="odd"><td>{"次元数"}</td><td>{"\n                                    次元が大きいほど表現力は上がるが、ストレージ・検索コストも増える。Titan\n                                    Text Embeddings V2 は複数の次元数から選べる\n                                "}</td></tr><tr className="even"><td>{"ドメイン/言語適合"}</td><td>{"日本語や専門用語に強いモデルを評価で選ぶ"}</td></tr><tr className="odd"><td>{"一貫性"}</td><td><strong>{"取り込み時と検索時で同じ埋め込みモデル"}</strong>{"を使う(違うとベクトル空間が合わず検索が壊れる)\n                                "}</td></tr><tr className="even"><td>{"大量生成"}</td><td>{"Lambda でバッチ生成、レート制限に配慮"}</td></tr></tbody></table></div>

    <div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"試験の定番"}</div><p>{"\n                            「モデルを変更したら検索品質が急落」→\n                            埋め込みモデルの不一致。"}<strong>{"再埋め込み(全件再インデックス)"}</strong>{"が必要。\n                        "}</p></div></div>

    <h4>{"1.5.4 ハイブリッド検索と再ランキング"}</h4>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"手法"}</th><th scope="col">{"得意"}</th><th scope="col">{"苦手"}</th></tr></thead><tbody><tr className="odd"><td>{"キーワード(BM25等)"}</td><td>{"型番・固有名詞・完全一致"}</td><td>{"言い換え・意味的類似"}</td></tr><tr className="even"><td>{"ベクトル(意味)"}</td><td>{"言い換え・曖昧な質問"}</td><td>{"型番などの厳密一致"}</td></tr><tr className="odd"><td><strong>{"ハイブリッド"}</strong></td><td>{"両方を組み合わせ、弱点を補う"}</td><td>{"スコア統合の設計が必要"}</td></tr><tr className="even"><td><strong>{"再ランキング"}</strong></td><td>{"検索上位N件を、質問との関連度で並べ替え"}</td><td>{"追加の呼び出し・遅延"}</td></tr></tbody></table></div>

    <div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"ベストプラクティス"}</div><p>{"\n                            「広めに検索(例: 上位数十件)→ Reranker で絞る(上位数件)→ FMへ」が定番。\n                        "}</p></div></div>

    <h4>{"1.5.5 クエリ処理"}</h4>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"手法"}</th><th scope="col">{"説明"}</th><th scope="col">{"実装例"}</th></tr></thead><tbody><tr className="odd"><td>{"クエリ拡張"}</td><td>{"同義語・言い換えを加える"}</td><td>{"Bedrock で言い換え生成"}</td></tr><tr className="even"><td>{"クエリ分解"}</td><td>{"複合質問を小さな質問に分ける"}</td><td>{"Lambda / Step Functions で並列検索"}</td></tr><tr className="odd"><td>{"クエリ変換"}</td><td>{"会話履歴を踏まえて独立した質問に書き換える"}</td><td>{"「それはいつ?」→「経費精算の締め日はいつ?」"}</td></tr></tbody></table></div>

    <h4>{"1.5.6 検索の標準的な公開方法"}</h4>

    <p>{"\n                    検索機能を"}<strong>{"関数呼び出し(ツール)"}</strong>{"または\n                    "}<strong>{"MCP サーバー"}</strong>{"として公開し、エージェントやアプリから同じ方法で使えるようにします。インターフェースを標準化すると、検索基盤を差し替えても呼び出し側を変えずに済みます。\n                "}</p>

    <div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"試験での着眼点"}</div><p>{"\n                            「型番検索と自然文の両方に強く」→\n                            ハイブリッド。「上位結果の順位精度を上げたい」→ Reranker。「複合質問」→\n                            クエリ分解。\n                        "}</p></div></div>

    <hr />

    <h3 id="step-6-タスク16-プロンプトエンジニアリングとガバナンス" tabIndex={-1}>{"\n                    Step 6. タスク1.6 プロンプトエンジニアリングとガバナンス\n                "}</h3>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"スキル"}</th><th scope="col">{"主なサービス/概念"}</th><th scope="col">{"一言ポイント"}</th></tr></thead><tbody><tr className="odd"><td>{"1.6.1 指示フレームワーク"}</td><td>{"Prompt Management、Guardrails"}</td><td>{"役割定義・テンプレートで挙動を制御"}</td></tr><tr className="even"><td>{"1.6.2 対話システム"}</td><td>{"Step Functions、Comprehend、DynamoDB"}</td><td>{"文脈維持、確認質問、履歴保存"}</td></tr><tr className="odd"><td>{"1.6.3 プロンプト管理・統制"}</td><td>{"Prompt Management、S3、CloudTrail、CloudWatch Logs"}</td><td>{"バージョン・承認・監査"}</td></tr><tr className="even"><td>{"1.6.4 品質保証"}</td><td>{"Lambda、Step Functions、CloudWatch"}</td><td>{"期待出力の検証、回帰テスト"}</td></tr><tr className="odd"><td>{"1.6.5 反復改善"}</td><td>{"構造化入力、出力形式指定、CoT"}</td><td>{"基本を超えた改善"}</td></tr><tr className="even"><td>{"1.6.6 複雑なプロンプト系"}</td><td>{"Prompt Flows"}</td><td>{"連鎖・分岐・前後処理"}</td></tr></tbody></table></div>

    <h4>{"1.6.1 / 1.6.5 良いプロンプトの構造"}</h4>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"要素"}</th><th scope="col">{"内容"}</th><th scope="col">{"例"}</th></tr></thead><tbody><tr className="odd"><td>{"役割"}</td><td>{"FMの立場を定義"}</td><td>{"「あなたは経理部のサポート担当です」"}</td></tr><tr className="even"><td>{"タスク"}</td><td>{"やってほしいこと"}</td><td>{"「以下の規程から質問に回答」"}</td></tr><tr className="odd"><td>{"コンテキスト"}</td><td>{"参照情報(RAG結果など)"}</td><td><code>{"<documents>…</documents>"}</code></td></tr><tr className="even"><td>{"制約"}</td><td>{"やってはいけないこと"}</td><td>{"「根拠がなければ『分かりません』と答える」"}</td></tr><tr className="odd"><td>{"出力形式"}</td><td>{"JSON、箇条書きなど"}</td><td>{"「次のJSONスキーマで出力」"}</td></tr><tr className="even"><td>{"例(Few-shot)"}</td><td>{"入出力の見本"}</td><td>{"2〜3例"}</td></tr></tbody></table></div>

    <ul><li><strong>{"Chain-of-Thought(思考の連鎖)"}</strong>{":\n                        段階的に考えさせると、複雑な推論の精度が上がることが多い(ただしトークンは増える)\n                    "}</li><li><strong>{"構造化出力"}</strong>{": JSON Schema を指定し、後段でスキーマ検証する\n                    "}</li><li><strong>{"フィードバックループ"}</strong>{": 失敗事例を集めてプロンプト・例を改善\n                    "}</li></ul>

    <h4>{"1.6.2 対話システム"}</h4>

    <Diagram id="chart-12" label="1.6.2 対話システムの図解"/>

    <ul><li>{"履歴は "}<strong>{"DynamoDB"}</strong>{" に保存し、TTLで保持期間を管理"}</li><li>{"\n                        履歴が長くなると"}<strong>{"コスト増・コンテキスト超過"}</strong>{"になる →\n                        古い履歴は"}<strong>{"要約"}</strong>{"して圧縮\n                    "}</li></ul>

    <h4>{"1.6.3 プロンプトのガバナンス"}</h4>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"機能"}</th><th scope="col">{"役割"}</th></tr></thead><tbody><tr className="odd"><td><strong>{"Bedrock Prompt Management"}</strong></td><td>{"\n                                    プロンプトを"}<strong>{"テンプレート化"}</strong>{"(変数\n                                    "}<code>{"{{variable}}"}</code>{")、バージョン管理、バリアント比較\n                                "}</td></tr><tr className="even"><td>{"承認ワークフロー"}</td><td>{"レビュー・承認を経て本番バージョンを公開"}</td></tr><tr className="odd"><td>{"S3"}</td><td>{"テンプレートのリポジトリ"}</td></tr><tr className="even"><td>{"CloudTrail"}</td><td>{"「誰がいつプロンプトを変更/利用したか」の監査"}</td></tr><tr className="odd"><td>{"CloudWatch Logs"}</td><td>{"アクセス・利用ログ"}</td></tr></tbody></table></div>

    <div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"ベストプラクティス"}</div><p>{"\n                            プロンプトを"}<strong>{"コードに埋め込まず"}</strong>{"外部管理(バージョン +\n                            承認 + 監査)にする。変更の影響を追えるようにする。\n                        "}</p></div></div>

    <h4>{"1.6.4 プロンプトの品質保証"}</h4>

    <ul><li><strong>{"期待出力の検証"}</strong>{": Lambda で JSON\n                        スキーマ・必須キー・禁止語を検査\n                    "}</li><li><strong>{"エッジケース試験"}</strong>{": Step Functions で多数ケースを自動実行\n                    "}</li><li><strong>{"回帰テスト"}</strong>{":\n                        プロンプト変更前後で品質が落ちていないか比較(CloudWatch で指標を追跡)\n                    "}</li></ul>

    <h4>{"1.6.6 Prompt Flows"}</h4>

    <p>{"\n                    プロンプトを"}<strong>{"ノードでつないで視覚的に"}</strong>{"組み立てる機能です(ノーコード寄り)。\n                "}</p>

    <Diagram id="chart-13" label="1.6.6 Prompt Flowsの図解"/>

    <ul><li><strong>{"逐次連鎖"}</strong>{": 出力を次のプロンプトの入力にする"}</li><li><strong>{"条件分岐"}</strong>{": モデル出力に応じて処理を変える"}</li><li><strong>{"再利用"}</strong>{": 共通部品化、前処理・後処理を統合"}</li></ul>

    <div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"試験での着眼点"}</div><p>{"\n                            「プロンプトのバージョン管理・変数化・承認」→\n                            "}<strong>{"Prompt Management"}</strong>{"。「複数プロンプトの連鎖・分岐をGUIで」→\n                            "}<strong>{"Prompt Flows"}</strong>{"。「変更履歴の監査」→\n                            "}<strong>{"CloudTrail"}</strong>{"。\n                        "}</p></div></div>

    <hr />

    </div>;
}
