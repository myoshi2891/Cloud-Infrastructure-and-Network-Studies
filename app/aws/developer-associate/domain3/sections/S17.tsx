import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** 原本のs17を全文・順序どおり収録。 */
export function S17() { return <>
<h2 id="s17" tabIndex={-1}>{"Step 13：API リソースの複数環境へのデプロイと環境管理（Skill 3.3.2 / 3.3.5）"}</h2>
{" "}
<blockquote>{" "}<p><strong>{"Skill 3.3.2"}</strong>{": API リソースをさまざまな環境にデプロイする "}<strong>{"Skill 3.3.5"}</strong>{": 個々の AWS サービス内で環境を管理する（例：API Gateway で開発・テスト・本番を区別する）"}</p>{" "}</blockquote>
{" "}
<h3>{"13.1 「環境」は AWS サービスごとに表現方法が違う"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 45">
<table>

<thead>

<tr>

<th scope="col">{"サービス"}</th>

<th scope="col">{"環境の表現方法"}</th>

<th scope="col">{"例"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"API Gateway"}</strong></td>

<td><strong>{"ステージ"}</strong></td>

<td><code>{"dev"}</code>{" / "}<code>{"test"}</code>{" / "}<code>{"prod"}</code></td>

</tr>

<tr>

<td><strong>{"AWS Lambda"}</strong></td>

<td><strong>{"エイリアス"}</strong>{"（＋バージョン）、関数名の接尾辞"}</td>

<td><code>{"dev"}</code>{" エイリアス、"}<code>{"prod"}</code>{" エイリアス"}</td>

</tr>

<tr>

<td><strong>{"AWS AppConfig"}</strong></td>

<td><strong>{"Environment"}</strong></td>

<td>{"dev / prod"}</td>

</tr>

<tr>

<td><strong>{"Elastic Beanstalk"}</strong></td>

<td><strong>{"環境（Environment）"}</strong></td>

<td><code>{"myapp-dev"}</code>{"、"}<code>{"myapp-prod"}</code></td>

</tr>

<tr>

<td><strong>{"AWS Amplify Hosting"}</strong></td>

<td><strong>{"ブランチ"}</strong></td>

<td><code>{"main"}</code>{"=本番、"}<code>{"dev"}</code>{"=開発"}</td>

</tr>

<tr>

<td><strong>{"CodeDeploy"}</strong></td>

<td><strong>{"デプロイグループ"}</strong></td>

<td><code>{"staging-group"}</code>{" / "}<code>{"prod-group"}</code></td>

</tr>

<tr>

<td><strong>{"Amazon ECS"}</strong></td>

<td>{"クラスター／サービス／タスク定義リビジョン"}</td>

<td><code>{"orders-dev"}</code>{" サービス"}</td>

</tr>

<tr>

<td><strong>{"CloudFormation / SAM"}</strong></td>

<td><strong>{"スタック"}</strong>{"（名前＋パラメータ）"}</td>

<td><code>{"myapp-dev"}</code>{" スタック"}</td>

</tr>

<tr>

<td><strong>{"AWS アカウント"}</strong></td>

<td>{"アカウント単位の分離（最も強い分離）"}</td>

<td>{"dev アカウント / prod アカウント"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"13.2 API Gateway：デプロイの実行"}</h3>
{" "}
<CodeBlock index={22} language="bash" lines={["# REST API の変更を dev ステージへデプロイ","aws apigateway create-deployment \\","  --rest-api-id abc123 \\","  --stage-name dev \\","  --description \"add GET /orders\""]} />
{" "}
<Diagram id="d21" label="Step 13：API リソースの複数環境へのデプロイと環境管理（Skill 3.3.2 / 3.3.5）の図解 d21" />
{" "}
<h3>{"13.3 IaC での落とし穴（CloudFormation で API Gateway を管理する場合）"}</h3>
{" "}
<ul>
{" "}
<li>{"素の CloudFormation では、"}<code>{"AWS::ApiGateway::Deployment"}</code>{" は "}<strong>{"リソースの内容が変わらないと再作成されません"}</strong>{"。API の中身を変えてもステージに反映されない問題が起きます。"}</li>
{" "}
<li><strong>{"AWS SAM（"}<code>{"AWS::Serverless::Api"}</code>{"）を使うと、デプロイとステージの管理を自動で行ってくれる"}</strong>{" ため、この問題は起きにくくなります。"}</li>
{" "}
</ul>
{" "}
<h3>{"13.4 ステージ変数と環境ごとの接続先"}</h3>
{" "}
<CodeBlock index={23} language="yaml" lines={["# SAM：dev/prod で呼ぶ Lambda エイリアスをステージ変数で切り替える","Resources:","  Api:","    Type: AWS::Serverless::Api","    Properties:","      StageName: !Ref Stage","      Variables:","        lambdaAlias: !Ref Stage"]} />
{" "}
<h3>{"13.5 環境分離の強さ（弱い → 強い）"}</h3>
{" "}
<Diagram id="d22" label="Step 13：API リソースの複数環境へのデプロイと環境管理（Skill 3.3.2 / 3.3.5）の図解 d22" />
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 46">
<table>

<thead>

<tr>

<th scope="col">{"方式"}</th>

<th scope="col">{"長所"}</th>

<th scope="col">{"短所"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"ステージ分離"}</td>

<td>{"手軽"}</td>

<td>{"設定ミスの影響が他ステージに及ぶ可能性"}</td>

</tr>

<tr>

<td>{"別スタック"}</td>

<td>{"リソースが完全に別"}</td>

<td>{"同一アカウント内の権限分離は別途必要"}</td>

</tr>

<tr>

<td><strong>{"別アカウント"}</strong></td>

<td><strong>{"権限・課金・障害の完全分離"}</strong>{"（AWS Organizations で管理）"}</td>

<td>{"初期設定が増える"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"13.6 ベストプラクティス"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 47">
<table>

<thead>

<tr>

<th scope="col">{"#"}</th>

<th scope="col">{"ベストプラクティス"}</th>

<th scope="col">{"理由"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"1"}</td>

<td><strong>{"ステージ名＝環境名"}</strong>{" に統一し、命名規則を決める"}</td>

<td>{"混乱防止"}</td>

</tr>

<tr>

<td>{"2"}</td>

<td>{"環境ごとに "}<strong>{"別の IAM ロール／最小権限"}</strong></td>

<td>{"誤操作の影響を限定"}</td>

</tr>

<tr>

<td>{"3"}</td>

<td>{"本番ステージには "}<strong>{"スロットリング・ログ・WAF"}</strong>{" を有効化"}</td>

<td>{"保護と可観測性"}</td>

</tr>

<tr>

<td>{"4"}</td>

<td><strong>{"同じ定義を昇格"}</strong>{" させ、環境固有値は変数で与える"}</td>

<td>{"差異による不具合を防ぐ"}</td>

</tr>

<tr>

<td>{"5"}</td>

<td>{"本番デプロイは "}<strong>{"自動化されたパイプライン＋承認"}</strong>{" 経由のみ"}</td>

<td>{"統制"}</td>

</tr>

<tr>

<td>{"6"}</td>

<td>{"可能なら "}<strong>{"dev / prod は別アカウント"}</strong></td>

<td>{"強い分離"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"13.7 試験での狙われどころ"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 48">
<table>

<thead>

<tr>

<th scope="col">{"問われ方"}</th>

<th scope="col">{"答えの方向性"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"API Gateway で dev / test / prod を区別"}</td>

<td><strong>{"ステージ"}</strong></td>

</tr>

<tr>

<td>{"API を変更したが反映されない"}</td>

<td><strong>{"再デプロイ"}</strong></td>

</tr>

<tr>

<td>{"環境ごとに呼び先 Lambda を変えたい"}</td>

<td><strong>{"ステージ変数＋Lambda エイリアス"}</strong></td>

</tr>

<tr>

<td>{"最も強い環境分離"}</td>

<td><strong>{"別アカウント"}</strong></td>

</tr>

</tbody>

</table>
</div>
{" "}
<section className="refs">
<div className="refs-head">
<span className="refs-title">{"参照 URL（この Step）"}</span>
<span className="refs-count">{"4 件"}</span>
</div>
<div className="refs-grid">
<a className="ref" href="https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-deploy-api.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"API Gateway のデプロイ"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/apigateway/latest/developerguide/how-to-deploy-api.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-stages.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"ステージの設定"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/apigateway/latest/developerguide/set-up-stages.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/wellarchitected/latest/framework/sec_securely_operate_multi_accounts.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"AWS Organizations と複数アカウント戦略（Well-Architected）"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/wellarchitected/latest/framework/sec_securely_operate_multi_accounts.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-resource-api.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"AWS SAM の Api リソース"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/serverless-application-model/latest/developerguide/sam-resource-api.html"}</span></a>
</div>
</section>
{" "}
<hr />
{" "}
</>; }
