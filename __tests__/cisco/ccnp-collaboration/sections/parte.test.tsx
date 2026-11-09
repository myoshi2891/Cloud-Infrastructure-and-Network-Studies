// __tests__/cisco/ccnp-collaboration/sections/parte.test.tsx
// @vitest-environment jsdom
import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import PartE from '@/app/cisco/ccnp-collaboration/sections/PartE';
import { defineCcnpCollabSectionSuite, expectedStructures } from '@/__tests__/helpers/ccnp-collab-section-suite';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

describe('CCNP Collaboration — PartE (300-835 CLAUTO) セクション', () => {
    it('全25個のテーブルが存在し、すべて thead と th[scope="col"] を持つ', () => {
        const { container } = render(<PartE />);
        const tables = container.querySelectorAll('table');
        expect(tables.length).toBe(25);

        tables.forEach((table, tableIndex) => {
            const thead = table.querySelector('thead');
            expect(thead).not.toBeNull();
            const ths = table.querySelectorAll('th[scope="col"]');
            expect(ths.length).toBe(expectedStructures(PartE).tableColumnHeaders[tableIndex]);
        });
    });

    it('全10個の Mermaid 図 (d73〜d82) が描画されアクセシビリティラベルを持つ', () => {
        const { container } = render(<PartE />);
        for (let i = 73; i <= 82; i++) {
            const id = `d${i}`;
            const diag = container.querySelector(`#diag-${id}`);
            expect(diag).not.toBeNull();
            expect(diag?.querySelector('[role="img"]')?.getAttribute('aria-label')?.trim()).toBeTruthy();
        }
    });

    it('8個のコードブロックが存在し、.code-line でラップされている', () => {
        const { container } = render(<PartE />);
        const codeBlocks = container.querySelectorAll('.code-block');
        expect(codeBlocks.length).toBe(8);
    });
});

defineCcnpCollabSectionSuite(PartE);

