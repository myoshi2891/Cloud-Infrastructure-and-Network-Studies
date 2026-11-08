// __tests__/cisco/ccie/service-provider/sections/security.test.tsx
// @vitest-environment jsdom
import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Security from '@/app/cisco/ccie/service-provider/sections/Security';
import { defineCcieSpSectionSuite } from '@/__tests__/helpers/ccie-sp-section-suite';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

describe('CCIE Service Provider — Security セクション', () => {
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
            expect(diag?.querySelector('[role="img"]')?.getAttribute('aria-label')?.trim()).toBeTruthy();
        });
    });

    it('RPKI-IN ポリシーを隣接の IPv4 unicast へ入力方向で適用する', () => {
        const { container } = render(<Security />);
        const block = [...container.querySelectorAll('.code-block')].find((element) =>
            element.textContent?.includes('origin-as validation enable'),
        );
        const lines = [...(block?.querySelectorAll('.code-line') ?? [])].map((line) => line.textContent ?? '');
        const validation = lines.indexOf('   origin-as validation enable');
        expect(validation).toBeGreaterThan(-1);
        expect(lines[validation + 1]).toBe('   route-policy RPKI-IN in');
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

defineCcieSpSectionSuite(Security);
