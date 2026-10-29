import { Diagram } from '../Diagram';
import type { ChecklistProps } from '../types';
/** 原本のfoundation本文。 */
export default function Content({ progress, updateProgress }: ChecklistProps) { void progress; void updateProgress; return <>
{"\n                "}
<div className={"hero"}>
{"\n                    "}
<div className={"kicker"}>
{"\n                        AWS Certified Solutions Architect - Professional · Domain 2\n                    "}
</div>
{"\n                    "}
<h1>
{"\n                        AWS Certified Solutions Architect - Professional (SAP-C02) Content Domain 2:\n                        Design for New Solutions 初学者向けステップバイステップ解説\n                    "}
</h1>
{"\n                    "}
<div className={"meta-row"}>
{"\n                        "}
<span className={"pill"}>
{"範囲 "}
<strong>
{"全6タスク"}
</strong>
</span>
{"\n                        "}
<span className={"pill"}>
{"対象 "}
<strong>
{"初学者向け"}
</strong>
</span>
{"\n                        "}
<span className={"pill"}>
{"図解 "}
<strong>
{"Mermaid 23点"}
</strong>
</span>
{"\n                        "}
<span className={"pill"}>
{"参考文献 "}
<strong>
{"80件"}
</strong>
</span>
{"\n                    "}
</div>
{"\n                "}
</div>
{"\n\n                "}
<p>
{"対象試験: AWS Certified Solutions Architect - Professional (SAP-C02)"}
</p>
{"\n                "}
<p>
{"\n                    対象範囲: Content Domain 2「新しいソリューションの設計(Design for New\n                    Solutions)」の全6タスク\n                "}
</p>
{"\n                "}
<p>
{"\n                    公式の出題範囲(アンカー):\n                    "}
<a href={"https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-professional-02/solutions-architect-professional-02-domain2.html"}>
{"https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-professional-02/solutions-architect-professional-02-domain2.html"}
</a>
{"\n                "}
</p>
{"\n                "}
<hr />
{"\n                "}
<h2 id={"1-このガイドの使い方"} tabIndex={-1}>
{"1. このガイドの使い方"}
</h2>
{"\n                "}
<p>
{"\n                    SAP-C02\n                    は「サービスの名前を知っているか」ではなく、"}
<strong>
{"複数の要件(コスト・可用性・セキュリティ・運用負荷)が衝突する場面で、最も適切な組み合わせを選べるか"}
</strong>
{"を問う試験です。そのため本ガイドは、各タスクを次の4ステップで解説します。\n                "}
</p>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：SAP-C02\n                    は「サービスの名前を知っているか」ではなく、複数の要件(コスト・可用性・セキュリティ・運用負荷)が衝突する場面で、最も適切な組み合わせを選べるかを問う試験です。そのため本ガイドは、各タスクを次の4ステップで解説します。"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"ステップ"}
</th>
<th scope="col">
{"内容"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"Step 1"}
</td>
<td>
{"\n                                    公式試験ガイドの「Knowledge of(知識)」「Skills\n                                    in(スキル)」を、初学者向けにやさしく言い換える\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"Step 2"}
</td>
<td>
{"\n                                    関連サービス・機能の仕組みを、図(Mermaid)と表(Markdown)で理解する\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Step 3"}
</td>
<td>
{"ベストプラクティス(設計の定石)を押さえる"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Step 4"}
</td>
<td>
{"試験での「選び方のコツ」と「ひっかけポイント」を確認する"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"初学者がつまずきやすい用語先に確認"} tabIndex={-1}>
{"\n                    初学者がつまずきやすい用語(先に確認)\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：初学者がつまずきやすい用語(先に確認)"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"用語"}
</th>
<th scope="col">
{"やさしい意味"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"リージョン (Region)"}
</td>
<td>
{"\n                                    世界各地にある、AWSのデータセンター群の「地域」(例:\n                                    東京、バージニア北部)\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"アベイラビリティゾーン (AZ)"}
</td>
<td>
{"\n                                    1つのリージョン内にある、電源・ネットワークが独立した複数の拠点\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"IaC (Infrastructure as Code)"}
</td>
<td>
{"インフラ構成をコード(テキスト)で書き、再現可能にする考え方"}
</td>
</tr>
<tr className={"even"}>
<td>
{"RTO"}
</td>
<td>
{"障害から「どれくらいの時間で」復旧するか(目標復旧時間)"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"RPO"}
</td>
<td>
{"\n                                    障害時に「どれくらい前の時点まで」データが戻ってよいか(目標復旧時点)\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"最小権限"}
</td>
<td>
{"必要な操作だけを許可し、それ以外は許可しない原則"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"マネージドサービス"}
</td>
<td>
{"パッチ適用や冗長化などの運用をAWSに任せられるサービス"}
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
{"試験の基本姿勢"}
</strong>
{":\n                    問題文に「運用負荷を最小限に」「最もコスト効率が高い」「最小のダウンタイム」といった"}
<strong>
{"最適化キーワード"}
</strong>
{"があれば、それが正解を決める決め手です。技術的に可能な選択肢が複数あっても、キーワードに最も合うものを選びます。\n                "}
</p>
{"\n                "}
<hr />
{"\n                "}
<h2 id={"2-domain-2-の全体像"} tabIndex={-1}>
{"2. Domain 2 の全体像"}
</h2>
{"\n                "}
<p>
{"\n                    Domain 2\n                    は「ゼロから新しく設計する」場面が中心です。6つのタスクは、Well-Architected\n                    Framework の各柱に対応させると覚えやすくなります。\n                "}
</p>
{"\n                "}
<Diagram id="diag-0" label={"2. Domain 2 の全体像"}/>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：flowchart TB\n    D2[\"Domain 2: Design for New Solutions\"]\n    T1[\"Task 2.1<br/>デプロイ戦略<br/>運用上の優秀性\"]\n    T2[\"Task 2.2<br/>ビジネス継続性<br/>信頼性 DR\"]\n    T3[\"Task 2.3<br/>セキュリティ統制<br/>セキュリティ\"]\n    T4[\"Task 2.4<br/>信頼性要件<br/>信頼性 可用性\"]\n    T5[\"Task 2.5<br/>パフォーマンス目標<br/>パフォーマンス効率\"]\n    T6[\"Task 2.6<br/>コスト最適化<br/>コスト最適化\"]\n    D2 --> T1\n    D2 --> T2\n    D2 --> T3\n    D2 --> T4\n    D2 --> T5\n    D2 --> T6\n\n    classDef highlightFill fill:#dbe6ff,stroke:#3556d6,color:#13204a;\n    class D2 highlightFill"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"タスク"}
</th>
<th scope="col">
{"一言でいうと"}
</th>
<th scope="col">
{"中心となるサービス・概念"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"2.1"}
</td>
<td>
{"安全に素早くリリースし、失敗したら戻せる設計"}
</td>
<td>
{"\n                                    CloudFormation, CDK, CodePipeline, CodeDeploy, Systems Manager\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"2.2"}
</td>
<td>
{"災害時にも事業を止めない設計"}
</td>
<td>
{"\n                                    RTO/RPO, DR 4戦略, Route 53, AWS Backup, Elastic Disaster\n                                    Recovery\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"2.3"}
</td>
<td>
{"守るべきものを、必要最小限の許可で守る設計"}
</td>
<td>
{"\n                                    IAM, セキュリティグループ, NACL, KMS, WAF, Shield, GuardDuty\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"2.4"}
</td>
<td>
{"壊れても動き続ける・すぐ戻る設計"}
</td>
<td>
{"\n                                    Multi-AZ/Region, Auto Scaling, SQS/SNS/Step Functions, Route 53\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"2.5"}
</td>
<td>
{"負荷が増えても速く動く設計"}
</td>
<td>
{"キャッシュ, レプリカ, ストレージ選定, 専用データベース"}
</td>
</tr>
<tr className={"even"}>
<td>
{"2.6"}
</td>
<td>
{"必要な性能を最も安く得る設計"}
</td>
<td>
{"Savings Plans, RI, ストレージ階層化, データ転送コスト"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<hr />
{"\n                "}
</>; }
