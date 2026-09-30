// __tests__/gcl/professional-agentic-architect/section5/page.test.tsx
// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import inventory from '@/docs/migration-inventory/professional-agentic-architect-section5.json';
import Page from '@/app/gcl/professional-agentic-architect/section5/page';
import { defineMigrationSuite } from '@/__tests__/gcl/agwa/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/gcl/agwa/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

defineMigrationSuite(
    'Professional Agentic Architect Section 5 — 全量移行検証',
    Page,
    inventory,
);

describe('Professional Agentic Architect Section 5 — 詳細仕様検証', () => {
    const renderPage = () => {
        const { container } = render(<Page />);
        return container;
    };

    it('リスト項目(li)が移行元の件数と一致し、全件正しく描画されている', () => {
        const container = renderPage();
        const lis = container.querySelectorAll('.main ul > li, .main ol > li');
        expect(lis).toHaveLength(inventory.listItems.length);
    });

    it('チェックリストカード内に17件のチェックボックス項目が存在し、動的カウントアップの基盤がある', () => {
        const container = renderPage();
        const checklist = container.querySelector('.checklist-card');
        expect(checklist).not.toBeNull();
        const checkboxes = checklist?.querySelectorAll('input[type="checkbox"]');
        expect(checkboxes && checkboxes.length).toBe(17);
        const labels = checklist?.querySelectorAll('label');
        expect(labels && labels.length).toBe(17);
    });

    it('参考文献カード(ref-card)が24件存在し、外部リンクが正しく設定されている', () => {
        const container = renderPage();
        const cards = container.querySelectorAll('.ref-card');
        expect(cards).toHaveLength(24);
        cards.forEach((card) => {
            const num = card.querySelector('.num');
            expect(num?.textContent?.trim()).toMatch(/^[0-9]+$/);
            const link = card.querySelector('a');
            expect(link?.getAttribute('href')).toMatch(/^https?:\/\//);
        });
    });

    it('全9点のMermaid図解がpreserveNaturalScale属性およびtheme="light"を保持し、非空のaria-labelが設定されている', () => {
        const container = renderPage();
        const diagrams = container.querySelectorAll('[data-testid="mermaid-diagram"]');
        expect(diagrams).toHaveLength(9);
        diagrams.forEach((diag) => {
            expect(diag.getAttribute('data-preserve-natural-scale')).toBe('true');
            expect(diag.getAttribute('data-theme')).toBe('light');
            expect(diag.getAttribute('aria-label')).toBeTruthy();
        });
    });

    it('全13件のテーブルが存在し、すべてtheadとth[scope="col"]を持つ', () => {
        const container = renderPage();
        const tables = container.querySelectorAll('table');
        expect(tables).toHaveLength(13);
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
                'app/gcl/professional-agentic-architect/section5/page.css',
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

    it('チェックリストのチェックボックスはキーボードフォーカスが可視であること', async () => {
        const { readFileSync } = await import('node:fs');
        const { join } = await import('node:path');
        const pageCss = readFileSync(
            join(
                process.cwd(),
                'app/gcl/professional-agentic-architect/section5/page.css',
            ),
            'utf8',
        );

        expect(pageCss).toMatch(/input\[type="checkbox"]:focus-visible/);
        expect(pageCss).toMatch(/outline:/);
    });

    it('DOM 内にエスケープ漏れの文字列（<br/> や &lt;br 等）が直接テキストとして露出していない', () => {
        const container = renderPage();
        const textContent = container.textContent || '';
        expect(textContent).not.toContain('<br/>');
        expect(textContent).not.toContain('<br>');
        expect(textContent).not.toContain('&lt;br');
    });

    it('コールアウト・引用ブロックが欠落なく適切な構造とクラスで描画されている', () => {
        const container = renderPage();
        
        // ベストプラクティスコールアウト (8件)
        const practiceCallouts = container.querySelectorAll('.callout-practice');
        expect(practiceCallouts).toHaveLength(8);
        practiceCallouts.forEach((el) => {
            expect(el.querySelector('.icon')).not.toBeNull();
            expect(el.querySelector('.body')).not.toBeNull();
            expect(el.querySelector('.label')).not.toBeNull();
        });

        // 出典ノート (6件)
        const sourceNotes = container.querySelectorAll('blockquote.source-note');
        expect(sourceNotes).toHaveLength(6);

        // 注意・情報ノート (3件: warn 2件, info 1件)
        const noteCallouts = container.querySelectorAll('blockquote.note-callout');
        expect(noteCallouts).toHaveLength(3);
        const warnNotes = container.querySelectorAll('blockquote.note-callout.warn');
        expect(warnNotes).toHaveLength(2);
        const infoNotes = container.querySelectorAll('blockquote.note-callout.info');
        expect(infoNotes).toHaveLength(1);

        // リード引用文 (1件)
        const ledeQuotes = container.querySelectorAll('blockquote.lede-quote');
        expect(ledeQuotes).toHaveLength(1);

        // テーブルスクロールコンテナ (13件)
        const tableScrolls = container.querySelectorAll('.table-scroll');
        expect(tableScrolls).toHaveLength(13);
    });

    it('page.css 内で元HTML由来の必須スタイリングセレクタおよびプロパティが完全定義されている', async () => {
        const { readFileSync } = await import('node:fs');
        const { join } = await import('node:path');
        const pageCss = readFileSync(
            join(
                process.cwd(),
                'app/gcl/professional-agentic-architect/section5/page.css',
            ),
            'utf8',
        );

        // ベストプラクティス
        expect(pageCss).toMatch(/\.callout-practice/);
        expect(pageCss).toMatch(/\.callout-practice\s+\.icon/);
        expect(pageCss).toMatch(/\.callout-practice\s+\.body/);
        expect(pageCss).toMatch(/\.callout-practice\s+\.label/);

        // 出典・引用ノート
        expect(pageCss).toMatch(/blockquote\.source-note/);
        expect(pageCss).toMatch(/blockquote\.note-callout/);
        expect(pageCss).toMatch(/blockquote\.note-callout\.warn/);
        expect(pageCss).toMatch(/blockquote\.note-callout\.info/);
        expect(pageCss).toMatch(/blockquote\.lede-quote/);

        // テーブルスクロール・ゼブラスタイル
        expect(pageCss).toMatch(/\.table-scroll/);
        expect(pageCss).toMatch(/tbody\s+tr\.even\s+td/);

        // 見出し装飾
        expect(pageCss).toMatch(/h3::before/);
        expect(pageCss).toMatch(/background-clip:\s*text/);
        expect(pageCss).toMatch(/border-top:\s*1px\s+solid/);

        // チェックリストヘッダー & 参考カード
        expect(pageCss).toMatch(/\.checklist-header/);
        expect(pageCss).toMatch(/\.ref-card\s+\.txt/);
    });

    it('Mermaid 図は preserveNaturalScale のため svg に対する強制縮小 max-width: 100% !important が設定されていない', async () => {
        const { readFileSync } = await import('node:fs');
        const { join } = await import('node:path');
        const pageCss = readFileSync(
            join(
                process.cwd(),
                'app/gcl/professional-agentic-architect/section5/page.css',
            ),
            'utf8',
        );

        // .mermaid-wrap svg { max-width: 100% !important; } の禁止（AGENTS.md 例外規約）
        expect(pageCss).not.toMatch(/\.mermaid-wrap\s+svg\s*\{[^}]*max-width:\s*100%\s*!important/);
    });
});
