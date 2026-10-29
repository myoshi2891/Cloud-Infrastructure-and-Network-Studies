import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import postcss from 'postcss';
import { expect, test } from '@playwright/test';
import rawOriginal from '../docs/migration-inventory/aws-dva-domain4-appendix-a.text.json';
import { withDvaDomain4Corrections } from '../__tests__/helpers/dva-domain4-source-corrections';

const original = withDvaDomain4Corrections(rawOriginal);

const tokens: string[] = [];
postcss.parse(fs.readFileSync('app/globals.css','utf8')).walkAtRules('theme', rule => {
    rule.walkDecls(decl => { tokens.push(decl.toString()); });
});
const css = ':root {'+tokens.join(';')+'} body{margin:0} *{box-sizing:border-box;margin:0;padding:0}'+fs.readFileSync('app/aws/developer-associate/domain4/page.css','utf8')+fs.readFileSync('app/aws/developer-associate/domain4/practice.css','utf8');
const markup = execFileSync('bun',['-e', `
import {renderToStaticMarkup} from 'react-dom/server';
import {Section26} from './app/aws/developer-associate/domain4/sections/Section26.tsx';
console.log(renderToStaticMarkup(Section26()));
`],{encoding:'utf8'}).trimEnd();
for(const width of [1440,768,390]) test(`付録A ${width}px: 文言固定・カード余白・選択肢と解答表の収まり`, async ({page}) => {
    await page.setViewportSize({width,height:1000});
    await page.setContent(`<style>${css}</style><div class="dva-troubleshooting-page"><main>${markup}</main></div>`);
    expect(await page.locator('#app-a').textContent()).toBe(original.text);
    const cards = page.locator('article.practice-question');
    await expect(cards).toHaveCount(13);
    const metrics = await cards.evaluateAll(elements => elements.map(el => {
        const bounds=el.getBoundingClientRect();
        return {background:getComputedStyle(el).backgroundColor,padding:parseFloat(getComputedStyle(el).paddingLeft),options:[...el.querySelectorAll('li')].map(li => {const box=li.getBoundingClientRect();return {left:box.left-bounds.left,right:bounds.right-box.right,height:box.height};})};
    }));
    for(const card of metrics) {
        expect(card.background).toBe('rgb(255, 255, 255)');
        expect(card.padding).toBeGreaterThanOrEqual(16);
        for(const option of card.options) {expect(option.left).toBeGreaterThanOrEqual(16);expect(option.right).toBeGreaterThanOrEqual(16);expect(option.height).toBeGreaterThanOrEqual(48);}
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    const table = await page.locator('.practice-answers table').boundingBox();
    const panel = await page.locator('.practice-answers').boundingBox();
    expect(table!.width).toBeLessThanOrEqual(panel!.width);
    await expect(page.locator('.practice-answers tbody tr')).toHaveCount(13);
});
