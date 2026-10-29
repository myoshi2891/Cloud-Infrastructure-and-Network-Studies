import fs from 'node:fs';
import { render } from '@testing-library/react';
import { expect, it } from 'vitest';
import postcss from 'postcss';
import { Section26 } from '@/app/aws/developer-associate/domain4/sections/Section26';
import rawOriginal from '@/docs/migration-inventory/aws-dva-domain4-appendix-a.text.json';
import { withDvaDomain4Corrections } from '@/__tests__/helpers/dva-domain4-source-corrections';

const original = withDvaDomain4Corrections(rawOriginal);

it('付録Aの全文を空白・句読点・コード・リンクまで変更しない', () => {
    const {container} = render(<Section26/>);
    expect(container.querySelector('section')?.textContent).toBe(original.text);
    for(const [selector,texts] of [['p',original.paragraphs],['li',original.options],['th,td',original.cells]] as const) {
        expect([...container.querySelectorAll(selector)].map(el=>el.textContent)).toEqual(texts);
    }
    expect([...container.querySelectorAll('a')].map(el=>({text:el.textContent,href:el.getAttribute('href')}))).toEqual(original.links);
});
it('13問を見出し付きカードとして分け、選択肢と対応付ける', () => {
    const {container} = render(<Section26/>);
    const cards = [...container.querySelectorAll('article.practice-question')];
    expect(cards).toHaveLength(13);
    cards.forEach((card,index) => {
        const id = 'practice-question-'+(index+1);
        expect(card).toHaveAttribute('aria-labelledby',id);
        expect(card.querySelector('p')).toHaveAttribute('id',id);
        expect(card.querySelector('p strong')?.textContent).toBe('問 '+(index+1)+'.');
        expect(card.querySelectorAll('ul')).toHaveLength(1);
        expect(card.querySelectorAll('li')).toHaveLength(index === 10 ? 5 : 4);
    });
    expect(container.querySelector('.practice-answers table thead')).not.toBeNull();
    expect(container.querySelectorAll('.practice-answers tbody tr')).toHaveLength(13);
});
it('付録A内に限定したカード・選択肢・解答表の装飾を持つ', () => {
    const css=fs.readFileSync('app/aws/developer-associate/domain4/practice.css','utf8');
    for(const selector of ['#app-a .practice-question','#app-a .practice-question > ul > li','#app-a .practice-answers']) expect(css).toContain(selector);
    postcss.parse(css).walkRules(rule => { expect(rule.selector).toContain('.dva-troubleshooting-page #app-a'); });
});
