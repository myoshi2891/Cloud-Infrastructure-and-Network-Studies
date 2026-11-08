// __tests__/cisco/ccnp-collaboration/sections/parta.test.tsx
// @vitest-environment jsdom
import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import PartA from '@/app/cisco/ccnp-collaboration/sections/PartA';
import { defineCcnpCollabSectionSuite, expectedStructures } from '@/__tests__/helpers/ccnp-collab-section-suite';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

describe('CCNP Collaboration — PartA (350-801 CLCOR) セクション', () => {
    it('全59個のテーブルが存在し、すべて thead と th[scope="col"] を持つ', () => {
        const { container } = render(<PartA />);
        const tables = container.querySelectorAll('table');
        expect(tables.length).toBe(59);

        tables.forEach((table, tableIndex) => {
            const thead = table.querySelector('thead');
            expect(thead).not.toBeNull();
            const ths = table.querySelectorAll('th[scope="col"]');
            expect(ths.length).toBe(expectedStructures(PartA).tableColumnHeaders[tableIndex]);
        });
    });

    it('全29個の Mermaid 図 (d5〜d33) が描画されアクセシビリティラベルを持つ', () => {
        const { container } = render(<PartA />);
        for (let i = 5; i <= 33; i++) {
            const id = `d${i}`;
            const diag = container.querySelector(`#diag-${id}`);
            expect(diag).not.toBeNull();
            expect(diag?.querySelector('[role="img"]')?.getAttribute('aria-label')?.trim()).toBeTruthy();
        }
    });

    it('6個のコードブロックが存在し、.code-line でラップされている', () => {
        const { container } = render(<PartA />);
        const codeBlocks = container.querySelectorAll('.code-block');
        expect(codeBlocks.length).toBe(6);
        expect(codeBlocks[0]?.textContent).toContain('nslookup');
    });
});

defineCcnpCollabSectionSuite(PartA);
