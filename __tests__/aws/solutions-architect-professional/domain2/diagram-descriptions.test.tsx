// @vitest-environment jsdom
import fs from 'node:fs';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Page from '@/app/aws/solutions-architect-professional/domain2/page';
import { DIAGRAMS } from '@/app/aws/solutions-architect-professional/domain2/constants';
import { DIAGRAM_DESCRIPTIONS } from '@/app/aws/solutions-architect-professional/domain2/diagram-descriptions';

vi.mock('@/components/MermaidDiagram', async () => ({
    MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock,
}));

/** data-chart の設定 frontmatter を除き、DIAGRAMS のキーへ戻す。 */
const diagramIdOf = (chart: string): string | undefined => {
    const body = chart.slice(chart.indexOf('\n---\n') + 5);
    return Object.entries(DIAGRAMS).find(([, dsl]) => dsl === body)?.[0];
};

describe('SAP Domain 2 図のテキスト代替', () => {
    it('全23図に説明を1件ずつ用意する', () => {
        expect(Object.keys(DIAGRAMS)).toHaveLength(23);
        expect(Object.keys(DIAGRAM_DESCRIPTIONS).sort()).toEqual(Object.keys(DIAGRAMS).sort());
    });

    it('描画した各図が aria-describedby で見出しと異なる固有の説明へ関連付く', () => {
        // Arrange & Act
        const { container } = render(<Page />);
        const diagrams = [...container.querySelectorAll('[data-testid="mermaid-diagram"]')];

        // Assert
        expect(diagrams).toHaveLength(23);
        const texts = diagrams.map((diagram) => {
            const id = diagramIdOf(diagram.getAttribute('data-chart') ?? '');
            const describedBy = diagram.getAttribute('aria-describedby');
            const description = describedBy ? document.getElementById(describedBy)?.textContent ?? '' : '';
            expect(id, '図の DSL が DIAGRAMS と一致しない').toBeDefined();
            expect(description).toBe(id ? DIAGRAM_DESCRIPTIONS[id] : undefined);
            expect(description).not.toBe(diagram.getAttribute('aria-label'));
            return description;
        });
        expect(new Set(texts).size).toBe(23);
    });

    it('再生成スクリプトの Diagram テンプレートも説明を関連付ける', () => {
        const script = fs.readFileSync('scripts/migrate-sap-domain2.mjs', 'utf8');
        const template = script.match(/write\('Diagram\.tsx',`([\s\S]*?)`\);/)?.[1] ?? '';
        expect(template).toContain("import {DIAGRAM_DESCRIPTIONS} from './diagram-descriptions';");
        expect(template).toContain('ariaDescribedBy={descriptionId}');
    });
});
