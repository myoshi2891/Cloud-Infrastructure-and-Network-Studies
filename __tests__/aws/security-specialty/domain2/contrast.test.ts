import { readFileSync } from 'node:fs';
import postcss from 'postcss';
import { expect, it } from 'vitest';

const variables: Record<string, string> = {};
postcss.parse(readFileSync('app/globals.css', 'utf8')).walkDecls((d) => {
    variables[d.prop] = d.value;
});
const source = postcss.parse(readFileSync('app/aws/security-specialty/domain2/page.css', 'utf8'));

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
    const n = hex
        .slice(1)
        .match(/../g)!
        .map((x) => parseInt(x, 16) / 255)
        .map((x) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
    return 0.2126 * n[0]! + 0.7152 * n[1]! + 0.0722 * n[2]!;
}

it.each([
    ['.scs-domain2-page .main code:not(.code-block code)', '#eef2fa'],
    ['.scs-domain2-page .callout-practice .label', '#e5f6ec'],
    ['.scs-domain2-page .practice-label', '#f6f8fc'],
    ['.scs-domain2-page .practice-label', '#ffffff'],
    ['.scs-domain2-page .checklist-card li:has(input:checked) label', '#ffffff'],
    ['.scs-domain2-page .quiz-feedback', '#e5f6ec'],
    ['.scs-domain2-page .quiz-feedback', '#fde8ec'],
    ['.scs-domain2-page .quiz-feedback', '#fff2dd'],
    ['.scs-domain2-page [data-state="correct"] > .quiz-mark', '#ffffff'],
    ['.scs-domain2-page [data-state="incorrect"] > .quiz-mark', '#ffffff'],
])('keeps %s at AA contrast on the original background', (selector, bg) => {
    const text = color(selector);
    expect(text).toMatch(/^#[\da-f]{6}$/i);
    expect((Math.max(luminance(text), luminance(bg)) + 0.05) / (Math.min(luminance(text), luminance(bg)) + 0.05)).toBeGreaterThanOrEqual(4.5);
});
