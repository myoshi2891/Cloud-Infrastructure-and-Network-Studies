// __tests__/cisco/ccie/service-provider/sections/ha.test.tsx
// @vitest-environment jsdom
import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import HighAvailability from '@/app/cisco/ccie/service-provider/sections/HighAvailability';
import { defineCcieSpSectionSuite } from '@/__tests__/helpers/ccie-sp-section-suite';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

describe('CCIE Service Provider — HighAvailability セクション', () => {
    it('全9個のテーブルが存在し、すべて thead と th[scope="col"] を持つ', () => {
        const { container } = render(<HighAvailability />);
        const tables = container.querySelectorAll('table');
        expect(tables.length).toBe(9);

        tables.forEach((table) => {
            const thead = table.querySelector('thead');
            expect(thead).not.toBeNull();
            const ths = table.querySelectorAll('th[scope="col"]');
            expect(ths.length).toBeGreaterThan(0);
        });
    });

    it('全3個の Mermaid 図 (31〜33) が描画されアクセシビリティラベルを持つ', () => {
        const { container } = render(<HighAvailability />);
        const expectedIds = ['31', '32', '33'];
        expectedIds.forEach((id) => {
            const diag = container.querySelector(`#diag-${id}`);
            expect(diag).not.toBeNull();
            expect(diag?.querySelector('[role="img"]')?.getAttribute('aria-label')?.trim()).toBeTruthy();
        });
    });

    it('全3個のコードブロックが存在し、それぞれ .code-line を持つ', () => {
        const { container } = render(<HighAvailability />);
        const codeBlocks = container.querySelectorAll('.code-block');
        expect(codeBlocks.length).toBe(3);
        codeBlocks.forEach((cb) => {
            expect(cb.querySelectorAll('.code-line').length).toBeGreaterThan(0);
        });
    });
});

defineCcieSpSectionSuite(HighAvailability);
