import { Diagram } from '../Diagram';
/** 原本のfoundation本文。 */
export default function Content() { return <>
{"\n                "}
<div className={"hero"}>
{"\n                    "}
<div className={"kicker"}>
{"Solutions Architect Professional · Domain 3"}
</div>
{"\n                    "}
<h1>
{"\n                        AWS Certified Solutions Architect - Professional (SAP-C02)"}
<br />
{"Content\n                        Domain 3: Continuous Improvement for Existing Solutions\n                        初学者向けステップバイステップガイド\n                    "}
</h1>
{"\n                    "}
<div className={"meta-row"}>
{"\n                        "}
<span className={"pill"}>
{"配点 "}
<strong>
{"25%"}
</strong>
</span>
<span className={"pill"}>
{"対象 "}
<strong>
{"初学者向け"}
</strong>
</span>
<span className={"pill"}>
{"図解 "}
<strong>
{"Mermaid 16点"}
</strong>
</span>
<span className={"pill"}>
{"参考 "}
<strong>
{"URL 48件"}
</strong>
</span>
{"\n                    "}
</div>
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
{"補足"}
</div>
{"\n                        "}
<p>
{"\n                            既存のシステムを「測って、分析して、直して、また測る」ための考え方と AWS\n                            サービスを、初学者向けに順を追って解説します。\n                        "}
</p>
{"\n                    "}
</div>
{"\n                "}
</div>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 1：学習資料"}>
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
{"対象試験"}
</td>
<td>
{"AWS Certified Solutions Architect - Professional (SAP-C02)"}
</td>
</tr>
<tr className={"even"}>
<td>
{"対象ドメイン"}
</td>
<td>
{"\n                                    Content Domain 3: Continuous Improvement for Existing Solutions\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"配点"}
</td>
<td>
{"試験の採点対象コンテンツの 25%"}
</td>
</tr>
<tr className={"even"}>
<td>
{"構成タスク"}
</td>
<td>
{"\n                                    Task 3.1 運用上の優秀性 / 3.2 セキュリティ / 3.3 パフォーマンス\n                                    / 3.4 信頼性 / 3.5 コスト最適化\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"想定読者"}
</td>
<td>
{"\n                                    AWS の基本サービス(EC2, S3, VPC, IAM)を触ったことがある初学者\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"一次ソース"}
</td>
<td>
{"AWS 公式 Exam Guide (SAP-C02)"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n\n                "}
<h2 id={"1-この-domain-は何を問うのか"} tabIndex={-1}>
{"1. この Domain は何を問うのか"}
</h2>
{"\n                "}
<h3 id={"11-一言でいうと"} tabIndex={-1}>
{"1.1 一言でいうと"}
</h3>
{"\n                "}
<p>
{"\n                    Domain 3 は\n                    "}
<strong>
{"「すでに動いているシステムを、より良くする提案ができるか」"}
</strong>
{"\n                    を問います。新規設計(Domain 2)や移行(Domain\n                    4)と違い、"}
<strong>
{"現状の課題を見つけ、原因を特定し、最小のリスクで改善する"}
</strong>
{"視点が中心です。\n                "}
</p>
{"\n                "}
<h3 id={"12-5-つのタスクと-well-architected-の柱"} tabIndex={-1}>
{"\n                    1.2 5 つのタスクと Well-Architected の柱\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 2：1.2 5 つのタスクと Well-Architected の柱"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"Task"}
</th>
<th scope="col">
{"テーマ"}
</th>
<th scope="col">
{"対応する Well-Architected の柱"}
</th>
<th scope="col">
{"代表サービス"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"3.1"}
</td>
<td>
{"運用上の優秀性"}
</td>
<td>
{"Operational Excellence"}
</td>
<td>
{"CloudWatch, EventBridge, Systems Manager, CodeDeploy, FIS"}
</td>
</tr>
<tr className={"even"}>
<td>
{"3.2"}
</td>
<td>
{"セキュリティ"}
</td>
<td>
{"Security"}
</td>
<td>
{"\n                                    Config, Secrets Manager, IAM Access Analyzer, GuardDuty,\n                                    Inspector, AWS Backup\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"3.3"}
</td>
<td>
{"パフォーマンス"}
</td>
<td>
{"Performance Efficiency"}
</td>
<td>
{"\n                                    Auto Scaling, CloudFront, Global Accelerator, ElastiCache,\n                                    Compute Optimizer\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"3.4"}
</td>
<td>
{"信頼性"}
</td>
<td>
{"Reliability"}
</td>
<td>
{"\n                                    Multi-AZ, ELB, Route 53, Service Quotas, Elastic Disaster\n                                    Recovery\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"3.5"}
</td>
<td>
{"コスト最適化"}
</td>
<td>
{"Cost Optimization"}
</td>
<td>
{"Cost Explorer, Budgets, CUR, Savings Plans, Trusted Advisor"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"13-改善の基本ループ"} tabIndex={-1}>
{"1.3 改善の基本ループ"}
</h3>
{"\n                "}
<p>
{"どのタスクも、次のループを回すことが本質です。"}
</p>
{"\n                "}
<Diagram id="diag-0" label={"1.3 改善の基本ループ"}/>
{"\n                "}
<h3 id={"14-学習のステップおすすめ順"} tabIndex={-1}>
{"1.4 学習のステップ(おすすめ順)"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 3：1.4 学習のステップ(おすすめ順)"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"ステップ"}
</th>
<th scope="col">
{"やること"}
</th>
<th scope="col">
{"目安"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"Step 1"}
</td>
<td>
{"2 章で用語と 6 つの柱を理解する"}
</td>
<td>
{"1 時間"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Step 2"}
</td>
<td>
{"3.1 で「見える化」と「自動化」の道具を覚える"}
</td>
<td>
{"3 時間"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Step 3"}
</td>
<td>
{"3.2 から 3.5 を 1 タスクずつ読み、比較表を自分で書き写す"}
</td>
<td>
{"各 2 から 3 時間"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Step 4"}
</td>
<td>
{"8 章の読み解きパターンで過去問風の問題を解く"}
</td>
<td>
{"2 時間"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Step 5"}
</td>
<td>
{"9 章のチェックリストで抜けを確認する"}
</td>
<td>
{"1 時間"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h2 id={"2-前提知識-well-architected-と用語集"} tabIndex={-1}>
{"\n                    2. 前提知識: Well-Architected と用語集\n                "}
</h2>
{"\n                "}
<h3 id={"21-aws-well-architected-framework-の-6-つの柱"} tabIndex={-1}>
{"\n                    2.1 AWS Well-Architected Framework の 6 つの柱\n                "}
</h3>
{"\n                "}
<p>
{"\n                    SAP-C02 は Well-Architected Framework に基づく設計力を検証する試験です。Domain 3\n                    の 5 タスクは、6 つの柱のうち 5 つに対応しています。\n                "}
</p>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 4：2.1 AWS Well-Architected Framework の 6 つの柱"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"柱"}
</th>
<th scope="col">
{"一言で"}
</th>
<th scope="col">
{"改善の問いかけ例"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"運用上の優秀性"}
</td>
<td>
{"運用を継続的に改善する"}
</td>
<td>
{"障害に気付く仕組みと自動復旧はあるか"}
</td>
</tr>
<tr className={"even"}>
<td>
{"セキュリティ"}
</td>
<td>
{"データとシステムを守る"}
</td>
<td>
{"権限は最小か、変更は追跡できるか"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"信頼性"}
</td>
<td>
{"壊れても動き続け、すぐ戻る"}
</td>
<td>
{"単一障害点は残っていないか"}
</td>
</tr>
<tr className={"even"}>
<td>
{"パフォーマンス効率"}
</td>
<td>
{"適切なリソースを適切な量で使う"}
</td>
<td>
{"ボトルネックはどこか"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"コスト最適化"}
</td>
<td>
{"無駄な支出を避ける"}
</td>
<td>
{"使っていないリソースはないか"}
</td>
</tr>
<tr className={"even"}>
<td>
{"持続可能性"}
</td>
<td>
{"環境負荷を減らす"}
</td>
<td>
{"過剰なリソースを持っていないか"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"22-用語集"} tabIndex={-1}>
{"2.2 用語集"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 5：2.2 用語集"}>
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
<th scope="col">
{"例"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"SLA"}
</td>
<td>
{"サービス提供者と利用者の約束(契約)"}
</td>
<td>
{"月間稼働率 99.9%"}
</td>
</tr>
<tr className={"even"}>
<td>
{"KPI"}
</td>
<td>
{"目標達成度を測る業務指標"}
</td>
<td>
{"注文完了までの時間"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"RTO"}
</td>
<td>
{"障害発生から復旧完了までに許容できる時間"}
</td>
<td>
{"1 時間以内に復旧"}
</td>
</tr>
<tr className={"even"}>
<td>
{"RPO"}
</td>
<td>
{"許容できるデータ損失の時間幅"}
</td>
<td>
{"直近 5 分のデータまで失ってよい"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"単一障害点 (SPOF)"}
</td>
<td>
{"それが止まると全体が止まる部品"}
</td>
<td>
{"AZ が 1 つだけの DB"}
</td>
</tr>
<tr className={"even"}>
<td>
{"影響範囲 (blast radius)"}
</td>
<td>
{"障害や変更ミスの影響が及ぶ範囲"}
</td>
<td>
{"全サーバー一斉デプロイは範囲が広い"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"IaC"}
</td>
<td>
{"インフラをコードで管理する手法"}
</td>
<td>
{"CloudFormation"}
</td>
</tr>
<tr className={"even"}>
<td>
{"最小権限"}
</td>
<td>
{"必要最小限の権限だけを与える原則"}
</td>
<td>
{"S3 の特定バケットの読み取りのみ許可"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"ライトサイジング"}
</td>
<td>
{"実使用量に合わせてリソース規模を調整する"}
</td>
<td>
{"m5.4xlarge から m5.xlarge へ"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"23-試験の形式exam-guide-より"} tabIndex={-1}>
{"2.3 試験の形式(Exam Guide より)"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 6：2.3 試験の形式(Exam Guide より)"}>
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
{"設問形式"}
</td>
<td>
{"択一式、複数選択式"}
</td>
</tr>
<tr className={"even"}>
<td>
{"採点対象問題"}
</td>
<td>
{"65 問(ほかに採点されない問題が 10 問)"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"スコア"}
</td>
<td>
{"100 から 1,000 のスケールスコア、合格点は 750"}
</td>
</tr>
<tr className={"even"}>
<td>
{"採点方式"}
</td>
<td>
{"補償型(セクションごとの合格は不要で、全体で合格すればよい)"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<p>
{"\n                    出典: AWS Certified Solutions Architect - Professional Exam Guide (SAP-C02)"}
<br />
<a href={"https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-professional-02/solutions-architect-professional-02.html"}>
{"https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-professional-02/solutions-architect-professional-02.html"}
</a>
{"\n                "}
</p>
{"\n\n                "}
</>; }
