import { readFileSync } from 'node:fs';
import postcss from 'postcss';
import { describe, expect, it } from 'vitest';
import fixture from '@/docs/migration-inventory/aws-aip-c01-domain2-guide.fidelity.json';

const css = readFileSync('app/aws/generative-ai-developer-professional/domain2/page.css', 'utf8');
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

describe('AIP domain2 source visual declarations', () => {
    it('preserves every used source color, gradient, border and shadow in light mode', () => {
        const tokens: Record<string, string> = {};
        postcss.parse(readFileSync('app/globals.css', 'utf8')).walkDecls(decl => {
            if (decl.prop.startsWith('--')) tokens[decl.prop] = decl.value;
        });
        const sourceTokens = fixture.guideDesign.rules.find(rule => rule.selector === ':root')?.declarations ?? {};
        const resolve = (value: string, vars: Record<string, string>): string => value.replace(/var\((--[\w-]+)\)/g, (_, name: string) => vars[name] ?? `MISSING:${name}`).replace(/\s+/g, '').toLowerCase();
        for (const rule of fixture.guideDesign.rules) {
            if (rule.selector === ':root' || rule.selector === 'aside.footnotes') continue;
            const selector = rule.selector === 'body' ? '.aip-domain2-page' : rule.selector.split(',').map(part => `.aip-domain2-page ${part.trim().replaceAll('pre.mermaid', '.mermaid-wrap').replaceAll('pre.code-block', '.code-block').replace('.main > h2:first-of-type', '.guide-part:first-child > h2:first-of-type')}`).join(', ');
            const actual = declarations(selector, rule.media);
            for (const [prop, value] of Object.entries(rule.declarations)) {
                if (!/background|color|border|box-shadow/.test(prop) || !/#|rgba|var\(/.test(value)) continue;
                if(prop === 'border-top' && rule.selector === '.main h2'){expect(actual[prop]).toBe('none');continue;}
                if (prop === 'color' && rule.selector === '.callout-practice .label') {
                    expect(resolve(actual[prop] ?? '', tokens)).toBe('#176b40');
                    continue;
                }
                expect(resolve(actual[prop] ?? '', tokens), `${selector}: ${prop}`).toBe(resolve(value, sourceTokens));
            }
        }
        expect(declarations('.aip-domain2-page')['color-scheme']).toBe('light');
    });
    it('preserves every applicable original dimension, spacing, typography and interaction declaration', () => {
        for (const rule of fixture.guideDesign.rules) {
            if (/^:root$|^html,/.test(rule.selector)) continue;
            if (rule.selector === 'aside.footnotes') continue;
            const selector = rule.selector === 'body' ? '.aip-domain2-page' : rule.selector.split(',').map(part => `.aip-domain2-page ${part.trim().replaceAll('pre.mermaid', '.mermaid-wrap').replaceAll('pre.code-block', '.code-block').replace('.main > h2:first-of-type', '.guide-part:first-child > h2:first-of-type')}`).join(', ');
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
        expect(declarations('.aip-domain2-page .main ul')['list-style-type']).toBe('disc');
        expect(declarations('.aip-domain2-page .main ol')['list-style-type']).toBe('decimal');
        expect(declarations('.aip-domain2-page .main ul, .aip-domain2-page .main ol')['padding-left']).toBe('1.4em');
        expect(declarations('.aip-domain2-page .main h4')).toMatchObject({ 'font-size': '1em', 'font-weight': '700', margin: '1.33em 0' });
        expect(declarations('.aip-domain2-page .mermaid-wrap > [role="img"]')).toMatchObject({ background: 'transparent', border: 'none', padding: '0' });
        expect(declarations('.aip-domain2-page .sidebar').top).toContain('var(--header-h, 60px)');
        expect(declarations('.aip-domain2-page .main').width).toBe('calc(100% - 300px)');
        expect(declarations('.aip-domain2-page .main', '(max-width: 980px)').width).toBe('100%');
        expect(css).not.toMatch(/@layer|^[ \t]*--[\w-]+\s*:/m);
        expect(css).not.toMatch(/svg\s*\{[^}]*max-width:\s*100%/s);
    });
    it('keeps reference links distinguishable from surrounding list text', () => {
        expect(declarations('.aip-domain2-page .main li a')['text-decoration']).toBe('underline');
    });
    it('keeps every border, gradient and accent through defined global theme tokens', () => {
        const globals = readFileSync('app/globals.css', 'utf8');
        for (const [, name] of css.matchAll(/var\((--[\w-]+)/g)) {
            if (name === '--disclaimer-height') continue;
            expect(globals, name).toContain(`${name}:`);
        }
        expect(declarations('.aip-domain2-page .hero h1').background).toContain('linear-gradient');
        expect(declarations('.aip-domain2-page .callout-practice')['border-left']).toBe('4px solid var(--color-aip-d2-success)');
        expect(declarations('.aip-domain2-page .pill')['border-radius']).toBe('999px');
    });
});
