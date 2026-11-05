import { Diagram } from '../Diagram';
/** 原本のtask42本文。 */
export default function Content() { return <>
<h2 id={"3-task-42-既存ワークロードに最適な移行アプローチの決定"} tabIndex={-1}>
{"\n                    3. Task 4.2 既存ワークロードに最適な移行アプローチの決定\n                "}
</h2>
{"\n                "}
<p>
{"\n                    Task 4.2 は範囲が広いので、"}
<strong>
{"データ → サーバー → データベース → ネットワーク → ID → ガバナンス →\n                        セキュリティ"}
</strong>
{"の順に見ていきます。\n                "}
</p>
{"\n                "}
<h3 id={"31-データ移行-転送手段の選び方"} tabIndex={-1}>
{"3.1 データ移行: 転送手段の選び方"}
</h3>
{"\n                "}
<h4 id={"311-まず何日かかるかを計算する"} tabIndex={-1}>
{"3.1.1 まず「何日かかるか」を計算する"}
</h4>
{"\n                "}
<p>
{"\n                    転送時間の概算は次の式です。"}
<strong>
{"実効帯域は回線速度の 70% 程度"}
</strong>
{"で見積もるのが安全です。\n                "}
</p>
{"\n                "}
<div className={"code-block"}>
{"\n                    "}
<div className={"code-label"}>
{"Python"}
</div>
{"\n                    "}
<pre className="code code-block" tabIndex={0} role="group" aria-label="python コード例">
<div className="code-line">
{""}
<span className="hljs-keyword">
{"def"}
</span>
{" transfer_days(data_tb: "}
<span className="hljs-built_in">
{"float"}
</span>
{", link_mbps: "}
<span className="hljs-built_in">
{"float"}
</span>
{", efficiency: "}
<span className="hljs-built_in">
{"float"}
</span>
{" = "}
<span className="hljs-number">
{"0.7"}
</span>
{") -> "}
<span className="hljs-built_in">
{"float"}
</span>
{":"}
</div>
<div className="code-line">
{"    "}
<span className="hljs-string">
{"\"\""}
</span>
{""}
<span className="hljs-string">
{"\"データ量(TB)と回線速度(Mbps)から転送日数を概算する\""}
</span>
{""}
<span className="hljs-string">
{"\"\""}
</span>
{""}
</div>
<div className="code-line">
{"    bits = data_tb * "}
<span className="hljs-number">
{"8"}
</span>
{" * "}
<span className="hljs-number">
{"10"}
</span>
{"**"}
<span className="hljs-number">
{"12"}
</span>
{"            "}
<span className="hljs-comment">
{"# TB を bit に変換 (10 の 12 乗 = 1 TB)"}
</span>
{""}
</div>
<div className="code-line">
{"    seconds = bits / (link_mbps * "}
<span className="hljs-number">
{"10"}
</span>
{"**"}
<span className="hljs-number">
{"6"}
</span>
{" * efficiency)"}
</div>
<div className="code-line">
{"    "}
<span className="hljs-keyword">
{"return"}
</span>
{" seconds / "}
<span className="hljs-number">
{"86400"}
</span>
{"                 "}
<span className="hljs-comment">
{"# 秒を日に変換"}
</span>
{""}
</div>
<div className="code-line">
{""}
</div>
<div className="code-line">
{""}
<span className="hljs-built_in">
{"print"}
</span>
{"("}
<span className="hljs-built_in">
{"round"}
</span>
{"(transfer_days("}
<span className="hljs-number">
{"100"}
</span>
{", "}
<span className="hljs-number">
{"1000"}
</span>
{"), "}
<span className="hljs-number">
{"1"}
</span>
{"))  "}
<span className="hljs-comment">
{"# 100 TB を 1 Gbps で送ると約 13 日"}
</span>
{""}
</div>
<div className="code-line">
{""}
<span className="hljs-built_in">
{"print"}
</span>
{"("}
<span className="hljs-built_in">
{"round"}
</span>
{"(transfer_days("}
<span className="hljs-number">
{"100"}
</span>
{", "}
<span className="hljs-number">
{"100"}
</span>
{"), "}
<span className="hljs-number">
{"1"}
</span>
{"))   "}
<span className="hljs-comment">
{"# 100 TB を 100 Mbps で送ると約 132 日"}
</span>
{""}
</div>
</pre>
{"\n                "}
</div>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 12：3.1.1 まず「何日かかるか」を計算する"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"データ量"}
</th>
<th scope="col">
{"100 Mbps"}
</th>
<th scope="col">
{"1 Gbps"}
</th>
<th scope="col">
{"10 Gbps"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"1 TB"}
</td>
<td>
{"約 1.3 日"}
</td>
<td>
{"約 3 時間"}
</td>
<td>
{"約 20 分"}
</td>
</tr>
<tr className={"even"}>
<td>
{"10 TB"}
</td>
<td>
{"約 13 日"}
</td>
<td>
{"約 1.3 日"}
</td>
<td>
{"約 3 時間"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"100 TB"}
</td>
<td>
{"約 132 日"}
</td>
<td>
{"約 13 日"}
</td>
<td>
{"約 1.3 日"}
</td>
</tr>
<tr className={"even"}>
<td>
{"1 PB"}
</td>
<td>
{"約 3.6 年"}
</td>
<td>
{"約 132 日"}
</td>
<td>
{"約 13 日"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<p>
{"\n                    (実効帯域 70%\n                    で計算した概算値です。実環境では他の通信と共有するため、さらに遅くなることがあります)\n                "}
</p>
{"\n                "}
<p>
{"\n                    目安:\n                    "}
<strong>
{"ネットワークでの転送が 1 週間を大きく超えるなら Snow Family を検討"}
</strong>
{"します。\n                "}
</p>
{"\n                "}
<h4 id={"312-データ転送サービスの選択フロー"} tabIndex={-1}>
{"\n                    3.1.2 データ転送サービスの選択フロー\n                "}
</h4>
{"\n                "}
<Diagram id="diag-4" label={"3.1.2 データ転送サービスの選択フロー"}/>
{"\n                "}
<h4 id={"313-各サービスの詳細"} tabIndex={-1}>
{"3.1.3 各サービスの詳細"}
</h4>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 13：3.1.3 各サービスの詳細"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"サービス"}
</th>
<th scope="col">
{"一言でいうと"}
</th>
<th scope="col">
{"主な特徴"}
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
{"AWS DataSync"}
</strong>
</td>
<td>
{"大量ファイルの高速・自動転送"}
</td>
<td>
{"\n                                    エージェントでオンプレの NFS/SMB/HDFS から S3・EFS・FSx\n                                    へ。スケジュール実行、帯域制限、整合性検証、差分転送、メタデータ保持\n                                "}
</td>
<td>
{"定期的・継続的なファイル移行、NAS の移行"}
</td>
</tr>
<tr className={"even"}>
<td>
<strong>
{"AWS Transfer Family"}
</strong>
</td>
<td>
{"マネージドな FTP 系サーバー"}
</td>
<td>
{"\n                                    SFTP/FTPS/FTP/AS2 で S3 や EFS\n                                    に直接入出力。パートナー側の設定を変えずに移行可能\n                                "}
</td>
<td>
{"既存の取引先が FTP/SFTP でファイルを送ってくる"}
</td>
</tr>
<tr className={"odd"}>
<td>
<strong>
{"AWS Snow Family"}
</strong>
</td>
<td>
{"物理デバイスで運ぶ"}
</td>
<td>
{"\n                                    デバイスを配送してデータをコピー、AWS\n                                    に返送して取り込み。データは暗号化\n                                "}
</td>
<td>
{"回線が細い、量が膨大、ネットワークが不安定"}
</td>
</tr>
<tr className={"even"}>
<td>
<strong>
{"S3 Transfer Acceleration"}
</strong>
</td>
<td>
{"遠距離アップロード高速化"}
</td>
<td>
{"エッジロケーション経由で AWS のバックボーンを使って S3 へ"}
</td>
<td>
{"\n                                    世界中のクライアントから 1 つの S3\n                                    バケットへ大きなファイルを送る\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
<strong>
{"Storage Gateway"}
</strong>
</td>
<td>
{"ハイブリッドの出入口"}
</td>
<td>
{"\n                                    ファイル・ボリューム・テープの形でオンプレから AWS ストレージへ\n                                "}
</td>
<td>
{"段階的移行、バックアップ、クラウドを背後に置く構成"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<p>
<strong>
{"DataSync の使い方 (例)"}
</strong>
</p>
{"\n                "}
<div className={"code-block"}>
{"\n                    "}
<div className={"code-label"}>
{"Bash"}
</div>
{"\n                    "}
<pre className="code code-block" tabIndex={0} role="group" aria-label="bash コード例">
<div className="code-line">
{""}
<span className="hljs-comment">
{"# 毎日 2 時刻に、検証付きで帯域を制限して転送するタスクを作成する例"}
</span>
{""}
</div>
<div className="code-line">
{""}
<span className="hljs-built_in">
{"aws"}
</span>
{" datasync create-task \\"}
</div>
<div className="code-line">
{"  "}
<span className="hljs-attr">
{"--source-location-arn"}
</span>
{" arn:"}
<span className="hljs-built_in">
{"aws"}
</span>
{":datasync:ap-northeast-1:111122223333:location/loc-xxxxxxxx \\"}
</div>
<div className="code-line">
{"  "}
<span className="hljs-attr">
{"--destination-location-arn"}
</span>
{" arn:"}
<span className="hljs-built_in">
{"aws"}
</span>
{":datasync:ap-northeast-1:111122223333:location/loc-yyyyyyyy \\"}
</div>
<div className="code-line">
{"  "}
<span className="hljs-attr">
{"--name"}
</span>
{" nas-to-s3-daily \\"}
</div>
<div className="code-line">
{"  "}
<span className="hljs-attr">
{"--options"}
</span>
{" VerifyMode=ONLY_FILES_TRANSFERRED,BytesPerSecond=125000000 \\"}
</div>
<div className="code-line">
{"  "}
<span className="hljs-attr">
{"--schedule"}
</span>
{" ScheduleExpression=\"cron(0 2 * * ? *)\""}
</div>
</pre>
{"\n                "}
</div>
{"\n                "}
<p>
<strong>
{"S3 Transfer Acceleration の有効化 (例)"}
</strong>
</p>
{"\n                "}
<div className={"code-block"}>
{"\n                    "}
<div className={"code-label"}>
{"Bash"}
</div>
{"\n                    "}
<pre className="code code-block" tabIndex={0} role="group" aria-label="bash コード例">
<div className="code-line">
{""}
<span className="hljs-comment">
{"# バケットで有効化"}
</span>
{""}
</div>
<div className="code-line">
{""}
<span className="hljs-built_in">
{"aws"}
</span>
{" s3api put-bucket-accelerate-configuration \\"}
</div>
<div className="code-line">
{"  "}
<span className="hljs-attr">
{"--bucket"}
</span>
{" my-migration-bucket \\"}
</div>
<div className="code-line">
{"  "}
<span className="hljs-attr">
{"--accelerate-configuration"}
</span>
{" Status=Enabled"}
</div>
<div className="code-line">
{""}
</div>
<div className="code-line">
{""}
<span className="hljs-comment">
{"# CLI がアクセラレーションエンドポイントを使うよう設定"}
</span>
{""}
</div>
<div className="code-line">
{""}
<span className="hljs-built_in">
{"aws"}
</span>
{" configure set default.s3.use_accelerate_endpoint true"}
</div>
</pre>
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
{"ベストプラクティス (データ移行)"}
</div>
{"\n                        "}
<ul>
{"\n                            "}
<li>
{"\n                                "}
<strong>
{"初回は一括 (Snow または DataSync)、以降は差分同期"}
</strong>
{"で、カットオーバー直前の最終差分を小さくする\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                DataSync は\n                                "}
<strong>
{"VPC エンドポイント (PrivateLink) 経由"}
</strong>
{"にすると、インターネットを通さずに転送できる\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                転送中は "}
<strong>
{"TLS で暗号化"}
</strong>
{"、保存時は\n                                "}
<strong>
{"KMS"}
</strong>
{" で暗号化する。Snow Family\n                                はデバイス上のデータが暗号化されている\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                "}
<strong>
{"整合性検証 (検証モード)"}
</strong>
{"\n                                を有効にして、移行後のデータ欠損を防ぐ\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                回線を業務と共用するなら\n                                "}
<strong>
{"帯域制限"}
</strong>
{"をかけて業務影響を避ける\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                Snow Family は注文から到着・返送・取り込みまでの\n                                "}
<strong>
{"リードタイム (数日〜数週間)"}
</strong>
{" を計画に含める\n                                (提供デバイスの種類や状況は公式ドキュメントで確認)\n                            "}
</li>
{"\n                        "}
</ul>
{"\n                    "}
</div>
{"\n                "}
</div>
{"\n                "}
<h3 id={"32-サーバー-アプリケーション-移行-aws-application-migration-service-mgn"} tabIndex={-1}>
{"\n                    3.2 サーバー (アプリケーション) 移行: AWS Application Migration Service (MGN)\n                "}
</h3>
{"\n                "}
<p>
{"\n                    "}
<strong>
{"MGN"}
</strong>
{" は Lift and Shift (Rehost)\n                    の標準サービスです。物理サーバー・VM・他クラウドのサーバーを、ほぼそのまま EC2\n                    に移します。\n                "}
</p>
{"\n                "}
<h4 id={"321-仕組み"} tabIndex={-1}>
{"3.2.1 仕組み"}
</h4>
{"\n                "}
<Diagram id="diag-5" label={"3.2.1 仕組み"}/>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 14：3.2.1 仕組み"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"ステップ"}
</th>
<th scope="col">
{"内容"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"1 初期化と設定"}
</td>
<td>
{"\n                                    MGN\n                                    の初期化、レプリケーション設定テンプレート、起動テンプレートを設定\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"2 エージェント導入"}
</td>
<td>
{"ソースサーバーに AWS Replication Agent をインストール"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"3 初期同期"}
</td>
<td>
{"ディスク全体をステージングへ複製 (しばらく時間がかかる)"}
</td>
</tr>
<tr className={"even"}>
<td>
{"4 継続レプリケーション"}
</td>
<td>
{"以降は変更分を継続的に複製。ソースの稼働は止めない"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"5 テスト"}
</td>
<td>
{"本番を止めずにテストインスタンスを起動して動作確認"}
</td>
</tr>
<tr className={"even"}>
<td>
{"6 カットオーバー"}
</td>
<td>
{"\n                                    計画した時間にカットオーバーインスタンスを起動し、DNS\n                                    などを切り替え\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"7 ファイナライズ"}
</td>
<td>
{"切り替え完了後、レプリケーションを止めてリソースを片付ける"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<p>
<strong>
{"ポイント"}
</strong>
</p>
{"\n                "}
<ul>
{"\n                    "}
<li>
{"\n                        "}
<strong>
{"ダウンタイムは「カットオーバーの切替時間」だけ"}
</strong>
{"になり、大幅に短縮できる\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        エージェントレスの方式 (vCenter 連携のスナップショットベース)\n                        もあるが、"}
<strong>
{"継続的なブロックレベルレプリケーションが基本方式"}
</strong>
{"\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        起動後の設定変更は "}
<strong>
{"ポストローンチアクション"}
</strong>
{" (SSM を利用)\n                        で自動化できる\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        ステージングエリアは "}
<strong>
{"移行専用のサブネット"}
</strong>
{"に置き、Direct\n                        Connect / VPN / PrivateLink\n                        を使って"}
<strong>
{"閉域で複製"}
</strong>
{"することもできる\n                    "}
</li>
{"\n                "}
</ul>
{"\n                "}
<p>
<strong>
{"エージェント導入 (例)"}
</strong>
</p>
{"\n                "}
<div className={"code-block"}>
{"\n                    "}
<div className={"code-label"}>
{"Bash"}
</div>
{"\n                    "}
<pre className="code code-block" tabIndex={0} role="group" aria-label="bash コード例">
<div className="code-line">
{""}
<span className="hljs-comment">
{"# リージョン固有のインストーラーを取得 (リージョンは環境に合わせて変更)"}
</span>
{""}
</div>
<div className="code-line">
{""}
<span className="hljs-built_in">
{"wget"}
</span>
{" -O ./"}
<span className="hljs-built_in">
{"aws"}
</span>
{"-replication-installer-init \\"}
</div>
<div className="code-line">
{"  https://"}
<span className="hljs-built_in">
{"aws"}
</span>
{"-application-migration-service-ap-northeast-1.s3.ap-northeast-1.amazonaws.com/latest/linux/"}
<span className="hljs-built_in">
{"aws"}
</span>
{"-replication-installer-init"}
</div>
<div className="code-line">
{""}
</div>
<div className="code-line">
{""}
<span className="hljs-comment">
{"# 権限は AWSApplicationMigrationAgentInstallationPolicy を持つ最小権限の認証情報を使う"}
</span>
{""}
</div>
<div className="code-line">
{"sudo bash "}
<span className="hljs-built_in">
{"aws"}
</span>
{"-replication-installer-init "}
<span className="hljs-attr">
{"--region"}
</span>
{" ap-northeast-1"}
</div>
</pre>
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
{"ベストプラクティス (MGN)"}
</div>
{"\n                        "}
<ul>
{"\n                            "}
<li>
{"\n                                エージェント用の IAM は\n                                "}
<strong>
<code>
{"AWSApplicationMigrationAgentInstallationPolicy"}
</code>
{"\n                                    に絞り、一時認証情報を使う"}
</strong>
{"\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                "}
<strong>
{"テスト起動を複数回"}
</strong>
{"行い、カットオーバーのリハーサルを必ずする\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                起動テンプレートで\n                                "}
<strong>
{"適切なインスタンスタイプ"}
</strong>
{" (ライトサイジング済み)\n                                を指定する\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                移行後は不要になったエージェントとステージング資源を\n                                "}
<strong>
{"ファイナライズで確実に削除"}
</strong>
{"する\n                            "}
</li>
{"\n                        "}
</ul>
{"\n                    "}
</div>
{"\n                "}
</div>
{"\n                "}
<h4 id={"322-mgn-以外のアプリ移行の選択肢"} tabIndex={-1}>
{"3.2.2 MGN 以外のアプリ移行の選択肢"}
</h4>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 15：3.2.2 MGN 以外のアプリ移行の選択肢"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"要件"}
</th>
<th scope="col">
{"選ぶもの"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"サーバーをそのまま EC2 へ (Rehost)"}
</td>
<td>
<strong>
{"Application Migration Service (MGN)"}
</strong>
</td>
</tr>
<tr className={"even"}>
<td>
{"オンプレ・他クラウドの災害対策"}
</td>
<td>
{"\n                                    "}
<strong>
{"Elastic Disaster Recovery"}
</strong>
{" (MGN\n                                    と同じレプリケーション技術)\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"コンテナ化して移したい"}
</td>
<td>
{"ECS / EKS / App Runner へ再構築 (Replatform / Refactor)"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Web アプリを少しの変更でマネージドに"}
</td>
<td>
<strong>
{"Elastic Beanstalk"}
</strong>
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"33-データベース移行-aws-dms-と-aws-sct"} tabIndex={-1}>
{"\n                    3.3 データベース移行: AWS DMS と AWS SCT\n                "}
</h3>
{"\n                "}
<h4 id={"331-同種移行と異種移行を見分ける"} tabIndex={-1}>
{"3.3.1 同種移行と異種移行を見分ける"}
</h4>
{"\n                "}
<Diagram id="diag-6" label={"3.3.1 同種移行と異種移行を見分ける"}/>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 16：3.3.1 同種移行と異種移行を見分ける"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"種別"}
</th>
<th scope="col">
{"例"}
</th>
<th scope="col">
{"使うもの"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"同種"}
</td>
<td>
{"MySQL から Aurora MySQL, PostgreSQL から RDS PostgreSQL"}
</td>
<td>
{"DMS (または mysqldump、pg_dump、ネイティブレプリケーション)"}
</td>
</tr>
<tr className={"even"}>
<td>
{"異種"}
</td>
<td>
{"Oracle から Aurora PostgreSQL, SQL Server から Aurora MySQL"}
</td>
<td>
{"\n                                    "}
<strong>
{"SCT でスキーマと SQL コードを変換 → DMS\n                                        でデータ移行"}
</strong>
{"\n                                "}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h4 id={"332-dms-の構成要素"} tabIndex={-1}>
{"3.3.2 DMS の構成要素"}
</h4>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 17：3.3.2 DMS の構成要素"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"要素"}
</th>
<th scope="col">
{"説明"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"レプリケーションインスタンス (またはサーバーレス)"}
</td>
<td>
{"実際にデータを読み書きする計算資源"}
</td>
</tr>
<tr className={"even"}>
<td>
{"ソースエンドポイント / ターゲットエンドポイント"}
</td>
<td>
{"接続先の情報"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"レプリケーションタスク"}
</td>
<td>
{"何を、どの方法で移すかの定義"}
</td>
</tr>
<tr className={"even"}>
<td>
{"テーブルマッピング"}
</td>
<td>
{"対象スキーマ・テーブルの選択やルール変換"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 18：3.3.2 DMS の構成要素"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"タスクの種類"}
</th>
<th scope="col">
{"内容"}
</th>
<th scope="col">
{"向いている場面"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"Full load"}
</td>
<td>
{"既存データを一度に全コピー"}
</td>
<td>
{"ダウンタイムを許容できる"}
</td>
</tr>
<tr className={"even"}>
<td>
{"CDC のみ"}
</td>
<td>
{"変更分だけ継続コピー"}
</td>
<td>
{"初期データは別手段で移した後"}
</td>
</tr>
<tr className={"odd"}>
<td>
<strong>
{"Full load + CDC"}
</strong>
</td>
<td>
{"全コピー後、変更を継続反映"}
</td>
<td>
<strong>
{"ダウンタイムを最小にしたい (最頻出)"}
</strong>
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<p>
<strong>
{"テーブルマッピングの例 (HR スキーマを全件対象にする)"}
</strong>
</p>
{"\n                "}
<div className={"code-block"}>
{"\n                    "}
<div className={"code-label"}>
{"JSON"}
</div>
{"\n                    "}
<pre className="code code-block" tabIndex={0} role="group" aria-label="json コード例">
<div className="code-line">
{"{"}
</div>
<div className="code-line">
{"  "}
<span className="hljs-attr">
{"\"rules\""}
</span>
{": ["}
</div>
<div className="code-line">
{"    {"}
</div>
<div className="code-line">
{"      "}
<span className="hljs-attr">
{"\"rule-type\""}
</span>
{": "}
<span className="hljs-string">
{"\"selection\""}
</span>
{","}
</div>
<div className="code-line">
{"      "}
<span className="hljs-attr">
{"\"rule-id\""}
</span>
{": "}
<span className="hljs-string">
{"\"1\""}
</span>
{","}
</div>
<div className="code-line">
{"      "}
<span className="hljs-attr">
{"\"rule-name\""}
</span>
{": "}
<span className="hljs-string">
{"\"include-hr-schema\""}
</span>
{","}
</div>
<div className="code-line">
{"      "}
<span className="hljs-attr">
{"\"object-locator\""}
</span>
{": {"}
</div>
<div className="code-line">
{"        "}
<span className="hljs-attr">
{"\"schema-name\""}
</span>
{": "}
<span className="hljs-string">
{"\"HR\""}
</span>
{","}
</div>
<div className="code-line">
{"        "}
<span className="hljs-attr">
{"\"table-name\""}
</span>
{": "}
<span className="hljs-string">
{"\"%\""}
</span>
{""}
</div>
<div className="code-line">
{"      },"}
</div>
<div className="code-line">
{"      "}
<span className="hljs-attr">
{"\"rule-action\""}
</span>
{": "}
<span className="hljs-string">
{"\"include\""}
</span>
{""}
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
</div>
{"\n                "}
<h4 id={"333-aws-sct-schema-conversion-tool"} tabIndex={-1}>
{"\n                    3.3.3 AWS SCT (Schema Conversion Tool)\n                "}
</h4>
{"\n                "}
<ul>
{"\n                    "}
<li>
{"\n                        異種 DB 間で、"}
<strong>
{"スキーマ、ビュー、ストアドプロシージャ、アプリケーション内の\n                            SQL"}
</strong>
{"\n                        を変換する\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<strong>
{"評価レポート"}
</strong>
{"で自動変換できる割合と、手作業が必要な項目\n                        (アクションアイテム) を事前に把握できる\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        自動変換できない部分は手動修正が必要。ここが異種移行の工数の大部分になる\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        大規模なデータウェアハウスの移行では、SCT のデータ抽出エージェントと\n                        Snowball Edge を組み合わせる方法もある\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        最近は DMS コンソール内にも\n                        "}
<strong>
{"DMS Schema Conversion"}
</strong>
{" があるが、Exam Guide に載っているのは\n                        SCT なので、役割を押さえておく\n                    "}
</li>
{"\n                "}
</ul>
{"\n                "}
<div className={"practice-label"}>
{"ベストプラクティス (DB 移行)"}
</div>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 19：3.3.3 AWS SCT (Schema Conversion Tool)"}>
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
{"事前評価"}
</td>
<td>
{"SCT の評価レポートと DMS の事前評価でリスクを洗い出す"}
</td>
</tr>
<tr className={"even"}>
<td>
{"ダウンタイム最小化"}
</td>
<td>
{"\n                                    Full load + CDC を使い、同期が追いついた時点でカットオーバー\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"可用性"}
</td>
<td>
{"\n                                    レプリケーションインスタンスを\n                                    "}
<strong>
{"Multi-AZ"}
</strong>
{" にして移行中の障害に備える\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"検証"}
</td>
<td>
{"\n                                    "}
<strong>
{"DMS データ検証"}
</strong>
{"を有効にして、ソースとターゲットの一致を確認\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"CDC の前提設定"}
</td>
<td>
{"\n                                    ソース側でログ設定が必要 (例 MySQL は binlog を ROW\n                                    形式、PostgreSQL は論理レプリケーション、Oracle は補足ロギング)\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"LOB の扱い"}
</td>
<td>
{"大きな LOB は制限付きモードなどで性能とのバランスを調整する"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"接続"}
</td>
<td>
{"Direct Connect や VPN の閉域経路で接続し、TLS を使用"}
</td>
</tr>
<tr className={"even"}>
<td>
{"ターゲット準備"}
</td>
<td>
{"\n                                    大量ロード前に、ターゲットのインデックスや外部キーを一時的に無効化する検討\n                                "}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"34-ネットワークと-dns-移行を支える通信路"} tabIndex={-1}>
{"\n                    3.4 ネットワークと DNS: 移行を支える通信路\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 20：3.4 ネットワークと DNS: 移行を支える通信路"}>
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
{"移行での使いどころ"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
<strong>
{"AWS Direct Connect"}
</strong>
</td>
<td>
{"\n                                    専用線。安定した帯域と低遅延。既定では暗号化されない (MACsec や\n                                    VPN 併用で暗号化)\n                                "}
</td>
<td>
{"大量データの継続転送、長期のハイブリッド運用"}
</td>
</tr>
<tr className={"even"}>
<td>
<strong>
{"Site-to-Site VPN"}
</strong>
</td>
<td>
{"\n                                    インターネット越しの IPsec。接続ごとに 2\n                                    本のトンネルで冗長化。すぐ開通できる\n                                "}
</td>
<td>
{"\n                                    立ち上げ急ぎ、Direct Connect 開通までの暫定、バックアップ回線\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
<strong>
{"Direct Connect + VPN"}
</strong>
</td>
<td>
{"専用線の障害時に VPN へフェイルオーバー"}
</td>
<td>
{"高可用性の接続"}
</td>
</tr>
<tr className={"even"}>
<td>
<strong>
{"Route 53"}
</strong>
</td>
<td>
{"DNS。重み付けルーティングで段階的に切替"}
</td>
<td>
{"カットオーバー、Blue/Green 的な移行"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<Diagram id="diag-7" label={"3.4 ネットワークと DNS: 移行を支える通信路"}/>
{"\n                "}
<p>
<strong>
{"Route 53 を使った段階的カットオーバー (重み付けルーティング)"}
</strong>
</p>
{"\n                "}
<div className={"code-block"}>
{"\n                    "}
<div className={"code-label"}>
{"JSON"}
</div>
{"\n                    "}
<pre className="code code-block" tabIndex={0} role="group" aria-label="json コード例">
<div className="code-line">
{"{"}
</div>
<div className="code-line">
{"  "}
<span className="hljs-attr">
{"\"Comment\""}
</span>
{": "}
<span className="hljs-string">
{"\"新環境へ10%だけ振り向ける\""}
</span>
{","}
</div>
<div className="code-line">
{"  "}
<span className="hljs-attr">
{"\"Changes\""}
</span>
{": ["}
</div>
<div className="code-line">
{"    {"}
</div>
<div className="code-line">
{"      "}
<span className="hljs-attr">
{"\"Action\""}
</span>
{": "}
<span className="hljs-string">
{"\"UPSERT\""}
</span>
{","}
</div>
<div className="code-line">
{"      "}
<span className="hljs-attr">
{"\"ResourceRecordSet\""}
</span>
{": {"}
</div>
<div className="code-line">
{"        "}
<span className="hljs-attr">
{"\"Name\""}
</span>
{": "}
<span className="hljs-string">
{"\"app.example.com\""}
</span>
{","}
</div>
<div className="code-line">
{"        "}
<span className="hljs-attr">
{"\"Type\""}
</span>
{": "}
<span className="hljs-string">
{"\"CNAME\""}
</span>
{","}
</div>
<div className="code-line">
{"        "}
<span className="hljs-attr">
{"\"SetIdentifier\""}
</span>
{": "}
<span className="hljs-string">
{"\"onprem\""}
</span>
{","}
</div>
<div className="code-line">
{"        "}
<span className="hljs-attr">
{"\"Weight\""}
</span>
{": "}
<span className="hljs-number">
{"90"}
</span>
{","}
</div>
<div className="code-line">
{"        "}
<span className="hljs-attr">
{"\"TTL\""}
</span>
{": "}
<span className="hljs-number">
{"60"}
</span>
{","}
</div>
<div className="code-line">
{"        "}
<span className="hljs-attr">
{"\"ResourceRecords\""}
</span>
{": [{ "}
<span className="hljs-attr">
{"\"Value\""}
</span>
{": "}
<span className="hljs-string">
{"\"app.onprem.example.com\""}
</span>
{" }]"}
</div>
<div className="code-line">
{"      }"}
</div>
<div className="code-line">
{"    },"}
</div>
<div className="code-line">
{"    {"}
</div>
<div className="code-line">
{"      "}
<span className="hljs-attr">
{"\"Action\""}
</span>
{": "}
<span className="hljs-string">
{"\"UPSERT\""}
</span>
{","}
</div>
<div className="code-line">
{"      "}
<span className="hljs-attr">
{"\"ResourceRecordSet\""}
</span>
{": {"}
</div>
<div className="code-line">
{"        "}
<span className="hljs-attr">
{"\"Name\""}
</span>
{": "}
<span className="hljs-string">
{"\"app.example.com\""}
</span>
{","}
</div>
<div className="code-line">
{"        "}
<span className="hljs-attr">
{"\"Type\""}
</span>
{": "}
<span className="hljs-string">
{"\"CNAME\""}
</span>
{","}
</div>
<div className="code-line">
{"        "}
<span className="hljs-attr">
{"\"SetIdentifier\""}
</span>
{": "}
<span className="hljs-string">
{"\"aws\""}
</span>
{","}
</div>
<div className="code-line">
{"        "}
<span className="hljs-attr">
{"\"Weight\""}
</span>
{": "}
<span className="hljs-number">
{"10"}
</span>
{","}
</div>
<div className="code-line">
{"        "}
<span className="hljs-attr">
{"\"TTL\""}
</span>
{": "}
<span className="hljs-number">
{"60"}
</span>
{","}
</div>
<div className="code-line">
{"        "}
<span className="hljs-attr">
{"\"ResourceRecords\""}
</span>
{": [{ "}
<span className="hljs-attr">
{"\"Value\""}
</span>
{": "}
<span className="hljs-string">
{"\"app.aws.example.com\""}
</span>
{" }]"}
</div>
<div className="code-line">
{"      }"}
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
{"ベストプラクティス (ネットワークと DNS)"}
</div>
{"\n                        "}
<ul>
{"\n                            "}
<li>
{"\n                                カットオーバーの "}
<strong>
{"事前に TTL を短く"}
</strong>
{" (例 60 秒)\n                                しておき、切り戻しを素早くできるようにする\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                重み付けで\n                                "}
<strong>
{"少しずつ新環境へ寄せ (例 10% → 50% → 100%)"}
</strong>
{"、問題があれば重みを戻す\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                Direct Connect は\n                                "}
<strong>
{"開通に数週間以上かかり得る"}
</strong>
{"ので、早めに手配しつつ暫定で VPN を使う\n                            "}
</li>
{"\n                            "}
<li>
{"重要な接続は "}
<strong>
{"異なるロケーションで冗長化"}
</strong>
{"する"}
</li>
{"\n                        "}
</ul>
{"\n                    "}
</div>
{"\n                "}
</div>
{"\n                "}
<h3 id={"35-id-サービス-移行後も同じ-id-でログインできるように"} tabIndex={-1}>
{"\n                    3.5 ID サービス: 移行後も同じ ID でログインできるように\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 21：3.5 ID サービス: 移行後も同じ ID でログインできるように"}>
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
{"向いているケース"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
<strong>
{"AWS IAM Identity Center"}
</strong>
</td>
<td>
{"\n                                    複数アカウントと業務アプリへのシングルサインオン。外部 IdP (SAML\n                                    と SCIM) や Active Directory と連携\n                                "}
</td>
<td>
{"社員の AWS アカウントへのアクセス管理"}
</td>
</tr>
<tr className={"even"}>
<td>
<strong>
{"AWS Managed Microsoft AD"}
</strong>
</td>
<td>
{"\n                                    AWS 上のマネージドな実 Microsoft AD。オンプレ AD\n                                    と信頼関係を設定できる\n                                "}
</td>
<td>
{"\n                                    AD に依存するアプリ、RDS for SQL Server の Windows 認証、AD\n                                    対応ワークロードの移行\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
<strong>
{"AD Connector"}
</strong>
</td>
<td>
{"\n                                    オンプレ AD への認証要求を中継するプロキシ。AWS\n                                    側にディレクトリを持たない\n                                "}
</td>
<td>
{"既存 AD を使い続けたい、シンプルな連携"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Simple AD"}
</td>
<td>
{"Samba 互換の小規模ディレクトリ (提供状況は公式で要確認)"}
</td>
<td>
{"小規模・基本機能のみ"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<Diagram id="diag-8" label={"3.5 ID サービス: 移行後も同じ ID でログインできるように"}/>
{"\n                "}
<h3 id={"36-ガバナンス-移行の土台となるマルチアカウント環境"} tabIndex={-1}>
{"\n                    3.6 ガバナンス: 移行の土台となるマルチアカウント環境\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 22：3.6 ガバナンス: 移行の土台となるマルチアカウント環境"}>
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
<strong>
{"AWS Organizations"}
</strong>
</td>
<td>
{"\n                                    複数アカウントの一元管理、一括請求、"}
<strong>
{"SCP (サービスコントロールポリシー)"}
</strong>
{"\n                                    による権限の上限設定\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
<strong>
{"AWS Control Tower"}
</strong>
</td>
<td>
{"\n                                    ベストプラクティスに沿ったランディングゾーンを自動構築。ガードレール\n                                    (予防は SCP、検出は Config) と Account Factory を提供\n                                "}
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
{"\n                                "}
<strong>
{"移行を始める前にランディングゾーン\n                                    (アカウント構成、ネットワーク、ログ、セキュリティ)\n                                    を整える"}
</strong>
{"\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                移行元の部門や環境 (本番、検証) に合わせて\n                                "}
<strong>
{"アカウントを分割"}
</strong>
{"し、爆発半径を小さくする\n                            "}
</li>
{"\n                            "}
<li>
{"SCP でリージョン制限などの予防ガードレールをかける"}
</li>
{"\n                        "}
</ul>
{"\n                    "}
</div>
{"\n                "}
</div>
{"\n                "}
<p>
{"\n                    "}
<strong>
{"SCP の例 (許可リージョン以外を拒否。グローバルサービスは除外)"}
</strong>
{"\n                "}
</p>
{"\n                "}
<div className={"code-block"}>
{"\n                    "}
<div className={"code-label"}>
{"JSON"}
</div>
{"\n                    "}
<pre className="code code-block" tabIndex={0} role="group" aria-label="json コード例">
<div className="code-line">
{"{"}
</div>
<div className="code-line">
{"  "}
<span className="hljs-attr">
{"\"Version\""}
</span>
{": "}
<span className="hljs-string">
{"\"2012-10-17\""}
</span>
{","}
</div>
<div className="code-line">
{"  "}
<span className="hljs-attr">
{"\"Statement\""}
</span>
{": ["}
</div>
<div className="code-line">
{"    {"}
</div>
<div className="code-line">
{"      "}
<span className="hljs-attr">
{"\"Sid\""}
</span>
{": "}
<span className="hljs-string">
{"\"DenyOutsideAllowedRegions\""}
</span>
{","}
</div>
<div className="code-line">
{"      "}
<span className="hljs-attr">
{"\"Effect\""}
</span>
{": "}
<span className="hljs-string">
{"\"Deny\""}
</span>
{","}
</div>
<div className="code-line">
{"      "}
<span className="hljs-attr">
{"\"NotAction\""}
</span>
{": ["}
<span className="hljs-string">
{"\"iam:*\""}
</span>
{", "}
<span className="hljs-string">
{"\"organizations:*\""}
</span>
{", "}
<span className="hljs-string">
{"\"route53:*\""}
</span>
{", "}
<span className="hljs-string">
{"\"cloudfront:*\""}
</span>
{", "}
<span className="hljs-string">
{"\"support:*\""}
</span>
{", "}
<span className="hljs-string">
{"\"budgets:*\""}
</span>
{"],"}
</div>
<div className="code-line">
{"      "}
<span className="hljs-attr">
{"\"Resource\""}
</span>
{": "}
<span className="hljs-string">
{"\"*\""}
</span>
{","}
</div>
<div className="code-line">
{"      "}
<span className="hljs-attr">
{"\"Condition\""}
</span>
{": {"}
</div>
<div className="code-line">
{"        "}
<span className="hljs-attr">
{"\"StringNotEquals\""}
</span>
{": {"}
</div>
<div className="code-line">
{"          "}
<span className="hljs-attr">
{"\"aws:RequestedRegion\""}
</span>
{": ["}
<span className="hljs-string">
{"\"ap-northeast-1\""}
</span>
{", "}
<span className="hljs-string">
{"\"ap-northeast-3\""}
</span>
{"]"}
</div>
<div className="code-line">
{"        }"}
</div>
<div className="code-line">
{"      }"}
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
</div>
{"\n                "}
<h3 id={"37-移行ツールのセキュリティ適用"} tabIndex={-1}>
{"3.7 移行ツールのセキュリティ適用"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 23：3.7 移行ツールのセキュリティ適用"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"観点"}
</th>
<th scope="col">
{"実践"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"認証・認可"}
</td>
<td>
{"\n                                    移行専用の IAM ロールを作り\n                                    "}
<strong>
{"最小権限"}
</strong>
{"にする。長期アクセスキーを避け一時認証情報を使う\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"通信の暗号化"}
</td>
<td>
{"\n                                    転送中は TLS、閉域化は Direct Connect、VPN、"}
<strong>
{"VPC エンドポイント (PrivateLink)"}
</strong>
{"\n                                    を使う\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"保存時の暗号化"}
</td>
<td>
{"\n                                    S3、EBS、RDS を "}
<strong>
{"KMS"}
</strong>
{" で暗号化。DMS\n                                    のターゲットも暗号化設定を有効にする\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"監査"}
</td>
<td>
{"\n                                    "}
<strong>
{"CloudTrail"}
</strong>
{" で API 操作を記録、Config\n                                    で構成変更を記録\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"ネットワーク"}
</td>
<td>
{"\n                                    ステージングサブネットにセキュリティグループを絞り、必要なポートのみ許可\n                                    (MGN は 443 と 1500 など)\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"機密データ"}
</td>
<td>
{"\n                                    Macie で S3 の機密データを検出、Secrets Manager で DB\n                                    認証情報を管理\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"移行完了後"}
</td>
<td>
{"\n                                    "}
<strong>
{"一時的な移行用の権限・エージェント・ステージング資源を削除"}
</strong>
{"\n                                "}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"38-task-42-のまとめ-試験の着眼点"} tabIndex={-1}>
{"3.8 Task 4.2 のまとめ (試験の着眼点)"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 24：3.8 Task 4.2 のまとめ (試験の着眼点)"}>
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
{"「ダウンタイム最小」「オンプレのサーバーをそのまま」"}
</td>
<td>
<strong>
{"MGN"}
</strong>
{" (継続レプリケーションとテスト起動)"}
</td>
</tr>
<tr className={"even"}>
<td>
{"「Oracle から Aurora PostgreSQL」"}
</td>
<td>
<strong>
{"SCT + DMS"}
</strong>
{" (Full load + CDC)"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"「同じエンジン間で稼働中に移行」"}
</td>
<td>
{"\n                                    "}
<strong>
{"DMS (Full load + CDC)"}
</strong>
{"\n                                    またはネイティブレプリケーション\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"「回線 100 Mbps、データ 200 TB」"}
</td>
<td>
<strong>
{"Snow Family"}
</strong>
</td>
</tr>
<tr className={"odd"}>
<td>
{"「NFS ファイルを S3 に定期同期、検証あり」"}
</td>
<td>
<strong>
{"DataSync"}
</strong>
</td>
</tr>
<tr className={"even"}>
<td>
{"「取引先が SFTP でアップロードしている」"}
</td>
<td>
<strong>
{"Transfer Family"}
</strong>
</td>
</tr>
<tr className={"odd"}>
<td>
{"「世界中から S3 へ大きなファイルを速く」"}
</td>
<td>
<strong>
{"S3 Transfer Acceleration"}
</strong>
</td>
</tr>
<tr className={"even"}>
<td>
{"「今すぐ・暫定で接続」"}
</td>
<td>
<strong>
{"Site-to-Site VPN"}
</strong>
</td>
</tr>
<tr className={"odd"}>
<td>
{"「大量データを安定して継続転送」"}
</td>
<td>
<strong>
{"Direct Connect"}
</strong>
</td>
</tr>
<tr className={"even"}>
<td>
{"「段階的に切り替え、すぐ戻せる」"}
</td>
<td>
<strong>
{"Route 53 重み付けルーティング"}
</strong>
</td>
</tr>
<tr className={"odd"}>
<td>
{"「AD 対応アプリを AWS に移す」"}
</td>
<td>
<strong>
{"Managed Microsoft AD (信頼関係)"}
</strong>
</td>
</tr>
<tr className={"even"}>
<td>
{"「複数アカウントの統制を最初に整える」"}
</td>
<td>
<strong>
{"Control Tower と Organizations"}
</strong>
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
{"公式 Exam Guide (Task 4.2)"}
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
<a className={"src-card"} href={"https://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html"}>
<span className={"num"}>
{"2"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"DataSync"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/transfer/latest/userguide/what-is-aws-transfer-family.html"}>
<span className={"num"}>
{"3"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"Transfer Family"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/transfer/latest/userguide/what-is-aws-transfer-family.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/snowball/latest/developer-guide/whatisedge.html"}>
<span className={"num"}>
{"4"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"Snow Family (Snowball Edge)"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/snowball/latest/developer-guide/whatisedge.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/AmazonS3/latest/userguide/transfer-acceleration.html"}>
<span className={"num"}>
{"5"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"S3 Transfer Acceleration"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/AmazonS3/latest/userguide/transfer-acceleration.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/storagegateway/latest/vgw/WhatIsStorageGateway.html"}>
<span className={"num"}>
{"6"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"Storage Gateway"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/storagegateway/latest/vgw/WhatIsStorageGateway.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/mgn/latest/ug/what-is-application-migration-service.html"}>
<span className={"num"}>
{"7"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"Application Migration Service"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/mgn/latest/ug/what-is-application-migration-service.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html"}>
<span className={"num"}>
{"8"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"Database Migration Service"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/dms/latest/userguide/CHAP_BestPractices.html"}>
<span className={"num"}>
{"9"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"DMS ベストプラクティス"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/dms/latest/userguide/CHAP_BestPractices.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/SchemaConversionTool/latest/userguide/CHAP_Welcome.html"}>
<span className={"num"}>
{"10"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"Schema Conversion Tool"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/SchemaConversionTool/latest/userguide/CHAP_Welcome.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html"}>
<span className={"num"}>
{"11"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"Direct Connect"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html"}>
<span className={"num"}>
{"12"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"Site-to-Site VPN"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html"}>
<span className={"num"}>
{"13"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"Route 53"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html"}>
<span className={"num"}>
{"14"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"IAM Identity Center"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/directoryservice/latest/admin-guide/what_is.html"}>
<span className={"num"}>
{"15"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"Directory Service"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/directoryservice/latest/admin-guide/what_is.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html"}>
<span className={"num"}>
{"16"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"Control Tower"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html"}>
<span className={"num"}>
{"17"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"Organizations"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html"}
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
