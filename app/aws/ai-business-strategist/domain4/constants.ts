export interface SubNavItem {
    id: string;
    label: string;
}

export interface NavItem {
    id: string;
    label: string;
    icon?: string;
    subItems?: SubNavItem[];
}

export const NAV_ITEMS: NavItem[] = [
    {
        id: 's0',
        label: 'この文書について',
        icon: 'ti ti-info-circle',
    },
    {
        id: 's1',
        label: '試験の全体像と Domain 4 の位置づけ',
        icon: 'ti ti-compass',
    },
    {
        id: 's2',
        label: 'Domain 4 の地図(全 19 スキル)',
        icon: 'ti ti-map-2',
    },
    {
        id: 's3',
        label: 'Task 4.1 AI の準備度と成熟度を評価する',
        icon: 'ti ti-gauge',
        subItems: [
            { id: 'k4-1-1', label: '4.1.1 事業準備度を複数の観点で評価する' },
            { id: 'k4-1-2', label: '4.1.2 AI 成熟度モデルで現在地を評価する' },
            { id: 'k4-1-3', label: '4.1.3 人・プロセス・技術・ガバナンスの能力ギャップを特定する' },
            { id: 'k4-1-4', label: '4.1.4 投資の優先順位と成長の道筋を作る' },
        ],
    },
    {
        id: 's4',
        label: 'Task 4.2 データとインフラの土台を整える',
        icon: 'ti ti-database',
        subItems: [
            { id: 'k4-2-1', label: '4.2.1 データの準備度を評価する(品質・アクセス性・サイロ)' },
            { id: 'k4-2-2', label: '4.2.2 データ戦略・オーナーシップ・共有の枠組み' },
            { id: 'k4-2-3', label: '4.2.3 技術・インフラ要件を戦略レベルで評価する' },
        ],
    },
    {
        id: 's5',
        label: 'Task 4.3 全社の変革を率い、AI 人材を育てる',
        icon: 'ti ti-users-group',
        subItems: [
            { id: 'k4-3-1', label: '4.3.1 経営層のスポンサーシップと AI チャンピオン' },
            { id: 'k4-3-2', label: '4.3.2 部門横断チームと明確な責任体制' },
            { id: 'k4-3-3', label: '4.3.3 透明なコミュニケーション戦略' },
            { id: 'k4-3-4', label: '4.3.4 文化的な障壁を見抜き、リーダーの介入策を決める' },
            { id: 'k4-3-5', label: '4.3.5 AI リテラシーを加速する人材育成の手法' },
            { id: 'k4-3-6', label: '4.3.6 人の役割を「手作業」から「監督と協働」へ移す' },
        ],
    },
    {
        id: 's6',
        label: 'Task 4.4 パイロットから全社展開へスケールする',
        icon: 'ti ti-rocket',
        subItems: [
            { id: 'k4-4-1', label: '4.4.1 反復的な変革アプローチ(段階を踏んで進める)' },
            { id: 'k4-4-2', label: '4.4.2 短期の成果から全社展開へ積み上げる' },
            { id: 'k4-4-3', label: '4.4.3 AI センターオブエクセレンス(COE)と部門横断の連携' },
            { id: 'k4-4-4', label: '4.4.4 継続的なフィードバックと成功指標' },
            { id: 'k4-4-5', label: '4.4.5 実験から本番品質への移行(ガバナンスと運用要件)' },
            { id: 'k4-4-6', label: '4.4.6 スケール中に事業継続とパフォーマンスを守る' },
        ],
    },
    {
        id: 's7',
        label: '関連する AWS サービス・フレームワーク早見表',
        icon: 'ti ti-cloud',
    },
    {
        id: 's8',
        label: '試験での判断ルール',
        icon: 'ti ti-bulb',
    },
    {
        id: 's9',
        label: '練習問題(自作)',
        icon: 'ti ti-help-circle',
    },
    {
        id: 's10',
        label: '直前チェックリスト',
        icon: 'ti ti-checklist',
    },
    {
        id: 's11',
        label: '用語集',
        icon: 'ti ti-book',
    },
    {
        id: 's12',
        label: '参考 URL 一覧',
        icon: 'ti ti-link',
    },
];

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
    | 'd11';

export const DIAGRAMS: Record<DiagramId, string> = {
    d0: `flowchart TD
    A["Domain 4 の全体像"]:::hub
    B["4.1 現在地を知る 準備度と成熟度"]:::box
    C["4.2 土台を整える データと基盤"]:::box
    D["4.3 人と文化を動かす 変革リーダーシップ"]:::box
    E["4.4 広げる パイロットから全社展開"]:::done
    A --> B
    B -->|"ギャップを把握"| C
    C -->|"使える状態にする"| D
    D -->|"組織を巻き込む"| E
    E -.->|"学びを次の取り組みへ"| B
    classDef hub fill:#e3e8ff,stroke:#3b4cca,color:#1a1f4d
    classDef box fill:#fff4d6,stroke:#b8860b,color:#3d2e00
    classDef done fill:#dff3e4,stroke:#2e7d32,color:#0f3d16`,

    d1: `flowchart TD
    S["AI 変革を始めたい"]:::hub
    A["リーダーの合意"]:::box
    B["データ品質"]:::box
    C["組織文化"]:::box
    D["技術基盤"]:::box
    E["ガバナンス"]:::box
    G["成熟度モデルで現在地を確認"]:::box
    H["能力ギャップを特定"]:::box
    I["優先順位と成長の道筋を決定"]:::done
    S --> A
    S --> B
    S --> C
    S --> D
    S --> E
    A --> G
    B --> G
    C --> G
    D --> G
    E --> G
    G --> H --> I
    classDef hub fill:#e3e8ff,stroke:#3b4cca,color:#1a1f4d
    classDef box fill:#fff4d6,stroke:#b8860b,color:#3d2e00
    classDef done fill:#dff3e4,stroke:#2e7d32,color:#0f3d16`,

    d2: `flowchart TD
    L1["Level 1 Envision 気づきと用途の発見"]:::hub
    L2["Level 2 Experiment パイロットと PoC で検証"]:::box
    L3["Level 3 Launch 本番への投入と運用"]:::box
    L4["Level 4 Scale 全社展開と再利用"]:::done
    L1 -->|"小さく検証へ"| L2
    L2 -->|"本番要件とガバナンスを整える"| L3
    L3 -->|"運用モデルと再利用部品を整える"| L4
    classDef hub fill:#e3e8ff,stroke:#3b4cca,color:#1a1f4d
    classDef box fill:#fff4d6,stroke:#b8860b,color:#3d2e00
    classDef done fill:#dff3e4,stroke:#2e7d32,color:#0f3d16`,

    d3: `flowchart TD
    A["特定したギャップ"]:::hub
    Q1{"戦略目標に直結するか"}
    Q2{"現在の成熟度で着手できるか"}
    H["最優先で投資"]:::done
    P["前提となる能力を先に整備"]:::box
    L["後回しにして定期的に再評価"]:::box
    A --> Q1
    Q1 -->|"はい"| Q2
    Q1 -->|"いいえ"| L
    Q2 -->|"はい"| H
    Q2 -->|"いいえ"| P
    classDef hub fill:#e3e8ff,stroke:#3b4cca,color:#1a1f4d
    classDef box fill:#fff4d6,stroke:#b8860b,color:#3d2e00
    classDef done fill:#dff3e4,stroke:#2e7d32,color:#0f3d16`,

    d4: `flowchart TD
    A["高品質なデータ"]:::hub
    B["AI モデルの学習または調整"]:::box
    C["予測や生成結果"]:::box
    D["業務成果と顧客価値"]:::done
    E["新しいデータと学び"]:::box
    A --> B --> C --> D --> E --> A
    classDef hub fill:#e3e8ff,stroke:#3b4cca,color:#1a1f4d
    classDef box fill:#fff4d6,stroke:#b8860b,color:#3d2e00
    classDef done fill:#dff3e4,stroke:#2e7d32,color:#0f3d16`,

    d5: `flowchart TD
    S["AI ユースケース候補"]:::hub
    Q1{"必要なデータを特定できているか"}
    Q2{"品質と鮮度は基準を満たすか"}
    Q3{"必要な人が安全にアクセスできるか"}
    A1["データの棚卸しとカタログ化"]:::box
    A2["品質改善と責任者の任命"]:::box
    A3["サイロ解消とアクセス設計"]:::box
    R["再評価する"]:::box
    G["パイロットに着手"]:::done
    S --> Q1
    Q1 -->|"はい"| Q2
    Q1 -->|"いいえ"| A1
    Q2 -->|"はい"| Q3
    Q2 -->|"いいえ"| A2
    Q3 -->|"はい"| G
    Q3 -->|"いいえ"| A3
    A1 --> R
    A2 --> R
    A3 --> R
    R --> Q1
    classDef hub fill:#e3e8ff,stroke:#3b4cca,color:#1a1f4d
    classDef box fill:#fff4d6,stroke:#b8860b,color:#3d2e00
    classDef done fill:#dff3e4,stroke:#2e7d32,color:#0f3d16`,

    d6: `flowchart TD
    A["経営層のスポンサーシップ"]:::hub
    B["AI チャンピオンの任命"]:::box
    C["部門横断チームと責任分担"]:::box
    D["透明なコミュニケーション"]:::box
    E["文化的な壁への介入"]:::box
    F["AI リテラシー向上の施策"]:::box
    G["人は監督と協働へ 役割の移行"]:::done
    A --> B --> C --> D --> E --> F --> G
    classDef hub fill:#e3e8ff,stroke:#3b4cca,color:#1a1f4d
    classDef box fill:#fff4d6,stroke:#b8860b,color:#3d2e00
    classDef done fill:#dff3e4,stroke:#2e7d32,color:#0f3d16`,

    d7: `flowchart TD
    A["手作業中心の業務"]:::hub
    B["AI が下書きや分析を支援"]:::box
    C["人が確認して承認する"]:::box
    D["AI が実行し人が監視する"]:::box
    E["例外や高リスクは人へエスカレーション"]:::done
    A --> B --> C --> D --> E
    classDef hub fill:#e3e8ff,stroke:#3b4cca,color:#1a1f4d
    classDef box fill:#fff4d6,stroke:#b8860b,color:#3d2e00
    classDef done fill:#dff3e4,stroke:#2e7d32,color:#0f3d16`,

    d8: `flowchart TD
    E["Envision 機会の発見と目的の設定"]:::hub
    X["Experiment 小さく検証して学ぶ"]:::box
    L["Launch 本番投入と価値の実証"]:::box
    S["Scale 全社へ拡大と再利用"]:::done
    E --> X --> L --> S
    S -.->|"学びを次の用途へ"| E
    classDef hub fill:#e3e8ff,stroke:#3b4cca,color:#1a1f4d
    classDef box fill:#fff4d6,stroke:#b8860b,color:#3d2e00
    classDef done fill:#dff3e4,stroke:#2e7d32,color:#0f3d16`,

    d9: `flowchart TD
    C["AI COE"]:::hub
    A["ガイダンス ベストプラクティスと教訓"]:::box
    B["能力 ツールとテンプレート"]:::box
    D["教育 研修とハッカソン"]:::box
    E["倫理とガバナンスの支援"]:::box
    F["事業部門との定期的な連携"]:::done
    C --> A
    C --> B
    C --> D
    C --> E
    C --> F
    classDef hub fill:#e3e8ff,stroke:#3b4cca,color:#1a1f4d
    classDef box fill:#fff4d6,stroke:#b8860b,color:#3d2e00
    classDef done fill:#dff3e4,stroke:#2e7d32,color:#0f3d16`,

    d10: `flowchart TD
    V1["Value 解く価値のある課題か"]:::hub
    V2["Visualize 成功をどう測るか"]:::box
    V3["Validate 現実の条件で検証できるか"]:::box
    V4["Verify 本番で大規模に運用できるか"]:::box
    V5["Venture 価値が出るまで資金を確保できるか"]:::done
    V1 --> V2 --> V3 --> V4 --> V5
    classDef hub fill:#e3e8ff,stroke:#3b4cca,color:#1a1f4d
    classDef box fill:#fff4d6,stroke:#b8860b,color:#3d2e00
    classDef done fill:#dff3e4,stroke:#2e7d32,color:#0f3d16`,

    d11: `flowchart TD
    P["パイロットが成功"]:::hub
    Q1{"本番の受け入れ基準を定義したか"}
    Q2{"運用体制と責任者は決まったか"}
    Q3{"ガバナンスと監視は整ったか"}
    Q4{"単位コストは採算に合うか"}
    G["本番へ移行"]:::done
    X["ギャップを解消する"]:::box
    P --> Q1
    Q1 -->|"はい"| Q2
    Q2 -->|"はい"| Q3
    Q3 -->|"はい"| Q4
    Q4 -->|"はい"| G
    Q1 -->|"いいえ"| X
    Q2 -->|"いいえ"| X
    Q3 -->|"いいえ"| X
    Q4 -->|"いいえ"| X
    X --> Q1
    classDef hub fill:#e3e8ff,stroke:#3b4cca,color:#1a1f4d
    classDef box fill:#fff4d6,stroke:#b8860b,color:#3d2e00
    classDef done fill:#dff3e4,stroke:#2e7d32,color:#0f3d16`,
};
