import {readFileSync} from 'node:fs';
import postcss from 'postcss';
import {describe,it,expect} from 'vitest';
import fixture from '@/docs/migration-inventory/aws-aip-c01-domain3-guide.fidelity.json';
const css=readFileSync('app/aws/generative-ai-developer-professional/domain3/page.css','utf8');
const parsed=postcss.parse(css);
const compact=(value:string)=>value.replace(/\s+/g,' ').trim();
const declarations=(selector:string,media='')=>{const result:Record<string,string>={};parsed.walkRules(rule=>{
 const context=rule.parent?.type==='atrule'?rule.parent.params:'';
 if(compact(rule.selector)===compact(selector)&&context===media)rule.walkDecls(decl=>{result[decl.prop]=decl.value;});
});return result;};
const tokens:Record<string,string>={};postcss.parse(readFileSync('app/globals.css','utf8')).walkDecls(d=>{if(d.prop.startsWith('--'))tokens[d.prop]=d.value;});
// 原本fixtureは改変せず、--successだけWCAG AA（白・--color-aip-d3-6の両方に4.5:1以上）を満たす濃い緑へ訂正する
const rootTokens=Object.entries(fixture.guideDesign.rules.find(r=>r.selector===':root')?.declarations??{}).filter((entry):entry is [string,string]=>typeof entry[1]==='string');
const sourceTokens:Record<string,string>={...Object.fromEntries(rootTokens),'--success':'#18794a'};
const resolve=(v:string,vars:Record<string,string>)=>v.replace(/var\((--[\w-]+)\)/g,(_,n:string)=>vars[n]??`MISSING:${n}`).replace(/\s+/g,'').toLowerCase();
describe('Domain 3 full source design',()=>{
 it('preserves every applicable source declaration, including responsive and quiz styling',()=>{
 for(const rule of fixture.guideDesign.rules){
  if(rule.selector===':root'||rule.selector==='aside.footnotes'||rule.selector.includes('.checklist')||rule.selector.startsWith('html,'))continue;
  const selector=rule.selector==='body'?'.aip-domain3-page':rule.selector.split(',').map(s=>'.aip-domain3-page '+s.trim().replaceAll('pre.mermaid','.mermaid-wrap').replace('.main > h2:first-of-type','.guide-part:first-child > h2:first-of-type')).join(', ');
  const actual=declarations(selector,rule.media);expect(Object.keys(actual),selector).not.toHaveLength(0);
  for(const [prop,value] of Object.entries(rule.declarations)){
   if(['font-family','word-break','overflow-wrap','scroll-margin-top','z-index'].includes(prop))continue;
   // ユーザー指定: 見出しの上罫線を除き、原本のhrだけを区切りとして残す。
   if(rule.selector==='.main h2'&&prop==='border-top'){expect(actual[prop]).toBe('none');continue;}
   if(prop==='top'&&selector.includes('sidebar'))continue;
   expect(resolve(actual[prop]??'',tokens),`${selector} ${prop}`).toBe(resolve(value.replace('var(--sidebar-w)','300px'),sourceTokens));
  }
 }
 });
 it('explicitly restores dots, numbers, indentation, nested markers and quiz exceptions',()=>{
 expect(declarations('.aip-domain3-page .main ul')['list-style-type']).toBe('disc');
 expect(declarations('.aip-domain3-page .main ol')['list-style-type']).toBe('decimal');
 expect(declarations('.aip-domain3-page .main ul, .aip-domain3-page .main ol')).toMatchObject({'padding-left':'1.4em','list-style-position':'outside'});
 expect(declarations('.aip-domain3-page .main li').display).toBe('list-item');
 expect(declarations('.aip-domain3-page .main ul ul')['list-style-type']).toBe('circle');
 expect(declarations('.aip-domain3-page .main .quiz-opts')).toMatchObject({'list-style':'none',padding:'0'});
 expect(declarations('.aip-domain3-page .main .quiz-opts li').display).toBe('block');
 expect(declarations('.aip-domain3-page #sidebarNav ul')['list-style']).toBe('none');
 });
 it('keeps natural diagrams and header-safe light layout through global tokens',()=>{
 expect(declarations('.aip-domain3-page')['color-scheme']).toBe('light');
 expect(declarations('.aip-domain3-page .main').width).toBe('calc(100% - 300px)');
 expect(declarations('.aip-domain3-page .main','(max-width: 980px)').width).toBe('100%');
 expect(declarations('.aip-domain3-page .sidebar').top).toContain('var(--header-h, 60px)');
 expect(Number(declarations('.aip-domain3-page .sidebar-toggle')['z-index'])).toBeGreaterThan(Number(declarations('.aip-domain3-page .sidebar')['z-index']));
 expect(declarations('.aip-domain3-page .mermaid-wrap > [role="img"]')).toMatchObject({background:'transparent',border:'none',padding:'0',overflow:'visible'});
 expect(css).not.toMatch(/@layer|^[ \t]*--[\w-]+\s*:/m);
 expect(css).not.toMatch(/#[\da-fA-F]{3,8}\b|word-break:\s*break-word/);
 for(const [,name] of css.matchAll(/var\((--[\w-]+)/g))if(name!=='--disclaimer-height')expect(tokens,name).toHaveProperty(name!);
 });
});

it('removes closed mobile navigation from focus and accessibility trees',()=>{expect(declarations('.aip-domain3-page .sidebar:not(.open)','(max-width: 980px)').visibility).toBe('hidden');});

it('uses only source horizontal rules as step and task dividers',()=>{expect(declarations('.aip-domain3-page .main h2')['border-top']).toBe('none');expect(declarations('.aip-domain3-page .main hr')['border-top']).toBe('1px solid var(--color-aip-d3-2)');});
