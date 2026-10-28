import { Diagram } from '../Diagram';
/** 原本step-5の全内容。 */
export function Section6() { return (<section className="section" id="step-5" tabIndex={-1}>
{" "}
<div className="sec-head">
<div className="sec-icon">
<i className="ti ti-layout-dashboard" aria-hidden="true"></i>
</div>
<div>
<p className="eyebrow">{"Task 1 · Step 5 · 4.1.5"}</p>
<h2>{"ダッシュボードとインサイトでヘルスを確認する"}</h2>
</div>
</div>
{" "}
<h3>{"この項目で学ぶこと"}</h3>
{" "}
<p>{"アプリ全体が "}<strong>{"健康かどうか"}</strong>{" を一目で見る道具を学びます。個別のログを読む前に、"}<strong>{"ダッシュボードで「どこがおかしいか」を絞る"}</strong>{" のが基本動作です。"}</p>
{" "}
<h3>{"やさしい解説"}</h3>
{" "}
<h4>{"5-1. ヘルス確認の道具"}</h4>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 31">
<table className="t3">

<thead>

<tr>

<th scope="col">{"道具"}</th>

<th scope="col">{"何が分かるか"}</th>

<th scope="col">{"使う場面"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"CloudWatch ダッシュボード"}</strong></td>

<td>{"選んだメトリクス・ログクエリ・アラームを "}<strong>{"1 画面に集約"}</strong></td>

<td>{"全体の健康状態を常時表示"}</td>

</tr>

<tr>

<td><strong>{"CloudWatch Lambda Insights"}</strong></td>

<td>{"Lambda の "}<strong>{"メモリ・CPU・ネットワーク・初期化時間"}</strong>{" などの詳細メトリクス(拡張機能のレイヤーを追加して有効化)"}</td>

<td>{"関数のリソース不足やコールドスタートの調査"}</td>

</tr>

<tr>

<td><strong>{"Container Insights"}</strong></td>

<td>{"ECS / EKS の "}<strong>{"コンテナ単位の CPU・メモリ・ネットワーク"}</strong></td>

<td>{"コンテナの性能調査"}</td>

</tr>

<tr>

<td><strong>{"Contributor Insights"}</strong></td>

<td>{"ログから "}<strong>{"「上位の貢献者」"}</strong>{"(例: リクエスト数の多い IP、エラーを多く出すユーザー)を集計"}</td>

<td>{"「誰が・何が」負荷やエラーの原因かを特定"}</td>

</tr>

<tr>

<td><strong>{"Application Signals"}</strong></td>

<td>{"アプリの "}<strong>{"サービス一覧・SLO・依存関係・RED メトリクス"}</strong>{"(Rate / Errors / Duration)を自動で可視化"}</td>

<td>{"サービス単位の健全性と SLO 管理"}</td>

</tr>

<tr>

<td><strong>{"X-Ray サービスマップ / トレースマップ"}</strong></td>

<td>{"サービス間の依存関係と、"}<strong>{"どこでエラー・遅延が出ているか"}</strong></td>

<td>{"分散アプリの切り分け"}</td>

</tr>

<tr>

<td><strong>{"CloudWatch Synthetics(カナリア)"}</strong></td>

<td><strong>{"外形監視"}</strong>{"。定期的にスクリプトでエンドポイントを呼ぶ"}</td>

<td>{"ユーザー視点の死活・性能監視"}</td>

</tr>

<tr>

<td><strong>{"CloudWatch RUM"}</strong></td>

<td><strong>{"実ユーザーのブラウザ側"}</strong>{" の性能とエラー"}</td>

<td>{"フロントエンドの体感性能"}</td>

</tr>

<tr>

<td><strong>{"AWS Health Dashboard"}</strong></td>

<td>{"AWS 側のサービス障害・メンテナンス情報"}</td>

<td>{"自分のコードではなく AWS 側の問題かを確認"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<figure className="diagram-card">
<Diagram id="d09" label="図 10" />
</figure>
{" "}
<h4>{"5-2. 良いダッシュボードの中身(最小構成)"}</h4>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 32">
<table>

<thead>

<tr>

<th scope="col">{"ウィジェット"}</th>

<th scope="col">{"見る指標"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"入口"}</td>

<td>{"リクエスト数、4xx / 5xx の数と率、"}<strong>{"p99 レイテンシ"}</strong></td>

</tr>

<tr>

<td>{"計算"}</td>

<td>{"Lambda の Errors / Throttles / Duration / ConcurrentExecutions"}</td>

</tr>

<tr>

<td>{"データ"}</td>

<td>{"DynamoDB の ThrottledRequests、RDS の接続数、キャッシュヒット率"}</td>

</tr>

<tr>

<td>{"キュー"}</td>

<td>{"SQS の ApproximateAgeOfOldestMessage、ApproximateNumberOfMessagesVisible"}</td>

</tr>

<tr>

<td>{"アラーム"}</td>

<td>{"重要アラームの状態(OK / ALARM / INSUFFICIENT_DATA)"}</td>

</tr>

<tr>

<td>{"ログ"}</td>

<td>{"エラーログの Logs Insights クエリ結果"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"5-3. ダッシュボードの特徴"}</h4>
{" "}
<ul>
{" "}
<li>{"ダッシュボードは "}<strong>{"リージョンをまたいで"}</strong>{" ウィジェットを配置できる(グローバルな画面として使える)。"}</li>
{" "}
<li>{"メトリクスは "}<strong>{"メトリクス数式(Metric Math)"}</strong>{" で組み合わせられる(例: エラー数 ÷ 呼び出し数 × 100 でエラー率)。"}</li>
{" "}
<li>{"ダッシュボードはコード(JSON)として管理でき、CloudFormation や CDK で "}<strong>{"再現可能な形で配備"}</strong>{" できる。"}</li>
{" "}
</ul>
{" "}
<h3>{"ベストプラクティス"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 33">
<table>

<thead>

<tr>

<th scope="col">{"項目"}</th>

<th scope="col">{"ベストプラクティス"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"指標の選び方"}</td>

<td>{"「"}<strong>{"リクエスト数・エラー・レイテンシ"}</strong>{"」(RED)や、利用状況・飽和・エラーなどの "}<strong>{"目的別の指標"}</strong>{" から始める"}</td>

</tr>

<tr>

<td>{"エラー率"}</td>

<td>{"件数だけでなく "}<strong>{"エラー率(Metric Math)"}</strong>{" で表示する"}</td>

</tr>

<tr>

<td>{"管理"}</td>

<td>{"ダッシュボードを "}<strong>{"IaC(CloudFormation / CDK)"}</strong>{" で管理する"}</td>

</tr>

<tr>

<td>{"目標"}</td>

<td>{"SLO を決め、ダッシュボードに SLO の達成状況を出す(Application Signals)"}</td>

</tr>

<tr>

<td>{"外形監視"}</td>

<td>{"利用者がいない時間帯も "}<strong>{"Synthetics"}</strong>{" で外から監視する"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"ひっかけポイント"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 34">
<table>

<thead>

<tr>

<th scope="col">{"問われ方"}</th>

<th scope="col">{"正しい考え方"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"「Lambda の "}<strong>{"メモリ使用量・CPU・コールドスタート"}</strong>{" をダッシュボード化したい」"}</td>

<td><strong>{"CloudWatch Lambda Insights"}</strong>{"(標準の Lambda メトリクスにメモリ使用率は出ない)"}</td>

</tr>

<tr>

<td>{"「どのクライアント IP が一番リクエストを送っているか」"}</td>

<td><strong>{"Contributor Insights"}</strong></td>

</tr>

<tr>

<td>{"「ユーザーが使う前に障害を検知したい」"}</td>

<td><strong>{"CloudWatch Synthetics"}</strong></td>

</tr>

<tr>

<td>{"「自分のコードは正常。AWS 側の障害か確認」"}</td>

<td><strong>{"AWS Health Dashboard"}</strong></td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"参考 URL"}</h3>
{" "}
<ul className="ref-list">
{" "}
<li>{"CloudWatch ダッシュボード: "}<a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Dashboards.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Dashboards.html"}</a></li>
{" "}
<li>{"Lambda Insights: "}<a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Lambda-Insights.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Lambda-Insights.html"}</a></li>
{" "}
<li>{"Contributor Insights: "}<a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/ContributorInsights.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/ContributorInsights.html"}</a></li>
{" "}
<li>{"Application Signals: "}<a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Application-Monitoring-Sections.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Application-Monitoring-Sections.html"}</a></li>
{" "}
</ul>
{" "}
</section>); }
