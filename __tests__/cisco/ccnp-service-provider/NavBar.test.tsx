import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { NavBar } from '@/app/cisco/ccnp-service-provider/NavBar';

describe('CCNP Service Provider 目次の自動スクロール', () => {
    it.each([
        ['下方のリンク', 750, 550],
        ['上方のリンク', 150, 0],
        ['表示範囲内のリンク', 350, 100],
    ])('%sをnavの座標で判定する', (_label, anchorTop, expectedScroll) => {
        const { container } = render(<NavBar isOpen={false} onClose={vi.fn()} onToggle={vi.fn()} />);
        const nav = container.querySelector('.nav') as HTMLElement;
        const link = nav.querySelector('li:last-child a') as HTMLAnchorElement;
        nav.scrollTop = 100;
        Object.defineProperty(nav, 'clientHeight', { value: 300 });
        // liがoffset parentの場合、リンク自身のoffsetTopは常に0になりうる。
        Object.defineProperty(link, 'offsetTop', { value: 0 });
        vi.spyOn(nav, 'getBoundingClientRect').mockReturnValue({ top: 200 } as DOMRect);
        vi.spyOn(link, 'getBoundingClientRect').mockReturnValue({ top: anchorTop } as DOMRect);

        fireEvent.click(link);

        expect(nav.scrollTop).toBe(expectedScroll);
        expect(link).toHaveAttribute('aria-current', 'location');
        expect(container.querySelectorAll('a.active')).toHaveLength(1);
    });
});

describe('CCNP Service Provider 目次のEscape操作', () => {
    it.each([
        ['目次リンク', '.nav li:first-child a'],
        ['背景ボタン', '.sidebar-backdrop'],
    ])('開いた目次は%sにフォーカスがあってもEscapeで閉じ、開閉ボタンへフォーカスを戻す', (_label, selector) => {
        const onClose = vi.fn();
        const { container } = render(<NavBar isOpen onClose={onClose} onToggle={vi.fn()} />);
        const focused = container.querySelector(selector) as HTMLElement;
        focused.focus();

        fireEvent.keyDown(focused, { key: 'Escape' });

        expect(onClose).toHaveBeenCalledOnce();
        expect(container.querySelector('.sidebar-toggle')).toHaveFocus();
    });

    it('閉じた目次ではEscapeでonCloseを呼ばない', () => {
        const onClose = vi.fn();
        const { container } = render(<NavBar isOpen={false} onClose={onClose} onToggle={vi.fn()} />);

        fireEvent.keyDown(container.querySelector('.nav a') as HTMLElement, { key: 'Escape' });

        expect(onClose).not.toHaveBeenCalled();
    });
});
