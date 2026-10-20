import {render,within,fireEvent} from '@testing-library/react';
import {expect,it} from 'vitest';
import {EXAMS} from '@/app/constants';
import {toNavTree} from '@/app/navigation';
import {ExamCard} from '@/components/sections/home/ExamCard';
import {Header} from '@/components/Header';
const route='/aws/generative-ai-developer-professional/domain5';
it('exposes Domain 5 from EXAMS and derived navigation',()=>{
 const exam=EXAMS.find(exam=>exam.id==='aws-aip')!;expect(exam.domains?.find(d=>d.label.startsWith('ドメイン5'))?.href).toBe(route);
 const group=toNavTree(EXAMS).find(group=>group.provider==='AWS');
 expect(JSON.stringify(group)).toContain(route);
});
it('exposes the new route from the actual home card and Header',()=>{
 const exam=EXAMS.find(exam=>exam.id==='aws-aip')!;const {container}=render(<><ExamCard exam={exam}/><Header/></>);
 expect(container.querySelector('article a[href="'+route+'"]')).not.toBeNull();
 fireEvent.click(within(container).getByRole('button',{name:'メニューを開く'}));
 const dialog=within(container).getByRole('dialog',{name:'サイトナビゲーション'});
 expect(dialog.querySelector('a[href="'+route+'"]')).not.toBeNull();
});
