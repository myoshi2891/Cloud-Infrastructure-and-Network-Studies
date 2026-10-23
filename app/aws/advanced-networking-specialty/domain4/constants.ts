/** 原本の図定義、テーマと99目次項目。 */
export const DIAGRAMS = {
  "diag-1": "flowchart TD\n    D4[\"Domain 4<br/>Network Security, Compliance, and Governance\"]\n    T1[\"Task 4.1 守る<br/>WAF / Shield / Network Firewall<br/>SG / NACL / エンドポイントポリシー\"]\n    T2[\"Task 4.2 見る<br/>Flow Logs / Traffic Mirroring<br/>CloudWatch / CloudTrail / Firewall Manager\"]\n    T3[\"Task 4.3 隠す<br/>IPsec / TLS / MACsec<br/>ACM / Private CA / DNSSEC\"]\n    D4 --> T1\n    D4 --> T2\n    D4 --> T3\n    T1 -. \"設定が正しいか検証\" .-> T2\n    T3 -. \"暗号化状況を監査\" .-> T2\n",
  "diag-2": "flowchart TD\n    A[\"インターネット\"] --> B[\"エッジ層<br/>Shield / WAF / CloudFront\"]\n    B --> C[\"VPC 境界層<br/>Network Firewall / IGW ルート制御\"]\n    C --> D[\"サブネット層<br/>ネットワーク ACL\"]\n    D --> E[\"インスタンス層<br/>セキュリティグループ\"]\n    E --> F[\"ホスト・アプリ層<br/>OS 設定 / TLS / 認証\"]\n    F --> G[\"データ層<br/>暗号化 / KMS / バケットポリシー\"]\n    H[\"全層を横断<br/>ログ・監視・自動対応<br/>Flow Logs / CloudTrail / GuardDuty\"] -.-> B\n    H -.-> D\n    H -.-> G\n",
  "diag-3": "flowchart TD\n    S1[\"1. 守る資産を特定<br/>データ・API・認証情報\"] --> S2[\"2. アーキテクチャ図を描く<br/>信頼境界を引く\"]\n    S2 --> S3[\"3. 脅威を洗い出す<br/>STRIDE などで分類\"]\n    S3 --> S4[\"4. 緩和策を選ぶ<br/>防止・検知・対応\"]\n    S4 --> S5[\"5. 実装して検証<br/>テスト・ログ確認\"]\n    S5 --> S6[\"6. 継続的に見直す\"]\n    S6 --> S2\n",
  "diag-4": "flowchart TD\n    U[\"ユーザー\"] --> R53[\"Route 53<br/>DNS(DNSSEC 可)\"]\n    R53 --> CF[\"CloudFront<br/>+ AWS WAF + Shield\"]\n    CF --> ALB[\"Application Load Balancer<br/>+ AWS WAF\"]\n    ALB --> APP[\"アプリ層<br/>プライベートサブネットの EC2 / ECS\"]\n    U2[\"ユーザー(非 HTTP のゲーム等)\"] --> GA[\"Global Accelerator<br/>+ Shield\"]\n    GA --> NLB[\"Network Load Balancer\"]\n    NLB --> APP\n    APP --> DB[\"データ層<br/>RDS など\"]\n",
  "diag-5": "flowchart TD\n    REQ[\"リクエスト到着\"] --> P1{\"優先度1のルールに一致?\"}\n    P1 -- \"Yes: Allow / Block\" --> END1[\"アクション実行して終了\"]\n    P1 -- \"Yes: Count\" --> P2\n    P1 -- \"No\" --> P2{\"優先度2のルールに一致?\"}\n    P2 -- \"Yes: Allow / Block\" --> END1\n    P2 -- \"Yes: Count\" --> DEF\n    P2 -- \"No\" --> DEF[\"Web ACL の既定アクション<br/>Allow または Block\"]\n",
  "diag-6": "flowchart TD\n    PKT[\"パケット到着\"] --> SL{\"ステートレスエンジン<br/>ルールに一致?\"}\n    SL -- \"pass\" --> OUT[\"通過\"]\n    SL -- \"drop\" --> DROP1[\"破棄\"]\n    SL -- \"forward to stateful<br/>または 一致なしの既定\" --> SF{\"ステートフルエンジン<br/>Suricata ルール評価\"}\n    SF -- \"pass\" --> OUT\n    SF -- \"drop / reject\" --> DROP2[\"破棄 / リセット\"]\n    SF -- \"alert\" --> LOG[\"アラートログ出力\"]\n    SF -- \"一致なし\" --> DEFA[\"既定アクション<br/>strict order なら drop_strict 等\"]\n",
  "diag-7": "flowchart TD\n    INET[\"インターネット\"] --> IGW[\"Internet Gateway<br/>エッジ関連付けルートテーブル<br/>宛先 ALB サブネット → FW エンドポイント\"]\n    IGW --> FWE[\"ファイアウォールサブネット<br/>Network Firewall エンドポイント\"]\n    FWE --> ALBS[\"パブリックサブネット<br/>ALB\"]\n    ALBS --> APPS[\"プライベートサブネット<br/>アプリ\"]\n    APPS -. \"戻り通信も同じ AZ のエンドポイント経由\" .-> FWE\n",
  "diag-8": "flowchart TD\n    SP1[\"スポーク VPC A<br/>プライベートサブネット\"] --> TGW[\"Transit Gateway<br/>スポーク用ルートテーブル<br/>0.0.0.0/0 → 検査 VPC\"]\n    SP2[\"スポーク VPC B<br/>プライベートサブネット\"] --> TGW\n    TGW --> INS[\"検査 VPC<br/>TGW アタッチメントサブネット\"]\n    INS --> FW[\"ファイアウォールサブネット<br/>Network Firewall エンドポイント\"]\n    FW --> NAT[\"パブリックサブネット<br/>NAT ゲートウェイ\"]\n    NAT --> IGW[\"Internet Gateway\"]\n    IGW --> NET[\"インターネット\"]\n",
  "diag-9": "flowchart TD\n    EC2[\"EC2 / コンテナ\"] --> RES[\"Route 53 Resolver<br/>VPC + 2 のアドレス\"]\n    RES --> DNSFW[\"DNS Firewall ルールグループ<br/>ドメインリストで ALLOW / BLOCK / ALERT\"]\n    DNSFW --> OK[\"許可: 通常の名前解決\"]\n    DNSFW --> NG[\"ブロック: NODATA / NXDOMAIN / OVERRIDE を返す\"]\n    RES --> QLOG[\"Resolver クエリログ<br/>CloudWatch Logs / S3 / Firehose\"]\n    EC2 -. \"外部 DNS への直接クエリは<br/>NACL / Network Firewall で拒否\" .-> X[\"UDP/TCP 53 を遮断\"]\n",
  "diag-10": "flowchart TD\n    IN[\"受信パケット\"] --> N1{\"サブネットの NACL<br/>インバウンド評価\"}\n    N1 -- \"拒否\" --> D1[\"破棄\"]\n    N1 -- \"許可\" --> S1{\"ENI の SG<br/>インバウンド評価\"}\n    S1 -- \"許可なし\" --> D2[\"破棄\"]\n    S1 -- \"許可\" --> INST[\"インスタンスが受信\"]\n    INST --> RESP[\"応答を送信<br/>SG: ステートフルで自動許可\"]\n    RESP --> N2{\"NACL アウトバウンド評価<br/>エフェメラルポートを許可しているか\"}\n    N2 -- \"拒否\" --> D3[\"破棄\"]\n    N2 -- \"許可\" --> OUT[\"応答が送信される\"]\n",
  "diag-11": "flowchart TD\n    REQ[\"VPC 内からの S3 リクエスト\"] --> EP{\"エンドポイントポリシー<br/>許可されているか\"}\n    EP -- \"拒否\" --> DENY[\"拒否\"]\n    EP -- \"許可\" --> IAM{\"IAM ポリシー<br/>許可されているか\"}\n    IAM -- \"拒否\" --> DENY\n    IAM -- \"許可\" --> BP{\"バケットポリシー<br/>例: aws:SourceVpce 条件\"}\n    BP -- \"拒否\" --> DENY\n    BP -- \"許可\" --> OK[\"アクセス成功\"]\n",
  "diag-12": "flowchart TD\n    PROD[\"本番 VPC\"] --> TGWA[\"TGW アタッチメント\"]\n    DEV[\"開発 VPC\"] --> TGWA\n    SH[\"共有サービス VPC\"] --> TGWA\n    TGWA --> RT1[\"本番用ルートテーブル<br/>共有サービスのみ到達可\"]\n    TGWA --> RT2[\"開発用ルートテーブル<br/>共有サービスのみ到達可\"]\n    RT1 -. \"本番 ⇔ 開発 のルートなし<br/>必要ならブラックホール\" .- RT2\n",
  "diag-13": "flowchart TD\n    INET[\"インターネット\"] --> ALB[\"Web 層<br/>パブリックサブネット<br/>ALB + WAF\"]\n    ALB --> APP[\"アプリ層<br/>プライベートサブネット<br/>SG: ALB の SG からのみ許可\"]\n    APP --> DB[\"データ層<br/>分離サブネット<br/>SG: アプリ層の SG からのみ許可<br/>インターネットへのルートなし\"]\n    APP --> EP[\"VPC エンドポイント<br/>S3 / 各種 AWS API\"]\n",
  "diag-14": "flowchart TD\n    UNT[\"信頼できないネットワーク<br/>インターネット / パートナー / オンプレ\"] --> PER[\"境界 VPC<br/>WAF / Network Firewall / GWLB アプライアンス\"]\n    PER --> TGW[\"Transit Gateway<br/>アプライアンスモード有効\"]\n    TGW --> WL1[\"ワークロード VPC 1\"]\n    TGW --> WL2[\"ワークロード VPC 2\"]\n    TGW --> SH[\"共有サービス VPC\"]\n",
  "diag-15": "flowchart TD\n    A[\"VPC A\"] --> TGW[\"Transit Gateway\"]\n    B[\"VPC B\"] --> TGW\n    TGW -- \"スポーク用ルートテーブル<br/>0.0.0.0/0 → 検査 VPC\" --> INS[\"検査 VPC<br/>Network Firewall / GWLB\"]\n    INS -- \"検査後に戻る<br/>検査用ルートテーブル\" --> TGW\n    TGW --> A2[\"宛先 VPC(A→B の場合 B)\"]\n",
  "diag-16": "flowchart TD\n    REQ[\"コンプライアンス要件\"] --> DESIGN[\"設計・実装\"]\n    DESIGN --> T1[\"静的検証<br/>Reachability Analyzer<br/>Network Access Analyzer\"]\n    T1 --> T2[\"動的検証<br/>疎通テスト / ペネトレーション\"]\n    T2 --> T3[\"障害テスト<br/>FIS / VPN・DX フェイルオーバー / AZ 障害\"]\n    T3 --> T4[\"継続評価<br/>Config / Security Hub\"]\n    T4 --> FIX[\"逸脱を是正\"]\n    FIX --> DESIGN\n",
  "diag-17": "flowchart TD\n    GD[\"GuardDuty<br/>Flow Logs / DNS / CloudTrail を分析\"] --> EB[\"Amazon EventBridge\"]\n    CFG[\"AWS Config<br/>非準拠リソース\"] --> EB\n    CT[\"CloudTrail<br/>SG / NACL / ルート変更の API\"] --> EB\n    FMS[\"Firewall Manager<br/>ポリシー違反\"] --> EB\n    SHUB[\"Security Hub<br/>統合された検出結果\"] --> EB\n    EB --> SNS[\"SNS<br/>メール / Slack / PagerDuty\"]\n    EB --> LMB[\"Lambda<br/>自動是正(SG ルール削除など)\"]\n    EB --> SSM[\"Systems Manager Automation<br/>Runbook 実行\"]\n    LMB --> ISO[\"隔離用 SG の適用など\"]\n",
  "diag-18": "flowchart TD\n    Q[\"何を知りたい?\"] --> A{\"誰が設定を変えたか?\"}\n    A -- \"Yes\" --> CT[\"CloudTrail\"]\n    A -- \"No\" --> B{\"通信の概要<br/>誰から誰へ・許可/拒否?\"}\n    B -- \"Yes\" --> FL[\"VPC Flow Logs\"]\n    B -- \"No\" --> C{\"パケットの中身まで見たい?\"}\n    C -- \"Yes\" --> TM[\"VPC Traffic Mirroring\"]\n    C -- \"No\" --> D{\"HTTP リクエストや<br/>攻撃の詳細?\"}\n    D -- \"Yes\" --> L7[\"ALB ログ / CloudFront ログ<br/>WAF ログ\"]\n    D -- \"No\" --> E{\"DNS の問い合わせ?\"}\n    E -- \"Yes\" --> DNSL[\"Route 53 Resolver クエリログ\"]\n    E -- \"No\" --> CW[\"CloudWatch メトリクス\"]\n",
  "diag-19": "flowchart TD\n    SRC[\"VPC / サブネット / ENI / TGW\"] --> FL[\"Flow Logs<br/>フォーマット・集約間隔・フィルタを指定\"]\n    FL --> D1[\"CloudWatch Logs<br/>リアルタイム寄りの検索・アラーム\"]\n    FL --> D2[\"Amazon S3<br/>長期保管・Parquet 形式可\"]\n    FL --> D3[\"Kinesis Data Firehose<br/>OpenSearch / Splunk へ\"]\n    D1 --> A1[\"Logs Insights<br/>メトリクスフィルタ → アラーム\"]\n    D2 --> A2[\"Amazon Athena<br/>SQL で大規模分析\"]\n    D3 --> A3[\"OpenSearch Service<br/>ダッシュボード\"]\n    A1 --> N[\"SNS / EventBridge\"]\n",
  "diag-20": "flowchart TD\n    SRC[\"ミラーソース<br/>ワークロードの ENI\"] --> SES[\"ミラーセッション<br/>フィルタ適用 / パケット切り詰め\"]\n    SES -- \"VXLAN でカプセル化<br/>UDP 4789\" --> NLB[\"ミラーターゲット<br/>Network Load Balancer\"]\n    NLB --> IDS1[\"検査アプライアンス 1<br/>Suricata / Zeek 等\"]\n    NLB --> IDS2[\"検査アプライアンス 2<br/>Auto Scaling\"]\n    IDS1 --> OUT[\"アラート / S3 保存 / SIEM\"]\n    IDS2 --> OUT\n",
  "diag-21": "flowchart TD\n    subgraph WL[\"ワークロードアカウント群\"]\n        FL[\"VPC Flow Logs\"]\n        WAFL[\"WAF / ALB / NFW ログ\"]\n        DNSL[\"Resolver クエリログ\"]\n        CT[\"CloudTrail 組織の証跡\"]\n    end\n    FL --> S3[\"ログアーカイブアカウント<br/>S3 バケット<br/>SSE-KMS / オブジェクトロック\"]\n    WAFL --> S3\n    DNSL --> S3\n    CT --> S3\n    S3 --> ATH[\"Athena / Glue<br/>SQL 分析\"]\n    S3 --> SL[\"Security Lake / OpenSearch<br/>SIEM\"]\n    CT --> EBR[\"EventBridge<br/>リアルタイム検知\"]\n    EBR --> NOTI[\"SNS / Lambda\"]\n",
  "diag-22": "flowchart TD\n    ALERT[\"GuardDuty が不審な外向き通信を検出<br/>対象 ENI と時刻を特定\"] --> FL[\"Flow Logs<br/>宛先 IP・ポート・バイト数・方向を確認<br/>pkt-dstaddr で NAT 後の実際の宛先\"]\n    FL --> DNS[\"Resolver クエリログ<br/>同時刻のドメイン名を確認\"]\n    DNS --> NFW[\"Network Firewall ログ<br/>SNI・アクションを確認\"]\n    NFW --> CT[\"CloudTrail<br/>直前の SG / ルート / 認証情報の変更\"]\n    CT --> ACT[\"対応: 隔離 SG の適用 / ルール追加<br/>→ DNS Firewall・FW ルールで恒久対策\"]\n",
  "diag-23": "flowchart TD\n    ORG[\"AWS Organizations<br/>管理アカウント\"] --> SEC[\"セキュリティ(委任管理者)アカウント\"]\n    ORG --> LOGA[\"ログアーカイブアカウント\"]\n    SEC --> FMS[\"Firewall Manager<br/>SG / NACL / WAF / NFW / DNS FW ポリシー\"]\n    SEC --> CFGA[\"Config アグリゲーター<br/>コンフォーマンスパック\"]\n    SEC --> SH[\"Security Hub / GuardDuty<br/>全アカウント集約\"]\n    LOGA --> TRAIL[\"CloudTrail 組織の証跡<br/>Flow Logs / ALB ログ\"]\n    FMS --> MEM[\"メンバーアカウント<br/>新規リソースにも自動適用\"]\n    CFGA --> MEM\n    SH --> MEM\n",
  "diag-24": "flowchart TD\n    CL[\"クライアント\"] -- \"TLS<br/>ビューワープロトコルポリシー\" --> CF[\"CloudFront\"]\n    CF -- \"TLS<br/>オリジンプロトコルポリシー HTTPS のみ\" --> ALB[\"ALB / NLB\"]\n    ALB -- \"TLS<br/>エンドツーエンドの再暗号化\" --> EC2[\"EC2 / コンテナ\"]\n    EC2 -- \"Nitro による自動暗号化<br/>またはアプリ層 TLS\" --> EC2B[\"他の EC2\"]\n    EC2 -- \"TLS / 接続時 SSL 必須\" --> DB[\"RDS / Aurora\"]\n    EC2 -- \"HTTPS / VPC エンドポイント\" --> S3[\"S3\"]\n    ONP[\"オンプレミス\"] -- \"IPsec VPN<br/>または DX + MACsec / VPN over DX\" --> TGW[\"Transit Gateway / VGW\"]\n",
  "diag-25": "flowchart TD\n    START[\"Direct Connect 上の通信を暗号化したい\"] --> Q1{\"専用接続で<br/>MACsec 対応ポート・機器を<br/>使えるか?\"}\n    Q1 -- \"Yes かつ L2 で十分\" --> MAC[\"MACsec<br/>ライン速度で暗号化\"]\n    Q1 -- \"No または E2E の IPsec が必要\" --> Q2{\"通信をインターネットの<br/>IP 空間に出したくない?\"}\n    Q2 -- \"Yes\" --> PRIV[\"Private IP VPN<br/>トランジット VIF + TGW\"]\n    Q2 -- \"No でよい\" --> PUB[\"パブリック VIF 上の IPsec VPN<br/>VPN パブリックエンドポイント\"]\n",
  "diag-26": "flowchart TD\n    subgraph P1[\"パターン A: ALB で終端(標準)\"]\n        A1[\"クライアント\"] -- \"HTTPS\" --> A2[\"ALB<br/>ACM 証明書で復号\"]\n        A2 -- \"HTTP(VPC 内)\" --> A3[\"ターゲット\"]\n    end\n    subgraph P2[\"パターン B: エンドツーエンド暗号化\"]\n        B1[\"クライアント\"] -- \"HTTPS\" --> B2[\"ALB<br/>復号して検査\"]\n        B2 -- \"HTTPS 再暗号化\" --> B3[\"ターゲット<br/>自己署名可・Private CA 推奨\"]\n    end\n    subgraph P3[\"パターン C: NLB パススルー\"]\n        C1[\"クライアント\"] -- \"TLS\" --> C2[\"NLB<br/>TCP リスナーで素通し\"]\n        C2 -- \"TLS のまま\" --> C3[\"ターゲットが終端\"]\n    end\n",
  "diag-27": "flowchart TD\n    ROOT[\"ルート CA<br/>AWS Private CA<br/>運用は最小限・厳重管理\"] --> SUB1[\"下位 CA(部門 A)<br/>日常の発行用\"]\n    ROOT --> SUB2[\"下位 CA(部門 B)<br/>日常の発行用\"]\n    SUB1 --> C1[\"サーバー証明書<br/>社内サービス\"]\n    SUB1 --> C2[\"クライアント証明書<br/>mTLS・VPN\"]\n    SUB2 --> C3[\"デバイス証明書\"]\n    SUB1 -. \"失効情報\" .-> REV[\"CRL(S3)/ OCSP\"]\n",
  "diag-28": "flowchart TD\n    N[\"証明書が必要\"] --> Q1{\"インターネットの<br/>ブラウザ・外部クライアントが<br/>信頼する必要がある?\"}\n    Q1 -- \"Yes\" --> Q2{\"ELB / CloudFront /<br/>API Gateway で使う?\"}\n    Q2 -- \"Yes\" --> ACMPUB[\"ACM パブリック証明書<br/>DNS 検証 + 自動更新\"]\n    Q2 -- \"No(EC2 等に直接)\" --> OTHER[\"外部 CA の証明書を利用<br/>または ACM の新しい<br/>エクスポート機能を確認\"]\n    Q1 -- \"No(社内・mTLS・デバイス)\" --> PCA[\"AWS Private CA<br/>ルート CA + 下位 CA\"]\n    PCA --> Q3{\"ACM 統合サービスで使う?\"}\n    Q3 -- \"Yes\" --> ACMPRI[\"ACM 経由で発行・自動更新\"]\n    Q3 -- \"No\" --> DIRECT[\"Private CA から直接発行<br/>またはコネクタで自動化\"]\n",
  "diag-29": "flowchart TD\n    ROOT[\"ルートゾーン<br/>信頼の起点(トラストアンカー)\"] --> TLD[\".com などの TLD<br/>DS レコードで下位を保証\"]\n    TLD --> ZONE[\"お客様のドメインのゾーン<br/>KSK が ZSK を保証・ZSK がレコードに署名\"]\n    ZONE --> REC[\"署名付きの DNS 応答\"]\n    REC --> RESV[\"DNSSEC 検証対応のリゾルバー<br/>署名を検証し 不正なら SERVFAIL\"]\n",
  "diag-30": "flowchart TD\n    subgraph PUB[\"パブリック DNS\"]\n        PZ[\"Route 53 パブリックホストゾーン<br/>DNSSEC 署名\"] --> PL[\"クエリログ<br/>CloudWatch Logs\"]\n    end\n    subgraph VPCDNS[\"VPC 内の DNS\"]\n        WL[\"ワークロード\"] --> RV[\"Route 53 Resolver<br/>DNSSEC 検証\"]\n        RV --> FW[\"DNS Firewall<br/>悪性ドメインのブロック\"]\n        RV --> QL[\"Resolver クエリログ\"]\n        RV --> PHZ[\"プライベートホストゾーン<br/>内部名の解決\"]\n    end\n    subgraph HYB[\"ハイブリッド DNS\"]\n        OUT[\"アウトバウンド Resolver エンドポイント<br/>オンプレの DNS へ転送\"]\n        INB[\"インバウンド Resolver エンドポイント<br/>オンプレからの問い合わせ受付\"]\n    end\n    RV --> OUT\n    INB --> RV\n",
  "diag-31": "flowchart TD\n    Q[\"問題文を読む\"] --> K1[\"キーワード抽出<br/>通信方向 / 保護対象 / 運用負荷 / 規制\"]\n    K1 --> D1{\"通信方向は?\"}\n    D1 -- \"インバウンド\" --> I1[\"WAF / Shield / NFW ingress / CloudFront\"]\n    D1 -- \"アウトバウンド\" --> I2[\"NFW ドメインリスト / プロキシ / DNS Firewall\"]\n    D1 -- \"VPC 間・内部\" --> I3[\"SG / NACL / TGW ルート分離 / エンドポイントポリシー\"]\n    D1 -- \"オンプレ接続\" --> I4[\"IPsec / MACsec / Private IP VPN\"]\n    I1 --> F[\"「マネージド・最小運用・既存要件」で絞り込み\"]\n    I2 --> F\n    I3 --> F\n    I4 --> F\n    F --> V{\"検証・監査の設問か?\"}\n    V -- \"Yes\" --> L[\"Flow Logs / Mirroring / CloudTrail / Config / Firewall Manager\"]\n    V -- \"No\" --> ANS[\"最も要件に合う選択肢を選ぶ\"]\n    L --> ANS\n"
} as const;
export type DiagramId = keyof typeof DIAGRAMS;
export const NAV_ITEMS = [
  {
    "id": "sec-0",
    "label": "0. この試験ドメインの全体像",
    "level": 2
  },
  {
    "id": "h3-1",
    "label": "試験形式のおさらい(公式ガイドより)",
    "level": 3
  },
  {
    "id": "sec-2",
    "label": "1. 基礎: セキュリティの考え方",
    "level": 2
  },
  {
    "id": "s1-1",
    "label": "1-1. 共有責任モデル(Shared Responsibility Model)",
    "level": 3
  },
  {
    "id": "s1-2",
    "label": "1-2. 多層防御(Defense in Depth)",
    "level": 3
  },
  {
    "id": "s1-3",
    "label": "1-3. ベストプラクティスの原則(Domain 4 全体に共通)",
    "level": 3
  },
  {
    "id": "task-4-1",
    "label": "Task 4.1 ネットワーク機能の実装・保守(セキュリティ/コンプライアンス要件)",
    "level": 2
  },
  {
    "id": "sec-7",
    "label": "2. 脅威モデルと一般的な脅威",
    "level": 2
  },
  {
    "id": "s2-1",
    "label": "2-1. 脅威モデリングとは",
    "level": 3
  },
  {
    "id": "s2-2",
    "label": "2-2. STRIDE と AWS の対策マッピング",
    "level": 3
  },
  {
    "id": "s2-3",
    "label": "2-3. 一般的なネットワーク脅威と対策",
    "level": 3
  },
  {
    "id": "sec-11",
    "label": "3. インバウンド通信の保護(AWS WAF / AWS Shield / Network Firewall)",
    "level": 2
  },
  {
    "id": "s3-1",
    "label": "3-1. 全体像: 外から内へ、層ごとに守る",
    "level": 3
  },
  {
    "id": "s3-2",
    "label": "3-2. AWS Shield(DDoS 対策)",
    "level": 3
  },
  {
    "id": "s3-3",
    "label": "3-3. AWS WAF(L7 のウェブ攻撃対策)",
    "level": 3
  },
  {
    "id": "s3-4",
    "label": "3-4. AWS Network Firewall(VPC の入口・出口・VPC 間を検査)",
    "level": 3
  },
  {
    "id": "s3-5",
    "label": "3-5. Network Firewall でインバウンド通信を検査する構成(ingress routing)",
    "level": 3
  },
  {
    "id": "s3-6",
    "label": "3-6. Gateway Load Balancer(GWLB)で第三者アプライアンスを使う",
    "level": 3
  },
  {
    "id": "s3-7",
    "label": "3-7. 選択の目安(インバウンド)",
    "level": 3
  },
  {
    "id": "sec-19",
    "label": "4. アウトバウンド通信の保護",
    "level": 2
  },
  {
    "id": "s4-1",
    "label": "4-1. なぜ出口制御が必要か",
    "level": 3
  },
  {
    "id": "s4-2",
    "label": "4-2. 出口制御の選択肢",
    "level": 3
  },
  {
    "id": "s4-3",
    "label": "4-3. 集中型の出口(Centralized egress)",
    "level": 3
  },
  {
    "id": "s4-4",
    "label": "4-4. DNS による持ち出しを防ぐ",
    "level": 3
  },
  {
    "id": "sec-24",
    "label": "5. VPC 間・VPC 内通信の保護",
    "level": 2
  },
  {
    "id": "s5-1",
    "label": "5-1. セキュリティグループ(SG)とネットワーク ACL(NACL)",
    "level": 3
  },
  {
    "id": "s5-2",
    "label": "5-2. VPC エンドポイントとエンドポイントポリシー",
    "level": 3
  },
  {
    "id": "s5-3",
    "label": "5-3. VPC 間接続でのセキュリティ",
    "level": 3
  },
  {
    "id": "s5-4",
    "label": "5-4. Firewall Manager による一元管理",
    "level": 3
  },
  {
    "id": "sec-29",
    "label": "6. セキュリティ・コンプライアンスを満たすアーキテクチャ",
    "level": 2
  },
  {
    "id": "s6-1",
    "label": "6-1. 3 層アーキテクチャ(Three-tier)",
    "level": 3
  },
  {
    "id": "s6-2",
    "label": "6-2. 境界(Perimeter)VPC / 信頼できないネットワーク(Untrusted)",
    "level": 3
  },
  {
    "id": "s6-3",
    "label": "6-3. 集中型検査(East-West も含む)",
    "level": 3
  },
  {
    "id": "s6-4",
    "label": "6-4. 要件別の設計ガイド",
    "level": 3
  },
  {
    "id": "sec-34",
    "label": "7. コンプライアンスのテストとインシデント自動通知",
    "level": 2
  },
  {
    "id": "s7-1",
    "label": "7-1. 要件が満たされているかのテスト",
    "level": 3
  },
  {
    "id": "s7-2",
    "label": "7-2. セキュリティインシデントの自動検出・通知・対応",
    "level": 3
  },
  {
    "id": "task-4-2",
    "label": "Task 4.2 ネットワーク監視・ログによる検証と監査",
    "level": 2
  },
  {
    "id": "sec-38",
    "label": "8. 監視・ログサービスの全体像",
    "level": 2
  },
  {
    "id": "sec-39",
    "label": "9. VPC Flow Logs",
    "level": 2
  },
  {
    "id": "s9-1",
    "label": "9-1. 基本",
    "level": 3
  },
  {
    "id": "s9-2",
    "label": "9-2. 基本フィールド(バージョン 2・既定フォーマット)",
    "level": 3
  },
  {
    "id": "s9-3",
    "label": "9-3. 拡張フィールド(カスタムフォーマットで追加)",
    "level": 3
  },
  {
    "id": "s9-4",
    "label": "9-4. Flow Logs に記録されないトラフィック(試験頻出)",
    "level": 3
  },
  {
    "id": "s9-5",
    "label": "9-5. 作成と分析の流れ",
    "level": 3
  },
  {
    "id": "s9-6",
    "label": "9-6. ACCEPT / REJECT の読み方",
    "level": 3
  },
  {
    "id": "s9-7",
    "label": "9-7. ベストプラクティス",
    "level": 3
  },
  {
    "id": "sec-47",
    "label": "10. VPC Traffic Mirroring",
    "level": 2
  },
  {
    "id": "s10-1",
    "label": "10-1. 何ができるか",
    "level": 3
  },
  {
    "id": "s10-2",
    "label": "10-2. 重要な仕様",
    "level": 3
  },
  {
    "id": "s10-3",
    "label": "10-3. Flow Logs と Traffic Mirroring の使い分け",
    "level": 3
  },
  {
    "id": "sec-51",
    "label": "11. Amazon CloudWatch(アラーム・カスタムメトリクス・Logs Insights)",
    "level": 2
  },
  {
    "id": "s11-1",
    "label": "11-1. セキュリティ/ネットワーク監視でよく使う標準メトリクス",
    "level": 3
  },
  {
    "id": "s11-2",
    "label": "11-2. アラームの種類",
    "level": 3
  },
  {
    "id": "s11-3",
    "label": "11-3. ログからカスタムメトリクスを作る(メトリクスフィルタ)",
    "level": 3
  },
  {
    "id": "s11-4",
    "label": "11-4. その他の便利機能",
    "level": 3
  },
  {
    "id": "sec-56",
    "label": "12. CloudTrail と各サービスのログ",
    "level": 2
  },
  {
    "id": "s12-1",
    "label": "12-1. AWS CloudTrail(誰が何を変えたか)",
    "level": 3
  },
  {
    "id": "s12-2",
    "label": "12-2. サービス別アクセスログ一覧(試験頻出)",
    "level": 3
  },
  {
    "id": "sec-59",
    "label": "13. ログ配信と複数ソースの相関分析",
    "level": 2
  },
  {
    "id": "s13-1",
    "label": "13-1. 配信メカニズムの選び方",
    "level": 3
  },
  {
    "id": "s13-2",
    "label": "13-2. マルチアカウントの集約ログ構成",
    "level": 3
  },
  {
    "id": "s13-3",
    "label": "13-3. 相関分析の考え方(例: 不審な外部通信の調査)",
    "level": 3
  },
  {
    "id": "sec-63",
    "label": "14. ネットワーク監査戦略",
    "level": 2
  },
  {
    "id": "s14-1",
    "label": "14-1. 監査ツールの役割分担",
    "level": 3
  },
  {
    "id": "s14-2",
    "label": "14-2. Firewall Manager の SG ポリシー 3 種類",
    "level": 3
  },
  {
    "id": "s14-3",
    "label": "14-3. Transit Gateway Network Manager",
    "level": 3
  },
  {
    "id": "s14-4",
    "label": "14-4. 複数アカウントでの監査戦略",
    "level": 3
  },
  {
    "id": "task-4-3",
    "label": "Task 4.3 データ・通信の機密性",
    "level": 2
  },
  {
    "id": "sec-69",
    "label": "15. ネットワーク暗号化の全体像",
    "level": 2
  },
  {
    "id": "s15-1",
    "label": "15-1. 通信経路ごとの暗号化手段",
    "level": 3
  },
  {
    "id": "s15-2",
    "label": "15-2. VPC Encryption Controls(新しい機能)",
    "level": 3
  },
  {
    "id": "s15-3",
    "label": "15-3. 共有責任モデルにおける暗号化",
    "level": 3
  },
  {
    "id": "sec-73",
    "label": "16. VPN・Direct Connect の暗号化",
    "level": 2
  },
  {
    "id": "s16-1",
    "label": "16-1. Site-to-Site VPN(IPsec)",
    "level": 3
  },
  {
    "id": "s16-2",
    "label": "16-2. Direct Connect + 暗号化",
    "level": 3
  },
  {
    "id": "sec-76",
    "label": "17. TLS 終端と各サービスでの転送中データ暗号化",
    "level": 2
  },
  {
    "id": "s17-1",
    "label": "17-1. TLS 終端パターン",
    "level": 3
  },
  {
    "id": "s17-2",
    "label": "17-2. 各サービスでの暗号化ポイント",
    "level": 3
  },
  {
    "id": "s17-3",
    "label": "17-3. クライアント接続(参考)",
    "level": 3
  },
  {
    "id": "sec-80",
    "label": "18. 証明書管理(ACM / AWS Private CA)",
    "level": 2
  },
  {
    "id": "s18-1",
    "label": "18-1. サービスの違い",
    "level": 3
  },
  {
    "id": "s18-2",
    "label": "18-2. ACM の重要ポイント(試験頻出)",
    "level": 3
  },
  {
    "id": "s18-3",
    "label": "18-3. AWS Private CA の階層設計",
    "level": 3
  },
  {
    "id": "s18-4",
    "label": "18-4. 証明書戦略の選び方",
    "level": 3
  },
  {
    "id": "sec-85",
    "label": "19. DNS のセキュリティ",
    "level": 2
  },
  {
    "id": "s19-1",
    "label": "19-1. DNSSEC とは",
    "level": 3
  },
  {
    "id": "s19-2",
    "label": "19-2. Route 53 での DNSSEC 署名の手順",
    "level": 3
  },
  {
    "id": "s19-3",
    "label": "19-3. Route 53 Resolver の DNSSEC 検証",
    "level": 3
  },
  {
    "id": "s19-4",
    "label": "19-4. 安全な DNS 通信の全体設計",
    "level": 3
  },
  {
    "id": "sec-90",
    "label": "20. 試験対策: 頻出パターン早見表",
    "level": 2
  },
  {
    "id": "s20-1",
    "label": "20-1. 要件 → 答え",
    "level": 3
  },
  {
    "id": "s20-2",
    "label": "20-2. 問題の解き方(フロー)",
    "level": 3
  },
  {
    "id": "sec-93",
    "label": "21. 確認問題",
    "level": 2
  },
  {
    "id": "sec-94",
    "label": "22. 参考 URL 一覧",
    "level": 2
  },
  {
    "id": "s22-1",
    "label": "22-1. 試験ガイド(アンカー)",
    "level": 3
  },
  {
    "id": "s22-2",
    "label": "22-2. Task 4.1 関連",
    "level": 3
  },
  {
    "id": "s22-3",
    "label": "22-3. Task 4.2 関連",
    "level": 3
  },
  {
    "id": "s22-4",
    "label": "22-4. Task 4.3 関連",
    "level": 3
  }
] as const;
export const MERMAID_CONFIG = {
  "theme": "base",
  "themeVariables": {
    "fontSize": "16px",
    "background": "#ffffff",
    "primaryColor": "#e8edff",
    "primaryTextColor": "#1f2a44",
    "primaryBorderColor": "#9fb1ea",
    "lineColor": "#6b7fb8",
    "secondaryColor": "#f0f3fa",
    "tertiaryColor": "#f0f3fa",
    "edgeLabelBackground": "#ffffff",
    "clusterBkg": "#f7f9ff",
    "clusterBorder": "#b8c4ea",
    "nodeTextColor": "#1f2a44"
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
};
