export interface NavItem {
    id: string;
    title: string;
    level: 2 | 3;
}

export const NAV_ITEMS: NavItem[] = [
    {
        "id": "0-はじめになぜネットワークを知ることがweb開発者に必要なのか",
        "title": "0. はじめになぜ「ネットワークを知る」ことがWeb開発者に必要なのか",
        "level": 2
    },
    {
        "id": "第1部ネットワーキング101",
        "title": "第1部：ネットワーキング101",
        "level": 2
    },
    {
        "id": "第1章-レイテンシと帯域幅の基礎",
        "title": "第1章 レイテンシと帯域幅の基礎",
        "level": 3
    },
    {
        "id": "第2章-tcpの構成要素",
        "title": "第2章 TCPの構成要素",
        "level": 3
    },
    {
        "id": "第3章-udpの構成要素",
        "title": "第3章 UDPの構成要素",
        "level": 3
    },
    {
        "id": "第4章-tlstransport-layer-security",
        "title": "第4章 TLS（Transport Layer Security）",
        "level": 3
    },
    {
        "id": "第2部ワイヤレスネットワークのパフォーマンス",
        "title": "第2部：ワイヤレスネットワークのパフォーマンス",
        "level": 2
    },
    {
        "id": "第5章-ワイヤレスネットワーク入門",
        "title": "第5章 ワイヤレスネットワーク入門",
        "level": 3
    },
    {
        "id": "第6章-wifi",
        "title": "第6章 WiFi",
        "level": 3
    },
    {
        "id": "第7章-モバイルネットワーク",
        "title": "第7章 モバイルネットワーク",
        "level": 3
    },
    {
        "id": "第8章-モバイルネットワークの最適化",
        "title": "第8章 モバイルネットワークの最適化",
        "level": 3
    },
    {
        "id": "第3部http",
        "title": "第3部：HTTP",
        "level": 2
    },
    {
        "id": "第9章-httpの歴史",
        "title": "第9章 HTTPの歴史",
        "level": 3
    },
    {
        "id": "第10章-webパフォーマンス入門",
        "title": "第10章 Webパフォーマンス入門",
        "level": 3
    },
    {
        "id": "第11章-http1x",
        "title": "第11章 HTTP/1.X",
        "level": 3
    },
    {
        "id": "第12章-http2",
        "title": "第12章 HTTP/2",
        "level": 3
    },
    {
        "id": "第13章-アプリケーション配信の最適化",
        "title": "第13章 アプリケーション配信の最適化",
        "level": 3
    },
    {
        "id": "第4部ブラウザapiとプロトコル",
        "title": "第4部：ブラウザAPIとプロトコル",
        "level": 2
    },
    {
        "id": "第14章-ブラウザネットワーキング入門",
        "title": "第14章 ブラウザネットワーキング入門",
        "level": 3
    },
    {
        "id": "第15章-xmlhttprequest",
        "title": "第15章 XMLHttpRequest",
        "level": 3
    },
    {
        "id": "第16章-server-sent-eventssse",
        "title": "第16章 Server-Sent Events（SSE）",
        "level": 3
    },
    {
        "id": "第17章-websocket",
        "title": "第17章 WebSocket",
        "level": 3
    },
    {
        "id": "第18章-webrtc",
        "title": "第18章 WebRTC",
        "level": 3
    },
    {
        "id": "第5部独自追加2026年時点の最新動向",
        "title": "第5部（独自追加）：2026年時点の最新動向",
        "level": 2
    },
    {
        "id": "191-http3とquictcpを置き換えるという発想",
        "title": "19.1 HTTP/3とQUIC：TCPを置き換えるという発想",
        "level": 3
    },
    {
        "id": "192-tls-131-rtt0-rttハンドシェイクとech",
        "title": "19.2 TLS 1.3：1-RTT・0-RTTハンドシェイクとECH",
        "level": 3
    },
    {
        "id": "193-輻輳制御の進化cubicからbbrv3へ",
        "title": "19.3 輻輳制御の進化：CUBICからBBRv3へ",
        "level": 3
    },
    {
        "id": "194-webtransportとmedia-over-quicmoqwebsocketの次の選択肢",
        "title": "19.4 WebTransportとMedia over QUIC（MOQ）：WebSocketの次の選択肢",
        "level": 3
    },
    {
        "id": "195-core-web-vitalsinplcpclsの現在地",
        "title": "19.5 Core Web Vitals：INP・LCP・CLSの現在地",
        "level": 3
    },
    {
        "id": "196-モバイルネットワークの現在地5g-advancedと6g研究",
        "title": "19.6 モバイルネットワークの現在地：5G-Advancedと6G研究",
        "level": 3
    },
    {
        "id": "197-2026年の全体像プロトコルスタックのまとめ",
        "title": "19.7 2026年の全体像：プロトコルスタックのまとめ",
        "level": 3
    },
    {
        "id": "学習ロードマップ",
        "title": "学習ロードマップ",
        "level": 2
    },
    {
        "id": "チェックリスト",
        "title": "チェックリスト",
        "level": 2
    },
    {
        "id": "用語集",
        "title": "用語集",
        "level": 2
    },
    {
        "id": "参考文献",
        "title": "参考文献",
        "level": 2
    }
];

export interface ChecklistItem {
    id: string;
    text: string;
}

export const CHECKLIST_ITEMS: ChecklistItem[] = [
    {
        "id": "",
        "text": "レイテンシの4要素（伝搬・伝送・処理・キューイング）を説明できる"
    },
    {
        "id": "",
        "text": "TCPスリーウェイハンドシェイクとスロースタートがなぜWebの体感速度に影響するか説明できる"
    },
    {
        "id": "",
        "text": "TCPのHOLブロッキングと、それがQUICでどう解消されるかを説明できる"
    },
    {
        "id": "",
        "text": "UDPがNAT環境で抱える課題と、STUN/TURN/ICEの役割を説明できる"
    },
    {
        "id": "",
        "text": "TLSの3つの保証（暗号化・認証・完全性）と、TLS 1.2の2-RTTからTLS\n                                1.3の1-RTT/0-RTTへの進化を説明できる"
    },
    {
        "id": "",
        "text": "WiFiのCSMA/CAとモバイル網のRRC状態遷移が、なぜそれぞれ独自の遅延要因になるかを説明できる"
    },
    {
        "id": "",
        "text": "HTTPの歴史（0.9→1.0→1.1→2→3）と各バージョンの主要な変更点を説明できる"
    },
    {
        "id": "",
        "text": "ドメインシャーディングがHTTP/1.1では有効でHTTP/2以降では有害になる理由を説明できる"
    },
    {
        "id": "",
        "text": "HTTP/2のバイナリフレーミング・多重化・HPACK・（非推奨化された）サーバープッシュを説明できる"
    },
    {
        "id": "",
        "text": "XHR/fetchのCORSプリフライトが発生する条件を説明できる"
    },
    {
        "id": "",
        "text": "SSE・WebSocket・WebRTCをユースケースに応じて使い分けられる"
    },
    {
        "id": "",
        "text": "WebRTCのシグナリング・ICE・SDP・SFUアーキテクチャの役割分担を説明できる"
    },
    {
        "id": "",
        "text": "2026年時点のHTTP/3普及状況と、フォールバック設計の必要性を説明できる"
    },
    {
        "id": "",
        "text": "BBRv3のようなモデルベース輻輳制御が、損失ベース制御と何が違うかを説明できる"
    },
    {
        "id": "",
        "text": "Core Web\n                                Vitals（LCP・INP・CLS）を実際に自分のサイトで計測したことがある"
    }
];

export interface ReferenceItem {
    badge: string;
    href: string;
    linkText: string;
    fullText: string;
}

export const REFERENCES: ReferenceItem[] = [
    {
        "badge": "1",
        "href": "https://technologychecker.io/blog/web-traffic-statistics",
        "linkText": "https://technologychecker.io/blog/web-traffic-statistics",
        "fullText": "Cloudflare Radar / technologychecker.io「Web Traffic Statistics\n                            2026」（HTTP/3シェア19.84%、2026年7月時点） —\n                            https://technologychecker.io/blog/web-traffic-statistics"
    },
    {
        "badge": "2",
        "href": "https://mxinden-bot.github.io/slides/04-quic-discussion/",
        "linkText": "https://mxinden-bot.github.io/slides/04-quic-discussion/",
        "fullText": "Max Inden（Mozilla）「Evolving HTTP/3 & QUIC beyond 30%?」HTTP\n                            Workshop 2026 —\n                            https://mxinden-bot.github.io/slides/04-quic-discussion/"
    },
    {
        "badge": "3",
        "href": "https://developers.cloudflare.com/speed/optimization/protocol/http3/",
        "linkText": "https://developers.cloudflare.com/speed/optimization/protocol/http3/",
        "fullText": "Cloudflare Developers Docs「HTTP/3 (with QUIC)」 —\n                            https://developers.cloudflare.com/speed/optimization/protocol/http3/"
    },
    {
        "badge": "4",
        "href": "https://technologychecker.io/blog/http-protocol-adoption",
        "linkText": "https://technologychecker.io/blog/http-protocol-adoption",
        "fullText": "technologychecker.io「HTTP Protocol Adoption\n                            2026」（耐量子鍵交換55.77%、Cloudflare Radar集計） —\n                            https://technologychecker.io/blog/http-protocol-adoption"
    },
    {
        "badge": "5",
        "href": "https://evertrust.io/blog/hybrid-post-quantum-certificates/",
        "linkText": "https://evertrust.io/blog/hybrid-post-quantum-certificates/",
        "fullText": "EverTrust「Hybrid Post-Quantum\n                            Certificates」（Chrome/Firefoxのハイブリッド鍵交換対応状況） —\n                            https://evertrust.io/blog/hybrid-post-quantum-certificates/"
    },
    {
        "badge": "6",
        "href": "https://github.com/google/bbr",
        "linkText": "https://github.com/google/bbr",
        "fullText": "Google / GitHub「google/bbr」BBRv3リリースノートおよびIETF CCWG発表資料\n                            —\n                            https://github.com/google/bbr"
    },
    {
        "badge": "7",
        "href": "https://webrtc.ventures/2026/04/webtransport-is-now-baseline-what-it-means-for-real-time-media/",
        "linkText": "https://webrtc.ventures/2026/04/webtransport-is-now-baseline-what-it-means-for-real-time-media/",
        "fullText": "WebRTC.ventures「WebTransport Is Now Baseline」（Safari\n                            26.4対応、2026年3月） —\n                            https://webrtc.ventures/2026/04/webtransport-is-now-baseline-what-it-means-for-real-time-media/"
    },
    {
        "badge": "8",
        "href": "https://www.forasoft.com/learn/video-streaming/articles-streaming/webtransport-whip",
        "linkText": "https://www.forasoft.com/learn/video-streaming/articles-streaming/webtransport-whip",
        "fullText": "Fora Soft「WebTransport and WHIP-over-WebTransport」（W3C仕様の状況） —\n                            https://www.forasoft.com/learn/video-streaming/articles-streaming/webtransport-whip"
    },
    {
        "badge": "9",
        "href": "https://web.dev/articles/inp",
        "linkText": "https://web.dev/articles/inp",
        "fullText": "web.dev「Interaction to Next Paint\n                            (INP)」（INP指標の定義・計測方法・閾値） —\n                            https://web.dev/articles/inp"
    },
    {
        "badge": "10",
        "href": "https://launchcodex.com/blog/web-digital-infrastructure/core-web-vitals-guide/",
        "linkText": "https://launchcodex.com/blog/web-digital-infrastructure/core-web-vitals-guide/",
        "fullText": "Launchcodex「Core Web Vitals guide: LCP, INP, and CLS explained\n                            (2026)」（Addy Osmani氏のコメント、Interop 2025） —\n                            https://launchcodex.com/blog/web-digital-infrastructure/core-web-vitals-guide/"
    },
    {
        "badge": "11",
        "href": "https://cdn.atis.org/atis.org/2026/04/16110914/Combined-Slides_3GPP-Webinar-R20_2026.pdf",
        "linkText": "https://cdn.atis.org/atis.org/2026/04/16110914/Combined-Slides_3GPP-Webinar-R20_2026.pdf",
        "fullText": "ATIS / 3GPP「3GPP Release 20 Webinar」（Puneet Jain氏、3GPP SA\n                            Chair、2026年4月） —\n                            https://cdn.atis.org/atis.org/2026/04/16110914/Combined-Slides_3GPP-Webinar-R20_2026.pdf"
    },
    {
        "badge": "12",
        "href": "https://www.cafetele.com/articles/article-what-is-6g-3gpp-release-20.html",
        "linkText": "https://www.cafetele.com/articles/article-what-is-6g-3gpp-release-20.html",
        "fullText": "CafeTele「What Is 6G? The 3GPP Release 20 Study and the Road to 2030」 —\n                            https://www.cafetele.com/articles/article-what-is-6g-3gpp-release-20.html"
    },
    {
        "badge": "13",
        "href": "https://www.oreilly.com/library/view/high-performance-browser/9781449344757/",
        "linkText": "https://www.oreilly.com/library/view/high-performance-browser/9781449344757/",
        "fullText": "O'Reilly Media「High Performance Browser\n                            Networking」書籍公式ページ（目次確認元） —\n                            https://www.oreilly.com/library/view/high-performance-browser/9781449344757/"
    },
    {
        "badge": "14",
        "href": "https://datatracker.ietf.org/doc/rfc9849/",
        "linkText": "https://datatracker.ietf.org/doc/rfc9849/",
        "fullText": "IETF Datatracker「RFC 9849 - TLS Encrypted Client Hello」 —\n                            https://datatracker.ietf.org/doc/rfc9849/"
    },
    {
        "badge": "15",
        "href": "https://datatracker.ietf.org/doc/draft-ietf-uta-pqc-app/",
        "linkText": "https://datatracker.ietf.org/doc/draft-ietf-uta-pqc-app/",
        "fullText": "IETF Datatracker「draft-ietf-uta-pqc-app - Post-Quantum Cryptography\n                            Recommendations for TLS-based Applications」 —\n                            https://datatracker.ietf.org/doc/draft-ietf-uta-pqc-app/"
    }
];

export type DiagramId =
    | 'diag-1' | 'diag-2' | 'diag-3' | 'diag-4' | 'diag-5'
    | 'diag-6' | 'diag-7' | 'diag-8' | 'diag-9' | 'diag-10'
    | 'diag-11' | 'diag-12' | 'diag-13' | 'diag-14' | 'diag-15'
    | 'diag-16' | 'diag-17' | 'diag-18' | 'diag-19' | 'diag-20'
    | 'diag-21' | 'diag-22' | 'diag-23' | 'diag-24' | 'diag-25'
    | 'diag-26' | 'diag-27' | 'diag-28' | 'diag-29' | 'diag-30'
    | 'diag-31' | 'diag-32' | 'diag-33';


export const DIAGRAMS: Record<DiagramId, string> = {
    "diag-1": "flowchart TB\n    A[ページが遅いと感じる] --> B{ボトルネックはどこか}\n    B -->|コード実行| C[JS実行/レンダリング<br/>ミリ秒オーダー]\n    B -->|ネットワーク| D[DNS解決 + TCP確立<br/>+ TLSハンドシェイク<br/>+ HTTPリクエスト往復]\n    D --> E[地理的距離による伝搬遅延<br/>光速の物理的限界]\n    D --> F[輻輳制御による<br/>スロースタート]\n    D --> G[ラウンドトリップの多さ<br/>1RTTごとに数十-数百ms]\n    E --> H[ネットワークの物理法則は<br/>コードでは解決できない]\n    F --> H\n    G --> H\n\n    classDef highlightFill fill:#1a2f52,stroke:#7c9eff,color:#eaf0ff\n    classDef dangerFill fill:#3a1420,stroke:#c05a6e,color:#f5d8de\n    class H dangerFill\n    class D,E,F,G highlightFill",
    "diag-2": "flowchart LR\n    A[送信元] -->|伝送遅延<br/>パケットサイズ/帯域幅| B[ルーター1]\n    B -->|処理遅延<br/>ヘッダ解析| C[キュー]\n    C -->|キューイング遅延<br/>輻輳度合いに依存| D[伝搬遅延<br/>光速 x 距離]\n    D --> E[宛先]\n\n    classDef highlightFill fill:#1a2f52,stroke:#7c9eff,color:#eaf0ff\n    class D highlightFill",
    "diag-3": "sequenceDiagram\n    participant C as クライアント\n    participant S as サーバー\n    C->>S: SYN(接続要求 + 初期シーケンス番号)\n    S->>C: SYN-ACK(応答 + サーバー側シーケンス番号)\n    C->>S: ACK(確認応答)\n    Note over C,S: ここでようやくアプリケーションデータ送信可能<br/>合計1RTT消費\n    C->>S: HTTPリクエスト(データ送信開始)",
    "diag-4": "flowchart TB\n    subgraph SlowStart[スロースタート: cwndが指数的に増加]\n        R1[RTT 1: cwnd=10セグメント] --> R2[RTT 2: cwnd=20セグメント]\n        R2 --> R3[RTT 3: cwnd=40セグメント]\n        R3 --> R4[RTT 4: cwnd=80セグメント]\n    end\n    R4 --> CA[輻輳回避フェーズ<br/>線形増加に切り替え]\n    CA --> LOSS{パケットロス検知}\n    LOSS -->|検知| REDUCE[cwndを大きく削減<br/>アルゴリズムにより挙動が異なる]\n    LOSS -->|継続| CA\n\n    classDef warnFill fill:#3a2a10,stroke:#c08a3e,color:#f5e0c0\n    class LOSS,REDUCE warnFill",
    "diag-5": "sequenceDiagram\n    participant S as 送信側\n    participant N as ネットワーク\n    participant R as 受信側\n    S->>N: パケット1\n    S->>N: パケット2(ロスト)\n    S->>N: パケット3\n    S->>N: パケット4\n    N->>R: パケット1 到着\n    N-->>R: パケット2 消失\n    N->>R: パケット3 到着(バッファで待機)\n    N->>R: パケット4 到着(バッファで待機)\n    Note over R: パケット2の再送が届くまで<br/>パケット3・4はアプリケーションに渡せない\n    S->>N: パケット2 再送\n    N->>R: パケット2 再送到着\n    Note over R: ここでようやく1-4を順に処理可能",
    "diag-6": "flowchart LR\n    subgraph TCP特性\n        T1[コネクション指向]\n        T2[順序保証あり]\n        T3[再送・信頼性あり]\n        T4[輻輳制御あり]\n        T5[HOLブロッキングあり]\n    end\n    subgraph UDP特性\n        U1[コネクションレス]\n        U2[順序保証なし]\n        U3[再送・信頼性なし]\n        U4[輻輳制御なし]\n        U5[HOLブロッキングなし]\n    end\n\n    classDef highlightFill fill:#1a2f52,stroke:#7c9eff,color:#eaf0ff\n    classDef warnFill fill:#3a2a10,stroke:#c08a3e,color:#f5e0c0\n    class TCP特性 highlightFill\n    class UDP特性 warnFill",
    "diag-7": "sequenceDiagram\n    participant A as 端末A\n    participant STUN as STUNサーバー\n    participant B as 端末B\n    participant TURN as TURNサーバー(最終手段)\n\n    A->>STUN: 自分のパブリックIP:ポートを教えて\n    STUN-->>A: あなたのパブリックアドレスはこちら\n    B->>STUN: 自分のパブリックIP:ポートを教えて\n    STUN-->>B: あなたのパブリックアドレスはこちら\n    A->>B: 直接P2P接続を試行(ICE Candidate交換後)\n    alt 直接接続に成功\n        A->>B: メディア/データを直接送受信\n    else 対称型NAT等で直接接続不可\n        A->>TURN: リレー経由で接続\n        TURN->>B: リレー経由でデータ転送\n    end",
    "diag-8": "sequenceDiagram\n    participant C as クライアント\n    participant S as サーバー\n    Note over C,S: 前提: TCPスリーウェイハンドシェイク(1RTT)は完了済み\n    C->>S: ClientHello(対応する暗号スイート一覧など)\n    S->>C: ServerHello + 証明書 + ServerHelloDone\n    Note over C,S: ここまでで1RTT\n    C->>S: 鍵交換情報 + ChangeCipherSpec + Finished\n    S->>C: ChangeCipherSpec + Finished\n    Note over C,S: ここまででさらに1RTT、合計TLSだけで2RTT\n    C->>S: 暗号化されたHTTPリクエスト",
    "diag-9": "flowchart TB\n    Root[ルート証明機関<br/>Root CA] -->|署名| Inter[中間証明機関<br/>Intermediate CA]\n    Inter -->|署名| Leaf[サーバー証明書<br/>example.com]\n    Leaf --> Browser{ブラウザが検証}\n    Browser -->|信頼済みルートストアと照合| Valid[信頼の連鎖が成立]\n    Browser -->|失効確認| OCSP[OCSPステープリング<br/>サーバーが事前取得した失効情報を提示]\n\n    classDef highlightFill fill:#1a2f52,stroke:#7c9eff,color:#eaf0ff\n    class Valid,OCSP highlightFill",
    "diag-10": "flowchart LR\n    A[帯域幅<br/>Bandwidth] --> D[実効スループット]\n    B[信号強度<br/>Signal Power] --> D\n    C[変調方式<br/>Modulation] --> D\n    D --> E[SNR<br/>信号対雑音比が高いほど<br/>高次の変調方式が使え高速化]\n\n    classDef highlightFill fill:#1a2f52,stroke:#7c9eff,color:#eaf0ff\n    class E highlightFill",
    "diag-11": "flowchart TB\n    Start([送信データが発生]) --> Sense{チャネルは空いているか}\n    Sense -->|使用中| Wait[ランダムなバックオフ時間待機]\n    Wait --> Sense\n    Sense -->|空いている| Send[フレーム送信]\n    Send --> Ack{ACK受信？}\n    Ack -->|受信した| Done([送信完了])\n    Ack -->|タイムアウト| Collision[衝突または干渉と判断]\n    Collision --> Wait\n\n    classDef warnFill fill:#3a2a10,stroke:#c08a3e,color:#f5e0c0\n    class Collision warnFill",
    "diag-12": "flowchart LR\n    G1[1G<br/>アナログ音声] --> G2[2G<br/>デジタル音声+SMS<br/>GSM/CDMA]\n    G2 --> G3[3G<br/>パケット交換データ<br/>UMTS/CDMA2000]\n    G3 --> G4[4G LTE<br/>オールIP<br/>フラットなRAN構造]\n    G4 --> G5[5G<br/>超低遅延+超高速+<br/>大量接続 mMTC/URLLC]\n    G5 --> G5A[5G-Advanced<br/>Release 19 が中心<br/>Release 20 でも継続]\n    G5A --> G6[6G<br/>Release 20 で<br/>研究(スタディ)段階]\n\n    classDef highlightFill fill:#1a2f52,stroke:#7c9eff,color:#eaf0ff\n    class G5,G5A,G6 highlightFill",
    "diag-13": "stateDiagram-v2\n    direction LR\n    [*] --> RRC_IDLE\n    RRC_IDLE --> RRC_CONNECTED: データ送信要求<br/>接続確立手順(ランダムアクセス＋<br/>RRC Setup)で数百ms-数秒\n    RRC_CONNECTED --> RRC_INACTIVE: 短い無通信で移行(5G NR)\n    RRC_INACTIVE --> RRC_CONNECTED: RRCResume(数十ms程度)\n    RRC_INACTIVE --> RRC_IDLE: さらに長い無通信で<br/>コンテキスト解放\n    RRC_CONNECTED --> RRC_IDLE: 一定時間(数秒-数十秒)<br/>通信がないとタイムアウト\n    RRC_CONNECTED --> RRC_CONNECTED: データ送受信中<br/>最も高速だがバッテリー消費大\n    RRC_IDLE --> RRC_IDLE: 待機中<br/>バッテリー消費最小、通信不可",
    "diag-14": "flowchart LR\n    UE[端末<br/>UE] -->|無線区間| RAN[無線アクセス網<br/>RAN 基地局]\n    RAN -->|バックホール| CN[コアネットワーク<br/>CN]\n    CN -->|インターネット接続| Internet[インターネット]\n    Internet --> Server[Webサーバー/CDN]\n\n    classDef highlightFill fill:#1a2f52,stroke:#7c9eff,color:#eaf0ff\n    class RAN highlightFill",
    "diag-15": "flowchart TB\n    A[周期的な通信を排除] --> F[バースト転送してアイドルに戻る]\n    B[不要なキープアライブを削減] --> F\n    C[RRC状態遷移コストを考慮] --> F\n    D[ユーザー操作とネットワーク通信を分離] --> F\n    E[WiFiへのオフロードを優先] --> F\n    F --> G[バッテリー消費削減 +<br/>体感速度向上]\n\n    classDef highlightFill fill:#1a2f52,stroke:#7c9eff,color:#eaf0ff\n    class F,G highlightFill",
    "diag-16": "flowchart TB\n    V09[HTTP/0.9 1991年<br/>1行のリクエスト、GETのみ<br/>ヘッダなし、HTMLのみ返却] --> V10[HTTP/1.0 1996年<br/>ヘッダ導入、ステータスコード<br/>接続ごとに新規TCP]\n    V10 --> V11[HTTP/1.1 1997年<br/>Keep-Alive標準化<br/>パイプライニング仕様化<br/>チャンク転送エンコーディング]\n    V11 --> V2[HTTP/2 2015年<br/>SPDYを起源とするバイナリプロトコル<br/>多重化・ヘッダ圧縮・サーバープッシュ]\n    V2 --> V3[HTTP/3 2022年 RFC 9114<br/>QUIC上に構築、TCPを廃しUDPベースへ<br/>2026年時点で本格普及期]\n\n    classDef highlightFill fill:#1a2f52,stroke:#7c9eff,color:#eaf0ff\n    class V2,V3 highlightFill",
    "diag-17": "flowchart TB\n    A[HTML取得] --> B[HTMLパース開始]\n    B --> C[CSS取得 レンダリングブロック]\n    B --> D[JS取得 パースブロック<br/>async/deferで回避可]\n    C --> E[CSSOM構築]\n    B --> F[DOM構築]\n    E --> G[レンダーツリー構築]\n    F --> G\n    G --> H[レイアウト計算]\n    H --> I[ペイント]\n    D --> J[JS実行 DOM操作の可能性]\n    J --> H\n\n    classDef warnFill fill:#3a2a10,stroke:#c08a3e,color:#f5e0c0\n    class C,D warnFill",
    "diag-18": "flowchart TB\n    Browser[ブラウザ] -->|最大6接続| Origin1[example.com]\n    Browser -->|さらに6接続| Shard1[img1.example.com]\n    Browser -->|さらに6接続| Shard2[img2.example.com]\n    Origin1 --> Note1[実質的な並列度アップ<br/>ただし各接続で個別に<br/>TCP+TLSコスト発生]\n    Shard1 --> Note1\n    Shard2 --> Note1\n\n    classDef warnFill fill:#3a2a10,stroke:#c08a3e,color:#f5e0c0\n    class Note1 warnFill",
    "diag-19": "flowchart TB\n    Conn[1つのTCPコネクション] --> S1[ストリーム1 リクエストA]\n    Conn --> S2[ストリーム2 リクエストB]\n    Conn --> S3[ストリーム3 リクエストC]\n    S1 --> F1[HEADERSフレーム]\n    S1 --> F2[DATAフレーム]\n    S2 --> F3[HEADERSフレーム]\n    S2 --> F4[DATAフレーム]\n    F1 -.->|物理的には交互に送信される| F3\n    F2 -.->|フレームのStream IDで再構築| F4\n\n    classDef highlightFill fill:#1a2f52,stroke:#7c9eff,color:#eaf0ff\n    class Conn highlightFill",
    "diag-20": "flowchart TB\n    A[クライアント側でリソースをキャッシュする] --> E[配信最適化]\n    B[転送データを圧縮する] --> E\n    C[不要なリクエストバイトを削減する] --> E\n    D[リクエスト レスポンス処理を並列化する] --> E\n\n    classDef highlightFill fill:#1a2f52,stroke:#7c9eff,color:#eaf0ff\n    class E highlightFill",
    "diag-21": "flowchart TB\n    App[Webアプリケーション JS] --> API[ブラウザAPI層<br/>XHR/Fetch/WebSocket/WebRTC等]\n    API --> ConnMgmt[接続管理層<br/>オリジンごとの接続数制限<br/>優先度キュー、DNSプリフェッチ]\n    ConnMgmt --> Sandbox[ネットワークセキュリティ<br/>サンドボックス層<br/>同一オリジンポリシー、CORS]\n    Sandbox --> Cache[リソース/クライアント状態<br/>キャッシュ層<br/>HTTPキャッシュ、Cookie、IndexedDB]\n    Cache --> OS[OSのTCP/UDPスタック]\n\n    classDef highlightFill fill:#1a2f52,stroke:#7c9eff,color:#eaf0ff\n    class Sandbox highlightFill",
    "diag-22": "sequenceDiagram\n    participant B as ブラウザ\n    participant S as サーバー(別オリジン)\n    Note over B,S: 例: JSONを送るPOSTでContent-Type: application/jsonを指定した場合\n    B->>S: OPTIONS /api/data(プリフライト)<br/>Origin, Access-Control-Request-Method等\n    S-->>B: Access-Control-Allow-Origin<br/>Access-Control-Allow-Methods 等\n    Note over B: 許可を確認できたら初めて本リクエスト送信<br/>この往復で+1RTT発生\n    B->>S: POST /api/data(本リクエスト)\n    S-->>B: 200 OK + データ",
    "diag-23": "sequenceDiagram\n    participant B as ブラウザ EventSource\n    participant S as サーバー\n    B->>S: GET /events(Accept: text/event-stream)\n    S-->>B: 200 OK(接続を維持したまま)\n    loop サーバーがイベント発生時に送信\n        S-->>B: data: メッセージ1\\n\\n\n        S-->>B: data: メッセージ2\\n\\n\n    end\n    Note over B,S: 接続が切れてもEventSourceは自動的に再接続を試みる<br/>(Last-Event-IDで再開位置を伝達)",
    "diag-24": "sequenceDiagram\n    participant B as ブラウザ\n    participant S as サーバー\n    B->>S: GET /chat HTTP/1.1<br/>Upgrade: websocket<br/>Connection: Upgrade<br/>Sec-WebSocket-Key: ...\n    S-->>B: 101 Switching Protocols<br/>Sec-WebSocket-Accept: ...\n    Note over B,S: ここからWebSocketプロトコルに切り替わる<br/>以降は双方向にフレームを自由に送受信\n    B->>S: テキスト/バイナリフレーム\n    S-->>B: テキスト/バイナリフレーム\n    S-->>B: テキスト/バイナリフレーム(クライアントの要求なしで送信可)",
    "diag-25": "sequenceDiagram\n    participant A as 端末A\n    participant Sig as シグナリングサーバー<br/>WebSocket等、規格外\n    participant B as 端末B\n\n    A->>Sig: SDP Offer(対応コーデック等の提案)\n    Sig->>B: SDP Offerを転送\n    B->>Sig: SDP Answer(応答)\n    Sig->>A: SDP Answerを転送\n    Note over A,B: 同時にICE Candidate(接続経路候補)も交換\n    A->>B: ICE接続性チェック(STUN経由)\n    Note over A,B: 直接経路が確立(または必要ならTURN中継)\n    A->>B: DTLSハンドシェイクで暗号化鍵確立\n    Note over A,B: 以降 SRTP(メディア)/ SCTP(データ)で直接通信",
    "diag-26": "flowchart TB\n    ICE[ICEで確立された伝送経路<br/>UDP / TCP / TURN中継<br/>TCP・TLS over TCP] --> DTLS[DTLS<br/>Datagram TLS<br/>鍵交換と暗号化]\n    DTLS --> SRTP[SRTP/SRTCP<br/>暗号化された音声/映像ストリーム]\n    DTLS --> SCTP[SCTP over DTLS<br/>DataChannel<br/>任意のアプリケーションデータ]\n\n    classDef highlightFill fill:#1a2f52,stroke:#7c9eff,color:#eaf0ff\n    class DTLS highlightFill",
    "diag-27": "flowchart TB\n    subgraph HTTP2onTCP[HTTP/2 over TCP]\n        direction TB\n        TCPConn[1本のTCPコネクション] --> TCPHOL[1つのパケットロスが<br/>全ストリームをブロック]\n    end\n    subgraph HTTP3onQUIC[HTTP/3 over QUIC]\n        direction TB\n        QUICConn[1本のQUICコネクション] --> S1Q[ストリーム1<br/>独立した信頼性制御]\n        QUICConn --> S2Q[ストリーム2<br/>独立した信頼性制御]\n        S1Q --> NoHOL[ストリーム1のロスは<br/>ストリーム2に影響しない]\n    end\n\n    classDef dangerFill fill:#3a1420,stroke:#c05a6e,color:#f5d8de\n    classDef highlightFill fill:#1a2f52,stroke:#7c9eff,color:#eaf0ff\n    class TCPHOL dangerFill\n    class NoHOL highlightFill",
    "diag-28": "flowchart LR\n    A[HTTP/1.x] -->|2026年7月 Cloudflare計測| B[\"約28%\"]\n    C[HTTP/2] -->|同上| D[\"約52%\"]\n    E[HTTP/3] -->|同上| F[\"約20%\"]\n\n    classDef highlightFill fill:#1a2f52,stroke:#7c9eff,color:#eaf0ff\n    class D highlightFill",
    "diag-29": "sequenceDiagram\n    participant C as クライアント\n    participant S as サーバー\n    Note over C,S: TLS 1.3 フルハンドシェイク(1-RTT)\n    C->>S: ClientHello + 鍵共有(Key Share)\n    S->>C: ServerHello + 鍵共有 + 証明書 + Finished(暗号化済み)\n    Note over C,S: 1RTTで暗号化ハンドシェイク完了\n    C->>S: 暗号化されたアプリケーションデータ",
    "diag-30": "flowchart LR\n    subgraph LossBased[損失ベース CUBIC等]\n        L1[送信量を増やす] --> L2[パケットロス発生]\n        L2 --> L3[輻輳と判断し送信量を急減]\n        L3 --> L1\n    end\n    subgraph ModelBased[モデルベース BBR系]\n        M1[帯域幅とRTTを継続計測] --> M2[経路のモデルを構築]\n        M2 --> M3[損失を待たず最適送信レートを推定]\n        M3 --> M1\n    end\n\n    classDef warnFill fill:#3a2a10,stroke:#c08a3e,color:#f5e0c0\n    classDef highlightFill fill:#1a2f52,stroke:#7c9eff,color:#eaf0ff\n    class LossBased warnFill\n    class ModelBased highlightFill",
    "diag-31": "flowchart LR\n    R19[Release 19<br/>2025年完了<br/>5G-Advanced主要機能] --> R20[Release 20<br/>2026年<br/>5G-Advanced拡張 + 6Gスタディ開始]\n    R20 --> R21[Release 21<br/>2028-29年見込み<br/>初の6G仕様]\n    R21 --> Commercial[商用6G網<br/>2030年前後の見通し]\n\n    classDef highlightFill fill:#1a2f52,stroke:#7c9eff,color:#eaf0ff\n    class R20 highlightFill",
    "diag-32": "flowchart TB\n    App[アプリケーション層<br/>HTTP/1.1, HTTP/2, HTTP/3, WebSocket, WebTransport] --> Sec[セキュリティ層<br/>TLS 1.3 + ハイブリッド耐量子鍵交換 + ECH]\n    Sec --> Trans[トランスポート層<br/>TCP + BBRv3(対応カーネル) / QUIC 内蔵輻輳制御]\n    Trans --> Net[インターネット層<br/>IPv4 / IPv6]\n    Net --> Link[リンク層<br/>WiFi 7 / 5G-Advanced / 有線]\n\n    classDef highlightFill fill:#1a2f52,stroke:#7c9eff,color:#eaf0ff\n    class Sec,Trans highlightFill",
    "diag-33": "flowchart TB\n    Step1[ステップ1<br/>レイテンシ/帯域幅の物理法則を理解する<br/>第1章] --> Step2[ステップ2<br/>TCP/UDP/TLSの基本動作を理解する<br/>第2-4章]\n    Step2 --> Step3[ステップ3<br/>ワイヤレス/モバイル特有の制約を理解する<br/>第5-8章]\n    Step3 --> Step4[ステップ4<br/>HTTPの進化とHTTP/2の多重化を理解する<br/>第9-13章]\n    Step4 --> Step5[ステップ5<br/>ブラウザAPI XHR/SSE/WebSocket/WebRTCを<br/>使い分けられるようになる 第14-18章]\n    Step5 --> Step6[ステップ6<br/>HTTP/3 QUIC TLS1.3 BBRv3等<br/>2026年時点の実務知識を補う 第19章]\n    Step6 --> Step7[ステップ7<br/>実サイトでDevTools/Lighthouse/<br/>Cloudflare Radar等を使い自分の手で計測する]\n\n    classDef highlightFill fill:#1a2f52,stroke:#7c9eff,color:#eaf0ff\n    class Step7 highlightFill"
};
