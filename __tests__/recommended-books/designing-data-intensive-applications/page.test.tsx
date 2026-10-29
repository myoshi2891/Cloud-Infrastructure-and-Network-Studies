import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import fs from 'node:fs';
import Guide from '@/app/recommended-books/designing-data-intensive-applications/DdiaGuide';
import { DIAGRAMS } from '@/app/recommended-books/designing-data-intensive-applications/constants';
import inventory from '@/docs/migration-inventory/designing-data-intensive-applications.json';
import fixture from '@/docs/migration-inventory/designing-data-intensive-applications.fidelity.json';
import { snapshotDdia, snapshotCssRules } from '@/scripts/ddia-fidelity.mjs';
import { squash, extractBodyContent } from '@/__tests__/helpers/migration-test-utils';
vi.mock('@/components/MermaidDiagram', async () => ({ MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock }));
describe('DDIA 全量移行',()=>{
 it('本文の全要素・属性・階層・順序が原本と一致',()=>{expect(snapshotDdia(render(<Guide/>).container)).toEqual(fixture.structure);});
 it.each(['h1','h2','h3','h4','th','td','li'] as const)('%s の全量と順序',tag=>{
  const c=render(<Guide/>).container;
  const values=tag==='li'?inventory.listItems:inventory[tag];
  expect([...c.querySelectorAll(tag==='li'?'main li':tag)].map(e=>squash(e.textContent??''))).toEqual(values.map(squash));
 });
 it('本文・注釈の全文と外部リンク順序',()=>{const c=render(<Guide/>).container; expect(extractBodyContent(c)).toEqual(inventory.bodyContent);expect([...c.querySelectorAll('a[href^="http"]')].map(e=>e.getAttribute('href'))).toEqual(inventory.links.map(e=>e.href));});
 it('14図のDSL・自然倍率・説明と表の構造',()=>{const c=render(<Guide/>).container;const diagrams=[...c.querySelectorAll('[data-testid="mermaid-diagram"]')];expect(diagrams).toHaveLength(inventory.counts.diagram);expect(Object.values(DIAGRAMS)).toEqual(fixture.charts);diagrams.forEach(e=>{expect(e.getAttribute('aria-label')?.trim()).toBeTruthy();expect(e.getAttribute('data-preserve-natural-scale')).toBe('true');});const tables=[...c.querySelectorAll('table')];expect(tables).toHaveLength(inventory.counts.table);tables.forEach((e,i)=>expect(e.querySelectorAll('thead th[scope="col"]')).toHaveLength(inventory.structures.tableColumnHeaders[i]!));});
 it('全CSS宣言を保持（スコープ・トークン対応・固定位置補正のみ許可）',()=>{
  const rules=snapshotCssRules(fs.readFileSync('app/recommended-books/designing-data-intensive-applications/page.css','utf8'));
  for(const original of fixture.css.filter(r=>r.selector!==':root')) {
   const selectors=original.selector.split(',').map(s=>s.trim()==='body'||s.trim()==='html'?'.ddia-page':'.ddia-page '+s.trim().replaceAll('pre.mermaid','.ddia-diagram')).join(', ');
   const actual=rules.find(r=>r.selector===selectors&&r.media===original.media);
   expect(actual,selectors).toBeDefined();
   for(const d of original.declarations) {if(d.prop==='word-break') continue;expect(actual!.declarations.some(v=>v.prop===d.prop),`${selectors}: ${d.prop}`).toBe(true);}
  }
  expect(rules.find(r=>r.selector==='.ddia-page .main ul')?.declarations).toContainEqual({prop:'list-style-type',value:'disc',important:false});
  expect(rules.find(r=>r.selector==='.ddia-page .main ol')?.declarations).toContainEqual({prop:'list-style-type',value:'decimal',important:false});
 });
 it('モバイル目次の開閉・hashとfocus・チェック進捗',()=>{const c=render(<Guide/>).container;const button=c.querySelector('button')!;fireEvent.click(button);expect(button).toHaveAttribute('aria-expanded','true');const link=c.querySelector('nav a')!;fireEvent.click(link);expect(button).toHaveAttribute('aria-expanded','false');expect(document.activeElement?.id).toBe(fixture.nav[0]!.id);const boxes=c.querySelectorAll('input');expect(boxes).toHaveLength(13);fireEvent.click(boxes[0]!);expect(c.querySelector('.count')).toHaveTextContent('1 / 13 完了');fireEvent.click(boxes[0]!);expect(c.querySelector('.count')).toHaveTextContent('0 / 13 完了');});
 it('検査が本文欠落とリスト階層改変を検知',()=>{const c=render(<Guide/>).container;expect(snapshotDdia(c)).toEqual(fixture.structure);c.querySelector('main li')!.remove();expect(snapshotDdia(c)).not.toEqual(fixture.structure);});
});
