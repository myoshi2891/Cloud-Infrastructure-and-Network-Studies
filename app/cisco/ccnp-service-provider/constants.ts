export interface NavItem {
    id: string;
    label: string;
    isChapter?: boolean;
    isSub?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
    {
        "id": "s1",
        "label": "1. このガイドの使い方",
        "isChapter": true,
        "isSub": false
    },
    {
        "id": "s2",
        "label": "1.1 各トピックの共通フォーマット",
        "isChapter": false,
        "isSub": false
    },
    {
        "id": "s3",
        "label": "1.2 表記について",
        "isChapter": false,
        "isSub": false
    },
    {
        "id": "s4",
        "label": "1.3 重要な注意（試験内容の変動）",
        "isChapter": false,
        "isSub": false
    },
    {
        "id": "s5",
        "label": "2. 認定の全体像",
        "isChapter": true,
        "isSub": false
    },
    {
        "id": "s6",
        "label": "2.1 取得要件",
        "isChapter": false,
        "isSub": false
    },
    {
        "id": "s7",
        "label": "2.2 試験一覧",
        "isChapter": false,
        "isSub": false
    },
    {
        "id": "s8",
        "label": "2.3 その他の重要事項（Cisco 公式ページより）",
        "isChapter": false,
        "isSub": false
    },
    {
        "id": "s9",
        "label": "2.4 コンセントレーション試験の選び方",
        "isChapter": false,
        "isSub": false
    },
    {
        "id": "s10",
        "label": "3. 前提知識：SP ネットワークの基本用語",
        "isChapter": true,
        "isSub": false
    },
    {
        "id": "s11",
        "label": "3.1 SP ネットワークの典型構成",
        "isChapter": false,
        "isSub": false
    },
    {
        "id": "s12",
        "label": "3.2 用語集（最低限これだけは）",
        "isChapter": false,
        "isSub": false
    },
    {
        "id": "s13",
        "label": "3.3 SP ネットワークの「3 つの層」で考える",
        "isChapter": false,
        "isSub": false
    },
    {
        "id": "s14",
        "label": "4. 学習ロードマップ",
        "isChapter": true,
        "isSub": false
    },
    {
        "id": "s15",
        "label": "4.1 推奨学習順序",
        "isChapter": false,
        "isSub": false
    },
    {
        "id": "s16",
        "label": "4.2 コア試験の出題配分（350-501 SPCOR v1.1）",
        "isChapter": false,
        "isSub": false
    },
    {
        "id": "s17",
        "label": "4.3 コンセントレーション試験の出題配分",
        "isChapter": false,
        "isSub": false
    },
    {
        "id": "s18",
        "label": "4.4 ラボ環境の選び方",
        "isChapter": false,
        "isSub": false
    },
    {
        "id": "s19",
        "label": "5. Part A：コア試験 350-501 SPCOR",
        "isChapter": true,
        "isSub": false
    },
    {
        "id": "s20",
        "label": "5.1 アーキテクチャ（15%）",
        "isChapter": false,
        "isSub": false
    },
    {
        "id": "s21",
        "label": "5.1.1 サービスプロバイダー アーキテクチャの説明（出題範囲 1.1）",
        "isChapter": false,
        "isSub": true
    },
    {
        "id": "s22",
        "label": "5.1.2 シスコのネットワークソフトウェア アーキテクチャ（出題範囲 1.2）",
        "isChapter": false,
        "isSub": true
    },
    {
        "id": "s23",
        "label": "5.1.3 サービスプロバイダー仮想化（出題範囲 1.3）",
        "isChapter": false,
        "isSub": true
    },
    {
        "id": "s24",
        "label": "5.1.4 QoS アーキテクチャ（出題範囲 1.4）",
        "isChapter": false,
        "isSub": true
    },
    {
        "id": "s25",
        "label": "5.1.5 コントロールプレーンのセキュリティ（出題範囲 1.5）",
        "isChapter": false,
        "isSub": true
    },
    {
        "id": "s26",
        "label": "5.1.6 管理プレーンのセキュリティ（出題範囲 1.6）",
        "isChapter": false,
        "isSub": true
    },
    {
        "id": "s27",
        "label": "5.1.7 データプレーンのセキュリティ（出題範囲 1.7）",
        "isChapter": false,
        "isSub": true
    }
];

export const DIAGRAMS: Record<string, string> = {
    "d1": "flowchart TD\nSTART[\"CCNP Service Provider を目指す\"] --> CORE[\"必須: コア試験 350-501 SPCOR (120分)\"]\nCORE --> CHOOSE{\"コンセントレーション試験を1つ選択\"}\nCHOOSE -->|\"ルーティングを深めたい\"| SPRI[\"300-510 SPRI (90分) 高度なルーティング\"]\nCHOOSE -->|\"VPNサービスを深めたい\"| SPVI[\"300-515 SPVI (90分) VPNサービス\"]\nCHOOSE -->|\"クラウド基盤を深めたい\"| SPCNI[\"300-540 SPCNI (90分) クラウドネットワーク基盤\"]\nSPRI --> CCNP[\"CCNP Service Provider 取得 (有効期間 3年)\"]\nSPVI --> CCNP\nSPCNI --> CCNP\nCORE -.->|\"コア試験のみでも取得可\"| SPEC[\"Cisco Certified Specialist - Service Provider Core\"]\nCORE -.->|\"CCIE SP の筆記試験も兼ねる\"| CCIE[\"CCIE Service Provider 筆記\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclass CHOOSE hub\nclass CCNP done",
    "d2": "flowchart LR\nsubgraph CUST1[\"顧客サイトA\"]\nCE1[\"CE1 (顧客ルーター)\"]\nend\nsubgraph SPNET[\"サービスプロバイダー網 (AS 65000)\"]\nPE1[\"PE1 (Provider Edge)\"]\nP1[\"P1 (Provider Core)\"]\nP2[\"P2 (Provider Core)\"]\nPE2[\"PE2 (Provider Edge)\"]\nRR[\"RR (Route Reflector)\"]\nend\nsubgraph CUST2[\"顧客サイトB\"]\nCE2[\"CE2 (顧客ルーター)\"]\nend\nCE1 -->|\"PE-CE リンク\"| PE1\nPE1 --> P1\nP1 --> P2\nP2 --> PE2\nPE1 --> P2\nP1 --> PE2\nPE2 -->|\"PE-CE リンク\"| CE2\nRR -.->|\"iBGP セッション\"| PE1\nRR -.->|\"iBGP セッション\"| PE2\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26",
    "d3": "flowchart TD\nS0[\"Step 0: TCP/IP・OSPF・BGP の基礎確認\"] --> S1[\"Step 1: IS-IS / OSPF / BGP を SP 目線で深掘り (出題範囲 2.0)\"]\nS1 --> S2[\"Step 2: MPLS・LDP・RSVP-TE の基礎 (出題範囲 3.0)\"]\nS2 --> S3[\"Step 3: Segment Routing / TI-LFA / SR-TE (出題範囲 3.0)\"]\nS3 --> S4[\"Step 4: L3VPN → L2VPN → EVPN (出題範囲 4.0)\"]\nS4 --> S5[\"Step 5: QoS・セキュリティ・アーキテクチャ (5.1)\"]\nS5 --> S6[\"Step 6: 自動化・テレメトリ (出題範囲 5.0)\"]\nS6 --> EXAM1[\"350-501 SPCOR 受験\"]\nEXAM1 --> S7{\"コンセントレーションを選択\"}\nS7 --> P1[\"SPRI\"]\nS7 --> P2[\"SPVI\"]\nS7 --> P3[\"SPCNI\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclass S7 hub\nclass EXAM1 done",
    "d4": "flowchart LR\nA[\"Metro Ethernet L2中心\"] --> B[\"MPLS (LDP) ラベル転送\"]\nB --> C[\"MPLS-TE (RSVP-TE) 帯域・FRR\"]\nB --> D[\"Segment Routing (SR-MPLS) LDP/RSVP-TE 不要\"]\nC --> D\nD --> E[\"SR-TE SRポリシー\"]\nD --> F[\"SRv6 IPv6 SID\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26",
    "d5": "flowchart LR\nRU[\"RU (無線装置)\"] -->|\"フロントホール\"| DU[\"DU (分散ユニット)\"]\nDU -->|\"ミッドホール\"| CU[\"CU (集約ユニット)\"]\nCU -->|\"バックホール\"| CORE[\"5G コア (5GC)\"]\nSYNC[\"同期源 (GNSS / PTP GM)\"] -.->|\"位相・周波数同期\"| RU\nSYNC -.-> DU\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26",
    "d6": "flowchart LR\nA[\"設定変更 (ターゲット設定)\"] --> B[\"show configuration 差分確認\"]\nB --> C{\"commit\"}\nC -->|\"成功\"| D[\"実行中設定へ反映\"]\nC -->|\"失敗\"| E[\"エラー修正して再度 commit\"]\nD --> F[\"rollback configuration last 1 で戻せる\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclass C hub",
    "d7": "flowchart TD\nsubgraph MANO[\"NFV MANO (管理・オーケストレーション)\"]\nNFVO[\"NFVO (オーケストレーター)\"]\nVNFM[\"VNFM (VNF管理)\"]\nVIM[\"VIM (仮想基盤管理)\"]\nend\nsubgraph NFVI[\"NFVI (NFV インフラ)\"]\nHW[\"物理サーバー・ネットワーク\"]\nHV[\"ハイパーバイザー/コンテナ基盤\"]\nend\nVNF1[\"VNF (仮想ルーター等)\"]\nVNF2[\"VNF (仮想FW等)\"]\nNFVO --> VNFM\nNFVO --> VIM\nVNFM --> VNF1\nVNFM --> VNF2\nVIM --> HV\nHV --> HW\nVNF1 --> HV\nVNF2 --> HV\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26",
    "d8": "flowchart LR\nIN[\"入口PE DSCP → TC へマッピング\"] --> CORE[\"コア TC で PHB を決定\"]\nCORE --> EG{\"出口PEの動作モデル\"}\nEG -->|\"Uniform\"| U[\"TC を DSCP に書き戻し TC で送信制御\"]\nEG -->|\"Pipe\"| P[\"DSCP は不変 TC で送信制御\"]\nEG -->|\"Short Pipe\"| SP[\"DSCP は不変 DSCP で送信制御\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclass EG hub",
    "d9": "flowchart TD\nPKT[\"顧客からのパケット受信 (PE AC 入口)\"] --> Q1{\"契約に QoS クラスが含まれる?\"}\nQ1 -->|\"はい\"| Q2{\"顧客マーキングを信頼する?\"}\nQ1 -->|\"いいえ\"| BE[\"全て Best Effort に再マーキング\"]\nQ2 -->|\"信頼する (マネージド)\"| TRUST[\"DSCP をそのまま採用してマッピング\"]\nQ2 -->|\"信頼しない (一般)\"| CLS[\"入口で分類し直して再マーキング + ポリサー\"]\nTRUST --> POL[\"契約帯域でポリシング\"]\nCLS --> POL\nBE --> POL\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclass Q1 hub\nclass Q2 hub",
    "d10": "flowchart LR\nDET[\"検知システム (DDoS 検知器)\"] -->|\"規則生成\"| CTRL[\"Flowspec コントローラー/RR\"]\nCTRL -->|\"BGP Flowspec\"| PE1[\"PE1 (フィルタ適用)\"]\nCTRL -->|\"BGP Flowspec\"| PE2[\"PE2 (フィルタ適用)\"]\nATK[\"攻撃トラフィック\"] --> PE1\nPE1 -->|\"規則にマッチ → 破棄/レート制限\"| DROP[\"攻撃トラフィック遮断\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26",
    "d11": "flowchart TD\nA[\"DDoS 検知 (NetFlow/テレメトリ)\"] --> B{\"攻撃の種類は?\"}\nB -->|\"特定の宛先を狙う\"| C[\"Flowspec でフィルタ配布\"]\nB -->|\"帯域が枯渇\"| D[\"RTBH または スクラビングへ迂回\"]\nB -->|\"送信元詐称\"| E[\"uRPF / BCP38 の適用確認\"]\nC --> F[\"効果確認 (カウンター)\"]\nD --> F\nE --> F\nF --> G[\"収束後に規則を撤去して事後レビュー\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclass B hub",
    "d12": "flowchart LR\nOP[\"運用者/自動化\"] -->|\"攻撃対象 /32 を BGP で広告 (ブラックホール community)\"| TRG[\"トリガールーター\"]\nTRG -->|\"iBGP\"| ALLPE[\"全 PE/エッジ\"]\nALLPE --> NULL[\"ネクストホップ 192.0.2.1 → Null0 (破棄)\"]\nATK[\"攻撃トラフィック\"] --> ALLPE\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26"
};
