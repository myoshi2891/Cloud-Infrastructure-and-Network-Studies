// @vitest-environment jsdom
import { readFileSync } from 'node:fs';
import { render, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import postcss from 'postcss';
import { JSDOM } from 'jsdom';
import Page from '@/app/standards/iso-iec-22123-2-2023/page';
import inventory from '@/docs/migration-inventory/iso-iec-22123-2-2023.json';
import fixture from '@/docs/migration-inventory/iso-iec-22123-2-2023.fidelity.json';
import { defineMigrationSuite } from '@/__tests__/helpers/migration-test-utils';
import { snapshotGuidePart } from '@/scripts/guide-fidelity-extraction.mjs';
import { snapshotSvgDiagrams } from '@/scripts/svg-fidelity-extraction.mjs';
import { snapshotGuideChecks } from '@/scripts/guide-interaction-extraction.mjs';

defineMigrationSuite('ISO/IEC 22123-2:2023 全量移行', Page, inventory);

describe('原本の構造・装飾・操作を保持する', () => {
    it('全文・表結合・強調・リンク・リスト階層・配置順と14図のSVGツリーが完全一致する', () => {
        const { container } = render(<Page />);
        expect(snapshotGuidePart(container.querySelector('main'))).toEqual(fixture.main);
        expect(snapshotSvgDiagrams(container).map(({ label: _label, ...svg }) => svg)).toEqual(fixture.svg.map(({ label: _label, ...svg }) => svg));
        expect(snapshotGuideChecks(container)).toEqual(fixture.checks);
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
        const toggle = getByRole('button', { name: '目次を開く' });
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

    it('全目次だけを監視し、scroll spy更新とcleanupを行う', () => {
        let callback: IntersectionObserverCallback | undefined;
        const observer = { observe: vi.fn(), disconnect: vi.fn() };
        vi.stubGlobal('IntersectionObserver', vi.fn(function (cb: IntersectionObserverCallback) { callback = cb; return observer; }));
        try {
            const { container, unmount } = render(<Page />);
            const anchors = [...container.querySelectorAll<HTMLAnchorElement>('.sidebar a')];
            expect(observer.observe.mock.calls.map(([element]) => element.id)).toEqual(anchors.map(a => a.getAttribute('href')!.slice(1)));
            const target = document.getElementById(anchors.at(-1)!.getAttribute('href')!.slice(1))!;
            act(() => callback?.([{ target, isIntersecting: true } as IntersectionObserverEntry], observer as unknown as IntersectionObserver));
            expect(anchors.at(-1)).toHaveAttribute('aria-current', 'location');
            unmount();
            expect(observer.disconnect).toHaveBeenCalledOnce();
        } finally { vi.unstubAllGlobals(); }
    });

    it('選定用9項目を全選択・一部解除・リセットし、進捗と完了通知を更新する', () => {
        const { container } = render(<Page />);
        const card = container.querySelector('.checklist-card')!;
        const boxes = [...card.querySelectorAll('input')];
        expect(boxes).toHaveLength(9);
        boxes.forEach(box => fireEvent.click(box));
        expect(card.querySelector('.cl-count')).toHaveTextContent('9 / 9');
        expect(card.querySelector('.cl-fill')).toHaveStyle({ width: '100%' });
        expect(card).toHaveClass('complete');
        fireEvent.click(boxes[0]!);
        expect(card).not.toHaveClass('complete');
        expect(card.querySelector('.cl-count')).toHaveTextContent('8 / 9');
        fireEvent.click(card.querySelector('.cl-reset')!);
        expect(card.querySelector('.cl-count')).toHaveTextContent('0 / 9');
        expect(card.querySelector('.cl-fill')).toHaveStyle({ width: '0%' });
        boxes.forEach(box => expect(box).not.toBeChecked());
    });

    it('10問の答えを一括開閉し、理解度・既知装飾・リセットを同期する', () => {
        const { container } = render(<Page />);
        const quiz = container.querySelector('.quiz-wrap')!;
        const details = [...quiz.querySelectorAll('details')];
        const buttons = [...quiz.querySelectorAll('.qbtn')];
        expect(details).toHaveLength(10);
        fireEvent.click(buttons[0]!);
        details.forEach(d => expect(d.open).toBe(true));
        fireEvent.click(buttons[1]!);
        details.forEach(d => expect(d.open).toBe(false));
        const boxes = [...quiz.querySelectorAll('input')];
        boxes.forEach(box => fireEvent.click(box));
        expect(quiz.querySelector('.q-count')).toHaveTextContent('10 / 10 理解できた');
        expect(quiz.querySelector('.q-fill')).toHaveStyle({ width: '100%' });
        expect(quiz.querySelectorAll('.q-card.known')).toHaveLength(10);
        fireEvent.click(buttons[0]!);
        fireEvent.click(buttons[2]!);
        boxes.forEach(box => expect(box).not.toBeChecked());
        details.forEach(d => expect(d.open).toBe(false));
        expect(quiz.querySelectorAll('.known')).toHaveLength(0);
        expect(quiz.querySelector('.q-count')).toHaveTextContent('0 / 10 理解できた');
        expect(quiz.querySelector('.q-fill')).toHaveStyle({ width: '0%' });
    });

    it('全CSS宣言を保持し、点・番号・detailsマーカーと固定ヘッダーの配置を明示する', () => {
        const css = readFileSync('app/standards/iso-iec-22123-2-2023/page.css', 'utf8');
        const tokens: Record<string, string> = { '--sidebar-w': '280px' };
        postcss.parse(readFileSync('app/globals.css', 'utf8')).walkDecls(d => { if (d.prop.startsWith('--')) tokens[d.prop] = d.value; });
        const original = postcss.parse(fixture.css);
        original.walkRules(r => { if (r.selector === ':root') r.walkDecls(d => { if (d.prop !== '--sidebar-w') tokens[d.prop] = d.value; }); });
        const resolve = (value: string): string => value.replace(/var\((--[\w-]+)\)/g, (_, key: string) => tokens[key] ? resolve(tokens[key]!) : key);
        const actual: { selector: string; media: string; values: Record<string, string> }[] = [];
        postcss.parse(css).walkRules(r => { const values: Record<string, string> = {}; r.walkDecls(d => { values[d.prop] = d.value; }); actual.push({ selector: r.selectors.join(','), media: r.parent?.type === 'atrule' ? (r.parent as postcss.AtRule).params : '', values }); });
        original.walkRules(r => {
            if (r.selector === ':root') return;
            const selector = r.selectors.map(s => ['html', 'body'].includes(s) ? '.iso-22123-2-page' : '.iso-22123-2-page ' + s).join(',');
            const matches = actual.filter(a => a.selector === selector && a.media === (r.parent?.type === 'atrule' ? (r.parent as postcss.AtRule).params : ''));
            r.walkDecls(d => {
                if (d.prop === 'font-family' || d.prop === 'scroll-margin-top' || (d.prop === 'top' && ['.sidebar', '.nav-toggle'].includes(r.selector))) return;
                const prop = d.prop === 'word-break' && d.value === 'break-word' ? 'overflow-wrap' : d.prop;
                const expected = prop !== d.prop ? 'anywhere' : resolve(d.value);
                expect(matches.some(a => a.values[prop] !== undefined && resolve(a.values[prop]!) === expected), selector + ' ' + prop).toBe(true);
            });
        });
        expect(css).toContain('list-style-type: disc');
        expect(css).toContain('list-style-type: decimal');
        expect(css).toContain('display: list-item');
        expect(css).toContain('var(--header-h, 60px)');
        expect(css).toContain('visibility: hidden');
        expect(css).not.toMatch(/^[\t ]*--[\w-]+\s*:/m);
        expect(css).not.toContain('@layer');
    });
});
