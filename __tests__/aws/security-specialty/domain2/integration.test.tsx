import { fireEvent, render, within } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';
import { EXAMS } from '@/app/constants';
import { toNavTree } from '@/app/navigation';
import Home from '@/app/page';
import { Header } from '@/components/Header';

const route = '/aws/security-specialty/domain2';

it('retains SCS-C03 complete guide and exposes Domain 2 from EXAMS and derived navigation', () => {
    const exam = EXAMS.find((e) => e.id === 'aws-scs')!;
    expect(exam.href).toBe('/aws/security-specialty');
    expect(exam.domains).toContainEqual({
        label: 'ドメイン2: インシデント対応 (Incident Response)',
        href: route,
        pct: '14%',
    });
    expect(JSON.stringify(toNavTree(EXAMS))).toContain(route);
});

it('exposes Domain 2 from the home card and Header', () => {
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

it('registers the source light palette for the shared footer and defines SCS-D2 tokens', () => {
    expect(readFileSync('components/Footer.module.css', 'utf8')).toContain('.scs-domain2-page');
    expect(readFileSync('app/globals.css', 'utf8')).toContain('--color-scs-d2-');
});

