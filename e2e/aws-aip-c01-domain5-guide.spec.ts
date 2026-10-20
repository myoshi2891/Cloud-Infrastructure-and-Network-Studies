import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import inventory from '../docs/migration-inventory/aws-aip-c01-domain5-guide.json';
import fixture from '../docs/migration-inventory/aws-aip-c01-domain5-guide.fidelity.json';
import quiz from '../docs/migration-inventory/aws-aip-c01-domain5-guide.quiz.json';
const route='/aws/generative-ai-developer-professional/domain5';
for(const width of [1440,768,390]){
 test(`AIP Domain 5 ${width}px: source content, list markers, natural diagrams and learning controls`,async({page})=>{
  test.setTimeout(180_000);await page.setViewportSize({width,height:1000});await page.emulateMedia({reducedMotion:'reduce'});
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await page.goto(route);const root=page.locator('.aip-domain5-page');
  await expect(root).toHaveCSS('background-color','rgb(246, 248, 252)');await expect(root).toHaveCSS('color','rgb(27, 39, 64)');
  for(const tag of ['h1','h2','h3','h4','th','td'] as const)expect((await root.locator(tag).allTextContents()).map(t=>t.replace(/\s+/g,' ').trim())).toEqual(inventory[tag].map(t=>t.replace(/\s+/g,' ').trim()));
  await expect(root.locator('main li')).toHaveCount(206);await expect(root.locator('table')).toHaveCount(47);
  expect(await root.locator('main a[href^="http"]').evaluateAll(links=>links.map(a=>a.getAttribute('href')))).toEqual(inventory.links.map(a=>a.href));
  const lists=await root.locator('main ul,main ol').evaluateAll(elements=>elements.map(el=>{
   let depth=0;for(let p=el.parentElement;p&&!p.matches('main');p=p.parentElement)if(p.matches('ul,ol'))depth++;
   const css=getComputedStyle(el);return {tag:el.tagName.toLowerCase(),start:el.getAttribute('start'),reversed:el.hasAttribute('reversed'),depth,type:css.listStyleType,position:css.listStylePosition,padding:parseFloat(css.paddingLeft),checklist:Boolean(el.closest('.checklist-card'))};
  }));
  expect(lists.map(({tag,start,reversed,depth})=>({tag,start,reversed,depth}))).toEqual(Object.values(fixture.guideParts).flatMap(part=>part.lists).map(({tag,start,reversed,depth})=>({tag,start,reversed,depth})));
  for(const list of lists){expect(list.type).toBe(list.checklist?'none':list.tag==='ol'?'decimal':list.depth>1?'square':list.depth===1?'circle':'disc');expect(list.position).toBe('outside');expect(list.padding).toBeCloseTo(list.checklist?0:22.4,1);}
  expect(await root.locator('main li').evaluateAll(items=>items.map(li=>getComputedStyle(li).display))).toEqual(await root.locator('main li').evaluateAll(items=>items.map(li=>li.closest('.checklist-card')?'flex':'list-item')));
  await expect(root.locator('nav ul')).toHaveCSS('list-style-type','none');
  const svgs=root.locator('.mermaid-wrap svg');await expect(svgs).toHaveCount(18,{timeout:120_000});await expect(root.locator('.mermaid-wrap [data-theme="light"]')).toHaveCount(18);
  await expect(root).not.toContainText('Syntax error');
  const geometry=await svgs.evaluateAll(elements=>elements.map(el=>{const svg=el as SVGSVGElement;const v=svg.viewBox.baseVal;const bounds=[...svg.querySelectorAll<SVGGraphicsElement>('.node,.edgeLabel,.cluster-label,.actor,.note,.labelBox')].map(n=>{try{const b=n.getBBox();if(b.width===0&&b.height===0)return null;const m=n.getCTM();const inv=svg.getCTM()?.inverse();if(!m||!inv)return null;const matrix=inv.multiply(m);const pts=[[b.x,b.y],[b.x+b.width,b.y+b.height]].map(([x,y])=>new DOMPoint(x,y).matrixTransform(matrix));return {x:pts[0]!.x,y:pts[0]!.y,right:pts[1]!.x,bottom:pts[1]!.y};}catch{return null;}}).filter(b=>b!==null);return {natural:v.width,width:svg.getBoundingClientRect().width,x:v.x,y:v.y,right:v.x+v.width,bottom:v.y+v.height,bounds};}));
  for(const g of geometry){expect(g.width).toBeGreaterThanOrEqual(g.natural-2);for(const b of g.bounds){expect(b.x).toBeGreaterThanOrEqual(g.x-3);expect(b.y).toBeGreaterThanOrEqual(g.y-3);expect(b.right).toBeLessThanOrEqual(g.right+3);expect(b.bottom).toBeLessThanOrEqual(g.bottom+3);}}
  const target=fixture.guideDesign.nav.find(item=>item.id.startsWith('skill-521'))!;
  const toggle=root.getByRole('button',{name:'メニュー'});if(width<=980)await toggle.click();
  const anchor=root.locator(`nav a[href="#${target.id}"]`);await anchor.click();
  await expect(root.locator(`[id="${target.id}"]`)).toBeFocused();await expect(anchor).toHaveAttribute('aria-current','location');expect(decodeURIComponent(new URL(page.url()).hash)).toBe('#'+target.id);
  if(width<=980){await expect(toggle).toHaveAttribute('aria-expanded','false');await expect(root.locator('.sidebar')).toBeHidden();}
  const offset=await page.evaluate(()=>{const style=getComputedStyle(document.documentElement);return parseFloat(style.getPropertyValue('--header-h'))+parseFloat(style.getPropertyValue('--disclaimer-height')||'0');});
  expect(await root.locator(`[id="${target.id}"]`).evaluate(el=>el.getBoundingClientRect().top)).toBeGreaterThanOrEqual(offset);
  await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth)).toBe(true);
  for(const [i,source] of quiz.entries()){const card=root.locator('.q-card').nth(i);await expect(card.locator('.q-explain')).toBeHidden();for(const key of source.answer)await card.locator(`[data-letter="${key}"]`).click();await card.locator('.q-submit').click();await expect(card.locator('.verdict')).toHaveText('正解です');}
  await expect(root.locator('#qCorrect')).toHaveText('5');await expect(root.locator('#qDone')).toHaveText('5');await root.locator('#qReset').click();await expect(root.locator('#qDone')).toHaveText('0');await expect(root.locator('.q-explain[hidden]')).toHaveCount(5);
  for(const group of await root.locator('.checklist-card').all()){const boxes=group.locator('input');await boxes.first().check();await expect(group.locator('.count')).toContainText('1 /');await boxes.first().uncheck();await expect(group.locator('.count')).toContainText('0 /');}
  await expect(root.locator('.code-block .hljs-keyword').first()).toHaveCSS('color','rgb(255, 123, 114)');
  const axe=await new AxeBuilder({page}).include('.aip-domain5-page').analyze();expect(axe.violations).toEqual([]);expect(errors).toEqual([]);
 });
}
test('AIP Domain 5 browser detects removed list markers and indentation',async({page})=>{
 await page.goto(route);const list=page.locator('.aip-domain5-page main ul').filter({hasNot:page.locator('input')}).first();
 await expect(list).toHaveCSS('list-style-type','disc');
 const mutation=await page.addStyleTag({content:'.aip-domain5-page .main ul {list-style-type:none!important;padding-left:0!important}'});
 expect(await list.evaluate(el=>getComputedStyle(el).listStyleType)).toBe('none');expect(await list.evaluate(el=>parseFloat(getComputedStyle(el).paddingLeft))).toBe(0);
 await mutation.evaluate(el=>el.parentNode?.removeChild(el));await expect(list).toHaveCSS('list-style-type','disc');
});
