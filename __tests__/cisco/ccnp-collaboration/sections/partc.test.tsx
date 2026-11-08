// __tests__/cisco/ccnp-collaboration/sections/partc.test.tsx
// @vitest-environment jsdom
import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import PartC from '@/app/cisco/ccnp-collaboration/sections/PartC';
import { defineCcnpCollabSectionSuite, expectedStructures } from '@/__tests__/helpers/ccnp-collab-section-suite';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

describe('CCNP Collaboration — PartC (300-815 CLACCM) セクション', () => {
    it('全28個のテーブルが存在し、すべて thead と th[scope="col"] を持つ', () => {
        const { container } = render(<PartC />);
        const tables = container.querySelectorAll('table');
        expect(tables.length).toBe(28);

        tables.forEach((table, tableIndex) => {
            const thead = table.querySelector('thead');
            expect(thead).not.toBeNull();
            const ths = table.querySelectorAll('th[scope="col"]');
            expect(ths.length).toBe(expectedStructures(PartC).tableColumnHeaders[tableIndex]);
        });
    });

    it('全14個の Mermaid 図 (d44〜d57) が描画されアクセシビリティラベルを持つ', () => {
        const { container } = render(<PartC />);
        for (let i = 44; i <= 57; i++) {
            const id = `d${i}`;
            const diag = container.querySelector(`#diag-${id}`);
            expect(diag).not.toBeNull();
            expect(diag?.querySelector('[role="img"]')?.getAttribute('aria-label')?.trim()).toBeTruthy();
        }
    });

    it('7個のコードブロックが存在し、.code-line でラップされている', () => {
        const { container } = render(<PartC />);
        const codeBlocks = container.querySelectorAll('.code-block');
        expect(codeBlocks.length).toBe(7);
        expect(codeBlocks[0]?.textContent).toContain('voice');
    });
});

defineCcnpCollabSectionSuite(PartC);
