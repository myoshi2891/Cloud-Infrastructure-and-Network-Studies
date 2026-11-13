import { describe, expect, it } from 'vitest';
import { EXAMS } from '@/app/constants';
import { toNavTree } from '@/app/navigation';

describe('DevNet Expert 導線統合', () => {
    it('Cisco ExpertとしてホームとHeaderの正本に1件だけ登録する', () => {
        const exams = EXAMS.filter(e => e.href === '/cisco/devnet-expert');
        expect(exams).toHaveLength(1);
        expect(exams[0]).toMatchObject({ id: 'cisco-devnet-expert', provider: 'Cisco', level: 'Expert', label: 'CCIE Automation', color: 'card-ccna', domains: [{ label: '初学者向け完全ガイド', href: '/cisco/devnet-expert', pct: '完全解説' }] });
        expect(JSON.stringify(toNavTree(EXAMS))).toContain('/cisco/devnet-expert');
    });
});
