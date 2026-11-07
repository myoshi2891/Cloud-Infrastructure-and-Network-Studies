// __tests__/cisco/ccie/service-provider/sections/appendix.test.tsx
// @vitest-environment jsdom
import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Appendix from '@/app/cisco/ccie/service-provider/sections/Appendix';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

describe('CCIE Service Provider — Appendix セクション', () => {
    it('第10章〜第14章の H2 見出しが正しく描画される', () => {
        const { container } = render(<Appendix />);
        const h2s = [...container.querySelectorAll('h2')].map(h => h.textContent?.trim());
        expect(h2s).toEqual([
            '10. SPCOR 固有トピックの補足',
            '11. Lab 試験の攻略法とトラブルシュート手順',
            '12. 学習計画（例）',
            '13. 参考ソース（URL）',
            '14. 用語集',
        ]);
    });

    it('全14個のテーブルが存在し、すべて thead と th[scope="col"] を持つ', () => {
        const { container } = render(<Appendix />);
        const tables = container.querySelectorAll('table');
        expect(tables.length).toBe(14);

        tables.forEach((table) => {
            const thead = table.querySelector('thead');
            expect(thead).not.toBeNull();
            const ths = table.querySelectorAll('th[scope="col"]');
            expect(ths.length).toBeGreaterThan(0);
        });
    });

    it('全3個の Mermaid 図 (44〜46) が描画されアクセシビリティラベルを持つ', () => {
        const { container } = render(<Appendix />);
        const expectedIds = ['44', '45', '46'];
        expectedIds.forEach((id) => {
            const diag = container.querySelector(`#diag-${id}`);
            expect(diag).not.toBeNull();
            expect(diag?.getAttribute('aria-label')?.trim()).toBeTruthy();
        });
    });

    it('フッター (footer.footer) が描画される', () => {
        const { container } = render(<Appendix />);
        const footer = container.querySelector('footer.footer');
        expect(footer).not.toBeNull();
        expect(footer?.textContent).toContain('各章は「概念 → 仕組み → 設定例 → 確認コマンド → ベストプラクティス」の順で構成しています');
    });
});
