// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Page from '@/app/aws/ai-business-strategist/domain4/page';
import inventory from '@/docs/migration-inventory/aws-ai-business-strategist-domain4.json';
import {
    codeBlockSelector,
    codeLineCount,
    extractBodyContent,
    squash,
} from '@/__tests__/helpers/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

describe('aws-ai-business-strategist-domain4 — 移行元コンテンツの全量移行', () => {
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

    it('外部リンクが移行元の件数・順序・URL を保持し、参考URL表の URL もリンク化されている', () => {
        const container = renderPage();
        const refAnchors = [...container.querySelectorAll('#s12 td a[href^="http"]')];
        const rendered = [...container.querySelectorAll('a[href^="http"]')]
            .filter((anchor) => !refAnchors.includes(anchor))
            .map((anchor) => anchor.getAttribute('href'));
        expect(rendered).toEqual(inventory.links.map((link) => link.href));
        expect(refAnchors.length).toBeGreaterThan(0);
        for (const anchor of refAnchors) {
            expect(anchor.getAttribute('href')).toBe(squash(anchor.textContent ?? ''));
        }
    });

    it('本文・注釈・画像 alt・コード全文が移行元の順序どおり一致する', () => {
        const container = renderPage();
        expect(extractBodyContent(container)).toEqual(inventory.bodyContent);
    });

    it('全形式の図が件数どおり存在し、説明または装飾指定と自然スケールを持つ', () => {
        const container = renderPage();
        const diagramSelector =
            '[data-testid="mermaid-diagram"], .mermaid, [id^="diag-"], .diagram, .diagram-canvas, [data-diagram-id]';
        const diagrams = [...container.querySelectorAll(diagramSelector)].filter(
            (element) => !element.parentElement?.closest(diagramSelector),
        );
        expect(diagrams).toHaveLength(inventory.counts.diagram);
        diagrams.forEach((element) => {
            const labelSource = element.matches('.diagram, .diagram-canvas')
                ? element.querySelector('[data-testid="mermaid-diagram"]') ?? element
                : element;
            const hasLabel = Boolean(
                labelSource?.getAttribute('aria-label')?.trim() ||
                element.getAttribute('aria-label')?.trim(),
            );
            const isDecorative =
                element.getAttribute('data-decorative') === 'true' ||
                element.getAttribute('aria-hidden') === 'true';
            expect(hasLabel || isDecorative).toBe(true);
            const scaleSource = element.querySelector('[data-testid="mermaid-diagram"]') ?? element;
            expect(scaleSource.getAttribute('data-preserve-natural-scale')).toBe('true');
        });
    });

    it('図の aria-label が図番号だけでなく関係性を説明し、図ごとに一意である', () => {
        const container = renderPage();
        const labels = [...container.querySelectorAll('.diagram-canvas')].map(
            (element) => element.getAttribute('aria-label') ?? '',
        );
        expect(labels).toHaveLength(inventory.counts.diagram);
        labels.forEach((label, index) => {
            expect(label.startsWith(`図 ${index + 1}: `)).toBe(true);
            expect(label).not.toMatch(/^図 \d+$/);
        });
        expect(new Set(labels).size).toBe(labels.length);
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
