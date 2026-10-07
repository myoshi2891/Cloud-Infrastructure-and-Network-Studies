import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** 原本のStep 15　アカウントをまたぐ暗号化（Skill 2.2.6）を省略せず収録。 */
export function Step15() { return (<section className="section">
<h2 id="step-15" tabIndex={-1}>{"Step 15 アカウントをまたぐ暗号化（Skill 2.2.6）"}</h2>
{" "}
<h3>{"試験で問われること"}</h3>
{" "}
<p><strong>{"「アカウント境界をまたいで暗号化を使用する」"}</strong>{"：別アカウントのKMSキー・暗号化データを共有する条件。"}</p>
{" "}
<h3>{"15-1 基本ルール："}<strong>{"両方の許可が必要"}</strong></h3>
{" "}
<p>{"別アカウントのKMSキーを使うには、次の"}<strong>{"2つがそろう"}</strong>{"必要があります。"}</p>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col">{"場所"}</th>

<th scope="col">{"必要な設定"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"キー所有アカウントA"}</strong>{"：鍵ポリシー"}</td>

<td>{"アカウントB（またはBのロール）に"}<code>{"kms:Decrypt"}</code>{"等を許可"}</td>

</tr>

<tr>

<td><strong>{"利用アカウントB"}</strong>{"：IAMポリシー"}</td>

<td>{"Bのロールに、AのキーARNへの"}<code>{"kms:Decrypt"}</code>{"等を許可"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<div className="diagram-card">
<Diagram index={19} label="Step 15　アカウントをまたぐ暗号化（Skill 2.2.6）の図解" />
</div>
{" "}
<h3>{"15-2 鍵ポリシー（アカウントA側）の例"}</h3>
{" "}
<CodeBlock language="json" lines={["{","  \"Sid\": \"AllowAccountBUse\",","  \"Effect\": \"Allow\",","  \"Principal\": { \"AWS\": \"arn:aws:iam::222233334444:role/PartnerReaderRole\" },","  \"Action\": [\"kms:Decrypt\", \"kms:DescribeKey\"],","  \"Resource\": \"*\"","}"]} />
{" "}
<h3>{"15-3 利用側（アカウントB）のIAMポリシー例"}</h3>
{" "}
<CodeBlock language="json" lines={["{","  \"Effect\": \"Allow\",","  \"Action\": [\"kms:Decrypt\", \"kms:DescribeKey\"],","  \"Resource\": \"arn:aws:kms:ap-northeast-1:111122223333:key/1234abcd-12ab-34cd-56ef-1234567890ab\"","}"]} />
{" "}
<h3>{"15-4 代表的なシナリオ"}</h3>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col">{"シナリオ"}</th>

<th scope="col">{"要点"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"別アカウントのSSE-KMS暗号化S3オブジェクトを読む"}</strong></td>

<td>{"S3の権限（バケットポリシー）＋"}<strong>{"KMSキーの共有"}</strong>{"が必要"}</td>

</tr>

<tr>

<td><strong>{"暗号化EBS／RDSスナップショットの共有"}</strong></td>

<td><strong>{"カスタマーマネージドキー"}</strong>{"で暗号化し、キーも共有する"}</td>

</tr>

<tr>

<td><strong>{"Secrets Managerのシークレットを別アカウントと共有"}</strong></td>

<td><strong>{"リソースポリシー"}</strong>{"＋"}<strong>{"カスタマーマネージドキー"}</strong>{"（AWSマネージドキー"}<code>{"aws/secretsmanager"}</code>{"は共有不可）"}</td>

</tr>

<tr>

<td><strong>{"ログ配信など"}</strong></td>

<td>{"配信元サービスに鍵の使用を許可（"}<code>{"kms:ViaService"}</code>{"・"}<code>{"aws:SourceArn"}</code>{"で限定）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"15-5 重要な制約：AWSマネージドキーは共有できない"}</h3>
{" "}
<p><strong>{"AWSマネージドキー"}</strong>{"（"}<code>{"aws/s3"}</code>{"、"}<code>{"aws/ebs"}</code>{"など）は"}<strong>{"鍵ポリシーを編集できず、他アカウントに共有できません"}</strong>{"。アカウントをまたぐ暗号化が必要な場合は、"}<strong>{"カスタマーマネージドキーを使います"}</strong>{"。"}</p>
{" "}
<div className="diagram-card">
<Diagram index={20} label="Step 15　アカウントをまたぐ暗号化（Skill 2.2.6）の図解" />
</div>
{" "}
<h3>{"15-6 ベストプラクティス"}</h3>
{" "}
<div className="table-wrap">
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

<td>{"共有が必要なデータは最初から"}<strong>{"カスタマーマネージドキー"}</strong>{"で暗号化"}</td>

</tr>

<tr>

<td>{"2"}</td>

<td>{"許可は"}<strong>{"アカウント全体ではなく特定ロール"}</strong>{"に絞る"}</td>

</tr>

<tr>

<td>{"3"}</td>

<td>{"必要な操作（"}<code>{"Decrypt"}</code>{"のみ等）に"}<strong>{"限定"}</strong></td>

</tr>

<tr>

<td>{"4"}</td>

<td><code>{"kms:ViaService"}</code>{"／"}<code>{"kms:CallerAccount"}</code>{"／"}<code>{"aws:PrincipalOrgID"}</code>{"などの条件で制限"}</td>

</tr>

<tr>

<td>{"5"}</td>

<td>{"両アカウントの"}<strong>{"CloudTrail"}</strong>{"でKMS利用を監査"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"試験のひっかけ"}</h3>
{" "}
<ul>
{" "}
<li>{"「アカウントBのIAMポリシーだけ設定すれば他アカウントのキーを使える」→ "}<strong>{"誤り"}</strong>{"（鍵ポリシーも必要）。"}</li>
{" "}
<li>{"「"}<code>{"aws/s3"}</code>{"で暗号化したオブジェクトを他アカウントに共有」→ "}<strong>{"不可"}</strong>{"。"}</li>
{" "}
<li>{"「暗号化スナップショットを別アカウントへ共有」→ "}<strong>{"カスタマーマネージドキー"}</strong>{"が必須。"}</li>
{" "}
</ul>
{" "}
<h3>{"根拠ソース"}</h3>
{" "}
<ul>
{" "}
<li>{"別アカウントでのKMSキーの使用（鍵ポリシー）："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/kms/latest/developerguide/key-policy-modifying-external-accounts.html">{"https://docs.aws.amazon.com/kms/latest/developerguide/key-policy-modifying-external-accounts.html"}</a></li>
{" "}
<li>{"KMSキーへのアクセス許可の仕組み："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/kms/latest/developerguide/control-access.html">{"https://docs.aws.amazon.com/kms/latest/developerguide/control-access.html"}</a></li>
{" "}
<li>{"Secrets Managerのクロスアカウントアクセス："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/secretsmanager/latest/userguide/auth-and-access_examples_cross.html">{"https://docs.aws.amazon.com/secretsmanager/latest/userguide/auth-and-access_examples_cross.html"}</a></li>
{" "}
<li>{"EBSスナップショットの共有（暗号化）："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/ebs/latest/userguide/share-encrypted-snapshot.html">{"https://docs.aws.amazon.com/ebs/latest/userguide/share-encrypted-snapshot.html"}</a></li>
{" "}
</ul>
{" "}
<hr />
{" "}
</section>); }
