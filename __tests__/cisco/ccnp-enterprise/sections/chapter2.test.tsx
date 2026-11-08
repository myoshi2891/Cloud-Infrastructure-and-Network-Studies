// __tests__/cisco/ccnp-enterprise/sections/chapter2.test.tsx
// @vitest-environment jsdom
import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Chapter2 from '@/app/cisco/ccnp-enterprise/sections/Chapter2';
import { defineCcnpEnterpriseSectionSuite, expectedStructures } from '@/__tests__/helpers/ccnp-enterprise-section-suite';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

describe('CCNP Enterprise — Chapter2 セクション', () => {
    it('全41個のテーブルが存在し、すべて thead と th[scope="col"] を持つ', () => {
        const { container } = render(<Chapter2 />);
        const tables = container.querySelectorAll('table');
        expect(tables.length).toBe(41);

        tables.forEach((table, tableIndex) => {
            const thead = table.querySelector('thead');
            expect(thead).not.toBeNull();
            const ths = table.querySelectorAll('th[scope="col"]');
            expect(ths.length).toBe(expectedStructures(Chapter2).tableColumnHeaders[tableIndex]);
        });
    });

    it('全15個の Mermaid 図 (dg3..dg17) が描画されアクセシビリティラベルを持つ', () => {
        const { container } = render(<Chapter2 />);
        const expectedIds = [
            'dg3', 'dg4', 'dg5', 'dg6', 'dg7', 'dg8', 'dg9',
            'dg10', 'dg11', 'dg12', 'dg13', 'dg14', 'dg15', 'dg16', 'dg17',
        ];
        expectedIds.forEach((id) => {
            const diag = container.querySelector(`#diag-${id}`);
            expect(diag).not.toBeNull();
            expect(diag?.querySelector('[role="img"]')?.getAttribute('aria-label')?.trim()).toBeTruthy();
        });
    });

    it('全29個のコードブロックが存在し、.code-line で行が構成されている', () => {
        const { container } = render(<Chapter2 />);
        const blocks = container.querySelectorAll('.code-block');
        expect(blocks.length).toBe(29);
        blocks.forEach((block) => {
            expect(block.querySelectorAll('.code-line').length).toBeGreaterThan(0);
        });
    });
});

defineCcnpEnterpriseSectionSuite(Chapter2);

