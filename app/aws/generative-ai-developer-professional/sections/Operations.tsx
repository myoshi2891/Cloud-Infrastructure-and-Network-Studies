import { Diagram } from '../Diagram';
/** 原本のoperations本文を全量移行。 */
export default function Operations() {
    return <div className="guide-part" data-part="operations">
    <h2 id="5-ドメイン4-運用効率と最適化12" tabIndex={-1}>{"5. ドメイン4: 運用効率と最適化(12%)"}</h2>

    <Diagram id="chart-25" label="5. ドメイン4: 運用効率と最適化(12%)の図解"/>

    <hr />

    <h3 id="step-16-タスク41-コスト最適化とリソース効率" tabIndex={-1}>{"\n                    Step 16. タスク4.1 コスト最適化とリソース効率\n                "}</h3>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"スキル"}</th><th scope="col">{"主な手法"}</th><th scope="col">{"一言ポイント"}</th></tr></thead><tbody><tr className="odd"><td>{"4.1.1 トークン効率"}</td><td>{"\n                                    トークン見積り/追跡、コンテキスト最適化、プロンプト圧縮、剪定、応答長制限\n                                "}</td><td><strong>{"トークン = お金"}</strong></td></tr><tr className="even"><td>{"4.1.2 コスト効率の良いモデル選択"}</td><td>{"段階利用、価格性能比"}</td><td>{"簡単なタスクは小型モデル"}</td></tr><tr className="odd"><td>{"4.1.3 高性能・高稼働"}</td><td>{"\n                                    バッチ処理、キャパシティ計画、オートスケール、Provisioned\n                                    Throughput最適化\n                                "}</td><td>{"使い切る"}</td></tr><tr className="even"><td>{"4.1.4 キャッシュ"}</td><td>{"\n                                    セマンティックキャッシュ、プロンプトキャッシュ、リクエストハッシュ、エッジ\n                                "}</td><td>{"呼ばない = 最も安い"}</td></tr></tbody></table></div>

    <h4>{"16.1 コストの構造"}</h4>

    <Diagram id="chart-26" label="16.1 コストの構造の図解"/>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"施策"}</th><th scope="col">{"効果"}</th><th scope="col">{"注意"}</th></tr></thead><tbody><tr className="odd"><td><code>{"maxTokens"}</code>{" 設定"}</td><td>{"出力の暴走を防ぐ"}</td><td>{"小さすぎると途中で切れる("}<code>{"stopReason"}</code>{" を確認)"}</td></tr><tr className="even"><td>{"履歴の要約・剪定"}</td><td>{"入力トークン削減"}</td><td>{"重要情報の欠落に注意"}</td></tr><tr className="odd"><td>{"検索件数/チャンクの調整"}</td><td>{"入力トークン削減"}</td><td>{"減らしすぎると精度低下"}</td></tr><tr className="even"><td>{"小型モデルの活用"}</td><td>{"単価削減"}</td><td>{"評価で品質を確認"}</td></tr><tr className="odd"><td>{"バッチ推論"}</td><td>{"非同期処理でオンデマンドより割安(公式に割引あり)"}</td><td>{"リアルタイム要件には不向き"}</td></tr><tr className="even"><td>{"タグ付け"}</td><td><strong>{"アプリケーション推論プロファイル + コスト配分タグ"}</strong>{"で用途別にコスト可視化\n                                "}</td><td>{"事前にプロファイル設計が必要"}</td></tr></tbody></table></div>

    <h4>{"16.2 キャッシュの3種類(4.1.4)— 混同しやすい"}</h4>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"種類"}</th><th scope="col">{"仕組み"}</th><th scope="col">{"効果"}</th><th scope="col">{"向くケース"}</th></tr></thead><tbody><tr className="odd"><td><strong>{"プロンプトキャッシュ(Bedrock機能)"}</strong></td><td>{"\n                                    長い共通プレフィックス(システムプロンプト、長文書)の処理結果を"}<strong>{"キャッシュ"}</strong>{"し、後続リクエストで再利用\n                                "}</td><td><strong>{"コストとレイテンシ"}</strong>{"を削減(AWSは最大で大幅削減としている)\n                                "}</td><td>{"\n                                    同じ長い文脈に何度も質問(文書Q&A、長いシステムプロンプト)\n                                "}</td></tr><tr className="even"><td><strong>{"セマンティックキャッシュ(自前実装)"}</strong></td><td>{"\n                                    質問の"}<strong>{"意味が近い"}</strong>{"過去の回答を"}<strong>{"ベクトル検索で再利用"}</strong>{"(例:\n                                    ElastiCache/OpenSearch)\n                                "}</td><td>{"FM呼び出し自体を省略"}</td><td>{"FAQなど似た質問が多い"}</td></tr><tr className="odd"><td><strong>{"完全一致キャッシュ(リクエストハッシュ)"}</strong></td><td>{"\n                                    入力のハッシュが同一なら保存結果を返す(DynamoDB/ElastiCache)\n                                "}</td><td>{"FM呼び出しを省略"}</td><td>{"決定的な入力の繰り返し"}</td></tr><tr className="even"><td>{"エッジキャッシュ"}</td><td>{"CloudFront 等で応答を配信"}</td><td>{"配信遅延削減"}</td><td>{"公開コンテンツ"}</td></tr></tbody></table></div>

    <Diagram id="chart-27" label="16.2 キャッシュの3種類(4.1.4)— 混同しやすいの図解"/>

    <div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"試験の定番"}</div><p>{"\n                            「同じ長い文書に対し何度も質問」→\n                            "}<strong>{"プロンプトキャッシュ"}</strong>{"。「似た質問が多い」→\n                            "}<strong>{"セマンティックキャッシュ"}</strong>{"。"}<strong>{"セマンティックキャッシュは古い回答を返すリスク"}</strong>{"があるため、TTLと閾値を設計する。\n                        "}</p></div></div>

    <div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"ベストプラクティス"}</div><p>{"\n                            コスト最適化は「"}<strong>{"測る → 削る → 品質を再評価"}</strong>{"」のループ。品質低下を伴うコスト削減は禁物。\n                        "}</p></div></div>

    <hr />

    <h3 id="step-17-タスク42-アプリケーション性能の最適化" tabIndex={-1}>{"\n                    Step 17. タスク4.2 アプリケーション性能の最適化\n                "}</h3>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"スキル"}</th><th scope="col">{"主な手法"}</th><th scope="col">{"一言ポイント"}</th></tr></thead><tbody><tr className="odd"><td>{"4.2.1 応答性"}</td><td>{"\n                                    事前計算、低遅延モデル、並列リクエスト、"}<strong>{"ストリーミング"}</strong></td><td>{"体感速度"}</td></tr><tr className="even"><td>{"4.2.2 検索性能"}</td><td>{"インデックス最適化、クエリ前処理、ハイブリッド検索"}</td><td>{"RAGの遅延・精度"}</td></tr><tr className="odd"><td>{"4.2.3 スループット"}</td><td>{"トークン処理最適化、バッチ推論、並行呼び出し管理"}</td><td>{"処理量"}</td></tr><tr className="even"><td>{"4.2.4 FM性能チューニング"}</td><td>{"モデル固有パラメータ、A/Bテスト、温度/top-k/top-p"}</td><td>{"出力特性"}</td></tr><tr className="odd"><td>{"4.2.5 リソース配分"}</td><td>{"トークン処理量のキャパシティ計画、オートスケール"}</td><td>{"GenAI特有の負荷"}</td></tr><tr className="even"><td>{"4.2.6 全体最適"}</td><td>{"\n                                    API呼び出しのプロファイリング、ベクトルDBクエリ最適化、通信効率\n                                "}</td><td>{"ボトルネック特定"}</td></tr></tbody></table></div>

    <h4>{"17.1 遅延を分解して考える"}</h4>

    <Diagram id="chart-28" label="17.1 遅延を分解して考えるの図解"/>

    <ul><li>{"\n                        どこが遅いかを\n                        "}<strong>{"X-Ray / CloudWatch"}</strong>{" で計測してから最適化(推測で触らない)\n                    "}</li><li><strong>{"並列化"}</strong>{":\n                        互いに依存しない処理(複数検索、複数ツール呼び出し)は並列に\n                    "}</li><li><strong>{"ストリーミング"}</strong>{":\n                        総時間が同じでも、最初の文字が早く出て体感が改善\n                    "}</li><li><strong>{"事前計算"}</strong>{": 予測できる質問(定型レポート等)は先に生成しておく\n                    "}</li></ul>

    <h4>{"17.2 推論パラメータの考え方(4.2.4)"}</h4>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"パラメータ"}</th><th scope="col">{"意味"}</th><th scope="col">{"使い分け"}</th></tr></thead><tbody><tr className="odd"><td><strong>{"temperature"}</strong></td><td>{"出力のランダム性。低い=決定的、高い=多様"}</td><td>{"\n                                    事実回答・抽出・分類 → "}<strong>{"低"}</strong>{"、創作・ブレスト → 高\n                                "}</td></tr><tr className="even"><td><strong>{"top-p"}</strong></td><td>{"確率の累積が p に達するまでの候補から選ぶ"}</td><td>{"低いほど保守的"}</td></tr><tr className="odd"><td><strong>{"top-k"}</strong></td><td>{"上位k個の候補から選ぶ"}</td><td>{"小さいほど保守的"}</td></tr><tr className="even"><td><strong>{"maxTokens"}</strong></td><td>{"出力上限"}</td><td>{"コスト・遅延・切れの制御"}</td></tr><tr className="odd"><td><strong>{"stopSequences"}</strong></td><td>{"生成を止める文字列"}</td><td>{"形式制御"}</td></tr></tbody></table></div>

    <div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"ベストプラクティス"}</div><p>{"\n                            temperature と top-p\n                            は"}<strong>{"同時に大きく動かさず"}</strong>{"、片方ずつ調整して"}<strong>{"A/Bテスト"}</strong>{"で効果を確認する。\n                        "}</p></div></div>

    <h4>{"17.3 スループットとキャパシティ"}</h4>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"課題"}</th><th scope="col">{"対策"}</th></tr></thead><tbody><tr className="odd"><td>{"スロットリング(TPM/RPM超過)"}</td><td>{"\n                                    クロスリージョン推論、Provisioned\n                                    Throughput、再試行、キュー平準化\n                                "}</td></tr><tr className="even"><td>{"大量バッチ"}</td><td><strong>{"バッチ推論"}</strong>{"、並行度の管理"}</td></tr><tr className="odd"><td>{"負荷の見積り"}</td><td><strong>{"トークン"}</strong>{"ベースで計画(リクエスト数ではなく入出力トークンのパターン)\n                                "}</td></tr><tr className="even"><td>{"スケール"}</td><td>{"オートスケール設定をGenAIのトラフィック特性に合わせる"}</td></tr></tbody></table></div>

    <hr />

    <h3 id="step-18-タスク43-genaiアプリの監視" tabIndex={-1}>{"\n                    Step 18. タスク4.3 GenAIアプリの監視\n                "}</h3>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"スキル"}</th><th scope="col">{"主な手法"}</th><th scope="col">{"一言ポイント"}</th></tr></thead><tbody><tr className="odd"><td>{"4.3.1 包括的オブザーバビリティ"}</td><td>{"\n                                    運用メトリクス、トレース、FM呼び出しトレース、ビジネスメトリクス\n                                "}</td><td>{"全体を可視化"}</td></tr><tr className="even"><td>{"4.3.2 GenAI監視"}</td><td>{"\n                                    CloudWatch(トークン使用量・プロンプト有効性・ハルシネーション率・品質)、異常検知、"}<strong>{"モデル呼び出しログ"}</strong>{"、コスト異常検知\n                                "}</td><td>{"FM特有指標"}</td></tr><tr className="odd"><td>{"4.3.3 統合可視化"}</td><td>{"\n                                    ダッシュボード、コンプライアンス監視、フォレンジック、監査ログ\n                                "}</td><td>{"意思決定に使える形"}</td></tr><tr className="even"><td>{"4.3.4 ツール性能"}</td><td>{"呼び出しパターン追跡、マルチエージェント協調の追跡"}</td><td>{"エージェントの観測"}</td></tr><tr className="odd"><td>{"4.3.5 ベクトルストア運用"}</td><td>{"性能監視、インデックス最適化、データ品質検証"}</td><td>{"RAG基盤の健全性"}</td></tr><tr className="even"><td>{"4.3.6 FM特有のトラブルシュート"}</td><td>{"ゴールデンデータセット、出力差分、推論経路トレース"}</td><td>{"従来MLにない障害"}</td></tr></tbody></table></div>

    <h4>{"18.1 何を監視するか"}</h4>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"層"}</th><th scope="col">{"指標の例"}</th><th scope="col">{"手段"}</th></tr></thead><tbody><tr className="odd"><td>{"インフラ/API"}</td><td>{"\n                                    呼び出し数、"}<strong>{"レイテンシ"}</strong>{"、エラー、スロットリング\n                                "}</td><td>{"CloudWatch メトリクス(Bedrockの標準メトリクス)"}</td></tr><tr className="even"><td><strong>{"トークン"}</strong></td><td>{"入力/出力トークン数、バースト"}</td><td>{"CloudWatch + モデル呼び出しログ"}</td></tr><tr className="odd"><td><strong>{"品質"}</strong></td><td>{"回答関連度、ハルシネーション率、ユーザー評価"}</td><td>{"評価ジョブ + カスタムメトリクス"}</td></tr><tr className="even"><td><strong>{"コスト"}</strong></td><td>{"日別/アプリ別の支出、異常"}</td><td>{"\n                                    Cost Explorer、"}<strong>{"Cost Anomaly Detection"}</strong>{"、コスト配分タグ\n                                "}</td></tr><tr className="odd"><td><strong>{"検索"}</strong></td><td>{"検索遅延、ヒット率、再現率"}</td><td>{"ベクトルDBの監視 + 評価"}</td></tr><tr className="even"><td><strong>{"エージェント/ツール"}</strong></td><td>{"ツール呼び出し回数、失敗率、ループ回数"}</td><td>{"トレース、メトリクス"}</td></tr><tr className="odd"><td><strong>{"セキュリティ/監査"}</strong></td><td>{"ガードレール介入数、PII検出、API操作"}</td><td>{"Guardrailsのトレース、CloudTrail"}</td></tr></tbody></table></div>

    <h4>{"18.2 モデル呼び出しログ(Model Invocation Logging)"}</h4>

    <p>{"\n                    Bedrock\n                    の"}<strong>{"モデル呼び出しログ"}</strong>{"を有効にすると、リクエスト/レスポンスの詳細(入出力、メタデータ、トークン数)を\n                    "}<strong>{"CloudWatch Logs"}</strong>{" または "}<strong>{"S3"}</strong>{" に保存できます。\n                "}</p>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"用途"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className="odd"><td>{"デバッグ・品質分析"}</td><td>{"実際のプロンプトと応答を見て原因分析"}</td></tr><tr className="even"><td>{"監査・フォレンジック"}</td><td>{"「何を聞かれ何を返したか」の証跡"}</td></tr><tr className="odd"><td>{"分析"}</td><td>{"Logs Insights / Athena で集計"}</td></tr></tbody></table></div>

    <p><strong>{"注意(重要)"}</strong>{":\n                    ログにはプロンプトや応答の本文が含まれ得ます。"}<strong>{"PIIや機密の取り扱い"}</strong>{"(暗号化、アクセス制限、保持期間)を必ず設計する。ガードレールでブロックした内容も有効時はログに平文で残る点に注意(出典:\n                    "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-components.html">{"Create your guardrail"}</a>{")。\n                "}</p>

    <h4>{"18.3 GenAI特有の障害モード(4.3.6)"}</h4>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"障害"}</th><th scope="col">{"従来MLとの違い"}</th><th scope="col">{"検知方法"}</th></tr></thead><tbody><tr className="odd"><td>{"ハルシネーション"}</td><td>{"数値の誤差ではなく「もっともらしい嘘」"}</td><td><strong>{"ゴールデンデータセット"}</strong>{"(正解付き質問集)で定期評価、根拠チェック\n                                "}</td></tr><tr className="even"><td>{"応答のばらつき"}</td><td>{"同じ入力で出力が変わる"}</td><td><strong>{"出力差分(diff)"}</strong>{"で一貫性を分析"}</td></tr><tr className="odd"><td>{"推論の誤り"}</td><td>{"結果は出るが論理が破綻"}</td><td><strong>{"推論経路トレース"}</strong>{"で途中ステップを確認"}</td></tr><tr className="even"><td>{"プロンプト/モデル更新による劣化(ドリフト)"}</td><td>{"データドリフトだけでなく挙動ドリフト"}</td><td>{"回帰テスト、応答ドリフト異常検知"}</td></tr><tr className="odd"><td>{"トークン使用量の急増"}</td><td>{"予期しないコスト"}</td><td>{"バースト検知アラーム"}</td></tr></tbody></table></div>

    <Diagram id="chart-29" label="18.3 GenAI特有の障害モード(4.3.6)の図解"/>

    <div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"試験での着眼点"}</div><p>{"\n                            「プロンプトと応答を後から詳しく分析」→\n                            "}<strong>{"モデル呼び出しログ"}</strong>{"。「トークン使用量の急増を検知」→\n                            "}<strong>{"CloudWatch 異常検知"}</strong>{"。「想定外のコスト増」→\n                            "}<strong>{"Cost Anomaly Detection"}</strong>{"。「ハルシネーションを定期検出」→\n                            "}<strong>{"ゴールデンデータセット"}</strong>{"。\n                        "}</p></div></div>

    <hr />

    <h2 id="6-ドメイン5-テスト検証トラブルシューティング11" tabIndex={-1}>{"\n                    6. ドメイン5: テスト・検証・トラブルシューティング(11%)\n                "}</h2>

    <Diagram id="chart-30" label="\n                    6. ドメイン5: テスト・検証・トラブルシューティング(11%)\n                の図解"/>

    <hr />

    <h3 id="step-19-タスク51-genaiの評価システム" tabIndex={-1}>{"\n                    Step 19. タスク5.1 GenAIの評価システム\n                "}</h3>

    <p>{"\n                    従来MLの「精度・F1」だけでは足りません。FMの出力は"}<strong>{"自由文"}</strong>{"なので、「"}<strong>{"何を良いとするか"}</strong>{"」を定義して測る必要があります。\n                "}</p>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"スキル"}</th><th scope="col">{"主な手法"}</th><th scope="col">{"一言ポイント"}</th></tr></thead><tbody><tr className="odd"><td>{"5.1.1 評価フレームワーク"}</td><td>{"関連性、事実正確性、一貫性、流暢性"}</td><td>{"評価軸の定義"}</td></tr><tr className="even"><td>{"5.1.2 モデル評価"}</td><td><strong>{"Bedrock Model Evaluations"}</strong>{"、A/B・カナリアテスト、複数モデル比較、コスト対性能\n                                "}</td><td>{"最適構成の発見"}</td></tr><tr className="odd"><td>{"5.1.3 ユーザー中心評価"}</td><td>{"フィードバックUI、評価、アノテーション"}</td><td>{"実利用の声"}</td></tr><tr className="even"><td>{"5.1.4 品質保証プロセス"}</td><td>{"継続評価、回帰テスト、"}<strong>{"品質ゲート"}</strong></td><td>{"劣化を防ぐ"}</td></tr><tr className="odd"><td>{"5.1.5 多角的評価"}</td><td><strong>{"RAG評価"}</strong>{"、"}<strong>{"LLM-as-a-Judge"}</strong>{"、人手評価\n                                "}</td><td>{"組み合わせる"}</td></tr><tr className="even"><td>{"5.1.6 検索品質テスト"}</td><td>{"関連度スコア、文脈一致、検索遅延"}</td><td>{"RAGの検索側"}</td></tr><tr className="odd"><td>{"5.1.7 エージェント評価"}</td><td>{"タスク完了率、ツール使用の妥当性、推論品質"}</td><td>{"多段階の評価"}</td></tr><tr className="even"><td>{"5.1.8 レポート"}</td><td>{"可視化、自動レポート、モデル比較"}</td><td>{"関係者への説明"}</td></tr><tr className="odd"><td>{"5.1.9 デプロイ検証"}</td><td>{"\n                                    合成ユーザーワークフロー、ハルシネーション率/意味ドリフト検査\n                                "}</td><td>{"更新時の信頼性"}</td></tr></tbody></table></div>

    <h4>{"19.1 評価の3つの方式"}</h4>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"方式"}</th><th scope="col">{"内容"}</th><th scope="col">{"長所"}</th><th scope="col">{"短所"}</th></tr></thead><tbody><tr className="odd"><td><strong>{"自動(プログラム的)評価"}</strong></td><td>{"正解データ・指標(類似度、正確性、有害性など)で自動採点"}</td><td>{"安い・速い・再現性"}</td><td>{"正解のない創造的タスクは難しい"}</td></tr><tr className="even"><td><strong>{"LLM-as-a-Judge"}</strong></td><td>{"別のFMを"}<strong>{"審査員"}</strong>{"として、品質基準で採点"}</td><td>{"人手に近い評価をスケール"}</td><td>{"\n                                    審査員モデルのバイアス・コスト。"}<strong>{"人手で較正"}</strong>{"が望ましい\n                                "}</td></tr><tr className="odd"><td><strong>{"人手評価"}</strong></td><td>{"専門家・ユーザーが評価"}</td><td>{"最も信頼できる"}</td><td>{"高コスト・低速"}</td></tr></tbody></table></div>

    <div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"ベストプラクティス"}</div><p>{"\n                            「自動で広く回し、LLM審査で深掘りし、人手で最終確認・較正」の"}<strong>{"多層評価"}</strong>{"にする。\n                        "}</p></div></div>

    <h4>{"19.2 RAG評価は「検索」と「生成」を分けて測る"}</h4>

    <Diagram id="chart-31" label="19.2 RAG評価は「検索」と「生成」を分けて測るの図解"/>

    <p>{"\n                    Bedrock のRAG評価は「検索のみ」と「検索 +\n                    生成」の評価に対応しています。"}<strong>{"切り分けて原因を特定"}</strong>{"できることが重要です。\n                "}</p>

    <h4>{"19.3 A/Bテストとカナリア"}</h4>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"手法"}</th><th scope="col">{"内容"}</th><th scope="col">{"使いどころ"}</th></tr></thead><tbody><tr className="odd"><td><strong>{"A/Bテスト"}</strong></td><td>{"2つ(以上)の構成(モデル/プロンプト)を同時に比較"}</td><td>{"どちらが良いかをデータで決める"}</td></tr><tr className="even"><td><strong>{"カナリア"}</strong></td><td>{"\n                                    新構成を"}<strong>{"少数ユーザーだけ"}</strong>{"に出し、問題がなければ拡大\n                                "}</td><td>{"安全な展開"}</td></tr><tr className="odd"><td>{"影(シャドウ)テスト"}</td><td>{"本番トラフィックを新構成にも流すが、ユーザーには出さない"}</td><td>{"影響ゼロで比較"}</td></tr></tbody></table></div>

    <p>{"\n                    Prompt Management のバリアントや Prompt Flows、AppConfig\n                    の段階展開で実現できます。\n                "}</p>

    <h4>{"19.4 エージェント評価(5.1.7)"}</h4>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"指標"}</th><th scope="col">{"意味"}</th></tr></thead><tbody><tr className="odd"><td>{"タスク完了率"}</td><td>{"最終目標を達成した割合"}</td></tr><tr className="even"><td>{"ツール選択の正しさ"}</td><td>{"適切なツールを適切な引数で呼んだか"}</td></tr><tr className="odd"><td>{"ステップ効率"}</td><td>{"無駄な反復・ツール呼び出しがないか"}</td></tr><tr className="even"><td>{"推論の質"}</td><td>{"途中の判断が論理的か(トレースで確認)"}</td></tr><tr className="odd"><td>{"安全性"}</td><td>{"許可範囲を逸脱していないか"}</td></tr></tbody></table></div>

    <h4>{"19.5 デプロイ検証と品質ゲート"}</h4>

    <Diagram id="chart-32" label="19.5 デプロイ検証と品質ゲートの図解"/>

    <div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"試験での着眼点"}</div><p>{"\n                            「複数モデルを自社データで比較」→\n                            "}<strong>{"Bedrock Model Evaluations"}</strong>{"。「正解がない自由文を大規模に評価」→\n                            "}<strong>{"LLM-as-a-Judge"}</strong>{"。「更新時の劣化を自動で止める」→\n                            "}<strong>{"回帰テスト + 品質ゲート"}</strong>{"。「本番を模擬して定期チェック」→\n                            "}<strong>{"CloudWatch Synthetics(合成ユーザー)"}</strong>{"。\n                        "}</p></div></div>

    <hr />

    <h3 id="step-20-タスク52-genaiアプリのトラブルシューティング" tabIndex={-1}>{"\n                    Step 20. タスク5.2 GenAIアプリのトラブルシューティング\n                "}</h3>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"スキル"}</th><th scope="col">{"症状"}</th><th scope="col">{"主な手がかり"}</th></tr></thead><tbody><tr className="odd"><td>{"5.2.1 コンテンツ処理"}</td><td>{"入力が途中で切れる、長文が処理できない"}</td><td>{"コンテキストウィンドウ超過、切り捨て"}</td></tr><tr className="even"><td>{"5.2.2 FM統合"}</td><td>{"API呼び出しエラー"}</td><td>{"エラーログ、リクエスト検証、応答解析"}</td></tr><tr className="odd"><td>{"5.2.3 プロンプト問題"}</td><td>{"回答が不安定・的外れ"}</td><td>{"プロンプトテスト、バージョン比較"}</td></tr><tr className="even"><td>{"5.2.4 検索問題"}</td><td>{"関連文書が出てこない"}</td><td>{"埋め込み品質、ドリフト、チャンク"}</td></tr><tr className="odd"><td>{"5.2.5 プロンプト保守"}</td><td>{"変更後に挙動が崩れた"}</td><td>{"テンプレートテスト、スキーマ検証、X-Ray"}</td></tr></tbody></table></div>

    <h4>{"20.1 症状から原因を切り分ける"}</h4>

    <Diagram id="chart-33" label="20.1 症状から原因を切り分けるの図解"/>

    <h4>{"20.2 よくある症状と対処(暗記ではなく理解)"}</h4>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"症状"}</th><th scope="col">{"原因の候補"}</th><th scope="col">{"対処"}</th></tr></thead><tbody><tr className="odd"><td>{"応答が途中で終わる"}</td><td><code>{"maxTokens"}</code>{" 不足("}<code>{"stopReason"}</code>{" が上限到達)\n                                "}</td><td>{"上限を上げる/簡潔化を指示"}</td></tr><tr className="even"><td>{"長い入力でエラー"}</td><td><strong>{"コンテキストウィンドウ超過"}</strong></td><td>{"\n                                    チャンクの動的調整、要約、検索件数削減、より長いコンテキストのモデル\n                                "}</td></tr><tr className="odd"><td>{"429 / ThrottlingException"}</td><td>{"クォータ(RPM/TPM)超過"}</td><td>{"\n                                    指数バックオフ、クロスリージョン推論、Provisioned\n                                    Throughput、クォータ引き上げ申請\n                                "}</td></tr><tr className="even"><td>{"AccessDenied"}</td><td>{"IAM/モデルアクセス/リージョン/SCP"}</td><td>{"権限・モデルアクセス・推論プロファイルの許可を確認"}</td></tr><tr className="odd"><td>{"ValidationException"}</td><td>{"リクエスト形式(モデル固有JSON、パラメータ範囲)"}</td><td>{"形式の確認、Converse API の利用"}</td></tr><tr className="even"><td>{"検索で関連文書が出ない"}</td><td>{"\n                                    チャンクが大きすぎ/小さすぎ、埋め込みモデル不一致、メタデータフィルタ誤り、同期漏れ\n                                "}</td><td>{"再チャンク、再埋め込み、フィルタ確認、同期状況確認"}</td></tr><tr className="odd"><td>{"検索品質が徐々に悪化"}</td><td>{"データ分布の変化(埋め込みドリフト)、古いインデックス"}</td><td>{"品質診断、再インデックス、監視"}</td></tr><tr className="even"><td>{"回答の形式が崩れる"}</td><td>{"プロンプト変更、出力形式の指定が弱い"}</td><td>{"JSON Schema検証、出力形式の明示、Few-shot"}</td></tr><tr className="odd"><td>{"ある日突然品質低下"}</td><td>{"モデルバージョン更新、プロンプト変更"}</td><td>{"バージョン差分比較、ロールバック、回帰テスト"}</td></tr></tbody></table></div>

    <h4>{"20.3 ツール活用"}</h4>

    <div className="table-scroll"><table><thead><tr className="header"><th scope="col">{"ツール"}</th><th scope="col">{"使い方"}</th></tr></thead><tbody><tr className="odd"><td><strong>{"CloudWatch Logs Insights"}</strong></td><td>{"モデル呼び出しログをクエリし、失敗や遅延の傾向を集計"}</td></tr><tr className="even"><td><strong>{"X-Ray"}</strong></td><td>{"\n                                    プロンプト処理パイプラインの各段(前処理・検索・FM・後処理)を追跡\n                                "}</td></tr><tr className="odd"><td><strong>{"モデル呼び出しログ"}</strong></td><td>{"実際の入出力で再現・分析"}</td></tr><tr className="even"><td>{"プロンプトテストフレームワーク"}</td><td>{"同じテストケース群でバージョン間比較"}</td></tr><tr className="odd"><td>{"スキーマ検証"}</td><td>{"形式の不一致を自動検出"}</td></tr><tr className="even"><td><strong>{"Amazon Q Developer"}</strong></td><td>{"GenAI特有のエラーパターン認識、コード修正支援"}</td></tr></tbody></table></div>

    <div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"試験での着眼点"}</div><p>{"\n                            「長文で失敗」→\n                            コンテキスト超過(動的チャンク/要約)。「検索結果の質が下がった」→\n                            埋め込み品質診断/ドリフト監視/再インデックス。「プロンプト変更後に形式崩れ」→\n                            スキーマ検証 + バージョン比較 + 回帰テスト。\n                        "}</p></div></div>

    <hr />

    </div>;
}
