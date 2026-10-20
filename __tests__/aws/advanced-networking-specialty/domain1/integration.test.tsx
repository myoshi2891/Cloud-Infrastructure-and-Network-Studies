import {fireEvent,render,within} from '@testing-library/react';
import {readFileSync} from 'node:fs';
import {expect,it} from 'vitest';
import {EXAMS,cardColorMap} from '@/app/constants';
import {toNavTree} from '@/app/navigation';
import Home from '@/app/page';
import {Header} from '@/components/Header';
const route='/aws/advanced-networking-specialty/domain1';
it('registers an available ANS Specialty with only the implemented Domain 1 route',()=>{
 const exam=EXAMS.find(e=>e.id==='aws-ans');
 expect(exam).toMatchObject({label:'AWS Certified Advanced Networking - Specialty',abbr:'ANS',level:'Specialty',provider:'AWS',status:'available',href:route,badge:'ANS-C01',color:'card-aws-ans',overviewLabel:'ドメイン1: ネットワーク設計'});
 expect(exam?.domains).toEqual([{label:'ドメイン1: ネットワーク設計',href:route,pct:'30%'}]);
 expect(toNavTree(EXAMS).find(g=>g.provider==='AWS')?.exams.find(e=>e.id==='aws-ans')?.items).toEqual([{label:'ドメイン1: ネットワーク設計',href:route}]);
 expect(cardColorMap).toHaveProperty('card-aws-ans','card-aws-ans');
});
it('exposes the real homepage card and exactly one Header link to Domain 1',()=>{
 const {container,unmount}=render(<Home/>);const card=within(container).getByRole('heading',{name:'AWS Certified Advanced Networking - Specialty'}).closest('article');
 expect(card).toHaveClass('card-aws-ans');expect(card?.querySelector('a.home-card-cta')).toHaveAttribute('href',route);
 unmount();const header=render(<Header/>);fireEvent.click(within(header.container).getByRole('button',{name:'メニューを開く'}));
 const dialog=within(header.container).getByRole('dialog',{name:'サイトナビゲーション'});expect(dialog.querySelectorAll(`a[href="${route}"]`)).toHaveLength(1);
});
it('uses the shared AWS card and icon theme',()=>{
 const css=readFileSync('app/globals.css','utf8');
 expect(css).toMatch(/\.card-aws-ans\s*\{[^}]*--card-accent:\s*var\(--color-theme-aws-fg\)/);
 expect(css).toMatch(/@utility icon-theme-aws-ans\s*\{[^}]*background:\s*var\(--color-theme-aws-bg\);[^}]*color:\s*var\(--color-theme-aws-fg\)/);
});
