import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Home from '@/app/page';
import { EXAMS, cardColorMap } from '@/app/constants';
import { toNavTree } from '@/app/navigation';
import { Header } from '@/components/Header';
import fixture from '@/docs/migration-inventory/aws-aip-c01-guide.fidelity.json';
import { readFileSync } from 'node:fs';

const route = '/aws/generative-ai-developer-professional';
const domains = fixture.guideDesign.nav.filter(item => item.level === 2 && /ドメイン[1-5]/.test(item.label));
describe('AIP home and Header integration', () => {
    it('registers an available AWS professional exam and five implemented domain links, including domain1, domain2 and domain3 detail guides', () => {
        const exam = EXAMS.find(exam => exam.id === 'aws-aip');
        expect(exam).toMatchObject({ provider: 'AWS', status: 'available', badge: 'AIP-C01', href: route, color: 'card-aws-aip', level: 'Professional' });
        expect(exam?.domains.map(domain => domain.href)).toEqual(domains.map((domain, index) => index < 3 ? `${route}/domain${index + 1}` : `${route}#${domain.id}`));
        expect(exam?.domains.map(domain => domain.pct)).toEqual(['31%', '26%', '20%', '12%', '11%']);
        expect(cardColorMap).toHaveProperty('card-aws-aip', 'card-aws-aip');
        const nav = toNavTree(EXAMS).find(group => group.provider === 'AWS')?.exams.find(exam => exam.id === 'aws-aip');
        expect(nav?.items.map(item => item.href)).toEqual([route, ...domains.map((domain, index) => index < 3 ? `${route}/domain${index + 1}` : `${route}#${domain.id}`)]);
    });
    it('renders an AIP homepage card and the real Header drawer entry', () => {
        const { unmount } = render(<Home />);
        const card = screen.getByRole('heading', { name: 'AWS Certified Generative AI Developer - Professional' }).closest('article');
        expect(card?.querySelector('a.home-card-cta')).toHaveAttribute('href', route);
        expect(card).toHaveClass('card-aws-aip');
        unmount(); render(<Header />);
        fireEvent.click(screen.getByRole('button', { name: 'メニューを開く' }));
        const drawer = screen.getByRole('dialog', { hidden: true });
        expect(within(drawer).getByRole('link', { name: 'AIP-C01 初学者向け完全ガイド', hidden: true })).toHaveAttribute('href', route);
    });
    it('supplies card and icon styles using the shared AWS theme', () => {
        const css = readFileSync('app/globals.css', 'utf8');
        expect(css).toMatch(/\.card-aws-aip\s*\{[^}]*--card-accent:\s*var\(--color-theme-aws-fg\)/);
        expect(css).toMatch(/@utility icon-theme-aws-aip\s*\{[^}]*background:\s*var\(--color-theme-aws-bg\);[^}]*color:\s*var\(--color-theme-aws-fg\)/s);
    });
});
