import fs from 'node:fs';
import { JSDOM } from 'jsdom';

const SECTION_PHASES = [
    'herointro',
    'parta',
    'partb',
    'partc',
    'partd',
    'parte',
    'partf',
    'appendix',
];

const targetPhase = process.argv[2];
if (targetPhase && targetPhase !== 'all' && !SECTION_PHASES.includes(targetPhase)) {
    console.error('Specify one of: all, ' + SECTION_PHASES.join(', '));
    process.exit(1);
}

const htmlPath = fs.existsSync('Ccnp-collaboration-guide.html')
    ? 'Ccnp-collaboration-guide.html'
    : 'archive/Cisco/html/ccnp-collaboration/Ccnp-collaboration-guide.html';

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

const IOS_KEYWORDS = new Set(
    'dial-peer voice voip pots class-map policy-map service-policy match-all match priority bandwidth fair-queue shape interface session destination-pattern incoming called-number answer-address codec preference translation-rule translation-profile translate rule voice-class dtmf-relay rtp-nte sip-kpml sip-notify crypto pki trustpoint enrollment revocation-check signaling default transport srtp fallback bind control media source-interface registrar server credentials tenant sip sip-ua mode border-element allow-connections request response modify show debug test trace summary call-id register global pool dn number username password id type max-dn max-pool create profile srst cme'.split(' '),
);
const IOS_LITERALS = new Set(
    'no tcp tls ef af41 cs3 dscp output input ipv4 sipv2 vad'.split(' '),
);

function tokensIos(line) {
    if (!line) return '{""}';
    if (/^\s*!.*$/.test(line)) {
        return `<span className="hljs-comment">{${JSON.stringify(line)}}</span>`;
    }
    const regex = /"(?:\\.|[^"\\])*"|\b\d{1,3}(?:\.\d{1,3}){3}\b|\b\d+\b|[\w-]+/g;
    let out = '';
    let end = 0;
    for (const m of line.matchAll(regex)) {
        if (m.index > end) {
            out += '{' + JSON.stringify(line.slice(end, m.index)) + '}';
        }
        const text = m[0];
        if (text.startsWith('"')) {
            out += `<span className="hljs-string">{${JSON.stringify(text)}}</span>`;
        } else if (/^\d/.test(text)) {
            out += `<span className="hljs-number">{${JSON.stringify(text)}}</span>`;
        } else if (IOS_KEYWORDS.has(text)) {
            out += `<span className="hljs-keyword">{${JSON.stringify(text)}}</span>`;
        } else if (IOS_LITERALS.has(text)) {
            out += `<span className="hljs-literal">{${JSON.stringify(text)}}</span>`;
        } else {
            out += '{' + JSON.stringify(text) + '}';
        }
        end = m.index + text.length;
    }
    if (end < line.length) {
        out += '{' + JSON.stringify(line.slice(end)) + '}';
    }
    return out || '{""}';
}

function tokensPython(line) {
    if (!line) return '{""}';
    const regex = /#.*$|f?"(?:\\.|[^"\\])*"|f?'(?:\\.|[^'\\])*'|\b(?:import|from|def|class|return|if|else|elif|try|except|with|as|for|in|while|pass|raise|True|False|None|and|or|not)\b|\b(?:print|len|str|int|dict|list)\b|\b(?:\d+)\b/g;
    let out = '';
    let end = 0;
    for (const m of line.matchAll(regex)) {
        if (m.index > end) {
            out += '{' + JSON.stringify(line.slice(end, m.index)) + '}';
        }
        const text = m[0];
        let cls = 'keyword';
        if (text.startsWith('#')) {
            cls = 'comment';
        } else if (text.startsWith('"') || text.startsWith("'") || text.startsWith('f"') || text.startsWith("f'")) {
            cls = 'string';
        } else if (/^\d+$/.test(text)) {
            cls = 'number';
        } else if (['True', 'False', 'None'].includes(text)) {
            cls = 'literal';
        } else if (['print', 'len', 'str', 'int', 'dict', 'list'].includes(text)) {
            cls = 'built_in';
        }
        out += `<span className="hljs-${cls}">{${JSON.stringify(text)}}</span>`;
        end = m.index + text.length;
    }
    if (end < line.length) {
        out += '{' + JSON.stringify(line.slice(end)) + '}';
    }
    return out || '{""}';
}

function tokensBash(line) {
    if (!line) return '{""}';
    const regex = /#.*$|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b(?:nslookup|python3|source|pip)\b/g;
    let out = '';
    let end = 0;
    for (const m of line.matchAll(regex)) {
        if (m.index > end) {
            out += '{' + JSON.stringify(line.slice(end, m.index)) + '}';
        }
        const text = m[0];
        let cls = 'built_in';
        if (text.startsWith('#')) {
            cls = 'comment';
        } else if (text.startsWith('"') || text.startsWith("'")) {
            cls = 'string';
        }
        out += `<span className="hljs-${cls}">{${JSON.stringify(text)}}</span>`;
        end = m.index + text.length;
    }
    if (end < line.length) {
        out += '{' + JSON.stringify(line.slice(end)) + '}';
    }
    return out || '{""}';
}

function tokensJs(line) {
    if (!line) return '{""}';
    const regex = /\/\/.*$|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b(?:import|from|const|let|var|function|return|if|else)\b/g;
    let out = '';
    let end = 0;
    for (const m of line.matchAll(regex)) {
        if (m.index > end) {
            out += '{' + JSON.stringify(line.slice(end, m.index)) + '}';
        }
        const text = m[0];
        let cls = 'keyword';
        if (text.startsWith('//')) {
            cls = 'comment';
        } else if (text.startsWith('"') || text.startsWith("'")) {
            cls = 'string';
        }
        out += `<span className="hljs-${cls}">{${JSON.stringify(text)}}</span>`;
        end = m.index + text.length;
    }
    if (end < line.length) {
        out += '{' + JSON.stringify(line.slice(end)) + '}';
    }
    return out || '{""}';
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
        const mm = node.querySelector('.mm[data-d]') || node.querySelector('[data-d]');
        const id = mm ? mm.getAttribute('data-d') : '';
        let prev = node.previousElementSibling;
        while (prev && !prev.matches('h1, h2, h3, h4, header, .callout-head')) {
            prev = prev.previousElementSibling;
        }
        const labelText = prev ? (prev.textContent || '').replace(/\s+/g, ' ').trim() : `図解 ${id}`;
        return `<Diagram id="${id}" label={${JSON.stringify(labelText)}} />`;
    }

    // Code Block (pre)
    if (node.tagName === 'PRE') {
        const code = node.querySelector('code');
        const langClass = code?.className || '';
        const rawText = node.textContent || '';
        const lines = rawText.split('\n');
        // 末尾の空行を除去
        if (lines.length > 0 && lines[lines.length - 1] === '') {
            lines.pop();
        }
        let prev = node.previousElementSibling;
        while (prev && !prev.matches('h1, h2, h3, h4, .code-label, .callout-head')) {
            prev = prev.previousElementSibling;
        }
        const labelText = prev?.textContent?.replace(/\s+/g, ' ').trim() || 'コマンド例';

        const renderLine = (line) => {
            if (langClass.includes('language-ios')) return tokensIos(line);
            if (langClass.includes('language-python')) return tokensPython(line);
            if (langClass.includes('language-bash')) return tokensBash(line);
            if (langClass.includes('language-javascript')) return tokensJs(line);
            return '{' + JSON.stringify(line) + '}';
        };

        const linesJsx = lines.map((line) => `<div className="code-line">${renderLine(line)}</div>`).join('');
        return (
            `\n{/* biome-ignore lint/a11y/noNoninteractiveTabindex: 横スクロール可能なコードをキーボードで操作できるようにする */}\n` +
            `<section className="code-block" tabIndex={0} aria-label={${JSON.stringify(`${labelText}（コードブロック）`)}}>` +
            linesJsx +
            `</section>`
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
        file: 'app/cisco/ccnp-collaboration/sections/HeroIntro.tsx',
        start: 0,
        end: 5,
    },
    parta: {
        name: 'PartA',
        file: 'app/cisco/ccnp-collaboration/sections/PartA.tsx',
        start: 5,
        end: 12,
    },
    partb: {
        name: 'PartB',
        file: 'app/cisco/ccnp-collaboration/sections/PartB.tsx',
        start: 12,
        end: 17,
    },
    partc: {
        name: 'PartC',
        file: 'app/cisco/ccnp-collaboration/sections/PartC.tsx',
        start: 17,
        end: 24,
    },
    partd: {
        name: 'PartD',
        file: 'app/cisco/ccnp-collaboration/sections/PartD.tsx',
        start: 24,
        end: 29,
    },
    parte: {
        name: 'PartE',
        file: 'app/cisco/ccnp-collaboration/sections/PartE.tsx',
        start: 29,
        end: 35,
    },
    partf: {
        name: 'PartF',
        file: 'app/cisco/ccnp-collaboration/sections/PartF.tsx',
        start: 35,
        end: 41,
    },
    appendix: {
        name: 'Appendix',
        file: 'app/cisco/ccnp-collaboration/sections/Appendix.tsx',
        start: 41,
        end: 43,
    },
};

const children = [...main.children];
const expectedChildren = 43;
if (children.length !== expectedChildren) {
    console.error(`main の子要素数が一致しません。生成を中止します。expected: ${expectedChildren}, actual: ${children.length}`);
    process.exit(1);
}

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

