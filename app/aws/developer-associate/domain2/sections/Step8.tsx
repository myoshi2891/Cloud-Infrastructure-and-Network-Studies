import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** 原本のStep 8　アプリケーションレベルの認可（Skill 2.1.7）を省略せず収録。 */
export function Step8() { return (<section className="section">
<h2 id="step-8" tabIndex={-1}>{"Step 8 アプリケーションレベルの認可（Skill 2.1.7）"}</h2>
{" "}
<h3>{"試験で問われること"}</h3>
{" "}
<p><strong>{"「きめ細かなアクセス制御のため、アプリケーションレベルの認可を実装する」"}</strong></p>
{" "}
<h3>{"8-1 認可のレイヤー"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 38">
<table>

<thead>

<tr>

<th scope="col">{"レイヤー"}</th>

<th scope="col">{"何を守る？"}</th>

<th scope="col">{"手段"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"AWSレベル"}</strong></td>

<td>{"AWSのAPIやリソース"}</td>

<td>{"IAMポリシー、リソースポリシー"}</td>

</tr>

<tr>

<td><strong>{"APIレベル"}</strong></td>

<td>{"エンドポイント単位"}</td>

<td>{"API Gatewayオーソライザー、スコープ"}</td>

</tr>

<tr>

<td><strong>{"アプリケーションレベル"}</strong></td>

<td>{"「このユーザーはこの注文を編集できるか」など業務ルール"}</td>

<td>{"コード内のチェック、ポリシーエンジン、DBの条件"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p>{"IAMだけでは「ユーザーAは自分の注文だけ」といった"}<strong>{"アプリ固有の細かい権限"}</strong>{"を表現しきれないことがあります。そこでアプリ側でも認可を行います。"}</p>
{" "}
<h3>{"8-2 RBACとABAC"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 39">
<table>

<thead>

<tr>

<th scope="col">{"方式"}</th>

<th scope="col">{"考え方"}</th>

<th scope="col">{"例"}</th>

<th scope="col">{"長所"}</th>

<th scope="col">{"短所"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"RBAC"}</strong>{"（ロールベース）"}</td>

<td>{"役割（admin、editor）に権限を紐づける"}</td>

<td>{"Cognitoグループ "}<code>{"admins"}</code></td>

<td>{"シンプル"}</td>

<td>{"ロールが増えやすい"}</td>

</tr>

<tr>

<td><strong>{"ABAC"}</strong>{"（属性ベース）"}</td>

<td>{"属性（部署、タグ、所有者）の一致で判定"}</td>

<td><code>{"department = 営業"}</code>{"のデータのみ"}</td>

<td>{"スケールしやすい"}</td>

<td>{"設計が難しい"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p>{"AWSでは、IAMの"}<strong>{"プリンシパルタグ・リソースタグ"}</strong>{"によるABACや、Cognitoのトークンのクレーム（グループ、カスタム属性）を使ったABACが使えます。"}</p>
{" "}
<h3>{"8-3 Cognitoグループ・スコープによるRBAC"}</h3>
{" "}
<CodeBlock index={11} language="python" lines={["# Lambda内でトークンのクレームを使って判定する例（API Gateway検証済みクレーム）","def handler(event, context):","    claims = event[\"requestContext\"][\"authorizer\"][\"claims\"]","    groups = claims.get(\"cognito:groups\", \"\")","    if \"admins\" not in groups:","        return {\"statusCode\": 403, \"body\": \"Forbidden\"}","    return {\"statusCode\": 200, \"body\": \"OK\"}"]} />
{" "}
<blockquote>{" "}<p>{"HTTP APIのJWTオーソライザーでは"}<code>{"event[\"requestContext\"][\"authorizer\"][\"jwt\"][\"claims\"]"}</code>{"に入ります。API種別でイベント構造が違う点に注意してください。"}</p>{" "}</blockquote>
{" "}
<p><strong>{"認可のよくある失敗：IDOR（他人のIDを指定して他人のデータを見る）"}</strong></p>
{" "}
<CodeBlock index={12} language="python" lines={["# 悪い例：リクエストのuserIdを信用している","user_id = event[\"pathParameters\"][\"userId\"]","","# 良い例：検証済みトークンのsubを使う","user_id = event[\"requestContext\"][\"authorizer\"][\"claims\"][\"sub\"]"]} />
{" "}
<h3>{"8-4 IAMポリシー変数で「自分のデータだけ」を実現（DynamoDB）"}</h3>
{" "}
<p>{"Cognito IDプールで直接DynamoDBにアクセスさせる場合、"}<strong>{"パーティションキー（LeadingKeys）をユーザーIDに限定"}</strong>{"できます。"}</p>
{" "}
<CodeBlock index={13} language="json" lines={["{","  \"Effect\": \"Allow\",","  \"Action\": [\"dynamodb:GetItem\", \"dynamodb:PutItem\", \"dynamodb:Query\"],","  \"Resource\": \"arn:aws:dynamodb:ap-northeast-1:111122223333:table/UserNotes\",","  \"Condition\": {","    \"ForAllValues:StringEquals\": {","      \"dynamodb:LeadingKeys\": [\"${cognito-identity.amazonaws.com:sub}\"]","    }","  }","}"]} />
{" "}
<p>{"S3でも、ユーザーごとのプレフィックスに限定できます。"}</p>
{" "}
<CodeBlock index={14} language="json" lines={["{","  \"Effect\": \"Allow\",","  \"Action\": [\"s3:GetObject\", \"s3:PutObject\"],","  \"Resource\": \"arn:aws:s3:::my-app-bucket/private/${cognito-identity.amazonaws.com:sub}/*\"","}"]} />
{" "}
<h3>{"8-5 Amazon Verified Permissions（アプリ向けの認可サービス）"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 40">
<table>

<thead>

<tr>

<th scope="col">{"項目"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"概要"}</td>

<td>{"アプリの認可ロジックをコードから**ポリシー（Cedar言語）**に切り出して管理するサービス"}</td>

</tr>

<tr>

<td>{"利点"}</td>

<td>{"認可ルールの一元管理、監査、変更時にアプリ再デプロイ不要"}</td>

</tr>

<tr>

<td>{"連携"}</td>

<td>{"Cognito／OIDC IdP、API Gatewayと連携可能"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<blockquote>{" "}<p>{"試験の主役は、Cognito・IAM・API Gatewayです。Verified Permissionsは「"}<strong>{"アプリの認可をポリシーとして外出しする選択肢"}</strong>{"」として名前と役割を押さえておけば十分です。"}</p>{" "}</blockquote>
{" "}
<h3>{"8-6 認可の選び方"}</h3>
{" "}
<div className="diagram-card">
<Diagram index={10} label="Step 8　アプリケーションレベルの認可（Skill 2.1.7）の図解" />
</div>
{" "}
<h3>{"8-7 ベストプラクティス"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 41">
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

<td><strong>{"サーバー側で必ず認可チェック"}</strong>{"（フロントのボタン非表示は認可ではない）"}</td>

</tr>

<tr>

<td>{"2"}</td>

<td>{"ユーザーIDは"}<strong>{"検証済みトークン"}</strong>{"から取得（リクエストの値を信じない）"}</td>

</tr>

<tr>

<td>{"3"}</td>

<td>{"既定は拒否（Deny by default）、許可を明示"}</td>

</tr>

<tr>

<td>{"4"}</td>

<td>{"IAMで可能な制御はIAMで、業務ルールだけアプリで実装し二重化"}</td>

</tr>

<tr>

<td>{"5"}</td>

<td>{"権限の変更は"}<strong>{"ログ"}</strong>{"に残す（CloudTrail、アプリログ）"}</td>

</tr>

<tr>

<td>{"6"}</td>

<td>{"大きなロールの代わりに、属性・スコープで"}<strong>{"細かく"}</strong>{"制御"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"試験のひっかけ"}</h3>
{" "}
<ul>
{" "}
<li>{"「フロントエンドで非表示にすれば安全」→ "}<strong>{"誤り"}</strong>{"。"}</li>
{" "}
<li>{"「クライアントが送る"}<code>{"userId"}</code>{"で絞り込む」→ "}<strong>{"IDOR脆弱性"}</strong>{"。"}</li>
{" "}
<li>{"「各ユーザーが自分のDynamoDB行だけアクセス」→ "}<strong><code>{"dynamodb:LeadingKeys"}</code>{"＋ポリシー変数"}</strong>{"。"}</li>
{" "}
</ul>
{" "}
<h3>{"根拠ソース"}</h3>
{" "}
<ul>
{" "}
<li>{"IAMのABAC："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction_attribute-based-access-control.html">{"https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction_attribute-based-access-control.html"}</a></li>
{" "}
<li>{"DynamoDBのきめ細かなアクセス制御（IAM条件）："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/specifying-conditions.html">{"https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/specifying-conditions.html"}</a></li>
{" "}
<li>{"IAMポリシー変数："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_variables.html">{"https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_variables.html"}</a></li>
{" "}
<li>{"Amazon Verified Permissions："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/verifiedpermissions/latest/userguide/what-is-avp.html">{"https://docs.aws.amazon.com/verifiedpermissions/latest/userguide/what-is-avp.html"}</a></li>
{" "}
<li>{"Cognito IDプールのIAMロール："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/cognito/latest/developerguide/iam-roles.html">{"https://docs.aws.amazon.com/cognito/latest/developerguide/iam-roles.html"}</a></li>
{" "}
</ul>
{" "}
<hr />
{" "}
</section>); }
