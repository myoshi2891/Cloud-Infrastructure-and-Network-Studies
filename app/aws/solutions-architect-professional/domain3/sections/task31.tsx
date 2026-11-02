import { Diagram } from '../Diagram';
/** 原本のtask31本文。 */
export default function Content() { return <>
<h2 id={"3-task-31-運用上の優秀性を改善する"} tabIndex={-1}>
{"\n                    3. Task 3.1 運用上の優秀性を改善する\n                "}
</h2>
{"\n                "}
<h3 id={"31-このタスクで問われることexam-guide-より"} tabIndex={-1}>
{"\n                    3.1 このタスクで問われること(Exam Guide より)\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 7：3.1 このタスクで問われること(Exam Guide より)"}>
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
{"アラートと自動修復の戦略"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Knowledge"}
</td>
<td>
{"災害対策 (DR) の計画"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Knowledge"}
</td>
<td>
{"監視とログの仕組み (例: Amazon CloudWatch)"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Knowledge"}
</td>
<td>
{"\n                                    CICD パイプラインとデプロイ戦略 (例:\n                                    ブルーグリーン、オールアットワンス、ローリング)\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Knowledge"}
</td>
<td>
{"構成管理ツール (例: AWS Systems Manager)"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Skills"}
</td>
<td>
{"最適なログ・監視戦略を決める"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Skills"}
</td>
<td>
{"現在のデプロイ工程の改善余地を評価する"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Skills"}
</td>
<td>
{"自動化の優先順位を付ける"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Skills"}
</td>
<td>
{"構成管理の自動化に適した AWS ソリューションを推奨する"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Skills"}
</td>
<td>
{"障害シナリオを意図的に起こし、復旧手順への理解を鍛える"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"32-全体像-見える化から自動修復まで"} tabIndex={-1}>
{"\n                    3.2 全体像: 見える化から自動修復まで\n                "}
</h3>
{"\n                "}
<Diagram id="diag-1" label={"3.2 全体像: 見える化から自動修復まで"}/>
{"\n                "}
<h3 id={"33-step-1-監視とログの戦略を決める"} tabIndex={-1}>
{"\n                    3.3 Step 1: 監視とログの戦略を決める\n                "}
</h3>
{"\n                "}
<h4>
{"3 つのシグナルを使い分ける"}
</h4>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 8：3 つのシグナルを使い分ける"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"シグナル"}
</th>
<th scope="col">
{"何がわかるか"}
</th>
<th scope="col">
{"主なサービス"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"メトリクス"}
</td>
<td>
{"数値の推移 (CPU、遅延、エラー数)"}
</td>
<td>
{"Amazon CloudWatch Metrics"}
</td>
</tr>
<tr className={"even"}>
<td>
{"ログ"}
</td>
<td>
{"何が起きたかの詳細な記録"}
</td>
<td>
{"CloudWatch Logs"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"トレース"}
</td>
<td>
{"1 つのリクエストが各サービスを通る経路と所要時間"}
</td>
<td>
{"AWS X-Ray"}
</td>
</tr>
<tr className={"even"}>
<td>
{"操作履歴"}
</td>
<td>
{"だれがいつ API を呼んだか"}
</td>
<td>
{"AWS CloudTrail"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"構成履歴"}
</td>
<td>
{"リソース設定がいつどう変わったか"}
</td>
<td>
{"AWS Config"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h4>
{"CloudWatch の主要機能"}
</h4>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 9：CloudWatch の主要機能"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"機能"}
</th>
<th scope="col">
{"役割"}
</th>
<th scope="col">
{"ポイント"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"メトリクス"}
</td>
<td>
{"数値データの収集"}
</td>
<td>
{"\n                                    EC2 の標準メトリクスは 5 分間隔、詳細モニタリングで 1 分間隔\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"CloudWatch エージェント"}
</td>
<td>
{"メモリやディスク使用率などの OS 内部指標とログを収集"}
</td>
<td>
{"メモリ使用率は標準では取得されないためエージェントが必要"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"アラーム"}
</td>
<td>
{"しきい値超過で状態が変わり、アクションを実行"}
</td>
<td>
{"状態は OK、ALARM、INSUFFICIENT_DATA"}
</td>
</tr>
<tr className={"even"}>
<td>
{"複合アラーム"}
</td>
<td>
{"複数アラームを AND や OR で組み合わせる"}
</td>
<td>
{"通知のノイズ削減に有効"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"異常検知"}
</td>
<td>
{"過去の傾向から正常範囲を学習して逸脱を検知"}
</td>
<td>
{"固定しきい値が決めにくい指標に向く"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Logs Insights"}
</td>
<td>
{"ログを専用クエリで分析"}
</td>
<td>
{"アドホックな調査向け"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"メトリクスフィルター"}
</td>
<td>
{"ログ中の文字列をメトリクスに変換"}
</td>
<td>
{"エラー行の数をアラーム化できる"}
</td>
</tr>
<tr className={"even"}>
<td>
{"サブスクリプションフィルター"}
</td>
<td>
{"ログをリアルタイムで他へ転送"}
</td>
<td>
{"Kinesis、Firehose、Lambda へ送れる"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Synthetics"}
</td>
<td>
{"外形監視 (カナリア)"}
</td>
<td>
{"ユーザー視点で API や画面を定期確認"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h4>
{"ベストプラクティス"}
</h4>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 10：ベストプラクティス"}>
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
{"ログのグループに保存期間 (リテンション) を必ず設定する"}
</td>
<td>
{"既定では無期限保存になり、コストが増え続ける"}
</td>
</tr>
<tr className={"even"}>
<td>
{"2"}
</td>
<td>
{"長期保管や分析が必要なログは S3 へ出力し、Athena で分析する"}
</td>
<td>
{"安価に保管でき、SQL で傾向を分析できる"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"3"}
</td>
<td>
{"\n                                    アラームには「だれが何をするか」を決めた対応先 (SNS や自動処理)\n                                    を付ける\n                                "}
</td>
<td>
{"鳴るだけのアラームは運用負荷になる"}
</td>
</tr>
<tr className={"even"}>
<td>
{"4"}
</td>
<td>
{"組織全体のログを集約アカウントにまとめる"}
</td>
<td>
{"横断調査と監査が容易になる"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"5"}
</td>
<td>
{"\n                                    技術指標だけでなくビジネス指標 (注文数など)\n                                    もカスタムメトリクスにする\n                                "}
</td>
<td>
{"ユーザー影響を直接検知できる"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"34-step-2-アラートと自動修復を設計する"} tabIndex={-1}>
{"\n                    3.4 Step 2: アラートと自動修復を設計する\n                "}
</h3>
{"\n                "}
<h4>
{"基本パターン"}
</h4>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 11：基本パターン"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"検知元"}
</th>
<th scope="col">
{"連携"}
</th>
<th scope="col">
{"修復の実行"}
</th>
<th scope="col">
{"例"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"CloudWatch アラーム"}
</td>
<td>
{"EC2 アクション"}
</td>
<td>
{"インスタンスの再起動や復旧"}
</td>
<td>
{"\n                                    システムステータスチェック(StatusCheckFailed_System)失敗時に自動復旧(インスタンスステータスチェックの失敗は復旧アクションの対象外)\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"CloudWatch アラーム"}
</td>
<td>
{"SNS"}
</td>
<td>
{"人へ通知、または Lambda を起動"}
</td>
<td>
{"管理者へメール通知"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"AWS サービスのイベント"}
</td>
<td>
{"EventBridge ルール"}
</td>
<td>
{"Lambda、SSM Automation、Step Functions"}
</td>
<td>
{"EC2 停止イベントで自動起動"}
</td>
</tr>
<tr className={"even"}>
<td>
{"CloudTrail の API 呼び出し"}
</td>
<td>
{"EventBridge ルール"}
</td>
<td>
{"Lambda"}
</td>
<td>
{"セキュリティグループ変更を検知して元に戻す"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"AWS Config のルール違反"}
</td>
<td>
{"修復アクション"}
</td>
<td>
{"SSM Automation ドキュメント"}
</td>
<td>
{"\n                                    暗号化なしの S3 バケットにデフォルト暗号化を自動設定\n                                    (新規アップロードのみ対象。既存オブジェクトは S3 Batch\n                                    Operations のコピーで別途再暗号化)\n                                "}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h4>
{"EventBridge ルールの例 (EC2 の停止を検知)"}
</h4>
{"\n                "}
<pre className="code code-block" tabIndex={0} role="group" aria-label="json コード例">
<div className="code-line">
{"{"}
</div>
<div className="code-line">
{"  "}
<span className="hljs-attr">
{"\"source\""}
</span>
{": ["}
<span className="hljs-string">
{"\"aws.ec2\""}
</span>
{"],"}
</div>
<div className="code-line">
{"  "}
<span className="hljs-attr">
{"\"detail-type\""}
</span>
{": ["}
<span className="hljs-string">
{"\"EC2 Instance State-change Notification\""}
</span>
{"],"}
</div>
<div className="code-line">
{"  "}
<span className="hljs-attr">
{"\"detail\""}
</span>
{": {"}
</div>
<div className="code-line">
{"    "}
<span className="hljs-attr">
{"\"state\""}
</span>
{": ["}
<span className="hljs-string">
{"\"stopped\""}
</span>
{"]"}
</div>
<div className="code-line">
{"  }"}
</div>
<div className="code-line">
{"}"}
</div>
</pre>
{"\n                "}
<h4>
{"自動修復を導入する順序"}
</h4>
{"\n                "}
<Diagram id="diag-2" label={"自動修復を導入する順序"}/>
{"\n                "}
<h4>
{"ベストプラクティス"}
</h4>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 12：ベストプラクティス"}>
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
{"自動修復は冪等 (何度実行しても同じ結果) に作る"}
</td>
<td>
{"重複イベントでも壊れない"}
</td>
</tr>
<tr className={"even"}>
<td>
{"2"}
</td>
<td>
{"繰り返し発生する手作業を優先して自動化する"}
</td>
<td>
{"効果が大きい"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"3"}
</td>
<td>
{"\n                                    重要な修復は、まず通知だけで運用して誤検知を確認してから自動化する\n                                "}
</td>
<td>
{"誤った自動修復が障害を広げるのを防ぐ"}
</td>
</tr>
<tr className={"even"}>
<td>
{"4"}
</td>
<td>
{"自動修復の失敗自体もアラートにする"}
</td>
<td>
{"修復が止まっていることに気付ける"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"35-step-3-デプロイ戦略を評価改善する"} tabIndex={-1}>
{"\n                    3.5 Step 3: デプロイ戦略を評価・改善する\n                "}
</h3>
{"\n                "}
<h4>
{"デプロイ戦略の比較"}
</h4>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 13：デプロイ戦略の比較"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"戦略"}
</th>
<th scope="col">
{"仕組み"}
</th>
<th scope="col">
{"ダウンタイム"}
</th>
<th scope="col">
{"ロールバック"}
</th>
<th scope="col">
{"影響範囲"}
</th>
<th scope="col">
{"コスト"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"オールアットワンス"}
</td>
<td>
{"全台を一度に新バージョンへ"}
</td>
<td>
{"あり得る"}
</td>
<td>
{"再デプロイが必要で遅い"}
</td>
<td>
{"全体"}
</td>
<td>
{"低"}
</td>
</tr>
<tr className={"even"}>
<td>
{"ローリング"}
</td>
<td>
{"少数ずつ順に入れ替え"}
</td>
<td>
{"なし (容量は一時的に減る)"}
</td>
<td>
{"遅い"}
</td>
<td>
{"段階的"}
</td>
<td>
{"低"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"追加バッチ付きローリング"}
</td>
<td>
{"追加の台数を確保しながら順に入れ替え"}
</td>
<td>
{"なし (容量を維持)"}
</td>
<td>
{"遅い"}
</td>
<td>
{"段階的"}
</td>
<td>
{"中"}
</td>
</tr>
<tr className={"even"}>
<td>
{"イミュータブル"}
</td>
<td>
{"新しい台数を別に作り、成功後に切り替え"}
</td>
<td>
{"なし"}
</td>
<td>
{"速い (新環境を捨てる)"}
</td>
<td>
{"小"}
</td>
<td>
{"高"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"ブルーグリーン"}
</td>
<td>
{"\n                                    旧環境 (ブルー) と新環境 (グリーン)\n                                    を並べ、トラフィックを切り替え\n                                "}
</td>
<td>
{"なし"}
</td>
<td>
{"非常に速い (戻すだけ)"}
</td>
<td>
{"小"}
</td>
<td>
{"高 (一時的に 2 倍)"}
</td>
</tr>
<tr className={"even"}>
<td>
{"カナリア"}
</td>
<td>
{"ごく一部のトラフィックだけ新版へ送り、問題なければ全体へ"}
</td>
<td>
{"なし"}
</td>
<td>
{"速い"}
</td>
<td>
{"非常に小"}
</td>
<td>
{"中"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"リニア"}
</td>
<td>
{"一定割合ずつ時間をかけて新版へ移す"}
</td>
<td>
{"なし"}
</td>
<td>
{"速い"}
</td>
<td>
{"段階的"}
</td>
<td>
{"中"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h4>
{"戦略の選び方"}
</h4>
{"\n                "}
<Diagram id="diag-3" label={"戦略の選び方"}/>
{"\n                "}
<h4>
{"AWS サービスと戦略の対応"}
</h4>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 14：AWS サービスと戦略の対応"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"サービス"}
</th>
<th scope="col">
{"対応するデプロイ"}
</th>
<th scope="col">
{"補足"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"AWS CodeDeploy (EC2 とオンプレミス)"}
</td>
<td>
{"\n                                    インプレース (一度に全台、半数ずつ、1 台ずつ) とブルーグリーン\n                                "}
</td>
<td>
{"CloudWatch アラームによる自動ロールバックを設定できる"}
</td>
</tr>
<tr className={"even"}>
<td>
{"AWS CodeDeploy (Lambda)"}
</td>
<td>
{"カナリア、リニア、オールアットワンス"}
</td>
<td>
{"Lambda エイリアスの重み付けでトラフィックを移す"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"AWS CodeDeploy (Amazon ECS)"}
</td>
<td>
{"\n                                    ブルーグリーン\n                                    (カナリア、リニア、オールアットワンスのトラフィック移行)\n                                "}
</td>
<td>
{"ALB のターゲットグループを切り替える"}
</td>
</tr>
<tr className={"even"}>
<td>
{"AWS Elastic Beanstalk"}
</td>
<td>
{"\n                                    オールアットワンス、ローリング、追加バッチ付きローリング、イミュータブル、トラフィック分割\n                                "}
</td>
<td>
{"URL のスワップでブルーグリーン相当を実現"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Amazon EC2 Auto Scaling"}
</td>
<td>
{"インスタンスリフレッシュ"}
</td>
<td>
{"起動テンプレートの更新を段階的に反映"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Amazon Route 53"}
</td>
<td>
{"加重ルーティング"}
</td>
<td>
{"DNS レベルで新旧環境へ割合を指定"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"AWS CodePipeline"}
</td>
<td>
{"一連の CICD の流れを自動化"}
</td>
<td>
{"ソース、ビルド、テスト、承認、デプロイをつなぐ"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h4>
{"CodeDeploy の appspec.yml の例 (Lambda のカナリア)"}
</h4>
{"\n                "}
<pre className="code code-block" tabIndex={0} role="group" aria-label="yaml コード例">
<div className="code-line">
{""}
<span className="hljs-attr">
{"version"}
</span>
{": "}
<span className="hljs-number">
{"0"}
</span>
{"."}
<span className="hljs-number">
{"0"}
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
{"  - "}
<span className="hljs-attr">
{"MyFunction"}
</span>
{":"}
</div>
<div className="code-line">
{"      "}
<span className="hljs-attr">
{"Type"}
</span>
{": "}
<span className="hljs-attr">
{"AWS"}
</span>
{"::"}
<span className="hljs-attr">
{"Lambda"}
</span>
{"::Function"}
</div>
<div className="code-line">
{"      "}
<span className="hljs-attr">
{"Properties"}
</span>
{":"}
</div>
<div className="code-line">
{"        "}
<span className="hljs-attr">
{"Name"}
</span>
{": "}
<span className="hljs-string">
{"\"my-function\""}
</span>
{""}
</div>
<div className="code-line">
{"        "}
<span className="hljs-attr">
{"Alias"}
</span>
{": "}
<span className="hljs-string">
{"\"live\""}
</span>
{""}
</div>
<div className="code-line">
{"        "}
<span className="hljs-attr">
{"CurrentVersion"}
</span>
{": "}
<span className="hljs-string">
{"\"1\""}
</span>
{""}
</div>
<div className="code-line">
{"        "}
<span className="hljs-attr">
{"TargetVersion"}
</span>
{": "}
<span className="hljs-string">
{"\"2\""}
</span>
{""}
</div>
<div className="code-line">
{""}
<span className="hljs-attr">
{"Hooks"}
</span>
{":"}
</div>
<div className="code-line">
{"  - "}
<span className="hljs-attr">
{"BeforeAllowTraffic"}
</span>
{": "}
<span className="hljs-string">
{"\"PreTrafficValidationFunction\""}
</span>
{""}
</div>
<div className="code-line">
{"  - "}
<span className="hljs-attr">
{"AfterAllowTraffic"}
</span>
{": "}
<span className="hljs-string">
{"\"PostTrafficValidationFunction\""}
</span>
{""}
</div>
</pre>
{"\n                "}
<h4>
{"ベストプラクティス"}
</h4>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 15：ベストプラクティス"}>
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
{"小さく頻繁にデプロイする"}
</td>
<td>
{"1 回の変更が小さいほど原因の特定と戻しが容易"}
</td>
</tr>
<tr className={"even"}>
<td>
{"2"}
</td>
<td>
{"\n                                    デプロイ中の健全性指標にアラームを設定し、悪化したら自動ロールバックする\n                                "}
</td>
<td>
{"人が気付く前に影響を止められる"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"3"}
</td>
<td>
{"手作業の手順書をなくし、パイプラインとコードで管理する"}
</td>
<td>
{"再現性と監査性が上がる"}
</td>
</tr>
<tr className={"even"}>
<td>
{"4"}
</td>
<td>
{"本番に近い非本番環境で事前にテストする"}
</td>
<td>
{"本番での失敗を減らす"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"5"}
</td>
<td>
{"\n                                    データベースのスキーマ変更はアプリの新旧両バージョンと互換な形で段階的に行う\n                                "}
</td>
<td>
{"ブルーグリーンで戻せなくなる事態を防ぐ"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"36-step-4-構成管理を自動化する-aws-systems-manager"} tabIndex={-1}>
{"\n                    3.6 Step 4: 構成管理を自動化する (AWS Systems Manager)\n                "}
</h3>
{"\n                "}
<p>
{"\n                    AWS Systems Manager\n                    は、サーバー群の運用作業をまとめて自動化するための機能群です。\n                "}
</p>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 16：3.6 Step 4: 構成管理を自動化する (AWS Systems Manager)"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"機能"}
</th>
<th scope="col">
{"役割"}
</th>
<th scope="col">
{"使いどころ"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"Run Command"}
</td>
<td>
{"複数インスタンスへコマンドを一斉実行"}
</td>
<td>
{"緊急の設定変更"}
</td>
</tr>
<tr className={"even"}>
<td>
{"State Manager"}
</td>
<td>
{"望ましい構成を定義し、定期的に維持"}
</td>
<td>
{"設定のずれ (ドリフト) の自動修正"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Patch Manager"}
</td>
<td>
{"パッチの適用と準拠状況の確認"}
</td>
<td>
{"OS パッチの自動化"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Automation"}
</td>
<td>
{"手順書 (ランブック) を自動実行"}
</td>
<td>
{"修復作業の自動化"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Session Manager"}
</td>
<td>
{"SSH 不要でインスタンスへ接続"}
</td>
<td>
{"\n                                    踏み台サーバーとキーペアの廃止。セッションログ (S3/CloudWatch\n                                    Logs) を設定した場合はコマンドと出力を記録\n                                    (デフォルトでは記録されず、SSH・ポートフォワーディングのセッションは対象外)\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"Parameter Store"}
</td>
<td>
{"設定値と機密値の保管"}
</td>
<td>
{"アプリの設定管理"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Inventory"}
</td>
<td>
{"ソフトウェア構成の収集"}
</td>
<td>
{"資産管理"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Maintenance Windows"}
</td>
<td>
{"メンテナンス実施時間帯の定義"}
</td>
<td>
{"パッチ適用の計画"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<p>
{"\n                    あわせて、AWS CloudFormation の\n                    "}
<strong>
{"ドリフト検出"}
</strong>
{"\n                    を使うと、コードで定義した構成と実環境のずれを見つけられます。\n                "}
</p>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 17：3.6 Step 4: 構成管理を自動化する (AWS Systems Manager)"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"要件"}
</th>
<th scope="col">
{"推奨ソリューション"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"構成のずれを定期的に自動修正したい"}
</td>
<td>
{"Systems Manager State Manager"}
</td>
</tr>
<tr className={"even"}>
<td>
{"多数のサーバーのパッチを計画的に当てたい"}
</td>
<td>
{"Systems Manager Patch Manager とメンテナンスウィンドウ"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"SSH ポートを開けずに管理・監査したい"}
</td>
<td>
{"Systems Manager Session Manager"}
</td>
</tr>
<tr className={"even"}>
<td>
{"手順書を自動実行したい"}
</td>
<td>
{"Systems Manager Automation"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"コードで定義した構成との差分を検出したい"}
</td>
<td>
{"CloudFormation ドリフト検出"}
</td>
</tr>
<tr className={"even"}>
<td>
{"承認済みのテンプレートだけを利用者へ配布したい"}
</td>
<td>
{"AWS Service Catalog"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"37-step-5-災害対策-dr-を計画し障害訓練で検証する"} tabIndex={-1}>
{"\n                    3.7 Step 5: 災害対策 (DR) を計画し、障害訓練で検証する\n                "}
</h3>
{"\n                "}
<h4>
{"DR 戦略の 4 パターン"}
</h4>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 18：DR 戦略の 4 パターン"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"戦略"}
</th>
<th scope="col">
{"概要"}
</th>
<th scope="col">
{"目安の RTO/RPO"}
</th>
<th scope="col">
{"コスト"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"バックアップと復元"}
</td>
<td>
{"バックアップから必要時に再構築"}
</td>
<td>
{"数時間以上"}
</td>
<td>
{"最小"}
</td>
</tr>
<tr className={"even"}>
<td>
{"パイロットライト"}
</td>
<td>
{"データ基盤だけ常時稼働、アプリは停止しておく"}
</td>
<td>
{"数十分"}
</td>
<td>
{"小"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"ウォームスタンバイ"}
</td>
<td>
{"縮小版のシステムを常時稼働"}
</td>
<td>
{"数分"}
</td>
<td>
{"中"}
</td>
</tr>
<tr className={"even"}>
<td>
{"マルチサイト (アクティブ/アクティブ)"}
</td>
<td>
{"複数リージョンで同時稼働"}
</td>
<td>
{"ほぼゼロ"}
</td>
<td>
{"最大"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h4>
{"関連サービス"}
</h4>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 19：関連サービス"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"サービス"}
</th>
<th scope="col">
{"役割"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"AWS Elastic Disaster Recovery"}
</td>
<td>
{"\n                                    オンプレミスや他環境のサーバーを継続的にレプリケートし、障害時に\n                                    AWS 上で素早く復旧\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"AWS Backup"}
</td>
<td>
{"バックアップの一元管理と自動化"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Amazon Route 53"}
</td>
<td>
{"ヘルスチェックによるフェイルオーバー"}
</td>
</tr>
<tr className={"even"}>
<td>
{"AWS Fault Injection Service (FIS)"}
</td>
<td>
{"障害を意図的に注入して耐障害性を検証"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h4>
{"障害訓練 (ゲームデー) の手順"}
</h4>
{"\n                "}
<Diagram id="diag-4" label={"障害訓練 (ゲームデー) の手順"}/>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 20：障害訓練 (ゲームデー) の手順"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"ポイント"}
</th>
<th scope="col">
{"説明"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"停止条件"}
</td>
<td>
{"\n                                    CloudWatch アラームと連動し、影響が想定以上なら実験を自動停止\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"小さく始める"}
</td>
<td>
{"まず非本番、次に本番の限定範囲で実施"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"手順書も検証する"}
</td>
<td>
{"復旧手順が実際に通用するかを確認する"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"38-task-31-の試験での考え方"} tabIndex={-1}>
{"3.8 Task 3.1 の試験での考え方"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 21：3.8 Task 3.1 の試験での考え方"}>
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
{"手作業の運用を減らしたい"}
</td>
<td>
{"Systems Manager Automation、EventBridge と Lambda"}
</td>
</tr>
<tr className={"even"}>
<td>
{"設定のずれを自動修正したい"}
</td>
<td>
{"State Manager、Config の自動修復"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"即座に切り戻したい、ダウンタイムなし"}
</td>
<td>
{"ブルーグリーン"}
</td>
</tr>
<tr className={"even"}>
<td>
{"少数ユーザーで先に検証したい"}
</td>
<td>
{"カナリア"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"SSH を使わずに接続したい"}
</td>
<td>
{"Session Manager"}
</td>
</tr>
<tr className={"even"}>
<td>
{"復旧手順が本当に機能するか確かめたい"}
</td>
<td>
{"FIS による障害注入、DR テスト"}
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
<a href={"https://docs.aws.amazon.com/wellarchitected/latest/operational-excellence-pillar/welcome.html"}>
{"https://docs.aws.amazon.com/wellarchitected/latest/operational-excellence-pillar/welcome.html"}
</a>
{"\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<a href={"https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html"}>
{"https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html"}
</a>
{"\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<a href={"https://docs.aws.amazon.com/systems-manager/latest/userguide/what-is-systems-manager.html"}>
{"https://docs.aws.amazon.com/systems-manager/latest/userguide/what-is-systems-manager.html"}
</a>
{"\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<a href={"https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html"}>
{"https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html"}
</a>
{"\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<a href={"https://docs.aws.amazon.com/fis/latest/userguide/what-is.html"}>
{"https://docs.aws.amazon.com/fis/latest/userguide/what-is.html"}
</a>
{"\n                    "}
</li>
{"\n                "}
</ul>
{"\n\n                "}
</>; }
