// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Page from '@/app/aws/security-specialty/domain5/page';
import { DIAGRAMS, DIAGRAM_DESCRIPTIONS } from '@/app/aws/security-specialty/domain5/constants';
import renderTheme from '@/app/aws/security-specialty/domain5/render-theme.json';

vi.mock('@/components/MermaidDiagram', async () => ({
    MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock,
}));

/** data-chart の設定 frontmatter を除き、DIAGRAMS のキーへ戻す。 */
const diagramIdOf = (chart: string): string | undefined => {
    const body = chart.slice(chart.indexOf('\n---\n') + 5);
    return Object.entries(DIAGRAMS).find(([, dsl]) => dsl === body)?.[0];
};

describe('SCS Domain 5 図のテキスト代替', () => {
    it('全15図に説明を1件ずつ用意する', () => {
        expect(Object.keys(DIAGRAMS)).toHaveLength(15);
        expect(Object.keys(DIAGRAM_DESCRIPTIONS).sort()).toEqual(Object.keys(DIAGRAMS).sort());
    });

    it('描画した各図が完全な render-theme.json の派生色と aria-describedby で固有の説明へ関連付く', () => {
        const { container } = render(<Page />);
        const diagrams = [...container.querySelectorAll('[data-testid="mermaid-diagram"]')];

        expect(diagrams).toHaveLength(15);
        const texts = diagrams.map((diagram) => {
            const chart = diagram.getAttribute('data-chart') ?? '';
            const configLine = chart.split('\n')[1] ?? '';
            const config = JSON.parse(configLine.slice('config: '.length));
            expect(config).toEqual(renderTheme);
            const id = diagramIdOf(chart);
            const describedBy = diagram.getAttribute('aria-describedby');
            const description = describedBy
                ? (document.getElementById(describedBy)?.textContent ?? '')
                : '';
            expect(id, '図の DSL が DIAGRAMS と一致しない').toBeDefined();
            expect(description).toBe(
                id ? DIAGRAM_DESCRIPTIONS[id as keyof typeof DIAGRAM_DESCRIPTIONS] : undefined,
            );
            expect(description).not.toBe(diagram.getAttribute('aria-label'));
            return description;
        });
        expect(new Set(texts).size).toBe(15);
    });

    it('diag-2 の説明は図に描かれたサービスだけを挙げる', () => {
        const chart = DIAGRAMS['diag-2'].replace(/\s+/g, '');
        const description = DIAGRAM_DESCRIPTIONS['diag-2'];

        ['VPCエンドポイント', 'PrivateLink', 'Client VPN', 'Verified Access'].forEach((service) => {
            expect(chart).toContain(service.replace(/\s+/g, ''));
            expect(description).toContain(service);
        });
        ['Site-to-Site VPN', 'Direct Connect'].forEach((service) => {
            expect(chart).not.toContain(service.replace(/\s+/g, ''));
            expect(description).not.toContain(service);
        });
    });

    it('各図が自然倍率と遅延描画を指定されている', () => {
        const { container } = render(<Page />);
        const diagrams = [...container.querySelectorAll('[data-testid="mermaid-diagram"]')];
        expect(diagrams).toHaveLength(15);
        diagrams.forEach((d) => {
            expect(d).toHaveAttribute('data-preserve-natural-scale', 'true');
            expect(d).toHaveAttribute('data-defer-until-visible', 'true');
        });
    });
});

