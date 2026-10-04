// __tests__/recommended-books/terraform-up-and-running/page.test.tsx
// @vitest-environment jsdom
import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import inventory from '@/docs/migration-inventory/terraform-up-and-running.json';
import Page from '@/app/recommended-books/terraform-up-and-running/page';
import {
    codeBlockSelector,
    codeLineCount,
    extractBodyContent,
    squash,
} from '@/__tests__/helpers/migration-test-utils';

// MermaidDiagram は名前付きエクスポート。default でモックすると必ず落ちる。
vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

describe('terraform-up-and-running — 移行元コンテンツの全量移行', () => {
    const renderPage = () => {
        const { container } = render(<Page />);
        return container;
    };

    it.each([
        ['h1', inventory.h1],
        ['h2', inventory.h2],
        ['h3', inventory.h3],
        ['h4', inventory.h4],
    ])('%s の件数・順序・テキストが移行元と一致する', (selector, headings) => {
        const container = renderPage();
        const rendered = [...container.querySelectorAll(selector)].map((element) =>
            squash(element.textContent ?? ''),
        );
        expect(rendered).toEqual(headings.map(squash));
    });

    it.each([
        ['th', inventory.th],
        ['td', inventory.td],
        ['li', inventory.listItems],
    ])('%s の件数・順序・テキストが移行元と一致する', (selector, items) => {
        const container = renderPage();
        const rendered = [...container.querySelectorAll(selector)].map((element) =>
            squash(element.textContent ?? ''),
        );
        expect(rendered).toEqual(items.map(squash));
    });

    it('外部リンクが件数・順序・URL・ラベルまで移行元と一致する', () => {
        const container = renderPage();
        const rendered = [...container.querySelectorAll('a[href^="http"]')].map((anchor) => ({
            href: anchor.getAttribute('href'),
            text: squash(anchor.textContent ?? ''),
        }));
        expect(rendered).toEqual(
            inventory.links.map((link) => ({ href: link.href, text: squash(link.text) })),
        );
    });

    it('本文・注釈・画像 alt・コード全文が移行元の順序どおり一致する', () => {
        const container = renderPage();
        expect(extractBodyContent(container)).toEqual(inventory.bodyContent);
    });

    it('全形式の図が件数どおり存在し、説明または装飾指定と自然スケールを持つ', () => {
        const container = renderPage();
        const diagramSelector = '[data-testid="mermaid-diagram"], .mermaid, [id^="diag-"], .diagram-container';
        const diagrams = [...container.querySelectorAll(diagramSelector)].filter(
            (element) => !element.querySelector(diagramSelector),
        );
        expect(diagrams).toHaveLength(inventory.counts.diagram);
        diagrams.forEach((element) => {
            const hasLabel = Boolean(element.getAttribute('aria-label')?.trim());
            const isDecorative = element.getAttribute('data-decorative') === 'true'
                || element.getAttribute('aria-hidden') === 'true';
            expect(hasLabel || isDecorative).toBe(true);
            // preserveNaturalScale 未指定の実装を通過させない
            expect(element.getAttribute('data-preserve-natural-scale')).toBe('true');
        });
    });

    it('静的な画像と SVG が移行元の件数と一致する', () => {
        const container = renderPage();
        expect(container.querySelectorAll('img, svg')).toHaveLength(inventory.counts.figure);
    });

    it('テーブルが件数どおり存在し、thead と th[scope=col] を持つ', () => {
        const container = renderPage();
        const tables = [...container.querySelectorAll('table')];
        expect(tables).toHaveLength(inventory.counts.table);
        tables.forEach((table, index) => {
            expect(table.querySelector('thead')).not.toBeNull();
            expect(table.querySelectorAll('thead th[scope="col"]').length).toBe(
                inventory.structures.tableColumnHeaders[index],
            );
        });
    });

    it('コードブロックが .code-line でラップされている', () => {
        const container = renderPage();
        const blocks = [...container.querySelectorAll(codeBlockSelector)].filter(
            (element) => !element.parentElement?.closest(codeBlockSelector),
        );
        expect(blocks).toHaveLength(inventory.counts.codeBlock);
        blocks.forEach((block, index) => {
            expect(block.querySelector(':scope > .code-line')).not.toBeNull();
            expect(codeLineCount(block)).toBe(inventory.structures.codeLines[index]);
        });
    });

    it('すべての Mermaid ダイアグラム定義が構文エラーなく parse できること', async () => {
        const { DIAGRAMS } = await import('@/app/recommended-books/terraform-up-and-running/constants');
        const mermaidModule = await import('mermaid');
        const mermaid = mermaidModule.default;
        for (const [id, chart] of Object.entries(DIAGRAMS)) {
            const result = await mermaid.parse(chart);
            expect(result, `Diagram ${id} failed syntax validation`).toBeTruthy();
        }
    });

    it('チェックリストが 9 項目存在し、トグル可能で完了カウントが正しく更新されること', async () => {
        const { fireEvent } = await import('@testing-library/react');
        const container = renderPage();
        const checklistCard = container.querySelector('.checklist-card');
        expect(checklistCard).not.toBeNull();

        const checkboxes = container.querySelectorAll<HTMLInputElement>('.checklist-card input[type="checkbox"]');
        expect(checkboxes).toHaveLength(9);

        const countEl = container.querySelector('.checklist-header .checklist-counter');
        expect(countEl?.textContent?.trim()).toBe('0 / 9 完了');

        // 1つ目のチェックボックスをクリック
        const firstBox = checkboxes[0];
        if (firstBox) {
            fireEvent.click(firstBox);
            expect(countEl?.textContent?.trim()).toBe('1 / 9 完了');

            // 再度クリックして解除
            fireEvent.click(firstBox);
            expect(countEl?.textContent?.trim()).toBe('0 / 9 完了');
        }
    });

    it('参考文献が 7 件すべて .ref-card として存在すること', () => {
        const container = renderPage();
        const refGrid = container.querySelector('.ref-grid');
        expect(refGrid).not.toBeNull();

        const cards = container.querySelectorAll('.ref-card');
        expect(cards).toHaveLength(7);
    });
});

describe('terraform-up-and-running — 目次リンクのスクロールとフォーカス', () => {
    it('目次リンクで見出しをスクロール表示し、スクロールを戻さずにフォーカスを移す', () => {
        const scrollIntoView = vi.fn();
        Element.prototype.scrollIntoView = scrollIntoView;
        const { container } = render(<Page />);
        const link = container.querySelector<HTMLAnchorElement>('#sidebar a[data-target]:nth-of-type(2)')!;
        const target = container.querySelector<HTMLElement>(`[id="${link.dataset.target}"]`)!;
        const focus = vi.spyOn(target, 'focus');

        fireEvent.click(link);

        expect(scrollIntoView).toHaveBeenCalledTimes(1);
        expect(scrollIntoView.mock.contexts[0]).toBe(target);
        expect(target).toHaveAttribute('tabindex', '-1');
        expect(focus).toHaveBeenCalledWith({ preventScroll: true });
        expect(target).toHaveFocus();
    });
});
