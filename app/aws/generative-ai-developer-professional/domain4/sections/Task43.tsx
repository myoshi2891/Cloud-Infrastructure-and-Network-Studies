import { Diagram } from '../Diagram';
/** 原本のtask3区分を全文・順序どおり保持する。 */
export default function Task43() { return <div className="guide-part" data-part="task3"><h2 id="task-43-genai-アプリのモニタリング" className="part" tabIndex={-1}>{" Task 4.3 GenAI アプリのモニタリング "}</h2>
{" "}
<h2 id="step-12-skill-431-包括的なオブザーバビリティ" tabIndex={-1}>{" Step 12: Skill 4.3.1 包括的なオブザーバビリティ "}</h2>
{" "}
<blockquote>{" "}<p>{" 公式 Skill: FM アプリケーション性能の全体を見渡せる、包括的なオブザーバビリティシステムを作る (運用メトリクス、性能トレーシング、FM とのやり取りのトレーシング、カスタムダッシュボードによるビジネス影響メトリクス)。 "}</p>{" "}</blockquote>
{" "}
<h3 id="12-1-モニタリングとオブザーバビリティ" tabIndex={-1}>{" 12-1. 「モニタリング」と「オブザーバビリティ」 "}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="12-1. 「モニタリング」と「オブザーバビリティ」の表">{" "}<table><thead><tr className="header"><th scope="col">{"用語"}</th><th scope="col">{"意味"}</th><th scope="col">{"例"}</th></tr></thead><tbody><tr className="odd"><td>{"モニタリング"}</td><td><strong>{"事前に決めた指標"}</strong>{" を見て、異常を検知する"}</td><td>{"「エラー率が 5% を超えたら通知」"}</td></tr><tr className="even"><td>{"オブザーバビリティ"}</td><td>{" 出力 (メトリクス、ログ、トレース) から "}<strong>{"未知の問題の原因を調べられる"}</strong>{" 状態 "}</td><td>{"「なぜこの回答だけ遅かったのか」をトレースで追う"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="12-2-genai-アプリで見る-4-つの層" tabIndex={-1}>{"12-2. GenAI アプリで見る 4 つの層"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="12-2. GenAI アプリで見る 4 つの層の表">{" "}<table><thead><tr className="header"><th scope="col">{"層"}</th><th scope="col">{"見るもの"}</th><th scope="col">{"代表的な手段"}</th></tr></thead><tbody><tr className="odd"><td>{"運用メトリクス"}</td><td>{"呼び出し数、レイテンシ、エラー、スロットリング、トークン数"}</td><td>{"Amazon CloudWatch の Bedrock メトリクス"}</td></tr><tr className="even"><td>{"性能トレーシング"}</td><td>{"リクエスト全体の流れと、各ステップの所要時間"}</td><td>{" AWS X-Ray、OpenTelemetry (ADOT)、CloudWatch の GenAI 可観測性 "}</td></tr><tr className="odd"><td>{"FM とのやり取りのトレーシング"}</td><td>{"プロンプト、応答、検索結果、ツール呼び出し、推論ステップ"}</td><td>{" モデル呼び出しログ、エージェントのトレース、AgentCore の可観測性 "}</td></tr><tr className="even"><td>{"ビジネス影響メトリクス"}</td><td>{" 解決率、コンバージョン、コスト / 会話、ユーザー満足度、オペレーター削減 "}</td><td>{"カスタムメトリクスとダッシュボード"}</td></tr></tbody></table>{" "}</div>
{" "}
<Diagram id="diag-17" label="12-2. GenAI アプリで見る 4 つの層" />
{" "}
<h3 id="12-3-amazon-cloudwatch-の-genai-可観測性" tabIndex={-1}>{" 12-3. Amazon CloudWatch の GenAI 可観測性 "}</h3>
{" "}
<p>{" AWS 公式ドキュメントでは、CloudWatch の "}<strong>{"生成 AI 可観測性"}</strong>{" について次のように説明されています。 "}</p>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="12-3. Amazon CloudWatch の GenAI 可観測性の表">{" "}<table><thead><tr className="header"><th scope="col">{"項目"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className="odd"><td>{"対象"}</td><td>{" Amazon Bedrock AgentCore のエージェントを含む生成 AI ワークロード "}</td></tr><tr className="even"><td>{"提供する画面"}</td><td>{"レイテンシ、使用量、エラーの事前構成ビュー"}</td></tr><tr className="odd"><td>{"トレーシング"}</td><td>{" ナレッジベース、ツール、モデルなどのコンポーネントをまたぐ "}<strong>{"エンドツーエンドのプロンプトトレース"}</strong>{" "}</td></tr><tr className="even"><td>{"フレームワーク"}</td><td>{"Strands Agents、LangChain、LangGraph などと互換"}</td></tr><tr className="odd"><td>{"組み込みの機能"}</td><td>{" モデル呼び出しダッシュボード (Bedrock の任意のモデルで利用可)、AgentCore エージェントのダッシュボード "}</td></tr><tr className="even"><td>{"料金"}</td><td>{" この機能自体の追加料金はなく、収集したテレメトリの既存の CloudWatch 料金が適用 "}</td></tr><tr className="odd"><td>{"前提設定"}</td><td>{" AgentCore のトレースやスパンを見るには、CloudWatch の Transaction Search の有効化が必要。エージェントのコードには ADOT SDK を追加する "}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="12-4-ビジネス影響メトリクスの例" tabIndex={-1}>{"12-4. ビジネス影響メトリクスの例"}</h3>
{" "}
<p>{" 技術指標だけでは「投資に見合うか」を説明できません。次のような "}<strong>{"ビジネス指標をカスタムメトリクス化"}</strong>{" します。 "}</p>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="12-4. ビジネス影響メトリクスの例の表">{" "}<table><thead><tr className="header"><th scope="col">{"ビジネス指標"}</th><th scope="col">{"計測方法の例"}</th></tr></thead><tbody><tr className="odd"><td>{"一次解決率 (問い合わせ解決率)"}</td><td>{"「解決した」ボタンや、人への引き継ぎがなかった割合"}</td></tr><tr className="even"><td>{"1 会話あたりのコスト"}</td><td>{"トークンコスト ÷ 会話数"}</td></tr><tr className="odd"><td>{"平均処理時間"}</td><td>{"従来手順との比較"}</td></tr><tr className="even"><td>{"ユーザー満足度"}</td><td>{"評価ボタン、アンケート"}</td></tr><tr className="odd"><td>{"業務時間の削減"}</td><td>{"作業時間の前後比較"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="12-5-ベストプラクティス" tabIndex={-1}>{"12-5. ベストプラクティス"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="12-5. ベストプラクティスの表">{" "}<table><thead><tr className="header"><th scope="col">{"#"}</th><th scope="col">{"ベストプラクティス"}</th><th scope="col">{"理由"}</th></tr></thead><tbody><tr className="odd"><td>{"1"}</td><td>{"4 つの層すべてを計装する"}</td><td>{"1 層だけでは原因を追えない"}</td></tr><tr className="even"><td>{"2"}</td><td>{" "}<strong>{"相関 ID"}</strong>{" (リクエスト ID、セッション ID) をすべてのログとトレースに通す "}</td><td>{"1 件の回答を、検索、プロンプト、FM、後処理まで追跡できる"}</td></tr><tr className="odd"><td>{"3"}</td><td>{" 技術指標とビジネス指標を "}<strong>{"同じダッシュボード"}</strong>{" に並べる "}</td><td>{"劣化の影響を事業視点で判断できる"}</td></tr><tr className="even"><td>{"4"}</td><td>{"構造化ログ (JSON) で出力する"}</td><td>{"Logs Insights で検索と集計がしやすい"}</td></tr><tr className="odd"><td>{"5"}</td><td>{" しきい値アラームと、"}<strong>{"異常検知アラーム"}</strong>{" を併用する "}</td><td>{"固定しきい値で拾えない変化も拾える"}</td></tr><tr className="even"><td>{"6"}</td><td>{" ログには機密情報が入ることを前提に、暗号化とマスキングを設計する "}</td><td>{"プロンプトや応答に個人情報が含まれうる"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="12-6-試験の狙われどころ" tabIndex={-1}>{"12-6. 試験の狙われどころ"}</h3>
{" "}
<ul>{" "}<li>{" 「エージェントの各ステップ (検索、ツール、モデル) を横断して追いたい」→ "}<strong>{"エンドツーエンドのトレース (CloudWatch GenAI 可観測性 / AgentCore 可観測性 / X-Ray / OpenTelemetry)"}</strong>{"。 "}</li>{" "}<li>{" 「事業への影響を経営層に示したい」→ "}<strong>{"ビジネス影響メトリクスをカスタムダッシュボードで可視化"}</strong>{"。 "}</li>{" "}</ul>
{" "}
<p>{" 出典: CloudWatch Generative AI observability / AgentCore observability / What's New (Step 22 を参照) "}</p>
{" "}
<h2 id="step-13-skill-432-genai-固有のモニタリング" tabIndex={-1}>{" Step 13: Skill 4.3.2 GenAI 固有のモニタリング "}</h2>
{" "}
<blockquote>{" "}<p>{" 公式 Skill: FM 実装に固有の問題を先回りして見つけ、KPI を評価する、包括的な GenAI モニタリングを実装する (CloudWatch によるトークン使用量、プロンプトの有効性、幻覚率、応答品質の追跡。トークンバーストと応答ドリフトの異常検知。リクエストとレスポンスの詳細分析のための Bedrock モデル呼び出しログ。性能ベンチマーク。コスト異常検知)。 "}</p>{" "}</blockquote>
{" "}
<h3 id="13-1-bedrock-が自動で出すメトリクス" tabIndex={-1}>{" 13-1. Bedrock が自動で出すメトリクス "}</h3>
{" "}
<p>{" Bedrock (bedrock-runtime) は、CloudWatch の "}<strong>{"AWS/Bedrock 名前空間"}</strong>{" にメトリクスを出力します。AWS のドキュメントでは、呼び出し量、レイテンシ、トークン消費、エラー率、モデル呼び出しログの配信状況の監視に使うと説明されています。"}<strong>{"追加設定なしで"}</strong>{" モデル ID ごとに取得できます。 "}</p>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="13-1. Bedrock が自動で出すメトリクスの表">{" "}<table><thead><tr className="header"><th scope="col">{"代表的なメトリクス"}</th><th scope="col">{"意味"}</th><th scope="col">{"使い方"}</th></tr></thead><tbody><tr className="odd"><td>{"Invocations"}</td><td>{"呼び出し数"}</td><td>{"需要の把握"}</td></tr><tr className="even"><td>{"InvocationLatency"}</td><td>{"呼び出しの遅延"}</td><td>{"性能劣化の検知 (p95 / p99 で見る)"}</td></tr><tr className="odd"><td>{"InputTokenCount / OutputTokenCount"}</td><td>{"入出力トークン数"}</td><td>{"コストの監視、トークンバーストの検知"}</td></tr><tr className="even"><td>{"クライアントエラー / サーバーエラー / スロットリング"}</td><td>{"エラー系の指標"}</td><td>{"障害と容量不足の検知"}</td></tr></tbody></table>{" "}</div>
{" "}
<blockquote>{" "}<p>{" 最新のメトリクス一覧 (最初のトークンまでの時間など、新しく追加されうるもの) は、公式の「Monitor bedrock-runtime inference using CloudWatch metrics」で確認してください。 "}</p>{" "}</blockquote>
{" "}
<h3 id="13-2-bedrock-のメトリクスでは見えないものを自前で測る" tabIndex={-1}>{" 13-2. 「Bedrock のメトリクスでは見えないもの」を自前で測る "}</h3>
{" "}
<p>{" 標準メトリクスは "}<strong>{"インフラ視点"}</strong>{" です。GenAI 固有の次の指標は、自分で計測してカスタムメトリクス化します。 "}</p>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="13-2. 「Bedrock のメトリクスでは見えないもの」を自前で測るの表">{" "}<table><thead><tr className="header"><th scope="col">{"指標"}</th><th scope="col">{"計測方法の例"}</th></tr></thead><tbody><tr className="odd"><td>{"プロンプトの有効性"}</td><td>{" プロンプトのバージョン別に、評価スコア、成功率、再質問率を比較する "}</td></tr><tr className="even"><td>{"幻覚率"}</td><td>{" 根拠チェック (Bedrock Guardrails の contextual grounding check など) や、LLM を審判にした自動評価、ゴールデンデータセットでの検証 "}</td></tr><tr className="odd"><td>{"応答品質"}</td><td>{" LLM-as-a-judge の評価スコア、ユーザーフィードバック (高評価 / 低評価) "}</td></tr><tr className="even"><td>{"応答の長さ、拒否率"}</td><td>{"応答トークン数の分布、「答えられません」の割合"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="13-3-異常検知" tabIndex={-1}>{"13-3. 異常検知"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="13-3. 異常検知の表">{" "}<table><thead><tr className="header"><th scope="col">{"対象"}</th><th scope="col">{"異常の例"}</th><th scope="col">{"手段"}</th></tr></thead><tbody><tr className="odd"><td>{"トークンバースト"}</td><td>{" 特定ユーザー、暴走ループ、プロンプトインジェクションで入出力トークンが急増 "}</td><td>{" CloudWatch の "}<strong>{"異常検知アラーム"}</strong>{" (過去パターンから期待バンドを学習) "}</td></tr><tr className="even"><td>{"応答ドリフト"}</td><td>{"応答の長さ、品質スコア、拒否率の分布が時間とともに変わる"}</td><td>{" 品質メトリクスの異常検知、定期的なゴールデンデータセット評価 "}</td></tr><tr className="odd"><td>{"コスト異常"}</td><td>{"予想外の請求増"}</td><td>{" AWS Cost Anomaly Detection、AWS Budgets、コスト配分タグ (推論プロファイルへのタグ付けなど) "}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="13-4-モデル呼び出しログ-model-invocation-logs" tabIndex={-1}>{" 13-4. モデル呼び出しログ (Model Invocation Logs) "}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="13-4. モデル呼び出しログ (Model Invocation Logs)の表">{" "}<table><thead><tr className="header"><th scope="col">{"項目"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className="odd"><td>{"目的"}</td><td>{" リクエストとレスポンスの "}<strong>{"本文を含む"}</strong>{" 詳細な記録を残し、分析、監査、デバッグに使う "}</td></tr><tr className="even"><td>{"出力先"}</td><td>{"Amazon S3 と CloudWatch Logs (どちらか、または両方)"}</td></tr><tr className="odd"><td>{"初期状態"}</td><td><strong>{"有効化が必要"}</strong>{" (自動では記録されない)"}</td></tr><tr className="even"><td>{"分析"}</td><td>{"CloudWatch Logs Insights、Amazon Athena (S3 の場合)"}</td></tr><tr className="odd"><td>{"記録される例"}</td><td>{"入力、出力、使用トークン数、モデル ID、リクエスト ID など"}</td></tr><tr className="even"><td>{"注意"}</td><td>{" 本文に個人情報や機密が含まれうる。"}<strong>{"暗号化 (KMS)、アクセス制御、保持期間、マスキング"}</strong>{" を設計する "}</td></tr></tbody></table>{" "}</div>
{" "}
<Diagram id="diag-18" label="13-4. モデル呼び出しログ (Model Invocation Logs)" />
{" "}
<h3 id="13-5-ベストプラクティス" tabIndex={-1}>{"13-5. ベストプラクティス"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="13-5. ベストプラクティスの表">{" "}<table><thead><tr className="header"><th scope="col">{"#"}</th><th scope="col">{"ベストプラクティス"}</th><th scope="col">{"理由"}</th></tr></thead><tbody><tr className="odd"><td>{"1"}</td><td>{" モデル呼び出しログを "}<strong>{"本番で有効化"}</strong>{" し、保存先、保持期間、暗号化を決める "}</td><td>{"事後調査と監査に必要"}</td></tr><tr className="even"><td>{"2"}</td><td>{" 入力と出力のトークン数に "}<strong>{"異常検知アラーム"}</strong>{" を設定する "}</td><td>{"暴走やコスト急増を早く検知"}</td></tr><tr className="odd"><td>{"3"}</td><td>{" 品質指標 (幻覚、満足度) を "}<strong>{"継続評価"}</strong>{" し、メトリクス化する "}</td><td>{"インフラ指標だけでは品質劣化に気づけない"}</td></tr><tr className="even"><td>{"4"}</td><td>{"プロンプトのバージョンと品質メトリクスを紐づける"}</td><td>{"どの変更が影響したか特定できる"}</td></tr><tr className="odd"><td>{"5"}</td><td>{" ベンチマーク (ゴールデンデータセット) を定期実行し、ドリフトを検出 "}</td><td>{"モデル更新やデータ変化への備え"}</td></tr><tr className="even"><td>{"6"}</td><td>{" コストは AWS Cost Anomaly Detection と Budgets で別系統でも監視 "}</td><td>{"CloudWatch とは違う視点の保険"}</td></tr><tr className="odd"><td>{"7"}</td><td>{" ログ内の機密情報を CloudWatch Logs のデータ保護機能などでマスキングする "}</td><td>{"個人情報の流出リスク低減"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="13-6-試験の狙われどころ" tabIndex={-1}>{"13-6. 試験の狙われどころ"}</h3>
{" "}
<ul>{" "}<li>{" 「プロンプトと応答の中身まで詳細に分析したい」→ "}<strong>{"モデル呼び出しログ"}</strong>{" (有効化が必要)。 "}</li>{" "}<li>{" 「トークン使用量の急増を自動で検知」→ "}<strong>{"CloudWatch 異常検知アラーム"}</strong>{"。 "}</li>{" "}<li>{" 「幻覚率の追跡」→ "}<strong>{"根拠チェック、LLM-as-a-judge、ゴールデンデータセットをカスタムメトリクス化"}</strong>{"。 "}</li>{" "}<li>{"「想定外のコスト増を検知」→ "}<strong>{"Cost Anomaly Detection"}</strong>{"。"}</li>{" "}</ul>
{" "}
<p>{" 出典: Monitor bedrock-runtime inference using CloudWatch metrics / Model invocation logging / Cost Anomaly Detection (Step 22 を参照) "}</p>
{" "}
<h2 id="step-14-skill-433-統合オブザーバビリティと監査" tabIndex={-1}>{" Step 14: Skill 4.3.3 統合オブザーバビリティと監査 "}</h2>
{" "}
<blockquote>{" "}<p>{" 公式 Skill: FM アプリケーションに対して実用的なインサイトを提供する統合オブザーバビリティを開発する (運用メトリクスのダッシュボード、ビジネス影響の可視化、コンプライアンス監視、フォレンジックの追跡可能性と監査ログ、ユーザーインタラクションの追跡、モデル挙動パターンの追跡)。 "}</p>{" "}</blockquote>
{" "}
<h3 id="14-1-見えるから使えるへ" tabIndex={-1}>{"14-1. 「見える」から「使える」へ"}</h3>
{" "}
<p>{" Step 12 と 13 で集めたデータを "}<strong>{"目的別に統合"}</strong>{" して、意思決定に使える形にします。 "}</p>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="14-1. 「見える」から「使える」への表">{" "}<table><thead><tr className="header"><th scope="col">{"目的"}</th><th scope="col">{"見る人"}</th><th scope="col">{"見せ方"}</th></tr></thead><tbody><tr className="odd"><td>{"運用の健全性"}</td><td>{"SRE、開発者"}</td><td>{" 運用メトリクスのダッシュボード (レイテンシ、エラー、トークン、スロットリング) "}</td></tr><tr className="even"><td>{"事業への影響"}</td><td>{"事業責任者"}</td><td>{"ビジネス影響の可視化 (解決率、コスト / 会話、満足度)"}</td></tr><tr className="odd"><td>{"コンプライアンス"}</td><td>{"セキュリティ、法務、監査"}</td><td>{"ガードレールの介入数、ポリシー違反の傾向、アクセス監査"}</td></tr><tr className="even"><td>{"事後の追跡"}</td><td>{"調査担当"}</td><td>{"フォレンジック: 誰が、いつ、何を入力し、何が出力されたか"}</td></tr><tr className="odd"><td>{"利用状況"}</td><td>{"プロダクト担当"}</td><td>{"ユーザーの操作、フィードバック、利用パターン"}</td></tr><tr className="even"><td>{"モデル挙動"}</td><td>{"ML / AI 担当"}</td><td>{"応答パターンの変化、拒否率、ツール選択傾向"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="14-2-誰が何をしたかと中身は何かは別のログ" tabIndex={-1}>{" 14-2. 「誰が何をしたか」と「中身は何か」は別のログ "}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="14-2. 「誰が何をしたか」と「中身は何か」は別のログの表">{" "}<table><thead><tr className="header"><th scope="col">{"問い"}</th><th scope="col">{"主な情報源"}</th></tr></thead><tbody><tr className="odd"><td>{"誰が、いつ、どの API を呼んだか (操作の監査)"}</td><td>{"AWS CloudTrail"}</td></tr><tr className="even"><td>{"入力と出力の中身は何か"}</td><td>{"Bedrock モデル呼び出しログ、アプリのログ"}</td></tr><tr className="odd"><td>{"設定が規定どおりか"}</td><td>{"AWS Config"}</td></tr><tr className="even"><td>{"どの回答がどのユーザー、どのセッションで発生したか"}</td><td>{"相関 ID (リクエスト ID、セッション ID) をアプリのログに記録"}</td></tr><tr className="odd"><td>{"ガードレールが何を止めたか"}</td><td>{"Bedrock Guardrails のメトリクスと介入ログ"}</td></tr></tbody></table>{" "}</div>
{" "}
<Diagram id="diag-19" label="14-2. 「誰が何をしたか」と「中身は何か」は別のログ" />
{" "}
<h3 id="14-3-ベストプラクティス" tabIndex={-1}>{"14-3. ベストプラクティス"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="14-3. ベストプラクティスの表">{" "}<table><thead><tr className="header"><th scope="col">{"#"}</th><th scope="col">{"ベストプラクティス"}</th><th scope="col">{"理由"}</th></tr></thead><tbody><tr className="odd"><td>{"1"}</td><td>{" ダッシュボードを "}<strong>{"対象者別"}</strong>{" に分ける (運用用、事業用、監査用) "}</td><td>{"見る人ごとに必要な情報が違う"}</td></tr><tr className="even"><td>{"2"}</td><td>{" 監査ログは "}<strong>{"改ざん防止と長期保管"}</strong>{" (S3 のオブジェクトロック、アクセス制限、KMS 暗号化) を考える "}</td><td>{"フォレンジックでの証拠性"}</td></tr><tr className="odd"><td>{"3"}</td><td>{" すべての記録に "}<strong>{"相関 ID と、ユーザー / テナント識別子"}</strong>{" を含める "}</td><td>{"追跡可能性の確保"}</td></tr><tr className="even"><td>{"4"}</td><td>{"個人情報はマスキングし、必要最小限の保持にする"}</td><td>{"プライバシーと規制対応"}</td></tr><tr className="odd"><td>{"5"}</td><td>{"ガードレールの介入率と傾向を監視する"}</td><td>{"攻撃の兆候や、ポリシーの過不足を把握"}</td></tr><tr className="even"><td>{"6"}</td><td>{" モデル挙動 (拒否率、応答長、ツール選択) の分布を時系列で記録する "}</td><td>{"ドリフトや想定外の挙動を検出"}</td></tr><tr className="odd"><td>{"7"}</td><td>{"保持期間と削除の方針を、規制要件に合わせて定義する"}</td><td>{"長期保存と削除要求の両立"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="14-4-試験の狙われどころ" tabIndex={-1}>{"14-4. 試験の狙われどころ"}</h3>
{" "}
<ul>{" "}<li>{" 「事後調査 (誰が何を入力し、何が返ったか) をできるようにする」→ "}<strong>{"CloudTrail + モデル呼び出しログ + 相関 ID"}</strong>{"。 "}</li>{" "}<li>{" 「コンプライアンス監視」→ "}<strong>{"Guardrails の介入メトリクス、AWS Config、CloudTrail"}</strong>{"。 "}</li>{" "}<li>{" 「経営層向けに投資効果を示す」→ "}<strong>{"ビジネス影響ダッシュボード"}</strong>{"。 "}</li>{" "}</ul>
{" "}
<p>{" 出典: AWS CloudTrail / Model invocation logging / Amazon Bedrock Guardrails (Step 22 を参照) "}</p>
{" "}
<h2 id="step-15-skill-434-ツール性能フレームワーク" tabIndex={-1}>{" Step 15: Skill 4.3.4 ツール性能フレームワーク "}</h2>
{" "}
<blockquote>{" "}<p>{" 公式 Skill: FM がツールを最適に使えるようにするための、ツール性能フレームワークを作る (呼び出しパターンの追跡、性能メトリクスの収集、ツール呼び出しのオブザーバビリティとマルチエージェント連携の追跡、異常検知のための使用量ベースライン)。 "}</p>{" "}</blockquote>
{" "}
<h3 id="15-1-なぜツールを監視するのか" tabIndex={-1}>{"15-1. なぜツールを監視するのか"}</h3>
{" "}
<p>{" エージェントは、FM が "}<strong>{"ツール (API、Lambda、データベース検索など)"}</strong>{" を選んで呼び出して仕事を進めます。ツールの失敗や誤用は、そのまま回答の失敗につながります。 "}</p>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="15-1. なぜツールを監視するのかの表">{" "}<table><thead><tr className="header"><th scope="col">{"ツール由来の問題"}</th><th scope="col">{"症状"}</th></tr></thead><tbody><tr className="odd"><td>{"ツールが遅い、失敗する"}</td><td>{"全体の遅延、エラー、タイムアウト"}</td></tr><tr className="even"><td>{"FM が "}<strong>{"間違ったツール"}</strong>{" を選ぶ"}</td><td>{"的外れな回答"}</td></tr><tr className="odd"><td>{"引数が不正"}</td><td>{"ツールエラー、再試行の連発"}</td></tr><tr className="even"><td>{"ツールを "}<strong>{"呼びすぎる / ループする"}</strong></td><td>{"コストと遅延の急増"}</td></tr><tr className="odd"><td>{"呼ぶべきツールを呼ばない"}</td><td>{"幻覚、古い情報"}</td></tr><tr className="even"><td>{"複数エージェント間の連携不全"}</td><td>{"作業の重複、停滞"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="15-2-収集する指標" tabIndex={-1}>{"15-2. 収集する指標"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="15-2. 収集する指標の表">{" "}<table><thead><tr className="header"><th scope="col">{"カテゴリ"}</th><th scope="col">{"指標"}</th></tr></thead><tbody><tr className="odd"><td>{"呼び出しパターン"}</td><td>{" ツール別の呼び出し回数、呼び出し順序、1 リクエストあたりの呼び出し数 "}</td></tr><tr className="even"><td>{"性能"}</td><td>{"ツール別のレイテンシ (p50、p95、p99)、タイムアウト数"}</td></tr><tr className="odd"><td>{"信頼性"}</td><td>{"成功率、エラー種別、再試行回数"}</td></tr><tr className="even"><td>{"選択の適切さ"}</td><td>{"期待ツールと実際のツールの一致率 (評価データで確認)"}</td></tr><tr className="odd"><td>{"コスト"}</td><td>{"ツール呼び出し 1 回あたりの追加トークンやコスト"}</td></tr><tr className="even"><td>{"連携 (マルチエージェント)"}</td><td>{"エージェント間のメッセージ数、引き継ぎ回数、全体の所要時間"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="15-3-ツール呼び出しの可観測性" tabIndex={-1}>{"15-3. ツール呼び出しの可観測性"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="15-3. ツール呼び出しの可観測性の表">{" "}<table><thead><tr className="header"><th scope="col">{"手段"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className="odd"><td>{"Bedrock Agents のトレース"}</td><td>{" エージェントの推論ステップ、ツール (アクショングループ) 呼び出し、ナレッジベース検索を確認できる "}</td></tr><tr className="even"><td>{"Bedrock AgentCore の可観測性"}</td><td>{" AgentCore のランタイム、メモリ、ゲートウェイ、組み込みツールの性能やスパンを CloudWatch で確認 (CloudWatch Transaction Search の有効化が必要) "}</td></tr><tr className="odd"><td>{"ツール側 (Lambda など) のメトリクス"}</td><td>{"実行時間、エラー、スロットリング"}</td></tr><tr className="even"><td>{"分散トレース (X-Ray / OpenTelemetry)"}</td><td>{" エージェント → ツール → 外部 API の呼び出しを 1 本のトレースで追跡 "}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="15-4-マルチエージェントの連携追跡" tabIndex={-1}>{"15-4. マルチエージェントの連携追跡"}</h3>
{" "}
<Diagram id="diag-20" label="15-4. マルチエージェントの連携追跡" />
{" "}
<p>{" "}<strong>{"ポイント"}</strong>{": すべてのエージェントとツールが "}<strong>{"同じトレース ID"}</strong>{" を引き継ぐことで、「どのエージェントのどのツール呼び出しが原因か」を 1 本の流れで追えます。 "}</p>
{" "}
<h3 id="15-5-使用量ベースラインと異常検知" tabIndex={-1}>{"15-5. 使用量ベースラインと異常検知"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="15-5. 使用量ベースラインと異常検知の表">{" "}<table><thead><tr className="header"><th scope="col">{"手順"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className="odd"><td>{"1"}</td><td>{" 正常時のツール呼び出し回数、レイテンシ、成功率を "}<strong>{"ベースライン"}</strong>{" として記録 "}</td></tr><tr className="even"><td>{"2"}</td><td>{" CloudWatch の "}<strong>{"異常検知アラーム"}</strong>{" で、ベースラインからの逸脱を検知 "}</td></tr><tr className="odd"><td>{"3"}</td><td>{" 逸脱 (呼び出し急増、特定ツールの失敗率上昇、呼び出しループ) の際に通知し、調査する "}</td></tr><tr className="even"><td>{"4"}</td><td>{" ツール定義 (説明、引数スキーマ) やプロンプトを改善し、ベースラインを更新 "}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="15-6-ベストプラクティス" tabIndex={-1}>{"15-6. ベストプラクティス"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="15-6. ベストプラクティスの表">{" "}<table><thead><tr className="header"><th scope="col">{"#"}</th><th scope="col">{"ベストプラクティス"}</th><th scope="col">{"理由"}</th></tr></thead><tbody><tr className="odd"><td>{"1"}</td><td>{" ツール呼び出しごとに、"}<strong>{"ツール名、引数、結果、所要時間、成否"}</strong>{" を構造化ログに残す "}</td><td>{"原因分析の基礎データ"}</td></tr><tr className="even"><td>{"2"}</td><td>{" エージェントの "}<strong>{"最大反復回数 / ツール呼び出し回数の上限"}</strong>{" を設ける "}</td><td>{"暴走とコスト爆発の防止"}</td></tr><tr className="odd"><td>{"3"}</td><td>{"ツールの説明と引数スキーマを明確にする"}</td><td>{"誤選択と不正引数を減らす最大の要因"}</td></tr><tr className="even"><td>{"4"}</td><td>{"ツールにタイムアウトと再試行、サーキットブレーカーを設ける"}</td><td>{"1 つの遅いツールが全体を止めない"}</td></tr><tr className="odd"><td>{"5"}</td><td>{"正常時のベースラインを持ち、逸脱を自動検知する"}</td><td>{"変化の早期発見"}</td></tr><tr className="even"><td>{"6"}</td><td>{"全コンポーネントでトレース ID を伝播する"}</td><td>{"マルチエージェントでも追跡可能"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="15-7-試験の狙われどころ" tabIndex={-1}>{"15-7. 試験の狙われどころ"}</h3>
{" "}
<ul>{" "}<li>{" 「エージェントがツールを呼びすぎてコストが急増」→ "}<strong>{"呼び出しパターンの追跡 + 異常検知 + 呼び出し回数の上限"}</strong>{"。 "}</li>{" "}<li>{" 「複数エージェントのどこで失敗したか特定」→ "}<strong>{"共通トレース ID によるマルチエージェント追跡 (AgentCore 可観測性 / X-Ray)"}</strong>{"。 "}</li>{" "}<li>{" 「ツールの選択ミスが多い」→ "}<strong>{"ツール説明とスキーマの改善 + 選択の評価"}</strong>{"。 "}</li>{" "}</ul>
{" "}
<p>{" 出典: Amazon Bedrock AgentCore observability / CloudWatch Generative AI observability / Bedrock Agents trace (Step 22 を参照) "}</p>
{" "}
<h2 id="step-16-skill-435-ベクトルストアの運用管理" tabIndex={-1}>{" Step 16: Skill 4.3.5 ベクトルストアの運用管理 "}</h2>
{" "}
<blockquote>{" "}<p>{" 公式 Skill: FM の拡張に使うベクトルストアが最適かつ信頼性高く動くための運用管理システムを作る (ベクトルデータベースの性能監視、インデックスの自動最適化ルーチン、データ品質の検証プロセス)。 "}</p>{" "}</blockquote>
{" "}
<h3 id="16-1-3-つの運用領域" tabIndex={-1}>{"16-1. 3 つの運用領域"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="16-1. 3 つの運用領域の表">{" "}<table><thead><tr className="header"><th scope="col">{"領域"}</th><th scope="col">{"目的"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className="odd"><td>{"性能監視"}</td><td>{"検索が速く安定して動いているかを確認する"}</td><td>{" 検索レイテンシ、インデックス作成のレイテンシ、リソース使用率 (CPU、メモリ)、エラー、スロットリング "}</td></tr><tr className="even"><td>{"インデックス最適化ルーチン"}</td><td>{"時間とともに劣化する構成を "}<strong>{"自動で整える"}</strong></td><td>{" 再構築、セグメント統合、パラメータの見直し、不要データの削除 "}</td></tr><tr className="odd"><td>{"データ品質検証"}</td><td><strong>{"入っているデータが正しい"}</strong>{" ことを保証する"}</td><td>{" 重複排除、空チャンクの検出、メタデータの欠落チェック、次元の整合、鮮度確認 "}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="16-2-監視すべき指標" tabIndex={-1}>{"16-2. 監視すべき指標"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="16-2. 監視すべき指標の表">{" "}<table><thead><tr className="header"><th scope="col">{"指標"}</th><th scope="col">{"見る理由"}</th><th scope="col">{"対応の例"}</th></tr></thead><tbody><tr className="odd"><td>{"検索レイテンシ (p95 / p99)"}</td><td>{"ユーザー体験に直結"}</td><td>{"インデックスやクエリの調整、リソース追加"}</td></tr><tr className="even"><td>{"検索のスループットとスロットリング"}</td><td>{"容量の限界"}</td><td>{"スケールアウト、キャッシュ"}</td></tr><tr className="odd"><td>{"メモリ使用率 (ベクトルグラフ用)"}</td><td>{"ベクトルインデックスがメモリを大量に使う"}</td><td>{"量子化、次元削減、ノード増強"}</td></tr><tr className="even"><td>{"インデックス / 取り込みの遅延と失敗"}</td><td>{"最新データが反映されない"}</td><td>{"取り込みジョブの再実行とアラート"}</td></tr><tr className="odd"><td>{"ストレージ使用量"}</td><td>{"コストと容量"}</td><td>{"古いデータの整理、ライフサイクル管理"}</td></tr><tr className="even"><td>{"検索品質 (再現率や評価スコア)"}</td><td>{"速くても外れていたら意味がない"}</td><td>{"評価データで定期測定"}</td></tr></tbody></table>{" "}</div>
{" "}
<blockquote>{" "}<p>{" 具体的なメトリクス名は、使うベクトルストア (Amazon OpenSearch Service / Serverless、Aurora PostgreSQL の pgvector、その他) ごとに異なります。試験では "}<strong>{"「ベクトルストアの性能を CloudWatch などで監視する」「インデックスを定期的に最適化する」"}</strong>{" という考え方を押さえてください。 "}</p>{" "}</blockquote>
{" "}
<h3 id="16-3-インデックス最適化ルーチンの例" tabIndex={-1}>{" 16-3. インデックス最適化ルーチンの例 "}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="16-3. インデックス最適化ルーチンの例の表">{" "}<table><thead><tr className="header"><th scope="col">{"タイミング"}</th><th scope="col">{"ルーチン"}</th></tr></thead><tbody><tr className="odd"><td>{"定期 (週次など)"}</td><td>{" セグメントの統合、不要ドキュメントの削除、使用状況に応じたパラメータ見直し "}</td></tr><tr className="even"><td>{"埋め込みモデル変更時"}</td><td>{" "}<strong>{"全データの再埋め込みと新インデックスへの切り替え"}</strong>{" (旧インデックスと並行運用して切り替え) "}</td></tr><tr className="odd"><td>{"データ量が大きく増えたとき"}</td><td>{"シャード数やレプリカ数の再設計、量子化の導入"}</td></tr><tr className="even"><td>{"品質劣化を検知したとき"}</td><td>{"検索パラメータの調整、チャンク戦略の再評価"}</td></tr></tbody></table>{" "}</div>
{" "}
<p>{" 自動化の手段は、Amazon EventBridge のスケジュール → AWS Lambda / AWS Step Functions で実行、という構成が一般的です。 "}</p>
{" "}
<h3 id="16-4-データ品質検証パイプライン" tabIndex={-1}>{"16-4. データ品質検証パイプライン"}</h3>
{" "}
<Diagram id="diag-21" label="16-4. データ品質検証パイプライン" />
{" "}
<p>{" Amazon Bedrock Knowledge Bases を使う場合は、データソースの "}<strong>{"同期 (取り込みジョブ)"}</strong>{" の成否とステータスを確認し、失敗を通知する仕組みを組み込みます。 "}</p>
{" "}
<h3 id="16-5-ベストプラクティス" tabIndex={-1}>{"16-5. ベストプラクティス"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="16-5. ベストプラクティスの表">{" "}<table><thead><tr className="header"><th scope="col">{"#"}</th><th scope="col">{"ベストプラクティス"}</th><th scope="col">{"理由"}</th></tr></thead><tbody><tr className="odd"><td>{"1"}</td><td>{"検索レイテンシと品質の "}<strong>{"両方"}</strong>{" を監視する"}</td><td>{"速いが外れる、を見逃さない"}</td></tr><tr className="even"><td>{"2"}</td><td>{" データの取り込み時に "}<strong>{"品質チェック"}</strong>{" を自動化する "}</td><td>{"ゴミのデータは検索品質を直接下げる"}</td></tr><tr className="odd"><td>{"3"}</td><td>{" 埋め込みモデル変更時は "}<strong>{"再埋め込みして切り替え"}</strong>{" る "}</td><td>{"異なるモデルのベクトルは混在させない"}</td></tr><tr className="even"><td>{"4"}</td><td>{"更新と削除を確実に反映する (古い情報を残さない)"}</td><td>{"古い回答や削除すべき情報の漏えいを防ぐ"}</td></tr><tr className="odd"><td>{"5"}</td><td>{"アクセス制御用のメタデータ (権限) を検証する"}</td><td>{"見せてはいけない情報の混入防止"}</td></tr><tr className="even"><td>{"6"}</td><td>{"取り込みジョブの失敗にアラームを設定する"}</td><td>{"静かな失敗でデータが古くなるのを防ぐ"}</td></tr><tr className="odd"><td>{"7"}</td><td>{"容量とコストを定期的に確認し、不要データを整理する"}</td><td>{"肥大化を防ぐ"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="16-6-試験の狙われどころ" tabIndex={-1}>{"16-6. 試験の狙われどころ"}</h3>
{" "}
<ul>{" "}<li>{" 「ベクトルストアの検索が徐々に遅くなる」→ "}<strong>{"性能メトリクス監視 + インデックス最適化ルーチン (定期再構築、パラメータ調整)"}</strong>{"。 "}</li>{" "}<li>{" 「検索結果に古い、重複、破損したデータが混ざる」→ "}<strong>{"データ品質検証プロセス (重複排除、メタデータ検証、鮮度確認)"}</strong>{"。 "}</li>{" "}<li>{" 「埋め込みモデルを変更した」→ "}<strong>{"再埋め込みと再インデックス"}</strong>{"。 "}</li>{" "}</ul>
{" "}
<p>{"出典: Amazon OpenSearch Service / Bedrock Knowledge Bases (Step 22 を参照)"}</p>
{" "}
<h2 id="step-17-skill-436-fm-固有のトラブルシューティング" tabIndex={-1}>{" Step 17: Skill 4.3.6 FM 固有のトラブルシューティング "}</h2>
{" "}
<blockquote>{" "}<p>{" 公式 Skill: 従来の ML システムにはない GenAI 特有の障害モードを特定するための FM 固有のトラブルシューティングフレームワークを開発する (幻覚を検出するゴールデンデータセット、応答の一貫性を分析する出力 diff 手法、論理エラーを特定する推論経路のトレース、専用のオブザーバビリティパイプライン)。 "}</p>{" "}</blockquote>
{" "}
<h3 id="17-1-genai-特有の障害モード" tabIndex={-1}>{"17-1. GenAI 特有の障害モード"}</h3>
{" "}
<p>{" 従来の ML や Web システムでは「エラーが出る / 出ない」で障害を判断できました。GenAI は "}<strong>{"エラーなしで、間違った内容を自信たっぷりに返す"}</strong>{" のが最大の違いです。 "}</p>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="17-1. GenAI 特有の障害モードの表">{" "}<table><thead><tr className="header"><th scope="col">{"障害モード"}</th><th scope="col">{"内容"}</th><th scope="col">{"従来システムとの違い"}</th></tr></thead><tbody><tr className="odd"><td>{"幻覚 (ハルシネーション)"}</td><td>{"事実でない内容、根拠のない内容を生成"}</td><td>{"HTTP 200 で成功して見える"}</td></tr><tr className="even"><td>{"応答の不一致"}</td><td>{"同じ質問で毎回違う答え"}</td><td>{"決定的でない出力"}</td></tr><tr className="odd"><td>{"ドリフト"}</td><td>{"モデルの更新、データ変化で挙動が変わる"}</td><td>{"入力が同じでも出力が変わる"}</td></tr><tr className="even"><td>{"推論の誤り"}</td><td>{"途中の論理が破綻して結論が間違う"}</td><td>{"最終出力だけ見ても原因が分からない"}</td></tr><tr className="odd"><td>{"検索の失敗 (RAG)"}</td><td>{"必要な文書が取得されない"}</td><td>{"モデルは悪くないのに誤答"}</td></tr><tr className="even"><td>{"コンテキストの溢れ / 欠落"}</td><td>{"重要情報が入らない、切り捨てられる"}</td><td>{"入力の設計問題"}</td></tr><tr className="odd"><td>{"ツールの誤用"}</td><td>{"誤ったツールや引数"}</td><td>{"エージェント特有"}</td></tr><tr className="even"><td>{"プロンプトインジェクション"}</td><td>{"外部入力で指示が乗っ取られる"}</td><td>{"セキュリティと品質の混在"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="17-2-4-つの手法" tabIndex={-1}>{"17-2. 4 つの手法"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="17-2. 4 つの手法の表">{" "}<table><thead><tr className="header"><th scope="col">{"手法"}</th><th scope="col">{"内容"}</th><th scope="col">{"使いどころ"}</th></tr></thead><tbody><tr className="odd"><td><strong>{"ゴールデンデータセット"}</strong></td><td>{" 「質問と期待される正しい回答 (または根拠)」のセットを用意し、定期的に実行して比較する "}</td><td>{"幻覚、回帰、モデル変更時の品質確認"}</td></tr><tr className="even"><td><strong>{"出力 diff"}</strong></td><td>{" 同じ入力の複数回の出力、またはバージョン間の出力を比較する (文字列の差分、埋め込みの類似度、LLM の審判) "}</td><td>{"応答の一貫性分析、変更の影響確認"}</td></tr><tr className="odd"><td><strong>{"推論経路のトレース"}</strong></td><td>{" 検索、プロンプト、ツール呼び出し、中間推論の各ステップを記録し、どこで誤ったかを特定する "}</td><td>{"論理エラー、エージェントの失敗"}</td></tr><tr className="even"><td><strong>{"専用のオブザーバビリティパイプライン"}</strong></td><td>{" プロンプトと応答を収集し、自動評価 (根拠チェック、LLM 審判) を回してメトリクス化する "}</td><td>{"継続的な品質監視"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="17-3-不具合の切り分けフロー-誤った回答が出たとき" tabIndex={-1}>{" 17-3. 不具合の切り分けフロー (誤った回答が出たとき) "}</h3>
{" "}
<Diagram id="diag-22" label="17-3. 不具合の切り分けフロー (誤った回答が出たとき)" />
{" "}
<blockquote>{" "}<p>{" "}<strong>{"重要な習慣"}</strong>{": 見つけた不具合は "}<strong>{"ゴールデンデータセットに追加"}</strong>{" し、同じ問題が再発しないよう回帰テストにします。 "}</p>{" "}</blockquote>
{" "}
<h3 id="17-4-出力-diff-の考え方" tabIndex={-1}>{"17-4. 出力 diff の考え方"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="17-4. 出力 diff の考え方の表">{" "}<table><thead><tr className="header"><th scope="col">{"比較の種類"}</th><th scope="col">{"方法"}</th></tr></thead><tbody><tr className="odd"><td>{"同じ入力を複数回実行 (一貫性)"}</td><td>{" temperature を固定 / 低くして複数回実行し、出力の類似度のばらつきを測る "}</td></tr><tr className="even"><td>{"変更前後 (プロンプトやモデルの更新)"}</td><td>{"同じ評価セットを新旧で実行し、差分が大きい項目を重点確認"}</td></tr><tr className="odd"><td>{"意味的な比較"}</td><td>{" 文字列一致ではなく、埋め込みの類似度や LLM による「意味が同じか」の判定 "}</td></tr></tbody></table>{" "}</div>
{" "}
<p>{" 文字列の完全一致は、GenAI の出力比較には "}<strong>{"不向き"}</strong>{" です (言い回しが変わるだけで不一致になるため)。 "}</p>
{" "}
<h3 id="17-5-利用できる-aws-の機能" tabIndex={-1}>{"17-5. 利用できる AWS の機能"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="17-5. 利用できる AWS の機能の表">{" "}<table><thead><tr className="header"><th scope="col">{"目的"}</th><th scope="col">{"機能"}</th></tr></thead><tbody><tr className="odd"><td>{"ゴールデンデータセットでの評価"}</td><td>{" Amazon Bedrock の評価機能 (モデル評価、RAG 評価、LLM-as-a-judge) "}</td></tr><tr className="even"><td>{"幻覚の抑制と検出"}</td><td>{" Bedrock Guardrails の contextual grounding check (根拠と関連性の確認) "}</td></tr><tr className="odd"><td>{"推論経路の確認"}</td><td>{" Bedrock Agents のトレース、AgentCore の可観測性、アプリ側のステップログ "}</td></tr><tr className="even"><td>{"一連の流れの追跡"}</td><td>{"CloudWatch GenAI 可観測性、X-Ray、OpenTelemetry"}</td></tr><tr className="odd"><td>{"詳細調査"}</td><td>{"モデル呼び出しログ + Logs Insights / Athena"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="17-6-ベストプラクティス" tabIndex={-1}>{"17-6. ベストプラクティス"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="17-6. ベストプラクティスの表">{" "}<table><thead><tr className="header"><th scope="col">{"#"}</th><th scope="col">{"ベストプラクティス"}</th><th scope="col">{"理由"}</th></tr></thead><tbody><tr className="odd"><td>{"1"}</td><td>{" 本番の失敗事例から "}<strong>{"ゴールデンデータセットを育てる"}</strong>{" "}</td><td>{"実際のユーザーの質問に近い評価ができる"}</td></tr><tr className="even"><td>{"2"}</td><td>{" モデル、プロンプト、データ変更のたびに "}<strong>{"回帰テスト"}</strong>{" を実行する "}</td><td>{"気づかない品質低下を防ぐ"}</td></tr><tr className="odd"><td>{"3"}</td><td>{" 切り分けは "}<strong>{"検索 → プロンプト → モデル"}</strong>{" の順に行う "}</td><td>{"原因の多くは検索かコンテキスト"}</td></tr><tr className="even"><td>{"4"}</td><td>{"中間ステップ (検索結果、ツール結果、中間推論) を記録する"}</td><td>{"最終出力だけでは原因が分からない"}</td></tr><tr className="odd"><td>{"5"}</td><td>{" 評価の自動化 (LLM-as-a-judge) には、人手評価による "}<strong>{"較正"}</strong>{" も併用する "}</td><td>{"審判モデル自体の偏りを補正"}</td></tr><tr className="even"><td>{"6"}</td><td>{" 出力比較は文字列一致ではなく "}<strong>{"意味ベース"}</strong>{" で行う "}</td><td>{"言い回しの揺れに強い"}</td></tr><tr className="odd"><td>{"7"}</td><td>{" 幻覚が許されない用途では、根拠の引用と根拠チェックを必須にする "}</td><td>{"検出と抑制を両立"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="17-7-試験の狙われどころ" tabIndex={-1}>{"17-7. 試験の狙われどころ"}</h3>
{" "}
<ul>{" "}<li>{" 「幻覚を検出し、新しいバージョンで悪化していないか確認したい」→ "}<strong>{"ゴールデンデータセット + 回帰テスト"}</strong>{"。 "}</li>{" "}<li>{" 「同じ質問で答えが毎回違う」→ "}<strong>{"出力 diff による一貫性分析 + temperature の見直し"}</strong>{"。 "}</li>{" "}<li>{" 「エージェントの結論が間違うが、どのステップが原因か不明」→ "}<strong>{"推論経路のトレース"}</strong>{"。 "}</li>{" "}<li>{" 「エラーは出ていないのに品質が悪い」→ "}<strong>{"GenAI 専用の品質オブザーバビリティ (自動評価をメトリクス化)"}</strong>{"。 "}</li>{" "}</ul>
{" "}
<p>{" 出典: Amazon Bedrock Evaluations / Guardrails contextual grounding check / Bedrock Agents trace (Step 22 を参照) "}</p>
{" "}</div>; }
