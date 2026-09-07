'use client';

import { memo, useState } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { NavBar } from './NavBar';
import { DIAGRAM_LABELS, DIAGRAMS, type DiagramId } from './constants';

const Diagram = memo(function Diagram({ id }: { id: DiagramId }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap">
            <MermaidDiagram chart={chart} ariaLabel={DIAGRAM_LABELS[id]} preserveNaturalScale />
        </div>
    );
});

/**
 * コンピュータネットワーク入門ガイド メインコンポーネント
 */
export function ComputerNetworkingTopdownGuide() {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
    const handleCheck = (id: string) => {
        setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
    };
    const completedCount = Object.values(checkedItems).filter(Boolean).length;

    return (
        <div className="cntd-page">
            <div className="layout">
                <NavBar />
                <main className="main">

                <div className="hero">
                    <div className="kicker">A Top-Down Approach &middot; 初学者向け解説ガイド</div>
                    <h1>
                        コンピュータネットワーク入門ガイド ―
                        トップダウンアプローチで学ぶインターネットの仕組み
                    </h1>
                    <div className="meta-row">
                        <span className="pill">対象 <strong>初学者</strong></span>
                        <span className="pill">構成 <strong>全10部</strong></span>
                        <span className="pill">図解 <strong>Mermaid 41点</strong></span>
                        <span className="pill">参考文献 <strong>31件</strong></span>
                    </div>
                </div>

                <p>
                    本ガイドは、James F. Kurose・Keith W. Ross両氏による著名な教科書『Computer
                    Networking: A Top-Down Approach』(Pearson社刊、第8版)が採用している{' '}<strong>「アプリケーション層から物理層へ降りていくトップダウンアプローチ」</strong>{' '}という学習順序・構成方針を参考にしつつ、その原則・概念を初学者向けに独自の説明・図解・具体例で再構成した解説ガイドです。書籍本文の引用・転載は一切行っておらず、目次構成は著者の公式サイト(gaia.cs.umass.edu/kurose_ross)およびPearson社公式カタログページで確認した情報に基づいています。内容には2026年8月30日時点の最新動向(HTTP/3・IPv6・BGPセキュリティ・耐量子暗号など)を独自にWeb調査のうえ追加しています。
                </p>

                <h2 id="本ガイドについて" tabIndex={-1}>本ガイドについて</h2>

                <p>
                    <strong>対象読者</strong>:
                    プログラミング経験はあるが、ネットワークの仕組みを体系的に学んだことがない初学者(ソフトウェアエンジニア、QAエンジニア、インフラエンジニアを目指す方など)
                </p>

                <p><strong>学び方の特徴 ― なぜ「トップダウン」なのか</strong></p>

                <p>
                    多くのネットワーク入門書は、物理層(電気信号やケーブル)から始めてアプリケーション層へと「積み上げていく」ボトムアップ方式を取ります。しかし、私たちが日常的に触れているのは常に{' '}<strong>アプリケーション</strong>(Webブラウザ、チャットアプリ、動画配信)です。トップダウンアプローチは、身近な「アプリケーションがなぜ動くのか」という疑問から出発し、その裏側にある層を一段ずつ掘り下げていくことで、モチベーションを維持しながら深い理解に到達できるという教育的な狙いを持っています。
                </p>

                <Diagram id="diag-1" />

                <p><strong>このガイドの構成(全10部)</strong></p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">部</th>
                                <th scope="col">タイトル</th>
                                <th scope="col">対応する章(原書)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>第0部</td>
                                <td>なぜ「トップダウンアプローチ」なのか</td>
                                <td>Preface / Ch.1 導入</td>
                            </tr>
                            <tr className="even">
                                <td>第1部</td>
                                <td>コンピュータネットワークとインターネットの基礎</td>
                                <td>Chapter 1</td>
                            </tr>
                            <tr className="odd">
                                <td>第2部</td>
                                <td>アプリケーション層</td>
                                <td>Chapter 2</td>
                            </tr>
                            <tr className="even">
                                <td>第3部</td>
                                <td>トランスポート層</td>
                                <td>Chapter 3</td>
                            </tr>
                            <tr className="odd">
                                <td>第4部</td>
                                <td>ネットワーク層:データプレーン</td>
                                <td>Chapter 4</td>
                            </tr>
                            <tr className="even">
                                <td>第5部</td>
                                <td>ネットワーク層:コントロールプレーン</td>
                                <td>Chapter 5</td>
                            </tr>
                            <tr className="odd">
                                <td>第6部</td>
                                <td>リンク層とLAN</td>
                                <td>Chapter 6</td>
                            </tr>
                            <tr className="even">
                                <td>第7部</td>
                                <td>無線とモバイルネットワーク</td>
                                <td>Chapter 7</td>
                            </tr>
                            <tr className="odd">
                                <td>第8部</td>
                                <td>コンピュータネットワークにおけるセキュリティ</td>
                                <td>Chapter 8</td>
                            </tr>
                            <tr className="even">
                                <td>第9部</td>
                                <td>2026年8月時点の最新動向(独自追加)</td>
                                <td>―</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p>
                    補足として、学習ロードマップ・理解度チェックリスト・用語集・参考文献を末尾に収録しています。
                </p>

                <hr />

                <h2 id="第0部-なぜトップダウンアプローチなのか" tabIndex={-1}>
                    第0部: なぜ「トップダウンアプローチ」なのか
                </h2>

                <h3 id="インターネットの規模感2026年8月時点" tabIndex={-1}>
                    インターネットの規模感(2026年8月時点)
                </h3>

                <p>
                    具体的な数字から始めましょう。2026年、インターネットは以下のような規模で稼働しています。
                </p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">指標</th>
                                <th scope="col">数値</th>
                                <th scope="col">出典年月</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>Google経由のIPv6アクセス率(世界平均)</td>
                                <td>約50% (2026/3/28に初めて50%超え)</td>
                                <td>2026年4月</td>
                            </tr>
                            <tr className="even">
                                <td>APNIC計測によるIPv6対応ユーザー比率(IPv6 capability)</td>
                                <td>約42〜43%</td>
                                <td>2026年4月</td>
                            </tr>
                            <tr className="odd">
                                <td>HTTP/3の利用比率</td>
                                <td>
                                    Cloudflare網が観測するHTTP(S)リクエストに占める割合としてCloudflare
                                    Radarが継続公開(最新値はRadarで確認)
                                </td>
                                <td>継続計測</td>
                            </tr>
                            <tr className="even">
                                <td>RPKI(経路正当性検証)でカバーされる経路の割合</td>
                                <td>約67%</td>
                                <td><a href="#ref18">参考文献18</a>(日次変動するため要再確認)</td>
                            </tr>
                            <tr className="odd">
                                <td>Cloudflareが2025年に緩和したDDoS攻撃件数</td>
                                <td>4,710万件(前年比121%増)</td>
                                <td>2026年3月(<a href="#ref29">参考文献29</a>)</td>
                            </tr>
                            <tr className="even">
                                <td>観測史上最大のDDoS攻撃規模(帯域)</td>
                                <td>31.4 Tbps・約35秒間(Aisuru-Kimwolfボットネット)</td>
                                <td>
                                    2025年11月(Cloudflare 2025 Q4レポートで公表。<a href="#ref29"
                                        >参考文献29</a>)
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>観測史上最大のDDoS攻撃規模(パケットレート)</td>
                                <td>
                                    14.1 Bpps(Aisuruボットネット。29.7 Tbpsの帯域記録とは別個の攻撃)
                                </td>
                                <td>Cloudflare 2025 Q3レポート(<a href="#ref28">参考文献28</a>)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p>
                    これらの数字が示すのは、インターネットが「決まった仕様に従う静的なシステム」ではなく、<strong>日々進化し続ける巨大な分散システム</strong>だということです。だからこそ、個別の技術の暗記ではなく、「なぜこの層が必要なのか」「どんな問題を解決するために設計されたのか」という原理原則を学ぶことが重要になります。
                </p>

                <h3 id="インターネットを2つの視点で捉える" tabIndex={-1}>インターネットを2つの視点で捉える</h3>

                <Diagram id="diag-2" />

                <p>
                    インターネットは、<strong>エンドシステム(ホスト)</strong>・<strong>アクセスネットワーク</strong>・<strong>通信リンク</strong>・<strong>パケット交換機</strong>という物理的な構成要素の集合体であると同時に、アプリケーション開発者に対して<strong>通信サービスを提供するプラットフォーム</strong>でもあります。この二重の見方を持つことが、ネットワークを学ぶ最初の一歩です。
                </p>

                <hr />

                <h2 id="第1部-コンピュータネットワークとインターネットの基礎" tabIndex={-1}>
                    第1部: コンピュータネットワークとインターネットの基礎
                </h2>

                <h3 id="11-ネットワークのエッジとコア" tabIndex={-1}>1.1 ネットワークの「エッジ」と「コア」</h3>

                <p>
                    インターネットの構造は、大きく<strong>エッジ(端)</strong>と<strong>コア(中心部)</strong>に分けて理解すると見通しが良くなります。
                </p>

                <Diagram id="diag-3" />

                <ul>
                    <li>
                        <strong>エッジ</strong>:
                        私たちが直接触れるホスト(PC、スマホ、サーバ)。アプリケーションが動く場所。
                    </li>
                    <li>
                        <strong>アクセスネットワーク</strong>:
                        エッジをネットワークのコアに接続する「最初の1ホップ」。光ファイバー、ケーブル、モバイル、Wi-Fiなど。
                    </li>
                    <li>
                        <strong>コア</strong>:
                        相互接続されたルータの網。パケットを転送する役割に徹する。
                    </li>
                </ul>

                <h3 id="12-パケット交換-vs-回線交換" tabIndex={-1}>1.2 パケット交換 vs 回線交換</h3>

                <p>
                    ネットワークコアがデータを転送する方式には、歴史的に2つのアプローチがあります。
                </p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">比較項目</th>
                                <th scope="col">回線交換(Circuit Switching)</th>
                                <th scope="col">パケット交換(Packet Switching)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>帯域の確保方法</td>
                                <td>通信開始時に専用の帯域を事前予約</td>
                                <td>予約なし。必要なときにリンクを共有</td>
                            </tr>
                            <tr className="even">
                                <td>代表例</td>
                                <td>従来の電話網</td>
                                <td>インターネット全体</td>
                            </tr>
                            <tr className="odd">
                                <td>利点</td>
                                <td>通信品質が保証される(遅延が一定)</td>
                                <td>リンクをより効率的に共有できる</td>
                            </tr>
                            <tr className="even">
                                <td>欠点</td>
                                <td>アイドル時間中も帯域が無駄になる</td>
                                <td>混雑時に遅延・パケット損失が発生しうる</td>
                            </tr>
                            <tr className="odd">
                                <td>多重化の方式</td>
                                <td>FDM(周波数分割)/TDM(時分割)</td>
                                <td>統計的多重化(Statistical Multiplexing)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Diagram id="diag-4" />

                <p>
                    インターネットがパケット交換を採用した理由は、テキストデータ・動画・音声のようにトラフィックが「バースト的」な性質を持つアプリケーションに対して、統計的多重化のほうが資源を効率よく使えるためです。ただしその代償として、<strong>遅延やパケット損失が保証されない</strong>という性質を受け入れる必要があります。
                </p>

                <h3 id="13-プロトコル階層とカプセル化" tabIndex={-1}>1.3 プロトコル階層とカプセル化</h3>

                <p>
                    ネットワーク機能を独立した層に分割する「レイヤードアーキテクチャ」は、複雑なシステムを管理可能にするための設計原則です。インターネットでは慣習的に5層モデルが使われます。
                </p>

                <Diagram id="diag-5" />

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">層</th>
                                <th scope="col">役割</th>
                                <th scope="col">データ単位</th>
                                <th scope="col">処理する機器の例</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>アプリケーション層</td>
                                <td>
                                    ネットワークアプリケーションのためのプロトコル(HTTP、DNS、SMTP)
                                </td>
                                <td>メッセージ</td>
                                <td>ホストのみ</td>
                            </tr>
                            <tr className="even">
                                <td>トランスポート層</td>
                                <td>プロセス間の論理的な通信(TCP/UDP)</td>
                                <td>TCPセグメント / UDPデータグラム</td>
                                <td>ホストのみ</td>
                            </tr>
                            <tr className="odd">
                                <td>ネットワーク層</td>
                                <td>送信元から宛先へのデータグラム経路制御</td>
                                <td>データグラム</td>
                                <td>ホスト・ルータ</td>
                            </tr>
                            <tr className="even">
                                <td>リンク層</td>
                                <td>隣接ノード間でのフレーム転送</td>
                                <td>フレーム</td>
                                <td>ホスト・ルータ・スイッチ</td>
                            </tr>
                            <tr className="odd">
                                <td>物理層</td>
                                <td>フレーム内の個々のビットの伝送</td>
                                <td>ビット</td>
                                <td>ホスト・ルータ・スイッチ</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p>
                    <strong>補足: OSI参照モデルとの違い</strong>{' '}大学の教科書や資格試験ではしばしば7層のOSI参照モデルが登場しますが、実際のインターネットは5層(または、セッション層とプレゼンテーション層を省いた4層とする流儀もある)モデルで説明されるのが一般的です。OSIのセッション層・プレゼンテーション層に相当する機能は、実務上はアプリケーション自身が必要に応じて実装しています。
                </p>

                <p>
                    <strong>カプセル化(Encapsulation)</strong>{' '}とは、上位層のデータに下位層がヘッダ情報を付加していく仕組みです。
                </p>

                <Diagram id="diag-6" />

                <p>
                    パケットがルータを通過するとき、基本的な転送判断に使われるのはリンク層とネットワーク層のヘッダだけで、トランスポート層より上のペイロードには触れません。この「関心の分離」こそが、レイヤードアーキテクチャの本質的な利点です。ただしこれはあくまで基本転送の話であり、ACLやファイアウォール機能を持つルータはパケットフィルタリングのためにIPプロトコル番号やTCP/UDPの送信元・宛先ポート番号といったL4ヘッダまで参照します。
                </p>

                <h3 id="14-遅延損失スループットの4要素" tabIndex={-1}>1.4 遅延・損失・スループットの4要素</h3>

                <p>パケットがルータを通過する際に発生する遅延は、4つの成分に分解できます。</p>

                <Diagram id="diag-7" />

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">遅延の種類</th>
                                <th scope="col">決まる要因</th>
                                <th scope="col">変動しやすさ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>処理遅延</td>
                                <td>ルータの処理性能</td>
                                <td>通常マイクロ秒オーダーで小さい</td>
                            </tr>
                            <tr className="even">
                                <td>キューイング遅延</td>
                                <td>トラフィック量・輻輳状況</td>
                                <td>大きく変動する(輻輳時に支配的)</td>
                            </tr>
                            <tr className="odd">
                                <td>伝送遅延</td>
                                <td>パケット長とリンクの帯域幅</td>
                                <td>リンクごとに固定</td>
                            </tr>
                            <tr className="even">
                                <td>伝搬遅延</td>
                                <td>物理的な距離と伝搬速度(光ファイバーで約2×10^8 m/s)</td>
                                <td>距離が決まれば固定</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p>
                    キューイング遅延は特に重要です。トラフィック強度(到着率×パケット長 ÷
                    リンク帯域)が1に近づくにつれ、キューイング遅延は急激に増大します。これは輻輳制御(第3部で詳しく扱います)が必要になる根本的な理由です。
                </p>

                <p>
                    <strong>スループット</strong>は「単位時間あたりに転送できるビット数」であり、送信元から宛先までの経路上で<strong>最も帯域の狭いリンク(ボトルネックリンク)</strong>によって上限が決まります。
                </p>

                <hr />

                <h2 id="第2部-アプリケーション層" tabIndex={-1}>第2部: アプリケーション層</h2>

                <h3 id="21-ネットワークアプリケーションのアーキテクチャ" tabIndex={-1}>
                    2.1 ネットワークアプリケーションのアーキテクチャ
                </h3>

                <Diagram id="diag-8" />

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">方式</th>
                                <th scope="col">特徴</th>
                                <th scope="col">代表例</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>クライアント・サーバ</td>
                                <td>
                                    サーバが常時稼働し固定IPを持つ。クライアント同士は直接通信しない
                                </td>
                                <td>Web、メール、多くのSaaS</td>
                            </tr>
                            <tr className="even">
                                <td>P2P</td>
                                <td>
                                    常時稼働のサーバに依存せず、ピア同士が直接データをやり取りする
                                </td>
                                <td>ファイル共有、一部のビデオ会議基盤</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p>
                    アプリケーション同士の通信は、OSではなく<strong>プロセス</strong>間で行われます。プロセスは<strong>ソケット</strong>というAPIを通じてトランスポート層にメッセージを渡します。ソケットは「アプリケーション層とトランスポート層の間のドア」に例えられます。プロセスを特定するには、<strong>トランスポートプロトコル + IPアドレス + ポート番号</strong>の組が使われます(例:{' '}<code>443/tcp</code>{' '}はTCP上のHTTPS)。さらにTCPでは、個々の接続は<strong>送信元IPアドレス・送信元ポート番号・宛先IPアドレス・宛先ポート番号の4タプル</strong>で識別されるため、同じ宛先ポートに向かう多数の接続を1台のサーバが同時に区別できます。
                </p>

                <h3 id="22-webとプロトコルの進化-http11--http2--http3" tabIndex={-1}>
                    2.2 Webとプロトコルの進化: HTTP/1.1 → HTTP/2 → HTTP/3
                </h3>

                <Diagram id="diag-9" />

                <p>
                    HTTP/2はTCP上で複数のリクエストを1本の接続に多重化することでHTTP/1.1のHead-of-Line
                    Blocking(先頭パケット詰まり)を解消しましたが、<strong>TCP自体が「順序を保証するバイトストリーム」であるため、1つのパケットが失われると、それに関係しない他のストリームまで待たされてしまう</strong>という問題(トランスポート層でのHOLブロッキング)が残っていました。HTTP/3はTCPを捨て、UDPベースの新しいトランスポートプロトコルであるQUIC(RFC
                    9000)を採用することでこれを解決しています。
                </p>

                <p>
                    <strong>普及状況の確認方法</strong>: HTTP/3の利用比率は、Cloudflare
                    Radar(Cloudflare網が観測するHTTP(S)リクエストを分母とする計測)で継続的に公開されています。特定時点の比率や高速化の効果は、計測対象・分母・比較条件(対HTTP/2か対HTTP/1.1か、回線条件はどうか)によって大きく変わるため、数値を引用する際は必ず一次ソース側の定義とあわせて確認してください。
                </p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">プロトコル</th>
                                <th scope="col">トランスポート</th>
                                <th scope="col">主な利点</th>
                                <th scope="col">主な欠点/制約</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>HTTP/1.1</td>
                                <td>TCP</td>
                                <td>単純で理解しやすい</td>
                                <td>
                                    持続接続でも1本の接続上でリクエストが順番に処理され、先行応答が遅れると後続が待たされるアプリケーション層のHOLブロッキングが起きる
                                </td>
                            </tr>
                            <tr className="even">
                                <td>HTTP/2</td>
                                <td>TCP</td>
                                <td>ストリーム多重化、ヘッダ圧縮(HPACK)</td>
                                <td>TCPレベルのHOLブロッキングが残る</td>
                            </tr>
                            <tr className="odd">
                                <td>HTTP/3</td>
                                <td>QUIC(UDP)</td>
                                <td>
                                    トランスポート層までHOLブロッキング解消、0-RTT再接続、コネクションマイグレーション
                                </td>
                                <td>UDPをブロックするファイアウォール環境での互換性課題</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 id="23-dns-インターネットのディレクトリサービス" tabIndex={-1}>
                    2.3 DNS: インターネットのディレクトリサービス
                </h3>

                <p>
                    DNS(Domain Name System)は、人間が読める名前(例:{' '}<code>www.example.com</code>)をIPアドレスに変換する分散データベースです。単一のサーバに問い合わせるのではなく、<strong>階層構造</strong>を持つ多数のサーバが協調して動作します。
                </p>

                <Diagram id="diag-10" />

                <p>DNSは名前解決だけでなく、以下のような役割も担っています。</p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">DNSレコードタイプ</th>
                                <th scope="col">用途</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>A / AAAA</td>
                                <td>ホスト名とIPv4/IPv6アドレスの対応</td>
                            </tr>
                            <tr className="even">
                                <td>CNAME</td>
                                <td>別名(エイリアス)の定義</td>
                            </tr>
                            <tr className="odd">
                                <td>MX</td>
                                <td>メールサーバの指定</td>
                            </tr>
                            <tr className="even">
                                <td>NS</td>
                                <td>ドメインの権威DNSサーバの指定</td>
                            </tr>
                            <tr className="odd">
                                <td>TXT</td>
                                <td>SPF/DKIM等の検証情報やドメイン所有証明</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p>
                    <strong>DNSの安全性・プライバシーに関する2026年時点の動向</strong>:従来のDNSは平文でやり取りされ、経路上の第三者に盗聴・改ざんされるリスクがありました。標準のトランスポートは通常UDP/53ですが、512バイトを超える大きな応答(EDNS0で拡張しない場合の切り詰め時)やゾーン転送(AXFR/IXFR)ではTCP/53も使用されます。いずれも平文である点は変わりません。これに対応するため、以下の暗号化DNSプロトコルの普及が進んでいます。
                </p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">プロトコル</th>
                                <th scope="col">トランスポート</th>
                                <th scope="col">特徴</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>DoT (DNS over TLS)</td>
                                <td>TLS/853番ポート</td>
                                <td>OSレベルで全アプリのDNSを一括暗号化しやすい</td>
                            </tr>
                            <tr className="even">
                                <td>DoH (DNS over HTTPS)</td>
                                <td>HTTPS/443番ポート</td>
                                <td>
                                    通常のWeb通信に紛れるためブロックされにくい。Firefoxは米国ユーザーに対してDoHをデフォルトで有効化している
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>DoQ (DNS over QUIC)</td>
                                <td>QUIC/853番ポート</td>
                                <td>
                                    モバイル網での接続切り替えに強く、モバイルOSでの採用が進行中
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p>
                    <strong>補足: TLS拡張によるSNIの秘匿(ECH)</strong>:ECH(Encrypted Client
                    Hello)はDNSプロトコルではなく、TLS 1.3の拡張(RFC
                    9849)です。TLSハンドシェイクの冒頭で平文送信されるClientHello、とりわけ接続先ホスト名を示すSNIを暗号化し、経路上の観測者からアクセス先ドメインを隠します。暗号化DNSで名前解決を秘匿しても、続くTLS接続でSNIが平文のままなら接続先は露見するため、ECHは暗号化DNSを補完する別レイヤの仕組みとして理解してください。
                </p>

                <h3 id="24-電子メールとソケットプログラミングの基礎" tabIndex={-1}>
                    2.4 電子メールとソケットプログラミングの基礎
                </h3>

                <p>電子メールは歴史的に3つのプロトコルの組み合わせで成り立っています。</p>

                <Diagram id="diag-11" />

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">プロトコル</th>
                                <th scope="col">役割</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>SMTP (Simple Mail Transfer Protocol)</td>
                                <td>
                                    メールサーバ間・クライアントからサーバへのメール<strong>送信</strong>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>POP3 (Post Office Protocol)</td>
                                <td>
                                    クライアントがサーバから受信メールを<strong>取得</strong>(ダウンロード後は基本削除)
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>IMAP (Internet Message Access Protocol)</td>
                                <td>
                                    サーバ上でメールを管理したまま<strong>同期的に</strong>アクセス(複数端末での利用に向く)
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p>
                    アプリケーション開発の観点では、これらのプロトコルはすべて「ソケットAPI」を通じてトランスポート層のサービス(TCP/UDP)を利用しています。ソケットプログラミングを理解することは、任意のカスタムプロトコルを設計・実装する第一歩です。
                </p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">ソケットの種類</th>
                                <th scope="col">使用するトランスポートプロトコル</th>
                                <th scope="col">適した用途</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>ストリームソケット</td>
                                <td>TCP</td>
                                <td>信頼性が必要な通信(Web、メール、ファイル転送)</td>
                            </tr>
                            <tr className="even">
                                <td>データグラムソケット</td>
                                <td>UDP</td>
                                <td>
                                    低遅延・リアルタイム性が重要な通信(DNS問い合わせ、動画配信の一部、オンラインゲーム)
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <hr />

                <h2 id="第3部-トランスポート層" tabIndex={-1}>第3部: トランスポート層</h2>

                <h3 id="31-udpとtcp-2つの対照的な選択肢" tabIndex={-1}>3.1 UDPとTCP: 2つの対照的な選択肢</h3>

                <p>
                    トランスポート層の最も重要な役割は、ネットワーク層が提供する「ホスト間通信」を「プロセス間通信」へと拡張することです。インターネットではSCTPやDCCP、QUIC(UDP上に構築される)など複数のトランスポートプロトコルが使われていますが、本ガイドではまず代表的な2つ、性格の対照的なTCPとUDPを比較します。
                </p>

                <Diagram id="diag-12" />

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">比較項目</th>
                                <th scope="col">UDP</th>
                                <th scope="col">TCP</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>コネクション</td>
                                <td>なし</td>
                                <td>あり(3ウェイハンドシェイク)</td>
                            </tr>
                            <tr className="even">
                                <td>信頼性</td>
                                <td>保証しない</td>
                                <td>保証する(再送・順序制御)</td>
                            </tr>
                            <tr className="odd">
                                <td>輻輳制御</td>
                                <td>なし</td>
                                <td>あり</td>
                            </tr>
                            <tr className="even">
                                <td>ヘッダサイズ</td>
                                <td>8バイト</td>
                                <td>20バイト以上</td>
                            </tr>
                            <tr className="odd">
                                <td>適した用途</td>
                                <td>DNS、動画配信の一部、リアルタイム通信、QUICの基盤</td>
                                <td>Web、メール、ファイル転送</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 id="32-tcpコネクションの確立-3ウェイハンドシェイク" tabIndex={-1}>
                    3.2 TCPコネクションの確立: 3ウェイハンドシェイク
                </h3>

                <Diagram id="diag-13" />

                <p>
                    3ウェイハンドシェイクによって、両者は「相手が確かに存在し、送受信能力があること」と「初期シーケンス番号」を確認し合います。これにより、後続のデータ転送で正確な順序制御・再送制御が可能になります。
                </p>

                <h3 id="33-信頼性のあるデータ転送の原理" tabIndex={-1}>3.3 信頼性のあるデータ転送の原理</h3>

                <p>
                    信頼性のない下位層(ネットワーク層)の上に、信頼性のあるサービスを構築するには、以下のような仕組みの組み合わせが必要です。
                </p>

                <Diagram id="diag-14" />

                <p>
                    TCPはこれらすべてを組み合わせ、さらに<strong>パイプライン化</strong>(確認を待たずに複数セグメントを送信し続ける)によってスループットを最大化しています。
                </p>

                <h3 id="34-フロー制御と輻輳制御の違い" tabIndex={-1}>3.4 フロー制御と輻輳制御の違い</h3>

                <p>初学者が混同しやすい2つの概念を区別しましょう。</p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">項目</th>
                                <th scope="col">フロー制御(Flow Control)</th>
                                <th scope="col">輻輳制御(Congestion Control)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>目的</td>
                                <td>受信側のバッファ溢れを防ぐ</td>
                                <td>ネットワーク内部の混雑を防ぐ</td>
                            </tr>
                            <tr className="even">
                                <td>誰の都合か</td>
                                <td><strong>受信側</strong>の処理能力に合わせる</td>
                                <td><strong>ネットワーク経路全体</strong>の余力に合わせる</td>
                            </tr>
                            <tr className="odd">
                                <td>制御に使う情報</td>
                                <td>受信ウィンドウサイズ(受信側が通知)</td>
                                <td>
                                    パケット損失・遅延・ECNマーキングなどのネットワークからの信号
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 id="35-輻輳制御アルゴリズムの進化" tabIndex={-1}>3.5 輻輳制御アルゴリズムの進化</h3>

                <Diagram id="diag-15" />

                <p>
                    <strong>損失ベース(Loss-based)輻輳制御の限界</strong>:
                    CUBICのような従来型アルゴリズムは「パケット損失=輻輳のシグナル」とみなしますが、高速・長距離のネットワークや無線網では、輻輳とは無関係な理由でパケットが失われることが増えており、この前提が崩れつつあります。
                </p>

                <p>
                    <strong>モデルベース輻輳制御の登場</strong>:
                    Googleが2016年に発表したBBR(Bottleneck Bandwidth and Round-trip propagation
                    time)は、実際のボトルネック帯域と最小RTTを継続的に推定し、そのモデルに基づいて送信レートを調整するアプローチを取ります。BBRv3は2026年時点でもLinuxカーネル本流(mainline)への統合は検討中の段階にとどまりますが、Google自身の実運用データでは旧バージョン比で再送率が12%減少したことが報告されています(2023年7月25日のIETF
                    117 CCWG発表資料「BBRv3: Algorithm Bug Fixes and Public Internet
                    Deployment」。<a href="#ref9">参考文献9</a>)。
                </p>

                <h3 id="36-quic-トランスポート層とセキュリティ層の融合" tabIndex={-1}>
                    3.6 QUIC: トランスポート層とセキュリティ層の融合
                </h3>

                <p>
                    QUICはUDPの上に構築された新しいトランスポートプロトコルであり、従来「TCP +
                    TLS」に分かれていた機能を統合しています。
                </p>

                <Diagram id="diag-16" />

                <p>QUICの主要な設計上の利点:</p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">機能</th>
                                <th scope="col">説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>ストリームレベルの独立性</td>
                                <td>
                                    1つのストリームでのパケット損失が他のストリームをブロックしない
                                </td>
                            </tr>
                            <tr className="even">
                                <td>1-RTT/0-RTTハンドシェイク</td>
                                <td>
                                    TLS
                                    1.3の暗号ハンドシェイクをコネクション確立と統合し、再接続時は0-RTTも可能
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>コネクションマイグレーション</td>
                                <td>
                                    Wi-Fiからモバイル網への切り替えなど、IPアドレスが変わってもコネクションを維持
                                </td>
                            </tr>
                            <tr className="even">
                                <td>アンプ攻撃対策</td>
                                <td>
                                    サーバはクライアントのアドレス検証が完了するまで、そのクライアントから受信したバイト数の3倍を超えて送信してはならないと規定(RFC
                                    9000)
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <hr />

                <h2 id="第4部-ネットワーク層データプレーン" tabIndex={-1}>
                    第4部: ネットワーク層:データプレーン
                </h2>

                <p>
                    ネットワーク層は「データプレーン」と「コントロールプレーン」という2つの機能に分けて理解すると、SDN(Software-Defined
                    Networking)などの現代的な設計思想も含めて整理しやすくなります。
                </p>

                <Diagram id="diag-17" />

                <h3 id="41-ルータの内部構造" tabIndex={-1}>4.1 ルータの内部構造</h3>

                <Diagram id="diag-18" />

                <p>
                    各入力ポートは、宛先IPアドレスに対して<strong>最長プレフィックスマッチ(Longest Prefix Match)</strong>を行い、転送テーブルから出力ポートを決定します。出力ポートでのキューイングは、第1部で説明したキューイング遅延の主要な発生源です。
                </p>

                <h3 id="42-ipv4とipv6" tabIndex={-1}>4.2 IPv4とIPv6</h3>

                <Diagram id="diag-19" />

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">項目</th>
                                <th scope="col">IPv4</th>
                                <th scope="col">IPv6</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>アドレス長</td>
                                <td>32ビット</td>
                                <td>128ビット</td>
                            </tr>
                            <tr className="even">
                                <td>アドレス表記例</td>
                                <td><code>192.0.2.1</code></td>
                                <td><code>2001:db8::1</code></td>
                            </tr>
                            <tr className="odd">
                                <td>ヘッダのオプション</td>
                                <td>可変長オプションフィールドあり</td>
                                <td>拡張ヘッダとして分離、基本ヘッダは固定長で高速処理向き</td>
                            </tr>
                            <tr className="even">
                                <td>フラグメンテーション</td>
                                <td>ルータ上で実施可能</td>
                                <td>送信元ホストのみが実施(ルータは行わない)</td>
                            </tr>
                            <tr className="odd">
                                <td>NATとの関係</td>
                                <td>アドレス不足を補うため広くNATが使われる</td>
                                <td>アドレス空間が十分でありEnd-to-Endの直接接続が原則可能</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p>
                    <strong>2026年8月時点のIPv6普及状況</strong>:
                    Google計測ではユーザーの世界平均IPv6アクセス率が2026年3月28日に初めて50%を突破しました(50.10%)。ただし国ごとの差は大きく、フランス(73%)・インド(72%)・サウジアラビア(65%)のように先行する国がある一方、スペイン(10%)・エジプト(4%)のように普及が遅れている地域もあります。APNIC
                    Labsの計測ではやや異なる方法論により約42〜43%という数値が示されており、複数の計測ソースを比較する視点が重要です。
                </p>

                <h3 id="43-natnetwork-address-translation" tabIndex={-1}>4.3 NAT(Network Address Translation)</h3>

                <p>IPv4アドレス枯渇への現実的な対処として広く使われているのがNATです。</p>

                <Diagram id="diag-20" />

                <p>
                    NATは複数の家庭内デバイスを1つのグローバルIPアドレスで外部と通信させることを可能にし、IPv4アドレス枯渇の実質的な緩和策として機能してきました。ただし、外部から内部ホストへの直接接続が困難になる(P2P通信やサーバ公開の妨げになる)という副作用もあり、これがIPv6移行が求められる技術的理由の一つです。
                </p>

                <h3 id="44-汎用転送とsdnのデータプレーン" tabIndex={-1}>4.4 汎用転送とSDNのデータプレーン</h3>

                <p>
                    従来のルータは主に宛先IPアドレスに基づいて転送を決定し(ACLによるフィルタリングなどは補助的な機能に留まっていました)、SDN(Software-Defined
                    Networking)の考え方では、より汎用的な「マッチ+アクション」ルールに基づいてパケットを処理します(OpenFlowプロトコルなどが代表例)。
                </p>

                <Diagram id="diag-21" />

                <p>
                    この汎用性により、ロードバランシング・ファイアウォール・トラフィックエンジニアリングといった多様な機能を、専用ハードウェアではなくソフトウェア制御によって柔軟に実現できるようになります。
                </p>

                <hr />

                <h2 id="第5部-ネットワーク層コントロールプレーン" tabIndex={-1}>
                    第5部: ネットワーク層:コントロールプレーン
                </h2>

                <h3 id="51-ルーティングアルゴリズムの2大分類" tabIndex={-1}>
                    5.1 ルーティングアルゴリズムの2大分類
                </h3>

                <Diagram id="diag-22" />

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">比較項目</th>
                                <th scope="col">リンクステート型</th>
                                <th scope="col">距離ベクトル型</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>情報共有範囲</td>
                                <td>同一エリア内の全ルータへフラッディング</td>
                                <td>隣接ルータのみと交換</td>
                            </tr>
                            <tr className="even">
                                <td>収束速度</td>
                                <td>比較的速い</td>
                                <td>遅くなりがち(カウント・トゥ・インフィニティ問題)</td>
                            </tr>
                            <tr className="odd">
                                <td>計算量</td>
                                <td>各ノードでO(n²)程度のダイクストラ計算</td>
                                <td>反復計算だが1ノードあたりの負荷は軽い</td>
                            </tr>
                            <tr className="even">
                                <td>代表プロトコル</td>
                                <td>OSPF、IS-IS</td>
                                <td>RIP(現在はほぼ使われず教育目的が中心)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p>
                    これらは主に<strong>単一の管理主体内(AS内)</strong>で使われる<strong>内部ゲートウェイプロトコル(IGP)</strong>です。
                </p>

                <h3 id="52-自律システム間のルーティング-bgp" tabIndex={-1}>
                    5.2 自律システム間のルーティング: BGP
                </h3>

                <p>
                    インターネットは、単一の管理者が存在しない<strong>自律システム(AS: Autonomous System)</strong>の集合体です。AS間の経路制御を担うのがBGP(Border Gateway Protocol)です。
                </p>

                <Diagram id="diag-23" />

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">BGPの種類</th>
                                <th scope="col">説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>eBGP (External BGP)</td>
                                <td>異なるAS間でのルート広告</td>
                            </tr>
                            <tr className="even">
                                <td>iBGP (Internal BGP)</td>
                                <td>同一AS内のBGPルータ間でのルート伝播</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p>
                    BGPはリンクステート型でも純粋な距離ベクトル型でもなく、<strong>パスベクトル型</strong>と呼ばれる方式を採用しています。各ルート広告には経由したASの一覧(ASパス)が含まれ、ループ検出やポリシーベースの経路選択(コスト最小化ではなく、ビジネス上の契約関係に基づく選択)を可能にしています。
                </p>

                <h3 id="53-bgpのセキュリティ-rpkiとルート原点検証rov" tabIndex={-1}>
                    5.3 BGPのセキュリティ: RPKIとルート原点検証(ROV)
                </h3>

                <p>
                    BGPは1980年代に設計された当初、経路情報の真正性を検証する仕組みを持っていませんでした。これにより、誤設定や悪意ある行為によって「本来別の組織が所有するIPプレフィックスを、自分のASが起点であるかのように広告してしまう」<strong>BGPハイジャック</strong>が起こりえます。
                </p>

                <Diagram id="diag-24" />

                <p>
                    この問題への対処として普及が進んでいるのがRPKI(Resource Public Key
                    Infrastructure)です。
                </p>

                <Diagram id="diag-25" />

                <p>
                    <strong>2026年時点の普及状況</strong>: <a href="#ref18">参考文献18</a>(RIPE
                    LabsのAntonio
                    Prado氏による分析を引用したIPregistryの記事)によると、RPKIのROAでカバーされる経路の割合はグローバルで約67%に達しています。日次で変動する指標のため、最新値はHurricane
                    ElectricのRPKI &amp; ASPA Adoption Report(<a href="#ref16">参考文献16</a>)やNLnet Labsのルーティング関連ツール群(<a href="#ref17">参考文献17</a>)などで観測日とあわせて確認してください。Sparkle(AS6762)のような大手Tier-1トランジット事業者も、2026年2月3日からRPKI無効経路を拒否する側へ移行しました(<a
                        href="#ref15"
                        >参考文献15</a>。Cloudflareの「Is BGP safe yet?」が同社を無効経路を拒否する事業者として掲載)。
                </p>

                <p>
                    一方で、2026年7月21日にRIPE Labsが公開したAntonio Prado氏の分析(<a href="#ref19"
                        >参考文献19</a>)では、経路原点検証(ROV)は「経路操作」「経路一貫性」「ポリシー違反」「セッションベース攻撃」という4つの攻撃カテゴリのうち一部にしか対応できないことが指摘されており、<strong>RPKIは万能ではなく、より広範な監視と組み合わせる必要がある</strong>という認識が広がっています。
                </p>

                <h3 id="54-sdnのコントロールプレーン" tabIndex={-1}>5.4 SDNのコントロールプレーン</h3>

                <Diagram id="diag-26" />

                <p>
                    従来、ルーティングロジック(コントロールプレーン)は各ルータに分散して実装されていましたが、SDNでは<strong>論理的に中央集権化されたコントローラ</strong>がネットワーク全体を俯瞰して転送ルールを決定します。これにより、ネットワーク全体を1つのプログラムとして扱える(=プログラマブルにできる)柔軟性が得られます。
                </p>

                <hr />

                <h2 id="第6部-リンク層とlan" tabIndex={-1}>第6部: リンク層とLAN</h2>

                <h3 id="61-リンク層が提供するサービス" tabIndex={-1}>6.1 リンク層が提供するサービス</h3>

                <Diagram id="diag-27" />

                <h3 id="62-多重アクセスプロトコル" tabIndex={-1}>6.2 多重アクセスプロトコル</h3>

                <p>
                    複数のホストが1つの共有伝送媒体(古典的なイーサネットの同軸ケーブルや、無線LANの空間)を利用する場合、「誰がいつ送信してよいか」を調整する必要があります。
                </p>

                <Diagram id="diag-28" />

                <p>
                    現代の有線イーサネットはスイッチによる<strong>全二重専用リンク</strong>が主流であり、衝突自体がほぼ発生しません。しかし無線LANでは共有媒体の性質上、CSMA/CAベースの調整が今も本質的に必要です。
                </p>

                <h3 id="63-イーサネットスイッチ-vs-ルータ" tabIndex={-1}>6.3 イーサネットスイッチ vs ルータ</h3>

                <p>初学者が混同しやすい「スイッチ」と「ルータ」の違いを整理します。</p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">比較項目</th>
                                <th scope="col">イーサネットスイッチ(リンク層)</th>
                                <th scope="col">ルータ(ネットワーク層)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>転送の判断基準</td>
                                <td>宛先MACアドレス</td>
                                <td>宛先IPアドレス</td>
                            </tr>
                            <tr className="even">
                                <td>アドレステーブルの構築方法</td>
                                <td>自己学習(送信元MACを見て自動的に学習)</td>
                                <td>ルーティングプロトコルによる転送テーブルの構築</td>
                            </tr>
                            <tr className="odd">
                                <td>ブロードキャストドメイン</td>
                                <td>VLAN未分割のスイッチは1つのブロードキャストドメインを構成</td>
                                <td>ブロードキャストドメインを分割する</td>
                            </tr>
                            <tr className="even">
                                <td>プラグアンドプレイ性</td>
                                <td>高い(設定不要で自己学習)</td>
                                <td>相対的に設定が必要</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Diagram id="diag-29" />

                <h3 id="64-vlan仮想lan" tabIndex={-1}>6.4 VLAN(仮想LAN)</h3>

                <p>
                    物理的な配線を変更せずに、論理的にブロードキャストドメインを分割する技術がVLANです。
                </p>

                <Diagram id="diag-30" />

                <p>
                    VLANは、ブロードキャストドメインを部門ごとに分割してブロードキャストトラフィックを抑制する仕組みであり、物理的な配線変更なしにネットワークの論理構成を柔軟に変更できるという運用上のメリットをもたらします。ただしVLANはそれ単体でアクセス制御を提供するセキュリティ境界ではありません。VLAN間はルーティングされれば通信できてしまうため、部門間の通信を制限するにはVLAN間ルーティング経路上のACLやファイアウォールが別途必要です。
                </p>

                <hr />

                <h2 id="第7部-無線とモバイルネットワーク" tabIndex={-1}>第7部: 無線とモバイルネットワーク</h2>

                <h3 id="71-無線リンク特有の課題" tabIndex={-1}>7.1 無線リンク特有の課題</h3>

                <Diagram id="diag-31" />

                <p>無線通信には有線にはない固有の課題があります。</p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">課題</th>
                                <th scope="col">説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>隠れ端末問題</td>
                                <td>
                                    AとCが互いの電波を検知できないため、Bへ同時送信し衝突が発生しても双方が気づけない
                                </td>
                            </tr>
                            <tr className="even">
                                <td>信号減衰とマルチパスフェージング</td>
                                <td>障害物・反射により信号強度が予測しづらく変動する</td>
                            </tr>
                            <tr className="odd">
                                <td>誤り率の高さ</td>
                                <td>
                                    有線に比べてビット誤りが発生しやすく、上位層の輻輳制御アルゴリズムの前提(損失=輻輳)が崩れやすい
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 id="72-wi-fiieee-80211の進化" tabIndex={-1}>7.2 Wi-Fi(IEEE 802.11)の進化</h3>

                <Diagram id="diag-32" />

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">規格</th>
                                <th scope="col">周波数帯</th>
                                <th scope="col">特徴</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>Wi-Fi 6 (802.11ax)</td>
                                <td>2.4/5GHz</td>
                                <td>OFDMAによる複数ユーザーの効率的な多重化</td>
                            </tr>
                            <tr className="even">
                                <td>Wi-Fi 6E</td>
                                <td>2.4/5/6GHz</td>
                                <td>6GHz帯という広く空いた新スペクトラムを追加</td>
                            </tr>
                            <tr className="odd">
                                <td>Wi-Fi 7 (802.11be)</td>
                                <td>2.4/5/6GHz</td>
                                <td>Multi-Link Operation(複数帯域を同時利用)、理論値最大46Gbps</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p>
                    <strong>2026年時点の状況</strong>: IEEE 802.11be(Wi-Fi
                    7)は2024年に規格が確定・2025年7月に正式公開され、2026年には主要スマートフォン・ノートPCへの標準搭載が進み、ABI
                    Researchの予測ではWi-Fi
                    7対応アクセスポイントの年間出荷台数が1億1,790万台に達する見込みとされています。
                </p>

                <h3 id="73-モバイルネットワーク-4g5gから6gへ" tabIndex={-1}>
                    7.3 モバイルネットワーク: 4G/5Gから6Gへ
                </h3>

                <Diagram id="diag-33" />

                <p>
                    <strong>2026年時点の6G標準化動向</strong>:
                    2026年6月にシンガポールで開催された3GPPプレナリ会合では、6Gの仕様策定に向けたRelease
                    21のタイムラインが合意され、無線インターフェースの波形方式やチャネル符号化などの基礎技術に関する決定が行われました。3GPPはRelease
                    21のASN.1/OpenAPI
                    freeze(プロトコル記述の凍結)を2029年3月のマイルストーンとして設定しています。これはITU-Rへのfull
                    system
                    definitionの提出(2030年半ばを予定)とは別の節目であり、2029年3月時点で6G仕様のすべてが完成するわけではない点に注意してください。商用化は2030年前後になると見られています。
                </p>

                <h3 id="74-モビリティ管理" tabIndex={-1}>7.4 モビリティ管理</h3>

                <p>
                    デバイスが基地局(またはアクセスポイント)間を移動する際、進行中の通信セッションを維持するための仕組みが必要です。
                </p>

                <Diagram id="diag-34" />

                <p>
                    QUICが持つ「コネクションマイグレーション」機能(第3部参照)は、まさにこの種のネットワーク切り替えに対して、トランスポート層のレベルで対応する現代的なアプローチです。
                </p>

                <hr />

                <h2 id="第8部-コンピュータネットワークにおけるセキュリティ" tabIndex={-1}>
                    第8部: コンピュータネットワークにおけるセキュリティ
                </h2>

                <h3 id="81-暗号の基礎-対称鍵暗号と公開鍵暗号" tabIndex={-1}>
                    8.1 暗号の基礎: 対称鍵暗号と公開鍵暗号
                </h3>

                <Diagram id="diag-35" />

                <h3 id="82-tlshttpsハンドシェイクの流れ" tabIndex={-1}>8.2 TLS/HTTPSハンドシェイクの流れ</h3>

                <Diagram id="diag-36" />

                <p>
                    TLS 1.3(RFC 8446)は、TLS
                    1.2までと比べてハンドシェイクに必要な往復回数を1-RTTに削減し、非推奨の脆弱な暗号アルゴリズムを整理することでセキュリティと性能の両方を改善しました。
                </p>

                <h3 id="83-耐量子暗号post-quantum-cryptographyへの移行" tabIndex={-1}>
                    8.3 耐量子暗号(Post-Quantum Cryptography)への移行
                </h3>

                <p>
                    将来、大規模な量子コンピュータが実用化されると、現在広く使われている公開鍵暗号(RSA、楕円曲線暗号)の多くが解読可能になると予測されています。これに備え、NISTは2024年8月にML-KEM(FIPS
                    203)・ML-DSA(FIPS 204)・SLH-DSA(FIPS 205)という耐量子暗号標準を確定しました。
                </p>

                <Diagram id="diag-37" />

                <p>
                    <strong>なぜ「ハイブリッド方式」なのか</strong>:
                    Cloudflareの技術ブログによれば、ML-KEMのような新しい耐量子アルゴリズムに未知の脆弱性が将来発見される可能性に備え、実績のあるX25519(従来の楕円曲線暗号)と組み合わせるハイブリッド方式が業界標準のアプローチとして採用されています。片方が破られても、もう片方が安全性を担保する「ベルト・アンド・サスペンダーズ(念には念を)」の考え方です。
                </p>

                <p>
                    <strong>2026年時点の普及状況</strong>:
                    ChromeはX25519MLKEM768をバージョン124(2024年4月)からデスクトップでデフォルト有効化しており、Cloudflareの2026年テレメトリでは、Cloudflareに到達するTLS
                    1.3ハンドシェイクの30%以上が既に耐量子鍵交換で保護されています。Windows 11
                    24H2のCNG(Cryptography Next
                    Generation)APIにもML-KEMサポートが追加されるなど、OSレベルでの対応も進んでいます。一方、耐量子<strong>署名</strong>(証明書の真正性検証に使う部分)は鍵サイズが大きく処理コストが高いため、鍵交換ほどには普及が進んでおらず、2026年時点でも公開の耐量子証明書はほとんど流通していない、という「非対称な移行状況」がCloudflareの分析で指摘されています。
                </p>

                <h3 id="84-メッセージの完全性認証" tabIndex={-1}>8.4 メッセージの完全性認証</h3>

                <p>暗号化(盗聴防止)と完全性検証(改ざん検出)は別の概念です。</p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">目的</th>
                                <th scope="col">用いる仕組み</th>
                                <th scope="col">検出できること</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>機密性</td>
                                <td>暗号化(AESなど)</td>
                                <td>第三者による内容の盗み見を防ぐ</td>
                            </tr>
                            <tr className="even">
                                <td>完全性</td>
                                <td>メッセージ認証コード(MAC)、デジタル署名</td>
                                <td>経路上でのデータ改ざんを検出する</td>
                            </tr>
                            <tr className="odd">
                                <td>認証</td>
                                <td>デジタル証明書、公開鍵基盤(PKI)</td>
                                <td>通信相手が名乗っている本人であることを確認する</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 id="85-ファイアウォールとidsips" tabIndex={-1}>8.5 ファイアウォールとIDS/IPS</h3>

                <Diagram id="diag-38" />

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">機構</th>
                                <th scope="col">役割</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>パケットフィルタリングファイアウォール</td>
                                <td>
                                    IPアドレス・ポート番号・プロトコルなどのヘッダ情報に基づき通過可否を判定
                                </td>
                            </tr>
                            <tr className="even">
                                <td>ステートフルファイアウォール</td>
                                <td>
                                    コネクションの状態(TCPハンドシェイクの進行状況など)を追跡し、文脈に応じた判定を行う
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>IDS(侵入検知システム)</td>
                                <td>
                                    既知の攻撃パターン(シグネチャ)や異常な振る舞いを検知し警告する
                                </td>
                            </tr>
                            <tr className="even">
                                <td>IPS(侵入防御システム)</td>
                                <td>検知した悪意あるトラフィックを能動的に遮断する</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 id="86-ddos攻撃の脅威動向" tabIndex={-1}>8.6 DDoS攻撃の脅威動向</h3>

                <p>
                    DoS(サービス拒否)攻撃を多数の分散したホストから同時に行うのがDDoS(Distributed
                    DoS)攻撃です。
                </p>

                <Diagram id="diag-39" />

                <p>
                    <strong>2026年時点のデータ(Cloudflare)</strong>:
                    2025年にCloudflareが緩和したDDoS攻撃は4,710万件(前年比121%増)に達し、2025年12月にはAisuru-Kimwolfボットネット(推定100万〜400万台の感染デバイスで構成)による観測史上最大となる31.4Tbps・毎秒141億パケットの攻撃を35秒間にわたり記録しました。2026年上半期(H1)のレポートでは、1Tbpsを超える超大規模(hyper-volumetric)攻撃が第1四半期から第2四半期にかけて519%増加し、DNS/CLDAPリフレクション攻撃が主要な攻撃ベクトルとなっていることが報告されています。一方で、全体の96.62%の攻撃は500Mbps未満・90.60%は10分未満で終了する「短時間・小規模」なものであり、<strong>自動化された迅速な検知・緩和の仕組みが人手による対応能力を上回る規模で求められている</strong>という傾向が示されています。
                </p>

                <hr />

                <h2 id="第9部-2026年8月時点の最新動向" tabIndex={-1}>第9部: 2026年8月時点の最新動向</h2>

                <p>
                    書籍の原則的な内容は普遍性が高い一方、実際のインターネットは絶えず進化しています。本ガイド作成時点(2026年8月30日)における主要トレンドを層ごとに整理します。
                </p>

                <Diagram id="diag-40" />

                <h3 id="91-まとめ表-2026年8月時点の主要指標" tabIndex={-1}>
                    9.1 まとめ表: 2026年8月時点の主要指標
                </h3>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">領域</th>
                                <th scope="col">指標</th>
                                <th scope="col">数値</th>
                                <th scope="col">出典</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>アプリケーション層</td>
                                <td>HTTP/3グローバルトラフィック比率</td>
                                <td>約35%</td>
                                <td>Cloudflare Radar</td>
                            </tr>
                            <tr className="even">
                                <td>アプリケーション層</td>
                                <td>Firefox米国ユーザーのDoH有効化率</td>
                                <td>85%超</td>
                                <td>Mozilla報告</td>
                            </tr>
                            <tr className="odd">
                                <td>ネットワーク層</td>
                                <td>Google経由IPv6アクセス率(世界平均)</td>
                                <td>50.10%(2026/3/28)</td>
                                <td>Google / ISOC Pulse</td>
                            </tr>
                            <tr className="even">
                                <td>ネットワーク層</td>
                                <td>RPKIカバー経路割合</td>
                                <td>67.43%(2026/6/29)</td>
                                <td>Hurricane Electric</td>
                            </tr>
                            <tr className="odd">
                                <td>リンク・無線層</td>
                                <td>Wi-Fi 7対応AP年間出荷予測</td>
                                <td>1億1,790万台</td>
                                <td>ABI Research/WBA</td>
                            </tr>
                            <tr className="even">
                                <td>リンク・無線層</td>
                                <td>6G仕様完成目標</td>
                                <td>2029年前半(Release 21)</td>
                                <td>3GPP</td>
                            </tr>
                            <tr className="odd">
                                <td>セキュリティ層</td>
                                <td>耐量子鍵交換のTLS 1.3ハンドシェイク比率</td>
                                <td>30%超</td>
                                <td>Cloudflare Radar</td>
                            </tr>
                            <tr className="even">
                                <td>セキュリティ層</td>
                                <td>史上最大DDoS攻撃規模</td>
                                <td>31.4 Tbps</td>
                                <td>Cloudflare 2026脅威レポート</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 id="92-これらのトレンドから読み取れる設計思想の変化" tabIndex={-1}>
                    9.2 これらのトレンドから読み取れる設計思想の変化
                </h3>

                <ol>
                    <li>
                        <strong>「信頼してから検証する」から「常に検証する」へ</strong>:
                        RPKI、TLS証明書検証の強化、ゼロトラストアーキテクチャの浸透は、いずれも「経路情報やアイデンティティを暗黙に信頼しない」という共通した設計思想の表れです。
                    </li>
                    <li>
                        <strong>トランスポート層とセキュリティ層の融合</strong>:
                        QUICがTCP+TLSを統合したように、「性能」と「セキュリティ」を別々の層として積み上げるのではなく、最初から統合的に設計する流れが強まっています。
                    </li>
                    <li>
                        <strong>モデルベースの制御へのシフト</strong>:
                        BGPのRPKIやBBRの帯域推定モデルのように、静的なルールベースの制御から、実測データに基づく動的なモデルベース制御へと重心が移っています。
                    </li>
                    <li>
                        <strong>自動化・スケールへの対応</strong>:
                        DDoS攻撃の規模がテラビット級に達する中、人間の判断を待たない自動防御システムが前提になりつつあります。
                    </li>
                </ol>

                <hr />

                <h2 id="学習ロードマップ" tabIndex={-1}>学習ロードマップ</h2>

                <Diagram id="diag-41" />

                <p><strong>実践のヒント</strong>:</p>

                <ul>
                    <li>
                        <code>traceroute</code>(Windowsでは<code>tracert</code>)コマンドで、自宅から任意のWebサイトまでの経路上のルータ(ホップ)を実際に確認してみましょう。第1部・第5部の内容が具体的な経験として結びつきます。
                    </li>
                    <li>
                        ブラウザの開発者ツール(F12)の「Network」パネルで、実際のWebサイト通信がHTTP/1.1・HTTP/2・HTTP/3のどれを使っているか確認してみましょう。
                    </li>
                    <li>
                        <code>dig</code>や<code>nslookup</code>コマンドでDNS問い合わせの過程を観察し、第2部のDNS階層構造を実際に確認してみましょう。
                    </li>
                </ul>

                <hr />

                <h2 id="理解度チェックリスト" tabIndex={-1}>理解度チェックリスト</h2>

                <div className="checklist-card">
                    <div className="checklist-header">
                        <span className="title">理解度チェックリスト</span><span className="count">{completedCount} / 19 完了</span>
                    </div>
                    <ul>
                        <li>
                            <input type="checkbox" id="chk1" checked={Boolean(checkedItems['chk1'])} onChange={() => handleCheck('chk1')} /><label htmlFor="chk1"
                                >レイヤードアーキテクチャにおける5つの層とそれぞれのデータ単位(メッセージ/セグメント/データグラム/フレーム/ビット)を説明できる</label>
                        </li>
                        <li>
                            <input type="checkbox" id="chk2" checked={Boolean(checkedItems['chk2'])} onChange={() => handleCheck('chk2')} /><label htmlFor="chk2"
                                >パケット交換と回線交換の違いと、インターネットがパケット交換を採用している理由を説明できる</label>
                        </li>
                        <li>
                            <input type="checkbox" id="chk3" checked={Boolean(checkedItems['chk3'])} onChange={() => handleCheck('chk3')} /><label htmlFor="chk3"
                                >処理遅延・キューイング遅延・伝送遅延・伝搬遅延の4つを区別できる</label>
                        </li>
                        <li>
                            <input type="checkbox" id="chk4" checked={Boolean(checkedItems['chk4'])} onChange={() => handleCheck('chk4')} /><label htmlFor="chk4"
                                >クライアント・サーバ方式とP2P方式の違いを説明できる</label>
                        </li>
                        <li>
                            <input type="checkbox" id="chk5" checked={Boolean(checkedItems['chk5'])} onChange={() => handleCheck('chk5')} /><label htmlFor="chk5"
                                >HTTP/1.1からHTTP/2、HTTP/3への進化とそれぞれが解決した問題を説明できる</label>
                        </li>
                        <li>
                            <input type="checkbox" id="chk6" checked={Boolean(checkedItems['chk6'])} onChange={() => handleCheck('chk6')} /><label htmlFor="chk6"
                                >DNSの階層構造(ルート/TLD/権威サーバ)と名前解決の流れを説明できる</label>
                        </li>
                        <li>
                            <input type="checkbox" id="chk7" checked={Boolean(checkedItems['chk7'])} onChange={() => handleCheck('chk7')} /><label htmlFor="chk7"
                                >TCPとUDPの違いを、信頼性・輻輳制御の観点から説明できる</label>
                        </li>
                        <li>
                            <input type="checkbox" id="chk8" checked={Boolean(checkedItems['chk8'])} onChange={() => handleCheck('chk8')} /><label htmlFor="chk8"
                                >TCPの3ウェイハンドシェイクの流れを図示できる</label>
                        </li>
                        <li>
                            <input type="checkbox" id="chk9" checked={Boolean(checkedItems['chk9'])} onChange={() => handleCheck('chk9')} /><label htmlFor="chk9"
                                >フロー制御と輻輳制御の違いを説明できる</label>
                        </li>
                        <li>
                            <input type="checkbox" id="chk10" checked={Boolean(checkedItems['chk10'])} onChange={() => handleCheck('chk10')} /><label htmlFor="chk10"
                                >輻輳制御アルゴリズムが損失ベース(CUBIC)からモデルベース(BBR)へ進化した背景を説明できる</label>
                        </li>
                        <li>
                            <input type="checkbox" id="chk11" checked={Boolean(checkedItems['chk11'])} onChange={() => handleCheck('chk11')} /><label htmlFor="chk11"
                                >IPv4とIPv6の違い、NATの役割を説明できる</label>
                        </li>
                        <li>
                            <input type="checkbox" id="chk12" checked={Boolean(checkedItems['chk12'])} onChange={() => handleCheck('chk12')} /><label htmlFor="chk12"
                                >リンクステート型と距離ベクトル型ルーティングの違いを説明できる</label>
                        </li>
                        <li>
                            <input type="checkbox" id="chk13" checked={Boolean(checkedItems['chk13'])} onChange={() => handleCheck('chk13')} /><label htmlFor="chk13"
                                >BGPがAS間ルーティングでどのような役割を果たすか説明できる</label>
                        </li>
                        <li>
                            <input type="checkbox" id="chk14" checked={Boolean(checkedItems['chk14'])} onChange={() => handleCheck('chk14')} /><label htmlFor="chk14"
                                >RPKI/ROVがBGPハイジャック対策にどう役立つか、また限界があるかを説明できる</label>
                        </li>
                        <li>
                            <input type="checkbox" id="chk15" checked={Boolean(checkedItems['chk15'])} onChange={() => handleCheck('chk15')} /><label htmlFor="chk15"
                                >イーサネットスイッチとルータの違いを、転送判断基準の観点から説明できる</label>
                        </li>
                        <li>
                            <input type="checkbox" id="chk16" checked={Boolean(checkedItems['chk16'])} onChange={() => handleCheck('chk16')} /><label htmlFor="chk16"
                                >無線通信特有の「隠れ端末問題」を説明できる</label>
                        </li>
                        <li>
                            <input type="checkbox" id="chk17" checked={Boolean(checkedItems['chk17'])} onChange={() => handleCheck('chk17')} /><label htmlFor="chk17"
                                >TLSハンドシェイクの流れと、対称鍵・公開鍵暗号の使い分けを説明できる</label>
                        </li>
                        <li>
                            <input type="checkbox" id="chk18" checked={Boolean(checkedItems['chk18'])} onChange={() => handleCheck('chk18')} /><label htmlFor="chk18"
                                >耐量子暗号への移行が「ハイブリッド方式」で進められている理由を説明できる</label>
                        </li>
                        <li>
                            <input type="checkbox" id="chk19" checked={Boolean(checkedItems['chk19'])} onChange={() => handleCheck('chk19')} /><label htmlFor="chk19"
                                >DDoS攻撃の仕組みと、近年の攻撃規模の傾向を説明できる</label>
                        </li>
                    </ul>
                </div>

                <hr />

                <h2 id="用語集" tabIndex={-1}>用語集</h2>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">用語</th>
                                <th scope="col">説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>AS(自律システム)</td>
                                <td>
                                    インターネットにおいて単一の管理主体が運用するネットワークの集合
                                </td>
                            </tr>
                            <tr className="even">
                                <td>BGP</td>
                                <td>
                                    AS間の経路情報を交換するためのパスベクトル型ルーティングプロトコル
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>カプセル化</td>
                                <td>上位層のデータに下位層がヘッダを付加していく処理</td>
                            </tr>
                            <tr className="even">
                                <td>キューイング遅延</td>
                                <td>
                                    出力リンクが空くのを待つ間にパケットがバッファに滞留する時間
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>コネクションマイグレーション</td>
                                <td>
                                    ネットワークが切り替わってもコネクションを維持する仕組み(QUICの特徴)
                                </td>
                            </tr>
                            <tr className="even">
                                <td>最長プレフィックスマッチ</td>
                                <td>
                                    転送テーブル中で宛先アドレスに最も長く一致するエントリを選ぶ検索方式
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>自己学習(スイッチ)</td>
                                <td>
                                    イーサネットスイッチが送信元MACアドレスを見て自動的にアドレステーブルを構築する仕組み
                                </td>
                            </tr>
                            <tr className="even">
                                <td>隠れ端末問題</td>
                                <td>
                                    無線通信で、送信端末同士が互いの電波を検知できず衝突が起きる問題
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>統計的多重化</td>
                                <td>
                                    帯域を事前予約せず、必要な時にリンクを複数の通信で共有する方式
                                </td>
                            </tr>
                            <tr className="even">
                                <td>耐量子暗号(PQC)</td>
                                <td>
                                    量子コンピュータによる解読に耐性を持つよう設計された暗号方式
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>ハイブリッド鍵交換</td>
                                <td>
                                    従来の暗号方式と新しい耐量子暗号方式を組み合わせて安全性を高める鍵交換方式
                                </td>
                            </tr>
                            <tr className="even">
                                <td>パスベクトル型ルーティング</td>
                                <td>
                                    経路情報に経由したASの一覧を含めることでループ検出等を行う方式
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>フロー制御</td>
                                <td>受信側の処理能力を超えないよう送信量を調整する仕組み</td>
                            </tr>
                            <tr className="even">
                                <td>輻輳制御</td>
                                <td>ネットワーク内部の混雑状況に応じて送信量を調整する仕組み</td>
                            </tr>
                            <tr className="odd">
                                <td>ボトルネックリンク</td>
                                <td>送信元から宛先までの経路上で最も帯域幅が狭いリンク</td>
                            </tr>
                            <tr className="even">
                                <td>最長経路 / RTT</td>
                                <td>パケットが往復するのにかかる時間(Round-Trip Time)</td>
                            </tr>
                            <tr className="odd">
                                <td>ROA(経路原点認可)</td>
                                <td>
                                    プレフィックス保有者がどのASにそのプレフィックスの広告を許可するかを暗号署名で示す記録
                                </td>
                            </tr>
                            <tr className="even">
                                <td>RPKI</td>
                                <td>BGP経路の正当性を暗号学的に検証するための基盤技術</td>
                            </tr>
                            <tr className="odd">
                                <td>QUIC</td>
                                <td>
                                    UDP上に構築された、暗号化・多重化・輻輳制御を統合する新しいトランスポートプロトコル
                                </td>
                            </tr>
                            <tr className="even">
                                <td>ECH(Encrypted Client Hello)</td>
                                <td>
                                    TLSハンドシェイク中に接続先ホスト名(SNI)を暗号化する拡張仕様
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>Multi-Link Operation</td>
                                <td>Wi-Fi 7で導入された、複数の周波数帯を同時に使う技術</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <hr />

                <h2 id="参考文献" tabIndex={-1}>参考文献</h2>

                <p>
                    本ガイドは以下の一次情報源(公式ドキュメント・著名な国際的組織・開発者による発信)を優先的に参照して作成しました。文中の「参考文献N」という番号表記は、このリストの番号に対応しています。
                </p>

                <h3 id="書籍原典に関する公式情報" tabIndex={-1}>書籍・原典に関する公式情報</h3>

                <div className="ref-grid">
                    <div className="ref-card" id="ref1">
                        <div className="num">1</div>
                        <div className="txt">
                            Kurose, J. F., Ross, K. W.{' '}<em>Computer Networking: A Top-Down Approach</em>, 8th Edition —
                            著者公式サイト(目次PDF)。<a
                                href="https://gaia.cs.umass.edu/kurose_ross/Kurose_Ross_TOC_8E.pdf"
                                >https://gaia.cs.umass.edu/kurose_ross/Kurose_Ross_TOC_8E.pdf</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref2">
                        <div className="num">2</div>
                        <div className="txt">
                            Pearson社公式カタログページ(第8版) —{' '}<a
                                href="https://www.pearson.com/en-us/subject-catalog/p/computer-networking/P200000003334?view=educator"
                                >https://www.pearson.com/en-us/subject-catalog/p/computer-networking/P200000003334?view=educator</a>
                        </div>
                    </div>
                </div>

                <h3 id="アプリケーション層--httpquic関連" tabIndex={-1}>アプリケーション層 / HTTP・QUIC関連</h3>

                <div className="ref-grid">
                    <div className="ref-card" id="ref3">
                        <div className="num">3</div>
                        <div className="txt">
                            Cloudflare Developers「HTTP/3 (with QUIC)」公式ドキュメント —{' '}<a
                                href="https://developers.cloudflare.com/speed/optimization/protocol/http3/"
                                >https://developers.cloudflare.com/speed/optimization/protocol/http3/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref4">
                        <div className="num">4</div>
                        <div className="txt">
                            Cloudflare Blog「Async QUIC and HTTP/3 made easy: tokio-quiche is now
                            open-source」—{' '}<a
                                href="https://blog.cloudflare.com/async-quic-and-http-3-made-easy-tokio-quiche-is-now-open-source/"
                                >https://blog.cloudflare.com/async-quic-and-http-3-made-easy-tokio-quiche-is-now-open-source/</a>
                        </div>
                    </div>
                </div>

                <h3 id="dns--暗号化dns関連" tabIndex={-1}>DNS / 暗号化DNS関連</h3>

                <div className="ref-grid">
                    <div className="ref-card" id="ref5">
                        <div className="num">5</div>
                        <div className="txt">
                            業界動向を踏まえたDoH/DoQ/ECH解説記事「Encrypted DNS Reaches a Turning
                            Point as DoQ Adoption Accelerates」—{' '}<a
                                href="https://pbxscience.com/encrypted-dns-reaches-a-turning-point-as-doq-adoption-accelerates/"
                                >https://pbxscience.com/encrypted-dns-reaches-a-turning-point-as-doq-adoption-accelerates/</a>
                        </div>
                    </div>
                </div>

                <h3 id="トランスポート層--輻輳制御bbr関連" tabIndex={-1}>トランスポート層 / 輻輳制御(BBR)関連</h3>

                <div className="ref-grid">
                    <div className="ref-card" id="ref6">
                        <div className="num">6</div>
                        <div className="txt">
                            Google「BBR congestion control」公式リポジトリ —{' '}<a href="https://github.com/google/bbr"
                                >https://github.com/google/bbr</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref7">
                        <div className="num">7</div>
                        <div className="txt">
                            IETF Datatracker「BBR Congestion Control」(draft-ietf-ccwg-bbr) —{' '}<a href="https://datatracker.ietf.org/doc/draft-ietf-ccwg-bbr/"
                                >https://datatracker.ietf.org/doc/draft-ietf-ccwg-bbr/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref8">
                        <div className="num">8</div>
                        <div className="txt">
                            Phoronix「Google&apos;s BBRv3 TCP Congestion Control Showing Great Results,
                            Will Be Upstreamed To Linux」—{' '}<a href="https://www.phoronix.com/news/Google-BBRv3-Linux"
                                >https://www.phoronix.com/news/Google-BBRv3-Linux</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref9">
                        <div className="num">9</div>
                        <div className="txt">
                            Cardwell, N. et al.「BBRv3: Algorithm Bug Fixes and Public Internet
                            Deployment」IETF 117 CCWG発表資料(2023年7月) —{' '}<a
                                href="https://datatracker.ietf.org/meeting/117/materials/slides-117-ccwg-bbrv3-algorithm-bug-fixes-and-public-internet-deployment-00"
                                >https://datatracker.ietf.org/meeting/117/materials/slides-117-ccwg-bbrv3-algorithm-bug-fixes-and-public-internet-deployment-00</a>
                        </div>
                    </div>
                </div>

                <h3 id="ネットワーク層--ipv6普及動向" tabIndex={-1}>ネットワーク層 / IPv6普及動向</h3>

                <div className="ref-grid">
                    <div className="ref-card" id="ref10">
                        <div className="num">10</div>
                        <div className="txt">
                            APNIC Blog「Google hits 50% IPv6」—{' '}<a href="https://blog.apnic.net/2026/04/28/google-hits-50-ipv6/"
                                >https://blog.apnic.net/2026/04/28/google-hits-50-ipv6/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref11">
                        <div className="num">11</div>
                        <div className="txt">
                            Internet Society Pulse「18 Years Later, IPv6 Reaches Majority」—{' '}<a
                                href="https://pulse.internetsociety.org/en/blog/2026/04/18-years-later-ipv6-reaches-majority/"
                                >https://pulse.internetsociety.org/en/blog/2026/04/18-years-later-ipv6-reaches-majority/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref12">
                        <div className="num">12</div>
                        <div className="txt">
                            Google公式IPv6統計ページ —{' '}<a href="https://www.google.com/intl/en/ipv6/statistics.html"
                                >https://www.google.com/intl/en/ipv6/statistics.html</a>
                        </div>
                    </div>
                </div>

                <h3 id="コントロールプレーン--bgprpkiセキュリティ関連" tabIndex={-1}>
                    コントロールプレーン / BGP・RPKIセキュリティ関連
                </h3>

                <div className="ref-grid">
                    <div className="ref-card" id="ref13">
                        <div className="num">13</div>
                        <div className="txt">
                            Cloudflare Blog「Helping build a safer Internet by measuring BGP RPKI
                            Route Origin Validation」—{' '}<a href="https://blog.cloudflare.com/rpki-updates-data/"
                                >https://blog.cloudflare.com/rpki-updates-data/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref14">
                        <div className="num">14</div>
                        <div className="txt">
                            IETF Datatracker: Job Snijders氏によるRFC・Internet-Draft一覧 —{' '}<a href="https://datatracker.ietf.org/person/Job%20Snijders"
                                >https://datatracker.ietf.org/person/Job%20Snijders</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref15">
                        <div className="num">15</div>
                        <div className="txt">
                            Cloudflare「Is BGP safe yet?」(RPKI無効経路を拒否する事業者の一覧を掲載)
                            — <a href="https://isbgpsafeyet.com/">https://isbgpsafeyet.com/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref16">
                        <div className="num">16</div>
                        <div className="txt">
                            Hurricane Electric「RPKI &amp; ASPA Adoption Report」(BGP
                            Toolkit、日次更新) —{' '}<a href="https://bgp.he.net/report/rpki_and_aspa"
                                >https://bgp.he.net/report/rpki_and_aspa</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref17">
                        <div className="num">17</div>
                        <div className="txt">
                            NLnet
                            Labsのルーティング関連ツール群(Routinator/Krill/RTRTRなど、RPKI・BGPの計測と検証のためのオープンソースツール)
                            —{' '}<a href="https://nlnetlabs.nl/projects/routing/about/"
                                >https://nlnetlabs.nl/projects/routing/about/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref18">
                        <div className="num">18</div>
                        <div className="txt">
                            IPregistry Blog「RPKI Covers 67% of Routes, But Four Attack Classes Slip
                            Right Past It」(RIPE Labs Antonio Prado氏の分析を引用) —{' '}<a href="https://ipregistry.co/blog/rpki-blind-spots/"
                                >https://ipregistry.co/blog/rpki-blind-spots/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref19">
                        <div className="num">19</div>
                        <div className="txt">
                            RIPE Labs, Antonio Prado他「Beyond Origin Validation: Four Classes of
                            Routing Attack Nobody Is Validating」(2026年7月21日) —{' '}<a
                                href="https://labs.ripe.net/author/antonio-prado/beyond-origin-validation-four-classes-of-routing-attack-nobody-is-validating/"
                                >https://labs.ripe.net/author/antonio-prado/beyond-origin-validation-four-classes-of-routing-attack-nobody-is-validating/</a>
                        </div>
                    </div>
                </div>

                <h3 id="リンク層無線--wi-fi6g関連" tabIndex={-1}>リンク層・無線 / Wi-Fi・6G関連</h3>

                <div className="ref-grid">
                    <div className="ref-card" id="ref20">
                        <div className="num">20</div>
                        <div className="txt">
                            IEEE 802.11be技術論文「Wi-Fi 7: Feature Summary and Performance
                            Evaluation」—{' '}<a href="https://arxiv.org/pdf/2309.15951"
                                >https://arxiv.org/pdf/2309.15951</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref21">
                        <div className="num">21</div>
                        <div className="txt">
                            Wireless Broadband Alliance「Wireless Broadband Alliance Reveals its
                            Wi-Fi Predictions for 2026 and Beyond」—{' '}<a
                                href="https://wballiance.com/wireless-broadband-alliance-reveals-its-wi-fi-predictions-for-2026-and-beyond/"
                                >https://wballiance.com/wireless-broadband-alliance-reveals-its-wi-fi-predictions-for-2026-and-beyond/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref22">
                        <div className="num">22</div>
                        <div className="txt">
                            Ericsson公式ブログ「6G standardization milestones and RAN decisions」—{' '}<a
                                href="https://www.ericsson.com/en/blog/2026/6/6g-standardization-key-milestones-and-ran-decisions"
                                >https://www.ericsson.com/en/blog/2026/6/6g-standardization-key-milestones-and-ran-decisions</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref23">
                        <div className="num">23</div>
                        <div className="txt">
                            Qualcomm公式ブログ「Building the 6G standard: What 3GPP&apos;s June 2026
                            plenary decisions mean for device makers」—{' '}<a
                                href="https://www.qualcomm.com/news/onq/2026/06/6g-standardization-release-21-milestones"
                                >https://www.qualcomm.com/news/onq/2026/06/6g-standardization-release-21-milestones</a>
                        </div>
                    </div>
                </div>

                <h3 id="セキュリティ--耐量子暗号pqc関連" tabIndex={-1}>セキュリティ / 耐量子暗号(PQC)関連</h3>

                <div className="ref-grid">
                    <div className="ref-card" id="ref24">
                        <div className="num">24</div>
                        <div className="txt">
                            Cloudflare Blog「The state of the post-quantum Internet」—{' '}<a href="https://blog.cloudflare.com/pq-2024/"
                                >https://blog.cloudflare.com/pq-2024/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref25">
                        <div className="num">25</div>
                        <div className="txt">
                            Cloudflare Blog「State of the post-quantum Internet in 2025」—{' '}<a href="https://blog.cloudflare.com/pq-2025/"
                                >https://blog.cloudflare.com/pq-2025/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref26">
                        <div className="num">26</div>
                        <div className="txt">
                            Cloudflare Blog「Conventional cryptography is under threat. Upgrade to
                            post-quantum cryptography with Cloudflare Zero Trust.」—{' '}<a href="https://blog.cloudflare.com/post-quantum-zero-trust/"
                                >https://blog.cloudflare.com/post-quantum-zero-trust/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref27">
                        <div className="num">27</div>
                        <div className="txt">
                            Cloudflare Blog「Cloudflare One is the first SASE offering modern
                            post-quantum encryption across the full platform」—{' '}<a href="https://blog.cloudflare.com/post-quantum-sase/"
                                >https://blog.cloudflare.com/post-quantum-sase/</a>
                        </div>
                    </div>
                </div>

                <h3 id="セキュリティ--ddos脅威動向関連" tabIndex={-1}>セキュリティ / DDoS脅威動向関連</h3>

                <div className="ref-grid">
                    <div className="ref-card" id="ref28">
                        <div className="num">28</div>
                        <div className="txt">
                            Cloudflare Blog「Cloudflare&apos;s 2025 Q3 DDoS threat report — including
                            Aisuru, the apex of botnets」(29.7 Tbps・14.1 Bpps記録) —{' '}<a href="https://blog.cloudflare.com/ddos-threat-report-2025-q3/"
                                >https://blog.cloudflare.com/ddos-threat-report-2025-q3/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref29">
                        <div className="num">29</div>
                        <div className="txt">
                            Cloudflare Blog「2025 Q4 DDoS threat report: A record-setting 31.4 Tbps
                            attack caps a year of massive DDoS assaults」(31.4
                            Tbps記録、年間4,710万件・前年比121%増) —{' '}<a href="https://blog.cloudflare.com/ddos-threat-report-2025-q4/"
                                >https://blog.cloudflare.com/ddos-threat-report-2025-q4/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref30">
                        <div className="num">30</div>
                        <div className="txt">
                            Cloudflare Radar「Reports」(脅威インテリジェンス公開ダッシュボード) —{' '}<a href="https://radar.cloudflare.com/reports"
                                >https://radar.cloudflare.com/reports</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref31">
                        <div className="num">31</div>
                        <div className="txt">
                            Cloudflare公式プレスリリース「Cloudflare 2026 Threat Intelligence
                            Report」—{' '}<a
                                href="https://www.cloudflare.com/press/press-releases/2026/cloudflare-2026-threat-intelligence-report-nation-state-actors-and/"
                                >https://www.cloudflare.com/press/press-releases/2026/cloudflare-2026-threat-intelligence-report-nation-state-actors-and/</a>
                        </div>
                    </div>
                </div>

                <hr />

                <p>
                    <em>本ガイドは教育目的の独自解説コンテンツであり、Kurose &amp;
                        Ross両氏および出版元Pearson社の著作物を複製・転載するものではありません。原著の学習を補完する目的でご活用ください。原著の正式な内容については、書店・出版社の正規販売チャネル(Pearson、Amazon等)をご利用いただくか、大学図書館等でのアクセスをご検討ください。</em>
                </p>
            
                </main>
            </div>
        </div>
    );
}
