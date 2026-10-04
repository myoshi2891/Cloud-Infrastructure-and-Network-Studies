// app/recommended-books/terraform-up-and-running/sections/Section11.tsx
import React from 'react';

interface SectionProps {
    Diagram: React.ComponentType<{ id: import('../constants').DiagramId; ariaLabel: string }>;
}

export function Section11({ Diagram }: SectionProps) {
    return (
        <section className="section-block">
<h2 id="第11部独自追加-2026年8月時点のterraformエコシステム最新動向">{' '}第11部（独自追加）: 2026年8月時点のTerraformエコシステム最新動向{' '}</h2>
<p>{' '}原著第3版は2022年9月刊行のため、その後の約4年間でTerraformを取り巻く状況は大きく変化しました。本部は2026年8月27日時点でのWeb検索結果に基づき、実務上インパクトの大きい変化を整理します。{' '}</p>
<h3 id="11-1-ライセンス変更とopentofuフォークの経緯">{' '}11-1. ライセンス変更とOpenTofuフォークの経緯{' '}</h3>
<Diagram id="diag-17" ariaLabel="Terraformのライセンス変更（BSL）とOpenTofuコミュニティフォークの経緯タイムライン" />
<h3 id="11-2-ibmによるhashicorp買収2025年2月完了">{' '}11-2. IBMによるHashiCorp買収（2025年2月完了）{' '}</h3>
<p>{' '}2024年4月に発表されたIBMによるHashiCorp買収（約64億ドル、1株35ドルの現金買収）は、英国競争市場庁（CMA）と米国連邦取引委員会（FTC）の承認を経て<strong>2025年2月27日に完了</strong>しました。TerraformはRed Hat Ansibleと、VaultはOpenShift/Guardiumと統合される方針が示されています。{' '}</p>
<h3 id="11-3-terraform-vs-opentofu-現状比較表2026年8月時点">{' '}11-3. Terraform vs OpenTofu 現状比較表（2026年8月時点）{' '}</h3>
<div className="table-scroll">{' '}<table>
                        <thead>
                            <tr className="row-header">
                            <th scope="col">項目</th>
                            <th scope="col">Terraform</th>
                            <th scope="col">OpenTofu</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="row-odd">
                                <td>運営元</td>
                                <td>HashiCorp（IBM傘下）</td>
                                <td>Linux Foundation</td>
                            </tr>
                            <tr className="row-even">
                                <td>ライセンス</td>
                                <td>BUSL 1.1（ソースアベイラブル）</td>
                                <td>MPL 2.0（オープンソース）</td>
                            </tr>
                            <tr className="row-odd">
                                <td>最新安定版</td>
                                <td>1.16.x系（1.16.0、2026年8月リリース）</td>
                                <td>1.12.x系（1.12.6、2026年8月リリース）</td>
                            </tr>
                            <tr className="row-even">
                                <td>商用マネージドSaaS</td>
                                <td>HCP Terraform（旧Terraform Cloud）</td>
                                <td>Scalr、Spacelift等サードパーティ</td>
                            </tr>
                            <tr className="row-odd">
                                <td>Policy as Code</td>
                                <td>Sentinel（HCP Terraform/Enterprise専用）+ OPA</td>
                                <td>OPA中心</td>
                            </tr>
                            <tr className="row-even">
                                <td>State保存時暗号化（バックエンド側）</td>
                                <td>{' '}S3 backendの<code>encrypt = true</code>、GCS/Azureのサーバーサイド暗号化など{' '}</td>
                                <td>同左（Terraform互換のバックエンド機能をそのまま利用）</td>
                            </tr>
                            <tr className="row-odd">
                                <td>ネイティブなState/Plan暗号化（クライアント側）</td>
                                <td>OSS単体では非対応（HCP Terraform経由で保管時暗号化を利用）</td>
                                <td>{' '}OSS単体でネイティブ対応（1.7以降のState Encryption。差別化ポイント）{' '}</td>
                            </tr>
                            <tr className="row-even">
                                <td>AI/MCP統合</td>
                                <td>{' '}HCP Terraform MCPサーバーでレジストリ検索・ワークスペース操作に対応{' '}</td>
                                <td>コミュニティベースのツールが中心</td>
                            </tr>
                            <tr className="row-odd">
                                <td>プロバイダー互換性</td>
                                <td>―</td>
                                <td>Terraformプロバイダーの多くがそのまま利用可能</td>
                            </tr>
                        </tbody>
                    </table>{' '}</div>
<p>{' '}<strong>実務上の判断軸</strong>: HCP Terraformの高度な機能（Stacks、Sentinel、AI統合）を積極活用したい組織はTerraformを、ライセンスの自由度やベンダーロックイン回避を重視する組織はOpenTofuを選ぶ、という「二刀流」戦略を取る企業も増えています。{' '}</p>
<h3 id="11-4-hcp-terraform-stacks料金体系ai統合">{' '}11-4. HCP Terraform: Stacks・料金体系・AI統合{' '}</h3>
<ul>{' '}<li>{' '}<strong>Terraform Stacks</strong>: 複数のインフラコンポーネント（VPC、DB、アプリ基盤など）をライフサイクルの異なる単位としてまとめて管理する機能。2025年のHashiConfでGA。関連機能はそれぞれ状況が異なり、<strong>リンクドStacks</strong>（Stacks間の依存関係の自動連携）は2025年2月25日にPublic Betaとして発表された段階、<strong>モノレポのネイティブサポート</strong>は2025年12月にGAとなっている{' '}</li>{' '}<li>{' '}<strong>無料枠の変更</strong>: 従来のHCP Terraform無料プランは2026年3月31日に終了し、現在は「管理対象リソース500個まで」という新しい無料枠に移行。有償プランは概ね管理対象リソース1つあたり月額0.10ドル程度から{' '}</li>{' '}<li>{' '}<strong>AI/MCP統合</strong>: HCP Terraform MCPサーバーにより、AIエージェントやIDEから自然言語でレジストリ検索・ワークスペース操作・コスト影響の問い合わせが可能になっている（2025〜2026年のロードマップの中心テーマ）{' '}</li>{' '}</ul>
<h3 id="11-5-policy-as-code-sentinel-vs-opa-vs-スキャナー系ツール比較">{' '}11-5. Policy as Code: Sentinel vs OPA vs スキャナー系ツール比較{' '}</h3>
<Diagram id="diag-18" ariaLabel="Sentinel, OPA, 静的スキャナーによる多層Policy as Codeガバナンス構成" />
<div className="table-scroll">{' '}<table>
                        <thead>
                            <tr className="row-header">
                            <th scope="col">ツール</th>
                            <th scope="col">分類</th>
                            <th scope="col">ロックイン</th>
                            <th scope="col">得意分野</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="row-odd">
                                <td>Sentinel</td>
                                <td>統合型プロプライエタリゲート</td>
                                <td>HCP Terraform/Enterprise専用</td>
                                <td>run全体（plan/state/config）との緊密な統合</td>
                            </tr>
                            <tr className="row-even">
                                <td>OPA（Rego）</td>
                                <td>汎用ポリシーエンジン</td>
                                <td>なし（Kubernetes等でも同一言語）</td>
                                <td>組織独自のガバナンスルールの一元管理</td>
                            </tr>
                            <tr className="row-odd">
                                <td>Checkov / Trivy config</td>
                                <td>静的セキュリティスキャナー</td>
                                <td>なし</td>
                                <td>{' '}既知の誤設定（公開バケット等）の即時検出。tfsecはレガシー扱いでTrivyのconfigスキャンへ統合・移行が進んでいるため、新規導入はTrivyを選ぶ{' '}</td>
                            </tr>
                        </tbody>
                    </table>{' '}</div>
<div className="callout callout-practice">{' '}<div className="callout-icon">✓{' '}</div>{' '}<div className="callout-body">{' '}<div className="callout-label">ベストプラクティス{' '}</div>{' '}<p>{' '}単一ツールに頼らず、「スキャナーで既知の穴を塞ぐ」＋「OPA/Sentinelで組織固有のガバナンスを強制する」の2層構成が2026年時点の成熟した構成として紹介されています。ネイティブHCLの<code>precondition</code>/<code>postcondition</code>/<code>check</code>ブロックだけでも、ポリシー違反の一定割合（分析によれば約3割程度）は事前に検出できるため、まずはHCL標準機能から始めるのも有効です。ただし<code>check</code>ブロックは警告を出すだけでapplyを止めない（advisory）ため、違反時にデプロイを確実に止めたい条件は<code>precondition</code>で表現するか、OPA/Sentinelの強制ポリシーとして適用します。{' '}</p>{' '}</div>{' '}</div>

        </section>
    );
}
