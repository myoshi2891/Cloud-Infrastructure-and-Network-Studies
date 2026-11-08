// __tests__/cisco/ccnp-enterprise/sections/chapter3.test.tsx
// @vitest-environment jsdom
import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Chapter3 from '@/app/cisco/ccnp-enterprise/sections/Chapter3';
import { defineCcnpEnterpriseSectionSuite, expectedStructures } from '@/__tests__/helpers/ccnp-enterprise-section-suite';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

describe('CCNP Enterprise — Chapter3 セクション', () => {
    it('全32個のテーブルが存在し、すべて thead と th[scope="col"] を持つ', () => {
        const { container } = render(<Chapter3 />);
        const tables = container.querySelectorAll('table');
        expect(tables.length).toBe(32);

        tables.forEach((table, tableIndex) => {
            const thead = table.querySelector('thead');
            expect(thead).not.toBeNull();
            const ths = table.querySelectorAll('th[scope="col"]');
            expect(ths.length).toBe(expectedStructures(Chapter3).tableColumnHeaders[tableIndex]);
        });
    });

    it('全10個の Mermaid 図 (dg18..dg27) が描画されアクセシビリティラベルを持つ', () => {
        const { container } = render(<Chapter3 />);
        const expectedIds = [
            'dg18', 'dg19', 'dg20', 'dg21', 'dg22',
            'dg23', 'dg24', 'dg25', 'dg26', 'dg27',
        ];
        expectedIds.forEach((id) => {
            const diag = container.querySelector(`#diag-${id}`);
            expect(diag).not.toBeNull();
            expect(diag?.querySelector('[role="img"]')?.getAttribute('aria-label')?.trim()).toBeTruthy();
        });
    });

    it('全12個のコードブロックが存在し、.code-line で行が構成されている', () => {
        const { container } = render(<Chapter3 />);
        const blocks = container.querySelectorAll('.code-block');
        expect(blocks.length).toBe(12);
        blocks.forEach((block) => {
            expect(block.querySelectorAll('.code-line').length).toBeGreaterThan(0);
        });
    });
});

defineCcnpEnterpriseSectionSuite(Chapter3);

