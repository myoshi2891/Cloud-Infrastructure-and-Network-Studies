export interface NavItem {
    id: string;
    label: string;
    lvl3?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
    { id: 'はじめに', label: 'はじめに' },
    {
        id: 'セクション2に関連する主な対象ツール',
        label: 'セクション2に関連する主な対象ツール',
    },
    {
        id: '21-コーディングエージェントの効果的な活用',
        label: '2.1 コーディングエージェントの効果的な活用',
    },
    {
        id: '211-mcpサーバーカスタムスキルツールアクセスの設定',
        label: '2.1.1 MCPサーバー・カスタムスキル・ツールアクセスの設定',
        lvl3: true,
    },
    {
        id: '212-セキュアなサンドボックスでのコーディングエージェントの利用',
        label: '2.1.2 セキュアなサンドボックスでのコーディングエージェントの利用',
        lvl3: true,
    },
    {
        id: '213-リファクタリング実行ランタイム最適化脆弱性パッチ適用',
        label: '2.1.3 リファクタリング・実行ランタイム最適化・脆弱性パッチ適用',
        lvl3: true,
    },
    {
        id: '22-エンタープライズワークフロー向けのコーディングエージェントのカスタマイズ',
        label: '2.2 エンタープライズワークフロー向けのコーディングエージェントのカスタマイズ',
    },
    {
        id: '221-antigravityにおけるスキルプラグイン拡張フックルールサブエージェントの作成',
        label: '2.2.1 Antigravityにおけるスキル・プラグイン・拡張フック・ルール・サブエージェントの作成',
        lvl3: true,
    },
    {
        id: '222-agents-cliによるantigravityの拡張構築スケールガバナンス最適化',
        label: '2.2.2 Agents CLIによるAntigravityの拡張（構築・スケール・ガバナンス・最適化）',
        lvl3: true,
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
    | 'diag-7';

export const DIAGRAMS: Record<DiagramId, string> = {
    'diag-1': `pie showData
    title 試験の配点構成（全5セクション）
    "1. ローコードツールでのエージェント構築 (13%)" : 13
    "2. コーディングエージェントの活用 (17%)" : 17
    "3. カスタムエージェントの開発 (33%)" : 33
    "4. 評価とデプロイ (22%)" : 22
    "5. セキュリティとガバナンス (15%)" : 15`,

    'diag-2': `flowchart LR
    Dev["開発者"] -->|自然言語で指示| Agent["コーディングエージェント<br/>(Antigravity / Claude Code on Google Cloud)"]
    Agent -->|常時読み込み| Rules[".agents/rules<br/>プロジェクトルール"]
    Agent -->|オンデマンド読み込み| Skills[".agent/skills/*<br/>SKILL.md (進行的開示)"]
    Agent -->|標準プロトコルで接続| MCP["MCPサーバー群"]
    MCP --> DB[("社内データベース")]
    MCP --> ExtAPI["社外SaaS API"]
    MCP --> GCPTools["Google Cloud MCP Servers"]
    Agent -->|認証・課金・監査を統合| Platform["Google Cloud Agent Platform<br/>(IAM / 課金 / VPC-SC / Cloud Logging)"]
    Platform --> Models["Gemini 3 Pro / Claude Sonnet 4.6 等<br/>(Model Garden)"]`,

    'diag-3': `flowchart TD
    Start["エージェントに実行させる<br/>コードの性質は？"] --> Q1{"本番環境で不特定多数の<br/>未信頼コードを実行するか？"}
    Q1 -->|はい| GKE["GKE Agent Sandbox<br/>(gVisor + SandboxTemplate)"]
    Q1 -->|いいえ| Q2{"複数人・複数デバイスから<br/>統一された開発環境が必要か？"}
    Q2 -->|はい| CW["Cloud Workstations<br/>(標準化されたリモート開発環境)"]
    Q2 -->|いいえ| Q3{"個人のプロトタイピングで<br/>信頼できるコードのみか？"}
    Q3 -->|はい| Local["Antigravityローカル実行<br/>(Terminal Policy: Auto / Agent Decides)"]
    Q3 -->|いいえ| GKE`,

    'diag-4': `flowchart LR
    subgraph Sandbox["GKE Agent Sandbox Pod"]
        AgentCode["エージェントが生成した<br/>コード (未信頼)"] --> Sentry["Sentry<br/>(ユーザー空間の疑似カーネル)"]
        Sentry -->|ファイルI/Oのみ委譲| Gofer["Gofer<br/>(I/Oプロキシ)"]
    end
    Gofer -->|許可された範囲のみ| HostFS["ホストファイルシステム"]
    Sentry -.->|システムコールの<br/>直接到達を遮断| HostKernel["ホストOSカーネル"]`,

    'diag-5': `flowchart LR
    Task["タスク定義<br/>(リファクタ／最適化／パッチ)"] --> Plan["エージェントによる<br/>実行計画 (Plan Artifact)"]
    Plan --> Sandbox["サンドボックス内で実行<br/>(2.1.2のGKE/Cloud Workstations等)"]
    Sandbox --> Test["既存テスト／Evalsetで検証"]
    Test -->|失敗| Plan
    Test -->|成功| Scan["SAST／SCAスキャンを再実行"]
    Scan -->|新たな指摘あり| Plan
    Scan -->|問題なし| Review["人間によるコードレビュー<br/>(PR・差分の確認)"]
    Review -->|却下| Plan
    Review -->|承認| Merge["マージ・デプロイ"]`,

    'diag-6': `flowchart TD
    SessionStart["セッション開始"] --> Rules["ルールを読み込み<br/>(常時・全セッション共通)"]
    Rules --> TaskAnalysis["タスク内容を解析"]
    TaskAnalysis -->|関連スキルを検出| SkillLoad["該当スキルのみ<br/>段階的に読み込み (進行的開示)"]
    TaskAnalysis -->|専門領域に分割可能| Delegate["サブエージェントへ委譲<br/>(独立したコンテキスト)"]
    SkillLoad --> ToolUse["ツールを呼び出し"]
    Delegate --> ToolUse
    ToolUse -->|イベント発火| Hooks["拡張フックを実行<br/>(PreToolUse／PostToolUse等)"]
    Hooks -->|許可| Execute["処理を継続"]
    Hooks -->|ブロック| Abort["処理を中止し警告"]`,

    'diag-7': `sequenceDiagram
    participant Dev as 開発者
    participant Agent as コーディングエージェント<br/>(Antigravity等)
    participant CLI as agents-cli
    participant Cloud as Cloud Run／GKE／Agent Runtime
    participant Obs as Cloud Trace／Cloud Logging
    participant AReg as Agent Registry
    participant SReg as Skill Registry

    Dev->>Agent: 自然言語でエージェント構築を指示
    Agent->>CLI: agents-cli scaffold
    CLI-->>Agent: プロジェクト雛形を生成
    Agent->>CLI: agents-cli eval run
    CLI-->>Agent: golden dataに基づく評価結果
    Agent->>Agent: 指示・コードを反復改善
    Dev->>Agent: デプロイを指示
    Agent->>CLI: agents-cli scaffold enhance --deployment-target
    CLI->>Cloud: デプロイ設定を追加してデプロイ
    Cloud-->>Obs: トレースを自動送信
    Dev->>Agent: 監視基盤のセットアップを指示
    Agent->>Cloud: サービスアカウント／バケット／BQデータセットを作成
    Agent->>CLI: エージェントの公開を指示
    CLI->>AReg: エージェントを公開・登録し発見とガバナンスの対象にする
    Agent->>SReg: スキルの作成／更新／検索／削除を実行`,
};
