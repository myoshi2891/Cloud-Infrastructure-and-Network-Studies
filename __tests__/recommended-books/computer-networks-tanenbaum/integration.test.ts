import { describe, expect, it } from 'vitest';
import { EXAMS } from '@/app/constants';
import { toNavTree } from '@/app/navigation';

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
    it('カードとHeaderが既存のネットワーク書籍用の配色を共有し、Books目次に1リンクを登録する', () => {
        const entry = EXAMS.find(exam => exam.id === 'computer-networks-tanenbaum');
        expect(entry?.color).toBe('card-computer-networking-topdown');
        const nav = toNavTree(EXAMS).find(group => group.provider === 'Books')?.exams.find(exam => exam.id === 'computer-networks-tanenbaum');
        expect(nav?.colorClass).toBe('card-computer-networking-topdown');
        expect(nav?.items).toEqual([{ label: '概要', href: '/recommended-books/computer-networks-tanenbaum' }]);
    });
});
