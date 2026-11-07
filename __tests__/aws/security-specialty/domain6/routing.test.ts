import { readFileSync } from 'node:fs';
import postcss from 'postcss';
import { describe, expect, it } from 'vitest';
import { EXAMS } from '@/app/constants';
import fixture from '@/docs/migration-inventory/aws-scs-c03-domain6-guide.fidelity.json';

describe('SCS-C03 Domain 6 — 基盤ルーティング・テーマ設定', () => {
    it('registers domain 6 in app/constants.ts with 14% allocation and valid href', () => {
        const scs = EXAMS.find((e) => e.id === 'aws-scs');
        expect(scs).toBeDefined();
        const domain6 = scs?.domains?.find((d) => d.href === '/aws/security-specialty/domain6');
        expect(domain6).toBeDefined();
        expect(domain6?.label).toContain('ドメイン6');
        expect(domain6?.pct).toBe('14%');
        expect(scs?.description).toContain('ドメイン1・2・3・4・5・6詳細ガイドも収録');
    });

    it('declares .scs-domain6-page in components/Footer.module.css light theme selector', () => {
        const footerCss = readFileSync('components/Footer.module.css', 'utf8');
        expect(footerCss).toContain('.scs-domain6-page');
    });

    it('declares all domain 6 color tokens in app/globals.css root @theme', () => {
        const themeTokens: Record<string, string> = {};
        postcss.parse(readFileSync('app/globals.css', 'utf8')).walkDecls((d) => {
            const parent = d.parent;
            if (parent?.type === 'atrule' && (parent as postcss.AtRule).name === 'theme' && parent.parent?.type === 'root') {
                themeTokens[d.prop] = d.value;
            }
        });

        const expectedTokens: Record<string, string> = {
            '--color-scs-d6-bg': '#f5f7fc',
            '--color-scs-d6-bg-card': '#ffffff',
            '--color-scs-d6-bg-card-2': '#eef2fa',
            '--color-scs-d6-border': '#cfd9ec',
            '--color-scs-d6-border-soft': '#e0e7f3',
            '--color-scs-d6-text': '#1b2740',
            '--color-scs-d6-text-dim': '#44546f',
            '--color-scs-d6-text-faint': '#6b7a94',
            '--accent': '#2c52d0',
            '--color-scs-d6-accent': '#2c52d0',
            '--color-scs-d6-accent-soft': '#a9baf0',
            '--color-scs-d6-accent-bg': '#e7edfc',
            '--color-scs-d6-danger': '#c0304f',
            '--color-scs-d6-danger-bg': '#fdecef',
            '--color-scs-d6-warn': '#a65d0a',
            '--color-scs-d6-warn-bg': '#fff2df',
            '--color-scs-d6-success': '#1f7a4d',
            '--color-scs-d6-success-bg': '#e6f6ee',
            '--color-scs-d6-sidebar-bg': '#ffffff',
            '--color-scs-d6-strong': '#0c1630',
            '--color-scs-d6-code-inline': '#8a4208',
            '--color-scs-d6-code-bg': '#fff3e2',
            '--color-scs-d6-code-border': '#f1d6ad',
            '--color-scs-d6-code-line': '#24292e',
        };

        for (const [k, v] of Object.entries(expectedTokens)) {
            if (k === '--accent') continue;
            expect(themeTokens[k], `${k} should match expected hex`).toBe(v);
        }
    });
});
