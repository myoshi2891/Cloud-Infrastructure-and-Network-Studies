import { Diagram } from '../Diagram';
/** Skill 1.3.8 キャッシュサービスを全量保持する。 */
export function Sk138(){return (<section className="section" id="sk-1-3-8" tabIndex={-1}>
<h2>{"Skill 1.3.8 キャッシュサービス"}</h2>
{" "}
<blockquote>{" "}<p>{"公式のスキル文: データキャッシュサービスを使用する"}</p>{" "}</blockquote>
{" "}
<h3 className="h-one">{"ひとことで言うと"}</h3>
{" "}
<p><strong>{"よく読まれるデータを、高速な場所（メモリ）に置いておき"}</strong>{"、元のデータストアへのアクセスを減らして"}<strong>{"速く・安く"}</strong>{"するスキルです。"}</p>
{" "}
<h3 className="h-detail">{"詳しい説明"}</h3>
{" "}
<h4>{"AWS のキャッシュサービス"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 102">
<table>

<thead>

<tr>

<th scope="col">{"サービス"}</th>

<th scope="col">{"役割"}</th>

<th scope="col">{"特徴"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"Amazon ElastiCache"}</strong></td>

<td>{"汎用のインメモリキャッシュ（"}<strong>{"Valkey / Redis OSS / Memcached"}</strong>{"）"}</td>

<td>{"汎用。"}<strong>{"どのデータストアの前"}</strong>{"にも置ける。セッション管理、ランキング、Pub/Sub など"}</td>

</tr>

<tr>

<td><strong>{"Amazon DynamoDB Accelerator (DAX)"}</strong></td>

<td><strong>{"DynamoDB 専用"}</strong>{"のインメモリキャッシュ"}</td>

<td><strong>{"DynamoDB API と互換"}</strong>{"で、アプリの変更は最小限（DAX クライアントに差し替え）。"}<strong>{"ミリ秒 → マイクロ秒"}</strong>{"の読み取り"}</td>

</tr>

<tr>

<td><strong>{"Amazon API Gateway キャッシュ"}</strong></td>

<td>{"API レスポンスのキャッシュ（REST API）"}</td>

<td>{"バックエンドの呼び出しを削減"}</td>

</tr>

<tr>

<td><strong>{"Amazon CloudFront"}</strong></td>

<td><strong>{"エッジ"}</strong>{"でコンテンツをキャッシュ"}</td>

<td>{"静的・動的コンテンツの配信。世界中のユーザーに低遅延"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"ElastiCache: Valkey / Redis OSS と Memcached"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 103">
<table>

<thead>

<tr>

<th scope="col">{"観点"}</th>

<th scope="col">{"Redis OSS / Valkey"}</th>

<th scope="col">{"Memcached"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"データ構造"}</td>

<td>{"豊富（文字列、ハッシュ、リスト、セット、ソート済みセットなど）"}</td>

<td>{"シンプルなキー・バリュー"}</td>

</tr>

<tr>

<td><strong>{"永続化 / バックアップ"}</strong></td>

<td><strong>{"あり"}</strong>{"（スナップショット）"}</td>

<td>{"なし"}</td>

</tr>

<tr>

<td><strong>{"レプリケーション / Multi-AZ・自動フェイルオーバー"}</strong></td>

<td><strong>{"あり"}</strong></td>

<td>{"なし"}</td>

</tr>

<tr>

<td><strong>{"Pub/Sub、トランザクション、Lua"}</strong></td>

<td>{"あり"}</td>

<td>{"なし"}</td>

</tr>

<tr>

<td>{"マルチスレッド"}</td>

<td>{"—"}</td>

<td><strong>{"あり"}</strong>{"（大きなノードで有利）"}</td>

</tr>

<tr>

<td>{"向く場面"}</td>

<td><strong>{"セッション、ランキング、リアルタイム分析、永続性が必要な場合"}</strong></td>

<td>{"シンプルで大量のキャッシュ。"}<strong>{"水平にスケール"}</strong>{"させたいだけの場合"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<blockquote>{" "}<p>{"迷ったら「"}<strong>{"機能が豊富（永続化・レプリケーション・高可用性）= Redis OSS / Valkey"}</strong>{"」「"}<strong>{"単純で水平分散だけ = Memcached"}</strong>{"」と覚えます。"}</p>{" "}</blockquote>
{" "}
<h4>{"キャッシュ戦略（4 つの基本パターン）"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 104">
<table>

<thead>

<tr>

<th scope="col">{"戦略"}</th>

<th scope="col">{"動き"}</th>

<th scope="col">{"長所"}</th>

<th scope="col">{"短所"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"Lazy Loading（Cache-Aside）"}</strong></td>

<td>{"読むときにキャッシュを確認し、"}<strong>{"無ければ DB から読んでキャッシュに格納"}</strong></td>

<td>{"要求されたデータだけが載る。キャッシュ障害でもアプリは動く"}</td>

<td>{"キャッシュミス時は遅い。"}<strong>{"古いデータが残る"}</strong></td>

</tr>

<tr>

<td><strong>{"Write-Through"}</strong></td>

<td><strong>{"DB に書くたびにキャッシュも更新"}</strong></td>

<td>{"キャッシュが常に新しい"}</td>

<td>{"書き込みが遅くなる。"}<strong>{"読まれないデータも載る"}</strong></td>

</tr>

<tr>

<td><strong>{"TTL（有効期限）"}</strong></td>

<td>{"キャッシュのデータに寿命を設定"}</td>

<td><strong>{"古いデータが残る期間を制限"}</strong>{"できる"}</td>

<td>{"期限切れ直後はミス"}</td>

</tr>

<tr>

<td><strong>{"Write-Behind（Write-Back）"}</strong></td>

<td>{"キャッシュに先に書き、"}<strong>{"後で非同期に DB へ反映"}</strong></td>

<td>{"書き込みが速い"}</td>

<td>{"データ損失のリスク"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<figure className="diagram-card"><Diagram id="d30" label="Skill 1.3.8 キャッシュサービスの図解 d30" /></figure>
{" "}
<blockquote>{" "}<p>{"実務では、"}<strong>{"Lazy Loading + TTL"}</strong>{"（古いデータの寿命を制限）を基本にし、"}<strong>{"更新が重要なデータには Write-Through を足す"}</strong>{"組み合わせがよく使われます。"}</p>{" "}</blockquote>
{" "}
<h4>{"DAX の押さえどころ"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 105">
<table>

<thead>

<tr>

<th scope="col">{"項目"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"2 種類のキャッシュ"}</strong></td>

<td><strong>{"アイテムキャッシュ"}</strong>{"（"}<code>{"GetItem"}</code>{" / "}<code>{"BatchGetItem"}</code>{"）と"}<strong>{"クエリキャッシュ"}</strong>{"（"}<code>{"Query"}</code>{" / "}<code>{"Scan"}</code>{" の結果）"}</td>

</tr>

<tr>

<td><strong>{"書き込み"}</strong></td>

<td><strong>{"ライトスルー"}</strong>{"（DAX を経由して DynamoDB に書き、キャッシュも更新）"}</td>

</tr>

<tr>

<td><strong>{"強い整合性の読み取り"}</strong></td>

<td><strong>{"キャッシュを使わず"}</strong>{"、DynamoDB に直接取りに行く（結果整合性のみがキャッシュ対象）"}</td>

</tr>

<tr>

<td><strong>{"向く場面"}</strong></td>

<td><strong>{"読み取りが多く、同じキーが繰り返し読まれる"}</strong>{"。ホットキーの緩和"}</td>

</tr>

<tr>

<td><strong>{"向かない場面"}</strong></td>

<td><strong>{"書き込みが多い"}</strong>{"、"}<strong>{"強い整合性が必須"}</strong>{"、読み取りがほとんど重複しない"}</td>

</tr>

<tr>

<td><strong>{"TTL"}</strong></td>

<td>{"アイテムキャッシュとクエリキャッシュに、それぞれ TTL がある（既定 5 分）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"ElastiCache と DAX の使い分け"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 106">
<table>

<thead>

<tr>

<th scope="col">{"要件"}</th>

<th scope="col">{"選択"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"DynamoDB"}</strong>{" の読み取りを、アプリ変更を最小限に高速化したい"}</td>

<td><strong>{"DAX"}</strong></td>

</tr>

<tr>

<td><strong>{"RDS / 外部 API の結果"}</strong>{"など、DynamoDB 以外もキャッシュしたい / セッションを持ちたい"}</td>

<td><strong>{"ElastiCache"}</strong></td>

</tr>

<tr>

<td>{"ブラウザ・エッジに近い場所でコンテンツを配りたい"}</td>

<td><strong>{"CloudFront"}</strong></td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3 className="h-bp">{"ベストプラクティス"}</h3>
{" "}
<ul>
{" "}
<li><strong>{"読み取りが多く、更新が少ないデータ"}</strong>{"をキャッシュする"}</li>
{" "}
<li><strong>{"TTL を必ず設定"}</strong>{"し、"}<strong>{"キャッシュの無効化（更新時に削除）"}</strong>{"の方針を決める"}</li>
{" "}
<li>{"キャッシュは"}<strong>{"あくまで高速化のための複製"}</strong>{"。"}<strong>{"元データ（ソース・オブ・トゥルース）は別に"}</strong>{"持つ"}</li>
{" "}
<li>{"キャッシュ障害でもアプリが動く設計（"}<strong>{"Lazy Loading のフォールバック"}</strong>{"）にする"}</li>
{" "}
<li><strong>{"キャッシュスタンピード"}</strong>{"（期限切れ直後の一斉ミス）には、TTL にランダム性を持たせる、ロックなどで対処する"}</li>
{" "}
<li><strong>{"機密データのキャッシュ"}</strong>{"は、保管時・転送中の暗号化と、アクセス制御（"}<strong>{"AUTH / IAM 認証"}</strong>{"）を使う"}</li>
{" "}
</ul>
{" "}
<h3 className="h-exam">{"試験での狙われ方"}</h3>
{" "}
<ul>
{" "}
<li>{"「DynamoDB の読み取りをマイクロ秒にしたい。コード変更は最小限」→ "}<strong>{"DAX"}</strong></li>
{" "}
<li>{"「ElastiCache でセッションを共有し、"}<strong>{"永続化と自動フェイルオーバー"}</strong>{"も必要」→ "}<strong>{"Redis OSS / Valkey"}</strong></li>
{" "}
<li>{"「キャッシュに古いデータが残る」→ "}<strong>{"TTL / Write-Through"}</strong></li>
{" "}
<li>{"「DAX で最新の値を必ず読みたい」→ "}<strong>{"強い整合性の読み取りは DAX を素通りする"}</strong></li>
{" "}
<li>{"「書き込みが多い DynamoDB に DAX は有効?」→ "}<strong>{"効果は薄い"}</strong></li>
{" "}
</ul>
{" "}
</section>);}
