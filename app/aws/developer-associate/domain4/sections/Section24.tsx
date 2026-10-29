import { Diagram } from '../Diagram';
/** 原本step-23の全内容。 */
export function Section24() { return (<section className="section" id="step-23" tabIndex={-1}>
{" "}
<div className="sec-head">
<div className="sec-icon">
<i className="ti ti-radar-2" aria-hidden="true"></i>
</div>
<div>
<p className="eyebrow">{"Task 3 · Step 23 · 4.3.8"}</p>
<h2>{"パフォーマンス問題を分析する"}</h2>
</div>
</div>
{" "}
<h3>{"この項目で学ぶこと"}</h3>
{" "}
<p>{"「遅い」「失敗が増えた」という症状から、"}<strong>{"原因を体系的に絞り込む"}</strong>{" 手順を学びます。ここまでの Step の知識を "}<strong>{"総合して使う"}</strong>{" 項目です。"}</p>
{" "}
<h3>{"やさしい解説"}</h3>
{" "}
<h4>{"23-1. 分析の基本手順"}</h4>
{" "}
<figure className="diagram-card">
<Diagram id="d32" label="図 33" />
</figure>
{" "}
<h4>{"23-2. 層ごとの「見るメトリクス」"}</h4>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 139">
<table className="t3">

<thead>

<tr>

<th scope="col">{"層"}</th>

<th scope="col">{"メトリクス"}</th>

<th scope="col">{"異常のサイン"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"API Gateway"}</strong></td>

<td><code>{"Latency"}</code>{"、"}<code>{"IntegrationLatency"}</code>{"、"}<code>{"4XXError"}</code>{"、"}<code>{"5XXError"}</code>{"、"}<code>{"Count"}</code>{"、"}<code>{"CacheHitCount"}</code></td>

<td><code>{"Latency − IntegrationLatency"}</code>{" が大きい → API Gateway 側。"}<code>{"IntegrationLatency"}</code>{" が大きい → バックエンド"}</td>

</tr>

<tr>

<td><strong>{"ALB"}</strong></td>

<td><code>{"TargetResponseTime"}</code>{"、"}<code>{"HTTPCode_Target_5XX_Count"}</code>{"、"}<code>{"HTTPCode_ELB_5XX_Count"}</code>{"、"}<code>{"UnHealthyHostCount"}</code>{"、"}<code>{"RequestCount"}</code></td>

<td>{"応答時間の増加、異常ホストの増加"}</td>

</tr>

<tr>

<td><strong>{"Lambda"}</strong></td>

<td><code>{"Duration"}</code>{"、"}<code>{"Errors"}</code>{"、"}<code>{"Throttles"}</code>{"、"}<code>{"ConcurrentExecutions"}</code>{"、"}<code>{"Init Duration"}</code>{"、"}<code>{"IteratorAge"}</code></td>

<td>{"後述の症状表を参照"}</td>

</tr>

<tr>

<td><strong>{"DynamoDB"}</strong></td>

<td><code>{"ThrottledRequests"}</code>{"、"}<code>{"ReadThrottleEvents"}</code>{"、"}<code>{"WriteThrottleEvents"}</code>{"、"}<code>{"SuccessfulRequestLatency"}</code>{"、"}<code>{"ConsumedRead/WriteCapacityUnits"}</code></td>

<td>{"スロットリング、容量消費の偏り"}</td>

</tr>

<tr>

<td><strong>{"RDS / Aurora"}</strong></td>

<td><code>{"CPUUtilization"}</code>{"、"}<code>{"DatabaseConnections"}</code>{"、"}<code>{"ReadLatency"}</code>{"、"}<code>{"WriteLatency"}</code>{"、Performance Insights"}</td>

<td>{"接続数上限、遅いクエリ、ロック待ち"}</td>

</tr>

<tr>

<td><strong>{"ElastiCache"}</strong></td>

<td><code>{"CacheHitRate"}</code>{"、"}<code>{"Evictions"}</code>{"、"}<code>{"CPUUtilization"}</code>{"、"}<code>{"CurrConnections"}</code></td>

<td>{"ヒット率低下、頻繁な削除(メモリ不足)"}</td>

</tr>

<tr>

<td><strong>{"SQS"}</strong></td>

<td><code>{"ApproximateAgeOfOldestMessage"}</code>{"、"}<code>{"ApproximateNumberOfMessagesVisible"}</code></td>

<td>{"滞留時間の増加(消費が追いつかない)"}</td>

</tr>

<tr>

<td><strong>{"Kinesis"}</strong></td>

<td><code>{"GetRecords.IteratorAgeMilliseconds"}</code>{"、"}<code>{"WriteProvisionedThroughputExceeded"}</code></td>

<td>{"処理遅延、シャードの上限超過"}</td>

</tr>

<tr>

<td><strong>{"CloudFront"}</strong></td>

<td><code>{"CacheHitRate"}</code>{"、"}<code>{"4xxErrorRate"}</code>{"、"}<code>{"5xxErrorRate"}</code>{"、"}<code>{"OriginLatency"}</code></td>

<td>{"ヒット率の低下、オリジンの遅延"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"23-3. 症状別の診断表(Lambda)"}</h4>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 140">
<table className="t4">

<thead>

<tr>

<th scope="col">{"症状"}</th>

<th scope="col">{"考えられる原因"}</th>

<th scope="col">{"確認方法"}</th>

<th scope="col">{"対策"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"最初の数回だけ遅い"}</td>

<td><strong>{"コールドスタート"}</strong></td>

<td>{"ログの "}<code>{"Init Duration"}</code></td>

<td>{"パッケージ縮小、SnapStart、プロビジョニング済み同時実行数"}</td>

</tr>

<tr>

<td>{"常に遅い(CPU 処理)"}</td>

<td><strong>{"CPU 不足"}</strong>{"(メモリ設定が低い)"}</td>

<td><code>{"Duration"}</code>{" とメモリ設定、Power Tuning"}</td>

<td><strong>{"メモリを増やす"}</strong></td>

</tr>

<tr>

<td>{"常に遅い(下流待ち)"}</td>

<td><strong>{"下流(DB・外部 API)が遅い"}</strong></td>

<td>{"トレースのサブセグメント"}</td>

<td>{"下流の改善、キャッシュ、非同期化"}</td>

</tr>

<tr>

<td><code>{"Task timed out"}</code>{" が増加"}</td>

<td>{"下流の遅延増加、タイムアウト設定が短い"}</td>

<td><code>{"Duration"}</code>{" が設定値に張り付く"}</td>

<td>{"原因の下流を解消、タイムアウト調整"}</td>

</tr>

<tr>

<td><code>{"Throttles"}</code>{" が増加"}</td>

<td><strong>{"同時実行数の上限"}</strong>{" に到達"}</td>

<td><code>{"ConcurrentExecutions"}</code>{"、"}<code>{"Throttles"}</code></td>

<td>{"上限の引き上げ、予約済み / 処理時間の短縮、SQS でバッファ"}</td>

</tr>

<tr>

<td><code>{"Errors"}</code>{" が増加"}</td>

<td>{"バグ、権限、依存先障害"}</td>

<td>{"エラーログ、トレース"}</td>

<td>{"原因に応じた修正"}</td>

</tr>

<tr>

<td>{"メモリ不足で終了"}</td>

<td><code>{"Max Memory Used"}</code>{" が割り当て到達"}</td>

<td>{"REPORT 行"}</td>

<td>{"メモリ増、データ量の見直し"}</td>

</tr>

<tr>

<td>{"ストリーム処理の遅れ"}</td>

<td>{"処理が追いつかない、不良レコード"}</td>

<td><code>{"IteratorAge"}</code></td>

<td>{"並列化係数・バッチ調整、"}<strong>{"失敗レコードの隔離"}</strong></td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"23-4. 症状別の診断表(その他)"}</h4>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 141">
<table className="t3">

<thead>

<tr>

<th scope="col">{"症状"}</th>

<th scope="col">{"原因"}</th>

<th scope="col">{"対策"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"DynamoDB の "}<code>{"ProvisionedThroughputExceededException"}</code></td>

<td>{"容量不足、"}<strong>{"ホットパーティション"}</strong></td>

<td>{"容量の見直し / オンデマンド、キー設計の見直し、"}<strong>{"DAX"}</strong>{"、バックオフ"}</td>

</tr>

<tr>

<td>{"RDS への接続エラー(too many connections)"}</td>

<td>{"Lambda からの接続の急増"}</td>

<td><strong>{"RDS Proxy"}</strong>{"、同時実行数の制限"}</td>

</tr>

<tr>

<td>{"ALB の 502"}</td>

<td>{"ターゲットの不正な応答、接続の切断(アイドルタイムアウトの不整合)"}</td>

<td>{"アプリのキープアライブ設定、応答の形式"}</td>

</tr>

<tr>

<td>{"ALB の 503"}</td>

<td><strong>{"登録済みターゲットがない、または全ターゲットが unused(未使用)状態"}</strong></td>

<td>{"ターゲットの登録状況、ロードバランサーで有効な AZ、ターゲットの状態(unused の理由)を確認"}</td>

</tr>

<tr>

<td>{"ALB の 504"}</td>

<td>{"ターゲットの応答がタイムアウト"}</td>

<td>{"アプリの処理時間、"}<strong>{"アイドルタイムアウトの調整"}</strong>{"、非同期化"}</td>

</tr>

<tr>

<td>{"API Gateway の 504"}</td>

<td>{"統合のタイムアウト(REST は既定 29 秒)"}</td>

<td>{"処理の短縮 / 非同期化"}</td>

</tr>

<tr>

<td>{"CloudFront の 5xx / オリジン遅延"}</td>

<td>{"オリジンの障害・過負荷"}</td>

<td>{"オリジンのスケール、キャッシュ強化、オリジンフェイルオーバー"}</td>

</tr>

<tr>

<td>{"キャッシュヒット率が低い"}</td>

<td>{"キャッシュキーが細かすぎる、TTL が短い"}</td>

<td>{"キャッシュキーの最小化(Step 20)"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"ベストプラクティス"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 142">
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

<td>{"準備"}</td>

<td><strong>{"平常時のベースライン"}</strong>{"(通常の p50 / p99、エラー率)を把握しておく"}</td>

<td>{"異常の判断基準になる"}</td>

</tr>

<tr>

<td>{"変更履歴"}</td>

<td>{"デプロイ・設定変更を "}<strong>{"ダッシュボードに注釈"}</strong>{" として残す"}</td>

<td>{"因果関係の特定が速い"}</td>

</tr>

<tr>

<td>{"仮説検証"}</td>

<td><strong>{"1 回に 1 つ"}</strong>{" だけ変える"}</td>

<td>{"効果を切り分けられる"}</td>

</tr>

<tr>

<td>{"全体像"}</td>

<td><strong>{"ユーザー体験(エンドツーエンド)"}</strong>{" から見て、下の層へ掘り下げる"}</td>

<td>{"影響の大きい箇所を優先できる"}</td>

</tr>

<tr>

<td>{"再発防止"}</td>

<td>{"原因が分かったら "}<strong>{"アラームとダッシュボードに反映"}</strong></td>

<td>{"次回は早く検知"}</td>

</tr>

<tr>

<td>{"AI 支援"}</td>

<td>{"AWS の AI ツールで "}<strong>{"エラーの分析やトラブルシューティング提案"}</strong>{" を得る"}</td>

<td>{"新興トピック("}<a href="#app-d">{"付録 D"}</a>{")"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"ひっかけポイント"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 143">
<table>

<thead>

<tr>

<th scope="col">{"問われ方"}</th>

<th scope="col">{"正しい考え方"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"「API Gateway の遅延の内訳が知りたい」"}</td>

<td><code>{"Latency"}</code>{" と "}<code>{"IntegrationLatency"}</code>{" の "}<strong>{"差"}</strong></td>

</tr>

<tr>

<td>{"「負荷が増えると Lambda が 429 を返す」"}</td>

<td><strong>{"同時実行数の上限"}</strong>{"(予約済み / 引き上げ / SQS バッファ)"}</td>

</tr>

<tr>

<td>{"「DynamoDB が一部のキーだけスロットルされる」"}</td>

<td><strong>{"ホットパーティション"}</strong>{"(キー設計)"}</td>

</tr>

<tr>

<td>{"「ALB が 503」"}</td>

<td><strong>{"登録済みターゲットがない、または全ターゲットが unused(未使用)状態"}</strong></td>

</tr>

<tr>

<td>{"「ALB が 504」"}</td>

<td><strong>{"ターゲットが時間内に応答しない"}</strong></td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"参考 URL"}</h3>
{" "}
<ul className="ref-list">
{" "}
<li>{"API Gateway のメトリクス(Latency / IntegrationLatency): "}<a href="https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-metrics-and-dimensions.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-metrics-and-dimensions.html"}</a></li>
{" "}
<li>{"ALB のメトリクス: "}<a href="https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-cloudwatch-metrics.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-cloudwatch-metrics.html"}</a></li>
{" "}
<li>{"DynamoDB のメトリクス: "}<a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/metrics-dimensions.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/metrics-dimensions.html"}</a></li>
{" "}
<li>{"Lambda のトラブルシューティング: "}<a href="https://docs.aws.amazon.com/lambda/latest/dg/lambda-troubleshooting.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/lambda/latest/dg/lambda-troubleshooting.html"}</a></li>
{" "}
<li>{"ALB のトラブルシューティング: "}<a href="https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-troubleshooting.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-troubleshooting.html"}</a></li>
{" "}
</ul>
{" "}
</section>); }
