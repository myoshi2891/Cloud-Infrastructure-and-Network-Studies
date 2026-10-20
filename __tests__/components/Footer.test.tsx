import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/Footer';

describe('Footer', () => {
    it('フッターが表示されること', () => {
        render(<Footer />);
        expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('免責事項の全文を見出し付きで表示すること', () => {
        render(<Footer />);
        expect(screen.getByRole('heading', { name: '免責事項', level: 2 })).toBeInTheDocument();
        expect(screen.getByText('本サイトは個人学習を目的として作成したものです。掲載内容の正確性・完全性は保証されておらず、試験の合否を含むいかなる結果に対しても責任を負いません。')).toBeInTheDocument();
        expect(screen.getByText('最新の公式情報は各試験プロバイダーの公式サイトをご確認ください。')).toBeInTheDocument();
    });

    it('免責事項を名前付きの領域として提供すること', () => {
        render(<Footer />);
        expect(screen.getByRole('region', { name: '免責事項' })).toBeInTheDocument();
    });

    it('著作権表示が含まれること', () => {
        render(<Footer />);
        expect(screen.getByText(/cloud infrastructure studies/i)).toBeInTheDocument();
    });
});
