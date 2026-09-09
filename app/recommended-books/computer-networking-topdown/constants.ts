// app/recommended-books/computer-networking-topdown/constants.ts

export interface NavItem {
    id: string;
    label: string;
    lvl3: boolean;
}

export const NAV_ITEMS: NavItem[] = [
    {
        "id": "本ガイドについて",
        "label": "本ガイドについて",
        "lvl3": false
    },
    {
        "id": "第0部-なぜトップダウンアプローチなのか",
        "label": "第0部: なぜ「トップダウンアプローチ」なのか",
        "lvl3": false
    },
    {
        "id": "インターネットの規模感2026年8月時点",
        "label": "インターネットの規模感(2026年8月時点)",
        "lvl3": true
    },
    {
        "id": "インターネットを2つの視点で捉える",
        "label": "インターネットを2つの視点で捉える",
        "lvl3": true
    },
    {
        "id": "第1部-コンピュータネットワークとインターネットの基礎",
        "label": "第1部: コンピュータネットワークとインターネットの基礎",
        "lvl3": false
    },
    {
        "id": "11-ネットワークのエッジとコア",
        "label": "1.1 ネットワークの「エッジ」と「コア」",
        "lvl3": true
    },
    {
        "id": "12-パケット交換-vs-回線交換",
        "label": "1.2 パケット交換 vs 回線交換",
        "lvl3": true
    },
    {
        "id": "13-プロトコル階層とカプセル化",
        "label": "1.3 プロトコル階層とカプセル化",
        "lvl3": true
    },
    {
        "id": "14-遅延損失スループットの4要素",
        "label": "1.4 遅延・損失・スループットの4要素",
        "lvl3": true
    },
    {
        "id": "第2部-アプリケーション層",
        "label": "第2部: アプリケーション層",
        "lvl3": false
    },
    {
        "id": "21-ネットワークアプリケーションのアーキテクチャ",
        "label": "2.1 ネットワークアプリケーションのアーキテクチャ",
        "lvl3": true
    },
    {
        "id": "22-webとプロトコルの進化-http11--http2--http3",
        "label": "2.2 Webとプロトコルの進化: HTTP/1.1 → HTTP/2 → HTTP/3",
        "lvl3": true
    },
    {
        "id": "23-dns-インターネットのディレクトリサービス",
        "label": "2.3 DNS: インターネットのディレクトリサービス",
        "lvl3": true
    },
    {
        "id": "24-電子メールとソケットプログラミングの基礎",
        "label": "2.4 電子メールとソケットプログラミングの基礎",
        "lvl3": true
    },
    {
        "id": "第3部-トランスポート層",
        "label": "第3部: トランスポート層",
        "lvl3": false
    },
    {
        "id": "31-udpとtcp-2つの対照的な選択肢",
        "label": "3.1 UDPとTCP: 2つの対照的な選択肢",
        "lvl3": true
    },
    {
        "id": "32-tcpコネクションの確立-3ウェイハンドシェイク",
        "label": "3.2 TCPコネクションの確立: 3ウェイハンドシェイク",
        "lvl3": true
    },
    {
        "id": "33-信頼性のあるデータ転送の原理",
        "label": "3.3 信頼性のあるデータ転送の原理",
        "lvl3": true
    },
    {
        "id": "34-フロー制御と輻輳制御の違い",
        "label": "3.4 フロー制御と輻輳制御の違い",
        "lvl3": true
    },
    {
        "id": "35-輻輳制御アルゴリズムの進化",
        "label": "3.5 輻輳制御アルゴリズムの進化",
        "lvl3": true
    },
    {
        "id": "36-quic-トランスポート層とセキュリティ層の融合",
        "label": "3.6 QUIC: トランスポート層とセキュリティ層の融合",
        "lvl3": true
    },
    {
        "id": "第4部-ネットワーク層データプレーン",
        "label": "第4部: ネットワーク層:データプレーン",
        "lvl3": false
    },
    {
        "id": "41-ルータの内部構造",
        "label": "4.1 ルータの内部構造",
        "lvl3": true
    },
    {
        "id": "42-ipv4とipv6",
        "label": "4.2 IPv4とIPv6",
        "lvl3": true
    },
    {
        "id": "43-natnetwork-address-translation",
        "label": "4.3 NAT(Network Address Translation)",
        "lvl3": true
    },
    {
        "id": "44-汎用転送とsdnのデータプレーン",
        "label": "4.4 汎用転送とSDNのデータプレーン",
        "lvl3": true
    },
    {
        "id": "第5部-ネットワーク層コントロールプレーン",
        "label": "第5部: ネットワーク層:コントロールプレーン",
        "lvl3": false
    },
    {
        "id": "51-ルーティングアルゴリズムの2大分類",
        "label": "5.1 ルーティングアルゴリズムの2大分類",
        "lvl3": true
    },
    {
        "id": "52-自律システム間のルーティング-bgp",
        "label": "5.2 自律システム間のルーティング: BGP",
        "lvl3": true
    },
    {
        "id": "53-bgpのセキュリティ-rpkiとルート原点検証rov",
        "label": "5.3 BGPのセキュリティ: RPKIとルート原点検証(ROV)",
        "lvl3": true
    },
    {
        "id": "54-sdnのコントロールプレーン",
        "label": "5.4 SDNのコントロールプレーン",
        "lvl3": true
    },
    {
        "id": "第6部-リンク層とlan",
        "label": "第6部: リンク層とLAN",
        "lvl3": false
    },
    {
        "id": "61-リンク層が提供するサービス",
        "label": "6.1 リンク層が提供するサービス",
        "lvl3": true
    },
    {
        "id": "62-多重アクセスプロトコル",
        "label": "6.2 多重アクセスプロトコル",
        "lvl3": true
    },
    {
        "id": "63-イーサネットスイッチ-vs-ルータ",
        "label": "6.3 イーサネットスイッチ vs ルータ",
        "lvl3": true
    },
    {
        "id": "64-vlan仮想lan",
        "label": "6.4 VLAN(仮想LAN)",
        "lvl3": true
    },
    {
        "id": "第7部-無線とモバイルネットワーク",
        "label": "第7部: 無線とモバイルネットワーク",
        "lvl3": false
    },
    {
        "id": "71-無線リンク特有の課題",
        "label": "7.1 無線リンク特有の課題",
        "lvl3": true
    },
    {
        "id": "72-wi-fiieee-80211の進化",
        "label": "7.2 Wi-Fi(IEEE 802.11)の進化",
        "lvl3": true
    },
    {
        "id": "73-モバイルネットワーク-4g5gから6gへ",
        "label": "7.3 モバイルネットワーク: 4G/5Gから6Gへ",
        "lvl3": true
    },
    {
        "id": "74-モビリティ管理",
        "label": "7.4 モビリティ管理",
        "lvl3": true
    },
    {
        "id": "第8部-コンピュータネットワークにおけるセキュリティ",
        "label": "第8部: コンピュータネットワークにおけるセキュリティ",
        "lvl3": false
    },
    {
        "id": "81-暗号の基礎-対称鍵暗号と公開鍵暗号",
        "label": "8.1 暗号の基礎: 対称鍵暗号と公開鍵暗号",
        "lvl3": true
    },
    {
        "id": "82-tlshttpsハンドシェイクの流れ",
        "label": "8.2 TLS/HTTPSハンドシェイクの流れ",
        "lvl3": true
    },
    {
        "id": "83-耐量子暗号post-quantum-cryptographyへの移行",
        "label": "8.3 耐量子暗号(Post-Quantum Cryptography)への移行",
        "lvl3": true
    },
    {
        "id": "84-メッセージの完全性認証",
        "label": "8.4 メッセージの完全性認証",
        "lvl3": true
    },
    {
        "id": "85-ファイアウォールとidsips",
        "label": "8.5 ファイアウォールとIDS/IPS",
        "lvl3": true
    },
    {
        "id": "86-ddos攻撃の脅威動向",
        "label": "8.6 DDoS攻撃の脅威動向",
        "lvl3": true
    },
    {
        "id": "第9部-2026年8月時点の最新動向",
        "label": "第9部: 2026年8月時点の最新動向",
        "lvl3": false
    },
    {
        "id": "91-まとめ表-2026年8月時点の主要指標",
        "label": "9.1 まとめ表: 2026年8月時点の主要指標",
        "lvl3": true
    },
    {
        "id": "92-これらのトレンドから読み取れる設計思想の変化",
        "label": "9.2 これらのトレンドから読み取れる設計思想の変化",
        "lvl3": true
    },
    {
        "id": "学習ロードマップ",
        "label": "学習ロードマップ",
        "lvl3": false
    },
    {
        "id": "理解度チェックリスト",
        "label": "理解度チェックリスト",
        "lvl3": false
    },
    {
        "id": "用語集",
        "label": "用語集",
        "lvl3": false
    },
    {
        "id": "参考文献",
        "label": "参考文献",
        "lvl3": false
    },
    {
        "id": "書籍原典に関する公式情報",
        "label": "書籍・原典に関する公式情報",
        "lvl3": true
    },
    {
        "id": "アプリケーション層--httpquic関連",
        "label": "アプリケーション層 / HTTP・QUIC関連",
        "lvl3": true
    },
    {
        "id": "dns--暗号化dns関連",
        "label": "DNS / 暗号化DNS関連",
        "lvl3": true
    },
    {
        "id": "トランスポート層--輻輳制御bbr関連",
        "label": "トランスポート層 / 輻輳制御(BBR)関連",
        "lvl3": true
    },
    {
        "id": "ネットワーク層--ipv6普及動向",
        "label": "ネットワーク層 / IPv6普及動向",
        "lvl3": true
    },
    {
        "id": "コントロールプレーン--bgprpkiセキュリティ関連",
        "label": "コントロールプレーン / BGP・RPKIセキュリティ関連",
        "lvl3": true
    },
    {
        "id": "リンク層無線--wi-fi6g関連",
        "label": "リンク層・無線 / Wi-Fi・6G関連",
        "lvl3": true
    },
    {
        "id": "セキュリティ--耐量子暗号pqc関連",
        "label": "セキュリティ / 耐量子暗号(PQC)関連",
        "lvl3": true
    },
    {
        "id": "セキュリティ--ddos脅威動向関連",
        "label": "セキュリティ / DDoS脅威動向関連",
        "lvl3": true
    }
];

export type DiagramId =
    | 'diag-1'
    | 'diag-2'
    | 'diag-3'
    | 'diag-4'
    | 'diag-5'
    | 'diag-6'
    | 'diag-7'
    | 'diag-8'
    | 'diag-9'
    | 'diag-10'
    | 'diag-11'
    | 'diag-12'
    | 'diag-13'
    | 'diag-14'
    | 'diag-15'
    | 'diag-16'
    | 'diag-17'
    | 'diag-18'
    | 'diag-19'
    | 'diag-20'
    | 'diag-21'
    | 'diag-22'
    | 'diag-23'
    | 'diag-24'
    | 'diag-25'
    | 'diag-26'
    | 'diag-27'
    | 'diag-28'
    | 'diag-29'
    | 'diag-30'
    | 'diag-31'
    | 'diag-32'
    | 'diag-33'
    | 'diag-34'
    | 'diag-35'
    | 'diag-36'
    | 'diag-37'
    | 'diag-38'
    | 'diag-39'
    | 'diag-40'
    | 'diag-41';

export const DIAGRAM_LABELS: Record<DiagramId, string> = {
    'diag-1': 'トップダウンアプローチによる学習の進み方',
    'diag-2': 'インターネットを2つの視点で捉える構成図',
    'diag-3': 'ネットワークのエッジとコアの対比',
    'diag-4': '回線交換とパケット交換の比較',
    'diag-5': 'インターネットの5層プロトコルスタックとカプセル化',
    'diag-6': '送信ホストから受信ホストへのカプセル化・非カプセル化の流れ',
    'diag-7': 'パケット遅延の4つの要素（処理・送信・伝播・キューイング）',
    'diag-8': 'クライアント・サーバ方式とP2P方式のアーキテクチャ対比',
    'diag-9': 'Webプロトコルの進化（HTTP/1.1・HTTP/2・HTTP/3）',
    'diag-10': 'DNS名前解決の反復問い合わせフロー',
    'diag-11': '電子メールの送受信プロトコル（SMTP・IMAP）フロー',
    'diag-12': 'UDPとTCPの特徴とトレードオフ対比',
    'diag-13': 'TCPコネクション確立の3ウェイハンドシェイク手順',
    'diag-14': '信頼性のあるデータ転送（ストップ＆ウェイト・Go-Back-N・SR）',
    'diag-15': 'TCP輻輳制御アルゴリズムの進化（Tahoe/Reno・CUBIC・BBR）',
    'diag-16': 'QUICプロトコルスタックと接続確立の高速化',
    'diag-17': 'ネットワーク層のデータプレーンとコントロールプレーンの分離',
    'diag-18': 'ルータの内部構造（入力ポート・スイッチング機構・出力ポート）',
    'diag-19': 'IPv4ヘッダとIPv6ヘッダの構造比較',
    'diag-20': 'NAT（ネットワークアドレス変換）の動作原理',
    'diag-21': '従来型ルータとSDNオープンフロー汎用転送の対比',
    'diag-22': 'ルーティングアルゴリズムの分類（リンクステート・距離ベクトル）',
    'diag-23': '自律システム間ルーティング（BGP）とAS階層',
    'diag-24': 'BGPハイジャック攻撃フロー（RPKI/ROV検証なしの場合：偽装広告によるトラフィック乗っ取りのリスク）',
    'diag-25': 'BGPハイジャック検知と無効化の判定プロセス',
    'diag-26': 'SDNコントロールプレーンと集中制御アーキテクチャ',
    'diag-27': 'リンク層のフレームカプセル化とエラー検出',
    'diag-28': '多重アクセスプロトコル（CSMA/CDとCSMA/CA）の比較',
    'diag-29': 'イーサネットスイッチとルータの動作レイヤ・ブロードキャストドメイン比較',
    'diag-30': 'VLAN（仮想LAN）による論理的ネットワーク分割',
    'diag-31': '無線リンク特有の課題（減衰・干渉・マルチパス）',
    'diag-32': 'Wi-Fi（IEEE 802.11）規格の世代進化（Wi-Fi 4〜Wi-Fi 7）',
    'diag-33': 'モバイルネットワークの世代進化（4G・5Gから6Gへ）',
    'diag-34': 'モバイルIPにおけるモビリティ管理とハンドオーバー手順',
    'diag-35': '対称鍵暗号と公開鍵暗号の仕組みと特徴比較',
    'diag-36': 'TLS 1.3ハンドシェイクとセキュア通信確立の流れ',
    'diag-37': '耐量子暗号（PQC）ハイブリッド鍵交換の構成',
    'diag-38': 'ファイアウォールとIDS/IPSの防御レイヤ比較',
    'diag-39': 'DDoS攻撃の分類と分散ボットネット攻撃フロー',
    'diag-40': '2026年時点のプロトコル層別最新技術動向',
    'diag-41': 'コンピュータネットワーク学習ロードマップ',
};

export const DIAGRAMS: Record<DiagramId, string> = {
    'diag-1': `flowchart TD
    subgraph APPROACH["学習の進み方"]
        direction LR
        A["① アプリケーション層<br/>身近なWeb/DNS/メールから開始"] --> B["② トランスポート層<br/>信頼性・輻輳制御を学ぶ"]
        B --> C["③ ネットワーク層<br/>ルーティングの仕組みを学ぶ"]
        C --> D["④ リンク層<br/>LANやWi-Fiの仕組みを学ぶ"]
        D --> E["⑤ 物理層への接続<br/>無線・モバイル・セキュリティを横断的に理解"]
    end

    classDef stepFill fill:#132a4a,stroke:#7c9eff,color:#e8eefc
    class A,B,C,D,E stepFill`,
    'diag-2': `flowchart LR
    subgraph VIEW1["視点①: ハードウェア/ソフトウェアの集合として"]
        direction TB
        H1["ホスト(エンドシステム)"] --- L1["通信リンク"]
        L1 --- R1["パケット交換機(ルータ/スイッチ)"]
    end

    subgraph VIEW2["視点②: 分散アプリケーションのための基盤として"]
        direction TB
        A1["アプリケーション<br/>(Web/動画/チャット)"] --> A2["通信インフラを利用する<br/>プログラミングインターフェース(ソケット)"]
    end

    classDef v1 fill:#0f2540,stroke:#5c7cfa,color:#dbe4ff
    classDef v2 fill:#132a4a,stroke:#7c9eff,color:#e8eefc
    class H1,L1,R1 v1
    class A1,A2 v2`,
    'diag-3': `flowchart TB
    subgraph EDGE["ネットワークのエッジ"]
        PC["家庭のPC/スマホ"]
        SRV["Webサーバ・クラウド"]
    end

    subgraph ACCESS["アクセスネットワーク"]
        FIBER["光ファイバー(FTTH)"]
        CABLE["ケーブルTV回線"]
        MOBILE["4G/5Gモバイル網"]
        WIFI["Wi-Fi"]
    end

    subgraph CORE["ネットワークのコア"]
        direction LR
        R1((ルータ)) --- R2((ルータ))
        R2 --- R3((ルータ))
        R3 --- R1
        R1 --- R4((ルータ))
    end

    PC --- FIBER --- R1
    PC --- WIFI --- R2
    PC --- MOBILE --- R3
    SRV --- CABLE --- R4

    classDef edgeFill fill:#132a4a,stroke:#7c9eff,color:#e8eefc
    classDef accessFill fill:#1a3350,stroke:#5c7cfa,color:#dbe4ff
    classDef coreFill fill:#0f2540,stroke:#4c6ef5,color:#c9d6ff
    class PC,SRV edgeFill
    class FIBER,CABLE,MOBILE,WIFI accessFill
    class R1,R2,R3,R4 coreFill`,
    'diag-4': `flowchart LR
    subgraph CS["回線交換: 専用帯域を確保"]
        direction LR
        CA[A] -.専用スロット.-> CB[交換機] -.専用スロット.-> CC[B]
    end
    subgraph PS["パケット交換: 統計的多重化で共有"]
        direction LR
        PA[A] -->|パケット1| PR[ルータ]
        PX[X] -->|パケット2| PR
        PR -->|順不同で転送| PB[B]
        PR -->|順不同で転送| PY[Y]
    end

    classDef csFill fill:#1a3350,stroke:#5c7cfa,color:#dbe4ff
    classDef psFill fill:#132a4a,stroke:#7c9eff,color:#e8eefc
    class CA,CB,CC csFill
    class PA,PX,PR,PB,PY psFill`,
    'diag-5': `flowchart TD
    APP["アプリケーション層<br/>HTTP・DNS・SMTPなど / メッセージ(message)"]
    TRANS["トランスポート層<br/>TCP・UDP / TCPセグメント(segment)・UDPデータグラム(datagram)"]
    NET["ネットワーク層<br/>IP・ルーティング / データグラム(datagram)"]
    LINK["リンク層<br/>Ethernet・Wi-Fi / フレーム(frame)"]
    PHY["物理層<br/>ビット列の伝送 / bit"]

    APP --> TRANS --> NET --> LINK --> PHY

    classDef layerFill fill:#132a4a,stroke:#7c9eff,color:#e8eefc
    class APP,TRANS,NET,LINK,PHY layerFill`,
    'diag-6': `flowchart LR
    M["メッセージ<br/>(アプリケーション層データ)"] --> S["トランスポート層PDU<br/>= トランスポートヘッダ + M"]
    S --> D["データグラム<br/>= ネットワークヘッダ + トランスポート層PDU"]
    D --> F["フレーム<br/>= リンクヘッダ + データグラム"]

    classDef encapFill fill:#132a4a,stroke:#7c9eff,color:#e8eefc
    class M,S,D,F encapFill`,
    'diag-7': `flowchart LR
    ARR["パケット到着"] --> PROC["処理遅延<br/>(Processing Delay)<br/>ヘッダ検査・誤り検出"]
    PROC --> QUEUE["キューイング遅延<br/>(Queuing Delay)<br/>出力リンクが空くまでの待ち時間"]
    QUEUE --> TRANS2["伝送遅延<br/>(Transmission Delay)<br/>= パケット長 ÷ リンク帯域"]
    TRANS2 --> PROP["伝搬遅延<br/>(Propagation Delay)<br/>= 物理的距離 ÷ 伝搬速度"]
    PROP --> NEXT["次のホップへ"]

    classDef delayFill fill:#132a4a,stroke:#7c9eff,color:#e8eefc
    class ARR,PROC,QUEUE,TRANS2,PROP,NEXT delayFill`,
    'diag-8': `flowchart TB
    subgraph CS_ARCH["クライアント・サーバ方式"]
        direction LR
        C1[クライアント] --> S1[常時稼働のサーバ]
        C2[クライアント] --> S1
        C3[クライアント] --> S1
    end

    subgraph P2P_ARCH["P2P(Peer-to-Peer)方式"]
        direction LR
        P1((ピア)) --- P2((ピア))
        P2 --- P3((ピア))
        P3 --- P1
        P1 --- P4((ピア))
    end

    classDef csFill fill:#132a4a,stroke:#7c9eff,color:#e8eefc
    classDef p2pFill fill:#1a3350,stroke:#5c7cfa,color:#dbe4ff
    class C1,C2,C3,S1 csFill
    class P1,P2,P3,P4 p2pFill`,
    'diag-9': `flowchart LR
    H1["HTTP/1.1<br/>(1997年)<br/>持続的接続を既定とするが<br/>1接続上のリクエストは逐次処理<br/>(HoLブロッキング)"] --> H2["HTTP/2<br/>(2015年)<br/>1つのTCP接続上で<br/>複数ストリームを多重化"]
    H2 --> H3["HTTP/3<br/>(2022年, RFC 9114)<br/>TCPをやめてQUIC(UDPベース)上で<br/>多重化を実現"]

    classDef httpFill fill:#132a4a,stroke:#7c9eff,color:#e8eefc
    class H1,H2,H3 httpFill`,
    'diag-10': `flowchart TD
    ROOT["ルートDNSサーバ<br/>(世界に13系統)"] --> TLD["TLD(トップレベルドメイン)サーバ<br/>.com / .jp / .org など"]
    TLD --> AUTH["権威DNSサーバ<br/>example.com の名前解決を担当"]

    CLIENT["クライアント"] --> LOCAL["ローカルDNSリゾルバ<br/>(ISPや8.8.8.8など)"]
    LOCAL -->|① ルートに問い合わせ| ROOT
    LOCAL -->|② TLDに問い合わせ| TLD
    LOCAL -->|③ 権威サーバに問い合わせ| AUTH
    AUTH -->|④ IPアドレスを回答| LOCAL
    LOCAL -->|⑤ 結果をキャッシュして返答| CLIENT

    classDef dnsFill fill:#132a4a,stroke:#7c9eff,color:#e8eefc
    class ROOT,TLD,AUTH,CLIENT,LOCAL dnsFill`,
    'diag-11': `flowchart LR
    SENDER["送信者のメールクライアント"] -->|SMTP| SSRV["送信側メールサーバ"]
    SSRV -->|SMTP| RSRV["受信側メールサーバ"]
    RSRV -->|IMAP/POP3| RECV["受信者のメールクライアント"]

    classDef mailFill fill:#132a4a,stroke:#7c9eff,color:#e8eefc
    class SENDER,SSRV,RSRV,RECV mailFill`,
    'diag-12': `flowchart TB
    subgraph UDP_BOX["UDP: User Datagram Protocol"]
        direction TB
        U1["コネクションレス"]
        U2["信頼性の保証なし(送りっぱなし)"]
        U3["ヘッダが軽量(8バイト)"]
        U4["輻輳制御を行わない"]
    end

    subgraph TCP_BOX["TCP: Transmission Control Protocol"]
        direction TB
        T1["コネクション型(事前にハンドシェイク)"]
        T2["信頼性のあるデータ転送を保証"]
        T3["フロー制御・輻輳制御を実施"]
        T4["順序制御・再送機能を持つ"]
    end

    classDef udpFill fill:#1a3350,stroke:#5c7cfa,color:#dbe4ff
    classDef tcpFill fill:#132a4a,stroke:#7c9eff,color:#e8eefc
    class U1,U2,U3,U4 udpFill
    class T1,T2,T3,T4 tcpFill`,
    'diag-13': `sequenceDiagram
    participant C as クライアント
    participant S as サーバ

    C->>S: ① SYN (シーケンス番号 x)
    S->>C: ② SYN + ACK (シーケンス番号 y, 確認応答番号 x+1)
    C->>S: ③ ACK (確認応答番号 y+1)
    Note over C,S: コネクション確立完了、データ転送開始`,
    'diag-14': `flowchart TD
    A["チェックサム<br/>ビット誤りの検出"] --> B["確認応答(ACK)<br/>受信成功の通知"]
    B --> C["タイマーと再送<br/>ACKが届かない場合に再送"]
    C --> D["シーケンス番号<br/>重複・順序入れ替わりの検出"]
    D --> E["ウィンドウ方式<br/>複数パケットを連続送信し効率化"]

    classDef rdtFill fill:#132a4a,stroke:#7c9eff,color:#e8eefc
    class A,B,C,D,E rdtFill`,
    'diag-15': `flowchart LR
    TAHOE["TCP Tahoe<br/>(1988年)<br/>損失=輻輳とみなしウィンドウを大幅縮小"] --> RENO["TCP Reno<br/>(1990年)<br/>高速再送・高速回復を追加"]
    RENO --> CUBIC["CUBIC<br/>(2008年〜)<br/>3次関数でウィンドウを調整、<br/>Linuxの長年のデフォルト"]
    CUBIC --> BBR["BBR<br/>(2016年, Google)<br/>損失ではなく帯域・RTTの<br/>実測モデルで制御"]
    BBR --> BBR3["BBRv3<br/>(2023年〜)<br/>再送率12%削減を実証、<br/>2026年時点でLinuxカーネル<br/>本流への統合を検討中"]

    classDef ccFill fill:#132a4a,stroke:#7c9eff,color:#e8eefc
    class TAHOE,RENO,CUBIC,BBR,BBR3 ccFill`,
    'diag-16': `flowchart TB
    subgraph OLD["従来のスタック(HTTP/2まで)"]
        direction TB
        OA["アプリケーション(HTTP/2)"] --> OT["TLS"]
        OT --> OTCP["TCP"]
        OTCP --> OIP["IP"]
    end

    subgraph NEW["QUICベースのスタック(HTTP/3)"]
        direction TB
        NA["アプリケーション(HTTP/3)"] --> NQ["QUIC<br/>(暗号化・多重化・輻輳制御を統合)"]
        NQ --> NUDP["UDP"]
        NUDP --> NIP["IP"]
    end

    classDef oldFill fill:#1a3350,stroke:#5c7cfa,color:#dbe4ff
    classDef newFill fill:#132a4a,stroke:#7c9eff,color:#e8eefc
    class OA,OT,OTCP,OIP oldFill
    class NA,NQ,NUDP,NIP newFill`,
    'diag-17': `flowchart TB
    subgraph DATA["データプレーン(第4部)"]
        DP1["個々のルータがパケットを<br/>入力ポートから出力ポートへ<br/>実際に転送する処理"]
    end
    subgraph CONTROL["コントロールプレーン(第5部)"]
        CP1["転送テーブルをどう構築するか<br/>を決めるルーティングロジック"]
    end
    CONTROL -->|転送テーブルを設定| DATA

    classDef dataFill fill:#132a4a,stroke:#7c9eff,color:#e8eefc
    classDef ctrlFill fill:#1a3350,stroke:#5c7cfa,color:#dbe4ff
    class DP1 dataFill
    class CP1 ctrlFill`,
    'diag-18': `flowchart LR
    IN1["入力ポート1"] --> FAB["スイッチング<br/>ファブリック"]
    IN2["入力ポート2"] --> FAB
    IN3["入力ポート3"] --> FAB
    FAB --> OUT1["出力ポート1"]
    FAB --> OUT2["出力ポート2"]
    FAB --> OUT3["出力ポート3"]
    RCP["ルーティング<br/>プロセッサ"] -.転送テーブルを配布.-> FAB

    classDef portFill fill:#1a3350,stroke:#5c7cfa,color:#dbe4ff
    classDef coreFill fill:#132a4a,stroke:#7c9eff,color:#e8eefc
    class IN1,IN2,IN3,OUT1,OUT2,OUT3 portFill
    class FAB,RCP coreFill`,
    'diag-19': `flowchart LR
    subgraph V4["IPv4"]
        direction TB
        V4A["32ビットアドレス<br/>(約43億個)"]
        V4B["1980年代に設計"]
        V4C["アドレス枯渇(2011年にIANAプール枯渇)"]
    end
    subgraph V6["IPv6"]
        direction TB
        V6A["128ビットアドレス<br/>(約340澗個)"]
        V6B["1998年に設計"]
        V6C["ヘッダ構造を簡素化・拡張ヘッダで柔軟性確保"]
    end

    classDef v4Fill fill:#1a3350,stroke:#5c7cfa,color:#dbe4ff
    classDef v6Fill fill:#132a4a,stroke:#7c9eff,color:#e8eefc
    class V4A,V4B,V4C v4Fill
    class V6A,V6B,V6C v6Fill`,
    'diag-20': `flowchart LR
    subgraph LAN["家庭内ネットワーク(プライベートIP)"]
        H1["192.168.1.10"]
        H2["192.168.1.11"]
    end
    NAT["NATルータ<br/>(グローバルIP: 203.0.113.5)"]
    INTERNET["インターネット"]

    H1 -->|送信元: 192.168.1.10:5000| NAT
    H2 -->|送信元: 192.168.1.11:5001| NAT
    NAT -->|送信元を書き換えて送出<br/>203.0.113.5:6000<br/>203.0.113.5:6001| INTERNET

    classDef lanFill fill:#1a3350,stroke:#5c7cfa,color:#dbe4ff
    classDef natFill fill:#132a4a,stroke:#7c9eff,color:#e8eefc
    class H1,H2 lanFill
    class NAT,INTERNET natFill`,
    'diag-21': `flowchart TB
    subgraph TRADITIONAL["従来型ルータ"]
        T1["主に宛先IPアドレスで<br/>転送を決定<br/>(ACLは補助的)"]
    end
    subgraph SDN_DP["SDNデータプレーン"]
        S1["送信元/宛先IP・ポート番号・<br/>VLANタグなど複数フィールドの組み合わせで<br/>マッチし、転送/破棄/書き換え等の<br/>アクションを実行"]
    end
    CONTROLLER["中央集権的なSDNコントローラ"] -.フローテーブルを配布.-> SDN_DP

    classDef tradFill fill:#1a3350,stroke:#5c7cfa,color:#dbe4ff
    classDef sdnFill fill:#132a4a,stroke:#7c9eff,color:#e8eefc
    class T1 tradFill
    class S1,CONTROLLER sdnFill`,
    'diag-22': `flowchart TB
    subgraph LS["リンクステート型(例: OSPF)"]
        direction TB
        LS1["同一エリア内のトポロジー情報を<br/>エリア内の全ルータがフラッディングで共有"]
        LS2["各ルータが独立して<br/>ダイクストラ法で最短経路を計算"]
    end
    subgraph DV["距離ベクトル型(例: RIP)"]
        direction TB
        DV1["隣接ルータとのみ<br/>経路情報(距離)を交換"]
        DV2["ベルマン・フォード法に基づき<br/>反復的に経路表を更新"]
    end

    classDef lsFill fill:#132a4a,stroke:#7c9eff,color:#e8eefc
    classDef dvFill fill:#1a3350,stroke:#5c7cfa,color:#dbe4ff
    class LS1,LS2 lsFill
    class DV1,DV2 dvFill`,
    'diag-23': `flowchart TB
    subgraph AS1["AS 100"]
        R1A["ルータA"] --- R1B["ルータB"]
    end
    subgraph AS2["AS 200"]
        R2A["ルータC"] --- R2B["ルータD"]
    end
    subgraph AS3["AS 300"]
        R3A["ルータE"]
    end

    R1B -->|eBGP| R2A
    R2B -->|eBGP| R3A
    R1A -.iBGP.-> R1B
    R2A -.iBGP.-> R2B

    classDef asFill fill:#132a4a,stroke:#7c9eff,color:#e8eefc
    class R1A,R1B,R2A,R2B,R3A asFill`,
    'diag-24': `sequenceDiagram
    participant Owner as 正当な所有者(AS100)
    participant Attacker as 悪意あるAS(AS666)
    participant Victim as 被害を受けるAS

    Owner->>Victim: 正規のプレフィックス広告(203.0.113.0/24, origin AS100)
    Attacker->>Victim: 偽装した広告(203.0.113.0/24, origin AS666)
    Note over Victim: RPKI検証なしの場合、<br/>同一プレフィックス(203.0.113.0/24)同士では<br/>AS_PATHの短さ・Local Preference・MEDなど<br/>BGP経路選択ルールが適用され、<br/>攻撃者がより短いAS_PATHを広告すると<br/>通信がハイジャックされる恐れがある`,
    'diag-25': `flowchart LR
    HOLDER["プレフィックス保有者"] -->|ROA・経路原点認可を発行| REPO["RPKIリポジトリ"]
    REPO -->|同期| VALIDATOR["ルータ側の検証キャッシュ<br/>(RPKI Validator)"]
    ROUTER["BGPルータ"] -->|受信した経路のオリジンASを問い合わせ| VALIDATOR
    VALIDATOR -->|Valid / Invalid / NotFoundを応答| ROUTER
    ROUTER -->|検証状態に応じてローカルポリシーを適用<br/>採用・優先度低下・拒否などを事業者が決定| ACCEPT["採用する経路テーブル"]

    classDef rpkiFill fill:#132a4a,stroke:#7c9eff,color:#e8eefc
    class HOLDER,REPO,VALIDATOR,ROUTER,ACCEPT rpkiFill`,
    'diag-26': `flowchart TB
    APP1["アプリケーション<br/>(負荷分散)"] --> NORTH["ノースバウンドAPI"]
    APP2["アプリケーション<br/>(ファイアウォール)"] --> NORTH
    NORTH --> CTRL["SDNコントローラ<br/>(ネットワークOS)"]
    CTRL --> SOUTH["サウスバウンドAPI<br/>(例: OpenFlow)"]
    SOUTH --> SW1["スイッチ1"]
    SOUTH --> SW2["スイッチ2"]
    SOUTH --> SW3["スイッチ3"]

    classDef sdnFill fill:#132a4a,stroke:#7c9eff,color:#e8eefc
    class APP1,APP2,NORTH,CTRL,SOUTH,SW1,SW2,SW3 sdnFill`,
    'diag-27': `flowchart TD
    FR["フレーミング<br/>ビット列をフレーム単位に区切る"] --> ADDR["リンクアドレッシング<br/>MACアドレスによる識別"]
    ADDR --> ERR["誤り検出<br/>CRC(巡回冗長検査)"]
    ERR --> ACCESS["メディアアクセス制御<br/>共有リンクの利用調整"]

    classDef llFill fill:#132a4a,stroke:#7c9eff,color:#e8eefc
    class FR,ADDR,ERR,ACCESS llFill`,
    'diag-28': `flowchart LR
    subgraph CSMACD["CSMA/CD(有線イーサネットの伝統的方式)"]
        direction TB
        CD1["送信前にキャリアを検知(Carrier Sense)"]
        CD2["送信中も衝突を検知(Collision Detection)"]
        CD3["衝突を検知したら送信を中断しランダム時間待機"]
    end
    subgraph CSMACA["CSMA/CA(無線LANで使用)"]
        direction TB
        CA1["送信前にキャリアを検知"]
        CA2["衝突の検出が困難なため<br/>事前にランダムバックオフ"]
        CA3["ACKによる受信確認で<br/>成功/失敗を判断"]
    end

    classDef cdFill fill:#1a3350,stroke:#5c7cfa,color:#dbe4ff
    classDef caFill fill:#132a4a,stroke:#7c9eff,color:#e8eefc
    class CD1,CD2,CD3 cdFill
    class CA1,CA2,CA3 caFill`,
    'diag-29': `flowchart TB
    subgraph SWDOMAIN["スイッチが構成するLAN(1つのブロードキャストドメイン)"]
        PC1["PC1"] --- SW["スイッチ"]
        PC2["PC2"] --- SW
        PC3["PC3"] --- SW
    end
    SW --- RTR["ルータ"]
    RTR --- WAN["別のネットワーク/インターネット"]

    classDef swFill fill:#1a3350,stroke:#5c7cfa,color:#dbe4ff
    classDef rtFill fill:#132a4a,stroke:#7c9eff,color:#e8eefc
    class PC1,PC2,PC3,SW swFill
    class RTR,WAN rtFill`,
    'diag-30': `flowchart LR
    subgraph PHYS["物理的には同じスイッチ"]
        SW2["スイッチ(VLANタグ対応)"]
    end
    SW2 -.VLAN 10.-> DEPT_A["経理部門のポート群"]
    SW2 -.VLAN 20.-> DEPT_B["開発部門のポート群"]

    classDef vlanFill fill:#132a4a,stroke:#7c9eff,color:#e8eefc
    class SW2,DEPT_A,DEPT_B vlanFill`,
    'diag-31': `flowchart TB
    A["A"] -.電波が届く.-> B["B"]
    B -.電波が届く.-> C["C"]
    A -."Aの電波はCに届かない<br/>(隠れ端末問題)".-x C

    classDef wFill fill:#132a4a,stroke:#7c9eff,color:#e8eefc
    class A,B,C wFill`,
    'diag-32': `flowchart LR
    WIFI4["Wi-Fi 4<br/>802.11n (2009)"] --> WIFI5["Wi-Fi 5<br/>802.11ac (2013)"]
    WIFI5 --> WIFI6["Wi-Fi 6<br/>802.11ax (2019)"]
    WIFI6 --> WIFI6E["Wi-Fi 6E<br/>6GHz帯拡張 (2021)"]
    WIFI6E --> WIFI7["Wi-Fi 7<br/>802.11be<br/>(2025年7月正式公開)"]

    classDef wifiFill fill:#132a4a,stroke:#7c9eff,color:#e8eefc
    class WIFI4,WIFI5,WIFI6,WIFI6E,WIFI7 wifiFill`,
    'diag-33': `flowchart LR
    G4["4G LTE<br/>下りOFDMA・上りSC-FDMA、<br/>パケット交換に統一"] --> G5["5G NR<br/>ネットワークスライシング、<br/>超低遅延(URLLC)"]
    G5 --> G6["6G(標準化中)<br/>3GPP Release 21で<br/>仕様策定が進行中"]

    classDef mobFill fill:#132a4a,stroke:#7c9eff,color:#e8eefc
    class G4,G5,G6 mobFill`,
    'diag-34': `sequenceDiagram
    participant Device as モバイル端末
    participant AP1 as 旧アクセスポイント
    participant AP2 as 新アクセスポイント
    participant Anchor as アンカーポイント(HAなど)

    Device->>AP1: 通信中
    Note over Device: 移動によりAP1の電波が弱まる
    Device->>AP2: 新しいAPに接続(ハンドオフ)
    AP2->>Anchor: 位置更新を通知
    Anchor->>AP2: 以降のトラフィックをAP2経由に転送
    Note over Device,Anchor: 通信を継続したままハンドオフ完了`,
    'diag-35': `flowchart TB
    subgraph SYM["対称鍵暗号"]
        direction TB
        S1["送信者と受信者が同じ鍵を共有"]
        S2["高速だが鍵配送の問題がある"]
        S3["例: AES"]
    end
    subgraph ASYM["公開鍵暗号"]
        direction TB
        A1["公開鍵で暗号化、秘密鍵で復号"]
        A2["鍵配送問題を解決するが低速"]
        A3["例: RSA"]
    end
    HYBRID["実際のTLSでは<br/>公開鍵暗号技術による鍵交換<br/>(ECDHEなどの鍵合意)を行い、<br/>その後は対称鍵暗号で<br/>高速に通信する「ハイブリッド方式」を採用"]

    SYM --- HYBRID
    ASYM --- HYBRID

    classDef symFill fill:#1a3350,stroke:#5c7cfa,color:#dbe4ff
    classDef asymFill fill:#132a4a,stroke:#7c9eff,color:#e8eefc
    classDef hybFill fill:#0f2540,stroke:#4c6ef5,color:#c9d6ff
    class S1,S2,S3 symFill
    class A1,A2,A3 asymFill
    class HYBRID hybFill`,
    'diag-36': `sequenceDiagram
    participant C as クライアント
    participant S as サーバ

    C->>S: ① ClientHello(対応する暗号スイート・key_shareの提示)
    S->>C: ② ServerHello(key_share) ここでハンドシェイク鍵が確定
    Note over C,S: 以降のハンドシェイクメッセージは暗号化される
    S->>C: ③ EncryptedExtensions(暗号化された拡張情報)
    S->>C: ④ Certificate(サーバ証明書)
    S->>C: ⑤ CertificateVerify(証明書の秘密鍵による署名)
    S->>C: ⑥ Finished(ハンドシェイク全体のMAC)
    Note over C: 証明書チェーンをCA(認証局)の公開鍵で検証し<br/>CertificateVerifyの署名を証明書の公開鍵で検証し<br/>Finishedのハンドシェイクトランスクリプト上のMACを検証
    C->>S: ⑦ Finished(クライアント側の検証完了)
    Note over C,S: TLS 1.3では1-RTTでハンドシェイク完了<br/>(再接続時は0-RTTも可能)
    C->>S: ⑧ 暗号化されたアプリケーションデータ(HTTPなど)`,
    'diag-37': `flowchart LR
    CLASSIC["従来の鍵交換<br/>(X25519など楕円曲線暗号)"] --> HYBRID2["ハイブリッド鍵交換<br/>X25519 + ML-KEM-768<br/>(移行期の推奨構成)"]
    HYBRID2 --> FUTURE["将来的な完全移行<br/>(ML-KEM単体)"]

    classDef pqFill fill:#132a4a,stroke:#7c9eff,color:#e8eefc
    class CLASSIC,HYBRID2,FUTURE pqFill`,
    'diag-38': `flowchart LR
    INTERNET["インターネット"] --> FW["ファイアウォール<br/>(ステートフルパケットフィルタ)"]
    FW --> IDS["IDS/IPS<br/>(侵入検知/防御システム)"]
    IDS --> LAN2["社内/家庭内ネットワーク"]

    classDef secFill fill:#132a4a,stroke:#7c9eff,color:#e8eefc
    class INTERNET,FW,IDS,LAN2 secFill`,
    'diag-39': `flowchart TB
    BOT1["ボット1"] --> TARGET["攻撃対象サーバ"]
    BOT2["ボット2"] --> TARGET
    BOT3["ボット3"] --> TARGET
    BOTN["...(数百万台規模のボットネット)"] --> TARGET
    TARGET -->|正規の処理能力を超過| DOWN["サービス停止/著しい遅延"]

    classDef botFill fill:#1a3350,stroke:#5c7cfa,color:#dbe4ff
    classDef tgtFill fill:#132a4a,stroke:#7c9eff,color:#e8eefc
    class BOT1,BOT2,BOT3,BOTN botFill
    class TARGET,DOWN tgtFill`,
    'diag-40': `flowchart TD
    subgraph L_APP["アプリケーション層"]
        T1["HTTP/3がCloudflare網のHTTP(S)リクエストの約35%<br/>(Cloudflare Radar・2026年8月時点)"]
        T2["DoH/DoQ/ECHなど暗号化DNSの普及進行"]
    end
    subgraph L_TRANS["トランスポート層"]
        T3["BBRv3のLinuxカーネル本格統合が進行"]
        T4["QUIC/HTTP3のエンタープライズ実装が成熟"]
    end
    subgraph L_NET["ネットワーク層"]
        T5["IPv6アクセス率が世界平均で初めて50%突破"]
        T6["BGP RPKI経路検証カバー率67%超え、<br/>ただし4分類の攻撃のうち一部にしか対応せず"]
    end
    subgraph L_LINK["リンク・無線層"]
        T7["Wi-Fi 7が主流機種に標準搭載"]
        T8["3GPP Release 21で6G仕様策定が本格化<br/>(完成目標2029年)"]
    end
    subgraph L_SEC["セキュリティ層"]
        T9["耐量子鍵交換がTLS 1.3ハンドシェイクの30%超に到達"]
        T10["DDoS攻撃が史上最大の31.4Tbpsを記録、<br/>自動防御が必須に"]
    end

    classDef trendFill fill:#132a4a,stroke:#7c9eff,color:#e8eefc
    class T1,T2,T3,T4,T5,T6,T7,T8,T9,T10 trendFill`,
    'diag-41': `flowchart TD
    STEP1["Step 1<br/>第1部: レイヤードアーキテクチャと<br/>遅延・損失の基礎概念を理解する"] --> STEP2["Step 2<br/>第2部・第3部: HTTP/DNS/TCP/UDPの<br/>挙動をパケットキャプチャ(Wireshark等)で<br/>実際に観測してみる"]
    STEP2 --> STEP3["Step 3<br/>第4部・第5部: 自宅ルータの設定画面や<br/>traceroute/pingコマンドで<br/>経路制御を体感する"]
    STEP3 --> STEP4["Step 4<br/>第6部・第7部: 家庭内LANの構成や<br/>Wi-Fiのチャンネル設定を<br/>実際に確認・調整してみる"]
    STEP4 --> STEP5["Step 5<br/>第8部: 自分がよく使うWebサイトの<br/>TLS証明書やセキュリティヘッダを<br/>ブラウザの開発者ツールで確認する"]
    STEP5 --> STEP6["Step 6<br/>第9部: Cloudflare Radar・APNIC Labs等の<br/>公開ダッシュボードを定期的に見る習慣をつけ、<br/>技術トレンドを継続的に追う"]

    classDef roadFill fill:#132a4a,stroke:#7c9eff,color:#e8eefc
    class STEP1,STEP2,STEP3,STEP4,STEP5,STEP6 roadFill`,
};
