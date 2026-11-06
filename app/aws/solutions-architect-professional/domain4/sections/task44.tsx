import { Diagram } from '../Diagram';
/** 原本のtask44本文。 */
export default function Content() { return <>
<h2 id={"5-task-44-モダナイゼーションと機能強化の機会の特定"} tabIndex={-1}>
{"\n                    5. Task 4.4 モダナイゼーションと機能強化の機会の特定\n                "}
</h2>
{"\n                "}
<p>
{"\n                    移行後\n                    (または移行と同時に)、"}
<strong>
{"クラウドの強みを活かす作り変え"}
</strong>
{"を検討します。キーワードは次の\n                    4 つです。\n                "}
</p>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 30：5. Task 4.4 モダナイゼーションと機能強化の機会の特定"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"キーワード"}
</th>
<th scope="col">
{"意味"}
</th>
<th scope="col">
{"得られるもの"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"疎結合 (Decoupling)"}
</td>
<td>
{"部品同士を直接つながず、キューやイベントで間接的につなぐ"}
</td>
<td>
{"障害の波及を防ぐ、独立してスケール"}
</td>
</tr>
<tr className={"even"}>
<td>
{"サーバーレス"}
</td>
<td>
{"サーバー管理をなくし、使った分だけ課金"}
</td>
<td>
{"運用負荷とコストの削減"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"コンテナ"}
</td>
<td>
{"軽量で移植しやすい実行単位"}
</td>
<td>
{"開発速度、可搬性、リソース効率"}
</td>
</tr>
<tr className={"even"}>
<td>
{"専用 DB (Purpose-built)"}
</td>
<td>
{"データの性質に最適な DB を使い分け"}
</td>
<td>
{"性能向上とコスト最適化"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"51-モノリスから段階的に分解する-ストラングラーフィグパターン"} tabIndex={-1}>
{"\n                    5.1 モノリスから段階的に分解する (ストラングラーフィグパターン)\n                "}
</h3>
{"\n                "}
<p>
{"\n                    一度に作り直すのではなく、"}
<strong>
{"機能を少しずつ新しい実装に置き換え、古い部分を徐々に縮小"}
</strong>
{"する方法です。リスクを小さくできます。\n                "}
</p>
{"\n                "}
<Diagram id="diag-13" label={"5.1 モノリスから段階的に分解する (ストラングラーフィグパターン)"}/>
{"\n                "}
<ul>
{"\n                    "}
<li>
{"\n                        "}
<strong>
{"API Gateway や ALB のパスベースルーティング"}
</strong>
{"で、機能単位に振り分け先を切り替える\n                    "}
</li>
{"\n                    "}
<li>
{"新旧を並行稼働しながら、"}
<strong>
{"問題があればすぐ旧側へ戻せる"}
</strong>
</li>
{"\n                    "}
<li>
{"既存ユーザーに影響を与えずに Refactor を進められる"}
</li>
{"\n                "}
</ul>
{"\n                "}
<h3 id={"52-疎結合-アプリケーション統合サービスの使い分け"} tabIndex={-1}>
{"\n                    5.2 疎結合: アプリケーション統合サービスの使い分け\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 31：5.2 疎結合: アプリケーション統合サービスの使い分け"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"サービス"}
</th>
<th scope="col">
{"方式"}
</th>
<th scope="col">
{"特徴"}
</th>
<th scope="col">
{"使いどころ"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
<strong>
{"Amazon SQS"}
</strong>
</td>
<td>
{"キュー (プル型、1 対 1)"}
</td>
<td>
{"\n                                    標準 (ほぼ無制限、順序保証なし、少なくとも 1 回) と FIFO\n                                    (順序保証、重複排除)。DLQ、可視性タイムアウト\n                                "}
</td>
<td>
{"\n                                    処理の "}
<strong>
{"バッファリング"}
</strong>
{"、負荷の平準化、非同期処理\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
<strong>
{"Amazon SNS"}
</strong>
</td>
<td>
{"Pub/Sub (プッシュ型、1 対多)"}
</td>
<td>
{"\n                                    1 つのメッセージを複数の購読者 (SQS、Lambda、HTTP、メール等)\n                                    へ配信\n                                "}
</td>
<td>
<strong>
{"ファンアウト"}
</strong>
{" (通知の一斉配信)"}
</td>
</tr>
<tr className={"odd"}>
<td>
<strong>
{"Amazon EventBridge"}
</strong>
</td>
<td>
{"イベントバス"}
</td>
<td>
{"\n                                    ルールによるフィルタとルーティング、SaaS 連携、スケジュール、AWS\n                                    サービスのイベント受信\n                                "}
</td>
<td>
{"\n                                    "}
<strong>
{"イベント駆動アーキテクチャ"}
</strong>
{"、SaaS や AWS\n                                    イベントの連携\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
<strong>
{"AWS Step Functions"}
</strong>
</td>
<td>
{"ワークフロー"}
</td>
<td>
{"\n                                    状態遷移でステップを制御。分岐、並列、リトライ、エラー処理。Standard\n                                    と Express\n                                "}
</td>
<td>
{"\n                                    "}
<strong>
{"複数ステップの業務フロー"}
</strong>
{"のオーケストレーション\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
<strong>
{"Amazon MQ"}
</strong>
</td>
<td>
{"マネージドブローカー (ActiveMQ と RabbitMQ)"}
</td>
<td>
{"JMS、AMQP、MQTT などの標準プロトコル対応"}
</td>
<td>
{"\n                                    "}
<strong>
{"既存アプリのメッセージブローカーを、コード変更なしで移行"}
</strong>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"Kinesis Data Streams と Amazon MSK"}
</td>
<td>
{"ストリーミング"}
</td>
<td>
{"順序付きの大量ストリームをリアルタイム処理"}
</td>
<td>
{"\n                                    ログやクリックストリームなどの連続データ (Kafka 互換が必要なら\n                                    MSK)\n                                "}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<Diagram id="diag-14" label={"5.2 疎結合: アプリケーション統合サービスの使い分け"}/>
{"\n                "}
<p>
<strong>
{"定番の組み合わせ: SNS + SQS ファンアウト"}
</strong>
</p>
{"\n                "}
<Diagram id="diag-15" label={"5.2 疎結合: アプリケーション統合サービスの使い分け"}/>
{"\n                "}
<div className={"callout-practice"}>
{"\n                    "}
<div className={"icon"}>
{"✓"}
</div>
{"\n                    "}
<div className={"body"}>
{"\n                        "}
<div className={"label"}>
{"ベストプラクティス (疎結合)"}
</div>
{"\n                        "}
<ul>
{"\n                            "}
<li>
{"\n                                SQS には必ず\n                                "}
<strong>
{"デッドレターキュー (DLQ)"}
</strong>
{"\n                                を付け、失敗メッセージを隔離して調査する\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                メッセージ処理は\n                                "}
<strong>
{"冪等 (同じメッセージを複数回処理しても結果が同じ)"}
</strong>
{"\n                                に設計する (SQS 標準は少なくとも 1 回配信のため)\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                順序保証や重複排除が必須の場合のみ FIFO を選ぶ\n                                (スループットの制約があるため)\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                長い業務フローは\n                                "}
<strong>
{"Lambda の連鎖ではなく Step Functions"}
</strong>
{"\n                                で表現し、状態を可視化する\n                            "}
</li>
{"\n                        "}
</ul>
{"\n                    "}
</div>
{"\n                "}
</div>
{"\n                "}
<h3 id={"53-サーバーレス化の機会"} tabIndex={-1}>
{"5.3 サーバーレス化の機会"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 32：5.3 サーバーレス化の機会"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"機会"}
</th>
<th scope="col">
{"サービス"}
</th>
<th scope="col">
{"効果"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"定期バッチ、イベント処理"}
</td>
<td>
{"Lambda と EventBridge スケジューラ"}
</td>
<td>
{"サーバー不要、アイドル時コストなし"}
</td>
</tr>
<tr className={"even"}>
<td>
{"REST/HTTP API"}
</td>
<td>
{"API Gateway と Lambda"}
</td>
<td>
{"管理不要でスケール、認証・スロットリング機能"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"コンテナ化済みの処理"}
</td>
<td>
{"Fargate"}
</td>
<td>
{"ノード管理不要"}
</td>
</tr>
<tr className={"even"}>
<td>
{"変動の大きい RDB"}
</td>
<td>
<strong>
{"Aurora Serverless v2"}
</strong>
</td>
<td>
{"負荷に応じて自動でキャパシティを調整"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"変動の大きい NoSQL"}
</td>
<td>
{"DynamoDB オンデマンド"}
</td>
<td>
{"事前のキャパシティ設計が不要"}
</td>
</tr>
<tr className={"even"}>
<td>
{"静的サイト、ファイル配布"}
</td>
<td>
{"S3 と CloudFront"}
</td>
<td>
{"サーバー不要、高耐久・低コスト"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<p>
<strong>
{"Lambda の制約 (試験の判断材料)"}
</strong>
</p>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 33：5.3 サーバーレス化の機会"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"項目"}
</th>
<th scope="col">
{"目安"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"最大実行時間"}
</td>
<td>
{"\n                                    標準の呼び出しは 15 分。Durable Functions は最大 1 年、Lambda\n                                    Managed Instances は非同期呼び出しとイベントソースマッピング\n                                    (Amazon MQ、DocumentDB を除く) で最大 90 分\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"メモリ"}
</td>
<td>
{"128 MB 〜 10,240 MB (CPU はメモリに比例)"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"向かない処理"}
</td>
<td>
{"\n                                    15 分を超える長時間処理のうち、Durable Functions や Lambda\n                                    Managed Instances でも対応できないもの (→ Fargate や AWS\n                                    Batch)、常時接続が必要なもの\n                                "}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"54-専用-db-purpose-built-databases-の使い分け"} tabIndex={-1}>
{"\n                    5.4 専用 DB (Purpose-built databases) の使い分け\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 34：5.4 専用 DB (Purpose-built databases) の使い分け"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"データの性質・要件"}
</th>
<th scope="col">
{"選ぶサービス"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"構造化データ、複雑な JOIN とトランザクション"}
</td>
<td>
{"Aurora / RDS"}
</td>
</tr>
<tr className={"even"}>
<td>
{"キーバリュー、超低遅延、大規模スケール"}
</td>
<td>
{"DynamoDB"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"読み取りの高速化 (キャッシュ)、セッション管理"}
</td>
<td>
{"\n                                    "}
<strong>
{"ElastiCache"}
</strong>
{" (Redis OSS または Memcached 互換)\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"DynamoDB の超低遅延キャッシュ"}
</td>
<td>
{"DynamoDB Accelerator (DAX)"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"ドキュメント (MongoDB 互換)"}
</td>
<td>
{"Amazon DocumentDB"}
</td>
</tr>
<tr className={"even"}>
<td>
{"グラフ (関係性の探索)"}
</td>
<td>
{"Amazon Neptune"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"時系列 (IoT、メトリクス)"}
</td>
<td>
{"Amazon Timestream"}
</td>
</tr>
<tr className={"even"}>
<td>
{"検索・ログ分析"}
</td>
<td>
{"OpenSearch Service"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"データウェアハウス (分析)"}
</td>
<td>
{"Amazon Redshift"}
</td>
</tr>
<tr className={"even"}>
<td>
{"変動の大きなリレーショナル"}
</td>
<td>
{"Aurora Serverless v2"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<div className={"callout-practice"}>
{"\n                    "}
<div className={"icon"}>
{"✓"}
</div>
{"\n                    "}
<div className={"body"}>
{"\n                        "}
<div className={"label"}>
{"ベストプラクティス"}
</div>
{"\n                        "}
<ul>
{"\n                            "}
<li>
{"\n                                「"}
<strong>
{"1 つの DB に全部"}
</strong>
{"」ではなく、アクセスパターンごとに DB を選ぶ\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                "}
<strong>
{"キャッシュ (ElastiCache)"}
</strong>
{" を DB\n                                の前段に入れて、読み取り負荷とレイテンシを下げる\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                性能問題を「DB\n                                の大型化」だけで解決せず、"}
<strong>
{"リードレプリカ、キャッシュ、パーティション設計"}
</strong>
{"を併用する\n                            "}
</li>
{"\n                        "}
</ul>
{"\n                    "}
</div>
{"\n                "}
</div>
{"\n                "}
<h3 id={"55-task-44-のまとめ-試験の着眼点"} tabIndex={-1}>
{"5.5 Task 4.4 のまとめ (試験の着眼点)"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 35：5.5 Task 4.4 のまとめ (試験の着眼点)"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"問題文のキーワード"}
</th>
<th scope="col">
{"答えの方向性"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"「処理のピーク吸収」「後段の障害から切り離したい」"}
</td>
<td>
{"SQS (必要なら DLQ)"}
</td>
</tr>
<tr className={"even"}>
<td>
{"「1 つのイベントを複数システムに同時通知」"}
</td>
<td>
{"SNS (+ SQS ファンアウト)"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"「SaaS やAWSサービスのイベントでワークフロー起動」"}
</td>
<td>
{"EventBridge"}
</td>
</tr>
<tr className={"even"}>
<td>
{"「複数ステップ、分岐、リトライ、人手の承認」"}
</td>
<td>
{"Step Functions"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"「既存の ActiveMQ や RabbitMQ をコード変更なしで」"}
</td>
<td>
{"Amazon MQ"}
</td>
</tr>
<tr className={"even"}>
<td>
{"「使用量の変動が大きい RDB、運用なしで」"}
</td>
<td>
{"Aurora Serverless v2"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"「DB の読み取り負荷とレイテンシを下げたい」"}
</td>
<td>
{"ElastiCache"}
</td>
</tr>
<tr className={"even"}>
<td>
{"「モノリスを段階的に分解」"}
</td>
<td>
{"ストラングラーフィグ + API Gateway/ALB"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"「ノード管理をしないコンテナ」"}
</td>
<td>
{"Fargate"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<div className={"source-block"}>
{"\n                    "}
<div className={"source-head"}>
{"出典"}
</div>
{"\n                    "}
<ul className={"source-grid"}>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://d1.awsstatic.com/training-and-certification/docs-sa-pro/AWS-Certified-Solutions-Architect-Professional_Exam-Guide.pdf"}>
<span className={"num"}>
{"1"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"公式 Exam Guide (Task 4.4)"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://d1.awsstatic.com/training-and-certification/docs-sa-pro/AWS-Certified-Solutions-Architect-Professional_Exam-Guide.pdf"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/strangler-fig.html"}>
<span className={"num"}>
{"2"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"ストラングラーフィグパターン"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/strangler-fig.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/lambda/latest/dg/welcome.html"}>
<span className={"num"}>
{"3"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"Lambda"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/lambda/latest/dg/welcome.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html"}>
<span className={"num"}>
{"4"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"SQS"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/sns/latest/dg/welcome.html"}>
<span className={"num"}>
{"5"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"SNS"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/sns/latest/dg/welcome.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html"}>
<span className={"num"}>
{"6"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"EventBridge"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html"}>
<span className={"num"}>
{"7"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"Step Functions"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/amazon-mq/latest/developer-guide/welcome.html"}>
<span className={"num"}>
{"8"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"Amazon MQ"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/amazon-mq/latest/developer-guide/welcome.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.html"}>
<span className={"num"}>
{"9"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"Aurora Serverless v2"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/WhatIs.html"}>
<span className={"num"}>
{"10"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"ElastiCache"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/WhatIs.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html"}>
<span className={"num"}>
{"11"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"Well-Architected Framework"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                    "}
</ul>
{"\n                "}
</div>
{"\n                "}
<hr />
{"\n                "}
</>; }
