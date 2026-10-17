import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Home from '@/app/page';
import { EXAMS } from '@/app/constants';
import { toNavTree } from '@/app/navigation';
import { Header } from '@/components/Header';

const route = '/aws/generative-ai-developer-professional/domain1';
describe('AIP domain1 homepage and Header integration', () => {
    it('routes domain1 to the detail guide and retains its 31% weight and overview', () => {
        const exam = EXAMS.find(item => item.id === 'aws-aip');
        expect(exam?.href).toBe('/aws/generative-ai-developer-professional');
        expect(exam?.domains[0]).toMatchObject({ href: route, pct: '31%' });
        const items = toNavTree(EXAMS).find(group => group.provider === 'AWS')?.exams.find(item => item.id === 'aws-aip')?.items;
        expect(items?.[1]?.href).toBe(route);
    });
    it('exposes the new detail route from the actual home card and Header', () => {
        const { unmount } = render(<Home />);
        const card = screen.getByRole('heading', { name: 'AWS Certified Generative AI Developer - Professional' }).closest('article')!;
        expect(card.querySelector(`a[href="${route}"]`)).not.toBeNull();
        unmount(); render(<Header />);
        fireEvent.click(screen.getByRole('button', { name: 'メニューを開く' }));
        const drawer = screen.getByRole('dialog', { hidden: true });
        expect(within(drawer).getByRole('link', { name: 'ドメイン1: FM統合・データ管理・コンプライアンス', hidden: true })).toHaveAttribute('href', route);
    });
});
