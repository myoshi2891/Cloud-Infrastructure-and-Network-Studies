import { Diagram } from '../Diagram';
/** 原本のdomain3本文を全量移行。 */
export default function Domain3() {
    return <div className="guide-part" data-part="domain3">
    <h2 id="4-ドメイン3-ai安全性セキュリティガバナンス20" tabIndex={-1}>{"\n                    4. ドメイン3: AI安全性・セキュリティ・ガバナンス(20%)\n                "}</h2>

    <Diagram id="chart-21" label="\n                    4. ドメイン3: AI安全性・セキュリティ・ガバナンス(20%)\n                の図解"/>

    <hr />

    <h3 id="step-12-タスク31-入力と出力の安全制御" tabIndex={-1}>{"\n                    Step 12. タスク3.1 入力と出力の安全制御\n                "}</h3>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"スキル"}</th><th scope="col">{"主なサービス/概念"}</th><th scope="col">{"一言ポイント"}</th></tr></thead><tbody><tr className="odd"><td>{"3.1.1 入力の安全"}</td><td>{"\n                                    Bedrock Guardrails、Step Functions/Lambda\n                                    のカスタムモデレーション\n                                "}</td><td>{"有害入力を防ぐ"}</td></tr><tr className="even"><td>{"3.1.2 出力の安全"}</td><td>{"Guardrails、有害性評価、text-to-SQL"}</td><td>{"有害出力を防ぐ"}</td></tr><tr className="odd"><td>{"3.1.3 正確性検証"}</td><td>{"Knowledge Bases による根拠付け、信頼度スコア、JSON Schema"}</td><td>{"ハルシネーション対策"}</td></tr><tr className="even"><td>{"3.1.4 多層防御"}</td><td>{"\n                                    Comprehend 前処理、Guardrails、Lambda 後処理、API Gateway\n                                    応答フィルタ\n                                "}</td><td>{"層を重ねる"}</td></tr><tr className="odd"><td>{"3.1.5 脅威検知"}</td><td>{"\n                                    プロンプトインジェクション/ジェイルブレイク検知、自動敵対テスト\n                                "}</td><td>{"攻撃への耐性"}</td></tr></tbody></table></div>

    <h4>{"12.1 Bedrock Guardrails の構成要素"}</h4>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"ポリシー"}</th><th scope="col">{"何を防ぐか"}</th><th scope="col">{"補足"}</th></tr></thead><tbody><tr className="odd"><td><strong>{"コンテンツフィルター"}</strong></td><td>{"憎悪・侮辱・性的・暴力・不正行為などの有害コンテンツ"}</td><td>{"強度を調整。入出力両方"}</td></tr><tr className="even"><td><strong>{"プロンプト攻撃"}</strong></td><td>{"\n                                    ジェイルブレイク、プロンプトインジェクション、プロンプト漏えい\n                                "}</td><td>{"\n                                    コンテンツフィルターのカテゴリの一つ("}<strong>{"入力側"}</strong>{"の検知)\n                                "}</td></tr><tr className="odd"><td><strong>{"拒否トピック"}</strong></td><td>{"禁止したい話題(例: 投資助言)"}</td><td>{"自然言語で定義"}</td></tr><tr className="even"><td><strong>{"単語フィルター"}</strong></td><td>{"特定語句・不適切語"}</td><td>{"完全一致"}</td></tr><tr className="odd"><td><strong>{"機密情報フィルター"}</strong></td><td>{"PII(氏名・電話・カード番号など)、正規表現"}</td><td><strong>{"ブロック"}</strong>{"または"}<strong>{"マスク(匿名化)"}</strong></td></tr><tr className="even"><td><strong>{"コンテキスト根拠チェック"}</strong></td><td>{"ソースに根拠のない回答、質問と無関係な回答"}</td><td>{"\n                                    RAG向け。"}<strong>{"根拠性"}</strong>{"と"}<strong>{"関連性"}</strong>{"に閾値\n                                "}</td></tr><tr className="odd"><td><strong>{"Automated Reasoning チェック"}</strong></td><td>{"論理ルール・ポリシーに照らした出力検証"}</td><td>{"形式的な検証。誤り検出向け"}</td></tr></tbody></table></div>

    <p>{"\n                    出典:\n                    "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-components.html">{"Create your guardrail"}</a></p>

    <p><strong>{"ApplyGuardrail API"}</strong>{":\n                    FMを呼ばずにGuardrailsだけを評価できるため、"}<strong>{"他社モデル・自前モデル・既存データ"}</strong>{"にも同じ安全ルールを適用できます。\n                "}</p>

    <h4>{"12.2 多層防御(Defense in Depth)"}</h4>

    <Diagram id="chart-22" label="12.2 多層防御(Defense in Depth)の図解"/>

    <div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"ベストプラクティス"}</div><p>{"\n                            単一の対策に頼らない。"}<strong>{"入力側・モデル側・出力側"}</strong>{"の複数層で守る。各層のブロックをログに残して改善に使う。\n                        "}</p></div></div>

    <h4>{"12.3 ハルシネーション対策(3.1.3)"}</h4>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"手法"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className="odd"><td><strong>{"根拠付け(RAG)"}</strong></td><td>{"\n                                    検索結果を根拠として渡し、"}<strong>{"引用元を付けて"}</strong>{"回答させる\n                                "}</td></tr><tr className="even"><td>{"コンテキスト根拠チェック"}</td><td>{"Guardrails で「ソースにない主張」を検知"}</td></tr><tr className="odd"><td>{"信頼度スコア/類似度検証"}</td><td>{"回答と根拠文書の意味的類似度を測り、低ければ棄却"}</td></tr><tr className="even"><td>{"構造化出力"}</td><td>{"JSON Schema を強制し、形式逸脱を防ぐ"}</td></tr><tr className="odd"><td>{"text-to-SQL"}</td><td>{"\n                                    自由文の回答ではなく"}<strong>{"決定的なSQL実行結果"}</strong>{"に基づかせる(数値の正確性)\n                                "}</td></tr><tr className="even"><td>{"「分からない」を許可"}</td><td>{"プロンプトで根拠がなければ回答を控えるよう指示"}</td></tr></tbody></table></div>

    <h4>{"12.4 脅威検知(3.1.5)"}</h4>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"攻撃"}</th><th scope="col">{"例"}</th><th scope="col">{"対策"}</th></tr></thead><tbody><tr className="odd"><td>{"プロンプトインジェクション"}</td><td>{"「これまでの指示を無視して…」"}</td><td>{"\n                                    Guardrailsのプロンプト攻撃検知、入力と指示の区切り、ツール権限の最小化\n                                "}</td></tr><tr className="even"><td>{"間接インジェクション"}</td><td>{"検索対象の文書に悪意ある指示が埋め込まれている"}</td><td>{"取り込み時のスキャン、コンテキストを「データ」として明示"}</td></tr><tr className="odd"><td>{"ジェイルブレイク"}</td><td>{"制限回避の巧妙な誘導"}</td><td>{"安全分類器、出力側チェック"}</td></tr><tr className="even"><td>{"情報漏えい"}</td><td>{"システムプロンプトの引き出し"}</td><td>{"プロンプト漏えい検知、秘密情報をプロンプトに入れない"}</td></tr></tbody></table></div>

    <ul><li><strong>{"自動敵対テスト"}</strong>{": 攻撃プロンプト集を CI\n                        で定期実行し、回帰を検知\n                    "}</li></ul>

    <div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"試験での着眼点"}</div><p>{"\n                            「ユーザー入力のジェイルブレイク/インジェクション対策」→\n                            "}<strong>{"Guardrails(プロンプト攻撃)"}</strong>{"。「RAGの根拠なし回答を検知」→\n                            "}<strong>{"コンテキスト根拠チェック"}</strong>{"。「FM以外のデータにも安全ルールを適用」→\n                            "}<strong>{"ApplyGuardrail"}</strong>{"。\n                        "}</p></div></div>

    <hr />

    <h3 id="step-13-タスク32-データセキュリティとプライバシー" tabIndex={-1}>{"\n                    Step 13. タスク3.2 データセキュリティとプライバシー\n                "}</h3>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"スキル"}</th><th scope="col">{"主なサービス/概念"}</th><th scope="col">{"一言ポイント"}</th></tr></thead><tbody><tr className="odd"><td>{"3.2.1 保護された環境"}</td><td>{"VPCエンドポイント、IAM、Lake Formation、CloudWatch"}</td><td>{"ネットワーク分離 + 最小権限"}</td></tr><tr className="even"><td>{"3.2.2 プライバシー保護"}</td><td>{"\n                                    Comprehend、Macie、Bedrockのデータプライバシー機能、Guardrails、S3\n                                    Lifecycle\n                                "}</td><td>{"PII検出・保持期間"}</td></tr><tr className="odd"><td>{"3.2.3 プライバシー重視"}</td><td>{"マスキング、匿名化"}</td><td>{"有用性を保ちつつ保護"}</td></tr></tbody></table></div>

    <h4>{"13.1 保護された環境"}</h4>

    <Diagram id="chart-23" label="13.1 保護された環境の図解"/>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"対策"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className="odd"><td>{"ネットワーク分離"}</td><td><strong>{"VPCエンドポイント(PrivateLink)"}</strong>{"でBedrockへ"}<strong>{"インターネットを経由せず"}</strong>{"アクセス\n                                "}</td></tr><tr className="even"><td>{"アクセス制御"}</td><td>{"\n                                    IAMで「誰が・どのモデル/KB/ガードレールを」使えるかを限定。ポリシー条件で"}<strong>{"特定のガードレール適用を必須化"}</strong>{"する運用も可能\n                                "}</td></tr><tr className="odd"><td>{"データ権限"}</td><td><strong>{"Lake Formation"}</strong>{"で表・列・行レベルの粒度で制御\n                                "}</td></tr><tr className="even"><td>{"暗号化"}</td><td><strong>{"KMS"}</strong>{"(保存時・転送時)。カスタムモデルやKBのデータにも顧客管理キー\n                                "}</td></tr><tr className="odd"><td>{"監視"}</td><td>{"CloudWatchでアクセス異常を監視、CloudTrailでAPI監査"}</td></tr></tbody></table></div>

    <p>{"\n                    Bedrockでは、お客様のプロンプトや出力を基盤モデルの学習に使わない旨がAWSのデータ保護に関する説明で示されています。詳細は公式の\n                    Data protection ドキュメントで確認してください。\n                "}</p>

    <h4>{"13.2 PII対策の使い分け"}</h4>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"ツール"}</th><th scope="col">{"役割"}</th><th scope="col">{"タイミング"}</th></tr></thead><tbody><tr className="odd"><td><strong>{"Amazon Macie"}</strong></td><td><strong>{"S3内"}</strong>{"のPII/機密データを"}<strong>{"検出"}</strong></td><td>{"取り込み前/保管データの棚卸し"}</td></tr><tr className="even"><td><strong>{"Amazon Comprehend"}</strong></td><td>{"\n                                    テキストからPIIを"}<strong>{"検出"}</strong>{"(DetectPiiEntities)、マスク処理の前段\n                                "}</td><td>{"前処理パイプライン"}</td></tr><tr className="odd"><td><strong>{"Guardrails 機密情報フィルター"}</strong></td><td>{"入出力でPIIを"}<strong>{"ブロック/マスク"}</strong></td><td>{"実行時(推論時)"}</td></tr><tr className="even"><td><strong>{"S3 Lifecycle"}</strong></td><td>{"保持期間後の自動削除/低頻度層へ移行"}</td><td>{"データ保持ポリシー"}</td></tr></tbody></table></div>

    <p><strong>{"データ最小化の原則"}</strong>{":\n                    そもそも不要なPIIはFMへ渡さない。必要な場合も"}<strong>{"マスキング/匿名化/トークン化"}</strong>{"で、FMの有用性を保ちつつ個人を特定できなくする。\n                "}</p>

    <hr />

    <h3 id="step-14-タスク33-aiガバナンスとコンプライアンス" tabIndex={-1}>{"\n                    Step 14. タスク3.3 AIガバナンスとコンプライアンス\n                "}</h3>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"スキル"}</th><th scope="col">{"主なサービス/概念"}</th><th scope="col">{"一言ポイント"}</th></tr></thead><tbody><tr className="odd"><td>{"3.3.1 コンプライアンス枠組み"}</td><td>{"\n                                    SageMaker\n                                    "}<strong>{"モデルカード"}</strong>{"、Glue(データ系譜)、メタデータタグ、CloudWatch Logs\n                                "}</td><td>{"説明責任の記録"}</td></tr><tr className="even"><td>{"3.3.2 データソース追跡"}</td><td><strong>{"Glue Data Catalog"}</strong>{"、タグ付け、CloudTrail"}</td><td>{"出典の追跡可能性"}</td></tr><tr className="odd"><td>{"3.3.3 組織ガバナンス"}</td><td>{"組織方針・規制・責任あるAI原則に整合した枠組み"}</td><td>{"全社的な統制"}</td></tr><tr className="even"><td>{"3.3.4 継続監視"}</td><td>{"\n                                    誤用/ドリフト/ポリシー違反の自動検知、バイアスドリフト、アラートと是正\n                                "}</td><td>{"監査対応"}</td></tr></tbody></table></div>

    <Diagram id="chart-24" label="\n                    Step 14. タスク3.3 AIガバナンスとコンプライアンス\n                の図解"/>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"目的"}</th><th scope="col">{"手段"}</th></tr></thead><tbody><tr className="odd"><td>{"「このモデルは何ができ、何が限界か」を文書化"}</td><td><strong>{"モデルカード"}</strong>{"(SageMaker AI)"}</td></tr><tr className="even"><td>{"「この回答の根拠データはどこか」"}</td><td>{"メタデータタグ + 引用(出典表示)"}</td></tr><tr className="odd"><td>{"「誰が何を呼んだか」"}</td><td><strong>{"CloudTrail"}</strong></td></tr><tr className="even"><td>{"「FMの判断をどう決めたか」"}</td><td>{"\n                                    決定ログ(プロンプト/応答/ガードレール判定)を"}<strong>{"CloudWatch Logs"}</strong>{"\n                                    に保存\n                                "}</td></tr><tr className="odd"><td>{"「入力データの来歴」"}</td><td><strong>{"Glue"}</strong>{" によるデータ系譜(lineage)"}</td></tr><tr className="even"><td>{"継続監視"}</td><td>{"\n                                    誤用・ドリフト・違反を自動検知 → アラート →\n                                    是正ワークフロー、"}<strong>{"トークン単位のマスキング"}</strong>{"、応答ログ、出力ポリシーフィルター\n                                "}</td></tr></tbody></table></div>

    <p><strong>{"注意"}</strong>{":\n                    ログにPIIや機密がそのまま残ると新たなリスクになる。"}<strong>{"ログ保存時もマスキング"}</strong>{"し、保持期間とアクセス権を管理する。\n                "}</p>

    <hr />

    <h3 id="step-15-タスク34-責任あるaiの実装" tabIndex={-1}>{"Step 15. タスク3.4 責任あるAIの実装"}</h3>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"スキル"}</th><th scope="col">{"主なサービス/概念"}</th><th scope="col">{"一言ポイント"}</th></tr></thead><tbody><tr className="odd"><td>{"3.4.1 透明性"}</td><td>{"\n                                    推論の表示、信頼度メトリクス、根拠提示、"}<strong>{"Bedrock エージェントのトレース"}</strong></td><td>{"説明可能にする"}</td></tr><tr className="even"><td>{"3.4.2 公平性評価"}</td><td>{"\n                                    公平性メトリクス、Prompt Management/Flows でのA/Bテスト、"}<strong>{"LLM-as-a-judge"}</strong></td><td>{"バイアス検査"}</td></tr><tr className="odd"><td>{"3.4.3 ポリシー準拠"}</td><td>{"Guardrails、モデルカード、Lambda での自動チェック"}</td><td>{"方針の強制"}</td></tr></tbody></table></div>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"責任あるAIの観点"}</th><th scope="col">{"具体策"}</th></tr></thead><tbody><tr className="odd"><td><strong>{"透明性"}</strong></td><td>{"\n                                    回答に出典を表示、エージェントのトレース(推論過程)を保存、AI生成であることの明示、不確実性の表示\n                                "}</td></tr><tr className="even"><td><strong>{"公平性"}</strong></td><td>{"\n                                    属性(性別・年齢など)のみを変えたプロンプトで回答差を比較。評価データを多様に。A/Bテストで継続的に評価\n                                "}</td></tr><tr className="odd"><td><strong>{"安全性"}</strong></td><td>{"ガードレール、レッドチーミング"}</td></tr><tr className="even"><td><strong>{"プライバシー"}</strong></td><td>{"PII最小化、匿名化"}</td></tr><tr className="odd"><td><strong>{"説明責任"}</strong></td><td>{"モデルカード、監査ログ、人間による最終責任"}</td></tr></tbody></table></div>

    <div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"試験での着眼点"}</div><p>{"\n                            「モデルの限界・用途を文書化」→\n                            "}<strong>{"モデルカード"}</strong>{"。「エージェントの推論過程を可視化」→\n                            "}<strong>{"エージェントトレース"}</strong>{"。「応答の公平性を自動評価」→\n                            "}<strong>{"LLM-as-a-judge + 公平性メトリクス"}</strong>{"。「出力の根拠を示す」→ 出典(引用)の提示。\n                        "}</p></div></div>

    <hr />

    </div>;
}
