import { Diagram } from '../Diagram';
/** Skill 1.2.5 Lambda と AWS サービスの統合を全量保持する。 */
export function Sk125(){return (<section className="section" id="sk-1-2-5" tabIndex={-1}>
<h2>{"Skill 1.2.5 Lambda と AWS サービスの統合"}</h2>
{" "}
<blockquote>{" "}<p>{"公式のスキル文: Lambda 関数を AWS サービスと統合する"}</p>{" "}</blockquote>
{" "}
<h3 className="h-one">{"ひとことで言うと"}</h3>
{" "}
<p>{"Lambda を"}<strong>{"「起動される側（トリガー）」"}</strong>{"と"}<strong>{"「呼び出す側」"}</strong>{"の両面から、各サービスにつなぐスキルです。ここで押さえるのは、"}<strong>{"呼び出し方式（同期 / 非同期 / ポーリング）"}</strong>{"と"}<strong>{"権限の向き"}</strong>{"です。"}</p>
{" "}
<h3 className="h-detail">{"詳しい説明"}</h3>
{" "}
<h4>{"トリガーごとの呼び出し方式"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 66">
<table>

<thead>

<tr>

<th scope="col">{"トリガー"}</th>

<th scope="col">{"方式"}</th>

<th scope="col">{"補足"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"API Gateway / ALB / 関数 URL"}</td>

<td><strong>{"同期"}</strong></td>

<td>{"結果を返す。API Gateway の統合タイムアウトは 29 秒（既定）"}</td>

</tr>

<tr>

<td>{"Amazon S3"}</td>

<td><strong>{"非同期"}</strong></td>

<td>{"オブジェクトの作成・削除などのイベント通知"}</td>

</tr>

<tr>

<td>{"Amazon SNS"}</td>

<td><strong>{"非同期"}</strong></td>

<td>{"トピックの購読として"}</td>

</tr>

<tr>

<td>{"Amazon EventBridge"}</td>

<td><strong>{"非同期"}</strong></td>

<td>{"ルール / スケジュール"}</td>

</tr>

<tr>

<td>{"Amazon SQS"}</td>

<td><strong>{"ポーリング（イベントソースマッピング）"}</strong></td>

<td>{"Lambda サービスがキューを取得"}</td>

</tr>

<tr>

<td>{"Kinesis Data Streams / DynamoDB Streams"}</td>

<td><strong>{"ポーリング（イベントソースマッピング）"}</strong></td>

<td>{"シャードごとに取得"}</td>

</tr>

<tr>

<td>{"Amazon MSK / Amazon MQ / セルフマネージド Kafka"}</td>

<td><strong>{"ポーリング"}</strong></td>

<td>{"—"}</td>

</tr>

<tr>

<td>{"AWS Step Functions"}</td>

<td>{"同期 / 非同期"}</td>

<td>{"ワークフローのタスクとして"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<blockquote>{" "}<p><strong>{"イベントソースマッピング"}</strong>{"は、Lambda サービス側がソースを読み取って関数を呼び出す仕組みです。"}<strong>{"ソース側が関数を呼ぶのではありません"}</strong>{"。この違いが、権限の向きに関わります。"}</p>{" "}</blockquote>
{" "}
<h4>{"権限の 2 つの向き（重要）"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 67">
<table>

<thead>

<tr>

<th scope="col">{"向き"}</th>

<th scope="col">{"使う権限"}</th>

<th scope="col">{"例"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"他のサービスが Lambda を呼ぶ"}</strong></td>

<td>{"Lambda の"}<strong>{"リソースベースポリシー"}</strong>{"（"}<code>{"lambda:InvokeFunction"}</code>{" を許可）"}</td>

<td>{"S3 / SNS / EventBridge / API Gateway から呼ばれる"}</td>

</tr>

<tr>

<td><strong>{"Lambda が他のサービスを呼ぶ"}</strong></td>

<td>{"Lambda の"}<strong>{"実行ロール"}</strong>{"（IAM ロール）"}</td>

<td>{"Lambda から DynamoDB に書く、SQS に送信する"}</td>

</tr>

<tr>

<td><strong>{"Lambda がポーリングして読む"}</strong></td>

<td><strong>{"実行ロール"}</strong>{"（例: "}<code>{"sqs:ReceiveMessage"}</code>{"、"}<code>{"kinesis:GetRecords"}</code>{" など）"}</td>

<td>{"SQS / Kinesis のイベントソースマッピング"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<figure className="diagram-card"><Diagram id="d21" label="Skill 1.2.5 Lambda と AWS サービスの統合の図解 d21" /></figure>
{" "}
<h4>{"関数 URL"}</h4>
{" "}
<p>{"関数に"}<strong>{"専用の HTTPS エンドポイント"}</strong>{"を付ける機能です。認証タイプは "}<strong><code>{"AWS_IAM"}</code></strong>{"（SigV4）または "}<strong><code>{"NONE"}</code></strong>{"（公開）。API Gateway なしで、手軽に Webhook などを受けられます。応答の"}<strong>{"ストリーミング"}</strong>{"（"}<code>{"RESPONSE_STREAM"}</code>{"）も使えます。"}</p>
{" "}
<h4>{"ALB から Lambda を呼ぶ"}</h4>
{" "}
<p>{"ALB のターゲットグループに Lambda を指定できます。ALB は"}<strong>{"同期で呼び出し"}</strong>{"、Lambda は ALB 用の形式（"}<code>{"statusCode"}</code>{"、"}<code>{"headers"}</code>{"、"}<code>{"body"}</code>{" など）で応答します。"}</p>
{" "}
<h4>{"Step Functions との統合"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 68">
<table>

<thead>

<tr>

<th scope="col">{"項目"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"Standard ワークフロー"}</strong></td>

<td>{"最長 "}<strong>{"1 年"}</strong>{"実行可能、"}<strong>{"正確に 1 回"}</strong>{"のワークフロー実行、実行履歴を保持"}</td>

</tr>

<tr>

<td><strong>{"Express ワークフロー"}</strong></td>

<td>{"最長 "}<strong>{"5 分"}</strong>{"、"}<strong>{"高スループット"}</strong>{"、"}<strong>{"少なくとも 1 回"}</strong>{"（非同期）/ 最大 1 回（同期）、短時間で大量のイベント処理"}</td>

</tr>

<tr>

<td>{"長時間の処理"}</td>

<td><strong>{"Lambda の 15 分制限を超える処理は Step Functions で分割・制御"}</strong></td>

</tr>

<tr>

<td>{"並列処理"}</td>

<td><code>{"Parallel"}</code>{"（異なる処理を並列）、"}<code>{"Map"}</code>{"（配列の各要素を並列処理。"}<code>{"Distributed Map"}</code>{" で大規模並列）"}</td>

</tr>

<tr>

<td><strong>{"コールバック（"}<code>{".waitForTaskToken"}</code>{"）"}</strong></td>

<td>{"外部の処理や人の承認を"}<strong>{"待ってから"}</strong>{"再開"}</td>

</tr>

<tr>

<td>{"エラー処理"}</td>

<td><code>{"Retry"}</code>{" と "}<code>{"Catch"}</code>{"（Skill 1.1.13）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3 className="h-bp">{"ベストプラクティス"}</h3>
{" "}
<ul>
{" "}
<li><strong>{"最小権限"}</strong>{": 実行ロールには必要なアクション・リソースだけを許可する"}</li>
{" "}
<li>{"呼び出し元ごとに"}<strong>{"リソースベースポリシー"}</strong>{"を絞る（"}<code>{"SourceArn"}</code>{" / "}<code>{"SourceAccount"}</code>{" 条件を付けて、"}<strong>{"混乱した代理（confused deputy）問題"}</strong>{"を防ぐ）"}</li>
{" "}
<li><strong>{"同期の長い処理は避け"}</strong>{"、非同期 / SQS / Step Functions に置き換える"}</li>
{" "}
<li>{"複数のステップを持つ業務は、Lambda の中で連鎖させず "}<strong>{"Step Functions で管理"}</strong>{"する"}</li>
{" "}
</ul>
{" "}
<h3 className="h-exam">{"試験での狙われ方"}</h3>
{" "}
<ul>
{" "}
<li>{"「S3 から Lambda を起動したいが "}<code>{"AccessDenied"}</code>{"」→ "}<strong>{"Lambda のリソースベースポリシー"}</strong>{"（S3 に "}<code>{"lambda:InvokeFunction"}</code>{" を許可）"}</li>
{" "}
<li>{"「Lambda から DynamoDB に書けない」→ "}<strong>{"実行ロールに "}<code>{"dynamodb:PutItem"}</code>{" が無い"}</strong></li>
{" "}
<li>{"「15 分を超える複数ステップの処理を管理したい」→ "}<strong>{"Step Functions"}</strong></li>
{" "}
<li>{"「人の承認を待ってから処理を再開」→ "}<strong>{"Step Functions のコールバックパターン（タスクトークン）"}</strong></li>
{" "}
</ul>
{" "}
</section>);}
