import { Diagram } from '../Diagram';
/** 原本のtask2区分を全文・順序どおり保持する。 */
export default function Task32() { return <div className="guide-part" data-part="task2"><h2 id="task-3-2" tabIndex={-1}>{"Task 3.2 データセキュリティとプライバシー"}</h2>
{" "}
<h2 id="step-8" tabIndex={-1}>{"Step 8. 保護された AI 環境（Skill 3.2.1）"}</h2>
{" "}
<p>{" "}<strong>{"Skill 3.2.1"}</strong>{": FM デプロイメントの包括的なセキュリティを確保する保護された AI 環境を開発する（VPC エンドポイントによるネットワーク分離、IAM ポリシーによる安全なデータアクセスパターンの強制、AWS Lake Formation による詳細なデータアクセス制御、CloudWatch によるデータアクセス監視）。 "}</p>
{" "}
<h3 id="sec-8-1" tabIndex={-1}>{"8-1. Bedrock のデータ保護の前提（まず知っておく事実）"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label={"8-1. Bedrock のデータ保護の前提（まず知っておく事実）の表"}>{" "}<table><thead><tr className="header"><th scope="col">{"事実"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className="odd"><td>{"共有責任モデル"}</td><td>{"AWS が基盤を、利用者がデータ・IAM・設定を守る"}</td></tr><tr className="even"><td>{"モデルプロバイダーの分離"}</td><td>{" 各リージョンにプロバイダーごとの Model Deployment Account があり、プロバイダーはそこへアクセスできない。したがってプロバイダーはプロンプトや応答、Bedrock ログを見られない "}</td></tr><tr className="odd"><td>{"学習利用"}</td><td>{" 顧客のプロンプト・応答は基盤モデルの学習に使われず、プロバイダーとも共有されない（公式 FAQ・ドキュメントの説明） "}</td></tr><tr className="even"><td>{"通信"}</td><td>{"TLS 1.2 必須（TLS 1.3 を推奨）"}</td></tr><tr className="odd"><td>{"暗号化"}</td><td>{"保存時は AWS KMS（カスタマー管理キーの選択が可能）"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="sec-8-2" tabIndex={-1}>{"8-2. 4 つの防御面"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label={"8-2. 4 つの防御面の表"}>{" "}<table><thead><tr className="header"><th scope="col">{"防御面"}</th><th scope="col">{"目的"}</th><th scope="col">{"使うもの"}</th></tr></thead><tbody><tr className="odd"><td>{"ネットワーク"}</td><td>{"通信をインターネットに出さない"}</td><td>{" VPC インターフェイスエンドポイント（AWS PrivateLink）+ エンドポイントポリシー、セキュリティグループ "}</td></tr><tr className="even"><td>{"ID／アクセス"}</td><td>{"誰が何をできるか最小限に"}</td><td>{" IAM ロール・ポリシー、条件キー（"}<code>{"aws:SourceVpce"}</code>{"、"}<code>{"bedrock:GuardrailIdentifier"}</code>{" など） "}</td></tr><tr className="odd"><td>{"データ"}</td><td>{"行・列・タグ単位の細かい制御"}</td><td>{"AWS Lake Formation、S3 バケットポリシー、KMS"}</td></tr><tr className="even"><td>{"監視"}</td><td>{"誰がいつ何にアクセスしたか"}</td><td>{"CloudWatch、CloudTrail、モデル呼び出しログ"}</td></tr></tbody></table>{" "}</div>
{" "}
<Diagram id="diag-9" label="8-2. 4 つの防御面" />
{" "}
<h3 id="sec-8-3" tabIndex={-1}>{"8-3. Bedrock 向け VPC エンドポイント（覚える対象）"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label={"8-3. Bedrock 向け VPC エンドポイント（覚える対象）の表"}>{" "}<table><thead><tr className="header"><th scope="col">{"エンドポイント"}</th><th scope="col">{"用途"}</th></tr></thead><tbody><tr className="odd"><td>{"bedrock"}</td><td>{"管理（コントロールプレーン）API"}</td></tr><tr className="even"><td>{"bedrock-runtime"}</td><td>{"推論 API（InvokeModel、Converse など）"}</td></tr><tr className="odd"><td>{"bedrock-agent"}</td><td>{"エージェント・Knowledge Bases の管理 API"}</td></tr><tr className="even"><td>{"bedrock-agent-runtime"}</td><td>{"エージェント呼び出し・KB 検索の実行 API"}</td></tr></tbody></table>{" "}</div>
{" "}
<p>{" モデル呼び出しログは Bedrock が保存先 (S3 / CloudWatch Logs) へ配信するため、"}<strong>{"ログ配信のためだけに VPC エンドポイントを作る必要はありません"}</strong>{"。VPC 内のアプリケーションがログ保存先へ直接アクセスする (ログを読む、別の用途で書き込む) 場合に限り、"}<strong>{"S3 ゲートウェイエンドポイント"}</strong>{"や "}<strong>{"CloudWatch Logs のインターフェイスエンドポイント"}</strong>{"を用意します。 "}</p>
{" "}
<h3 id="sec-8-4" tabIndex={-1}>{"8-4. Lake Formation の位置づけ"}</h3>
{" "}
<p>{" RAG やデータ分析の元データを "}<strong>{"Glue Data Catalog 上のテーブル"}</strong>{"として管理している場合、Lake Formation で "}<strong>{"データベース／テーブル／列／行／セル"}</strong>{"単位の権限を付与できます。LF-タグを使うと「機密度」などの属性に基づく "}<strong>{"タグベースのアクセス制御（LF-TBAC）"}</strong>{" も可能です。 "}</p>
{" "}
<p>{" "}<strong>{"ポイント"}</strong>{": S3 バケットポリシーや IAM だけでは「この列だけ見せる」は難しい。"}<strong>{"細粒度なら Lake Formation"}</strong>{"。 "}</p>
{" "}
<h3 id="sec-8-5" tabIndex={-1}>{"8-5. ベストプラクティス"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label={"8-5. ベストプラクティスの表"}>{" "}<table><thead><tr className="header"><th scope="col">{"#"}</th><th scope="col">{"ベストプラクティス"}</th></tr></thead><tbody><tr className="odd"><td>{"1"}</td><td>{" Bedrock への通信は "}<strong>{"インターフェイスエンドポイント"}</strong>{"経由にし、"}<strong>{"エンドポイントポリシー"}</strong>{"で許可する操作・リソースを絞る "}</td></tr><tr className="even"><td>{"2"}</td><td>{" アプリ用 IAM ロールは "}<strong>{"用途別に分け"}</strong>{"、"}<code>{"bedrock:InvokeModel"}</code>{" の対象モデル ARN を限定する（"}<code>{"*"}</code>{" を避ける） "}</td></tr><tr className="odd"><td>{"3"}</td><td>{" "}<code>{"bedrock:GuardrailIdentifier"}</code>{" 条件でガードレール付き呼び出しを強制する "}</td></tr><tr className="even"><td>{"4"}</td><td>{" データソースの S3 とモデル呼び出しログは "}<strong>{"KMS（カスタマー管理キー）"}</strong>{" で暗号化、バケットのパブリックアクセスはブロック "}</td></tr><tr className="odd"><td>{"5"}</td><td>{" "}<strong>{"モデル呼び出しログ"}</strong>{"を有効化し、保存先へのアクセスも最小権限にする "}</td></tr><tr className="even"><td>{"6"}</td><td>{" CloudTrail で Bedrock API を記録し、異常なアクセス（深夜・大量・未知の IP）を CloudWatch で検知する "}</td></tr><tr className="odd"><td>{"7"}</td><td>{" 機密度の異なるデータは Lake Formation のタグで分け、"}<strong>{"Knowledge Base のサービスロールが読める範囲"}</strong>{"を絞る。"}<strong>{"呼び出しユーザーごとの取得範囲"}</strong>{"は、認証済み ID に基づく "}<code>{"userContext"}</code>{"（ACL 対応データソース）またはサーバー側で生成したメタデータフィルターで制御する（クライアント送信の権限フィルターは信用しない） "}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="sec-8-6" tabIndex={-1}>{"8-6. 試験の着眼点"}</h3>
{" "}
<ul>{" "}<li>{" 「トラフィックをインターネットに出さず Bedrock を呼ぶ」→ "}<strong>{"VPC インターフェイスエンドポイント（PrivateLink）"}</strong>{" "}</li>{" "}<li>{" 「列・行レベルで RAG の元データ（サービスロールが読める範囲）を制御」→ "}<strong>{"Lake Formation"}</strong>{"。「ユーザーごとに検索結果を変える」→ "}<strong>{"認証済み ID に基づく "}<code>{"userContext"}</code>{" / サーバー側メタデータフィルター"}</strong>{" "}</li>{" "}<li>{" 「プロバイダーに自分のデータが見られないか」→ "}<strong>{"見られない（Model Deployment Account の分離）"}</strong>{" "}</li>{" "}</ul>
{" "}
<p><strong>{"参考 URL"}</strong></p>
{" "}
<ul>{" "}<li>{" Bedrock のデータ保護: "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/data-protection.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/data-protection.html"}</a>{" "}</li>{" "}<li>{" VPC と PrivateLink による保護: "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/usingVPC.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/usingVPC.html"}</a>{" "}</li>{" "}<li>{" データ暗号化: "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/data-encryption.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/data-encryption.html"}</a>{" "}</li>{" "}<li>{" AWS Prescriptive Guidance（生成AI推論のセキュリティ参照アーキテクチャ）: "}<a href="https://docs.aws.amazon.com/prescriptive-guidance/latest/security-reference-architecture/gen-ai-model-inference.html">{"https://docs.aws.amazon.com/prescriptive-guidance/latest/security-reference-architecture/gen-ai-model-inference.html"}</a>{" "}</li>{" "}<li>{" Lake Formation 開発者ガイド: "}<a href="https://docs.aws.amazon.com/lake-formation/latest/dg/what-is-lake-formation.html">{"https://docs.aws.amazon.com/lake-formation/latest/dg/what-is-lake-formation.html"}</a>{" "}</li>{" "}<li>{" モデル呼び出しログ: "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html"}</a>{" "}</li>{" "}</ul>
{" "}
<hr  />
{" "}
<h2 id="step-9" tabIndex={-1}>{"Step 9. プライバシー保護システム（Skill 3.2.2）"}</h2>
{" "}
<p>{" "}<strong>{"Skill 3.2.2"}</strong>{": FM とのやり取りで機密情報を保護するプライバシー保護システムを開発する（Comprehend と Macie による PII 検出、Bedrock のネイティブなデータプライバシー機能、Guardrails による出力フィルタ、S3 ライフサイクル設定によるデータ保持ポリシー）。 "}</p>
{" "}
<h3 id="sec-9-1" tabIndex={-1}>{"9-1. PII 検出サービスの使い分け"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label={"9-1. PII 検出サービスの使い分けの表"}>{" "}<table><thead><tr className="header"><th scope="col">{"サービス"}</th><th scope="col">{"対象"}</th><th scope="col">{"得意なこと"}</th><th scope="col">{"典型的な使いどころ"}</th></tr></thead><tbody><tr className="odd"><td>{"Amazon Comprehend"}</td><td>{" テキスト（API に渡した文字列・ドキュメント）。"}<strong>{"PII 検出の対応言語は英語とスペイン語のみ"}</strong>{" "}</td><td>{" PII エンティティの検出、位置（オフセット）の取得、ラベル付け・非同期のレダクションジョブ "}</td><td>{" 英語・スペイン語のプロンプト・応答・ドキュメントのリアルタイム／バッチ検査。その他の言語は検証済みの検出器を使い、なければ処理を止める（fail closed） "}</td></tr><tr className="even"><td>{"Amazon Macie"}</td><td><strong>{"S3 に保存されたデータ"}</strong></td><td>{" S3 バケットの機密データ自動検出、検出結果（Findings）の生成、EventBridge 連携 "}</td><td>{"RAG 用ドキュメント置き場・ログ保存バケットの棚卸し"}</td></tr><tr className="odd"><td>{"Bedrock Guardrails（機密情報フィルター）"}</td><td>{"推論時の入力・出力"}</td><td>{"PII のブロック／マスク、独自の正規表現"}</td><td>{"リアルタイムの最終防御"}</td></tr></tbody></table>{" "}</div>
{" "}
<p>{" "}<strong>{"覚え方"}</strong>{": 「"}<strong>{"保存データは Macie"}</strong>{"」「"}<strong>{"流れてくるテキストは Comprehend / Guardrails"}</strong>{"」。 "}</p>
{" "}
<h3 id="sec-9-2" tabIndex={-1}>{"9-2. データのライフサイクル全体で守る"}</h3>
{" "}
<Diagram id="diag-10" label="9-2. データのライフサイクル全体で守る" />
{" "}
<h3 id="sec-9-3" tabIndex={-1}>{"9-3. S3 ライフサイクルによる保持ポリシー"}</h3>
{" "}
<p>{" プロンプトやログ、中間データを "}<strong>{"無期限に持たない"}</strong>{"ための仕組みです。 "}</p>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label={"9-3. S3 ライフサイクルによる保持ポリシーの表"}>{" "}<table><thead><tr className="header"><th scope="col">{"ルール例"}</th><th scope="col">{"効果"}</th></tr></thead><tbody><tr className="odd"><td>{"一定日数後に "}<strong>{"有効期限（Expiration）"}</strong>{" で削除"}</td><td>{"最小限の期間だけ保持（データ最小化）"}</td></tr><tr className="even"><td>{" 一定日数後に低頻度アクセス層／アーカイブ層へ "}<strong>{"移行（Transition）"}</strong>{" "}</td><td>{"保管コスト削減（法的保持が必要なデータ向け）"}</td></tr><tr className="odd"><td>{" バージョニング有効バケットの "}<strong>{"非現行バージョン"}</strong>{"を期限削除 "}</td><td>{"古い版に PII が残り続けるのを防ぐ"}</td></tr></tbody></table>{" "}</div>
{" "}
<p>{" 規制上の保持義務（最低保持期間）と、プライバシー上の最小化（できるだけ早く削除）は "}<strong>{"綱引き"}</strong>{"になる。要件を確認して期間を決める。 "}</p>
{" "}
<h3 id="sec-9-4" tabIndex={-1}>{"9-4. ベストプラクティス"}</h3>
{" "}
<div className="callout-practice">{" "}<div className="icon">{"✓"}</div>{" "}<div className="body">{" "}<ul>{" "}<li>{" "}<strong>{"収集しない・保存しない・短く持つ"}</strong>{"（データ最小化）を設計の最初に置く。 "}</li>{" "}<li>{" ログに "}<strong>{"生のプロンプト・応答を保存する場合"}</strong>{"は、保存先の暗号化・アクセス制御・保持期間を必ずセットで設計する。CloudWatch Logs のデータ保護ポリシーのマスキングは"}<strong>{"閲覧時に適用されるもので、生値はそのまま保存され、"}<code>{"logs:Unmask"}</code>{" 権限があれば確認できる"}</strong>{"。生の PII を保存したくない場合、アプリ側の除去は"}<strong>{"アプリが管理するログ"}</strong>{"にしか効かない。Bedrock のモデル呼び出しログは Bedrock が受け取った入力と返した出力をそのまま記録するため、アプリ側で後から書き換えられない。"}<strong>{"入力は Bedrock 呼び出し前にサニタイズ"}</strong>{"し、マスクされていない出力を保存してはならないワークロードでは"}<strong>{"モデル呼び出しログのテキスト（コンテンツ）出力を無効化"}</strong>{"して、マスク済みのアプリ管理ログで代替する。 "}</li>{" "}<li>{" RAG 用データは "}<strong>{"取り込む前に Macie 等で検査"}</strong>{"する。入れてしまうと全ユーザーへ漏れうる。ただし Macie が検出できるのは対応するファイル形式と、管理データ識別子またはカスタムデータ識別子で定義した PII 種別に限られる。取り込む文書の形式と PII 種別が検査対象に含まれることを確認し、含まれないものは別の検出器で検査するまで取り込まない。"}</li>{" "}<li>{" 同意・目的外利用の防止は "}<strong>{"アプリ側の設計"}</strong>{"（Bedrock が学習に使わないことと、自社内での再利用は別問題）。 "}</li>{" "}</ul>{" "}</div>{" "}</div>
{" "}
<h3 id="sec-9-5" tabIndex={-1}>{"9-5. 試験の着眼点"}</h3>
{" "}
<p>{" 「S3 の巨大なバケットに PII が含まれるか知りたい」→ "}<strong>{"Macie"}</strong>{"。「ユーザーが入力した文章中の PII をリアルタイムで検出」→ "}<strong>{"Comprehend（PII 検出は英語とスペイン語のみ）または Guardrails"}</strong>{"。非対応言語は検証済みの検出器を使い、なければ処理を止める（fail closed）。「一定期間後に自動削除」→ "}<strong>{"S3 Lifecycle"}</strong>{"。 "}</p>
{" "}
<p><strong>{"参考 URL"}</strong></p>
{" "}
<ul>{" "}<li>{" Comprehend PII: "}<a href="https://docs.aws.amazon.com/comprehend/latest/dg/how-pii.html">{"https://docs.aws.amazon.com/comprehend/latest/dg/how-pii.html"}</a>{" "}</li>{" "}<li>{" Amazon Macie: "}<a href="https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html">{"https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html"}</a>{" "}</li>{" "}<li>{" 機密情報フィルター: "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-sensitive-filters.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-sensitive-filters.html"}</a>{" "}</li>{" "}<li>{" Bedrock のデータ保持: "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/data-retention.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/data-retention.html"}</a>{" "}</li>{" "}<li>{" S3 ライフサイクル管理: "}<a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html">{"https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html"}</a>{" "}</li>{" "}<li>{" CloudWatch Logs 機密データのマスキング: "}<a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/mask-sensitive-log-data.html">{"https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/mask-sensitive-log-data.html"}</a>{" "}</li>{" "}</ul>
{" "}
<hr  />
{" "}
<h2 id="step-10" tabIndex={-1}>{"Step 10. プライバシー重視設計（Skill 3.2.3）"}</h2>
{" "}
<p>{" "}<strong>{"Skill 3.2.3"}</strong>{": FM の有用性と有効性を保ちつつユーザーのプライバシーを守る、プライバシー重視の AI システムを作成する（データマスキング技術、Comprehend による PII 検出、機密情報の匿名化戦略、Guardrails）。 "}</p>
{" "}
<h3 id="sec-10-1" tabIndex={-1}>{"10-1. 「守る」と「役に立つ」を両立する"}</h3>
{" "}
<p>{" PII を "}<strong>{"全部消す"}</strong>{"とモデルが文脈を失い、回答品質が落ちることがあります。"}<strong>{"目的に必要な情報だけ残す"}</strong>{"のがコツです。 "}</p>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label={"10-1. 「守る」と「役に立つ」を両立するの表"}>{" "}<table><thead><tr className="header"><th scope="col">{"手法"}</th><th scope="col">{"内容"}</th><th scope="col">{"長所"}</th><th scope="col">{"短所"}</th></tr></thead><tbody><tr className="odd"><td>{"削除（Redaction）"}</td><td>{"該当部分を消す"}</td><td>{"最も安全"}</td><td>{"文脈が失われる"}</td></tr><tr className="even"><td>{"マスキング"}</td><td>{"「[NAME]」「****」などに置換"}</td><td>{"文の構造を保てる"}</td><td>{"元に戻せない"}</td></tr><tr className="odd"><td>{"トークン化（仮名化）"}</td><td>{"一貫した別名・ID に置換し、対応表を安全に別保管"}</td><td>{"同一人物の文脈を保てる／必要時に復元可能"}</td><td>{"対応表の保護が必須"}</td></tr><tr className="even"><td>{"汎化"}</td><td>{"「42 歳」→「40 代」、住所→「都道府県」"}</td><td>{"統計的有用性を保つ"}</td><td>{"再識別リスクが残る場合あり"}</td></tr><tr className="odd"><td>{"匿名化"}</td><td>{"個人を特定できない形に不可逆変換"}</td><td>{"規制対応しやすい"}</td><td>{"元データの有用性が下がる"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="sec-10-2" tabIndex={-1}>{"10-2. 仮名化して推論し、表示時に復元する流れ"}</h3>
{" "}
<Diagram id="diag-11" label="10-2. 仮名化して推論し、表示時に復元する流れ" />
{" "}
<h3 id="sec-10-3" tabIndex={-1}>{"10-3. Guardrails の機密情報フィルターの使い分け"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label={"10-3. Guardrails の機密情報フィルターの使い分けの表"}>{" "}<table><thead><tr className="header"><th scope="col">{"設定"}</th><th scope="col">{"動作"}</th><th scope="col">{"向いている場面"}</th></tr></thead><tbody><tr className="odd"><td>{"ブロック"}</td><td>{"検出したら要求・応答全体を拒否"}</td><td>{"クレジットカード番号など絶対に扱わない情報"}</td></tr><tr className="even"><td>{"マスク（匿名化）"}</td><td>{"該当部分だけ置換して処理を継続"}</td><td>{"氏名・住所など、回答は返したいが伏せたい情報"}</td></tr><tr className="odd"><td>{"正規表現"}</td><td>{"独自形式（社員番号など）を検出"}</td><td>{"標準エンティティにない社内 ID"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="sec-10-4" tabIndex={-1}>{"10-4. ベストプラクティス"}</h3>
{" "}
<div className="callout-practice">{" "}<div className="icon">{"✓"}</div>{" "}<div className="body">{" "}<ul>{" "}<li>{" "}<strong>{"利用目的ごとに必要な PII を定義"}</strong>{"（目的限定）し、不要なものは入口で落とす。 "}</li>{" "}<li>{" 仮名化の "}<strong>{"対応表は最も厳しく保護"}</strong>{"（KMS 暗号化・アクセス最小化・監査）。 "}</li>{" "}<li>{" マスク後の "}<strong>{"回答品質を評価データで確認"}</strong>{"してから本番化する。 "}</li>{" "}<li>{" プライバシー設定の効果を "}<strong>{"定期テスト"}</strong>{"（PII を含むテスト入力で漏えいがないか）。 "}</li>{" "}</ul>{" "}</div>{" "}</div>
{" "}
<h3 id="sec-10-5" tabIndex={-1}>{"10-5. 試験の着眼点"}</h3>
{" "}
<p>{" 「個人情報は隠したいが、会話の文脈は保ちたい」→ "}<strong>{"マスク／仮名化（トークン化）"}</strong>{"。「絶対に通してはいけない」→ "}<strong>{"ブロック"}</strong>{"。 "}</p>
{" "}
<p><strong>{"参考 URL"}</strong></p>
{" "}
<ul>{" "}<li>{" 機密情報フィルター: "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-sensitive-filters.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-sensitive-filters.html"}</a>{" "}</li>{" "}<li>{" Comprehend PII: "}<a href="https://docs.aws.amazon.com/comprehend/latest/dg/how-pii.html">{"https://docs.aws.amazon.com/comprehend/latest/dg/how-pii.html"}</a>{" "}</li>{" "}<li>{" Bedrock のデータ保護: "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/data-protection.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/data-protection.html"}</a>{" "}</li>{" "}</ul>
{" "}
<hr  />
{" "}</div>; }
