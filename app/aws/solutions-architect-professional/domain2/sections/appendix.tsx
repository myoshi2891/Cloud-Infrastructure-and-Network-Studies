import { Diagram } from '../Diagram';
import type { ChecklistProps } from '../types';
/** 原本のappendix本文。 */
export default function Content({ progress, updateProgress }: ChecklistProps) { void progress; void updateProgress; return <>
<h2 id={"9-横断-シナリオ別この要件ならこの答え早見表"} tabIndex={-1}>
{"\n                    9. 横断: シナリオ別「この要件ならこの答え」早見表\n                "}
</h2>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 58：9. 横断: シナリオ別「この要件ならこの答え」早見表"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"要件(問題文のシグナル)"}
</th>
<th scope="col">
{"第一候補の設計"}
</th>
<th scope="col">
{"関連タスク"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"複数アカウント/リージョンに同じインフラを展開"}
</td>
<td>
{"CloudFormation StackSets"}
</td>
<td>
{"2.1"}
</td>
</tr>
<tr className={"even"}>
<td>
{"ダウンタイムなしで安全に切替、即時ロールバック"}
</td>
<td>
{"\n                                    Blue/Green(CodeDeploy、ALB\n                                    の加重ターゲットグループでリクエスト単位に分散。Route 53 加重は\n                                    DNS 応答の選択でありリゾルバーの TTL\n                                    キャッシュにより実際の比率がずれ、切り戻しも遅れうる)\n                                "}
</td>
<td>
{"2.1"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"オンプレミスの DR を低コストで"}
</td>
<td>
{"AWS Elastic Disaster Recovery"}
</td>
<td>
{"2.2"}
</td>
</tr>
<tr className={"even"}>
<td>
{"RTO 分単位、RPO 秒単位、リージョン障害対応"}
</td>
<td>
{"Aurora Global Database + ウォームスタンバイ + Route 53"}
</td>
<td>
{"2.2 / 2.4"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"S3 データのリージョン間複製"}
</td>
<td>
{"S3 CRR(バージョニング必須)"}
</td>
<td>
{"2.2"}
</td>
</tr>
<tr className={"even"}>
<td>
{"バックアップの削除・改ざん防止"}
</td>
<td>
{"AWS Backup Vault Lock + クロスアカウントコピー"}
</td>
<td>
{"2.2"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"インターネットを通さず AWS サービスへ接続"}
</td>
<td>
{"VPC エンドポイント(S3/DynamoDB はゲートウェイ型)"}
</td>
<td>
{"2.3 / 2.6"}
</td>
</tr>
<tr className={"even"}>
<td>
{"L7 攻撃と DDoS の多層防御"}
</td>
<td>
{"CloudFront + WAF + Shield(Advanced) + Route 53"}
</td>
<td>
{"2.3"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"DB パスワードの自動ローテーション"}
</td>
<td>
{"Secrets Manager"}
</td>
<td>
{"2.3"}
</td>
</tr>
<tr className={"even"}>
<td>
{"急な負荷増・処理の取りこぼし防止"}
</td>
<td>
{"SQS でバッファ + Auto Scaling"}
</td>
<td>
{"2.4 / 2.5"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"読み取り負荷の高い DB の高速化"}
</td>
<td>
{"ElastiCache / DAX / リードレプリカ"}
</td>
<td>
{"2.5"}
</td>
</tr>
<tr className={"even"}>
<td>
{"世界中のユーザーへ低レイテンシー"}
</td>
<td>
{"CloudFront、レイテンシールーティング、Global Accelerator"}
</td>
<td>
{"2.4 / 2.5"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"変動する負荷で最安"}
</td>
<td>
{"\n                                    ベース: Savings Plans/RI、変動: オンデマンド、中断可: スポット\n                                "}
</td>
<td>
{"2.6"}
</td>
</tr>
<tr className={"even"}>
<td>
{"古いデータの保管コスト削減"}
</td>
<td>
{"S3 ライフサイクル / Intelligent-Tiering / Glacier"}
</td>
<td>
{"2.6"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<hr />
{"\n                "}
<h2 id={"10-学習の進め方と最終チェックリスト"} tabIndex={-1}>
{"\n                    10. 学習の進め方と最終チェックリスト\n                "}
</h2>
{"\n                "}
<h3 id={"推奨ステップ"} tabIndex={-1}>
{"推奨ステップ"}
</h3>
{"\n                "}
<Diagram id="diag-22" label={"推奨ステップ"}/>
{"\n                "}
<h3 id={"最終チェックリスト"} tabIndex={-1}>
{"最終チェックリスト"}
</h3>
{"\n                "}
<div className={"checklist-card"}>
{"\n                    "}
<div className={"checklist-header"}>
{"\n                        "}
<span className={"title"}>
{"Task 2.1 デプロイ戦略"}
</span>
<span className="count">
{`${progress[0] ?? 0} / 4 完了`}
</span>
{"\n                    "}
</div>
{"\n                    "}
<ul>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk1"} type={"checkbox"} onChange={updateProgress}/>
<label htmlFor={"chk1"}>
{"CloudFormation の変更セット、ロールバック、ドリフト検出、StackSets\n                                を説明できる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk2"} type={"checkbox"} onChange={updateProgress}/>
<label htmlFor={"chk2"}>
{"Rolling、Immutable、Blue/Green、Canary、Linear\n                                の違いと使い分けを説明できる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk3"} type={"checkbox"} onChange={updateProgress}/>
<label htmlFor={"chk3"}>
{"CodePipeline、CodeBuild、CodeDeploy の役割を区別できる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk4"} type={"checkbox"} onChange={updateProgress}/>
<label htmlFor={"chk4"}>
{"Systems Manager の主要機能(Parameter Store、Patch Manager、Session\n                                Manager、Automation)を説明できる"}
</label>
{"\n                        "}
</li>
{"\n                    "}
</ul>
{"\n                "}
</div>
{"\n                "}
<div className={"checklist-card"}>
{"\n                    "}
<div className={"checklist-header"}>
{"\n                        "}
<span className={"title"}>
{"Task 2.2 ビジネス継続性"}
</span>
<span className="count">
{`${progress[1] ?? 0} / 3 完了`}
</span>
{"\n                    "}
</div>
{"\n                    "}
<ul>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk5"} type={"checkbox"} onChange={updateProgress}/>
<label htmlFor={"chk5"}>
{"RTO/RPO を説明し、DR 4戦略を要件から選べる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk6"} type={"checkbox"} onChange={updateProgress}/>
<label htmlFor={"chk6"}>
{"主要サービスのレプリケーション手段(S3 CRR、Aurora Global\n                                Database、DynamoDB グローバルテーブル、Elastic Disaster\n                                Recovery)を選べる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk7"} type={"checkbox"} onChange={updateProgress}/>
<label htmlFor={"chk7"}>
{"AWS Backup(クロスリージョン/アカウント、Vault Lock)と DR\n                                テストの重要性を説明できる"}
</label>
{"\n                        "}
</li>
{"\n                    "}
</ul>
{"\n                "}
</div>
{"\n                "}
<div className={"checklist-card"}>
{"\n                    "}
<div className={"checklist-header"}>
{"\n                        "}
<span className={"title"}>
{"Task 2.3 セキュリティ"}
</span>
<span className="count">
{`${progress[2] ?? 0} / 4 完了`}
</span>
{"\n                    "}
</div>
{"\n                    "}
<ul>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk8"} type={"checkbox"} onChange={updateProgress}/>
<label htmlFor={"chk8"}>
{"IAM の評価ロジック(明示的 Deny 優先)と権限境界/SCP\n                                の違いを説明できる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk9"} type={"checkbox"} onChange={updateProgress}/>
<label htmlFor={"chk9"}>
{"セキュリティグループと NACL\n                                の違い(ステートフル/ステートレス、拒否ルール)を説明できる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk10"} type={"checkbox"} onChange={updateProgress}/>
<label htmlFor={"chk10"}>
{"KMS、ACM\n                                による保存時/転送時の暗号化と、ゲートウェイ/インターフェースエンドポイントの違いを説明できる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk11"} type={"checkbox"} onChange={updateProgress}/>
<label htmlFor={"chk11"}>
{"Shield、WAF、GuardDuty、Security Hub、Inspector、Macie\n                                の役割を区別できる"}
</label>
{"\n                        "}
</li>
{"\n                    "}
</ul>
{"\n                "}
</div>
{"\n                "}
<div className={"checklist-card"}>
{"\n                    "}
<div className={"checklist-header"}>
{"\n                        "}
<span className={"title"}>
{"Task 2.4 信頼性"}
</span>
<span className="count">
{`${progress[3] ?? 0} / 4 完了`}
</span>
{"\n                    "}
</div>
{"\n                    "}
<ul>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk12"} type={"checkbox"} onChange={updateProgress}/>
<label htmlFor={"chk12"}>
{"Multi-AZ 設計の各層を説明でき、RDS の Multi-AZ\n                                とリードレプリカの違いを説明できる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk13"} type={"checkbox"} onChange={updateProgress}/>
<label htmlFor={"chk13"}>
{"Auto Scaling\n                                ポリシー(ターゲット追跡、ステップ、スケジュール、予測)を使い分けられる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk14"} type={"checkbox"} onChange={updateProgress}/>
<label htmlFor={"chk14"}>
{"SQS/SNS/EventBridge/Step Functions で疎結合設計を説明できる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk15"} type={"checkbox"} onChange={updateProgress}/>
<label htmlFor={"chk15"}>
{"Route 53 のルーティングポリシーを要件から選べる"}
</label>
{"\n                        "}
</li>
{"\n                    "}
</ul>
{"\n                "}
</div>
{"\n                "}
<div className={"checklist-card"}>
{"\n                    "}
<div className={"checklist-header"}>
{"\n                        "}
<span className={"title"}>
{"Task 2.5 パフォーマンス"}
</span>
<span className="count">
{`${progress[4] ?? 0} / 4 完了`}
</span>
{"\n                    "}
</div>
{"\n                    "}
<ul>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk16"} type={"checkbox"} onChange={updateProgress}/>
<label htmlFor={"chk16"}>
{"S3、EBS(gp3/io2)、インスタンスストア、EFS、FSx\n                                を用途で選べる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk17"} type={"checkbox"} onChange={updateProgress}/>
<label htmlFor={"chk17"}>
{"EC2 のファミリーを用途で選べる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk18"} type={"checkbox"} onChange={updateProgress}/>
<label htmlFor={"chk18"}>
{"目的特化型データベースを要件から選べる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk19"} type={"checkbox"} onChange={updateProgress}/>
<label htmlFor={"chk19"}>
{"キャッシュ、バッファリング、レプリカの設計パターンを説明できる"}
</label>
{"\n                        "}
</li>
{"\n                    "}
</ul>
{"\n                "}
</div>
{"\n                "}
<div className={"checklist-card"}>
{"\n                    "}
<div className={"checklist-header"}>
{"\n                        "}
<span className={"title"}>
{"Task 2.6 コスト最適化"}
</span>
<span className="count">
{`${progress[5] ?? 0} / 4 完了`}
</span>
{"\n                    "}
</div>
{"\n                    "}
<ul>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk20"} type={"checkbox"} onChange={updateProgress}/>
<label htmlFor={"chk20"}>
{"Savings\n                                Plans、RI、スポット、オンデマンドを組み合わせて選べる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk21"} type={"checkbox"} onChange={updateProgress}/>
<label htmlFor={"chk21"}>
{"S3 ストレージクラスとライフサイクルで階層化を設計できる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk22"} type={"checkbox"} onChange={updateProgress}/>
<label htmlFor={"chk22"}>
{"データ転送コストの発生ポイントと削減策を説明できる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk23"} type={"checkbox"} onChange={updateProgress}/>
<label htmlFor={"chk23"}>
{"Budgets、Cost Explorer、Cost Anomaly Detection、Compute Optimizer\n                                の違いを説明できる"}
</label>
{"\n                        "}
</li>
{"\n                    "}
</ul>
{"\n                "}
</div>
{"\n                "}
<hr />
{"\n                "}
<h2 id={"11-参考url一覧根拠ソース"} tabIndex={-1}>
{"11. 参考URL一覧(根拠ソース)"}
</h2>
{"\n                "}
<p>
{"\n                    掲載URLはAWS公式ドキュメントを中心にしています。AWS\n                    はドキュメントの構成を更新することがあるため、リンク切れの場合はタイトルでサイト内検索してください。料金や上限値などは変更されるため、試験直前に最新情報を確認してください。\n                "}
</p>
{"\n                "}
<h3 id={"試験ガイド"} tabIndex={-1}>
{"試験ガイド"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 59：試験ガイド"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"内容"}
</th>
<th scope="col">
{"URL"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"SAP-C02 試験ガイド(トップ)"}
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
{"\n                                    Content Domain 2: Design for New Solutions(本ガイドのアンカー)\n                                "}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-professional-02/solutions-architect-professional-02-domain2.html"}>
{"https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-professional-02/solutions-architect-professional-02-domain2.html"}
</a>
{"\n                                "}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"全般well-architected"} tabIndex={-1}>
{"全般(Well-Architected)"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 60：全般(Well-Architected)"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"内容"}
</th>
<th scope="col">
{"URL"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"AWS Well-Architected Framework"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html"}>
{"https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html"}
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
<tr className={"odd"}>
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
<tr className={"even"}>
<td>
{"AWS グローバルインフラストラクチャ"}
</td>
<td>
{"\n                                    "}
<a href={"https://aws.amazon.com/about-aws/global-infrastructure/"}>
{"https://aws.amazon.com/about-aws/global-infrastructure/"}
</a>
{"\n                                "}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"task-21-デプロイ戦略"} tabIndex={-1}>
{"Task 2.1 デプロイ戦略"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 61：Task 2.1 デプロイ戦略"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"内容"}
</th>
<th scope="col">
{"URL"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"AWS CloudFormation ユーザーガイド"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html"}>
{"https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"CloudFormation ベストプラクティス"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/best-practices.html"}>
{"https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/best-practices.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"変更セット"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-changesets.html"}>
{"https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-changesets.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"ドリフト検出"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-drift.html"}>
{"https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-drift.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"ロールバックトリガー"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-rollback-triggers.html"}>
{"https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-rollback-triggers.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"StackSets"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/what-is-cfnstacksets.html"}>
{"https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/what-is-cfnstacksets.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"AWS CDK デベロッパーガイド"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/cdk/v2/guide/home.html"}>
{"https://docs.aws.amazon.com/cdk/v2/guide/home.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"AWS CodePipeline"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html"}>
{"https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
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
<tr className={"even"}>
<td>
{"Elastic Beanstalk のデプロイポリシー"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html"}>
{"https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"ホワイトペーパー: Practicing CI/CD on AWS"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/whitepapers/latest/practicing-continuous-integration-continuous-delivery/welcome.html"}>
{"https://docs.aws.amazon.com/whitepapers/latest/practicing-continuous-integration-continuous-delivery/welcome.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"ホワイトペーパー: Overview of Deployment Options on AWS"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/whitepapers/latest/overview-deployment-options/welcome.html"}>
{"https://docs.aws.amazon.com/whitepapers/latest/overview-deployment-options/welcome.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
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
{"Systems Manager Patch Manager"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager.html"}>
{"https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Systems Manager Parameter Store"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html"}>
{"https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html"}
</a>
{"\n                                "}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"task-22-ビジネス継続性"} tabIndex={-1}>
{"Task 2.2 ビジネス継続性"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 62：Task 2.2 ビジネス継続性"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"内容"}
</th>
<th scope="col">
{"URL"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"ホワイトペーパー: Disaster Recovery of Workloads on AWS"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-workloads-on-aws.html"}>
{"https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-workloads-on-aws.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"\n                                    DR\n                                    オプション(バックアップとリストア、パイロットライト、ウォームスタンバイ、マルチサイト)\n                                "}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html"}>
{"https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
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
<tr className={"odd"}>
<td>
{"Route 53 ルーティングポリシー"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html"}>
{"https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"Route 53 Application Recovery Controller"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/r53recovery/latest/dg/what-is-route53-recovery.html"}>
{"https://docs.aws.amazon.com/r53recovery/latest/dg/what-is-route53-recovery.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"S3 レプリケーション"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html"}>
{"https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"Aurora Global Database"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html"}>
{"https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
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
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"task-23-セキュリティ"} tabIndex={-1}>
{"Task 2.3 セキュリティ"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 63：Task 2.3 セキュリティ"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"内容"}
</th>
<th scope="col">
{"URL"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"IAM のセキュリティベストプラクティス"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html"}>
{"https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"ポリシーの評価論理"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html"}>
{"https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"権限境界"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html"}>
{"https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"VPC セキュリティグループ"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html"}>
{"https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"ネットワーク ACL"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html"}>
{"https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"ルートテーブル"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Route_Tables.html"}>
{"https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Route_Tables.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"VPC エンドポイント(PrivateLink)"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/vpc/latest/privatelink/what-are-vpc-endpoints.html"}>
{"https://docs.aws.amazon.com/vpc/latest/privatelink/what-are-vpc-endpoints.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"ゲートウェイエンドポイント"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/vpc/latest/privatelink/gateway-endpoints.html"}>
{"https://docs.aws.amazon.com/vpc/latest/privatelink/gateway-endpoints.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"AWS KMS"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/kms/latest/developerguide/overview.html"}>
{"https://docs.aws.amazon.com/kms/latest/developerguide/overview.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
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
<tr className={"odd"}>
<td>
{"AWS Certificate Manager"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html"}>
{"https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"AWS Shield"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/waf/latest/developerguide/shield-chapter.html"}>
{"https://docs.aws.amazon.com/waf/latest/developerguide/shield-chapter.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"AWS WAF"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html"}>
{"https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"AWS Firewall Manager"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/waf/latest/developerguide/fms-chapter.html"}>
{"https://docs.aws.amazon.com/waf/latest/developerguide/fms-chapter.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
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
<tr className={"even"}>
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
{"ホワイトペーパー: AWS Best Practices for DDoS Resiliency"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/whitepapers/latest/aws-best-practices-ddos-resiliency/welcome.html"}>
{"https://docs.aws.amazon.com/whitepapers/latest/aws-best-practices-ddos-resiliency/welcome.html"}
</a>
{"\n                                "}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"task-24-信頼性"} tabIndex={-1}>
{"Task 2.4 信頼性"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 64：Task 2.4 信頼性"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"内容"}
</th>
<th scope="col">
{"URL"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"Amazon EC2 Auto Scaling"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html"}>
{"https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"Auto Scaling のスケーリングポリシー"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scale-based-on-demand.html"}>
{"https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scale-based-on-demand.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Amazon SQS"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html"}>
{"https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"Amazon SNS"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/sns/latest/dg/welcome.html"}>
{"https://docs.aws.amazon.com/sns/latest/dg/welcome.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"AWS Step Functions"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html"}>
{"https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"Amazon EventBridge"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html"}>
{"https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
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
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"task-25-パフォーマンス"} tabIndex={-1}>
{"Task 2.5 パフォーマンス"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 65：Task 2.5 パフォーマンス"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"内容"}
</th>
<th scope="col">
{"URL"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
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
<tr className={"even"}>
<td>
{"EC2 インスタンスタイプ"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/ec2/latest/instancetypes/instance-types.html"}>
{"https://docs.aws.amazon.com/ec2/latest/instancetypes/instance-types.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"EBS ボリュームタイプ"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volume-types.html"}>
{"https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volume-types.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"Amazon EFS"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html"}>
{"https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"S3 のパフォーマンス最適化"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/AmazonS3/latest/userguide/optimizing-performance.html"}>
{"https://docs.aws.amazon.com/AmazonS3/latest/userguide/optimizing-performance.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"DynamoDB Accelerator (DAX)"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.html"}>
{"https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"RDS Proxy"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html"}>
{"https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
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
{"AWS のデータベース(目的特化型)"}
</td>
<td>
{"\n                                    "}
<a href={"https://aws.amazon.com/products/databases/"}>
{"https://aws.amazon.com/products/databases/"}
</a>
{"\n                                "}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"task-26-コスト最適化"} tabIndex={-1}>
{"Task 2.6 コスト最適化"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 66：Task 2.6 コスト最適化"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"内容"}
</th>
<th scope="col">
{"URL"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"AWS Cost Explorer"}
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
{"AWS Cost Anomaly Detection"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/cost-management/latest/userguide/manage-ad.html"}>
{"https://docs.aws.amazon.com/cost-management/latest/userguide/manage-ad.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"コスト配分タグ"}
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
{"AWS Trusted Advisor"}
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
{"AWS Pricing Calculator"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/pricing-calculator/latest/userguide/what-is-pricing-calculator.html"}>
{"https://docs.aws.amazon.com/pricing-calculator/latest/userguide/what-is-pricing-calculator.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
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
<tr className={"even"}>
<td>
{"EC2 リザーブドインスタンス"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-reserved-instances.html"}>
{"https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-reserved-instances.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"EC2 スポットインスタンス"}
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
{"S3 ストレージクラス"}
</td>
<td>
{"\n                                    "}
<a href={"https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html"}>
{"https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html"}
</a>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"\n                                    ブログ: Overview of Data Transfer Costs for Common Architectures\n                                "}
</td>
<td>
{"\n                                    "}
<a href={"https://aws.amazon.com/blogs/architecture/overview-of-data-transfer-costs-for-common-architectures/"}>
{"https://aws.amazon.com/blogs/architecture/overview-of-data-transfer-costs-for-common-architectures/"}
</a>
{"\n                                "}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<hr />
{"\n                "}
<p>
{"\n                    "}
<em>
{"本ガイドは公式試験ガイド(Content Domain\n                        2)の出題項目に沿って作成した学習用資料です。AWS\n                        のサービス仕様・料金・クォータは随時変更されるため、最終的には上記の公式ドキュメントで最新情報を確認してください。"}
</em>
{"\n                "}
</p>
{"\n            "}
</>; }
