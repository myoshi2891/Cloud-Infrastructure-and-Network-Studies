import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** 原本のStep 3　IAMロールとAWS STS（Skill 2.1.5）を省略せず収録。 */
export function Step3() { return (<section className="section">
<h2 id="step-3" tabIndex={-1}>{"Step 3 IAMロールとAWS STS（Skill 2.1.5）"}</h2>
{" "}
<h3>{"試験で問われること"}</h3>
{" "}
<p><strong>{"「IAMロールを引き受ける（Assume an IAM role）」"}</strong>{"：誰が・どうやってロールを引き受け、何が返ってくるかを理解すること。"}</p>
{" "}
<h3>{"3-1 ロールとは"}</h3>
{" "}
<p>{"IAMロールは「"}<strong>{"一時的に着る制服"}</strong>{"」のようなものです。ロールには固定のパスワードやアクセスキーがありません。引き受けると、AWS STS（Security Token Service）が"}<strong>{"有効期限つきの一時認証情報"}</strong>{"を発行します。"}</p>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 10">
<table>

<thead>

<tr>

<th scope="col">{"一時認証情報の構成要素"}</th>

<th scope="col">{"説明"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"AccessKeyId"}</td>

<td>{"一時的なアクセスキーID（"}<code>{"ASIA"}</code>{"で始まる）"}</td>

</tr>

<tr>

<td>{"SecretAccessKey"}</td>

<td>{"署名用の秘密鍵"}</td>

</tr>

<tr>

<td>{"SessionToken"}</td>

<td>{"一時認証情報であることを示すトークン（必須）"}</td>

</tr>

<tr>

<td>{"Expiration"}</td>

<td>{"有効期限"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"3-2 ロールの2つのポリシー"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 11">
<table>

<thead>

<tr>

<th scope="col">{"ポリシー"}</th>

<th scope="col">{"役割"}</th>

<th scope="col">{"例"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"信頼ポリシー"}</strong></td>

<td>{"誰がこのロールを引き受けられるか"}</td>

<td><code>{"lambda.amazonaws.com"}</code>{" に許可"}</td>

</tr>

<tr>

<td><strong>{"アクセス許可ポリシー"}</strong></td>

<td>{"引き受けた後に何ができるか"}</td>

<td>{"S3の読み取りなど"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p>{"Lambdaの実行ロール用の信頼ポリシー例："}</p>
{" "}
<CodeBlock index={1} language="json" lines={["{","  \"Version\": \"2012-10-17\",","  \"Statement\": [","    {","      \"Effect\": \"Allow\",","      \"Principal\": { \"Service\": \"lambda.amazonaws.com\" },","      \"Action\": \"sts:AssumeRole\"","    }","  ]","}"]} />
{" "}
<h3>{"3-3 AssumeRoleの流れ"}</h3>
{" "}
<div className="diagram-card">
<Diagram index={4} label="Step 3　IAMロールとAWS STS（Skill 2.1.5）の図解" />
</div>
{" "}
<h3>{"3-4 STSの主なAPI"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 12">
<table>

<thead>

<tr>

<th scope="col">{"API"}</th>

<th scope="col">{"引き受ける主体"}</th>

<th scope="col">{"典型的な用途"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><code>{"AssumeRole"}</code></td>

<td>{"IAMユーザー／ロール"}</td>

<td>{"クロスアカウント、権限の一時的な切り替え"}</td>

</tr>

<tr>

<td><code>{"AssumeRoleWithWebIdentity"}</code></td>

<td>{"OIDC対応IdPのユーザー"}</td>

<td>{"Cognito、GitHub Actions、EKSのIRSA"}</td>

</tr>

<tr>

<td><code>{"AssumeRoleWithSAML"}</code></td>

<td>{"SAML 2.0のユーザー"}</td>

<td>{"企業IdPとのフェデレーション"}</td>

</tr>

<tr>

<td><code>{"GetSessionToken"}</code></td>

<td>{"IAMユーザー"}</td>

<td>{"MFA付き一時認証情報"}</td>

</tr>

<tr>

<td><code>{"GetCallerIdentity"}</code></td>

<td>{"誰でも"}</td>

<td>{"「今の自分は誰か」を確認（権限不要）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"3-5 セッション時間のポイント"}</h3>
{" "}
<ul>
{" "}
<li><code>{"AssumeRole"}</code>{"の既定のセッション時間は"}<strong>{"1時間"}</strong>{"。最小15分、最大はロールの"}<strong>{"最大セッション期間"}</strong>{"（1〜12時間の設定）まで。"}</li>
{" "}
<li><strong>{"ロールチェーン"}</strong>{"（ロールからさらに別ロールを引き受ける）の場合、セッションは"}<strong>{"最大1時間"}</strong>{"に制限される。"}</li>
{" "}
</ul>
{" "}
<h3>{"3-6 コード例"}</h3>
{" "}
<p><strong>{"CLIで確認"}</strong></p>
{" "}
<CodeBlock index={2} language="bash" lines={["# 今のIDを確認（デバッグの基本）","aws sts get-caller-identity","","# 別アカウントのロールを引き受ける","aws sts assume-role \\","  --role-arn arn:aws:iam::222233334444:role/PartnerReadRole \\","  --role-session-name dev-session \\","  --external-id my-external-id"]} />
{" "}
<p><strong>{"Python（boto3）"}</strong></p>
{" "}
<CodeBlock index={3} language="python" lines={["import boto3","","sts = boto3.client(\"sts\")","resp = sts.assume_role(","    RoleArn=\"arn:aws:iam::222233334444:role/PartnerReadRole\",","    RoleSessionName=\"dev-session\",","    ExternalId=\"my-external-id\",","    DurationSeconds=900,",")","c = resp[\"Credentials\"]","","s3 = boto3.client(","    \"s3\",","    aws_access_key_id=c[\"AccessKeyId\"],","    aws_secret_access_key=c[\"SecretAccessKey\"],","    aws_session_token=c[\"SessionToken\"],",")","print(s3.list_buckets()[\"Buckets\"])"]} />
{" "}
<h3>{"3-7 混乱した代理問題（Confused Deputy）と対策"}</h3>
{" "}
<p>{"第三者サービスにロールの引き受けを許可するとき、別の顧客がそのサービスを悪用して"}<strong>{"自分のロールを引き受けさせる"}</strong>{"リスクがあります。"}</p>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 13">
<table>

<thead>

<tr>

<th scope="col">{"対策"}</th>

<th scope="col">{"使いどころ"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><code>{"ExternalId"}</code>{"（外部ID）"}</td>

<td>{"サードパーティ（SaaSなど）にクロスアカウントロールを渡すとき"}</td>

</tr>

<tr>

<td><code>{"aws:SourceArn"}</code>{" / "}<code>{"aws:SourceAccount"}</code></td>

<td>{"AWSサービス（SNS、S3、Lambdaなど）がロールやリソースを使うとき"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"3-8 AWSサービスにロールを渡す：PassRole"}</h3>
{" "}
<p>{"LambdaやECSのタスクを作る開発者は、"}<strong>{"そのロールをサービスに「渡す」権限"}</strong>{"（"}<code>{"iam:PassRole"}</code>{"）が必要です。この権限は、渡せるロールを"}<strong>{"特定のARNに限定"}</strong>{"するのが鉄則です。"}</p>
{" "}
<CodeBlock index={4} language="json" lines={["{","  \"Effect\": \"Allow\",","  \"Action\": \"iam:PassRole\",","  \"Resource\": \"arn:aws:iam::111122223333:role/MyLambdaExecutionRole\",","  \"Condition\": { \"StringEquals\": { \"iam:PassedToService\": \"lambda.amazonaws.com\" } }","}"]} />
{" "}
<h3>{"3-9 コンピュートごとの「ロールの付け方」"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 14">
<table>

<thead>

<tr>

<th scope="col">{"実行環境"}</th>

<th scope="col">{"ロールの仕組み"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"Lambda"}</td>

<td>{"実行ロール（Execution Role）"}</td>

</tr>

<tr>

<td>{"EC2"}</td>

<td>{"インスタンスプロファイル（ロールを格納）"}</td>

</tr>

<tr>

<td>{"ECS"}</td>

<td>{"タスクロール（アプリ用）とタスク実行ロール（イメージ取得・ログ・シークレット取得用）"}</td>

</tr>

<tr>

<td>{"EKS"}</td>

<td>{"IRSA（OIDC）またはEKS Pod Identity"}</td>

</tr>

<tr>

<td>{"CodeBuild / CodePipeline"}</td>

<td>{"サービスロール"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"3-10 ベストプラクティス"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 15">
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

<td>{"アプリの認証は"}<strong>{"ロール"}</strong>{"で行い、IAMユーザーのアクセスキーを埋め込まない"}</td>

</tr>

<tr>

<td>{"2"}</td>

<td>{"信頼ポリシーの"}<code>{"Principal"}</code>{"を"}<strong>{"具体的に"}</strong>{"書く（"}<code>{"\"AWS\": \"*\""}</code>{"は避ける）"}</td>

</tr>

<tr>

<td>{"3"}</td>

<td>{"セッション時間は必要最小限にする"}</td>

</tr>

<tr>

<td>{"4"}</td>

<td>{"サードパーティには"}<code>{"ExternalId"}</code>{"を使う"}</td>

</tr>

<tr>

<td>{"5"}</td>

<td>{"ECSでは「タスクロール」と「タスク実行ロール」を混同しない"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"試験のひっかけ"}</h3>
{" "}
<ul>
{" "}
<li>{"「EC2上のアプリにアクセスキーを配る」→ ほぼ常に"}<strong>{"誤り"}</strong>{"。**インスタンスプロファイル（ロール）**が正解。"}</li>
{" "}
<li>{"「ロールにはアクセスキーがある」→ "}<strong>{"誤り"}</strong>{"。引き受け時に一時認証情報が発行される。"}</li>
{" "}
<li>{"「"}<code>{"SessionToken"}</code>{"は任意」→ "}<strong>{"誤り"}</strong>{"。一時認証情報では必須。"}</li>
{" "}
</ul>
{" "}
<h3>{"根拠ソース"}</h3>
{" "}
<ul>
{" "}
<li>{"IAMロール："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html">{"https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html"}</a></li>
{" "}
<li>{"AssumeRole API："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html">{"https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html"}</a></li>
{" "}
<li>{"混乱した代理問題："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/IAM/latest/UserGuide/confused-deputy.html">{"https://docs.aws.amazon.com/IAM/latest/UserGuide/confused-deputy.html"}</a></li>
{" "}
<li>{"Lambda実行ロール："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/lambda/latest/dg/lambda-intro-execution-role.html">{"https://docs.aws.amazon.com/lambda/latest/dg/lambda-intro-execution-role.html"}</a></li>
{" "}
<li>{"EC2のIAMロール："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html">{"https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html"}</a></li>
{" "}
<li>{"ECSタスクIAMロール："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html">{"https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html"}</a></li>
{" "}
<li>{"EKS Pod Identity："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/eks/latest/userguide/pod-identities.html">{"https://docs.aws.amazon.com/eks/latest/userguide/pod-identities.html"}</a></li>
{" "}
</ul>
{" "}
<hr />
{" "}
</section>); }
