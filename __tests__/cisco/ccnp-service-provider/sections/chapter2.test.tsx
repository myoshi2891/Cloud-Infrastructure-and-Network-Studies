// __tests__/cisco/ccnp-service-provider/sections/chapter2.test.tsx
// @vitest-environment jsdom
import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Chapter2 from '@/app/cisco/ccnp-service-provider/sections/Chapter2';
import { defineCcnpServiceProviderSectionSuite, expectedStructures } from '@/__tests__/helpers/ccnp-sp-section-suite';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

describe('CCNP Service Provider — Chapter 2 セクション', () => {
    it('全3個のテーブルが存在し、すべて thead と th[scope="col"] を持つ', () => {
        const { container } = render(<Chapter2 />);
        const tables = container.querySelectorAll('table');
        expect(tables.length).toBe(3);

        tables.forEach((table, tableIndex) => {
            const thead = table.querySelector('thead');
            expect(thead).not.toBeNull();
            const ths = table.querySelectorAll('th[scope="col"]');
            expect(ths.length).toBe(expectedStructures(Chapter2).tableColumnHeaders[tableIndex]);
        });
    });

    it('Mermaid 図 (d1) が描画されアクセシビリティラベルを持つ', () => {
        const { container } = render(<Chapter2 />);
        const diag = container.querySelector('#diag-d1');
        expect(diag).not.toBeNull();
        expect(diag?.querySelector('[role="img"]')?.getAttribute('aria-label')?.trim()).toBeTruthy();
    });

    it('h2 見出し「2. 認定の全体像」が存在する', () => {
        const { container } = render(<Chapter2 />);
        const h2 = container.querySelector('h2');
        expect(h2?.textContent?.trim()).toBe('2. 認定の全体像');
    });
});

defineCcnpServiceProviderSectionSuite(Chapter2);

