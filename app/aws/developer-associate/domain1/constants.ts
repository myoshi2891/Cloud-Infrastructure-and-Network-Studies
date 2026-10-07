/** 原本の38目次と31図を単一の正本として保持する。 */
export const NAV_ITEMS=[
    {
        "id": "sec-0",
        "label": "0 はじめに（このガイドの使い方）",
        "group": "group"
    },
    {
        "id": "task-1",
        "label": "Task 1: AWS 上でホストされるアプリケーションのコードを開発する",
        "group": "group"
    },
    {
        "id": "sk-1-1-1",
        "label": "1.1.1 アーキテクチャパターン",
        "group": "skill"
    },
    {
        "id": "sk-1-1-2",
        "label": "1.1.2 ステートフルとステートレス",
        "group": "skill"
    },
    {
        "id": "sk-1-1-3",
        "label": "1.1.3 密結合と疎結合",
        "group": "skill"
    },
    {
        "id": "sk-1-1-4",
        "label": "1.1.4 同期と非同期",
        "group": "skill"
    },
    {
        "id": "sk-1-1-5",
        "label": "1.1.5 耐障害性とレジリエンスのあるコード",
        "group": "skill"
    },
    {
        "id": "sk-1-1-6",
        "label": "1.1.6 API の作成・拡張・保守",
        "group": "skill"
    },
    {
        "id": "sk-1-1-7",
        "label": "1.1.7 ユニットテストと AWS SAM",
        "group": "skill"
    },
    {
        "id": "sk-1-1-8",
        "label": "1.1.8 メッセージングサービス",
        "group": "skill"
    },
    {
        "id": "sk-1-1-9",
        "label": "1.1.9 API・SDK で AWS サービスを操作する",
        "group": "skill"
    },
    {
        "id": "sk-1-1-10",
        "label": "1.1.10 ストリーミングデータ",
        "group": "skill"
    },
    {
        "id": "sk-1-1-11",
        "label": "1.1.11 Amazon Q Developer",
        "group": "skill"
    },
    {
        "id": "sk-1-1-12",
        "label": "1.1.12 Amazon EventBridge",
        "group": "skill"
    },
    {
        "id": "sk-1-1-13",
        "label": "1.1.13 サードパーティ連携のレジリエンス",
        "group": "skill"
    },
    {
        "id": "task-2",
        "label": "Task 2: AWS Lambda のコードを開発する",
        "group": "group"
    },
    {
        "id": "sk-1-2-1",
        "label": "1.2.1 VPC 内プライベートリソースへのアクセス",
        "group": "skill"
    },
    {
        "id": "sk-1-2-2",
        "label": "1.2.2 Lambda の設定",
        "group": "skill"
    },
    {
        "id": "sk-1-2-3",
        "label": "1.2.3 イベントライフサイクルとエラー処理",
        "group": "skill"
    },
    {
        "id": "sk-1-2-4",
        "label": "1.2.4 Lambda のテスト",
        "group": "skill"
    },
    {
        "id": "sk-1-2-5",
        "label": "1.2.5 Lambda と AWS サービスの統合",
        "group": "skill"
    },
    {
        "id": "sk-1-2-6",
        "label": "1.2.6 Lambda のパフォーマンスチューニング",
        "group": "skill"
    },
    {
        "id": "sk-1-2-7",
        "label": "1.2.7 ほぼリアルタイムのデータ処理",
        "group": "skill"
    },
    {
        "id": "task-3",
        "label": "Task 3: アプリケーション開発でデータストアを使う",
        "group": "group"
    },
    {
        "id": "sk-1-3-1",
        "label": "1.3.1 高カーディナリティのパーティションキー",
        "group": "skill"
    },
    {
        "id": "sk-1-3-2",
        "label": "1.3.2 整合性モデル",
        "group": "skill"
    },
    {
        "id": "sk-1-3-3",
        "label": "1.3.3 Query と Scan の違い",
        "group": "skill"
    },
    {
        "id": "sk-1-3-4",
        "label": "1.3.4 DynamoDB のキーとインデックス",
        "group": "skill"
    },
    {
        "id": "sk-1-3-5",
        "label": "1.3.5 シリアライズとデシリアライズ",
        "group": "skill"
    },
    {
        "id": "sk-1-3-6",
        "label": "1.3.6 データストアの利用・管理・保守",
        "group": "skill"
    },
    {
        "id": "sk-1-3-7",
        "label": "1.3.7 データライフサイクルの管理",
        "group": "skill"
    },
    {
        "id": "sk-1-3-8",
        "label": "1.3.8 キャッシュサービス",
        "group": "skill"
    },
    {
        "id": "sk-1-3-9",
        "label": "1.3.9 アクセスパターンに応じた専用データストア",
        "group": "skill"
    },
    {
        "id": "sec-33",
        "label": "サービス選択の早見表（試験直前チェック）",
        "group": "group"
    },
    {
        "id": "sec-34",
        "label": "よく出る「ひっかけ」パターン集",
        "group": "group"
    },
    {
        "id": "sec-35",
        "label": "練習問題（15 問）",
        "group": "group"
    },
    {
        "id": "sec-36",
        "label": "参考 URL 一覧",
        "group": "group"
    },
    {
        "id": "sec-37",
        "label": "最後に: 学習の進め方（おすすめ 3 ステップ）",
        "group": "group"
    }
] as const;
export const DIAGRAMS={
    "d01": "flowchart LR\n    A[\"Task 1<br/>設計の考え方と<br/>SDK・メッセージング\"] --> B[\"Task 2<br/>Lambda の開発\"]\n    B --> C[\"Task 3<br/>データストアの利用\"]\n    C --> D[\"練習問題で<br/>理解を確認\"]",
    "d02": "flowchart TB\n    subgraph CHO[\"コレオグラフィ\"]\n        direction LR\n        O1[\"注文サービス\"] -->|\"注文確定イベント\"| BUS[\"EventBridge\"]\n        BUS --> S1[\"在庫サービス\"]\n        BUS --> S2[\"決済サービス\"]\n        BUS --> S3[\"通知サービス\"]\n    end\n    subgraph ORC[\"オーケストレーション\"]\n        direction LR\n        SF[\"Step Functions\"] --> T1[\"在庫確認\"]\n        T1 --> T2[\"決済\"]\n        T2 --> T3[\"配送手配\"]\n    end\n    CHO ~~~ ORC",
    "d03": "flowchart LR\n    P[\"注文サービス\"] --> T[\"Amazon SNS<br/>トピック\"]\n    T --> Q1[\"SQS キュー A<br/>在庫処理\"]\n    T --> Q2[\"SQS キュー B<br/>請求処理\"]\n    T --> Q3[\"SQS キュー C<br/>分析処理\"]\n    Q1 --> L1[\"Lambda A\"]\n    Q2 --> L2[\"Lambda B\"]\n    Q3 --> L3[\"Lambda C\"]",
    "d04": "flowchart LR\n    U[\"ユーザー\"] --> ALB[\"ロードバランサー\"]\n    ALB --> A[\"アプリ 1<br/>状態を持たない\"]\n    ALB --> B[\"アプリ 2<br/>状態を持たない\"]\n    A --> S[(\"外部ストア<br/>DynamoDB / ElastiCache\")]\n    B --> S",
    "d05": "flowchart LR\n    subgraph TIGHT[\"密結合\"]\n        direction LR\n        A1[\"注文 API\"] -->|\"直接呼び出し\"| B1[\"請求サービス\"]\n    end\n    subgraph LOOSE[\"疎結合\"]\n        direction LR\n        A2[\"注文 API\"] --> Q[\"SQS キュー\"]\n        Q --> B2[\"請求サービス\"]\n    end\n    TIGHT ~~~ LOOSE",
    "d06": "flowchart TB\n    subgraph SYNC[\"同期呼び出し\"]\n        direction LR\n        C1[\"クライアント\"] -->|\"リクエスト\"| AG[\"API Gateway\"]\n        AG --> LF1[\"Lambda\"]\n        LF1 -->|\"レスポンス\"| C1\n    end\n    subgraph ASYNC[\"非同期呼び出し\"]\n        direction LR\n        S3[\"S3 イベント\"] -->|\"受け付けのみ\"| LQ[\"Lambda 内部キュー\"]\n        LQ --> LF2[\"Lambda\"]\n        LF2 -->|\"失敗\"| DLQ[\"DLQ / 失敗時 Destination\"]\n    end\n    SYNC ~~~ ASYNC",
    "d07": "flowchart TD\n    A[\"API 呼び出し\"] --> B{\"成功?\"}\n    B -->|\"はい\"| Z[\"完了\"]\n    B -->|\"いいえ\"| C{\"一時的な失敗?<br/>429 / 5xx / タイムアウト\"}\n    C -->|\"いいえ 400 / 403 / 404\"| E[\"エラーとして処理<br/>再試行しない\"]\n    C -->|\"はい\"| D{\"最大試行回数<br/>に到達?\"}\n    D -->|\"いいえ\"| W[\"指数バックオフ + ジッターで待機\"]\n    W --> A\n    D -->|\"はい\"| F[\"DLQ へ退避 / アラート\"]",
    "d08": "flowchart LR\n    C[\"クライアント\"] --> MR[\"メソッドリクエスト<br/>認可・検証\"]\n    MR --> IR[\"統合リクエスト<br/>マッピングテンプレートで変換\"]\n    IR --> BE[\"バックエンド<br/>Lambda / HTTP / AWS サービス\"]\n    BE --> IS[\"統合レスポンス<br/>変換・ステータス割り当て\"]\n    IS --> MS[\"メソッドレスポンス<br/>ヘッダー・モデル定義\"]\n    MS --> C",
    "d09": "flowchart LR\n    A[\"sam init<br/>ひな形作成\"] --> B[\"コード + テストを書く\"]\n    B --> C[\"ユニットテスト実行<br/>pytest / Jest など\"]\n    C --> D[\"sam build\"]\n    D --> E[\"sam local invoke<br/>sam local start-api\"]\n    E --> F[\"sam deploy\"]",
    "d10": "flowchart LR\n    subgraph SQSM[\"SQS: 分担して処理\"]\n        direction LR\n        P1[\"プロデューサー\"] --> QQ[\"キュー\"]\n        QQ --> W1[\"ワーカー 1\"]\n        QQ --> W2[\"ワーカー 2\"]\n    end\n    subgraph SNSM[\"SNS: 全員に配信\"]\n        direction LR\n        P2[\"パブリッシャー\"] --> TT[\"トピック\"]\n        TT --> S1[\"購読者 1\"]\n        TT --> S2[\"購読者 2\"]\n    end\n    SQSM ~~~ SNSM",
    "d11": "sequenceDiagram\n    participant P as プロデューサー\n    participant Q as SQS キュー\n    participant C as コンシューマー\n    P->>Q: SendMessage\n    C->>Q: ReceiveMessage（ロングポーリング）\n    Q-->>C: メッセージ（可視性タイムアウト開始）\n    C->>C: 処理\n    alt 成功\n        C->>Q: DeleteMessage\n    else 失敗 / 時間切れ\n        Note over Q: 可視性タイムアウト後に再び見える<br/>maxReceiveCount 超過で DLQ へ\n    end",
    "d12": "flowchart TD\n    A[\"SDK の認証情報検索\"] --> B[\"1 コードでの明示指定\"]\n    B --> C[\"2 環境変数<br/>AWS_ACCESS_KEY_ID など\"]\n    C --> D[\"3 共有認証情報ファイル / config<br/>プロファイル / SSO\"]\n    D --> E[\"4 コンテナの認証情報<br/>ECS タスクロール\"]\n    E --> F[\"5 インスタンスプロファイル<br/>EC2 のロール\"]",
    "d13": "flowchart LR\n    P1[\"プロデューサー<br/>アプリ / IoT\"] -->|\"PutRecords<br/>パーティションキー\"| S[\"Kinesis<br/>Data Streams\"]\n    S --> SH1[\"シャード 1\"]\n    S --> SH2[\"シャード 2\"]\n    S --> SH3[\"シャード 3\"]\n    SH1 --> C1[\"Lambda / KCL<br/>コンシューマー\"]\n    SH2 --> C1\n    SH3 --> C1\n    S --> FH[\"Data Firehose\"]\n    FH --> S3[\"Amazon S3\"]",
    "d14": "flowchart LR\n    A[\"自然言語で<br/>やりたいことを伝える\"] --> B[\"AI がコード案を生成\"]\n    B --> C[\"開発者がレビュー\"]\n    C --> D{\"問題あり?\"}\n    D -->|\"はい\"| E[\"指示を修正 / 手で直す\"]\n    E --> B\n    D -->|\"いいえ\"| F[\"テスト・セキュリティ<br/>スキャンを実行\"]\n    F --> G[\"コミット\"]",
    "d15": "flowchart LR\n    SRC1[\"自分のアプリ<br/>PutEvents\"] --> BUS[\"イベントバス\"]\n    SRC2[\"AWS サービス<br/>例: S3, EC2\"] --> BUS\n    SRC3[\"SaaS パートナー\"] --> BUS\n    BUS --> R1[\"ルール 1<br/>イベントパターン\"]\n    BUS --> R2[\"ルール 2<br/>イベントパターン\"]\n    R1 --> T1[\"Lambda\"]\n    R1 --> T2[\"SQS\"]\n    R2 --> T3[\"Step Functions\"]",
    "d16": "stateDiagram-v2\n    [*] --> Closed\n    Closed --> Open : 失敗が閾値を超える\n    Open --> HalfOpen : 一定時間が経過\n    HalfOpen --> Closed : 試験的な呼び出しが成功\n    HalfOpen --> Open : 試験的な呼び出しが失敗",
    "d17": "flowchart LR\n    subgraph VPC[\"VPC\"]\n        subgraph PRI[\"プライベートサブネット\"]\n            L[\"Lambda<br/>VPC 設定あり\"]\n            DB[(\"RDS / ElastiCache\")]\n        end\n        subgraph PUB[\"パブリックサブネット\"]\n            NAT[\"NAT ゲートウェイ\"]\n        end\n        VPE[\"VPC エンドポイント\"]\n    end\n    L --> DB\n    L --> NAT\n    NAT --> IGW[\"インターネット<br/>ゲートウェイ\"]\n    IGW --> EXT[\"外部 API\"]\n    L --> VPE\n    VPE --> AWSS[\"S3 / DynamoDB<br/>その他の AWS サービス\"]",
    "d18": "flowchart LR\n    I[\"Init<br/>環境の作成<br/>拡張機能・ランタイム起動<br/>ハンドラー外のコード実行\"] --> V[\"Invoke<br/>ハンドラーの実行\"]\n    V --> V2[\"Invoke<br/>実行環境を再利用<br/>ウォームスタート\"]\n    V2 --> SD[\"Shutdown<br/>環境の破棄\"]",
    "d19": "flowchart TD\n    E[\"非同期イベント\"] --> Q[\"Lambda 内部キュー\"]\n    Q --> F[\"関数を実行\"]\n    F --> R{\"成功?\"}\n    R -->|\"はい\"| OK[\"成功時の送信先<br/>Destinations\"]\n    R -->|\"いいえ\"| RT{\"再試行回数 / 有効期間<br/>の範囲内?\"}\n    RT -->|\"はい\"| Q\n    RT -->|\"いいえ\"| NG[\"失敗時の送信先 / DLQ\"]",
    "d20": "flowchart LR\n    A[\"ユニットテスト<br/>モック\"] --> B[\"sam local invoke<br/>ローカル実行\"]\n    B --> C[\"開発アカウントへ<br/>デプロイ\"]\n    C --> D[\"結合テスト<br/>invoke / テストイベント\"]\n    D --> E[\"加重エイリアスで<br/>カナリア公開\"]\n    E --> F[\"アラームで監視<br/>異常なら自動ロールバック\"]",
    "d21": "flowchart LR\n    S3[\"S3 / SNS / EventBridge\"] -->|\"リソースベースポリシーで<br/>呼び出しを許可\"| L[\"Lambda\"]\n    L -->|\"実行ロールで<br/>権限を付与\"| DDB[(\"DynamoDB / S3 / SQS\")]\n    SQS[\"SQS / Kinesis\"] -.->|\"Lambda が実行ロールで<br/>ポーリング\"| L",
    "d22": "flowchart TD\n    A[\"遅い / 高い\"] --> B{\"どこが遅い?<br/>CloudWatch / X-Ray で計測\"}\n    B -->|\"初回だけ遅い<br/>コールドスタート\"| C[\"初期化の軽量化<br/>SnapStart<br/>プロビジョニング済み同時実行\"]\n    B -->|\"常に CPU が重い\"| D[\"メモリを増やす<br/>Power Tuning で最適点を探す\"]\n    B -->|\"外部 / DB 呼び出しが遅い\"| E[\"接続の再利用<br/>RDS Proxy / キャッシュ / 並列化\"]\n    B -->|\"I/O 待ちが多い\"| F[\"非同期化 / バッチ化 / ストリーミング\"]",
    "d23": "flowchart LR\n    SRC[\"アプリ / IoT /<br/>DynamoDB の変更\"] --> STR[\"Kinesis Data Streams<br/>または DynamoDB Streams\"]\n    STR -->|\"イベントソースマッピング<br/>バッチ + 並列化\"| L[\"Lambda<br/>加工・変換・集計\"]\n    L --> OUT1[(\"DynamoDB\")]\n    L --> OUT2[\"S3 / OpenSearch\"]\n    L -->|\"失敗したバッチ\"| DLQ[\"SQS / SNS<br/>失敗時の送信先\"]",
    "d24": "flowchart TB\n    subgraph BAD[\"低カーディナリティ 例: status = ACTIVE\"]\n        direction LR\n        R1[\"リクエスト\"] --> P1[\"パーティション A<br/>過負荷 ホットパーティション\"]\n        R2[\"リクエスト\"] --> P1\n        R3[\"リクエスト\"] --> P1\n    end\n    subgraph GOOD[\"高カーディナリティ 例: userId\"]\n        direction LR\n        R4[\"リクエスト\"] --> P2[\"パーティション X\"]\n        R5[\"リクエスト\"] --> P3[\"パーティション Y\"]\n        R6[\"リクエスト\"] --> P4[\"パーティション Z\"]\n    end\n    BAD ~~~ GOOD",
    "d25": "sequenceDiagram\n    participant A as アプリ\n    participant D as DynamoDB\n    A->>D: PutItem（x = 10 に更新）\n    D-->>A: 成功\n    A->>D: GetItem（既定 = 結果整合性）\n    D-->>A: 古い値 x = 5 が返ることがある\n    A->>D: GetItem（ConsistentRead = true）\n    D-->>A: 最新の値 x = 10",
    "d26": "flowchart TD\n    A[\"データを取得したい\"] --> B{\"パーティションキーの値を<br/>指定できる?\"}\n    B -->|\"はい\"| C[\"Query<br/>効率的\"]\n    B -->|\"いいえ\"| D{\"別の属性で<br/>よく検索する?\"}\n    D -->|\"はい\"| E[\"GSI / LSI を作って<br/>そのインデックスを Query\"]\n    D -->|\"いいえ\"| F{\"全件が必要?<br/>分析 / 移行\"}\n    F -->|\"はい\"| G[\"Scan 並列スキャン<br/>または S3 へエクスポート\"]\n    F -->|\"いいえ\"| H[\"アクセスパターンを見直す\"]",
    "d27": "flowchart LR\n    subgraph T[\"テーブル 複合主キー\"]\n        direction TB\n        I1[\"PK: user-1 / SK: 2026-01-05<br/>注文 A\"]\n        I2[\"PK: user-1 / SK: 2026-02-10<br/>注文 B\"]\n        I3[\"PK: user-2 / SK: 2026-01-20<br/>注文 C\"]\n    end\n    Q[\"Query<br/>PK = user-1<br/>SK が 2026-01 から 2026-02\"] --> T",
    "d28": "flowchart TD\n    A[\"保存するデータは?\"] --> B{\"アクセスの特徴\"}\n    B -->|\"キーで取得<br/>大規模・低レイテンシー\"| C[\"DynamoDB\"]\n    B -->|\"複雑なクエリ / JOIN<br/>ACID\"| D[\"RDS / Aurora\"]\n    B -->|\"ファイル・オブジェクト\"| E[\"S3\"]\n    B -->|\"超高速な一時データ\"| F[\"ElastiCache / DAX\"]\n    B -->|\"全文検索・ログ分析\"| G[\"OpenSearch Service\"]",
    "d29": "flowchart LR\n    A[\"S3 Standard<br/>作成直後\"] -->|\"30 日後\"| B[\"Standard-IA<br/>低頻度アクセス\"]\n    B -->|\"90 日後\"| C[\"Glacier<br/>アーカイブ\"]\n    C -->|\"365 日後\"| D[\"削除<br/>Expiration\"]",
    "d30": "sequenceDiagram\n    participant A as アプリ\n    participant C as キャッシュ\n    participant D as データベース\n    A->>C: データを要求\n    alt キャッシュヒット\n        C-->>A: データを返す\n    else キャッシュミス\n        C-->>A: 無い\n        A->>D: データを取得\n        D-->>A: データ\n        A->>C: キャッシュに格納（TTL 付き）\n        A-->>A: データを使う\n    end",
    "d31": "flowchart LR\n    APP[\"アプリ\"] -->|\"書き込み / キー検索\"| DDB[(\"DynamoDB<br/>主データ\")]\n    DDB -->|\"DynamoDB Streams\"| L[\"Lambda\"]\n    L -->|\"ドキュメントを同期\"| OS[(\"OpenSearch Service<br/>検索用インデックス\")]\n    APP -->|\"全文検索 / 絞り込み / 集計\"| OS"
} as const;
export type DiagramId=keyof typeof DIAGRAMS;
