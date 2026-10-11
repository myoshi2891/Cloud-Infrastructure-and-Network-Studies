// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Page from '@/app/aws/ai-business-strategist/page';
import inventory from '@/docs/migration-inventory/aws-ai-business-strategist.json';
import {
    MermaidDiagramMock,
    codeBlockSelector,
    codeLineCount,
    extractBodyContent,
    squash,
} from '@/__tests__/helpers/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

describe('aws-ai-business-strategist — 移行元コンテンツの全量移行', () => {
    const renderPage = () => {
        const { container } = render(<Page />);
        return container;
    };

    // 移行元の見出しレベルは a11y のため 1 段下げている（ページ h1 は Hero のみ）。
    // 移行元レベルごとの対応セレクタで、インベントリの全見出しを出現順に照合する。
    it.each([
        ['h1', 'h1, h2.domain-heading', inventory.h1],
        ['h2', 'h2:not(.domain-heading), h3.step-heading', inventory.h2],
        ['h3', 'h3:not(.step-heading), h4, h5, h6', inventory.h3],
    ])('移行元 %s の件数・順序・テキストが移行元と一致する', (_level, selector, headings) => {
        const container = renderPage();
        const rendered = [...container.querySelectorAll(selector)].map((element) =>
            squash(element.textContent ?? ''),
        );
        expect(rendered).toEqual(headings.map(squash));
    });

    it('ページ h1 は Hero の 1 つだけで、ドメインは h2・Step は h3・小節は h4 に入れ子になる', () => {
        const container = renderPage();
        const tagsOf = (selector: string) =>
            [...container.querySelectorAll(selector)].map((element) => element.tagName);
        expect(tagsOf('h1')).toHaveLength(1);
        expect(container.querySelector('.hero h1')).not.toBeNull();
        expect(tagsOf('.domain-heading')).toEqual(Array(inventory.h1.length - 1).fill('H2'));
        // Step 1〜15（Step 0 は独立した h2 セクションのまま）
        expect(tagsOf('.step-heading')).toEqual(Array(15).fill('H3'));
        // 1-1〜15-3 の小節（0-x と付録 C-x は h3 のまま）
        const subsections = inventory.h3.filter((text) => /^(?:[1-9]|1[0-5])-\d+ /.test(text));
        expect(tagsOf('h4')).toHaveLength(subsections.length);
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

    it('外部リンクが件数・順序・URL まで移行元と一致する', () => {
        const container = renderPage();
        const rendered = [...container.querySelectorAll('a[href^="http"]')].map((anchor) =>
            anchor.getAttribute('href'),
        );
        expect(rendered).toEqual(inventory.links.map((link) => link.href));
    });

    it('本文・注釈・画像 alt・コード全文が移行元の順序どおり一致する', () => {
        const container = renderPage();
        expect(extractBodyContent(container)).toEqual(inventory.bodyContent);
    });

    it('全形式の図が件数どおり存在し、説明または装飾指定と自然スケールを持つ', () => {
        const container = renderPage();
        const diagramSelector = '[data-testid="mermaid-diagram"], .mermaid, [id^="diag-"], .diagram';
        const diagrams = [...container.querySelectorAll(diagramSelector)].filter(
            (element) => !element.parentElement?.closest(diagramSelector),
        );
        expect(diagrams).toHaveLength(inventory.counts.diagram);
        diagrams.forEach((element) => {
            const hasLabel = Boolean(element.getAttribute('aria-label')?.trim());
            const isDecorative =
                element.getAttribute('data-decorative') === 'true' ||
                element.getAttribute('aria-hidden') === 'true';
            expect(hasLabel || isDecorative).toBe(true);
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

    it('コードブロックが .code-line でラップされている（コードが存在する場合）', () => {
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
});
