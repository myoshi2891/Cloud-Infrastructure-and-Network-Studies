/**
 * TCP/IP Illustrated, Volume 1: The Protocols（第2版）解説ガイド
 * 定数定義（Mermaid ダイアグラム、ナビゲーション項目）
 */

export type DiagramId =
    | "diag-0"
    | "diag-1"
    | "diag-2"
    | "diag-3"
    | "diag-4"
    | "diag-5"
    | "diag-6"
    | "diag-7"
    | "diag-8"
    | "diag-9"
    | "diag-10"
    | "diag-11"
    | "diag-12"
    | "diag-13"
    | "diag-14"
    | "diag-15"
    | "diag-16"
    | "diag-17"
    | "diag-18"
    | "diag-19"
    | "diag-20"
    | "diag-21"
    | "diag-22"
    | "diag-23"
    | "diag-24"
    | "diag-25"
    | "diag-26"
    | "diag-27"
    | "diag-28"
    | "diag-29"
    | "diag-30"
    | "diag-31"
    | "diag-32"
    | "diag-33"
    | "diag-34";

export const DIAGRAMS: Record<DiagramId, string> = {
    "diag-0": "flowchart LR\n    A[\"Volume 1<br/>プロトコル本体<br/>(この本)\"] --- B[\"Volume 2<br/>4.4BSD実装<br/>(1995年, 未改訂)\"]\n    A --- C[\"Volume 3<br/>トランザクション型<br/>TCP/HTTP/NNTP<br/>(1996年, 未改訂)\"]\n\n    classDef vol fill:#eaf1ff,stroke:#2f6feb,color:#173d7a\n    class A,B,C vol",
    "diag-1": "flowchart TB\n    subgraph EndToEnd[\"end-to-endの原則\"]\n        direction LR\n        H1[\"ホストA<br/>（複雑な処理：再送・順序制御）\"] -->|\"シンプルな転送のみ\"| R1[ルータ] --> R2[ルータ] --> H2[\"ホストB<br/>（複雑な処理：再送・順序制御）\"]\n    end\n\n    classDef host fill:#eaf1ff,stroke:#2f6feb,color:#173d7a\n    classDef router fill:#eef2f8,stroke:#7488a8,color:#33455e\n    class H1,H2 host\n    class R1,R2 router",
    "diag-2": "flowchart TB\n    subgraph App[\"アプリケーション層\"]\n        Data[\"アプリケーションデータ\"]\n    end\n    subgraph Trans[\"トランスポート層\"]\n        TCPSeg[\"TCPヘッダ + アプリケーションデータ\"]\n    end\n    subgraph Net[\"ネットワーク層\"]\n        IPPkt[\"IPヘッダ + TCPヘッダ + アプリケーションデータ\"]\n    end\n    subgraph Link[\"リンク層\"]\n        Frame[\"Etherヘッダ + IPヘッダ + TCPヘッダ + アプリケーションデータ + FCS\"]\n    end\n\n    Data --> TCPSeg --> IPPkt --> Frame\n\n    classDef layer fill:#eaf1ff,stroke:#2f6feb,color:#173d7a\n    class Data,TCPSeg,IPPkt,Frame layer",
    "diag-3": "flowchart LR\n    A[\"Etherフレームの<br/>EtherTypeフィールド\"] -->|\"0x0800 なら\"| B[\"IPで処理\"]\n    A -->|\"0x0806 なら\"| C[\"ARPで処理\"]\n    A -->|\"0x86DD なら\"| D[\"IPv6で処理\"]\n    B --> E[\"IPヘッダの<br/>Protocolフィールド\"]\n    E -->|\"6 なら\"| F[\"TCPで処理\"]\n    E -->|\"17 なら\"| G[\"UDPで処理\"]\n    E -->|\"1 なら\"| H[\"ICMPで処理\"]\n    F --> I[\"TCPヘッダの<br/>宛先ポート番号\"]\n    I -->|\"443 なら\"| J[\"HTTPSサーバプロセスへ\"]\n\n    classDef step fill:#eef2f8,stroke:#7488a8,color:#33455e\n    class A,B,C,D,E,F,G,H,I,J step",
    "diag-4": "flowchart TB\n    A[\"192.0.2.0/24<br/>256アドレス\"] --> B[\"192.0.2.0/26<br/>オフィスLAN 64アドレス\"]\n    A --> C[\"192.0.2.64/27<br/>サーバセグメント 32アドレス\"]\n    A --> D[\"192.0.2.96/30<br/>ルータ間リンク 4アドレス\"]\n    A --> E[\"192.0.2.100/32<br/>ループバック 1アドレス\"]\n\n    classDef net fill:#eaf1ff,stroke:#2f6feb,color:#173d7a\n    class A,B,C,D,E net",
    "diag-5": "flowchart LR\n    subgraph GUA[\"グローバルユニキャストアドレス 2001:db8::/32 の構造\"]\n        direction LR\n        A[\"グローバルルーティング<br/>プレフィックス (48bit)\"] --> B[\"サブネットID<br/>(16bit)\"] --> C[\"インターフェースID<br/>(64bit)\"]\n    end\n\n    classDef seg fill:#eef2f8,stroke:#7488a8,color:#33455e\n    class A,B,C seg",
    "diag-6": "flowchart LR\n    A[\"宛先MAC<br/>6byte\"] --- B[\"送信元MAC<br/>6byte\"] --- C[\"EtherType<br/>2byte\"] --- D[\"ペイロード<br/>46-1500byte\"] --- E[\"FCS<br/>4byte\"]\n\n    classDef field fill:#eef2f8,stroke:#7488a8,color:#33455e\n    class A,B,C,D,E field",
    "diag-7": "flowchart TB\n    A[\"物理スイッチポート<br/>（トランクポート）\"] --> B[\"VLAN 10<br/>（管理部門）\"]\n    A --> C[\"VLAN 20<br/>（開発部門）\"]\n    A --> D[\"VLAN 99<br/>（ゲストWi-Fi）\"]\n\n    classDef vlan fill:#eaf1ff,stroke:#2f6feb,color:#173d7a\n    class A,B,C,D vlan",
    "diag-8": "sequenceDiagram\n    participant A as ホストA (192.0.2.10)\n    participant All as ブロードキャストドメイン全体\n    participant B as ホストB (192.0.2.20)\n\n    A->>All: ARP Request（ブロードキャスト）<br/>\"192.0.2.20 は誰のMACですか？\"\n    Note over All: 192.0.2.20以外のホストは無視\n    B->>A: ARP Reply（ユニキャスト）<br/>\"192.0.2.20 は AA:BB:CC:DD:EE:FF です\"\n    Note over A: ARPキャッシュに<br/>(192.0.2.20, AA:BB:CC:DD:EE:FF)を登録",
    "diag-9": "flowchart LR\n    Attacker[\"攻撃者\"] -->|\"偽のARP応答:<br/>'ゲートウェイのIPは<br/>私のMACです'\"| Victim[\"被害ホスト\"]\n    Victim -.->|\"本来ゲートウェイ宛の<br/>トラフィックが<br/>攻撃者経由になる\"| Attacker\n    Attacker --> Gateway[\"本物の<br/>デフォルトゲートウェイ\"]\n\n    classDef bad fill:#fdeef1,stroke:#d1445b,color:#7a1f30\n    classDef normal fill:#eaf1ff,stroke:#2f6feb,color:#173d7a\n    class Attacker bad\n    class Victim,Gateway normal",
    "diag-10": "sequenceDiagram\n    participant Src as 送信元\n    participant R1 as ルータ1\n    participant R2 as ルータ2\n    participant Dst as 宛先\n\n    Src->>R1: パケット (TTL=1)\n    R1-->>Src: ICMP Time Exceeded<br/>（R1のアドレスから）\n    Src->>R1: パケット (TTL=2)\n    R1->>R2: 転送 (TTL=1)\n    R2-->>Src: ICMP Time Exceeded<br/>（R2のアドレスから）\n    Src->>R1: パケット (TTL=3)\n    R1->>R2: 転送 (TTL=2)\n    R2->>Dst: 転送 (TTL=1)\n    Dst-->>Src: 応答（到達成功）",
    "diag-11": "sequenceDiagram\n    participant C as クライアント\n    participant S1 as DHCPサーバ1\n    participant S2 as DHCPサーバ2\n\n    C->>S1: DHCPDISCOVER（ブロードキャスト）\n    C->>S2: DHCPDISCOVER（同一ブロードキャスト）\n    S1-->>C: DHCPOFFER（IPアドレス候補を提示）\n    S2-->>C: DHCPOFFER（別のIPアドレス候補）\n    Note over C: いずれか1つのOFFERを選択\n    C->>S1: DHCPREQUEST（ブロードキャストで選択を通知）\n    Note over S2: 選ばれなかったサーバは<br/>提示したアドレスを再利用可能に戻す\n    S1-->>C: DHCPACK（リース確定）",
    "diag-12": "flowchart TB\n    RA[\"ルータ広告（RA）\"] --> M{\"M/Oフラグ\"}\n    M -->|\"M=1 Managed\"| Stateful[\"DHCPv6でアドレス取得<br/>（フルステートフル）\"]\n    M -->|\"M=0, O=1 Other\"| Hybrid[\"SLAACでアドレス取得<br/>+ DHCPv6でDNS等の<br/>オプションのみ取得\"]\n    M -->|\"M=0, O=0\"| Pure[\"純粋SLAAC<br/>（RA内RDNSSでDNS取得も可）\"]\n\n    classDef opt fill:#eaf1ff,stroke:#2f6feb,color:#173d7a\n    class RA,Stateful,Hybrid,Pure opt",
    "diag-13": "flowchart LR\n    subgraph LAN[\"プライベートネットワーク 192.168.1.0/24\"]\n        H1[\"192.168.1.10:5000\"]\n        H2[\"192.168.1.11:5000\"]\n    end\n    NAT[\"NATデバイス<br/>（変換テーブルを保持）\"]\n    subgraph WAN[\"インターネット\"]\n        Server[\"203.0.113.5:443\"]\n    end\n\n    H1 -->|\"送信元 192.168.1.10:5000\"| NAT\n    H2 -->|\"送信元 192.168.1.11:5000\"| NAT\n    NAT -->|\"送信元 198.51.100.1:40001\"| Server\n    NAT -->|\"送信元 198.51.100.1:40002\"| Server\n\n    classDef host fill:#eaf1ff,stroke:#2f6feb,color:#173d7a\n    classDef nat fill:#eef2f8,stroke:#7488a8,color:#33455e\n    class H1,H2,Server host\n    class NAT nat",
    "diag-14": "flowchart LR\n    Home[\"家庭内端末<br/>192.168.x.x\"] -->|\"NAT44\"| Router[\"家庭用ルータ<br/>WAN側: 100.64.x.x\"]\n    Router -->|\"NAT・2段目\"| CGN[\"ISPのCGNAT機器\"]\n    CGN -->|\"NAT\"| Internet[\"公開インターネット<br/>グローバルIP\"]\n\n    classDef seg fill:#eaf1ff,stroke:#2f6feb,color:#173d7a\n    class Home,Router,CGN,Internet seg",
    "diag-15": "sequenceDiagram\n    participant Src as 送信ホスト\n    participant R as 途中ルータ<br/>次リンクMTU=1400\n    participant Dst as 宛先ホスト\n\n    Src->>R: 1500byteパケット (DFビット=1)\n    R--xR: MTU1400を超過、転送不可\n    R-->>Src: ICMP Type3/Code4<br/>「Fragmentation Needed」<br/>next-hop MTU=1400を通知\n    Note over Src: 送信サイズを1400以下に調整\n    Src->>R: 1400byteパケット (DFビット=1)\n    R->>Dst: 転送成功",
    "diag-16": "sequenceDiagram\n    participant H as ホスト（映像視聴クライアント）\n    participant R as ローカルルータ\n    participant Src as マルチキャスト配信元\n\n    H->>R: IGMP Membership Report<br/>「グループ 239.1.1.1 に加入したい」\n    Note over R: マルチキャストルーティングツリーに<br/>このセグメントを追加\n    Src->>R: マルチキャストトラフィック (239.1.1.1)\n    R->>H: 該当セグメントへ転送\n    R->>R: 定期的にMembership Queryで<br/>加入者の生存確認",
    "diag-17": "flowchart LR\n    A[\"送信元ポート<br/>2byte\"] --- B[\"宛先ポート<br/>2byte\"] --- C[\"長さ<br/>2byte\"] --- D[\"チェックサム<br/>2byte\"] --- E[\"データ\"]\n\n    classDef field fill:#eef2f8,stroke:#7488a8,color:#33455e\n    class A,B,C,D,E field",
    "diag-18": "flowchart TB\n    Orig[\"元のIPデータグラム<br/>合計4000byte<br/>（ヘッダ20byte + ペイロード3980byte）\"] --> F1[\"フラグメント1<br/>Offset=0, MF=1<br/>ペイロード1480byte<br/>全長1500byte\"]\n    Orig --> F2[\"フラグメント2<br/>Offset=185, MF=1<br/>（8byte単位、185×8＝1480byte目）<br/>ペイロード1480byte<br/>全長1500byte\"]\n    Orig --> F3[\"フラグメント3<br/>Offset=370, MF=0<br/>（8byte単位、370×8＝2960byte目）<br/>ペイロード1020byte<br/>全長1040byte\"]\n\n    classDef frag fill:#eaf1ff,stroke:#2f6feb,color:#173d7a\n    class Orig,F1,F2,F3 frag",
    "diag-19": "flowchart TB\n    Root[\"ルート .<br/>（ルートサーバ群）\"] --> COM[\"TLD: .com<br/>（Verisign等が運用）\"]\n    Root --> JP[\"TLD: .jp<br/>（JPRSが運用）\"]\n    COM --> Example[\"example.com<br/>（権威サーバ）\"]\n    Example --> WWW[\"www.example.com\"]\n\n    classDef dns fill:#eaf1ff,stroke:#2f6feb,color:#173d7a\n    class Root,COM,JP,Example,WWW dns",
    "diag-20": "sequenceDiagram\n    participant C as クライアント<br/>(スタブリゾルバ)\n    participant R as フルサービスリゾルバ<br/>(キャッシュDNSサーバ)\n    participant Root as ルートサーバ\n    participant TLD as .com TLDサーバ\n    participant Auth as example.com<br/>権威サーバ\n\n    C->>R: 再帰的問い合わせ<br/>www.example.comのAは？\n    R->>Root: 反復的問い合わせ\n    Root-->>R: .comサーバの場所を回答\n    R->>TLD: 反復的問い合わせ\n    TLD-->>R: example.comサーバの場所を回答\n    R->>Auth: 反復的問い合わせ\n    Auth-->>R: 93.184.216.34\n    R-->>C: 93.184.216.34（結果をキャッシュ）",
    "diag-21": "sequenceDiagram\n    participant C as クライアント\n    participant S as サーバ\n\n    C->>S: SYN (seq=x)\n    Note over S: SYNキューにエントリ作成<br/>（SYN RECEIVED状態）\n    S-->>C: SYN-ACK (seq=y, ack=x+1)\n    C->>S: ACK (seq=x+1, ack=y+1)\n    Note over C,S: 両者ESTABLISHED状態<br/>データ転送開始可能",
    "diag-22": "stateDiagram-v2\n    [*] --> CLOSED\n    CLOSED --> LISTEN: サーバがpassive open\n    CLOSED --> SYN_SENT: クライアントがactive open<br/>SYN送信\n    LISTEN --> SYN_RECEIVED: SYN受信、SYN-ACK送信\n    SYN_SENT --> ESTABLISHED: SYN-ACK受信、ACK送信\n    SYN_RECEIVED --> ESTABLISHED: ACK受信\n    ESTABLISHED --> FIN_WAIT_1: アプリがclose、FIN送信\n    ESTABLISHED --> CLOSE_WAIT: 相手からFIN受信\n    FIN_WAIT_1 --> FIN_WAIT_2: ACK受信\n    FIN_WAIT_1 --> CLOSING: 同時に相手からもFIN受信\n    FIN_WAIT_2 --> TIME_WAIT: 相手からFIN受信、ACK送信\n    CLOSING --> TIME_WAIT: ACK受信\n    CLOSE_WAIT --> LAST_ACK: アプリがclose、FIN送信\n    LAST_ACK --> CLOSED: ACK受信\n    TIME_WAIT --> CLOSED: タイムアウト経過（2MSL）",
    "diag-23": "flowchart LR\n    Attacker[\"攻撃者<br/>（大量の偽装SYN）\"] -->|\"SYN×大量\"| Server[\"サーバ\"]\n    Server -->|\"SYN-ACK<br/>（状態は保存せず<br/>Cookieに符号化）\"| Nowhere[\"応答は返らない<br/>（送信元は偽装）\"]\n    Legit[\"正規クライアント\"] -->|\"SYN\"| Server\n    Server -->|\"SYN-ACK\"| Legit\n    Legit -->|\"ACK<br/>（Cookie検証で復元）\"| Server\n\n    classDef bad fill:#fdeef1,stroke:#d1445b,color:#7a1f30\n    classDef normal fill:#eaf1ff,stroke:#2f6feb,color:#173d7a\n    class Attacker,Nowhere bad\n    class Legit,Server normal",
    "diag-24": "flowchart LR\n    A[\"RTTサンプルを測定\"] --> B[\"SRTT（平滑化RTT）を<br/>指数移動平均で更新\"]\n    A --> C[\"RTTVAR（RTT変動）を更新\"]\n    B --> D[\"RTO = SRTT + 4×RTTVAR\"]\n    C --> D\n    D --> E[\"次のセグメントの<br/>再送タイマーに適用\"]\n\n    classDef step fill:#eef2f8,stroke:#7488a8,color:#33455e\n    class A,B,C,D,E step",
    "diag-25": "sequenceDiagram\n    participant S as 送信側\n    participant R as 受信側\n\n    S->>R: セグメント1 (seq=1000)\n    S->>R: セグメント2 (seq=2000)<br/>【ネットワーク上で喪失】\n    S->>R: セグメント3 (seq=3000)\n    R-->>S: ACK 2000（セグメント1受信、次を期待）\n    R-->>S: 重複ACK 2000（セグメント3は順序外）\n    S->>R: セグメント4 (seq=4000)\n    R-->>S: 重複ACK 2000（2回目）\n    S->>R: セグメント5 (seq=5000)\n    R-->>S: 重複ACK 2000（3回目）\n    Note over S: 3回目の重複ACKで<br/>高速再送を判断\n    S->>R: セグメント2を再送 (seq=2000)\n    R-->>S: ACK 6000（seq=5000までの全セグメントを受信確認、まとめてACK）",
    "diag-26": "flowchart LR\n    Sender[\"送信側\"] -->|\"未確認送信データ<br/>（送信ウィンドウ内）\"| Network[\"ネットワーク\"]\n    Network --> Receiver[\"受信側<br/>受信バッファ\"]\n    Receiver -->|\"ACK + Window Size<br/>（残りバッファ容量を通知）\"| Sender\n\n    classDef node fill:#eaf1ff,stroke:#2f6feb,color:#173d7a\n    class Sender,Network,Receiver node",
    "diag-27": "flowchart TB\n    subgraph Stream[\"送信バイトストリーム（左から右へ）\"]\n        direction LR\n        A[\"送信・ACK済み\"] --- B[\"送信済み・未ACK<br/>（送信ウィンドウ内）\"] --- C[\"未送信だが<br/>送信可能\"] --- D[\"未送信・<br/>ウィンドウ外\"]\n    end\n\n    classDef acked fill:#eef2f8,stroke:#a8b7cc,color:#4f5d73\n    classDef inflight fill:#eaf1ff,stroke:#2f6feb,color:#173d7a\n    classDef sendable fill:#dcebff,stroke:#5b8ae0,color:#2a4d85\n    classDef future fill:#f8fafc,stroke:#c7d3e6,color:#5b6577\n    class A acked\n    class B inflight\n    class C sendable\n    class D future",
    "diag-28": "flowchart TB\n    Start[\"接続開始<br/>cwnd = 初期値(通常10MSS前後)\"] --> SS[\"スロースタート<br/>新規データのACKごとに<br/>cwndを最大1MSS増加<br/>（1RTTあたり約2倍の指数関数的増加）\"]\n    SS -->|\"cwndがssthreshに到達\"| CA[\"輻輳回避<br/>ACK受信ごとにcwndを線形増加<br/>（1RTTあたり+1MSS）\"]\n    CA -->|\"パケロス検知<br/>（3重複ACKなど）\"| Reduce[\"cwndを半減させ<br/>ssthreshを更新<br/>輻輳回避を継続\"]\n    CA -->|\"RTOタイムアウト\"| Reset[\"cwndを初期値に戻し<br/>スロースタートから再開\"]\n    Reduce --> CA\n    Reset --> SS\n\n    classDef phase fill:#eaf1ff,stroke:#2f6feb,color:#173d7a\n    classDef event fill:#fdeef1,stroke:#d1445b,color:#7a1f30\n    class Start,SS,CA phase\n    class Reduce,Reset event",
    "diag-29": "flowchart LR\n    subgraph LossBased[\"損失ベース方式（CUBIC等）\"]\n        L1[\"ウィンドウを増やし続ける\"] --> L2[\"パケロスが起きる<br/>＝輻輳のシグナル\"] --> L3[\"ウィンドウを減らす\"]\n    end\n    subgraph ModelBased[\"モデルベース方式（BBR）\"]\n        M1[\"RTTと配送レートを継続観測\"] --> M2[\"ボトルネック帯域を推定\"] --> M3[\"推定帯域に合わせて<br/>ペーシング送信\"]\n    end\n\n    classDef loss fill:#fdeef1,stroke:#d1445b,color:#7a1f30\n    classDef model fill:#eaf1ff,stroke:#2f6feb,color:#173d7a\n    class L1,L2,L3 loss\n    class M1,M2,M3 model",
    "diag-30": "sequenceDiagram\n    participant A as ホストA\n    participant B as ホストB（クラッシュ済み）\n\n    Note over A,B: 長時間データのやり取りなし（アイドル状態）\n    A->>B: キープアライブプローブ\n    Note over B: 応答なし（ホストダウン）\n    A->>B: キープアライブプローブ（再送、既定は複数回）\n    Note over A: 既定回数分応答がなければ<br/>コネクションをエラーで切断",
    "diag-31": "flowchart LR\n    App[\"アプリケーションの<br/>キープアライブ間隔\"] --> Compare{\"ロードバランサ／NATの<br/>アイドルタイムアウトより短いか？\"}\n    Compare -->|\"Yes\"| OK[\"接続は維持される\"]\n    Compare -->|\"No\"| Fail[\"ロードバランサ側で<br/>先に切断される<br/>（予期しないRSTエラー）\"]\n\n    classDef ok fill:#eaf1ff,stroke:#2f6feb,color:#173d7a\n    classDef bad fill:#fdeef1,stroke:#d1445b,color:#7a1f30\n    class App,Compare,OK ok\n    class Fail bad",
    "diag-32": "flowchart TB\n    subgraph L7[\"アプリケーション層\"]\n        DKIM[\"DKIM<br/>（メール送信ドメイン認証）\"]\n        DNSSEC[\"DNSSEC<br/>（DNS応答の署名検証）\"]\n    end\n    subgraph L5[\"セッション/プレゼンテーション相当\"]\n        TLS[\"TLS<br/>（トランスポートの上で暗号化）\"]\n    end\n    subgraph L3[\"ネットワーク層\"]\n        IPsec[\"IPsec<br/>（IPパケット自体を暗号化）\"]\n    end\n    subgraph L2[\"リンク層\"]\n        EAP[\"EAP<br/>（ネットワーク接続時の認証）\"]\n    end\n\n    classDef sec fill:#eaf1ff,stroke:#2f6feb,color:#173d7a\n    class DKIM,DNSSEC,TLS,IPsec,EAP sec",
    "diag-33": "sequenceDiagram\n    participant C as クライアント\n    participant S as サーバ\n\n    C->>S: ClientHello<br/>（対応する鍵共有方式・暗号スイートを提示）\n    S-->>C: ServerHello + 鍵共有<br/>+ EncryptedExtensions<br/>+ Certificate + CertificateVerify + Finished\n    Note over C: サーバ証明書を検証\n    C->>S: Finished\n    Note over C,S: 以降アプリケーションデータを<br/>暗号化して送受信（1RTTで完了）",
    "diag-34": "flowchart TB\n    S1[\"ステージ1：基礎固め<br/>第0〜2部<br/>アーキテクチャ原則とアドレッシング\"] --> S2[\"ステージ2：ローカルネットワーク<br/>第3〜9部<br/>リンク層・ARP・IP・DHCP・NAT・ICMP・マルチキャスト\"]\n    S2 --> S3[\"ステージ3：トランスポートとアプリ<br/>第10〜13部<br/>UDP・DNS・TCP基礎・接続管理\"]\n    S3 --> S4[\"ステージ4：性能とセキュリティ<br/>第14〜18部<br/>再送・輻輳制御・キープアライブ・暗号化\"]\n    S4 --> S5[\"ステージ5：最新動向へのブリッジ<br/>第19部<br/>2026年時点の実運用知識\"]\n\n    classDef stage fill:#eaf1ff,stroke:#2f6feb,color:#173d7a\n    class S1,S2,S3,S4,S5 stage"
};

export interface NavItem {
    id: string;
    label: string;
    isSub?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
    {
        "id": "part0",
        "label": "第0部：なぜ今この本を読むのか",
        "isSub": false
    },
    {
        "id": "part1",
        "label": "第1部：序論とアーキテクチャ原則（原著第1章）",
        "isSub": false
    },
    {
        "id": "part2",
        "label": "第2部：インターネットアドレスアーキテクチャ（原著第2章）",
        "isSub": false
    },
    {
        "id": "part3",
        "label": "第3部：リンク層（原著第3章）",
        "isSub": false
    },
    {
        "id": "part4",
        "label": "第4部：ARP アドレス解決プロトコル（原著第4章）",
        "isSub": false
    },
    {
        "id": "part5",
        "label": "第5部：インターネットプロトコル IP（原著第5章）",
        "isSub": false
    },
    {
        "id": "part6",
        "label": "第6部：システム構成 DHCPと自動設定（原著第6章）",
        "isSub": false
    },
    {
        "id": "part7",
        "label": "第7部：ファイアウォールとNAT（原著第7章）",
        "isSub": false
    },
    {
        "id": "part8",
        "label": "第8部：ICMPv4/ICMPv6（原著第8章）",
        "isSub": false
    },
    {
        "id": "part9",
        "label": "第9部：ブロードキャストとマルチキャスト IGMP/MLD（原著第9章）",
        "isSub": false
    },
    {
        "id": "part10",
        "label": "第10部：UDPとIPフラグメンテーション（原著第10章）",
        "isSub": false
    },
    {
        "id": "part11",
        "label": "第11部：名前解決とDNS（原著第11章）",
        "isSub": false
    },
    {
        "id": "part12",
        "label": "第12部：TCPの基礎（原著第12章）",
        "isSub": false
    },
    {
        "id": "part13",
        "label": "第13部：TCP接続管理（原著第13章）",
        "isSub": false
    },
    {
        "id": "part14",
        "label": "第14部：TCPタイムアウトと再送（原著第14章）",
        "isSub": false
    },
    {
        "id": "part15",
        "label": "第15部：TCPデータフローとウィンドウ管理（原著第15章）",
        "isSub": false
    },
    {
        "id": "part16",
        "label": "第16部：TCP輻輳制御（原著第16章）",
        "isSub": false
    },
    {
        "id": "part17",
        "label": "第17部：TCPキープアライブ（原著第17章）",
        "isSub": false
    },
    {
        "id": "part18",
        "label": "第18部：セキュリティ EAP・IPsec・TLS・DNSSEC・DKIM（原著第18章）",
        "isSub": false
    },
    {
        "id": "part19",
        "label": "第19部：2026年8月時点の最新動向",
        "isSub": false
    },
    {
        "id": "roadmap",
        "label": "学習ロードマップ",
        "isSub": false
    },
    {
        "id": "checklist",
        "label": "章末チェックリスト",
        "isSub": false
    },
    {
        "id": "glossary",
        "label": "用語集",
        "isSub": false
    },
    {
        "id": "references",
        "label": "参考文献",
        "isSub": false
    }
];
