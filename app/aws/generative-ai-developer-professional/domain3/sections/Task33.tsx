import { Diagram } from '../Diagram';
/** 原本のtask3区分を全文・順序どおり保持する。 */
export default function Task33() { return <div data-part="task3"><h2 id="task-3-3" tabIndex={-1}>{"Task 3.3 ガバナンスとコンプライアンス"}</h2>
{" "}
<h2 id="step-11" tabIndex={-1}>{"Step 11. コンプライアンスフレームワーク（Skill 3.3.1）"}</h2>
{" "}
<p>{" "}<strong>{"Skill 3.3.1"}</strong>{": FM デプロイメントの規制遵守を確保するコンプライアンスフレームワークを開発する（SageMaker AI によるプログラマティックなモデルカード作成、AWS Glue によるデータリネージの自動追跡、データソース帰属のためのメタデータタグ付け、CloudWatch Logs による包括的な意思決定ログの収集）。 "}</p>
{" "}
<h3 id="sec-11-1" tabIndex={-1}>{"11-1. 4 つの部品"}</h3>
{" "}
<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">{"部品"}</th><th scope="col">{"サービス／手法"}</th><th scope="col">{"何を残すか"}</th></tr></thead><tbody><tr className="odd"><td>{"モデルの説明書"}</td><td>{"SageMaker モデルカード（API で自動作成）"}</td><td>{"目的、想定用途、制限事項、評価結果、リスク評価"}</td></tr><tr className="even"><td>{"データの来歴"}</td><td>{"AWS Glue（Data Catalog・ジョブ情報）によるリネージ"}</td><td>{"どのデータがどこから来て、どう変換されたか"}</td></tr><tr className="odd"><td>{"帰属情報"}</td><td>{"メタデータタグ"}</td><td>{"データソース名・所有者・機密度・取得日"}</td></tr><tr className="even"><td>{"意思決定ログ"}</td><td>{"CloudWatch Logs"}</td><td>{"入力概要・使用モデル・ガードレール判定・出力概要"}</td></tr></tbody></table>{" "}</div>
{" "}
<Diagram id="diag-12" label="11-1. 4 つの部品" />
{" "}
<h3 id="sec-11-2" tabIndex={-1}>{"11-2. モデルカードをコードで作る理由"}</h3>
{" "}
<p>{" 手作業の文書は "}<strong>{"古くなり"}</strong>{"、環境ごとにばらつきます。SageMaker AI の API（"}<code>{"CreateModelCard"}</code>{" など）で "}<strong>{"プログラマティックに作成・更新"}</strong>{"すれば、CI/CD に組み込み、リリースごとに最新状態を維持できます。モデルの "}<strong>{"用途、制限、評価結果、倫理的考慮事項"}</strong>{" を記載する想定です。 "}</p>
{" "}
<h3 id="sec-11-3" tabIndex={-1}>{"11-3. 意思決定ログ設計のコツ"}</h3>
{" "}
<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">{"記録する"}</th><th scope="col">{"記録しない／伏せる"}</th></tr></thead><tbody><tr className="odd"><td>{" リクエスト ID、時刻、ユーザー識別子（仮名）、モデル ID、ガードレール ID とバージョン、判定結果、参照した文書 ID、トークン数 "}</td><td>{"生の PII、認証情報、不要な全文"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="sec-11-4" tabIndex={-1}>{"11-4. ベストプラクティス"}</h3>
{" "}
<div className="callout-practice">{" "}<div className="icon">{"✓"}</div>{" "}<div className="body">{" "}<ul>{" "}<li>{" 規制要件（例: 説明責任・監査・データ保持）を "}<strong>{"要件表に落とし"}</strong>{"、各要件をどの AWS 機能で満たすかを対応づける。 "}</li>{" "}<li>{" ログは "}<strong>{"改ざん耐性"}</strong>{"（アクセス制御、S3 オブジェクトロック等）と "}<strong>{"保持期間"}</strong>{"を設計する。 "}</li>{" "}<li>{" モデルカード・リネージ・ログは "}<strong>{"自動生成"}</strong>{"し、手作業に依存しない。 "}</li>{" "}</ul>{" "}</div>{" "}</div>
{" "}
<h3 id="sec-11-5" tabIndex={-1}>{"11-5. 試験の着眼点"}</h3>
{" "}
<p>{" 「モデルの制限や用途を "}<strong>{"文書化し自動更新"}</strong>{"」→ "}<strong>{"SageMaker モデルカード（プログラマティック）"}</strong>{"。「データがどこから来たか追跡」→ "}<strong>{"Glue（Data Catalog／リネージ）+ メタデータタグ"}</strong>{"。 "}</p>
{" "}
<p><strong>{"参考 URL"}</strong></p>
{" "}
<ul>{" "}<li>{" SageMaker モデルカード: "}<a href="https://docs.aws.amazon.com/sagemaker/latest/dg/model-cards.html">{"https://docs.aws.amazon.com/sagemaker/latest/dg/model-cards.html"}</a>{" "}</li>{" "}<li>{" AWS Glue Data Catalog: "}<a href="https://docs.aws.amazon.com/glue/latest/dg/catalog-and-crawler.html">{"https://docs.aws.amazon.com/glue/latest/dg/catalog-and-crawler.html"}</a>{" "}</li>{" "}<li>{" Bedrock のモデル呼び出しログ: "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html"}</a>{" "}</li>{" "}<li>{" AWS Artifact（コンプライアンスレポート）: "}<a href="https://docs.aws.amazon.com/artifact/latest/ug/what-is-aws-artifact.html">{"https://docs.aws.amazon.com/artifact/latest/ug/what-is-aws-artifact.html"}</a>{" "}</li>{" "}</ul>
{" "}
<hr  />
{" "}
<h2 id="step-12" tabIndex={-1}>{"Step 12. データソース追跡（Skill 3.3.2）"}</h2>
{" "}
<p>{" "}<strong>{"Skill 3.3.2"}</strong>{": GenAI アプリケーションのトレーサビリティを維持するデータソース追跡を実装する（AWS Glue Data Catalog によるデータソース登録、FM 生成コンテンツの出典帰属のためのメタデータタグ付け、CloudTrail による監査ログ）。 "}</p>
{" "}
<h3 id="sec-12-1" tabIndex={-1}>{"12-1. 追跡したい問い"}</h3>
{" "}
<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">{"問い"}</th><th scope="col">{"答えの出どころ"}</th></tr></thead><tbody><tr className="odd"><td>{"この回答の根拠文書はどれか"}</td><td>{"引用情報（出典メタデータ）、KB のチャンクメタデータ"}</td></tr><tr className="even"><td>{"その文書の所有者・機密度・更新日は"}</td><td>{"Glue Data Catalog、メタデータタグ"}</td></tr><tr className="odd"><td>{"誰がいつ Bedrock API を呼んだか"}</td><td>{"CloudTrail"}</td></tr><tr className="even"><td>{"誰がデータソースを変更したか"}</td><td>{"CloudTrail（管理イベント／データイベント）"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="sec-12-2" tabIndex={-1}>{"12-2. 3 つの仕組みの役割分担"}</h3>
{" "}
<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">{"仕組み"}</th><th scope="col">{"役割"}</th><th scope="col">{"例"}</th></tr></thead><tbody><tr className="odd"><td>{"Glue Data Catalog"}</td><td>{"データソースの "}<strong>{"登録台帳"}</strong></td><td>{"テーブル／パーティションの定義、所有者・分類のプロパティ"}</td></tr><tr className="even"><td>{"メタデータタグ"}</td><td>{"生成コンテンツに "}<strong>{"出典を紐づける"}</strong></td><td>{" ドキュメントごとに source、owner、classification、version を付与 "}</td></tr><tr className="odd"><td>{"CloudTrail"}</td><td><strong>{"操作の監査証跡"}</strong></td><td>{" Bedrock の API 呼び出し、IAM ロール引き受け、S3 データイベント "}</td></tr></tbody></table>{" "}</div>
{" "}
<Diagram id="diag-13" label="12-2. 3 つの仕組みの役割分担" />
{" "}
<h3 id="sec-12-3" tabIndex={-1}>{"12-3. ベストプラクティス"}</h3>
{" "}
<div className="callout-practice">{" "}<div className="icon">{"✓"}</div>{" "}<div className="body">{" "}<ul>{" "}<li>{" 取り込み時に "}<strong>{"必須メタデータ（出所・所有者・機密度・有効期限）を強制"}</strong>{"し、欠けた文書は取り込まない。 "}</li>{" "}<li>{" 回答には "}<strong>{"出典 ID・タイトル・取得日"}</strong>{"を含めて返す。 "}</li>{" "}<li>{" "}<strong>{"メタデータで検索を絞る"}</strong>{"（例: 機密度が内部限定の文書は一般ユーザーの検索から除外）。 "}</li>{" "}<li>{" CloudTrail は "}<strong>{"全リージョン／組織全体"}</strong>{"で有効にし、S3 に集約・保護する。Bedrock の推論本文は CloudTrail ではなく "}<strong>{"モデル呼び出しログ"}</strong>{"に記録する点に注意。 "}</li>{" "}<li>{" "}<code>{"InvokeAgent"}</code>{"・"}<code>{"Retrieve"}</code>{"・"}<code>{"RetrieveAndGenerate"}</code>{" などの Bedrock ランタイム操作は CloudTrail の "}<strong>{"データイベント"}</strong>{"であり、"}<strong>{"デフォルトでは記録されない"}</strong>{"。監査証跡に含めるには、証跡（またはイベントデータストア）で対象の Bedrock リソースタイプ（例: "}<code>{"AWS::Bedrock::AgentAlias"}</code>{"、"}<code>{"AWS::Bedrock::KnowledgeBase"}</code>{"）の "}<strong>{"データイベントセレクター（高度なイベントセレクター）を有効化"}</strong>{"する。 "}</li>{" "}<li>{" データソース削除・更新時に "}<strong>{"古いチャンクが検索に残らない"}</strong>{"よう同期を設計する。 "}</li>{" "}</ul>{" "}</div>{" "}</div>
{" "}
<h3 id="sec-12-4" tabIndex={-1}>{"12-4. 試験の着眼点"}</h3>
{" "}
<p>{" 「回答に使った情報の出所を示す」→ "}<strong>{"メタデータ＋引用"}</strong>{"。「誰が何をしたかを監査」→ "}<strong>{"CloudTrail"}</strong>{"。「データソースの台帳」→ "}<strong>{"Glue Data Catalog"}</strong>{"。 "}</p>
{" "}
<p><strong>{"参考 URL"}</strong></p>
{" "}
<ul>{" "}<li>{" Glue Data Catalog: "}<a href="https://docs.aws.amazon.com/glue/latest/dg/catalog-and-crawler.html">{"https://docs.aws.amazon.com/glue/latest/dg/catalog-and-crawler.html"}</a>{" "}</li>{" "}<li>{" CloudTrail による Bedrock のログ記録: "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/logging-using-cloudtrail.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/logging-using-cloudtrail.html"}</a>{" "}</li>{" "}<li>{" Knowledge Bases: "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html"}</a>{" "}</li>{" "}<li>{" CloudTrail ユーザーガイド: "}<a href="https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html">{"https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html"}</a>{" "}</li>{" "}</ul>
{" "}
<hr  />
{" "}
<h2 id="step-13" tabIndex={-1}>{"Step 13. 組織ガバナンス（Skill 3.3.3）"}</h2>
{" "}
<p>{" "}<strong>{"Skill 3.3.3"}</strong>{": FM 実装に対する一貫した監督を確保する組織的ガバナンスシステムを作成する（組織ポリシー、規制要件、責任ある AI 原則に整合する包括的フレームワークの利用）。 "}</p>
{" "}
<h3 id="sec-13-1" tabIndex={-1}>{"13-1. ガバナンスとは"}</h3>
{" "}
<p>{" 「技術」ではなく "}<strong>{"ルールと責任の仕組み"}</strong>{"です。ただし試験では、"}<strong>{"そのルールを AWS の機能で自動的に強制する"}</strong>{"設計が問われます。 "}</p>
{" "}
<h3 id="sec-13-2" tabIndex={-1}>{"13-2. 3 つのレイヤー"}</h3>
{" "}
<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">{"レイヤー"}</th><th scope="col">{"内容"}</th><th scope="col">{"例"}</th></tr></thead><tbody><tr className="odd"><td>{"ポリシー（方針）"}</td><td>{"許可するモデル・用途・データ分類、禁止事項、責任の分担"}</td><td>{" AI 利用ポリシー、データ分類基準、承認プロセス（レビュー委員会） "}</td></tr><tr className="even"><td>{"強制（ガードレール）"}</td><td>{"ルールを技術で守らせる"}</td><td>{" IAM ポリシー条件、SCP（組織単位の権限上限）、"}<code>{"bedrock:GuardrailIdentifier"}</code>{" の強制、タグポリシー "}</td></tr><tr className="odd"><td>{"証跡（監査）"}</td><td>{"守られている証拠"}</td><td>{"CloudTrail、AWS Config、モデルカード、意思決定ログ"}</td></tr></tbody></table>{" "}</div>
{" "}
<Diagram id="diag-14" label="13-2. 3 つのレイヤー" />
{" "}
<h3 id="sec-13-3" tabIndex={-1}>{"13-3. 役割分担の例"}</h3>
{" "}
<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">{"役割"}</th><th scope="col">{"責任"}</th></tr></thead><tbody><tr className="odd"><td>{"AI ガバナンス委員会"}</td><td>{"方針の策定、高リスク用途の承認"}</td></tr><tr className="even"><td>{"プラットフォームチーム"}</td><td>{"ガードレール・SCP・共通基盤の提供"}</td></tr><tr className="odd"><td>{"アプリ開発チーム"}</td><td>{"方針に沿った実装、モデルカード更新"}</td></tr><tr className="even"><td>{"セキュリティ／監査"}</td><td>{"証跡の検証、インシデント対応"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="sec-13-4" tabIndex={-1}>{"13-4. ベストプラクティス"}</h3>
{" "}
<div className="callout-practice">{" "}<div className="icon">{"✓"}</div>{" "}<div className="body">{" "}<ul>{" "}<li>{" 方針は "}<strong>{"文書だけにせず、技術的な統制に落とし込む"}</strong>{"。"}<strong>{"SCP／IAM は違反操作を防ぐ予防的統制"}</strong>{"として強制し、"}<strong>{"AWS Config ルールは非準拠を検出・報告する発見的統制"}</strong>{"として使う（自動修復は Config の修復アクション等を別途設定した場合のみ）。 "}</li>{" "}<li>{" 用途を "}<strong>{"リスク別に分類"}</strong>{"（低・中・高）し、高リスクは人手承認を必須にする。 "}</li>{" "}<li>{"例外を認める場合は "}<strong>{"期限付き・記録付き"}</strong>{"にする。"}</li>{" "}<li>{" 規制・社内ポリシーの変更に合わせて "}<strong>{"定期見直し"}</strong>{"を行う。 "}</li>{" "}</ul>{" "}</div>{" "}</div>
{" "}
<h3 id="sec-13-5" tabIndex={-1}>{"13-5. 試験の着眼点"}</h3>
{" "}
<p>{" この Skill は具体サービスの指定が少なく、"}<strong>{"「方針 → 技術的強制 → 証跡」の一貫性"}</strong>{"を選ぶ設問になりやすい。複数組織・アカウントなら "}<strong>{"AWS Organizations の SCP"}</strong>{" で上限を設ける発想を持つ。 "}</p>
{" "}
<p><strong>{"参考 URL"}</strong></p>
{" "}
<ul>{" "}<li>{" AWS Responsible AI: "}<a href="https://aws.amazon.com/ai/responsible-ai/">{"https://aws.amazon.com/ai/responsible-ai/"}</a>{" "}</li>{" "}<li>{" AWS Well-Architected Responsible AI Lens: "}<a href="https://docs.aws.amazon.com/wellarchitected/latest/responsible-ai-lens/responsible-ai-lens.html">{"https://docs.aws.amazon.com/wellarchitected/latest/responsible-ai-lens/responsible-ai-lens.html"}</a>{" "}</li>{" "}<li>{" AWS Organizations SCP: "}<a href="https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html">{"https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html"}</a>{" "}</li>{" "}<li>{" ガードレール強制: "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-permissions-id.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-permissions-id.html"}</a>{" "}</li>{" "}<li>{" NIST AI Risk Management Framework: "}<a href="https://www.nist.gov/itl/ai-risk-management-framework">{"https://www.nist.gov/itl/ai-risk-management-framework"}</a>{" "}</li>{" "}</ul>
{" "}
<hr  />
{" "}
<h2 id="step-14" tabIndex={-1}>{"Step 14. 継続監視と高度なガバナンス統制（Skill 3.3.4）"}</h2>
{" "}
<p>{" "}<strong>{"Skill 3.3.4"}</strong>{": 安全性監査と規制対応を支える継続的な監視と高度なガバナンス統制を実装する（誤用・ドリフト・ポリシー違反の自動検出、バイアスドリフト監視、自動アラートと修復ワークフロー、トークンレベルのレダクション、応答ログ、AI 出力ポリシーフィルター）。 "}</p>
{" "}
<h3 id="sec-14-1" tabIndex={-1}>{"14-1. 何を監視するか"}</h3>
{" "}
<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">{"監視対象"}</th><th scope="col">{"内容"}</th><th scope="col">{"手段"}</th></tr></thead><tbody><tr className="odd"><td>{"誤用"}</td><td>{" 異常に多い呼び出し、攻撃的入力の急増、特定ユーザーの集中的なブロック "}</td><td>{"CloudWatch メトリクス／ログのメトリクスフィルター、アラーム"}</td></tr><tr className="even"><td>{"ドリフト"}</td><td>{"入力分布や回答品質の変化"}</td><td>{"定期評価ジョブ、品質メトリクスの推移"}</td></tr><tr className="odd"><td>{"ポリシー違反"}</td><td>{"ガードレール発動、禁止話題、機密漏えい"}</td><td>{"Guardrails のトレース／ログ、モデル呼び出しログ"}</td></tr><tr className="even"><td>{"バイアスドリフト"}</td><td>{"属性間で出力の偏りが時間とともに拡大"}</td><td>{" 公平性メトリクスの定期計測（新規利用は Bedrock Evaluations の Stereotyping 等の指標や、pandas / scikit-learn での標準バイアス指標計算を CloudWatch へ送る。SageMaker Clarify は新規顧客の受付を終了し、既存顧客のみ利用可） "}</td></tr><tr className="odd"><td>{"コスト・利用量"}</td><td>{"想定外のトークン増加"}</td><td>{"CloudWatch、請求アラーム"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="sec-14-2" tabIndex={-1}>{"14-2. 自動検知から修復までの流れ"}</h3>
{" "}
<Diagram id="diag-15" label="14-2. 自動検知から修復までの流れ" />
{" "}
<h3 id="sec-14-3" tabIndex={-1}>{"14-3. トークンレベルのレダクションと出力ポリシーフィルター"}</h3>
{" "}
<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">{"機能"}</th><th scope="col">{"内容"}</th><th scope="col">{"補足"}</th></tr></thead><tbody><tr className="odd"><td>{"トークンレベルのレダクション"}</td><td>{" 出力のうち "}<strong>{"機密に該当する部分だけ"}</strong>{"を伏せ、他は返す "}</td><td>{" Guardrails の機密情報フィルターのマスク。ストリーミングでは "}<strong>{"非同期モードは PII マスキングに非対応"}</strong>{" のため、マスクが必要なら同期モードを使う "}</td></tr><tr className="even"><td>{"応答ログ"}</td><td>{"応答と判定の証跡を保存"}</td><td>{" モデル呼び出しログ + CloudWatch Logs。CloudWatch Logs のデータ保護ポリシーは"}<strong>{"閲覧時のマスク"}</strong>{"で、生値は保存され "}<code>{"logs:Unmask"}</code>{" 権限で確認できる。アプリ側の除去が効くのは"}<strong>{"アプリ管理ログのみ"}</strong>{"で、Bedrock 管理のモデル呼び出しログは書き換えられない。生の PII を残さないなら"}<strong>{"入力は呼び出し前にサニタイズ"}</strong>{"し、出力対策として"}<strong>{"呼び出しログのコンテンツ出力を無効化"}</strong>{"してマスク済みのアプリ管理ログを使う "}</td></tr><tr className="odd"><td>{"AI 出力ポリシーフィルター"}</td><td>{"組織ポリシー（禁止助言、免責の必須挿入など）の出力検査"}</td><td>{"Guardrails（Denied topics 等）+ Lambda 後処理"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="sec-14-4" tabIndex={-1}>{"14-4. ベストプラクティス"}</h3>
{" "}
<div className="callout-practice">{" "}<div className="icon">{"✓"}</div>{" "}<div className="body">{" "}<ul>{" "}<li>{" "}<strong>{"「検知 → 通知 → 自動修復 → 記録」"}</strong>{"を 1 本のパイプラインにする。人手だけに頼らない。 "}</li>{" "}<li>{" アラートは "}<strong>{"誤検知疲れを避ける"}</strong>{"ため、重大度で分け、閾値を定期調整する。 "}</li>{" "}<li>{" Guardrails の "}<strong>{"ブロック率・誤検出率"}</strong>{"を継続指標にする。急変は攻撃か設定劣化のサイン。 "}</li>{" "}<li>{" "}<strong>{"Bedrock のモデルは提供元の更新で挙動が変わる"}</strong>{"ことがあるため、定期評価で品質・安全性の変化を拾う。 "}</li>{" "}<li>{" 自動修復は "}<strong>{"影響範囲を絞る"}</strong>{"（まずは一時制限・通知から）。 "}</li>{" "}</ul>{" "}</div>{" "}</div>
{" "}
<h3 id="sec-14-5" tabIndex={-1}>{"14-5. 試験の着眼点"}</h3>
{" "}
<p>{" 「ポリシー違反を自動検知して即時対応」→ "}<strong>{"CloudWatch + EventBridge + Lambda/Step Functions"}</strong>{"。「出力中の PII だけを伏せたい」→ "}<strong>{"Guardrails の機密情報マスク"}</strong>{"。「バイアスが時間とともに悪化していないか」→ "}<strong>{"公平性メトリクスの継続監視（バイアスドリフト）"}</strong>{"。 "}</p>
{" "}
<p><strong>{"参考 URL"}</strong></p>
{" "}
<ul>{" "}<li>{" モデル呼び出しログ: "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html"}</a>{" "}</li>{" "}<li>{" CloudWatch Logs のデータ保護（マスキング）: "}<a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/mask-sensitive-log-data.html">{"https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/mask-sensitive-log-data.html"}</a>{" "}</li>{" "}<li>{" Amazon EventBridge: "}<a href="https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html">{"https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html"}</a>{" "}</li>{" "}<li>{" SageMaker Clarify（公平性・説明可能性、既存顧客のみ）: "}<a href="https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-fairness-and-explainability.html">{"https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-fairness-and-explainability.html"}</a>{" "}</li>{" "}<li>{" Clarify の提供状況と代替手段: "}<a href="https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-availability-change.html">{"https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-availability-change.html"}</a>{" "}</li>{" "}<li>{" Guardrails: "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html"}</a>{" "}</li>{" "}</ul>
{" "}
<hr  />
{" "}</div>; }
