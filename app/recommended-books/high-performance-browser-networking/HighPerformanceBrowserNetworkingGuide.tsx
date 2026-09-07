'use client';

import { memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS, type DiagramId } from './constants';
import { NavBar } from './NavBar';

const Diagram = memo(function Diagram({
    id,
    label,
}: {
    id: DiagramId;
    label: string;
}) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap">
            <MermaidDiagram
                chart={chart}
                ariaLabel={label}
                preserveNaturalScale={true}
            />
        </div>
    );
});

export function HighPerformanceBrowserNetworkingGuide() {
    return (
        <div className="hpbn-page">
            <NavBar />
            <main className="main">
<div className="hero">
                    <h1>High Performance Browser Networking<br />初学者向け完全ガイド</h1>
                    <p className="hero-sub">
                        Ilya Grigorik著『High Performance Browser Networking』（O'Reilly Media,
                        2013）の目次構成に沿って初学者向けに再構成し、2026年9月時点のHTTP/3・QUIC・TLS
                        1.3・BBRv3・WebTransport・Core Web
                        Vitals等の最新動向を独自に追加した完全ガイドです。
                    </p>
                    <div className="hero-pills">
                        <span className="pill">全4部+独自追加1部</span>
                        <span className="pill">章・節 25件</span>
                        <span className="pill">図解 33件（Mermaid）</span>
                        <span className="pill">表 22件</span>
                        <span className="pill">参考文献 15件</span>
                    </div>
                </div>
<p>
                    <strong>原著</strong>: <em>High Performance Browser Networking</em>（Ilya
                    Grigorik著、O'Reilly Media、2013年9月刊、398ページ）
                    <strong>原著者について</strong>: Ilya
                    Grigorik氏はGoogleでWebパフォーマンスエンジニアを務めた人物で、本書は「ブラウザとネットワークの間で実際に何が起きているか」をTCP/UDP/TLSという低レイヤーから、HTTP、そしてXHR・SSE・WebSocket・WebRTCといったブラウザAPIまで一気通貫で解説した、Web
                    パフォーマンス分野の定番書です。
                </p>
<blockquote>
                    <p>
                        本ガイドは原著の目次構成（全4部・全18章）に忠実に沿いながら、初学者向けに独自の解説・図解・表で再構成したものです。原文の複製・転載は一切行っていません。また、原著刊行（2013年）以降に登場したHTTP/3・QUIC・TLS
                        1.3・BBRv3・WebTransport・Core Web
                        Vitalsなど2026年9月時点の最新動向を独自にWeb検索で調査し、第5部として追加しています。
                    </p>
                    <p>
                        <strong>図解ポリシー</strong>:
                        ASCIIアート（罫線・箱文字）は一切使用せず、フローチャート・シーケンス図はすべてMermaidで、比較表はすべてMarkdownテーブルで表現しています。
                    </p>
                </blockquote>
<h2 id="0-はじめになぜネットワークを知ることがweb開発者に必要なのか">
                    0. はじめになぜ「ネットワークを知る」ことがWeb開発者に必要なのか
                </h2>
<p>
                    「フロントエンドを書く」「バックエンドAPIを実装する」だけなら、TCPの輻輳制御アルゴリズムやTLSハンドシェイクのRTT数を知らなくても仕事はできます。しかし、<strong>なぜこのページは遅いのか</strong>、<strong>なぜモバイル回線だとタイムアウトが多発するのか</strong>、<strong>なぜHTTP/2に移行したのに思ったほど速くならないのか</strong>——こうした問いに答えるには、ブラウザとサーバーの間にある「配線の中身」を理解している必要があります。
                </p>
<p>原著が一貫して伝えているメッセージは次の1文に要約できます。</p>
<blockquote>
                    <p>
                        <strong>速度は機能である（Speed is a feature）。</strong>
                        ユーザーが体感する遅延の大部分は、コードの実行時間ではなく、ネットワーク層（伝搬遅延・輻輳制御・ハンドシェイク往復）で発生している。
                    </p>
                </blockquote>
<Diagram id="diag-1" label="ボトルネック特定フローチャート" />
<p>
                    <strong>本ガイドの読み方</strong>：第1部でTCP/UDP/TLSという「土台」を固め、第2部でワイヤレス・モバイル回線特有の制約を学び、第3部でHTTPプロトコルそのものの進化（1.1→2→3）を追い、第4部でブラウザJavaScriptから実際に叩くAPI（XHR/SSE/WebSocket/WebRTC）を扱います。最後に第5部として、原著刊行後に登場したHTTP/3・QUIC・TLS
                    1.3・BBRv3などの2026年時点の実務知識を補います。
                </p>
<hr />
<h2 id="第1部ネットワーキング101">第1部：ネットワーキング101</h2>
<h3 id="第1章-レイテンシと帯域幅の基礎">第1章 レイテンシと帯域幅の基礎</h3>
<h4 id="11-なぜ帯域幅よりレイテンシが重要なのか">
                    1.1 なぜ「帯域幅」より「レイテンシ」が重要なのか
                </h4>
<p>
                    多くの人は「回線が遅い＝帯域幅（bandwidth）が足りない」と考えがちですが、Webページの体感速度を決めているのは主に<strong>レイテンシ（latency）</strong>、つまりデータが送信元から宛先へ届くまでに要する時間（エンドツーエンドのネットワーク遅延）です。より厳密には、送信元から宛先までの一方向の遅延を<strong>片道遅延（one-way delay）</strong>、そこから応答が返ってくるまでを<strong>RTT（Round-Trip Time、往復遅延</strong>）と呼び分けます。また、パケット全体を回線に送り出すのに要する<strong>伝送遅延（transmission delay</strong>）はレイテンシを構成する一要素であって、レイテンシそのものではありません（次節参照）。特に小さなリクエストが何度も往復するWebの通信パターンでは、帯域幅を2倍にしても体感速度はほとんど変わらない一方、RTTを半分にすると劇的に速く感じられます。
                </p>
<h4 id="12-レイテンシを構成する4つの要素">1.2 レイテンシを構成する4つの要素</h4>
<div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">要素</th>
                                <th scope="col">説明</th>
                                <th scope="col">特徴</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>伝搬遅延（Propagation Delay）</td>
                                <td>信号が物理媒体（光ファイバー・銅線・無線）を伝わる時間</td>
                                <td>
                                    光速という物理法則が下限。距離に比例し、圧縮・技術改善では短縮できない
                                </td>
                            </tr>
                            <tr className="even">
                                <td>伝送遅延（Transmission Delay）</td>
                                <td>パケット全体を回線に送り出すのにかかる時間</td>
                                <td>パケットサイズ ÷ 帯域幅。帯域幅を上げれば短縮可能</td>
                            </tr>
                            <tr className="odd">
                                <td>処理遅延（Processing Delay）</td>
                                <td>ルーターやスイッチがヘッダを解析し次のホップを決める時間</td>
                                <td>ハードウェア性能に依存、通常は無視できるほど小さい</td>
                            </tr>
                            <tr className="even">
                                <td>キューイング遅延（Queuing Delay）</td>
                                <td>混雑したルーターの送信待ちキューで発生する遅延</td>
                                <td>ネットワーク輻輳の度合いに依存し、最も予測しづらい</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
<Diagram id="diag-2" label="レイテンシを構成する4要素のネットワーク伝送図" />
<h4 id="13-光速とラストマイルの現実">1.3 光速と「ラストマイル」の現実</h4>
<p>
                    光ファイバー中の光の伝搬速度は真空中光速の約2/3（約20万km/秒）です。理論上、地球を半周する約20,000kmの距離であれば片道で約100ms、往復（RTT）では約200msという計算になりますが、現実のインターネットはルーターを何十ホップも経由し、さらに家庭やスマートフォンから最寄りのISP設備までの「ラストマイル」区間で追加の遅延が発生します。ラストマイルは技術（DSL・ケーブル・光・モバイル）によって遅延特性が大きく異なり、多くの場合ここが体感速度のボトルネックになります。
                </p>
<h4 id="14-コアネットワークとエッジの帯域幅格差">
                    1.4 コアネットワークとエッジの帯域幅格差
                </h4>
<p>
                    インターネットのバックボーン（コアネットワーク）は年々高速化していますが、末端ユーザーが実際に使える帯域幅（エッジの帯域幅）は地域・回線種別によって大きな差があります。CDN（コンテンツデリバリーネットワーク）は、コンテンツをユーザーに地理的に近い場所へキャッシュすることで伝搬遅延そのものを短縮する、レイテンシ対策の代表的な手法です。
                </p>
<div className="callout-practice">
                    <div className="practice-label">ベストプラクティス</div>
                    <ul>
                        <li>
                            レイテンシは物理法則（光速）に縛られるため、根本対策は「距離を縮める」（CDN・エッジロケーション活用）か「往復回数を減らす」（HTTP/2多重化・接続の再利用・0-RTT）のいずれかである
                        </li>
                        <li>
                            帯域幅の増強だけに投資せず、まずRTT（往復時間）を計測し、リクエスト往復回数を減らす設計を優先する
                        </li>
                        <li>
                            Webサイトの体感速度改善では、まず「何往復（RTT）しているか」を可視化する（DevToolsのNetworkパネルのWaterfall表示など）
                        </li>
                    </ul>
                </div>
<hr />
<h3 id="第2章-tcpの構成要素">第2章 TCPの構成要素</h3>
<h4 id="21-なぜtcpを理解する必要があるのか">2.1 なぜTCPを理解する必要があるのか</h4>
<p>
                    HTTPはアプリケーション層のプロトコルですが、その下では（HTTP/3を除き）ほぼ例外なくTCP（Transmission
                    Control
                    Protocol）が使われています。TCPは「信頼性のある順序保証付きバイトストリーム」を提供しますが、その信頼性を実現する仕組み自体が、Webのパフォーマンスに直接影響を与えます。
                </p>
<h4 id="22-スリーウェイハンドシェイク">2.2 スリーウェイハンドシェイク</h4>
<p>
                    TCP接続の確立には、データ送信前に3回のパケット交換（SYN → SYN-ACK →
                    ACK）が必要です。これは新規TCP接続ごとに<strong>最低1RTT分の遅延</strong>が発生することを意味します。
                </p>
<Diagram id="diag-3" label="TCPスリーウェイハンドシェイクのシーケンス図" />
<h4 id="23-輻輳制御congestion-controlとフロー制御flow-control">
                    2.3 輻輳制御（Congestion Control）とフロー制御（Flow Control）
                </h4>
<p>TCPには2つの「速度調整」の仕組みがあります。</p>
<div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">仕組み</th>
                                <th scope="col">目的</th>
                                <th scope="col">判断基準</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>フロー制御</td>
                                <td>受信側のバッファ溢れを防ぐ</td>
                                <td>受信側が広告するウィンドウサイズ（受信側の処理能力）</td>
                            </tr>
                            <tr className="even">
                                <td>輻輳制御</td>
                                <td>ネットワーク経路の混雑を防ぐ</td>
                                <td>パケットロスや遅延から推定するネットワークの空き容量</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
<h4 id="24-スロースタートslow-start">2.4 スロースタート（Slow Start）</h4>
<p>
                    新しいTCP接続は、いきなり最大速度で送信を始めるわけではありません。輻輳ウィンドウ（cwnd）を小さい値から始め、ACKを受け取るたびに指数的に増やしていく「スロースタート」というアルゴリズムを使います。これは、接続確立直後の数RTTの間はスループットが本来の帯域幅より低く抑えられることを意味し、<strong>小さなファイルを多数やり取りするWeb通信では、スロースタートが完了する前に転送が終わってしまい、帯域幅を使い切れないケースが多発します</strong>。
                </p>
<Diagram id="diag-4" label="TCPスロースタートと輻輳回避の遷移図" />
<h4 id="25-帯域遅延積bandwidth-delay-product-bdp">
                    2.5 帯域遅延積（Bandwidth-Delay Product, BDP）
                </h4>
<p>
                    BDP = 帯域幅 × RTT で計算され、「経路上に存在しうる未確認データ量（in-flight
                    data）の理論上限」を表します。TCPのウィンドウサイズがBDPより小さいと、帯域幅を使い切れずに回線が遊んでしまいます。高帯域幅・高遅延（衛星回線や大陸間通信など）の経路では、この問題が顕著になり、TCPウィンドウスケーリング（RFC
                    1323）などの拡張が必要になります。
                </p>
<h4 id="26-holhead-of-lineブロッキング">2.6 HOL（Head-of-Line）ブロッキング</h4>
<p>
                    TCPは「順序保証されたバイトストリーム」であるため、パケットが1つでも失われると、それより後に届いたパケットもアプリケーションに渡されず、再送されたパケットが届くまで<strong>すべてがブロックされます</strong>。これがTCPレベルのHOLブロッキングであり、後述するHTTP/2の「1接続に複数ストリームを多重化する」という設計の弱点（TCPレベルでのHOLブロッキングが全ストリームに波及する）の根本原因になります。
                </p>
<Diagram id="diag-5" label="TCPヘッドオブラインブロッキングのパケット損失シーケンス図" />
<h4 id="27-tcp最適化のベストプラクティス">2.7 TCP最適化のベストプラクティス</h4>
<div className="callout-practice">
                    <div className="practice-label">ベストプラクティス</div>
                    <ul>
                        <li>
                            サーバーの初期輻輳ウィンドウ（initcwnd）を、Linuxの最新デフォルト値に合わせて適切に設定する（小さすぎると初期スループットが出ない）
                        </li>
                        <li>
                            不要になったTCP接続を保持し続けない一方、同一オリジンへの新規接続を頻発させない（TCPスロースタートのペナルティを毎回払うことになる）
                        </li>
                        <li>
                            サーバーのTCP輻輳制御アルゴリズムをCUBICやBBRなど最新のものに更新する（詳細は第5部参照）
                        </li>
                        <li>
                            小さいファイルを多数配信するサイトでは、TCP接続の再利用（Keep-Alive）とHTTP/2の多重化を活用し、新規ハンドシェイクの回数自体を減らす
                        </li>
                        <li>
                            ラストマイルの帯域幅が細い環境を想定し、初期表示に必要なリソースをできるだけ小さく保つ（スロースタート中の帯域幅制約を考慮する）
                        </li>
                    </ul>
                </div>
<hr />
<h3 id="第3章-udpの構成要素">第3章 UDPの構成要素</h3>
<h4 id="31-udpとtcpの根本的な違い">3.1 UDPとTCPの根本的な違い</h4>
<p>
                    UDP（User Datagram
                    Protocol）は「コネクションレス」「順序保証なし」「再送保証なし」というTCPとは対照的な特性を持つトランスポート層プロトコルです。原著はこれを「<strong>Null Protocol Services</strong>」（何も提供しないプロトコル）と表現しています。信頼性・順序保証・輻輳制御のいずれも提供しないため、アプリケーション側がそれらを自前で実装する必要がありますが、その分オーバーヘッドが小さく、リアルタイム性が求められる用途（音声・映像・ゲーム、そして後述するQUIC/HTTP3）に適しています。
                </p>
<Diagram id="diag-6" label="UDPとTCPのプロトコル特性比較図" />
<h4 id="32-natネットワークアドレス変換とudp">
                    3.2 NAT（ネットワークアドレス変換）とUDP
                </h4>
<p>
                    家庭用ルーターや企業ネットワークの多くはNATを使い、プライベートIPアドレスをパブリックIPアドレスに変換します。TCPはコネクション確立時のハンドシェイクがあるため、NATデバイスは「このコネクションは有効」と判断しやすいのですが、UDPにはそうした明示的なシグナルがなく、<strong>NATのUDPマッピングは一定時間（多くはわずか30秒程度）通信がないとタイムアウトで破棄されます</strong>。これがUDPを使ったP2P通信（WebRTCなど）で「接続が切れる」問題の主要因の一つです。
                </p>
<h4 id="33-natトラバーサルstunturnice">3.3 NATトラバーサル：STUN・TURN・ICE</h4>
<p>
                    2台の端末がそれぞれ別のNATの背後にいる場合、直接P2P接続を確立するには工夫が必要です。
                </p>
<div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">技術</th>
                                <th scope="col">役割</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>STUN（Session Traversal Utilities for NAT）</td>
                                <td>
                                    自分のパブリックIP・ポートを外部サーバーに問い合わせて把握する仕組み。多くの場合これだけでP2P接続が確立できる
                                </td>
                            </tr>
                            <tr className="even">
                                <td>TURN（Traversal Using Relays around NAT）</td>
                                <td>
                                    STUNでも直接接続できない厳格なNAT（対称型NATなど）の場合に、サーバーを中継役として使う仕組み。帯域幅コストが高いためフォールバック用
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>ICE（Interactive Connectivity Establishment）</td>
                                <td>
                                    STUN・TURNを組み合わせ、利用可能な経路の候補（Candidate）を列挙し、最も効率の良い経路を自動選択するフレームワーク
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
<Diagram id="diag-7" label="STUNおよびTURNを用いたNATトラバーサルのシーケンス図" />
<h4 id="34-udp最適化のベストプラクティス">3.4 UDP最適化のベストプラクティス</h4>
<div className="callout-practice">
                    <div className="practice-label">ベストプラクティス</div>
                    <ul>
                        <li>
                            UDPベースのアプリケーションでは、アプリケーション層で独自の輻輳制御を実装しない限り、他のTCPフローを飢餓状態にする「フェアネス違反」のリスクがあることを理解する
                        </li>
                        <li>
                            NATタイムアウトに備え、定期的なキープアライブパケットを送るか、接続断からの再接続ロジックを実装する
                        </li>
                        <li>
                            P2P接続確立にはICEフレームワークを使い、STUNで解決できない場合のフォールバックとしてTURNサーバーを必ず用意する
                        </li>
                        <li>
                            ペイロードサイズを「パスMTU（経路上の最大転送単位、通常1500バイト前後）−
                            IPヘッダ長（IPv4で20バイト以上、IPv6で40バイト）−
                            UDPヘッダ8バイト」以下に収め、IPフラグメンテーションを避ける（IPv4/1500バイト経路なら概ね1472バイト以下、IPv6なら1452バイト以下が目安）
                        </li>
                    </ul>
                </div>
<hr />
<h3 id="第4章-tlstransport-layer-security">
                    第4章 TLS（Transport Layer Security）
                </h3>
<h4 id="41-tlsが提供する3つの保証">4.1 TLSが提供する3つの保証</h4>
<p>
                    TLSはトランスポート層の上でセキュリティを提供するプロトコルで、次の3つを保証します。
                </p>
<div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">保証</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>暗号化（Encryption）</td>
                                <td>通信内容を第三者が読み取れないようにする</td>
                            </tr>
                            <tr className="even">
                                <td>認証（Authentication）</td>
                                <td>通信相手が主張する身元（証明書）が正しいことを検証する</td>
                            </tr>
                            <tr className="odd">
                                <td>完全性（Integrity）</td>
                                <td>通信経路上でデータが改ざんされていないことを保証する</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
<h4 id="42-tlsハンドシェイクtls-12までの2-rttモデル">
                    4.2 TLSハンドシェイク（TLS 1.2までの2-RTTモデル）
                </h4>
<p>
                    原著執筆当時（TLS
                    1.2ベース）のフルハンドシェイクは、TCPの1RTTに加えてさらに2RTTを要していました。
                </p>
<Diagram id="diag-8" label="TLS 1.2ハンドシェイクの2-RTTフロー図" />
<h4 id="43-鍵交換方式rsaとdiffie-hellman前方秘匿性forward-secrecy">
                    4.3 鍵交換方式：RSAとDiffie-Hellman、前方秘匿性（Forward Secrecy）
                </h4>
<p>
                    古典的なRSA鍵交換は、サーバーの秘密鍵が万一将来漏洩すると、<strong>過去に記録された暗号化通信もすべて復号できてしまう</strong>という弱点があります。Diffie-Hellman鍵交換（特に楕円曲線を使うECDHE）は、セッションごとに一時的な鍵を生成するため、サーバーの秘密鍵が漏洩しても過去のセッションは保護されます。これを前方秘匿性（Forward
                    Secrecy）と呼び、現代のTLS実装では標準的に使われています。
                </p>
<h4 id="44-alpnsniセッション再開">4.4 ALPN・SNI・セッション再開</h4>
<div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">技術</th>
                                <th scope="col">役割</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>ALPN（Application-Layer Protocol Negotiation）</td>
                                <td>
                                    TLSハンドシェイク中に「この後HTTP/2で話します」といったアプリケーション層プロトコルを事前ネゴシエーションし、追加の往復を省く
                                </td>
                            </tr>
                            <tr className="even">
                                <td>SNI（Server Name Indication）</td>
                                <td>
                                    1つのIPアドレスで複数のドメイン（複数の証明書）をホストする際、ClientHelloの時点でどのドメイン向けかをサーバーに伝える拡張
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>セッション再開（Session Resumption）</td>
                                <td>
                                    セッションID方式・セッションチケット方式のいずれかで、2回目以降の接続時にフルハンドシェイクを省略し高速に再接続する仕組み
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
<h4 id="45-証明書チェーンと失効確認">4.5 証明書チェーンと失効確認</h4>
<p>
                    ブラウザは証明書を検証する際、ルート証明書からサーバー証明書までの「信頼の連鎖（Chain
                    of
                    Trust）」をたどります。また、証明書が失効していないかを確認する方法として、CRL（証明書失効リスト）とOCSP（オンライン証明書ステータスプロトコル）があります。OCSPは証明書ごとに認証局へ問い合わせが必要でレイテンシが増えるため、<strong>OCSPステープリング</strong>（サーバー自身が事前にOCSPレスポンスを取得しておき、TLSハンドシェイク中にクライアントへ提示する方式）が推奨されます。
                </p>
<Diagram id="diag-9" label="PKI証明書チェーンとOCSP失効確認フロー図" />
<h4 id="46-tls最適化のベストプラクティス原著の推奨事項">
                    4.6 TLS最適化のベストプラクティス（原著の推奨事項）
                </h4>
<div className="callout-practice">
                    <div className="practice-label">ベストプラクティス</div>
                    <ul>
                        <li>
                            計算コストの高い鍵長・アルゴリズムを見直し、CPU負荷とセキュリティのバランスを取る
                        </li>
                        <li>
                            セッションキャッシュ・セッションチケットを有効にし、再接続時のフルハンドシェイクを回避する
                        </li>
                        <li>
                            TLS False
                            Start（サーバーの最終Finishedメッセージを待たずにアプリケーションデータを送り始める最適化）を活用する
                        </li>
                        <li>
                            TLSレコードサイズをネットワークのMTUに合わせて最適化し、不要な断片化を避ける
                        </li>
                        <li>
                            証明書チェーンを最小限に保ち、余分な中間証明書送信によるバイト数増加を避ける
                        </li>
                        <li>
                            OCSPステープリングを設定し、クライアント側の追加ラウンドトリップを削減する
                        </li>
                        <li>
                            HSTS（HTTP Strict Transport
                            Security）を有効化し、平文HTTPへのダウングレード攻撃を防ぐと同時に、リダイレクトによる往復を省略する
                        </li>
                        <li>サイト全体をHTTPS化し、混在コンテンツ（Mixed Content）を排除する</li>
                    </ul>
                </div>
<blockquote>
                    <p>
                        <strong>2026年時点の補足</strong>: 本章はTLS
                        1.2時代（2-RTTハンドシェイク）を前提に書かれていますが、現在主流のTLS
                        1.3では<strong>1-RTTハンドシェイク</strong>が標準となり、条件が揃えば<strong>0-RTT再接続</strong>も可能です。詳細は第5部で解説します。
                    </p>
                </blockquote>
<hr />
<h2 id="第2部ワイヤレスネットワークのパフォーマンス">
                    第2部：ワイヤレスネットワークのパフォーマンス
                </h2>
<h3 id="第5章-ワイヤレスネットワーク入門">第5章 ワイヤレスネットワーク入門</h3>
<h4 id="51-ワイヤレスネットワークの分類">5.1 ワイヤレスネットワークの分類</h4>
<p>無線ネットワークは、通信距離とユースケースによって複数の階層に分類されます。</p>
<div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">分類</th>
                                <th scope="col">代表例</th>
                                <th scope="col">通信距離の目安</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>PAN（Personal Area Network）</td>
                                <td>Bluetooth、NFC</td>
                                <td>数cm〜数m</td>
                            </tr>
                            <tr className="even">
                                <td>LAN（Local Area Network）</td>
                                <td>WiFi（IEEE 802.11）</td>
                                <td>数十m</td>
                            </tr>
                            <tr className="odd">
                                <td>MAN（Metropolitan Area Network）</td>
                                <td>WiMAX</td>
                                <td>数km</td>
                            </tr>
                            <tr className="even">
                                <td>WAN（Wide Area Network）</td>
                                <td>3G/4G/5Gなどのモバイルセルラー網</td>
                                <td>数km〜数十km（セル単位）</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
<h4 id="52-ワイヤレス通信の性能を決める3要素">
                    5.2 ワイヤレス通信の性能を決める3要素
                </h4>
<Diagram id="diag-10" label="ワイヤレス通信性能を決める3要素のフロー図" />
<p>
                    無線通信では、信号強度（電波強度）と雑音の比率（SNR: Signal-to-Noise
                    Ratio）が高いほど、より複雑な変調方式（1回の伝送でより多くのビットを表現できる方式）を使うことができ、結果として高いスループットが得られます。逆に、電波状況が悪化するとより単純な（低速な）変調方式へ自動的にフォールバックします。これが「WiFiの表示上の速度（例:
                    866Mbps）」と「実際のスループット」が大きく乖離する理由の一つです。
                </p>
<div className="callout-practice">
                    <div className="practice-label">ベストプラクティス</div>
                    <ul>
                        <li>
                            無線環境の性能は固定的なものではなく、電波状況・干渉・距離によって秒単位で変動することを前提にアプリケーションを設計する
                        </li>
                        <li>
                            ネットワーク種別（WiFi/セルラー）や信号強度をJavaScriptから取得できるAPI（Network
                            Information
                            APIなど）がある場合は活用し、低速時には画質やペイロードを動的に下げる
                        </li>
                    </ul>
                </div>
<hr />
<h3 id="第6章-wifi">第6章 WiFi</h3>
<h4 id="61-イーサネットとwifiの根本的な違いcsmacdとcsmaca">
                    6.1 イーサネットとWiFiの根本的な違い：CSMA/CDとCSMA/CA
                </h4>
<p>
                    有線イーサネットは衝突検出（CSMA/CD:
                    送信しながら衝突を検知し即座に中断）が可能ですが、無線LANでは自分の送信中に他局の電波を同時受信できない（送信と受信を同時にできないハーフデュプレックス特性）ため、衝突を<strong>事前に回避する</strong>方式（CSMA/CA:
                    Carrier Sense Multiple Access with Collision
                    Avoidance）を採用しています。送信前にランダムなバックオフ時間だけ待機し、チャネルが空いていることを確認してから送信します。
                </p>
<Diagram id="diag-11" label="CSMA/CDとCSMA/CAの衝突制御フロー比較図" />
<h4 id="62-wifi規格の進化">6.2 WiFi規格の進化</h4>
<div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">規格</th>
                                <th scope="col">制定年</th>
                                <th scope="col">周波数帯</th>
                                <th scope="col">理論最大速度の目安</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>802.11b</td>
                                <td>1999</td>
                                <td>2.4GHz</td>
                                <td>11 Mbps</td>
                            </tr>
                            <tr className="even">
                                <td>802.11g</td>
                                <td>2003</td>
                                <td>2.4GHz</td>
                                <td>54 Mbps</td>
                            </tr>
                            <tr className="odd">
                                <td>802.11n（WiFi 4）</td>
                                <td>2009</td>
                                <td>2.4/5GHz</td>
                                <td>600 Mbps（MIMO）</td>
                            </tr>
                            <tr className="even">
                                <td>802.11ac（WiFi 5）</td>
                                <td>2013</td>
                                <td>5GHz</td>
                                <td>数Gbps（MU-MIMO）</td>
                            </tr>
                            <tr className="odd">
                                <td>802.11ax（WiFi 6/6E）</td>
                                <td>2019〜</td>
                                <td>2.4/5/6GHz</td>
                                <td>9.6 Gbps理論値、OFDMAで多端末効率向上</td>
                            </tr>
                            <tr className="even">
                                <td>802.11be（WiFi 7）</td>
                                <td>2024〜</td>
                                <td>2.4/5/6GHz</td>
                                <td>マルチリンク動作（MLO）で複数帯域を同時使用</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
<blockquote>
                    <p>
                        2026年時点、WiFi
                        7（802.11be）は主流機種に標準搭載されつつあり、マルチリンクオペレーション（MLO）により複数の周波数帯を同時に束ねることで、混雑環境下でも低レイテンシを維持しやすくなっています。
                    </p>
                </blockquote>
<h4 id="63-wifiにおけるパケットロスの原因">6.3 WiFiにおけるパケットロスの原因</h4>
<p>
                    WiFi環境でのパケットロスは、有線環境と異なり必ずしも「輻輳（混雑）」だけが原因ではありません。電波干渉、信号減衰（距離・障害物）、隠れ端末問題（Hidden
                    Node
                    Problem）など物理層由来の要因が複雑に絡みます。しかしTCPの輻輳制御アルゴリズムの多くは「パケットロス＝輻輳」と解釈するため、<strong>WiFi特有の物理層ロスをTCPが誤って輻輳と判断し、不必要に送信速度を落としてしまう</strong>という問題が古くから指摘されています（これは後述するBBR系アルゴリズムが解決を試みている課題の一つです）。
                </p>
<div className="callout-practice">
                    <div className="practice-label">ベストプラクティス</div>
                    <ul>
                        <li>
                            WiFi環境では帯域幅を「無制限」として扱わない。混雑時間帯・多端末接続時のスループット低下を考慮する
                        </li>
                        <li>
                            可変レイテンシ・可変帯域幅に適応できるよう、アプリケーションはネットワーク状態を継続的に監視し、品質を動的に調整する（アダプティブビットレートなど）
                        </li>
                    </ul>
                </div>
<hr />
<h3 id="第7章-モバイルネットワーク">第7章 モバイルネットワーク</h3>
<h4 id="71-世代gの歴史">7.1 世代（G）の歴史</h4>
<Diagram id="diag-12" label="モバイルネットワーク世代（1G〜5G）の進化図" />
<h4 id="72-rrcradio-resource-control状態遷移とパフォーマンスへの影響">
                    7.2 RRC（Radio Resource Control）状態遷移とパフォーマンスへの影響
                </h4>
<p>
                    モバイル端末の無線チップは、常に電波を送受信し続けているわけではありません。バッテリー消費を抑えるため、通信の有無に応じてRRC（無線リソース制御）状態を遷移させます。この状態遷移こそが、モバイルネットワーク特有の「見えない遅延」の正体です。
                </p>
<Diagram id="diag-13" label="RRC状態遷移とタイマーによる電力制御図" />
<p>
                    5G
                    NRでは、RRC_IDLE・RRC_CONNECTEDに加えて<strong>RRC_INACTIVE</strong>が独立した第3の状態として定義されています。RRC_INACTIVEは端末とネットワークの双方がRRCコンテキスト（セキュリティ設定やベアラ情報）を保持したまま無線を休止する状態で、再開時は完全な接続確立手順ではなく<strong>RRCResume</strong>手順で済むため、RRC_IDLEからの昇格（数百ms〜数秒）に比べて<strong>数十ms程度</strong>と大幅に低遅延です。周期的に小さなデータを送るアプリケーションの遅延・電力特性は、端末がRRC_IDLEとRRC_INACTIVEのどちらに落ちているかで大きく変わります。
                </p>
<p>
                    この「RRC_IDLE→RRC_CONNECTED」への遷移にかかる時間（State Promotion
                    Delay）は数百ミリ秒から数秒に及ぶことがあり（RRC_INACTIVEからのRRCResumeであれば数十ms程度に短縮されます）、特にアプリが数秒おきに小さなデータを送受信するような「周期的な通信」を行うと、<strong>その都度この昇格遅延を支払うことになり、体感速度の悪化とバッテリー消費の増大を同時に招きます</strong>。
                </p>
<h4 id="73-モバイル網のエンドツーエンド構造">
                    7.3 モバイル網のエンドツーエンド構造
                </h4>
<Diagram id="diag-14" label="モバイル通信網のエンドツーエンド構造図" />
<p>
                    無線区間だけでなく、基地局からコアネットワークまでの「バックホール」区間の容量・遅延も、モバイル通信全体のレイテンシに大きく影響します。
                </p>
<div className="callout-practice">
                    <div className="practice-label">ベストプラクティス</div>
                    <ul>
                        <li>
                            モバイル網の実効レイテンシはWiFiや有線の数倍〜数十倍になりうることを前提に、リクエスト往復回数を最小化する設計を優先する
                        </li>
                        <li>
                            RRC状態遷移のコストを理解し、後述の第8章の最適化手法（キープアライブ削減・バッチ送信）を実践する
                        </li>
                    </ul>
                </div>
<hr />
<h3 id="第8章-モバイルネットワークの最適化">第8章 モバイルネットワークの最適化</h3>
<h4 id="81-バッテリーとネットワークのトレードオフ">
                    8.1 バッテリーとネットワークのトレードオフ
                </h4>
<p>
                    モバイル最適化の目標は、単純な速度向上だけでなく「<strong>バッテリー消費を抑えながら</strong>」ネットワークを効率よく使うことです。原著は次の実践的な指針を提示しています。
                </p>
<Diagram id="diag-15" label="無線チップの電力状態とパケットバースト最適化図" />
<h4 id="82-具体的な最適化パターン">8.2 具体的な最適化パターン</h4>
<div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">パターン</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>バースト転送してアイドルに戻る（Burst and go idle）</td>
                                <td>
                                    データをまとめて一度に送受信し、その後は無線を休止させてRRC状態をIdleに戻す。細切れの通信を避ける
                                </td>
                            </tr>
                            <tr className="even">
                                <td>キープアライブの削減</td>
                                <td>
                                    アプリケーションが頻繁に送る死活確認パケットは、その都度RRC状態を昇格させバッテリーを消耗させる。間隔を長くするか、プッシュ通知など効率的な代替手段に置き換える
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>ネットワーク可用性の変化に対応した設計</td>
                                <td>
                                    モバイル環境ではネットワークが瞬断・切替（WiFi⇔セルラー）することを前提に、再試行・オフラインキューイングを実装する
                                </td>
                            </tr>
                            <tr className="even">
                                <td>プロトコル・アプリケーションのベストプラクティス適用</td>
                                <td>
                                    圧縮、キャッシュ、リクエスト数削減など、第13章で扱う汎用的な最適化と組み合わせる
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
<div className="callout-practice">
                    <div className="practice-label">ベストプラクティス</div>
                    <ul>
                        <li>
                            ポーリング間隔を可能な限り長く取るか、サーバープッシュ（第16・17章のSSE/WebSocket）に置き換え、周期通信によるRRC昇格を最小化する
                        </li>
                        <li>アプリがバックグラウンドにあるときの通信頻度を積極的に抑制する</li>
                        <li>
                            可能な場合はWiFi接続時にのみ大きなダウンロード（アップデート等）を行うよう設計する
                        </li>
                    </ul>
                </div>
<hr />
            </main>
        </div>
    );
}
