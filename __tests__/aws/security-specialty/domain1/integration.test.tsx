import { fireEvent, render, within } from '@testing-library/react';
import { expect, it } from 'vitest';
import { EXAMS } from '@/app/constants';
import { toNavTree } from '@/app/navigation';
import Home from '@/app/page';
import { Header } from '@/components/Header';

const route = '/aws/security-specialty/domain1';

it('retains SCS-C03 complete guide and exposes Domain 1 from EXAMS and derived navigation', () => {
    const exam = EXAMS.find((e) => e.id === 'aws-scs')!;
    expect(exam.href).toBe('/aws/security-specialty');
    expect(exam.domains).toEqual([
        { label: 'SCS-C03 完全ガイド', href: '/aws/security-specialty', pct: '全6ドメイン' },
        { label: 'ドメイン1: 検出 (Detection)', href: route, pct: '16%' },
    ]);
    expect(JSON.stringify(toNavTree(EXAMS))).toContain(route);
});

it('exposes Domain 1 from the home card and Header', () => {
    const { container } = render(
        <>
            <Home />
            <Header />
        </>,
    );
    expect(container.querySelector('article a[href="' + route + '"]')).not.toBeNull();
    fireEvent.click(within(container).getByRole('button', { name: 'メニューを開く' }));
    expect(
        within(container)
            .getByRole('dialog', { name: 'サイトナビゲーション' })
            .querySelector('a[href="' + route + '"]'),
    ).not.toBeNull();
});
