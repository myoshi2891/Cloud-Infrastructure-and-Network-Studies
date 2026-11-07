// __tests__/cisco/ccie/service-provider/sections/herointro.test.tsx
// @vitest-environment jsdom
import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import HeroIntro from '@/app/cisco/ccie/service-provider/sections/HeroIntro';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

describe('CCIE Service Provider — HeroIntro セクション', () => {
    it('H1 タイトルと H2 見出しが正しく描画される', () => {
        const { container } = render(<HeroIntro />);
        const h1 = container.querySelector('h1');
        expect(h1?.textContent?.trim()).toBe('CCIE Service Provider 完全ガイド（初学者向け・ステップバイステップ）');

        const h2s = [...container.querySelectorAll('h2')].map(h => h.textContent?.trim());
        expect(h2s).toEqual([
            '目次',
            '1. CCIE Service Provider 認定の全体像',
            '2. 出題範囲マップ（SPCOR と Lab の対応）',
            '3. SP ネットワークの全体像と基本用語',
        ]);
    });

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
            expect(diag?.getAttribute('aria-label')?.trim()).toBeTruthy();
        });
    });

    it('1個のコードブロックが存在し、IOS XR コマンドを含む', () => {
        const { container } = render(<HeroIntro />);
        const codeBlocks = container.querySelectorAll('.code-block');
        expect(codeBlocks.length).toBe(1);
        expect(codeBlocks[0]?.textContent).toContain('RP/0/RP0/CPU0:PE1# configure');
    });
});
