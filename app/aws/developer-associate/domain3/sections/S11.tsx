import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** 原本のs11を全文・順序どおり収録。 */
export function S11() { return <>
<h2 id="s11" tabIndex={-1}>{"Step 8：統合テストと外部依存のモック（Skill 3.2.2）"}</h2>
{" "}
<blockquote>{" "}<p><strong>{"Skill 3.2.2"}</strong>{": 統合テストを作成し、外部依存に対する API をモック化する"}</p>{" "}</blockquote>
{" "}
<h3>{"8.1 テストの種類"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 28">
<table>

<thead>

<tr>

<th scope="col">{"種類"}</th>

<th scope="col">{"対象"}</th>

<th scope="col">{"速度"}</th>

<th scope="col">{"外部依存"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"単体テスト（Unit）"}</strong></td>

<td>{"1 つの関数・クラス"}</td>

<td>{"非常に速い"}</td>

<td><strong>{"モックに置換"}</strong></td>

</tr>

<tr>

<td><strong>{"統合テスト（Integration）"}</strong></td>

<td>{"複数の部品の連携（Lambda + DynamoDB など）"}</td>

<td>{"中"}</td>

<td>{"本物（dev 環境）または一部モック"}</td>

</tr>

<tr>

<td><strong>{"E2E テスト"}</strong></td>

<td>{"利用者視点の一連の流れ"}</td>

<td>{"遅い"}</td>

<td>{"本物"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<Diagram id="d11" label="Step 8：統合テストと外部依存のモック（Skill 3.2.2）の図解 d11" />
{" "}
<blockquote>{" "}<p>{"比率は「単体 > 統合 > E2E」とするのが定石です（テストピラミッド）。"}</p>{" "}</blockquote>
{" "}
<h3>{"8.2 モックとは？"}</h3>
{" "}
<p><strong>{"モック／スタブ"}</strong>{" は、本物の代わりに動く「"}<strong>{"偽物"}</strong>{"」です。外部 API や AWS サービスを呼ぶ部分を偽物に差し替えると、"}<strong>{"速く・安く・安定して・狙った状況（エラー等）を再現"}</strong>{" できます。"}</p>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 29">
<table>

<thead>

<tr>

<th scope="col">{"方法"}</th>

<th scope="col">{"内容"}</th>

<th scope="col">{"言語"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"moto"}</strong></td>

<td>{"AWS サービス（S3、DynamoDB、SQS 等）を "}<strong>{"メモリ上で模擬"}</strong></td>

<td>{"Python"}</td>

</tr>

<tr>

<td><strong>{"botocore Stubber"}</strong></td>

<td>{"boto3 クライアントの応答を "}<strong>{"指定どおりに返す"}</strong></td>

<td>{"Python"}</td>

</tr>

<tr>

<td><strong>{"aws-sdk-client-mock"}</strong></td>

<td>{"AWS SDK v3 のクライアントを模擬"}</td>

<td>{"JavaScript/TypeScript"}</td>

</tr>

<tr>

<td><strong>{"unittest.mock / Jest モック"}</strong></td>

<td>{"任意の関数・HTTP 呼び出しを置換"}</td>

<td>{"各言語"}</td>

</tr>

<tr>

<td><strong>{"API Gateway の Mock 統合"}</strong></td>

<td>{"バックエンドなしで "}<strong>{"固定レスポンス"}</strong>{" を返す"}</td>

<td>{"API Gateway"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"8.3 コード例：moto で DynamoDB をモックした単体テスト（Python）"}</h3>
{" "}
<CodeBlock index={9} language="python" lines={["import boto3","from moto import mock_aws","","@mock_aws","def test_save_order():","    # 偽の DynamoDB を作る（本物には一切つながらない）","    ddb = boto3.resource(\"dynamodb\", region_name=\"ap-northeast-1\")","    ddb.create_table(","        TableName=\"Orders\",","        KeySchema=[{\"AttributeName\": \"orderId\", \"KeyType\": \"HASH\"}],","        AttributeDefinitions=[{\"AttributeName\": \"orderId\", \"AttributeType\": \"S\"}],","        BillingMode=\"PAY_PER_REQUEST\",","    )","","    import app                       # テスト対象","    app.save_order({\"orderId\": \"A-001\"})","","    item = ddb.Table(\"Orders\").get_item(Key={\"orderId\": \"A-001\"})[\"Item\"]","    assert item[\"orderId\"] == \"A-001\""]} />
{" "}
<h3>{"8.4 API Gateway の Mock 統合"}</h3>
{" "}
<p><strong>{"Mock 統合"}</strong>{" は、リクエストを "}<strong>{"バックエンドに転送せず"}</strong>{"、API Gateway 自身が応答を返す機能です。"}</p>
{" "}
<ul>
{" "}
<li>{"用途：バックエンド完成前の "}<strong>{"API 仕様の先行確認"}</strong>{"、CORS の "}<strong>{"OPTIONS プリフライト応答"}</strong>{"、テスト用スタブ。"}</li>
{" "}
<li>{"外部サービスの代役として "}<strong>{"dev 環境専用のスタブ API"}</strong>{" を用意し、環境変数やステージ変数で "}<strong>{"接続先を切り替える"}</strong>{" 使い方もあります。"}</li>
{" "}
</ul>
{" "}
<Diagram id="d12" label="Step 8：統合テストと外部依存のモック（Skill 3.2.2）の図解 d12" />
{" "}
<h3>{"8.5 ベストプラクティス"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 30">
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

<td>{"ハンドラー内で "}<strong>{"ビジネスロジックと AWS 呼び出しを分離"}</strong>{" する"}</td>

<td>{"単体テストしやすくなる"}</td>

</tr>

<tr>

<td>{"2"}</td>

<td>{"クライアントは "}<strong>{"ハンドラー外（初期化時）で生成"}</strong>{" し、テストで差し替え可能にする"}</td>

<td>{"再利用＋モック容易"}</td>

</tr>

<tr>

<td>{"3"}</td>

<td>{"外部依存の "}<strong>{"接続先 URL は設定として注入"}</strong>{"（環境変数など）"}</td>

<td>{"環境ごとにスタブ／本物を切替"}</td>

</tr>

<tr>

<td>{"4"}</td>

<td>{"統合テストは "}<strong>{"使い捨ての環境"}</strong>{"（専用スタックやブランチ別スタック）で実行"}</td>

<td>{"干渉を防ぐ"}</td>

</tr>

<tr>

<td>{"5"}</td>

<td><strong>{"異常系（タイムアウト、4xx/5xx、スロットリング）"}</strong>{" もモックで再現"}</td>

<td>{"障害時の動作を確認"}</td>

</tr>

<tr>

<td>{"6"}</td>

<td>{"統合テストの "}<strong>{"後始末（データ削除・スタック削除）"}</strong>{" を自動化"}</td>

<td>{"コスト・汚染の防止"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"8.6 試験での狙われどころ"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 31">
<table>

<thead>

<tr>

<th scope="col">{"問われ方"}</th>

<th scope="col">{"答えの方向性"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"バックエンド未完成でも API の挙動を確認したい"}</td>

<td><strong>{"API Gateway Mock 統合"}</strong></td>

</tr>

<tr>

<td>{"テストで本物の AWS を使わずに DynamoDB を再現"}</td>

<td><strong>{"モック"}</strong>{"（moto など）を利用"}</td>

</tr>

<tr>

<td>{"外部サービスの料金や不安定さをテストから切り離す"}</td>

<td><strong>{"モック／スタブ"}</strong>{" に置き換える"}</td>

</tr>

<tr>

<td>{"統合テストの対象"}</td>

<td><strong>{"実際の AWS サービスとの連携"}</strong>{"（dev 環境で実施）"}</td>

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
<a className="ref" href="https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-mock-integration.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"API Gateway の Mock 統合"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/apigateway/latest/developerguide/how-to-mock-integration.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/lambda/latest/dg/testing-functions.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Lambda 関数のテスト"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/lambda/latest/dg/testing-functions.html"}</span></a>
<a className="ref" href="https://github.com/getmoto/moto" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind oss">{"GitHub"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"moto（OSS）"}</span><span className="ref-url"><b>{"github.com"}</b>{"/getmoto/moto"}</span></a>
<a className="ref" href="https://martinfowler.com/articles/practical-test-pyramid.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind ext">{"外部資料"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"The Practical Test Pyramid（Martin Fowler / Ham Vocke）"}</span><span className="ref-url"><b>{"martinfowler.com"}</b>{"/articles/practical-test-pyramid.html"}</span></a>
<a className="ref" href="https://serverlessland.com/" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Serverless Land（AWS 公式のサーバーレス情報）"}</span><span className="ref-url"><b>{"serverlessland.com"}</b>{"/"}</span></a>
</div>
</section>
{" "}
<hr />
{" "}
</>; }
