import { readFileSync } from 'node:fs';
import postcss from 'postcss';
import { describe, expect, it } from 'vitest';

const variables: Record<string, string> = {};
postcss.parse(readFileSync('app/globals.css', 'utf8')).walkDecls((d) => {
    variables[d.prop] = d.value;
});
const source = postcss.parse(readFileSync('app/aws/solutions-architect-professional/domain1/page.css', 'utf8'));

const color = (selector: string) => {
    let value = '';
    source.walkRules((r) => {
        if (r.selector === selector) {
            r.walkDecls((d) => {
                if (d.prop === 'color') value = d.value;
            });
        }
    });
    return value.replace(/var\((--[\w-]+)\)/g, (_, k: string) => variables[k] ?? '');
};

function luminance(hex: string) {
    const numbers = hex
        .slice(1)
        .match(/../g)!
        .map((n) => parseInt(n, 16) / 255)
        .map((n) => (n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4));
    return 0.2126 * numbers[0]! + 0.7152 * numbers[1]! + 0.0722 * numbers[2]!;
}

describe('SAP-C02 Domain 1 Color Contrast (WCAG AA)', () => {
    it.each([
        ['.sap-domain1-page .main code:not(.code-block code)', '#f2efe6'],
        ['.sap-domain1-page .callout-practice .label', '#e6f4ec'],
        ['.sap-domain1-page .quiz-answer[open] summary', '#e6f4ec'],
        ['.sap-domain1-page .tok-key', '#fbfaf6'],
        ['.sap-domain1-page .tok-str', '#fbfaf6'],
        ['.sap-domain1-page .tok-pun', '#fbfaf6'],
    ])('keeps %s above AA (4.5:1) on its source background %s', (selector, bg) => {
        const text = color(selector);
        expect(text).toMatch(/^#[\da-f]{6}$/i);
        const ratio =
            (Math.max(luminance(text), luminance(bg)) + 0.05) / (Math.min(luminance(text), luminance(bg)) + 0.05);
        expect(ratio).toBeGreaterThanOrEqual(4.5);
    });
});
