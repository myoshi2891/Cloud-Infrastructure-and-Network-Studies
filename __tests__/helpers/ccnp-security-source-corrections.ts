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
 * - `aaa accounting commands 15` が記録するのは権限レベル 15 のコマンドだけで、全コマンドの監査にはレベルごとの設定が要る
 *   コード行数は fixture の数値と照合するため、設定行は足さず、例の範囲と追加方法を明記する
 *   Cisco IOS Security Command Reference「aaa accounting」
 * - 通信を止める側はフェイルクローズと呼び、Snort Fail Open（Snort 停止・高負荷時）とハードウェアバイパス（対応機種のハードウェア障害時）を区別する
 *   訂正は生成器がテキストノード単位で適用するため、強調要素の境界ごとに分ける
 *   Cisco Secure Firewall「Snort Fail Open vs. Hardware Bypass」
 *   https://docs.manage.security.cisco.com/cdfmc/c_failsafe_and_snort_fail_open_vs_hardware_bypass.html
 * - 旧 URL は Log Forwarding Destinations / SIEMs のトピックだったため、製品概要へ差し替える
 *   https://docs.manage.security.cisco.com/multicloud/g_about-multicloud-defense.html
 * - Security Cloud Control の旧称は「Cisco Defense Orchestrator（CDO）」であり、原本の「Defender」は誤記
 */
export const CCNP_SECURITY_CORRECTIONS: readonly Correction[] = [
    [AUTO_NAT_CELL, `${AUTO_NAT_CELL}。${AUTO_NAT_ORDER}る`, 'セクション 2'],
    [ORIGINAL_NOTE, CORRECTED_NOTE],
    ['! NAD（IOS XE）側の TACACS+ 設定例', '! NAD（IOS XE）側の TACACS+ 設定例（コマンドのアカウンティングは権限レベル 15 のみ）'],
    [
        'を有効にして監査可能にする。',
        'を有効にして監査可能にする。上の例が記録するのは権限レベル 15 のコマンドだけのため、機器で使う他のレベル（既定のレベル 0・1 やカスタムレベル）も aaa accounting commands <レベル> default start-stop group ISE-TACACS で追加する。',
    ],
    ['フェイルセーフ／フェイルオープン', 'フェイルオープンとフェイルクローズ'],
    ['（機器障害時に通信を通す／止める）の挙動と', '（障害時に通信を通す／止める）の違いと'],
    [
        'を理解して選ぶ。',
        'を理解して選ぶ。Snort Fail Open は Snort が停止または高負荷で処理できないときに通信を検査なしで通す設定で、無効にすると通信を破棄する。ハードウェアバイパスは別の機能で、対応機種のハードウェア障害時（電源断を含む）に通信を通す。',
    ],
    ['https://securitydocs.cisco.com/docs/mcd/user/57506.dita', 'https://docs.manage.security.cisco.com/multicloud/g_about-multicloud-defense.html'],
    ['Cisco Defender Orchestrator', 'Cisco Defense Orchestrator'],
];

/** 空白を保持した inventory へ訂正を適用する。 */
export const withCcnpSecurityCorrections = <T,>(value: T): T => withSourceCorrections(value, CCNP_SECURITY_CORRECTIONS);
