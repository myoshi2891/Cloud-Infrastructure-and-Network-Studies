import { describe, expect, it } from 'vitest';
import { EXAMS } from '@/app/constants';
import { toNavTree } from '@/app/navigation';

describe('AWS AIB 完全ガイド ホーム・Header統合', () => {
    it('EXAMS に AWS Certified AI Business Strategist が登録され、完全ガイドへのトップリンクを持つ', () => {
        const exam = EXAMS.find((exam) => exam.id === 'aws-aib');
        expect(exam).toBeDefined();
        expect(exam?.status).toBe('available');
        expect(exam?.provider).toBe('AWS');
        expect(exam?.href).toBe('/aws/ai-business-strategist');
        expect(exam?.color).toBe('card-aws-aib');
        expect(exam?.overviewLabel).toBe('初学者向け完全ガイド');
        expect(exam?.domains).toContainEqual({
            label: '初学者向けステップバイステップ完全ガイド',
            href: '/aws/ai-business-strategist',
            pct: '100%',
        });
        expect(exam?.domains).toContainEqual({
            label: 'Domain 1: AI Fundamentals and Literacy',
            href: '/aws/ai-business-strategist/domain1',
            pct: '24%',
        });
    });

    it('toNavTree() が AWS グループ配下に AIB を含み、完全ガイドとドメインリンクを生成する', () => {
        const awsGroup = toNavTree(EXAMS).find((group) => group.provider === 'AWS');
        expect(awsGroup).toBeDefined();
        const aibNav = awsGroup?.exams.find((exam) => exam.id === 'aws-aib');
        expect(aibNav).toBeDefined();
        expect(aibNav?.items).toEqual([
            {
                label: '初学者向け完全ガイド',
                href: '/aws/ai-business-strategist',
            },
            {
                label: 'Domain 1: AI Fundamentals and Literacy',
                href: '/aws/ai-business-strategist/domain1',
            },
        ]);
    });
});
