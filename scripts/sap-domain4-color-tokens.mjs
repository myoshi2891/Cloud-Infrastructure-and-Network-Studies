/** SAP-C02 Domain 4 原本CSSの固定色と、app/globals.css の @theme に置くトークン名（--color-sap-d4-<名前>）の対応。
 * @type {Readonly<Record<string, string>>}
 */
export const SAP_D4_COLOR_TOKENS = {
    '#eaf0fa': 'sidebar-bg',
    '#d9e4fb': 'sidebar-active',
    '#1b2538': 'hero-gradient-start',
    '#2f55c8': 'hero-gradient-end',
    '#0c1426': 'strong',
    '#9a4a00': 'inline-code',
    'rgba(47, 85, 200, 0.05)': 'row-hover',
    '#a9d8bf': 'callout-practice-border',
    '#ffffff': 'surface',
    'rgba(47, 85, 200, 0.06)': 'checklist-hover',
    '#f6f8fc': 'code-bg',
    'rgba(20, 30, 60, 0.25)': 'sidebar-shadow',
    'rgba(47, 85, 200, 0.12)': 'src-card-hover-shadow',
    '#566379': 'hljs-comment',
    '#7a1fa2': 'hljs-keyword',
    '#0b6b2a': 'hljs-string',
    '#a14400': 'hljs-number',
    '#0a5fb4': 'hljs-built_in',
    '#1d4fb8': 'hljs-attr',
    '#8a2c6d': 'hljs-variable',
    '#44546f': 'hljs-punctuation',
    '#b4233c': 'hljs-err',
};

/** CSS 宣言値に含まれる固定色（hex・rgb/rgba）。 */
export const SAP_D4_COLOR_LITERAL = /#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)/g;
