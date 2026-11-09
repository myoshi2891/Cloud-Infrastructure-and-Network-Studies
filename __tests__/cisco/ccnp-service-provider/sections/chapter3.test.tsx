// __tests__/cisco/ccnp-service-provider/sections/chapter3.test.tsx
// @vitest-environment jsdom
import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Chapter3 from '@/app/cisco/ccnp-service-provider/sections/Chapter3';
import { defineCcnpServiceProviderSectionSuite, expectedStructures } from '@/__tests__/helpers/ccnp-sp-section-suite';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

describe('CCNP Service Provider — Chapter 3 セクション', () => {
    it('全2個のテーブルが存在し、すべて thead と th[scope="col"] を持つ', () => {
        const { container } = render(<Chapter3 />);
        const tables = container.querySelectorAll('table');
        expect(tables.length).toBe(2);

        tables.forEach((table, tableIndex) => {
            const thead = table.querySelector('thead');
            expect(thead).not.toBeNull();
            const ths = table.querySelectorAll('th[scope="col"]');
            expect(ths.length).toBe(expectedStructures(Chapter3).tableColumnHeaders[tableIndex]);
        });
    });

    it('Mermaid 図 (d2) が描画されアクセシビリティラベルを持つ', () => {
        const { container } = render(<Chapter3 />);
        const diag = container.querySelector('#diag-d2');
        expect(diag).not.toBeNull();
        expect(diag?.querySelector('[role="img"]')?.getAttribute('aria-label')?.trim()).toBeTruthy();
    });

    it('h2 見出し「3. 前提知識：SP ネットワークの基本用語」が存在する', () => {
        const { container } = render(<Chapter3 />);
        const h2 = container.querySelector('h2');
        expect(h2?.textContent?.trim()).toBe('3. 前提知識：SP ネットワークの基本用語');
    });
});

defineCcnpServiceProviderSectionSuite(Chapter3);

