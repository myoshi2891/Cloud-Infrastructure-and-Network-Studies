import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import design from '../docs/migration-inventory/computer-networks-tanenbaum.design.json';

for (const width of [1440, 768, 390]) {
    test(`Tanenbaum: ${width}px 内容・リスト・図・目次・チェック操作`, async ({ page }) => {
        test.setTimeout(150_000);
        await page.setViewportSize({ width, height: 1000 });
        const errors: string[] = [];
        page.on('pageerror', error => errors.push(error.message));
        page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
        await page.goto('/recommended-books/computer-networks-tanenbaum');
        const root = page.locator('.tanenbaum-page');
        await expect(root.locator('main h1')).toContainText('コンピュータネットワーク入門ガイド');
        await expect(root.locator('main table')).toHaveCount(12);
        await expect(root.locator('main li')).toHaveCount(64);
        await expect(root.locator('nav li')).toHaveCount(47);
        await expect(root.locator('main a[href^="http"]')).toHaveCount(26);
        await expect(root.locator('.mermaid-wrap svg')).toHaveCount(21, { timeout: 90_000 });
        await expect(root).not.toContainText('Syntax error in text');
        const lists = await root.locator('main ul, main ol').evaluateAll(elements => elements.map(el => ({
            tag: el.tagName.toLowerCase(), type: getComputedStyle(el).listStyleType,
            position: getComputedStyle(el).listStylePosition, padding: parseFloat(getComputedStyle(el).paddingLeft),
            checklist: Boolean(el.closest('.checklist-card')),
        })));
        expect(lists).toHaveLength(17);
        for (const list of lists) {
            expect(list.type).toBe(list.checklist ? 'none' : list.tag === 'ol' ? 'decimal' : 'disc');
            if (!list.checklist) { expect(list.position).toBe('outside'); expect(list.padding).toBeGreaterThan(0); }
        }
        expect(await root.locator('nav ul').evaluate(el => getComputedStyle(el).listStyleType)).toBe('none');
        await expect(root.locator('.ref-card .num')).toHaveText(design.structure.references.map(ref => ref.number));
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);

        const geometry = () => root.locator('.mermaid-wrap svg').evaluateAll(elements => elements.map(el => {
            const svg = el as SVGSVGElement;
            const width = svg.getBoundingClientRect().width;
            return { natural: svg.viewBox.baseVal.width, width, inlineWidth: parseFloat(svg.style.width) };
        }));
        const initial = await geometry();
        for (const diagram of initial) {
            expect(Math.abs(diagram.inlineWidth - diagram.natural)).toBeLessThan(2);
            expect(diagram.width).toBeGreaterThanOrEqual(diagram.natural - 2);
        }
        for (const id of ['step0-2', 'step5-2', 'step6-4', 'references']) {
            await root.locator(`#${id}`).evaluate(el => el.scrollIntoView({ block: 'start' }));
            await expect(root.locator(`#${id}`)).toBeVisible();
        }
        expect(await geometry()).toEqual(initial);

        const toggle = root.getByRole('button', { name: 'メニュー', exact: true });
        if (width <= 980) {
            await expect(root.locator('.sidebar')).not.toBeVisible();
            await toggle.click();
            await expect(toggle).toHaveAttribute('aria-expanded', 'true');
            await expect(root.locator('.sidebar')).toBeVisible();
        }
        const link = root.locator('nav a[href="#step4-2"]');
        await link.click();
        await expect(page).toHaveURL(/#step4-2$/);
        await expect(root.locator('#step4-2')).toBeFocused();
        await expect(link).toHaveAttribute('aria-current', 'location');
        await expect.poll(() => root.locator('#step4-2').evaluate(el => {
            const top = el.getBoundingClientRect().top;
            const margin = parseFloat(getComputedStyle(el).scrollMarginTop);
            return top >= margin - 1 && top < innerHeight;
        })).toBe(true);
        if (width <= 980) await expect(toggle).toHaveAttribute('aria-expanded', 'false');

        await root.locator('#step7').evaluate(el => el.scrollIntoView({ block: 'start', behavior: 'instant' }));
        await expect(root.locator('nav a[href="#step7"]')).toHaveAttribute('aria-current', 'location');
        const checks = root.locator('input[type="checkbox"]');
        await checks.first().check();
        await expect(root.locator('.checklist-header .count')).toHaveText('1 / 10 完了');
        await checks.first().uncheck();
        await expect(root.locator('.checklist-header .count')).toHaveText('0 / 10 完了');
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
        expect(errors).toEqual([]);
        const accessibility = await new AxeBuilder({ page }).include('.tanenbaum-page').analyze();
        expect(accessibility.violations).toEqual([]);
    });
}
