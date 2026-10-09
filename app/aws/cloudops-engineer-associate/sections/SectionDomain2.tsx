import { Diagram } from "../Diagram";


/**
 * SectionDomain2
 */
export default function SectionDomain2() {
    return (
        <>
<h1 id="s-h1-2">Domain 2: 信頼性と事業継続(22%)</h1>
<p>このドメインの合言葉は <strong>「止めない・壊れても戻せる」</strong> です。</p>
<Diagram id="dg19" />

<h2 id="s-h2-6">Step 4. Task 2.1 スケーラビリティと弾力性の実装</h2>
<h3 id="s-h3-23">Skill 2.1.1 🔴 コンピュート環境のスケーリング機構の設定・管理</h3>
<blockquote>
<p>公式スキル文: コンピュート環境のスケーリング機構を設定・管理する。</p>
</blockquote>
<h4>(1) 用語</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">用語</th>
<th scope="col">意味</th>
</tr>
</thead>
<tbody>
<tr>
<td>スケールアウト / イン</td>
<td><strong>台数</strong> を増やす / 減らす(水平スケーリング)</td>
</tr>
<tr>
<td>スケールアップ / ダウン</td>
<td><strong>1 台の性能</strong> を上げる / 下げる(垂直スケーリング。通常は再起動を伴う)</td>
</tr>
<tr>
<td>弾力性(Elasticity)</td>
<td>需要に応じて自動で増減できること</td>
</tr>
</tbody>
</table></div>
<h4>(2) EC2 Auto Scaling の構成</h4>
<Diagram id="dg20" />

<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">項目</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>起動テンプレート</strong></td>
<td>AMI、インスタンスタイプ、SG、キーペア、IAM ロールなどの起動設定(起動設定 Launch Configuration は旧式)</td>
</tr>
<tr>
<td>最小 / 希望 / 最大</td>
<td>台数の下限 / 目標 / 上限。<strong>最小 = 常に確保</strong>、<strong>最大 = コストと暴走の歯止め</strong></td>
</tr>
<tr>
<td>複数 AZ</td>
<td>サブネットを複数 AZ に指定し、AZ 間でインスタンスを均等配置</td>
</tr>
<tr>
<td>ヘルスチェック</td>
<td>既定は EC2 のステータス。<strong>ELB ヘルスチェックを有効化</strong> するとアプリ障害でも置き換え可能</td>
</tr>
</tbody>
</table></div>
<h4>(3) スケーリングポリシーの種類</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">ポリシー</th>
<th scope="col">内容</th>
<th scope="col">使いどころ</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>ターゲット追跡</strong></td>
<td>「CPU 平均を 50% に保つ」のように <strong>目標値を指定</strong> すると自動で増減</td>
<td><strong>基本の選択肢</strong>。設定が簡単</td>
</tr>
<tr>
<td>ステップスケーリング</td>
<td>アラームの超過幅に応じて段階的に増減</td>
<td>きめ細かい制御が必要なとき</td>
</tr>
<tr>
<td>シンプルスケーリング</td>
<td>1 回のアラームで一定数を増減(クールダウンあり)</td>
<td>旧来型</td>
</tr>
<tr>
<td><strong>スケジュール</strong></td>
<td>日時を指定して最小・最大・希望台数を変更</td>
<td><strong>予測可能な負荷</strong>(朝の出勤時、月末など)</td>
</tr>
<tr>
<td><strong>予測スケーリング</strong></td>
<td>過去のパターンを機械学習し、<strong>先回りして</strong> 増やす</td>
<td>周期的な負荷</td>
</tr>
</tbody>
</table></div>
<h4>(4) 重要な付加機能</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">機能</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>ウォームアップ</strong></td>
<td>新しいインスタンスがメトリクスに寄与し始めるまでの時間。過剰なスケールアウトを防ぐ</td>
</tr>
<tr>
<td><strong>クールダウン</strong></td>
<td>スケーリング直後の再スケーリングを抑制する待機時間</td>
</tr>
<tr>
<td><strong>ライフサイクルフック</strong></td>
<td>起動 / 終了の途中で処理を挟める(例: 終了前にログを S3 へ退避、起動後に設定投入)</td>
</tr>
<tr>
<td><strong>ウォームプール</strong></td>
<td>事前に初期化済みのインスタンスを待機させ、<strong>スケールアウトを高速化</strong></td>
</tr>
<tr>
<td><strong>インスタンスリフレッシュ</strong></td>
<td>起動テンプレートの更新を、<strong>ローリングで全インスタンスに反映</strong></td>
</tr>
<tr>
<td>終了ポリシー</td>
<td>スケールイン時にどのインスタンスを終了するか(既定は AZ のバランスを優先)</td>
</tr>
<tr>
<td>スケーリングの一時停止</td>
<td>メンテナンス時などにプロセス(Launch / Terminate など)を停止</td>
</tr>
</tbody>
</table></div>
<h4>(5) その他のコンピュートのスケーリング</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">サービス</th>
<th scope="col">スケーリング</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>ECS</strong></td>
<td><strong>サービスの Auto Scaling</strong>(タスク数)+ <strong>キャパシティプロバイダー</strong>(EC2 台数)。Fargate はタスク単位</td>
</tr>
<tr>
<td><strong>EKS</strong></td>
<td>Pod は HPA、ノードは <strong>Karpenter</strong> や Cluster Autoscaler</td>
</tr>
<tr>
<td><strong>Lambda</strong></td>
<td>自動でスケール。<strong>予約済み同時実行数</strong>(上限の確保・制限)、<strong>プロビジョニング済み同時実行</strong>(コールドスタート対策)</td>
</tr>
<tr>
<td><strong>Application Auto Scaling</strong></td>
<td>ECS、DynamoDB、Aurora レプリカ、Lambda のプロビジョニング済み同時実行などの共通基盤</td>
</tr>
</tbody>
</table></div>
<h4>(6) ベストプラクティス</h4>
<ul>
<li><strong>複数 AZ</strong> にまたがる ASG を作る</li>
<li>最初は <strong>ターゲット追跡</strong> を使い、必要なら他を追加する</li>
<li><strong>ELB ヘルスチェックを有効</strong> にして、アプリ不良のインスタンスも自動置換する</li>
<li>インスタンスは <strong>ステートレス</strong> にし、状態は外部(RDS、ElastiCache、S3、EFS)に置く</li>
<li>起動を速くするため <strong>Golden AMI</strong> や <strong>ウォームプール</strong> を活用する</li>
<li><strong>最大台数</strong> に必ず上限を設定し、コストの暴走を避ける</li>
</ul>
<h4>(7) トラブルシュート</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">症状</th>
<th scope="col">原因</th>
</tr>
</thead>
<tbody>
<tr>
<td>インスタンスが起動しない</td>
<td>InsufficientInstanceCapacity、<strong>サブネットの空き IP 不足</strong>、起動テンプレートの誤り(存在しない AMI / キーペア / SG)、サービスクォータ、IAM 権限、暗号化 AMI の KMS 権限</td>
</tr>
<tr>
<td>起動してもすぐ終了する</td>
<td>ELB ヘルスチェック失敗(起動時間より猶予期間が短い)→ <strong>ヘルスチェックの猶予期間</strong> を延長</td>
</tr>
<tr>
<td>増えない / 減らない</td>
<td>最大・最小に到達、ウォームアップやクールダウン、ポリシーが無効、アラームの欠落データ</td>
</tr>
<tr>
<td>活動履歴(Activity history)の確認</td>
<td><strong>スケーリング活動の失敗理由が記録されている</strong> のでまず確認する</td>
</tr>
</tbody>
</table></div>
<h4>(8) 参考 URL</h4>
<ul>
<li>EC2 Auto Scaling: <a href="https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html">https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html</a></li>
<li>スケーリングポリシー: <a href="https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scale-based-on-demand.html">https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scale-based-on-demand.html</a></li>
</ul>
<h3 id="s-h3-24">Skill 2.1.2 🔴 キャッシュによる動的スケーラビリティの向上(CloudFront / ElastiCache)</h3>
<blockquote>
<p>公式スキル文: AWS サービス(例: Amazon CloudFront、Amazon ElastiCache)を使ってキャッシュを実装し、動的なスケーラビリティを高める。</p>
</blockquote>
<h4>(1) キャッシュの目的</h4>
<p><strong>頻繁に読まれるデータを手前に置き、バックエンド(DB / オリジン)への負荷とレイテンシを下げる</strong> こと。</p>
<Diagram id="dg21" />

<h4>(2) キャッシュ戦略の使い分け</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">層</th>
<th scope="col">サービス</th>
<th scope="col">キャッシュするもの</th>
</tr>
</thead>
<tbody>
<tr>
<td>エッジ</td>
<td><strong>CloudFront</strong></td>
<td>静的コンテンツ(画像・JS・CSS)や、キャッシュ可能な API 応答</td>
</tr>
<tr>
<td>アプリ層</td>
<td><strong>ElastiCache</strong></td>
<td>DB クエリ結果、セッション、計算結果</td>
</tr>
<tr>
<td>DB 専用</td>
<td><strong>DAX</strong>(DynamoDB Accelerator)</td>
<td>DynamoDB の読み取り(マイクロ秒)</td>
</tr>
<tr>
<td>API 層</td>
<td>API Gateway キャッシュ</td>
<td>API 応答</td>
</tr>
</tbody>
</table></div>
<h4>(3) ElastiCache のエンジンと戦略</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">エンジン</th>
<th scope="col">特徴</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Redis OSS / Valkey</strong></td>
<td>データ構造が豊富、<strong>レプリケーション・自動フェイルオーバー・永続化</strong>・Pub/Sub、クラスターモード(シャーディング)</td>
</tr>
<tr>
<td><strong>Memcached</strong></td>
<td>シンプル・<strong>マルチスレッド</strong>・シャーディングによる水平拡張。<strong>レプリケーションや永続化はない</strong></td>
</tr>
</tbody>
</table></div>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">キャッシュ戦略</th>
<th scope="col">内容</th>
<th scope="col">長所 / 短所</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>遅延ロード(Lazy Loading)</strong></td>
<td>要求時にキャッシュを確認し、<strong>ミスのときだけ DB から取得して格納</strong></td>
<td>必要なデータだけ入る / 初回は遅く、データが古くなりうる</td>
</tr>
<tr>
<td><strong>ライトスルー</strong></td>
<td><strong>DB 更新と同時にキャッシュも更新</strong></td>
<td>常に新しい / 使われないデータも格納、書き込みが遅くなる</td>
</tr>
<tr>
<td><strong>TTL</strong></td>
<td>有効期限を設定し、古いデータを自動削除</td>
<td>古さの上限を制御できる</td>
</tr>
</tbody>
</table></div>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">重要メトリクス</th>
<th scope="col">見方</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>CacheHitRate</code> / <code>CacheHits</code> / <code>CacheMisses</code></td>
<td>ヒット率が低い → キー設計・TTL・容量の見直し</td>
</tr>
<tr>
<td><code>Evictions</code></td>
<td><strong>メモリ不足で追い出されたキー数</strong>。増えているなら <strong>容量不足</strong></td>
</tr>
<tr>
<td><code>CPUUtilization</code> / <code>EngineCPUUtilization</code></td>
<td>Redis は単一スレッドの命令実行がボトルネックになりうる</td>
</tr>
<tr>
<td><code>CurrConnections</code></td>
<td>接続数</td>
</tr>
</tbody>
</table></div>
<h4>(4) CloudFront のキャッシュ制御(要点)</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">項目</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>キャッシュキー</td>
<td>何を区別してキャッシュするか(URL パス、クエリ文字列、ヘッダー、Cookie)。<strong>含めすぎるとヒット率が下がる</strong></td>
</tr>
<tr>
<td>TTL</td>
<td><strong>最小 / 既定 / 最大</strong> TTL とオリジンの <code>Cache-Control</code> を組み合わせて有効期間が決まる</td>
</tr>
<tr>
<td>無効化(Invalidation)</td>
<td>期限前にキャッシュを削除。<strong>バージョン付きファイル名(<code>app.v2.js</code>)</strong> のほうが確実・低コスト</td>
</tr>
<tr>
<td>詳細は</td>
<td>Skill 5.2.3、5.3.3 を参照</td>
</tr>
</tbody>
</table></div>
<h4>(5) ベストプラクティス</h4>
<ul>
<li><strong>まず CloudFront</strong>: 静的コンテンツはエッジで配信し、オリジンへの到達を減らす</li>
<li>DB の読み取りが重い → <strong>ElastiCache の遅延ロード + TTL</strong> を基本形に</li>
<li>キャッシュは <strong>「無くても動く」設計</strong> にし、キャッシュ障害でシステム全体が止まらないようにする</li>
<li><code>Evictions</code> と <code>CacheHitRate</code> を <strong>アラーム / ダッシュボード</strong> で継続監視する</li>
<li>機密データを共有キャッシュに載せない / 認証が必要なコンテンツのキャッシュ設定に注意する</li>
<li>Redis OSS / Valkey は <strong>Multi-AZ + 自動フェイルオーバー</strong> を有効にする</li>
</ul>
<h4>(6) 参考 URL</h4>
<ul>
<li>CloudFront: <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html">https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html</a></li>
<li>ElastiCache: <a href="https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/WhatIs.html">https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/WhatIs.html</a></li>
<li>キャッシュ戦略: <a href="https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Strategies.html">https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Strategies.html</a></li>
</ul>
<h3 id="s-h3-25">Skill 2.1.3 🔴 マネージドデータベースのスケーリング(RDS / DynamoDB など)</h3>
<blockquote>
<p>公式スキル文: AWS マネージドデータベース(例: Amazon RDS、DynamoDB)のスケーリングを設定・管理する。</p>
</blockquote>
<h4>(1) RDS / Aurora のスケーリング手段</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">手段</th>
<th scope="col">方向</th>
<th scope="col">内容</th>
<th scope="col">注意</th>
</tr>
</thead>
<tbody>
<tr>
<td>インスタンスクラス変更</td>
<td>垂直</td>
<td>CPU・メモリの増減</td>
<td>変更時に <strong>一時的な停止(再起動)</strong> が発生。Multi-AZ なら短縮されるが、ゼロではない</td>
</tr>
<tr>
<td><strong>ストレージの自動スケーリング</strong></td>
<td>垂直</td>
<td>空きが少なくなると自動で拡張(上限を設定)</td>
<td><strong>容量の縮小はできない</strong></td>
</tr>
<tr>
<td><strong>リードレプリカ</strong></td>
<td>水平(読み取り)</td>
<td>読み取りを分散。非同期レプリケーション。<strong>RDS の MySQL / MariaDB / PostgreSQL は最大 15 台</strong>、Oracle / SQL Server は最大 5 台</td>
<td><strong>書き込みは分散されない</strong>。<code>ReplicaLag</code> の監視が必要</td>
</tr>
<tr>
<td><strong>Aurora レプリカ</strong></td>
<td>水平(読み取り)</td>
<td>同一ストレージを共有するため <strong>レプリカラグが小さい</strong>。最大 15 台</td>
<td>リーダーエンドポイントで自動分散</td>
</tr>
<tr>
<td><strong>Aurora Auto Scaling</strong></td>
<td>水平</td>
<td>CPU や接続数に応じて <strong>Aurora レプリカを自動増減</strong></td>
<td>書き込み(ライター)は対象外</td>
</tr>
<tr>
<td><strong>Aurora Serverless v2</strong></td>
<td>垂直(自動・細かい)</td>
<td><strong>ACU(Aurora Capacity Unit)</strong> 単位で負荷に応じて <strong>秒単位で自動伸縮</strong></td>
<td>最小・最大 ACU を設定</td>
</tr>
</tbody>
</table></div>
<Diagram id="dg22" />

<h4>(2) DynamoDB のキャパシティモード</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">モード</th>
<th scope="col">内容</th>
<th scope="col">向いているケース</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>オンデマンド</strong></td>
<td>リクエスト数に応じて自動対応・課金。事前のキャパシティ計画が不要</td>
<td>予測不能・変動が大きい・新規ワークロード</td>
</tr>
<tr>
<td><strong>プロビジョンド</strong></td>
<td><strong>RCU(読み取りキャパシティ)/ WCU(書き込みキャパシティ)</strong> を指定。<strong>Auto Scaling</strong> と併用可能</td>
<td>予測可能で安定した負荷(コスト効率が良い)</td>
</tr>
</tbody>
</table></div>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">用語</th>
<th scope="col">意味</th>
</tr>
</thead>
<tbody>
<tr>
<td>RCU</td>
<td>1 RCU = 最大 4 KB の項目を <strong>強力な整合性</strong> で毎秒 1 回(結果整合性なら 2 回)読み取れる</td>
</tr>
<tr>
<td>WCU</td>
<td>1 WCU = 最大 1 KB の項目を毎秒 1 回書き込める</td>
</tr>
<tr>
<td><code>ProvisionedThroughputExceededException</code></td>
<td>プロビジョンドの容量を超えた(スロットリング)。<strong>バックオフ付きリトライ</strong>、容量増加、Auto Scaling</td>
</tr>
<tr>
<td>ホットパーティション</td>
<td>特定のキーにアクセスが集中。<strong>パーティションキーの設計見直し</strong>(キーを分散)</td>
</tr>
<tr>
<td>アダプティブキャパシティ</td>
<td>偏りに応じてパーティション間で容量を自動調整(ただし万能ではない)</td>
</tr>
<tr>
<td><strong>DAX</strong></td>
<td>DynamoDB 専用のインメモリキャッシュ(読み取りをマイクロ秒に)</td>
</tr>
<tr>
<td>グローバルテーブル</td>
<td>複数リージョンのマルチアクティブ・レプリケーション</td>
</tr>
</tbody>
</table></div>
<h4>(3) ベストプラクティス</h4>
<ul>
<li>読み取り中心なら <strong>レプリカ / キャッシュ</strong> を先に検討(書き込みはスケールアップが基本)</li>
<li><strong>ストレージの自動スケーリングを有効化</strong> し、容量逼迫による停止を防ぐ</li>
<li>変動が激しいワークロードは <strong>Aurora Serverless v2 / DynamoDB オンデマンド</strong></li>
<li>安定した DynamoDB は <strong>プロビジョンド + Auto Scaling</strong> でコスト最適化</li>
<li>SDK の <strong>指数バックオフ + ジッター</strong> のリトライを活用し、スロットリングに備える</li>
<li>DB への接続爆発は <strong>RDS Proxy</strong> で緩和する</li>
</ul>
<h4>(4) 参考 URL</h4>
<ul>
<li>RDS リードレプリカ: <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html">https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html</a></li>
<li>Aurora Serverless v2: <a href="https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.html">https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.html</a></li>
<li>DynamoDB の読み取り / 書き込みキャパシティモード: <a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadWriteCapacityMode.html">https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadWriteCapacityMode.html</a></li>
</ul>
<h2 id="s-h2-7">Step 5. Task 2.2 高可用で回復力のある環境の実装</h2>
<h3 id="s-h3-26">Skill 2.2.1 🔴 ELB と Route 53 ヘルスチェックの設定・トラブルシュート</h3>
<blockquote>
<p>公式スキル文: Elastic Load Balancing (ELB) と Amazon Route 53 のヘルスチェックを設定・トラブルシュートする。</p>
</blockquote>
<h4>(1) ロードバランサーの種類</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">種類</th>
<th scope="col">レイヤー</th>
<th scope="col">特徴</th>
<th scope="col">主な用途</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>ALB</strong></td>
<td>L7(HTTP / HTTPS / gRPC)</td>
<td>パス・ホスト・ヘッダーによるルーティング、WAF 連携、Lambda ターゲット</td>
<td>Web アプリ、マイクロサービス</td>
</tr>
<tr>
<td><strong>NLB</strong></td>
<td>L4(TCP / UDP / TLS)</td>
<td><strong>超高性能・低レイテンシ・AZ ごとの固定 IP(Elastic IP)</strong>、送信元 IP の保持</td>
<td>高スループット、固定 IP が必要な場合</td>
</tr>
<tr>
<td><strong>GWLB</strong></td>
<td>L3</td>
<td><strong>サードパーティの仮想アプライアンス</strong>(ファイアウォール等)を透過的に挿入</td>
<td>セキュリティアプライアンス</td>
</tr>
<tr>
<td>CLB</td>
<td>L4 / L7</td>
<td>旧世代</td>
<td>新規では非推奨</td>
</tr>
</tbody>
</table></div>
<h4>(2) ヘルスチェックの仕組み</h4>
<p>ロードバランサーはターゲットを定期的にチェックし、<strong>異常なターゲットへのトラフィックを止めます</strong>。</p>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">設定</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>プロトコル / ポート / パス</td>
<td>例: <code>HTTP:80 /health</code>(軽量でアプリの状態を反映するエンドポイントを用意)</td>
</tr>
<tr>
<td>間隔(Interval)</td>
<td>チェックの周期</td>
</tr>
<tr>
<td>タイムアウト</td>
<td>応答を待つ時間</td>
</tr>
<tr>
<td>正常のしきい値 / 異常のしきい値</td>
<td>連続成功 / 連続失敗が何回で状態を切り替えるか</td>
</tr>
<tr>
<td>成功コード(Matcher)</td>
<td>正常とみなす HTTP ステータス(既定は 200)</td>
</tr>
</tbody>
</table></div>
<Diagram id="dg23" />

<h4>(3) ALB の関連機能</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">機能</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>クロスゾーン負荷分散</strong></td>
<td>全ターゲットに均等に分散。<strong>ALB は常に有効</strong>(NLB は既定で無効・有効化すると AZ 間データ転送料金が発生しうる)</td>
</tr>
<tr>
<td><strong>登録解除の遅延(Deregistration delay)</strong></td>
<td>登録解除中のターゲットが処理中のリクエストを完了する猶予(<strong>既定 300 秒</strong>)</td>
</tr>
<tr>
<td>スロースタート</td>
<td>新しいターゲットへ徐々にトラフィックを増やす</td>
</tr>
<tr>
<td>スティッキーセッション</td>
<td>同じクライアントを同じターゲットへ(状態を持つアプリ向け)</td>
</tr>
<tr>
<td>アクセスログ</td>
<td>S3 に保存(Skill 5.3.2 参照)</td>
</tr>
</tbody>
</table></div>
<h4>(4) ALB のエラーコードと原因</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">コード</th>
<th scope="col">意味</th>
<th scope="col">よくある原因</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>502 Bad Gateway</strong></td>
<td>ターゲットから不正な応答</td>
<td>ターゲットが接続を閉じた、アプリの異常終了、プロトコルの不一致</td>
</tr>
<tr>
<td><strong>503 Service Unavailable</strong></td>
<td>振り分け先がない</td>
<td><strong>正常なターゲットが 0</strong>、ターゲット未登録</td>
</tr>
<tr>
<td><strong>504 Gateway Timeout</strong></td>
<td>ターゲットの応答がタイムアウト</td>
<td><strong>アイドルタイムアウト(既定 60 秒)</strong> を超える処理、ターゲットの過負荷、SG / NACL による疎通不良</td>
</tr>
</tbody>
</table></div>
<h4>(5) ヘルスチェックが失敗するときの確認</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">確認項目</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>セキュリティグループ</strong></td>
<td><strong>ターゲットの SG が、ロードバランサー(の SG)からのヘルスチェックポートを許可</strong> しているか</td>
</tr>
<tr>
<td>ヘルスチェックパス</td>
<td>アプリが指定パスで期待のステータスを返しているか</td>
</tr>
<tr>
<td>ポート</td>
<td>トラフィックポートとヘルスチェックポートの違い</td>
</tr>
<tr>
<td>アプリの起動時間</td>
<td>起動完了前にチェックされていないか(猶予期間・しきい値)</td>
</tr>
<tr>
<td>NACL・ルート</td>
<td>サブネットの NACL がブロックしていないか</td>
</tr>
</tbody>
</table></div>
<h4>(6) Route 53 ヘルスチェック</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">種類</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>エンドポイント</strong></td>
<td>Route 53 のヘルスチェッカーが世界各地から HTTP / HTTPS / TCP でエンドポイントを監視。<strong>間隔は 30 秒(標準)または 10 秒(高速)</strong></td>
</tr>
<tr>
<td><strong>計算されたヘルスチェック</strong></td>
<td>複数のヘルスチェックを AND / OR などで組み合わせ</td>
</tr>
<tr>
<td><strong>CloudWatch アラームベース</strong></td>
<td>CloudWatch アラームの状態をヘルスの判定に使用。<strong>プライベートなリソース(VPC 内)の監視に有効</strong></td>
</tr>
</tbody>
</table></div>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">重要ポイント</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>到達性</td>
<td>ヘルスチェッカーは <strong>インターネット側から</strong> アクセスするため、<strong>SG / ファイアウォールでヘルスチェッカーの IP を許可</strong> する必要がある</td>
</tr>
<tr>
<td>プライベートリソース</td>
<td>直接チェックできない → <strong>CloudWatch アラームを使ったヘルスチェック</strong></td>
</tr>
<tr>
<td>フェイルオーバー</td>
<td><strong>フェイルオーバールーティング</strong> は、プライマリに <strong>ヘルスチェックの関連付けが必要</strong>。エイリアスレコードでは「<strong>ターゲットのヘルスを評価</strong>」を有効にできる</td>
</tr>
</tbody>
</table></div>
<h4>(7) ベストプラクティス</h4>
<ul>
<li><strong>アプリの依存先(DB など)まで確認する軽量なヘルスチェックエンドポイント</strong> を用意する(ただし重すぎる処理は入れない)</li>
<li>ASG で <strong>ELB ヘルスチェックを有効</strong> にする</li>
<li>ヘルスチェックの SG 設定は <strong>LB の SG → ターゲットの SG</strong> の参照で許可する</li>
<li>ALB の <strong>アクセスログ</strong> と <strong><code>HTTPCode_ELB_5XX_Count</code> / <code>HTTPCode_Target_5XX_Count</code>・<code>UnHealthyHostCount</code></strong> メトリクスで監視する</li>
<li>504 対策として、<strong>アイドルタイムアウトとアプリのタイムアウトを整合</strong> させる</li>
</ul>
<h4>(8) 参考 URL</h4>
<ul>
<li>ALB: <a href="https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html">https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html</a></li>
<li>ターゲットグループのヘルスチェック: <a href="https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html">https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html</a></li>
<li>ALB のトラブルシュート: <a href="https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-troubleshooting.html">https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-troubleshooting.html</a></li>
<li>Route 53 ヘルスチェックと DNS フェイルオーバー: <a href="https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover.html">https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover.html</a></li>
</ul>
<h3 id="s-h3-27">Skill 2.2.2 🔴 耐障害システムの構成(Multi-AZ など)</h3>
<blockquote>
<p>公式スキル文: 耐障害システム(例: Multi-AZ デプロイ)を構成する。</p>
</blockquote>
<h4>(1) 基本の考え方</h4>
<p><strong>単一障害点(SPOF)をなくす</strong> こと。AWS では <strong>複数の AZ(アベイラビリティーゾーン)</strong> にまたがって配置するのが基本です。</p>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">用語</th>
<th scope="col">意味</th>
</tr>
</thead>
<tbody>
<tr>
<td>リージョン</td>
<td>地理的な地域(例: 東京 <code>ap-northeast-1</code>)</td>
</tr>
<tr>
<td>AZ</td>
<td>リージョン内の独立したデータセンター群(電源・ネットワークが分離)</td>
</tr>
<tr>
<td>高可用性</td>
<td>部分的な障害があってもサービスを継続できること</td>
</tr>
<tr>
<td>耐障害性</td>
<td>障害が起きても <strong>ユーザー影響なく</strong> 動き続けること</td>
</tr>
</tbody>
</table></div>
<h4>(2) サービス別の Multi-AZ</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">サービス</th>
<th scope="col">構成</th>
<th scope="col">ポイント</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>EC2 + ASG</strong></td>
<td>複数 AZ のサブネットに分散</td>
<td>AZ 障害時は残りの AZ で稼働を継続し、不足分を補充</td>
</tr>
<tr>
<td><strong>ELB</strong></td>
<td>複数 AZ にノードを配置</td>
<td><strong>各 AZ にサブネットを指定</strong>(ALB は 2 つ以上の AZ が必須)</td>
</tr>
<tr>
<td><strong>RDS Multi-AZ(DB インスタンス)</strong></td>
<td><strong>同期レプリケーション</strong> のスタンバイを別 AZ に配置</td>
<td>障害時に <strong>自動フェイルオーバー</strong>(エンドポイント名は変わらず DNS が切り替わる)。スタンバイは <strong>読み取り不可</strong></td>
</tr>
<tr>
<td><strong>RDS Multi-AZ DB クラスター</strong></td>
<td>読み取り可能なスタンバイ 2 台を 3 つの AZ に配置</td>
<td>高速なフェイルオーバーと読み取りのスケール</td>
</tr>
<tr>
<td><strong>Aurora</strong></td>
<td>ストレージが <strong>3 つの AZ に 6 つのコピー</strong> を自動保持</td>
<td>レプリカが別 AZ にあれば短時間でフェイルオーバー</td>
</tr>
<tr>
<td><strong>EFS</strong></td>
<td>リージョナルな EFS は複数 AZ にデータを保存</td>
<td>各 AZ にマウントターゲットを作成</td>
</tr>
<tr>
<td><strong>S3</strong></td>
<td>標準クラスは複数 AZ に自動保存</td>
<td>One Zone 系クラスは <strong>単一 AZ</strong></td>
</tr>
<tr>
<td><strong>NAT ゲートウェイ</strong></td>
<td><strong>AZ 単位のリソース</strong>(AZ 内で冗長)</td>
<td><strong>AZ ごとに作成</strong> し、各 AZ のルートテーブルから自 AZ の NAT へ</td>
</tr>
<tr>
<td><strong>DynamoDB</strong></td>
<td>複数 AZ に自動レプリケーション</td>
<td>グローバルテーブルでマルチリージョン</td>
</tr>
</tbody>
</table></div>
<Diagram id="dg24" />

<h4>(3) RDS Multi-AZ と リードレプリカの違い(超頻出)</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">項目</th>
<th scope="col">Multi-AZ</th>
<th scope="col">リードレプリカ</th>
</tr>
</thead>
<tbody>
<tr>
<td>目的</td>
<td><strong>可用性・耐障害性</strong></td>
<td><strong>読み取りの性能向上(スケール)</strong></td>
</tr>
<tr>
<td>レプリケーション</td>
<td><strong>同期</strong>(DB インスタンス構成)</td>
<td><strong>非同期</strong></td>
</tr>
<tr>
<td>読み取り</td>
<td>スタンバイは基本不可(Multi-AZ DB クラスターは可)</td>
<td><strong>可能</strong></td>
</tr>
<tr>
<td>フェイルオーバー</td>
<td><strong>自動</strong></td>
<td>手動で昇格(自動ではない)</td>
</tr>
<tr>
<td>別リージョン</td>
<td>不可(同一リージョン内)</td>
<td><strong>可能</strong>(クロスリージョンレプリカ)</td>
</tr>
</tbody>
</table></div>
<blockquote>
<p>💡 <strong>「可用性を上げたい」→ Multi-AZ、「読み取り性能を上げたい」→ リードレプリカ</strong> と覚える。</p>
</blockquote>
<h4>(4) 耐障害性を検証する</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">手段</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>AWS Fault Injection Service(FIS)</strong></td>
<td>障害を意図的に注入して(インスタンス停止、ネットワーク遅延など)耐障害性を検証するカオスエンジニアリング</td>
</tr>
<tr>
<td>手動フェイルオーバー</td>
<td>RDS の「再起動(フェイルオーバーあり)」でフェイルオーバーを試験</td>
</tr>
<tr>
<td>Well-Architected Framework</td>
<td>信頼性の柱でのレビュー</td>
</tr>
</tbody>
</table></div>
<h4>(5) ベストプラクティス</h4>
<ul>
<li><strong>本番は最低 2 AZ</strong>、可能なら 3 AZ に分散する</li>
<li><strong>ステートレスにし、状態は外部に保持</strong> する(AZ 障害時の入れ替えを容易に)</li>
<li><strong>NAT ゲートウェイは AZ ごと</strong> に置き、AZ をまたぐ通信とコストを避ける</li>
<li>RDS の <strong>Multi-AZ を本番で有効化</strong> する。アプリは <strong>エンドポイント(DNS 名)で接続</strong> し、IP 直指定しない</li>
<li>障害対応手順を <strong>定期的にテスト(ゲームデイ / FIS)</strong> する</li>
<li>「単一 AZ の構成」(One Zone ストレージ等)は <strong>可用性要件と照らして選ぶ</strong></li>
</ul>
<h4>(6) 参考 URL</h4>
<ul>
<li>RDS Multi-AZ: <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html">https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html</a></li>
<li>AWS FIS: <a href="https://docs.aws.amazon.com/fis/latest/userguide/what-is.html">https://docs.aws.amazon.com/fis/latest/userguide/what-is.html</a></li>
<li>Well-Architected 信頼性の柱: <a href="https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html">https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html</a></li>
</ul>
<h2 id="s-h2-8">Step 6. Task 2.3 バックアップとリストア戦略の実装</h2>
<h3 id="s-h3-28">Skill 2.3.1 🔴 スナップショット・バックアップの自動化(AWS Backup など)</h3>
<blockquote>
<p>公式スキル文: AWS サービス(例: AWS Backup)を使い、AWS リソース(例: EC2 インスタンス、RDS DB インスタンス、EBS ボリューム、S3 バケット、DynamoDB テーブル)のスナップショットとバックアップを自動化する。</p>
</blockquote>
<h4>(1) AWS Backup の構成要素</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">要素</th>
<th scope="col">意味</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>バックアッププラン</strong></td>
<td>いつ・どのくらい保持するかのポリシー(複数のルールで構成)</td>
</tr>
<tr>
<td><strong>ルール</strong></td>
<td>スケジュール、バックアップウィンドウ、<strong>ライフサイクル(コールドへの移行・保持期間)</strong>、コピー先</td>
</tr>
<tr>
<td><strong>リソース割り当て</strong></td>
<td>対象を <strong>タグ</strong> や ARN で指定(例: <code>Backup=daily</code> のタグが付いたリソース)</td>
</tr>
<tr>
<td><strong>バックアップボールト</strong></td>
<td>バックアップの保管場所(KMS で暗号化)</td>
</tr>
<tr>
<td><strong>ボールトロック</strong></td>
<td><strong>WORM(書き込み後は変更不可)</strong> を強制。ガバナンスモード / コンプライアンスモード(猶予期間後は <strong>誰も削除不可</strong>)。ランサムウェア対策・規制対応</td>
</tr>
<tr>
<td><strong>クロスリージョン / クロスアカウントコピー</strong></td>
<td>別リージョン・別アカウントへ複製(DR・隔離)</td>
</tr>
<tr>
<td><strong>Backup Audit Manager</strong></td>
<td>バックアップがポリシーに準拠しているかを監査・レポート</td>
</tr>
</tbody>
</table></div>
<Diagram id="dg25" />

<h4>(2) サービス別のバックアップ手段</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">対象</th>
<th scope="col">ネイティブ機能</th>
<th scope="col">補足</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>EBS</strong></td>
<td><strong>スナップショット</strong>(増分。実体は S3 に保管され、S3 バケットには表示されない)</td>
<td><strong>Data Lifecycle Manager(DLM)</strong> で作成・保持を自動化。<strong>スナップショットアーカイブ</strong> で長期保管を低コスト化。<strong>ごみ箱(Recycle Bin)</strong> で誤削除対策</td>
</tr>
<tr>
<td><strong>EC2</strong></td>
<td>AMI 作成(EBS のスナップショット + 設定)</td>
<td>AWS Backup / Automation の <code>AWS-CreateImage</code> などで自動化</td>
</tr>
<tr>
<td><strong>RDS</strong></td>
<td><strong>自動バックアップ</strong>(保持期間 0〜35 日)+ 手動スナップショット</td>
<td>自動バックアップは <strong>インスタンス削除で消える</strong>(手動スナップショットは残る)</td>
</tr>
<tr>
<td><strong>DynamoDB</strong></td>
<td><strong>オンデマンドバックアップ</strong> + <strong>PITR(35 日)</strong></td>
<td>AWS Backup と統合</td>
</tr>
<tr>
<td><strong>S3</strong></td>
<td>バージョニング、<strong>レプリケーション(CRR / SRR)</strong></td>
<td>AWS Backup による S3 バックアップ(継続バックアップで PITR も可)</td>
</tr>
<tr>
<td><strong>EFS</strong></td>
<td>AWS Backup(EFS 自動バックアップも既定で有効な場合あり)</td>
<td></td>
</tr>
</tbody>
</table></div>
<h4>(3) ベストプラクティス</h4>
<ul>
<li><strong>3-2-1 ルール</strong>(3 つのコピー、2 種類の媒体、1 つは別の場所)を意識し、<strong>別リージョン / 別アカウントにコピー</strong> する</li>
<li><strong>タグベースの割り当て</strong> で、新しいリソースも自動的にバックアップ対象にする</li>
<li>重要なバックアップは <strong>ボールトロック</strong> で削除・改ざんから保護する</li>
<li><strong>Organizations のバックアップポリシー</strong> で全アカウントに統一ルールを適用する</li>
<li>バックアップは <strong>暗号化</strong>(KMS)し、<strong>定期的にリストアテスト</strong> を行う(復元できて初めてバックアップ)</li>
<li><strong>ライフサイクル</strong> でコールドストレージへ移行してコストを最適化する</li>
<li><strong>Backup Audit Manager</strong> でコンプライアンスを継続確認する</li>
</ul>
<h4>(4) 参考 URL</h4>
<ul>
<li>AWS Backup: <a href="https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html">https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html</a></li>
<li>Backup Vault Lock: <a href="https://docs.aws.amazon.com/aws-backup/latest/devguide/vault-lock.html">https://docs.aws.amazon.com/aws-backup/latest/devguide/vault-lock.html</a></li>
<li>Data Lifecycle Manager: <a href="https://docs.aws.amazon.com/ebs/latest/userguide/snapshot-lifecycle.html">https://docs.aws.amazon.com/ebs/latest/userguide/snapshot-lifecycle.html</a></li>
</ul>
<h3 id="s-h3-29">Skill 2.3.2 🔴 データベースの復元方法(ポイントインタイムリストアなど)と RTO / RPO / コスト</h3>
<blockquote>
<p>公式スキル文: 復旧時間目標(RTO)、復旧時点目標(RPO)、コスト要件を満たすために、さまざまな方法でデータベースを復元する(例: ポイントインタイムリストア)。</p>
</blockquote>
<h4>(1) RTO と RPO</h4>
<Diagram id="dg26" />

<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">用語</th>
<th scope="col">意味</th>
<th scope="col">覚え方</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>RPO</strong></td>
<td><strong>どの時点のデータまで戻せればよいか</strong>(許容データ損失)</td>
<td><strong>P</strong>oint = 時点</td>
</tr>
<tr>
<td><strong>RTO</strong></td>
<td><strong>どれだけの時間で復旧すべきか</strong>(許容停止時間)</td>
<td><strong>T</strong>ime = 時間</td>
</tr>
</tbody>
</table></div>
<h4>(2) RDS の復元方法</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">方法</th>
<th scope="col">内容</th>
<th scope="col">重要ポイント</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>スナップショットからの復元</strong></td>
<td>手動 / 自動スナップショットの時点に戻す</td>
<td><strong>常に新しい DB インスタンスを作成</strong> → <strong>新しいエンドポイント</strong> になる(アプリの接続先変更が必要)</td>
</tr>
<tr>
<td><strong>ポイントインタイムリストア(PITR)</strong></td>
<td>自動バックアップ + トランザクションログで <strong>保持期間内の任意の時点</strong>(<strong>約 5 分前まで</strong>)に復元</td>
<td><strong>自動バックアップが有効</strong> であることが前提。<strong>新しい DB インスタンスとして復元</strong></td>
</tr>
<tr>
<td>クロスリージョン</td>
<td>スナップショットを別リージョンへコピーして復元</td>
<td>DR 用。<strong>暗号化スナップショットは KMS キーの扱いに注意</strong></td>
</tr>
<tr>
<td>Aurora <strong>バックトラック</strong></td>
<td>MySQL 互換の Aurora で、<strong>DB クラスターを巻き戻す</strong>(新しいクラスターを作らず時間を戻す)</td>
<td><strong>MySQL 互換 Aurora のみ</strong>。事前に有効化が必要</td>
</tr>
<tr>
<td>Aurora <strong>クローン</strong></td>
<td>ストレージを共有する <strong>高速・低コストな複製</strong>(テスト用など)</td>
<td>コピーオンライト方式</td>
</tr>
</tbody>
</table></div>
<Diagram id="dg27" />

<blockquote>
<p>⚠️ <strong>復元は「その場で上書き」ではなく「新しいインスタンスを作る」</strong> のが原則(Aurora バックトラックを除く)。復元後は <strong>エンドポイントの切り替え</strong> や、<strong>必要なデータだけを抽出して戻す</strong> 作業が必要です。</p>
</blockquote>
<h4>(3) DynamoDB の復元</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">方法</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>PITR</strong></td>
<td><strong>過去 35 日以内の任意の時点(秒単位)</strong> に戻せる。<strong>新しいテーブルとして復元</strong></td>
</tr>
<tr>
<td>オンデマンドバックアップ</td>
<td>任意のタイミングで取得。<strong>新しいテーブルとして復元</strong></td>
</tr>
<tr>
<td>注意</td>
<td>PITR は <strong>明示的に有効化</strong> が必要(既定では無効)</td>
</tr>
</tbody>
</table></div>
<h4>(4) RTO / RPO / コストのトレードオフ</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">復元方式</th>
<th scope="col">一般的な RPO</th>
<th scope="col">一般的な RTO</th>
<th scope="col">コスト</th>
</tr>
</thead>
<tbody>
<tr>
<td>日次スナップショットからの復元</td>
<td>最大 24 時間</td>
<td>長め(新規作成 + 切替)</td>
<td>低</td>
</tr>
<tr>
<td>PITR</td>
<td>数分(直前まで)</td>
<td>中(新規作成 + 切替)</td>
<td>低〜中</td>
</tr>
<tr>
<td>Multi-AZ</td>
<td>ほぼゼロ(同期)</td>
<td>1〜2 分程度(自動フェイルオーバー)</td>
<td>中(スタンバイ分)</td>
</tr>
<tr>
<td>クロスリージョン レプリカ / Aurora Global Database</td>
<td>秒単位の小さな遅延</td>
<td>分単位(昇格)</td>
<td>高</td>
</tr>
</tbody>
</table></div>
<blockquote>
<p>💡 <strong>ポイント</strong>: Multi-AZ は <strong>AZ 障害対策</strong>(可用性)であり、<strong>誤削除・論理的なデータ破損には効かない</strong>(破損も同期されてしまう)。論理的な破損には <strong>PITR / スナップショット / バックトラック</strong> が必要です。</p>
</blockquote>
<h4>(5) ベストプラクティス</h4>
<ul>
<li>要件(RTO / RPO / コスト)から <strong>手段を選ぶ</strong>(厳しい要件ほどコストが上がる)</li>
<li>RDS は <strong>自動バックアップを有効化</strong>(保持期間を要件に合わせる)</li>
<li>重要な DB は <strong>復元を定期的に訓練</strong> し、手順をランブック化する</li>
<li>暗号化スナップショットを他アカウント / リージョンへ共有・コピーするときは <strong>カスタマー管理キーのキーポリシー・権限</strong> を準備する</li>
<li>DynamoDB の本番テーブルは <strong>PITR を有効化</strong> する</li>
</ul>
<h4>(6) 参考 URL</h4>
<ul>
<li>RDS のポイントインタイムリストア: <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PIT.html">https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PIT.html</a></li>
<li>DynamoDB のポイントインタイムリカバリ: <a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Point-in-time-recovery.html">https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Point-in-time-recovery.html</a></li>
</ul>
<h3 id="s-h3-30">Skill 2.3.3 🟡 ストレージサービスのバージョニング(S3 / FSx など)</h3>
<blockquote>
<p>公式スキル文: ストレージサービス(例: Amazon S3、Amazon FSx)のバージョニングを実装する。</p>
</blockquote>
<h4>(1) S3 バージョニング</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">状態</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>無効(既定)</td>
<td>上書き・削除すると元に戻せない</td>
</tr>
<tr>
<td><strong>有効</strong></td>
<td>同じキーへの上書きで <strong>新しいバージョン</strong> が作られ、古いバージョンも残る</td>
</tr>
<tr>
<td><strong>停止(Suspended)</strong></td>
<td>新しいバージョンは作られないが、<strong>既存のバージョンは残る</strong>(一度有効化すると「無効」には戻せない)</td>
</tr>
</tbody>
</table></div>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">動作</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>削除</td>
<td><strong>削除マーカー</strong> が付くだけで、実体は残る。<strong>バージョン ID を指定して削除すると完全に削除</strong></td>
</tr>
<tr>
<td>復元</td>
<td>削除マーカーを削除する / 古いバージョンをコピーして最新にする</td>
</tr>
<tr>
<td><strong>MFA Delete</strong></td>
<td>バージョンの完全削除とバージョニング状態の変更に <strong>MFA を要求</strong>(ルートユーザーのみ設定可)</td>
</tr>
<tr>
<td>ライフサイクル</td>
<td><strong>非現行バージョン</strong> を一定期間後に移行・削除してコストを抑える</td>
</tr>
<tr>
<td>レプリケーション</td>
<td>CRR / SRR は <strong>バージョニングが前提</strong></td>
</tr>
<tr>
<td><strong>Object Lock</strong></td>
<td>保持期間・リーガルホールドで <strong>WORM</strong> を実現(バージョニングが前提)</td>
</tr>
</tbody>
</table></div>
<Diagram id="dg28" />

<h4>(2) FSx のバージョニングに相当する機能</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">サービス</th>
<th scope="col">機能</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>FSx for Windows File Server</strong></td>
<td><strong>シャドウコピー</strong>(Windows の「以前のバージョン」)でユーザーが自分でファイルを復元</td>
</tr>
<tr>
<td><strong>FSx for NetApp ONTAP / OpenZFS</strong></td>
<td><strong>スナップショット</strong> で時点を保持</td>
</tr>
<tr>
<td>共通</td>
<td><strong>日次の自動バックアップ</strong>(AWS Backup 連携も可)</td>
</tr>
</tbody>
</table></div>
<h4>(3) ベストプラクティス</h4>
<ul>
<li>重要なバケットでは <strong>バージョニングを有効化</strong> する</li>
<li><strong>非現行バージョンのライフサイクル</strong> を必ず設定し、コストの無制限な増加を防ぐ</li>
<li>誤削除 / ランサムウェア対策に <strong>MFA Delete や Object Lock</strong> を検討</li>
<li>FSx for Windows は <strong>シャドウコピーを有効化</strong> してセルフ復元を可能に</li>
<li>バージョニングは <strong>バックアップの代わりではない</strong>(リージョン障害には別途レプリケーション / バックアップが必要)</li>
</ul>
<h4>(4) 参考 URL</h4>
<ul>
<li>S3 バージョニング: <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html">https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html</a></li>
<li>Amazon FSx: <a href="https://docs.aws.amazon.com/fsx/">https://docs.aws.amazon.com/fsx/</a></li>
</ul>
<h3 id="s-h3-31">Skill 2.3.4 🔴 災害復旧(DR)の手順とベストプラクティス</h3>
<blockquote>
<p>公式スキル文: 災害復旧の手順とベストプラクティスに従う(例: バックアップとリストア、パイロットライト、ウォームスタンバイ、アクティブ / アクティブ)。</p>
</blockquote>
<h4>(1) 4 つの DR 戦略</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">戦略</th>
<th scope="col">概要</th>
<th scope="col">RTO / RPO</th>
<th scope="col">コスト</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>バックアップとリストア</strong></td>
<td>バックアップだけ別リージョンに保管。災害時にゼロから構築して復元</td>
<td>長い(時間〜日)/ 長い</td>
<td><strong>最も低い</strong></td>
</tr>
<tr>
<td><strong>パイロットライト</strong></td>
<td><strong>データ層だけ常時稼働</strong>(DB のレプリケーション)。アプリ層は停止状態(AMI / IaC)で、災害時に起動・拡張</td>
<td>数十分〜数時間</td>
<td>低い</td>
</tr>
<tr>
<td><strong>ウォームスタンバイ</strong></td>
<td><strong>縮小版の完全な環境が常時稼働</strong>。災害時に <strong>スケールアップ</strong> して切替</td>
<td>数分〜数十分</td>
<td>中</td>
</tr>
<tr>
<td><strong>マルチサイト(アクティブ / アクティブ)</strong></td>
<td>複数リージョンで <strong>常時フル稼働</strong> し、Route 53 などで負荷分散</td>
<td><strong>ほぼゼロ</strong> / ほぼゼロ</td>
<td><strong>最も高い</strong></td>
</tr>
</tbody>
</table></div>
<Diagram id="dg29" />

<blockquote>
<p>💡 <strong>速くなるほど高くなる</strong>。「コスト最優先 → バックアップとリストア」「最小限のコアだけ常時稼働 → パイロットライト」「すぐ使える縮小版 → ウォームスタンバイ」「無停止 → アクティブ / アクティブ」。</p>
</blockquote>
<h4>(2) 戦略の選び方</h4>
<Diagram id="dg30" />

<h4>(3) DR に使う AWS サービス</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">サービス</th>
<th scope="col">役割</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>AWS Backup</strong></td>
<td>クロスリージョン / クロスアカウントコピー</td>
</tr>
<tr>
<td><strong>AWS Elastic Disaster Recovery(DRS)</strong></td>
<td><strong>サーバーを継続的にレプリケーション</strong>(オンプレ / 他クラウド / AWS)し、災害時に短い RTO で起動(パイロットライト型)</td>
</tr>
<tr>
<td><strong>Route 53</strong></td>
<td>ヘルスチェック + <strong>フェイルオーバー</strong>ルーティングで切替</td>
</tr>
<tr>
<td><strong>S3 クロスリージョンレプリケーション</strong></td>
<td>オブジェクトの別リージョンへの複製</td>
</tr>
<tr>
<td><strong>RDS クロスリージョンリードレプリカ / Aurora Global Database</strong></td>
<td>別リージョンへの低遅延レプリケーション(Aurora Global は通常 1 秒未満の遅延)</td>
</tr>
<tr>
<td><strong>DynamoDB グローバルテーブル</strong></td>
<td>マルチリージョンのアクティブ / アクティブ</td>
</tr>
<tr>
<td><strong>CloudFormation / IaC</strong></td>
<td>環境を <strong>短時間で再現</strong></td>
</tr>
</tbody>
</table></div>
<h4>(4) ベストプラクティス</h4>
<ul>
<li><strong>RTO / RPO をビジネス要件から決め</strong>、それを満たす最小コストの戦略を選ぶ</li>
<li><strong>DR 環境は別リージョン</strong> に置き、<strong>IaC で再現可能</strong> にしておく</li>
<li><strong>DR 手順(ランブック)を文書化・自動化</strong> し、<strong>定期的に訓練</strong> する(訓練していない DR は機能しない)</li>
<li>DNS の <strong>TTL を短く</strong> しておくとフェイルオーバーが速い</li>
<li><strong>暗号化キー(KMS)・シークレットも DR リージョンで利用可能に</strong>(マルチリージョンキー、シークレットのレプリケーション)</li>
<li>フェイルバック(元に戻す手順)も計画する</li>
</ul>
<h4>(5) 参考 URL</h4>
<ul>
<li>AWS 上のワークロードの災害復旧(ホワイトペーパー): <a href="https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html">https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html</a></li>
<li>AWS Elastic Disaster Recovery: <a href="https://docs.aws.amazon.com/drs/latest/userguide/what-is-drs.html">https://docs.aws.amazon.com/drs/latest/userguide/what-is-drs.html</a></li>
</ul>
        </>
    );
}
