export type DiagramId =
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
    | "diag-19";

export const NAV_ITEMS = [
    {
        "id": "0-はじめに-このガイドの使い方",
        "label": "0. はじめに: このガイドの使い方",
        "level": 2
    },
    {
        "id": "01-このガイドの前提",
        "label": "0.1 このガイドの前提",
        "level": 3
    },
    {
        "id": "02-参照元に関する注意",
        "label": "0.2 参照元に関する注意",
        "level": 3
    },
    {
        "id": "03-professional-試験の解き方-最重要",
        "label": "0.3 Professional 試験の解き方 (最重要)",
        "level": 3
    },
    {
        "id": "1-domain-1-の全体像",
        "label": "1. Domain 1 の全体像",
        "level": 2
    },
    {
        "id": "11-出題タスクと試験で問われる力",
        "label": "1.1 出題タスクと試験で問われる力",
        "level": 3
    },
    {
        "id": "12-学習の順序-おすすめ",
        "label": "1.2 学習の順序 (おすすめ)",
        "level": 3
    },
    {
        "id": "13-well-architected-framework-との対応",
        "label": "1.3 Well-Architected Framework との対応",
        "level": 3
    },
    {
        "id": "2-task-11-ネットワーク接続戦略を設計する",
        "label": "2. Task 1.1 ネットワーク接続戦略を設計する",
        "level": 2
    },
    {
        "id": "21-exam-guide-が求めている内容",
        "label": "2.1 Exam Guide が求めている内容",
        "level": 3
    },
    {
        "id": "22-step-1-基礎用語を押さえる",
        "label": "2.2 Step 1: 基礎用語を押さえる",
        "level": 3
    },
    {
        "id": "23-step-2-aws-グローバルインフラと-region--az-の選び方",
        "label": "2.3 Step 2: AWS グローバルインフラと Region / AZ の選び方",
        "level": 3
    },
    {
        "id": "24-step-3-複数-vpc-をつなぐ方式を選ぶ",
        "label": "2.4 Step 3: 複数 VPC をつなぐ方式を選ぶ",
        "level": 3
    },
    {
        "id": "25-step-4-オンプレミスやコロケーションと接続する",
        "label": "2.5 Step 4: オンプレミスやコロケーションと接続する",
        "level": 3
    },
    {
        "id": "26-step-5-ハイブリッド-dns-route-53-resolver",
        "label": "2.6 Step 5: ハイブリッド DNS (Route 53 Resolver)",
        "level": 3
    },
    {
        "id": "27-step-6-ネットワーク分割と-ip-アドレス設計",
        "label": "2.7 Step 6: ネットワーク分割と IP アドレス設計",
        "level": 3
    },
    {
        "id": "28-step-7-サービスエンドポイント-vpc-エンドポイント",
        "label": "2.8 Step 7: サービスエンドポイント (VPC エンドポイント)",
        "level": 3
    },
    {
        "id": "29-step-8-集中型ネットワーク設計パターン-ハブアンドスポーク",
        "label": "2.9 Step 8: 集中型ネットワーク設計パターン (ハブ・アンド・スポーク)",
        "level": 3
    },
    {
        "id": "210-step-9-ネットワークの監視とトラブルシューティング",
        "label": "2.10 Step 9: ネットワークの監視とトラブルシューティング",
        "level": 3
    },
    {
        "id": "211-コンテナサービスのネットワーク-exam-guide-の-knowledge-に登場",
        "label": "2.11 コンテナサービスのネットワーク (Exam Guide の Knowledge に登場)",
        "level": 3
    },
    {
        "id": "212-task-11-ベストプラクティスまとめ",
        "label": "2.12 Task 1.1 ベストプラクティスまとめ",
        "level": 3
    },
    {
        "id": "213-task-11-でよく狙われる落とし穴",
        "label": "2.13 Task 1.1 でよく狙われる落とし穴",
        "level": 3
    },
    {
        "id": "214-ソース-task-11",
        "label": "2.14 ソース (Task 1.1)",
        "level": 3
    },
    {
        "id": "3-task-12-セキュリティコントロールを規定する",
        "label": "3. Task 1.2 セキュリティコントロールを規定する",
        "level": 2
    },
    {
        "id": "31-exam-guide-が求めている内容",
        "label": "3.1 Exam Guide が求めている内容",
        "level": 3
    },
    {
        "id": "32-step-1-iam-の基本と権限評価の考え方",
        "label": "3.2 Step 1: IAM の基本と権限評価の考え方",
        "level": 3
    },
    {
        "id": "33-step-2-クロスアカウントアクセス",
        "label": "3.3 Step 2: クロスアカウントアクセス",
        "level": 3
    },
    {
        "id": "34-step-3-id-管理とサードパーティ-id-プロバイダー連携",
        "label": "3.4 Step 3: ID 管理とサードパーティ ID プロバイダー連携",
        "level": 3
    },
    {
        "id": "35-step-4-ネットワークレベルの制御",
        "label": "3.5 Step 4: ネットワークレベルの制御",
        "level": 3
    },
    {
        "id": "36-step-5-暗号化戦略-保存時と転送時",
        "label": "3.6 Step 5: 暗号化戦略 (保存時と転送時)",
        "level": 3
    },
    {
        "id": "37-step-6-集中的なセキュリティイベントの通知と監査",
        "label": "3.7 Step 6: 集中的なセキュリティイベントの通知と監査",
        "level": 3
    },
    {
        "id": "38-task-12-よく狙われる落とし穴",
        "label": "3.8 Task 1.2 よく狙われる落とし穴",
        "level": 3
    },
    {
        "id": "4-task-13-信頼性と復元力のあるアーキテクチャを設計する",
        "label": "4. Task 1.3 信頼性と復元力のあるアーキテクチャを設計する",
        "level": 2
    },
    {
        "id": "41-exam-guide-が求めている内容",
        "label": "4.1 Exam Guide が求めている内容",
        "level": 3
    },
    {
        "id": "42-step-1-rto-と-rpo-を理解する",
        "label": "4.2 Step 1: RTO と RPO を理解する",
        "level": 3
    },
    {
        "id": "43-step-2-4つの-dr-戦略",
        "label": "4.3 Step 2: 4つの DR 戦略",
        "level": 3
    },
    {
        "id": "44-step-3-aws-elastic-disaster-recovery-drs",
        "label": "4.4 Step 3: AWS Elastic Disaster Recovery (DRS)",
        "level": 3
    },
    {
        "id": "45-step-4-自動復旧とデータレプリケーション",
        "label": "4.5 Step 4: 自動復旧とデータレプリケーション",
        "level": 3
    },
    {
        "id": "46-step-5-スケールアップとスケールアウト",
        "label": "4.6 Step 5: スケールアップとスケールアウト",
        "level": 3
    },
    {
        "id": "47-step-6-バックアップと復元の戦略-aws-backup",
        "label": "4.7 Step 6: バックアップと復元の戦略 (AWS Backup)",
        "level": 3
    },
    {
        "id": "48-task-13-ベストプラクティスまとめ",
        "label": "4.8 Task 1.3 ベストプラクティスまとめ",
        "level": 3
    },
    {
        "id": "49-task-13-よく狙われる落とし穴",
        "label": "4.9 Task 1.3 よく狙われる落とし穴",
        "level": 3
    },
    {
        "id": "5-task-14-マルチアカウント環境を設計する",
        "label": "5. Task 1.4 マルチアカウント環境を設計する",
        "level": 2
    },
    {
        "id": "51-exam-guide-が求めている内容",
        "label": "5.1 Exam Guide が求めている内容",
        "level": 3
    },
    {
        "id": "52-step-1-なぜアカウントを分けるのか",
        "label": "5.2 Step 1: なぜアカウントを分けるのか",
        "level": 3
    },
    {
        "id": "53-step-2-aws-organizations-の基本",
        "label": "5.3 Step 2: AWS Organizations の基本",
        "level": 3
    },
    {
        "id": "54-step-3-アカウント構造の設計-ou-の分け方",
        "label": "5.4 Step 3: アカウント構造の設計 (OU の分け方)",
        "level": 3
    },
    {
        "id": "55-step-4-aws-control-tower",
        "label": "5.5 Step 4: AWS Control Tower",
        "level": 3
    },
    {
        "id": "56-step-5-集中ログとイベント通知",
        "label": "5.6 Step 5: 集中ログとイベント通知",
        "level": 3
    },
    {
        "id": "57-step-6-リソースの共有-aws-ram-と関連手段",
        "label": "5.7 Step 6: リソースの共有 (AWS RAM と関連手段)",
        "level": 3
    },
    {
        "id": "58-step-7-マルチアカウントのガバナンスモデル",
        "label": "5.8 Step 7: マルチアカウントのガバナンスモデル",
        "level": 3
    },
    {
        "id": "59-task-14-ベストプラクティスまとめ",
        "label": "5.9 Task 1.4 ベストプラクティスまとめ",
        "level": 3
    },
    {
        "id": "510-task-14-よく狙われる落とし穴",
        "label": "5.10 Task 1.4 よく狙われる落とし穴",
        "level": 3
    },
    {
        "id": "6-task-15-コスト最適化と可視化の戦略を決める",
        "label": "6. Task 1.5 コスト最適化と可視化の戦略を決める",
        "level": 2
    },
    {
        "id": "61-exam-guide-が求めている内容",
        "label": "6.1 Exam Guide が求めている内容",
        "level": 3
    },
    {
        "id": "62-step-1-コストを見る-可視化ツール",
        "label": "6.2 Step 1: コストを見る (可視化ツール)",
        "level": 3
    },
    {
        "id": "63-step-2-購入オプションを選ぶ",
        "label": "6.3 Step 2: 購入オプションを選ぶ",
        "level": 3
    },
    {
        "id": "631-購入オプションがパフォーマンスに与える影響",
        "label": "6.3.1 購入オプションがパフォーマンスに与える影響",
        "level": 3
    },
    {
        "id": "64-step-3-タグ戦略でコストを事業部門に紐づける",
        "label": "6.4 Step 3: タグ戦略でコストを事業部門に紐づける",
        "level": 3
    },
    {
        "id": "65-step-4-右サイジング-rightsizing-の可視化",
        "label": "6.5 Step 4: 右サイジング (Rightsizing) の可視化",
        "level": 3
    },
    {
        "id": "66-step-5-データ転送コストの考え方-補足",
        "label": "6.6 Step 5: データ転送コストの考え方 (補足)",
        "level": 3
    },
    {
        "id": "67-task-15-ベストプラクティスまとめ",
        "label": "6.7 Task 1.5 ベストプラクティスまとめ",
        "level": 3
    },
    {
        "id": "68-task-15-よく狙われる落とし穴",
        "label": "6.8 Task 1.5 よく狙われる落とし穴",
        "level": 3
    },
    {
        "id": "7-横断まとめ-キーワードから答えを選ぶ早見表",
        "label": "7. 横断まとめ: キーワードから答えを選ぶ早見表",
        "level": 2
    },
    {
        "id": "8-確認シナリオ-答え付き",
        "label": "8. 確認シナリオ (答え付き)",
        "level": 2
    },
    {
        "id": "問題-1",
        "label": "問題 1",
        "level": 3
    },
    {
        "id": "問題-2",
        "label": "問題 2",
        "level": 3
    },
    {
        "id": "問題-3",
        "label": "問題 3",
        "level": 3
    },
    {
        "id": "問題-4",
        "label": "問題 4",
        "level": 3
    },
    {
        "id": "問題-5",
        "label": "問題 5",
        "level": 3
    },
    {
        "id": "問題-6",
        "label": "問題 6",
        "level": 3
    },
    {
        "id": "9-参考url一覧-ソース",
        "label": "9. 参考URL一覧 (ソース)",
        "level": 2
    },
    {
        "id": "91-試験情報",
        "label": "9.1 試験情報",
        "level": 3
    },
    {
        "id": "92-ネットワーク-task-11",
        "label": "9.2 ネットワーク (Task 1.1)",
        "level": 3
    },
    {
        "id": "93-セキュリティ-task-12",
        "label": "9.3 セキュリティ (Task 1.2)",
        "level": 3
    },
    {
        "id": "94-信頼性と-dr-task-13",
        "label": "9.4 信頼性と DR (Task 1.3)",
        "level": 3
    },
    {
        "id": "95-マルチアカウント-task-14",
        "label": "9.5 マルチアカウント (Task 1.4)",
        "level": 3
    },
    {
        "id": "96-コスト-task-15",
        "label": "9.6 コスト (Task 1.5)",
        "level": 3
    }
] as const;

export const DIAGRAMS: Record<DiagramId, string> = {
    "diag-1": "flowchart TD\n    A[\"問題文を読む\"] --> B[\"制約キーワードに印を付ける\"]\n    B --> C[\"最小の運用負荷か\"]\n    B --> D[\"最小コストか\"]\n    B --> E[\"既存環境を変更できないか\"]\n    C --> F[\"マネージドサービスを優先\"]\n    D --> G[\"安価な構成を優先\"]\n    E --> H[\"追加の設計で吸収\"]\n    F --> I[\"選択肢を要件と突き合わせて消去\"]\n    G --> I\n    H --> I\n    I --> J[\"指定された回答数どおりに選ぶ<br/>単一回答は最適な1つ、複数回答は正解をすべて\"]",
    "diag-2": "flowchart LR\n    A[\"Task 1.4 マルチアカウント\"] --> B[\"Task 1.2 セキュリティ\"]\n    B --> C[\"Task 1.1 ネットワーク\"]\n    C --> D[\"Task 1.3 信頼性と復旧\"]\n    D --> E[\"Task 1.5 コスト\"]\n    E --> F[\"確認シナリオで総復習\"]",
    "diag-3": "flowchart TD\n    A[\"VPC 間をつなぎたい\"] --> B[\"サービス単位の公開だけで足りるか\"]\n    B -->|\"はい\"| C[\"PrivateLink を使う\"]\n    B -->|\"いいえ\"| D[\"CIDR は重複していないか\"]\n    D -->|\"重複している\"| C\n    D -->|\"重複なし\"| E[\"接続する VPC は少数か\"]\n    E -->|\"はい 数個程度\"| F[\"VPC ピアリング\"]\n    E -->|\"いいえ 多数または今後増える\"| G[\"Transit Gateway\"]\n    G --> H[\"オンプレミス接続や分離も必要なら TGW のルートテーブルで設計\"]",
    "diag-4": "flowchart TD\n    A[\"本番 VPC\"] --> T[\"Transit Gateway\"]\n    B[\"開発 VPC\"] --> T\n    C[\"共有サービス VPC\"] --> T\n    D[\"検査 VPC\"] --> T\n    E[\"オンプレミス\"] --> T\n    T --> R1[\"本番用ルートテーブル 本番と共有サービスのみ\"]\n    T --> R2[\"開発用ルートテーブル 開発と共有サービスのみ\"]",
    "diag-5": "flowchart TD\n    A[\"オンプレミスと AWS を接続したい\"] --> B[\"専用線の安定性や大容量が必要か\"]\n    B -->|\"いいえ\"| C[\"Site-to-Site VPN\"]\n    B -->|\"はい\"| D[\"Direct Connect\"]\n    D --> E[\"暗号化は必須か\"]\n    E -->|\"はい\"| F[\"MACsec または Direct Connect 上に VPN\"]\n    E -->|\"いいえ\"| G[\"Direct Connect のみ\"]\n    D --> H[\"高可用性が必要か\"]\n    H -->|\"はい\"| I[\"複数ロケーションに複数回線 加えて VPN をバックアップ\"]\n    H -->|\"いいえ\"| J[\"単一回線 コスト優先\"]",
    "diag-6": "flowchart LR\n    A[\"オンプレミスのサーバー\"] --> B[\"オンプレミス DNS\"]\n    B -->|\"AWS 内の名前を問い合わせ\"| C[\"Inbound Endpoint\"]\n    C --> D[\"Route 53 Resolver とプライベートホストゾーン\"]\n    E[\"VPC 内のインスタンス\"] --> D\n    D -->|\"社内ドメインを転送\"| F[\"Outbound Endpoint\"]\n    F --> B",
    "diag-7": "flowchart TD\n    A[\"ワークロード VPC 群\"] --> T[\"Transit Gateway ネットワークアカウント\"]\n    T --> B[\"検査 VPC Network Firewall または GWLB\"]\n    B --> C[\"集中 Egress VPC NAT Gateway\"]\n    C --> D[\"インターネット\"]\n    T --> E[\"Direct Connect Gateway と VPN\"]\n    E --> F[\"オンプレミス\"]\n    T --> G[\"共有サービス VPC エンドポイントと DNS\"]",
    "diag-8": "flowchart TD\n    A[\"通信できない\"] --> B[\"Reachability Analyzer で経路を解析\"]\n    B --> C[\"ルートテーブルに宛先の経路があるか\"]\n    C -->|\"ない\"| D[\"経路を追加または伝播を有効化\"]\n    C -->|\"ある\"| E[\"セキュリティグループは許可しているか\"]\n    E -->|\"いいえ\"| F[\"インバウンドとアウトバウンドを修正\"]\n    E -->|\"はい\"| G[\"ネットワーク ACL は許可しているか\"]\n    G -->|\"いいえ\"| H[\"戻りの一時ポートも含めて許可\"]\n    G -->|\"はい\"| I[\"Flow Logs で REJECT を確認し OS やアプリを調査\"]",
    "diag-9": "flowchart TD\n    A[\"リクエスト\"] --> B[\"明示的な Deny があるか\"]\n    B -->|\"はい\"| X[\"拒否\"]\n    B -->|\"いいえ\"| C[\"Organizations の SCP が許可しているか\"]\n    C -->|\"いいえ\"| X\n    C -->|\"はい\"| D[\"権限境界やセッションポリシーの範囲内か\"]\n    D -->|\"いいえ\"| F[\"同一アカウントのリソースベースポリシーが<br/>IAM ユーザー ARN または引き受けたロールの<br/>セッション ARN を直接許可しているか\"]\n    F -->|\"はい (暗黙の Deny を越えて許可。明示的な Deny は B で評価済み)\"| Y\n    F -->|\"いいえ (ロール ARN への許可など)\"| X\n    D -->|\"はい\"| E[\"ID ベースまたはリソースベースのポリシーが許可しているか\"]\n    E -->|\"いいえ\"| X\n    E -->|\"はい\"| Y[\"許可\"]",
    "diag-10": "flowchart LR\n    A[\"アカウントAの利用者\"] --> B[\"STS AssumeRole を呼び出し\"]\n    B --> C[\"アカウントBのロールの信頼ポリシーが A を許可しているか\"]\n    C --> D[\"一時認証情報を発行\"]\n    D --> E[\"アカウントBのリソースを操作\"]",
    "diag-11": "flowchart TD\n    A[\"誰を認証したいか\"] --> B[\"従業員か\"]\n    B -->|\"はい\"| C[\"IAM Identity Center を使う\"]\n    C --> D[\"外部 IdP と SAML と SCIM で連携\"]\n    B -->|\"いいえ 顧客や一般ユーザー\"| E[\"Amazon Cognito を使う\"]\n    A --> F[\"Windows 資産や既存 AD を使うか\"]\n    F -->|\"はい\"| G[\"AWS Directory Service\"]",
    "diag-12": "flowchart LR\n    A[\"各メンバーアカウント\"] --> B[\"GuardDuty と Inspector と Config と Access Analyzer\"]\n    B --> C[\"Security Hub 委任管理者アカウント\"]\n    C --> D[\"Amazon EventBridge\"]\n    D --> E[\"Amazon SNS で通知\"]\n    D --> F[\"Lambda や Systems Manager で自動修復\"]\n    A --> G[\"CloudTrail 組織の証跡\"]\n    G --> H[\"ログアーカイブアカウントの S3\"]",
    "diag-13": "flowchart TD\n    A[\"RTO と RPO の要件を確認\"] --> B[\"復旧に数時間かかってもよいか\"]\n    B -->|\"はい\"| C[\"バックアップと復元\"]\n    B -->|\"いいえ\"| D[\"数十分で復旧したいか\"]\n    D -->|\"はい\"| E[\"パイロットライト\"]\n    D -->|\"いいえ 数分以内\"| F[\"ほぼ即時に切り替えたいか\"]\n    F -->|\"はい\"| G[\"マルチサイト Active/Active\"]\n    F -->|\"いいえ\"| H[\"ウォームスタンバイ\"]",
    "diag-14": "flowchart LR\n    A[\"元のサーバー Agent をインストール\"] --> B[\"継続的なレプリケーション\"]\n    B --> C[\"復旧先のステージングエリア 低コスト\"]\n    C --> D[\"障害時または訓練時に復旧インスタンスを起動\"]\n    D --> E[\"復旧完了後にフェイルバック\"]",
    "diag-15": "flowchart TD\n    R[\"Root (組織の最上位コンテナ)\"] --> M[\"管理アカウント\"]\n    R --> S[\"Security OU\"]\n    R --> I[\"Infrastructure OU\"]\n    R --> W[\"Workloads OU\"]\n    R --> X[\"Sandbox OU\"]\n    R --> Z[\"Suspended OU\"]\n    S --> S1[\"ログアーカイブアカウント\"]\n    S --> S2[\"セキュリティツールアカウント\"]\n    I --> I1[\"ネットワークアカウント\"]\n    I --> I2[\"共有サービスアカウント\"]\n    W --> W1[\"本番 OU\"]\n    W --> W2[\"非本番 OU\"]",
    "diag-16": "flowchart LR\n    A[\"全メンバーアカウント\"] --> B[\"CloudTrail 組織の証跡\"]\n    A --> C[\"AWS Config 配信チャネル\"]\n    A --> J[\"AWS Config アグリゲーター<br/>読み取り専用の集約ビュー\"]\n    A --> D[\"VPC Flow Logs と CloudWatch Logs\"]\n    B --> E[\"ログアーカイブアカウントの S3\"]\n    C -->|\"設定履歴とスナップショット\"| E\n    D -->|\"サブスクリプションフィルター (継続配信)\"| K[\"Amazon Data Firehose\"]\n    K --> E\n    D -.->|\"エクスポートタスク (バッチ)\"| E\n    E --> F[\"Athena や OpenSearch で分析\"]\n    A --> G[\"EventBridge のイベントバス\"]\n    G --> H[\"中央アカウントのイベントバス\"]\n    H --> I[\"SNS や Lambda で通知と自動対応\"]",
    "diag-17": "flowchart TD\n    A[\"組織のポリシー要件\"] --> B[\"予防 SCP と RCP\"]\n    A --> C[\"検出 Config と Security Hub\"]\n    A --> D[\"修復 EventBridge と Systems Manager\"]\n    B --> E[\"違反操作そのものを拒否\"]\n    C --> F[\"逸脱を検知して通知\"]\n    D --> G[\"自動で是正\"]",
    "diag-18": "flowchart TD\n    A[\"ワークロードの特性を確認\"] --> B[\"中断されても問題ないか\"]\n    B -->|\"はい\"| C[\"スポットインスタンス\"]\n    B -->|\"いいえ\"| D[\"1年以上の安定した利用が見込めるか\"]\n    D -->|\"いいえ\"| E[\"オンデマンド\"]\n    D -->|\"はい\"| F[\"インスタンスファミリーやリージョンを変える可能性があるか\"]\n    F -->|\"はい\"| G[\"Compute Savings Plans\"]\n    F -->|\"いいえ\"| H[\"EC2 Instance Savings Plans または スタンダード RI\"]",
    "diag-19": "flowchart LR\n    A[\"タグのルールを設計\"] --> B[\"コスト配分タグを有効化\"]\n    B --> C[\"SCP と Config で付与を強制\"]\n    C --> D[\"Cost Explorer と CUR で集計\"]\n    D --> E[\"事業部門へ配賦と改善\"]\n    E --> A",
};
