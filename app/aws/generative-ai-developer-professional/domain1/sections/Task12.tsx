import { Diagram } from '../Diagram';
/** 原本のtask12区分を全文保持する。 */
export default function Task12() { return <div className="guide-part" data-part="task12"><h2 id="4-task-12-fm-の選定と構成" tabIndex={-1}>{"4. Task 1.2 FM の選定と構成"}</h2>

<p><strong>{"Task の目的"}</strong>{": 用途に合う FM を選び、切り替えに強く、障害時にも止まらず、カスタマイズモデルの寿命管理もできる構成にする。"}</p>

<h3 id="skill-121-用途に合う-fm-の評価と選定" tabIndex={-1}>{"Skill 1.2.1 用途に合う FM の評価と選定"}</h3>

<p><strong>{"何をするか"}</strong>{": ベンチマーク、機能、制約を比べて、ビジネス要件に最も合うモデルを選ぶ。"}</p>

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"比較軸"}</th><th scope="col">{"見るポイント"}</th></tr></thead><tbody><tr className="odd"><td>{"能力"}</td><td>{"推論力、コード生成、多言語(日本語品質)、マルチモーダル対応"}</td></tr><tr className="even"><td>{"コンテキスト長"}</td><td>{"一度に入力できるトークン数。長文書を扱うなら重要"}</td></tr><tr className="odd"><td>{"速度とコスト"}</td><td>{"小型モデルは安く速い。大型モデルは高品質だが高コスト"}</td></tr><tr className="even"><td>{"提供リージョン"}</td><td>{"利用したいリージョンで使えるか(使えない場合は Skill 1.2.3 の推論プロファイル)"}</td></tr><tr className="odd"><td>{"制限事項"}</td><td>{"出力形式の制約、ツール利用対応の有無、利用ポリシー"}</td></tr></tbody></table></div>

<p><strong>{"ステップ"}</strong></p>

<ol>{" "}<li>{"要件から候補を 2 から 4 モデルに絞る"}</li>{" "}<li>{"Skill 1.1.2 の評価データセットを使い、Bedrock の"}<strong>{"モデル評価"}</strong>{"(自動評価、人手評価、LLM を審査員に使う評価)で比較する"}</li>{" "}<li>{"品質だけでなくコストと遅延も表にして、総合で選ぶ"}</li>{" "}</ol>

<div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"ベストプラクティス"}</div><ul>{" "}<li>{"「最も高性能なモデル」ではなく「"}<strong>{"要件を満たす最も安いモデル"}</strong>{"」を選ぶ"}</li>{" "}<li>{"難しい質問だけ大型モデルに回す、といった"}<strong>{"使い分け"}</strong>{"も検討する(Bedrock の Intelligent Prompt Routing は、同じモデルファミリー内でリクエストごとに最適なモデルへ振り分ける機能。ただしルーティングは英語のプロンプト向けに最適化されており、日本語のプロンプトには最適化されていない)"}</li>{" "}</ul></div></div>

<p>{"出典: Bedrock モデル評価 "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html"}</a></p>

<p>{"出典: Bedrock 対応モデル一覧 "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html"}</a></p>

<h3 id="skill-122-モデルの動的選択とプロバイダー切り替えコード変更なし" tabIndex={-1}>{"Skill 1.2.2 モデルの動的選択とプロバイダー切り替え(コード変更なし)"}</h3>

<p><strong>{"何をするか"}</strong>{": モデル名をコードに埋め込まず、設定を変えるだけでモデルを切り替えられる構造にする。"}</p>

<p><strong>{"なぜ必要か"}</strong>{": モデルは頻繁に新しくなり、廃止もされます。コードに直書きすると、切り替えのたびに再デプロイが必要になります。"}</p>

<Diagram id="diag-3" label="Skill 1.2.2 モデルの動的選択とプロバイダー切り替え(コード変更なし)の図解" />

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"部品"}</th><th scope="col">{"役割"}</th></tr></thead><tbody><tr className="odd"><td>{"API Gateway"}</td><td>{"アプリの入口。呼び出し側からモデルの違いを隠す抽象化層"}</td></tr><tr className="even"><td>{"Lambda"}</td><td>{"AppConfig から設定を読み、Bedrock を呼ぶ"}</td></tr><tr className="odd"><td>{"AWS AppConfig"}</td><td>{"モデル ID、温度、最大トークンなどの設定を"}<strong>{"デプロイ戦略付き"}</strong>{"で配信"}</td></tr><tr className="even"><td>{"Bedrock Converse API"}</td><td>{"モデルごとの差異を吸収する共通のメッセージ形式の API"}</td></tr></tbody></table></div>

<div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"ベストプラクティス"}</div><ul>{" "}<li>{"モデル ID は環境変数や AppConfig に置く("}<strong>{"コードに直書きしない"}</strong>{")"}</li>{" "}<li>{"AppConfig は"}<strong>{"段階的デプロイ"}</strong>{"と CloudWatch アラームによる"}<strong>{"自動ロールバック"}</strong>{"が使えるため、モデル切り替えの安全装置になる"}</li>{" "}<li>{"モデルごとにプロンプトの最適形が違うため、"}<strong>{"モデルとプロンプトをセットで管理"}</strong>{"する(Task 1.6)"}</li>{" "}<li>{"Converse API を使うと、モデルごとに異なるリクエスト本文の形式を意識せずに済む"}</li>{" "}</ul></div></div>

<p>{"出典: AWS AppConfig "}<a href="https://docs.aws.amazon.com/appconfig/latest/userguide/what-is-appconfig.html">{"https://docs.aws.amazon.com/appconfig/latest/userguide/what-is-appconfig.html"}</a></p>

<p>{"出典: Bedrock Converse API "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference.html"}</a></p>

<h3 id="skill-123-障害に強い-ai-システムレジリエンス" tabIndex={-1}>{"Skill 1.2.3 障害に強い AI システム(レジリエンス)"}</h3>

<p><strong>{"何をするか"}</strong>{": スロットリング、リージョン障害、モデル停止が起きても、サービスを継続する。"}</p>

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"手法"}</th><th scope="col">{"内容"}</th><th scope="col">{"向いている状況"}</th></tr></thead><tbody><tr className="odd"><td>{"指数バックオフ付きリトライ"}</td><td>{"待ち時間を倍々に増やし、ジッターを加えて再試行"}</td><td>{"一時的なスロットリング"}</td></tr><tr className="even"><td>{"サーキットブレーカー"}</td><td>{"失敗が続く依存先への呼び出しを一時遮断し、すぐ代替へ"}</td><td>{"障害が継続している依存先"}</td></tr><tr className="odd"><td>{"クロスリージョン推論"}</td><td>{"推論プロファイル経由で複数リージョンに振り分け"}</td><td>{"需要の急増、スループット確保"}</td></tr><tr className="even"><td>{"フォールバックモデル"}</td><td>{"主モデル失敗時に別モデルを呼ぶ"}</td><td>{"モデル単位の障害"}</td></tr><tr className="odd"><td>{"グレースフルデグラデーション"}</td><td>{"機能を縮小して応答を続ける(例: キャッシュ回答、定型文)"}</td><td>{"全面停止を避けたいとき"}</td></tr></tbody></table></div>

<Diagram id="diag-4" label="Skill 1.2.3 障害に強い AI システム(レジリエンス)の図解" />

<p><strong>{"Step Functions でのサーキットブレーカー"}</strong>{": 失敗状態を DynamoDB に保存し、ワークフロー内で「遮断中か」を判定する Choice ステートを置く、という実装が典型です。Step Functions の Retry と Catch でエラー種別ごとに処理を分けられます。"}</p>

<p><strong>{"クロスリージョン推論(CRIS)の要点"}</strong></p>

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"種類"}</th><th scope="col">{"特徴"}</th></tr></thead><tbody><tr className="odd"><td>{"地域(Geographic)プロファイル"}</td><td>{"US、EU、APAC など特定の地域内のリージョンへ振り分ける。データの所在地要件がある場合に向く"}</td></tr><tr className="even"><td>{"グローバルプロファイル"}</td><td>{"サポートされる商用リージョン全体へ振り分け、最大のスループットとコスト面の利点が得られる"}</td></tr></tbody></table></div>

<ul>{" "}<li>{"どちらも"}<strong>{"推論プロファイル"}</strong>{"を使い、推論プロファイルの ID をモデル ID の代わりに指定する"}</li>{" "}<li>{"リクエストは"}<strong>{"呼び出し元リージョンの CloudTrail"}</strong>{" に記録される"}</li>{" "}<li>{"推論プロファイルは Provisioned Throughput には対応していない"}</li>{" "}<li>{"振り分け先を含む権限(IAM)を許可する必要がある。リージョンを制限する SCP を使っている場合は、プロファイルの種類で対応が異なる"}<ul>{" "}<li><strong>{"地域(Geographic)プロファイル"}</strong>{": プロファイルに含まれる振り分け先リージョンを SCP で許可しないと失敗する"}</li>{" "}<li><strong>{"グローバルプロファイル"}</strong>{": 振り分け先は "}<code>{"aws:RequestedRegion"}</code>{" が "}<code>{"unspecified"}</code>{" として評価されるため、この値のリクエストを許可するか、ドキュメントに記載された推論プロファイル向けの例外条件を SCP に設定する"}</li>{" "}</ul></li>{" "}</ul>

<div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"ベストプラクティス"}</div><ul>{" "}<li>{"リトライは"}<strong>{"冪等な処理"}</strong>{"に限り、"}<strong>{"上限回数とバックオフ"}</strong>{"を必ず設定する"}</li>{" "}<li>{"「エラーを返す」より「品質を落としても応答する」設計を、要件に応じて選ぶ"}</li>{" "}<li>{"障害対応は"}<strong>{"事前にテスト"}</strong>{"する(障害を意図的に起こす訓練)"}</li>{" "}</ul></div></div>

<p>{"出典: Bedrock クロスリージョン推論 "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html"}</a></p>

<p>{"出典: Bedrock グローバルクロスリージョン推論 "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/global-cross-region-inference.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/global-cross-region-inference.html"}</a></p>

<p>{"出典: Step Functions エラー処理 "}<a href="https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html">{"https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html"}</a></p>

<h3 id="skill-124-fm-カスタマイズのデプロイとライフサイクル管理" tabIndex={-1}>{"Skill 1.2.4 FM カスタマイズのデプロイとライフサイクル管理"}</h3>

<p><strong>{"何をするか"}</strong>{": ドメイン特化のカスタマイズモデルを、バージョン管理し、自動デプロイし、失敗時は戻し、役目を終えたら退役させる。"}</p>

<p><strong>{"カスタマイズ手法の選び方"}</strong></p>

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"手法"}</th><th scope="col">{"概要"}</th><th scope="col">{"向いている場面"}</th></tr></thead><tbody><tr className="odd"><td>{"プロンプト設計"}</td><td>{"指示や例を工夫するだけ"}</td><td>{"まず試す。コストが最小"}</td></tr><tr className="even"><td>{"RAG"}</td><td>{"外部知識を検索して渡す"}</td><td>{"最新情報や社内文書が必要"}</td></tr><tr className="odd"><td>{"フルファインチューニング"}</td><td>{"モデル全体を追加学習"}</td><td>{"大規模データと予算がある場合"}</td></tr><tr className="even"><td>{"LoRA などのパラメータ効率型"}</td><td>{"小さな追加パラメータ(アダプター)だけ学習"}</td><td>{"コストを抑えて特化させたい"}</td></tr></tbody></table></div>

<Diagram id="diag-5" label="Skill 1.2.4 FM カスタマイズのデプロイとライフサイクル管理の図解" />

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"部品"}</th><th scope="col">{"役割"}</th></tr></thead><tbody><tr className="odd"><td>{"SageMaker AI"}</td><td>{"ファインチューニング済みモデルをエンドポイントへデプロイ"}</td></tr><tr className="even"><td>{"SageMaker Model Registry"}</td><td>{"モデルのバージョン管理と承認ステータスの管理"}</td></tr><tr className="odd"><td>{"SageMaker Pipelines、CodePipeline"}</td><td>{"モデル更新のデプロイを自動化"}</td></tr><tr className="even"><td>{"ブルー/グリーンデプロイと CloudWatch アラーム"}</td><td>{"失敗時に自動で前のバージョンへ戻す"}</td></tr><tr className="odd"><td>{"LoRA アダプター"}</td><td>{"1 つのベースモデルに複数のアダプターを載せ、用途別に切り替え可能"}</td></tr></tbody></table></div>

<div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"ベストプラクティス"}</div><ul>{" "}<li><strong>{"モデル、学習データ、評価結果、プロンプトを紐づけて"}</strong>{"バージョン管理する(再現性と監査のため)"}</li>{" "}<li>{"承認ゲートを置き、"}<strong>{"評価基準を満たしたバージョンだけ"}</strong>{"本番へ進める"}</li>{" "}<li>{"ロールバック手順を最初から用意する"}</li>{" "}<li>{"使われなくなったモデルは"}<strong>{"退役の基準と期限"}</strong>{"を決めて、コストとリスクを減らす"}</li>{" "}<li>{"Bedrock のカスタムモデルの推論には、"}<strong>{"Provisioned Throughput"}</strong>{"(時間単位の固定課金)と"}<strong>{"オンデマンドデプロイ"}</strong>{"(トークン単位の従量課金)がある。どちらを使えるかは"}<strong>{"モデルとリージョンによって異なる"}</strong>{"ため、対応状況を確認してからコストを設計する"}</li>{" "}</ul></div></div>

<p>{"出典: SageMaker Model Registry "}<a href="https://docs.aws.amazon.com/sagemaker/latest/dg/model-registry.html">{"https://docs.aws.amazon.com/sagemaker/latest/dg/model-registry.html"}</a></p>

<p>{"出典: SageMaker デプロイガードレール "}<a href="https://docs.aws.amazon.com/sagemaker/latest/dg/deployment-guardrails.html">{"https://docs.aws.amazon.com/sagemaker/latest/dg/deployment-guardrails.html"}</a></p>

<p>{"出典: Bedrock モデルカスタマイズ "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/custom-models.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/custom-models.html"}</a></p>

<h3 id="task-12-の試験ポイント" tabIndex={-1}>{"Task 1.2 の試験ポイント"}</h3>

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"よく出る場面"}</th><th scope="col">{"選ぶ答えの方向"}</th></tr></thead><tbody><tr className="odd"><td>{"モデルをコード変更なしで切り替えたい"}</td><td>{"AppConfig で設定配信、Converse API、API Gateway と Lambda の抽象化"}</td></tr><tr className="even"><td>{"特定リージョンでモデルの容量が足りない"}</td><td>{"クロスリージョン推論プロファイル"}</td></tr><tr className="odd"><td>{"外部依存の失敗が続く"}</td><td>{"Step Functions とサーキットブレーカー、フォールバック"}</td></tr><tr className="even"><td>{"カスタムモデルを安全に更新したい"}</td><td>{"Model Registry と自動パイプラインとロールバック"}</td></tr><tr className="odd"><td>{"低コストでドメイン特化したい"}</td><td>{"LoRA などパラメータ効率型の手法"}</td></tr></tbody></table></div>

<hr />
</div>; }
