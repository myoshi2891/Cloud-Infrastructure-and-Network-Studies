import { act, fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import NavBar from '@/app/standards/iso-iec-22123-1-2023/NavBar';
import { NAV_ITEMS } from '@/app/standards/iso-iec-22123-1-2023/constants';

describe('ISO目次の現在地', () => {
    it('交差通知の順序に依存せず、長い節を上に戻ると直前の見出しを選ぶ', () => {
        let notify: IntersectionObserverCallback | undefined;
        const observer = { observe: vi.fn(), disconnect: vi.fn() };
        vi.stubGlobal('IntersectionObserver', vi.fn(function (callback: IntersectionObserverCallback) {
            notify = callback;
            return observer;
        }));
        let tops = [-1000, -100, 2000];
        const rectSpy = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
            const index = NAV_ITEMS.findIndex(item => item.id === this.id);
            return { top: tops[index] ?? 5000 } as DOMRect;
        });
        try {
            const { container, unmount } = render(<>
                <NavBar open={false} onClose={vi.fn()} onToggle={vi.fn()} />
                {NAV_ITEMS.slice(0, 3).map(item => <h2 id={item.id} key={item.id}>{item.text}</h2>)}
            </>);
            const links = container.querySelectorAll('.sidebar a');
            expect(links[1]).toHaveAttribute('aria-current', 'location');

            tops = [-1000, -900, -100];
            fireEvent.scroll(window);
            expect(links[2]).toHaveAttribute('aria-current', 'location');

            // 次の見出しが観測領域の下へ出た後、どの見出しも交差しない長い節へ戻る。
            tops = [-1000, -500, 2000];
            fireEvent.scroll(window);
            expect(links[1]).toHaveAttribute('aria-current', 'location');
            const target = container.querySelectorAll('h2');
            act(() => notify?.([
                { target: target[2], isIntersecting: false },
                { target: target[0], isIntersecting: false },
            ] as IntersectionObserverEntry[], observer as unknown as IntersectionObserver));
            expect(links[1]).toHaveAttribute('aria-current', 'location');

            tops = [1000, 2000, 3000];
            fireEvent.scroll(window);
            expect(links[0]).toHaveAttribute('aria-current', 'location');
            tops = [-1000, 0, 2000];
            fireEvent.resize(window);
            expect(links[1]).toHaveAttribute('aria-current', 'location');
            unmount();
            expect(observer.disconnect).toHaveBeenCalledOnce();
        } finally {
            rectSpy.mockRestore();
            vi.unstubAllGlobals();
        }
    });
});
