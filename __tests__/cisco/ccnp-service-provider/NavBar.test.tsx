import { act, fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { NavBar } from '@/app/cisco/ccnp-service-provider/NavBar';

describe('CCNP Service Provider 現在地', () => {
    it.each([['', 's1'], ['#unknown', 's1'], ['#s3', 's3']])('初期フラグメント %s から有効な現在地 %s を選ぶ', (hash, expected) => {
        const originalUrl = window.location.href;
        window.history.replaceState(null, '', window.location.pathname + hash);
        try {
            const { container, rerender } = render(<NavBar isOpen={false} onClose={vi.fn()} onToggle={vi.fn()} />);
            expect(container.querySelector('a.active')).toHaveAttribute('href', `#${expected}`);
            expect(container.querySelector('a[aria-current="location"]')).toHaveAttribute('href', `#${expected}`);
            rerender(<NavBar isOpen onClose={vi.fn()} onToggle={vi.fn()} />);
            expect(container.querySelectorAll('a.active')).toHaveLength(1);
            expect(container.querySelector('a.active')).toHaveAttribute('href', `#${expected}`);
        } finally {
            window.history.replaceState(null, '', originalUrl);
        }
    });

    it('s3が退出してs2が交差したままの逆スクロールでs2へ戻る', () => {
        let notify: IntersectionObserverCallback;
        const observer = { observe: vi.fn(), disconnect: vi.fn() };
        vi.stubGlobal('IntersectionObserver', vi.fn(function (callback: IntersectionObserverCallback) {
            notify = callback;
            return observer;
        }));
        try {
            // NAV_ITEMS順と異なるDOM順でも文書順で判定する。
            const { container, rerender } = render(<>
                <NavBar isOpen={false} onClose={vi.fn()} onToggle={vi.fn()} />
                <section id="s3" /><section id="s2" />
            </>);
            const update = (states: [string, boolean][]) => act(() => notify(
                states.map(([id, isIntersecting]) => ({ target: container.querySelector(`#${id}`)!, isIntersecting }) as IntersectionObserverEntry),
                observer as unknown as IntersectionObserver,
            ));
            update([['s2', true], ['s3', true]]);
            expect(container.querySelector('a.active')).toHaveAttribute('href', '#s3');
            update([['s3', false]]);
            expect(container.querySelector('a.active')).toHaveAttribute('href', '#s2');
            expect(container.querySelector('a[aria-current="location"]')).toHaveAttribute('href', '#s2');
            rerender(<>
                <NavBar isOpen onClose={vi.fn()} onToggle={vi.fn()} />
                <section id="s3" /><section id="s2" />
            </>);
            update([['s2', false]]);
            expect(container.querySelector('a.active')).toHaveAttribute('href', '#s2');
        } finally {
            vi.unstubAllGlobals();
        }
    });
});

describe('CCNP Service Provider scroll spyの監視範囲', () => {
    it('横長画面でも正の高さで監視し、リサイズで再監視して終了時に解除する', () => {
        const observers: { observe: ReturnType<typeof vi.fn>; disconnect: ReturnType<typeof vi.fn> }[] = [];
        const createObserver = vi.fn(function () {
            const observer = { observe: vi.fn(), disconnect: vi.fn() };
            observers.push(observer);
            return observer;
        });
        vi.stubGlobal('IntersectionObserver', createObserver);
        vi.stubGlobal('innerWidth', 1440);
        vi.stubGlobal('innerHeight', 390);
        const removeListener = vi.spyOn(window, 'removeEventListener');
        try {
            const { unmount } = render(<>
                <NavBar isOpen={false} onClose={vi.fn()} onToggle={vi.fn()} />
                <section id="s1">移動先</section>
            </>);
            const expectRegion = (height: number) => {
                const options = (createObserver.mock.calls.at(-1) as unknown as [unknown, IntersectionObserverInit])[1];
                const margins = options.rootMargin!.split(' ');
                expect(margins.every(margin => margin.endsWith('px'))).toBe(true);
                expect(parseFloat(margins[0]!)).toBeCloseTo(-height * 0.2);
                expect(parseFloat(margins[2]!)).toBeCloseTo(-height * 0.7);
                expect(height + parseFloat(margins[0]!) + parseFloat(margins[2]!)).toBeGreaterThan(0);
            };
            expectRegion(390);
            expect(observers[0]!.observe).toHaveBeenCalledWith(document.getElementById('s1'));
            vi.stubGlobal('innerHeight', 768);
            fireEvent.resize(window);
            expect(observers[0]!.disconnect).toHaveBeenCalledOnce();
            expect(createObserver).toHaveBeenCalledTimes(2);
            expectRegion(768);
            expect(observers[1]!.observe).toHaveBeenCalledWith(document.getElementById('s1'));
            unmount();
            expect(observers[1]!.disconnect).toHaveBeenCalledOnce();
            expect(removeListener).toHaveBeenCalledWith('resize', expect.any(Function));
            fireEvent.resize(window);
            expect(createObserver).toHaveBeenCalledTimes(2);
        } finally {
            removeListener.mockRestore();
            vi.unstubAllGlobals();
        }
    });
});

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
    it('背景ボタンで閉じると開閉ボタンへフォーカスを戻す', () => {
        const onClose = vi.fn();
        const { container, rerender } = render(<NavBar isOpen onClose={onClose} onToggle={vi.fn()} />);
        const backdrop = container.querySelector('.sidebar-backdrop') as HTMLElement;
        backdrop.focus();

        fireEvent.click(backdrop);
        rerender(<NavBar isOpen={false} onClose={onClose} onToggle={vi.fn()} />);

        expect(onClose).toHaveBeenCalledOnce();
        expect(container.querySelector('.sidebar-toggle')).toHaveFocus();
    });

    it('目次リンクで閉じると移動先へフォーカスする', () => {
        const onClose = vi.fn();
        const { container, rerender } = render(<>
            <NavBar isOpen onClose={onClose} onToggle={vi.fn()} />
            <section id="s1">移動先</section>
        </>);
        const link = container.querySelector('.nav a[href="#s1"]') as HTMLElement;
        link.focus();

        fireEvent.click(link);
        rerender(<>
            <NavBar isOpen={false} onClose={onClose} onToggle={vi.fn()} />
            <section id="s1">移動先</section>
        </>);

        expect(onClose).toHaveBeenCalledOnce();
        expect(container.querySelector('#s1')).toHaveFocus();
    });

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


describe('目次リンクのブラウザー標準操作', () => {
    it.each([{ ctrlKey: true }, { metaKey: true }])('修飾クリックを妨げない: %j', options => {
        const onClose = vi.fn();
        const { container } = render(<NavBar isOpen onClose={onClose} onToggle={vi.fn()} />);
        const link = container.querySelector('.nav a') as HTMLAnchorElement;
        const pushState = vi.spyOn(window.history, 'pushState');
        const event = new MouseEvent('click', { bubbles: true, cancelable: true, ...options });

        fireEvent(link, event);

        expect(event.defaultPrevented).toBe(false);
        expect(onClose).not.toHaveBeenCalled();
        expect(pushState).not.toHaveBeenCalled();
        pushState.mockRestore();
    });
});
