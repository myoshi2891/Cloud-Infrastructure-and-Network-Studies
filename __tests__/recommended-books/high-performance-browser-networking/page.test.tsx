// __tests__/recommended-books/high-performance-browser-networking/page.test.tsx
// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import inventory from '@/docs/migration-inventory/high-performance-browser-networking.json';
import Page from '@/app/recommended-books/high-performance-browser-networking/page';
import { defineMigrationSuite } from '@/__tests__/gcl/agwa/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/gcl/agwa/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

defineMigrationSuite(
    'High Performance Browser Networking 初学者向け完全ガイド — 全量移行検証',
    Page,
    inventory,
);

describe('High Performance Browser Networking 初学者向け完全ガイド — 詳細仕様検証', () => {
    const renderPage = () => {
        const { container } = render(<Page />);
        return container;
    };

    it('リスト項目(li)が移行元の件数と一致し、全件正しく描画されている', () => {
        const container = renderPage();
        const lis = container.querySelectorAll('.main ul > li, .main ol > li');
        expect(lis).toHaveLength(inventory.listItems.length);
    });

    it('チェックリストカード内にチェックボックス項目が存在し、動的カウントアップの基盤がある', () => {
        const container = renderPage();
        const checklist = container.querySelector('.checklist-card');
        expect(checklist).not.toBeNull();
        const checkboxes = checklist?.querySelectorAll('input[type="checkbox"]');
        expect(checkboxes && checkboxes.length).toBe(15);
        const labels = checklist?.querySelectorAll('label');
        expect(labels && labels.length).toBe(15);
    });

    it('参考文献カード(ref-card)が15件存在し、外部リンクが正しく設定されている', () => {
        const container = renderPage();
        const cards = container.querySelectorAll('.ref-card');
        expect(cards).toHaveLength(15);
        cards.forEach((card) => {
            const badge = card.querySelector('.ref-badge');
            expect(badge?.textContent?.trim()).toMatch(/^[0-9]+$/);
            const link = card.querySelector('a');
            expect(link?.getAttribute('href')).toMatch(/^https?:\/\//);
        });
    });

    it('全33点のMermaid図解がpreserveNaturalScale属性を保持し、非空のaria-labelが設定されている', () => {
        const container = renderPage();
        const diagrams = container.querySelectorAll('[data-testid="mermaid-diagram"]');
        expect(diagrams).toHaveLength(33);
        diagrams.forEach((diag) => {
            expect(diag.getAttribute('data-preserve-natural-scale')).toBe('true');
            expect(diag.getAttribute('aria-label')).toBeTruthy();
        });
    });

    it('全22件のテーブルが存在し、すべてtheadとth[scope="col"]を持つ', () => {
        const container = renderPage();
        const tables = container.querySelectorAll('table');
        expect(tables).toHaveLength(22);
        tables.forEach((table) => {
            expect(table.querySelector('thead')).not.toBeNull();
            const colThs = table.querySelectorAll('thead th[scope="col"]');
            expect(colThs.length).toBeGreaterThan(0);
        });
    });

    it('page.css 内でリストマーカーの Preflight リセット防止スタイルが保持されている', async () => {
        const { readFileSync } = await import('node:fs');
        const { join } = await import('node:path');
        const pageCss = readFileSync(
            join(
                process.cwd(),
                'app/recommended-books/high-performance-browser-networking/page.css',
            ),
            'utf8',
        );

        // リストの点（黒丸）と番号の Preflight リセット防止
        expect(pageCss).toMatch(/list-style-type:\s*disc\s*!important/);
        expect(pageCss).toMatch(/list-style-type:\s*decimal\s*!important/);
        expect(pageCss).toMatch(/list-style-position:\s*outside\s*!important/);
    });
});
