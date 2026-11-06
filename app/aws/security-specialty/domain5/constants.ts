export type DiagramId = keyof typeof DIAGRAMS;

export const DIAGRAMS = {
    "diag-0": "flowchart TD\nA[\"アプリ: GenerateDataKey を KMS に依頼\"] --> B[\"KMS: 平文のデータキーと<br/>暗号化済みデータキーを返す\"]\nB --> C[\"アプリ: 平文データキーで<br/>大きなデータを暗号化\"]\nC --> D[\"アプリ: 平文データキーをメモリから破棄\"]\nD --> E[\"暗号文と暗号化済みデータキーを<br/>一緒に保存\"]\nE --> F[\"復号時: 暗号化済みデータキーを<br/>KMS に渡して Decrypt\"]\nF --> G[\"KMS: 平文データキーを返す\"]\nG --> H[\"アプリ: データキーで暗号文を復号\"]",
    "diag-1": "flowchart LR\nU[\"クライアント<br/>ブラウザ・アプリ・拠点\"] -->|\"5.1.1 TLS を強制\"| E[\"入口<br/>ALB・NLB・CloudFront・API Gateway\"]\nU -->|\"5.1.2 閉域・VPN・ゼロトラスト\"| P[\"PrivateLink・Client VPN・Verified Access\"]\nE --> R[\"AWS リソース\"]\nP --> R\nR -->|\"5.1.3 内部通信の暗号化\"| R2[\"他の AWS リソース<br/>EMR・EKS・SageMaker など\"]",
    "diag-2": "flowchart TD\nQ[\"誰が・どこから<br/>リソースにアクセスする?\"] --> A{\"VPC 内の<br/>AWS サービス呼び出し?\"}\nA -->|\"はい\"| B[\"VPC エンドポイント<br/>Gateway 型 / Interface 型\"]\nA -->|\"他アカウント・SaaS の<br/>サービスを私的に使う\"| C[\"AWS PrivateLink<br/>エンドポイントサービス\"]\nQ --> D{\"人が社内ネットワーク的に<br/>VPC へ入りたい?\"}\nD -->|\"はい\"| E[\"AWS Client VPN\"]\nQ --> F{\"VPN なしで社内アプリを<br/>ゼロトラストで公開したい?\"}\nF -->|\"はい\"| G[\"AWS Verified Access\"]",
    "diag-3": "flowchart TD\nS1[\"Step1: 既存 VPC で<br/>Monitor モードを有効化\"] --> S2[\"Step2: VPC Flow Logs の<br/>encryption-status で状態を確認\"]\nS2 --> S3[\"Step3: 平文通信の<br/>リソースを特定\"]\nS3 --> S4[\"Step4: TLS 化・Nitro 対応型へ移行<br/>必要なら除外 Exclusion を登録\"]\nS4 --> S5[\"Step5: Enforce モードへ切り替え\"]\nS5 --> S6[\"以後: 暗号化を強制しない<br/>リソースは作成できない\"]",
    "diag-4": "flowchart TD\nQ[\"暗号鍵の置き場所を選ぶ\"] --> A{\"規制や契約で<br/>専有 HSM が必須?\"}\nA -->|\"はい\"| B{\"AWS サービスの暗号化にも<br/>その鍵を使いたい?\"}\nB -->|\"はい\"| C[\"KMS カスタムキーストア<br/>CloudHSM を裏側に利用\"]\nB -->|\"いいえ・独自アプリ用\"| D[\"CloudHSM を直接利用<br/>PKCS#11 / JCE / CNG\"]\nA -->|\"いいえ\"| E{\"鍵を AWS の外に<br/>置く必要がある?\"}\nE -->|\"はい\"| F[\"KMS 外部キーストア XKS\"]\nE -->|\"いいえ\"| G[\"標準の KMS<br/>カスタマーマネージドキー\"]",
    "diag-5": "flowchart LR\nA[\"Initiate Vault Lock<br/>ポリシーを仮適用\"] --> B[\"InProgress<br/>24 時間の検証期間\"]\nB -->|\"問題あり\"| C[\"Abort<br/>中止して修正\"]\nB -->|\"問題なし\"| D[\"Complete Vault Lock<br/>確定・以後は変更不可\"]\nC --> A",
    "diag-6": "flowchart TD\nA[\"オブジェクト作成\"] --> B[\"Object Lock 保持期間中\"]\nB -->|\"期間中は削除・上書き不可<br/>Lifecycle の Expiration も<br/>実際の削除は保持満了後\"| C[\"保持期間満了\"]\nC --> D[\"Lifecycle の Expiration 条件を満たす\"]\nD --> E[\"自動削除\"]",
    "diag-7": "flowchart TD\nL1[\"1. 自動バックアップ<br/>AWS Backup プラン / DLM\"] --> L2[\"2. 暗号化<br/>ボールトごとの KMS キー\"]\nL2 --> L3[\"3. 不変性<br/>Vault Lock コンプライアンスモード\"]\nL3 --> L4[\"4. 分離<br/>別アカウント + 論理的エアギャップボールト\"]\nL4 --> L5[\"5. 地理的分散<br/>クロスリージョンコピー\"]\nL5 --> L6[\"6. 承認の分離<br/>マルチパーティ承認\"]\nL6 --> L7[\"7. 復旧の実証<br/>復元テストを定期実施\"]",
    "diag-8": "flowchart TD\nT[\"ローテーション開始<br/>スケジュールまたは手動\"] --> S1[\"createSecret<br/>AWSPENDING に新しい認証情報を作成\"]\nS1 --> S2[\"setSecret<br/>DB など対象側に新しい認証情報を設定\"]\nS2 --> S3[\"testSecret<br/>新しい認証情報で接続テスト\"]\nS3 --> S4[\"finishSecret<br/>AWSPENDING を AWSCURRENT に昇格\"]\nS4 --> Z[\"旧版は AWSPREVIOUS になる\"]",
    "diag-9": "flowchart TD\nA[\"Step1: Origin を EXTERNAL にして<br/>KMS キーを作成\"] --> B[\"Step2: GetParametersForImport で<br/>ラッピング公開鍵とインポートトークンを取得\"]\nB --> C[\"Step3: 手元で 256 ビット対称鍵などの<br/>キーマテリアルを生成\"]\nC --> D[\"Step4: 公開鍵でキーマテリアルを<br/>ラッピング(暗号化)\"]\nD --> E[\"Step5: ImportKeyMaterial で<br/>ラップ済み素材とトークンを送信\"]\nE --> F[\"Step6: キーが使用可能になる<br/>有効期限の有無を選択\"]",
    "diag-10": "flowchart TD\nQ[\"KMS キーのキーマテリアルは<br/>どちらにする?\"] --> A{\"鍵の生成を自社で行い<br/>素材の削除権限も必要?\"}\nA -->|\"はい\"| B[\"インポート EXTERNAL<br/>運用負荷と責任が増える\"]\nA -->|\"いいえ\"| C[\"AWS 生成 AWS_KMS<br/>自動ローテーションも利用可\"]\nB --> D[\"原本の安全な保管<br/>期限監視・再インポート手順\"]\nC --> E[\"自動ローテーションを有効化<br/>必要ならマルチリージョンキー\"]",
    "diag-11": "flowchart TD\nA[\"機密データが<br/>流れる可能性がある\"] --> B[\"1. 出さない設計<br/>ログに出力しない・トークン化\"]\nB --> C[\"2. 検出する<br/>Macie と Audit 操作\"]\nC --> D[\"3. 隠す<br/>Logs Deidentify と SNS De-identify\"]\nD --> E[\"4. 見られる人を絞る<br/>logs:Unmask を最小限に\"]\nE --> F[\"5. 監査する<br/>検出結果をアラート化\"]",
    "diag-12": "flowchart LR\nP[\"プライマリキー<br/>ap-northeast-1<br/>mrk-xxxx\"] -->|\"同じキーマテリアルを複製\"| R1[\"レプリカ<br/>us-west-2<br/>mrk-xxxx\"]\nP -->|\"同じキーマテリアルを複製\"| R2[\"レプリカ<br/>eu-west-1<br/>mrk-xxxx\"]\nP -.->|\"キーポリシーは別々に管理\"| N[\"各リージョンで<br/>ポリシーを個別に設定\"]",
    "diag-13": "flowchart TD\nROOT[\"ルート CA<br/>使用を最小化・厳重保護\"] --> SUB1[\"下位 CA 本番用\"]\nROOT --> SUB2[\"下位 CA 開発用\"]\nSUB1 --> C1[\"サーバー証明書<br/>ACM で自動更新\"]\nSUB1 --> C2[\"クライアント証明書<br/>mTLS 用\"]\nSUB2 --> C3[\"開発用証明書\"]",
    "diag-14": "flowchart TD\nSTART[\"データ保護の要件を読む\"] --> T{\"どの状態の<br/>データ?\"}\nT -->|\"転送中\"| T1{\"何を実現?\"}\nT1 -->|\"暗号化の強制\"| T11[\"TLS ポリシー / SecureTransport / リダイレクト\"]\nT1 -->|\"私的アクセス\"| T12[\"VPC エンドポイント / PrivateLink / Client VPN / Verified Access\"]\nT1 -->|\"内部通信\"| T13[\"Nitro / VPC Encryption Controls / EMR・EKS・SageMaker 設定\"]\nT -->|\"保存中\"| R1{\"何を実現?\"}\nR1 -->|\"機密性\"| R11[\"KMS / CloudHSM / SSE / CSE\"]\nR1 -->|\"完全性\"| R12[\"Object Lock / Vault Lock / 署名 / チェックサム\"]\nR1 -->|\"保持と廃棄\"| R13[\"Lifecycle / EFS Lifecycle / DLM\"]\nR1 -->|\"復旧\"| R14[\"AWS Backup / エアギャップ / レプリケーション / DataSync\"]\nT -->|\"鍵・秘密情報\"| S1{\"何を実現?\"}\nS1 -->|\"認証情報\"| S11[\"Secrets Manager 自動ローテーション\"]\nS1 -->|\"鍵素材の主権\"| S12[\"BYOK / XKS / CloudHSM\"]\nS1 -->|\"機密データの隠蔽\"| S13[\"Logs データ保護 / SNS データ保護 / Macie\"]\nS1 -->|\"鍵と証明書の運用\"| S14[\"KMS CMK / マルチリージョンキー / ACM / Private CA\"]"
} as const satisfies Record<string, string>;

export const DIAGRAM_DESCRIPTIONS: Record<DiagramId, string> = {
    "diag-0": "アプリがKMSのGenerateDataKeyを呼び出し、平文データキーで大きなデータを暗号化し平文キーをメモリから破棄するエンベロープ暗号化の基本フロー。",
    "diag-1": "クライアントからALB・CloudFront等の入口でのTLS強制、PrivateLink等の閉域アクセスを経てAWSリソースへ安全に通信するTask 5.1の全体像。",
    "diag-2": "VPCエンドポイント、PrivateLink、Site-to-Site VPN、Direct Connect、Client VPN、Verified Accessの通信要件に応じた全体マップ。",
    "diag-3": "既存VPCでMonitorモードを有効化し、Flow Logsで平文通信を特定してTLS化やNitro対応へ移行するVPC Encryption Controlsの導入ステップ。",
    "diag-4": "専有HSMの要件やAWSサービス暗号化利用の有無に応じてKMS、CloudHSM、カスタムキーストア、XKSを選択する判断フロー。",
    "diag-5": "ポリシー仮適用（InProgress 24時間）を経て確定・変更不可にするS3 Glacier Vault Lockの確定ステップ。",
    "diag-6": "S3 Object Lock保持期間中はLifecycleのExpirationによる削除が保留され、保持期間満了後に安全に削除される連携フロー。",
    "diag-7": "自動バックアップ、KMS暗号化、Vault Lock不変性、別アカウント分離（論理的エアギャップ）を組み合わせたランサムウェア対策の多層防御。",
    "diag-8": "createSecret、setSecret、testSecret、finishSecretの4ステップで認証情報を切り替えるSecrets Managerのローテーション仕組み。",
    "diag-9": "EXTERNALキー作成、ラッピング公開鍵取得、素材生成、ラッピング、ImportKeyMaterialでインポートするキーマテリアル導入手順。",
    "diag-10": "自社生成・即時削除権限の要件に応じてインポート鍵（EXTERNAL）かAWS生成鍵（AWS_KMS）を選択する判断フロー。",
    "diag-11": "出さない設計、Macieによる検出、CloudWatch LogsやSNSでのマスキング（De-identify）による機密データ保護の多層防御。",
    "diag-12": "異なるリージョンに同じキーID・キーマテリアルを複製しつつキーポリシーを個別管理するマルチリージョンキー（MRK）の構成図。",
    "diag-13": "ルートCAを最小限に厳重保護し、下位CA（Subordinate CA）からACM経由でエンドエンティティ証明書を自動更新するプライベートCA構成図。",
    "diag-14": "転送中・保存中・鍵/シークレットの各データ状態と要件から適切なAWSセキュリティサービスを選択する総合判断フロー。"
} as const;

export const NAV_ITEMS = [
    {
        "id": "1-この文書の使い方と試験の全体像",
        "label": "1. この文書の使い方と試験の全体像",
        "level": 2
    },
    {
        "id": "2-基礎知識-データ保護を理解する4つの土台",
        "label": "2. 基礎知識: データ保護を理解する4つの土台",
        "level": 2
    },
    {
        "id": "3-task-51-転送中のデータdata-in-transit",
        "label": "3. Task 5.1: 転送中のデータ(Data in Transit)",
        "level": 2
    },
    {
        "id": "skill-511-暗号化接続の強制",
        "label": "Skill 5.1.1 暗号化接続の強制",
        "level": 3
    },
    {
        "id": "skill-512-安全でプライベートなアクセス",
        "label": "Skill 5.1.2 安全でプライベートなアクセス",
        "level": 3
    },
    {
        "id": "skill-513-リソース間の転送中暗号化",
        "label": "Skill 5.1.3 リソース間の転送中暗号化",
        "level": 3
    },
    {
        "id": "4-task-52-保存中のデータdata-at-rest",
        "label": "4. Task 5.2: 保存中のデータ(Data at Rest)",
        "level": 2
    },
    {
        "id": "skill-521-保存時の暗号化",
        "label": "Skill 5.2.1 保存時の暗号化",
        "level": 3
    },
    {
        "id": "skill-522-データ整合性の保護",
        "label": "Skill 5.2.2 データ整合性の保護",
        "level": 3
    },
    {
        "id": "skill-523-ライフサイクル管理と保持",
        "label": "Skill 5.2.3 ライフサイクル管理と保持",
        "level": 3
    },
    {
        "id": "skill-524-レプリケーションとバックアップ",
        "label": "Skill 5.2.4 レプリケーションとバックアップ",
        "level": 3
    },
    {
        "id": "5-task-53-機密データ認証情報シークレット暗号鍵の保護",
        "label": "5. Task 5.3: 機密データ・認証情報・シークレット・暗号鍵の保護",
        "level": 2
    },
    {
        "id": "skill-531-シークレットの管理とローテーション",
        "label": "Skill 5.3.1 シークレットの管理とローテーション",
        "level": 3
    },
    {
        "id": "skill-532-インポートしたキーマテリアルと外部キーストア",
        "label": "Skill 5.3.2 インポートしたキーマテリアルと外部キーストア",
        "level": 3
    },
    {
        "id": "skill-533-インポート鍵と-aws-生成鍵の違い",
        "label": "Skill 5.3.3 インポート鍵と AWS 生成鍵の違い",
        "level": 3
    },
    {
        "id": "skill-534-機密データのマスキング",
        "label": "Skill 5.3.4 機密データのマスキング",
        "level": 3
    },
    {
        "id": "skill-535-鍵と証明書の作成管理",
        "label": "Skill 5.3.5 鍵と証明書の作成・管理",
        "level": 3
    },
    {
        "id": "6-試験対策-頻出パターンとひっかけポイント",
        "label": "6. 試験対策: 頻出パターンとひっかけポイント",
        "level": 2
    },
    {
        "id": "7-理解度チェック演習問題",
        "label": "7. 理解度チェック(演習問題)",
        "level": 2
    },
    {
        "id": "8-最終チェックリスト",
        "label": "8. 最終チェックリスト",
        "level": 2
    },
    {
        "id": "9-参考ソースurl",
        "label": "9. 参考ソース(URL)",
        "level": 2
    },
    {
        "id": "付録-学習の進め方おすすめ-5-ステップ",
        "label": "付録: 学習の進め方(おすすめ 5 ステップ)",
        "level": 2
    }
] as const;
