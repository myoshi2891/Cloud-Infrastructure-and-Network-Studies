import { test, expect } from '@playwright/test';

/**
 * TCP/IP Illustrated Vol.1 ガイドの Mermaid 35 図が、原本 HTML
 * （theme: base・明色ノード・白カード・useMaxWidth:false）と同じ見え方で描画されることを検証する。
 */

type Rgb = [number, number, number];

const parseRgb = (value: string): Rgb | null => {
    const m = value.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/);
    return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
};
const luminance = ([r, g, b]: Rgb): number => {
    const ch = (c: number) => {
        const s = c / 255;
        return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b);
};
const contrast = (a: Rgb, b: Rgb): number => {
    const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
    return (hi + 0.05) / (lo + 0.05);
};

test('TCP/IP Illustrated: 全35図が原本どおりライトテーマ・自然倍率・判読可能な配色で描画される', async ({ page }) => {
    test.setTimeout(150_000);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    await page.goto('/recommended-books/tcpip-illustrated-vol1');

    const root = page.locator('.tcpip-page');
    const wraps = root.locator('.mermaid-wrap');
    await expect(wraps).toHaveCount(35);
    await expect(root.locator('.mermaid-wrap svg[aria-roledescription]')).toHaveCount(35, { timeout: 90_000 });
    await expect(root).not.toContainText('Syntax error in text');
    await expect(root.locator('[data-testid="mermaid-error"]')).toHaveCount(0);

    const facts = await wraps.evaluateAll((elements) => elements.map((wrap) => {
        const svg = wrap.querySelector('svg[aria-roledescription]') as SVGSVGElement;
        const inner = wrap.querySelector(':scope > [data-theme]') as HTMLElement;
        const textOf = (el: Element) => {
            const cs = getComputedStyle(el);
            return el instanceof SVGElement && !(el instanceof SVGForeignObjectElement) && el.tagName !== 'foreignObject'
                ? (el.tagName === 'text' || el.tagName === 'tspan' ? cs.fill : cs.color)
                : cs.color;
        };
        const nodes = [...svg.querySelectorAll('g.node')].map((node) => {
            const shape = node.querySelector('rect, polygon, path, circle') as SVGElement | null;
            const labelEl = (node.querySelector('.nodeLabel') || node.querySelector('text')) as HTMLElement | null;
            const colors = labelEl ? [getComputedStyle(labelEl).color || getComputedStyle(labelEl).fill] : [];
            return {
                fill: shape ? getComputedStyle(shape).fill : '',
                spanColor: labelEl ? getComputedStyle(labelEl).color : '',
                colors,
            };
        });
        const looseTexts = [...svg.querySelectorAll('text, tspan')]
            .filter((el) => !el.closest('g.node') && !el.closest('.edgeLabel') && !el.closest('.note') && (el.textContent ?? '').trim() && el.children.length === 0)
            .filter((el) => !el.closest('[class*="note"]'))
            .map((el) => getComputedStyle(el).fill);
        return {
            type: svg.getAttribute('aria-roledescription'),
            theme: inner?.dataset.theme,
            wrapBg: getComputedStyle(wrap).backgroundColor,
            innerBg: inner ? getComputedStyle(inner).backgroundColor : '',
            natural: svg.viewBox.baseVal.width,
            inlineWidth: parseFloat(svg.style.width),
            renderedWidth: svg.getBoundingClientRect().width,
            nodes,
            looseTexts,
        };
    }));

    expect(facts).toHaveLength(35);
    facts.forEach((f, i) => {
        // 原本 pre.mermaid: 白カード 1 枚（内側カードは透過）
        expect(f.theme, `diag-${i} theme`).toBe('light');
        expect(f.wrapBg, `diag-${i} card bg`).toBe('rgb(255, 255, 255)');
        expect(['rgba(0, 0, 0, 0)', 'transparent']).toContain(f.innerBg);
        // 自然倍率（useMaxWidth:false 相当）
        expect(Math.abs(f.inlineWidth - f.natural), `diag-${i} inline width`).toBeLessThan(2);
        expect(f.renderedWidth, `diag-${i} rendered width`).toBeGreaterThanOrEqual(f.natural - 2);

        for (const node of f.nodes) {
            const fill = parseRgb(node.fill);
            for (const color of node.colors) {
                const rgb = parseRgb(color);
                expect(rgb, `diag-${i} color parse ${color}`).not.toBeNull();
                // classDef の color がラベル子孫まで継承される
                if (node.spanColor) expect(color, `diag-${i} inherit`).toBe(node.spanColor);
                if (fill && luminance(fill) > 0.5) {
                    // 明色ノードに白文字を載せず、WCAG AA（4.5:1）以上のコントラストを保つ
                    expect(color, `diag-${i} white on light`).not.toBe('rgb(255, 255, 255)');
                    expect(contrast(rgb!, fill), `diag-${i} contrast ${color} on ${node.fill}`).toBeGreaterThanOrEqual(4.5);
                }
            }
        }
        for (const fillColor of f.looseTexts) {
            const rgb = parseRgb(fillColor);
            if (!rgb) continue;
            // 白カード上の図テキスト（シーケンス図アクター・メッセージ、状態遷移ラベル等）は暗色
            expect(contrast(rgb, [255, 255, 255]), `diag-${i} loose text ${fillColor}`).toBeGreaterThanOrEqual(4.5);
        }
    });

    // classDef 色の代表値（原本どおり）
    const colorsOf = (i: number) => facts[i]!.nodes.flatMap((n) => n.colors);
    expect(colorsOf(0)).toContain('rgb(23, 61, 122)'); // vol: #173d7a
    expect(colorsOf(27)).toContain('rgb(79, 93, 115)'); // acked: #4f5d73

    // 自然幅がカード幅を超える図はカード（フォーカス可能な region）自体が横スクロールする
    const wide = wraps.nth(3);
    const [scrollW, clientW] = await wide.evaluate((el) => [el.scrollWidth, el.clientWidth]);
    expect(scrollW).toBeGreaterThan(clientW);
    await wide.focus();
    await page.keyboard.press('ArrowRight');
    await expect.poll(() => wide.evaluate((el) => el.scrollLeft)).toBeGreaterThan(0);

    expect(errors).toEqual([]);
});
