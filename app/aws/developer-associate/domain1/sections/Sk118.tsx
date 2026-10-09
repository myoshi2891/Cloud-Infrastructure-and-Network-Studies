import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** Skill 1.1.8 メッセージングサービスを全量保持する。 */
export function Sk118(){return (<section className="section" id="sk-1-1-8" tabIndex={-1}>
<h2>{"Skill 1.1.8 メッセージングサービス"}</h2>
{" "}
<blockquote>{" "}<p>{"公式のスキル文: メッセージングサービスを使うコードを書く"}</p>{" "}</blockquote>
{" "}
<h3 className="h-one">{"ひとことで言うと"}</h3>
{" "}
<p><strong>{"Amazon SQS（キュー）"}</strong>{" と "}<strong>{"Amazon SNS（通知・Pub/Sub）"}</strong>{" を、コードから正しく使うスキルです。"}</p>
{" "}
<h3 className="h-detail">{"詳しい説明"}</h3>
{" "}
<h4>{"SQS と SNS の根本的な違い"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 29">
<table>

<thead>

<tr>

<th scope="col">{"観点"}</th>

<th scope="col">{"Amazon SQS"}</th>

<th scope="col">{"Amazon SNS"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"モデル"}</td>

<td>{"キュー（"}<strong>{"Pull"}</strong>{": コンシューマーが取りに行く）"}</td>

<td>{"トピック（"}<strong>{"Push"}</strong>{": 購読者へ配信する）"}</td>

</tr>

<tr>

<td>{"宛先"}</td>

<td>{"1 つのキューを複数のコンシューマーで分担（1 メッセージは 1 コンシューマーが処理）"}</td>

<td>{"1 つのメッセージを"}<strong>{"全購読者"}</strong>{"に配信"}</td>

</tr>

<tr>

<td>{"保持"}</td>

<td>{"メッセージを保持（既定 4 日、最大 14 日）"}</td>

<td>{"保持しない（配信を試みる）"}</td>

</tr>

<tr>

<td>{"使いどころ"}</td>

<td>{"バッファリング、負荷平準化、非同期処理"}</td>

<td>{"通知、ファンアウト"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<figure className="diagram-card"><Diagram id="d10" label="Skill 1.1.8 メッセージングサービスの図解 d10" /></figure>
{" "}
<h4>{"SQS の重要設定"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 30">
<table>

<thead>

<tr>

<th scope="col">{"設定"}</th>

<th scope="col">{"内容"}</th>

<th scope="col">{"既定値・範囲"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"可視性タイムアウト"}</strong></td>

<td>{"メッセージを受信すると他のコンシューマーから"}<strong>{"見えなくなる"}</strong>{"時間。処理が終わったら"}<strong>{"削除"}</strong>{"する。時間内に削除しないと再び見える"}</td>

<td>{"既定 30 秒（0 秒〜12 時間）"}</td>

</tr>

<tr>

<td><strong>{"ロングポーリング"}</strong></td>

<td>{"空振りのレスポンスを減らし、コストと遅延を削減（"}<code>{"WaitTimeSeconds"}</code>{"）"}</td>

<td>{"最大 20 秒"}</td>

</tr>

<tr>

<td><strong>{"メッセージ保持期間"}</strong></td>

<td>{"キューにメッセージを残す期間"}</td>

<td>{"既定 4 日（1 分〜14 日）"}</td>

</tr>

<tr>

<td><strong>{"遅延キュー / メッセージタイマー"}</strong></td>

<td>{"配信を遅らせる"}</td>

<td>{"0〜15 分（900 秒）"}</td>

</tr>

<tr>

<td><strong>{"デッドレターキュー（DLQ）"}</strong></td>

<td><code>{"maxReceiveCount"}</code>{" 回受信されても削除されなかったメッセージの退避先"}</td>

<td>{"—"}</td>

</tr>

<tr>

<td><strong>{"最大メッセージサイズ"}</strong></td>

<td>{"1 メッセージの本文の最大"}</td>

<td><strong>{"1 MiB"}</strong>{"（2025 年 8 月に 256 KiB から拡大）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<blockquote>{" "}<p>{"受信してから削除するまでの流れ: "}<strong>{"受信 → 処理 → 削除"}</strong>{"。処理に失敗して削除しなければ、可視性タイムアウト後に"}<strong>{"再配信"}</strong>{"されます。このため SQS は「"}<strong>{"少なくとも 1 回（at-least-once）"}</strong>{"」配信であり、"}<strong>{"冪等な処理"}</strong>{"が必須です。"}</p>{" "}</blockquote>
{" "}
<figure className="diagram-card"><Diagram id="d11" label="Skill 1.1.8 メッセージングサービスの図解 d11" /></figure>
{" "}
<h4>{"Standard キューと FIFO キュー"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 31">
<table>

<thead>

<tr>

<th scope="col">{"観点"}</th>

<th scope="col">{"Standard"}</th>

<th scope="col">{"FIFO"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"順序"}</td>

<td><strong>{"ベストエフォート"}</strong>{"（順不同あり）"}</td>

<td><strong>{"厳密な順序"}</strong>{"（メッセージグループ単位）"}</td>

</tr>

<tr>

<td>{"配信"}</td>

<td>{"少なくとも 1 回（重複あり得る）"}</td>

<td><strong>{"正確に 1 回の処理"}</strong>{"（重複排除あり）"}</td>

</tr>

<tr>

<td>{"スループット"}</td>

<td>{"ほぼ無制限"}</td>

<td>{"制限あり（高スループットモードで拡大）"}</td>

</tr>

<tr>

<td>{"キュー名"}</td>

<td>{"任意"}</td>

<td><strong><code>{".fifo"}</code>{" で終わる"}</strong></td>

</tr>

<tr>

<td>{"主要パラメータ"}</td>

<td>{"—"}</td>

<td><code>{"MessageGroupId"}</code>{"（必須）、"}<code>{"MessageDeduplicationId"}</code>{"（重複排除。コンテンツベースの重複排除も可）"}</td>

</tr>

<tr>

<td>{"向く場面"}</td>

<td>{"順序が重要でない大量処理"}</td>

<td>{"順序が重要（注文の処理順、金融取引）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p>{"FIFO の "}<code>{"MessageGroupId"}</code>{" は、"}<strong>{"同じグループ内は順序を保ち、異なるグループは並列に処理"}</strong>{"されるための仕組みです。重複排除は "}<strong>{"5 分間"}</strong>{"の重複送信に対して効きます。"}</p>
{" "}
<h4>{"SQS のコード例（Python）"}</h4>
{" "}
<CodeBlock index={5} language="python" lines={["pythonimport json, boto3","sqs = boto3.client(\"sqs\")","QUEUE_URL = \"https://sqs.ap-northeast-1.amazonaws.com/123456789012/orders\"","","# 送信","sqs.send_message(QueueUrl=QUEUE_URL, MessageBody=json.dumps({\"orderId\": \"A001\"}))","","# 受信（ロングポーリング、最大 10 件）","res = sqs.receive_message(","    QueueUrl=QUEUE_URL,","    MaxNumberOfMessages=10,","    WaitTimeSeconds=20,       # ロングポーリング",")","for m in res.get(\"Messages\", []):","    # ...処理...","    sqs.delete_message(QueueUrl=QUEUE_URL, ReceiptHandle=m[\"ReceiptHandle\"])  # 処理後に削除"]} />
{" "}
<ul>
{" "}
<li>{"送信・削除は"}<strong>{"バッチ API"}</strong>{"（"}<code>{"SendMessageBatch"}</code>{" / "}<code>{"DeleteMessageBatch"}</code>{"、最大 10 件）でまとめるとコストと遅延を抑えられます。"}</li>
{" "}
</ul>
{" "}
<h4>{"SNS の重要機能"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 32">
<table>

<thead>

<tr>

<th scope="col">{"機能"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"購読プロトコル"}</td>

<td>{"SQS、Lambda、HTTP/HTTPS、Email、SMS、モバイルプッシュ、Amazon Data Firehose など"}</td>

</tr>

<tr>

<td><strong>{"メッセージフィルタリング"}</strong></td>

<td>{"購読ごとに"}<strong>{"フィルターポリシー"}</strong>{"を設定し、条件に合うメッセージだけ受け取る（送信側でメッセージ属性を付与）"}</td>

</tr>

<tr>

<td><strong>{"FIFO トピック"}</strong></td>

<td>{"順序保証付きの Pub/Sub（購読先は SQS FIFO など）"}</td>

</tr>

<tr>

<td><strong>{"配信ポリシーと DLQ"}</strong></td>

<td>{"配信失敗時のリトライと、購読ごとの DLQ"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<blockquote>{" "}<p><strong>{"SNS + SQS ファンアウト"}</strong>{"では、SNS から SQS キューへ配信するために、キューの"}<strong>{"アクセスポリシー"}</strong>{"で SNS トピックからの送信を許可する必要があります。"}</p>{" "}</blockquote>
{" "}
<h4>{"Amazon MQ との使い分け"}</h4>
{" "}
<p>{"既存システムが "}<strong>{"JMS・AMQP・MQTT・STOMP"}</strong>{" などの標準プロトコルを使っていて、"}<strong>{"コードを変えずに移行したい"}</strong>{"場合は Amazon MQ（ActiveMQ / RabbitMQ のマネージドサービス）を選びます。新規に作る場合は SQS / SNS が第一候補です。"}</p>
{" "}
<h3 className="h-bp">{"ベストプラクティス"}</h3>
{" "}
<ul>
{" "}
<li>{"受信したら、"}<strong>{"処理が成功した後に削除"}</strong>{"する。"}<strong>{"可視性タイムアウト ≥ 処理時間"}</strong>{"にする（Lambda と連携する場合は関数タイムアウトの 6 倍以上が推奨）"}</li>
{" "}
<li><strong>{"ロングポーリング"}</strong>{"を使う（コスト削減）。"}<strong>{"DLQ"}</strong>{" を必ず設定し、"}<code>{"maxReceiveCount"}</code>{" を決める"}</li>
{" "}
<li>{"冪等な処理を前提にする（Standard は重複あり）"}</li>
{" "}
<li>{"順序が必要なときだけ FIFO を選ぶ。"}<strong><code>{"MessageGroupId"}</code>{" の設計でスループットを確保"}</strong>{"する"}</li>
{" "}
<li>{"大量送信は"}<strong>{"バッチ API"}</strong>{"を使う"}</li>
{" "}
</ul>
{" "}
<h3 className="h-exam">{"試験での狙われ方"}</h3>
{" "}
<ul>
{" "}
<li>{"「処理中のメッセージが別のワーカーに重複して処理された」→ "}<strong>{"可視性タイムアウトが短い"}</strong></li>
{" "}
<li>{"「何度も失敗するメッセージが詰まる」→ "}<strong>{"DLQ"}</strong></li>
{" "}
<li>{"「順序を保証し、重複を排除したい」→ "}<strong>{"FIFO + "}<code>{"MessageGroupId"}</code>{" / "}<code>{"MessageDeduplicationId"}</code></strong></li>
{" "}
<li>{"「空の応答が多くコストが高い」→ "}<strong>{"ロングポーリング"}</strong></li>
{" "}
<li>{"「1 つのメッセージを購読ごとに条件で振り分けたい」→ "}<strong>{"SNS のフィルターポリシー"}</strong></li>
{" "}
</ul>
{" "}
</section>);}
