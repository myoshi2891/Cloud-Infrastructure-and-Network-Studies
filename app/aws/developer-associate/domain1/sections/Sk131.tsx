import { Diagram } from '../Diagram';
/** Skill 1.3.1 高カーディナリティのパーティションキーを全量保持する。 */
export function Sk131(){return (<section className="section" id="sk-1-3-1" tabIndex={-1}>
<h2>{"Skill 1.3.1 高カーディナリティのパーティションキー"}</h2>
{" "}
<blockquote>{" "}<p>{"公式のスキル文: 負荷の偏りのないパーティションアクセスのために、高カーディナリティのパーティションキーを説明する"}</p>{" "}</blockquote>
{" "}
<h3 className="h-one">{"ひとことで言うと"}</h3>
{" "}
<p><strong>{"データを均等に散らせる（値の種類が多い）キー"}</strong>{"を選ぶ、というスキルです。偏ると、特定のパーティションだけが過負荷になります。"}</p>
{" "}
<h3 className="h-detail">{"詳しい説明"}</h3>
{" "}
<h4>{"カーディナリティとは"}</h4>
{" "}
<p><strong>{"カーディナリティ"}</strong>{"は、"}<strong>{"値の種類の多さ"}</strong>{"です。ユーザー ID のように何百万種類もある → "}<strong>{"高カーディナリティ"}</strong>{"。性別や都道府県のように数種類・数十種類 → "}<strong>{"低カーディナリティ"}</strong>{"。"}</p>
{" "}
<p>{"DynamoDB は、"}<strong>{"パーティションキーの値をハッシュ"}</strong>{"して、データの保存先パーティション（物理的な記憶領域）を決めます。したがって、"}<strong>{"キーが多様でアクセスが均等"}</strong>{"なほど、負荷が全体に分散し、性能を最大限に引き出せます。"}</p>
{" "}
<figure className="diagram-card"><Diagram id="d24" label="Skill 1.3.1 高カーディナリティのパーティションキーの図解 d24" /></figure>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 75">
<table>

<thead>

<tr>

<th scope="col">{"パーティションキーの例"}</th>

<th scope="col">{"評価"}</th>

<th scope="col">{"理由"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><code>{"userId"}</code>{"、"}<code>{"orderId"}</code>{"、"}<code>{"deviceId"}</code></td>

<td>{"良い"}</td>

<td>{"値の種類が多く、アクセスも分散しやすい"}</td>

</tr>

<tr>

<td><code>{"status"}</code>{"、"}<code>{"country"}</code>{"、"}<code>{"gender"}</code></td>

<td>{"悪い"}</td>

<td>{"値が少なく、特定の値にデータが集中する"}</td>

</tr>

<tr>

<td><code>{"date"}</code>{"（日付のみ）"}</td>

<td>{"悪い"}</td>

<td><strong>{"今日の日付"}</strong>{"に書き込みが集中する（ホットパーティション）"}</td>

</tr>

<tr>

<td><code>{"date"}</code>{" + ランダムな接尾辞"}</td>

<td>{"良い（工夫）"}</td>

<td>{"後述の"}<strong>{"書き込みシャーディング"}</strong>{"で分散"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"ホットパーティションと対策"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 76">
<table>

<thead>

<tr>

<th scope="col">{"問題"}</th>

<th scope="col">{"対策"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"特定のキーにアクセスが集中"}</td>

<td><strong>{"書き込みシャーディング"}</strong>{": キーに "}<code>{"#0"}</code>{"〜"}<code>{"#N"}</code>{" のランダム（またはハッシュ由来）の接尾辞を付けて分散。読み取りは全接尾辞を"}<strong>{"並列 Query"}</strong>{" して集約"}</td>

</tr>

<tr>

<td>{"読み取りが偏る"}</td>

<td><strong>{"DAX / ElastiCache"}</strong>{" でキャッシュ（Skill 1.3.8）"}</td>

</tr>

<tr>

<td>{"突発的な急増"}</td>

<td><strong>{"オンデマンドモード"}</strong>{"（ただし、アクセスの偏り自体は解決しない）"}</td>

</tr>

<tr>

<td>{"低い単価で均一性が弱い"}</td>

<td>{"キーの"}<strong>{"複合化"}</strong>{"（例: "}<code>{"tenantId#userId"}</code>{"）で分散を改善"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<blockquote>{" "}<p>{"DynamoDB には"}<strong>{"アダプティブキャパシティ"}</strong>{"があり、偏りがあってもある程度は自動的に吸収します。ただし"}<strong>{"万能ではなく、まず分散するキー設計が基本"}</strong>{"です。"}</p>{" "}</blockquote>
{" "}
<h3 className="h-bp">{"ベストプラクティス"}</h3>
{" "}
<ul>
{" "}
<li>{"パーティションキーは"}<strong>{"値の種類が多く、アクセスが均等"}</strong>{"になるものを選ぶ"}</li>
{" "}
<li>{"「"}<strong>{"よく使う属性 = 良いキー"}</strong>{"」とは限らない。"}<strong>{"アクセスパターンの偏り"}</strong>{"で判断する"}</li>
{" "}
<li>{"偏りが避けられない場合は、"}<strong>{"書き込みシャーディング"}</strong>{"やキャッシュで緩和する"}</li>
{" "}
</ul>
{" "}
<h3 className="h-exam">{"試験での狙われ方"}</h3>
{" "}
<ul>
{" "}
<li>{"「DynamoDB で "}<code>{"ProvisionedThroughputExceededException"}</code>{" が出る。テーブル全体の容量には余裕がある」→ "}<strong>{"ホットパーティション。キーの再設計 / シャーディング"}</strong></li>
{" "}
<li>{"「パーティションキーに適しているのは?」→ "}<strong><code>{"userId"}</code>{" など高カーディナリティのもの"}</strong></li>
{" "}
</ul>
{" "}
</section>);}
