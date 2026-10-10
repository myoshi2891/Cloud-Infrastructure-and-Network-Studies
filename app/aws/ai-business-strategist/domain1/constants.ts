export type DiagramId =
    | 'd0'
    | 'd1'
    | 'd2'
    | 'd3'
    | 'd4'
    | 'd5'
    | 'd6'
    | 'd7'
    | 'd8'
    | 'd9'
    | 'd10'
    | 'd11'
    | 'd12'
    | 'd13'
    | 'd14'
    | 'd15';

export interface NavItem {
    id: string;
    title: string;
    group?: string;
    isTop?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
    { id: 'top', title: '概要・はじめに', isTop: true },
    { id: '0-domain-1', title: '0. 先に知っておくこと: 試験の全体像と Domain 1 の位置づけ' },
    { id: 'step-1-ai-skill-111', title: 'Step 1: AI の基本概念 (Skill 1.1.1)', group: 'Task 1.1 コア概念と用語' },
    { id: 'step-2-aiml-ai-skill-112', title: 'Step 2: AI・ML・生成 AI の違い (Skill 1.1.2)' },
    { id: 'step-3-skill-113', title: 'Step 3: 構造化データと非構造化データ (Skill 1.1.3)' },
    { id: 'step-4-skill-114', title: 'Step 4: データ品質がなぜ重要か (Skill 1.1.4)' },
    { id: 'step-5-skill-115', title: 'Step 5: 過去データによるモデル学習 (Skill 1.1.5)' },
    { id: 'step-6-skill-116', title: 'Step 6: グローバルな枠組みと共通語彙 (Skill 1.1.6)' },
    { id: 'step-7-ai-skill-121', title: 'Step 7: ルールベース自動化か AI か (Skill 1.2.1)', group: 'Task 1.2 適切な AI ソリューションタイプの選択' },
    { id: 'step-8-ai-skill-122', title: 'Step 8: AI エージェントとは (Skill 1.2.2)' },
    { id: 'step-9-skill-123', title: 'Step 9: 継続的な監視とモデルドリフト (Skill 1.2.3)' },
    { id: 'step-10-ai-ai-skill-124', title: 'Step 10: AI ツールの分類とシャドー AI 対策 (Skill 1.2.4)' },
    { id: 'step-11-skill-131', title: 'Step 11: プロンプトエンジニアリングの基本 (Skill 1.3.1)', group: 'Task 1.3 生成 AI の概念と手法' },
    { id: 'step-12-skill-132', title: 'Step 12: トークン上限とコンテキストウィンドウ (Skill 1.3.2)' },
    { id: 'step-13-rag-skill-133', title: 'Step 13: モデル適応 RAG とファインチューニング (Skill 1.3.3)' },
    { id: 'a-aws', title: '付録 A: 試験に出る AWS サービスとフレームワーク (ビジネスレベル)' },
    { id: 'b', title: '付録 B: 間違えやすいポイント総整理' },
    { id: 'c-15', title: '付録 C: 理解度チェック 15 問' },
    { id: 'd', title: '付録 D: 用語集' },
    { id: 'e-url', title: '付録 E: 参考文献とソース URL' },
];

export const DIAGRAMS: Record<DiagramId, string> = {
    d0: `flowchart LR
    D["Domain 1 AI Fundamentals and Literacy 24パーセント"]:::hub
    D --> T1["Task 1.1 コア概念と用語"]
    D --> T2["Task 1.2 AIソリューションタイプの選択"]
    D --> T3["Task 1.3 生成AIの概念と手法"]
    T1 --> S11["1.1.1 基本概念"]
    T1 --> S12["1.1.2 AI ML 生成AIの違い"]
    T1 --> S13["1.1.3 構造化と非構造化データ"]
    T1 --> S14["1.1.4 データ品質"]
    T1 --> S15["1.1.5 過去データでの学習"]
    T1 --> S16["1.1.6 ISO IEC 23053 と 42001"]
    T2 --> S21["1.2.1 ルールベースかAIか"]
    T2 --> S22["1.2.2 AIエージェント"]
    T2 --> S23["1.2.3 監視とドリフト"]
    T2 --> S24["1.2.4 シャドーAI対策"]
    T3 --> S31["1.3.1 プロンプトエンジニアリング"]
    T3 --> S32["1.3.2 トークンとコンテキスト"]
    T3 --> S33["1.3.3 RAGとファインチューニング"]
    classDef hub fill:#e0e7ff,stroke:#4f46e5,color:#1e1b4b`,

    d1: `flowchart LR
    A["過去データ"] --> B["アルゴリズム"]
    B --> C["学習 training"]
    C --> D["モデル"]:::hub
    N["新しい入力データ"] --> E["推論 inference"]
    D --> E
    E --> F["予測や生成結果"]:::done
    classDef hub fill:#e0e7ff,stroke:#4f46e5,color:#1e1b4b
    classDef done fill:#dcfce7,stroke:#15803d,color:#052e16`,

    d2: `flowchart TD
    AI["AI 人間の知能を要する作業を機械が行う広い分野"]:::hub
    AI --> RB["ルールベースのシステム 学習を伴わない"]
    AI --> ML["機械学習 ML データから学ぶ"]
    ML --> DL["ディープラーニング 多層ニューラルネットワーク"]
    DL --> GEN["生成AI 新しいコンテンツを作る"]:::done
    classDef hub fill:#e0e7ff,stroke:#4f46e5,color:#1e1b4b
    classDef done fill:#dcfce7,stroke:#15803d,color:#052e16`,

    d3: `flowchart TD
    DATA["企業が持つデータ"]:::hub
    DATA --> ST["構造化データ 表形式"]
    DATA --> UN["非構造化データ 文章 画像 音声"]
    ST --> ML1["従来型MLで予測や分類"]
    UN --> DL1["ディープラーニングや生成AIで理解や生成"]
    ML1 --> V["ビジネス価値"]:::done
    DL1 --> V
    classDef hub fill:#e0e7ff,stroke:#4f46e5,color:#1e1b4b
    classDef done fill:#dcfce7,stroke:#15803d,color:#052e16`,

    d4: `flowchart TD
    Q1["データ品質が低い 偏り 古い 誤り 重複"]:::box
    Q1 --> Q2["モデルが誤ったパターンを学習"]
    Q2 --> Q3["予測や回答の精度が低下"]
    Q3 --> Q4["誤った意思決定 顧客の不信 コスト増"]
    Q4 --> Q5["AIへの信頼低下と投資の失敗"]
    Q6["データ品質の管理 ガバナンス"]:::done --> Q7["高品質で代表性のあるデータ"]
    Q7 --> Q8["安定した精度と信頼できる成果"]:::done
    classDef box fill:#fef3c7,stroke:#b45309,color:#451a03
    classDef done fill:#dcfce7,stroke:#15803d,color:#052e16`,

    d5: `flowchart TD
    L1["1 目的と評価基準を決める"] --> L2["2 過去データを集める"]
    L2 --> L3["3 データ品質を確認し整える"]
    L3 --> L4["4 学習用と評価用に分ける"]
    L4 --> L5["5 モデルを学習させる"]
    L5 --> L6["6 未知のデータで評価する"]
    L6 --> L7{"基準を満たすか"}
    L7 -->|"いいえ"| L2
    L7 -->|"はい"| L8["7 本番で推論に使う"]:::done
    L8 --> L9["8 結果を監視しフィードバックを集める"]
    L9 --> L10["9 最新データで再学習"]
    L10 --> L5
    classDef done fill:#dcfce7,stroke:#15803d,color:#052e16`,

    d6: `flowchart TD
    A["ISO IEC 22989 AIの用語と概念"]:::hub
    A --> B["ISO IEC 23053 MLを使うAIシステムの枠組み"]
    A --> C["ISO IEC 23894 AIのリスク管理指針"]
    B --> D["ISO IEC 42001 AIマネジメントシステム"]:::done
    C --> D
    classDef hub fill:#e0e7ff,stroke:#4f46e5,color:#1e1b4b
    classDef done fill:#dcfce7,stroke:#15803d,color:#052e16`,

    d7: `flowchart TD
    S["自動化したい業務"]:::hub --> Q1{"判断ルールを網羅的に書き出せるか"}
    Q1 -->|"はい"| Q2{"入力の形式は固定で例外は少ないか"}
    Q1 -->|"いいえ"| AIN["AIの検討対象"]
    Q2 -->|"はい"| RB["ルールベース自動化を選ぶ"]:::done
    Q2 -->|"いいえ"| AIN
    AIN --> Q3{"学習や参照に使えるデータは十分で品質は良いか"}
    Q3 -->|"いいえ"| DP["まずデータ整備 または人手運用を継続"]:::box
    Q3 -->|"はい"| Q4{"誤りの影響は許容範囲か 人が確認できるか"}
    Q4 -->|"いいえ"| HU["人の判断を中心に AIは補助に限定"]:::box
    Q4 -->|"はい"| AIS["AIソリューションを選ぶ"]:::done
    classDef hub fill:#e0e7ff,stroke:#4f46e5,color:#1e1b4b
    classDef box fill:#fef3c7,stroke:#b45309,color:#451a03
    classDef done fill:#dcfce7,stroke:#15803d,color:#052e16`,

    d8: `flowchart LR
    G["目標や依頼"]:::hub --> P["知覚 情報を集める"]
    P --> R["推論 何をするか計画する"]
    R --> A["行動 ツールやAPIを呼ぶ"]
    A --> O["結果を確認"]
    O --> Q{"目標を達成したか"}
    Q -->|"いいえ"| P
    Q -->|"はい"| D["完了 または人に報告"]:::done
    classDef hub fill:#e0e7ff,stroke:#4f46e5,color:#1e1b4b
    classDef done fill:#dcfce7,stroke:#15803d,color:#052e16`,

    d9: `flowchart TD
    U["利用者の依頼"]:::hub --> O["統括エージェント オーケストレーション"]
    O --> A1["専門エージェント 調査"]
    O --> A2["専門エージェント 分析"]
    O --> A3["専門エージェント 文書作成"]
    A1 --> H{"次のツール呼び出しは取り消せない操作か"}:::box
    A2 --> H
    A3 --> H
    H -->|"いいえ"| T["ツール呼び出し 検索 データベース 社内システムAPI 文書テンプレート"]
    H -->|"はい"| AP["人が承認"]
    AP -->|"承認"| T
    AP -->|"却下"| O
    T --> O
    O --> R["結果を返す"]:::done
    classDef hub fill:#e0e7ff,stroke:#4f46e5,color:#1e1b4b
    classDef box fill:#fef3c7,stroke:#b45309,color:#451a03
    classDef done fill:#dcfce7,stroke:#15803d,color:#052e16`,

    d10: `flowchart TD
    M1["本番で AI を稼働"]:::hub --> M2["入出力と成果指標を記録"]
    M2 --> M3["基準線 ベースライン と比較"]
    M3 --> M4{"しきい値を超えたか"}
    M4 -->|"いいえ"| M2
    M4 -->|"はい"| M5["アラートで担当者に通知"]:::box
    M5 --> M6["原因を調べる データ プロンプト 環境の変化"]
    M6 --> M7["対処 データ更新 再学習 プロンプトやRAG更新 一時停止"]
    M7 --> M8["再評価して再展開"]:::done
    M8 --> M2
    classDef hub fill:#e0e7ff,stroke:#4f46e5,color:#1e1b4b
    classDef box fill:#fef3c7,stroke:#b45309,color:#451a03
    classDef done fill:#dcfce7,stroke:#15803d,color:#052e16`,

    d11: `flowchart TD
    N1["従業員が新しいAIツールの利用を申請 または検出"]:::hub --> N2["AIガバナンス委員会や担当が評価"]
    N2 --> N3{"データ 権限 規制 リスクを評価"}
    N3 -->|"問題なし"| N4["承認済みリストに登録"]:::done
    N3 -->|"条件付きなら可"| N5["条件付き 評価中に登録し利用条件を明示"]:::box
    N3 -->|"リスクが高い"| N6["ブロックリストに登録し理由と代替手段を案内"]:::box
    N4 --> N7["利用状況を継続監視 定期的に再評価"]
    N5 --> N7
    N6 --> N7
    N7 --> N2
    classDef hub fill:#e0e7ff,stroke:#4f46e5,color:#1e1b4b
    classDef box fill:#fef3c7,stroke:#b45309,color:#451a03
    classDef done fill:#dcfce7,stroke:#15803d,color:#052e16`,

    d12: `flowchart LR
    P1["目的と成功基準を決める"]:::hub --> P2["プロンプトを書く 役割 条件 形式 例"]
    P2 --> P3["複数の入力で試す"]
    P3 --> P4["出力を評価 正確性 形式 トーン"]
    P4 --> P5{"基準を満たすか"}
    P5 -->|"いいえ"| P6["指示を具体化 例を追加 条件を分割"]
    P6 --> P2
    P5 -->|"はい"| P7["テンプレートとして共有 バージョン管理"]:::done
    classDef hub fill:#e0e7ff,stroke:#4f46e5,color:#1e1b4b
    classDef done fill:#dcfce7,stroke:#15803d,color:#052e16`,

    d13: `flowchart TD
    C1["システムの指示 役割と規則"] --> SUM["入力トークンの合計"]
    C2["会話の履歴"] --> SUM
    C3["参照文書 RAGで取得した内容"] --> SUM
    C4["利用者の質問"] --> SUM
    SUM --> CHK{"入力と出力の合計は上限内か"}
    CHK -->|"はい"| OUT["回答を生成"]:::done
    CHK -->|"いいえ"| FIX["対策が必要 要約 分割 絞り込み モデル変更"]:::box
    FIX --> SUM
    classDef box fill:#fef3c7,stroke:#b45309,color:#451a03
    classDef done fill:#dcfce7,stroke:#15803d,color:#052e16`,

    d14: `flowchart LR
    R1["利用者の質問"]:::hub --> R2["関連する文書を検索"]
    R2 --> R3["社内文書や データベース"]
    R3 --> R4["取得した内容を質問に追加"]
    R4 --> R5["基盤モデルが回答を生成"]
    R5 --> R6["出典つきの回答"]:::done
    classDef hub fill:#e0e7ff,stroke:#4f46e5,color:#1e1b4b
    classDef done fill:#dcfce7,stroke:#15803d,color:#052e16`,

    d15: `flowchart TD
    A["生成AIの出力が要件に足りない"]:::hub --> B{"プロンプトの改善で解決するか"}
    B -->|"はい"| B1["プロンプトエンジニアリングで対応"]:::done
    B -->|"いいえ"| C{"原因は 最新情報や社内知識の不足か"}
    C -->|"はい"| C1["RAGを導入 データ品質と権限を整備"]:::done
    C -->|"いいえ"| D{"原因は 形式 トーン 専門的な振る舞いか"}
    D -->|"はい"| D1["ファインチューニングを検討 ラベル付きデータを準備"]:::done
    D -->|"いいえ"| E{"専門領域の言語理解が根本的に不足か"}
    E -->|"はい"| E1["継続事前学習や独自モデルは最後の選択肢"]:::box
    E -->|"いいえ"| F["要件やモデル選定を見直す"]:::box
    C1 --> G{"本番で遅延やコストが高いか"}
    D1 --> G
    G -->|"はい"| G2{"計測したボトルネックはどこか"}
    G2 -->|"RAGの検索"| H1["検索を最適化 チャンク 取得件数 インデックス キャッシュ"]:::done
    G2 -->|"モデル推論"| H["蒸留で小さなモデルへ"]:::done
    classDef hub fill:#e0e7ff,stroke:#4f46e5,color:#1e1b4b
    classDef box fill:#fef3c7,stroke:#b45309,color:#451a03
    classDef done fill:#dcfce7,stroke:#15803d,color:#052e16`,
};
