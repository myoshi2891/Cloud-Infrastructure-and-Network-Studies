// __tests__/recommended-books/computer-networking-topdown/NavBar.test.tsx
// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { act } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NavBar } from '@/app/recommended-books/computer-networking-topdown/NavBar';
import { NAV_ITEMS } from '@/app/recommended-books/computer-networking-topdown/constants';

type ObserverCallback = (entries: IntersectionObserverEntry[]) => void;

let observerCallback: ObserverCallback | null = null;

/** セクション要素の現在位置。getBoundingClientRect のモックが参照する */
const currentTops = new Map<string, number>();

const entry = (id: string, top: number, isIntersecting = true): IntersectionObserverEntry => {
    const target = document.getElementById(id) as HTMLElement;
    return {
        target,
        isIntersecting,
        boundingClientRect: { top } as DOMRectReadOnly,
    } as unknown as IntersectionObserverEntry;
};

const mountSections = () => {
    for (const item of NAV_ITEMS) {
        const section = document.createElement('section');
        section.id = item.id;
        section.tabIndex = -1;
        section.getBoundingClientRect = () =>
            ({ top: currentTops.get(item.id) ?? 0 }) as DOMRect;
        document.body.appendChild(section);
    }
};

const linkFor = (id: string): HTMLAnchorElement =>
    document.querySelector(`nav a[href="#${id}"]`) as HTMLAnchorElement;

/** noUncheckedIndexedAccess 下で NAV_ITEMS の添字アクセスを安全に絞り込む */
const navItemAt = (index: number) => {
    const item = NAV_ITEMS[index];
    if (!item) throw new Error(`NAV_ITEMS[${index}] が存在しません`);
    return item;
};

beforeEach(() => {
    observerCallback = null;
    currentTops.clear();
    vi.stubGlobal(
        'IntersectionObserver',
        class {
            constructor(callback: ObserverCallback) {
                observerCallback = callback;
            }
            observe() {}
            disconnect() {}
            unobserve() {}
            takeRecords() {
                return [];
            }
        },
    );
    window.history.replaceState(null, '', '/');
    mountSections();
});

afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    document.body.innerHTML = '';
});

describe('computer-networking-topdown NavBar', () => {
    it('IntersectionObserver のコールバックで最も画面上部に近い交差要素が active になる', () => {
        render(<NavBar />);
        expect(observerCallback).not.toBeNull();

        currentTops.set(navItemAt(2).id, 40);
        currentTops.set(navItemAt(3).id, 120);

        act(() => {
            observerCallback!([entry(navItemAt(3).id, 120), entry(navItemAt(2).id, 40)]);
        });

        expect(linkFor(navItemAt(2).id).classList.contains('active')).toBe(true);
        expect(linkFor(navItemAt(3).id).classList.contains('active')).toBe(false);
    });

    it('スクロール後に交差要素の位置を再計測し、古い top 値で active を誤判定しない', () => {
        render(<NavBar />);
        expect(observerCallback).not.toBeNull();

        // 1回目: item2 が最上部
        currentTops.set(navItemAt(2).id, 40);
        currentTops.set(navItemAt(3).id, 300);
        act(() => {
            observerCallback!([entry(navItemAt(2).id, 40), entry(navItemAt(3).id, 300)]);
        });
        expect(linkFor(navItemAt(2).id).classList.contains('active')).toBe(true);

        // スクロールにより item2 は画面上端より上へ、item3 が最上部になる。
        // 位置が変わった 2 要素については新しい entry が発火しない状況を再現する。
        currentTops.set(navItemAt(2).id, -500);
        currentTops.set(navItemAt(3).id, 20);
        currentTops.set(navItemAt(4).id, 600);
        act(() => {
            observerCallback!([entry(navItemAt(4).id, 600)]);
        });

        expect(linkFor(navItemAt(3).id).classList.contains('active')).toBe(true);
        expect(linkFor(navItemAt(2).id).classList.contains('active')).toBe(false);
    });
});
