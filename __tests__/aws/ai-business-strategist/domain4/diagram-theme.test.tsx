// @vitest-environment jsdom
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Page from '@/app/aws/ai-business-strategist/domain4/page';
import sourceTheme from '@/app/aws/ai-business-strategist/domain4/mermaid-theme.json';
import { DIAGRAMS } from '@/app/aws/ai-business-strategist/domain4/constants';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

const pageCss = readFileSync(resolve('app/aws/ai-business-strategist/domain4/page.css'), 'utf8');

describe('aws-ai-business-strategist-domain4 — Mermaid ライトテーマ・ラッパー透過・二重カード防止', () => {
    it('mermaid-theme.json がグローバル dark テーマの漏洩を防ぐ全ライト変数を明示定義している', () => {
        const tv = sourceTheme.themeVariables as Record<string, string>;
        expect(tv.background).toBe('#ffffff');
        expect(tv.mainBkg).toBe('#ffffff');
        expect(tv.nodeBkg).toBe('#ffffff');
        expect(tv.nodeBorder).toBe('#9b927c');
        expect(tv.primaryColor).toBe('#ffffff');
        expect(tv.primaryTextColor).toBe('#25221c');
        expect(tv.primaryBorderColor).toBe('#9b927c');
        expect(tv.lineColor).toBe('#6b6452');
        expect(tv.defaultLinkColor).toBe('#6b6452');
        expect(tv.textColor).toBe('#25221c');
        expect(tv.nodeTextColor).toBe('#25221c');
        expect(tv.edgeLabelBackground).toBe('#ffffff');
        expect(tv.secondaryColor).toBe('#f3eee2');
        expect(tv.tertiaryColor).toBe('#f3eee2');
        expect(tv.clusterBkg).toBe('#f3eee2');
        expect(tv.clusterBorder).toBe('#ded6c4');
        expect(tv.titleColor).toBe('#25221c');
    });

    it('全 12 個の図 d0〜d11 が定義されている', () => {
        expect(Object.keys(DIAGRAMS)).toHaveLength(12);
        for (let i = 0; i < 12; i++) {
            const key = `d${i}` as keyof typeof DIAGRAMS;
            expect(DIAGRAMS[key]).toBeTruthy();
        }
    });

    it('page.css で .diagram-canvas 直下の [role="img"] ラッパー背景・枠線・余白が透過リセットされている', () => {
        const match = pageCss.match(
            /\.aib-domain4-page\s+\.diagram-canvas\s*>\s*\[role="img"\]\s*\{([^}]*)\}/,
        );
        expect(match).not.toBeNull();
        const body = match?.[1] ?? '';
        expect(body).toMatch(/background:\s*transparent/);
        expect(body).toMatch(/border:\s*(none|0)/);
        expect(body).toMatch(/padding:\s*0/);
        expect(body).toMatch(/margin:\s*0/);
    });

    it('ページ内の .diagram-card が二重ネストにならず、全 12 図と 1 対 1 で対応している', () => {
        const { container } = render(<Page />);
        const cards = [...container.querySelectorAll('.diagram-card')];
        expect(cards).toHaveLength(12);
        cards.forEach((card) => {
            expect(card.querySelectorAll('.diagram-card')).toHaveLength(0);
        });
    });

    it('内側の MermaidDiagram ([data-testid="mermaid-diagram"]) が focusable (tabIndex=0) と一意の aria-label を持ち、重複する aria-describedby を持たない', () => {
        const { container } = render(<Page />);
        const diagrams = [...container.querySelectorAll('[data-testid="mermaid-diagram"]')];
        expect(diagrams).toHaveLength(12);
        diagrams.forEach((diag) => {
            expect(diag.getAttribute('tabindex')).toBe('0');
            expect(diag.getAttribute('aria-describedby')).toBeNull();
            expect(diag.getAttribute('aria-label')?.trim()).toBeTruthy();
        });
        const labels = diagrams.map((diag) => diag.getAttribute('aria-label'));
        expect(new Set(labels).size).toBe(12);
    });
});
