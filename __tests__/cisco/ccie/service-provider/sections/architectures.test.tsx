// __tests__/cisco/ccie/service-provider/sections/architectures.test.tsx
// @vitest-environment jsdom
import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import ArchitecturesServices from '@/app/cisco/ccie/service-provider/sections/ArchitecturesServices';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

describe('CCIE Service Provider — ArchitecturesServices セクション', () => {
    it('H2 見出しと 8 個の H3 見出しが正しく描画される', () => {
        const { container } = render(<ArchitecturesServices />);
        const h2 = container.querySelector('h2');
        expect(h2?.textContent?.trim()).toBe('5. Architectures and Services（25%）');

        const h3s = [...container.querySelectorAll('h3')].map(h => h.textContent?.trim());
        expect(h3s.length).toBe(8);
        expect(h3s[0]).toContain('5.1 モバイルインフラ');
        expect(h3s[1]).toContain('5.2 光アーキテクチャ');
        expect(h3s[2]).toContain('5.3 大規模 MPLS');
        expect(h3s[3]).toContain('5.4 Carrier Ethernet');
        expect(h3s[4]).toContain('5.5 L3VPN');
        expect(h3s[5]).toContain('5.6 インターネットサービス');
        expect(h3s[6]).toContain('5.7 マルチキャスト VPN');
        expect(h3s[7]).toContain('5.8 QoS');
    });

    it('全33個のテーブルが存在し、すべて thead と th[scope="col"] を持つ', () => {
        const { container } = render(<ArchitecturesServices />);
        const tables = container.querySelectorAll('table');
        expect(tables.length).toBe(33);

        tables.forEach((table) => {
            const thead = table.querySelector('thead');
            expect(thead).not.toBeNull();
            const ths = table.querySelectorAll('th[scope="col"]');
            expect(ths.length).toBeGreaterThan(0);
        });
    });

    it('全12個の Mermaid 図 (16〜27) が描画されアクセシビリティラベルを持つ', () => {
        const { container } = render(<ArchitecturesServices />);
        const expectedIds = ['16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27'];
        expectedIds.forEach((id) => {
            const diag = container.querySelector(`#diag-${id}`);
            expect(diag).not.toBeNull();
            expect(diag?.getAttribute('aria-label')?.trim()).toBeTruthy();
        });
    });

    it('全6個のコードブロックが存在し、それぞれ .code-line を持つ', () => {
        const { container } = render(<ArchitecturesServices />);
        const codeBlocks = container.querySelectorAll('.code-block');
        expect(codeBlocks.length).toBe(6);
        codeBlocks.forEach((cb) => {
            expect(cb.querySelectorAll('.code-line').length).toBeGreaterThan(0);
        });
    });
});

