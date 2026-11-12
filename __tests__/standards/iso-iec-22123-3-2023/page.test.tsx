// @vitest-environment jsdom
import { readFileSync } from 'node:fs';
import { render, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import postcss from 'postcss';
import { JSDOM } from 'jsdom';
import Page from '@/app/standards/iso-iec-22123-3-2023/page';
import inventory from '@/docs/migration-inventory/iso-iec-22123-3-2023.json';
import fixture from '@/docs/migration-inventory/iso-iec-22123-3-2023.fidelity.json';
import { defineMigrationSuite } from '@/__tests__/helpers/migration-test-utils';
import { snapshotGuidePart } from '@/scripts/guide-fidelity-extraction.mjs';
import { snapshotSvgDiagrams } from '@/scripts/svg-fidelity-extraction.mjs';
import type { ComponentType } from 'react';
import { renderToString } from 'react-dom/server';

defineMigrationSuite('ISO/IEC 22123-3:2023 全量移行', Page, inventory);

describe('原本の構造・装飾・操作を保持する', () => {
    it('全文・表結合・強調・リンク・リスト階層・配置順と20図のSVGツリーが完全一致する', () => {
        const { container } = render(<Page />);
        expect(snapshotGuidePart(container.querySelector('main'))).toEqual(fixture.main);
        expect(snapshotSvgDiagrams(container).map(diagram => Object.fromEntries(Object.entries(diagram).filter(([key]) => key !== 'label')))).toEqual(fixture.svg.map(diagram => Object.fromEntries(Object.entries(diagram).filter(([key]) => key !== 'label'))));

        container.querySelectorAll('.mermaid-diagram').forEach(diagram => {
            expect(diagram).toHaveAttribute('tabindex', '0');
            expect(diagram).toHaveRole('region');
            expect(diagram.getAttribute('aria-label')?.trim()).not.toBe('');
            expect(diagram.querySelector('.svg-source')).toHaveAttribute('data-preserve-natural-scale', 'true');
        });
    });

    it('元の階層別目次を全件保持し、開閉・hash・フォーカス・Escapeを同期する', () => {
        const { container, getByRole } = render(<Page />);
        const original = new JSDOM(fixture.nav).window.document;
        const links = (root: ParentNode) => [...root.querySelectorAll('.sidebar a')].map(a => ({ href: a.getAttribute('href'), text: a.textContent?.replace(/\s+/g, ' ').trim(), parent: a.parentElement?.parentElement?.className }));
        expect(links(container)).toEqual(links(original));
        const toggle = getByRole('button', { name: '目次を開閉' });
        fireEvent.click(toggle);
        expect(toggle).toHaveAttribute('aria-expanded', 'true');
        const link = container.querySelectorAll<HTMLAnchorElement>('.sidebar a')[3]!;
        fireEvent.click(link);
        expect(toggle).toHaveAttribute('aria-expanded', 'false');
        expect(decodeURIComponent(location.hash.slice(1))).toBe(link.getAttribute('href')!.slice(1));
        expect(document.activeElement?.id).toBe(link.getAttribute('href')!.slice(1));
        expect(link).toHaveAttribute('aria-current', 'location');
        fireEvent.click(toggle);
        fireEvent.keyDown(window, { key: 'Escape' });
        expect(toggle).toHaveFocus();
        expect(toggle).toHaveAttribute('aria-expanded', 'false');
    });

    it('原本の目次アイコンを保持し、ハイドレーション前の操作を無効化する', () => {
        const html = renderToString(<Page />);
        const server = new JSDOM(html).window.document;
        expect(server.querySelector('#navToggle')?.textContent).toBe('☰ 目次');
        expect(server.querySelector('#navToggle')).toHaveAttribute('disabled');
        const { getByRole } = render(<Page />);
        expect(getByRole('button', { name: '目次を開閉' })).toBeEnabled();
    });

    it('全目次だけを監視し、scroll spy更新とcleanupを行う', () => {
        let callback: IntersectionObserverCallback | undefined;
        const observer = { observe: vi.fn(), disconnect: vi.fn() };
        vi.stubGlobal('IntersectionObserver', vi.fn(function (cb: IntersectionObserverCallback) { callback = cb; return observer; }));
        try {
            const { container, unmount } = render(<Page />);
            const anchors = [...container.querySelectorAll<HTMLAnchorElement>('.sidebar a')];
            expect(observer.observe.mock.calls.map(([element]) => element.id)).toEqual(anchors.map(a => a.getAttribute('href')!.slice(1)));
            const target = document.getElementById(anchors.at(-1)!.getAttribute('href')!.slice(1))!;
            act(() => callback?.([{ target, isIntersecting: true } as unknown as IntersectionObserverEntry], observer as unknown as IntersectionObserver));
            expect(anchors.at(-1)).toHaveAttribute('aria-current', 'location');
            unmount();
            expect(observer.disconnect).toHaveBeenCalledOnce();
        } finally { vi.unstubAllGlobals(); }
    });

    it('末尾見出しが交差領域へ届かなくても文書末尾では最後の目次を選ぶ', () => {
        let callback: IntersectionObserverCallback | undefined;
        const observer = { observe: vi.fn(), disconnect: vi.fn() };
        vi.stubGlobal('IntersectionObserver', vi.fn(function (cb: IntersectionObserverCallback) { callback = cb; return observer; }));
        try {
            const { container } = render(<Page />);
            const links = [...container.querySelectorAll<HTMLAnchorElement>('.sidebar a')];
            for (const [index, link] of links.entries()) {
                const heading = document.getElementById(link.getAttribute('href')!.slice(1))!;
                vi.spyOn(heading, 'getBoundingClientRect').mockReturnValue({ top: index === 0 ? -100 : 500 } as DOMRect);
            }
            vi.spyOn(document.documentElement, 'scrollHeight', 'get').mockReturnValue(2000);
            vi.stubGlobal('innerHeight', 800);
            vi.stubGlobal('scrollY', 1200);
            const target = document.getElementById(links.at(-1)!.getAttribute('href')!.slice(1))!;
            act(() => callback?.([{ target, isIntersecting: false } as unknown as IntersectionObserverEntry], observer as unknown as IntersectionObserver));
            expect(links.at(-1)).toHaveAttribute('aria-current', 'location');
        } finally { vi.restoreAllMocks(); vi.unstubAllGlobals(); }
    });

    it.each(Object.entries(fixture.parts))('%s の章単位でも全文・表結合・配置順・リスト階層を一致させる', (name, expected) => {
        const modules = import.meta.glob<{ default: ComponentType }>('@/app/standards/iso-iec-22123-3-2023/sections/*.tsx', { eager: true });
        const sectionModule = Object.entries(modules).find(([path]) => path.endsWith('/' + name + '.tsx'))?.[1];
        expect(sectionModule, name).toBeDefined();
        if (!sectionModule) throw new Error('Missing section: ' + name);
        const Section = sectionModule.default;
        const { container } = render(<Section />);
        expect(snapshotGuidePart(container.firstElementChild)).toEqual(expected);
    });

    it('章の本文・表セル・リスト・SVGの削除をそれぞれ検出する', () => {
        const { container } = render(<Page />);
        const main = container.querySelector('main')!;
        for (const selector of ['.sec p', 'td', 'main > section li']) {
            const clone = main.cloneNode(true) as HTMLElement;
            const target = clone.querySelector(selector === 'main > section li' ? '.sec li' : selector);
            expect(target, selector).not.toBeNull();
            target!.remove();
            expect(snapshotGuidePart(clone)).not.toEqual(fixture.main);
        }
        const clone = main.cloneNode(true) as HTMLElement;
        clone.querySelector('.mermaid-diagram')!.remove();
        expect(snapshotSvgDiagrams(clone)).not.toEqual(fixture.svg);
    });

    it('全CSS宣言を保持し、点・番号・自然倍率と固定ヘッダーの配置を明示する', () => {
        const css = readFileSync('app/standards/iso-iec-22123-3-2023/page.css', 'utf8');
        const tokens: Record<string, string> = { '--sidebar-w': '280px' };
        postcss.parse(readFileSync('app/globals.css', 'utf8')).walkDecls(d => { if (d.prop.startsWith('--')) tokens[d.prop] = d.value; });
        const original = postcss.parse(fixture.css);
        original.walkRules(r => { if (r.selector === ':root') r.walkDecls(d => { if (d.prop !== '--sidebar-w') tokens[d.prop] = d.value; }); });
        const resolve = (value: string): string => value.replace(/var\((--[\w-]+)\)/g, (_, key: string) => tokens[key] ? resolve(tokens[key]!) : key);
        const actual: { selector: string; media: string; values: Record<string, string> }[] = [];
        postcss.parse(css).walkRules(r => { const values: Record<string, string> = {}; r.walkDecls(d => { values[d.prop] = d.value; }); actual.push({ selector: r.selectors.join(','), media: r.parent?.type === 'atrule' ? (r.parent as postcss.AtRule).params : '', values }); });
        original.walkRules(r => {
            if (r.selector === ':root') return;
            const selector = r.selectors.map(s => ['html', 'body'].includes(s) ? '.iso-22123-3-page' : '.iso-22123-3-page ' + s).join(',');
            const matches = actual.filter(a => a.selector === selector && a.media === (r.parent?.type === 'atrule' ? (r.parent as postcss.AtRule).params : ''));
            r.walkDecls(d => {
                if ((d.prop === 'z-index' && ['.sidebar', '.nav-toggle'].includes(r.selector)) || (d.prop === 'max-width' && r.selector === '.mermaid-diagram svg') || d.prop === 'font-family' || d.prop === 'scroll-margin-top' || (d.prop === 'top' && ['.sidebar', '.nav-toggle'].includes(r.selector))) return;
                const prop = d.prop === 'word-break' && d.value === 'break-word' ? 'overflow-wrap' : d.prop;
                const expected = prop !== d.prop ? 'anywhere' : resolve(d.value);
                expect(matches.some(a => a.values[prop] !== undefined && resolve(a.values[prop]!) === expected), selector + ' ' + prop).toBe(true);
            });
        });
        expect(css).toContain('list-style-type: disc');
        expect(css).toContain('list-style-type: decimal');
        expect(css).toContain('max-width: none');
        expect(actual.find(rule => rule.selector === '.iso-22123-3-page .sidebar')?.values.top).toBe('calc(var(--header-h, 60px) + var(--disclaimer-height, 0px) + 0px)');
        expect(actual.find(rule => rule.selector === '.iso-22123-3-page .sidebar')?.values['z-index']).toBe('40');
        expect(css).toContain('var(--header-h, 60px)');
        expect(css).toContain('visibility: hidden');
        expect(css).not.toMatch(/^[\t ]*--[\w-]+\s*:/m);
        expect(css).not.toContain('@layer');
    });
});
