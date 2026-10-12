import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** 原本のs30を全文・順序どおり収録。 */
export function S30() { return <>
<h2 id="s30" tabIndex={-1}>{"Step 25：ランタイム設定による動的デプロイ（Skill 3.4.10）"}</h2>
{" "}
<blockquote>{" "}<p><strong>{"Skill 3.4.10"}</strong>{": 既存のランタイム設定を使って動的なデプロイを作成する（例：Lambda 関数内で API Gateway のステージ変数を使用する）"}</p>{" "}</blockquote>
{" "}
<p><strong>{"同じ API 定義・同じコードで、ステージごとに接続先を変える"}</strong>{" 手法です。"}</p>
{" "}
<Diagram id="d38" label="Step 25：ランタイム設定による動的デプロイ（Skill 3.4.10）の図解 d38" />
{" "}
<ol>
{" "}
<li><strong>{"ステージ変数"}</strong>{" を定義（例："}<code>{"lambdaAlias = dev"}</code>{"）。"}</li>
{" "}
<li>{"統合のターゲットで参照："}<code>{"arn:aws:lambda:ap-northeast-1:123456789012:function:orders:${stageVariables.lambdaAlias}"}</code></li>
{" "}
<li><strong>{"Lambda 側に API Gateway の呼び出し権限"}</strong>{" を付与（ステージ変数を使う場合、コンソールの自動付与が効かないため手動）。"}</li>
{" "}
</ol>
{" "}
<CodeBlock index={30} language="bash" lines={["aws lambda add-permission \\","  --function-name orders:dev \\","  --statement-id apigw-dev \\","  --action lambda:InvokeFunction \\","  --principal apigateway.amazonaws.com \\","  --source-arn \"arn:aws:execute-api:ap-northeast-1:123456789012:abc123/*/*/orders\""]} />
{" "}
<ol start={4}>
{" "}
<li>{"Lambda（プロキシ統合）では "}<strong>{"イベントの "}<code>{"stageVariables"}</code></strong>{" から値を読めます。"}</li>
{" "}
</ol>
{" "}
<CodeBlock index={31} language="python" lines={["def handler(event, context):","    stage_vars = event.get(\"stageVariables\") or {}","    table = stage_vars.get(\"tableName\", \"Orders-dev\")","    stage = event[\"requestContext\"][\"stage\"]","    return {\"statusCode\": 200, \"body\": f\"stage={stage}, table={table}\"}"]} />
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 79">
<table>

<thead>

<tr>

<th scope="col">{"設定の持ち方"}</th>

<th scope="col">{"用途"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"ステージ変数"}</strong></td>

<td>{"環境ごとの接続先（Lambda エイリアス、バックエンド URL、テーブル名）"}</td>

</tr>

<tr>

<td><strong>{"Lambda 環境変数"}</strong></td>

<td>{"関数単位の設定"}</td>

</tr>

<tr>

<td><strong>{"AppConfig / Parameter Store"}</strong></td>

<td>{"実行時に変わる設定、機能フラグ"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p><strong>{"ベストプラクティス"}</strong>{": ① "}<strong>{"機密はステージ変数に入れない"}</strong>{"（Secrets Manager 参照）② ステージ変数名は "}<strong>{"全ステージで統一"}</strong>{" ③ ステージ名はイベントの "}<code>{"requestContext.stage"}</code>{" からも取れる ④ 権限付与（add-permission）も IaC に含める。"}</p>
{" "}
<p><strong>{"狙われどころ"}</strong>{": 「API 定義は 1 つで dev / prod の Lambda を切り替え」→ "}<strong>{"ステージ変数 + エイリアス"}</strong>{"。「Lambda 内でステージ名や変数を使う」→ "}<strong>{"イベントの stageVariables / requestContext"}</strong>{"。"}</p>
{" "}
<section className="refs">
<div className="refs-head">
<span className="refs-title">{"参照 URL（この Step）"}</span>
<span className="refs-count">{"2 件"}</span>
</div>
<div className="refs-grid">
<a className="ref" href="https://docs.aws.amazon.com/apigateway/latest/developerguide/amazon-api-gateway-using-stage-variables.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"ステージ変数"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/apigateway/latest/developerguide/amazon-api-gateway-using-stage-variables.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Lambda プロキシ統合"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html"}</span></a>
</div>
</section>
{" "}
<hr />
{" "}
</>; }
