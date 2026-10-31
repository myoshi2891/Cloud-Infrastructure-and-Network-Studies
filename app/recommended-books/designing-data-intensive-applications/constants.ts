export const DIAGRAMS: Record<string, string> = {
    "diagram-0": "flowchart TB\n    Start([\"DDIA 第2版<br/>全14章 + 序文\"])\n    Start --> P1\n    subgraph P1[\"Part I: データシステムの基礎\"]\n        C1[\"第1章<br/>データシステムのトレードオフ\"]\n        C2[\"第2章<br/>非機能要件の定義\"]\n    end\n    subgraph P2[\"Part II: データの保存と検索\"]\n        C3[\"第3章<br/>データモデルとクエリ言語\"]\n        C4[\"第4章<br/>ストレージとインデックス\"]\n        C5[\"第5章<br/>エンコーディングと進化\"]\n    end\n    subgraph P3[\"Part III: 分散データ\"]\n        C6[\"第6章<br/>レプリケーション\"]\n        C7[\"第7章<br/>シャーディング\"]\n        C8[\"第8章<br/>トランザクション\"]\n        C9[\"第9章<br/>分散システムの落とし穴\"]\n        C10[\"第10章<br/>一貫性と合意\"]\n    end\n    subgraph P4[\"Part IV: 派生データ\"]\n        C11[\"第11章<br/>バッチ処理\"]\n        C12[\"第12章<br/>ストリーム処理\"]\n        C13[\"第13章<br/>ストリーミングシステムの哲学\"]\n    end\n    subgraph P5[\"Part V: 倫理と社会\"]\n        C14[\"第14章<br/>正しいことをする\"]\n    end\n    P1 --> P2 --> P3 --> P4 --> P5",
    "diagram-1": "flowchart LR\n    A[\"Step1<br/>基礎知識<br/>信頼性/拡張性/保守性\"] --> B[\"Step2<br/>データモデル選定<br/>Relational/Document/Graph\"]\n    B --> C[\"Step3<br/>ストレージ内部構造<br/>B-Tree / LSM-Tree\"]\n    C --> D[\"Step4<br/>分散システム基礎<br/>レプリケーション/シャーディング\"]\n    D --> E[\"Step5<br/>整合性と合意<br/>トランザクション/Consensus\"]\n    E --> F[\"Step6<br/>派生データ<br/>バッチ/ストリーム処理\"]\n    F --> G[\"Step7<br/>実践設計<br/>トレードオフ分析と<br/>アーキテクチャ選定\"]",
    "diagram-2": "flowchart TB\n    Center[\"データ集約型<br/>アプリケーション設計\"]\n    Center --> R[\"信頼性<br/>Reliability\"]\n    Center --> S[\"スケーラビリティ<br/>Scalability\"]\n    Center --> M[\"保守性<br/>Maintainability\"]\n\n    R --> R1[\"ハードウェア障害への耐性\"]\n    R --> R2[\"ソフトウェアバグへの耐性\"]\n    R --> R3[\"人為的ミスへの耐性\"]\n\n    S --> S1[\"負荷パラメータの定義\"]\n    S --> S2[\"レイテンシ・パーセンタイル計測\"]\n    S --> S3[\"スケールアウト/アップ戦略\"]\n\n    M --> M1[\"運用性 Operability\"]\n    M --> M2[\"単純性 Simplicity\"]\n    M --> M3[\"進化性 Evolvability\"]",
    "diagram-3": "flowchart TD\n    Q1{\"データ間の関係は<br/>多対多が多いか?\"}\n    Q1 -->|\"はい\"| Q2{\"探索的な関係性<br/>クエリが中心か?\"}\n    Q1 -->|\"いいえ\"| Q3{\"1つのドキュメント単位で<br/>完結する構造か?\"}\n    Q2 -->|\"はい\"| Graph[\"グラフ型モデル<br/>Property Graph / Cypher\"]\n    Q2 -->|\"いいえ\"| Relational[\"リレーショナルモデル<br/>正規化 + JOIN\"]\n    Q3 -->|\"はい\"| Document[\"ドキュメントモデル<br/>スキーマレスなJSON風構造\"]\n    Q3 -->|\"いいえ\"| Relational2[\"リレーショナルモデル<br/>結合が前提\"]",
    "diagram-4": "flowchart LR\n    subgraph BTree[\"B-Tree方式\"]\n        direction TB\n        BT1[\"固定サイズページ<br/>（通常4KB単位）\"]\n        BT2[\"ページをインプレースで<br/>直接上書き\"]\n        BT3[\"WAL（Write-Ahead Log）で<br/>クラッシュ耐性を確保\"]\n        BT1 --> BT2 --> BT3\n    end\n    subgraph LSM[\"LSM-Tree方式\"]\n        direction TB\n        LS1[\"メモリ内Memtableに<br/>まず書き込み\"]\n        LS2[\"ソート済みSSTableとして<br/>ディスクへフラッシュ\"]\n        LS3[\"バックグラウンドで<br/>Compaction（統合）\"]\n        LS1 --> LS2 --> LS3\n    end",
    "diagram-5": "flowchart LR\n    App[\"アプリケーション<br/>プロセス内オブジェクト\"] --> Enc[\"エンコード<br/>JSON / Protocol Buffers / Avro\"]\n    Enc --> DB[(\"データベース経由の<br/>データフロー\")]\n    Enc --> Service[\"サービス間通信<br/>REST / RPC\"]\n    Enc --> Event[\"イベント駆動<br/>メッセージブローカー経由\"]\n    DB --> Dec1[\"将来のプロセスが<br/>非同期にデコード\"]\n    Service --> Dec2[\"別プロセスが<br/>即時デコード\"]\n    Event --> Dec3[\"複数の購読者が<br/>非同期にデコード\"]",
    "diagram-6": "flowchart TB\n    subgraph SingleLeader[\"① シングルリーダー方式\"]\n        direction LR\n        SL_Client[\"クライアント\"] --> SL_Leader[(\"リーダー\")]\n        SL_Leader --> SL_F1[(\"フォロワー1\")]\n        SL_Leader --> SL_F2[(\"フォロワー2\")]\n    end\n    subgraph MultiLeader[\"② マルチリーダー方式\"]\n        direction LR\n        ML_C1[\"クライアントA\"] --> ML_L1[(\"リーダー1<br/>拠点A\")]\n        ML_C2[\"クライアントB\"] --> ML_L2[(\"リーダー2<br/>拠点B\")]\n        ML_L1 <--> ML_L2\n    end\n    subgraph Leaderless[\"③ リーダーレス方式\"]\n        direction LR\n        LL_Client[\"クライアント\"] --> LL_N1[(\"ノード1\")]\n        LL_Client --> LL_N2[(\"ノード2\")]\n        LL_Client --> LL_N3[(\"ノード3\")]\n    end",
    "diagram-7": "flowchart TD\n    Data[\"全データセット\"] --> Range[\"キー範囲による<br/>シャーディング\"]\n    Data --> Hash[\"キーのハッシュによる<br/>シャーディング\"]\n    Range --> R1[\"ソート順を維持でき<br/>範囲スキャンが高速\"]\n    Range --> R2[\"特定範囲に書き込みが<br/>集中するホットスポットのリスク\"]\n    Hash --> H1[\"ノード間の負荷分散が均一\"]\n    Hash --> H2[\"範囲スキャンが非効率になりやすい\"]",
    "diagram-8": "flowchart TB\n    L1[\"Read Uncommitted<br/>（最も緩い分離レベル）\"] --> L2[\"Read Committed\"]\n    L2 --> L3[\"Repeatable Read（標準SQLの名称）<br/>／ Snapshot Isolation\"]\n    L3 --> L4[\"Serializable<br/>（最も厳格な分離レベル）\"]\n\n    classDef dangerFill fill:#5c1a1a,stroke:#d94a4a,color:#ffffff;\n    classDef warnFill fill:#5c3a1a,stroke:#d9904a,color:#ffffff;\n    classDef successFill fill:#1a4a2a,stroke:#4ad97a,color:#ffffff;\n    class L1 dangerFill\n    class L2,L3 warnFill\n    class L4 successFill",
    "diagram-9": "flowchart TB\n    Fault[\"分散システムにおける<br/>部分障害\"] --> Net[\"ネットワーク障害\"]\n    Fault --> Clock[\"クロックのずれ\"]\n    Fault --> Pause[\"プロセスの一時停止\"]\n\n    Net --> Net1[\"パケットロスト・遅延\"]\n    Net --> Net2[\"タイムアウト境界の<br/>判断が困難\"]\n\n    Clock --> Clock1[\"NTP同期のずれ\"]\n    Clock --> Clock2[\"単調時計 vs 時刻時計の混同\"]\n\n    Pause --> Pause1[\"GCによる<br/>ストップザワールド\"]\n    Pause --> Pause2[\"仮想化基盤側の一時停止\"]\n\n    classDef dangerFill fill:#5c1a1a,stroke:#d94a4a,color:#ffffff;\n    class Net,Clock,Pause dangerFill",
    "diagram-10": "flowchart TD\n    Start[\"提案値をリーダーへ送信\"] --> Vote{\"過半数のノードから<br/>承認を得たか?\"}\n    Vote -->|\"はい\"| Commit[\"値を確定（Commit）\"]\n    Vote -->|\"いいえ\"| Retry[\"リーダーを再選出し<br/>再試行\"]\n    Retry --> Start\n    Commit --> Notify[\"全ノードへ<br/>確定を通知\"]\n\n    classDef successFill fill:#1a4a2a,stroke:#4ad97a,color:#ffffff;\n    class Commit successFill",
    "diagram-11": "flowchart LR\n    Src[\"入力データ<br/>分散ファイルシステム／<br/>オブジェクトストア\"] --> Map[\"Map（変換）フェーズ\"]\n    Map --> Shuffle[\"Shuffle<br/>（データの並べ替え・再配置）\"]\n    Shuffle --> Reduce[\"Reduce（集約）フェーズ\"]\n    Reduce --> Out[\"出力：<br/>派生データセット\"]",
    "diagram-12": "flowchart LR\n    DBSrc[(\"データベース\")] -->|\"CDC（変更データキャプチャ）\"| Broker[\"ログ型メッセージ<br/>ブローカー\"]\n    App[\"アプリケーション<br/>（イベント発行）\"] --> Broker\n    Broker --> Proc[\"ストリーム処理<br/>エンジン\"]\n    Proc --> Derived1[(\"全文検索インデックス\")]\n    Proc --> Derived2[(\"キャッシュ\")]\n    Proc --> Derived3[(\"分析用DWH\")]",
    "diagram-13": "flowchart TB\n    Source[\"システムオブレコード<br/>（正データ）\"] --> Stream[\"変更イベントストリーム\"]\n    Stream --> Search[\"全文検索インデックス\"]\n    Stream --> Cache[\"読み取り最適化キャッシュ\"]\n    Stream --> Analytics[\"分析用データウェアハウス\"]\n    Stream --> ML[\"機械学習向け<br/>特徴量ストア\"]"
};
export const NAV_ITEMS = [
    {
        "id": "1-ddiaとは何か",
        "label": "1. DDIAとは何か"
    },
    {
        "id": "2-第1版と第2版何が変わったか",
        "label": "2. 第1版と第2版：何が変わったか"
    },
    {
        "id": "3-学習の進め方ステップバイステップロードマップ",
        "label": "3. 学習の進め方（ステップバイステップ・ロードマップ）"
    },
    {
        "id": "4-part-iデータシステムの基礎",
        "label": "4. Part I：データシステムの基礎"
    },
    {
        "id": "5-part-iiデータの保存と検索",
        "label": "5. Part II：データの保存と検索"
    },
    {
        "id": "6-part-iii分散データ",
        "label": "6. Part III：分散データ"
    },
    {
        "id": "7-part-iv派生データ",
        "label": "7. Part IV：派生データ"
    },
    {
        "id": "8-part-v倫理と社会第2版新設",
        "label": "8. Part V：倫理と社会（第2版新設）"
    },
    {
        "id": "9-2026年の実務トレンドとddiaの位置づけ",
        "label": "9. 2026年の実務トレンドとDDIAの位置づけ"
    },
    {
        "id": "10-ベストプラクティス実践チェックリスト",
        "label": "10. ベストプラクティス実践チェックリスト"
    },
    {
        "id": "11-学習後のネクストステップ",
        "label": "11. 学習後のネクストステップ"
    },
    {
        "id": "12-参考文献",
        "label": "12. 参考文献"
    }
] as const;
