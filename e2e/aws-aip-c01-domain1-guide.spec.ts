import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import inventory from '../docs/migration-inventory/aws-aip-c01-domain1-guide.json';
import fixture from '../docs/migration-inventory/aws-aip-c01-domain1-guide.fidelity.json';

const route = '/aws/generative-ai-developer-professional/domain1';
for (const width of [1440, 768, 390]) {
    test(`AIP domain1 ${width}px: complete light content, source diagrams, navigation and checklist`, async ({ page }) => {
        test.setTimeout(180_000);
        await page.setViewportSize({ width, height: 1000 });
        await page.emulateMedia({ reducedMotion: 'reduce' });
        const errors: string[] = [];
        page.on('pageerror', error => errors.push(error.message));
        page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
        await page.goto(route);
        const root = page.locator('.aip-domain1-page');
        await expect(root).toHaveCSS('color-scheme', 'light');
        await expect(root).toHaveCSS('background-color', 'rgb(246, 248, 252)');
        await expect(root).toHaveCSS('color', 'rgb(28, 42, 63)');
        await expect(root.locator('.sidebar')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
        await expect(root.locator('thead th').first()).toHaveCSS('background-color', 'rgb(232, 238, 252)');
        for (const tag of ['h1','h2','h3','h4','th','td'] as const) {
            const texts = await root.locator(tag).allTextContents();
            expect(texts.map(text => text.replace(/\s+/g, ' ').trim())).toEqual(inventory[tag].map(text => text.replace(/\s+/g, ' ').trim()));
        }
        await expect(root.locator('main li')).toHaveCount(137);
        await expect(root.locator('table')).toHaveCount(51);
        expect(await root.locator('main a[href^="http"]').evaluateAll(links => links.map(link => link.getAttribute('href')))).toEqual(inventory.links.map(link => link.href));
        const lists = await root.locator('main ul,main ol').evaluateAll(elements => elements.map(element => ({ tag: element.tagName.toLowerCase(), start: element.getAttribute('start'), reversed: element.hasAttribute('reversed'), type: getComputedStyle(element).listStyleType, padding: parseFloat(getComputedStyle(element).paddingLeft), checklist: Boolean(element.closest('.checklist-card')) })));
        expect(lists.map(({ tag, start, reversed }) => ({ tag, start, reversed }))).toEqual(Object.values(fixture.guideParts).flatMap(part => part.lists).map(({ tag, start, reversed }) => ({ tag, start, reversed })));
        for (const list of lists) {
            expect(list.type).toBe(list.checklist ? 'none' : list.tag === 'ol' ? 'decimal' : 'disc');
            expect(list.padding).toBeCloseTo(list.checklist ? 0 : 22.4, 1);
        }
        await expect(root.locator('nav ul')).toHaveCSS('list-style-type', 'none');
        expect(await root.locator('main li').evaluateAll(items => items.map(item => getComputedStyle(item).display))).toEqual(await root.locator('main li').evaluateAll(items => items.map(item => item.closest('.checklist-card') ? 'flex' : 'list-item')));
        const diagrams = root.locator('.mermaid-wrap svg');
        await expect(diagrams).toHaveCount(21, { timeout: 120_000 });
        await expect(root.locator('.mermaid-wrap [data-theme="light"]')).toHaveCount(21);
        await expect(root).not.toContainText('Syntax error');
        const sizes = await diagrams.evaluateAll(elements => elements.map(element => ({ natural: (element as SVGSVGElement).viewBox.baseVal.width, width: element.getBoundingClientRect().width })));
        for (const size of sizes) expect(size.width).toBeGreaterThanOrEqual(size.natural - 2);
        const labels = await diagrams.locator('.nodeLabel').evaluateAll(elements => elements.map(element => ({ text: element.textContent?.trim(), color: getComputedStyle(element).color })));
        expect(labels.every(label => Boolean(label.text) && label.color !== 'rgb(255, 255, 255)')).toBe(true);
        const target = fixture.guideDesign.nav.find(item => item.id.startsWith('skill-144-'));
        if (!target) throw new Error('Missing original navigation item');
        const toggle = root.getByRole('button', { name: 'メニュー' });
        if (width <= 980) await toggle.click();
        const link = root.locator(`nav a[href="#${target.id}"]`);
        await link.click();
        await expect.poll(() => decodeURIComponent(new URL(page.url()).hash)).toBe(`#${target.id}`);
        await expect(root.locator(`[id="${target.id}"]`)).toBeFocused();
        await expect(link).toHaveAttribute('aria-current', 'location');
        const offset = await page.evaluate(() => { const css = getComputedStyle(document.documentElement); return parseFloat(css.getPropertyValue('--header-h')) + parseFloat(css.getPropertyValue('--disclaimer-height') || '0'); });
        await expect.poll(() => root.locator(`[id="${target.id}"]`).evaluate(element => element.getBoundingClientRect().top)).toBeGreaterThanOrEqual(offset);
        if (width <= 980) { await expect(toggle).toHaveAttribute('aria-expanded', 'false'); await expect(root.locator('.sidebar')).toBeHidden(); }
        else { await expect(root.locator('.sidebar')).toHaveCSS('width', '300px'); expect(await root.locator('.sidebar').evaluate(element => element.getBoundingClientRect().top)).toBeGreaterThanOrEqual(offset); }
        const checks = root.getByRole('checkbox');
        await expect(checks).toHaveCount(16);
        for (let index = 0; index < 16; index++) {
            await checks.nth(index).check();
            await expect(root.locator('.count')).toHaveText(`${index + 1} / 16 完了`);
        }
        await expect(root.locator('label[for="chk1"]')).toHaveCSS('text-decoration-line', 'line-through');
        expect((await new AxeBuilder({ page }).include('.aip-domain1-page').analyze()).violations).toEqual([]);
        for (let index = 0; index < 16; index++) await checks.nth(index).uncheck();
        await expect(root.locator('.count')).toHaveText('0 / 16 完了');
        await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
        const last = fixture.guideDesign.nav.at(-1)!;
        await expect(root.locator(`nav a[href="#${last.id}"]`)).toHaveAttribute('aria-current', 'location');
        expect(await diagrams.evaluateAll(elements => elements.map(element => element.getBoundingClientRect().width))).toEqual(sizes.map(size => size.width));
        const widths = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
        expect(widths.scroll).toBeLessThanOrEqual(widths.client);
        expect((await new AxeBuilder({ page }).include('.aip-domain1-page').analyze()).violations).toEqual([]);
        expect(errors).toEqual([]);
    });
}

test('AIP domain1 home and real Header navigate to detail route', async ({ page }) => {
    await page.goto('/');
    await page.locator(`article.card-aws-aip a[href="${route}"]`).click();
    await expect(page).toHaveURL(new RegExp(`${route}$`));
    await page.getByRole('button', { name: 'メニューを開く' }).click();
    const drawer = page.getByRole('dialog', { name: 'サイトナビゲーション' });
    const summary = drawer.locator('summary').filter({ hasText: 'AWS Certified Generative AI Developer' });
    if (!(await summary.evaluate(element => element.parentElement?.hasAttribute('open')))) await summary.click();
    await drawer.getByRole('link', { name: 'ドメイン1: FM統合・データ管理・コンプライアンス' }).click();
    await expect(page).toHaveURL(new RegExp(`${route}$`));
});

test('AIP domain1 gates reject missing dots, numbers, indent and source light palette', async ({ page }) => {
    await page.goto(route);
    for (const [selector, property, expected, broken] of [
        ['main ul:not(.checklist-card ul)', 'list-style-type', 'disc', 'none'],
        ['main ol', 'list-style-type', 'decimal', 'none'],
        ['main ol', 'padding-left', '22.4px', '0px'],
        ['main ol li', 'display', 'list-item', 'block'],
        ['.main', 'color', 'rgb(28, 42, 63)', 'rgb(255, 255, 255)'],
    ]) {
        const element = page.locator(`.aip-domain1-page ${selector}`).first();
        await expect(element).toHaveCSS(property!, expected!);
        await element.evaluate((node, mutation) => (node as HTMLElement).style.setProperty(mutation.property!, mutation.broken!), { property, broken });
        try { await expect(async () => { await expect(element).toHaveCSS(property!, expected!, { timeout: 100 }); }).rejects.toThrow(); }
        finally { await element.evaluate((node, name) => (node as HTMLElement).style.removeProperty(name!), property); }
        await expect(element).toHaveCSS(property!, expected!);
    }
});
