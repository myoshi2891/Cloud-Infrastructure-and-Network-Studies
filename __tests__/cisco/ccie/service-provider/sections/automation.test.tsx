// __tests__/cisco/ccie/service-provider/sections/automation.test.tsx
// @vitest-environment jsdom
import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import AssuranceAutomation from '@/app/cisco/ccie/service-provider/sections/AssuranceAutomation';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

describe('CCIE Service Provider — AssuranceAutomation セクション', () => {
    it('H2 見出しと 2 個の H3 見出しが正しく描画される', () => {
        const { container } = render(<AssuranceAutomation />);
        const h2 = container.querySelector('h2');
        expect(h2?.textContent?.trim()).toBe('9. Assurance and Automation（20%）');

        const h3s = [...container.querySelectorAll('h3')].map(h => h.textContent?.trim());
        expect(h3s.length).toBe(2);
        expect(h3s[0]).toContain('9.1 ネットワークアシュアランス');
        expect(h3s[1]).toContain('9.2 ネットワーク自動化');
    });

    it('全13個のテーブルが存在し、すべて thead と th[scope="col"] を持つ', () => {
        const { container } = render(<AssuranceAutomation />);
        const tables = container.querySelectorAll('table');
        expect(tables.length).toBe(13);

        tables.forEach((table) => {
            const thead = table.querySelector('thead');
            expect(thead).not.toBeNull();
            const ths = table.querySelectorAll('th[scope="col"]');
            expect(ths.length).toBeGreaterThan(0);
        });
    });

    it('全7個の Mermaid 図 (37〜43) が描画されアクセシビリティラベルを持つ', () => {
        const { container } = render(<AssuranceAutomation />);
        const expectedIds = ['37', '38', '39', '40', '41', '42', '43'];
        expectedIds.forEach((id) => {
            const diag = container.querySelector(`#diag-${id}`);
            expect(diag).not.toBeNull();
            expect(diag?.getAttribute('aria-label')?.trim()).toBeTruthy();
        });
    });

    it('全9個のコードブロックが存在し、それぞれ .code-line を持つ', () => {
        const { container } = render(<AssuranceAutomation />);
        const codeBlocks = container.querySelectorAll('.code-block');
        expect(codeBlocks.length).toBe(9);
        codeBlocks.forEach((cb) => {
            expect(cb.querySelectorAll('.code-line').length).toBeGreaterThan(0);
        });
    });
});

