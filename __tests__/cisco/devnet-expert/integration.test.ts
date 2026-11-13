import { describe, expect, it } from 'vitest';
import { EXAMS } from '@/app/constants';
import { toNavTree } from '@/app/navigation';
import { readFileSync } from 'node:fs';

describe('DevNet Expert 導線統合', () => {
    it('原本のSource Serif 4を読み込み、見出しのserif書体を保つ', () => {
        expect(readFileSync('app/cisco/devnet-expert/page.tsx', 'utf8')).toContain('@fontsource-variable/source-serif-4/index.css');
        expect(readFileSync('app/cisco/devnet-expert/page.css', 'utf8')).toContain('var(--font-ccie-sp-serif)');
    });
    it('Cisco ExpertとしてホームとHeaderの正本に1件だけ登録する', () => {
        const exams = EXAMS.filter(e => e.href === '/cisco/devnet-expert');
        expect(exams).toHaveLength(1);
        expect(exams[0]).toMatchObject({ id: 'cisco-devnet-expert', provider: 'Cisco', level: 'Expert', label: 'CCIE Automation', color: 'card-ccna', domains: [{ label: '初学者向け完全ガイド', href: '/cisco/devnet-expert', pct: '完全解説' }] });
        expect(JSON.stringify(toNavTree(EXAMS))).toContain('/cisco/devnet-expert');
    });
});
