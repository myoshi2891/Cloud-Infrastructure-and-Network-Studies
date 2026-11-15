import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import postcss from 'postcss';
import design from '@/docs/migration-inventory/devnet-expert.design.json';
import fidelity from '@/docs/migration-inventory/devnet-expert.fidelity.json';

describe('DevNet Expert 原本ライト配色', () => {
    it('keeps smooth root scrolling unless reduced motion is requested', () => {
        const rules: { media: string; value: string }[] = [];
        postcss.parse(readFileSync('app/globals.css', 'utf8')).walkRules(rule => {
            if (rule.selector !== 'html') return;
            rule.walkDecls('scroll-behavior', decl => {
                rules.push({ media: rule.parent?.type === 'atrule' ? rule.parent.params : '', value: decl.value });
            });
        });
        expect(rules).toEqual([
            { media: '', value: 'smooth' },
            { media: '(prefers-reduced-motion: reduce)', value: 'auto' },
        ]);
        expect(readFileSync('scripts/devnet-expert-additions.css', 'utf8')).not.toContain('scroll-behavior');
    });
    it('原本の全13色を変換せずグローバルトークンに保持する', () => {
        const globals: Record<string, string> = {};
        postcss.parse(readFileSync('app/globals.css', 'utf8')).walkDecls(d => { globals[d.prop] = d.value; });
        const source = design.rules.find(r => r.selector === ':root')!;
        Object.entries(source.declarations).filter(([prop]) => !['--serif', '--sans', '--mono'].includes(prop)).forEach(([prop, value]) => {
            expect(globals[`--color-devnet-expert-${prop.slice(2)}`], prop).toBe(value);
        });
        const css = readFileSync('app/cisco/devnet-expert/page.css', 'utf8');
        expect(css).toContain('color-scheme: light');
        expect(css).not.toMatch(/var\(--color-(?:google|gcp|background|foreground|card|muted)/);
        expect(readFileSync('components/Footer.module.css', 'utf8')).toContain('.devnet-expert-page');
    });
    it('uses accessible gold text on paper, white and practice backgrounds', () => {
        const globals: Record<string, string> = {};
        postcss.parse(readFileSync('app/globals.css', 'utf8')).walkDecls(d => { globals[d.prop] = d.value; });
        const luminance = (hex: string) => {
            const channels = hex.slice(1).match(/../g)!.map(value => {
                const channel = parseInt(value, 16) / 255;
                return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
            });
            return channels[0]! * 0.2126 + channels[1]! * 0.7152 + channels[2]! * 0.0722;
        };
        const text = luminance(globals['--color-devnet-expert-gold-text']!);
        for (const background of ['paper', 'surface', 'gold-t']) {
            const light = luminance(globals[`--color-devnet-expert-${background}`]!);
            expect((light + 0.05) / (text + 0.05), background).toBeGreaterThanOrEqual(4.5);
        }
        const colors: Record<string, string> = {};
        postcss.parse(readFileSync('app/cisco/devnet-expert/page.css', 'utf8')).walkRules(rule => {
            rule.walkDecls('color', d => { colors[rule.selector] = d.value; });
        });
        for (const selector of ['.eyebrow', '.callout-head']) {
            expect(colors[`.devnet-expert-page ${selector}`]).toBe('var(--color-devnet-expert-gold-text)');
        }
        expect(colors['.devnet-expert-page .callout.source .callout-head']).toBe('var(--color-devnet-expert-forest)');
        expect(colors['.devnet-expert-page .callout.note .callout-head']).toBe('var(--color-devnet-expert-plum)');
        expect(globals['--color-devnet-expert-gold']).toBe('#B8802A');
    });
    it('Mermaidの全配色・配置設定を原本と一致させ強制ダーク描画を無効にする', () => {
        const config = JSON.parse(readFileSync('app/cisco/devnet-expert/mermaid-theme.json', 'utf8'));
        expect(config).toEqual({ ...fidelity.guideInteractions.mermaidConfig, sequence: { useMaxWidth: false }, pie: { useMaxWidth: false } });
        const component = readFileSync('app/cisco/devnet-expert/Diagram.tsx', 'utf8');
        expect(component).toContain('theme="light"');
        expect(component).toContain('preserveChartTheme');
    });
});
