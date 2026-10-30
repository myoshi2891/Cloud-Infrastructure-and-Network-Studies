/** SAP-C02 Domain 3 原本CSSの固定色と、app/globals.css の @theme に置くトークン名（--color-sap-d3-<名前>）の対応。 */
export const SAP_D3_COLOR_TOKENS = {
    '#fff': 'surface',
    '#a4430f': 'inline-code',
    '#fbfcfe': 'code-bg',
    '#7c3aed': 'hljs-keyword',
    '#0f7a4a': 'hljs-string',
    '#b45309': 'hljs-number',
    '#6b7a99': 'hljs-comment',
    '#1d4ed8': 'hljs-title',
    '#b6e0c8': 'callout-practice-border',
};

/** CSS 宣言値に含まれる固定色（hex・rgb/rgba）。 */
export const SAP_D3_COLOR_LITERAL = /#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)/g;
