import { describe, expect, it } from 'vitest';
import { EXAMS } from '@/app/constants';
import { toNavTree } from '@/app/navigation';

describe('AWS AIB Domain 1 ホーム・Header統合', () => {
    it('EXAMS に AWS Certified AI Business Strategist が登録され、Domain 1 へのリンクを持つ', () => {
        const exam = EXAMS.find((exam) => exam.id === 'aws-aib');
        expect(exam).toBeDefined();
        expect(exam?.status).toBe('available');
        expect(exam?.provider).toBe('AWS');
        expect(exam?.href).toBe('/aws/ai-business-strategist/domain1');
        expect(exam?.color).toBe('card-aws-aib');
        expect(exam?.domains).toContainEqual({
            label: 'Domain 1: AI Fundamentals and Literacy',
            href: '/aws/ai-business-strategist/domain1',
            pct: '24%',
        });
    });

    it('toNavTree() が AWS グループ配下に AIB を含み、重複なく Domain 1 リンクを生成する', () => {
        const awsGroup = toNavTree(EXAMS).find((group) => group.provider === 'AWS');
        expect(awsGroup).toBeDefined();
        const aibNav = awsGroup?.exams.find((exam) => exam.id === 'aws-aib');
        expect(aibNav).toBeDefined();
        expect(aibNav?.items).toEqual([
            {
                label: 'Domain 1: AI Fundamentals and Literacy',
                href: '/aws/ai-business-strategist/domain1',
            },
        ]);
    });
});
