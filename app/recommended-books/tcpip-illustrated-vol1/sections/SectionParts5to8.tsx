'use client';

import React from 'react';
import { Diagram } from '../Diagram';


export function SectionParts5to8() {
    return (
        <>
            <h2 id="part5">
                    第5部：インターネットプロトコル IP（原著第5章 The Internet Protocol）
                </h2>
            <h3 id="s5-1">5.1 IPの基本的な性質</h3>
            <p>
                    IPは「ベストエフォート・コネクションレス・非信頼」なデータグラム配送サービスです。
                </p>
            <ul>
                    <li>
                        <strong>ベストエフォート</strong>：配送を最善努力するが保証しない（届かない可能性がある）。
                    </li>
                    <li>
                        <strong>コネクションレス</strong>：各パケットは独立して扱われ、事前のコネクション確立を必要としない。
                    </li>
                    <li>
                        <strong>非信頼</strong>：パケットの損失・重複・順序入れ替えを検出・訂正する責務を持たない（上位層に委ねる）。
                    </li>
                </ul>
            <p>
                    この「シンプルさに徹する」設計が、IPが多種多様な下位リンク層技術（イーサネット、Wi-Fi、衛星回線、モバイル網）の上で動作できる汎用性の源泉です。
                </p>
            <h3 id="s5-2">5.2 IPv4ヘッダの構造</h3>
            <div className="table-scroll" tabIndex={0} role="region" aria-label="5.2 IPv4ヘッダの構造">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">フィールド</th>
                                <th scope="col">ビット幅</th>
                                <th scope="col">役割</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>Version</td>
                                <td>4</td>
                                <td>IPバージョン（IPv4なら4）</td>
                            </tr>
                            <tr className="even">
                                <td>IHL</td>
                                <td>4</td>
                                <td>ヘッダ長（32bitワード単位）</td>
                            </tr>
                            <tr className="odd">
                                <td>DSCP/ECN</td>
                                <td>8</td>
                                <td>優先度制御・輻輳通知</td>
                            </tr>
                            <tr className="even">
                                <td>Total Length</td>
                                <td>16</td>
                                <td>パケット全体の長さ</td>
                            </tr>
                            <tr className="odd">
                                <td>Identification</td>
                                <td>16</td>
                                <td>フラグメンテーション時の識別子</td>
                            </tr>
                            <tr className="even">
                                <td>Flags</td>
                                <td>3</td>
                                <td>フラグメント制御（DFビット等）</td>
                            </tr>
                            <tr className="odd">
                                <td>Fragment Offset</td>
                                <td>13</td>
                                <td>フラグメントの位置</td>
                            </tr>
                            <tr className="even">
                                <td>TTL</td>
                                <td>8</td>
                                <td>生存時間（ホップごとに1減算、0でパケット破棄）</td>
                            </tr>
                            <tr className="odd">
                                <td>Protocol</td>
                                <td>8</td>
                                <td>上位プロトコル種別（TCP=6, UDP=17, ICMP=1）</td>
                            </tr>
                            <tr className="even">
                                <td>Header Checksum</td>
                                <td>16</td>
                                <td>ヘッダのみの誤り検出</td>
                            </tr>
                            <tr className="odd">
                                <td>Source Address</td>
                                <td>32</td>
                                <td>送信元IPv4アドレス</td>
                            </tr>
                            <tr className="even">
                                <td>Destination Address</td>
                                <td>32</td>
                                <td>宛先IPv4アドレス</td>
                            </tr>
                            <tr className="odd">
                                <td>Options</td>
                                <td>可変</td>
                                <td>オプション（実運用では稀）</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            <h3 id="s5-3">5.3 TTLとルーティングループ対策</h3>
            <p>
                    TTL（Time To
                    Live）はルータを1つ経由するごとに1ずつ減算され、0になったパケットは破棄されます。これはルーティングループでパケットが無限に転送され続けることを防ぐ安全弁です。<code>traceroute</code>はTTLを1から順に増やしながらパケットを送り、各ホップで発生する「TTL超過」のICMPエラーを利用して経路上のルータを可視化するツールです。
                </p>
            <Diagram id="diag-10" label="TTL（Time To Live）はルータを1つ経由するごとに1ずつ減算され、0になったパケットは破棄されます。これはルーティングループでパケットが無限に転送され続けることを防ぐ安全弁です。tracerouteはTTLを1から順に増やしながらパケットを送り、各ホップで発生する「TTL超過」のICMPエラーを利用して経路上のルータを可視化するツールです。" />
            <h3 id="s5-4">5.4 IPフラグメンテーションの基礎（詳細は第10部）</h3>
            <p>
                    送信するパケットが経路上のいずれかのリンクのMTUを超える場合、IPはパケットを複数のフラグメントに分割します。ただしフラグメンテーションはパフォーマンス上のデメリット（1つのフラグメント喪失で全体が再送になる、処理負荷が増す）が大きいため、現代の実装では<strong>Path MTU Discovery（PMTUD）</strong>によって経路上の最小MTUを事前に把握し、そもそもフラグメントが発生しないサイズでパケットを送出するのが基本方針です。
                </p>
            <h3 id="s5-5">5.5 IPv6ヘッダとIPv4からの主な変更点</h3>
            <p>
                    IPv6ヘッダは40バイト固定長で、IPv4より単純化されています。主な変更点は次の通りです。
                </p>
            <div className="table-scroll" tabIndex={0} role="region" aria-label="IPv6ヘッダは40バイト固定長で、IPv4より単純化されています。主な変更点は次の通りです。">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">変更点</th>
                                <th scope="col">IPv4</th>
                                <th scope="col">IPv6</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>ヘッダチェックサム</td>
                                <td>あり</td>
                                <td>廃止（上位層・リンク層に委任）</td>
                            </tr>
                            <tr className="even">
                                <td>フラグメンテーション</td>
                                <td>ルータも実施可能</td>
                                <td>送信ホストのみが実施（ルータは行わない）</td>
                            </tr>
                            <tr className="odd">
                                <td>ヘッダ長</td>
                                <td>可変（オプションあり）</td>
                                <td>固定40バイト＋拡張ヘッダのチェーン</td>
                            </tr>
                            <tr className="even">
                                <td>ブロードキャスト</td>
                                <td>あり</td>
                                <td>廃止（マルチキャストに統合）</td>
                            </tr>
                            <tr className="odd">
                                <td>アドレス長</td>
                                <td>32bit</td>
                                <td>128bit</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            <p>
                    IPv6ではオプション機能が「拡張ヘッダ」としてメインヘッダの後ろにチェーン状に連結される設計になっており、必要な拡張ヘッダだけを付加できる柔軟性があります（Hop-by-Hop
                    Options, Routing, Fragment, Destination Optionsなど）。
                </p>
            <div className="callout-practice">
                    <div className="icon">✓ </div>
                    <div className="body">
                        <div className="label">ベストプラクティス </div>
                        <ul>
                            <li>
                                <code>traceroute</code>／<code>mtr</code>はTTL超過ICMPを利用した診断ツールであることを理解しておくと、途中経路のファイアウォールがICMPをブロックしている場合の"見えない区間"の解釈を誤らずに済む。{' '}
                            </li>
                            <li>
                                IPv6移行時は「フラグメンテーションはホストのみが行う」という設計変更を踏まえ、PMTUDが正しく機能する経路設計（ICMPv6
                                Packet Too Bigの到達性確保）が必須になる。{' '}
                            </li>
                            <li>
                                IPv4ヘッダのDSCP/ECNフィールドは輻輳制御・QoSと直結する。クラウド環境ではロードバランサやNATがこれらのフィールドを書き換える／落とす場合があるため、エンドツーエンドでの挙動を検証する。
                            </li>
                        </ul>
                    </div>
                </div>
            <hr />
            <h2 id="part6">第6部：システム構成 DHCPと自動設定（原著第6章）</h2>
            <h3 id="s6-1">6.1 なぜ自動設定が必要か</h3>
            <p>
                    ホストがネットワークに参加するには、IPアドレス・サブネットマスク・デフォルトゲートウェイ・DNSサーバといった複数の情報が必要です。これらを手作業で設定するのは大規模ネットワークでは非現実的なため、DHCP（Dynamic
                    Host Configuration Protocol, IPv4版はRFC 2131、IPv6版DHCPv6は現行RFC
                    8415）による自動配布が標準になっています。
                </p>
            <h3 id="s6-2">6.2 DHCPのDORAプロセス</h3>
            <p>DHCPv4のアドレス取得は4段階のやり取り（通称DORA）で行われます。</p>
            <Diagram id="diag-11" label="DHCPv4のアドレス取得は4段階のやり取り（通称DORA）で行われます。" />
            <p>
                    DHCPREQUESTがブロードキャストされる理由は、選ばれなかった他のDHCPサーバにも「このオファーは使われなかった」ことを知らせ、提示したアドレスを再利用可能にするためです。
                </p>
            <h3 id="s6-3">6.3 リースとリニューアル</h3>
            <p>
                    割り当てられたアドレスには<strong>リース期間</strong>があります。クライアントはリース期間の50%が経過した時点（T1タイマー）で元のサーバにユニキャストで更新（DHCPREQUEST）を試み、87.5%経過（T2タイマー）してもなお更新できなければブロードキャストで任意のサーバに再取得を試みます。
                </p>
            <h3 id="s6-4">6.4 DHCPリレーエージェント</h3>
            <p>
                    DHCPサーバがクライアントと同一のブロードキャストドメインにいない場合、ルータが<strong>DHCPリレーエージェント</strong>として動作し、クライアントのブロードキャストをユニキャストでDHCPサーバへ中継します（<code>giaddr</code>フィールドにリレーエージェント自身のアドレスを設定）。
                </p>
            <h3 id="s6-5">6.5 IPv6の自動設定：SLAACとDHCPv6</h3>
            <p>IPv6には2つの自動設定方式があり、併用も可能です。</p>
            <div className="table-scroll" tabIndex={0} role="region" aria-label="IPv6には2つの自動設定方式があり、併用も可能です。">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">方式</th>
                                <th scope="col">概要</th>
                                <th scope="col">主な用途</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>SLAAC（Stateless Address Autoconfiguration, RFC 4862）</td>
                                <td>
                                    ルータ広告（RA）のプレフィックス情報とホスト側で生成するインターフェースIDを組み合わせて自ら住所を決める
                                </td>
                                <td>シンプルな環境、IoT機器</td>
                            </tr>
                            <tr className="even">
                                <td>DHCPv6（stateful, RFC 8415）</td>
                                <td>DHCPv4同様、サーバが集中管理してアドレスを払い出す</td>
                                <td>アドレス追跡やコンプライアンス要件のある企業ネットワーク</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            <p>
                    実務では「SLAACでアドレス割当、DHCPv6でDNSサーバ情報などのオプションのみ配布」というハイブリッド運用（RA
                    の M/O
                    フラグで制御）も広く行われています。DHCPv6のサーバ二重化には、DHCPv4の伝統的なDORAとは異なる<strong>DHCPv6フェイルオーバー（RFC 8156, 2017年）</strong>という仕組みが後から追加されました。
                </p>
            <Diagram id="diag-12" label="実務では「SLAACでアドレス割当、DHCPv6でDNSサーバ情報などのオプションのみ配布」というハイブリッド運用（RA の M/O フラグで制御）も広く行われています。DHCPv6のサーバ二重化には、DHCPv4の伝統的なDORAとは異なるDHCPv6フェイルオーバー（RFC 8156, 2017年）という仕組みが後から追加されました。" />
            <h3 id="s6-6">6.6 DHCPのセキュリティ課題</h3>
            <p>
                    DHCPには送信元認証の仕組みがなく、不正なDHCPサーバ（Rogue
                    DHCP）が偽の設定情報（悪意あるデフォルトゲートウェイなど）を配布できてしまいます。緩和策として、スイッチ側で正規のDHCPサーバが接続されたポートのみを信頼する<strong>DHCPスヌーピング</strong>（第4部のARP対策とも連携）が標準的に使われます。
                </p>
            <div className="callout-practice">
                    <div className="icon">✓ </div>
                    <div className="body">
                        <div className="label">ベストプラクティス </div>
                        <ul>
                            <li>
                                リース期間はネットワークの流動性（ゲスト無線か固定オフィス機器か）に応じて調整する。短すぎるとDHCPサーバ負荷が増し、長すぎるとアドレス枯渇時の回収が遅れる。{' '}
                            </li>
                            <li>
                                IPv6ネットワークでは、SLAACのみ・DHCPv6のみ・ハイブリッドのどれを採用するか、DNS配布方法（RA
                                RDNSS vs DHCPv6）まで含めて設計時に明確化する。{' '}
                            </li>
                            <li>
                                Rogue
                                DHCP対策としてDHCPスヌーピングを有効化し、想定外のポートからのDHCPOFFER/ACKを遮断する。
                            </li>
                        </ul>
                    </div>
                </div>
            <hr />
            <h2 id="part7">第7部：ファイアウォールとNAT（原著第7章）</h2>
            <h3 id="s7-1">7.1 ファイアウォールの基本分類</h3>
            <div className="table-scroll" tabIndex={0} role="region" aria-label="7.1 ファイアウォールの基本分類">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">種別</th>
                                <th scope="col">判断基準</th>
                                <th scope="col">特徴</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>パケットフィルタ型</td>
                                <td>IPアドレス・ポート・プロトコル番号</td>
                                <td>高速だがコネクションの文脈を見ない</td>
                            </tr>
                            <tr className="even">
                                <td>ステートフルインスペクション型</td>
                                <td>上記＋コネクションの状態（SYN送出済みか等）</td>
                                <td>現代の主流。応答パケットのみを自動許可できる</td>
                            </tr>
                            <tr className="odd">
                                <td>アプリケーション層（プロキシ）型</td>
                                <td>アプリケーションプロトコルの中身まで検査</td>
                                <td>詳細な制御が可能だが処理負荷が高い</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            <h3 id="s7-2">7.2 NAT（ネットワークアドレス変換）の基本動作</h3>
            <p>
                    NATはプライベートアドレス空間とパブリックアドレス空間の間でIPアドレス（とポート番号）を書き換える仕組みです。最も一般的なのは<strong>NAPT（Network Address Port Translation、俗にPAT）</strong>で、複数の内部ホストが1つのパブリックIPを共有し、送信元ポート番号で内部ホストを区別します。
                </p>
            <Diagram id="diag-13" label="NATはプライベートアドレス空間とパブリックアドレス空間の間でIPアドレス（とポート番号）を書き換える仕組みです。最も一般的なのはNAPT（Network Address Port Translation、俗にPAT）で、複数の内部ホストが1つのパブリックIPを共有し、送信元ポート番号で内部ホストを区別します。" />
            <h3 id="s7-3">7.3 キャリアグレードNAT（CGNAT）とNAT444</h3>
            <p>
                    IPv4アドレス枯渇に対応するため、ISPは自社網内でもNATを行い、家庭用ルータのNAT（NAT44）に加えてISP側でもう一段NATを行う<strong>NAT444</strong>構成（CGNAT）を広く採用しています。CGNATでは<code>100.64.0.0/10</code>（第2部参照）がホームルータとISP
                    CGN機器の間で使われます。
                </p>
            <Diagram id="diag-14" label="IPv4アドレス枯渇に対応するため、ISPは自社網内でもNATを行い、家庭用ルータのNAT（NAT44）に加えてISP側でもう一段NATを行うNAT444構成（CGNAT）を広く採用しています。CGNATでは100.64.0.0/10（第2部参照）がホームルータとISP CGN機器の間で使われます。" />
            <p>
                    CGNATはIPv4枯渇への延命策として有効な一方、以下のような構造的な副作用があります。
                </p>
            <ul>
                    <li>
                        <strong>end-to-endの原則が崩れる</strong>：中間にNATという「状態を持つ装置」が入るため、外部から内部への直接接続（サーバ運用、P2P、ポートフォワーディング）が困難になる。
                    </li>
                    <li>
                        <strong>ポート枯渇</strong>：1つのパブリックIPを多数のユーザで共有するため、同時接続数の上限に達しやすい。
                    </li>
                    <li>
                        <strong>法執行・監査の複雑化</strong>：同一の公開IPアドレスの背後に多数のユーザが存在するため、IPアドレスだけでは個人を特定できない。
                    </li>
                </ul>
            <h3 id="s7-4">7.4 NAT64／DNS64：IPv6専用網からIPv4へのアクセス</h3>
            <p>
                    IPv6専用（IPv6-only）ネットワークからIPv4しか対応していないサービスにアクセスするための移行技術がNAT64／DNS64です。DNS64がAAAAレコードを持たないドメインに対して疑似的なIPv6アドレス（<code>64:ff9b::/96</code>にIPv4アドレスを埋め込んだもの）を合成して返し、NAT64ゲートウェイがそのアドレス宛のIPv6トラフィックをIPv4に変換して転送します。
                </p>
            <h3 id="s7-5">7.5 NATがトランスポート層プロトコルに与える影響</h3>
            <p>
                    NATはIPヘッダだけでなく、TCP/UDPのポート番号やチェックサムも書き換える必要があります。またFTPのようにペイロード内にIPアドレスやポート番号を埋め込むプロトコル（アクティブFTPのPORTコマンドなど）は、NAT側で<strong>ALG（Application Level Gateway）</strong>によるペイロード書き換えを必要とします。
                </p>
            <div className="callout-practice">
                    <div className="icon">✓ </div>
                    <div className="body">
                        <div className="label">ベストプラクティス </div>
                        <ul>
                            <li>
                                サーバを外部公開する構成では、CGNAT環境下のクライアントからの着信接続を前提にしない（IPv6デュアルスタックや明示的なポートフォワーディングで代替する）。{' '}
                            </li>
                            <li>
                                NATの「フルコーンNAT」「制限コーンNAT」「対称NAT」といった振る舞いの違いはP2P・VoIPの接続性に直結する。STUN/TURN/ICEといったNATトラバーサル技術の選定前に、実際のNATタイプを確認する。{' '}
                            </li>
                            <li>
                                ステートフルファイアウォール／NATのセッションテーブルにはタイムアウトがある（第17部のTCPキープアライブとも関連）。アイドル接続を維持したいアプリケーションは、この既定タイムアウトより短い間隔でキープアライブを送る設計にする。
                            </li>
                        </ul>
                    </div>
                </div>
            <hr />
            <h2 id="part8">第8部：ICMPv4/ICMPv6（原著第8章）</h2>
            <h3 id="s8-1">8.1 ICMPの役割：IPの「アシスタントプロトコル」</h3>
            <p>
                    ICMP（Internet Control Message
                    Protocol）はIP自身にはないエラー通知・診断機能を補完するプロトコルです。IPは「ベストエフォートで配送を試み、失敗しても黙って捨てる」のが基本ですが、それでは運用上不便なため、パケットが破棄された理由をICMPメッセージとして送信元に通知します。ICMPはIPペイロードとして運ばれる（IP
                    Protocol番号1）ため、レイヤとしてはネットワーク層に位置づけられます。
                </p>
            <h3 id="s8-2">8.2 主要なICMPv4メッセージ</h3>
            <div className="table-scroll" tabIndex={0} role="region" aria-label="8.2 主要なICMPv4メッセージ">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">Type</th>
                                <th scope="col">名称</th>
                                <th scope="col">主な用途</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>0</td>
                                <td>Echo Reply</td>
                                <td><code>ping</code>の応答</td>
                            </tr>
                            <tr className="even">
                                <td>3</td>
                                <td>Destination Unreachable</td>
                                <td>宛先到達不可（Code別に細分化）</td>
                            </tr>
                            <tr className="odd">
                                <td>3 / Code 4</td>
                                <td>Fragmentation Needed and DF Set</td>
                                <td>Path MTU Discoveryで使用</td>
                            </tr>
                            <tr className="even">
                                <td>5</td>
                                <td>Redirect</td>
                                <td>より良い経路の通知（現代では悪用リスクからほぼ無効化）</td>
                            </tr>
                            <tr className="odd">
                                <td>8</td>
                                <td>Echo Request</td>
                                <td><code>ping</code>の要求</td>
                            </tr>
                            <tr className="even">
                                <td>11</td>
                                <td>Time Exceeded</td>
                                <td>TTL超過（<code>traceroute</code>が利用）</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            <h3 id="s8-3">8.3 Path MTU Discovery（PMTUD）の仕組み</h3>
            <p>
                    送信ホストはまずDFビット（Don't
                    Fragment）を立てた最大サイズのパケットを送出します。経路上のどこかのリンクでMTUを超えた場合、そのルータはパケットを破棄し「Fragmentation
                    Needed and DF Set（Type 3, Code
                    4）」ICMPメッセージを、超過できなかったリンクの実際のMTU値を添えて送信元に返します。送信ホストはこれを受けてパケットサイズを縮小し再送します。
                </p>
            <Diagram id="diag-15" label="送信ホストはまずDFビット（Don't Fragment）を立てた最大サイズのパケットを送出します。経路上のどこかのリンクでMTUを超えた場合、そのルータはパケットを破棄し「Fragmentation Needed and DF Set（Type 3, Code 4）」ICMPメッセージを、超過できなかったリンクの実際のMTU値を添えて送信元に返します。送信ホストはこれを受けてパケットサイズを縮小し再送します。" />
            <p>
                    <strong>PMTUDブラックホール問題</strong>：経路上のファイアウォールがICMPを一律ブロックしていると、このType3/Code4メッセージが送信元に届かず、送信ホストは永久に最適なサイズを学習できません。結果として、大きなパケットだけが送達されず接続が謎のハングを起こす「PMTUDブラックホール」という典型的な障害パターンが発生します。
                </p>
            <h3 id="s8-4">8.4 ICMPv6：単なるエラー通知を超えた基盤プロトコル</h3>
            <p>
                    ICMPv6はICMPv4よりも役割が大きく拡張されています。IPv4では別プロトコルだったARP（第4部）とIGMP（第9部）に相当する機能が、ICMPv6のメッセージタイプとしてすべて統合されています。
                </p>
            <div className="table-scroll" tabIndex={0} role="region" aria-label="ICMPv6はICMPv4よりも役割が大きく拡張されています。IPv4では別プロトコルだったARP（第4部）とIGMP（第9部）に相当する機能が、ICMPv6のメッセージタイプとしてすべて統合されています。">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">分類</th>
                                <th scope="col">ICMPv6 Type</th>
                                <th scope="col">相当するIPv4の仕組み</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>エラー通知</td>
                                <td>1〜4</td>
                                <td>ICMPv4のエラーメッセージ群</td>
                            </tr>
                            <tr className="even">
                                <td>Echo Request/Reply</td>
                                <td>128/129</td>
                                <td>ICMPv4 Type 8/0（<code>ping</code>）</td>
                            </tr>
                            <tr className="odd">
                                <td>Router Solicitation/Advertisement</td>
                                <td>133/134</td>
                                <td>なし（IPv4はDHCP依存）</td>
                            </tr>
                            <tr className="even">
                                <td>Neighbor Solicitation/Advertisement</td>
                                <td>135/136</td>
                                <td>ARP Request/Reply</td>
                            </tr>
                            <tr className="odd">
                                <td>Multicast Listener系</td>
                                <td>130〜132, 143</td>
                                <td>IGMP</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            <h3 id="s8-5">8.5 セキュリティ上の注意点</h3>
            <p>
                    ICMPはネットワークスキャン（<code>ping</code>スイープ）や、増幅型DDoS攻撃（Smurf攻撃など）に悪用された歴史があるため、多くの環境でICMPを一律遮断する運用が見られます。しかしICMPv6のNeighbor
                    Discovery関連メッセージは、IPv6の基本的な通信そのものに必須（ARPに相当）であるため、ICMPv4と同じ感覚で「とりあえず全部ブロック」するとIPv6通信そのものが機能しなくなります。
                </p>
            <div className="callout-practice">
                    <div className="icon">✓ </div>
                    <div className="body">
                        <div className="label">ベストプラクティス </div>
                        <ul>
                            <li>
                                ファイアウォール設計では「ICMP＝不要な雑音」として一律遮断せず、Type3/Code4（PMTUD）とICMPv6のNeighbor
                                Discovery関連メッセージは必ず許可する。{' '}
                            </li>
                            <li>
                                <code>ping</code>が通らないことと実サービスが疎通しないことは別問題。ICMPだけを見て「ネットワークがダウンしている」と即断しない（多くの本番環境でICMP
                                Echoは意図的にフィルタされている）。{' '}
                            </li>
                            <li>
                                IPv6環境の構築・トラブルシューティングでは、ARP相当の機能がICMPv6に統合されていることを踏まえ、<code>tcpdump</code>のフィルタも<code>icmp6</code>側を確認する習慣をつける。
                            </li>
                        </ul>
                    </div>
                </div>
            <hr />
        </>
    );
}
