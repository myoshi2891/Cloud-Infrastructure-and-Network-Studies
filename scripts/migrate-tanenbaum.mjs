/** 原本をGitから読み、全本文をJSXとページCSSへ機械的に移す再現可能な変換。 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import postcss from 'postcss';
import { FIDELITY_PAGES } from './archive-fidelity-config.mjs';
import { snapshotTanenbaumDiagrams } from './tanenbaum-fidelity.mjs';

const config = FIDELITY_PAGES['computer-networks-tanenbaum'];
const html = execFileSync('git', ['show', `${config.sourceCommit}:${config.source}`], { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 });
const doc = new JSDOM(html).window.document;
const directory = 'app/recommended-books/computer-networks-tanenbaum';
mkdirSync(directory, { recursive: true });
const write = (name, content) => writeFileSync(`${directory}/${name}`, content.replace(/[ \t]+$/gm, ''));
const navItems = [...doc.querySelectorAll('#sidebarNav a')].map(el => ({
    id: el.getAttribute('href').slice(1), label: el.textContent.replace(/\s+/g, ' ').trim(),
    level: el.classList.contains('lvl3') ? 3 : 2,
}));
const diagrams = snapshotTanenbaumDiagrams(doc);
write('constants.ts', `/** 原本の目次と全21図。目次リンクとscroll spyの単一正本。 */\nexport const NAV_ITEMS = ${JSON.stringify(navItems, null, 4)} as const;\n\nexport const DIAGRAMS = {\n${diagrams.map((chart, i) => `    'diag-${i + 1}': \`${chart.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')}\`,`).join('\n')}\n} as const;\nexport type DiagramId = keyof typeof DIAGRAMS;\n`);

let diagramIndex = 0;
/** DOMのテキストをJSX式にして引用符・山括弧・日本語を欠落なく保持する。 */
function jsx(node, depth = 0) {
    if (node.nodeType === 3) {
        const value = node.textContent.replace(/\s+/g, ' ');
        if (!value.trim() && ['TABLE', 'THEAD', 'TBODY', 'TR'].includes(node.parentElement?.tagName)) return '';
        return `{${JSON.stringify(value)}}`;
    }
    if (node.nodeType !== 1) return '';
    if (node.matches('pre.mermaid')) {
        const index = diagramIndex++;
        let previous = node.previousElementSibling;
        while (previous && !previous.matches('h2, h3')) previous = previous.previousElementSibling;
        return `<Diagram id="diag-${index + 1}" label=${JSON.stringify(`${previous?.textContent.replace(/\s+/g, ' ').trim() ?? 'ネットワークの仕組み'}の図解`)} />`;
    }
    const indent = '    '.repeat(depth);
    const tag = node.tagName.toLowerCase();
    const attrs = [...node.attributes].map(a => `${a.name === 'class' ? 'className' : a.name === 'for' ? 'htmlFor' : a.name}=${JSON.stringify(a.value)}`);
    if (tag === 'th') attrs.push('scope="col"');
    if (/^h[23]$/.test(tag) && node.id) attrs.push('tabIndex={-1}');
    if (tag === 'input') attrs.push('checked={checked.has(' + JSON.stringify(node.id) + ')}', 'onChange={() => toggleCheck(' + JSON.stringify(node.id) + ')}');
    const start = `<${tag}${attrs.length ? ' ' + attrs.join(' ') : ''}`;
    if (['input', 'hr', 'br', 'img'].includes(tag)) return `${start} />`;
    if (node.matches('.checklist-header .count')) return `${start} aria-live="polite">{checked.size} / 10 完了</${tag}>`;
    const children = [...node.childNodes];
    const inlineTags = new Set(['p', 'li', 'h1', 'h2', 'h3', 'strong', 'em', 'label', 'code', 'a', 'span', 'td', 'th']);
    if (inlineTags.has(tag) || children.every(c => c.nodeType !== 1)) {
        return `${start}>${children.map(c => jsx(c, depth)).join('')}${['td', 'th'].includes(tag) ? '{" "}' : ''}</${tag}>`;
    }
    return `${start}>\n${children.map(c => jsx(c, depth + 1)).filter(Boolean).map(c => '    ' + indent + c).join('\n')}\n${indent}</${tag}>`;
}
const main = jsx(doc.querySelector('main'), 3);
write('ComputerNetworksTanenbaumGuide.tsx', `'use client';\n\nimport { memo, useState } from 'react';\nimport { MermaidDiagram } from '@/components/MermaidDiagram';\nimport { DIAGRAMS, type DiagramId } from './constants';\nimport { NavBar } from './NavBar';\n\n/** 図をmemo化してscroll spyやチェック操作による再描画を防ぐ。 */\nconst Diagram = memo(function Diagram({ id, label }: { id: DiagramId; label: string }) {\n    const chart = DIAGRAMS[id];\n    if (!chart) return null;\n    return <div className="mermaid-wrap"><MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale /></div>;\n});\n\n/** 下位層から積み上げるネットワーク学習ガイドの全本文。 */\nexport function ComputerNetworksTanenbaumGuide() {\n    const [checked, setChecked] = useState<Set<string>>(() => new Set());\n    const toggleCheck = (id: string) => setChecked(previous => {\n        const next = new Set(previous);\n        if (next.has(id)) next.delete(id); else next.add(id);\n        return next;\n    });\n    return (\n        <div className="tanenbaum-page">\n            <div className="layout">\n                <NavBar />\n                ${main}\n            </div>\n        </div>\n    );\n}\n`);
write('page.tsx', `import type { Metadata } from 'next';\nimport { ComputerNetworksTanenbaumGuide } from './ComputerNetworksTanenbaumGuide';\nimport './page.css';\n\nexport const metadata: Metadata = {\n    title: ${JSON.stringify(doc.title)},\n    description: 'Tanenbaum & Wetherall著 Computer Networks の学習順序に着想を得た入門ガイド。物理層からアプリケーション層、セキュリティまで全10ステップ・21図解で体系的に学びます。',\n};\n\n/** コンピュータネットワーク入門ガイドのServerルート。 */\nexport default function ComputerNetworksTanenbaumPage() {\n    return <ComputerNetworksTanenbaumGuide />;\n}\n`);

const tokens = {
    '--bg': 'background', '--bg-card': 'surface-1', '--bg-card-2': 'surface-2',
    '--border': 'border', '--border-soft': 'border-soft', '--text': 'foreground',
    '--text-dim': 'foreground-dim', '--text-faint': 'foreground-faint',
    '--accent': 'accent', '--accent-soft': 'accent-soft', '--accent-bg': 'accent-bg',
    '--danger': 'danger', '--danger-bg': 'danger-bg', '--warn': 'warn', '--warn-bg': 'warn-bg',
    '--success': 'success', '--success-bg': 'success-bg',
};
const hexTokens = { '#060d17': 'sidebar-bg', '#dbe4f3': 'foreground', '#7c9eff': 'accent', '#f0f4fc': 'strong', '#ffd08a': 'code-text', '#1d5a3a': 'success-border', '#08150e': 'success-icon-fg', '#08101f': 'checkmark' };
const css = postcss.parse(doc.querySelector('style').textContent);
css.walkRules(rule => {
    if (rule.selector === ':root') { rule.remove(); return; }
    const original = rule.selector;
    rule.selector = [...new Set(original.split(',').map(part => {
        const selector = part.trim();
        if (selector === 'html' || selector === 'body') return '.tanenbaum-page';
        return `.tanenbaum-page ${selector.replace(/pre\.mermaid/g, '.mermaid-wrap')}`;
    }))].join(', ');
    rule.walkDecls(d => {
        d.value = d.value.replace(/var\((--[\w-]+)\)/g, (full, name) => {
            if (name === '--font-jp') return 'var(--font-body)';
            if (name === '--sidebar-w') return '280px';
            if (!tokens[name]) throw new Error(`Missing token: ${name}`);
            return `var(--color-pca-s4-${tokens[name]})`;
        }).replace(/#[\da-f]{6}/gi, hex => hexTokens[hex] ? `var(--color-pca-s4-${hexTokens[hex]})` : hex);
        if (d.prop === 'word-break' && d.value === 'break-word') { d.remove(); return; }
        if (d.prop === 'overflow-wrap' && d.value === 'break-word') d.value = 'anywhere';
        if (d.prop === 'scroll-margin-top') d.value = 'calc(var(--header-h, 60px) + var(--disclaimer-height, 0px) + 24px)';
        if (original === '.sidebar' && d.prop === 'top') d.value = 'calc(var(--header-h, 60px) + var(--disclaimer-height, 0px))';
        if (original === '.sidebar' && d.prop === 'z-index') d.value = '40';
        if (original === '.sidebar-toggle' && d.prop === 'top') d.value = 'calc(var(--header-h, 60px) + var(--disclaimer-height, 0px) + 14px)';
        if (original === '.sidebar-toggle' && d.prop === 'z-index') d.value = '40';
    });
    if (original === '.main') {
        rule.append({ prop: 'width', value: rule.parent.type === 'atrule' ? '100%' : 'calc(100% - 280px)' });
        rule.append({ prop: 'max-width', value: 'none' });
        rule.append({ prop: 'box-sizing', value: 'border-box' });
    }
    if (original === 'body') rule.append({ prop: 'min-height', value: '100vh' });
    if (original === '.checklist-card ul') rule.append({ prop: 'list-style-type', value: 'none' });
});
write('page.css', css.toString() + `\n\n.tanenbaum-page .main ul { list-style-type: disc; list-style-position: outside; }\n.tanenbaum-page .main ol { list-style-type: decimal; list-style-position: outside; }\n.tanenbaum-page .sidebar nav ul { list-style-type: none; margin: 0; padding: 0; }\n.tanenbaum-page .sidebar nav li { margin: 0; padding: 0; }\n.tanenbaum-page .sidebar-backdrop { position: fixed; inset: calc(var(--header-h, 60px) + var(--disclaimer-height, 0px)) 0 0; z-index: 39; background: rgba(0, 0, 0, 0.5); border: 0; }\n@media (min-width: 981px) { .tanenbaum-page .sidebar-backdrop { display: none; } }\n@media (max-width: 980px) { .tanenbaum-page .sidebar:not(.open) { visibility: hidden; } }\n.tanenbaum-page .mermaid-wrap .mermaid-container { width: 100%; }\n.tanenbaum-page :focus-visible { outline: 2px solid var(--color-pca-s4-accent); outline-offset: 4px; }\n`);
console.log(`Converted ${diagramIndex} diagrams and ${navItems.length} navigation anchors`);
