/** 固定Git原本を段階別にJSXへ変換する。bun scripts/migrate-dva-security.mjs scaffold|intro|task1|task2|remainder */
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import postcss from 'postcss';
import { FIDELITY_PAGES } from './archive-fidelity-config.mjs';
import { extractDvaDiagrams } from './dva-security-fidelity.mjs';
import { codeLines } from './inventory-extraction.mjs';
const config = FIDELITY_PAGES['aws-dva-domain2-security'];
const html = execFileSync('git', ['show', `${config.sourceCommit}:${config.source}`], { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 });
const doc = new JSDOM(html).window.document;
restoreStrayBold(doc.body);
const directory = 'app/aws/developer-associate/domain2';
mkdirSync(`${directory}/sections`, { recursive: true });
const write = (name, value) => writeFileSync(`${directory}/${name}`, value.replace(/[ \t]+$/gm, '') + '\n');
const nav = [...doc.querySelectorAll('.sidebar a')].map(el => ({ id: el.getAttribute('href').slice(1), label: el.textContent.trim() }));
const inputs = [...doc.querySelectorAll('li.chk')];

/** 原本に未変換で残った `**A**` を、同一親要素内で対になる記号ごとに strong へ戻す（`***` 等の連続記号とコードは対象外）。 */
function restoreStrayBold(root) {
    const marker = /(?<!\*)\*\*(?!\*)/;
    const walker = doc.createTreeWalker(root, 4 /* NodeFilter.SHOW_TEXT */);
    const parents = new Set();
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        const parent = node.parentElement;
        if (parent && marker.test(node.data) && !parent.closest('code, pre')) parents.add(parent);
    }
    for (const parent of parents) {
        for (const node of [...parent.childNodes]) {
            if (node.nodeType !== 3 || !marker.test(node.data)) continue;
            node.replaceWith(...node.data.split(/((?<!\*)\*\*(?!\*))/).filter(Boolean).map(part => doc.createTextNode(part)));
        }
        const markers = [...parent.childNodes].filter(node => node.nodeType === 3 && node.data === '**');
        for (let i = 0; i + 1 < markers.length; i += 2) {
            const strong = doc.createElement('strong');
            while (markers[i].nextSibling !== markers[i + 1]) strong.append(markers[i].nextSibling);
            markers[i].replaceWith(strong);
            markers[i + 1].remove();
        }
    }
}

/** タグ・属性・テキストを機械変換し、図とコードだけ既存Reactの契約へ対応付ける。 */
function jsx(node) {
    if (node.nodeType === 3) {
        const text = node.textContent.replace(/\s+/g, ' ');
        if (!text.trim() && ['TABLE', 'THEAD', 'TBODY', 'TR'].includes(node.parentElement?.tagName)) return '';
        return `{${JSON.stringify(text)}}`;
    }
    if (node.nodeType !== 1) return '';
    if (node.matches('.diagram-wrap[data-diagram]')) {
        const heading = node.closest('section')?.querySelector('h2')?.textContent.trim() ?? 'セキュリティ';
        return `<Diagram index={${node.getAttribute('data-diagram')}} label=${JSON.stringify(`${heading}の図解`)} />`;
    }
    if (node.matches('.code-block')) {
        const language = node.querySelector('code').className.replace('language-', '');
        return `<CodeBlock index={${[...doc.querySelectorAll('.code-block')].indexOf(node)}} language=${JSON.stringify(language)} lines={${JSON.stringify(codeLines(node))}} />`;
    }
    // 原本の `**A**B**C**` 誤変換で入れ子になった strong を、A・C だけ強調する兄弟へ戻す。
    if (node.tagName === 'STRONG' && [...node.children].some(child => child.tagName === 'STRONG')) {
        return [...node.childNodes].map(child => child.nodeName === 'STRONG'
            ? [...child.childNodes].map(jsx).join('')
            : `<strong>${jsx(child)}</strong>`).join('');
    }
    if (node.matches('li.chk')) return `<ChecklistItem index={${inputs.indexOf(node)}}>${[...node.querySelector('label').childNodes].filter(n => n.nodeName !== 'INPUT').map(jsx).join('')}</ChecklistItem>`;
    const tag = node.tagName.toLowerCase();
    const attrs = [...node.attributes].map(attr => {
        if (attr.name === 'style') throw new Error('Unhandled inline CSS');
        const name = ({ class: 'className', for: 'htmlFor', colspan: 'colSpan', rowspan: 'rowSpan' })[attr.name] ?? attr.name;
        return `${name}=${JSON.stringify(attr.value)}`;
    });
    if (node.matches('.table-wrap')) attrs.push('tabIndex={0}', 'role="region"', `aria-label=${JSON.stringify(`セキュリティの表 ${[...doc.querySelectorAll('.table-wrap')].indexOf(node) + 1}`)}`);
    if (tag === 'th' && !node.textContent.trim()) attrs.push('aria-hidden="true"');
    if (tag === 'th' && node.closest('thead') && !node.hasAttribute('scope')) attrs.push('scope="col"');
    if (node.matches('h2[id]')) attrs.push('tabIndex={-1}');
    const start = `<${tag}${attrs.length ? ' ' + attrs.join(' ') : ''}`;
    if (['br','hr','input','img'].includes(tag)) return start + ' />';
    const block = ['section','table','thead','tbody','tr','ul','ol','details','div'].includes(tag);
    return `${start}>${block ? '\n' : ''}${[...node.childNodes].map(jsx).join(block ? '\n' : '')}${block ? '\n' : ''}</${tag}>`;
}
const stage = process.argv[2];
if (stage === 'scaffold') {
    write('constants.ts', `/** 原本の26目次項目と35図。ナビ・監視対象の単一正本。 */\nexport const NAV_ITEMS = ${JSON.stringify(nav, null, 4)} as const;\nexport const DIAGRAMS = ${JSON.stringify(extractDvaDiagrams(html), null, 4)} as const;\nexport const CHECK_COUNT = ${inputs.length};`);
    write('page.tsx', `import type { Metadata } from 'next';\nimport { SecurityGuide } from './SecurityGuide';\nimport '@fontsource-variable/source-serif-4/index.css';\nimport './page.css';\nexport const metadata: Metadata = { title: ${JSON.stringify(doc.title)}, description: 'AWS DVA-C02 ドメイン2 セキュリティを24 Steps・35図・12問で学ぶ完全ガイド。IAM、Cognito、KMS、暗号化、機密データ管理を詳しく解説。' };\n/** セキュリティガイドのServerルート。 */\nexport default function SecurityPage() { return <SecurityGuide />; }`);
    write('SecurityGuide.tsx', `'use client';\nimport { useState } from 'react';\nimport { NavBar } from './NavBar';\nimport { ChecklistContext } from './ChecklistItem';\nimport { CHECK_COUNT } from './constants';\n/** 全本文とチェックリストの達成件数を保持する学習ガイド。 */\nexport function SecurityGuide() {\n    const [checked, setChecked] = useState<Set<number>>(() => new Set());\n    const toggle = (index: number) => setChecked(previous => {\n        const next = new Set(previous);\n        if (next.has(index)) next.delete(index); else next.add(index);\n        return next;\n    });\n    return <div className="dva-security-page"><NavBar /><ChecklistContext value={{ checked, toggle }}>\n        <main className="main">\n            ${jsx(doc.querySelector('.hero'))}\n            <div className="progress">自己採点チェックリスト達成: <b id="pcount" aria-live="polite">{checked.size} / {CHECK_COUNT}</b></div>\n        </main>\n    </ChecklistContext></div>;\n}`);
    const tokens = Object.fromEntries(["paper", "paper-alt", "ink", "ink-soft", "indigo", "indigo-soft", "gold", "forest", "plum", "border"].map(name => [`--${name}`, `dva-${name}`]));
    const css = postcss.parse(doc.querySelector('style').textContent);
    const rootTokens = [];
    css.walkRules(':root', rule => rule.walkDecls(d => { if (d.prop !== '--sidebar') rootTokens.push(`    --color-dva-${d.prop.slice(2)}: ${d.value};`); }));
    const hexes = new Set();
    css.walkRules(rule => {
        if (rule.selector === ':root') { rule.remove(); return; }
        const original = rule.selector;
        rule.selector = [...new Set(original.split(',').map(part => {
            const s = part.trim();
            return s === 'html' || s === 'body' ? '.dva-security-page' : `.dva-security-page ${s.replace(/\.code-block pre code/g, '.code-block code').replace(/\.code-block pre/g, '.code-block')}`;
        }))].join(', ');
        rule.walkDecls(d => {
            d.value = d.value.replace(/var\((--[\w-]+)\)/g, (_, key) => {
                if (key === '--sidebar') return '300px';
                if (!tokens[key]) throw new Error(`Unmapped ${key}`);
                return `var(--color-${tokens[key]})`;
            }).replace(/#[\da-f]{3,6}\b/gi, hex => { hexes.add(hex.toLowerCase()); return `var(--color-dva-${hex.slice(1).toLowerCase()})`; })
                .replace(/"Noto Sans JP",system-ui,sans-serif/g, 'var(--font-body)')
                .replace(/"Source Serif 4","Noto Sans JP",serif/g, 'var(--font-dva-serif)')
                .replace(/"JetBrains Mono",ui-monospace,Menlo,Consolas,monospace/g, 'var(--font-mono)');
            if (d.value === 'rgba(250,247,240,.95)') d.value = 'color-mix(in srgb, var(--color-dva-paper) 95%, transparent)';
            if (original === 'html' && d.prop === 'scroll-padding-top') d.value = 'calc(var(--header-h, 60px) + var(--disclaimer-height, 0px) + 16px)';
            if (original === 'body' && d.prop === 'overflow-wrap') d.value = 'anywhere';
            if (d.prop === 'font-size' && d.value.endsWith('rem')) d.value = `${Number(((d.value === '1.0625rem' ? 1 : Number.parseFloat(d.value)) * 0.875).toFixed(8))}rem`;
            if (original === '.sidebar' && d.prop === 'inset') { d.prop = 'top'; d.value = 'calc(var(--header-h, 60px) + var(--disclaimer-height, 0px))'; }
            if (['.progress','.mobile-bar'].includes(original) && d.prop === 'top') d.value = original === '.progress' && rule.parent.type === 'atrule' ? 'calc(var(--header-h, 60px) + var(--disclaimer-height, 0px) + 52px)' : 'calc(var(--header-h, 60px) + var(--disclaimer-height, 0px))';
            if (original === '.sidebar' && d.prop === 'width') d.value = rule.parent.type === 'atrule' ? 'min(86vw,320px)' : '300px';
            if (original === '.mobile-bar' && d.prop === 'z-index') d.value = '31';
        });
        if (original === '.sidebar' && rule.parent.type !== 'atrule') { rule.append({ prop: 'left', value: '0' }); rule.append({ prop: 'bottom', value: '0' }); }
        if (original === '.main') {
            rule.append({ prop: 'width', value: rule.parent.type === 'atrule' ? '100%' : 'calc(100% - 300px)' });
            rule.append({ prop: 'min-width', value: '0' });
        }
    });
    // 既存トークンを使い、固定装飾色はグローバルの第3層へ一元化する。
    let globalCss = readFileSync('app/globals.css', 'utf8');
    if (!globalCss.includes('--color-dva-2b2f7a:')) globalCss = globalCss.replace('@theme {', '@theme {\n    /* Layer 3: DVA Security 原本ライトテーマ・固定装飾色 */\n' + rootTokens.join('\n') + '\n' + [...hexes].map(hex => `    --color-dva-${hex.slice(1)}: ${hex};`).join('\n') + '\n');
    writeFileSync('app/globals.css', globalCss);
    write('page.css', css.toString() + `\n.dva-security-page .main ul { list-style-type: disc; list-style-position: outside; }\n.dva-security-page .main ol { list-style-type: decimal; list-style-position: outside; }\n.dva-security-page .main ul ul { list-style-type: circle; }\n.dva-security-page li.chk { list-style-type: none; }\n.dva-security-page .sidebar ul { list-style-type: none; margin: 0; padding: 0; }\n.dva-security-page .sidebar li { margin: 0; }\n.dva-security-page .code-line { white-space: pre; min-height: 1.65em; }\n.dva-security-page .code-block { margin: 14px 0; padding: 16px 18px; border: 0; font-family: var(--font-mono); background: var(--color-dva-1f2335); color: var(--color-dva-e6e8f5); line-height: 1.65; overflow-x: auto; }\n.dva-security-page .code-block code { white-space: pre; }\n.dva-security-page h2[id] { scroll-margin-top: calc(var(--header-h, 60px) + var(--disclaimer-height, 0px) + 48px); }\n.dva-security-page .sidebar-backdrop { position: fixed; inset: calc(var(--header-h, 60px) + var(--disclaimer-height, 0px)) 0 0; z-index: 29; background: rgba(0,0,0,.35); border: 0; }\n.dva-security-page :focus-visible { outline: 2px solid var(--color-dva-indigo); outline-offset: 4px; }\n@media (min-width:901px) { .dva-security-page .sidebar-backdrop { display: none; } }\n@media (max-width:900px) { .dva-security-page .sidebar:not(.open) { visibility: hidden; } }\n.dva-security-page .hljs-comment { color: var(--color-dva-94a3b8); font-style: italic; }\n.dva-security-page .hljs-keyword { color: var(--color-dva-c678dd); }\n.dva-security-page .hljs-string { color: var(--color-dva-98c379); }\n.dva-security-page .hljs-attr { color: var(--color-dva-e06c75); }\n.dva-security-page .hljs-number, .dva-security-page .hljs-literal { color: var(--color-dva-d19a66); }\n`);
    writeFileSync(`${directory}/page.css`, readFileSync(`${directory}/page.css`, 'utf8') + '\n.dva-security-page .diagram-wrap > [role="img"] { overflow: visible; border: 0; background: transparent; padding: 0; margin: 0; }\n');
    writeFileSync(`${directory}/page.css`, readFileSync(`${directory}/page.css`, 'utf8') + '\n.dva-security-page .diagram-wrap .mermaid-target :is(foreignObject > div, .nodeLabel, .edgeLabel, text, tspan) { font-size: 14px !important; }\n');
    console.log(`Scaffold: ${nav.length} anchors, ${inputs.length} checkboxes`);
} else {
    const ranges = { intro: [0, 1], task1: [2, 9], task2: [10, 16], remainder: [17, 23] };
    if (!ranges[stage]) throw new Error('Unknown migration stage');
    let current = -1;
    const names = [];
    for (const section of doc.querySelectorAll('main > section')) {
        const heading = section.querySelector('h2[id]');
        const step = heading?.id.match(/^step-(\d+)$/);
        if (step) current = Number(step[1]);
        else if (section.querySelector('h1.part')) {
            current = /Task 1/.test(section.textContent) ? 2 : /Task 2/.test(section.textContent) ? 10 : 17;
        } else if (heading?.id.startsWith('appendix')) current = 23;
        if (current < ranges[stage][0] || current > ranges[stage][1]) continue;
        const name = heading ? heading.id.replace(/(^|-)([a-z0-9])/g, (_, sep, char) => char.toUpperCase()) : `Task${current === 2 ? 1 : current === 10 ? 2 : 3}Heading`;
        names.push(name);
        const text = jsx(section);
        const imports = [text.includes('<Diagram ') ? "import { Diagram } from '../Diagram';" : '', text.includes('<CodeBlock ') ? "import { CodeBlock } from '../CodeBlock';" : '', text.includes('<ChecklistItem ') ? "import { ChecklistItem } from '../ChecklistItem';" : ''].filter(Boolean).join('\n');
        write(`sections/${name}.tsx`, `${imports}\n/** 原本の${heading?.textContent.trim() ?? section.textContent.trim()}を省略せず収録。 */\nexport function ${name}() { return (${text}); }`);
    }
    let guide = readFileSync(`${directory}/SecurityGuide.tsx`, 'utf8');
    if (guide.includes('const GuideContents')) throw new Error('Start a complete regeneration with scaffold');
    for (const name of names) {
        guide = guide.replace(`import { ${name} } from './sections/${name}';\n`, '').replace(`            <${name} />\n`, '');
    }
    guide = guide.replace('/** 全本文', names.map(name => `import { ${name} } from './sections/${name}';`).join('\n') + '\n/** 全本文');
    guide = guide.replace('        </main>', names.map(name => `            <${name} />`).join('\n') + '\n        </main>');
    if (stage === 'remainder') {
        guide = guide.replace("import { useState } from 'react';", "import { memo, useState } from 'react';");
        const start = guide.indexOf('            <Step0 />');
        const end = guide.indexOf('        </main>', start);
        const body = guide.slice(start, end);
        guide = guide.slice(0, start) + '            <GuideContents />\n' + guide.slice(end);
        guide = guide.replace('/** 全本文', '/** チェック状態に依存しない静的本文。 */\nconst GuideContents = memo(function GuideContents() { return <>\n' + body + '</>; });\n/** 全本文');
    }
    write('SecurityGuide.tsx', guide);
    console.log(`Migrated ${stage}: ${names.join(', ')}`);
}
