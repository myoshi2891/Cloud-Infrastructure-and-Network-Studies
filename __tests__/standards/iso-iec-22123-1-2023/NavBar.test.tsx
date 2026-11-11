import { act, fireEvent, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import NavBar from '@/app/standards/iso-iec-22123-1-2023/NavBar';
import { NAV_ITEMS } from '@/app/standards/iso-iec-22123-1-2023/constants';

/** requestAnimationFrame を手動で進められるようにし、予約・取消を観測する。 */
function stubAnimationFrame() {
    const callbacks = new Map<number, FrameRequestCallback>();
    let nextId = 1;
    const request = vi.fn((callback: FrameRequestCallback) => {
        const id = nextId++;
        callbacks.set(id, callback);
        return id;
    });
    const cancel = vi.fn((id: number) => { callbacks.delete(id); });
    vi.stubGlobal('requestAnimationFrame', request);
    vi.stubGlobal('cancelAnimationFrame', cancel);
    return {
        request,
        cancel,
        pending: () => callbacks.size,
        flush: () => act(() => {
            const queued = [...callbacks.values()];
            callbacks.clear();
            queued.forEach(callback => callback(0));
        }),
    };
}

function stubObserver() {
    let notify: IntersectionObserverCallback | undefined;
    const observer = { observe: vi.fn(), disconnect: vi.fn() };
    vi.stubGlobal('IntersectionObserver', vi.fn(function (callback: IntersectionObserverCallback) {
        notify = callback;
        return observer;
    }));
    return { observer, notify: (entries: IntersectionObserverEntry[]) => notify?.(entries, observer as unknown as IntersectionObserver) };
}

const renderWithHeadings = (count = 3) => render(<>
    <NavBar open={false} onClose={vi.fn()} onToggle={vi.fn()} />
    {NAV_ITEMS.slice(0, count).map(item => <h2 id={item.id} key={item.id}>{item.text}</h2>)}
</>);

const originalInnerHeight = window.innerHeight;
const setViewportHeight = (height: number) => Object.defineProperty(window, 'innerHeight', { configurable: true, value: height });

afterEach(() => {
    setViewportHeight(originalInnerHeight);
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
});

describe('ISO目次の現在地', () => {
    it('交差通知の順序に依存せず、長い節を上に戻ると直前の見出しを選ぶ', () => {
        const { observer, notify } = stubObserver();
        const frames = stubAnimationFrame();
        let tops = [-1000, -100, 2000];
        vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
            const index = NAV_ITEMS.findIndex(item => item.id === this.id);
            return { top: tops[index] ?? 5000 } as DOMRect;
        });
        const { container, unmount } = renderWithHeadings();
        const links = container.querySelectorAll('.sidebar a');
        expect(links[1]).toHaveAttribute('aria-current', 'location');

        tops = [-1000, -900, -100];
        fireEvent.scroll(window);
        frames.flush();
        expect(links[2]).toHaveAttribute('aria-current', 'location');

        // 次の見出しが観測領域の下へ出た後、どの見出しも交差しない長い節へ戻る。
        tops = [-1000, -500, 2000];
        fireEvent.scroll(window);
        frames.flush();
        expect(links[1]).toHaveAttribute('aria-current', 'location');
        const target = container.querySelectorAll('h2');
        act(() => notify([
            { target: target[2], isIntersecting: false },
            { target: target[0], isIntersecting: false },
        ] as unknown as IntersectionObserverEntry[]));
        expect(links[1]).toHaveAttribute('aria-current', 'location');

        tops = [1000, 2000, 3000];
        fireEvent.scroll(window);
        frames.flush();
        expect(links[0]).toHaveAttribute('aria-current', 'location');
        tops = [-1000, 0, 2000];
        fireEvent.resize(window);
        expect(links[1]).toHaveAttribute('aria-current', 'location');
        unmount();
        expect(observer.disconnect).toHaveBeenCalledOnce();
    });

    it('連続したscrollイベントは1フレームにつき1回だけ見出し位置を読み、アンマウント時に予約を取り消す', () => {
        stubObserver();
        const frames = stubAnimationFrame();
        const { container, unmount } = renderWithHeadings();
        const heading = container.querySelector('h2') as HTMLElement;
        const rect = vi.spyOn(heading, 'getBoundingClientRect').mockReturnValue({ top: 0 } as DOMRect);

        fireEvent.scroll(window);
        fireEvent.scroll(window);
        fireEvent.scroll(window);

        expect(rect).not.toHaveBeenCalled();
        expect(frames.request).toHaveBeenCalledOnce();
        frames.flush();
        expect(rect).toHaveBeenCalledOnce();

        fireEvent.scroll(window);
        expect(frames.pending()).toBe(1);
        unmount();
        expect(frames.cancel).toHaveBeenCalledOnce();
        expect(frames.pending()).toBe(0);
    });

    it('低い画面でも見出しのscroll-margin-topと同じ位置を読み始めの境界にする', () => {
        stubObserver();
        const frames = stubAnimationFrame();
        setViewportHeight(400);
        const realStyle = window.getComputedStyle;
        vi.spyOn(window, 'getComputedStyle').mockImplementation(element => {
            const style = realStyle(element);
            return element instanceof HTMLHeadingElement
                ? { ...style, scrollMarginTop: '140px' } as CSSStyleDeclaration
                : style;
        });
        let tops = [-1000, 140, 2000];
        vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
            const index = NAV_ITEMS.findIndex(item => item.id === this.id);
            return { top: tops[index] ?? 5000 } as DOMRect;
        });
        const { container } = renderWithHeadings();
        const links = container.querySelectorAll('.sidebar a');

        // 400pxの15%（60px）ではなく、scroll-margin-top（140px）に着地した見出しを現在地とする。
        expect(links[1]).toHaveAttribute('aria-current', 'location');

        tops = [-1000, 142, 2000];
        fireEvent.scroll(window);
        frames.flush();
        expect(links[0]).toHaveAttribute('aria-current', 'location');
    });

    it('目次から移動した見出しが境界より下で止まっても、利用者がスクロールするまで選択を保つ', () => {
        stubObserver();
        const frames = stubAnimationFrame();
        setViewportHeight(400);
        // ページ末尾の見出しは境界まで上がりきらず、300pxで止まる。
        let tops = [-1000, -500, 300];
        vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
            const index = NAV_ITEMS.findIndex(item => item.id === this.id);
            return { top: tops[index] ?? 5000 } as DOMRect;
        });
        const { container } = renderWithHeadings();
        const links = container.querySelectorAll('.sidebar a');
        expect(links[1]).toHaveAttribute('aria-current', 'location');

        fireEvent.click(links[2] as HTMLAnchorElement);
        fireEvent.scroll(window);
        frames.flush();
        expect(links[2]).toHaveAttribute('aria-current', 'location');

        // 利用者のスクロールで着地位置から動いたら、通常の境界判定へ戻る。
        tops = [-1000, -400, 400];
        fireEvent.scroll(window);
        frames.flush();
        expect(links[1]).toHaveAttribute('aria-current', 'location');
    });
});
