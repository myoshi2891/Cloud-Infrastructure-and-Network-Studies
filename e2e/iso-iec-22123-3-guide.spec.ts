import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import sourceA11y from '../docs/migration-inventory/iso-iec-22123-3-2023.a11y.json';

const route = '/standards/iso-iec-22123-3-2023';

test('20 SVGの自然寸法、リスト装飾、余白、全導線、アクセシビリティ', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    await page.goto(route);
    await expect(page.locator('h1')).toHaveText('ISO/IEC 22123-3:2023 初学者向け完全ガイド');
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('.mermaid-diagram svg')).toHaveCount(20);
    for (const diagram of await page.locator('.mermaid-diagram svg').all()) {
        const size = await diagram.evaluate(svg => ({ width: svg.getBoundingClientRect().width, height: svg.getBoundingClientRect().height, originalWidth: Number(svg.getAttribute('width')), originalHeight: Number(svg.getAttribute('height')) }));
        expect(Math.abs(size.width - size.originalWidth)).toBeLessThan(1);
        expect(Math.abs(size.height - size.originalHeight)).toBeLessThan(1);
    }
    const regions = page.locator('.mermaid-diagram');
    await expect(regions).toHaveCount(20);
    await regions.first().focus();
    await page.keyboard.press('ArrowRight');
    await expect.poll(() => regions.first().evaluate(element => element.scrollLeft)).toBeGreaterThan(0);
    const lists = page.locator('main ul');
    await expect(lists).toHaveCount(5);
    for (const list of await lists.all()) {
        await expect(list).toHaveCSS('list-style-type', 'disc');
        await expect(list).toHaveCSS('padding-left', '25.6px');
        await expect(list).toHaveCSS('margin-bottom', '14px');
    }
    await expect(page.locator('.sec p').first()).toHaveCSS('margin-bottom', '14px');
    await expect(page.locator('main th').first()).toHaveCSS('background-color', 'rgb(17, 36, 64)');
    await expect(page.locator('main th').first()).toHaveCSS('color', 'rgb(255, 255, 255)');
    const links = page.locator('.sidebar a');
    await expect(links).toHaveCount(45);
    for (const link of await links.all()) {
        await link.click();
        const target = (await link.getAttribute('href'))!.slice(1);
        expect(await page.evaluate(() => document.activeElement?.id)).toBe(target);
        expect(decodeURIComponent(new URL(page.url()).hash.slice(1))).toBe(target);
        await expect(link).toHaveAttribute('aria-current', 'location');
    }
    await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
    await expect(links.last()).toHaveAttribute('aria-current', 'location');
    // 原本でも再現した装飾由来の1件だけを固定し、図の名前不足や新規の指摘を通さない。
    const findings = (await new AxeBuilder({ page }).analyze()).violations.map(({ id, nodes }) => ({ id, nodes: nodes.map(node => node.html) }));
    expect(findings).toEqual(sourceA11y.retainedSourceFindings);
    expect(errors).toEqual([]);
});

for (const width of [960, 768, 390]) {
    test(`${width}pxで目次開閉・Escape・hash/focus・固定ヘッダー遮蔽・横はみ出しを検証`, async ({ page }) => {
        await page.setViewportSize({ width, height: 844 });
        await page.goto(route);
        const sidebar = page.locator('.iso-22123-3-page .sidebar');
        const toggle = page.getByRole('button', { name: '目次を開閉' });
        await expect(sidebar).toBeHidden();
        await toggle.click();
        await expect(sidebar).toBeVisible();
        await toggle.click();
        await expect(sidebar).toBeHidden();
        await toggle.click();
        await expect(sidebar).toBeVisible();
        await page.keyboard.press('Escape');
        await expect(sidebar).toBeHidden();
        await expect(toggle).toBeFocused();
        await toggle.click();
        await sidebar.locator('a').first().click();
        await expect(sidebar).toBeHidden();
        await expect(page.locator('h2').first()).toBeFocused();
        const sizes = await page.locator('h2').first().evaluate(heading => ({ y: heading.getBoundingClientRect().top, offset: parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) + parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--disclaimer-height') || '0'), scrollWidth: document.documentElement.scrollWidth, width: innerWidth }));
        expect(sizes.y).toBeGreaterThanOrEqual(sizes.offset);
        expect(sizes.scrollWidth).toBeLessThanOrEqual(sizes.width);
        await expect(page.locator('.mermaid-diagram').first()).toHaveAttribute('tabindex', '0');
    });
}
