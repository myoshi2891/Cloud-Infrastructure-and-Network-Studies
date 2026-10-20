import { Diagram } from '../Diagram';
/** 原本のtask3区分を全文保持する。 */
export default function Task23(){return <div className="guide-part" data-part="task3"><h2 id={"4-task-23-ハイブリッドマルチアカウントdns"} tabIndex={-1}>{" 4. Task 2.3: ハイブリッド/マルチアカウントDNS "}</h2>

<blockquote className={"note"}>{" "}<p>{"試験ガイド: Implement complex hybrid and multi-account DNS architectures"}</p>{" "}</blockquote>

<h3 id={"41-dnsの基礎と-route-53-の全体像"} tabIndex={-1}>{"4.1 DNSの基礎と Route 53 の全体像"}</h3>

<p>{" DNSは「名前(例: "}<code>{"app.example.com"}</code>{")→ IPアドレス」を引く仕組みです。Route 53 は次の3つの機能を持ちます。 "}</p>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"4.1 DNSの基礎と Route 53 の全体像（表35）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"機能"}</th><th scope="col">{"説明"}</th></tr></thead><tbody><tr className={"odd"}><td>{"ドメイン登録"}</td><td>{"ドメイン名の取得・更新"}</td></tr><tr className={"even"}><td>{"権威DNS(ホストゾーン)"}</td><td>{"ドメインのレコードを保持して応答する"}</td></tr><tr className={"odd"}><td>{"Route 53 Resolver"}</td><td>{" VPC内やオンプレからの"}<strong>{"再帰的な名前解決"}</strong>{"(リゾルバー) "}</td></tr><tr className={"even"}><td>{"ヘルスチェックとルーティング"}</td><td>{"死活監視と、DNSレベルのトラフィック制御"}</td></tr></tbody></table>{" "}</div>

<h3 id={"42-パブリックホストゾーンとプライベートホストゾーン"} tabIndex={-1}>{" 4.2 パブリックホストゾーンとプライベートホストゾーン "}</h3>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"4.2 パブリックホストゾーンとプライベートホストゾーン（表36）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"観点"}</th><th scope="col">{"パブリックホストゾーン"}</th><th scope="col">{"プライベートホストゾーン(PHZ)"}</th></tr></thead><tbody><tr className={"odd"}><td>{"応答する相手"}</td><td>{"インターネット上の誰でも"}</td><td><strong>{"関連付けたVPCからのみ"}</strong></td></tr><tr className={"even"}><td>{"用途"}</td><td>{"公開サービスのDNS"}</td><td>{"VPC内部の名前(内部サービス、DB等)"}</td></tr><tr className={"odd"}><td>{"VPC要件"}</td><td>{"なし"}</td><td>{" VPCに "}<code>{"enableDnsSupport"}</code>{" と "}<code>{"enableDnsHostnames"}</code>{" が必要 "}</td></tr><tr className={"even"}><td>{"同名の公開/非公開"}</td><td>{" "}<strong>{"スプリットホライズンDNS"}</strong>{"が可能(同じドメインで内部と外部で別の応答を返す) "}</td><td>{"PHZ が優先(関連付けたVPCからは PHZ の応答が使われる)"}</td></tr></tbody></table>{" "}</div>

<Diagram id="diag-18" label={"4.2 パブリックホストゾーンとプライベートホストゾーン"} />

<blockquote className={"note"}>{" "}<p>{" スプリットホライズン時の落とし穴: PHZ に "}<code>{"example.com"}</code>{" を作ると、そのVPCからは "}<code>{"example.com"}</code>{" 配下を"}<strong>{"PHZ の内容だけ"}</strong>{"で解決します。PHZ に無いレコード(例: "}<code>{"www"}</code>{")は引けなくなるため、公開側と同じレコードも PHZ に複製する必要があります。 "}</p>{" "}</blockquote>

<h3 id={"43-レコードタイプ"} tabIndex={-1}>{"4.3 レコードタイプ"}</h3>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"4.3 レコードタイプ（表37）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"タイプ"}</th><th scope="col">{"内容"}</th><th scope="col">{"補足"}</th></tr></thead><tbody><tr className={"odd"}><td>{"A"}</td><td>{"名前 → IPv4アドレス"}</td><td></td></tr><tr className={"even"}><td>{"AAAA"}</td><td>{"名前 → IPv6アドレス"}</td><td></td></tr><tr className={"odd"}><td>{"CNAME"}</td><td>{"名前 → 別の名前(別名)"}</td><td>{" "}<strong>{"ゾーンの頂点(ルートドメイン、例: "}<code>{"example.com"}</code>{")には作れない"}</strong>{"。他のレコードと同名で共存不可 "}</td></tr><tr className={"even"}><td><strong>{"Alias"}</strong></td><td>{" 名前 → AWSリソース(ELB、CloudFront、S3静的サイト、API Gateway等) "}</td><td>{" Route 53 独自の拡張。"}<strong>{"ゾーン頂点にも作成可能"}</strong>{"、Aliasクエリは"}<strong>{"無料"}</strong>{"、ターゲットの変更に自動追従。ヘルスの評価(Evaluate Target Health)も可能 "}</td></tr><tr className={"odd"}><td>{"TXT"}</td><td>{"任意の文字列"}</td><td>{"ドメイン所有確認、SPF/DKIM、DMARC"}</td></tr><tr className={"even"}><td>{"PTR"}</td><td>{"IPアドレス → 名前(逆引き)"}</td><td>{" 逆引きゾーン "}<code>{"in-addr.arpa"}</code>{"(IPv4)/"}<code>{"ip6.arpa"}</code>{"(IPv6)に作成 "}</td></tr><tr className={"odd"}><td>{"MX"}</td><td>{"メールサーバー"}</td><td>{"優先度付き"}</td></tr><tr className={"even"}><td>{"NS"}</td><td>{"ゾーンの権威DNSサーバー/"}<strong>{"サブドメインの委任"}</strong></td><td></td></tr><tr className={"odd"}><td>{"SOA"}</td><td>{"ゾーンの管理情報"}</td><td></td></tr><tr className={"even"}><td>{"CAA"}</td><td>{"証明書を発行できるCAを制限"}</td><td></td></tr></tbody></table>{" "}</div>

<blockquote className={"note"}>{" "}<p>{" 試験の定番: 「"}<code>{"example.com"}</code>{" の頂点でELBを指したい」→ "}<strong>{"CNAMEは不可、Aliasを使う"}</strong>{"。 "}</p>{" "}</blockquote>

<h3 id={"44-ルーティングポリシーdnsによるトラフィック管理"} tabIndex={-1}>{" 4.4 ルーティングポリシー(DNSによるトラフィック管理) "}</h3>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"4.4 ルーティングポリシー(DNSによるトラフィック管理)（表38）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"ポリシー"}</th><th scope="col">{"動作"}</th><th scope="col">{"主な用途"}</th></tr></thead><tbody><tr className={"odd"}><td>{"Simple"}</td><td>{"1つのレコードに1つ以上の値。ヘルスチェックなし"}</td><td>{"単純な構成"}</td></tr><tr className={"even"}><td>{"Weighted"}</td><td>{"重みに比例して応答を分配"}</td><td>{"カナリアリリース、A/Bテスト、段階移行"}</td></tr><tr className={"odd"}><td>{"Latency"}</td><td>{" "}<strong>{"ユーザーから最も遅延の小さいリージョン"}</strong>{"の応答 "}</td><td>{"マルチリージョンの性能最適化"}</td></tr><tr className={"even"}><td>{"Failover"}</td><td>{"プライマリが異常ならセカンダリを返す(ヘルスチェック必須)"}</td><td>{"アクティブ/スタンバイ"}</td></tr><tr className={"odd"}><td>{"Geolocation"}</td><td>{" "}<strong>{"ユーザーの所在地(国・大陸・州)"}</strong>{"で応答を変える "}</td><td>{"地域別コンテンツ、法規制、言語。デフォルトレコードを置く"}</td></tr><tr className={"even"}><td>{"Geoproximity"}</td><td>{"地理的な近さ+バイアスで配分(Traffic Flow が必要)"}</td><td>{"負荷の地理的な偏りの調整"}</td></tr><tr className={"odd"}><td>{"IP-based"}</td><td>{" クライアントの"}<strong>{"IPアドレス範囲(CIDR)"}</strong>{"で応答を変える "}</td><td>{"特定のISP・拠点を特定のエンドポイントへ"}</td></tr><tr className={"even"}><td>{"Multivalue answer"}</td><td>{"ヘルシーな複数の値(最大8個)をランダムに返す"}</td><td>{"簡易的な負荷分散+ヘルスチェック"}</td></tr></tbody></table>{" "}</div>

<Diagram id="diag-19" label={"4.4 ルーティングポリシー(DNSによるトラフィック管理)"} />

<blockquote className={"note"}>{" "}<p>{" 区別の落とし穴: "}<strong>{"Latency"}</strong>{"は「ネットワーク遅延」、"}<strong>{"Geolocation"}</strong>{"は「ユーザーの所在地」、"}<strong>{"Geoproximity"}</strong>{"は「リソースとの距離+バイアス」です。ヘルスチェックの有無で動作が変わるのは Failover/Multivalue/Weighted などです。 "}</p>{" "}</blockquote>

<p>{" ヘルスチェックの種類: エンドポイント監視(HTTP/HTTPS/TCP)、他のヘルスチェックを"}<strong>{"組合せ"}</strong>{"る計算型、"}<strong>{"CloudWatchアラームを監視"}</strong>{"する型(プライベートなリソース向け。Route 53のヘルスチェッカーはインターネット側から到達するため、プライベートIPのリソースを直接は監視できない)。 "}</p>

<h3 id={"45-route-53-resolver-とハイブリッドdns"} tabIndex={-1}>{" 4.5 Route 53 Resolver とハイブリッドDNS "}</h3>

<h4>{"4.5.1 VPCの標準リゾルバー("}<code>{".2"}</code>{" アドレス)"}</h4>

<p>{" 各VPCには、VPC CIDRのベースアドレス+2(例: "}<code>{"10.0.0.2"}</code>{")と "}<code>{"169.254.169.253"}</code>{" で"}<strong>{"Route 53 Resolver"}</strong>{"が提供されます。VPC内のリソースはこれで、PHZ・VPC内部DNS名・パブリックDNSを解決できます。"}<strong>{"VPCの外(オンプレなど)からは、このアドレスにはそのままでは問い合わせできません"}</strong>{"。 "}</p>

<h4>{"4.5.2 インバウンドエンドポイントとアウトバウンドエンドポイント"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"4.5.2 インバウンドエンドポイントとアウトバウンドエンドポイント（表39）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"エンドポイント"}</th><th scope="col">{"方向"}</th><th scope="col">{"用途"}</th><th scope="col">{"設定"}</th></tr></thead><tbody><tr className={"odd"}><td><strong>{"インバウンド"}</strong></td><td>{"オンプレ → AWS"}</td><td>{"オンプレのDNSが、AWSのPHZやVPC内部名を引く"}</td><td>{" VPC内にENI(IP)を作成。オンプレDNSからそのIPへ"}<strong>{"条件付き転送"}</strong>{" "}</td></tr><tr className={"even"}><td><strong>{"アウトバウンド"}</strong></td><td>{"AWS → オンプレ"}</td><td>{" VPCのリソースが、オンプレのドメイン(例: "}<code>{"corp.example.com"}</code>{")を引く "}</td><td>{" "}<strong>{"転送ルール(Forwarding rule)"}</strong>{"でドメインごとにオンプレDNSのIPを指定 "}</td></tr></tbody></table>{" "}</div>

<Diagram id="diag-20" label={"4.5.2 インバウンドエンドポイントとアウトバウンドエンドポイント"} />

<p>{"実装の流れ(フロー):"}</p>

<Diagram id="diag-21" label={"4.5.2 インバウンドエンドポイントとアウトバウンドエンドポイント"} />

<p>{"エンドポイントの要件と制約:"}</p>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"4.5.2 インバウンドエンドポイントとアウトバウンドエンドポイント（表40）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"項目"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className={"odd"}><td>{"IPアドレス"}</td><td>{" "}<strong>{"最低2つ(別AZ推奨)"}</strong>{"。1つあたり"}<strong>{"UDPで秒間最大約10,000クエリ"}</strong>{"が目安(プロトコルを問わない上限ではなく、クエリの種類・応答サイズなどで実際の処理量は変動) "}</td></tr><tr className={"even"}><td>{"セキュリティグループ"}</td><td>{" インバウンド: オンプレのDNSからの TCP/UDP 53。アウトバウンド: オンプレDNSへの TCP/UDP 53 "}</td></tr><tr className={"odd"}><td>{"通信経路"}</td><td>{"Direct Connect または VPN(プライベート経路)"}</td></tr><tr className={"even"}><td>{"ルールの種類"}</td><td>{" "}<strong>{"Forward"}</strong>{"(指定先へ転送)、"}<strong>{"System"}</strong>{"(転送しない例外を作る:より具体的なドメインで標準解決へ戻す)、Autodefined(AWS内部名用の自動ルール) "}</td></tr><tr className={"odd"}><td>{"ルールの一致"}</td><td>{" "}<strong>{"最も具体的(最長一致)なドメイン"}</strong>{"のルールが優先 "}</td></tr></tbody></table>{" "}</div>

<div className={"code-sample"}>{" "}<div className={"code-lang"}>{"bash"}</div>{" "}<div className="code-block highlight" role="region" tabIndex={0} aria-label={"4.5.2 インバウンドエンドポイントとアウトバウンドエンドポイント（コード6）"}><div className="code-line"><span className={"c1"}>{"# アウトバウンドエンドポイントの作成"}</span></div>
<div className="code-line">{"aws"}<span className={"w"}>{" "}</span>{"route53resolver"}<span className={"w"}>{" "}</span>{"create-resolver-endpoint"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--name"}<span className={"w"}>{" "}</span>{"outbound-to-onprem"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--creator-request-id"}<span className={"w"}>{" "}</span>{"outbound-001"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--direction"}<span className={"w"}>{" "}</span>{"OUTBOUND"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--security-group-ids"}<span className={"w"}>{" "}</span>{"sg-0123456789abcdef0"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--ip-addresses"}<span className={"w"}>{" "}</span><span className={"nv"}>{"SubnetId"}</span><span className={"o"}>{"="}</span>{"subnet-aaaa1111"}<span className={"w"}>{" "}</span><span className={"nv"}>{"SubnetId"}</span><span className={"o"}>{"="}</span>{"subnet-bbbb2222"}</div>
<div className="code-line"></div>
<div className="code-line"><span className={"c1"}>{"# 転送ルール(corp.example.com をオンプレのDNSへ)"}</span></div>
<div className="code-line">{"aws"}<span className={"w"}>{" "}</span>{"route53resolver"}<span className={"w"}>{" "}</span>{"create-resolver-rule"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--name"}<span className={"w"}>{" "}</span>{"fwd-corp"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--creator-request-id"}<span className={"w"}>{" "}</span>{"rule-001"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--rule-type"}<span className={"w"}>{" "}</span>{"FORWARD"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--domain-name"}<span className={"w"}>{" "}</span>{"corp.example.com"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--resolver-endpoint-id"}<span className={"w"}>{" "}</span>{"rslvr-out-0123456789abcdef0"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--target-ips"}<span className={"w"}>{" "}</span><span className={"nv"}>{"Ip"}</span><span className={"o"}>{"="}</span><span className={"m"}>{"192"}</span>{".168.10.10,Port"}<span className={"o"}>{"="}</span><span className={"m"}>{"53"}</span><span className={"w"}>{" "}</span><span className={"nv"}>{"Ip"}</span><span className={"o"}>{"="}</span><span className={"m"}>{"192"}</span>{".168.20.10,Port"}<span className={"o"}>{"="}</span><span className={"m"}>{"53"}</span></div>
<div className="code-line"></div>
<div className="code-line"><span className={"c1"}>{"# ルールをVPCに関連付け"}</span></div>
<div className="code-line">{"aws"}<span className={"w"}>{" "}</span>{"route53resolver"}<span className={"w"}>{" "}</span>{"associate-resolver-rule"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--resolver-rule-id"}<span className={"w"}>{" "}</span>{"rslvr-rr-0123456789abcdef0"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--vpc-id"}<span className={"w"}>{" "}</span>{"vpc-0123456789abcdef0"}</div></div>{" "}</div>

<h3 id={"46-マルチアカウントでのdns共有"} tabIndex={-1}>{"4.6 マルチアカウントでのDNS共有"}</h3>

<h4>{"4.6.1 3つの共有方法"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"4.6.1 3つの共有方法（表41）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"共有対象"}</th><th scope="col">{"方法"}</th></tr></thead><tbody><tr className={"odd"}><td>{"Resolver転送ルール"}</td><td>{" "}<strong>{"AWS RAM"}</strong>{"で他アカウント/Organizationに共有し、受け取った側がVPCに関連付ける "}</td></tr><tr className={"even"}><td>{"プライベートホストゾーン"}</td><td>{" "}<strong>{"クロスアカウントのVPC関連付け"}</strong>{"(認可 → 関連付け)。"}<strong>{"RAMではPHZ自体は共有しない"}</strong>{" "}</td></tr><tr className={"odd"}><td>{"一括管理"}</td><td>{" "}<strong>{"Route 53 Profiles"}</strong>{"(PHZ、Resolverルール、DNS Firewallのルールグループ等をまとめて共有し、VPCに適用) "}</td></tr></tbody></table>{" "}</div>

<p>{"PHZのクロスアカウント関連付け(これはCLIのみで可能な操作がある):"}</p>

<div className={"code-sample"}>{" "}<div className={"code-lang"}>{"bash"}</div>{" "}<div className="code-block highlight" role="region" tabIndex={0} aria-label={"4.6.1 3つの共有方法（コード7）"}><div className="code-line"><span className={"c1"}>{"# 1) PHZ所有アカウントで: 別アカウントのVPCに関連付けを認可"}</span></div>
<div className="code-line">{"aws"}<span className={"w"}>{" "}</span>{"route53"}<span className={"w"}>{" "}</span>{"create-vpc-association-authorization"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--hosted-zone-id"}<span className={"w"}>{" "}</span>{"Z0123456789ABCDEFGHIJ"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--vpc"}<span className={"w"}>{" "}</span><span className={"nv"}>{"VPCRegion"}</span><span className={"o"}>{"="}</span>{"ap-northeast-1,VPCId"}<span className={"o"}>{"="}</span>{"vpc-0aaaa1111"}</div>
<div className="code-line"></div>
<div className="code-line"><span className={"c1"}>{"# 2) VPC所有アカウントで: 関連付けを実行"}</span></div>
<div className="code-line">{"aws"}<span className={"w"}>{" "}</span>{"route53"}<span className={"w"}>{" "}</span>{"associate-vpc-with-hosted-zone"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--hosted-zone-id"}<span className={"w"}>{" "}</span>{"Z0123456789ABCDEFGHIJ"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--vpc"}<span className={"w"}>{" "}</span><span className={"nv"}>{"VPCRegion"}</span><span className={"o"}>{"="}</span>{"ap-northeast-1,VPCId"}<span className={"o"}>{"="}</span>{"vpc-0aaaa1111"}</div>
<div className="code-line"></div>
<div className="code-line"><span className={"c1"}>{"# 3) (任意)PHZ所有アカウントで認可を削除"}</span></div>
<div className="code-line">{"aws"}<span className={"w"}>{" "}</span>{"route53"}<span className={"w"}>{" "}</span>{"delete-vpc-association-authorization"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--hosted-zone-id"}<span className={"w"}>{" "}</span>{"Z0123456789ABCDEFGHIJ"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--vpc"}<span className={"w"}>{" "}</span><span className={"nv"}>{"VPCRegion"}</span><span className={"o"}>{"="}</span>{"ap-northeast-1,VPCId"}<span className={"o"}>{"="}</span>{"vpc-0aaaa1111"}</div></div>{" "}</div>

<h4>{"4.6.2 集中型 と 分散型 のDNSアーキテクチャ"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"4.6.2 集中型 と 分散型 のDNSアーキテクチャ（表42）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"観点"}</th><th scope="col">{"集中型(Centralized)"}</th><th scope="col">{"分散型(Distributed)"}</th></tr></thead><tbody><tr className={"odd"}><td>{"構成"}</td><td>{" 共有サービスVPCにResolverエンドポイントを集約。他VPCはルール共有+PHZ関連付けで利用 "}</td><td>{"各VPC/アカウントが自前のResolverルール・エンドポイント"}</td></tr><tr className={"even"}><td>{"長所"}</td><td>{"管理とコストの集約、ルールの一貫性"}</td><td>{"障害の局所化、アカウントごとの独立性"}</td></tr><tr className={"odd"}><td>{"短所"}</td><td>{"集約VPCが障害点・クエリ上限に注意"}</td><td>{"構成の重複、運用負荷"}</td></tr><tr className={"even"}><td>{"推奨"}</td><td>{"多くの大規模環境で出発点"}</td><td>{"隔離要件が強い場合"}</td></tr></tbody></table>{" "}</div>

<Diagram id="diag-22" label={"4.6.2 集中型 と 分散型 のDNSアーキテクチャ"} />

<h3 id={"47-dns-の委任と条件付き転送"} tabIndex={-1}>{"4.7 DNS の委任と条件付き転送"}</h3>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"4.7 DNS の委任と条件付き転送（表43）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"用語"}</th><th scope="col">{"説明"}</th></tr></thead><tbody><tr className={"odd"}><td>{"委任(Delegation)"}</td><td>{" 親ゾーンに"}<strong>{"サブドメインのNSレコード"}</strong>{"を置き、サブドメインの管理を別のゾーン(別アカウント・別サーバー)に任せる "}</td></tr><tr className={"even"}><td>{"条件付き転送(Conditional Forwarding)"}</td><td>{"特定のドメイン宛の問い合わせだけを指定のDNSへ転送する"}</td></tr><tr className={"odd"}><td>{"使い分け"}</td><td>{" 権威ゾーンを分けたい → "}<strong>{"委任"}</strong>{"。ハイブリッドで名前空間を重ねたくない → "}<strong>{"条件付き転送"}</strong>{"(Resolver) "}</td></tr></tbody></table>{" "}</div>

<h3 id={"48-dnssecroute-53"} tabIndex={-1}>{"4.8 DNSSEC(Route 53)"}</h3>

<p>{" DNSSECは、DNS応答が"}<strong>{"改ざんされていないこと"}</strong>{"を電子署名で検証できるようにする仕組みです。 "}</p>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"4.8 DNSSEC(Route 53)（表44）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"項目"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className={"odd"}><td>{"目的"}</td><td>{"DNSキャッシュポイズニング等への対策(応答の真正性・完全性)"}</td></tr><tr className={"even"}><td>{"署名"}</td><td>{" パブリックホストゾーンで有効化。"}<strong>{"KSK(Key Signing Key)"}</strong>{"を使って署名 "}</td></tr><tr className={"odd"}><td>{"KMS"}</td><td>{" KSKの元になる"}<strong>{"非対称KMSキー(ECC_NIST_P256、署名/検証用)"}</strong>{"を、"}<strong>{"米国東部(N. Virginia、us-east-1)に作成"}</strong>{"する必要がある "}</td></tr><tr className={"even"}><td>{"信頼の連鎖"}</td><td>{" 親ゾーン(例: "}<code>{".com"}</code>{")に、ゾーンの"}<strong>{"DSレコード"}</strong>{"を登録して信頼の連鎖(chain of trust)を完成させる "}</td></tr><tr className={"odd"}><td>{"対象"}</td><td>{" "}<strong>{"パブリックホストゾーンの署名"}</strong>{"。ResolverのDNSSEC検証(VPC内でのレスポンス検証)も別途有効化できる "}</td></tr></tbody></table>{" "}</div>

<Diagram id="diag-23" label={"4.8 DNSSEC(Route 53)"} />

<p>{"DNSSEC運用上の注意:"}</p>

<ul>{" "}<li>{" DS登録後に"}<strong>{"KMSキーを削除/無効化・KSKを不適切に扱うと、名前解決が失敗"}</strong>{"します(署名検証エラー)。 "}</li>{" "}<li>{" 有効化の前に"}<strong>{"TTLを短縮"}</strong>{"し、問題が出たら"}<strong>{"DSを先に削除"}</strong>{"してから署名を無効化する、というロールバック順序を守ります。 "}</li>{" "}<li>{" CloudWatchアラーム("}<code>{"DNSSECInternalFailure"}</code>{"、"}<code>{"DNSSECKeySigningKeysNeedingAction"}</code>{")で署名の異常を監視します。 "}</li>{" "}</ul>

<h3 id={"49-dnsの監視とログ"} tabIndex={-1}>{"4.9 DNSの監視とログ"}</h3>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"4.9 DNSの監視とログ（表45）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"種類"}</th><th scope="col">{"内容"}</th><th scope="col">{"出力先"}</th></tr></thead><tbody><tr className={"odd"}><td>{"パブリックDNSクエリログ"}</td><td>{"パブリックホストゾーンへのクエリ"}</td><td><strong>{"CloudWatch Logs(us-east-1)"}</strong></td></tr><tr className={"even"}><td>{"Resolverクエリログ"}</td><td>{"VPC内からのクエリ(VPC・インスタンス・結果等)"}</td><td>{"CloudWatch Logs / S3 / Kinesis Data Firehose"}</td></tr><tr className={"odd"}><td>{"ヘルスチェックの監視"}</td><td>{"ヘルスチェックのステータス"}</td><td>{"CloudWatchメトリクス/アラーム、SNS通知"}</td></tr><tr className={"even"}><td>{"Route 53 Resolver DNS Firewall"}</td><td>{"悪意のあるドメインへのクエリをブロック/アラート"}</td><td>{"ログはResolverクエリログ等"}</td></tr></tbody></table>{" "}</div>

<h3 id={"410--ベストプラクティスdns"} tabIndex={-1}>{"4.10 ✅ ベストプラクティス(DNS)"}</h3>

<ol>{" "}<li>{" ハイブリッドDNSは"}<strong>{"Resolverエンドポイント(インバウンド/アウトバウンド)"}</strong>{"で構築し、各エンドポイントに"}<strong>{"2つ以上のIP(別AZ)"}</strong>{"を割り当てる。 "}</li>{" "}<li>{" 転送ルールは"}<strong>{"RAM(またはProfiles)で共有"}</strong>{"し、アカウントごとに重複作成しない。 "}</li>{" "}<li>{" ゾーン頂点のAWSリソース指定は"}<strong>{"Alias"}</strong>{"。同一リージョンのELB等はAliasで"}<strong>{"クエリ料金を節約"}</strong>{"。 "}</li>{" "}<li>{" 重要サービスは"}<strong>{"ヘルスチェック + Failover/Latency"}</strong>{"を組み合わせ、TTLを適切に短くする。 "}</li>{" "}<li>{" 本番のパブリックゾーンには"}<strong>{"DNSSEC"}</strong>{"を検討し、KMSキーの管理・監視を徹底する。 "}</li>{" "}<li>{" "}<strong>{"DNS Firewall"}</strong>{" で悪意のあるドメインを制限し、"}<strong>{"クエリログ"}</strong>{"を保管する。 "}</li>{" "}<li>{" 集中型DNSではエンドポイントのクエリ上限(IPあたり)に注意し、キャッシュとTTLを活用する。 "}</li>{" "}</ol>
</div>;}
