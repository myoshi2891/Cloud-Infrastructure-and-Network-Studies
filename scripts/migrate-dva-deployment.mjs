/** 固定Git原本をscaffold → intro → task1..4 → remainderの順に全量変換する。 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import postcss from 'postcss';
import { FIDELITY_PAGES } from './archive-fidelity-config.mjs';
import { extractDevelopmentDiagrams } from './dva-development-fidelity.mjs';
import { deploymentSegments, extractDeploymentTheme } from './dva-deployment-fidelity.mjs';
import { codeLines } from './inventory-extraction.mjs';

const config = FIDELITY_PAGES['aws-dva-domain3-deployment'];
const html = execFileSync('git', ['show', `${config.sourceCommit}:${config.source}`], { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 });
const doc = new JSDOM(html).window.document;
const directory = 'app/aws/developer-associate/domain3';
const stage = process.argv[2];
const ranges = { intro: [1, 2], task1: [3, 8], task2: [9, 14], task3: [15, 20], task4: [21, 30], remainder: [31, 33] };
if (stage !== 'scaffold' && !ranges[stage]) throw new Error('Unknown migration stage');
mkdirSync(`${directory}/sections`, { recursive: true });
const write = (name, value) => writeFileSync(`${directory}/${name}`, value.replace(/[ \t]+$/gm, '').trimEnd() + '\n');
const segments = deploymentSegments(doc);
const tables = [...doc.querySelectorAll('.table-wrap')];
const codes = [...doc.querySelectorAll('pre')];
const inputs = [...doc.querySelectorAll('li.chk input')];
const nav = [...doc.querySelectorAll('.sidebar a')].map(el => ({ id: el.getAttribute('href').slice(1), label: el.textContent.trim(), className: el.className }));
const headingOf = element => segments.find(segment => segment.nodes.some(node => node === element || node.contains(element)))?.nodes[0]?.textContent.trim() ?? 'デプロイ';

/** HTML要素を文字列の要約なしでJSXへ変換する。 */
function jsx(node, checklist = false) {
    if (node.nodeType === 3) {
        const text = node.textContent.replace(/\s+/g, ' ');
        if (!text.trim() && ['TABLE','THEAD','TBODY','TR'].includes(node.parentElement?.tagName)) return '';
        return `{${JSON.stringify(text)}}`;
    }
    if (node.nodeType !== 1) return '';
    if (node.matches('.diagram-wrap')) {
        const id = node.querySelector('.diagram-canvas').getAttribute('data-id');
        return `<Diagram id=${JSON.stringify(id)} label=${JSON.stringify(`${headingOf(node)}の図解 ${id}`)} />`;
    }
    if (node.tagName === 'PRE') return `<CodeBlock index={${codes.indexOf(node)}} language=${JSON.stringify(node.querySelector('code').className.replace('language-', ''))} lines={${JSON.stringify(codeLines(node))}} />`;
    if (node.matches('.checklist') && !checklist) return '<Checklist />';
    const tag = node.tagName.toLowerCase();
    const attrs = [...node.attributes].map(attr => {
        if (attr.name === 'style') throw new Error('Unhandled inline CSS');
        if (attr.name === 'hidden' && node.matches('.cl-done')) return 'hidden={checked.size !== CHECK_COUNT}';
        if (attr.name === 'class' && node.matches('li.chk')) return `className={checked.has(${inputs.indexOf(node.querySelector('input'))}) ? 'chk done' : 'chk'}`;
        const name = ({ class: 'className', for: 'htmlFor', colspan: 'colSpan', rowspan: 'rowSpan' })[attr.name] ?? attr.name;
        return `${name}=${JSON.stringify(attr.value)}`;
    });
    if (node.matches('.table-wrap')) attrs.push('tabIndex={0}', 'role="region"', `aria-label="デプロイの表 ${tables.indexOf(node) + 1}"`);
    if (tag === 'th' && node.closest('thead')) attrs.push('scope="col"');
    if (tag === 'th' && !node.textContent.trim()) attrs.push('aria-hidden="true"');
    if (node.matches('h1[id],h2[id]')) attrs.push('tabIndex={-1}');
    if (node.matches('.cl-fill')) attrs.push('style={{ width: `${checked.size / CHECK_COUNT * 100}%` }}');
    if (node.matches('.cl-count')) attrs.push('aria-live="polite"');
    if (node.matches('input[type="checkbox"]')) attrs.push(`checked={checked.has(${inputs.indexOf(node)})}`, `onChange={() => toggle(${inputs.indexOf(node)})}`);
    const start = `<${tag}${attrs.length ? ' ' + attrs.join(' ') : ''}`;
    if (['br','hr','input','img'].includes(tag)) return start + ' />';
    if (node.matches('.cl-count b')) return `${start}>{checked.size}</${tag}>`;
    const block = ['section','table','thead','tbody','tr','ul','ol','details','div'].includes(tag);
    return `${start}>${block ? '\n' : ''}${[...node.childNodes].map(child => jsx(child, checklist)).join(block ? '\n' : '')}${block ? '\n' : ''}</${tag}>`;
}

if (stage === 'scaffold') {
    write('constants.ts', `/** 全33目次と39図の単一正本。 */\nexport const NAV_ITEMS = ${JSON.stringify(nav, null, 4)} as const;\nexport const DIAGRAMS = ${JSON.stringify(extractDevelopmentDiagrams(html), null, 4)} as const;\nexport type DiagramId = keyof typeof DIAGRAMS;\nexport const CHECK_COUNT = ${inputs.length};`);
    write('mermaid-theme.json', JSON.stringify(extractDeploymentTheme(html), null, 2));
    write('page.tsx', `import type { Metadata } from 'next';\nimport { DeploymentGuide } from './DeploymentGuide';\nimport '@fontsource-variable/source-serif-4/index.css';\nimport './page.css';\nexport const metadata: Metadata = { title: ${JSON.stringify(doc.title)}, description: 'AWS DVA-C02 ドメイン3のデプロイを26 Steps・39図で学ぶガイド。アーティファクト準備、テスト、IaC、CI/CD、デプロイ戦略とロールバックを解説。' };\n/** デプロイガイドのServerルート。 */\nexport default function DeploymentPage() { return <DeploymentGuide />; }`);
    write('Diagram.tsx', `'use client';\nimport { memo } from 'react';\nimport { MermaidDiagram } from '@/components/MermaidDiagram';\nimport { DIAGRAMS, type DiagramId } from './constants';\nimport sourceTheme from './mermaid-theme.json';\nconst SOURCE_THEME_FRONTMATTER = \`---\\nconfig: \${JSON.stringify({ ...sourceTheme, themeVariables: { ...sourceTheme.themeVariables, fontFamily: '\\"Noto Sans JP Variable\\",\\"Noto Sans JP\\",sans-serif', fontSize: '14px' } })}\\n---\\n\`;\n/** 原本のDSL・淡色ノード・自然倍率を保持する図。 */\nexport const Diagram = memo(function Diagram({ id, label }: { id: DiagramId; label: string }) {\n    const chart = DIAGRAMS[id];\n    if (!chart) return null;\n    return <div className="diagram-wrap" data-diagram-id={id} tabIndex={0} role="region" aria-label={label}>\n        <MermaidDiagram chart={SOURCE_THEME_FRONTMATTER + chart} theme="light" preserveChartTheme={true} ariaLabel={label} preserveNaturalScale={true} />\n    </div>;\n});`);
    const referenceNav = readFileSync('app/aws/developer-associate/domain2/NavBar.tsx', 'utf8');
    write('NavBar.tsx', referenceNav.replaceAll('menuBtn', 'mb').replaceAll('dvaSidebar', 'sb').replace('DVA-C02 Security', 'Domain 3: Deployment').replace('AWS DVA-C02<br />ドメイン2 セキュリティ', 'DVA-C02<br />Domain 3: Deployment').replace('`nav-a${activeId === item.id', '`\${item.className}${activeId === item.id').replace('            <div className="nav-group">Task 1</div><div className="nav-group">Task 2</div><div className="nav-group">Task 3</div>\n', ''));
    write('Checklist.tsx', `'use client';\nimport { useState } from 'react';\nimport { CHECK_COUNT } from './constants';\n/** 9項目のチェック状態・件数・進捗・全完了表示を同期する。 */\nexport function Checklist() {\n    const [checked, setChecked] = useState<Set<number>>(() => new Set());\n    const toggle = (index: number) => setChecked(previous => {\n        const next = new Set(previous);\n        if (next.has(index)) next.delete(index); else next.add(index);\n        return next;\n    });\n    return (${jsx(doc.querySelector('.checklist'), true)});\n}`);

    const css = postcss.parse(doc.querySelector('style').textContent);
    const globalTokens = {};
    postcss.parse(readFileSync('app/globals.css', 'utf8')).walkDecls(decl => { if (decl.prop.startsWith('--')) globalTokens[decl.prop] = decl.value; });
    const mapping = {};
    const additions = {};
    const tokenFor = value => {
        const existing = Object.entries(globalTokens).find(([key, val]) => key.startsWith('--color-') && val.toLowerCase() === value.toLowerCase());
        if (existing) return existing[0];
        const key = `--color-dva-deployment-${value.slice(1).toLowerCase()}`;
        additions[key] = value;
        return key;
    };
    css.walkRules(':root', rule => rule.walkDecls(decl => { if (decl.prop !== '--sb') mapping[decl.prop] = tokenFor(decl.value); }));
    css.walkRules(rule => {
        if (rule.selector === ':root') { rule.remove(); return; }
        const original = rule.selector;
        rule.selector = [...new Set(original.split(',').map(part => {
            const s = part.trim();
            return s === 'html' || s === 'body' ? '.dva-deployment-page' : `.dva-deployment-page ${s.replace(/\bpre code\b/g, '.code-block code').replace(/\bpre\b/g, '.code-block')}`;
        }))].join(', ');
        rule.walkDecls(decl => {
            decl.value = decl.value.replace(/var\((--[\w-]+)\)/g, (_, key) => {
                if (key === '--sb') return '290px';
                if (!mapping[key]) throw new Error(`Unmapped ${key}`);
                return `var(${mapping[key]})`;
            });
            if (!original.includes('.hljs')) decl.value = decl.value.replace(/#[\da-f]{3,6}\b/gi, hex => `var(${tokenFor(hex)})`);
            if (decl.prop === 'font-family') {
                if (decl.value.includes('Source Serif 4')) decl.value = 'var(--font-dva-serif)';
                else if (decl.value.includes('Noto Sans JP')) decl.value = 'var(--font-body)';
                else if (decl.value.includes('monospace')) decl.value = 'var(--font-mono)';
            }
            if (decl.prop === 'font-size' && decl.value.endsWith('rem')) decl.value = `${Number((parseFloat(decl.value) * 0.875).toFixed(8))}rem`;
            if (original === 'html' && decl.prop === 'scroll-padding-top') decl.value = 'calc(var(--header-h, 60px) + var(--disclaimer-height, 0px) + 16px)';
            if (['.sidebar','.mobile-bar'].includes(original) && decl.prop === 'top') decl.value = 'calc(var(--header-h, 60px) + var(--disclaimer-height, 0px))';
            if (original === '.sidebar' && decl.prop === 'z-index') decl.value = '32';
            if (original === '.mobile-bar' && decl.prop === 'z-index') decl.value = '31';
        });
        if (original === 'main') {
            rule.append({ prop: 'width', value: rule.parent.type === 'atrule' ? '100%' : 'calc(100% - 290px)' });
            rule.append({ prop: 'max-width', value: 'none' });
            rule.append({ prop: 'min-width', value: '0' });
        }
    });
    if (Object.keys(additions).length) {
        const globalCss = readFileSync('app/globals.css', 'utf8');
        writeFileSync('app/globals.css', globalCss.replace('@theme {', '@theme {\n    /* Layer 3: DVA Deployment 原本ライト配色 */\n' + Object.entries(additions).map(([key, value]) => `    ${key}: ${value};`).join('\n') + '\n'));
    }
    write('page.css', css.toString() + `
/* Tailwind Preflightで消える原本のブラウザ既定装飾を明示する。 */
.dva-deployment-page .content ul { list-style-type: disc; list-style-position: outside; margin: 1em 0; padding-left: 40px; }
.dva-deployment-page .content ol { list-style-type: decimal; list-style-position: outside; margin: 1em 0; padding-left: 40px; }
.dva-deployment-page .content ul ul { list-style-type: circle; }
.dva-deployment-page .content li.chk { list-style-type: none; }
.dva-deployment-page .checklist ul { margin: 0; padding: 0; }
.dva-deployment-page .sidebar ul { list-style-type: none; margin: 0; padding: 0; }
.dva-deployment-page .sidebar li { margin: 0; }
.dva-deployment-page .content p { margin: 1em 0; }
.dva-deployment-page .content blockquote p { margin: .4em 0; }
.dva-deployment-page h1, .dva-deployment-page h2, .dva-deployment-page h3, .dva-deployment-page h4, .dva-deployment-page strong { font-weight: 700; }
.dva-deployment-page table { font-size: 0.875rem; }
.dva-deployment-page .code-line { white-space: pre; min-height: 1.6em; }
.dva-deployment-page .code-block code { display: block; white-space: pre; }
.dva-deployment-page .code-block { margin: 1em 0; }
.dva-deployment-page .diagram-wrap > [role="img"] { border: 0; background: transparent; padding: 0; margin: 0; min-width: 0; overflow: visible; }
/* preserveNaturalScaleを維持し、広い図だけカード内でスクロールする。 */
.dva-deployment-page .diagram-wrap svg { flex-shrink: 0; max-width: none; height: auto; }
.dva-deployment-page .diagram-wrap .mermaid-target :is(foreignObject > div, .nodeLabel, .edgeLabel, text, tspan) { font-size: 14px !important; }
.dva-deployment-page .content [id] { scroll-margin-top: calc(var(--header-h, 60px) + var(--disclaimer-height, 0px) + 64px); }
.dva-deployment-page .sidebar-backdrop { position: fixed; inset: calc(var(--header-h, 60px) + var(--disclaimer-height, 0px)) 0 0; z-index: 31; background: rgba(0,0,0,.35); border: 0; }
.dva-deployment-page :focus-visible { outline: 2px solid var(${mapping['--indigo']}); outline-offset: 4px; }
.dva-deployment-page [hidden] { display: none !important; }
@media (min-width:901px) { .dva-deployment-page .sidebar-backdrop { display: none; } }
@media (max-width:900px) { .dva-deployment-page .sidebar:not(.open) { visibility: hidden; } .dva-deployment-page .sidebar { width: min(290px, 90vw); } }
@media (prefers-reduced-motion:reduce) { .dva-deployment-page .sidebar, .dva-deployment-page .cl-fill, .dva-deployment-page a.ref { transition: none; } }
`);
} else {
    const [start, end] = ranges[stage];
    for (const segment of segments.filter(segment => { const index = Number(segment.id.slice(1)); return index >= start && index <= end; })) {
        const name = `S${segment.id.slice(1)}`;
        const body = segment.nodes.map(node => jsx(node)).join('\n');
        const imports = [body.includes('<Diagram ') ? "import { Diagram } from '../Diagram';" : '', body.includes('<CodeBlock ') ? "import { CodeBlock } from '../CodeBlock';" : '', body.includes('<Checklist ') ? "import { Checklist } from '../Checklist';" : ''].filter(Boolean).join('\n');
        write(`sections/${name}.tsx`, `${imports}\n/** 原本の${segment.id}を全文・順序どおり収録。 */\nexport function ${name}() { return <>\n${body}\n</>; }`);
    }
}
const names = segments.map(segment => `S${segment.id.slice(1)}`).filter(name => existsSync(`${directory}/sections/${name}.tsx`));
write('DeploymentGuide.tsx', `'use client';\nimport { memo } from 'react';\nimport { NavBar } from './NavBar';\n${names.map(name => `import { ${name} } from './sections/${name}';`).join('\n')}\n/** チェック・現在地の更新から独立した静的本文。 */\nconst GuideContents = memo(function GuideContents() { return <>\n${names.map(name => `    <${name} />`).join('\n')}\n</>; });\n/** 原本のhero・33節・footerを保持するデプロイ教材。 */\nexport function DeploymentGuide() { return <div className="dva-deployment-page"><NavBar /><main>\n${jsx(doc.querySelector('.hero'))}\n<div className="content"><GuideContents /></div>\n${jsx(doc.querySelector('.footer'))}\n</main></div>; }`);
console.log(`${stage}: ${names.length}/33 heading ranges migrated`);
