// __tests__/comptia/network-plus/network-implementation-guide/NavBar.test.tsx
// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NavBar } from '@/app/comptia/network-plus/network-implementation-guide/NavBar';
import { NAV_ITEMS } from '@/app/comptia/network-plus/network-implementation-guide/constants';

type ObserverCallback = (entries: IntersectionObserverEntry[]) => void;

let observerCallback: ObserverCallback | null = null;

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
        document.body.appendChild(section);
    }
};

const linkFor = (id: string): HTMLAnchorElement =>
    document.querySelector(`nav a[href="#${id}"]`) as HTMLAnchorElement;

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

describe('network-implementation-guide NavBar', () => {
    it('初期状態で最初の項目 (overview) が active である', () => {
        render(<NavBar />);
        expect(linkFor('overview')).toHaveAttribute('aria-current', 'location');
    });

    it('交差中のうち最上部のセクションだけを active にする', () => {
        render(<NavBar />);

        act(() => {
            observerCallback?.([
                entry('step2', 420),
                entry('step1', 120),
                entry('step3', 900),
            ]);
        });

        expect(linkFor('step1')).toHaveAttribute('aria-current', 'location');
        expect(linkFor('step3')).not.toHaveAttribute('aria-current');
    });

    it('上方のセクションが交差したままなら、下方のセクションだけの通知で active を奪われない', () => {
        render(<NavBar />);

        act(() => {
            observerCallback?.([entry('overview', 10), entry('step1', 400)]);
        });
        expect(linkFor('overview')).toHaveAttribute('aria-current', 'location');

        act(() => {
            observerCallback?.([entry('step1', 350)]);
        });
        expect(linkFor('overview')).toHaveAttribute('aria-current', 'location');
    });

    it('モバイルトグルボタンの開閉と aria-expanded 属性の同期', () => {
        render(<NavBar />);
        const toggleButton = screen.getByRole('button', { name: /目次/i });
        expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

        fireEvent.click(toggleButton);
        expect(toggleButton).toHaveAttribute('aria-expanded', 'true');

        fireEvent.click(toggleButton);
        expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    });
});
