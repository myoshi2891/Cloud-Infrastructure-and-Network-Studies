type Correction = readonly [from: string, to: string];

/** SAP Domain 2: 本文訂正。固定Git由来fixtureは保持する。 */
export const SAP_DOMAIN2_CORRECTIONS: readonly Correction[] = [
    // https://aws.amazon.com/blogs/devops/aws-codecommit-returns-to-general-availability/
    ['AWS は 2025 年 11 月 25 日に新規サインアップを再開', 'AWS は 2025 年 11 月 24 日に新規サインアップを再開'],
];

/** SAP Domain 2: 図の訂正。from は原本の図全体と完全一致させる（生成スクリプトも図ごとに適用する）。 */
export const SAP_DOMAIN2_DIAGRAM_CORRECTIONS: readonly Correction[] = [
    // RTO と RPO を別々に判定し、厳しい方の目標を満たす戦略を選ぶ（例: RTO ほぼゼロ・RPO 10分ならマルチサイト）
    [
        "flowchart LR\nS[\"要件確認<br/>RTO と RPO の両方\"] --> Q1{\"RTO・RPO とも<br/>数時間以上でよい?\"}\nQ1 -->|\"はい\"| BR[\"バックアップと<br/>リストア\"]\nQ1 -->|\"いいえ\"| Q2{\"RTO・RPO とも<br/>数十分程度でよい?\"}\nQ2 -->|\"はい\"| PL[\"パイロットライト\"]\nQ2 -->|\"いいえ\"| Q3{\"RTO・RPO とも<br/>ほぼゼロが必須?\"}\nQ3 -->|\"いいえ 分単位\"| WS[\"ウォームスタンバイ\"]\nQ3 -->|\"はい\"| AA[\"マルチサイト<br/>Active/Active\"]\n\nclassDef highlightFill fill:#dbe6ff,stroke:#3556d6,color:#13204a;\nclassDef successFill fill:#d7f1e2,stroke:#1d7f4e,color:#0f3d26;\nclassDef warnFill fill:#ffe8c7,stroke:#a85f0a,color:#4a2a00;\nclassDef dangerFill fill:#ffdfe5,stroke:#c0213f,color:#5c1020;\nclass BR highlightFill\nclass PL successFill\nclass WS warnFill\nclass AA dangerFill",
        "flowchart LR\nS[\"要件確認<br/>RTO と RPO を個別に評価\"] --> Q1{\"RTO または RPO の<br/>どちらかがほぼゼロ?\"}\nQ1 -->|\"はい\"| AA[\"マルチサイト<br/>Active/Active\"]\nQ1 -->|\"いいえ\"| Q2{\"RTO または RPO の<br/>どちらかが分単位?\"}\nQ2 -->|\"はい\"| WS[\"ウォームスタンバイ\"]\nQ2 -->|\"いいえ\"| Q3{\"RTO または RPO の<br/>どちらかが数十分程度?\"}\nQ3 -->|\"はい\"| PL[\"パイロットライト\"]\nQ3 -->|\"いいえ 両方とも数時間以上でよい\"| BR[\"バックアップと<br/>リストア\"]\n\nclassDef highlightFill fill:#dbe6ff,stroke:#3556d6,color:#13204a;\nclassDef successFill fill:#d7f1e2,stroke:#1d7f4e,color:#0f3d26;\nclassDef warnFill fill:#ffe8c7,stroke:#a85f0a,color:#4a2a00;\nclassDef dangerFill fill:#ffdfe5,stroke:#c0213f,color:#5c1020;\nclass BR highlightFill\nclass PL successFill\nclass WS warnFill\nclass AA dangerFill",
    ],
    // https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/rds-proxy-endpoints.html 読み取り専用プロキシエンドポイントは Aurora DB クラスターのみ対応。書き込みと読み取りで接続先エンドポイントを分ける
    [
        "flowchart LR\nU[\"ユーザー\"] --> CF[\"CloudFront<br/>エッジキャッシュ\"]\nCF --> ALB[\"ALB\"]\nALB --> APP[\"アプリ\"]\nAPP --> CACHE[\"ElastiCache<br/>アプリ側キャッシュ\"]\nAPP --> RP[\"RDS Proxy<br/>接続プール\"]\nRP --> W[\"DB ライター\"]\nRP --> RR[\"DB リードレプリカ\"]\nAPP --> Q[\"SQS または Kinesis<br/>バッファ\"]\n\nclassDef highlightFill fill:#dbe6ff,stroke:#3556d6,color:#13204a;\nclassDef warnFill fill:#ffe8c7,stroke:#a85f0a,color:#4a2a00;\nclass CF highlightFill\nclass CACHE warnFill",
        "flowchart LR\nU[\"ユーザー\"] --> CF[\"CloudFront<br/>エッジキャッシュ\"]\nCF --> ALB[\"ALB\"]\nALB --> APP[\"アプリ\"]\nAPP --> CACHE[\"ElastiCache<br/>アプリ側キャッシュ\"]\nAPP -->|\"書き込み\"| RPW[\"RDS Proxy<br/>デフォルトエンドポイント<br/>読み書き\"]\nAPP -->|\"読み取り\"| RPR[\"RDS Proxy<br/>読み取り専用エンドポイント\"]\nsubgraph AUR[\"Aurora DB クラスター\"]\nW[\"ライターインスタンス\"]\nRR[\"Aurora レプリカ<br/>リーダー\"]\nend\nRPW --> W\nRPR --> RR\nAPP --> Q[\"SQS または Kinesis<br/>バッファ\"]\n\nclassDef highlightFill fill:#dbe6ff,stroke:#3556d6,color:#13204a;\nclassDef warnFill fill:#ffe8c7,stroke:#a85f0a,color:#4a2a00;\nclass CF highlightFill\nclass CACHE warnFill",
    ],
    // https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-transition-general-considerations.html ライフサイクルの日数はオブジェクト作成からの経過日数で数える（直前のストレージクラスへの移行からではない）
    [
        "flowchart LR\nA[\"S3 Standard<br/>作成直後\"] -->|\"30日後<br/>128 KiB 以上のみ\"| B[\"Standard-IA\"]\nB -->|\"90日後\"| C[\"Glacier Flexible Retrieval\"]\nC -->|\"365日後\"| D[\"Glacier Deep Archive\"]\nD -->|\"7年後\"| E[\"削除\"]\nA -->|\"128 KiB 未満は既定で移行せず<br/>Standard のまま7年後\"| E",
        "flowchart LR\nA[\"S3 Standard<br/>作成直後\"] -->|\"作成から30日後<br/>128 KiB 以上のみ\"| B[\"Standard-IA\"]\nB -->|\"作成から90日後\"| C[\"Glacier Flexible Retrieval\"]\nC -->|\"作成から365日後\"| D[\"Glacier Deep Archive\"]\nD -->|\"作成から7年後\"| E[\"削除\"]\nA -->|\"128 KiB 未満は既定で移行せず<br/>Standard のまま作成から7年後\"| E",
    ],
];
