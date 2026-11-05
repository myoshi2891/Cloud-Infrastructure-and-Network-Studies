import { Diagram } from '../Diagram';
/** 原本のtask43本文。 */
export default function Content() { return <>
<h2 id={"4-task-43-既存ワークロードの新しいアーキテクチャの決定"} tabIndex={-1}>
{"\n                    4. Task 4.3 既存ワークロードの新しいアーキテクチャの決定\n                "}
</h2>
{"\n                "}
<p>
{"\n                    移行先で "}
<strong>
{"何の部品を使うか"}
</strong>
{" を決める Task\n                    です。基本の考え方は「"}
<strong>
{"要件が許す範囲で、できるだけマネージドに寄せる"}
</strong>
{"」(運用負荷の削減)\n                    ですが、"}
<strong>
{"既存の制約 (OS 操作・ライセンス・互換性) があれば EC2\n                        や自己管理も正解"}
</strong>
{"になります。\n                "}
</p>
{"\n                "}
<h3 id={"41-コンピュートの選択"} tabIndex={-1}>
{"4.1 コンピュートの選択"}
</h3>
{"\n                "}
<Diagram id="diag-9" label={"4.1 コンピュートの選択"}/>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 25：4.1 コンピュートの選択"}>
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
{"向いているケース"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
<strong>
{"Amazon EC2"}
</strong>
</td>
<td>
{"\n                                    仮想サーバー。OS\n                                    を含め最大の自由度。専有ホストやライセンス持ち込みも可能\n                                "}
</td>
<td>
{"\n                                    Rehost、特殊な OS・ドライバ・ライセンス要件、既存の構成を保つ\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
<strong>
{"AWS Elastic Beanstalk"}
</strong>
</td>
<td>
{"\n                                    アプリのコードを置くだけで、プロビジョニング・LB・Auto\n                                    Scaling・監視を自動構成 (内部は EC2 等)\n                                "}
</td>
<td>
{"\n                                    Java、.NET、PHP、Node.js、Python、Ruby、Go、Docker の Web\n                                    アプリを "}
<strong>
{"コード変更を最小に"}
</strong>
{" Replatform\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
<strong>
{"Amazon ECS Express Mode"}
</strong>
</td>
<td>
{"\n                                    コンテナイメージから Web アプリ/API を簡単に公開 (ALB、Auto\n                                    Scaling などを自動構成)\n                                "}
</td>
<td>
{"\n                                    インフラ運用をほぼ持たず、コンテナ Web\n                                    サービスを素早く公開する新規デプロイ。"}
<strong>
{"AWS App Runner"}
</strong>
{"\n                                    は 2026 年 4 月 30\n                                    日に新規顧客の受付を終了しており、試験知識や既存顧客の文脈としてのみ扱う\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
<strong>
{"AWS Lambda"}
</strong>
</td>
<td>
{"\n                                    イベント駆動のサーバーレス。実行時間は最大 15 分、メモリは 128\n                                    MB〜10,240 MB\n                                "}
</td>
<td>
{"短時間の処理、イベント駆動、アイドル時コストゼロ"}
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
<ul>
{"\n                            "}
<li>
{"\n                                EC2 では\n                                "}
<strong>
{"Graviton などコスト効率の良いインスタンス"}
</strong>
{"や、実測に基づく "}
<strong>
{"ライトサイジング"}
</strong>
{"を検討する\n                                (Compute Optimizer)\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                Elastic Beanstalk は\n                                "}
<strong>
{"Blue/Green デプロイ"}
</strong>
{"で環境を入れ替えて安全に更新する\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                ライセンス条件 (Windows、SQL Server、Oracle など) は\n                                "}
<strong>
{"License Manager"}
</strong>
{" で管理する\n                            "}
</li>
{"\n                        "}
</ul>
{"\n                    "}
</div>
{"\n                "}
</div>
{"\n                "}
<h3 id={"42-コンテナホスティングの選択"} tabIndex={-1}>
{"4.2 コンテナホスティングの選択"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 26：4.2 コンテナホスティングの選択"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"サービス"}
</th>
<th scope="col">
{"説明"}
</th>
<th scope="col">
{"選ぶ理由"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
<strong>
{"Amazon ECS"}
</strong>
</td>
<td>
{"AWS ネイティブのコンテナオーケストレーション。シンプル"}
</td>
<td>
{"Kubernetes の知識がなく、AWS の機能と素直に統合したい"}
</td>
</tr>
<tr className={"even"}>
<td>
<strong>
{"Amazon EKS"}
</strong>
</td>
<td>
{"マネージド Kubernetes"}
</td>
<td>
{"\n                                    "}
<strong>
{"Kubernetes 標準を使いたい"}
</strong>
{"、既存の K8s\n                                    資産やマルチクラウドの移植性が必要\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
<strong>
{"AWS Fargate"}
</strong>
</td>
<td>
{"\n                                    ECS/EKS の "}
<strong>
{"サーバーレスな実行基盤"}
</strong>
{"。ノード (EC2)\n                                    の管理が不要\n                                "}
</td>
<td>
{"クラスターのサーバー運用をなくしたい"}
</td>
</tr>
<tr className={"even"}>
<td>
<strong>
{"Amazon ECR"}
</strong>
</td>
<td>
{"\n                                    コンテナイメージのレジストリ。脆弱性スキャンやレプリケーションに対応\n                                "}
</td>
<td>
{"イメージの安全な保管・配布"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"ECS Anywhere / EKS Anywhere"}
</td>
<td>
{"オンプレのサーバー上でも同じ管理方式でコンテナを動かす"}
</td>
<td>
{"一部をオンプレに残すハイブリッド"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<Diagram id="diag-10" label={"4.2 コンテナホスティングの選択"}/>
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
{"\n                                ノード管理をなくしたいなら "}
<strong>
{"Fargate"}
</strong>
{"。GPU\n                                や特殊なインスタンスが必要なら EC2 起動タイプ\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                タスク単位に "}
<strong>
{"IAM ロール"}
</strong>
{" (ECS のタスクロール、EKS の\n                                IRSA または Pod Identity) を付与し、最小権限にする\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                複数 AZ に分散配置し、"}
<strong>
{"ALB"}
</strong>
{" でヘルスチェックを行う\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                ECR で\n                                "}
<strong>
{"イメージスキャン"}
</strong>
{"を有効にし、脆弱なイメージの展開を防ぐ\n                            "}
</li>
{"\n                        "}
</ul>
{"\n                    "}
</div>
{"\n                "}
</div>
{"\n                "}
<h3 id={"43-ストレージの選択"} tabIndex={-1}>
{"4.3 ストレージの選択"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 27：4.3 ストレージの選択"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"サービス"}
</th>
<th scope="col">
{"種類"}
</th>
<th scope="col">
{"特徴"}
</th>
<th scope="col">
{"向いているケース"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
<strong>
{"Amazon EBS"}
</strong>
</td>
<td>
{"ブロック"}
</td>
<td>
{"\n                                    EC2 にアタッチするディスク。基本は 1 つの AZ\n                                    内。スナップショットで保護\n                                "}
</td>
<td>
{"OS ディスク、DB のデータ領域"}
</td>
</tr>
<tr className={"even"}>
<td>
<strong>
{"Amazon EFS"}
</strong>
</td>
<td>
{"ファイル (NFS)"}
</td>
<td>
{"\n                                    Linux 向け共有ファイルシステム。複数 AZ\n                                    から同時マウント。自動で拡張\n                                "}
</td>
<td>
{"\n                                    複数サーバーで共有する Linux\n                                    のコンテンツ、コンテナの共有ストレージ\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
<strong>
{"FSx for Windows File Server"}
</strong>
</td>
<td>
{"ファイル (SMB)"}
</td>
<td>
{"Windows 互換、AD 統合"}
</td>
<td>
{"Windows ファイルサーバーの移行"}
</td>
</tr>
<tr className={"even"}>
<td>
<strong>
{"FSx for Lustre"}
</strong>
</td>
<td>
{"高性能ファイル"}
</td>
<td>
{"HPC や機械学習向けの高スループット、S3 と連携"}
</td>
<td>
{"大規模計算"}
</td>
</tr>
<tr className={"odd"}>
<td>
<strong>
{"FSx for NetApp ONTAP"}
</strong>
</td>
<td>
{"マルチプロトコル"}
</td>
<td>
{"NFS、SMB、iSCSI。NetApp の機能や運用をそのままクラウドへ"}
</td>
<td>
{"オンプレの NetApp 資産の移行"}
</td>
</tr>
<tr className={"even"}>
<td>
<strong>
{"FSx for OpenZFS"}
</strong>
</td>
<td>
{"ファイル (NFS)"}
</td>
<td>
{"OpenZFS 互換、低遅延"}
</td>
<td>
{"ZFS ベースのファイルサーバー移行"}
</td>
</tr>
<tr className={"odd"}>
<td>
<strong>
{"Amazon S3"}
</strong>
</td>
<td>
{"オブジェクト"}
</td>
<td>
{"\n                                    ほぼ無制限で高耐久。ストレージクラスとライフサイクルで自動階層化\n                                "}
</td>
<td>
{"静的コンテンツ、バックアップ、データレイク、アーカイブ"}
</td>
</tr>
<tr className={"even"}>
<td>
<strong>
{"Storage Gateway (Volume Gateway)"}
</strong>
</td>
<td>
{"iSCSI ブロック (ハイブリッド)"}
</td>
<td>
{"\n                                    オンプレのアプリに iSCSI ボリュームを提供し、データを S3 経由で\n                                    AWS に保存 (EBS スナップショット化も可)\n                                "}
</td>
<td>
{"オンプレのアプリは残しつつ、バックアップや段階移行をしたい"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<Diagram id="diag-11" label={"4.3 ストレージの選択"}/>
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
{"\n                                S3 は\n                                "}
<strong>
{"ライフサイクルポリシーや Intelligent-Tiering"}
</strong>
{"でアクセス頻度に応じてコストを最適化する\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                EBS は "}
<strong>
{"gp3"}
</strong>
{" を基本に、ミッションクリティカルな高\n                                IOPS は io2 を検討、"}
<strong>
{"スナップショット (AWS Backup)"}
</strong>
{"\n                                で保護する\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                EFS は\n                                "}
<strong>
{"ストレージクラスとライフサイクル管理"}
</strong>
{"でアクセス頻度の低いファイルのコストを下げる\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                全サービスで "}
<strong>
{"KMS による保存時暗号化"}
</strong>
{"と\n                                "}
<strong>
{"バックアップ戦略"}
</strong>
{"を標準にする\n                            "}
</li>
{"\n                        "}
</ul>
{"\n                    "}
</div>
{"\n                "}
</div>
{"\n                "}
<h3 id={"44-データベースの選択"} tabIndex={-1}>
{"4.4 データベースの選択"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 28：4.4 データベースの選択"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"サービス"}
</th>
<th scope="col">
{"種類"}
</th>
<th scope="col">
{"特徴"}
</th>
<th scope="col">
{"向いているケース"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
<strong>
{"Amazon RDS"}
</strong>
</td>
<td>
{"リレーショナル (マネージド)"}
</td>
<td>
{"\n                                    MySQL、PostgreSQL、MariaDB、Oracle、SQL\n                                    Server、Db2。バックアップ、パッチ、Multi-AZ を自動化\n                                "}
</td>
<td>
{"\n                                    既存のリレーショナル DB を\n                                    "}
<strong>
{"Replatform"}
</strong>
{" で運用負荷を下げる\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
<strong>
{"Amazon Aurora"}
</strong>
</td>
<td>
{"リレーショナル (クラウドネイティブ)"}
</td>
<td>
{"\n                                    MySQL/PostgreSQL 互換。3 AZ に 6 コピー、最大 15\n                                    のリードレプリカ、Global Database\n                                "}
</td>
<td>
{"高い可用性・性能、スケールが必要な商用 DB の置き換え"}
</td>
</tr>
<tr className={"odd"}>
<td>
<strong>
{"Amazon DynamoDB"}
</strong>
</td>
<td>
{"NoSQL (キーバリュー/ドキュメント)"}
</td>
<td>
{"\n                                    1\n                                    桁ミリ秒、ほぼ無制限にスケール、オンデマンド課金、グローバルテーブル\n                                "}
</td>
<td>
{"大規模・高トラフィック、スキーマ柔軟、サーバーレス構成"}
</td>
</tr>
<tr className={"even"}>
<td>
<strong>
{"Amazon OpenSearch Service"}
</strong>
</td>
<td>
{"検索・ログ分析"}
</td>
<td>
{"全文検索、ログ分析、ダッシュボード"}
</td>
<td>
{"Elasticsearch の置き換え、検索機能"}
</td>
</tr>
<tr className={"odd"}>
<td>
<strong>
{"EC2 上の自己管理 DB"}
</strong>
</td>
<td>
{"任意"}
</td>
<td>
{"OS・DB の完全な制御"}
</td>
<td>
{"\n                                    "}
<strong>
{"マネージドで未対応の機能・バージョン・OS\n                                        アクセスが必須"}
</strong>
{"の場合のみ\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"Amazon RDS Custom"}
</td>
<td>
{"リレーショナル (OS アクセス可)"}
</td>
<td>
{"\n                                    OS やデータベース環境のカスタマイズが必要なレガシー DB 向け\n                                    (Oracle、SQL Server)\n                                "}
</td>
<td>
{"カスタマイズ必須だがマネージドの利点も欲しい"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<Diagram id="diag-12" label={"4.4 データベースの選択"}/>
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
{"Multi-AZ"}
</strong>
{"\n                                を標準にし、読み取り負荷はリードレプリカで分散する\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                RDS のライセンス込み (License Included) と BYOL を比較し、TCO\n                                を評価する\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                Oracle や SQL Server から\n                                "}
<strong>
{"オープンソース互換エンジン (Aurora など) へ"}
</strong>
{"移すと、ライセンス費用を大きく削減できる (SCT と DMS の組み合わせ)\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                接続情報は\n                                "}
<strong>
{"Secrets Manager"}
</strong>
{" で管理し、自動ローテーションする\n                            "}
</li>
{"\n                        "}
</ul>
{"\n                    "}
</div>
{"\n                "}
</div>
{"\n                "}
<h3 id={"45-task-43-のまとめ-試験の着眼点"} tabIndex={-1}>
{"4.5 Task 4.3 のまとめ (試験の着眼点)"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 29：4.5 Task 4.3 のまとめ (試験の着眼点)"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"問題文のキーワード"}
</th>
<th scope="col">
{"答えの方向性"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"「OS レベルの制御」「特殊なライセンス」"}
</td>
<td>
{"EC2 (必要なら Dedicated Host)"}
</td>
</tr>
<tr className={"even"}>
<td>
{"「コード変更を最小に Web アプリをマネージドで」"}
</td>
<td>
{"Elastic Beanstalk"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"「Kubernetes 必須」「移植性」"}
</td>
<td>
{"EKS"}
</td>
</tr>
<tr className={"even"}>
<td>
{"「K8s 不要でシンプル」「AWS ネイティブ」"}
</td>
<td>
{"ECS"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"「サーバー (ノード) 管理を避けたい」"}
</td>
<td>
{"Fargate"}
</td>
</tr>
<tr className={"even"}>
<td>
{"「Windows ファイルサーバー、AD 統合」"}
</td>
<td>
{"FSx for Windows File Server"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"「複数の Linux サーバーから共有」"}
</td>
<td>
{"EFS"}
</td>
</tr>
<tr className={"even"}>
<td>
{"「NetApp 資産と同じ運用、NFS と SMB 併用」"}
</td>
<td>
{"FSx for NetApp ONTAP"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"「オンプレのアプリに iSCSI ボリュームを提供」"}
</td>
<td>
{"Volume Gateway"}
</td>
</tr>
<tr className={"even"}>
<td>
{"「Oracle を安く・高性能に」"}
</td>
<td>
{"Aurora (SCT + DMS で異種移行)"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"「OS アクセスが必要な DB をマネージドに近づける」"}
</td>
<td>
{"RDS Custom"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<div className={"source-block"}>
{"\n                    "}
<div className={"source-head"}>
{"出典"}
</div>
{"\n                    "}
<ul className={"source-grid"}>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://d1.awsstatic.com/training-and-certification/docs-sa-pro/AWS-Certified-Solutions-Architect-Professional_Exam-Guide.pdf"}>
<span className={"num"}>
{"1"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"公式 Exam Guide (Task 4.3)"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://d1.awsstatic.com/training-and-certification/docs-sa-pro/AWS-Certified-Solutions-Architect-Professional_Exam-Guide.pdf"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/ec2/latest/instancetypes/instance-types.html"}>
<span className={"num"}>
{"2"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"EC2 インスタンスタイプ"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/ec2/latest/instancetypes/instance-types.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html"}>
<span className={"num"}>
{"3"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"Elastic Beanstalk"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/apprunner/latest/dg/what-is-apprunner.html"}>
<span className={"num"}>
{"4"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"App Runner"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/apprunner/latest/dg/what-is-apprunner.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html"}>
<span className={"num"}>
{"5"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"ECS"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html"}>
<span className={"num"}>
{"6"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"EKS"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html"}>
<span className={"num"}>
{"7"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"Fargate"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html"}>
<span className={"num"}>
{"8"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"ECR"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/ebs/latest/userguide/what-is-ebs.html"}>
<span className={"num"}>
{"9"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"EBS"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/ebs/latest/userguide/what-is-ebs.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html"}>
<span className={"num"}>
{"10"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"EFS"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/fsx/"}>
<span className={"num"}>
{"11"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"FSx"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/fsx/"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html"}>
<span className={"num"}>
{"12"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"S3"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html"}>
<span className={"num"}>
{"13"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"RDS"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html"}>
<span className={"num"}>
{"14"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"Aurora"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html"}>
<span className={"num"}>
{"15"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"DynamoDB"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/opensearch-service/latest/developerguide/what-is.html"}>
<span className={"num"}>
{"16"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"OpenSearch Service"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/opensearch-service/latest/developerguide/what-is.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                    "}
</ul>
{"\n                "}
</div>
{"\n                "}
<hr />
{"\n                "}
</>; }
