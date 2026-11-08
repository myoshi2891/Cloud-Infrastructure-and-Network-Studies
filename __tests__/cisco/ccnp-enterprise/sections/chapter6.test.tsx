// __tests__/cisco/ccnp-enterprise/sections/chapter6.test.tsx
// @vitest-environment jsdom
import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Chapter6 from '@/app/cisco/ccnp-enterprise/sections/Chapter6';
import { defineCcnpEnterpriseSectionSuite, expectedStructures } from '@/__tests__/helpers/ccnp-enterprise-section-suite';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

describe('CCNP Enterprise — Chapter6 セクション', () => {
    it('全1個のテーブルが存在し、すべて thead と th[scope="col"] を持つ', () => {
        const { container } = render(<Chapter6 />);
        const tables = container.querySelectorAll('table');
        expect(tables.length).toBe(1);

        tables.forEach((table, tableIndex) => {
            const thead = table.querySelector('thead');
            expect(thead).not.toBeNull();
            const ths = table.querySelectorAll('th[scope="col"]');
            expect(ths.length).toBe(expectedStructures(Chapter6).tableColumnHeaders[tableIndex]);
        });
    });
});

defineCcnpEnterpriseSectionSuite(Chapter6);
