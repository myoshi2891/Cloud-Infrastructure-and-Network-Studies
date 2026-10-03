/** 原本の目次。監視対象もこの配列から導出する。 */
export const NAV_ITEMS = [
    {
        "id": "overview",
        "label": "概要",
        "icon": "ti ti-info-circle"
    },
    {
        "id": "architecture",
        "label": "全体アーキテクチャ",
        "icon": "ti ti-topology-star-3"
    },
    {
        "id": "concepts",
        "label": "主要概念の整理",
        "icon": "ti ti-book"
    },
    {
        "id": "task1",
        "label": "Task 1: 環境準備",
        "icon": "ti ti-number-1"
    },
    {
        "id": "task2",
        "label": "Task 2: 基本パイプライン",
        "icon": "ti ti-number-2"
    },
    {
        "id": "task3",
        "label": "Task 3: Binary Authorization",
        "icon": "ti ti-number-3"
    },
    {
        "id": "task4",
        "label": "Task 4: セキュアパイプライン",
        "icon": "ti ti-number-4"
    },
    {
        "id": "task5",
        "label": "Task 5: 修正と再デプロイ",
        "icon": "ti ti-number-5"
    },
    {
        "id": "sequence",
        "label": "全体シーケンス",
        "icon": "ti ti-arrows-exchange"
    },
    {
        "id": "best-practices",
        "label": "ベストプラクティス総まとめ",
        "icon": "ti ti-checklist"
    },
    {
        "id": "troubleshooting",
        "label": "よくあるつまずき",
        "icon": "ti ti-bug"
    },
    {
        "id": "references",
        "label": "参考文献",
        "icon": "ti ti-link"
    }
] as const;

export type DiagramId = "architecture" | "binauthz" | "verify" | "sequence";
/** 原本の静的Mermaid定義。 */
export const DIAGRAMS: Record<DiagramId, string> = {
    "architecture": "flowchart TB\n    Dev[\"開発者がソースコードをpush\"] --> Build[\"Cloud Build: docker build\"]\n    Build --> ScanRepo[\"artifact-scanning-repo へpush\"]\n    ScanRepo --> Scan[\"Container/Artifact Analysis: 脆弱性スキャン実行\"]\n    Scan --> Check{\"CRITICAL重大度の脆弱性は0件か\"}\n    Check -->|\"いいえ\"| Fail[\"ビルド失敗として停止\"]\n    Check -->|\"はい\"| Sign[\"binauthz-attestation: Attestation作成\"]\n    Sign --> ProdRepo[\"artifact-prod-repo へretagしてpush\"]\n    ProdRepo --> Deploy[\"gcloud run deploy を実行\"]\n    Deploy --> Enforce[\"Binary Authorization: Attestation検証\"]\n    Enforce -->|\"検証OK\"| Running[\"Cloud Run上でサービス稼働\"]\n    Enforce -->|\"検証NG\"| Blocked[\"デプロイを拒否\"]\n\n    classDef flow fill:#241b47,stroke:#beb3ff,color:#efeaff\n    classDef store fill:#0f2f2c,stroke:#9fe3d8,color:#e3fbf6\n    classDef security fill:#3a1530,stroke:#ffb3dd,color:#ffe3f3\n    classDef danger fill:#3a1f16,stroke:#ff9a7a,color:#ffe8dc\n    classDef success fill:#123a24,stroke:#7ee0a8,color:#e3fff0\n\n    class Dev,Build,Deploy flow\n    class ScanRepo,ProdRepo store\n    class Scan,Sign,Enforce security\n    class Fail,Blocked danger\n    class Running success",
    "binauthz": "flowchart LR\n    Note[\"Container Analysis Note: vulnerability_note\"] --> Attestor[\"Binary Authorization Attestor: vulnerability-attestor\"]\n    Key[\"Cloud KMS鍵: lab-key version 1\"] --> Attestor\n    Attestor --> Policy[\"Binary Authorization Policy: defaultRuleにAttestorを要求\"]\n    Policy --> CloudRun[\"Cloud Run deploy --binary-authorization=default\"]\n\n    classDef flow fill:#241b47,stroke:#beb3ff,color:#efeaff\n    classDef security fill:#3a1530,stroke:#ffb3dd,color:#ffe3f3\n\n    class Note,Key flow\n    class Attestor,Policy,CloudRun security",
    "verify": "flowchart LR\n    Fix[\"Dockerfile・requirementsを修正\"] --> Rebuild[\"Cloud Buildを再実行\"]\n    Rebuild --> Rescan[\"脆弱性スキャンを再実行\"]\n    Rescan --> Gate{\"CRITICAL脆弱性は0件か\"}\n    Gate -->|\"はい\"| SignDeploy[\"Attestation発行してCloud Runへデプロイ\"]\n    Gate -->|\"いいえ\"| FixAgain[\"パッケージ・ベースイメージを見直す\"]\n    SignDeploy --> Verify[\"Cloud Run URLへアクセスして動作確認\"]\n\n    classDef flow fill:#241b47,stroke:#beb3ff,color:#efeaff\n    classDef danger fill:#3a1f16,stroke:#ff9a7a,color:#ffe8dc\n    classDef success fill:#123a24,stroke:#7ee0a8,color:#e3fff0\n\n    class Fix,Rebuild,Rescan flow\n    class FixAgain danger\n    class SignDeploy,Verify success",
    "sequence": "sequenceDiagram\n    participant Dev as 開発者\n    participant CB as Cloud Build\n    participant ARS as Artifact Registry scanning\n    participant AA as Artifact Analysis\n    participant KMS as Cloud KMS\n    participant ARP as Artifact Registry prod\n    participant CR as Cloud Run\n    participant BA as Binary Authorization\n\n    Dev->>CB: cloudbuild.yamlを送信\n    CB->>CB: docker build\n    CB->>ARS: imageをpush\n    CB->>AA: 脆弱性スキャンを要求\n    AA-->>CB: スキャン結果を返却\n    CB->>CB: CRITICAL件数を判定\n    alt CRITICALあり\n        CB-->>Dev: ビルド失敗を通知\n    else CRITICALなし\n        CB->>KMS: 署名鍵でAttestationに署名\n        KMS-->>CB: 署名済みAttestation\n        CB->>ARP: imageをretagしてpush\n        CB->>CR: gcloud run deployを実行\n        CR->>BA: Attestationの検証を要求\n        BA-->>CR: 検証結果を返却\n        CR-->>Dev: デプロイ完了を通知\n    end"
};
