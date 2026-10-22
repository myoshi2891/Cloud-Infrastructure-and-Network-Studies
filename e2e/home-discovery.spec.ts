import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const width of [390, 768, 1440]) {
    test(`ホームとメニューの探索・読みやすさ・操作性 ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 1000 });
        const pageErrors: string[] = [];
        page.on('pageerror', (error) => pageErrors.push(error.message));
        await page.goto('/');
        const catalog = page.locator('#catalog');
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
        const titleMetrics = await page.getByRole('heading', { level: 1 }).evaluate((element) => ({
            height: element.getBoundingClientRect().height, fontSize: parseFloat(getComputedStyle(element).fontSize),
        }));
        expect(titleMetrics.height).toBeLessThanOrEqual(titleMetrics.fontSize * 2.7);
        await page.screenshot({ path: `/tmp/home-hero-${width}.png` });
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
        await catalog.getByRole('button', { name: /^Amazon Web Services/ }).click();
        await expect(catalog.getByRole('heading', { name: 'Google Cloud', exact: true })).toHaveCount(0);
        await catalog.getByRole('searchbox').fill('no-such-guide');
        await expect(catalog.getByRole('article')).toHaveCount(0);
        await catalog.getByRole('button', { name: '検索条件をリセット' }).click();
        const card = catalog.getByRole('article').first();
        await card.locator('summary').click();
        const domain = card.locator('.home-domain-link').first();
        expect(await domain.evaluate((element) => parseFloat(getComputedStyle(element.querySelector('span')!).fontSize))).toBeGreaterThanOrEqual(14);
        expect((await domain.boundingBox())!.height).toBeGreaterThanOrEqual(44);
        await page.screenshot({ path: `/tmp/home-catalog-${width}.png` });
        await page.getByRole('button', { name: 'メニューを開く' }).click();
        const dialog = page.getByRole('dialog');
        await expect(dialog).toBeVisible();
        await dialog.locator('aside').evaluate((element) => Promise.all(element.getAnimations().map((animation) => animation.finished)));
        await expect(dialog.getByRole('button', { name: 'メニューを閉じる' })).toBeFocused();
        const closeBounds = await dialog.getByRole('button', { name: 'メニューを閉じる' }).boundingBox();
        expect(closeBounds!.width).toBeGreaterThanOrEqual(44);
        expect(closeBounds!.height).toBeGreaterThanOrEqual(44);
        expect(await dialog.locator('summary').first().evaluate((element) => parseFloat(getComputedStyle(element).paddingLeft))).toBeGreaterThanOrEqual(16);
        await dialog.getByRole('button', { name: /^Amazon Web Services/ }).click();
        await expect(dialog.getByRole('heading', { name: 'Google Cloud', exact: true })).toHaveCount(0);
        await dialog.getByRole('searchbox').fill('セキュア');
        await expect(dialog.getByRole('link', { name: /ドメイン1: セキュア/ })).toBeVisible();
        await dialog.getByRole('searchbox').focus();
        await page.keyboard.press('Tab');
        await expect(dialog.getByRole('button', { name: /^すべて/ })).toBeFocused();
        const violations = (await new AxeBuilder({ page }).include('#site-nav-drawer').analyze()).violations;
        expect(violations).toEqual([]);
        await page.screenshot({ path: `/tmp/global-menu-${width}.png` });
        await page.keyboard.press('Escape');
        await expect(dialog).toBeHidden();
        await expect(page.getByRole('button', { name: 'メニューを開く' })).toBeFocused();
        expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
        expect(pageErrors).toEqual([]);
    });
}
