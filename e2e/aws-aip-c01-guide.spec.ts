import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import inventory from '../docs/migration-inventory/aws-aip-c01-guide.json';
import fixture from '../docs/migration-inventory/aws-aip-c01-guide.fidelity.json';

const route = '/aws/generative-ai-developer-professional';
for (const width of [1440, 768, 390]) {
    test(`AIP-C01 ${width}px: full content, list markers, diagrams and navigation`, async ({ page }) => {
        test.setTimeout(180_000);
        await page.setViewportSize({ width, height: 1000 });
        await page.emulateMedia({ reducedMotion: 'reduce' });
        const errors: string[] = [];
        page.on('pageerror', error => errors.push(error.message));
        page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
        await page.goto(route);
        const root = page.locator('.aip-guide-page');
        await expect(root).toBeVisible();
        for (const tag of ['h1', 'h2', 'h3', 'h4', 'th', 'td'] as const) {
            await expect(root.locator(tag)).toHaveCount(inventory[tag].length);
        }
        await expect(root.locator('main li')).toHaveCount(inventory.listItems.length);
        await expect(root.locator('main table')).toHaveCount(inventory.counts.table);
        expect(await root.locator('main a[href^="http"]').evaluateAll(links => links.map(link => link.getAttribute('href')))).toEqual(inventory.links.map(link => link.href));
        await expect(root.locator('.mermaid-wrap svg')).toHaveCount(inventory.counts.diagram, { timeout: 120_000 });
        await expect(root).not.toContainText('Syntax error');
        const lists = await root.locator('main ul,main ol').evaluateAll(elements => elements.map(element => ({
            tag: element.tagName.toLowerCase(), type: getComputedStyle(element).listStyleType,
            position: getComputedStyle(element).listStylePosition, padding: parseFloat(getComputedStyle(element).paddingLeft),
            start: element.getAttribute('start'), reversed: element.hasAttribute('reversed'),
        })));
        const sourceLists = Object.values(fixture.guideParts).flatMap(part => part.lists);
        expect(lists.map(list => ({ tag: list.tag, start: list.start, reversed: list.reversed }))).toEqual(sourceLists.map(list => ({ tag: list.tag, start: list.start, reversed: list.reversed })));
        for (const list of lists) {
            expect(list.type).toBe(list.tag === 'ol' ? 'decimal' : 'disc');
            expect(list.position).toBe('outside');
            expect(list.padding).toBeCloseTo(22.4, 1);
        }
        await expect(root.locator('nav ul')).toHaveCSS('list-style-type', 'none');
        for (const display of await root.locator('main li').evaluateAll(items => items.map(item => getComputedStyle(item).display))) expect(display).toBe('list-item');
        const initial = await root.locator('.mermaid-wrap svg').evaluateAll(elements => elements.map(element => {
            const svg = element as SVGSVGElement;
            return { natural: svg.viewBox.baseVal.width, width: svg.getBoundingClientRect().width };
        }));
        for (const diagram of initial) expect(diagram.width).toBeGreaterThanOrEqual(diagram.natural - 2);
        const target = fixture.guideDesign.nav.find(item => item.id.startsWith('step-12-'));
        if (!target) throw new Error('Missing source navigation target');
        const toggle = root.getByRole('button', { name: 'メニュー' });
        if (width <= 980) { await toggle.click(); await expect(toggle).toHaveAttribute('aria-expanded', 'true'); }
        const link = root.locator(`nav a[href="#${target.id}"]`);
        await link.click();
        await expect.poll(() => decodeURIComponent(new URL(page.url()).hash)).toBe(`#${target.id}`);
        await expect(root.locator(`[id="${target.id}"]`)).toBeFocused();
        await expect(link).toHaveAttribute('aria-current', 'location');
        const offset = await page.evaluate(() => {
            const css = getComputedStyle(document.documentElement);
            return parseFloat(css.getPropertyValue('--header-h')) + parseFloat(css.getPropertyValue('--disclaimer-height') || '0');
        });
        await expect.poll(() => root.locator(`[id="${target.id}"]`).evaluate(el => el.getBoundingClientRect().top)).toBeGreaterThanOrEqual(offset);
        if (width <= 980) {
            await expect(toggle).toHaveAttribute('aria-expanded', 'false');
            await expect(root.locator('.sidebar')).toBeHidden();
        } else {
            expect(await root.locator('.sidebar').evaluate(el => el.getBoundingClientRect().top)).toBeGreaterThanOrEqual(offset);
            await expect(root.locator('.sidebar')).toHaveCSS('width', '300px');
        }
        const last = fixture.guideDesign.nav.at(-1);
        if (!last) throw new Error('Missing last navigation entry');
        await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
        await expect(root.locator(`nav a[href="#${last.id}"]`)).toHaveAttribute('aria-current', 'location');
        const widths = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
        expect(widths.scroll).toBeLessThanOrEqual(widths.client);
        const after = await root.locator('.mermaid-wrap svg').evaluateAll(elements => elements.map(el => el.getBoundingClientRect().width));
        expect(after).toEqual(initial.map(diagram => diagram.width));
        expect((await new AxeBuilder({ page }).include('.aip-guide-page').analyze()).violations).toEqual([]);
        expect(errors).toEqual([]);
    });
}

test('AIP-C01 homepage card and Header drawer route to implemented content', async ({ page }) => {
    await page.goto('/');
    const card = page.locator('article.card-aws-aip');
    await expect(card).toContainText('AIP-C01');
    await card.locator('a.home-card-cta').click();
    await expect(page).toHaveURL(new RegExp(`${route}$`));
    await page.getByRole('button', { name: 'メニューを開く' }).click();
    const drawer = page.getByRole('dialog', { name: 'サイトナビゲーション' });
    await drawer.locator('summary').filter({ hasText: 'AWS Certified Generative AI Developer' }).click();
    await expect(drawer.getByRole('link', { name: 'AIP-C01 初学者向け完全ガイド' })).toHaveAttribute('href', route);
});
