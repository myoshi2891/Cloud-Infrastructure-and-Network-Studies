import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { JSDOM } from 'jsdom';
import postcss from 'postcss';
import ts from 'typescript';
import mermaid from 'mermaid';
import { isValid, toHex } from 'khroma';
import fixture from '../docs/migration-inventory/aws-sap-c02-domain2.fidelity.json' with { type: 'json' };
import { FIDELITY_PAGES } from './archive-fidelity-config.mjs';
const dir='app/aws/solutions-architect-professional/domain2';
const source=execFileSync('git',['show',`${fixture.sourceCommit}:${fixture.source}`],{encoding:'utf8',maxBuffer:8*1024*1024});
const doc=new JSDOM(source).window.document;
const boundaries=FIDELITY_PAGES['aws-sap-c02-domain2'].guideBoundaries;
const phase=process.argv[2];
if(!Object.hasOwn(boundaries,phase))throw new Error('Specify foundation, task21..task26 or appendix');
fs.mkdirSync(dir+'/sections',{recursive:true});
const write=(name,s)=>{if(/\.tsx?$/.test(name))s=ts.createPrinter({newLine:ts.NewLineKind.LineFeed}).printFile(ts.createSourceFile(name,s,ts.ScriptTarget.Latest,true,name.endsWith('tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS));s=s.replaceAll('><','>\n<').replaceAll('>{','>\n{').replaceAll('}<','}\n<');fs.writeFileSync(dir+'/'+name,s);};
const diagrams=[...doc.querySelectorAll('pre.mermaid')];
const cardIndices=new Map([...doc.querySelectorAll('.checklist-card')].map((c,i)=>[c,i]));
function tokens(line,language){const regex=language==='json'?/"(?:\\.|[^"\\])*"(?=\s*:)|"(?:\\.|[^"\\])*"|\b(?:true|false|null)\b|\b\d+\b/g:/#.*$|"(?:\\.|[^"\\])*"|[\w]+(?=:)|\b(?:true|false)\b|\b\d+\b|!Ref\b/g;let out='',end=0;for(const m of line.matchAll(regex)){out+='{'+JSON.stringify(line.slice(end,m.index))+'}';const text=m[0];const cls=text.startsWith('#')?'comment':line.slice(m.index+text.length).trimStart().startsWith(':')?'attr':text.startsWith('"')?'string':/^\d/.test(text)?'number':'literal';out+=`<span className="hljs-${cls}">{${JSON.stringify(text)}}</span>`;end=m.index+text.length;}return out+'{'+JSON.stringify(line.slice(end))+'}';}
const tableScrolls=[...doc.querySelectorAll('.table-scroll')];
function tableLabel(n){let heading=n.previousElementSibling;while(heading&&!heading.matches('h2,h3,h4'))heading=heading.previousElementSibling;return `比較表 ${tableScrolls.indexOf(n)+1}：`+(heading?.textContent??'学習資料').replace(/\s+/g,' ').trim();}
function jsx(n){
 if(n.nodeType===3){if(['TABLE','THEAD','TBODY','TFOOT','TR'].includes(n.parentElement?.tagName)&&!n.textContent.trim())return '';return '{'+JSON.stringify(n.textContent)+'}';}if(n.nodeType!==1)return '';
 if(n.matches('pre.mermaid')){const i=diagrams.indexOf(n);let prev=n.previousElementSibling;while(prev&&!prev.matches('h2,h3,h4'))prev=prev.previousElementSibling;return `<Diagram id="diag-${i}" label={${JSON.stringify(prev?.textContent.trim()??`図${i+1}`)}} />`;}
 if(n.matches('pre')){const code=n.querySelector('code');const language=code?.className.replace('language-','')??'text';return `<pre className="code-block" aria-label="${language} コード例">`+n.textContent.replace(/^\n|\n$/g,'').split('\n').map(line=>'<div className="code-line">'+tokens(line,language)+'</div>').join('')+'</pre>';}
 const attrs=[...n.attributes].map(a=>`${({'class':'className','for':'htmlFor'}[a.name]||a.name)}={${JSON.stringify(a.value)}}`);
 if(n.matches('th'))attrs.push('scope="col"');if(n.matches('h2[id],h3[id]'))attrs.push('tabIndex={-1}');
 if(n.matches('.table-scroll'))attrs.push('tabIndex={0}','role="region"',`aria-label={${JSON.stringify(tableLabel(n))}}`);
 if(n.matches('input'))attrs.push(`onChange={updateProgress}`);
 if(n.matches('.count')){const card=n.closest('.checklist-card'),i=cardIndices.get(card);return `<span className="count">{\`\${progress[${i}]??0} / ${card.querySelectorAll('input').length} 完了\`}</span>`;}
 const tag=n.tagName.toLowerCase();return '<'+tag+' '+attrs.join(' ')+(['input','br','hr','img'].includes(tag)?' />':'>'+[...n.childNodes].map(jsx).join('')+'</'+tag+'>');
}
let current='foundation';const chunks=Object.fromEntries(Object.keys(boundaries).map(k=>[k,[]]));
for(const n of doc.querySelector('main').childNodes){const found=Object.entries(boundaries).find(([,id])=>id&&n.nodeType===1&&n.id===id)?.[0];if(found)current=found;chunks[current].push(n);}
write('sections/'+phase+'.tsx',`import { Diagram } from '../Diagram';\nimport type { ChecklistProps } from '../types';\n/** 原本の${phase}本文。 */\nexport default function Content({progress,updateProgress}:ChecklistProps){void progress;void updateProgress;return <>${chunks[phase].map(jsx).join('')}</>;}`);
if(phase!=='foundation')process.exit(0);
write('types.ts',`import type { ChangeEventHandler } from 'react';\nexport interface ChecklistProps{progress:Record<string,number>;updateProgress:ChangeEventHandler<HTMLInputElement>;}`);
write('constants.ts','export const DIAGRAMS:Record<string,string> = '+JSON.stringify(Object.fromEntries(diagrams.map((e,i)=>['diag-'+i,e.textContent.trim().split('\n').map(l=>l.trimStart()).join('\n')])),null,2)+';\nexport const NAV_ITEMS = '+JSON.stringify(fixture.guideDesign.nav,null,2)+' as const;');
const theme=fixture.guideInteractions.mermaidConfig;fs.writeFileSync(dir+'/mermaid-theme.json',JSON.stringify(theme,null,2)+'\n');
mermaid.initialize({...theme,startOnLoad:false});const vars=mermaid.mermaidAPI.getConfig().themeVariables;
fs.writeFileSync(dir+'/render-theme.json',JSON.stringify({...theme,themeVariables:{...Object.fromEntries(Object.entries(vars).map(([k,v])=>[k,typeof v==='string'&&/^(?:hsl|rgb)a?\(/.test(v)&&isValid(v)?toHex(v):v])),fontFamily:'"Noto Sans JP Variable",sans-serif'}},null,2)+'\n');
write('Diagram.tsx',`'use client';\nimport {memo} from 'react';\nimport {MermaidDiagram} from '@/components/MermaidDiagram';\nimport {DIAGRAMS} from './constants';\nimport theme from './render-theme.json';\nconst config='---\\nconfig: '+JSON.stringify(theme)+'\\n---\\n';\n/** 原本の配色・自然倍率で図を描画する。 */\nexport const Diagram=memo(function Diagram({id,label}:{id:string;label:string}){const chart=DIAGRAMS[id];if(!chart)throw new Error('Missing diagram: '+id);return <div className="mermaid-wrap"><MermaidDiagram chart={config+chart} theme="light" preserveChartTheme ariaLabel={label} preserveNaturalScale /></div>;});`);
write('page.tsx',`import type {Metadata} from 'next';\nimport SapDomain2Guide from './SapDomain2Guide';\nimport './page.css';\nexport const metadata:Metadata={title:${JSON.stringify(doc.title.replace(/\s+/g,' ').trim())}};\n/** SAP-C02 Domain 2。 */\nexport default function Page(){return <SapDomain2Guide/>;}`);
const css=postcss.parse(doc.querySelector('style').textContent);const root=css.nodes.find(n=>n.type==='rule'&&n.selector===':root');const colors=root.nodes.filter(n=>n.type==='decl'&&n.prop.startsWith('--')&&!['--sidebar-w','--font-jp'].includes(n.prop));let globals=fs.readFileSync('app/globals.css','utf8');if(!globals.includes('--color-sap-d2-bg:')){globals=globals.replace('    /* SAP-C02 Domain 1:',`    /* SAP-C02 Domain 2: original light palette */\n${colors.map(d=>'    --color-sap-d2-'+d.prop.slice(2)+': '+d.value+';').join('\n')}\n    /* SAP-C02 Domain 1:`);fs.writeFileSync('app/globals.css',globals);}root.remove();
css.walkRules(r=>{r.selector=r.selector.split(',').map(s=>['html','body'].includes(s.trim())?'.sap-domain2-page':'.sap-domain2-page '+s.trim().replaceAll('pre.mermaid','.mermaid-wrap').replaceAll('pre:not(.mermaid) code','pre:not(.mermaid) .code-line')).join(', ');});css.walkDecls(d=>{d.value=d.value.replace(/var\(--([\w-]+)\)/g,(_,k)=>k==='sidebar-w'?'300px':k==='font-jp'?'var(--font-body)':`var(--color-sap-d2-${k})`);if(d.prop==='word-break')d.remove();});
fs.writeFileSync(dir+'/page.css',css.toString()+`
.sap-domain2-page { color-scheme: light; }
.sap-domain2-page .main ul { list-style-type: disc; }
.sap-domain2-page .main ol { list-style-type: decimal; }
.sap-domain2-page .main ul ul { list-style-type: circle; }
.sap-domain2-page .main ul ul ul { list-style-type: square; }
.sap-domain2-page .main .checklist-card ul { list-style: none; padding: 0; }
.sap-domain2-page nav ul { list-style: none; padding: 0; margin: 0; }
.sap-domain2-page .sidebar { top: calc(var(--header-h, 60px) + var(--disclaimer-height, 0px)); z-index: 40; }
.sap-domain2-page .sidebar-toggle { top: calc(var(--header-h, 60px) + var(--disclaimer-height, 0px) + 14px); z-index: 41; }
@media (max-width: 980px) { .sap-domain2-page .sidebar:not(.open) { visibility: hidden; transition: transform 0.25s ease, visibility 0s linear 0.25s; } }
.sap-domain2-page .main h2, .sap-domain2-page .main h3 { scroll-margin-top: calc(var(--header-h, 60px) + var(--disclaimer-height, 0px) + 24px); }
.sap-domain2-page .main { min-width: 0; }
.sap-domain2-page .mermaid-wrap > [role="img"] { background: transparent; border: 0; padding: 0; margin: 0; width: 100%; }
.sap-domain2-page .mermaid-wrap svg { flex-shrink: 0; max-width: none; height: auto; }
.sap-domain2-page .code-line { white-space: pre; min-height: 1.65em; }
`);
