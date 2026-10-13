import { fireEvent, render, screen, act } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Guide from '@/app/aws/generative-ai-developer-professional/AipGuide';
import { metadata } from '@/app/aws/generative-ai-developer-professional/page';
import { NAV_ITEMS } from '@/app/aws/generative-ai-developer-professional/constants';
import fixture from '@/docs/migration-inventory/aws-aip-c01-guide.fidelity.json';
import { readFileSync } from 'node:fs';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});
afterEach(() => { vi.unstubAllGlobals(); window.history.replaceState(null, '', '/'); });

describe('AIP guide shell', () => {
    it('preserves sidebar width and list markers under Tailwind reset', () => {
        const css = readFileSync('app/aws/generative-ai-developer-professional/page.css', 'utf8');
        expect(css).toMatch(/\.aip-guide-page \.sidebar\s*\{[^}]*width:\s*300px/s);
        expect(css).toMatch(/\.aip-guide-page \.main ul\s*\{[^}]*list-style-type:\s*disc/s);
        expect(css).toMatch(/\.aip-guide-page \.main ol\s*\{[^}]*list-style-type:\s*decimal/s);
        expect(css).toMatch(/\.aip-guide-page \.sidebar nav ul\s*\{[^}]*list-style:\s*none/s);
        expect(css).toContain('calc(var(--header-h, 60px) + var(--disclaimer-height, 0px)');
    });
    it('keeps metadata, all 48 source navigation entries and initial active item', () => {
        expect(metadata.title).toContain('AIP-C01');
        expect(NAV_ITEMS).toEqual(fixture.guideDesign.nav);
        render(<Guide />);
        const nav = screen.getByRole('navigation', { name: 'AIP-C01 学習ガイド目次' });
        expect([...nav.querySelectorAll('ul > li > a')].map(a => ({ href: a.getAttribute('href'), label: a.textContent }))).toEqual(NAV_ITEMS.map(item => ({ href: `#${item.id}`, label: item.label })));
        expect(nav.querySelector('[aria-current="location"]')).toHaveAttribute('href', `#${NAV_ITEMS[0]?.id}`);
        expect(screen.getByRole('main')).toHaveClass('main');
    });
    it('opens, closes, updates hash and focuses the exact target heading', () => {
        render(<Guide />);
        const button = screen.getByRole('button', { name: 'メニュー' });
        expect(button).toHaveAttribute('type', 'button');
        expect(button).toHaveAttribute('aria-controls', 'aip-sidebar');
        expect(button).toHaveAttribute('aria-expanded', 'false');
        fireEvent.click(button);
        expect(button).toHaveAttribute('aria-expanded', 'true');
        const first = NAV_ITEMS[0];
        if (!first) throw new Error('missing first navigation entry');
        const existing = document.getElementById(first.id);
        const target = existing ?? document.createElement('h2');
        target.id = first.id; target.tabIndex = -1;
        target.scrollIntoView = vi.fn(); if (!existing) document.body.append(target);
        fireEvent.click(screen.getByRole('link', { name: first.label }));
        expect(decodeURIComponent(location.hash)).toBe(`#${first.id}`);
        expect(document.activeElement).toBe(target);
        expect(button).toHaveAttribute('aria-expanded', 'false');
        if (!existing) target.remove();
        fireEvent.click(button); fireEvent.keyDown(document, { key: 'Escape' });
        expect(button).toHaveAttribute('aria-expanded', 'false');
    });
    it('observes available targets, updates active navigation and disconnects on unmount', () => {
        let callback: IntersectionObserverCallback | undefined;
        const observe = vi.fn(); const disconnect = vi.fn();
        vi.stubGlobal('IntersectionObserver', class {
            constructor(cb: IntersectionObserverCallback) { callback = cb; }
            observe = observe; disconnect = disconnect;
        });
        const second = NAV_ITEMS[1];
        if (!second) throw new Error('missing navigation entry');
        const target = document.createElement('h3'); target.id = second.id; document.body.append(target);
        const { unmount } = render(<Guide />);
        expect(observe).toHaveBeenCalledWith(target);
        act(() => callback?.([{ target, isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver));
        expect(screen.getByRole('link', { name: second.label })).toHaveAttribute('aria-current', 'location');
        unmount(); expect(disconnect).toHaveBeenCalledOnce(); target.remove();
    });
});
