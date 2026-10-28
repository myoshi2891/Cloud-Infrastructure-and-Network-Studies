import { readFileSync } from 'node:fs';
import postcss from 'postcss';
import { expect, it } from 'vitest';
import fixture from '@/docs/migration-inventory/aws-scs-c03-domain1-guide.fidelity.json';

const css = readFileSync('app/aws/security-specialty/domain1/page.css', 'utf8');

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
    ...rules(css, '.scs-domain1-page'),
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
                ? '.scs-domain1-page'
                : '.scs-domain1-page ' +
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
                expect(actual[p]).toBe('var(--color-scs-d1-text-dim)');
                expect(resolve(actual[p] ?? '', globals)).toBe('#4d5b78');
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
            if (p === 'overflow-x' && selector.split(',').every((s) => s.trim() === '.scs-domain1-page')) {
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

function lists(text: string) {
    expect(rules(text, '.scs-domain1-page .main ul')['list-style-type']).toBe('disc');
    expect(rules(text, '.scs-domain1-page .main ol')['list-style-type']).toBe('decimal');
    expect(rules(text, '.scs-domain1-page .main ul, .scs-domain1-page .main ol')).toMatchObject({
        'padding-left': '1.4em',
        'list-style-position': 'outside',
    });
    expect(rules(text, '.scs-domain1-page .main li').display).toBe('list-item');
    expect(rules(text, '.scs-domain1-page .main ul ul, .scs-domain1-page .main ol ul')['list-style-type']).toBe(
        'circle',
    );
}

it('restores markers, numbering and indentation', () => lists(css));

it.each([
    ['list-style-type: disc', 'list-style-type: none'],
    ['list-style-type: decimal', 'list-style-type: none'],
    ['padding-left: 1.4em', 'padding-left: 0'],
    ['display: list-item', 'display: block'],
    ['list-style-type: circle', 'list-style-type: none'],
])('detects destruction of %s', (from, to) => {
    expect(css).toContain(from);
    expect(() => lists(css.replaceAll(from, to))).toThrow();
});

it('isolates styles and provides readable natural diagrams and responsive widths', () => {
    expect(css).not.toMatch(/@layer/);
    postcss.parse(css).walkDecls((d) => {
        if (d.prop.startsWith('--')) {
            expect(d.parent?.type === 'rule' && d.parent.selector).toBe('.scs-domain1-page');
        }
    });
    expect(rules(css, '.scs-domain1-page')['color-scheme']).toBe('light');
    expect(rules(css, '.scs-domain1-page .main').width).toBe('calc(100% - 300px)');
    expect(rules(css, '.scs-domain1-page .main', '(max-width: 980px)').width).toBe('100%');
    expect(rules(css, '.scs-domain1-page .sidebar:not(.open)', '(max-width: 980px)').visibility).toBe('hidden');
    expect(rules(css, '.scs-domain1-page .mermaid-wrap > [role="img"]')).toMatchObject({
        background: 'transparent',
        border: 'none',
        padding: '0',
    });
});

it('keeps fixed sidebar top a valid length expression', () => {
    expect(rules(css, '.scs-domain1-page .sidebar').top).not.toMatch(/\+\s*0\s*\)/);
});

it('keeps diagram scrolling on the named keyboard-focusable outer region', () => {
    expect(rules(css, '.scs-domain1-page .mermaid-wrap')['overflow-x']).toBe('auto');
    expect(rules(css, '.scs-domain1-page .mermaid-wrap > [role="img"]')['overflow-x']).toBe('visible');
});

it('wraps long reference URLs inside the light guide background on narrow screens', () => {
    expect(rules(css, '.scs-domain1-page .main a')['overflow-wrap']).toBe('anywhere');
});

it('disables the sidebar slide transition when reduced motion is requested', () => {
    expect(rules(css, '.scs-domain1-page .sidebar', '(prefers-reduced-motion: reduce)').transition).toBe('none');
});
