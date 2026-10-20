import {Diagram} from '../Diagram';
/** 原本のtask2を全文・順序どおり保持する。 */
export default function Task12(){return <section className="guide-part" data-part="task2"><h2 id={"task-12-dns-設計"} tabIndex={-1}>{"Task 1.2: DNS 設計"}</h2>
{" "}
<p >{" タスク文: パブリック、プライベート、ハイブリッドの要件を満たす DNS ソリューションを設計する。 "}</p>
{" "}
<h3 id={"試験ガイドが求める内容-1"} tabIndex={-1}>{"試験ガイドが求める内容"}</h3>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"試験ガイドが求める内容（表17）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"区分"}</th><th scope="col">{"項目"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"Knowledge"}</td><td >{" DNS プロトコル (DNS レコード、TTL、DNSSEC、DNS 委任、ゾーン) "}</td></tr><tr className={"even"}><td >{"Knowledge"}</td><td >{"DNS のログとモニタリング"}</td></tr><tr className={"odd"}><td >{"Knowledge"}</td><td >{" Route 53 の機能 (エイリアスレコード、トラフィックポリシー、Resolver、ヘルスチェック) "}</td></tr><tr className={"even"}><td >{"Knowledge"}</td><td >{" Route 53 と他のネットワークサービス (Amazon VPC など) の統合 "}</td></tr><tr className={"odd"}><td >{"Knowledge"}</td><td >{" Route 53 とハイブリッド、マルチアカウント、マルチリージョン構成の統合 "}</td></tr><tr className={"even"}><td >{"Knowledge"}</td><td >{"ドメイン登録"}</td></tr><tr className={"odd"}><td >{"Skills"}</td><td >{" パブリックホストゾーン、プライベートホストゾーン、Resolver エンドポイントの利用、Route 53 によるグローバルトラフィック管理、ドメイン登録の作成と管理 "}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id={"ステップ-1-dns-の基礎"} tabIndex={-1}>{"ステップ 1: DNS の基礎"}</h3>
{" "}
<p >{" DNS は「名前 (www.example.com)」を「IP アドレス」に変換する分散データベースです。 "}</p>
{" "}
<h4 >{"名前解決の流れ"}</h4>
{" "}
<Diagram id="diag-4" label={"名前解決の流れ"} />
{" "}
<h4 >{"主な DNS レコードタイプ"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"主な DNS レコードタイプ（表18）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"タイプ"}</th><th scope="col">{"用途"}</th><th scope="col">{"補足"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"A と AAAA"}</td><td >{"名前を IPv4 と IPv6 アドレスに対応付ける"}</td><td >{"AAAA は IPv6"}</td></tr><tr className={"even"}><td >{"CNAME"}</td><td >{"名前を別の名前の別名にする"}</td><td >{"ゾーンの頂点 (example.com そのもの) には作れない"}</td></tr><tr className={"odd"}><td >{"NS"}</td><td >{"そのゾーンを管理する権威サーバーを示す"}</td><td >{"サブドメインの委任にも使う"}</td></tr><tr className={"even"}><td >{"SOA"}</td><td >{"ゾーンの管理情報 (シリアル、ネガティブキャッシュ TTL など)"}</td><td >{"ゾーン作成時に自動で作られる"}</td></tr><tr className={"odd"}><td >{"MX"}</td><td >{"メールサーバー"}</td><td >{"優先度つき"}</td></tr><tr className={"even"}><td >{"TXT"}</td><td >{"任意の文字列"}</td><td >{"ドメイン所有確認、SPF、DKIM など"}</td></tr><tr className={"odd"}><td >{"PTR"}</td><td >{"IP から名前への逆引き"}</td><td >{"逆引きゾーンに作る"}</td></tr><tr className={"even"}><td >{"SRV"}</td><td >{"サービスの場所とポート"}</td><td ></td></tr><tr className={"odd"}><td >{"CAA"}</td><td >{"証明書を発行してよい認証局を制限する"}</td><td >{"セキュリティ強化に有効"}</td></tr><tr className={"even"}><td >{"DS"}</td><td >{"DNSSEC の信頼の連鎖で、親ゾーンに登録する署名鍵の要約"}</td><td >{"DNSSEC で使用"}</td></tr></tbody></table>{" "}</div>
{" "}
<h4 >{"TTL (Time To Live)"}</h4>
{" "}
<ul >{" "}<li >{"リゾルバーが応答をキャッシュしておく秒数。"}</li>{" "}<li >{" TTL を長くすると、問い合わせ回数が減って高速になるが、変更の反映が遅れる。 "}</li>{" "}<li >{" TTL を短くすると、変更やフェイルオーバーの反映は速いが、問い合わせ回数が増える。 "}</li>{" "}<li >{"移行作業の前に TTL を短くしておき、切り替え後に戻す運用が定番。"}</li>{" "}</ul>
{" "}
<h4 >{"ゾーンと委任"}</h4>
{" "}
<ul >{" "}<li >{"ゾーン: 一つの管理主体が管理する DNS 名前空間の範囲。"}</li>{" "}<li >{" 委任: 親ゾーンに NS レコードを置いて、サブドメイン (例: dev.example.com) の管理を別のゾーンや別のアカウントに任せること。 "}</li>{" "}<li >{" 委任セット: 同じ 4 つのネームサーバーを複数のゾーンで再利用できる Route 53 の機能。 "}</li>{" "}</ul>
{" "}
<h4 >{"DNSSEC"}</h4>
{" "}
<p >{" DNSSEC は、DNS の応答が改ざんされていないことを、デジタル署名で検証できるようにする仕組みです。 "}</p>
{" "}
<ul >{" "}<li >{" 署名鍵を使ってレコードに署名し、親ゾーンに登録した DS レコードを起点に、信頼の連鎖で検証する。 "}</li>{" "}<li >{" Route 53 では、AWS KMS の非対称カスタマーマネージドキー (us-east-1 に作成、ECC_NIST_P256) をキー署名鍵 (KSK) として使う。 "}</li>{" "}<li >{" 有効化の流れは、(1) 署名を有効化、(2) 親ゾーン (レジストラ) に DS レコードを登録、の 2 段階。 "}</li>{" "}<li >{" ベストプラクティスとして、有効化前に TTL を短くし、署名に関するエラーのアラームを設定しておく。鍵の管理を誤ると、名前解決が失敗する可能性がある。 "}</li>{" "}<li >{" Route 53 Resolver には、DNSSEC の検証を有効にする機能もある (署名検証の失敗した応答を拒否できる)。 "}</li>{" "}</ul>
{" "}
<h3 id={"ステップ-2-route-53-の主要機能"} tabIndex={-1}>{"ステップ 2: Route 53 の主要機能"}</h3>
{" "}
<h4 >{"ホストゾーン"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ホストゾーン（表19）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"種類"}</th><th scope="col">{"用途"}</th><th scope="col">{"特徴"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"パブリックホストゾーン"}</td><td >{"インターネットに公開する名前"}</td><td >{"世界中の DNS リゾルバーから問い合わせ可能"}</td></tr><tr className={"even"}><td >{"プライベートホストゾーン"}</td><td >{"VPC 内だけで名前解決する内部向けの名前"}</td><td >{"関連付けた VPC からのみ解決できる"}</td></tr></tbody></table>{" "}</div>
{" "}
<h4 >{"プライベートホストゾーンの要点"}</h4>
{" "}
<ul >{" "}<li >{" VPC の設定で、DNS ホスト名と DNS 解決 (enableDnsHostnames と enableDnsSupport) を両方有効にする必要がある。 "}</li>{" "}<li >{" パブリックと同名のプライベートゾーンを作ると、関連付けた VPC 内ではプライベートが優先される。内部と外部で違う答えを返す「スプリットビュー DNS」を実現できる。 "}</li>{" "}<li >{" 別アカウントの VPC を関連付けるには、ホストゾーンのあるアカウントで関連付けの承認を作成し、VPC 側のアカウントで関連付ける (CLI か API で行う)。 "}</li>{" "}</ul>
{" "}
<div className="code-block" role="region" tabIndex={0} aria-label={"プライベートホストゾーンの要点（コード2）"}><div className="code-line"><span className="ans-code-token-0">{"# 1. ゾーンを持つアカウント側で、別アカウントの VPC の関連付けを承認する"}</span></div>
<div className="code-line">{"aws"}<span className="ans-code-token-1">{" "}</span>{"route53"}<span className="ans-code-token-1">{" "}</span>{"create-vpc-association-authorization"}<span className="ans-code-token-1">{" "}</span><span className="ans-code-token-2">{"\\"}</span></div>
<div className="code-line"><span className="ans-code-token-1">{"  "}</span>{"--hosted-zone-id"}<span className="ans-code-token-1">{" "}</span>{"Z0123456789ABCDEFGHIJ"}<span className="ans-code-token-1">{" "}</span><span className="ans-code-token-2">{"\\"}</span></div>
<div className="code-line"><span className="ans-code-token-1">{"  "}</span>{"--vpc"}<span className="ans-code-token-1">{" "}</span><span className="ans-code-token-4">{"VPCRegion"}</span><span className="ans-code-token-5">{"="}</span>{"ap-northeast-1,VPCId"}<span className="ans-code-token-5">{"="}</span>{"vpc-0123456789abcdef0"}</div>
<div className="code-line"></div>
<div className="code-line"><span className="ans-code-token-0">{"# 2. VPC を持つアカウント側で、VPC をホストゾーンに関連付ける"}</span></div>
<div className="code-line">{"aws"}<span className="ans-code-token-1">{" "}</span>{"route53"}<span className="ans-code-token-1">{" "}</span>{"associate-vpc-with-hosted-zone"}<span className="ans-code-token-1">{" "}</span><span className="ans-code-token-2">{"\\"}</span></div>
<div className="code-line"><span className="ans-code-token-1">{"  "}</span>{"--hosted-zone-id"}<span className="ans-code-token-1">{" "}</span>{"Z0123456789ABCDEFGHIJ"}<span className="ans-code-token-1">{" "}</span><span className="ans-code-token-2">{"\\"}</span></div>
<div className="code-line"><span className="ans-code-token-1">{"  "}</span>{"--vpc"}<span className="ans-code-token-1">{" "}</span><span className="ans-code-token-4">{"VPCRegion"}</span><span className="ans-code-token-5">{"="}</span>{"ap-northeast-1,VPCId"}<span className="ans-code-token-5">{"="}</span>{"vpc-0123456789abcdef0"}</div></div>
{" "}
<h4 >{"エイリアスレコードと CNAME の違い"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"エイリアスレコードと CNAME の違い（表20）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"観点"}</th><th scope="col">{"エイリアスレコード"}</th><th scope="col">{"CNAME"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"ゾーンの頂点 (apex)"}</td><td >{"使える"}</td><td >{"使えない"}</td></tr><tr className={"even"}><td >{"指し先"}</td><td >{" AWS リソース (CloudFront、ELB、API Gateway、Global Accelerator、S3 ウェブサイト、VPC エンドポイント、同一ゾーン内のレコードなど) "}</td><td >{"任意のドメイン名"}</td></tr><tr className={"odd"}><td >{"クエリ料金"}</td><td >{"AWS リソース宛てなら無料"}</td><td >{"課金される"}</td></tr><tr className={"even"}><td >{"ヘルスの評価"}</td><td >{"ターゲットのヘルス評価が可能"}</td><td >{"なし"}</td></tr><tr className={"odd"}><td >{"備考"}</td><td >{"Route 53 独自の拡張"}</td><td >{"DNS の標準仕様"}</td></tr></tbody></table>{" "}</div>
{" "}
<h4 >{"ルーティングポリシー"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ルーティングポリシー（表21）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"ポリシー"}</th><th scope="col">{"動作"}</th><th scope="col">{"典型的な用途"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"シンプル"}</td><td >{"1 つのリソースに応答 (複数の値も可)"}</td><td >{"単一のサーバー"}</td></tr><tr className={"even"}><td >{"加重"}</td><td >{"設定した重みの割合で振り分け"}</td><td >{"カナリアリリース、段階的移行"}</td></tr><tr className={"odd"}><td >{"レイテンシー"}</td><td >{"AWS リージョンまでの遅延が最も小さいリージョンへ"}</td><td >{"マルチリージョンの性能最適化"}</td></tr><tr className={"even"}><td >{"フェイルオーバー"}</td><td >{"プライマリが異常ならセカンダリへ"}</td><td >{"アクティブ・パッシブ構成"}</td></tr><tr className={"odd"}><td >{"位置情報"}</td><td >{"ユーザーの地理的な場所 (大陸、国、米国の州) で決める"}</td><td >{"地域ごとのコンテンツ、法令対応"}</td></tr><tr className={"even"}><td >{"地理的近接"}</td><td >{"リソースとユーザーの距離で決め、バイアスで範囲を調整"}</td><td >{"地域間のトラフィック量の調整"}</td></tr><tr className={"odd"}><td >{"IP ベース"}</td><td >{"クライアントの IP アドレス範囲 (CIDR) で決める"}</td><td >{"特定のネットワークや ISP の振り分け"}</td></tr><tr className={"even"}><td >{"複数値回答"}</td><td >{"最大 8 つの正常なレコードを返す"}</td><td >{"簡易的な負荷分散と健全性確認"}</td></tr></tbody></table>{" "}</div>
{" "}
<Diagram id="diag-5" label={"ルーティングポリシー"} />
{" "}
<p >{" 落とし穴: 位置情報ルーティングでは、どの場所にも一致しない場合のために「デフォルト」レコードを用意しないと、応答なしになるクライアントが出ます。 "}</p>
{" "}
<h4 >{"トラフィックポリシー (Traffic Flow)"}</h4>
{" "}
<p >{" 複数のルーティングポリシー (例: 位置情報の下にレイテンシー、その下にフェイルオーバー) を組み合わせた複雑な構成を、ビジュアルエディターで作る機能です。作ったポリシーは、複数のドメイン名に再利用できます。 "}</p>
{" "}
<h4 >{"ヘルスチェック"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ヘルスチェック（表22）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"種類"}</th><th scope="col">{"内容"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"エンドポイントの監視"}</td><td >{" HTTP、HTTPS、TCP で、指定エンドポイントの死活を監視。文字列一致も可能 "}</td></tr><tr className={"even"}><td >{"計算されたヘルスチェック"}</td><td >{"複数のヘルスチェックを AND、OR、しきい値で組み合わせる"}</td></tr><tr className={"odd"}><td >{"CloudWatch アラームの監視"}</td><td >{"アラームの状態をヘルスチェックの結果とみなす"}</td></tr></tbody></table>{" "}</div>
{" "}
<ul >{" "}<li >{" ヘルスチェッカーはインターネット上の Route 53 の IP から問い合わせてくるため、エンドポイントのファイアウォールで許可する必要がある。 "}</li>{" "}<li >{" プライベートな (インターネットから到達できない) リソースの監視には、CloudWatch アラームに基づくヘルスチェックを使う。 "}</li>{" "}<li >{" エイリアスレコードの「ターゲットのヘルスを評価」を有効にすると、ELB などのヘルスを自動で反映できる。 "}</li>{" "}</ul>
{" "}
<h3 id={"ステップ-3-ハイブリッド-dns-route-53-resolver"} tabIndex={-1}>{" ステップ 3: ハイブリッド DNS (Route 53 Resolver) "}</h3>
{" "}
<p >{" VPC には、Amazon が提供する DNS リゾルバー (VPC の CIDR のベースアドレス + 2、または 169.254.169.253) があり、標準で VPC 内の名前解決を行います。オンプレミスとの間で名前を相互に解決するために、Resolver エンドポイントを使います。 "}</p>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ステップ 3: ハイブリッド DNS (Route 53 Resolver)（表23）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"コンポーネント"}</th><th scope="col">{"方向"}</th><th scope="col">{"役割"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"インバウンドエンドポイント"}</td><td >{"オンプレミス から AWS"}</td><td >{" オンプレミスの DNS が、VPC 内の IP アドレス宛てに転送すると、プライベートホストゾーンなどの名前を解決できる "}</td></tr><tr className={"even"}><td >{"アウトバウンドエンドポイント"}</td><td >{"AWS から オンプレミス"}</td><td >{" 転送ルールに従って、特定ドメインの問い合わせをオンプレミスの DNS サーバーへ送る "}</td></tr><tr className={"odd"}><td >{"転送ルール"}</td><td >{"AWS から オンプレミス"}</td><td >{" 「どのドメインを、どの DNS サーバーへ転送するか」を定義する。VPC に関連付けて使う "}</td></tr></tbody></table>{" "}</div>
{" "}
<h4 >{"オンプレミスから AWS の名前を引く (インバウンド)"}</h4>
{" "}
<Diagram id="diag-6" label={"オンプレミスから AWS の名前を引く (インバウンド)"} />
{" "}
<h4 >{"AWS からオンプレミスの名前を引く (アウトバウンド)"}</h4>
{" "}
<Diagram id="diag-7" label={"AWS からオンプレミスの名前を引く (アウトバウンド)"} />
{" "}
<h4 >{"Resolver の設計ポイント"}</h4>
{" "}
<ul >{" "}<li >{" エンドポイントは、高可用性のため、複数の AZ に IP アドレス (ENI) を配置する (最低 2 つ)。 "}</li>{" "}<li >{" エンドポイントのセキュリティグループで、DNS のポート (UDP と TCP の 53。暗号化 DNS を使う場合は 853 や 443) を許可する。 "}</li>{" "}<li >{" 転送ルールは AWS RAM で複数アカウントに共有できる。一方、ルールの関連付けは VPC ごとに必要。 "}</li>{" "}<li >{"ルールは、最も具体的なドメイン名のものが優先される。"}</li>{" "}<li >{" 1 つの ENI あたりの問い合わせ処理能力には上限がある。VPC の Amazon 提供 DNS には、ENI あたり 1 秒間 1,024 パケットの上限があるため、大量の問い合わせがある環境ではキャッシュや分散を考える。 "}</li>{" "}<li >{" Route 53 Resolver DNS Firewall で、ドメインリストに基づいて VPC からの DNS 問い合わせをフィルタリングできる (ドメイン 4 でも登場)。 "}</li>{" "}</ul>
{" "}
<h4 >{"マルチアカウントとマルチリージョンの設計"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"マルチアカウントとマルチリージョンの設計（表24）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"課題"}</th><th scope="col">{"解決策"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"多数の VPC で同じ内部ゾーンを使いたい"}</td><td >{" プライベートホストゾーンを複数の VPC に関連付ける (別アカウントなら承認が必要) "}</td></tr><tr className={"even"}><td >{"各 VPC に Resolver エンドポイントを作りたくない"}</td><td >{" ハブとなる VPC (共有サービス VPC) に集約し、転送ルールを RAM で共有する "}</td></tr><tr className={"odd"}><td >{"DNS の設定をまとめて配りたい"}</td><td >{" Route 53 Profiles で、プライベートホストゾーン、Resolver ルール、DNS Firewall ルールグループを束ね、複数の VPC やアカウントに適用する "}</td></tr><tr className={"even"}><td >{"複数リージョンのアプリケーション"}</td><td >{" プライベートホストゾーンは複数リージョンの VPC に関連付け可能。Resolver エンドポイントはリージョンごとに作る "}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id={"ステップ-4-route-53-によるグローバルトラフィック管理"} tabIndex={-1}>{" ステップ 4: Route 53 によるグローバルトラフィック管理 "}</h3>
{" "}
<ul >{" "}<li >{" レイテンシールーティングで、ユーザーに最も遅延の小さいリージョンへ誘導する。 "}</li>{" "}<li >{" フェイルオーバーとヘルスチェックで、リージョン障害時にセカンダリへ切り替える。 "}</li>{" "}<li >{"位置情報ルーティングで、データ主権や言語に応じて振り分ける。"}</li>{" "}<li >{" DNS ベースの制御は、リゾルバーのキャッシュ (TTL) により、切り替え完了までに時間差が出る点に注意する。即時性が重要なら、Global Accelerator と組み合わせる。 "}</li>{" "}</ul>
{" "}
<h3 id={"ステップ-5-dns-のログとモニタリング"} tabIndex={-1}>{" ステップ 5: DNS のログとモニタリング "}</h3>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ステップ 5: DNS のログとモニタリング（表25）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"対象"}</th><th scope="col">{"手段"}</th><th scope="col">{"出力先"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"パブリックホストゾーンへの問い合わせ"}</td><td >{"DNS クエリログ"}</td><td >{"CloudWatch Logs (us-east-1 のロググループ)"}</td></tr><tr className={"even"}><td >{"VPC 内からの DNS 問い合わせ"}</td><td >{"Resolver クエリログ"}</td><td >{"CloudWatch Logs、S3、Data Firehose"}</td></tr><tr className={"odd"}><td >{"ヘルスチェックの状態"}</td><td >{"CloudWatch メトリクス (HealthCheckStatus など) とアラーム"}</td><td >{"CloudWatch (us-east-1)"}</td></tr><tr className={"even"}><td >{"Resolver エンドポイントの状態"}</td><td >{"CloudWatch メトリクス (問い合わせ量など)"}</td><td >{"CloudWatch"}</td></tr><tr className={"odd"}><td >{"API の操作履歴"}</td><td >{"AWS CloudTrail"}</td><td >{"S3、CloudWatch Logs"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id={"ステップ-6-ドメイン登録"} tabIndex={-1}>{"ステップ 6: ドメイン登録"}</h3>
{" "}
<ul >{" "}<li >{" Route 53 は、ドメインレジストラーとしてドメインの登録、更新、移管を行える (Route 53 を通じて登録すると、パブリックホストゾーンが自動的に作られる)。 "}</li>{" "}<li >{" 他社のレジストラーで登録したドメインでも、Route 53 のホストゾーンを使える。その場合、レジストラー側のネームサーバーを、Route 53 のホストゾーンに表示される 4 つの NS 値に変更する (委任)。 "}</li>{" "}<li >{" 運用上の要点は、自動更新の有効化、転送ロック (不正な移管の防止)、WHOIS 情報のプライバシー保護、DNSSEC を使う場合の DS レコード登録。 "}</li>{" "}<li >{"ドメインの移管には認証コードが必要。"}</li>{" "}<li >{" 登録、更新、移管の API は、バージニア北部 (us-east-1) のエンドポイントを使う。 "}</li>{" "}</ul>
{" "}
<h3 id={"ベストプラクティス-task-12"} tabIndex={-1}>{"ベストプラクティス (Task 1.2)"}</h3>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ベストプラクティス (Task 1.2)（表26）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"項目"}</th><th scope="col">{"ベストプラクティス"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"レコード設計"}</td><td >{" AWS リソースへのレコードは、エイリアスレコードを使う (apex でも使え、クエリ無料) "}</td></tr><tr className={"even"}><td >{"TTL"}</td><td >{"変更予定がある前は TTL を短くし、安定時は長くする"}</td></tr><tr className={"odd"}><td >{"可用性"}</td><td >{" ヘルスチェックとフェイルオーバーを併用し、Resolver エンドポイントは複数の AZ に置く "}</td></tr><tr className={"even"}><td >{"内外分離"}</td><td >{" 内部専用の名前はプライベートホストゾーンに置き、スプリットビューを活用する "}</td></tr><tr className={"odd"}><td >{"ハイブリッド"}</td><td >{" 集約した共有サービス VPC に Resolver エンドポイントを置き、ルールは RAM で共有する "}</td></tr><tr className={"even"}><td >{"大規模運用"}</td><td >{"Route 53 Profiles で DNS 設定を一括管理する"}</td></tr><tr className={"odd"}><td >{"セキュリティ"}</td><td >{" DNSSEC、DNS Firewall、CAA レコード、ドメインの転送ロックを活用する "}</td></tr><tr className={"even"}><td >{"可観測性"}</td><td >{" クエリログ、Resolver クエリログ、ヘルスチェックのアラームを有効にする "}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id={"選択のコツと試験での落とし穴-1"} tabIndex={-1}>{"選択のコツと試験での落とし穴"}</h3>
{" "}
<ul >{" "}<li >{" 「apex (example.com) で ALB や CloudFront を指す」はエイリアスレコード。CNAME は不可。 "}</li>{" "}<li >{" 「オンプレミスから VPC のプライベートゾーンを引く」はインバウンドエンドポイント。「VPC からオンプレミスの社内ドメインを引く」はアウトバウンドエンドポイントと転送ルール。 "}</li>{" "}<li >{" 「インターネットから到達できないリソースのヘルスチェック」は CloudWatch アラームベースのヘルスチェック。 "}</li>{" "}<li >{" プライベートホストゾーンを使うには、VPC の DNS 解決と DNS ホスト名を有効化する。 "}</li>{" "}<li >{" 別アカウントの VPC を関連付けるには、承認の作成と関連付けの 2 ステップが必要。 "}</li>{" "}<li >{"位置情報ルーティングにはデフォルトレコードを用意する。"}</li>{" "}</ul>
{" "}
<div className={"source-block"}>{" "}<p className={"source-head"} data-count={"10 件"}>{"出典:"}</p>{" "}<ul className={"source-grid"}>{" "}<li >{" "}<a className={"src-card"} data-url={"docs.aws.amazon.com/Route53/.../Welcome.html"} target={"_blank"} rel={"noopener noreferrer"} href={"https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html"}>{"Amazon Route 53 とは"}</a>{" "}</li>{" "}<li >{" "}<a className={"src-card"} data-url={"docs.aws.amazon.com/Route53/.../routing-policy.html"} target={"_blank"} rel={"noopener noreferrer"} href={"https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html"}>{"ルーティングポリシーの選択"}</a>{" "}</li>{" "}<li >{" "}<a className={"src-card"} data-url={"docs.aws.amazon.com/Route53/.../resource-record-sets-choosing-alias-non-alias.html"} target={"_blank"} rel={"noopener noreferrer"} href={"https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resource-record-sets-choosing-alias-non-alias.html"}>{"エイリアスと非エイリアスレコードの選択"}</a>{" "}</li>{" "}<li >{" "}<a className={"src-card"} data-url={"docs.aws.amazon.com/Route53/.../hosted-zones-private.html"} target={"_blank"} rel={"noopener noreferrer"} href={"https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-private.html"}>{"プライベートホストゾーンの使用"}</a>{" "}</li>{" "}<li >{" "}<a className={"src-card"} data-url={"docs.aws.amazon.com/Route53/.../dns-failover.html"} target={"_blank"} rel={"noopener noreferrer"} href={"https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover.html"}>{"DNS フェイルオーバーの設定とヘルスチェック"}</a>{" "}</li>{" "}<li >{" "}<a className={"src-card"} data-url={"docs.aws.amazon.com/Route53/.../resolver.html"} target={"_blank"} rel={"noopener noreferrer"} href={"https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver.html"}>{"Route 53 Resolver"}</a>{" "}</li>{" "}<li >{" "}<a className={"src-card"} data-url={"docs.aws.amazon.com/Route53/.../resolver-query-logs.html"} target={"_blank"} rel={"noopener noreferrer"} href={"https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-query-logs.html"}>{"Resolver クエリログ"}</a>{" "}</li>{" "}<li >{" "}<a className={"src-card"} data-url={"docs.aws.amazon.com/Route53/.../query-logs.html"} target={"_blank"} rel={"noopener noreferrer"} href={"https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/query-logs.html"}>{"パブリック DNS クエリのログ記録"}</a>{" "}</li>{" "}<li >{" "}<a className={"src-card"} data-url={"docs.aws.amazon.com/Route53/.../dns-configuring-dnssec.html"} target={"_blank"} rel={"noopener noreferrer"} href={"https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-configuring-dnssec.html"}>{"Route 53 での DNSSEC の設定"}</a>{" "}</li>{" "}<li >{" "}<a className={"src-card"} data-url={"docs.aws.amazon.com/whitepapers/.../hybrid-cloud-dns-options-for-vpc.html"} target={"_blank"} rel={"noopener noreferrer"} href={"https://docs.aws.amazon.com/whitepapers/latest/hybrid-cloud-dns-options-for-vpc/hybrid-cloud-dns-options-for-vpc.html"}>{"ハイブリッドクラウドの DNS オプション (ホワイトペーパー)"}</a>{" "}</li>{" "}</ul>{" "}</div>
{" "}</section>;}
