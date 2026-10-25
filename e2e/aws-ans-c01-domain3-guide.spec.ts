import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import inventory from '../docs/migration-inventory/aws-ans-c01-domain3-guide.json';
import fixture from '../docs/migration-inventory/aws-ans-c01-domain3-guide.fidelity.json';
const route='/aws/advanced-networking-specialty/domain3';
for(const width of [1440,768,390]){
 test(`ANS Domain 3 ${width}px: source content, list markers, natural diagrams and learning controls`,async({page})=>{
  test.setTimeout(180_000);await page.setViewportSize({width,height:1000});await page.emulateMedia({reducedMotion:'reduce'});
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await page.goto(route);const root=page.locator('.ans-domain3-page');
  await expect(root).toHaveCSS('background-color','rgb(255, 255, 255)');await expect(root).toHaveCSS('color','rgb(27, 38, 56)');
  for(const tag of ['h1','h2','h3','h4','th','td'] as const)expect((await root.locator(tag).allTextContents()).map(t=>t.replace(/\s+/g,' ').trim())).toEqual(inventory[tag].map(t=>t.replace(/\s+/g,' ').trim()));
  await expect(root.locator('main li')).toHaveCount(38);await expect(root.locator('table')).toHaveCount(91);
  expect(await root.locator('main a[href^="http"]').evaluateAll(links=>links.map(a=>a.getAttribute('href')))).toEqual(inventory.links.map(a=>a.href));
  const sourceListStyles=await root.locator('main').evaluate((main,rules)=>{
   const frame=document.createElement('iframe');frame.style.cssText='position:fixed;left:-10000px;width:'+window.innerWidth+'px;height:1000px';document.body.append(frame);
   try{
    const doc=frame.contentDocument!;const css=rules.map(rule=>{const body=rule.selector+'{'+Object.entries(rule.declarations).filter(([,value])=>typeof value==='string').map(([prop,value])=>prop+':'+value).join(';')+'}';return rule.media?'@media '+rule.media+'{'+body+'}':body;}).join('\n');
    doc.open();doc.write('<!doctype html><html><head><style>'+css+'</style></head><body>'+main.outerHTML+'</body></html>');doc.close();
    const read=(root:Element,view:Window)=>[...root.querySelectorAll('ul,ol,li')].map(el=>{const style=view.getComputedStyle(el);return {tag:el.tagName,type:style.listStyleType,position:style.listStylePosition,padding:style.paddingLeft,marginBottom:style.marginBottom,display:style.display,counterReset:style.counterReset,counterIncrement:style.counterIncrement};});
    return {actual:read(main,window),source:read(doc.querySelector('main')!,frame.contentWindow!)};
   }finally{frame.remove();}
  },fixture.guideDesign.rules);
  expect(sourceListStyles.actual).toEqual(sourceListStyles.source);
  await expect(root.locator('nav ul')).toHaveCSS('list-style-type','none');
  const svgs=root.locator('.mermaid-wrap svg');await expect(svgs).toHaveCount(26,{timeout:120_000});await expect(root.locator('.mermaid-wrap [data-theme="light"]')).toHaveCount(26);
  await expect(root).not.toContainText('Syntax error');
  const geometry=await svgs.evaluateAll(elements=>elements.map(el=>{const svg=el as SVGSVGElement;const v=svg.viewBox.baseVal;const bounds=[...svg.querySelectorAll<SVGGraphicsElement>('.node,.edgeLabel,.cluster-label,.actor,.note,.labelBox')].map(n=>{try{const b=n.getBBox();if(b.width===0&&b.height===0)return null;const m=n.getCTM();const inv=svg.getCTM()?.inverse();if(!m||!inv)return null;const matrix=inv.multiply(m);const pts=[[b.x,b.y],[b.x+b.width,b.y+b.height]].map(([x,y])=>new DOMPoint(x,y).matrixTransform(matrix));return {x:pts[0]!.x,y:pts[0]!.y,right:pts[1]!.x,bottom:pts[1]!.y};}catch{return null;}}).filter(b=>b!==null);return {natural:v.width,width:svg.getBoundingClientRect().width,x:v.x,y:v.y,right:v.x+v.width,bottom:v.y+v.height,bounds};}));
  for(const g of geometry){expect(g.width).toBeGreaterThanOrEqual(g.natural-2);for(const b of g.bounds){expect(b.x).toBeGreaterThanOrEqual(g.x-3);expect(b.y).toBeGreaterThanOrEqual(g.y-3);expect(b.right).toBeLessThanOrEqual(g.right+3);expect(b.bottom).toBeLessThanOrEqual(g.bottom+3);}}
  const target=fixture.guideDesign.nav.find(item=>item.id.startsWith('part-b-task-32-'))!;
  const toggle=root.getByRole('button',{name:'メニュー'});if(width<=980)await toggle.click();
  const anchor=root.locator(`nav a[href="#${target.id}"]`);await anchor.click();
  await expect(root.locator(`[id="${target.id}"]`)).toBeFocused();await expect(anchor).toHaveAttribute('aria-current','location');expect(decodeURIComponent(new URL(page.url()).hash)).toBe('#'+target.id);
  if(width<=980){await expect(toggle).toHaveAttribute('aria-expanded','false');await expect(root.locator('.sidebar')).toBeHidden();}
  const offset=await page.evaluate(()=>{const style=getComputedStyle(document.documentElement);return parseFloat(style.getPropertyValue('--header-h'))+parseFloat(style.getPropertyValue('--disclaimer-height')||'0');});
  expect(await root.locator(`[id="${target.id}"]`).evaluate(el=>el.getBoundingClientRect().top)).toBeGreaterThanOrEqual(offset);
  await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth)).toBe(true);
  const answers=root.locator('details.scenario-answer');await expect(answers).toHaveCount(8);
  for(const panel of await answers.all()){
   await expect(panel).not.toHaveAttribute('open');await panel.locator('summary').click();await expect(panel).toHaveAttribute('open');await expect(panel.locator('p')).toBeVisible();
   await panel.locator('summary').focus();await panel.locator('summary').press('Enter');await expect(panel).not.toHaveAttribute('open');
  }
  const sidebar=root.locator('.sidebar');if(width>980){await expect(sidebar).toHaveCSS('width','300px');expect(await sidebar.evaluate(el=>el.getBoundingClientRect().top)).toBeGreaterThanOrEqual(offset);}
  await expect(root.locator('.code-block')).toHaveCount(7);await expect(root.locator('.code-block .c1').first()).toHaveCSS('font-style','italic');
  const axe=await new AxeBuilder({page}).include('.ans-domain3-page').analyze();expect(axe.violations).toEqual([]);expect(errors).toEqual([]);
 });
}
test('ANS Domain 3 browser detects removed list markers and indentation',async({page})=>{
 await page.goto(route);const list=page.locator('.ans-domain3-page main ul').filter({hasNot:page.locator('input')}).first();
 await expect(list).toHaveCSS('list-style-type','disc');
 const mutation=await page.addStyleTag({content:'.ans-domain3-page .main ul {list-style-type:none!important;padding-left:0!important}'});
 expect(await list.evaluate(el=>getComputedStyle(el).listStyleType)).toBe('none');expect(await list.evaluate(el=>parseFloat(getComputedStyle(el).paddingLeft))).toBe(0);
 await mutation.evaluate(el=>el.parentNode?.removeChild(el));await expect(list).toHaveCSS('list-style-type','disc');
});

test('ANS home and Header expose the dedicated Domain 3 guide',async({page})=>{
 test.setTimeout(90_000);await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');const card=page.getByRole('heading',{name:'AWS Certified Advanced Networking - Specialty'}).locator('xpath=ancestor::article');await expect(card.locator(`a[href="${route}"]`)).toHaveCount(1);await expect(card.locator('a.home-card-cta')).toHaveAttribute('href','/aws/advanced-networking-specialty');
 await page.getByRole('button',{name:'メニューを開く'}).click();const dialog=page.getByRole('dialog',{name:'サイトナビゲーション'});const link=dialog.locator(`a[href="${route}"]`);await expect(link).toHaveCount(1);await dialog.locator('summary').filter({hasText:'AWS Certified Advanced Networking - Specialty'}).click();await expect(link).toBeVisible();await link.click();await expect(page).toHaveURL(new RegExp(route+'$'));await expect(page.locator('.ans-domain3-page h1')).toBeVisible();
});
