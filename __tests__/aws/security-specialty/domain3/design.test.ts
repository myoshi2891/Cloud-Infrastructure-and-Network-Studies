import { readFileSync } from 'node:fs';
import postcss from 'postcss';
import { describe, expect, it } from 'vitest';
import fixture from '@/docs/migration-inventory/aws-scs-c03-domain3-guide.fidelity.json';

const css = readFileSync('app/aws/security-specialty/domain3/page.css', 'utf8');

/** 指定セレクターと media に一致する規則の宣言を収集する。 */
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
    ...rules(css, '.scs-domain3-page'),
};

const source: Record<string, string> = {};
for (const [k, v] of Object.entries(fixture.guideDesign.rules.find((r) => r.selector === ':root')!.declarations)) {
    if (typeof v === 'string') source[k] = v;
}

/** var() を再帰的に解決し、空白除去・小文字化した値を返す。未定義変数は MISSING として残す。 */
const resolve = (v: string, vars: Record<string, string>): string =>
    v
        .replace(/var\((--[\w-]+)\)/g, (_, k: string) => (vars[k] ? resolve(vars[k]!, vars) : 'MISSING:' + k))
        .replace(/\s+/g, '')
        .toLowerCase();

/** 原本のセレクターをページスコープ付きのセレクターへ変換する。 */
const map = (s: string) =>
    s
        .split(',')
        .map((part) =>
            ['html', 'body'].includes(part.trim())
                ? '.scs-domain3-page'
                : '.scs-domain3-page ' +
                  part
                      .trim()
                      .replaceAll('pre.mermaid', '.mermaid-wrap')
                      .replaceAll('pre.code code', 'pre.code .code-line')
                      .replaceAll('pre:not(.mermaid) code', 'pre:not(.mermaid) .code-line')
                      .replace('.main > h2:first-of-type', '.main > .guide-part:first-child > h2:first-of-type'),
        )
        .join(', ');

describe('SCS-C03 Domain 3 — スタイル・デザイン完全移行', () => {
    it('preserves every source CSS declaration and responsive rule (including .mermaid-wrap and pre.code)', () => {
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
                if (p === 'top' && selector.includes('sidebar')) {
                    expect(actual[p]).toContain('var(--header-h, 60px)');
                    continue;
                }
                if (p === 'z-index') {
                    expect(Number(actual[p])).toBeLessThan(45);
                    continue;
                }
                if (p === 'scroll-margin-top') {
                    expect(actual[p]).toContain('var(--header-h, 60px)');
                    continue;
                }
                if (p === 'overflow-x' && selector.split(',').every((s) => s.trim() === '.scs-domain3-page')) {
                    expect(actual[p]).toBe('clip');
                    continue;
                }
                if (p === 'word-break' || (p === 'overflow-wrap' && 'word-break' in rule.declarations)) {
                    expect(actual['overflow-wrap']).toBe('anywhere');
                    continue;
                }
                expect(resolve(actual[p] ?? '', pageVariables), selector + ' ' + p).toBe(
                    resolve(v.replace('var(--sidebar-w)', '280px'), source),
                );
            }
        }
    });

    it('uses theme tokens instead of raw hex colors outside syntax highlighting', () => {
        const offenders: string[] = [];
        postcss.parse(css).walkDecls((d) => {
            const parent = d.parent;
            if (parent?.type === 'rule' && 'selector' in parent && String(parent.selector).includes('.hljs')) return;
            if (/#[\da-f]{3,8}\b/i.test(d.value)) offenders.push(`${String((parent as postcss.Rule).selector)} ${d.prop}: ${d.value}`);
        });
        expect(offenders).toEqual([]);
    });

    it('highlights the NavBar aria-current link like the source .active link', () => {
        const active = rules(css, '.scs-domain3-page .sidebar nav a.active');
        expect(rules(css, ".scs-domain3-page .sidebar nav a[aria-current='location']")).toEqual(active);
        expect(active).toEqual({
            background: 'var(--color-scs-d3-accent-bg)',
            color: 'var(--color-scs-d3-accent)',
            'font-weight': '700',
        });
    });

    it('restores list-style-type for ul and ol stripped by Tailwind Preflight', () => {
        expect(rules(css, '.scs-domain3-page .main ul')['list-style-type']).toBe('disc');
        expect(rules(css, '.scs-domain3-page .main ol')['list-style-type']).toBe('decimal');
        expect(rules(css, '.scs-domain3-page .main ul ul')['list-style-type']).toBe('circle');
        expect(rules(css, '.scs-domain3-page .main ul ul ul')['list-style-type']).toBe('square');
    });
});

