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
<h2 id="第3部http">第3部：HTTP</h2>
<h3 id="第9章-httpの歴史">第9章 HTTPの歴史</h3>
<h4 id="91-httpバージョンの進化">9.1 HTTPバージョンの進化</h4>
<Diagram id="diag-16" label="HTTPプロトコル（0.9〜3）の歴史的変遷図" />
<h4 id="92-各バージョンの要点">9.2 各バージョンの要点</h4>
<div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">バージョン</th>
                                <th scope="col">主な特徴</th>
                                <th scope="col">主な課題</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>HTTP/0.9</td>
                                <td>1行のリクエスト（GET /index.html）、レスポンスはHTMLのみ</td>
                                <td>ヘッダなし、ステータスコードなし、拡張性ゼロ</td>
                            </tr>
                            <tr className="even">
                                <td>HTTP/1.0</td>
                                <td>
                                    リクエスト・レスポンスヘッダ、Content-Type、ステータスコード導入
                                </td>
                                <td>リクエストごとに新規TCP接続（Keep-Aliveなし）が一般的</td>
                            </tr>
                            <tr className="odd">
                                <td>HTTP/1.1</td>
                                <td>
                                    Keep-Alive標準化、パイプライニング仕様化（実際にはほぼ使われず）、Hostヘッダ必須化によるバーチャルホスト対応
                                </td>
                                <td>
                                    仕様上はリクエストをパイプライン化できるが、レスポンスは要求順に返す必要があるためHTTPレベルのHOLブロッキングが残る。加えて実装面ではブラウザがパイプラインを使わず1接続あたりのリクエストを直列化するため、同一オリジンへの接続数（6本程度）が実質的な並列度の上限になる
                                </td>
                            </tr>
                            <tr className="even">
                                <td>HTTP/2</td>
                                <td>
                                    バイナリフレーミング、1接続内でのストリーム多重化、ヘッダ圧縮（HPACK）、サーバープッシュ（後に非推奨化）
                                </td>
                                <td>
                                    TCP自体のHOLブロッキングは解決できない（トランスポート層の限界）
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>HTTP/3</td>
                                <td>
                                    QUIC（UDPベース）上に構築、ストリームごとに独立した信頼性制御でTCPレベルのHOLブロッキングを解消、コネクションマイグレーション対応
                                </td>
                                <td>
                                    ミドルボックス互換性、UDPブロック環境での接続失敗、デバッグの複雑さ
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
<div className="callout-practice">
                    <div className="practice-label">ベストプラクティス</div>
                    <ul>
                        <li>
                            新規プロジェクトでは、対応可能な環境（CDN・ブラウザ）である限りHTTP/2以上を既定とし、HTTP/1.1向けの最適化（ドメインシャーディング等）は行わない
                        </li>
                        <li>
                            HTTP/3対応状況は2026年時点でもHTTP/2ほど普遍的ではないため、フォールバック設計（Alt-Svcヘッダ等）を必ず組み込む
                        </li>
                    </ul>
                </div>
<hr />
<h3 id="第10章-webパフォーマンス入門">第10章 Webパフォーマンス入門</h3>
<h4 id="101-モダンwebアプリケーションの解剖">
                    10.1 モダンWebアプリケーションの解剖
                </h4>
<p>
                    現代のWebページは、単一のHTMLファイルではなく、HTML・CSS・JavaScript・画像・フォント・XHR/Fetchによる非同期リクエストなど、数十から数百のリソースの組み合わせで構成されます。これら全体の読み込み過程を可視化したものが「リソースウォーターフォール」です。
                </p>
<Diagram id="diag-17" label="Webアプリケーションのリソース構成解剖図" />
<h4 id="102-パフォーマンスの3本柱">10.2 パフォーマンスの3本柱</h4>
<p>原著は、Webパフォーマンスを次の3つの柱に分解しています。</p>
<div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">柱</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>コンピューティング（Computing）</td>
                                <td>
                                    JavaScript実行、レイアウト計算、ペイントなど、CPU/GPUで行われる処理
                                </td>
                            </tr>
                            <tr className="even">
                                <td>レンダリング（Rendering）</td>
                                <td>
                                    DOM構築、CSSOM構築、レンダーツリー構築、レイアウト、ペイントというブラウザの描画パイプライン
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>ネットワーキング（Networking）</td>
                                <td>
                                    本書全体のテーマであるDNS解決・TCP/TLS確立・HTTPリクエストの往復
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
<p>
                    「帯域幅を増やしてもあまり速くならない」という原著の指摘は今も本質的に正しく、多くのケースでボトルネックはレイテンシ（往復回数）とレンダリングブロッキングリソースの解決順序にあります。
                </p>
<h4 id="103-合成モニタリングsyntheticとrumreal-user-monitoring">
                    10.3 合成モニタリング（Synthetic）とRUM（Real User Monitoring）
                </h4>
<div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">手法</th>
                                <th scope="col">特徴</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>合成モニタリング（Synthetic）</td>
                                <td>
                                    決められたネットワーク条件・デバイスで定期的に計測（Lighthouse、WebPageTest等）。再現性は高いが実際のユーザー環境を反映しない
                                </td>
                            </tr>
                            <tr className="even">
                                <td>RUM（Real User Monitoring）</td>
                                <td>
                                    実際のユーザーのブラウザから収集した実測データ（Core Web
                                    Vitalsのフィールドデータなど）。実態を反映するがノイズが多い
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
<div className="callout-practice">
                    <div className="practice-label">ベストプラクティス</div>
                    <ul>
                        <li>
                            合成モニタリングとRUMの両方を併用し、開発時のリグレッション検知には合成、実態把握と優先順位付けにはRUMを使う
                        </li>
                        <li>
                            レンダリングをブロックするリソース（同期CSS/JS）を可能な限り減らし、クリティカルレンダリングパス（初期表示に必要な最小限のリソース群）を短くする
                        </li>
                    </ul>
                </div>
<hr />
<h3 id="第11章-http1x">第11章 HTTP/1.X</h3>
<h4 id="111-keep-aliveの効果とその限界">11.1 Keep-Aliveの効果とその限界</h4>
<p>
                    HTTP/1.1のKeep-Aliveにより、1つのTCP接続を複数のHTTPリクエストで使い回せるようになり、リクエストごとのTCPハンドシェイクコストを削減できます。しかし、1つの接続内では次のリクエストを送る前に前のレスポンスを完全に受信し終える必要がある（リクエストのシリアライズ）という制約は残ります。
                </p>
<h4 id="112-複数tcp接続とドメインシャーディング">
                    11.2 複数TCP接続とドメインシャーディング
                </h4>
<p>
                    ブラウザは1オリジンあたり通常6本程度のTCP接続を並行して開くことで、この制約を部分的に回避しています。さらに、意図的に複数のサブドメインにリソースを分散させ、実質的な並列接続数を増やす「ドメインシャーディング」というテクニックが2010年代前半に広く使われました。
                </p>
<Diagram id="diag-18" label="HTTP/1.1の複数接続とドメインシャーディング構成図" />
<p>
                    このテクニックはHTTP/1.1環境では有効でしたが、接続ごとにTCPスロースタート・TLSハンドシェイクのコストが重複して発生するというデメリットがあり、後述のHTTP/2以降ではむしろ有害（アンチパターン）とされています。
                </p>
<h4 id="113-その他のhttp11最適化テクニック歴史的経緯">
                    11.3 その他のHTTP/1.1最適化テクニック（歴史的経緯）
                </h4>
<div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">テクニック</th>
                                <th scope="col">内容</th>
                                <th scope="col">HTTP/2以降の扱い</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>連結（Concatenation）</td>
                                <td>複数のCSS/JSファイルを1つに結合し、リクエスト数を削減</td>
                                <td>
                                    多重化によりリクエスト数削減の必要性が薄れ、キャッシュ効率悪化のデメリットが相対的に大きくなる
                                </td>
                            </tr>
                            <tr className="even">
                                <td>スプライティング（Spriting）</td>
                                <td>
                                    複数の画像を1枚の画像にまとめ、CSSのbackground-positionで切り出す
                                </td>
                                <td>
                                    同上、CSS/HTTPリクエストの管理コストとのトレードオフで見直しが進む
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>インライン化（Resource Inlining）</td>
                                <td>
                                    小さなCSS/JS/画像をHTML内に直接埋め込み、リクエスト自体をなくす
                                </td>
                                <td>
                                    キャッシュの粒度が粗くなるデメリットがあり、HTTP/2のServer
                                    Push構想（後に非推奨）と競合していた
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
<div className="callout-practice">
                    <div className="practice-label">ベストプラクティス</div>
                    <ul>
                        <li>
                            HTTP/1.1のみをサポートする古い環境向けには、上記の連結・スプライティング・インライン化・ドメインシャーディングを状況に応じて使う
                        </li>
                        <li>
                            ただしHTTP/2以降が使える環境では、これらのテクニックは接続の多重化と衝突し逆効果になりうるため、原則として使用しない
                        </li>
                    </ul>
                </div>
<hr />
<h3 id="第12章-http2">第12章 HTTP/2</h3>
<h4 id="121-spdyからhttp2への系譜">12.1 SPDYからHTTP/2への系譜</h4>
<p>
                    HTTP/2はGoogleが開発した実験的プロトコル「SPDY」を起源としています。SPDYが実運用で効果を実証したことで、IETFによる標準化が進み、2015年にHTTP/2としてRFC
                    7540が発行されました（後にRFC 9113で更新）。
                </p>
<h4 id="122-バイナリフレーミング層">12.2 バイナリフレーミング層</h4>
<p>
                    HTTP/1.xはテキストベースのプロトコルでしたが、HTTP/2はバイナリフレーミング層を導入し、すべてのやり取りを「フレーム」という小さな単位に分割します。これにより、パーサーの実装が単純化され、複数のリクエスト・レスポンスを1つの接続上で安全に混在させる（多重化する）ことが可能になりました。
                </p>
<Diagram id="diag-19" label="HTTP/2バイナリフレーミング層とストリーム多重化図" />
<h4 id="123-リクエストレスポンスの多重化とストリーム優先度">
                    12.3 リクエスト・レスポンスの多重化とストリーム優先度
                </h4>
<p>
                    HTTP/1.1では、仕様上パイプライン化できてもレスポンスが要求順に固定されるうえ、ブラウザ実装は事実上「1接続で1リクエストずつ直列」に処理していました。これに対しHTTP/2では「1接続=多数のストリーム」を順序制約なしに並行して処理できます。これにより、ドメインシャーディングのような回避策が不要になり、1オリジンにつき1本のTCPコネクションを使うことが推奨されるようになりました（TCPスロースタートやTLSハンドシェイクのコストを1回に集約できるため）。また、ストリームには優先度（Priority）を設定でき、重要なリソース（CSSなど）を先に配信するよう調整できます。
                </p>
<h4 id="124-ヘッダ圧縮hpack">12.4 ヘッダ圧縮（HPACK）</h4>
<p>
                    HTTPリクエストにはUser-Agent、Cookie、Accept系など類似したヘッダが毎回繰り返し送られます。HTTP/2はHPACKという専用の圧縮方式を使い、送信済みのヘッダをテーブルにキャッシュして差分のみを送ることで、ヘッダ部分のオーバーヘッドを大幅に削減します。
                </p>
<h4 id="125-サーバープッシュとその後の非推奨化">
                    12.5 サーバープッシュとその後の非推奨化
                </h4>
<p>
                    HTTP/2が導入した「サーバープッシュ」（クライアントが要求する前にサーバーが関連リソースを能動的に送信する仕組み）は、理論上はラウンドトリップを削減できるはずでしたが、実運用ではキャッシュとの相性の悪さ（ブラウザが既にキャッシュ済みのリソースを無駄にプッシュしてしまう）や実装の複雑さから効果が限定的であることが判明し、Chromeなど主要ブラウザは2020年前後にサーバープッシュのサポートを打ち切りました。代替として、後述の103
                    Early Hintsステータスコードが使われるようになっています。
                </p>
<h4 id="126-http2最適化フロー制御と1オリジン1接続">
                    12.6 HTTP/2最適化：フロー制御と1オリジン1接続
                </h4>
<p>
                    HTTP/2はストリームごと・コネクションごとに独立したフロー制御ウィンドウを持ちます。デフォルトのウィンドウサイズが小さいまま運用すると、多重化のメリットを活かせずスループットが頭打ちになるため、サーバー・クライアント双方の実装がウィンドウサイズを適切にチューニングしているか確認する必要があります。
                </p>
<div className="callout-practice">
                    <div className="practice-label">ベストプラクティス</div>
                    <ul>
                        <li>
                            1オリジンにつき1本のHTTP/2コネクションを使うことを前提に設計し、ドメインシャーディングを廃止する
                        </li>
                        <li>
                            サーバープッシュには依存せず、Link: rel=preloadヘッダや103 Early
                            Hintsなど、キャッシュと親和性の高い代替手法を検討する
                        </li>
                        <li>
                            HPACKの恩恵を最大化するため、ヘッダの値（特にCookie等）を不必要に肥大化させない
                        </li>
                        <li>
                            導入後は必ずHTTP/2対応のツールでサーバーの多重化耐性・フロー制御の挙動を実測する
                        </li>
                    </ul>
                </div>
<hr />
<h3 id="第13章-アプリケーション配信の最適化">
                    第13章 アプリケーション配信の最適化
                </h3>
<h4 id="131-不朽のベストプラクティスevergreen-performance-best-practices">
                    13.1 「不朽の」ベストプラクティス（Evergreen Performance Best Practices）
                </h4>
<p>
                    原著は、HTTP/1.xでもHTTP/2でも変わらず有効な最適化を「Evergreen（常緑）」なベストプラクティスと呼んでいます。
                </p>
<Diagram id="diag-20" label="不朽のWebパフォーマンス最適化ベストプラクティス分類図" />
<div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">施策</th>
                                <th scope="col">具体例</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>クライアントキャッシュ</td>
                                <td>
                                    適切なCache-Control・ETagヘッダの設定、Service
                                    Workerによる高度なキャッシュ戦略
                                </td>
                            </tr>
                            <tr className="even">
                                <td>データ圧縮</td>
                                <td>Gzip・Brotliによるテキストリソースの圧縮、画像のWebP/AVIF化</td>
                            </tr>
                            <tr className="odd">
                                <td>不要バイトの削減</td>
                                <td>
                                    Cookieの肥大化防止、不要なヘッダ・クエリパラメータの削除、Minify（コード圧縮）
                                </td>
                            </tr>
                            <tr className="even">
                                <td>並列処理</td>
                                <td>
                                    サーバー側での並列I/O、クライアント側での非同期リソース読み込み
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
<h4 id="132-http1x向け最適化とhttp2向け最適化の違い">
                    13.2 HTTP/1.x向け最適化とHTTP/2向け最適化の違い
                </h4>
<div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">施策</th>
                                <th scope="col">HTTP/1.x</th>
                                <th scope="col">HTTP/2</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>ドメインシャーディング</td>
                                <td>有効（並列接続数を増やせる）</td>
                                <td>有害（TLS/TCPコスト重複、優先度制御の妨げ）</td>
                            </tr>
                            <tr className="even">
                                <td>連結・スプライティング</td>
                                <td>有効（リクエスト数削減）</td>
                                <td>効果薄〜有害（キャッシュ粒度が粗くなる、多重化と競合）</td>
                            </tr>
                            <tr className="odd">
                                <td>リソースインライン化</td>
                                <td>有効</td>
                                <td>慎重に。キャッシュできない代償が大きい場合が多い</td>
                            </tr>
                            <tr className="even">
                                <td>サーバープッシュ</td>
                                <td>非対応</td>
                                <td>非推奨（多くのブラウザが撤廃済み。Early Hints等で代替）</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
<h4 id="133-http2サーバーの品質テスト">13.3 HTTP/2サーバーの品質テスト</h4>
<p>
                    HTTP/2はプロトコルとしては多重化・優先度制御を規定していますが、実装（サーバーソフトウェアやCDN）によって優先度制御の実装品質に大きな差があることが知られています。原著は、実際にストリーム優先度を尊重しているか、フロー制御が適切かをテストで検証することを推奨しています。
                </p>
<div className="callout-practice">
                    <div className="practice-label">ベストプラクティス</div>
                    <ul>
                        <li>
                            「Evergreenな」最適化（キャッシュ・圧縮・バイト削減・並列化）はプロトコルバージョンに関わらず常に実施する
                        </li>
                        <li>
                            HTTP/1.x向けの回避策（シャーディング等）をHTTP/2/3環境に残さない。プロトコル移行時は最適化戦略ごと見直す
                        </li>
                        <li>
                            導入したCDN・サーバーが実際にHTTP/2の優先度制御を正しく実装しているか、実測ツールで検証する
                        </li>
                    </ul>
                </div>
<hr />
<h2 id="第4部ブラウザapiとプロトコル">第4部：ブラウザAPIとプロトコル</h2>
<h3 id="第14章-ブラウザネットワーキング入門">
                    第14章 ブラウザネットワーキング入門
                </h3>
<h4 id="141-ブラウザが持つ独自の接続管理層">14.1 ブラウザが持つ独自の接続管理層</h4>
<p>
                    ブラウザは、OSのTCPスタックをそのまま使うのではなく、その上に独自の「接続管理層」を持っています。これには、オリジンごとの接続数上限、DNSプリフェッチ、TCPプリコネクト、リソースの優先度付けキューなどが含まれます。
                </p>
<Diagram id="diag-21" label="ブラウザ内部のネットワーク接続管理レイヤー図" />
<h4 id="142-ネットワークセキュリティとサンドボックス">
                    14.2 ネットワークセキュリティとサンドボックス
                </h4>
<p>
                    ブラウザは、悪意あるスクリプトが他サイトの機密情報を勝手に読み取れないよう、同一オリジンポリシー（Same-Origin
                    Policy）を基本としたサンドボックスモデルで動作します。
                </p>
<p>
                    ここで初学者が最も誤解しやすいのが CORS（Cross-Origin Resource
                    Sharing）の役割です。CORSが制御するのは主に「<strong>クロスオリジンのレスポンスをスクリプトに読み取らせるかどうか</strong>」であって、「リクエストを送信させるかどうか」ではありません。GETや<code>application/x-www-form-urlencoded</code>のPOSTなど<strong>シンプルリクエスト</strong>の条件を満たす場合、リクエストはプリフライトなしでそのまま相手サーバーへ届きます。サーバーが<code>Access-Control-Allow-Origin</code>を返さなければ、ブラウザは「すでに送信され処理されたレスポンスをスクリプトに渡さない」という形で保護するにすぎません。
                </p>
<p>
                    一方、カスタムヘッダや<code>application/json</code>を伴う<strong>非シンプルリクエスト</strong>では、実リクエストの前に<strong>プリフライト（OPTIONSリクエスト</strong>）でサーバーの許可を検証し、許可が得られなければ実リクエストは送信されません。つまりCORSには「レスポンス共有の制御」と「プリフライトによる事前検証」という2つの側面があります。
                </p>
<p>
                    そして、副作用を伴うリクエストが他サイトから勝手に送られること自体を防ぐのはCORSの責務ではなく、CSRF対策（SameSite
                    Cookie・CSRFトークン等）の責務です（第15章で詳述）。
                </p>
<h4 id="143-リソースクライアント状態キャッシング">
                    14.3 リソース・クライアント状態キャッシング
                </h4>
<p>
                    ブラウザは、HTTPキャッシュ（<code>Cache-Control</code>/<code>ETag</code>ベース）だけでなく、Cookie・LocalStorage・IndexedDB・Service
                    Workerキャッシュなど複数のクライアント側状態管理の仕組みを提供しています。これらを適切に使い分けることが、リクエスト数削減・オフライン対応の鍵になります。
                </p>
<div className="callout-practice">
                    <div className="practice-label">ベストプラクティス</div>
                    <ul>
                        <li>
                            ブラウザが提供する接続管理（優先度付け、プリコネクト等）を妨げないよう、リソースの読み込み順序・優先度ヒント（<code>fetchpriority</code>属性等）を適切に指定する
                        </li>
                        <li>
                            CORSの設定は必要最小限のオリジン・メソッド・ヘッダに絞り、プリフライトリクエスト（後述）の発生条件を理解した上で設計する
                        </li>
                    </ul>
                </div>
<hr />
<h3 id="第15章-xmlhttprequest">第15章 XMLHttpRequest</h3>
<h4 id="151-xhrの歴史と役割">15.1 XHRの歴史と役割</h4>
<p>
                    XMLHttpRequest（XHR）は、ページ全体をリロードせずにサーバーと非同期通信を行うための最初期のブラウザAPIで、いわゆる「Ajax」という開発スタイルの基盤となりました。現在は<code>fetch()</code>APIがより現代的な代替として広く使われていますが、XHRが確立した「非同期HTTP通信」というモデル自体はfetchにも引き継がれています。
                </p>
<h4 id="152-corscross-origin-resource-sharingとプリフライトリクエスト">
                    15.2 CORS（Cross-Origin Resource Sharing）とプリフライトリクエスト
                </h4>
<p>
                    異なるオリジンへのXHR/fetchリクエストのうち、「シンプルリクエスト」の条件（GET/POST/HEADかつ特定のヘッダのみ等）を満たさないものは、実際のリクエストを送る前にブラウザが自動的に<code>OPTIONS</code>メソッドで<strong>プリフライトリクエスト</strong>を送信し、サーバーがそのオリジン・メソッド・ヘッダを許可しているかを事前確認します。
                </p>
<Diagram id="diag-22" label="CORSプリフライトリクエストのシーケンス図" />
<div className="callout-practice">
                    <div className="practice-label">ベストプラクティス</div>
                    <ul>
                        <li>
                            プリフライトが発生する条件（カスタムヘッダ、application/json等の非シンプルContent-Type）を理解し、頻繁に呼ばれるAPIでは可能な範囲でシンプルリクエストの条件に収める
                        </li>
                        <li>
                            サーバー側で<code>Access-Control-Max-Age</code>を適切に設定し、プリフライト結果をブラウザにキャッシュさせ、繰り返しの往復を削減する
                        </li>
                    </ul>
                </div>
<h4 id="153-ダウンロードアップロードの進捗監視とストリーミング">
                    15.3 ダウンロード・アップロードの進捗監視とストリーミング
                </h4>
<p>
                    XHRは<code>progress</code>イベントによってダウンロード・アップロードの進捗を監視できます。
                </p>
<p>
                    なお<code>responseType</code>（<code>''</code>/<code>text</code>・<code>json</code>・<code>blob</code>・<code>arraybuffer</code>・<code>document</code>）は、あくまで<strong>レスポンスを最終的にどの形式で受け取るか</strong>を選択するものであり、それ自体がストリーミング処理を有効にするわけではありません。XHRでレスポンスを逐次処理できるのは<code>responseType</code>が<code>''</code>（空文字）または<code>text</code>の場合に限られ、<code>readyState</code>が<code>LOADING</code>（3）の間に<code>responseText</code>を繰り返し読み進める形になります。バイナリを含む本格的なストリーミング受信が必要な場合は、XHRではなくFetch
                    APIのストリーム（<code>Response.body</code>が返す<code>ReadableStream</code>）を用います。
                </p>
<h4 id="154-ポーリングとロングポーリング">15.4 ポーリングとロングポーリング</h4>
<p>
                    サーバーからのリアルタイム通知を実現する古典的な手法として、原著は次の2つを紹介しています。
                </p>
<div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">手法</th>
                                <th scope="col">動作</th>
                                <th scope="col">課題</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>ポーリング（Polling）</td>
                                <td>
                                    一定間隔でクライアントがサーバーに新着データの有無を問い合わせる
                                </td>
                                <td>
                                    更新がなくてもリクエストが発生し、無駄なオーバーヘッドとレイテンシが生じる
                                </td>
                            </tr>
                            <tr className="even">
                                <td>ロングポーリング（Long-Polling）</td>
                                <td>
                                    サーバーは新着データが発生するまでレスポンスを保留し、発生した時点で応答する。クライアントは応答を受けたら即座に再リクエスト
                                </td>
                                <td>
                                    ポーリングよりリアルタイム性は高いが、サーバー側で大量の保留中コネクションを維持するコストが発生する
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
<p>
                    これらの制約が、後述するSSE（第16章）やWebSocket（第17章）という、真の意味でサーバー起点のプッシュ通信を可能にするプロトコルが生まれた背景にあります。
                </p>
<hr />
<h3 id="第16章-server-sent-eventssse">第16章 Server-Sent Events（SSE）</h3>
<h4 id="161-eventsource-apiとイベントストリームプロトコル">
                    16.1 EventSource APIとイベントストリームプロトコル
                </h4>
<p>
                    SSEは、サーバーからクライアントへの<strong>一方向</strong>のリアルタイムストリーミングに特化したシンプルな仕組みです。ブラウザの<code>EventSource</code>
                    APIを使い、サーバーは通常のHTTPレスポンスを<code>Content-Type: text/event-stream</code>として返し、接続を切らずにテキスト形式のイベントを継続的に送り続けます。
                </p>
<Diagram id="diag-23" label="Server-Sent Events（SSE）の単方向通信シーケンス図" />
<h4 id="162-sseの利点と適したユースケース">16.2 SSEの利点と適したユースケース</h4>
<p>
                    SSEはHTTP上に構築されているため、既存のHTTPインフラ（プロキシ、ロードバランサー、認証機構）とそのまま親和性が高く、実装もシンプルです。自動再接続や「どこから再開するか」を示す<code>Last-Event-ID</code>の仕組みも標準で組み込まれています。ただし、通信は<strong>サーバーからクライアントへの一方向のみ</strong>であり、双方向通信が必要な場合は後述のWebSocketが適しています。
                </p>
<div className="callout-practice">
                    <div className="practice-label">ベストプラクティス</div>
                    <ul>
                        <li>
                            サーバー起点の通知（株価更新、進捗通知、ライブフィード等）で、クライアントからの応答が不要な用途にはSSEを第一候補とする
                        </li>
                        <li>
                            HTTP/1.1環境ではブラウザの同時接続数上限（1オリジンあたり6本程度）にSSE接続も含まれるため、多数のSSE接続を同時に開くページ設計は避ける（HTTP/2以降は多重化によりこの制約が緩和される）
                        </li>
                    </ul>
                </div>
<hr />
<h3 id="第17章-websocket">第17章 WebSocket</h3>
<h4 id="171-websocketプロトコルの概要">17.1 WebSocketプロトコルの概要</h4>
<p>
                    WebSocketは、HTTP接続を<strong>全二重（双方向・同時送受信可能</strong>）な独自プロトコルへ切り替える仕組みです。切り替えの手順はHTTPのバージョンによって異なり、HTTP/1.1では<code>Upgrade</code>ヘッダによるハンドシェイク（101
                    Switching Protocols）を使いますが、HTTP/2では拡張CONNECT（RFC
                    8441）、HTTP/3では同じ拡張CONNECTをQUIC上で用いる方式（RFC
                    9220）で、1本のストリーム上に確立します（第19章の比較表も参照）。一度アップグレードが完了すると、HTTPのリクエスト/レスポンスという構造から離れ、両者が自由なタイミングでフレームを送り合える低オーバーヘッドな通信路になります。
                </p>
<Diagram id="diag-24" label="WebSocket接続確立と双方向メッセージングのシーケンス図" />
<h4 id="172-websocketのバイナリフレーミングとサブプロトコルネゴシエーション">
                    17.2 WebSocketのバイナリフレーミングとサブプロトコルネゴシエーション
                </h4>
<p>
                    WebSocketもHTTP/2と同様に独自のバイナリフレーミング層を持ちます。また、<code>Sec-WebSocket-Protocol</code>ヘッダにより、アプリケーション固有のサブプロトコル（例:
                    <code>chat.v2</code>）をネゴシエーションできます。拡張機能（<code>permessage-deflate</code>など、フレームごとの圧縮）もヘッダベースでネゴシエーション可能です。
                </p>
<h4 id="173-メッセージオーバーヘッドとデータ効率">
                    17.3 メッセージオーバーヘッドとデータ効率
                </h4>
<p>
                    WebSocketフレームのヘッダは最小2バイトから（ペイロード長に応じて最大14バイト程度）と非常に軽量です。しかし、小さなメッセージを高頻度で送信する用途では、このヘッダオーバーヘッドや、TCPベースであることによるHOLブロッキング（第2章参照）が無視できなくなる場合があります。
                </p>
<h4 id="174-websocketインフラのデプロイ上の注意点">
                    17.4 WebSocketインフラのデプロイ上の注意点
                </h4>
<p>
                    WebSocketはHTTPとは異なる接続の持続特性（長時間接続を維持し続ける）を持つため、ロードバランサーやリバースプロキシの設定（タイムアウト値、Upgradeヘッダの転送設定）を専用に調整する必要があります。
                </p>
<div className="callout-practice">
                    <div className="practice-label">ベストプラクティス</div>
                    <ul>
                        <li>
                            双方向・低レイテンシ・高頻度の通信（チャット、マルチプレイヤーゲーム、コラボレーション編集）にはWebSocketを使う
                        </li>
                        <li>
                            カスタムアプリケーションプロトコルは、メッセージの意味論を明確に定義し、必要以上に頻繁な細切れメッセージを避ける（オーバーヘッド削減）
                        </li>
                        <li>
                            ロードバランサー・プロキシのWebSocket対応（Upgradeヘッダの透過、タイムアウト設定）を事前に検証する
                        </li>
                        <li>
                            <code>permessage-deflate</code>拡張の使用可否は、圧縮によるCPUコストとペイロード削減効果を天秤にかけて判断する
                        </li>
                    </ul>
                </div>
<hr />
<h3 id="第18章-webrtc">第18章 WebRTC</h3>
<h4 id="181-webrtcとは何かなぜp2pが必要なのか">
                    18.1 WebRTCとは何か、なぜP2Pが必要なのか
                </h4>
<p>
                    WebRTC（Web Real-Time
                    Communication）は、ブラウザ間で<strong>サーバーを介さない直接（P2P</strong>）の音声・映像・任意データ通信を可能にするAPI群です。サーバーを介した中継はレイテンシ増加とサーバーコスト増大を招くため、ビデオ会議やリアルタイムゲームなど低遅延が求められる用途ではP2Pが本質的に有利です。
                </p>
<h4 id="182-全体像シグナリングとpeerconnectionの確立">
                    18.2 全体像：シグナリングとPeerConnectionの確立
                </h4>
<p>
                    WebRTCの接続確立は大きく2段階に分かれます。まず「シグナリング」（互いのメディア能力・ネットワーク経路情報を交換する、WebRTC自体は規定しない任意のチャネル）、次に「P2P接続の確立」（ICEフレームワークによる経路探索）です。
                </p>
<Diagram id="diag-25" label="WebRTCシグナリングとPeerConnection確立のシーケンス図" />
<h4 id="183-sdpsession-description-protocolとiceinteractive-connectivity-establishment">
                    18.3 SDP（Session Description Protocol）とICE（Interactive Connectivity
                    Establishment）
                </h4>
<div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">要素</th>
                                <th scope="col">役割</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>SDP（セッション記述プロトコル）</td>
                                <td>
                                    対応コーデック、メディアの種類（音声/映像/データ）、暗号化パラメータなどを記述するテキストフォーマット
                                </td>
                            </tr>
                            <tr className="even">
                                <td>ICE Candidate</td>
                                <td>
                                    自分が到達可能な可能性のあるアドレス（ローカルIP、STUNで判明したパブリックIP、TURN中継アドレス）の候補
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>Trickle ICE</td>
                                <td>
                                    すべてのCandidateを集め終えるのを待たず、見つかり次第逐次交換することで接続確立を高速化する仕組み
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
<h4 id="184-メディアデータの伝送dtlssrtpsctp">
                    18.4 メディア・データの伝送：DTLS・SRTP・SCTP
                </h4>
<p>
                    WebRTCの接続が確立すると、実際のデータは複数のサブプロトコルで保護・伝送されます。
                </p>
<Diagram id="diag-26" label="WebRTCプロトコルスタック（DTLS/SRTP/SCTP）構造図" />
<ul>
                    <li>
                        <strong>SRTP/SRTCP</strong>:
                        音声・映像メディアストリームを暗号化して伝送する、RTPプロトコルのセキュア版
                    </li>
                    <li>
                        <strong>SCTP over DTLS（DataChannel）</strong>:
                        メディア以外の任意データをやり取りするための仕組みで、TCPのように順序保証・信頼性のある配送も、UDPのように順序を問わない非信頼配送も選択できる（部分的信頼配送、Partially
                        Reliable Delivery）
                    </li>
                </ul>
<h4 id="185-datachannelの設定順序性と信頼性のトレードオフ">
                    18.5 DataChannelの設定：順序性と信頼性のトレードオフ
                </h4>
<p>WebRTCのDataChannelは、用途に応じて配送特性を細かく設定できる点が特徴です。</p>
<div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">設定</th>
                                <th scope="col">用途例</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>順序保証あり・信頼性あり（TCPライク）</td>
                                <td>ファイル転送、チャットメッセージなど欠落が許されないデータ</td>
                            </tr>
                            <tr className="even">
                                <td>順序保証なし・信頼性あり</td>
                                <td>順序が重要でない通知データ</td>
                            </tr>
                            <tr className="odd">
                                <td>部分的信頼配送（再送回数・タイムアウトを制限）</td>
                                <td>
                                    ゲームの位置情報更新など、古いデータより新しいデータの到達を優先したい用途
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
<h4 id="186-マルチパーティアーキテクチャとインフラ計画">
                    18.6 マルチパーティアーキテクチャとインフラ計画
                </h4>
<p>
                    3人以上が参加するビデオ会議では、全員がP2Pでフルメッシュ接続すると参加者数の2乗に比例して帯域幅・CPU負荷が増大するため、実運用では<strong>SFU（Selective Forwarding Unit</strong>）と呼ばれる中継サーバーを介したアーキテクチャが一般的です。SFUは各参加者のストリームを受信し、必要な相手にのみ転送することで、送信側の負荷を一定に保ちます。
                </p>
<div className="callout-practice">
                    <div className="practice-label">ベストプラクティス</div>
                    <ul>
                        <li>
                            1対1通信ならP2Pメッシュ、3人以上ならSFUベースのアーキテクチャを検討し、参加者数に応じたインフラ計画を立てる
                        </li>
                        <li>
                            STUN単独で接続できない環境（対称型NAT、企業ファイアウォール）に備え、TURNサーバーを必ず用意する
                        </li>
                        <li>
                            DataChannelは用途に応じて順序性・信頼性の設定を最適化し、不要な信頼性保証によるレイテンシ増加を避ける
                        </li>
                        <li>
                            Trickle
                            ICEを活用し、Candidate収集完了を待たずに接続確立プロセスを開始することで接続確立時間を短縮する
                        </li>
                    </ul>
                </div>
<hr />
            </main>
        </div>
    );
}
