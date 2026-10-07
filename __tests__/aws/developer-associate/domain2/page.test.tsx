// @vitest-environment jsdom
import { readFileSync } from 'node:fs';
import { act, fireEvent, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import postcss from 'postcss';
import Page from '@/app/aws/developer-associate/domain2/page';
import { Step0 } from '@/app/aws/developer-associate/domain2/sections/Step0';
import { DIAGRAMS, NAV_ITEMS } from '@/app/aws/developer-associate/domain2/constants';
import inventory from '@/docs/migration-inventory/aws-dva-domain2-security.json';
import design from '@/docs/migration-inventory/aws-dva-domain2-security.design.json';
import mermaidTheme from '@/docs/migration-inventory/aws-dva-domain2-security.mermaid.json';
import { codeBlockSelector, codeLineCount, extractBodyContent, squash } from '@/__tests__/helpers/migration-test-utils';
import { snapshotDvaSecurity } from '@/scripts/dva-security-fidelity.mjs';
import { snapshotCssRules } from '@/scripts/tanenbaum-fidelity.mjs';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});
vi.mock('@/app/aws/developer-associate/domain2/sections/Step0', async importOriginal => {
    const original = await importOriginal<typeof import('@/app/aws/developer-associate/domain2/sections/Step0')>();
    return { Step0: vi.fn(original.Step0) };
});
afterEach(() => { vi.unstubAllGlobals(); window.history.replaceState(null, '', '/'); });
const mount = () => render(<Page />).container;
const route = 'app/aws/developer-associate/domain2';

describe('DVA Security 全量移行', () => {
    it.each(['h1','h2','h3','h4','th','td','listItems'] as const)('%s の全文・件数・順序', key => {
        const selector = key === 'listItems' ? 'main li' : key;
        expect([...mount().querySelectorAll(selector)].map(el => squash(el.textContent ?? ''))).toEqual(inventory[key].map(squash));
    });
    it('外部リンクの重複・出現順・URLを保持', () => {
        expect([...mount().querySelectorAll('a[href^="http"]')].map(el => el.getAttribute('href'))).toEqual(inventory.links.map(link => link.href));
    });
    it('本文・注釈・コード全文を順序一致で保持', () => {
        expect(extractBodyContent(mount())).toEqual(inventory.bodyContent);
    });
    it('全文・表構造・リスト種類・details・図の配置まで一致', () => {
        expect(snapshotDvaSecurity(mount())).toEqual(design.structure);
    });
    it('全表のthead・列見出し数・scope、全図の説明と自然倍率', () => {
        const root = mount();
        const tables = [...root.querySelectorAll('table')];
        expect(tables).toHaveLength(inventory.counts.table);
        tables.forEach((table, i) => {
            expect(table.querySelector('thead')).not.toBeNull();
            expect(table.querySelectorAll('thead th[scope="col"]')).toHaveLength(inventory.structures.tableColumnHeaders[i]!);
        });
        const diagrams = [...root.querySelectorAll('[data-testid="mermaid-diagram"]')];
        expect(diagrams).toHaveLength(inventory.counts.diagram);
        const theme = { fontFamily: '"Noto Sans JP",sans-serif', fontSize: '16px', primaryColor: '#eceefb', primaryBorderColor: '#3b3f9e', primaryTextColor: '#1c2333', lineColor: '#4a5266', secondaryColor: '#fff8e6', tertiaryColor: '#f2ede0', actorBkg: '#eceefb', actorBorder: '#3b3f9e', noteBkgColor: '#fff8e6', noteBorderColor: '#b8892b' };
        diagrams.forEach((el, index) => {
            const chart = el.getAttribute('data-chart')!;
            const init = chart.match(/^%%\{init: (.+)\}%%\n/);
            expect(init, '原本のMermaid設定を注入').not.toBeNull();
            expect(mermaidTheme.source.themeVariables).toEqual(theme);
            expect(JSON.parse(init![1]!)).toEqual({ ...mermaidTheme.resolved, themeVariables: { ...mermaidTheme.resolved.themeVariables, fontFamily: '"Noto Sans JP Variable","Noto Sans JP",sans-serif', fontSize: '14px' } });
            expect(chart.slice(init![0].length)).toBe(design.charts[index]);
        });
        expect(Object.values(DIAGRAMS)).toEqual(design.charts);
        diagrams.forEach(el => {
            expect(el.getAttribute('aria-label')?.trim()).toBeTruthy();
            expect(el).toHaveAttribute('data-preserve-natural-scale', 'true');
        });
        expect(root.querySelectorAll('img, svg')).toHaveLength(inventory.counts.figure);
    });
    it('コード40ブロックの全行・空行・インデント・言語属性', () => {
        const blocks = [...mount().querySelectorAll(codeBlockSelector)].filter(el => !el.parentElement?.closest(codeBlockSelector));
        expect(blocks).toHaveLength(inventory.counts.codeBlock);
        blocks.forEach((block, i) => {
            expect(block.querySelector(':scope > .code-line')).not.toBeNull();
            expect(codeLineCount(block)).toBe(inventory.structures.codeLines[i]);
            expect(block.getAttribute('data-language')).toMatch(/json|bash|python|ini|http|javascript|sql|text/);
        });
    });
    it('JSON・CLI・Python・SQLの構文色が保持される', () => {
        const root = mount();
        for (const lang of ['json','bash','python','sql']) {
            expect(root.querySelector(`[data-language="${lang}"] .hljs-string, [data-language="${lang}"] .hljs-keyword, [data-language="${lang}"] .hljs-comment`)).not.toBeNull();
        }
    });
    it('空の列見出し・横スクロール表・図とコードの説明がアクセス可能', () => {
        const root = mount();
        for (const header of root.querySelectorAll('th')) {
            if (!header.textContent?.trim()) expect(header).toHaveAttribute('aria-hidden', 'true');
        }
        for (const wrap of root.querySelectorAll('.table-wrap')) {
            expect(wrap).toHaveAttribute('tabindex', '0');
            expect(wrap.getAttribute('aria-label')?.trim()).toBeTruthy();
        }
        const labels = [...root.querySelectorAll('[role="region"]')].map(el => el.getAttribute('aria-label'));
        expect(new Set(labels).size).toBe(labels.length);
    });
    it('チェック変更で静的な本文を再描画しない', () => {
        vi.mocked(Step0).mockClear();
        const root = mount();
        fireEvent.click(root.querySelector('li.chk input')!);
        fireEvent.click(root.querySelector('li.chk input')!);
        expect(Step0).toHaveBeenCalledOnce();
    });
    it('全チェックリストを操作すると件数とdone装飾が連動し、解除できる', () => {
        const root = mount();
        const inputs = [...root.querySelectorAll<HTMLInputElement>('li.chk input')];
        expect(inputs).toHaveLength(design.structure.checks.length);
        expect(root.querySelector('#pcount')).toHaveTextContent(`0 / ${inputs.length}`);
        inputs.forEach((input, i) => {
            fireEvent.click(input);
            expect(input).toBeChecked();
            expect(input.closest('li')).toHaveClass('done');
            expect(root.querySelector('#pcount')).toHaveTextContent(`${i + 1} / ${inputs.length}`);
        });
        inputs.forEach(input => fireEvent.click(input));
        expect(root.querySelectorAll('li.done')).toHaveLength(0);
        expect(root.querySelector('#pcount')).toHaveTextContent(`0 / ${inputs.length}`);
    });
    it('目次の26リンクは単一正本で全ターゲットへ移動しhashとfocusが連動', () => {
        const root = mount();
        expect(NAV_ITEMS.map(item => item.id)).toEqual(design.structure.anchors);
        expect(root.querySelectorAll('nav ul > li')).toHaveLength(NAV_ITEMS.length);
        NAV_ITEMS.forEach(item => {
            const link = root.querySelector<HTMLAnchorElement>(`nav a[href="#${item.id}"]`)!;
            fireEvent.click(link);
            expect(window.location.hash).toBe(`#${item.id}`);
            expect(root.querySelector(`#${item.id}`)).toHaveFocus();
            expect(link).toHaveAttribute('aria-current', 'location');
        });
    });
    it('モバイル開閉・Escape・背景クリック・リンク移動', () => {
        const root = mount();
        const toggle = root.querySelector('#menuBtn')!;
        expect(toggle).toHaveAttribute('type', 'button');
        expect(toggle).toHaveAttribute('aria-expanded', 'false');
        fireEvent.click(toggle);
        expect(toggle).toHaveAttribute('aria-expanded', 'true');
        fireEvent.keyDown(window, { key: 'Escape' });
        expect(toggle).toHaveAttribute('aria-expanded', 'false');
        expect(toggle).toHaveFocus();
        fireEvent.click(toggle);
        fireEvent.click(root.querySelector('.sidebar-backdrop')!);
        expect(toggle).toHaveAttribute('aria-expanded', 'false');
        fireEvent.click(toggle);
        fireEvent.click(root.querySelector('a[href="#step-1"]')!);
        expect(toggle).toHaveAttribute('aria-expanded', 'false');
    });
    it('scroll spy・hash変更・履歴移動・observer cleanup', () => {
        let callback: IntersectionObserverCallback | undefined;
        const observe = vi.fn(), disconnect = vi.fn();
        let options: IntersectionObserverInit | undefined;
        vi.stubGlobal('IntersectionObserver', class {
            constructor(cb: IntersectionObserverCallback, init: IntersectionObserverInit) { callback = cb; options = init; }
            observe = observe;
            disconnect = disconnect;
        });
        const { container, unmount } = render(<Page />);
        expect(options?.rootMargin).toBe(`0px 0px -${Math.round(window.innerHeight * 0.65)}px 0px`);
        expect(observe.mock.calls.map(call => (call[0] as HTMLElement).id)).toEqual(design.structure.anchors);
        act(() => callback?.([{ isIntersecting: true, target: container.querySelector('#step-7')! } as IntersectionObserverEntry], {} as IntersectionObserver));
        expect(container.querySelector('a[href="#step-7"]')).toHaveAttribute('aria-current', 'location');
        window.history.replaceState(null, '', '#step-3');
        fireEvent(window, new Event('hashchange'));
        expect(container.querySelector('a[href="#step-3"]')).toHaveAttribute('aria-current', 'location');
        window.history.replaceState(null, '', '#step-4');
        fireEvent(window, new Event('popstate'));
        expect(container.querySelector('a[href="#step-4"]')).toHaveAttribute('aria-current', 'location');
        unmount();
        expect(disconnect).toHaveBeenCalledOnce();
    });
});

const cssPath = `${route}/page.css`;
const tokens: Record<string, string> = Object.fromEntries(
    ['paper','paper-alt','ink','ink-soft','indigo','indigo-soft','gold','forest','plum','border'].map(name => [`--${name}`, `--color-dva-${name}`]),
);
const scopedSelector = (selector: string) => [...new Set(selector.split(',').map(part => {
    const s = part.trim();
    return s === 'html' || s === 'body' ? '.dva-security-page' : `.dva-security-page ${s.replace(/\.code-block pre code/g, ".code-block code").replace(/\.code-block pre/g, ".code-block")}`;
}))].join(', ');
const mappedValue = (value: string, prop: string) => (prop === 'font-size' && value.endsWith('rem') ? `${Number(((value === '1.0625rem' ? 1 : Number.parseFloat(value)) * 0.875).toFixed(8))}rem` : value)
    .replace('rgba(250,247,240,.95)', 'color-mix(in srgb, var(--color-dva-paper) 95%, transparent)')
    .replace(/var\((--[\w-]+)\)/g, (_, name: string) => name === '--sidebar' ? '300px' : `var(${tokens[name] ?? name})`)
    .replace(/#[\da-f]{3,6}\b/gi, hex => `var(--color-dva-${hex.slice(1).toLowerCase()})`)
    .replace(/"Noto Sans JP",system-ui,sans-serif/g, 'var(--font-body)')
    .replace(/"Source Serif 4","Noto Sans JP",serif/g, 'var(--font-dva-serif)')
    .replace(/"JetBrains Mono",ui-monospace,Menlo,Consolas,monospace/g, 'var(--font-mono)');

describe('DVA CSS全宣言・リスト装飾', () => {
    it('本文・表・コード・目次・図を14pxにし、他ページのルート文字サイズを変更しない', () => {
        const css = readFileSync(cssPath, 'utf8');
        const rules = snapshotCssRules(css);
        for (const selector of ['.dva-security-page','.dva-security-page table','.dva-security-page code','.dva-security-page .nav-a']) expect(rules.some(r => r.selector === selector && r.declarations.some(d => d.prop === 'font-size' && d.value === '0.875rem')), selector).toBe(true);
        expect(css).toContain('.dva-security-page .diagram-wrap .mermaid-target');
        expect(css).toContain('font-size: 14px !important');
        expect(rules.filter(r => r.declarations.some(d => d.prop === 'font-size')).every(r => r.selector.startsWith('.dva-security-page'))).toBe(true);
    });

    it('原本のroot配色と固定色を実値で一致させ、見出しフォントと図もライトテーマ', () => {
        const globals: Record<string, string> = {};
        postcss.parse(readFileSync('app/globals.css', 'utf8')).walkDecls(d => { if (d.prop.startsWith('--')) globals[d.prop] = d.value; });
        const root = design.rules.find(rule => rule.selector === ':root')!;
        for (const decl of root.declarations.filter(d => d.prop !== '--sidebar')) expect(globals[tokens[decl.prop]!], decl.prop).toBe(decl.value);
        for (const rule of design.rules.filter(r => r.selector !== ':root')) for (const decl of rule.declarations) for (const [hex] of decl.value.matchAll(/#[\da-f]{3,6}\b/gi)) expect(globals[`--color-dva-${hex.slice(1).toLowerCase()}`], hex).toBe(hex.toLowerCase());
        expect(globals['--font-dva-serif']).toContain("'Source Serif 4 Variable'");
        expect(readFileSync(`${route}/page.tsx`, 'utf8')).toContain("import '@fontsource-variable/source-serif-4/index.css'");
        expect(readFileSync(`${route}/Diagram.tsx`, 'utf8')).toContain('theme="light"');
    });

    it('原本の全セレクタ・メディア条件・CSS宣言を許可した統合差分以外保持', () => {
        const actual = snapshotCssRules(readFileSync(cssPath, 'utf8'));
        const integrationChanges: Record<string, string[]> = {
            html: ['scroll-padding-top'], body: ['overflow-wrap'],
            '.sidebar': ['inset'], '.progress': ['top'], '.mobile-bar': ['top','z-index'],
        };
        for (const rule of design.rules.filter(rule => rule.selector !== ':root')) {
            const candidates = actual.filter(r => r.selector === scopedSelector(rule.selector) && r.media === rule.media);
            expect(candidates.length, rule.selector).toBeGreaterThan(0);
            for (const decl of rule.declarations) {
                if (integrationChanges[rule.selector]?.includes(decl.prop)) continue;
                const value = mappedValue(decl.value, decl.prop);
                expect(candidates.some(r => r.declarations.some(d => d.prop === decl.prop && d.value === value && d.important === decl.important)), `${rule.selector}: ${decl.prop}: ${value}`).toBe(true);
            }
        }
        expect(actual.flatMap(r => r.declarations).filter(d => d.prop.startsWith('--'))).toEqual([]);
    });
    it('全テーマ参照が定義済み、固定色・layer・外部フォントが残っていない', () => {
        const css = readFileSync(cssPath, 'utf8');
        const globals = new Set<string>();
        postcss.parse(readFileSync('app/globals.css', 'utf8')).walkDecls(d => { if (d.prop.startsWith('--')) globals.add(d.prop); });
        for (const match of css.matchAll(/var\((--[\w-]+)/g)) {
            expect(globals.has(match[1]!) || ['--header-h','--disclaimer-height','--font-body','--font-display','--font-mono'].includes(match[1]!)).toBe(true);
        }
        expect(css).not.toMatch(/@layer|fonts.googleapis|word-break: break-word/);
        const rules = snapshotCssRules(css);
        expect(rules.filter(r => !r.selector.includes('.hljs-')).flatMap(r => r.declarations).filter(d => /#[\da-f]{3,6}\b/i.test(d.value))).toEqual([]);
        expect(readFileSync(`${route}/page.tsx`, 'utf8')).toContain("import './page.css'");
    });
    it('ulの点・olの番号・入れ子・チェック項目と目次のマーカーを明示', () => {
        const rules = snapshotCssRules(readFileSync(cssPath, 'utf8'));
        for (const [selector, type] of [
            ['.dva-security-page .main ul','disc'], ['.dva-security-page .main ol','decimal'],
            ['.dva-security-page .main ul ul','circle'], ['.dva-security-page li.chk','none'],
            ['.dva-security-page .sidebar ul','none'],
        ]) expect(rules.some(r => r.selector === selector && r.declarations.some(d => d.prop === 'list-style-type' && d.value === type)), selector).toBe(true);
        for (const selector of ['.dva-security-page .main ul','.dva-security-page .main ol']) {
            expect(rules.some(r => r.selector === selector && r.declarations.some(d => d.prop === 'list-style-position' && d.value === 'outside'))).toBe(true);
        }
        expect(rules.some(r => r.selector === '.dva-security-page .code-line' && r.declarations.some(d => d.prop === 'white-space' && d.value === 'pre'))).toBe(true);
    });
    it('コード枠の最終宣言で原本の外側余白と内側パディングを保持', () => {
        const rules = snapshotCssRules(readFileSync(cssPath, 'utf8')).filter(rule => rule.selector === '.dva-security-page .code-block' && !rule.media);
        const values = Object.fromEntries(rules.flatMap(rule => rule.declarations.map(decl => [decl.prop, decl.value])));
        expect(values.margin).toBe('14px 0');
        expect(values.padding).toBe('16px 18px');
    });
    it('Header下の固定配置・300px幅・モバイル幅・アンカー余白と自然図倍率', () => {
        const css = readFileSync(cssPath, 'utf8');
        const rules = snapshotCssRules(css);
        for (const [selector, prop, value] of [
            ['.dva-security-page .sidebar','width','300px'],
            ['.dva-security-page .main','width','calc(100% - 300px)'],
            ['.dva-security-page .main','margin-left','300px'],
        ]) expect(rules.some(r => !r.media && r.selector === selector && r.declarations.some(d => d.prop === prop && d.value === value))).toBe(true);
        expect(css).toContain('scroll-margin-top: calc(var(--header-h');
        expect(css).toContain('top: calc(var(--header-h');
        expect(css).not.toMatch(/\.diagram-wrap[^{}]*\{[^}]*max-width:\s*[0-9]+px/);
        expect(readFileSync(`${route}/Diagram.tsx`, 'utf8')).toContain('memo(function Diagram');
    });
});
