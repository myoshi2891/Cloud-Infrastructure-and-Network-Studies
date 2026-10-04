/** 原本の目次と全21図。目次リンクとscroll spyの単一正本。 */
export const NAV_ITEMS = [
    {
        "id": "introduction",
        "label": "はじめに: なぜコンピュータネットワークを学ぶのか",
        "level": 2
    },
    {
        "id": "best-practices",
        "label": "学習の進め方(ベストプラクティス)",
        "level": 2
    },
    {
        "id": "step0",
        "label": "ステップ0: 全体像を掴む ― インターネットはどう成り立っているか",
        "level": 2
    },
    {
        "id": "step0-1",
        "label": "インターネットを構成する要素",
        "level": 3
    },
    {
        "id": "step0-2",
        "label": "プロトコル階層化という考え方",
        "level": 3
    },
    {
        "id": "step0-3",
        "label": "カプセル化: データが層を降りていく仕組み",
        "level": 3
    },
    {
        "id": "step1",
        "label": "ステップ1: 物理層 ― ビットを電気信号・光・電波に変える",
        "level": 2
    },
    {
        "id": "step1-1",
        "label": "伝送媒体の比較",
        "level": 3
    },
    {
        "id": "step1-2",
        "label": "信号化・多重化の基礎",
        "level": 3
    },
    {
        "id": "step2",
        "label": "ステップ2: データリンク層 ― フレーム化と誤り検出でリンクを渡す",
        "level": 2
    },
    {
        "id": "step2-1",
        "label": "フレーミングと誤り検出",
        "level": 3
    },
    {
        "id": "step2-2",
        "label": "イーサネット(Ethernet)フレームの構造",
        "level": 3
    },
    {
        "id": "step2-3",
        "label": "スイッチの学習と転送(自己学習ブリッジ)",
        "level": 3
    },
    {
        "id": "step2-4",
        "label": "VLAN(仮想LAN)による論理分割",
        "level": 3
    },
    {
        "id": "step3",
        "label": "ステップ3: メディアアクセス制御(MAC)サブレイヤー ― 誰が話す番かを決める",
        "level": 2
    },
    {
        "id": "step3-1",
        "label": "CSMA/CD(有線イーサネットの歴史的方式)",
        "level": 3
    },
    {
        "id": "step3-2",
        "label": "CSMA/CA(無線LANで使われる方式)",
        "level": 3
    },
    {
        "id": "step3-3",
        "label": "Wi-Fi世代の比較",
        "level": 3
    },
    {
        "id": "step4",
        "label": "ステップ4: ネットワーク層 ― 異なるネットワークをまたいで届ける",
        "level": 2
    },
    {
        "id": "step4-1",
        "label": "IPv4アドレッシングとCIDR",
        "level": 3
    },
    {
        "id": "step4-2",
        "label": "サブネッティングの手順",
        "level": 3
    },
    {
        "id": "step4-3",
        "label": "IPv6が必要な理由と基本構造",
        "level": 3
    },
    {
        "id": "step4-4",
        "label": "ルーティングアルゴリズムの2つの系統",
        "level": 3
    },
    {
        "id": "step4-5",
        "label": "NAT(ネットワークアドレス変換)",
        "level": 3
    },
    {
        "id": "step4-6",
        "label": "ICMPとインターネットの経路検証",
        "level": 3
    },
    {
        "id": "step5",
        "label": "ステップ5: トランスポート層 ― エンドツーエンドの信頼性",
        "level": 2
    },
    {
        "id": "step5-1",
        "label": "TCPの3ウェイハンドシェイク",
        "level": 3
    },
    {
        "id": "step5-2",
        "label": "TCPコネクションの状態遷移",
        "level": 3
    },
    {
        "id": "step5-3",
        "label": "フロー制御と輻輳制御",
        "level": 3
    },
    {
        "id": "step5-4",
        "label": "TCPとUDPの比較",
        "level": 3
    },
    {
        "id": "step6",
        "label": "ステップ6: アプリケーション層 ― 人とアプリのためのプロトコル",
        "level": 2
    },
    {
        "id": "step6-1",
        "label": "DNS(Domain Name System)による名前解決",
        "level": 3
    },
    {
        "id": "step6-2",
        "label": "HTTP/HTTPSの基本",
        "level": 3
    },
    {
        "id": "step6-3",
        "label": "メールプロトコルの概要",
        "level": 3
    },
    {
        "id": "step6-4",
        "label": "DHCPによる自動設定",
        "level": 3
    },
    {
        "id": "step7",
        "label": "ステップ7: ネットワークセキュリティ ― 守るべきものと手段",
        "level": 2
    },
    {
        "id": "step7-1",
        "label": "TLSによる暗号化通信",
        "level": 3
    },
    {
        "id": "step7-2",
        "label": "VPN(Virtual Private Network)",
        "level": 3
    },
    {
        "id": "step7-3",
        "label": "ファイアウォールとDMZアーキテクチャ",
        "level": 3
    },
    {
        "id": "step7-4",
        "label": "耐量子暗号(PQC)への移行",
        "level": 3
    },
    {
        "id": "step8",
        "label": "ステップ8: 2026年の最新動向 ― 今のインターネットはどう変わったか",
        "level": 2
    },
    {
        "id": "step9",
        "label": "ステップ9: トラブルシューティングの基本 ― 現場で使う一次切り分け",
        "level": 2
    },
    {
        "id": "step9-1",
        "label": "よく使う一次切り分けコマンド",
        "level": 3
    },
    {
        "id": "roadmap",
        "label": "学習ロードマップ",
        "level": 2
    },
    {
        "id": "checklist",
        "label": "ベストプラクティス チェックリスト",
        "level": 2
    },
    {
        "id": "glossary",
        "label": "用語集",
        "level": 2
    },
    {
        "id": "references",
        "label": "参考文献",
        "level": 2
    }
] as const;

export const DIAGRAMS = {
    'diag-1': `flowchart TB
subgraph OSI["OSI参照モデル(7層)"]
direction TB
O7["第7層 アプリケーション層<br/>Application"]
O6["第6層 プレゼンテーション層<br/>Presentation"]
O5["第5層 セッション層<br/>Session"]
O4["第4層 トランスポート層<br/>Transport"]
O3["第3層 ネットワーク層<br/>Network"]
O2["第2層 データリンク層<br/>Data Link"]
O1["第1層 物理層<br/>Physical"]
O7 --> O6 --> O5 --> O4 --> O3 --> O2 --> O1
end

subgraph TCPIP["TCP/IPモデル(4層)"]
direction TB
T4["アプリケーション層<br/>HTTP・DNS・SMTPなど"]
T3["トランスポート層<br/>TCP・UDP"]
T2["インターネット層<br/>IP"]
T1["リンク層<br/>Ethernet・Wi-Fiなど"]
T4 --> T3 --> T2 --> T1
end

O7 -.対応.- T4
O6 -.対応.- T4
O5 -.対応.- T4
O4 -.対応.- T3
O3 -.対応.- T2
O2 -.対応.- T1
O1 -.対応.- T1`,
    'diag-2': `flowchart LR
subgraph Sender["送信側(下向きにカプセル化)"]
direction TB
A1["アプリケーション層<br/>データ本体"] --> A2["トランスポート層<br/>TCP/UDPヘッダを付加<br/>→ セグメント/データグラム"]
A2 --> A3["ネットワーク層<br/>IPヘッダを付加<br/>→ パケット"]
A3 --> A4["リンク層<br/>Ethernetヘッダ・トレーラを付加<br/>→ フレーム"]
A4 --> A5["物理層<br/>ビット列として送出"]
end

subgraph Receiver["受信側(上向きに非カプセル化)"]
direction TB
B5["物理層<br/>ビット列を受信"] --> B4["リンク層<br/>Ethernetヘッダを除去"]
B4 --> B3["ネットワーク層<br/>IPヘッダを除去"]
B3 --> B2["トランスポート層<br/>TCP/UDPヘッダを除去"]
B2 --> B1["アプリケーション層<br/>データ本体を受け取る"]
end

A5 -- 伝送路 --> B5`,
    'diag-3': `flowchart TB
subgraph FDM["周波数分割多重(FDM)"]
direction LR
F1["チャネルA<br/>周波数帯1"]
F2["チャネルB<br/>周波数帯2"]
F3["チャネルC<br/>周波数帯3"]
end
subgraph TDM["時分割多重(TDM)"]
direction LR
T1["A用スロット"] --> T2["B用スロット"] --> T3["C用スロット"] --> T4["A用スロット..."]
end
subgraph WDM["波長分割多重(WDM・光ファイバ)"]
direction LR
W1["波長λ1"]
W2["波長λ2"]
W3["波長λ3"]
end`,
    'diag-4': `sequenceDiagram
participant PC-A as PC-A
participant SW as L2スイッチ
participant PC-B as PC-B
participant PC-C as PC-C

PC-A->>SW: フレーム送信(宛先:PC-Bの MAC)
Note over SW: 送信元MAC(PC-A)とポート番号を<br/>MACアドレステーブルに学習
Note over SW: 宛先MACがテーブルに未登録のため<br/>受信ポート以外へフラッディング
SW->>PC-B: フレーム転送
SW->>PC-C: フレーム転送(該当なし・破棄)
PC-B->>SW: 応答フレーム送信(宛先:PC-Aの MAC)
Note over SW: 送信元MAC(PC-B)とポート番号を学習
Note over SW: 宛先MAC(PC-A)はテーブルに登録済み
SW->>PC-A: 応答フレームをPC-Aのポートのみへ転送`,
    'diag-5': `flowchart TB
SW["1台の物理スイッチ"]
subgraph VLAN10["VLAN 10(経理部)"]
PC1["PC-1"]
PC2["PC-2"]
end
subgraph VLAN20["VLAN 20(開発部)"]
PC3["PC-3"]
PC4["PC-4"]
end
PC1 --- SW
PC2 --- SW
PC3 --- SW
PC4 --- SW`,
    'diag-6': `flowchart TD
Start["送信データが発生"] --> Sense["回線が空いているか<br/>キャリアセンス"]
Sense -->|使用中| Wait["ランダム時間待機"]
Wait --> Sense
Sense -->|空いている| Send["送信開始"]
Send --> Collide{"送信中に衝突を検出したか"}
Collide -->|衝突あり| Jam["ジャム信号を送出し<br/>全ノードに衝突を通知"]
Jam --> Backoff["バックオフアルゴリズムで<br/>再送までの待機時間を計算"]
Backoff --> Wait
Collide -->|衝突なし| Done["送信完了"]`,
    'diag-7': `flowchart TD
Start2["送信データが発生"] --> Sense2["回線が空いているか<br/>キャリアセンス"]
Sense2 -->|使用中| Defer["送信を保留し待機"]
Defer --> Sense2
Sense2 -->|一定時間空いている| RTS["必要に応じてRTS<br/>送信要求フレームを送出"]
RTS --> CTS{"一定時間内に受信側からCTS<br/>送信許可フレームを受信できたか"}
CTS -->|"受信した"| Send2["データフレームを送信"]
CTS -->|"CTSタイムアウト"| RtsRetry{"RTSの再送回数が<br/>上限に達したか"}
RtsRetry -->|"未達"| RtsBackoff["ランダムバックオフ後にRTSを再送"]
RtsBackoff --> RTS
RtsRetry -->|"上限に達した"| RtsFail["送信失敗<br/>フレームを破棄し上位層へ通知"]
Send2 --> ACK{"受信側からACKが<br/>返ってきたか"}
ACK -->|ACKなし=衝突とみなす| Backoff2["ランダムバックオフ後に再送"]
Backoff2 --> Sense2
ACK -->|ACKあり| Done2["送信完了"]`,
    'diag-8': `flowchart TD
S1["Step1: 必要なホスト数を洗い出す<br/>(将来の増加分も考慮)"] --> S2["Step2: 必要ホスト数を満たす<br/>最小のホストビット数nを求める<br/>(2^n − 2 ≥ 必要ホスト数)"]
S2 --> S3["Step3: プレフィックス長を<br/>32 − n として決定"]
S3 --> S4["Step4: サブネットマスクを算出"]
S4 --> S5["Step5: ネットワークアドレス・<br/>ブロードキャストアドレス・<br/>利用可能範囲を確定"]
S5 --> S6["Step6: VLSM(可変長サブネットマスク)で<br/>用途ごとに無駄なく分割"]`,
    'diag-9': `flowchart LR
subgraph DV["距離ベクトル型"]
direction TB
DV1["ルータA: 隣接ルータへ<br/>『自分が知る全宛先への距離』を通知"] --> DV2["ルータB: 受け取った距離+1ホップで<br/>自分の経路表を更新"]
DV2 --> DV3["変化があれば<br/>さらに隣へ伝播"]
end
subgraph LS["リンクステート型"]
direction TB
LS1["各ルータ: 自分に直結する<br/>リンク情報をフラッディングで<br/>全ルータへ配布"] --> LS2["各ルータ: 集めた情報から<br/>ネットワーク全体の地図を構築"]
LS2 --> LS3["ダイクストラ法で<br/>自分から見た最短経路木を計算"]
end`,
    'diag-10': `sequenceDiagram
participant Host as 内部ホスト<br/>192.168.1.10:54321
participant Router as NATルータ<br/>グローバルIP: 203.0.113.5
participant Server as インターネット上のサーバー

Host->>Router: 送信元 192.168.1.10:54321<br/>宛先 サーバーのIP:443
Note over Router: NATテーブルに変換対応を記録<br/>(192.168.1.10:54321 ⇔ 203.0.113.5:40001)
Router->>Server: 送信元 203.0.113.5:40001<br/>宛先 サーバーのIP:443
Server->>Router: 応答 送信元:サーバーのIP:443<br/>宛先 203.0.113.5:40001
Note over Router: NATテーブルを参照し<br/>元の内部ホストへ変換
Router->>Host: 応答 送信元:サーバーのIP:443<br/>宛先 192.168.1.10:54321`,
    'diag-11': `sequenceDiagram
participant Client as クライアント
participant Server as サーバー

Client->>Server: SYN(seq=x)
Note over Server: 接続要求を受理し<br/>応答を準備
Server->>Client: SYN-ACK(seq=y, ack=x+1)
Client->>Server: ACK(seq=x+1, ack=y+1)
Note over Client,Server: コネクション確立完了<br/>データ転送開始`,
    'diag-12': `stateDiagram-v2
direction LR
[*] --> CLOSED
CLOSED --> LISTEN: サーバー側がlisten開始
CLOSED --> SYN_SENT: クライアント側がconnect実行
LISTEN --> SYN_RCVD: SYNを受信しSYN-ACKを返す
SYN_SENT --> ESTABLISHED: SYN-ACKを受信しACKを返す
SYN_RCVD --> ESTABLISHED: ACKを受信
ESTABLISHED --> FIN_WAIT_1: closeを呼び出しFIN送信
ESTABLISHED --> CLOSE_WAIT: 相手からFINを受信
FIN_WAIT_1 --> FIN_WAIT_2: ACKを受信
FIN_WAIT_2 --> TIME_WAIT: 相手からFINを受信しACKを返す
CLOSE_WAIT --> LAST_ACK: closeを呼び出しFIN送信
LAST_ACK --> CLOSED: ACKを受信
TIME_WAIT --> CLOSED: 一定時間経過後`,
    'diag-13': `flowchart TD
Start3["接続確立"] --> SS["スロースタート<br/>ウィンドウを指数的に増加"]
SS --> Threshold{"輻輳ウィンドウが<br/>閾値(ssthresh)に到達したか"}
Threshold -->|未到達| SS
Threshold -->|到達| CA["輻輳回避<br/>ウィンドウを線形的に増加"]
CA --> Loss{"パケットロスを検出したか"}
Loss -->|タイムアウトによる検出| SlowReset["ssthreshを半分に設定し<br/>スロースタートへ戻る"]
Loss -->|重複ACK3回による検出| FastRecovery["高速リトランスミット/<br/>高速リカバリで<br/>ウィンドウを緩やかに調整"]
SlowReset --> SS
FastRecovery --> CA`,
    'diag-14': `sequenceDiagram
participant App as アプリケーション
participant Resolver as スタブリゾルバ<br/>(OS内)
participant Recursive as フルサービスリゾルバ<br/>(ISPやパブリックDNS)
participant Root as ルートDNSサーバー
participant TLD as TLDサーバー(.com等)
participant Auth as 権威DNSサーバー<br/>(example.com)

App->>Resolver: example.comのIPは?
Resolver->>Recursive: 再帰的問い合わせ
Recursive->>Root: .comの権威サーバーは?
Root-->>Recursive: TLDサーバーのアドレス
Recursive->>TLD: example.comの権威サーバーは?
TLD-->>Recursive: 権威サーバーのアドレス
Recursive->>Auth: example.comのAレコードは?
Auth-->>Recursive: IPアドレスを応答
Recursive-->>Resolver: IPアドレスを応答(結果をキャッシュ)
Resolver-->>App: IPアドレスを返却`,
    'diag-15': `sequenceDiagram
participant Browser as ブラウザ
participant DNS as DNSリゾルバ
participant Server as Webサーバー

Browser->>DNS: ドメイン名解決
DNS-->>Browser: IPアドレス
Browser->>Server: TCP 3ウェイハンドシェイク
Browser->>Server: TLSハンドシェイク(HTTPSの場合)
Browser->>Server: HTTP GETリクエスト
Note over Server: リクエストを処理し<br/>レスポンスを生成
Server-->>Browser: HTTP 200 OK + レスポンスボディ
Note over Browser: レンダリングして表示`,
    'diag-16': `sequenceDiagram
participant Client as クライアント端末
participant DHCP as DHCPサーバー

Client->>DHCP: DHCP Discover(ブロードキャスト)
DHCP-->>Client: DHCP Offer(候補IPアドレスを提示)
Client->>DHCP: DHCP Request(そのIPアドレスの利用を要求)
DHCP-->>Client: DHCP Ack(割り当てを確定し設定情報を送付)`,
    'diag-17': `sequenceDiagram
participant Client2 as クライアント
participant Server2 as サーバー

Client2->>Server2: ClientHello(対応する鍵交換方式・暗号スイートを提示)
Server2-->>Client2: ServerHello + 証明書 + 鍵交換情報(1往復で応答)
Note over Client2,Server2: 双方で共通鍵を導出
Server2-->>Client2: Finished(サーバー側のハンドシェイク完了)
Client2->>Server2: Finished(暗号化されたアプリケーションデータの送信開始)`,
    'diag-18': `flowchart LR
subgraph SiteA["拠点A(社内LAN)"]
UserA["端末A"]
GwA["VPNゲートウェイA"]
end
subgraph Internet2["インターネット"]
Tunnel(("暗号化トンネル<br/>IPsec / WireGuardなど"))
end
subgraph SiteB["拠点B(社内LAN)"]
GwB["VPNゲートウェイB"]
UserB["端末B"]
end
UserA --- GwA
GwA === Tunnel
Tunnel === GwB
GwB --- UserB`,
    'diag-19': `flowchart LR
Internet3(("インターネット")) --> FW1["外部ファイアウォール"]
FW1 --> DMZ["DMZ<br/>公開Webサーバー・メールサーバー"]
DMZ --> FW2["内部ファイアウォール"]
FW2 --> Internal["内部ネットワーク<br/>業務システム・データベース"]`,
    'diag-20': `flowchart TB
Y1["2024年以前<br/>IPv4依存・TCPベースHTTP/2主流"] --> Y2["2025年<br/>Wi-Fi 7標準化・RPKI 53.9%へ<br/>耐量子TLSが人間トラフィックの過半数に"]
Y2 --> Y3["2026年3月<br/>IPv6ネイティブアクセスが<br/>Google計測で初めて50%突破"]
Y3 --> Y4["2026年後半<br/>Wi-Fi 7出荷が本格拡大<br/>Wi-Fi 8の実装検討が始動"]`,
    'diag-21': `flowchart TD
Q1["症状: 通信ができない/遅い"] --> Q2{"物理的な接続は<br/>正常か(リンクランプ・電波強度)"}
Q2 -->|異常| F1["物理層の問題<br/>ケーブル・電波環境を確認"]
Q2 -->|正常| Q3{"同一セグメント内の<br/>通信(ARP解決など)は可能か"}
Q3 -->|不可| F2["データリンク層の問題<br/>スイッチ設定・VLANを確認"]
Q3 -->|可能| Q4{"デフォルトゲートウェイへ<br/>pingが通るか"}
Q4 -->|不可| F3["ネットワーク層(自セグメント〜GW)の問題の可能性<br/>IP設定・ルーティングに加え<br/>ICMPがFW/ACLで遮断されていないか確認"]
Q4 -->|可能| Q5{"traceroute/tracertで<br/>宛先まで到達するか"}
Q5 -->|不可| F4["経路上のネットワーク層の問題の可能性<br/>途中ルータのルーティングを確認しつつ<br/>ICMP/UDPプローブがFW・ACLで<br/>遮断されていないかも確認"]
Q5 -->|可能| Q6{"宛先サービスのトランスポートは<br/>TCPか、UDP/QUIC(HTTP/3を含む)か"}
Q6 -->|TCP| Q6T{"宛先ポートへの<br/>TCP接続(telnet/nc)は成立するか"}
Q6 -->|UDP/QUIC| Q6U{"プロトコル固有の応答が返るか<br/>(dig @宛先 / nc -u / curl --http3)"}
Q6T -->|不可| F5["トランスポート層(TCP)の問題の可能性<br/>宛先サービスがLISTENしているか<br/>経路のFW・ACL・SGで遮断されていないか<br/>戻り経路のルーティングを確認"]
Q6U -->|不可| F5U["トランスポート層(UDP/QUIC)の問題の可能性<br/>UDPはコネクションを張らないため<br/>telnet/ncのTCP失敗を障害の根拠にしない<br/>該当UDPポート(HTTP/3では通例UDP/443)の許可と<br/>UDPを落とすミドルボックスの有無を確認"]
Q6T -->|可能| Q7{"アプリケーションの応答<br/>(HTTPステータス等)は正常か"}
Q6U -->|可能| Q7
Q7 -->|異常| F6["アプリケーション層の問題<br/>アプリログ・証明書・DNSを確認"]
Q7 -->|正常| F7["ネットワーク経路は正常<br/>クライアント側の実装・キャッシュ等を確認"]`,
} as const;
export type DiagramId = keyof typeof DIAGRAMS;
