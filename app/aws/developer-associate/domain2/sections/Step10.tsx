import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** 原本のStep 10　保管時・転送中の暗号化（Skill 2.2.1）を省略せず収録。 */
export function Step10() { return (<section className="section">
<h2 id="step-10" tabIndex={-1}>{"Step 10 保管時・転送中の暗号化（Skill 2.2.1）"}</h2>
{" "}
<h3>{"試験で問われること"}</h3>
{" "}
<p><strong>{"「保管時（at rest）の暗号化と転送中（in transit）の暗号化を定義する」"}</strong></p>
{" "}
<h3>{"10-1 2つの暗号化"}</h3>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col"></th>

<th scope="col">{"保管時の暗号化（Encryption at rest）"}</th>

<th scope="col">{"転送中の暗号化（Encryption in transit）"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"守る対象"}</td>

<td>{"ディスク・DB・バックアップに"}<strong>{"保存された"}</strong>{"データ"}</td>

<td>{"ネットワークを"}<strong>{"流れている"}</strong>{"データ"}</td>

</tr>

<tr>

<td>{"主な脅威"}</td>

<td>{"ストレージの不正取得、権限の誤設定"}</td>

<td>{"盗聴、中間者攻撃"}</td>

</tr>

<tr>

<td>{"代表技術"}</td>

<td>{"AES-256、AWS KMS"}</td>

<td>{"TLS（HTTPS）"}</td>

</tr>

<tr>

<td>{"AWSでの例"}</td>

<td>{"S3 SSE、EBS・RDS暗号化、DynamoDB暗号化"}</td>

<td>{"HTTPSエンドポイント、ALBのHTTPSリスナー、DBへのTLS接続"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<div className="diagram-card">
<Diagram index={13} label="Step 10　保管時・転送中の暗号化（Skill 2.2.1）の図解" />
</div>
{" "}
<h3>{"10-2 サービス別の保管時暗号化（開発者が知るべき要点）"}</h3>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col">{"サービス"}</th>

<th scope="col">{"保管時の暗号化"}</th>

<th scope="col">{"覚えるポイント"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"S3"}</strong></td>

<td>{"新しいオブジェクトは既定でSSE-S3で暗号化。SSE-KMS、DSSE-KMS、SSE-Cも選択可"}</td>

<td>{"バケットの既定暗号化を明示的に設定し、必要ならKMSキーを指定"}</td>

</tr>

<tr>

<td><strong>{"DynamoDB"}</strong></td>

<td><strong>{"すべてのテーブルが常に保管時に暗号化"}</strong>{"（所有キー／AWSマネージドキー／カスタマーマネージドキーから選択）"}</td>

<td>{"暗号化を「オフ」にはできない"}</td>

</tr>

<tr>

<td><strong>{"EBS"}</strong></td>

<td>{"暗号化ボリューム（KMS）。アカウントの既定暗号化を有効化可"}</td>

<td>{"既存の未暗号化ボリュームは、スナップショットのコピー時に暗号化して作り直す"}</td>

</tr>

<tr>

<td><strong>{"RDS / Aurora"}</strong></td>

<td><strong>{"作成時"}</strong>{"に暗号化を指定（KMS）"}</td>

<td>{"既存の未暗号化DBは、スナップショットをコピーして暗号化し復元"}</td>

</tr>

<tr>

<td><strong>{"SQS / SNS"}</strong></td>

<td>{"サーバーサイド暗号化（SSE）をKMSで有効化"}</td>

<td>{"暗号化キューに発行するサービスにはKMS権限が必要"}</td>

</tr>

<tr>

<td><strong>{"Secrets Manager / Parameter Store(SecureString)"}</strong></td>

<td>{"KMSで暗号化"}</td>

<td>{"Step 19"}</td>

</tr>

<tr>

<td><strong>{"Lambda環境変数"}</strong></td>

<td>{"既定で暗号化（KMSキーの変更も可）"}</td>

<td>{"Step 18"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<blockquote>{" "}<p>{"最新の既定値や選択肢は変更されるため、各サービスの公式ドキュメントで確認してください。"}</p>{" "}</blockquote>
{" "}
<h3>{"10-3 転送中の暗号化を「強制」する方法"}</h3>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col">{"場面"}</th>

<th scope="col">{"強制方法"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"S3"}</td>

<td>{"バケットポリシーで"}<code>{"aws:SecureTransport"}</code>{"が"}<code>{"false"}</code>{"のリクエストをDeny"}</td>

</tr>

<tr>

<td>{"CloudFront"}</td>

<td>{"ビューワープロトコルポリシーを「Redirect HTTP to HTTPS」または「HTTPS only」"}</td>

</tr>

<tr>

<td>{"ALB"}</td>

<td>{"HTTPリスナー（80）からHTTPS（443）へのリダイレクト"}</td>

</tr>

<tr>

<td>{"API Gateway"}</td>

<td>{"HTTPSのみ（HTTPは利用不可）"}</td>

</tr>

<tr>

<td>{"RDS"}</td>

<td>{"パラメーターグループでTLS接続を必須化（例：PostgreSQLの"}<code>{"rds.force_ssl"}</code>{"）"}</td>

</tr>

<tr>

<td>{"SDK／CLI"}</td>

<td>{"既定でHTTPSを使用。エンドポイントを"}<code>{"http://"}</code>{"に変更しない"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p>{"S3でHTTPを拒否するバケットポリシー："}</p>
{" "}
<CodeBlock language="json" lines={["{","  \"Version\": \"2012-10-17\",","  \"Statement\": [","    {","      \"Sid\": \"DenyInsecureTransport\",","      \"Effect\": \"Deny\",","      \"Principal\": \"*\",","      \"Action\": \"s3:*\",","      \"Resource\": [","        \"arn:aws:s3:::my-app-bucket\",","        \"arn:aws:s3:::my-app-bucket/*\"","      ],","      \"Condition\": { \"Bool\": { \"aws:SecureTransport\": \"false\" } }","    }","  ]","}"]} />
{" "}
<h3>{"10-4 ベストプラクティス"}</h3>
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

<td><strong>{"保管時・転送中の両方"}</strong>{"を暗号化する（どちらか片方では不十分）"}</td>

</tr>

<tr>

<td>{"2"}</td>

<td>{"暗号化は「あとから付ける」より"}<strong>{"作成時から"}</strong>{"有効化（RDS・EBSの特性）"}</td>

</tr>

<tr>

<td>{"3"}</td>

<td>{"機密性の高いデータは"}<strong>{"カスタマーマネージドKMSキー"}</strong>{"で、鍵の使用をCloudTrailで監査"}</td>

</tr>

<tr>

<td>{"4"}</td>

<td>{"HTTPを"}<strong>{"拒否"}</strong>{"するポリシー・設定で強制する（クライアント任せにしない）"}</td>

</tr>

<tr>

<td>{"5"}</td>

<td>{"TLSの証明書は"}<strong>{"ACM"}</strong>{"で自動更新（Step 13）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"試験のひっかけ"}</h3>
{" "}
<ul>
{" "}
<li>{"「DynamoDBの暗号化を有効にする設定を忘れた」→ 常に暗号化されているため"}<strong>{"該当しない"}</strong>{"。"}</li>
{" "}
<li>{"「RDSの既存DBに暗号化をそのままオン」→ できない。"}<strong>{"スナップショットのコピー時に暗号化→復元"}</strong>{"。"}</li>
{" "}
<li>{"「S3バケットにHTTPSを強制」→ **"}<code>{"aws:SecureTransport"}</code>{"**のDeny。"}</li>
{" "}
</ul>
{" "}
<h3>{"根拠ソース"}</h3>
{" "}
<ul>
{" "}
<li>{"S3のデータ保護と暗号化："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingEncryption.html">{"https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingEncryption.html"}</a></li>
{" "}
<li>{"DynamoDBの保管時の暗号化："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/EncryptionAtRest.html">{"https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/EncryptionAtRest.html"}</a></li>
{" "}
<li>{"RDSの暗号化："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html">{"https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html"}</a></li>
{" "}
<li>{"EBSの暗号化："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/ebs/latest/userguide/ebs-encryption.html">{"https://docs.aws.amazon.com/ebs/latest/userguide/ebs-encryption.html"}</a></li>
{" "}
<li>{"SQSの保管時の暗号化："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-server-side-encryption.html">{"https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-server-side-encryption.html"}</a></li>
{" "}
<li>{"CloudFrontでHTTPSを要求："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-https.html">{"https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-https.html"}</a></li>
{" "}
</ul>
{" "}
<hr />
{" "}
</section>); }
