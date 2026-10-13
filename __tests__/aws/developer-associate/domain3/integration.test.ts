import { describe, expect, it } from 'vitest';
import { EXAMS } from '@/app/constants';
import { toNavTree } from '@/app/navigation';

describe('DVA Deployment ホーム・Header統合', () => {
    it('DVAカードにデプロイ24%と既存ドメインを登録する', () => {
        const exam = EXAMS.find(exam => exam.id === 'aws-dva');
        expect(exam).toMatchObject({ status: 'available', href: '/aws/developer-associate/domain2', overviewLabel: 'ドメイン2: セキュリティ' });
        expect(exam?.description).toContain('デプロイ');
        expect(exam?.domains).toEqual([
            { label: 'ドメイン1: AWSサービスを使用した開発', href: '/aws/developer-associate/domain1', pct: '32%' },
            { label: 'ドメイン2: セキュリティ', href: '/aws/developer-associate/domain2', pct: '26%' },
            { label: 'ドメイン3: デプロイ', href: '/aws/developer-associate/domain3', pct: '24%' },
        ]);
    });
    it('AWS Headerに3ドメインを重複なしで登録する', () => {
        const nav = toNavTree(EXAMS).find(group => group.provider === 'AWS')?.exams.find(exam => exam.id === 'aws-dva');
        expect(nav?.items).toEqual([
            { label: 'ドメイン2: セキュリティ', href: '/aws/developer-associate/domain2' },
            { label: 'ドメイン1: AWSサービスを使用した開発', href: '/aws/developer-associate/domain1' },
            { label: 'ドメイン3: デプロイ', href: '/aws/developer-associate/domain3' },
        ]);
    });
});
