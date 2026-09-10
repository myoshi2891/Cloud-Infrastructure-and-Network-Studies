// __tests__/recommended-books/computer-networking-topdown/page.test.tsx
// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import inventory from '@/docs/migration-inventory/computer-networking-topdown.json';
import Page from '@/app/recommended-books/computer-networking-topdown/page';
import { defineMigrationSuite } from '@/__tests__/gcl/agwa/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/gcl/agwa/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

defineMigrationSuite(
    'Computer Networking: A Top-Down Approach 完全学習ガイド — 全量移行検証',
    Page,
    inventory,
);

describe('Computer Networking: A Top-Down Approach 完全学習ガイド — 詳細仕様検証', () => {
    const renderPage = () => {
        const { container } = render(<Page />);
        return container;
    };

    it('リスト項目(li)が移行元の件数と一致し、全件正しく描画されている', () => {
        const container = renderPage();
        const lis = container.querySelectorAll('.main ul > li, .main ol > li');
        expect(lis).toHaveLength(inventory.listItems.length);
    });

    it('チェックリストカード内に理解度チェックボックス項目が存在する', () => {
        const container = renderPage();
        const checklist = container.querySelector('.checklist-card');
        expect(checklist).not.toBeNull();
        const checkboxes = checklist?.querySelectorAll('input[type="checkbox"]');
        expect(checkboxes?.length).toBe(19);
        const labels = checklist?.querySelectorAll('label');
        expect(labels?.length).toBe(19);
    });

    it('参考文献グリッド(ref-grid)内に参考文献カード(ref-card)が存在し、リンクが正しく設定されている', () => {
        const container = renderPage();
        const refGrids = container.querySelectorAll('.ref-grid');
        expect(refGrids).toHaveLength(9);
        const cards = container.querySelectorAll('.ref-card');
        expect(cards).toHaveLength(31);
        cards.forEach((card, index) => {
            const num = card.querySelector('.num');
            expect(num?.textContent?.trim()).toBe(String(index + 1));
            const link = card.querySelector('a');
            expect(link?.getAttribute('href')).toBeTruthy();
        });
    });

    it('全41点のMermaid図解がpreserveNaturalScale属性を保持し、非空のaria-labelが設定されている', () => {
        const container = renderPage();
        const diagrams = container.querySelectorAll('[data-testid="mermaid-diagram"]');
        expect(diagrams).toHaveLength(41);
        diagrams.forEach((diag) => {
            expect(diag.getAttribute('data-preserve-natural-scale')).toBe('true');
            expect(diag.getAttribute('aria-label')).toBeTruthy();
        });
    });

    it('page.css 内でリストマーカーおよび Mermaid ノード文字色の明示指定が保持されている', async () => {
        const { readFileSync } = await import('node:fs');
        const { join } = await import('node:path');
        const pageCss = readFileSync(
            join(
                process.cwd(),
                'app/recommended-books/computer-networking-topdown/page.css',
            ),
            'utf8',
        );

        // リストの点（黒丸）と番号の Preflight リセット防止
        expect(pageCss).toMatch(/list-style-type:\s*disc\s*!important/);
        expect(pageCss).toMatch(/list-style-type:\s*decimal\s*!important/);
        expect(pageCss).toMatch(/list-style-position:\s*outside\s*!important/);

        // Mermaid ノード文字色の高コントラスト保証
        expect(pageCss).toMatch(/\.cntd-page\s+\.mermaid-wrap\s+\.node\s+\.nodeLabel\b/);
        expect(pageCss).not.toContain(':global(');
        expect(pageCss).toMatch(
            /color:\s*var\(--color-pca-s4-mermaid-label\)\s*!important/,
        );
    });
});
