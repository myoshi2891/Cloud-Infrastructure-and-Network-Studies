/** SAP-C02 Domain 2 原本CSSの固定色と、app/globals.css の @theme に置くトークン名（--color-sap-d2-<名前>）の対応。
 * @type {Readonly<Record<string, string>>}
 */
export const SAP_D2_COLOR_TOKENS = {
    '#fbfcff': 'sidebar-bg',
    '#1b2640': 'hero-gradient-start',
    '#3556d6': 'hero-gradient-end',
    '#0e1830': 'strong',
    '#9a4a00': 'inline-code',
    'rgba(53, 86, 214, 0.045)': 'row-hover',
    '#6a737d': 'hljs-comment',
    '#c0213f': 'hljs-keyword',
    '#0b57c4': 'hljs-attr',
    '#0a6b3a': 'hljs-string',
    '#b04a00': 'hljs-number',
    '#6f42c1': 'hljs-meta',
    '#4f5f7e': 'hljs-punctuation',
    '#b9e0c9': 'callout-practice-border',
    '#ffffff': 'on-accent',
    'rgba(53, 86, 214, 0.05)': 'checklist-hover',
    'rgba(27, 38, 64, 0.18)': 'sidebar-shadow',
};

/** CSS 宣言値に含まれる固定色（hex・rgb/rgba）。 */
export const SAP_D2_COLOR_LITERAL = /#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)/g;
