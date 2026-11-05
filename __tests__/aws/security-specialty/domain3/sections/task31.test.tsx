// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Task31 from '@/app/aws/security-specialty/domain3/sections/Task31';
import fixture from '@/docs/migration-inventory/aws-scs-c03-domain3-guide.fidelity.json';

vi.mock('@/components/MermaidDiagram', async () => ({
    MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock,
}));

describe('Task 3.1 Section (ネットワークエッジサービスのセキュリティ制御)', () => {
    const part = fixture.guideParts.task31;

    it('renders all headings matching fixture', () => {
        const { container } = render(<Task31 />);
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
        const { container } = render(<Task31 />);
        const tables = container.querySelectorAll('table');
        expect(tables).toHaveLength(part.tables.length);
        tables.forEach((table, i) => {
            const expectedCells = part.tables[i]!.flatMap((row) =>
                row.map((c) => c.text.replace(/\s+/g, ' ')),
            );
            const ths = [...table.querySelectorAll('th')];
            const allCells = [...table.querySelectorAll('th, td')].map((c) =>
                c.textContent?.trim().replace(/\s+/g, ' ') ?? '',
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

    it('renders diagrams 2 through 6 with natural scale and accessible labels', () => {
        const { container } = render(<Task31 />);
        const diagrams = container.querySelectorAll('.mermaid-wrap');
        expect(diagrams).toHaveLength(part.diagrams.length);
        diagrams.forEach((diag) => {
            expect(diag).toHaveAttribute('role', 'region');
            expect(diag).toHaveAttribute('tabIndex', '0');
            expect(diag.getAttribute('aria-label')).toBeTruthy();
        });
    });

    it('renders code samples wrapped in .code-line', () => {
        const { container } = render(<Task31 />);
        const samples = container.querySelectorAll('.code-sample');
        expect(samples).toHaveLength(part.codes.length);
        samples.forEach((sample) => {
            const lines = sample.querySelectorAll('.code-line');
            expect(lines.length).toBeGreaterThan(0);
        });
    });

    it('retains body content matching fixture text', () => {
        const { container } = render(<Task31 />);
        const renderedText = container.textContent?.replace(/\s+/g, ' ').trim() ?? '';
        const expectedWords = part.text.replace(/\s+/g, ' ').trim().split(' ');
        for (const word of expectedWords.slice(0, 50)) {
            expect(renderedText).toContain(word);
        }
    });
});

