import { CodeBlock } from '../CodeBlock';
import { Diagram } from '../Diagram';
/** 原本step-10の全内容。 */
export function Section11() { return (<section className="section" id="step-10" tabIndex={-1}>
{" "}
<div className="sec-head">
<div className="sec-icon">
<i className="ti ti-braces" aria-hidden="true"></i>
</div>
<div>
<p className="eyebrow">{"Task 2 · Step 10 · 4.2.7"}</p>
<h2>{"構造化ログ"}</h2>
</div>
</div>
{" "}
<h3>{"この項目で学ぶこと"}</h3>
{" "}
<p>{"ログを "}<strong>{"「人が読む文章」ではなく「機械が検索できるデータ」"}</strong>{" として出力する方法です。アプリケーションのイベントとユーザー操作を、あとから自由に集計できるようにします。"}</p>
{" "}
<h3>{"やさしい解説"}</h3>
{" "}
<h4>{"10-1. 非構造化ログと構造化ログ"}</h4>
{" "}
<p><strong>{"非構造化(文章)"}</strong></p>
{" "}
<div className="code-sample">
<div className="cb-head">
{"テキスト"}
</div>
<CodeBlock language="plaintext" lines={["2026-10-03 10:15:22 ERROR Failed to process order 12345 for user u-1001 after 3 retries"]} />
</div>
{" "}
<p><strong>{"構造化(JSON)"}</strong></p>
{" "}
<div className="code-sample">
<div className="cb-head">
{"JSON"}
</div>
<CodeBlock language="json" lines={["{","  \"timestamp\": \"2026-10-03T10:15:22.431Z\",","  \"level\": \"ERROR\",","  \"message\": \"Failed to process order\",","  \"service\": \"checkout\",","  \"requestId\": \"1234abcd-5678-90ef\",","  \"traceId\": \"1-67890abc-def012345678901234567890\",","  \"orderId\": \"12345\",","  \"userId\": \"u-1001\",","  \"retries\": 3,","  \"errorType\": \"PaymentTimeout\",","  \"durationMs\": 5021","}"]} />
</div>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 60">
<table className="t3">

<thead>

<tr>

<th scope="col">{"比較"}</th>

<th scope="col">{"非構造化"}</th>

<th scope="col">{"構造化(JSON)"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"検索"}</td>

<td>{"文字列検索と正規表現("}<code>{"parse"}</code>{")が必要"}</td>

<td><strong>{"フィールド名で直接検索"}</strong>{"("}<code>{"filter orderId = \"12345\""}</code>{")"}</td>

</tr>

<tr>

<td>{"集計"}</td>

<td>{"難しい"}</td>

<td><code>{"stats count(*) by errorType"}</code>{" のように容易"}</td>

</tr>

<tr>

<td>{"変更への強さ"}</td>

<td>{"文言を変えると検索が壊れる"}</td>

<td>{"フィールドは安定"}</td>

</tr>

<tr>

<td>{"自動処理"}</td>

<td>{"難しい"}</td>

<td>{"メトリクスフィルター、EMF、Athena に素直に連携"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"10-2. 構造化ログに入れる標準項目"}</h4>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 61">
<table className="t3">

<thead>

<tr>

<th scope="col">{"項目"}</th>

<th scope="col">{"例"}</th>

<th scope="col">{"目的"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><code>{"timestamp"}</code></td>

<td>{"ISO 8601(UTC)"}</td>

<td>{"時系列の整列"}</td>

</tr>

<tr>

<td><code>{"level"}</code></td>

<td>{"INFO / ERROR"}</td>

<td>{"絞り込み"}</td>

</tr>

<tr>

<td><code>{"message"}</code></td>

<td>{"短い固定文言"}</td>

<td>{"人が読む説明(変数は別フィールドに)"}</td>

</tr>

<tr>

<td><code>{"service"}</code>{" / "}<code>{"function"}</code></td>

<td>{"checkout"}</td>

<td>{"発生元の特定"}</td>

</tr>

<tr>

<td><code>{"requestId"}</code>{" / "}<code>{"correlationId"}</code></td>

<td>{"UUID"}</td>

<td>{"1 リクエストの追跡"}</td>

</tr>

<tr>

<td><code>{"traceId"}</code></td>

<td>{"X-Ray のトレース ID"}</td>

<td><strong>{"ログとトレースの相関"}</strong></td>

</tr>

<tr>

<td>{"イベント固有項目"}</td>

<td><code>{"orderId"}</code>{", "}<code>{"action"}</code></td>

<td>{"業務の調査"}</td>

</tr>

<tr>

<td><code>{"errorType"}</code>{" / "}<code>{"errorMessage"}</code>{" / "}<code>{"stack"}</code></td>

<td>{"PaymentTimeout"}</td>

<td>{"障害の分類"}</td>

</tr>

<tr>

<td><code>{"durationMs"}</code></td>

<td>{"5021"}</td>

<td>{"性能分析"}</td>

</tr>

<tr>

<td><code>{"coldStart"}</code></td>

<td>{"true"}</td>

<td>{"コールドスタートの把握"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"10-3. ユーザー操作(監査的なイベント)の記録"}</h4>
{" "}
<p>{"「誰が何をしたか」を後から追えるように、"}<strong>{"ユーザー ID・操作・対象・結果"}</strong>{" をイベントとして出力します。"}</p>
{" "}
<div className="code-sample">
<div className="cb-head">
{"JSON"}
</div>
<CodeBlock language="json" lines={["{","  \"level\": \"INFO\",","  \"message\": \"user action\",","  \"action\": \"UPDATE_PROFILE\",","  \"userId\": \"u-1001\",","  \"resourceId\": \"profile-77\",","  \"result\": \"SUCCESS\",","  \"requestId\": \"1234abcd-5678-90ef\"","}"]} />
</div>
{" "}
<p>{"ただしユーザー ID は "}<strong>{"仮名化されたもの(内部 ID)"}</strong>{" を使い、"}<strong>{"生の個人情報は入れない"}</strong>{" ようにします。API 操作そのものの監査は "}<strong>{"CloudTrail"}</strong>{" の役割です(アプリ内の業務イベントは構造化ログで残す)。"}</p>
{" "}
<h4>{"10-4. Powertools Logger の例(Python)"}</h4>
{" "}
<div className="code-sample">
<div className="cb-head">
{"Python"}
</div>
<CodeBlock language="python" lines={["from aws_lambda_powertools import Logger","","logger = Logger(service=\"checkout\")   # JSON で出力される","","@logger.inject_lambda_context(log_event=False, correlation_id_path=\"requestContext.requestId\")","def handler(event, context):","    logger.append_keys(orderId=event[\"orderId\"])","    logger.info(\"processing order\")","    try:","        ...","    except Exception:","        logger.exception(\"order failed\")   # スタックトレースを構造化して出力","        raise"]} />
</div>
{" "}
<p><code>{"inject_lambda_context"}</code>{" は、関数名・メモリ・リクエスト ID・"}<strong>{"コールドスタートの有無"}</strong>{" などを "}<strong>{"全ログに自動付与"}</strong>{" します。"}<code>{"log_event=False"}</code>{" にしてイベント全体の出力(機密の可能性)を避けています。"}</p>
{" "}
<figure className="diagram-card">
<Diagram id="d16" label="図 17" />
</figure>
{" "}
<h3>{"ベストプラクティス"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 62">
<table className="t3">

<thead>

<tr>

<th scope="col">{"項目"}</th>

<th scope="col">{"ベストプラクティス"}</th>

<th scope="col">{"理由"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"形式"}</td>

<td><strong>{"1 行 1 JSON"}</strong>{"(改行を含めない)"}</td>

<td>{"CloudWatch Logs は 1 行を 1 イベントとして扱うため、複数行 JSON は分断される"}</td>

</tr>

<tr>

<td>{"キー名"}</td>

<td>{"全サービスで "}<strong>{"キー名を統一"}</strong>{"("}<code>{"requestId"}</code>{"、"}<code>{"userId"}</code>{" など)し、型も一定に保つ"}</td>

<td>{"横断検索ができる"}</td>

</tr>

<tr>

<td>{"メッセージ"}</td>

<td><code>{"message"}</code>{" は "}<strong>{"固定の短い文"}</strong>{" にし、可変の値は別フィールドへ"}</td>

<td>{"同種のログを 1 つのパターンとして集計できる"}</td>

</tr>

<tr>

<td>{"機密"}</td>

<td>{"パスワード・トークン・生の PII は出さない。"}<strong>{"出力前にマスク"}</strong></td>

<td>{"漏えい防止"}</td>

</tr>

<tr>

<td>{"例外"}</td>

<td>{"例外の型・メッセージ・スタックトレースを "}<strong>{"フィールドとして"}</strong>{" 出力"}</td>

<td>{"エラーの分類・集計"}</td>

</tr>

<tr>

<td>{"ライブラリ"}</td>

<td><strong>{"Powertools for AWS Lambda"}</strong>{" などの実績あるライブラリを使う"}</td>

<td>{"標準項目の自動付与とベストプラクティスの内蔵"}</td>

</tr>

<tr>

<td>{"トレース連携"}</td>

<td><code>{"traceId"}</code>{" を含める"}</td>

<td>{"ログ ↔ トレースのジャンプ"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"ひっかけポイント"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 63">
<table>

<thead>

<tr>

<th scope="col">{"問われ方"}</th>

<th scope="col">{"正しい考え方"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"「ログを CloudWatch Logs Insights で効率よくフィルター・集計したい」"}</td>

<td><strong>{"JSON の構造化ログ"}</strong>{" にする"}</td>

</tr>

<tr>

<td>{"「複数行のスタックトレースが分断される」"}</td>

<td><strong>{"1 行の JSON"}</strong>{" にして、スタックトレースを 1 つのフィールドに入れる"}</td>

</tr>

<tr>

<td>{"「ユーザー操作の記録を残したい」"}</td>

<td>{"構造化ログに "}<strong>{"ユーザー ID・操作・結果"}</strong>{" を出す(API 操作の監査は CloudTrail)"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"参考 URL"}</h3>
{" "}
<ul className="ref-list">
{" "}
<li>{"Powertools Logger(Python): "}<a href="https://docs.powertools.aws.dev/lambda/python/latest/core/logger/" target="_blank" rel="noopener">{"https://docs.powertools.aws.dev/lambda/python/latest/core/logger/"}</a></li>
{" "}
<li>{"Lambda の JSON ログ形式: "}<a href="https://docs.aws.amazon.com/lambda/latest/dg/monitoring-cloudwatchlogs.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/lambda/latest/dg/monitoring-cloudwatchlogs.html"}</a></li>
{" "}
<li>{"Logs Insights の JSON ログの扱い: "}<a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_AnalyzeLogData-discoverable-fields.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_AnalyzeLogData-discoverable-fields.html"}</a></li>
{" "}
<li>{"AWS Observability Best Practices: "}<a href="https://aws-observability.github.io/observability-best-practices/" target="_blank" rel="noopener">{"https://aws-observability.github.io/observability-best-practices/"}</a></li>
{" "}
</ul>
{" "}
</section>); }
