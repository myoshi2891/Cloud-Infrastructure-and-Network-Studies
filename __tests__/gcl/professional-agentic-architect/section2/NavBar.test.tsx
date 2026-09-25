// __tests__/gcl/professional-agentic-architect/section2/NavBar.test.tsx
// @vitest-environment jsdom
import { fireEvent, render } from '@testing-library/react';
import { act } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NavBar } from '@/app/gcl/professional-agentic-architect/section2/NavBar';
import { NAV_ITEMS } from '@/app/gcl/professional-agentic-architect/section2/constants';

type ObserverCallback = (entries: IntersectionObserverEntry[]) => void;

let observerCallback: ObserverCallback | null = null;

const entry = (id: string, isIntersecting = true): IntersectionObserverEntry => {
    const target = document.getElementById(id) as HTMLElement;
    return {
        target,
        isIntersecting,
        boundingClientRect: {} as DOMRectReadOnly,
    } as unknown as IntersectionObserverEntry;
};

const mountSections = () => {
    for (const item of NAV_ITEMS) {
        const section = document.createElement('div');
        section.id = item.id;
        section.tabIndex = -1;
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

describe('Professional Agentic Architect Section 2 NavBar', () => {
    it('初期状態で第1項目が active になる', () => {
        render(<NavBar />);
        const first = navItemAt(0);
        expect(linkFor(first.id).classList.contains('active')).toBe(true);
    });

    it('モバイルトグルボタンのクリックで sidebar の open クラスと aria-expanded が切り替わる', () => {
        const { container } = render(<NavBar />);
        const toggle = container.querySelector('#sidebarToggle') as HTMLButtonElement;
        const sidebar = container.querySelector('#sidebar') as HTMLElement;

        expect(toggle.getAttribute('aria-expanded')).toBe('false');
        expect(sidebar.classList.contains('open')).toBe(false);

        fireEvent.click(toggle);
        expect(toggle.getAttribute('aria-expanded')).toBe('true');
        expect(sidebar.classList.contains('open')).toBe(true);

        fireEvent.click(toggle);
        expect(toggle.getAttribute('aria-expanded')).toBe('false');
        expect(sidebar.classList.contains('open')).toBe(false);
    });

    it('IntersectionObserver のコールバックで交差要素が active になる', () => {
        render(<NavBar />);
        expect(observerCallback).not.toBeNull();

        const targetItem = navItemAt(2);
        act(() => {
            observerCallback!([entry(targetItem.id, true)]);
        });

        expect(linkFor(targetItem.id).classList.contains('active')).toBe(true);
    });

    it('ナビゲーションリンクをクリックすると active が更新され対象要素へフォーカスが移動する', () => {
        render(<NavBar />);
        const targetItem = navItemAt(1);
        const targetElement = document.getElementById(targetItem.id);
        const focusSpy = vi.spyOn(targetElement!, 'focus');

        fireEvent.click(linkFor(targetItem.id));

        expect(linkFor(targetItem.id).classList.contains('active')).toBe(true);
        expect(focusSpy).toHaveBeenCalled();
    });
});
