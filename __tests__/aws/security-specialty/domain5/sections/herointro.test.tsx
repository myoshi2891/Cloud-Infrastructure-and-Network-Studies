// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import HeroIntro from '@/app/aws/security-specialty/domain5/sections/HeroIntro';
import fixture from '@/docs/migration-inventory/aws-scs-c03-domain5-guide.fidelity.json';

vi.mock('@/components/MermaidDiagram', async () => ({
    MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock,
}));

describe('HeroIntro Section (Hero + 1. 使い方と全体像 + 2. 基礎知識)', () => {
    const part = fixture.guideParts.herointro;

    it('renders hero title and kicker', () => {
        const { container } = render(<HeroIntro />);
        const h1 = container.querySelector('h1');
        expect(h1?.textContent?.replace(/\s+/g, ' ')).toContain(
            'AWS Certified Security - Specialty (SCS-C03) Content Domain 5: Data Protection 完全ガイド(初学者向け・ステップバイステップ)',
        );
        expect(container.querySelector('.kicker')?.textContent?.trim()).toBe(
            'AWS Certified Security - Specialty (SCS-C03) · Domain 5',
        );
    });

    it('renders every hero metadata pill matching fixture, including the exam weighting', () => {
        const { container } = render(<HeroIntro />);
        const pills = [...container.querySelectorAll('.meta-row .pill')];
        expect(pills).toHaveLength(4);
        expect(pills.map((pill) => pill.querySelector('strong')?.textContent)).toEqual(
            part.inline.slice(0, 4).map((item) => item.text),
        );
        const rendered = pills.map((pill) => pill.textContent?.trim().replace(/\s+/g, ' ')).join(' ');
        expect(part.text).toContain(`ステップバイステップ) ${rendered} 対象試験:`);
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
        const { container } = render(<HeroIntro />);
        const diagrams = container.querySelectorAll('.mermaid-wrap');
        expect(diagrams).toHaveLength(part.diagrams.length);
        diagrams.forEach((diag) => {
            expect(diag).toHaveAttribute('role', 'region');
            expect(diag).toHaveAttribute('tabIndex', '0');
            expect(diag.getAttribute('aria-label')).toBeTruthy();
            expect(diag.querySelector('.sr-only')?.textContent?.trim()).toBeTruthy();
        });
    });
});
