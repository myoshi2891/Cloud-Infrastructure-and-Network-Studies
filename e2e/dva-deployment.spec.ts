import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import inventory from '../docs/migration-inventory/aws-dva-domain3-deployment.json';
import design from '../docs/migration-inventory/aws-dva-domain3-deployment.design.json';

for (const width of [1440, 768, 390]) {
    test(`DVA Deployment ${width}px: 全量・リスト装飾・自然倍率・目次・チェック`, async ({ page }) => {
        test.setTimeout(180_000);
        await page.setViewportSize({ width, height: 1000 });
        const errors: string[] = [];
        page.on('pageerror', error => errors.push(error.message));
        page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
        await page.goto('/aws/developer-associate/domain3');
        const root = page.locator('.dva-deployment-page');
        await expect(root).toHaveCSS('background-color', 'rgb(250, 248, 243)');
        await expect(root).toHaveCSS('color', 'rgb(31, 36, 48)');
        await expect(root).toHaveCSS('font-size', '14px');
        await expect(root.locator('main table').first()).toHaveCSS('font-size', '14px');
        await expect(root.locator('main code').first()).toHaveCSS('font-size', '14px');
        await expect(root.locator('.nav').first()).toHaveCSS('font-size', '14px');
        await expect(root.locator('.hero h1')).toHaveCSS('font-family', /Source Serif 4 Variable/);
        for (const key of ['h1','h2','h3','h4','th','td'] as const) await expect(root.locator(`main ${key}`)).toHaveCount(inventory[key].length);
        await expect(root.locator('main li')).toHaveCount(inventory.listItems.length);
        await expect(root.locator('main table')).toHaveCount(inventory.counts.table);
        await expect(root.locator('main a[href^="http"]')).toHaveCount(inventory.links.length);
        await expect(root.locator('.diagram-wrap svg')).toHaveCount(inventory.counts.diagram, { timeout: 120_000 });
        await expect(root).not.toContainText('Syntax error in text');
        const firstDiagram = root.locator('.diagram-wrap').first();
        await expect(firstDiagram.locator('.node rect').first()).toHaveCSS('fill', 'rgb(232, 235, 248)');
        await expect(firstDiagram.locator('.nodeLabel').first()).toHaveCSS('color', 'rgb(31, 36, 48)');
        await expect(firstDiagram.locator('.nodeLabel').first()).toHaveCSS('font-size', '14px');
        const lists = await root.locator('main ul, main ol').evaluateAll(elements => elements.map(el => ({
            tag: el.tagName.toLowerCase(), type: getComputedStyle(el).listStyleType,
            start: el.getAttribute('start'), nested: Boolean(el.parentElement?.closest('ul')),
            position: getComputedStyle(el).listStylePosition, padding: parseFloat(getComputedStyle(el).paddingLeft),
            checklist: Boolean(el.closest('.checklist')),
        })));
        expect(lists.map(list => ({ tag: list.tag, start: list.start }))).toEqual(design.structure.lists.map(list => ({ tag: list.tag, start: list.start })));
        for (const list of lists) {
            expect(list.type).toBe(list.tag === 'ol' ? 'decimal' : list.nested ? 'circle' : 'disc');
            expect(list.position).toBe('outside');
            if (!list.checklist) expect(list.padding).toBe(40);
        }
        await expect(root.locator('ol[start="4"]')).toHaveCount(1);
        for (const style of await root.locator('li.chk').evaluateAll(elements => elements.map(el => getComputedStyle(el).listStyleType))) expect(style).toBe('none');
        await expect(root.locator('nav ul')).toHaveCSS('list-style-type', 'none');
        const geometry = () => root.locator('.diagram-wrap svg').evaluateAll(elements => elements.map(el => {
            const svg = el as SVGSVGElement;
            return { natural: svg.viewBox.baseVal.width, width: svg.getBoundingClientRect().width, inline: parseFloat(svg.style.width) };
        }));
        const initial = await geometry();
        for (const diagram of initial) {
            expect(Math.abs(diagram.inline - diagram.natural)).toBeLessThan(2);
            expect(diagram.width).toBeGreaterThanOrEqual(diagram.natural - 2);
        }
        const toggle = root.locator('#mb');
        if (width <= 900) { await toggle.click(); await expect(toggle).toHaveAttribute('aria-expanded', 'true'); }
        const link = root.locator('nav a[href="#s9"]');
        await link.click();
        await expect(page).toHaveURL(/#s9$/);
        await expect(root.locator('#s9')).toBeFocused();
        await expect(link).toHaveAttribute('aria-current', 'location');
        const offset = await page.evaluate(() => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) + parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--disclaimer-height') || '0'));
        await expect.poll(() => root.locator('#s9').evaluate(el => el.getBoundingClientRect().top)).toBeGreaterThanOrEqual(offset);
        if (width <= 900) {
            await expect(toggle).toHaveAttribute('aria-expanded', 'false');
            await toggle.click(); await page.keyboard.press('Escape'); await expect(toggle).toBeFocused();
        }
        await root.locator('#s21').evaluate(el => el.scrollIntoView({ block: 'start', behavior: 'instant' }));
        await expect(root.locator('nav a[href="#s21"]')).toHaveAttribute('aria-current', 'location');
        const checks = root.locator('li.chk input');
        await checks.first().check();
        await expect(root.locator('.cl-count')).toHaveText('1 / 9');
        await expect(root.locator('li.chk').first()).toHaveClass(/done/);
        for (let i = 1; i < 9; i++) await checks.nth(i).check();
        await expect(root.locator('.cl-done')).toBeVisible();
        await checks.first().uncheck();
        await expect(root.locator('.cl-count')).toHaveText('8 / 9');
        await expect(root.locator('.cl-done')).toBeHidden();
        const details = root.locator('details').first();
        await details.locator('summary').click(); await expect(details).toHaveAttribute('open', '');
        await details.locator('summary').click(); await expect(details).not.toHaveAttribute('open');
        expect(await geometry()).toEqual(initial);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
        const results = await new AxeBuilder({ page }).include('.dva-deployment-page').analyze();
        expect(results.violations).toEqual([]);
        expect(errors).toEqual([]);
    });
}
