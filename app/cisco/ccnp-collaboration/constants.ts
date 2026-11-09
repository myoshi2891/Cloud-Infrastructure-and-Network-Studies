export interface NavItem {
    id: string;
    href: string;
    title: string;
    isPart?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
    {
        "id": "0-本ガイドの使い方と注意事項",
        "href": "#0-本ガイドの使い方と注意事項",
        "title": "0. 本ガイドの使い方と注意事項",
        "isPart": false
    },
    {
        "id": "1-認定の全体像",
        "href": "#1-認定の全体像",
        "title": "1. 認定の全体像",
        "isPart": false
    },
    {
        "id": "2-まず押さえる基礎-cisco-collaboration-の全体アーキテクチャ",
        "href": "#2-まず押さえる基礎-cisco-collaboration-の全体アーキテクチャ",
        "title": "2. まず押さえる基礎: Cisco Collaboration の全体アーキテクチャ",
        "isPart": false
    },
    {
        "id": "3-学習ロードマップ",
        "href": "#3-学習ロードマップ",
        "title": "3. 学習ロードマップ",
        "isPart": false
    },
    {
        "id": "part-a-コア試験-350-801-clcor",
        "href": "#part-a-コア試験-350-801-clcor",
        "title": "Part A. コア試験 350-801 CLCOR",
        "isPart": true
    },
    {
        "id": "第1章-インフラストラクチャと設計20",
        "href": "#第1章-インフラストラクチャと設計20",
        "title": "第1章 インフラストラクチャと設計（20%）",
        "isPart": false
    },
    {
        "id": "第2章-プロトコルコーデックエンドポイント20",
        "href": "#第2章-プロトコルコーデックエンドポイント20",
        "title": "第2章 プロトコル、コーデック、エンドポイント（20%）",
        "isPart": false
    },
    {
        "id": "第3章-cisco-ios-xe-ゲートウェイとメディアリソース15",
        "href": "#第3章-cisco-ios-xe-ゲートウェイとメディアリソース15",
        "title": "第3章 Cisco IOS XE ゲートウェイとメディアリソース（15%）",
        "isPart": false
    },
    {
        "id": "第4章-コールコントロール25",
        "href": "#第4章-コールコントロール25",
        "title": "第4章 コールコントロール（25%）",
        "isPart": false
    },
    {
        "id": "第5章-qos10",
        "href": "#第5章-qos10",
        "title": "第5章 QoS（10%）",
        "isPart": false
    },
    {
        "id": "第6章-コラボレーションアプリケーション10",
        "href": "#第6章-コラボレーションアプリケーション10",
        "title": "第6章 コラボレーションアプリケーション（10%）",
        "isPart": false
    },
    {
        "id": "part-b-300-810-clica-コラボレーションアプリケーション",
        "href": "#part-b-300-810-clica-コラボレーションアプリケーション",
        "title": "Part B. 300-810 CLICA コラボレーションアプリケーション",
        "isPart": true
    },
    {
        "id": "b1-シングルサインオンsso15",
        "href": "#b1-シングルサインオンsso15",
        "title": "B1. シングルサインオン（SSO）（15%）",
        "isPart": false
    },
    {
        "id": "b2-cisco-unified-im-and-presencecloud-messaging30",
        "href": "#b2-cisco-unified-im-and-presencecloud-messaging30",
        "title": "B2. Cisco Unified IM and Presence、Cloud Messaging（30%）",
        "isPart": false
    },
    {
        "id": "b3-cisco-unity-connection30",
        "href": "#b3-cisco-unity-connection30",
        "title": "B3. Cisco Unity Connection（30%）",
        "isPart": false
    },
    {
        "id": "b4-アプリケーションクライアント25",
        "href": "#b4-アプリケーションクライアント25",
        "title": "B4. アプリケーションクライアント（25%）",
        "isPart": false
    },
    {
        "id": "part-c-300-815-claccm-拡張コールコントロールとモビリティ",
        "href": "#part-c-300-815-claccm-拡張コールコントロールとモビリティ",
        "title": "Part C. 300-815 CLACCM 拡張コールコントロールとモビリティ",
        "isPart": true
    },
    {
        "id": "c1-シグナリングおよびメディアプロトコル20",
        "href": "#c1-シグナリングおよびメディアプロトコル20",
        "title": "C1. シグナリングおよびメディアプロトコル（20%）",
        "isPart": false
    },
    {
        "id": "c2-ゲートウェイテクノロジーcmesrst10",
        "href": "#c2-ゲートウェイテクノロジーcmesrst10",
        "title": "C2. ゲートウェイテクノロジー（CME／SRST）（10%）",
        "isPart": false
    },
    {
        "id": "c3-cisco-unified-border-elementcube15",
        "href": "#c3-cisco-unified-border-elementcube15",
        "title": "C3. Cisco Unified Border Element（CUBE）（15%）",
        "isPart": false
    },
    {
        "id": "c4-コールコントロールとダイヤルプラン設計25",
        "href": "#c4-コールコントロールとダイヤルプラン設計25",
        "title": "C4. コールコントロールとダイヤルプラン設計（25%）",
        "isPart": false
    },
    {
        "id": "c5-cisco-ucm-のコールコントロール機能20",
        "href": "#c5-cisco-ucm-のコールコントロール機能20",
        "title": "C5. Cisco UCM のコールコントロール機能（20%）",
        "isPart": false
    },
    {
        "id": "c6-モビリティ10",
        "href": "#c6-モビリティ10",
        "title": "C6. モビリティ（10%）",
        "isPart": false
    },
    {
        "id": "part-d-300-820-clcei-クラウドとエッジ",
        "href": "#part-d-300-820-clcei-クラウドとエッジ",
        "title": "Part D. 300-820 CLCEI クラウドとエッジ",
        "isPart": true
    },
    {
        "id": "d1-主要概念25",
        "href": "#d1-主要概念25",
        "title": "D1. 主要概念（25%）",
        "isPart": false
    },
    {
        "id": "d2-expressway-の初期設定と-b2b25",
        "href": "#d2-expressway-の初期設定と-b2b25",
        "title": "D2. Expressway の初期設定と B2B（25%）",
        "isPart": false
    },
    {
        "id": "d3-モバイルおよびリモートアクセスmra25",
        "href": "#d3-モバイルおよびリモートアクセスmra25",
        "title": "D3. モバイルおよびリモートアクセス（MRA）（25%）",
        "isPart": false
    },
    {
        "id": "d4-cisco-webex-テクノロジー25",
        "href": "#d4-cisco-webex-テクノロジー25",
        "title": "D4. Cisco Webex テクノロジー（25%）",
        "isPart": false
    },
    {
        "id": "part-e-300-835-clauto-自動化とプログラミング",
        "href": "#part-e-300-835-clauto-自動化とプログラミング",
        "title": "Part E. 300-835 CLAUTO 自動化とプログラミング",
        "isPart": true
    },
    {
        "id": "e1-ネットワークプログラマビリティの基礎10",
        "href": "#e1-ネットワークプログラマビリティの基礎10",
        "title": "E1. ネットワークプログラマビリティの基礎（10%）",
        "isPart": false
    },
    {
        "id": "e2-ユニファイドコミュニケーション25",
        "href": "#e2-ユニファイドコミュニケーション25",
        "title": "E2. ユニファイドコミュニケーション（25%）",
        "isPart": false
    },
    {
        "id": "e3-クラウドコラボレーションwebex-api25",
        "href": "#e3-クラウドコラボレーションwebex-api25",
        "title": "E3. クラウドコラボレーション（Webex API）（25%）",
        "isPart": false
    },
    {
        "id": "e4-コラボレーションエンドポイント20",
        "href": "#e4-コラボレーションエンドポイント20",
        "title": "E4. コラボレーションエンドポイント（20%）",
        "isPart": false
    },
    {
        "id": "e5-ミーティング20",
        "href": "#e5-ミーティング20",
        "title": "E5. ミーティング（20%）",
        "isPart": false
    },
    {
        "id": "part-f-試験対策トラブルシュート思考法用語集",
        "href": "#part-f-試験対策トラブルシュート思考法用語集",
        "title": "Part F. 試験対策・トラブルシュート思考法・用語集",
        "isPart": true
    },
    {
        "id": "f1-試験対策の進め方",
        "href": "#f1-試験対策の進め方",
        "title": "F1. 試験対策の進め方",
        "isPart": false
    },
    {
        "id": "f2-症状別の最初の疑いどころ",
        "href": "#f2-症状別の最初の疑いどころ",
        "title": "F2. 症状別の最初の疑いどころ",
        "isPart": false
    },
    {
        "id": "f3-ポートとプロトコルの早見表",
        "href": "#f3-ポートとプロトコルの早見表",
        "title": "F3. ポートとプロトコルの早見表",
        "isPart": false
    },
    {
        "id": "f4-用語集",
        "href": "#f4-用語集",
        "title": "F4. 用語集",
        "isPart": false
    },
    {
        "id": "f5-学習計画の例12-週間",
        "href": "#f5-学習計画の例12-週間",
        "title": "F5. 学習計画の例（12 週間）",
        "isPart": false
    },
    {
        "id": "付録-参考ソース一覧url",
        "href": "#付録-参考ソース一覧url",
        "title": "付録. 参考ソース一覧（URL）",
        "isPart": true
    }
];

export const DIAGRAMS: Record<string, string> = {
    "d1": "flowchart LR\nS[\"受験開始\"] --> C[\"コア試験<br/>350-801 CLCOR\"]\nC --> K{\"コンセントレーション試験<br/>1つ選択\"}\nK --> K1[\"300-810 CLICA<br/>アプリケーション\"]\nK --> K2[\"300-815 CLACCM<br/>拡張コールコントロール・モビリティ\"]\nK --> K3[\"300-820 CLCEI<br/>クラウド・エッジ\"]\nK --> K4[\"300-835 CLAUTO<br/>自動化・プログラミング\"]\nK1 --> G[\"CCNP Collaboration 取得\"]\nK2 --> G\nK3 --> G\nK4 --> G\nC -. \"CCIE Collaboration の<br/>筆記としても有効\" .-> E[\"CCIE Collaboration<br/>ラボ受験資格\"]",
    "d2": "flowchart TB\nsubgraph Internet[\"インターネット / 外部\"]\nWX[\"Webex クラウド<br/>Control Hub / Calling / Meetings\"]\nITSP[\"ITSP / PSTN\"]\nEXT[\"外部組織 B2B\"]\nRW[\"リモートワーカー<br/>Jabber / Webex アプリ\"]\nend\nsubgraph DMZ[\"DMZ\"]\nEXE[\"Expressway-E\"]\nend\nsubgraph LAN[\"社内ネットワーク\"]\nEXC[\"Expressway-C\"]\nUCM[\"Cisco UCM クラスタ\"]\nIMP[\"IM and Presence\"]\nCUC[\"Unity Connection\"]\nCUBE[\"CUBE / IOS XE GW\"]\nEP[\"IP Phone / Room デバイス / クライアント\"]\nDIR[\"LDAP / Active Directory\"]\nend\nRW --> EXE\nEXT --> EXE\nEXE --> EXC\nEXC --> UCM\nEXC --> IMP\nEP --> UCM\nUCM --> IMP\nUCM --> CUC\nUCM --> CUBE\nCUBE --> ITSP\nUCM --> DIR\nUCM -. \"Hybrid / Local Gateway\" .-> WX\nCUBE -. \"Webex Calling<br/>Local Gateway\" .-> WX",
    "d3": "flowchart TD\nA[\"Step 1<br/>基礎: 全体像・用語・SIP/RTP の考え方\"] --> B[\"Step 2<br/>CLCOR 第1章: インフラ・DNS/NTP/DHCP/証明書\"]\nB --> C[\"Step 3<br/>CLCOR 第2・3章: SIP、コーデック、ゲートウェイ\"]\nC --> D[\"Step 4<br/>CLCOR 第4章: ダイヤルプラン<br/>最重要 25%\"]\nD --> E[\"Step 5<br/>CLCOR 第5・6章: QoS、Unity Connection、Webex\"]\nE --> F[\"Step 6<br/>CLCOR 模擬試験・ラボ\"]\nF --> G{\"コンセントレーション選択\"}\nG --> H1[\"CLICA\"]\nG --> H2[\"CLACCM\"]\nG --> H3[\"CLCEI\"]\nG --> H4[\"CLAUTO\"]",
    "d4": "flowchart TD\nP[\"症状: 通話できない / 音が聞こえない / 登録できない\"] --> L1{\"IP 到達性と<br/>ポート開放はOK?\"}\nL1 -- \"No\" --> F1[\"ネットワーク・FW を確認\"]\nL1 -- \"Yes\" --> L2{\"DNS / NTP / 証明書 はOK?\"}\nL2 -- \"No\" --> F2[\"名前解決・時刻・証明書チェーンを確認\"]\nL2 -- \"Yes\" --> L3{\"シグナリング SIP は成功?\"}\nL3 -- \"No\" --> F3[\"ダイヤルプラン・CSS・トランク設定・SIP トレース\"]\nL3 -- \"Yes\" --> L4{\"メディア RTP は双方向?\"}\nL4 -- \"No\" --> F4[\"SDP・NAT・コーデック・メディアリソース・QoS\"]\nL4 -- \"Yes\" --> F5[\"アプリ層: SSO・ボイスメール・Presence・機能設定\"]",
    "d5": "flowchart LR\nD[\"設計検討\"] --> a[\"ライセンス\"]\nD --> b[\"導入規模\"]\nD --> c[\"帯域幅\"]\nD --> d[\"高可用性\"]\nD --> e[\"ディザスタリカバリ\"]\nD --> f[\"ダイヤルプラン\"]\nD --> g[\"セキュリティ\"]\nD --> h[\"QoS\"]",
    "d6": "flowchart LR\nsubgraph Cluster[\"UCM クラスタ\"]\nPUB[\"Publisher<br/>DB マスター\"]\nSUB1[\"Subscriber A<br/>プライマリ\"]\nSUB2[\"Subscriber B<br/>バックアップ\"]\nTFTP[\"TFTP サーバー\"]\nend\nPH[\"IP Phone<br/>Call Manager Group:<br/>A → B の優先順\"] --> SUB1\nPH -. \"A 障害時\" .-> SUB2\nPUB --> SUB1\nPUB --> SUB2\nPUB --> TFTP\nRemote[\"リモート拠点 IP Phone\"] -. \"WAN 断\" .-> SRST[\"拠点 SRST ゲートウェイ\"]",
    "d7": "flowchart LR\nsubgraph Outside[\"社外\"]\nJ[\"Jabber / Webex アプリ<br/>(リモート)\"]\nB2B[\"外部組織のビデオ端末\"]\nITSP[\"ITSP\"]\nend\nsubgraph Edge[\"ネットワーク境界\"]\nE[\"Expressway-E\"]\nCB[\"CUBE\"]\nend\nsubgraph Inside[\"社内\"]\nC[\"Expressway-C\"]\nU[\"UCM\"]\nend\nJ -->|\"MRA: HTTPS/SIP TLS\"| E\nB2B -->|\"B2B: SIP/H.323\"| E\nE --- C\nC --- U\nITSP -->|\"SIP トランク\"| CB\nCB --- U",
    "d8": "sequenceDiagram\nparticipant Ph as IP Phone\nparticipant SW as スイッチ\nparticipant DH as DHCP サーバー\nparticipant TF as TFTP サーバー\nparticipant CM as UCM Subscriber\nPh->>SW: CDP / LLDP-MED で Voice VLAN を取得\nPh->>DH: DHCP Discover\nDH-->>Ph: IP・GW・DNS・NTP・Option 150 (TFTP)\nPh->>TF: 設定ファイル要求 SEPMAC.cnf.xml\nTF-->>Ph: 設定ファイル(CM Group・ファームウェア)\nPh->>CM: SIP / SCCP 登録\nCM-->>Ph: 登録完了",
    "d9": "flowchart TD\nS[\"Jabber / Webex アプリ起動\"] --> Q1[\"社内 DNS に<br/>_cisco-uds._tcp.domain を問い合わせ\"]\nQ1 -->|\"応答あり\"| IN[\"社内 UCM に直接接続\"]\nQ1 -->|\"応答なし\"| Q2[\"_collab-edge._tls.domain を問い合わせ\"]\nQ2 -->|\"応答あり\"| OUT[\"Expressway-E 経由で MRA 接続\"]\nQ2 -->|\"応答なし\"| ERR[\"サービス検出失敗<br/>手動設定 or DNS を確認\"]",
    "d10": "sequenceDiagram\nparticipant Cl as クライアント\nparticipant Sv as サーバー\nCl->>Sv: TCP SYN\nSv-->>Cl: TCP SYN/ACK\nCl->>Sv: TCP ACK\nCl->>Sv: TLS ClientHello(対応バージョン・暗号スイート)\nSv-->>Cl: ServerHello + Certificate\nCl->>Cl: 証明書検証(チェーン・SAN・有効期限)\nCl->>Sv: 鍵交換・Finished\nSv-->>Cl: Finished\nNote over Cl,Sv: 以降 SIP/HTTP を暗号化して送信",
    "d11": "sequenceDiagram\nparticipant A as 発信側 UA\nparticipant P as SIP サーバー UCM\nparticipant B as 着信側 UA\nA->>P: INVITE SDP Offer\nP->>B: INVITE SDP Offer\nP-->>A: 100 Trying\nB-->>P: 180 Ringing\nP-->>A: 180 Ringing\nB-->>P: 200 OK SDP Answer\nP-->>A: 200 OK SDP Answer\nA->>P: ACK\nP->>B: ACK\nNote over A,B: RTP 双方向メディア開始\nA->>P: BYE\nP->>B: BYE\nB-->>P: 200 OK\nP-->>A: 200 OK",
    "d12": "sequenceDiagram\nparticipant A as A\nparticipant B as B\nparticipant C as C\nA->>B: 通話中\nA->>B: re-INVITE a=sendonly 保留\nB-->>A: 200 OK\nA->>C: INVITE 相談呼\nC-->>A: 200 OK\nA->>B: REFER Refer-To C\nB-->>A: 202 Accepted\nB->>C: INVITE 転送先へ\nC-->>B: 200 OK\nNote over B,C: B と C が通話",
    "d13": "flowchart TD\nQ1{\"通話は WAN を通る?\"} -->|\"No LAN内\"| L[\"G.711 または G.722\"]\nQ1 -->|\"Yes\"| Q2{\"帯域は十分か?\"}\nQ2 -->|\"十分\"| L\nQ2 -->|\"限られる\"| Q3{\"パケットロスが多い?\"}\nQ3 -->|\"Yes\"| I[\"iLBC / Opus を検討\"]\nQ3 -->|\"No\"| G[\"G.729 を検討\"]\nG --> W[\"注意: 圧縮コーデックは<br/>トランスコーディングが必要になる場合あり\"]",
    "d14": "flowchart LR\nA[\"UCM で電話機・ユーザーを作成\"] --> B[\"アクティベーションコード発行<br/>(Onboarding Method: Activation Code)\"]\nB --> C[\"ユーザーがデバイスにコードを入力\"]\nC --> D{\"接続経路\"}\nD -->|\"社内\"| E[\"UCM に直接登録\"]\nD -->|\"社外 MRA\"| F[\"Expressway-E 経由で登録<br/>(MRA を許可した場合)\"]",
    "d15": "sequenceDiagram\nparticipant C as クライアント Jabber/Webex\nparticipant IdP as IdP / 認可サーバー\nparticipant U as UCM\nC->>IdP: 認証(SSO/ユーザー資格情報)\nIdP-->>C: アクセストークン + リフレッシュトークン\nC->>U: SIP REGISTER TLS ポート 5090 など + アクセストークン\nU->>U: トークン検証 署名・有効期限\nU-->>C: 200 OK 登録成功\nNote over C,U: トークン期限前にリフレッシュして継続",
    "d16": "flowchart TD\nS[\"着信呼\"] --> A{\"incoming called-number<br/>で一致?\"}\nA -->|\"Yes\"| M[\"そのダイヤルピアを使用\"]\nA -->|\"No\"| B{\"answer-address<br/>で一致?\"}\nB -->|\"Yes\"| M\nB -->|\"No\"| C{\"destination-pattern<br/>で一致?\"}\nC -->|\"Yes\"| M\nC -->|\"No\"| D[\"ダイヤルピア 0 を使用<br/>(既定の暗黙のダイヤルピア)\"]",
    "d17": "flowchart LR\nWX[\"Webex Calling<br/>クラウド\"] <-->|\"SIP TLS / SRTP<br/>登録ベーストランク\"| LGW[\"ローカルゲートウェイ<br/>CUBE\"]\nLGW <--> PSTN[\"PSTN / ITSP<br/>プレミス PSTN\"]\nLGW <--> PBX[\"既存 PBX / UCM<br/>アナログ機器\"]",
    "d18": "flowchart LR\nPh[\"電話機<br/>Line + Device\"] --> CSS[\"CSS<br/>Calling Search Space<br/>「誰が」どのパーティションを探せるか\"]\nCSS --> Part[\"Partition<br/>パーティション<br/>「番号がどこに属するか」\"]\nPart --> Pat[\"Pattern / DN<br/>ルートパターン・トランスレーションパターン・DN\"]\nPat --> RL[\"Route List\"]\nRL --> RG[\"Route Group\"]\nRG --> Dev[\"Gateway / SIP Trunk\"]",
    "d19": "flowchart TD\nS[\"ダイヤル入力\"] --> A[\"発信者の CSS に含まれる<br/>パーティション内のパターンを検索\"]\nA --> B{\"一致するパターンが<br/>複数あるか?\"}\nB -->|\"1つ\"| C[\"そのパターンを使用\"]\nB -->|\"複数\"| D[\"最長一致(最も具体的)を選択\"]\nD --> E{\"同点か?\"}\nE -->|\"Yes\"| F[\"CSS 内のパーティション順が<br/>上位のものを選択\"]\nE -->|\"No\"| C\nF --> C\nC --> G{\"さらに桁が続く可能性は?\"}\nG -->|\"あり<br/>例: 他に長いパターンがある\"| H[\"Interdigit タイマー T302<br/>既定 15 秒 待機\"]\nG -->|\"なし / 桁が確定\"| I[\"呼を確立(ルーティング実行)\"]\nH --> I",
    "d20": "flowchart TD\nA[\"外部からの不審な INVITE\"] --> B{\"CUBE trusted list<br/>に送信元 IP はあるか?\"}\nB -->|\"No\"| X[\"拒否\"]\nB -->|\"Yes\"| C{\"CSS で許可された<br/>パーティションか?\"}\nC -->|\"No\"| X\nC -->|\"Yes\"| D{\"FAC/CMC が必要か?\"}\nD -->|\"認証失敗\"| X\nD -->|\"OK\"| E[\"通話許可 + CDR 記録 + 監視\"]",
    "d21": "flowchart LR\nU[\"ユーザー入力<br/>03-1234-5678 / 内線 5678\"] --> T1[\"Translation Pattern<br/>ローカル形式 → +E.164\"]\nT1 --> Core[\"UCM 内部は<br/>+E.164 で統一\"]\nCore --> RP[\"Route Pattern<br/>+81.!  等 (+E.164)\"]\nRP --> RL[\"Route List<br/>SLRG を利用\"]\nRL --> LRG[\"Standard Local Route Group<br/>発信者の拠点の出口へ\"]\nLRG --> TR[\"Called Party Transformation<br/>+E.164 → ゲートウェイ形式\"]\nTR --> GW[\"ゲートウェイ<br/>ITSP\"]",
    "d22": "flowchart TD\nRL[\"Route List<br/>[+81.!]\"] --> SLRG[\"Standard Local Route Group\"]\nSLRG --> A{\"発信元デバイスプール\"}\nA -->|\"東京 DP\"| T[\"Local Route Group = 東京 GW\"]\nA -->|\"大阪 DP\"| O[\"Local Route Group = 大阪 GW\"]\nA -->|\"福岡 DP\"| F[\"Local Route Group = 福岡 GW\"]",
    "d23": "flowchart LR\nIN[\"ITSP から着信<br/>0312345678\"] --> I[\"トランク着信変換<br/>Incoming Called Party\"]\nI --> G[\"UCM 内部 +E.164<br/>+81312345678\"]\nG --> O[\"外線発信時<br/>Called Party Transformation\"]\nO --> OUT[\"ゲートウェイ<br/>0312345678\"]",
    "d24": "flowchart LR\nC[\"社外クライアント\"] -->|\"HTTPS 8443<br/>SIP TLS 5061<br/>XMPP 5222\"| E[\"Expressway-E<br/>DMZ\"]\nE -->|\"Traversal Zone<br/>C から E へ接続\"| X[\"Expressway-C<br/>社内\"]\nX --> U[\"UCM\"]\nX --> I[\"IM and Presence\"]\nX --> V[\"Unity Connection\"]",
    "d25": "flowchart LR\nA[\"ロケーション作成<br/>PSTN 接続・住所・内線桁数\"] --> B[\"番号を追加<br/>DID・内線\"]\nB --> C[\"ユーザー/機能に割り当て\"]\nC --> D[\"発信・着信権限を設定\"]\nD --> E[\"転送先制限を設定\"]\nE --> F[\"デバイス/アプリで検証\"]",
    "d26": "flowchart LR\nPH[\"IP Phone<br/>DSCP を正しく付与\"] --> SW[\"アクセススイッチ<br/>信頼境界\"]\nPC[\"PC<br/>信頼しない\"] --> PH\nSW -->|\"電話のマーキングを信頼<br/>PC は再マーキング / 0 にリセット\"| CORE[\"コアネットワーク<br/>QoS ポリシー適用\"]\nCORE --> WAN[\"WAN ルーター<br/>LLQ / 帯域保証\"]",
    "d27": "flowchart TD\nC[\"新規通話要求\"] --> D{\"発信・着信ロケーションの<br/>残り帯域は十分か?\"}\nD -->|\"Yes\"| OK[\"通話許可・帯域を予約\"]\nD -->|\"No\"| NG{\"AAR 設定あり?\"}\nNG -->|\"Yes\"| PSTN[\"PSTN 経由に迂回\"]\nNG -->|\"No\"| REJ[\"拒否 ビジー / リオーダー\"]",
    "d28": "flowchart LR\nA[\"1. class-map<br/>トラフィックの分類\"] --> B[\"2. policy-map<br/>クラスごとの動作を定義\"]\nB --> C[\"3. service-policy<br/>インターフェイスに適用\"]",
    "d29": "flowchart LR\nA[\"LDAP 同期 or 手動で<br/>ユーザー作成\"] --> B[\"ユーザーテンプレート適用<br/>メールボックス有効化\"]\nB --> C[\"ユーザーの<br/>内線番号 / パーティション / 検索範囲を設定\"]\nC --> D[\"UCM 連携で MWI 有効化\"]\nD --> E[\"電話でボイスメール確認\"]",
    "d30": "sequenceDiagram\nparticipant Ca as 発信者\nparticipant U as UCM\nparticipant CUC as Unity Connection\nparticipant P as 電話機\nCa->>U: 内線へ発信 不在\nU->>CUC: 転送 INVITE\nCUC-->>Ca: 応答 メッセージ録音\nCUC->>U: SIP NOTIFY MWI 点灯\nU->>P: MWI 点灯",
    "d31": "flowchart LR\nUCM[\"UCM\"] -->|\"SIP トランク<br/>Voice Mail Pilot 宛\"| CUC[\"Unity Connection<br/>Phone System / Port Group / Ports\"]\nCUC -->|\"SIP NOTIFY<br/>MWI\"| UCM",
    "d32": "flowchart TD\nIN[\"着信\"] --> R[\"呼ルーティングルール<br/>Direct / Forwarded\"]\nR --> A{\"条件に一致<br/>番号・スケジュール\"}\nA -->|\"ボイスメール転送\"| U[\"ユーザーの挨拶 → メッセージ録音\"]\nA -->|\"自動応答\"| H[\"コールハンドラ\"]\nH --> M[\"メニュー入力\"]\nM --> T[\"転送 / 別ハンドラ / ディレクトリ / 録音\"]",
    "d33": "flowchart TD\nA[\"Control Hub でユーザー/ライセンス準備<br/>SSO・ディレクトリ同期\"] --> B[\"Webex アプリのサービス検出用 DNS 設定<br/>社内 _cisco-uds / 社外 _collab-edge\"]\nB --> C[\"UCM で UC Service / Service Profile / ユーザー設定\"]\nC --> D[\"社外は MRA(Expressway)を構成\"]\nD --> E[\"クライアント配布・ログイン検証\"]",
    "d34": "sequenceDiagram\nparticipant U as ユーザー Jabber/ブラウザ\nparticipant SP as SP UCM / CUC / IM&P\nparticipant IdP as IdP AD FS / Okta\nU->>SP: 1. サービスへアクセス\nSP-->>U: 2. 未認証 → SAML AuthnRequest 付きで IdP へリダイレクト\nU->>IdP: 3. AuthnRequest を送信\nIdP->>U: 4. ログイン画面 資格情報 / MFA\nU->>IdP: 5. 認証情報を入力\nIdP-->>U: 6. SAML Response Assertion を含む を返却\nU->>SP: 7. Assertion を SP へ POST\nSP->>SP: 8. 署名検証・有効期間・Audience 確認\nSP-->>U: 9. サービス提供 セッション確立",
    "d35": "flowchart TD\nA[\"前提確認<br/>FQDN・DNS・NTP・証明書\"] --> B[\"IdP メタデータを取得\"]\nB --> C[\"SP 側(UCM 等)で<br/>IdP メタデータをインポート\"]\nC --> D[\"SP メタデータを<br/>エクスポートして IdP に登録\"]\nD --> E[\"IdP 側で SP を Relying Party として設定<br/>NameID・属性マッピング\"]\nE --> F[\"SSO テスト実行\"]\nF --> G[\"SSO を有効化\"]",
    "d36": "sequenceDiagram\nparticipant C as クライアント\nparticipant AS as 認可サーバー IdS/IdP\nparticipant RS as リソースサーバー UCM\nC->>AS: 1. 認可コード要求 ユーザー認証\nAS-->>C: 2. 認可コード\nC->>AS: 3. 認可コードでトークン要求\nAS-->>C: 4. アクセストークン + リフレッシュトークン\nC->>RS: 5. アクセストークンで API 利用\nRS-->>C: 6. 応答\nC->>AS: 7. 期限切れ前にリフレッシュトークンで更新",
    "d37": "flowchart LR\nC1[\"Jabber / Webex アプリ\"] -- \"XMPP\" --> IMP[\"IM and Presence<br/>Presence Engine / XCP Router\"]\nIMP <--> UCM[\"UCM<br/>電話状態 Presence 連携\"]\nIMP <--> DIR[\"LDAP\"]\nIMP <--> DB[\"外部 DB<br/>永続チャット / アーカイバ\"]\nIMP <--> EX[\"Exchange / Office 365<br/>カレンダー連携\"]\nIMP <--> FED[\"外部ドメイン<br/>XMPP / SIP フェデレーション\"]",
    "d38": "flowchart LR\nU[\"UCM / IM&P\"] -->|\"通知要求\"| CL[\"Cisco Cloud<br/>Push Notification Service\"]\nCL --> APNs[\"Apple APNs / Google FCM\"]\nAPNs --> Ph[\"iOS / Android デバイス\"]\nPh -->|\"アプリ起動 → 再接続\"| U",
    "d39": "flowchart LR\nU[\"社内ユーザー\"] --> IMP[\"IM&P\"]\nIMP --> EXC[\"Expressway-C\"]\nEXC --> EXE[\"Expressway-E<br/>DMZ\"]\nEXE -->|\"XMPP 5269\"| EXT[\"外部ドメイン\"]",
    "d40": "flowchart TD\nP[\"Jabber にログインできない\"] --> Q1{\"DNS SRV が解決できる?<br/>_cisco-uds / _cuplogin\"}\nQ1 -->|\"No\"| F1[\"DNS を修正\"]\nQ1 -->|\"Yes\"| Q2{\"IM&P サービス<br/>XCP / Presence Engine が起動?\"}\nQ2 -->|\"No\"| F2[\"サービス起動・障害原因を確認\"]\nQ2 -->|\"Yes\"| Q3{\"証明書 / 時刻 / SSO に問題は?\"}\nQ3 -->|\"Yes\"| F3[\"証明書更新・NTP・SSO 設定を確認\"]\nQ3 -->|\"No\"| F4[\"ユーザーライセンス・サービスプロファイル・ネットワークを確認\"]",
    "d41": "flowchart LR\nA[\"CUC サイト A\"] <-->|\"Intersite Networking<br/>HTTP(S) でディレクトリ・メッセージ同期\"| B[\"CUC サイト B\"]\nB <--> C[\"CUC サイト C\"]\nA <--> C",
    "d42": "flowchart TD\nA[\"ユーザーが user@example.com を入力\"] --> B[\"ドメイン部分 example.com を抽出\"]\nB --> C{\"社内 DNS で<br/>_cisco-uds が解決?\"}\nC -->|\"Yes 社内\"| D[\"UCM の UDS に接続<br/>ユーザーのホームクラスタ検出\"]\nC -->|\"No\"| E{\"社外 DNS で<br/>_collab-edge が解決?\"}\nE -->|\"Yes 社外\"| F[\"Expressway-E に接続<br/>MRA でサービス取得\"]\nE -->|\"No\"| G[\"サービスディスカバリ失敗<br/>手動設定 / DNS 修正\"]\nD --> H[\"Service Profile / UC Service を取得\"]\nF --> H\nH --> I[\"ログイン完了\"]",
    "d43": "flowchart TD\nP[\"Webex アプリの不具合\"] --> Q{\"どの機能か?\"}\nQ -->|\"ログイン\"| L[\"ドメイン検証・SSO・プロキシ\"]\nQ -->|\"通話が繋がらない\"| S[\"登録先・シグナリング・FW ポート\"]\nQ -->|\"音が悪い\"| M[\"ネットワーク品質・QoS・端末負荷\"]\nQ -->|\"ボイスメール\"| V[\"連携方式・サービス設定・認証\"]\nQ -->|\"近接検出\"| X[\"ルームデバイス設定・マイク権限・環境\"]",
    "d44": "sequenceDiagram\nparticipant A as 発信側\nparticipant B as 着信側 / ITSP\nA->>B: INVITE SDP\nB-->>A: 183 Session Progress SDP\nNote over A,B: 200 OK 前に RTP 開始 アナウンスや呼出音\nB-->>A: 200 OK\nA->>B: ACK",
    "d45": "sequenceDiagram\nparticipant A as A\nparticipant B as B\nA->>B: INVITE Supported 100rel\nB-->>A: 183 Require 100rel SDP\nA->>B: PRACK\nB-->>A: 200 OK PRACK\nB-->>A: 200 OK INVITE\nA->>B: ACK",
    "d46": "flowchart TD\nA[\"SIP は成功 200 OK ACK<br/>だが音が出ない / 片通話\"] --> B{\"SDP の c= IP と m= ポートは<br/>到達可能な値か?\"}\nB -->|\"プライベート IP のまま\"| N[\"NAT 問題<br/>CUBE / Expressway でアドレス書換\"]\nB -->|\"OK\"| C{\"FW で RTP 範囲は許可されているか?\"}\nC -->|\"No\"| F[\"FW ルール修正\"]\nC -->|\"Yes\"| D{\"コーデックは一致しているか?\"}\nD -->|\"No\"| T[\"トランスコーダー/リージョン修正\"]\nD -->|\"Yes\"| E{\"SRTP と RTP の不一致は?\"}\nE -->|\"Yes\"| S[\"SRTP 設定を揃える<br/>または SRTP-RTP インターワーキング\"]\nE -->|\"No\"| G[\"MTP・メディア終端・ルーティングを確認\"]",
    "d47": "flowchart LR\nsubgraph Normal[\"通常時\"]\nP1[\"拠点の IP Phone\"] --> U1[\"UCM 本社\"]\nend\nsubgraph Fallback[\"WAN 障害時\"]\nP2[\"拠点の IP Phone\"] --> S[\"拠点ルーター SRST\"]\nS --> PSTN[\"PSTN ゲートウェイ機能\"]\nend",
    "d48": "flowchart LR\nUCM[\"UCM<br/>内部 SIP\"] <-->|\"内側レッグ<br/>Inbound / Outbound<br/>ダイヤルピア\"| CUBE[\"CUBE<br/>B2BUA\"]\nCUBE <-->|\"外側レッグ<br/>ダイヤルピア\"| ITSP[\"ITSP\"]",
    "d49": "sequenceDiagram\nparticipant CB as CUBE\nparticipant P as ITSP / Webex Calling\nCB->>P: REGISTER\nP-->>CB: 401 Unauthorized チャレンジ\nCB->>P: REGISTER 認証情報付き\nP-->>CB: 200 OK 登録成功\nNote over CB,P: 以降 INVITE などが登録済み経路で流れる",
    "d50": "flowchart LR\nA[\"通話 CS<br/>UCM ⇔ CUBE ⇔ ITSP\"] --> CUBE[\"CUBE<br/>SRC: Session Recording Client\"]\nCUBE -->|\"SIPREC: 録音セッション RS<br/>メディア複製 + メタデータ\"| SRS[\"録音サーバー<br/>SRS: Session Recording Server\"]",
    "d51": "flowchart TD\nsubgraph 入口[\"入口 Ingress\"]\nA[\"電話機ローカルダイヤル<br/>内線 / 市外 / 携帯\"] --> TP[\"Translation Pattern<br/>+E.164 に統一\"]\nB[\"ITSP 着信\"] --> INC[\"トランク着信の<br/>Called / Calling 変換\"]\nend\nsubgraph 内部[\"内部 Core\"]\nTP --> ROUTE[\"Route Pattern +E.164<br/>Route List / SLRG\"]\nINC --> ROUTE\nDN[\"DN もすべて +E.164 の<br/>Directory Number 内線は Alternate/エイリアス\"]\nend\nsubgraph 出口[\"出口 Egress\"]\nROUTE --> TRF[\"Called Party Transformation Pattern<br/>ゲートウェイ形式へ変換\"]\nTRF --> GW[\"SIP Trunk / GW\"]\nend",
    "d52": "flowchart TD\nS[\"発信できない / 意図しない宛先\"] --> A[\"1. Dialed Number Analyzer で<br/>発信者・番号・CSS を指定して再現\"]\nA --> B{\"一致するパターンはあるか?\"}\nB -->|\"なし\"| C[\"CSS にパーティションが含まれているか<br/>パターンの記述ミスは無いか\"]\nB -->|\"意図しないパターン\"| D[\"最長一致・パーティション順序を確認\"]\nB -->|\"正しいパターン\"| E{\"変換後の番号は<br/>期待通りか?\"}\nE -->|\"No\"| F[\"Transformation CSS / パターンの適用条件<br/>Use External Phone Number Mask 等を確認\"]\nE -->|\"Yes\"| G{\"出口デバイスは正しいか?\"}\nG -->|\"No\"| H[\"SLRG・デバイスプールの Local Route Group を確認\"]\nG -->|\"Yes\"| I[\"SIP トランク状態・ITSP 応答・CUBE ダイヤルピアを確認\"]",
    "d53": "flowchart LR\nC1[\"クラスタ A<br/>ILS ハブ\"] <-->|\"ILS<br/>TLS または パスワード認証\"| C2[\"クラスタ B<br/>スポーク\"]\nC1 <--> C3[\"クラスタ C<br/>スポーク\"]\nC2 -.->|\"URI 通話 / +E.164 通話<br/>ILS で経路発見\"| C3",
    "d54": "flowchart LR\nC[\"着信<br/>ハントパイロット 8000\"] --> HL[\"ハントリスト\"]\nHL --> LG1[\"ラインググループ 1\"]\nHL --> LG2[\"ラインググループ 2\"]\nLG1 --> D1[\"内線 1001\"]\nLG1 --> D2[\"内線 1002\"]\nLG2 --> D3[\"内線 1003\"]",
    "d55": "flowchart TD\nA[\"着信 代表番号 8000\"] --> B{\"現在時刻の<br/>Time Schedule は?\"}\nB -->|\"営業時間内<br/>パーティション PT_Day\"| C[\"ハントグループへ\"]\nB -->|\"営業時間外<br/>パーティション PT_Night\"| D[\"ボイスメール / 時間外案内へ\"]",
    "d56": "flowchart LR\nC[\"社外の発信者\"] --> DN[\"デスクの内線<br/>1001\"]\nDN --> D[\"デスクフォン呼出\"]\nDN --> M[\"携帯電話も同時に呼出<br/>Remote Destination\"]\nM --> A{\"携帯で応答\"}\nA -->|\"応答\"| T[\"デスク側の呼出を停止<br/>携帯で通話\"]",
    "d57": "sequenceDiagram\nparticipant U as ユーザー\nparticipant P as 共有 IP Phone\nparticipant UCM as UCM EM サービス\nU->>P: EM サービスを選択 ユーザーID / PIN を入力\nP->>UCM: ログイン要求\nUCM->>UCM: デバイスプロファイルを電話に適用\nUCM-->>P: ユーザーの内線・ボタン・設定を反映\nNote over P: ログアウト時は既定のプロファイルに戻る",
    "d58": "sequenceDiagram\nparticipant A as 社内端末 10.1.1.10\nparticipant N as NAT/FW\nparticipant B as 社外相手 203.0.113.20\nA->>N: INVITE SDP c=10.1.1.10 m=audio 16384\nN->>B: INVITE 送信元 IP のみ変換 SDP はプライベート IP のまま\nB-->>N: 200 OK SDP c=203.0.113.20\nB->>A: RTP を 10.1.1.10 へ送信 → 届かない 片通話",
    "d59": "flowchart TD\nA[\"ICE 開始\"] --> B[\"候補収集<br/>Host / Server Reflexive STUN / Relayed TURN\"]\nB --> C[\"候補を SDP で相手と交換\"]\nC --> D[\"接続性チェック ペアごとに実施\"]\nD --> E{\"直接経路で成功?\"}\nE -->|\"Yes\"| F[\"直接メディア 最も低遅延\"]\nE -->|\"No\"| G[\"TURN 中継経由でメディア\"]",
    "d60": "flowchart LR\nsubgraph 外部\nEXT[\"外部相手\"]\nend\nsubgraph DMZ\nE[\"Expressway-E<br/>トラバーサルサーバー\"]\nend\nsubgraph 社内\nC[\"Expressway-C<br/>トラバーサルクライアント\"]\nU[\"UCM\"]\nend\nC -->|\"1. 社内から先に接続 アウトバウンド<br/>常時維持 Keepalive\"| E\nEXT -->|\"2. 外部から着信\"| E\nE -->|\"3. 既存のトラバーサル経路を使って中継\"| C\nC --> U",
    "d61": "flowchart TD\nA[\"通話ゾーンの SIP media encryption mode\"] --> B{\"モード\"}\nB -->|\"Auto\"| C[\"そのまま通過\"]\nB -->|\"Force encrypted\"| D[\"SRTP を強制 / 変換\"]\nB -->|\"Force unencrypted\"| E[\"RTP を強制\"]\nB -->|\"Best effort\"| F[\"SRTP を試行 → 失敗時 RTP\"]",
    "d62": "flowchart LR\nIN[\"着信呼\"] --> T1[\"Pre-search Transform<br/>エイリアス変換\"]\nT1 --> SR[\"Search Rules<br/>優先度順に評価\"]\nSR --> Z[\"Zone<br/>接続先の定義\"]\nZ --> OUT[\"宛先へ転送\"]",
    "d63": "flowchart TD\nA[\"1. システム名・DNS・NTP\"] --> B[\"2. ネットワークインターフェイス / スタティック NAT\"]\nB --> C[\"3. 証明書<br/>CSR 作成 → CA 署名 → インストール → 信頼 CA 登録\"]\nC --> D[\"4. QoS DSCP\"]\nD --> E[\"5. クラスタ構成(必要な場合)\"]\nE --> F[\"6. FW ルール(外部 FW / Expressway 内蔵)\"]\nF --> G[\"7. ゾーン・トランスフォーム・検索ルール\"]",
    "d64": "flowchart LR\nEXT[\"取引先の端末 / システム\"] -->|\"1. DNS SRV で Expressway-E を発見<br/>_sips._tcp.example.com\"| E[\"Expressway-E\"]\nE -->|\"2. トラバーサル\"| C[\"Expressway-C\"]\nC -->|\"3. UCM のネイバーゾーン / SIP トランク\"| U[\"UCM\"]\nU --> EP[\"社内端末\"]",
    "d65": "flowchart LR\nCL[\"社外クライアント<br/>Jabber / Webex アプリ / 対応 IP Phone\"] --> DNS1[\"社外 DNS<br/>_collab-edge._tls\"]\nCL -->|\"HTTPS 8443<br/>XMPP 5222<br/>SIP TLS 5061<br/>メディア UDP\"| E[\"Expressway-E<br/>DMZ\"]\nE <-->|\"UC Traversal Zone<br/>C から E へ SIP TLS 7001\"| C[\"Expressway-C\"]\nC --> UCM[\"UCM<br/>SIP / UDS / CTI\"]\nC --> IMP[\"IM and Presence<br/>XMPP\"]\nC --> CUC[\"Unity Connection<br/>REST\"]\nC -.-> DNS2[\"社内 DNS<br/>_cisco-uds / _cuplogin\"]",
    "d66": "flowchart TD\nA[\"1. DNS レコード<br/>社内: _cisco-uds など / 社外: _collab-edge\"] --> B[\"2. 証明書<br/>UCM・IM&P・CUC・Expressway-C/E\"]\nB --> C[\"3. Expressway-C/E 間の<br/>Unified Communications Traversal Zone\"]\nC --> D[\"4. Expressway-C に UC サーバー<br/>UCM / IM&P / CUC を検出・登録\"]\nD --> E[\"5. Expressway で MRA を有効化<br/>Configuration → Unified Communications\"]\nE --> F[\"6. HTTP 許可リスト\"]\nF --> G[\"7. UCM で SIP トランク セキュリティ プロファイル\"]\nG --> H[\"8. クライアントで動作検証\"]",
    "d67": "flowchart TD\nP[\"社外からログインできない\"] --> A{\"社外 DNS で _collab-edge が引けるか?\"}\nA -->|\"No\"| A1[\"DNS を修正 SRV 優先度・ポート\"]\nA -->|\"Yes\"| B{\"Expressway-E の 8443 に TLS 接続できるか?\"}\nB -->|\"No\"| B1[\"FW/NAT/サービス停止\"]\nB -->|\"Yes\"| C{\"証明書は公開 CA 署名 SAN 一致か?\"}\nC -->|\"No\"| C1[\"証明書を修正 SAN・EKU・チェーン\"]\nC -->|\"Yes\"| D{\"トラバーサルゾーンは Active か?\"}\nD -->|\"No\"| D1[\"C→E の認証・ポート・時刻\"]\nD -->|\"Yes\"| E{\"UC サーバー検出・HTTP 許可リストは正しいか?\"}\nE -->|\"No\"| E1[\"Discover 再実行・許可リスト追加\"]\nE -->|\"Yes\"| F[\"UCM 側 SIP トランク セキュリティ プロファイル・ユーザー権限・SSO を確認\"]",
    "d68": "flowchart TD\nsubgraph 拠点A[\"社内 拠点 A\"]\nA1[\"参加者 A1\"] --> VMA[\"Video Mesh ノード A\"]\nA2[\"参加者 A2\"] --> VMA\nend\nsubgraph 拠点B[\"社内 拠点 B\"]\nB1[\"参加者 B1\"] --> VMB[\"Video Mesh ノード B\"]\nend\nVMA <-->|\"カスケード<br/>ノード間 / クラスタ間\"| CLOUD[\"Webex クラウド<br/>メディア・シグナリング\"]\nVMB <-->|\"カスケード\"| CLOUD\nR[\"リモート参加者\"] --> CLOUD",
    "d69": "flowchart LR\nsubgraph OnPrem[\"オンプレミス\"]\nCON[\"コネクタ<br/>Expressway 上 Calendar / Message<br/>Directory Connector / Video Mesh ノード\"]\nSRC[\"Exchange / UCM / IM&P / AD\"]\nend\nCON <-->|\"HTTPS 外向きのみ<br/>クラウドが管理\"| CH[\"Webex クラウド / Control Hub\"]\nSRC <--> CON",
    "d70": "flowchart TB\nsubgraph Client[\"クライアント\"]\nAPP[\"Webex アプリ\"]\nDEV[\"Webex デバイス\"]\nend\nsubgraph Cloud[\"Webex クラウド\"]\nSVC[\"Meetings / Messaging / Calling\"]\nCH[\"Control Hub\"]\nIDB[\"Identity\"]\nend\nsubgraph Hybrid[\"ハイブリッド(任意)\"]\nH[\"コネクタ / Video Mesh / Local Gateway\"]\nend\nAPP --> SVC\nDEV --> SVC\nCH --> SVC\nCH --> IDB\nH <--> SVC",
    "d71": "flowchart LR\nAD[\"Active Directory<br/>ユーザーの正\"] --> DC[\"Cisco Directory Connector\"]\nDC -->|\"HTTPS 一方向同期\"| CH[\"Control Hub\"]\nCH --> LIC[\"ライセンス自動割り当て<br/>テンプレート\"]",
    "d72": "flowchart TD\nQ[\"Webex Calling の PSTN をどうするか\"] --> A{\"既存の回線・機器を<br/>維持したいか?\"}\nA -->|\"Yes\"| L[\"Premises-based PSTN<br/>Local Gateway CUBE\"]\nA -->|\"No\"| B{\"Cisco が対応する国か?\"}\nB -->|\"Yes\"| C[\"Cisco Calling Plan\"]\nB -->|\"No / 既存キャリア利用\"| D[\"Cloud Connected PSTN\"]",
    "d73": "flowchart LR\nA[\"作業ディレクトリ\"] -->|\"git add\"| B[\"ステージング\"]\nB -->|\"git commit\"| C[\"ローカルリポジトリ\"]\nC -->|\"git push\"| D[\"リモートリポジトリ\"]\nD -->|\"git pull / clone\"| A",
    "d74": "flowchart TD\nA[\"API リクエスト\"] --> B{\"応答コード\"}\nB -->|\"2xx\"| OK[\"成功 → 処理継続\"]\nB -->|\"429\"| W[\"Retry-After 秒待機 → 再試行\"]\nB -->|\"5xx\"| R[\"指数バックオフで再試行 上限あり\"]\nB -->|\"4xx 429 以外\"| E[\"要求内容・認証・権限を修正 再試行しない\"]",
    "d75": "sequenceDiagram\nparticipant S as Python スクリプト\nparticipant U as UCM AXL 8443\nS->>U: SOAP リクエスト HTTPS Basic 認証 例 addPhone\nU->>U: 権限確認 / データベース更新\nU-->>S: SOAP レスポンス UUID または エラー Fault",
    "d76": "flowchart TD\nA[\"CSV / 人事システム / チケット\"] --> B[\"Python が読み込み\"]\nB --> C[\"AXL: addLine 内線\"]\nC --> D[\"AXL: addPhone 電話機 + 回線割当\"]\nD --> E[\"AXL: addUser / updateUser<br/>電話機をユーザーに関連付け\"]\nE --> F[\"結果ログ・失敗時のロールバック\"]",
    "d77": "flowchart LR\nAPP[\"CTI アプリ<br/>受付・CRM 連携・コンタクトセンター\"] -->|\"JTAPI / TAPI\"| CTI[\"UCM CTI Manager\"]\nCTI --> PH[\"電話機・回線・ルートポイント\"]\nAPP -.->|\"通話イベントを受信<br/>発信・応答・転送などを制御\"| CTI",
    "d78": "sequenceDiagram\nparticipant P as IP Phone\nparticipant S as 自作サービス Web サーバー\nP->>S: HTTP GET サービス URL\nS-->>P: CiscoIPPhoneMenu XML\nNote over P: 電話の画面にメニューを表示\nP->>S: 選択に応じて HTTP リクエスト\nS-->>P: CiscoIPPhoneText XML など",
    "d79": "sequenceDiagram\nparticipant U as ユーザー\nparticipant App as あなたのアプリ\nparticipant W as Webex 認可サーバー\nU->>App: 利用開始\nApp->>W: 認可リクエスト client_id / scope / redirect_uri\nW->>U: ログインと同意画面\nU->>W: 承認\nW-->>App: 認可コード redirect\nApp->>W: 認可コード＋client_secret でトークン要求\nW-->>App: アクセストークン＋リフレッシュトークン\nApp->>W: Bearer トークンで API 呼び出し",
    "d80": "sequenceDiagram\nparticipant U as ユーザー\nparticipant W as Webex クラウド\nparticipant B as ボット Web サーバー\nU->>W: ボットにメッセージ送信 or ボタン操作\nW->>B: Webhook messages/created or attachmentActions/created\nB->>W: GET /messages/id で本文取得\nB->>W: POST /messages 返信 Adaptive Card 含む\nW-->>U: ボットの返信を表示",
    "d81": "flowchart LR\nS[\"自動化スクリプト\"] -->|\"ローカル: SSH / HTTP / WebSocket xAPI\"| D[\"ルームデバイス\"]\nS -->|\"クラウド: Devices API / Devices Configuration API / Workspaces API\"| WX[\"Webex クラウド\"]\nWX --> D",
    "d82": "sequenceDiagram\nparticipant S as Python スクリプト xAPI SDK\nparticipant D as ルームデバイス\nS->>D: WebSocket 接続 認証\nS->>D: 購読 Event/UserInterface/Extensions/Panel/Clicked\nD-->>S: イベント通知 押されたパネル ID\nS->>D: xCommand 実行 例 照明制御用マクロ呼び出し",
    "d83": "flowchart TD\nA[\"出題範囲 Exam Topics を確認\"] --> B[\"章ごとに 4 ステップで学習\"]\nB --> C[\"ラボまたは検証環境で設定を再現\"]\nC --> D[\"章末チェックで自己採点\"]\nD --> E{\"弱点は残っているか\"}\nE -->|\"Yes\"| B\nE -->|\"No\"| F[\"模擬試験と時間配分の練習\"]\nF --> G[\"受験\"]"
};
