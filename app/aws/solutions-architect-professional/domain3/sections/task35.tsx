import { Diagram } from '../Diagram';
/** 原本のtask35本文。 */
export default function Content() { return <>
<h2 id={"7-task-35-コスト最適化の機会を見つける"} tabIndex={-1}>
{"\n                    7. Task 3.5 コスト最適化の機会を見つける\n                "}
</h2>
{"\n                "}
<h3 id={"71-このタスクで問われることexam-guide-より"} tabIndex={-1}>
{"\n                    7.1 このタスクで問われること(Exam Guide より)\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 60：7.1 このタスクで問われること(Exam Guide より)"}>
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
{"\n                                    コストを意識したアーキテクチャの選択 (例:\n                                    スポットインスタンス、スケーリングポリシー、ライトサイジング)\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"Knowledge"}
</td>
<td>
{"\n                                    料金モデルの採用 (例: リザーブドインスタンス、Savings Plans)\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Knowledge"}
</td>
<td>
{"ネットワークとデータ転送のコスト"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Knowledge"}
</td>
<td>
{"コストの管理、アラート、レポート"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Skills"}
</td>
<td>
{"\n                                    使用状況レポートから、使用不足と過剰使用のリソースを分析する\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"Skills"}
</td>
<td>
{"AWS のソリューションで未使用リソースを特定する"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Skills"}
</td>
<td>
{"想定される使用パターンに基づいて請求アラームを設計する"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Skills"}
</td>
<td>
{"AWS Cost and Usage Reports を詳細レベルで調査する"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Skills"}
</td>
<td>
{"タグを使ってコストの配賦とレポートを行う"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"72-全体像-見える化から最適化へ"} tabIndex={-1}>
{"7.2 全体像: 見える化から最適化へ"}
</h3>
{"\n                "}
<Diagram id="diag-13" label={"7.2 全体像: 見える化から最適化へ"}/>
{"\n                "}
<h3 id={"73-step-1-使用状況を分析して無駄を見つける"} tabIndex={-1}>
{"\n                    7.3 Step 1: 使用状況を分析して無駄を見つける\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 61：7.3 Step 1: 使用状況を分析して無駄を見つける"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"道具"}
</th>
<th scope="col">
{"何がわかるか"}
</th>
<th scope="col">
{"ポイント"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"AWS Cost Explorer"}
</td>
<td>
{"\n                                    サービス別、アカウント別、タグ別のコスト推移。ライトサイジング推奨や\n                                    RI/Savings Plans の推奨\n                                "}
</td>
<td>
{"日次と月次で傾向を確認"}
</td>
</tr>
<tr className={"even"}>
<td>
{"AWS Cost and Usage Report (CUR)"}
</td>
<td>
{"最も詳細な請求データ (行単位)"}
</td>
<td>
{"\n                                    S3 へ出力し、Athena で SQL 分析。リソース ID 単位まで調べられる\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"AWS Compute Optimizer"}
</td>
<td>
{"EC2、EBS、Lambda などの過剰と不足を判定"}
</td>
<td>
{"メモリ指標は CloudWatch エージェントが必要"}
</td>
</tr>
<tr className={"even"}>
<td>
{"AWS Trusted Advisor"}
</td>
<td>
{"\n                                    コスト最適化チェック (低使用率の\n                                    EC2、アイドル状態のロードバランサー、未関連付けの Elastic IP\n                                    など)\n                                "}
</td>
<td>
{"\n                                    すべてのチェックは Business Support+、Enterprise\n                                    Support、Unified Operations\n                                    の各プランで利用可能。それ以外のアカウントは一部のコアチェックのみ利用可能\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Amazon S3 Storage Lens"}
</td>
<td>
{"S3 の使用状況とコスト効率の可視化"}
</td>
<td>
{"ストレージ層の最適化の起点"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h4>
{"未使用・低使用リソースの典型例"}
</h4>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 62：未使用・低使用リソースの典型例"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"リソース"}
</th>
<th scope="col">
{"見つけ方"}
</th>
<th scope="col">
{"対応"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"アタッチされていない EBS ボリューム"}
</td>
<td>
{"Trusted Advisor、Compute Optimizer"}
</td>
<td>
{"スナップショットを取って削除"}
</td>
</tr>
<tr className={"even"}>
<td>
{"古い EBS スナップショット"}
</td>
<td>
{"Cost Explorer、スナップショット一覧"}
</td>
<td>
{"ライフサイクル管理で自動削除"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"アイドル状態のロードバランサー"}
</td>
<td>
{"Trusted Advisor"}
</td>
<td>
{"削除"}
</td>
</tr>
<tr className={"even"}>
<td>
{"関連付けのない Elastic IP"}
</td>
<td>
{"Trusted Advisor"}
</td>
<td>
{"解放"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"低使用率の EC2"}
</td>
<td>
{"Compute Optimizer、Trusted Advisor"}
</td>
<td>
{"ライトサイジング、停止、またはスケジュール停止"}
</td>
</tr>
<tr className={"even"}>
<td>
{"使われていない NAT ゲートウェイ"}
</td>
<td>
{"Cost Explorer、VPC メトリクス"}
</td>
<td>
{"削除、または VPC エンドポイントへ置き換え"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"長期間アクセスのない S3 データ"}
</td>
<td>
{"S3 Storage Lens、Intelligent-Tiering"}
</td>
<td>
{"低コストの層へ移行"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"74-step-2-コストを意識した構成にする"} tabIndex={-1}>
{"\n                    7.4 Step 2: コストを意識した構成にする\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 63：7.4 Step 2: コストを意識した構成にする"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"施策"}
</th>
<th scope="col">
{"内容"}
</th>
<th scope="col">
{"注意点"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"ライトサイジング"}
</td>
<td>
{"実使用量に合わせてサイズを下げる"}
</td>
<td>
{"性能要件を満たすか事前検証"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Auto Scaling"}
</td>
<td>
{"負荷に応じて台数を増減"}
</td>
<td>
{"夜間や休日はスケールインさせる"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"スポットインスタンス"}
</td>
<td>
{"余剰キャパシティを大幅な割引で利用"}
</td>
<td>
{"\n                                    中断される可能性があるため、中断に耐えるワークロード\n                                    (バッチ、ステートレス処理) に限定\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"スケジュール停止"}
</td>
<td>
{"開発環境を夜間や週末に停止"}
</td>
<td>
{"\n                                    Systems Manager Automation や EventBridge スケジューラで自動化\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"ストレージ階層化"}
</td>
<td>
{"アクセス頻度に応じた層へ"}
</td>
<td>
{"S3 Intelligent-Tiering やライフサイクルルール"}
</td>
</tr>
<tr className={"even"}>
<td>
{"マネージドサービス/サーバーレス"}
</td>
<td>
{"運用コストを含めた総コストを下げる"}
</td>
<td>
{"呼び出し頻度が非常に高い場合は比較検討"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"最新世代や Graviton"}
</td>
<td>
{"性能あたりの価格が良い"}
</td>
<td>
{"アプリの対応確認が必要"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"75-step-3-料金モデルを選ぶ"} tabIndex={-1}>
{"7.5 Step 3: 料金モデルを選ぶ"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 64：7.5 Step 3: 料金モデルを選ぶ"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"料金モデル"}
</th>
<th scope="col">
{"概要"}
</th>
<th scope="col">
{"割引の目安"}
</th>
<th scope="col">
{"向いている場面"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"オンデマンド"}
</td>
<td>
{"使った分だけ。コミットなし"}
</td>
<td>
{"なし"}
</td>
<td>
{"予測できない負荷、短期、検証"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Compute Savings Plans"}
</td>
<td>
{"\n                                    1 時間あたりの利用額を 1 年か 3 年コミット。EC2、Fargate、Lambda\n                                    に適用。リージョン、ファミリー、OS の変更に柔軟\n                                "}
</td>
<td>
{"最大約 66%"}
</td>
<td>
{"構成が変わる可能性があるワークロード"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"EC2 Instance Savings Plans"}
</td>
<td>
{"特定リージョンの特定ファミリーにコミット"}
</td>
<td>
{"最大約 72%"}
</td>
<td>
{"構成が固定されている"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Standard RI"}
</td>
<td>
{"特定のインスタンス属性に 1 年か 3 年コミット"}
</td>
<td>
{"最大約 72%"}
</td>
<td>
{"変更の少ない安定稼働"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Convertible RI"}
</td>
<td>
{"属性を交換できる RI"}
</td>
<td>
{"最大約 66%"}
</td>
<td>
{"将来の変更に備えたい"}
</td>
</tr>
<tr className={"even"}>
<td>
{"スポット"}
</td>
<td>
{"余剰キャパシティを利用"}
</td>
<td>
{"最大約 90%"}
</td>
<td>
{"中断に耐えられる処理"}
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
{"補足"}
</div>
{"\n                        "}
<p>
{"\n                            割引率は目安です。リージョン、インスタンスタイプ、支払い方法\n                            (全額前払い、一部前払い、前払いなし)\n                            などで変わるため、最新の数値は公式の料金ページで確認してください。\n                        "}
</p>
{"\n                    "}
</div>
{"\n                "}
</div>
{"\n                "}
<h4>
{"選び方の考え方"}
</h4>
{"\n                "}
<Diagram id="diag-14" label={"選び方の考え方"}/>
{"\n                "}
<h4>
{"ベストプラクティス"}
</h4>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 65：ベストプラクティス"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"#"}
</th>
<th scope="col">
{"プラクティス"}
</th>
<th scope="col">
{"理由"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"1"}
</td>
<td>
{"まずライトサイジングしてからコミットする"}
</td>
<td>
{"過大なサイズをコミットすると無駄が固定される"}
</td>
</tr>
<tr className={"even"}>
<td>
{"2"}
</td>
<td>
{"\n                                    安定した最低限の使用量だけをコミットし、変動分はオンデマンドやスポットで賄う\n                                "}
</td>
<td>
{"使い切れない予約を避ける"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"3"}
</td>
<td>
{"\n                                    RI と Savings Plans の使用率とカバレッジを Budgets で監視する\n                                "}
</td>
<td>
{"割引が活きているか確認できる"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"76-step-4-ネットワークとデータ転送のコストを抑える"} tabIndex={-1}>
{"\n                    7.6 Step 4: ネットワークとデータ転送のコストを抑える\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 66：7.6 Step 4: ネットワークとデータ転送のコストを抑える"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"転送の種類"}
</th>
<th scope="col">
{"コストの傾向"}
</th>
<th scope="col">
{"削減のヒント"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"インターネットからの受信"}
</td>
<td>
{"無料"}
</td>
<td>
{"なし"}
</td>
</tr>
<tr className={"even"}>
<td>
{"インターネットへの送信"}
</td>
<td>
{"課金"}
</td>
<td>
{"\n                                    CloudFront を経由 (S3 や EC2 から CloudFront\n                                    への転送は無料)。CloudFront\n                                    から配信するほうが割安になることが多い\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"同一リージョン内の AZ 間"}
</td>
<td>
{"課金"}
</td>
<td>
{"\n                                    通信量の多い構成は同じ AZ 内に寄せる (可用性とのバランスに注意)\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"リージョン間"}
</td>
<td>
{"課金"}
</td>
<td>
{"必要なデータだけを複製し、圧縮する"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"NAT ゲートウェイ経由"}
</td>
<td>
{"時間料金とデータ処理料金"}
</td>
<td>
{"\n                                    S3 や DynamoDB へは ゲートウェイ型 VPC エンドポイント (無料)\n                                    を使う\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"AWS サービスへのプライベート接続"}
</td>
<td>
{"インターフェイス型エンドポイントは時間料金とデータ処理料金"}
</td>
<td>
{"通信量と料金を比較して選ぶ"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"オンプレミスとの通信"}
</td>
<td>
{"Direct Connect は転送単価が安い"}
</td>
<td>
{"大量の継続通信は Direct Connect を検討"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 67：7.6 Step 4: ネットワークとデータ転送のコストを抑える"}>
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
{"\n                                    プライベートサブネットから S3 へ大量アクセスして NAT\n                                    ゲートウェイ費が高い\n                                "}
</td>
<td>
{"S3 のゲートウェイ型 VPC エンドポイント"}
</td>
</tr>
<tr className={"even"}>
<td>
{"世界中へ大量の静的コンテンツを配信"}
</td>
<td>
{"CloudFront"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"AZ をまたぐ通信が多い"}
</td>
<td>
{"\n                                    通信の多い構成要素を同じ AZ に配置するか、AZ\n                                    内ルーティングを検討\n                                "}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"761-補足-料金の変更に注意"} tabIndex={-1}>
{"7.6.1 補足: 料金の変更に注意"}
</h3>
{"\n                "}
<p>
{"\n                    データ転送や NAT\n                    ゲートウェイなどの料金は改定されることがあります。必ず最新の料金ページで確認します。\n                "}
</p>
{"\n                "}
<ul>
{"\n                    "}
<li>
{"\n                        "}
<a href={"https://aws.amazon.com/ec2/pricing/on-demand/"}>
{"https://aws.amazon.com/ec2/pricing/on-demand/"}
</a>
{"\n                    "}
</li>
{"\n                "}
</ul>
{"\n                "}
<h3 id={"77-step-5-コスト管理アラートレポートの仕組み"} tabIndex={-1}>
{"\n                    7.7 Step 5: コスト管理、アラート、レポートの仕組み\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 68：7.7 Step 5: コスト管理、アラート、レポートの仕組み"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"道具"}
</th>
<th scope="col">
{"役割"}
</th>
<th scope="col">
{"設定のコツ"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"AWS Budgets"}
</td>
<td>
{"\n                                    コスト、使用量、RI/Savings Plans\n                                    の使用率やカバレッジに予算を設定し、超過見込みで通知\n                                "}
</td>
<td>
{"\n                                    実績だけでなく予測値でもアラートを設定する。しきい値は複数段階\n                                    (例: 80% と 100%)\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"請求アラーム (CloudWatch)"}
</td>
<td>
{"見積もり請求額のメトリクスにアラームを設定"}
</td>
<td>
{"\n                                    請求メトリクスは米国東部 (バージニア北部)\n                                    リージョンに保存される。請求アラートを有効にしておく必要がある\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"AWS Cost Anomaly Detection"}
</td>
<td>
{"通常と異なるコストの急増を検知"}
</td>
<td>
{"サービスやタグ単位の監視を設定"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Cost Explorer のレポート"}
</td>
<td>
{"定期的なコスト傾向の確認"}
</td>
<td>
{"チームごとにレポートを保存"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"CUR"}
</td>
<td>
{"詳細な利用データの分析"}
</td>
<td>
{"S3 と Athena で分析し、必要に応じて QuickSight で可視化"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h4>
{"請求アラームの設計の考え方"}
</h4>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 69：請求アラームの設計の考え方"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"手順"}
</th>
<th scope="col">
{"内容"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"1"}
</td>
<td>
{"想定される月間の使用パターン (固定費と変動費) を把握する"}
</td>
</tr>
<tr className={"even"}>
<td>
{"2"}
</td>
<td>
{"\n                                    通常の範囲を少し超える水準と、明らかに異常な水準の 2\n                                    段階のしきい値を決める\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"3"}
</td>
<td>
{"通知先 (SNS) を決め、責任者とチームへ届くようにする"}
</td>
</tr>
<tr className={"even"}>
<td>
{"4"}
</td>
<td>
{"急増の検知は Cost Anomaly Detection も併用する"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"5"}
</td>
<td>
{"必要に応じて Budgets のアクションで自動対応する"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"78-step-6-タグでコストを配賦する"} tabIndex={-1}>
{"7.8 Step 6: タグでコストを配賦する"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 70：7.8 Step 6: タグでコストを配賦する"}>
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
{"コスト配賦タグ"}
</td>
<td>
{"\n                                    請求データに反映させるには、請求とコスト管理のコンソールで有効化が必要\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"タグの種類"}
</td>
<td>
{"ユーザー定義タグと AWS 生成タグ"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"タグポリシー"}
</td>
<td>
{"Organizations で、タグのキーと値のルールを組織全体で統一"}
</td>
</tr>
<tr className={"even"}>
<td>
{"必須タグの例"}
</td>
<td>
{"環境 (prod/dev)、チーム、プロジェクト、コストセンター"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"補足"}
</td>
<td>
{"\n                                    タグ付けできないコストやタグなしのリソースは、アカウント単位の配賦で補う\n                                "}
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
{"\n                            タグは有効化前の期間のデータへ自動では遡って反映されません。ただし、ce:StartCostAllocationTagBackfill権限を持つ管理アカウントのユーザーは、過去12か月以内の月初を開始日としてバックフィルを申請できます。バックフィルは要求期間中にリソースへタグが付与されていた場合にだけ反映されるため、早めにタグ付けと有効化を行い、運用ルールを定めます。\n                        "}
</p>
{"\n                    "}
</div>
{"\n                "}
</div>
{"\n                "}
<h3 id={"79-task-35-の試験での考え方"} tabIndex={-1}>
{"7.9 Task 3.5 の試験での考え方"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 71：7.9 Task 3.5 の試験での考え方"}>
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
{"中断されてもよいバッチを安く"}
</td>
<td>
{"スポットインスタンス"}
</td>
</tr>
<tr className={"even"}>
<td>
{"構成変更の可能性があるが割引を受けたい"}
</td>
<td>
{"Compute Savings Plans"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"構成が固定で長期稼働"}
</td>
<td>
{"EC2 Instance Savings Plans または Standard RI"}
</td>
</tr>
<tr className={"even"}>
<td>
{"リソース単位の詳細な請求分析"}
</td>
<td>
{"CUR と Athena"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"予算超過を事前に通知"}
</td>
<td>
{"AWS Budgets (予測のアラート)"}
</td>
</tr>
<tr className={"even"}>
<td>
{"使われていないリソースを探す"}
</td>
<td>
{"Trusted Advisor、Compute Optimizer"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"NAT ゲートウェイの費用を下げたい"}
</td>
<td>
{"S3 や DynamoDB のゲートウェイ型 VPC エンドポイント"}
</td>
</tr>
<tr className={"even"}>
<td>
{"部署ごとのコストを知りたい"}
</td>
<td>
{"コスト配賦タグ"}
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
<a href={"https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/welcome.html"}>
{"https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/welcome.html"}
</a>
{"\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<a href={"https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html"}>
{"https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html"}
</a>
{"\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<a href={"https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html"}>
{"https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html"}
</a>
{"\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<a href={"https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html"}>
{"https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html"}
</a>
{"\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<a href={"https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html"}>
{"https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html"}
</a>
{"\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<a href={"https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor.html"}>
{"https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor.html"}
</a>
{"\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<a href={"https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html"}>
{"https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html"}
</a>
{"\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<a href={"https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html"}>
{"https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html"}
</a>
{"\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<a href={"https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html"}>
{"https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html"}
</a>
{"\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<a href={"https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage_lens.html"}>
{"https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage_lens.html"}
</a>
{"\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<a href={"https://docs.aws.amazon.com/vpc/latest/privatelink/what-are-vpc-endpoints.html"}>
{"https://docs.aws.amazon.com/vpc/latest/privatelink/what-are-vpc-endpoints.html"}
</a>
{"\n                    "}
</li>
{"\n                "}
</ul>
{"\n\n                "}
</>; }
