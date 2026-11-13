import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import postcss from 'postcss';
import design from '@/docs/migration-inventory/devnet-expert.design.json';
import fidelity from '@/docs/migration-inventory/devnet-expert.fidelity.json';

describe('DevNet Expert 原本ライト配色', () => {
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
    it('Mermaidの全配色・配置設定を原本と一致させ強制ダーク描画を無効にする', () => {
        const config = JSON.parse(readFileSync('app/cisco/devnet-expert/mermaid-theme.json', 'utf8'));
        expect(config).toEqual({ ...fidelity.guideInteractions.mermaidConfig, sequence: { useMaxWidth: false }, pie: { useMaxWidth: false } });
        const component = readFileSync('app/cisco/devnet-expert/Diagram.tsx', 'utf8');
        expect(component).toContain('theme="light"');
        expect(component).toContain('preserveChartTheme');
    });
});
