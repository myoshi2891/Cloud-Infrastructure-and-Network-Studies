
/** サービス選択の早見表（試験直前チェック）を全量保持する。 */
export function Sec33(){return (<section className="section" id="sec-33" tabIndex={-1}>
<h2>{"サービス選択の早見表（試験直前チェック）"}</h2>
{" "}
<h3>{"メッセージング・イベント・ストリームの使い分け"}</h3>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 109">
<table>

<thead>

<tr>

<th scope="col">{"要件"}</th>

<th scope="col">{"選ぶサービス"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"非同期処理のバッファ、ワーカーで分担"}</td>

<td><strong>{"SQS"}</strong></td>

</tr>

<tr>

<td>{"厳密な順序 + 重複排除"}</td>

<td><strong>{"SQS FIFO"}</strong></td>

</tr>

<tr>

<td>{"1 対多の通知・ファンアウト"}</td>

<td><strong>{"SNS（+ SQS）"}</strong></td>

</tr>

<tr>

<td>{"イベントを内容で振り分け、AWS / SaaS のイベントも扱う"}</td>

<td><strong>{"EventBridge"}</strong></td>

</tr>

<tr>

<td>{"定時実行（cron / rate）"}</td>

<td><strong>{"EventBridge Scheduler"}</strong></td>

</tr>

<tr>

<td>{"コードなしでソース → ターゲットを接続"}</td>

<td><strong>{"EventBridge Pipes"}</strong></td>

</tr>

<tr>

<td>{"順序付き・複数のコンシューマー・再読み取り"}</td>

<td><strong>{"Kinesis Data Streams"}</strong></td>

</tr>

<tr>

<td>{"ストリームを S3 / Redshift / OpenSearch へ配信"}</td>

<td><strong>{"Amazon Data Firehose"}</strong></td>

</tr>

<tr>

<td>{"複数ステップの制御・リトライ・人の承認"}</td>

<td><strong>{"Step Functions"}</strong></td>

</tr>

<tr>

<td>{"既存システムの標準プロトコル（JMS / AMQP / MQTT）"}</td>

<td><strong>{"Amazon MQ"}</strong></td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"Lambda の主要数値"}</h3>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 110">
<table>

<thead>

<tr>

<th scope="col">{"項目"}</th>

<th scope="col">{"値"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"メモリ"}</td>

<td>{"128〜10,240 MB"}</td>

</tr>

<tr>

<td>{"タイムアウト"}</td>

<td>{"既定 3 秒 / 最大 900 秒"}</td>

</tr>

<tr>

<td>{"環境変数"}</td>

<td>{"合計 4 KB"}</td>

</tr>

<tr>

<td>{"レイヤー"}</td>

<td>{"最大 5 つ"}</td>

</tr>

<tr>

<td>{"パッケージ"}</td>

<td>{"zip 展開後 250 MB / コンテナイメージ 10 GB"}</td>

</tr>

<tr>

<td>{"/tmp"}</td>

<td>{"512〜10,240 MB"}</td>

</tr>

<tr>

<td>{"同期ペイロード"}</td>

<td>{"6 MB"}</td>

</tr>

<tr>

<td>{"非同期ペイロード"}</td>

<td>{"256 KB"}</td>

</tr>

<tr>

<td>{"同時実行（既定）"}</td>

<td>{"1,000 / リージョン"}</td>

</tr>

<tr>

<td>{"非同期の再試行"}</td>

<td>{"既定 2 回（0〜2）、イベントの最大有効期間 最大 6 時間"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"DynamoDB の主要数値"}</h3>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 111">
<table>

<thead>

<tr>

<th scope="col">{"項目"}</th>

<th scope="col">{"値"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"アイテムの最大サイズ"}</td>

<td>{"400 KB"}</td>

</tr>

<tr>

<td>{"RCU"}</td>

<td>{"4 KB / 強い整合性 1、結果整合性 0.5、トランザクション 2"}</td>

</tr>

<tr>

<td>{"WCU"}</td>

<td>{"1 KB / 標準 1、トランザクション 2"}</td>

</tr>

<tr>

<td>{"Query / Scan の 1 回の読み取り"}</td>

<td>{"1 MB"}</td>

</tr>

<tr>

<td>{"GSI / LSI"}</td>

<td>{"20 / 5"}</td>

</tr>

<tr>

<td>{"BatchGetItem / BatchWriteItem"}</td>

<td>{"100 件 / 25 件"}</td>

</tr>

<tr>

<td>{"トランザクション"}</td>

<td>{"最大 100 アイテム"}</td>

</tr>

<tr>

<td>{"PITR"}</td>

<td>{"35 日"}</td>

</tr>

<tr>

<td>{"Streams の保持"}</td>

<td>{"24 時間"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
</section>);}
