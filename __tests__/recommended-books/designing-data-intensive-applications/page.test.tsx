import { render, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import fs from 'node:fs';
import { EXAMS } from '@/app/constants';
import mermaid from 'mermaid';
import Guide from '@/app/recommended-books/designing-data-intensive-applications/DdiaGuide';
import { DIAGRAMS } from '@/app/recommended-books/designing-data-intensive-applications/constants';
import inventory from '@/docs/migration-inventory/designing-data-intensive-applications.json';
import fixture from '@/docs/migration-inventory/designing-data-intensive-applications.fidelity.json';
import { snapshotDdia, snapshotCssRules } from '@/scripts/ddia-fidelity.mjs';
import { squash, extractBodyContent } from '@/__tests__/helpers/migration-test-utils';
vi.mock('@/components/MermaidDiagram', async () => ({ MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock }));
/** 原本CSSの固定色と、app/globals.css の @theme に置くページ固有トークン名の対応。 */
const DDIA_COLOR_TOKENS:Record<string,string>={'#060d17':'sidebar-bg','#dbe4f3':'hero-gradient-start','#7c9eff':'hero-gradient-end','#f0f4fc':'strong','#ffd08a':'inline-code','rgba(124, 158, 255, 0.04)':'row-hover','#1d5a3a':'callout-practice-border','#08150e':'callout-practice-icon','rgba(124, 158, 255, 0.05)':'checklist-hover','#08101f':'check-mark','rgba(0, 0, 0, 0.5)':'sidebar-shadow'};
const COLOR_LITERAL=/#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)/g;
describe('DDIA 全量移行',()=>{
 it('ホーム・Header共通のBooks導線',()=>{const entry=EXAMS.find(e=>e.id==='ddia');expect(entry?.href).toBe('/recommended-books/designing-data-intensive-applications');expect(entry?.provider).toBe('Books');expect(entry?.domains[0]?.href).toBe(entry?.href);expect(fs.readFileSync('app/globals.css','utf8')).toMatch(/@utility icon-theme-ddia\s*\{\s*background:\s*var\(--color-theme-accelerate-bg\);\s*color:\s*var\(--color-theme-accelerate-fg\);\s*\}/);});
 it('全14図のMermaid構文解析',async()=>{mermaid.initialize({startOnLoad:false});for(const chart of Object.values(DIAGRAMS))expect(await mermaid.parse(chart)).toBeTruthy();});

 it('本文の全要素・属性・階層・順序が原本と一致',()=>{expect(snapshotDdia(render(<Guide/>).container)).toEqual(fixture.structure);});
 it.each(['h1','h2','h3','h4','th','td','li'] as const)('%s の全量と順序',tag=>{
  const c=render(<Guide/>).container;
  const values=tag==='li'?inventory.listItems:inventory[tag];
  expect([...c.querySelectorAll(tag==='li'?'main li':tag)].map(e=>squash(e.textContent??''))).toEqual(values.map(squash));
 });
 it('本文・注釈の全文と外部リンク順序',()=>{const c=render(<Guide/>).container; expect(extractBodyContent(c)).toEqual(inventory.bodyContent);expect([...c.querySelectorAll('a[href^="http"]')].map(e=>e.getAttribute('href'))).toEqual(inventory.links.map(e=>e.href));});
 it('14図のDSL・自然倍率・説明と表の構造',()=>{const c=render(<Guide/>).container;const diagrams=[...c.querySelectorAll('[data-testid="mermaid-diagram"]')];expect(diagrams).toHaveLength(inventory.counts.diagram);expect(Object.values(DIAGRAMS)).toEqual(fixture.charts);expect(diagrams.map(e=>e.getAttribute('data-chart'))).toEqual(fixture.charts);diagrams.forEach(e=>{expect(e.getAttribute('aria-label')?.trim()).toBeTruthy();expect(e.getAttribute('data-preserve-natural-scale')).toBe('true');});const tables=[...c.querySelectorAll('table')];expect(tables).toHaveLength(inventory.counts.table);tables.forEach((e,i)=>expect(e.querySelectorAll('thead th[scope="col"]')).toHaveLength(inventory.structures.tableColumnHeaders[i]!));});
 it('全表のスクロール領域はキーボード操作可能で固有の読み上げ名を持つ',()=>{const c=render(<Guide/>).container;const wrappers=[...c.querySelectorAll('.table-scroll')];expect(wrappers).toHaveLength(inventory.counts.table);for(const [index,wrapper] of wrappers.entries()){let heading=wrapper.previousElementSibling;while(heading&&!heading.matches('h2,h3,h4'))heading=heading.previousElementSibling;expect(wrapper).toHaveAttribute('tabindex','0');expect(wrapper).toHaveAttribute('role','region');expect(wrapper).toHaveAttribute('aria-label',`比較表 ${index+1}：`+(heading?.textContent??'学習資料').replace(/\s+/g,' ').trim());}const names=wrappers.map(w=>w.getAttribute('aria-label'));expect(new Set(names).size).toBe(names.length);});
 it('表の構造要素の直下にテキストノードを置かない（hydrationエラー防止）',()=>{const c=render(<Guide/>).container;const textNodes=[...c.querySelectorAll('table, thead, tbody, tfoot, tr')].flatMap(e=>[...e.childNodes].filter(n=>n.nodeType===3).map(n=>`${e.tagName}:${JSON.stringify(n.textContent)}`));expect(textNodes).toEqual([]);});
 it('全CSS宣言を保持（スコープ・トークン対応・固定位置補正のみ許可）',()=>{
  const rules=snapshotCssRules(fs.readFileSync('app/recommended-books/designing-data-intensive-applications/page.css','utf8'));
  for(const original of fixture.css.filter(r=>r.selector!==':root')) {
   const selectors=original.selector.split(',').map(s=>s.trim()==='body'||s.trim()==='html'?'.ddia-page':'.ddia-page '+s.trim().replaceAll('pre.mermaid','.ddia-diagram')).join(', ');
   const actual=rules.find(r=>r.selector===selectors&&r.media===original.media);
   expect(actual,selectors).toBeDefined();
   const mapping:Record<string,string>={bg:'background','bg-card':'card','bg-card-2':'gcp-code-background',border:'gcp-border','border-soft':'gcp-border',text:'foreground','text-dim':'muted-foreground','text-faint':'muted-foreground',accent:'google-blue','accent-soft':'gcp-border-bright','accent-bg':'gcp-code-background',danger:'google-red','danger-bg':'card',warn:'google-yellow','warn-bg':'card',success:'google-green','success-bg':'card'};
   for(const d of original.declarations) {if(d.prop==='word-break') continue;const value=d.value.replace(/var\(--([\w-]+)\)/g,(_,key:string)=>key==='sidebar-w'?'280px':key==='font-jp'?'var(--font-body)':`var(--color-${mapping[key]??key})`).replace(COLOR_LITERAL,literal=>DDIA_COLOR_TOKENS[literal]?`var(--color-ddia-${DDIA_COLOR_TOKENS[literal]})`:literal);expect(actual!.declarations,`${selectors}: ${d.prop}`).toContainEqual({...d,value});}
  }
  expect(rules.find(r=>r.selector==='.ddia-page .main ul')?.declarations).toContainEqual({prop:'list-style-type',value:'disc',important:false});
  expect(rules.find(r=>r.selector==='.ddia-page .main ol')?.declarations).toContainEqual({prop:'list-style-type',value:'decimal',important:false});
  const closed=rules.find(r=>r.selector==='.ddia-page .sidebar:not(.open)'&&r.media==='(max-width: 980px)');
  expect(closed?.declarations).toContainEqual({prop:'visibility',value:'hidden',important:false});
  const z=(selector:string)=>Number(rules.filter(r=>r.selector===selector&&!r.media).flatMap(r=>r.declarations).filter(d=>d.prop==='z-index').at(-1)?.value);
  expect(z('.ddia-page .sidebar-toggle')).toBeGreaterThan(z('.ddia-page .sidebar'));
  expect(rules.find(r=>r.selector===".ddia-page .checklist-card input[type='checkbox']:not(:checked)")?.declarations).toContainEqual({prop:'border-color',value:'var(--color-google-blue)',important:false});
 });
 it('モバイル目次の開閉・hashとfocus・チェック進捗',()=>{const c=render(<Guide/>).container;const button=c.querySelector('button')!;fireEvent.click(button);expect(button).toHaveAttribute('aria-expanded','true');const link=c.querySelector('nav a')!;fireEvent.click(link);expect(button).toHaveAttribute('aria-expanded','false');expect(document.activeElement?.id).toBe(fixture.nav[0]!.id);const boxes=c.querySelectorAll('input');expect(boxes).toHaveLength(13);fireEvent.click(boxes[0]!);expect(c.querySelector('.count')).toHaveTextContent('1 / 13 完了');fireEvent.click(boxes[0]!);expect(c.querySelector('.count')).toHaveTextContent('0 / 13 完了');});
 it('サイドバー背景・Hero文字グラデーション・コールアウト等の固定色を@themeトークンで参照する',()=>{const css=fs.readFileSync('app/recommended-books/designing-data-intensive-applications/page.css','utf8');const globals=fs.readFileSync('app/globals.css','utf8');const theme=globals.slice(globals.indexOf('@theme {'),globals.indexOf('\n}',globals.indexOf('@theme {')));for(const [literal,token] of Object.entries(DDIA_COLOR_TOKENS)){expect(theme).toContain(`--color-ddia-${token}: ${literal};`);expect(css).toContain(`var(--color-ddia-${token})`);}expect(css.match(COLOR_LITERAL)).toBeNull();});
 it.each([
  ['Ctrl-click',{ctrlKey:true}],['Command-click',{metaKey:true}],['Shift-click',{shiftKey:true}],['Alt-click',{altKey:true}],['中ボタン',{button:1}],
 ])('修飾付き・非主ボタンの目次クリック（%s）はブラウザー既定動作に任せる',(_,init)=>{const c=render(<Guide/>).container;const button=c.querySelector('button')!;fireEvent.click(button);const link=c.querySelectorAll('nav a')[1]!;const pushState=vi.spyOn(window.history,'pushState');const event=new MouseEvent('click',{bubbles:true,cancelable:true,...init});fireEvent(link,event);expect(event.defaultPrevented).toBe(false);expect(pushState).not.toHaveBeenCalled();expect(button).toHaveAttribute('aria-expanded','true');expect(link).not.toHaveClass('active');pushState.mockRestore();});
 it('修飾なしの主ボタンクリックは従来どおりページ内移動を処理する',()=>{const c=render(<Guide/>).container;const link=c.querySelectorAll('nav a')[1]!;const event=new MouseEvent('click',{bubbles:true,cancelable:true,button:0});fireEvent(link,event);expect(event.defaultPrevented).toBe(true);expect(decodeURIComponent(window.location.hash)).toBe('#'+fixture.nav[1]!.id);expect(link).toHaveClass('active');});
 it('検査が本文欠落とリスト階層改変を検知',()=>{const c=render(<Guide/>).container;expect(snapshotDdia(c)).toEqual(fixture.structure);c.querySelector('main li')!.remove();expect(snapshotDdia(c)).not.toEqual(fixture.structure);});
 it('本文比較は書式上の空白を畳み、語間の空白は区別する',()=>{const make=(html:string)=>{const root=document.createElement('div');root.innerHTML='<main>'+html+'</main>';return root;};expect(snapshotDdia(make('<p>REPEATABLE READ</p>'))).not.toEqual(snapshotDdia(make('<p>REPEATABLEREAD</p>')));expect(snapshotDdia(make('<p>\n   REPEATABLE\n   READ\n</p>'))).toEqual(snapshotDdia(make('<p>REPEATABLE READ</p>')));expect(snapshotDdia(make('<ul>\n  <li>a</li>\n</ul>'))).toEqual(snapshotDdia(make('<ul><li>a</li></ul>')));
  // インライン要素との境界の空白は意味を持つため、有無を区別する
  expect(snapshotDdia(make('<p>foo <strong>bar</strong></p>'))).not.toEqual(snapshotDdia(make('<p>foo<strong>bar</strong></p>')));expect(snapshotDdia(make('<p><strong>bar</strong> foo</p>'))).not.toEqual(snapshotDdia(make('<p><strong>bar</strong>foo</p>')));
  // インライン要素の内側の先頭・末尾の空白も語間として区別する
  expect(snapshotDdia(make('<p>foo<strong> bar</strong></p>'))).not.toEqual(snapshotDdia(make('<p>foo<strong>bar</strong></p>')));expect(snapshotDdia(make('<p><strong>bar </strong>foo</p>'))).not.toEqual(snapshotDdia(make('<p><strong>bar</strong>foo</p>')));
  // ブロック境界に接する空白はインライン要素を挟んでも書式上の空白として除く
  expect(snapshotDdia(make('<p>\n  <strong> bar </strong>\n</p>'))).toEqual(snapshotDdia(make('<p><strong>bar</strong></p>')));expect(snapshotDdia(make('<li><a href="#x"><em> a</em></a> b</li>'))).toEqual(snapshotDdia(make('<li><a href="#x"><em>a</em></a> b</li>')));});
 it('現在位置の判定線は見出しのscroll-margin（ヘッダー＋免責バナー＋24px）と一致し、バナー高さの変化に追従する',async()=>{
  const root=document.documentElement;root.style.setProperty('--header-h','60px');root.style.setProperty('--disclaimer-height','40px');
  const {container:c,unmount}=render(<Guide/>);
  const links=[...c.querySelectorAll('nav a')];
  const targets=links.map(a=>document.getElementById(decodeURIComponent(a.getAttribute('href')!.slice(1)))!);
  // 2番目の見出しだけ top を差し替え、それ以外は判定線より十分下に置く
  const placeSecond=(top:number)=>{targets.forEach((t,i)=>{t.getBoundingClientRect=()=>({top:i===0?-1000:i===1?top:99999} as DOMRect);});fireEvent.scroll(window);};
  try{
   // 判定線の +24px は、目次の全リンク先（h2/h3）に効く scroll-margin-top と同じ値であること
   expect(fs.readFileSync('app/recommended-books/designing-data-intensive-applications/page.css','utf8')).toContain('.ddia-page .main h2, .ddia-page .main h3 { scroll-margin-top: calc(var(--header-h, 60px) + var(--disclaimer-height, 0px) + 24px); }');
   expect(targets.map(t=>t?.tagName)).toEqual(links.map(()=>expect.stringMatching(/^H[23]$/)));
   // 判定線 = 60 + 40 + 24 = 124px（サブピクセル許容 1px）
   placeSecond(124);await waitFor(()=>expect(links[1]).toHaveAttribute('aria-current','location'));
   placeSecond(130);await waitFor(()=>expect(links[0]).toHaveAttribute('aria-current','location'));
   // バナーが 56px に伸びると判定線は 140px へ移り、130px の見出しが現在位置になる
   root.style.setProperty('--disclaimer-height','56px');
   placeSecond(130);await waitFor(()=>expect(links[1]).toHaveAttribute('aria-current','location'));
  }finally{unmount();root.style.removeProperty('--header-h');root.style.removeProperty('--disclaimer-height');}
 });
});
