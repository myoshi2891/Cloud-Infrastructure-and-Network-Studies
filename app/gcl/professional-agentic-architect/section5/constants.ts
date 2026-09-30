export interface NavItem {
    id: string;
    label: string;
    lvl3?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
    {
        id: '1-セクション5概要自律型aiエージェントにおける脅威モデルとガバナンスの基本',
        label: '1. セクション5概要：自律型AIエージェントにおける脅威モデルとガバナンスの基本',
    },
    {
        id: '11-なぜエージェントは従来のwebアプリより危険なのか',
        label: '1.1 なぜ「エージェント」は従来のWebアプリより危険なのか',
        lvl3: true,
    },
    {
        id: '12-saifgoogle-の-secure-ai-framework-におけるエージェント特有のリスクと制御',
        label: '1.2 SAIF：Google の Secure AI Framework における「エージェント特有」のリスクと制御',
        lvl3: true,
    },
    {
        id: '13-業界標準の脅威分類owasp-top-10-との対応',
        label: '1.3 業界標準の脅威分類：OWASP Top 10 との対応',
        lvl3: true,
    },
    {
        id: '14-試験ガイド原文におけるセクション5の範囲',
        label: '1.4 試験ガイド原文における「セクション5」の範囲',
        lvl3: true,
    },
    {
        id: '2-id管理認証アクセス制御agent-identity--zero-trust',
        label: '2. ID管理・認証・アクセス制御（Agent Identity & Zero Trust）',
    },
    {
        id: '21-なぜサービスアカウントでは不十分なのか',
        label: '2.1 なぜサービスアカウントでは不十分なのか',
        lvl3: true,
    },
    {
        id: '22-agent-identity-の中核コンポーネント',
        label: '2.2 Agent Identity の中核コンポーネント',
        lvl3: true,
    },
    {
        id: '23-認証モデル誰の権限で何を呼び出すか',
        label: '2.3 認証モデル：誰の権限で、何を呼び出すか',
        lvl3: true,
    },
    {
        id: '24-認証認可フローエンドユーザー--エージェント--google-cloud-ツールapi',
        label: '2.4 認証・認可フロー：エンドユーザー → エージェント → Google Cloud ツール/API',
        lvl3: true,
    },
    {
        id: '25-principal-access-boundarypabポリシー',
        label: '2.5 Principal Access Boundary（PAB）ポリシー',
        lvl3: true,
    },
    {
        id: '26-iam-conditions-によるきめ細やかな制御',
        label: '2.6 IAM Conditions によるきめ細やかな制御',
        lvl3: true,
    },
    {
        id: '3-ネットワーク境界保護とデータプライバシー',
        label: '3. ネットワーク境界保護とデータプライバシー',
    },
    {
        id: '31-vpc-service-controlsvpc-scエージェント基盤での適用範囲を正確に理解する',
        label: '3.1 VPC Service Controls（VPC-SC）：エージェント基盤での適用範囲を正確に理解する',
        lvl3: true,
    },
    {
        id: '32-cmek顧客管理暗号鍵どこで何を暗号化できるか',
        label: '3.2 CMEK（顧客管理暗号鍵）：どこで、何を暗号化できるか',
        lvl3: true,
    },
    {
        id: '33-sensitive-data-protection旧-cloud-dlpと-model-armor-の統合',
        label: '3.3 Sensitive Data Protection（旧 Cloud DLP）と Model Armor の統合',
        lvl3: true,
    },
    {
        id: '34-データ保護の全体像',
        label: '3.4 データ保護の全体像',
        lvl3: true,
    },
    {
        id: '35-private-service-connectpscによる閉域網連携',
        label: '3.5 Private Service Connect（PSC）による閉域網連携',
        lvl3: true,
    },
    {
        id: '4-エージェントのガードレール安全性フィルタポリシー執行',
        label: '4. エージェントのガードレール・安全性フィルタ・ポリシー執行',
    },
    {
        id: '41-model-armorコンテンツレベルのランタイム防御',
        label: '4.1 Model Armor：コンテンツレベルのランタイム防御',
        lvl3: true,
    },
    {
        id: '42-semantic-governance-policy意図レベルの防御プレビュー機能',
        label: '4.2 Semantic Governance Policy：意図レベルの防御（プレビュー機能）',
        lvl3: true,
    },
    {
        id: '43-多層防御の全体像layered-governance',
        label: '4.3 多層防御の全体像（Layered Governance）',
        lvl3: true,
    },
    {
        id: '44-human-in-the-loophitl高リスク操作の人間承認ゲート',
        label: '4.4 Human-in-the-Loop（HITL）：高リスク操作の人間承認ゲート',
        lvl3: true,
    },
    {
        id: '5-監査可観測性コンプライアンス',
        label: '5. 監査・可観測性・コンプライアンス',
    },
    {
        id: '51-agent-observability誰が何を誰に代わって行ったか',
        label: '5.1 Agent Observability：誰が・何を・誰に代わって行ったか',
        lvl3: true,
    },
    {
        id: '52-agent-anomaly-detection異常行動の継続的検知',
        label: '5.2 Agent Anomaly Detection：異常行動の継続的検知',
        lvl3: true,
    },
    {
        id: '53-コンプライアンスへの接続データ主権とログ保持',
        label: '5.3 コンプライアンスへの接続：データ主権とログ保持',
        lvl3: true,
    },
    {
        id: '6-試験対策頻出アンチパターンと意思決定フローチャート',
        label: '6. 試験対策：頻出アンチパターンと意思決定フローチャート',
    },
    {
        id: '61-アンチパターンと正解パターンの対比',
        label: '6.1 アンチパターンと正解パターンの対比',
        lvl3: true,
    },
    {
        id: '62-シナリオ問題の解き方意思決定フローチャート',
        label: '6.2 シナリオ問題の解き方：意思決定フローチャート',
        lvl3: true,
    },
    {
        id: '63-試験対象ツールセクション5関連チェックリスト',
        label: '6.3 試験対象ツール（セクション5関連）チェックリスト',
        lvl3: true,
    },
    {
        id: '7-参考リソース公式ドキュメント一覧',
        label: '7. 参考リソース・公式ドキュメント一覧',
    },
    {
        id: '試験概要公式ガイド',
        label: '試験概要・公式ガイド',
        lvl3: true,
    },
    {
        id: 'secure-ai-frameworksaif脅威モデル',
        label: 'Secure AI Framework（SAIF）・脅威モデル',
        lvl3: true,
    },
    {
        id: 'agent-identity認証アクセス制御',
        label: 'Agent Identity・認証・アクセス制御',
        lvl3: true,
    },
    {
        id: 'agent-gatewayネットワーク境界データ保護',
        label: 'Agent Gateway・ネットワーク境界・データ保護',
        lvl3: true,
    },
    {
        id: 'model-armorsemantic-governanceガードレール',
        label: 'Model Armor・Semantic Governance・ガードレール',
        lvl3: true,
    },
    {
        id: '監査可観測性コンプライアンス',
        label: '監査・可観測性・コンプライアンス',
        lvl3: true,
    },
];

export type DiagramId =
    | 'diag-1'
    | 'diag-2'
    | 'diag-3'
    | 'diag-4'
    | 'diag-5'
    | 'diag-6'
    | 'diag-7'
    | 'diag-8'
    | 'diag-9';

export const DIAGRAMS: Record<DiagramId, string> = {
    'diag-1': `flowchart TB
    subgraph INPUT["Application & Perception(入力層)"]
        A1["ユーザーの明示的な指示<br/>(同期・非同期)"]
        A2["暗黙のコンテキスト入力<br/>(センサー・添付ファイル・アプリ状態)"]
        A3["System Instructions<br/>(エージェントの権限・能力の定義)"]
    end

    subgraph CORE["Reasoning Core(推論コア)"]
        B1["プロンプトの統合<br/>(指示 + データ + 記憶)"]
        B2["計画の反復生成<br/>(Reasoning Loop)"]
    end

    subgraph ORCH["Orchestration(実行オーケストレーション)"]
        C1["Agent Memory"]
        C2["Tools(外部API・ツール)"]
        C3["Content(RAG)"]
        C4["補助モデル"]
    end

    subgraph OUT["Response Rendering(出力層)"]
        D1["クライアントアプリへの<br/>出力レンダリング"]
    end

    A1 --> B1
    A2 --> B1
    A3 --> B1
    B1 --> B2
    B2 -->|"ツール呼び出し"| C1
    B2 --> C2
    B2 --> C3
    B2 --> C4
    C1 -->|"再統合"| B2
    C2 -->|"再統合"| B2
    C3 -->|"再統合"| B2
    B2 --> D1

    RISK1["リスク: 間接的プロンプト<br/>インジェクション"]
    RISK2["リスク: メモリ／RAG<br/>ポイズニング"]
    RISK3["リスク: Rogue Actions<br/>(意図しない実行)"]
    RISK4["リスク: 機密データの<br/>意図しない開示・XSS"]

    RISK1 -.->|"汚染データが混入"| B1
    RISK2 -.->|"知識源の汚染"| C3
    RISK3 -.->|"過剰な権限行使"| C2
    RISK4 -.->|"未サニタイズ出力"| D1

    classDef riskFill fill:#fef2f2,stroke:#b91c1c,color:#7f1d1d
    class RISK1,RISK2,RISK3,RISK4 riskFill`,

    'diag-2': `sequenceDiagram
    autonumber
    participant User as エンドユーザー
    participant Client as クライアントアプリ
    participant Agent as エージェント(Reasoning Engine)
    participant AuthMgr as Auth Manager
    participant Gateway as Agent Gateway
    participant IAP as Identity-Aware Proxy
    participant Tool as MCPサーバー / ツール

    User->>Client: 指示を入力
    Client->>Agent: リクエスト転送<br/>(Client-to-Agent／Ingress)
    Note over Agent: X.509証明書は<br/>デプロイ時に自動発行・24h更新
    Agent->>Agent: 推論ループでツール呼び出しを計画
    Agent->>AuthMgr: 認証情報を要求<br/>(自身のSPIFFE IDで認証)
    AuthMgr-->>Agent: 束縛されたアクセストークン<br/>または委任OAuthトークン
    Agent->>Gateway: ツール呼び出し<br/>(Agent-to-Anywhere／Egress、DPoP署名)
    Gateway->>Gateway: Agent Registryでメタデータ照会
    Gateway->>IAP: 認可判定を委譲
    IAP->>IAP: IAM許可/拒否ポリシーを評価<br/>(principal://...でSPIFFE IDを照合)
    alt 登録済みの宛先 かつ 権限あり
        IAP-->>Gateway: 許可
        Gateway->>Tool: リクエスト転送
        Tool-->>Gateway: レスポンス
        Gateway-->>Agent: レスポンス転送
    else 未登録の宛先 かつ URLを対象とする明示的なIAMアクセスポリシーあり
        IAP-->>Gateway: 許可(URL対象のポリシーに基づく)
        Gateway->>Tool: リクエスト転送
        Tool-->>Gateway: レスポンス
        Gateway-->>Agent: レスポンス転送
    else 未登録の宛先(既定で拒否) または 権限不足
        IAP-->>Gateway: 拒否
        Gateway-->>Agent: エラー(iap.resources.egressViaIAP 不足等)
    end
    Agent-->>Client: 最終応答
    Client-->>User: 表示`,

    'diag-3': `flowchart LR
    REQ["エージェントからの<br/>リソースアクセス要求"]

    subgraph EVAL["IAMの評価(概念モデル)"]
        direction TB
        PAB{"PABポリシーで<br/>アクセス適格か？"}
        DENY{"拒否ポリシーで<br/>明示的にブロックされていないか？"}
        ALLOW{"許可ポリシーで<br/>ロールが付与されているか？"}
    end

    RESULT_OK["アクセス許可"]
    RESULT_NG["アクセス拒否"]

    REQ --> PAB
    PAB -->|"適格"| DENY
    PAB -->|"対象外"| RESULT_NG
    DENY -->|"ブロックなし"| ALLOW
    DENY -->|"ブロックあり"| RESULT_NG
    ALLOW -->|"ロールあり"| RESULT_OK
    ALLOW -->|"ロールなし"| RESULT_NG

    classDef denyFill fill:#fef2f2,stroke:#b91c1c,color:#7f1d1d
    classDef okFill fill:#f0fdf4,stroke:#15803d,color:#14532d
    class RESULT_NG denyFill
    class RESULT_OK okFill`,

    'diag-4': `flowchart TB
    subgraph PERIM["VPC Service Controls: サービス境界"]
        direction TB
        AI_API["Agent Identity API<br/>Agent Identity Credentials API"]
        RAG["RAG Engine"]
        AR["Agent Retrieval /<br/>Vector Search"]
    end

    subgraph OUTSIDE["境界の対象外(既知の制限)"]
        AGW["Agent Gateway<br/>(VPC-SC非対応)"]
        SGP["Semantic Governance<br/>Policy Engine"]
    end

    KMS["Cloud KMS<br/>(CMEK)"]
    SDP["Sensitive Data Protection<br/>(infoType検出・匿名化)"]
    MA["Model Armor<br/>(プロンプト/レスポンス経由でSDPを呼び出す)"]

    RAG -->|"コーパスを暗号化"| KMS
    AR -->|"Collection/Data Objectを暗号化"| KMS
    MA -->|"PII/機密情報を検出・マスキング"| SDP

    ORGPOL["組織ポリシーのカスタム制約<br/>(承認済みGatewayとのバインドのみ許可)"]
    AGW -.->|"バインディング制御"| ORGPOL

    classDef outFill fill:#fef2f2,stroke:#b91c1c,color:#7f1d1d
    class AGW,SGP outFill`,

    'diag-5': `flowchart TB
    ORG["組織レベル: Floor Settings<br/>(全社共通の最低ライン)"]
    FOLDER["フォルダレベル: Floor Settings<br/>(部門ごとの上乗せ)"]
    PROJECT["プロジェクトレベル: Floor Settings + Template<br/>(Floor Settingsは競合するフォルダ設定より優先<br/>Templateは個別アプリの厳格な設定)"]

    ORG --> FOLDER --> PROJECT

    PROJECT --> BLOCK{"執行モード"}
    BLOCK -->|"Inspect and block"| REJECT["違反コンテンツを<br/>ブロック"]
    BLOCK -->|"Inspect only"| LOG["違反をログ記録のみ<br/>(Cloud Loggingの有効化が必要)<br/>(コンテンツは通過)"]

    classDef blockFill fill:#fef2f2,stroke:#b91c1c,color:#7f1d1d
    class REJECT blockFill`,

    'diag-6': `sequenceDiagram
    participant Agent as エージェント
    participant Model as LLM(モデル)
    participant Gateway as Agent Gateway
    participant PDP as Semantic Governance<br/>Policy Engine(PDP)

    Agent->>Model: ユーザープロンプト + 利用可能なツール一覧
    Model-->>Gateway: 提案されたツール呼び出し(レスポンス)
    Note over Gateway: Agent Gatewayがレスポンスを<br/>エージェント到達前にインターセプト
    Gateway->>PDP: ツール提案 + NLC + チャット履歴を送信
    PDP->>PDP: ユーザー意図との整合性を評価<br/>組織の制約(NLC)との適合性を評価
    alt 両方の検証をパス
        PDP-->>Gateway: 判定: ALLOW
        Gateway-->>Agent: 許可されたツール呼び出しをそのまま返却
    else いずれかで不一致・違反
        PDP-->>Gateway: 判定: DENY(理由付き)
        Gateway-->>Agent: ツール呼び出しを除去した応答と理由を返却
    end`,

    'diag-7': `flowchart TB
    START["ツール呼び出しの提案"] --> MA{"Model Armor: <br/>コンテンツは安全か？"}
    MA -->|"違反あり"| BLOCK1["ブロック<br/>(Inspect and block)"]
    MA -->|"安全"| IAM{"IAM / PAB: <br/>権限の外枠内か？"}
    IAM -->|"範囲外"| BLOCK2["アクセス拒否"]
    IAM -->|"範囲内"| SGP{"Semantic Governance: <br/>ユーザー意図・NLCと整合するか？"}
    SGP -->|"不一致・違反"| BLOCK3["ツール呼び出しを除去<br/>理由を返却"]
    SGP -->|"整合"| RISK{"高リスク操作か？<br/>(削除・送金・外部送信等)"}
    RISK -->|"はい"| HITL["Human-in-the-Loop: <br/>人間の承認を要求"]
    RISK -->|"いいえ"| EXEC["自動実行"]
    HITL -->|"承認"| EXEC
    HITL -->|"却下"| BLOCK4["実行キャンセル"]
    EXEC --> LOG["Cloud Logging / Agent Observability<br/>へ記録"]

    classDef blockFill fill:#fef2f2,stroke:#b91c1c,color:#7f1d1d
    classDef okFill fill:#f0fdf4,stroke:#15803d,color:#14532d
    class BLOCK1,BLOCK2,BLOCK3,BLOCK4 blockFill
    class EXEC okFill`,

    'diag-8': `flowchart TB
    LOGS["Cloud Logging / Cloud Trace<br/>(ADK OpenTelemetry ログ・実行トレース<br/>プロンプト入力・レスポンス出力のキャプチャを含む)"]
    L1["Layer 1: 軽量ML<br/>統計的な外れ値のスクリーニング"]
    L2["Layer 2: 異常分析<br/>誤検知の除去"]
    L3["Layer 3: 呼び出しレベル分析<br/>根本原因の特定"]
    FINDING["セキュリティ検出結果<br/>(View security findings)"]

    LOGS --> L1 --> L2 --> L3 --> FINDING

    subgraph CATS["脅威カテゴリ(OWASP Top 10 for Agentic Security Threats準拠)"]
        C1["Tool misuse"]
        C2["Identity privilege abuse"]
        C3["Agentic cascading failures"]
        C4["Rogue agents"]
        C5["Resource exhaustion"]
    end

    FINDING --> CATS`,

    'diag-9': `flowchart TB
    Q0["シナリオ問題: <br/>何を守りたいか？"]

    Q0 --> Q1{"エージェント自身の<br/>ID・認証の話か？"}
    Q1 -->|"Yes"| A1["Agent Identity /<br/>Auth Manager / PAB"]

    Q0 --> Q2{"データが組織外へ<br/>流出することを防ぎたいか？"}
    Q2 -->|"Yes(API境界)"| A2["VPC Service Controls<br/>(Agent Gatewayは対象外に注意)"]
    Q2 -->|"Yes(保管データの暗号化)"| A3["Cloud KMS(CMEK)"]
    Q2 -->|"Yes(PIIの検出/マスキング)"| A4["Sensitive Data Protection<br/>(Model Armor経由)"]

    Q0 --> Q3{"有害コンテンツや<br/>プロンプトインジェクション対策か？"}
    Q3 -->|"Yes"| A5["Model Armor<br/>(Floor Settings + Template)"]

    Q0 --> Q4{"ツール呼び出しが<br/>ユーザー意図やビジネスルールに<br/>整合しているかを検証したいか？"}
    Q4 -->|"Yes"| A6["Semantic Governance Policy<br/>(NLC)"]

    Q0 --> Q5{"実世界に影響する<br/>不可逆な操作の最終防御か？"}
    Q5 -->|"Yes"| A7["Human-in-the-Loop<br/>承認ゲート"]

    Q0 --> Q6{"事後調査・異常検知・<br/>コンプライアンス証跡の話か？"}
    Q6 -->|"Yes"| A8["Cloud Logging/Trace +<br/>Agent Observability +<br/>Agent Anomaly Detection"]`,
};
