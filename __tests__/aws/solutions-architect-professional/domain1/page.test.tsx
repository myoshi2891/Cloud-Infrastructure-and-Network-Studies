import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Page from '@/app/aws/solutions-architect-professional/domain1/page';
import inventory from '@/docs/migration-inventory/aws-sap-c02-domain1.json';
import {
    MermaidDiagramMock,
    codeBlockSelector,
    codeLineCount,
    extractBodyContent,
    squash,
    withBlockBoundarySpaces,
} from '@/__tests__/helpers/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => ({
    MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock,
}));

describe('AWS SAP-C02 Domain 1 — 移行元コンテンツの全量移行', () => {
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

    it('本文・注釈・コード全文が移行元の順序どおり一致する', () => {
        const container = renderPage();
        expect(extractBodyContent(withBlockBoundarySpaces(container))).toEqual(inventory.bodyContent);
    });

    it('全19点の図が件数どおり存在し、説明または装飾指定と自然スケールを持つ', () => {
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

    it('テーブルが件数どおり49件存在し、thead と th[scope=col] を持つ', () => {
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

    it('全テーブルが .table-scroll でラップされ、キーボード操作可能でアクセシブル名を持つ', () => {
        const container = renderPage();
        const wrappers = [...container.querySelectorAll('.table-scroll')];
        expect(wrappers).toHaveLength(inventory.counts.table);
        wrappers.forEach((wrapper) => {
            expect(wrapper).toHaveAttribute('tabindex', '0');
            expect(wrapper).toHaveAttribute('role', 'region');
            expect(wrapper.getAttribute('aria-label')?.trim()).toBeTruthy();
        });
    });

    it('コードブロックが .code-line でラップされ、行数が一致する', () => {
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
