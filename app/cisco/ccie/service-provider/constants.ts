// app/cisco/ccie/service-provider/constants.ts

export interface NavItem {
  href: string;
  title: string;
}

export interface NavGroup {
  href: string | null;
  title: string;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    "href": "#toc",
    "title": "目次",
    "items": []
  },
  {
    "href": "#s1",
    "title": "1. CCIE Service Provider 認定の全体像",
    "items": [
      {
        "href": "#s1-1",
        "title": "1.1 認定を取得するまでの流れ"
      },
      {
        "href": "#s1-2",
        "title": "1.2 押さえておくべき公式情報"
      },
      {
        "href": "#s1-3",
        "title": "1.3 ラボ試験の出題配分"
      }
    ]
  },
  {
    "href": "#s2",
    "title": "2. 出題範囲マップ（SPCOR と Lab の対応）",
    "items": [
      {
        "href": "#s2-1",
        "title": "2.1 SPCOR 350-501 v1.1 のドメイン配分"
      },
      {
        "href": "#s2-2",
        "title": "2.2 Lab v5.1 と SPCOR の主な対応表"
      }
    ]
  },
  {
    "href": "#s3",
    "title": "3. SP ネットワークの全体像と基本用語",
    "items": [
      {
        "href": "#s3-1",
        "title": "3.1 SP ネットワークは何が違うのか（ステップ 1）"
      },
      {
        "href": "#s3-2",
        "title": "3.2 標準的な SP アーキテクチャ（ステップ 2）"
      },
      {
        "href": "#s3-3",
        "title": "3.3 学習の 3 つの層（ステップ 3）"
      },
      {
        "href": "#s3-4",
        "title": "3.4 OS の違い（SPCOR 1.2）"
      }
    ]
  },
  {
    "href": "#s4",
    "title": "4. Core Routing（25%）",
    "items": [
      {
        "href": "#s4-1",
        "title": "4.1 IGP（Interior Gateway Protocol）"
      },
      {
        "href": "#s4-2",
        "title": "4.2 BGP（Border Gateway Protocol）（Lab 1.2 / SPCOR\n                                        2.3・2.4）"
      },
      {
        "href": "#s4-3",
        "title": "4.3 Multicast（Lab 1.3 / SPCOR 4.4）"
      },
      {
        "href": "#s4-4",
        "title": "4.4 MPLS と LDP（Lab 1.4 / SPCOR 3.1）"
      },
      {
        "href": "#s4-5",
        "title": "4.5 MPLS Traffic Engineering（Lab 1.5 / SPCOR 3.2）"
      },
      {
        "href": "#s4-6",
        "title": "4.6 Segment Routing（SR）（Lab 1.6 / SPCOR 3.3）"
      }
    ]
  },
  {
    "href": "#s5",
    "title": "5. Architectures and Services（25%）",
    "items": [
      {
        "href": "#s5-1",
        "title": "5.1 モバイルインフラのアーキテクチャ（Lab 2.1 / SPCOR\n                                        1.1.c）"
      },
      {
        "href": "#s5-2",
        "title": "5.2 光アーキテクチャ: Routed Optical Networking（Lab 2.2 /\n                                        SPCOR 1.1.d）"
      },
      {
        "href": "#s5-3",
        "title": "5.3 大規模 MPLS アーキテクチャ（Lab 2.3 / SPCOR 1.1.a）"
      },
      {
        "href": "#s5-4",
        "title": "5.4 Carrier Ethernet（Lab 2.4 / SPCOR 4.2）"
      },
      {
        "href": "#s5-5",
        "title": "5.5 L3VPN（Lab 2.5 / SPCOR 4.3）"
      },
      {
        "href": "#s5-6",
        "title": "5.6 インターネットサービス（Lab 2.6 / SPCOR 2.7）"
      },
      {
        "href": "#s5-7",
        "title": "5.7 マルチキャスト VPN（mVPN）（Lab 2.7 / SPCOR 4.1.d）"
      },
      {
        "href": "#s5-8",
        "title": "5.8 QoS（Lab 2.8 / SPCOR 1.4・4.5）"
      }
    ]
  },
  {
    "href": "#s6",
    "title": "6. Access Connectivity（10%）",
    "items": [
      {
        "href": "#s6-1",
        "title": "6.1 BNG（Broadband Network Gateway）（Lab 3.1）"
      },
      {
        "href": "#s6-2",
        "title": "6.2 Layer 2 接続（Lab 3.2 / SPCOR 4.2.b）"
      }
    ]
  },
  {
    "href": "#s7",
    "title": "7. High Availability and Fast Convergence（10%）",
    "items": [
      {
        "href": "#s7-1",
        "title": "7.1 高可用性（Lab 4.1 / SPCOR 2.8.a・2.8.b）"
      },
      {
        "href": "#s7-2",
        "title": "7.2 ルーティング / 高速収束（Lab 4.2 / SPCOR\n                                        2.8.c・3.2.c・3.3.d）"
      }
    ]
  },
  {
    "href": "#s8",
    "title": "8. Security（10%）",
    "items": [
      {
        "href": "#s8-1",
        "title": "8.1 コントロールプレーンのセキュリティ（Lab 5.1 / SPCOR\n                                        1.5）"
      },
      {
        "href": "#s8-2",
        "title": "8.2 管理プレーンのセキュリティ（Lab 5.2 / SPCOR 1.6）"
      },
      {
        "href": "#s8-3",
        "title": "8.3\n                                        インフラストラクチャ（データプレーン）のセキュリティ（Lab\n                                        5.3 / SPCOR 1.7）"
      }
    ]
  },
  {
    "href": "#s9",
    "title": "9. Assurance and Automation（20%）",
    "items": [
      {
        "href": "#s9-1",
        "title": "9.1 ネットワークアシュアランス（Lab 6.1 / SPCOR\n                                        5.8・5.10）"
      },
      {
        "href": "#s9-2",
        "title": "9.2 ネットワーク自動化（Lab 6.2 / SPCOR 5.1〜5.7・5.9）"
      }
    ]
  },
  {
    "href": "#s10",
    "title": "10. SPCOR 固有トピックの補足",
    "items": [
      {
        "href": "#s10-1",
        "title": "10.1 トランスポート技術（SPCOR 1.1.b）"
      },
      {
        "href": "#s10-2",
        "title": "10.2 コアアーキテクチャの用語（SPCOR 1.1.a）"
      },
      {
        "href": "#s10-3",
        "title": "10.3 モビリティ: パケットコア（SPCOR 1.1.c）"
      },
      {
        "href": "#s10-4",
        "title": "10.4 仮想化（SPCOR 1.3）"
      },
      {
        "href": "#s10-5",
        "title": "10.5 SPCOR 固有のセキュリティ用語（SPCOR 1.6.a・1.6.d）"
      },
      {
        "href": "#s10-6",
        "title": "10.6 IPv6 移行（SPCOR 2.7）"
      }
    ]
  },
  {
    "href": "#s11",
    "title": "11. Lab 試験の攻略法とトラブルシュート手順",
    "items": [
      {
        "href": "#s11-1",
        "title": "11.1 ラボ試験の特徴"
      },
      {
        "href": "#s11-2",
        "title": "11.2 時間管理の考え方"
      },
      {
        "href": "#s11-3",
        "title": "11.3 トラブルシュートの基本手順"
      },
      {
        "href": "#s11-4",
        "title": "11.4 症状別チェックリスト"
      },
      {
        "href": "#s11-5",
        "title": "11.5 IOS XR 便利コマンド集"
      },
      {
        "href": "#s11-6",
        "title": "11.6 学習を定着させるための実践方法"
      }
    ]
  },
  {
    "href": "#s12",
    "title": "12. 学習計画（例）",
    "items": []
  },
  {
    "href": "#s13",
    "title": "13. 参考ソース（URL）",
    "items": [
      {
        "href": "#s13-1",
        "title": "13.1 今回の作成で実際に内容を確認した公式ソース"
      },
      {
        "href": "#s13-2",
        "title": "13.2 技術根拠となる標準・公式ドキュメント（参考）"
      },
      {
        "href": "#s13-3",
        "title": "13.3 本ガイドの記述に関する留意点"
      }
    ]
  },
  {
    "href": "#s14",
    "title": "14. 用語集",
    "items": []
  }
];

export const DIAGRAMS: Record<string, string> = {
  "0": "flowchart LR\nA[\"学習開始<br/>SP の基礎\"] --> B[\"SPCOR 350-501<br/>クオリファイ試験 120 分\"]\nB -->|合格| C[\"Cisco Certified Specialist<br/>Service Provider Core\"]\nB -->|合格| D[\"CCNP Service Provider<br/>コンセントレーション試験と組み合わせ\"]\nB -->|合格| E[\"CCIE SP ラボ試験<br/>8 時間\"]\nE -->|合格| F[\"CCIE Service Provider 取得<br/>有効期間 3 年\"]\nE -->|不合格| G[\"弱点分析 → 再学習 → 再受験\"]\nG --> E\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclassDef default fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclass A,B,C,D,E,F,G box",
  "1": "pie showData title CCIE SP ラボ v5.1 出題配分(%)\n\"Core Routing\" : 25\n\"Architectures and Services\" : 25\n\"Assurance and Automation\" : 20\n\"Access Connectivity\" : 10\n\"High Availability and Fast Convergence\" : 10\n\"Security\" : 10",
  "2": "flowchart LR\nsubgraph CUST[\"顧客サイト\"]\nCE1[\"CE1\"]\nCE2[\"CE2\"]\nend\nsubgraph SPNET[\"SP コアネットワーク(AS 65000)\"]\nPE1[\"PE1<br/>Provider Edge\"]\nP1[\"P1<br/>Provider Core\"]\nP2[\"P2<br/>Provider Core\"]\nPE2[\"PE2<br/>Provider Edge\"]\nRR[\"RR<br/>Route Reflector\"]\nPCE[\"SR-PCE / PCE<br/>経路計算\"]\nend\nCE1 --- PE1\nPE1 --- P1\nPE1 --- P2\nP1 --- P2\nP1 --- PE2\nP2 --- PE2\nPE2 --- CE2\nRR -.->|\"MP-BGP\"| PE1\nRR -.->|\"MP-BGP\"| PE2\nPCE -.->|\"PCEP / BGP-LS\"| PE1\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclassDef default fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclass CE1,CE2,PE1,P1,P2,PE2,RR,PCE box",
  "3": "flowchart TB\nS[\"サービス層<br/>L3VPN / EVPN / VPWS / mVPN / Internet\"]\nT[\"トランスポート層<br/>MPLS LDP / RSVP-TE / Segment Routing / SRv6\"]\nU[\"アンダーレイ層<br/>IS-IS / OSPF / BGP / BFD / QoS\"]\nO[\"運用層<br/>自動化 / テレメトリ / セキュリティ / HA\"]\nS --> T --> U\nO -.->|\"全層を横断\"| S\nO -.-> T\nO -.-> U\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclassDef default fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclass S,T,U,O box",
  "4": "flowchart LR\nA[\"Hello 送信<br/>IIH\"] --> B{\"条件一致?<br/>Level / MTU / 認証 / エリア\"}\nB -->|Yes| C[\"Up 状態\"]\nB -->|No| X[\"隣接不成立\"]\nC --> D[\"LSP 交換<br/>CSNP / PSNP\"]\nD --> E[\"LSDB 同期完了\"]\nE --> F[\"SPF 計算\"]\nF --> G[\"RIB / FIB 更新\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclassDef default fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclass A,C,X,D,E,F,G box\nclass B hub",
  "5": "flowchart LR\nD[\"Down\"] --> I[\"Init\"]\nI --> T[\"2-Way\"]\nT --> S[\"ExStart\"]\nS --> E[\"Exchange\"]\nE --> L[\"Loading\"]\nL --> F[\"Full\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclassDef default fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclass D,I,T,S,E,L,F box",
  "6": "flowchart TB\nA[\"IGP 収束の 4 要素\"] --> B[\"1. 障害検知<br/>BFD / Carrier-delay\"]\nA --> C[\"2. 伝搬<br/>LSP-gen / LSA throttle\"]\nA --> D[\"3. 計算<br/>SPF throttle / iSPF\"]\nA --> E[\"4. 反映<br/>RIB / FIB 更新\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclassDef default fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclass A,B,C,D,E box",
  "7": "flowchart TB\nS[\"同一プレフィックスの複数パス\"] --> A[\"1. Weight が高い<br/>Cisco 独自・ローカル\"]\nA --> B[\"2. Local Preference が高い\"]\nB --> C[\"3. 自ルーターが生成した経路を優先<br/>network / aggregate\"]\nC --> D[\"4. AS_PATH が短い\"]\nD --> E[\"5. Origin は IGP、EGP、Incomplete の順に優先\"]\nE --> F[\"6. MED が低い<br/>同一隣接 AS からの経路が対象\"]\nF --> G[\"7. eBGP を iBGP より優先\"]\nG --> H[\"8. next-hop への IGP メトリックが低い\"]\nH --> I[\"9. Router-ID / Cluster-list 長 / 送信元アドレスが小さい\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclassDef default fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclass S,A,B,C,D,E,F,G,H,I box",
  "8": "flowchart LR\nA[\"従来: 障害発生\"] --> B[\"数十万プレフィックスを<br/>1 つずつ再計算・FIB 書換え\"]\nC[\"BGP PIC: 障害発生\"] --> D[\"共有ポインタ<br/>next-hop を 1 か所切替\"]\nB --> E[\"秒単位の収束\"]\nD --> F[\"数十〜百数十 ms の収束\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclassDef default fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclass A,B,C,D,E,F box",
  "9": "flowchart LR\nS[\"送信元\"] --> FHR[\"FHR<br/>First Hop Router\"]\nFHR -->|\"Register\"| RP[\"RP\"]\nR[\"受信者\"] -->|\"IGMP Join\"| LHR[\"LHR<br/>Last Hop Router\"]\nLHR -->|\"(*,G) Join\"| RP\nRP -->|\"(S,G) Join\"| FHR\nFHR -->|\"データ転送\"| LHR\nLHR -->|\"SPT 切替<br/>(S,G) Join\"| FHR\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclassDef default fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclass S,FHR,RP,R,LHR box",
  "10": "sequenceDiagram\nparticipant CE1\nparticipant PE1 as PE1 (Ingress LER)\nparticipant P1 as P1 (LSR)\nparticipant P2 as P2 (PHP)\nparticipant PE2 as PE2 (Egress LER)\nparticipant CE2\nCE1->>PE1: IPv4 パケット\nNote over PE1: VRF 参照<br/>VPN ラベル + トランスポートラベルを Push\nPE1->>P1: [Transport L1][VPN L2][IP]\nNote over P1: 外側ラベルを Swap\nP1->>P2: [Transport L3][VPN L2][IP]\nNote over P2: PHP により外側ラベルを Pop\nP2->>PE2: [VPN L2][IP]\nNote over PE2: VPN ラベルで VRF を特定\nPE2->>CE2: IPv4 パケット",
  "11": "flowchart LR\nA[\"Discovery<br/>UDP 646 マルチキャスト Hello\"] --> B[\"TCP 646 セッション確立<br/>アドレスの大きい方が Active\"]\nB --> C[\"Initialization<br/>パラメータ交換\"]\nC --> D[\"Address / Label Mapping 交換\"]\nD --> E[\"LSP 完成<br/>LIB → LFIB\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclassDef default fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclass A,B,C,D,E box",
  "12": "sequenceDiagram\nparticipant H as ヘッドエンド\nparticipant M as Mid\nparticipant T as テイルエンド\nH->>M: PATH(ERO と要求帯域)\nM->>T: PATH\nT->>M: RESV(ラベル割当)\nM->>H: RESV(ラベル割当)\nNote over H,T: LSP 確立。ヘッドエンドがトンネル IF に流す",
  "13": "flowchart TB\nP[\"SR Policy<br/>color 100 / endpoint 10.0.0.9\"] --> C1[\"Candidate Path pref 200<br/>dynamic / delay 最小\"]\nP --> C2[\"Candidate Path pref 100<br/>explicit segment-list\"]\nC1 -->|\"有効なら選択\"| A[\"Active Path\"]\nC2 -->|\"上位が無効なら選択\"| A\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclassDef default fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclass P,C1,C2,A box",
  "14": "flowchart LR\nR[\"PE2 が VPN 経路を広告<br/>next-hop 10.0.0.9 / color 100\"] --> RR[\"RR\"]\nRR --> H[\"PE1 が受信\"]\nH --> Q{\"color 100 かつ<br/>endpoint 10.0.0.9 の<br/>SR Policy がある?\"}\nQ -->|Yes| S[\"そのポリシーへ自動ステア\"]\nQ -->|No, ODN あり| O[\"ODN テンプレートで自動生成\"]\nQ -->|No, ODN なし| F[\"通常の IGP 最短経路\"]\nO --> S\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclassDef default fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclass R,RR,H,S,O,F box\nclass Q hub",
  "15": "flowchart LR\nsubgraph SID[\"SRv6 SID 128 bit\"]\nL[\"Locator<br/>ブロック + ノード ID\"]\nF[\"Function<br/>動作(End, End.DT4 など)\"]\nA[\"Argument<br/>任意\"]\nend\nL --- F --- A\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclassDef default fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclass L,F,A box",
  "16": "flowchart LR\nRU[\"RU<br/>Radio Unit\"] -->|\"Fronthaul<br/>eCPRI\"| DU[\"DU<br/>Distributed Unit\"]\nDU -->|\"Midhaul<br/>F1\"| CU[\"CU<br/>Centralized Unit\"]\nCU -->|\"Backhaul<br/>N2 / N3\"| CORE[\"5G Core<br/>AMF / UPF\"]\nMEC[\"MEC<br/>エッジコンピュート\"] -.-> DU\nMEC -.-> CU\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclassDef default fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclass RU,DU,CU,CORE,MEC box",
  "17": "flowchart LR\nGNSS[\"GNSS 受信機\"] --> GM[\"T-GM<br/>Grandmaster\"]\nGM -->|\"PTP + SyncE\"| BC1[\"T-BC\"]\nBC1 -->|\"PTP + SyncE\"| BC2[\"T-BC\"]\nBC2 -->|\"PTP\"| RU[\"T-TSC<br/>RU / DU\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclassDef default fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclass GNSS,GM,BC1,BC2,RU box",
  "18": "flowchart TB\nsubgraph OLD[\"従来型\"]\nR1[\"ルーター\"] --> T1[\"トランスポンダ\"] --> W1[\"DWDM 光伝送路\"]\nend\nsubgraph RON[\"Routed Optical Networking\"]\nR2[\"ルーター + Coherent 光モジュール\"] --> W2[\"DWDM 光伝送路\"]\nend\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclassDef default fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclass R1,T1,W1,R2,W2 box",
  "19": "flowchart LR\nsubgraph ACC[\"アクセスドメイン (IGP-A)\"]\nAN[\"AN<br/>Access Node\"]\nend\nsubgraph AGG[\"アグリゲーション (IGP-B)\"]\nABR1[\"ABR1\"]\nend\nsubgraph CORE[\"コア (IGP-C)\"]\nABR2[\"ABR2\"]\nRR[\"RR\"]\nend\nAN ---|\"IGP + LDP/SR\"| ABR1\nABR1 ---|\"IGP + LDP/SR\"| ABR2\nAN -.->|\"BGP-LU<br/>ループバック配送\"| RR\nABR1 -.->|\"BGP-LU next-hop-self\"| RR\nABR2 -.->|\"BGP-LU next-hop-self\"| RR\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclassDef default fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclass AN,ABR1,ABR2,RR box",
  "20": "flowchart TB\nCE[\"CE<br/>Bundle-Ether (LAG)\"]\nPE1[\"PE1<br/>ESI 同一\"]\nPE2[\"PE2<br/>ESI 同一\"]\nCORE[\"MPLS / SR コア<br/>EVPN\"]\nCE --- PE1\nCE --- PE2\nPE1 --- CORE\nPE2 --- CORE\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclassDef default fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclass CE,PE1,PE2,CORE box",
  "21": "sequenceDiagram\nparticipant CE2\nparticipant PE2\nparticipant RR\nparticipant PE1\nparticipant CE1\nCE2->>PE2: PE-CE ルーティング(BGP/OSPF/静的)\nNote over PE2: VRF にインストール<br/>MP-BGP へ再配布<br/>RD 付与 / RT export / VPN ラベル割当\nPE2->>RR: VPNv4 更新\nRR->>PE1: VPNv4 更新(reflect)\nNote over PE1: RT import が一致する VRF に取り込み\nPE1->>CE1: PE-CE ルーティングで広告",
  "22": "flowchart TB\nA[\"PE1 が顧客経路を<br/>VPNv4 で広告\"] --> B[\"PE2 が OSPF に再配布<br/>DN bit を設定\"]\nB --> C[\"別の PE3 が LSA を受信\"]\nC --> D{\"DN bit あり?\"}\nD -->|Yes| E[\"SPF 計算から除外<br/>(ループ防止)\"]\nD -->|No| F[\"通常の OSPF 経路として採用\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclassDef default fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclass A,B,C,E,F box\nclass D hub",
  "23": "flowchart LR\nsubgraph ASA[\"AS 65000\"]\nPEA[\"PE-A\"] --- ASBRA[\"ASBR-A\"]\nend\nsubgraph ASB[\"AS 65001\"]\nASBRB[\"ASBR-B\"] --- PEB[\"PE-B\"]\nend\nASBRA ===|\"接続\"| ASBRB\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclassDef default fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclass PEA,ASBRA,ASBRB,PEB box",
  "24": "flowchart TB\nQ[\"どの方式を選ぶ?\"] --> A{\"網内は IPv6 のみ?\"}\nA -->|Yes| B{\"端末は IPv4 アプリを使う?\"}\nB -->|Yes| C[\"464XLAT / MAP-T / DS-Lite\"]\nB -->|No| D[\"NAT64 + DNS64\"]\nA -->|No| E[\"CGNAT NAT44<br/>+ 段階的に IPv6 展開\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclassDef default fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclass Q,C,D,E box\nclass A,B hub",
  "25": "flowchart TB\nStart[\"mVPN 設計の判断\"] --> Q1{\"コアでの P-tunnel は?\"}\nQ1 -->|\"GRE + PIM\"| P0[\"従来型 Rosen<br/>Profile 0 系\"]\nQ1 -->|\"mLDP\"| Q2{\"C-mcast シグナリング\"}\nQ1 -->|\"Tree-SID\"| P27[\"SR 系 Profile<br/>Profile 27-29 系を確認\"]\nQ2 -->|\"PIM\"| P1[\"mLDP + PIM 系\"]\nQ2 -->|\"BGP\"| P14[\"mLDP + BGP 系<br/>Profile 14 系など\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclassDef default fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclass Start,P0,P27,P1,P14 box\nclass Q1,Q2 hub",
  "26": "flowchart LR\nA[\"入力\"] --> B[\"分類\"]\nB --> C[\"マーキング\"]\nC --> D[\"ポリシング\"]\nD --> E[\"転送\"]\nE --> F[\"キューイング<br/>LLQ / CBWFQ\"]\nF --> G[\"WRED<br/>輻輳回避\"]\nG --> H[\"シェーピング\"]\nH --> I[\"出力\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclassDef default fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclass A,B,C,D,E,F,G,H,I box",
  "27": "sequenceDiagram\nparticipant C as 顧客 DSCP\nparticipant I as 入口 PE\nparticipant K as コア P\nparticipant E as 出口 PE\nNote over C,E: Short Pipe の例\nC->>I: DSCP=EF\nNote over I: TC を SP のクラスで設定(例: TC=5)\nI->>K: Label / TC=5 / DSCP=EF\nK->>E: PHP 後 / DSCP=EF のみ\nNote over E: DSCP=EF を見てキューイング。DSCP は不変",
  "28": "flowchart LR\nSUB[\"加入者\"] --> OLT[\"OLT / AN\"]\nOLT --> UP[\"User Plane<br/>BNG-UP<br/>ルーターで高速転送\"]\nUP -->|\"PFCP\"| CP[\"Control Plane<br/>cnBNG-CP<br/>Kubernetes 上\"]\nCP --> RAD[\"RADIUS / DHCP / ポリシー\"]\nUP --> CORE[\"SP コア / インターネット\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclassDef default fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclass SUB,OLT,UP,CP,RAD,CORE box",
  "29": "flowchart LR\nN1[\"Node1<br/>RPL Owner\"] --- N2[\"Node2\"]\nN2 --- N3[\"Node3\"]\nN3 --- N4[\"Node4\"]\nN4 -.->|\"RPL ブロック\"| N1\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclassDef default fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclass N1,N2,N3,N4 box",
  "30": "flowchart TB\nCE[\"CE<br/>LAG (LACP)\"]\nPE1[\"PE1 (Active)\"]\nPE2[\"PE2 (Standby)\"]\nCE --- PE1\nCE --- PE2\nPE1 <-->|\"ICCP<br/>状態同期\"| PE2\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclassDef default fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclass CE,PE1,PE2 box",
  "31": "flowchart TB\nF[\"アクティブ RP 障害\"] --> S[\"SSO: スタンバイ RP へ切替\"]\nS --> N{\"ルーティングの継続方法\"}\nN -->|\"GR/NSF\"| G[\"隣接がヘルパーとして<br/>経路を維持し、再同期\"]\nN -->|\"NSR\"| R[\"プロトコル状態は<br/>スタンバイに同期済み<br/>隣接は無関与\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclassDef default fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclass F,S,G,R box\nclass N hub",
  "32": "flowchart LR\nA[\"障害発生\"] --> B[\"検知<br/>BFD 数十 ms\"]\nB --> C[\"ローカル保護<br/>FRR で切替 50 ms 以内\"]\nC --> D[\"伝搬 + SPF + FIB 更新<br/>再計算 数百 ms\"]\nD --> E[\"最適経路へ収束\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclassDef default fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclass A,B,C,D,E box",
  "33": "flowchart TB\nS1[\"1. 保護対象リンクの障害を仮定してトポロジを再計算\"] --> S2[\"2. 収束後の最短経路 Post-convergence path を特定\"]\nS2 --> S3[\"3. P-space と Q-space を計算\"]\nS3 --> S4[\"4. 必要なら PQ ノードへの Node-SID と<br/>Adjacency-SID を組み合わせた修復リストを作る\"]\nS4 --> S5[\"5. 修復パスを FIB に事前インストール\"]\nS5 --> S6[\"6. 障害時に 50 ms 以内に切替え\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclassDef default fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclass S1,S2,S3,S4,S5,S6 box",
  "34": "flowchart TB\nSEC[\"SP セキュリティ\"] --> MP[\"管理プレーン<br/>SSH / AAA / SNMP / ログ\"]\nSEC --> CP[\"コントロールプレーン<br/>LPTS / CoPP / 認証 / BGP フィルタ\"]\nSEC --> DP[\"データプレーン<br/>ACL / uRPF / RTBH / Flowspec / MACsec\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclassDef default fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclass SEC,MP,CP,DP box",
  "35": "flowchart LR\nR[\"BGP 更新受信\"] --> V{\"RPKI ROV 検証<br/>ROA と照合\"}\nV -->|valid| A[\"受理<br/>Local Pref 通常\"]\nV -->|not-found| B[\"受理<br/>優先度を下げる運用も可\"]\nV -->|invalid| C[\"拒否 drop\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclassDef default fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclass R,A,B,C box\nclass V hub",
  "36": "flowchart LR\nATK[\"攻撃トラフィック\"] --> PE[\"エッジ PE\"]\nOP[\"運用者 / トリガールーター\"] -->|\"宛先 /32 を BGP で広告<br/>Community 65535:666<br/>next-hop 192.0.2.1\"| RR[\"RR\"]\nRR --> PE\nPE -->|\"192.0.2.1 は Null0 へ<br/>破棄\"| DROP[\"Discard\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclassDef default fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclass ATK,PE,OP,RR,DROP box",
  "37": "flowchart LR\nD[\"装置<br/>ルーター\"] -->|\"Syslog / SNMP Trap\"| E[\"イベント<br/>何が起きたか\"]\nD -->|\"NetFlow / IPFIX\"| T[\"トラフィック<br/>誰が何を送ったか\"]\nD -->|\"MDT / gNMI\"| M[\"メトリクス<br/>どれだけ使われているか\"]\nD -->|\"SR-PM / TWAMP / Y.1731\"| S[\"SLA<br/>遅延・ジッタ・損失\"]\nE --> A[\"分析 / 可視化 / アラート\"]\nT --> A\nM --> A\nS --> A\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclassDef default fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclass D,E,T,M,S,A box",
  "38": "sequenceDiagram\nparticipant S as Session Sender\nparticipant R as Session Reflector\nS->>R: テストパケット(タイムスタンプ T1)\nNote over R: 受信時刻 T2 / 返信時刻 T3 を付与\nR->>S: 反射パケット\nNote over S: 受信時刻 T4 で往復遅延を計算<br/>RTT = T4 - T1 - (T3 - T2)",
  "39": "flowchart TB\nOP[\"運用者 / OSS-BSS / ポータル\"] --> NSO[\"NSO<br/>サービスオーケストレーション\"]\nNSO -->|\"NETCONF / CLI\"| DEV[\"ルーター群<br/>IOS XR / IOS XE\"]\nANS[\"Ansible / Python\"] -->|\"NETCONF / RESTCONF / SSH\"| DEV\nDEV -->|\"MDT: gRPC / gNMI\"| TEL[\"テレメトリ収集<br/>TSDB / 可視化\"]\nZTP[\"Secure ZTP サーバー\"] -->|\"初期設定を配布\"| DEV\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclassDef default fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclass OP,NSO,DEV,ANS,TEL,ZTP box",
  "40": "sequenceDiagram\nparticipant C as クライアント\nparticipant R as ルーター\nC->>R: SSH 830 接続 / hello 交換\nC->>R: lock(candidate)\nC->>R: edit-config(candidate に変更)\nC->>R: validate\nC->>R: commit\nC->>R: unlock\nR-->>C: ok",
  "41": "flowchart TB\nNB[\"北向き: RESTCONF / NETCONF / CLI / Web UI\"] --> CDB[\"CDB<br/>設定データベース\"]\nCDB --> SVC[\"サービスパッケージ<br/>YANG + マッピング\"]\nSVC --> FM[\"FASTMAP<br/>差分計算と自動削除\"]\nFM --> NED[\"NED<br/>Network Element Driver\"]\nNED -->|\"CLI NED\"| D1[\"CLI 装置\"]\nNED -->|\"NETCONF NED\"| D2[\"NETCONF 装置\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclassDef default fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclass NB,CDB,SVC,FM,NED,D1,D2 box",
  "42": "sequenceDiagram\nparticipant R as ルーター(Dial-out)\nparticipant C as コレクター\nNote over R: Subscription 有効化\nR->>C: TCP / gRPC 接続(TLS / mTLS 任意)\nloop サンプル間隔ごと\nR->>C: Sensor Path のデータ(GPB)\nend\nNote over C: TSDB に保存 → ダッシュボード",
  "43": "flowchart TB\nA[\"装置起動<br/>工場出荷状態\"] --> B[\"DHCP でアドレスと<br/>ブートストラップ URL を取得\"]\nB --> C[\"ZTP サーバーへ接続<br/>TLS + 装置の所有証明\"]\nC --> D[\"署名付き Onboarding Info を取得<br/>OS / 設定 / スクリプト\"]\nD --> E{\"署名を検証\"}\nE -->|OK| F[\"OS 更新 + 初期設定適用\"]\nE -->|NG| G[\"中止 / 再試行\"]\nF --> H[\"NSO / Ansible の管理下へ\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclassDef default fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclass A,B,C,D,F,G,H box\nclass E hub",
  "44": "flowchart LR\nOLT[\"OLT<br/>局側\"] --> SPL[\"光スプリッタ\"]\nSPL --> ONU1[\"ONU / ONT 1\"]\nSPL --> ONU2[\"ONU / ONT 2\"]\nSPL --> ONU3[\"ONU / ONT 3\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclassDef default fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclass OLT,SPL,ONU1,ONU2,ONU3 box",
  "45": "flowchart TB\nS[\"症状を確認\"] --> L1{\"L1/L2 は正常?<br/>IF up / LACP / VLAN\"}\nL1 -->|No| F1[\"物理・L2 の修正\"]\nL1 -->|Yes| L2{\"IGP 隣接は Full / Up?\"}\nL2 -->|No| F2[\"認証 / MTU / タイマー / エリア / IF タイプを確認\"]\nL2 -->|Yes| L3{\"Loopback 間の疎通は?\"}\nL3 -->|No| F3[\"IGP のルート広告 / メトリック / passive を確認\"]\nL3 -->|Yes| L4{\"MPLS/SR の LSP は?<br/>ping mpls / show mpls forwarding\"}\nL4 -->|No| F4[\"LDP/SR の SID・SRGB・ラベル割当を確認\"]\nL4 -->|Yes| L5{\"BGP セッションは Established?\"}\nL5 -->|No| F5[\"update-source / 認証 / AF / eBGP ポリシー有無を確認\"]\nL5 -->|Yes| L6{\"VPN / サービスのルートは?<br/>RD / RT / next-hop\"}\nL6 -->|No| F6[\"RT import/export / ポリシー / RR を確認\"]\nL6 -->|Yes| L7[\"転送を確認<br/>show cef / traceroute / QoS / ACL\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclassDef default fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclass S,F1,F2,F3,F4,F5,F6,L7 box\nclass L1,L2,L3,L4,L5,L6 hub",
  "46": "flowchart LR\nP1[\"フェーズ 1<br/>1〜4 週<br/>IGP / BGP 基礎\"] --> P2[\"フェーズ 2<br/>5〜9 週<br/>MPLS / LDP / TE\"]\nP2 --> P3[\"フェーズ 3<br/>10〜14 週<br/>SR / SRv6 / 高速収束\"]\nP3 --> P4[\"フェーズ 4<br/>15〜19 週<br/>L3VPN / EVPN / mVPN / QoS\"]\nP4 --> P5[\"フェーズ 5<br/>20〜22 週<br/>セキュリティ / 自動化\"]\nP5 --> P6[\"フェーズ 6<br/>23〜24 週<br/>総合ラボ / SPCOR 受験\"]\nclassDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclassDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26\nclassDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26\nclassDef default fill:#EEF1F8,stroke:#2E3F72,color:#161B26\nclass P1,P2,P3,P4,P5,P6 box",
};
