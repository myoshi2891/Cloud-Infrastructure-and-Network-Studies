// __tests__/cisco/ccnp-collaboration/sections/partb.test.tsx
// @vitest-environment jsdom
import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import PartB from '@/app/cisco/ccnp-collaboration/sections/PartB';
import { defineCcnpCollabSectionSuite, expectedStructures } from '@/__tests__/helpers/ccnp-collab-section-suite';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

describe('CCNP Collaboration — PartB (300-810 CLICA) セクション', () => {
    it('全24個のテーブルが存在し、すべて thead と th[scope="col"] を持つ', () => {
        const { container } = render(<PartB />);
        const tables = container.querySelectorAll('table');
        expect(tables.length).toBe(24);

        tables.forEach((table, tableIndex) => {
            const thead = table.querySelector('thead');
            expect(thead).not.toBeNull();
            const ths = table.querySelectorAll('th[scope="col"]');
            expect(ths.length).toBe(expectedStructures(PartB).tableColumnHeaders[tableIndex]);
        });
    });

    it('全10個の Mermaid 図 (d34〜d43) が描画されアクセシビリティラベルを持つ', () => {
        const { container } = render(<PartB />);
        for (let i = 34; i <= 43; i++) {
            const id = `d${i}`;
            const diag = container.querySelector(`#diag-${id}`);
            expect(diag).not.toBeNull();
            expect(diag?.querySelector('[role="img"]')?.getAttribute('aria-label')?.trim()).toBeTruthy();
        }
    });
});

defineCcnpCollabSectionSuite(PartB);
