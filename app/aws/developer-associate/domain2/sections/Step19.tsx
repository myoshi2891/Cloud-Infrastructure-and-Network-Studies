import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** 原本のStep 19　シークレット管理サービスの活用（Skill 2.3.3）を省略せず収録。 */
export function Step19() { return (<section className="section">
<h2 id="step-19" tabIndex={-1}>{"Step 19 シークレット管理サービスの活用（Skill 2.3.3）"}</h2>
{" "}
<h3>{"試験で問われること"}</h3>
{" "}
<p><strong>{"「シークレット管理サービスを使って機密データを保護する」"}</strong>{"："}<strong>{"Secrets ManagerとParameter Storeの使い分け"}</strong>{"が最頻出。"}</p>
{" "}
<h3>{"19-1 シークレットを「コードに書かない」理由"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 85">
<table>

<thead>

<tr>

<th scope="col">{"ありがちな悪い例"}</th>

<th scope="col">{"リスク"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"ソースコードに直書き"}</td>

<td>{"Git履歴に残る、リポジトリ共有で流出"}</td>

</tr>

<tr>

<td>{"設定ファイルをリポジトリにコミット"}</td>

<td>{"同上"}</td>

</tr>

<tr>

<td>{"平文の環境変数"}</td>

<td>{"コンソールやログで漏れる"}</td>

</tr>

<tr>

<td>{"全環境で同じパスワード"}</td>

<td>{"1か所の漏洩が全体に波及"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"19-2 AWS Secrets Manager"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 86">
<table>

<thead>

<tr>

<th scope="col">{"項目"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"目的"}</td>

<td>{"DB認証情報、APIキー、OAuthトークンなどの"}<strong>{"保管・取得・ローテーション"}</strong></td>

</tr>

<tr>

<td>{"暗号化"}</td>

<td><strong>{"KMSで暗号化"}</strong>{"（既定はAWSマネージドキー"}<code>{"aws/secretsmanager"}</code>{"、カスタマーマネージドキーも指定可）"}</td>

</tr>

<tr>

<td><strong>{"自動ローテーション"}</strong></td>

<td><strong>{"Lambda関数"}</strong>{"でスケジュール実行（RDS／Aurora／Redshift等はマネージドローテーションあり）"}</td>

</tr>

<tr>

<td>{"バージョン管理"}</td>

<td><strong>{"ステージングラベル"}</strong>{"（"}<code>{"AWSCURRENT"}</code>{"、"}<code>{"AWSPREVIOUS"}</code>{"、"}<code>{"AWSPENDING"}</code>{"）"}</td>

</tr>

<tr>

<td>{"アクセス制御"}</td>

<td>{"IAMポリシー＋"}<strong>{"リソースポリシー"}</strong>{"（クロスアカウント共有に対応）"}</td>

</tr>

<tr>

<td>{"レプリケーション"}</td>

<td>{"複数リージョンへのレプリケーション可能"}</td>

</tr>

<tr>

<td>{"料金"}</td>

<td>{"シークレットごと＋API呼び出しごとの従量課金"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"19-3 AWS Systems Manager Parameter Store"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 87">
<table>

<thead>

<tr>

<th scope="col">{"項目"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"目的"}</td>

<td>{"設定値（接続先、フラグ）と、"}<strong>{"SecureString"}</strong>{"による機密値の保管"}</td>

</tr>

<tr>

<td>{"暗号化"}</td>

<td><strong>{"SecureString"}</strong>{"はKMSで暗号化（"}<code>{"String"}</code>{"／"}<code>{"StringList"}</code>{"は平文）"}</td>

</tr>

<tr>

<td>{"ローテーション"}</td>

<td><strong>{"自動ローテーション機能なし"}</strong>{"（自前で実装）"}</td>

</tr>

<tr>

<td>{"階層"}</td>

<td><code>{"/app/prod/db/host"}</code>{"のようなパス階層で整理・IAMで権限を階層単位に付与"}</td>

</tr>

<tr>

<td>{"料金"}</td>

<td><strong>{"標準パラメータは無料"}</strong>{"、高度なパラメータ（大きな値・ポリシー）は有料"}</td>

</tr>

<tr>

<td>{"用途"}</td>

<td>{"設定管理と、頻繁にローテーションしない機密値"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"19-4 どちらを選ぶ？（最重要）"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 88">
<table>

<thead>

<tr>

<th scope="col">{"観点"}</th>

<th scope="col"><strong>{"Secrets Manager"}</strong></th>

<th scope="col"><strong>{"Parameter Store"}</strong></th>

</tr>

</thead>

<tbody>

<tr>

<td>{"自動ローテーション"}</td>

<td><strong>{"あり"}</strong>{"（Lambda／マネージド）"}</td>

<td>{"なし"}</td>

</tr>

<tr>

<td>{"主な用途"}</td>

<td><strong>{"DB認証情報・APIキーなどの機密"}</strong></td>

<td>{"設定値全般＋機密（SecureString）"}</td>

</tr>

<tr>

<td>{"コスト"}</td>

<td>{"有料"}</td>

<td>{"標準は無料"}</td>

</tr>

<tr>

<td>{"クロスアカウント共有"}</td>

<td>{"リソースポリシーで可（カスタマーマネージドキー要）"}</td>

<td>{"高度なパラメータで可（制約あり）"}</td>

</tr>

<tr>

<td>{"暗号化"}</td>

<td>{"常にKMS"}</td>

<td>{"SecureStringのみKMS"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<div className="diagram-card">
<Diagram index={26} label="Step 19　シークレット管理サービスの活用（Skill 2.3.3）の図解" />
</div>
{" "}
<h3>{"19-5 Secrets Managerの自動ローテーションの仕組み"}</h3>
{" "}
<p>{"ローテーションLambdaは、"}<strong>{"4つのステップ"}</strong>{"を実行します。"}</p>
{" "}
<div className="diagram-card">
<Diagram index={27} label="Step 19　シークレット管理サービスの活用（Skill 2.3.3）の図解" />
</div>
{" "}
<ul>
{" "}
<li>{"アプリは常に**"}<code>{"AWSCURRENT"}</code>{"**を取得すれば、最新の値を使えます。"}</li>
{" "}
<li>{"ローテーションが有効でも、"}<strong>{"キャッシュした古い値を使い続けない"}</strong>{"ようにアプリを作ります。"}</li>
{" "}
<li>{"ローテーションLambdaがDBに到達するには、VPC内の接続設定（ネットワーク）が必要な場合があります。"}</li>
{" "}
</ul>
{" "}
<h3>{"19-6 取得のコード例"}</h3>
{" "}
<p><strong>{"Secrets Manager"}</strong></p>
{" "}
<CodeBlock index={28} language="python" lines={["import json","import boto3","","client = boto3.client(\"secretsmanager\", region_name=\"ap-northeast-1\")","resp = client.get_secret_value(SecretId=\"prod/db/credentials\")","creds = json.loads(resp[\"SecretString\"])","# creds[\"username\"], creds[\"password\"] を使って接続"]} />
{" "}
<p><strong>{"Parameter Store（SecureString）"}</strong></p>
{" "}
<CodeBlock index={29} language="python" lines={["import boto3","","ssm = boto3.client(\"ssm\")","resp = ssm.get_parameter(Name=\"/myapp/prod/api-key\", WithDecryption=True)","api_key = resp[\"Parameter\"][\"Value\"]"]} />
{" "}
<p><strong>{"CLI"}</strong></p>
{" "}
<CodeBlock index={30} language="bash" lines={["aws secretsmanager get-secret-value --secret-id prod/db/credentials","aws ssm get-parameter --name /myapp/prod/api-key --with-decryption"]} />
{" "}
<h3>{"19-7 最小権限のIAMポリシー例（アプリ側）"}</h3>
{" "}
<CodeBlock index={31} language="json" lines={["{","  \"Version\": \"2012-10-17\",","  \"Statement\": [","    {","      \"Effect\": \"Allow\",","      \"Action\": \"secretsmanager:GetSecretValue\",","      \"Resource\": \"arn:aws:secretsmanager:ap-northeast-1:111122223333:secret:prod/db/credentials-*\"","    },","    {","      \"Effect\": \"Allow\",","      \"Action\": \"kms:Decrypt\",","      \"Resource\": \"arn:aws:kms:ap-northeast-1:111122223333:key/1234abcd-12ab-34cd-56ef-1234567890ab\"","    }","  ]","}"]} />
{" "}
<blockquote>{" "}<p>{"カスタマーマネージドキーで暗号化したシークレットは、"}<strong><code>{"secretsmanager:GetSecretValue"}</code>{"と"}<code>{"kms:Decrypt"}</code>{"の両方"}</strong>{"が必要です（Step 11の落とし穴）。"}</p>{" "}</blockquote>
{" "}
<h3>{"19-8 ベストプラクティス"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 89">
<table>

<thead>

<tr>

<th scope="col">{"#"}</th>

<th scope="col">{"ベストプラクティス"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"1"}</td>

<td><strong>{"シークレットをコード・Git・平文ファイルに置かない"}</strong></td>

</tr>

<tr>

<td>{"2"}</td>

<td>{"DB認証情報・APIキーは"}<strong>{"Secrets Managerで自動ローテーション"}</strong></td>

</tr>

<tr>

<td>{"3"}</td>

<td>{"環境ごと（dev／stg／prod）に"}<strong>{"シークレットと権限を分離"}</strong></td>

</tr>

<tr>

<td>{"4"}</td>

<td><strong>{"最小権限"}</strong>{"："}<code>{"GetSecretValue"}</code>{"を"}<strong>{"特定のシークレットARNだけ"}</strong>{"に付与"}</td>

</tr>

<tr>

<td>{"5"}</td>

<td>{"実行時に取得して"}<strong>{"キャッシュ"}</strong>{"（有効期限を設定）。取得の失敗時の再試行も考慮"}</td>

</tr>

<tr>

<td>{"6"}</td>

<td>{"シークレットの"}<strong>{"値をログ・例外メッセージに出さない"}</strong></td>

</tr>

<tr>

<td>{"7"}</td>

<td>{"CloudTrailで"}<code>{"GetSecretValue"}</code>{"を監査、不審なアクセスをアラート"}</td>

</tr>

<tr>

<td>{"8"}</td>

<td><strong>{"漏洩が疑われたら即ローテーション"}</strong></td>

</tr>

<tr>

<td>{"9"}</td>

<td>{"漏洩を防ぐため、コミット前のシークレットスキャン（git-secretsなど）を導入"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"試験のひっかけ"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 90">
<table>

<thead>

<tr>

<th scope="col">{"問い"}</th>

<th scope="col">{"答え"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"RDSのパスワードを"}<strong>{"自動で定期変更"}</strong>{"したい"}</td>

<td><strong>{"Secrets Manager"}</strong></td>

</tr>

<tr>

<td>{"低コストで設定値を階層管理"}</td>

<td><strong>{"Parameter Store（標準）"}</strong></td>

</tr>

<tr>

<td>{"Parameter Storeで自動ローテーション"}</td>

<td><strong>{"不可"}</strong>{"（自前実装）"}</td>

</tr>

<tr>

<td>{"他アカウントとシークレットを共有"}</td>

<td>{"Secrets Managerの"}<strong>{"リソースポリシー＋カスタマーマネージドキー"}</strong></td>

</tr>

<tr>

<td>{"最新のシークレットを取得"}</td>

<td>{"ステージングラベル**"}<code>{"AWSCURRENT"}</code>{"**"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"根拠ソース"}</h3>
{" "}
<ul>
{" "}
<li>{"AWS Secrets Managerとは："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html">{"https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html"}</a></li>
{" "}
<li>{"シークレットのローテーション："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html">{"https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html"}</a></li>
{" "}
<li>{"Lambdaによるローテーション関数："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotate-secrets_lambda.html">{"https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotate-secrets_lambda.html"}</a></li>
{" "}
<li>{"Secrets Managerのベストプラクティス："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/secretsmanager/latest/userguide/best-practices.html">{"https://docs.aws.amazon.com/secretsmanager/latest/userguide/best-practices.html"}</a></li>
{" "}
<li>{"Systems Manager Parameter Store："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html">{"https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html"}</a></li>
{" "}
<li>{"Powertools for AWS Lambda（パラメータ取得・キャッシュ）："}<a target="_blank" rel="noopener" href="https://docs.powertools.aws.dev/lambda/python/latest/utilities/parameters/">{"https://docs.powertools.aws.dev/lambda/python/latest/utilities/parameters/"}</a></li>
{" "}
<li>{"git-secrets（awslabs）："}<a target="_blank" rel="noopener" href="https://github.com/awslabs/git-secrets">{"https://github.com/awslabs/git-secrets"}</a></li>
{" "}
</ul>
{" "}
<hr />
{" "}
</section>); }
