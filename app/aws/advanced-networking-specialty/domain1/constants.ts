export const NAV_ITEMS = [
  {
    "id": "0-このガイドの使い方",
    "label": "0. このガイドの使い方",
    "level": 2
  },
  {
    "id": "1-試験の全体像とドメイン-1-の位置づけ",
    "label": "1. 試験の全体像とドメイン 1 の位置づけ",
    "level": 2
  },
  {
    "id": "task-11-エッジネットワークサービス",
    "label": "Task 1.1: エッジネットワークサービス",
    "level": 2
  },
  {
    "id": "task-12-dns-設計",
    "label": "Task 1.2: DNS 設計",
    "level": 2
  },
  {
    "id": "task-13-ロードバランシング設計",
    "label": "Task 1.3: ロードバランシング設計",
    "level": 2
  },
  {
    "id": "task-14-ログとモニタリング要件の定義",
    "label": "Task 1.4: ログとモニタリング要件の定義",
    "level": 2
  },
  {
    "id": "task-15-ハイブリッド接続とルーティング",
    "label": "Task 1.5: ハイブリッド接続とルーティング",
    "level": 2
  },
  {
    "id": "task-16-複数アカウント複数リージョン複数-vpc-の接続設計",
    "label": "Task 1.6: 複数アカウント、複数リージョン、複数 VPC の接続設計",
    "level": 2
  },
  {
    "id": "ドメイン-1-横断チートシート",
    "label": "ドメイン 1 横断チートシート",
    "level": 2
  },
  {
    "id": "理解度チェック-演習問題",
    "label": "理解度チェック (演習問題)",
    "level": 2
  },
  {
    "id": "学習チェックリスト",
    "label": "学習チェックリスト",
    "level": 2
  },
  {
    "id": "参考-url-一覧",
    "label": "参考 URL 一覧",
    "level": 2
  }
] as const;
export const DIAGRAMS = {
  "diag-1": "flowchart TD\nD[\"Domain 1 Network Design 配点 30 パーセント\"]\nD --> T1[\"Task 1.1 エッジサービス\"]\nD --> T2[\"Task 1.2 DNS\"]\nD --> T3[\"Task 1.3 ロードバランシング\"]\nD --> T4[\"Task 1.4 ログとモニタリング\"]\nD --> T5[\"Task 1.5 ハイブリッド接続\"]\nD --> T6[\"Task 1.6 マルチ VPC 接続\"]\n\nclassDef highlightFill fill:#dbe6ff,stroke:#2d52d0,color:#10215c;\nclass D highlightFill",
  "diag-2": "flowchart TD\nV[\"Viewer\"] -->|\"1 最寄りのエッジに到達\"| E[\"Edge location\"]\nE -->|\"2 キャッシュにあれば即応答\"| V\nE -->|\"3 なければ中間層へ\"| R[\"Regional edge cache\"]\nR -->|\"4 なければ集約層へ\"| S[\"Origin Shield\"]\nS -->|\"5 それでもなければ\"| O[\"Origin\"]\n\nclassDef highlightFill fill:#dbe6ff,stroke:#2d52d0,color:#10215c;\nclass O highlightFill",
  "diag-3": "flowchart TD\nA[\"グローバルユーザー向けに高速化したい\"] --> B{\"HTTP か HTTPS で、キャッシュできるか?\"}\nB -->|\"はい\"| C[\"Amazon CloudFront\"]\nB -->|\"いいえ\"| D{\"静的 IP、TCP か UDP、高速フェイルオーバーが必要か?\"}\nD -->|\"はい\"| E[\"AWS Global Accelerator\"]\nD -->|\"いいえ\"| F[\"リージョナル ALB と Route 53 レイテンシールーティング\"]\n\nclassDef successFill fill:#dff3e8,stroke:#1f7a4d,color:#0e3d26;\nclass C,E,F successFill",
  "diag-4": "flowchart TD\nC[\"クライアント\"] --> S[\"スタブリゾルバー\"]\nS --> RR[\"再帰リゾルバー\"]\nRR -->|\"1 ルートサーバーに問い合わせ\"| ROOT[\"ルートサーバー\"]\nRR -->|\"2 TLD サーバーに問い合わせ\"| TLD[\"TLD サーバー com など\"]\nRR -->|\"3 権威サーバーに問い合わせ\"| AUTH[\"権威 DNS サーバー Route 53 など\"]\nAUTH -->|\"4 答えを返す\"| RR\nRR -->|\"5 TTL の間キャッシュして応答\"| C\n\nclassDef highlightFill fill:#dbe6ff,stroke:#2d52d0,color:#10215c;\nclass RR highlightFill",
  "diag-5": "flowchart TD\nQ[\"どのように振り分けたいか\"] --> A{\"障害時に切り替えたいか?\"}\nA -->|\"はい\"| F[\"フェイルオーバー\"]\nA -->|\"いいえ\"| B{\"割合で分けたいか?\"}\nB -->|\"はい\"| W[\"加重\"]\nB -->|\"いいえ\"| C{\"何を基準にするか?\"}\nC -->|\"遅延\"| L[\"レイテンシー\"]\nC -->|\"国や地域\"| G[\"位置情報\"]\nC -->|\"距離とバイアス\"| P[\"地理的近接\"]\nC -->|\"クライアント IP 範囲\"| I[\"IP ベース\"]\n\nclassDef highlightFill fill:#dbe6ff,stroke:#2d52d0,color:#10215c;\nclass Q highlightFill\nclassDef successFill fill:#dff3e8,stroke:#1f7a4d,color:#0e3d26;\nclass F,W,L,G,P,I successFill",
  "diag-6": "flowchart TD\nA[\"オンプレミスのサーバー\"] --> B[\"オンプレミスの DNS サーバー\"]\nB -->|\"条件付きフォワーダーで aws.example.com を転送\"| C[\"Resolver インバウンドエンドポイント\"]\nC --> D[\"Route 53 Resolver\"]\nD --> E[\"プライベートホストゾーン\"]\n\nclassDef highlightFill fill:#dbe6ff,stroke:#2d52d0,color:#10215c;\nclass C highlightFill",
  "diag-7": "flowchart TD\nA[\"VPC 内の EC2\"] --> B[\"Route 53 Resolver\"]\nB -->|\"転送ルールに一致 corp.example.com\"| C[\"Resolver アウトバウンドエンドポイント\"]\nC -->|\"Direct Connect か VPN 経由\"| D[\"オンプレミスの DNS サーバー\"]\n\nclassDef highlightFill fill:#dbe6ff,stroke:#2d52d0,color:#10215c;\nclass C highlightFill",
  "diag-8": "flowchart TD\nS[\"ロードバランサーを選ぶ\"] --> Q1{\"透過的にアプライアンスを挟むか?\"}\nQ1 -->|\"はい\"| G[\"Gateway Load Balancer\"]\nQ1 -->|\"いいえ\"| Q2{\"HTTP か HTTPS で L7 の振り分けが必要か?\"}\nQ2 -->|\"はい\"| A[\"Application Load Balancer\"]\nQ2 -->|\"いいえ\"| Q3{\"固定 IP、UDP、超低遅延、PrivateLink が必要か?\"}\nQ3 -->|\"はい\"| N[\"Network Load Balancer\"]\nQ3 -->|\"いいえ\"| A2[\"要件を見直し ALB か NLB を再検討\"]\n\nclassDef highlightFill fill:#dbe6ff,stroke:#2d52d0,color:#10215c;\nclass S highlightFill\nclassDef successFill fill:#dff3e8,stroke:#1f7a4d,color:#0e3d26;\nclass G,A,N successFill",
  "diag-9": "flowchart TD\nC[\"クライアント\"] -->|\"HTTPS\"| L[\"ロードバランサー\"]\nL -->|\"終端 HTTP で転送\"| T1[\"ターゲット 終端パターン\"]\nL -->|\"終端後に再暗号化 HTTPS\"| T2[\"ターゲット 再暗号化パターン\"]\nC -->|\"HTTPS を NLB の TCP リスナーで受ける\"| N[\"NLB\"]\nN -->|\"暗号化のまま通す\"| T3[\"ターゲット パススルーパターン\"]\n\nclassDef highlightFill fill:#dbe6ff,stroke:#2d52d0,color:#10215c;\nclass L,N highlightFill",
  "diag-10": "flowchart TD\nK[\"Ingress または Service を作成\"] --> C[\"AWS Load Balancer Controller が変更を検知\"]\nC --> L[\"ALB か NLB を作成\"]\nC --> TG[\"ターゲットグループを作成\"]\nTG -->|\"ip モードで Pod の IP を登録\"| P[\"Pod\"]\nL --> TG\n\nclassDef highlightFill fill:#dbe6ff,stroke:#2d52d0,color:#10215c;\nclass C highlightFill",
  "diag-11": "flowchart TD\nQ[\"何を知りたいか\"] --> A{\"パケットの中身まで必要か?\"}\nA -->|\"はい\"| TM[\"Traffic Mirroring\"]\nA -->|\"いいえ\"| B{\"設定上つながるかを確認したいか?\"}\nB -->|\"はい\"| RA[\"Reachability Analyzer\"]\nB -->|\"いいえ\"| C{\"通信の記録を残したいか?\"}\nC -->|\"はい\"| FL[\"VPC Flow Logs\"]\nC -->|\"いいえ\"| D{\"グローバルな構成を俯瞰したいか?\"}\nD -->|\"はい\"| NM[\"Transit Gateway Network Manager\"]\nD -->|\"いいえ\"| CW[\"CloudWatch メトリクスとアラーム\"]\n\nclassDef highlightFill fill:#dbe6ff,stroke:#2d52d0,color:#10215c;\nclass Q highlightFill\nclassDef successFill fill:#dff3e8,stroke:#1f7a4d,color:#0e3d26;\nclass TM,RA,FL,NM,CW successFill",
  "diag-12": "flowchart TD\nS[\"ハイブリッド接続を設計する\"] --> Q1{\"すぐに使いたい、または小規模か?\"}\nQ1 -->|\"はい\"| V[\"Site-to-Site VPN\"]\nQ1 -->|\"いいえ\"| Q2{\"安定した帯域と低遅延が必要か?\"}\nQ2 -->|\"はい\"| Q3{\"暗号化が必須か?\"}\nQ2 -->|\"いいえ\"| V\nQ3 -->|\"はい\"| D2[\"Direct Connect と MACsec か IPsec VPN\"]\nQ3 -->|\"いいえ\"| D1[\"Direct Connect\"]\nD1 --> B[\"バックアップに VPN を併用\"]\nD2 --> B\n\nclassDef highlightFill fill:#dbe6ff,stroke:#2d52d0,color:#10215c;\nclass S highlightFill\nclassDef successFill fill:#dff3e8,stroke:#1f7a4d,color:#0e3d26;\nclass V,D1,D2,B successFill",
  "diag-13": "flowchart TD\nO[\"オンプレミスのルーター\"] -->|\"プライマリ経路\"| DX[\"Direct Connect\"]\nDX --> DXGW[\"Direct Connect ゲートウェイ\"]\nDXGW --> TGW[\"Transit Gateway\"]\nO -->|\"バックアップ経路\"| VPN[\"Site-to-Site VPN\"]\nVPN --> TGW\nTGW --> VPC[\"VPC\"]\n\nclassDef highlightFill fill:#dbe6ff,stroke:#2d52d0,color:#10215c;\nclass TGW highlightFill",
  "diag-14": "flowchart TD\nA[\"スポーク VPC A\"] --> TGW[\"Transit Gateway\"]\nB[\"スポーク VPC B\"] --> TGW\nTGW -->|\"アプライアンスモード\"| INS[\"検査 VPC の GWLB と ファイアウォール\"]\nINS --> TGW\nTGW --> EG[\"エグレス VPC の NAT ゲートウェイ\"]\nEG --> NET[\"インターネット\"]\nOP[\"オンプレミス\"] -->|\"Direct Connect か VPN\"| TGW\n\nclassDef highlightFill fill:#dbe6ff,stroke:#2d52d0,color:#10215c;\nclass TGW highlightFill",
  "diag-15": "flowchart TD\nS[\"VPC を接続したい\"] --> Q1{\"CIDR が重複しているか?\"}\nQ1 -->|\"はい\"| Q2{\"特定のサービスだけを公開すればよいか?\"}\nQ2 -->|\"はい\"| PL[\"PrivateLink\"]\nQ2 -->|\"いいえ\"| NAT[\"プライベート NAT ゲートウェイか 再設計\"]\nQ1 -->|\"いいえ\"| Q3{\"接続する VPC の数は多いか? 推移的な通信は必要か?\"}\nQ3 -->|\"はい\"| TG[\"Transit Gateway\"]\nQ3 -->|\"いいえ\"| Q4{\"全体の接続が必要か、サービスだけか?\"}\nQ4 -->|\"サービスだけ\"| PL\nQ4 -->|\"全体\"| PE[\"VPC ピアリング\"]\n\nclassDef highlightFill fill:#dbe6ff,stroke:#2d52d0,color:#10215c;\nclass S highlightFill\nclassDef successFill fill:#dff3e8,stroke:#1f7a4d,color:#0e3d26;\nclass PL,NAT,TG,PE successFill"
} as const;
export type DiagramId = keyof typeof DIAGRAMS;
export const MERMAID_CONFIG = {
  "theme": "base",
  "themeVariables": {
    "fontSize": "16px",
    "background": "#ffffff",
    "primaryColor": "#eef2fc",
    "primaryTextColor": "#1c2433",
    "primaryBorderColor": "#9fb3e8",
    "lineColor": "#6b7fb0",
    "secondaryColor": "#f0f3fa",
    "tertiaryColor": "#f0f3fa",
    "edgeLabelBackground": "#ffffff",
    "clusterBkg": "#f6f8fc",
    "clusterBorder": "#9fb3e8",
    "nodeTextColor": "#1c2433"
  },
  "flowchart": {
    "useMaxWidth": false,
    "htmlLabels": true,
    "subGraphTitleMargin": {
      "top": 12,
      "bottom": 18
    },
    "nodeSpacing": 70,
    "rankSpacing": 60,
    "curve": "basis"
  }
} as const;
