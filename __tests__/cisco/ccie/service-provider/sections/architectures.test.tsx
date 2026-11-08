// __tests__/cisco/ccie/service-provider/sections/architectures.test.tsx
// @vitest-environment jsdom
import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import ArchitecturesServices from '@/app/cisco/ccie/service-provider/sections/ArchitecturesServices';
import { defineCcieSpSectionSuite, expectedStructures } from '@/__tests__/helpers/ccie-sp-section-suite';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

describe('CCIE Service Provider — ArchitecturesServices セクション', () => {
    it('共有サービス VRF の RT 設計は、顧客ごとの戻り経路用 RT を共有 VRF だけが import する', () => {
        // Arrange
        const { container } = render(<ArchitecturesServices />);
        const row = [...container.querySelectorAll('tr')].find((tr) => tr.textContent?.includes('共有サービス VRF'));

        // Act
        const guidance = (row?.querySelectorAll('td')[1]?.textContent ?? '').replace(/\s+/g, ' ');

        // Assert: 顧客 VRF が共有サービス用 RT を export すると、その経路が他顧客の import に一致してしまう
        expect(guidance).toContain('共有サービス専用 RT を全顧客 VRF に import');
        expect(guidance).toContain('各顧客 VRF は顧客ごとに異なる戻り経路用の RT を export');
        expect(guidance).toContain('共有 VRF だけがそれらを import');
        expect(guidance).not.toContain('共有 VRF の RT のみを export');
    });

    it('全33個のテーブルが存在し、すべて thead と th[scope="col"] を持つ', () => {
        const { container } = render(<ArchitecturesServices />);
        const tables = container.querySelectorAll('table');
        expect(tables.length).toBe(33);

        tables.forEach((table, tableIndex) => {
            const thead = table.querySelector('thead');
            expect(thead).not.toBeNull();
            const ths = table.querySelectorAll('th[scope="col"]');
            expect(ths.length).toBe(expectedStructures(ArchitecturesServices).tableColumnHeaders[tableIndex]);
        });
    });

    it('全12個の Mermaid 図 (16〜27) が描画されアクセシビリティラベルを持つ', () => {
        const { container } = render(<ArchitecturesServices />);
        const expectedIds = ['16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27'];
        expectedIds.forEach((id) => {
            const diag = container.querySelector(`#diag-${id}`);
            expect(diag).not.toBeNull();
            expect(diag?.querySelector('[role="img"]')?.getAttribute('aria-label')?.trim()).toBeTruthy();
        });
    });

    it('全6個のコードブロックが存在し、それぞれ .code-line を持つ', () => {
        const { container } = render(<ArchitecturesServices />);
        const codeBlocks = container.querySelectorAll('.code-block');
        expect(codeBlocks.length).toBe(6);
        codeBlocks.forEach((cb, blockIndex) => {
            expect(cb.querySelectorAll('.code-line').length).toBe(expectedStructures(ArchitecturesServices).codeLines[blockIndex]);
        });
    });
});

defineCcieSpSectionSuite(ArchitecturesServices);
