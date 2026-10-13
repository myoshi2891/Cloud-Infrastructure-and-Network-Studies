import { readFileSync } from 'node:fs';
import postcss from 'postcss';
import { describe, expect, it } from 'vitest';
import fixture from '@/docs/migration-inventory/aws-aip-c01-guide.fidelity.json';

const css = readFileSync('app/aws/generative-ai-developer-professional/page.css', 'utf8');
const parsed = postcss.parse(css);
const compact = (value: string) => value.replace(/\s+/g, ' ').trim();
const declarations = (selector: string, media = '') => {
    const result: Record<string, string> = {};
    parsed.walkRules(rule => {
        const context = rule.parent?.type === 'atrule' ? rule.parent.params : '';
        if (compact(rule.selector) !== compact(selector) || context !== media) return;
        rule.walkDecls(decl => { result[decl.prop] = decl.value; });
    });
    return result;
};

describe('AIP source visual declarations', () => {
    it('preserves every applicable original dimension, spacing, typography and interaction declaration', () => {
        for (const rule of fixture.guideDesign.rules) {
            if (/^:root$|^html,|checklist|ref-grid|ref-card|practice-label|aside\.footnotes/.test(rule.selector)) continue;
            const selector = rule.selector === 'body' ? '.aip-guide-page' : rule.selector.split(',').map(part => `.aip-guide-page ${part.trim().replaceAll('pre.mermaid', '.mermaid-wrap').replace('.main > h2:first-of-type', '.guide-part:first-child > h2:first-of-type')}`).join(', ');
            const actual = declarations(selector, rule.media);
            expect(Object.keys(actual), selector).not.toHaveLength(0);
            for (const [prop, value] of Object.entries(rule.declarations)) {
                // Theme remapping and shared Header offsets are explicitly allowed by the migration contract.
                if (/background|color|border|box-shadow/.test(prop) && /#|rgba|var\(/.test(value)) continue;
                if (['font-family', 'word-break', 'overflow-wrap', 'scroll-margin-top', 'z-index'].includes(prop)) continue;
                if (prop === 'top' && /sidebar/.test(selector)) continue;
                expect(compact(actual[prop] ?? ''), `${selector} ${prop}`).toBe(compact(value.replace('var(--sidebar-w)', '300px')));
            }
        }
    });
    it('restores browser defaults, markers, single diagram card and header-safe positioning', () => {
        expect(declarations('.aip-guide-page .main ul')['list-style-type']).toBe('disc');
        expect(declarations('.aip-guide-page .main ol')['list-style-type']).toBe('decimal');
        expect(declarations('.aip-guide-page .main ul, .aip-guide-page .main ol')['padding-left']).toBe('1.4em');
        expect(declarations('.aip-guide-page .main h4')).toMatchObject({ 'font-size': '1em', 'font-weight': '700', margin: '1.33em 0' });
        expect(declarations('.aip-guide-page .mermaid-wrap > [role="img"]')).toMatchObject({ background: 'transparent', border: 'none', padding: '0' });
        expect(declarations('.aip-guide-page .sidebar').top).toContain('var(--header-h, 60px)');
        expect(declarations('.aip-guide-page .main').width).toBe('calc(100% - 300px)');
        expect(declarations('.aip-guide-page .main', '(max-width: 980px)').width).toBe('100%');
        expect(css).not.toMatch(/@layer|^[ \t]*--[\w-]+\s*:/m);
        expect(css).not.toMatch(/svg\s*\{[^}]*max-width:\s*100%/s);
    });
    it('keeps every border, gradient and accent through defined global theme tokens', () => {
        const globals = readFileSync('app/globals.css', 'utf8');
        for (const [, name] of css.matchAll(/var\((--[\w-]+)/g)) {
            if (name === '--disclaimer-height') continue;
            expect(globals, name).toContain(`${name}:`);
        }
        expect(declarations('.aip-guide-page .hero h1').background).toBe('linear-gradient(135deg, var(--color-foreground) 0%, var(--color-accent) 100%)');
        expect(declarations('.aip-guide-page .callout-practice')['border-left']).toBe('4px solid var(--color-pcd-success)');
        expect(declarations('.aip-guide-page .pill')['border-radius']).toBe('999px');
    });
});
