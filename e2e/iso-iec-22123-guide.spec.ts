import { test, expect } from '@playwright/test';

const route = '/standards/iso-iec-22123-1-2023';

test('原本15 SVGの自然寸法・目次移動・全チェック進捗を保持する', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(route);
    await expect(page.locator('.hero-title')).toContainText('ISO/IEC 22123-1:2023');
    await page.evaluate(() => document.fonts.ready);
    const diagrams = page.locator('.mermaid-diagram svg');
    await expect(diagrams).toHaveCount(15);
    for (const diagram of await diagrams.all()) {
        const sizes = await diagram.evaluate(svg => ({ actual: svg.getBoundingClientRect().width, original: Number(svg.getAttribute('width')) }));
        expect(Math.abs(sizes.actual - sizes.original)).toBeLessThan(1);
    }
    const firstRegion = page.locator('.mermaid-diagram').first();
    await firstRegion.focus();
    await firstRegion.evaluate(el => {
        el.setAttribute('data-scrolling', 'true');
        el.addEventListener('scrollend', () => el.removeAttribute('data-scrolling'), { once: true });
    });
    await page.keyboard.press('ArrowRight');
    await expect.poll(() => firstRegion.evaluate(el => el.scrollLeft)).toBeGreaterThan(0);
    await expect(firstRegion).not.toHaveAttribute('data-scrolling', 'true');
    await page.locator('.sidebar a[href="#理解度チェック"]').click();
    const heading = page.locator('h2#理解度チェック');
    await expect(heading).toBeInViewport();
    await expect.poll(async () => (await heading.boundingBox())?.y ?? -1).toBeGreaterThanOrEqual(60);
    const boxes = page.getByRole('checkbox');
    await expect(boxes).toHaveCount(10);
    for (const box of await boxes.all()) await box.check();
    await expect(page.locator('.cp-count')).toHaveText('10 / 10');
    await expect.poll(() => page.locator('.checklist-progress').evaluate(el => Math.abs(
        el.querySelector('.cp-fill')!.getBoundingClientRect().width - el.querySelector('.cp-bar')!.getBoundingClientRect().width,
    ))).toBeLessThan(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(errors).toEqual([]);
});

test('モバイルの目次を開閉でき、閉じた目次がキーボードと支援技術から隠れる', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route);
    const sidebar = page.locator('.iso-22123-page .sidebar');
    const toggle = page.getByRole('button', { name: '目次を開閉' });
    await expect(sidebar).toBeHidden();
    await expect(page.getByRole('navigation', { name: '目次', exact: true })).toHaveCount(0);
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(sidebar).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(sidebar).toBeHidden();
    await expect(toggle).toBeFocused();
    await toggle.click();
    await sidebar.locator('a').first().click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(sidebar).toBeHidden();
    await expect(page.locator('h2').first()).toBeFocused();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
