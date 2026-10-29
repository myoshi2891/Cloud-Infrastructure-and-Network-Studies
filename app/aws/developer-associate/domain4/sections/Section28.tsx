/** 原本app-cの全内容。 */
export function Section28() { return (<section className="section" id="app-c" tabIndex={-1}>
{" "}
<div className="sec-head">
<div className="sec-icon">
<i className="ti ti-alert-triangle" aria-hidden="true"></i>
</div>
<div>
<p className="eyebrow">{"付録 C"}</p>
<h2>{"試験のひっかけパターン"}</h2>
</div>
</div>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 150">
<table className="t3">

<thead>

<tr>

<th scope="col">{"カテゴリ"}</th>

<th scope="col">{"混同しやすい 2 つ"}</th>

<th scope="col">{"見分け方"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"監視の役割"}</td>

<td>{"ロギング / モニタリング / オブザーバビリティ"}</td>

<td>{"記録 / 既知の指標を見張る / 未知の問題を調べられる能力"}</td>

</tr>

<tr>

<td>{"トレース"}</td>

<td>{"アノテーション / メタデータ"}</td>

<td>{"検索する = アノテーション(インデックスあり)、保存だけ = メタデータ"}</td>

</tr>

<tr>

<td>{"メトリクス送信"}</td>

<td><code>{"PutMetricData"}</code>{" / EMF"}</td>

<td>{"Lambda で非同期・追加遅延なし = EMF"}</td>

</tr>

<tr>

<td>{"Lambda の同時実行"}</td>

<td>{"予約済み / プロビジョニング済み"}</td>

<td>{"枠の確保と上限・無料 / 初期化済みの待機・有料・コールドスタート対策"}</td>

</tr>

<tr>

<td>{"Lambda の性能"}</td>

<td>{"CPU を増やす方法"}</td>

<td><strong>{"メモリを増やす"}</strong>{"(CPU 単独の設定なし)"}</td>

</tr>

<tr>

<td>{"キャッシュ戦略"}</td>

<td>{"遅延読み込み / ライトスルー"}</td>

<td>{"読むときに詰める(古くなる)/ 書くときに詰める(新鮮・無駄あり)"}</td>

</tr>

<tr>

<td>{"DynamoDB キャッシュ"}</td>

<td>{"DAX / ElastiCache"}</td>

<td>{"DynamoDB 専用でコード変更少 = DAX、汎用 = ElastiCache"}</td>

</tr>

<tr>

<td>{"CloudFront"}</td>

<td>{"キャッシュポリシー / オリジンリクエストポリシー"}</td>

<td>{"キャッシュキーと TTL / オリジンへ転送する値(キャッシュキーに入れない)"}</td>

</tr>

<tr>

<td>{"プローブ"}</td>

<td>{"Liveness / Readiness"}</td>

<td>{"再起動する / トラフィックから外す(再起動しない)"}</td>

</tr>

<tr>

<td>{"通知"}</td>

<td>{"CloudWatch アラーム / EventBridge"}</td>

<td>{"しきい値超過 = アラーム、状態変化イベント = EventBridge"}</td>

</tr>

<tr>

<td>{"ログの用途"}</td>

<td>{"Logs Insights / メトリクスフィルター / サブスクリプションフィルター"}</td>

<td>{"検索・集計 / ログからメトリクス化(過去分には適用されない)/ 外部へ転送"}</td>

</tr>

<tr>

<td>{"調査対象"}</td>

<td>{"アプリのログ / CloudTrail"}</td>

<td>{"アプリの出来事 / AWS API 操作の履歴"}</td>

</tr>

<tr>

<td>{"SQS + Lambda"}</td>

<td>{"可視性タイムアウトの設定"}</td>

<td>{"関数のタイムアウトの 6 倍 + MaximumBatchingWindowInSeconds 以上"}</td>

</tr>

<tr>

<td>{"X-Ray の将来"}</td>

<td>{"X-Ray サービス / X-Ray SDK"}</td>

<td>{"サービスは継続、SDK は 2026-02-25 にメンテナンスモード、"}<strong>{"2027-02-25 にサポート終了"}</strong>{"。新規は OpenTelemetry"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
</section>); }
