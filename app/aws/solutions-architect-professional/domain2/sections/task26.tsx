import { Diagram } from '../Diagram';
import type { ChecklistProps } from '../types';
/** 原本のtask26本文。 */
export default function Content({ progress, updateProgress }: ChecklistProps) { void progress; void updateProgress; return <>
<h2 id={"8-task-26-コスト最適化戦略の決定"} tabIndex={-1}>
{"8. Task 2.6 コスト最適化戦略の決定"}
</h2>
{"\n                "}
<p>
{"\n                    公式: 「Determine a cost optimization strategy to meet solution goals and\n                    objectives」\n                "}
</p>
{"\n                "}
<h3 id={"step-1-何を問われるか-5"} tabIndex={-1}>
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
{"\n                                    コスト/使用状況の監視ツール(Cost Explorer、Trusted\n                                    Advisor、Pricing Calculator)\n                                "}
</td>
{"\n                                "}
<td>
{"「いくら使っているか」「いくらかかるか」を知る道具"}
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
{"料金モデル(リザーブドインスタンス、Savings Plans)"}
</td>
{"\n                                "}
<td>
{"長期利用と引き換えに割引を得る契約"}
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
{"ストレージ階層化"}
</td>
{"\n                                "}
<td>
{"アクセス頻度に応じて安い置き場所へ移す"}
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
{"データ転送コスト"}
</td>
{"\n                                "}
<td>
{"通信にかかるお金の仕組み"}
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
{"マネージドサービスの提供形態"}
</td>
{"\n                                "}
<td>
{"運用コストも含めた総コストの考え方"}
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
{"\n                                    適切なサイズ/リソースの選定、料金モデルの選定、データ転送のモデリング、支出と使用状況の統制\n                                "}
</td>
{"\n                                "}
<td>
{"小さく、安く、使い過ぎを防ぐ"}
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
<h3 id={"step-2-a-コストの可視化と分析ツール"} tabIndex={-1}>
{"\n                    Step 2-A: コストの可視化と分析ツール\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：Step 2-A: コストの可視化と分析ツール"}>
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
{"AWS Cost Explorer"}
</td>
{"\n                                "}
<td>
{"\n                                    過去のコスト/使用量の分析と将来予測、Savings Plans/RI の推奨\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"AWS Budgets"}
</td>
{"\n                                "}
<td>
{"\n                                    予算を設定し、超過(予測含む)時に通知。"}
<strong>
{"アクション"}
</strong>
{"でポリシー適用やインスタンス停止も可能\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"AWS Cost Anomaly Detection"}
</td>
{"\n                                "}
<td>
{"機械学習で通常と異なる支出を検知して通知"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"AWS Cost and Usage Report / Data Exports"}
</td>
{"\n                                "}
<td>
{"最も詳細なコストデータ。Athena や QuickSight で分析"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"コスト配分タグ"}
</td>
{"\n                                "}
<td>
{"\n                                    タグ(部署、プロジェクト、環境)ごとにコストを集計。"}
<strong>
{"有効化が必要"}
</strong>
{"\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"AWS Trusted Advisor"}
</td>
{"\n                                "}
<td>
{"\n                                    コスト最適化の観点で、未使用/低利用リソースを指摘(利用可能なチェックはサポートプランによる)\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"AWS Compute Optimizer"}
</td>
{"\n                                "}
<td>
{"過剰プロビジョニングの検出とサイズ推奨"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"AWS Pricing Calculator"}
</td>
{"\n                                "}
<td>
<strong>
{"構築前に"}
</strong>
{"構成の費用を見積もる"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"AWS Organizations 一括請求"}
</td>
{"\n                                "}
<td>
{"\n                                    複数アカウントの料金を合算し、ボリューム割引や RI/Savings Plans\n                                    の共有を実現\n                                "}
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
<Diagram id="diag-18" label={"Step 2-A: コストの可視化と分析ツール"}/>
{"\n                "}
<h3 id={"step-2-b-料金モデルの選択"} tabIndex={-1}>
{"Step 2-B: 料金モデルの選択"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：Step 2-B: 料金モデルの選択"}>
{"\n                    "}
<table>
{"\n                        "}
<thead>
{"\n                            "}
<tr className={"header"}>
{"\n                                "}
<th scope="col">
{"モデル"}
</th>
{"\n                                "}
<th scope="col">
{"内容"}
</th>
{"\n                                "}
<th scope="col">
{"柔軟性"}
</th>
{"\n                                "}
<th scope="col">
{"向いている用途"}
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
{"オンデマンド"}
</td>
{"\n                                "}
<td>
{"使った分だけ。前払い・契約なし"}
</td>
{"\n                                "}
<td>
{"最高"}
</td>
{"\n                                "}
<td>
{"短期・予測不能・初期検証"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"Compute Savings Plans"}
</td>
{"\n                                "}
<td>
{"\n                                    1年/3年の使用量コミット(時間あたり金額)。"}
<strong>
{"EC2(ファミリー/サイズ/リージョン/OS\n                                        を問わず)、Fargate、Lambda"}
</strong>
{"\n                                    に適用\n                                "}
</td>
{"\n                                "}
<td>
{"高い"}
</td>
{"\n                                "}
<td>
{"構成が変わる可能性がある安定した利用"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"EC2 Instance Savings Plans"}
</td>
{"\n                                "}
<td>
{"\n                                    特定のリージョン・インスタンスファミリーに限定。割引率は高め\n                                "}
</td>
{"\n                                "}
<td>
{"中"}
</td>
{"\n                                "}
<td>
{"ファミリーが固定されたワークロード"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"EC2 リザーブドインスタンス (RI)"}
</td>
{"\n                                "}
<td>
{"\n                                    1年/3年。EC2\n                                    ではスタンダード(割引率が高い)と"}
<strong>
{"コンバーチブル"}
</strong>
{"(ファミリー変更可)の2クラス。リージョン\n                                    RI/ゾーン RI(容量予約付き)\n                                "}
</td>
{"\n                                "}
<td>
{"スタンダード: 低"}
</td>
{"\n                                "}
<td>
{"安定した EC2"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"\n                                    RDS リザーブド DB インスタンス / ElastiCache リザーブドノード\n                                "}
</td>
{"\n                                "}
<td>
{"\n                                    1年/3年。サービスごとの予約オファリング(EC2\n                                    のスタンダード/コンバーチブルの区分はない)。特定のエンジン・インスタンスクラス・リージョンに固定。ただしサイズ柔軟性があり、対象エンジンの\n                                    RDS\n                                    は同一リージョン・同一インスタンスクラスタイプ内、ElastiCache\n                                    は同一リージョン・同一ノードファミリー内であればサイズが変わっても割引が継続\n                                "}
</td>
{"\n                                "}
<td>
{"低"}
</td>
{"\n                                "}
<td>
{"構成が固定された安定した DB/キャッシュ"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"Database Savings Plans"}
</td>
{"\n                                "}
<td>
{"\n                                    1年の使用量コミット(時間あたり金額)。"}
<strong>
{"RDS、Aurora、DynamoDB、ElastiCache"}
</strong>
{"\n                                    などのデータベースサービスに横断適用。エンジン・インスタンスファミリー・サイズ・リージョン・プロビジョンド/サーバーレスの変更後も割引が継続\n                                "}
</td>
{"\n                                "}
<td>
{"高い"}
</td>
{"\n                                "}
<td>
{"\n                                    構成やサービスが変わる可能性がある安定した DB\n                                    利用。予約オファリングはサービス単位で構成固定\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"スポット"}
</td>
{"\n                                "}
<td>
{"\n                                    余剰容量を大幅割引で利用。"}
<strong>
{"2分前通知で中断される可能性"}
</strong>
{"\n                                "}
</td>
{"\n                                "}
<td>
{"低(中断あり)"}
</td>
{"\n                                "}
<td>
{"バッチ、CI、ビッグデータ、ステートレスで中断耐性がある処理"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"専有ホスト/インスタンス"}
</td>
{"\n                                "}
<td>
{"物理サーバー専有"}
</td>
{"\n                                "}
<td>
{"低"}
</td>
{"\n                                "}
<td>
{"BYOL ライセンス、コンプライアンス要件"}
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
{"\n                    具体的な割引率はリージョン・期間・支払い方法で変わるため、"}
<strong>
{"AWS の公式料金ページで確認"}
</strong>
{"してください(試験では「最も大きい割引」「最も柔軟」といった相対的な選択が中心です)。\n                "}
</p>
{"\n                "}
<Diagram id="diag-19" label={"Step 2-B: 料金モデルの選択"}/>
{"\n                "}
<p>
{"\n                    "}
<strong>
{"組み合わせの定石"}
</strong>
{": 「"}
<strong>
{"ベース負荷は Savings Plans/RI"}
</strong>
{"、"}
<strong>
{"変動分はオンデマンド"}
</strong>
{"、"}
<strong>
{"中断許容の処理はスポット"}
</strong>
{"」を\n                    Auto Scaling の混合インスタンスポリシーで実現します。\n                "}
</p>
{"\n                "}
<h3 id={"step-2-c-ストレージ階層化s3"} tabIndex={-1}>
{"Step 2-C: ストレージ階層化(S3)"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：Step 2-C: ストレージ階層化(S3)"}>
{"\n                    "}
<table>
{"\n                        "}
<thead>
{"\n                            "}
<tr className={"header"}>
{"\n                                "}
<th scope="col">
{"ストレージクラス"}
</th>
{"\n                                "}
<th scope="col">
{"アクセス頻度"}
</th>
{"\n                                "}
<th scope="col">
{"特徴"}
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
{"S3 Standard"}
</td>
{"\n                                "}
<td>
{"頻繁"}
</td>
{"\n                                "}
<td>
{"低レイテンシー、取得料金なし"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"S3 Intelligent-Tiering"}
</td>
{"\n                                "}
<td>
<strong>
{"不明/変動"}
</strong>
</td>
{"\n                                "}
<td>
{"\n                                    アクセスパターンに応じて"}
<strong>
{"自動で階層移動"}
</strong>
{"。取得料金なし(小さな監視・自動化料金あり)\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"S3 Standard-IA"}
</td>
{"\n                                "}
<td>
{"低頻度(ミリ秒取得)"}
</td>
{"\n                                "}
<td>
{"\n                                    保存は安いが"}
<strong>
{"取得料金・最低保存期間(30日)"}
</strong>
{"あり\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"S3 One Zone-IA"}
</td>
{"\n                                "}
<td>
{"低頻度・再作成可能"}
</td>
{"\n                                "}
<td>
<strong>
{"単一 AZ"}
</strong>
{"のため安いが可用性は低い"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"S3 Glacier Instant Retrieval"}
</td>
{"\n                                "}
<td>
{"四半期に1回程度"}
</td>
{"\n                                "}
<td>
{"アーカイブだがミリ秒で取得"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"S3 Glacier Flexible Retrieval"}
</td>
{"\n                                "}
<td>
{"年に数回"}
</td>
{"\n                                "}
<td>
{"数分〜数時間で取得"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"S3 Glacier Deep Archive"}
</td>
{"\n                                "}
<td>
{"ほぼ参照しない(長期保管)"}
</td>
{"\n                                "}
<td>
<strong>
{"最安"}
</strong>
{"。取得に12時間以上かかる"}
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
<Diagram id="diag-20" label={"Step 2-C: ストレージ階層化(S3)"}/>
{"\n                "}
<pre className="code-block" aria-label="json コード例">
<div className="code-line">
{"{"}
</div>
<div className="code-line">
{"  "}
<span className="hljs-attr">
{"\"Rules\""}
</span>
{": ["}
</div>
<div className="code-line">
{"    {"}
</div>
<div className="code-line">
{"      "}
<span className="hljs-attr">
{"\"ID\""}
</span>
{": "}
<span className="hljs-string">
{"\"tier-and-expire-logs\""}
</span>
{","}
</div>
<div className="code-line">
{"      "}
<span className="hljs-attr">
{"\"Status\""}
</span>
{": "}
<span className="hljs-string">
{"\"Enabled\""}
</span>
{","}
</div>
<div className="code-line">
{"      "}
<span className="hljs-attr">
{"\"Filter\""}
</span>
{": { "}
<span className="hljs-attr">
{"\"Prefix\""}
</span>
{": "}
<span className="hljs-string">
{"\"logs/\""}
</span>
{" },"}
</div>
<div className="code-line">
{"      "}
<span className="hljs-attr">
{"\"Transitions\""}
</span>
{": ["}
</div>
<div className="code-line">
{"        { "}
<span className="hljs-attr">
{"\"Days\""}
</span>
{": "}
<span className="hljs-number">
{"30"}
</span>
{",  "}
<span className="hljs-attr">
{"\"StorageClass\""}
</span>
{": "}
<span className="hljs-string">
{"\"STANDARD_IA\""}
</span>
{" },"}
</div>
<div className="code-line">
{"        { "}
<span className="hljs-attr">
{"\"Days\""}
</span>
{": "}
<span className="hljs-number">
{"90"}
</span>
{",  "}
<span className="hljs-attr">
{"\"StorageClass\""}
</span>
{": "}
<span className="hljs-string">
{"\"GLACIER\""}
</span>
{" },"}
</div>
<div className="code-line">
{"        { "}
<span className="hljs-attr">
{"\"Days\""}
</span>
{": "}
<span className="hljs-number">
{"365"}
</span>
{", "}
<span className="hljs-attr">
{"\"StorageClass\""}
</span>
{": "}
<span className="hljs-string">
{"\"DEEP_ARCHIVE\""}
</span>
{" }"}
</div>
<div className="code-line">
{"      ],"}
</div>
<div className="code-line">
{"      "}
<span className="hljs-attr">
{"\"Expiration\""}
</span>
{": { "}
<span className="hljs-attr">
{"\"Days\""}
</span>
{": "}
<span className="hljs-number">
{"2555"}
</span>
{" },"}
</div>
<div className="code-line">
{"      "}
<span className="hljs-attr">
{"\"AbortIncompleteMultipartUpload\""}
</span>
{": { "}
<span className="hljs-attr">
{"\"DaysAfterInitiation\""}
</span>
{": "}
<span className="hljs-number">
{"7"}
</span>
{" }"}
</div>
<div className="code-line">
{"    }"}
</div>
<div className="code-line">
{"  ]"}
</div>
<div className="code-line">
{"}"}
</div>
</pre>
{"\n                "}
<p>
{"\n                    "}
<strong>
{"128 KiB の最小移行サイズ"}
</strong>
{":\n                    ライフサイクルの移行(Transition)は既定で\n                    "}
<strong>
{"128 KiB 未満のオブジェクトを対象外"}
</strong>
{"とします。上の例では小さなログは S3 Standard\n                    に残り、有効期限(Expiration)による削除だけが適用されます。小さなオブジェクトも移行したい場合はフィルターに\n                    "}
<code>
{"ObjectSizeGreaterThan"}
</code>
{"/"}
<code>
{"ObjectSizeLessThan"}
</code>
{"\n                    を明示します(ただし移行リクエスト料金と最低課金サイズで逆に高くなる場合がある点に注意)。\n                "}
</p>
{"\n                "}
<p>
{"\n                    "}
<strong>
{"その他のストレージコスト最適化"}
</strong>
{": EBS\n                    は未使用ボリュームとスナップショットの整理、gp2 から gp3 への移行、EFS は\n                    EFS-IA/アーカイブへの"}
<strong>
{"ライフサイクル管理"}
</strong>
{"、S3\n                    は"}
<strong>
{"不完全なマルチパートアップロードの自動削除"}
</strong>
{"。\n                "}
</p>
{"\n                "}
<h3 id={"step-2-d-データ転送コスト"} tabIndex={-1}>
{"Step 2-D: データ転送コスト"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：Step 2-D: データ転送コスト"}>
{"\n                    "}
<table>
{"\n                        "}
<thead>
{"\n                            "}
<tr className={"header"}>
{"\n                                "}
<th scope="col">
{"通信"}
</th>
{"\n                                "}
<th scope="col">
{"一般的な課金の考え方"}
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
{"インターネットからの"}
<strong>
{"受信(イン)"}
</strong>
</td>
{"\n                                "}
<td>
{"原則"}
<strong>
{"無料"}
</strong>
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"インターネットへの"}
<strong>
{"送信(アウト)"}
</strong>
</td>
{"\n                                "}
<td>
<strong>
{"課金"}
</strong>
{"(量に応じた段階料金)"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"同一 AZ 内のプライベート IP 通信"}
</td>
{"\n                                "}
<td>
{"原則無料"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
<strong>
{"AZ 間"}
</strong>
{"の通信"}
</td>
{"\n                                "}
<td>
{"課金(Multi-AZ 設計では見落としがち)"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
<strong>
{"リージョン間"}
</strong>
{"の通信"}
</td>
{"\n                                "}
<td>
{"課金"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"NAT ゲートウェイ経由"}
</td>
{"\n                                "}
<td>
{"時間課金に加えて"}
<strong>
{"データ処理料金"}
</strong>
{"が発生"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"CloudFront 経由の配信"}
</td>
{"\n                                "}
<td>
{"\n                                    オリジン(AWS)から CloudFront\n                                    への転送は無料で、直接配信より安くなることが多い\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"Direct Connect"}
</td>
{"\n                                "}
<td>
{"\n                                    専用線のデータ転送(アウト)は通常のインターネット経由より低単価になりやすい\n                                "}
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
<Diagram id="diag-21" label={"Step 2-D: データ転送コスト"}/>
{"\n                "}
<p>
{"\n                    "}
<strong>
{"ひっかけ"}
</strong>
{": 「プライベートサブネットの EC2 から S3\n                    へ大量にアクセスして NAT ゲートウェイ料金が高い」→\n                    "}
<strong>
{"S3 ゲートウェイエンドポイント"}
</strong>
{"(無料)で解決。\n                "}
</p>
{"\n                "}
<h3 id={"step-2-e-マネージドサービスと総保有コストtco"} tabIndex={-1}>
{"\n                    Step 2-E: マネージドサービスと総保有コスト(TCO)\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：Step 2-E: マネージドサービスと総保有コスト(TCO)"}>
{"\n                    "}
<table>
{"\n                        "}
<thead>
{"\n                            "}
<tr className={"header"}>
{"\n                                "}
<th scope="col">
{"観点"}
</th>
{"\n                                "}
<th scope="col">
{"内容"}
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
{"単価だけで比べない"}
</td>
{"\n                                "}
<td>
{"\n                                    マネージドサービスは単価が高く見えても、"}
<strong>
{"運用人件費、パッチ、障害対応、冗長化"}
</strong>
{"の削減を含めた\n                                    TCO で判断する\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"サーバーレス"}
</td>
{"\n                                "}
<td>
{"\n                                    Lambda、Fargate、DynamoDB オンデマンド、Aurora Serverless\n                                    は"}
<strong>
{"使った分だけ"}
</strong>
{"課金。アイドル時間が多い/変動が大きい用途で有利。常時高負荷なら固定リソース+割引モデルが安い場合もある\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"適切なサービス選択"}
</td>
{"\n                                "}
<td>
{"\n                                    例: 小規模な定期バッチは EC2 常時起動より Lambda/EventBridge\n                                    スケジュール\n                                "}
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
<h3 id={"step-2-f-支出と使用状況の統制"} tabIndex={-1}>
{"Step 2-F: 支出と使用状況の統制"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：Step 2-F: 支出と使用状況の統制"}>
{"\n                    "}
<table>
{"\n                        "}
<thead>
{"\n                            "}
<tr className={"header"}>
{"\n                                "}
<th scope="col">
{"統制手段"}
</th>
{"\n                                "}
<th scope="col">
{"内容"}
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
{"Organizations の SCP"}
</td>
{"\n                                "}
<td>
{"高額なインスタンスタイプや不要なリージョンの利用を禁止"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"AWS Budgets アクション"}
</td>
{"\n                                "}
<td>
{"しきい値超過時に自動で IAM ポリシー適用や停止"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"タグポリシー + コスト配分タグ"}
</td>
{"\n                                "}
<td>
{"責任の所在を明確化(タグなしリソースを検出)"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"Service Catalog / IaC"}
</td>
{"\n                                "}
<td>
{"承認済み・サイズ制限付きの構成のみ提供"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"スケジュール停止"}
</td>
{"\n                                "}
<td>
{"\n                                    開発/検証環境を夜間・休日に停止(Systems Manager\n                                    Automation、Instance Scheduler)\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"未使用リソースの定期棚卸し"}
</td>
{"\n                                "}
<td>
{"\n                                    未接続 EBS、未使用 Elastic IP、アイドル\n                                    ELB、古いスナップショット\n                                "}
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
<h3 id={"step-3-task-26-試験のコツ"} tabIndex={-1}>
{"Step 3: Task 2.6 試験のコツ"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：Step 3: Task 2.6 試験のコツ"}>
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
{"「アクセスパターンが不明/変動する S3 データ」"}
</td>
{"\n                                "}
<td>
{"S3 Intelligent-Tiering"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"「中断可能なバッチ処理で最安」"}
</td>
{"\n                                "}
<td>
{"スポットインスタンス"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"「インスタンスタイプを変える可能性があるが割引を得たい」"}
</td>
{"\n                                "}
<td>
{"Compute Savings Plans / コンバーチブル RI"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"「構築前に費用を見積もる」"}
</td>
{"\n                                "}
<td>
{"Pricing Calculator"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"「予算超過を通知/自動対応」"}
</td>
{"\n                                "}
<td>
{"AWS Budgets(アクション)"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"「異常な支出を検知」"}
</td>
{"\n                                "}
<td>
{"Cost Anomaly Detection"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"「NAT ゲートウェイのデータ処理料金を削減」"}
</td>
{"\n                                "}
<td>
{"VPC エンドポイント(S3/DynamoDB はゲートウェイ型)"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"「長期保管で最安」"}
</td>
{"\n                                "}
<td>
{"S3 Glacier Deep Archive"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"「過剰スペックを見つけてサイズ変更」"}
</td>
{"\n                                "}
<td>
{"Compute Optimizer"}
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
