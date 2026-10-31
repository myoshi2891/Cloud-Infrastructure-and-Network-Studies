import { fireEvent, render, within } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { EXAMS, cardColorMap } from '@/app/constants';
import { toNavTree } from '@/app/navigation';
import Home from '@/app/page';
import { Header } from '@/components/Header';

describe('AWS SAP-C02 Domain 1 — ルーティング・ナビゲーション統合', () => {
    const route = '/aws/solutions-architect-professional/domain1';

    it('EXAMS 配列に SAP-C02 が正しく登録されている', () => {
        const exam = EXAMS.find((e) => e.id === 'aws-sap');
        expect(exam).toBeDefined();
        expect(exam).toMatchObject({
            id: 'aws-sap',
            label: 'AWS Certified Solutions Architect - Professional',
            abbr: 'SAP',
            level: 'Professional',
            provider: 'AWS',
            status: 'available',
            href: '/aws/solutions-architect-professional',
            badge: 'SAP-C02',
            color: 'card-aws-sap',
            overviewLabel: 'SAP-C02 完全ガイド',
        });
        expect(exam?.domains).toEqual([{label:'SAP-C02 完全ガイド',href:'/aws/solutions-architect-professional',pct:'全4ドメイン'},
            { label: 'ドメイン1: 組織の複雑さに対応する設計', href: route, pct: '26%' },
            { label: 'ドメイン2: 新しいソリューションの設計', href: '/aws/solutions-architect-professional/domain2', pct: '29%' },
            { label: 'ドメイン3: 既存ソリューションの継続的改善', href: '/aws/solutions-architect-professional/domain3', pct: '25%' },
        ]);
    });

    it('ナビゲーションツリーにドメイン1の項目が含まれている', () => {
        const awsGroup = toNavTree(EXAMS).find((g) => g.provider === 'AWS');
        expect(awsGroup).toBeDefined();

        const sapExam = awsGroup?.exams.find((e) => e.id === 'aws-sap');
        expect(sapExam).toBeDefined();
        expect(sapExam?.items).toEqual([{label:'SAP-C02 完全ガイド',href:'/aws/solutions-architect-professional'},
            { label: 'ドメイン1: 組織の複雑さに対応する設計', href: route },
            { label: 'ドメイン2: 新しいソリューションの設計', href: '/aws/solutions-architect-professional/domain2' },
            { label: 'ドメイン3: 既存ソリューションの継続的改善', href: '/aws/solutions-architect-professional/domain3' },
        ]);
    });

    it('cardColorMap に card-aws-sap が定義されている', () => {
        expect(cardColorMap).toHaveProperty('card-aws-sap', 'card-aws-sap');
    });

    it('ホームページカードと Header ナビゲーションに Domain 1 への導線が存在する', () => {
        const { container, unmount } = render(<Home />);
        const card = within(container)
            .getByRole('heading', { name: 'AWS Certified Solutions Architect - Professional' })
            .closest('article');
        expect(card).toHaveClass('card-aws-sap');
        expect(card?.querySelector('a.home-card-cta')).toHaveAttribute('href', '/aws/solutions-architect-professional');

        unmount();
        const header = render(<Header />);
        fireEvent.click(within(header.container).getByRole('button', { name: 'メニューを開く' }));
        const dialog = within(header.container).getByRole('dialog', { name: 'サイトナビゲーション' });
        expect(dialog.querySelectorAll(`a[href="${route}"]`)).toHaveLength(1);
        expect(dialog.querySelectorAll('a[href="/aws/solutions-architect-professional/domain2"]')).toHaveLength(1);
        expect(dialog.querySelectorAll('a[href="/aws/solutions-architect-professional/domain3"]')).toHaveLength(1);
    });

    it('app/globals.css に card-aws-sap と icon-theme-aws-sap が定義されている', () => {
        const css = readFileSync('app/globals.css', 'utf8');
        expect(css).toMatch(/\.card-aws-sap\s*\{[^}]*--card-accent:\s*var\(--color-theme-aws-fg\)/);
        expect(css).toMatch(/@utility icon-theme-aws-sap\s*\{[^}]*background:\s*var\(--color-theme-aws-bg\);[^}]*color:\s*var\(--color-theme-aws-fg\)/);
    });

    it('components/Footer.module.css に .sap-domain1-page が登録されている', () => {
        const css = readFileSync('components/Footer.module.css', 'utf8');
        expect(css).toContain('.sap-domain1-page');
    });
});
