import fs from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';

const SECTION_PHASES = [
    'herointro',
    'chapter2',
    'chapter3',
    'chapter4',
    'chapter5',
];

const targetPhase = process.argv[2];
if (targetPhase && targetPhase !== 'all' && !SECTION_PHASES.includes(targetPhase)) {
    console.error('Specify one of: all, ' + SECTION_PHASES.join(', '));
    process.exit(1);
}

const repositoryRoot = fileURLToPath(new URL('../', import.meta.url));
const primaryHtmlPath = resolve(repositoryRoot, 'Ccnp-service-provider-guide.html');
const htmlPath = fs.existsSync(primaryHtmlPath)
    ? primaryHtmlPath
    : resolve(repositoryRoot, 'archive/Cisco/html/ccnp-service-provider/Ccnp-service-provider-guide.html');

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

const allTables = [...main.querySelectorAll('table')];

function tableLabel(tableNode) {
    let scope = tableNode.closest('.table-wrap') ?? tableNode;
    let heading = null;
    while (scope && scope !== main && !heading) {
        let prev = scope.previousElementSibling;
        while (prev && !prev.matches('h1, h2, h3, h4, .callout-head, header')) {
            prev = prev.previousElementSibling;
        }
        heading = prev;
        scope = scope.parentElement;
    }
    const label = heading?.textContent?.replace(/\s+/g, ' ').trim() || '比較・仕様表';
    return `${label}（表 ${allTables.indexOf(tableNode) + 1}）`;
}

function plainCodeLineToJsx(lineHtml) {
    if (!lineHtml) return '{""}';
    const frag = JSDOM.fragment(`<div>${lineHtml}</div>`).firstChild;
    return [...frag.childNodes].map(nodeToJsx).join('') || '{""}';
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
        const id = node.getAttribute('data-diagram') || node.id || node.getAttribute('data-d') || '';
        let prev = node.previousElementSibling;
        while (prev && !prev.matches('h1, h2, h3, h4, header, .callout-head')) {
            prev = prev.previousElementSibling;
        }
        const labelText = prev ? (prev.textContent || '').replace(/\s+/g, ' ').trim() : `図解 ${id}`;
        return `<Diagram id="${id}" label={${JSON.stringify(labelText)}} />`;
    }

    // Code Block (pre)
    if (node.tagName === 'PRE') {
        const codeNode = node.querySelector('code') || node;
        const rawHtml = codeNode.innerHTML || '';
        const lines = rawHtml.split(/\r?\n/);
        // 末尾の空行を除去
        if (lines.length > 0 && lines[lines.length - 1] === '') {
            lines.pop();
        }
        let prev = node.previousElementSibling;
        while (prev && !prev.matches('h1, h2, h3, h4, .code-label, .callout-head')) {
            prev = prev.previousElementSibling;
        }
        const labelText = prev?.textContent?.replace(/\s+/g, ' ').trim() || 'コマンド例';

        const linesJsx = lines.map((lineHtml) => `<div className="code-line">${plainCodeLineToJsx(lineHtml)}</div>`).join('');
        return (
            `<div className="code-block" tabIndex={0} role="region" aria-label={${JSON.stringify(`${labelText}（コードブロック）`)}}>` +
            linesJsx +
            `</div>`
        );
    }

    // Table 構造の正規化: thead と th[scope="col"] の保証
    if (node.tagName === 'TABLE') {
        const lbl = tableLabel(node);
        let thead = node.querySelector('thead');
        let tbody = node.querySelector('tbody');
        const rows = [...node.querySelectorAll('tr')];

        let headContent = '';
        let bodyContent = '';

        if (thead) {
            const headRows = [...thead.querySelectorAll('tr')];
            headContent = headRows.map((r) => {
                const cells = [...r.children];
                return `<tr>${cells.map((c) => {
                    const isTh = c.tagName === 'TH';
                    const tag = isTh ? 'th' : 'td';
                    const attrs = [];
                    if (isTh) attrs.push('scope="col"');
                    if (c.getAttribute('colspan')) attrs.push(`colSpan={${c.getAttribute('colspan')}}`);
                    if (c.getAttribute('rowspan')) attrs.push(`rowSpan={${c.getAttribute('rowspan')}}`);
                    const attrStr = attrs.length ? ' ' + attrs.join(' ') : '';
                    return `<${tag}${attrStr}>${[...c.childNodes].map(nodeToJsx).join('')}{" "}</${tag}>`;
                }).join('')}</tr>`;
            }).join('');
        } else if (rows.length > 0 && rows[0].querySelector('th')) {
            const firstRow = rows[0];
            const ths = [...firstRow.querySelectorAll('th')];
            headContent = `<tr>${ths.map((th) => {
                const attrs = ['scope="col"'];
                if (th.getAttribute('colspan')) attrs.push(`colSpan={${th.getAttribute('colspan')}}`);
                if (th.getAttribute('rowspan')) attrs.push(`rowSpan={${th.getAttribute('rowspan')}}`);
                return `<th ${attrs.join(' ')}>${[...th.childNodes].map(nodeToJsx).join('')}{" "}</th>`;
            }).join('')}</tr>`;
        }

        const bodyRows = rows.filter((r) => !r.parentElement?.matches('thead') && (thead || r !== rows[0] || !r.querySelector('th')));
        bodyContent = bodyRows.map((r) => {
            const cells = [...r.children];
            return `<tr>${cells.map((c) => {
                const isTh = c.tagName === 'TH';
                const tag = isTh ? 'th' : 'td';
                const attrs = [];
                if (isTh) attrs.push('scope="row"');
                if (c.getAttribute('colspan')) attrs.push(`colSpan={${c.getAttribute('colspan')}}`);
                if (c.getAttribute('rowspan')) attrs.push(`rowSpan={${c.getAttribute('rowspan')}}`);
                const attrStr = attrs.length ? ' ' + attrs.join(' ') : '';
                return `<${tag}${attrStr}>${[...c.childNodes].map(nodeToJsx).join('')}{" "}</${tag}>`;
            }).join('')}</tr>`;
        }).join('');

        const theadJsx = headContent ? `<thead>${headContent}</thead>` : '';
        const tbodyJsx = tbody ? `<tbody>${bodyContent}</tbody>` : bodyContent ? `<tbody>${bodyContent}</tbody>` : '';

        const tableJsx = `<table aria-label={${JSON.stringify(lbl)}}>${theadJsx}${tbodyJsx}</table>`;
        if (node.parentElement?.classList?.contains('table-wrap')) {
            return tableJsx;
        }
        return `<div className="table-wrap">${tableJsx}</div>`;
    }

    const tag = node.tagName.toLowerCase();
    const attrs = [];

    for (const attr of node.attributes) {
        let name = attr.name;
        let val = attr.value;
        if (name === 'class') name = 'className';
        if (name === 'for') name = 'htmlFor';
        if (name === 'tabindex') name = 'tabIndex';
        if (name === 'colspan') name = 'colSpan';
        if (name === 'rowspan') name = 'rowSpan';
        if (name === 'stroke-width') name = 'strokeWidth';
        if (name === 'stroke-linecap') name = 'strokeLinecap';
        if (name === 'stroke-linejoin') name = 'strokeLinejoin';
        if (name === 'text-anchor') name = 'textAnchor';
        if (name === 'font-size') name = 'fontSize';
        if (name === 'viewbox') name = 'viewBox';

        if (name === 'style') {
            continue;
        }

        attrs.push(`${name}={${JSON.stringify(val)}}`);
    }

    const attrStr = attrs.length ? ' ' + attrs.join(' ') : '';
    let childrenJsx = [...node.childNodes].map(nodeToJsx).join('');
    if (['th', 'td'].includes(tag)) {
        childrenJsx += '{" "}';
    }
    return `<${tag}${attrStr}>${childrenJsx}</${tag}>`;
}

const BOUNDARIES = {
    herointro: {
        name: 'HeroIntro',
        file: 'app/cisco/ccnp-service-provider/sections/HeroIntro.tsx',
        start: 0,
        end: 6,
    },
    chapter2: {
        name: 'Chapter2',
        file: 'app/cisco/ccnp-service-provider/sections/Chapter2.tsx',
        start: 6,
        end: 11,
    },
    chapter3: {
        name: 'Chapter3',
        file: 'app/cisco/ccnp-service-provider/sections/Chapter3.tsx',
        start: 11,
        end: 15,
    },
    chapter4: {
        name: 'Chapter4',
        file: 'app/cisco/ccnp-service-provider/sections/Chapter4.tsx',
        start: 15,
        end: 20,
    },
    chapter5: {
        name: 'Chapter5',
        file: 'app/cisco/ccnp-service-provider/sections/Chapter5.tsx',
        start: 20,
        end: 29,
    },
};

const children = [...main.children];
const expectedChildren = 29;
if (children.length !== expectedChildren) {
    console.error(`main の子要素数が一致しません。生成を中止します。expected: ${expectedChildren}, actual: ${children.length}`);
    process.exit(1);
}

export function generateSection(phaseKey) {
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

    const outputPath = resolve(repositoryRoot, b.file);
    fs.mkdirSync(dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, fileContent);
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
