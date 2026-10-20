import { Diagram } from '../Diagram';
/** 原本のtask1区分を全文保持する。 */
export default function Task21(){return <div className="guide-part" data-part="task1"><h2 id={"2-task-21-オンプレミスとawsのルーティングと接続"} tabIndex={-1}>{" 2. Task 2.1: オンプレミスとAWSのルーティングと接続 "}</h2>

<blockquote className={"note"}>{" "}<p>{" 試験ガイド: Implement routing and connectivity between on-premises networks and the AWS Cloud "}</p>{" "}</blockquote>

<h3 id={"21-ハイブリッド接続の全体像"} tabIndex={-1}>{"2.1 ハイブリッド接続の全体像"}</h3>

<p>{"オンプレミスとAWSを繋ぐ主な手段は3つです。"}</p>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"2.1 ハイブリッド接続の全体像（表6）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"手段"}</th><th scope="col">{"通信経路"}</th><th scope="col">{"帯域"}</th><th scope="col">{"暗号化"}</th><th scope="col">{"開通までの時間"}</th><th scope="col">{"主な用途"}</th></tr></thead><tbody><tr className={"odd"}><td>{"Site-to-Site VPN"}</td><td>{"インターネット経由(IPsec)"}</td><td>{" 標準トンネルは1トンネルあたり最大1.25 Gbps。Large Bandwidth Tunnel(Transit Gateway / Cloud WAN接続時のみ)は1トンネルあたり最大5 Gbps。Large Bandwidth TunnelはAccelerated VPNと併用不可。1つのVPN接続の2トンネルは同じ帯域設定(両方標準、または両方Large Bandwidth)にする必要がある "}</td><td>{"IPsecで暗号化"}</td><td>{"数分〜数時間"}</td><td>{"素早い開通、バックアップ回線"}</td></tr><tr className={"even"}><td>{"Direct Connect"}</td><td>{"専用線(AWSバックボーン)"}</td><td>{"1/10/100/400 Gbps(専有)など"}</td><td>{"既定は暗号化なし(MACsec/VPN併用で暗号化)"}</td><td>{"数週間〜数か月"}</td><td>{"大容量、低遅延、安定した品質"}</td></tr><tr className={"odd"}><td>{"Direct Connect + VPN"}</td><td>{"専用線の上にIPsec"}</td><td>{"VPN側の上限に依存"}</td><td>{"暗号化あり"}</td><td>{"Direct Connect次第"}</td><td>{"専用線で暗号化も必須の場合"}</td></tr></tbody></table>{" "}</div>

<Diagram id="diag-3" label={"2.1 ハイブリッド接続の全体像"} />

<h3 id={"22-site-to-site-vpnipsec-vpn"} tabIndex={-1}>{"2.2 Site-to-Site VPN(IPsec VPN)"}</h3>

<h4>{"2.2.1 構成要素"}</h4>

<p>{" Site-to-Site VPN は、AWS側の終端(ゲートウェイ)とオンプレ側のカスタマーゲートウェイ(CGW)の間にIPsecトンネルを張ります。"}<strong>{"1つのVPN接続は、冗長化のため必ず2本のトンネル"}</strong>{"(別々のAZのエンドポイント)で構成されます。 "}</p>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"2.2.1 構成要素（表7）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"用語"}</th><th scope="col">{"説明"}</th></tr></thead><tbody><tr className={"odd"}><td>{"Virtual Private Gateway(VGW)"}</td><td>{"1つのVPCに付ける、AWS側のVPN終端"}</td></tr><tr className={"even"}><td>{"Transit Gateway(TGW)"}</td><td>{"複数VPCとVPN/DXを束ねるハブ。VPNの終端にもなる"}</td></tr><tr className={"odd"}><td>{"Customer Gateway(CGW)"}</td><td>{" オンプレ側のVPN装置を表すAWS上のリソース(IPアドレスとASNを登録) "}</td></tr><tr className={"even"}><td>{"トンネル"}</td><td>{"IPsecトンネル。1接続あたり2本(AWS側は別AZ)"}</td></tr></tbody></table>{" "}</div>

<h4>{"2.2.2 VGW と TGW の違い"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"2.2.2 VGW と TGW の違い（表8）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"観点"}</th><th scope="col">{"VGW 終端"}</th><th scope="col">{"TGW 終端"}</th></tr></thead><tbody><tr className={"odd"}><td>{"接続できるVPC"}</td><td>{"1つのVPC"}</td><td>{"多数のVPC(アタッチメント)"}</td></tr><tr className={"even"}><td>{"ECMP(複数トンネルの同時利用)"}</td><td>{"不可"}</td><td><strong>{"可能"}</strong>{"(BGP動的VPNのみ。帯域を束ねられる)"}</td></tr><tr className={"odd"}><td>{"帯域の考え方"}</td><td>{" 1トンネル最大1.25 Gbps。オンプレ→AWSは2本とも使えるが、AWS→オンプレは通常1本を優先して使う "}</td><td>{"ECMPで複数トンネル合算が可能"}</td></tr><tr className={"even"}><td>{"Accelerated VPN"}</td><td>{"不可"}</td><td><strong>{"可能"}</strong></td></tr><tr className={"odd"}><td>{"向く構成"}</td><td>{"小規模・単一VPC"}</td><td>{"ハブ&スポーク、大規模、帯域拡張"}</td></tr></tbody></table>{" "}</div>

<h4>{"2.2.3 静的ルーティング と 動的ルーティング(BGP)"}</h4>

<Diagram id="diag-4" label={"2.2.3 静的ルーティング と 動的ルーティング(BGP)"} />

<blockquote className={"note"}>{" "}<p>{" 試験の定番: 「BGPに対応していない古いオンプレ装置」→ 静的VPN、「1トンネルあたり最大5 Gbpsまで帯域を増やしたい」→ Transit Gateway または Cloud WAN に終端する Large Bandwidth Tunnel、「複数トンネルを束ねて合計帯域を増やしたい」→ TGW + BGP動的VPN + ECMP。 "}</p>{" "}</blockquote>

<h4>{"2.2.4 Accelerated VPN(高速化VPN)"}</h4>

<p>{" Accelerated Site-to-Site VPN は、通信を"}<strong>{"AWS Global Acceleratorのエッジロケーション"}</strong>{"経由でAWSバックボーンに乗せ、インターネット区間を短くして遅延・ジッターを減らす機能です。 "}</p>

<ul>{" "}<li>{" "}<strong>{"Transit Gateway に終端した接続のみ"}</strong>{"で利用できます(VGW終端では不可)。 "}</li>{" "}<li>{" 作成時に「アクセラレーション有効化」を選びます(あとから切替はできないため、作り直しが必要)。 "}</li>{" "}<li>{" アクセラレーターが割り当てるIPは、VPN接続ごとのトンネルエンドポイントになります。 "}</li>{" "}</ul>

<h4>{"2.2.5 VPNの設定項目(試験でよく問われる)"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"2.2.5 VPNの設定項目(試験でよく問われる)（表9）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"項目"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className={"odd"}><td>{"IKEバージョン"}</td><td>{"IKEv1 / IKEv2(IKEv2 推奨)"}</td></tr><tr className={"even"}><td>{"暗号化・認証・DHグループ"}</td><td>{" 既定は複数許可。"}<strong>{"トンネルオプションで厳格に制限可能"}</strong>{"(例: AES256、SHA2-256以上、DHグループ14以上) "}</td></tr><tr className={"odd"}><td>{"NAT-T(NATトラバーサル)"}</td><td>{"UDP 4500。オンプレ側がNAT配下の場合に必要"}</td></tr><tr className={"even"}><td>{"事前共有キー(PSK)"}</td><td>{" 既定は自動生成。Secrets Manager連携や証明書認証(ACM Private CA)も選択可能 "}</td></tr><tr className={"odd"}><td>{"トンネル内アドレス"}</td><td>{" "}<code>{"169.254.0.0/16"}</code>{" のリンクローカル "}<code>{"/30"}</code>{" "}</td></tr><tr className={"even"}><td>{"外側/内側のIPバージョン"}</td><td>{" VGWではIPv6トラフィック非対応。外側トンネルアドレスにIPv6を使うにはTransit GatewayまたはCloud WANが必要。1つのVPN接続でIPv4とIPv6のパケットを同時には運べない(両方必要ならVPN接続を分ける) "}</td></tr><tr className={"odd"}><td>{"DPD(Dead Peer Detection)"}</td><td>{" トンネル死活検知。タイムアウト時のアクション(clear / restart / none)を設定 "}</td></tr><tr className={"even"}><td>{"MTU"}</td><td>{" IPsecのオーバーヘッドで実効MTUが小さくなる。Site-to-Site VPN は "}<strong>{"PMTUD(Path MTU Discovery)に対応しない"}</strong>{"ため、使用する暗号スイートに合わせてオンプレ側の MTU / MSS を調整し、"}<strong>{"MSS clamping"}</strong>{" を検討する "}</td></tr></tbody></table>{" "}</div>

<p>{"構成の設定例(CLIでトンネルオプションを指定)です。"}</p>

<div className={"code-sample"}>{" "}<div className={"code-lang"}>{"bash"}</div>{" "}<div className="code-block highlight" role="region" tabIndex={0} aria-label={"2.2.5 VPNの設定項目(試験でよく問われる)（コード1）"}><div className="code-line"><span className={"c1"}>{"# BGP動的VPN接続をTGW終端で作成(トンネルオプションで暗号スイートを制限)"}</span></div>
<div className="code-line">{"aws"}<span className={"w"}>{" "}</span>{"ec2"}<span className={"w"}>{" "}</span>{"create-vpn-connection"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--type"}<span className={"w"}>{" "}</span>{"ipsec.1"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--customer-gateway-id"}<span className={"w"}>{" "}</span>{"cgw-0123456789abcdef0"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--transit-gateway-id"}<span className={"w"}>{" "}</span>{"tgw-0123456789abcdef0"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--options"}<span className={"w"}>{" "}</span><span className={"s1"}>{"'{"}</span></div>
<div className="code-line"><span className={"s1"}>{"    \"StaticRoutesOnly\": false,"}</span></div>
<div className="code-line"><span className={"s1"}>{"    \"EnableAcceleration\": true,"}</span></div>
<div className="code-line"><span className={"s1"}>{"    \"TunnelOptions\": ["}</span></div>
<div className="code-line"><span className={"s1"}>{"      {"}</span></div>
<div className="code-line"><span className={"s1"}>{"        \"IKEVersions\": [{\"Value\": \"ikev2\"}],"}</span></div>
<div className="code-line"><span className={"s1"}>{"        \"Phase1EncryptionAlgorithms\": [{\"Value\": \"AES256\"}],"}</span></div>
<div className="code-line"><span className={"s1"}>{"        \"Phase1IntegrityAlgorithms\": [{\"Value\": \"SHA2-256\"}],"}</span></div>
<div className="code-line"><span className={"s1"}>{"        \"Phase1DHGroupNumbers\": [{\"Value\": 14}],"}</span></div>
<div className="code-line"><span className={"s1"}>{"        \"Phase2EncryptionAlgorithms\": [{\"Value\": \"AES256\"}],"}</span></div>
<div className="code-line"><span className={"s1"}>{"        \"Phase2IntegrityAlgorithms\": [{\"Value\": \"SHA2-256\"}],"}</span></div>
<div className="code-line"><span className={"s1"}>{"        \"Phase2DHGroupNumbers\": [{\"Value\": 14}]"}</span></div>
<div className="code-line"><span className={"s1"}>{"      },"}</span></div>
<div className="code-line"><span className={"s1"}>{"      {"}</span></div>
<div className="code-line"><span className={"s1"}>{"        \"IKEVersions\": [{\"Value\": \"ikev2\"}],"}</span></div>
<div className="code-line"><span className={"s1"}>{"        \"Phase1EncryptionAlgorithms\": [{\"Value\": \"AES256\"}],"}</span></div>
<div className="code-line"><span className={"s1"}>{"        \"Phase1IntegrityAlgorithms\": [{\"Value\": \"SHA2-256\"}],"}</span></div>
<div className="code-line"><span className={"s1"}>{"        \"Phase1DHGroupNumbers\": [{\"Value\": 14}],"}</span></div>
<div className="code-line"><span className={"s1"}>{"        \"Phase2EncryptionAlgorithms\": [{\"Value\": \"AES256\"}],"}</span></div>
<div className="code-line"><span className={"s1"}>{"        \"Phase2IntegrityAlgorithms\": [{\"Value\": \"SHA2-256\"}],"}</span></div>
<div className="code-line"><span className={"s1"}>{"        \"Phase2DHGroupNumbers\": [{\"Value\": 14}]"}</span></div>
<div className="code-line"><span className={"s1"}>{"      }"}</span></div>
<div className="code-line"><span className={"s1"}>{"    ]"}</span></div>
<div className="code-line"><span className={"s1"}>{"  }'"}</span></div></div>{" "}</div>

<div className={"callout-practice"}>{" "}<div className={"icon"}>{"✓"}</div>{" "}<div className={"body"}>{" "}<div className={"label"}>{"2.2.6 ベストプラクティス(VPN)"}</div>{" "}<ol>{" "}<li>{" "}<strong>{"2本のトンネルを両方とも使えるようにオンプレ側を設定"}</strong>{"する(片方だけ設定すると冗長性がなくなる)。 "}</li>{" "}<li>{" 可能なら"}<strong>{"オンプレ側の装置も2台(CGW 2つ)"}</strong>{"にして装置障害に備える。 "}</li>{" "}<li>{" ルーティングは"}<strong>{"BGPを優先"}</strong>{"し、静的は互換性のためだけに使う。 "}</li>{" "}<li>{" 帯域が必要なら"}<strong>{"TGW + ECMP"}</strong>{"で複数のVPN接続を束ねる(ただしECMPは同一TGW・BGPのみ)。 "}</li>{" "}<li>{" 遅延の安定が必要なら"}<strong>{"Accelerated VPN"}</strong>{"、さらに通信が重要なら"}<strong>{"Direct Connect + VPNバックアップ"}</strong>{"。 "}</li>{" "}<li>{" トンネルオプションで"}<strong>{"暗号スイートを必要最小限に制限"}</strong>{"し、IKEv2を使う。 "}</li>{" "}<li>{" CloudWatchの "}<code>{"TunnelState"}</code>{" などのメトリクスとVPNログで"}<strong>{"トンネル状態を監視"}</strong>{"する。 "}</li>{" "}</ol>{" "}</div>{" "}</div>

<h3 id={"23-aws-direct-connect専用線接続"} tabIndex={-1}>{"2.3 AWS Direct Connect(専用線接続)"}</h3>

<h4>{"2.3.1 レイヤー1: 物理接続の流れ"}</h4>

<p>{" Direct Connect は「AWSのDirect Connectロケーション(コロケーション施設)」と「お客様の拠点」を専用回線で繋ぐサービスです。物理層(L1)の作業が試験範囲に含まれます。 "}</p>

<Diagram id="diag-5" label={"2.3.1 レイヤー1: 物理接続の流れ"} />

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"2.3.1 レイヤー1: 物理接続の流れ（表10）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"用語"}</th><th scope="col">{"説明"}</th></tr></thead><tbody><tr className={"odd"}><td>{"Direct Connect ロケーション"}</td><td>{"AWSのルーターが置かれた第三者のコロケーション施設"}</td></tr><tr className={"even"}><td>{"LOA-CFA"}</td><td>{" 「このポートにクロスコネクトしてよい」という許可書。コロケーション事業者に渡す "}</td></tr><tr className={"odd"}><td>{"クロスコネクト"}</td><td>{" 施設内のAWSルーターとお客様(またはパートナー)ルーターを繋ぐ物理ケーブル "}</td></tr><tr className={"even"}><td>{"専有接続(Dedicated)"}</td><td>{"AWSから直接ポートを割り当て。1/10/100/400 Gbps等"}</td></tr><tr className={"odd"}><td>{"ホスト接続(Hosted)"}</td><td>{"Direct Connect パートナーが提供。小さい帯域から選べる"}</td></tr><tr className={"even"}><td>{"LAG"}</td><td>{" 同じ速度の専有接続を束ねて1本の論理接続にする(1/10 Gbpsは最大4本、100/400 Gbpsは最大2本が目安) "}</td></tr><tr className={"odd"}><td>{"MACsec"}</td><td>{"専有接続(対応ポート)でのL2暗号化(IEEE 802.1AE)"}</td></tr></tbody></table>{" "}</div>

<blockquote className={"note"}>{" "}<p>{" 光ファイバーの種類(例: 1000BASE-LX、10GBASE-LR など)やオンプレルーター側のポート要件は、Direct Connect ユーザーガイドの接続要件に記載されています。"}<strong>{"オンプレ側の光モジュールの規格が合わない"}</strong>{"のが開通トラブルの典型です。 "}</p>{" "}</blockquote>

<h4>{"2.3.2 仮想インターフェイス(VIF)の3種類"}</h4>

<p>{" 物理接続の上に、"}<strong>{"802.1Q VLAN"}</strong>{"でL2を分割して仮想インターフェイス(VIF)を作ります。VIFごとにVLAN IDとBGPセッションを持ちます。 "}</p>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"2.3.2 仮想インターフェイス(VIF)の3種類（表11）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"VIF の種類"}</th><th scope="col">{"接続先"}</th><th scope="col">{"用途"}</th><th scope="col">{"ポイント"}</th></tr></thead><tbody><tr className={"odd"}><td>{"Private VIF"}</td><td>{"VGW または Direct Connect Gateway"}</td><td>{"VPCのプライベートIPへ到達"}</td><td>{"1 VIFで複数VPC(DXGW経由)に接続可能"}</td></tr><tr className={"even"}><td>{"Public VIF"}</td><td>{"AWSのパブリックIP(S3など)"}</td><td>{"AWSパブリックサービスへの到達"}</td><td>{" AWSが広告するパブリックプレフィックスを受信。オンプレ側は"}<strong>{"自分が所有するパブリックIP"}</strong>{"を広告 "}</td></tr><tr className={"odd"}><td>{"Transit VIF"}</td><td>{"Direct Connect Gateway 経由で Transit Gateway"}</td><td>{"多数のVPCをTGW経由で束ねる"}</td><td>{" 専有接続とホスト接続の両方で利用可能。上限は専有接続あたり4つ、ホスト接続あたり1つ(上限であり、一般的な構成で1接続1つに限られるわけではない) "}</td></tr></tbody></table>{" "}</div>

<h4>{"2.3.3 Direct Connect Gateway(DXGW)"}</h4>

<p>{" DXGWは、グローバルなリソースで、"}<strong>{"どのリージョンのVPC/TGWにも1つのVIFから到達"}</strong>{"させる仕組みです(中国リージョンを除く)。 "}</p>

<Diagram id="diag-6" label={"2.3.3 Direct Connect Gateway(DXGW)"} />

<p>{"注意点(試験頻出):"}</p>

<ul>{" "}<li>{" DXGWに関連付けた"}<strong>{"VPC同士は、DXGW経由では通信できません"}</strong>{"(DXGWは「オンプレ ↔ VPC」の中継であり、VPC間ルーターではない)。VPC間はPeeringやTGWで繋ぎます。 "}</li>{" "}<li>{" Transit VIF 経由の場合、TGWとDXGWの関連付け時に"}<strong>{"許可するプレフィックス(Allowed prefixes)"}</strong>{"を指定します。これはDXGWからオンプレミスへ広告されるプレフィックスです(TGWが広告する経路ではありません)。 "}</li>{" "}<li>{" DXGWは"}<strong>{"リージョンをまたいで"}</strong>{"使えます。VGW向けでもTGW向けでも、ロケーションの場所とVPCのリージョンは一致している必要はありません。 "}</li>{" "}</ul>

<h4>{"2.3.4 冗長性モデル(Resiliency)"}</h4>

<p>{" Direct Connect は、可用性の目標に応じた3つの推奨モデルがあります(Direct Connect Resiliency Toolkit でウィザード構成できます)。 "}</p>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"2.3.4 冗長性モデル(Resiliency)（表12）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"モデル"}</th><th scope="col">{"構成の概要"}</th><th scope="col">{"想定ワークロード"}</th></tr></thead><tbody><tr className={"odd"}><td><strong>{"Maximum Resiliency"}</strong></td><td>{" 2つ以上の"}<strong>{"別ロケーション"}</strong>{"に、それぞれ"}<strong>{"別デバイス"}</strong>{"で接続(合計4接続以上が目安) "}</td><td>{"重要な本番"}</td></tr><tr className={"even"}><td>{"High Resiliency"}</td><td>{"2つの"}<strong>{"別ロケーション"}</strong>{"にそれぞれ1接続"}</td><td>{"本番"}</td></tr><tr className={"odd"}><td>{"Development and Test"}</td><td>{" "}<strong>{"1つのロケーション"}</strong>{"の別デバイスに2接続(ロケーション障害に弱い) "}</td><td>{"開発・検証"}</td></tr></tbody></table>{" "}</div>

<Diagram id="diag-7" label={"2.3.4 冗長性モデル(Resiliency)"} />

<p>{"追加の冗長手段:"}</p>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"2.3.4 冗長性モデル(Resiliency)（表13）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"手段"}</th><th scope="col">{"説明"}</th></tr></thead><tbody><tr className={"odd"}><td>{"Site-to-Site VPN バックアップ"}</td><td>{" DX障害時にVPNへ切り替える。TGW終端のVPNなら同じTGWで両方を扱える "}</td></tr><tr className={"even"}><td>{"BFD"}</td><td>{" BGPより高速な障害検知。DX側ではBFDを有効にするとフェイルオーバーが速くなる "}</td></tr><tr className={"odd"}><td>{"LAG"}</td><td>{" 同一ロケーション内での帯域拡張と部分障害耐性(ロケーション障害には耐えない) "}</td></tr><tr className={"even"}><td>{"Direct Connect SiteLink"}</td><td>{" オンプレ拠点間をAWSバックボーン経由で直接繋ぐ(VPCを経由しない)機能 "}</td></tr></tbody></table>{" "}</div>

<h4>{"2.3.5 BGPによる経路制御(Direct Connect)"}</h4>

<p>{"AWS → オンプレ方向、オンプレ → AWS方向のどちらも制御できるのがポイントです。"}</p>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"2.3.5 BGPによる経路制御(Direct Connect)（表14）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"方向"}</th><th scope="col">{"制御手段"}</th></tr></thead><tbody><tr className={"odd"}><td>{"AWS → オンプレ(オンプレ宛て通信でAWSが選ぶ経路の優先度)"}</td><td>{" オンプレからAWSへ広告する経路に "}<strong>{"BGPコミュニティ(Local Preference)"}</strong>{" を付与: "}<code>{"7224:7100"}</code>{" 低 / "}<code>{"7224:7200"}</code>{" 中 / "}<code>{"7224:7300"}</code>{" 高。同じ優先度なら AS_PATH の短い方が選ばれる(AS_PATH プリペンドで調整可能) "}</td></tr><tr className={"even"}><td>{"オンプレ → AWS(AWS宛て通信で顧客側が選ぶ経路)"}</td><td>{" オンプレ側ルーターで、AWSから受信した経路に "}<strong>{"Local Preference"}</strong>{" などを設定して送信経路を選ぶ。これは顧客側の経路選択であり、AWS側の経路選択には影響しない "}</td></tr><tr className={"odd"}><td>{"Public VIF の広告範囲"}</td><td>{" スコープコミュニティで制御: "}<code>{"7224:9100"}</code>{" 同一リージョン / "}<code>{"7224:9200"}</code>{" 同一大陸 / "}<code>{"7224:9300"}</code>{" グローバル "}</td></tr></tbody></table>{" "}</div>

<blockquote className={"note"}>{" "}<p>{" AWSの経路選択の基本: ①"}<strong>{"最長プレフィックス一致"}</strong>{"が最優先。②同じプレフィックスなら、ルートテーブルへ伝播した経路のうち"}<strong>{"Direct Connect(BGP) > 静的VPN > BGP VPN"}</strong>{" の順(VGWの場合)。TGWでは、同じCIDRの経路が複数あるとき、静的ルート > プレフィックスリスト参照ルート > VPC伝播 > DXGW伝播 > TGW Connect > プライベートDirect Connect上のSite-to-Site VPN > Site-to-Site VPN(BGP)の順で選ばれます。試験では「VPNをDXのバックアップにしたい → DXの方が優先されるので特別な設定は不要、ただし"}<strong>{"同じプレフィックス"}</strong>{"を広告すること」と問われることがありますが、これは"}<strong>{"BGPで伝播したVPN経路"}</strong>{"をバックアップにする場合に限ります(VGWでは静的VPNよりもDXが優先されます)。TGWでは、同じCIDRに"}<strong>{"静的VPNルート"}</strong>{"があると、静的ルートが"}<strong>{"DXGW伝播ルートより優先"}</strong>{"されるため、VPNをDXのバックアップにしたい場合はBGP VPNを使うなど、別途ルート設計が必要です。 "}</p>{" "}</blockquote>

<h4>{"2.3.6 Direct Connect の設定例"}</h4>

<div className={"code-sample"}>{" "}<div className={"code-lang"}>{"bash"}</div>{" "}<div className="code-block highlight" role="region" tabIndex={0} aria-label={"2.3.6 Direct Connect の設定例（コード2）"}><div className="code-line"><span className={"c1"}>{"# 1) 仮想インターフェイス(Transit VIF)の作成"}</span></div>
<div className="code-line">{"aws"}<span className={"w"}>{" "}</span>{"directconnect"}<span className={"w"}>{" "}</span>{"create-transit-virtual-interface"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--connection-id"}<span className={"w"}>{" "}</span>{"dxcon-xxxxxxxx"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--new-transit-virtual-interface"}<span className={"w"}>{" "}</span><span className={"s1"}>{"'{"}</span></div>
<div className="code-line"><span className={"s1"}>{"    \"virtualInterfaceName\": \"prod-transit-vif\","}</span></div>
<div className="code-line"><span className={"s1"}>{"    \"vlan\": 101,"}</span></div>
<div className="code-line"><span className={"s1"}>{"    \"asn\": 65001,"}</span></div>
<div className="code-line"><span className={"s1"}>{"    \"authKey\": \"your-bgp-md5-key\","}</span></div>
<div className="code-line"><span className={"s1"}>{"    \"mtu\": 8500,"}</span></div>
<div className="code-line"><span className={"s1"}>{"    \"addressFamily\": \"ipv4\","}</span></div>
<div className="code-line"><span className={"s1"}>{"    \"directConnectGatewayId\": \"11111111-2222-3333-4444-555555555555\""}</span></div>
<div className="code-line"><span className={"s1"}>{"  }'"}</span></div>
<div className="code-line"></div>
<div className="code-line"><span className={"c1"}>{"# 2) DXGW と TGW を関連付け(許可プレフィックスを指定)"}</span></div>
<div className="code-line">{"aws"}<span className={"w"}>{" "}</span>{"directconnect"}<span className={"w"}>{" "}</span>{"create-direct-connect-gateway-association"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--direct-connect-gateway-id"}<span className={"w"}>{" "}</span><span className={"m"}>{"11111111"}</span>{"-2222-3333-4444-555555555555"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--gateway-id"}<span className={"w"}>{" "}</span>{"tgw-0123456789abcdef0"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--add-allowed-prefixes-to-direct-connect-gateway"}<span className={"w"}>{" "}</span><span className={"nv"}>{"cidr"}</span><span className={"o"}>{"="}</span><span className={"m"}>{"10"}</span>{".0.0.0/16"}</div></div>{" "}</div>

<div className={"callout-practice"}>{" "}<div className={"icon"}>{"✓"}</div>{" "}<div className={"body"}>{" "}<div className={"label"}>{"2.3.7 ベストプラクティス(Direct Connect)"}</div>{" "}<ol>{" "}<li>{" 重要な本番は"}<strong>{"Maximum Resiliency"}</strong>{": 別ロケーション・別デバイス・別ルーターで冗長化し、"}<strong>{"動的(BGP)ルーティング"}</strong>{"を使う。 "}</li>{" "}<li>{" "}<strong>{"Site-to-Site VPN をバックアップ"}</strong>{"として用意する(TGW終端で同じ経路を広告)。 "}</li>{" "}<li><strong>{"BFD"}</strong>{" を有効にして障害検知を高速化する。"}</li>{" "}<li>{" 暗号化が要件なら、専有接続なら"}<strong>{"MACsec"}</strong>{"、それ以外は"}<strong>{"DX上のIPsec VPN"}</strong>{"を使う。 "}</li>{" "}<li>{"BGPセッションには"}<strong>{"MD5認証"}</strong>{"を設定する。"}</li>{" "}<li>{" ジャンボフレームを使う場合、VIFのMTU(Private VIFは1500/9001、Transit VIFは1500/8500)と経路全体のMTUを揃える。途中に小さいMTUの区間(VPNなど)があるとPMTUDの問題が起きる。 "}</li>{" "}<li>{" 設計時にクォータ(1BGPセッションで広告できるプレフィックス数など)を"}<strong>{"最新の公式ドキュメントで確認"}</strong>{"する。 "}</li>{" "}<li>{" CloudWatchの接続メトリクス("}<code>{"ConnectionState"}</code>{" など)でリンク状態を"}<strong>{"常時監視"}</strong>{"する。 "}</li>{" "}</ol>{" "}</div>{" "}</div>

<h3 id={"24-transit-gateway-connect-と-sd-wan"} tabIndex={-1}>{" 2.4 Transit Gateway Connect と SD-WAN "}</h3>

<p>{" "}<strong>{"Transit Gateway Connect"}</strong>{" は、SD-WAN(Software-Defined WAN)アプライアンスをTGWに繋ぐためのアタッチメントです。"}<strong>{"GREトンネル + BGP"}</strong>{"で、SD-WANの仮想アプライアンスと経路を交換します。 "}</p>

<Diagram id="diag-8" label={"2.4 Transit Gateway Connect と SD-WAN"} />

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"2.4 Transit Gateway Connect と SD-WAN（表15）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"項目"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className={"odd"}><td>{"通信方式"}</td><td>{"GRE(トンネル)+ BGP(経路交換)。IPsecではない"}</td></tr><tr className={"even"}><td>{"トランスポート"}</td><td>{" 既存の"}<strong>{"VPCアタッチメント"}</strong>{"または"}<strong>{"Direct Connectアタッチメント"}</strong>{"を土台にする "}</td></tr><tr className={"odd"}><td>{"帯域"}</td><td>{" GREピアあたり最大5 Gbps。Connect アタッチメントあたり複数のピア(GREトンネル)を持てる。標準VPNトンネル(最大1.25 Gbps)よりは高帯域だが、Large Bandwidth VPNトンネル(最大5 Gbps)とは1本あたりの上限が同等 "}</td></tr><tr className={"even"}><td>{"向く用途"}</td><td>{"サードパーティSD-WANとの統合、VPNでは足りない帯域の実現"}</td></tr></tbody></table>{" "}</div>

<h3 id={"25-ロードバランシングl3l4l7"} tabIndex={-1}>{"2.5 ロードバランシング(L3/L4/L7)"}</h3>

<p>{" 実装タスクの「ロードバランシングソリューションの構成」に対応します。ELBには4種類あり、試験では"}<strong>{"層の違い"}</strong>{"が最重要です。 "}</p>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"2.5 ロードバランシング(L3/L4/L7)（表16）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"種類"}</th><th scope="col">{"層"}</th><th scope="col">{"プロトコル"}</th><th scope="col">{"主な特徴"}</th></tr></thead><tbody><tr className={"odd"}><td>{"Application Load Balancer(ALB)"}</td><td>{"L7"}</td><td>{"HTTP/HTTPS/gRPC/WebSocket"}</td><td>{"パス・ホストベースのルーティング、WAF連携、OIDC/Cognito認証"}</td></tr><tr className={"even"}><td>{"Network Load Balancer(NLB)"}</td><td>{"L4"}</td><td>{"TCP/UDP/TLS"}</td><td>{" 超低遅延・高スループット、"}<strong>{"AZごとの固定IP/Elastic IP"}</strong>{"、クライアントIPの保持、PrivateLinkの前段 "}</td></tr><tr className={"odd"}><td>{"Gateway Load Balancer(GWLB)"}</td><td>{"L3"}</td><td>{"IPパケット(GENEVE、UDP 6081)"}</td><td>{"サードパーティのセキュリティアプライアンスを透過的に挿入"}</td></tr><tr className={"even"}><td>{"Classic Load Balancer(CLB)"}</td><td>{"L4/L7"}</td><td>{"旧世代"}</td><td>{"新規では非推奨"}</td></tr></tbody></table>{" "}</div>

<Diagram id="diag-9" label={"2.5 ロードバランシング(L3/L4/L7)"} />

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"2.5 ロードバランシング(L3/L4/L7)（表17）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"観点"}</th><th scope="col">{"試験での考え方"}</th></tr></thead><tbody><tr className={"odd"}><td>{"固定IPで公開したい"}</td><td>{" NLB(AZごとに固定/Elastic IP)。ALBはIPが変わるので、固定が必要なら"}<strong>{"Global Accelerator + ALB"}</strong>{"または NLB "}</td></tr><tr className={"even"}><td>{"クライアントの送信元IPを見たい"}</td><td>{" ALBは "}<code>{"X-Forwarded-For"}</code>{" ヘッダー。NLBは既定でクライアントIPを保持(ターゲットタイプによる) "}</td></tr><tr className={"odd"}><td>{"クロスゾーン負荷分散"}</td><td>{" ALBは既定で有効(無効化可)。NLB/GWLBは既定で無効(有効にするとAZ間データ転送料に注意) "}</td></tr><tr className={"even"}><td>{"リバースプロキシ"}</td><td>{" ALBは(L7)リバースプロキシとして動作。TLS終端・パスルーティングを担当 "}</td></tr><tr className={"odd"}><td>{"オンプレのサーバーをターゲットに"}</td><td>{" "}<strong>{"IPターゲット"}</strong>{"でオンプレのIP(Direct Connect/VPN経由)を登録できる "}</td></tr></tbody></table>{" "}</div>

<div className={"callout-practice"}>{" "}<div className={"icon"}>{"✓"}</div>{" "}<div className={"body"}>{" "}<div className={"label"}>{"ベストプラクティス(ELB)"}</div>{" "}<p>{" 複数AZに配置する/ヘルスチェックを適切に設定する/NLBにはセキュリティグループを付ける(現在はNLBもSGに対応)/TLSはACM証明書で終端する/アクセスログを有効にする。 "}</p>{" "}</div>{" "}</div>

<h3 id={"26-セキュリティアプライアンスファイアウォール"} tabIndex={-1}>{" 2.6 セキュリティアプライアンス(ファイアウォール) "}</h3>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"2.6 セキュリティアプライアンス(ファイアウォール)（表18）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"実現方法"}</th><th scope="col">{"概要"}</th><th scope="col">{"向く場面"}</th></tr></thead><tbody><tr className={"odd"}><td>{"AWS Network Firewall"}</td><td>{"マネージドのステートフル/ステートレスFW。Suricata互換ルール"}</td><td>{"手間をかけず検査したい"}</td></tr><tr className={"even"}><td>{"GWLB + サードパーティ"}</td><td>{"Palo Alto、Fortinet等の仮想FWを透過的に挿入"}</td><td>{"既存FWの機能・運用を継続したい"}</td></tr><tr className={"odd"}><td>{"セキュリティグループ/NACL"}</td><td>{"インスタンス/サブネット単位のフィルタ(§3.7)"}</td><td>{"基本の境界制御"}</td></tr></tbody></table>{" "}</div>

<Diagram id="diag-10" label={"2.6 セキュリティアプライアンス(ファイアウォール)"} />

<blockquote className={"note"}>{" "}<p>{" "}<strong>{"appliance mode"}</strong>{" は、TGWが同一フロー(往路・復路)を"}<strong>{"同じAZのアプライアンス"}</strong>{"に送る設定です。これを有効にしないと、往路と復路で異なるAZのFWを通りステートフル検査が壊れます。試験の定番です。 "}</p>{" "}</blockquote>

<h3 id={"27-aws-organizations-と-aws-ramマルチアカウント共有"} tabIndex={-1}>{" 2.7 AWS Organizations と AWS RAM(マルチアカウント共有) "}</h3>

<p>{" AWS Resource Access Manager(RAM)は、"}<strong>{"リソースを他のアカウントやOrganizationに共有"}</strong>{"する仕組みです。Organizationsと連携すると、"}<strong>{"招待なし"}</strong>{"で組織内に共有できます。 "}</p>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"2.7 AWS Organizations と AWS RAM(マルチアカウント共有)（表19）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"共有できる主なネットワークリソース"}</th><th scope="col">{"用途"}</th></tr></thead><tbody><tr className={"odd"}><td>{"Transit Gateway"}</td><td>{"中央のTGWに他アカウントのVPCをアタッチ"}</td></tr><tr className={"even"}><td>{"VPC サブネット(共有VPC)"}</td><td>{"複数アカウントが同じVPCのサブネットにリソースを配置"}</td></tr><tr className={"odd"}><td>{"Route 53 Resolver ルール"}</td><td>{"転送ルールを全アカウントで利用"}</td></tr><tr className={"even"}><td>{"Direct Connect Gateway(関連付けの許可)"}</td><td>{"アカウントを跨いだDXGW運用(許可モデル)"}</td></tr></tbody></table>{" "}</div>

<p>{" 実装手順(Organizations有効 → RAMで組織共有を有効化 → リソース共有を作成)です。 "}</p>

<div className={"code-sample"}>{" "}<div className={"code-lang"}>{"bash"}</div>{" "}<div className="code-block highlight" role="region" tabIndex={0} aria-label={"2.7 AWS Organizations と AWS RAM(マルチアカウント共有)（コード3）"}><div className="code-line"><span className={"c1"}>{"# Organizationsとの共有を有効化(管理アカウントで1回)"}</span></div>
<div className="code-line">{"aws"}<span className={"w"}>{" "}</span>{"ram"}<span className={"w"}>{" "}</span>{"enable-sharing-with-aws-organization"}</div>
<div className="code-line"></div>
<div className="code-line"><span className={"c1"}>{"# TGWを組織全体に共有するリソース共有を作成"}</span></div>
<div className="code-line">{"aws"}<span className={"w"}>{" "}</span>{"ram"}<span className={"w"}>{" "}</span>{"create-resource-share"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--name"}<span className={"w"}>{" "}</span>{"shared-tgw"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--resource-arns"}<span className={"w"}>{" "}</span>{"arn:aws:ec2:ap-northeast-1:111122223333:transit-gateway/tgw-0123456789abcdef0"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--principals"}<span className={"w"}>{" "}</span>{"arn:aws:organizations::111122223333:organization/o-exampleorgid"}</div></div>{" "}</div>

<div className={"callout-practice"}>{" "}<div className={"icon"}>{"✓"}</div>{" "}<div className={"body"}>{" "}<div className={"label"}>{"ベストプラクティス"}</div>{" "}<p>{" ネットワーク専用アカウント(Network Account)にTGW/DXGW/Resolverを集約し、RAMで各ワークロードアカウントへ共有する。 "}</p>{" "}</div>{" "}</div>

<h3 id={"28-接続性の確認とテスト"} tabIndex={-1}>{"2.8 接続性の確認とテスト"}</h3>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"2.8 接続性の確認とテスト（表20）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"ツール"}</th><th scope="col">{"できること"}</th><th scope="col">{"使いどころ"}</th></tr></thead><tbody><tr className={"odd"}><td><strong>{"Reachability Analyzer"}</strong></td><td>{" 送信元と宛先を指定して"}<strong>{"設定上の到達可能性"}</strong>{"を分析(パケットは送らない)。到達不可なら原因コンポーネントを特定 "}</td><td>{"「なぜ繋がらない?」の切り分け"}</td></tr><tr className={"even"}><td><strong>{"Transit Gateway Route Analyzer"}</strong></td><td>{" TGWルートテーブル内の経路を分析し、経路の有無・ブラックホールを確認 "}</td><td>{"TGW経路の確認"}</td></tr><tr className={"odd"}><td>{"Network Access Analyzer"}</td><td>{"意図しないアクセス経路を検出(セキュリティ要件の検証)"}</td><td>{"ネットワークの"}<strong>{"到達可能性ポリシー"}</strong>{"検証"}</td></tr><tr className={"even"}><td>{"VPC Flow Logs"}</td><td>{"通信のメタデータ(許可/拒否、バイト数)を記録"}</td><td>{"実際の通信の確認、SG/NACLの拒否確認"}</td></tr><tr className={"odd"}><td>{"Traffic Mirroring"}</td><td>{"パケットのコピーをアプライアンスに送る"}</td><td>{"詳細なパケット解析、IDS"}</td></tr><tr className={"even"}><td>{"Network Manager / CloudWatch"}</td><td>{"TGW・VPN・DXの状態、メトリクス"}</td><td>{"継続的な監視"}</td></tr></tbody></table>{" "}</div>

<blockquote className={"note"}>{" "}<p>{" Reachability Analyzer は"}<strong>{"設定を静的に解析"}</strong>{"するもので、実際のパケットは送りません(ファイアウォールの外側やOS内部の設定は見えない)。「実通信での確認」にはFlow LogsやCloudWatch、Network Synthetic Monitor(後述)を使います。 "}</p>{" "}</blockquote>

<h3 id={"29-監視とログtask-21のスキル"} tabIndex={-1}>{"2.9 監視とログ(Task 2.1のスキル)"}</h3>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"2.9 監視とログ(Task 2.1のスキル)（表21）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"対象"}</th><th scope="col">{"監視手段"}</th></tr></thead><tbody><tr className={"odd"}><td>{"Site-to-Site VPN"}</td><td>{" CloudWatch "}<code>{"TunnelState"}</code>{"、"}<code>{"TunnelDataIn/Out"}</code>{"。VPN接続ログをCloudWatch Logsに出力 "}</td></tr><tr className={"even"}><td>{"Direct Connect"}</td><td>{" CloudWatch "}<code>{"ConnectionState"}</code>{"、"}<code>{"ConnectionBpsEgress/Ingress"}</code>{"、光レベル(Light Level)、BFD状態 "}</td></tr><tr className={"odd"}><td>{"Transit Gateway"}</td><td>{" TGW Flow Logs、CloudWatchメトリクス("}<code>{"BytesIn/Out"}</code>{"、"}<code>{"PacketDropCountBlackhole"}</code>{" など) "}</td></tr><tr className={"even"}><td>{"VPC"}</td><td>{"VPC Flow Logs(ENI/サブネット/VPC単位)"}</td></tr><tr className={"odd"}><td>{"ELB"}</td><td>{"アクセスログ、CloudWatchメトリクス"}</td></tr><tr className={"even"}><td>{"疎通・遅延の継続監視"}</td><td>{" Network Synthetic Monitor(ハイブリッド区間の遅延/パケットロス) "}</td></tr></tbody></table>{" "}</div>
</div>;}
