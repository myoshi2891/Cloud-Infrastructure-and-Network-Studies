export type DiagramId = keyof typeof DIAGRAMS;

export const DIAGRAMS = {
    "diag-0": "flowchart TD\nS1[\"1. 全体像を掴む<br/>第1章\"] --> S2[\"2. 土台を作る<br/>Organizations と Control Tower<br/>第2〜3章\"]\nS2 --> S3[\"3. 統制をかける<br/>SCP RCP 宣言型ポリシー<br/>第4章\"]\nS3 --> S4[\"4. 運用を一元化する<br/>委任管理者 ルートユーザー<br/>第5〜6章\"]\nS4 --> S5[\"5. 配備を標準化する<br/>IaC タグ Firewall Manager 共有<br/>第7〜10章\"]\nS5 --> S6[\"6. 準拠を確認する<br/>Config Security Hub Audit Artifact WA Tool<br/>第11〜13章\"]\nS6 --> S7[\"7. 演習で定着<br/>第15〜17章\"]",
    "diag-1": "flowchart LR\nP[\"予防<br/>Preventive<br/>そもそも違反させない\"] --> D[\"検出<br/>Detective<br/>違反を見つける\"]\nD --> R[\"是正<br/>Responsive<br/>自動で直す・通知する\"]\nP -.- PE[\"SCP RCP 宣言型ポリシー<br/>タグポリシー 強制<br/>Firewall Manager<br/>Service Catalog\"]\nD -.- DE[\"AWS Config ルール<br/>Security Hub<br/>Control Tower 検出コントロール\"]\nR -.- RE[\"Config 自動修復<br/>EventBridge と Lambda<br/>Systems Manager Automation\"]",
    "diag-2": "flowchart TD\nROOT[\"Root\"] --> MGMT[\"管理アカウント<br/>組織管理と請求のみ\"]\nROOT --> OU1[\"OU Security\"]\nROOT --> OU2[\"OU Infrastructure\"]\nROOT --> OU3[\"OU Workloads\"]\nROOT --> OU4[\"OU Sandbox\"]\nOU1 --> A1[\"Log Archive アカウント\"]\nOU1 --> A2[\"Security Tooling アカウント\"]\nOU2 --> A3[\"Network アカウント\"]\nOU2 --> A4[\"Shared Services アカウント\"]\nOU3 --> OU3A[\"OU Prod\"]\nOU3 --> OU3B[\"OU NonProd\"]\nOU3A --> A5[\"アプリ A 本番アカウント\"]\nOU3B --> A6[\"アプリ A 開発アカウント\"]\nOU4 --> A7[\"個人検証アカウント\"]",
    "diag-3": "flowchart TD\nQ[\"コントロールを選ぶ\"] --> Q1{\"違反する操作を<br/>APIレベルで拒否したい\"}\nQ1 -->|はい| PRE[\"予防コントロール<br/>SCP を利用\"]\nQ1 -->|いいえ| Q2{\"CloudFormation で<br/>デプロイ前に検査したい\"}\nQ2 -->|はい| PRO[\"プロアクティブコントロール<br/>CloudFormation Hooks を利用\"]\nQ2 -->|いいえ| DET[\"検出コントロール<br/>AWS Config ルールを利用\"]",
    "diag-4": "flowchart TD\nREQ[\"API リクエスト\"] --> E1{\"SCP でルートから該当アカウントまで<br/>すべて許可されているか\"}\nE1 -->|いいえ| DENY[\"拒否\"]\nE1 -->|はい| E2{\"IAM ポリシー等で<br/>許可されているか\"}\nE2 -->|いいえ| DENY\nE2 -->|はい| E3{\"明示的な Deny が<br/>どこかにあるか\"}\nE3 -->|はい| DENY\nE3 -->|いいえ| ALLOW[\"許可\"]",
    "diag-5": "flowchart LR\nMGMT[\"管理アカウント<br/>信頼されたアクセスを有効化<br/>委任管理者を登録\"] -->|\"委任\"| SEC[\"Security Tooling アカウント<br/>委任管理者\"]\nSEC --> GD[\"GuardDuty\"]\nSEC --> SH[\"Security Hub\"]\nSEC --> CFG[\"AWS Config 集約\"]\nSEC --> IA[\"IAM Access Analyzer\"]\nSEC --> INS[\"Inspector\"]\nSEC --> MAC[\"Macie\"]\nSEC --> FMS[\"Firewall Manager\"]\nSEC --> MEM[\"全メンバーアカウントと全 Region\"]\nLOG[\"Log Archive アカウント<br/>組織の CloudTrail ログ保管\"] -.-> SEC",
    "diag-6": "flowchart TD\nA[\"1. 管理アカウントで<br/>GuardDuty の委任管理者を指定\"] --> B[\"2. 委任管理者アカウントで<br/>組織の自動有効化を ON\"]\nB --> C[\"3. 既存アカウントを一括で有効化\"]\nC --> D[\"4. 新規アカウントは自動で有効化\"]\nD --> E[\"5. 検出結果を委任管理者に集約<br/>EventBridge と Security Hub に連携\"]",
    "diag-7": "flowchart TD\nS[\"障害発生<br/>通常のサインイン不可\"] --> J{\"緊急アクセスが必要か<br/>承認者が判断\"}\nJ -->|いいえ| N[\"通常復旧手順へ\"]\nJ -->|はい| G[\"break-glass の認証情報を取り出す<br/>金庫 パスワード金庫 分割保管\"]\nG --> U[\"break-glass ロールでサインイン<br/>MFA 必須\"]\nU --> A[\"緊急作業を実施<br/>作業内容を記録\"]\nU --> AL[\"サインイン検知で即時通知<br/>EventBridge と SNS\"]\nA --> R[\"作業完了後に認証情報を再発行<br/>ローテーション\"]\nR --> P[\"事後レビューと手順の改善\"]",
    "diag-8": "flowchart LR\nADMIN[\"管理アカウント<br/>または委任管理者\"] --> SS[\"StackSet<br/>テンプレートと設定\"]\nSS --> I1[\"スタックインスタンス<br/>アカウント A Region 1\"]\nSS --> I2[\"スタックインスタンス<br/>アカウント A Region 2\"]\nSS --> I3[\"スタックインスタンス<br/>アカウント B Region 1\"]\nSS --> I4[\"スタックインスタンス<br/>アカウント B Region 2\"]",
    "diag-9": "flowchart TD\nDEV[\"開発者が IaC を変更<br/>Pull Request\"] --> REV[\"コードレビュー<br/>承認必須\"]\nREV --> CI[\"CI で自動検査<br/>cfn-lint と cfn-guard<br/>脆弱性スキャン\"]\nCI --> CS[\"変更セット Change set<br/>変更内容を確認\"]\nCS --> APP[\"手動承認<br/>本番のみ\"]\nAPP --> DEPLOY[\"デプロイ<br/>StackSets で複数アカウントへ\"]\nDEPLOY --> HOOK[\"CloudFormation Hooks<br/>プロアクティブ検査\"]\nHOOK --> DRIFT[\"ドリフト検出と<br/>AWS Config で継続監視\"]",
    "diag-10": "flowchart TD\nA[\"1. Organizations で信頼されたアクセスを有効化\"] --> B[\"2. Firewall Manager 管理者アカウントを指定\"]\nB --> C[\"3. 全アカウントで AWS Config を有効化\"]\nC --> D[\"4. ポリシーを作成<br/>種類 対象アカウントと OU 対象リソース タグで絞込み\"]\nD --> E[\"5. 既存の対象リソースへ自動適用\"]\nE --> F[\"6. 新しいリソース 新規アカウントにも自動適用\"]\nF --> G[\"7. 非準拠を検出して<br/>自動修復 または 通知\"]",
    "diag-11": "flowchart LR\nOWN[\"所有者アカウント<br/>例 Network アカウント\"] --> SHARE[\"リソース共有<br/>Resource share\"]\nSHARE --> P1[\"共有するリソース<br/>サブネット TGW など\"]\nSHARE --> P2[\"マネージドアクセス許可<br/>何ができるか\"]\nSHARE --> P3[\"プリンシパル<br/>誰に共有するか\"]\nP3 --> C1[\"組織全体\"]\nP3 --> C2[\"特定の OU\"]\nP3 --> C3[\"特定のアカウント\"]",
    "diag-12": "flowchart TD\nADM[\"管理者がテンプレートを作成<br/>セキュリティ承認済み\"] --> PROD[\"製品 Product\"]\nPROD --> PORT[\"ポートフォリオ Portfolio\"]\nPORT --> CON[\"制約 Constraints<br/>起動制約 テンプレート制約\"]\nPORT --> SHARE[\"組織内の他アカウントや OU へ共有\"]\nSHARE --> USER[\"利用者がセルフサービスで起動\"]\nCON --> LAUNCH[\"起動時は起動ロールの権限で<br/>プロビジョニング\"]\nUSER --> LAUNCH",
    "diag-13": "flowchart LR\nR[\"AWS リソース\"] --> REC[\"Config レコーダー<br/>設定の変更を記録\"]\nREC --> CI[\"構成アイテム<br/>と構成履歴\"]\nCI --> RULE[\"Config ルール<br/>準拠 非準拠を評価\"]\nRULE --> NC[\"非準拠\"]\nNC --> REM[\"修復アクション<br/>Systems Manager Automation\"]\nNC --> EB[\"EventBridge\"]\nEB --> SNS[\"SNS 通知\"]\nEB --> LMB[\"Lambda などで独自処理\"]",
    "diag-14": "flowchart TD\nA[\"リソースが作成 変更される\"] --> B[\"Config がルールで評価\"]\nB --> C{\"準拠しているか\"}\nC -->|はい| OK[\"COMPLIANT\"]\nC -->|いいえ| NG[\"NON_COMPLIANT\"]\nNG --> D{\"修復の方針\"}\nD -->|自動| E[\"Systems Manager Automation で自動修復\"]\nD -->|手動| F[\"承認者が実行\"]\nNG --> G[\"EventBridge に準拠状態変更イベント\"]\nG --> H[\"SNS で担当者へ通知\"]\nE --> I[\"再評価して COMPLIANT になることを確認\"]",
    "diag-15": "flowchart LR\nGD[\"GuardDuty\"] --> SH[\"Security Hub<br/>集約リージョンと委任管理者\"]\nINS[\"Inspector\"] --> SH\nMAC[\"Macie\"] --> SH\nIAA[\"IAM Access Analyzer\"] --> SH\nFMS[\"Firewall Manager\"] --> SH\nCFG[\"Config ルールによる<br/>標準のチェック\"] --> SH\nPART[\"パートナー製品\"] --> SH\nSH --> AR[\"自動化ルール<br/>更新 抑制\"]\nSH --> EB[\"EventBridge\"]\nEB --> LMB[\"Lambda\"]\nEB --> SSM[\"Systems Manager Automation<br/>ASR ランブック\"]\nEB --> SNS[\"SNS Chatbot Ticket\"]",
    "diag-16": "flowchart LR\nSRC1[\"CloudTrail\"] --> AM[\"Audit Manager<br/>評価 Assessment\"]\nSRC2[\"AWS Config\"] --> AM\nSRC3[\"Security Hub\"] --> AM\nSRC4[\"AWS API 呼び出し\"] --> AM\nMAN[\"手動の証拠<br/>文書 テキスト\"] --> AM\nFW[\"フレームワーク<br/>SOC 2 PCI DSS など\"] --> AM\nAM --> EV[\"証拠フォルダ<br/>S3\"]\nAM --> REP[\"評価レポート<br/>監査人へ提出\"]",
    "diag-17": "flowchart TD\nA[\"1. ワークロードを定義<br/>名前 環境 Region など\"] --> B[\"2. レンズを選択<br/>Well-Architected Framework<br/>業種別 技術別 カスタム\"]\nB --> C[\"3. 柱ごとの質問に回答<br/>ベストプラクティスを満たすか\"]\nC --> D[\"4. リスクを確認<br/>高リスク HRI 中リスク MRI\"]\nD --> E[\"5. 改善計画を作成<br/>優先順位付け\"]\nE --> F[\"6. 改善を実施\"]\nF --> G[\"7. マイルストーンを保存<br/>改善の推移を記録\"]\nG --> C",
    "diag-18": "flowchart TD\nsubgraph MG[\"管理アカウント\"]\nORG[\"Organizations<br/>SCP RCP 宣言型ポリシー<br/>タグポリシー\"]\nCT[\"Control Tower<br/>ランディングゾーン\"]\nRT[\"集中ルートアクセス<br/>sts AssumeRoot\"]\nend\nsubgraph SEC[\"Security OU\"]\nLOG[\"Log Archive<br/>組織の CloudTrail と Config ログ\"]\nTOOL[\"Security Tooling 委任管理者<br/>GuardDuty Security Hub<br/>Config 集約 Firewall Manager<br/>StackSets\"]\nend\nsubgraph INF[\"Infrastructure OU\"]\nNET[\"Network アカウント<br/>RAM で VPC と TGW を共有\"]\nend\nsubgraph WL[\"Workloads OU\"]\nAPP[\"アプリケーション<br/>アカウント\"]\nend\nORG -->|\"予防的統制\"| SEC\nORG -->|\"予防的統制\"| INF\nORG -->|\"予防的統制\"| WL\nCT -->|\"Account Factory<br/>ベースライン展開\"| APP\nTOOL -->|\"StackSets と Firewall Manager<br/>で配布\"| APP\nNET -->|\"共有サブネット\"| APP\nAPP -->|\"ログ 構成履歴 検出結果\"| LOG\nAPP -->|\"検出結果の集約\"| TOOL"
} as const satisfies Record<string, string>;

export const DIAGRAM_DESCRIPTIONS: Record<DiagramId, string> = {
    "diag-0": "「予防」「検出」「是正」の3層と各Task/Skillの関連を体系的に進める学習フロー。",
    "diag-1": "予防層（Organizations/SCP/Control Tower）、検出層（Config/Security Hub）、是正層（Systems Manager/自動修復）の3層連携フロー。",
    "diag-2": "AWS Organizationsの管理アカウント、OU、メンバーアカウント、SCPの階層ツリー構造。",
    "diag-3": "予防コントロール（SCP）、検出コントロール（Config）、プロアクティブコントロール（CloudFormation Hooks）の適用ライフサイクルフロー。",
    "diag-4": "ルート・OU・アカウントにアタッチされたSCPの継承と、明示的Denyが最優先される認可判定フロー。",
    "diag-5": "Security Tooling アカウントを委任管理者として、各セキュリティサービスを全メンバーアカウント・全 Region へ管理するフロー。",
    "diag-6": "管理アカウントで信頼されたアクセスと委任管理者を指定し、メンバーアカウントへ一括展開するフロー。",
    "diag-7": "break-glass 認証情報の取り出し、MFA 必須のサインイン、通知、ローテーション、事後レビューのフロー。",
    "diag-8": "管理アカウントまたは委任管理者から組織・OU全体へテンプレートを自動配布・展開するCloudFormation StackSetsのフロー。",
    "diag-9": "cfn-lint、cfn-guard、Proactive Controlによる静的検査を経て本番へデプロイするパイプライン全体像。",
    "diag-10": "Firewall Manager管理者から各アカウント・リージョンのALB/CloudFront/VPCへセキュリティポリシーを一括配信するフロー。",
    "diag-11": "共有アカウントからリソース共有を作成し、組織・OU内のプリンシパルへ安全に共有するAWS RAMのフロー。",
    "diag-12": "製品ポートフォリオを作成し、起動制約ロールを介して最小権限でエンドユーザーに配布するAWS Service Catalogのフロー。",
    "diag-13": "リソース変更を検知し、Configルールで評価してタイムラインと準拠状態を記録するAWS Configの基本フロー。",
    "diag-14": "Configルールの非準拠検知からEventBridge、SSM Automationを起動して自動修正する自動修復フロー。",
    "diag-15": "Config、GuardDuty、Inspector等の検出結果をASFF形式で集約し、セキュリティ標準に照らしてスコアリングするSecurity Hubのフロー。",
    "diag-16": "評価フレームワークに基づき、Config、CloudTrail、Security Hub等から証拠を自動収集・集約するAudit Managerのフロー。",
    "diag-17": "ワークロード定義から質問回答、リスク特定、改善計画策定・マイルストーン記録を行うWell-Architected Toolの評価サイクル。",
    "diag-18": "管理・セキュリティ・ログ・ワークロードのマルチアカウント統合アーキテクチャ（リファレンス構成）。"
} as const;

export const NAV_ITEMS = [
    {
        "id": "0-このガイドの使い方",
        "label": "0. このガイドの使い方",
        "level": 2
    },
    {
        "id": "1-ドメイン6の全体像",
        "label": "1. ドメイン6の全体像",
        "level": 2
    },
    {
        "id": "part-a-task-61-アカウントを一元的にデプロイ管理する戦略",
        "label": "Part A. Task 6.1 アカウントを一元的にデプロイ・管理する戦略",
        "level": 2
    },
    {
        "id": "2-skill-611-aws-organizations-の導入と設定",
        "label": "2. Skill 6.1.1 AWS Organizations の導入と設定",
        "level": 3
    },
    {
        "id": "3-skill-612-aws-control-tower",
        "label": "3. Skill 6.1.2 AWS Control Tower",
        "level": 3
    },
    {
        "id": "4-skill-613-組織ポリシーscp--rcp--ai-オプトアウト--宣言型",
        "label": "4. Skill 6.1.3 組織ポリシー(SCP / RCP / AI オプトアウト / 宣言型)",
        "level": 3
    },
    {
        "id": "5-skill-614-セキュリティサービスの一元管理委任管理者",
        "label": "5. Skill 6.1.4 セキュリティサービスの一元管理(委任管理者)",
        "level": 3
    },
    {
        "id": "6-skill-615-ルートユーザー認証情報の管理",
        "label": "6. Skill 6.1.5 ルートユーザー認証情報の管理",
        "level": 3
    },
    {
        "id": "part-b-task-62-安全で一貫したリソースのデプロイ戦略",
        "label": "Part B. Task 6.2 安全で一貫したリソースのデプロイ戦略",
        "level": 2
    },
    {
        "id": "7-skill-621-iac-による一貫したデプロイ",
        "label": "7. Skill 6.2.1 IaC による一貫したデプロイ",
        "level": 3
    },
    {
        "id": "8-skill-622-タグによるリソースのグルーピング",
        "label": "8. Skill 6.2.2 タグによるリソースのグルーピング",
        "level": 3
    },
    {
        "id": "9-skill-623-aws-firewall-manager-による中央配信",
        "label": "9. Skill 6.2.3 AWS Firewall Manager による中央配信",
        "level": 3
    },
    {
        "id": "10-skill-624-リソースの安全な共有ram--service-catalog",
        "label": "10. Skill 6.2.4 リソースの安全な共有(RAM / Service Catalog)",
        "level": 3
    },
    {
        "id": "part-c-task-63-リソースのコンプライアンス評価",
        "label": "Part C. Task 6.3 リソースのコンプライアンス評価",
        "level": 2
    },
    {
        "id": "11-skill-631-検出と自動修復aws-config--security-hub",
        "label": "11. Skill 6.3.1 検出と自動修復(AWS Config / Security Hub)",
        "level": 3
    },
    {
        "id": "12-skill-632-監査証拠の収集audit-manager--artifact",
        "label": "12. Skill 6.3.2 監査証拠の収集(Audit Manager / Artifact)",
        "level": 3
    },
    {
        "id": "13-skill-633-well-architected-tool",
        "label": "13. Skill 6.3.3 Well-Architected Tool",
        "level": 3
    },
    {
        "id": "part-d-総まとめ",
        "label": "Part D. 総まとめ",
        "level": 2
    },
    {
        "id": "14-全体を一枚で理解するリファレンス構成",
        "label": "14. 全体を一枚で理解する(リファレンス構成)",
        "level": 3
    },
    {
        "id": "15-紛らわしいサービスの比較表",
        "label": "15. 紛らわしいサービスの比較表",
        "level": 3
    },
    {
        "id": "16-シナリオ別-解答パターン集",
        "label": "16. シナリオ別 解答パターン集",
        "level": 3
    },
    {
        "id": "17-確認問題10問",
        "label": "17. 確認問題(10問)",
        "level": 3
    },
    {
        "id": "18-用語集",
        "label": "18. 用語集",
        "level": 3
    },
    {
        "id": "19-参考ソース-url",
        "label": "19. 参考ソース URL",
        "level": 3
    }
] as const;
