// __tests__/recommended-books/kubernetes-in-action/NavBar.test.tsx
// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { act } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NavBar } from '@/app/recommended-books/kubernetes-in-action/NavBar';
import { NAV_ITEMS } from '@/app/recommended-books/kubernetes-in-action/constants';

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

describe('kubernetes-in-action NavBar', () => {
    it('全目次項目がリンクとして描画され、初期状態で最初の項目が active になる', () => {
        render(<NavBar />);
        const links = document.querySelectorAll('nav a');
        expect(links.length).toBe(NAV_ITEMS.length);
        expect(linkFor(navItemAt(0).id).classList.contains('active')).toBe(true);
    });

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

    it('モバイルトグルボタンが存在し、aria-expanded が制御される', () => {
        render(<NavBar />);
        const toggle = document.querySelector('button.sidebar-toggle');
        expect(toggle).not.toBeNull();
        expect(toggle?.getAttribute('type')).toBe('button');
        expect(toggle?.getAttribute('aria-expanded')).toBe('false');

        act(() => {
            (toggle as HTMLButtonElement).click();
        });
        expect(toggle?.getAttribute('aria-expanded')).toBe('true');
    });

    it('目次リンクをクリックすると対象要素へフォーカスが移動し、ハッシュが更新される', () => {
        render(<NavBar />);
        const targetItem = navItemAt(1);
        const link = linkFor(targetItem.id);
        const targetSection = document.getElementById(targetItem.id);
        expect(targetSection).not.toBeNull();

        const focusSpy = vi.spyOn(targetSection!, 'focus');
        act(() => {
            link.click();
        });

        expect(window.location.hash).toBe(`#${targetItem.id}`);
        expect(focusSpy).toHaveBeenCalled();
    });
});
