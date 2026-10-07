/** 固定Git原本を段階別に移行する。scaffold|intro|task1|task2|task3|remainder */
import {execFileSync} from 'node:child_process';
import {mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {JSDOM} from 'jsdom';
import postcss from 'postcss';
import {FIDELITY_PAGES} from './archive-fidelity-config.mjs';
import {extractDevelopmentDiagrams} from './dva-development-fidelity.mjs';
import {codeLines} from './inventory-extraction.mjs';
const config=FIDELITY_PAGES['aws-dva-domain1-development'];
const html=execFileSync('git',['show',`${config.sourceCommit}:${config.source}`],{encoding:'utf8',maxBuffer:8*1024*1024});
const doc=new JSDOM(html).window.document;
const dir='app/aws/developer-associate/domain1';
mkdirSync(`${dir}/sections`,{recursive:true});
const write=(name,value)=>writeFileSync(`${dir}/${name}`,value.replace(/[ \t]+$/gm,'')+'\n');
const nav=[...doc.querySelectorAll('.nav-list a')].map(el=>({id:el.getAttribute('href').slice(1),label:el.textContent.trim(),group:el.parentElement.className}));
function jsx(node) {
    if(node.nodeType===3) {
        const value=node.textContent.replace(/\s+/g,' ');
        if(!value.trim()&&['TABLE','THEAD','TBODY','TR'].includes(node.parentElement?.tagName)) return '';
        return `{${JSON.stringify(value)}}`;
    }
    if(node.nodeType!==1) return '';
    if(node.matches('.diagram-wrap')) {
        const id=node.querySelector('[data-diagram-id]').getAttribute('data-diagram-id');
        return `<Diagram id=${JSON.stringify(id)} label=${JSON.stringify(`${node.closest('section').querySelector('h2').textContent.trim()}の図解 ${id}`)} />`;
    }
    if(node.matches('.code-block')) return `<CodeBlock index={${[...doc.querySelectorAll('.code-block')].indexOf(node)}} language=${JSON.stringify(node.querySelector('.cb-head').textContent)} lines={${JSON.stringify(codeLines(node))}} />`;
    const tag=node.tagName.toLowerCase();
    const attrs=[...node.attributes].map(attr=>{
        if(attr.name==='style') throw new Error('Unhandled inline CSS');
        return `${({class:'className',for:'htmlFor',colspan:'colSpan',rowspan:'rowSpan'})[attr.name]??attr.name}=${JSON.stringify(attr.value)}`;
    });
    if(node.matches('section[id]')) attrs.push('tabIndex={-1}');
    if(node.matches('i.ti')) attrs.push('aria-hidden="true"');
    if(node.matches('.table-wrap')) attrs.push('role="region"','tabIndex={0}',`aria-label="開発ガイドの表 ${[...doc.querySelectorAll('.table-wrap')].indexOf(node)+1}"`);
    if(tag==='th'&&node.closest('thead')) attrs.push('scope="col"');
    const start=`<${tag}${attrs.length?' '+attrs.join(' '):''}`;
    if(['br','hr','img','input'].includes(tag)) return start+' />';
    const block=['section','table','thead','tbody','tr','div','ul','ol','details'].includes(tag);
    return `${start}>${block?'\n':''}${[...node.childNodes].map(jsx).join(block?'\n':'')}${block?'\n':''}</${tag}>`;
}
const stage=process.argv[2];
if(stage==='scaffold') {
    write('constants.ts',`/** 原本の38目次と31図を単一の正本として保持する。 */\nexport const NAV_ITEMS=${JSON.stringify(nav,null,4)} as const;\nexport const DIAGRAMS=${JSON.stringify(extractDevelopmentDiagrams(html),null,4)} as const;\nexport type DiagramId=keyof typeof DIAGRAMS;`);
    write('page.tsx',`import type { Metadata } from 'next';\nimport { DevelopmentGuide } from './DevelopmentGuide';\nimport '@fontsource-variable/source-serif-4/index.css';\nimport '@tabler/icons-webfont/tabler-icons.min.css';\nimport './page.css';\nexport const metadata: Metadata={title:${JSON.stringify(doc.title)},description:'AWS DVA-C02 Domain 1の全29スキル・31図・15問を学ぶ完全ガイド。Lambda、SDK、メッセージング、DynamoDBを詳しく解説。'};\n/** AWS開発ガイドのServerルート。 */\nexport default function DevelopmentPage(){return <DevelopmentGuide />;}`);
    write('DevelopmentGuide.tsx',`'use client';\nimport { memo } from 'react';\nimport { NavBar } from './NavBar';\n/** 状態に依存しない本文をメモ化し、目次操作で図を再描画しない。 */\nconst GuideContents=memo(function GuideContents(){return <>\n${jsx(doc.querySelector('.hero'))}\n{/* SECTIONS */}\n</>;});\n/** 目次操作と静的本文を分離した学習ガイド。 */\nexport function DevelopmentGuide(){return <NavBar><GuideContents /></NavBar>;}`);
    const css=postcss.parse(doc.querySelector('style').textContent),tokens=[],hexes=new Set();
    const token=key=>key.startsWith('--font-')?`--font-dva-development-${key.slice(7)}`:key==='--shadow'?'--shadow-dva-development':`--color-dva-development-${key.slice(2)}`;
    css.walkRules(':root',rule=>rule.walkDecls(d=>{
        if(d.prop!=='--sidebar-w') tokens.push(`    ${token(d.prop)}: ${d.value.replace('"Noto Sans JP"','"Noto Sans JP Variable"').replace('"Source Serif 4"','"Source Serif 4 Variable"')};`);
        for(const [hex] of d.value.matchAll(/#[\da-f]{3,6}\b/gi)) hexes.add(hex.toLowerCase());
    }));
    css.walkRules(rule=>{
        if(rule.selector===':root'){rule.remove();return;}
        const original=rule.selector;
        rule.selector=original.split(',').map(part=>{
            const s=part.trim();
            return s==='html'||s==='body'?'.dva-development-page':s.startsWith('body.menu-open')?s.replace('body.menu-open','.dva-development-page.menu-open'):`.dva-development-page ${s}`;
        }).join(', ');
        rule.walkDecls(d=>{
            d.value=d.value.replace(/var\((--[\w-]+)\)/g,(_,key)=>key==='--sidebar-w'?'288px':`var(${token(key)})`).replace(/#[\da-f]{3,6}\b/gi,hex=>{hexes.add(hex.toLowerCase());return `var(--color-dva-development-${hex.slice(1).toLowerCase()})`;});
            if(d.prop==='font-size'&&d.value.endsWith('rem')) d.value=`${Number((parseFloat(d.value)*.875).toFixed(8))}rem`;
            if((original==='aside.sidebar'&&d.prop==='top')||(original==='.mobile-bar'&&d.prop==='top')) d.value='calc(var(--header-h, 60px) + var(--disclaimer-height, 0px))';
            if(original==='.mobile-bar'&&d.prop==='z-index') d.value='31';
            if(original==='.backdrop'&&d.prop==='inset') d.value='calc(var(--header-h, 60px) + var(--disclaimer-height, 0px)) 0 0';
        });
        if(original==='main') rule.append({prop:'width',value:rule.parent.type==='atrule'?'100%':'calc(100% - 288px)'});
    });
    let globals=readFileSync('app/globals.css','utf8');
    if(!globals.includes('--color-dva-development-paper:')) {
        globals=globals.replace('@theme {','@theme {\n    /* Layer 3: DVA Domain 1 原本ライト配色・書体 */\n'+tokens.join('\n')+'\n'+[...hexes].map(hex=>`    --color-dva-development-${hex.slice(1)}: ${hex};`).join('\n')+'\n');
        writeFileSync('app/globals.css',globals);
    }
    write('page.css',css.toString()+`\n.dva-development-page main ul { list-style-type: disc; list-style-position: outside; }\n.dva-development-page main ol { list-style-type: decimal; list-style-position: outside; }\n.dva-development-page main ul ul { list-style-type: circle; }\n.dva-development-page .nav-list { list-style-type: none; }\n.dva-development-page .nav-list li { margin: 0; }\n.dva-development-page section[id] { scroll-margin-top: calc(var(--header-h, 60px) + var(--disclaimer-height, 0px) + 72px); }\n.dva-development-page :focus-visible { outline: 2px solid var(--color-dva-development-indigo); outline-offset: 4px; }\n@media (max-width:900px) { .dva-development-page:not(.menu-open) aside.sidebar { visibility: hidden; } }\n.dva-development-page .backdrop { border: 0; padding: 0; }\n.dva-development-page .code-block { margin: 16px 0 22px; padding: 0; border: 0; overflow-x: auto; }\n.dva-development-page .code-line-content { display: block; padding: 0 16px; white-space: pre; min-height: 1.7em; font-family: var(--font-dva-development-mono); font-size: 0.875rem; line-height: 1.7; color: var(--color-dva-development-abb2bf); background: var(--color-dva-development-282c34); }\n.dva-development-page .code-line:first-child .code-line-content { padding-top: 14px; }\n.dva-development-page .code-line:last-child .code-line-content { padding-bottom: 14px; }\n.dva-development-page .hljs-comment { color: #94a3b8; font-style: italic; }\n.dva-development-page .hljs-keyword { color: #c678dd; }\n.dva-development-page .hljs-string { color: #98c379; }\n.dva-development-page .hljs-attr { color: #e88a91; }\n.dva-development-page .hljs-title { color: #61afef; }\n.dva-development-page .hljs-built_in { color: #e6c07b; }\n.dva-development-page .hljs-number, .dva-development-page .hljs-literal { color: #d19a66; }\n.dva-development-page .diagram-wrap > [role="img"] { border: 0; background: transparent; padding: 0; margin: 0; overflow: visible; }\n.dva-development-page .diagram-wrap .mermaid-target :is(foreignObject > div, .nodeLabel, .edgeLabel, text, tspan) { font-size: 14px !important; }\n`);
} else {
    const matches=id=>stage==='intro'?id==='sec-0':stage==='remainder'?/^sec-3[3-7]$/.test(id):['task1','task2','task3'].includes(stage)&&(id===`task-${stage.slice(-1)}`||id.startsWith(`sk-1-${stage.slice(-1)}-`));
    const sections=[...doc.querySelectorAll('main > section')].filter(section=>matches(section.id));
    const names=sections.map(section=>section.id.replace(/(^|-)([a-z0-9])/g,(_,sep,char)=>char.toUpperCase()));
    if(!names.length) throw new Error('Unknown/empty stage');
    let guide=readFileSync(`${dir}/DevelopmentGuide.tsx`,'utf8');
    // 再実行で import とセクションが重複しないよう、完了済み段階は書き込み前に拒否する
    const done=names.filter(name=>guide.includes(`import { ${name} } from './sections/${name}';`));
    if(done.length) throw new Error(`Stage already applied: ${stage} (${done.join(', ')})`);
    sections.forEach((section,i)=>{
        const name=names[i];
        const text=jsx(section);
        const imports=[text.includes('<Diagram ')?"import { Diagram } from '../Diagram';":'',text.includes('<CodeBlock ')?"import { CodeBlock } from '../CodeBlock';":''].filter(Boolean).join('\n');
        write(`sections/${name}.tsx`,`${imports}\n/** ${section.querySelector('h2').textContent.trim()}を全量保持する。 */\nexport function ${name}(){return (${text});}`);
    });
    guide=guide.replace('/** 状態',names.map(name=>`import { ${name} } from './sections/${name}';`).join('\n')+'\n/** 状態');
    guide=guide.replace('{/* SECTIONS */}',names.map(name=>`<${name} />`).join('\n')+'\n'+(stage==='remainder'?jsx(doc.querySelector('.footer')):'{/* SECTIONS */}'));
    write('DevelopmentGuide.tsx',guide);
    console.log(`${stage}: ${names.join(', ')}`);
}
