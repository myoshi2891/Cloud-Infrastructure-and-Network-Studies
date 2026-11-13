import { act, fireEvent, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import NavBar from '@/app/cisco/devnet-expert/NavBar';

afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });
describe('目次の交差通知とクリック競合', () => {
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
