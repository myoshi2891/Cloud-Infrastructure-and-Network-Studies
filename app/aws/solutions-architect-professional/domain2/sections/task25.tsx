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
{"パフォーマンス監視技術"}
</td>
{"\n                                "}
<td>
{"遅さの原因を見つける道具"}
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
{"AWS のストレージ選択肢"}
</td>
{"\n                                "}
<td>
{"用途に合ったストレージの選び方"}
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
{"インスタンスファミリーと用途"}
</td>
{"\n                                "}
<td>
{"EC2 の種類の使い分け"}
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
{"目的特化型データベース"}
</td>
{"\n                                "}
<td>
{"用途ごとに最適なデータベースを選ぶ考え方"}
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
{"\n                                    多様なアクセスパターンへの大規模設計、弾力性のある設計、キャッシュ・バッファリング・レプリカの設計パターン、サービス選定プロセス、ライトサイジング\n                                "}
</td>
{"\n                                "}
<td>
{"速く、柔軟に、無駄なく"}
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
<h3 id={"step-2-a-パフォーマンス監視"} tabIndex={-1}>
{"Step 2-A: パフォーマンス監視"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：Step 2-A: パフォーマンス監視"}>
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
{"Amazon CloudWatch"}
</td>
{"\n                                "}
<td>
{"\n                                    メトリクス、ログ、アラーム、ダッシュボード。Application\n                                    Signals、Logs Insights など\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"AWS X-Ray"}
</td>
{"\n                                "}
<td>
{"分散トレーシング。マイクロサービス間のどこが遅いかを可視化"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"CloudWatch Database Insights"}
</td>
{"\n                                "}
<td>
{"データベース負荷と遅いクエリの分析"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"AWS Compute Optimizer"}
</td>
{"\n                                "}
<td>
{"\n                                    実使用データから EC2、EBS、Lambda などの"}
<strong>
{"最適サイズを推奨"}
</strong>
{"\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"CloudWatch RUM"}
</td>
{"\n                                "}
<td>
{"実ユーザー体験の計測"}
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
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：flowchart TB\n    S[\"データの種類は?\"] --> O{\"オブジェクト<br/>画像 動画 ログ\"}\n    S --> B{\"ブロック<br/>OS 起動 DB\"}\n    S --> F{\"共有ファイル\"}\n    O --> S3[\"Amazon S3\"]\n    B --> EBS[\"Amazon EBS\"]\n    B --> IS[\"インスタンスストア<br/>一時データ 超高速\"]\n    F --> EFS[\"Amazon EFS<br/>Linux NFS\"]\n    F --> FSX[\"Amazon FSx<br/>Windows Lustre ONTAP OpenZFS\"]"}>
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
{"Amazon S3"}
</td>
{"\n                                "}
<td>
{"\n                                    無制限の容量、高い耐久性。"}
<strong>
{"プレフィックスあたり 毎秒 3,500 の書き込み系・5,500\n                                        の読み取り系リクエスト"}
</strong>
{"まで対応(並列化で拡張)\n                                "}
</td>
{"\n                                "}
<td>
{"静的コンテンツ、データレイク、バックアップ"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"EBS gp3"}
</td>
{"\n                                "}
<td>
{"\n                                    汎用 SSD。ベースライン 3,000 IOPS / 125 MiB/s で、"}
<strong>
{"容量と独立して IOPS とスループットを調整可能"}
</strong>
{"\n                                "}
</td>
{"\n                                "}
<td>
{"一般的なワークロード(通常の第一候補)"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"EBS io2 / io2 Block Express"}
</td>
{"\n                                "}
<td>
{"\n                                    プロビジョンド IOPS SSD。高耐久・最大 256,000 IOPS(Block\n                                    Express)。マルチアタッチ対応\n                                "}
</td>
{"\n                                "}
<td>
{"ミッションクリティカルな DB、低レイテンシー"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"EBS st1 / sc1"}
</td>
{"\n                                "}
<td>
{"HDD。スループット重視 / 低頻度アクセス"}
</td>
{"\n                                "}
<td>
{"ビッグデータ、ログ処理 / コールドデータ"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"インスタンスストア"}
</td>
{"\n                                "}
<td>
{"\n                                    ホストに直結した"}
<strong>
{"一時的"}
</strong>
{"な高速ディスク(停止/終了で消える)\n                                "}
</td>
{"\n                                "}
<td>
{"キャッシュ、一時作業領域、高 IOPS が必要で永続性不要な用途"}
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
{"\n                                    共有\n                                    NFS(Linux)。パフォーマンスモード/スループットモードを選択(Elastic\n                                    が一般的)\n                                "}
</td>
{"\n                                "}
<td>
{"複数 EC2/コンテナで共有、CMS、開発環境"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"Amazon FSx for Windows File Server"}
</td>
{"\n                                "}
<td>
{"SMB、Active Directory 連携"}
</td>
{"\n                                "}
<td>
{"Windows ファイル共有"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"Amazon FSx for Lustre"}
</td>
{"\n                                "}
<td>
{"高性能並列ファイルシステム。S3 とも連携"}
</td>
{"\n                                "}
<td>
{"HPC、機械学習、メディア処理"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"Amazon FSx for NetApp ONTAP / OpenZFS"}
</td>
{"\n                                "}
<td>
{"既存のエンタープライズ NAS 機能"}
</td>
{"\n                                "}
<td>
{"NetApp/ZFS 資産の移行"}
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
{"S3 の性能向上テクニック"}
</strong>
{":\n                    マルチパートアップロード、バイト範囲フェッチ、Transfer\n                    Acceleration(遠隔地からのアップロード)、並列リクエスト、CloudFront\n                    によるキャッシュ。\n                "}
</p>
{"\n                "}
<h3 id={"step-2-c-インスタンスファミリーの選び方"} tabIndex={-1}>
{"\n                    Step 2-C: インスタンスファミリーの選び方\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：Step 2-C: インスタンスファミリーの選び方"}>
{"\n                    "}
<table>
{"\n                        "}
<thead>
{"\n                            "}
<tr className={"header"}>
{"\n                                "}
<th scope="col">
{"ファミリー"}
</th>
{"\n                                "}
<th scope="col">
{"例"}
</th>
{"\n                                "}
<th scope="col">
{"特徴"}
</th>
{"\n                                "}
<th scope="col">
{"用途"}
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
{"汎用"}
</td>
{"\n                                "}
<td>
{"M、T(バースト可能)"}
</td>
{"\n                                "}
<td>
{"CPU とメモリのバランス"}
</td>
{"\n                                "}
<td>
{"Web/アプリサーバー、小規模 DB"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"コンピューティング最適化"}
</td>
{"\n                                "}
<td>
{"C"}
</td>
{"\n                                "}
<td>
{"高 CPU 性能"}
</td>
{"\n                                "}
<td>
{"バッチ処理、メディアエンコード、HPC、ゲームサーバー"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"メモリ最適化"}
</td>
{"\n                                "}
<td>
{"R、X、z1d"}
</td>
{"\n                                "}
<td>
{"大容量メモリ"}
</td>
{"\n                                "}
<td>
{"インメモリ DB、SAP HANA、ビッグデータ分析"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"ストレージ最適化"}
</td>
{"\n                                "}
<td>
{"I、D、H"}
</td>
{"\n                                "}
<td>
{"高速ローカルストレージ(高 IOPS / 高スループット)"}
</td>
{"\n                                "}
<td>
{"NoSQL、データウェアハウス、分散ファイルシステム"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"高速コンピューティング"}
</td>
{"\n                                "}
<td>
{"P、G、Inf、Trn"}
</td>
{"\n                                "}
<td>
{"GPU や専用チップ"}
</td>
{"\n                                "}
<td>
{"機械学習の学習/推論、グラフィックス"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"HPC 最適化"}
</td>
{"\n                                "}
<td>
{"Hpc"}
</td>
{"\n                                "}
<td>
{"高性能計算向け"}
</td>
{"\n                                "}
<td>
{"流体解析、気象シミュレーション"}
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
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：flowchart TB\n    Q[\"データとアクセスの特徴は?\"] --> A{\"複雑な結合 ACID<br/>リレーショナル\"}\n    Q --> B{\"キーによる高速アクセス<br/>大規模 ミリ秒\"}\n    Q --> C{\"マイクロ秒の<br/>インメモリ\"}\n    Q --> D{\"関係性 グラフ\"}\n    Q --> E{\"時系列\"}\n    Q --> F{\"分析 DWH\"}\n    Q --> G{\"全文検索 ログ分析\"}\n    A --> RDS[\"Amazon RDS または Aurora\"]\n    B --> DDB[\"Amazon DynamoDB\"]\n    C --> EC[\"ElastiCache または MemoryDB\"]\n    D --> NEP[\"Amazon Neptune\"]\n    E --> TS[\"Timestream for InfluxDB<br/>新規 / LiveAnalytics は既存顧客\"]\n    F --> RS[\"Amazon Redshift\"]\n    G --> OS[\"Amazon OpenSearch Service\"]"}>
{"\n                    "}
<table>
{"\n                        "}
<thead>
{"\n                            "}
<tr className={"header"}>
{"\n                                "}
<th scope="col">
{"データベース"}
</th>
{"\n                                "}
<th scope="col">
{"種類"}
</th>
{"\n                                "}
<th scope="col">
{"向いているワークロード"}
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
{"Amazon RDS / Aurora"}
</td>
{"\n                                "}
<td>
{"リレーショナル"}
</td>
{"\n                                "}
<td>
{"\n                                    業務システム、トランザクション(ACID)、複雑な SQL。Aurora\n                                    は高性能・高可用性。Aurora Serverless は負荷変動が大きい用途\n                                "}
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
{"キーバリュー / ドキュメント(NoSQL)"}
</td>
{"\n                                "}
<td>
{"\n                                    大規模で予測可能な低レイテンシー(ミリ秒)、サーバーレス、ゲーム、IoT。DAX\n                                    でマイクロ秒に\n                                "}
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
{"インメモリキャッシュ"}
</td>
{"\n                                "}
<td>
{"\n                                    セッション、ランキング、DB 負荷軽減(Valkey / Redis\n                                    OSS、Memcached)\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"Amazon MemoryDB"}
</td>
{"\n                                "}
<td>
{"耐久性のあるインメモリ DB"}
</td>
{"\n                                "}
<td>
{"\n                                    プライマリ DB として使えるインメモリ(Valkey / Redis OSS 互換)\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"Amazon DocumentDB"}
</td>
{"\n                                "}
<td>
{"ドキュメント(MongoDB 互換)"}
</td>
{"\n                                "}
<td>
{"JSON ドキュメント中心のアプリ"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"Amazon Neptune"}
</td>
{"\n                                "}
<td>
{"グラフ"}
</td>
{"\n                                "}
<td>
{"SNS、不正検知、ナレッジグラフ"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"Amazon Keyspaces"}
</td>
{"\n                                "}
<td>
{"ワイドカラム(Cassandra 互換)"}
</td>
{"\n                                "}
<td>
{"Cassandra ワークロードのマネージド化"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"Amazon Timestream for InfluxDB"}
</td>
{"\n                                "}
<td>
{"時系列"}
</td>
{"\n                                "}
<td>
{"IoT センサー、運用メトリクス。新規顧客向けの現行の選択肢"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"Amazon Timestream for LiveAnalytics"}
</td>
{"\n                                "}
<td>
{"時系列(サーバーレス)"}
</td>
{"\n                                "}
<td>
{"既存顧客・試験の出題範囲。新規顧客は利用不可"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"Amazon Redshift"}
</td>
{"\n                                "}
<td>
{"データウェアハウス(列指向)"}
</td>
{"\n                                "}
<td>
{"大規模分析(OLAP)、BI"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"Amazon OpenSearch Service"}
</td>
{"\n                                "}
<td>
{"検索/分析"}
</td>
{"\n                                "}
<td>
{"全文検索、ログ分析"}
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
<h3 id={"step-2-e-キャッシュバッファリングレプリカ"} tabIndex={-1}>
{"\n                    Step 2-E: キャッシュ、バッファリング、レプリカ\n                "}
</h3>
{"\n                "}
<Diagram id="diag-17" label={"Step 2-E: キャッシュ、バッファリング、レプリカ"}/>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：flowchart LR\n    U[\"ユーザー\"] --> CF[\"CloudFront<br/>エッジキャッシュ\"]\n    CF --> ALB[\"ALB\"]\n    ALB --> APP[\"アプリ\"]\n    APP --> CACHE[\"ElastiCache<br/>アプリ側キャッシュ\"]\n    APP --> RP[\"RDS Proxy<br/>接続プール\"]\n    RP --> W[\"DB ライター\"]\n    RP --> RR[\"DB リードレプリカ\"]\n    APP --> Q[\"SQS または Kinesis<br/>バッファ\"]\n\n    classDef highlightFill fill:#dbe6ff,stroke:#3556d6,color:#13204a;\n    classDef warnFill fill:#ffe8c7,stroke:#a85f0a,color:#4a2a00;\n    class CF highlightFill\n    class CACHE warnFill"}>
{"\n                    "}
<table>
{"\n                        "}
<thead>
{"\n                            "}
<tr className={"header"}>
{"\n                                "}
<th scope="col">
{"パターン"}
</th>
{"\n                                "}
<th scope="col">
{"目的"}
</th>
{"\n                                "}
<th scope="col">
{"AWS サービス"}
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
<strong>
{"キャッシュ"}
</strong>
</td>
{"\n                                "}
<td>
{"同じ読み取りを速く、DB 負荷を減らす"}
</td>
{"\n                                "}
<td>
{"\n                                    CloudFront(エッジ)、ElastiCache(アプリ層)、DAX(DynamoDB\n                                    専用)、API Gateway キャッシュ\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
<strong>
{"バッファリング"}
</strong>
</td>
{"\n                                "}
<td>
{"急なスパイクを吸収し、バックエンドを一定の速度で処理"}
</td>
{"\n                                "}
<td>
{"SQS、Kinesis Data Streams / Firehose、Amazon MQ"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
<strong>
{"レプリカ"}
</strong>
</td>
{"\n                                "}
<td>
{"読み取りを分散"}
</td>
{"\n                                "}
<td>
{"\n                                    RDS リードレプリカ、Aurora\n                                    レプリカ(リーダーエンドポイント)、DynamoDB グローバルテーブル\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
<strong>
{"接続プール"}
</strong>
</td>
{"\n                                "}
<td>
{"接続数の急増から DB を守る(特に Lambda)"}
</td>
{"\n                                "}
<td>
{"RDS Proxy"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
<strong>
{"グローバル高速化"}
</strong>
</td>
{"\n                                "}
<td>
{"世界中のユーザーへの経路改善"}
</td>
{"\n                                "}
<td>
{"\n                                    CloudFront、Global Accelerator(エニーキャスト IP で AWS\n                                    のバックボーンへ誘導)、S3 Transfer Acceleration\n                                "}
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
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：Step 2-F: 弾力性とライトサイジング"}>
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
{"弾力性"}
</td>
{"\n                                "}
<td>
{"\n                                    Auto Scaling、Lambda、Fargate、DynamoDB オンデマンド、Aurora\n                                    Serverless など"}
<strong>
{"需要に応じて自動で伸縮"}
</strong>
{"する構成\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"ライトサイジング"}
</td>
{"\n                                "}
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
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"選定プロセス"}
</td>
{"\n                                "}
<td>
{"\n                                    ①要件(レイテンシー、スループット、整合性、データ量)→\n                                    ②アクセスパターン → ③候補サービス → ④負荷テストで検証 →\n                                    ⑤継続的に見直し\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"新しい世代・Graviton"}
</td>
{"\n                                "}
<td>
{"\n                                    世代が新しいインスタンスや Graviton は性能/価格が良いことが多い\n                                "}
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
<h3 id={"step-3-task-25-試験のコツ"} tabIndex={-1}>
{"Step 3: Task 2.5 試験のコツ"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：Step 3: Task 2.5 試験のコツ"}>
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
{"「読み取りが多い DB の負荷を軽減」"}
</td>
{"\n                                "}
<td>
{"ElastiCache、リードレプリカ、DAX(DynamoDB)"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"「DynamoDB をマイクロ秒で」"}
</td>
{"\n                                "}
<td>
{"DAX"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"「Lambda から DB 接続が枯渇」"}
</td>
{"\n                                "}
<td>
{"RDS Proxy"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"「世界中のユーザーへ静的コンテンツを高速配信」"}
</td>
{"\n                                "}
<td>
{"CloudFront"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"「固定 IP、TCP/UDP、高速フェイルオーバー」"}
</td>
{"\n                                "}
<td>
{"Global Accelerator"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"「一時的で超高速な I/O」"}
</td>
{"\n                                "}
<td>
{"インスタンスストア"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"「高い IOPS を DB で安定して」"}
</td>
{"\n                                "}
<td>
{"EBS io2 Block Express"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"「複数インスタンスで共有する POSIX ファイル」"}
</td>
{"\n                                "}
<td>
{"EFS"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"「HPC/機械学習の高スループットファイル」"}
</td>
{"\n                                "}
<td>
{"FSx for Lustre"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"「関係性をたどるクエリ」"}
</td>
{"\n                                "}
<td>
{"Neptune"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"「スパイクをならして処理」"}
</td>
{"\n                                "}
<td>
{"SQS、Kinesis"}
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
