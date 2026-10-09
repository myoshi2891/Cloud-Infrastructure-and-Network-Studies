import { Diagram } from '../Diagram';
/** 0. はじめに（このガイドの使い方）を全量保持する。 */
export function Sec0(){return (<section className="section" id="sec-0" tabIndex={-1}>
<h2>{"0. はじめに（このガイドの使い方）"}</h2>
{" "}
<h3>{"0.1 この Domain 1 は何を問われるのか"}</h3>
{" "}
<p>{"Domain 1 は DVA-C02 で"}<strong>{"最も配点が大きい分野（32%）"}</strong>{"です。試験の 50 問（スコア対象）のうち、およそ 16 問前後がここから出る計算になります。内容は大きく 3 つの Task に分かれます。"}</p>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 1">
<table>

<thead>

<tr>

<th scope="col">{"Task"}</th>

<th scope="col">{"テーマ"}</th>

<th scope="col">{"スキル数"}</th>

<th scope="col">{"一言でいうと"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"Task 1"}</td>

<td>{"AWS 上でホストされるアプリのコードを開発する"}</td>

<td>{"13"}</td>

<td>{"設計の考え方（疎結合・非同期・耐障害性）と、SDK・API・メッセージング・イベント駆動の使い方"}</td>

</tr>

<tr>

<td>{"Task 2"}</td>

<td>{"AWS Lambda のコードを開発する"}</td>

<td>{"7"}</td>

<td>{"Lambda の設定・エラー処理・テスト・チューニング"}</td>

</tr>

<tr>

<td>{"Task 3"}</td>

<td>{"アプリ開発でデータストアを使う"}</td>

<td>{"9"}</td>

<td>{"DynamoDB を中心にしたデータ設計、キャッシュ、検索サービス"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p>{"試験ガイドには「アーキテクチャそのものの設計（分散システム、マイクロサービス、DB スキーマ設計など）」は"}<strong>{"対象外"}</strong>{"と書かれています。つまり、「大きな設計を自分で作る」ことより、"}<strong>{"「パターンの違いを説明でき、コードで正しく使える」"}</strong>{"ことが問われます。"}</p>
{" "}
<h3>{"0.2 試験の基本情報（公式 試験ガイドより）"}</h3>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 2">
<table>

<thead>

<tr>

<th scope="col">{"項目"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"問題数"}</td>

<td>{"スコア対象 50 問 + 採点されない問題 15 問（どれが採点対象外かは分からない）"}</td>

</tr>

<tr>

<td>{"試験時間"}</td>

<td>{"130 分"}</td>

</tr>

<tr>

<td>{"問題形式"}</td>

<td>{"択一（正解 1・誤答 3）と複数選択（5 択以上から 2 つ以上を選ぶ）"}</td>

</tr>

<tr>

<td>{"合否"}</td>

<td>{"100〜1,000 の換算スコアで、合格点は 720"}</td>

</tr>

<tr>

<td>{"採点方式"}</td>

<td>{"補償型（分野ごとの合格ラインはなく、全体で合格すればよい）"}</td>

</tr>

<tr>

<td>{"推奨経験"}</td>

<td>{"AWS サービスを使ったアプリ開発・保守の実務経験 1 年以上"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"0.3 このガイドの読み進め方"}</h3>
{" "}
<p>{"各スキルは、次の同じ型で説明します。迷ったら「試験での狙われ方」と「ベストプラクティス」だけ先に読んでも構いません。"}</p>
{" "}
<ol>
{" "}
<li><strong>{"ひとことで言うと"}</strong>{"（イメージをつかむ）"}</li>
{" "}
<li><strong>{"詳しい説明"}</strong>{"（用語・仕組み・図表）"}</li>
{" "}
<li><strong>{"ベストプラクティス"}</strong>{"（実務でも試験でも正解になりやすい考え方）"}</li>
{" "}
<li><strong>{"試験での狙われ方"}</strong>{"（ひっかけや判断基準）"}</li>
{" "}
</ol>
{" "}
<figure className="diagram-card"><Diagram id="d01" label="0. はじめに（このガイドの使い方）の図解 d01" /></figure>
{" "}
<h3>{"0.4 Domain 1 に登場する主なサービス一覧"}</h3>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 3">
<table>

<thead>

<tr>

<th scope="col">{"分類"}</th>

<th scope="col">{"サービス"}</th>

<th scope="col">{"主な役割"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"コンピュート"}</td>

<td>{"AWS Lambda"}</td>

<td>{"サーバー管理なしでコードを実行"}</td>

</tr>

<tr>

<td>{"API"}</td>

<td>{"Amazon API Gateway"}</td>

<td>{"REST / HTTP / WebSocket の API を公開"}</td>

</tr>

<tr>

<td>{"メッセージング"}</td>

<td>{"Amazon SQS / Amazon SNS"}</td>

<td>{"キュー、Pub/Sub 通知"}</td>

</tr>

<tr>

<td>{"イベント"}</td>

<td>{"Amazon EventBridge"}</td>

<td>{"イベントバス、ルール、スケジューラ、Pipes"}</td>

</tr>

<tr>

<td>{"ワークフロー"}</td>

<td>{"AWS Step Functions"}</td>

<td>{"複数ステップのオーケストレーション"}</td>

</tr>

<tr>

<td>{"ストリーミング"}</td>

<td>{"Amazon Kinesis Data Streams / Data Firehose"}</td>

<td>{"ストリームの取り込み・配信"}</td>

</tr>

<tr>

<td>{"データストア"}</td>

<td>{"Amazon DynamoDB / Amazon RDS / Amazon Aurora / Amazon S3"}</td>

<td>{"NoSQL・リレーショナル・オブジェクト"}</td>

</tr>

<tr>

<td>{"キャッシュ"}</td>

<td>{"Amazon ElastiCache / Amazon DynamoDB Accelerator (DAX)"}</td>

<td>{"読み取りの高速化"}</td>

</tr>

<tr>

<td>{"検索"}</td>

<td>{"Amazon OpenSearch Service"}</td>

<td>{"全文検索・ログ分析"}</td>

</tr>

<tr>

<td>{"開発支援"}</td>

<td>{"AWS SDK / AWS CLI / AWS SAM / Amazon Q Developer"}</td>

<td>{"コード・テスト・ローカル実行"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
</section>);}
