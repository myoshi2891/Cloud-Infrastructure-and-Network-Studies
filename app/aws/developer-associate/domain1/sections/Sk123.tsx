import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** Skill 1.2.3 イベントライフサイクルとエラー処理を全量保持する。 */
export function Sk123(){return (<section className="section" id="sk-1-2-3" tabIndex={-1}>
<h2>{"Skill 1.2.3 イベントライフサイクルとエラー処理"}</h2>
{" "}
<blockquote>{" "}<p>{"公式のスキル文: コードを使ってイベントのライフサイクルとエラーを処理する（Lambda Destinations、デッドレターキューなど）"}</p>{" "}</blockquote>
{" "}
<h3 className="h-one">{"ひとことで言うと"}</h3>
{" "}
<p>{"Lambda は"}<strong>{"呼び出し方によって、失敗したときの動きが違います"}</strong>{"。「どの方式で呼ばれたか」を最初に見分け、その方式に合ったエラー処理を設定するスキルです。"}</p>
{" "}
<h3 className="h-detail">{"詳しい説明"}</h3>
{" "}
<h4>{"3 つの呼び出し方式ごとのエラー処理"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 60">
<table>

<thead>

<tr>

<th scope="col">{"方式"}</th>

<th scope="col">{"失敗時の動き"}</th>

<th scope="col">{"設定・対処"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"同期"}</strong>{"（API Gateway など）"}</td>

<td>{"エラーを"}<strong>{"呼び出し元に返す"}</strong>{"。再試行は呼び出し元の責任"}</td>

<td>{"クライアント側で再試行"}</td>

</tr>

<tr>

<td><strong>{"非同期"}</strong>{"（S3、SNS、EventBridge など）"}</td>

<td>{"Lambda が"}<strong>{"自動で再試行"}</strong>{"。最終的に失敗したら DLQ / 失敗時送信先へ"}</td>

<td>{"最大再試行回数、イベントの最大有効期間、DLQ / Destinations"}</td>

</tr>

<tr>

<td><strong>{"イベントソースマッピング"}</strong>{"（SQS、Kinesis、DynamoDB Streams）"}</td>

<td><strong>{"ソースの種類によって異なる"}</strong>{"（下記）"}</td>

<td>{"部分バッチ応答、ソースの DLQ、失敗時送信先など"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"非同期呼び出しの設定"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 61">
<table>

<thead>

<tr>

<th scope="col">{"設定"}</th>

<th scope="col">{"内容"}</th>

<th scope="col">{"範囲・既定"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"最大再試行回数"}</strong></td>

<td>{"失敗後の再試行"}</td>

<td><strong>{"0〜2 回（既定 2 回）"}</strong></td>

</tr>

<tr>

<td><strong>{"イベントの最大有効期間"}</strong></td>

<td>{"キューに残して再試行する最長時間"}</td>

<td>{"60 秒〜"}<strong>{"6 時間（既定 6 時間）"}</strong></td>

</tr>

<tr>

<td><strong>{"DLQ（SQS または SNS）"}</strong></td>

<td>{"すべての再試行が失敗した"}<strong>{"イベント"}</strong>{"を退避（失敗のみ）"}</td>

<td>{"—"}</td>

</tr>

<tr>

<td><strong>{"Destinations（送信先）"}</strong></td>

<td><strong>{"成功時 / 失敗時"}</strong>{"に、実行結果の情報を送る"}</td>

<td><strong>{"SQS、SNS、Lambda、EventBridge"}</strong>{"（失敗時は S3 も可）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<figure className="diagram-card"><Diagram id="d19" label="Skill 1.2.3 イベントライフサイクルとエラー処理の図解 d19" /></figure>
{" "}
<blockquote>{" "}<p><strong>{"Destinations と DLQ の違い"}</strong>{": DLQ は「失敗した元のイベント」だけを送ります。"}<strong>{"Destinations は成功 / 失敗の両方に対応し、実行結果の詳細（エラー情報、レスポンスなど）も送れます"}</strong>{"。"}<strong>{"新規には Destinations が推奨"}</strong>{"されます。"}</p>{" "}</blockquote>
{" "}
<h4>{"イベントソースマッピング別の挙動"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 62">
<table>

<thead>

<tr>

<th scope="col">{"ソース"}</th>

<th scope="col">{"失敗時の挙動"}</th>

<th scope="col">{"対策"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"SQS（標準 / FIFO）"}</strong></td>

<td>{"バッチの"}<strong>{"メッセージが可視性タイムアウト後にキューへ戻り"}</strong>{"、再び処理される"}</td>

<td><strong>{"DLQ は SQS キュー側に設定"}</strong>{"（"}<code>{"maxReceiveCount"}</code>{"）。"}<strong>{"部分バッチ応答（"}<code>{"ReportBatchItemFailures"}</code>{"）"}</strong>{"で失敗したメッセージだけ戻す"}</td>

</tr>

<tr>

<td><strong>{"Kinesis / DynamoDB Streams"}</strong></td>

<td><strong>{"成功するか、レコードが期限切れになるまで同じバッチを再試行"}</strong>{"し、"}<strong>{"そのシャードの処理が止まる"}</strong>{"（Poison Pill 問題）"}</td>

<td><strong>{"最大再試行回数、レコードの最大経過時間、"}<code>{"BisectBatchOnFunctionError"}</code>{"（バッチを二分割）、失敗時送信先（SQS / SNS / S3）"}</strong>{"、部分バッチ応答"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p>{"SQS の部分バッチ応答の例です（失敗した ID だけを返す）。"}</p>
{" "}
<CodeBlock index={12} language="python" lines={["pythondef handler(event, context):","    failures = []","    for r in event[\"Records\"]:","        try:","            process(r[\"body\"])","        except Exception:","            failures.append({\"itemIdentifier\": r[\"messageId\"]})","    return {\"batchItemFailures\": failures}   # 失敗分のみ再処理される"]} />
{" "}
<blockquote>{" "}<p>{"この設定を有効にしないと、バッチ内の 1 件が失敗しただけで、"}<strong>{"成功した他のメッセージも再処理（重複処理）"}</strong>{"されます。"}<strong>{"冪等性"}</strong>{"が必須である理由です。"}</p>{" "}</blockquote>
{" "}
<h4>{"コードでのエラー処理の基本"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 63">
<table>

<thead>

<tr>

<th scope="col">{"方針"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"例外を投げる / 握りつぶさない"}</strong></td>

<td>{"失敗を Lambda に伝えないと、再試行も DLQ も働かない"}</td>

</tr>

<tr>

<td><strong>{"想定内のエラーは捕捉"}</strong></td>

<td>{"検証エラーなど、再試行しても無駄なものは捕捉して正常終了（またはエラーレスポンス）にする"}</td>

</tr>

<tr>

<td><strong>{"タイムアウトに備える"}</strong></td>

<td><code>{"context.get_remaining_time_in_millis()"}</code>{" で残り時間を確認し、"}<strong>{"途中状態を保存"}</strong>{"して終了"}</td>

</tr>

<tr>

<td><strong>{"構造化ログ"}</strong></td>

<td>{"リクエスト ID・相関 ID を付けて、CloudWatch Logs で追跡"}</td>

</tr>

<tr>

<td><strong>{"冪等な処理"}</strong></td>

<td>{"再試行・重複配信を前提にする"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3 className="h-bp">{"ベストプラクティス"}</h3>
{" "}
<ul>
{" "}
<li>{"呼び出し方式を"}<strong>{"最初に確認"}</strong>{"し、方式に合ったエラー処理を選ぶ"}</li>
{" "}
<li>{"非同期では "}<strong>{"Destinations（または DLQ）を必ず設定"}</strong>{"する。"}<strong>{"失敗を黙って失わない"}</strong></li>
{" "}
<li>{"SQS ソースでは、"}<strong>{"DLQ をソースキューに設定"}</strong>{"し、"}<strong>{"部分バッチ応答を有効化"}</strong>{"する。"}<strong>{"可視性タイムアウトは関数タイムアウトの 6 倍以上"}</strong>{"を目安にする"}</li>
{" "}
<li>{"ストリームでは、"}<strong>{"1 つの不良レコードでシャード全体が止まらないよう"}</strong>{"、再試行上限・二分割・失敗時送信先を設定する"}</li>
{" "}
<li>{"すべての関数を"}<strong>{"冪等"}</strong>{"にする"}</li>
{" "}
</ul>
{" "}
<h3 className="h-exam">{"試験での狙われ方"}</h3>
{" "}
<ul>
{" "}
<li>{"「S3 トリガーの失敗イベントを後で調査したい」→ "}<strong>{"DLQ / 失敗時 Destination"}</strong></li>
{" "}
<li>{"「SQS の Lambda で、成功分まで再処理されて重複する」→ "}<strong>{"部分バッチ応答（"}<code>{"ReportBatchItemFailures"}</code>{"）"}</strong></li>
{" "}
<li>{"「Kinesis の処理が 1 件の不良データで止まった」→ "}<strong>{"再試行上限・"}<code>{"BisectBatchOnFunctionError"}</code>{"・失敗時送信先"}</strong></li>
{" "}
<li>{"「SQS トリガーの DLQ はどこに設定？」→ "}<strong>{"Lambda 側ではなく SQS ソースキュー側"}</strong></li>
{" "}
<li>{"「成功・失敗の両方の結果を別のサービスに送りたい」→ "}<strong>{"Destinations"}</strong></li>
{" "}
</ul>
{" "}
</section>);}
