'use client';

import React from 'react';
import { Diagram } from '../Diagram';


export function SectionParts9to11() {
    return (
        <>
            <h2 id="part9" tabIndex={-1}>第9部：ブロードキャストとマルチキャスト IGMP/MLD（原著第9章）</h2>
            <h3 id="s9-1">9.1 ブロードキャストの限界とマルチキャストの利点</h3>
            <p>
                    ブロードキャストは「同一セグメント上の全ホストへ届ける」単純な仕組みですが、興味のないホストにも強制的に処理負荷をかけてしまいます。IPマルチキャストは「関心のあるホストだけが加入するグループ」にのみ配送する仕組みで、映像配信やルーティングプロトコル（OSPFなど）の制御メッセージ配布に使われます。IPv6にはそもそもブロードキャストが存在せず、この用途はすべてマルチキャストに一本化されています。
                </p>
            <h3 id="s9-2">9.2 IGMP（IPv4）とMLD（IPv6）</h3>
            <div className="table-scroll" tabIndex={0} role="region" aria-label="9.2 IGMP（IPv4）とMLD（IPv6）">
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
                                <td>プロトコル名</td>
                                <td>IGMP（Internet Group Management Protocol）</td>
                                <td>MLD（Multicast Listener Discovery）</td>
                            </tr>
                            <tr className="even">
                                <td>実装レイヤ</td>
                                <td>IPの直上（Protocol番号2）</td>
                                <td>ICMPv6のメッセージタイプとして統合</td>
                            </tr>
                            <tr className="odd">
                                <td>現行バージョン</td>
                                <td>IGMPv3</td>
                                <td>MLDv2</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            <p>
                    ホストはIGMP/MLDを使ってローカルルータに「このマルチキャストグループに加入したい」と通知し、ルータはこの情報を基にマルチキャストトラフィックをそのセグメントへ転送するかどうかを判断します。
                </p>
            <Diagram id="diag-16" label="ホストはIGMP/MLDを使ってローカルルータに「このマルチキャストグループに加入したい」と通知し、ルータはこの情報を基にマルチキャストトラフィックをそのセグメントへ転送するかどうかを判断します。" />
            <h3 id="s9-3">9.3 マルチキャストルーティングの概要</h3>
            <p>
                    IGMP/MLDはホストとローカルルータ間の「加入表明」を扱うのに対し、ルータ間でマルチキャストツリーを構築するのはPIM（Protocol
                    Independent Multicast）などの別プロトコルの役割です。PIM-SM（Sparse
                    Mode）が広く使われ、Rendezvous
                    Point（RP）を経由してソースツリーまたは共有ツリーを構築します。
                </p>
            <div className="callout-practice">
                    <div className="icon">✓ </div>
                    <div className="body">
                        <div className="label">ベストプラクティス </div>
                        <ul>
                            <li>
                                マルチキャストはL2スイッチでもIGMPスヌーピングを有効化しないと、結局全ポートにフラッディングされ本来の効率化メリットが失われる。{' '}
                            </li>
                            <li>
                                パブリッククラウドの多くはネイティブなL2マルチキャストをサポートしないため、マルチキャスト前提の設計（金融系のマーケットデータ配信など）はオンプレミス／専用線接続を要することが多い。{' '}
                            </li>
                            <li>
                                IPv6環境ではブロードキャストが存在しないため、旧IPv4前提の設計（DHCPのブロードキャストなど）をそのまま持ち込めない点に注意する。
                            </li>
                        </ul>
                    </div>
                </div>
            <hr />
            <h2 id="part10" tabIndex={-1}>第10部：UDPとIPフラグメンテーション（原著第10章）</h2>
            <h3 id="s10-1">10.1 UDPの設計思想：シンプルさの追求</h3>
            <p>
                    UDP（User Datagram Protocol, RFC
                    768）はTCPと対照的に、コネクション確立・順序保証・再送制御・輻輳制御のいずれも持たない、極めて薄いトランスポート層プロトコルです。ヘッダはわずか8バイト（送信元ポート・宛先ポート・長さ・チェックサムの4フィールドのみ）です。
                </p>
            <Diagram id="diag-17" label="UDP（User Datagram Protocol, RFC 768）はTCPと対照的に、コネクション確立・順序保証・再送制御・輻輳制御のいずれも持たない、極めて薄いトランスポート層プロトコルです。ヘッダはわずか8バイト（送信元ポート・宛先ポート・長さ・チェックサムの4フィールドのみ）です。" />
            <h3 id="s10-2">10.2 UDPが適する場面</h3>
            <div className="table-scroll" tabIndex={0} role="region" aria-label="10.2 UDPが適する場面">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">特性</th>
                                <th scope="col">説明</th>
                                <th scope="col">典型的な用途</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>低遅延</td>
                                <td>ハンドシェイクや再送待ちがない</td>
                                <td>DNSクエリ、リアルタイム音声・映像</td>
                            </tr>
                            <tr className="even">
                                <td>ブロードキャスト/マルチキャスト対応</td>
                                <td>TCPは1対1のコネクションのみ</td>
                                <td>DHCP、ストリーミング配信</td>
                            </tr>
                            <tr className="odd">
                                <td>独自の信頼性実装が可能</td>
                                <td>アプリケーション側で必要な分だけ再送等を実装できる</td>
                                <td>QUIC（HTTP/3の基盤、UDP上に構築）</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            <h3 id="s10-3">10.3 IPフラグメンテーションの詳細動作</h3>
            <p>
                    送信するデータグラムがリンクのMTUを超える場合、IPは元のデータグラムを複数のフラグメントに分割します。各フラグメントは同じ<strong>Identificationフィールド</strong>を持ち、<strong>Fragment Offset</strong>フィールドで元データ内の位置を、<strong>More Fragmentsフラグ</strong>で「まだ後続フラグメントがあるか」を示します。受信側はこれらの情報を使って元のデータグラムを再構築します。
                </p>
            <Diagram id="diag-18" label="送信するデータグラムがリンクのMTUを超える場合、IPは元のデータグラムを複数のフラグメントに分割します。各フラグメントは同じIdentificationフィールドを持ち、Fragment Offsetフィールドで元データ内の位置を、More Fragmentsフラグで「まだ後続フラグメントがあるか」を示します。受信側はこれらの情報を使って元のデータグラムを再構築します。" />
            <h3 id="s10-4">10.4 フラグメンテーションはなぜ「避けるべき」設計とされるのか</h3>
            <ul>
                    <li>
                        <strong>1つのフラグメント喪失＝全体喪失</strong>：フラグメントの一部でもパケロスすると、元データグラム全体が再構築不能になり破棄される。UDPには再送機構がないため、上位アプリケーションが再送するまでデータは失われたままになる。
                    </li>
                    <li>
                        <strong>中間経路での処理コストとステート</strong>：一部のファイアウォール／ロードバランサはフラグメントの再構築が必要になり負荷が増す。
                    </li>
                    <li>
                        <strong>フラグメンテーション攻撃</strong>：意図的に細工したフラグメントでファイアウォールの検査を回避する攻撃（Tiny
                        Fragment Attack、Overlapping Fragment
                        Attackなど）の歴史があり、多くのセキュリティ機器がフラグメントを異常視・破棄する。
                    </li>
                </ul>
            <p>
                    このため現代の実運用では、UDPアプリケーション自身がペイロードサイズをMTUに収まるよう制御する（例：DNSはEDNS0でUDPペイロードサイズを明示的にネゴシエートする）のが定石です。IPv6ではさらに踏み込み、ルータによるフラグメンテーションが廃止され、送信ホストのみがフラグメント化を行える設計になっています（第5部参照）。
                </p>
            <div className="callout-practice">
                    <div className="icon">✓ </div>
                    <div className="body">
                        <div className="label">ベストプラクティス </div>
                        <ul>
                            <li>
                                UDPベースのアプリケーションを設計する際は、最初からMTU超過を前提とせず、ペイロードサイズをPMTUDの結果や既知の安全マージン（IPv4なら576byte、IPv6なら1280byte程度）に収める設計を検討する。{' '}
                            </li>
                            <li>
                                DNS（第11部）のようにUDPでの応答サイズが大きくなり得るプロトコルでは、EDNS0によるサイズネゴシエーションとTCPへのフォールバックの両方を実装しておく。{' '}
                            </li>
                            <li>
                                フラグメント化されたパケットに依存する設計は、経路上のミドルボックスによって予期せず破棄されるリスクがあることを念頭に置く。
                            </li>
                        </ul>
                    </div>
                </div>
            <hr />
            <h2 id="part11" tabIndex={-1}>第11部：名前解決とDNS（原著第11章）</h2>
            <h3 id="s11-1">11.1 階層型データベースとしてのDNS</h3>
            <p>
                    DNS（Domain Name System, RFC
                    1035）は、人間が読める名前（<code>www.example.com</code>）とIPアドレスを対応づける、世界規模の分散階層型データベースです。ドメイン名はルート（<code>.</code>）を頂点に、TLD（<code>.com</code>など）、セカンドレベルドメイン（<code>example</code>）、サブドメイン（<code>www</code>）という木構造で管理され、それぞれの階層を別々の組織が権威サーバとして管理します。
                </p>
            <Diagram id="diag-19" label="DNS（Domain Name System, RFC 1035）は、人間が読める名前（www.example.com）とIPアドレスを対応づける、世界規模の分散階層型データベースです。ドメイン名はルート（.）を頂点に、TLD（.comなど）、セカンドレベルドメイン（example）、サブドメイン（www）という木構造で管理され、それぞれの階層を別々の組織が権威サーバとして管理します。" />
            <h3 id="s11-2">11.2 再帰的問い合わせと反復的問い合わせ</h3>
            <p>
                    一般的なクライアント（スタブリゾルバ）は、フルサービスリゾルバ（キャッシュDNSサーバ）に<strong>再帰的（recursive）問い合わせ</strong>を送ります。フルサービスリゾルバは、ルート→TLD→権威サーバへと自ら<strong>反復的（iterative）問い合わせ</strong>を繰り返して最終的な答えを見つけ、クライアントに1回の応答として返します。
                </p>
            <Diagram id="diag-20" label="一般的なクライアント（スタブリゾルバ）は、フルサービスリゾルバ（キャッシュDNSサーバ）に再帰的（recursive）問い合わせを送ります。フルサービスリゾルバは、ルート→TLD→権威サーバへと自ら反復的（iterative）問い合わせを繰り返して最終的な答えを見つけ、クライアントに1回の応答として返します。" />
            <h3 id="s11-3">11.3 主要なリソースレコード種別</h3>
            <div className="table-scroll" tabIndex={0} role="region" aria-label="11.3 主要なリソースレコード種別">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">レコード種別</th>
                                <th scope="col">役割</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>A</td>
                                <td>ホスト名 → IPv4アドレス</td>
                            </tr>
                            <tr className="even">
                                <td>AAAA</td>
                                <td>ホスト名 → IPv6アドレス</td>
                            </tr>
                            <tr className="odd">
                                <td>CNAME</td>
                                <td>別名（正規名へのエイリアス）</td>
                            </tr>
                            <tr className="even">
                                <td>MX</td>
                                <td>メール配送先サーバの優先度付きリスト</td>
                            </tr>
                            <tr className="odd">
                                <td>NS</td>
                                <td>あるゾーンを管理する権威サーバの指定</td>
                            </tr>
                            <tr className="even">
                                <td>TXT</td>
                                <td>任意テキスト（SPFやドメイン検証などに広く使われる）</td>
                            </tr>
                            <tr className="odd">
                                <td>PTR</td>
                                <td>IPアドレス → ホスト名（逆引き）</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            <h3 id="s11-4">11.4 トランスポート層の選択：UDPとTCP</h3>
            <p>
                    DNSクエリの大半は低遅延なUDPで送られますが、応答サイズが大きい場合（多数のレコード、DNSSEC署名付きなど）はTCPにフォールバックします。またゾーン転送（AXFR/IXFR、プライマリ/セカンダリDNSサーバ間の同期）は常にTCPが使われます。EDNS0（RFC
                    6891）拡張により、UDPでもより大きなペイロードサイズをネゴシエート可能になっています。
                </p>
            <h3 id="s11-5">11.5 DNSキャッシュとTTL</h3>
            <p>
                    各リソースレコードにはTTL（Time To
                    Live、秒単位）が設定されており、フルサービスリゾルバはこの期間だけ結果をキャッシュします。TTLが短いほど変更の反映は速いが問い合わせ負荷が増え、長いほど負荷は減るが変更反映が遅れるというトレードオフがあります（DNSベースのフェイルオーバーやロードバランシングでは意図的に短いTTLが使われます）。
                </p>
            <div className="callout-practice">
                    <div className="icon">✓ </div>
                    <div className="body">
                        <div className="label">ベストプラクティス </div>
                        <ul>
                            <li>
                                サービスの切り替え（DR切替、マイグレーション）を計画する際は、事前に対象レコードのTTLを短く設定しておき、切替直前に十分な時間（旧TTL分）を空けておく。{' '}
                            </li>
                            <li>
                                DNSはUDPだけの技術ではない。応答サイズやゾーン転送でTCPが使われることを前提に、ファイアウォールでは<code>53/udp</code>だけでなく<code>53/tcp</code>も許可する。{' '}
                            </li>
                            <li>
                                キャッシュの階層構造（スタブリゾルバ→フルサービスリゾルバ→権威サーバ）を理解しておくと、「なぜこの端末だけ古いレコードが見えるのか」といった障害調査が格段にしやすくなる。
                            </li>
                        </ul>
                    </div>
                </div>
            <hr />
        </>
    );
}
