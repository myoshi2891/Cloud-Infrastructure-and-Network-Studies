// __tests__/cisco/ccie/service-provider/sections/corerouting.test.tsx
// @vitest-environment jsdom
import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import CoreRouting from '@/app/cisco/ccie/service-provider/sections/CoreRouting';
import { defineCcieSpSectionSuite, expectedStructures } from '@/__tests__/helpers/ccie-sp-section-suite';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

describe('CCIE Service Provider — CoreRouting セクション', () => {
    it('コード例で隣接へ適用する route-policy はすべて同じセクション内で定義されている', () => {
        // Arrange
        const { container } = render(<CoreRouting />);
        const code = [...container.querySelectorAll('.code-line')].map((line) => line.textContent ?? '').join('\n');

        // Act
        const attached = [...code.matchAll(/^\s+route-policy (\S+) (?:in|out)$/gm)].map((match) => match[1]);
        const defined = new Set([...code.matchAll(/^route-policy (\S+)$/gm)].map((match) => match[1]));

        // Assert
        expect(attached).toContain('PEER-OUT');
        expect(attached.filter((name) => !defined.has(name))).toEqual([]);
    });

    it('全30個のテーブルが存在し、すべて thead と th[scope="col"] を持つ', () => {
        const { container } = render(<CoreRouting />);
        const tables = container.querySelectorAll('table');
        expect(tables.length).toBe(30);

        tables.forEach((table, tableIndex) => {
            const thead = table.querySelector('thead');
            expect(thead).not.toBeNull();
            const ths = table.querySelectorAll('th[scope="col"]');
            expect(ths.length).toBe(expectedStructures(CoreRouting).tableColumnHeaders[tableIndex]);
        });
    });

    it('全12個の Mermaid 図 (4〜15) が描画されアクセシビリティラベルを持つ', () => {
        const { container } = render(<CoreRouting />);
        const expectedIds = ['4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
        expectedIds.forEach((id) => {
            const diag = container.querySelector(`#diag-${id}`);
            expect(diag).not.toBeNull();
            expect(diag?.querySelector('[role="img"]')?.getAttribute('aria-label')?.trim()).toBeTruthy();
        });
    });

    it('全16個のコードブロックが存在し、それぞれ .code-line を持つ', () => {
        const { container } = render(<CoreRouting />);
        const codeBlocks = container.querySelectorAll('.code-block');
        expect(codeBlocks.length).toBe(16);
        codeBlocks.forEach((cb, blockIndex) => {
            expect(cb.querySelectorAll('.code-line').length).toBe(expectedStructures(CoreRouting).codeLines[blockIndex]);
        });
    });
});

defineCcieSpSectionSuite(CoreRouting);
