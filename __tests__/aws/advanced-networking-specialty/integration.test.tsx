import { readFileSync } from 'node:fs';
import { fireEvent, render, within } from '@testing-library/react';
import { expect, it } from 'vitest';
import { EXAMS, cardColorMap } from '@/app/constants';
import { toNavTree } from '@/app/navigation';
import Home from '@/app/page';
import { Header } from '@/components/Header';
const route='/aws/advanced-networking-specialty';
it('exposes the available ANS-C01 guide through its own exam, home card and derived Header navigation', () => {
 const exam=EXAMS.find(e=>e.id==='aws-ans');
 expect(exam).toMatchObject({href:route,badge:'ANS-C01',provider:'AWS',status:'available',color:'card-aws-ans'});
 expect(cardColorMap).toHaveProperty('card-aws-ans','card-aws-ans');
 expect(JSON.stringify(toNavTree(EXAMS))).toContain(route);
 const {container}=render(<><Home/><Header/></>);
 expect(container.querySelector(`article a[href="${route}"]`)).not.toBeNull();
 fireEvent.click(within(container).getByRole('button',{name:'メニューを開く'}));
 expect(within(container).getByRole('dialog',{name:'サイトナビゲーション'}).querySelector(`a[href="${route}"]`)).not.toBeNull();
});
it('registers the source light palette for the shared footer and exam icon', () => {
 expect(readFileSync('components/Footer.module.css','utf8')).toContain('.ans-guide-page');
 expect(readFileSync('app/globals.css','utf8')).toContain('@utility icon-theme-aws-ans');
});
