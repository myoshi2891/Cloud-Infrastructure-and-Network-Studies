import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import postcss from 'postcss';
import { describe, expect, it } from 'vitest';
import { snapshotGuideDesign } from '@/scripts/guide-fidelity-extraction.mjs';

const html = readFileSync('Aws-sap-c02-domain1 organizational-complexity-guide.html', 'utf8');
const guideDesign = snapshotGuideDesign(new JSDOM(html).window.document);
const css = readFileSync('app/aws/solutions-architect-professional/domain1/page.css', 'utf8');

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

const source: Record<string, string> = {};
for (const [k, v] of Object.entries(guideDesign.rules.find((r) => r.selector === ':root')!.declarations)) {
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
        .map((part) => {
            const trimmed = part.trim();
            if (['html', 'body'].includes(trimmed)) return '.sap-domain1-page';
            return (
                '.sap-domain1-page ' +
                trimmed
                    .replaceAll('pre.mermaid', '.mermaid-wrap')
                    .replaceAll('pre.code-block', '.code-block')
                    .replaceAll('code:not(pre code)', 'code:not(.code-block code)')
            );
        })
        .join(', ');

describe('SAP-C02 Domain 1 CSS & Design Fidelity', () => {
    it('preserves every source CSS declaration and responsive rule', () => {
        for (const rule of guideDesign.rules) {
            if (rule.selector === ':root') continue;
            const selector = map(rule.selector);
            const actual = rules(css, selector, rule.media);
            for (const [p, v] of Object.entries(rule.declarations)) {
                if (typeof v !== 'string') continue;
                if (p === 'font-family') continue;
                if (p === 'color' && v === '#6b7489') {
                    expect(resolve(actual[p] ?? '', globals)).toBe('#697287');
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
                if (p === 'overflow-x' && selector.split(',').every((s) => s.trim() === '.sap-domain1-page')) {
                    expect(actual[p]).toBe('clip');
                    continue;
                }
                if (p === 'word-break' || (p === 'overflow-wrap' && ['break-word', 'anywhere'].includes(v))) {
                    expect(actual['overflow-wrap']).toBe('anywhere');
                    continue;
                }
                expect(resolve(actual[p] ?? '', globals), `${selector} ${p}`).toBe(
                    resolve(v.replace('var(--sidebar-w)', '340px'), source),
                );
            }
        }
    });

    function lists(text: string) {
        expect(rules(text, '.sap-domain1-page .main ul')['list-style-type']).toBe('disc');
        expect(rules(text, '.sap-domain1-page .main ol')['list-style-type']).toBe('decimal');
        expect(rules(text, '.sap-domain1-page .main ul, .sap-domain1-page .main ol')).toMatchObject({
            'padding-left': '1.4em',
            'list-style-position': 'outside',
        });
        expect(rules(text, '.sap-domain1-page .main li').display).toBe('list-item');
        expect(rules(text, '.sap-domain1-page .main ul ul, .sap-domain1-page .main ol ul')['list-style-type']).toBe(
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
        expect(css).not.toMatch(/@layer|^[ \t]*--[\w-]+\s*:/m);
        expect(rules(css, '.sap-domain1-page')['color-scheme']).toBe('light');
        expect(rules(css, '.sap-domain1-page .main').width).toBe('calc(100% - 340px)');
        expect(rules(css, '.sap-domain1-page .main', '(max-width: 980px)').width).toBe('100%');
        expect(rules(css, '.sap-domain1-page .sidebar:not(.open)', '(max-width: 980px)').visibility).toBe('hidden');
        expect(rules(css, '.sap-domain1-page .mermaid-wrap > [role="img"]')).toMatchObject({
            background: 'transparent',
            border: 'none',
            padding: '0',
        });
    });
});
