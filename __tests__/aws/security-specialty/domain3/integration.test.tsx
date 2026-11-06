// @vitest-environment jsdom
import { fireEvent, render, within } from '@testing-library/react';
import { expect, it } from 'vitest';
import { EXAMS } from '@/app/constants';
import { toNavTree } from '@/app/navigation';
import Home from '@/app/page';
import { Header } from '@/components/Header';

const route = '/aws/security-specialty/domain3';

it('retains SCS-C03 complete guide and exposes Domain 3 from EXAMS and derived navigation', () => {
    const exam = EXAMS.find((e) => e.id === 'aws-scs')!;
    expect(exam.href).toBe('/aws/security-specialty');
    expect(exam.domains).toContainEqual({
        label: 'ドメイン3: インフラストラクチャセキュリティ (Infrastructure Security)',
        href: route,
        pct: '18%',
    });
    expect(JSON.stringify(toNavTree(EXAMS))).toContain(route);
});

it('exposes Domain 3 from the home card and Header', () => {
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

