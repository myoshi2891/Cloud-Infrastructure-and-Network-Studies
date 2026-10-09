import { Diagram } from '../Diagram';
/** Skill 1.1.4 同期と非同期を全量保持する。 */
export function Sk114(){return (<section className="section" id="sk-1-1-4" tabIndex={-1}>
<h2>{"Skill 1.1.4 同期と非同期"}</h2>
{" "}
<h3 className="h-one">{"ひとことで言うと"}</h3>
{" "}
<p>{"呼び出した側が"}<strong>{"結果を待つか、待たないか"}</strong>{"の違いです。"}</p>
{" "}
<h3 className="h-detail">{"詳しい説明"}</h3>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 10">
<table>

<thead>

<tr>

<th scope="col">{"観点"}</th>

<th scope="col">{"同期（Synchronous）"}</th>

<th scope="col">{"非同期（Asynchronous）"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"呼び出し側"}</td>

<td>{"結果が返るまで待つ"}</td>

<td>{"受け付けられたらすぐ次へ進む"}</td>

</tr>

<tr>

<td>{"結果の受け取り"}</td>

<td>{"応答として直接受け取る"}</td>

<td>{"コールバック・通知・ポーリング・別の保存先で受け取る"}</td>

</tr>

<tr>

<td>{"向く処理"}</td>

<td>{"即時の応答が必要（画面表示、API の参照）"}</td>

<td>{"時間がかかる、後で良い、失敗時に再試行したい"}</td>

</tr>

<tr>

<td>{"障害への強さ"}</td>

<td>{"相手の不調がそのまま影響"}</td>

<td>{"リトライ・DLQ で吸収しやすい"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"Lambda の 3 つの呼び出しモデル"}</h4>
{" "}
<p>{"Lambda は呼び出し方によって、エラー処理や再試行の仕組みが変わります。ここが試験の頻出ポイントです。"}</p>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 11">
<table>

<thead>

<tr>

<th scope="col">{"呼び出しタイプ"}</th>

<th scope="col">{"代表的な呼び出し元"}</th>

<th scope="col">{"結果"}</th>

<th scope="col">{"エラー時の再試行"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"同期"}</td>

<td>{"API Gateway、ALB、SDK の "}<code>{"RequestResponse"}</code></td>

<td>{"呼び出し元が結果を待つ"}</td>

<td><strong>{"呼び出し元（クライアント）が再試行する"}</strong></td>

</tr>

<tr>

<td>{"非同期"}</td>

<td>{"S3、SNS、EventBridge、SDK の "}<code>{"Event"}</code></td>

<td>{"Lambda 内部のキューに入れて即 "}<code>{"202"}</code></td>

<td><strong>{"Lambda が自動で再試行"}</strong>{"（既定で最大 2 回）。失敗時は DLQ / Destination へ"}</td>

</tr>

<tr>

<td>{"ポーリング（イベントソースマッピング）"}</td>

<td>{"SQS、Kinesis、DynamoDB Streams"}</td>

<td>{"Lambda サービスがソースを読み取って関数を呼ぶ"}</td>

<td>{"ソースの種類によって異なる（Skill 1.2.3 で詳述）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<figure className="diagram-card"><Diagram id="d06" label="Skill 1.1.4 同期と非同期の図解 d06" /></figure>
{" "}
<h4>{"非同期パターンの定番"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 12">
<table>

<thead>

<tr>

<th scope="col">{"場面"}</th>

<th scope="col">{"パターン"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"重い処理を API から切り離す"}</td>

<td>{"API は受付 ID だけ返す（"}<code>{"202 Accepted"}</code>{"）→ SQS に積む → ワーカーが処理 → 結果は DynamoDB に保存 → クライアントはポーリングか通知で取得"}</td>

</tr>

<tr>

<td>{"長時間の複数ステップ"}</td>

<td>{"Step Functions（Standard ワークフロー）で実行し、状態を管理"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3 className="h-bp">{"ベストプラクティス"}</h3>
{" "}
<ul>
{" "}
<li>{"ユーザーを待たせる必要がない処理は"}<strong>{"非同期化"}</strong>{"して応答を早くする"}</li>
{" "}
<li>{"非同期処理では"}<strong>{"冪等性（同じメッセージが複数回届いても結果が同じ）"}</strong>{"を必ず確保する"}</li>
{" "}
<li>{"失敗したメッセージの行き先（"}<strong>{"DLQ や Destination"}</strong>{"）を最初に決めておく"}</li>
{" "}
</ul>
{" "}
<h3 className="h-exam">{"試験での狙われ方"}</h3>
{" "}
<ul>
{" "}
<li>{"「API Gateway からの呼び出しで Lambda がエラー。再試行は誰が？」→ "}<strong>{"同期なのでクライアント側"}</strong></li>
{" "}
<li>{"「S3 トリガーの Lambda が失敗したら？」→ "}<strong>{"非同期なので Lambda が自動で最大 2 回再試行"}</strong></li>
{" "}
<li>{"「重い処理で API がタイムアウトする」→ "}<strong>{"非同期化（SQS + ワーカー、または Step Functions）"}</strong></li>
{" "}
</ul>
{" "}
</section>);}
