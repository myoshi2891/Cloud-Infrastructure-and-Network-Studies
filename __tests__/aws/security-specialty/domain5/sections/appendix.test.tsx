// @vitest-environment jsdom
import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Appendix from '@/app/aws/security-specialty/domain5/sections/Appendix';
import fixture from '@/docs/migration-inventory/aws-scs-c03-domain5-guide.fidelity.json';

describe('Appendix Section (8. 最終チェックリスト + 9. 参考ソース(URL) + 付録)', () => {
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

    it('renders all 57 external links in tables', () => {
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

    it('renders 23 checklist items across 3 cards and updates progress on check/uncheck', () => {
        const { container } = render(<Appendix />);
        const cards = container.querySelectorAll('.checklist-card');
        expect(cards).toHaveLength(3);

        const card1Boxes = cards[0]!.querySelectorAll('input[type="checkbox"]');
        const card2Boxes = cards[1]!.querySelectorAll('input[type="checkbox"]');
        const card3Boxes = cards[2]!.querySelectorAll('input[type="checkbox"]');

        expect(card1Boxes).toHaveLength(7);
        expect(card2Boxes).toHaveLength(8);
        expect(card3Boxes).toHaveLength(8);

        const counts = container.querySelectorAll('.checklist-header .count');
        expect(counts).toHaveLength(3);
        expect(counts[0]?.textContent).toBe('0 / 7 完了');
        expect(counts[1]?.textContent).toBe('0 / 8 完了');
        expect(counts[2]?.textContent).toBe('0 / 8 完了');

        // Card 1 の操作
        fireEvent.click(card1Boxes[0]!);
        expect(counts[0]?.textContent).toBe('1 / 7 完了');
        expect(counts[1]?.textContent).toBe('0 / 8 完了');

        // Card 2 の操作
        fireEvent.click(card2Boxes[0]!);
        fireEvent.click(card2Boxes[1]!);
        expect(counts[0]?.textContent).toBe('1 / 7 完了');
        expect(counts[1]?.textContent).toBe('2 / 8 完了');

        // Card 1 のチェック解除
        fireEvent.click(card1Boxes[0]!);
        expect(counts[0]?.textContent).toBe('0 / 7 完了');
    });
});
