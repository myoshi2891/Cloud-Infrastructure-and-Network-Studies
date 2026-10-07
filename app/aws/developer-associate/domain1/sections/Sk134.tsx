import { Diagram } from '../Diagram';
/** Skill 1.3.4 DynamoDB のキーとインデックスを全量保持する。 */
export function Sk134(){return (<section className="section" id="sk-1-3-4" tabIndex={-1}>
<h2>{"Skill 1.3.4 DynamoDB のキーとインデックス"}</h2>
{" "}
<blockquote>{" "}<p>{"公式のスキル文: Amazon DynamoDB のキーとインデックスを定義する"}</p>{" "}</blockquote>
{" "}
<h3 className="h-one">{"ひとことで言うと"}</h3>
{" "}
<p>{"DynamoDB は"}<strong>{"「どう検索するか」を先に決めてからテーブルを設計"}</strong>{"します。キーとインデックスが、検索できる方法を決めます。"}</p>
{" "}
<h3 className="h-detail">{"詳しい説明"}</h3>
{" "}
<h4>{"主キー（Primary Key）"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 83">
<table>

<thead>

<tr>

<th scope="col">{"種類"}</th>

<th scope="col">{"構成"}</th>

<th scope="col">{"特徴"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"シンプルな主キー"}</strong></td>

<td>{"パーティションキー（PK）のみ"}</td>

<td>{"PK の値で 1 件を特定。PK は"}<strong>{"テーブル内で一意"}</strong></td>

</tr>

<tr>

<td><strong>{"複合主キー"}</strong></td>

<td>{"パーティションキー + ソートキー（SK）"}</td>

<td><strong>{"同じ PK の中に複数のアイテム"}</strong>{"を持て、SK で並べ替え・範囲検索ができる。"}<strong>{"PK と SK の組み合わせが一意"}</strong></td>

</tr>

</tbody>

</table>
</div>
{" "}
<figure className="diagram-card"><Diagram id="d27" label="Skill 1.3.4 DynamoDB のキーとインデックスの図解 d27" /></figure>
{" "}
<h4>{"インデックス"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 84">
<table>

<thead>

<tr>

<th scope="col">{"観点"}</th>

<th scope="col">{"グローバルセカンダリインデックス（GSI）"}</th>

<th scope="col">{"ローカルセカンダリインデックス（LSI）"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"キー"}</td>

<td><strong>{"別のパーティションキー + 任意のソートキー"}</strong></td>

<td><strong>{"同じパーティションキー + 別のソートキー"}</strong></td>

</tr>

<tr>

<td>{"作成のタイミング"}</td>

<td><strong>{"いつでも"}</strong>{"（作成後に追加・削除できる）"}</td>

<td><strong>{"テーブル作成時のみ"}</strong></td>

</tr>

<tr>

<td>{"数の上限"}</td>

<td>{"テーブルあたり "}<strong>{"20"}</strong>{" 個（既定）"}</td>

<td>{"テーブルあたり "}<strong>{"5"}</strong>{" 個"}</td>

</tr>

<tr>

<td>{"強い整合性の読み取り"}</td>

<td><strong>{"不可"}</strong>{"（結果整合性のみ）"}</td>

<td><strong>{"可能"}</strong></td>

</tr>

<tr>

<td>{"キャパシティ"}</td>

<td><strong>{"独自のスループット"}</strong>{"（プロビジョニング済みの場合、別に設定）"}</td>

<td><strong>{"テーブルのスループットを共有"}</strong></td>

</tr>

<tr>

<td>{"10 GB 制限"}</td>

<td>{"なし"}</td>

<td><strong>{"PK ごとのアイテムコレクションが 10 GB まで"}</strong></td>

</tr>

</tbody>

</table>
</div>
{" "}
<blockquote>{" "}<p>{"覚え方: "}<strong>{"GSI = Global = 「どこでも」（別の PK、いつでも作れる、独立した容量）"}</strong>{"。"}<strong>{"LSI = Local = 「同じ PK の中だけ」（作成時のみ、容量共有、強い整合性 OK）"}</strong>{"。"}</p>{" "}</blockquote>
{" "}
<h4>{"インデックスの射影（Projection）"}</h4>
{" "}
<p>{"インデックスに"}<strong>{"どの属性を複製するか"}</strong>{"を選びます。"}</p>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 85">
<table>

<thead>

<tr>

<th scope="col">{"射影"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><code>{"KEYS_ONLY"}</code></td>

<td>{"テーブルとインデックスのキーのみ"}</td>

</tr>

<tr>

<td><code>{"INCLUDE"}</code></td>

<td>{"キー + 指定した属性"}</td>

</tr>

<tr>

<td><code>{"ALL"}</code></td>

<td>{"すべての属性"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<blockquote>{" "}<p>{"射影されていない属性を Query で要求すると、"}<strong>{"テーブルから取得（フェッチ）"}</strong>{"するため、"}<strong>{"GSI では不可・LSI では追加コストが発生"}</strong>{"します。"}<strong>{"よく使う属性は射影する"}</strong>{"のが基本です。射影が多いほどストレージと書き込みコストが増えるため、バランスを取ります。"}</p>{" "}</blockquote>
{" "}
<h4>{"キャパシティの単位と計算"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 86">
<table>

<thead>

<tr>

<th scope="col">{"単位"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"RCU（読み取り容量ユニット）"}</strong></td>

<td><strong>{"4 KB まで"}</strong>{"の読み取り "}<strong>{"1 回（強い整合性）= 1 RCU"}</strong>{"。結果整合性は "}<strong>{"0.5 RCU"}</strong>{"。トランザクションは "}<strong>{"2 RCU"}</strong></td>

</tr>

<tr>

<td><strong>{"WCU（書き込み容量ユニット）"}</strong></td>

<td><strong>{"1 KB まで"}</strong>{"の書き込み "}<strong>{"1 回 = 1 WCU"}</strong>{"。トランザクションは "}<strong>{"2 WCU"}</strong></td>

</tr>

</tbody>

</table>
</div>
{" "}
<p>{"計算の例（切り上げで計算）です。"}</p>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 87">
<table>

<thead>

<tr>

<th scope="col">{"例"}</th>

<th scope="col">{"計算"}</th>

<th scope="col">{"結果"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"6 KB のアイテムを、強い整合性で 1 秒に 10 回読む"}</td>

<td>{"6 KB → 4 KB 単位で切り上げて "}<strong>{"2"}</strong>{" 単位 × 10"}</td>

<td><strong>{"20 RCU"}</strong></td>

</tr>

<tr>

<td>{"同じ読み取りを、結果整合性で"}</td>

<td>{"20 RCU × 0.5"}</td>

<td><strong>{"10 RCU"}</strong></td>

</tr>

<tr>

<td>{"2.5 KB のアイテムを、1 秒に 5 回書く"}</td>

<td>{"2.5 KB → 1 KB 単位で切り上げて "}<strong>{"3"}</strong>{" × 5"}</td>

<td><strong>{"15 WCU"}</strong></td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"キャパシティモード"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 88">
<table>

<thead>

<tr>

<th scope="col">{"モード"}</th>

<th scope="col">{"内容"}</th>

<th scope="col">{"向く場面"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"オンデマンド"}</strong></td>

<td>{"リクエスト数に応じて課金。容量の事前設定が不要"}</td>

<td>{"予測できない / 急に変動するトラフィック、新規ワークロード"}</td>

</tr>

<tr>

<td><strong>{"プロビジョニング済み"}</strong></td>

<td>{"RCU / WCU を指定。"}<strong>{"Auto Scaling"}</strong>{" で自動調整できる"}</td>

<td>{"予測可能で安定したトラフィック（費用を最適化しやすい）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p>{"超過すると "}<code>{"ProvisionedThroughputExceededException"}</code>{"（HTTP 400）になるため、SDK の"}<strong>{"指数バックオフ再試行"}</strong>{"で対処します。"}</p>
{" "}
<h4>{"主な制限（暗記項目）"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 89">
<table>

<thead>

<tr>

<th scope="col">{"項目"}</th>

<th scope="col">{"値"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"アイテムの最大サイズ"}</td>

<td><strong>{"400 KB"}</strong>{"（属性名・値を含む）"}</td>

</tr>

<tr>

<td>{"Query / Scan の 1 回の読み取り"}</td>

<td><strong>{"最大 1 MB"}</strong></td>

</tr>

<tr>

<td><code>{"BatchGetItem"}</code></td>

<td>{"最大 "}<strong>{"100 件 / 16 MB"}</strong></td>

</tr>

<tr>

<td><code>{"BatchWriteItem"}</code></td>

<td>{"最大 "}<strong>{"25 件 / 16 MB"}</strong>{"（Put / Delete のみ。"}<strong>{"Update 不可"}</strong>{"）"}</td>

</tr>

<tr>

<td><code>{"TransactWriteItems"}</code>{" / "}<code>{"TransactGetItems"}</code></td>

<td>{"最大 "}<strong>{"100 アイテム"}</strong></td>

</tr>

<tr>

<td>{"結果整合性の通常の反映"}</td>

<td>{"通常 1 秒以内"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"書き込みの便利な機能"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 90">
<table>

<thead>

<tr>

<th scope="col">{"機能"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"条件付き書き込み"}</strong></td>

<td><code>{"ConditionExpression"}</code>{" を満たすときだけ書く（"}<code>{"attribute_not_exists(pk)"}</code>{" で二重登録を防止）。失敗時は "}<code>{"ConditionalCheckFailedException"}</code></td>

</tr>

<tr>

<td><strong>{"アトミックカウンター"}</strong></td>

<td><code>{"UpdateItem"}</code>{" の "}<code>{"SET #n = #n + :inc"}</code>{" で、競合なく加算"}</td>

</tr>

<tr>

<td><strong>{"楽観的ロック"}</strong></td>

<td><code>{"version"}</code>{" 属性を持たせ、"}<code>{"version = :expected"}</code>{" を条件にして更新"}</td>

</tr>

<tr>

<td><strong>{"トランザクション"}</strong></td>

<td><code>{"TransactWriteItems"}</code>{" で複数アイテム・複数テーブルをまとめて ACID 更新"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3 className="h-bp">{"ベストプラクティス"}</h3>
{" "}
<ul>
{" "}
<li><strong>{"アクセスパターンを先に洗い出し"}</strong>{"、それに合わせてキーとインデックスを設計する"}</li>
{" "}
<li>{"キーは"}<strong>{"高カーディナリティ"}</strong>{"にする（Skill 1.3.1）"}</li>
{" "}
<li><strong>{"GSI を使って別の検索軸"}</strong>{"を提供する。"}<strong>{"LSI は作成時にしか作れない"}</strong>{"ため慎重に判断する"}</li>
{" "}
<li><strong>{"射影は必要な属性に絞る"}</strong></li>
{" "}
<li>{"不安定な負荷には"}<strong>{"オンデマンド"}</strong>{"、安定した負荷には"}<strong>{"プロビジョニング済み + Auto Scaling"}</strong></li>
{" "}
<li><strong>{"アイテムは小さく保つ"}</strong>{"（400 KB 上限、大きなデータは S3 に置き、"}<strong>{"キーだけを DynamoDB に保存"}</strong>{"）"}</li>
{" "}
</ul>
{" "}
<h3 className="h-exam">{"試験での狙われ方"}</h3>
{" "}
<ul>
{" "}
<li>{"「別の属性で検索したい（テーブル作成後）」→ "}<strong>{"GSI"}</strong></li>
{" "}
<li>{"「同じ PK で別のソートキー + 強い整合性が必要」→ "}<strong>{"LSI（ただし作成時のみ）"}</strong></li>
{" "}
<li>{"「RCU / WCU の計算」→ "}<strong>{"4 KB / 1 KB の単位で切り上げ"}</strong></li>
{" "}
<li>{"「アイテムが 400 KB を超える」→ "}<strong>{"S3 に保存し、DynamoDB には参照を保存"}</strong></li>
{" "}
<li>{"「予測できないトラフィック」→ "}<strong>{"オンデマンド"}</strong></li>
{" "}
<li>{"「二重登録を防ぎたい」→ "}<strong><code>{"attribute_not_exists"}</code>{" による条件付き書き込み"}</strong></li>
{" "}
</ul>
{" "}
</section>);}
