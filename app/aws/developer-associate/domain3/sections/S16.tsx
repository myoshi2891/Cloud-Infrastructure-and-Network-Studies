import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** 原本のs16を全文・順序どおり収録。 */
export function S16() { return <>
<h2 id="s16" tabIndex={-1}>{"Step 12：テストイベントの作成（Skill 3.3.1）"}</h2>
{" "}
<blockquote>{" "}<p><strong>{"Skill 3.3.1"}</strong>{": アプリケーションのテストイベントを作成する（例：Lambda、API Gateway、AWS SAM リソース向けの JSON ペイロード）"}</p>{" "}</blockquote>
{" "}
<h3>{"12.1 テストイベントとは"}</h3>
{" "}
<p>{"Lambda は "}<strong>{"イベント（JSON）を受け取って動く関数"}</strong>{" です。テストでは、そのイベントを "}<strong>{"自分で作って渡す"}</strong>{" ことになります。これが "}<strong>{"テストイベント"}</strong>{" です。"}</p>
{" "}
<Diagram id="d19" label="Step 12：テストイベントの作成（Skill 3.3.1）の図解 d19" />
{" "}
<h3>{"12.2 テストイベントを作る 4 つの方法"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 42">
<table>

<thead>

<tr>

<th scope="col">{"方法"}</th>

<th scope="col">{"内容"}</th>

<th scope="col">{"使いどころ"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"Lambda コンソールのテストイベント"}</strong></td>

<td>{"サービス別の "}<strong>{"テンプレート"}</strong>{"（S3、SQS、API Gateway など）から作成・保存。"}<strong>{"共有可能なテストイベント"}</strong>{"（EventBridge のスキーマレジストリ利用）もある"}</td>

<td>{"手早い確認"}</td>

</tr>

<tr>

<td><strong><code>{"sam local generate-event"}</code></strong></td>

<td>{"サービス別のイベントを "}<strong>{"コマンドで生成"}</strong></td>

<td>{"ローカルテスト、リポジトリ保存"}</td>

</tr>

<tr>

<td><strong>{"ログからサンプリング"}</strong></td>

<td>{"実際に届いたイベントを CloudWatch Logs から取得（個人情報は除去）"}</td>

<td>{"実態に即したテスト"}</td>

</tr>

<tr>

<td><strong>{"手書き JSON"}</strong></td>

<td>{"最小限のフィールドで作る"}</td>

<td>{"単体テスト"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"12.3 API Gateway（REST・Lambda プロキシ統合）のイベント例"}</h3>
{" "}
<CodeBlock index={18} language="json" lines={["{","  \"httpMethod\": \"POST\",","  \"path\": \"/orders\",","  \"headers\": { \"Content-Type\": \"application/json\" },","  \"queryStringParameters\": { \"dryRun\": \"true\" },","  \"pathParameters\": null,","  \"stageVariables\": { \"lambdaAlias\": \"dev\" },","  \"requestContext\": { \"stage\": \"dev\" },","  \"body\": \"{\\\"orderId\\\":\\\"A-001\\\",\\\"qty\\\":2}\",","  \"isBase64Encoded\": false","}"]} />
{" "}
<ul>
{" "}
<li><code>{"body"}</code>{" は "}<strong>{"JSON を文字列としてエスケープ"}</strong>{" した形になります（ここが初学者のつまずきポイント）。"}</li>
{" "}
<li>{"HTTP API（ペイロード形式 2.0）では構造が異なります（"}<code>{"version: \"2.0\""}</code>{"、"}<code>{"routeKey"}</code>{"、"}<code>{"rawPath"}</code>{"、"}<code>{"requestContext.http.method"}</code>{" など）。"}</li>
{" "}
</ul>
{" "}
<h3>{"12.4 Lambda プロキシ統合のレスポンス形式（頻出）"}</h3>
{" "}
<p>{"Lambda は "}<strong>{"次の形式"}</strong>{" で返さないと、API Gateway が "}<strong>{"502 Bad Gateway（Malformed Lambda proxy response）"}</strong>{" を返します。"}</p>
{" "}
<CodeBlock index={19} language="python" lines={["import json","","def handler(event, context):","    body = json.loads(event[\"body\"])","    return {","        \"statusCode\": 200,","        \"headers\": {\"Content-Type\": \"application/json\"},","        \"body\": json.dumps({\"received\": body[\"orderId\"]}),   # body は文字列","    }"]} />
{" "}
<h3>{"12.5 SAM でテストイベントを使う"}</h3>
{" "}
<CodeBlock index={20} language="bash" lines={["# イベントを生成して保存","sam local generate-event apigateway aws-proxy --method POST --path orders --body '{\"orderId\":\"A-001\"}' > events/api-post.json","","# 関数をそのイベントで実行","sam local invoke OrderFunction -e events/api-post.json","","# 環境変数を上書きして実行（dev 用の値でテスト）","sam local invoke OrderFunction -e events/api-post.json --env-vars env.json"]} />
{" "}
<h3>{"12.6 テストの自動化（CI での実行）"}</h3>
{" "}
<Diagram id="d20" label="Step 12：テストイベントの作成（Skill 3.3.1）の図解 d20" />
{" "}
<CodeBlock index={21} language="python" lines={["import glob, json, os","import pytest","from app import handler","","# fixture ごとに「期待ステータス」と「レスポンス本文に必要なキー」を明示する","EXPECTED = {","    \"api-post.json\": (200, {\"received\"}),   # 正常系。400 では不合格","}","PATHS = sorted(glob.glob(\"events/*.json\"))","","def test_event_fixtures_are_discovered():","    # 0 件一致のまま全テストが「成功」扱いになるのを防ぐ","    assert PATHS, \"events/*.json に一致する fixture がありません\"","    assert {os.path.basename(p) for p in PATHS} == set(EXPECTED), \"期待値の未定義・欠落 fixture があります\"","","@pytest.mark.parametrize(\"path\", PATHS)","def test_handler_returns_expected_response(path):","    status, body_keys = EXPECTED[os.path.basename(path)]","    with open(path) as f:","        event = json.load(f)","    res = handler(event, None)","    assert res[\"statusCode\"] == status","    assert body_keys <= set(json.loads(res[\"body\"]))"]} />
{" "}
<h3>{"12.7 ベストプラクティス"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 43">
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

<td>{"テストイベントを "}<strong>{"リポジトリで版管理"}</strong></td>

<td>{"チームで共有・再現"}</td>

</tr>

<tr>

<td>{"2"}</td>

<td><strong>{"正常系＋異常系"}</strong>{"（欠損フィールド、不正値、空）を用意"}</td>

<td>{"堅牢性の確認"}</td>

</tr>

<tr>

<td>{"3"}</td>

<td>{"実データ由来のイベントは "}<strong>{"個人情報をマスク"}</strong></td>

<td>{"情報保護"}</td>

</tr>

<tr>

<td>{"4"}</td>

<td>{"イベントに "}<strong>{"環境依存の値を埋め込まない"}</strong>{"（ステージ名、ARN など）"}</td>

<td>{"環境間で使い回す"}</td>

</tr>

<tr>

<td>{"5"}</td>

<td>{"プロキシ統合の "}<strong>{"レスポンス形式をテストで検証"}</strong></td>

<td>{"502 エラー防止"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"12.8 試験での狙われどころ"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 44">
<table>

<thead>

<tr>

<th scope="col">{"問われ方"}</th>

<th scope="col">{"答えの方向性"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"S3 / SQS などのイベント JSON を簡単に作りたい"}</td>

<td><strong><code>{"sam local generate-event"}</code></strong>{" または Lambda コンソールのイベントテンプレート"}</td>

</tr>

<tr>

<td>{"API Gateway で 502 エラー（Lambda プロキシ統合）"}</td>

<td><strong>{"レスポンス形式（statusCode / body 文字列）"}</strong>{" の誤り"}</td>

</tr>

<tr>

<td>{"チーム間でテストイベントを共有"}</td>

<td><strong>{"共有可能なテストイベント"}</strong>{"（スキーマレジストリ）や、リポジトリ管理"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<section className="refs">
<div className="refs-head">
<span className="refs-title">{"参照 URL（この Step）"}</span>
<span className="refs-count">{"5 件"}</span>
</div>
<div className="refs-grid">
<a className="ref" href="https://docs.aws.amazon.com/lambda/latest/dg/testing-functions.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Lambda コンソールでのテストイベント"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/lambda/latest/dg/testing-functions.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-local-generate-event.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"sam local generate-event"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-local-generate-event.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Lambda プロキシ統合"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-test-method.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"API Gateway メソッドのテスト"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/apigateway/latest/developerguide/how-to-test-method.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"HTTP API ペイロード形式"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html"}</span></a>
</div>
</section>
{" "}
<hr />
{" "}
</>; }
