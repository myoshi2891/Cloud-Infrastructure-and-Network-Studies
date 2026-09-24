export interface NavItem {
    id: string;
    label: string;
    lvl3?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
    {
        id: '1-セクション1の全体像',
        label: '1. セクション1の全体像',
    },
    {
        id: '2-11-ローコードツールを使ったエージェントワークフロー動作の設定',
        label: '2. 1.1 ローコードツールを使ったエージェントワークフロー・動作の設定',
    },
    {
        id: '21-gemini-enterprise-のローコードビルダー全体像workflow-builder旧-agent-designerと-cx-agent-studio',
        label: '2.1 Gemini Enterprise のローコードビルダー全体像：Workflow Builder（旧 Agent Designer）と CX Agent Studio',
        lvl3: true,
    },
    {
        id: '22-状態ベースワークフローページ遷移ルートイベントハンドラ',
        label: '2.2 状態ベースワークフロー：ページ・遷移ルート・イベントハンドラ',
        lvl3: true,
    },
    {
        id: '23-システムインストラクションとインコンソールプロンプトテンプレートfew-shot--chain-of-thought',
        label: '2.3 システムインストラクションとインコンソール・プロンプトテンプレート（Few-shot / Chain-of-Thought）',
        lvl3: true,
    },
    {
        id: '3-12-gemini-enterprise-へのエンタープライズデータ接続',
        label: '3. 1.2 Gemini Enterprise へのエンタープライズデータ接続',
    },
    {
        id: '31-agent-search旧-vertex-ai-searchとデータ接続',
        label: '3.1 Agent Search（旧 Vertex AI Search）とデータ接続',
        lvl3: true,
    },
    {
        id: '32-非構造化マルチモーダルデータ動画音声画像の取り込みと処理',
        label: '3.2 非構造化マルチモーダルデータ（動画・音声・画像）の取り込みと処理',
        lvl3: true,
    },
    {
        id: '4-セクション1-ベストプラクティス総まとめ',
        label: '4. セクション1 ベストプラクティス総まとめ',
    },
    {
        id: '5-学習チェックリスト',
        label: '5. 学習チェックリスト',
    },
    {
        id: '6-参考文献',
        label: '6. 参考文献',
    },
];

export type DiagramId =
    | 'diag1'
    | 'diag2'
    | 'diag3'
    | 'diag4'
    | 'diag5'
    | 'diag6'
    | 'diag7';

export const DIAGRAMS: Record<DiagramId, string> = {
    diag1: `flowchart TD
    A["セクション1: ローコードツールでのエージェント構築(配点 約13%)"] --> B["1.1 エージェントのワークフロー/動作の設定"]
    A --> C["1.2 エンタープライズデータの接続"]
    B --> B1["Workflow Builder(旧 Agent Designer)とCX Agent Studioの使い分け"]
    B --> B2["状態ベースワークフロー(ページ/遷移ルート/イベントハンドラ)"]
    B --> B3["システムインストラクション/プロンプトテンプレート(Few-shot, CoT)"]
    C --> C1["Agent Searchによるデータ接続"]
    C --> C2["マルチモーダル非構造化データの取り込み"]`,

    diag2: `flowchart TD
    Start["どのような業務を自動化したいか"] --> Q1{"社内向けの汎用タスク自動化か？(例: メール要約, 承認フロー, レポート生成)"}
    Q1 -->|"はい"| AD["Gemini Enterprise Workflow Builder(旧 Agent Designer)を使用"]
    Q1 -->|"いいえ"| Q2{"顧客対応/コンタクトセンター向けの会話型エージェントか？"}
    Q2 -->|"はい"| CXAS["Customer Experience Agent Studio(CX Agent Studio)を使用"]
    Q2 -->|"いいえ"| Q3{"高度なカスタムロジックやコード制御が必要か？"}
    Q3 -->|"はい"| ADK["セクション3: ADKによるプロコード開発を検討"]
    Q3 -->|"いいえ"| AD`,

    diag3: `stateDiagram-v2
    direction LR
    [*] --> WelcomePage
    WelcomePage --> CollectInfoPage: インテントルート(注文したい)
    CollectInfoPage --> ConfirmPage: 条件ルート(全パラメータ充足)
    ConfirmPage --> PaymentPage: インテントルート(支払いへ進む)
    CollectInfoPage --> CollectInfoPage: no-matchイベントハンドラ(再質問)
    ConfirmPage --> EscalationPage: webhook-errorイベントハンドラ
    PaymentPage --> [*]: セッション終了`,

    diag4: `flowchart TD
    Root["エージェントインストラクション(自然言語 または 構造化XML)"] --> Role["role: エージェントの中核機能・責務"]
    Root --> Persona["persona: 性格・トーン・振る舞い"]
    Persona --> Goal["primary_goal: personaの中で主目的を明示"]
    Root --> Constraints["constraints: 従うべきルール・制限事項"]
    Root --> Taskflow["taskflow: 会話フローをサブタスクの連なりとして定義"]
    Taskflow --> Subtask["subtask: taskflow内の個別サブタスク"]
    Subtask --> Step["step: subtask内の個々のステップ"]
    Step --> Trigger["trigger: stepを発火させる条件"]
    Step --> Action["action: 発火時に取るべき行動"]
    Root --> Examples["examples: Few-shotサンプル一式"]`,

    diag5: `sequenceDiagram
    actor User as エンドユーザー
    participant Model as エージェント(Gemini)
    participant Tool as 外部ツール/API
    User->>Model: "[user] ロンドンの天気を教えて"
    Model->>Tool: "[model] tool_code: get_weather(location=London)"
    Tool-->>Model: "tool_outputs: {temperature:15C, condition:Cloudy}"
    Model-->>User: "[model] ロンドンの天気は15度、曇りです"`,

    diag6: `flowchart LR
    subgraph Sources["エンタープライズデータソース"]
        S1["Google Workspace(Gmail/Drive/Calendar)"]
        S2["SaaS(Jira/Confluence/Salesforce/ServiceNow/SharePoint)"]
        S3["Cloud Storage / BigQuery / Webサイト"]
    end
    Sources --> Conn["データコネクタ(取り込み用/読み取り専用/定期同期)<br/>ACL対応コネクタ+ソース側ACL+権限/スコープ+identity syncを<br/>すべて構成した場合にユーザー単位ACLが適用"]
    Sources --> ConnApp["接続アプリ(Workflow Builder)<br/>実行時の検索/データ更新アクション(取り込みではない)"]
    Sources --> Ext["Agent Platform拡張機能<br/>ユーザーに代わる外部アクション実行"]
    Conn --> DS["Agent Searchデータストア(構造化/非構造化/Webサイト)"]
    ConnApp -- "実行時の検索/データ更新アクション" --> Sources
    DS --> Index["検索インデックス(意味検索+キーワード検索)"]
    Index --> Ground["Geminiによるグラウンディング/引用付き回答生成"]
    Ground --> Agent["Gemini Enterpriseエージェント(Workflow Builder / CX Agent Studio)"]
    Index --> MCP["MCPサーバーとしてツール公開"]
    MCP --> Agent
    Agent --> ConnApp
    Agent --> Ext`,

    diag7: `flowchart TD
    Raw["非構造化マルチモーダルデータ(動画/音声/画像/PDF)"] --> Ingest["取り込み(Cloud Storage / Agent Searchデータコネクタ)"]
    Ingest --> Understand["Geminiのネイティブ・マルチモーダル理解(動画はエージェント型動画理解による動的サンプリング)"]
    Ingest --> Embed["Gemini Embedding 2による統一マルチモーダル埋め込み"]
    Embed --> Vector["共有ベクトル空間(テキスト/画像/動画/音声/文書)"]
    Understand --> Agent["エージェントのツール呼び出し・回答生成"]
    Vector --> Search["Agent Search / ベクトル検索によるクロスモーダル検索"]
    Search --> Agent`,
};

export interface ReferenceItem {
    id: string;
    num: number;
    title: string;
    author: string;
    href: string;
    category: string;
}

export const REFERENCES: ReferenceItem[] = [
    {
        id: 'ref1',
        num: 1,
        title: 'Professional Agentic Architect Certification exam guide (PDF)',
        author: 'Google Cloud',
        href: 'https://services.google.com/fh/files/misc/professional_agentic_architect_exam_guide_english.pdf',
        category: '試験ガイド・認定情報',
    },
    {
        id: 'ref2',
        num: 2,
        title: 'Professional Agentic Architect | Google Cloud Learn',
        author: '認定資格の公式概要ページ',
        href: 'https://cloud.google.com/learn/certification/agentic-architect',
        category: '試験ガイド・認定情報',
    },
    {
        id: 'ref3',
        num: 3,
        title: "What's new in Gemini Enterprise | Google Cloud Blog",
        author: 'Google Cloud Blog',
        href: 'https://cloud.google.com/blog/products/ai-machine-learning/whats-new-in-gemini-enterprise',
        category: 'Gemini Enterprise / Workflow Builder（旧 Agent Designer）',
    },
    {
        id: 'ref4',
        num: 4,
        title: 'Agent Designer overview | Gemini Enterprise Documentation',
        author: 'Google Cloud Documentation',
        href: 'https://docs.cloud.google.com/gemini/enterprise/docs/agent-designer',
        category: 'Gemini Enterprise / Workflow Builder（旧 Agent Designer）',
    },
    {
        id: 'ref5',
        num: 5,
        title: 'Create and manage agents using Agent Designer | Gemini Enterprise – Business Edition Help',
        author: 'Google Support Help',
        href: 'https://support.google.com/g/answer/16540723?hl=en',
        category: 'Gemini Enterprise / Workflow Builder（旧 Agent Designer）',
    },
    {
        id: 'ref6',
        num: 6,
        title: 'Gemini Enterprise release notes | Google Cloud Documentation',
        author: 'Google Cloud Documentation',
        href: 'https://docs.cloud.google.com/gemini/enterprise/docs/release-notes',
        category: 'Gemini Enterprise / Workflow Builder（旧 Agent Designer）',
    },
    {
        id: 'ref7',
        num: 7,
        title: 'Agent Platform overview | Gemini Enterprise Agent Platform Documentation',
        author: 'Google Cloud Documentation',
        href: 'https://docs.cloud.google.com/gemini-enterprise-agent-platform/overview',
        category: 'Gemini Enterprise / Workflow Builder（旧 Agent Designer）',
    },
    {
        id: 'ref8',
        num: 8,
        title: 'CX Agent Studio | Google Cloud Documentation',
        author: 'Google Cloud Documentation',
        href: 'https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio',
        category: 'Customer Experience（CX）Agent Studio',
    },
    {
        id: 'ref9',
        num: 9,
        title: 'Flow-based agents | CX Agent Studio Documentation',
        author: 'Google Cloud Documentation',
        href: 'https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/flow',
        category: 'Customer Experience（CX）Agent Studio',
    },
    {
        id: 'ref10',
        num: 10,
        title: 'Instructions | CX Agent Studio Documentation',
        author: 'Google Cloud Documentation',
        href: 'https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/instruction',
        category: 'Customer Experience（CX）Agent Studio',
    },
    {
        id: 'ref11',
        num: 11,
        title: 'Agent Search on Gemini Enterprise Agent Platform | Google Cloud',
        author: 'Google Cloud',
        href: 'https://cloud.google.com/products/gemini-enterprise-agent-platform/agent-search',
        category: 'Agent Search（旧 Vertex AI Search）とデータ接続',
    },
    {
        id: 'ref12',
        num: 12,
        title: 'Create a search data store | Agent Search Documentation',
        author: 'Google Cloud Documentation',
        href: 'https://docs.cloud.google.com/generative-ai-app-builder/docs/create-data-store-es',
        category: 'Agent Search（旧 Vertex AI Search）とデータ接続',
    },
    {
        id: 'ref13',
        num: 13,
        title: 'Integrate Gemini Enterprise Agents with Google Workspace | Google Codelabs',
        author: 'Google Codelabs',
        href: 'https://codelabs.developers.google.com/ge-gws-agents',
        category: 'Agent Search（旧 Vertex AI Search）とデータ接続',
    },
    {
        id: 'ref14',
        num: 14,
        title: 'Agent Search release notes | Google Cloud Documentation',
        author: 'Google Cloud Documentation',
        href: 'https://docs.cloud.google.com/generative-ai-app-builder/docs/release-notes',
        category: 'Agent Search（旧 Vertex AI Search）とデータ接続',
    },
    {
        id: 'ref15',
        num: 15,
        title: 'Gemini Embedding 2 | Gemini Enterprise Agent Platform Documentation',
        author: 'Google Cloud Documentation',
        href: 'https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/embedding-2',
        category: 'マルチモーダルデータとEmbedding',
    },
    {
        id: 'ref16',
        num: 16,
        title: 'Building with Gemini Embedding 2: Agentic multimodal RAG and beyond | Google Developers Blog',
        author: 'Google Developers Blog',
        href: 'https://developers.googleblog.com/building-with-gemini-embedding-2/',
        category: 'マルチモーダルデータとEmbedding',
    },
    {
        id: 'ref17',
        num: 17,
        title: 'Video understanding | Gemini Enterprise Agent Platform Documentation',
        author: 'Google Cloud Documentation',
        href: 'https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/video-understanding',
        category: 'マルチモーダルデータとEmbedding',
    },
    {
        id: 'ref18',
        num: 18,
        title: 'Multimodal datasets | Gemini Enterprise Agent Platform Documentation',
        author: 'Google Cloud Documentation',
        href: 'https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/datasets',
        category: 'マルチモーダルデータとEmbedding',
    },
    {
        id: 'ref19',
        num: 19,
        title: 'Get multimodal embeddings | Gemini Enterprise Agent Platform Documentation',
        author: 'Google Cloud Documentation',
        href: 'https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/embeddings/get-multimodal-embeddings',
        category: 'マルチモーダルデータとEmbedding',
    },
    {
        id: 'ref20',
        num: 20,
        title: 'Gemini Embedding 2 | Gemini Enterprise Agent Platform Documentation',
        author: 'Google Cloud Documentation',
        href: 'https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/embedding-2',
        category: 'マルチモーダルデータとEmbedding',
    },
    {
        id: 'ref21',
        num: 21,
        title: 'Introducing agentic video understanding with Gemini',
        author: 'Google Blog',
        href: 'https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-agentic-video-in-gemini/',
        category: 'マルチモーダルデータとEmbedding',
    },
    {
        id: 'ref22',
        num: 22,
        title: 'Pages | Dialogflow CX Documentation',
        author: 'Google Cloud Documentation',
        href: 'https://docs.cloud.google.com/dialogflow/cx/docs/concept/page',
        category: 'Dialogflow CX 状態ベースワークフロー（基礎概念）',
    },
    {
        id: 'ref23',
        num: 23,
        title: 'Migrating from Dialogflow ES to Dialogflow CX | Google Cloud Documentation',
        author: 'Google Cloud Documentation',
        href: 'https://docs.cloud.google.com/dialogflow/cx/docs/how/migrate',
        category: 'Dialogflow CX 状態ベースワークフロー（基礎概念）',
    },
    {
        id: 'ref24',
        num: 24,
        title: 'State handlers | Dialogflow CX Documentation',
        author: 'Google Cloud Documentation',
        href: 'https://docs.cloud.google.com/dialogflow/cx/docs/concept/handler',
        category: 'Dialogflow CX 状態ベースワークフロー（基礎概念）',
    },
    {
        id: 'ref25',
        num: 25,
        title: 'Pages | Dialogflow CX Documentation',
        author: 'Google Cloud Documentation',
        href: 'https://docs.cloud.google.com/dialogflow/cx/docs/concept/page',
        category: 'Dialogflow CX 状態ベースワークフロー（基礎概念）',
    },
    {
        id: 'ref26',
        num: 26,
        title: 'Professional Agentic Architect | Google Cloud Learn',
        author: 'Google Cloud Learn',
        href: 'https://cloud.google.com/learn/certification/agentic-architect',
        category: '試験ガイド・認定情報',
    },
];

export const CHECKLIST_ITEMS = [
    {
        id: 'chk1',
        text: 'Workflow Builder（旧 Agent Designer）と CX Agent Studio の違いと使い分け基準を説明できる',
    },
    {
        id: 'chk2',
        text: 'Workflow Builder の主要タブ（Chat／Flow／Schedule／Preview）の役割を説明できる',
    },
    {
        id: 'chk3',
        text: 'ページ、インテントルート、条件ルート、イベントハンドラの違いを説明できる',
    },
    {
        id: 'chk4',
        text: '状態ハンドラの「スコープ」と評価順序の基本を理解している',
    },
    {
        id: 'chk5',
        text: 'CX Agent Studio の Flow-based エージェントで既存 Dialogflow CX フローを移行する際の「ブラックボックス原則」を説明できる',
    },
    {
        id: 'chk6',
        text: 'システムインストラクションでの変数・ツール・サブエージェント参照構文（{var}、{@TOOL:}、{@AGENT:}）を使える',
    },
    {
        id: 'chk7',
        text: 'Restructure instructions が生成するXML構造（role／persona／constraints／taskflow／examples等）の各タグの役割を説明できる',
    },
    {
        id: 'chk8',
        text: 'taskflow → subtask → step（trigger／action）の階層構造が、構造化されたタスク分解・指示設計として有効である理由を説明できる',
    },
    {
        id: 'chk9',
        text: 'Few-shotサンプルの4要素（[user]／[model]／tool_code／tool_outputs）を使ってサンプルを書ける',
    },
    {
        id: 'chk10',
        text: 'Few-shotサンプルを使うべき場面と、過学習（overfit）のリスクを説明できる',
    },
    {
        id: 'chk11',
        text: 'グローバルインストラクションとエージェント個別インストラクションの違いと使い分けを説明できる',
    },
    {
        id: 'chk12',
        text: 'Agent Search（旧Vertex AI Search）のデータストアと、データコネクタ／拡張機能の違いを説明できる',
    },
    {
        id: 'chk13',
        text: 'データコネクタでユーザー単位ACLが適用されるための4条件（ACL対応コネクタ・ソース側ACL・必要な権限／スコープ・identity sync）と、データストアと検索アプリが疎結合である利点を説明できる',
    },
    {
        id: 'chk14',
        text: 'Agent SearchのMCPサーバー経由でのツール公開の仕組みを理解している',
    },
    {
        id: 'chk15',
        text: 'Gemini Embedding 2による統一マルチモーダル埋め込み空間の特徴（対応モダリティ・入力量の目安・MRLによる次元数の切り詰め）を説明できる',
    },
    {
        id: 'chk16',
        text: 'Gemini Embedding 2のカスタムタスク指示形式（task: search result | query: {content} のようなプロンプト形式）でタスクを指定できる',
    },
    {
        id: 'chk17',
        text: '従来のテキスト埋め込みAPIが使うtask_type列挙値との違いを説明できる',
    },
    {
        id: 'chk18',
        text: '動画理解における「静的な固定フレームレート処理」と「エージェント型動画理解」の違いを説明できる',
    },
    {
        id: 'chk19',
        text: 'マルチモーダルデータセット（Agent Platform）がBigQueryを基盤とすることと、そのコスト構造を理解している',
    },
];
