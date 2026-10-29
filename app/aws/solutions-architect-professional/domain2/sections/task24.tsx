import { Diagram } from '../Diagram';
import type { ChecklistProps } from '../types';
/** 原本のtask24本文。 */
export default function Content({ progress, updateProgress }: ChecklistProps) { void progress; void updateProgress; return <>
<h2 id={"6-task-24-信頼性要件を満たす戦略の設計"} tabIndex={-1}>
{"\n                    6. Task 2.4 信頼性要件を満たす戦略の設計\n                "}
</h2>
{"\n                "}
<p>
{"公式: 「Design a strategy to meet reliability requirements」"}
</p>
{"\n                "}
<h3 id={"step-1-何を問われるか-3"} tabIndex={-1}>
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
{"\n                                    グローバルインフラ、ストレージ/レプリケーション(S3、RDS、ElastiCache)\n                                "}
</td>
{"\n                                "}
<td>
{"データを複数の場所に安全に持つ方法"}
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
{"Multi-AZ / Multi-Region アーキテクチャ"}
</td>
{"\n                                "}
<td>
{"拠点をまたいで冗長化する設計"}
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
{"Auto Scaling のポリシーとイベント"}
</td>
{"\n                                "}
<td>
{"負荷や障害に応じて自動で台数を増減する仕組み"}
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
{"アプリケーション統合(SNS、SQS、Step Functions)"}
</td>
{"\n                                "}
<td>
{"システム同士を「疎結合」でつなぐ部品"}
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
{"サービスクォータと制限"}
</td>
{"\n                                "}
<td>
{"AWS の利用上限"}
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
{"\n                                    高可用性環境、障害を前提とした設計、疎結合、フェイルオーバーの運用、マネージドサービス、DNS\n                                    ルーティングポリシー\n                                "}
</td>
{"\n                                "}
<td>
{"壊れても続く・すぐ切り替わる・連鎖して壊れない設計"}
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
{"Task 2.2 との違い"}
</strong>
{": 2.2\n                    は「災害(リージョン規模)後に事業を継続する」視点、2.4\n                    は「日常的な障害(インスタンス故障、AZ\n                    障害、負荷急増)でも落とさない」視点です。重なる部分は多いので、セットで理解しましょう。\n                "}
</p>
{"\n                "}
<h3 id={"step-2-a-高可用性の基本形multi-az"} tabIndex={-1}>
{"Step 2-A: 高可用性の基本形(Multi-AZ)"}
</h3>
{"\n                "}
<Diagram id="diag-13" label={"Step 2-A: 高可用性の基本形(Multi-AZ)"}/>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：flowchart TB\n    U[\"ユーザー\"] --> R53[\"Route 53\"]\n    R53 --> ALB[\"Application Load Balancer<br/>複数 AZ に配置\"]\n    ALB --> A1[\"EC2 AZ-a<br/>Auto Scaling\"]\n    ALB --> A2[\"EC2 AZ-c<br/>Auto Scaling\"]\n    A1 --> DBP[\"Aurora ライター<br/>AZ-a\"]\n    A2 --> DBP\n    DBP -.->|\"レプリケーション\"| DBR[\"Aurora リーダー<br/>AZ-c\"]\n\n    classDef highlightFill fill:#dbe6ff,stroke:#3556d6,color:#13204a;\n    class DBP,DBR highlightFill"}>
{"\n                    "}
<table>
{"\n                        "}
<thead>
{"\n                            "}
<tr className={"header"}>
{"\n                                "}
<th scope="col">
{"層"}
</th>
{"\n                                "}
<th scope="col">
{"高可用性の手段"}
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
{"DNS"}
</td>
{"\n                                "}
<td>
{"Route 53(ヘルスチェックと組み合わせ)"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"ロードバランサー"}
</td>
{"\n                                "}
<td>
{"\n                                    ELB は複数 AZ\n                                    に自動分散。異常なターゲットを切り離す(ヘルスチェック)\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"コンピュート"}
</td>
{"\n                                "}
<td>
{"\n                                    Auto Scaling グループを"}
<strong>
{"複数 AZ に配置"}
</strong>
{"。異常インスタンスを自動で置換\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"データベース"}
</td>
{"\n                                "}
<td>
{"\n                                    RDS Multi-AZ、Aurora(ストレージは3つの AZ\n                                    に6コピー)、DynamoDB(リージョン内で複数 AZ に自動複製)\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"ストレージ"}
</td>
{"\n                                "}
<td>
{"\n                                    S3(複数 AZ に自動冗長化。One Zone クラスは除く)、EFS(複数 AZ)\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"ネットワーク"}
</td>
{"\n                                "}
<td>
{"AZ ごとに NAT ゲートウェイを配置(AZ 障害時の連鎖を防ぐ)"}
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
<h3 id={"step-2-b-ストレージとデータベースのレプリケーション戦略"} tabIndex={-1}>
{"\n                    Step 2-B: ストレージとデータベースのレプリケーション戦略\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：Step 2-B: ストレージとデータベースのレプリケーション戦略"}>
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
{"同一リージョン内の可用性"}
</th>
{"\n                                "}
<th scope="col">
{"リージョン間"}
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
{"Amazon S3"}
</td>
{"\n                                "}
<td>
{"複数 AZ に自動冗長化"}
</td>
{"\n                                "}
<td>
{"CRR、Multi-Region Access Points"}
</td>
{"\n                                "}
<td>
{"バージョニングで誤削除対策"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"Amazon RDS"}
</td>
{"\n                                "}
<td>
{"\n                                    "}
<strong>
{"Multi-AZ DB インスタンス"}
</strong>
{"(同期レプリケーション、自動フェイルオーバー、通常1〜2分程度)/\n                                    "}
<strong>
{"Multi-AZ DB クラスター"}
</strong>
{"(準同期レプリケーション、読み取り可能なスタンバイ2台。フェイルオーバー時間はレプリカラグに依存し得る)\n                                "}
</td>
{"\n                                "}
<td>
{"クロスリージョンリードレプリカ"}
</td>
{"\n                                "}
<td>
{"\n                                    リードレプリカは非同期。DB\n                                    インスタンス構成のスタンバイは"}
<strong>
{"読み取りに使えない"}
</strong>
{"(DB\n                                    クラスター構成のスタンバイは読み取り可能)\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"Amazon Aurora"}
</td>
{"\n                                "}
<td>
{"最大15のレプリカ、自動フェイルオーバー"}
</td>
{"\n                                "}
<td>
{"Global Database"}
</td>
{"\n                                "}
<td>
{"レプリカがあれば短時間でフェイルオーバー可能"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"Amazon DynamoDB"}
</td>
{"\n                                "}
<td>
{"自動で複数 AZ"}
</td>
{"\n                                "}
<td>
{"グローバルテーブル"}
</td>
{"\n                                "}
<td>
{"オンデマンド/プロビジョンドの容量モードを選択"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"Amazon ElastiCache"}
</td>
{"\n                                "}
<td>
{"レプリカとMulti-AZ自動フェイルオーバー(Valkey / Redis OSS)"}
</td>
{"\n                                "}
<td>
{"Global Datastore"}
</td>
{"\n                                "}
<td>
{"Memcached はレプリケーションなし(別途設計が必要)"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"Amazon EFS"}
</td>
{"\n                                "}
<td>
{"複数 AZ に自動冗長化(Standard クラス)"}
</td>
{"\n                                "}
<td>
{"EFS レプリケーション"}
</td>
{"\n                                "}
<td>
{"One Zone クラスは単一 AZ"}
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
{"ひっかけ"}
</strong>
{": RDS の\n                    "}
<strong>
{"Multi-AZ は「可用性」"}
</strong>
{"、"}
<strong>
{"リードレプリカは「読み取りのスケールアウト(+DR)」"}
</strong>
{"。目的が違うので混同しないこと。\n                "}
</p>
{"\n                "}
<h3 id={"step-2-c-auto-scalingポリシーとイベント"} tabIndex={-1}>
{"\n                    Step 2-C: Auto Scaling(ポリシーとイベント)\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：Step 2-C: Auto Scaling(ポリシーとイベント)"}>
{"\n                    "}
<table>
{"\n                        "}
<thead>
{"\n                            "}
<tr className={"header"}>
{"\n                                "}
<th scope="col">
{"スケーリング方式"}
</th>
{"\n                                "}
<th scope="col">
{"内容"}
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
{"ターゲット追跡"}
</td>
{"\n                                "}
<td>
{"指標(例: CPU 50%)を目標値に保つよう自動調整"}
</td>
{"\n                                "}
<td>
<strong>
{"最初の選択肢"}
</strong>
{"。設定が簡単"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"ステップスケーリング"}
</td>
{"\n                                "}
<td>
{"アラームの超過幅に応じて段階的に増減"}
</td>
{"\n                                "}
<td>
{"負荷に応じたきめ細かい調整"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"スケジュールスケーリング"}
</td>
{"\n                                "}
<td>
{"時刻や日付で増減"}
</td>
{"\n                                "}
<td>
{"予測できる負荷(営業時間、イベント)"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"予測スケーリング"}
</td>
{"\n                                "}
<td>
{"過去のパターンを機械学習で予測し事前に拡張"}
</td>
{"\n                                "}
<td>
{"周期的な負荷、起動に時間がかかるアプリ"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"カスタムメトリクス"}
</td>
{"\n                                "}
<td>
{"例: SQS の「1インスタンスあたりの待ちメッセージ数」"}
</td>
{"\n                                "}
<td>
{"キュー処理ワーカーの最適な増減"}
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
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：スケーリング方式\n                                内容\n                                使いどころ\n                            \n                        \n                        \n                            \n                                ターゲット追跡\n                                指標(例: CPU 50%)を目標値に保つよう自動調整\n                                最初の選択肢。設定が簡単\n                            \n                            \n                                ステップスケーリング\n                                アラームの超過幅に応じて段階的に増減\n                                負荷に応じたきめ細かい調整\n                            \n                            \n                                スケジュールスケーリング\n                                時刻や日付で増減\n                                予測できる負荷(営業時間、イベント)\n                            \n                            \n                                予測スケーリング\n                                過去のパターンを機械学習で予測し事前に拡張\n                                周期的な負荷、起動に時間がかかるアプリ\n                            \n                            \n                                カスタムメトリクス\n                                例: SQS の「1インスタンスあたりの待ちメッセージ数」\n                                キュー処理ワーカーの最適な増減"}>
{"\n                    "}
<table>
{"\n                        "}
<thead>
{"\n                            "}
<tr className={"header"}>
{"\n                                "}
<th scope="col">
{"関連機能"}
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
{"ライフサイクルフック"}
</td>
{"\n                                "}
<td>
{"起動/終了の途中で処理を挟む(設定完了待ち、ログ退避など)"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"ウォームプール"}
</td>
{"\n                                "}
<td>
{"\n                                    事前に初期化済みのインスタンスを待機させ、スケールアウトを高速化\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"インスタンスリフレッシュ"}
</td>
{"\n                                "}
<td>
{"AMI 更新などで段階的にインスタンスを入れ替え"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"ヘルスチェック"}
</td>
{"\n                                "}
<td>
{"\n                                    EC2 と ELB のヘルスチェックを併用し、アプリ異常も検知して置換\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"通知(イベント)"}
</td>
{"\n                                "}
<td>
{"起動、終了、失敗を SNS / EventBridge に通知"}
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
<h3 id={"step-2-d-疎結合アプリケーション統合"} tabIndex={-1}>
{"\n                    Step 2-D: 疎結合(アプリケーション統合)\n                "}
</h3>
{"\n                "}
<p>
{"\n                    "}
<strong>
{"密結合の問題"}
</strong>
{":\n                    呼び出し先が落ちたり遅くなると、呼び出し元も連鎖して落ちます。間にキューやイベントバスを挟むと、"}
<strong>
{"片方が止まっても他方は影響を受けにくく"}
</strong>
{"なります。\n                "}
</p>
{"\n                "}
<Diagram id="diag-14" label={"Step 2-D: 疎結合(アプリケーション統合)"}/>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：flowchart LR\n    P[\"注文受付 API\"] --> SNS[\"Amazon SNS<br/>トピック\"]\n    SNS --> Q1[\"SQS キュー 決済処理\"]\n    SNS --> Q2[\"SQS キュー 在庫更新\"]\n    SNS --> Q3[\"SQS キュー 通知\"]\n    Q1 --> W1[\"ワーカー Auto Scaling\"]\n    Q2 --> W2[\"ワーカー Auto Scaling\"]\n    Q3 --> W3[\"Lambda\"]\n    Q1 -.->|\"失敗を繰り返したら\"| DLQ[\"デッドレターキュー\"]\n\n    classDef dangerFill fill:#ffdfe5,stroke:#c0213f,color:#5c1020;\n    class DLQ dangerFill"}>
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
{"\n                                "}
<th scope="col">
{"試験の要点"}
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
{"Amazon SQS"}
</td>
{"\n                                "}
<td>
{"\n                                    メッセージキュー(バッファ)。標準(ほぼ無制限スループット、順序保証なし、少なくとも1回)、FIFO(順序保証、重複排除)\n                                "}
</td>
{"\n                                "}
<td>
{"\n                                    可視性タイムアウト、ロングポーリング、"}
<strong>
{"デッドレターキュー"}
</strong>
{"(失敗メッセージの隔離)\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"Amazon SNS"}
</td>
{"\n                                "}
<td>
{"Pub/Sub(1つのメッセージを多数へ配信)"}
</td>
{"\n                                "}
<td>
{"\n                                    "}
<strong>
{"SNS + SQS のファンアウト"}
</strong>
{"、フィルターポリシー\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"Amazon EventBridge"}
</td>
{"\n                                "}
<td>
{"\n                                    イベントバス。ルールでイベントをターゲットへ振り分け、SaaS/AWS\n                                    サービスのイベントを連携\n                                "}
</td>
{"\n                                "}
<td>
{"スケジュール実行、イベント駆動"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"AWS Step Functions"}
</td>
{"\n                                "}
<td>
{"\n                                    ワークフローのオーケストレーション。リトライ、エラー処理、並列処理、人の承認待ちを定義\n                                "}
</td>
{"\n                                "}
<td>
{"\n                                    Standard(長時間。ワークフロー実行は exactly-once だが、"}
<code>
{"Retry"}
</code>
{"\n                                    を定義したタスクは再実行されうる)と\n                                    Express(高頻度、短時間。非同期は at-least-once、同期は\n                                    at-most-once)\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"Amazon Kinesis / MSK"}
</td>
{"\n                                "}
<td>
{"ストリーミングデータの取り込み"}
</td>
{"\n                                "}
<td>
{"順序付きのリアルタイム処理"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"API Gateway"}
</td>
{"\n                                "}
<td>
{"API の公開、スロットリング、キャッシュ"}
</td>
{"\n                                "}
<td>
{"バックエンドの保護"}
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
<ul>
{"\n                            "}
<li>
{"\n                                "}
<strong>
{"同期呼び出しを減らし、非同期(キュー/イベント)にする"}
</strong>
{"\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                処理は"}
<strong>
{"冪等"}
</strong>
{"(同じメッセージを2回処理しても結果が同じ)に設計する\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                リトライには"}
<strong>
{"指数バックオフとジッター"}
</strong>
{"を使い、再試行の集中を避ける\n                            "}
</li>
{"\n                            "}
<li>
<strong>
{"デッドレターキュー"}
</strong>
{"と監視アラームを必ず設定する"}
</li>
{"\n                            "}
<li>
{"\n                                Step Functions\n                                で"}
<strong>
{"リトライとエラー分岐"}
</strong>
{"を明示し、障害時の補償処理(Saga\n                                パターン)を設計する\n                            "}
</li>
{"\n                        "}
</ul>
{"\n                    "}
</div>
{"\n                "}
</div>
{"\n                "}
<h3 id={"step-2-e-サービスクォータ上限"} tabIndex={-1}>
{"Step 2-E: サービスクォータ(上限)"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：Step 2-E: サービスクォータ(上限)"}>
{"\n                    "}
<table>
{"\n                        "}
<thead>
{"\n                            "}
<tr className={"header"}>
{"\n                                "}
<th scope="col">
{"項目"}
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
{"Service Quotas"}
</td>
{"\n                                "}
<td>
{"クォータの確認、引き上げ申請、使用率アラーム設定を一元管理"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"Trusted Advisor"}
</td>
{"\n                                "}
<td>
{"クォータ使用率が高いサービスを警告"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"設計上の注意"}
</td>
{"\n                                "}
<td>
{"\n                                    急なスケールアウトや"}
<strong>
{"DR 先リージョンで上限に達して起動できない"}
</strong>
{"事態を防ぐ。リージョンごと・アカウントごとにクォータが異なるため、事前に引き上げる\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"ソフトリミットとハードリミット"}
</td>
{"\n                                "}
<td>
{"\n                                    引き上げ可能なものと不可能なものがある。設計上の制約として把握する\n                                "}
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
<h3 id={"step-2-f-dns-ルーティングポリシーroute-53"} tabIndex={-1}>
{"\n                    Step 2-F: DNS ルーティングポリシー(Route 53)\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：Step 2-F: DNS ルーティングポリシー(Route 53)"}>
{"\n                    "}
<table>
{"\n                        "}
<thead>
{"\n                            "}
<tr className={"header"}>
{"\n                                "}
<th scope="col">
{"ポリシー"}
</th>
{"\n                                "}
<th scope="col">
{"動作"}
</th>
{"\n                                "}
<th scope="col">
{"典型的な用途"}
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
{"シンプル"}
</td>
{"\n                                "}
<td>
{"\n                                    1つのレコードに1つ(または複数)の値を返す。ヘルスチェック連動なし\n                                "}
</td>
{"\n                                "}
<td>
{"単純な構成"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"加重 (Weighted)"}
</td>
{"\n                                "}
<td>
{"比率で振り分け(例: 90:10)"}
</td>
{"\n                                "}
<td>
<strong>
{"カナリア/Blue/Green"}
</strong>
{"、段階的移行"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"レイテンシー"}
</td>
{"\n                                "}
<td>
{"ユーザーに"}
<strong>
{"最も遅延が小さい"}
</strong>
{"リージョンへ"}
</td>
{"\n                                "}
<td>
{"グローバル展開でのパフォーマンス最適化"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"フェイルオーバー"}
</td>
{"\n                                "}
<td>
{"プライマリが異常ならセカンダリへ"}
</td>
{"\n                                "}
<td>
{"Active-Passive の DR"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"位置情報 (Geolocation)"}
</td>
{"\n                                "}
<td>
<strong>
{"ユーザーの所在地(国・大陸)"}
</strong>
{"で振り分け"}
</td>
{"\n                                "}
<td>
{"言語、コンテンツ規制、データ主権"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"地理的近接 (Geoproximity)"}
</td>
{"\n                                "}
<td>
{"\n                                    リソースの場所と"}
<strong>
{"バイアス"}
</strong>
{"でトラフィック量を調整\n                                "}
</td>
{"\n                                "}
<td>
{"リージョン間の比率を地理的に調整"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"IP ベース"}
</td>
{"\n                                "}
<td>
{"クライアントの IP 範囲(CIDR)で振り分け"}
</td>
{"\n                                "}
<td>
{"特定 ISP/ネットワークを特定のエンドポイントへ"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"複数値回答"}
</td>
{"\n                                "}
<td>
{"最大8件の正常な値を返す(ヘルスチェック付き)"}
</td>
{"\n                                "}
<td>
{"簡易的な負荷分散"}
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
{"ひっかけ"}
</strong>
{": 「"}
<strong>
{"最も速い"}
</strong>
{"リージョン」=\n                    レイテンシー、「"}
<strong>
{"国ごとに"}
</strong>
{"コンテンツを出し分け」=\n                    位置情報、「"}
<strong>
{"災害時に切り替え"}
</strong>
{"」=\n                    フェイルオーバー、「"}
<strong>
{"徐々に移行"}
</strong>
{"」= 加重。\n                "}
</p>
{"\n                "}
<h3 id={"step-2-g-障害を前提とした設計design-for-failure"} tabIndex={-1}>
{"\n                    Step 2-G: 障害を前提とした設計(Design for Failure)\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：Step 2-G: 障害を前提とした設計(Design for Failure)"}>
{"\n                    "}
<table>
{"\n                        "}
<thead>
{"\n                            "}
<tr className={"header"}>
{"\n                                "}
<th scope="col">
{"原則"}
</th>
{"\n                                "}
<th scope="col">
{"具体策"}
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
{"単一障害点を排除"}
</td>
{"\n                                "}
<td>
{"すべての層を複数 AZ に。NAT ゲートウェイや DB も冗長化"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"障害を自動で検知・復旧"}
</td>
{"\n                                "}
<td>
{"ヘルスチェック、Auto Scaling の置換、自動フェイルオーバー"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"連鎖障害を防ぐ"}
</td>
{"\n                                "}
<td>
{"\n                                    タイムアウト、リトライ(バックオフ)、サーキットブレーカー、バルクヘッド(隔離)\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"グレースフルデグラデーション"}
</td>
{"\n                                "}
<td>
{"\n                                    一部機能が落ちても主要機能は継続(キャッシュの古い値を返す等)\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"ステートレス化"}
</td>
{"\n                                "}
<td>
{"セッション情報を ElastiCache や DynamoDB に外出し"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"回復力のテスト"}
</td>
{"\n                                "}
<td>
{"FIS による障害注入、ゲームデイ"}
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
<h3 id={"step-3-task-24-試験のコツ"} tabIndex={-1}>
{"Step 3: Task 2.4 試験のコツ"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：Step 3: Task 2.4 試験のコツ"}>
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
{"「AZ 障害でも継続」"}
</td>
{"\n                                "}
<td>
{"複数 AZ の ELB + Auto Scaling + Multi-AZ DB"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"「バックエンドの急増に耐える」「処理の取りこぼしを防ぐ」"}
</td>
{"\n                                "}
<td>
{"SQS でバッファリング"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"「1つのイベントを複数システムへ」"}
</td>
{"\n                                "}
<td>
{"SNS + SQS ファンアウト、EventBridge"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"「複雑な処理フロー、リトライ、分岐」"}
</td>
{"\n                                "}
<td>
{"Step Functions"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"「失敗を繰り返すメッセージを退避」"}
</td>
{"\n                                "}
<td>
{"SQS デッドレターキュー"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"「予測できる負荷」"}
</td>
{"\n                                "}
<td>
{"スケジュール/予測スケーリング"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"「DR 先で起動できない」"}
</td>
{"\n                                "}
<td>
{"Service Quotas の事前引き上げ"}
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
