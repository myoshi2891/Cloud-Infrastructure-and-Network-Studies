// __tests__/aws/security-specialty/domain2/task21.test.tsx
// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Task21 from '@/app/aws/security-specialty/domain2/sections/Task21';

vi.mock('@/components/MermaidDiagram', async () => ({
    MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock,
}));

describe('Task 2.1 Section (Planning and Testing)', () => {
    it('renders task 2.1 main heading and subheadings', () => {
        const { container } = render(<Task21 />);
        const h2 = container.querySelector('h2');
        expect(h2?.textContent?.trim()).toBe('3. Task 2.1: インシデントレスポンス計画の設計とテスト');

        const h3Texts = [...container.querySelectorAll('h3')].map((h) => h.textContent?.trim());
        expect(h3Texts).toContain('3.1 Skill 2.1.1: 対応計画とランブックの設計・実装');
        expect(h3Texts).toContain('3.2 Skill 2.1.2: インシデントに備えたサービス構成');
        expect(h3Texts).toContain('3.3 Skill 2.1.3: 対応計画の有効性テスト');
        expect(h3Texts).toContain('3.4 Skill 2.1.4: 自動修復');
    });

    it('renders diagrams 3 through 9 in task 2.1 section', () => {
        const { container } = render(<Task21 />);
        const diagrams = container.querySelectorAll('.mermaid-wrap');
        expect(diagrams).toHaveLength(7);
        diagrams.forEach((diag) => {
            expect(diag).toHaveAttribute('role', 'region');
            expect(diag).toHaveAttribute('tabIndex', '0');
            expect(diag.getAttribute('aria-label')).toBeTruthy();
        });
    });

    it('renders tables with thead and scope=col', () => {
        const { container } = render(<Task21 />);
        const tables = container.querySelectorAll('table');
        expect(tables).toHaveLength(20);
        tables.forEach((table) => {
            expect(table.querySelector('thead th[scope="col"]')).not.toBeNull();
        });
    });

    it('renders code blocks for YAML, JSON, Bash, and Python', () => {
        const { container } = render(<Task21 />);
        const samples = container.querySelectorAll('.code-sample');
        expect(samples).toHaveLength(5);
        samples.forEach((sample) => {
            const block = sample.querySelector('.code-block');
            expect(block).toHaveAttribute('role', 'region');
            expect(sample.querySelector('.code-lang')).not.toBeNull();
            expect(block?.querySelector('.code-line')).not.toBeNull();
        });
    });
});
