import { Diagram } from '../Diagram';
/** Skill 1.3.9 アクセスパターンに応じた専用データストアを全量保持する。 */
export function Sk139(){return (<section className="section" id="sk-1-3-9" tabIndex={-1}>
<h2>{"Skill 1.3.9 アクセスパターンに応じた専用データストア"}</h2>
{" "}
<blockquote>{" "}<p>{"公式のスキル文: アクセスパターンに基づいて専用のデータストアを使用する（例: Amazon OpenSearch Service）"}</p>{" "}</blockquote>
{" "}
<h3 className="h-one">{"ひとことで言うと"}</h3>
{" "}
<p><strong>{"1 つのデータベースで全部をやろうとしない"}</strong>{"。検索・分析・グラフなど、"}<strong>{"アクセスパターンごとに得意な専用ストア"}</strong>{"を組み合わせるスキルです（ポリグロット永続化）。"}</p>
{" "}
<h3 className="h-detail">{"詳しい説明"}</h3>
{" "}
<h4>{"Amazon OpenSearch Service"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 107">
<table>

<thead>

<tr>

<th scope="col">{"項目"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"役割"}</td>

<td><strong>{"全文検索"}</strong>{"、"}<strong>{"ログ・メトリクスの分析"}</strong>{"、"}<strong>{"ベクトル検索"}</strong>{"（類似検索）、リアルタイムのダッシュボード（OpenSearch Dashboards）"}</td>

</tr>

<tr>

<td>{"仕組み"}</td>

<td>{"データを "}<strong>{"JSON ドキュメント"}</strong>{"として"}<strong>{"インデックス"}</strong>{"に保存し、"}<strong>{"転置インデックス"}</strong>{"で高速に検索"}</td>

</tr>

<tr>

<td>{"得意なこと"}</td>

<td>{"部分一致、あいまい検索、"}<strong>{"関連度（スコア）順"}</strong>{"、集計（アグリゲーション）、ファセット"}</td>

</tr>

<tr>

<td>{"不得意なこと"}</td>

<td><strong>{"正確性が重要なトランザクション処理"}</strong>{"（主データストアにしない）、頻繁なリレーショナル結合"}</td>

</tr>

<tr>

<td>{"提供形態"}</td>

<td><strong>{"マネージドクラスター"}</strong>{"と "}<strong>{"OpenSearch Serverless"}</strong></td>

</tr>

</tbody>

</table>
</div>
{" "}
<p>{"DynamoDB は"}<strong>{"キーを指定した検索"}</strong>{"は得意ですが、「"}<strong>{"商品名に『赤い靴』を含み、価格が 5,000 円以下、関連度順"}</strong>{"」のような検索は苦手です。この場合、"}<strong>{"DynamoDB が正のデータ、OpenSearch が検索用の複製"}</strong>{"という分担にします。"}</p>
{" "}
<figure className="diagram-card"><Diagram id="d31" label="Skill 1.3.9 アクセスパターンに応じた専用データストアの図解 d31" /></figure>
{" "}
<p>{"DynamoDB から OpenSearch へ同期する方法として、"}<strong>{"Streams + Lambda"}</strong>{"のほか、"}<strong>{"Amazon OpenSearch Ingestion"}</strong>{" や "}<strong>{"DynamoDB の zero-ETL 連携"}</strong>{"も用意されています。"}</p>
{" "}
<h4>{"専用データストアの早見表"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 108">
<table>

<thead>

<tr>

<th scope="col">{"アクセスパターン"}</th>

<th scope="col">{"サービス"}</th>

<th scope="col">{"備考"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"キー・バリュー / ドキュメント、低レイテンシー・大規模"}</td>

<td>{"DynamoDB"}</td>

<td>{"—"}</td>

</tr>

<tr>

<td>{"SQL・JOIN・トランザクション"}</td>

<td>{"RDS / Aurora"}</td>

<td>{"—"}</td>

</tr>

<tr>

<td><strong>{"全文検索・ログ分析・ベクトル検索"}</strong></td>

<td><strong>{"OpenSearch Service"}</strong></td>

<td>{"—"}</td>

</tr>

<tr>

<td>{"関係の探索（ソーシャルグラフ、不正検知）"}</td>

<td>{"Amazon Neptune"}</td>

<td>{"グラフ"}</td>

</tr>

<tr>

<td><strong>{"時系列"}</strong>{"（IoT、メトリクス）"}</td>

<td>{"Amazon Timestream"}</td>

<td>{"時系列"}</td>

</tr>

<tr>

<td>{"MongoDB 互換のドキュメント"}</td>

<td>{"Amazon DocumentDB"}</td>

<td>{"—"}</td>

</tr>

<tr>

<td>{"大規模な分析（BI、ウェアハウス）"}</td>

<td>{"Amazon Redshift"}</td>

<td><strong>{"列指向"}</strong></td>

</tr>

<tr>

<td>{"S3 上のデータを SQL で分析"}</td>

<td>{"Amazon Athena"}</td>

<td>{"サーバーレス"}</td>

</tr>

<tr>

<td>{"台帳（不変・検証可能な履歴）"}</td>

<td>{"Amazon QLDB 系の用途"}</td>

<td>{"新規利用は他サービスを検討"}</td>

</tr>

<tr>

<td>{"インメモリ（超低レイテンシー）"}</td>

<td>{"ElastiCache / MemoryDB"}</td>

<td>{"MemoryDB は"}<strong>{"耐久性のあるインメモリ DB"}</strong></td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3 className="h-bp">{"ベストプラクティス"}</h3>
{" "}
<ul>
{" "}
<li><strong>{"まずアクセスパターンを洗い出し"}</strong>{"、それに合うストアを選ぶ"}</li>
{" "}
<li><strong>{"主データ（正）は 1 か所"}</strong>{"に置き、検索用などの"}<strong>{"派生データは非同期に同期"}</strong>{"する（OpenSearch は主データストアにしない）"}</li>
{" "}
<li>{"同期は"}<strong>{"冪等"}</strong>{"にし、"}<strong>{"再同期（再インデックス）の手段"}</strong>{"を用意する"}</li>
{" "}
<li>{"専用ストアを増やすと"}<strong>{"運用・整合性の負担が増える"}</strong>{"ため、"}<strong>{"必要な場合だけ"}</strong>{"追加する"}</li>
{" "}
</ul>
{" "}
<h3 className="h-exam">{"試験での狙われ方"}</h3>
{" "}
<ul>
{" "}
<li>{"「商品の"}<strong>{"全文検索"}</strong>{"・あいまい検索・関連度順」→ "}<strong>{"OpenSearch Service"}</strong></li>
{" "}
<li>{"「ログを収集して検索・可視化」→ "}<strong>{"OpenSearch（+ Firehose / Logs のサブスクリプション）"}</strong></li>
{" "}
<li>{"「DynamoDB のデータを全文検索したい」→ "}<strong>{"Streams + Lambda（または OpenSearch Ingestion）で OpenSearch へ同期"}</strong></li>
{" "}
<li>{"「関係性（友人の友人）の探索」→ "}<strong>{"Neptune"}</strong></li>
{" "}
</ul>
{" "}
</section>);}
