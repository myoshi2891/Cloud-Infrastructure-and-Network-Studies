import { expect, test } from '@playwright/test';
import fixture from '../docs/migration-inventory/aws-ans-c01-guide.fidelity.json';
import { withSourceCorrections } from '../__tests__/helpers/aip-source-corrections';
import { ANS_GUIDE_CORRECTIONS } from '../__tests__/helpers/aws-guide-source-corrections';

const expected = Object.values(withSourceCorrections(fixture.guideParts, ANS_GUIDE_CORRECTIONS)).flatMap(part => part.codes);

for (const width of [1440, 768, 390]) {
    test(`ANS-C01 ${width}px: all code lines stay on one visual row and copy intact`, async ({ page }) => {
        await page.setViewportSize({ width, height: 1000 });
        await page.goto('/aws/advanced-networking-specialty');
        const blocks = page.locator('.ans-guide-page .code-block');
        await expect(blocks).toHaveCount(14);
        const actual = await blocks.evaluateAll(elements => elements.map(block => ({
            renderedText: (block as HTMLElement).innerText.replace(/\n+$/, ''),
            lines: [...block.querySelectorAll<HTMLElement>(':scope > .code-line')].map(line => {
                // Text-node ranges expose wrapping inside a code element as well as block-level token splitting.
                const tops: number[] = [];
                const walker = document.createTreeWalker(line, NodeFilter.SHOW_TEXT);
                while (walker.nextNode()) {
                    if (!walker.currentNode.textContent?.trim()) continue;
                    const range = document.createRange();
                    range.selectNodeContents(walker.currentNode);
                    tops.push(...[...range.getClientRects()].map(rect => Math.round(rect.top)));
                }
                return { text: line.textContent, visualRows: new Set(tops).size, height: line.getBoundingClientRect().height };
            }),
        })));
        actual.forEach((block, index) => {
            expect(block.renderedText, `block ${index + 1}: copy text`).toBe(expected[index]!.join('\n'));
            expect(block.lines.map(line => line.text)).toEqual(expected[index]);
            block.lines.forEach((line, lineIndex) => {
                expect(line.visualRows, `block ${index + 1}, line ${lineIndex + 1}`).toBe(line.text?.trim() ? 1 : 0);
                expect(line.height).toBeGreaterThan(0);
            });
        });
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    });
}
