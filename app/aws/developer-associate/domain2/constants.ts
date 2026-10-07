/** 原本の26目次項目と35図。ナビ・監視対象の単一正本。 */
export const NAV_ITEMS = [
    {
        "id": "step-0",
        "label": "Step 0 試験の概要とこのガイドの使い方"
    },
    {
        "id": "step-1",
        "label": "Step 1 セキュリティの全体像"
    },
    {
        "id": "step-2",
        "label": "Step 2 IAMの基礎とポリシー評価（Skill 2.1.6）"
    },
    {
        "id": "step-3",
        "label": "Step 3 IAMロールとAWS STS（Skill 2.1.5）"
    },
    {
        "id": "step-4",
        "label": "Step 4 プログラムによるアクセスの設定（Skill 2.1.3）"
    },
    {
        "id": "step-5",
        "label": "Step 5 AWSサービスへの認証済み呼び出し（Skill 2.1.4）"
    },
    {
        "id": "step-6",
        "label": "Step 6 IDプロバイダーによるフェデレーション（Skill 2.1.1）"
    },
    {
        "id": "step-7",
        "label": "Step 7 ベアラートークンによるアプリの保護（Skill 2.1.2）"
    },
    {
        "id": "step-8",
        "label": "Step 8 アプリケーションレベルの認可（Skill 2.1.7）"
    },
    {
        "id": "step-9",
        "label": "Step 9 マイクロサービス間の認証（Skill 2.1.8）"
    },
    {
        "id": "step-10",
        "label": "Step 10 保管時・転送中の暗号化（Skill 2.2.1）"
    },
    {
        "id": "step-11",
        "label": "Step 11 AWS KMSと鍵の使い方（Skill 2.2.4）"
    },
    {
        "id": "step-12",
        "label": "Step 12 クライアントサイド暗号化とサーバーサイド暗号化（Skill 2.2.3）"
    },
    {
        "id": "step-13",
        "label": "Step 13 証明書管理：ACMとAWS Private CA（Skill 2.2.2）"
    },
    {
        "id": "step-14",
        "label": "Step 14 開発用の証明書とSSH鍵の生成（Skill 2.2.5）"
    },
    {
        "id": "step-15",
        "label": "Step 15 アカウントをまたぐ暗号化（Skill 2.2.6）"
    },
    {
        "id": "step-16",
        "label": "Step 16 キーローテーションの有効化と無効化（Skill 2.2.7）"
    },
    {
        "id": "step-17",
        "label": "Step 17 データ分類：PII・PHIなど（Skill 2.3.1）"
    },
    {
        "id": "step-18",
        "label": "Step 18 機密を含む環境変数の暗号化（Skill 2.3.2）"
    },
    {
        "id": "step-19",
        "label": "Step 19 シークレット管理サービスの活用（Skill 2.3.3）"
    },
    {
        "id": "step-20",
        "label": "Step 20 サニタイズとデータマスキング（Skill 2.3.4・2.3.5）"
    },
    {
        "id": "step-21",
        "label": "Step 21 マルチテナントのデータアクセスパターン（Skill 2.3.6）"
    },
    {
        "id": "step-22",
        "label": "Step 22 AIサービスを組み込むときのセキュリティ（新興トピック）"
    },
    {
        "id": "step-23",
        "label": "Step 23 総まとめ：選択フロー・ひっかけ・練習問題"
    },
    {
        "id": "appendix-a",
        "label": "付録A スキルとStepの対応表"
    },
    {
        "id": "appendix-b",
        "label": "付録B 参照ソースURL一覧"
    }
] as const;
export const DIAGRAMS = [
    "flowchart TB\n  D[\"ドメイン2 セキュリティ\"] --> T1[\"Task 1<br/>認証・認可の実装\"]\n  D --> T2[\"Task 2<br/>AWSサービスによる暗号化\"]\n  D --> T3[\"Task 3<br/>アプリ内の機密データ管理\"]\n  T1 --> S1[\"2.1.1〜2.1.8<br/>8スキル\"]\n  T2 --> S2[\"2.2.1〜2.2.7<br/>7スキル\"]\n  T3 --> S3[\"2.3.1〜2.3.6<br/>6スキル\"]\n",
    "flowchart LR\n  A[\"Step 1<br/>全体像\"] --> B[\"Step 2-9<br/>Task 1<br/>認証・認可\"]\n  B --> C[\"Step 10-16<br/>Task 2<br/>暗号化\"]\n  C --> D[\"Step 17-21<br/>Task 3<br/>機密データ\"]\n  D --> E[\"Step 22-23<br/>AI・総まとめ\"]\n",
    "flowchart TB\n  U[\"ユーザー・アプリ\"] --> A[\"1. 認証<br/>あなたは誰か\"]\n  A --> B[\"2. 認可<br/>何をしてよいか\"]\n  B --> C[\"3. 暗号化<br/>データを読めなくする\"]\n  C --> D[\"4. 機密管理<br/>鍵・パスワードを安全に持つ\"]\n",
    "flowchart TD\n  S[\"リクエスト\"] --> D1{\"明示的な Deny<br/>がある？\"}\n  D1 -- \"ある\" --> X[\"拒否\"]\n  D1 -- \"ない\" --> D2{\"SCP・境界・セッション<br/>ポリシーが適用されている場合<br/>すべて許可している？\"}\n  D2 -- \"いいえ\" --> X\n  D2 -- \"はい\" --> D3{\"どこかに Allow<br/>がある？\"}\n  D3 -- \"ない\" --> X2[\"暗黙の Deny<br/>拒否\"]\n  D3 -- \"ある\" --> OK[\"許可\"]\n",
    "sequenceDiagram\n  participant App as アプリ（アカウントA）\n  participant STS as AWS STS\n  participant S3 as アカウントBのS3\n  App->>STS: AssumeRole（対象ロールARN）\n  STS->>STS: 信頼ポリシーを確認\n  STS-->>App: 一時認証情報（有効期限つき）\n  App->>S3: 一時認証情報で署名したリクエスト\n  S3-->>App: 結果を返す\n",
    "flowchart TD\n  A[\"コードやCLIオプションで<br/>明示した認証情報\"] --> B[\"環境変数<br/>AWS_ACCESS_KEY_ID など\"]\n  B --> C[\"共有設定・認証情報ファイル<br/>プロファイル・SSO・AssumeRole\"]\n  C --> D[\"コンテナの認証情報<br/>ECSタスクロールなど\"]\n  D --> E[\"EC2インスタンスメタデータ<br/>インスタンスプロファイル\"]\n",
    "sequenceDiagram\n  participant C as クライアント（SDK/CLI）\n  participant A as AWSサービス\n  C->>C: リクエスト内容・日時・リージョン・サービス名で署名を計算\n  C->>A: リクエスト＋署名（Authorizationヘッダー）\n  A->>A: 同じ手順で署名を再計算して比較\n  A-->>C: 一致すれば処理、不一致なら拒否\n",
    "flowchart TD\n  Q{\"誰がAWSにアクセスしたい？\"} -->|\"自社アプリのエンドユーザー<br/>数千〜数百万人\"| C[\"Amazon Cognito\"]\n  Q -->|\"社員・開発者（ワークフォース）\"| I[\"IAM Identity Center\"]\n  Q -->|\"既存IdPを直接AWSに信頼させたい<br/>少数の用途・特殊構成\"| M[\"IAM IDプロバイダー<br/>SAML / OIDC + STS\"]\n",
    "sequenceDiagram\n  participant U as ユーザー（アプリ）\n  participant UP as Cognito ユーザープール\n  participant IP as Cognito IDプール\n  participant STS as AWS STS\n  participant S3 as Amazon S3\n  U->>UP: サインイン（ID/パスワード、ソーシャル等）\n  UP-->>U: IDトークン・アクセストークン・リフレッシュトークン\n  U->>IP: IDトークンを提示して認証情報を要求\n  IP->>STS: ロールの一時認証情報を要求\n  STS-->>IP: 一時認証情報\n  IP-->>U: 一時認証情報\n  U->>S3: 一時認証情報で直接アクセス\n",
    "sequenceDiagram\n  participant App as クライアントアプリ\n  participant Cog as Cognito ユーザープール\n  participant GW as API Gateway\n  participant L as Lambda\n  App->>Cog: サインイン\n  Cog-->>App: アクセストークン（JWT）\n  App->>GW: Authorization: Bearer アクセストークン\n  GW->>GW: オーソライザーで署名・exp・iss・audを検証\n  GW->>L: 検証済みクレームを付けて転送\n  L-->>App: レスポンス\n",
    "flowchart TD\n  Q{\"何を制御したい？\"} -->|\"AWSリソースへの操作\"| A[\"IAMポリシー<br/>リソースポリシー\"]\n  Q -->|\"APIのエンドポイント単位\"| B[\"API Gatewayの<br/>スコープ・オーソライザー\"]\n  Q -->|\"ユーザーごとのデータ範囲\"| C[\"DynamoDB LeadingKeys<br/>S3プレフィックス<br/>ポリシー変数\"]\n  Q -->|\"複雑な業務ルール\"| D[\"アプリコード または<br/>Verified Permissions\"]\n",
    "flowchart TB\n  U[\"ユーザー\"] -->|\"アクセストークン\"| GW[\"API Gateway<br/>Cognitoで検証\"]\n  GW --> A[\"サービスA<br/>Lambda ロールA\"]\n  A -->|\"SigV4署名<br/>IAM認証\"| B[\"サービスB<br/>関数URLまたはAPI Gateway\"]\n  A -->|\"最小権限のロールA\"| DDB[\"DynamoDB\"]\n  B -->|\"最小権限のロールB\"| SQS[\"SQS\"]\n",
    "sequenceDiagram\n  participant SA as サービスA\n  participant Cog as Cognito（リソースサーバーとスコープ）\n  participant SB as サービスB（API）\n  SA->>Cog: クライアントID・シークレットでトークン要求（スコープ指定）\n  Cog-->>SA: アクセストークン（scope付きJWT）\n  SA->>SB: Authorization: Bearer アクセストークン\n  SB->>SB: 署名・scopeを検証\n  SB-->>SA: レスポンス\n",
    "flowchart LR\n  C[\"クライアント\"] -->|\"転送中：TLS\"| E[\"ALB / API Gateway / CloudFront\"]\n  E -->|\"転送中：TLS\"| A[\"アプリ（Lambda/EC2）\"]\n  A -->|\"転送中：TLS\"| D[(\"S3 / DynamoDB / RDS<br/>保管時：KMSで暗号化\")]\n",
    "sequenceDiagram\n  participant App as アプリ\n  participant KMS as AWS KMS\n  participant St as ストレージ（S3等）\n  App->>KMS: GenerateDataKey（KMSキー指定）\n  KMS-->>App: 平文データキー＋暗号化されたデータキー\n  App->>App: 平文データキーでデータを暗号化\n  App->>App: 平文データキーをメモリから破棄\n  App->>St: 暗号文＋暗号化されたデータキーを保存\n  Note over App,St: 復号時は暗号化されたデータキーをKMSのDecryptで平文に戻して使う\n",
    "flowchart LR\n  subgraph CS[\"クライアントサイド暗号化\"]\n    A1[\"アプリが暗号化\"] --> A2[\"暗号文を送信\"] --> A3[(\"AWSには<br/>暗号文のみ届く\")]\n  end\n  subgraph SS[\"サーバーサイド暗号化\"]\n    B1[\"アプリが平文を送信<br/>TLSで保護\"] --> B2[\"AWSが保存時に暗号化\"] --> B3[(\"暗号文として保存\")]\n  end\n",
    "flowchart TD\n  Q1{\"AWSの内部にも<br/>平文を見せたくない？\"} -->|\"はい\"| CSE[\"クライアントサイド暗号化<br/>Encryption SDKなど\"]\n  Q1 -->|\"いいえ\"| Q2{\"鍵の使用を監査<br/>・細かく制御したい？\"}\n  Q2 -->|\"はい\"| KMS[\"SSE-KMS<br/>カスタマーマネージドキー\"]\n  Q2 -->|\"いいえ\"| S3[\"SSE-S3<br/>（既定）\"]\n  Q1 -->|\"鍵そのものを自分で持ち込む\"| C[\"SSE-C<br/>（利用者がリクエストごとに鍵を提供）\"]\n",
    "flowchart TD\n  A[\"ACMで証明書をリクエスト<br/>ドメイン名を指定\"] --> B[\"DNS検証用のCNAMEレコードを<br/>Route 53などに追加\"]\n  B --> C[\"ACMが検証して発行\"]\n  C --> D[\"ALB・CloudFront・API Gatewayに関連付け\"]\n  D --> E[\"期限前にACMが自動更新<br/>DNSレコードが残っていれば\"]\n",
    "flowchart TB\n  R[\"ルートCA<br/>オフライン運用が基本\"] --> S[\"下位CA<br/>日常の発行用\"]\n  S --> C1[\"サービスAのサーバー証明書\"]\n  S --> C2[\"サービスBのクライアント証明書<br/>mTLS\"]\n  S --> C3[\"IoTデバイスの証明書\"]\n",
    "sequenceDiagram\n  participant B as アカウントBのロール\n  participant IAM as Bの IAMポリシー\n  participant KP as アカウントAの鍵ポリシー\n  participant K as KMSキー（アカウントA）\n  B->>IAM: kms:Decrypt を呼ぶ権限は？\n  IAM-->>B: AのキーARNに許可あり\n  B->>K: Decrypt リクエスト\n  K->>KP: Bを許可しているか確認\n  KP-->>K: 許可あり\n  K-->>B: 復号結果\n",
    "flowchart TD\n  Q[\"別アカウントと暗号化データを共有したい\"] --> K{\"暗号化に使っている鍵は？\"}\n  K -->|\"AWSマネージドキー\"| N[\"共有不可<br/>カスタマーマネージドキーで暗号化し直す\"]\n  K -->|\"カスタマーマネージドキー\"| Y[\"鍵ポリシーでBを許可<br/>＋BのIAMポリシーで許可\"]\n",
    "flowchart LR\n  A[\"キーマテリアルv1<br/>で暗号化したデータ\"] -.->|\"復号時：自動的にv1を使用\"| K[\"同じKMSキー<br/>ID・ARN・エイリアス不変\"]\n  K --> B[\"新規の暗号化：最新のv2を使用\"]\n",
    "sequenceDiagram\n  participant Op as 運用者\n  participant KMS as AWS KMS\n  participant App as アプリ\n  Op->>KMS: 新しいKMSキーを作成\n  Op->>KMS: エイリアス alias/my-app-key を新キーに付け替え\n  App->>KMS: alias/my-app-key で暗号化（新キー）\n  Note over App,KMS: 古いデータの復号には古いキーを残して使用\n",
    "flowchart TD\n  D[\"データを受け取る・保存する\"] --> C{\"分類する\"}\n  C -->|\"PII / PHI / カード / 認証情報\"| H[\"高保護<br/>CMKで暗号化・最小権限<br/>マスキング・監査\"]\n  C -->|\"社内限定\"| M[\"標準保護<br/>暗号化・ロールで制御\"]\n  C -->|\"公開\"| L[\"基本保護<br/>転送中の暗号化\"]\n  H --> T[\"タグ付け＋Macieで継続的に検出\"]\n  M --> T\n  L --> T\n",
    "flowchart LR\n  subgraph L1[\"既定\"]\n    A[\"環境変数<br/>保管時にAWS管理キーで暗号化\"] --> B[\"実行時に自動復号して<br/>関数に渡される\"]\n  end\n  subgraph L2[\"暗号化ヘルパー\"]\n    C[\"値をKMSで事前に暗号化<br/>暗号文を環境変数に設定\"] --> D[\"コードでkms:Decryptを呼び<br/>メモリ上で復号\"]\n  end\n",
    "flowchart LR\n  E[\"環境変数<br/>SECRET_NAME=prod/db/credentials\"] --> F[\"Lambdaコード\"]\n  F -->|\"実行時にAPIで取得\"| S[\"Secrets Manager<br/>または Parameter Store\"]\n  S -->|\"KMSで暗号化されたまま保管\"| K[\"KMS\"]\n",
    "flowchart TD\n  Q1{\"自動ローテーションが<br/>必要？\"} -->|\"はい\"| SM[\"Secrets Manager\"]\n  Q1 -->|\"いいえ\"| Q2{\"機密情報か？\"}\n  Q2 -->|\"いいえ（設定値）\"| PS1[\"Parameter Store<br/>String / StringList\"]\n  Q2 -->|\"はい\"| Q3{\"コスト重視で<br/>ローテーション不要？\"}\n  Q3 -->|\"はい\"| PS2[\"Parameter Store<br/>SecureString\"]\n  Q3 -->|\"いいえ・DB認証情報など\"| SM\n",
    "sequenceDiagram\n  participant SM as Secrets Manager\n  participant L as ローテーションLambda\n  participant DB as データベース\n  SM->>L: createSecret：新しいパスワードを生成しAWSPENDINGで保存\n  SM->>L: setSecret：DBに新しいパスワードを設定\n  L->>DB: パスワード変更\n  SM->>L: testSecret：新しい認証情報で接続を確認\n  L->>DB: テスト接続\n  SM->>L: finishSecret：AWSPENDINGをAWSCURRENTに昇格\n",
    "flowchart TD\n  D[\"機密データ\"] --> L[\"アプリログ・例外メッセージ\"]\n  D --> R[\"APIレスポンス<br/>必要以上の項目を返す\"]\n  D --> U[\"URL・クエリ文字列<br/>アクセスログに残る\"]\n  D --> T[\"テスト・開発環境<br/>本番データのコピー\"]\n  D --> A[\"分析・監視・トレース<br/>X-Ray・メトリクスのタグ\"]\n",
    "flowchart TB\n  subgraph Silo[\"サイロ\"]\n    S1[\"テナントA<br/>専用DB\"]\n    S2[\"テナントB<br/>専用DB\"]\n  end\n  subgraph Pool[\"プール\"]\n    P[\"共有テーブル<br/>パーティションキーにテナントID\"]\n  end\n  subgraph Bridge[\"ブリッジ\"]\n    B1[\"共有アプリ層\"]\n    B2[\"高機密テナントのみ専用DB\"]\n  end\n",
    "sequenceDiagram\n  participant U as テナントAのユーザー\n  participant GW as API Gateway（JWT検証）\n  participant L as Lambda\n  participant STS as AWS STS\n  participant D as DynamoDB\n  U->>GW: アクセストークン（tenant_idクレーム入り）\n  GW->>L: 検証済みクレームを渡す\n  L->>L: リクエストボディではなくクレームからtenant_idを取得\n  L->>STS: テナント限定の一時認証情報を取得\n  STS-->>L: 範囲がテナントAに限定された認証情報\n  L->>D: 限定された認証情報でクエリ\n  D-->>L: テナントAのデータのみ\n",
    "flowchart TD\n  A[\"1. 認証<br/>JWT検証\"] --> B[\"2. テナント特定<br/>信頼できるクレームから\"]\n  B --> C[\"3. 権限の絞り込み<br/>テナント限定の認証情報／RLS\"]\n  C --> D[\"4. データアクセス\"]\n  D --> E[\"5. 監視<br/>テナントIDをログ・メトリクスに付与\"]\n",
    "flowchart TD\n  Q{\"誰が何にアクセスする？\"} -->|\"アプリのエンドユーザー\"| A1{\"AWSリソースへ直接アクセス？\"}\n  A1 -->|\"はい\"| IP[\"Cognito IDプール<br/>一時認証情報\"]\n  A1 -->|\"いいえ（API経由）\"| UP[\"Cognito ユーザープール<br/>JWT＋API Gatewayオーソライザー\"]\n  Q -->|\"社員・開発者\"| IC[\"IAM Identity Center\"]\n  Q -->|\"AWS上のコード（Lambda/EC2/ECS）\"| R[\"IAMロール<br/>実行ロール・タスクロール\"]\n  Q -->|\"外部CI・オンプレ\"| O[\"OIDCフェデレーション または<br/>IAM Roles Anywhere\"]\n  Q -->|\"サービス間（M2M）\"| M[\"IAM認証SigV4 または<br/>クライアントクレデンシャル\"]\n",
    "flowchart TD\n  Q{\"何をしたい？\"} -->|\"AWSに任せて簡単に暗号化\"| S[\"サーバーサイド暗号化<br/>SSE-S3 / SSE-KMS\"]\n  Q -->|\"AWSにも平文を見せない\"| C[\"クライアントサイド暗号化<br/>Encryption SDK\"]\n  Q -->|\"4KB超のデータをKMSで\"| E[\"エンベロープ暗号化<br/>GenerateDataKey\"]\n  Q -->|\"鍵の使用を監査・細かく制御\"| K[\"カスタマーマネージドキー\"]\n  Q -->|\"別アカウントと共有\"| X[\"カスタマーマネージドキー<br/>鍵ポリシー＋IAMの両方\"]\n  Q -->|\"TLS証明書（公開）\"| A[\"ACM\"]\n  Q -->|\"社内PKI・mTLS\"| P[\"AWS Private CA\"]\n",
    "flowchart TD\n  Q{\"機密情報をどう扱う？\"} -->|\"DBパスワード・APIキー<br/>ローテーションあり\"| SM[\"Secrets Manager\"]\n  Q -->|\"設定値・低コストな機密\"| PS[\"Parameter Store<br/>SecureString\"]\n  Q -->|\"環境変数に入れたい\"| E[\"名前だけを入れ<br/>実行時に取得\"]\n  Q -->|\"ログ・レスポンスに出る\"| M[\"サニタイズ・マスキング<br/>データ保護ポリシー\"]\n  Q -->|\"S3内の機密を探す\"| MA[\"Amazon Macie\"]\n  Q -->|\"複数顧客のデータ\"| MT[\"テナント分離<br/>IAM条件・RLS\"]\n"
] as const;
export const CHECK_COUNT = 20;
