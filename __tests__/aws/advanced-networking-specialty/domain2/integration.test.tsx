import {fireEvent,render,within} from '@testing-library/react';
import {expect,it} from 'vitest';
import {EXAMS} from '@/app/constants';
import {toNavTree} from '@/app/navigation';
import Home from '@/app/page';
import {Header} from '@/components/Header';
const route='/aws/advanced-networking-specialty/domain2';
it('retains Domain 1 and exposes Domain 2 from EXAMS and derived navigation',()=>{
 const exam=EXAMS.find(e=>e.id==='aws-ans')!;
 expect(exam.href).toBe('/aws/advanced-networking-specialty/domain1');
 expect(exam.domains).toEqual([{label:'ドメイン1: ネットワーク設計',href:'/aws/advanced-networking-specialty/domain1',pct:'30%'},{label:'ドメイン2: ネットワーク実装',href:route,pct:'26%'},{label:'ドメイン3: ネットワーク管理と運用',href:'/aws/advanced-networking-specialty/domain3',pct:'20%'}]);
 expect(JSON.stringify(toNavTree(EXAMS))).toContain(route);
});
it('exposes Domain 2 from the home card and Header',()=>{
 const {container}=render(<><Home/><Header/></>);
 expect(container.querySelector('article a[href="'+route+'"]')).not.toBeNull();
 fireEvent.click(within(container).getByRole('button',{name:'メニューを開く'}));
 expect(within(container).getByRole('dialog',{name:'サイトナビゲーション'}).querySelector('a[href="'+route+'"]')).not.toBeNull();
});
