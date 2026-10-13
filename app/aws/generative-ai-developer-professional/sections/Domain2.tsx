import { Diagram } from '../Diagram';
/** 原本のdomain2本文を全量移行。 */
export default function Domain2() {
    return <div className="guide-part" data-part="domain2">
    <h2 id="3-ドメイン2-実装と統合26" tabIndex={-1}>{"3. ドメイン2: 実装と統合(26%)"}</h2>

    <p><strong>{"エージェント・デプロイ・企業システム統合・API・開発ツール"}</strong>{"を扱います。\n                "}</p>

    <Diagram id="chart-14" label="3. ドメイン2: 実装と統合(26%)の図解"/>

    <hr />

    <h3 id="step-7-タスク21-エージェント型aiとツール統合" tabIndex={-1}>{"\n                    Step 7. タスク2.1 エージェント型AIとツール統合\n                "}</h3>

    <h4>{"7.1 エージェントとは"}</h4>

    <p>{"\n                    エージェントは、FMが"}<strong>{"ループ"}</strong>{"で「考える → ツールを選ぶ → 実行 →\n                    結果を観察 → 次を考える」を繰り返し、目標達成まで進む仕組みです。\n                "}</p>

    <Diagram id="chart-15" label="7.1 エージェントとはの図解"/>

    <p>{"これが "}<strong>{"ReAct パターン"}</strong>{"(Reasoning + Acting)です。"}</p>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"スキル"}</th><th scope="col">{"主なサービス/概念"}</th><th scope="col">{"一言ポイント"}</th></tr></thead><tbody><tr className="odd"><td>{"2.1.1 自律システム + メモリ/状態"}</td><td>{"Strands Agents、AWS Agent Squad、MCP"}</td><td>{"フレームワークとプロトコルの役割分担"}</td></tr><tr className="even"><td>{"2.1.2 構造化推論"}</td><td>{"Step Functions(ReAct、CoT)"}</td><td>{"推論手順をワークフローで制御"}</td></tr><tr className="odd"><td>{"2.1.3 安全なワークフロー"}</td><td>{"\n                                    Step Functions 停止条件、Lambda\n                                    タイムアウト、IAM、サーキットブレーカー\n                                "}</td><td><strong>{"暴走を止める"}</strong></td></tr><tr className="even"><td>{"2.1.4 モデル協調"}</td><td>{"専門FM、アンサンブル、モデル選択"}</td><td>{"役割別に最適モデル"}</td></tr><tr className="odd"><td>{"2.1.5 人間との協調"}</td><td>{"Step Functions 承認、API Gateway フィードバック"}</td><td>{"Human-in-the-loop"}</td></tr><tr className="even"><td>{"2.1.6 ツール統合"}</td><td>{"Strands API、標準関数定義、Lambda"}</td><td>{"エラー処理・引数検証"}</td></tr><tr className="odd"><td>{"2.1.7 モデル拡張基盤"}</td><td>{"Lambda/ECS 上の MCP サーバー"}</td><td>{"ツールの提供形態"}</td></tr></tbody></table></div>

    <h4>{"7.2 フレームワークの位置づけ"}</h4>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"名称"}</th><th scope="col">{"何者か"}</th><th scope="col">{"覚え方"}</th></tr></thead><tbody><tr className="odd"><td><strong>{"Strands Agents"}</strong></td><td>{"\n                                    AWS発のオープンソース・エージェントSDK。モデル主導で、少ないコードでエージェントを定義(モデル\n                                    + プロンプト +\n                                    ツール)。マルチエージェント(workflow/graph/swarm等)にも対応\n                                "}</td><td>{"単一エージェントのループ + ツール利用が中心"}</td></tr><tr className="even"><td><strong>{"AWS Agent Squad"}</strong></td><td>{"\n                                    オープンソースのマルチエージェント・オーケストレーション。"}<strong>{"意図分類で適切なエージェントへ振り分け"}</strong></td><td>{"ルーティング・意図検出が中心"}</td></tr><tr className="odd"><td><strong>{"Amazon Bedrock Agents"}</strong></td><td>{"\n                                    マネージドのエージェント(アクショングループ、ナレッジベース連携、トレース)\n                                "}</td><td>{"ノーコード/ローコードで早く作る"}</td></tr><tr className="even"><td><strong>{"Amazon Bedrock AgentCore"}</strong></td><td>{"\n                                    エージェントを"}<strong>{"本番運用"}</strong>{"するためのマネージド基盤群(Runtime、Memory、Gateway、Identity、Observability、Code\n                                    Interpreter、Browser など)\n                                "}</td><td>{"「作る」ではなく「安全に動かす・運用する」"}</td></tr><tr className="odd"><td><strong>{"MCP"}</strong></td><td>{"エージェントとツール/データをつなぐ標準プロトコル"}</td><td>{"ツール接続のUSB規格のようなもの"}</td></tr></tbody></table></div>

    <p>{"\n                    出典:\n                    "}<a href="https://aws.amazon.com/blogs/opensource/introducing-strands-agents-an-open-source-ai-agents-sdk/">{"Introducing Strands Agents"}</a>{"、"}<a href="https://aws.amazon.com/blogs/opensource/introducing-strands-agents-1-0-production-ready-multi-agent-orchestration-made-simple/">{"Strands Agents 1.0"}</a>{"、"}<a href="https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html">{"What is Amazon Bedrock AgentCore"}</a></p>

    <p><strong>{"メモリと状態"}</strong></p>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"種類"}</th><th scope="col">{"内容"}</th><th scope="col">{"保存先の例"}</th></tr></thead><tbody><tr className="odd"><td>{"短期(会話内)"}</td><td>{"直近のやり取り"}</td><td>{"AgentCore Memory / DynamoDB / セッション"}</td></tr><tr className="even"><td>{"長期"}</td><td>{"ユーザー嗜好・過去の要約"}</td><td>{"AgentCore Memory(長期)/ DB"}</td></tr><tr className="odd"><td>{"実行状態"}</td><td>{"現在のタスク進捗"}</td><td>{"Step Functions の状態、DynamoDB"}</td></tr></tbody></table></div>

    <h4>{"7.3 安全なエージェント設計(2.1.3)— 試験頻出"}</h4>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"リスク"}</th><th scope="col">{"対策"}</th></tr></thead><tbody><tr className="odd"><td>{"無限ループ・暴走"}</td><td><strong>{"最大反復回数/停止条件"}</strong>{"(Step Functions)、Lambda\n                                    タイムアウト\n                                "}</td></tr><tr className="even"><td>{"権限逸脱"}</td><td><strong>{"最小権限のIAM"}</strong>{"、リソース境界(許可するAPI/リソースを限定)\n                                "}</td></tr><tr className="odd"><td>{"連続失敗の拡大"}</td><td><strong>{"サーキットブレーカー"}</strong></td></tr><tr className="even"><td>{"破壊的操作"}</td><td><strong>{"人手承認"}</strong>{"を挟む"}</td></tr><tr className="odd"><td>{"不正な引数"}</td><td>{"ツール側で"}<strong>{"パラメータ検証"}</strong></td></tr></tbody></table></div>

    <Diagram id="chart-16" label="7.3 安全なエージェント設計(2.1.3)— 試験頻出の図解"/>

    <p><strong>{"Step Functions で人手承認"}</strong>{":\n                    タスクトークン("}<code>{".waitForTaskToken"}</code>{")で外部の承認を待ち、承認結果で再開する。\n                "}</p>

    <h4>{"7.4 ツール統合と MCP(2.1.6 / 2.1.7)"}</h4>

    <ul><li><strong>{"ツール定義"}</strong>{": 名前・説明・入力スキーマ(JSON\n                        Schema)を標準化。"}<strong>{"説明文の質がツール選択精度を左右"}</strong></li><li><strong>{"Lambda でツール実装"}</strong>{":\n                        パラメータ検証、エラー処理、冪等性を実装\n                    "}</li><li><strong>{"MCPサーバーの提供形態"}</strong></li></ul>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"形態"}</th><th scope="col">{"向く場面"}</th></tr></thead><tbody><tr className="odd"><td><strong>{"Lambda 上のステートレスMCPサーバー"}</strong></td><td>{"軽量・短時間のツール、運用最小、従量課金"}</td></tr><tr className="even"><td><strong>{"Amazon ECS 上のMCPサーバー"}</strong></td><td>{"複雑・長時間・ステートフルなツール"}</td></tr><tr className="odd"><td>{"MCPクライアントライブラリ"}</td><td>{"呼び出し側のアクセスパターンを統一"}</td></tr></tbody></table></div>

    <div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"試験での着眼点"}</div><p>{"\n                            「軽量なツールを手間なく」→ Lambda MCP。「複雑な/常駐が必要なツール」→\n                            ECS MCP。「暴走・過剰権限を防ぐ」→ 停止条件 + IAM境界 +\n                            サーキットブレーカー。\n                        "}</p></div></div>

    <h4>{"7.5 人と協調する(2.1.5)"}</h4>

    <p>{"\n                    Step Functions で「FM案 → 担当者レビュー → 承認で実行」を組み、"}<strong>{"API Gateway"}</strong>{"でフィードバック(承認/修正)を収集。低確信度・高リスクのケースだけ人に回す「"}<strong>{"例外ベース"}</strong>{"」が効率的です(Amazon\n                    Augmented AI(A2I)の人間レビューも選択肢)。\n                "}</p>

    <hr />

    <h3 id="step-8-タスク22-モデルデプロイ戦略" tabIndex={-1}>{"\n                    Step 8. タスク2.2 モデルデプロイ戦略\n                "}</h3>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"スキル"}</th><th scope="col">{"主なサービス/概念"}</th><th scope="col">{"一言ポイント"}</th></tr></thead><tbody><tr className="odd"><td>{"2.2.1 用途別デプロイ"}</td><td>{"\n                                    Lambda(オンデマンド)、Bedrock Provisioned Throughput、SageMaker\n                                    エンドポイント\n                                "}</td><td>{"ハイブリッドも可"}</td></tr><tr className="even"><td>{"2.2.2 LLM特有の課題"}</td><td>{"コンテナ最適化、GPU、トークン処理容量、モデルロード"}</td><td>{"従来MLとの違い"}</td></tr><tr className="odd"><td>{"2.2.3 最適化"}</td><td>{"\n                                    適切なモデル選択、小型モデル、"}<strong>{"モデルカスケード"}</strong></td><td>{"コストと性能のバランス"}</td></tr></tbody></table></div>

    <h4>{"8.1 デプロイ方式の比較"}</h4>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"方式"}</th><th scope="col">{"特徴"}</th><th scope="col">{"向くケース"}</th></tr></thead><tbody><tr className="odd"><td>{"Bedrock オンデマンド(+ Lambda等から呼ぶ)"}</td><td>{"サーバー管理不要、従量課金"}</td><td>{"不定期・変動トラフィック"}</td></tr><tr className="even"><td>{"Bedrock Provisioned Throughput"}</td><td>{"専用容量、安定したスループット"}</td><td>{"大量・安定、カスタムモデル"}</td></tr><tr className="odd"><td>{"SageMaker AI エンドポイント"}</td><td>{"自前モデル・OSSモデル、細かい制御"}</td><td>{"独自モデル、特殊要件"}</td></tr><tr className="even"><td>{"ハイブリッド"}</td><td>{"通常はBedrock、特殊タスクだけSageMaker"}</td><td>{"要件が混在"}</td></tr></tbody></table></div>

    <h4>{"8.2 LLMデプロイが従来MLと違う点"}</h4>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"項目"}</th><th scope="col">{"従来ML"}</th><th scope="col">{"LLM"}</th></tr></thead><tbody><tr className="odd"><td>{"メモリ"}</td><td>{"小さい"}</td><td><strong>{"巨大"}</strong>{"(重み + KVキャッシュ)"}</td></tr><tr className="even"><td>{"計算資源"}</td><td>{"CPU/小型GPUで足りることも"}</td><td><strong>{"GPU必須"}</strong>{"が多い。利用率が重要"}</td></tr><tr className="odd"><td>{"負荷の単位"}</td><td>{"リクエスト数"}</td><td><strong>{"トークン処理量"}</strong>{"(入力/出力)"}</td></tr><tr className="even"><td>{"起動"}</td><td>{"速い"}</td><td>{"\n                                    モデルロードに時間がかかる("}<strong>{"ロード戦略"}</strong>{"が必要)\n                                "}</td></tr></tbody></table></div>

    <h4>{"8.3 モデルカスケード(コスト最適化)"}</h4>

    <Diagram id="chart-17" label="8.3 モデルカスケード(コスト最適化)の図解"/>

    <div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"試験での着眼点"}</div><p>{"\n                            「大半は簡単な質問でコストを下げたい」→\n                            "}<strong>{"カスケード/段階利用"}</strong>{"。「独自のOSSモデルを細かく制御」→\n                            SageMaker。「サーバーレスで最小運用」→ Bedrock オンデマンド。\n                        "}</p></div></div>

    <hr />

    <h3 id="step-9-タスク23-企業統合アーキテクチャ" tabIndex={-1}>{"\n                    Step 9. タスク2.3 企業統合アーキテクチャ\n                "}</h3>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"スキル"}</th><th scope="col">{"主なサービス/概念"}</th><th scope="col">{"一言ポイント"}</th></tr></thead><tbody><tr className="odd"><td>{"2.3.1 企業接続"}</td><td>{"API統合、イベント駆動、データ同期"}</td><td>{"疎結合"}</td></tr><tr className="even"><td>{"2.3.2 既存アプリへのAI追加"}</td><td>{"API Gateway、Lambda(Webhook)、EventBridge"}</td><td>{"マイクロサービス統合"}</td></tr><tr className="odd"><td>{"2.3.3 セキュアアクセス"}</td><td>{"IDフェデレーション、RBAC、最小権限"}</td><td>{"認証・認可"}</td></tr><tr className="even"><td>{"2.3.4 クロス環境"}</td><td>{"Outposts、Wavelength、安全な経路"}</td><td>{"データ主権・コンプライアンス"}</td></tr><tr className="odd"><td>{"2.3.5 CI/CD と GenAIゲートウェイ"}</td><td>{"CodePipeline、CodeBuild、集中ゲートウェイ"}</td><td>{"一元的な制御・観測"}</td></tr></tbody></table></div>

    <h4>{"9.1 イベント駆動の統合"}</h4>

    <Diagram id="chart-18" label="9.1 イベント駆動の統合の図解"/>

    <ul><li><strong>{"疎結合"}</strong>{":\n                        既存システムとGenAI処理をキュー/イベントでつなぎ、片方の障害や遅延を伝播させない\n                    "}</li><li><strong>{"Webhook"}</strong>{": Lambda で受けて GenAI 処理 → 結果を返す"}</li></ul>

    <h4>{"9.2 セキュアアクセス"}</h4>

    <ul><li><strong>{"IDフェデレーション"}</strong>{"(IAM Identity\n                        Center、Cognito)で、企業のIDをAWSアクセスに接続\n                    "}</li><li><strong>{"RBAC"}</strong>{": ロールごとに使えるモデル・データを分ける"}</li><li><strong>{"最小権限"}</strong>{": 例えば特定のモデルID・推論プロファイルだけ\n                        "}<code>{"bedrock:InvokeModel"}</code>{" を許可\n                    "}</li></ul>

    <h4>{"9.3 クロス環境(2.3.4)"}</h4>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"要件"}</th><th scope="col">{"サービス"}</th></tr></thead><tbody><tr className="odd"><td>{"オンプレミスにデータを置きたい/低遅延でクラウドAI"}</td><td><strong>{"AWS Outposts"}</strong></td></tr><tr className="even"><td>{"エッジ(5G等)でAI"}</td><td><strong>{"AWS Wavelength"}</strong></td></tr><tr className="odd"><td>{"安全な接続"}</td><td>{"PrivateLink、VPN/Direct Connect、プライベートルーティング"}</td></tr><tr className="even"><td>{"国をまたぐコンプライアンス"}</td><td>{"\n                                    データの処理場所に配慮(クロスリージョン推論の範囲を地域に限定する等)\n                                "}</td></tr></tbody></table></div>

    <p>{"\n                    クロスリージョン推論には、"}<strong>{"地域内に限定する Geographic"}</strong>{"\n                    と、"}<strong>{"全商用リージョンから最適を選ぶ Global"}</strong>{"\n                    があります。データ処理場所の制約があるなら Geographic を選びます(出典:\n                    "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/geographic-cross-region-inference.html">{"Geographic cross-Region inference"}</a>{")。\n                "}</p>

    <h4>{"9.4 CI/CD と GenAIゲートウェイ(2.3.5)"}</h4>

    <Diagram id="chart-19" label="9.4 CI/CD と GenAIゲートウェイ(2.3.5)の図解"/>

    <p><strong>{"GenAIゲートウェイ"}</strong>{":\n                    全アプリのFM呼び出しを"}<strong>{"中央の抽象化レイヤー"}</strong>{"に集約し、認証、レート制限、ログ、ガードレール適用、モデル切り替え、コスト配賦を一元管理する設計。\n                "}</p>

    <div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"試験での着眼点"}</div><p>{"\n                            「組織全体でFM利用を統制・可視化」→\n                            "}<strong>{"GenAIゲートウェイ(集中抽象化レイヤー)"}</strong>{"。「プロンプト/モデル更新を安全に自動展開」→ CI/CD + 自動評価ゲート +\n                            ロールバック。\n                        "}</p></div></div>

    <hr />

    <h3 id="step-10-タスク24-fm-api統合" tabIndex={-1}>{"Step 10. タスク2.4 FM API統合"}</h3>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"スキル"}</th><th scope="col">{"主なサービス/概念"}</th><th scope="col">{"一言ポイント"}</th></tr></thead><tbody><tr className="odd"><td>{"2.4.1 柔軟な呼び出し"}</td><td>{"Bedrock API(同期)、SDK + SQS(非同期)、API Gateway"}</td><td>{"同期/非同期の使い分け"}</td></tr><tr className="even"><td>{"2.4.2 リアルタイム"}</td><td>{"ストリーミングAPI、WebSocket、SSE"}</td><td>{"体感速度の向上"}</td></tr><tr className="odd"><td>{"2.4.3 耐障害性"}</td><td>{"指数バックオフ、レート制限、フォールバック、X-Ray"}</td><td>{"再試行設計"}</td></tr><tr className="even"><td>{"2.4.4 モデルルーティング"}</td><td>{"静的、コンテンツベース、メトリクスベース"}</td><td>{"最適モデル選択"}</td></tr></tbody></table></div>

    <h4>{"10.1 同期 vs 非同期 vs ストリーミング"}</h4>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"方式"}</th><th scope="col">{"使いどころ"}</th><th scope="col">{"実装"}</th></tr></thead><tbody><tr className="odd"><td>{"同期"}</td><td>{"短い応答、即時結果"}</td><td>{"Converse / InvokeModel"}</td></tr><tr className="even"><td><strong>{"非同期"}</strong></td><td>{"長時間処理、バースト吸収"}</td><td>{"SQS + ワーカー(Lambda/ECS)、結果は通知/ポーリング"}</td></tr><tr className="odd"><td><strong>{"ストリーミング"}</strong></td><td>{"チャットUI(最初のトークンを速く見せる)"}</td><td>{"\n                                    ConverseStream / InvokeModelWithResponseStream + WebSocket/SSE\n                                "}</td></tr></tbody></table></div>

    <Diagram id="chart-20" label="10.1 同期 vs 非同期 vs ストリーミングの図解"/>

    <p>{"\n                    注意: API Gateway\n                    のタイムアウトやペイロード上限、ストリーミング対応の可否は"}<strong>{"種別(REST/HTTP/WebSocket)や時期で異なる"}</strong>{"ため、設計時に最新の公式仕様を確認してください。長時間処理は非同期化が基本です。\n                "}</p>

    <h4>{"10.2 耐障害性(2.4.3)"}</h4>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"例外/状況"}</th><th scope="col">{"対処"}</th></tr></thead><tbody><tr className="odd"><td>{"スロットリング(429相当)"}</td><td><strong>{"指数バックオフ + ジッタ"}</strong>{"で再試行。SDKの再試行設定を活用\n                                "}</td></tr><tr className="even"><td>{"タイムアウト"}</td><td>{"タイムアウト値の調整、非同期化、再試行"}</td></tr><tr className="odd"><td>{"入力不正(Validation)"}</td><td>{"再試行しても直らない → リクエスト修正"}</td></tr><tr className="even"><td>{"サービス利用不可"}</td><td>{"フォールバックモデル/リージョン"}</td></tr><tr className="odd"><td>{"過負荷防止"}</td><td>{"\n                                    API Gateway\n                                    の"}<strong>{"使用量プラン/スロットリング"}</strong>{"でクライアント単位に制限\n                                "}</td></tr><tr className="even"><td>{"可視化"}</td><td><strong>{"X-Ray"}</strong>{"でサービス境界をまたいだ遅延・エラーを追跡\n                                "}</td></tr></tbody></table></div>

    <p><strong>{"重要"}</strong>{":\n                    再試行は"}<strong>{"冪等な処理だけ"}</strong>{"に。ツール呼び出しを含むエージェントでは二重実行に注意。\n                "}</p>

    <h4>{"10.3 モデルルーティング(2.4.4)"}</h4>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"方式"}</th><th scope="col">{"内容"}</th><th scope="col">{"実装"}</th></tr></thead><tbody><tr className="odd"><td>{"静的"}</td><td>{"用途ごとに固定のモデル"}</td><td>{"アプリ設定"}</td></tr><tr className="even"><td>{"コンテンツベース"}</td><td>{"質問の種類で振り分け(コード、要約、画像)"}</td><td>{"Step Functions の Choice + 分類"}</td></tr><tr className="odd"><td>{"メトリクスベース"}</td><td>{"遅延・エラー・コストで動的に選択"}</td><td>{"監視指標 + ルーター"}</td></tr><tr className="even"><td>{"マネージド"}</td><td>{"\n                                    Bedrock の"}<strong>{"Intelligent Prompt Routing"}</strong>{"(同一モデルファミリー内で品質とコストのバランスを取って自動ルーティング)\n                                "}</td><td>{"設定で有効化"}</td></tr></tbody></table></div>

    <hr />

    <h3 id="step-11-タスク25-統合パターンと開発ツール" tabIndex={-1}>{"\n                    Step 11. タスク2.5 統合パターンと開発ツール\n                "}</h3>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"スキル"}</th><th scope="col">{"主なサービス/概念"}</th><th scope="col">{"一言ポイント"}</th></tr></thead><tbody><tr className="odd"><td>{"2.5.1 FM向けAPI"}</td><td>{"API Gateway(ストリーミング、トークン上限、再試行)"}</td><td>{"GenAI向けAPI設計"}</td></tr><tr className="even"><td>{"2.5.2 アクセスしやすいUI"}</td><td>{"AWS Amplify、OpenAPI、Prompt Flows"}</td><td>{"UI・API・ノーコード"}</td></tr><tr className="odd"><td>{"2.5.3 業務システム強化"}</td><td>{"\n                                    Lambda(CRM)、Step Functions(文書処理)、"}<strong>{"Bedrock Data Automation"}</strong></td><td>{"業務自動化"}</td></tr><tr className="even"><td>{"2.5.4 開発者生産性"}</td><td><strong>{"Amazon Q Developer"}</strong>{"(コード生成・リファクタ)"}</td><td>{"開発の高速化"}</td></tr><tr className="odd"><td>{"2.5.5 高度なGenAIアプリ"}</td><td>{"Strands、Agent Squad、Step Functions、プロンプトチェーン"}</td><td>{"オーケストレーション"}</td></tr><tr className="even"><td>{"2.5.6 トラブルシュート効率"}</td><td>{"CloudWatch Logs Insights、X-Ray、Q Developer"}</td><td>{"プロンプト/応答の分析"}</td></tr></tbody></table></div>

    <ul><li><strong>{"OpenAPI(API-first)"}</strong>{": API仕様を先に定義 →\n                        クライアント/サーバーを並行開発し、ツール定義(エージェントのアクショングループ)にも流用できる\n                    "}</li><li><strong>{"Bedrock Data Automation"}</strong>{":\n                        文書・画像・音声・動画から"}<strong>{"構造化情報を自動抽出"}</strong>{"するマネージド機能。請求書処理などに有効\n                    "}</li><li><strong>{"Step Functions で文書処理"}</strong>{": 抽出 → 検証 → FM要約 → 人手確認\n                        → 登録 のように段階を制御\n                    "}</li><li><strong>{"CloudWatch Logs Insights"}</strong>{":\n                        モデル呼び出しログ(プロンプト/応答/トークン)をクエリして異常パターンを分析\n                    "}</li></ul>

    <div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"試験での着眼点"}</div><p>{"\n                            「文書から構造化データを自動抽出」→\n                            "}<strong>{"Bedrock Data Automation"}</strong>{"(または Textract +\n                            FM)。「コード生成・リファクタで生産性」→\n                            "}<strong>{"Q Developer"}</strong>{"。「呼び出しの遅延原因をサービス横断で追跡」→ "}<strong>{"X-Ray"}</strong>{"。\n                        "}</p></div></div>

    <hr />

    </div>;
}
