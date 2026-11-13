import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { JSDOM } from 'jsdom';
import postcss from 'postcss';
import { extractDiagramsDefinition } from '../.agents/skills/fix-mermaid/scripts/restore_diagrams.mjs';
import { FIDELITY_PAGES } from './archive-fidelity-config.mjs';

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
        }).join('{"\\n"}')}</div>`;
    }
    const attrs = [...node.attributes].map(a => ` ${attrNames[a.name] ?? a.name}=${quote(a.value)}`).join('');
    const extra = tag === 'th' ? ' scope="col"' : tag === 'section' ? ' tabIndex={-1}' : '';
    return voidTags.has(tag) ? `<${tag}${attrs}${extra} />` : `<${tag}${attrs}${extra}>${[...node.childNodes].map(jsx).join('')}</${tag}>`;
}
const sections = [...doc.querySelector('main').children];
sections.forEach((element, i) => write(`sections/Part${i}.tsx`, `import { Diagram } from '../Diagram';\n/** Original guide block ${i}; generated without content summarization. */\nexport default function Part${i}() { return (${jsx(element)}); }\n`));
const diagrams = extractDiagramsDefinition(html.replace('window.DIAGRAMS =', 'const DIAGRAMS =')).diagrams;
const nav = [...doc.querySelectorAll('nav a')].map(a => ({ id: a.hash.slice(1), label: a.textContent, level: a.classList.contains('l3') ? 3 : 2 }));
write('constants.ts', `export const DIAGRAMS = ${JSON.stringify(diagrams, null, 2)} as const;\nexport type DiagramId = keyof typeof DIAGRAMS;\nexport const NAV_ITEMS = ${JSON.stringify(nav, null, 2)} as const;\n`);
write('DevNetExpertGuide.tsx', `import NavBar from './NavBar';\n${sections.map((_, i) => `import Part${i} from './sections/Part${i}';`).join('\n')}\n/** Complete guide with isolated interactive navigation and native checkboxes. */\nexport default function DevNetExpertGuide() { return <div className="devnet-expert-page"><NavBar /><main className="main">${sections.map((_, i) => `<Part${i} />`).join('')}</main></div>; }\n`);
write('Brand.tsx', `/** Original decorative certification emblem and guide label. */\nexport default function Brand() { return (${jsx(doc.querySelector('.brand'))}); }\n`);
const tokens = { paper: 'color-background', ink: 'color-foreground', indigo: 'color-google-blue', gold: 'color-google-yellow', forest: 'color-google-green', plum: 'color-gcp-purple', surface: 'color-card', line: 'color-gcp-border', muted: 'color-muted-foreground', 'indigo-t': 'color-gcp-card-hover', 'gold-t': 'color-card', 'forest-t': 'color-card', 'plum-t': 'color-card', serif: 'font-display', sans: 'font-body', mono: 'font-mono' };
const css = postcss.parse(doc.querySelector('style').textContent);
css.walkRules(rule => {
    if (rule.selector === ':root') { rule.remove(); return; }
    rule.walkDecls(decl => {
        if (decl.prop.startsWith('--')) { decl.remove(); return; }
        decl.value = decl.value.replace(/var\(--([\w-]+)\)/g, (all, key) => tokens[key] ? `var(--${tokens[key]})` : all);
        if (decl.value.includes('var(--c)')) decl.value = decl.value.replace('var(--c)', 'var(--color-google-yellow)');
        if (decl.value.includes('var(--bg)')) decl.value = decl.value.replace('var(--bg)', 'var(--color-card)');
    });
    if (rule.selector.startsWith('.callout.')) {
        const color = rule.selector.endsWith('source') ? 'google-green' : rule.selector.endsWith('note') ? 'gcp-purple' : 'google-yellow';
        rule.append({ prop: 'border-left-color', value: `var(--color-${color})` });
        rule.append({ prop: 'background', value: 'var(--color-card)' });
    }
    if (rule.selector === '.sidebar' && rule.parent.type !== 'atrule') {
        rule.nodes.find(d => d.prop === 'top').value = 'calc(var(--header-h, 60px) + var(--disclaimer-height, 0px))';
        rule.nodes.find(d => d.prop === 'width').value = '280px';
    }
    if (rule.selector === '.main' && rule.parent.type !== 'atrule') rule.nodes.find(d => d.prop === 'margin-left').value = '280px';
    rule.selector = rule.selector.split(',').map(s => s === 'body' || s === 'html' ? '.devnet-expert-page' : `.devnet-expert-page ${s}`).join(',');
});
write('page.css', css.toString() + '\n' + readFileSync('scripts/devnet-expert-additions.css', 'utf8'));
