import { Diagram } from '../Diagram';
import type { ChecklistProps } from '../types';
/** 原本のtask34本文。 */
export default function Content({ progress, updateProgress }: ChecklistProps) { void progress; void updateProgress; return <>
<h2 id={"6-task-34-信頼性を改善する"} tabIndex={-1}>
{"6. Task 3.4 信頼性を改善する"}
</h2>
{"\n                "}
<h3 id={"61-このタスクで問われることexam-guide-より"} tabIndex={-1}>
{"\n                    6.1 このタスクで問われること(Exam Guide より)\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：6.1 このタスクで問われること(Exam Guide より)"}>
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
{"AWS グローバルインフラストラクチャ"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Knowledge"}
</td>
<td>
{"データレプリケーション方式"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Knowledge"}
</td>
<td>
{"スケーリング手法 (例: ロードバランシング、Auto Scaling)"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Knowledge"}
</td>
<td>
{"高可用性とレジリエンス"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Knowledge"}
</td>
<td>
{"DR の手法とツール"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Knowledge"}
</td>
<td>
{"サービスクォータと制限"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Skills"}
</td>
<td>
{"アプリの成長と利用傾向を把握する"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Skills"}
</td>
<td>
{"既存アーキテクチャで信頼性が不十分な箇所を評価する"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Skills"}
</td>
<td>
{"単一障害点を解消する"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Skills"}
</td>
<td>
{"データレプリケーション、自己修復、伸縮性の機能を有効にする"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"62-step-1-利用傾向を把握して先回りする"} tabIndex={-1}>
{"\n                    6.2 Step 1: 利用傾向を把握して先回りする\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：6.2 Step 1: 利用傾向を把握して先回りする"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"やること"}
</th>
<th scope="col">
{"道具"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"使用量の推移を把握"}
</td>
<td>
{"CloudWatch メトリクスとダッシュボード"}
</td>
</tr>
<tr className={"even"}>
<td>
{"上限に近づいていないか確認"}
</td>
<td>
{"\n                                    Service Quotas、CloudWatch の使用状況メトリクス、Trusted Advisor\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"将来の需要を予測"}
</td>
<td>
{"過去のメトリクス、Auto Scaling の予測スケーリング"}
</td>
</tr>
<tr className={"even"}>
<td>
{"上限の引き上げを事前に申請"}
</td>
<td>
{"Service Quotas"}
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
{"\n                            クォータ超過は、想定外の障害の原因になります。ピークの前に引き上げを申請し、使用率にアラームを設定します。DR\n                            先リージョンのクォータも本番と同等に確保しておく必要があります。\n                        "}
</p>
{"\n                    "}
</div>
{"\n                "}
</div>
{"\n                "}
<h3 id={"63-step-2-単一障害点を見つけて解消する"} tabIndex={-1}>
{"\n                    6.3 Step 2: 単一障害点を見つけて解消する\n                "}
</h3>
{"\n                "}
<Diagram id="diag-10" label={"6.3 Step 2: 単一障害点を見つけて解消する"}/>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：6.3 Step 2: 単一障害点を見つけて解消する"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"単一障害点になりがちな箇所"}
</th>
<th scope="col">
{"改善策"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"1 つの AZ にだけあるインスタンス"}
</td>
<td>
{"複数 AZ へ分散し、Auto Scaling グループと ELB を使う"}
</td>
</tr>
<tr className={"even"}>
<td>
{"単一インスタンスの DB"}
</td>
<td>
{"RDS Multi-AZ、Aurora の複数 AZ 構成"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"1 台の NAT ゲートウェイ"}
</td>
<td>
{"AZ ごとに NAT ゲートウェイを配置"}
</td>
</tr>
<tr className={"even"}>
<td>
{"1 つのリージョンだけに依存"}
</td>
<td>
{"要件に応じてマルチリージョン化"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"1 台の手作業で運用されるサーバー"}
</td>
<td>
{"自動復旧とコードによる再作成"}
</td>
</tr>
<tr className={"even"}>
<td>
{"同期的に直接つながる処理"}
</td>
<td>
{"SQS や SNS で疎結合にする"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"1 本だけの専用線"}
</td>
<td>
{"冗長化した Direct Connect か、VPN をバックアップに併用"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"64-step-3-データレプリケーションを選ぶ"} tabIndex={-1}>
{"\n                    6.4 Step 3: データレプリケーションを選ぶ\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：6.4 Step 3: データレプリケーションを選ぶ"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"サービス"}
</th>
<th scope="col">
{"レプリケーション"}
</th>
<th scope="col">
{"ポイント"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"Amazon RDS Multi-AZ"}
</td>
<td>
{"\n                                    DB インスタンス配置: 別 AZ\n                                    のスタンバイへ同期レプリケーション。DB クラスター配置:\n                                    2つのリーダーインスタンスを持つ3 AZ 構成\n                                "}
</td>
<td>
{"\n                                    障害時に自動フェイルオーバー。DB\n                                    インスタンス配置のスタンバイは読み取りを処理しない。DB\n                                    クラスター配置はリーダーインスタンスで読み取りも処理できる\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"Amazon RDS リードレプリカ"}
</td>
<td>
{"非同期レプリケーション"}
</td>
<td>
{"読み取りの分散が主目的。リージョンをまたぐことも可能"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Amazon Aurora"}
</td>
<td>
{"ストレージが 3 つの AZ にまたがり 6 つのコピーを保持"}
</td>
<td>
{"高い耐久性と可用性。レプリカへの高速フェイルオーバー"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Aurora Global Database"}
</td>
<td>
{"リージョン間で低遅延のレプリケーション"}
</td>
<td>
{"DR と、リージョンをまたぐ読み取り"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Amazon DynamoDB グローバルテーブル"}
</td>
<td>
{"マルチリージョンのアクティブ/アクティブ"}
</td>
<td>
{"複数リージョンでの読み書き"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Amazon S3 レプリケーション (CRR と SRR)"}
</td>
<td>
{"バケット間で非同期にオブジェクトを複製"}
</td>
<td>
{"\n                                    別リージョンへの保護や、別アカウントへの複製。S3 Replication\n                                    Time Control で複製時間の目安を保証\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Amazon EBS"}
</td>
<td>
{"スナップショットを別リージョンや別アカウントへコピー"}
</td>
<td>
{"EBS ボリューム自体は 1 つの AZ 内"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Amazon EFS"}
</td>
<td>
{"複数 AZ に冗長保存。レプリケーションで別リージョンへ"}
</td>
<td>
{"リージョン内の高可用性は標準"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Amazon ElastiCache"}
</td>
<td>
{"\n                                    Multi-AZ と自動フェイルオーバー、グローバルデータストア(いずれも\n                                    Valkey / Redis OSS\n                                    が対象。自動フェイルオーバーにはレプリカが必要)\n                                "}
</td>
<td>
{"キャッシュの可用性"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<Diagram id="diag-11" label={"6.4 Step 3: データレプリケーションを選ぶ"}/>
{"\n                "}
<h3 id={"65-step-4-スケーリングと自己修復を有効にする"} tabIndex={-1}>
{"\n                    6.5 Step 4: スケーリングと自己修復を有効にする\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：6.5 Step 4: スケーリングと自己修復を有効にする"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"仕組み"}
</th>
<th scope="col">
{"自己修復の内容"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"ELB のヘルスチェック"}
</td>
<td>
{"異常なターゲットへのルーティングを停止"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Auto Scaling グループのヘルスチェック"}
</td>
<td>
{"異常なインスタンスを終了して置き換える"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"クロスゾーン負荷分散"}
</td>
<td>
{"AZ 間でトラフィックを均等化"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Amazon ECS のサービススケジューラ"}
</td>
<td>
{"停止したタスクを自動で再起動"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Route 53 ヘルスチェックとフェイルオーバー"}
</td>
<td>
{"異常なエンドポイントから正常な宛先へ DNS を切り替え"}
</td>
</tr>
<tr className={"even"}>
<td>
{"RDS Multi-AZ"}
</td>
<td>
{"障害時にスタンバイへ自動切り替え"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"CloudWatch アラームによる EC2 の自動復旧"}
</td>
<td>
{"システム障害時にインスタンスを復旧"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：6.5 Step 4: スケーリングと自己修復を有効にする"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"スケーリング手法"}
</th>
<th scope="col">
{"内容"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"スケールアップ (垂直)"}
</td>
<td>
{"1 台あたりの性能を上げる。上限があり、停止を伴うことが多い"}
</td>
</tr>
<tr className={"even"}>
<td>
{"スケールアウト (水平)"}
</td>
<td>
{"台数を増やす。可用性の向上にもつながる"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"スケールイン/アウトの自動化"}
</td>
<td>
{"Auto Scaling で負荷に追従"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"66-step-5-dr-の方式とツールを選ぶ"} tabIndex={-1}>
{"6.6 Step 5: DR の方式とツールを選ぶ"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：6.6 Step 5: DR の方式とツールを選ぶ"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"要件"}
</th>
<th scope="col">
{"推奨"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"RTO と RPO に余裕があり、コストを最優先"}
</td>
<td>
{"バックアップと復元 (AWS Backup)"}
</td>
</tr>
<tr className={"even"}>
<td>
{"数十分で復旧したい"}
</td>
<td>
{"パイロットライト"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"数分で復旧したい"}
</td>
<td>
{"ウォームスタンバイ"}
</td>
</tr>
<tr className={"even"}>
<td>
{"ほぼ停止ゼロとデータ損失ゼロ"}
</td>
<td>
{"マルチサイト (アクティブ/アクティブ)"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"オンプレミスや他クラウドのサーバーを AWS へ DR したい"}
</td>
<td>
{"AWS Elastic Disaster Recovery"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<Diagram id="diag-12" label={"6.6 Step 5: DR の方式とツールを選ぶ"}/>
{"\n                "}
<h3 id={"67-task-34-の試験での考え方"} tabIndex={-1}>
{"6.7 Task 3.4 の試験での考え方"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：6.7 Task 3.4 の試験での考え方"}>
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
{"AZ 障害時に DB を自動で切り替えたい"}
</td>
<td>
{"RDS Multi-AZ"}
</td>
</tr>
<tr className={"even"}>
<td>
{"リージョン障害に備えた高速な DB 切り替え"}
</td>
<td>
{"Aurora Global Database"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"複数リージョンで書き込みたい"}
</td>
<td>
{"DynamoDB グローバルテーブル"}
</td>
</tr>
<tr className={"even"}>
<td>
{"上限に達して起動に失敗する"}
</td>
<td>
{"Service Quotas で引き上げ"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"疎結合にして障害の連鎖を防ぎたい"}
</td>
<td>
{"SQS、SNS、EventBridge"}
</td>
</tr>
<tr className={"even"}>
<td>
{"異常なインスタンスを自動で置き換えたい"}
</td>
<td>
{"Auto Scaling のヘルスチェック"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"DNS で異常な宛先を避けたい"}
</td>
<td>
{"Route 53 ヘルスチェックとフェイルオーバー"}
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
<a href={"https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html"}>
{"https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html"}
</a>
{"\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<a href={"https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-workloads-on-aws.html"}>
{"https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-workloads-on-aws.html"}
</a>
{"\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<a href={"https://docs.aws.amazon.com/drs/latest/userguide/what-is-drs.html"}>
{"https://docs.aws.amazon.com/drs/latest/userguide/what-is-drs.html"}
</a>
{"\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<a href={"https://docs.aws.amazon.com/servicequotas/latest/userguide/intro.html"}>
{"https://docs.aws.amazon.com/servicequotas/latest/userguide/intro.html"}
</a>
{"\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<a href={"https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html"}>
{"https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html"}
</a>
{"\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<a href={"https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html"}>
{"https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html"}
</a>
{"\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<a href={"https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html"}>
{"https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html"}
</a>
{"\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<a href={"https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover.html"}>
{"https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover.html"}
</a>
{"\n                    "}
</li>
{"\n                "}
</ul>
{"\n\n                "}
</>; }
