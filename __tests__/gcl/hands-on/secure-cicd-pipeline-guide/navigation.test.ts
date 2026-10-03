import { afterEach, describe, expect, it, vi } from 'vitest';

const GUIDE_HREF = '/gcl/hands-on/secure-cicd-pipeline-guide';

// HANDS_ON_ENABLED はモジュール評価時に確定するため、環境変数を設定してから再 import する
const loadExams = async (flag: 'true' | 'false') => {
    vi.stubEnv('NEXT_PUBLIC_ENABLE_HANDS_ON', flag);
    vi.resetModules();
    const { EXAMS } = await import('@/app/constants');
    return EXAMS;
};

describe('Secure CI/CD Hands-on integration', () => {
    afterEach(() => {
        vi.unstubAllEnvs();
        vi.resetModules();
    });

    it('registers the guide once in the canonical Hands-on navigation when Hands-on is enabled', async () => {
        const exams = await loadExams('true');
        const handsOn = exams.find(exam => exam.id === 'hands-on');
        expect(handsOn?.domains.filter(domain => domain.href === GUIDE_HREF)).toEqual([
            {label: 'セキュアなコンテナ CI/CD パイプライン構築ガイド', href: GUIDE_HREF, pct: 'ハンズオン'},
        ]);
    });

    it('omits the Hands-on navigation when Hands-on is disabled', async () => {
        const exams = await loadExams('false');
        expect(exams.find(exam => exam.id === 'hands-on')).toBeUndefined();
    });
});
