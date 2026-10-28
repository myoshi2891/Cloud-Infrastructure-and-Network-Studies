import { CodeBlock } from '../CodeBlock';
import { Diagram } from '../Diagram';
/** 原本step-11の全内容。 */
export function Section12() { return (<section className="section" id="step-11" tabIndex={-1}>
{" "}
<div className="sec-head">
<div className="sec-icon">
<i className="ti ti-chart-bar" aria-hidden="true"></i>
</div>
<div>
<p className="eyebrow">{"Task 2 · Step 11 · 4.2.3"}</p>
<h2>{"カスタムメトリクスを出力するコード"}</h2>
</div>
</div>
{" "}
<h3>{"この項目で学ぶこと"}</h3>
{" "}
<p><a href="#step-4">{"Step 4"}</a>{" では「カスタムメトリクスとは何か・EMF とは何か」を学びました。ここでは "}<strong>{"「コードにどう組み込むか」"}</strong>{" に焦点を当てます。"}</p>
{" "}
<h3>{"やさしい解説"}</h3>
{" "}
<h4>{"11-1. 何をメトリクスにするか(RED と業務指標)"}</h4>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 64">
<table>

<thead>

<tr>

<th scope="col">{"種類"}</th>

<th scope="col">{"例"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"Rate(量)"}</td>

<td>{"リクエスト数、注文数"}</td>

</tr>

<tr>

<td>{"Errors(失敗)"}</td>

<td>{"決済失敗数、バリデーションエラー数"}</td>

</tr>

<tr>

<td>{"Duration(時間)"}</td>

<td>{"処理時間、外部 API の応答時間"}</td>

</tr>

<tr>

<td>{"業務指標"}</td>

<td>{"カート追加数、ログイン成功数"}</td>

</tr>

<tr>

<td>{"内部状態"}</td>

<td>{"キューの滞留数、キャッシュヒット率、コールドスタート回数"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"11-2. 実装方法の比較"}</h4>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 65">
<table className="t4">

<thead>

<tr>

<th scope="col">{"方法"}</th>

<th scope="col">{"コードの例"}</th>

<th scope="col">{"長所"}</th>

<th scope="col">{"短所"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><code>{"PutMetricData"}</code></td>

<td><code>{"cloudwatch.put_metric_data(...)"}</code></td>

<td>{"どの環境でも使える"}</td>

<td><strong>{"同期 API"}</strong>{"。Lambda では実行時間・コストが増える。API のクォータ(スロットリング)に注意"}</td>

</tr>

<tr>

<td>{"EMF を手書き"}</td>

<td><code>{"print(json.dumps({...}))"}</code></td>

<td>{"依存なし・非同期"}</td>

<td>{"形式を間違えやすい"}</td>

</tr>

<tr>

<td><strong>{"Powertools Metrics"}</strong></td>

<td><code>{"metrics.add_metric(...)"}</code></td>

<td><strong>{"EMF を自動生成"}</strong>{"。ディメンション・単位の管理が楽。関数の終了時にまとめて出力"}</td>

<td>{"ライブラリの追加が必要"}</td>

</tr>

<tr>

<td>{"メトリクスフィルター"}</td>

<td>{"コード変更なし"}</td>

<td>{"既存ログから作れる"}</td>

<td>{"柔軟性が低い"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"11-3. PutMetricData の例(Python / boto3)"}</h4>
{" "}
<div className="code-sample">
<div className="cb-head">
{"Python"}
</div>
<CodeBlock language="python" lines={["import boto3","cw = boto3.client(\"cloudwatch\")","","cw.put_metric_data(","    Namespace=\"ShopApp\",","    MetricData=[{","        \"MetricName\": \"PaymentFailures\",","        \"Dimensions\": [{\"Name\": \"Service\", \"Value\": \"checkout\"}],","        \"Value\": 1,","        \"Unit\": \"Count\"","    }]",")"]} />
</div>
{" "}
<p>{"複数のデータポイントは "}<strong>{"1 回の呼び出しにまとめて送る(バッチ化)"}</strong>{" ことで、API 呼び出し回数を減らせます。"}</p>
{" "}
<h4>{"11-4. 送る前に決めること"}</h4>
{" "}
<figure className="diagram-card">
<Diagram id="d17" label="図 18" />
</figure>
{" "}
<h3>{"ベストプラクティス"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 66">
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

<td>{"Lambda"}</td>

<td><strong>{"EMF(Powertools Metrics)を使い、"}<code>{"PutMetricData"}</code>{" の同期呼び出しを避ける"}</strong></td>

<td>{"余計な遅延・コスト・API スロットリングを避ける"}</td>

</tr>

<tr>

<td>{"バッチ化"}</td>

<td><code>{"PutMetricData"}</code>{" を使う場合は複数のデータポイントを "}<strong>{"まとめて送る"}</strong></td>

<td>{"呼び出し回数の削減"}</td>

</tr>

<tr>

<td>{"ディメンション"}</td>

<td>{"少数・固定の値のみ。"}<strong>{"最大数にも上限"}</strong>{" がある"}</td>

<td>{"カーディナリティ爆発の防止"}</td>

</tr>

<tr>

<td>{"命名"}</td>

<td>{"一貫した "}<strong>{"命名規則と単位"}</strong></td>

<td>{"ダッシュボード・アラームの再利用"}</td>

</tr>

<tr>

<td>{"テスト"}</td>

<td>{"メトリクスが "}<strong>{"CloudWatch に届いていること"}</strong>{" をデプロイ後に確認"}</td>

<td>{"計装漏れの検知"}</td>

</tr>

<tr>

<td>{"アラーム連携"}</td>

<td>{"メトリクスを作ったら "}<strong>{"アラームも同時に"}</strong>{" 設計する"}</td>

<td>{"見るだけで終わらせない"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"ひっかけポイント"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 67">
<table>

<thead>

<tr>

<th scope="col">{"問われ方"}</th>

<th scope="col">{"正しい考え方"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"「Lambda から大量のカスタムメトリクスを、パフォーマンスに影響させず送る」"}</td>

<td><strong>{"EMF"}</strong></td>

</tr>

<tr>

<td>{"「"}<code>{"PutMetricData"}</code>{" で ThrottlingException」"}</td>

<td>{"呼び出し回数が多すぎる。"}<strong>{"バッチ化"}</strong>{" または "}<strong>{"EMF"}</strong>{" へ移行"}</td>

</tr>

<tr>

<td>{"「ユーザー ID ごとのメトリクスにしたい」"}</td>

<td>{"通常は不適切。"}<strong>{"ログ(EMF のプロパティ)+ Logs Insights / Contributor Insights"}</strong>{" で集計"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"参考 URL"}</h3>
{" "}
<ul className="ref-list">
{" "}
<li>{"カスタムメトリクスの発行(PutMetricData): "}<a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/publishingMetrics.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/publishingMetrics.html"}</a></li>
{" "}
<li>{"EMF の仕様: "}<a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Embedded_Metric_Format_Specification.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Embedded_Metric_Format_Specification.html"}</a></li>
{" "}
<li>{"Powertools Metrics(Python): "}<a href="https://docs.powertools.aws.dev/lambda/python/latest/core/metrics/" target="_blank" rel="noopener">{"https://docs.powertools.aws.dev/lambda/python/latest/core/metrics/"}</a></li>
{" "}
</ul>
{" "}
</section>); }
