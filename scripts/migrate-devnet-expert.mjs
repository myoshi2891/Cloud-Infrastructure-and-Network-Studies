import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { JSDOM } from 'jsdom';
import postcss from 'postcss';
import { extractDiagramsDefinition } from '../.agents/skills/fix-mermaid/scripts/restore_diagrams.mjs';
import { FIDELITY_PAGES } from './archive-fidelity-config.mjs';
import { extractMermaidConfig } from './guide-interaction-extraction.mjs';
import { applyReviewedExampleCorrections } from './devnet-expert-corrections.mjs';

// Reproducible JSX conversion from the same fixed revision used by the fixtures.
const config = FIDELITY_PAGES['devnet-expert'];
const html = execFileSync('git', ['show', `${config.sourceCommit}:${config.source}`], { encoding: 'utf8' });
const doc = new JSDOM(html).window.document;
const out = 'app/cisco/devnet-expert';
mkdirSync(`${out}/sections`, { recursive: true });
const write = (path, value) => writeFileSync(`${out}/${path}`, value);
const quote = value => JSON.stringify(value);
const attrNames = { class: 'className', 'stroke-width': 'strokeWidth', 'tabindex': 'tabIndex', colspan: 'colSpan', rowspan: 'rowSpan' };
const voidTags = new Set(['input','br','hr']);
/** Serialize author-controlled DOM as native JSX, preserving text and highlight spans. */
function jsx(node) {
    if (node.nodeType === 3) {
        if (/^(TABLE|THEAD|TBODY|TR)$/.test(node.parentElement?.tagName ?? '') && !node.textContent.trim()) return '';
        return node.textContent ? `{${quote(node.textContent)}}` : '';
    }
    if (node.nodeType !== 1) return '';
    const tag = node.tagName.toLowerCase();
    if (node.matches('.mermaid')) {
        const label = node.closest('section').querySelector('h3,h2').textContent;
        return `<Diagram id=${quote(node.dataset.diagram)} label=${quote(label)} />`;
    }
    if (node.matches('pre.hl')) {
        const lines = node.querySelector('code').innerHTML.replace(/^\n|\n$/g, '').split('\n');
        return `<div className="hl code-block">${lines.map(line => {
            const fragment = doc.createElement('div'); fragment.innerHTML = line;
            return `<div className="code-line">${[...fragment.childNodes].map(jsx).join('')}</div>`;
        }).join('')}</div>`;
    }
    const attrs = [...node.attributes].map(a => ` ${attrNames[a.name] ?? a.name}=${quote(a.value)}`).join('');
    const extra = tag === 'th' ? ' scope="col"' : tag === 'section' ? ' tabIndex={-1}' : '';
    return voidTags.has(tag) ? `<${tag}${attrs}${extra} />` : `<${tag}${attrs}${extra}>${[...node.childNodes].map(jsx).join('')}</${tag}>`;
}
// Preserve the reviewed written-exam retake interval when regenerating Part2.
const retakeRow = [...doc.querySelectorAll('tr')].find(row => row.cells[0]?.textContent === '不合格後の待機');
if (!retakeRow) throw new Error('Missing retake waiting-period row');
retakeRow.cells[1].textContent = '不合格の翌日から5暦日';
const sections = [...doc.querySelector('main').children];
sections.forEach((element, i) => {
    applyReviewedExampleCorrections(element);
    write(`sections/Part${i}.tsx`, `import { Diagram } from '../Diagram';\n/** Original guide block ${i}; generated without content summarization. */\nexport default function Part${i}() { return (${jsx(element)}); }\n`);
});
const diagrams = extractDiagramsDefinition(html.replace('window.DIAGRAMS =', 'const DIAGRAMS =')).diagrams;
const nav = [...doc.querySelectorAll('nav a')].map(a => ({ id: a.hash.slice(1), label: a.textContent, level: a.classList.contains('l3') ? 3 : 2 }));
write('constants.ts', `export const DIAGRAMS = ${JSON.stringify(diagrams, null, 2)} as const;\nexport type DiagramId = keyof typeof DIAGRAMS;\nexport const NAV_ITEMS = ${JSON.stringify(nav, null, 2)} as const;\n`);
write('DevNetExpertGuide.tsx', `import NavBar from './NavBar';\n${sections.map((_, i) => `import Part${i} from './sections/Part${i}';`).join('\n')}\n/** Complete guide with isolated interactive navigation and native checkboxes. */\nexport default function DevNetExpertGuide() { return <div className="devnet-expert-page"><NavBar /><main className="main">${sections.map((_, i) => `<Part${i} />`).join('')}</main></div>; }\n`);
write('Brand.tsx', `/** Original decorative certification emblem and guide label. */\nexport default function Brand() { return (${jsx(doc.querySelector('.brand'))}); }\n`);
const sourceCss = postcss.parse(doc.querySelector('style').textContent);
const colors = {};
sourceCss.nodes.find(rule => rule.selector === ':root').walkDecls(decl => {
    if (!['--serif', '--sans', '--mono'].includes(decl.prop)) colors[decl.prop.slice(2)] = decl.value;
});
colors['gold-text'] = '#7A5415';
const tokens = { ...Object.fromEntries(Object.keys(colors).map(key => [key, `color-devnet-expert-${key}`])), serif: 'font-ccie-sp-serif', sans: 'font-body', mono: 'font-mono' };
const palette = '    /* DevNet Expert original light palette */\n' + Object.entries(colors).map(([key, value]) => `    --color-devnet-expert-${key}: ${value};`).join('\n') + '\n    /* End DevNet Expert palette */';
const globals = readFileSync('app/globals.css', 'utf8');
writeFileSync('app/globals.css', globals.includes('/* DevNet Expert original light palette */')
    ? globals.replace(/    \/\* DevNet Expert original light palette \*\/[\s\S]*?    \/\* End DevNet Expert palette \*\//, palette)
    : globals.replace('@theme {', '@theme {\n' + palette));
write('mermaid-theme.json', JSON.stringify({ ...extractMermaidConfig(html), sequence: { useMaxWidth: false }, pie: { useMaxWidth: false } }, null, 2) + '\n');
const css = sourceCss;
css.walkRules(rule => {
    const local = Object.fromEntries(rule.nodes.filter(d => d.type === 'decl' && d.prop.startsWith('--')).map(d => [d.prop, d.value]));
    if (rule.selector === ':root') { rule.remove(); return; }
    rule.walkDecls(decl => {
        if (decl.prop.startsWith('--')) { decl.remove(); return; }
        decl.value = decl.value.replace(/var\(--([\w-]+)\)/g, (all, key) => tokens[key] ? `var(--${tokens[key]})` : all);
        if (decl.prop === 'color' && ['.eyebrow', '.callout-head'].includes(rule.selector)) decl.value = 'var(--color-devnet-expert-gold-text)';
        if (decl.value.includes('var(--c)')) decl.value = decl.value.replace('var(--c)', 'var(--color-devnet-expert-gold)');
        if (decl.value.includes('var(--bg)')) decl.value = decl.value.replace('var(--bg)', 'var(--color-devnet-expert-surface)');
    });
    if (rule.selector.startsWith('.callout.')) {
        const color = rule.selector.endsWith('source') ? 'forest' : rule.selector.endsWith('note') ? 'plum' : 'gold';
        rule.append({ prop: 'border-left-color', value: `var(--color-devnet-expert-${color})` });
        rule.append({ prop: 'background', value: local['--bg'].replace(/var\(--([\w-]+)\)/g, (_, key) => `var(--${tokens[key]})`) });
    }
    if (rule.selector === '.sidebar' && rule.parent.type !== 'atrule') {
        rule.nodes.find(d => d.prop === 'top').value = 'calc(var(--header-h, 60px) + var(--disclaimer-height, 0px))';
        rule.nodes.find(d => d.prop === 'width').value = '280px';
    }
    if (rule.selector === '.main' && rule.parent.type !== 'atrule') rule.nodes.find(d => d.prop === 'margin-left').value = '280px';
    rule.selector = rule.selector.split(',').map(s => s === 'body' || s === 'html' ? '.devnet-expert-page' : `.devnet-expert-page ${s === 'pre.hl' ? '.hl.code-block' : s}`).join(',');
});
write('page.css', css.toString() + '\n' + readFileSync('scripts/devnet-expert-additions.css', 'utf8'));
