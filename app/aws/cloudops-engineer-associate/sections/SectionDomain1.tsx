import { Diagram } from "../Diagram";
import CodeBlock from "../CodeBlock";


/**
 * SectionDomain1
 */
export default function SectionDomain1() {
    return (
        <>
<h1 id="s-h1-1">Domain 1: モニタリング、ログ、分析、修復、パフォーマンス最適化(22%)</h1>
<p>運用の基本は <strong>「見える化 → 検知 → 自動対応 → 継続的な改善」</strong> です。まず全体像を押さえましょう。</p>
<Diagram id="dg2" />

<h2 id="s-h2-3">Step 1. Task 1.1 メトリクス・アラーム・フィルターの実装</h2>
<h3 id="s-h3-9">Skill 1.1.1 🔴 CloudWatch / CloudTrail / Managed Prometheus で監視とログを構成する</h3>
<blockquote>
<p>公式スキル文: AWS サービス(例: Amazon CloudWatch、AWS CloudTrail、Amazon Managed Service for Prometheus)を使い、ワークロード(例: サーバーレス、コンピュート、AI)の監視とログを構成する。</p>
</blockquote>
<h4>(1) まず用語を整理しよう</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">用語</th>
<th scope="col">意味</th>
<th scope="col">たとえ話</th>
</tr>
</thead>
<tbody>
<tr>
<td>メトリクス</td>
<td>時系列の数値データ(CPU 使用率など)</td>
<td>体温計の数値</td>
</tr>
<tr>
<td>ログ</td>
<td>テキストの記録(アプリのエラー出力など)</td>
<td>日記・業務日誌</td>
</tr>
<tr>
<td>トレース</td>
<td>リクエストが通った経路の記録</td>
<td>荷物の追跡番号</td>
</tr>
<tr>
<td>アラーム</td>
<td>メトリクスが閾値を超えたら状態が変わる仕組み</td>
<td>体温が 38 度を超えたらアラーム</td>
</tr>
<tr>
<td>監査ログ</td>
<td>「誰が・いつ・何をしたか」の記録</td>
<td>防犯カメラの記録</td>
</tr>
</tbody>
</table></div>
<h4>(2) 3 つの主要サービスの役割分担</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">サービス</th>
<th scope="col">役割</th>
<th scope="col">主な用途</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Amazon CloudWatch</strong></td>
<td>メトリクス・ログ・アラーム・ダッシュボード</td>
<td>性能監視、アプリログ分析、異常検知</td>
</tr>
<tr>
<td><strong>AWS CloudTrail</strong></td>
<td>AWS API 呼び出しの記録(監査)</td>
<td>「誰が SG を変更したか」の調査、コンプライアンス</td>
</tr>
<tr>
<td><strong>Amazon Managed Service for Prometheus (AMP)</strong></td>
<td>Prometheus 互換のメトリクス管理サービス</td>
<td>コンテナ(EKS / ECS)のメトリクス収集</td>
</tr>
</tbody>
</table></div>
<blockquote>
<p>💡 <strong>CloudWatch = 性能・稼働の監視 / CloudTrail = 操作の監査</strong> と覚えると、選択肢の取り違えを防げます。</p>
</blockquote>
<h4>(3) CloudWatch の基本構造</h4>
<Diagram id="dg3" />

<p><strong>押さえるポイント</strong></p>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">項目</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>名前空間(Namespace)</td>
<td>メトリクスをグループ化する入れ物(例: <code>AWS/EC2</code>、エージェントの既定は <code>CWAgent</code>)</td>
</tr>
<tr>
<td>ディメンション</td>
<td>メトリクスを識別する名前と値のペア(例: <code>InstanceId</code>)</td>
</tr>
<tr>
<td>EC2 の標準メトリクス</td>
<td>既定(基本モニタリング)は <strong>5 分間隔</strong>、詳細モニタリングを有効化すると <strong>1 分間隔</strong></td>
</tr>
<tr>
<td>標準メトリクスに <strong>ない</strong> もの</td>
<td>EC2 の <strong>メモリ使用率・ディスク使用率</strong> は標準では取得できない → <strong>CloudWatch エージェント</strong> が必要(Skill 1.1.2)</td>
</tr>
<tr>
<td>高解像度カスタムメトリクス</td>
<td>最短 1 秒間隔で発行可能</td>
</tr>
<tr>
<td>メトリクスフィルター</td>
<td>ログ内のパターン(例: <code>ERROR</code>)を数えてメトリクス化し、アラームにつなぐ</td>
</tr>
<tr>
<td>Logs Insights</td>
<td>ログに対するクエリ言語での集計・検索</td>
</tr>
<tr>
<td>ログのリテンション</td>
<td>ロググループごとに保持期間を設定(既定は無期限のため、コストに注意)</td>
</tr>
</tbody>
</table></div>
<p><strong>Logs Insights のクエリ例(エラーの件数を 5 分ごとに集計)</strong></p>
<CodeBlock index={0} />

<h4>(4) CloudTrail の基本</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">項目</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>イベント履歴</td>
<td>コンソールで <strong>過去 90 日</strong> の管理イベントを無料で参照可能</td>
</tr>
<tr>
<td>証跡(Trail)</td>
<td>S3(必要に応じて CloudWatch Logs)に継続保存。<strong>90 日を超える保管には証跡が必須</strong></td>
</tr>
<tr>
<td>イベントの種類</td>
<td>管理イベント(リソース操作)、データイベント(S3 オブジェクト操作・Lambda 実行など。要有効化)、Insights イベント(異常な API 利用の検知)</td>
</tr>
<tr>
<td>組織の証跡</td>
<td>AWS Organizations 全アカウントの操作を 1 つの証跡に集約できる</td>
</tr>
<tr>
<td>ログファイル検証</td>
<td>ダイジェストファイルで改ざんを検出できる</td>
</tr>
<tr>
<td>CloudTrail Lake</td>
<td>イベントを SQL でクエリできるマネージドなデータストア</td>
</tr>
</tbody>
</table></div>
<h4>(5) ワークロード別の監視ポイント(公式文の「サーバーレス・コンピュート・AI」)</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">ワークロード</th>
<th scope="col">代表的な監視対象</th>
</tr>
</thead>
<tbody>
<tr>
<td>サーバーレス(Lambda)</td>
<td><code>Invocations</code>、<code>Errors</code>、<code>Duration</code>、<code>Throttles</code>、<code>ConcurrentExecutions</code>、ログ(CloudWatch Logs)、Lambda Insights</td>
</tr>
<tr>
<td>コンピュート(EC2)</td>
<td><code>CPUUtilization</code>、<code>StatusCheckFailed</code>、<code>NetworkIn/Out</code>、メモリ・ディスク(エージェント)</td>
</tr>
<tr>
<td>コンテナ(ECS / EKS)</td>
<td>Container Insights、AMP + Managed Grafana</td>
</tr>
<tr>
<td>AI(Amazon Bedrock など)</td>
<td>モデル呼び出しログ(CloudWatch Logs / S3 へ出力可能)、呼び出し回数・レイテンシ・エラーのメトリクス、CloudTrail による API 監査</td>
</tr>
</tbody>
</table></div>
<h4>(6) ベストプラクティス</h4>
<ul>
<li>標準メトリクスで足りない部分(メモリ・ディスク・プロセス)は <strong>CloudWatch エージェント</strong> で補う</li>
<li>ロググループには <strong>保持期間を必ず設定</strong> し、不要なログのコスト増大を防ぐ</li>
<li><strong>証跡(Trail)を全リージョンで有効化</strong> し、S3 に保存。ログファイル検証を有効にする</li>
<li>重要なアカウントでは <strong>組織の証跡</strong> で集約し、保存先 S3 を別アカウントに分離する</li>
<li>「監視 = CloudWatch」「監査 = CloudTrail」の役割を混同しない</li>
<li>アラームは <strong>ユーザー影響に近い指標</strong>(エラー率・レイテンシ)を優先し、アラート疲れを避ける</li>
</ul>
<h4>(7) つまずきポイント(試験の定番)</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">症状・設問</th>
<th scope="col">答え</th>
</tr>
</thead>
<tbody>
<tr>
<td>EC2 のメモリ使用率が CloudWatch に出ない</td>
<td>標準メトリクスには含まれない → CloudWatch エージェントをインストール</td>
</tr>
<tr>
<td>1 年前の API 操作を調べたい</td>
<td>CloudTrail イベント履歴は 90 日まで → 証跡(S3)や CloudTrail Lake を使う</td>
</tr>
<tr>
<td>ログの特定文字列でアラームを鳴らしたい</td>
<td>メトリクスフィルター → アラーム</td>
</tr>
<tr>
<td>誰が S3 バケットを削除したか調べたい</td>
<td>CloudTrail</td>
</tr>
</tbody>
</table></div>
<h4>(8) 参考 URL</h4>
<ul>
<li>CloudWatch: <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html">https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html</a></li>
<li>CloudWatch Logs Insights: <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html">https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html</a></li>
<li>メトリクスフィルター: <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/MonitoringLogData.html">https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/MonitoringLogData.html</a></li>
<li>CloudTrail: <a href="https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html">https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html</a></li>
<li>Amazon Managed Service for Prometheus: <a href="https://docs.aws.amazon.com/prometheus/latest/userguide/what-is-Amazon-Managed-Service-Prometheus.html">https://docs.aws.amazon.com/prometheus/latest/userguide/what-is-Amazon-Managed-Service-Prometheus.html</a></li>
<li>Amazon Bedrock モデル呼び出しログ: <a href="https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html">https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html</a></li>
</ul>
<h3 id="s-h3-10">Skill 1.1.2 🔴 CloudWatch エージェントの設定と管理</h3>
<blockquote>
<p>公式スキル文: CloudWatch エージェントを設定・管理し、EC2 インスタンス、Amazon ECS クラスター、Amazon EKS クラスターからメトリクスとログを収集する。<strong>SOA-C03 で追加されたスキル</strong>です。</p>
</blockquote>
<h4>(1) なぜ必要か</h4>
<p>EC2 の標準メトリクスは <strong>ハイパーバイザー側から見える情報</strong> です。OS の内側(メモリ、ディスク使用率、プロセス、アプリログ)は見えません。これを補うのが <strong>CloudWatch エージェント</strong> です。</p>
<h4>(2) EC2 への導入の流れ</h4>
<Diagram id="dg4" />

<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">項目</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>必要な権限</td>
<td>AWS 管理ポリシー <strong>CloudWatchAgentServerPolicy</strong> を持つ IAM ロール(Parameter Store から設定を読む場合は追加権限が必要な場合あり)</td>
</tr>
<tr>
<td>インストール方法</td>
<td>Systems Manager の Run Command / Distributor、パッケージ手動インストール、AMI に事前組み込み</td>
</tr>
<tr>
<td>設定ファイル</td>
<td>JSON。<code>metrics</code>(収集するメトリクス)、<code>logs</code>(収集するログファイル)などを定義。<code>amazon-cloudwatch-agent-config-wizard</code> で対話的に作成可能</td>
</tr>
<tr>
<td>設定の一元管理</td>
<td><strong>Systems Manager Parameter Store</strong> に保存し、複数インスタンスで共有</td>
</tr>
<tr>
<td>既定の名前空間</td>
<td><code>CWAgent</code></td>
</tr>
<tr>
<td>収集できるもの</td>
<td>メモリ、ディスク使用率、スワップ、ネットワーク、プロセス(procstat)、カスタムログファイル、StatsD / collectd のメトリクス</td>
</tr>
<tr>
<td>対応環境</td>
<td>Linux / Windows / オンプレミスサーバー(ハイブリッド)</td>
</tr>
</tbody>
</table></div>
<p><strong>設定ファイルの最小例(メモリ・ディスクとログ 1 つ)</strong></p>
<CodeBlock index={1} />

<h4>(3) ECS / EKS での収集</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">環境</th>
<th scope="col">収集方法</th>
<th scope="col">ポイント</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Amazon ECS</strong></td>
<td><strong>Container Insights</strong> を有効化(クラスター設定)。EC2 起動タイプでは CloudWatch エージェントをデーモンとして実行する構成も使用</td>
<td>タスク / サービス単位の CPU・メモリ・ネットワークを可視化。Fargate はクラスターの Container Insights 設定で収集</td>
</tr>
<tr>
<td><strong>Amazon EKS</strong></td>
<td><strong>Amazon CloudWatch Observability</strong> の EKS アドオン(エージェントと Fluent Bit をまとめて導入)</td>
<td>ノード / Pod / コンテナのメトリクスとログ。アドオン用のサービスアカウントに IAM 権限が必要(IRSA / EKS Pod Identity)</td>
</tr>
</tbody>
</table></div>
<Diagram id="dg5" />

<h4>(4) ベストプラクティス</h4>
<ul>
<li><strong>設定ファイルは Parameter Store に集約</strong> し、全台に同一設定を配布する(設定のばらつきを防ぐ)</li>
<li>エージェントは <strong>Golden AMI に組み込む</strong> か、<strong>State Manager の関連付け</strong> で導入・更新を自動化する</li>
<li>収集するメトリクス・ログは <strong>必要なものに絞る</strong>(カスタムメトリクスとログ取り込みは課金対象)</li>
<li>ログは <strong>ロググループの保持期間</strong> を設定する</li>
<li>EKS は <strong>アドオン</strong> を使うと導入・更新が簡単。権限は <strong>ノードのロールではなく Pod 単位</strong>(IRSA / Pod Identity)で付与する方が最小権限に近づく</li>
</ul>
<h4>(5) つまずきポイント(トラブルシュート)</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">症状</th>
<th scope="col">確認すること</th>
</tr>
</thead>
<tbody>
<tr>
<td>メトリクスが CloudWatch に出ない</td>
<td>IAM ロールの権限、エージェントが起動しているか、設定ファイルの構文、<strong>ネットワーク経路</strong>(インターネット / NAT / CloudWatch の VPC エンドポイント)</td>
</tr>
<tr>
<td>ログが出ない</td>
<td><code>file_path</code> の誤り、ログファイルの読み取り権限、ロググループ名</td>
</tr>
<tr>
<td>設定を変えたのに反映されない</td>
<td><code>fetch-config</code> でエージェントの再読み込みをしたか</td>
</tr>
<tr>
<td>エージェントのログを見たい</td>
<td>Linux では <code>/opt/aws/amazon-cloudwatch-agent/logs/amazon-cloudwatch-agent.log</code></td>
</tr>
</tbody>
</table></div>
<h4>(6) 参考 URL</h4>
<ul>
<li>CloudWatch エージェントのインストール: <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Install-CloudWatch-Agent.html">https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Install-CloudWatch-Agent.html</a></li>
<li>設定ファイルの詳細: <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Agent-Configuration-File-Details.html">https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Agent-Configuration-File-Details.html</a></li>
<li>Container Insights: <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/ContainerInsights.html">https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/ContainerInsights.html</a></li>
</ul>
<h3 id="s-h3-11">Skill 1.1.3 🔴 CloudWatch アラームの設定・特定・トラブルシュート(複合アラーム含む)</h3>
<blockquote>
<p>公式スキル文: AWS サービスを直接、または Amazon EventBridge 経由で呼び出せる CloudWatch アラームを設定・特定・トラブルシュートする(例: 複合アラームの作成と、呼び出せるアクションの特定)。</p>
</blockquote>
<h4>(1) アラームの 3 つの状態</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">状態</th>
<th scope="col">意味</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>OK</code></td>
<td>メトリクスが閾値の範囲内</td>
</tr>
<tr>
<td><code>ALARM</code></td>
<td>メトリクスが閾値を超えている(条件を満たした)</td>
</tr>
<tr>
<td><code>INSUFFICIENT_DATA</code></td>
<td>データが不足していて判定できない(開始直後、データ欠落など)</td>
</tr>
</tbody>
</table></div>
<h4>(2) アラームの評価の仕組み</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">設定項目</th>
<th scope="col">意味</th>
</tr>
</thead>
<tbody>
<tr>
<td>期間(Period)</td>
<td>1 つのデータポイントを集計する時間幅</td>
</tr>
<tr>
<td>統計(Statistic)</td>
<td>平均、最大、合計、パーセンタイルなど</td>
</tr>
<tr>
<td>評価期間 / M out of N</td>
<td>「直近 N 個のデータポイントのうち M 個が閾値超過」で ALARM(一時的なスパイクで鳴らさないために使う)</td>
</tr>
<tr>
<td>欠落データの扱い</td>
<td><code>missing</code>(既定)/ <code>notBreaching</code>(正常扱い)/ <code>breaching</code>(異常扱い)/ <code>ignore</code>(直前の状態を維持)</td>
</tr>
<tr>
<td>異常検知アラーム</td>
<td>過去の傾向から期待値の帯を学習し、外れたら ALARM</td>
</tr>
<tr>
<td>メトリクス数式</td>
<td>複数メトリクスを式で組み合わせてアラーム化(例: エラー数 / リクエスト数)</td>
</tr>
</tbody>
</table></div>
<h4>(3) アラームが実行できるアクション</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">アクションの種類</th>
<th scope="col">内容</th>
<th style={{ textAlign: "center" }} scope="col">単一アラーム</th>
<th style={{ textAlign: "center" }} scope="col">複合アラーム</th>
</tr>
</thead>
<tbody>
<tr>
<td>SNS トピックへ通知</td>
<td>メール・SMS・Lambda など</td>
<td style={{ textAlign: "center" }}>○</td>
<td style={{ textAlign: "center" }}>○</td>
</tr>
<tr>
<td>EC2 アクション</td>
<td>停止 / 終了 / 再起動 / <strong>復旧(recover)</strong></td>
<td style={{ textAlign: "center" }}>○</td>
<td style={{ textAlign: "center" }}><strong>×</strong></td>
</tr>
<tr>
<td>Auto Scaling アクション</td>
<td>スケーリングポリシーの実行</td>
<td style={{ textAlign: "center" }}>○</td>
<td style={{ textAlign: "center" }}><strong>×</strong></td>
</tr>
<tr>
<td>Systems Manager アクション</td>
<td>OpsItem / インシデントの作成</td>
<td style={{ textAlign: "center" }}>○</td>
<td style={{ textAlign: "center" }}>○</td>
</tr>
<tr>
<td>EventBridge</td>
<td>アラームの <strong>状態変化イベント</strong> が自動的に EventBridge に送られ、ルールで Lambda 等を呼べる</td>
<td style={{ textAlign: "center" }}>○</td>
<td style={{ textAlign: "center" }}>○</td>
</tr>
</tbody>
</table></div>
<blockquote>
<p>💡 <strong>試験の定番</strong>: 「アラームから直接 EC2 を復旧・再起動したい」→ 単一アラームの EC2 アクション。「複数のアラームの組み合わせで通知したい」→ 複合アラーム(ただし EC2 / Auto Scaling アクションは持てない)。</p>
</blockquote>
<h4>(4) 複合アラーム(Composite Alarm)</h4>
<p>複数のアラームを <strong>AND / OR / NOT</strong> で組み合わせて 1 つのアラームにします。ノイズ(誤検知)の削減が目的です。</p>
<Diagram id="dg6" />

<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">項目</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>ルール式の例</td>
<td><code>ALARM("cpu-high") AND ALARM("latency-high")</code></td>
</tr>
<tr>
<td>利点</td>
<td>「CPU が高いだけ」では通知せず、「CPU も遅延も悪い」ときだけ通知できる</td>
</tr>
<tr>
<td>アクション抑制</td>
<td>抑制用アラーム(ActionsSuppressor)を指定して、メンテナンス中などに通知を止められる</td>
</tr>
</tbody>
</table></div>
<h4>(5) EC2 の自動復旧アラーム</h4>
<p><code>StatusCheckFailed_System</code>(システムステータスチェック失敗)に <strong>recover アクション</strong> を設定すると、基盤ハードウェア障害時に <strong>同じインスタンス ID・同じ IP を保ったまま別ハードウェアへ復旧</strong> できます。</p>
<h4>(6) ベストプラクティス</h4>
<ul>
<li>閾値超過が <strong>一瞬だけ</strong> で鳴らないよう、M out of N と適切な期間を使う</li>
<li><strong>欠落データの扱い</strong> を意図的に選ぶ(例: 通常は定期的にデータが来るメトリクスで、途絶えたら異常にしたいなら <code>breaching</code>)</li>
<li>複合アラームで <strong>通知の重複・ノイズを減らす</strong></li>
<li>アラームの名前・説明に <strong>対応手順(ランブック)へのリンク</strong> を書く</li>
<li>アラームは <strong>IaC(CloudFormation / CDK)で管理</strong> する</li>
</ul>
<h4>(7) トラブルシュート</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">症状</th>
<th scope="col">原因と対処</th>
</tr>
</thead>
<tbody>
<tr>
<td>ずっと <code>INSUFFICIENT_DATA</code></td>
<td>メトリクスが発行されていない / ディメンションの指定ミス / リージョン違い / 欠落データの扱い設定</td>
</tr>
<tr>
<td>ALARM なのに通知が来ない</td>
<td>SNS トピックのアクセスポリシー、サブスクリプションの未承認、トピックの KMS 暗号化設定(Skill 1.1.5 参照)</td>
</tr>
<tr>
<td>アクションが実行されない</td>
<td>アクションの ARN 誤り、IAM 権限(例: EC2 アクションにはサービスリンクロール等)</td>
</tr>
</tbody>
</table></div>
<h4>(8) 参考 URL</h4>
<ul>
<li>CloudWatch アラーム: <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html">https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html</a></li>
<li>複合アラーム: <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Create_Composite_Alarm.html">https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Create_Composite_Alarm.html</a></li>
</ul>
<h3 id="s-h3-12">Skill 1.1.4 🟡 クロスアカウント / クロスリージョンのダッシュボード</h3>
<blockquote>
<p>公式スキル文: 複数アカウント・複数リージョンの AWS リソースのメトリクスとアラームを表示する、カスタマイズ可能で共有可能な CloudWatch ダッシュボードを作成・実装・管理する。</p>
</blockquote>
<h4>(1) ダッシュボードとは</h4>
<p>CloudWatch ダッシュボードは、メトリクス・アラーム・ログのクエリ結果を <strong>1 つの画面に並べるカスタマイズ可能なホーム画面</strong> です。</p>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">ウィジェット</th>
<th scope="col">用途</th>
</tr>
</thead>
<tbody>
<tr>
<td>折れ線 / 積み上げ / 数値 / ゲージ</td>
<td>メトリクスの可視化</td>
</tr>
<tr>
<td>アラームステータス</td>
<td>複数アラームの状態を一覧</td>
</tr>
<tr>
<td>ログテーブル</td>
<td>Logs Insights のクエリ結果</td>
</tr>
<tr>
<td>テキスト</td>
<td>説明・Runbook へのリンク</td>
</tr>
</tbody>
</table></div>
<h4>(2) クロスアカウント・クロスリージョンの仕組み</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">項目</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>クロスリージョン</td>
<td>ダッシュボードは <strong>グローバルに作成でき</strong>、1 つのダッシュボードに複数リージョンのメトリクスを混在させられる</td>
</tr>
<tr>
<td>クロスアカウント</td>
<td><strong>CloudWatch クロスアカウントオブザーバビリティ</strong> を使う。<strong>モニタリングアカウント</strong>(閲覧側)と <strong>ソースアカウント</strong>(監視される側)をリンクする</td>
</tr>
<tr>
<td>仕組み</td>
<td>モニタリングアカウントに <strong>シンク(sink)</strong>、ソースアカウントに <strong>リンク(link)</strong> を作成(Observability Access Manager: OAM)</td>
</tr>
<tr>
<td>共有できるデータ</td>
<td>メトリクス、ログ、トレース(X-Ray)など</td>
</tr>
<tr>
<td>AWS Organizations 連携</td>
<td>組織全体 / OU 単位でソースアカウントを一括でリンクできる</td>
</tr>
</tbody>
</table></div>
<Diagram id="dg7" />

<h4>(3) ダッシュボードの共有</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">共有方法</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>特定のメールアドレスと共有</td>
<td>指定ユーザーが IAM Identity Center 等を通じて閲覧(AWS コンソールのアカウント不要)</td>
</tr>
<tr>
<td>特定アカウントと共有</td>
<td>他の AWS アカウントのユーザーに閲覧を許可</td>
</tr>
<tr>
<td>公開共有</td>
<td>認証なしでリンクを知っている人なら誰でも閲覧可(機密データには使わない)</td>
</tr>
</tbody>
</table></div>
<h4>(4) ベストプラクティス</h4>
<ul>
<li><strong>運用専用のモニタリングアカウント</strong> を設け、複数アカウントの状況を集約して見る</li>
<li>ダッシュボードは <strong>目的別</strong>(サービス全体の健康状態 / 容量 / コスト・性能)に分け、<strong>最上段に最重要指標</strong> を置く</li>
<li><strong>ダッシュボード本体も IaC で管理</strong> し、環境間で再現できるようにする</li>
<li>公開共有は <strong>機密性のない指標のみ</strong> に限定する</li>
<li>「ダッシュボードの閲覧権限」と「メトリクスの参照権限」は別である点に注意(IAM で最小権限を付与)</li>
</ul>
<h4>(5) 参考 URL</h4>
<ul>
<li>CloudWatch ダッシュボード: <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Dashboards.html">https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Dashboards.html</a></li>
<li>クロスアカウントオブザーバビリティ: <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Unified-Cross-Account.html">https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Unified-Cross-Account.html</a></li>
</ul>
<h3 id="s-h3-13">Skill 1.1.5 🔴 SNS への通知設定</h3>
<blockquote>
<p>公式スキル文: AWS サービスが Amazon SNS に通知を送るよう設定し、アラームが SNS 通知を送るよう設定する。</p>
</blockquote>
<h4>(1) SNS の基本(Pub/Sub モデル)</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">用語</th>
<th scope="col">意味</th>
</tr>
</thead>
<tbody>
<tr>
<td>トピック</td>
<td>メッセージの送り先となる論理的なチャンネル</td>
</tr>
<tr>
<td>パブリッシャー</td>
<td>トピックにメッセージを送る側(CloudWatch、S3、自分のアプリなど)</td>
</tr>
<tr>
<td>サブスクライバー</td>
<td>トピックからメッセージを受け取る側</td>
</tr>
<tr>
<td>サブスクリプションのプロトコル</td>
<td>メール、SMS、HTTP/HTTPS、<strong>Lambda</strong>、<strong>SQS</strong>、Kinesis Data Firehose、モバイルプッシュなど</td>
</tr>
<tr>
<td>標準トピック / FIFO トピック</td>
<td>標準 = 高スループット・順序は保証されない / FIFO = 順序保証・重複排除(SQS FIFO と組み合わせ)</td>
</tr>
</tbody>
</table></div>
<Diagram id="dg8" />

<h4>(2) 「AWS サービス → SNS」で最重要の考え方</h4>
<p>AWS サービスが SNS に発行するには、<strong>トピックのアクセスポリシー(リソースベースポリシー)で、そのサービスのプリンシパルに <code>sns:Publish</code> を許可</strong> する必要があります。</p>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">発行元</th>
<th scope="col">プリンシパルの例</th>
<th scope="col">補足</th>
</tr>
</thead>
<tbody>
<tr>
<td>CloudWatch アラーム</td>
<td><code>cloudwatch.amazonaws.com</code></td>
<td>コンソールから作成すると自動で許可されることが多い</td>
</tr>
<tr>
<td>S3 イベント通知</td>
<td><code>s3.amazonaws.com</code></td>
<td>ソースのバケット ARN / アカウントを Condition で絞る</td>
</tr>
<tr>
<td>EventBridge ルール</td>
<td><code>events.amazonaws.com</code></td>
<td>ターゲットとして SNS を指定</td>
</tr>
<tr>
<td>Auto Scaling 通知</td>
<td>Auto Scaling が通知を送る設定</td>
<td>ライフサイクルイベントの通知など</td>
</tr>
<tr>
<td>CloudFormation</td>
<td>スタックの通知 ARN に SNS を指定</td>
<td>スタックイベントの通知</td>
</tr>
</tbody>
</table></div>
<p><strong>アクセスポリシーの例(S3 から発行を許可)</strong></p>
<CodeBlock index={2} />

<h4>(3) 暗号化トピックの落とし穴</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">ポイント</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>暗号化</td>
<td>トピックは KMS による保管時暗号化(SSE)を設定できる</td>
</tr>
<tr>
<td><strong>AWS マネージドキー(<code>alias/aws/sns</code>)の制約</strong></td>
<td>CloudWatch アラームや EventBridge などのサービスが発行する場合、<strong>AWS マネージドキーではキーポリシーを変更できず発行に失敗する</strong></td>
</tr>
<tr>
<td>対処</td>
<td><strong>カスタマー管理キー</strong> を使い、キーポリシーで <code>cloudwatch.amazonaws.com</code> などに <code>kms:GenerateDataKey*</code> と <code>kms:Decrypt</code> を許可する</td>
</tr>
</tbody>
</table></div>
<h4>(4) その他の機能</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">機能</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>メッセージフィルタリング</td>
<td>サブスクリプションごとにフィルターポリシーを設定し、必要なメッセージだけ受信</td>
</tr>
<tr>
<td>配信ポリシー / リトライ</td>
<td>HTTP/S エンドポイントへの再試行設定</td>
</tr>
<tr>
<td>デッドレターキュー(DLQ)</td>
<td>配信に失敗したメッセージを SQS に退避</td>
</tr>
<tr>
<td>ファンアウト</td>
<td>1 つの SNS トピック → 複数の SQS キューへ配信</td>
</tr>
</tbody>
</table></div>
<h4>(5) ベストプラクティス</h4>
<ul>
<li>通知先は <strong>個人メールではなく配布リスト / ChatOps / オンコールツール</strong> にする</li>
<li>トピックアクセスポリシーは <strong><code>aws:SourceArn</code> / <code>aws:SourceAccount</code> で発行元を絞る</strong>(混乱した代理人問題の対策)</li>
<li><strong>重大度別にトピックを分ける</strong>(例: critical / warning)</li>
<li>重要な配信には <strong>DLQ</strong> を設定し、失敗を検知できるようにする</li>
<li>メールのサブスクリプションは <strong>承認(Confirm)しないと有効にならない</strong></li>
</ul>
<h4>(6) トラブルシュート</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">症状</th>
<th scope="col">原因</th>
</tr>
</thead>
<tbody>
<tr>
<td>通知が届かない</td>
<td>サブスクリプション未承認、アクセスポリシーの不足、KMS キーポリシーの不足、フィルターポリシーで除外</td>
</tr>
<tr>
<td>S3 イベント通知の設定が保存できない</td>
<td>SNS トピックのアクセスポリシーに S3 からの発行許可がない</td>
</tr>
</tbody>
</table></div>
<h4>(7) 参考 URL</h4>
<ul>
<li>SNS 概要: <a href="https://docs.aws.amazon.com/sns/latest/dg/welcome.html">https://docs.aws.amazon.com/sns/latest/dg/welcome.html</a></li>
<li>SNS の保管時暗号化: <a href="https://docs.aws.amazon.com/sns/latest/dg/sns-server-side-encryption.html">https://docs.aws.amazon.com/sns/latest/dg/sns-server-side-encryption.html</a></li>
</ul>
<h2 id="s-h2-4">Step 2. Task 1.2 監視メトリクスによる問題の特定と修復</h2>
<h3 id="s-h3-14">Skill 1.2.1 🔴 パフォーマンスメトリクスの分析と自動修復</h3>
<blockquote>
<p>公式スキル文: AWS サービスと機能(例: CloudWatch、Lambda、AWS Systems Manager、CloudTrail、Kiro、AWS DevOps Agent)を使い、パフォーマンスメトリクスを分析して修復戦略を自動化する。</p>
</blockquote>
<h4>(1) 自動修復の基本パターン</h4>
<p>「検知 → 判断 → 実行」を <strong>人手を介さずに</strong> つなぐのが自動修復です。</p>
<Diagram id="dg9" />

<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">修復の例</th>
<th scope="col">方法</th>
</tr>
</thead>
<tbody>
<tr>
<td>EC2 のハードウェア障害</td>
<td>CloudWatch アラーム(<code>StatusCheckFailed_System</code>)の <strong>recover アクション</strong></td>
</tr>
<tr>
<td>アプリのハング</td>
<td>アラーム → EventBridge → SSM Automation で再起動</td>
</tr>
<tr>
<td>負荷増大</td>
<td>アラーム → Auto Scaling ポリシー</td>
</tr>
<tr>
<td>設定ドリフト / 違反</td>
<td>AWS Config ルール → <strong>修復アクション(SSM Automation)</strong></td>
</tr>
<tr>
<td>不審な操作</td>
<td>CloudTrail イベント → EventBridge → Lambda で取り消し</td>
</tr>
</tbody>
</table></div>
<h4>(2) 使うサービスの役割</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">サービス</th>
<th scope="col">役割</th>
</tr>
</thead>
<tbody>
<tr>
<td>CloudWatch</td>
<td>メトリクス・ログ・アラームで「異常」を検知</td>
</tr>
<tr>
<td>CloudTrail</td>
<td>「誰が・何を変更したか」で原因を特定(変更起因の障害調査)</td>
</tr>
<tr>
<td>Lambda</td>
<td>任意のロジックによる修復処理</td>
</tr>
<tr>
<td>Systems Manager</td>
<td>Automation ランブック、Run Command、OpsCenter による修復と運用管理</td>
</tr>
</tbody>
</table></div>
<h4>(3) 新しい AI 系の運用支援(公式文の例示)</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">サービス</th>
<th scope="col">概要</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>AWS DevOps Agent</strong></td>
<td>インシデントを自律的に調査する「フロンティアエージェント」。CloudWatch のアラームなどをトリガーに、テレメトリ・コード・デプロイ履歴を相関させ、原因の推定や緩和策の提案を行う。AWS だけでなくマルチクラウド / オンプレミスも対象。EventBridge イベントの発行にも対応</td>
</tr>
<tr>
<td><strong>Kiro</strong></td>
<td>AWS のエージェント型開発支援ツール(IDE / CLI)。運用作業のスクリプト化や IaC の修正をエージェントに支援させる用途で例示されている</td>
</tr>
</tbody>
</table></div>
<blockquote>
<p>📝 <strong>学習上の注意</strong>: これらは公式スキル文の例示ですが、試験の中心は依然として <strong>CloudWatch / EventBridge / Lambda / Systems Manager による自動化の理解</strong> です。AI エージェントは「調査・原因推定を速める補助」であり、<strong>権限(IAM)を最小化し、人間が承認する運用</strong> を前提に考えるのが安全です。</p>
</blockquote>
<h4>(4) ベストプラクティス</h4>
<ul>
<li><strong>まず検知を正確に</strong>: ユーザー影響に近い指標(エラー率・レイテンシ)でアラームを設定する</li>
<li>自動修復は <strong>冪等(何度実行しても同じ結果)</strong> に作る。再起動の無限ループにならないよう <strong>回数制限やクールダウン</strong> を入れる</li>
<li>自動修復の実行ロールは <strong>最小権限</strong></li>
<li>変更が原因の障害は <strong>CloudTrail で変更履歴を確認</strong> する</li>
<li>重大な操作(削除・本番変更)は <strong>承認ステップ(<code>aws:approve</code>)</strong> を挟む</li>
<li>修復の結果も <strong>メトリクス / ログ / 通知で追跡</strong> する</li>
</ul>
<h4>(5) 参考 URL</h4>
<ul>
<li>Systems Manager Automation: <a href="https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-automation.html">https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-automation.html</a></li>
<li>AWS DevOps Agent の一般提供(InfoQ・二次情報): <a href="https://infoq.com/news/2026/04/aws-devops-agent-ga">https://infoq.com/news/2026/04/aws-devops-agent-ga</a></li>
<li>AWS DevOps Agent の一般提供(AWS Cloud Operations Blog の要約): <a href="https://aws-news.com/article/2026-03-31-announcing-general-availability-of-aws-devops-agent">https://aws-news.com/article/2026-03-31-announcing-general-availability-of-aws-devops-agent</a></li>
</ul>
<h3 id="s-h3-15">Skill 1.2.2 🔴 EventBridge によるイベントのルーティング・拡充・配信とトラブルシュート</h3>
<blockquote>
<p>公式スキル文: EventBridge を使ってイベントをルーティング・拡充(enrich)・配信し、イベントバスのルールに関する問題をトラブルシュートする。</p>
</blockquote>
<h4>(1) EventBridge の構成要素</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">要素</th>
<th scope="col">意味</th>
</tr>
</thead>
<tbody>
<tr>
<td>イベントバス</td>
<td>イベントを受け取る入口。<strong>デフォルトバス</strong>(AWS サービスのイベントが自動で流れる)、<strong>カスタムバス</strong>、<strong>パートナーバス</strong>(SaaS 連携)</td>
</tr>
<tr>
<td>ルール</td>
<td>イベントパターン(どんなイベントか)またはスケジュール(いつ)で一致したイベントをターゲットに送る</td>
</tr>
<tr>
<td>ターゲット</td>
<td>Lambda、SNS、SQS、Step Functions、Systems Manager、ECS タスク、別アカウントのバス、API 宛先など</td>
</tr>
<tr>
<td>入力トランスフォーマー</td>
<td>ターゲットに渡す前にイベントを <strong>加工・拡充(enrich)</strong> する</td>
</tr>
<tr>
<td>アーカイブとリプレイ</td>
<td>イベントを保存して後から再送できる</td>
</tr>
<tr>
<td>EventBridge Scheduler</td>
<td>大規模なスケジュール実行(1 回限り / 定期)</td>
</tr>
<tr>
<td>EventBridge Pipes</td>
<td>ソース(SQS、Kinesis など)からターゲットへ、<strong>フィルター・拡充</strong> しながらつなぐ</td>
</tr>
</tbody>
</table></div>
<Diagram id="dg10" />

<h4>(2) イベントパターンの例(EC2 の状態変化)</h4>
<CodeBlock index={3} />

<h4>(3) 配信の信頼性</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">項目</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>再試行</td>
<td>ターゲット呼び出しに失敗した場合、<strong>既定で最大 24 時間 / 最大 185 回</strong> 再試行(リトライポリシーで変更可)</td>
</tr>
<tr>
<td>DLQ</td>
<td>ターゲットごとに SQS の DLQ を設定でき、最終的に配信できなかったイベントを退避できる</td>
</tr>
<tr>
<td>クロスアカウント / クロスリージョン</td>
<td>別アカウント / リージョンのバスにイベントを転送できる(受け側バスのリソースポリシーが必要)</td>
</tr>
</tbody>
</table></div>
<h4>(4) ルールが動かないときのトラブルシュート</h4>
<Diagram id="dg11" />

<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">症状</th>
<th scope="col">主な原因</th>
</tr>
</thead>
<tbody>
<tr>
<td>ルールが一度も発火しない</td>
<td>イベントパターンの不一致、バス違い、リージョン違い</td>
</tr>
<tr>
<td>発火するがターゲットが動かない</td>
<td>ターゲット側の権限不足(Lambda のリソースベースポリシー / IAM ロール)、入力形式の不一致</td>
</tr>
<tr>
<td>ときどき欠落</td>
<td>ターゲットのスロットリング。DLQ と再試行ポリシーを確認</td>
</tr>
<tr>
<td>別アカウントに届かない</td>
<td>受信側バスのリソースポリシーが未設定</td>
</tr>
</tbody>
</table></div>
<blockquote>
<p>💡 <strong>権限の考え方</strong>: ターゲットが Lambda / SNS / SQS などのときは <strong>ターゲット側のリソースベースポリシー</strong>、Step Functions / SSM / ECS などのときは <strong>ルールに指定する IAM ロール</strong> で EventBridge に呼び出しを許可します。</p>
</blockquote>
<h4>(5) ベストプラクティス</h4>
<ul>
<li><strong>リソース種別ごとにルールを小さく分ける</strong>(1 ルール 1 目的)</li>
<li>すべてのターゲットに <strong>DLQ</strong> を設定し、失敗を見逃さない</li>
<li><strong>入力トランスフォーマー</strong> で、ターゲットが必要な項目だけ渡す(Lambda の処理を単純化)</li>
<li>重要イベントは <strong>アーカイブ</strong> して、障害時にリプレイできるようにする</li>
<li>ルールと権限は <strong>IaC で管理</strong> する</li>
</ul>
<h4>(6) 参考 URL</h4>
<ul>
<li>EventBridge 概要: <a href="https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html">https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html</a></li>
<li>EventBridge のトラブルシュート: <a href="https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-troubleshooting.html">https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-troubleshooting.html</a></li>
</ul>
<h3 id="s-h3-16">Skill 1.2.3 🔴 Systems Manager Automation ランブックの作成と実行</h3>
<blockquote>
<p>公式スキル文: カスタムおよび事前定義の Systems Manager Automation ランブックを作成・実行し(例: AWS SDK やカスタムスクリプトを使用)、AWS 上の作業を自動化・効率化する。</p>
</blockquote>
<h4>(1) ランブックとは</h4>
<p><strong>ランブック(Runbook)</strong> = 運用手順書を <strong>コード化したもの</strong>。Systems Manager では <strong>Automation ドキュメント</strong>(YAML / JSON)として定義します。</p>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">種類</th>
<th scope="col">例</th>
</tr>
</thead>
<tbody>
<tr>
<td>AWS 提供(事前定義)</td>
<td><code>AWS-RestartEC2Instance</code>、<code>AWS-StopEC2Instance</code>、<code>AWS-CreateImage</code>、<code>AWSSupport-*</code> 系のトラブルシュートランブックなど</td>
</tr>
<tr>
<td>カスタム</td>
<td>自社の手順を YAML で定義</td>
</tr>
</tbody>
</table></div>
<h4>(2) 代表的なアクション(ステップの部品)</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">アクション</th>
<th scope="col">できること</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>aws:executeAwsApi</code></td>
<td>任意の AWS API を呼び出す(AWS SDK 相当)</td>
</tr>
<tr>
<td><code>aws:runCommand</code></td>
<td>インスタンス上でコマンドを実行</td>
</tr>
<tr>
<td><code>aws:executeScript</code></td>
<td><strong>Python / PowerShell のスクリプトを実行</strong>(カスタムスクリプト)</td>
</tr>
<tr>
<td><code>aws:invokeLambdaFunction</code></td>
<td>Lambda を呼び出す</td>
</tr>
<tr>
<td><code>aws:waitForAwsResourceProperty</code></td>
<td>リソースが特定の状態になるまで待つ</td>
</tr>
<tr>
<td><code>aws:branch</code></td>
<td>条件分岐</td>
</tr>
<tr>
<td><code>aws:approve</code></td>
<td><strong>人間の承認</strong> を待つ</td>
</tr>
<tr>
<td><code>aws:changeInstanceState</code></td>
<td>インスタンスの起動・停止</td>
</tr>
</tbody>
</table></div>
<p><strong>カスタムランブックの最小例</strong></p>
<CodeBlock index={4} />

<h4>(3) 実行方法とトリガー</h4>
<Diagram id="dg12" />

<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">項目</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>実行ロール</td>
<td><strong>AutomationAssumeRole</strong>(ランブックが引き受ける IAM ロール)。呼び出す人の権限と実行権限を分離できる</td>
</tr>
<tr>
<td>制御</td>
<td>レート制御(同時実行数・エラー閾値)でターゲット台数が多くても安全に展開</td>
</tr>
<tr>
<td>範囲</td>
<td>複数アカウント・複数リージョンに対する実行も可能</td>
</tr>
<tr>
<td>承認</td>
<td><code>aws:approve</code> や Change Manager と組み合わせて統制</td>
</tr>
</tbody>
</table></div>
<h4>(4) ベストプラクティス</h4>
<ul>
<li>手順書は <strong>ランブックとしてコード化</strong> し、バージョン管理する</li>
<li><strong>最小権限の AutomationAssumeRole</strong> を使う</li>
<li>本番に影響する処理は <strong>承認ステップ</strong> を入れる</li>
<li>ランブックは <strong>冪等</strong> に作り、失敗時の挙動(<code>onFailure</code>、リトライ)を定義する</li>
<li>大量のターゲットには <strong>レート制御</strong> を設定する</li>
<li>実行履歴・出力を <strong>CloudWatch Logs / S3</strong> に保存して監査可能にする</li>
</ul>
<h4>(5) 参考 URL</h4>
<ul>
<li>Systems Manager Automation: <a href="https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-automation.html">https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-automation.html</a></li>
<li>Systems Manager 概要: <a href="https://docs.aws.amazon.com/systems-manager/latest/userguide/what-is-systems-manager.html">https://docs.aws.amazon.com/systems-manager/latest/userguide/what-is-systems-manager.html</a></li>
</ul>
<h2 id="s-h2-5">Step 3. Task 1.3 コンピュート・ストレージ・データベースの性能最適化</h2>
<blockquote>
<p>SOA-C02 の「コストとパフォーマンスの最適化」ドメインは廃止され、その内容がここ(Task 1.3)に統合されました。</p>
</blockquote>
<h3 id="s-h3-17">Skill 1.3.1 🟡 コンピュートリソースの最適化と性能問題の修復</h3>
<blockquote>
<p>公式スキル文: パフォーマンスメトリクス、リソースタグ、AWS ツールを使い、コンピュートリソースを最適化し性能問題を修復する。</p>
</blockquote>
<h4>(1) 最適化の考え方</h4>
<Diagram id="dg13" />

<h4>(2) 見るべきメトリクス(EC2)</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">メトリクス</th>
<th scope="col">見方</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>CPUUtilization</code></td>
<td>常時高い → サイズ不足 / 常時低い → 過剰サイズ</td>
</tr>
<tr>
<td>メモリ使用率(エージェント)</td>
<td>標準では取得不可。メモリ不足なら <strong>メモリ最適化インスタンス</strong> を検討</td>
</tr>
<tr>
<td><code>NetworkIn</code> / <code>NetworkOut</code></td>
<td>帯域の上限に近いかを確認</td>
</tr>
<tr>
<td><code>StatusCheckFailed_Instance</code> / <code>_System</code></td>
<td>インスタンス側 / 基盤側の障害を区別</td>
</tr>
<tr>
<td><code>CPUCreditBalance</code>(T 系)</td>
<td>バースト可能インスタンスのクレジット残量。枯渇すると性能が頭打ちになる</td>
</tr>
</tbody>
</table></div>
<h4>(3) AWS Compute Optimizer</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">項目</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>機能</td>
<td>過去のメトリクスを機械学習で分析し、<strong>EC2、Auto Scaling グループ、EBS、Lambda、ECS on Fargate</strong> などの適正サイズを推奨</td>
</tr>
<tr>
<td>判定</td>
<td>過剰プロビジョニング / 不足 / 最適</td>
</tr>
<tr>
<td>利用前提</td>
<td>オプトイン(有効化)が必要。分析にはある程度のメトリクス履歴(数十時間以上)が必要</td>
</tr>
<tr>
<td>注意</td>
<td><strong>メモリ使用率</strong> は CloudWatch エージェントで収集していないと推奨に反映されにくい</td>
</tr>
</tbody>
</table></div>
<h4>(4) リソースタグの活用</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">用途</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>識別</td>
<td><code>Environment</code>、<code>Application</code>、<code>Owner</code> などで「誰の何のリソースか」を明確化</td>
</tr>
<tr>
<td>一括操作</td>
<td>タグ単位で Systems Manager、AWS Backup、Resource Groups の対象を選択</td>
</tr>
<tr>
<td>コスト配分</td>
<td>コスト配分タグを有効化し、アプリ・部門ごとのコストを可視化</td>
</tr>
<tr>
<td>アクセス制御</td>
<td>タグを条件にした ABAC(属性ベースのアクセス制御)</td>
</tr>
</tbody>
</table></div>
<h4>(5) 性能問題の典型と対処</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">症状</th>
<th scope="col">原因の例</th>
<th scope="col">対処</th>
</tr>
</thead>
<tbody>
<tr>
<td>CPU が高止まり</td>
<td>インスタンスサイズ不足、アプリの無限ループ</td>
<td>スケールアップ / スケールアウト、原因プロセス調査</td>
</tr>
<tr>
<td>T 系で突然遅くなる</td>
<td>CPU クレジット枯渇</td>
<td><strong>unlimited モード</strong>、または M / C 系などの固定性能インスタンスへ変更</td>
</tr>
<tr>
<td>メモリ不足(OOM)</td>
<td>メモリ不足</td>
<td>メモリ最適化(R 系など)へ、リーク調査</td>
</tr>
<tr>
<td>ネットワークが頭打ち</td>
<td>インスタンスの帯域上限</td>
<td>大きいサイズ / ネットワーク強化型 / 拡張ネットワーキング(ENA)</td>
</tr>
<tr>
<td>Lambda が遅い</td>
<td>メモリ(= CPU)設定が低い</td>
<td>メモリを増やす(CPU 性能も比例して増加)、コールドスタート対策</td>
</tr>
</tbody>
</table></div>
<h4>(6) ベストプラクティス</h4>
<ul>
<li><strong>メモリ・ディスクもエージェントで計測</strong> してから判断する</li>
<li><strong>Compute Optimizer の推奨</strong> を定期的にレビューする(特に過剰サイズ)</li>
<li>新しい世代・<strong>Graviton(Arm)</strong> インスタンスは価格性能比が良い場合が多い(アプリの互換性を確認)</li>
<li>負荷が変動するなら <strong>固定サイズより Auto Scaling</strong></li>
<li>Lambda は <strong>メモリ設定を段階的に調整</strong> し、実行時間とコストの最適点を探す</li>
</ul>
<h4>(7) 参考 URL</h4>
<ul>
<li>AWS Compute Optimizer: <a href="https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html">https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html</a></li>
<li>バースト可能インスタンス: <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/burstable-performance-instances.html">https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/burstable-performance-instances.html</a></li>
<li>EC2 の CloudWatch メトリクス: <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/viewing_metrics_with_cloudwatch.html">https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/viewing_metrics_with_cloudwatch.html</a></li>
</ul>
<h3 id="s-h3-18">Skill 1.3.2 🔴 EBS の性能メトリクス分析・トラブルシュート・ボリュームタイプ最適化</h3>
<blockquote>
<p>公式スキル文: Amazon EBS のパフォーマンスメトリクスを分析し、問題をトラブルシュートし、ボリュームタイプを最適化して性能向上とコスト削減を図る。</p>
</blockquote>
<h4>(1) EBS ボリュームタイプ早見表</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">分類</th>
<th scope="col">タイプ</th>
<th scope="col">特徴</th>
<th scope="col">主な用途</th>
</tr>
</thead>
<tbody>
<tr>
<td>汎用 SSD</td>
<td><strong>gp3</strong></td>
<td>基準 <strong>3,000 IOPS / 125 MiB/s</strong> を容量と無関係に確保。IOPS・スループットを <strong>個別に追加可能</strong>。gp2 より安価</td>
<td>大半のワークロードの既定の選択</td>
</tr>
<tr>
<td>汎用 SSD</td>
<td>gp2</td>
<td>容量に比例して IOPS が増える(3 IOPS/GiB)+ バースト</td>
<td>旧世代。gp3 への移行を検討</td>
</tr>
<tr>
<td>プロビジョンド IOPS SSD</td>
<td><strong>io2 / io2 Block Express</strong></td>
<td>高い耐久性・最大級の IOPS・低レイテンシ</td>
<td>ミッションクリティカルな DB</td>
</tr>
<tr>
<td>プロビジョンド IOPS SSD</td>
<td>io1</td>
<td>旧世代の PIOPS</td>
<td>旧環境</td>
</tr>
<tr>
<td>スループット最適化 HDD</td>
<td><strong>st1</strong></td>
<td>低コスト・高スループットの <strong>シーケンシャル I/O</strong></td>
<td>ビッグデータ、ログ処理(ブートボリューム不可)</td>
</tr>
<tr>
<td>コールド HDD</td>
<td><strong>sc1</strong></td>
<td>最安・アクセス頻度の低いデータ</td>
<td>アーカイブ的なデータ(ブートボリューム不可)</td>
</tr>
</tbody>
</table></div>
<blockquote>
<p>💡 <strong>「gp2 → gp3」は王道の最適化</strong>: 多くの場合、ボリュームタイプを変更するだけで <strong>コストを下げつつ性能も維持・向上</strong> できます。しかも <strong>Elastic Volumes</strong> によって <strong>稼働中のまま</strong> 変更可能です。</p>
</blockquote>
<h4>(2) 見るべき EBS メトリクス</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">メトリクス</th>
<th scope="col">意味</th>
<th scope="col">読み方</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>VolumeReadOps</code> / <code>VolumeWriteOps</code></td>
<td>I/O 回数</td>
<td>IOPS の消費状況</td>
</tr>
<tr>
<td><code>VolumeReadBytes</code> / <code>VolumeWriteBytes</code></td>
<td>転送バイト数</td>
<td>スループットの消費状況</td>
</tr>
<tr>
<td><code>VolumeQueueLength</code></td>
<td>待ち行列の長さ</td>
<td><strong>大きいと I/O が詰まっている</strong>(性能不足のサイン)</td>
</tr>
<tr>
<td><code>VolumeIdleTime</code></td>
<td>I/O が無かった時間</td>
<td>常に高いならほぼ未使用(コスト削減候補)</td>
</tr>
<tr>
<td><code>BurstBalance</code></td>
<td>バースト残量(gp2、st1、sc1)</td>
<td>0 に近づくと性能が基準値まで低下</td>
</tr>
<tr>
<td><code>VolumeThroughputPercentage</code></td>
<td>プロビジョンド IOPS の達成率</td>
<td>期待値に届いているか</td>
</tr>
</tbody>
</table></div>
<h4>(3) 性能が出ないときの切り分け</h4>
<Diagram id="dg14" />

<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">ポイント</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>インスタンス側の上限</strong></td>
<td>ボリュームだけ強くしても、<strong>EC2 インスタンス自体の EBS 帯域 / IOPS 上限</strong> がボトルネックになる</td>
</tr>
<tr>
<td><strong>EBS 最適化</strong></td>
<td>現行世代の多くは既定で有効。EBS 専用帯域を確保</td>
</tr>
<tr>
<td>作成直後のスナップショットからのボリューム</td>
<td>データが初回アクセス時に S3 から遅延ロードされ <strong>初回は遅い</strong> → <strong>高速スナップショットリストア(Fast Snapshot Restore)</strong> で回避、またはあらかじめ全ブロックを読む</td>
</tr>
<tr>
<td>Multi-Attach</td>
<td>io1 / io2 を複数の Nitro インスタンス(同一 AZ)に同時接続(クラスター対応アプリ向け)</td>
</tr>
</tbody>
</table></div>
<h4>(4) Elastic Volumes による変更</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">変更できるもの</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>サイズ</td>
<td><strong>拡張のみ</strong>(縮小は不可)。拡張後は <strong>OS 側でファイルシステムも拡張</strong> する必要がある</td>
</tr>
<tr>
<td>ボリュームタイプ</td>
<td>例: gp2 → gp3</td>
</tr>
<tr>
<td>IOPS / スループット</td>
<td>対応タイプで調整</td>
</tr>
<tr>
<td>制約</td>
<td>変更後、次の変更まで一定の待機時間(クールダウン)がある</td>
</tr>
</tbody>
</table></div>
<h4>(5) ベストプラクティス</h4>
<ul>
<li><strong>新規は gp3 を既定</strong> にする。既存の gp2 は gp3 へ移行を検討</li>
<li><strong>VolumeQueueLength・BurstBalance にアラーム</strong> を設定する</li>
<li>未使用ボリューム(<code>VolumeIdleTime</code> が高い、未アタッチ)を <strong>定期的に棚卸し</strong> する</li>
<li>暗号化ボリュームは <strong>アカウント・リージョン単位の「既定で暗号化」</strong> を有効にしておく</li>
<li>スナップショットは <strong>データライフサイクルマネージャー(DLM)/ AWS Backup</strong> で自動化する(Skill 2.3.1)</li>
</ul>
<h4>(6) 参考 URL</h4>
<ul>
<li>EBS ボリュームタイプ: <a href="https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volume-types.html">https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volume-types.html</a></li>
<li>EBS の CloudWatch メトリクス: <a href="https://docs.aws.amazon.com/ebs/latest/userguide/using_cloudwatch_ebs.html">https://docs.aws.amazon.com/ebs/latest/userguide/using_cloudwatch_ebs.html</a></li>
<li>Elastic Volumes: <a href="https://docs.aws.amazon.com/ebs/latest/userguide/ebs-modify-volume.html">https://docs.aws.amazon.com/ebs/latest/userguide/ebs-modify-volume.html</a></li>
</ul>
<h3 id="s-h3-19">Skill 1.3.3 🔴 S3 の性能戦略(DataSync / Transfer Acceleration / マルチパート / ライフサイクル)</h3>
<blockquote>
<p>公式スキル文: S3 の性能戦略(例: AWS DataSync、S3 Transfer Acceleration、マルチパートアップロード、S3 ライフサイクルポリシー)を実装・最適化し、データ転送・ストレージ効率・アクセスパターンを改善する。</p>
</blockquote>
<h4>(1) 戦略の選び方</h4>
<Diagram id="dg15" />

<h4>(2) マルチパートアップロード</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">項目</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>仕組み</td>
<td>大きなオブジェクトを <strong>複数のパートに分割し、並列にアップロード</strong>。最後にまとめて結合</td>
</tr>
<tr>
<td>推奨</td>
<td><strong>100 MB 以上</strong> で推奨</td>
</tr>
<tr>
<td>必須</td>
<td><strong>5 GB を超える</strong> 単一アップロードでは必須(オブジェクトの最大サイズは 5 TB)</td>
</tr>
<tr>
<td>制限</td>
<td>パートサイズ 5 MiB〜5 GiB、最大 10,000 パート</td>
</tr>
<tr>
<td>利点</td>
<td>並列化による高速化、<strong>失敗したパートだけ再送</strong>、アップロード中断・再開が可能</td>
</tr>
<tr>
<td>⚠️ 落とし穴</td>
<td><strong>未完了のマルチパートアップロード</strong> は課金対象のまま残る → ライフサイクルで <strong>「未完了のマルチパートアップロードを中止」</strong> ルールを設定する</td>
</tr>
</tbody>
</table></div>
<h4>(3) S3 Transfer Acceleration</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">項目</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>仕組み</td>
<td>クライアントが最寄りの <strong>CloudFront エッジロケーション</strong> にアップロードし、そこから AWS のバックボーン経由で S3 へ転送</td>
</tr>
<tr>
<td>向いているケース</td>
<td><strong>地理的に離れた</strong> クライアントから、リージョンの S3 バケットへ大きなデータを送る</td>
</tr>
<tr>
<td>使い方</td>
<td>バケットで機能を有効化し、<strong>専用エンドポイント</strong>(<code>&lt;バケット名&gt;.s3-accelerate.amazonaws.com</code>)を使う</td>
</tr>
<tr>
<td>制約</td>
<td>バケット名に <strong>ドット(.)を含まない</strong>(DNS 準拠)ことが必要。追加料金あり</td>
</tr>
<tr>
<td>判断</td>
<td>速度比較ツールで効果を確認できる(効果がなければ課金されない)</td>
</tr>
</tbody>
</table></div>
<h4>(4) AWS DataSync</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">項目</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>役割</td>
<td>オンプレミスのストレージ(NFS / SMB など)や他の AWS ストレージと <strong>S3 / EFS / FSx の間でデータを高速に移行・同期</strong> するマネージドサービス</td>
</tr>
<tr>
<td>特徴</td>
<td>エージェント(オンプレ側)、スケジュール実行、<strong>整合性検証</strong>、帯域制御、暗号化</td>
</tr>
<tr>
<td>使い分け</td>
<td>継続的・大規模な転送には DataSync、単発の少量なら AWS CLI の <code>s3 sync</code></td>
</tr>
<tr>
<td>補足</td>
<td>超大容量でネットワークが使えない場合は <strong>AWS Snow ファミリー</strong> という選択肢もある</td>
</tr>
</tbody>
</table></div>
<h4>(5) S3 ライフサイクルポリシー</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">アクション</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>移行(Transition)</td>
<td>一定日数後にストレージクラスを変更(例: Standard → Standard-IA → Glacier)</td>
</tr>
<tr>
<td>有効期限(Expiration)</td>
<td>一定日数後にオブジェクトを削除</td>
</tr>
<tr>
<td>非現行バージョン</td>
<td>バージョニング有効時、古いバージョンの移行・削除</td>
</tr>
<tr>
<td>未完了マルチパート</td>
<td>一定日数後に自動中止</td>
</tr>
</tbody>
</table></div>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">ストレージクラス</th>
<th scope="col">向いているデータ</th>
<th scope="col">補足</th>
</tr>
</thead>
<tbody>
<tr>
<td>Standard</td>
<td>頻繁にアクセス</td>
<td>最低保管期間なし</td>
</tr>
<tr>
<td><strong>Intelligent-Tiering</strong></td>
<td><strong>アクセスパターンが不明・変動</strong></td>
<td>自動で階層を移動(監視料金あり)。取り出し料金なし</td>
</tr>
<tr>
<td>Standard-IA / One Zone-IA</td>
<td>低頻度アクセス</td>
<td>最低保管 30 日、One Zone は単一 AZ</td>
</tr>
<tr>
<td>Glacier Instant Retrieval</td>
<td>めったに使わないがミリ秒で取得</td>
<td>最低保管 90 日</td>
</tr>
<tr>
<td>Glacier Flexible Retrieval</td>
<td>アーカイブ(分〜時間で取得)</td>
<td>最低保管 90 日</td>
</tr>
<tr>
<td>Glacier Deep Archive</td>
<td>長期アーカイブ(時間単位で取得)</td>
<td>最低保管 180 日</td>
</tr>
</tbody>
</table></div>
<h4>(6) リクエスト性能</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">項目</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>プレフィックスあたりの性能</td>
<td><strong>PUT / COPY / POST / DELETE: 毎秒 3,500 回、GET / HEAD: 毎秒 5,500 回</strong>(プレフィックスごと)</td>
</tr>
<tr>
<td>対策</td>
<td>高負荷なら <strong>複数のプレフィックスに分散</strong> すれば合計性能が線形に増える(プレフィックス数に上限なし)</td>
</tr>
<tr>
<td>読み取り最適化</td>
<td>頻繁に読むデータは <strong>CloudFront でキャッシュ</strong>、大きいファイルは <strong>バイトレンジフェッチ</strong> で並列取得</td>
</tr>
<tr>
<td>低レイテンシ要件</td>
<td><strong>S3 Express One Zone</strong>(単一 AZ・高性能)も選択肢</td>
</tr>
</tbody>
</table></div>
<h4>(7) ベストプラクティス</h4>
<ul>
<li><strong>100 MB 以上はマルチパート</strong>(SDK / CLI は自動で行う設定が既定)</li>
<li>ライフサイクルに <strong>「未完了マルチパートの中止」</strong> と <strong>「非現行バージョンの期限切れ」</strong> を必ず入れる</li>
<li>アクセスが読めないデータは <strong>Intelligent-Tiering</strong>、読めるデータは明示的にライフサイクル移行</li>
<li>大量の読み取りは <strong>CloudFront</strong> で S3 の負荷とコストを下げる</li>
<li>ストレージの使われ方は <strong>S3 Storage Lens</strong> で可視化する</li>
</ul>
<h4>(8) 参考 URL</h4>
<ul>
<li>S3 の性能設計: <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/optimizing-performance.html">https://docs.aws.amazon.com/AmazonS3/latest/userguide/optimizing-performance.html</a></li>
<li>マルチパートアップロード: <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html">https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html</a></li>
<li>Transfer Acceleration: <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/transfer-acceleration.html">https://docs.aws.amazon.com/AmazonS3/latest/userguide/transfer-acceleration.html</a></li>
<li>ライフサイクル: <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html">https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html</a></li>
<li>DataSync: <a href="https://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html">https://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html</a></li>
</ul>
<h3 id="s-h3-20">Skill 1.3.4 🟡 共有ストレージの選定と最適化(EFS / FSx / S3 Files)</h3>
<blockquote>
<p>公式スキル文: 共有ストレージソリューション(例: Amazon EFS、Amazon FSx、Amazon S3 Files)を評価・選定し、用途と要件に応じて最適化する(例: EFS ライフサイクルポリシー)。</p>
</blockquote>
<h4>(1) 選定の考え方</h4>
<p>複数のサーバー(インスタンス / コンテナ / Lambda)から <strong>同時に同じファイルへアクセス</strong> したいときに、共有ファイルストレージを使います。</p>
<Diagram id="dg16" />

<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">サービス</th>
<th scope="col">プロトコル</th>
<th scope="col">特徴</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Amazon EFS</strong></td>
<td>NFS(Linux)</td>
<td>フルマネージド・容量が自動で伸縮・複数 AZ で冗長化・数千台から同時接続</td>
</tr>
<tr>
<td><strong>FSx for Windows File Server</strong></td>
<td>SMB</td>
<td>Active Directory 統合、DFS、Windows ネイティブな機能</td>
</tr>
<tr>
<td><strong>FSx for Lustre</strong></td>
<td>Lustre</td>
<td>HPC / 機械学習向けの高スループット。<strong>S3 とリンク</strong> してデータを取り込める</td>
</tr>
<tr>
<td><strong>FSx for NetApp ONTAP</strong></td>
<td>NFS / SMB / iSCSI</td>
<td>NetApp の機能(重複排除、スナップショット、レプリケーション)</td>
</tr>
<tr>
<td><strong>FSx for OpenZFS</strong></td>
<td>NFS</td>
<td>ZFS のスナップショット・クローン機能</td>
</tr>
<tr>
<td><strong>Amazon S3 Files</strong></td>
<td>NFS</td>
<td><strong>S3 の汎用バケットをファイルシステムとしてマウント</strong>。内部は EFS ベースで、アクティブなデータは低レイテンシ。S3 API からも同じデータにアクセス可能</td>
</tr>
</tbody>
</table></div>
<blockquote>
<p>📝 <strong>S3 Files について</strong>: 2026 年 4 月に発表された新機能で、EC2、ECS、EKS、Lambda から S3 のデータをファイルとして扱えます。ファイル操作の変更は S3 に同期され、S3 側の変更もファイル側に反映されます(通常は数秒〜 1 分程度)。「S3 のデータをアプリ改修なしでファイルとして共有したい」という設問で選択肢になります。小さなファイルの頻繁な更新より、<strong>大きなファイルの順次読み取り</strong> に向いています。</p>
</blockquote>
<h4>(2) EFS の最適化</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">設定</th>
<th scope="col">選択肢と使い分け</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>パフォーマンスモード</strong></td>
<td>汎用(既定・低レイテンシ)/ Max I/O(大規模並列。現行は汎用が推奨)</td>
</tr>
<tr>
<td><strong>スループットモード</strong></td>
<td><strong>Elastic</strong>(需要に自動追従・基本はこれ)/ Provisioned(固定スループットを確保)/ Bursting(容量に比例)</td>
</tr>
<tr>
<td><strong>ストレージクラス</strong></td>
<td>Standard / Standard-IA(低頻度)/ Archive / One Zone 系(単一 AZ でコスト削減)</td>
</tr>
<tr>
<td><strong>ライフサイクル管理</strong></td>
<td><strong>一定期間アクセスのないファイルを IA / Archive に自動移行</strong> してコスト削減。日数は 1〜365 日の選択肢から設定。<strong>アクセスされたら Standard に戻す</strong> 設定(Intelligent-Tiering)も可能</td>
</tr>
<tr>
<td>マウント</td>
<td><strong>マウントターゲット</strong>(各 AZ に作成)経由。セキュリティグループで <strong>NFS(TCP 2049)</strong> を許可</td>
</tr>
<tr>
<td>暗号化</td>
<td>保管時暗号化は <strong>作成時に指定</strong>(後から変更不可)。転送中は TLS(<code>amazon-efs-utils</code> の <code>-o tls</code>)</td>
</tr>
</tbody>
</table></div>
<h4>(3) ベストプラクティス</h4>
<ul>
<li><strong>要件(OS・プロトコル・性能・既存システム)から選ぶ</strong>:Linux 汎用 → EFS、Windows → FSx for Windows、HPC → FSx for Lustre</li>
<li>EFS は <strong>ライフサイクルポリシーで IA へ自動移行</strong> してコスト削減</li>
<li>可用性を重視する本番は <strong>複数 AZ(リージョナル)</strong> の EFS を使う</li>
<li>マウントターゲットは <strong>利用する全 AZ に作成</strong> する</li>
<li>バックアップは <strong>AWS Backup</strong> で自動化する</li>
</ul>
<h4>(4) 参考 URL</h4>
<ul>
<li>Amazon EFS: <a href="https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html">https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html</a></li>
<li>EFS ライフサイクル管理: <a href="https://docs.aws.amazon.com/efs/latest/ug/lifecycle-management-efs.html">https://docs.aws.amazon.com/efs/latest/ug/lifecycle-management-efs.html</a></li>
<li>Amazon FSx: <a href="https://docs.aws.amazon.com/fsx/">https://docs.aws.amazon.com/fsx/</a></li>
<li>Amazon S3 Files の発表ブログ: <a href="https://aws.amazon.com/blogs/aws/launching-s3-files-making-s3-buckets-accessible-as-file-systems/">https://aws.amazon.com/blogs/aws/launching-s3-files-making-s3-buckets-accessible-as-file-systems/</a></li>
</ul>
<h3 id="s-h3-21">Skill 1.3.5 🔴 RDS の監視と性能向上(Performance Insights / RDS Proxy など)</h3>
<blockquote>
<p>公式スキル文: Amazon RDS のメトリクス(例: RDS Performance Insights、CloudWatch アラーム)を監視し、設定を変更して性能効率を高める(例: Performance Insights のプロアクティブな推奨事項、RDS Proxy)。</p>
</blockquote>
<h4>(1) RDS の監視手段(3 層)</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">手段</th>
<th scope="col">見えるもの</th>
<th scope="col">補足</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>CloudWatch メトリクス</strong></td>
<td>DB インスタンスレベルの指標</td>
<td><code>CPUUtilization</code>、<code>FreeableMemory</code>、<code>DatabaseConnections</code>、<code>ReadIOPS</code> / <code>WriteIOPS</code>、<code>FreeStorageSpace</code>、<code>ReplicaLag</code>、<code>DiskQueueDepth</code> など</td>
</tr>
<tr>
<td><strong>拡張モニタリング(Enhanced Monitoring)</strong></td>
<td><strong>OS レベル</strong> の詳細指標(プロセス・メモリ・ファイルシステム)を 1〜60 秒間隔で取得</td>
<td>エージェント不要。有効化には IAM ロールが必要</td>
</tr>
<tr>
<td><strong>Performance Insights</strong></td>
<td><strong>DB 負荷(DB Load)</strong> をグラフ化し、<strong>待機イベント・SQL・ユーザー・ホスト</strong> 別に原因を特定</td>
<td>「どのクエリが重いか」を探す主役</td>
</tr>
<tr>
<td>ログ</td>
<td>スロークエリログ・エラーログ・一般ログ</td>
<td><strong>CloudWatch Logs へエクスポート</strong> して検索・アラーム化</td>
</tr>
</tbody>
</table></div>
<blockquote>
<p>📝 <strong>補足</strong>: データベースの可観測性は、CloudWatch の <strong>Database Insights</strong> など新しい機能へ集約が進んでいます。Performance Insights の提供形態は今後変わる可能性があるため、最新の AWS ドキュメントで確認してください(試験ガイドの記述は Performance Insights が中心です)。</p>
</blockquote>
<h4>(2) Performance Insights の読み方</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">項目</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>DB Load</td>
<td><strong>平均アクティブセッション数(AAS)</strong>。「同時に処理待ち・処理中のセッション数」</td>
</tr>
<tr>
<td>vCPU の線</td>
<td>DB Load がこの線を <strong>超えていると CPU 不足</strong>(待ちが発生)</td>
</tr>
<tr>
<td>待機イベント</td>
<td>CPU、I/O、ロック、ネットワークなど <strong>何を待っているか</strong> を色分け</td>
</tr>
<tr>
<td>Top SQL</td>
<td>負荷への寄与が大きい SQL を特定 → <strong>インデックス追加・クエリ改善</strong> へ</td>
</tr>
<tr>
<td>プロアクティブな推奨事項</td>
<td>性能問題の兆候を検出し、<strong>改善提案を提示</strong></td>
</tr>
</tbody>
</table></div>
<h4>(3) 性能改善の打ち手</h4>
<Diagram id="dg17" />

<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">打ち手</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>RDS Proxy</strong></td>
<td>アプリと DB の間で <strong>接続プーリング</strong>。接続数の急増(Lambda など)による DB の負荷を軽減し、<strong>フェイルオーバー時の接続維持・復旧の高速化</strong> にも効く。認証情報は Secrets Manager、IAM 認証にも対応</td>
</tr>
<tr>
<td>リードレプリカ</td>
<td>読み取り負荷の分散(非同期レプリケーション)。<code>ReplicaLag</code> を監視</td>
</tr>
<tr>
<td>パラメータグループ</td>
<td>DB エンジンの設定(最大接続数、メモリ配分など)を調整。<strong>静的パラメータは再起動が必要</strong></td>
</tr>
<tr>
<td>ストレージ</td>
<td>ストレージの自動スケーリング、gp3 / io2 の選択</td>
</tr>
<tr>
<td>インスタンスクラス</td>
<td>CPU・メモリ要件に合わせて変更(変更時はダウンタイムに注意。Multi-AZ なら短縮可能)</td>
</tr>
</tbody>
</table></div>
<h4>(4) ベストプラクティス</h4>
<ul>
<li><strong>Performance Insights と拡張モニタリングを有効化</strong> し、問題が起きる前から基準値を把握する</li>
<li><code>CPUUtilization</code>、<code>FreeStorageSpace</code>、<code>DatabaseConnections</code>、<code>ReplicaLag</code> に <strong>アラーム</strong> を設定</li>
<li>スロークエリログを <strong>CloudWatch Logs に出力</strong></li>
<li><strong>Lambda → RDS</strong> のように接続が急増する構成では <strong>RDS Proxy</strong></li>
<li>変更は <strong>メンテナンスウィンドウ</strong> や適切な時間帯に実施し、パラメータグループは <strong>本番前にテスト</strong></li>
</ul>
<h4>(5) 参考 URL</h4>
<ul>
<li>Performance Insights: <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PerfInsights.html">https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PerfInsights.html</a></li>
<li>拡張モニタリング: <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Monitoring.OS.html">https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Monitoring.OS.html</a></li>
<li>RDS Proxy: <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html">https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html</a></li>
</ul>
<h3 id="s-h3-22">Skill 1.3.6 🟡 EC2 とその関連ストレージ・ネットワークの実装・監視・最適化(プレイスメントグループなど)</h3>
<blockquote>
<p>公式スキル文: EC2 インスタンスと、関連するストレージ・ネットワーク機能(例: EC2 プレイスメントグループ)を実装・監視・最適化する。</p>
</blockquote>
<h4>(1) プレイスメントグループ</h4>
<p>インスタンスを物理的にどう配置するかを制御します。</p>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">種類</th>
<th scope="col">配置</th>
<th scope="col">向いている用途</th>
<th scope="col">制約・注意</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>クラスター</strong></td>
<td><strong>単一 AZ 内</strong> の近接したハードウェアに集約</td>
<td><strong>低レイテンシ・高スループット</strong> のノード間通信(HPC、密結合な計算)</td>
<td>単一 AZ のため <strong>障害の影響を受けやすい</strong>。同一インスタンスタイプで一度に起動するのが望ましい</td>
</tr>
<tr>
<td><strong>パーティション</strong></td>
<td>インスタンスを <strong>論理パーティション</strong> に分け、パーティション間でハードウェアを共有しない</td>
<td>Hadoop、Cassandra、Kafka など <strong>大規模な分散・レプリケーション型</strong></td>
<td><strong>AZ あたり最大 7 パーティション</strong></td>
</tr>
<tr>
<td><strong>スプレッド</strong></td>
<td><strong>1 台ずつ別々のハードウェア</strong> に配置</td>
<td><strong>少数の重要なインスタンス</strong> を同時障害から守りたい</td>
<td><strong>AZ あたり最大 7 台</strong> まで(グループごと)</td>
</tr>
</tbody>
</table></div>
<Diagram id="dg18" />

<blockquote>
<p>💡 <strong>覚え方</strong>: 「速さ = クラスター」「大規模分散 = パーティション」「少数を守る = スプレッド」</p>
</blockquote>
<h4>(2) ネットワーク性能の最適化</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">機能</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>拡張ネットワーキング(ENA)</strong></td>
<td>高帯域・低レイテンシ・低ジッター。現行世代では標準</td>
</tr>
<tr>
<td><strong>EFA(Elastic Fabric Adapter)</strong></td>
<td>HPC / 機械学習向けの OS バイパス通信(MPI / NCCL)</td>
</tr>
<tr>
<td>インスタンスサイズ</td>
<td>帯域はサイズに比例する。<strong>大きいインスタンスほど上限が高い</strong></td>
</tr>
<tr>
<td>ジャンボフレーム(MTU 9001)</td>
<td>VPC 内の通信でスループット向上。ただし <strong>インターネット経由・VPC ピアリング(リージョン跨ぎ)等では制約</strong> がある</td>
</tr>
</tbody>
</table></div>
<h4>(3) ストレージの最適化</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">機能</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>EBS 最適化</td>
<td>EBS 専用帯域を確保(現行世代はほぼ既定)</td>
</tr>
<tr>
<td>ボリュームタイプ</td>
<td>Skill 1.3.2 を参照</td>
</tr>
<tr>
<td><strong>インスタンスストア</strong></td>
<td>ホストに物理接続された <strong>高速な一時ストレージ</strong>。<strong>停止・終了・ホスト障害でデータは消える</strong>。キャッシュ・バッファ・一時データ向け</td>
</tr>
</tbody>
</table></div>
<h4>(4) 購入オプション・キャパシティ</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">オプション</th>
<th scope="col">特徴</th>
</tr>
</thead>
<tbody>
<tr>
<td>オンデマンド</td>
<td>柔軟・割高</td>
</tr>
<tr>
<td>Savings Plans / リザーブドインスタンス</td>
<td>1 年 / 3 年のコミットで割引(安定した使用量向け)</td>
</tr>
<tr>
<td>スポット</td>
<td>最大割引・<strong>中断される可能性あり</strong>(ステートレス・耐障害ワークロード向け)</td>
</tr>
<tr>
<td><strong>オンデマンドキャパシティ予約(ODCR)</strong></td>
<td>特定 AZ のキャパシティを確保(割引は付かない。Savings Plans と組み合わせ)</td>
</tr>
</tbody>
</table></div>
<h4>(5) ベストプラクティス</h4>
<ul>
<li>要件を決めてから <strong>プレイスメントグループ</strong> を選ぶ(性能優先 → クラスター、可用性優先 → スプレッド / パーティション)</li>
<li><strong>最新世代のインスタンス</strong> を使い、ENA と EBS 最適化を活用する</li>
<li><strong>インスタンスストアのデータは失われる前提</strong> で設計する(重要データは EBS / S3)</li>
<li>使用量が安定したワークロードは <strong>Savings Plans</strong> などで最適化し、<strong>スポット</strong> はステートレス処理に使う</li>
<li>タグ付けと Compute Optimizer で <strong>継続的にサイズを見直す</strong></li>
</ul>
<h4>(6) 参考 URL</h4>
<ul>
<li>プレイスメントグループ: <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-groups.html">https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-groups.html</a></li>
<li>EC2 ユーザーガイド: <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html">https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html</a></li>
</ul>
        </>
    );
}
