import {readFileSync} from 'node:fs';
import postcss from 'postcss';
import {expect,it} from 'vitest';
import fixture from '@/docs/migration-inventory/aws-sap-c02-guide.fidelity.json';
const css=readFileSync('app/aws/solutions-architect-professional/page.css','utf8');
const rules=(text:string,selector:string,media='')=>{const result:Record<string,string>={};postcss.parse(text).walkRules(r=>{if(r.selector===selector&&(r.parent?.type==='atrule'?r.parent.params:'')===media)r.walkDecls(d=>{result[d.prop]=d.value;});});return result;};
const globals:Record<string,string>={};postcss.parse(readFileSync('app/globals.css','utf8')).walkDecls(d=>{globals[d.prop]=d.value;});
const source:Record<string,string>={};for(const [k,v]of Object.entries(fixture.guideDesign.rules.find(r=>r.selector===':root')!.declarations))if(typeof v==='string')source[k]=v;
const resolve=(v:string,vars:Record<string,string>):string=>v.replace(/var\((--[\w-]+)\)/g,(_,k:string)=>vars[k]?resolve(vars[k]!,vars):'MISSING:'+k).replace(/\s+/g,'').toLowerCase();
const map=(s:string)=>s.split(',').map(s=>['html','body'].includes(s.trim())?'.sap-guide-page':'.sap-guide-page '+s.trim().replaceAll('pre.mermaid','.mermaid-wrap').replaceAll('.code-block','.code-sample').replaceAll('pre','.code-block').replace('.main > h2:first-of-type','.main > .guide-part:first-child > h2:first-of-type')).join(', ');
it('preserves every source CSS declaration and responsive rule',()=>{
 for(const rule of fixture.guideDesign.rules){if(rule.selector===':root')continue;const selector=map(rule.selector);const actual=rules(css,selector,rule.media);
 for(const [p,v] of Object.entries(rule.declarations)){if(typeof v!=='string')continue;
 const effective=Object.assign({},...fixture.guideDesign.rules.filter(r=>r.selector===rule.selector&&r.media===rule.media).map(r=>r.declarations));if(effective[p as keyof typeof effective]!==v)continue;
 if(p==='font-family')continue;
 
 if(p==='top'&&(selector.includes('sidebar')||selector.includes('quiz-bar'))){expect(actual[p]).toContain('var(--header-h, 60px)');continue;}
 if(p==='z-index'){expect(Number(actual[p])).toBeLessThan(40);continue;}
 if(p==='scroll-margin-top'){expect(actual[p]).toContain('var(--header-h, 60px)');continue;}
 if(p==='overflow-x'&&selector.split(',').every(s=>s.trim()==='.sap-guide-page')){expect(actual[p]).toBe('clip');continue;}
 if(p==='word-break'||(p==='overflow-wrap'&&rule.declarations['word-break'])){expect(actual['overflow-wrap']).toBe('anywhere');continue;}
 expect(resolve(actual[p]??'',globals),selector+' '+p).toBe(resolve(v.replace('var(--sidebar-w)','280px'),source));
 }}
});
function lists(text:string){expect(rules(text,'.sap-guide-page .main ul')['list-style-type']).toBe('disc');expect(rules(text,'.sap-guide-page .main ol')['list-style-type']).toBe('decimal');expect(rules(text,'.sap-guide-page .main ul, .sap-guide-page .main ol')).toMatchObject({'padding-left':'1.4em','list-style-position':'outside'});expect(rules(text,'.sap-guide-page .main li').display).toBe('list-item');expect(rules(text,'.sap-guide-page .main ul ul, .sap-guide-page .main ol ul')['list-style-type']).toBe('circle');}
it('restores markers, numbering and indentation',()=>lists(css));
it.each([['list-style-type: disc','list-style-type: none'],['list-style-type: decimal','list-style-type: none'],['padding-left: 1.4em','padding-left: 0'],['display: list-item','display: block'],['list-style-type: circle','list-style-type: none']])('detects destruction of %s',(from,to)=>{expect(css).toContain(from);expect(()=>lists(css.replaceAll(from,to))).toThrow();});
it('isolates styles and provides readable natural diagrams and responsive widths',()=>{expect(css).not.toMatch(/@layer|^[ \t]*--[\w-]+\s*:/m);expect(rules(css,'.sap-guide-page')['color-scheme']).toBe('light');expect(rules(css,'.sap-guide-page .main').width).toBe('calc(100% - 280px)');expect(rules(css,'.sap-guide-page .main','(max-width: 980px)').width).toBe('100%');expect(rules(css,'.sap-guide-page .sidebar:not(.open)','(max-width: 980px)').visibility).toBe('hidden');expect(rules(css,'.sap-guide-page .mermaid-wrap > [role="img"]')).toMatchObject({background:'transparent',border:'none',padding:'0'});});

it('keeps fixed sidebar top a valid length expression',()=>{expect(rules(css,'.sap-guide-page .sidebar').top).not.toMatch(/\+\s*0\s*\)/);});
it('keeps diagram scrolling on the named keyboard-focusable outer region',()=>{
 expect(rules(css,'.sap-guide-page .mermaid-wrap')['overflow-x']).toBe('auto');
 expect(rules(css,'.sap-guide-page .mermaid-wrap > [role="img"]')['overflow-x']).toBe('visible');
});
it('wraps long reference URLs inside the light guide background on narrow screens',()=>{
 expect(rules(css,'.sap-guide-page .main a')['overflow-wrap']).toBe('anywhere');
});
