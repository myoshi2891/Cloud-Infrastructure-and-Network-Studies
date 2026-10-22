import { Diagram } from '../Diagram';
/** 原本のtask3区画を全文保持。 */
export default function Task43(){return <div className="guide-part" data-part="task3">
<h2 id="task-4-3" tabIndex={-1}>{"Task 4.3 データ・通信の機密性"}</h2>
{"\n"}
<p><a id="p15"></a></p>
{"\n"}
<h2 id="sec-69" tabIndex={-1}>{"15. ネットワーク暗号化の全体像"}</h2>
{"\n"}
<blockquote>{"\n"}<p><strong>{"Knowledge"}</strong>{": Network encryption options available on AWS / Network encryption under the AWS shared responsibility model"}</p>{"\n"}</blockquote>
{"\n"}
<h3 id="s15-1" tabIndex={-1}>{"15-1. 通信経路ごとの暗号化手段"}</h3>
{"\n"}
<Diagram id="diag-24" label={"15-1. 通信経路ごとの暗号化手段"} />
{"\n"}
<div className="table-scroll" role="region" tabIndex={0} aria-label={"15-1. 通信経路ごとの暗号化手段（表41）"}><table><thead><tr className="header"><th scope="col">{"区間"}</th><th scope="col">{"暗号化の方法"}</th><th scope="col">{"備考"}</th></tr></thead><tbody><tr className="odd"><td>{"クライアント ⇔ エッジ/LB"}</td><td><strong>{"TLS"}</strong>{"(ACM 証明書)"}</td><td>{"TLS 1.2 以上を推奨。セキュリティポリシーで最低バージョンを指定"}</td></tr><tr className="even"><td>{"LB ⇔ ターゲット"}</td><td>{"TLS の再暗号化(ALB)/ TLS パススルーまたは TLS リスナー(NLB)"}</td><td>{"「エンドツーエンド暗号化」の要件で必須"}</td></tr><tr className="odd"><td>{"インスタンス ⇔ インスタンス"}</td><td><strong>{"Nitro System による AES-256 の自動暗号化"}</strong>{"(対応インスタンスタイプ同士)+ アプリ層 TLS"}</td><td>{"中間ホップ(LB、TGW 等)を挟む場合は別途 TLS が必要。最新は "}<strong>{"VPC Encryption Controls"}</strong>{" で監査・強制"}</td></tr><tr className="even"><td>{"VPC ⇔ VPC(リージョン内)"}</td><td>{"対応 Nitro 間の自動暗号化 / TLS"}</td><td>{"VPC Encryption Controls で可視化・強制可能"}</td></tr><tr className="odd"><td>{"リージョン間(VPC ピアリング、TGW ピアリング、Cloud WAN)"}</td><td><strong>{"AWS が物理レイヤーで自動暗号化"}</strong></td><td>{"お客様の設定不要"}</td></tr><tr className="even"><td>{"オンプレ ⇔ AWS"}</td><td><strong>{"IPsec(Site-to-Site VPN)"}</strong>{"、"}<strong>{"MACsec(Direct Connect)"}</strong></td><td>{"DX 自体は "}<strong>{"既定では暗号化されない"}</strong></td></tr><tr className="odd"><td>{"アプリ ⇔ AWS API"}</td><td>{"HTTPS(TLS)が標準"}</td><td>{"VPC エンドポイント + ポリシー"}</td></tr></tbody></table></div>
{"\n"}
<h3 id="s15-2" tabIndex={-1}>{"15-2. VPC Encryption Controls(新しい機能)"}</h3>
{"\n"}
<div className="table-scroll" role="region" tabIndex={0} aria-label={"15-2. VPC Encryption Controls(新しい機能)（表42）"}><table><thead><tr className="header"><th scope="col">{"項目"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className="odd"><td>{"目的"}</td><td>{"VPC 内および VPC 間の "}<strong>{"転送中暗号化を監査・強制"}</strong>{" する"}</td></tr><tr className="even"><td><strong>{"モニターモード"}</strong></td><td>{"各トラフィックの "}<strong>{"暗号化状況を可視化"}</strong>{"し、平文を許す資源を特定。監視には "}<code>{"${encryption-status}"}</code>{" を明示的に含むカスタム形式の Flow Log を新規作成する("}<strong>{"既存の Flow Log にはこのフィールドが自動追加されない"}</strong>{")"}</td></tr><tr className="odd"><td><strong>{"エンフォースモード"}</strong></td><td>{"暗号化に対応しないリソースの作成などを "}<strong>{"防止"}</strong>{" し、暗号化を強制"}</td></tr><tr className="even"><td>{"進め方"}</td><td><strong>{"既存 VPC はまずモニターモードで開始"}</strong>{"、平文のリソースを移行してからエンフォースへ切り替える"}</td></tr><tr className="odd"><td>{"組織管理"}</td><td><strong>{"宣言型ポリシー(Organizations)"}</strong>{" でアカウント/OU 単位に一括適用が可能"}</td></tr></tbody></table></div>
{"\n"}
<blockquote>{"\n"}<p>{"新しい機能のため、"}<strong>{"対応リソース・リージョン・制約は最新の公式ドキュメントで確認"}</strong>{" してください。"}</p>{"\n"}</blockquote>
{"\n"}
<h3 id="s15-3" tabIndex={-1}>{"15-3. 共有責任モデルにおける暗号化"}</h3>
{"\n"}
<div className="table-scroll" role="region" tabIndex={0} aria-label={"15-3. 共有責任モデルにおける暗号化（表43）"}><table><thead><tr className="header"><th scope="col">{"項目"}</th><th scope="col">{"AWS"}</th><th scope="col">{"お客様"}</th></tr></thead><tbody><tr className="odd"><td>{"物理・リージョン間の自動暗号化"}</td><td>{"✔"}</td><td>{"—"}</td></tr><tr className="even"><td>{"Nitro のハードウェア暗号化"}</td><td>{"✔(対応インスタンスの提供)"}</td><td>{"対応インスタンスタイプを選択する"}</td></tr><tr className="odd"><td>{"アプリ層の TLS / 証明書"}</td><td>{"証明書管理サービスの提供"}</td><td><strong>{"TLS の有効化、証明書の発行・更新、セキュリティポリシー選択"}</strong></td></tr><tr className="even"><td>{"VPN / MACsec"}</td><td>{"サービス提供"}</td><td><strong>{"IPsec・MACsec の設定、鍵・認証情報の管理"}</strong></td></tr><tr className="odd"><td>{"DNSSEC"}</td><td>{"Route 53 の署名機能"}</td><td><strong>{"署名の有効化、KMS キー管理、DS レコードの登録"}</strong></td></tr></tbody></table></div>
{"\n"}
<p><strong>{"根拠 URL"}</strong></p>
{"\n"}
<ul>{"\n"}<li>{"転送中の暗号化(VPC ユーザーガイド): "}<a href="https://docs.aws.amazon.com/vpc/latest/userguide/data-protection.html">{"https://docs.aws.amazon.com/vpc/latest/userguide/data-protection.html"}</a></li>{"\n"}<li>{"VPC Encryption Controls(ブログ): "}<a href="https://aws.amazon.com/blogs/aws/introducing-vpc-encryption-controls-enforce-encryption-in-transit-within-and-across-vpcs-in-a-region/">{"https://aws.amazon.com/blogs/aws/introducing-vpc-encryption-controls-enforce-encryption-in-transit-within-and-across-vpcs-in-a-region/"}</a></li>{"\n"}<li>{"新機能の告知: "}<a href="https://aws.amazon.com/about-aws/whats-new/2025/11/aws-vpc-encryption-controls">{"https://aws.amazon.com/about-aws/whats-new/2025/11/aws-vpc-encryption-controls"}</a></li>{"\n"}<li>{"宣言型ポリシーへの対応(2026-07): "}<a href="https://aws.amazon.com/about-aws/whats-new/2026/07/vpc-encryption-controls-declarative-controls/">{"https://aws.amazon.com/about-aws/whats-new/2026/07/vpc-encryption-controls-declarative-controls/"}</a></li>{"\n"}<li>{"AWS 上の転送中暗号化のホワイトペーパー: "}<a href="https://docs.aws.amazon.com/whitepapers/latest/logical-separation/encrypting-data-at-rest-and-in-transit.html">{"https://docs.aws.amazon.com/whitepapers/latest/logical-separation/encrypting-data-at-rest-and-in-transit.html"}</a></li>{"\n"}</ul>
{"\n"}
<p><a id="p16"></a></p>
{"\n"}
<h2 id="sec-73" tabIndex={-1}>{"16. VPN・Direct Connect の暗号化"}</h2>
{"\n"}
<blockquote>{"\n"}<p><strong>{"Knowledge"}</strong>{": VPN connectivity over Direct Connect / Encryption methods for data in transit (for example, IPsec)"}</p>{"\n"}</blockquote>
{"\n"}
<h3 id="s16-1" tabIndex={-1}>{"16-1. Site-to-Site VPN(IPsec)"}</h3>
{"\n"}
<div className="table-scroll" role="region" tabIndex={0} aria-label={"16-1. Site-to-Site VPN(IPsec)（表44）"}><table><thead><tr className="header"><th scope="col">{"項目"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className="odd"><td>{"構成"}</td><td>{"1 つの VPN 接続に "}<strong>{"2 本のトンネル"}</strong>{"(AWS 側は別 AZ のエンドポイント)。冗長化のため両方を使う"}</td></tr><tr className="even"><td>{"終端"}</td><td><strong>{"仮想プライベートゲートウェイ(VGW)"}</strong>{" または "}<strong>{"Transit Gateway"}</strong></td></tr><tr className="odd"><td>{"IKE"}</td><td>{"IKEv1 / "}<strong>{"IKEv2"}</strong></td></tr><tr className="even"><td>{"暗号化"}</td><td>{"AES-128 / AES-256 / AES-GCM などをトンネルオプションで指定"}</td></tr><tr className="odd"><td>{"完全性"}</td><td>{"SHA-1 / SHA-2 系"}</td></tr><tr className="even"><td>{"DH グループ"}</td><td>{"複数選択可(より強いグループを選ぶ)"}</td></tr><tr className="odd"><td>{"認証"}</td><td><strong>{"事前共有キー(PSK)"}</strong>{" または "}<strong>{"証明書(AWS Private CA 発行)"}</strong></td></tr><tr className="even"><td>{"高速化"}</td><td><strong>{"Accelerated VPN"}</strong>{"(Global Accelerator を使い AWS のバックボーンへ早く入る。TGW が必要)"}</td></tr><tr className="odd"><td>{"ログ"}</td><td>{"トンネルログを "}<strong>{"CloudWatch Logs"}</strong>{" に出力"}</td></tr></tbody></table></div>
{"\n"}
<div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label"><strong>{"ベストプラクティス"}</strong></div>{"\n"}<ul>{"\n"}<li><strong>{"強い暗号アルゴリズム(AES-256、SHA-2、強い DH グループ、IKEv2)"}</strong>{" のみに制限する。"}</li>{"\n"}<li>{"顧客ゲートウェイ(機器)の冗長化には、"}<strong>{"顧客ゲートウェイごとに 1 本ずつ、計 2 本の Site-to-Site VPN 接続"}</strong>{" を作成し、各接続で "}<strong>{"2 本のトンネルをどちらも設定"}</strong>{" する(機器障害にも耐える)。"}</li>{"\n"}<li>{"証明書認証を使うと "}<strong>{"PSK の管理負担が減る"}</strong>{"(ACM Private CA と連携)。"}</li>{"\n"}<li>{"CloudWatch の "}<code>{"TunnelState"}</code>{" でトンネルダウンを監視する。"}</li>{"\n"}</ul>{"\n"}</div></div>
{"\n"}
<h3 id="s16-2" tabIndex={-1}>{"16-2. Direct Connect + 暗号化"}</h3>
{"\n"}
<p><strong>{"Direct Connect は専用線ですが、既定では暗号化されません。"}</strong>{" 暗号化が必要な場合は次の 3 つです。"}</p>
{"\n"}
<div className="table-scroll" role="region" tabIndex={0} aria-label={"16-2. Direct Connect + 暗号化（表45）"}><table><thead><tr className="header"><th scope="col">{"方式"}</th><th scope="col">{"暗号化レイヤー"}</th><th scope="col">{"仕組み"}</th><th scope="col">{"向いているケース"}</th></tr></thead><tbody><tr className="odd"><td><strong>{"MACsec"}</strong></td><td><strong>{"L2"}</strong>{"(イーサネット)"}</td><td><strong>{"専用接続(Dedicated)"}</strong>{" のお客様機器 ⇔ AWS の DX ロケーション機器の間を暗号化。MACsec 対応ポート(高速ポート)と対応機器が必要。鍵は CKN/CAK で管理"}</td><td>{"高スループット・低レイテンシで暗号化したい("}<strong>{"ライン速度で暗号化"}</strong>{")"}</td></tr><tr className="even"><td><strong>{"パブリック VIF 上の IPsec VPN"}</strong></td><td><strong>{"L3"}</strong></td><td>{"DX のパブリック VIF 経由で "}<strong>{"VPN のパブリックエンドポイント"}</strong>{" へ IPsec を張る"}</td><td>{"既存の DX で VPN を重ねたい"}</td></tr><tr className="odd"><td><strong>{"Private IP VPN(DX のトランジット VIF 上)"}</strong></td><td><strong>{"L3"}</strong></td><td><strong>{"TGW のプライベート IP VPN"}</strong>{"。VPN の外側 IP にもプライベート IP を使い、"}<strong>{"インターネットに出ずに"}</strong>{" IPsec"}</td><td>{"通信を完全にプライベートに保ちつつ暗号化したい"}</td></tr></tbody></table></div>
{"\n"}
<Diagram id="diag-25" label={"16-2. Direct Connect + 暗号化"} />
{"\n"}
<div className="table-scroll" role="region" tabIndex={0} aria-label={"16-2. Direct Connect + 暗号化（表46）"}><table><thead><tr className="header"><th scope="col">{"比較"}</th><th scope="col">{"MACsec"}</th><th scope="col">{"VPN over DX"}</th></tr></thead><tbody><tr className="odd"><td>{"暗号化の範囲"}</td><td><strong>{"DX 区間(お客様機器⇔AWS の DX 機器)の L2"}</strong></td><td><strong>{"終端間(オンプレ ⇔ VGW/TGW)の IPsec(L3)"}</strong></td></tr><tr className="even"><td>{"スループット"}</td><td>{"高い(ライン速度)"}</td><td>{"VPN トンネルあたりの上限あり(複数トンネル + ECMP で拡張)"}</td></tr><tr className="odd"><td>{"要件"}</td><td>{"専用接続 + 対応機器"}</td><td>{"VGW/TGW、VPN 設定"}</td></tr></tbody></table></div>
{"\n"}
<div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label"><strong>{"ベストプラクティス"}</strong></div>{"\n"}<ul>{"\n"}<li>{"DX は "}<strong>{"冗長構成(複数ロケーション・複数接続)"}</strong>{" にし、"}<strong>{"VPN を DX のバックアップ"}</strong>{" として併用(暗号化が必要な場合は VPN 自体の暗号化も確認)。"}</li>{"\n"}<li>{"MACsec の "}<strong>{"CKN/CAK は Secrets Manager 等で安全に管理"}</strong>{"し、定期的にローテーションする。"}</li>{"\n"}</ul>{"\n"}</div></div>
{"\n"}
<p><strong>{"根拠 URL"}</strong></p>
{"\n"}
<ul>{"\n"}<li>{"Site-to-Site VPN: "}<a href="https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html">{"https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html"}</a></li>{"\n"}<li>{"VPN トンネルオプション: "}<a href="https://docs.aws.amazon.com/vpn/latest/s2svpn/VPNTunnels.html">{"https://docs.aws.amazon.com/vpn/latest/s2svpn/VPNTunnels.html"}</a></li>{"\n"}<li>{"Direct Connect の MACsec: "}<a href="https://docs.aws.amazon.com/directconnect/latest/UserGuide/MACsec.html">{"https://docs.aws.amazon.com/directconnect/latest/UserGuide/MACsec.html"}</a></li>{"\n"}<li>{"Private IP VPN over Direct Connect: "}<a href="https://docs.aws.amazon.com/vpn/latest/s2svpn/private-ip-dx.html">{"https://docs.aws.amazon.com/vpn/latest/s2svpn/private-ip-dx.html"}</a></li>{"\n"}<li>{"AWS Direct Connect + VPN(ホワイトペーパー): "}<a href="https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/aws-direct-connect-plus-vpn-network-to-amazon.html">{"https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/aws-direct-connect-plus-vpn-network-to-amazon.html"}</a></li>{"\n"}</ul>
{"\n"}
<p><a id="p17"></a></p>
{"\n"}
<h2 id="sec-76" tabIndex={-1}>{"17. TLS 終端と各サービスでの転送中データ暗号化"}</h2>
{"\n"}
<blockquote>{"\n"}<p><strong>{"Skills"}</strong>{": Implementing network encryption methods to meet application compliance requirements (for example, IPsec, TLS) / Implementing encryption solutions to secure data in transit"}</p>{"\n"}</blockquote>
{"\n"}
<h3 id="s17-1" tabIndex={-1}>{"17-1. TLS 終端パターン"}</h3>
{"\n"}
<Diagram id="diag-26" label={"17-1. TLS 終端パターン"} />
{"\n"}
<div className="table-scroll" role="region" tabIndex={0} aria-label={"17-1. TLS 終端パターン（表47）"}><table><thead><tr className="header"><th scope="col">{"パターン"}</th><th scope="col">{"使いどころ"}</th></tr></thead><tbody><tr className="odd"><td>{"A. ALB で終端"}</td><td>{"一般的な Web。WAF 適用・ヘッダーベースのルーティングが必要"}</td></tr><tr className="even"><td>{"B. 再暗号化"}</td><td><strong>{"コンプライアンス上「VPC 内も暗号化」が必須"}</strong>{"。WAF の検査も維持したい"}</td></tr><tr className="odd"><td>{"C. NLB パススルー"}</td><td>{"非 HTTP プロトコル、"}<strong>{"クライアント証明書をターゲットで検証"}</strong>{"、ターゲットで復号したい"}</td></tr><tr className="even"><td>{"NLB の TLS リスナー"}</td><td>{"NLB で終端(ACM 証明書)してオフロードしたい"}</td></tr></tbody></table></div>
{"\n"}
<h3 id="s17-2" tabIndex={-1}>{"17-2. 各サービスでの暗号化ポイント"}</h3>
{"\n"}
<div className="table-scroll" role="region" tabIndex={0} aria-label={"17-2. 各サービスでの暗号化ポイント（表48）"}><table><thead><tr className="header"><th scope="col">{"サービス"}</th><th scope="col">{"実装"}</th><th scope="col">{"ベストプラクティス"}</th></tr></thead><tbody><tr className="odd"><td><strong>{"CloudFront"}</strong></td><td><strong>{"ビューワープロトコルポリシー"}</strong>{"(HTTP を HTTPS にリダイレクト / HTTPS のみ)、"}<strong>{"オリジンプロトコルポリシー"}</strong>{"(HTTPS のみ)、最小 TLS バージョン(セキュリティポリシー)、フィールドレベル暗号化、OAC(S3 オリジン保護)"}</td><td>{"カスタムドメインの証明書は "}<strong>{"ACM の米国東部バージニア北部リージョン"}</strong>{" で発行"}</td></tr><tr className="even"><td><strong>{"ALB"}</strong></td><td>{"HTTPS リスナー、"}<strong>{"セキュリティポリシー"}</strong>{"(例: TLS 1.2 以上 / TLS 1.3 対応ポリシー)、"}<strong>{"SNI で複数証明書"}</strong>{"、"}<strong>{"mTLS"}</strong>{"(クライアント証明書検証。検証モード/パススルー)"}</td><td>{"HTTP→HTTPS の "}<strong>{"リダイレクトルール"}</strong>{"、古い TLS/暗号スイートを無効にするポリシー"}</td></tr><tr className="odd"><td><strong>{"NLB"}</strong></td><td>{"TLS リスナー(ACM 証明書、ALPN、SNI)、または TCP/TLS パススルー"}</td><td>{"極低遅延・固定 IP が必要な暗号化通信に"}</td></tr><tr className="even"><td><strong>{"S3"}</strong></td><td><strong>{"HTTPS のみ許可するバケットポリシー"}</strong>{"("}<code>{"aws:SecureTransport"}</code>{")、エンドポイント経由"}</td><td><code>{"Deny"}</code>{" + "}<code>{"aws:SecureTransport = false"}</code></td></tr><tr className="odd"><td><strong>{"RDS / Aurora"}</strong></td><td>{"接続の "}<strong>{"SSL/TLS 必須化"}</strong>{"(PostgreSQL: "}<code>{"rds.force_ssl"}</code>{"、MySQL: "}<code>{"require_secure_transport"}</code>{")、CA 証明書の更新管理"}</td><td>{"アプリ側でも "}<strong>{"CA 検証"}</strong>{" を有効にする"}</td></tr><tr className="even"><td><strong>{"Redshift / DynamoDB 等"}</strong></td><td>{"Redshift: "}<code>{"require_ssl"}</code>{" パラメータ。DynamoDB は常に HTTPS"}</td><td>{"パラメータグループで強制"}</td></tr><tr className="odd"><td><strong>{"Transit Gateway"}</strong></td><td>{"VPN アタッチメントは IPsec。VPC アタッチメント間で "}<strong>{"VPC Encryption Controls"}</strong>{" を使う場合は、"}<strong>{"TGW 側で暗号化サポートを明示的に有効化"}</strong>{" する必要があり、アタッチした VPC 間の通信が暗号化されるかは "}<strong>{"公式ドキュメントのエンフォースモードの条件"}</strong>{" に依存する。これとは別の手段として "}<strong>{"アプリ層 TLS"}</strong>{" で暗号化する"}</td><td>{"暗号化要件がある場合は上記で担保"}</td></tr><tr className="even"><td><strong>{"EC2 上の独自アプリ"}</strong></td><td>{"アプリの TLS(nginx 等)、"}<strong>{"ACM for Nitro Enclaves"}</strong>{"、Private CA 発行の証明書"}</td><td>{"証明書の自動更新を設計に組み込む"}</td></tr></tbody></table></div>
{"\n"}
<div className="code-sample" data-lang="json"><div className="highlight"><div className="code-block" role="region" tabIndex={0} aria-label={"17-2. 各サービスでの暗号化ポイント（コード13）"}>
<div className="code-line"><span className="p">{"{"}</span></div>
<div className="code-line"><span className="w">{"  "}</span><span className="nt">{"\"Version\""}</span><span className="p">{":"}</span><span className="w">{" "}</span><span className="s2">{"\"2012-10-17\""}</span><span className="p">{","}</span></div>
<div className="code-line"><span className="w">{"  "}</span><span className="nt">{"\"Statement\""}</span><span className="p">{":"}</span><span className="w">{" "}</span><span className="p">{"["}</span></div>
<div className="code-line"><span className="w">{"    "}</span><span className="p">{"{"}</span></div>
<div className="code-line"><span className="w">{"      "}</span><span className="nt">{"\"Sid\""}</span><span className="p">{":"}</span><span className="w">{" "}</span><span className="s2">{"\"DenyInsecureTransport\""}</span><span className="p">{","}</span></div>
<div className="code-line"><span className="w">{"      "}</span><span className="nt">{"\"Effect\""}</span><span className="p">{":"}</span><span className="w">{" "}</span><span className="s2">{"\"Deny\""}</span><span className="p">{","}</span></div>
<div className="code-line"><span className="w">{"      "}</span><span className="nt">{"\"Principal\""}</span><span className="p">{":"}</span><span className="w">{" "}</span><span className="s2">{"\"*\""}</span><span className="p">{","}</span></div>
<div className="code-line"><span className="w">{"      "}</span><span className="nt">{"\"Action\""}</span><span className="p">{":"}</span><span className="w">{" "}</span><span className="s2">{"\"s3:*\""}</span><span className="p">{","}</span></div>
<div className="code-line"><span className="w">{"      "}</span><span className="nt">{"\"Resource\""}</span><span className="p">{":"}</span><span className="w">{" "}</span><span className="p">{"["}</span><span className="s2">{"\"arn:aws:s3:::my-bucket\""}</span><span className="p">{","}</span><span className="w">{" "}</span><span className="s2">{"\"arn:aws:s3:::my-bucket/*\""}</span><span className="p">{"],"}</span></div>
<div className="code-line"><span className="w">{"      "}</span><span className="nt">{"\"Condition\""}</span><span className="p">{":"}</span><span className="w">{" "}</span><span className="p">{"{"}</span><span className="w">{" "}</span><span className="nt">{"\"Bool\""}</span><span className="p">{":"}</span><span className="w">{" "}</span><span className="p">{"{"}</span><span className="w">{" "}</span><span className="nt">{"\"aws:SecureTransport\""}</span><span className="p">{":"}</span><span className="w">{" "}</span><span className="s2">{"\"false\""}</span><span className="w">{" "}</span><span className="p">{"}"}</span><span className="w">{" "}</span><span className="p">{"}"}</span></div>
<div className="code-line"><span className="w">{"    "}</span><span className="p">{"}"}</span></div>
<div className="code-line"><span className="w">{"  "}</span><span className="p">{"]"}</span></div>
<div className="code-line"><span className="p">{"}"}</span></div>
</div></div>{"\n"}</div>
{"\n"}
<div className="code-sample" data-lang="bash"><div className="highlight"><div className="code-block" role="region" tabIndex={0} aria-label={"17-2. 各サービスでの暗号化ポイント（コード14）"}>
<div className="code-line"><span className="c1">{"# ALB のリスナーを TLS 1.3 対応のセキュリティポリシーで作成する例"}</span></div>
<div className="code-line">{"aws"}<span className="w">{" "}</span>{"elbv2"}<span className="w">{" "}</span>{"create-listener"}<span className="w">{" "}</span><span className="se">{"\\"}</span></div>
<div className="code-line"><span className="w">{"  "}</span>{"--load-balancer-arn"}<span className="w">{" "}</span>{"arn:aws:elasticloadbalancing:ap-northeast-1:111122223333:loadbalancer/app/my-alb/xxxx"}<span className="w">{" "}</span><span className="se">{"\\"}</span></div>
<div className="code-line"><span className="w">{"  "}</span>{"--protocol"}<span className="w">{" "}</span>{"HTTPS"}<span className="w">{" "}</span>{"--port"}<span className="w">{" "}</span><span className="m">{"443"}</span><span className="w">{" "}</span><span className="se">{"\\"}</span></div>
<div className="code-line"><span className="w">{"  "}</span>{"--ssl-policy"}<span className="w">{" "}</span>{"ELBSecurityPolicy-TLS13-1-2-2021-06"}<span className="w">{" "}</span><span className="se">{"\\"}</span></div>
<div className="code-line"><span className="w">{"  "}</span>{"--certificates"}<span className="w">{" "}</span><span className="nv">{"CertificateArn"}</span><span className="o">{"="}</span>{"arn:aws:acm:ap-northeast-1:111122223333:certificate/abcd-1234"}<span className="w">{" "}</span><span className="se">{"\\"}</span></div>
<div className="code-line"><span className="w">{"  "}</span>{"--default-actions"}<span className="w">{" "}</span><span className="nv">{"Type"}</span><span className="o">{"="}</span>{"forward,TargetGroupArn"}<span className="o">{"="}</span>{"arn:aws:elasticloadbalancing:ap-northeast-1:111122223333:targetgroup/my-tg/yyyy"}</div>
</div></div>{"\n"}</div>
{"\n"}
<h3 id="s17-3" tabIndex={-1}>{"17-3. クライアント接続(参考)"}</h3>
{"\n"}
<div className="table-scroll" role="region" tabIndex={0} aria-label={"17-3. クライアント接続(参考)（表49）"}><table><thead><tr className="header"><th scope="col">{"方式"}</th><th scope="col">{"暗号化"}</th><th scope="col">{"認証"}</th></tr></thead><tbody><tr className="odd"><td><strong>{"AWS Client VPN"}</strong></td><td>{"TLS(OpenVPN)"}</td><td>{"Active Directory、相互証明書、SAML(IdP 連携)"}</td></tr></tbody></table></div>
{"\n"}
<p><strong>{"根拠 URL"}</strong></p>
{"\n"}
<ul>{"\n"}<li>{"ALB の HTTPS リスナー / セキュリティポリシー: "}<a href="https://docs.aws.amazon.com/elasticloadbalancing/latest/application/describe-ssl-policies.html">{"https://docs.aws.amazon.com/elasticloadbalancing/latest/application/describe-ssl-policies.html"}</a></li>{"\n"}<li>{"ALB の相互 TLS: "}<a href="https://docs.aws.amazon.com/elasticloadbalancing/latest/application/mutual-authentication.html">{"https://docs.aws.amazon.com/elasticloadbalancing/latest/application/mutual-authentication.html"}</a></li>{"\n"}<li>{"NLB の TLS リスナー: "}<a href="https://docs.aws.amazon.com/elasticloadbalancing/latest/network/create-tls-listener.html">{"https://docs.aws.amazon.com/elasticloadbalancing/latest/network/create-tls-listener.html"}</a></li>{"\n"}<li>{"CloudFront での HTTPS: "}<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-https.html">{"https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-https.html"}</a></li>{"\n"}<li>{"S3 のセキュリティベストプラクティス: "}<a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html">{"https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html"}</a></li>{"\n"}<li>{"RDS の SSL/TLS: "}<a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.SSL.html">{"https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.SSL.html"}</a></li>{"\n"}<li>{"Client VPN: "}<a href="https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/what-is.html">{"https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/what-is.html"}</a></li>{"\n"}</ul>
{"\n"}
<p><a id="p18"></a></p>
{"\n"}
<h2 id="sec-80" tabIndex={-1}>{"18. 証明書管理(ACM / AWS Private CA)"}</h2>
{"\n"}
<blockquote>{"\n"}<p><strong>{"Skills"}</strong>{": Implementing a certificate management solution by using a certificate authority (for example, ACM, AWS Private Certificate Authority [ACM PCA])"}</p>{"\n"}</blockquote>
{"\n"}
<h3 id="s18-1" tabIndex={-1}>{"18-1. サービスの違い"}</h3>
{"\n"}
<div className="table-scroll" role="region" tabIndex={0} aria-label={"18-1. サービスの違い（表50）"}><table><thead><tr className="header"><th scope="col">{"項目"}</th><th scope="col"><strong>{"AWS Certificate Manager(ACM)"}</strong></th><th scope="col"><strong>{"AWS Private CA"}</strong></th></tr></thead><tbody><tr className="odd"><td>{"役割"}</td><td>{"証明書の発行・デプロイ・更新"}</td><td><strong>{"プライベート認証局(CA)を運用"}</strong></td></tr><tr className="even"><td>{"証明書の種類"}</td><td><strong>{"パブリック証明書"}</strong>{"(ブラウザが信頼)/ ACM 経由のプライベート証明書"}</td><td><strong>{"プライベート証明書"}</strong>{"(自社内でのみ信頼)"}</td></tr><tr className="odd"><td>{"料金"}</td><td>{"パブリック証明書は "}<strong>{"無料"}</strong>{"(統合サービス用)"}</td><td>{"CA ごとの月額 + 証明書ごとの料金"}</td></tr><tr className="even"><td>{"検証"}</td><td><strong>{"DNS 検証(推奨)"}</strong>{" / メール検証"}</td><td>{"CA が自社ポリシーで発行"}</td></tr><tr className="odd"><td>{"用途"}</td><td>{"ALB・NLB・CloudFront・API Gateway などの TLS"}</td><td>{"社内サービス、mTLS、VPN の証明書認証、IoT、サーバー/デバイス認証"}</td></tr></tbody></table></div>
{"\n"}
<h3 id="s18-2" tabIndex={-1}>{"18-2. ACM の重要ポイント(試験頻出)"}</h3>
{"\n"}
<ul>{"\n"}<li><strong>{"リージョンサービス"}</strong>{": ELB 用は "}<strong>{"そのリージョンで発行"}</strong>{"。"}<strong>{"CloudFront 用は米国東部バージニア北部リージョンで発行"}</strong>{"。"}</li>{"\n"}<li><strong>{"自動更新"}</strong>{": ACM が発行した証明書は、"}<strong>{"DNS 検証レコードが残っていて、かつ AWS のサービスに関連付けられている場合に自動更新"}</strong>{"。"}<strong>{"インポートした証明書は自動更新されない"}</strong>{"(更新と再インポートが必要)。"}</li>{"\n"}<li><strong>{"統合サービス"}</strong>{": ELB、CloudFront、API Gateway、Elastic Beanstalk、App Runner など。"}<strong>{"EC2 に直接インストールはできない"}</strong>{"(通常。Nitro Enclaves 向けなどの例外あり。最新の「エクスポート可能なパブリック証明書」機能は公式ドキュメントで条件を確認)。"}</li>{"\n"}<li><strong>{"有効期限の監視"}</strong>{": "}<strong>{"EventBridge の ACM 期限切れ間近イベント"}</strong>{"、"}<strong>{"CloudWatch メトリクス "}<code>{"DaysToExpiry"}</code></strong>{"、"}<strong>{"Config ルール "}<code>{"acm-certificate-expiration-check"}</code></strong>{"。"}</li>{"\n"}</ul>
{"\n"}
<h3 id="s18-3" tabIndex={-1}>{"18-3. AWS Private CA の階層設計"}</h3>
{"\n"}
<Diagram id="diag-27" label={"18-3. AWS Private CA の階層設計"} />
{"\n"}
<div className="table-scroll" role="region" tabIndex={0} aria-label={"18-3. AWS Private CA の階層設計（表51）"}><table><thead><tr className="header"><th scope="col">{"項目"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className="odd"><td>{"階層"}</td><td><strong>{"ルート CA"}</strong>{" と "}<strong>{"下位 CA"}</strong>{"。"}<strong>{"ルート CA は日常の発行に使わず"}</strong>{"、下位 CA が発行する(ルートの露出を最小化)"}</td></tr><tr className="even"><td>{"CA モード"}</td><td>{"一般用途 / "}<strong>{"短期証明書モード"}</strong>{"(有効期間が短い証明書を大量発行。失効管理が不要になる)"}</td></tr><tr className="odd"><td>{"失効"}</td><td><strong>{"CRL(S3 に公開)"}</strong>{" または "}<strong>{"OCSP"}</strong></td></tr><tr className="even"><td>{"共有"}</td><td><strong>{"AWS RAM"}</strong>{" でアカウント/組織間に CA を共有し、各アカウントから発行"}</td></tr><tr className="odd"><td>{"統合"}</td><td><strong>{"ACM"}</strong>{"(プライベート証明書の発行・自動更新)、"}<strong>{"Site-to-Site VPN の証明書認証"}</strong>{"、"}<strong>{"Kubernetes(cert-manager)"}</strong>{"、Active Directory / SCEP コネクタ、IoT"}</td></tr><tr className="even"><td>{"監査"}</td><td>{"監査レポート(発行・失効の記録)を S3 に出力、CloudTrail で API を記録"}</td></tr><tr className="odd"><td>{"保護"}</td><td>{"CA の秘密鍵は AWS が "}<strong>{"FIPS 140 検証済みの HSM"}</strong>{" で保護"}</td></tr></tbody></table></div>
{"\n"}
<h3 id="s18-4" tabIndex={-1}>{"18-4. 証明書戦略の選び方"}</h3>
{"\n"}
<Diagram id="diag-28" label={"18-4. 証明書戦略の選び方"} />
{"\n"}
<div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label"><strong>{"ベストプラクティス"}</strong></div>{"\n"}<ol>{"\n"}<li><strong>{"DNS 検証 + Route 53 の CNAME 自動作成"}</strong>{" で、更新を完全自動化する。"}</li>{"\n"}<li><strong>{"ルート CA はオフライン運用に近い扱い"}</strong>{"(使う頻度を最小化)、"}<strong>{"下位 CA で発行"}</strong>{"。"}</li>{"\n"}<li>{"内部通信の mTLS・VPN 証明書は "}<strong>{"Private CA で一元化"}</strong>{" し、短期証明書で失効管理を簡素化する。"}</li>{"\n"}<li><strong>{"証明書の期限切れ監視"}</strong>{" を EventBridge / Config で必ず設定する。"}</li>{"\n"}<li>{"組織全体で使う場合は "}<strong>{"RAM で Private CA を共有"}</strong>{"。"}</li>{"\n"}</ol>{"\n"}</div></div>
{"\n"}
<p><strong>{"根拠 URL"}</strong></p>
{"\n"}
<ul>{"\n"}<li>{"ACM: "}<a href="https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html">{"https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html"}</a></li>{"\n"}<li>{"ACM の更新: "}<a href="https://docs.aws.amazon.com/acm/latest/userguide/managed-renewal.html">{"https://docs.aws.amazon.com/acm/latest/userguide/managed-renewal.html"}</a></li>{"\n"}<li>{"ACM の統合サービス: "}<a href="https://docs.aws.amazon.com/acm/latest/userguide/acm-services.html">{"https://docs.aws.amazon.com/acm/latest/userguide/acm-services.html"}</a></li>{"\n"}<li>{"AWS Private CA: "}<a href="https://docs.aws.amazon.com/privateca/latest/userguide/PcaWelcome.html">{"https://docs.aws.amazon.com/privateca/latest/userguide/PcaWelcome.html"}</a></li>{"\n"}<li>{"短期証明書 CA モード: "}<a href="https://docs.aws.amazon.com/privateca/latest/userguide/short-lived-certificates.html">{"https://docs.aws.amazon.com/privateca/latest/userguide/short-lived-certificates.html"}</a></li>{"\n"}<li>{"CA 階層の計画: "}<a href="https://docs.aws.amazon.com/privateca/latest/userguide/ca-hierarchy.html">{"https://docs.aws.amazon.com/privateca/latest/userguide/ca-hierarchy.html"}</a></li>{"\n"}<li>{"証明書失効(CRL / OCSP): "}<a href="https://docs.aws.amazon.com/privateca/latest/userguide/revocation-setup.html">{"https://docs.aws.amazon.com/privateca/latest/userguide/revocation-setup.html"}</a></li>{"\n"}</ul>
{"\n"}
<p><a id="p19"></a></p>
{"\n"}
<h2 id="sec-85" tabIndex={-1}>{"19. DNS のセキュリティ"}</h2>
{"\n"}
<blockquote>{"\n"}<p><strong>{"Knowledge"}</strong>{": Security methods for DNS communications (for example, DNSSEC) / "}<strong>{"Skills"}</strong>{": Implementing secure DNS communications"}</p>{"\n"}</blockquote>
{"\n"}
<h3 id="s19-1" tabIndex={-1}>{"19-1. DNSSEC とは"}</h3>
{"\n"}
<p>{"DNS の応答に "}<strong>{"デジタル署名"}</strong>{" を付け、"}<strong>{"応答が改ざんされていないこと・正当なサーバーからのものであること"}</strong>{" を検証できるようにする仕組みです("}<strong>{"なりすまし・キャッシュポイズニング対策"}</strong>{")。DNSSEC は "}<strong>{"署名による完全性/真正性"}</strong>{" であり、"}<strong>{"通信内容の暗号化(盗聴防止)ではありません"}</strong>{"。"}</p>
{"\n"}
<Diagram id="diag-29" label={"19-1. DNSSEC とは"} />
{"\n"}
<h3 id="s19-2" tabIndex={-1}>{"19-2. Route 53 での DNSSEC 署名の手順"}</h3>
{"\n"}
<div className="table-scroll" role="region" tabIndex={0} aria-label={"19-2. Route 53 での DNSSEC 署名の手順（表52）"}><table><thead><tr className="header"><th scope="col">{"ステップ"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className="odd"><td>{"1"}</td><td><strong>{"KMS で非対称カスタマー管理キー"}</strong>{" を作成。"}<strong>{"米国東部バージニア北部(us-east-1)リージョン"}</strong>{"、"}<strong>{"ECC_NIST_P256"}</strong>{"、署名/検証用途。"}<strong>{"キーポリシーで Route 53("}<code>{"dnssec-route53.amazonaws.com"}</code>{")の利用を許可"}</strong></td></tr><tr className="even"><td>{"2"}</td><td>{"ホストゾーンで "}<strong>{"DNSSEC 署名を有効化"}</strong>{" し、"}<strong>{"KSK(鍵署名鍵)"}</strong>{" を KMS キーから作成(ZSK は Route 53 が管理)"}</td></tr><tr className="odd"><td>{"3"}</td><td>{"親ゾーン(TLD)に "}<strong>{"DS レコードを登録"}</strong>{"(レジストラ側。Route 53 をレジストラにしている場合はコンソール/API で登録)"}</td></tr><tr className="even"><td>{"4"}</td><td><strong>{"CloudWatch メトリクス/アラーム"}</strong>{" を設定("}<code>{"DNSSECInternalFailure"}</code>{"、"}<code>{"DNSSECKeySigningKeysNeedingAction"}</code>{")"}</td></tr></tbody></table></div>
{"\n"}
<p><strong>{"重要な制約・注意点"}</strong></p>
{"\n"}
<ul>{"\n"}<li>{"対象は "}<strong>{"パブリックホストゾーン"}</strong>{"("}<strong>{"プライベートホストゾーンの DNSSEC 署名は非対応"}</strong>{")。"}</li>{"\n"}<li><strong>{"DS レコードを親に登録しないとチェーン・オブ・トラストが成立しない"}</strong>{"。"}</li>{"\n"}<li>{"DNSSEC の "}<strong>{"無効化手順は順序が重要"}</strong>{"(先に DS レコードを削除し、TTL の経過を待ってから署名を無効化。順序を誤ると名前解決できなくなる)。"}</li>{"\n"}<li>{"KMS キーを "}<strong>{"無効化・削除すると署名できず障害"}</strong>{" になる。キーの管理を厳重にする。"}</li>{"\n"}</ul>
{"\n"}
<h3 id="s19-3" tabIndex={-1}>{"19-3. Route 53 Resolver の DNSSEC 検証"}</h3>
{"\n"}
<p>{"VPC 内のクライアントの DNS 問い合わせについて、"}<strong>{"Route 53 Resolver で DNSSEC 検証を有効化"}</strong>{" できます。署名の検証に失敗した応答は "}<strong>{"SERVFAIL"}</strong>{" になります。"}</p>
{"\n"}
<h3 id="s19-4" tabIndex={-1}>{"19-4. 安全な DNS 通信の全体設計"}</h3>
{"\n"}
<Diagram id="diag-30" label={"19-4. 安全な DNS 通信の全体設計"} />
{"\n"}
<div className="table-scroll" role="region" tabIndex={0} aria-label={"19-4. 安全な DNS 通信の全体設計（表53）"}><table><thead><tr className="header"><th scope="col">{"対策"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className="odd"><td><strong>{"DNSSEC(署名)"}</strong></td><td>{"パブリックゾーンの応答の完全性を保証"}</td></tr><tr className="even"><td><strong>{"Resolver の DNSSEC 検証"}</strong></td><td>{"VPC のクライアントが受け取る応答を検証"}</td></tr><tr className="odd"><td><strong>{"DNS Firewall"}</strong></td><td>{"悪性/不許可ドメインの名前解決を遮断、DGA・トンネリング検出"}</td></tr><tr className="even"><td><strong>{"クエリログ"}</strong></td><td>{"不審な問い合わせの調査・GuardDuty との連携"}</td></tr><tr className="odd"><td><strong>{"Resolver エンドポイントの SG"}</strong></td><td>{"インバウンド/アウトバウンドエンドポイントの ENI に SG を設定し、"}<strong>{"DNS(UDP/TCP 53)のみを許可元に限定"}</strong></td></tr><tr className="even"><td><strong>{"外部リゾルバーの禁止"}</strong></td><td>{"NACL / Network Firewall で外部 DNS への 53 番ポートを遮断"}</td></tr><tr className="odd"><td><strong>{"プライベートホストゾーン"}</strong></td><td>{"内部名をインターネットに露出しない(スプリットホライズン)"}</td></tr><tr className="even"><td><strong>{"Resolver ルールの共有(RAM)"}</strong></td><td>{"転送ルールを組織で一元管理し、設定ミスを防ぐ"}</td></tr></tbody></table></div>
{"\n"}
<div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label"><strong>{"ベストプラクティス"}</strong></div>{"\n"}<ol>{"\n"}<li>{"パブリックゾーンは "}<strong>{"DNSSEC を検討"}</strong>{"(特に金融・公共・高保証の要件)。"}<strong>{"KMS キーの保護と監視"}</strong>{" を必須にする。"}</li>{"\n"}<li>{"すべての VPC で "}<strong>{"Resolver クエリログと DNS Firewall"}</strong>{" を有効化(Firewall Manager で一括)。"}</li>{"\n"}<li>{"DNS を "}<strong>{"Route 53 Resolver に一本化"}</strong>{" し、外部リゾルバーへの直接アクセスを遮断する。"}</li>{"\n"}<li>{"ハイブリッド環境では "}<strong>{"Resolver エンドポイントを複数 AZ に配置"}</strong>{"(最低 2 AZ)。"}</li>{"\n"}</ol>{"\n"}</div></div>
{"\n"}
<p><strong>{"根拠 URL"}</strong></p>
{"\n"}
<ul>{"\n"}<li>{"Route 53 の DNSSEC 署名の設定: "}<a href="https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-configuring-dnssec.html">{"https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-configuring-dnssec.html"}</a></li>{"\n"}<li>{"DNSSEC 署名の KMS キー要件: "}<a href="https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-configuring-dnssec-cmk-requirements.html">{"https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-configuring-dnssec-cmk-requirements.html"}</a></li>{"\n"}<li>{"Route 53 Resolver の DNSSEC 検証: "}<a href="https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-dnssec-validation.html">{"https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-dnssec-validation.html"}</a></li>{"\n"}<li>{"Resolver エンドポイント: "}<a href="https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver.html">{"https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver.html"}</a></li>{"\n"}<li>{"Route 53 Resolver DNS Firewall: "}<a href="https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-dns-firewall.html">{"https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-dns-firewall.html"}</a></li>{"\n"}</ul>
{"\n"}
<p><a id="p20"></a></p>
{"\n"}
</div>;}
