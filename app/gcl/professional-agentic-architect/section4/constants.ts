export interface NavItem {
    id: string;
    label: string;
    lvl3?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
    { id: 'はじめに', label: 'はじめに' },
    {
        id: '41-開発時本番環境でのエージェント評価',
        label: '4.1 開発時・本番環境でのエージェント評価',
    },
    {
        id: '411-テストセットの作成ゴールデンデータプロンプトエッジケース',
        label: '4.1.1 テストセットの作成：ゴールデンデータ、プロンプト、エッジケース',
        lvl3: true,
    },
    {
        id: '412-継続的評価パイプラインの構築ツール実行の評価',
        label: '4.1.2 継続的評価パイプラインの構築：ツール実行の評価',
        lvl3: true,
    },
    {
        id: '413-評価フレームワークとツールの選定',
        label: '4.1.3 評価フレームワークとツールの選定',
        lvl3: true,
    },
    {
        id: '414-ゴールデンデータセットに対するエージェント評価adkを使用',
        label: '4.1.4 ゴールデンデータセットに対するエージェント評価（ADKを使用）',
        lvl3: true,
    },
    {
        id: '42-本番ワークロードのデプロイとスケーリング',
        label: '4.2 本番ワークロードのデプロイとスケーリング',
    },
    {
        id: '421-最適なデプロイランタイムの選定',
        label: '4.2.1 最適なデプロイランタイムの選定',
        lvl3: true,
    },
    {
        id: '422-エージェントの問題のトラブルシューティング',
        label: '4.2.2 エージェントの問題のトラブルシューティング',
        lvl3: true,
    },
    {
        id: '423-パフォーマンス信頼性コストの監視と最適化',
        label: '4.2.3 パフォーマンス・信頼性・コストの監視と最適化',
        lvl3: true,
    },
    {
        id: 'セクション4-試験対象ツール一覧',
        label: 'セクション4 試験対象ツール一覧',
    },
    {
        id: 'ベストプラクティスまとめ',
        label: 'ベストプラクティスまとめ',
    },
    { id: '学習チェックリスト', label: '学習チェックリスト' },
    { id: '出典', label: '出典' },
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
    'diag-1': `flowchart LR
    subgraph DEV["開発フェーズ"]
        A1["ゴールデンデータ・<br/>テストセット作成"]
        A2["ADK Evaluation<br/>(evalset / test file)"]
    end
    subgraph CI["CI/CDフェーズ"]
        B1["継続的評価<br/>パイプライン"]
        B2["Conformance Test<br/>(回帰テスト)"]
    end
    subgraph PROD["本番フェーズ"]
        C1["Agent Runtime /<br/>Cloud Run / GKE<br/>へのデプロイ"]
        C2["Online Monitor<br/>(継続的品質監視)"]
        C3["トラブルシューティング・<br/>パフォーマンス最適化"]
    end
    A1 --> A2 --> B1 --> B2 --> C1 --> C2 --> C3
    C3 -.フィードバック.-> A1`,

    'diag-2': `flowchart TD
    A["エージェントの指示・ツール定義"] --> B{"テストデータの<br/>作成方法は？"}
    B -->|"少数の代表的な<br/>単体テスト"| C["Test File<br/>(*.test.json)<br/>1セッション/ファイル"]
    B -->|"長い・複雑な<br/>マルチターン会話"| D["Evalset<br/>(*.evalset.json)<br/>複数セッションを格納"]
    B -->|"会話の分岐を<br/>動的に検証したい"| E["User Simulation<br/>(会話シナリオ + AIによる<br/>ユーザー発話生成)"]
    C --> F["adk web の Evalタブ、<br/>または pytest で実行"]
    D --> F
    E --> F`,

    'diag-3': `sequenceDiagram
    participant Agent as デプロイ済みエージェント
    participant Trace as Cloud Trace / Cloud Logging
    participant Monitor as Online Monitor<br/>(評価ループ, 既定10分間隔)
    participant Eval as Agent Platform<br/>Evaluation Service
    participant Out as Cloud Logging /<br/>Cloud Monitoring

    loop 約10分ごと
        Agent->>Trace: OpenTelemetry形式の<br/>トレース・ログを出力
        Monitor->>Trace: サンプリング条件に基づき<br/>トレースをクエリ
        Monitor->>Eval: サンプリングしたトレースを<br/>設定済みメトリクスで評価
        Eval-->>Monitor: スコア・根拠を返却
        Monitor->>Out: 結果を書き込み・<br/>数値スコアをエクスポート
    end`,

    'diag-4': `flowchart LR
    A["1. Define eval cases<br/>評価ケースの定義"] --> B["2. Run inferences<br/>推論の実行"]
    B --> C["3. Generate traces<br/>トレースの生成"]
    C --> D["4. Compute metrics<br/>メトリクスの計算"]
    D --> E["5. Conduct analysis<br/>分析の実施"]
    E --> F["6. Optimize the agent<br/>エージェントの最適化"]
    F -.再テスト.-> B`,

    'diag-5': `flowchart TD
    A["spec.yaml を作成<br/>(初期条件・プロンプトを定義)"] --> B["adk web --extra_plugins=<br/>RecordingsPlugin でエージェントを起動"]
    B --> C["adk conformance create<br/>でベースラインを自動記録"]
    C --> D["generated-recordings.yaml /<br/>generated-session.yaml が生成される"]
    D --> E{"コード変更後に<br/>adk conformance test"}
    E -->|"Replay Mode<br/>(既定)"| F["記録済みLLMリクエスト/<br/>レスポンス/ツール呼び出しと<br/>ライブ実行を比較"]
    E -->|"Live Mode<br/>(開発中)"| G["実環境に対して<br/>評価ベースの検証を実行"]
    F --> H{"逸脱を検出？"}
    H -->|Yes| I["リグレッションとして<br/>PRをブロック"]
    H -->|No| J["マージを許可"]`,

    'diag-6': `flowchart TD
    A["エージェントを<br/>どこにデプロイするか？"] --> B{"インフラ運用を<br/>完全にGoogleに<br/>任せたいか？"}
    B -->|Yes| C["Agent Runtime<br/>(旧 Agent Engine)"]
    B -->|No, ある程度<br/>自分で制御したい| D{"ステートレスな<br/>HTTPコンテナで<br/>十分か？"}
    D -->|Yes<br/>スパイク的トラフィック<br/>スケールtoゼロ望む| E["Cloud Run"]
    D -->|No<br/>GPU/カスタム<br/>ネットワーク/既存の<br/>Kubernetes基盤が必要| F["GKE<br/>(Google Kubernetes Engine)"]
    C --> G["Terraformでインフラ管理、<br/>Agents CLIでscaffold<br/>→evaluate→deploy→publish→observe"]
    E --> G
    F --> G`,

    'diag-7': `flowchart TD
    A["症状を特定する"] --> B{"症状の種類"}
    B -->|"時間の経過とともに<br/>品質スコアが低下"| C["ドリフト (Quality Drift)"]
    B -->|"特定のツール呼び出しに<br/>時間がかかる"| D["ツール呼び出しレイテンシ"]
    B -->|"同じツールを繰り返し呼び<br/>結論に到達しない"| E["推論ループ / ハンドオフループ"]
    B -->|"エラー・タイムアウト・<br/>予期しない停止"| F["システム障害"]

    C --> C1["Online Monitorの時系列<br/>チャートで品質指標の推移を確認"]
    D --> D1["Observabilityの Toolsタブで<br/>ツールごとのp95レイテンシ・<br/>呼び出し回数・エラー率を確認"]
    E --> E1["Traces タブでツール呼び出しの<br/>有向非巡回グラフ(DAG)を確認し、<br/>同一ツールの反復呼び出しを特定"]
    F --> F1["Cloud Loggingで severity別の<br/>生ログをフィルタし、<br/>スタックトレース・タイムアウトを確認"]

    C1 --> G["Agent Anomaly Detectionで<br/>カスケード障害・資源枯渇の<br/>自動検知 (プレビュー)"]
    E1 --> G`,

    'diag-8': `flowchart TB
    T["OpenTelemetryログ・実行トレース"] --> L1
    subgraph L1["Layer 1: 軽量MLディテクター"]
        direction LR
        L1A["高速な統計・軽量MLモデルで<br/>ベースライントラフィックから<br/>初期の外れ値を抽出"]
    end
    L1 --> L2
    subgraph L2["Layer 2: 異常分析"]
        direction LR
        L2A["フラグが立ったセッションを<br/>非同期に評価し、<br/>脅威の判定と自然言語の<br/>説明根拠を生成"]
    end
    L2 --> L3
    subgraph L3["Layer 3: 呼び出しレベル分析"]
        direction LR
        L3A["個々のツール実行・実行状態・<br/>パラメータ履歴を会話トレース内で<br/>深掘り分析"]
    end
    L3 --> SCC["Security Command Center<br/>へ検知結果を集約"]`,

    'diag-9': `flowchart LR
    A["300並列リクエスト到着"] --> B{"アイドルインスタンス<br/>あり？"}
    B -->|No| C["コールドスタート<br/>約4.7秒/リクエスト"]
    B -->|Yes<br/>min_instances引き上げ済み| D["ウォームスタート<br/>約0.4〜1.6秒/リクエスト"]
    D --> E{"container_concurrencyは<br/>適切か？"}
    E -->|"既定値のまま(9)"| F["非同期エージェントでも<br/>1リクエストずつ処理<br/>→最大60秒のキュー待ち"]
    E -->|"9の倍数に増加(例:36)"| G["複数リクエストを<br/>並列処理<br/>→最大レイテンシ約7秒"]`,
};
