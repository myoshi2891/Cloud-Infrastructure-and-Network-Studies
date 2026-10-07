import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import inventory from '../docs/migration-inventory/aws-dva-domain1-development.json';
import design from '../docs/migration-inventory/aws-dva-domain1-development.design.json';

for(const width of [1440,768,390]) {
    test(`DVA Development ${width}px: 全量・ライト配色・14px・図倍率・目次・15解説`,async({page})=>{
        test.setTimeout(180_000);
        await page.setViewportSize({width,height:1000});
        const errors:string[]=[];
        page.on('pageerror',error=>errors.push(error.message));
        page.on('console',message=>{if(message.type()==='error') errors.push(message.text());});
        await page.goto('/aws/developer-associate/domain1');
        const root=page.locator('.dva-development-page');
        await expect(root).toHaveCSS('background-color','rgb(250, 247, 240)');
        await expect(root).toHaveCSS('color','rgb(31, 36, 48)');
        await expect(root).toHaveCSS('font-size','14px');
        for(const selector of ['main table','.code-line-content','.nav-list a']) await expect(root.locator(selector).first()).toHaveCSS('font-size','14px');
        await expect(root.locator('main h2').first()).toHaveCSS('font-family',/Source Serif 4 Variable/);
        await expect(root.locator('main h2').first()).toHaveCSS('font-size',width<=900?'20.3px':'23.8px');
        await expect.poll(()=>page.evaluate(()=>document.fonts.check('700 28px "Source Serif 4 Variable"'))).toBe(true);
        // 自己ホストwebfontの全アイコンが空の四角へ置き換わっていないこと。
        const icons=await root.locator('i.ti').evaluateAll(elements=>elements.map(el=>({family:getComputedStyle(el).fontFamily,content:getComputedStyle(el,'::before').content})));
        expect(icons).toHaveLength(design.structure.icons.length);
        icons.forEach(icon=>{expect(icon.family).toContain('tabler-icons');expect(icon.content).not.toMatch(/^(none|normal|"")$/);});
        for(const key of ['h1','h2','h3','h4','th','td','listItems'] as const) {
            const texts=await root.locator(key==='listItems'?'li':key).allTextContents();
            expect(texts.map(text=>text.replace(/\s+/g,''))).toEqual(inventory[key].map(text=>text.replace(/\s+/g,'')));
        }
        await expect(root.locator('table')).toHaveCount(inventory.counts.table);
        await expect(root.locator('.code-block')).toHaveCount(inventory.counts.codeBlock);
        expect(await root.locator('a[href^="http"]').evaluateAll(elements=>elements.map(el=>el.getAttribute('href')))).toEqual(inventory.links.map(link=>link.href));
        await expect(root.locator('.diagram-wrap svg')).toHaveCount(31,{timeout:120_000});
        await expect(root).not.toContainText('Syntax error in text');
        const first=root.locator('.diagram-wrap').first();
        await expect(first.locator('.node rect').first()).toHaveCSS('fill','rgb(232, 235, 250)');
        await expect(first.locator('.node rect').first()).toHaveCSS('stroke','rgb(59, 79, 168)');
        await expect(first.locator('.nodeLabel').first()).toHaveCSS('color','rgb(31, 36, 48)');
        await expect(first.locator('.nodeLabel').first()).toHaveCSS('font-size','14px');
        const geometry=()=>root.locator('.diagram-wrap svg').evaluateAll(elements=>elements.map(el=>{
            const svg=el as SVGSVGElement;
            return {natural:svg.viewBox.baseVal.width,inline:parseFloat(svg.style.width),width:svg.getBoundingClientRect().width};
        }));
        const initial=await geometry();
        for(const diagram of initial) {
            expect(Math.abs(diagram.inline-diagram.natural)).toBeLessThan(2);
            expect(diagram.width).toBeGreaterThanOrEqual(diagram.natural-2);
        }
        const lists=await root.locator('main ul,main ol').evaluateAll(elements=>elements.map(el=>({tag:el.tagName,type:getComputedStyle(el).listStyleType,nested:el.parentElement?.closest('ul')!==null,padding:parseFloat(getComputedStyle(el).paddingLeft),position:getComputedStyle(el).listStylePosition})));
        expect(lists).toHaveLength(design.structure.lists.length);
        for(const list of lists) {
            expect(list.type).toBe(list.tag==='OL'?'decimal':list.nested?'circle':'disc');
            expect(list.padding).toBeGreaterThan(0);expect(list.position).toBe('outside');
        }
        await expect(root.locator('.nav-list')).toHaveCSS('list-style-type','none');
        const toggle=root.locator('#menu-btn');
        if(width<=900) {await toggle.click();await expect(toggle).toHaveAttribute('aria-expanded','true');}
        const link=root.locator('nav a[href="#sk-1-2-4"]');
        await link.click();
        await expect(page).toHaveURL(/#sk-1-2-4$/);
        await expect(root.locator('#sk-1-2-4')).toBeFocused();
        await expect(link).toHaveAttribute('aria-current','location');
        const offset=await page.evaluate(()=>parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h'))+parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--disclaimer-height')||'0'));
        await expect.poll(()=>root.locator('#sk-1-2-4').evaluate(el=>el.getBoundingClientRect().top)).toBeGreaterThanOrEqual(offset);
        if(width<=900) {
            await expect(toggle).toHaveAttribute('aria-expanded','false');
            await toggle.click();await page.keyboard.press('Escape');await expect(toggle).toBeFocused();
        }
        await root.locator('#sk-1-3-8').evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));
        await expect(root.locator('nav a[href="#sk-1-3-8"]')).toHaveAttribute('aria-current','location');
        const answers=root.locator('details');
        await expect(answers).toHaveCount(15);
        for(let i=0;i<15;i++) {
            const answer=answers.nth(i),summary=answer.locator('summary');
            await summary.click();await expect(answer).toHaveAttribute('open','');
            await expect(answer.locator('p')).toBeVisible();
            await summary.click();await expect(answer).not.toHaveAttribute('open');
        }
        expect(await geometry()).toEqual(initial);
        expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
        await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
        const results=await new AxeBuilder({page}).include('.dva-development-page').analyze();
        expect(results.violations).toEqual([]);
        expect(errors).toEqual([]);
    });
}
