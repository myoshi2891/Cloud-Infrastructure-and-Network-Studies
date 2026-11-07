import { act, fireEvent, render } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import NavBar from '@/app/aws/security-specialty/domain6/NavBar';
import { NAV_ITEMS } from '@/app/aws/security-specialty/domain6/constants';
import fixture from '@/docs/migration-inventory/aws-scs-c03-domain6-guide.fidelity.json';

/** 現在位置として示されている目次リンクの href を返す。 */
const current = (container: HTMLElement) =>
    container.querySelector('nav a[aria-current="location"]')?.getAttribute('href');

afterEach(() => {
    vi.unstubAllGlobals();
    window.history.replaceState(null, '', window.location.pathname);
});

it('retains every source navigation label and target in order', () => {
    const { container } = render(<NavBar />);
    expect(NAV_ITEMS).toEqual(fixture.guideDesign.nav);
    expect(
        [...container.querySelectorAll('nav a')].map((a) => ({
            id: a.getAttribute('href')?.slice(1),
            label: a.textContent?.trim(),
        })),
    ).toEqual(fixture.guideDesign.nav.map(({ id, label }) => ({ id, label })));
});

it('opens, closes with Escape, and cleans up its observer', () => {
    const disconnect = vi.fn();
    vi.stubGlobal(
        'IntersectionObserver',
        class {
            observe = vi.fn();
            disconnect = disconnect;
        },
    );
    const { container, unmount } = render(<NavBar />);
    const button = container.querySelector('button')!;
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveFocus();
    unmount();
    expect(disconnect).toHaveBeenCalled();
});

it('preserves the indentation class for every source level-three navigation item', () => {
    const { container } = render(<NavBar />);
    expect(
        [...container.querySelectorAll('nav a.lvl3')].map((a) => a.getAttribute('href')?.slice(1)),
    ).toEqual(fixture.guideDesign.nav.filter((item) => item.level === 3).map((item) => item.id));
});

it('syncs aria-current from a valid fragment and history navigation, falling back to the first item', () => {
    const target = NAV_ITEMS[2]!.id;
    window.history.replaceState(null, '', `#${target}`);
    const { container, unmount } = render(<NavBar />);
    expect(current(container)).toBe(`#${target}`);
    act(() => {
        window.history.replaceState(null, '', '#unknown-section');
        window.dispatchEvent(new PopStateEvent('popstate'));
    });
    expect(current(container)).toBe(`#${NAV_ITEMS[0]!.id}`);
    unmount();
});

it('falls back to the first item when mounted with a malformed fragment', () => {
    window.history.replaceState(null, '', '#%E0%A4%A');
    const { container, unmount } = render(<NavBar />);
    expect(current(container)).toBe(`#${NAV_ITEMS[0]!.id}`);
    unmount();
});

it.each([
    ['hashchange', () => new HashChangeEvent('hashchange')],
    ['popstate', () => new PopStateEvent('popstate')],
])('keeps tracking history after a malformed fragment arrives via %s', (_name, createEvent) => {
    const target = NAV_ITEMS[2]!.id;
    window.history.replaceState(null, '', `#${target}`);
    const { container, unmount } = render(<NavBar />);
    expect(current(container)).toBe(`#${target}`);
    act(() => {
        window.history.replaceState(null, '', '#%E0%A4%A');
        window.dispatchEvent(createEvent());
    });
    expect(current(container)).toBe(`#${NAV_ITEMS[0]!.id}`);
    act(() => {
        window.history.replaceState(null, '', `#${target}`);
        window.dispatchEvent(createEvent());
    });
    expect(current(container)).toBe(`#${target}`);
    unmount();
});
