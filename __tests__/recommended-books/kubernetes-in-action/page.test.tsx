// __tests__/recommended-books/kubernetes-in-action/page.test.tsx
// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import inventory from '@/docs/migration-inventory/kubernetes-in-action.json';
import Page from '@/app/recommended-books/kubernetes-in-action/page';
import { defineMigrationSuite } from '@/__tests__/helpers/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

defineMigrationSuite(
    'Kubernetes in Action, Second Edition 完全解説ガイド — 全量移行検証',
    Page,
    inventory,
);

describe('Kubernetes in Action, Second Edition 完全解説ガイド — 詳細仕様検証', () => {
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
        expect(checkboxes && checkboxes.length).toBe(19);
        const labels = checklist?.querySelectorAll('label');
        expect(labels && labels.length).toBe(19);
    });

    it('参考文献カード(ref-card)が27件存在し、外部リンクが正しく設定されている', () => {
        const container = renderPage();
        const cards = container.querySelectorAll('.ref-card');
        expect(cards).toHaveLength(27);
        cards.forEach((card) => {
            const badge = card.querySelector('.num');
            expect(badge?.textContent?.trim()).toMatch(/^[0-9]+$/);
            const link = card.querySelector('a');
            expect(link?.getAttribute('href')).toMatch(/^https?:\/\//);
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

    it('全15件のテーブルが存在し、すべてtheadとth[scope="col"]を持つ', () => {
        const container = renderPage();
        const tables = container.querySelectorAll('table');
        expect(tables).toHaveLength(15);
        tables.forEach((table, index) => {
            expect(table.querySelector('thead')).not.toBeNull();
            expect(table.querySelectorAll('thead th[scope="col"]').length).toBe(
                inventory.structures.tableColumnHeaders[index],
            );
        });
    });
});
