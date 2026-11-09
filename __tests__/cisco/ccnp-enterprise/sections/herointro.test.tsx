// __tests__/cisco/ccnp-enterprise/sections/herointro.test.tsx
// @vitest-environment jsdom
import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import HeroIntro from '@/app/cisco/ccnp-enterprise/sections/HeroIntro';
import { defineCcnpEnterpriseSectionSuite, expectedStructures } from '@/__tests__/helpers/ccnp-enterprise-section-suite';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

describe('CCNP Enterprise — HeroIntro セクション', () => {
    it('全4個のテーブルが存在し、すべて thead と th[scope="col"] を持つ', () => {
        const { container } = render(<HeroIntro />);
        const tables = container.querySelectorAll('table');
        expect(tables.length).toBe(4);

        tables.forEach((table, tableIndex) => {
            const thead = table.querySelector('thead');
            expect(thead).not.toBeNull();
            const ths = table.querySelectorAll('th[scope="col"]');
            expect(ths.length).toBe(expectedStructures(HeroIntro).tableColumnHeaders[tableIndex]);
        });
    });

    it('全2個の Mermaid 図 (dg1, dg2) が描画されアクセシビリティラベルを持つ', () => {
        const { container } = render(<HeroIntro />);
        const expectedIds = ['dg1', 'dg2'];
        expectedIds.forEach((id) => {
            const diag = container.querySelector(`#diag-${id}`);
            expect(diag).not.toBeNull();
            expect(diag?.querySelector('[role="img"]')?.getAttribute('aria-label')?.trim()).toBeTruthy();
        });
    });
});

defineCcnpEnterpriseSectionSuite(HeroIntro);

