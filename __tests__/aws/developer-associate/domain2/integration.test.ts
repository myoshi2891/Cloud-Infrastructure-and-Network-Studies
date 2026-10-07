import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { EXAMS, cardColorMap } from '@/app/constants';
import { toNavTree } from '@/app/navigation';

describe('DVA Security のホーム・Header統合', () => {
    it('利用可能なDVAカードから実装済みdomain2へ移動できる', () => {
        const exam = EXAMS.find(exam => exam.id === 'aws-dva');
        expect(exam).toMatchObject({ provider: 'AWS', abbr: 'DVA', status: 'available', href: '/aws/developer-associate/domain2', overviewLabel: 'ドメイン2: セキュリティ', color: 'card-aws-dva' });
        expect(exam?.domains).toContainEqual({ label: 'ドメイン2: セキュリティ', href: '/aws/developer-associate/domain2', pct: '26%' });
        expect(cardColorMap).toHaveProperty('card-aws-dva', 'card-aws-dva');
        const nav = toNavTree(EXAMS).find(group => group.provider === 'AWS')?.exams.find(exam => exam.id === 'aws-dva');
        expect(nav?.items).toEqual([{ label: 'ドメイン2: セキュリティ', href: '/aws/developer-associate/domain2' }]);
    });
    it('DVAカードとHeaderアイコンの色をグローバルトークンへ登録', () => {
        const css = readFileSync('app/globals.css', 'utf8');
        expect(css).toMatch(/\.card-aws-dva\s*\{/);
        expect(css).toMatch(/@utility icon-theme-aws-dva\s*\{/);
    });
});
