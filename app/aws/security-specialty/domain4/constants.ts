export type DiagramId = keyof typeof DIAGRAMS;

export const DIAGRAMS = {
    "diag-0": "flowchart TD\nA[\"第1章 IAMの全体像をつかむ\"] --> B[\"第2章から第4章 認証を学ぶ\"]\nB --> C[\"第5章から第10章 認可を学ぶ\"]\nC --> D[\"第11章 サービス横断の整理\"]\nD --> E[\"第12章 試験の頻出パターン\"]\nE --> F[\"第13章 練習問題で確認\"]",
    "diag-1": "flowchart TD\nS[\"リクエスト受信\"] --> D{\"明示的なDenyがあるか\"}\nD -->|\"ある\"| X[\"拒否\"]\nD -->|\"ない\"| O{\"Organizationsの SCP と RCP が許可しているか\"}\nO -->|\"いいえ\"| X\nO -->|\"はい\"| R{\"リソースベースポリシーが許可しているか\"}\nR -->|\"はい 同一アカウントでユーザーARNかロールセッションARNかフェデレーションユーザーセッションARNを指定\"| OK[\"許可\"]\nR -->|\"はい 同一アカウントでロールARNを指定\"| B\nR -->|\"いいえ\"| I{\"IDベースポリシーが許可しているか\"}\nI -->|\"いいえ\"| X\nI -->|\"はい\"| B{\"境界とセッションポリシーも許可しているか\"}\nB -->|\"はい\"| OK\nB -->|\"いいえ\"| X",
    "diag-2": "flowchart LR\nU[\"ユーザーまたはグループ\"] --> A[\"割り当て\"]\nP[\"許可セット\"] --> A\nT[\"対象のAWSアカウント\"] --> A\nA --> R[\"各アカウントにIAMロールが自動作成\"]\nR --> S[\"ユーザーはSSOでロールを引き受ける\"]",
    "diag-3": "flowchart LR\nU[\"エンドユーザー\"] -->|\"1 サインイン\"| UP[\"Cognito ユーザープール\"]\nUP -->|\"2 JWTトークン発行\"| U\nU -->|\"3 トークンを提示\"| IP[\"Cognito ID プール\"]\nIP -->|\"4 ロールを選択してSTSを呼ぶ\"| STS[\"AWS STS\"]\nSTS -->|\"5 一時認証情報\"| U\nU -->|\"6 一時認証情報でアクセス\"| AWS[\"S3 や DynamoDB など\"]",
    "diag-4": "flowchart TD\nA[\"CI CD ジョブが起動\"] --> B[\"外部 OIDC IdP からIDトークンを取得\"]\nB --> C[\"STSのAssumeRoleWithWebIdentityを呼ぶ\"]\nC --> D{\"信頼ポリシーの条件に一致するか\"}\nD -->|\"一致\"| E[\"一時認証情報を発行\"]\nD -->|\"不一致\"| F[\"AccessDenied\"]\nE --> G[\"ジョブがAWSリソースを操作\"]",
    "diag-5": "flowchart TD\nQ{\"コードの実行場所は\"} -->|\"AWS内のコンピュート\"| R[\"IAMロール\"]\nQ -->|\"AWS外で証明書を持てる\"| RA[\"IAM Roles Anywhere\"]\nQ -->|\"CI CDやOIDC対応基盤\"| O[\"OIDCフェデレーション\"]\nQ -->|\"人が操作する\"| IC[\"IAM Identity Center\"]\nQ -->|\"アプリのエンドユーザー\"| CG[\"Amazon Cognito\"]",
    "diag-6": "flowchart TD\nA[\"アカウントAのユーザー\"] --> B[\"アカウントAのIDポリシーにsts AssumeRoleの許可が必要\"]\nB --> C[\"STSがアカウントBのロールの信頼ポリシーを確認\"]\nC --> D{\"信頼ポリシーがアカウントAを許可しているか\"}\nD -->|\"はい\"| E[\"一時認証情報を発行\"]\nD -->|\"いいえ\"| F[\"AccessDenied\"]\nE --> G[\"アカウントBのロールの権限でリソースを操作\"]",
    "diag-7": "flowchart LR\nA[\"アプリのバックエンド\"] -->|\"1 自分の権限で署名してURLを生成\"| B[\"署名付きURL\"]\nB -->|\"2 エンドユーザーに渡す\"| C[\"エンドユーザー\"]\nC -->|\"3 期限内にURLでアクセス\"| D[\"Amazon S3\"]\nD -->|\"4 署名者の権限で検証して応答\"| C",
    "diag-8": "flowchart TD\nS[\"認証に失敗した\"] --> W{\"どの経路か\"}\nW -->|\"IAM Identity Center\"| IC[\"許可セットと割り当てとプロビジョニングを確認\"]\nW -->|\"Cognito\"| CG[\"ユーザープールとIDプールの設定を確認\"]\nW -->|\"AD連携\"| DS[\"Directory Serviceのネットワークと信頼を確認\"]\nW -->|\"STSやロール引き受け\"| ST[\"信頼ポリシーと条件を確認\"]\nIC --> CT[\"CloudTrailでイベントとエラーコードを確認\"]\nCG --> CT\nDS --> CT\nST --> CT\nCT --> FIX[\"原因を特定して修正\"]",
    "diag-9": "flowchart TD\nA[\"アカウントAのロール\"] --> B[\"アカウントAのIDポリシーでアカウントBのリソースへの許可が必要\"]\nB --> C[\"アカウントBのリソースポリシーでアカウントAのロールを許可が必要\"]\nC --> D[\"両方がそろって初めてアクセス成功\"]",
    "diag-10": "flowchart TD\nA[\"オンプレのサーバーが秘密鍵で署名してリクエスト\"] --> B[\"Roles Anywhereが証明書チェーンを信頼アンカーで検証\"]\nB --> C{\"検証と信頼ポリシーの条件に合うか\"}\nC -->|\"はい\"| D[\"プロファイルで許可されたロールの一時認証情報を発行\"]\nC -->|\"いいえ\"| E[\"拒否\"]\nD --> F[\"サーバーがAWSリソースにアクセス\"]",
    "diag-11": "flowchart TD\nIDP[\"IdP または Identity Center の属性\"] -->|\"セッションタグとして渡す\"| SES[\"ロールのセッション\"]\nIAMTAG[\"IAMロールやユーザーのタグ\"] --> SES\nSES --> COND{\"PrincipalTagとResourceTagが一致するか\"}\nRES[\"リソースのタグ\"] --> COND\nCOND -->|\"一致\"| OK[\"許可\"]\nCOND -->|\"不一致\"| NG[\"拒否\"]",
    "diag-12": "flowchart TD\nA[\"1 必要な業務と権限を洗い出す\"] --> B[\"2 最初は広めのAWS管理ポリシーなどで開始\"]\nB --> C[\"3 CloudTrailの実際のアクティビティからポリシーを生成\"]\nC --> D[\"4 Access Analyzerで検証とカスタムチェック\"]\nD --> E[\"5 適用して運用\"]\nE --> F[\"6 最終アクセス情報や未使用アクセスの検出で定期的に棚卸し\"]\nF --> C",
    "diag-13": "flowchart TD\nS[\"AccessDeniedが発生\"] --> M[\"エラーメッセージとCloudTrailのerrorMessageを確認\"]\nM --> Q1{\"明示的なDenyか\"}\nQ1 -->|\"はい\"| D1[\"Denyを出したポリシーを特定して条件を確認\"]\nQ1 -->|\"いいえ 暗黙の拒否\"| Q2{\"組織のSCPやRCPで許可されているか\"}\nQ2 -->|\"いいえ\"| D2[\"SCPやRCPに必要な許可を追加\"]\nQ2 -->|\"はい\"| Q3{\"IDまたはリソースのポリシーに許可があるか\"}\nQ3 -->|\"ない\"| D3[\"必要な許可を追加\"]\nQ3 -->|\"ある\"| Q4{\"境界とセッションポリシーとエンドポイントポリシーを超えているか\"}\nQ4 -->|\"超えている\"| D4[\"上限側のポリシーに許可を追加\"]\nQ4 -->|\"超えていない\"| D5[\"条件キーの値を確認 MFA IP タグ リージョン\"]",
    "diag-14": "flowchart TD\nA[\"Access Analyzerが検出結果を生成\"] --> B[\"検出結果を確認\"]\nB --> C{\"意図したアクセスか\"}\nC -->|\"はい\"| D[\"アーカイブルールで既知の許可として整理\"]\nC -->|\"いいえ\"| E[\"原因のポリシーを特定\"]\nE --> F[\"ポリシーを修正して権限を削除または絞り込み\"]\nF --> G[\"再スキャンで検出結果が解決済みになるのを確認\"]\nD --> H[\"EventBridgeとSecurity Hubで通知と集約\"]\nG --> H",
    "diag-15": "flowchart TD\nA[\"漏えいの疑いを検知\"] --> B[\"対象のアクセスキーを無効化\"]\nB --> C[\"ロールのセッションは全セッションを取り消す明示拒否ポリシーを付与\"]\nC --> D[\"CloudTrailで漏えい期間中のアクティビティを調査\"]\nD --> E[\"作成された不審なIDやキーやリソースを削除\"]\nE --> F[\"新しい認証情報への入れ替えと再発防止策\"]"
} as const satisfies Record<string, string>;

export const DIAGRAM_DESCRIPTIONS: Record<DiagramId, string> = {
    "diag-0": "第1章IAMの全体像から第2章〜第4章の認証、第5章〜第10章の認可、サービス横断整理、試験頻出パターン、練習問題へと段階的に進む学習ステップ。",
    "diag-1": "リクエスト受信から明示的Deny、Organizations SCP/RCP、リソースベースポリシー、IDベースポリシー、境界とセッションポリシーの判定順序を示すポリシー評価決定フロー。",
    "diag-2": "ユーザーまたはグループ、許可セット、対象AWSアカウントの3要素を割り当てることで各アカウントにIAMロールが自動作成され、SSOでロールを引き受けるIAM Identity Centerの概念図。",
    "diag-3": "エンドユーザーがCognitoユーザープールで認証してJWTを取得し、Cognito IDプールでJWTをAWS STSの一時認証情報へ交換してS3やDynamoDBにアクセスするフロー。",
    "diag-4": "CI/CDジョブが外部OIDC IdPからIDトークンを取得し、STSのAssumeRoleWithWebIdentityを呼び出して信頼ポリシーを評価し一時認証情報を発行するOIDC連携フロー。",
    "diag-5": "コードの実行場所（AWS内、AWS外証明書、CI/CD・OIDC、人、アプリエンドユーザー）に応じた認証方式（IAMロール、IAM Roles Anywhere、OIDC、IAM Identity Center、Cognito）の選択図。",
    "diag-6": "アカウントAのユーザーがsts:AssumeRoleの許可を持ち、アカウントBのロールの信頼ポリシーで許可されている場合にSTSが一時認証情報を発行するクロスアカウントアクセスの流れ。",
    "diag-7": "アプリバックエンドが自身の権限で署名付きURLを生成してエンドユーザーに渡し、エンドユーザーが期限内にS3へ直接安全にアクセスする署名付きURLの仕組み。",
    "diag-8": "認証失敗時にIAM Identity Center、Cognito、Directory Service、STSの各経路からCloudTrailのイベントとエラーコードを照合して原因を特定・修正するトラブルシューティングフロー。",
    "diag-9": "クロスアカウントアクセスにおいて、アクセス元のIDベースポリシーとアクセス先のリソースベースポリシーの両方で許可が必要であることを示す概念図。",
    "diag-10": "オンプレミスサーバーが秘密鍵で署名したリクエストをRoles Anywhereが信頼アンカーで検証し、プロファイルに基づきロールの一時認証情報を発行してAWSリソースにアクセスする構成図。",
    "diag-11": "IdPやIAMロールの属性をセッションタグとして渡し、リソースのタグとPrincipalTagが一致するかを条件キーで評価して許可/拒否を判定するABAC認可フロー。",
    "diag-12": "業務要件の洗い出しから初期ポリシー、CloudTrailからのポリシー生成、Access Analyzer検証、適用運用、未使用アクセスの棚卸しを循環させる最小権限実現のライフサイクル。",
    "diag-13": "AccessDenied発生時にエラーメッセージやCloudTrailを確認し、明示的Deny、SCP/RCP、ID/リソースポリシー、境界・セッションポリシー、条件キーの順で原因を切り分けるトラブルシュート決定木。",
    "diag-14": "IAM Access Analyzerが外部共有や未使用アクセスを検出した際、意図したアクセスならアーカイブし、意図しない権限ならポリシーを修正・是正してEventBridgeやSecurity Hubで集約するフロー。",
    "diag-15": "認証情報の漏えい検知時に、キーの無効化、セッションの明示拒否、CloudTrail調査、不審なリソース削除、新規認証情報の再発行を行う初動対応手順。"
} as const;

export const NAV_ITEMS = [
    {
        "id": "0-このガイドの使い方",
        "label": "0. このガイドの使い方",
        "level": 2
    },
    {
        "id": "01-試験での位置づけ",
        "label": "0.1 試験での位置づけ",
        "level": 3
    },
    {
        "id": "02-試験ガイドが定める出題範囲-原文の整理",
        "label": "0.2 試験ガイドが定める出題範囲 (原文の整理)",
        "level": 3
    },
    {
        "id": "03-学習の進め方",
        "label": "0.3 学習の進め方",
        "level": 3
    },
    {
        "id": "1-全体像-認証と認可そして-iam-の登場人物",
        "label": "1. 全体像: 認証と認可、そして IAM の登場人物",
        "level": 2
    },
    {
        "id": "step-1-認証-authentication-と認可-authorization",
        "label": "Step 1. 認証 (Authentication) と認可 (Authorization)",
        "level": 3
    },
    {
        "id": "step-2-誰が-aws-にアクセスするか-プリンシパルの種類",
        "label": "Step 2. 誰が AWS にアクセスするか (プリンシパルの種類)",
        "level": 3
    },
    {
        "id": "step-3-iam-の基本部品",
        "label": "Step 3. IAM の基本部品",
        "level": 3
    },
    {
        "id": "step-4-ポリシーの種類と評価の順序",
        "label": "Step 4. ポリシーの種類と評価の順序",
        "level": 3
    },
    {
        "id": "task-41-認証戦略の設計実装トラブルシュート",
        "label": "Task 4.1: 認証戦略の設計・実装・トラブルシュート",
        "level": 2
    },
    {
        "id": "2-skill-411-人アプリシステムの認証基盤を設計する",
        "label": "2. Skill 4.1.1: 人・アプリ・システムの認証基盤を設計する",
        "level": 2
    },
    {
        "id": "21-iam-identity-center-従業員のシングルサインオン",
        "label": "2.1 IAM Identity Center (従業員のシングルサインオン)",
        "level": 3
    },
    {
        "id": "22-amazon-cognito-アプリのエンドユーザー認証",
        "label": "2.2 Amazon Cognito (アプリのエンドユーザー認証)",
        "level": 3
    },
    {
        "id": "23-多要素認証-mfa",
        "label": "2.3 多要素認証 (MFA)",
        "level": 3
    },
    {
        "id": "24-外部-idp-との連携-フェデレーション",
        "label": "2.4 外部 IdP との連携 (フェデレーション)",
        "level": 3
    },
    {
        "id": "25-aws-directory-service-active-directory-との連携",
        "label": "2.5 AWS Directory Service (Active Directory との連携)",
        "level": 3
    },
    {
        "id": "26-アプリケーションとシステムの認証-人以外",
        "label": "2.6 アプリケーションとシステムの認証 (人以外)",
        "level": 3
    },
    {
        "id": "3-skill-412-一時的な認証情報を発行する",
        "label": "3. Skill 4.1.2: 一時的な認証情報を発行する",
        "level": 2
    },
    {
        "id": "31-aws-sts-security-token-service",
        "label": "3.1 AWS STS (Security Token Service)",
        "level": 3
    },
    {
        "id": "32-amazon-s3-署名付き-url-presigned-url",
        "label": "3.2 Amazon S3 署名付き URL (Presigned URL)",
        "level": 3
    },
    {
        "id": "4-skill-413-認証の問題をトラブルシュートする",
        "label": "4. Skill 4.1.3: 認証の問題をトラブルシュートする",
        "level": 2
    },
    {
        "id": "41-トラブルシュートの全体フロー",
        "label": "4.1 トラブルシュートの全体フロー",
        "level": 3
    },
    {
        "id": "42-aws-cloudtrail-で調べる",
        "label": "4.2 AWS CloudTrail で調べる",
        "level": 3
    },
    {
        "id": "43-サービス別のチェックポイント",
        "label": "4.3 サービス別のチェックポイント",
        "level": 3
    },
    {
        "id": "44-便利な調査ツール",
        "label": "4.4 便利な調査ツール",
        "level": 3
    },
    {
        "id": "task-42-認可戦略の設計実装トラブルシュート",
        "label": "Task 4.2: 認可戦略の設計・実装・トラブルシュート",
        "level": 2
    },
    {
        "id": "5-認可を設計する前の整理-誰が何をどの条件で",
        "label": "5. 認可を設計する前の整理: 「誰が」「何を」「どの条件で」",
        "level": 2
    },
    {
        "id": "6-skill-421-人アプリシステムの認可制御を設計評価する",
        "label": "6. Skill 4.2.1: 人・アプリ・システムの認可制御を設計・評価する",
        "level": 2
    },
    {
        "id": "61-リソースポリシーとクロスアカウントアクセス",
        "label": "6.1 リソースポリシーとクロスアカウントアクセス",
        "level": 3
    },
    {
        "id": "62-iam-ロールの信頼ポリシー",
        "label": "6.2 IAM ロールの信頼ポリシー",
        "level": 3
    },
    {
        "id": "63-iam-パス-path",
        "label": "6.3 IAM パス (Path)",
        "level": 3
    },
    {
        "id": "64-iam-roles-anywhere-aws-外のワークロードの認可",
        "label": "6.4 IAM Roles Anywhere (AWS 外のワークロードの認可)",
        "level": 3
    },
    {
        "id": "65-amazon-verified-permissions-アプリ固有の細かな認可",
        "label": "6.5 Amazon Verified Permissions (アプリ固有の細かな認可)",
        "level": 3
    },
    {
        "id": "66-organizations-の-scp-と-rcp-組織レベルのガードレール",
        "label": "6.6 Organizations の SCP と RCP (組織レベルのガードレール)",
        "level": 3
    },
    {
        "id": "7-skill-422-abac-と-rbac-を設計する",
        "label": "7. Skill 4.2.2: ABAC と RBAC を設計する",
        "level": 2
    },
    {
        "id": "71-rbac-と-abac-の比較",
        "label": "7.1 RBAC と ABAC の比較",
        "level": 3
    },
    {
        "id": "72-abac-を実現する条件キー",
        "label": "7.2 ABAC を実現する条件キー",
        "level": 3
    },
    {
        "id": "73-属性-タグ-の渡し方",
        "label": "7.3 属性 (タグ) の渡し方",
        "level": 3
    },
    {
        "id": "74-abac-で気をつけること",
        "label": "7.4 ABAC で気をつけること",
        "level": 3
    },
    {
        "id": "8-skill-423-最小権限の-iam-ポリシーを設計解釈実装する",
        "label": "8. Skill 4.2.3: 最小権限の IAM ポリシーを設計・解釈・実装する",
        "level": 2
    },
    {
        "id": "81-ポリシーの読み方",
        "label": "8.1 ポリシーの読み方",
        "level": 3
    },
    {
        "id": "82-最小権限を実現する手順",
        "label": "8.2 最小権限を実現する手順",
        "level": 3
    },
    {
        "id": "83-アクセス許可の境界-permissions-boundary",
        "label": "8.3 アクセス許可の境界 (Permissions Boundary)",
        "level": 3
    },
    {
        "id": "84-セッションポリシー",
        "label": "8.4 セッションポリシー",
        "level": 3
    },
    {
        "id": "85-ガードレールの層を整理する",
        "label": "8.5 ガードレールの層を整理する",
        "level": 3
    },
    {
        "id": "86-よく使う条件キー",
        "label": "8.6 よく使う条件キー",
        "level": 3
    },
    {
        "id": "9-skill-424-認可の失敗を分析して原因を特定する",
        "label": "9. Skill 4.2.4: 認可の失敗を分析して原因を特定する",
        "level": 2
    },
    {
        "id": "91-まずエラーメッセージを読む",
        "label": "9.1 まずエラーメッセージを読む",
        "level": 3
    },
    {
        "id": "92-原因を切り分けるフロー",
        "label": "9.2 原因を切り分けるフロー",
        "level": 3
    },
    {
        "id": "93-使うツール",
        "label": "9.3 使うツール",
        "level": 3
    },
    {
        "id": "94-よくある原因と対処",
        "label": "9.4 よくある原因と対処",
        "level": 3
    },
    {
        "id": "10-skill-425-意図しない権限を調査して是正する",
        "label": "10. Skill 4.2.5: 意図しない権限を調査して是正する",
        "level": 2
    },
    {
        "id": "101-iam-access-analyzer-の-3-種類のアナライザー",
        "label": "10.1 IAM Access Analyzer の 3 種類のアナライザー",
        "level": 3
    },
    {
        "id": "102-調査と是正のフロー",
        "label": "10.2 調査と是正のフロー",
        "level": 3
    },
    {
        "id": "103-そのほかの調査手段",
        "label": "10.3 そのほかの調査手段",
        "level": 3
    },
    {
        "id": "104-認証情報が漏えいした疑いがあるときの初動",
        "label": "10.4 認証情報が漏えいした疑いがあるときの初動",
        "level": 3
    },
    {
        "id": "11-サービス横断の整理",
        "label": "11. サービス横断の整理",
        "level": 2
    },
    {
        "id": "111-サービスと役割の対応表",
        "label": "11.1 サービスと役割の対応表",
        "level": 3
    },
    {
        "id": "112-どれを選ぶの判断表",
        "label": "11.2 「どれを選ぶ?」の判断表",
        "level": 3
    },
    {
        "id": "12-試験の頻出パターンとひっかけ",
        "label": "12. 試験の頻出パターンとひっかけ",
        "level": 2
    },
    {
        "id": "121-キーワードから答えを引く",
        "label": "12.1 キーワードから答えを引く",
        "level": 3
    },
    {
        "id": "122-ひっかけポイント",
        "label": "12.2 ひっかけポイント",
        "level": 3
    },
    {
        "id": "13-練習問題-確認テスト",
        "label": "13. 練習問題 (確認テスト)",
        "level": 2
    },
    {
        "id": "14-参考ソース一覧-公式ドキュメント",
        "label": "14. 参考ソース一覧 (公式ドキュメント)",
        "level": 2
    },
    {
        "id": "141-試験ガイド",
        "label": "14.1 試験ガイド",
        "level": 3
    },
    {
        "id": "142-iam-の基礎ポリシー評価ベストプラクティス",
        "label": "14.2 IAM の基礎、ポリシー評価、ベストプラクティス",
        "level": 3
    },
    {
        "id": "143-認証-skill-411-から-413",
        "label": "14.3 認証 (Skill 4.1.1 から 4.1.3)",
        "level": 3
    },
    {
        "id": "144-認可-skill-421-から-425",
        "label": "14.4 認可 (Skill 4.2.1 から 4.2.5)",
        "level": 3
    },
    {
        "id": "15-最後に-学習のチェックリスト",
        "label": "15. 最後に: 学習のチェックリスト",
        "level": 2
    }
] as const;
