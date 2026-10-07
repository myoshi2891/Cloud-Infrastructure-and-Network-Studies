import { describe, expect, it } from 'vitest';
import { EXAMS } from '@/app/constants';
import { toNavTree } from '@/app/navigation';

describe('DVA Domain 1 ホーム・Header統合',()=>{
    it('DVAカードに開発ドメイン32%とセキュリティ26%を登録',()=>{
        const exam=EXAMS.find(exam=>exam.id==='aws-dva');
        expect(exam?.status).toBe('available');
        expect(exam?.description).toContain('開発');
        expect(exam?.domains).toContainEqual({label:'ドメイン1: AWSサービスを使用した開発',href:'/aws/developer-associate/domain1',pct:'32%'});
        expect(exam?.domains).toContainEqual({label:'ドメイン2: セキュリティ',href:'/aws/developer-associate/domain2',pct:'26%'});
    });
    it('Headerに両ドメインを各1件だけ表示',()=>{
        const nav=toNavTree(EXAMS).find(group=>group.provider==='AWS')?.exams.find(exam=>exam.id==='aws-dva');
        expect(nav?.items).toEqual([
            {label:'ドメイン2: セキュリティ',href:'/aws/developer-associate/domain2'},
            {label:'ドメイン1: AWSサービスを使用した開発',href:'/aws/developer-associate/domain1'},
        ]);
    });
});
