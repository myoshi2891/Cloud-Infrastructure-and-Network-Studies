// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Page from '@/app/aws/ai-business-strategist/domain1/page';
import inventory from '@/docs/migration-inventory/aws-ai-business-strategist-domain1.json';
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

describe('aws-ai-business-strategist-domain1 — 移行元コンテンツの全量移行', () => {
    const renderPage = () => {
        const { container } = render(<Page />);
        return container;
    };

    // Task ラベルは HeroSection の h1 の後で見出し階層を再開しないよう非見出しへ降格済み（レビュー指摘対応）。
    // インベントリは移行元の状態を保持し、期待値側でのみ除外する。
    const demotedTaskLabels = [
        { id: 'task-11', text: 'Task 1.1 コア概念と用語' },
        { id: 'task-12-ai', text: 'Task 1.2 適切な AI ソリューションタイプの選択' },
        { id: 'task-13-ai', text: 'Task 1.3 生成 AI の概念と手法' },
    ];

    it('Step 1 の Task ラベルは見出しではなく装飾テキストとして描画される', () => {
        const container = renderPage();
        const label = container.querySelector('#step-1-ai-skill-111 > .task-heading');
        expect(label?.tagName).toBe('DIV');
        expect(squash(label?.textContent ?? '')).toBe(squash('Task 1.1 コア概念と用語'));
        expect(container.querySelector('#step-1-ai-skill-111 > h2')?.textContent).toBe(
            'Step 1: AI の基本概念 (Skill 1.1.1)',
        );
    });

    it.each(demotedTaskLabels)('$id の Task ラベルは非見出しの装飾テキストで、h1 は HeroSection の 1 件のみ', ({ id, text }) => {
        const container = renderPage();
        const label = container.querySelector(`#${id}`);
        expect(label?.tagName).toBe('DIV');
        expect(label?.classList.contains('task-heading')).toBe(true);
        expect(squash(label?.textContent ?? '')).toBe(squash(text));
        expect(container.querySelectorAll('h1')).toHaveLength(1);
    });

    it.each([
        ['h1', inventory.h1.filter((heading) => !demotedTaskLabels.some((label) => label.text === heading))],
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
            // wrapper の div は generic のため aria-label を持たず、内側の Mermaid 図がラベルを担う
            const labelSource = element.matches('.diagram')
                ? element.querySelector('[data-testid="mermaid-diagram"]')
                : element;
            const hasLabel = Boolean(labelSource?.getAttribute('aria-label')?.trim());
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
