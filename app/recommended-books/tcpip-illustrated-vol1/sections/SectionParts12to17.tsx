'use client';

import React from 'react';
import { Diagram } from '../Diagram';


export function SectionParts12to17() {
    return (
        <>
            <h2 id="part12" tabIndex={-1}>
                    第12部：TCPの基礎（原著第12章 TCP: The Transmission Control Protocol,
                    Preliminaries）
                </h2>
            <h3 id="s12-1">12.1 TCPが提供するサービス</h3>
            <p>
                    TCP（Transmission Control Protocol）は現行仕様がRFC 9293（2022年、RFC
                    793を含む複数のRFCを統合・置換）で定義されており、次の性質を持つコネクション指向のトランスポート層プロトコルです。
                </p>
            <ul>
                    <li>
                        <strong>信頼性のあるバイトストリーム配送</strong>：送ったデータが順序通り、欠損・重複なく届くことを保証する。
                    </li>
                    <li><strong>全二重通信</strong>：双方向で独立してデータを送受信できる。</li>
                    <li>
                        <strong>フロー制御</strong>：受信側のバッファ容量に応じて送信ペースを調整する（第15部）。
                    </li>
                    <li>
                        <strong>輻輳制御</strong>：ネットワークの混雑状況に応じて送信ペースを調整する（第16部）。
                    </li>
                </ul>
            <h3 id="s12-2">12.2 TCPヘッダの構造</h3>
            <div className="table-scroll" tabIndex={0} role="region" aria-label="12.2 TCPヘッダの構造">
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
                                <td>Source Port / Destination Port</td>
                                <td>各16</td>
                                <td>ポート番号</td>
                            </tr>
                            <tr className="even">
                                <td>Sequence Number</td>
                                <td>32</td>
                                <td>このセグメントの先頭バイトのシーケンス番号</td>
                            </tr>
                            <tr className="odd">
                                <td>Acknowledgment Number</td>
                                <td>32</td>
                                <td>次に期待するバイトのシーケンス番号（ACK時）</td>
                            </tr>
                            <tr className="even">
                                <td>Data Offset</td>
                                <td>4</td>
                                <td>ヘッダ長</td>
                            </tr>
                            <tr className="odd">
                                <td>Flags（Control Bits）</td>
                                <td>8前後</td>
                                <td>SYN, ACK, FIN, RST, PSH, URGなど</td>
                            </tr>
                            <tr className="even">
                                <td>Window Size</td>
                                <td>16</td>
                                <td>受信可能なウィンドウサイズ</td>
                            </tr>
                            <tr className="odd">
                                <td>Checksum</td>
                                <td>16</td>
                                <td>誤り検出</td>
                            </tr>
                            <tr className="even">
                                <td>Urgent Pointer</td>
                                <td>16</td>
                                <td>緊急データの位置（現代ではほぼ未使用）</td>
                            </tr>
                            <tr className="odd">
                                <td>Options</td>
                                <td>可変</td>
                                <td>MSS、ウィンドウスケール、SACK許可、タイムスタンプなど</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            <h3 id="s12-3">12.3 シーケンス番号とバイトストリームという抽象化</h3>
            <p>
                    TCPは「パケット」ではなく「連続したバイトストリーム」を運ぶという抽象化を提供します。各バイトには論理的な通し番号（シーケンス番号）が振られており、初期値はランダムな<strong>ISN（Initial Sequence Number）</strong>から始まります（第三者による通信の予測・乗っ取りを防ぐため、ISNの予測可能性は歴史的に重要なセキュリティ課題でした）。
                </p>
            <h3 id="s12-4">12.4 主要なTCPオプション</h3>
            <div className="table-scroll" tabIndex={0} role="region" aria-label="12.4 主要なTCPオプション">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">オプション</th>
                                <th scope="col">役割</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>MSS（Maximum Segment Size）</td>
                                <td>受信可能な最大セグメントサイズをコネクション確立時に通知</td>
                            </tr>
                            <tr className="even">
                                <td>Window Scale</td>
                                <td>
                                    16bitのWindow
                                    Sizeフィールドの制約を超え、大容量ウィンドウを実現（高帯域遅延積回線で必須）
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>SACK（Selective Acknowledgment）</td>
                                <td>欠損した特定範囲のみを選択的に再送要求できるようにする</td>
                            </tr>
                            <tr className="even">
                                <td>Timestamps</td>
                                <td>RTT測定の精度向上とシーケンス番号の折り返し対策（PAWS）</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            <div className="callout-practice">
                    <div className="icon">✓ </div>
                    <div className="body">
                        <div className="label">ベストプラクティス </div>
                        <ul>
                            <li>
                                Window
                                ScaleオプションはWi-Fi・衛星回線・大陸間通信のような高帯域遅延積（BDP）環境でスループットを左右する。オプションが経路上のミドルボックスで剥がされていないか<code>tcpdump</code>で確認する習慣をつける。{' '}
                            </li>
                            <li>
                                MSSはリンクのMTUから逆算される値であり、トンネル（VPN、VXLANなど）を挟む構成ではMSS
                                clamping（MSSを意図的に小さく書き換える）が必要になる場合がある。{' '}
                            </li>
                            <li>
                                SACKが無効化されている環境では、1つのパケロスで大量の再送が発生しやすい。現代のOSでは既定で有効だが、意図せず無効化されていないか確認する価値がある。
                            </li>
                        </ul>
                    </div>
                </div>
            <hr />
            <h2 id="part13" tabIndex={-1}>第13部：TCP接続管理（原著第13章）</h2>
            <h3 id="s13-1">13.1 3ウェイハンドシェイクによるコネクション確立</h3>
            <p>
                    TCPコネクションはSYN、SYN-ACK、ACKという3つのセグメントの交換で確立されます。これにより両者は互いの初期シーケンス番号（ISN）を交換し、以降のバイトストリームの起点を合意します。
                </p>
            <Diagram id="diag-21" label="TCPコネクションはSYN、SYN-ACK、ACKという3つのセグメントの交換で確立されます。これにより両者は互いの初期シーケンス番号（ISN）を交換し、以降のバイトストリームの起点を合意します。" />
            <h3 id="s13-2">13.2 TCP状態遷移図</h3>
            <p>
                    TCPコネクションの状態はRFC
                    9293で定義される有限状態機械（FSM）としてモデル化されます。
                </p>
            <Diagram id="diag-22" label="TCPコネクションの状態はRFC 9293で定義される有限状態機械（FSM）としてモデル化されます。" />
            <h3 id="s13-3">13.3 コネクション終了：4ウェイクローズとTIME_WAIT</h3>
            <p>
                    TCPは全二重であるため、終了処理も両方向で独立して行われます（一般に「4ウェイクローズ」と呼ばれます）。片方がFINを送っても、もう片方はまだ送るデータが残っていればすぐには終了しません（<strong>半クローズ</strong>状態）。
                </p>
            <p>
                    最後にACKを送った側は<strong>TIME_WAIT</strong>状態に一定時間（一般的な実装では<strong>2MSL＝Maximum Segment Lifetimeの2倍</strong>）留まります。これは、遅延して届いた古いセグメントが新しい別のコネクションと誤って混同されるのを防ぐための安全策です。
                </p>
            <h3 id="s13-4">13.4 SYNフラッド攻撃とSYN Cookies</h3>
            <p>
                    サーバはSYNを受け取るとSYN-ACKを返し、クライアントからのACKを待つ間、接続情報を保持するためのメモリ（SYNキュー）を消費します。攻撃者が大量の偽装SYNを送りつけ、ACKを返さないままにすると、SYNキューが枯渇し正規のクライアントが接続できなくなる<strong>SYNフラッド攻撃</strong>が成立します。
                </p>
            <p>
                    対策として広く実装されているのが<strong>SYN Cookies</strong>です。サーバはSYN受信時に接続状態をすぐには保存せず、必要な情報を暗号学的に符号化してSYN-ACKのシーケンス番号自体に埋め込みます。正規のACKが返ってきたときにその値を検証・復元することで、SYNキューへのメモリ割り当てを実質的に不要にし、攻撃への耐性を高めます。
                </p>
            <Diagram id="diag-23" label="対策として広く実装されているのがSYN Cookiesです。サーバはSYN受信時に接続状態をすぐには保存せず、必要な情報を暗号学的に符号化してSYN-ACKのシーケンス番号自体に埋め込みます。正規のACKが返ってきたときにその値を検証・復元することで、SYNキューへのメモリ割り当てを実質的に不要にし、攻撃への耐性を高めます。" />
            <div className="callout-practice">
                    <div className="icon">✓ </div>
                    <div className="body">
                        <div className="label">ベストプラクティス </div>
                        <ul>
                            <li>
                                多数の短命接続を扱うサーバ（Webサーバ、ロードバランサ）ではTIME_WAIT状態のソケットが大量に滞留しポート枯渇を招くことがある。<code>SO_REUSEADDR</code>や適切なコネクションプーリング設計で緩和する。{' '}
                            </li>
                            <li>
                                SYN
                                Cookiesはほとんどの現代OSでデフォルト有効だが、有効化状態と閾値（SYNキューが何%埋まったら発動するか）を運用環境で確認しておく。{' '}
                            </li>
                            <li>
                                <code>netstat</code>／<code>ss</code>コマンドでTCP状態別のソケット数を可視化すると、CLOSE_WAITが溜まり続けるといったアプリケーション側のバグ（closeし忘れ）を早期に発見できる。
                            </li>
                        </ul>
                    </div>
                </div>
            <hr />
            <h2 id="part14" tabIndex={-1}>第14部：TCPタイムアウトと再送（原著第14章）</h2>
            <h3 id="s14-1">14.1 再送の基本原理：ACKが届かなければ再送する</h3>
            <p>
                    TCPは送信したセグメントごとにタイマーを設定し、一定時間内にACKが返ってこなければそのセグメントをロスと見なして再送します。この待機時間を<strong>RTO（Retransmission Timeout）</strong>と呼びます。
                </p>
            <h3 id="s14-2">14.2 RTOの動的計算（Jacobsonのアルゴリズム）</h3>
            <p>
                    RTOは固定値ではなく、実測したRTT（往復遅延時間）の平滑化平均（SRTT）とその変動（RTTVAR）から動的に計算されます（Van
                    Jacobsonが1988年に提案し、現在もRFC 6298として標準化されている手法）。
                </p>
            <Diagram id="diag-24" label="RTOは固定値ではなく、実測したRTT（往復遅延時間）の平滑化平均（SRTT）とその変動（RTTVAR）から動的に計算されます（Van Jacobsonが1988年に提案し、現在もRFC 6298として標準化されている手法）。" />
            <p>
                    RTTの変動が大きいネットワーク（モバイル網など）ではRTTVARが大きくなり、RTOは自動的に長めに設定されます。逆に安定した低遅延ネットワークではRTOは短く保たれ、ロス検出が速くなります。
                </p>
            <h3 id="s14-3">14.3 高速再送（Fast Retransmit）と重複ACK</h3>
            <p>
                    RTOによる再送は「一定時間待つ」ため反応が遅くなりがちです。より速い検出手法として、受信側が順序の乱れたセグメントを受け取ると同じACK番号を繰り返し送る（<strong>重複ACK</strong>）ことを利用します。送信側は同じACK番号を3回連続で受け取ると（＝3つの重複ACK）、RTOを待たずに即座に該当セグメントを再送します。これを<strong>高速再送</strong>と呼びます。
                </p>
            <Diagram id="diag-25" label="RTOによる再送は「一定時間待つ」ため反応が遅くなりがちです。より速い検出手法として、受信側が順序の乱れたセグメントを受け取ると同じACK番号を繰り返し送る（重複ACK）ことを利用します。送信側は同じACK番号を3回連続で受け取ると（＝3つの重複ACK）、RTOを待たずに即座に該当セグメントを再送します。これを高速再送と呼びます。" />
            <h3 id="s14-4">14.4 SACK（選択的確認応答）による効率化</h3>
            <p>
                    重複ACKだけでは「どこまで届いたか」しか分からず、複数のセグメントが同時にロスした場合に非効率な再送が発生します。SACKオプション（第12部）を使うと、受信側は「どの範囲を受信済みか」を明示的にACKに含められるため、送信側は本当に欠けている範囲だけをピンポイントで再送できます。
                </p>
            <div className="callout-practice">
                    <div className="icon">✓ </div>
                    <div className="body">
                        <div className="label">ベストプラクティス </div>
                        <ul>
                            <li>
                                高遅延・高パケロス環境（衛星回線、混雑した無線網）では高速再送とSACKの効果が特に大きい。これらが有効になっているか（多くのOSで既定有効）を確認する。{' '}
                            </li>
                            <li>
                                RTOの動的計算は「安定したネットワークでは速く、不安定なネットワークでは慎重に」というトレードオフを自動調整する仕組みであることを理解しておくと、モバイル回線特有の遅延挙動を誤解しにくくなる。{' '}
                            </li>
                            <li>
                                アプリケーション層でも独自の再送・タイムアウトを実装する場合、TCP自体の再送と二重に働いて無駄な負荷を生まないよう設計する（例：HTTPクライアントのリトライとTCP再送の相互作用）。
                            </li>
                        </ul>
                    </div>
                </div>
            <hr />
            <h2 id="part15" tabIndex={-1}>第15部：TCPデータフローとウィンドウ管理（原著第15章）</h2>
            <h3 id="s15-1">15.1 フロー制御：受信側のバッファ保護</h3>
            <p>
                    フロー制御は「受信側が処理しきれる速度を超えて送信側がデータを送らないようにする」仕組みです。TCPヘッダのWindow
                    Sizeフィールドで、受信側は「今すぐ受け入れられるバイト数（受信バッファの空き容量）」を送信側に通知します。送信側はこの値を超えてデータを送ってはいけません。
                </p>
            <Diagram id="diag-26" label="フロー制御は「受信側が処理しきれる速度を超えて送信側がデータを送らないようにする」仕組みです。TCPヘッダのWindow Sizeフィールドで、受信側は「今すぐ受け入れられるバイト数（受信バッファの空き容量）」を送信側に通知します。送信側はこの値を超えてデータを送ってはいけません。" />
            <h3 id="s15-2">15.2 スライディングウィンドウの動作</h3>
            <p>
                    TCPは「送ったが未確認のデータ量」が受信ウィンドウを超えない範囲で連続的にデータを送り出せる、<strong>スライディングウィンドウ</strong>方式を採用しています。ACKが届くたびにウィンドウが&quot;スライド&quot;し、新たに送信可能なバイト数が増えていきます。
                </p>
            <Diagram id="diag-27" label="TCPは「送ったが未確認のデータ量」が受信ウィンドウを超えない範囲で連続的にデータを送り出せる、スライディングウィンドウ方式を採用しています。ACKが届くたびにウィンドウが&quot;スライド&quot;し、新たに送信可能なバイト数が増えていきます。" />
            <h3 id="s15-3">15.3 ウィンドウスケーリングと帯域遅延積（BDP）</h3>
            <p>
                    TCPヘッダのWindow
                    Sizeフィールドは16ビットのため、素の状態では最大65,535バイトまでしか表現できません。しかし高速・長距離回線では、必要なウィンドウサイズが<strong>帯域遅延積（BDP = 帯域幅 × RTT）</strong>に比例して大きくなります。
                </p>
            <p>
                    例：帯域1Gbps、RTT100msの回線では、BDP ≈ 1,000,000,000 bit/s × 0.1s ÷ 8 ≈
                    12.5MB。この場合65,535バイトの固定ウィンドウでは帯域を全く使い切れません。
                </p>
            <p>
                    これを解決するのが第12部で触れた<strong>Window Scaleオプション</strong>で、実際のウィンドウサイズをヘッダの値に2の乗数倍したものとして解釈することで、理論上最大約1GBまでウィンドウを拡張できます。
                </p>
            <h3 id="s15-4">15.4 Nagleのアルゴリズムと遅延ACK、そしてその相互作用問題</h3>
            <ul>
                    <li>
                        <strong>Nagleのアルゴリズム</strong>：小さなデータを都度送信すると小さなパケットが大量発生し非効率なため、未確認のデータがある間は新しい小さなデータをバッファし、まとめて送る仕組み。
                    </li>
                    <li>
                        <strong>遅延ACK（Delayed ACK）</strong>：受信側が即座にACKを返さず、一定時間（または次の送信データに相乗り）待ってからACKをまとめて返す仕組み。
                    </li>
                </ul>
            <p>
                    この2つを同時に有効にすると、双方が互いの送信を待ち合ってしまい、数百ミリ秒単位の不要な遅延が発生する<strong>Nagle/遅延ACK問題</strong>が古くから知られています。対話的・低遅延が求められるアプリケーション（SSHのキー入力、リアルタイムAPIなど）では、送信側で<code>TCP_NODELAY</code>ソケットオプションを設定してNagleのアルゴリズムを無効化するのが定石です。
                </p>
            <div className="callout-practice">
                    <div className="icon">✓ </div>
                    <div className="body">
                        <div className="label">ベストプラクティス </div>
                        <ul>
                            <li>
                                高帯域・高遅延（BDPが大きい）回線を使うアプリケーションでは、Window
                                Scaleが有効か、OSの送受信バッファサイズ上限（<code>net.core.rmem_max</code>等）がBDPに対して十分かを確認する。{' '}
                            </li>
                            <li>
                                低遅延が要求される小メッセージ通信（RPC、対話型シェル）では<code>TCP_NODELAY</code>の設定を検討する。ただし大量の小パケットがネットワーク効率を悪化させるリスクとのトレードオフを理解した上で使う。{' '}
                            </li>
                            <li>
                                フロー制御（受信側の都合）と輻輳制御（ネットワークの都合）は別物であり、実際の送信ウィンドウは両者の小さい方（min）で制限されることを押さえておく（詳細は第16部）。
                            </li>
                        </ul>
                    </div>
                </div>
            <hr />
            <h2 id="part16" tabIndex={-1}>第16部：TCP輻輳制御（原著第16章）</h2>
            <h3 id="s16-1">16.1 輻輳制御が解決する問題</h3>
            <p>
                    フロー制御が「受信側の処理能力」を守るのに対し、輻輳制御は「ネットワーク経路全体の処理能力（ボトルネック帯域）」を守るための仕組みです。送信側は<code>cwnd</code>（輻輳ウィンドウ）という内部変数を管理し、実際の送信量は<code>min(cwnd, 受信ウィンドウ)</code>で決まります。
                </p>
            <h3 id="s16-2">16.2 古典的な輻輳制御：スロースタートと輻輳回避</h3>
            <Diagram id="diag-28" label="16.2 古典的な輻輳制御：スロースタートと輻輳回避" />
            <h3 id="s16-3">16.3 損失ベース方式と遅延ベース方式：CUBICとBBR</h3>
            <p>現代主要なTCP輻輳制御アルゴリズムは大きく2系統に分けられます。</p>
            <div className="table-scroll" tabIndex={0} role="region" aria-label="現代主要なTCP輻輳制御アルゴリズムは大きく2系統に分けられます。">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">方式</th>
                                <th scope="col">判断基準</th>
                                <th scope="col">代表アルゴリズム</th>
                                <th scope="col">採用状況</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>損失ベース</td>
                                <td>パケットロスの発生を輻輳のシグナルとする</td>
                                <td>Reno, CUBIC</td>
                                <td>LinuxやWindows、Appleの各OSで長年デフォルト</td>
                            </tr>
                            <tr className="even">
                                <td>モデルベース（遅延・帯域推定）</td>
                                <td>実測RTTと帯域から経路の状態を推定する</td>
                                <td>BBR（Bottleneck Bandwidth and RTT）</td>
                                <td>Googleが開発、YouTubeなど大規模サービスで採用が進む</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            <p>
                    <strong>CUBIC</strong>（RFC
                    9438、2023年に標準化トラックへ格上げ）は、ウィンドウサイズを3次関数（cubic
                    function）に従って増加させることで、高速・長距離回線でも安定してスループットを稼げるよう設計されています。原著刊行後の2010年前後からLinuxの既定アルゴリズムとして採用され、現在も広く使われています。
                </p>
            <p>
                    <strong>BBR</strong>はロスではなく、ボトルネック帯域幅とRTTの推定モデルに基づいて送信ペースを決定する、根本的に異なるアプローチです。詳細な最新動向は第19部で扱います。
                </p>
            <Diagram id="diag-29" label="BBRはロスではなく、ボトルネック帯域幅とRTTの推定モデルに基づいて送信ペースを決定する、根本的に異なるアプローチです。詳細な最新動向は第19部で扱います。" />
            <h3 id="s16-4">16.4 輻輳制御はエンドツーエンドで完結する設計</h3>
            <p>
                    輻輳制御アルゴリズムはTCPの送信側実装だけで完結し、受信側やネットワーク機器の協力を必須としません（これも第1部のend-to-endの原則の具体例です）。ただし、ECN（Explicit
                    Congestion Notification, RFC
                    3168）のように、ルータが輻輳を検知した際にパケットを破棄する代わりにIPヘッダにマークを付け、それを見た受信側がACK経由で送信側に通知するという、ネットワーク機器が協調するオプション機構も存在します。
                </p>
            <div className="callout-practice">
                    <div className="icon">✓ </div>
                    <div className="body">
                        <div className="label">ベストプラクティス </div>
                        <ul>
                            <li>
                                アプリケーションの体感速度がボトルネック帯域より低い場合、輻輳制御アルゴリズムの選択（<code>sysctl net.ipv4.tcp_congestion_control</code>）を確認する価値がある。ただし多くの場合ボトルネックは他要因（DNS解決、TLSハンドシェイク、アプリケーション処理）にある点に注意。{' '}
                            </li>
                            <li>
                                高遅延回線でのスループットテストでは、スロースタートの立ち上がりに一定のRTT数がかかることを踏まえ、短時間の計測で結論を出さない。{' '}
                            </li>
                            <li>
                                ECNは有効化することで無駄なパケロス（＝再送コスト）を減らせる可能性があるが、経路上のミドルボックスがECNビットを不正に扱うケースが歴史的にあったため、有効化後は実測で確認する。
                            </li>
                        </ul>
                    </div>
                </div>
            <hr />
            <h2 id="part17" tabIndex={-1}>第17部：TCPキープアライブ（原著第17章）</h2>
            <h3 id="s17-1">17.1 キープアライブが解決する問題</h3>
            <p>
                    TCPコネクションはデータのやり取りがなければ「アイドル」状態のままいつまでも維持されます。しかし実際には、相手ホストがクラッシュした、経路上のNAT/ファイアウォールがセッションテーブルからエントリを削除した、といった理由で相手にはもう届かないのに、こちら側だけがコネクションが生きていると誤認している状態（<strong>半開（half-open）コネクション</strong>）が起こり得ます。TCPキープアライブは、アイドル状態が続いた際に定期的にプローブパケットを送り、相手がまだ生きているかを確認する仕組みです（RFC
                    9293のAppendixで規定、SHOULDレベルのオプション機能）。
                </p>
            <Diagram id="diag-30" label="TCPコネクションはデータのやり取りがなければ「アイドル」状態のままいつまでも維持されます。しかし実際には、相手ホストがクラッシュした、経路上のNAT/ファイアウォールがセッションテーブルからエントリを削除した、といった理由で相手にはもう届かないのに、こちら側だけがコネクションが生きていると誤認している状態（半開（half-open）コネクション）が起こり得ます。TCPキープアライブは、アイドル状態が続いた際に定期的にプローブパケットを送り、相手がまだ生きているかを確認する仕組みです（RFC 9293のAppendixで規定、SHOULDレベルのオプション機能）。" />
            <h3 id="s17-2">
                    17.2 OSレベルの既定値とアプリケーションレベルのキープアライブの違い
                </h3>
            <p>
                    OSカーネルのTCPキープアライブは一般に「数時間」というかなり長いアイドル時間の後に発動するよう既定設定されており（例：Linuxの<code>tcp_keepalive_time</code>は既定7200秒＝2時間）、素早い異常検知には向きません。そのため、多くのアプリケーション・プロトコル（HTTP/2のPINGフレーム、gRPCのキープアライブ、データベース接続プールなど）は、OSのTCPキープアライブとは別に、アプリケーション層で独自の短い間隔のハートビートを実装します。
                </p>
            <h3 id="s17-3">17.3 クラウド環境のアイドルタイムアウトとの整合</h3>
            <p>
                    クラウドのロードバランサやNATゲートウェイは、TCPの仕様とは無関係に<strong>独自のアイドルタイムアウト</strong>でコネクションを強制切断することがあります。例えばAWSのNetwork
                    Load
                    Balancer（NLB）は既定でTCPアイドルタイムアウトが350秒に設定されており（2024年9月以降は60〜6000秒の範囲で調整可能）、Azure
                    Load
                    Balancerは既定4分（4〜100分の範囲で設定可能）です。アプリケーション側のキープアライブ間隔がこれより長いと、ロードバランサに気づかれないまま接続が切断され、次回送信時に予期しないリセットエラーが発生します。
                </p>
            <Diagram id="diag-31" label="クラウドのロードバランサやNATゲートウェイは、TCPの仕様とは無関係に独自のアイドルタイムアウトでコネクションを強制切断することがあります。例えばAWSのNetwork Load Balancer（NLB）は既定でTCPアイドルタイムアウトが350秒に設定されており（2024年9月以降は60〜6000秒の範囲で調整可能）、Azure Load Balancerは既定4分（4〜100分の範囲で設定可能）です。アプリケーション側のキープアライブ間隔がこれより長いと、ロードバランサに気づかれないまま接続が切断され、次回送信時に予期しないリセットエラーが発生します。" />
            <div className="callout-practice">
                    <div className="icon">✓ </div>
                    <div className="body">
                        <div className="label">ベストプラクティス </div>
                        <ul>
                            <li>
                                長時間接続を維持するアプリケーション（DBコネクションプール、WebSocket、gRPCストリーム）では、経路上の各ミドルボックス（ロードバランサ、NATゲートウェイ、プロキシ）のアイドルタイムアウトのうち<strong>最も短いもの</strong>より確実に短い間隔でキープアライブを送るよう設計する。{' '}
                            </li>
                            <li>
                                OSの既定TCPキープアライブ（数時間単位）に依存せず、アプリケーション層で明示的にキープアライブ・ハートビートを実装する。{' '}
                            </li>
                            <li>
                                クラウド環境ではインスタンスタイプやNIC世代によってもコネクション追跡のアイドルタイムアウトの既定値が変わることがある（例：AWSはNitro第6世代で既定値を大幅に短縮した実績がある）。既定値を過信せず、必要に応じて明示的に設定する。
                            </li>
                        </ul>
                    </div>
                </div>
            <hr />
        </>
    );
}
