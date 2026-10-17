import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import sourceInventory from '../docs/migration-inventory/aws-aip-c01-domain2-guide.json';
import { AIP_DOMAIN2_CORRECTIONS, withSourceCorrections } from '../__tests__/helpers/aip-source-corrections';
import fixture from '../docs/migration-inventory/aws-aip-c01-domain2-guide.fidelity.json';

const inventory = withSourceCorrections(sourceInventory, AIP_DOMAIN2_CORRECTIONS);
const route = '/aws/generative-ai-developer-professional/domain2';
for (const width of [1440, 768, 390]) {
    test(`AIP domain2 ${width}px: complete light content, source diagrams, navigation and answers`, async ({ page }) => {
        test.setTimeout(180_000);
        await page.setViewportSize({ width, height: 1000 });
        await page.emulateMedia({ reducedMotion: 'reduce' });
        const errors: string[] = [];
        page.on('pageerror', error => errors.push(error.message));
        page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
        await page.goto(route);
        const root = page.locator('.aip-domain2-page');
        await expect(root).toHaveCSS('color-scheme', 'light');
        await expect(root).toHaveCSS('background-color', 'rgb(246, 248, 252)');
        await expect(root).toHaveCSS('color', 'rgb(28, 42, 64)');
        await expect(root.locator('.sidebar')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
        await expect(root.locator('thead th').first()).toHaveCSS('background-color', 'rgb(232, 238, 255)');
        for (const tag of ['h1','h2','h3','h4','th','td'] as const) {
            const texts = await root.locator(tag).allTextContents();
            expect(texts.map(text => text.replace(/\s+/g, ' ').trim())).toEqual(inventory[tag].map(text => text.replace(/\s+/g, ' ').trim()));
        }
        await expect(root.locator('main li')).toHaveCount(296);
        await expect(root.locator('table')).toHaveCount(96);
        expect(await root.locator('main a[href^="http"]').evaluateAll(links => links.map(link => link.getAttribute('href')))).toEqual(inventory.links.map(link => link.href));
        const lists = await root.locator('main ul,main ol').evaluateAll(elements => elements.map(element => ({ tag: element.tagName.toLowerCase(), start: element.getAttribute('start'), reversed: element.hasAttribute('reversed'), type: getComputedStyle(element).listStyleType, position: getComputedStyle(element).listStylePosition, padding: parseFloat(getComputedStyle(element).paddingLeft), checklist: Boolean(element.closest('.checklist-card')), practice:element.classList.contains('practice-options') })));
        expect(lists.map(({ tag, start, reversed }) => ({ tag, start, reversed }))).toEqual(Object.values(fixture.guideParts).flatMap(part => part.lists).map(({ tag, start, reversed }) => ({ tag, start, reversed })));
        for (const list of lists) {
            expect(list.type).toBe(list.checklist || list.practice ? 'none' : list.tag === 'ol' ? 'decimal' : 'disc');
            expect(list.position).toBe('outside');
            expect(list.padding).toBeCloseTo(list.checklist || list.practice ? 0 : 22.4, 1);
        }
        await expect(root.locator('nav ul')).toHaveCSS('list-style-type', 'none');
        expect(await root.locator('main li').evaluateAll(items => items.map(item => getComputedStyle(item).display))).toEqual(await root.locator('main li').evaluateAll(items => items.map(item => item.closest('.practice-options') ? 'block' : item.closest('.checklist-card') ? 'flex' : 'list-item')));
        const diagrams = root.locator('.mermaid-wrap svg');
        await expect(diagrams).toHaveCount(42, { timeout: 120_000 });
        await expect(root.locator('.mermaid-wrap [data-theme="light"]')).toHaveCount(42);
        await expect(root).not.toContainText('Syntax error');
        const sizes = await diagrams.evaluateAll(elements => elements.map(element => ({ natural: (element as SVGSVGElement).viewBox.baseVal.width, width: element.getBoundingClientRect().width })));
        for (const size of sizes) expect(size.width).toBeGreaterThanOrEqual(size.natural - 2);
        const labels = await diagrams.locator('.nodeLabel').evaluateAll(elements => elements.map(element => ({ text: element.textContent?.trim(), color: getComputedStyle(element).color, fontSize: getComputedStyle(element).fontSize })));
        const sourceColors = [fixture.guideInteractions.mermaidConfig.themeVariables.primaryTextColor, ...Object.values(fixture.guideParts).flatMap(part => part.diagrams).flatMap(chart => [...chart.matchAll(/color:\s*(#[\da-f]{6})/gi)].map(match => match[1]!))];
        const palette = new Set(sourceColors.map(hex => `rgb(${parseInt(hex.slice(1, 3), 16)}, ${parseInt(hex.slice(3, 5), 16)}, ${parseInt(hex.slice(5, 7), 16)})`));
        expect(labels).not.toHaveLength(0);
        for (const label of labels) {
            expect(label.text).toBeTruthy();
            expect(palette.has(label.color), `${label.text}: ${label.color}`).toBe(true);
            expect(label.fontSize).toBe(fixture.guideInteractions.mermaidConfig.themeVariables.fontSize);
        }
        const target = fixture.guideDesign.nav.find(item => item.id.startsWith('step-14-skill-233'));
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
        const details = root.locator('main details');
        await expect(details).toHaveCount(15);
        for (const detail of await details.all()) {
            await detail.locator('summary').click();
            await expect(detail).toHaveAttribute('open','');
            await detail.locator('summary').click();
            await expect(detail).not.toHaveAttribute('open','');
        }
        await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
        const last = fixture.guideDesign.nav.at(-1)!;
        await expect(root.locator(`nav a[href="#${last.id}"]`)).toHaveAttribute('aria-current', 'location');
        expect(await diagrams.evaluateAll(elements => elements.map(element => element.getBoundingClientRect().width))).toEqual(sizes.map(size => size.width));
        const widths = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
        expect(widths.scroll).toBeLessThanOrEqual(widths.client);
        expect((await new AxeBuilder({ page }).include('.aip-domain2-page').analyze()).violations).toEqual([]);
        expect(errors).toEqual([]);
    });
}

test('AIP domain2 home and real Header navigate to detail route', async ({ page }) => {
    await page.goto('/');
    const card = page.locator('article.card-aws-aip');
    await card.locator('summary').click();
    await card.locator(`a[href="${route}"]`).click();
    await expect(page).toHaveURL(new RegExp(`${route}$`));
    await page.getByRole('button', { name: 'メニューを開く' }).click();
    const drawer = page.getByRole('dialog', { name: 'サイトナビゲーション' });
    const summary = drawer.locator('summary').filter({ hasText: 'AWS Certified Generative AI Developer' });
    if (!(await summary.evaluate(element => element.parentElement?.hasAttribute('open')))) await summary.click();
    await drawer.getByRole('link', { name: 'ドメイン2: 実装と統合' }).click();
    await expect(page).toHaveURL(new RegExp(`${route}$`));
});

test('AIP domain2 gates reject missing dots, numbers, indent and source light palette', async ({ page }) => {
    await page.goto(route);
    for (const [selector, property, expected, broken] of [
        ['main ul:not(.checklist-card ul)', 'list-style-type', 'disc', 'none'],
        ['main ol', 'list-style-type', 'decimal', 'none'],
        ['main ol', 'padding-left', '22.4px', '0px'],
        ['main ol li', 'display', 'list-item', 'block'],
        ['.main', 'color', 'rgb(28, 42, 64)', 'rgb(255, 255, 255)'],
    ]) {
        const element = page.locator(`.aip-domain2-page ${selector}`).first();
        await expect(element).toHaveCSS(property!, expected!);
        await element.evaluate((node, mutation) => (node as HTMLElement).style.setProperty(mutation.property!, mutation.broken!), { property, broken });
        try { await expect(async () => { await expect(element).toHaveCSS(property!, expected!, { timeout: 100 }); }).rejects.toThrow(); }
        finally { await element.evaluate((node, name) => (node as HTMLElement).style.removeProperty(name!), property); }
        await expect(element).toHaveCSS(property!, expected!);
    }
});

test('AIP domain2 all 42 diagrams keep their drawn content inside the SVG viewBox', async ({ page }) => {
    await page.goto(route);
    const diagrams = page.locator('.aip-domain2-page .mermaid-wrap svg');
    await expect(diagrams).toHaveCount(inventory.counts.diagram, { timeout: 120_000 });
    const boxes = await diagrams.evaluateAll(elements => elements.map(element => {
        const svg = element as SVGSVGElement;
        const box = svg.getBBox();
        const view = svg.viewBox.baseVal;
        return { id: svg.id, x: box.x, y: box.y, right: box.x + box.width, bottom: box.y + box.height,
            left: view.x, top: view.y, viewRight: view.x + view.width, viewBottom: view.y + view.height };
    }));
    for (const box of boxes) {
        expect(box.x, box.id).toBeGreaterThanOrEqual(box.left - 2);
        expect(box.y, box.id).toBeGreaterThanOrEqual(box.top - 2);
        expect(box.right, box.id).toBeLessThanOrEqual(box.viewRight + 2);
        expect(box.bottom, box.id).toBeLessThanOrEqual(box.viewBottom + 2);
    }
});

test('AIP domain2 node backgrounds remain light across flowcharts, states and sequence actors', async ({ page }) => {
    await page.goto(route);
    const diagrams = page.locator('.aip-domain2-page .mermaid-wrap svg');
    await expect(diagrams).toHaveCount(42, { timeout: 120_000 });
    const shapes = await diagrams.locator('.node rect, .node polygon, rect.actor').evaluateAll(elements => elements.map(element => getComputedStyle(element).fill));
    expect(shapes.length).toBeGreaterThan(42);
    for (const fill of shapes) expect(fill).toBe('rgb(232, 238, 255)');
    const labels = await diagrams.locator('.nodeLabel, text.actor tspan, .noteText, .messageText').evaluateAll(elements => elements.map(element => {
        const css = getComputedStyle(element);
        return element.namespaceURI === 'http://www.w3.org/2000/svg' ? css.fill : css.color;
    }));
    expect(labels.length).toBeGreaterThan(42);
    for (const color of labels) expect(color).toBe('rgb(28, 42, 64)');
    // 固定した背景・文字の組はWCAGの相対輝度式でも検証し、文字色だけの検査に戻さない。
    const luminance = (rgb: number[]) => rgb.map(value => value / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4).reduce((sum, value, index) => sum + value * [ .2126, .7152, .0722 ][index]!, 0);
    expect((luminance([232,238,255]) + .05) / (luminance([28,42,64]) + .05)).toBeGreaterThanOrEqual(4.5);
});

test('AIP domain2 uses one section divider, highlighted code and 15 polished accessible practice cards', async ({ page }) => {
    for (const width of [1440, 768, 390]) {
        await page.setViewportSize({ width, height: 1000 });
        await page.goto(route);
        const root = page.locator('.aip-domain2-page');
        const headings = await root.locator('main h2').evaluateAll(elements => elements.map(e => getComputedStyle(e).borderTopWidth));
        expect(headings.every(width => width === '0px')).toBe(true);
        const redundantRules = root.locator('main h2 + hr');
        await expect(redundantRules).toHaveCount(5);
        for (const rule of await redundantRules.all()) await expect(rule).toBeHidden();
        const code = root.locator('.code-block');
        await expect(code).toHaveCount(9);
        for (const block of await code.all()) {
            if(await block.getAttribute('data-language')==='logs-insights') await expect(block.locator('.hljs-keyword').first()).toHaveCSS('color','rgb(122, 62, 157)');
            else await expect(block.locator('.hljs-string').first()).toHaveCSS('color', 'rgb(31, 105, 55)');
            expect(await block.locator('.code-line').evaluateAll(lines=>lines.every(l=>getComputedStyle(l).whiteSpace==='pre'))).toBe(true);
        }
        const cards = root.locator('.practice-question');
        await expect(cards).toHaveCount(15);
        for (const card of await cards.all()) {
            await expect(card).toHaveCSS('border-radius', '16px');
            await card.locator('summary').click();
            await expect(card.locator('details')).toHaveAttribute('open', '');
            await card.locator('summary').click();
        }
        expect((await new AxeBuilder({page}).include('.aip-domain2-page').analyze()).violations).toEqual([]);
        expect(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth)).toBe(true);
    }
});

test('AIP domain2 practice choices hide bullets and judge exact answers accessibly',async({page})=>{
 await page.setViewportSize({width:390,height:1000});await page.goto(route);const cards=page.locator('.practice-question');await expect(cards).toHaveCount(15);
 for(const list of await cards.locator('.practice-options').all()){await expect(list).toHaveCSS('list-style-type','none');await expect(list).toHaveCSS('padding-left','0px');}
 const first=cards.nth(0);await first.getByRole('radio').nth(0).check();await expect(first.getByRole('status')).toHaveCount(0);await first.locator('summary').click();await expect(first.getByRole('status')).toContainText('不正解です。');await first.getByRole('radio').nth(1).check();await expect(first.getByRole('status')).toHaveText('正解です。');
 const multi=cards.nth(2);await multi.getByRole('checkbox').nth(0).check();await multi.locator('summary').click();await expect(multi.getByRole('status')).toContainText('不正解です。');await multi.getByRole('checkbox').nth(3).check();await expect(multi.getByRole('status')).toHaveText('正解です。');await multi.getByRole('checkbox').nth(1).check();await expect(multi.getByRole('status')).toContainText('不正解です。');
 const empty=cards.nth(1);await empty.locator('summary').click();await expect(empty.getByRole('status')).toContainText('未回答です。');
 await first.getByRole('radio').nth(0).focus();await page.keyboard.press('ArrowDown');await expect(first.getByRole('radio').nth(1)).toBeFocused();await expect(first.getByRole('radio').nth(1)).toBeChecked();
 expect((await new AxeBuilder({page}).include('.aip-domain2-page').analyze()).violations).toEqual([]);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth)).toBe(true);
});
