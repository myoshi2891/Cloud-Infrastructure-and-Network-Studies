type Correction = readonly [from: string, to: string];

/** SAP Domain 2: 本文訂正。固定Git由来fixtureは保持する。 */
export const SAP_DOMAIN2_CORRECTIONS: readonly Correction[] = [
    // https://aws.amazon.com/blogs/devops/aws-codecommit-returns-to-general-availability/
    ['AWS は 2025 年 11 月 25 日に新規サインアップを再開', 'AWS は 2025 年 11 月 24 日に新規サインアップを再開'],
];
