import fs from 'node:fs';
import { JSDOM } from 'jsdom';

const SECTION_PHASES = [
    'herointro',
    'corerouting',
    'architectures',
    'access',
    'ha',
    'security',
    'automation',
    'appendix',
];

const targetPhase = process.argv[2];
if (targetPhase && targetPhase !== 'all' && !SECTION_PHASES.includes(targetPhase)) {
    console.error('Specify one of: all, ' + SECTION_PHASES.join(', '));
    process.exit(1);
}

const htmlPath = fs.existsSync('Ccie-sp-guide.html')
    ? 'Ccie-sp-guide.html'
    : 'archive/Cisco/html/ccie/Ccie-sp-guide.html';

if (!fs.existsSync(htmlPath)) {
    console.error(`原本ファイルが見つかりません: ${htmlPath}`);
    process.exit(1);
}

const html = fs.readFileSync(htmlPath, 'utf8');
const doc = new JSDOM(html).window.document;
const main = doc.querySelector('main');

if (!main) {
    console.error('main要素が見つかりません');
    process.exit(1);
}

// scriptからDIAGRAMSを取得
const scriptMatch = html.match(/window\.DIAGRAMS\s*=\s*\{([\s\S]*?)\};\s*(?:\(function|<script|<\/script)/);
const fn = new Function('return {' + (scriptMatch ? scriptMatch[1] : '') + '}');
const diagrams = fn();

function pieChartTitle(id) {
    const raw = diagrams[id];
    if (!raw) return null;
    const m = raw.match(/title\s+([^;\n\r]+)/);
    return m ? m[1].trim() : null;
}

function codeBlockLabel(preNode) {
    let prev = preNode.previousElementSibling;
    while (prev && !prev.matches('h1, h2, h3, h4, .code-label, .callout-head')) {
        prev = prev.previousElementSibling;
    }
    const label = prev?.textContent?.replace(/\s+/g, ' ').trim() || 'コマンド例';
    return `${label}（コードブロック）`;
}

function tableLabel(tableNode) {
    let prev = tableNode.previousElementSibling;
    while (prev && !prev.matches('h1, h2, h3, h4, .callout-head, header')) {
        prev = prev.previousElementSibling;
    }
    const label = prev?.textContent?.replace(/\s+/g, ' ').trim() || '比較・仕様表';
    return `${label}（表）`;
}

function escapeJsxText(text) {
    return JSON.stringify(text);
}

function plainCodeLineToJsx(lineText) {
    if (!lineText) return '{" "}';
    return '{' + JSON.stringify(lineText) + '}';
}

function nodeToJsx(node) {
    if (node.nodeType === 3) {
        // テキストノード
        if (['TABLE', 'THEAD', 'TBODY', 'TR'].includes(node.parentElement?.tagName) && !node.textContent.trim()) {
            return '';
        }
        return '{' + JSON.stringify(node.textContent) + '}';
    }
    if (node.nodeType !== 1) return '';

    // Mermaid Diagram
    if (node.classList?.contains('diagram')) {
        const target = node.querySelector('.diagram-target');
        const id = target ? target.id.replace('dg-', '') : '';
        let prev = node.previousElementSibling;
        while (prev && !prev.matches('h1, h2, h3, h4, header, .callout-head')) {
            prev = prev.previousElementSibling;
        }
        const labelText = pieChartTitle(id)
            ?? (prev ? (prev.textContent || '').replace(/\s+/g, ' ').trim() : `図解 ${id}`);
        return `<Diagram id="${id}" label={${JSON.stringify(labelText)}} />`;
    }

    // Code Block (pre)
    if (node.tagName === 'PRE') {
        const code = node.querySelector('code');
        const rawText = code ? code.textContent : node.textContent;
        const lines = (rawText || '').replace(/^\r?\n|\r?\n$/g, '').split(/\r?\n/);
        return (
            `<div className="code-sample">` +
            `<div className="code-block" tabIndex={0} role="region" aria-label={${JSON.stringify(codeBlockLabel(node))}}>` +
            lines.map(line => `<div className="code-line">${plainCodeLineToJsx(line)}</div>`).join('') +
            `</div></div>`
        );
    }

    // Table 構造の正規化
    if (node.tagName === 'TABLE') {
        const thead = node.querySelector('thead');
        const tbody = node.querySelector('tbody');
        const rows = [...node.querySelectorAll('tr')];

        let headContent = '';
        let bodyContent = '';

        if (thead) {
            headContent = [...thead.childNodes].map(nodeToJsx).join('');
        } else if (rows.length > 0 && rows[0].querySelector('th')) {
            const firstRow = rows[0];
            const ths = [...firstRow.querySelectorAll('th')];
            headContent = `<tr>${ths.map(th => {
                const attrs = ['scope="col"'];
                if (th.getAttribute('colspan')) attrs.push(`colSpan={${th.getAttribute('colspan')}}`);
                if (th.getAttribute('rowspan')) attrs.push(`rowSpan={${th.getAttribute('rowspan')}}`);
                return `<th ${attrs.join(' ')}>${[...th.childNodes].map(nodeToJsx).join('')}</th>`;
            }).join('')}</tr>`;
        }

        const bodyRows = rows.filter(r => !r.parentElement?.matches('thead') && (thead || r !== rows[0] || !r.querySelector('th')));
        bodyContent = bodyRows.map(r => {
            const cells = [...r.children].map(c => {
                const tag = c.tagName.toLowerCase();
                const attrs = [];
                if (tag === 'th') attrs.push('scope="row"');
                if (c.getAttribute('colspan')) attrs.push(`colSpan={${c.getAttribute('colspan')}}`);
                if (c.getAttribute('rowspan')) attrs.push(`rowSpan={${c.getAttribute('rowspan')}}`);
                const attrStr = attrs.length ? ' ' + attrs.join(' ') : '';
                return `<${tag}${attrStr}>${[...c.childNodes].map(nodeToJsx).join('')}</${tag}>`;
            }).join('');
            return `<tr>${cells}</tr>`;
        }).join('');

        const tableJsx = `<table aria-label={${JSON.stringify(tableLabel(node))}}>` +
            (headContent ? `<thead>${headContent}</thead>` : '') +
            (bodyContent ? `<tbody>${bodyContent}</tbody>` : '') +
            `</table>`;

        // 親が table-wrap でない場合はラップする
        if (node.parentElement?.classList?.contains('table-wrap')) {
            return tableJsx;
        }
        return `<div className="table-wrap">${tableJsx}</div>`;
    }

    // 通常要素
    const tag = node.tagName.toLowerCase();
    const attrs = [];

    // th のアクセシビリティ scope 保証
    if (tag === 'th') {
        const inThead = node.closest('thead') !== null;
        const currentScope = node.getAttribute('scope');
        if (currentScope) {
            attrs.push(`scope="${currentScope}"`);
        } else if (inThead) {
            attrs.push('scope="col"');
        } else {
            attrs.push('scope="row"');
        }
    }

    // colspan / rowspan
    if (node.getAttribute('colspan')) {
        attrs.push(`colSpan={${node.getAttribute('colspan')}}`);
    }
    if (node.getAttribute('rowspan')) {
        attrs.push(`rowSpan={${node.getAttribute('rowspan')}}`);
    }

    // class -> className
    if (node.className && typeof node.className === 'string') {
        attrs.push(`className="${node.className}"`);
    }

    // id
    if (node.id) {
        attrs.push(`id="${node.id}"`);
    }

    // href
    if (node.getAttribute('href')) {
        attrs.push(`href="${node.getAttribute('href')}"`);
    }

    // target & rel
    if (node.getAttribute('target')) {
        attrs.push(`target="${node.getAttribute('target')}"`);
    }
    if (node.getAttribute('rel')) {
        attrs.push(`rel="${node.getAttribute('rel')}"`);
    }

    // SVG attributes
    if (['svg', 'path', 'circle', 'rect', 'line', 'polygon', 'g'].includes(tag)) {
        for (const attr of node.attributes) {
            if (['class', 'id', 'href'].includes(attr.name)) continue;
            let name = attr.name;
            if (name === 'stroke-width') name = 'strokeWidth';
            if (name === 'stroke-linecap') name = 'strokeLinecap';
            if (name === 'stroke-linejoin') name = 'strokeLinejoin';
            if (name === 'viewbox') name = 'viewBox';
            if (name === 'fill-rule') name = 'fillRule';
            if (name === 'clip-rule') name = 'clipRule';
            attrs.push(`${name}="${attr.value}"`);
        }
    }

    // 自閉タグ
    if (['br', 'hr', 'img', 'input'].includes(tag)) {
        const attrStr = attrs.length ? ' ' + attrs.join(' ') : '';
        return `<${tag}${attrStr} />`;
    }

    const attrStr = attrs.length ? ' ' + attrs.join(' ') : '';
    const childrenJsx = [...node.childNodes].map(nodeToJsx).join('');
    return `<${tag}${attrStr}>${childrenJsx}</${tag}>`;
}

// セクション分割の境界定義
// main.children:
// [0] HEADER.hero
// [1] SECTION.chapter (目次)
// [2] SECTION.chapter (1. 全体像)
// [3] SECTION.chapter (2. 出題範囲マップ)
// [4] SECTION.chapter (3. SP基本用語)
// [5] SECTION.chapter (4. Core Routing)
// [6] SECTION.chapter (5. Architectures & Services)
// [7] SECTION.chapter (6. Access Connectivity)
// [8] SECTION.chapter (7. HA & Fast Convergence)
// [9] SECTION.chapter (8. Security)
// [10] SECTION.chapter (9. Assurance & Automation)
// [11] SECTION.chapter (10. SPCOR補足)
// [12] SECTION.chapter (11. Lab攻略)
// [13] SECTION.chapter (12. 学習計画)
// [14] SECTION.chapter (13. 参考URL)
// [15] SECTION.chapter (14. 用語集)
// [16] FOOTER.footer

const BOUNDARIES = {
    herointro: {
        name: 'HeroIntro',
        file: 'app/cisco/ccie/service-provider/sections/HeroIntro.tsx',
        start: 0,
        end: 5, // 0..4
    },
    corerouting: {
        name: 'CoreRouting',
        file: 'app/cisco/ccie/service-provider/sections/CoreRouting.tsx',
        start: 5,
        end: 6, // 5
    },
    architectures: {
        name: 'ArchitecturesServices',
        file: 'app/cisco/ccie/service-provider/sections/ArchitecturesServices.tsx',
        start: 6,
        end: 7, // 6
    },
    access: {
        name: 'AccessConnectivity',
        file: 'app/cisco/ccie/service-provider/sections/AccessConnectivity.tsx',
        start: 7,
        end: 8, // 7
    },
    ha: {
        name: 'HighAvailability',
        file: 'app/cisco/ccie/service-provider/sections/HighAvailability.tsx',
        start: 8,
        end: 9, // 8
    },
    security: {
        name: 'Security',
        file: 'app/cisco/ccie/service-provider/sections/Security.tsx',
        start: 9,
        end: 10, // 9
    },
    automation: {
        name: 'AssuranceAutomation',
        file: 'app/cisco/ccie/service-provider/sections/AssuranceAutomation.tsx',
        start: 10,
        end: 11, // 10
    },
    appendix: {
        name: 'Appendix',
        file: 'app/cisco/ccie/service-provider/sections/Appendix.tsx',
        start: 11,
        end: 17, // 11..16
    },
};

const children = [...main.children];

function generateSection(phaseKey) {
    const b = BOUNDARIES[phaseKey];
    if (!b) throw new Error(`Unknown phase: ${phaseKey}`);

    const slice = children.slice(b.start, b.end);
    const jsxContent = slice.map(nodeToJsx).join('\n');

    const fileContent = `import { Diagram } from '../Diagram';

/**
 * ${b.name} セクションコンポーネント
 */
export default function ${b.name}() {
    return (
        <>
${jsxContent}
        </>
    );
}
`;

    fs.writeFileSync(b.file, fileContent);
    console.log(`Generated ${b.name} (${b.file}) from children[${b.start}..${b.end}]`);
}

export function runMigration(phase) {
    if (phase === 'all') {
        for (const p of SECTION_PHASES) {
            generateSection(p);
        }
    } else {
        generateSection(phase);
    }
}

if (targetPhase) {
    runMigration(targetPhase);
}

