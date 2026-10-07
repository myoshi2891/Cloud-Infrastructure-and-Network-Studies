import { Diagram } from '../Diagram';
/** Skill 1.1.2 ステートフルとステートレスを全量保持する。 */
export function Sk112(){return (<section className="section" id="sk-1-1-2" tabIndex={-1}>
<h2>{"Skill 1.1.2 ステートフルとステートレス"}</h2>
{" "}
<h3 className="h-one">{"ひとことで言うと"}</h3>
{" "}
<p>{"リクエストをまたいで"}<strong>{"「前回のこと」を覚えているか"}</strong>{"の違いです。"}</p>
{" "}
<h3 className="h-detail">{"詳しい説明"}</h3>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 6">
<table>

<thead>

<tr>

<th scope="col">{"観点"}</th>

<th scope="col">{"ステートフル"}</th>

<th scope="col">{"ステートレス"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"状態の保持"}</td>

<td>{"サーバー（プロセス）が保持する"}</td>

<td>{"サーバーは保持しない。毎回必要な情報をリクエストに含めるか、外部に保存"}</td>

</tr>

<tr>

<td>{"スケールアウト"}</td>

<td>{"難しい（同じサーバーに振り分ける必要＝スティッキーセッション）"}</td>

<td>{"容易（どのサーバーでも同じ結果）"}</td>

</tr>

<tr>

<td>{"障害時"}</td>

<td>{"サーバーが落ちると状態を失う"}</td>

<td>{"別のサーバーが引き継げる"}</td>

</tr>

<tr>

<td>{"例"}</td>

<td>{"メモリ上にセッションを持つ Web サーバー"}</td>

<td>{"Lambda、JWT を使う API"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p>{"重要なのは「"}<strong>{"状態そのものをなくす"}</strong>{"」のではなく、"}<strong>{"状態を外に出す"}</strong>{"ことです。アプリを動かすサーバーやコンテナは使い捨てにし、状態は次のような外部ストアに置きます。"}</p>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 7">
<table>

<thead>

<tr>

<th scope="col">{"保存したい状態"}</th>

<th scope="col">{"外部ストアの例"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"ユーザーセッション"}</td>

<td>{"Amazon DynamoDB（TTL 付き）、Amazon ElastiCache"}</td>

</tr>

<tr>

<td>{"アップロードファイル"}</td>

<td>{"Amazon S3"}</td>

</tr>

<tr>

<td>{"業務データ"}</td>

<td>{"Amazon DynamoDB、Amazon RDS / Aurora"}</td>

</tr>

<tr>

<td>{"認証情報"}</td>

<td>{"トークン（JWT など）をクライアントが持つ"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<figure className="diagram-card"><Diagram id="d04" label="Skill 1.1.2 ステートフルとステートレスの図解 d04" /></figure>
{" "}
<h3>{"Lambda での注意"}</h3>
{" "}
<p>{"Lambda の実行環境は再利用されることがありますが、"}<strong>{"再利用は保証されません"}</strong>{"。グローバル変数に入れたデータは「あれば得」な"}<strong>{"キャッシュ"}</strong>{"として扱い、永続的な状態の保存先にしてはいけません。永続させたいデータは DynamoDB や S3 に書きます。"}<code>{"/tmp"}</code>{" も同様で、同じ実行環境内でしか残らない一時領域です。"}</p>
{" "}
<h3 className="h-bp">{"ベストプラクティス"}</h3>
{" "}
<ul>
{" "}
<li>{"アプリケーション層は"}<strong>{"ステートレス"}</strong>{"に作り、水平スケールしやすくする"}</li>
{" "}
<li>{"セッション情報は ElastiCache や DynamoDB に出す。ELB のスティッキーセッションは「やむを得ない場合の手段」と考える"}</li>
{" "}
<li>{"Lambda ではグローバル変数を「最適化のためのキャッシュ」にのみ使う"}</li>
{" "}
</ul>
{" "}
<h3 className="h-exam">{"試験での狙われ方"}</h3>
{" "}
<ul>
{" "}
<li>{"「Auto Scaling で台数が増減してもセッションが切れないようにしたい」→ "}<strong>{"セッションを外部ストア（ElastiCache / DynamoDB）へ"}</strong></li>
{" "}
<li>{"「Lambda 関数間でデータを共有したい」→ グローバル変数や "}<code>{"/tmp"}</code>{" ではなく "}<strong>{"DynamoDB / S3 など外部ストア"}</strong></li>
{" "}
</ul>
{" "}
</section>);}
