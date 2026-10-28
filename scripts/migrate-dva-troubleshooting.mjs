import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { JSDOM } from 'jsdom';
import postcss from 'postcss';
import { troubleshootingSource } from './dva-troubleshooting-fidelity.mjs';
import { codeLines } from './inventory-extraction.mjs';
const html = execFileSync('git',['show','994d23de:Aws-dva-c02-domain4-troubleshooting-optimization-guide.html'],{encoding:'utf8',maxBuffer:8*1024*1024});
const doc = new JSDOM(html).window.document;
const {diagrams,theme} = troubleshootingSource(doc);
const dir = 'app/aws/developer-associate/domain4';
fs.mkdirSync(dir+'/sections',{recursive:true});
const write = (name,text) => fs.writeFileSync(dir+'/'+name,text.trimEnd()+'\n');
const stage = process.argv[2];
const sections = [...doc.querySelectorAll('main section')];
const tables = [...doc.querySelectorAll('.table-wrap')];
function jsx(node) {
    if(node.nodeType === 3) {
        if(!node.textContent.trim() && ['TABLE','THEAD','TBODY','TR'].includes(node.parentElement?.tagName)) return '';
        return `{${JSON.stringify(node.textContent.replace(/\s+/g,' '))}}`;
    }
    if(node.nodeType !== 1 || node.tagName === 'SCRIPT') return '';
    if(node.matches('[data-diagram-id]')) return `<Diagram id=${JSON.stringify(node.dataset.diagramId)} label=${JSON.stringify(node.getAttribute('aria-label'))} />`;
    if(node.tagName === 'PRE') return `<CodeBlock language=${JSON.stringify(node.querySelector('code')?.className.replace('language-','') ?? '')} lines={${JSON.stringify(codeLines(node))}} />`;
    const tag = node.tagName.toLowerCase();
    const attrs = [...node.attributes].map(attr => {
        if(attr.name === 'style') {
            const style = Object.fromEntries([...node.style].map(key => [key.replace(/-([a-z])/g,(_,c)=>c.toUpperCase()),node.style.getPropertyValue(key)]));
            return `style={${JSON.stringify(style)}}`;
        }
        const name = ({class:'className',for:'htmlFor',colspan:'colSpan',rowspan:'rowSpan',tabindex:'tabIndex'})[attr.name] ?? attr.name;
        if(['colSpan','rowSpan','start','tabIndex'].includes(name)) return `${name}={${Number(attr.value)}}`;
        return `${name}=${JSON.stringify(attr.value)}`;
    });
    if(node.matches('thead th')) attrs.push('scope="col"');
    if(node.matches('section[id]')) attrs.push('tabIndex={-1}');
    if(node.matches('.table-wrap')) attrs.push('tabIndex={0}','role="region"',`aria-label="表 ${tables.indexOf(node)+1}"`);
    const start = `<${tag}${attrs.length?' '+attrs.join(' '):''}`;
    if(['br','hr','img','input'].includes(tag)) return start+' />';
    return `${start}>${[...node.childNodes].map(jsx).join('')}</${tag}>`;
}
if(stage === 'scaffold') {
    const nav = JSON.parse(fs.readFileSync('docs/migration-inventory/aws-dva-domain4.fidelity.json','utf8')).nav;
    write('constants.ts',`/** 原本の全目次・全図の単一正本。 */\nexport const NAV_ITEMS = ${JSON.stringify(nav,null,2)} as const;\nexport const DIAGRAMS = ${JSON.stringify(diagrams,null,2)} as const;\nexport type DiagramId = keyof typeof DIAGRAMS;`);
    write('mermaid-theme.json',JSON.stringify(theme,null,2));
    write('page.tsx',`import '@tabler/icons-webfont/tabler-icons.min.css';\nimport type { Metadata } from 'next';\nimport { TroubleshootingGuide } from './TroubleshootingGuide';\nimport '@fontsource-variable/source-serif-4/index.css';\nimport './page.css';\nexport const metadata: Metadata = {title: ${JSON.stringify(doc.title)}, description: 'AWS DVA-C02 Domain 4の全3タスク・25 Stepsを、159表・34図・25コード例で学ぶトラブルシューティングと最適化のガイド。'};\n/** Domain 4学習ガイドのServer入口。 */\nexport default function Page() { return <TroubleshootingGuide />; }`);
    write('Diagram.tsx',`'use client';\nimport { memo } from 'react';\nimport { MermaidDiagram } from '@/components/MermaidDiagram';\nimport { DIAGRAMS, type DiagramId } from './constants';\nimport theme from './mermaid-theme.json';\nconst prefix = \`---\\nconfig: \${JSON.stringify({...theme,themeVariables:{...theme.themeVariables,fontFamily:'"Noto Sans JP Variable",sans-serif'}})}\\n---\\n\`;\n/** 原本のテーマ・DSL・自然倍率を保持する。 */\nexport const Diagram = memo(function Diagram({id,label}:{id:DiagramId;label:string}) {\nconst chart = DIAGRAMS[id]; if(!chart) return null;\nreturn <div className="diagram-wrap" data-diagram-id={id} tabIndex={0} role="region" aria-label={label}><MermaidDiagram chart={prefix+chart} theme="light" preserveChartTheme={true} ariaLabel={label} preserveNaturalScale={true}/></div>;\n});`);
    const css = postcss.parse(doc.querySelector('style').textContent);
    const mapping = {'--sidebar-w':'288px','--font-body':'var(--font-body)','--font-display':'var(--font-dva-serif)','--font-mono':'var(--font-mono)'};
    const additions = {};
    const token = value => {
        const name = '--color-dva-troubleshooting-'+value.slice(1).toLowerCase();
        additions[name]=value; return `var(${name})`;
    };
    css.walkRules(':root',rule => {
        rule.walkDecls(decl => {
            if(mapping[decl.prop]) return;
            if(decl.value.startsWith('#')) mapping[decl.prop]=token(decl.value);
            else { const key='--shadow-dva-troubleshooting'; additions[key]=decl.value; mapping[decl.prop]=`var(${key})`; }
        }); rule.remove();
    });
    css.walkRules(rule => {
        const source = rule.selector;
        rule.selector = [...new Set(source.split(',').map(part => {
            const s = part.trim().replaceAll('body.menu-open','.dva-troubleshooting-page.menu-open').replaceAll('.code-block','.code-sample').replaceAll('pre code','.code-viewport .code-block').replaceAll('pre','.code-viewport');
            return ['html','body'].includes(s) ? '.dva-troubleshooting-page' : s.startsWith('.dva-troubleshooting-page') ? s : '.dva-troubleshooting-page '+s;
        }))].join(', ');
        rule.walkDecls(decl => {
            decl.value=decl.value.replace(/var\((--[\w-]+)\)/g,(_,key)=> { if(!mapping[key]) throw Error(key); return mapping[key]; });
            decl.value=decl.value.replace(/#[\da-f]{3,8}\b/gi,token);
            if(decl.prop==='top' && ['.sidebar','.menu-btn'].includes(source)) decl.value='calc(var(--header-h, 60px) + var(--disclaimer-height, 0px) + '+(source === '.menu-btn'?'12px':'0px')+')';
            if(decl.prop==='scroll-margin-top') decl.value='calc(var(--header-h, 60px) + var(--disclaimer-height, 0px) + 64px)';
            if(decl.prop==='overflow-wrap' && decl.value==='break-word') decl.value='anywhere';
        });
    });
    let globals = fs.readFileSync('app/globals.css','utf8');
    const missing = Object.entries(additions).filter(([key])=>!globals.includes(key+':'));
    globals=globals.replace('@theme {','@theme {\n    /* DVA Domain 4 原本テーマ */\n'+missing.map(([k,v])=>`    ${k}: ${v};`).join('\n'));
    fs.writeFileSync('app/globals.css',globals);
    write('page.css',css.toString()+`\n.dva-troubleshooting-page { color-scheme: light; }
.dva-troubleshooting-page main { width: calc(100% - 288px); max-width: none; }
.dva-troubleshooting-page .section ul { list-style-type: disc; }
.dva-troubleshooting-page .section ol { list-style-type: decimal; }
.dva-troubleshooting-page .section ul ul, .dva-troubleshooting-page .section ol ul { list-style-type: circle; }
.dva-troubleshooting-page .section li { display: list-item; }
.dva-troubleshooting-page .section .ref-list { list-style-type: none; }
.dva-troubleshooting-page .code-block { font-family: var(--font-mono); }
.dva-troubleshooting-page .code-line { white-space: pre; min-height: 1.7em; }
.dva-troubleshooting-page .diagram-wrap > [role="img"] { border: 0; background: transparent; padding: 0; margin: 0; overflow: visible; }
.dva-troubleshooting-page .backdrop { border: 0; inset: calc(var(--header-h, 60px) + var(--disclaimer-height, 0px)) 0 0; }
.dva-troubleshooting-page nav ul { list-style: none; padding: 0; margin: 0; }
.dva-troubleshooting-page :focus-visible { outline: 2px solid var(--color-dva-troubleshooting-34439a); outline-offset: 3px; }
@media(max-width: 900px) { .dva-troubleshooting-page main { width: 100%; } .dva-troubleshooting-page:not(.menu-open) .sidebar { visibility: hidden; } }
@media(prefers-reduced-motion: reduce) { .dva-troubleshooting-page .sidebar { transition: none; } }
`);
} else {
    const groups = {foundation:['intro','step-0'],task1:Array.from({length:7},(_,i)=>'step-'+(i+1)),task2:Array.from({length:8},(_,i)=>'step-'+(i+8)),task3:Array.from({length:9},(_,i)=>'step-'+(i+16)),appendix:['app-a','app-b','app-c','app-d','app-e','app-f','closing']};
    if(!groups[stage]) throw Error('Unknown stage');
    for(const section of sections.filter(el=>groups[stage].includes(el.id))) {
        const name='Section'+sections.indexOf(section);
        const body=jsx(section);
        write('sections/'+name+'.tsx',`${body.includes('<CodeBlock ')?"import { CodeBlock } from '../CodeBlock';\n":''}${body.includes('<Diagram ')?"import { Diagram } from '../Diagram';\n":''}/** 原本${section.id}の全内容。 */\nexport function ${name}() { return (${body}); }`);
    }
}
const names=sections.map((_,i)=>'Section'+i).filter(name=>fs.existsSync(dir+'/sections/'+name+'.tsx'));
write('TroubleshootingGuide.tsx',`import { NavBar } from './NavBar';\n${names.map(name=>`import { ${name} } from './sections/${name}';`).join('\n')}\n/** 全原本を段階移行した静的本文。 */\nexport function TroubleshootingGuide() { return <div className="dva-troubleshooting-page"><NavBar/><main>${jsx(doc.querySelector('.hero'))}${names.map(name=>`<${name}/>`).join('\n')}${jsx(doc.querySelector('.footer'))}</main></div>; }`);
console.log(stage+': '+names.length+'/'+sections.length+' sections');
