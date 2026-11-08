/**
 * CCIE Service Provider ガイドの原本に対する本文訂正。
 * 原本インベントリは移行元の証跡として改変せず、生成スクリプトと表示の期待値の両方へ同じ訂正を適用する。
 */
/** @type {ReadonlyArray<readonly [from: string, to: string]>} */
export const CCIE_SP_SOURCE_CORRECTIONS = [
    // MDT の解説は 9.2.4 節にある（9.2.2 節はデータモデルと API）
    ['へ移行しています（9.2.2 節）。', 'へ移行しています（9.2.4 節）。'],
    // 定義した RPKI-IN が未適用だと invalid 経路を破棄できないため、隣接の入力ポリシーへ適用する
    ['   origin-as validation enable\n', '   origin-as validation enable\n   route-policy RPKI-IN in\n'],
    // eBGP 隣接へ適用する PEER-OUT が未定義だったため、自 AS の経路だけを広告する出力ポリシーを PEER-IN の後に定義する
    [
        '  set community (65000:100) additive\n  pass\nend-policy\n',
        '  set community (65000:100) additive\n  pass\nend-policy\n!\nprefix-set PFX-OWN\n  203.0.113.0/24\nend-set\n!\nroute-policy PEER-OUT\n  if destination in PFX-OWN then\n    pass\n  else\n    drop\n  endif\nend-policy\n',
    ],
    // 顧客 VRF が共有サービス用 RT を export すると他顧客の import に一致するため、顧客ごとの戻り経路用 RT を共有 VRF だけが import する。
    // 原本では改行をまたぐ1文のため、改行の前後を別々に訂正する
    [
        '共有 VRF の RT を全顧客 VRF に import。顧客側は共有 VRF の',
        '共有 VRF が export する共有サービス専用 RT を全顧客 VRF に import。各顧客 VRF は顧客ごとに異なる戻り経路用の',
    ],
    [
        'RT のみを export（顧客間の通信を防止）',
        'RT を export し、共有 VRF だけがそれらを import（顧客 VRF は共有サービス専用 RT を export しないため、顧客間の通信を防止）',
    ],
];
