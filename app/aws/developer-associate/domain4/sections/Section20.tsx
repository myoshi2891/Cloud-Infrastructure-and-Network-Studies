import { CodeBlock } from '../CodeBlock';
import { Diagram } from '../Diagram';
/** 原本step-19の全内容。 */
export function Section20() { return (<section className="section" id="step-19" tabIndex={-1}>
{" "}
<div className="sec-head">
<div className="sec-icon">
<i className="ti ti-filter" aria-hidden="true"></i>
</div>
<div>
<p className="eyebrow">{"Task 3 · Step 19 · 4.3.4"}</p>
<h2>{"SNS サブスクリプションフィルターポリシー"}</h2>
</div>
</div>
{" "}
<h3>{"この項目で学ぶこと"}</h3>
{" "}
<p>{"SNS の "}<strong>{"ファンアウト"}</strong>{"(1 つのトピックから多数の購読者へ配信)で、"}<strong>{"各購読者が必要なメッセージだけを受け取る"}</strong>{" ようにする機能です。"}<strong>{"不要なメッセージを購読者側で捨てるのではなく、SNS 側で配信しない"}</strong>{" ことで、処理コストを下げます。"}</p>
{" "}
<h3>{"やさしい解説"}</h3>
{" "}
<h4>{"19-1. フィルターなし vs あり"}</h4>
{" "}
<figure className="diagram-card">
<Diagram id="d27" label="図 28" />
</figure>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 109">
<table className="t3">

<thead>

<tr>

<th scope="col">{"項目"}</th>

<th scope="col">{"フィルターなし"}</th>

<th scope="col">{"フィルターあり"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"配信"}</td>

<td>{"全購読者に "}<strong>{"全メッセージ"}</strong></td>

<td><strong>{"条件に一致したメッセージだけ"}</strong></td>

</tr>

<tr>

<td>{"購読者側の処理"}</td>

<td>{"受け取って "}<strong>{"コードで読み捨て"}</strong></td>

<td>{"不要なメッセージは "}<strong>{"そもそも届かない"}</strong></td>

</tr>

<tr>

<td>{"コスト・負荷"}</td>

<td>{"Lambda 起動・キュー処理が無駄に発生"}</td>

<td>{"無駄が減る"}</td>

</tr>

<tr>

<td>{"コード"}</td>

<td>{"購読者に振り分けロジックが必要"}</td>

<td><strong>{"設定だけ"}</strong>{"(コードを簡素化)"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"19-2. フィルターポリシーの基本"}</h4>
{" "}
<ul>
{" "}
<li>{"ポリシーは "}<strong>{"サブスクリプションごと"}</strong>{"(購読者ごと)に設定します。"}</li>
{" "}
<li>{"既定では "}<strong>{"メッセージ属性(MessageAttributes)"}</strong>{" に対して評価します。"}<strong><code>{"FilterPolicyScope"}</code>{" を "}<code>{"MessageBody"}</code>{" にすると、メッセージ本文(JSON)のペイロード"}</strong>{" に対しても評価できます。"}</li>
{" "}
<li>{"ポリシーのキーは "}<strong>{"AND"}</strong>{"、1 つのキーの値のリストは "}<strong>{"OR"}</strong>{" で評価されます。"}</li>
{" "}
</ul>
{" "}
<div className="code-sample">
<div className="cb-head">
{"JSON"}
</div>
<CodeBlock language="json" lines={["{","  \"store\": [\"tokyo\", \"osaka\"],","  \"event\": [{ \"anything-but\": \"cancelled\" }],","  \"price\": [{ \"numeric\": [\">=\", 100] }]","}"]} />
</div>
{" "}
<p>{"この例は「"}<strong>{"store が tokyo または osaka、かつ event が cancelled 以外、かつ price が 100 以上"}</strong>{"」に一致するメッセージだけを配信します。"}</p>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 110">
<table className="t3">

<thead>

<tr>

<th scope="col">{"演算"}</th>

<th scope="col">{"例"}</th>

<th scope="col">{"意味"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"完全一致"}</td>

<td><code>{"\"event\": [\"order_placed\"]"}</code></td>

<td>{"値が一致"}</td>

</tr>

<tr>

<td>{"前方一致"}</td>

<td><code>{"\"customer\": [{\"prefix\": \"vip-\"}]"}</code></td>

<td>{"先頭が一致"}</td>

</tr>

<tr>

<td>{"否定"}</td>

<td><code>{"\"event\": [{\"anything-but\": \"cancelled\"}]"}</code></td>

<td>{"指定値以外"}</td>

</tr>

<tr>

<td>{"数値"}</td>

<td><code>{"\"price\": [{\"numeric\": [\">=\", 100]}]"}</code></td>

<td>{"数値の比較"}</td>

</tr>

<tr>

<td>{"存在確認"}</td>

<td><code>{"\"coupon\": [{\"exists\": true}]"}</code></td>

<td>{"属性が存在する"}</td>

</tr>

<tr>

<td>{"OR(複数値)"}</td>

<td><code>{"\"store\": [\"tokyo\", \"osaka\"]"}</code></td>

<td>{"いずれか"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p>{"(ほかにも後方一致、大文字小文字を無視した一致、"}<code>{"$or"}</code>{" による属性をまたいだ OR などが使えます。詳細は公式ドキュメントを参照。)"}</p>
{" "}
<h4>{"19-3. 設定のポイント"}</h4>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 111">
<table>

<thead>

<tr>

<th scope="col">{"項目"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"発行者側"}</td>

<td>{"メッセージ属性を付けて Publish("}<code>{"MessageAttributes"}</code>{")。"}<strong>{"本文フィルターなら属性は不要"}</strong></td>

</tr>

<tr>

<td>{"購読者側"}</td>

<td>{"サブスクリプションに "}<code>{"FilterPolicy"}</code>{"(と必要なら "}<code>{"FilterPolicyScope"}</code>{")を設定"}</td>

</tr>

<tr>

<td>{"一致しないメッセージ"}</td>

<td><strong>{"配信されず"}</strong>{"、課金対象の配信にもならない。メトリクス "}<code>{"NumberOfNotificationsFilteredOut"}</code>{"(など)で確認できる"}</td>

</tr>

<tr>

<td>{"動作確認"}</td>

<td>{"届かない場合は "}<strong>{"ポリシーの構文、属性名・型(String / Number)の一致、スコープ(属性 / 本文)"}</strong>{" を確認"}</td>

</tr>

<tr>

<td>{"注意"}</td>

<td>{"SQS へ配信する場合、"}<strong>{"生のメッセージ配信(Raw message delivery)"}</strong>{" を有効にしない限り、SNS のエンベロープ付き JSON が届く"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"ベストプラクティス"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 112">
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

<td>{"責務の分離"}</td>

<td>{"振り分けロジックを "}<strong>{"購読者のコードではなく SNS のフィルターポリシー"}</strong>{" に置く"}</td>

<td>{"無駄な起動・処理の削減、コードの簡素化"}</td>

</tr>

<tr>

<td>{"属性設計"}</td>

<td><strong>{"フィルターに使う属性を発行側で統一的に付与"}</strong>{"(イベント種別、地域、優先度など)"}</td>

<td>{"購読者が自由に絞り込める"}</td>

</tr>

<tr>

<td>{"トピック数"}</td>

<td>{"種別ごとにトピックを乱立させず、"}<strong>{"1 トピック + フィルターポリシー"}</strong>{" を検討"}</td>

<td>{"管理が楽になる"}</td>

</tr>

<tr>

<td>{"検証"}</td>

<td>{"フィルター変更後は、"}<strong>{"想定したメッセージが届く / 届かないことをテスト"}</strong>{" する"}</td>

<td>{"取りこぼし防止"}</td>

</tr>

<tr>

<td>{"取りこぼし対策"}</td>

<td>{"どのポリシーにも一致しないメッセージが "}<strong>{"捨てられる"}</strong>{" ことに留意。全件を確保したい場合は "}<strong>{"ポリシーなしの購読者(アーカイブ用)"}</strong>{" を置く"}</td>

<td>{"データ欠落の防止"}</td>

</tr>

<tr>

<td>{"失敗時"}</td>

<td>{"購読者側に "}<strong>{"DLQ"}</strong>{" を設定する"}</td>

<td>{"配信失敗の救済"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"ひっかけポイント"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 113">
<table>

<thead>

<tr>

<th scope="col">{"問われ方"}</th>

<th scope="col">{"正しい考え方"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"「購読者ごとに、必要なメッセージだけを受け取りたい(コード変更を最小に)」"}</td>

<td><strong>{"SNS サブスクリプションフィルターポリシー"}</strong></td>

</tr>

<tr>

<td>{"「フィルターポリシーはどこに設定する」"}</td>

<td><strong>{"発行者ではなくサブスクリプション(購読者)側"}</strong></td>

</tr>

<tr>

<td>{"「メッセージ本文の値でフィルターしたい」"}</td>

<td><code>{"FilterPolicyScope"}</code>{" を "}<strong><code>{"MessageBody"}</code></strong>{" に設定"}</td>

</tr>

<tr>

<td>{"「どのポリシーにも一致しないメッセージは?」"}</td>

<td><strong>{"そのサブスクリプションには配信されない"}</strong></td>

</tr>

<tr>

<td>{"「複数の条件(キー)を指定した場合」"}</td>

<td>{"キー同士は "}<strong>{"AND"}</strong>{"、1 つのキーの値のリストは "}<strong>{"OR"}</strong></td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"参考 URL"}</h3>
{" "}
<ul className="ref-list">
{" "}
<li>{"SNS のメッセージフィルタリング: "}<a href="https://docs.aws.amazon.com/sns/latest/dg/sns-message-filtering.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/sns/latest/dg/sns-message-filtering.html"}</a></li>
{" "}
<li>{"サブスクリプションフィルターポリシー: "}<a href="https://docs.aws.amazon.com/sns/latest/dg/sns-subscription-filter-policies.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/sns/latest/dg/sns-subscription-filter-policies.html"}</a></li>
{" "}
<li>{"ペイロードベースのフィルタリング: "}<a href="https://docs.aws.amazon.com/sns/latest/dg/sns-message-filtering-scope.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/sns/latest/dg/sns-message-filtering-scope.html"}</a></li>
{" "}
</ul>
{" "}
</section>); }
