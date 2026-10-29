import { Diagram } from '../Diagram';
import type { ChecklistProps } from '../types';
/** 原本のtask25本文。 */
export default function Content({ progress, updateProgress }: ChecklistProps) { void progress; void updateProgress; return <>
<h2 id={"7-task-25-パフォーマンス目標を満たすソリューション設計"} tabIndex={-1}>
{"\n                    7. Task 2.5 パフォーマンス目標を満たすソリューション設計\n                "}
</h2>
{"\n                "}
<p>
{"公式: 「Design a solution to meet performance objectives」"}
</p>
{"\n                "}
<h3 id={"step-1-何を問われるか-4"} tabIndex={-1}>
{"Step 1: 何を問われるか"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 42：Step 1: 何を問われるか"}>
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
{"パフォーマンス監視技術"}
</td>
<td>
{"遅さの原因を見つける道具"}
</td>
</tr>
<tr className={"even"}>
<td>
{"知識"}
</td>
<td>
{"AWS のストレージ選択肢"}
</td>
<td>
{"用途に合ったストレージの選び方"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"知識"}
</td>
<td>
{"インスタンスファミリーと用途"}
</td>
<td>
{"EC2 の種類の使い分け"}
</td>
</tr>
<tr className={"even"}>
<td>
{"知識"}
</td>
<td>
{"目的特化型データベース"}
</td>
<td>
{"用途ごとに最適なデータベースを選ぶ考え方"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"スキル"}
</td>
<td>
{"\n                                    多様なアクセスパターンへの大規模設計、弾力性のある設計、キャッシュ・バッファリング・レプリカの設計パターン、サービス選定プロセス、ライトサイジング\n                                "}
</td>
<td>
{"速く、柔軟に、無駄なく"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"step-2-a-パフォーマンス監視"} tabIndex={-1}>
{"Step 2-A: パフォーマンス監視"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 43：Step 2-A: パフォーマンス監視"}>
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
{"Amazon CloudWatch"}
</td>
<td>
{"\n                                    メトリクス、ログ、アラーム、ダッシュボード。Application\n                                    Signals、Logs Insights など\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"AWS X-Ray"}
</td>
<td>
{"分散トレーシング。マイクロサービス間のどこが遅いかを可視化"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"CloudWatch Database Insights"}
</td>
<td>
{"データベース負荷と遅いクエリの分析"}
</td>
</tr>
<tr className={"even"}>
<td>
{"AWS Compute Optimizer"}
</td>
<td>
{"\n                                    実使用データから EC2、EBS、Lambda などの"}
<strong>
{"最適サイズを推奨"}
</strong>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"CloudWatch RUM"}
</td>
<td>
{"実ユーザー体験の計測"}
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
{"ベストプラクティス"}
</div>
{"\n                        "}
<p>
{"\n                            推測でなく"}
<strong>
{"計測"}
</strong>
{"する。まずボトルネック(CPU、メモリ、I/O、ネットワーク、DB\n                            のどこか)を特定し、そこへ手を打つ。メモリ使用率やディスク使用率は標準メトリクスに含まれないため、CloudWatch\n                            エージェントで収集する。\n                        "}
</p>
{"\n                    "}
</div>
{"\n                "}
</div>
{"\n                "}
<h3 id={"step-2-b-ストレージの選択"} tabIndex={-1}>
{"Step 2-B: ストレージの選択"}
</h3>
{"\n                "}
<Diagram id="diag-15" label={"Step 2-B: ストレージの選択"}/>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 44：Step 2-B: ストレージの選択"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"サービス"}
</th>
<th scope="col">
{"特徴"}
</th>
<th scope="col">
{"使いどころ"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"Amazon S3"}
</td>
<td>
{"\n                                    無制限の容量、高い耐久性。"}
<strong>
{"プレフィックスあたり 毎秒 3,500 の書き込み系・5,500\n                                        の読み取り系リクエスト"}
</strong>
{"まで対応(並列化で拡張)\n                                "}
</td>
<td>
{"静的コンテンツ、データレイク、バックアップ"}
</td>
</tr>
<tr className={"even"}>
<td>
{"EBS gp3"}
</td>
<td>
{"\n                                    汎用 SSD。ベースライン 3,000 IOPS / 125 MiB/s で、"}
<strong>
{"容量と独立して IOPS とスループットを調整可能"}
</strong>
{"\n                                "}
</td>
<td>
{"一般的なワークロード(通常の第一候補)"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"EBS io2 / io2 Block Express"}
</td>
<td>
{"\n                                    プロビジョンド IOPS SSD。高耐久・最大 256,000 IOPS(Block\n                                    Express)。マルチアタッチ対応\n                                "}
</td>
<td>
{"ミッションクリティカルな DB、低レイテンシー"}
</td>
</tr>
<tr className={"even"}>
<td>
{"EBS st1 / sc1"}
</td>
<td>
{"HDD。スループット重視 / 低頻度アクセス"}
</td>
<td>
{"ビッグデータ、ログ処理 / コールドデータ"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"インスタンスストア"}
</td>
<td>
{"\n                                    ホストに直結した"}
<strong>
{"一時的"}
</strong>
{"な高速ディスク(停止/終了で消える)\n                                "}
</td>
<td>
{"キャッシュ、一時作業領域、高 IOPS が必要で永続性不要な用途"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Amazon EFS"}
</td>
<td>
{"\n                                    共有\n                                    NFS(Linux)。パフォーマンスモード/スループットモードを選択(Elastic\n                                    が一般的)\n                                "}
</td>
<td>
{"複数 EC2/コンテナで共有、CMS、開発環境"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Amazon FSx for Windows File Server"}
</td>
<td>
{"SMB、Active Directory 連携"}
</td>
<td>
{"Windows ファイル共有"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Amazon FSx for Lustre"}
</td>
<td>
{"高性能並列ファイルシステム。S3 とも連携"}
</td>
<td>
{"HPC、機械学習、メディア処理"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Amazon FSx for NetApp ONTAP / OpenZFS"}
</td>
<td>
{"既存のエンタープライズ NAS 機能"}
</td>
<td>
{"NetApp/ZFS 資産の移行"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<p>
{"\n                    "}
<strong>
{"S3 の性能向上テクニック"}
</strong>
{":\n                    マルチパートアップロード、バイト範囲フェッチ、Transfer\n                    Acceleration(遠隔地からのアップロード)、並列リクエスト、CloudFront\n                    によるキャッシュ。\n                "}
</p>
{"\n                "}
<h3 id={"step-2-c-インスタンスファミリーの選び方"} tabIndex={-1}>
{"\n                    Step 2-C: インスタンスファミリーの選び方\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 45：Step 2-C: インスタンスファミリーの選び方"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"ファミリー"}
</th>
<th scope="col">
{"例"}
</th>
<th scope="col">
{"特徴"}
</th>
<th scope="col">
{"用途"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"汎用"}
</td>
<td>
{"M、T(バースト可能)"}
</td>
<td>
{"CPU とメモリのバランス"}
</td>
<td>
{"Web/アプリサーバー、小規模 DB"}
</td>
</tr>
<tr className={"even"}>
<td>
{"コンピューティング最適化"}
</td>
<td>
{"C"}
</td>
<td>
{"高 CPU 性能"}
</td>
<td>
{"バッチ処理、メディアエンコード、HPC、ゲームサーバー"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"メモリ最適化"}
</td>
<td>
{"R、X、z1d"}
</td>
<td>
{"大容量メモリ"}
</td>
<td>
{"インメモリ DB、SAP HANA、ビッグデータ分析"}
</td>
</tr>
<tr className={"even"}>
<td>
{"ストレージ最適化"}
</td>
<td>
{"I、D、H"}
</td>
<td>
{"高速ローカルストレージ(高 IOPS / 高スループット)"}
</td>
<td>
{"NoSQL、データウェアハウス、分散ファイルシステム"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"高速コンピューティング"}
</td>
<td>
{"P、G、Inf、Trn"}
</td>
<td>
{"GPU や専用チップ"}
</td>
<td>
{"機械学習の学習/推論、グラフィックス"}
</td>
</tr>
<tr className={"even"}>
<td>
{"HPC 最適化"}
</td>
<td>
{"Hpc"}
</td>
<td>
{"高性能計算向け"}
</td>
<td>
{"流体解析、気象シミュレーション"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<p>
{"\n                    "}
<strong>
{"補足"}
</strong>
{": 名前の末尾に "}
<strong>
{"g"}
</strong>
{" が付く(例: M7g)と\n                    "}
<strong>
{"AWS Graviton(Arm)"}
</strong>
{"\n                    搭載で、一般に"}
<strong>
{"価格あたりの性能が高い"}
</strong>
{"傾向があります(アプリが Arm\n                    に対応している必要あり)。"}
<strong>
{"T"}
</strong>
{" ファミリーは CPU\n                    クレジットによるバースト型で、常時高負荷だと不向きです。\n                "}
</p>
{"\n                "}
<h3 id={"step-2-d-目的特化型データベースpurpose-built-databases"} tabIndex={-1}>
{"\n                    Step 2-D: 目的特化型データベース(Purpose-built databases)\n                "}
</h3>
{"\n                "}
<p>
{"\n                    "}
<strong>
{"考え方"}
</strong>
{": 「何でもリレーショナル\n                    DB」ではなく、"}
<strong>
{"データの形とアクセスパターン"}
</strong>
{"に合わせて選びます。\n                "}
</p>
{"\n                "}
<Diagram id="diag-16" label={"Step 2-D: 目的特化型データベース(Purpose-built databases)"}/>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 46：Step 2-D: 目的特化型データベース(Purpose-built databases)"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"データベース"}
</th>
<th scope="col">
{"種類"}
</th>
<th scope="col">
{"向いているワークロード"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"Amazon RDS / Aurora"}
</td>
<td>
{"リレーショナル"}
</td>
<td>
{"\n                                    業務システム、トランザクション(ACID)、複雑な SQL。Aurora\n                                    は高性能・高可用性。Aurora Serverless は負荷変動が大きい用途\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"Amazon DynamoDB"}
</td>
<td>
{"キーバリュー / ドキュメント(NoSQL)"}
</td>
<td>
{"\n                                    大規模で予測可能な低レイテンシー(ミリ秒)、サーバーレス、ゲーム、IoT。DAX\n                                    でマイクロ秒に\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Amazon ElastiCache"}
</td>
<td>
{"インメモリキャッシュ"}
</td>
<td>
{"\n                                    セッション、ランキング、DB 負荷軽減(Valkey / Redis\n                                    OSS、Memcached)\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"Amazon MemoryDB"}
</td>
<td>
{"耐久性のあるインメモリ DB"}
</td>
<td>
{"\n                                    プライマリ DB として使えるインメモリ(Valkey / Redis OSS 互換)\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Amazon DocumentDB"}
</td>
<td>
{"ドキュメント(MongoDB 互換)"}
</td>
<td>
{"JSON ドキュメント中心のアプリ"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Amazon Neptune"}
</td>
<td>
{"グラフ"}
</td>
<td>
{"SNS、不正検知、ナレッジグラフ"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Amazon Keyspaces"}
</td>
<td>
{"ワイドカラム(Cassandra 互換)"}
</td>
<td>
{"Cassandra ワークロードのマネージド化"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Amazon Timestream for InfluxDB"}
</td>
<td>
{"時系列"}
</td>
<td>
{"IoT センサー、運用メトリクス。新規顧客向けの現行の選択肢"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Amazon Timestream for LiveAnalytics"}
</td>
<td>
{"時系列(サーバーレス)"}
</td>
<td>
{"既存顧客・試験の出題範囲。新規顧客は利用不可"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Amazon Redshift"}
</td>
<td>
{"データウェアハウス(列指向)"}
</td>
<td>
{"大規模分析(OLAP)、BI"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Amazon OpenSearch Service"}
</td>
<td>
{"検索/分析"}
</td>
<td>
{"全文検索、ログ分析"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"step-2-e-キャッシュバッファリングレプリカ"} tabIndex={-1}>
{"\n                    Step 2-E: キャッシュ、バッファリング、レプリカ\n                "}
</h3>
{"\n                "}
<Diagram id="diag-17" label={"Step 2-E: キャッシュ、バッファリング、レプリカ"}/>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 47：Step 2-E: キャッシュ、バッファリング、レプリカ"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"パターン"}
</th>
<th scope="col">
{"目的"}
</th>
<th scope="col">
{"AWS サービス"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
<strong>
{"キャッシュ"}
</strong>
</td>
<td>
{"同じ読み取りを速く、DB 負荷を減らす"}
</td>
<td>
{"\n                                    CloudFront(エッジ)、ElastiCache(アプリ層)、DAX(DynamoDB\n                                    専用)、API Gateway キャッシュ\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
<strong>
{"バッファリング"}
</strong>
</td>
<td>
{"急なスパイクを吸収し、バックエンドを一定の速度で処理"}
</td>
<td>
{"SQS、Kinesis Data Streams / Firehose、Amazon MQ"}
</td>
</tr>
<tr className={"odd"}>
<td>
<strong>
{"レプリカ"}
</strong>
</td>
<td>
{"読み取りを分散"}
</td>
<td>
{"\n                                    RDS リードレプリカ、Aurora\n                                    レプリカ(リーダーエンドポイント)、DynamoDB グローバルテーブル\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
<strong>
{"接続プール"}
</strong>
</td>
<td>
{"接続数の急増から DB を守る(特に Lambda)"}
</td>
<td>
{"RDS Proxy"}
</td>
</tr>
<tr className={"odd"}>
<td>
<strong>
{"グローバル高速化"}
</strong>
</td>
<td>
{"世界中のユーザーへの経路改善"}
</td>
<td>
{"\n                                    CloudFront、Global Accelerator(エニーキャスト IP で AWS\n                                    のバックボーンへ誘導)、S3 Transfer Acceleration\n                                "}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<p>
{"\n                    "}
<strong>
{"ひっかけ"}
</strong>
{": "}
<strong>
{"CloudFront"}
</strong>
{" は主に HTTP/HTTPS\n                    コンテンツの"}
<strong>
{"キャッシュ配信"}
</strong>
{"、"}
<strong>
{"Global Accelerator"}
</strong>
{"\n                    は TCP/UDP\n                    も含めた"}
<strong>
{"経路の最適化と高速フェイルオーバー"}
</strong>
{"(キャッシュはしない)。\n                "}
</p>
{"\n                "}
<p>
{"\n                    "}
<strong>
{"キャッシュ戦略"}
</strong>
{": 「Lazy Loading(キャッシュミス時に DB\n                    から取得して格納)」と「Write-Through(書き込み時にキャッシュも更新)」。TTL\n                    を設定して古いデータを防ぐ。\n                "}
</p>
{"\n                "}
<h3 id={"step-2-f-弾力性とライトサイジング"} tabIndex={-1}>
{"Step 2-F: 弾力性とライトサイジング"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 48：Step 2-F: 弾力性とライトサイジング"}>
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
{"弾力性"}
</td>
<td>
{"\n                                    Auto Scaling、Lambda、Fargate、DynamoDB オンデマンド、Aurora\n                                    Serverless など"}
<strong>
{"需要に応じて自動で伸縮"}
</strong>
{"する構成\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"ライトサイジング"}
</td>
<td>
{"\n                                    Compute Optimizer の推奨、CloudWatch\n                                    の実測値を基に"}
<strong>
{"過剰/不足なサイズ"}
</strong>
{"へ調整。"}
<strong>
{"変更は小さく、計測して繰り返す"}
</strong>
{"\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"選定プロセス"}
</td>
<td>
{"\n                                    ①要件(レイテンシー、スループット、整合性、データ量)→\n                                    ②アクセスパターン → ③候補サービス → ④負荷テストで検証 →\n                                    ⑤継続的に見直し\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"新しい世代・Graviton"}
</td>
<td>
{"\n                                    世代が新しいインスタンスや Graviton は性能/価格が良いことが多い\n                                "}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"step-3-task-25-試験のコツ"} tabIndex={-1}>
{"Step 3: Task 2.5 試験のコツ"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 49：Step 3: Task 2.5 試験のコツ"}>
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
{"「読み取りが多い DB の負荷を軽減」"}
</td>
<td>
{"ElastiCache、リードレプリカ、DAX(DynamoDB)"}
</td>
</tr>
<tr className={"even"}>
<td>
{"「DynamoDB をマイクロ秒で」"}
</td>
<td>
{"DAX"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"「Lambda から DB 接続が枯渇」"}
</td>
<td>
{"RDS Proxy"}
</td>
</tr>
<tr className={"even"}>
<td>
{"「世界中のユーザーへ静的コンテンツを高速配信」"}
</td>
<td>
{"CloudFront"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"「固定 IP、TCP/UDP、高速フェイルオーバー」"}
</td>
<td>
{"Global Accelerator"}
</td>
</tr>
<tr className={"even"}>
<td>
{"「一時的で超高速な I/O」"}
</td>
<td>
{"インスタンスストア"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"「高い IOPS を DB で安定して」"}
</td>
<td>
{"EBS io2 Block Express"}
</td>
</tr>
<tr className={"even"}>
<td>
{"「複数インスタンスで共有する POSIX ファイル」"}
</td>
<td>
{"EFS"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"「HPC/機械学習の高スループットファイル」"}
</td>
<td>
{"FSx for Lustre"}
</td>
</tr>
<tr className={"even"}>
<td>
{"「関係性をたどるクエリ」"}
</td>
<td>
{"Neptune"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"「スパイクをならして処理」"}
</td>
<td>
{"SQS、Kinesis"}
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
