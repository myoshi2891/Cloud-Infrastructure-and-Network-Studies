import { test, expect } from '@playwright/test';

const pages = [
    { path: '/', scheme: 'dark', background: 'rgb(16, 19, 30)' },
    { path: '/aws/advanced-networking-specialty/domain1', scheme: 'light', background: 'rgb(241, 244, 249)' },
    { path: '/aws/ai-business-strategist', scheme: 'light', background: 'rgb(241, 244, 249)' },
    { path: '/recommended-books/tcpip-illustrated-vol1', scheme: 'light', background: 'rgb(241, 244, 249)' },
];

for (const width of [1440, 390]) {
    test(`共通フッターの配色・可読性・レイアウト ${width}px`, async ({ page }) => {
        test.setTimeout(180_000);
        await page.setViewportSize({ width, height: 900 });
        for (const entry of pages) {
            await page.goto(entry.path);
            const footer = page.getByRole('contentinfo');
            await expect(footer).toHaveCSS('color-scheme', entry.scheme);
            await expect(footer).toHaveCSS('background-color', entry.background);
            await expect(footer.getByRole('heading', { name: '免責事項' })).toBeVisible();
            const metrics = await footer.evaluate(el => {
                const css = getComputedStyle(el);
                const luminance = (color: string) => {
                    const rgb = color.match(/\d+/g)!.slice(0, 3).map(Number).map(n => {
                        const s = n / 255;
                        return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
                    });
                    return rgb[0]! * 0.2126 + rgb[1]! * 0.7152 + rgb[2]! * 0.0722;
                };
                const a = luminance(css.color), b = luminance(css.backgroundColor);
                return {
                    contrast: (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05),
                    overflow: el.scrollWidth > el.clientWidth,
                    textOverflow: [...el.querySelectorAll('p')].some(p => p.scrollWidth > p.clientWidth),
                };
            });
            expect(metrics.contrast).toBeGreaterThanOrEqual(4.5);
            expect(metrics.overflow).toBe(false);
            expect(metrics.textOverflow).toBe(false);
        }
        // Client navigation must clear the light palette without a document reload.
        await page.getByRole('navigation', { name: 'サイト全体のメインナビゲーション' }).getByRole('link', { name: 'Cloud Infrastructure Studies' }).click();
        await expect(page).toHaveURL('/');
        await expect(page.getByRole('contentinfo')).toHaveCSS('color-scheme', 'dark');
    });
}
