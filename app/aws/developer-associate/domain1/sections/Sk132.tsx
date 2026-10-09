import { Diagram } from '../Diagram';
/** Skill 1.3.2 整合性モデルを全量保持する。 */
export function Sk132(){return (<section className="section" id="sk-1-3-2" tabIndex={-1}>
<h2>{"Skill 1.3.2 整合性モデル"}</h2>
{" "}
<blockquote>{" "}<p>{"公式のスキル文: データベースの整合性モデル（強い整合性、結果整合性など）を説明する"}</p>{" "}</blockquote>
{" "}
<h3 className="h-one">{"ひとことで言うと"}</h3>
{" "}
<p>{"「"}<strong>{"書いた直後に読んだら、最新の値が必ず返るか?"}</strong>{"」の違いです。"}<strong>{"速さと正確さのトレードオフ"}</strong>{"です。"}</p>
{" "}
<h3 className="h-detail">{"詳しい説明"}</h3>
{" "}
<p>{"DynamoDB は、データを複数の場所（AZ）に複製して保存します。そのため、読み取りの種類によって返る値が変わります。"}</p>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 77">
<table>

<thead>

<tr>

<th scope="col">{"読み取りの種類"}</th>

<th scope="col">{"最新の書き込みが反映されているか"}</th>

<th scope="col">{"レイテンシー・コスト"}</th>

<th scope="col">{"備考"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"結果整合性のある読み取り（既定）"}</strong></td>

<td><strong>{"直後は古い値が返ることがある"}</strong>{"（通常は 1 秒以内に整合）"}</td>

<td>{"速い・安い（"}<strong>{"0.5 RCU / 4 KB"}</strong>{"）"}</td>

<td>{"既定の動作"}</td>

</tr>

<tr>

<td><strong>{"強い整合性のある読み取り"}</strong></td>

<td><strong>{"常に最新の値"}</strong>{"が返る"}</td>

<td>{"遅め・高い（"}<strong>{"1 RCU / 4 KB"}</strong>{" = 2 倍）"}</td>

<td><code>{"ConsistentRead=True"}</code>{" を指定"}</td>

</tr>

<tr>

<td><strong>{"トランザクション読み取り"}</strong></td>

<td>{"一貫したスナップショット（ACID）"}</td>

<td><strong>{"2 RCU / 4 KB"}</strong></td>

<td><code>{"TransactGetItems"}</code></td>

</tr>

</tbody>

</table>
</div>
{" "}
<figure className="diagram-card"><Diagram id="d25" label="Skill 1.3.2 整合性モデルの図解 d25" /></figure>
{" "}
<h4>{"制約（試験で出る）"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 78">
<table>

<thead>

<tr>

<th scope="col">{"対象"}</th>

<th scope="col">{"強い整合性"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"テーブル"}</td>

<td><strong>{"可能"}</strong></td>

</tr>

<tr>

<td><strong>{"ローカルセカンダリインデックス（LSI）"}</strong></td>

<td><strong>{"可能"}</strong></td>

</tr>

<tr>

<td><strong>{"グローバルセカンダリインデックス（GSI）"}</strong></td>

<td><strong>{"不可（結果整合性のみ）"}</strong></td>

</tr>

<tr>

<td><strong>{"DynamoDB Streams"}</strong></td>

<td>{"—"}</td>

</tr>

<tr>

<td><strong>{"グローバルテーブル"}</strong></td>

<td>{"強い整合性の読み取りは"}<strong>{"書き込みを受けたリージョンのみ"}</strong>{"（他リージョンへの複製は結果整合性）"}</td>

</tr>

<tr>

<td><strong>{"DAX"}</strong></td>

<td>{"強い整合性のリクエストは"}<strong>{"キャッシュを使わず DynamoDB へ素通し"}</strong></td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"他のデータストアの整合性"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 79">
<table>

<thead>

<tr>

<th scope="col">{"データストア"}</th>

<th scope="col">{"整合性"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"Amazon S3"}</strong></td>

<td>{"新規・上書き・削除ともに "}<strong>{"強い読み取り整合性（read-after-write）"}</strong>{"（2020 年 12 月以降）"}</td>

</tr>

<tr>

<td><strong>{"Amazon RDS / Aurora"}</strong></td>

<td>{"通常のトランザクション（ACID）。"}<strong>{"リードレプリカ"}</strong>{"は"}<strong>{"非同期"}</strong>{"のため結果整合性（レプリカラグ）"}</td>

</tr>

<tr>

<td><strong>{"ElastiCache"}</strong></td>

<td>{"キャッシュのため、元データとのズレが起こり得る（Skill 1.3.8）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"実装での使い分け"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 80">
<table>

<thead>

<tr>

<th scope="col">{"要件"}</th>

<th scope="col">{"選択"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"「書いた直後に必ず最新を読みたい」（残高、在庫の確認など）"}</td>

<td><strong>{"強い整合性のある読み取り"}</strong></td>

</tr>

<tr>

<td>{"「少し古くても許容」（ランキング、閲覧履歴）"}</td>

<td><strong>{"結果整合性"}</strong>{"（安くて速い）"}</td>

</tr>

<tr>

<td>{"「複数アイテムの更新をすべて成功 / すべて失敗にしたい」"}</td>

<td><strong>{"トランザクション（"}<code>{"TransactWriteItems"}</code>{"）"}</strong></td>

</tr>

<tr>

<td>{"「同時更新による上書き事故を防ぎたい」"}</td>

<td><strong>{"条件付き書き込み / 楽観的ロック（バージョン属性）"}</strong></td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3 className="h-bp">{"ベストプラクティス"}</h3>
{" "}
<ul>
{" "}
<li>{"既定（結果整合性）で足りる読み取りは、そのまま使う（"}<strong>{"費用が半分"}</strong>{"）"}</li>
{" "}
<li><strong>{"正確さが必須の箇所だけ"}</strong>{"強い整合性を使う"}</li>
{" "}
<li><strong>{"GSI は強い整合性が使えない"}</strong>{"ことを設計時点で把握する"}</li>
{" "}
<li>{"同時更新には"}<strong>{"条件付き書き込み（"}<code>{"ConditionExpression"}</code>{"）による楽観的ロック"}</strong>{"を使う"}</li>
{" "}
</ul>
{" "}
<h3 className="h-exam">{"試験での狙われ方"}</h3>
{" "}
<ul>
{" "}
<li>{"「書き込み直後の読み取りで古いデータが返る」→ "}<strong><code>{"ConsistentRead=True"}</code></strong></li>
{" "}
<li>{"「GSI に対して強い整合性の読み取り」→ "}<strong>{"できない"}</strong></li>
{" "}
<li>{"「強い整合性の読み取りは結果整合性の何倍のコスト?」→ "}<strong>{"2 倍"}</strong></li>
{" "}
<li>{"「結果整合性は 4 KB あたり何 RCU?」→ "}<strong>{"0.5 RCU"}</strong></li>
{" "}
</ul>
{" "}
</section>);}
