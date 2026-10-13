import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** 原本のs14を全文・順序どおり収録。 */
export function S14() { return <>
<h2 id="s14" tabIndex={-1}>{"Step 11：イベント駆動アプリケーションのテスト（Skill 3.2.5）"}</h2>
{" "}
<blockquote>{" "}<p><strong>{"Skill 3.2.5"}</strong>{": イベント駆動型アプリケーションをテストする"}</p>{" "}</blockquote>
{" "}
<h3>{"11.1 イベント駆動とは"}</h3>
{" "}
<p>{"「ファイルがアップロードされた」「メッセージがキューに届いた」といった "}<strong>{"出来事（イベント）をきっかけに処理が動く"}</strong>{" 仕組みです。呼び出し元が見えにくいため、"}<strong>{"テストの工夫が必要"}</strong>{" です。"}</p>
{" "}
<h3>{"11.2 代表的なイベントソースとテスト方法"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 38">
<table>

<thead>

<tr>

<th scope="col">{"イベントソース"}</th>

<th scope="col">{"呼び出し方式"}</th>

<th scope="col">{"テスト方法の例"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"Amazon S3"}</td>

<td>{"非同期"}</td>

<td><code>{"sam local generate-event s3 put"}</code>{" で疑似イベント生成、または実際にテストファイルをアップロード"}</td>

</tr>

<tr>

<td>{"Amazon SNS"}</td>

<td>{"非同期"}</td>

<td><code>{"aws sns publish"}</code>{" でテストメッセージ送信"}</td>

</tr>

<tr>

<td>{"Amazon SQS"}</td>

<td><strong>{"ポーリング（イベントソースマッピング）"}</strong></td>

<td><code>{"aws sqs send-message"}</code>{" で送信し、処理結果とキューを確認"}</td>

</tr>

<tr>

<td>{"Amazon EventBridge"}</td>

<td>{"非同期"}</td>

<td><code>{"aws events put-events"}</code>{" / "}<strong>{"イベントパターンのテスト"}</strong></td>

</tr>

<tr>

<td>{"DynamoDB Streams / Kinesis"}</td>

<td><strong>{"ポーリング"}</strong></td>

<td>{"テーブルを更新して Stream レコードを発生させる"}</td>

</tr>

<tr>

<td>{"API Gateway"}</td>

<td>{"同期"}</td>

<td><code>{"curl"}</code>{" / テストイベント / "}<code>{"sam local start-api"}</code></td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"11.3 テストの 3 段階"}</h3>
{" "}
<Diagram id="d16" label="Step 11：イベント駆動アプリケーションのテスト（Skill 3.2.5）の図解 d16" />
{" "}
<h3>{"11.4 疑似イベントを作る"}</h3>
{" "}
<CodeBlock index={16} language="bash" lines={["# S3 に put されたイベントの JSON を生成","sam local generate-event s3 put --bucket my-bucket --key images/a.png > events/s3-put.json","","# 生成したイベントでローカル実行","sam local invoke ImageFunction -e events/s3-put.json"]} />
{" "}
<p>{"EventBridge のルールが "}<strong>{"意図したイベントに一致するか"}</strong>{" は、イベントパターンのテストで確認できます。"}</p>
{" "}
<CodeBlock index={17} language="bash" lines={["aws events test-event-pattern \\","  --event-pattern file://pattern.json \\","  --event file://event.json"]} />
{" "}
<h3>{"11.5 イベント駆動で必ず考えるべきこと"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 39">
<table>

<thead>

<tr>

<th scope="col">{"論点"}</th>

<th scope="col">{"内容"}</th>

<th scope="col">{"対策"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"少なくとも 1 回配信（At-least-once）"}</strong></td>

<td>{"同じイベントが "}<strong>{"2 回以上"}</strong>{" 届くことがある"}</td>

<td><strong>{"冪等性（べきとうせい）"}</strong>{" を実装（同じ入力で結果が変わらない）"}</td>

</tr>

<tr>

<td><strong>{"失敗時の扱い"}</strong></td>

<td>{"処理が失敗し続けるメッセージ"}</td>

<td><strong>{"DLQ（デッドレターキュー）"}</strong>{" や "}<strong>{"失敗時の送信先（Destinations）"}</strong></td>

</tr>

<tr>

<td><strong>{"一部だけ失敗（バッチ）"}</strong></td>

<td>{"SQS・Kinesis のバッチ処理"}</td>

<td><strong>{"部分バッチ応答（ReportBatchItemFailures）"}</strong></td>

</tr>

<tr>

<td><strong>{"順序"}</strong></td>

<td>{"標準キューは順序保証なし"}</td>

<td>{"FIFO キュー、または順序に依存しない設計"}</td>

</tr>

<tr>

<td><strong>{"リトライ"}</strong></td>

<td>{"非同期呼び出しは自動リトライあり"}</td>

<td>{"リトライ回数・最大イベント経過時間を設定"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<blockquote>{" "}<p>{"冪等性の実装には、Powertools for AWS Lambda の Idempotency ユーティリティがよく使われます。"}</p>{" "}</blockquote>
{" "}
<h3>{"11.5.1 DLQ とリトライの全体像"}</h3>
{" "}
<Diagram id="d17" label="Step 11：イベント駆動アプリケーションのテスト（Skill 3.2.5）の図解 d17" />
{" "}
<h3>{"11.6 ベストプラクティス"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 40">
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

<td><strong>{"サンプルイベントを "}<code>{"events/"}</code>{" に保存"}</strong>{" し、リポジトリで管理"}</td>

<td>{"再現可能なテスト"}</td>

</tr>

<tr>

<td>{"2"}</td>

<td>{"実イベントのペイロードを "}<strong>{"ログからサンプリング"}</strong>{" してテストに活用（個人情報はマスク）"}</td>

<td>{"実態に即したテスト"}</td>

</tr>

<tr>

<td>{"3"}</td>

<td><strong>{"冪等性・DLQ・リトライ"}</strong>{" をテストで必ず検証"}</td>

<td>{"本番での障害を想定"}</td>

</tr>

<tr>

<td>{"4"}</td>

<td><strong>{"X-Ray / 相関 ID"}</strong>{" でイベントの流れを追跡"}</td>

<td>{"非同期の可視化"}</td>

</tr>

<tr>

<td>{"5"}</td>

<td><strong>{"統合テストでは、イベント発生 → 結果が出るまでポーリング"}</strong>{" して検証"}</td>

<td>{"非同期のため待機が必要"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"11.7 試験での狙われどころ"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 41">
<table>

<thead>

<tr>

<th scope="col">{"問われ方"}</th>

<th scope="col">{"答えの方向性"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"S3 イベントの形式をローカルで再現"}</td>

<td><strong><code>{"sam local generate-event"}</code></strong></td>

</tr>

<tr>

<td>{"重複配信されても結果を変えない"}</td>

<td><strong>{"冪等性"}</strong></td>

</tr>

<tr>

<td>{"何度も失敗するメッセージを退避して調査"}</td>

<td><strong>{"DLQ / on-failure destination"}</strong></td>

</tr>

<tr>

<td>{"SQS バッチの一部だけ失敗した"}</td>

<td><strong>{"ReportBatchItemFailures（部分バッチ応答）"}</strong></td>

</tr>

<tr>

<td>{"EventBridge ルールのパターンが合うか確認"}</td>

<td><strong>{"イベントパターンのテスト"}</strong></td>

</tr>

</tbody>

</table>
</div>
{" "}
<section className="refs">
<div className="refs-head">
<span className="refs-title">{"参照 URL（この Step）"}</span>
<span className="refs-count">{"6 件"}</span>
</div>
<div className="refs-grid">
<a className="ref" href="https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-local-generate-event.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"sam local generate-event"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-local-generate-event.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/lambda/latest/dg/invocation-async.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Lambda の非同期呼び出し"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/lambda/latest/dg/invocation-async.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-errorhandling.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"SQS と Lambda（部分バッチ応答）"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/lambda/latest/dg/services-sqs-errorhandling.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-patterns.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"EventBridge のイベントパターン"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/eventbridge/latest/userguide/eb-event-patterns.html"}</span></a>
<a className="ref" href="https://docs.powertools.aws.dev/lambda/python/latest/utilities/idempotency/" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Powertools for AWS Lambda（冪等性）"}</span><span className="ref-url"><b>{"docs.powertools.aws.dev"}</b>{"/lambda/python/latest/utilities/idempotency/"}</span></a>
<a className="ref" href="https://serverlessland.com/patterns" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Serverless Land（イベント駆動パターン集）"}</span><span className="ref-url"><b>{"serverlessland.com"}</b>{"/patterns"}</span></a>
</div>
</section>
{" "}
<hr />
{" "}
</>; }
