'use client';

import React from 'react';
import { Diagram } from '../Diagram';


export function SectionParts1to4() {
    return (
        <>
            <h2 id="part1">第1部：序論とアーキテクチャ原則（原著第1章 Introduction）</h2>
            <h3 id="s1-1">1.1 パケット、コネクション、データグラムという3つの視点</h3>
            <p>ネットワークプロトコルの設計には大きく2つの流儀があります。</p>
            <ol>
                    <li>
                        <strong>コネクション指向（回線交換に近い発想）</strong>：通信前に経路・状態を確立し、以降はその状態に沿ってデータを送る（電話網、TCP）。
                    </li>
                    <li>
                        <strong>コネクションレス（データグラム型）</strong>：各パケットが宛先情報を自己完結的に持ち、都度独立にルーティングされる（郵便、IP、UDP）。
                    </li>
                </ol>
            <p>
                    TCP/IPは非常に特徴的な設計を取っています。<strong>ネットワーク層（IP）はコネクションレスなデータグラム型</strong>にし、<strong>その上に乗るトランスポート層でコネクション指向（TCP）とコネクションレス（UDP）の両方を選べるようにする</strong>という二段構えです。
                </p>
            <h3 id="s1-2">1.2 end-to-endの原則とfate sharing</h3>
            <p>
                    「end-to-endの原則」とは、通信の信頼性確保などの複雑な仕事は、ネットワークの中間ノード（ルータ）ではなく、通信の両端（ホスト）に置くべきだという設計思想です。ルータは「できるだけ速く、できるだけシンプルに転送する」ことに専念し、再送や順序保証といった責務はTCPのようなエンドポイント側のプロトコルが担います。
                </p>
            <p>
                    この思想から導かれるのが{' '}
                    <strong>fate sharing（運命共有）</strong>{' '}
                    という考え方です。あるコネクションの状態情報は、そのコネクションの両端のホストだけが保持すべきであり、ネットワーク内部の特定のルータに保持させてはいけません。ルータが1台落ちても、迂回路が生きていれば通信の"状態"自体は失われない、という耐障害性がここから生まれます。
                </p>
            <Diagram id="diag-1" label="この思想から導かれるのが fate sharing（運命共有） という考え方です。あるコネクションの状態情報は、そのコネクションの両端のホストだけが保持すべきであり、ネットワーク内部の特定のルータに保持させてはいけません。ルータが1台落ちても、迂回路が生きていれば通信の&quot;状態&quot;自体は失われない、という耐障害性がここから生まれます。" />
            <h3 id="s1-3">1.3 レイヤリングと多重化・多重分離</h3>
            <p>
                    プロトコルスタックは階層（レイヤ）ごとに責務を分離します。原著は古典的なARPANET参照モデルに基づき4層（リンク層／ネットワーク層／トランスポート層／アプリケーション層）で説明しますが、実務ではOSI
                    7層モデルとの対応でも語られます。
                </p>
            <div className="table-scroll" tabIndex={0} role="region" aria-label="プロトコルスタックは階層（レイヤ）ごとに責務を分離します。原著は古典的なARPANET参照モデルに基づき4層（リンク層／ネットワーク層／トランスポート層／アプリケーション層）で説明しますが、実務ではOSI 7層モデルとの対応でも語られます。">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">OSI 7層モデル</th>
                                <th scope="col">TCP/IP（ARPANET）モデル</th>
                                <th scope="col">代表プロトコル</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>7. アプリケーション層</td>
                                <td>アプリケーション層</td>
                                <td>HTTP, DNS, SMTP</td>
                            </tr>
                            <tr className="even">
                                <td>6. プレゼンテーション層</td>
                                <td>（アプリケーション層に統合）</td>
                                <td>TLS（実務上はここに位置づけられることが多い）</td>
                            </tr>
                            <tr className="odd">
                                <td>5. セッション層</td>
                                <td>（アプリケーション層に統合）</td>
                                <td>—</td>
                            </tr>
                            <tr className="even">
                                <td>4. トランスポート層</td>
                                <td>トランスポート層</td>
                                <td>TCP, UDP, QUIC(UDP上)</td>
                            </tr>
                            <tr className="odd">
                                <td>3. ネットワーク層</td>
                                <td>ネットワーク（インターネット）層</td>
                                <td>IP, ICMP, IGMP</td>
                            </tr>
                            <tr className="even">
                                <td>2. データリンク層</td>
                                <td>リンク層</td>
                                <td>Ethernet, Wi-Fi, ARP</td>
                            </tr>
                            <tr className="odd">
                                <td>1. 物理層</td>
                                <td>リンク層</td>
                                <td>ケーブル、電波</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            <p>
                    各層はデータを送るとき、上位層から受け取ったデータに自分のヘッダを付加して下位層に渡します。これを<strong>カプセル化（encapsulation）</strong>と呼びます。受信側では逆に、下位層から上位層へヘッダを剥がしながら渡していきます。1つの下位層プロトコルの上に複数の上位層プロトコルが乗ることを<strong>多重化（multiplexing）</strong>、受信時にどの上位プロトコルに渡すか判別することを<strong>多重分離（demultiplexing）</strong>と呼びます。
                </p>
            <Diagram id="diag-2" label="各層はデータを送るとき、上位層から受け取ったデータに自分のヘッダを付加して下位層に渡します。これをカプセル化（encapsulation）と呼びます。受信側では逆に、下位層から上位層へヘッダを剥がしながら渡していきます。1つの下位層プロトコルの上に複数の上位層プロトコルが乗ることを多重化（multiplexing）、受信時にどの上位プロトコルに渡すか判別することを多重分離（demultiplexing）と呼びます。" />
            <p>多重分離は「どの識別子を見るか」で層ごとに異なります。</p>
            <Diagram id="diag-3" label="多重分離は「どの識別子を見るか」で層ごとに異なります。" />
            <h3 id="s1-4">1.4 ポート番号・名前・アドレスの役割分担</h3>
            <p>
                    TCP/IPには「もの（ホスト）を指す」「サービスを指す」「場所を指す」という3つの識別子があり、これらは独立して管理されます。
                </p>
            <div className="table-scroll" tabIndex={0} role="region" aria-label="TCP/IPには「もの（ホスト）を指す」「サービスを指す」「場所を指す」という3つの識別子があり、これらは独立して管理されます。">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">識別子</th>
                                <th scope="col">指すもの</th>
                                <th scope="col">例</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>名前（Name）</td>
                                <td>何であるか</td>
                                <td><code>www.example.com</code></td>
                            </tr>
                            <tr className="even">
                                <td>アドレス（Address）</td>
                                <td>どこにあるか</td>
                                <td><code>93.184.216.34</code></td>
                            </tr>
                            <tr className="odd">
                                <td>ポート番号（Port）</td>
                                <td>同一ホスト上のどのプロセスか</td>
                                <td><code>443</code></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            <p>
                    DNSは名前からアドレスへの変換を担い、ルーティングはアドレスに基づいてパケットを転送し、ポート番号は最終的にホスト内のプロセスへ配送する多重分離に使われます。この分離のおかげで、あるホストのIPアドレスが変わっても名前解決の設定さえ更新すればアプリケーションは影響を受けません（モビリティやDNSベースの負荷分散の基盤にもなっています）。
                </p>
            <h3 id="s1-5">1.5 クライアント/サーバとピアツーピア、APIとしてのソケット</h3>
            <p>
                    アプリケーション設計のパターンとして、常時待ち受けるサーバに複数のクライアントが接続する<strong>クライアント/サーバモデル</strong>と、各ノードが対等にサーバにもクライアントにもなる<strong>ピアツーピア（P2P）モデル</strong>があります。いずれの場合も、アプリケーションプログラムがトランスポート層にアクセスする標準的な手段が<strong>ソケットAPI</strong>（Berkeley
                    Sockets由来）であり、これは1980年代のBSD
                    UNIXから現在のLinux／Windows／macOSまで基本設計が受け継がれています。
                </p>
            <div className="callout-practice">
                    <div className="icon">✓ </div>
                    <div className="body">
                        <div className="label">ベストプラクティス </div>
                        <ul>
                            <li>
                                レイヤの責務を混同しない：アプリケーションコードでIPアドレスをハードコードせず、名前解決を経由させることでネットワーク変更への耐性を確保する。{' '}
                            </li>
                            <li>
                                end-to-endの原則を意識する：中間のプロキシ／ロードバランサに状態を過度に依存させると、そのノードが単一障害点になる。{' '}
                            </li>
                            <li>
                                多重分離のフィールド（EtherType、IP
                                Protocol番号、ポート番号）を意識しておくと、<code>tcpdump</code>のフィルタ式（例：<code>tcp port 443</code>）の意味が直感的に理解できる。
                            </li>
                        </ul>
                    </div>
                </div>
            <hr />
            <h2 id="part2">
                    第2部：インターネットアドレスアーキテクチャ（原著第2章 The Internet Address
                    Architecture）
                </h2>
            <h3 id="s2-1">2.1 IPv4アドレスの表記とクラスフルからCIDRへの移行</h3>
            <p>
                    IPv4アドレスは32ビットで、慣習的に8ビットずつ4つに区切ってドット区切り10進表記（例：<code>192.0.2.1</code>）で表します。1980年代には「クラスA/B/C」という固定長のアドレス区分（クラスフルアドレッシング）が使われていましたが、アドレス空間の無駄遣いが深刻化したため、1993年にCIDR（Classless
                    Inter-Domain Routing、RFC
                    4632）へ移行しました。CIDRでは<code>/24</code>のようなプレフィックス長でネットワーク部とホスト部の境界を柔軟に指定します。
                </p>
            <div className="table-scroll" tabIndex={0} role="region" aria-label="IPv4アドレスは32ビットで、慣習的に8ビットずつ4つに区切ってドット区切り10進表記（例：192.0.2.1）で表します。1980年代には「クラスA/B/C」という固定長のアドレス区分（クラスフルアドレッシング）が使われていましたが、アドレス空間の無駄遣いが深刻化したため、1993年にCIDR（Classless Inter-Domain Routing、RFC 4632）へ移行しました。CIDRでは/24のようなプレフィックス長でネットワーク部とホスト部の境界を柔軟に指定します。">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">表記</th>
                                <th scope="col">意味</th>
                                <th scope="col">ホスト数（理論値）</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td><code>192.0.2.0/24</code></td>
                                <td>上位24ビットがネットワーク部</td>
                                <td>256（うちホスト割当可能254）</td>
                            </tr>
                            <tr className="even">
                                <td><code>192.0.2.0/26</code></td>
                                <td>上位26ビットがネットワーク部</td>
                                <td>64（うちホスト割当可能62）</td>
                            </tr>
                            <tr className="odd">
                                <td><code>0.0.0.0/0</code></td>
                                <td>デフォルトルート（すべてを表す）</td>
                                <td>—</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            <h3 id="s2-2">2.2 サブネッティングとVLSM</h3>
            <p>
                    CIDRの考え方をネットワーク内部の設計に適用したものがサブネッティングです。1つの大きなアドレスブロックを、用途に応じて異なる長さのプレフィックス（VLSM:
                    Variable Length Subnet Mask）に分割します。
                </p>
            <Diagram id="diag-4" label="CIDRの考え方をネットワーク内部の設計に適用したものがサブネッティングです。1つの大きなアドレスブロックを、用途に応じて異なる長さのプレフィックス（VLSM: Variable Length Subnet Mask）に分割します。" />
            <h3 id="s2-3">2.3 特殊アドレスとプライベートアドレス空間</h3>
            <div className="table-scroll" tabIndex={0} role="region" aria-label="2.3 特殊アドレスとプライベートアドレス空間">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">アドレス範囲</th>
                                <th scope="col">用途</th>
                                <th scope="col">定義RFC</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td><code>10.0.0.0/8</code></td>
                                <td>プライベートアドレス</td>
                                <td>RFC 1918</td>
                            </tr>
                            <tr className="even">
                                <td><code>172.16.0.0/12</code></td>
                                <td>プライベートアドレス</td>
                                <td>RFC 1918</td>
                            </tr>
                            <tr className="odd">
                                <td><code>192.168.0.0/16</code></td>
                                <td>プライベートアドレス</td>
                                <td>RFC 1918</td>
                            </tr>
                            <tr className="even">
                                <td><code>100.64.0.0/10</code></td>
                                <td>キャリアグレードNAT（CGNAT）共有アドレス空間</td>
                                <td>RFC 6598</td>
                            </tr>
                            <tr className="odd">
                                <td><code>127.0.0.0/8</code></td>
                                <td>ループバック</td>
                                <td>RFC 1122</td>
                            </tr>
                            <tr className="even">
                                <td><code>169.254.0.0/16</code></td>
                                <td>リンクローカル（APIPA/Zeroconf）</td>
                                <td>RFC 3927</td>
                            </tr>
                            <tr className="odd">
                                <td><code>224.0.0.0/4</code></td>
                                <td>マルチキャスト</td>
                                <td>RFC 5771</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            <p>
                    <code>100.64.0.0/10</code>はISPがCGNATを展開する際、ホームルータとISP側NATの間で使う専用の共有アドレス空間として2012年に予約されました。IPv4アドレス枯渇が進む中で現在も広く使われています。
                </p>
            <h3 id="s2-4">2.4 IPv6アドレスアーキテクチャ</h3>
            <p>
                    IPv6アドレスは128ビットで、16ビットごとにコロン区切りの16進数で表記します（例：<code>2001:0db8:0000:0000:0000:ff00:0042:8329</code>）。連続するゼロは<code>::</code>で1回だけ省略できます（<code>2001:db8::ff00:42:8329</code>）。
                </p>
            <Diagram id="diag-5" label="IPv6アドレスは128ビットで、16ビットごとにコロン区切りの16進数で表記します（例：2001:0db8:0000:0000:0000:ff00:0042:8329）。連続するゼロは::で1回だけ省略できます（2001:db8::ff00:42:8329）。" />
            <p>
                    IPv4と異なりIPv6には明確な「クラス」区分はなく、代わりにアドレスの<strong>スコープ（有効範囲）</strong>によって種別を分けます。
                </p>
            <div className="table-scroll" tabIndex={0} role="region" aria-label="IPv4と異なりIPv6には明確な「クラス」区分はなく、代わりにアドレスのスコープ（有効範囲）によって種別を分けます。">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">アドレス種別</th>
                                <th scope="col">プレフィックス</th>
                                <th scope="col">スコープ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>グローバルユニキャスト</td>
                                <td><code>2000::/3</code></td>
                                <td>インターネット全体</td>
                            </tr>
                            <tr className="even">
                                <td>リンクローカル</td>
                                <td><code>fe80::/10</code></td>
                                <td>同一リンク内のみ</td>
                            </tr>
                            <tr className="odd">
                                <td>ユニークローカル（ULA）</td>
                                <td><code>fc00::/7</code></td>
                                <td>組織内（プライベート相当）</td>
                            </tr>
                            <tr className="even">
                                <td>マルチキャスト</td>
                                <td><code>ff00::/8</code></td>
                                <td>グループ配送</td>
                            </tr>
                            <tr className="odd">
                                <td>ループバック</td>
                                <td><code>::1/128</code></td>
                                <td>自ホスト内</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            <p>
                    IPv6ではブロードキャストが廃止され、代わりにマルチキャストと<strong>エニーキャスト</strong>（同じアドレスを持つ複数ノードのうち最も近い1つに届く）が使われます。エニーキャストはDNSルートサーバやパブリックDNSリゾルバ（例：<code>1.1.1.1</code>,{' '}
                    <code>8.8.8.8</code>）の実運用で広く使われています。
                </p>
            <h3 id="s2-5">2.5 IPv4アドレス枯渇とその後：本書刊行後の状況</h3>
            <p>
                    原著執筆時点（2011年）はまだIANAの中央在庫からIPv4アドレスを配布できていましたが、2011年2月にIANAの中央在庫が枯渇し、その後地域レジストリ（RIR）も順次枯渇しました。これが本書第2版でIPv4アドレス枯渇とCGNAT・IPv6移行の議論が増補された背景です。この状況は2026年現在も基本的に継続しており、詳細は第19部で扱います。
                </p>
            <div className="callout-practice">
                    <div className="icon">✓ </div>
                    <div className="body">
                        <div className="label">ベストプラクティス </div>
                        <ul>
                            <li>
                                サブネット設計は将来の成長を見込んでVLSMで余白を残す。境界ぎりぎりの設計は後々の再設計コストが高い。{' '}
                            </li>
                            <li>
                                プライベートアドレス空間とCGNAT共有アドレス空間（<code>100.64.0.0/10</code>）を混同しない。後者はISP側の内部利用を想定した特別な範囲。{' '}
                            </li>
                            <li>
                                IPv6設計では「ホストあたり複数アドレス（一時アドレス＋安定アドレス）」が標準的挙動であることを前提に、ログ・監視設計を行う。
                            </li>
                        </ul>
                    </div>
                </div>
            <hr />
            <h2 id="part3">第3部：リンク層（原著第3章 Link Layer）</h2>
            <h3 id="s3-1">3.1 リンク層の責務</h3>
            <p>
                    リンク層は「同一物理／論理セグメント上の隣接ノード間でフレームを届ける」ことに責任を持ちます。IPが担う「異なるネットワークをまたいだ経路選択」とは異なり、リンク層はMACアドレスのようなローカルな識別子だけを扱います。
                </p>
            <h3 id="s3-2">3.2 イーサネットフレームの構造</h3>
            <p>
                    現代のLANの大半はイーサネット（IEEE
                    802.3）です。フレームには送信元・宛先MACアドレス、EtherTypeフィールド（上位プロトコルの識別）、ペイロード、そしてFCS（フレームチェックサム、誤り検出用のCRC）が含まれます。MTU（Maximum
                    Transmission
                    Unit）はイーサネットの標準で1500バイトです（ジャンボフレームでは9000バイト前後まで拡張可能）。
                </p>
            <Diagram id="diag-6" label="現代のLANの大半はイーサネット（IEEE 802.3）です。フレームには送信元・宛先MACアドレス、EtherTypeフィールド（上位プロトコルの識別）、ペイロード、そしてFCS（フレームチェックサム、誤り検出用のCRC）が含まれます。MTU（Maximum Transmission Unit）はイーサネットの標準で1500バイトです（ジャンボフレームでは9000バイト前後まで拡張可能）。" />
            <h3 id="s3-3">3.3 Wi-Fi（無線LAN）とその他のリンク層技術</h3>
            <p>
                    Wi-Fi（IEEE
                    802.11系）はイーサネットと同じMACアドレス体系を使いつつ、無線特有の課題（隠れ端末問題、電波干渉、ローミング）に対処する追加機構を持ちます。2011年の原著刊行時点の主流は802.11n（Wi-Fi
                    4）でしたが、現在はWi-Fi 6/6E/7へと進化しています（詳細は第19部）。
                </p>
            <h3 id="s3-4">3.4 VLANとトランキング</h3>
            <p>
                    IEEE
                    802.1Qにより、1本の物理リンク上に複数の論理LAN（VLAN）を多重化できます。フレームに4バイトのVLANタグを挿入し、12ビットのVLAN
                    IDでセグメントを識別します（最大4094個のVLAN）。データセンターやオフィスLANのセグメンテーション（部門ごと、用途ごとの分離）に広く使われます。
                </p>
            <Diagram id="diag-7" label="IEEE 802.1Qにより、1本の物理リンク上に複数の論理LAN（VLAN）を多重化できます。フレームに4バイトのVLANタグを挿入し、12ビットのVLAN IDでセグメントを識別します（最大4094個のVLAN）。データセンターやオフィスLANのセグメンテーション（部門ごと、用途ごとの分離）に広く使われます。" />
            <h3 id="s3-5">3.5 ブリッジとスイッチの学習動作</h3>
            <p>
                    イーサネットスイッチは受信フレームの送信元MACアドレスを見て「どのポートの先にどのMACアドレスがあるか」を学習し、以降その宛先へのフレームは該当ポートにのみ転送します（フラッディングを避ける）。宛先が未学習の場合は全ポートへフラッディングします。複数スイッチ間でループが発生しないよう、STP（Spanning
                    Tree Protocol）またはその高速版RSTP/MSTPでループ防止トポロジーを維持します。
                </p>
            <div className="callout-practice">
                    <div className="icon">✓ </div>
                    <div className="body">
                        <div className="label">ベストプラクティス </div>
                        <ul>
                            <li>
                                MTUの不一致はパケロス・パフォーマンス劣化の典型的な原因。トンネル（VXLAN,
                                GRE,
                                IPsecなど）を挟む構成では実効MTUが1500バイトを下回ることを忘れずに設計する。{' '}
                            </li>
                            <li>
                                VLAN設計はブロードキャストドメインの分離が主目的。1つのVLANに過度なホスト数を詰め込むとARPブロードキャストの負荷が問題になる。{' '}
                            </li>
                            <li>
                                無線LANのトラブルシューティングでは、有線と異なり「電波干渉」「隠れ端末」というリンク層固有の要因を考慮する。
                            </li>
                        </ul>
                    </div>
                </div>
            <hr />
            <h2 id="part4">第4部：ARP アドレス解決プロトコル（原著第4章）</h2>
            <h3 id="s4-1">4.1 ARPが解決する問題</h3>
            <p>
                    IP層は宛先IPアドレスを知っていますが、同一リンク上でフレームを送るにはMACアドレスが必要です。ARP（Address
                    Resolution Protocol, RFC
                    826）はこの「IPアドレス→MACアドレス」の変換を、ブロードキャストによる問い合わせ・応答で解決します。
                </p>
            <Diagram id="diag-8" label="IP層は宛先IPアドレスを知っていますが、同一リンク上でフレームを送るにはMACアドレスが必要です。ARP（Address Resolution Protocol, RFC 826）はこの「IPアドレス→MACアドレス」の変換を、ブロードキャストによる問い合わせ・応答で解決します。" />
            <h3 id="s4-2">4.2 ARPキャッシュとその挙動</h3>
            <p>
                    解決済みのIP→MACの対応は<strong>ARPキャッシュ</strong>（近隣キャッシュ）に一定時間（実装によるが数分〜数十分）保持され、毎回のブロードキャストを避けます。エントリには通常タイムアウトがあり、期限切れ前に再確認（gratuitous
                    ARPやユニキャストでの再確認）が行われることもあります。
                </p>
            <h3 id="s4-3">4.3 Gratuitous ARP（無償ARP）</h3>
            <p>
                    自分自身のIPアドレスに対してARP Requestを送る特殊な使い方を<strong>Gratuitous ARP</strong>と呼びます。主な用途は以下の通りです。
                </p>
            <ul>
                    <li>起動時にIPアドレスの重複を検出する（同じ応答が返ってきたら重複）。</li>
                    <li>
                        他のホストのARPキャッシュを能動的に更新する（フェイルオーバー時にVIPを新しい実体へ切り替える、ロードバランサやHA構成の要）。
                    </li>
                </ul>
            <h3 id="s4-4">4.4 ARPの脆弱性とその緩和策</h3>
            <p>
                    ARPには送信元を検証する仕組みがなく、誰でも任意のIP-MAC対応を主張する応答を送れます。これを悪用した<strong>ARPスプーフィング（ARPポイズニング）</strong>は、中間者攻撃（MITM）の古典的な手法です。攻撃者はデフォルトゲートウェイのIPアドレスに対して自分のMACアドレスを主張する偽のARP応答を送り、被害者の通信を自分経由に誘導します。
                </p>
            <Diagram id="diag-9" label="ARPには送信元を検証する仕組みがなく、誰でも任意のIP-MAC対応を主張する応答を送れます。これを悪用したARPスプーフィング（ARPポイズニング）は、中間者攻撃（MITM）の古典的な手法です。攻撃者はデフォルトゲートウェイのIPアドレスに対して自分のMACアドレスを主張する偽のARP応答を送り、被害者の通信を自分経由に誘導します。" />
            <p>現代のスイッチにおける主な緩和策は次の通りです。</p>
            <div className="table-scroll" tabIndex={0} role="region" aria-label="現代のスイッチにおける主な緩和策は次の通りです。">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">対策</th>
                                <th scope="col">仕組み</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>DHCPスヌーピング</td>
                                <td>
                                    スイッチがDHCPのやり取りを監視し、正規のIP-MAC-ポート対応の「信頼テーブル」を構築する
                                </td>
                            </tr>
                            <tr className="even">
                                <td>ダイナミックARP検査（DAI）</td>
                                <td>
                                    受信したARPパケットをDHCPスヌーピングの信頼テーブルと照合し、不一致なら破棄する
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>IPソースガード</td>
                                <td>
                                    送信元IPアドレスとMACアドレスの組み合わせを信頼テーブルと照合し、不正なパケットを破棄する
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            <h3 id="s4-5">4.5 IPv6における対応：近隣探索プロトコル（NDP）</h3>
            <p>
                    IPv6ではARPは存在せず、ICMPv6メッセージを使う<strong>近隣探索プロトコル（Neighbor Discovery Protocol, NDP）</strong>が同等の役割を果たします。ARP Requestに相当するのがNeighbor Solicitation、ARP
                    Replyに相当するのがNeighbor
                    Advertisementです。NDPも認証機構を持たないため、ARPスプーフィングに相当する<strong>ND spoofing</strong>や、悪意あるルータ広告（Rogue RA）による攻撃が起こり得ます。対策としてRA
                    Guard（正当なルータ広告のみを通す機能、RFC
                    6105/7113で標準化）がスイッチに実装されています。
                </p>
            <div className="callout-practice">
                    <div className="icon">✓ </div>
                    <div className="body">
                        <div className="label">ベストプラクティス </div>
                        <ul>
                            <li>
                                本番スイッチではDHCPスヌーピング＋ダイナミックARP検査を有効化し、未知の送信元からのARP応答を無条件に信頼しない構成にする。{' '}
                            </li>
                            <li>
                                IPv6を導入する際はARPだけでなくNDPのセキュリティ（RA
                                Guard）も合わせて設計する。「IPv4だけ守ってIPv6は素通し」という抜け漏れが起きやすい。{' '}
                            </li>
                            <li>
                                Gratuitous ARPはHA構成（keepalived,
                                VRRPなど）で正規に使われる仕組みでもあるため、監視ツールが誤検知しないよう正規のフェイルオーバー挙動を把握しておく。
                            </li>
                        </ul>
                    </div>
                </div>
            <hr />
        </>
    );
}
