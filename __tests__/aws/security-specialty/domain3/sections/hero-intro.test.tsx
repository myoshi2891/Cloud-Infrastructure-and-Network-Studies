// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import HeroIntro from '@/app/aws/security-specialty/domain3/sections/HeroIntro';
import fixture from '@/docs/migration-inventory/aws-scs-c03-domain3-guide.fidelity.json';

vi.mock('@/components/MermaidDiagram', async () => ({
    MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock,
}));

describe('HeroIntro Section (Hero + 1. 使い方 + 2. 全体像 + 3. 前提知識)', () => {
    const part = fixture.guideParts.herointro;

    it('renders hero title and kicker', () => {
        const { container } = render(<HeroIntro />);
        const h1 = container.querySelector('h1');
        expect(h1?.textContent?.replace(/\s+/g, ' ')).toContain(
            'AWS Certified Security - Specialty (SCS-C03) Content Domain 3: Infrastructure Security 初学者向けステップバイステップガイド',
        );
        expect(container.querySelector('.kicker')?.textContent).toBe(
            'AWS Certified Security - Specialty · Domain 3',
        );
    });

    it('renders all headings matching fixture', () => {
        const { container } = render(<HeroIntro />);
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
        const { container } = render(<HeroIntro />);
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

    it('renders diagrams with natural scale and accessible labels', () => {
        const { container } = render(<HeroIntro />);
        const diagrams = container.querySelectorAll('.mermaid-wrap');
        expect(diagrams).toHaveLength(part.diagrams.length);
        diagrams.forEach((diag) => {
            expect(diag).toHaveAttribute('role', 'region');
            expect(diag).toHaveAttribute('tabIndex', '0');
            expect(diag.getAttribute('aria-label')).toBeTruthy();
        });
    });

    it('retains body content matching fixture text', () => {
        const { container } = render(<HeroIntro />);
        const renderedText = container.textContent?.replace(/\s+/g, ' ').trim() ?? '';
        const expectedWords = part.text.replace(/\s+/g, ' ').trim().split(' ');
        // 主要な文言・キーワードが含まれていることを検証
        for (const word of expectedWords.slice(0, 50)) {
            expect(renderedText).toContain(word);
        }
    });
});
