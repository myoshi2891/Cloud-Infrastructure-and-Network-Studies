import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import NavBar from '@/app/aws/generative-ai-developer-professional/domain2/NavBar';
import { metadata } from '@/app/aws/generative-ai-developer-professional/domain2/page';
import { DIAGRAMS, MERMAID_CONFIG, NAV_ITEMS } from '@/app/aws/generative-ai-developer-professional/domain2/constants';
import { Diagram } from '@/app/aws/generative-ai-developer-professional/domain2/Diagram';
import fixture from '@/docs/migration-inventory/aws-aip-c01-domain2-guide.fidelity.json';
import { aipDomain2Part } from '@/__tests__/helpers/aip-domain2-fixture';
import { AIP_DOMAIN2_CORRECTIONS, withSourceCorrections } from '@/__tests__/helpers/aip-source-corrections';
import { normalizeMermaid } from '@/scripts/archive-fidelity-extraction.mjs';

vi.mock('@/components/MermaidDiagram', async () => ({ MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock }));
afterEach(() => { vi.unstubAllGlobals(); window.history.replaceState(null, '', '/'); });

describe('AIP domain2 shell and source diagram settings', () => {
    it('retains metadata, all source navigation items and all 42 chart sources', () => {
        expect(metadata.title).toContain('Domain 2');
        expect(metadata.description).toContain('AIP-C01');
        expect(NAV_ITEMS).toEqual(fixture.guideDesign.nav);
        expect(MERMAID_CONFIG).toEqual(fixture.guideInteractions.mermaidConfig);
        expect(Object.values(DIAGRAMS).map(normalizeMermaid)).toEqual(Object.values(withSourceCorrections(fixture.guideParts, AIP_DOMAIN2_CORRECTIONS)).flatMap(part => part.diagrams));
        const { container } = render(<NavBar />);
        expect([...container.querySelectorAll('nav ul > li > a')].map(a => ({ href: a.getAttribute('href'), text: a.textContent }))).toEqual(NAV_ITEMS.map(item => ({ href: `#${item.id}`, text: item.label })));
        expect(container.querySelector('[aria-current="location"]')).toHaveAttribute('href', `#${NAV_ITEMS[0]?.id}`);
    });
    it('opens and closes, updates hash and focuses the identical target; Escape restores toggle focus', () => {
        const first = fixture.guideDesign.nav[0];
        if (!first) throw new Error('No navigation target');
        render(<><NavBar /><h2 id={first.id} tabIndex={-1}>Target</h2></>);
        const toggle = screen.getByRole('button', { name: 'メニュー' });
        const target = document.getElementById(first.id)!;
        target.scrollIntoView = vi.fn();
        expect(toggle).toHaveAttribute('type', 'button');
        expect(document.getElementById(toggle.getAttribute('aria-controls') ?? '')).not.toBeNull();
        fireEvent.click(toggle); expect(toggle).toHaveAttribute('aria-expanded', 'true');
        fireEvent.click(screen.getByRole('link', { name: first.label }));
        expect(decodeURIComponent(location.hash)).toBe(`#${first.id}`);
        expect(document.activeElement).toBe(target);
        expect(target.scrollIntoView).toHaveBeenCalled();
        expect(toggle).toHaveAttribute('aria-expanded', 'false');
        fireEvent.click(toggle); fireEvent.keyDown(document, { key: 'Escape' });
        expect(toggle).toHaveAttribute('aria-expanded', 'false'); expect(document.activeElement).toBe(toggle);
    });
    it('observes targets, follows intersections and document end and disconnects', () => {
        let callback: IntersectionObserverCallback | undefined;
        const observe = vi.fn(); const disconnect = vi.fn();
        vi.stubGlobal('IntersectionObserver', class { constructor(cb: IntersectionObserverCallback) { callback = cb; } observe = observe; disconnect = disconnect; });
        const second = NAV_ITEMS[1]; if (!second) throw new Error('No second item');
        const { unmount } = render(<><NavBar /><h3 id={second.id}>Target</h3></>);
        const target = document.getElementById(second.id)!;
        expect(observe).toHaveBeenCalledWith(target);
        const entry: IntersectionObserverEntry = { target, isIntersecting: true, boundingClientRect: target.getBoundingClientRect(), intersectionRect: target.getBoundingClientRect(), intersectionRatio: 1, rootBounds: null, time: 0 };
        act(() => callback?.([entry], {} as IntersectionObserver));
        expect(screen.getByRole('link', { name: second.label })).toHaveAttribute('aria-current', 'location');
        vi.stubGlobal('scrollY', 1); fireEvent.scroll(window);
        const last = NAV_ITEMS.at(-1); if (!last) throw new Error('No last item');
        expect(screen.getByRole('link', { name: last.label })).toHaveAttribute('aria-current', 'location');
        unmount(); expect(disconnect).toHaveBeenCalledOnce();
    });
    it('keeps the first visible heading active when a following heading enters the observer later', () => {
        let callback: IntersectionObserverCallback | undefined;
        vi.stubGlobal('IntersectionObserver', class { constructor(cb: IntersectionObserverCallback) { callback = cb; } observe() {} disconnect() {} });
        const first = NAV_ITEMS[0], second = NAV_ITEMS[1];
        if (!second) throw new Error('Missing navigation items');
        render(<><NavBar /><h2 id={first.id}>First</h2><h3 id={second.id}>Second</h3></>);
        const entry = (id: string, isIntersecting: boolean): IntersectionObserverEntry => {
            const target = document.getElementById(id)!;
            return { target, isIntersecting, boundingClientRect: target.getBoundingClientRect(), intersectionRect: target.getBoundingClientRect(), intersectionRatio: isIntersecting ? 1 : 0, rootBounds: null, time: 0 };
        };
        act(() => callback?.([entry(first.id, true)], {} as IntersectionObserver));
        act(() => callback?.([entry(second.id, true)], {} as IntersectionObserver));
        expect(screen.getByRole('link', { name: first.label })).toHaveAttribute('aria-current', 'location');
        act(() => callback?.([entry(first.id, false)], {} as IntersectionObserver));
        expect(screen.getByRole('link', { name: second.label })).toHaveAttribute('aria-current', 'location');
    });
    it('passes the exact source light config and natural scale to each labelled diagram', () => {
        const { container } = render(<Diagram id="diag-0" label="ロードマップ" />);
        const diagram = container.querySelector('[data-testid="mermaid-diagram"]');
        expect(diagram).toHaveAttribute('data-theme', 'light');
        expect(diagram).toHaveAttribute('data-preserve-natural-scale', 'true');
        expect(diagram).toHaveAttribute('aria-label', 'ロードマップ');
        expect(normalizeMermaid(diagram?.getAttribute('data-chart') ?? '')).toBe(aipDomain2Part('foundation').diagrams[0]);
        expect(diagram?.getAttribute('data-chart')).toContain(DIAGRAMS['diag-0']);
        expect(diagram?.closest('.mermaid-wrap')).toHaveAttribute('tabindex', '0');
    });
});
