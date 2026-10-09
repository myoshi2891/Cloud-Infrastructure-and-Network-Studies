import { Diagram } from '../Diagram';
/** Skill 1.1.1 アーキテクチャパターンを全量保持する。 */
export function Sk111(){return (<section className="section" id="sk-1-1-1" tabIndex={-1}>
<h2>{"Skill 1.1.1 アーキテクチャパターン"}</h2>
{" "}
<blockquote>{" "}<p>{"公式のスキル文: アーキテクチャパターン（イベント駆動、マイクロサービス、モノリシック、コレオグラフィ、オーケストレーション、ファンアウトなど）を説明する"}</p>{" "}</blockquote>
{" "}
<h3 className="h-one">{"ひとことで言うと"}</h3>
{" "}
<p>{"「アプリをどういう"}<strong>{"形"}</strong>{"で組み立てるか」の代表的な型を知るスキルです。型ごとに「得意なこと」と「つらいこと」があり、試験では"}<strong>{"状況から正しい型を選ぶ"}</strong>{"問題が出ます。"}</p>
{" "}
<h3 className="h-detail">{"詳しい説明"}</h3>
{" "}
<h4>{"モノリシックとマイクロサービス"}</h4>
{" "}
<ul>
{" "}
<li><strong>{"モノリシック"}</strong>{": 全機能が 1 つのアプリ・1 つのデプロイ単位に入っている形。小さく始めるには単純で速い一方、規模が大きくなると変更の影響範囲が広がり、部分的なスケールもできません。"}</li>
{" "}
<li><strong>{"マイクロサービス"}</strong>{": 機能を小さな独立したサービスに分け、各サービスを個別にデプロイ・スケールする形。チームが独立して動けますが、サービス間通信・監視・データ整合性の難しさが増えます。"}</li>
{" "}
</ul>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 4">
<table>

<thead>

<tr>

<th scope="col">{"観点"}</th>

<th scope="col">{"モノリシック"}</th>

<th scope="col">{"マイクロサービス"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"デプロイ"}</td>

<td>{"全体を 1 回で"}</td>

<td>{"サービスごとに個別"}</td>

</tr>

<tr>

<td>{"スケール"}</td>

<td>{"全体を丸ごと"}</td>

<td>{"必要なサービスだけ"}</td>

</tr>

<tr>

<td>{"障害の影響"}</td>

<td>{"全体に波及しやすい"}</td>

<td>{"局所化しやすい"}</td>

</tr>

<tr>

<td>{"複雑さ"}</td>

<td>{"コードは 1 か所で単純"}</td>

<td>{"通信・監視・分散トレースが必要"}</td>

</tr>

<tr>

<td>{"向く場面"}</td>

<td>{"小規模・初期の開発"}</td>

<td>{"大規模・複数チーム"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"イベント駆動（Event-driven）"}</h4>
{" "}
<p>{"「何かが起きた（イベント）」ことをきっかけに処理が動く形です。送り手（プロデューサー）は受け手（コンシューマー）を知らなくてよい、というのが核心です。例: S3 にファイルが置かれたら Lambda が起動する、注文が確定したらイベントを発行して在庫・配送・メールの各サービスが反応する、など。"}</p>
{" "}
<h4>{"コレオグラフィとオーケストレーション"}</h4>
{" "}
<p>{"複数サービスが連携して 1 つの業務を完了させるときの、"}<strong>{"指揮の取り方"}</strong>{"の違いです。"}</p>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 5">
<table>

<thead>

<tr>

<th scope="col">{"観点"}</th>

<th scope="col">{"コレオグラフィ（振付）"}</th>

<th scope="col">{"オーケストレーション（指揮）"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"制御"}</td>

<td>{"中央の司令塔なし。各サービスがイベントに反応"}</td>

<td>{"中央のオーケストレーターが順序を制御"}</td>

</tr>

<tr>

<td>{"代表サービス"}</td>

<td>{"Amazon EventBridge、Amazon SNS、Amazon SQS"}</td>

<td>{"AWS Step Functions"}</td>

</tr>

<tr>

<td>{"長所"}</td>

<td>{"疎結合・拡張しやすい"}</td>

<td>{"流れが見やすく、エラー処理・リトライを集中管理"}</td>

</tr>

<tr>

<td>{"短所"}</td>

<td>{"全体の流れが追いにくい"}</td>

<td>{"オーケストレーターが依存先になる"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<figure className="diagram-card"><Diagram id="d02" label="Skill 1.1.1 アーキテクチャパターンの図解 d02" /></figure>
{" "}
<h4>{"ファンアウト（Fan-out）"}</h4>
{" "}
<p><strong>{"1 つのメッセージを、複数の宛先へ同時に配る"}</strong>{"パターンです。AWS の定番は "}<strong>{"SNS トピック → 複数の SQS キュー"}</strong>{"（SNS + SQS ファンアウト）です。各キューが独立してメッセージを受け取るので、片方の処理が遅くても他方に影響しません。"}</p>
{" "}
<figure className="diagram-card"><Diagram id="d03" label="Skill 1.1.1 アーキテクチャパターンの図解 d03" /></figure>
{" "}
<h3 className="h-bp">{"ベストプラクティス"}</h3>
{" "}
<ul>
{" "}
<li>{"最初は単純な構成から始め、必要になったら分割する（最初から過剰にマイクロサービス化しない）"}</li>
{" "}
<li>{"サービス間は"}<strong>{"直接呼び出しよりイベント・メッセージ"}</strong>{"でつなぎ、疎結合を保つ"}</li>
{" "}
<li>{"ステップ数・分岐・リトライ・人手承認がある業務フローは "}<strong>{"Step Functions"}</strong>{" で見える化する"}</li>
{" "}
<li>{"「1 対多」の配信は "}<strong>{"SNS + SQS"}</strong>{" か "}<strong>{"EventBridge"}</strong>{" を使い、各コンシューマーを独立させる"}</li>
{" "}
</ul>
{" "}
<h3 className="h-exam">{"試験での狙われ方"}</h3>
{" "}
<ul>
{" "}
<li>{"「1 つのイベントを複数のシステムが独立して処理したい」→ "}<strong>{"ファンアウト（SNS + SQS / EventBridge）"}</strong></li>
{" "}
<li>{"「複数ステップの順序・リトライ・分岐を一元管理したい」→ "}<strong>{"オーケストレーション（Step Functions）"}</strong></li>
{" "}
<li>{"「サービス同士が互いを知らずに連携したい」→ "}<strong>{"イベント駆動・コレオグラフィ"}</strong></li>
{" "}
</ul>
{" "}
</section>);}
