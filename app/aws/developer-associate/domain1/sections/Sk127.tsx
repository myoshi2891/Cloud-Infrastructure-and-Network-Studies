import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** Skill 1.2.7 ほぼリアルタイムのデータ処理を全量保持する。 */
export function Sk127(){return (<section className="section" id="sk-1-2-7" tabIndex={-1}>
<h2>{"Skill 1.2.7 ほぼリアルタイムのデータ処理"}</h2>
{" "}
<blockquote>{" "}<p>{"公式のスキル文: Lambda 関数を使って、ほぼリアルタイムでデータを処理・変換する"}</p>{" "}</blockquote>
{" "}
<h3 className="h-one">{"ひとことで言うと"}</h3>
{" "}
<p><strong>{"ストリームやキューに届いたデータを、Lambda で即座に加工・変換して次へ渡す"}</strong>{"スキルです。Skill 1.1.10（ストリーミング）と 1.2.3（エラー処理）の合わせ技です。"}</p>
{" "}
<h3 className="h-detail">{"詳しい説明"}</h3>
{" "}
<h4>{"代表的な処理パターン"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 71">
<table>

<thead>

<tr>

<th scope="col">{"パターン"}</th>

<th scope="col">{"構成"}</th>

<th scope="col">{"用途"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"ストリームの加工"}</td>

<td>{"Kinesis Data Streams → "}<strong>{"Lambda"}</strong>{" → DynamoDB / S3 / OpenSearch"}</td>

<td>{"クリックストリームの集計・整形"}</td>

</tr>

<tr>

<td>{"配信前の変換"}</td>

<td>{"Kinesis → "}<strong>{"Firehose（Lambda による変換）"}</strong>{" → S3"}</td>

<td>{"形式変換、マスキング、レコードの絞り込み"}</td>

</tr>

<tr>

<td>{"変更データの追従"}</td>

<td>{"DynamoDB → "}<strong>{"DynamoDB Streams"}</strong>{" → Lambda"}</td>

<td>{"変更を別ストアへ複製、通知、集計"}</td>

</tr>

<tr>

<td>{"ファイルの即時処理"}</td>

<td>{"S3 イベント → Lambda"}</td>

<td>{"画像のリサイズ、CSV の取り込み"}</td>

</tr>

<tr>

<td>{"キュー処理"}</td>

<td>{"SQS → Lambda"}</td>

<td>{"非同期のワーカー"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<figure className="diagram-card"><Diagram id="d23" label="Skill 1.2.7 ほぼリアルタイムのデータ処理の図解 d23" /></figure>
{" "}
<h4>{"Firehose のデータ変換（Lambda）"}</h4>
{" "}
<p>{"Firehose は、バッファリングしたレコードを Lambda に渡して変換できます。Lambda は"}<strong>{"入力の "}<code>{"recordId"}</code>{" をそのまま返し"}</strong>{"、各レコードに"}<strong>{"結果ステータス"}</strong>{"を付けます。"}</p>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 72">
<table>

<thead>

<tr>

<th scope="col"><code>{"result"}</code></th>

<th scope="col">{"意味"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><code>{"Ok"}</code></td>

<td>{"変換成功"}</td>

</tr>

<tr>

<td><code>{"Dropped"}</code></td>

<td>{"意図的に破棄"}</td>

</tr>

<tr>

<td><code>{"ProcessingFailed"}</code></td>

<td>{"変換失敗（失敗した記録は S3 のエラーバケットへ）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<CodeBlock index={14} language="python" lines={["pythonimport base64, json","","def handler(event, context):","    out = []","    for r in event[\"records\"]:","        data = json.loads(base64.b64decode(r[\"data\"]))","        data[\"amount_yen\"] = data[\"amount\"] * 150          # 変換の例","        out.append({","            \"recordId\": r[\"recordId\"],                     # 入力のまま返す","            \"result\": \"Ok\",","            \"data\": base64.b64encode((json.dumps(data) + \"\\n\").encode()).decode(),","        })","    return {\"records\": out}"]} />
{" "}
<h4>{"DynamoDB Streams"}</h4>
{" "}
<p>{"テーブルの"}<strong>{"変更（挿入・更新・削除）を時系列で記録"}</strong>{"するストリームです。"}<strong>{"保持期間は 24 時間"}</strong>{"です。"}</p>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 73">
<table>

<thead>

<tr>

<th scope="col"><code>{"StreamViewType"}</code></th>

<th scope="col">{"ストリームに載る内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><code>{"KEYS_ONLY"}</code></td>

<td>{"変更されたアイテムのキーのみ"}</td>

</tr>

<tr>

<td><code>{"NEW_IMAGE"}</code></td>

<td>{"変更後のアイテム全体"}</td>

</tr>

<tr>

<td><code>{"OLD_IMAGE"}</code></td>

<td>{"変更前のアイテム全体"}</td>

</tr>

<tr>

<td><code>{"NEW_AND_OLD_IMAGES"}</code></td>

<td>{"変更前後の両方"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"ストリーム処理で気を付けること"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 74">
<table>

<thead>

<tr>

<th scope="col">{"論点"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"順序"}</strong></td>

<td>{"同じパーティションキー（シャード）内は順序が保たれる。並列化係数を上げても、同じキーの順序は維持される"}</td>

</tr>

<tr>

<td><strong>{"冪等性"}</strong></td>

<td>{"再試行・再読み取りで同じレコードが再び届く前提で作る"}</td>

</tr>

<tr>

<td><strong>{"不良レコード（Poison Pill）"}</strong></td>

<td>{"1 件の不良データがシャードを止める。"}<strong>{"再試行上限・二分割・失敗時送信先"}</strong>{"で対策（Skill 1.2.3）"}</td>

</tr>

<tr>

<td><strong>{"遅延の監視"}</strong></td>

<td><strong><code>{"IteratorAge"}</code></strong>{"（CloudWatch 指標）が増え続けたら、処理が追い付いていない → 並列化係数・メモリ・バッチサイズの見直し、シャード追加"}</td>

</tr>

<tr>

<td><strong>{"バッチ内の部分失敗"}</strong></td>

<td><strong>{"部分バッチ応答"}</strong>{"で、失敗したレコード以降だけを再処理"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3 className="h-bp">{"ベストプラクティス"}</h3>
{" "}
<ul>
{" "}
<li>{"処理は"}<strong>{"冪等"}</strong>{"にし、"}<strong>{"不良レコード対策"}</strong>{"（再試行上限・二分割・失敗時送信先）を最初から設定する"}</li>
{" "}
<li><strong><code>{"IteratorAge"}</code>{" にアラーム"}</strong>{"を設定し、遅延を検知する"}</li>
{" "}
<li>{"小さなイベントを大量に処理する場合は、"}<strong>{"バッチ + バッチウィンドウ"}</strong>{"で呼び出し回数を減らす"}</li>
{" "}
<li><strong>{"イベントフィルタリング"}</strong>{"で、必要なレコードだけ関数に渡す"}</li>
{" "}
<li>{"Firehose の変換では、"}<strong><code>{"recordId"}</code>{" を必ず返し"}</strong>{"、変換結果の "}<code>{"result"}</code>{" を正しく設定する"}</li>
{" "}
</ul>
{" "}
<h3 className="h-exam">{"試験での狙われ方"}</h3>
{" "}
<ul>
{" "}
<li>{"「Kinesis のレコードを S3 に保存する前に整形したい」→ "}<strong>{"Firehose + Lambda 変換"}</strong></li>
{" "}
<li>{"「DynamoDB の更新をトリガーに別のシステムへ通知したい」→ "}<strong>{"DynamoDB Streams + Lambda"}</strong></li>
{" "}
<li>{"「Kinesis の処理が遅れている」→ "}<strong><code>{"IteratorAge"}</code>{" を監視。並列化係数 / シャード / バッチサイズ"}</strong></li>
{" "}
<li>{"「DynamoDB Streams のデータの保持期間」→ "}<strong>{"24 時間"}</strong></li>
{" "}
</ul>
{" "}
</section>);}
