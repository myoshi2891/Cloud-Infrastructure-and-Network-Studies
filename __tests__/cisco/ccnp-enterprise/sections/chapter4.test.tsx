// __tests__/cisco/ccnp-enterprise/sections/chapter4.test.tsx
// @vitest-environment jsdom
import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Chapter4 from '@/app/cisco/ccnp-enterprise/sections/Chapter4';
import { defineCcnpEnterpriseSectionSuite, expectedStructures } from '@/__tests__/helpers/ccnp-enterprise-section-suite';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

describe('CCNP Enterprise — Chapter4 セクション', () => {
    it('全3個のテーブルが存在し、すべて thead と th[scope="col"] を持つ', () => {
        const { container } = render(<Chapter4 />);
        const tables = container.querySelectorAll('table');
        expect(tables.length).toBe(3);

        tables.forEach((table, tableIndex) => {
            const thead = table.querySelector('thead');
            expect(thead).not.toBeNull();
            const ths = table.querySelectorAll('th[scope="col"]');
            expect(ths.length).toBe(expectedStructures(Chapter4).tableColumnHeaders[tableIndex]);
        });
    });

    it('1個の Mermaid 図 (dg28) が描画されアクセシビリティラベルを持つ', () => {
        const { container } = render(<Chapter4 />);
        const diag = container.querySelector('#diag-dg28');
        expect(diag).not.toBeNull();
        expect(diag?.querySelector('[role="img"]')?.getAttribute('aria-label')?.trim()).toBeTruthy();
    });
});

defineCcnpEnterpriseSectionSuite(Chapter4);

