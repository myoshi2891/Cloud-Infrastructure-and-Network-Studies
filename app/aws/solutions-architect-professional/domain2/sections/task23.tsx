import { Diagram } from '../Diagram';
import type { ChecklistProps } from '../types';
/** 原本のtask23本文。 */
export default function Content({ progress, updateProgress }: ChecklistProps) { void progress; void updateProgress; return <>
<h2 id={"5-task-23-要件に基づくセキュリティ統制の決定"} tabIndex={-1}>
{"\n                    5. Task 2.3 要件に基づくセキュリティ統制の決定\n                "}
</h2>
{"\n                "}
<p>
{"公式: 「Determine security controls based on requirements」"}
</p>
{"\n                "}
<h3 id={"step-1-何を問われるか-2"} tabIndex={-1}>
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
{"IAM"}
</td>
{"\n                                "}
<td>
{"誰が何をできるかの制御"}
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
{"ルートテーブル、セキュリティグループ、ネットワーク ACL"}
</td>
{"\n                                "}
<td>
{"ネットワークの通り道と門番"}
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
{"保存時/転送時の暗号化"}
</td>
{"\n                                "}
<td>
{"保存データと通信データの暗号化"}
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
{"AWS サービスエンドポイント"}
</td>
{"\n                                "}
<td>
{"AWS サービスへの接続口"}
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
{"認証情報管理サービス"}
</td>
{"\n                                "}
<td>
{"パスワードやキーの安全な保管"}
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
{"\n                                    マネージドセキュリティサービス(Shield、WAF、GuardDuty、Security\n                                    Hub)\n                                "}
</td>
{"\n                                "}
<td>
{"攻撃防御と脅威検出の道具"}
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
{"\n                                    最小権限、通信制御、大規模 Web\n                                    攻撃対策、暗号化戦略、エンドポイント指定、パッチ管理\n                                "}
</td>
{"\n                                "}
<td>
{"上記を要件に合わせて組み合わせる"}
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
<h3 id={"step-2-a-iam-と最小権限"} tabIndex={-1}>
{"Step 2-A: IAM と最小権限"}
</h3>
{"\n                "}
<Diagram id="diag-8" label={"Step 2-A: IAM と最小権限"}/>
{"\n                "}
<p>
{"\n                    "}
<strong>
{"注意"}
</strong>
{": この図は権限境界の暗黙的 Deny\n                    が効く一般的なケースに限定しています。同一アカウント内で、リソースベースポリシーが\n                    IAM ユーザー ARN を直接プリンシパルに指定して Allow する場合、権限境界の暗黙的\n                    Deny はその Allow を制限しません(明示的 Deny と SCP は引き続き適用)。\n                "}
</p>
{"\n                "}
<p>
{"\n                    "}
<strong>
{"覚え方"}
</strong>
{": 「明示的 Deny が最優先 → 暗黙的\n                    Deny(何も許可がなければ拒否) → Allow があって初めて許可」。\n                "}
</p>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：覚え方: 「明示的 Deny が最優先 → 暗黙的\n                    Deny(何も許可がなければ拒否) → Allow があって初めて許可」。"}>
{"\n                    "}
<table>
{"\n                        "}
<thead>
{"\n                            "}
<tr className={"header"}>
{"\n                                "}
<th scope="col">
{"仕組み"}
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
{"IAM ロール"}
</td>
{"\n                                "}
<td>
{"\n                                    一時的な認証情報を発行。EC2、Lambda、ECS\n                                    タスクにはアクセスキーではなくロールを付与\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"IAM Identity Center"}
</td>
{"\n                                "}
<td>
{"\n                                    人間のユーザー向けのシングルサインオンとフェデレーション(長期アクセスキーを避ける)\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"権限境界 (Permissions Boundary)"}
</td>
{"\n                                "}
<td>
{"\n                                    ロール/ユーザーが持てる"}
<strong>
{"最大権限"}
</strong>
{"を制限(委任管理で有効)\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"SCP"}
</td>
{"\n                                "}
<td>
{"\n                                    組織/OU/アカウントの"}
<strong>
{"上限"}
</strong>
{"を制限(Domain 1 で詳述)\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"IAM Access Analyzer"}
</td>
{"\n                                "}
<td>
{"外部公開や未使用の権限を検出、最小権限ポリシーの生成を支援"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"条件キー"}
</td>
{"\n                                "}
<td>
{"\n                                    "}
<code>
{"aws:SourceVpce"}
</code>
{"、"}
<code>
{"aws:PrincipalOrgID"}
</code>
{"、"}
<code>
{"aws:MultiFactorAuthPresent"}
</code>
{"\n                                    などで条件付き許可\n                                "}
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
<pre className="code-block" aria-label="json コード例">
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
{"\"ReadOnlyFromSpecificBucketViaVpcEndpoint\""}
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
{"\"Allow\""}
</span>
{","}
</div>
<div className="code-line">
{"      "}
<span className="hljs-attr">
{"\"Action\""}
</span>
{": ["}
<span className="hljs-string">
{"\"s3:GetObject\""}
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
{"\"arn:aws:s3:::example-app-data/reports/*\""}
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
{"\"StringEquals\""}
</span>
{": { "}
<span className="hljs-attr">
{"\"aws:SourceVpce\""}
</span>
{": "}
<span className="hljs-string">
{"\"vpce-0123456789abcdef0\""}
</span>
{" }"}
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
<div className={"callout-practice"}>
{"\n                    "}
<div className={"icon"}>
{"✓"}
</div>
{"\n                    "}
<div className={"body"}>
{"\n                        "}
<div className={"label"}>
{"IAM のベストプラクティス"}
</div>
{"\n                        "}
<ul>
{"\n                            "}
<li>
{"ルートユーザーは日常利用せず、MFA を有効にして保護する"}
</li>
{"\n                            "}
<li>
{"\n                                人にはフェデレーション(IAM Identity\n                                Center)、ワークロードには"}
<strong>
{"ロール"}
</strong>
{"を使い、"}
<strong>
{"長期アクセスキーを避ける"}
</strong>
{"\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                最初は広めの権限で始めず、"}
<strong>
{"必要な権限だけ"}
</strong>
{"付与し、Access\n                                Analyzer のアクセスアドバイザーや生成機能で絞り込む\n                            "}
</li>
{"\n                            "}
<li>
{"条件(MFA、送信元、タグ)で許可範囲を狭める"}
</li>
{"\n                        "}
</ul>
{"\n                    "}
</div>
{"\n                "}
</div>
{"\n                "}
<h3 id={"step-2-b-ネットワーク統制ルートテーブルセキュリティグループnacl"} tabIndex={-1}>
{"\n                    Step 2-B: ネットワーク統制(ルートテーブル、セキュリティグループ、NACL)\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：Step 2-B: ネットワーク統制(ルートテーブル、セキュリティグループ、NACL)"}>
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
{"セキュリティグループ"}
</th>
{"\n                                "}
<th scope="col">
{"ネットワーク ACL"}
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
{"適用単位"}
</td>
{"\n                                "}
<td>
{"ENI(インスタンス等)"}
</td>
{"\n                                "}
<td>
{"サブネット"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"状態"}
</td>
{"\n                                "}
<td>
<strong>
{"ステートフル"}
</strong>
{"(戻り通信は自動許可)"}
</td>
{"\n                                "}
<td>
<strong>
{"ステートレス"}
</strong>
{"(往復とも明示が必要)"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"ルール"}
</td>
{"\n                                "}
<td>
<strong>
{"許可のみ"}
</strong>
</td>
{"\n                                "}
<td>
{"許可と"}
<strong>
{"拒否"}
</strong>
{"の両方"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"評価"}
</td>
{"\n                                "}
<td>
{"全ルールを評価"}
</td>
{"\n                                "}
<td>
{"\n                                    "}
<strong>
{"番号の小さい順"}
</strong>
{"に評価、最初に一致したもので決定\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"用途"}
</td>
{"\n                                "}
<td>
{"通常の通信制御の主役"}
</td>
{"\n                                "}
<td>
{"サブネット境界での粗い制御、特定 IP の明示的拒否"}
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
<Diagram id="diag-9" label={"Step 2-B: ネットワーク統制(ルートテーブル、セキュリティグループ、NACL)"}/>
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
{"セキュリティグループ同士を参照"}
</strong>
{"して許可する(IP\n                                アドレス直書きより変更に強い)\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                DB\n                                やアプリは"}
<strong>
{"プライベートサブネット"}
</strong>
{"に置き、インターネットへのアクセスが必要な場合のみ\n                                NAT ゲートウェイ経由にする\n                            "}
</li>
{"\n                            "}
<li>
{"特定 IP を確実にブロックしたい場合は NACL の拒否ルールを使う"}
</li>
{"\n                            "}
<li>
{"\n                                ルートテーブルで"}
<strong>
{"意図しない経路(0.0.0.0/0 の IGW 向け)を持たせない"}
</strong>
{"\n                            "}
</li>
{"\n                        "}
</ul>
{"\n                    "}
</div>
{"\n                "}
</div>
{"\n                "}
<h3 id={"step-2-c-暗号化保存時転送時"} tabIndex={-1}>
{"Step 2-C: 暗号化(保存時・転送時)"}
</h3>
{"\n                "}
<Diagram id="diag-10" label={"Step 2-C: 暗号化(保存時・転送時)"}/>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：flowchart TB\n    subgraph REST[\"保存時の暗号化\"]\n        K[\"AWS KMS<br/>カスタマー管理キー\"] --> S3[\"S3 SSE-KMS\"]\n        K --> EBS[\"EBS 暗号化\"]\n        K --> RDS[\"RDS 暗号化\"]\n    end\n    subgraph TRANSIT[\"転送時の暗号化\"]\n        ACM[\"AWS Certificate Manager\"] --> CF[\"CloudFront と ALB で TLS\"]\n    end"}>
{"\n                    "}
<table>
{"\n                        "}
<thead>
{"\n                            "}
<tr className={"header"}>
{"\n                                "}
<th scope="col">
{"対象"}
</th>
{"\n                                "}
<th scope="col">
{"方法"}
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
{"鍵管理"}
</td>
{"\n                                "}
<td>
{"\n                                    "}
<strong>
{"AWS KMS"}
</strong>
{": AWS 所有キー、AWS\n                                    マネージドキー、カスタマー管理キー(ローテーション、キーポリシー、監査が可能)。マルチリージョンキーで\n                                    DR 用に同じキーマテリアルを複数リージョンで利用\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"専用ハードウェア要件"}
</td>
{"\n                                "}
<td>
{"\n                                    "}
<strong>
{"AWS CloudHSM"}
</strong>
{": 専有の HSM\n                                    が必要な場合(厳格なコンプライアンス)\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"S3"}
</td>
{"\n                                "}
<td>
{"\n                                    SSE-S3、SSE-KMS、DSSE-KMS、クライアント側暗号化。バケットポリシーで暗号化なしのアップロードや\n                                    HTTP を拒否できる\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"EBS / RDS / DynamoDB / EFS"}
</td>
{"\n                                "}
<td>
{"\n                                    作成時に暗号化を有効化(既存の非暗号化リソースはスナップショット経由などで暗号化版を作成)\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"転送時"}
</td>
{"\n                                "}
<td>
{"\n                                    TLS。証明書は\n                                    "}
<strong>
{"ACM"}
</strong>
{" で発行・自動更新。ALB、CloudFront、API\n                                    Gateway に適用\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"内部通信"}
</td>
{"\n                                "}
<td>
{"VPN、Direct Connect + MACsec/IPsec 等で保護"}
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
<pre className="code-block" aria-label="json コード例">
<div className="code-line">
{"{"}
</div>
<div className="code-line">
{"  "}
<span className="hljs-attr">
{"\"Sid\""}
</span>
{": "}
<span className="hljs-string">
{"\"DenyInsecureTransport\""}
</span>
{","}
</div>
<div className="code-line">
{"  "}
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
{"  "}
<span className="hljs-attr">
{"\"Principal\""}
</span>
{": "}
<span className="hljs-string">
{"\"*\""}
</span>
{","}
</div>
<div className="code-line">
{"  "}
<span className="hljs-attr">
{"\"Action\""}
</span>
{": "}
<span className="hljs-string">
{"\"s3:*\""}
</span>
{","}
</div>
<div className="code-line">
{"  "}
<span className="hljs-attr">
{"\"Resource\""}
</span>
{": ["}
<span className="hljs-string">
{"\"arn:aws:s3:::example-bucket\""}
</span>
{", "}
<span className="hljs-string">
{"\"arn:aws:s3:::example-bucket/*\""}
</span>
{"],"}
</div>
<div className="code-line">
{"  "}
<span className="hljs-attr">
{"\"Condition\""}
</span>
{": { "}
<span className="hljs-attr">
{"\"Bool\""}
</span>
{": { "}
<span className="hljs-attr">
{"\"aws:SecureTransport\""}
</span>
{": "}
<span className="hljs-string">
{"\"false\""}
</span>
{" } }"}
</div>
<div className="code-line">
{"}"}
</div>
</pre>
{"\n                "}
<h3 id={"step-2-d-aws-サービスエンドポイントvpc-エンドポイント"} tabIndex={-1}>
{"\n                    Step 2-D: AWS サービスエンドポイント(VPC エンドポイント)\n                "}
</h3>
{"\n                "}
<p>
{"\n                    目的は、"}
<strong>
{"インターネットを経由せず"}
</strong>
{"に VPC から AWS\n                    サービスへ接続することです。\n                "}
</p>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：目的は、インターネットを経由せずに VPC から AWS\n                    サービスへ接続することです。"}>
{"\n                    "}
<table>
{"\n                        "}
<thead>
{"\n                            "}
<tr className={"header"}>
{"\n                                "}
<th scope="col">
{"種類"}
</th>
{"\n                                "}
<th scope="col">
{"対象"}
</th>
{"\n                                "}
<th scope="col">
{"仕組み"}
</th>
{"\n                                "}
<th scope="col">
{"費用の考え方"}
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
{"ゲートウェイエンドポイント"}
</td>
{"\n                                "}
<td>
<strong>
{"S3 と DynamoDB"}
</strong>
</td>
{"\n                                "}
<td>
{"ルートテーブルにエントリを追加"}
</td>
{"\n                                "}
<td>
<strong>
{"追加料金なし"}
</strong>
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"インターフェースエンドポイント (PrivateLink)"}
</td>
{"\n                                "}
<td>
{"多数の AWS サービス、他社/自社の公開サービス"}
</td>
{"\n                                "}
<td>
{"サブネットに ENI を作成しプライベート IP で接続"}
</td>
{"\n                                "}
<td>
{"時間課金+データ処理料金"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"ゲートウェイロードバランサーエンドポイント"}
</td>
{"\n                                "}
<td>
{"仮想アプライアンス(ファイアウォール等)の挿入"}
</td>
{"\n                                "}
<td>
{"トラフィックを検査装置へ"}
</td>
{"\n                                "}
<td>
{"構成による"}
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
<Diagram id="diag-11" label={"Step 2-D: AWS サービスエンドポイント(VPC エンドポイント)"}/>
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
{"\n                            S3\n                            へのアクセスは"}
<strong>
{"ゲートウェイエンドポイント"}
</strong>
{"(無料)を第一候補にし、"}
<strong>
{"エンドポイントポリシー"}
</strong>
{"と"}
<strong>
{"バケットポリシー("}
<code>
{"aws:SourceVpce"}
</code>
{")"}
</strong>
{"で通信経路と権限を二重に制限する。NAT\n                            ゲートウェイ経由の S3 通信は余計なデータ処理料金が発生するため避ける。\n                        "}
</p>
{"\n                    "}
</div>
{"\n                "}
</div>
{"\n                "}
<h3 id={"step-2-e-認証情報の管理"} tabIndex={-1}>
{"Step 2-E: 認証情報の管理"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：Step 2-E: 認証情報の管理"}>
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
{"向いている用途"}
</th>
{"\n                                "}
<th scope="col">
{"特徴"}
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
{"AWS Secrets Manager"}
</td>
{"\n                                "}
<td>
{"DB パスワード、API キー"}
</td>
{"\n                                "}
<td>
{"\n                                    "}
<strong>
{"自動ローテーション"}
</strong>
{"(RDS\n                                    等はネイティブ対応)、リージョン間レプリケーション、KMS\n                                    暗号化。有料\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"SSM Parameter Store"}
</td>
{"\n                                "}
<td>
{"設定値、シンプルな秘密情報"}
</td>
{"\n                                "}
<td>
{"\n                                    階層管理、SecureString。標準パラメータは無料枠あり。自動ローテーションは標準では持たない\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"IAM ロール(一時認証情報)"}
</td>
{"\n                                "}
<td>
{"AWS サービス間のアクセス"}
</td>
{"\n                                "}
<td>
{"キーそのものを持たない(最も安全)"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"ACM"}
</td>
{"\n                                "}
<td>
{"TLS 証明書"}
</td>
{"\n                                "}
<td>
{"自動更新"}
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
{":\n                    「パスワードを"}
<strong>
{"自動でローテーション"}
</strong>
{"したい」→ Secrets\n                    Manager。「設定値を"}
<strong>
{"安価に"}
</strong>
{"管理」→ Parameter Store。\n                "}
</p>
{"\n                "}
<h3 id={"step-2-f-マネージドセキュリティサービス"} tabIndex={-1}>
{"\n                    Step 2-F: マネージドセキュリティサービス\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：Step 2-F: マネージドセキュリティサービス"}>
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
{"覚え方"}
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
{"AWS Shield"}
</td>
{"\n                                "}
<td>
{"\n                                    DDoS 対策。"}
<strong>
{"Standard は全顧客に自動・無料"}
</strong>
{"。"}
<strong>
{"Advanced"}
</strong>
{" は高度な検知、SRT(Shield Response\n                                    Team)支援、コスト保護など\n                                "}
</td>
{"\n                                "}
<td>
{"「DDoS = Shield」"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"AWS WAF"}
</td>
{"\n                                "}
<td>
{"\n                                    Web アプリケーション層(L7)のルール(SQL\n                                    インジェクション、XSS、レートベース、Bot\n                                    制御)。CloudFront、ALB、API Gateway などに適用\n                                "}
</td>
{"\n                                "}
<td>
{"「Web の攻撃 = WAF」"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"AWS Firewall Manager"}
</td>
{"\n                                "}
<td>
{"\n                                    複数アカウントの WAF、Shield\n                                    Advanced、セキュリティグループ、Network Firewall\n                                    のルールを一元管理\n                                "}
</td>
{"\n                                "}
<td>
{"「組織全体で統制」"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"AWS Network Firewall"}
</td>
{"\n                                "}
<td>
{"VPC のネットワーク境界での状態検査 / 侵入防止"}
</td>
{"\n                                "}
<td>
{"「VPC 境界のファイアウォール」"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"Amazon GuardDuty"}
</td>
{"\n                                "}
<td>
{"\n                                    CloudTrail、VPC フローログ、DNS\n                                    ログなどを分析する"}
<strong>
{"脅威検出"}
</strong>
{"(機械学習)\n                                "}
</td>
{"\n                                "}
<td>
{"「怪しい挙動を検知」"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"AWS Security Hub"}
</td>
{"\n                                "}
<td>
{"\n                                    各サービスの検出結果を集約し、セキュリティ標準への準拠を評価\n                                "}
</td>
{"\n                                "}
<td>
{"「検出結果の集約」"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"Amazon Inspector"}
</td>
{"\n                                "}
<td>
{"EC2、コンテナ、Lambda の"}
<strong>
{"脆弱性スキャン"}
</strong>
</td>
{"\n                                "}
<td>
{"「脆弱性 = Inspector」"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"Amazon Macie"}
</td>
{"\n                                "}
<td>
{"S3 内の機密データ(PII など)を検出"}
</td>
{"\n                                "}
<td>
{"「機密データ = Macie」"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"AWS Config"}
</td>
{"\n                                "}
<td>
{"構成の準拠性評価と変更履歴"}
</td>
{"\n                                "}
<td>
{"「構成のルール評価」"}
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
<h3 id={"step-2-g-大規模-web-アプリへの攻撃緩和"} tabIndex={-1}>
{"\n                    Step 2-G: 大規模 Web アプリへの攻撃緩和\n                "}
</h3>
{"\n                "}
<Diagram id="diag-12" label={"Step 2-G: 大規模 Web アプリへの攻撃緩和"}/>
{"\n                "}
<p>
<strong>
{"DDoS 耐性の基本方針"}
</strong>
</p>
{"\n                "}
<ol>
{"\n                    "}
<li>
{"\n                        "}
<strong>
{"攻撃面を減らす"}
</strong>
{": オリジンを直接公開せず、CloudFront\n                        経由のみ許可する。S3\n                        オリジンはオリジンアクセスコントロール(OAC)で保護する。ALB オリジンは\n                        CloudFront\n                        のマネージドプレフィックスリストだけでは他のディストリビューションからの経由を防げないため、CloudFront\n                        が付与する秘密のカスタムヘッダーを ALB リスナールールで検証する\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<strong>
{"エッジで吸収する"}
</strong>
{": CloudFront と Route\n                        53(エニーキャスト)を前面に置く\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<strong>
{"Layer 7 を守る"}
</strong>
{": WAF\n                        のレートベースルール、マネージドルール、Bot Control\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<strong>
{"スケールして耐える"}
</strong>
{": Auto Scaling と ELB で吸収し、Shield\n                        Advanced でコスト保護も受ける\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<strong>
{"検知と対応"}
</strong>
{": CloudWatch アラーム、GuardDuty、Shield Advanced\n                        の SRT へのエスカレーション\n                    "}
</li>
{"\n                "}
</ol>
{"\n                "}
<h3 id={"step-2-h-パッチ管理"} tabIndex={-1}>
{"Step 2-H: パッチ管理"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：Step 2-H: パッチ管理"}>
{"\n                    "}
<table>
{"\n                        "}
<thead>
{"\n                            "}
<tr className={"header"}>
{"\n                                "}
<th scope="col">
{"手段"}
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
{"Systems Manager Patch Manager"}
</td>
{"\n                                "}
<td>
{"\n                                    パッチベースラインで承認ルールを定義し、メンテナンスウィンドウで適用。コンプライアンスレポートも出力\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"Amazon Inspector"}
</td>
{"\n                                "}
<td>
{"脆弱性を継続的にスキャンし、優先度付け"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"EC2 Image Builder"}
</td>
{"\n                                "}
<td>
{"\n                                    パッチ適用済みの AMI\n                                    を"}
<strong>
{"自動でビルド・配布"}
</strong>
{"(Immutable な運用)\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"マネージドサービス"}
</td>
{"\n                                "}
<td>
{"\n                                    RDS のメンテナンスウィンドウ、Fargate、Lambda などは基盤パッチを\n                                    AWS が担う\n                                "}
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
{"\n                            「稼働中のサーバーにパッチを当てる」より、"}
<strong>
{"パッチ済み AMI\n                                から新しいインスタンスに入れ替える(Immutable)"}
</strong>
{"\n                            方が再現性が高く、ロールバックも容易です。\n                        "}
</p>
{"\n                    "}
</div>
{"\n                "}
</div>
{"\n                "}
<h3 id={"step-3-task-23-試験のコツ"} tabIndex={-1}>
{"Step 3: Task 2.3 試験のコツ"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：Step 3: Task 2.3 試験のコツ"}>
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
{"「インターネット経由なしで S3 へ」"}
</td>
{"\n                                "}
<td>
{"ゲートウェイ VPC エンドポイント"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"「特定 IP を確実にブロック」"}
</td>
{"\n                                "}
<td>
{"NACL の拒否ルール(セキュリティグループは拒否不可)"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"「SQL インジェクション/XSS を防ぐ」"}
</td>
{"\n                                "}
<td>
{"AWS WAF"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"「大規模 DDoS、コスト保護、専門チーム支援」"}
</td>
{"\n                                "}
<td>
{"Shield Advanced"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"「パスワードの自動ローテーション」"}
</td>
{"\n                                "}
<td>
{"Secrets Manager"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"「複数アカウントのルールを一括適用」"}
</td>
{"\n                                "}
<td>
{"Firewall Manager"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"「異常な API 呼び出しや不正通信を検出」"}
</td>
{"\n                                "}
<td>
{"GuardDuty"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"「検出結果を一元表示」"}
</td>
{"\n                                "}
<td>
{"Security Hub"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"「暗号鍵の使用を細かく監査・制御」"}
</td>
{"\n                                "}
<td>
{"KMS カスタマー管理キー(キーポリシー、CloudTrail)"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"「長期アクセスキーを使わない」"}
</td>
{"\n                                "}
<td>
{"IAM ロール、IAM Identity Center"}
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
