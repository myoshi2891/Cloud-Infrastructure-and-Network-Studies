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
<thead>
<tr className={"header"}>
<th scope="col">
{"区分"}
</th>
<th scope="col">
{"公式の項目"}
</th>
<th scope="col">
{"やさしい言い換え"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"知識"}
</td>
<td>
{"\n                                    コスト/使用状況の監視ツール(Cost Explorer、Trusted\n                                    Advisor、Pricing Calculator)\n                                "}
</td>
<td>
{"「いくら使っているか」「いくらかかるか」を知る道具"}
</td>
</tr>
<tr className={"even"}>
<td>
{"知識"}
</td>
<td>
{"料金モデル(リザーブドインスタンス、Savings Plans)"}
</td>
<td>
{"長期利用と引き換えに割引を得る契約"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"知識"}
</td>
<td>
{"ストレージ階層化"}
</td>
<td>
{"アクセス頻度に応じて安い置き場所へ移す"}
</td>
</tr>
<tr className={"even"}>
<td>
{"知識"}
</td>
<td>
{"データ転送コスト"}
</td>
<td>
{"通信にかかるお金の仕組み"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"知識"}
</td>
<td>
{"マネージドサービスの提供形態"}
</td>
<td>
{"運用コストも含めた総コストの考え方"}
</td>
</tr>
<tr className={"even"}>
<td>
{"スキル"}
</td>
<td>
{"\n                                    適切なサイズ/リソースの選定、料金モデルの選定、データ転送のモデリング、支出と使用状況の統制\n                                "}
</td>
<td>
{"小さく、安く、使い過ぎを防ぐ"}
</td>
</tr>
</tbody>
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
<thead>
<tr className={"header"}>
<th scope="col">
{"ツール"}
</th>
<th scope="col">
{"役割"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"AWS Cost Explorer"}
</td>
<td>
{"\n                                    過去のコスト/使用量の分析と将来予測、Savings Plans/RI の推奨\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"AWS Budgets"}
</td>
<td>
{"\n                                    予算を設定し、超過(予測含む)時に通知。"}
<strong>
{"アクション"}
</strong>
{"でポリシー適用やインスタンス停止も可能\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"AWS Cost Anomaly Detection"}
</td>
<td>
{"機械学習で通常と異なる支出を検知して通知"}
</td>
</tr>
<tr className={"even"}>
<td>
{"AWS Cost and Usage Report / Data Exports"}
</td>
<td>
{"最も詳細なコストデータ。Athena や QuickSight で分析"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"コスト配分タグ"}
</td>
<td>
{"\n                                    タグ(部署、プロジェクト、環境)ごとにコストを集計。"}
<strong>
{"有効化が必要"}
</strong>
{"\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"AWS Trusted Advisor"}
</td>
<td>
{"\n                                    コスト最適化の観点で、未使用/低利用リソースを指摘(利用可能なチェックはサポートプランによる)\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"AWS Compute Optimizer"}
</td>
<td>
{"過剰プロビジョニングの検出とサイズ推奨"}
</td>
</tr>
<tr className={"even"}>
<td>
{"AWS Pricing Calculator"}
</td>
<td>
<strong>
{"構築前に"}
</strong>
{"構成の費用を見積もる"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"AWS Organizations 一括請求"}
</td>
<td>
{"\n                                    複数アカウントの料金を合算し、ボリューム割引や RI/Savings Plans\n                                    の共有を実現\n                                "}
</td>
</tr>
</tbody>
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
<thead>
<tr className={"header"}>
<th scope="col">
{"モデル"}
</th>
<th scope="col">
{"内容"}
</th>
<th scope="col">
{"柔軟性"}
</th>
<th scope="col">
{"向いている用途"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"オンデマンド"}
</td>
<td>
{"使った分だけ。前払い・契約なし"}
</td>
<td>
{"最高"}
</td>
<td>
{"短期・予測不能・初期検証"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Compute Savings Plans"}
</td>
<td>
{"\n                                    1年/3年の使用量コミット(時間あたり金額)。"}
<strong>
{"EC2(ファミリー/サイズ/リージョン/OS\n                                        を問わず)、Fargate、Lambda"}
</strong>
{"\n                                    に適用\n                                "}
</td>
<td>
{"高い"}
</td>
<td>
{"構成が変わる可能性がある安定した利用"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"EC2 Instance Savings Plans"}
</td>
<td>
{"\n                                    特定のリージョン・インスタンスファミリーに限定。割引率は高め\n                                "}
</td>
<td>
{"中"}
</td>
<td>
{"ファミリーが固定されたワークロード"}
</td>
</tr>
<tr className={"even"}>
<td>
{"EC2 リザーブドインスタンス (RI)"}
</td>
<td>
{"\n                                    1年/3年。EC2\n                                    ではスタンダード(割引率が高い)と"}
<strong>
{"コンバーチブル"}
</strong>
{"(ファミリー変更可)の2クラス。リージョン\n                                    RI/ゾーン RI(容量予約付き)\n                                "}
</td>
<td>
{"スタンダード: 低"}
</td>
<td>
{"安定した EC2"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"\n                                    RDS リザーブド DB インスタンス / ElastiCache リザーブドノード\n                                "}
</td>
<td>
{"\n                                    1年/3年。サービスごとの予約オファリング(EC2\n                                    のスタンダード/コンバーチブルの区分はない)。特定のエンジン・インスタンスクラス・リージョンに固定。ただしサイズ柔軟性があり、対象エンジンの\n                                    RDS\n                                    は同一リージョン・同一インスタンスクラスタイプ内、ElastiCache\n                                    は同一リージョン・同一ノードファミリー内であればサイズが変わっても割引が継続\n                                "}
</td>
<td>
{"低"}
</td>
<td>
{"構成が固定された安定した DB/キャッシュ"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Database Savings Plans"}
</td>
<td>
{"\n                                    1年の使用量コミット(時間あたり金額)。"}
<strong>
{"RDS、Aurora、DynamoDB、ElastiCache"}
</strong>
{"\n                                    などのデータベースサービスに横断適用。エンジン・インスタンスファミリー・サイズ・リージョン・プロビジョンド/サーバーレスの変更後も割引が継続\n                                "}
</td>
<td>
{"高い"}
</td>
<td>
{"\n                                    構成やサービスが変わる可能性がある安定した DB\n                                    利用。予約オファリングはサービス単位で構成固定\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"スポット"}
</td>
<td>
{"\n                                    余剰容量を大幅割引で利用。"}
<strong>
{"2分前通知で中断される可能性"}
</strong>
{"\n                                "}
</td>
<td>
{"低(中断あり)"}
</td>
<td>
{"バッチ、CI、ビッグデータ、ステートレスで中断耐性がある処理"}
</td>
</tr>
<tr className={"even"}>
<td>
{"専有ホスト/インスタンス"}
</td>
<td>
{"物理サーバー専有"}
</td>
<td>
{"低"}
</td>
<td>
{"BYOL ライセンス、コンプライアンス要件"}
</td>
</tr>
</tbody>
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
<thead>
<tr className={"header"}>
<th scope="col">
{"ストレージクラス"}
</th>
<th scope="col">
{"アクセス頻度"}
</th>
<th scope="col">
{"特徴"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"S3 Standard"}
</td>
<td>
{"頻繁"}
</td>
<td>
{"低レイテンシー、取得料金なし"}
</td>
</tr>
<tr className={"even"}>
<td>
{"S3 Intelligent-Tiering"}
</td>
<td>
<strong>
{"不明/変動"}
</strong>
</td>
<td>
{"\n                                    アクセスパターンに応じて"}
<strong>
{"自動で階層移動"}
</strong>
{"。取得料金なし(小さな監視・自動化料金あり)\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"S3 Standard-IA"}
</td>
<td>
{"低頻度(ミリ秒取得)"}
</td>
<td>
{"\n                                    保存は安いが"}
<strong>
{"取得料金・最低保存期間(30日)"}
</strong>
{"あり\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"S3 One Zone-IA"}
</td>
<td>
{"低頻度・再作成可能"}
</td>
<td>
<strong>
{"単一 AZ"}
</strong>
{"のため安いが可用性は低い"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"S3 Glacier Instant Retrieval"}
</td>
<td>
{"四半期に1回程度"}
</td>
<td>
{"アーカイブだがミリ秒で取得"}
</td>
</tr>
<tr className={"even"}>
<td>
{"S3 Glacier Flexible Retrieval"}
</td>
<td>
{"年に数回"}
</td>
<td>
{"数分〜数時間で取得"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"S3 Glacier Deep Archive"}
</td>
<td>
{"ほぼ参照しない(長期保管)"}
</td>
<td>
<strong>
{"最安"}
</strong>
{"。取得に12時間以上かかる"}
</td>
</tr>
</tbody>
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
<thead>
<tr className={"header"}>
<th scope="col">
{"通信"}
</th>
<th scope="col">
{"一般的な課金の考え方"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"インターネットからの"}
<strong>
{"受信(イン)"}
</strong>
</td>
<td>
{"原則"}
<strong>
{"無料"}
</strong>
</td>
</tr>
<tr className={"even"}>
<td>
{"インターネットへの"}
<strong>
{"送信(アウト)"}
</strong>
</td>
<td>
<strong>
{"課金"}
</strong>
{"(量に応じた段階料金)"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"同一 AZ 内のプライベート IP 通信"}
</td>
<td>
{"原則無料"}
</td>
</tr>
<tr className={"even"}>
<td>
<strong>
{"AZ 間"}
</strong>
{"の通信"}
</td>
<td>
{"課金(Multi-AZ 設計では見落としがち)"}
</td>
</tr>
<tr className={"odd"}>
<td>
<strong>
{"リージョン間"}
</strong>
{"の通信"}
</td>
<td>
{"課金"}
</td>
</tr>
<tr className={"even"}>
<td>
{"NAT ゲートウェイ経由"}
</td>
<td>
{"時間課金に加えて"}
<strong>
{"データ処理料金"}
</strong>
{"が発生"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"CloudFront 経由の配信"}
</td>
<td>
{"\n                                    オリジン(AWS)から CloudFront\n                                    への転送は無料で、直接配信より安くなることが多い\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"Direct Connect"}
</td>
<td>
{"\n                                    専用線のデータ転送(アウト)は通常のインターネット経由より低単価になりやすい\n                                "}
</td>
</tr>
</tbody>
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
<thead>
<tr className={"header"}>
<th scope="col">
{"観点"}
</th>
<th scope="col">
{"内容"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"単価だけで比べない"}
</td>
<td>
{"\n                                    マネージドサービスは単価が高く見えても、"}
<strong>
{"運用人件費、パッチ、障害対応、冗長化"}
</strong>
{"の削減を含めた\n                                    TCO で判断する\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"サーバーレス"}
</td>
<td>
{"\n                                    Lambda、Fargate、DynamoDB オンデマンド、Aurora Serverless\n                                    は"}
<strong>
{"使った分だけ"}
</strong>
{"課金。アイドル時間が多い/変動が大きい用途で有利。常時高負荷なら固定リソース+割引モデルが安い場合もある\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"適切なサービス選択"}
</td>
<td>
{"\n                                    例: 小規模な定期バッチは EC2 常時起動より Lambda/EventBridge\n                                    スケジュール\n                                "}
</td>
</tr>
</tbody>
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
<thead>
<tr className={"header"}>
<th scope="col">
{"統制手段"}
</th>
<th scope="col">
{"内容"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"Organizations の SCP"}
</td>
<td>
{"高額なインスタンスタイプや不要なリージョンの利用を禁止"}
</td>
</tr>
<tr className={"even"}>
<td>
{"AWS Budgets アクション"}
</td>
<td>
{"しきい値超過時に自動で IAM ポリシー適用や停止"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"タグポリシー + コスト配分タグ"}
</td>
<td>
{"責任の所在を明確化(タグなしリソースを検出)"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Service Catalog / IaC"}
</td>
<td>
{"承認済み・サイズ制限付きの構成のみ提供"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"スケジュール停止"}
</td>
<td>
{"\n                                    開発/検証環境を夜間・休日に停止(Systems Manager\n                                    Automation、Instance Scheduler)\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"未使用リソースの定期棚卸し"}
</td>
<td>
{"\n                                    未接続 EBS、未使用 Elastic IP、アイドル\n                                    ELB、古いスナップショット\n                                "}
</td>
</tr>
</tbody>
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
<thead>
<tr className={"header"}>
<th scope="col">
{"問題文のキーワード"}
</th>
<th scope="col">
{"選ぶべき方向性"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"「アクセスパターンが不明/変動する S3 データ」"}
</td>
<td>
{"S3 Intelligent-Tiering"}
</td>
</tr>
<tr className={"even"}>
<td>
{"「中断可能なバッチ処理で最安」"}
</td>
<td>
{"スポットインスタンス"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"「インスタンスタイプを変える可能性があるが割引を得たい」"}
</td>
<td>
{"Compute Savings Plans / コンバーチブル RI"}
</td>
</tr>
<tr className={"even"}>
<td>
{"「構築前に費用を見積もる」"}
</td>
<td>
{"Pricing Calculator"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"「予算超過を通知/自動対応」"}
</td>
<td>
{"AWS Budgets(アクション)"}
</td>
</tr>
<tr className={"even"}>
<td>
{"「異常な支出を検知」"}
</td>
<td>
{"Cost Anomaly Detection"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"「NAT ゲートウェイのデータ処理料金を削減」"}
</td>
<td>
{"VPC エンドポイント(S3/DynamoDB はゲートウェイ型)"}
</td>
</tr>
<tr className={"even"}>
<td>
{"「長期保管で最安」"}
</td>
<td>
{"S3 Glacier Deep Archive"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"「過剰スペックを見つけてサイズ変更」"}
</td>
<td>
{"Compute Optimizer"}
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
