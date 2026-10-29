import { fireEvent, render } from '@testing-library/react';
import { expect, it } from 'vitest';
import { NavBar } from '@/app/aws/developer-associate/domain4/NavBar';

it('目次が閉じているときの Escape はフォーカスを目次ボタンへ移さない', () => {
    const { container } = render(<><input aria-label="本文の入力" /><NavBar /></>);
    const input = container.querySelector('input')!;
    input.focus();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(document.activeElement).toBe(input);
});

it('目次が開いているときの Escape は閉じて目次ボタンへフォーカスを戻す', () => {
    const { container } = render(<NavBar />);
    const toggle = container.querySelector<HTMLButtonElement>('.menu-btn')!;
    fireEvent.click(toggle);
    container.querySelector<HTMLAnchorElement>('nav a')!.focus();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(document.activeElement).toBe(toggle);
});
