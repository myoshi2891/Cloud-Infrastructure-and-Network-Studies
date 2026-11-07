// __tests__/cisco/ccie/service-provider/sections/access.test.tsx
// @vitest-environment jsdom
import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import AccessConnectivity from '@/app/cisco/ccie/service-provider/sections/AccessConnectivity';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

describe('CCIE Service Provider — AccessConnectivity セクション', () => {
    it('H2 見出しと 2 個の H3 見出しが正しく描画される', () => {
        const { container } = render(<AccessConnectivity />);
        const h2 = container.querySelector('h2');
        expect(h2?.textContent?.trim()).toBe('6. Access Connectivity（10%）');

        const h3s = [...container.querySelectorAll('h3')].map(h => h.textContent?.trim());
        expect(h3s.length).toBe(2);
        expect(h3s[0]).toContain('6.1 BNG');
        expect(h3s[1]).toContain('6.2 Layer 2 接続');
    });

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
            expect(diag?.getAttribute('aria-label')?.trim()).toBeTruthy();
        });
    });

    it('1個のコードブロックが存在し、.code-line を持つ', () => {
        const { container } = render(<AccessConnectivity />);
        const codeBlocks = container.querySelectorAll('.code-block');
        expect(codeBlocks.length).toBe(1);
        expect(codeBlocks[0]?.querySelectorAll('.code-line').length).toBeGreaterThan(0);
    });
});
