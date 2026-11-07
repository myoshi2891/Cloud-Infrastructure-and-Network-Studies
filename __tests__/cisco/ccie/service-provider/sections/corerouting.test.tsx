// __tests__/cisco/ccie/service-provider/sections/corerouting.test.tsx
// @vitest-environment jsdom
import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import CoreRouting from '@/app/cisco/ccie/service-provider/sections/CoreRouting';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

describe('CCIE Service Provider — CoreRouting セクション', () => {
    it('H2 見出しと 6 個の H3 見出しが正しく描画される', () => {
        const { container } = render(<CoreRouting />);
        const h2 = container.querySelector('h2');
        expect(h2?.textContent?.trim()).toBe('4. Core Routing（25%）');

        const h3s = [...container.querySelectorAll('h3')].map(h => h.textContent?.trim());
        expect(h3s.length).toBe(6);
        expect(h3s[0]).toContain('4.1 IS-IS');
        expect(h3s[1]).toContain('4.2 OSPFv2 / OSPFv3');
        expect(h3s[2]).toContain('4.3 BGP（MP-BGP）');
        expect(h3s[3]).toContain('4.4 BGP ポリシー制御');
        expect(h3s[4]).toContain('4.5 MPLS 基礎と LDP');
        expect(h3s[5]).toContain('4.6 セグメントルーティング');
    });

    it('全30個のテーブルが存在し、すべて thead と th[scope="col"] を持つ', () => {
        const { container } = render(<CoreRouting />);
        const tables = container.querySelectorAll('table');
        expect(tables.length).toBe(30);

        tables.forEach((table) => {
            const thead = table.querySelector('thead');
            expect(thead).not.toBeNull();
            const ths = table.querySelectorAll('th[scope="col"]');
            expect(ths.length).toBeGreaterThan(0);
        });
    });

    it('全12個の Mermaid 図 (4〜15) が描画されアクセシビリティラベルを持つ', () => {
        const { container } = render(<CoreRouting />);
        const expectedIds = ['4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
        expectedIds.forEach((id) => {
            const diag = container.querySelector(`#diag-${id}`);
            expect(diag).not.toBeNull();
            expect(diag?.getAttribute('aria-label')?.trim()).toBeTruthy();
        });
    });

    it('全16個のコードブロックが存在し、それぞれ .code-line を持つ', () => {
        const { container } = render(<CoreRouting />);
        const codeBlocks = container.querySelectorAll('.code-block');
        expect(codeBlocks.length).toBe(16);
        codeBlocks.forEach((cb) => {
            expect(cb.querySelectorAll('.code-line').length).toBeGreaterThan(0);
        });
    });
});
