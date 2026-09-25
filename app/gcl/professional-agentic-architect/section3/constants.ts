export interface NavItem {
    id: string;
    label: string;
    lvl3?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
    { id: 'この記事について', label: 'この記事について' },
    { id: 'セクション3の全体像', label: 'セクション3の全体像' },
    {
        id: '31-コードによるエージェントワークフローの設計と構築',
        label: '3.1 コードによるエージェントワークフローの設計と構築',
    },
    {
        id: '311-言語モデルの選定基準',
        label: '3.1.1 言語モデルの選定基準',
        lvl3: true,
    },
    {
        id: '312-agent-development-kit-adk-によるカスタムエージェント構築',
        label: '3.1.2 Agent Development Kit (ADK) によるカスタムエージェント構築',
        lvl3: true,
    },
    {
        id: '313-セッションとメモリの設定',
        label: '3.1.3 セッションとメモリの設定',
        lvl3: true,
    },
    {
        id: '314-agents-cliによるスキル設定',
        label: '3.1.4 Agents CLIによるスキル設定',
        lvl3: true,
    },
    {
        id: '32-エンタープライズドメイン知識の統合',
        label: '3.2 エンタープライズドメイン知識の統合',
    },
    {
        id: '321-ragパイプラインとベクトル検索システムの設計',
        label: '3.2.1 RAGパイプラインとベクトル検索システムの設計',
        lvl3: true,
    },
    {
        id: '322-エージェント権限の設定agent-identity',
        label: '3.2.2 エージェント権限の設定(Agent Identity)',
        lvl3: true,
    },
    {
        id: '323-google-cloudツールによる事前構築カスタム機能の設定',
        label: '3.2.3 Google Cloudツールによる事前構築・カスタム機能の設定',
        lvl3: true,
    },
    {
        id: '33-エージェントワークフローのオーケストレーションと調整',
        label: '3.3 エージェントワークフローのオーケストレーションと調整',
    },
    {
        id: '331-エージェントプロトコルによるオーケストレーション',
        label: '3.3.1 エージェントプロトコルによるオーケストレーション',
        lvl3: true,
    },
    {
        id: '332-マルチエージェントのハンドオフとワークフローの調整',
        label: '3.3.2 マルチエージェントのハンドオフとワークフローの調整',
        lvl3: true,
    },
    {
        id: 'セクション3-全体アーキテクチャ',
        label: 'セクション3 全体アーキテクチャ',
    },
    {
        id: '試験対象ツール一覧セクション3関連',
        label: '試験対象ツール一覧(セクション3関連)',
    },
    {
        id: 'ベストプラクティス総まとめ',
        label: 'ベストプラクティス総まとめ',
    },
    { id: '学習チェックリスト', label: '学習チェックリスト' },
    { id: '参考文献', label: '参考文献' },
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
    | 'diag-9'
    | 'diag-10'
    | 'diag-11'
    | 'diag-12'
    | 'diag-13'
    | 'diag-14'
    | 'diag-15';

export const DIAGRAMS: Record<DiagramId, string> = {
    'diag-1': `flowchart TD
    A["3.1 コードでエージェントを構築する<br/>モデル選定 / ADK / セッション&メモリ / Agents CLI"] --> B["3.2 企業データの知識と権限を統合する<br/>RAG / ベクトル検索 / Agent Identity / Agent Registry"]
    B --> C["3.3 複数エージェントを協調させる<br/>MCP・A2Aプロトコル / Sequential・Parallel・Loop・Graph"]
    C --> D["セクション4: 評価とデプロイ"]
    C --> E["セクション5: セキュリティとガバナンス"]

    style A fill:#dbeafe,stroke:#2563eb,color:#0f172a
    style B fill:#dbeafe,stroke:#2563eb,color:#0f172a
    style C fill:#dbeafe,stroke:#2563eb,color:#0f172a
    style D fill:#f1f5f9,stroke:#94a3b8,color:#0f172a
    style E fill:#f1f5f9,stroke:#94a3b8,color:#0f172a`,

    'diag-2': `flowchart TD
    Start(["タスクの性質を分析"]) --> Q1{"定型的・反復的で<br/>高頻度に呼ばれるか?"}
    Q1 -- はい --> Q2{"低レイテンシ・低コストが<br/>最優先か?"}
    Q1 -- いいえ --> LLM["LLM を選択<br/>(複雑な推論・幅広い知識が必要)"]
    Q2 -- はい --> SLM["SLM を選択<br/>(Gemma などの軽量モデル)"]
    Q2 -- いいえ --> Hybrid["ハイブリッド構成<br/>(SLMでルーティング→難問のみLLMへ)"]
    SLM --> Fallback["フォールバック設計:<br/>信頼度が低い場合はLLMへエスカレーション"]

    style LLM fill:#dbeafe,stroke:#2563eb,color:#0f172a
    style SLM fill:#dcfce7,stroke:#15803d,color:#0f172a
    style Hybrid fill:#fef3c7,stroke:#b45309,color:#0f172a`,

    'diag-3': `flowchart TD
    Root["ルートエージェント<br/>(オーケストレーター)"] --> SubA["専門サブエージェントA<br/>(例: リサーチ)"]
    Root --> SubB["専門サブエージェントB<br/>(例: 執筆)"]
    Root --> SubC["専門サブエージェントC<br/>(例: レビュー)"]

    SubA --> ToolA1["組み込みツール"]
    SubA --> ToolA2["MCPツール"]
    SubB --> ToolB1["カスタムツール(関数)"]
    SubC --> A2A["A2A経由の外部エージェント"]

    Model["モデルレイヤー<br/>Gemini / LiteLLM経由の他社モデル"] -.利用.-> Root
    Model -.利用.-> SubA
    Model -.利用.-> SubB

    style Root fill:#dbeafe,stroke:#2563eb,color:#0f172a
    style Model fill:#fef3c7,stroke:#b45309,color:#0f172a`,

    'diag-4': `sequenceDiagram
    participant User as ユーザー
    participant Agent as ADKエージェント
    participant Sessions as Agent Platform Sessions
    participant Memory as Memory Bank

    User->>Agent: メッセージ送信(会話1回目)
    Agent->>Sessions: イベントを記録(発話・関数呼び出し)
    Sessions-->>Agent: セッションコンテキストを提供
    Agent-->>User: 応答を返す

    Note over Agent,Memory: セッション終了時に明示的な呼び出しが必要<br/>(イベント蓄積だけでは自動生成されない)

    Agent->>Memory: add_session_to_memory / GenerateMemories / IngestEvents<br/>を呼び出し(セッションのイベント列を渡す)
    Memory->>Memory: LLMによる知識抽出<br/>(嗜好・履歴・重要事実を要約)

    User->>Agent: 別の日に再訪問(会話2回目)
    Agent->>Memory: ユーザーIDに紐づく記憶を取得
    Memory-->>Agent: 過去の嗜好・履歴を返す
    Agent-->>User: パーソナライズされた応答`,

    'diag-5': `flowchart LR
    CLI["agents-cli バイナリ<br/>(共通コマンド群)"]

    subgraph AgentMode["Agent Mode"]
        Coding["コーディングエージェント<br/>(Gemini CLI / Claude Code / Codex / Antigravity)"]
        Skills["バンドルされたスキル<br/>(workflow / adk-code / scaffold / eval / deploy / publish / observability)"]
        Coding --> Skills --> CLI
    end

    subgraph HumanMode["Human Mode"]
        Dev["開発者"]
        Terminal["ターミナル / スクリプト"]
        Dev --> Terminal --> CLI
    end

    CLI --> Runtime["Agent Runtime / Cloud Run / GKE へデプロイ"]

    style AgentMode fill:#dbeafe,stroke:#2563eb,color:#0f172a
    style HumanMode fill:#dcfce7,stroke:#15803d,color:#0f172a`,

    'diag-6': `flowchart LR
    A["1. データ取り込み<br/>(Data ingestion)<br/>ローカルファイル/Cloud Storage/Google Drive"] --> B["2. データ変換<br/>(Data transformation)<br/>チャンク分割"]
    B --> C["3. 埋め込み<br/>(Embedding)<br/>意味を捉えた数値ベクトル化"]
    C --> D["4. データインデックス化<br/>(Data indexing)<br/>コーパスの構築"]
    D --> E["5. 検索<br/>(Retrieval)<br/>クエリに関連する情報を検索"]
    E --> F["6. 生成<br/>(Generation)<br/>取得情報をコンテキストに追加してLLMが応答生成"]

    style A fill:#dbeafe,stroke:#2563eb,color:#0f172a
    style D fill:#fef3c7,stroke:#b45309,color:#0f172a
    style F fill:#dcfce7,stroke:#15803d,color:#0f172a`,

    'diag-7': `flowchart TD
    subgraph VS1["Vector Search 1.0"]
        Idx["Index<br/>(ANNインデックス)"]
        FS["Vertex AI Feature Store<br/>(メタデータ)"]
        Emb1["別途埋め込み生成"]
        Emb1 --> Idx
        Idx <--> FS
    end

    subgraph AR["Agent Retrieval(旧Vector Search 2.0)"]
        Col["Collection"]
        DO["Data Object<br/>(JSON + ベクトル + メタデータ)"]
        AutoEmb["自動埋め込み生成 or BYOE"]
        Col --> DO
        AutoEmb --> DO
    end

    Query["クエリ"] --> VS1
    Query --> AR
    AR --> Hybrid["ハイブリッド検索<br/>(セマンティック + キーワード, RRFで統合)"]
    Hybrid --> Rerank["リランキング"]

    style AR fill:#dbeafe,stroke:#2563eb,color:#0f172a
    style VS1 fill:#f1f5f9,stroke:#94a3b8,color:#0f172a`,

    'diag-8': `sequenceDiagram
    participant Deploy as デプロイ操作
    participant GCP as Google Cloud
    participant Agent as エージェント
    participant CAA as Context-Aware Access<br/>(mTLS + DPoP)
    participant PAB as Principal Access Boundary
    participant Resource as 保護対象リソース

    Deploy->>GCP: エージェントをデプロイ
    GCP->>Agent: ユニークなSPIFFEアイデンティティ + X.509証明書を割り当て<br/>(証明書は24時間有効、自動更新)
    Agent->>CAA: リソースへのアクセスを試行
    CAA->>CAA: 証明書バインドされたトークンを検証<br/>(トークンは信頼された実行環境外で再利用不可)
    CAA->>PAB: 許可されたリソース境界内かを確認
    PAB-->>CAA: IAM権限があってもPAB外なら拒否
    CAA->>Resource: 認可されたアクセスのみ通過
    Resource-->>Agent: 応答
    Note over GCP,Resource: すべての操作は監査ログに記録される<br/>(エージェント自身として動作する場合/ユーザー代理で動作する場合の両方)`,

    'diag-9': `flowchart TD
    Start["MCPサーバー/エージェントを用意"] --> Q{"Google公式のMCPサーバーか、<br/>GKE上のMCPサーバーか?"}
    Q -- "Google/Google Cloud公式サーバー" --> Auto1["対応するGoogle Cloud APIを<br/>プロジェクトで有効化するだけで<br/>自動的に登録・取り込み"]
    Q -- "GKE上の自作MCPサーバー" --> Auto2["Deploymentに<br/>registry.gke.io/functional-type: MCP_SERVER<br/>ラベルを付与すると自動検出"]
    Q -- "外部/カスタムMCPサーバー" --> Manual["toolspec.jsonを添えて<br/>手動登録が必要<br/>(自動イントロスペクションはされない)"]

    Auto1 --> Catalog["Agent Registry カタログ"]
    Auto2 --> Catalog
    Manual --> Catalog

    Catalog --> Gateway["Agent Gatewayによる<br/>ポリシー適用・トラフィック監視"]
    Gateway --> Consume["エージェントがツールとして利用"]

    style Catalog fill:#dbeafe,stroke:#2563eb,color:#0f172a
    style Gateway fill:#fef3c7,stroke:#b45309,color:#0f172a`,

    'diag-10': `flowchart LR
    subgraph MCP_Layer["Model Context Protocol (MCP)"]
        direction TB
        AgentM["エージェント"] -->|"ツール呼び出し"| ToolServer["MCPサーバー<br/>(データベース・API・関数)"]
    end

    subgraph A2A_Layer["Agent2Agent (A2A)"]
        direction TB
        AgentA["エージェントA"] <-->|"タスク委任・協調"| AgentB["エージェントB<br/>(異なるフレームワーク/ベンダーでも可)"]
    end

    Note1["エージェント ⇔ ツール/データ"] -.相当.- MCP_Layer
    Note2["エージェント ⇔ エージェント"] -.相当.- A2A_Layer

    style MCP_Layer fill:#dbeafe,stroke:#2563eb,color:#0f172a
    style A2A_Layer fill:#dcfce7,stroke:#15803d,color:#0f172a`,

    'diag-11': `stateDiagram-v2
    [*] --> submitted: タスクを送信
    submitted --> working: エージェントが処理開始
    working --> input_required: 追加入力が必要
    input_required --> working: 入力を受け取り再開
    working --> completed: 正常終了
    working --> failed: エラー終了
    working --> canceled: キャンセル
    submitted --> rejected: 受理拒否
    completed --> [*]
    failed --> [*]
    canceled --> [*]
    rejected --> [*]`,

    'diag-12': `flowchart TD
    subgraph Sequential["A. SequentialAgent"]
        direction LR
        S1["エージェント1"] --> S2["エージェント2"] --> S3["エージェント3"]
    end

    subgraph Parallel["B. ParallelAgent"]
        direction TB
        PIn["入力"] --> P1["エージェントA"]
        PIn --> P2["エージェントB"]
        PIn --> P3["エージェントC"]
        P1 --> POut["集約(Gather)"]
        P2 --> POut
        P3 --> POut
    end

    subgraph Loop["C. LoopAgent"]
        direction LR
        L1["批評エージェント"] --> L2["修正エージェント"]
        L2 -->|"max_iterations回まで反復"| L1
    end

    subgraph Graph["D. Graph / GraphAgent"]
        direction TB
        G1["ノード1"] --> GDecision{"条件分岐"}
        GDecision -->|"条件A"| G2["ノード2"]
        GDecision -->|"条件B"| G3["ノード3(人間承認ゲート)"]
        G3 -->|"承認"| G4["ノード4"]
        G2 --> G4
        G4 -.チェックポイント保存.-> G1
    end

    style Sequential fill:#dbeafe,stroke:#2563eb,color:#0f172a
    style Parallel fill:#dcfce7,stroke:#15803d,color:#0f172a
    style Loop fill:#fef3c7,stroke:#b45309,color:#0f172a
    style Graph fill:#f3e8ff,stroke:#9333ea,color:#0f172a`,

    'diag-13': `flowchart TD
    Start(["複数エージェントを<br/>オーケストレーションする必要がある"]) --> Q1{"ステップ間に<br/>依存関係があるか?"}
    Q1 -- "はい(順番が重要)" --> Q2{"単純な依存チェーンか?"}
    Q1 -- "いいえ(独立している)" --> Parallel2["ParallelAgent<br/>(fan-out & gather)"]
    Q2 -- "はい" --> Sequential2["SequentialAgent"]
    Q2 -- "いいえ(複雑な分岐・サイクル)" --> Q3{"反復的な自己改善が<br/>目的か?"}
    Q3 -- "はい" --> Loop2["LoopAgent"]
    Q3 -- "いいえ(条件分岐・人間承認・<br/>チェックポイント再開が必要)" --> Graph2["Graph / GraphAgent"]

    style Sequential2 fill:#dbeafe,stroke:#2563eb,color:#0f172a
    style Parallel2 fill:#dcfce7,stroke:#15803d,color:#0f172a
    style Loop2 fill:#fef3c7,stroke:#b45309,color:#0f172a
    style Graph2 fill:#f3e8ff,stroke:#9333ea,color:#0f172a`,

    'diag-14': `flowchart TD
    Orchestrator["オーケストレーターエージェント<br/>(SequentialAgent / Graph)"] --> SubAgent1["サブエージェント1<br/>(Agent Identity付与)"]
    Orchestrator --> SubAgent2["サブエージェント2<br/>(Agent Identity付与)"]
    Orchestrator --> ExternalA2A["外部A2Aエージェント<br/>(異なるベンダー/フレームワーク)"]

    SubAgent1 --> Registry["Agent Registry<br/>(ツール・スキル・エンドポイントを検出)"]
    SubAgent2 --> Registry
    ExternalA2A -.A2Aプロトコル.-> Orchestrator

    Registry --> MCPTools["MCPサーバー群<br/>(BigQuery / Cloud SQL / カスタムAPI等)"]

    SubAgent1 -.PABで境界制限.-> Policy["Agent Policies<br/>(IAM Allow/Deny, PAB)"]
    SubAgent2 -.PABで境界制限.-> Policy

    Orchestrator --> Runtime["Agent Runtime<br/>(フルマネージド実行環境)"]
    Runtime --> Sessions2["Sessions & Memory Bank"]

    style Orchestrator fill:#dbeafe,stroke:#2563eb,color:#0f172a
    style Registry fill:#fef3c7,stroke:#b45309,color:#0f172a
    style Policy fill:#f3e8ff,stroke:#9333ea,color:#0f172a
    style Runtime fill:#dcfce7,stroke:#15803d,color:#0f172a`,

    'diag-15': `flowchart TB
    subgraph Build["3.1 構築"]
        Model["言語モデル選定<br/>(LLM/SLM, self-hosted/SaaS, OSS/proprietary)"]
        ADK["ADK<br/>(カスタムエージェント構築)"]
        SessMem["Sessions & Memory Bank"]
        CLI["Agents CLI<br/>(Agent Mode / Human Mode)"]
        Model --> ADK
        ADK --> SessMem
        ADK --> CLI
    end

    subgraph Knowledge["3.2 知識と権限の統合"]
        RAG["RAG Engine<br/>(埋め込み→検索→リランキング)"]
        VDB["Vector Search 1.0 /<br/>Agent Retrieval"]
        Identity["Agent Identity<br/>(SPIFFE, PAB)"]
        Reg["Agent Registry &<br/>Google Cloud MCP Servers"]
        RAG --> VDB
    end

    subgraph Orchestration["3.3 オーケストレーション"]
        Protocols["MCP(ツール接続) &<br/>A2A(エージェント間協調)"]
        Patterns["Sequential / Parallel /<br/>Loop / Graph"]
        Protocols --> Patterns
    end

    Build --> Knowledge
    Knowledge --> Orchestration
    Identity -.横断的に適用.-> Orchestration
    Reg -.横断的に適用.-> Orchestration

    Orchestration --> Next["セクション4: 評価とデプロイ<br/>セクション5: セキュリティとガバナンス"]

    style Build fill:#dbeafe,stroke:#2563eb,color:#0f172a
    style Knowledge fill:#fef3c7,stroke:#b45309,color:#0f172a
    style Orchestration fill:#dcfce7,stroke:#15803d,color:#0f172a`,
};
