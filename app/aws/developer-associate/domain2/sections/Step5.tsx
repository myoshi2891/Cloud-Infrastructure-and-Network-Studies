import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** 原本のStep 5　AWSサービスへの認証済み呼び出し（Skill 2.1.4）を省略せず収録。 */
export function Step5() { return (<section className="section">
<h2 id="step-5" tabIndex={-1}>{"Step 5 AWSサービスへの認証済み呼び出し（Skill 2.1.4）"}</h2>
{" "}
<h3>{"試験で問われること"}</h3>
{" "}
<p><strong>{"「AWSサービスへ認証付きの呼び出しをする」"}</strong>{"：リクエスト署名（SigV4）の考え方と、各サービスが採用する認証方式の違いを理解すること。"}</p>
{" "}
<h3>{"5-1 Signature Version 4（SigV4）とは"}</h3>
{" "}
<p>{"AWS APIへのリクエストは、"}<strong>{"シークレットアクセスキーを使って署名"}</strong>{"します。シークレット自体はネットワークに送りません。サーバーは同じ計算を行い、署名が一致すれば本人のリクエストと判断します。"}</p>
{" "}
<div className="diagram-card">
<Diagram index={6} label="Step 5　AWSサービスへの認証済み呼び出し（Skill 2.1.4）の図解" />
</div>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col">{"ポイント"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"署名の対象"}</td>

<td>{"HTTPメソッド、パス、ヘッダー、ペイロードのハッシュ、日時など"}</td>

</tr>

<tr>

<td>{"一時認証情報を使う場合"}</td>

<td><code>{"X-Amz-Security-Token"}</code>{"（セッショントークン）も付与"}</td>

</tr>

<tr>

<td>{"通常は自分で実装しない"}</td>

<td><strong>{"SDK／CLIが自動で署名する"}</strong></td>

</tr>

<tr>

<td>{"署名エラーの典型原因"}</td>

<td>{"端末の時刻ずれ、リージョン違い、キーの誤り、期限切れ"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"5-2 署名付きURL（Presigned URL）"}</h3>
{" "}
<p>{"認証情報を持たない第三者に、"}<strong>{"期限つきで特定操作だけ"}</strong>{"を許可する仕組みです（S3が代表例）。"}</p>
{" "}
<CodeBlock language="python" lines={["import boto3","","s3 = boto3.client(\"s3\", region_name=\"ap-northeast-1\")","url = s3.generate_presigned_url(","    \"get_object\",","    Params={\"Bucket\": \"my-app-bucket\", \"Key\": \"reports/2026-10.pdf\"},","    ExpiresIn=300,  # 5分",")","print(url)"]} />
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col">{"注意点"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"権限"}</td>

<td>{"URLを"}<strong>{"作った主体の権限"}</strong>{"で実行される。作成者に権限がなければ使えない"}</td>

</tr>

<tr>

<td>{"有効期限"}</td>

<td>{"一時認証情報（ロール）で作成した場合、"}<strong>{"認証情報の有効期限を超えては使えない"}</strong></td>

</tr>

<tr>

<td>{"運用"}</td>

<td>{"期限は"}<strong>{"できるだけ短く"}</strong>{"し、URLをログに残さない"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"5-3 サービスごとの認証方式（開発者が選ぶ場面）"}</h3>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col">{"サービス"}</th>

<th scope="col">{"主な認証・認可オプション"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"API Gateway"}</td>

<td>{"IAM（SigV4）、Cognitoユーザープールオーソライザー（REST）、JWTオーソライザー（HTTP API）、Lambdaオーソライザー、リソースポリシー"}</td>

</tr>

<tr>

<td>{"Lambda関数URL"}</td>

<td><code>{"AWS_IAM"}</code>{"（SigV4）または"}<code>{"NONE"}</code>{"（公開）"}</td>

</tr>

<tr>

<td>{"AppSync"}</td>

<td>{"APIキー、Cognitoユーザープール、IAM、OIDC、Lambda"}</td>

</tr>

<tr>

<td>{"S3"}</td>

<td>{"IAM／バケットポリシー／署名付きURL"}</td>

</tr>

<tr>

<td>{"ALB"}</td>

<td>{"OIDC／Cognito認証アクション（リスナールール）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"5-4 API Gatewayの認証オプション比較"}</h3>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col">{"方式"}</th>

<th scope="col">{"向いている場面"}</th>

<th scope="col">{"備考"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"IAM認証"}</td>

<td>{"AWS内のサービス間・社内システム"}</td>

<td>{"SigV4が必要。呼び出し元にIAM権限を付与"}</td>

</tr>

<tr>

<td>{"Cognitoオーソライザー／JWTオーソライザー"}</td>

<td>{"モバイル・Webのエンドユーザー"}</td>

<td>{"トークンを検証（Step 7）"}</td>

</tr>

<tr>

<td>{"Lambdaオーソライザー"}</td>

<td>{"独自のトークン・サードパーティIdP・複雑なロジック"}</td>

<td>{"戻り値としてIAMポリシーを返す。結果をキャッシュ可能"}</td>

</tr>

<tr>

<td>{"リソースポリシー"}</td>

<td>{"IP制限、特定アカウント・VPCエンドポイントからのみ"}</td>

<td>{"他方式と併用"}</td>

</tr>

<tr>

<td>{"APIキー"}</td>

<td><strong>{"使用量プランによるスロットリング・計量用"}</strong></td>

<td><strong>{"認証・認可の手段としては不十分"}</strong></td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"5-5 ベストプラクティス"}</h3>
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

<td>{"自前でSigV4を実装せず、SDK／CLIを使う"}</td>

</tr>

<tr>

<td>{"2"}</td>

<td>{"署名付きURLの期限を短くし、用途（GET／PUT）を限定する"}</td>

</tr>

<tr>

<td>{"3"}</td>

<td>{"公開APIでも、認可なし（"}<code>{"NONE"}</code>{"）にする理由を明確にする"}</td>

</tr>

<tr>

<td>{"4"}</td>

<td>{"APIキーを認証の代わりに使わない"}</td>

</tr>

<tr>

<td>{"5"}</td>

<td>{"署名エラーでは"}<strong>{"時刻・リージョン・認証情報の期限"}</strong>{"を最初に確認する"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"試験のひっかけ"}</h3>
{" "}
<ul>
{" "}
<li>{"「APIキーでAPIを保護する」→ APIキーは"}<strong>{"認証ではない"}</strong>{"（使用量制御）。"}</li>
{" "}
<li>{"「署名付きURLは誰でも作れる」→ "}<strong>{"作成者の権限で動く"}</strong>{"。"}</li>
{" "}
</ul>
{" "}
<h3>{"根拠ソース"}</h3>
{" "}
<ul>
{" "}
<li>{"SigV4（AWS API リクエストの署名）："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_sigv.html">{"https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_sigv.html"}</a></li>
{" "}
<li>{"S3の署名付きURL："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html">{"https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html"}</a></li>
{" "}
<li>{"API Gatewayのアクセス制御："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-control-access-to-api.html">{"https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-control-access-to-api.html"}</a></li>
{" "}
<li>{"Lambdaオーソライザー："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html">{"https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html"}</a></li>
{" "}
<li>{"Lambda関数URLの認証："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/lambda/latest/dg/urls-auth.html">{"https://docs.aws.amazon.com/lambda/latest/dg/urls-auth.html"}</a></li>
{" "}
<li>{"AppSyncの認可："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/appsync/latest/devguide/security-authz.html">{"https://docs.aws.amazon.com/appsync/latest/devguide/security-authz.html"}</a></li>
{" "}
</ul>
{" "}
<hr />
{" "}
</section>); }
