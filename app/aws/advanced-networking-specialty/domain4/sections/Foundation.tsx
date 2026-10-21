import { Diagram } from '../Diagram';
/** 原本のfoundation区画を全文保持。 */
export default function Foundation(){return <div className="guide-part" data-part="foundation">
{"\n                "}
<div className="hero">{"\n                    "}<div className="kicker">{"Advanced Networking - Specialty · Domain 4"}</div>{"\n                    "}<h1>{"AWS Certified Advanced Networking - Specialty (ANS-C01) — Content Domain 4: Network Security, Compliance, and Governance — 初学者向けステップバイステップ解説ガイド"}</h1>{"\n                    "}<div className="meta-row">{"\n                        "}<span className="pill">{"配点 "}<strong>{"スコア対象の 24%"}</strong></span>{"\n                        "}<span className="pill">{"対象 "}<strong>{"初学者向け"}</strong></span>{"\n                        "}<span className="pill">{"図解 "}<strong>{"Mermaid 31点"}</strong></span>{"\n                        "}<span className="pill">{"参考 URL "}<strong>{"88件"}</strong></span>{"\n                    "}</div>{"\n                "}</div>
{"\n\n                "}
<blockquote>{"\n"}<p><strong>{"対象"}</strong>{": ネットワークの基礎(IP・ルーティング・TLS の概念)を一通り学んだことがあり、AWS のネットワークセキュリティを体系的に学びたい方\n"}<strong>{"配点"}</strong>{": Domain 4 は "}<strong>{"スコア対象の 24%"}</strong>{"(全 4 ドメイン中 3 番目)\n"}<strong>{"作成日"}</strong>{": 2026-10-16 / 根拠となる公式情報は各セクション末尾および巻末の「参考 URL 一覧」に記載"}</p>{"\n"}</blockquote>
{"\n"}
<p><a id="p0"></a></p>
{"\n"}
<h2 id="sec-0" tabIndex={-1}>{"0. この試験ドメインの全体像"}</h2>
{"\n"}
<p>{"公式試験ガイドでは、Domain 4 は次の "}<strong>{"3 つのタスク"}</strong>{" で構成されています。"}</p>
{"\n"}
<div className="table-scroll" role="region" tabIndex={0} aria-label={"0. この試験ドメインの全体像（表1）"}><table><thead><tr className="header"><th scope="col">{"タスク"}</th><th scope="col">{"公式タイトル(英語)"}</th><th scope="col">{"本ガイドでの章"}</th><th scope="col">{"ひとことで言うと"}</th></tr></thead><tbody><tr className="odd"><td><strong>{"4.1"}</strong></td><td>{"Implement and maintain network features to meet security and compliance needs and requirements"}</td><td>{"2〜7"}</td><td>{"「守る」: 入口・出口・内部をどう守るか、構成をどう作るか"}</td></tr><tr className="even"><td><strong>{"4.2"}</strong></td><td>{"Validate and audit security by using network monitoring and logging services"}</td><td>{"8〜14"}</td><td>{"「見る」: ログ・監視で守れているかを検証・監査する"}</td></tr><tr className="odd"><td><strong>{"4.3"}</strong></td><td>{"Implement and maintain confidentiality of data and communications of the network"}</td><td>{"15〜19"}</td><td>{"「隠す」: 暗号化・証明書・DNS 保護で通信の機密性を保つ"}</td></tr></tbody></table></div>
{"\n"}
<Diagram id="diag-1" label={"0. この試験ドメインの全体像"} />
{"\n"}
<h3 id="h3-1" tabIndex={-1}>{"試験形式のおさらい(公式ガイドより)"}</h3>
{"\n"}
<div className="table-scroll" role="region" tabIndex={0} aria-label={"試験形式のおさらい(公式ガイドより)（表2）"}><table><thead><tr className="header"><th scope="col">{"項目"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className="odd"><td>{"問題形式"}</td><td>{"複数選択(2つ以上の正解)・マッチング"}</td></tr><tr className="even"><td>{"問題数"}</td><td>{"スコア対象 50 問 + 採点対象外 15 問"}</td></tr><tr className="odd"><td>{"合格スコア"}</td><td>{"100〜1,000 のスケールスコアで 750 以上"}</td></tr><tr className="even"><td>{"採点方式"}</td><td>{"補償型(セクションごとの合格は不要。全体で合格すればよい)"}</td></tr></tbody></table></div>
{"\n"}
<blockquote>{"\n"}<p><strong>{"学習のコツ"}</strong>{": Domain 4 の問題は「要件(例: 外部への通信は特定ドメインだけ許可)」→「最小の運用負荷で満たす AWS サービスの組み合わせ」を選ぶ形式が中心です。サービス単体の知識より "}<strong>{"「どのサービスをどの場所に置くか」"}</strong>{" を意識して読み進めてください。"}</p>{"\n"}</blockquote>
{"\n"}
<p><a id="p1"></a></p>
{"\n"}
<h2 id="sec-2" tabIndex={-1}>{"1. 基礎: セキュリティの考え方"}</h2>
{"\n"}
<h3 id="s1-1" tabIndex={-1}>{"1-1. 共有責任モデル(Shared Responsibility Model)"}</h3>
{"\n"}
<p>{"AWS は「"}<strong>{"クラウドのセキュリティ(Security "}<em>{"of"}</em>{" the cloud)"}</strong>{"」、お客様は「"}<strong>{"クラウド内のセキュリティ(Security "}<em>{"in"}</em>{" the cloud)"}</strong>{"」に責任を持ちます。"}</p>
{"\n"}
<div className="table-scroll" role="region" tabIndex={0} aria-label={"1-1. 共有責任モデル(Shared Responsibility Model)（表3）"}><table><thead><tr className="header"><th scope="col">{"領域"}</th><th scope="col">{"AWS の責任"}</th><th scope="col">{"お客様の責任"}</th></tr></thead><tbody><tr className="odd"><td>{"物理・ハードウェア"}</td><td>{"データセンター、ネットワーク機器、ハイパーバイザ"}</td><td>{"なし"}</td></tr><tr className="even"><td>{"ネットワーク基盤"}</td><td>{"リージョン間・AZ 間の物理回線、Nitro による基盤の分離"}</td><td>{"VPC 設計、SG/NACL、ルートテーブル、ファイアウォール設定"}</td></tr><tr className="odd"><td>{"転送中データの暗号化"}</td><td>{"一部の自動暗号化(Nitro 間通信、リージョン間ピアリング等)"}</td><td>{"アプリ層の TLS、VPN/IPsec、証明書の管理"}</td></tr><tr className="even"><td>{"ログと監視"}</td><td>{"ログ機能の提供"}</td><td>{"ログの有効化・保管・分析・アラート設定"}</td></tr></tbody></table></div>
{"\n"}
<blockquote>{"\n"}<p><strong>{"試験ポイント"}</strong>{": 「AWS が自動でやってくれること」と「お客様が設定しないと有効にならないこと」を区別する問題が出ます。"}<strong>{"VPC Flow Logs・CloudTrail データイベント・WAF・TLS 設定などは基本的に自分で有効化"}</strong>{" します。"}</p>{"\n"}</blockquote>
{"\n"}
<h3 id="s1-2" tabIndex={-1}>{"1-2. 多層防御(Defense in Depth)"}</h3>
{"\n"}
<p>{"1 つの対策が破られても次の層で止める考え方です。"}</p>
{"\n"}
<Diagram id="diag-2" label={"1-2. 多層防御(Defense in Depth)"} />
{"\n"}
<h3 id="s1-3" tabIndex={-1}>{"1-3. ベストプラクティスの原則(Domain 4 全体に共通)"}</h3>
{"\n"}
<div className="table-scroll" role="region" tabIndex={0} aria-label={"1-3. ベストプラクティスの原則(Domain 4 全体に共通)（表4）"}><table><thead><tr className="header"><th scope="col">{"原則"}</th><th scope="col">{"具体例"}</th></tr></thead><tbody><tr className="odd"><td><strong>{"最小権限・最小通信"}</strong></td><td>{"SG は必要なポート・送信元だけ許可。0.0.0.0/0 の SSH/RDP は禁止"}</td></tr><tr className="even"><td><strong>{"デフォルト拒否"}</strong></td><td>{"NACL・Network Firewall の既定アクションを drop 系にする(strict order)"}</td></tr><tr className="odd"><td><strong>{"すべてログを残す"}</strong></td><td>{"Flow Logs・ALB ログ・WAF ログ・Network Firewall ログ・Resolver ログ・CloudTrail"}</td></tr><tr className="even"><td><strong>{"自動化"}</strong></td><td>{"Config ルール・EventBridge・Lambda・Systems Manager Automation による自動是正"}</td></tr><tr className="odd"><td><strong>{"一元管理"}</strong></td><td>{"AWS Organizations + Firewall Manager + Security Hub で複数アカウントを統制"}</td></tr><tr className="even"><td><strong>{"すべて暗号化"}</strong></td><td>{"TLS 1.2 以上、IPsec、MACsec、DNSSEC、KMS"}</td></tr></tbody></table></div>
{"\n"}
<p><strong>{"根拠 URL"}</strong></p>
{"\n"}
<ul>{"\n"}<li>{"共有責任モデル: "}<a href="https://aws.amazon.com/compliance/shared-responsibility-model/">{"https://aws.amazon.com/compliance/shared-responsibility-model/"}</a></li>{"\n"}<li>{"AWS Well-Architected Framework セキュリティの柱(ネットワーク保護): "}<a href="https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/protecting-networks.html">{"https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/protecting-networks.html"}</a></li>{"\n"}</ul>
{"\n"}
</div>;}
