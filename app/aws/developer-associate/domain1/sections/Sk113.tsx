import { Diagram } from '../Diagram';
/** Skill 1.1.3 密結合と疎結合を全量保持する。 */
export function Sk113(){return (<section className="section" id="sk-1-1-3" tabIndex={-1}>
<h2>{"Skill 1.1.3 密結合と疎結合"}</h2>
{" "}
<h3 className="h-one">{"ひとことで言うと"}</h3>
{" "}
<p>{"部品同士が"}<strong>{"どれだけお互いに依存しているか"}</strong>{"です。AWS の設計思想では"}<strong>{"疎結合が基本の正解"}</strong>{"です。"}</p>
{" "}
<h3 className="h-detail">{"詳しい説明"}</h3>
{" "}
<ul>
{" "}
<li><strong>{"密結合"}</strong>{": A が B を直接呼び出し、B の応答を待つ。B が遅い・落ちると A も止まる。B の仕様変更が A を壊す。"}</li>
{" "}
<li><strong>{"疎結合"}</strong>{": A と B の間に"}<strong>{"キュー・トピック・イベントバス"}</strong>{"などの仲介を置く。A は B の状態を気にせずメッセージを置くだけでよい。"}</li>
{" "}
</ul>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 8">
<table>

<thead>

<tr>

<th scope="col">{"観点"}</th>

<th scope="col">{"密結合"}</th>

<th scope="col">{"疎結合"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"障害の伝播"}</td>

<td>{"連鎖しやすい"}</td>

<td>{"仲介役が吸収できる"}</td>

</tr>

<tr>

<td>{"スケール"}</td>

<td>{"両者を同時に拡張する必要"}</td>

<td>{"それぞれ独立して拡張"}</td>

</tr>

<tr>

<td>{"変更の影響"}</td>

<td>{"相手を巻き込む"}</td>

<td>{"契約（メッセージ形式）を守れば独立"}</td>

</tr>

<tr>

<td>{"負荷の急増"}</td>

<td>{"受け手が直撃を受ける"}</td>

<td>{"キューがバッファになる"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<figure className="diagram-card"><Diagram id="d05" label="Skill 1.1.3 密結合と疎結合の図解 d05" /></figure>
{" "}
<h3>{"疎結合を実現する AWS サービス"}</h3>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 9">
<table>

<thead>

<tr>

<th scope="col">{"手段"}</th>

<th scope="col">{"使いどころ"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"Amazon SQS"}</td>

<td>{"処理を後回しにしたい・負荷をならしたい（バッファリング）"}</td>

</tr>

<tr>

<td>{"Amazon SNS"}</td>

<td>{"1 つの通知を複数へ配信（Pub/Sub）"}</td>

</tr>

<tr>

<td>{"Amazon EventBridge"}</td>

<td>{"イベントをルールで振り分けたい"}</td>

</tr>

<tr>

<td>{"AWS Step Functions"}</td>

<td>{"複数のサービス呼び出しを順序立てて実行したい"}</td>

</tr>

<tr>

<td>{"Amazon API Gateway"}</td>

<td>{"クライアントとバックエンドの間に API という契約を置く"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3 className="h-bp">{"ベストプラクティス"}</h3>
{" "}
<ul>
{" "}
<li>{"同期呼び出しでつなぐ必要がない箇所は、"}<strong>{"キューやイベントで間に挟む"}</strong></li>
{" "}
<li>{"メッセージ（イベント）の"}<strong>{"スキーマ（契約）を明確に管理"}</strong>{"し、後方互換性を保って変更する"}</li>
{" "}
<li>{"受け手が落ちてもメッセージが失われないよう、"}<strong>{"SQS の保持期間や DLQ"}</strong>{"を設定する"}</li>
{" "}
</ul>
{" "}
<h3 className="h-exam">{"試験での狙われ方"}</h3>
{" "}
<ul>
{" "}
<li>{"「バックエンドが遅いとフロントも詰まる。改善したい」→ "}<strong>{"間に SQS を入れて非同期化（疎結合）"}</strong></li>
{" "}
<li>{"「アクセス急増時に DB が過負荷になる」→ "}<strong>{"SQS でバッファリングし、消費速度を制御"}</strong></li>
{" "}
</ul>
{" "}
</section>);}
