// __tests__/cisco/ccie/service-provider/sections/access.test.tsx
// @vitest-environment jsdom
import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import AccessConnectivity from '@/app/cisco/ccie/service-provider/sections/AccessConnectivity';
import { defineCcieSpSectionSuite } from '@/__tests__/helpers/ccie-sp-section-suite';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

describe('CCIE Service Provider — AccessConnectivity セクション', () => {
    it('全5個のテーブルが存在し、すべて thead と th[scope="col"] を持つ', () => {
        const { container } = render(<AccessConnectivity />);
        const tables = container.querySelectorAll('table');
        expect(tables.length).toBe(5);

        tables.forEach((table) => {
            const thead = table.querySelector('thead');
            expect(thead).not.toBeNull();
            const ths = table.querySelectorAll('th[scope="col"]');
            expect(ths.length).toBeGreaterThan(0);
        });
    });

    it('全3個の Mermaid 図 (28〜30) が描画されアクセシビリティラベルを持つ', () => {
        const { container } = render(<AccessConnectivity />);
        const expectedIds = ['28', '29', '30'];
        expectedIds.forEach((id) => {
            const diag = container.querySelector(`#diag-${id}`);
            expect(diag).not.toBeNull();
            expect(diag?.querySelector('[role="img"]')?.getAttribute('aria-label')?.trim()).toBeTruthy();
        });
    });

    it('1個のコードブロックが存在し、.code-line を持つ', () => {
        const { container } = render(<AccessConnectivity />);
        const codeBlocks = container.querySelectorAll('.code-block');
        expect(codeBlocks.length).toBe(1);
        expect(codeBlocks[0]?.querySelectorAll('.code-line').length).toBeGreaterThan(0);
    });
});

defineCcieSpSectionSuite(AccessConnectivity);
