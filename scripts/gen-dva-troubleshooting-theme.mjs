import fs from 'node:fs';
import mermaid from 'mermaid';
import { isValid, toHex } from 'khroma';
import source from '../docs/migration-inventory/aws-dva-domain4.fidelity.json' with { type: 'json' };

/** 原本単体の派生色も固定し、共通dark初期化からの部分継承を防ぐ。 */
mermaid.initialize(source.theme);
const resolved = mermaid.mermaidAPI.getConfig().themeVariables;
// 負の色相を含むhsl()はjsdomのCSS検証で消えるため、同じ色のhexへ正準化する。
const colors = Object.fromEntries(Object.entries(resolved).map(([key,value]) => [key,
    typeof value === 'string' && /^(?:hsl|rgb)a?\(/.test(value) && isValid(value) ? toHex(value) : value,
]));
fs.writeFileSync('app/aws/developer-associate/domain4/render-theme.json', JSON.stringify({
    ...source.theme,
    themeVariables: {
        ...colors,
        fontFamily: '"Noto Sans JP Variable",sans-serif',
    },
}, null, 2)+'\n');
