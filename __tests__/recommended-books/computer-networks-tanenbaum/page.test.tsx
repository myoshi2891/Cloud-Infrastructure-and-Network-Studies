import fs from 'node:fs';
import postcss from 'postcss';
import { act, fireEvent, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import inventory from '@/docs/migration-inventory/computer-networks-tanenbaum.json';
import fidelity from '@/docs/migration-inventory/computer-networks-tanenbaum.fidelity.json';
import design from '@/docs/migration-inventory/computer-networks-tanenbaum.design.json';
import Page from '@/app/recommended-books/computer-networks-tanenbaum/page';
import { DIAGRAMS, NAV_ITEMS } from '@/app/recommended-books/computer-networks-tanenbaum/constants';
import { extractBodyContent, squash, codeBlockSelector } from '@/__tests__/helpers/migration-test-utils';
import { snapshotTables, snapshotTexts, snapshotSupplemental, snapshotInlineCode } from '@/scripts/archive-fidelity-extraction.mjs';
import { snapshotTanenbaumStructure, snapshotCssRules } from '@/scripts/tanenbaum-fidelity.mjs';
import { FIDELITY_PAGES } from '@/scripts/archive-fidelity-config.mjs';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});
afterEach(() => {
    vi.unstubAllGlobals();
    window.history.replaceState(null, '', '/');
});
const mount = () => render(<Page />).container;

describe('Tanenbaum 原本の全量照合', () => {
    it.each(['h1', 'h2', 'h3', 'h4', 'th', 'td'] as const)('%s: 全文・順序・件数', tag => {
        expect([...mount().querySelectorAll(tag)].map(el => squash(el.textContent ?? ''))).toEqual(inventory[tag].map(squash));
    });
    it('全64本文リスト項目・17リストの種別と開始番号・全47目次・全参照・10チェック項目', () => {
        const root = mount();
        expect([...root.querySelectorAll('main li')].map(el => squash(el.textContent ?? ''))).toEqual(inventory.listItems.map(squash));
        expect(snapshotTanenbaumStructure(root)).toEqual(design.structure);
        expect(NAV_ITEMS.map(item => ({ href: `#${item.id}`, text: squash(item.label) }))).toEqual(design.structure.navigation);
        expect(root.querySelectorAll('nav ul > li')).toHaveLength(47);
    });
    it('全26外部リンクの表示文・URL・順序と重複', () => {
        expect([...mount().querySelectorAll('a[href^="http"]')].map(el => ({ href: el.getAttribute('href'), text: squash(el.textContent ?? '') }))).toEqual(inventory.links.map(link => ({ ...link, text: squash(link.text) })));
    });
    it('全66本文・注釈、装飾文、参考文献、注意枠、インラインコード', () => {
        const root = mount();
        const config = FIDELITY_PAGES['computer-networks-tanenbaum'];
        if (!config?.textSelector || !config.supplementalSelector) throw new Error('fixture設定が不足');
        expect(extractBodyContent(root)).toEqual(inventory.bodyContent);
        expect(snapshotTexts(root, config.textSelector)).toEqual(fidelity.texts);
        expect(snapshotSupplemental(root, config.supplementalSelector)).toEqual(fidelity.supplemental);
        expect(snapshotInlineCode(root)).toEqual(fidelity.inlineCode);
    });
    it('12表の全行列・結合属性・thead・列見出しscope', () => {
        const root = mount();
        expect(snapshotTables(root)).toEqual(fidelity.tables);
        const tables = [...root.querySelectorAll('table')];
        expect(tables).toHaveLength(12);
        expect(tables.map(table => table.querySelectorAll('thead th[scope="col"]').length)).toEqual(inventory.structures.tableColumnHeaders);
    });
    it('21図のDSL全文・順序・自然倍率・説明と、図以外のコード・画像の件数', () => {
        const root = mount();
        const diagrams = [...root.querySelectorAll('[data-testid="mermaid-diagram"]')];
        expect(diagrams).toHaveLength(21);
        expect(Object.values(DIAGRAMS)).toEqual(design.diagrams);
        expect(diagrams.map(el => el.getAttribute('data-chart'))).toEqual(design.diagrams);
        expect([...root.querySelectorAll('.main > .mermaid-wrap')].map(el => el.previousElementSibling?.textContent?.replace(/\s+/g, ' ').trim())).toEqual(design.diagramPredecessors);
        for (const diagram of diagrams) {
            expect(diagram.getAttribute('aria-label')?.trim()).toBeTruthy();
            expect(diagram).toHaveAttribute('data-preserve-natural-scale', 'true');
        }
        expect(root.querySelectorAll(codeBlockSelector)).toHaveLength(0);
        expect(root.querySelectorAll('img, svg, script')).toHaveLength(0);
    });
    it('原本の全IDを保持し、内部リンクの到達先が存在する', () => {
        const root = mount();
        const ids = [...root.querySelectorAll('[id]')].map(el => el.id);
        expect(new Set(ids).size).toBe(ids.length);
        for (const a of root.querySelectorAll('a[href^="#"]')) {
            expect(root.querySelector(a.getAttribute('href')!), a.textContent ?? '').not.toBeNull();
        }
    });
});

describe('Tanenbaum の操作', () => {
    it('モバイル開閉・Escape・リンク後の閉鎖、ハッシュ更新後のフォーカス', () => {
        const root = mount();
        const toggle = root.querySelector<HTMLButtonElement>('.sidebar-toggle')!;
        expect(toggle).toHaveAttribute('aria-expanded', 'false');
        fireEvent.click(toggle);
        expect(toggle).toHaveAttribute('aria-expanded', 'true');
        fireEvent.keyDown(window, { key: 'Escape' });
        expect(toggle).toHaveAttribute('aria-expanded', 'false');
        fireEvent.click(toggle);
        const target = root.querySelector<HTMLElement>('#step4-2')!;
        const focus = vi.spyOn(target, 'focus').mockImplementation(() => {
            expect(window.location.hash).toBe('#step4-2');
        });
        fireEvent.click(root.querySelector('nav a[href="#step4-2"]')!);
        expect(focus).toHaveBeenCalledOnce();
        focus.mockRestore();
        fireEvent.click(root.querySelector('nav a[href="#step5"]')!);
        expect(root.querySelector('#step5')).toHaveFocus();
        expect(root.querySelector('nav a[href="#step5"]')).toHaveAttribute('aria-current', 'location');
        expect(toggle).toHaveAttribute('aria-expanded', 'false');
        expect(root.querySelectorAll('button:not([type="button"])')).toHaveLength(0);
    });
    it('10項目のカウントを選択・解除に追従させる', () => {
        const root = mount();
        const checks = [...root.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')];
        expect(checks).toHaveLength(10);
        const count = root.querySelector('.checklist-header .count')!;
        expect(count).toHaveTextContent('0 / 10 完了');
        checks.forEach(check => fireEvent.click(check));
        expect(count).toHaveTextContent('10 / 10 完了');
        fireEvent.click(checks[0]!);
        expect(count).toHaveTextContent('9 / 10 完了');
    });
    it('初期hash・hashchange・popstate・不正なhashを扱う', () => {
        window.history.replaceState(null, '', '/#step3');
        const root = mount();
        expect(root.querySelector('nav a[href="#step3"]')).toHaveAttribute('aria-current', 'location');
        act(() => {
            window.history.pushState(null, '', '/#step6');
            window.dispatchEvent(new PopStateEvent('popstate'));
        });
        expect(root.querySelector('nav a[href="#step6"]')).toHaveAttribute('aria-current', 'location');
        act(() => {
            window.history.replaceState(null, '', '/#%E0%A4');
            window.dispatchEvent(new HashChangeEvent('hashchange'));
        });
        expect(root.querySelector('nav a[href="#step6"]')).toHaveAttribute('aria-current', 'location');
    });
    it('scroll spyの全47監視、現在地更新、末尾判定、アンマウント後の解除', () => {
        const observe = vi.fn();
        const disconnect = vi.fn();
        const remove = vi.spyOn(window, 'removeEventListener');
        let callback: IntersectionObserverCallback | undefined;
        vi.stubGlobal('IntersectionObserver', class {
            constructor(cb: IntersectionObserverCallback) { callback = cb; }
            observe = observe;
            disconnect = disconnect;
        });
        const { container, unmount } = render(<Page />);
        expect(observe.mock.calls.map(call => (call[0] as HTMLElement).id)).toEqual(design.structure.anchors);
        act(() => callback?.([{ isIntersecting: true, target: container.querySelector('#step7')! } as IntersectionObserverEntry], {} as IntersectionObserver));
        expect(container.querySelector('nav a[href="#step7"]')).toHaveAttribute('aria-current', 'location');
        vi.spyOn(document.documentElement, 'scrollHeight', 'get').mockReturnValue(2000);
        vi.stubGlobal('scrollY', 2000 - window.innerHeight);
        fireEvent.scroll(window);
        expect(container.querySelector('nav a[href="#references"]')).toHaveAttribute('aria-current', 'location');
        unmount();
        expect(disconnect).toHaveBeenCalledOnce();
        for (const event of ['hashchange', 'popstate', 'scroll', 'keydown']) {
            expect(remove.mock.calls.some(call => call[0] === event)).toBe(true);
        }
        remove.mockRestore();
    });
});

describe('Tanenbaum CSS全宣言とリストスタイル', () => {
    const cssPath = 'app/recommended-books/computer-networks-tanenbaum/page.css';
    const mappedSelector = (selector: string) => [...new Set(selector.split(',').map(part => {
        const s = part.trim();
        if (s === 'html' || s === 'body') return '.tanenbaum-page';
        return `.tanenbaum-page ${s.replace(/pre\.mermaid/g, '.mermaid-wrap')}`;
    }))].join(', ');
    const resolve = (value: string, vars: Map<string, string>): string => value.replace(/var\((--[\w-]+)\)/g, (_, key: string) => {
        const replacement = vars.get(key);
        if (!replacement) throw new Error(`未定義トークン: ${key}`);
        return resolve(replacement, vars);
    }).replace(/\s+/g, ' ').trim();
    it('全セレクタ・メディア条件・宣言・importantを原本と比較する', () => {
        const actual = snapshotCssRules(fs.readFileSync(cssPath, 'utf8'));
        const globalVars = new Map<string, string>();
        postcss.parse(fs.readFileSync('app/globals.css', 'utf8')).walkDecls(d => {
            if (d.prop.startsWith('--')) globalVars.set(d.prop, d.value);
        });
        const originalVars = new Map(design.rules.find(rule => rule.selector === ':root')!.declarations.map(d => [d.prop, d.value]));
        for (const rule of design.rules.filter(rule => rule.selector !== ':root')) {
            const found = actual.filter(r => r.selector.replace(/\s+/g, ' ') === mappedSelector(rule.selector).replace(/\s+/g, ' ') && r.media === rule.media);
            expect(found.length, rule.selector).toBe(design.rules.filter(r => r.selector !== ':root' && mappedSelector(r.selector) === mappedSelector(rule.selector) && r.media === rule.media).length);
            for (const d of rule.declarations) {
                // 個別の統合差分以外は省略・変更を認めない。
                const changed: Record<string, string[]> = {
                    body: ['font-family'], '.sidebar': ['top', 'width', 'z-index'],
                    '.sidebar-toggle': ['top', 'z-index'], '.main': ['margin-left'],
                    '.main h2': ['scroll-margin-top'], '.main h3': ['scroll-margin-top'],
                };
                if (changed[rule.selector]?.includes(d.prop)) continue;
                if (d.prop === 'word-break' && d.value === 'break-word') {
                    expect(found[0]?.declarations.find(p => p.prop === 'overflow-wrap')?.value).toBe('anywhere');
                    continue;
                }
                const expected = d.prop === 'overflow-wrap' && d.value === 'break-word' ? 'anywhere' : d.value;
                expect(found.some(r => r.declarations.some(p => p.prop === d.prop && resolve(p.value, globalVars) === resolve(expected, originalVars) && p.important === d.important)), `${rule.selector}: ${d.prop}`).toBe(true);
            }
        }
        expect(actual.flatMap(r => r.declarations).some(d => d.prop.startsWith('--'))).toBe(false);
    });
    it('通常リストは点・番号・外側配置、目次とチェックリストはマーカーなし', () => {
        const rules = snapshotCssRules(fs.readFileSync(cssPath, 'utf8'));
        for (const [selector, type] of [
            ['.tanenbaum-page .main ul', 'disc'],
            ['.tanenbaum-page .main ol', 'decimal'],
            ['.tanenbaum-page .checklist-card ul', 'none'],
            ['.tanenbaum-page .sidebar nav ul', 'none'],
        ]) {
            expect(rules.some(r => r.selector === selector && r.declarations.some(d => d.prop === 'list-style-type' && d.value === type)), selector).toBe(true);
        }
        expect(rules.some(r => r.declarations.some(d => d.prop === 'list-style-position' && d.value === 'outside'))).toBe(true);
        expect(fs.readFileSync(cssPath, 'utf8')).not.toMatch(/@layer|:global\(|word-break: break-word/);
    });
    it('図ラッパーに縮小・人工幅制限がなく、ServerからCSSをimportし、memo化する', () => {
        const css = fs.readFileSync(cssPath, 'utf8');
        expect(css).not.toMatch(/\.mermaid-wrap[^{}]*\{[^}]*max-width:\s*\d/);
        expect(fs.readFileSync('app/recommended-books/computer-networks-tanenbaum/page.tsx', 'utf8')).toContain("import './page.css'");
        expect(fs.readFileSync('app/recommended-books/computer-networks-tanenbaum/ComputerNetworksTanenbaumGuide.tsx', 'utf8')).toContain('memo(function Diagram');
    });
});
