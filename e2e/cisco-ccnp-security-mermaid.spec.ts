import { expect, test, type Page } from '@playwright/test';

const TOTAL_DIAGRAMS = 53;
const JUMP_TARGET_ID = 'p4';
const SETTLE_MS = 5000;

/** ハイドレーション完了前の操作では目次の動作を検証できないため、React の接続を待つ */
const waitForHydration = (page: Page) => page.waitForFunction(() => {
    const button = document.getElementById('menuBtn');
    return button !== null && Object.keys(button).some((key) => key.startsWith('__reactProps'));
}, undefined, { polling: 500 });

const expectInUpperViewport = async (page: Page) => {
    const box = await page.locator(`[id="${JUMP_TARGET_ID}"]`).boundingBox();
    const viewport = page.viewportSize();
    if (!box || !viewport) throw new Error('見出しまたはビューポートを取得できません');
    expect(box.y).toBeGreaterThanOrEqual(0);
    expect(box.y).toBeLessThan(viewport.height / 2);
};

test.describe('CCNP Security — Mermaid 遅延描画', () => {
    test('初期表示では離れた図を描画せず、到達した図と全図を描画できる', async ({ page }) => {
        test.setTimeout(180000);

        // Arrange
        const pageErrors: string[] = [];
        page.on('pageerror', (error) => pageErrors.push(error.message));
        await page.goto('/cisco/ccnp-security');
        const diagrams = page.locator('[data-testid="mermaid-diagram"]');
        await expect(diagrams).toHaveCount(TOTAL_DIAGRAMS);
        const renderedSvgs = page.locator('[data-testid="mermaid-diagram"] .mermaid-target svg');
        const lastDiagram = diagrams.last();

        // Assert: 末尾の図はフォールバックのまま残る
        await expect(lastDiagram.locator('pre.codeblock')).toBeVisible();
        const initialCount = await renderedSvgs.count();
        expect(initialCount).toBeLessThan(TOTAL_DIAGRAMS);

        // Act: 末尾の図へ移動する
        await lastDiagram.scrollIntoViewIfNeeded();

        // Assert: 到達した図は SVG へ置き換わる
        await expect(lastDiagram.locator('.mermaid-target svg')).toBeVisible({ timeout: 30000 });
        await expect(lastDiagram.locator('pre.codeblock')).toHaveCount(0);

        // Act: 全図を順に通過する
        for (let index = 0; index < TOTAL_DIAGRAMS; index += 1) {
            await diagrams.nth(index).scrollIntoViewIfNeeded();
        }

        // Assert
        await expect(renderedSvgs).toHaveCount(TOTAL_DIAGRAMS, { timeout: 60000 });
        await expect(page.locator('[data-testid="mermaid-error"]')).toHaveCount(0);
        expect(pageErrors).toEqual([]);
    });

    test('目次の遠いリンクへ移動しても、周辺の図の展開後に見出しが画面内へ留まる', async ({ page }) => {
        test.setTimeout(120000);

        // Arrange
        await page.goto('/cisco/ccnp-security');
        await waitForHydration(page);

        // Act
        await page.locator(`#sidebar a[href="#${JUMP_TARGET_ID}"]`).click();
        await expect.poll(() => page.evaluate(() => location.hash)).toBe(`#${JUMP_TARGET_ID}`);
        await page.waitForTimeout(SETTLE_MS);

        // Assert
        await expectInUpperViewport(page);
    });
});
