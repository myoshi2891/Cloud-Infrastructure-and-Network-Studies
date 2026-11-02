// __tests__/aws/security-specialty/domain2/task22.test.tsx
// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Task22 from '@/app/aws/security-specialty/domain2/sections/Task22';

vi.mock('@/components/MermaidDiagram', async () => ({
    MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock,
}));

describe('Task 2.2 Section (Responding to Security Events)', () => {
    it('renders task 2.2 main heading and subheadings', () => {
        const { container } = render(<Task22 />);
        const h2 = container.querySelector('h2');
        expect(h2?.textContent?.trim()).toBe('4. Task 2.2: セキュリティイベントへの対応');

        const h3Texts = [...container.querySelectorAll('h3')].map((h) => h.textContent?.trim());
        expect(h3Texts).toContain('4.1 Skill 2.2.1: フォレンジック用ログの取得と保管');
        expect(h3Texts).toContain('4.2 Skill 2.2.2: ログの検索と相関分析');
        expect(h3Texts).toContain('4.3 Skill 2.2.3: 検出結果の検証と影響範囲の評価');
        expect(h3Texts).toContain('4.4 Skill 2.2.4: 封じ込め・根絶・復旧');
        expect(h3Texts).toContain('4.5 Skill 2.2.5: 根本原因分析');
    });

    it('renders diagrams 10 through 16 in task 2.2 section', () => {
        const { container } = render(<Task22 />);
        const diagrams = container.querySelectorAll('.mermaid-wrap');
        expect(diagrams).toHaveLength(7);
        diagrams.forEach((diag) => {
            expect(diag).toHaveAttribute('role', 'region');
            expect(diag).toHaveAttribute('tabIndex', '0');
            expect(diag.getAttribute('aria-label')).toBeTruthy();
        });
    });

    it('renders tables with thead and scope=col', () => {
        const { container } = render(<Task22 />);
        const tables = container.querySelectorAll('table');
        expect(tables.length).toBeGreaterThanOrEqual(15);
        tables.forEach((table) => {
            expect(table.querySelector('thead th[scope="col"]')).not.toBeNull();
        });
    });

    it('renders code blocks for SQL queries, CLI commands, and policies', () => {
        const { container } = render(<Task22 />);
        const blocks = container.querySelectorAll('.code-block');
        expect(blocks.length).toBeGreaterThanOrEqual(6);
        blocks.forEach((block) => {
            expect(block).toHaveAttribute('role', 'group');
            expect(block.querySelector('.code-lang')).not.toBeNull();
            expect(block.querySelector('pre code')).not.toBeNull();
        });
    });
});
