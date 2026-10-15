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
    | 'd9';

export interface NavItem {
    id: string;
    label: string;
    icon?: string;
    subItems?: { id: string; label: string }[];
}

export const NAV_ITEMS: NavItem[] = [
    {
        id: 's1',
        label: 'この資料の使い方と試験の位置づけ',
        icon: 'ti ti-book',
    },
    {
        id: 's2',
        label: 'Domain 3 の全体像',
        icon: 'ti ti-route',
    },
    {
        id: 's3',
        label: 'Task 3.1 責任ある AI 原則をビジネス判断に適用する',
        icon: 'ti ti-scale',
        subItems: [
            { id: 's3-1', label: '【Skill 3.1.1】責任ある AI の原則(次元)をビジネスシナリオに適用する' },
            { id: 's3-2', label: '【Skill 3.1.2】事業目標と責任ある AI 原則が衝突したときのトレードオフを整理する' },
            { id: 's3-3', label: '【Skill 3.1.3】責任ある AI をプロジェクト計画に組み込む時期を見極める(Governance by Design)' },
            { id: 's3-4', label: '【Skill 3.1.4】人間の監督が必要な状況と、適切なセーフガードを見極める' },
        ],
    },
    {
        id: 's4',
        label: 'Task 3.2 ガバナンス構造の確立と規制遵守',
        icon: 'ti ti-gavel',
        subItems: [
            { id: 's4-1', label: '【Skill 3.2.1】部門横断の代表と明確な責任を持つ AI ガバナンス体制' },
            { id: 's4-2', label: '【Skill 3.2.2】AI を使う業務プロセスの規制遵守リスクを特定し対処する' },
            { id: 's4-3', label: '【Skill 3.2.3】AI システムに適したアクセス制御とデータセキュリティ' },
            { id: 's4-4', label: '【Skill 3.2.4】AI リスク分類フレームワークで優先順位付けする' },
        ],
    },
    {
        id: 's5',
        label: 'Task 3.3 企業 AI リスクの特定と軽減策の指示',
        icon: 'ti ti-alert-triangle',
        subItems: [
            { id: 's5-1', label: '【Skill 3.3.1】本番 AI のリスク統制と監視の必要性' },
            { id: 's5-2', label: '【Skill 3.3.2】バイアスは複数の段階で発生し、Bias Drift の継続監視が重要' },
            { id: 's5-3', label: '【Skill 3.3.3】有害コンテンツリスクと知的財産(IP)の懸念を管理する' },
            { id: 's5-4', label: '【Skill 3.3.4】AI システムの信頼性リスク(幻覚・データ品質低下・モデルドリフト)' },
        ],
    },
    {
        id: 's6',
        label: 'AWS サービス・フレームワーク早見表(戦略レベル)',
        icon: 'ti ti-settings',
    },
    {
        id: 's7',
        label: '試験対策: 頻出パターンと引っかけポイント',
        icon: 'ti ti-target',
    },
    {
        id: 's8',
        label: '確認問題(自己採点用)',
        icon: 'ti ti-checklist',
    },
    {
        id: 's9',
        label: '参考 URL(根拠ソース)',
        icon: 'ti ti-link',
    },
    {
        id: 's10',
        label: '本資料の注意事項',
        icon: 'ti ti-book',
    },
];

export const DIAGRAMS: Record<DiagramId, string> = {
    d0: `flowchart LR
    D3["Domain 3 AI Governance and Responsible AI Leadership 24%"]
    T1["Task 3.1 責任ある AI 原則を ビジネス判断に適用"]
    T2["Task 3.2 ガバナンス構造の確立と 規制遵守"]
    T3["Task 3.3 企業 AI リスクの特定と 軽減策の指示"]
    D3 --> T1
    D3 --> T2
    D3 --> T3
    T1 --> S11["3.1.1 原則と次元の適用"]
    T1 --> S12["3.1.2 トレードオフの整理"]
    T1 --> S13["3.1.3 設計段階への組み込み"]
    T1 --> S14["3.1.4 人間の監督とセーフガード"]
    T2 --> S21["3.2.1 部門横断の体制と責任"]
    T2 --> S22["3.2.2 規制遵守リスク"]
    T2 --> S23["3.2.3 アクセス制御とデータ保護"]
    T2 --> S24["3.2.4 リスク分類フレームワーク"]
    T3 --> S31["3.3.1 本番のリスク統制と監視"]
    T3 --> S32["3.3.2 バイアスと Bias Drift"]
    T3 --> S33["3.3.3 有害コンテンツと IP"]
    T3 --> S34["3.3.4 信頼性 幻覚 品質劣化 ドリフト"]
    classDef box fill:#ffffff,stroke:#3949ab,stroke-width:1.5px,color:#1f2430
    classDef hub fill:#3949ab,stroke:#1a237e,stroke-width:1.5px,color:#ffffff
    classDef done fill:#e8f5e9,stroke:#2e7d32,stroke-width:1.5px,color:#1b5e20
    class D3 hub
    class T1,T2,T3,S11,S12,S13,S14,S21,S22,S23,S24,S31,S32,S33,S34 box`,

    d1: `flowchart TD
    A["事業目標と責任ある AI 原則が衝突"] --> B["影響を受ける人と 被害の大きさを特定"]
    B --> C{"人の権利 安全 生活に 重大な影響があるか"}
    C -->|はい 高影響| D["原則を優先 人間の監督を強化 展開範囲を限定"]
    C -->|いいえ 低影響| E["リスク許容度の範囲で 軽減策を付けて進める"]
    D --> F["経営層と関連部門で 判断を記録"]
    E --> F
    F --> G["段階的に展開し 指標で監視"]
    G --> H{"許容水準を 超えたか"}
    H -->|はい| I["縮小 停止 または再設計"]
    H -->|いいえ| J["継続 定期的に見直し"]
    classDef box fill:#ffffff,stroke:#3949ab,stroke-width:1.5px,color:#1f2430
    classDef hub fill:#3949ab,stroke:#1a237e,stroke-width:1.5px,color:#ffffff
    classDef done fill:#e8f5e9,stroke:#2e7d32,stroke-width:1.5px,color:#1b5e20
    class A hub
    class B,C,D,F,G,H,I,J box
    class E done`,

    d2: `flowchart LR
    A["1 企画 ユースケース定義"] --> B["2 設計 データとモデル選定"]
    B --> C["3 開発 評価 テストと検証"]
    C --> D["4 展開 承認と段階展開"]
    D --> E["5 運用 監視と改善"]
    E -.->|問題や変化を検知| A
    A --- A1["影響評価 リスク分類"]
    B --- B1["データ権利 プライバシー設計"]
    C --- C1["公平性 安全性 正確性の評価"]
    D --- D1["承認ゲート 人間の監督設計"]
    E --- E1["ドリフトと バイアス監視"]
    classDef box fill:#ffffff,stroke:#3949ab,stroke-width:1.5px,color:#1f2430
    classDef hub fill:#3949ab,stroke:#1a237e,stroke-width:1.5px,color:#ffffff
    classDef done fill:#e8f5e9,stroke:#2e7d32,stroke-width:1.5px,color:#1b5e20
    class A hub
    class B,C,D,E,A1,B1,C1,D1,E1 box`,

    d3: `flowchart TD
    A["AI が出力または アクションを生成"] --> B{"ガードレールに 抵触したか"}
    B -->|はい| C["遮断して定型メッセージ ログに記録"]
    B -->|いいえ| D{"高影響 または 取消不能な内容か"}
    D -->|はい| E["人間が確認して承認"]
    D -->|いいえ| F{"根拠が弱い または 確信度が低いか"}
    F -->|はい| G["人へエスカレーション または回答を控える"]
    F -->|いいえ| H["自動で提供 事後にサンプリング監査"]
    C --> I["インシデントを分析し ルールを改善"]
    E --> I
    G --> I
    classDef box fill:#ffffff,stroke:#3949ab,stroke-width:1.5px,color:#1f2430
    classDef hub fill:#3949ab,stroke:#1a237e,stroke-width:1.5px,color:#ffffff
    classDef done fill:#e8f5e9,stroke:#2e7d32,stroke-width:1.5px,color:#1b5e20
    class A hub
    class B,C,D,E,F,G,I box
    class H done`,

    d4: `flowchart TB
    EXEC["経営層 エグゼクティブスポンサー 最終責任とリスク許容度の決定"]
    BOARD["AI ガバナンス委員会 方針 承認 例外判断"]
    EXEC --> BOARD
    BOARD --> LEGAL["法務 コンプライアンス"]
    BOARD --> SEC["セキュリティ プライバシー"]
    BOARD --> BIZ["事業部門オーナー"]
    BOARD --> TECH["データ AI 技術チーム"]
    BOARD --> HR["人事 教育 倫理"]
    BIZ --> USE["個別 AI ユースケース プロダクトオーナーが説明責任"]
    TECH --> USE
    LEGAL --> USE
    SEC --> USE
    classDef box fill:#ffffff,stroke:#3949ab,stroke-width:1.5px,color:#1f2430
    classDef hub fill:#3949ab,stroke:#1a237e,stroke-width:1.5px,color:#ffffff
    classDef done fill:#e8f5e9,stroke:#2e7d32,stroke-width:1.5px,color:#1b5e20
    class EXEC hub
    class BOARD,LEGAL,SEC,BIZ,TECH,HR box
    class USE done`,

    d5: `flowchart LR
    A["AI 利用業務を棚卸し"] --> B["適用される法令 規格を 法務と特定"]
    B --> C["要件を ユースケースにひもづけ"]
    C --> D["ギャップを評価"]
    D --> E["是正計画と 責任者を決定"]
    E --> F["証跡を保存 ログ 文書 評価結果"]
    F --> G["定期的に見直し 規制変更に追随"]
    G -.-> A
    classDef box fill:#ffffff,stroke:#3949ab,stroke-width:1.5px,color:#1f2430
    classDef hub fill:#3949ab,stroke:#1a237e,stroke-width:1.5px,color:#ffffff
    classDef done fill:#e8f5e9,stroke:#2e7d32,stroke-width:1.5px,color:#1b5e20
    class A hub
    class B,C,D,E,F,G box`,

    d6: `flowchart TD
    A["ユースケース登録"] --> B["リスクの観点で評価 影響 自律度 データ 誤りのコスト 規制"]
    B --> C{"リスクティア"}
    C -->|高| D["フルレビュー 影響評価 人間の監督必須 委員会承認 継続監視を強化"]
    C -->|中| E["標準レビュー 評価とガードレール 責任者の承認"]
    C -->|低| F["簡易チェック 利用ポリシーの遵守と サンプリング監査"]
    D --> G["ライフサイクル全体で 再分類と見直し"]
    E --> G
    F --> G
    classDef box fill:#ffffff,stroke:#3949ab,stroke-width:1.5px,color:#1f2430
    classDef hub fill:#3949ab,stroke:#1a237e,stroke-width:1.5px,color:#ffffff
    classDef done fill:#e8f5e9,stroke:#2e7d32,stroke-width:1.5px,color:#1b5e20
    class A hub
    class B,C,D,E,G box
    class F done`,

    d7: `flowchart LR
    A["本番運用"] --> B["監視 品質 コスト 利用状況 安全性 苦情"]
    B --> C{"しきい値を 超えたか"}
    C -->|いいえ| A
    C -->|はい| D["アラートと 担当者への通知"]
    D --> E["原因の調査 データ モデル プロンプト 規制"]
    E --> F["是正 再学習 設定変更 停止"]
    F --> G["再評価と承認"]
    G --> A
    classDef box fill:#ffffff,stroke:#3949ab,stroke-width:1.5px,color:#1f2430
    classDef hub fill:#3949ab,stroke:#1a237e,stroke-width:1.5px,color:#ffffff
    classDef done fill:#e8f5e9,stroke:#2e7d32,stroke-width:1.5px,color:#1b5e20
    class A hub
    class B,C,D,E,F,G box`,

    d8: `flowchart LR
    A["データ収集 偏った標本 過去の差別"] --> B["ラベル付け 前処理 主観 誤ラベル"]
    B --> C["モデル選定 学習 目的関数 指標の偏り"]
    C --> D["評価 少数グループの未検証"]
    D --> E["展開 利用 想定外の使い方"]
    E --> F["運用 フィードバック 偏りの増幅 ドリフト"]
    F -.->|Bias Drift を監視| A
    classDef box fill:#ffffff,stroke:#3949ab,stroke-width:1.5px,color:#1f2430
    classDef hub fill:#3949ab,stroke:#1a237e,stroke-width:1.5px,color:#ffffff
    classDef done fill:#e8f5e9,stroke:#2e7d32,stroke-width:1.5px,color:#1b5e20
    class A hub
    class B,C,D,E,F box`,

    d9: `flowchart TB
    A["層 1 設計 用途を絞る 信頼できる データソースを用意"] --> B["層 2 根拠づけ RAG で社内の 正しい情報を参照させる"]
    B --> C["層 3 出力チェック 根拠の一致確認 ルール検証"]
    C --> D["層 4 人間の監督 高リスクはレビュー"]
    D --> E["層 5 継続監視 品質 ドリフト データ鮮度"]
    E --> F["是正と再評価"]
    F -.-> A
    classDef box fill:#ffffff,stroke:#3949ab,stroke-width:1.5px,color:#1f2430
    classDef hub fill:#3949ab,stroke:#1a237e,stroke-width:1.5px,color:#ffffff
    classDef done fill:#e8f5e9,stroke:#2e7d32,stroke-width:1.5px,color:#1b5e20
    class A hub
    class B,C,D,F box
    class E done`,
};
