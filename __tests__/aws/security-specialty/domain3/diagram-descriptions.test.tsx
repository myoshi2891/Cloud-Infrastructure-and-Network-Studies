// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Page from '@/app/aws/security-specialty/domain3/page';
import { DIAGRAMS, DIAGRAM_DESCRIPTIONS } from '@/app/aws/security-specialty/domain3/constants';

vi.mock('@/components/MermaidDiagram', async () => ({
    MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock,
}));

const diagramIdOf = (chart: string): string | undefined => {
    const body = chart.slice(chart.indexOf('\n---\n') + 5);
    return Object.entries(DIAGRAMS).find(([, dsl]) => dsl === body)?.[0];
};

describe('SCS Domain 3 図のテキスト代替', () => {
    it('全21図に説明を1件ずつ用意する', () => {
        expect(Object.keys(DIAGRAMS)).toHaveLength(21);
        expect(Object.keys(DIAGRAM_DESCRIPTIONS).sort()).toEqual(Object.keys(DIAGRAMS).sort());
    });

    it('描画した各図が aria-describedby で見出しと異なる固有の説明へ関連付く', () => {
        const { container } = render(<Page />);
        const diagrams = [...container.querySelectorAll('[data-testid="mermaid-diagram"]')];

        expect(diagrams).toHaveLength(21);
        const texts = diagrams.map((diagram) => {
            const id = diagramIdOf(diagram.getAttribute('data-chart') ?? '');
            const describedBy = diagram.getAttribute('aria-describedby');
            const description = describedBy ? document.getElementById(describedBy)?.textContent ?? '' : '';
            expect(id, '図の DSL が DIAGRAMS と一致しない').toBeDefined();
            expect(description).toBe(id ? DIAGRAM_DESCRIPTIONS[id as keyof typeof DIAGRAM_DESCRIPTIONS] : undefined);
            expect(description).not.toBe(diagram.getAttribute('aria-label'));
            return description;
        });
        expect(new Set(texts).size).toBe(21);
    });
});
