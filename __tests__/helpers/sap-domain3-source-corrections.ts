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
