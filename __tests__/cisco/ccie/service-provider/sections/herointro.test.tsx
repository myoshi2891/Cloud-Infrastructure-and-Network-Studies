// __tests__/cisco/ccie/service-provider/sections/herointro.test.tsx
// @vitest-environment jsdom
import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import HeroIntro from '@/app/cisco/ccie/service-provider/sections/HeroIntro';
import { defineCcieSpSectionSuite } from '@/__tests__/helpers/ccie-sp-section-suite';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

describe('CCIE Service Provider — HeroIntro セクション', () => {
    it('全9個のテーブルが存在し、すべて thead と th[scope="col"] を持つ', () => {
        const { container } = render(<HeroIntro />);
        const tables = container.querySelectorAll('table');
        expect(tables.length).toBe(9);

        tables.forEach((table) => {
            const thead = table.querySelector('thead');
            expect(thead).not.toBeNull();
            const ths = table.querySelectorAll('th[scope="col"]');
            expect(ths.length).toBeGreaterThan(0);
        });
    });

    it('全4個の Mermaid 図 (0, 1, 2, 3) が描画されアクセシビリティラベルを持つ', () => {
        const { container } = render(<HeroIntro />);
        const expectedIds = ['0', '1', '2', '3'];
        expectedIds.forEach((id) => {
            const diag = container.querySelector(`#diag-${id}`);
            expect(diag).not.toBeNull();
            expect(diag?.querySelector('[role="img"]')?.getAttribute('aria-label')?.trim()).toBeTruthy();
        });
    });

    it('1個のコードブロックが存在し、IOS XR コマンドを含む', () => {
        const { container } = render(<HeroIntro />);
        const codeBlocks = container.querySelectorAll('.code-block');
        expect(codeBlocks.length).toBe(1);
        expect(codeBlocks[0]?.textContent).toContain('RP/0/RP0/CPU0:PE1# configure');
    });
});

defineCcieSpSectionSuite(HeroIntro);
