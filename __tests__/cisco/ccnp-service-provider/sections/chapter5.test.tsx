// __tests__/cisco/ccnp-service-provider/sections/chapter5.test.tsx
// @vitest-environment jsdom
import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Chapter5 from '@/app/cisco/ccnp-service-provider/sections/Chapter5';
import { defineCcnpServiceProviderSectionSuite, expectedStructures } from '@/__tests__/helpers/ccnp-sp-section-suite';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

describe('CCNP Service Provider — Chapter 5 セクション', () => {
    it('全19個のテーブルが存在し、すべて thead と th[scope="col"] を持つ', () => {
        const { container } = render(<Chapter5 />);
        const tables = container.querySelectorAll('table');
        expect(tables.length).toBe(19);

        tables.forEach((table, tableIndex) => {
            const thead = table.querySelector('thead');
            expect(thead).not.toBeNull();
            const ths = table.querySelectorAll('th[scope="col"]');
            expect(ths.length).toBe(expectedStructures(Chapter5).tableColumnHeaders[tableIndex]);
        });
    });

    it('全9個の Mermaid 図 (d4〜d12) が描画されアクセシビリティラベルを持つ', () => {
        const { container } = render(<Chapter5 />);
        const expectedIds = ['d4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd10', 'd11', 'd12'];
        expectedIds.forEach((id) => {
            const diag = container.querySelector(`#diag-${id}`);
            expect(diag).not.toBeNull();
            expect(diag?.querySelector('[role="img"]')?.getAttribute('aria-label')?.trim()).toBeTruthy();
        });
    });

    it('全8個のコードブロックが存在し、すべて .code-line でラップされている', () => {
        const { container } = render(<Chapter5 />);
        const codeBlocks = container.querySelectorAll('.code-block');
        expect(codeBlocks.length).toBe(8);

        const expected = expectedStructures(Chapter5).codeLines;
        codeBlocks.forEach((block, index) => {
            const lines = block.querySelectorAll('.code-line');
            expect(lines.length).toBe(expected[index]);
        });
    });

    it('h2 見出し「5. Part A：コア試験 350-501 SPCOR」が存在する', () => {
        const { container } = render(<Chapter5 />);
        const h2 = container.querySelector('h2');
        expect(h2?.textContent?.trim()).toBe('5. Part A：コア試験 350-501 SPCOR');
    });

    it('Chapter 5 内の全19個の h5 見出しが存在し、テキストが順序どおり一致する', () => {
        const { container } = render(<Chapter5 />);
        const h5s = [...container.querySelectorAll('h5')].map((el) =>
            (el.textContent ?? '').replace(/\s+/g, ' ').trim(),
        );
        expect(h5s).toHaveLength(19);
        expect(h5s[0]).toBe('① 1.1.a コアアーキテクチャ');
        expect(h5s[18]).toBe('④ 1.7.d MACsec');
    });
});

defineCcnpServiceProviderSectionSuite(Chapter5);

