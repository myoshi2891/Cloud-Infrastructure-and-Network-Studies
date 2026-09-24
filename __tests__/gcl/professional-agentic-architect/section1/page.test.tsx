// __tests__/gcl/professional-agentic-architect/section1/page.test.tsx
// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it, test, vi } from 'vitest';
import inventory from '@/docs/migration-inventory/professional-agentic-architect-section1.json';
import Page from '@/app/gcl/professional-agentic-architect/section1/page';
import { defineMigrationSuite } from '@/__tests__/gcl/agwa/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/gcl/agwa/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

defineMigrationSuite(
    'Professional Agentic Architect Section 1 — 全量移行検証',
    Page,
    inventory,
);

describe('Professional Agentic Architect Section 1 — 詳細仕様検証', () => {
    const renderPage = () => {
        const { container } = render(<Page />);
        return container;
    };

    it('リスト項目(li)が移行元の件数と一致し、全件正しく描画されている', () => {
        const container = renderPage();
        const lis = container.querySelectorAll('.main ul > li, .main ol > li');
        expect(lis).toHaveLength(inventory.listItems.length);
    });

    it('チェックリストカード内に19件のチェックボックス項目が存在し、動的カウントアップの基盤がある', () => {
        const container = renderPage();
        const checklist = container.querySelector('.checklist-card');
        expect(checklist).not.toBeNull();
        const checkboxes = checklist?.querySelectorAll('input[type="checkbox"]');
        expect(checkboxes && checkboxes.length).toBe(19);
        const labels = checklist?.querySelectorAll('label');
        expect(labels && labels.length).toBe(19);
    });

    it('参考文献カード(ref-card)が26件存在し、外部リンクが正しく設定されている', () => {
        const container = renderPage();
        const cards = container.querySelectorAll('.ref-card');
        expect(cards).toHaveLength(26);
        cards.forEach((card) => {
            const num = card.querySelector('.num');
            expect(num?.textContent?.trim()).toMatch(/^[0-9]+$/);
            const link = card.querySelector('a');
            expect(link?.getAttribute('href')).toMatch(/^https?:\/\//);
        });
    });

    it('全7点のMermaid図解がpreserveNaturalScale属性およびtheme="light"を保持し、非空のaria-labelが設定されている', () => {
        const container = renderPage();
        const diagrams = container.querySelectorAll('[data-testid="mermaid-diagram"]');
        expect(diagrams).toHaveLength(7);
        diagrams.forEach((diag) => {
            expect(diag.getAttribute('data-preserve-natural-scale')).toBe('true');
            expect(diag.getAttribute('data-theme')).toBe('light');
            expect(diag.getAttribute('aria-label')).toBeTruthy();
        });
    });

    it('全11件のテーブルが存在し、すべてtheadとth[scope="col"]を持つ', () => {
        const container = renderPage();
        const tables = container.querySelectorAll('table');
        expect(tables).toHaveLength(11);
        tables.forEach((table, index) => {
            expect(table.querySelector('thead')).not.toBeNull();
            const colThs = table.querySelectorAll('thead th[scope="col"]');
            expect(colThs.length).toBe(inventory.structures.tableColumnHeaders[index]);
        });
    });

    it('page.css 内でサイドバー契約およびリストマーカー保持スタイルが定義されている', async () => {
        const { readFileSync } = await import('node:fs');
        const { join } = await import('node:path');
        const pageCss = readFileSync(
            join(
                process.cwd(),
                'app/gcl/professional-agentic-architect/section1/page.css',
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

    it('DIAGRAMS 内の全7図が構文エラーなく parse できること', async () => {
        const { DIAGRAMS } = await import(
            '@/app/gcl/professional-agentic-architect/section1/constants'
        );
        const mermaidModule = await import('mermaid');
        const mermaid = mermaidModule.default;
        mermaid.initialize({ startOnLoad: false });

        expect(Object.keys(DIAGRAMS)).toHaveLength(7);
        for (const [id, chart] of Object.entries(DIAGRAMS)) {
            const cleanChart = chart.replace(/<br\s*\/?>/gi, '\n');
            const result = await mermaid.parse(cleanChart, {
                suppressErrors: true,
            });
            expect(
                result,
                `Diagram ${id} failed to parse:\n${chart}`,
            ).not.toBe(false);
        }
    });
});
