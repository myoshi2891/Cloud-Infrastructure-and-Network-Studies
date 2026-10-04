import { describe, expect, it } from 'vitest';
import { EXAMS } from '@/app/constants';
import { toNavTree } from '@/app/navigation';

describe('tcpip-illustrated-vol1 の Books 統合', () => {
    it('Books の書籍カード・ナビが新ルートを参照する', () => {
        const entries = EXAMS.filter((exam) => exam.id === 'tcpip-illustrated-vol1');
        expect(entries).toHaveLength(1);
        expect(entries[0]).toMatchObject({
            provider: 'Books',
            href: '/recommended-books/tcpip-illustrated-vol1',
            score: '全20部 / 35図解',
        });
        expect(entries[0]?.domains.map((domain) => domain.href)).toEqual([
            '/recommended-books/tcpip-illustrated-vol1',
        ]);
    });

    it('Books グループ目次に正しく 1 リンクが登録される', () => {
        const entry = EXAMS.find((exam) => exam.id === 'tcpip-illustrated-vol1');
        expect(entry?.color).toBe('card-tcpip-illustrated-vol1');
        const nav = toNavTree(EXAMS)
            .find((group) => group.provider === 'Books')
            ?.exams.find((exam) => exam.id === 'tcpip-illustrated-vol1');
        expect(nav?.colorClass).toBe('card-tcpip-illustrated-vol1');
        expect(nav?.items).toEqual([
            { label: '概要', href: '/recommended-books/tcpip-illustrated-vol1' },
        ]);
    });
});
