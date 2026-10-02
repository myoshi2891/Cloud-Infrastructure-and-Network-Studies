import { describe, expect, it } from 'vitest';
import { EXAMS } from '@/app/constants';

describe('Secure CI/CD Hands-on integration', () => {
    it('registers the guide once in the canonical Hands-on navigation', () => {
        const handsOn = EXAMS.find(exam => exam.id === 'hands-on');
        expect(handsOn?.domains.filter(domain => domain.href === '/gcl/hands-on/secure-cicd-pipeline-guide')).toEqual([
            {label: 'セキュアなコンテナ CI/CD パイプライン構築ガイド', href: '/gcl/hands-on/secure-cicd-pipeline-guide', pct: 'ハンズオン'},
        ]);
    });
});
