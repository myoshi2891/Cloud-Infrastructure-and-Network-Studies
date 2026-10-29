export const DIAGRAMS: Record<string, string> = {
    "diag-0": "flowchart TB\nD2[\"Domain 2: Design for New Solutions\"]\nT1[\"Task 2.1<br/>デプロイ戦略<br/>運用上の優秀性\"]\nT2[\"Task 2.2<br/>ビジネス継続性<br/>信頼性 DR\"]\nT3[\"Task 2.3<br/>セキュリティ統制<br/>セキュリティ\"]\nT4[\"Task 2.4<br/>信頼性要件<br/>信頼性 可用性\"]\nT5[\"Task 2.5<br/>パフォーマンス目標<br/>パフォーマンス効率\"]\nT6[\"Task 2.6<br/>コスト最適化<br/>コスト最適化\"]\nD2 --> T1\nD2 --> T2\nD2 --> T3\nD2 --> T4\nD2 --> T5\nD2 --> T6\n\nclassDef highlightFill fill:#dbe6ff,stroke:#3556d6,color:#13204a;\nclass D2 highlightFill",
    "diag-1": "flowchart LR\nA[\"コード変更<br/>CodeCommit または GitHub\"] --> B[\"Source<br/>CodePipeline\"]\nB --> C[\"Build and Test<br/>CodeBuild\"]\nC --> D[\"Deploy<br/>CodeDeploy または CloudFormation\"]\nD --> E{\"ヘルスチェック<br/>CloudWatch アラーム\"}\nE -->|\"正常\"| F[\"本番反映完了\"]\nE -->|\"異常\"| G[\"自動ロールバック\"]\n\nclassDef dangerFill fill:#ffdfe5,stroke:#c0213f,color:#5c1020;\nclassDef successFill fill:#d7f1e2,stroke:#1d7f4e,color:#0f3d26;\nclass G dangerFill\nclass F successFill",
    "diag-2": "flowchart TB\nU[\"ユーザー\"] --> ALB[\"ALB 加重ターゲットグループ<br/>リクエスト単位で分散\"]\nALB -->|\"90 パーセント\"| BLUE[\"Blue 環境 現行バージョン\"]\nALB -->|\"10 パーセント\"| GREEN[\"Green 環境 新バージョン\"]\nGREEN --> CHECK{\"アラーム監視\"}\nCHECK -->|\"問題なし\"| SHIFT[\"100 パーセントを Green へ\"]\nCHECK -->|\"問題あり\"| BACK[\"Blue へ即時切り戻し\"]\n\nclassDef dangerFill fill:#ffdfe5,stroke:#c0213f,color:#5c1020;\nclassDef successFill fill:#d7f1e2,stroke:#1d7f4e,color:#0f3d26;\nclass BACK dangerFill\nclass SHIFT successFill",
    "diag-3": "flowchart LR\nA[\"現状把握<br/>依存関係と要件\"] --> B[\"小さく開始<br/>非重要ワークロード\"]\nB --> C[\"並行稼働<br/>新旧同時運用\"]\nC --> D[\"段階的切替<br/>加重ルーティング\"]\nD --> E[\"旧環境の撤去<br/>ロールバック期間後\"]",
    "diag-4": "flowchart TB\nG[\"AWS グローバルインフラ\"]\nR[\"リージョン<br/>地理的に離れた独立した地域\"]\nAZ[\"アベイラビリティゾーン<br/>リージョン内の独立した拠点\"]\nE[\"エッジロケーション<br/>CloudFront などの配信拠点\"]\nLZ[\"Local Zones / Wavelength<br/>ユーザー近くへの拡張\"]\nG --> R\nR --> AZ\nG --> E\nG --> LZ",
    "diag-5": "flowchart LR\nA[\"最後のバックアップ<br/>または複製時点\"] -->|\"RPO<br/>失ってよいデータの期間\"| B[\"障害発生\"]\nB -->|\"RTO<br/>復旧までに許容できる時間\"| C[\"サービス復旧\"]\n\nclassDef dangerFill fill:#ffdfe5,stroke:#c0213f,color:#5c1020;\nclassDef successFill fill:#d7f1e2,stroke:#1d7f4e,color:#0f3d26;\nclass B dangerFill\nclass C successFill",
    "diag-6": "flowchart LR\nS[\"要件確認<br/>RTO と RPO の両方\"] --> Q1{\"RTO・RPO とも<br/>数時間以上でよい?\"}\nQ1 -->|\"はい\"| BR[\"バックアップと<br/>リストア\"]\nQ1 -->|\"いいえ\"| Q2{\"RTO・RPO とも<br/>数十分程度でよい?\"}\nQ2 -->|\"はい\"| PL[\"パイロットライト\"]\nQ2 -->|\"いいえ\"| Q3{\"RTO・RPO とも<br/>ほぼゼロが必須?\"}\nQ3 -->|\"いいえ 分単位\"| WS[\"ウォームスタンバイ\"]\nQ3 -->|\"はい\"| AA[\"マルチサイト<br/>Active/Active\"]\n\nclassDef highlightFill fill:#dbe6ff,stroke:#3556d6,color:#13204a;\nclassDef successFill fill:#d7f1e2,stroke:#1d7f4e,color:#0f3d26;\nclassDef warnFill fill:#ffe8c7,stroke:#a85f0a,color:#4a2a00;\nclassDef dangerFill fill:#ffdfe5,stroke:#c0213f,color:#5c1020;\nclass BR highlightFill\nclass PL successFill\nclass WS warnFill\nclass AA dangerFill",
    "diag-7": "flowchart TB\nU[\"ユーザー\"] --> R53[\"Route 53<br/>フェイルオーバーポリシー\"]\nHC[\"ヘルスチェック\"] --> R53\nR53 -->|\"正常時\"| P[\"プライマリ環境<br/>東京リージョン\"]\nR53 -->|\"異常検知時\"| S[\"セカンダリ環境<br/>大阪リージョン\"]\nP --> HC\n\nclassDef successFill fill:#d7f1e2,stroke:#1d7f4e,color:#0f3d26;\nclassDef warnFill fill:#ffe8c7,stroke:#a85f0a,color:#4a2a00;\nclass P successFill\nclass S warnFill",
    "diag-8": "flowchart TB\nR[\"リクエスト\"] --> D1{\"明示的な Deny が<br/>ある?\"}\nD1 -->|\"はい\"| X[\"拒否\"]\nD1 -->|\"いいえ\"| D2{\"Organizations SCP や<br/>権限境界で許可範囲内?\"}\nD2 -->|\"いいえ\"| X\nD2 -->|\"はい\"| D3{\"アイデンティティベースまたは<br/>リソースベースで Allow ある?\"}\nD3 -->|\"はい\"| OK[\"許可\"]\nD3 -->|\"いいえ\"| X\n\nclassDef dangerFill fill:#ffdfe5,stroke:#c0213f,color:#5c1020;\nclassDef successFill fill:#d7f1e2,stroke:#1d7f4e,color:#0f3d26;\nclass X dangerFill\nclass OK successFill",
    "diag-9": "flowchart LR\nI[\"インターネット\"] --> ALB[\"ALB<br/>パブリックサブネット\"]\nALB -->|\"SG: ALB から 443 のみ\"| APP[\"アプリ層<br/>プライベートサブネット\"]\nAPP -->|\"SG: アプリ層から 3306 のみ\"| DB[\"DB 層<br/>プライベートサブネット\"]\n\nclassDef highlightFill fill:#dbe6ff,stroke:#3556d6,color:#13204a;\nclass DB highlightFill",
    "diag-10": "flowchart TB\nsubgraph REST[\"保存時の暗号化\"]\nK[\"AWS KMS<br/>カスタマー管理キー\"] --> S3[\"S3 SSE-KMS\"]\nK --> EBS[\"EBS 暗号化\"]\nK --> RDS[\"RDS 暗号化\"]\nend\nsubgraph TRANSIT[\"転送時の暗号化\"]\nACM[\"AWS Certificate Manager\"] --> CF[\"CloudFront と ALB で TLS\"]\nend",
    "diag-11": "flowchart LR\nEC2[\"プライベートサブネットの EC2\"] -->|\"ルートテーブル\"| GW[\"ゲートウェイエンドポイント\"]\nGW --> S3[\"Amazon S3\"]\nEC2 -->|\"ENI\"| IF[\"インターフェースエンドポイント\"]\nIF --> SSM[\"Systems Manager など\"]",
    "diag-12": "flowchart LR\nU[\"ユーザー と 攻撃者\"] --> R53[\"Route 53<br/>Shield で DNS を保護\"]\nR53 --> CF[\"CloudFront<br/>エッジで吸収<br/>Shield と WAF\"]\nCF --> ALB[\"ALB<br/>WAF 適用\"]\nALB --> ASG[\"Auto Scaling<br/>EC2 または コンテナ\"]\nASG --> DB[\"データ層<br/>プライベートサブネット\"]\n\nclassDef highlightFill fill:#dbe6ff,stroke:#3556d6,color:#13204a;\nclass CF highlightFill",
    "diag-13": "flowchart TB\nU[\"ユーザー\"] --> R53[\"Route 53\"]\nR53 --> ALB[\"Application Load Balancer<br/>複数 AZ に配置\"]\nALB --> A1[\"EC2 AZ-a<br/>Auto Scaling\"]\nALB --> A2[\"EC2 AZ-c<br/>Auto Scaling\"]\nA1 --> DBP[\"Aurora ライター<br/>AZ-a\"]\nA2 --> DBP\nDBP -.->|\"レプリケーション\"| DBR[\"Aurora リーダー<br/>AZ-c\"]\n\nclassDef highlightFill fill:#dbe6ff,stroke:#3556d6,color:#13204a;\nclass DBP,DBR highlightFill",
    "diag-14": "flowchart LR\nP[\"注文受付 API\"] --> SNS[\"Amazon SNS<br/>トピック\"]\nSNS --> Q1[\"SQS キュー 決済処理\"]\nSNS --> Q2[\"SQS キュー 在庫更新\"]\nSNS --> Q3[\"SQS キュー 通知\"]\nQ1 --> W1[\"ワーカー Auto Scaling\"]\nQ2 --> W2[\"ワーカー Auto Scaling\"]\nQ3 --> W3[\"Lambda\"]\nQ1 -.->|\"失敗を繰り返したら\"| DLQ[\"デッドレターキュー\"]\n\nclassDef dangerFill fill:#ffdfe5,stroke:#c0213f,color:#5c1020;\nclass DLQ dangerFill",
    "diag-15": "flowchart TB\nS[\"データの種類は?\"] --> O{\"オブジェクト<br/>画像 動画 ログ\"}\nS --> B{\"ブロック<br/>OS 起動 DB\"}\nS --> F{\"共有ファイル\"}\nO --> S3[\"Amazon S3\"]\nB --> EBS[\"Amazon EBS\"]\nB --> IS[\"インスタンスストア<br/>一時データ 超高速\"]\nF --> EFS[\"Amazon EFS<br/>Linux NFS\"]\nF --> FSX[\"Amazon FSx<br/>Windows Lustre ONTAP OpenZFS\"]",
    "diag-16": "flowchart TB\nQ[\"データとアクセスの特徴は?\"] --> A{\"複雑な結合 ACID<br/>リレーショナル\"}\nQ --> B{\"キーによる高速アクセス<br/>大規模 ミリ秒\"}\nQ --> C{\"マイクロ秒の<br/>インメモリ\"}\nQ --> D{\"関係性 グラフ\"}\nQ --> E{\"時系列\"}\nQ --> F{\"分析 DWH\"}\nQ --> G{\"全文検索 ログ分析\"}\nA --> RDS[\"Amazon RDS または Aurora\"]\nB --> DDB[\"Amazon DynamoDB\"]\nC --> EC[\"ElastiCache または MemoryDB\"]\nD --> NEP[\"Amazon Neptune\"]\nE --> TS[\"Timestream for InfluxDB<br/>新規 / LiveAnalytics は既存顧客\"]\nF --> RS[\"Amazon Redshift\"]\nG --> OS[\"Amazon OpenSearch Service\"]",
    "diag-17": "flowchart LR\nU[\"ユーザー\"] --> CF[\"CloudFront<br/>エッジキャッシュ\"]\nCF --> ALB[\"ALB\"]\nALB --> APP[\"アプリ\"]\nAPP --> CACHE[\"ElastiCache<br/>アプリ側キャッシュ\"]\nAPP --> RP[\"RDS Proxy<br/>接続プール\"]\nRP --> W[\"DB ライター\"]\nRP --> RR[\"DB リードレプリカ\"]\nAPP --> Q[\"SQS または Kinesis<br/>バッファ\"]\n\nclassDef highlightFill fill:#dbe6ff,stroke:#3556d6,color:#13204a;\nclassDef warnFill fill:#ffe8c7,stroke:#a85f0a,color:#4a2a00;\nclass CF highlightFill\nclass CACHE warnFill",
    "diag-18": "flowchart LR\nA[\"設計前<br/>Pricing Calculator で見積\"] --> B[\"運用中<br/>Cost Explorer で分析\"]\nB --> C[\"統制<br/>Budgets と Anomaly Detection\"]\nC --> D[\"最適化<br/>Compute Optimizer と Trusted Advisor\"]\nD --> B",
    "diag-19": "flowchart TB\nS[\"ワークロードの特徴\"] --> Q1{\"中断されても<br/>再実行できる?\"}\nQ1 -->|\"はい\"| SP[\"スポットインスタンス\"]\nQ1 -->|\"いいえ\"| Q2{\"1年以上<br/>安定して使う?\"}\nQ2 -->|\"いいえ\"| OD[\"オンデマンド\"]\nQ2 -->|\"はい\"| Q3{\"インスタンス構成が<br/>変わる可能性がある?\"}\nQ3 -->|\"はい\"| CSP[\"Compute Savings Plans<br/>またはコンバーチブル RI\"]\nQ3 -->|\"いいえ 固定\"| ISP[\"EC2 Instance Savings Plans<br/>またはスタンダード RI\"]\n\nclassDef warnFill fill:#ffe8c7,stroke:#a85f0a,color:#4a2a00;\nclassDef successFill fill:#d7f1e2,stroke:#1d7f4e,color:#0f3d26;\nclass SP warnFill\nclass CSP successFill",
    "diag-20": "flowchart LR\nA[\"S3 Standard<br/>作成直後\"] -->|\"30日後<br/>128 KiB 以上のみ\"| B[\"Standard-IA\"]\nB -->|\"90日後\"| C[\"Glacier Flexible Retrieval\"]\nC -->|\"365日後\"| D[\"Glacier Deep Archive\"]\nD -->|\"7年後\"| E[\"削除\"]\nA -->|\"128 KiB 未満は既定で移行せず<br/>Standard のまま7年後\"| E",
    "diag-21": "flowchart TB\nA[\"データ転送コストを下げる\"] --> B[\"S3 と DynamoDB は<br/>ゲートウェイエンドポイント\"]\nA --> C[\"CloudFront でキャッシュし<br/>オリジン転送を削減\"]\nA --> D[\"同一 AZ 内で完結する設計<br/>AZ 間通信を減らす\"]\nA --> E[\"データを圧縮し<br/>不要な転送を避ける\"]\nA --> F[\"大量転送は Direct Connect や<br/>Snow ファミリーを検討\"]",
    "diag-22": "flowchart LR\nA[\"1 公式試験ガイドで<br/>範囲を確認\"] --> B[\"2 本ガイドで<br/>概念と比較表を理解\"]\nB --> C[\"3 Well-Architected<br/>各柱を読む\"]\nC --> D[\"4 ハンズオンで<br/>実際に構築\"]\nD --> E[\"5 模擬問題で<br/>最適化キーワード練習\"]\nE --> F[\"6 弱点を<br/>公式ドキュメントで補強\"]"
};
export const NAV_ITEMS = [
    {
        "id": "1-このガイドの使い方",
        "label": "1. このガイドの使い方",
        "level": 2
    },
    {
        "id": "初学者がつまずきやすい用語先に確認",
        "label": "初学者がつまずきやすい用語(先に確認)",
        "level": 3
    },
    {
        "id": "2-domain-2-の全体像",
        "label": "2. Domain 2 の全体像",
        "level": 2
    },
    {
        "id": "3-task-21-デプロイ戦略の設計",
        "label": "3. Task 2.1 デプロイ戦略の設計",
        "level": 2
    },
    {
        "id": "step-1-何を問われるか",
        "label": "Step 1: 何を問われるか",
        "level": 3
    },
    {
        "id": "step-2-a-infrastructure-as-codeiac",
        "label": "Step 2-A: Infrastructure as Code(IaC)",
        "level": 3
    },
    {
        "id": "step-2-b-cicd継続的インテグレーション継続的デリバリー",
        "label": "Step 2-B: CI/CD(継続的インテグレーション/継続的デリバリー)",
        "level": 3
    },
    {
        "id": "step-2-c-変更管理change-management",
        "label": "Step 2-C: 変更管理(Change Management)",
        "level": 3
    },
    {
        "id": "step-2-d-構成管理aws-systems-manager",
        "label": "Step 2-D: 構成管理(AWS Systems Manager)",
        "level": 3
    },
    {
        "id": "step-2-e-移行アップグレード経路とマネージドサービス活用",
        "label": "Step 2-E: 移行/アップグレード経路とマネージドサービス活用",
        "level": 3
    },
    {
        "id": "step-3-task-21-試験のコツ",
        "label": "Step 3: Task 2.1 試験のコツ",
        "level": 3
    },
    {
        "id": "4-task-22-ビジネス継続性の確保",
        "label": "4. Task 2.2 ビジネス継続性の確保",
        "level": 2
    },
    {
        "id": "step-1-何を問われるか-1",
        "label": "Step 1: 何を問われるか",
        "level": 3
    },
    {
        "id": "step-2-a-aws-グローバルインフラの基礎",
        "label": "Step 2-A: AWS グローバルインフラの基礎",
        "level": 3
    },
    {
        "id": "step-2-b-rto-と-rpo",
        "label": "Step 2-B: RTO と RPO",
        "level": 3
    },
    {
        "id": "step-2-c-dr-4戦略最重要",
        "label": "Step 2-C: DR 4戦略(最重要)",
        "level": 3
    },
    {
        "id": "step-2-d-データとデータベースのレプリケーション",
        "label": "Step 2-D: データとデータベースのレプリケーション",
        "level": 3
    },
    {
        "id": "step-2-e-route-53-とフェイルオーバー",
        "label": "Step 2-E: Route 53 とフェイルオーバー",
        "level": 3
    },
    {
        "id": "step-2-f-バックアップの自動化aws-backup",
        "label": "Step 2-F: バックアップの自動化(AWS Backup)",
        "level": 3
    },
    {
        "id": "step-2-g-dr-テストと集中監視",
        "label": "Step 2-G: DR テストと集中監視",
        "level": 3
    },
    {
        "id": "step-3-task-22-試験のコツ",
        "label": "Step 3: Task 2.2 試験のコツ",
        "level": 3
    },
    {
        "id": "5-task-23-要件に基づくセキュリティ統制の決定",
        "label": "5. Task 2.3 要件に基づくセキュリティ統制の決定",
        "level": 2
    },
    {
        "id": "step-1-何を問われるか-2",
        "label": "Step 1: 何を問われるか",
        "level": 3
    },
    {
        "id": "step-2-a-iam-と最小権限",
        "label": "Step 2-A: IAM と最小権限",
        "level": 3
    },
    {
        "id": "step-2-b-ネットワーク統制ルートテーブルセキュリティグループnacl",
        "label": "Step 2-B: ネットワーク統制(ルートテーブル、セキュリティグループ、NACL)",
        "level": 3
    },
    {
        "id": "step-2-c-暗号化保存時転送時",
        "label": "Step 2-C: 暗号化(保存時・転送時)",
        "level": 3
    },
    {
        "id": "step-2-d-aws-サービスエンドポイントvpc-エンドポイント",
        "label": "Step 2-D: AWS サービスエンドポイント(VPC エンドポイント)",
        "level": 3
    },
    {
        "id": "step-2-e-認証情報の管理",
        "label": "Step 2-E: 認証情報の管理",
        "level": 3
    },
    {
        "id": "step-2-f-マネージドセキュリティサービス",
        "label": "Step 2-F: マネージドセキュリティサービス",
        "level": 3
    },
    {
        "id": "step-2-g-大規模-web-アプリへの攻撃緩和",
        "label": "Step 2-G: 大規模 Web アプリへの攻撃緩和",
        "level": 3
    },
    {
        "id": "step-2-h-パッチ管理",
        "label": "Step 2-H: パッチ管理",
        "level": 3
    },
    {
        "id": "step-3-task-23-試験のコツ",
        "label": "Step 3: Task 2.3 試験のコツ",
        "level": 3
    },
    {
        "id": "6-task-24-信頼性要件を満たす戦略の設計",
        "label": "6. Task 2.4 信頼性要件を満たす戦略の設計",
        "level": 2
    },
    {
        "id": "step-1-何を問われるか-3",
        "label": "Step 1: 何を問われるか",
        "level": 3
    },
    {
        "id": "step-2-a-高可用性の基本形multi-az",
        "label": "Step 2-A: 高可用性の基本形(Multi-AZ)",
        "level": 3
    },
    {
        "id": "step-2-b-ストレージとデータベースのレプリケーション戦略",
        "label": "Step 2-B: ストレージとデータベースのレプリケーション戦略",
        "level": 3
    },
    {
        "id": "step-2-c-auto-scalingポリシーとイベント",
        "label": "Step 2-C: Auto Scaling(ポリシーとイベント)",
        "level": 3
    },
    {
        "id": "step-2-d-疎結合アプリケーション統合",
        "label": "Step 2-D: 疎結合(アプリケーション統合)",
        "level": 3
    },
    {
        "id": "step-2-e-サービスクォータ上限",
        "label": "Step 2-E: サービスクォータ(上限)",
        "level": 3
    },
    {
        "id": "step-2-f-dns-ルーティングポリシーroute-53",
        "label": "Step 2-F: DNS ルーティングポリシー(Route 53)",
        "level": 3
    },
    {
        "id": "step-2-g-障害を前提とした設計design-for-failure",
        "label": "Step 2-G: 障害を前提とした設計(Design for Failure)",
        "level": 3
    },
    {
        "id": "step-3-task-24-試験のコツ",
        "label": "Step 3: Task 2.4 試験のコツ",
        "level": 3
    },
    {
        "id": "7-task-25-パフォーマンス目標を満たすソリューション設計",
        "label": "7. Task 2.5 パフォーマンス目標を満たすソリューション設計",
        "level": 2
    },
    {
        "id": "step-1-何を問われるか-4",
        "label": "Step 1: 何を問われるか",
        "level": 3
    },
    {
        "id": "step-2-a-パフォーマンス監視",
        "label": "Step 2-A: パフォーマンス監視",
        "level": 3
    },
    {
        "id": "step-2-b-ストレージの選択",
        "label": "Step 2-B: ストレージの選択",
        "level": 3
    },
    {
        "id": "step-2-c-インスタンスファミリーの選び方",
        "label": "Step 2-C: インスタンスファミリーの選び方",
        "level": 3
    },
    {
        "id": "step-2-d-目的特化型データベースpurpose-built-databases",
        "label": "Step 2-D: 目的特化型データベース(Purpose-built databases)",
        "level": 3
    },
    {
        "id": "step-2-e-キャッシュバッファリングレプリカ",
        "label": "Step 2-E: キャッシュ、バッファリング、レプリカ",
        "level": 3
    },
    {
        "id": "step-2-f-弾力性とライトサイジング",
        "label": "Step 2-F: 弾力性とライトサイジング",
        "level": 3
    },
    {
        "id": "step-3-task-25-試験のコツ",
        "label": "Step 3: Task 2.5 試験のコツ",
        "level": 3
    },
    {
        "id": "8-task-26-コスト最適化戦略の決定",
        "label": "8. Task 2.6 コスト最適化戦略の決定",
        "level": 2
    },
    {
        "id": "step-1-何を問われるか-5",
        "label": "Step 1: 何を問われるか",
        "level": 3
    },
    {
        "id": "step-2-a-コストの可視化と分析ツール",
        "label": "Step 2-A: コストの可視化と分析ツール",
        "level": 3
    },
    {
        "id": "step-2-b-料金モデルの選択",
        "label": "Step 2-B: 料金モデルの選択",
        "level": 3
    },
    {
        "id": "step-2-c-ストレージ階層化s3",
        "label": "Step 2-C: ストレージ階層化(S3)",
        "level": 3
    },
    {
        "id": "step-2-d-データ転送コスト",
        "label": "Step 2-D: データ転送コスト",
        "level": 3
    },
    {
        "id": "step-2-e-マネージドサービスと総保有コストtco",
        "label": "Step 2-E: マネージドサービスと総保有コスト(TCO)",
        "level": 3
    },
    {
        "id": "step-2-f-支出と使用状況の統制",
        "label": "Step 2-F: 支出と使用状況の統制",
        "level": 3
    },
    {
        "id": "step-3-task-26-試験のコツ",
        "label": "Step 3: Task 2.6 試験のコツ",
        "level": 3
    },
    {
        "id": "9-横断-シナリオ別この要件ならこの答え早見表",
        "label": "9. 横断: シナリオ別「この要件ならこの答え」早見表",
        "level": 2
    },
    {
        "id": "10-学習の進め方と最終チェックリスト",
        "label": "10. 学習の進め方と最終チェックリスト",
        "level": 2
    },
    {
        "id": "推奨ステップ",
        "label": "推奨ステップ",
        "level": 3
    },
    {
        "id": "最終チェックリスト",
        "label": "最終チェックリスト",
        "level": 3
    },
    {
        "id": "11-参考url一覧根拠ソース",
        "label": "11. 参考URL一覧(根拠ソース)",
        "level": 2
    },
    {
        "id": "試験ガイド",
        "label": "試験ガイド",
        "level": 3
    },
    {
        "id": "全般well-architected",
        "label": "全般(Well-Architected)",
        "level": 3
    },
    {
        "id": "task-21-デプロイ戦略",
        "label": "Task 2.1 デプロイ戦略",
        "level": 3
    },
    {
        "id": "task-22-ビジネス継続性",
        "label": "Task 2.2 ビジネス継続性",
        "level": 3
    },
    {
        "id": "task-23-セキュリティ",
        "label": "Task 2.3 セキュリティ",
        "level": 3
    },
    {
        "id": "task-24-信頼性",
        "label": "Task 2.4 信頼性",
        "level": 3
    },
    {
        "id": "task-25-パフォーマンス",
        "label": "Task 2.5 パフォーマンス",
        "level": 3
    },
    {
        "id": "task-26-コスト最適化",
        "label": "Task 2.6 コスト最適化",
        "level": 3
    }
] as const;
