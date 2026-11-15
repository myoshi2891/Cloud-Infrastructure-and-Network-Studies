import { test, expect } from '@playwright/test';
import design from '../docs/migration-inventory/devnet-expert.design.json';

test('DevNet Expert: 全図・リストの点・連番・目次操作', async ({ page }) => {
    test.setTimeout(180000);
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    await page.goto('/cisco/devnet-expert');
    const root = page.locator('.devnet-expert-page');
    const palette = await root.evaluate(el => ({ background: getComputedStyle(el).backgroundColor, text: getComputedStyle(el).color, scheme: getComputedStyle(el).colorScheme }));
    expect(palette).toEqual({ background: 'rgb(246, 247, 249)', text: 'rgb(22, 27, 38)', scheme: 'light' });
    expect(await root.locator('h1').evaluate(el => getComputedStyle(el).fontFamily)).toContain('Source Serif 4');
    const codeStyles = await root.locator('.code-block').evaluateAll(elements => elements.map(el => ({ padding: getComputedStyle(el).padding, font: getComputedStyle(el).fontFamily, overflow: getComputedStyle(el).overflowX })));
    expect(codeStyles).toHaveLength(44);
    codeStyles.forEach(s => { expect(s.padding).toBe('16px'); expect(s.font).toContain('JetBrains Mono'); expect(s.overflow).toBe('auto'); });
    await expect(root.locator('.diagram svg')).toHaveCount(23, { timeout: 120000 });
    const diagramPalette = await root.locator('.diagram').first().evaluate(el => {
        const wrapper = el.querySelector('[role="img"]')!;
        const node = el.querySelector('.node rect')!;
        const label = el.querySelector('.nodeLabel')!;
        return { background: getComputedStyle(el).backgroundColor, wrapper: getComputedStyle(wrapper).backgroundColor, node: getComputedStyle(node).fill, text: getComputedStyle(label).color };
    });
    expect(diagramPalette).toEqual({ background: 'rgb(255, 255, 255)', wrapper: 'rgba(0, 0, 0, 0)', node: 'rgb(238, 241, 248)', text: 'rgb(22, 27, 38)' });
    await expect(root).not.toContainText('Diagram error');
    await page.evaluate(() => document.fonts.ready);
    const checkDimensions = async () => {
        const metrics = await root.locator('.diagram svg').evaluateAll(elements => elements.map(svg => {
            const box = svg.getBoundingClientRect();
            const vb = svg.getAttribute('viewBox')?.split(/\s+/).map(Number);
            return { width: box.width, natural: vb?.[2], height: box.height, maxHeight: getComputedStyle(svg).maxHeight };
        }));
        expect(metrics).toHaveLength(23);
        metrics.forEach(m => { expect(m.width).toBeGreaterThan(0); expect(m.width).toBeCloseTo(m.natural ?? 0, 0); expect(m.height).toBeGreaterThan(0); expect(m.maxHeight).toBe('none'); });
        return metrics;
    };
    const baseline = await checkDimensions();
    const waitForScroll = () => page.evaluate(() => new Promise<void>((resolve, reject) => {
        const started = performance.now();
        let stableSince = started;
        let x = scrollX;
        let y = scrollY;
        const sample = (now: number) => {
            if (scrollX !== x || scrollY !== y) { x = scrollX; y = scrollY; stableSince = now; }
            if (now - stableSince >= 200) resolve();
            else if (now - started > 10000) reject(new Error('Scrolling did not settle'));
            else requestAnimationFrame(sample);
        };
        requestAnimationFrame(sample);
    }));
    const bullets = await root.locator('main ul > li').evaluateAll(items => items.map(item => {
        const s = getComputedStyle(item, '::before');
        return { content: s.content, width: s.width, padding: getComputedStyle(item).paddingLeft };
    }));
    expect(bullets).toHaveLength(105);
    bullets.forEach(b => { expect(b.content).toBe('""'); expect(b.width).toBe('7px'); expect(b.padding).toBe('22px'); });
    await expect(root.locator('.check-item')).toHaveCount(8);
    await expect(root.locator('.ref-num')).toHaveText(Array.from({ length: 32 }, (_, i) => String(i + 1)));
    const monitor = await root.evaluateHandle((el, baseline) => {
        const state = { stopped: false, failures: [] as string[] };
        const sample = () => {
            if (state.stopped) return;
            const diagrams = [...el.querySelectorAll('.diagram svg')];
            if (diagrams.length !== baseline.length) state.failures.push(`Diagram count changed to ${diagrams.length}`);
            diagrams.forEach((svg, index) => {
                const box = svg.getBoundingClientRect();
                const original = baseline[index];
                const style = getComputedStyle(svg);
                if (!original || Math.abs(box.width - original.width) >= 0.5 || Math.abs(box.height - original.height) >= 0.5 || style.maxHeight !== 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) {
                    state.failures.push(`Diagram ${index + 1} changed size or disappeared during scrolling`);
                }
            });
            if (!state.failures.length) requestAnimationFrame(sample);
        };
        requestAnimationFrame(sample);
        return state;
    }, baseline);
    expect(design.nav).toHaveLength(62);
    for (const item of design.nav) {
        await root.locator(`nav a[href="#${item.id}"]`).click();
        await expect(page).toHaveURL(new RegExp(`#${item.id}$`));
        await expect(root.locator(`#${item.id}`)).toBeFocused();
        await expect(root.locator(`nav a[href="#${item.id}"]`)).toHaveAttribute('aria-current', 'location');
        await waitForScroll();
        await checkDimensions();
    }
    const previousY = await page.evaluate(() => scrollY);
    await page.mouse.move(1000, 400);
    await page.mouse.wheel(0, -Math.max(844, previousY / 2));
    await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(previousY);
    await waitForScroll();
    await checkDimensions();
    expect(await monitor.evaluate(state => { state.stopped = true; return state.failures; })).toEqual([]);
    await monitor.dispose();
    expect(errors).toEqual([]);
});

for (const width of [390, 1024]) {
    test(`DevNet Expert: ${width}px 目次・チェック操作・横はみ出し`, async ({ page }) => {
        test.setTimeout(180000);
        await page.setViewportSize({ width, height: 844 });
        await page.goto('/cisco/devnet-expert');
        const root = page.locator('.devnet-expert-page');
        const toggle = root.getByRole('button', { name: '目次' });
        await expect(toggle).toHaveAttribute('aria-expanded', 'false');
        await toggle.click();
        await expect(toggle).toHaveAttribute('aria-expanded', 'true');
        await root.locator('nav a[href="#s-3"]').click();
        await expect(toggle).toHaveAttribute('aria-expanded', 'false');
        const target = root.locator('#s-3');
        await expect(target).toBeFocused();
        await expect(root.locator('nav a[href="#s-3"]')).toHaveAttribute('aria-current', 'location');
        await expect.poll(() => target.evaluate(el => Math.abs(el.getBoundingClientRect().top - parseFloat(getComputedStyle(el).scrollMarginTop)))).toBeLessThan(2);
        const check = root.getByRole('checkbox').first();
        await check.check();
        await expect(check).toBeChecked();
        expect(await root.locator('.checklist').evaluate(el => getComputedStyle(el).counterReset)).toBe('chk 0');
        await expect(root.locator('.diagram svg')).toHaveCount(23, { timeout: 120000 });
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    });
}
