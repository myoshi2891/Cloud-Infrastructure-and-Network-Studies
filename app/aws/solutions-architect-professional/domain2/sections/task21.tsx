import { Diagram } from '../Diagram';
import type { ChecklistProps } from '../types';
/** 原本のtask21本文。 */
export default function Content({ progress, updateProgress }: ChecklistProps) { void progress; void updateProgress; return <>
<h2 id={"3-task-21-デプロイ戦略の設計"} tabIndex={-1}>
{"3. Task 2.1 デプロイ戦略の設計"}
</h2>
{"\n                "}
<p>
{"公式: 「Design a deployment strategy to meet business requirements」"}
</p>
{"\n                "}
<h3 id={"step-1-何を問われるか"} tabIndex={-1}>
{"Step 1: 何を問われるか"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：Step 1: 何を問われるか"}>
{"\n                    "}
<table>
{"\n                        "}
<thead>
{"\n                            "}
<tr className={"header"}>
{"\n                                "}
<th scope="col">
{"区分"}
</th>
{"\n                                "}
<th scope="col">
{"公式の項目"}
</th>
{"\n                                "}
<th scope="col">
{"やさしい言い換え"}
</th>
{"\n                            "}
</tr>
{"\n                        "}
</thead>
{"\n                        "}
<tbody>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"知識"}
</td>
{"\n                                "}
<td>
{"Infrastructure as code (CloudFormation など)"}
</td>
{"\n                                "}
<td>
{"インフラをコードで管理する方法"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"知識"}
</td>
{"\n                                "}
<td>
{"CI/CD"}
</td>
{"\n                                "}
<td>
{"コードの変更を自動でテスト・配布する仕組み"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"知識"}
</td>
{"\n                                "}
<td>
{"Change management processes"}
</td>
{"\n                                "}
<td>
{"変更を安全に管理するルール・手順"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"知識"}
</td>
{"\n                                "}
<td>
{"Configuration management tools (Systems Manager など)"}
</td>
{"\n                                "}
<td>
{"多数のサーバー設定を一括で管理する道具"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"スキル"}
</td>
{"\n                                "}
<td>
{"新サービス・機能への移行/アップグレード経路を決める"}
</td>
{"\n                                "}
<td>
{"古い構成から新しい構成へ、どう段階的に移るか"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"スキル"}
</td>
{"\n                                "}
<td>
{"デプロイ戦略とロールバック機構を選ぶ"}
</td>
{"\n                                "}
<td>
{"リリース方式と「元に戻す」手段の選択"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"スキル"}
</td>
{"\n                                "}
<td>
{"マネージドサービスで構築・パッチ負荷を減らす"}
</td>
{"\n                                "}
<td>
{"自前運用をやめてAWSに任せる判断"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"スキル"}
</td>
{"\n                                "}
<td>
{"高度な技術の開発・デプロイをAWSに委任する"}
</td>
{"\n                                "}
<td>
{"難しい部分(ML、コンテナ基盤など)をマネージドで代替"}
</td>
{"\n                            "}
</tr>
{"\n                        "}
</tbody>
{"\n                    "}
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"step-2-a-infrastructure-as-codeiac"} tabIndex={-1}>
{"\n                    Step 2-A: Infrastructure as Code(IaC)\n                "}
</h3>
{"\n                "}
<p>
{"\n                    "}
<strong>
{"IaC を使う理由"}
</strong>
{":\n                    手作業の構築は「人によって違う」「再現できない」「レビューできない」問題を生みます。コード化すると、Git\n                    で管理でき、同じ環境を何度でも作れ、DR 時の復旧も速くなります。\n                "}
</p>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：IaC を使う理由:\n                    手作業の構築は「人によって違う」「再現できない」「レビューできない」問題を生みます。コード化すると、Git\n                    で管理でき、同じ環境を何度でも作れ、DR 時の復旧も速くなります。"}>
{"\n                    "}
<table>
{"\n                        "}
<thead>
{"\n                            "}
<tr className={"header"}>
{"\n                                "}
<th scope="col">
{"ツール"}
</th>
{"\n                                "}
<th scope="col">
{"特徴"}
</th>
{"\n                                "}
<th scope="col">
{"使いどころ"}
</th>
{"\n                            "}
</tr>
{"\n                        "}
</thead>
{"\n                        "}
<tbody>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"AWS CloudFormation"}
</td>
{"\n                                "}
<td>
{"\n                                    JSON/YAML\n                                    のテンプレートでリソースを宣言。スタック単位で作成・更新・削除\n                                "}
</td>
{"\n                                "}
<td>
{"AWS の標準IaC。試験の中心"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"AWS CDK"}
</td>
{"\n                                "}
<td>
{"\n                                    TypeScript、Python\n                                    などのプログラミング言語で記述し、CloudFormation\n                                    テンプレートへ変換\n                                "}
</td>
{"\n                                "}
<td>
{"開発者がループや条件分岐を使いたい場合"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"AWS SAM"}
</td>
{"\n                                "}
<td>
{"サーバーレス向けの CloudFormation 拡張構文"}
</td>
{"\n                                "}
<td>
{"Lambda、API Gateway、DynamoDB 中心の構成"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"CloudFormation StackSets"}
</td>
{"\n                                "}
<td>
{"複数アカウント・複数リージョンへ同一スタックを展開"}
</td>
{"\n                                "}
<td>
{"組織全体への統制、マルチリージョン展開"}
</td>
{"\n                            "}
</tr>
{"\n                        "}
</tbody>
{"\n                    "}
</table>
{"\n                "}
</div>
{"\n                "}
<p>
<strong>
{"CloudFormation の重要機能"}
</strong>
</p>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：CloudFormation の重要機能"}>
{"\n                    "}
<table>
{"\n                        "}
<thead>
{"\n                            "}
<tr className={"header"}>
{"\n                                "}
<th scope="col">
{"機能"}
</th>
{"\n                                "}
<th scope="col">
{"何ができるか"}
</th>
{"\n                                "}
<th scope="col">
{"試験でのポイント"}
</th>
{"\n                            "}
</tr>
{"\n                        "}
</thead>
{"\n                        "}
<tbody>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"変更セット (Change Sets)"}
</td>
{"\n                                "}
<td>
{"更新を実行する前に「何が変わるか」をプレビュー"}
</td>
{"\n                                "}
<td>
{"本番更新の事前確認、置換(Replacement)の検知"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"ロールバック"}
</td>
{"\n                                "}
<td>
{"スタック作成/更新失敗時、自動で直前の状態へ戻す"}
</td>
{"\n                                "}
<td>
{"\n                                    既定でオン。ロールバックトリガーで CloudWatch\n                                    アラームを監視し、異常時に自動ロールバック可能\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"ドリフト検出"}
</td>
{"\n                                "}
<td>
{"手作業で変更された設定とテンプレートの差分を検出"}
</td>
{"\n                                "}
<td>
{"構成の逸脱検知"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"スタックポリシー"}
</td>
{"\n                                "}
<td>
{"重要リソースの意図しない更新を防ぐ"}
</td>
{"\n                                "}
<td>
{"DB など置換されると困るリソースの保護"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"DeletionPolicy"}
</td>
{"\n                                "}
<td>
{"\n                                    スタック削除時に\n                                    Retain(残す)/Snapshot(スナップショットを取る)/Delete を指定\n                                "}
</td>
{"\n                                "}
<td>
{"RDS や EBS のデータ保護"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"UpdatePolicy / CreationPolicy"}
</td>
{"\n                                "}
<td>
{"\n                                    Auto Scaling グループのローリング更新や、cfn-signal\n                                    による起動完了待ち\n                                "}
</td>
{"\n                                "}
<td>
{"EC2 の安全な更新"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"ネストスタック / クロススタック参照"}
</td>
{"\n                                "}
<td>
{"大きな構成を分割して再利用"}
</td>
{"\n                                "}
<td>
{"テンプレートの肥大化対策"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"StackSets"}
</td>
{"\n                                "}
<td>
{"複数アカウント/リージョンに展開"}
</td>
{"\n                                "}
<td>
{"Organizations と連携した統制"}
</td>
{"\n                            "}
</tr>
{"\n                        "}
</tbody>
{"\n                    "}
</table>
{"\n                "}
</div>
{"\n                "}
<pre className="code-block" aria-label="yaml コード例">
<div className="code-line">
{""}
<span className="hljs-comment">
{"# CloudFormation の例: DB を誤削除から守る"}
</span>
{""}
</div>
<div className="code-line">
{""}
<span className="hljs-attr">
{"Resources"}
</span>
{":"}
</div>
<div className="code-line">
{"  "}
<span className="hljs-attr">
{"AppDatabase"}
</span>
{":"}
</div>
<div className="code-line">
{"    "}
<span className="hljs-attr">
{"Type"}
</span>
{": "}
<span className="hljs-attr">
{"AWS"}
</span>
{"::"}
<span className="hljs-attr">
{"RDS"}
</span>
{"::DBInstance"}
</div>
<div className="code-line">
{"    "}
<span className="hljs-attr">
{"DeletionPolicy"}
</span>
{": Snapshot          "}
<span className="hljs-comment">
{"# スタック削除時にスナップショットを残す"}
</span>
{""}
</div>
<div className="code-line">
{"    "}
<span className="hljs-attr">
{"UpdateReplacePolicy"}
</span>
{": Snapshot     "}
<span className="hljs-comment">
{"# 置換(再作成)時にもスナップショットを残す"}
</span>
{""}
</div>
<div className="code-line">
{"    "}
<span className="hljs-attr">
{"Properties"}
</span>
{":"}
</div>
<div className="code-line">
{"      "}
<span className="hljs-attr">
{"Engine"}
</span>
{": mysql"}
</div>
<div className="code-line">
{"      "}
<span className="hljs-attr">
{"DBInstanceClass"}
</span>
{": db.m6g.large"}
</div>
<div className="code-line">
{"      "}
<span className="hljs-attr">
{"AllocatedStorage"}
</span>
{": "}
<span className="hljs-string">
{"\"100\""}
</span>
{""}
</div>
<div className="code-line">
{"      "}
<span className="hljs-attr">
{"MultiAZ"}
</span>
{": "}
<span className="hljs-literal">
{"true"}
</span>
{""}
</div>
<div className="code-line">
{"      "}
<span className="hljs-attr">
{"StorageEncrypted"}
</span>
{": "}
<span className="hljs-literal">
{"true"}
</span>
{""}
</div>
<div className="code-line">
{"      "}
<span className="hljs-attr">
{"MasterUsername"}
</span>
{": "}
<span className="hljs-string">
{"\"{{resolve:secretsmanager:prod/db:SecretString:username}}\""}
</span>
{""}
</div>
<div className="code-line">
{"      "}
<span className="hljs-attr">
{"MasterUserPassword"}
</span>
{": "}
<span className="hljs-string">
{"\"{{resolve:secretsmanager:prod/db:SecretString:password}}\""}
</span>
{""}
</div>
</pre>
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
{"IaC のベストプラクティス"}
</div>
{"\n                        "}
<ul>
{"\n                            "}
<li>
{"\n                                テンプレートを Git で管理し、"}
<strong>
{"変更セットと自動テスト(cfn-lint、cfn-guard など)を CI\n                                    に組み込む"}
</strong>
{"\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                1つの巨大スタックにせず、"}
<strong>
{"ライフサイクルが同じリソースごと"}
</strong>
{"(ネットワーク層、データ層、アプリ層)に分割する\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                パスワード等の秘密情報は"}
<strong>
{"テンプレートに直書きせず"}
</strong>
{"、Secrets\n                                Manager や Parameter Store の動的参照を使う\n                            "}
</li>
{"\n                            "}
<li>
{"本番リソースには DeletionPolicy とスタックポリシーを設定する"}
</li>
{"\n                            "}
<li>
{"手作業の変更を避け、"}
<strong>
{"ドリフト検出"}
</strong>
{"を定期実行する"}
</li>
{"\n                        "}
</ul>
{"\n                    "}
</div>
{"\n                "}
</div>
{"\n                "}
<h3 id={"step-2-b-cicd継続的インテグレーション継続的デリバリー"} tabIndex={-1}>
{"\n                    Step 2-B: CI/CD(継続的インテグレーション/継続的デリバリー)\n                "}
</h3>
{"\n                "}
<Diagram id="diag-1" label={"Step 2-B: CI/CD(継続的インテグレーション/継続的デリバリー)"}/>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：flowchart LR\n    A[\"コード変更<br/>CodeCommit または GitHub\"] --> B[\"Source<br/>CodePipeline\"]\n    B --> C[\"Build and Test<br/>CodeBuild\"]\n    C --> D[\"Deploy<br/>CodeDeploy または CloudFormation\"]\n    D --> E{\"ヘルスチェック<br/>CloudWatch アラーム\"}\n    E -->|\"正常\"| F[\"本番反映完了\"]\n    E -->|\"異常\"| G[\"自動ロールバック\"]\n\n    classDef dangerFill fill:#ffdfe5,stroke:#c0213f,color:#5c1020;\n    classDef successFill fill:#d7f1e2,stroke:#1d7f4e,color:#0f3d26;\n    class G dangerFill\n    class F successFill"}>
{"\n                    "}
<table>
{"\n                        "}
<thead>
{"\n                            "}
<tr className={"header"}>
{"\n                                "}
<th scope="col">
{"サービス"}
</th>
{"\n                                "}
<th scope="col">
{"役割"}
</th>
{"\n                            "}
</tr>
{"\n                        "}
</thead>
{"\n                        "}
<tbody>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"AWS CodePipeline"}
</td>
{"\n                                "}
<td>
{"\n                                    ソース取得からデプロイまでのパイプライン全体を自動化(オーケストレーション)\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"AWS CodeBuild"}
</td>
{"\n                                "}
<td>
{"ビルド・テストを実行するフルマネージドなビルドサービス"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"AWS CodeDeploy"}
</td>
{"\n                                "}
<td>
{"\n                                    EC2、オンプレミス、Lambda、ECS\n                                    へのデプロイを自動化し、ロールバックも可能\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"AWS Elastic Beanstalk"}
</td>
{"\n                                "}
<td>
{"\n                                    コードを置くだけで環境(EC2、ELB、Auto\n                                    Scaling)を管理してくれるPaaS的サービス\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"Amazon ECR"}
</td>
{"\n                                "}
<td>
{"コンテナイメージのレジストリ"}
</td>
{"\n                            "}
</tr>
{"\n                        "}
</tbody>
{"\n                    "}
</table>
{"\n                "}
</div>
{"\n                "}
<p>
{"\n                    "}
<strong>
{"補足"}
</strong>
{": CodeCommit は一時期新規受付を停止していましたが、AWS は\n                    2025 年 11 月 25 日に新規サインアップを再開しており、新規顧客も利用できます。\n                "}
</p>
{"\n                "}
<h4>
{"デプロイ方式の比較(最重要)"}
</h4>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：デプロイ方式の比較(最重要)"}>
{"\n                    "}
<table>
{"\n                        "}
<thead>
{"\n                            "}
<tr className={"header"}>
{"\n                                "}
<th scope="col">
{"方式"}
</th>
{"\n                                "}
<th scope="col">
{"仕組み"}
</th>
{"\n                                "}
<th scope="col">
{"ダウンタイム"}
</th>
{"\n                                "}
<th scope="col">
{"ロールバックの速さ"}
</th>
{"\n                                "}
<th scope="col">
{"追加コスト"}
</th>
{"\n                                "}
<th scope="col">
{"向いている場面"}
</th>
{"\n                            "}
</tr>
{"\n                        "}
</thead>
{"\n                        "}
<tbody>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"All at once(一斉)"}
</td>
{"\n                                "}
<td>
{"全台を一度に更新"}
</td>
{"\n                                "}
<td>
{"あり"}
</td>
{"\n                                "}
<td>
{"遅い(再デプロイ)"}
</td>
{"\n                                "}
<td>
{"なし"}
</td>
{"\n                                "}
<td>
{"開発環境、停止を許容できる場合"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"Rolling(ローリング)"}
</td>
{"\n                                "}
<td>
{"数台ずつ順に更新"}
</td>
{"\n                                "}
<td>
{"なし/小(一時的に容量低下)"}
</td>
{"\n                                "}
<td>
{"遅い"}
</td>
{"\n                                "}
<td>
{"なし"}
</td>
{"\n                                "}
<td>
{"容量低下を許容できる通常のサービス"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"Rolling with additional batch"}
</td>
{"\n                                "}
<td>
{"追加の台数を用意してから順次更新"}
</td>
{"\n                                "}
<td>
{"なし(容量維持)"}
</td>
{"\n                                "}
<td>
{"遅い"}
</td>
{"\n                                "}
<td>
{"少し発生"}
</td>
{"\n                                "}
<td>
{"容量を落とせないサービス"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"Immutable(不変)"}
</td>
{"\n                                "}
<td>
{"新しい Auto Scaling グループに全て新規作成し、成功後に切替"}
</td>
{"\n                                "}
<td>
{"なし"}
</td>
{"\n                                "}
<td>
{"速い(旧環境を破棄するだけ)"}
</td>
{"\n                                "}
<td>
{"一時的に2倍"}
</td>
{"\n                                "}
<td>
{"安全性重視"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"Blue/Green"}
</td>
{"\n                                "}
<td>
{"旧(Blue)と新(Green)の2環境を用意し、トラフィックを切替"}
</td>
{"\n                                "}
<td>
{"なし"}
</td>
{"\n                                "}
<td>
{"非常に速い(切り戻すだけ)"}
</td>
{"\n                                "}
<td>
{"一時的に2倍"}
</td>
{"\n                                "}
<td>
{"ダウンタイムとリスクを最小化したい場合"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"Canary"}
</td>
{"\n                                "}
<td>
{"少量(例 10%)に先に新版を流し、問題なければ全体へ"}
</td>
{"\n                                "}
<td>
{"なし"}
</td>
{"\n                                "}
<td>
{"速い"}
</td>
{"\n                                "}
<td>
{"小"}
</td>
{"\n                                "}
<td>
{"影響範囲を限定して検証したい場合"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"Linear"}
</td>
{"\n                                "}
<td>
{"一定間隔で一定割合ずつトラフィックを移行"}
</td>
{"\n                                "}
<td>
{"なし"}
</td>
{"\n                                "}
<td>
{"速い"}
</td>
{"\n                                "}
<td>
{"小"}
</td>
{"\n                                "}
<td>
{"段階的に慎重に移行したい場合"}
</td>
{"\n                            "}
</tr>
{"\n                        "}
</tbody>
{"\n                    "}
</table>
{"\n                "}
</div>
{"\n                "}
<Diagram id="diag-2" label={"デプロイ方式の比較(最重要)"}/>
{"\n                "}
<p>
<strong>
{"サービス別の代表的なデプロイ手段"}
</strong>
</p>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：サービス別の代表的なデプロイ手段"}>
{"\n                    "}
<table>
{"\n                        "}
<thead>
{"\n                            "}
<tr className={"header"}>
{"\n                                "}
<th scope="col">
{"対象"}
</th>
{"\n                                "}
<th scope="col">
{"使える方式"}
</th>
{"\n                                "}
<th scope="col">
{"補足"}
</th>
{"\n                            "}
</tr>
{"\n                        "}
</thead>
{"\n                        "}
<tbody>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"EC2 / オンプレミス"}
</td>
{"\n                                "}
<td>
{"CodeDeploy の In-place(ローリング相当)、Blue/Green"}
</td>
{"\n                                "}
<td>
{"設定例: OneAtATime、HalfAtATime、AllAtOnce"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"Lambda"}
</td>
{"\n                                "}
<td>
{"\n                                    CodeDeploy + エイリアスの重み付け(Canary、Linear、AllAtOnce)\n                                "}
</td>
{"\n                                "}
<td>
{"SAM の "}
<code>
{"DeploymentPreference"}
</code>
{" で簡単に設定可能"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"ECS"}
</td>
{"\n                                "}
<td>
{"\n                                    CodeDeploy の Blue/Green(Canary、Linear、AllAtOnce)、ECS\n                                    のローリング更新\n                                "}
</td>
{"\n                                "}
<td>
{"ECS サービス自体の組み込みデプロイ機能も利用可能"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"Elastic Beanstalk"}
</td>
{"\n                                "}
<td>
{"\n                                    All at once、Rolling、Rolling with additional\n                                    batch、Immutable、Traffic splitting\n                                "}
</td>
{"\n                                "}
<td>
{"環境の置換(Blue/Green 風)は CNAME スワップで実現"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"API Gateway"}
</td>
{"\n                                "}
<td>
{"カナリアリリース"}
</td>
{"\n                                "}
<td>
{"ステージ単位で一部トラフィックを新版へ"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"DNS 切替"}
</td>
{"\n                                "}
<td>
{"Route 53 の加重ルーティング"}
</td>
{"\n                                "}
<td>
{"全体の Blue/Green を DNS で実現"}
</td>
{"\n                            "}
</tr>
{"\n                        "}
</tbody>
{"\n                    "}
</table>
{"\n                "}
</div>
{"\n                "}
<pre className="code-block" aria-label="yaml コード例">
<div className="code-line">
{""}
<span className="hljs-comment">
{"# SAM の例: Lambda を 10% → 全体へ段階移行し、アラームで自動ロールバック"}
</span>
{""}
</div>
<div className="code-line">
{""}
<span className="hljs-attr">
{"Resources"}
</span>
{":"}
</div>
<div className="code-line">
{"  "}
<span className="hljs-attr">
{"OrderFunction"}
</span>
{":"}
</div>
<div className="code-line">
{"    "}
<span className="hljs-attr">
{"Type"}
</span>
{": "}
<span className="hljs-attr">
{"AWS"}
</span>
{"::"}
<span className="hljs-attr">
{"Serverless"}
</span>
{"::Function"}
</div>
<div className="code-line">
{"    "}
<span className="hljs-attr">
{"Properties"}
</span>
{":"}
</div>
<div className="code-line">
{"      "}
<span className="hljs-attr">
{"Runtime"}
</span>
{": python3."}
<span className="hljs-number">
{"13"}
</span>
{""}
</div>
<div className="code-line">
{"      "}
<span className="hljs-attr">
{"Handler"}
</span>
{": app.handler"}
</div>
<div className="code-line">
{"      "}
<span className="hljs-attr">
{"AutoPublishAlias"}
</span>
{": live"}
</div>
<div className="code-line">
{"      "}
<span className="hljs-attr">
{"DeploymentPreference"}
</span>
{":"}
</div>
<div className="code-line">
{"        "}
<span className="hljs-attr">
{"Type"}
</span>
{": Canary10Percent5Minutes     "}
<span className="hljs-comment">
{"# 10% を5分間試してから残りを移行"}
</span>
{""}
</div>
<div className="code-line">
{"        "}
<span className="hljs-attr">
{"Alarms"}
</span>
{":"}
</div>
<div className="code-line">
{"          - "}
<span className="hljs-literal">
{"!Ref"}
</span>
{" ErrorRateAlarm           "}
<span className="hljs-comment">
{"# このアラームが鳴ったら自動ロールバック"}
</span>
{""}
</div>
</pre>
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
{"CI/CD のベストプラクティス"}
</div>
{"\n                        "}
<ul>
{"\n                            "}
<li>
{"\n                                "}
<strong>
{"すべての変更をパイプライン経由"}
</strong>
{"にし、本番への手作業を禁止する\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                パイプラインに"}
<strong>
{"自動テスト(単体、統合、セキュリティスキャン)"}
</strong>
{"を組み込み、承認ステージは本番前に置く\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                デプロイ後は\n                                "}
<strong>
{"CloudWatch アラームと連携した自動ロールバック"}
</strong>
{"を設定する\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                ビルド成果物(アーティファクト)は"}
<strong>
{"バージョン管理し、同じ成果物を各環境で再利用"}
</strong>
{"する(環境ごとに作り直さない)\n                            "}
</li>
{"\n                            "}
<li>
{"パイプライン用 IAM ロールは"}
<strong>
{"最小権限"}
</strong>
{"にする"}
</li>
{"\n                        "}
</ul>
{"\n                    "}
</div>
{"\n                "}
</div>
{"\n                "}
<h3 id={"step-2-c-変更管理change-management"} tabIndex={-1}>
{"\n                    Step 2-C: 変更管理(Change Management)\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：Step 2-C: 変更管理(Change Management)"}>
{"\n                    "}
<table>
{"\n                        "}
<thead>
{"\n                            "}
<tr className={"header"}>
{"\n                                "}
<th scope="col">
{"サービス"}
</th>
{"\n                                "}
<th scope="col">
{"役割"}
</th>
{"\n                            "}
</tr>
{"\n                        "}
</thead>
{"\n                        "}
<tbody>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"AWS Systems Manager Change Manager"}
</td>
{"\n                                "}
<td>
{"\n                                    変更リクエストの承認フローと実行履歴を管理(2025 年 11 月 7\n                                    日に新規顧客の受付を終了。既存顧客は引き続き利用可能)\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"AWS CloudTrail"}
</td>
{"\n                                "}
<td>
{"「誰が、いつ、何をしたか」の API 操作ログ"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"AWS Config"}
</td>
{"\n                                "}
<td>
{"リソース構成の履歴記録と、ルールによる準拠性評価"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"AWS Service Catalog"}
</td>
{"\n                                "}
<td>
{"承認済みテンプレート(製品)のみを利用者に提供し、構成を統制"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"AWS Control Tower / Organizations(SCP)"}
</td>
{"\n                                "}
<td>
{"組織全体のガードレール(Domain 1 で詳述)"}
</td>
{"\n                            "}
</tr>
{"\n                        "}
</tbody>
{"\n                    "}
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
<p>
{"\n                            変更は「申請 → レビュー → 承認 → 自動デプロイ →\n                            記録」の流れにし、CloudTrail と Config\n                            で"}
<strong>
{"変更の証跡と逸脱の検知"}
</strong>
{"を残します。\n                        "}
</p>
{"\n                    "}
</div>
{"\n                "}
</div>
{"\n                "}
<h3 id={"step-2-d-構成管理aws-systems-manager"} tabIndex={-1}>
{"\n                    Step 2-D: 構成管理(AWS Systems Manager)\n                "}
</h3>
{"\n                "}
<p>
{"\n                    Systems Manager は、多数のサーバー(EC2\n                    やオンプレミス)を"}
<strong>
{"まとめて管理する運用ハブ"}
</strong>
{"です。\n                "}
</p>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：Systems Manager は、多数のサーバー(EC2\n                    やオンプレミス)をまとめて管理する運用ハブです。"}>
{"\n                    "}
<table>
{"\n                        "}
<thead>
{"\n                            "}
<tr className={"header"}>
{"\n                                "}
<th scope="col">
{"機能"}
</th>
{"\n                                "}
<th scope="col">
{"できること"}
</th>
{"\n                                "}
<th scope="col">
{"例"}
</th>
{"\n                            "}
</tr>
{"\n                        "}
</thead>
{"\n                        "}
<tbody>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"Parameter Store"}
</td>
{"\n                                "}
<td>
{"設定値や秘密情報を階層的に保存。SecureString で KMS 暗号化"}
</td>
{"\n                                "}
<td>
<code>
{"/prod/app/db_host"}
</code>
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"State Manager"}
</td>
{"\n                                "}
<td>
{"望ましい状態(エージェント導入、設定)を維持"}
</td>
{"\n                                "}
<td>
{"全サーバーにエージェントを常に入れる"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"Patch Manager"}
</td>
{"\n                                "}
<td>
{"パッチのスキャンと適用を自動化"}
</td>
{"\n                                "}
<td>
{"毎週日曜夜にパッチ適用"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"Run Command"}
</td>
{"\n                                "}
<td>
{"多数のサーバーでコマンドを一斉実行(SSH 不要)"}
</td>
{"\n                                "}
<td>
{"緊急の設定変更"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"Automation"}
</td>
{"\n                                "}
<td>
{"運用手順(Runbook)を自動化"}
</td>
{"\n                                "}
<td>
{"AMI 作成、障害復旧手順の自動化"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"Session Manager"}
</td>
{"\n                                "}
<td>
{"\n                                    SSH キーや踏み台なしで、IAM 認可でシェル接続。操作ログも記録可能\n                                "}
</td>
{"\n                                "}
<td>
{"セキュアな運用接続"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"AppConfig"}
</td>
{"\n                                "}
<td>
{"\n                                    アプリ設定や機能フラグを段階的に配信し、アラーム連携でロールバック\n                                "}
</td>
{"\n                                "}
<td>
{"設定変更の安全な展開"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"Inventory"}
</td>
{"\n                                "}
<td>
{"ソフトウェア一覧などのメタデータ収集"}
</td>
{"\n                                "}
<td>
{"構成の可視化"}
</td>
{"\n                            "}
</tr>
{"\n                        "}
</tbody>
{"\n                    "}
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
<p>
{"\n                            SSH/RDP の直接公開をやめて\n                            "}
<strong>
{"Session Manager"}
</strong>
{" を使う、設定は\n                            "}
<strong>
{"Parameter Store"}
</strong>
{" に外出しする、パッチは\n                            "}
<strong>
{"Patch Manager とメンテナンスウィンドウ"}
</strong>
{"で計画的に適用する。\n                        "}
</p>
{"\n                    "}
</div>
{"\n                "}
</div>
{"\n                "}
<h3 id={"step-2-e-移行アップグレード経路とマネージドサービス活用"} tabIndex={-1}>
{"\n                    Step 2-E: 移行/アップグレード経路とマネージドサービス活用\n                "}
</h3>
{"\n                "}
<p>
{"\n                    "}
<strong>
{"「自前で運用」から「AWS に任せる」へ"}
</strong>
{":\n                    運用負荷(プロビジョニング、パッチ適用、冗長化)を減らす判断が頻出です。\n                "}
</p>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：「自前で運用」から「AWS に任せる」へ:\n                    運用負荷(プロビジョニング、パッチ適用、冗長化)を減らす判断が頻出です。"}>
{"\n                    "}
<table>
{"\n                        "}
<thead>
{"\n                            "}
<tr className={"header"}>
{"\n                                "}
<th scope="col">
{"自前で運用している構成"}
</th>
{"\n                                "}
<th scope="col">
{"マネージドへの置き換え"}
</th>
{"\n                                "}
<th scope="col">
{"得られる効果"}
</th>
{"\n                            "}
</tr>
{"\n                        "}
</thead>
{"\n                        "}
<tbody>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"EC2 に入れた MySQL/PostgreSQL"}
</td>
{"\n                                "}
<td>
{"Amazon RDS / Aurora"}
</td>
{"\n                                "}
<td>
{"バックアップ、パッチ、Multi-AZ を自動化"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"EC2 上の Docker 管理"}
</td>
{"\n                                "}
<td>
{"ECS / EKS + Fargate"}
</td>
{"\n                                "}
<td>
{"サーバー管理が不要になる"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"自前のメッセージブローカー"}
</td>
{"\n                                "}
<td>
{"Amazon SQS / SNS / Amazon MQ"}
</td>
{"\n                                "}
<td>
{"運用不要・高可用"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"EC2 上のバッチ/イベント処理"}
</td>
{"\n                                "}
<td>
{"Lambda / Step Functions"}
</td>
{"\n                                "}
<td>
{"サーバーレスで従量課金"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"自前の Redis/Memcached"}
</td>
{"\n                                "}
<td>
{"ElastiCache"}
</td>
{"\n                                "}
<td>
{"管理・フェイルオーバー自動化"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"自前の機械学習基盤"}
</td>
{"\n                                "}
<td>
{"Amazon SageMaker AI / Amazon Bedrock"}
</td>
{"\n                                "}
<td>
{"複雑な基盤構築をAWSに委任"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"自前の Elasticsearch"}
</td>
{"\n                                "}
<td>
{"Amazon OpenSearch Service"}
</td>
{"\n                                "}
<td>
{"クラスター運用の削減"}
</td>
{"\n                            "}
</tr>
{"\n                        "}
</tbody>
{"\n                    "}
</table>
{"\n                "}
</div>
{"\n                "}
<p>
<strong>
{"段階的な移行経路の考え方"}
</strong>
</p>
{"\n                "}
<Diagram id="diag-3" label={"Step 2-E: 移行/アップグレード経路とマネージドサービス活用"}/>
{"\n                "}
<h3 id={"step-3-task-21-試験のコツ"} tabIndex={-1}>
{"Step 3: Task 2.1 試験のコツ"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：Step 3: Task 2.1 試験のコツ"}>
{"\n                    "}
<table>
{"\n                        "}
<thead>
{"\n                            "}
<tr className={"header"}>
{"\n                                "}
<th scope="col">
{"問題文のキーワード"}
</th>
{"\n                                "}
<th scope="col">
{"選ぶべき方向性"}
</th>
{"\n                            "}
</tr>
{"\n                        "}
</thead>
{"\n                        "}
<tbody>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"「ダウンタイムなし」「即時ロールバック」"}
</td>
{"\n                                "}
<td>
{"Blue/Green、Immutable、Canary"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"「追加コストを抑えて」"}
</td>
{"\n                                "}
<td>
{"Rolling(Blue/Green や Immutable は一時的に2倍)"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"「複数アカウント/リージョンに同一構成」"}
</td>
{"\n                                "}
<td>
{"CloudFormation StackSets"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"「更新前に影響を確認」"}
</td>
{"\n                                "}
<td>
{"CloudFormation 変更セット"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"「手作業の変更を検出」"}
</td>
{"\n                                "}
<td>
{"CloudFormation ドリフト検出、AWS Config"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"「SSH を開けずにサーバー管理」"}
</td>
{"\n                                "}
<td>
{"Systems Manager Session Manager"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"「運用負荷を最小に」"}
</td>
{"\n                                "}
<td>
{"マネージドサービス(RDS、Fargate、Lambda など)"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"「アラームが鳴ったら自動で戻す」"}
</td>
{"\n                                "}
<td>
{"\n                                    CodeDeploy + CloudWatch アラーム、CloudFormation\n                                    ロールバックトリガー\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                        "}
</tbody>
{"\n                    "}
</table>
{"\n                "}
</div>
{"\n                "}
<hr />
{"\n                "}
</>; }
