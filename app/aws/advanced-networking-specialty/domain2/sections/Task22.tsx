import { Diagram } from '../Diagram';
/** 原本のtask2区分を全文保持する。 */
export default function Task22(){return <div className="guide-part" data-part="task2"><h2 id={"3-task-22-複数アカウントリージョンvpc間の接続"} tabIndex={-1}>{" 3. Task 2.2: 複数アカウント・リージョン・VPC間の接続 "}</h2>

<blockquote className={"note"}>{" "}<p>{" 試験ガイド: Implement routing and connectivity across multiple AWS accounts, Regions, and VPCs to support different connectivity patterns "}</p>{" "}</blockquote>

<h3 id={"31-単一vpcの基本構成dhcpルーティングsg"} tabIndex={-1}>{" 3.1 単一VPCの基本構成(DHCP・ルーティング・SG) "}</h3>

<p>{"複数VPCに進む前に、1つのVPCの実装要素を押さえます。"}</p>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"3.1 単一VPCの基本構成(DHCP・ルーティング・SG)（表22）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"要素"}</th><th scope="col">{"説明"}</th><th scope="col">{"試験のポイント"}</th></tr></thead><tbody><tr className={"odd"}><td>{"ルートテーブル"}</td><td>{" サブネットごとに1つ関連付け。最長プレフィックス一致で転送先を決定 "}</td><td>{" "}<code>{"local"}</code>{" ルートは削除できない。サブネットは明示関連付けがなければメインルートテーブルを使う "}</td></tr><tr className={"even"}><td>{"インターネットゲートウェイ(IGW)"}</td><td>{"パブリック通信の出入口"}</td><td>{"パブリックサブネット = IGWへのルートがあるサブネット"}</td></tr><tr className={"odd"}><td>{"NATゲートウェイ"}</td><td>{" プライベートサブネットから外部への"}<strong>{"送信のみ"}</strong>{"を許可 "}</td><td>{"AZごとに配置して冗長化。AZ間通信を避ける"}</td></tr><tr className={"even"}><td>{"Egress-only IGW"}</td><td>{" "}<strong>{"IPv6"}</strong>{"の送信専用ゲートウェイ。VPC内から外部への送信と、その戻り通信だけを許可する(アドレス変換は行わない) "}</td><td>{"IPv6の送信専用通信は「NATではなくEgress-only IGW」"}</td></tr><tr className={"odd"}><td>{"DHCPオプションセット"}</td><td>{"DNSサーバー、ドメイン名、NTPなどをVPC内に配布"}</td><td>{"1VPCに1つ関連付け。変更不可で、新規作成して差し替える"}</td></tr><tr className={"even"}><td>{"VPCのDNS属性"}</td><td>{" "}<code>{"enableDnsSupport"}</code>{"(Amazon提供DNSの有効化)、"}<code>{"enableDnsHostnames"}</code>{" "}</td><td>{" "}<strong>{"プライベートホストゾーンとInterface Endpointのプライベート DNS には両方が "}<code>{"true"}</code></strong>{" が必要 "}</td></tr><tr className={"odd"}><td>{"セキュリティグループ(SG)"}</td><td>{" インスタンス(ENI)単位の"}<strong>{"ステートフル"}</strong>{"フィルタ。許可ルールのみ "}</td><td>{"SG同士を参照できる(同一リージョンのPeering先でも参照可)"}</td></tr><tr className={"even"}><td>{"NACL"}</td><td>{" サブネット単位の"}<strong>{"ステートレス"}</strong>{"フィルタ。許可/拒否ルール、番号順に評価 "}</td><td>{"戻りの通信(エフェメラルポート)も明示許可が必要"}</td></tr></tbody></table>{" "}</div>

<Diagram id="diag-11" label={"3.1 単一VPCの基本構成(DHCP・ルーティング・SG)"} />

<h3 id={"32-vpc間アカウント間接続の選択"} tabIndex={-1}>{"3.2 VPC間・アカウント間接続の選択"}</h3>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"3.2 VPC間・アカウント間接続の選択（表23）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"方式"}</th><th scope="col">{"概要"}</th><th scope="col">{"推移的ルーティング"}</th><th scope="col">{"規模"}</th><th scope="col">{"主な制約"}</th></tr></thead><tbody><tr className={"odd"}><td>{"VPC Peering"}</td><td>{"2つのVPCを1対1で接続"}</td><td><strong>{"不可"}</strong></td><td>{"少数VPC"}</td><td>{" CIDR重複不可、Peeringの先のVPNやIGWを使えない(Edge to Edge不可) "}</td></tr><tr className={"even"}><td>{"Transit Gateway"}</td><td>{"リージョナルなハブ。多数のVPC/VPN/DXを集約"}</td><td>{"ルートテーブルで制御"}</td><td>{"大規模"}</td><td>{"データ処理料金あり"}</td></tr><tr className={"odd"}><td>{"PrivateLink"}</td><td>{"サービス単位で一方向に公開"}</td><td>{"対象外(サービス公開)"}</td><td>{"任意"}</td><td>{"クライアント→サービスの一方向のみ"}</td></tr><tr className={"even"}><td>{"Site-to-Site VPN(VPC間)"}</td><td>{"VPCごとにVPN"}</td><td>{"構成次第"}</td><td>{"小規模"}</td><td>{"管理が煩雑・帯域制限"}</td></tr><tr className={"odd"}><td>{"サードパーティ/Transit VPC"}</td><td>{"ルーター仮想アプライアンスを中心に接続(旧来の方式)"}</td><td>{"アプライアンス次第"}</td><td>{"以前の標準"}</td><td>{"運用負荷が高く、現在はTGWが推奨"}</td></tr><tr className={"even"}><td>{"AWS Cloud WAN"}</td><td>{"グローバルな広域ネットワークをポリシーで構成"}</td><td>{"ポリシーで制御"}</td><td>{"グローバル"}</td><td>{"コアネットワークポリシーの理解が必要"}</td></tr></tbody></table>{" "}</div>

<Diagram id="diag-12" label={"3.2 VPC間・アカウント間接続の選択"} />

<h3 id={"33-vpc-peering"} tabIndex={-1}>{"3.3 VPC Peering"}</h3>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"3.3 VPC Peering（表24）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"項目"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className={"odd"}><td>{"作成手順"}</td><td>{" リクエスター → アクセプター(別アカウント/別リージョンでも可)→ "}<strong>{"両側のルートテーブルに相手のCIDRを追加"}</strong>{" "}</td></tr><tr className={"even"}><td>{"非推移"}</td><td>{"A-B、B-CをPeeringしても、AとCは通信できない"}</td></tr><tr className={"odd"}><td>{"CIDR"}</td><td>{"重複不可(IPv4)。後から重複するCIDRを追加することもできない"}</td></tr><tr className={"even"}><td>{"DNS"}</td><td>{" 「DNS解決(Allow DNS resolution from peer VPC)」を有効にすると、相手のパブリックDNS名をプライベートIPに解決できる "}</td></tr><tr className={"odd"}><td>{"SG参照"}</td><td>{" 同一リージョンならPeering先のSGを参照可能。リージョン間Peeringでは不可 "}</td></tr><tr className={"even"}><td>{"非対応"}</td><td>{" 相手VPCの"}<strong>{"IGW・NAT・VPN・Direct Connect を経由する通信(Edge to Edge)"}</strong>{" "}</td></tr></tbody></table>{" "}</div>

<div className={"code-sample"}>{" "}<div className={"code-lang"}>{"bash"}</div>{" "}<div className="code-block highlight" role="region" tabIndex={0} aria-label={"3.3 VPC Peering（コード4）"}><div className="code-line"><span className={"c1"}>{"# リージョン間のVPC Peeringを作成(リクエスター側)"}</span></div>
<div className="code-line">{"aws"}<span className={"w"}>{" "}</span>{"ec2"}<span className={"w"}>{" "}</span>{"create-vpc-peering-connection"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--vpc-id"}<span className={"w"}>{" "}</span>{"vpc-aaaa1111"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--peer-vpc-id"}<span className={"w"}>{" "}</span>{"vpc-bbbb2222"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--peer-owner-id"}<span className={"w"}>{" "}</span><span className={"m"}>{"444455556666"}</span><span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--peer-region"}<span className={"w"}>{" "}</span>{"us-east-1"}</div>
<div className="code-line"></div>
<div className="code-line"><span className={"c1"}>{"# 承諾(アクセプター側)"}</span></div>
<div className="code-line">{"aws"}<span className={"w"}>{" "}</span>{"ec2"}<span className={"w"}>{" "}</span>{"accept-vpc-peering-connection"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--vpc-peering-connection-id"}<span className={"w"}>{" "}</span>{"pcx-0123456789abcdef0"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--region"}<span className={"w"}>{" "}</span>{"us-east-1"}</div>
<div className="code-line"></div>
<div className="code-line"><span className={"c1"}>{"# ルートを追加(両側のVPCで)"}</span></div>
<div className="code-line">{"aws"}<span className={"w"}>{" "}</span>{"ec2"}<span className={"w"}>{" "}</span>{"create-route"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--route-table-id"}<span className={"w"}>{" "}</span>{"rtb-0123456789abcdef0"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--destination-cidr-block"}<span className={"w"}>{" "}</span><span className={"m"}>{"10"}</span>{".20.0.0/16"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--vpc-peering-connection-id"}<span className={"w"}>{" "}</span>{"pcx-0123456789abcdef0"}</div></div>{" "}</div>

<h3 id={"34-aws-privatelinkプライベートなアプリケーション接続"} tabIndex={-1}>{" 3.4 AWS PrivateLink(プライベートなアプリケーション接続) "}</h3>

<p>{" PrivateLink は、"}<strong>{"VPCのプライベートIPアドレス(ENI)経由で、サービスにだけ"}</strong>{"接続できるようにする機能です。インターネット、NAT、VPN、Peeringを使わずに済み、"}<strong>{"CIDRが重複していても"}</strong>{"使えます。 "}</p>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"3.4 AWS PrivateLink(プライベートなアプリケーション接続)（表25）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"エンドポイントの種類"}</th><th scope="col">{"説明"}</th><th scope="col">{"主な用途"}</th></tr></thead><tbody><tr className={"odd"}><td>{"Interface Endpoint"}</td><td>{"サブネットにENIを作成し、プライベートIPでサービスへ接続"}</td><td>{"AWSサービス、他アカウントのサービス、SaaS"}</td></tr><tr className={"even"}><td>{"Gateway Endpoint"}</td><td>{" "}<strong>{"ルートテーブルのエントリ"}</strong>{"で到達("}<strong>{"S3とDynamoDBのみ"}</strong>{")。無料 "}</td><td>{"S3/DynamoDBへのプライベート接続"}</td></tr><tr className={"odd"}><td>{"Gateway Load Balancer Endpoint"}</td><td>{"GWLBへトラフィックを透過的に送る"}</td><td>{"検査VPCへの挿入"}</td></tr><tr className={"even"}><td>{"Resource / Service Network Endpoint"}</td><td>{"VPC Lattice のリソースやサービスネットワークへ接続"}</td><td>{"新しいアプリ接続パターン"}</td></tr></tbody></table>{" "}</div>

<p>{"自分のサービスを他アカウントに公開する(エンドポイントサービス)流れです。"}</p>

<Diagram id="diag-13" label={"3.4 AWS PrivateLink(プライベートなアプリケーション接続)"} />

<Diagram id="diag-14" label={"3.4 AWS PrivateLink(プライベートなアプリケーション接続)"} />

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"3.4 AWS PrivateLink(プライベートなアプリケーション接続)（表26）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"重要ポイント"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className={"odd"}><td>{"方向性"}</td><td>{" "}<strong>{"一方向"}</strong>{"(利用者 → 提供者)。提供者から利用者VPCへの開始はできない "}</td></tr><tr className={"even"}><td>{"DNS"}</td><td>{" Interface Endpoint の"}<strong>{"プライベートDNS"}</strong>{"を有効にすると、サービスの標準DNS名がエンドポイントのプライベートIPに解決される(VPCの "}<code>{"enableDnsSupport"}</code>{" と "}<code>{"enableDnsHostnames"}</code>{" が必須) "}</td></tr><tr className={"odd"}><td>{"エンドポイントポリシー"}</td><td>{" エンドポイントポリシーに対応するAWSサービスのエンドポイントに限り、アクセス可能なプリンシパル/リソースをIAMポリシー形式で制限できる。AWS以外の提供者によるエンドポイントサービス(PrivateLink経由のSaaS等)では利用者側のエンドポイントポリシーは非対応で、エンドポイントはフルアクセスとなる(提供者側で制御する) "}</td></tr><tr className={"even"}><td>{"可用性"}</td><td>{"複数AZにエンドポイントを置く"}</td></tr><tr className={"odd"}><td>{"オンプレからの利用"}</td><td>{" Direct Connect/VPN経由でオンプレからエンドポイントのプライベートIPに到達できる(DNS解決は§4のResolverで) "}</td></tr></tbody></table>{" "}</div>

<div className={"callout-practice"}>{" "}<div className={"icon"}>{"✓"}</div>{" "}<div className={"body"}>{" "}<div className={"label"}>{"ベストプラクティス"}</div>{" "}<p>{" S3/DynamoDBはまず"}<strong>{"Gateway Endpoint"}</strong>{"(無料)。それ以外のAWSサービスやSaaS公開は"}<strong>{"Interface Endpoint"}</strong>{"。ログ・ECR・SSMなどを使うプライベートサブネットのワークロードには必要なエンドポイントを揃える。 "}</p>{" "}</div>{" "}</div>

<h3 id={"35-transit-gatewayハブスポーク"} tabIndex={-1}>{"3.5 Transit Gateway(ハブ&スポーク)"}</h3>

<h4>{"3.5.1 構成要素"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"3.5.1 構成要素（表27）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"用語"}</th><th scope="col">{"説明"}</th></tr></thead><tbody><tr className={"odd"}><td>{"アタッチメント"}</td><td>{" TGWに繋ぐもの。VPC、VPN、Direct Connect Gateway、Connect、Peering(別TGW) "}</td></tr><tr className={"even"}><td>{"TGWルートテーブル"}</td><td>{" アタッチメントごとの経路表。"}<strong>{"関連付け(Association)"}</strong>{"と"}<strong>{"伝播(Propagation)"}</strong>{"で制御 "}</td></tr><tr className={"odd"}><td>{"関連付け(Association)"}</td><td>{" あるアタッチメントから来たパケットが"}<strong>{"どのルートテーブルで検索されるか"}</strong>{"を決める(1アタッチメントにつき1つ) "}</td></tr><tr className={"even"}><td>{"伝播(Propagation)"}</td><td>{" アタッチメントの経路を、指定したルートテーブルに"}<strong>{"自動で登録"}</strong>{"する(複数のテーブルへ可) "}</td></tr><tr className={"odd"}><td>{"ブラックホールルート"}</td><td>{"該当する宛先のトラフィックを破棄(分離のために使う)"}</td></tr><tr className={"even"}><td>{"appliance mode"}</td><td>{"同一フローを同じAZのアプライアンスへ送る(§2.6)"}</td></tr></tbody></table>{" "}</div>

<Diagram id="diag-15" label={"3.5.1 構成要素"} />

<blockquote className={"note"}>{" "}<p>{" 覚え方: 「"}<strong>{"Association = 入口で見る表"}</strong>{"」「"}<strong>{"Propagation = 自分の経路をどの表に載せるか"}</strong>{"」。 "}</p>{" "}</blockquote>

<h4>{"3.5.2 ルートテーブル設計パターン"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"3.5.2 ルートテーブル設計パターン（表28）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"パターン"}</th><th scope="col">{"設計"}</th><th scope="col">{"用途"}</th></tr></thead><tbody><tr className={"odd"}><td>{"全て接続(フラット)"}</td><td>{"1つのルートテーブルに全アタッチメントを関連付け・伝播"}</td><td>{"小規模・全面通信を許可"}</td></tr><tr className={"even"}><td>{"環境分離"}</td><td>{" "}<code>{"prod"}</code>{" と "}<code>{"dev"}</code>{" のルートテーブルを分け、相互に伝播させない。共有サービスだけ両方へ伝播 "}</td><td>{"環境ごとに隔離"}</td></tr><tr className={"odd"}><td>{"集中型検査"}</td><td>{" スポーク用テーブルは"}<strong>{"0.0.0.0/0 → 検査VPCアタッチメント"}</strong>{"。検査VPC用テーブルは各スポークへの経路を持つ "}</td><td>{"全通信をFW検査"}</td></tr><tr className={"even"}><td>{"集中型エグレス"}</td><td>{" スポークは"}<strong>{"0.0.0.0/0 → エグレスVPC"}</strong>{"(NATゲートウェイ)に向ける "}</td><td>{"NATの共有でコスト削減"}</td></tr></tbody></table>{" "}</div>

<Diagram id="diag-16" label={"3.5.2 ルートテーブル設計パターン"} />

<h4>{"3.5.3 TGWの主な仕様"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"3.5.3 TGWの主な仕様（表29）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"項目"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className={"odd"}><td>{"範囲"}</td><td>{" "}<strong>{"リージョナル"}</strong>{"リソース。リージョン間は"}<strong>{"TGW Peering"}</strong>{"(経路は"}<strong>{"静的ルートのみ"}</strong>{"、動的伝播不可) "}</td></tr><tr className={"even"}><td>{"共有"}</td><td>{" RAMでアカウントを跨いで共有可能(アタッチメントは各アカウントが作成し、TGW所有者が承認/自動承認) "}</td></tr><tr className={"odd"}><td>{"ECMP"}</td><td>{" BGP VPNで複数トンネルに負荷分散(VPN接続を複数束ねて帯域拡張) "}</td></tr><tr className={"even"}><td>{"VPCアタッチメント"}</td><td>{" アタッチメントに"}<strong>{"各AZのサブネットを1つ"}</strong>{"指定。指定していないAZのリソースからはTGWに到達できない "}</td></tr><tr className={"odd"}><td>{"マルチキャスト"}</td><td>{"対応(必要なときだけ有効化)"}</td></tr><tr className={"even"}><td>{"課金"}</td><td>{" アタッチメント時間料金 + 処理データ量料金。"}<strong>{"VPC Peeringはデータ転送料のみ"}</strong>{"で、大量通信の2VPC間ではPeeringの方が安くなることがある "}</td></tr></tbody></table>{" "}</div>

<div className={"code-sample"}>{" "}<div className={"code-lang"}>{"yaml"}</div>{" "}<div className="code-block highlight" role="region" tabIndex={0} aria-label={"3.5.3 TGWの主な仕様（コード5）"}><div className="code-line"><span className={"c1"}>{"# CloudFormation: TGW とVPCアタッチメントの基本(ルートテーブル分離の準備)"}</span></div>
<div className="code-line"><span className={"c1"}>{"# 抜粋(フラグメント): ProdVpc と ProdAttachSubnetIds は省略したテンプレート部分で"}</span></div>
<div className="code-line"><span className={"c1"}>{"# 定義する前提(例: 同テンプレート内の AWS::EC2::VPC リソースと List<AWS::EC2::Subnet::Id> 型のパラメータ)"}</span></div>
<div className="code-line"><span className={"nt"}>{"Resources"}</span><span className={"p"}>{":"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span><span className={"nt"}>{"Tgw"}</span><span className={"p"}>{":"}</span></div>
<div className="code-line"><span className={"w"}>{"    "}</span><span className={"nt"}>{"Type"}</span><span className={"p"}>{":"}</span><span className={"w"}>{" "}</span><span className={"l l-Scalar l-Scalar-Plain"}>{"AWS::EC2::TransitGateway"}</span></div>
<div className="code-line"><span className={"w"}>{"    "}</span><span className={"nt"}>{"Properties"}</span><span className={"p"}>{":"}</span></div>
<div className="code-line"><span className={"w"}>{"      "}</span><span className={"nt"}>{"AmazonSideAsn"}</span><span className={"p"}>{":"}</span><span className={"w"}>{" "}</span><span className={"l l-Scalar l-Scalar-Plain"}>{"64512"}</span></div>
<div className="code-line"><span className={"w"}>{"      "}</span><span className={"nt"}>{"DefaultRouteTableAssociation"}</span><span className={"p"}>{":"}</span><span className={"w"}>{" "}</span><span className={"l l-Scalar l-Scalar-Plain"}>{"disable"}</span><span className={"w"}>{"   "}</span><span className={"c1"}>{"# 自動関連付けを無効化して明示制御する"}</span></div>
<div className="code-line"><span className={"w"}>{"      "}</span><span className={"nt"}>{"DefaultRouteTablePropagation"}</span><span className={"p"}>{":"}</span><span className={"w"}>{" "}</span><span className={"l l-Scalar l-Scalar-Plain"}>{"disable"}</span></div>
<div className="code-line"><span className={"w"}>{"      "}</span><span className={"nt"}>{"Tags"}</span><span className={"p"}>{":"}</span></div>
<div className="code-line"><span className={"w"}>{"        "}</span><span className={"p p-Indicator"}>{"-"}</span><span className={"w"}>{" "}</span><span className={"nt"}>{"Key"}</span><span className={"p"}>{":"}</span><span className={"w"}>{" "}</span><span className={"l l-Scalar l-Scalar-Plain"}>{"Name"}</span></div>
<div className="code-line"><span className={"w"}>{"          "}</span><span className={"nt"}>{"Value"}</span><span className={"p"}>{":"}</span><span className={"w"}>{" "}</span><span className={"l l-Scalar l-Scalar-Plain"}>{"core-tgw"}</span></div>
<div className="code-line"></div>
<div className="code-line"><span className={"w"}>{"  "}</span><span className={"nt"}>{"ProdRouteTable"}</span><span className={"p"}>{":"}</span></div>
<div className="code-line"><span className={"w"}>{"    "}</span><span className={"nt"}>{"Type"}</span><span className={"p"}>{":"}</span><span className={"w"}>{" "}</span><span className={"l l-Scalar l-Scalar-Plain"}>{"AWS::EC2::TransitGatewayRouteTable"}</span></div>
<div className="code-line"><span className={"w"}>{"    "}</span><span className={"nt"}>{"Properties"}</span><span className={"p"}>{":"}</span></div>
<div className="code-line"><span className={"w"}>{"      "}</span><span className={"nt"}>{"TransitGatewayId"}</span><span className={"p"}>{":"}</span><span className={"w"}>{" "}</span><span className={"kt"}>{"!Ref"}</span><span className={"w"}>{" "}</span><span className={"l l-Scalar l-Scalar-Plain"}>{"Tgw"}</span></div>
<div className="code-line"></div>
<div className="code-line"><span className={"w"}>{"  "}</span><span className={"nt"}>{"ProdAttachment"}</span><span className={"p"}>{":"}</span></div>
<div className="code-line"><span className={"w"}>{"    "}</span><span className={"nt"}>{"Type"}</span><span className={"p"}>{":"}</span><span className={"w"}>{" "}</span><span className={"l l-Scalar l-Scalar-Plain"}>{"AWS::EC2::TransitGatewayAttachment"}</span></div>
<div className="code-line"><span className={"w"}>{"    "}</span><span className={"nt"}>{"Properties"}</span><span className={"p"}>{":"}</span></div>
<div className="code-line"><span className={"w"}>{"      "}</span><span className={"nt"}>{"TransitGatewayId"}</span><span className={"p"}>{":"}</span><span className={"w"}>{" "}</span><span className={"kt"}>{"!Ref"}</span><span className={"w"}>{" "}</span><span className={"l l-Scalar l-Scalar-Plain"}>{"Tgw"}</span></div>
<div className="code-line"><span className={"w"}>{"      "}</span><span className={"nt"}>{"VpcId"}</span><span className={"p"}>{":"}</span><span className={"w"}>{" "}</span><span className={"kt"}>{"!Ref"}</span><span className={"w"}>{" "}</span><span className={"l l-Scalar l-Scalar-Plain"}>{"ProdVpc"}</span></div>
<div className="code-line"><span className={"w"}>{"      "}</span><span className={"nt"}>{"SubnetIds"}</span><span className={"p"}>{":"}</span><span className={"w"}>{" "}</span><span className={"kt"}>{"!Ref"}</span><span className={"w"}>{" "}</span><span className={"l l-Scalar l-Scalar-Plain"}>{"ProdAttachSubnetIds"}</span></div>
<div className="code-line"></div>
<div className="code-line"><span className={"w"}>{"  "}</span><span className={"nt"}>{"ProdAssociation"}</span><span className={"p"}>{":"}</span></div>
<div className="code-line"><span className={"w"}>{"    "}</span><span className={"nt"}>{"Type"}</span><span className={"p"}>{":"}</span><span className={"w"}>{" "}</span><span className={"l l-Scalar l-Scalar-Plain"}>{"AWS::EC2::TransitGatewayRouteTableAssociation"}</span></div>
<div className="code-line"><span className={"w"}>{"    "}</span><span className={"nt"}>{"Properties"}</span><span className={"p"}>{":"}</span></div>
<div className="code-line"><span className={"w"}>{"      "}</span><span className={"nt"}>{"TransitGatewayRouteTableId"}</span><span className={"p"}>{":"}</span><span className={"w"}>{" "}</span><span className={"kt"}>{"!Ref"}</span><span className={"w"}>{" "}</span><span className={"l l-Scalar l-Scalar-Plain"}>{"ProdRouteTable"}</span></div>
<div className="code-line"><span className={"w"}>{"      "}</span><span className={"nt"}>{"TransitGatewayAttachmentId"}</span><span className={"p"}>{":"}</span><span className={"w"}>{" "}</span><span className={"kt"}>{"!Ref"}</span><span className={"w"}>{" "}</span><span className={"l l-Scalar l-Scalar-Plain"}>{"ProdAttachment"}</span></div></div>{" "}</div>

<div className={"callout-practice"}>{" "}<div className={"icon"}>{"✓"}</div>{" "}<div className={"body"}>{" "}<div className={"label"}>{"3.5.4 ベストプラクティス(Transit Gateway)"}</div>{" "}<ol>{" "}<li>{" 各VPCのTGWアタッチメントには"}<strong>{"専用の小さなサブネット"}</strong>{"(例: "}<code>{"/28"}</code>{")を使い、そのサブネットのNACLは広く許可する。 "}</li>{" "}<li>{" "}<strong>{"既定の関連付け/伝播を無効化"}</strong>{"し、明示的に設計したルートテーブルで分離する。 "}</li>{" "}<li>{" 検査VPCのアタッチメントでは "}<strong>{"appliance mode"}</strong>{" を有効にする。 "}</li>{" "}<li>{" 各スポークVPCへの経路は"}<strong>{"集約(サマライズ)"}</strong>{"し、ルート数の上限に備える。 "}</li>{" "}<li>{" TGW所有はネットワークアカウントに集約し、"}<strong>{"RAMで共有"}</strong>{"する。 "}</li>{" "}<li>{" 大量データが2VPC間だけで流れるなら、"}<strong>{"VPC Peeringの併用"}</strong>{"でコストを抑える。 "}</li>{" "}<li>{" "}<strong>{"TGW Flow Logs"}</strong>{" と CloudWatch でトラフィックと破棄(ブラックホール)を監視する。 "}</li>{" "}</ol>{" "}</div>{" "}</div>

<h3 id={"36-サードパーティsd-wanmplsとの接続"} tabIndex={-1}>{" 3.6 サードパーティ・SD-WAN・MPLSとの接続 "}</h3>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"3.6 サードパーティ・SD-WAN・MPLSとの接続（表30）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"構成"}</th><th scope="col">{"概要"}</th></tr></thead><tbody><tr className={"odd"}><td>{"MPLS + Direct Connect"}</td><td>{" 既存のMPLS網の拠点を、MPLS事業者/Direct Connectパートナー経由でAWSに接続(パートナーが用意するホスト接続やVIF) "}</td></tr><tr className={"even"}><td>{"SD-WAN + TGW Connect"}</td><td>{"SD-WAN仮想アプライアンスとTGWをGRE+BGPで接続(§2.4)"}</td></tr><tr className={"odd"}><td>{"サードパーティVPN/Transit VPC"}</td><td>{" ルーター仮想アプライアンスをVPCに置き、VPNで接続(旧来の方式。ライセンス・運用負荷が高く、現在はTGW/Cloud WANが推奨) "}</td></tr><tr className={"even"}><td>{"Cloud WAN + SD-WAN"}</td><td>{" Cloud WANの"}<strong>{"Connect(トンネルレスまたはGRE)"}</strong>{"アタッチメントでSD-WANと統合 "}</td></tr></tbody></table>{" "}</div>

<h3 id={"37-sgnaclnetwork-firewall-の使い分け境界のセキュリティ"} tabIndex={-1}>{" 3.7 SG・NACL・Network Firewall の使い分け(境界のセキュリティ) "}</h3>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"3.7 SG・NACL・Network Firewall の使い分け(境界のセキュリティ)（表31）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"項目"}</th><th scope="col">{"セキュリティグループ"}</th><th scope="col">{"NACL"}</th><th scope="col">{"Network Firewall"}</th></tr></thead><tbody><tr className={"odd"}><td>{"適用単位"}</td><td>{"ENI(インスタンス等)"}</td><td>{"サブネット"}</td><td>{"VPC(ファイアウォールサブネット経由)"}</td></tr><tr className={"even"}><td>{"ステート"}</td><td>{"ステートフル"}</td><td>{"ステートレス"}</td><td>{"ステートフル/ステートレス両方"}</td></tr><tr className={"odd"}><td>{"ルール"}</td><td>{"許可のみ"}</td><td>{"許可・拒否"}</td><td>{" 許可・拒否・アラート。ドメイン名(FQDN)、IPS(Suricata互換)対応 "}</td></tr><tr className={"even"}><td>{"主な用途"}</td><td>{"基本のアクセス制御"}</td><td>{"サブネット境界の粗いブロック"}</td><td>{"深いパケット検査、FQDNフィルタ、集中型検査"}</td></tr></tbody></table>{" "}</div>

<Diagram id="diag-17" label={"3.7 SG・NACL・Network Firewall の使い分け(境界のセキュリティ)"} />

<h3 id={"38-認証認可samlactive-directory"} tabIndex={-1}>{"3.8 認証・認可(SAML、Active Directory)"}</h3>

<p>{" ネットワークへの"}<strong>{"ユーザー単位のアクセス"}</strong>{"には AWS Client VPN を使います。 "}</p>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"3.8 認証・認可(SAML、Active Directory)（表32）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"認証方式"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className={"odd"}><td>{"相互認証(証明書)"}</td><td>{"クライアント証明書とサーバー証明書(ACM)。小規模・単純"}</td></tr><tr className={"even"}><td>{"Active Directory"}</td><td>{" AWS Directory Service(Managed Microsoft AD / AD Connector)でAD認証 "}</td></tr><tr className={"odd"}><td>{"SAML 2.0 フェデレーション"}</td><td>{"IdP(IAM Identity Center、Okta、Entra ID等)によるSSO"}</td></tr><tr className={"even"}><td>{"認可ルール"}</td><td>{" "}<strong>{"グループ/ネットワークCIDRごとに許可"}</strong>{"(ADグループやSAMLグループに紐づけ可能) "}</td></tr></tbody></table>{" "}</div>

<blockquote className={"note"}>{" "}<p>{" 試験では「社員のPCからVPCへ、SSOで接続したい」→ "}<strong>{"Client VPN + SAML"}</strong>{"、「ADのグループごとにアクセス範囲を変えたい」→ "}<strong>{"Client VPN の認可ルール(Authorization rules)"}</strong>{" という流れが典型です。 "}</p>{" "}</blockquote>

<h3 id={"39-dnsで接続を成立させるハイブリッド接続のdns"} tabIndex={-1}>{" 3.9 DNSで接続を成立させる(ハイブリッド接続のDNS) "}</h3>

<p>{" VPCを繋いでもDNS名が引けないと通信できません。詳しくは§4で扱いますが、Task 2.2では次の接続とDNSの組み合わせが問われます。 "}</p>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"3.9 DNSで接続を成立させる(ハイブリッド接続のDNS)（表33）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"状況"}</th><th scope="col">{"必要な設定"}</th></tr></thead><tbody><tr className={"odd"}><td>{"Peering先のプライベートDNS名を引きたい"}</td><td>{" PeeringでDNS解決を有効化。プライベートホストゾーンを"}<strong>{"相手VPCにも関連付け"}</strong>{" "}</td></tr><tr className={"even"}><td>{"複数VPC・複数アカウントでプライベートホストゾーンを共有"}</td><td>{" VPC関連付けの"}<strong>{"認可(authorization)"}</strong>{"後にクロスアカウントで関連付け、またはRoute 53 Profiles "}</td></tr><tr className={"odd"}><td>{"オンプレとVPCで互いに名前解決"}</td><td>{" Route 53 Resolverのインバウンド/アウトバウンドエンドポイント "}</td></tr></tbody></table>{" "}</div>

<h3 id={"310-ネットワーク監視とログtask-22"} tabIndex={-1}>{" 3.10 ネットワーク監視とログ(Task 2.2) "}</h3>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"3.10 ネットワーク監視とログ(Task 2.2)（表34）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"対象"}</th><th scope="col">{"手段"}</th></tr></thead><tbody><tr className={"odd"}><td>{"VPC内外のトラフィック"}</td><td>{"VPC Flow Logs(CloudWatch Logs / S3 / Firehose へ出力)"}</td></tr><tr className={"even"}><td>{"TGW"}</td><td>{"Transit Gateway Flow Logs"}</td></tr><tr className={"odd"}><td>{"Network Firewall"}</td><td>{"アラートログ・フローログ(S3/CloudWatch Logs/Firehose)"}</td></tr><tr className={"even"}><td>{"全体の可視化"}</td><td>{"Network Manager(TGW、Cloud WAN、VPN、SD-WANを一元表示)"}</td></tr><tr className={"odd"}><td>{"経路の検証"}</td><td>{"Reachability Analyzer、TGW Route Analyzer"}</td></tr></tbody></table>{" "}</div>
</div>;}
