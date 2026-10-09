import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** Skill 1.3.3 Query と Scan の違いを全量保持する。 */
export function Sk133(){return (<section className="section" id="sk-1-3-3" tabIndex={-1}>
<h2>{"Skill 1.3.3 Query と Scan の違い"}</h2>
{" "}
<blockquote>{" "}<p>{"公式のスキル文: Query オペレーションと Scan オペレーションの違いを説明する"}</p>{" "}</blockquote>
{" "}
<h3 className="h-one">{"ひとことで言うと"}</h3>
{" "}
<p><strong>{"Query は「キーを指定してピンポイントで取る」"}</strong>{"、"}<strong>{"Scan は「テーブルを端から全部読む」"}</strong>{"です。"}<strong>{"Scan は原則避ける"}</strong>{"のが基本方針です。"}</p>
{" "}
<h3 className="h-detail">{"詳しい説明"}</h3>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 81">
<table>

<thead>

<tr>

<th scope="col">{"観点"}</th>

<th scope="col">{"Query"}</th>

<th scope="col">{"Scan"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"読む範囲"}</td>

<td><strong>{"指定したパーティションキーのアイテムだけ"}</strong></td>

<td><strong>{"テーブル（またはインデックス）全体"}</strong></td>

</tr>

<tr>

<td>{"キー条件"}</td>

<td><strong>{"パーティションキーの等価条件が必須"}</strong>{"（ソートキーは任意で範囲指定可）"}</td>

<td>{"なし"}</td>

</tr>

<tr>

<td>{"効率"}</td>

<td><strong>{"高い"}</strong>{"（読んだ分だけの消費）"}</td>

<td><strong>{"低い"}</strong>{"（全件を読み、"}<strong>{"フィルター前の量"}</strong>{"で課金）"}</td>

</tr>

<tr>

<td>{"並び順"}</td>

<td>{"ソートキーの順（"}<code>{"ScanIndexForward=False"}</code>{" で降順）"}</td>

<td>{"不定"}</td>

</tr>

<tr>

<td>{"コスト"}</td>

<td>{"小さい"}</td>

<td><strong>{"大きい"}</strong>{"（大きなテーブルでは容量を食い潰す）"}</td>

</tr>

<tr>

<td>{"向く場面"}</td>

<td>{"通常のアクセス"}</td>

<td>{"小さなテーブル、一括エクスポート、まれな管理作業"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"フィルター式の落とし穴"}</h4>
{" "}
<p><code>{"FilterExpression"}</code>{" は、"}<strong>{"読み取った後に"}</strong>{"結果を絞り込みます。"}<strong>{"読み取りの消費量（RCU）は絞り込み前のデータ量"}</strong>{"でかかるため、Scan + フィルターは「"}<strong>{"全部読んで、一部だけ返す"}</strong>{"」状態で、効率は改善しません。"}<strong>{"フィルターは費用の節約手段ではありません"}</strong>{"。"}</p>
{" "}
<CodeBlock index={15} language="python" lines={["pythonfrom boto3.dynamodb.conditions import Key, Attr","","# Query: パーティションキー + ソートキーの範囲で絞る（効率的）","res = table.query(","    KeyConditionExpression=Key(\"userId\").eq(\"u-001\") & Key(\"createdAt\").between(\"2026-01-01\", \"2026-03-31\"),","    FilterExpression=Attr(\"status\").eq(\"PAID\"),   # 読んだ後に絞る（RCU は絞る前の量）","    Limit=50,",")","","# Scan: 全件を読む（非推奨。必要なら並列スキャンや Limit で制御）","res = table.scan(FilterExpression=Attr(\"status\").eq(\"PAID\"))"]} />
{" "}
<h4>{"1 回の応答は最大 1 MB（ページネーション）"}</h4>
{" "}
<p>{"Query と Scan は、"}<strong>{"1 回の呼び出しで最大 1 MB"}</strong>{"までしか読み取りません。続きがあるときは、応答に "}<strong><code>{"LastEvaluatedKey"}</code></strong>{" が含まれ、これを次回の "}<strong><code>{"ExclusiveStartKey"}</code></strong>{" に渡して続きを取得します（Skill 1.1.9）。"}<code>{"Limit"}</code>{" は"}<strong>{"評価する件数"}</strong>{"の上限で、フィルター適用前の件数です。"}</p>
{" "}
<h4>{"Scan を安全に使うための工夫"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 82">
<table>

<thead>

<tr>

<th scope="col">{"工夫"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"並列スキャン"}</strong></td>

<td><code>{"Segment"}</code>{" と "}<code>{"TotalSegments"}</code>{" で、テーブルを分割して並列に読む"}</td>

</tr>

<tr>

<td><strong><code>{"Limit"}</code>{" / ページサイズの制限"}</strong></td>

<td>{"一度に読む量を絞り、他のリクエストへの影響を抑える"}</td>

</tr>

<tr>

<td><strong>{"結果整合性の読み取りを使う"}</strong></td>

<td>{"コストを半分に"}</td>

</tr>

<tr>

<td><strong>{"S3 へのエクスポート"}</strong></td>

<td>{"分析用に大量のデータが必要なら、"}<strong>{"S3 へのエクスポート"}</strong>{"（PITR を利用、読み取り容量を消費しない）の方が適切"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"選び方のフロー"}</h4>
{" "}
<figure className="diagram-card"><Diagram id="d26" label="Skill 1.3.3 Query と Scan の違いの図解 d26" /></figure>
{" "}
<h3 className="h-bp">{"ベストプラクティス"}</h3>
{" "}
<ul>
{" "}
<li><strong>{"Query を基本"}</strong>{"にし、Scan は避ける。"}<strong>{"頻繁な Scan が必要になったら、データモデル（キー / インデックス）の設計が不適切"}</strong>{"というサイン"}</li>
{" "}
<li>{"別の属性での検索には "}<strong>{"GSI"}</strong>{" を使う"}</li>
{" "}
<li>{"ソートキーで"}<strong>{"範囲を絞って"}</strong>{"取得量を減らす"}</li>
{" "}
<li>{"取得項目が少なければ "}<strong><code>{"ProjectionExpression"}</code></strong>{" で必要な属性だけ返す（転送量を減らす。"}<strong>{"RCU は減らない"}</strong>{"点に注意）"}</li>
{" "}
<li>{"大量データの分析は "}<strong>{"S3 へのエクスポート"}</strong>{"や Athena を検討する"}</li>
{" "}
</ul>
{" "}
<h3 className="h-exam">{"試験での狙われ方"}</h3>
{" "}
<ul>
{" "}
<li>{"「Scan が遅く、容量を大量消費している」→ "}<strong>{"Query に置き換え / GSI の作成"}</strong></li>
{" "}
<li>{"「フィルター式を使えば RCU が減るか」→ "}<strong>{"減らない"}</strong>{"（読み取った量で課金される）"}</li>
{" "}
<li>{"「1 回で全件が返ってこない」→ "}<strong>{"1 MB の上限。"}<code>{"LastEvaluatedKey"}</code>{" でページネーション"}</strong></li>
{" "}
<li>{"「Query の必須条件」→ "}<strong>{"パーティションキーの等価条件"}</strong></li>
{" "}
</ul>
{" "}
</section>);}
