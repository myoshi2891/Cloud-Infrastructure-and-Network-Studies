import { readFileSync } from 'node:fs';
import postcss from 'postcss';
import { describe, expect, it } from 'vitest';
import fixture from '@/docs/migration-inventory/aws-aip-c01-domain4-guide.fidelity.json';
const css = readFileSync('app/aws/generative-ai-developer-professional/domain4/page.css', 'utf8');
const compact = (value: string) => value.replace(/\s+/g, ' ').trim();
const declarations = (text: string, selector: string, media = '') => {
 const result: Record<string, string> = {};
 postcss.parse(text).walkRules(rule => { const context = rule.parent?.type === 'atrule' ? rule.parent.params : ''; if (compact(rule.selector) === compact(selector) && context === media) rule.walkDecls(decl => { result[decl.prop] = decl.value; }); });
 return result;
};
const tokens: Record<string, string> = {};
postcss.parse(readFileSync('app/globals.css', 'utf8')).walkDecls(decl => { if (decl.prop.startsWith('--')) tokens[decl.prop] = decl.value; });
const sourceTokens = fixture.guideDesign.rules.find(rule => rule.selector === ':root')?.declarations ?? {};
const resolve = (value: string, vars: Record<string, string>) => value.replace(/var\((--[\w-]+)\)/g, (_, name: string) => vars[name] ?? `MISSING:${name}`).replace(/\s+/g, '').toLowerCase();
const mapSelector = (selector: string) => selector === 'body' ? '.aip-domain4-page' : selector.split(',').map(s => ['html', 'body'].includes(s.trim()) ? '.aip-domain4-page' : '.aip-domain4-page ' + s.trim().replaceAll('pre.mermaid', '.mermaid-wrap').replace('.main pre.code code', '.main .code-block .code-line').replace('.main pre.code', '.main .code-block').replace('.main > .hero + h2', '.guide-part:first-child > .hero + h2')).join(', ');
function checkLists(text: string) {
 expect(declarations(text, '.aip-domain4-page .main ul')['list-style-type']).toBe('disc');
 expect(declarations(text, '.aip-domain4-page .main ol')['list-style-type']).toBe('decimal');
 expect(declarations(text, '.aip-domain4-page .main ul, .aip-domain4-page .main ol')).toMatchObject({ 'padding-left': '1.4em', 'list-style-position': 'outside' });
 expect(declarations(text, '.aip-domain4-page .main li').display).toBe('list-item');
 expect(declarations(text, '.aip-domain4-page .main ul ul')['list-style-type']).toBe('circle');
 expect(declarations(text, '.aip-domain4-page .main .q-options')).toMatchObject({ 'list-style': 'none', padding: '0' });
 expect(declarations(text, '.aip-domain4-page .main .q-options li').display).toBe('block');
 expect(declarations(text, '.aip-domain4-page #sidebarNav ul')['list-style']).toBe('none');
}
describe('Domain 4 source design declaration fidelity', () => {
 it('retains every effective source declaration including responsive layout and syntax colors', () => {
  const effective = new Map<string, { selector: string; media: string; declarations: Record<string, string> }>();
  for (const rule of fixture.guideDesign.rules) { if (rule.selector === ':root') continue; const key = rule.selector + '\0' + rule.media; const previous = effective.get(key); effective.set(key, { ...rule, declarations: { ...previous?.declarations, ...rule.declarations } }); }
  for (const rule of effective.values()) {
   const selector = mapSelector(rule.selector); const actual = declarations(css, selector, rule.media); expect(Object.keys(actual), selector).not.toHaveLength(0);
   for (const [prop, value] of Object.entries(rule.declarations)) {
    if (prop === 'font-family') continue; // 自己ホストの共通フォントへ対応付ける。
    if (prop === 'overflow-wrap' && rule.declarations['word-break']) { expect(actual[prop]).toBe('anywhere'); continue; }
    if (prop === 'word-break') { expect(actual['overflow-wrap']).toBe('anywhere'); continue; }
    if (prop === 'scroll-margin-top') { expect(actual[prop]).toContain('var(--header-h, 60px)'); continue; }
    if (prop === 'z-index') { expect(Number(actual[prop])).toBeLessThan(40); continue; }
    if (prop === 'top' && selector.includes('sidebar')) { expect(actual[prop]).toContain('var(--header-h, 60px)'); continue; }
    expect(resolve(actual[prop] ?? '', tokens), `${selector} ${prop}`).toBe(resolve(value.replace('var(--sidebar-w)', '300px'), sourceTokens));
   }
  }
 });
 it('restores every browser list marker and isolates quiz and navigation lists', () => checkLists(css));
 it.each([
 ['list-style-type: disc', 'list-style-type: none'], ['list-style-type: decimal', 'list-style-type: none'], ['padding-left: 1.4em', 'padding-left: 0'], ['display: list-item', 'display: block'], ['list-style-type: circle', 'list-style-type: none'],
 ])('detects CSS destruction of %s', (from, to) => { expect(css).toContain(from); expect(() => checkLists(css.replaceAll(from, to))).toThrow(); });
 it('keeps light theme, keyboard scrolling, natural diagrams and mobile accessibility', () => {
 expect(declarations(css, '.aip-domain4-page')['color-scheme']).toBe('light');
 expect(declarations(css, '.aip-domain4-page .main').width).toBe('calc(100% - 300px)');
 expect(declarations(css, '.aip-domain4-page .main', '(max-width: 980px)').width).toBe('100%');
 expect(declarations(css, '.aip-domain4-page .sidebar:not(.open)', '(max-width: 980px)').visibility).toBe('hidden');
 expect(declarations(css, '.aip-domain4-page .mermaid-wrap > [role="img"]')).toMatchObject({ background: 'transparent', border: 'none', padding: '0', overflow: 'visible' });
 expect(css).not.toMatch(/@layer|^[ \t]*--[\w-]+\s*:/m);expect(css).not.toMatch(/#[\da-fA-F]{3,8}\b|word-break:\s*break-word/);
 for (const [, name] of css.matchAll(/var\((--[\w-]+)/g)) if (name !== '--disclaimer-height') expect(tokens, name).toHaveProperty(name!);
 });
});
