import { test, expect } from '@playwright/test';

const url = '/gcl/hands-on/secure-cicd-pipeline-guide';
for (const width of [1440, 390]) {
    test(`secure CI/CD: ${width}px lists, layout, diagrams and navigation`, async ({ page }) => {
        test.setTimeout(90_000);
        await page.setViewportSize({width, height: 1000});
        const errors: string[] = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.goto(url);
        await expect(page.locator('main h1')).toHaveText('セキュアなコンテナ CI/CD パイプライン構築ガイド');
        await expect(page.locator('.mermaid-target svg')).toHaveCount(4, {timeout: 60_000});
        const initial = await page.locator('.mermaid-target svg').evaluateAll(elements => elements.map(el => ({viewBox:el.getAttribute('viewBox'), width:(el as SVGElement).style.width})));
        for (const section of ['architecture','task3','task5','sequence','references']) {
            await page.locator(`#${section}`).evaluate(el => el.scrollIntoView({block:'start'}));
            await expect(page.locator(`#${section}`)).toBeVisible();
        }
        expect(await page.locator('.mermaid-target svg').evaluateAll(elements => elements.map(el => ({viewBox:el.getAttribute('viewBox'), width:(el as SVGElement).style.width})))).toEqual(initial);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
        expect(await page.locator('#overview ul').evaluate(el=>getComputedStyle(el).listStyleType)).toBe('disc');
        expect(await page.locator('#overview ol').evaluate(el=>getComputedStyle(el).listStyleType)).toBe('decimal');
        expect(await page.locator('.reference-list').evaluate(el=>getComputedStyle(el).listStyleType)).toBe('none');
        await expect(page.locator('.reference-index')).toHaveText(Array.from({length:23},(_,i)=>String(i+1).padStart(2,'0')));
        const measurements = await page.locator('.mermaid-target svg').evaluateAll(elements=>elements.map(el=>{
            const svg=el as SVGSVGElement; const vb=svg.viewBox.baseVal; const style=getComputedStyle(svg);
            return {natural: Math.abs(parseFloat(svg.style.width)-vb.width)<1, height:style.maxHeight, wrapperOverflow:getComputedStyle(svg.closest('.mermaid-container')!).overflowX, labels:[...svg.querySelectorAll('.nodeLabel, text')].filter(label=>label.textContent?.trim()).length};
        }));
        measurements.forEach(m=>{expect(m.natural).toBe(true);expect(m.height).toBe('none');expect(m.wrapperOverflow).toBe('auto');expect(m.labels).toBeGreaterThan(0);});
        await page.locator('.sidebar a[href="#task3"]').click();
        await expect(page).toHaveURL(/#task3$/);
        await expect(page.locator('#task3')).toBeFocused();
        await expect(page.locator('.sidebar a[href="#task3"]')).toHaveAttribute('aria-current','location');
        // スクロール完了（2 フレーム間で位置不変）を待ち、scroll-margin 境界以下かつ viewport 内にあることを検証
        await expect.poll(async()=>page.locator('#task3').evaluate(async el=>{
            const before=el.getBoundingClientRect().top;
            await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
            const top=el.getBoundingClientRect().top;
            const margin=parseFloat(getComputedStyle(el).scrollMarginTop)||0;
            return Math.abs(top-before)<1 && top>=margin-1 && top<innerHeight;
        })).toBe(true);
        expect(errors).toEqual([]);
    });
}
