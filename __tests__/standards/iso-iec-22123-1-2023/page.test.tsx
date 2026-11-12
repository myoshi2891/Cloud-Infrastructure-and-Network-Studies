// @vitest-environment jsdom
import { readFileSync } from 'node:fs';
import { render, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import postcss from 'postcss';
import Page from '@/app/standards/iso-iec-22123-1-2023/page';
import inventory from '@/docs/migration-inventory/iso-iec-22123-1-2023.json';
import fixture from '@/docs/migration-inventory/iso-iec-22123-1-2023.fidelity.json';
import { defineMigrationSuite } from '@/__tests__/helpers/migration-test-utils';
import { snapshotGuidePart } from '@/scripts/guide-fidelity-extraction.mjs';
import { snapshotSvgDiagrams } from '@/scripts/svg-fidelity-extraction.mjs';
import { snapshotGuideChecks } from '@/scripts/guide-interaction-extraction.mjs';

defineMigrationSuite('ISO/IEC 22123-1:2023 全量移行', Page, inventory);

describe('SVG・原本CSS・リストとインタラクション', () => {
    it('原本のscroll spyと目次内の自動スクロールを保持し、18項目だけを監視する', () => {
        let notify: IntersectionObserverCallback | undefined;
        const observer = { observe: vi.fn<(element: Element) => void>(), disconnect: vi.fn() };
        vi.stubGlobal('IntersectionObserver', vi.fn(function (callback: IntersectionObserverCallback) { notify = callback; return observer; }));
        try {
            const { container, unmount } = render(<Page />);
            expect(observer.observe.mock.calls.map(([element]) => element.id)).toEqual(fixture.nav.map(item => item.href.slice(1)));
            const link = container.querySelector('.sidebar li:last-child a') as HTMLAnchorElement;
            const sidebar = container.querySelector('.sidebar') as HTMLElement;
            Object.defineProperty(sidebar, 'clientHeight', { value: 300 });
            Object.defineProperty(link, 'offsetTop', { value: 600 });
            Object.defineProperty(link, 'offsetHeight', { value: 40 });
            const scroll = vi.fn();
            link.scrollIntoView = scroll;
            const target = container.querySelector('h2#参考ソース一覧url')!;
            for (const [heading] of observer.observe.mock.calls) {
                vi.spyOn(heading, 'getBoundingClientRect').mockReturnValue({ top: heading === target ? 0 : 1000 } as DOMRect);
            }
            act(() => notify?.([{ target, isIntersecting: true } as IntersectionObserverEntry], observer as unknown as IntersectionObserver));
            expect(link).toHaveAttribute('aria-current', 'location');
            expect(sidebar.scrollTop).toBe(340);
            expect(scroll).not.toHaveBeenCalled();
            unmount();
            expect(observer.disconnect).toHaveBeenCalledOnce();
        } finally { vi.unstubAllGlobals(); }
    });
    it('全文、表の結合、順序、リスト階層、装飾要素とリンクが原本と一致する', () => {
        const { container } = render(<Page />);
        expect(snapshotGuidePart(container.querySelector('main'))).toEqual(fixture.main);
        expect(container.querySelectorAll('table')).toHaveLength(37);
        expect(container.querySelectorAll('.mermaid-diagram')).toHaveLength(15);
        expect(snapshotSvgDiagrams(container)).toEqual(fixture.svg);
        for (const diagram of container.querySelectorAll('.mermaid-diagram')) {
            expect(diagram.querySelector('.svg-source')).toHaveAttribute('data-preserve-natural-scale', 'true');
            expect(diagram.tagName).toBe('SECTION');
            expect(diagram).toHaveAttribute('tabIndex', '0');
            expect(diagram).toHaveRole('region');
        }
        expect(snapshotGuideChecks(container)).toEqual(fixture.checks);
    });

    it('全18目次の文言とリンク先を維持し、開いた目次をリンク操作で閉じてフォーカスを移す', async () => {
        const user = userEvent.setup();
        const { container, getByRole } = render(<Page />);
        expect([...container.querySelectorAll('.sidebar a')].map(a => ({ href: a.getAttribute('href'), text: a.textContent?.replace(/\s+/g, ' ').trim() }))).toEqual(fixture.nav);
        const toggle = getByRole('button', { name: '目次を開閉' });
        await user.click(toggle);
        expect(container.querySelector('.sidebar')).toHaveClass('open');
        const link = container.querySelector('.sidebar a') as HTMLAnchorElement;
        await user.click(link);
        expect(container.querySelector('.sidebar')).not.toHaveClass('open');
        expect(link).toHaveAttribute('aria-current', 'location');
        expect(document.activeElement?.id).toBe(link.getAttribute('href')!.slice(1));
    });

    it('10項目の全チェック・解除で件数と進捗バーを正確に更新する', () => {
        const { container, getAllByRole } = render(<Page />);
        const boxes = getAllByRole('checkbox');
        expect(boxes).toHaveLength(10);
        boxes.forEach(box => { fireEvent.click(box); });
        expect(container.querySelector('.cp-count')).toHaveTextContent('10 / 10');
        expect(container.querySelector('.cp-fill')).toHaveStyle({ width: '100%' });
        fireEvent.click(boxes[0]!);
        expect(container.querySelector('.cp-count')).toHaveTextContent('9 / 10');
        expect(container.querySelector('.cp-fill')).toHaveStyle({ width: '90%' });
    });

    it('原本CSSの全ルール・全宣言をグローバルトークンに対応付けて保持する', () => {
        const css = readFileSync('app/standards/iso-iec-22123-1-2023/page.css', 'utf8');
        const globals = postcss.parse(readFileSync('app/globals.css', 'utf8'));
        const tokens: Record<string, string> = { '--sidebar': '280px' };
        globals.walkDecls(decl => { if (decl.prop.startsWith('--')) tokens[decl.prop] = decl.value; });
        const original = postcss.parse(fixture.css);
        original.walkRules(rule => { if (rule.selector === ':root') rule.walkDecls(decl => { if (decl.prop !== '--sidebar') tokens[decl.prop] = decl.value; }); });
        /** 参照先を再帰展開し、原本と移行後の色・寸法の実値を比較する。 */
        const resolve = (value: string): string => value.replace(/var\((--[\w-]+)\)/g, (_all, key: string) => tokens[key] ? resolve(tokens[key]!) : key);
        const actual: { selector: string; media: string; declarations: Record<string, string> }[] = [];
        postcss.parse(css).walkRules(rule => {
            const declarations: Record<string, string> = {};
            rule.walkDecls(decl => { declarations[decl.prop] = decl.value; });
            actual.push({ selector: rule.selector, media: rule.parent?.type === 'atrule' ? (rule.parent as postcss.AtRule).params : '', declarations });
        });
        // 固定SVGは実寸のまま描画し、広い図を領域内で横スクロールする。
        expect(actual.find(rule => rule.selector === '.iso-22123-page .mermaid-diagram')?.declarations).toMatchObject({ 'overflow-x': 'auto' });
        expect(actual.find(rule => rule.selector === '.iso-22123-page .mermaid-diagram svg')?.declarations).toMatchObject({ 'max-width': 'none', 'flex-shrink': '0' });
        original.walkRules(rule => {
            if (rule.selector === ':root') return;
            const selector = rule.selectors.map(s => ['html', 'body'].includes(s) ? '.iso-22123-page' : `.iso-22123-page ${s}`).join(',');
            const media = rule.parent?.type === 'atrule' ? (rule.parent as postcss.AtRule).params : '';
            const matches = actual.filter(r => r.selector.replace(/\s*,\s*/g, ',') === selector && r.media === media);
            rule.walkDecls(decl => {
                if (decl.prop === 'font-family') return; // 既存の自己ホストfontトークンへ対応付ける。
                expect(matches.some(r => r.declarations[decl.prop] !== undefined && resolve(r.declarations[decl.prop]!) === resolve(decl.value)), `${selector}: ${decl.prop}`).toBe(true);
            });
        });
        expect(css).not.toMatch(/^[\t ]*--[\w-]+\s*:/m);
        expect(css).toContain('list-style-type: disc');
        expect(css).toContain('list-style-type: decimal');
        expect(css).toContain('visibility: hidden');
    });
});
