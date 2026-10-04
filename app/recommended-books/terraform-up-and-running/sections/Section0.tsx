// app/recommended-books/terraform-up-and-running/sections/Section0.tsx
import React from 'react';

interface SectionProps {
    Diagram: React.ComponentType<{ id: import('../constants').DiagramId; ariaLabel: string }>;
}

export function Section0({ Diagram }: SectionProps) {
    return (
        <section className="section-block">
<h2 id="第0部-前提知識--devopsとinfrastructure-as-codeとは">
                    第0部: 前提知識 ― DevOpsとInfrastructure as Codeとは
                </h2>
<h3 id="0-1-devopsとは何か">0-1. DevOpsとは何か</h3>
<p>
                    DevOpsは「開発（Development）」と「運用（Operations）」を統合し、ソフトウェアを高速かつ安全にリリースし続けるための文化・プラクティスの総称です。特定のツールや役職名ではなく、以下のような目標を達成するための考え方の集合体だと理解するのが適切です。
                </p>
<ul>
                    <li>変更を小さく・頻繁にリリースする</li>
                    <li>自動化によって人的ミスを減らす</li>
                    <li>障害からの復旧を高速化する</li>
                    <li>チーム間のサイロ（分断）を解消する</li>
                </ul>
<h3 id="0-2-infrastructure-as-codeiacとは">
                    0-2. Infrastructure as Code（IaC）とは
                </h3>
<p>
                    IaCとは、サーバー・ネットワーク・データベースなどのインフラをGUI操作ではなく「コード」として定義し、バージョン管理・レビュー・自動テスト・自動デプロイの対象にするプラクティスです。IaCツールは大きく5つのカテゴリに分類できます。
                </p>
<Diagram id="diag-1" ariaLabel="DevOpsとIaCの4分類（アドホックスクリプト、構成管理、サーバーテンプレート、サーバープロビジョニング）の体系図" />
<div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="row-header">
                            <th scope="col">カテゴリ</th>
                            <th scope="col">代表ツール</th>
                            <th scope="col">主な役割</th>
                            <th scope="col">べき等性</th>
                            <th scope="col">学習コスト</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="row-odd">
                                <td>アドホックスクリプト</td>
                                <td>Bash, Python</td>
                                <td>何でもできるが再現性が低い</td>
                                <td>実装依存</td>
                                <td>低</td>
                            </tr>
                            <tr className="row-even">
                                <td>構成管理ツール</td>
                                <td>Chef, Puppet, Ansible, SaltStack</td>
                                <td>既存サーバーへのソフトウェア導入・設定</td>
                                <td>高</td>
                                <td>中</td>
                            </tr>
                            <tr className="row-odd">
                                <td>サーバーテンプレートツール</td>
                                <td>Docker, Packer, Vagrant</td>
                                <td>不変のイメージを事前に作成</td>
                                <td>高（イメージ単位）</td>
                                <td>中</td>
                            </tr>
                            <tr className="row-even">
                                <td>オーケストレーションツール</td>
                                <td>Kubernetes, Nomad, ECS</td>
                                <td>コンテナ／プロセスの配置とスケーリング</td>
                                <td>高</td>
                                <td>高</td>
                            </tr>
                            <tr className="row-odd">
                                <td>プロビジョニングツール</td>
                                <td>Terraform, OpenTofu, Pulumi, AWS CDK, CloudFormation</td>
                                <td>クラウドAPIを叩きインフラそのものを作成</td>
                                <td>高</td>
                                <td>中〜高</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
<h3 id="0-3-iacの4つのメリット">0-3. IaCの4つのメリット</h3>
<ol type="1">
                    <li>
                        <strong>セルフサービス化</strong>:
                        チケット申請なしにチームが自分でインフラを立てられる
                    </li>
                    <li>
                        <strong>速度と安全性の両立</strong>:
                        自動テスト・自動レビューにより人手より高速かつ確実
                    </li>
                    <li>
                        <strong>ドキュメントとしてのコード</strong>:
                        コード自体が「今のインフラがどうなっているか」の正となる
                    </li>
                    <li>
                        <strong>バージョン管理と監査可能性</strong>:
                        Gitの履歴がそのまま変更履歴・監査ログになる
                    </li>
                </ol>

        </section>
    );
}
