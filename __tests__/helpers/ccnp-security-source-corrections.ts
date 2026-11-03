import { withSourceCorrections } from './aip-source-corrections';

type Correction = readonly [from: string, to: string, after?: string];

const AUTO_NAT_CELL = '自動 NAT（Object NAT）';
const AUTO_NAT_ORDER = 'スタティックルールをダイナミックルールより先に適用し、各グループ内の順序は記述順ではなくアドレスの具体性（より狭い範囲を優先）などの基準で決ま';
const ORIGINAL_NOTE = '同じセクション内では上から順に評価されます。';
const CORRECTED_NOTE = '手動 NAT のセクション 1・3 では、同じセクション内で上から順に評価されます。'
    + `セクション 2 の自動 NAT は、${AUTO_NAT_ORDER}ります。`;

/**
 * CCNP Security: Cisco 公式ドキュメントにもとづく原本からの訂正。原本fixtureは固定の証跡として改変せず、表示内容の期待値にだけ適用する。
 * - 自動 NAT（セクション 2）は記述順ではなく、スタティックをダイナミックより先に、各グループ内はアドレスの具体性などで順序付けされる
 *   Secure Firewall Threat Defense コンフィグレーションガイド「NAT Rule Order」
 *   https://www.cisco.com/c/en/us/support/security/defense-center/products-installation-and-configuration-guides-list.html
 */
export const CCNP_SECURITY_CORRECTIONS: readonly Correction[] = [
    [AUTO_NAT_CELL, `${AUTO_NAT_CELL}。${AUTO_NAT_ORDER}る`, 'セクション 2'],
    [ORIGINAL_NOTE, CORRECTED_NOTE],
];

/** 空白を保持した inventory へ訂正を適用する。 */
export const withCcnpSecurityCorrections = <T,>(value: T): T => withSourceCorrections(value, CCNP_SECURITY_CORRECTIONS);
