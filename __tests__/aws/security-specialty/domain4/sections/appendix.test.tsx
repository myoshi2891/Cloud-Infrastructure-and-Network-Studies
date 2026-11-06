// @vitest-environment jsdom
import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Appendix from '@/app/aws/security-specialty/domain4/sections/Appendix';
import fixture from '@/docs/migration-inventory/aws-scs-c03-domain4-guide.fidelity.json';

describe('Appendix Section (14. 参考ソース一覧 + 15. 学習チェックリスト)', () => {
    const part = fixture.guideParts.appendix;

    it('renders all headings matching fixture', () => {
        const { container } = render(<Appendix />);
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
        const { container } = render(<Appendix />);
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

    it('renders all 108 external links in tables', () => {
        const { container } = render(<Appendix />);
        const links = container.querySelectorAll('a[href^="http"]');
        expect(links).toHaveLength(part.links.length);
        part.links.forEach((l, i) => {
            expect(links[i]?.getAttribute('href')).toBe(l.href);
            expect(links[i]?.textContent?.trim().replace(/\s+/g, ' ')).toBe(
                l.text.replace(/\s+/g, ' '),
            );
        });
    });

    it('renders 11 checklist items and updates progress on check/uncheck', () => {
        const { container } = render(<Appendix />);
        const checkboxes = container.querySelectorAll('input[type="checkbox"]');
        expect(checkboxes).toHaveLength(11);

        const countSpan = container.querySelector('.checklist-header .count');
        expect(countSpan?.textContent).toBe('0 / 11 完了');

        fireEvent.click(checkboxes[0]!);
        expect(countSpan?.textContent).toBe('1 / 11 完了');

        fireEvent.click(checkboxes[1]!);
        expect(countSpan?.textContent).toBe('2 / 11 完了');

        fireEvent.click(checkboxes[0]!);
        expect(countSpan?.textContent).toBe('1 / 11 完了');
    });
});
