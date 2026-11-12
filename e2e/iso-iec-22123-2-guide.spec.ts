import { test, expect } from '@playwright/test';

const route = '/standards/iso-iec-22123-2-2023';

test('14 SVG自然寸法、リスト装飾、チェック・クイズの全操作', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    await page.goto(route);
    await expect(page.locator('h1')).toHaveText('ISO/IEC 22123-2:2023 初学者向け解説ガイド');
    await page.evaluate(() => document.fonts.ready);
    const diagrams = page.locator('.mermaid-diagram svg');
    await expect(diagrams).toHaveCount(14);
    for (const svg of await diagrams.all()) {
        const size = await svg.evaluate(el => ({ width: el.getBoundingClientRect().width, expected: Number(el.getAttribute('width')) }));
        expect(Math.abs(size.width - size.expected)).toBeLessThan(1);
    }
    const markers = await page.locator('main ul, main ol').evaluateAll(lists => lists.map(list => ({ tag: list.tagName, type: getComputedStyle(list).listStyleType, padding: parseFloat(getComputedStyle(list).paddingLeft) })));
    expect(markers.length).toBeGreaterThan(0);
    for (const marker of markers) {
        expect(marker.type).toBe(marker.tag === 'OL' ? 'decimal' : 'disc');
        expect(marker.padding).toBeGreaterThan(0);
    }
    const checklist = page.locator('.checklist-card');
    for (const label of await checklist.locator('.cl-item').all()) await label.click();
    await expect(checklist.locator('.cl-count')).toHaveText('9 / 9');
    await expect(checklist.locator('.cl-done')).toBeVisible();
    await checklist.getByRole('button', { name: 'リセット' }).click();
    await expect(checklist.locator('.cl-count')).toHaveText('0 / 9');
    const quiz = page.locator('.quiz-wrap');
    await quiz.getByRole('button', { name: '答えをすべて開く' }).click();
    await expect(quiz.locator('details[open]')).toHaveCount(10);
    for (const box of await quiz.getByRole('checkbox').all()) await box.check();
    await expect(quiz.locator('.q-count')).toHaveText('10 / 10 理解できた');
    await expect(quiz.locator('.known')).toHaveCount(10);
    await quiz.getByRole('button', { name: 'リセット' }).click();
    await expect(quiz.locator('details[open]')).toHaveCount(0);
    await expect(quiz.locator('.known')).toHaveCount(0);
    await expect(quiz.locator('.q-count')).toHaveText('0 / 10 理解できた');
    expect(errors).toEqual([]);
});

test('390pxで目次の開閉・hash/focus・Escapeと横はみ出しを検証する', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route);
    const sidebar = page.locator('.iso-22123-2-page .sidebar');
    const toggle = page.getByRole('button', { name: '目次を開く' });
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
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const top = await page.locator('h2').first().boundingBox();
    expect(top!.y).toBeGreaterThanOrEqual(60);
});
