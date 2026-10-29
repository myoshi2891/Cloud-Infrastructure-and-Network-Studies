import { CodeBlock } from '../CodeBlock';
import { Diagram } from '../Diagram';
/** 原本step-2の全内容。 */
export function Section3() { return (<section className="section" id="step-2" tabIndex={-1}>
{" "}
<div className="sec-head">
<div className="sec-icon">
<i className="ti ti-chart-line" aria-hidden="true"></i>
</div>
<div>
<p className="eyebrow">{"Task 1 · Step 2 · 4.1.2"}</p>
<h2>{"メトリクス・ログ・トレースを読み解く"}</h2>
</div>
</div>
{" "}
<h3>{"この項目で学ぶこと"}</h3>
{" "}
<p>{"調査には "}<strong>{"3 種類のデータ"}</strong>{" があります。それぞれ「何が分かるか」「どこで見るか」を使い分けられることが目標です。"}</p>
{" "}
<h3>{"やさしい解説"}</h3>
{" "}
<h4>{"2-1. 3 つのシグナル"}</h4>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 14">
<table className="t4">

<thead>

<tr>

<th scope="col">{"シグナル"}</th>

<th scope="col">{"一言で"}</th>

<th scope="col">{"得意な質問"}</th>

<th scope="col">{"主なサービス"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"メトリクス"}</td>

<td>{"数値の推移"}</td>

<td>{"「"}<strong>{"いつ"}</strong>{" から "}<strong>{"どれくらい"}</strong>{" 悪い?」"}</td>

<td>{"CloudWatch Metrics"}</td>

</tr>

<tr>

<td>{"ログ"}</td>

<td>{"出来事の記録"}</td>

<td>{"「"}<strong>{"何が"}</strong>{" 起きた?」「"}<strong>{"なぜ"}</strong>{" 失敗した?」"}</td>

<td>{"CloudWatch Logs"}</td>

</tr>

<tr>

<td>{"トレース"}</td>

<td>{"リクエストの道のり"}</td>

<td>{"「"}<strong>{"どこで"}</strong>{" 遅い・失敗している?」"}</td>

<td>{"AWS X-Ray(OpenTelemetry)"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<figure className="diagram-card">
<Diagram id="d04" label="図 5" />
</figure>
{" "}
<p>{"覚え方は "}<strong>{"「メトリクスで気づき、トレースで場所を絞り、ログで理由を知る」"}</strong>{" です。"}</p>
{" "}
<h4>{"2-2. メトリクスの読み方"}</h4>
{" "}
<p>{"CloudWatch のメトリクスは "}<strong>{"名前空間 → メトリクス名 → ディメンション"}</strong>{" で特定します。"}</p>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 15">
<table>

<thead>

<tr>

<th scope="col">{"要素"}</th>

<th scope="col">{"例"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"名前空間"}</td>

<td><code>{"AWS/Lambda"}</code></td>

</tr>

<tr>

<td>{"メトリクス名"}</td>

<td><code>{"Errors"}</code></td>

</tr>

<tr>

<td>{"ディメンション"}</td>

<td><code>{"FunctionName = order-handler"}</code></td>

</tr>

<tr>

<td>{"統計"}</td>

<td><code>{"Sum"}</code>{" / "}<code>{"Average"}</code>{" / "}<code>{"Maximum"}</code>{" / "}<code>{"p99"}</code>{"(パーセンタイル)"}</td>

</tr>

<tr>

<td>{"期間(Period)"}</td>

<td>{"60 秒、300 秒など"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p><strong>{"平均だけを見ない"}</strong>{" のが重要です。平均が良くても、"}<strong>{"p99(100 回に 1 回の最悪ケース)"}</strong>{" が悪いことがあります。ユーザー体験は p95・p99 で判断します。"}</p>
{" "}
<h4>{"2-3. Lambda で必ず見るメトリクス"}</h4>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 16">
<table className="t3">

<thead>

<tr>

<th scope="col">{"メトリクス"}</th>

<th scope="col">{"意味"}</th>

<th scope="col">{"異常時の疑い"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><code>{"Invocations"}</code></td>

<td>{"呼び出し回数"}</td>

<td>{"急増なら呼び出し元の暴走"}</td>

</tr>

<tr>

<td><code>{"Errors"}</code></td>

<td>{"関数エラー数"}</td>

<td>{"コードのバグ、タイムアウト、権限不足"}</td>

</tr>

<tr>

<td><code>{"Throttles"}</code></td>

<td>{"スロットルされた回数"}</td>

<td><strong>{"同時実行数の上限"}</strong>{" に到達"}</td>

</tr>

<tr>

<td><code>{"Duration"}</code></td>

<td>{"実行時間"}</td>

<td>{"遅延、メモリ不足、外部呼び出しの遅れ"}</td>

</tr>

<tr>

<td><code>{"ConcurrentExecutions"}</code></td>

<td>{"同時実行数"}</td>

<td>{"上限に近いと Throttles が出る"}</td>

</tr>

<tr>

<td><code>{"IteratorAge"}</code></td>

<td>{"ストリームの処理遅れ(Kinesis / DynamoDB Streams)"}</td>

<td>{"消費が追いついていない"}</td>

</tr>

<tr>

<td><code>{"DeadLetterErrors"}</code></td>

<td>{"DLQ への送信失敗"}</td>

<td>{"DLQ の権限・設定不備"}</td>

</tr>

<tr>

<td><code>{"AsyncEventsDropped"}</code></td>

<td>{"非同期呼び出しが破棄された数"}</td>

<td>{"再試行を使い切って DLQ もない"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"2-4. Lambda のログ(REPORT 行)の読み方"}</h4>
{" "}
<p>{"Lambda は呼び出しごとに次の 3 行を自動で CloudWatch Logs に出力します。"}</p>
{" "}
<div className="code-sample">
<div className="cb-head">
{"テキスト"}
</div>
<CodeBlock language="plaintext" lines={["START RequestId: 1234abcd-... Version: $LATEST","END RequestId: 1234abcd-...","REPORT RequestId: 1234abcd-...  Duration: 215.34 ms  Billed Duration: 216 ms  Memory Size: 512 MB  Max Memory Used: 187 MB  Init Duration: 412.11 ms"]} />
</div>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 17">
<table>

<thead>

<tr>

<th scope="col">{"項目"}</th>

<th scope="col">{"読み方"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><code>{"Duration"}</code></td>

<td>{"実際の処理時間"}</td>

</tr>

<tr>

<td><code>{"Billed Duration"}</code></td>

<td>{"課金対象の時間"}</td>

</tr>

<tr>

<td><code>{"Memory Size"}</code></td>

<td>{"割り当てたメモリ"}</td>

</tr>

<tr>

<td><code>{"Max Memory Used"}</code></td>

<td>{"実際に使った最大メモリ(割り当てと比べて "}<strong>{"余裕があるか"}</strong>{" を判断)"}</td>

</tr>

<tr>

<td><code>{"Init Duration"}</code></td>

<td><strong>{"コールドスタート時だけ"}</strong>{" 出る初期化時間。これがあれば「新しい実行環境が作られた」"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"2-5. トレースの読み方(X-Ray)"}</h4>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 18">
<table>

<thead>

<tr>

<th scope="col">{"用語"}</th>

<th scope="col">{"意味"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"トレース(Trace)"}</td>

<td>{"1 リクエストの全体。トレース ID で識別"}</td>

</tr>

<tr>

<td>{"セグメント(Segment)"}</td>

<td>{"1 つのサービスの作業記録"}</td>

</tr>

<tr>

<td>{"サブセグメント(Subsegment)"}</td>

<td>{"セグメント内の "}<strong>{"下流呼び出し"}</strong>{"(DynamoDB 呼び出し、HTTP 呼び出しなど)"}</td>

</tr>

<tr>

<td>{"サービスマップ"}</td>

<td>{"サービス間の呼び出し関係と "}<strong>{"平均レイテンシ・エラー率"}</strong>{" を図示したもの"}</td>

</tr>

<tr>

<td>{"エラー / フォルト / スロットル"}</td>

<td>{"4xx(エラー)、5xx(フォルト)、429(スロットル)として色分けされる"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<figure className="diagram-card">
<Diagram id="d05" label="図 6" />
</figure>
{" "}
<p>{"サービスマップ上で "}<strong>{"赤(フォルト)や黄(エラー)の丸"}</strong>{" になっているノードが調査の起点です。"}</p>
{" "}
<h3>{"ベストプラクティス"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 19">
<table>

<thead>

<tr>

<th scope="col">{"項目"}</th>

<th scope="col">{"ベストプラクティス"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"見る順番"}</td>

<td>{"ダッシュボード(全体)→ メトリクス(いつ)→ トレース(どこ)→ ログ(なぜ)"}</td>

</tr>

<tr>

<td>{"統計"}</td>

<td>{"レイテンシは平均ではなく "}<strong>{"p90 / p95 / p99"}</strong>{" を見る"}</td>

</tr>

<tr>

<td>{"期間"}</td>

<td>{"問題発生の "}<strong>{"前後"}</strong>{" を含めて見て、デプロイや設定変更との時間的な一致を探す"}</td>

</tr>

<tr>

<td>{"相関"}</td>

<td>{"ログにトレース ID・リクエスト ID を出力し、"}<strong>{"トレースとログを結びつける"}</strong></td>

</tr>

<tr>

<td>{"確認事項"}</td>

<td>{"「そもそもエラー率は何%か」「影響を受けたのは全体か一部か」を最初に確認する"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"ひっかけポイント"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 20">
<table>

<thead>

<tr>

<th scope="col">{"問われ方"}</th>

<th scope="col">{"正しい考え方"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"「1 回の処理にどのサービスが遅いかを知りたい」"}</td>

<td><strong>{"X-Ray のトレース"}</strong>{"(メトリクスやログだけでは道のりが分からない)"}</td>

</tr>

<tr>

<td>{"「Lambda が上限でスロットルされているか」"}</td>

<td><strong><code>{"Throttles"}</code>{" メトリクス"}</strong>{" と "}<code>{"ConcurrentExecutions"}</code></td>

</tr>

<tr>

<td>{"「コールドスタートの影響を確認したい」"}</td>

<td>{"ログの "}<strong><code>{"Init Duration"}</code></strong>{" の有無と値"}</td>

</tr>

<tr>

<td>{"「ストリーム処理が遅れている」"}</td>

<td><strong><code>{"IteratorAge"}</code></strong></td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"参考 URL"}</h3>
{" "}
<ul className="ref-list">
{" "}
<li>{"Lambda のメトリクス: "}<a href="https://docs.aws.amazon.com/lambda/latest/dg/monitoring-metrics.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/lambda/latest/dg/monitoring-metrics.html"}</a></li>
{" "}
<li>{"Lambda のログ: "}<a href="https://docs.aws.amazon.com/lambda/latest/dg/monitoring-cloudwatchlogs.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/lambda/latest/dg/monitoring-cloudwatchlogs.html"}</a></li>
{" "}
<li>{"X-Ray の概念: "}<a href="https://docs.aws.amazon.com/xray/latest/devguide/xray-concepts.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/xray/latest/devguide/xray-concepts.html"}</a></li>
{" "}
<li>{"CloudWatch の概念(メトリクス・名前空間・ディメンション): "}<a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html"}</a></li>
{" "}
</ul>
{" "}
</section>); }
