// __tests__/cisco/ccnp-collaboration/sections/partd.test.tsx
// @vitest-environment jsdom
import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import PartD from '@/app/cisco/ccnp-collaboration/sections/PartD';
import { defineCcnpCollabSectionSuite, expectedStructures } from '@/__tests__/helpers/ccnp-collab-section-suite';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

describe('CCNP Collaboration — PartD (300-820 CLCEI) セクション', () => {
    it('全30個のテーブルが存在し、すべて thead と th[scope="col"] を持つ', () => {
        const { container } = render(<PartD />);
        const tables = container.querySelectorAll('table');
        expect(tables.length).toBe(30);

        tables.forEach((table, tableIndex) => {
            const thead = table.querySelector('thead');
            expect(thead).not.toBeNull();
            const ths = table.querySelectorAll('th[scope="col"]');
            expect(ths.length).toBe(expectedStructures(PartD).tableColumnHeaders[tableIndex]);
        });
    });

    it('全15個の Mermaid 図 (d58〜d72) が描画されアクセシビリティラベルを持つ', () => {
        const { container } = render(<PartD />);
        for (let i = 58; i <= 72; i++) {
            const id = `d${i}`;
            const diag = container.querySelector(`#diag-${id}`);
            expect(diag).not.toBeNull();
            expect(diag?.querySelector('[role="img"]')?.getAttribute('aria-label')?.trim()).toBeTruthy();
        }
    });
});

defineCcnpCollabSectionSuite(PartD);

