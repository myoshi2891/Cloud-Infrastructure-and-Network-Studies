type Correction = readonly [from: string, to: string];

/** SAP Domain 3: 本文訂正。固定Git由来fixtureは保持する。 */
export const SAP_DOMAIN3_CORRECTIONS: readonly Correction[] = [
    // https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/activate-built-in-tags.html
    [
        'タグを有効化する前の期間のデータには、タグは遡って反映されません。早めに有効化し、運用ルールを定めます。',
        'タグは有効化前の期間のデータへ自動では遡って反映されません。ただし、ce:StartCostAllocationTagBackfill権限を持つ管理アカウントのユーザーは、過去12か月以内の月初を開始日としてバックフィルを申請できます。バックフィルは要求期間中にリソースへタグが付与されていた場合にだけ反映されるため、早めにタグ付けと有効化を行い、運用ルールを定めます。',
    ],
    // 作成時の依頼文に由来する表記を、読者向けの名称へ置き換える
    ['Content Domain 3 (本依頼で指定されたページ)', 'Content Domain 3 (ドメイン3の公式解説ページ)'],
];

/** SAP Domain 3: 図の訂正。from は原本の図全体と完全一致させる（生成スクリプトも図ごとに適用する）。 */
export const SAP_DOMAIN3_DIAGRAM_CORRECTIONS: readonly Correction[] = [
    // https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-policy-generation.html 生成ポリシーは iam:PassRole やデータイベント等を含まない場合があるため、適用前にレビューして補う。広い権限からは始めない
    [
        "flowchart TD\nA[\"広い権限から始める または 現状を把握\"] --> B[\"CloudTrail でどの操作が使われたか記録\"]\nB --> C[\"Access Analyzer でポリシーを生成\"]\nC --> D[\"未使用の権限を削除\"]\nD --> E[\"SCP や境界で上限を設定\"]\nE --> F[\"定期的に再監査\"]\nF --> B",
        "flowchart TD\nA[\"現状の権限を評価\"] --> B[\"CloudTrail でどの操作が使われたか記録\"]\nB --> C[\"Access Analyzer でポリシーを生成\"]\nC --> R[\"生成ポリシーをレビューし不足を補う<br/>iam:PassRole や S3 データイベントの操作など<br/>生成ポリシーに含まれない必要な権限を追加\"]\nR --> D[\"未使用の権限を削除\"]\nD --> E[\"SCP や境界で上限を設定\"]\nE --> F[\"定期的に再監査\"]\nF --> B",
    ],
];
