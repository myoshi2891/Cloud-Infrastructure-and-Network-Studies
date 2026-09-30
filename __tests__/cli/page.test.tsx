// __tests__/cli/page.test.tsx
// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import inventory from '@/docs/migration-inventory/cli.json';
import Page from '@/app/cli/page';
import { defineMigrationSuite } from '@/__tests__/gcl/agwa/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/gcl/agwa/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

defineMigrationSuite(
    'CLIコマンド実践ワンライナー集 — 全量移行検証',
    Page,
    inventory,
);

describe('CLIコマンド実践ワンライナー集 — 詳細仕様・スタイル検証', () => {
    const renderPage = () => {
        const { container } = render(<Page />);
        return container;
    };

    it('リスト項目(li)が移行元の39件と完全に一致する', () => {
        const container = renderPage();
        const lis = container.querySelectorAll('li');
        expect(lis).toHaveLength(39);
    });

    it('全7点のMermaid図解がpreserveNaturalScale属性を保持し、非空のaria-labelが設定されている', () => {
        const container = renderPage();
        const diagrams = container.querySelectorAll('[data-testid="mermaid-diagram"]');
        expect(diagrams).toHaveLength(7);
        diagrams.forEach((diag) => {
            expect(diag.getAttribute('data-preserve-natural-scale')).toBe('true');
            expect(diag.getAttribute('aria-label')).toBeTruthy();
        });
    });

    it('全15件のテーブルが存在し、すべてtheadとth[scope="col"]を持つ', () => {
        const container = renderPage();
        const tables = container.querySelectorAll('table');
        expect(tables).toHaveLength(15);
        tables.forEach((table, index) => {
            expect(table.querySelector('thead')).not.toBeNull();
            const colThs = table.querySelectorAll('thead th[scope="col"]');
            expect(colThs.length).toBe(inventory.structures.tableColumnHeaders[index]);
        });
    });

    it('全6件のコードブロックが存在し、.code-line構造を持つ', () => {
        const container = renderPage();
        const codeBlocks = container.querySelectorAll('.code-block');
        expect(codeBlocks).toHaveLength(6);
        codeBlocks.forEach((block, index) => {
            const lines = block.querySelectorAll('.code-line');
            expect(lines.length).toBe(inventory.structures.codeLines[index]);
        });
    });

    it('page.css 内でサイドバー契約およびリストスタイリングが定義されている', async () => {
        const { readFileSync } = await import('node:fs');
        const { join } = await import('node:path');
        const pageCss = readFileSync(
            join(process.cwd(), 'app/cli/page.css'),
            'utf8',
        );

        // サイドバーレイアウト契約 (280px)
        expect(pageCss).toMatch(/width:\s*280px/);
        expect(pageCss).toMatch(/margin-left:\s*280px/);
        expect(pageCss).toMatch(/width:\s*calc\(100%\s*-\s*280px\)/);
        // リストスタイリング保持
        expect(pageCss).toMatch(/list-style-type:\s*disc/);
        expect(pageCss).toMatch(/list-style-type:\s*decimal/);
    });
});
