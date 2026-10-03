import { describe, expect, it } from 'vitest';
import { EXAMS } from '@/app/constants';

describe('TanenbaumのBooks統合', () => {
    it('Booksの書籍カード・ナビが新ルートを参照する', () => {
        const entries = EXAMS.filter(exam => exam.id === 'computer-networks-tanenbaum');
        expect(entries).toHaveLength(1);
        expect(entries[0]).toMatchObject({
            provider: 'Books', href: '/recommended-books/computer-networks-tanenbaum',
            score: '全10ステップ / 21図解',
        });
        expect(entries[0]?.domains.map(domain => domain.href)).toEqual(['/recommended-books/computer-networks-tanenbaum']);
    });
});
