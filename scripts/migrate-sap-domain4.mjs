import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { JSDOM } from 'jsdom';
import postcss from 'postcss';
import ts from 'typescript';
import mermaid from 'mermaid';
import { isValid, toHex } from 'khroma';
import fixture from '../docs/migration-inventory/aws-sap-c02-domain4.fidelity.json' with { type: 'json' };
import { FIDELITY_PAGES } from './archive-fidelity-config.mjs';
import { SAP_D4_COLOR_LITERAL, SAP_D4_COLOR_TOKENS } from './sap-domain4-color-tokens.mjs';
import { SAP_DOMAIN4_CORRECTIONS, SAP_DOMAIN4_DIAGRAM_CORRECTIONS } from '../__tests__/helpers/sap-domain4-source-corrections.ts';

const dir = 'app/aws/solutions-architect-professional/domain4';
const source = execFileSync('git', ['show', `${fixture.sourceCommit}:${fixture.source}`], { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 });

// 本文訂正を原本の改行・字下げを保ったまま適用してから解析する。
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const corrected = SAP_DOMAIN4_CORRECTIONS.reduce((html, [from, to]) => {
    const words = from.split(/\s+/),
        next = to.split(/\s+/);
    if (words.length !== next.length) throw new Error('Correction word count mismatch: ' + from);
    const pattern = new RegExp(words.map(escape).join('(\\s+)'));
    if (!pattern.test(html)) throw new Error('Correction not found: ' + from);
    return html.replace(pattern, (...m) => next.map((w, i) => w + (i < next.length - 1 ? m[i + 1] : '')).join(''));
}, source);

const doc = new JSDOM(corrected).window.document;

// 図の訂正は原本の図全体と完全一致した場合だけ置き換える
const unusedDiagramCorrections = new Set(SAP_DOMAIN4_DIAGRAM_CORRECTIONS.map(([from]) => from));
const correctDiagram = (chart) => {
    const hit = SAP_DOMAIN4_DIAGRAM_CORRECTIONS.find(([from]) => from === chart);
    if (!hit) return chart;
    unusedDiagramCorrections.delete(hit[0]);
    return hit[1];
};

const boundaries = FIDELITY_PAGES['aws-sap-c02-domain4'].guideBoundaries;
const phase = process.argv[2];
if (phase !== 'all' && !Object.hasOwn(boundaries, phase)) {
    throw new Error('Specify foundation, task41..task44, summary, appendix or all');
}

fs.mkdirSync(dir + '/sections', { recursive: true });

const write = (name, s) => {
    if (/\.tsx?$/.test(name)) {
        s = ts
            .createPrinter({ newLine: ts.NewLineKind.LineFeed })
            .printFile(ts.createSourceFile(name, s, ts.ScriptTarget.Latest, true, name.endsWith('tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS));
        s = s.replaceAll('><', '>\n<').replaceAll('>{', '>\n{').replaceAll('}<', '}\n<');
    }
    fs.writeFileSync(dir + '/' + name, s);
};

const diagrams = [...doc.querySelectorAll('pre.mermaid')];

function plainCodeLineToJsx(lineHtml) {
    if (!lineHtml) return '{""}';
    const frag = JSDOM.fragment(`<div>${lineHtml}</div>`).firstChild;
    return [...frag.childNodes].map(nodeToJsx).join('');
}

function nodeToJsx(node) {
    if (node.nodeType === 3) {
        return '{' + JSON.stringify(node.textContent) + '}';
    }
    if (node.nodeType !== 1) return '';
    const attrs = [...node.attributes].map((a) => `${{ class: 'className', for: 'htmlFor' }[a.name] || a.name}={${JSON.stringify(a.value)}}`);
    const tag = node.tagName.toLowerCase();
    return '<' + tag + ' ' + attrs.join(' ') + '>' + [...node.childNodes].map(nodeToJsx).join('') + '</' + tag + '>';
}

const tableScrolls = [...doc.querySelectorAll('.table-scroll')];
function tableLabel(n) {
    let heading = n.previousElementSibling;
    while (heading && !heading.matches('h2,h3,h4')) heading = heading.previousElementSibling;
    return `比較表 ${tableScrolls.indexOf(n) + 1}：` + (heading?.textContent ?? '学習資料').replace(/\s+/g, ' ').trim();
}

function jsx(n) {
    if (n.nodeType === 3) {
        if (['TABLE', 'THEAD', 'TBODY', 'TFOOT', 'TR'].includes(n.parentElement?.tagName) && !n.textContent.trim()) return '';
        return '{' + JSON.stringify(n.textContent) + '}';
    }
    if (n.nodeType !== 1) return '';
    if (n.matches('pre.mermaid')) {
        const i = diagrams.indexOf(n);
        let prev = n.previousElementSibling;
        while (prev && !prev.matches('h2,h3,h4')) prev = prev.previousElementSibling;
        return `<Diagram id="diag-${i}" label={${JSON.stringify(prev?.textContent.trim() ?? `図${i + 1}`)}} />`;
    }
    if (n.matches('pre')) {
        const code = n.querySelector('code');
        const language = code?.className.replace('language-', '') ?? 'text';
        const rawHtml = code ? code.innerHTML : n.innerHTML;
        const htmlLines = (rawHtml || '').replace(/^\r?\n|\r?\n$/g, '').split(/\r?\n/);
        return (
            `<pre className="code code-block" tabIndex={0} role="group" aria-label="${language} コード例">` +
            htmlLines.map((lineHtml) => '<div className="code-line">' + plainCodeLineToJsx(lineHtml) + '</div>').join('') +
            '</pre>'
        );
    }
    const attrs = [...n.attributes].map((a) => `${{ class: 'className', for: 'htmlFor' }[a.name] || a.name}={${JSON.stringify(a.value)}}`);
    if (n.matches('th')) attrs.push('scope="col"');
    if (n.matches('h2[id],h3[id],h4[id]')) attrs.push('tabIndex={-1}');
    if (n.matches('.table-scroll')) attrs.push('tabIndex={0}', 'role="region"', `aria-label={${JSON.stringify(tableLabel(n))}}`);
    if (n.matches('.checklist-card')) {
        if (n.attributes.length !== 1) throw new Error('Unexpected checklist-card attributes');
        return '<ChecklistCard>' + [...n.childNodes].map(jsx).join('') + '</ChecklistCard>';
    }
    if (n.matches('.count')) return `<ChecklistCount total={${n.closest('.checklist-card').querySelectorAll('input').length}} />`;
    const tag = n.tagName.toLowerCase();
    return '<' + tag + ' ' + attrs.join(' ') + (['input', 'br', 'hr', 'img'].includes(tag) ? ' />' : '>' + [...n.childNodes].map(jsx).join('') + '</' + tag + '>');
}

let current = 'foundation';
const chunks = Object.fromEntries(Object.keys(boundaries).map((k) => [k, []]));
for (const n of doc.querySelector('main').childNodes) {
    const found = Object.entries(boundaries).find(([, id]) => id && n.nodeType === 1 && n.id === id)?.[0];
    if (found) current = found;
    chunks[current].push(n);
}

const generatePhase = (p) => {
    const body = chunks[p].map(jsx).join('');
    write(
        'sections/' + p + '.tsx',
        `import { Diagram } from '../Diagram';\n${
            body.includes('<ChecklistCard>') ? "import { ChecklistCard, ChecklistCount } from '../ChecklistCard';\n" : ''
        }/** 原本の${p}本文。 */\nexport default function Content(){return <>${body}</>;}`,
    );
};

if (phase === 'all') {
    for (const p of Object.keys(boundaries)) {
        generatePhase(p);
    }
} else {
    generatePhase(phase);
}

// 共通インフラファイルの生成
write('ChecklistCard.tsx',`'use client';\nimport {createContext,useContext,useCallback,useState,type ReactNode} from 'react';\nconst CheckedCount=createContext(0);\n/** チェックリスト1枚。カード内の選択済み項目数だけをClient状態として持つ。 */\nexport function ChecklistCard({children}:{children:ReactNode}){const [count,setCount]=useState(0);const card=useCallback((node:HTMLDivElement|null)=>{if(node)setCount(node.querySelectorAll('input:checked').length);},[]);return <CheckedCount.Provider value={count}><div ref={card} className="checklist-card" onChange={event=>setCount(event.currentTarget.querySelectorAll('input:checked').length)}>{children}</div></CheckedCount.Provider>;}\n/** 所属するカードの完了数を表示する。 */\nexport function ChecklistCount({total}:{total:number}){const count=useContext(CheckedCount);return <span className="count">{\`\${count} / \${total} 完了\`}</span>;}`);

const diagramCharts = Object.fromEntries(diagrams.map((e, i) => ['diag-' + i, correctDiagram(e.textContent.trim().split('\n').map((l) => l.trimStart()).join('\n'))]));
if (unusedDiagramCorrections.size) throw new Error('Diagram correction not found: ' + [...unusedDiagramCorrections][0].split('\n')[1]);
write('constants.ts', 'export const DIAGRAMS:Record<string,string> = ' + JSON.stringify(diagramCharts, null, 2) + ';\nexport const NAV_ITEMS = ' + JSON.stringify(fixture.guideDesign.nav, null, 2) + ' as const;\n');

const theme = fixture.guideInteractions.mermaidConfig;
fs.writeFileSync(dir + '/mermaid-theme.json', JSON.stringify(theme, null, 2) + '\n');
mermaid.initialize({ ...theme, startOnLoad: false });
const vars = mermaid.mermaidAPI.getConfig().themeVariables;

fs.writeFileSync(
    dir + '/render-theme.json',
    JSON.stringify(
        {
            ...theme,
            themeVariables: {
                ...Object.fromEntries(
                    Object.entries(vars).map(([k, v]) => [k, typeof v === 'string' && /^(?:hsl|rgb)a?\(/.test(v) && isValid(v) ? toHex(v) : v]),
                ),
                quadrantPointFill: vars.lineColor,
                fontFamily: '"Noto Sans JP Variable",sans-serif',
            },
        },
        null,
        2,
    ) + '\n',
);

write('Diagram.tsx',`'use client';\nimport {memo,useId} from 'react';\nimport {MermaidDiagram} from '@/components/MermaidDiagram';\nimport {DIAGRAMS} from './constants';\nimport {DIAGRAM_DESCRIPTIONS} from './diagram-descriptions';\nimport theme from './render-theme.json';\nconst config='---\\nconfig: '+JSON.stringify(theme)+'\\n---\\n';\n/** 原本の配色・自然倍率で図を描画し、図の構成と流れを説明するテキスト代替を関連付ける。 */\nexport const Diagram=memo(function Diagram({id,label}:{id:string;label:string}){const descriptionId=useId();const chart=DIAGRAMS[id];const description=DIAGRAM_DESCRIPTIONS[id];if(!chart)throw new Error('Missing diagram: '+id);if(!description)throw new Error('Missing diagram description: '+id);return <div className="mermaid-wrap"><MermaidDiagram chart={config+chart} theme="light" preserveChartTheme ariaLabel={label} ariaDescribedBy={descriptionId} preserveNaturalScale focusable /><span id={descriptionId} className="sr-only">{description}</span></div>;});`);

write(
    'page.tsx',
    `import type {Metadata} from 'next';\nimport SapDomain4Guide from './SapDomain4Guide';\nimport './page.css';\nexport const metadata:Metadata={title:${JSON.stringify(
        doc.title.replace(/\s+/g, ' ').trim(),
    )}};\n/** SAP-C02 Domain 4。 */\nexport default function Page(){return <SapDomain4Guide/>;}\n`,
);

const css = postcss.parse(doc.querySelector('style').textContent);
const root = css.nodes.find((n) => n.type === 'rule' && n.selector === ':root');
root.remove();
css.walkComments((c) => c.remove());

css.walkRules((r) => {
    r.selector = r.selector
        .split(',')
        .map((s) =>
            ['html', 'body'].includes(s.trim())
                ? '.sap-domain4-page'
                : '.sap-domain4-page ' +
                  s
                      .trim()
                      .replaceAll('pre.mermaid', '.mermaid-wrap')
                      .replaceAll('pre.code code', 'pre.code .code-line')
                      .replaceAll('pre:not(.mermaid) code', 'pre:not(.mermaid) .code-line'),
        )
        .join(', ');
});

css.walkDecls((d) => {
    d.value = d.value.replace(/var\(--([\w-]+)\)/g, (_, k) => (k === 'sidebar-w' ? '300px' : k === 'font-jp' ? 'var(--font-body)' : `var(--color-sap-d4-${k})`));
    d.value = d.value.replace(SAP_D4_COLOR_LITERAL, (literal) => {
        const token = SAP_D4_COLOR_TOKENS[literal];
        if (!token) throw new Error('Unmapped color literal: ' + literal);
        return `var(--color-sap-d4-${token})`;
    });
    if (d.prop === 'word-break') d.remove();
});

// サイドバーガイドのレイアウト契約: デスクトップは残り幅を全て使い、レスポンシブでは全幅へ戻す
css.walkRules('.sap-domain4-page .main', (r) => {
    if (r.parent.type === 'atrule') r.append({ prop: 'width', value: '100%' }, { prop: 'max-width', value: 'none' });
    else r.append({ prop: 'width', value: 'calc(100% - 300px)' }, { prop: 'max-width', value: 'none' }, { prop: 'box-sizing', value: 'border-box' });
});

fs.writeFileSync(
    dir + '/page.css',
    css.toString() +
        `
.sap-domain4-page { color-scheme: light; }
.sap-domain4-page .main ul { list-style-type: disc; }
.sap-domain4-page .main ol { list-style-type: decimal; }
.sap-domain4-page .main ul ul { list-style-type: circle; }
.sap-domain4-page .main ul ul ul { list-style-type: square; }
.sap-domain4-page .main .checklist-card ul { list-style: none; padding: 0; }
.sap-domain4-page nav ul { list-style: none; padding: 0; margin: 0; }
.sap-domain4-page .sidebar { top: calc(var(--header-h, 60px) + var(--disclaimer-height, 0px)); z-index: 40; }
.sap-domain4-page .sidebar-toggle { top: calc(var(--header-h, 60px) + var(--disclaimer-height, 0px) + 14px); z-index: 41; }
@media (max-width: 980px) { .sap-domain4-page .sidebar:not(.open) { visibility: hidden; transition: transform 0.25s, visibility 0s linear 0.25s; } }
.sap-domain4-page .main h2, .sap-domain4-page .main h3 { scroll-margin-top: calc(var(--header-h, 60px) + var(--disclaimer-height, 0px) + 24px); }
.sap-domain4-page .main { min-width: 0; }
.sap-domain4-page .mermaid-wrap > [role="img"] { background: transparent; border: 0; padding: 0; margin: 0; width: 100%; }
.sap-domain4-page .mermaid-wrap svg { flex-shrink: 0; max-width: none; height: auto; }
.sap-domain4-page .code-line { white-space: pre; min-height: 1.7em; }
.sap-domain4-page .main p { margin: 1em 0; }
.sap-domain4-page .main .callout-practice p { margin: 0; }
.sap-domain4-page .sidebar-header h2 { font-weight: 700; }
.sap-domain4-page .checklist-card input[type='checkbox']:not(:checked) { border-color: var(--color-sap-d4-checkbox-border); }
.sap-domain4-page .checklist-card li:has(input:checked) label { color: var(--color-sap-d4-checked-label); }
.sap-domain4-page .hljs-comment { color: var(--color-sap-d4-hljs-comment-contrast); }
`,
);
