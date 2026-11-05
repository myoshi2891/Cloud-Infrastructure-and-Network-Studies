// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Appendix from '@/app/aws/security-specialty/domain3/sections/Appendix';
import fixture from '@/docs/migration-inventory/aws-scs-c03-domain3-guide.fidelity.json';

describe('Appendix Section (10. 参考 URL 根拠ソース一覧)', () => {
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

    it('renders all external reference links preserving text and order', () => {
        const { container } = render(<Appendix />);
        const renderedLinks = [...container.querySelectorAll('a[href^="http"]')].map((a) => ({
            href: a.getAttribute('href'),
            text: a.textContent?.trim().replace(/\s+/g, ' ') ?? '',
        }));
        expect(renderedLinks).toHaveLength(part.links.length);
        part.links.forEach((link, i) => {
            expect(renderedLinks[i]!.href).toBe(link.href);
            expect(renderedLinks[i]!.text).toBe(link.text.replace(/\s+/g, ' '));
        });
    });

    it('retains body content matching fixture text', () => {
        const { container } = render(<Appendix />);
        const renderedText = container.textContent?.replace(/\s+/g, ' ').trim() ?? '';
        const expectedWords = part.text.replace(/\s+/g, ' ').trim().split(' ');
        for (const word of expectedWords.slice(0, 50)) {
            expect(renderedText).toContain(word);
        }
    });
});

