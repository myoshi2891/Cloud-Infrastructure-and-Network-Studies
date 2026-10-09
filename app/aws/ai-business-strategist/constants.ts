export interface NavItem {
    id: string;
    title: string;
    isGroup?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
    {
        "id": "s2",
        "title": "目次",
        "isGroup": false
    },
    {
        "id": "s3",
        "title": "このガイドの読み方",
        "isGroup": false
    },
    {
        "id": "s4",
        "title": "Step 0 試験の全体像と学習ロードマップ",
        "isGroup": false
    },
    {
        "id": "s12",
        "title": "Domain 1 AI Fundamentals and Literacy(配点 24%)",
        "isGroup": true
    },
    {
        "id": "s13",
        "title": "Step 1 AI の基本概念と用語(Task 1.1)",
        "isGroup": false
    },
    {
        "id": "s19",
        "title": "Step 2 AI ソリューションの種類と選び方(Task 1.2)",
        "isGroup": false
    },
    {
        "id": "s24",
        "title": "Step 3 生成 AI の基本技法(Task 1.3)",
        "isGroup": false
    },
    {
        "id": "s28",
        "title": "Domain 2 AI Strategy and Business Value Creation(配点 28%)",
        "isGroup": true
    },
    {
        "id": "s29",
        "title": "Step 4 AI 戦略を事業目標に合わせる(Task 2.1)",
        "isGroup": false
    },
    {
        "id": "s35",
        "title": "Step 5 AI のビジネス価値を測定・実証する(Task 2.2)",
        "isGroup": false
    },
    {
        "id": "s42",
        "title": "Step 6 競争優位のための AI ポジショニング(Task 2.3)",
        "isGroup": false
    },
    {
        "id": "s47",
        "title": "Domain 3 AI Governance and Responsible AI Leadership(配点 24%)",
        "isGroup": true
    },
    {
        "id": "s48",
        "title": "Step 7 責任ある AI を意思決定に組み込む(Task 3.1)",
        "isGroup": false
    },
    {
        "id": "s53",
        "title": "Step 8 AI ガバナンス体制と規制対応(Task 3.2)",
        "isGroup": false
    },
    {
        "id": "s58",
        "title": "Step 9 企業の AI リスクと緩和策(Task 3.3)",
        "isGroup": false
    },
    {
        "id": "s63",
        "title": "Domain 4 Business Readiness, Leadership, and AI Transformation(配点 24%)",
        "isGroup": true
    },
    {
        "id": "s64",
        "title": "Step 10 AI 活用の準備度と成熟度の評価(Task 4.1)",
        "isGroup": false
    },
    {
        "id": "s69",
        "title": "Step 11 データとインフラの土台づくり(Task 4.2)",
        "isGroup": false
    },
    {
        "id": "s73",
        "title": "Step 12 組織変革と AI 人材の育成(Task 4.3)",
        "isGroup": false
    },
    {
        "id": "s80",
        "title": "Step 13 パイロットから全社展開へスケールする(Task 4.4)",
        "isGroup": false
    },
    {
        "id": "s87",
        "title": "横断編と仕上げ",
        "isGroup": true
    },
    {
        "id": "s88",
        "title": "Step 14 試験範囲の AWS サービス・フレームワーク(戦略レベル)",
        "isGroup": false
    },
    {
        "id": "s92",
        "title": "Step 15 試験対策と練習問題",
        "isGroup": false
    },
    {
        "id": "s96",
        "title": "付録 A スキルチェックリスト(試験ガイドの全スキル)",
        "isGroup": false
    },
    {
        "id": "s101",
        "title": "付録 B 用語集",
        "isGroup": false
    },
    {
        "id": "s102",
        "title": "付録 C 参考文献(根拠ソース一覧)",
        "isGroup": false
    }
];

export type DiagramId = "dgm-0" | "dgm-1" | "dgm-2" | "dgm-3" | "dgm-4" | "dgm-5" | "dgm-6" | "dgm-7" | "dgm-8" | "dgm-9" | "dgm-10" | "dgm-11" | "dgm-12" | "dgm-13" | "dgm-14" | "dgm-15";

export const DIAGRAM_LABELS: Record<DiagramId, string> = {
    "dgm-0": "図 1 学習ロードマップの全体像を示す図",
    "dgm-1": "図 2 AI・ML・深層学習・生成AIの違いと包含関係を示す図",
    "dgm-2": "図 3 ルールベース自動化とAIの判断フロー比較図",
    "dgm-3": "図 4 モデルドリフトの検出と継続的な監視・更新サイクルを示す図",
    "dgm-4": "図 5 モデル適応技法: RAGとファインチューニングの比較図",
    "dgm-5": "図 6 RAGとファインチューニングの選択フロー図",
    "dgm-6": "図 7 高インパクトなユースケース特定と成果対応づけフロー図",
    "dgm-7": "図 8 Build・Buy・Partner の意思決定フロー図",
    "dgm-8": "図 9 ポートフォリオ優先順位づけとスケール判断フロー図",
    "dgm-9": "図 10 ビジネス価値の測定と実証の全体フロー図",
    "dgm-10": "図 11 ガバナンス・バイ・デザインのライフサイクル統合図",
    "dgm-11": "図 12 セーフガードの3本柱と人の監督を示す図",
    "dgm-12": "図 13 リスク分類フレームワークと優先順位づけを示す図",
    "dgm-13": "図 14 AI準備度・成熟度の評価と投資の優先順位を示す図",
    "dgm-14": "図 15 パイロットから全社展開への反復型変革フェーズ図",
    "dgm-15": "図 16 実験から本番グレードへの移行と事業継続性確保を示す図"
};

export const DIAGRAMS: Record<DiagramId, string> = {
    "dgm-0": "flowchart TD\n    A[\"Step 0 試験の全体像を知る\"] --> B[\"Domain 1 AI の基礎を固める\"]\n    B --> C[\"Domain 2 戦略と価値創出を学ぶ\"]\n    C --> D[\"Domain 3 ガバナンスと責任ある AI を学ぶ\"]\n    D --> E[\"Domain 4 準備度と変革とスケールを学ぶ\"]\n    E --> F[\"Step 14 AWS サービスを戦略レベルで整理\"]\n    F --> G[\"Step 15 練習問題で弱点を洗い出す\"]\n    G --> H[\"弱いドメインを復習して受験\"]\n    classDef hub fill:#e3e6ff,stroke:#4a55b8,color:#1c2260;\n    classDef done fill:#dcf1e0,stroke:#2f7a45,color:#123d20;\n    class A hub\n    class H done",
    "dgm-1": "flowchart TD\n    A[\"AI 人が行う知的な作業を機械で実現する広い分野\"] --> B[\"機械学習 ML データからパターンを学ぶ手法\"]\n    B --> C[\"深層学習 多層のニューラルネットワークを使う手法\"]\n    C --> D[\"生成 AI GenAI 文章や画像などを新しく生成する\"]\n    classDef hub fill:#e3e6ff,stroke:#4a55b8,color:#1c2260;\n    classDef done fill:#dcf1e0,stroke:#2f7a45,color:#123d20;\n    class A hub\n    class D done",
    "dgm-2": "flowchart TD\n    A[\"業務課題がある\"] --> B{\"判断ルールを明確に書けるか\"}\n    B -->|\"書ける\"| C[\"ルールベース自動化を優先\"]\n    B -->|\"書けない or 例外が多い\"| D{\"学習に使えるデータがあるか\"}\n    D -->|\"ある\"| E[\"AI ソリューションを検討\"]\n    D -->|\"ない\"| F[\"データ整備または別の解決策を検討\"]\n    C --> G[\"必要なら一部だけ AI で補強\"]\n    classDef hub fill:#e3e6ff,stroke:#4a55b8,color:#1c2260;\n    classDef box fill:#fbeecb,stroke:#9a7419,color:#4a3606;\n    classDef done fill:#dcf1e0,stroke:#2f7a45,color:#123d20;\n    class A hub\n    class B box\n    class D box\n    class E done\n    class C done",
    "dgm-3": "flowchart LR\n    A[\"本番で運用\"] --> B[\"性能と品質を監視\"]\n    B --> C{\"基準を下回ったか\"}\n    C -->|\"はい\"| D[\"原因を調査して更新や再学習\"]\n    C -->|\"いいえ\"| A\n    D --> E[\"再評価して承認\"]\n    E --> A\n    classDef hub fill:#e3e6ff,stroke:#4a55b8,color:#1c2260;\n    classDef box fill:#fbeecb,stroke:#9a7419,color:#4a3606;\n    classDef done fill:#dcf1e0,stroke:#2f7a45,color:#123d20;\n    class A hub\n    class C box\n    class E done",
    "dgm-4": "flowchart LR\n    A[\"社内文書などのデータ\"] --> B[\"文書を小さな断片に分割\"]\n    B --> C[\"埋め込みベクトルに変換\"]\n    C --> D[\"ベクトルインデックスに保存\"]\n    E[\"ユーザーの質問\"] --> F[\"関連する断片を検索\"]\n    D --> F\n    F --> G[\"質問と検索結果を合わせてモデルへ\"]\n    G --> H[\"根拠に基づく回答を生成\"]\n    classDef hub fill:#e3e6ff,stroke:#4a55b8,color:#1c2260;\n    classDef done fill:#dcf1e0,stroke:#2f7a45,color:#123d20;\n    class A hub\n    class E hub\n    class H done",
    "dgm-5": "flowchart TD\n    A[\"精度が不足している\"] --> B[\"プロンプトを改善する\"]\n    B --> C{\"知識の不足か\"}\n    C -->|\"最新情報や社内知識が足りない\"| D[\"RAG を導入する\"]\n    C -->|\"文体や専門的な振る舞いが合わない\"| E[\"ファインチューニングを検討する\"]\n    D --> F[\"評価して効果を確認\"]\n    E --> F\n    classDef hub fill:#e3e6ff,stroke:#4a55b8,color:#1c2260;\n    classDef box fill:#fbeecb,stroke:#9a7419,color:#4a3606;\n    classDef done fill:#dcf1e0,stroke:#2f7a45,color:#123d20;\n    class A hub\n    class C box\n    class F done",
    "dgm-6": "flowchart TD\n    A[\"事業課題と目標を定義\"] --> B[\"必要な AI の能力に翻訳\"]\n    B --> C[\"ユースケース候補を洗い出す\"]\n    C --> D[\"価値と実現可能性で評価\"]\n    D --> E[\"優先案件を選び小さく検証\"]\n    classDef hub fill:#e3e6ff,stroke:#4a55b8,color:#1c2260;\n    classDef done fill:#dcf1e0,stroke:#2f7a45,color:#123d20;\n    class A hub\n    class E done",
    "dgm-7": "flowchart TD\n    A[\"AI 導入の要件を整理\"] --> B{\"競争優位の核になる領域か\"}\n    B -->|\"はい\"| C{\"社内に開発と運用の能力があるか\"}\n    B -->|\"いいえ\"| D[\"既製品の購入を優先\"]\n    C -->|\"ある\"| E[\"Build 自社構築を検討\"]\n    C -->|\"ない\"| F[\"Partner と組んで構築\"]\n    D --> G[\"規制と予算とベンダー提案を確認\"]\n    E --> G\n    F --> G\n    classDef hub fill:#e3e6ff,stroke:#4a55b8,color:#1c2260;\n    classDef box fill:#fbeecb,stroke:#9a7419,color:#4a3606;\n    classDef done fill:#dcf1e0,stroke:#2f7a45,color:#123d20;\n    class A hub\n    class B box\n    class C box\n    class G done",
    "dgm-8": "flowchart TD\n    A[\"イニシアチブを 4 つの軸で評価\"] --> B{\"価値と実現可能性は基準を満たすか\"}\n    B -->|\"満たし拡大余地あり\"| C[\"スケールして投資を拡大\"]\n    B -->|\"条件付きで有望\"| D[\"一時停止し課題を解消してから再評価\"]\n    B -->|\"満たさず見込みも薄い\"| E[\"終了して資源を他へ振り向ける\"]\n    classDef hub fill:#e3e6ff,stroke:#4a55b8,color:#1c2260;\n    classDef box fill:#fbeecb,stroke:#9a7419,color:#4a3606;\n    classDef done fill:#dcf1e0,stroke:#2f7a45,color:#123d20;\n    class A hub\n    class B box\n    class C done",
    "dgm-9": "flowchart LR\n    A[\"目的を定義\"] --> B[\"KPI を設定\"]\n    B --> C[\"導入前の基準値を測定\"]\n    C --> D[\"パイロットで導入\"]\n    D --> E[\"効果と費用を測定\"]\n    E --> F[\"ROI を算出して報告\"]\n    F --> G[\"拡大か見直しかを判断\"]\n    classDef hub fill:#e3e6ff,stroke:#4a55b8,color:#1c2260;\n    classDef box fill:#fbeecb,stroke:#9a7419,color:#4a3606;\n    classDef done fill:#dcf1e0,stroke:#2f7a45,color:#123d20;\n    class A hub\n    class C box\n    class G done",
    "dgm-10": "flowchart LR\n    A[\"企画 ユースケースを狭く定義\"] --> B[\"設計 リスクと次元を評価\"]\n    B --> C[\"開発 評価と検証\"]\n    C --> D[\"導入前 レビューと承認\"]\n    D --> E[\"運用 監視と改善\"]\n    E --> B\n    classDef hub fill:#e3e6ff,stroke:#4a55b8,color:#1c2260;\n    classDef done fill:#dcf1e0,stroke:#2f7a45,color:#123d20;\n    class A hub\n    class D done",
    "dgm-11": "flowchart TD\n    A[\"AI が回答や判断案を生成\"] --> B[\"ガードレールで入力と出力を検査\"]\n    B --> C{\"基準に該当するか\"}\n    C -->|\"該当しない\"| D[\"利用者へ提供\"]\n    C -->|\"影響が大きい or 確信度が低い or 違反を検出\"| E[\"人の担当者へエスカレーション\"]\n    E --> F[\"担当者が判断して記録\"]\n    classDef hub fill:#e3e6ff,stroke:#4a55b8,color:#1c2260;\n    classDef box fill:#fbeecb,stroke:#9a7419,color:#4a3606;\n    classDef done fill:#dcf1e0,stroke:#2f7a45,color:#123d20;\n    class A hub\n    class C box\n    class D done\n    class F done",
    "dgm-12": "flowchart TD\n    A[\"AI ユースケースを登録\"] --> B[\"影響度とデータ機密度を評価\"]\n    B --> C{\"リスク階層を判定\"}\n    C -->|\"高\"| D[\"委員会審査と人の関与を必須にする\"]\n    C -->|\"中\"| E[\"標準レビューと監視を適用\"]\n    C -->|\"低\"| F[\"簡易登録で開始\"]\n    D --> G[\"ライフサイクル全体で再評価\"]\n    E --> G\n    F --> G\n    classDef hub fill:#e3e6ff,stroke:#4a55b8,color:#1c2260;\n    classDef box fill:#fbeecb,stroke:#9a7419,color:#4a3606;\n    classDef done fill:#dcf1e0,stroke:#2f7a45,color:#123d20;\n    class A hub\n    class C box\n    class G done",
    "dgm-13": "flowchart TD\n    A[\"戦略目標を確認\"] --> B[\"現在の成熟度を評価\"]\n    B --> C[\"目標との差を特定\"]\n    C --> D[\"投資の優先順位を決める\"]\n    D --> E[\"段階的な成長ロードマップを作成\"]\n    E --> F[\"進捗を測定して見直す\"]\n    F --> B\n    classDef hub fill:#e3e6ff,stroke:#4a55b8,color:#1c2260;\n    classDef done fill:#dcf1e0,stroke:#2f7a45,color:#123d20;\n    class A hub\n    class E done",
    "dgm-14": "flowchart LR\n    A[\"構想 Envision\"] --> B[\"実験 Experiment\"]\n    B --> C[\"ローンチ Launch\"]\n    C --> D[\"スケール Scale\"]\n    D --> B\n    classDef hub fill:#e3e6ff,stroke:#4a55b8,color:#1c2260;\n    classDef done fill:#dcf1e0,stroke:#2f7a45,color:#123d20;\n    class A hub\n    class D done",
    "dgm-15": "flowchart TD\n    A[\"パイロットで価値を確認\"] --> B{\"本番の基準を満たすか\"}\n    B -->|\"満たす\"| C[\"本番化してガバナンスと運用を整備\"]\n    B -->|\"満たさない\"| D[\"改善または見直し\"]\n    C --> E[\"隣接する部門と業務へ段階的に展開\"]\n    E --> F[\"フィードバックとコストと性能を継続確認\"]\n    F --> E\n    D --> A\n    classDef hub fill:#e3e6ff,stroke:#4a55b8,color:#1c2260;\n    classDef box fill:#fbeecb,stroke:#9a7419,color:#4a3606;\n    classDef done fill:#dcf1e0,stroke:#2f7a45,color:#123d20;\n    class A hub\n    class B box\n    class C done\n    class F done"
};
