import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** 原本のStep 9　マイクロサービス間の認証（Skill 2.1.8）を省略せず収録。 */
export function Step9() { return (<section className="section">
<h2 id="step-9" tabIndex={-1}>{"Step 9 マイクロサービス間の認証（Skill 2.1.8）"}</h2>
{" "}
<h3>{"試験で問われること"}</h3>
{" "}
<p><strong>{"「マイクロサービスアーキテクチャにおけるサービス間（クロスサービス）認証を扱う」"}</strong></p>
{" "}
<h3>{"9-1 2種類の「誰」を区別する"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 42">
<table>

<thead>

<tr>

<th scope="col">{"種類"}</th>

<th scope="col">{"意味"}</th>

<th scope="col">{"例"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"エンドユーザーの身元"}</strong></td>

<td>{"画面を操作している人"}</td>

<td>{"Cognitoのアクセストークン"}</td>

</tr>

<tr>

<td><strong>{"サービスの身元"}</strong></td>

<td>{"呼び出しているサービス自体"}</td>

<td>{"IAMロール、クライアントクレデンシャルのトークン"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p>{"サービス間通信では、"}<strong>{"サービス自身の認証"}</strong>{"と、必要に応じて"}<strong>{"エンドユーザー情報の伝搬"}</strong>{"を分けて考えます。"}</p>
{" "}
<h3>{"9-2 代表的なパターン"}</h3>
{" "}
<div className="diagram-card">
<Diagram index={11} label="Step 9　マイクロサービス間の認証（Skill 2.1.8）の図解" />
</div>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 43">
<table>

<thead>

<tr>

<th scope="col">{"パターン"}</th>

<th scope="col">{"仕組み"}</th>

<th scope="col">{"向いている場面"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"IAM認証（SigV4）"}</strong></td>

<td>{"呼び出し側のロールが署名し、呼び出される側がIAMで許可"}</td>

<td>{"AWS内のサービス間（API Gateway、Lambda関数URL、AppSyncなど）"}</td>

</tr>

<tr>

<td><strong>{"リソースベースポリシー"}</strong></td>

<td>{"呼び出される側で「このロールを許可」と指定"}</td>

<td>{"Lambda、SQS、SNS、S3、EventBridgeなど"}</td>

</tr>

<tr>

<td><strong>{"OAuth 2.0 クライアントクレデンシャル"}</strong></td>

<td>{"サービスがクライアントID・シークレットでトークンを取得"}</td>

<td>{"IAMを使えない環境、外部システムとのM2M、スコープ制御"}</td>

</tr>

<tr>

<td><strong>{"トークンの伝搬"}</strong></td>

<td>{"ユーザーのJWTを下流サービスに引き継ぐ"}</td>

<td>{"下流でもユーザー単位の認可が必要なとき"}</td>

</tr>

<tr>

<td><strong>{"mTLS"}</strong></td>

<td>{"クライアント証明書で相互認証"}</td>

<td>{"強い相互認証が要件のとき（Step 13のPrivate CAと関連）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"9-3 サービスに権限を付ける：2つの方向"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 44">
<table>

<thead>

<tr>

<th scope="col">{"方向"}</th>

<th scope="col">{"内容"}</th>

<th scope="col">{"設定場所"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"呼び出す側に権限"}</strong></td>

<td>{"「サービスAはサービスBを呼べる」"}</td>

<td>{"Aのロール（アイデンティティベース）"}</td>

</tr>

<tr>

<td><strong>{"呼び出される側に許可"}</strong></td>

<td>{"「サービスAからの呼び出しを受け付ける」"}</td>

<td>{"Bのリソースベースポリシー"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p>{"例：S3のイベントでLambdaを起動する場合、"}<strong>{"Lambdaのリソースベースポリシー"}</strong>{"で"}<code>{"s3.amazonaws.com"}</code>{"に"}<code>{"lambda:InvokeFunction"}</code>{"を許可し、混乱した代理問題の対策として"}<code>{"aws:SourceArn"}</code>{"と"}<code>{"aws:SourceAccount"}</code>{"の条件を付けます。"}</p>
{" "}
<CodeBlock index={15} language="json" lines={["{","  \"Effect\": \"Allow\",","  \"Principal\": { \"Service\": \"s3.amazonaws.com\" },","  \"Action\": \"lambda:InvokeFunction\",","  \"Resource\": \"arn:aws:lambda:ap-northeast-1:111122223333:function:ProcessUpload\",","  \"Condition\": {","    \"ArnLike\": { \"aws:SourceArn\": \"arn:aws:s3:::my-app-bucket\" },","    \"StringEquals\": { \"aws:SourceAccount\": \"111122223333\" }","  }","}"]} />
{" "}
<h3>{"9-4 Cognitoのクライアントクレデンシャルによる M2M"}</h3>
{" "}
<div className="diagram-card">
<Diagram index={12} label="Step 9　マイクロサービス間の認証（Skill 2.1.8）の図解" />
</div>
{" "}
<h3>{"9-5 ベストプラクティス"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 45">
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

<td><strong>{"サービスごとに専用ロール"}</strong>{"を作り、権限を最小化（共有ロールを避ける）"}</td>

</tr>

<tr>

<td>{"2"}</td>

<td>{"AWS内ではまず"}<strong>{"IAM認証（SigV4）"}</strong>{"を検討（秘密情報の管理が不要）"}</td>

</tr>

<tr>

<td>{"3"}</td>

<td>{"共有のシークレットや固定のAPIキーを避ける。使うならSecrets Managerで管理・ローテーション"}</td>

</tr>

<tr>

<td>{"4"}</td>

<td>{"呼び出される側で"}<strong>{"必ず認可"}</strong>{"する（ネットワークが内部でも信用しない）"}</td>

</tr>

<tr>

<td>{"5"}</td>

<td>{"リソースポリシーに"}<code>{"aws:SourceArn"}</code>{"／"}<code>{"aws:SourceAccount"}</code>{"を付ける"}</td>

</tr>

<tr>

<td>{"6"}</td>

<td>{"相関ID（トレースID）を伝搬し、"}<strong>{"X-RayやCloudTrail"}</strong>{"で呼び出し経路を追跡可能に"}</td>

</tr>

<tr>

<td>{"7"}</td>

<td>{"外部のM2Mには"}<strong>{"短寿命のスコープ付きトークン"}</strong>{"を使う"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"試験のひっかけ"}</h3>
{" "}
<ul>
{" "}
<li>{"「サービス間は同じVPCだから認証不要」→ "}<strong>{"誤り"}</strong>{"（ゼロトラストの考え方）。"}</li>
{" "}
<li>{"「全サービスで1つの強力なロールを共有」→ "}<strong>{"誤り"}</strong>{"（最小権限に反する）。"}</li>
{" "}
<li>{"「Lambda間呼び出しにアクセスキーを埋め込む」→ "}<strong>{"誤り"}</strong>{"（実行ロールを使う）。"}</li>
{" "}
</ul>
{" "}
<h3>{"根拠ソース"}</h3>
{" "}
<ul>
{" "}
<li>{"Lambdaのリソースベースポリシー："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/lambda/latest/dg/access-control-resource-based.html">{"https://docs.aws.amazon.com/lambda/latest/dg/access-control-resource-based.html"}</a></li>
{" "}
<li>{"Cognito：リソースサーバーとM2M認可："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-define-resource-servers.html">{"https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-define-resource-servers.html"}</a></li>
{" "}
<li>{"API GatewayのIAM認証："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/apigateway/latest/developerguide/permissions.html">{"https://docs.aws.amazon.com/apigateway/latest/developerguide/permissions.html"}</a></li>
{" "}
<li>{"AWS X-Ray："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html">{"https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html"}</a></li>
{" "}
<li>{"混乱した代理問題："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/IAM/latest/UserGuide/confused-deputy.html">{"https://docs.aws.amazon.com/IAM/latest/UserGuide/confused-deputy.html"}</a></li>
{" "}
<li>{"Well-Architected（セキュリティの柱）："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html">{"https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html"}</a></li>
{" "}
</ul>
{" "}
<hr />
{" "}
</section>); }
