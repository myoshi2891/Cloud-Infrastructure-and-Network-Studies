import { Diagram } from '../Diagram';
import { ChecklistCard, ChecklistCount } from '../ChecklistCard';
/** 原本のappendix本文。 */
export default function Content() { return <>
<h2 id={"8-横断-試験問題の読み解き方"} tabIndex={-1}>
{"8. 横断: 試験問題の読み解き方"}
</h2>
{"\n                "}
<h3 id={"81-sap-c02-の問題の特徴"} tabIndex={-1}>
{"8.1 SAP-C02 の問題の特徴"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 72：8.1 SAP-C02 の問題の特徴"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"特徴"}
</th>
<th scope="col">
{"対処"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"長い状況説明"}
</td>
<td>
{"「現状の課題」「制約」「求められる結果」に分けて読む"}
</td>
</tr>
<tr className={"even"}>
<td>
{"正解になり得る選択肢が複数ある"}
</td>
<td>
{"\n                                    制約 (コスト最小、運用負荷最小、ダウンタイム最小など) で絞る\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"「最も運用負荷が低い」"}
</td>
<td>
{"マネージドサービス、自動化を優先"}
</td>
</tr>
<tr className={"even"}>
<td>
{"「最もコスト効率が高い」"}
</td>
<td>
{"要件を満たす最小構成と適切な料金モデル"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"「最小限の変更で」"}
</td>
<td>
{"既存構成を活かす選択肢"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"82-選択肢の絞り込み手順"} tabIndex={-1}>
{"8.2 選択肢の絞り込み手順"}
</h3>
{"\n                "}
<Diagram id="diag-15" label={"8.2 選択肢の絞り込み手順"}/>
{"\n                "}
<h3 id={"83-頻出の比較"} tabIndex={-1}>
{"8.3 頻出の比較"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 73：8.3 頻出の比較"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"比較"}
</th>
<th scope="col">
{"違い"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"Secrets Manager と Parameter Store"}
</td>
<td>
{"自動ローテーションが必要なら Secrets Manager"}
</td>
</tr>
<tr className={"even"}>
<td>
{"CloudFront と Global Accelerator"}
</td>
<td>
{"\n                                    キャッシュ向けは CloudFront、固定 IP と TCP/UDP は Global\n                                    Accelerator\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Multi-AZ と リードレプリカ"}
</td>
<td>
{"\n                                    可用性は Multi-AZ。読み取り分散はリードレプリカ、または Multi-AZ\n                                    DB クラスターのリーダーインスタンス(Multi-AZ DB\n                                    インスタンスのスタンバイは読み取り不可)\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"Config と CloudTrail"}
</td>
<td>
{"設定の状態と履歴は Config、API 操作の履歴は CloudTrail"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"GuardDuty と Inspector"}
</td>
<td>
{"不審な動きの検知は GuardDuty、脆弱性のスキャンは Inspector"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Security Hub と GuardDuty"}
</td>
<td>
{"集約と準拠評価は Security Hub、脅威検知は GuardDuty"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Savings Plans と RI"}
</td>
<td>
{"\n                                    柔軟性は Compute Savings Plans、特定属性への最大割引は RI や EC2\n                                    Instance Savings Plans\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"Budgets と Cost Explorer"}
</td>
<td>
{"予算と通知は Budgets、分析は Cost Explorer"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Cost Explorer と CUR"}
</td>
<td>
{"\n                                    画面での傾向分析は Cost Explorer、最も詳細な行単位の分析は CUR\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"カナリアと リニア"}
</td>
<td>
{"カナリアは少量で先に検証、リニアは一定割合ずつ段階的に移行"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"State Manager と Automation"}
</td>
<td>
{"望ましい状態の維持は State Manager、手順の実行は Automation"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n\n                "}
<h2 id={"9-学習チェックリスト"} tabIndex={-1}>
{"9. 学習チェックリスト"}
</h2>
{"\n                "}
<h3 id={"task-31-運用上の優秀性"} tabIndex={-1}>
{"Task 3.1 運用上の優秀性"}
</h3>
{"\n                "}
<ChecklistCard>
{"\n                    "}
<div className={"checklist-header"}>
{"\n                        "}
<span className={"title"}>
{"学習チェックリスト"}
</span>
<ChecklistCount total={5}/>
{"\n                    "}
</div>
{"\n                    "}
<ul>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk1"} type={"checkbox"}/>
<label htmlFor={"chk1"}>
{"メトリクス、ログ、トレース、操作履歴の違いを説明できる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk2"} type={"checkbox"}/>
<label htmlFor={"chk2"}>
{"CloudWatch アラームから自動修復まで、EventBridge と SSM Automation\n                                で組み立てられる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk3"} type={"checkbox"}/>
<label htmlFor={"chk3"}>
{"7 つのデプロイ戦略の特徴と、CodeDeploy\n                                での実現方法を説明できる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk4"} type={"checkbox"}/>
<label htmlFor={"chk4"}>
{"Systems Manager の主要機能の使い分けを説明できる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk5"} type={"checkbox"}/>
<label htmlFor={"chk5"}>
{"DR の 4 戦略と、FIS による障害訓練を説明できる"}
</label>
{"\n                        "}
</li>
{"\n                    "}
</ul>
{"\n                "}
</ChecklistCard>
{"\n                "}
<h3 id={"task-32-セキュリティ"} tabIndex={-1}>
{"Task 3.2 セキュリティ"}
</h3>
{"\n                "}
<ChecklistCard>
{"\n                    "}
<div className={"checklist-header"}>
{"\n                        "}
<span className={"title"}>
{"学習チェックリスト"}
</span>
<ChecklistCount total={5}/>
{"\n                    "}
</div>
{"\n                    "}
<ul>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk6"} type={"checkbox"}/>
<label htmlFor={"chk6"}>
{"Config ルールと自動修復の流れを説明できる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk7"} type={"checkbox"}/>
<label htmlFor={"chk7"}>
{"Secrets Manager と Parameter Store を使い分けられる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk8"} type={"checkbox"}/>
<label htmlFor={"chk8"}>
{"Access Analyzer で最小権限へ絞り込む手順を説明できる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk9"} type={"checkbox"}/>
<label htmlFor={"chk9"}>
{"GuardDuty、Inspector、Security Hub、Macie の役割を区別できる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk10"} type={"checkbox"}/>
<label htmlFor={"chk10"}>
{"Patch Manager と AWS Backup の運用を設計できる"}
</label>
{"\n                        "}
</li>
{"\n                    "}
</ul>
{"\n                "}
</ChecklistCard>
{"\n                "}
<h3 id={"task-33-パフォーマンス"} tabIndex={-1}>
{"Task 3.3 パフォーマンス"}
</h3>
{"\n                "}
<ChecklistCard>
{"\n                    "}
<div className={"checklist-header"}>
{"\n                        "}
<span className={"title"}>
{"学習チェックリスト"}
</span>
<ChecklistCount total={4}/>
{"\n                    "}
</div>
{"\n                    "}
<ul>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk11"} type={"checkbox"}/>
<label htmlFor={"chk11"}>
{"ビジネス要件を SLI と SLO に変換できる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk12"} type={"checkbox"}/>
<label htmlFor={"chk12"}>
{"ボトルネックの特定手順と使うツールを説明できる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk13"} type={"checkbox"}/>
<label htmlFor={"chk13"}>
{"Auto Scaling の 5 つのスケーリングポリシー (シンプルを含む)\n                                と、ポリシーとは別機能であるウォームプールの役割、プレイスメントグループの\n                                4 種類 (precision-time を含む) を説明できる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk14"} type={"checkbox"}/>
<label htmlFor={"chk14"}>
{"CloudFront と Global Accelerator を使い分けられる"}
</label>
{"\n                        "}
</li>
{"\n                    "}
</ul>
{"\n                "}
</ChecklistCard>
{"\n                "}
<h3 id={"task-34-信頼性"} tabIndex={-1}>
{"Task 3.4 信頼性"}
</h3>
{"\n                "}
<ChecklistCard>
{"\n                    "}
<div className={"checklist-header"}>
{"\n                        "}
<span className={"title"}>
{"学習チェックリスト"}
</span>
<ChecklistCount total={4}/>
{"\n                    "}
</div>
{"\n                    "}
<ul>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk15"} type={"checkbox"}/>
<label htmlFor={"chk15"}>
{"単一障害点を洗い出し、冗長化の方法を提案できる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk16"} type={"checkbox"}/>
<label htmlFor={"chk16"}>
{"各サービスのレプリケーション方式を比較できる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk17"} type={"checkbox"}/>
<label htmlFor={"chk17"}>
{"Service Quotas の管理方法を説明できる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk18"} type={"checkbox"}/>
<label htmlFor={"chk18"}>
{"RTO と RPO から DR 方式を選べる"}
</label>
{"\n                        "}
</li>
{"\n                    "}
</ul>
{"\n                "}
</ChecklistCard>
{"\n                "}
<h3 id={"task-35-コスト最適化"} tabIndex={-1}>
{"Task 3.5 コスト最適化"}
</h3>
{"\n                "}
<ChecklistCard>
{"\n                    "}
<div className={"checklist-header"}>
{"\n                        "}
<span className={"title"}>
{"学習チェックリスト"}
</span>
<ChecklistCount total={4}/>
{"\n                    "}
</div>
{"\n                    "}
<ul>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk19"} type={"checkbox"}/>
<label htmlFor={"chk19"}>
{"未使用と低使用のリソースを見つける道具を説明できる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk20"} type={"checkbox"}/>
<label htmlFor={"chk20"}>
{"料金モデルの違いと選び方を説明できる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk21"} type={"checkbox"}/>
<label htmlFor={"chk21"}>
{"データ転送コストを下げる方法を説明できる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk22"} type={"checkbox"}/>
<label htmlFor={"chk22"}>
{"Budgets、請求アラーム、CUR、コスト配賦タグを使い分けられる"}
</label>
{"\n                        "}
</li>
{"\n                    "}
</ul>
{"\n                "}
</ChecklistCard>
{"\n\n                "}
<h2 id={"10-参考ソース-url"} tabIndex={-1}>
{"10. 参考ソース URL"}
</h2>
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
{"\n                            試験範囲の一次情報は AWS 公式 Exam Guide\n                            です。サービスの仕様や料金は更新されるため、本文の数値や名称は必ず最新の公式ドキュメントで確認してください。\n                        "}
</p>
{"\n                    "}
</div>
{"\n                "}
</div>
{"\n                "}
<h3 id={"101-試験ガイド"} tabIndex={-1}>
{"10.1 試験ガイド"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 74：10.1 試験ガイド"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"名称"}
</th>
<th scope="col">
{"URL"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"Exam Guide (SAP-C02) トップ"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-professional-02/solutions-architect-professional-02.html"}>
{"https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-professional-02/solutions-architect-professional-02.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"Exam Guide (SAP-C02) PDF 版 (Domain 3 を含む全体)"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/pdfs/aws-certification/latest/solutions-architect-professional-02/solutions-architect-professional-02.pdf"}>
{"https://docs.aws.amazon.com/pdfs/aws-certification/latest/solutions-architect-professional-02/solutions-architect-professional-02.pdf"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Content Domain 3 (ドメイン3の公式解説ページ)"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-professional-02/solutions-architect-professional-02-domain3.html"}>
{"https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-professional-02/solutions-architect-professional-02-domain3.html"}
</a>
{"\n                                "}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"102-well-architected-framework"} tabIndex={-1}>
{"10.2 Well-Architected Framework"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 75：10.2 Well-Architected Framework"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"名称"}
</th>
<th scope="col">
{"URL"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"運用上の優秀性の柱"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/wellarchitected/latest/operational-excellence-pillar/welcome.html"}>
{"https://docs.aws.amazon.com/wellarchitected/latest/operational-excellence-pillar/welcome.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"Evolve (継続的な改善)"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/wellarchitected/2023-10-03/framework/oe-evolve.html"}>
{"https://docs.aws.amazon.com/wellarchitected/2023-10-03/framework/oe-evolve.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"セキュリティの柱"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html"}>
{"https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"信頼性の柱"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html"}>
{"https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"パフォーマンス効率の柱"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/wellarchitected/latest/performance-efficiency-pillar/welcome.html"}>
{"https://docs.aws.amazon.com/wellarchitected/latest/performance-efficiency-pillar/welcome.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"コスト最適化の柱"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/welcome.html"}>
{"https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/welcome.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"DR ホワイトペーパー"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-workloads-on-aws.html"}>
{"https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-workloads-on-aws.html"}
</a>
{"\n                                "}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"103-サービス別ドキュメント"} tabIndex={-1}>
{"10.3 サービス別ドキュメント"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 76：10.3 サービス別ドキュメント"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"カテゴリ"}
</th>
<th scope="col">
{"サービス"}
</th>
<th scope="col">
{"URL"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"運用"}
</td>
<td>
{"Amazon CloudWatch"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html"}>
{"https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"運用"}
</td>
<td>
{"AWS X-Ray"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html"}>
{"https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"運用"}
</td>
<td>
{"AWS Systems Manager"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/systems-manager/latest/userguide/what-is-systems-manager.html"}>
{"https://docs.aws.amazon.com/systems-manager/latest/userguide/what-is-systems-manager.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"運用"}
</td>
<td>
{"AWS CodeDeploy"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html"}>
{"https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"運用"}
</td>
<td>
{"AWS Fault Injection Service"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/fis/latest/userguide/what-is.html"}>
{"https://docs.aws.amazon.com/fis/latest/userguide/what-is.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"セキュリティ"}
</td>
<td>
{"AWS Config"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html"}>
{"https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"セキュリティ"}
</td>
<td>
{"AWS Secrets Manager"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html"}>
{"https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"セキュリティ"}
</td>
<td>
{"IAM Access Analyzer"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html"}>
{"https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"セキュリティ"}
</td>
<td>
{"AWS CloudTrail"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html"}>
{"https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"セキュリティ"}
</td>
<td>
{"Amazon GuardDuty"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html"}>
{"https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"セキュリティ"}
</td>
<td>
{"Amazon Inspector"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/inspector/latest/user/what-is-inspector.html"}>
{"https://docs.aws.amazon.com/inspector/latest/user/what-is-inspector.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"セキュリティ"}
</td>
<td>
{"AWS Security Hub"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html"}>
{"https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"セキュリティ"}
</td>
<td>
{"AWS Backup"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html"}>
{"https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"パフォーマンス"}
</td>
<td>
{"EC2 Auto Scaling"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html"}>
{"https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"パフォーマンス"}
</td>
<td>
{"プレイスメントグループ"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-groups.html"}>
{"https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-groups.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"パフォーマンス"}
</td>
<td>
{"Amazon CloudFront"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html"}>
{"https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"パフォーマンス"}
</td>
<td>
{"AWS Global Accelerator"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html"}>
{"https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"パフォーマンス"}
</td>
<td>
{"AWS Compute Optimizer"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html"}>
{"https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"信頼性"}
</td>
<td>
{"AWS Elastic Disaster Recovery"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/drs/latest/userguide/what-is-drs.html"}>
{"https://docs.aws.amazon.com/drs/latest/userguide/what-is-drs.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"信頼性"}
</td>
<td>
{"Service Quotas"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/servicequotas/latest/userguide/intro.html"}>
{"https://docs.aws.amazon.com/servicequotas/latest/userguide/intro.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"信頼性"}
</td>
<td>
{"RDS Multi-AZ"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html"}>
{"https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"信頼性"}
</td>
<td>
{"Amazon S3 レプリケーション"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html"}>
{"https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"信頼性"}
</td>
<td>
{"DynamoDB グローバルテーブル"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html"}>
{"https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"信頼性"}
</td>
<td>
{"Route 53 DNS フェイルオーバー"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover.html"}>
{"https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"コスト"}
</td>
<td>
{"Cost Explorer"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html"}>
{"https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"コスト"}
</td>
<td>
{"AWS Budgets"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html"}>
{"https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"コスト"}
</td>
<td>
{"Cost and Usage Reports"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html"}>
{"https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"コスト"}
</td>
<td>
{"コスト配賦タグ"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html"}>
{"https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"コスト"}
</td>
<td>
{"Trusted Advisor"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor.html"}>
{"https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"コスト"}
</td>
<td>
{"Savings Plans"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html"}>
{"https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"コスト"}
</td>
<td>
{"スポットインスタンス"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html"}>
{"https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"コスト"}
</td>
<td>
{"請求アラーム"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html"}>
{"https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"コスト"}
</td>
<td>
{"S3 Storage Lens"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage_lens.html"}>
{"https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage_lens.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"コスト"}
</td>
<td>
{"VPC エンドポイント"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/vpc/latest/privatelink/what-are-vpc-endpoints.html"}>
{"https://docs.aws.amazon.com/vpc/latest/privatelink/what-are-vpc-endpoints.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"コスト"}
</td>
<td>
{"EC2 の料金 (データ転送を含む)"}
</td>
<td>
{"\n                                    "}
<a href={"https://aws.amazon.com/ec2/pricing/on-demand/"}>
{"https://aws.amazon.com/ec2/pricing/on-demand/"}
</a>
{"\n                                "}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"104-補足の参考資料"} tabIndex={-1}>
{"10.4 補足の参考資料"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 77：10.4 補足の参考資料"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"名称"}
</th>
<th scope="col">
{"URL"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"SAP-C02 Domain 3 の観点解説 (サードパーティ)"}
</td>
<td>
{"\n                                    "}
<a href={"https://www.sailor.sh/blog/sap-c02-continuous-improvement-operational-excellence"}>
{"https://www.sailor.sh/blog/sap-c02-continuous-improvement-operational-excellence"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"\n                                    書籍 AWS Certified Solutions Architect - Professional Exam Guide\n                                    (SAP-C02) 第 11 章 (運用上の優秀性の改善)\n                                "}
</td>
<td>
{"\n                                    "}
<a href={"https://www.oreilly.com/library/view/aws-certified-solutions/9781801813136/B17550_11.xhtml"}>
{"https://www.oreilly.com/library/view/aws-certified-solutions/9781801813136/B17550_11.xhtml"}
</a>
{"\n                                "}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n            "}
</>; }
