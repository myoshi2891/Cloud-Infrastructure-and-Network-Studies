// app/recommended-books/terraform-up-and-running/sections/Section6.tsx
import React from 'react';

interface SectionProps {
    Diagram: React.ComponentType<{ id: import('../constants').DiagramId; ariaLabel: string }>;
}

export function Section6({ Diagram }: SectionProps) {
    return (
        <section className="section-block">
<h2 id="第6部原著第6章対応-シークレット管理">
                    第6部（原著第6章対応）: シークレット管理
                </h2>
<h3 id="6-1-シークレット管理の基礎">6-1. シークレット管理の基礎</h3>
<p>シークレット管理を設計する際は、次の3つの問いに答える必要があります。</p>
<ol type="1">
                    <li>
                        <strong>何を保存するか</strong>: パスワード、APIキー、証明書の秘密鍵など
                    </li>
                    <li>
                        <strong>どこに保存するか</strong>: 暗号化されたストレージ（Vault、Secrets
                        Manager等）
                    </li>
                    <li>
                        <strong>どうアクセスさせるか</strong>:
                        環境変数、ファイルマウント、動的な短命クレデンシャル発行
                    </li>
                </ol>
<h3 id="6-2-主要シークレット管理ツール比較">6-2. 主要シークレット管理ツール比較</h3>
<div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="row-header">
                            <th scope="col">ツール</th>
                            <th scope="col">提供元</th>
                            <th scope="col">動的シークレット</th>
                            <th scope="col">主な用途</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="row-odd">
                                <td>HashiCorp Vault</td>
                                <td>HashiCorp（IBM傘下）</td>
                                <td>対応（DB/クラウド認証情報を動的発行）</td>
                                <td>マルチクラウド・オンプレ横断のシークレット管理</td>
                            </tr>
                            <tr className="row-even">
                                <td>AWS Secrets Manager</td>
                                <td>AWS</td>
                                <td>一部対応（RDSローテーション等）</td>
                                <td>AWS中心の環境</td>
                            </tr>
                            <tr className="row-odd">
                                <td>AWS SSM Parameter Store</td>
                                <td>AWS</td>
                                <td>非対応（静的値）</td>
                                <td>低コストな設定値・軽量シークレット</td>
                            </tr>
                            <tr className="row-even">
                                <td>Azure Key Vault</td>
                                <td>Microsoft</td>
                                <td>一部対応</td>
                                <td>Azure中心の環境</td>
                            </tr>
                            <tr className="row-odd">
                                <td>Google Secret Manager</td>
                                <td>Google</td>
                                <td>非対応（静的値）</td>
                                <td>GCP中心の環境</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
<h3 id="6-3-terraformでのシークレット利用パターン">
                    6-3. Terraformでのシークレット利用パターン
                </h3>
<p>
                    Terraformの<code>sensitive = true</code>はCLI出力へのマスキングのみを行い、<strong>State
                        fileには平文（またはそれに近い形）でシークレットが記録されてしまう</strong>という長年の課題がありました。
                </p>
<pre className="code-block">
                    <div className="code-line">variable "db_password" &#123;</div>
                    <div className="code-line">  description = "The password for the database"</div>
                    <div className="code-line">  type        = string</div>
                    <div className="code-line">  sensitive   = true</div>
                    <div className="code-line">&#125;</div>
                </pre>
<div className="callout callout-warning">
                    <div className="callout-icon">⚠</div>
                    <div className="callout-body">
                        <div className="callout-label">重要な注意</div>
                        <p>
                            <code>sensitive</code>はあくまで表示上のマスクです。State
                            file自体を暗号化する（リモートバックエンドの暗号化オプションを有効にする）ことと、アクセス権限をIAMで絞ることが必須のベストプラクティスです。
                        </p>
                    </div>
                </div>
<h3 id="6-42026年最新ephemeral-resources--write-only-argumentsによる根本解決">
                    6-4.【2026年最新】Ephemeral Resources &amp; Write-Only Argumentsによる根本解決
                </h3>
<p>
                    長年の「Stateにシークレットが残ってしまう」問題に対し、HashiCorpは<strong>Terraform 1.10でEphemeral Resourcesを、続くTerraform 1.11でWrite-Only
                        Argumentsを</strong>導入しました。よく一組で語られますが、両者は同じリリースで登場したわけではなく導入バージョンが1つずれています。いずれも原著第3版（2022年刊）の時点では存在しなかった、2026年時点における最重要のシークレット管理アップデートです。
                </p>
<ul>
                    <li>
                        <strong>Ephemeral Resources</strong>（<code>ephemeral</code>ブロック、<strong>Terraform 1.10以降</strong>）:
                        <code>apply</code>実行中のメモリ上にのみ存在し、PlanファイルにもStateファイルにも書き込まれないリソース
                    </li>
                    <li>
                        <strong>Write-Only Arguments</strong>（<code>_wo</code>サフィックスの引数、<strong>Terraform 1.11以降</strong>）:
                        プロバイダー側がサポートする場合、値を受け取って設定するが、Stateには保存しない引数
                    </li>
                </ul>
<Diagram id="diag-10" ariaLabel="Ephemeral ResourcesとWrite-Only Argumentsによるシークレット漏洩防止フロー" />
<pre className="code-block">
                    <div className="code-line">ephemeral "random_password" "db_password" &#123;</div>
                    <div className="code-line">  length           = 16</div>
                    <div className="code-line">  override_special = "!#$%&amp;*()-_=+[]&#123;&#125;&lt;&gt;:?"</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line">resource "aws_db_instance" "example" &#123;</div>
                    <div className="code-line">  identifier        = "my-db"</div>
                    <div className="code-line">  engine            = "postgres"</div>
                    <div className="code-line">  instance_class    = "db.t3.micro"</div>
                    <div className="code-line">  allocated_storage = 20</div>
                    <div className="code-line"></div>
                    <div className="code-line">  username = "app_user"</div>
                    <div className="code-line"></div>
                    <div className="code-line">  password_wo         = ephemeral.random_password.db_password.result</div>
                    <div className="code-line">  password_wo_version  = 1</div>
                    <div className="code-line"></div>
                    <div className="code-line">  # 学習・検証用DBの前提。これを省くとAWSが最終スナップショット識別子を要求し、</div>
                    <div className="code-line">  # terraform destroy が失敗する。本番DBでは skip_final_snapshot は false のままにし、</div>
                    <div className="code-line">  # final_snapshot_identifier に有効な識別子を指定すること</div>
                    <div className="code-line">  #   skip_final_snapshot       = false</div>
                    <div className="code-line">  #   final_snapshot_identifier = var.final_snapshot_identifier  # 例: "my-db-final-2026-08-29"</div>
                    <div className="code-line">  # timestamp() のような毎回変わる関数は差分が消えなくなるため使わない</div>
                    <div className="code-line">  skip_final_snapshot = true</div>
                    <div className="code-line">&#125;</div>
                </pre>
<p>
                    <strong>生成したパスワードの受け取りとローテーション</strong>:
                    この構成では生成値がStateにもPlanにも残らないため、<code>terraform output</code>で後から取り出すことは<strong>できません</strong>。値を人やアプリが使う必要がある場合は、同じ<code>apply</code>の中でシークレットストアへ書き込み、以後はそこから読む運用にします（<code>aws_secretsmanager_secret_version</code>の<code>secret_string_wo</code>と<code>secret_string_wo_version</code>を使えば、Secrets
                    Manager側にもStateを経由せずに書き込めます）。
                </p>
<p>
                    ローテーション時の注意点は<code>password_wo_version</code>です。write-only引数の値そのものはStateに保存されないため、Terraformは値の変化を検知できません。<strong>新しいパスワードを実際に適用するには、<code>password_wo_version</code>をインクリメントする</strong>必要があります（<code>1</code>
                    →
                    <code>2</code>）。バージョンを据え置いたままパスワード生成側だけを変えても、プロバイダーは更新を行わず、コード上の値と実際のDBパスワードが乖離します。定期ローテーションを行う場合は、この整数をコードまたは変数として管理し、ローテーションのたびに必ず1つ上げる手順をランブック化しておきます。
                </p>
<div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="row-header">
                            <th scope="col">比較項目</th>
                            <th scope="col">従来方式（<code>sensitive = true</code>のみ）</th>
                            <th scope="col">2026年推奨方式（Ephemeral + Write-Only）</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="row-odd">
                                <td>CLI出力へのマスキング</td>
                                <td>あり</td>
                                <td>あり</td>
                            </tr>
                            <tr className="row-even">
                                <td>State fileへの平文保存</td>
                                <td>される（要暗号化・厳格なアクセス制御）</td>
                                <td>されない</td>
                            </tr>
                            <tr className="row-odd">
                                <td>Plan fileへの保存</td>
                                <td>される</td>
                                <td>されない</td>
                            </tr>
                            <tr className="row-even">
                                <td>対応バージョン</td>
                                <td>全バージョン</td>
                                <td>
                                    Ephemeral Resources: Terraform 1.10以降／Write-Only Arguments:
                                    Terraform 1.11以降
                                </td>
                            </tr>
                            <tr className="row-odd">
                                <td>プロバイダー側の対応</td>
                                <td>不要</td>
                                <td>
                                    Write-Only引数の実装が必要（<code>hashicorp/aws</code>は<code>password_wo</code>等で順次対応）
                                </td>
                            </tr>
                            <tr className="row-even">
                                <td>主な利用先</td>
                                <td>変数、リソース属性全般</td>
                                <td>
                                    <code>locals</code>、Ephemeral変数（<code>ephemeral = true</code>）、子モジュールのEphemeral出力、<code>ephemeral</code>ブロック、プロバイダー設定、プロビジョナーと<code>connection</code>ブロック、対応リソースのWrite-Only引数
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
<div className="callout callout-practice">
                    <div className="callout-icon">✓</div>
                    <div className="callout-body">
                        <div className="callout-label">ベストプラクティス</div>
                        <p>
                            2026年8月時点で新規に本番コードを書く場合、パスワードやAPIトークンのような一度きりの機微値は、プロバイダーが対応していれば積極的にEphemeral
                            Resources + Write-Only
                            Argumentsへ移行する。既存コードの移行は、影響範囲の大きいDB系リソースから段階的に行うのが安全です。
                        </p>
                    </div>
                </div>

        </section>
    );
}
