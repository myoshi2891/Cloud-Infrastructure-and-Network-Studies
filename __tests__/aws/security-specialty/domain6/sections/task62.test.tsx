// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Task62 from '@/app/aws/security-specialty/domain6/sections/Task62';
import fixture from '@/docs/migration-inventory/aws-scs-c03-domain6-guide.fidelity.json';

vi.mock('@/components/MermaidDiagram', async () => ({
    MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock,
}));

describe('Task62 Section (Part B: Task 6.2 安全で一貫したリソースのデプロイ戦略)', () => {
    const part = fixture.guideParts.task62;

    it('renders all headings matching fixture', () => {
        const { container } = render(<Task62 />);
        const renderedHeadings = [...container.querySelectorAll('h1, h2, h3, h4')].map((el) => ({
            tag: el.tagName.toLowerCase(),
            id: el.id,
            text: el.textContent?.trim().replace(/\s+/g, ' ') ?? '',
        }));
        expect(renderedHeadings).toHaveLength(part.headings.length);
        part.headings.forEach((h, i) => {
            expect(renderedHeadings[i]!.tag).toBe(h.tag);
            expect(renderedHeadings[i]!.id).toBe(h.id);
            expect(renderedHeadings[i]!.text).toBe(h.text.replace(/\s+/g, ' '));
        });
    });

    it('renders all tables with scope="col" and table-scroll container attributes', () => {
        const { container } = render(<Task62 />);
        const tables = container.querySelectorAll('table');
        expect(tables).toHaveLength(part.tables.length);
        tables.forEach((table, i) => {
            const expectedCells = part.tables[i]!.flatMap((row) =>
                row.map((c) => c.text.replace(/\s+/g, ' ')),
            );
            const ths = [...table.querySelectorAll('th')];
            const allCells = [...table.querySelectorAll('th, td')].map(
                (c) => c.textContent?.trim().replace(/\s+/g, ' ') ?? '',
            );
            expect(allCells).toEqual(expectedCells);
            ths.forEach((th) => {
                expect(th).toHaveAttribute('scope', 'col');
            });
        });
        const scrolls = container.querySelectorAll('.table-scroll');
        expect(scrolls).toHaveLength(part.tables.length);
        scrolls.forEach((scroll) => {
            expect(scroll).toHaveAttribute('role', 'region');
            expect(scroll).toHaveAttribute('tabIndex', '0');
            expect(scroll.getAttribute('aria-label')).toBeTruthy();
        });
    });

    it('renders diagrams with natural scale and accessible labels', () => {
        const { container } = render(<Task62 />);
        const diagrams = container.querySelectorAll('.mermaid-wrap');
        expect(diagrams).toHaveLength(part.diagrams.length);
        diagrams.forEach((diag) => {
            expect(diag).toHaveAttribute('role', 'region');
            expect(diag).toHaveAttribute('tabIndex', '0');
            expect(diag.getAttribute('aria-label')).toBeTruthy();
            expect(diag.querySelector('.sr-only')?.textContent?.trim()).toBeTruthy();
        });
    });

    it('renders all code blocks with proper syntax container attributes and code-line structure', () => {
        const { container } = render(<Task62 />);
        const codeBlocks = container.querySelectorAll('pre.code.code-block');
        expect(codeBlocks).toHaveLength(part.codes.length);
        codeBlocks.forEach((block, i) => {
            expect(block).toHaveAttribute('role', 'group');
            expect(block).toHaveAttribute('tabIndex', '0');
            expect(block.getAttribute('aria-label')).toContain('コード例');
            const lines = block.querySelectorAll('.code-line');
            expect(lines).toHaveLength(part.codes[i]!.length);
        });
    });
});

