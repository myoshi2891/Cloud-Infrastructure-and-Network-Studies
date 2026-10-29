import { fireEvent, render, within } from '@testing-library/react';
import { expect, it } from 'vitest';
import { Section26 } from '@/app/aws/developer-associate/domain4/sections/Section26';
import rawOriginal from '@/docs/migration-inventory/aws-dva-domain4-appendix-a.text.json';
import { withDvaDomain4Corrections } from '@/__tests__/helpers/dva-domain4-source-corrections';

const original = withDvaDomain4Corrections(rawOriginal);

it('13問の各選択肢から、その場で原本の正解と解説を確認できる', () => {
    const {container}=render(<Section26/>);
    const cards=[...container.querySelectorAll('article.practice-question')];
    expect(cards).toHaveLength(13);
    cards.forEach((card,index) => {
        const correct=original.cells[3+index*3+1]!.split(',').map(letter=>letter.trim());
        const options=[...card.querySelectorAll<HTMLInputElement>('input')];
        expect(options).toHaveLength(index===10?5:4);
        expect(card.querySelector('[role="status"]')).toBeNull();
        correct.forEach(letter=>fireEvent.click(options[letter.charCodeAt(0)-65]!));
        expect(card).toHaveAttribute('data-result','correct');
        expect(within(card as HTMLElement).getByRole('status').textContent).toContain(original.cells[3+index*3+2]);
        expect(within(card as HTMLElement).getByRole('status').textContent).toContain(original.cells[3+index*3+1]);
    });
});
it('単一選択の誤答と変更を判定し、他の設問へ影響しない', () => {
    const {container}=render(<Section26/>);
    const cards=container.querySelectorAll('article');
    const options=cards[0]!.querySelectorAll<HTMLInputElement>('input');
    fireEvent.click(options[0]!);
    expect(cards[0]).toHaveAttribute('data-result','incorrect');
    expect(options[0]).toHaveAttribute('aria-invalid','true');
    expect(cards[0]!.querySelector('[role="status"]')?.textContent).toContain('正解 B');
    expect(cards[1]!.querySelector('[role="status"]')).toBeNull();
    fireEvent.click(options[1]!);
    expect(cards[0]).toHaveAttribute('data-result','correct');
    expect(options[0]).not.toBeChecked();
    expect(options[1]).toBeChecked();
});
it('問11は2つ以上選んだ際に集合の完全一致で判定し、解除にも追従する', () => {
    const {container}=render(<Section26/>);
    const card=container.querySelectorAll('article')[10]!;
    const options=[...card.querySelectorAll<HTMLInputElement>('input')];
    expect(options.every(option=>option.type==='checkbox')).toBe(true);
    fireEvent.click(options[0]!);
    expect(card.querySelector('[role="status"]')).toBeNull();
    fireEvent.click(options[2]!);
    expect(card).toHaveAttribute('data-result','incorrect');
    fireEvent.click(options[2]!);fireEvent.click(options[1]!);
    expect(card).toHaveAttribute('data-result','correct');
    fireEvent.click(options[4]!);
    expect(card).toHaveAttribute('data-result','incorrect');
    fireEvent.click(options[4]!);fireEvent.click(options[1]!);
    expect(card.querySelector('[role="status"]')).toBeNull();
});
it('各設問の選択肢群は設問見出しを名前に持つグループとして読み上げられる', () => {
    const {container}=render(<Section26/>);
    const cards=[...container.querySelectorAll('article.practice-question')];
    cards.forEach((card,index) => {
        const group=card.querySelector('ul');
        expect(group).toHaveAttribute('role','group');
        expect(group).toHaveAttribute('aria-labelledby','practice-question-'+(index+1));
        expect(container.querySelector('#practice-question-'+(index+1))).not.toBeNull();
    });
});
it('採点結果の正誤を status 領域の文言として読み上げ、回答変更にも追従する', () => {
    const {container}=render(<Section26/>);
    const card=container.querySelector('article.practice-question') as HTMLElement;
    const options=card.querySelectorAll<HTMLInputElement>('input');
    fireEvent.click(options[0]!);
    expect(within(card).getByRole('status').querySelector('.practice-result')?.textContent).toBe('不正解です');
    fireEvent.click(options[1]!);
    const status=within(card).getByRole('status');
    expect(status.querySelector('.practice-result')?.textContent).toBe('正解です');
    expect(status.textContent).toContain('正解 B');
});
