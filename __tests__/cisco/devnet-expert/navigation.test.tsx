import { act, fireEvent, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import NavBar from '@/app/cisco/devnet-expert/NavBar';

afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });
describe('目次の交差通知とクリック競合', () => {
    it('uses viewport-height pixel margins and replaces the observer on resize', () => {
        const observers: { notify: IntersectionObserverCallback; options: IntersectionObserverInit; observe: ReturnType<typeof vi.fn>; disconnect: ReturnType<typeof vi.fn> }[] = [];
        vi.stubGlobal('innerHeight', 1000);
        vi.spyOn(document.documentElement, 'scrollHeight', 'get').mockReturnValue(10000);
        vi.stubGlobal('matchMedia', () => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
        vi.stubGlobal('IntersectionObserver', class {
            observe = vi.fn();
            disconnect = vi.fn();
            constructor(notify: IntersectionObserverCallback, options: IntersectionObserverInit) {
                observers.push({ notify, options, observe: this.observe, disconnect: this.disconnect });
            }
        });
        const { container, unmount } = render(<><NavBar /><section id="s-12" /><section id="s-12-1" /></>);
        const notify = (index: number, id: string) => act(() => observers[index]!.notify([
            { target: container.querySelector(`#${id}`)!, isIntersecting: true } as IntersectionObserverEntry,
        ], {} as IntersectionObserver));
        expect(observers[0]!.options.rootMargin).toBe('-200px 0px -700px 0px');
        notify(0, 's-12-1');
        vi.stubGlobal('innerHeight', 500);
        fireEvent.resize(window);
        expect(observers[0]!.disconnect).toHaveBeenCalledOnce();
        expect(observers[1]!.options.rootMargin).toBe('-100px 0px -350px 0px');
        expect(observers[1]!.observe).toHaveBeenCalledTimes(2);
        notify(1, 's-12');
        expect(container.querySelector('a[href="#s-12"]')).toHaveAttribute('aria-current', 'location');
        unmount();
        expect(observers[1]!.disconnect).toHaveBeenCalledOnce();
        fireEvent.resize(window);
        expect(observers).toHaveLength(2);
    });

    it.each(['ctrlKey', 'metaKey'])('%s付きクリックはブラウザーの標準動作を保つ', modifier => {
        vi.stubGlobal('matchMedia', () => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
        const pushState = vi.spyOn(history, 'pushState');
        const { container, getByRole } = render(<><NavBar /><section id="s-12" tabIndex={-1} /></>);
        fireEvent.click(getByRole('button', { name: '目次' }));
        const target = container.querySelector<HTMLElement>('#s-12')!;
        const focus = vi.spyOn(target, 'focus');
        const link = container.querySelector('a[href="#s-12"]')!;
        const event = new MouseEvent('click', { bubbles: true, cancelable: true, [modifier]: true });
        fireEvent(link, event);
        expect(event.defaultPrevented).toBe(false);
        expect(pushState).not.toHaveBeenCalled();
        expect(focus).not.toHaveBeenCalled();
        expect(link).not.toHaveAttribute('aria-current');
        expect(getByRole('button', { name: '目次' })).toHaveAttribute('aria-expanded', 'true');
        // Avoid jsdom scheduling native fragment navigation after this assertion.
        event.preventDefault();
    });

    it.each([true, false])('matches=%s: focusとscrollの前に必要な目次レイアウトを反映する', mobile => {
        vi.stubGlobal('matchMedia', () => ({ matches: mobile, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
        const { container, getByRole } = render(<><NavBar /><section id="s-12" tabIndex={-1} /></>);
        const toggle = getByRole('button', { name: '目次' });
        if (mobile) fireEvent.click(toggle);
        const target = container.querySelector<HTMLElement>('#s-12')!;
        const nav = container.querySelector('nav')!;
        const focus = vi.spyOn(target, 'focus').mockImplementation(() => {
            expect(nav.hidden).toBe(mobile);
        });
        const scroll = vi.fn(() => {
            expect(nav.hidden).toBe(mobile);
            expect(focus).toHaveBeenCalledOnce();
        });
        target.scrollIntoView = scroll;
        const link = container.querySelector('a[href="#s-12"]')!;
        fireEvent.click(link);
        expect(focus).toHaveBeenCalledOnce();
        expect(scroll).toHaveBeenCalledWith({ block: 'start' });
        expect(link).toHaveAttribute('aria-current', 'location');
        expect(toggle).toHaveAttribute('aria-expanded', String(!mobile));
    });

    it('クリック先は子節の遅延通知で上書きせず、手動スクロールで追跡に戻る', () => {
        let notify: IntersectionObserverCallback = () => {};
        const disconnect = vi.fn();
        vi.spyOn(document.documentElement, 'scrollHeight', 'get').mockReturnValue(10000);
        vi.stubGlobal('matchMedia', () => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
        vi.stubGlobal('IntersectionObserver', class {
            constructor(callback: IntersectionObserverCallback) { notify = callback; }
            observe = vi.fn();
            disconnect = disconnect;
        });
        const { container, unmount } = render(<><NavBar /><section id="s-12" tabIndex={-1} /><section id="s-12-1" tabIndex={-1} /></>);
        const parent = container.querySelector('a[href="#s-12"]')!;
        fireEvent.click(parent);
        act(() => notify([{ target: container.querySelector('#s-12-1')!, isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver));
        expect(parent).toHaveAttribute('aria-current', 'location');
        fireEvent.wheel(window);
        fireEvent.scroll(window);
        expect(container.querySelector('a[href="#s-12-1"]')).toHaveAttribute('aria-current', 'location');
        unmount();
        expect(disconnect).toHaveBeenCalledOnce();
    });
});
