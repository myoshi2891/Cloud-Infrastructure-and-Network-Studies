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
        await expect(page).toHaveURL('/', { timeout: 30_000 });
        await expect(page.getByRole('contentinfo')).toHaveCSS('color-scheme', 'dark');
    });
}

// Footer.module.css の明色ルール `:is(<ページルート>) ~ .footer` が前提とする DOM 構造
const lightPageRoots = [
    ['aib-guide-page', '/aws/ai-business-strategist'],
    ['aib-domain1-page', '/aws/ai-business-strategist/domain1'],
    ['aib-domain2-page', '/aws/ai-business-strategist/domain2'],
    ['aib-domain3-page', '/aws/ai-business-strategist/domain3'],
    ['aip-guide-page', '/aws/generative-ai-developer-professional'],
    ['aip-domain1-page', '/aws/generative-ai-developer-professional/domain1'],
    ['aip-domain2-page', '/aws/generative-ai-developer-professional/domain2'],
    ['aip-domain3-page', '/aws/generative-ai-developer-professional/domain3'],
    ['aip-domain4-page', '/aws/generative-ai-developer-professional/domain4'],
    ['aip-domain5-page', '/aws/generative-ai-developer-professional/domain5'],
    ['ans-domain1-page', '/aws/advanced-networking-specialty/domain1'],
    ['ans-domain2-page', '/aws/advanced-networking-specialty/domain2'],
    ['ans-domain3-page', '/aws/advanced-networking-specialty/domain3'],
    ['ans-domain4-page', '/aws/advanced-networking-specialty/domain4'],
    ['dva-development-page', '/aws/developer-associate/domain1'],
    ['dva-security-page', '/aws/developer-associate/domain2'],
    ['dva-deployment-page', '/aws/developer-associate/domain3'],
    ['sap-domain1-page', '/aws/solutions-architect-professional/domain1'],
    ['scs-guide-page', '/aws/security-specialty'],
    ['tcpip-page', '/recommended-books/tcpip-illustrated-vol1'],
    ['agentic-guide-page', '/gcl/professional-agentic-architect'],
    ['agentic-section1-page', '/gcl/professional-agentic-architect/section1'],
    ['agentic-section2-page', '/gcl/professional-agentic-architect/section2'],
    ['agentic-section3-page', '/gcl/professional-agentic-architect/section3'],
    ['agentic-section4-page', '/gcl/professional-agentic-architect/section4'],
    ['agentic-section5-page', '/gcl/professional-agentic-architect/section5'],
] as const;

test('明色ページのルートは body 直下で、共通フッターがその後続の兄弟になる', async ({ page }) => {
    test.setTimeout(300_000);
    // 配色と DOM 構造だけを検証するため、図の描画は読み込まない
    await page.route(/mermaid/, route => route.abort());
    for (const [rootClass, path] of lightPageRoots) {
        await page.goto(path);
        const structure = await page.evaluate(className => {
            const root = document.getElementsByClassName(className)[0];
            const footer = document.querySelector('body > footer');
            if (!root || !footer) return { found: false, rootIsBodyChild: false, footerFollowsRoot: false, scheme: '' };
            return {
                found: true,
                rootIsBodyChild: root.parentElement === document.body,
                footerFollowsRoot: footer.parentElement === document.body
                    && Boolean(root.compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING),
                scheme: getComputedStyle(footer).colorScheme,
            };
        }, rootClass);
        expect(structure, path).toEqual({ found: true, rootIsBodyChild: true, footerFollowsRoot: true, scheme: 'light' });
    }
    await page.goto('/gcl/associate-cloud-engineer');
    await expect(page.getByRole('contentinfo')).toHaveCSS('color-scheme', 'dark');
});

test('ページ末尾でも固定サイドバーがフッターより手前に表示される', async ({ page }) => {
    test.setTimeout(180_000);
    await page.setViewportSize({ width: 1440, height: 900 });
    for (const route of [
        { path: '/aws/generative-ai-developer-professional/', sidebar: '.aip-guide-page .sidebar' },
        { path: '/aws/advanced-networking-specialty/domain1', sidebar: '.ans-domain1-page .sidebar' },
        { path: '/aws/developer-associate/domain2', sidebar: '.dva-security-page .sidebar' },
    ]) {
    await page.goto(route.path);
    const footer = page.getByRole('contentinfo');
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeInViewport();
    const sidebar = page.locator(route.sidebar);
    await expect(sidebar).toBeVisible();
    const frontmost = await sidebar.evaluate(el => {
        const sidebarRect = el.getBoundingClientRect();
        const footerRect = document.querySelector('footer')!.getBoundingClientRect();
        const x = sidebarRect.left + sidebarRect.width / 2;
        const y = (Math.max(sidebarRect.top, footerRect.top) + Math.min(sidebarRect.bottom, footerRect.bottom)) / 2;
        if (y < footerRect.top || y > footerRect.bottom) throw new Error('重なり領域がないため重なり順を検証できません');
        return el.contains(document.elementFromPoint(x, y));
    });
    expect(frontmost, route.path).toBe(true);
    }
});
