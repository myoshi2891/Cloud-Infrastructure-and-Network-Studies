import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';
import { EXAMS } from '@/app/constants';
import { toNavTree } from '@/app/navigation';
it('ホームとHeaderにDomain 4を18%で登録する', () => {
    const exam = EXAMS.find(item => item.id === 'aws-dva');
    expect(exam?.domains).toHaveLength(4);
    expect(exam?.domains?.[3]).toEqual({label:'ドメイン4: トラブルシューティングと最適化',href:'/aws/developer-associate/domain4',pct:'18%'});
    expect(exam?.description).toContain('最適化');
    const nav = toNavTree(EXAMS).find(group => group.provider === 'AWS')?.exams.find(item => item.id === 'aws-dva');
    expect(nav?.items.filter(item => item.href === '/aws/developer-associate/domain4')).toEqual([{label:'ドメイン4: トラブルシューティングと最適化',href:'/aws/developer-associate/domain4'}]);
});
it('共有フッターも原本のライトテーマに統合する', () => {
    expect(readFileSync('components/Footer.module.css','utf8')).toContain('.dva-troubleshooting-page,');
});
