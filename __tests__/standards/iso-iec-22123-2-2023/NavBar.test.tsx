import { act, fireEvent, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import NavBar from '@/app/standards/iso-iec-22123-2-2023/NavBar';
import { NAV_ITEMS } from '@/app/standards/iso-iec-22123-2-2023/constants';

afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe('Part 2の読み始め境界', () => {
    it('交差通知とscrollが同じ境界を使い、通知順や未通過の見出しで現在地が変わらない', () => {
        let notify: IntersectionObserverCallback | undefined;
        let frame: FrameRequestCallback | undefined;
        const observer = { observe: vi.fn(), disconnect: vi.fn() };
        vi.stubGlobal('IntersectionObserver', vi.fn(function (callback: IntersectionObserverCallback) {
            notify = callback;
            return observer;
        }));
        vi.stubGlobal('requestAnimationFrame', vi.fn((callback: FrameRequestCallback) => { frame = callback; return 1; }));
        vi.stubGlobal('cancelAnimationFrame', vi.fn());
        let tops = [-100, 180, 220];
        vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
            const index = NAV_ITEMS.findIndex(item => item.id === this.id);
            return { top: tops[index] ?? 1000 } as DOMRect;
        });
        const { container, unmount } = render(<>
            <NavBar open={false} onClose={vi.fn()} onToggle={vi.fn()} />
            {NAV_ITEMS.slice(0, 3).map(item => <h2 id={item.id} key={item.id} style={{ scrollMarginTop: '200px' }}>{item.text}</h2>)}
        </>);
        const headings = [...container.querySelectorAll('h2')];
        const links = container.querySelectorAll('.sidebar a');
        const entry = (index: number) => ({ target: headings[index], isIntersecting: true }) as unknown as IntersectionObserverEntry;
        const signal = (entries: IntersectionObserverEntry[]) => act(() => notify?.(entries, observer as unknown as IntersectionObserver));
        expect(links[1]).toHaveAttribute('aria-current', 'location');
        signal([entry(1), entry(2)]);
        expect(links[1]).toHaveAttribute('aria-current', 'location');
        signal([entry(2), entry(1)]);
        expect(links[1]).toHaveAttribute('aria-current', 'location');

        tops = [-100, 220, 300];
        fireEvent.scroll(window);
        act(() => frame?.(0));
        expect(links[0]).toHaveAttribute('aria-current', 'location');
        signal([entry(1)]);
        expect(links[0]).toHaveAttribute('aria-current', 'location');
        unmount();
        expect(observer.disconnect).toHaveBeenCalledOnce();
    });
});
