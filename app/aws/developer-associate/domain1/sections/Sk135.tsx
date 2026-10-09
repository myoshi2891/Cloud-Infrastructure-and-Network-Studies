import { CodeBlock } from '../CodeBlock';
/** Skill 1.3.5 シリアライズとデシリアライズを全量保持する。 */
export function Sk135(){return (<section className="section" id="sk-1-3-5" tabIndex={-1}>
<h2>{"Skill 1.3.5 シリアライズとデシリアライズ"}</h2>
{" "}
<blockquote>{" "}<p>{"公式のスキル文: データストアへの永続化のために、データをシリアライズ・デシリアライズする"}</p>{" "}</blockquote>
{" "}
<h3 className="h-one">{"ひとことで言うと"}</h3>
{" "}
<p><strong>{"メモリ上のオブジェクト"}</strong>{"を"}<strong>{"保存・送信できる形式"}</strong>{"に変換し（シリアライズ）、読み出したときに"}<strong>{"元のオブジェクト"}</strong>{"へ戻す（デシリアライズ）スキルです。"}</p>
{" "}
<h3 className="h-detail">{"詳しい説明"}</h3>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 91">
<table>

<thead>

<tr>

<th scope="col">{"形式"}</th>

<th scope="col">{"特徴"}</th>

<th scope="col">{"使いどころ"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"JSON"}</strong></td>

<td>{"人が読める、どの言語でも扱える"}</td>

<td>{"API、SQS / SNS のメッセージ本文、S3 の設定ファイル"}</td>

</tr>

<tr>

<td><strong>{"Avro / Protocol Buffers"}</strong></td>

<td>{"圧縮された"}<strong>{"バイナリ"}</strong>{"、スキーマ定義あり"}</td>

<td>{"ストリーミング、スキーマの進化が必要な場合（Glue Schema Registry と併用）"}</td>

</tr>

<tr>

<td><strong>{"Parquet / ORC"}</strong></td>

<td><strong>{"列指向"}</strong>{"、分析向け"}</td>

<td>{"S3 + Athena での分析"}</td>

</tr>

<tr>

<td><strong>{"Base64"}</strong></td>

<td>{"バイナリをテキストで表現"}</td>

<td>{"Kinesis / Firehose のレコード、API でのバイナリ受け渡し"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"DynamoDB のデータ型"}</h4>
{" "}
<p>{"DynamoDB の低レベル API（"}<code>{"boto3.client(\"dynamodb\")"}</code>{" など）は、値に"}<strong>{"型記述子"}</strong>{"を付けた形式で表現します。"}</p>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 92">
<table>

<thead>

<tr>

<th scope="col">{"型"}</th>

<th scope="col">{"記述子"}</th>

<th scope="col">{"例"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"文字列"}</td>

<td><code>{"S"}</code></td>

<td><code>{"{\"S\": \"Tokyo\"}"}</code></td>

</tr>

<tr>

<td>{"数値"}</td>

<td><code>{"N"}</code>{"（"}<strong>{"文字列で表現"}</strong>{"）"}</td>

<td><code>{"{\"N\": \"123\"}"}</code></td>

</tr>

<tr>

<td>{"バイナリ"}</td>

<td><code>{"B"}</code></td>

<td>{"Base64"}</td>

</tr>

<tr>

<td>{"真偽値"}</td>

<td><code>{"BOOL"}</code></td>

<td><code>{"{\"BOOL\": true}"}</code></td>

</tr>

<tr>

<td>{"NULL"}</td>

<td><code>{"NULL"}</code></td>

<td><code>{"{\"NULL\": true}"}</code></td>

</tr>

<tr>

<td>{"リスト"}</td>

<td><code>{"L"}</code></td>

<td><code>{"{\"L\": [{\"S\": \"a\"}, {\"N\": \"1\"}]}"}</code></td>

</tr>

<tr>

<td>{"マップ"}</td>

<td><code>{"M"}</code></td>

<td><code>{"{\"M\": {\"city\": {\"S\": \"Tokyo\"}}}"}</code></td>

</tr>

<tr>

<td>{"文字列セット / 数値セット / バイナリセット"}</td>

<td><code>{"SS"}</code>{" / "}<code>{"NS"}</code>{" / "}<code>{"BS"}</code></td>

<td>{"重複なし・順序なし"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<blockquote>{" "}<p>{"高レベルのインターフェース（boto3 の "}<strong><code>{"resource"}</code>{" / "}<code>{"Table"}</code></strong>{"、Java の "}<strong>{"DynamoDB Enhanced Client"}</strong>{"、JavaScript の "}<strong><code>{"lib-dynamodb"}</code>{" の DocumentClient"}</strong>{"）を使うと、"}<strong>{"型記述子の変換（シリアライズ / デシリアライズ）を自動"}</strong>{"で行ってくれます。"}</p>{" "}</blockquote>
{" "}
<CodeBlock index={16} language="python" lines={["python# 低レベル client: 型記述子が必要（読み書きとも煩雑）","client.put_item(TableName=\"Users\", Item={\"id\": {\"S\": \"u-1\"}, \"age\": {\"N\": \"30\"}})","","# 高レベル resource: Python の値をそのまま渡せる","table.put_item(Item={\"id\": \"u-1\", \"age\": 30})"]} />
{" "}
<h4>{"よくある落とし穴"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 93">
<table>

<thead>

<tr>

<th scope="col">{"落とし穴"}</th>

<th scope="col">{"内容と対処"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"数値の型"}</strong></td>

<td>{"Python の "}<code>{"float"}</code>{" は DynamoDB に"}<strong>{"そのまま保存できず"}</strong>{"エラー。"}<strong><code>{"Decimal"}</code></strong>{" を使う。読み出し時も "}<code>{"Decimal"}</code>{" で返るため、JSON 化では変換が必要"}</td>

</tr>

<tr>

<td><strong>{"日時"}</strong></td>

<td>{"DynamoDB に日時型はない。"}<strong>{"ISO 8601 文字列"}</strong>{"（辞書順でソート可能）または "}<strong>{"Unix エポック秒（数値）"}</strong>{"で保存。"}<strong>{"タイムゾーンは UTC に統一"}</strong></td>

</tr>

<tr>

<td><strong>{"空の値"}</strong></td>

<td>{"現在は空文字列・空バイナリも"}<strong>{"属性値として保存可能"}</strong>{"（キー属性は不可）。ただし "}<strong>{"空のセットは不可"}</strong></td>

</tr>

<tr>

<td><strong>{"サイズ"}</strong></td>

<td>{"アイテムは "}<strong>{"400 KB"}</strong>{" まで。超える場合は "}<strong>{"S3 に本体を保存"}</strong>{"し、DynamoDB には"}<strong>{"参照（キー）"}</strong>{"を保存"}</td>

</tr>

<tr>

<td><strong>{"スキーマの変更"}</strong></td>

<td>{"古いデータを読めなくならないよう、"}<strong>{"後方互換"}</strong>{"で変更する（項目の追加は任意項目にする、"}<code>{"schemaVersion"}</code>{" 属性を持たせる）"}</td>

</tr>

<tr>

<td><strong>{"機密データ"}</strong></td>

<td>{"保存前に"}<strong>{"暗号化"}</strong>{"（クライアント側暗号化 / KMS）。ログに出さない"}</td>

</tr>

<tr>

<td><strong>{"S3 のメタデータ / Content-Type"}</strong></td>

<td>{"保存時に "}<code>{"Content-Type"}</code>{" や "}<code>{"Content-Encoding"}</code>{" を正しく設定する"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<blockquote>{" "}<p><strong>{"信頼できない入力のデシリアライズ"}</strong>{"（特に Python の "}<code>{"pickle"}</code>{"）は、"}<strong>{"任意コード実行"}</strong>{"の危険があります。外部から来るデータには "}<strong>{"JSON などの安全な形式"}</strong>{"を使います。"}</p>{" "}</blockquote>
{" "}
<h3 className="h-bp">{"ベストプラクティス"}</h3>
{" "}
<ul>
{" "}
<li>{"相互運用性のため、"}<strong>{"JSON"}</strong>{"（またはスキーマ付きのバイナリ形式）を基本にする"}</li>
{" "}
<li>{"DynamoDB は "}<strong>{"高レベルのクライアント（resource / Enhanced Client / DocumentClient）"}</strong>{"を使って変換を任せる"}</li>
{" "}
<li>{"Python は"}<strong>{"数値を "}<code>{"Decimal"}</code></strong>{"、日時は "}<strong>{"ISO 8601（UTC）"}</strong>{"で扱う"}</li>
{" "}
<li>{"データ形式は"}<strong>{"スキーマ（契約）として管理"}</strong>{"し、後方互換で進化させる"}</li>
{" "}
<li>{"信頼できないデータを "}<strong><code>{"pickle"}</code>{" などでデシリアライズしない"}</strong></li>
{" "}
</ul>
{" "}
<h3 className="h-exam">{"試験での狙われ方"}</h3>
{" "}
<ul>
{" "}
<li>{"「Python で DynamoDB に小数を保存するとエラー」→ "}<strong><code>{"Decimal"}</code>{" を使う"}</strong></li>
{" "}
<li>{"「DynamoDB の低レベル API で数値を表す型」→ "}<strong><code>{"N"}</code>{"（値は文字列）"}</strong></li>
{" "}
<li>{"「型記述子を意識せずに読み書きしたい」→ "}<strong>{"高レベルのインターフェース（resource / DocumentClient / Enhanced Client）"}</strong></li>
{" "}
</ul>
{" "}
</section>);}
