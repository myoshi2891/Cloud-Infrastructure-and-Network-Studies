// app/recommended-books/terraform-up-and-running/sections/Section1.tsx
import React from 'react';

interface SectionProps {
    Diagram: React.ComponentType<{ id: import('../constants').DiagramId; ariaLabel: string }>;
}

export function Section1({ Diagram }: SectionProps) {
    return (
        <section className="section-block">
<h2 id="第1部原著第1章対応-なぜterraformなのか">{' '}第1部（原著第1章対応）: なぜTerraformなのか{' '}</h2>
<h3 id="1-1-terraformの仕組み">1-1. Terraformの仕組み</h3>
<p>{' '}Terraformは、HashiCorp社が開発した宣言的（declarative）なプロビジョニングツールです。HCL（HashiCorp Configuration Language）と呼ばれるDSL（ドメイン特化言語）でインフラのあるべき状態（Desired State）を記述し、<code>terraform plan</code>{' '}で現状との差分を計算、<code>terraform apply</code>{' '}でクラウドAPIを呼び出して差分を解消します。{' '}</p>
<Diagram id="diag-2" ariaLabel="Terraformのアーキテクチャ（Terraform CoreとCloud Provider APIの通信経路）" />
<p>{' '}Terraformは特定プロバイダーの機能をコアには持たず、プロバイダー（Provider）というプラグイン機構を通じて各クラウド・SaaSのAPIと通信します。この設計により、AWS・GCP・Azure・Kubernetes・Datadog・GitHubなど数千種類のプロバイダーが同じHCL構文とワークフローで扱えます。{' '}</p>
<h3 id="1-2-比較-configuration-management-vs-provisioning">{' '}1-2. 比較: Configuration Management vs Provisioning{' '}</h3>
<div className="table-scroll">{' '}<table>
                        <thead>
                            <tr className="row-header">
                            <th scope="col">観点</th>
                            <th scope="col">Configuration Management（Chef/Ansible）</th>
                            <th scope="col">Provisioning（Terraform）</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="row-odd">
                                <td>主対象</td>
                                <td>既存サーバー内部のソフトウェア設定</td>
                                <td>クラウドリソースそのものの作成・削除</td>
                            </tr>
                            <tr className="row-even">
                                <td>典型操作</td>
                                <td>パッケージインストール、設定ファイル配布</td>
                                <td>VM/VPC/ロードバランサー/DBの作成</td>
                            </tr>
                            <tr className="row-odd">
                                <td>実行の抽象度</td>
                                <td>サーバーにログインして変更</td>
                                <td>クラウドAPI経由でリソースを操作</td>
                            </tr>
                            <tr className="row-even">
                                <td>組み合わせ例</td>
                                <td>Terraformでサーバーを作り、Ansibleで中身を構成する</td>
                                <td>―</td>
                            </tr>
                        </tbody>
                    </table>{' '}</div>
<h3 id="1-3-比較-mutable-infrastructure-vs-immutable-infrastructure">{' '}1-3. 比較: Mutable Infrastructure vs Immutable Infrastructure{' '}</h3>
<Diagram id="diag-3" ariaLabel="Mutable（変更可能）とImmutable（不変）インフラストラクチャのデプロイフロー比較" />
<p>{' '}Terraform自体は可変・不変どちらの運用にも対応できますが、Server Templatingツール（Packer等）と組み合わせてAMIやコンテナイメージ単位で丸ごと入れ替える不変運用が、2026年時点でも本番環境のベストプラクティスとされています。{' '}</p>
<h3 id="1-4-比較-procedural-language-vs-declarative-language">{' '}1-4. 比較: Procedural Language vs Declarative Language{' '}</h3>
<div className="table-scroll">{' '}<table>
                        <thead>
                            <tr className="row-header">
                            <th scope="col">観点</th>
                            <th scope="col">手続き型（Chef, Ansibleの一部）</th>
                            <th scope="col">宣言型（Terraform, CloudFormation）</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="row-odd">
                                <td>記述内容</td>
                                <td>「どうやって」目的の状態にするかの手順</td>
                                <td>「何を」実現したいかの最終状態</td>
                            </tr>
                            <tr className="row-even">
                                <td>べき等性の担保</td>
                                <td>開発者が自前で条件分岐を書く必要がある</td>
                                <td>ツールが自動的に差分のみ適用</td>
                            </tr>
                            <tr className="row-odd">
                                <td>依存関係の解決</td>
                                <td>手動で順序を管理</td>
                                <td>Terraformが依存グラフを自動構築</td>
                            </tr>
                            <tr className="row-even">
                                <td>コードの再利用性</td>
                                <td>実行順序に強く依存し低い</td>
                                <td>宣言の組み合わせで高い</td>
                            </tr>
                        </tbody>
                    </table>{' '}</div>
<h3 id="1-5-比較-主要iac構成管理ツールの全体像">{' '}1-5. 比較: 主要IaC/構成管理ツールの全体像{' '}</h3>
<div className="table-scroll">{' '}<table>
                        <thead>
                            <tr className="row-header">
                            <th scope="col">ツール</th>
                            <th scope="col">ベンダー</th>
                            <th scope="col">言語/形式</th>
                            <th scope="col">主対象</th>
                            <th scope="col">ライセンス（2026年8月時点）</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="row-odd">
                                <td>Terraform</td>
                                <td>HashiCorp（IBM傘下）</td>
                                <td>HCL</td>
                                <td>マルチクラウドのプロビジョニング</td>
                                <td>BUSL 1.1（ソースアベイラブル）</td>
                            </tr>
                            <tr className="row-even">
                                <td>OpenTofu</td>
                                <td>Linux Foundation</td>
                                <td>HCL（Terraform互換）</td>
                                <td>マルチクラウドのプロビジョニング</td>
                                <td>MPL 2.0（オープンソース）</td>
                            </tr>
                            <tr className="row-odd">
                                <td>Pulumi</td>
                                <td>Pulumi Corp</td>
                                <td>TypeScript/Python/Go等の汎用言語</td>
                                <td>マルチクラウドのプロビジョニング</td>
                                <td>Apache 2.0</td>
                            </tr>
                            <tr className="row-even">
                                <td>AWS CloudFormation</td>
                                <td>AWS</td>
                                <td>YAML/JSON</td>
                                <td>AWS専用プロビジョニング</td>
                                <td>AWSマネージドサービス（無料）</td>
                            </tr>
                            <tr className="row-odd">
                                <td>Chef</td>
                                <td>Progress Software</td>
                                <td>Ruby DSL</td>
                                <td>サーバー構成管理</td>
                                <td>商用/コミュニティ版</td>
                            </tr>
                            <tr className="row-even">
                                <td>Puppet</td>
                                <td>Perforce</td>
                                <td>独自DSL</td>
                                <td>サーバー構成管理</td>
                                <td>商用/コミュニティ版</td>
                            </tr>
                            <tr className="row-odd">
                                <td>Ansible</td>
                                <td>Red Hat（IBM傘下）</td>
                                <td>YAML</td>
                                <td>サーバー構成管理・簡易プロビジョニング</td>
                                <td>GPLv3</td>
                            </tr>
                        </tbody>
                    </table>{' '}</div>
<div className="callout callout-note">{' '}<div className="callout-icon">ℹ{' '}</div>{' '}<div className="callout-body">{' '}<p>{' '}<strong>2026年時点の重要な補足</strong>: HashiCorpは2023年8月にTerraformのライセンスをMPL 2.0からBUSL 1.1（Business Source License）へ変更し、これに反発したコミュニティがLinux Foundation傘下でOpenTofuをフォークしました。さらに2025年2月27日、IBMがHashiCorpを約64億ドルで買収完了しています。この経緯の詳細は第11部で解説します。{' '}</p>{' '}</div>{' '}</div>
<h3 id="まとめ">まとめ</h3>
<ul>{' '}<li>{' '}TerraformはHCLで書く宣言型のプロビジョニングツールであり、Provider機構によりマルチクラウドを同一ワークフローで扱える{' '}</li>{' '}<li>{' '}構成管理・サーバーテンプレート・オーケストレーション・プロビジョニングは役割が異なり、実務では組み合わせて使うのが一般的{' '}</li>{' '}<li>不変インフラの考え方はTerraform運用のベストプラクティスの土台になる</li>{' '}</ul>

        </section>
    );
}
