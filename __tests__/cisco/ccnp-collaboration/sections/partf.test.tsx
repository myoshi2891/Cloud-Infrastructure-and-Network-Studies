// __tests__/cisco/ccnp-collaboration/sections/partf.test.tsx
// @vitest-environment jsdom
import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import PartF from '@/app/cisco/ccnp-collaboration/sections/PartF';
import { defineCcnpCollabSectionSuite, expectedStructures } from '@/__tests__/helpers/ccnp-collab-section-suite';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

describe('CCNP Collaboration — PartF (試験対策・トラブルシュート) セクション', () => {
    it('全5個のテーブルが存在し、すべて thead と th[scope="col"] を持つ', () => {
        const { container } = render(<PartF />);
        const tables = container.querySelectorAll('table');
        expect(tables.length).toBe(5);

        tables.forEach((table, tableIndex) => {
            const thead = table.querySelector('thead');
            expect(thead).not.toBeNull();
            const ths = table.querySelectorAll('th[scope="col"]');
            expect(ths.length).toBe(expectedStructures(PartF).tableColumnHeaders[tableIndex]);
        });
    });

    it('1個の Mermaid 図 (d83) が描画されアクセシビリティラベルを持つ', () => {
        const { container } = render(<PartF />);
        const diag = container.querySelector('#diag-d83');
        expect(diag).not.toBeNull();
        expect(diag?.querySelector('[role="img"]')?.getAttribute('aria-label')?.trim()).toBeTruthy();
    });
});

defineCcnpCollabSectionSuite(PartF);
