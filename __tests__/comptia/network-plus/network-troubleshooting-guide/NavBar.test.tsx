// __tests__/comptia/network-plus/network-troubleshooting-guide/NavBar.test.tsx
// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NavBar } from '@/app/comptia/network-plus/network-troubleshooting-guide/NavBar';
import { NAV_ITEMS } from '@/app/comptia/network-plus/network-troubleshooting-guide/constants';

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

describe('network-troubleshooting-guide NavBar', () => {
    it('交差中のうち最上部のセクションだけを active にする', () => {
        render(<NavBar />);

        act(() => {
            observerCallback?.([
                entry('cabling', 420),
                entry('methodology', 120),
                entry('services', 900),
            ]);
        });

        expect(linkFor('methodology')).toHaveAttribute('aria-current', 'location');
        expect(linkFor('services')).not.toHaveAttribute('aria-current');
    });

    it('上方のセクションが交差したままなら、下方のセクションだけの通知で active を奪われない', () => {
        render(<NavBar />);

        act(() => {
            observerCallback?.([entry('overview', 10), entry('methodology', 400)]);
        });
        expect(linkFor('overview')).toHaveAttribute('aria-current', 'location');

        act(() => {
            observerCallback?.([entry('methodology', 350)]);
        });
        expect(linkFor('overview')).toHaveAttribute('aria-current', 'location');
    });

    it('上方のセクションが画面外へ出たら、残る最上部へ active が遷移する', () => {
        render(<NavBar />);

        act(() => {
            observerCallback?.([entry('overview', 10), entry('methodology', 400)]);
        });

        act(() => {
            observerCallback?.([entry('overview', -500, false)]);
        });

        expect(linkFor('methodology')).toHaveAttribute('aria-current', 'location');
        expect(linkFor('overview')).not.toHaveAttribute('aria-current');
    });

    it('全セクションが交差外になったら activeId を更新しない', () => {
        render(<NavBar />);

        act(() => {
            observerCallback?.([entry('cabling', 100)]);
        });
        expect(linkFor('cabling')).toHaveAttribute('aria-current', 'location');

        act(() => {
            observerCallback?.([entry('cabling', -100, false)]);
        });
        expect(linkFor('cabling')).toHaveAttribute('aria-current', 'location');
    });

    it('URLハッシュに初期位置がある場合はそれを active にする', () => {
        window.history.replaceState(null, '', '#performance');
        render(<NavBar />);

        expect(linkFor('performance')).toHaveAttribute('aria-current', 'location');
    });

    it('不正なハッシュ値の場合はフォールバックする', () => {
        window.history.replaceState(null, '', '#nonexistent-section');
        render(<NavBar />);

        expect(linkFor('overview')).toHaveAttribute('aria-current', 'location');
    });

    it('リンククリックで activeId が即座に更新され、対象要素へフォーカスが移動する', () => {
        render(<NavBar />);

        const target = document.getElementById('tools');
        expect(target).not.toBeNull();
        const focusSpy = vi.spyOn(target as HTMLElement, 'focus');

        fireEvent.click(linkFor('tools'));

        expect(linkFor('tools')).toHaveAttribute('aria-current', 'location');
        expect(focusSpy).toHaveBeenCalledWith({ preventScroll: true });
    });

    it('モバイルトグルボタンで開閉状態が切り替わる', () => {
        render(<NavBar />);

        const button = screen.getByRole('button', { name: '目次ナビゲーションを開閉' });
        const sidebar = screen.getByRole('navigation', { name: 'サイドバー目次' });

        expect(button).toHaveAttribute('aria-expanded', 'false');
        expect(sidebar).not.toHaveClass('open');

        fireEvent.click(button);

        expect(button).toHaveAttribute('aria-expanded', 'true');
        expect(sidebar).toHaveClass('open');

        fireEvent.click(button);

        expect(button).toHaveAttribute('aria-expanded', 'false');
        expect(sidebar).not.toHaveClass('open');
    });

    it('全8件のナビゲーション項目がアイコン付きで描画される', () => {
        render(<NavBar />);

        const links = document.querySelectorAll('nav a');
        expect(links).toHaveLength(NAV_ITEMS.length);

        NAV_ITEMS.forEach((item) => {
            const link = linkFor(item.id);
            expect(link).not.toBeNull();
            expect(link.textContent).toContain(item.title);
            const icon = link.querySelector('i');
            expect(icon).not.toBeNull();
            expect(icon?.className).toContain(item.icon);
        });
    });
});
