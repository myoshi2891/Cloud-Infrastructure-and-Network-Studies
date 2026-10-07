import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import inventory from '../docs/migration-inventory/aws-dva-domain2-security.json';
import design from '../docs/migration-inventory/aws-dva-domain2-security.design.json';

for (const width of [1440, 768, 390]) {
    test(`DVA Security ${width}px: 本文・図・リスト装飾・目次・チェック操作`, async ({ page }) => {
        test.setTimeout(180_000);
        await page.setViewportSize({ width, height: 1000 });
        const errors: string[] = [];
        page.on('pageerror', error => errors.push(error.message));
        page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
        await page.goto('/aws/developer-associate/domain2');
        const root = page.locator('.dva-security-page');
        await expect(root).toHaveCSS('background-color', 'rgb(250, 247, 240)');
        await expect(root).toHaveCSS('color', 'rgb(28, 35, 51)');
        await expect(root).toHaveCSS('font-size', '17px');
        await expect(root.locator('.sidebar')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
        await expect(root.locator('main table').first()).toHaveCSS('font-size', '16px');
        await expect(root.locator('main h2').first()).toHaveCSS('font-size', width <= 900 ? '22.4px' : '28px');
        await expect(root.locator('main h2').first()).toHaveCSS('font-family', /Source Serif 4 Variable/);
        await expect.poll(() => page.evaluate(() => document.fonts.check('700 28px "Source Serif 4 Variable"'))).toBe(true);

        await expect(root.locator('main h2')).toHaveCount(inventory.h2.length);
        await expect(root.locator('main table')).toHaveCount(inventory.counts.table);
        await expect(root.locator('main li')).toHaveCount(inventory.listItems.length);
        await expect(root.locator('main a[href^="http"]')).toHaveCount(inventory.links.length);
        await expect(root.locator('.diagram-wrap svg')).toHaveCount(inventory.counts.diagram, { timeout: 120_000 });
        await expect(root).not.toContainText('Syntax error in text');
        const firstDiagram = root.locator('.diagram-wrap').first();
        await expect(firstDiagram.locator('.node rect').first()).toHaveCSS('fill', 'rgb(236, 238, 251)');
        await expect(firstDiagram.locator('.node rect').first()).toHaveCSS('stroke', 'rgb(59, 63, 158)');
        await expect(firstDiagram.locator('.nodeLabel').first()).toHaveCSS('color', 'rgb(28, 35, 51)');
        await expect(firstDiagram.locator('.nodeLabel').first()).toHaveCSS('font-family', /Noto Sans JP Variable/);

        const lists = await root.locator('main ul, main ol').evaluateAll(elements => elements.map(el => ({
            tag: el.tagName, type: getComputedStyle(el).listStyleType,
            nested: el.parentElement?.closest('ul') !== null,
            position: getComputedStyle(el).listStylePosition, padding: parseFloat(getComputedStyle(el).paddingLeft),
        })));
        expect(lists).toHaveLength(design.structure.lists.length);
        for (const list of lists) {
            expect(list.type).toBe(list.tag === 'OL' ? 'decimal' : list.nested ? 'circle' : 'disc');
            expect(list.position).toBe('outside');
            expect(list.padding).toBeGreaterThan(0);
        }
        for (const item of await root.locator('li.chk').evaluateAll(elements => elements.map(el => getComputedStyle(el).listStyleType))) expect(item).toBe('none');
        expect(await root.locator('nav ul').evaluate(el => getComputedStyle(el).listStyleType)).toBe('none');
        const diagramGeometry = () => root.locator('.diagram-wrap svg').evaluateAll(elements => elements.map(el => {
            const svg = el as SVGSVGElement;
            return { natural: svg.viewBox.baseVal.width, width: svg.getBoundingClientRect().width, inline: parseFloat(svg.style.width) };
        }));
        const initial = await diagramGeometry();
        for (const diagram of initial) {
            expect(Math.abs(diagram.inline - diagram.natural)).toBeLessThan(2);
            expect(diagram.width).toBeGreaterThanOrEqual(diagram.natural - 2);
        }
        const toggle = root.locator('#menuBtn');
        if (width <= 900) {
            await toggle.click();
            await expect(root.locator('.sidebar')).toBeVisible();
            await expect(toggle).toHaveAttribute('aria-expanded', 'true');
        }
        const link = root.locator('nav a[href="#step-7"]');
        await link.click();
        await expect(page).toHaveURL(/#step-7$/);
        await expect(root.locator('#step-7')).toBeFocused();
        await expect(link).toHaveAttribute('aria-current', 'location');
        const offset = await page.evaluate(() => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) + parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--disclaimer-height') || '0'));
        await expect.poll(() => root.locator('#step-7').evaluate(el => el.getBoundingClientRect().top)).toBeGreaterThanOrEqual(offset);
        if (width <= 900) {
            await expect(toggle).toHaveAttribute('aria-expanded', 'false');
            await toggle.click();
            await page.keyboard.press('Escape');
            await expect(toggle).toBeFocused();
        }
        await root.locator('#step-19').evaluate(el => el.scrollIntoView({ block: 'start', behavior: 'instant' }));
        await expect(root.locator('nav a[href="#step-19"]')).toHaveAttribute('aria-current', 'location');
        const checks = root.locator('li.chk input');
        await checks.first().check();
        await expect(root.locator('#pcount')).toHaveText('1 / 20');
        await expect(root.locator('li.chk').first()).toHaveClass(/done/);
        await checks.first().uncheck();
        await expect(root.locator('#pcount')).toHaveText('0 / 20');
        expect(await diagramGeometry()).toEqual(initial);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
        const results = await new AxeBuilder({ page }).include('.dva-security-page').analyze();
        expect(results.violations).toEqual([]);
        expect(errors).toEqual([]);
    });
}
