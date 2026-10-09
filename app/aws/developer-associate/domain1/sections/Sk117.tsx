import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** Skill 1.1.7 ユニットテストと AWS SAMを全量保持する。 */
export function Sk117(){return (<section className="section" id="sk-1-1-7" tabIndex={-1}>
<h2>{"Skill 1.1.7 ユニットテストと AWS SAM"}</h2>
{" "}
<blockquote>{" "}<p>{"公式のスキル文: 開発環境でユニットテストを書き、実行する（例: AWS SAM を使う）"}</p>{" "}</blockquote>
{" "}
<h3 className="h-one">{"ひとことで言うと"}</h3>
{" "}
<p>{"クラウドにデプロイする"}<strong>{"前に"}</strong>{"、手元（ローカル）でコードの動作を確かめるスキルです。"}<strong>{"AWS SAM"}</strong>{" は、サーバーレスアプリをローカルでテスト・ビルド・デプロイするための仕組みです。"}</p>
{" "}
<h3 className="h-detail">{"詳しい説明"}</h3>
{" "}
<h4>{"AWS SAM とは"}</h4>
{" "}
<p><strong>{"AWS Serverless Application Model (SAM)"}</strong>{" は、サーバーレスアプリを簡潔に書くための "}<strong>{"CloudFormation の拡張"}</strong>{"です。次の 2 つで構成されます。"}</p>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 24">
<table>

<thead>

<tr>

<th scope="col">{"構成要素"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"SAM テンプレート"}</strong></td>

<td><code>{"Transform: AWS::Serverless-2016-10-31"}</code>{" を宣言する YAML。短い記述で Lambda・API・DynamoDB を定義"}</td>

</tr>

<tr>

<td><strong>{"SAM CLI"}</strong></td>

<td>{"ローカルでのビルド・テスト・デプロイを行うコマンドラインツール"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<CodeBlock index={2} language="yaml" lines={["yamlAWSTemplateFormatVersion: \"2010-09-09\"","Transform: AWS::Serverless-2016-10-31   # これが SAM の目印","","Resources:","  HelloFunction:","    Type: AWS::Serverless::Function     # Lambda 関数","    Properties:","      Handler: app.handler","      Runtime: python3.13","      MemorySize: 256","      Timeout: 10","      Events:","        GetHello:","          Type: Api                     # API Gateway（REST）を自動作成","          Properties:","            Path: /hello","            Method: get"]} />
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 25">
<table>

<thead>

<tr>

<th scope="col">{"SAM のリソース型"}</th>

<th scope="col">{"作られるもの"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><code>{"AWS::Serverless::Function"}</code></td>

<td>{"Lambda 関数（+ IAM ロール、イベントソース）"}</td>

</tr>

<tr>

<td><code>{"AWS::Serverless::Api"}</code>{" / "}<code>{"HttpApi"}</code></td>

<td>{"API Gateway（REST / HTTP）"}</td>

</tr>

<tr>

<td><code>{"AWS::Serverless::SimpleTable"}</code></td>

<td>{"DynamoDB テーブル（シンプルな主キーのみ）"}</td>

</tr>

<tr>

<td><code>{"AWS::Serverless::LayerVersion"}</code></td>

<td>{"Lambda レイヤー"}</td>

</tr>

<tr>

<td><code>{"AWS::Serverless::StateMachine"}</code></td>

<td>{"Step Functions ステートマシン"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"SAM CLI の主要コマンド"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 26">
<table>

<thead>

<tr>

<th scope="col">{"コマンド"}</th>

<th scope="col">{"役割"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><code>{"sam init"}</code></td>

<td>{"プロジェクトのひな形を作る"}</td>

</tr>

<tr>

<td><code>{"sam build"}</code></td>

<td>{"依存関係を解決してビルド"}</td>

</tr>

<tr>

<td><code>{"sam local invoke"}</code></td>

<td><strong>{"Lambda 関数をローカルで 1 回実行"}</strong>{"（イベント JSON を渡せる）"}</td>

</tr>

<tr>

<td><code>{"sam local start-api"}</code></td>

<td><strong>{"API Gateway をローカルで起動"}</strong>{"し、HTTP リクエストでテスト"}</td>

</tr>

<tr>

<td><code>{"sam local start-lambda"}</code></td>

<td>{"ローカルの Lambda エンドポイントを起動（SDK / CLI から呼べる）"}</td>

</tr>

<tr>

<td><code>{"sam local generate-event"}</code></td>

<td>{"S3・SQS・API Gateway などの"}<strong>{"サンプルイベント JSON を生成"}</strong></td>

</tr>

<tr>

<td><code>{"sam validate"}</code></td>

<td>{"テンプレートの構文チェック"}</td>

</tr>

<tr>

<td><code>{"sam deploy"}</code></td>

<td>{"CloudFormation 経由でデプロイ（"}<code>{"--guided"}</code>{" で対話形式）"}</td>

</tr>

<tr>

<td><code>{"sam sync"}</code></td>

<td>{"開発中にコード変更を素早くクラウドへ同期（"}<code>{"--watch"}</code>{" で自動）"}</td>

</tr>

<tr>

<td><code>{"sam logs"}</code>{" / "}<code>{"sam traces"}</code></td>

<td>{"クラウド上のログ・X-Ray トレースの確認"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<blockquote>{" "}<p><code>{"sam local"}</code>{" 系のコマンドは、Lambda の実行環境を再現するために "}<strong>{"Docker が必要"}</strong>{"です。"}</p>{" "}</blockquote>
{" "}
<figure className="diagram-card"><Diagram id="d09" label="Skill 1.1.7 ユニットテストと AWS SAMの図解 d09" /></figure>
{" "}
<h4>{"ユニットテストの考え方"}</h4>
{" "}
<p>{"ユニットテストは「"}<strong>{"AWS に接続せずに"}</strong>{"、自分のコードのロジックだけを検証する」テストです。"}</p>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 27">
<table>

<thead>

<tr>

<th scope="col">{"手法"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"ハンドラーとビジネスロジックの分離"}</strong></td>

<td><code>{"handler"}</code>{" は薄くし、本体の処理を別関数に切り出す → 単体でテストしやすい"}</td>

</tr>

<tr>

<td><strong>{"モック / スタブ"}</strong></td>

<td>{"AWS への呼び出しを偽物に差し替える（Python: "}<code>{"unittest.mock"}</code>{"、"}<code>{"moto"}</code>{"、"}<code>{"botocore.stub.Stubber"}</code>{" / JavaScript: "}<code>{"aws-sdk-client-mock"}</code>{" など）"}</td>

</tr>

<tr>

<td><strong>{"テスト用イベント"}</strong></td>

<td>{"本物のイベント形式の JSON（"}<code>{"sam local generate-event"}</code>{" で生成）を入力にする"}</td>

</tr>

<tr>

<td><strong>{"依存性の注入"}</strong></td>

<td>{"クライアントを引数や初期化処理で渡し、テスト時に差し替えられるようにする"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<CodeBlock index={3} language="python" lines={["python# app.py: ロジックを関数に分離","def calc_total(items):","    return sum(i[\"price\"] * i[\"qty\"] for i in items)","","def handler(event, context):","    return {\"statusCode\": 200, \"body\": str(calc_total(event[\"items\"]))}"]} />
{" "}
<CodeBlock index={4} language="python" lines={["python# test_app.py: AWS に接続せずにテスト","from app import calc_total","","def test_calc_total():","    items = [{\"price\": 100, \"qty\": 2}, {\"price\": 50, \"qty\": 1}]","    assert calc_total(items) == 250"]} />
{" "}
<h4>{"テストの階層"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 28">
<table>

<thead>

<tr>

<th scope="col">{"種類"}</th>

<th scope="col">{"範囲"}</th>

<th scope="col">{"速度"}</th>

<th scope="col">{"AWS 接続"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"ユニットテスト"}</td>

<td>{"関数 1 つ"}</td>

<td>{"速い"}</td>

<td>{"なし（モック）"}</td>

</tr>

<tr>

<td>{"結合テスト"}</td>

<td>{"複数コンポーネント"}</td>

<td>{"中"}</td>

<td>{"実際の AWS（または "}<code>{"sam local"}</code>{"）"}</td>

</tr>

<tr>

<td>{"E2E テスト"}</td>

<td>{"システム全体"}</td>

<td>{"遅い"}</td>

<td>{"実環境"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3 className="h-bp">{"ベストプラクティス"}</h3>
{" "}
<ul>
{" "}
<li>{"ビジネスロジックを"}<strong>{"ハンドラーから分離"}</strong>{"して、ユニットテストしやすくする"}</li>
{" "}
<li>{"テストは"}<strong>{"高速で、ネットワークなしで動く"}</strong>{"状態に保つ（外部呼び出しはモック）"}</li>
{" "}
<li>{"本物のイベント構造は "}<code>{"sam local generate-event"}</code>{" で作り、"}<strong>{"テストデータをリポジトリで管理"}</strong>{"する"}</li>
{" "}
<li>{"開発サイクルを短くするため "}<code>{"sam sync --watch"}</code>{" を活用し、本番相当の確認は結合テストで行う"}</li>
{" "}
</ul>
{" "}
<h3 className="h-exam">{"試験での狙われ方"}</h3>
{" "}
<ul>
{" "}
<li>{"「デプロイ前に Lambda をローカルで動かして確認したい」→ "}<strong><code>{"sam local invoke"}</code></strong></li>
{" "}
<li>{"「API Gateway + Lambda をローカルでテスト」→ "}<strong><code>{"sam local start-api"}</code></strong></li>
{" "}
<li>{"「S3 イベントのテスト入力が欲しい」→ "}<strong><code>{"sam local generate-event"}</code></strong></li>
{" "}
<li>{"「AWS に接続せずテストしたい」→ "}<strong>{"モック / スタブ"}</strong></li>
{" "}
</ul>
{" "}
</section>);}
