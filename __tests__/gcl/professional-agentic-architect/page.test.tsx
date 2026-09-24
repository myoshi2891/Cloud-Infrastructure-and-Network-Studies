// __tests__/gcl/professional-agentic-architect/page.test.tsx
// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it, test, vi } from 'vitest';
import inventory from '@/docs/migration-inventory/professional-agentic-architect.json';
import { DIAGRAMS } from '@/app/gcl/professional-agentic-architect/constants';
import Page from '@/app/gcl/professional-agentic-architect/page';
import { defineMigrationSuite } from '@/__tests__/gcl/agwa/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/gcl/agwa/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

defineMigrationSuite(
    'Google Cloud Professional Agentic Architect 認定試験 技術ガイド — 全量移行検証',
    Page,
    inventory,
);

describe('Google Cloud Professional Agentic Architect 認定試験 技術ガイド — 詳細仕様検証', () => {
    const renderPage = () => {
        const { container } = render(<Page />);
        return container;
    };

    it('リスト項目(li)が移行元の件数と一致し、全件正しく描画されている', () => {
        const container = renderPage();
        const lis = container.querySelectorAll('.main ul > li, .main ol > li');
        expect(lis).toHaveLength(inventory.listItems.length);
    });

    it('チェックリストカード内に22件のチェックボックス項目が存在し、動的カウントアップの基盤がある', () => {
        const container = renderPage();
        const checklist = container.querySelector('.checklist-card');
        expect(checklist).not.toBeNull();
        const checkboxes = checklist?.querySelectorAll('input[type="checkbox"]');
        expect(checkboxes && checkboxes.length).toBe(22);
        const labels = checklist?.querySelectorAll('label');
        expect(labels && labels.length).toBe(22);
    });

    it('参考文献カード(ref-card)が63件存在し、外部リンクが正しく設定されている', () => {
        const container = renderPage();
        const cards = container.querySelectorAll('.ref-card');
        expect(cards).toHaveLength(63);
        cards.forEach((card) => {
            const num = card.querySelector('.num');
            expect(num?.textContent?.trim()).toMatch(/^[0-9]+$/);
            const link = card.querySelector('a');
            expect(link?.getAttribute('href')).toMatch(/^https?:\/\//);
        });
    });

    it('全21点のMermaid図解がpreserveNaturalScale属性を保持し、非空のaria-labelが設定されている', () => {
        const container = renderPage();
        const diagrams = container.querySelectorAll('[data-testid="mermaid-diagram"]');
        expect(diagrams).toHaveLength(21);
        diagrams.forEach((diag) => {
            expect(diag.getAttribute('data-preserve-natural-scale')).toBe('true');
            expect(diag.getAttribute('aria-label')).toBeTruthy();
        });
    });

    it('全8件のテーブルが存在し、すべてtheadとth[scope="col"]を持つ', () => {
        const container = renderPage();
        const tables = container.querySelectorAll('table');
        expect(tables).toHaveLength(8);
        tables.forEach((table) => {
            expect(table.querySelector('thead')).not.toBeNull();
            const colThs = table.querySelectorAll('thead th[scope="col"]');
            expect(colThs.length).toBeGreaterThan(0);
        });
    });

    it('page.css 内でサイドバー契約およびリストマーカー保持スタイルが定義されている', async () => {
        const { readFileSync } = await import('node:fs');
        const { join } = await import('node:path');
        const pageCss = readFileSync(
            join(
                process.cwd(),
                'app/gcl/professional-agentic-architect/page.css',
            ),
            'utf8',
        );

        // サイドバーレイアウト契約
        expect(pageCss).toMatch(/width:\s*280px/);
        expect(pageCss).toMatch(/margin-left:\s*280px/);
        expect(pageCss).toMatch(/width:\s*calc\(100%\s*-\s*280px\)/);
        // リストの点（黒丸）と番号の Preflight リセット防止
        expect(pageCss).toMatch(/list-style-type:\s*disc\s*!important/);
        expect(pageCss).toMatch(/list-style-type:\s*decimal\s*!important/);
    });

    test.each(
        Object.entries(DIAGRAMS),
    )('Mermaid 図 %s が構文エラーなく parse できること', async (id, chart) => {
        const mermaidModule = await import('mermaid');
        const mermaid = mermaidModule.default;
        const result = await mermaid.parse(chart);
        expect(result, `Diagram ${id} failed syntax validation`).toBeTruthy();
    });
});
