export interface SubNavItem {
    id: string;
    label: string;
}

export interface NavItem {
    id: string;
    label: string;
    icon: string;
    subItems?: SubNavItem[];
}

export const NAV_ITEMS: NavItem[] = [
    {
        "id": "s1",
        "label": "この試験と Domain 2 の位置づけ",
        "icon": "ti-info-circle",
        "subItems": [
            {
                "id": "s1-h1",
                "label": "試験の概要"
            },
            {
                "id": "s1-h2",
                "label": "4 つのドメインと配点"
            },
            {
                "id": "s1-h3",
                "label": "Domain 2 の 3 つの Task と 14 の Skill"
            },
            {
                "id": "s1-h4",
                "label": "Domain 2 を一言でいうと"
            },
            {
                "id": "s1-h5",
                "label": "試験範囲外のこと (学習の線引き)"
            }
        ]
    },
    {
        "id": "s2",
        "label": "Step 0: 最初に覚える用語",
        "icon": "ti-abc"
    },
    {
        "id": "s3",
        "label": "Task 2.1: AI 戦略をビジネス目標に整合させる",
        "icon": "ti-target-arrow",
        "subItems": [
            {
                "id": "s3-h1",
                "label": "Skill 2.1.1: 高インパクトなユースケースを特定し、成果にマッピングする"
            },
            {
                "id": "s3-h2",
                "label": "Skill 2.1.2: Build-Buy-Partner を評価する"
            },
            {
                "id": "s3-h3",
                "label": "Skill 2.1.3: イニシアチブを優先順位付けし、拡大・一時停止・終了を判断する"
            },
            {
                "id": "s3-h4",
                "label": "Skill 2.1.4: AI が適切でないケースを見極める"
            },
            {
                "id": "s3-h5",
                "label": "Skill 2.1.5: 業務・AI プラットフォームの移行時の検討事項"
            }
        ]
    },
    {
        "id": "s4",
        "label": "Task 2.2: AI のビジネス価値を測定し実証する",
        "icon": "ti-chart-bar",
        "subItems": [
            {
                "id": "s4-h1",
                "label": "Skill 2.2.1: KPI を定義する"
            },
            {
                "id": "s4-h2",
                "label": "Skill 2.2.2: 導入前にベースライン指標を確立する"
            },
            {
                "id": "s4-h3",
                "label": "Skill 2.2.3: ROI を包括的に算出する"
            },
            {
                "id": "s4-h4",
                "label": "Skill 2.2.4: 成功を予測する先行指標を特定する"
            },
            {
                "id": "s4-h5",
                "label": "Skill 2.2.5: コスト要因の基本的な管理"
            }
        ]
    },
    {
        "id": "s5",
        "label": "Task 2.3: 競争優位のために AI を位置づける",
        "icon": "ti-trophy",
        "subItems": [
            {
                "id": "s5-h1",
                "label": "Skill 2.3.1: 競争環境を評価し、AI 導入の優位性を特定する"
            },
            {
                "id": "s5-h2",
                "label": "Skill 2.3.2: ビジネスモデルを変革する機会を特定する"
            },
            {
                "id": "s5-h3",
                "label": "Skill 2.3.3: 持続的な競争優位と業務改善を説明する"
            },
            {
                "id": "s5-h4",
                "label": "Skill 2.3.4: 業界の成熟度と競争動向に応じた投資水準を決める"
            }
        ]
    },
    {
        "id": "s6",
        "label": "Domain 2 に登場する AWS のサービス、フレームワーク、ツール",
        "icon": "ti-cloud"
    },
    {
        "id": "s7",
        "label": "Domain 2 全体を貫く判断の型",
        "icon": "ti-route"
    },
    {
        "id": "s8",
        "label": "練習問題",
        "icon": "ti-puzzle"
    },
    {
        "id": "s9",
        "label": "直前チェックリスト",
        "icon": "ti-checklist"
    },
    {
        "id": "s10",
        "label": "用語集",
        "icon": "ti-book"
    },
    {
        "id": "s11",
        "label": "参考文献 (ソース URL)",
        "icon": "ti-link",
        "subItems": [
            {
                "id": "s11-h1",
                "label": "試験の公式情報 (一次情報)"
            },
            {
                "id": "s11-h2",
                "label": "AWS の公式ドキュメント (サービス、フレームワーク、料金)"
            },
            {
                "id": "s11-h3",
                "label": "補助的な情報源 (参考)"
            },
            {
                "id": "s11-h4",
                "label": "注意事項"
            }
        ]
    }
];

export type DiagramId = 'd0' | 'd1' | 'd2' | 'd3' | 'd4' | 'd5' | 'd6' | 'd7' | 'd8' | 'd9' | 'd10' | 'd11' | 'd12' | 'd13' | 'd14' | 'd15' | 'd16' | 'd17' | 'd18' | 'd19';

export const DIAGRAMS: Record<DiagramId, string> = {
    d0: "flowchart TD\n    D2[\"Domain 2 AI 戦略と価値創出\"]\n    T1[\"Task 2.1 戦略をビジネス目標に整合させる\"]\n    T2[\"Task 2.2 価値を測定し実証する\"]\n    T3[\"Task 2.3 競争優位のために位置づける\"]\n    S1[\"2.1.1 ユースケースと成果の対応づけ\"]\n    S2[\"2.1.2 Build Buy Partner\"]\n    S3[\"2.1.3 優先順位付けと拡大 停止の判断\"]\n    S4[\"2.1.4 AI を使わない判断\"]\n    S5[\"2.1.5 移行時の検討事項\"]\n    M1[\"2.2.1 KPI\"]\n    M2[\"2.2.2 ベースライン\"]\n    M3[\"2.2.3 ROI\"]\n    M4[\"2.2.4 先行指標\"]\n    M5[\"2.2.5 コスト管理\"]\n    C1[\"2.3.1 競争環境の評価\"]\n    C2[\"2.3.2 ビジネスモデル変革\"]\n    C3[\"2.3.3 持続的な競争優位\"]\n    C4[\"2.3.4 投資水準の決定\"]\n    D2 --> T1\n    D2 --> T2\n    D2 --> T3\n    T1 --> S1\n    T1 --> S2\n    T1 --> S3\n    T1 --> S4\n    T1 --> S5\n    T2 --> M1\n    T2 --> M2\n    T2 --> M3\n    T2 --> M4\n    T2 --> M5\n    T3 --> C1\n    T3 --> C2\n    T3 --> C3\n    T3 --> C4\n    classDef hub fill:#e0e4ff,stroke:#4a55b0,color:#1a1f4d\n    class D2 hub",
    d1: "flowchart LR\n    A[\"何の課題を解くか\"] --> B[\"どう調達するか\"]\n    B --> C[\"どれを先にやるか\"]\n    C --> D[\"本当に AI が必要か\"]\n    D --> E[\"どう測るか\"]\n    E --> F[\"いくら使い どう守るか\"]\n    F --> G[\"競争上どう位置づけるか\"]\n    classDef hub fill:#e0e4ff,stroke:#4a55b0,color:#1a1f4d\n    classDef done fill:#d6f0dc,stroke:#3a8a52,color:#0f3a1c\n    class A hub\n    class G done",
    d2: "flowchart TD\n    A[\"ビジネス目標\"] --> B[\"2.1.1 ユースケースを見つけ 成果に対応づける\"]\n    B --> C[\"2.1.4 AI が本当に必要か確認\"]\n    C -->|\"必要\"| D[\"2.1.2 作る 買う 組む を決める\"]\n    C -->|\"不要\"| X[\"別の解決策を採用\"]\n    D --> E[\"2.1.3 優先順位をつける\"]\n    E --> F[\"拡大 一時停止 終了を判断\"]\n    F --> G[\"2.1.5 移行を計画して実行\"]\n    classDef hub fill:#e0e4ff,stroke:#4a55b0,color:#1a1f4d\n    classDef box fill:#fbeecb,stroke:#b8891f,color:#4a3300\n    classDef done fill:#d6f0dc,stroke:#3a8a52,color:#0f3a1c\n    class A hub\n    class C box\n    class G done",
    d3: "flowchart LR\n    A[\"ビジネス課題\"] --> B[\"達成したい成果と指標\"]\n    B --> C[\"必要な AI の能力\"]\n    C --> D[\"使えるデータ\"]\n    D --> E[\"ユースケース案\"]\n    E --> F[\"優先順位付けへ\"]\n    classDef hub fill:#e0e4ff,stroke:#4a55b0,color:#1a1f4d\n    classDef done fill:#d6f0dc,stroke:#3a8a52,color:#0f3a1c\n    class A hub\n    class F done",
    d4: "flowchart TD\n    A[\"ユースケースが決まった\"] --> B{\"一般的な課題で 既製品で足りるか\"}\n    B -->|\"はい\"| C[\"Buy 既製品や SaaS を検討\"]\n    B -->|\"いいえ\"| D{\"差別化の源泉か 独自データを活かせるか\"}\n    D -->|\"はい\"| E{\"社内に人材と時間があるか\"}\n    D -->|\"いいえ\"| F[\"Buy か Partner を検討\"]\n    E -->|\"はい\"| G[\"Build 自社で開発\"]\n    E -->|\"いいえ\"| H[\"Partner と共同で開発\"]\n    C --> I[\"規制 予算 ベンダー提案で最終確認\"]\n    F --> I\n    G --> I\n    H --> I\n    classDef hub fill:#e0e4ff,stroke:#4a55b0,color:#1a1f4d\n    classDef box fill:#fbeecb,stroke:#b8891f,color:#4a3300\n    classDef done fill:#d6f0dc,stroke:#3a8a52,color:#0f3a1c\n    class A hub\n    class B box\n    class D box\n    class E box\n    class I done",
    d5: "flowchart TD\n    A[\"節目のレビュー\"] --> B{\"目標指標を達成したか\"}\n    B -->|\"はい\"| C{\"拡大しても採算と体制は持つか\"}\n    B -->|\"いいえ\"| D{\"原因は解決できるか\"}\n    C -->|\"はい\"| E[\"拡大する\"]\n    C -->|\"いいえ\"| F[\"一時停止して 体制とコストを見直す\"]\n    D -->|\"はい\"| G[\"一時停止して 改善後に再評価\"]\n    D -->|\"いいえ\"| H[\"終了して 学びを記録する\"]\n    classDef hub fill:#e0e4ff,stroke:#4a55b0,color:#1a1f4d\n    classDef box fill:#fbeecb,stroke:#b8891f,color:#4a3300\n    classDef done fill:#d6f0dc,stroke:#3a8a52,color:#0f3a1c\n    class A hub\n    class B box\n    class C box\n    class D box\n    class E done",
    d6: "flowchart TD\n    A[\"解きたい課題がある\"] --> B{\"決まったルールで書けるか\"}\n    B -->|\"はい\"| C[\"ルールベース自動化を採用\"]\n    B -->|\"いいえ\"| D{\"十分な品質のデータがあるか\"}\n    D -->|\"いいえ\"| E[\"まずデータ整備やプロセス改善\"]\n    D -->|\"はい\"| F{\"誤りの許容度は十分に高いか\"}\n    F -->|\"いいえ\"| G[\"人の判断が中心 AI は補助に限定\"]\n    F -->|\"はい\"| H{\"費用に見合う価値があるか\"}\n    H -->|\"いいえ\"| I[\"導入を見送る\"]\n    H -->|\"はい\"| J[\"AI の活用を進める\"]\n    classDef hub fill:#e0e4ff,stroke:#4a55b0,color:#1a1f4d\n    classDef box fill:#fbeecb,stroke:#b8891f,color:#4a3300\n    classDef done fill:#d6f0dc,stroke:#3a8a52,color:#0f3a1c\n    class A hub\n    class B box\n    class D box\n    class F box\n    class H box\n    class J done",
    d7: "flowchart LR\n    A[\"現状の評価とベースライン取得\"] --> B[\"移行計画とリスクの洗い出し\"]\n    B --> C[\"小規模で試験導入\"]\n    C --> D[\"新旧を並行運用して比較\"]\n    D --> E[\"基準を満たしたら段階的に切り替え\"]\n    E --> F[\"旧環境を停止し 効果を検証\"]\n    classDef hub fill:#e0e4ff,stroke:#4a55b0,color:#1a1f4d\n    classDef done fill:#d6f0dc,stroke:#3a8a52,color:#0f3a1c\n    class A hub\n    class F done",
    d8: "flowchart LR\n    A[\"2.2.1 KPI を決める\"] --> B[\"2.2.2 導入前のベースラインを取る\"]\n    B --> C[\"導入して測定する\"]\n    C --> D[\"2.2.4 先行指標で早めに軌道を確認\"]\n    D --> E[\"2.2.3 ROI を算出する\"]\n    E --> F[\"2.2.5 コストを管理し最適化する\"]\n    F --> G[\"拡大 改善 終了の判断へ\"]\n    classDef hub fill:#e0e4ff,stroke:#4a55b0,color:#1a1f4d\n    classDef done fill:#d6f0dc,stroke:#3a8a52,color:#0f3a1c\n    class A hub\n    class G done",
    d9: "flowchart TD\n    A[\"ビジネス目標\"] --> B[\"期待する成果\"]\n    B --> C[\"有形の KPI\"]\n    B --> D[\"無形の KPI\"]\n    C --> E[\"目標値と期限を設定\"]\n    D --> E\n    E --> F[\"担当者とデータの取得方法を決める\"]\n    classDef hub fill:#e0e4ff,stroke:#4a55b0,color:#1a1f4d\n    classDef done fill:#d6f0dc,stroke:#3a8a52,color:#0f3a1c\n    class A hub\n    class F done",
    d10: "flowchart TD\n    A[\"測る KPI を決める\"] --> B[\"現在の値を測る\"]\n    B --> C[\"定義と計測方法を文書化\"]\n    C --> D[\"季節や繁閑の影響を考慮して期間を決める\"]\n    D --> E[\"導入後も同じ方法で測る\"]\n    E --> F[\"差を効果として評価\"]\n    classDef hub fill:#e0e4ff,stroke:#4a55b0,color:#1a1f4d\n    classDef done fill:#d6f0dc,stroke:#3a8a52,color:#0f3a1c\n    class A hub\n    class F done",
    d11: "flowchart TD\n    A[\"便益を洗い出す\"] --> B[\"金額に換算し 実現率を反映\"]\n    C[\"コストを洗い出す\"] --> D[\"初期費用と運用費を分けて集計\"]\n    B --> E[\"期間ごとの純便益を計算\"]\n    D --> E\n    E --> F[\"ROI と回収期間を算出\"]\n    F --> G[\"感度分析で前提を変えて確認\"]\n    classDef hub fill:#e0e4ff,stroke:#4a55b0,color:#1a1f4d\n    classDef box fill:#fbeecb,stroke:#b8891f,color:#4a3300\n    classDef done fill:#d6f0dc,stroke:#3a8a52,color:#0f3a1c\n    class A hub\n    class C hub\n    class G done",
    d12: "flowchart LR\n    A[\"教育と周知\"] --> B[\"利用率の上昇\"]\n    B --> C[\"作業時間の短縮\"]\n    C --> D[\"コスト削減と生産性の向上\"]\n    D --> E[\"ROI の改善\"]\n    classDef hub fill:#e0e4ff,stroke:#4a55b0,color:#1a1f4d\n    classDef done fill:#d6f0dc,stroke:#3a8a52,color:#0f3a1c\n    class A hub\n    class E done",
    d13: "flowchart TD\n    A[\"Pricing Calculator で事前に見積もる\"] --> B[\"予算とアラートを設定\"]\n    B --> C[\"利用開始 タグで費用を配分\"]\n    C --> D[\"Cost Explorer で実績を分析\"]\n    D --> E{\"見積もりや予算と乖離があるか\"}\n    E -->|\"はい\"| F[\"原因を調べて最適化を実施\"]\n    E -->|\"いいえ\"| G[\"継続して監視\"]\n    F --> A\n    G --> D\n    classDef hub fill:#e0e4ff,stroke:#4a55b0,color:#1a1f4d\n    classDef box fill:#fbeecb,stroke:#b8891f,color:#4a3300\n    classDef done fill:#d6f0dc,stroke:#3a8a52,color:#0f3a1c\n    class A hub\n    class E box\n    class G done",
    d14: "flowchart LR\n    A[\"2.3.1 競争環境を見る\"] --> B[\"2.3.2 ビジネスモデル変革の機会を探る\"]\n    B --> C[\"2.3.3 持続する優位の源泉を築く\"]\n    C --> D[\"2.3.4 投資の水準を決める\"]\n    classDef hub fill:#e0e4ff,stroke:#4a55b0,color:#1a1f4d\n    classDef done fill:#d6f0dc,stroke:#3a8a52,color:#0f3a1c\n    class A hub\n    class D done",
    d15: "flowchart TD\n    A[\"競合と業界の AI 活用を調べる\"] --> B[\"顧客の期待の変化を把握する\"]\n    B --> C[\"自社の強みと使える資産を整理する\"]\n    C --> D[\"差が生まれる領域を特定する\"]\n    D --> E{\"優位が築けるか それとも遅れを取り戻す領域か\"}\n    E -->|\"優位を築ける\"| F[\"攻めの投資を検討\"]\n    E -->|\"遅れている\"| G[\"最低限の水準に追いつく投資を検討\"]\n    classDef hub fill:#e0e4ff,stroke:#4a55b0,color:#1a1f4d\n    classDef box fill:#fbeecb,stroke:#b8891f,color:#4a3300\n    classDef done fill:#d6f0dc,stroke:#3a8a52,color:#0f3a1c\n    class A hub\n    class E box\n    class F done",
    d16: "flowchart TD\n    A[\"既存事業の価値提供を分解\"] --> B[\"AI で変えられる箇所を探す\"]\n    B --> C{\"効率化にとどまるか 新しい価値を生むか\"}\n    C -->|\"効率化\"| D[\"業務改善として実施 ROI で評価\"]\n    C -->|\"新しい価値\"| E[\"新サービスや収益モデルを構想\"]\n    E --> F[\"小さく検証して市場の反応を見る\"]\n    F --> G[\"有望なら投資を拡大\"]\n    classDef hub fill:#e0e4ff,stroke:#4a55b0,color:#1a1f4d\n    classDef box fill:#fbeecb,stroke:#b8891f,color:#4a3300\n    classDef done fill:#d6f0dc,stroke:#3a8a52,color:#0f3a1c\n    class A hub\n    class C box\n    class G done",
    d17: "flowchart LR\n    A[\"AI を業務で使う\"] --> B[\"利用データと成果が蓄積\"]\n    B --> C[\"評価と改善を繰り返す\"]\n    C --> D[\"品質と体験が向上\"]\n    D --> E[\"顧客と利用者が増える\"]\n    E --> A\n    classDef hub fill:#e0e4ff,stroke:#4a55b0,color:#1a1f4d\n    class A hub",
    d18: "flowchart TD\n    A[\"業界の成熟度と競争動向を評価\"] --> B{\"競合が先行し 顧客の期待が変化しているか\"}\n    B -->|\"はい\"| C[\"積極的に投資 優先領域を集中\"]\n    B -->|\"いいえ\"| D{\"AI で市場が変わる兆しがあるか\"}\n    D -->|\"はい\"| E[\"段階的に投資 実験と学習を重視\"]\n    D -->|\"いいえ\"| F[\"小規模に維持 動向を監視\"]\n    C --> G[\"ステージゲートで見直す\"]\n    E --> G\n    F --> G\n    classDef hub fill:#e0e4ff,stroke:#4a55b0,color:#1a1f4d\n    classDef box fill:#fbeecb,stroke:#b8891f,color:#4a3300\n    classDef done fill:#d6f0dc,stroke:#3a8a52,color:#0f3a1c\n    class A hub\n    class B box\n    class D box\n    class G done",
    d19: "flowchart TD\n    A[\"ビジネス課題と目標\"] --> B[\"ユースケースと成果を定義\"]\n    B --> C{\"AI が適切か\"}\n    C -->|\"いいえ\"| Z[\"非 AI の解決策を採用\"]\n    C -->|\"はい\"| D[\"Build Buy Partner を決定\"]\n    D --> E[\"価値と実現可能性などで優先順位付け\"]\n    E --> F[\"KPI とベースラインを設定\"]\n    F --> G[\"段階的に導入し 先行指標を確認\"]\n    G --> H[\"ROI とコストを評価\"]\n    H --> I{\"目標を達成したか\"}\n    I -->|\"はい\"| J[\"拡大して競争優位へつなげる\"]\n    I -->|\"改善の余地あり\"| K[\"一時停止して改善\"]\n    I -->|\"見込みなし\"| L[\"終了して学びを活かす\"]\n    K --> G\n    classDef hub fill:#e0e4ff,stroke:#4a55b0,color:#1a1f4d\n    classDef box fill:#fbeecb,stroke:#b8891f,color:#4a3300\n    classDef done fill:#d6f0dc,stroke:#3a8a52,color:#0f3a1c\n    class A hub\n    class C box\n    class I box\n    class J done",
};
