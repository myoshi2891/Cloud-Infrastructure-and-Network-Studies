'use client';

import React from 'react';
import { Diagram } from '../Diagram';
import { useState } from "react";

export function SectionAppendix() {
    const [checkedIds, setCheckedIds] = useState<Set<string>>(() => new Set());
    const toggleCheck = (id: string) => {
        setCheckedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id); else next.add(id);
            return next;
        });
    };
    return (
        <>
            <h2 id="roadmap" tabIndex={-1}>学習ロードマップ</h2>
            <p>初学者が本書の内容を段階的に消化するための、5段階の学習パスを提案します。</p>
            <Diagram id="diag-34" label="初学者が本書の内容を段階的に消化するための、5段階の学習パスを提案します。" />
            <div className="table-scroll" tabIndex={0} role="region" aria-label="学習ロードマップ：5段階の学習ステージと目安期間">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">ステージ</th>
                                <th scope="col">目安期間</th>
                                <th scope="col">ゴール</th>
                                <th scope="col">実践課題例</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>1. 基礎固め</td>
                                <td>1週間</td>
                                <td>レイヤモデルとIPv4/IPv6アドレッシングを図なしで説明できる</td>
                                <td>サブネッティング計算を手計算で複数パターン解く</td>
                            </tr>
                            <tr className="even">
                                <td>2. ローカルネットワーク</td>
                                <td>2週間</td>
                                <td>
                                    自宅LANの通信を<code>tcpdump</code>でARP→DHCP→通信の順に追える
                                </td>
                                <td>自宅ルータの配下でARPキャッシュ・DHCPリースを実際に観察する</td>
                            </tr>
                            <tr className="odd">
                                <td>3. トランスポートとアプリ</td>
                                <td>2週間</td>
                                <td>3ウェイハンドシェイクとDNS名前解決の流れを図示できる</td>
                                <td>
                                    <code>dig +trace</code>で反復的問い合わせの過程を実際にたどる
                                </td>
                            </tr>
                            <tr className="even">
                                <td>4. 性能とセキュリティ</td>
                                <td>2〜3週間</td>
                                <td>輻輳制御の基本挙動とTLSハンドシェイクの流れを説明できる</td>
                                <td><code>openssl s_client</code>でTLSハンドシェイクを観察する</td>
                            </tr>
                            <tr className="odd">
                                <td>5. 最新動向</td>
                                <td>継続的</td>
                                <td>各RFCやベンダーブログを定期的に追える状態を作る</td>
                                <td>
                                    IETF Datatracker・Cloudflare Radar・APNIC
                                    Blogを定期チェックする習慣化
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            <hr />
            <h2 id="checklist" tabIndex={-1}>章末チェックリスト</h2>
            <div className="checklist-card">
                    <div className="checklist-header">
                        <span className="title">章末チェックリスト</span><span className="count">{checkedIds.size} / 26 完了</span>
                    </div>
                    <ul>
                        <li>
                            <input id="chk1" type="checkbox" checked={checkedIds.has("chk1")} onChange={() => toggleCheck("chk1")} /><label htmlFor="chk1">end-to-endの原則とfate sharingの違いを自分の言葉で説明できる</label>
                        </li>
                        <li>
                            <input id="chk2" type="checkbox" checked={checkedIds.has("chk2")} onChange={() => toggleCheck("chk2")} /><label htmlFor="chk2">カプセル化・多重化・多重分離の3つの用語を区別して使える</label>
                        </li>
                        <li>
                            <input id="chk3" type="checkbox" checked={checkedIds.has("chk3")} onChange={() => toggleCheck("chk3")} /><label htmlFor="chk3">CIDR表記からネットワーク部・ホスト部・利用可能アドレス数を計算できる</label>
                        </li>
                        <li>
                            <input id="chk4" type="checkbox" checked={checkedIds.has("chk4")} onChange={() => toggleCheck("chk4")} /><label htmlFor="chk4">IPv4プライベートアドレスとCGNAT共有アドレス（100.64.0.0/10）の違いを説明できる</label>
                        </li>
                        <li>
                            <input id="chk5" type="checkbox" checked={checkedIds.has("chk5")} onChange={() => toggleCheck("chk5")} /><label htmlFor="chk5">IPv6アドレスのスコープ（グローバル・リンクローカル・ULA）を区別できる</label>
                        </li>
                        <li>
                            <input id="chk6" type="checkbox" checked={checkedIds.has("chk6")} onChange={() => toggleCheck("chk6")} /><label htmlFor="chk6">イーサネットフレームの構造とMTUの意味を説明できる</label>
                        </li>
                        <li>
                            <input id="chk7" type="checkbox" checked={checkedIds.has("chk7")} onChange={() => toggleCheck("chk7")} /><label htmlFor="chk7">ARPの動作とARPスプーフィングへの対策（DAI等）を説明できる</label>
                        </li>
                        <li>
                            <input id="chk8" type="checkbox" checked={checkedIds.has("chk8")} onChange={() => toggleCheck("chk8")} /><label htmlFor="chk8">IPv6ではARPの代わりに何が使われるか説明できる</label>
                        </li>
                        <li>
                            <input id="chk9" type="checkbox" checked={checkedIds.has("chk9")} onChange={() => toggleCheck("chk9")} /><label htmlFor="chk9">IPv4ヘッダの主要フィールド（TTL, Protocol,
                                Flags等）の役割を説明できる</label>
                        </li>
                        <li>
                            <input id="chk10" type="checkbox" checked={checkedIds.has("chk10")} onChange={() => toggleCheck("chk10")} /><label htmlFor="chk10">Path MTU
                                Discoveryの仕組みとPMTUDブラックホール問題を説明できる</label>
                        </li>
                        <li>
                            <input id="chk11" type="checkbox" checked={checkedIds.has("chk11")} onChange={() => toggleCheck("chk11")} /><label htmlFor="chk11">DHCPのDORAプロセスを図示できる</label>
                        </li>
                        <li>
                            <input id="chk12" type="checkbox" checked={checkedIds.has("chk12")} onChange={() => toggleCheck("chk12")} /><label htmlFor="chk12">SLAACとDHCPv6の使い分けを説明できる</label>
                        </li>
                        <li>
                            <input id="chk13" type="checkbox" checked={checkedIds.has("chk13")} onChange={() => toggleCheck("chk13")} /><label htmlFor="chk13">NATとCGNAT（NAT444）の違い、NAT64/DNS64の役割を説明できる</label>
                        </li>
                        <li>
                            <input id="chk14" type="checkbox" checked={checkedIds.has("chk14")} onChange={() => toggleCheck("chk14")} /><label htmlFor="chk14">ICMPの主要メッセージタイプと<code>traceroute</code>の仕組みを説明できる</label>
                        </li>
                        <li>
                            <input id="chk15" type="checkbox" checked={checkedIds.has("chk15")} onChange={() => toggleCheck("chk15")} /><label htmlFor="chk15">IGMP/MLDがマルチキャスト配送で果たす役割を説明できる</label>
                        </li>
                        <li>
                            <input id="chk16" type="checkbox" checked={checkedIds.has("chk16")} onChange={() => toggleCheck("chk16")} /><label htmlFor="chk16">UDPヘッダの構造とIPフラグメンテーションのリスクを説明できる</label>
                        </li>
                        <li>
                            <input id="chk17" type="checkbox" checked={checkedIds.has("chk17")} onChange={() => toggleCheck("chk17")} /><label htmlFor="chk17">DNSの再帰的問い合わせと反復的問い合わせの違いを説明できる</label>
                        </li>
                        <li>
                            <input id="chk18" type="checkbox" checked={checkedIds.has("chk18")} onChange={() => toggleCheck("chk18")} /><label htmlFor="chk18">TCPヘッダの主要フィールドとMSS/Window
                                Scale/SACKオプションの役割を説明できる</label>
                        </li>
                        <li>
                            <input id="chk19" type="checkbox" checked={checkedIds.has("chk19")} onChange={() => toggleCheck("chk19")} /><label htmlFor="chk19">TCPの3ウェイハンドシェイクと状態遷移図（少なくとも主要状態）を説明できる</label>
                        </li>
                        <li>
                            <input id="chk20" type="checkbox" checked={checkedIds.has("chk20")} onChange={() => toggleCheck("chk20")} /><label htmlFor="chk20">SYNフラッド攻撃とSYN Cookiesの仕組みを説明できる</label>
                        </li>
                        <li>
                            <input id="chk21" type="checkbox" checked={checkedIds.has("chk21")} onChange={() => toggleCheck("chk21")} /><label htmlFor="chk21">RTOの動的計算と高速再送・SACKの違いを説明できる</label>
                        </li>
                        <li>
                            <input id="chk22" type="checkbox" checked={checkedIds.has("chk22")} onChange={() => toggleCheck("chk22")} /><label htmlFor="chk22">フロー制御と輻輳制御の違いを説明できる</label>
                        </li>
                        <li>
                            <input id="chk23" type="checkbox" checked={checkedIds.has("chk23")} onChange={() => toggleCheck("chk23")} /><label htmlFor="chk23">スロースタート・輻輳回避・CUBIC・BBRの違いを説明できる</label>
                        </li>
                        <li>
                            <input id="chk24" type="checkbox" checked={checkedIds.has("chk24")} onChange={() => toggleCheck("chk24")} /><label htmlFor="chk24">TCPキープアライブとクラウドのアイドルタイムアウトの関係を説明できる</label>
                        </li>
                        <li>
                            <input id="chk25" type="checkbox" checked={checkedIds.has("chk25")} onChange={() => toggleCheck("chk25")} /><label htmlFor="chk25">EAP・IPsec・TLS・DNSSEC・DKIMがそれぞれどの層を保護するか説明できる</label>
                        </li>
                        <li>
                            <input id="chk26" type="checkbox" checked={checkedIds.has("chk26")} onChange={() => toggleCheck("chk26")} /><label htmlFor="chk26">2026年時点のIPv6普及率・BGP
                                RPKI普及率・ポスト量子TLS普及率のおおまかな水準を説明できる</label>
                        </li>
                    </ul>
                </div>
            <hr />
            <h2 id="glossary" tabIndex={-1}>用語集</h2>
            <div className="table-scroll" tabIndex={0} role="region" aria-label="用語集">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">用語</th>
                                <th scope="col">説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>ARP</td>
                                <td>
                                    Address Resolution
                                    Protocol。IPアドレスからMACアドレスを解決するプロトコル（IPv4のみ）
                                </td>
                            </tr>
                            <tr className="even">
                                <td>BBR</td>
                                <td>
                                    Bottleneck Bandwidth and
                                    RTT。帯域・RTTのモデル推定に基づく輻輳制御アルゴリズム
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>BDP</td>
                                <td>
                                    Bandwidth-Delay
                                    Product（帯域遅延積）。帯域幅×RTTで求まる、経路上に存在しうるデータ量の目安
                                </td>
                            </tr>
                            <tr className="even">
                                <td>CGNAT</td>
                                <td>
                                    Carrier-Grade
                                    NAT。ISPが自社網内で行うNAT。NAT444構成の一部を成す
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>CIDR</td>
                                <td>
                                    Classless Inter-Domain
                                    Routing。可変長プレフィックスによるアドレッシング方式
                                </td>
                            </tr>
                            <tr className="even">
                                <td>cwnd</td>
                                <td>
                                    congestion
                                    window（輻輳ウィンドウ）。輻輳制御が管理する送信可能量の内部変数
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>DHCP</td>
                                <td>
                                    Dynamic Host Configuration
                                    Protocol。IPアドレス等の自動配布プロトコル
                                </td>
                            </tr>
                            <tr className="even">
                                <td>DNSSEC</td>
                                <td>
                                    DNS Security
                                    Extensions。DNS応答に電子署名を付与し改ざんを検知する拡張
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>ECN</td>
                                <td>
                                    Explicit Congestion
                                    Notification。パケット破棄せず輻輳をマークで通知する仕組み
                                </td>
                            </tr>
                            <tr className="even">
                                <td>end-to-endの原則</td>
                                <td>
                                    複雑な処理は通信の両端に置き、中間ノードはシンプルに保つという設計思想
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>ICMP</td>
                                <td>
                                    Internet Control Message
                                    Protocol。IPのエラー通知・診断用プロトコル
                                </td>
                            </tr>
                            <tr className="even">
                                <td>IGMP/MLD</td>
                                <td>
                                    マルチキャストグループへの加入をホストがルータに伝えるプロトコル（IPv4/IPv6）
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>IPsec</td>
                                <td>
                                    IPパケット自体を暗号化・認証するネットワーク層セキュリティプロトコル群
                                </td>
                            </tr>
                            <tr className="even">
                                <td>MSS</td>
                                <td>Maximum Segment Size。TCPが1セグメントで運べる最大データ量</td>
                            </tr>
                            <tr className="odd">
                                <td>MTU</td>
                                <td>
                                    Maximum Transmission
                                    Unit。リンク層が1フレームで運べるパケット（IPデータグラム等）の最大サイズ。Ethernetフレーム全体はこれに加えてヘッダとFCSを含む
                                </td>
                            </tr>
                            <tr className="even">
                                <td>NAT</td>
                                <td>
                                    Network Address
                                    Translation。IPアドレス（とポート）を変換する仕組み
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>NDP</td>
                                <td>
                                    Neighbor Discovery
                                    Protocol。IPv6でARP相当の役割を果たすICMPv6ベースの仕組み
                                </td>
                            </tr>
                            <tr className="even">
                                <td>PMTUD</td>
                                <td>Path MTU Discovery。経路上の最小MTUを事前に検出する仕組み</td>
                            </tr>
                            <tr className="odd">
                                <td>RPKI</td>
                                <td>
                                    Resource Public Key
                                    Infrastructure。BGP経路の正当性を暗号学的に検証する基盤
                                </td>
                            </tr>
                            <tr className="even">
                                <td>RTO</td>
                                <td>Retransmission Timeout。TCPが再送を判断するまでの待機時間</td>
                            </tr>
                            <tr className="odd">
                                <td>SACK</td>
                                <td>
                                    Selective
                                    Acknowledgment。受信済み範囲を選択的に通知するTCPオプション
                                </td>
                            </tr>
                            <tr className="even">
                                <td>SLAAC</td>
                                <td>
                                    Stateless Address
                                    Autoconfiguration。IPv6のステートレスなアドレス自動設定
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>SYN Cookies</td>
                                <td>
                                    SYNフラッド攻撃対策として、接続状態をシーケンス番号に符号化する手法
                                </td>
                            </tr>
                            <tr className="even">
                                <td>TIME_WAIT</td>
                                <td>
                                    TCPコネクション終了後、古いセグメントの混同を防ぐため一定時間待機する状態
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>TLS</td>
                                <td>
                                    Transport Layer
                                    Security。TCPの上でアプリケーション通信を暗号化するプロトコル
                                </td>
                            </tr>
                            <tr className="even">
                                <td>VLSM</td>
                                <td>
                                    Variable Length Subnet
                                    Mask。用途ごとに異なる長さでサブネット化する手法
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>WireGuard</td>
                                <td>
                                    軽量な実装を特徴とする比較的新しいVPNプロトコル。Linuxカーネルに統合済み
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            <hr />
            <h2 id="references" tabIndex={-1}>参考文献</h2>
            <p>
                    原著情報および、原著刊行後の進展について調査した情報源（2026年8月30日時点でWeb検索により確認）を掲載します。一次情報源は1〜5・12・14・17・32〜34（出版社ページ・RFC・IETF文書・公的機関や事業者の公式発表）で、それ以外は解説記事・ベンダーブログ・百科事典などの二次情報源です。
                </p>
            <div className="ref-grid" id="referenceGrid">
                    <div className="ref-card" id="ref1">
                        <div className="num">1</div>
                        <div className="txt">
                            O&apos;Reilly Media. &quot;TCP/IP Illustrated, Volume 1: The Protocols, 2nd
                            Edition&quot; 書籍ページ.
                            <a href="https://www.oreilly.com/library/view/tcp-ip-illustrated-volume/9780132808200/">https://www.oreilly.com/library/view/tcp-ip-illustrated-volume/9780132808200/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref2">
                        <div className="num">2</div>
                        <div className="txt">
                            O&apos;Reilly Media. 同書 目次（Contents）ページ.
                            <a href="https://www.oreilly.com/library/view/tcp-ip-illustrated-volume/9780132808200/toc.xhtml">https://www.oreilly.com/library/view/tcp-ip-illustrated-volume/9780132808200/toc.xhtml</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref3">
                        <div className="num">3</div>
                        <div className="txt">
                            IETF RFC Editor. &quot;RFC 9293: Transmission Control Protocol (TCP)&quot;
                            (2022年8月, STD 7).
                            <a href="https://www.rfc-editor.org/info/rfc9293/">https://www.rfc-editor.org/info/rfc9293/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref4">
                        <div className="num">4</div>
                        <div className="txt">
                            IETF Datatracker. &quot;RFC 9293&quot; 文書詳細ページ.
                            <a href="https://datatracker.ietf.org/doc/rfc9293/">https://datatracker.ietf.org/doc/rfc9293/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref5">
                        <div className="num">5</div>
                        <div className="txt">
                            IETF RFC Editor. &quot;RFC 9438: CUBIC for Fast and Long-Distance Networks&quot;
                            (2023年8月).
                            <a href="https://www.rfc-editor.org/info/rfc9438/">https://www.rfc-editor.org/info/rfc9438/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref6">
                        <div className="num">6</div>
                        <div className="txt">
                            Forasoft. &quot;Congestion Control in Plain English: BBR, CUBIC, Copa, and
                            Why It Matters&quot;.
                            <a href="https://www.forasoft.com/learn/video-streaming/articles-streaming/congestion-control-bbr-cubic-copa">https://www.forasoft.com/learn/video-streaming/articles-streaming/congestion-control-bbr-cubic-copa</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref7">
                        <div className="num">7</div>
                        <div className="txt">
                            arXiv. &quot;TCP ROCCET&quot; 論文内
                            BBRv3参照（Google公式GitHubリリースnoteを引用）.
                            <a href="https://arxiv.org/pdf/2510.25281">https://arxiv.org/pdf/2510.25281</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref8">
                        <div className="num">8</div>
                        <div className="txt">
                            A10 Networks. &quot;What is CGNAT? Carrier-Grade NAT Explained&quot;.
                            <a href="https://www.a10networks.com/glossary/what-is-carrier-grade-nat-cgn-cgnat/">https://www.a10networks.com/glossary/what-is-carrier-grade-nat-cgn-cgnat/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref9">
                        <div className="num">9</div>
                        <div className="txt">
                            Wikipedia. &quot;NAT64&quot;.
                            <a href="https://en.wikipedia.org/wiki/NAT64">https://en.wikipedia.org/wiki/NAT64</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref10">
                        <div className="num">10</div>
                        <div className="txt">
                            APNIC Blog. &quot;Towards an industry best practice for DNSSEC automation&quot;
                            (2026年2月).
                            <a href="https://blog.apnic.net/2026/02/25/towards-an-industry-best-practice-for-dnssec-automation/">https://blog.apnic.net/2026/02/25/towards-an-industry-best-practice-for-dnssec-automation/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref11">
                        <div className="num">11</div>
                        <div className="txt">
                            TechnologyChecker.io. &quot;DNSSEC Adoption in 2026&quot; (2026年4月).
                            <a href="https://technologychecker.io/blog/dnssec-adoption">https://technologychecker.io/blog/dnssec-adoption</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref12">
                        <div className="num">12</div>
                        <div className="txt">
                            欧州委員会共同研究センター(JRC). &quot;Internet Standards: DNSSEC standards -
                            an analysis of uptake in the EU&quot;.
                            <a href="https://ec.europa.eu/internet-standards/publications.html">https://ec.europa.eu/internet-standards/publications.html</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref13">
                        <div className="num">13</div>
                        <div className="txt">
                            Sujeet Jaiswal (Principal Software Engineer). &quot;DNS Security and Privacy:
                            DNSSEC, DoH, and DoT&quot; (2026年4月、Encrypted Client Hello / RFC
                            9849に言及).
                            <a href="https://sujeet.pro/articles/dns-security-doh-dot-dnssec">https://sujeet.pro/articles/dns-security-doh-dot-dnssec</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref14">
                        <div className="num">14</div>
                        <div className="txt">
                            IETF Datatracker. &quot;draft-ietf-tls-ecdhe-mlkem&quot;
                            ポスト量子ハイブリッド鍵交換ドラフト.
                            <a href="https://datatracker.ietf.org/doc/draft-ietf-tls-ecdhe-mlkem/">https://datatracker.ietf.org/doc/draft-ietf-tls-ecdhe-mlkem/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref15">
                        <div className="num">15</div>
                        <div className="txt">
                            EverTrust. &quot;Hybrid Post-Quantum Certificates&quot; (2026年6月、Cloudflare
                            Radarデータ引用).
                            <a href="https://evertrust.io/blog/hybrid-post-quantum-certificates/">https://evertrust.io/blog/hybrid-post-quantum-certificates/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref16">
                        <div className="num">16</div>
                        <div className="txt">
                            Steven P.G. &quot;The Ultimate Guide to Post-Quantum Cryptography and TLS
                            1.3&quot; (2026年7月).
                            <a href="https://stevenpg.com/posts/ultimate-guide-post-quantum-cryptography-tls/">https://stevenpg.com/posts/ultimate-guide-post-quantum-cryptography-tls/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref17">
                        <div className="num">17</div>
                        <div className="txt">
                            Cloudflare Blog. &quot;Cloudflare One is the first SASE offering modern
                            post-quantum encryption across the full platform&quot; (2026年2月).
                            <a href="https://blog.cloudflare.com/post-quantum-sase/">https://blog.cloudflare.com/post-quantum-sase/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref18">
                        <div className="num">18</div>
                        <div className="txt">
                            InfoQ. &quot;Standardizing Post-Quantum IPsec: Cloudflare Adopts Hybrid
                            ML-KEM&quot; (2026年3月).
                            <a href="https://www.infoq.com/news/2026/03/cloudflare-post-quantum-ipsec">https://www.infoq.com/news/2026/03/cloudflare-post-quantum-ipsec</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref19">
                        <div className="num">19</div>
                        <div className="txt">
                            Kentik Blog（Doug Madory氏）／MANRS. &quot;RPKI ROV Deployment Reaches Major
                            Milestone&quot; (2024年5月).
                            <a href="https://manrs.org/2024/05/rpki-rov-deployment-reaches-major-milestone/">https://manrs.org/2024/05/rpki-rov-deployment-reaches-major-milestone/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref20">
                        <div className="num">20</div>
                        <div className="txt">
                            ipregistry.co. &quot;RPKI Covers 67% of Routes, But Four Attack Classes Slip
                            Right Past It&quot;（Hurricane Electric・RIPE Labs Antonio
                            Prado氏の分析を引用、2026年7月）.
                            <a href="https://ipregistry.co/blog/rpki-blind-spots/">https://ipregistry.co/blog/rpki-blind-spots/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref21">
                        <div className="num">21</div>
                        <div className="txt">
                            SIDN. &quot;Adoption of RPKI/ROV security protocol progressing very
                            quickly&quot;（Job Snijders氏の年次調査を引用）.
                            <a href="https://www.sidn.nl/en/news-and-blogs/adoption-of-rpki-rov-security-protocol-progressing-very-quickly">https://www.sidn.nl/en/news-and-blogs/adoption-of-rpki-rov-security-protocol-progressing-very-quickly</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref22">
                        <div className="num">22</div>
                        <div className="txt">
                            APNIC Blog. &quot;Google hits 50% IPv6&quot; (2026年4月).
                            <a href="https://blog.apnic.net/2026/04/28/google-hits-50-ipv6/">https://blog.apnic.net/2026/04/28/google-hits-50-ipv6/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref23">
                        <div className="num">23</div>
                        <div className="txt">
                            Internet Society (ISOC) Pulse. &quot;18 Years Later, IPv6 Reaches Majority&quot;
                            (2026年4月).
                            <a href="https://pulse.internetsociety.org/en/blog/2026/04/18-years-later-ipv6-reaches-majority/">https://pulse.internetsociety.org/en/blog/2026/04/18-years-later-ipv6-reaches-majority/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref24">
                        <div className="num">24</div>
                        <div className="txt">
                            oneuptime.com. &quot;How to Set Up IPv6 SLAAC vs DHCPv6 for Address
                            Assignment&quot; (2026年1月).
                            <a href="https://oneuptime.com/blog/post/2026-01-08-ipv6-slaac-dhcpv6/view">https://oneuptime.com/blog/post/2026-01-08-ipv6-slaac-dhcpv6/view</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref25">
                        <div className="num">25</div>
                        <div className="txt">
                            rule11.tech. &quot;SLAAC and DHCPv6&quot;（RFC 8156
                            DHCPv6フェイルオーバーに言及）.
                            <a href="https://rule11.tech/slaac-and-dhcpv6/">https://rule11.tech/slaac-and-dhcpv6/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref26">
                        <div className="num">26</div>
                        <div className="txt">
                            RunCloud. &quot;HTTP/2 vs HTTP/3: What Every Web Server Owner Needs to Know
                            2026&quot;（Cloudflare Radarデータ引用）.
                            <a href="https://runcloud.io/blog/http2-vs-http3">https://runcloud.io/blog/http2-vs-http3</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref27">
                        <div className="num">27</div>
                        <div className="txt">
                            technologychecker.io. &quot;We analyzed HTTP protocol adoption in
                            2026&quot;（Cloudflare Radarデータの独自分析、2026年8月取得時点）.
                            <a href="https://technologychecker.io/blog/http-protocol-adoption">https://technologychecker.io/blog/http-protocol-adoption</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref28">
                        <div className="num">28</div>
                        <div className="txt">
                            WundertechNet. &quot;WireGuard vs. IPsec: Side-by-Side Comparison (2026)&quot;.
                            <a href="https://www.wundertech.net/wireguard-vs-ipsec/">https://www.wundertech.net/wireguard-vs-ipsec/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref29">
                        <div className="num">29</div>
                        <div className="txt">
                            QuickZTNA Blog. &quot;WireGuard vs OpenVPN vs IPsec: A 2026 Engineering
                            Comparison&quot;（RFC 9518に言及）.
                            <a href="https://www.quickztna.com/blog/wireguard-vs-openvpn-vs-ipsec/">https://www.quickztna.com/blog/wireguard-vs-openvpn-vs-ipsec/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref30">
                        <div className="num">30</div>
                        <div className="txt">
                            oneuptime.com. &quot;How to Prevent ARP Poisoning with Dynamic ARP
                            Inspection&quot; (2026年3月).
                            <a href="https://oneuptime.com/blog/post/2026-03-20-prevent-arp-poisoning-dai/view">https://oneuptime.com/blog/post/2026-03-20-prevent-arp-poisoning-dai/view</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref31">
                        <div className="num">31</div>
                        <div className="txt">
                            network-switch.com. &quot;How Address Resolution Works 2026, Security Risks,
                            and Best Practices&quot;.
                            <a href="https://network-switch.com/blogs/networking/what-is-arp-in-2026">https://network-switch.com/blogs/networking/what-is-arp-in-2026</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref32">
                        <div className="num">32</div>
                        <div className="txt">
                            AWS Networking & Content Delivery Blog. &quot;Best Practices for TCP
                            Connection Management on EC2&quot; (2026年6月、Nitro
                            V6アイドルタイムアウト変更に言及).
                            <a href="https://aws.amazon.com/blogs/networking-and-content-delivery/best-practices-for-tcp-connection-management-on-ec2/">https://aws.amazon.com/blogs/networking-and-content-delivery/best-practices-for-tcp-connection-management-on-ec2/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref33">
                        <div className="num">33</div>
                        <div className="txt">
                            AWS What&apos;s New. &quot;AWS Network Load Balancer now supports configurable TCP
                            idle timeout&quot; (2024年9月).
                            <a href="https://aws.amazon.com/about-aws/whats-new/2024/09/aws-network-load-balancer-tcp-idle-timeout/">https://aws.amazon.com/about-aws/whats-new/2024/09/aws-network-load-balancer-tcp-idle-timeout/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref34">
                        <div className="num">34</div>
                        <div className="txt">
                            Microsoft Learn. &quot;Configure TCP reset and idle timeout for Azure Load
                            Balancer&quot;.
                            <a href="https://learn.microsoft.com/sr-latn-rs/azure/load-balancer/load-balancer-tcp-idle-timeout">https://learn.microsoft.com/sr-latn-rs/azure/load-balancer/load-balancer-tcp-idle-timeout</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref35">
                        <div className="num">35</div>
                        <div className="txt">
                            IronWiFi Blog. &quot;Wi-Fi 7 for Enterprise Networks: 802.11be Guide&quot;
                            (2026年3月).
                            <a href="https://www.ironwifi.com/blogs/wifi-7-enterprise-guide/">https://www.ironwifi.com/blogs/wifi-7-enterprise-guide/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref36">
                        <div className="num">36</div>
                        <div className="txt">
                            vcom.hk. &quot;Wi-Fi 7 Final Standard Released — What It Means for
                            Connectivity in 2026&quot; (2026年1月、IEEE/Wi-Fi
                            Alliance最終標準発行に言及).
                            <a href="https://www.vcom.hk/blogs/news/wi-fi-7-ieee-802-11be-final-standard-released-what-it-means-for-connectivity-in-2026-and-beyond">https://www.vcom.hk/blogs/news/wi-fi-7-ieee-802-11be-final-standard-released-what-it-means-for-connectivity-in-2026-and-beyond</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref37">
                        <div className="num">37</div>
                        <div className="txt">
                            opelink.com. &quot;Enterprise LAN Fiber Network Guide 2026&quot;（IEEE 802.3df
                            800GbE標準化に言及）.
                            <a href="https://www.opelink.com/article/enterprise-lan-fiber-network-planning-implementation-guide-i01465i1.html">https://www.opelink.com/article/enterprise-lan-fiber-network-planning-implementation-guide-i01465i1.html</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref38">
                        <div className="num">38</div>
                        <div className="txt">
                            btw.media. &quot;The &apos;father of the internet&apos;: Interview with Vint Cerf&quot;
                            (2026年6月).
                            <a href="https://btw.media/en/the-father-of-the-internet-interview-with-vint-cerf">https://btw.media/en/the-father-of-the-internet-interview-with-vint-cerf</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref39">
                        <div className="num">39</div>
                        <div className="txt">
                            Data Center Dynamics. &quot;Vint Cerf&apos;s Interplanetary ambitions&quot;
                            (2026年7月).
                            <a href="https://www.datacenterdynamics.com/en/analysis/vint-cerfs-interplanetary-ambitions/">https://www.datacenterdynamics.com/en/analysis/vint-cerfs-interplanetary-ambitions/</a>
                        </div>
                    </div>
                </div>
            <hr />
            <p>
                    <em>本ガイドは学習補助を目的として独自に作成したものであり、原著の文章・図版を複製したものではありません。正確な内容は必ず原著（および記載の一次情報源）をご確認ください。</em>
                </p>
        </>
    );
}
