// __tests__/cisco/ccie/service-provider/sections/automation.test.tsx
// @vitest-environment jsdom
import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import AssuranceAutomation from '@/app/cisco/ccie/service-provider/sections/AssuranceAutomation';
import { defineCcieSpSectionSuite, expectedStructures } from '@/__tests__/helpers/ccie-sp-section-suite';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

describe('CCIE Service Provider — AssuranceAutomation セクション', () => {
    it('SNMP の限界の説明が MDT を解説する 9.2.4 節を参照する', () => {
        const { container } = render(<AssuranceAutomation />);
        const paragraph = [...container.querySelectorAll('p')].find((element) => element.textContent?.includes('SNMP の限界'));
        expect(paragraph?.textContent).toContain('（9.2.4 節）');
    });

    it('全13個のテーブルが存在し、すべて thead と th[scope="col"] を持つ', () => {
        const { container } = render(<AssuranceAutomation />);
        const tables = container.querySelectorAll('table');
        expect(tables.length).toBe(13);

        tables.forEach((table, tableIndex) => {
            const thead = table.querySelector('thead');
            expect(thead).not.toBeNull();
            const ths = table.querySelectorAll('th[scope="col"]');
            expect(ths.length).toBe(expectedStructures(AssuranceAutomation).tableColumnHeaders[tableIndex]);
        });
    });

    it('全7個の Mermaid 図 (37〜43) が描画されアクセシビリティラベルを持つ', () => {
        const { container } = render(<AssuranceAutomation />);
        const expectedIds = ['37', '38', '39', '40', '41', '42', '43'];
        expectedIds.forEach((id) => {
            const diag = container.querySelector(`#diag-${id}`);
            expect(diag).not.toBeNull();
            expect(diag?.querySelector('[role="img"]')?.getAttribute('aria-label')?.trim()).toBeTruthy();
        });
    });

    it('全9個のコードブロックが存在し、それぞれ .code-line を持つ', () => {
        const { container } = render(<AssuranceAutomation />);
        const codeBlocks = container.querySelectorAll('.code-block');
        expect(codeBlocks.length).toBe(9);
        codeBlocks.forEach((cb, blockIndex) => {
            expect(cb.querySelectorAll('.code-line').length).toBe(expectedStructures(AssuranceAutomation).codeLines[blockIndex]);
        });
    });
});

defineCcieSpSectionSuite(AssuranceAutomation);
