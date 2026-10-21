import { readFileSync } from 'node:fs';
import postcss from 'postcss';
import { describe, expect, it } from 'vitest';
import fixture from '@/docs/migration-inventory/aws-ans-c01-domain3-guide.fidelity.json';
const css = readFileSync('app/aws/advanced-networking-specialty/domain3/page.css', 'utf8');
const compact = (value: string) => value.replace(/\s+/g, ' ').trim();
const declarations = (text: string, selector: string, media = '') => {
 const result: Record<string, string> = {};
 postcss.parse(text).walkRules(rule => { const context = rule.parent?.type === 'atrule' ? rule.parent.params : ''; if (compact(rule.selector) === compact(selector) && context === media) rule.walkDecls(decl => { result[decl.prop] = decl.value; }); });
 return result;
};
const tokens: Record<string, string> = {};
postcss.parse(readFileSync('app/globals.css', 'utf8')).walkDecls(decl => { if (decl.prop.startsWith('--')) tokens[decl.prop] = decl.value; });
const sourceTokens: Record<string, string> = Object.fromEntries(Object.entries(fixture.guideDesign.rules.find(rule => rule.selector === ':root')?.declarations ?? {}).filter((entry): entry is [string, string] => typeof entry[1] === 'string'));
const resolve = (value: string, vars: Record<string, string>) => value.replace(/var\((--[\w-]+)\)/g, (_, name: string) => vars[name] ?? `MISSING:${name}`).replace(/\s+/g, '').toLowerCase();
const mapSelector = (selector: string) => selector === 'pre' ? '.ans-domain3-page .code-block' : selector === 'body' ? '.ans-domain3-page' : selector.split(',').map(s => ['html', 'body'].includes(s.trim()) ? '.ans-domain3-page' : '.ans-domain3-page ' + s.trim().replaceAll('pre.mermaid', '.mermaid-wrap').replaceAll('.code-block', '.code-sample').replaceAll('.code-sample pre', '.code-block.highlight').replaceAll('pre.highlight code', '.code-block.highlight .code-line').replaceAll('pre.highlight', '.code-block.highlight').replace('.main > h2:first-of-type', '.guide-part:first-child > h2:first-of-type')).join(', ');
function checkLists(text: string) {
 expect(declarations(text, '.ans-domain3-page .main ul')['list-style-type']).toBe('disc');
 expect(declarations(text, '.ans-domain3-page .main ol')['list-style-type']).toBe('decimal');
 expect(declarations(text, '.ans-domain3-page .main ul, .ans-domain3-page .main ol')).toMatchObject({ 'padding-left': '1.4em', 'list-style-position': 'outside' });
 expect(declarations(text, '.ans-domain3-page .main li').display).toBe('list-item');
 expect(declarations(text, '.ans-domain3-page .main ul ul, .ans-domain3-page .main ol ul')['list-style-type']).toBe('circle');
 expect(declarations(text, '.ans-domain3-page nav ul')['list-style']).toBe('none');
}
describe('ANS Domain 3 source design declaration fidelity', () => {
 it('keeps the mobile menu button above the sidebar', () => {
  const z = (selector: string) => Number(declarations(css, selector)['z-index'] ?? 0);
  expect(z('.ans-domain3-page .sidebar-toggle')).toBeGreaterThan(z('.ans-domain3-page .sidebar'));
  
 });
 it('offsets the fixed sidebar by a valid header and disclaimer calc without a unitless addend', () => {
  // 長さと単位なし数値の加算は calc 全体を無効にし、top が auto へ戻る。
  expect(declarations(css, '.ans-domain3-page .sidebar').top).toBe('calc(var(--header-h, 60px) + var(--disclaimer-height, 0px))');
  postcss.parse(css).walkDecls(decl => expect(decl.value, `${decl.prop}: ${decl.value}`).not.toMatch(/\+\s*0\s*\)/));
 });
 it('retains every effective source declaration including responsive layout and syntax colors', () => {
  const effective = new Map<string, { selector: string; media: string; declarations: Record<string, string> }>();
  for (const rule of fixture.guideDesign.rules) { if (rule.selector === ':root') continue; const key = rule.selector + '\0' + rule.media; const previous = effective.get(key); const sourceDeclarations: Record<string,string> = {...previous?.declarations}; for(const [prop,value] of Object.entries(rule.declarations))if(typeof value==='string')sourceDeclarations[prop]=value; effective.set(key, { selector:rule.selector,media:rule.media,declarations:sourceDeclarations }); }
  for (const rule of effective.values()) {
   const selector = mapSelector(rule.selector); const actual = declarations(css, selector, rule.media); expect(Object.keys(actual), selector).not.toHaveLength(0);
   for (const [prop, value] of Object.entries(rule.declarations)) {
    // 原本の低コントラスト2系統だけを、同色相のAA適合色へ補正する。
    
    
    if (prop === 'color' && value === '#3d7b7b') { expect(actual[prop]).toBe('#3b7777'); continue; }
    if (prop === 'color' && value === '#008400') { expect(actual[prop]).toBe('#008000'); continue; }
    if (prop === 'font-family') continue; // 自己ホストの共通フォントへ対応付ける。
    if (prop === 'overflow-wrap' && rule.declarations['word-break']) { expect(actual[prop]).toBe('anywhere'); continue; }
    if (prop === 'word-break') { expect(actual['overflow-wrap']).toBe('anywhere'); continue; }
    if (prop === 'scroll-margin-top') { expect(actual[prop]).toContain('var(--header-h, 60px)'); continue; }
    if (prop === 'overflow-x' && selector.split(',').every(part => part.trim() === '.ans-domain3-page')) { expect(actual[prop]).toBe('clip'); continue; } // hiddenはスクロールコンテナになり.quiz-barのstickyを妨げる。
    if (prop === 'z-index') { expect(Number(actual[prop])).toBeLessThan(40); continue; }
    if (prop === 'top' && (selector.includes('sidebar') || selector.includes('quiz-bar'))) { expect(actual[prop]).toContain('var(--header-h, 60px)'); continue; }
    expect(resolve(actual[prop] ?? '', tokens), `${selector} ${prop}`).toBe(resolve(value.replace('var(--sidebar-w)', '300px'), sourceTokens));
   }
  }
 });
 it('restores every browser list marker and isolates quiz and navigation lists', () => checkLists(css));
 it.each([
 ['list-style-type: disc', 'list-style-type: none'], ['list-style-type: decimal', 'list-style-type: none'], ['padding-left: 1.4em', 'padding-left: 0'], ['display: list-item', 'display: block'], ['list-style-type: circle', 'list-style-type: none'],
 ])('detects CSS destruction of %s', (from, to) => { expect(css).toContain(from); expect(() => checkLists(css.replaceAll(from, to))).toThrow(); });
 it('keeps light theme, keyboard scrolling, natural diagrams and mobile accessibility', () => {
 expect(declarations(css, '.ans-domain3-page')['color-scheme']).toBe('light');
 expect(declarations(css, '.ans-domain3-page .main').width).toBe('calc(100% - 300px)');
 expect(declarations(css, '.ans-domain3-page .main', '(max-width: 980px)').width).toBe('100%');
 expect(declarations(css, '.ans-domain3-page .sidebar:not(.open)', '(max-width: 980px)').visibility).toBe('hidden');
 expect(declarations(css, '.ans-domain3-page .mermaid-wrap > [role="img"]')).toMatchObject({ background: 'transparent', border: 'none', padding: '0', overflow: 'visible' });
 expect(css).not.toMatch(/@layer|^[ \t]*--[\w-]+\s*:/m);expect(css).not.toMatch(/word-break:\s*break-word/);expect(css).not.toMatch(/var\(--color-(?:aip|tcpip)-/);
 postcss.parse(css).walkRules(rule=>{if(!rule.selector.includes('.highlight ')&&!rule.selector.includes('linenos'))rule.walkDecls(decl=>expect(decl.value).not.toMatch(/#[\da-fA-F]{3,8}\b/));});
 for (const [, name] of css.matchAll(/var\((--[\w-]+)/g)) if (name !== '--disclaimer-height') expect(tokens, name).toHaveProperty(name!);
 });
});

it('registers the original light palette for the shared footer',()=>{
 const footer=readFileSync('components/Footer.module.css','utf8');
 expect(footer).toContain('.ans-domain3-page');
});


it('keeps source code hues readable and identifies prose links without color alone',()=>{
 expect(declarations(css,'.ans-domain3-page .code-block.highlight .c1').color).toBe('#3b7777');
 expect(declarations(css,'.ans-domain3-page .code-block.highlight .gi').color).toBe('#008000');
 expect(declarations(css,'.ans-domain3-page .main p a')['text-decoration']).toBe('underline');
});
