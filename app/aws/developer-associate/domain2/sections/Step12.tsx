import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** 原本のStep 12　クライアントサイド暗号化とサーバーサイド暗号化（Skill 2.2.3）を省略せず収録。 */
export function Step12() { return (<section className="section">
<h2 id="step-12" tabIndex={-1}>{"Step 12 クライアントサイド暗号化とサーバーサイド暗号化（Skill 2.2.3）"}</h2>
{" "}
<h3>{"試験で問われること"}</h3>
{" "}
<p><strong>{"「クライアントサイド暗号化とサーバーサイド暗号化の違いを説明する」"}</strong></p>
{" "}
<h3>{"12-1 違いの核心："}<strong>{"誰が、どこで、暗号化するか"}</strong></h3>
{" "}
<div className="diagram-card">
<Diagram index={15} label="Step 12　クライアントサイド暗号化とサーバーサイド暗号化（Skill 2.2.3）の図解" />
</div>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col"></th>

<th scope="col"><strong>{"サーバーサイド暗号化（SSE）"}</strong></th>

<th scope="col"><strong>{"クライアントサイド暗号化（CSE）"}</strong></th>

</tr>

</thead>

<tbody>

<tr>

<td>{"暗号化の場所"}</td>

<td>{"AWSサービス側（保存時）"}</td>

<td><strong>{"アプリ側"}</strong>{"（送信前）"}</td>

</tr>

<tr>

<td>{"平文がAWSに届くか"}</td>

<td>{"届く（TLSで保護、サービス内で暗号化）"}</td>

<td><strong>{"届かない"}</strong>{"（常に暗号文）"}</td>

</tr>

<tr>

<td>{"鍵の管理"}</td>

<td>{"AWS（KMSなど）が行う"}</td>

<td>{"アプリが鍵を取得・管理"}</td>

</tr>

<tr>

<td>{"実装の手間"}</td>

<td>{"少ない（設定のみ）"}</td>

<td>{"多い（SDK利用が一般的）"}</td>

</tr>

<tr>

<td>{"向く場面"}</td>

<td>{"通常の要件"}</td>

<td>{"AWS側にも平文を見せたくない、"}<strong>{"特定フィールドだけ"}</strong>{"暗号化したい、規制要件"}</td>

</tr>

<tr>

<td>{"検索・クエリ"}</td>

<td>{"サービスの機能がそのまま使える"}</td>

<td>{"暗号化した項目は検索・条件指定しにくい"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"12-2 S3のサーバーサイド暗号化方式"}</h3>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col">{"方式"}</th>

<th scope="col">{"鍵の管理者"}</th>

<th scope="col">{"特徴"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"SSE-S3"}</strong></td>

<td>{"S3（AWS管理）"}</td>

<td>{"追加設定がほぼ不要。新規オブジェクトの既定"}</td>

</tr>

<tr>

<td><strong>{"SSE-KMS"}</strong></td>

<td>{"KMSキー（AWSマネージド or カスタマーマネージド）"}</td>

<td><strong>{"鍵の使用をCloudTrailで監査"}</strong>{"、鍵ポリシーで制御可能"}</td>

</tr>

<tr>

<td><strong>{"DSSE-KMS"}</strong></td>

<td>{"KMS"}</td>

<td>{"二層の暗号化（規制要件向け）"}</td>

</tr>

<tr>

<td><strong>{"SSE-C"}</strong></td>

<td><strong>{"利用者が鍵を提供"}</strong>{"（リクエストごと）"}</td>

<td>{"AWSは鍵を保存しない。鍵管理は利用者の責任。HTTPS必須"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p>{"SSE-KMSでの"}<strong>{"S3バケットキー"}</strong>{"を使うと、KMSへのリクエストが減り、コストとスロットリングを抑えられます。"}</p>
{" "}
<CodeBlock language="python" lines={["import boto3","","s3 = boto3.client(\"s3\")","","# SSE-KMSでアップロード","s3.put_object(","    Bucket=\"my-app-bucket\",","    Key=\"reports/secret.txt\",","    Body=b\"confidential\",","    ServerSideEncryption=\"aws:kms\",","    SSEKMSKeyId=\"alias/my-app-key\",",")"]} />
{" "}
<h3>{"12-3 クライアントサイド暗号化に使うツール"}</h3>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col">{"ツール"}</th>

<th scope="col">{"用途"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"AWS Encryption SDK"}</strong></td>

<td>{"汎用のクライアントサイド暗号化（エンベロープ暗号化を自動化）"}</td>

</tr>

<tr>

<td><strong>{"Amazon S3 Encryption Client"}</strong></td>

<td>{"S3へ保存する前にクライアント側で暗号化"}</td>

</tr>

<tr>

<td><strong>{"AWS Database Encryption SDK"}</strong></td>

<td>{"DynamoDB等の項目単位の暗号化"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"12-4 選び方フロー"}</h3>
{" "}
<div className="diagram-card">
<Diagram index={16} label="Step 12　クライアントサイド暗号化とサーバーサイド暗号化（Skill 2.2.3）の図解" />
</div>
{" "}
<h3>{"12-5 ベストプラクティス"}</h3>
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

<td>{"通常はSSE-S3またはSSE-KMS。"}<strong>{"監査・鍵制御が必要ならSSE-KMS"}</strong></td>

</tr>

<tr>

<td>{"2"}</td>

<td>{"特に機密の項目（カード番号など）は"}<strong>{"項目単位のクライアントサイド暗号化"}</strong>{"を検討"}</td>

</tr>

<tr>

<td>{"3"}</td>

<td>{"クライアントサイド暗号化では"}<strong>{"鍵（KMS）への権限管理"}</strong>{"をアプリのロールに限定"}</td>

</tr>

<tr>

<td>{"4"}</td>

<td>{"SSE-Cは鍵の紛失＝データ喪失。"}<strong>{"やむを得ない場合のみ"}</strong></td>

</tr>

<tr>

<td>{"5"}</td>

<td>{"暗号化した項目の検索要件（ソートキー、フィルターなど）を事前に設計"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"試験のひっかけ"}</h3>
{" "}
<ul>
{" "}
<li>{"「AWSにも平文を渡したくない」→ "}<strong>{"クライアントサイド暗号化"}</strong>{"。"}</li>
{" "}
<li>{"「KMSキー使用の監査ログが欲しい」→ "}<strong>{"SSE-KMS"}</strong>{"（CloudTrailに記録される）。"}</li>
{" "}
<li>{"「SSE-Cの鍵はAWSが保存する」→ "}<strong>{"誤り"}</strong>{"（AWSは保存しない）。"}</li>
{" "}
<li>{"「暗号化したDynamoDB項目を条件検索」→ クライアント側で暗号化した項目は"}<strong>{"そのままでは検索不可"}</strong>{"。"}</li>
{" "}
</ul>
{" "}
<h3>{"根拠ソース"}</h3>
{" "}
<ul>
{" "}
<li>{"S3のサーバーサイド暗号化："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/serv-side-encryption.html">{"https://docs.aws.amazon.com/AmazonS3/latest/userguide/serv-side-encryption.html"}</a></li>
{" "}
<li>{"S3のクライアントサイド暗号化："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingClientSideEncryption.html">{"https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingClientSideEncryption.html"}</a></li>
{" "}
<li>{"AWS Encryption SDK："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/encryption-sdk/latest/developer-guide/introduction.html">{"https://docs.aws.amazon.com/encryption-sdk/latest/developer-guide/introduction.html"}</a></li>
{" "}
<li>{"AWS Database Encryption SDK："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/database-encryption-sdk/latest/devguide/what-is-database-encryption-sdk.html">{"https://docs.aws.amazon.com/database-encryption-sdk/latest/devguide/what-is-database-encryption-sdk.html"}</a></li>
{" "}
<li>{"S3バケットキー："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-key.html">{"https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-key.html"}</a></li>
{" "}
</ul>
{" "}
<hr />
{" "}
</section>); }
