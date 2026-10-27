// __tests__/aws/security-specialty/domain1/page.test.tsx
// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import inventory from '@/docs/migration-inventory/aws-scs-c03-domain1-guide.json';
import Page from '@/app/aws/security-specialty/domain1/page';
import {
    MermaidDiagramMock,
    codeBlockSelector,
    codeLineCount,
    extractBodyContent,
    normalizeSpaces,
    squash,
    withBlockBoundarySpaces,
} from '@/__tests__/helpers/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => ({
    MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock,
}));

describe('aws-scs-c03-domain1-guide — 移行元コンテンツの全量移行', () => {
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

    it('外部リンクが件数・順序・URL まで移行元と一致する', () => {
        const container = renderPage();
        const rendered = [...container.querySelectorAll('a[href^="http"]')].map((anchor) =>
            anchor.getAttribute('href'),
        );
        expect(rendered).toEqual(inventory.links.map((link) => link.href));
    });

    it('本文・注釈・画像 alt・コード全文が移行元の順序どおり一致する', () => {
        const container = renderPage();
        const normalize = (blocks: { kind: string; text: string }[]) =>
            blocks.map((block) => ({ ...block, text: normalizeSpaces(block.text) }));
        expect(normalize(extractBodyContent(withBlockBoundarySpaces(container)))).toEqual(
            normalize(inventory.bodyContent),
        );
    });

    it('全形式の図が件数どおり存在し、説明または装飾指定と自然スケールを持つ', () => {
        const container = renderPage();
        const diagramSelector = '[data-testid="mermaid-diagram"], .mermaid, [id^="diag-"]';
        const diagrams = [...container.querySelectorAll(diagramSelector)].filter(
            (element) => !element.querySelector(diagramSelector),
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

    it('makes every source table horizontally scrollable by keyboard with an accessible label', () => {
        const container = renderPage();
        const wrappers = container.querySelectorAll('.table-scroll');
        expect(wrappers).toHaveLength(inventory.counts.table);
        wrappers.forEach((wrapper) => {
            expect(wrapper).toHaveAttribute('tabindex', '0');
            expect(wrapper).toHaveAttribute('role', 'region');
            expect(wrapper.getAttribute('aria-label')?.trim()).toBeTruthy();
        });
    });

    it('gives both code scroll regions unique accessible names derived from their headings', () => {
        const container = renderPage();
        const blocks = [...container.querySelectorAll('.code-block')];
        expect(blocks).toHaveLength(inventory.counts.codeBlock);
        const labels = blocks.map((block) => block.getAttribute('aria-label'));
        expect(labels.every((label) => Boolean(label?.trim()))).toBe(true);
        expect(new Set(labels).size).toBe(inventory.counts.codeBlock);
    });

    it('gives every table and diagram scroll region a unique accessible name', () => {
        const container = renderPage();
        const regions = [...container.querySelectorAll('[role="region"]')];
        expect(regions).toHaveLength(
            inventory.counts.table + inventory.counts.diagram + inventory.counts.codeBlock,
        );
        const labels = regions.map((region) => region.getAttribute('aria-label'));
        expect(labels.every((label) => Boolean(label?.trim()))).toBe(true);
        expect(new Set(labels).size).toBe(regions.length);
    });

    it('avoids hydration-invalid whitespace children in every table structural element', () => {
        const container = renderPage();
        container.querySelectorAll('table,thead,tbody,tfoot,tr,colgroup').forEach((element) => {
            expect(
                [...element.childNodes].filter((node) => node.nodeType === Node.TEXT_NODE),
                element.tagName,
            ).toHaveLength(0);
        });
    });
});

