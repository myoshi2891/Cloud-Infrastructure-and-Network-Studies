import { test, expect } from '@playwright/test';
import design from '../docs/migration-inventory/devnet-expert.design.json';

test('DevNet Expert: 全図・リストの点・連番・目次操作', async ({ page }) => {
    test.setTimeout(180000);
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    await page.goto('/cisco/devnet-expert');
    const root = page.locator('.devnet-expert-page');
    expect(await root.locator('h1').evaluate(el => getComputedStyle(el).fontFamily)).toContain('Source Serif 4');
    const codeStyles = await root.locator('.code-block').evaluateAll(elements => elements.map(el => ({ padding: getComputedStyle(el).padding, font: getComputedStyle(el).fontFamily, overflow: getComputedStyle(el).overflowX })));
    expect(codeStyles).toHaveLength(43);
    codeStyles.forEach(s => { expect(s.padding).toBe('16px'); expect(s.font).toContain('JetBrains Mono'); expect(s.overflow).toBe('auto'); });
    await expect(root.locator('.diagram svg')).toHaveCount(23, { timeout: 120000 });
    await expect(root).not.toContainText('Diagram error');
    const metrics = await root.locator('.diagram svg').evaluateAll(elements => elements.map(svg => {
        const box = svg.getBoundingClientRect();
        const vb = svg.getAttribute('viewBox')?.split(/\s+/).map(Number);
        return { width: box.width, natural: vb?.[2], height: box.height, maxHeight: getComputedStyle(svg).maxHeight };
    }));
    metrics.forEach(m => { expect(m.width).toBeGreaterThan(0); expect(m.width).toBeCloseTo(m.natural ?? 0, 0); expect(m.height).toBeGreaterThan(0); expect(m.maxHeight).toBe('none'); });
    const bullets = await root.locator('main ul > li').evaluateAll(items => items.map(item => {
        const s = getComputedStyle(item, '::before');
        return { content: s.content, width: s.width, padding: getComputedStyle(item).paddingLeft };
    }));
    expect(bullets).toHaveLength(105);
    bullets.forEach(b => { expect(b.content).toBe('""'); expect(b.width).toBe('7px'); expect(b.padding).toBe('22px'); });
    await expect(root.locator('.check-item')).toHaveCount(8);
    await expect(root.locator('.ref-num')).toHaveText(Array.from({ length: 32 }, (_, i) => String(i + 1)));
    for (const item of design.nav) {
        await root.locator(`nav a[href="#${item.id}"]`).click();
        await expect(page).toHaveURL(new RegExp(`#${item.id}$`));
        await expect(root.locator(`#${item.id}`)).toBeFocused();
        await expect(root.locator(`nav a[href="#${item.id}"]`)).toHaveAttribute('aria-current', 'location');
    }
    expect(errors).toEqual([]);
});

test('DevNet Expert: モバイル目次・チェック操作・横はみ出し', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/cisco/devnet-expert');
    const root = page.locator('.devnet-expert-page');
    const toggle = root.getByRole('button', { name: '目次' });
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await root.locator('nav a[href="#s-10-4"]').click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    const check = root.getByRole('checkbox').first();
    await check.check();
    await expect(check).toBeChecked();
    expect(await root.locator('.checklist').evaluate(el => getComputedStyle(el).counterReset)).toBe('chk 0');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
