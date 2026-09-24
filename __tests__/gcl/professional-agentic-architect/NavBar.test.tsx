// __tests__/gcl/professional-agentic-architect/NavBar.test.tsx
// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { act } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NavBar } from '@/app/gcl/professional-agentic-architect/NavBar';
import { NAV_ITEMS } from '@/app/gcl/professional-agentic-architect/constants';

type ObserverCallback = (entries: IntersectionObserverEntry[]) => void;

let observerCallback: ObserverCallback | null = null;

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
    window.location.hash = '';
});

afterEach(() => {
    document.body.innerHTML = '';
    vi.restoreAllMocks();
});

describe('NavBar - Professional Agentic Architect', () => {
    it('全 NAV_ITEMS のリンクが描画される', () => {
        render(<NavBar />);
        const links = document.querySelectorAll('nav#sidebarNav a');
        expect(links).toHaveLength(NAV_ITEMS.length);
    });

    it('初回描画時は先頭アイテムがアクティブになる', () => {
        render(<NavBar />);
        const first = navItemAt(0);
        expect(linkFor(first.id).classList.contains('active')).toBe(true);
    });

    it('IntersectionObserver の通知に応じてアクティブ項目が切り替わる', () => {
        mountSections();
        render(<NavBar />);

        const target = navItemAt(2);
        currentTops.set(target.id, 50);

        act(() => {
            observerCallback?.([entry(target.id, 50)]);
        });

        expect(linkFor(target.id).classList.contains('active')).toBe(true);
    });

    it('モバイルメニュートグルで開閉状態が切り替わる', () => {
        render(<NavBar />);
        const toggle = document.querySelector('#sidebarToggle') as HTMLButtonElement;
        const aside = document.querySelector('#sidebar') as HTMLElement;

        expect(aside.classList.contains('open')).toBe(false);
        act(() => {
            toggle.click();
        });
        expect(aside.classList.contains('open')).toBe(true);
        act(() => {
            toggle.click();
        });
        expect(aside.classList.contains('open')).toBe(false);
    });
});
