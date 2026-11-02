import { readFileSync } from 'node:fs';
import postcss from 'postcss';
import { expect, it } from 'vitest';
import fixture from '@/docs/migration-inventory/aws-scs-c03-domain2-guide.fidelity.json';

const css = readFileSync('app/aws/security-specialty/domain2/page.css', 'utf8');

const rules = (text: string, selector: string, media = '') => {
    const result: Record<string, string> = {};
    postcss.parse(text).walkRules((r) => {
        if (r.selector === selector && (r.parent?.type === 'atrule' ? r.parent.params : '') === media) {
            r.walkDecls((d) => {
                result[d.prop] = d.value;
            });
        }
    });
    return result;
};

const globals: Record<string, string> = {};
postcss.parse(readFileSync('app/globals.css', 'utf8')).walkDecls((d) => {
    globals[d.prop] = d.value;
});
const pageVariables = {
    ...globals,
    ...rules(css, '.scs-domain2-page'),
};

const source: Record<string, string> = {};
for (const [k, v] of Object.entries(fixture.guideDesign.rules.find((r) => r.selector === ':root')!.declarations)) {
    if (typeof v === 'string') source[k] = v;
}

const resolve = (v: string, vars: Record<string, string>): string =>
    v
        .replace(/var\((--[\w-]+)\)/g, (_, k: string) => (vars[k] ? resolve(vars[k]!, vars) : 'MISSING:' + k))
        .replace(/\s+/g, '')
        .toLowerCase();

const map = (s: string) =>
    s
        .split(',')
        .map((part) =>
            ['html', 'body'].includes(part.trim())
                ? '.scs-domain2-page'
                : '.scs-domain2-page ' +
                  part
                      .trim()
                      .replaceAll('pre.mermaid', '.mermaid-wrap')
                      .replaceAll('.code-block', '.code-sample')
                      .replaceAll('pre', '.code-block')
                      .replace('.main > h2:first-of-type', '.main > .guide-part:first-child > h2:first-of-type'),
        )
        .join(', ');

it('preserves every source CSS declaration and responsive rule', () => {
    for (const rule of fixture.guideDesign.rules) {
        if (rule.selector === ':root') continue;
        const selector = map(rule.selector);
        const actual = rules(css, selector, rule.media);
        for (const [p, v] of Object.entries(rule.declarations)) {
            if (typeof v !== 'string') continue;
            const effective = Object.assign(
                {},
                ...fixture.guideDesign.rules
                    .filter((r) => r.selector === rule.selector && r.media === rule.media)
                    .map((r) => r.declarations),
            );
            if (effective[p as keyof typeof effective] !== v) continue;
            if (p === 'font-family') continue;
            if (p === 'color' && rule.selector === '.checklist-card li:has(input:checked) label') {
                expect(actual[p]).toBe('var(--color-scs-d2-text-dim)');
                expect(resolve(actual[p] ?? '', globals)).toBe('#4a5a78');
                continue;
            }
            if (p === 'top' && selector.includes('sidebar')) {
                expect(actual[p]).toContain('var(--header-h, 60px)');
                continue;
            }
            if (p === 'z-index') {
                expect(Number(actual[p])).toBeLessThan(40);
                continue;
            }
            if (p === 'scroll-margin-top') {
                expect(actual[p]).toContain('var(--header-h, 60px)');
                continue;
            }
            if (p === 'overflow-x' && selector.split(',').every((s) => s.trim() === '.scs-domain2-page')) {
                expect(actual[p]).toBe('clip');
                continue;
            }
            if (p === 'word-break' || (p === 'overflow-wrap' && 'word-break' in rule.declarations)) {
                expect(actual['overflow-wrap']).toBe('anywhere');
                continue;
            }
            expect(resolve(actual[p] ?? '', pageVariables), selector + ' ' + p).toBe(
                resolve(v.replace('var(--sidebar-w)', '300px'), source),
            );
        }
    }
});
