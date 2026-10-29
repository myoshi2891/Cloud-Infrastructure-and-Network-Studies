import { Diagram } from '../Diagram';
import type { ChecklistProps } from '../types';
/** 原本のtask33本文。 */
export default function Content({ progress, updateProgress }: ChecklistProps) { void progress; void updateProgress; return <>
<h2 id={"5-task-33-パフォーマンスを改善する"} tabIndex={-1}>
{"\n                    5. Task 3.3 パフォーマンスを改善する\n                "}
</h2>
{"\n                "}
<h3 id={"51-このタスクで問われることexam-guide-より"} tabIndex={-1}>
{"\n                    5.1 このタスクで問われること(Exam Guide より)\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 39：5.1 このタスクで問われること(Exam Guide より)"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"区分"}
</th>
<th scope="col">
{"内容"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"Knowledge"}
</td>
<td>
{"\n                                    高性能なアーキテクチャ (例: Auto\n                                    Scaling、インスタンスフリート、プレイスメントグループ)\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"Knowledge"}
</td>
<td>
{"\n                                    グローバルサービス (例: AWS Global Accelerator、Amazon\n                                    CloudFront、エッジコンピューティング)\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Knowledge"}
</td>
<td>
{"監視ツール群 (例: CloudWatch)"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Knowledge"}
</td>
<td>
{"SLA と KPI"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Skills"}
</td>
<td>
{"ビジネス要件を測定可能な指標へ変換する"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Skills"}
</td>
<td>
{"改善案をテストして推奨する"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Skills"}
</td>
<td>
{"新技術やマネージドサービスの採用機会を提案する"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Skills"}
</td>
<td>
{"要件に基づく評価とライトサイジングを行う"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Skills"}
</td>
<td>
{"パフォーマンスのボトルネックを特定して調べる"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"52-step-1-ビジネス要件を測定可能な指標へ変換する"} tabIndex={-1}>
{"\n                    5.2 Step 1: ビジネス要件を測定可能な指標へ変換する\n                "}
</h3>
{"\n                "}
<p>
{"「遅い」「速くしたい」のままでは改善できません。数値目標に置き換えます。"}
</p>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 40：5.2 Step 1: ビジネス要件を測定可能な指標へ変換する"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"ビジネス要件"}
</th>
<th scope="col">
{"測定可能な指標 (SLI)"}
</th>
<th scope="col">
{"目標値の例 (SLO)"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"画面が速く表示されてほしい"}
</td>
<td>
{"ページ応答時間の 99 パーセンタイル"}
</td>
<td>
{"1 秒以内"}
</td>
</tr>
<tr className={"even"}>
<td>
{"注文が確実に完了してほしい"}
</td>
<td>
{"注文 API の成功率"}
</td>
<td>
{"99.9% 以上"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"繁忙時も止まらないでほしい"}
</td>
<td>
{"ピーク時のスループットと CPU 使用率"}
</td>
<td>
{"秒間 1,000 リクエストを処理"}
</td>
</tr>
<tr className={"even"}>
<td>
{"検索がすぐ返ってほしい"}
</td>
<td>
{"検索クエリの遅延"}
</td>
<td>
{"200 ミリ秒以内"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 41：5.2 Step 1: ビジネス要件を測定可能な指標へ変換する"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"用語"}
</th>
<th scope="col">
{"意味"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"SLI"}
</td>
<td>
{"測定する指標そのもの"}
</td>
</tr>
<tr className={"even"}>
<td>
{"SLO"}
</td>
<td>
{"内部で目指す目標値"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"SLA"}
</td>
<td>
{"顧客との契約上の約束 (通常は SLO より緩く設定)"}
</td>
</tr>
<tr className={"even"}>
<td>
{"KPI"}
</td>
<td>
{"事業の成果を示す指標"}
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
{"ポイント"}
</div>
{"\n                        "}
<p>
{"\n                            平均値だけでなく、パーセンタイル (p95、p99)\n                            を見ます。平均は一部の極端に遅いリクエストを隠してしまうためです。\n                        "}
</p>
{"\n                    "}
</div>
{"\n                "}
</div>
{"\n                "}
<h3 id={"53-step-2-ボトルネックを特定する"} tabIndex={-1}>
{"5.3 Step 2: ボトルネックを特定する"}
</h3>
{"\n                "}
<Diagram id="diag-8" label={"5.3 Step 2: ボトルネックを特定する"}/>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 42：5.3 Step 2: ボトルネックを特定する"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"層"}
</th>
<th scope="col">
{"調べる道具"}
</th>
<th scope="col">
{"見るポイント"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"全体"}
</td>
<td>
{"CloudWatch ダッシュボードとアラーム"}
</td>
<td>
{"遅延、エラー率、飽和度"}
</td>
</tr>
<tr className={"even"}>
<td>
{"経路"}
</td>
<td>
{"AWS X-Ray"}
</td>
<td>
{"サービス間のどこで時間がかかっているか"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"アプリ"}
</td>
<td>
{"CloudWatch Logs Insights、CloudWatch エージェント"}
</td>
<td>
{"エラー、メモリ、スレッド"}
</td>
</tr>
<tr className={"even"}>
<td>
{"データベース"}
</td>
<td>
{"\n                                    CloudWatch Database Insights (旧称の Performance Insights は API\n                                    名などに残る)\n                                "}
</td>
<td>
{"待機イベント、負荷の高い SQL"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"ネットワーク"}
</td>
<td>
{"VPC フローログ、ELB のメトリクス"}
</td>
<td>
{"遅延、再送、帯域"}
</td>
</tr>
<tr className={"even"}>
<td>
{"リソース規模"}
</td>
<td>
{"AWS Compute Optimizer"}
</td>
<td>
{"過剰または不足の判定"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"54-step-3-スケーリングと高性能アーキテクチャ"} tabIndex={-1}>
{"\n                    5.4 Step 3: スケーリングと高性能アーキテクチャ\n                "}
</h3>
{"\n                "}
<h4>
{"EC2 Auto Scaling のポリシー"}
</h4>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 43：EC2 Auto Scaling のポリシー"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"ポリシー"}
</th>
<th scope="col">
{"動作"}
</th>
<th scope="col">
{"向いている場面"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"ターゲット追跡"}
</td>
<td>
{"指標を目標値に保つよう自動調整"}
</td>
<td>
{"迷ったらまずこれ (例: CPU 使用率を 50% に保つ)"}
</td>
</tr>
<tr className={"even"}>
<td>
{"ステップ"}
</td>
<td>
{"アラームの超過幅に応じて増減量を変える"}
</td>
<td>
{"負荷に応じて段階的に増やしたい"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"シンプル"}
</td>
<td>
{"\n                                    アラーム 1\n                                    つにつき決まった量だけ増減し、クールダウン後に次の調整\n                                "}
</td>
<td>
{"単純な構成 (現在はターゲット追跡/ステップが推奨)"}
</td>
</tr>
<tr className={"even"}>
<td>
{"スケジュール"}
</td>
<td>
{"決まった時刻に台数を変更"}
</td>
<td>
{"予測できる負荷 (朝の業務開始など)"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"予測"}
</td>
<td>
{"過去の傾向から負荷を予測して事前にスケール"}
</td>
<td>
{"周期的なパターンがある"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<p>
{"\n                    "}
<strong>
{"ウォームプール"}
</strong>
{"はスケーリングポリシーではなく、上記ポリシーと組み合わせる補助機能です。事前に初期化したインスタンスを停止/休止/実行状態で待機させ、スケールアウト時の起動遅延を短縮します\n                    (起動に時間がかかるアプリ向け)。\n                "}
</p>
{"\n                "}
<h4>
{"インスタンスフリートとプレイスメントグループ"}
</h4>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 44：インスタンスフリートとプレイスメントグループ"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"項目"}
</th>
<th scope="col">
{"内容"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"混合インスタンスポリシー (Auto Scaling)"}
</td>
<td>
{"\n                                    複数のインスタンスタイプとオンデマンド/スポットを混在させ、可用性とコストを両立\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"EC2 フリート"}
</td>
<td>
{"複数の購入オプションとインスタンスタイプをまとめて起動"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 45：インスタンスフリートとプレイスメントグループ"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"プレイスメントグループ"}
</th>
<th scope="col">
{"特徴"}
</th>
<th scope="col">
{"向いている用途"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"クラスター"}
</td>
<td>
{"同じ AZ 内で物理的に近く配置し、低遅延と高スループット"}
</td>
<td>
{"HPC、密結合な分散処理"}
</td>
</tr>
<tr className={"even"}>
<td>
{"パーティション"}
</td>
<td>
{"障害の影響を受けるラックの集合 (パーティション) を分離"}
</td>
<td>
{"Hadoop、Kafka、Cassandra などの大規模分散システム"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"スプレッド"}
</td>
<td>
{"少数のインスタンスを別々のハードウェアへ分散"}
</td>
<td>
{"重要で少数のインスタンス"}
</td>
</tr>
<tr className={"even"}>
<td>
{"precision-time"}
</td>
<td>
{"高精度な時刻ソースへ直接アクセスできるハードウェアへ配置"}
</td>
<td>
{"厳密な時刻同期が必要な金融取引、計測、分散 DB"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h4>
{"ストレージとデータベースの改善"}
</h4>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 46：ストレージとデータベースの改善"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"課題"}
</th>
<th scope="col">
{"改善策"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"ディスク I/O が足りない"}
</td>
<td>
{"\n                                    EBS を gp3 へ移行して IOPS とスループットを個別調整。高い要件は\n                                    io2\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"読み取りが多くて DB が重い"}
</td>
<td>
{"リードレプリカ、ElastiCache、DynamoDB の DAX"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"DB 接続が多すぎる (特に Lambda から)"}
</td>
<td>
{"RDS Proxy で接続をプール"}
</td>
</tr>
<tr className={"even"}>
<td>
{"同じ結果を何度も計算している"}
</td>
<td>
{"ElastiCache でキャッシュ"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"非同期にできる処理が同期になっている"}
</td>
<td>
{"SQS でバッファリングして分離"}
</td>
</tr>
<tr className={"even"}>
<td>
{"大量のファイル共有が必要"}
</td>
<td>
{"EFS または FSx (用途に合う種類を選択)"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"55-step-4-グローバルサービスとエッジで遅延を減らす"} tabIndex={-1}>
{"\n                    5.5 Step 4: グローバルサービスとエッジで遅延を減らす\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 47：5.5 Step 4: グローバルサービスとエッジで遅延を減らす"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"サービス"}
</th>
<th scope="col">
{"何をするか"}
</th>
<th scope="col">
{"向いている場面"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"Amazon CloudFront"}
</td>
<td>
{"コンテンツをエッジロケーションでキャッシュして配信"}
</td>
<td>
{"静的/動的な HTTP コンテンツの配信、動画、API の高速化"}
</td>
</tr>
<tr className={"even"}>
<td>
{"AWS Global Accelerator"}
</td>
<td>
{"\n                                    固定の Anycast IP と AWS のグローバルネットワークで経路を最適化\n                                "}
</td>
<td>
{"\n                                    TCP/UDP アプリ、ゲーム、固定 IP\n                                    が必要、リージョン間の高速フェイルオーバー\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Lambda@Edge / CloudFront Functions"}
</td>
<td>
{"エッジでリクエストやレスポンスを加工"}
</td>
<td>
{"リダイレクト、ヘッダー操作、認可"}
</td>
</tr>
<tr className={"even"}>
<td>
{"AWS Local Zones"}
</td>
<td>
{"都市部に近い場所で計算資源を提供"}
</td>
<td>
{"ユーザーに近い低遅延処理"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"AWS Wavelength"}
</td>
<td>
{"5G 網内で計算資源を提供"}
</td>
<td>
{"モバイル端末向けの超低遅延"}
</td>
</tr>
<tr className={"even"}>
<td>
{"AWS Outposts"}
</td>
<td>
{"自社拠点で AWS のインフラを稼働"}
</td>
<td>
{"オンプレミスでの低遅延処理"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Amazon Route 53"}
</td>
<td>
{"レイテンシーベースルーティング"}
</td>
<td>
{"最も遅延の小さいリージョンへ誘導"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h4>
{"CloudFront と Global Accelerator の使い分け"}
</h4>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 48：CloudFront と Global Accelerator の使い分け"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"観点"}
</th>
<th scope="col">
{"CloudFront"}
</th>
<th scope="col">
{"Global Accelerator"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"キャッシュ"}
</td>
<td>
{"あり"}
</td>
<td>
{"なし"}
</td>
</tr>
<tr className={"even"}>
<td>
{"対応プロトコル"}
</td>
<td>
{"HTTP/HTTPS (と WebSocket)"}
</td>
<td>
{"TCP と UDP"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"IP アドレス"}
</td>
<td>
{"変動"}
</td>
<td>
{"固定の Anycast IP 2 つ"}
</td>
</tr>
<tr className={"even"}>
<td>
{"主な効果"}
</td>
<td>
{"キャッシュによる遅延と負荷の削減"}
</td>
<td>
{"ネットワーク経路の最適化と高速フェイルオーバー"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"向いている例"}
</td>
<td>
{"Web サイト、動画配信"}
</td>
<td>
{"ゲーム、IoT、固定 IP が必要なアプリ"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"56-step-5-改善案をテストしライトサイジングを行う"} tabIndex={-1}>
{"\n                    5.6 Step 5: 改善案をテストし、ライトサイジングを行う\n                "}
</h3>
{"\n                "}
<Diagram id="diag-9" label={"5.6 Step 5: 改善案をテストし、ライトサイジングを行う"}/>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 49：5.6 Step 5: 改善案をテストし、ライトサイジングを行う"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"ライトサイジングの手順"}
</th>
<th scope="col">
{"内容"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"1. データを集める"}
</td>
<td>
{"\n                                    CloudWatch で CPU、ネットワーク、メモリ (エージェント必須)\n                                    を取得\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"2. 推奨を得る"}
</td>
<td>
{"Compute Optimizer で過剰、不足、最適を判定"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"3. 影響を評価する"}
</td>
<td>
{"変更後のタイプで要件を満たせるか、非本番で確認"}
</td>
</tr>
<tr className={"even"}>
<td>
{"4. 段階的に変更する"}
</td>
<td>
{"小さな範囲から適用し、指標を監視"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"5. 世代を更新する"}
</td>
<td>
{"新しい世代や Graviton など、性能対価格の良いタイプを検討"}
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
{"注意"}
</div>
{"\n                        "}
<p>
{"\n                            Compute Optimizer のメモリ関連の推奨を得るには、CloudWatch\n                            エージェントでメモリ使用率を収集しておく必要があります。\n                        "}
</p>
{"\n                    "}
</div>
{"\n                "}
</div>
{"\n                "}
<h4>
{"マネージドサービスの採用機会"}
</h4>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 50：マネージドサービスの採用機会"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"現状"}
</th>
<th scope="col">
{"改善の方向"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"EC2 上で自前運用の DB"}
</td>
<td>
{"Amazon RDS または Aurora"}
</td>
</tr>
<tr className={"even"}>
<td>
{"EC2 上のキャッシュサーバー"}
</td>
<td>
{"Amazon ElastiCache"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"自前の検索クラスター"}
</td>
<td>
{"Amazon OpenSearch Service"}
</td>
</tr>
<tr className={"even"}>
<td>
{"常時稼働のバッチ用サーバー"}
</td>
<td>
{"AWS Lambda、AWS Batch、Fargate"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"自前のメッセージキュー"}
</td>
<td>
{"Amazon SQS、Amazon MQ"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"57-task-33-の試験での考え方"} tabIndex={-1}>
{"5.7 Task 3.3 の試験での考え方"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 51：5.7 Task 3.3 の試験での考え方"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"問題文のキーワード"}
</th>
<th scope="col">
{"選ぶ方向"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"世界中のユーザーに静的コンテンツを速く届けたい"}
</td>
<td>
{"CloudFront"}
</td>
</tr>
<tr className={"even"}>
<td>
{"固定 IP、TCP/UDP、高速フェイルオーバー"}
</td>
<td>
{"Global Accelerator"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"低遅延の密結合な計算"}
</td>
<td>
{"クラスタープレイスメントグループ"}
</td>
</tr>
<tr className={"even"}>
<td>
{"読み取り負荷が高い"}
</td>
<td>
{"リードレプリカ、ElastiCache、DAX"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Lambda から DB 接続が枯渇する"}
</td>
<td>
{"RDS Proxy"}
</td>
</tr>
<tr className={"even"}>
<td>
{"インスタンスサイズが適切か知りたい"}
</td>
<td>
{"Compute Optimizer"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"複数サービスにまたがる遅延の原因を探したい"}
</td>
<td>
{"AWS X-Ray"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<p>
{"出典:"}
</p>
{"\n                "}
<ul>
{"\n                    "}
<li>
{"\n                        "}
<a href={"https://docs.aws.amazon.com/wellarchitected/latest/performance-efficiency-pillar/welcome.html"}>
{"https://docs.aws.amazon.com/wellarchitected/latest/performance-efficiency-pillar/welcome.html"}
</a>
{"\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<a href={"https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html"}>
{"https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html"}
</a>
{"\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<a href={"https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-groups.html"}>
{"https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-groups.html"}
</a>
{"\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<a href={"https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html"}>
{"https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html"}
</a>
{"\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<a href={"https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html"}>
{"https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html"}
</a>
{"\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<a href={"https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html"}>
{"https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html"}
</a>
{"\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<a href={"https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html"}>
{"https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html"}
</a>
{"\n                    "}
</li>
{"\n                "}
</ul>
{"\n\n                "}
</>; }
