import { readFileSync } from 'node:fs';
import { fireEvent, render, within } from '@testing-library/react';
import { expect, it } from 'vitest';
import { EXAMS, cardColorMap } from '@/app/constants';
import { toNavTree } from '@/app/navigation';
import Home from '@/app/page';
import { Header } from '@/components/Header';
const route='/aws/solutions-architect-professional';
it('exposes the available SAP-C02 guide through its own exam, home card and derived Header navigation', () => {
 const exam=EXAMS.find(e=>e.id==='aws-sap');
 expect(exam).toMatchObject({href:route,badge:'SAP-C02',provider:'AWS',status:'available',color:'card-aws-sap'});
 expect(cardColorMap).toHaveProperty('card-aws-sap','card-aws-sap');
 expect(JSON.stringify(toNavTree(EXAMS))).toContain(route);
 const {container}=render(<><Home/><Header/></>);
 expect(container.querySelector(`article a[href="${route}"]`)).not.toBeNull();
 fireEvent.click(within(container).getByRole('button',{name:'メニューを開く'}));
 expect(within(container).getByRole('dialog',{name:'サイトナビゲーション'}).querySelector(`a[href="${route}"]`)).not.toBeNull();
});
it('registers the source light palette for the shared footer and exam icon', () => {
 expect(readFileSync('components/Footer.module.css','utf8')).toContain('.sap-guide-page');
 expect(readFileSync('app/globals.css','utf8')).toContain('@utility icon-theme-aws-sap');
});
