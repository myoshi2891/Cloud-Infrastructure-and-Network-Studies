// __tests__/aws/security-specialty/domain2/hero.test.tsx
// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Hero from '@/app/aws/security-specialty/domain2/sections/Hero';

vi.mock('@/components/MermaidDiagram', async () => ({
    MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock,
}));

describe('Hero & Foundation Section (Steps 0, 1, 2)', () => {
    it('renders hero title and meta information', () => {
        const { container } = render(<Hero />);
        const h1 = container.querySelector('h1');
        expect(h1?.textContent?.replace(/\s+/g, ' ')).toContain('AWS Certified Security - Specialty (SCS-C03) Content Domain 2: Incident Response');
        expect(container.querySelector('.kicker')?.textContent).toBe('AWS Certified Security - Specialty · Domain 2');
    });

    it('renders all section headings for steps 0, 1, 2', () => {
        const { container } = render(<Hero />);
        const h2Texts = [...container.querySelectorAll('h2')].map((h) => h.textContent?.trim());
        expect(h2Texts).toContain('0. この資料の使い方と試験情報');
        expect(h2Texts).toContain('1. Domain 2 の全体像');
        expect(h2Texts).toContain('2. 初学者向け基礎知識');
    });

    it('renders tables in hero section with proper scope and region attributes', () => {
        const { container } = render(<Hero />);
        const tables = container.querySelectorAll('table');
        expect(tables).toHaveLength(10);
        tables.forEach((table) => {
            expect(table.querySelector('thead th[scope="col"]')).not.toBeNull();
        });
        const scrolls = container.querySelectorAll('.table-scroll');
        scrolls.forEach((scroll) => {
            expect(scroll).toHaveAttribute('role', 'region');
            expect(scroll).toHaveAttribute('tabIndex', '0');
        });
    });

    it('renders diagrams 0, 1, 2 with natural scale and accessible labels', () => {
        const { container } = render(<Hero />);
        const diagrams = container.querySelectorAll('.mermaid-wrap');
        expect(diagrams).toHaveLength(3);
        diagrams.forEach((diag) => {
            expect(diag).toHaveAttribute('role', 'region');
            expect(diag).toHaveAttribute('tabIndex', '0');
            expect(diag.getAttribute('aria-label')).toBeTruthy();
        });
    });
});
