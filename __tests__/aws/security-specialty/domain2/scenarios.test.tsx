// __tests__/aws/security-specialty/domain2/scenarios.test.tsx
// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Scenarios from '@/app/aws/security-specialty/domain2/sections/Scenarios';

vi.mock('@/components/MermaidDiagram', async () => ({
    MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock,
}));

describe('Scenarios Section (3 Practical Scenarios)', () => {
    it('renders main heading and all 3 scenarios', () => {
        const { container } = render(<Scenarios />);
        const h2 = container.querySelector('h2');
        expect(h2?.textContent?.trim()).toBe('5. 実践シナリオ 3 本');

        const h3Texts = [...container.querySelectorAll('h3')].map((h) => h.textContent?.trim());
        expect(h3Texts).toContain('5.1 シナリオ A: EC2 の認証情報が外部から使われた');
        expect(h3Texts).toContain('5.2 シナリオ B: IAM アクセスキーが公開リポジトリに漏れた');
        expect(h3Texts).toContain('5.3 シナリオ C: S3 バケットが意図せず公開された');
    });

    it('renders scenario A diagram 17 with natural scale', () => {
        const { container } = render(<Scenarios />);
        const diagrams = container.querySelectorAll('.mermaid-wrap');
        expect(diagrams).toHaveLength(1);
        expect(diagrams[0]).toHaveAttribute('role', 'region');
        expect(diagrams[0]?.getAttribute('aria-label')).toBeTruthy();
    });

    it('renders scenario tables with thead and scope=col', () => {
        const { container } = render(<Scenarios />);
        const tables = container.querySelectorAll('table');
        expect(tables.length).toBeGreaterThanOrEqual(3);
        tables.forEach((table) => {
            expect(table.querySelector('thead th[scope="col"]')).not.toBeNull();
        });
    });
});

