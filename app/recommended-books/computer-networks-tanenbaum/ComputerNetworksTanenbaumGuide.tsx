'use client';

import { memo, useState } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS, type DiagramId } from './constants';
import { NavBar } from './NavBar';

/** 図をmemo化してscroll spyやチェック操作による再描画を防ぐ。 */
const Diagram = memo(function Diagram({ id, label }: { id: DiagramId; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return <div className="mermaid-wrap"><MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale /></div>;
});

/** 下位層から積み上げるネットワーク学習ガイドの全本文。 */
export function ComputerNetworksTanenbaumGuide() {
    const [checked, setChecked] = useState<Set<string>>(() => new Set());
    const toggleCheck = (id: string) => setChecked(previous => {
        const next = new Set(previous);
        if (next.has(id)) next.delete(id); else next.add(id);
        return next;
    });
    return (
        <div className="tanenbaum-page">
            <div className="layout">
                <NavBar />
                <main className="main">
                {" "}
                <div className="hero">
                    {" "}
                    <div className="kicker">{" Tanenbaum & Wetherall, Computer Networks (5th Ed.) 着想 "}</div>
                    {" "}
                    <h1>{" コンピュータネットワーク入門ガイド ― 初学者のためのステップバイステップ解説 "}</h1>
                    {" "}
                    <div className="meta-row">
                        {" "}
                        <span className="pill">{"対象 "}<strong>{"初学者〜中級者"}</strong></span>
                        {" "}
                        <span className="pill">{"学習ステップ "}<strong>{"全10ステップ"}</strong></span>
                        {" "}
                        <span className="pill">{"図解 "}<strong>{"Mermaid 21点"}</strong></span>
                        {" "}
                        <span className="pill">{"参考文献 "}<strong>{"26件"}</strong></span>
                        {" "}
                    </div>
                    {" "}
                </div>
                {" "}
                <p>{" > 対象読者: ネットワークをこれから体系的に学びたいソフトウェアエンジニア・QAエンジニア・インフラ担当者 "}</p>
                {" "}
                <p>{" > 学び方: 「積み上げ型」。下位層(物理・データリンク)から上位層(アプリケーション)へ、実際にパケットが辿る順序で理解を積み上げます "}</p>
                {" "}
                <p>{" > 構成の着想元: Andrew S. Tanenbaum, David J. Wetherall 著『Computer Networks, Fifth Edition』(Prentice Hall / O'Reilly)。同書は物理層から出発し上位層へ積み上げる構造化アプローチと、章末にネットワークセキュリティを独立して扱う構成で知られています。本ガイドはその学習順序に着想を得つつ、2026年9月時点の最新動向を織り込んだ独自の解説として再構成したものであり、原著の文章・図版を複製するものではありません。 "}</p>
                {" "}
                <hr />
                {" "}
                <hr />
                {" "}
                <h2 id="introduction" tabIndex={-1}>{" はじめに: なぜコンピュータネットワークを学ぶのか "}</h2>
                {" "}
                <p>{" 現代のソフトウェアはほぼ例外なくネットワーク越しに動きます。マイクロサービス間のRPC、ブラウザとサーバー間のHTTPS、モバイルアプリのプッシュ通知、クラウドVPC内のトラフィック制御――どれも「パケットがどう運ばれ、どこで詰まり、どこで暗号化されるか」を理解していないと、性能問題やセキュリティインシデントの原因を特定できません。 "}</p>
                {" "}
                <p>{"ネットワークを学ぶ価値は大きく3つに整理できます。"}</p>
                {" "}
                <ol>
                    {" "}
                    <li>{" "}<strong>{"障害切り分けの速度が上がる"}</strong>{": 「アプリの問題か、DNSの問題か、TLSの問題か、経路の問題か」をレイヤーごとに仮説立てできるようになります。 "}</li>
                    {" "}
                    <li>{" "}<strong>{"設計判断の質が上がる"}</strong>{": タイムアウト値、リトライ戦略、コネクションプーリング、CDN配置などは、すべて下位層の特性(RTT、パケットロス、輻輳制御)の理解に基づいて決めるべき設計です。 "}</li>
                    {" "}
                    <li>{" "}<strong>{"セキュリティの土台になる"}</strong>{": TLS、VPN、ファイアウォール、ゼロトラストはいずれもネットワーク層・トランスポート層の仕組みの上に成り立っています。 "}</li>
                    {" "}
                </ol>
                {" "}
                <h2 id="best-practices" tabIndex={-1}>{"学習の進め方(ベストプラクティス)"}</h2>
                {" "}
                <div className="callout-practice">
                    {" "}
                    <div className="icon">{"✓"}</div>
                    {" "}
                    <div className="body">
                        {" "}
                        <div className="label">{"ベストプラクティス"}</div>
                        {" "}
                        <ul>
                            {" "}
                            <li>{" 上位層(HTTPやアプリ)から入りたくなっても、まずは下位層(物理・データリンク・ネットワーク)を先に押さえる。上位層のプロトコルは下位層の制約(帯域・遅延・信頼性)を前提に設計されているため、順序を逆にすると「なぜこの仕様なのか」が腑に落ちにくい "}</li>
                            {" "}
                            <li>{" 各ステップの図解は、実際に "}<code>{"ping"}</code>{" / "}<code>{"traceroute"}</code>{" / "}<code>{"curl -v"}</code>{" / "}<code>{"dig"}</code>{" などのコマンドを自分の端末で実行しながら照らし合わせる "}</li>
                            {" "}
                            <li>{" 用語は英語表記も併記して覚える。RFCやベンダーのドキュメントは英語が一次情報であることがほとんど "}</li>
                            {" "}
                            <li>{" 「なぜこの設計なのか」を都度自問する。ネットワークプロトコルの多くは歴史的な制約(帯域が細い、CPUが遅い、信頼できない回線)への対処として生まれており、背景を知ると暗記量が減る "}</li>
                            {" "}
                        </ul>
                        {" "}
                    </div>
                    {" "}
                </div>
                {" "}
                <hr />
                {" "}
                <h2 id="step0" tabIndex={-1}>{" ステップ0: 全体像を掴む ― インターネットはどう成り立っているか "}</h2>
                {" "}
                <h3 id="step0-1" tabIndex={-1}>{"インターネットを構成する要素"}</h3>
                {" "}
                <p>{" インターネットは単一の組織が管理する1つのネットワークではなく、"}<strong>{"自律システム(AS: Autonomous System)"}</strong>{" と呼ばれる無数の独立したネットワークが、BGPというプロトコルで経路情報を交換し合うことで成立している「ネットワークのネットワーク」です。 "}</p>
                {" "}
                <div className="table-scroll">
                    {" "}
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">{"構成要素"}{" "}</th>
                                <th scope="col">{"役割"}{" "}</th>
                                <th scope="col">{"具体例"}{" "}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>{"ホスト(エンドシステム)"}{" "}</td>
                                <td>{"データの送信元・宛先"}{" "}</td>
                                <td>{"PC、スマートフォン、サーバー"}{" "}</td>
                            </tr>
                            <tr className="even">
                                <td>{"ルータ"}{" "}</td>
                                <td>{"異なるネットワーク間でパケットを中継"}{" "}</td>
                                <td>{"家庭用ルータ、ISPのコアルータ"}{" "}</td>
                            </tr>
                            <tr className="odd">
                                <td>{"ISP(Internet Service Provider)"}{" "}</td>
                                <td>{"インターネットへの接続を提供"}{" "}</td>
                                <td>{"通信事業者"}{" "}</td>
                            </tr>
                            <tr className="even">
                                <td>{"IXP(Internet Exchange Point)"}{" "}</td>
                                <td>{"複数のISP・事業者が相互接続する拠点"}{" "}</td>
                                <td>{"主要都市の相互接続拠点"}{" "}</td>
                            </tr>
                            <tr className="odd">
                                <td>{"自律システム(AS)"}{" "}</td>
                                <td>{" 単一の管理ポリシーで運用されるネットワークの集合。番号(ASN)で識別 "}{" "}</td>
                                <td>{"企業・ISP・クラウド事業者ごとに割り当て"}{" "}</td>
                            </tr>
                        </tbody>
                    </table>
                    {" "}
                </div>
                {" "}
                <h3 id="step0-2" tabIndex={-1}>{"プロトコル階層化という考え方"}</h3>
                {" "}
                <p>{" ネットワークの設計では、機能を「層(レイヤー)」に分割し、各層が下位層の詳細を知らなくても使えるようにする"}<strong>{"階層化(layering)"}</strong>{"という考え方が採用されています。上位層は下位層が提供する「インターフェース」だけを信頼して設計され、下位層の実装(銅線か光ファイバか無線か)が変わっても上位層のコードは変更不要になります。これはソフトウェア設計における関心の分離(separation of concerns)と同じ発想です。 "}</p>
                {" "}
                <p>{"代表的な階層モデルが2つあります。"}</p>
                {" "}
                <ul>
                    {" "}
                    <li>{" "}<strong>{"OSI参照モデル"}</strong>{": 国際標準化機構(ISO)が策定した7層モデル。教育・トラブルシューティングの共通言語として広く使われる "}</li>
                    {" "}
                    <li>{" "}<strong>{"TCP/IPモデル(インターネットプロトコルスイート)"}</strong>{": 実際のインターネットが採用している4層(または5層)モデル。IETFのRFC群として標準化されている "}</li>
                    {" "}
                </ul>
                {" "}
                <Diagram id="diag-1" label="プロトコル階層化という考え方の図解" />
                {" "}
                <p>{" 実務ではTCP/IPモデルが実装の実態に近く、OSIモデルは「どのレイヤーの問題か」を議論する共通語彙として使われます。たとえば「レイヤー7の攻撃」と言えばアプリケーション層(HTTPリクエストなど)を狙った攻撃、「レイヤー3/4の攻撃」と言えばネットワーク層・トランスポート層を狙った攻撃(大量パケットによるDDoSなど)を指します。 "}</p>
                {" "}
                <h3 id="step0-3" tabIndex={-1}>{" カプセル化: データが層を降りていく仕組み "}</h3>
                {" "}
                <p>{" アプリケーションが送りたいデータは、送信側で各層のヘッダ(制御情報)を付加されながら下位層へ渡されていき、物理層でビット列として送出されます。受信側では逆に、各層が自分宛のヘッダを取り除きながら上位層へデータを渡します。この一連の処理を"}<strong>{"カプセル化(encapsulation)"}</strong>{"、逆方向を"}<strong>{"非カプセル化(decapsulation)"}</strong>{"と呼びます。 "}</p>
                {" "}
                <Diagram id="diag-2" label="カプセル化: データが層を降りていく仕組みの図解" />
                {" "}
                <div className="callout-practice">
                    {" "}
                    <div className="icon">{"✓"}</div>
                    {" "}
                    <div className="body">
                        {" "}
                        <div className="label">{"ベストプラクティス"}</div>
                        {" "}
                        <ul>
                            {" "}
                            <li>{" 「パケット」「フレーム」「セグメント」という用語はレイヤーごとに使い分ける(ネットワーク層=パケット、リンク層=フレーム、トランスポート層=セグメント/データグラム)。曖昧に「パケット」と呼ぶと議論がすれ違いやすい "}</li>
                            {" "}
                            <li>{" 障害調査では「どの層のヘッダが正しく付いているか」を"}<code>{"tcpdump"}</code>{"/Wiresharkで確認する癖をつける。上位層のエラーに見えて実は下位層(MTU超過など)が原因のことは多い "}</li>
                            {" "}
                        </ul>
                        {" "}
                    </div>
                    {" "}
                </div>
                {" "}
                <hr />
                {" "}
                <h2 id="step1" tabIndex={-1}>{" ステップ1: 物理層 ― ビットを電気信号・光・電波に変える "}</h2>
                {" "}
                <p>{" 物理層は、0と1のビット列を実際の電気信号・光信号・電波に変換して伝送路に送り出す層です。「何を送るか」ではなく「どう物理的に送るか」を扱います。 "}</p>
                {" "}
                <h3 id="step1-1" tabIndex={-1}>{"伝送媒体の比較"}</h3>
                {" "}
                <div className="table-scroll">
                    {" "}
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">{"媒体"}{" "}</th>
                                <th scope="col">{"代表例"}{" "}</th>
                                <th scope="col">{"特徴"}{" "}</th>
                                <th scope="col">{"主な用途"}{" "}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>{"銅線(ツイストペアケーブル)"}{" "}</td>
                                <td>{"Cat5e / Cat6 / Cat6A"}{" "}</td>
                                <td>{"安価・敷設が容易・電磁ノイズの影響を受けやすい"}{" "}</td>
                                <td>{"オフィスLAN、家庭内配線"}{" "}</td>
                            </tr>
                            <tr className="even">
                                <td>{"同軸ケーブル"}{" "}</td>
                                <td>{"ケーブルテレビ回線"}{" "}</td>
                                <td>{"シールドがあり銅線より高帯域"}{" "}</td>
                                <td>{"CATVインターネット"}{" "}</td>
                            </tr>
                            <tr className="odd">
                                <td>{"光ファイバ"}{" "}</td>
                                <td>{"シングルモード/マルチモード"}{" "}</td>
                                <td>{"減衰が少なく長距離・大容量、電磁ノイズに強い"}{" "}</td>
                                <td>{"データセンター間、バックボーン、FTTH"}{" "}</td>
                            </tr>
                            <tr className="even">
                                <td>{"無線(電波)"}{" "}</td>
                                <td>{"Wi-Fi、セルラー(4G/5G)"}{" "}</td>
                                <td>{"配線不要だが減衰・干渉・盗聴リスクがある"}{" "}</td>
                                <td>{"モバイル端末、IoT"}{" "}</td>
                            </tr>
                            <tr className="odd">
                                <td>{"衛星通信"}{" "}</td>
                                <td>{"Starlinkなど低軌道衛星(LEO)"}{" "}</td>
                                <td>{"地上インフラが乏しい地域でも接続可能、近年は低遅延化が進む"}{" "}</td>
                                <td>{"遠隔地・海上・航空機内接続"}{" "}</td>
                            </tr>
                        </tbody>
                    </table>
                    {" "}
                </div>
                {" "}
                <h3 id="step1-2" tabIndex={-1}>{"信号化・多重化の基礎"}</h3>
                {" "}
                <p>{" 物理層で扱う重要な概念に"}<strong>{"多重化(multiplexing)"}</strong>{"があります。1本の物理回線を複数の通信で共有するための技術です。 "}</p>
                {" "}
                <ul>
                    {" "}
                    <li>{" "}<strong>{"周波数分割多重(FDM: Frequency Division Multiplexing)"}</strong>{": 周波数帯を分割して同時に複数信号を送る(アナログ放送などで利用) "}</li>
                    {" "}
                    <li>{" "}<strong>{"時分割多重(TDM: Time Division Multiplexing)"}</strong>{": 時間をスロットに分割して順番に送る(デジタル電話網などで利用) "}</li>
                    {" "}
                    <li>{" "}<strong>{"波長分割多重(WDM: Wavelength Division Multiplexing)"}</strong>{": 光ファイバ内で異なる波長(色)の光を同時に伝送する。長距離光回線の大容量化に不可欠 "}</li>
                    {" "}
                </ul>
                {" "}
                <Diagram id="diag-3" label="信号化・多重化の基礎の図解" />
                {" "}
                <div className="callout-practice">
                    {" "}
                    <div className="icon">{"✓"}</div>
                    {" "}
                    <div className="body">
                        {" "}
                        <div className="label">{"ベストプラクティス"}</div>
                        {" "}
                        <ul>
                            {" "}
                            <li>{" データセンター間の帯域設計では、銅線の距離制限(Cat6Aで約100m)を意識し、それ以上の距離は光ファイバを選定する "}</li>
                            {" "}
                            <li>{" Wi-Fiの電波干渉は物理層の問題であることが多い。アプリ側の再送・タイムアウト調整だけで対処せず、チャネル設計や電波環境の見直しも検討する "}</li>
                            {" "}
                            <li>{" 光ファイバのWDMにより1本の芯線で数十〜数百chの多重化が可能になっている点を理解しておくと、バックボーン回線の容量設計の勘所がつかめる "}</li>
                            {" "}
                        </ul>
                        {" "}
                    </div>
                    {" "}
                </div>
                {" "}
                <hr />
                {" "}
                <h2 id="step2" tabIndex={-1}>{" ステップ2: データリンク層 ― フレーム化と誤り検出でリンクを渡す "}</h2>
                {" "}
                <p>{" データリンク層は、同一のリンク(同一セグメント)上にある隣接ノード間で、ビット列を「フレーム」という単位にまとめ、誤り検出を行ったうえで受け渡す役割を担います。ネットワーク層のIPアドレスとは異なり、この層では"}<strong>{"MACアドレス(Media Access Control address)"}</strong>{"というリンク層アドレス(一般的には48ビット)が使われます。48ビットのEUI-48が主流ですが、IEEE 802.15.4などではEUI-64が使われ、またNICに焼き付けられた値だけでなく、管理者による設定やプライバシー保護目的のランダム化によって変更された値が使われることもあります。 "}</p>
                {" "}
                <h3 id="step2-1" tabIndex={-1}>{"フレーミングと誤り検出"}</h3>
                {" "}
                <p>{" 送信側はビット列の区切り(フレームの開始・終了)を明示し、受信側が正しく1フレームを切り出せるようにします。また伝送中のビット誤りを検出するために、多くの実装で"}<strong>{"CRC(巡回冗長検査、Cyclic Redundancy Check)"}</strong>{"が使われます。CRCは送信側でフレーム内容から計算した検査値をフレーム末尾に付加し、受信側で同じ計算を行って一致するかを確認する仕組みです。ここで注意したいのは、イーサネットのFCS/CRCは誤りを検出して破損フレームを破棄するだけであり、再送は行わない点です。リンク層で確認応答(ACK)と再送による信頼性を提供するかどうかはプロトコル依存で、たとえばIEEE 802.11(Wi-Fi)はユニキャストフレームごとにACKと再送を行いますが、有線イーサネットは行わず、失われたデータの回復は上位層(TCPなど)に委ねられます。 "}</p>
                {" "}
                <h3 id="step2-2" tabIndex={-1}>{" イーサネット(Ethernet)フレームの構造 "}</h3>
                {" "}
                <div className="table-scroll">
                    {" "}
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">{"フィールド"}{" "}</th>
                                <th scope="col">{"長さ(目安)"}{" "}</th>
                                <th scope="col">{"役割"}{" "}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>{"プリアンブル"}{" "}</td>
                                <td>{"7バイト"}{" "}</td>
                                <td>{"受信側のクロック同期用"}{" "}</td>
                            </tr>
                            <tr className="even">
                                <td>{"SFD(スタートフレームデリミタ)"}{" "}</td>
                                <td>{"1バイト"}{" "}</td>
                                <td>{"フレーム本体の開始位置を示す"}{" "}</td>
                            </tr>
                            <tr className="odd">
                                <td>{"宛先MACアドレス"}{" "}</td>
                                <td>{"6バイト"}{" "}</td>
                                <td>{"フレームの届け先"}{" "}</td>
                            </tr>
                            <tr className="even">
                                <td>{"送信元MACアドレス"}{" "}</td>
                                <td>{"6バイト"}{" "}</td>
                                <td>{"フレームの送り主"}{" "}</td>
                            </tr>
                            <tr className="odd">
                                <td>{"VLANタグ(任意)"}{" "}</td>
                                <td>{"4バイト"}{" "}</td>
                                <td>{"VLAN識別子(802.1Q)"}{" "}</td>
                            </tr>
                            <tr className="even">
                                <td>{"タイプ/長さ"}{" "}</td>
                                <td>{"2バイト"}{" "}</td>
                                <td>{"上位プロトコル種別(IPv4/IPv6/ARPなど)"}{" "}</td>
                            </tr>
                            <tr className="odd">
                                <td>{"ペイロード"}{" "}</td>
                                <td>{"46〜1500バイト"}{" "}</td>
                                <td>{"実データ(IPパケットなど)"}{" "}</td>
                            </tr>
                            <tr className="even">
                                <td>{"FCS(フレームチェックシーケンス)"}{" "}</td>
                                <td>{"4バイト"}{" "}</td>
                                <td>{"CRCによる誤り検出"}{" "}</td>
                            </tr>
                        </tbody>
                    </table>
                    {" "}
                </div>
                {" "}
                <h3 id="step2-3" tabIndex={-1}>{" スイッチの学習と転送(自己学習ブリッジ) "}</h3>
                {" "}
                <p>{" L2スイッチは、受信したフレームの送信元MACアドレスとポート番号を"}<strong>{"MACアドレステーブル"}</strong>{"に記録し、次にそのMACアドレス宛のフレームが来たときは該当ポートだけに転送します。テーブルに宛先が存在しない場合は、受信ポート以外の全ポートへ"}<strong>{"フラッディング"}</strong>{"します。 "}</p>
                {" "}
                <Diagram id="diag-4" label="スイッチの学習と転送(自己学習ブリッジ)の図解" />
                {" "}
                <h3 id="step2-4" tabIndex={-1}>{"VLAN(仮想LAN)による論理分割"}</h3>
                {" "}
                <p>{" VLAN(Virtual LAN)は、物理的な配線を変えずに1台のスイッチを論理的に複数のブロードキャストドメインへ分割する仕組みです。IEEE 802.1Qにより、フレームにVLAN IDタグを付与して識別します。 "}</p>
                {" "}
                <Diagram id="diag-5" label="VLAN(仮想LAN)による論理分割の図解" />
                {" "}
                <p>{" 同じスイッチに接続されていても、VLAN10とVLAN20は別のブロードキャストドメインとして扱われ、相互に通信するにはルータやL3スイッチによるルーティングが必要になります。 "}</p>
                {" "}
                <div className="callout-practice">
                    {" "}
                    <div className="icon">{"✓"}</div>
                    {" "}
                    <div className="body">
                        {" "}
                        <div className="label">{"ベストプラクティス"}</div>
                        {" "}
                        <ul>
                            {" "}
                            <li>{" 業務ネットワークでは部署・用途ごとにVLANを分割し、ブロードキャストドメインを小さく保つことでブロードキャストストームの影響範囲を限定する "}</li>
                            {" "}
                            <li>{" スイッチのポートミラーリング(SPAN)機能を使うと、トラブルシュート時にパケットキャプチャが取りやすくなる "}</li>
                            {" "}
                            <li>{" MACアドレステーブルのエントリ数上限に注意する。仮想化基盤などでMACアドレスが多数生成される環境ではテーブル溢れによるフラッディング増加が起こりうる "}</li>
                            {" "}
                        </ul>
                        {" "}
                    </div>
                    {" "}
                </div>
                {" "}
                <hr />
                {" "}
                <h2 id="step3" tabIndex={-1}>{" ステップ3: メディアアクセス制御(MAC)サブレイヤー ― 誰が話す番かを決める "}</h2>
                {" "}
                <p>{" 複数のノードが同じ伝送媒体(共有バス、無線チャネルなど)を使う場合、「誰がいつ送信してよいか」を調整する仕組みが必要です。これを担うのがMAC(Media Access Control)サブレイヤーです。 "}</p>
                {" "}
                <h3 id="step3-1" tabIndex={-1}>{" CSMA/CD(有線イーサネットの歴史的方式) "}</h3>
                {" "}
                <p>{" 初期の共有バス型イーサネットでは、"}<strong>{"CSMA/CD(搬送波感知多重アクセス/衝突検出)"}</strong>{"が使われていました。現代のスイッチ接続された全二重イーサネットでは衝突がほぼ発生しないため実質的に使われていませんが、無線LANの理解の前提として重要です。 "}</p>
                {" "}
                <Diagram id="diag-6" label="CSMA/CD(有線イーサネットの歴史的方式)の図解" />
                {" "}
                <h3 id="step3-2" tabIndex={-1}>{"CSMA/CA(無線LANで使われる方式)"}</h3>
                {" "}
                <p>{" 無線LAN(Wi-Fi)では、送信中の自ノードの信号がノイズに埋もれて衝突を検出しにくい(隠れ端末問題もある)ため、"}<strong>{"CSMA/CA(搬送波感知多重アクセス/衝突回避)"}</strong>{"が採用されています。衝突を検出するのではなく、事前に衝突を避けることに重点を置きます。 "}</p>
                {" "}
                <Diagram id="diag-7" label="CSMA/CA(無線LANで使われる方式)の図解" />
                {" "}
                <h3 id="step3-3" tabIndex={-1}>{"Wi-Fi世代の比較"}</h3>
                {" "}
                <div className="table-scroll">
                    {" "}
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">{"世代呼称"}{" "}</th>
                                <th scope="col">{"IEEE規格"}{" "}</th>
                                <th scope="col">{"標準化・普及時期(目安)"}{" "}</th>
                                <th scope="col">{"最大帯域幅"}{" "}</th>
                                <th scope="col">{"主な特徴"}{" "}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>{"Wi-Fi 4"}{" "}</td>
                                <td>{"802.11n"}{" "}</td>
                                <td>{"2009年〜"}{" "}</td>
                                <td>{"40MHz"}{" "}</td>
                                <td>{"MIMO導入"}{" "}</td>
                            </tr>
                            <tr className="even">
                                <td>{"Wi-Fi 5"}{" "}</td>
                                <td>{"802.11ac"}{" "}</td>
                                <td>{"2013年〜"}{" "}</td>
                                <td>{"160MHz"}{" "}</td>
                                <td>{"5GHz帯中心、MU-MIMO"}{" "}</td>
                            </tr>
                            <tr className="odd">
                                <td>{"Wi-Fi 6"}{" "}</td>
                                <td>{"802.11ax"}{" "}</td>
                                <td>{"2019年〜"}{" "}</td>
                                <td>{"160MHz"}{" "}</td>
                                <td>{"OFDMA、省電力(TWT)"}{" "}</td>
                            </tr>
                            <tr className="even">
                                <td>{"Wi-Fi 6E"}{" "}</td>
                                <td>{"802.11ax拡張"}{" "}</td>
                                <td>{"2021年〜"}{" "}</td>
                                <td>{"160MHz"}{" "}</td>
                                <td>{"6GHz帯の追加利用"}{" "}</td>
                            </tr>
                            <tr className="odd">
                                <td>{"Wi-Fi 7"}{" "}</td>
                                <td>{"802.11be"}{" "}</td>
                                <td>{"Wi-Fi Alliance認証2024年1月、IEEE承認2024年9月、標準公開2025年7月"}{" "}</td>
                                <td>{"320MHz"}{" "}</td>
                                <td>{"MLO(複数リンク同時利用)、4K-QAM"}{" "}</td>
                            </tr>
                            <tr className="even">
                                <td>{"Wi-Fi 8(策定中)"}{" "}</td>
                                <td>{"802.11bn"}{" "}</td>
                                <td>{"標準化目標2028年"}{" "}</td>
                                <td>{"320MHz(据え置き)"}{" "}</td>
                                <td>{"速度よりも安定性・複数AP協調を重視"}{" "}</td>
                            </tr>
                        </tbody>
                    </table>
                    {" "}
                </div>
                {" "}
                <p>{" Wi-Fi Allianceは、2026年通年でWi-Fi 7対応機器の出荷が世界で約11億台に達すると見込んでいます。また企業向けアクセスポイントについては、ABI Researchが2024年の2,630万台から2026年には1億1,790万台へ拡大すると予測しています。 "}</p>
                {" "}
                <div className="callout-practice">
                    {" "}
                    <div className="icon">{"✓"}</div>
                    {" "}
                    <div className="body">
                        {" "}
                        <div className="label">{"ベストプラクティス"}</div>
                        {" "}
                        <ul>
                            {" "}
                            <li>{" 無線環境の性能問題を切り分ける際は、まずMACサブレイヤーの競合(同一チャネルを使う端末数、隠れ端末問題)を疑う "}</li>
                            {" "}
                            <li>{" Wi-Fi 7導入時はMLO(Multi-Link Operation)対応のクライアントとAPの組み合わせでのみ真価を発揮する点に注意し、混在環境での互換性を事前検証する "}</li>
                            {" "}
                            <li>{" 有線環境で今も半二重(hub経由など)が残っていないか確認する。全二重化されていればCSMA/CDによる衝突は原理的に発生しない "}</li>
                            {" "}
                        </ul>
                        {" "}
                    </div>
                    {" "}
                </div>
                {" "}
                <hr />
                {" "}
                <h2 id="step4" tabIndex={-1}>{" ステップ4: ネットワーク層 ― 異なるネットワークをまたいで届ける "}</h2>
                {" "}
                <p>{" ネットワーク層は、送信元から宛先まで、複数のネットワークをまたいでパケットを届ける「経路制御(ルーティング)」を担う層です。中核となるプロトコルがIP(Internet Protocol)です。 "}</p>
                {" "}
                <h3 id="step4-1" tabIndex={-1}>{"IPv4アドレッシングとCIDR"}</h3>
                {" "}
                <p>{" IPv4アドレスは32ビットで、慣習的に8ビットずつ4つに区切ったドット区切り10進数(例: 192.168.1.10)で表記されます。アドレス空間は約43億個(2^32)しかなく、インターネットの急成長により枯渇が進んだため、"}<strong>{"CIDR(Classless Inter-Domain Routing)"}</strong>{"というクラスに縛られない可変長のアドレス割り当て方式が導入されました。CIDR表記では "}<code>{"192.168.1.0/24"}</code>{" のように「/」の後にネットワーク部のビット数(プレフィックス長)を示します。 "}</p>
                {" "}
                <div className="table-scroll">
                    {" "}
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">{"CIDR表記"}{" "}</th>
                                <th scope="col">{"サブネットマスク"}{" "}</th>
                                <th scope="col">{"利用可能ホスト数(目安)"}{" "}</th>
                                <th scope="col">{"主な用途"}{" "}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>{"/8"}{" "}</td>
                                <td>{"255.0.0.0"}{" "}</td>
                                <td>{"約1,677万"}{" "}</td>
                                <td>{"大規模組織・historicalなクラスA相当"}{" "}</td>
                            </tr>
                            <tr className="even">
                                <td>{"/16"}{" "}</td>
                                <td>{"255.255.0.0"}{" "}</td>
                                <td>{"約6.5万"}{" "}</td>
                                <td>{"中規模組織のプライベート網"}{" "}</td>
                            </tr>
                            <tr className="odd">
                                <td>{"/24"}{" "}</td>
                                <td>{"255.255.255.0"}{" "}</td>
                                <td>{"254"}{" "}</td>
                                <td>{"一般的なLANセグメント"}{" "}</td>
                            </tr>
                            <tr className="even">
                                <td>{"/28"}{" "}</td>
                                <td>{"255.255.255.240"}{" "}</td>
                                <td>{"14"}{" "}</td>
                                <td>{"小規模サブネット(拠点間VPNなど)"}{" "}</td>
                            </tr>
                            <tr className="odd">
                                <td>{"/30"}{" "}</td>
                                <td>{"255.255.255.252"}{" "}</td>
                                <td>{"2"}{" "}</td>
                                <td>{"ルータ間ポイントツーポイントリンク"}{" "}</td>
                            </tr>
                        </tbody>
                    </table>
                    {" "}
                </div>
                {" "}
                <h3 id="step4-2" tabIndex={-1}>{"サブネッティングの手順"}</h3>
                {" "}
                <p>{"ステップバイステップでサブネット設計を行う際の考え方を示します。"}</p>
                {" "}
                <Diagram id="diag-8" label="サブネッティングの手順の図解" />
                {" "}
                <p>{" たとえば30台のホストを収容したい場合、2^5−2=30なのでホストビットは5ビット必要、プレフィックス長は32−5=27、つまり "}<code>{"/27"}</code>{"(255.255.255.224、利用可能ホスト30台)を割り当てる、という手順になります。 "}</p>
                {" "}
                <h3 id="step4-3" tabIndex={-1}>{"IPv6が必要な理由と基本構造"}</h3>
                {" "}
                <p>{" IPv4のアドレス枯渇に対応するため、128ビットのアドレス空間を持つ"}<strong>{"IPv6"}</strong>{"が標準化されています。アドレスは16進数を「:」区切りにした表記(例: "}<code>{"2001:0db8:85a3:0000:0000:8a2e:0370:7334"}</code>{")で表され、連続するゼロは "}<code>{"::"}</code>{" で1回だけ省略できます。IPv6ではNAT(後述)を必須としないエンドツーエンド到達性の回復や、ヘッダの簡素化による処理効率化なども設計目標に含まれています。 "}</p>
                {" "}
                <h3 id="step4-4" tabIndex={-1}>{" ルーティングアルゴリズムの2つの系統 "}</h3>
                {" "}
                <p>{" ルータが「宛先までどの経路が最適か」を決めるアルゴリズムは、大きく2系統に分類されます。 "}</p>
                {" "}
                <div className="table-scroll">
                    {" "}
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">{"分類"}{" "}</th>
                                <th scope="col">{"代表プロトコル"}{" "}</th>
                                <th scope="col">{"動作の考え方"}{" "}</th>
                                <th scope="col">{"特徴"}{" "}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>{"距離ベクトル型(Distance Vector)"}{" "}</td>
                                <td>{"RIP、(BGPは経路ベクトル型)"}{" "}</td>
                                <td>{"隣接ルータと「宛先までの距離(コスト)」を交換し合う"}{" "}</td>
                                <td>{"実装は単純だが収束が遅く、ループが起きやすい"}{" "}</td>
                            </tr>
                            <tr className="even">
                                <td>{"リンクステート型(Link State)"}{" "}</td>
                                <td>{"OSPF、IS-IS"}{" "}</td>
                                <td>{" 各ルータがネットワーク全体のトポロジ情報を持ち、最短経路を自力計算(ダイクストラ法) "}{" "}</td>
                                <td>{"収束が速いが計算・メモリ負荷が高い"}{" "}</td>
                            </tr>
                            <tr className="odd">
                                <td>{"経路ベクトル型(Path Vector)"}{" "}</td>
                                <td>{"BGP(Border Gateway Protocol)"}{" "}</td>
                                <td>{" 経由するAS番号の列(ASパス)を交換し、ポリシーに基づき経路選択 "}{" "}</td>
                                <td>{"インターネット全体の経路制御(EGP)に使用"}{" "}</td>
                            </tr>
                        </tbody>
                    </table>
                    {" "}
                </div>
                {" "}
                <Diagram id="diag-9" label="ルーティングアルゴリズムの2つの系統の図解" />
                {" "}
                <h3 id="step4-5" tabIndex={-1}>{"NAT(ネットワークアドレス変換)"}</h3>
                {" "}
                <p>{" IPv4アドレスの節約策として広く使われているのが"}<strong>{"NAT(Network Address Translation)"}</strong>{"です。プライベートIPアドレス(RFC 1918で定義された "}<code>{"10.0.0.0/8"}</code>{"、"}<code>{"172.16.0.0/12"}</code>{"、"}<code>{"192.168.0.0/16"}</code>{" など)を使う内部ネットワークが、1つ(または少数)のグローバルIPアドレスを共有してインターネットへアクセスする仕組みです。 "}</p>
                {" "}
                <Diagram id="diag-10" label="NAT(ネットワークアドレス変換)の図解" />
                {" "}
                <h3 id="step4-6" tabIndex={-1}>{"ICMPとインターネットの経路検証"}</h3>
                {" "}
                <p>{" "}<strong>{"ICMP(Internet Control Message Protocol)"}</strong>{"は、IPの補助的な制御・エラー通知プロトコルです。"}<code>{"ping"}</code>{"はICMPのEcho Request/Echo Replyを、"}<code>{"traceroute"}</code>{"はTTL(Time To Live)を1ずつ増やしながら送出したパケットに対するICMP Time Exceeded応答を利用して経路上のルータを可視化します。 "}</p>
                {" "}
                <div className="callout-practice">
                    {" "}
                    <div className="icon">{"✓"}</div>
                    {" "}
                    <div className="body">
                        {" "}
                        <div className="label">{"ベストプラクティス"}</div>
                        {" "}
                        <ul>
                            {" "}
                            <li>{" サブネット設計では将来の拡張余地を残す。ぎりぎりのホスト数で設計すると増設のたびに再設計が必要になる "}</li>
                            {" "}
                            <li>{" クラウド環境のVPC設計でも、CIDRブロックの重複を避けるため組織全体でIPアドレス管理(IPAM)の台帳を持つ "}</li>
                            {" "}
                            <li>{" NAT環境では「内側から外側への接続」は容易だが「外側から内側への接続」には追加設定(ポートフォワーディングなど)が必要になる非対称性を理解しておく "}</li>
                            {" "}
                            <li>{" インターネットの経路制御(BGP)は「宛先までの最短距離」ではなく「ポリシー」で決まる点に注意する。詳細はステップ8で扱う "}</li>
                            {" "}
                        </ul>
                        {" "}
                    </div>
                    {" "}
                </div>
                {" "}
                <hr />
                {" "}
                <h2 id="step5" tabIndex={-1}>{" ステップ5: トランスポート層 ― エンドツーエンドの信頼性 "}</h2>
                {" "}
                <p>{" トランスポート層は、ネットワーク層が提供する「ホスト間通信」を、アプリケーションプロセス間の通信に橋渡しする層です。代表的なプロトコルがTCPとUDPで、ポート番号によってどのアプリケーションプロセス宛かを識別します。 "}</p>
                {" "}
                <h3 id="step5-1" tabIndex={-1}>{"TCPの3ウェイハンドシェイク"}</h3>
                {" "}
                <p>{" TCP(Transmission Control Protocol)は、コネクション指向で信頼性のある通信を提供します。通信開始時には"}<strong>{"3ウェイハンドシェイク"}</strong>{"によって双方の初期シーケンス番号を同期します。 "}</p>
                {" "}
                <Diagram id="diag-11" label="TCPの3ウェイハンドシェイクの図解" />
                {" "}
                <h3 id="step5-2" tabIndex={-1}>{"TCPコネクションの状態遷移"}</h3>
                {" "}
                <p>{"TCPコネクションは接続確立から切断まで、いくつかの状態を遷移します(簡略版)。"}</p>
                {" "}
                <Diagram id="diag-12" label="TCPコネクションの状態遷移の図解" />
                {" "}
                <h3 id="step5-3" tabIndex={-1}>{"フロー制御と輻輳制御"}</h3>
                {" "}
                <p>{" TCPは受信側のバッファ溢れを防ぐ"}<strong>{"フロー制御(ウィンドウサイズによる調整)"}</strong>{"と、ネットワーク経路の混雑を避ける"}<strong>{"輻輳制御(congestion control)"}</strong>{"の両方を実装しています。輻輳制御の古典的アルゴリズムは次のように段階を踏みます。 "}</p>
                {" "}
                <Diagram id="diag-13" label="フロー制御と輻輳制御の図解" />
                {" "}
                <p>{" 近年は上記の古典的アルゴリズム(Reno/CUBICなど)に加え、Googleが開発した"}<strong>{"BBR(Bottleneck Bandwidth and Round-trip propagation time)"}</strong>{"のような、パケットロスではなく実測の帯域幅とRTTをもとに送信レートを調整するモデルベースの輻輳制御アルゴリズムの採用も進んでいます。 "}</p>
                {" "}
                <h3 id="step5-4" tabIndex={-1}>{"TCPとUDPの比較"}</h3>
                {" "}
                <div className="table-scroll">
                    {" "}
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">{"項目"}{" "}</th>
                                <th scope="col">{"TCP"}{" "}</th>
                                <th scope="col">{"UDP"}{" "}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>{"コネクション"}{" "}</td>
                                <td>{"コネクション指向(3ウェイハンドシェイク)"}{" "}</td>
                                <td>{"コネクションレス"}{" "}</td>
                            </tr>
                            <tr className="even">
                                <td>{"信頼性"}{" "}</td>
                                <td>{"再送・順序制御あり"}{" "}</td>
                                <td>{"なし(ロスは上位層かアプリで対処)"}{" "}</td>
                            </tr>
                            <tr className="odd">
                                <td>{"フロー制御・輻輳制御"}{" "}</td>
                                <td>{"あり"}{" "}</td>
                                <td>{"なし"}{" "}</td>
                            </tr>
                            <tr className="even">
                                <td>{"ヘッダサイズ"}{" "}</td>
                                <td>{"20バイト以上"}{" "}</td>
                                <td>{"8バイト"}{" "}</td>
                            </tr>
                            <tr className="odd">
                                <td>{"代表的な用途"}{" "}</td>
                                <td>{"Web(HTTP/1.1・HTTP/2)、メール、ファイル転送"}{" "}</td>
                                <td>{"DNS、動画配信・音声通話(リアルタイム性重視)、QUICの下位層"}{" "}</td>
                            </tr>
                            <tr className="even">
                                <td>{"遅延特性"}{" "}</td>
                                <td>{"ハンドシェイク・再送待ちで遅延が生じやすい"}{" "}</td>
                                <td>{"低遅延だが信頼性は上位層次第"}{" "}</td>
                            </tr>
                        </tbody>
                    </table>
                    {" "}
                </div>
                {" "}
                <p>{" UDPの上に信頼性・輻輳制御・暗号化を独自に構築したのが、後述するQUIC(RFC 9000)です。QUIC自体はトランスポートプロトコルであり、HTTP/3はその上で動作するアプリケーション層プロトコルです。QUICはユーザースペースのライブラリとして実装・更新できるため、輻輳制御アルゴリズムの改善サイクルを速められる利点があります。 "}</p>
                {" "}
                <div className="callout-practice">
                    {" "}
                    <div className="icon">{"✓"}</div>
                    {" "}
                    <div className="body">
                        {" "}
                        <div className="label">{"ベストプラクティス"}</div>
                        {" "}
                        <ul>
                            {" "}
                            <li>{" リアルタイム性が重要(音声・動画・ゲーム)なら再送によるヘッドオブラインブロッキングを避けるためUDPベースのプロトコルを検討する "}</li>
                            {" "}
                            <li>{" TCPコネクションの"}<code>{"TIME_WAIT"}</code>{"状態が大量に滞留する場合はソケットの再利用設定やコネクションプーリングを見直す "}</li>
                            {" "}
                            <li>{" 輻輳制御アルゴリズムはOSやカーネルバージョンによって既定値が異なる(CUBICが長らくLinuxの既定、BBR系への移行が進行中)。高スループットが必要なサーバーでは明示的に選定・検証する "}</li>
                            {" "}
                        </ul>
                        {" "}
                    </div>
                    {" "}
                </div>
                {" "}
                <hr />
                {" "}
                <h2 id="step6" tabIndex={-1}>{" ステップ6: アプリケーション層 ― 人とアプリのためのプロトコル "}</h2>
                {" "}
                <p>{" アプリケーション層は、ユーザーや他のアプリケーションが直接利用するプロトコル群です。ここでは特に重要なDNS、HTTP/HTTPS、DHCPを扱います。 "}</p>
                {" "}
                <h3 id="step6-1" tabIndex={-1}>{" DNS(Domain Name System)による名前解決 "}</h3>
                {" "}
                <p>{" 人間が覚えやすいドメイン名(例: "}<code>{"example.com"}</code>{")を、コンピュータが通信に使うIPアドレスへ変換する仕組みがDNSです。DNSは階層構造の分散データベースであり、ルートサーバー→TLD(トップレベルドメイン)サーバー→権威サーバーの順に問い合わせが行われます。 "}</p>
                {" "}
                <Diagram id="diag-14" label="DNS(Domain Name System)による名前解決の図解" />
                {" "}
                <div className="callout-practice">
                    {" "}
                    <div className="icon">{"✓"}</div>
                    {" "}
                    <div className="body">
                        {" "}
                        <div className="label">{"ベストプラクティス"}</div>
                        {" "}
                        <ul>
                            {" "}
                            <li>{" TTL(Time To Live)を短くしすぎるとDNSサーバー負荷とレイテンシが増え、長くしすぎるとフェイルオーバー時の切り替えが遅くなる。用途に応じたバランスを取る "}</li>
                            {" "}
                            <li>{" DNSSECによる応答の署名検証や、DNS over HTTPS/TLS(DoH/DoT)による問い合わせの暗号化・改ざん防止も、セキュリティ要件次第で検討する "}</li>
                            {" "}
                        </ul>
                        {" "}
                    </div>
                    {" "}
                </div>
                {" "}
                <h3 id="step6-2" tabIndex={-1}>{"HTTP/HTTPSの基本"}</h3>
                {" "}
                <p>{" HTTP(HyperText Transfer Protocol)は1989〜1991年にCERNのTim Berners-Lee氏らによって考案され、その後HTTP/1.0(1996年)、HTTP/1.1(1999年)、HTTP/2(2015年)、そしてQUICを輸送層に使うHTTP/3(2022年に仕様確定)へと進化してきました。 "}</p>
                {" "}
                <Diagram id="diag-15" label="HTTP/HTTPSの基本の図解" />
                {" "}
                <p>{"HTTPバージョンごとの特徴を整理します。"}</p>
                {" "}
                <div className="table-scroll">
                    {" "}
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">{"バージョン"}{" "}</th>
                                <th scope="col">{"輸送プロトコル"}{" "}</th>
                                <th scope="col">{"特徴"}{" "}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>{"HTTP/1.1"}{" "}</td>
                                <td>{"TCP"}{" "}</td>
                                <td>{"リクエストごとにヘッドオブラインブロッキングが発生しやすい"}{" "}</td>
                            </tr>
                            <tr className="even">
                                <td>{"HTTP/2"}{" "}</td>
                                <td>{"TCP"}{" "}</td>
                                <td>{" 1コネクション上で複数リクエストを多重化(ストリーム)、ヘッダ圧縮(HPACK) "}{" "}</td>
                            </tr>
                            <tr className="odd">
                                <td>{"HTTP/3"}{" "}</td>
                                <td>{"QUIC(UDPベース)"}{" "}</td>
                                <td>{" QUICがストリーム単位で順序制御するため、パケット損失の影響が他のストリームへ波及しにくい。コネクション確立も高速化 "}{" "}</td>
                            </tr>
                        </tbody>
                    </table>
                    {" "}
                </div>
                {" "}
                <h3 id="step6-3" tabIndex={-1}>{"メールプロトコルの概要"}</h3>
                {" "}
                <div className="table-scroll">
                    {" "}
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">{"プロトコル"}{" "}</th>
                                <th scope="col">{"役割"}{" "}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>{"SMTP(Simple Mail Transfer Protocol)"}{" "}</td>
                                <td>{"メールの送信・サーバー間中継"}{" "}</td>
                            </tr>
                            <tr className="even">
                                <td>{"IMAP(Internet Message Access Protocol)"}{" "}</td>
                                <td>{"サーバー上のメールボックスを複数端末から同期的に参照"}{" "}</td>
                            </tr>
                            <tr className="odd">
                                <td>{"POP3(Post Office Protocol version 3)"}{" "}</td>
                                <td>{" メールをサーバーから端末へダウンロードして管理(同期性は低い) "}{" "}</td>
                            </tr>
                        </tbody>
                    </table>
                    {" "}
                </div>
                {" "}
                <h3 id="step6-4" tabIndex={-1}>{"DHCPによる自動設定"}</h3>
                {" "}
                <p>{" DHCP(Dynamic Host Configuration Protocol)は、端末がネットワークに参加する際にIPアドレス・サブネットマスク・デフォルトゲートウェイ・DNSサーバーなどを自動的に取得する仕組みです。一連のやり取りは頭文字を取って"}<strong>{"DORA"}</strong>{"(Discover, Offer, Request, Acknowledge)と呼ばれます。 "}</p>
                {" "}
                <Diagram id="diag-16" label="DHCPによる自動設定の図解" />
                {" "}
                <div className="callout-practice">
                    {" "}
                    <div className="icon">{"✓"}</div>
                    {" "}
                    <div className="body">
                        {" "}
                        <div className="label">{"ベストプラクティス"}</div>
                        {" "}
                        <ul>
                            {" "}
                            <li>{" HTTPS化(TLS導入)は今やデフォルトの前提とする。平文HTTPは中間者による盗聴・改ざんのリスクを常に伴う "}</li>
                            {" "}
                            <li>{" DHCPのリース期間は、端末の入れ替わり頻度(オフィスWi-Fi、来客用ネットワークなど)に応じて調整する "}</li>
                            {" "}
                            <li>{" APIのタイムアウト設計では、通信区間ごとに要する時間を分けて見積もる。HTTP/1.1・HTTP/2(TCP)ではDNS解決・TCP確立・TLSハンドシェイク・リクエスト処理を、HTTP/3(QUIC)ではDNS解決・QUIC接続確立(トランスポートとTLS 1.3ハンドシェイクが統合される)・リクエスト処理を、それぞれ個別に見積もる "}</li>
                            {" "}
                        </ul>
                        {" "}
                    </div>
                    {" "}
                </div>
                {" "}
                <hr />
                {" "}
                <h2 id="step7" tabIndex={-1}>{" ステップ7: ネットワークセキュリティ ― 守るべきものと手段 "}</h2>
                {" "}
                <h3 id="step7-1" tabIndex={-1}>{"TLSによる暗号化通信"}</h3>
                {" "}
                <p>{" TLS(Transport Layer Security)は、トランスポート層の上でアプリケーションデータを暗号化・完全性保護・認証するプロトコルです。現行の主流であるTLS 1.3では、ハンドシェイクが従来の2往復(2-RTT)から1往復(1-RTT)に短縮され、接続確立の高速化とともに、古い脆弱な暗号スイートの廃止によるセキュリティ強化が図られています。 "}</p>
                {" "}
                <Diagram id="diag-17" label="TLSによる暗号化通信の図解" />
                {" "}
                <h3 id="step7-2" tabIndex={-1}>{"VPN(Virtual Private Network)"}</h3>
                {" "}
                <p>{" VPNは、公衆ネットワーク(インターネット)上に暗号化されたトンネルを構築し、あたかも専用線で接続されているかのように離れた拠点や端末を結ぶ技術です。 "}</p>
                {" "}
                <Diagram id="diag-18" label="VPN(Virtual Private Network)の図解" />
                {" "}
                <p>{" サイト間(site-to-site)VPNは拠点同士を常時接続する構成、リモートアクセスVPNは個々の端末が社内網へ接続する構成です。近年はVPNに代わり、通信ごとに信頼性を検証する"}<strong>{"ゼロトラストネットワークアクセス(ZTNA)"}</strong>{"の採用も広がっています。 "}</p>
                {" "}
                <h3 id="step7-3" tabIndex={-1}>{" ファイアウォールとDMZアーキテクチャ "}</h3>
                {" "}
                <p>{" ファイアウォールは、あらかじめ定義したルールに基づき通過させるトラフィックを制限する仕組みです。インターネットに公開するサーバーは、内部ネットワークとは別の緩衝区画である"}<strong>{"DMZ(DeMilitarized Zone)"}</strong>{"に配置し、万一そこが侵害されても内部網へ直接影響しないようにする設計が一般的です。 "}</p>
                {" "}
                <Diagram id="diag-19" label="ファイアウォールとDMZアーキテクチャの図解" />
                {" "}
                <h3 id="step7-4" tabIndex={-1}>{"耐量子暗号(PQC)への移行"}</h3>
                {" "}
                <p>{" 将来の量子コンピュータによる暗号解読リスクに備え、「今傍受して保存し、将来の量子コンピュータで復号する」攻撃(harvest-now, decrypt-later)への対策として、鍵交換を量子耐性のあるアルゴリズムへ移行する動きが急速に進んでいます。詳細な最新数値はステップ8で扱います。 "}</p>
                {" "}
                <div className="callout-practice">
                    {" "}
                    <div className="icon">{"✓"}</div>
                    {" "}
                    <div className="body">
                        {" "}
                        <div className="label">{"ベストプラクティス"}</div>
                        {" "}
                        <ul>
                            {" "}
                            <li>{" TLS証明書の自動更新(ACMEプロトコルなど)を導入し、有効期限切れによる障害を防ぐ "}</li>
                            {" "}
                            <li>{" VPNの認証情報は多要素認証(MFA)と組み合わせ、単一の秘密情報漏洩でネットワーク全体が突破されない設計にする "}</li>
                            {" "}
                            <li>{" ファイアウォールルールは「デフォルト拒否・必要な通信のみ許可」を原則とし、定期的な棚卸しでルールの陳腐化を防ぐ "}</li>
                            {" "}
                            <li>{" DDoS対策は自組織のインフラだけで完結させず、上流のISPやCDN/DDoS対策サービスと連携した多層防御を検討する "}</li>
                            {" "}
                        </ul>
                        {" "}
                    </div>
                    {" "}
                </div>
                {" "}
                <hr />
                {" "}
                <h2 id="step8" tabIndex={-1}>{" ステップ8: 2026年の最新動向 ― 今のインターネットはどう変わったか "}</h2>
                {" "}
                <p>{" ここまでの原理は変わりませんが、実際にインターネット上でどのプロトコルがどの程度使われているかは年々変化しています。2026年9月時点で確認できる主要な動向を整理します。 "}</p>
                {" "}
                <div className="table-scroll">
                    {" "}
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">{"分野"}{" "}</th>
                                <th scope="col">{"動向"}{" "}</th>
                                <th scope="col">{"出典"}{" "}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>{"IPv6"}{" "}</td>
                                <td>{" Googleの計測で、Google宛アクセスのうちネイティブIPv6経由の比率が2026年3月28日に初めて50%を突破(50.10%) "}{" "}</td>
                                <td>{"ISOC Pulse, APNIC Blog"}{" "}</td>
                            </tr>
                            <tr className="even">
                                <td>{"HTTP/3・QUIC"}{" "}</td>
                                <td>{" Cloudflareの年次レポートでは、HTTP/3がWeb全体で無視できない比率を占める一方、CDNや主要事業者以外への普及がボトルネックとなり、Cloudflare経由トラフィックでのシェアは横ばい〜微減の局面も観測されている "}{" "}</td>
                                <td>{"Cloudflare Radar 2025 Year in Review"}{" "}</td>
                            </tr>
                            <tr className="odd">
                                <td>{"BGPルーティングセキュリティ"}{" "}</td>
                                <td>{" RPKI(経路の暗号署名検証)が普及し、Cloudflare計測でのIPv4の有効(valid)経路シェアは2025年通年で53.9%まで上昇(前年から3.9ポイント増) "}{" "}</td>
                                <td>{"Cloudflare Radar 2025 Year in Review"}{" "}</td>
                            </tr>
                            <tr className="even">
                                <td>{"耐量子TLS"}{" "}</td>
                                <td>{" Cloudflareは2025年後半、人間由来と判定されるトラフィックのうち耐量子鍵交換(X25519MLKEM768などのハイブリッド方式)で保護される割合が過半数を超えたと報告 "}{" "}</td>
                                <td>{"Cloudflare Blog"}{" "}</td>
                            </tr>
                            <tr className="odd">
                                <td>{"Wi-Fi"}{" "}</td>
                                <td>{" Wi-Fi 7(IEEE 802.11be)がIEEE承認2024年9月・標準公開2025年7月を経て正式標準化され、2026年通年で全世界の対応機器出荷が約11億台規模に到達する見込み。次世代のWi-Fi 8(802.11bn)は速度よりも複数AP協調やローミングの安定性を重視する方向で、標準化目標は2028年 "}{" "}</td>
                                <td>{"Network World"}{" "}</td>
                            </tr>
                            <tr className="even">
                                <td>{"DDoSの巨大化"}{" "}</td>
                                <td>{" Cloudflareの観測では、2025年通年でハイパーボリューメトリック(1Tbps超/10億pps超)なDDoS攻撃のピーク規模が、バイト数ベースで約10倍、パケット数ベースで約7倍に拡大 "}{" "}</td>
                                <td>{"Cloudflare Radar 2025 Year in Review"}{" "}</td>
                            </tr>
                        </tbody>
                    </table>
                    {" "}
                </div>
                {" "}
                <Diagram id="diag-20" label="ステップ8: 2026年の最新動向 ― 今のインターネットはどう変わったかの図解" />
                {" "}
                <div className="callout-practice">
                    {" "}
                    <div className="icon">{"✓"}</div>
                    {" "}
                    <div className="body">
                        {" "}
                        <div className="label">{"ベストプラクティス"}</div>
                        {" "}
                        <ul>
                            {" "}
                            <li>{" 新規サービス構築時はIPv4/IPv6デュアルスタックを既定とし、IPv6専用環境からのアクセスを排除しない "}</li>
                            {" "}
                            <li>{" CDNやロードバランサの設定でHTTP/3(QUIC)対応状況を定期的に見直す。UDPを通す必要があるためファイアウォール・NAT機器側の対応も合わせて確認する "}</li>
                            {" "}
                            <li>{" BGPを運用する組織はRPKI ROA(Route Origin Authorization)の登録を進め、経路乗っ取り(ハイジャック)への耐性を高める "}</li>
                            {" "}
                            <li>{" 耐量子暗号への移行計画(クリプトインベントリの棚卸し、ハイブリッド鍵交換対応のライブラリ選定)を早期に着手する。特に長期秘匿が必要なデータを扱う場合は優先度を上げる "}</li>
                            {" "}
                        </ul>
                        {" "}
                    </div>
                    {" "}
                </div>
                {" "}
                <hr />
                {" "}
                <h2 id="step9" tabIndex={-1}>{" ステップ9: トラブルシューティングの基本 ― 現場で使う一次切り分け "}</h2>
                {" "}
                <p>{" ネットワーク障害の一次切り分けは、階層モデルに沿って「どのレイヤーで問題が起きているか」を絞り込むのが定石です。 "}</p>
                {" "}
                <Diagram id="diag-21" label="ステップ9: トラブルシューティングの基本 ― 現場で使う一次切り分けの図解" />
                {" "}
                <h3 id="step9-1" tabIndex={-1}>{"よく使う一次切り分けコマンド"}</h3>
                {" "}
                <div className="table-scroll">
                    {" "}
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">{"コマンド"}{" "}</th>
                                <th scope="col">{"主な用途"}{" "}</th>
                                <th scope="col">{"対象レイヤーの目安"}{" "}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td><code>{"ping"}</code>{" "}</td>
                                <td>{"疎通確認、RTT測定"}{" "}</td>
                                <td>{"ネットワーク層(ICMP)"}{" "}</td>
                            </tr>
                            <tr className="even">
                                <td><code>{"traceroute"}</code>{" / "}<code>{"tracert"}</code>{" "}</td>
                                <td>{"経路上の各ホップを可視化"}{" "}</td>
                                <td>{"ネットワーク層"}{" "}</td>
                            </tr>
                            <tr className="odd">
                                <td><code>{"dig"}</code>{" / "}<code>{"nslookup"}</code>{" "}</td>
                                <td>{"DNS問い合わせの確認"}{" "}</td>
                                <td>{"アプリケーション層(DNS)"}{" "}</td>
                            </tr>
                            <tr className="even">
                                <td><code>{"curl -v"}</code>{" "}</td>
                                <td>{"HTTP/HTTPS通信の詳細(ヘッダ・TLS情報)を確認"}{" "}</td>
                                <td>{"アプリケーション層〜トランスポート層"}{" "}</td>
                            </tr>
                            <tr className="odd">
                                <td><code>{"tcpdump"}</code>{" / Wireshark"}{" "}</td>
                                <td>{"パケットキャプチャによる全レイヤーの詳細確認"}{" "}</td>
                                <td>{"全レイヤー"}{" "}</td>
                            </tr>
                            <tr className="even">
                                <td><code>{"ss"}</code>{" / "}<code>{"netstat"}</code>{" "}</td>
                                <td>{"自ホストのソケット状態(LISTEN/ESTABLISHEDなど)確認"}{" "}</td>
                                <td>{"トランスポート層"}{" "}</td>
                            </tr>
                            <tr className="odd">
                                <td><code>{"nc -u"}</code>{" / "}<code>{"nmap -sU"}</code>{" "}</td>
                                <td>{"UDPポートの到達確認(応答がなくてもopen|filteredになり得る)"}{" "}</td>
                                <td>{"トランスポート層(UDP)"}{" "}</td>
                            </tr>
                            <tr className="even">
                                <td><code>{"dig @<宛先> <名前>"}</code>{" "}</td>
                                <td>{"DNS(UDP/53)へ実際に問い合わせて応答有無を確認"}{" "}</td>
                                <td>{"アプリケーション層(DNS)経由のUDP疎通"}{" "}</td>
                            </tr>
                            <tr className="odd">
                                <td><code>{"curl --http3 -v"}</code>{" "}</td>
                                <td>{"HTTP/3(QUIC over UDP/443)のハンドシェイクと応答を確認"}{" "}</td>
                                <td>{"トランスポート層(QUIC)〜アプリケーション層"}{" "}</td>
                            </tr>
                        </tbody>
                    </table>
                    {" "}
                </div>
                {" "}
                <div className="callout-practice">
                    {" "}
                    <div className="icon">{"✓"}</div>
                    {" "}
                    <div className="body">
                        {" "}
                        <div className="label">{"ベストプラクティス"}</div>
                        {" "}
                        <ul>
                            {" "}
                            <li>{" 「遅い」という報告を受けたら、まず"}<code>{"ping"}</code>{"でRTTのベースラインを取り、"}<code>{"traceroute"}</code>{"でどのホップから遅延が増えているかを確認する "}</li>
                            {" "}
                            <li>{" TLSエラーの切り分けでは"}<code>{"curl -v"}</code>{"や"}<code>{"openssl s_client"}</code>{"で証明書チェーン・プロトコルバージョン・暗号スイートのネゴシエーション結果を直接確認する "}</li>
                            {" "}
                            <li>{" パケットキャプチャは本番環境で無制限に取得せず、フィルタ(ホスト・ポート指定)と時間・サイズの上限を設けて実施する "}</li>
                            {" "}
                            <li>{" 切り分けの前に宛先サービスがTCPかUDP/QUIC(DNS、SNMP、syslog、HTTP/3など)かを確認する。UDPはコネクションを確立しないため、"}<code>{"telnet"}</code>{"や"}<code>{"nc"}</code>{"(TCP)が失敗しても、それはUDPサービスのトランスポート障害の根拠にはならない "}</li>
                            {" "}
                            <li>{" UDPベースのサービスはプロトコル固有の応答で判定する。DNSなら"}<code>{"dig @<宛先>"}</code>{"、HTTP/3なら"}<code>{"curl --http3 -v"}</code>{"でQUICハンドシェイクの成否を見る。"}<code>{"curl --http3"}</code>{"が失敗して"}<code>{"--http2"}</code>{"が成功する場合は、経路上でUDP/443が遮断されている可能性を疑う "}</li>
                            {" "}
                        </ul>
                        {" "}
                    </div>
                    {" "}
                </div>
                {" "}
                <hr />
                {" "}
                <h2 id="roadmap" tabIndex={-1}>{"学習ロードマップ"}</h2>
                {" "}
                <ol>
                    {" "}
                    <li>{" "}<strong>{"基礎固め"}</strong>{": 本ガイドのステップ0〜3(階層モデル・物理層・データリンク層・MACサブレイヤー)を、手元のPCで"}<code>{"ipconfig"}</code>{"/"}<code>{"ifconfig"}</code>{"やARPテーブルを確認しながら学ぶ "}</li>
                    {" "}
                    <li>{" "}<strong>{"ネットワーク層とトランスポート層"}</strong>{": サブネッティングを実際に手計算し、"}<code>{"tcpdump"}</code>{"でTCP 3ウェイハンドシェイクを観察する "}</li>
                    {" "}
                    <li>{" "}<strong>{"アプリケーション層"}</strong>{": "}<code>{"dig"}</code>{"でDNSの再帰的問い合わせを観察し、"}<code>{"curl -v"}</code>{"でHTTP/HTTPSのやり取りを確認する "}</li>
                    {" "}
                    <li>{" "}<strong>{"セキュリティ"}</strong>{": 自分の管理下にある環境でTLS設定・VPN・ファイアウォールルールを実際に構成してみる "}</li>
                    {" "}
                    <li>{" "}<strong>{"実運用の視点"}</strong>{": クラウド環境(VPC、セキュリティグループ、CDN)の設定を、これまで学んだレイヤー構造と対応付けて理解する "}</li>
                    {" "}
                    <li>{" "}<strong>{"最新動向の継続的キャッチアップ"}</strong>{": IETF・主要CDNベンダー(Cloudflare、Google、AWS)のブログ、APNIC BlogやISOC Pulseなどの一次情報を定期的に確認する "}</li>
                    {" "}
                </ol>
                {" "}
                <h2 id="checklist" tabIndex={-1}>{"ベストプラクティス チェックリスト"}</h2>
                {" "}
                <div className="checklist-card">
                    {" "}
                    <div className="checklist-header">
                        {" "}
                        <span className="title">{"ベストプラクティス チェックリスト"}</span>
                        <span className="count" aria-live="polite">{checked.size} / 10 完了</span>
                        {" "}
                    </div>
                    {" "}
                    <ul>
                        {" "}
                        <li>{" "}<input id="chk1" type="checkbox" checked={checked.has("chk1")} onChange={() => toggleCheck("chk1")} /><label htmlFor="chk1">{"階層モデル(OSI/TCP-IP)を使って「どの層の問題か」を切り分けられる"}</label>{" "}</li>
                        {" "}
                        <li>{" "}<input id="chk2" type="checkbox" checked={checked.has("chk2")} onChange={() => toggleCheck("chk2")} /><label htmlFor="chk2">{"カプセル化・非カプセル化の流れを、実際のパケットキャプチャと対応付けて説明できる"}</label>{" "}</li>
                        {" "}
                        <li>{" "}<input id="chk3" type="checkbox" checked={checked.has("chk3")} onChange={() => toggleCheck("chk3")} /><label htmlFor="chk3">{"CIDR表記からネットワークアドレス・ブロードキャストアドレス・利用可能ホスト数を計算できる"}</label>{" "}</li>
                        {" "}
                        <li>{" "}<input id="chk4" type="checkbox" checked={checked.has("chk4")} onChange={() => toggleCheck("chk4")} /><label htmlFor="chk4">{"TCPの3ウェイハンドシェイクと4ウェイクローズ(FIN/ACKのやり取り)を図なしで説明できる"}</label>{" "}</li>
                        {" "}
                        <li>{" "}<input id="chk5" type="checkbox" checked={checked.has("chk5")} onChange={() => toggleCheck("chk5")} /><label htmlFor="chk5">{"TCPとUDPの使い分けを、遅延・信頼性・輻輳制御の観点で判断できる"}</label>{" "}</li>
                        {" "}
                        <li>{" "}<input id="chk6" type="checkbox" checked={checked.has("chk6")} onChange={() => toggleCheck("chk6")} /><label htmlFor="chk6">{"DNSの再帰的問い合わせの流れと、TTL設定がもたらすトレードオフを理解している"}</label>{" "}</li>
                        {" "}
                        <li>{" "}<input id="chk7" type="checkbox" checked={checked.has("chk7")} onChange={() => toggleCheck("chk7")} /><label htmlFor="chk7">{"TLSハンドシェイクの流れと、証明書検証が果たす役割を説明できる"}</label>{" "}</li>
                        {" "}
                        <li>{" "}<input id="chk8" type="checkbox" checked={checked.has("chk8")} onChange={() => toggleCheck("chk8")} /><label htmlFor="chk8">{"NATがもたらす到達性の非対称性(内→外は容易、外→内は要設定)を理解している"}</label>{" "}</li>
                        {" "}
                        <li>{" "}<input id="chk9" type="checkbox" checked={checked.has("chk9")} onChange={() => toggleCheck("chk9")} /><label htmlFor="chk9">{"障害調査時に"}<code>{"ping"}</code>{"/"}<code>{"traceroute"}</code>{"/"}<code>{"dig"}</code>{"/"}<code>{"curl -v"}</code>{"/"}<code>{"tcpdump"}</code>{"を使い分けられる"}</label>{" "}</li>
                        {" "}
                        <li>{" "}<input id="chk10" type="checkbox" checked={checked.has("chk10")} onChange={() => toggleCheck("chk10")} /><label htmlFor="chk10">{"IPv6デュアルスタック、HTTP/3、耐量子TLSなど2026年時点の実装動向を把握し、自組織のロードマップに反映できる"}</label>{" "}</li>
                        {" "}
                    </ul>
                    {" "}
                </div>
                {" "}
                <h2 id="glossary" tabIndex={-1}>{"用語集"}</h2>
                {" "}
                <div className="table-scroll">
                    {" "}
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">{"用語"}{" "}</th>
                                <th scope="col">{"説明"}{" "}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>{"AS(Autonomous System)"}{" "}</td>
                                <td>{" 単一の管理ポリシーで運用されるネットワークの集合。ASNという番号で識別される "}{" "}</td>
                            </tr>
                            <tr className="even">
                                <td>{"ARP(Address Resolution Protocol)"}{" "}</td>
                                <td>{" 同一セグメント内でIPアドレスからMACアドレスを解決するプロトコル "}{" "}</td>
                            </tr>
                            <tr className="odd">
                                <td>{"BGP(Border Gateway Protocol)"}{" "}</td>
                                <td>{" 自律システム間で経路情報を交換する経路ベクトル型プロトコル。インターネットの根幹をなす "}{" "}</td>
                            </tr>
                            <tr className="even">
                                <td>{"CDN(Content Delivery Network)"}{" "}</td>
                                <td>{" コンテンツを地理的に分散配置したサーバー群から配信し、遅延と負荷を軽減する仕組み "}{" "}</td>
                            </tr>
                            <tr className="odd">
                                <td>{"CIDR(Classless Inter-Domain Routing)"}{" "}</td>
                                <td>{"クラスに縛られない可変長のIPアドレス割り当て方式"}{" "}</td>
                            </tr>
                            <tr className="even">
                                <td>{"DHCP(Dynamic Host Configuration Protocol)"}{" "}</td>
                                <td>{"端末へのIPアドレス等の自動割り当てプロトコル"}{" "}</td>
                            </tr>
                            <tr className="odd">
                                <td>{"DMZ(DeMilitarized Zone)"}{" "}</td>
                                <td>{"内部網とインターネットの間に置く緩衝ネットワーク区画"}{" "}</td>
                            </tr>
                            <tr className="even">
                                <td>{"DNS(Domain Name System)"}{" "}</td>
                                <td>{"ドメイン名とIPアドレスを対応付ける分散データベースシステム"}{" "}</td>
                            </tr>
                            <tr className="odd">
                                <td>{"ICMP(Internet Control Message Protocol)"}{" "}</td>
                                <td>{"IPの制御・エラー通知プロトコル。ping/tracerouteの基盤"}{" "}</td>
                            </tr>
                            <tr className="even">
                                <td>{"MAC アドレス"}{" "}</td>
                                <td>{"データリンク層で機器を識別するリンク層アドレス(一般的には48ビットのEUI-48。EUI-64や設定・ランダム化による値もある)"}{" "}</td>
                            </tr>
                            <tr className="odd">
                                <td>{"MTU(Maximum Transmission Unit)"}{" "}</td>
                                <td>{"次のネットワークへ送出できるIPデータグラム(ネットワーク層パケット)の最大サイズ。L2ヘッダやFCSを含むフレーム全体のサイズとは区別する"}{" "}</td>
                            </tr>
                            <tr className="even">
                                <td>{"NAT(Network Address Translation)"}{" "}</td>
                                <td>{" プライベートIPアドレスとグローバルIPアドレスを変換する仕組み "}{" "}</td>
                            </tr>
                            <tr className="odd">
                                <td>{"QUIC"}{" "}</td>
                                <td>{" UDP上に構築された、信頼性・輻輳制御・暗号化を統合した新しい輸送プロトコル。HTTP/3の基盤 "}{" "}</td>
                            </tr>
                            <tr className="even">
                                <td>{"RPKI(Resource Public Key Infrastructure)"}{" "}</td>
                                <td>{"BGP経路とAS番号の正当性を暗号署名で検証する仕組み"}{" "}</td>
                            </tr>
                            <tr className="odd">
                                <td>{"RTT(Round Trip Time)"}{" "}</td>
                                <td>{"パケットが送信されてから応答が返るまでの往復時間"}{" "}</td>
                            </tr>
                            <tr className="even">
                                <td>{"TLS(Transport Layer Security)"}{" "}</td>
                                <td>{" トランスポート層の上でデータを暗号化・認証するプロトコル。HTTPSの基盤 "}{" "}</td>
                            </tr>
                            <tr className="odd">
                                <td>{"VLAN(Virtual LAN)"}{" "}</td>
                                <td>{" 物理配線を変えずにブロードキャストドメインを論理的に分割する仕組み "}{" "}</td>
                            </tr>
                            <tr className="even">
                                <td>{"ZTNA(Zero Trust Network Access)"}{" "}</td>
                                <td>{"通信のたびに信頼性を検証する、VPNに代わるアクセス制御モデル"}{" "}</td>
                            </tr>
                        </tbody>
                    </table>
                    {" "}
                </div>
                {" "}
                <h2 id="references" tabIndex={-1}>{"参考文献"}</h2>
                {" "}
                <p><strong>{"書籍(本ガイドの構成の着想元)"}</strong></p>
                {" "}
                <div className="ref-grid">
                    {" "}
                    <div className="ref-card" id="ref1">
                        {" "}
                        <div className="num">{"1"}</div>
                        {" "}
                        <div className="txt">
                            {" Andrew S. Tanenbaum, David J. Wetherall, "}
                            <em>{"Computer Networks, Fifth Edition"}</em>
                            {" — O'Reilly: "}
                            <a href="https://www.oreilly.com/library/view/computer-networks-fifth/9780133485936/">{"https://www.oreilly.com/library/view/computer-networks-fifth/9780133485936/"}</a>
                            {" "}
                        </div>
                        {" "}
                    </div>
                    {" "}
                </div>
                {" "}
                <p><strong>{"階層モデル・基礎概念(Cloudflare Learning Center)"}</strong></p>
                {" "}
                <div className="ref-grid">
                    {" "}
                    <div className="ref-card" id="ref2">
                        {" "}
                        <div className="num">{"2"}</div>
                        {" "}
                        <div className="txt">
                            {" What is the OSI Model?: "}
                            <a href="https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/">{"https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/"}</a>
                            {" "}
                        </div>
                        {" "}
                    </div>
                    {" "}
                    <div className="ref-card" id="ref3">
                        {" "}
                        <div className="num">{"3"}</div>
                        {" "}
                        <div className="txt">
                            {" What is the network layer?: "}
                            <a href="https://www.cloudflare.com/learning/network-layer/what-is-the-network-layer/">{"https://www.cloudflare.com/learning/network-layer/what-is-the-network-layer/"}</a>
                            {" "}
                        </div>
                        {" "}
                    </div>
                    {" "}
                    <div className="ref-card" id="ref4">
                        {" "}
                        <div className="num">{"4"}</div>
                        {" "}
                        <div className="txt">
                            {" What is Layer 7?: "}
                            <a href="https://www.cloudflare.com/learning/ddos/what-is-layer-7/">{"https://www.cloudflare.com/learning/ddos/what-is-layer-7/"}</a>
                            {" "}
                        </div>
                        {" "}
                    </div>
                    {" "}
                    <div className="ref-card" id="ref5">
                        {" "}
                        <div className="num">{"5"}</div>
                        {" "}
                        <div className="txt">
                            {" Network Layers reference(Cloudflare Developers): "}
                            <a href="https://developers.cloudflare.com/fundamentals/reference/network-layers/">{"https://developers.cloudflare.com/fundamentals/reference/network-layers/"}</a>
                            {" "}
                        </div>
                        {" "}
                    </div>
                    {" "}
                </div>
                {" "}
                <p><strong>{"HTTP/Web(MDN Web Docs, Mozilla)"}</strong></p>
                {" "}
                <div className="ref-grid">
                    {" "}
                    <div className="ref-card" id="ref6">
                        {" "}
                        <div className="num">{"6"}</div>
                        {" "}
                        <div className="txt">
                            {" Overview of HTTP: "}
                            <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview">{"https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview"}</a>
                            {" "}
                        </div>
                        {" "}
                    </div>
                    {" "}
                    <div className="ref-card" id="ref7">
                        {" "}
                        <div className="num">{"7"}</div>
                        {" "}
                        <div className="txt">
                            {" Evolution of HTTP: "}
                            <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Evolution_of_HTTP">{"https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Evolution_of_HTTP"}</a>
                            {" "}
                        </div>
                        {" "}
                    </div>
                    {" "}
                </div>
                {" "}
                <p><strong>{"IETF RFC(一次規格文書)"}</strong></p>
                {" "}
                <div className="ref-grid">
                    {" "}
                    <div className="ref-card" id="ref8">
                        {" "}
                        <div className="num">{"8"}</div>
                        {" "}
                        <div className="txt">
                            {" RFC 791, Internet Protocol(IPv4): "}
                            <a href="https://www.rfc-editor.org/rfc/rfc791">{"https://www.rfc-editor.org/rfc/rfc791"}</a>
                            {" "}
                        </div>
                        {" "}
                    </div>
                    {" "}
                    <div className="ref-card" id="ref9">
                        {" "}
                        <div className="num">{"9"}</div>
                        {" "}
                        <div className="txt">
                            {" RFC 8200, Internet Protocol, Version 6 (IPv6): "}
                            <a href="https://www.rfc-editor.org/rfc/rfc8200">{"https://www.rfc-editor.org/rfc/rfc8200"}</a>
                            {" "}
                        </div>
                        {" "}
                    </div>
                    {" "}
                    <div className="ref-card" id="ref10">
                        {" "}
                        <div className="num">{"10"}</div>
                        {" "}
                        <div className="txt">
                            {" RFC 9293, Transmission Control Protocol (TCP): "}
                            <a href="https://www.rfc-editor.org/rfc/rfc9293">{"https://www.rfc-editor.org/rfc/rfc9293"}</a>
                            {" "}
                        </div>
                        {" "}
                    </div>
                    {" "}
                    <div className="ref-card" id="ref11">
                        {" "}
                        <div className="num">{"11"}</div>
                        {" "}
                        <div className="txt">
                            {" RFC 768, User Datagram Protocol (UDP): "}
                            <a href="https://www.rfc-editor.org/rfc/rfc768">{"https://www.rfc-editor.org/rfc/rfc768"}</a>
                            {" "}
                        </div>
                        {" "}
                    </div>
                    {" "}
                    <div className="ref-card" id="ref12">
                        {" "}
                        <div className="num">{"12"}</div>
                        {" "}
                        <div className="txt">
                            {" RFC 9000, QUIC: A UDP-Based Multiplexed and Secure Transport: "}
                            <a href="https://www.rfc-editor.org/rfc/rfc9000">{"https://www.rfc-editor.org/rfc/rfc9000"}</a>
                            {" "}
                        </div>
                        {" "}
                    </div>
                    {" "}
                    <div className="ref-card" id="ref13">
                        {" "}
                        <div className="num">{"13"}</div>
                        {" "}
                        <div className="txt">
                            {" RFC 9114, HTTP/3: "}
                            <a href="https://www.rfc-editor.org/rfc/rfc9114">{"https://www.rfc-editor.org/rfc/rfc9114"}</a>
                            {" "}
                        </div>
                        {" "}
                    </div>
                    {" "}
                    <div className="ref-card" id="ref14">
                        {" "}
                        <div className="num">{"14"}</div>
                        {" "}
                        <div className="txt">
                            {" RFC 8446, The Transport Layer Security (TLS) Protocol Version 1.3: "}
                            <a href="https://www.rfc-editor.org/rfc/rfc8446">{"https://www.rfc-editor.org/rfc/rfc8446"}</a>
                            {" "}
                        </div>
                        {" "}
                    </div>
                    {" "}
                    <div className="ref-card" id="ref15">
                        {" "}
                        <div className="num">{"15"}</div>
                        {" "}
                        <div className="txt">
                            {" RFC 1035, Domain Names - Implementation and Specification (DNS): "}
                            <a href="https://www.rfc-editor.org/rfc/rfc1035">{"https://www.rfc-editor.org/rfc/rfc1035"}</a>
                            {" "}
                        </div>
                        {" "}
                    </div>
                    {" "}
                    <div className="ref-card" id="ref16">
                        {" "}
                        <div className="num">{"16"}</div>
                        {" "}
                        <div className="txt">
                            {" RFC 2131, Dynamic Host Configuration Protocol (DHCP): "}
                            <a href="https://www.rfc-editor.org/rfc/rfc2131">{"https://www.rfc-editor.org/rfc/rfc2131"}</a>
                            {" "}
                        </div>
                        {" "}
                    </div>
                    {" "}
                    <div className="ref-card" id="ref17">
                        {" "}
                        <div className="num">{"17"}</div>
                        {" "}
                        <div className="txt">
                            {" RFC 1918, Address Allocation for Private Internets: "}
                            <a href="https://www.rfc-editor.org/rfc/rfc1918">{"https://www.rfc-editor.org/rfc/rfc1918"}</a>
                            {" "}
                        </div>
                        {" "}
                    </div>
                    {" "}
                </div>
                {" "}
                <p>{" "}<strong>{"2026年時点の最新動向(著名な国際組織・開発者コミュニティの一次情報)"}</strong>{" "}</p>
                {" "}
                <div className="ref-grid">
                    {" "}
                    <div className="ref-card" id="ref18">
                        {" "}
                        <div className="num">{"18"}</div>
                        {" "}
                        <div className="txt">
                            {" 18 Years Later, IPv6 Reaches Majority — Internet Society Pulse(2026年4月): "}
                            <a href="https://pulse.internetsociety.org/en/blog/2026/04/18-years-later-ipv6-reaches-majority/">{"https://pulse.internetsociety.org/en/blog/2026/04/18-years-later-ipv6-reaches-majority/"}</a>
                            {" "}
                        </div>
                        {" "}
                    </div>
                    {" "}
                    <div className="ref-card" id="ref19">
                        {" "}
                        <div className="num">{"19"}</div>
                        {" "}
                        <div className="txt">
                            {" Google hits 50% IPv6 — APNIC Blog(2026年4月): "}
                            <a href="https://blog.apnic.net/2026/04/28/google-hits-50-ipv6/">{"https://blog.apnic.net/2026/04/28/google-hits-50-ipv6/"}</a>
                            {" "}
                        </div>
                        {" "}
                    </div>
                    {" "}
                    <div className="ref-card" id="ref20">
                        {" "}
                        <div className="num">{"20"}</div>
                        {" "}
                        <div className="txt">
                            {" Cloudflare Radar 2025 Year in Review(HTTPバージョン分布、IPv6採用率、RPKI経路検証率、DDoS規模の推移を含む): "}
                            <a href="https://radar.cloudflare.com/year-in-review/2025">{"https://radar.cloudflare.com/year-in-review/2025"}</a>
                            {" "}
                        </div>
                        {" "}
                    </div>
                    {" "}
                    <div className="ref-card" id="ref21">
                        {" "}
                        <div className="num">{"21"}</div>
                        {" "}
                        <div className="txt">
                            {" State of the post-quantum Internet in 2025 — Cloudflare Blog: "}
                            <a href="https://blog.cloudflare.com/pq-2025/">{"https://blog.cloudflare.com/pq-2025/"}</a>
                            {" "}
                        </div>
                        {" "}
                    </div>
                    {" "}
                    <div className="ref-card" id="ref22">
                        {" "}
                        <div className="num">{"22"}</div>
                        {" "}
                        <div className="txt">
                            {" Post-quantum cryptography (PQC) — Cloudflare SSL/TLS Documentation: "}
                            <a href="https://developers.cloudflare.com/ssl/post-quantum-cryptography/">{"https://developers.cloudflare.com/ssl/post-quantum-cryptography/"}</a>
                            {" "}
                        </div>
                        {" "}
                    </div>
                    {" "}
                    <div className="ref-card" id="ref23">
                        {" "}
                        <div className="num">{"23"}</div>
                        {" "}
                        <div className="txt">
                            {" Automatically Secure: how we upgraded 6,000,000 domains by default — Cloudflare Blog: "}
                            <a href="https://blog.cloudflare.com/automatically-secure/">{"https://blog.cloudflare.com/automatically-secure/"}</a>
                            {" "}
                        </div>
                        {" "}
                    </div>
                    {" "}
                    <div className="ref-card" id="ref24">
                        {" "}
                        <div className="num">{"24"}</div>
                        {" "}
                        <div className="txt">
                            {" HTTP/3 (with QUIC) — Cloudflare Speed Documentation: "}
                            <a href="https://developers.cloudflare.com/speed/optimization/protocol/http3/">{"https://developers.cloudflare.com/speed/optimization/protocol/http3/"}</a>
                            {" "}
                        </div>
                        {" "}
                    </div>
                    {" "}
                    <div className="ref-card" id="ref25">
                        {" "}
                        <div className="num">{"25"}</div>
                        {" "}
                        <div className="txt">
                            {" Wi-Fi 8 in 2026: Next-gen wireless standard prioritizes reliability over speed gains — Network World: "}
                            <a href="https://www.networkworld.com/article/4112600/wi-fi-8-in-2026-next-gen-wireless-standard-prioritizes-reliability-over-speed-gains.html">{"https://www.networkworld.com/article/4112600/wi-fi-8-in-2026-next-gen-wireless-standard-prioritizes-reliability-over-speed-gains.html"}</a>
                            {" "}
                        </div>
                        {" "}
                    </div>
                    {" "}
                    <div className="ref-card" id="ref26">
                        {" "}
                        <div className="num">{"26"}</div>
                        {" "}
                        <div className="txt">
                            {" Wi-Fi 7 (802.11be) Technical Guide — Cisco Meraki Documentation: "}
                            <a href="https://documentation.meraki.com/Wireless/Design_and_Configure/Architecture_and_Best_Practices/Wi-Fi_7_(802.11be)_Technical_Guide">{"https://documentation.meraki.com/Wireless/Design_and_Configure/Architecture_and_Best_Practices/Wi-Fi_7_(802.11be)_Technical_Guide"}</a>
                            {" "}
                        </div>
                        {" "}
                    </div>
                    {" "}
                </div>
                {" "}
                <hr />
                {" "}
                <p>{" "}<em>{"本ガイドはTanenbaum & Wetherall著『Computer Networks, Fifth Edition』の学習順序(物理層から積み上げていく構造化アプローチ)に着想を得つつ、2026年9月時点の最新動向を交えて独自に再構成した教材です。原著からの文章・図版の引用・複製は行っていません。"}</em>{" "}</p>
                {" "}
            </main>
            </div>
        </div>
    );
}
