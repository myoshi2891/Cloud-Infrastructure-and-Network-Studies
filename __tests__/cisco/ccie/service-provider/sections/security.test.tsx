// __tests__/cisco/ccie/service-provider/sections/security.test.tsx
// @vitest-environment jsdom
import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Security from '@/app/cisco/ccie/service-provider/sections/Security';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

describe('CCIE Service Provider — Security セクション', () => {
    it('H2 見出しと 3 個の H3 見出しが正しく描画される', () => {
        const { container } = render(<Security />);
        const h2 = container.querySelector('h2');
        expect(h2?.textContent?.trim()).toBe('8. Security（10%）');

        const h3s = [...container.querySelectorAll('h3')].map(h => h.textContent?.trim());
        expect(h3s.length).toBe(3);
        expect(h3s[0]).toContain('8.1 コントロールプレーン');
        expect(h3s[1]).toContain('8.2 管理プレーン');
        expect(h3s[2]).toContain('8.3 インフラストラクチャ');
    });

    it('全12個のテーブルが存在し、すべて thead と th[scope="col"] を持つ', () => {
        const { container } = render(<Security />);
        const tables = container.querySelectorAll('table');
        expect(tables.length).toBe(12);

        tables.forEach((table) => {
            const thead = table.querySelector('thead');
            expect(thead).not.toBeNull();
            const ths = table.querySelectorAll('th[scope="col"]');
            expect(ths.length).toBeGreaterThan(0);
        });
    });

    it('全3個の Mermaid 図 (34〜36) が描画されアクセシビリティラベルを持つ', () => {
        const { container } = render(<Security />);
        const expectedIds = ['34', '35', '36'];
        expectedIds.forEach((id) => {
            const diag = container.querySelector(`#diag-${id}`);
            expect(diag).not.toBeNull();
            expect(diag?.getAttribute('aria-label')?.trim()).toBeTruthy();
        });
    });

    it('全7個のコードブロックが存在し、それぞれ .code-line を持つ', () => {
        const { container } = render(<Security />);
        const codeBlocks = container.querySelectorAll('.code-block');
        expect(codeBlocks.length).toBe(7);
        codeBlocks.forEach((cb) => {
            expect(cb.querySelectorAll('.code-line').length).toBeGreaterThan(0);
        });
    });
});

