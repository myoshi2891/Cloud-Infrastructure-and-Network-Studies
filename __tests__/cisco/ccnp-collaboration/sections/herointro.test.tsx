// __tests__/cisco/ccnp-collaboration/sections/herointro.test.tsx
// @vitest-environment jsdom
import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import HeroIntro from '@/app/cisco/ccnp-collaboration/sections/HeroIntro';
import { defineCcnpCollabSectionSuite, expectedStructures } from '@/__tests__/helpers/ccnp-collab-section-suite';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

describe('CCNP Collaboration — HeroIntro セクション', () => {
    it('全7個のテーブルが存在し、すべて thead と th[scope="col"] を持つ', () => {
        const { container } = render(<HeroIntro />);
        const tables = container.querySelectorAll('table');
        expect(tables.length).toBe(7);

        tables.forEach((table, tableIndex) => {
            const thead = table.querySelector('thead');
            expect(thead).not.toBeNull();
            const ths = table.querySelectorAll('th[scope="col"]');
            expect(ths.length).toBe(expectedStructures(HeroIntro).tableColumnHeaders[tableIndex]);
        });
    });

    it('全4個の Mermaid 図 (d1, d2, d3, d4) が描画されアクセシビリティラベルを持つ', () => {
        const { container } = render(<HeroIntro />);
        const expectedIds = ['d1', 'd2', 'd3', 'd4'];
        expectedIds.forEach((id) => {
            const diag = container.querySelector(`#diag-${id}`);
            expect(diag).not.toBeNull();
            expect(diag?.querySelector('[role="img"]')?.getAttribute('aria-label')?.trim()).toBeTruthy();
        });
    });
});

defineCcnpCollabSectionSuite(HeroIntro);
