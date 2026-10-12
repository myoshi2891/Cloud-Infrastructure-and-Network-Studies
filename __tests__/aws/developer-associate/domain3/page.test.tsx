// @vitest-environment jsdom
import { readFileSync } from 'node:fs';
import { act, fireEvent, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import postcss from 'postcss';
import Page from '@/app/aws/developer-associate/domain3/page';
import { DIAGRAMS, NAV_ITEMS } from '@/app/aws/developer-associate/domain3/constants';
import inventory from '@/docs/migration-inventory/aws-dva-domain3-deployment.json';
import design from '@/docs/migration-inventory/aws-dva-domain3-deployment.design.json';
import theme from '@/docs/migration-inventory/aws-dva-domain3-deployment.mermaid.json';
import { codeBlockSelector, codeLineCount, extractBodyContent, squash } from '@/__tests__/helpers/migration-test-utils';
import { snapshotDvaDeployment, snapshotDeploymentSegment } from '@/scripts/dva-deployment-fidelity.mjs';
import { snapshotCssRules } from '@/scripts/tanenbaum-fidelity.mjs';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: vi.fn(MermaidDiagramMock) };
});
afterEach(() => { vi.unstubAllGlobals(); window.history.replaceState(null, '', '/'); });
const mount = () => render(<Page />).container;
const route = 'app/aws/developer-associate/domain3';
const normalizeSegments = (segments: { id: string; text: string }[]) => segments.map(segment => ({ ...segment, text: squash(segment.text) }));

describe('DVA Deployment 全量移行', () => {
    it.each(['h1','h2','h3','h4','th','td','listItems'] as const)('%s の全文・件数・順序', key => {
        const selector = key === 'listItems' ? 'main li' : key;
        expect([...mount().querySelectorAll(selector)].map(el => squash(el.textContent ?? ''))).toEqual(inventory[key].map(squash));
    });
    it('本文・注釈・コード全文の出現順が完全一致', () => {
        expect(extractBodyContent(mount())).toEqual(inventory.bodyContent);
    });
    it('外部リンクの重複・全文・href・target・relが完全一致', () => {
        expect(snapshotDvaDeployment(mount()).references).toEqual(design.structure.references);
    });
    it('全構造・表結合・配置・リスト・details・hero・footerが完全一致', () => {
        const actual = snapshotDvaDeployment(mount());
        expect({ ...actual, segments: normalizeSegments(actual.segments) }).toEqual({ ...design.structure, segments: normalizeSegments(design.structure.segments) });
    });
    it.each(design.structure.segments.map(segment => [segment.id, segment.text] as const))('段階検証 %s の本文全文', (id, text) => {
        const actual = snapshotDeploymentSegment(mount(), id);
        expect(actual).toBeDefined();
        expect(squash(actual!.text)).toBe(squash(text));
    });
    it('全80表のthead・scope・列見出し数を照合', () => {
        const tables = [...mount().querySelectorAll('table')];
        expect(tables).toHaveLength(inventory.counts.table);
        tables.forEach((table, i) => {
            expect(table.querySelector('thead')).not.toBeNull();
            expect(table.querySelectorAll('thead th[scope="col"]')).toHaveLength(inventory.structures.tableColumnHeaders[i]!);
        });
    });
    it('全39図のDSL・順序・原本テーマ・14px・説明・自然倍率を保持', () => {
        const root = mount();
        const diagrams = [...root.querySelectorAll('[data-testid="mermaid-diagram"]')];
        expect(diagrams).toHaveLength(inventory.counts.diagram);
        expect(DIAGRAMS).toEqual(design.charts);
        const charts = Object.values(design.charts);
        diagrams.forEach((el, index) => {
            const chart = el.getAttribute('data-chart')!;
            const frontmatter = chart.match(/^---\nconfig: (.+)\n---\n/);
            expect(frontmatter).not.toBeNull();
            expect(JSON.parse(frontmatter![1]!)).toEqual({ ...theme.resolved, themeVariables: { ...theme.resolved.themeVariables, fontFamily: '"Noto Sans JP Variable","Noto Sans JP",sans-serif', fontSize: '14px' } });
            expect(chart.slice(frontmatter![0].length)).toBe(charts[index]);
            expect(el.getAttribute('aria-label')?.trim()).toBeTruthy();
            expect(el).toHaveAttribute('data-preserve-natural-scale', 'true');
            expect(el).toHaveAttribute('data-theme', 'light');
        });
        const component = readFileSync(`${route}/Diagram.tsx`, 'utf8');
        expect(component).toContain('preserveChartTheme={true}');
        expect(component).toContain('memo(');
        expect(root.querySelectorAll('img, svg')).toHaveLength(inventory.counts.figure);
    });
    it('32コードの言語・全行・空行・インデントを保持', () => {
        const root = mount();
        const blocks = [...root.querySelectorAll(codeBlockSelector)];
        expect(blocks).toHaveLength(inventory.counts.codeBlock);
        blocks.forEach((block, i) => {
            expect(block.querySelectorAll(':scope > .code-line')).toHaveLength(inventory.structures.codeLines[i]!);
            expect(codeLineCount(block)).toBe(inventory.structures.codeLines[i]);
            expect(block.getAttribute('data-language')).toBe(design.languages[i]);
            expect([...block.querySelectorAll(':scope > .code-line')].map(el => el.textContent)).toEqual(design.structure.codes[i]!.lines);
        });
        for (const language of ['yaml', 'json', 'python', 'bash', 'dockerfile', 'toml']) {
            expect(root.querySelector(`[data-language="${language}"] [class^="hljs-"]`), language).not.toBeNull();
        }
        root.querySelectorAll('[data-language="text"]').forEach(el => expect(el.querySelector('[class^="hljs-"]')).toBeNull());
    });
    it('番号再開 start=4 と入れ子・全リストの種類を保持', () => {
        const root = mount();
        expect(snapshotDvaDeployment(root).lists).toEqual(design.structure.lists);
        expect(root.querySelector('ol[start="4"]')).not.toBeNull();
    });
    it('全detailsの解説とネイティブ開閉を保持', () => {
        const root = mount();
        expect(snapshotDvaDeployment(root).details).toEqual(design.structure.details);
        const details = root.querySelector('details')!;
        expect(details.open).toBe(false);
        details.open = true;
        expect(details.open).toBe(true);
        details.open = false;
        expect(details.open).toBe(false);
    });
    it('9チェック・件数・進捗・全完了メッセージ・解除が連動', () => {
        const root = mount();
        const checks = [...root.querySelectorAll<HTMLInputElement>('li.chk input')];
        expect(checks).toHaveLength(design.structure.checks.length);
        expect(root.querySelector('.cl-count')).toHaveTextContent('0 / 9');
        expect(root.querySelector('.cl-done')).toHaveAttribute('hidden');
        checks.forEach((input, i) => {
            fireEvent.click(input);
            expect(input).toBeChecked();
            expect(input.closest('li')).toHaveClass('done');
            expect(root.querySelector('.cl-count')).toHaveTextContent(`${i + 1} / 9`);
            expect(root.querySelector('.cl-fill')).toHaveStyle({ width: `${(i + 1) / 9 * 100}%` });
        });
        expect(root.querySelector('.cl-done')).not.toHaveAttribute('hidden');
        fireEvent.click(checks[0]!);
        expect(root.querySelector('.cl-done')).toHaveAttribute('hidden');
        checks.slice(1).forEach(input => fireEvent.click(input));
        expect(root.querySelectorAll('li.done')).toHaveLength(0);
        expect(root.querySelector('.cl-count')).toHaveTextContent('0 / 9');
    });
    it('チェック変更でmemo化された全図を再描画しない', async () => {
        const { MermaidDiagram } = await import('@/components/MermaidDiagram');
        const root = mount();
        vi.mocked(MermaidDiagram).mockClear();
        fireEvent.click(root.querySelector('li.chk input')!);
        fireEvent.click(root.querySelector('li.chk input')!);
        expect(MermaidDiagram).not.toHaveBeenCalled();
    });
    it('33目次は単一正本でh1/h2へhash・focus・現在地を連動', () => {
        const root = mount();
        const navigation = root.querySelector('nav')!;
        expect(NAV_ITEMS.map(item => item.id)).toEqual(design.structure.anchors);
        expect(root.querySelectorAll('nav ul > li')).toHaveLength(NAV_ITEMS.length);
        NAV_ITEMS.forEach((item, i) => {
            const link = navigation.querySelector<HTMLAnchorElement>(`a[href="#${item.id}"]`)!;
            expect(link).toHaveClass(...design.navClasses[i]!.split(' '));
            fireEvent.click(link);
            expect(window.location.hash).toBe(`#${item.id}`);
            expect(document.getElementById(item.id)).toHaveFocus();
            expect(link).toHaveAttribute('aria-current', 'location');
        });
    });
    it('モバイル開閉・Escape・背景クリック・リンク後閉じる', () => {
        const root = mount();
        const button = root.querySelector<HTMLButtonElement>('#mb')!;
        expect(button).toHaveAttribute('type', 'button');
        expect(button).toHaveAttribute('aria-controls', 'sb');
        fireEvent.click(button);
        expect(button).toHaveAttribute('aria-expanded', 'true');
        fireEvent.keyDown(window, { key: 'Escape' });
        expect(button).toHaveAttribute('aria-expanded', 'false');
        expect(button).toHaveFocus();
        fireEvent.click(button);
        fireEvent.click(root.querySelector('.sidebar-backdrop')!);
        expect(button).toHaveAttribute('aria-expanded', 'false');
        fireEvent.click(button);
        fireEvent.click(root.querySelector('a[href="#s9"]')!);
        expect(button).toHaveAttribute('aria-expanded', 'false');
    });
    it('observer・hash履歴・末尾の現在地・cleanup', () => {
        let callback: IntersectionObserverCallback | undefined;
        const observe = vi.fn(), disconnect = vi.fn();
        vi.stubGlobal('IntersectionObserver', class {
            constructor(cb: IntersectionObserverCallback) { callback = cb; }
            observe = observe;
            disconnect = disconnect;
        });
        // 実ブラウザ同様に非同期で積み、明示的に1フレーム進める
        const frames: FrameRequestCallback[] = [];
        vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => frames.push(cb));
        const flushFrame = () => act(() => { frames.splice(0).forEach(cb => cb(0)); });
        vi.stubGlobal('cancelAnimationFrame', vi.fn());
        const { container, unmount } = render(<Page />);
        expect(observe.mock.calls.map(call => (call[0] as HTMLElement).id)).toEqual(design.structure.anchors);
        // index 以前の見出しを読書位置より上、以降を下に置く
        const placeHeadingsAbove = (id: string) => {
            const index = NAV_ITEMS.findIndex(item => item.id === id);
            NAV_ITEMS.forEach((item, i) => {
                const heading = container.querySelector(`#${item.id}`) as HTMLElement;
                heading.getBoundingClientRect = () => ({ top: i <= index ? -100 : 2000 } as DOMRect);
            });
        };
        placeHeadingsAbove('s15');
        act(() => callback?.([{ isIntersecting: true, target: container.querySelector('#s15')! } as IntersectionObserverEntry], {} as IntersectionObserver));
        flushFrame();
        expect(container.querySelector('a[href="#s15"]')).toHaveAttribute('aria-current', 'location');
        // 下方向: 交差イベントがなくても scroll ごとに読書位置より上の最後の見出しへ追従する
        placeHeadingsAbove('s20');
        fireEvent.scroll(window);
        flushFrame();
        expect(container.querySelector('a[href="#s20"]')).toHaveAttribute('aria-current', 'location');
        // 上方向: 見出しが読書帯の下へ抜けても直前の見出しへ戻る
        placeHeadingsAbove('s9');
        fireEvent.scroll(window);
        flushFrame();
        expect(container.querySelector('a[href="#s9"]')).toHaveAttribute('aria-current', 'location');
        window.history.replaceState(null, '', '#s3');
        fireEvent(window, new Event('hashchange'));
        expect(container.querySelector('a[href="#s3"]')).toHaveAttribute('aria-current', 'location');
        window.history.replaceState(null, '', '#s21');
        fireEvent(window, new Event('popstate'));
        expect(container.querySelector('a[href="#s21"]')).toHaveAttribute('aria-current', 'location');
        vi.stubGlobal('scrollY', 1000);
        fireEvent.scroll(window);
        flushFrame();
        expect(container.querySelector('a[href="#s33"]')).toHaveAttribute('aria-current', 'location');
        unmount();
        expect(disconnect).toHaveBeenCalledOnce();
    });
    it('横スクロール表・図・コードには一意な説明とキーボードフォーカス', () => {
        const root = mount();
        const regions = [...root.querySelectorAll('[role="region"]')];
        expect(regions).toHaveLength(inventory.counts.table + inventory.counts.diagram + inventory.counts.codeBlock);
        const labels = regions.map(el => el.getAttribute('aria-label'));
        expect(new Set(labels).size).toBe(labels.length);
        regions.forEach(el => { expect(el).toHaveAttribute('tabindex', '0'); expect(el.getAttribute('aria-label')?.trim()).toBeTruthy(); });
    });
});

describe('DVA Deployment CSS全宣言・点・番号', () => {
    const css = () => readFileSync(`${route}/page.css`, 'utf8');
    const globals = () => {
        const values: Record<string, string> = {};
        postcss.parse(readFileSync('app/globals.css', 'utf8')).walkDecls(decl => { if (decl.prop.startsWith('--')) values[decl.prop] = decl.value; });
        return values;
    };
    const resolveColors = (value: string, tokens: Record<string, string>) => value.replace(/var\((--[\w-]+)\)/g, (_match, key: string) => tokens[key] ?? `var(${key})`).toLowerCase();
    it('原本の全セレクタ・メディア条件・宣言・配色を許可差分以外保持', () => {
        const actual = snapshotCssRules(css());
        const values = globals();
        const originalValues = Object.fromEntries(design.rules.find(r => r.selector === ':root')!.declarations.map(d => [d.prop, d.value]));
        const allowed: Record<string, string[]> = { html: ['scroll-padding-top'], '.sidebar': ['top','z-index'], '.mobile-bar': ['top','z-index'], pre: ['padding'], 'pre code': ['padding'] };
        for (const original of design.rules.filter(rule => rule.selector !== ':root')) {
            const selector = [...new Set(original.selector.split(',').map(part => {
                const s = part.trim();
                return s === 'html' || s === 'body' ? '.dva-deployment-page' : `.dva-deployment-page ${s.replace(/\bpre code\b/g, '.code-block code').replace(/\bpre\b/g, '.code-block')}`;
            }))].join(', ');
            const candidates = actual.filter(rule => rule.selector === selector && rule.media === original.media);
            expect(candidates.length, selector).toBeGreaterThan(0);
            for (const declaration of original.declarations) {
                if (allowed[original.selector]?.includes(declaration.prop)) continue;
                let expected = resolveColors(declaration.value, originalValues);
                if (declaration.prop === 'font-size' && expected.endsWith('rem')) expected = `${Number((parseFloat(expected) * 0.875).toFixed(8))}rem`;
                if (declaration.prop === 'font-family') continue; // 自己ホスト書体は別テストで検証
                expect(candidates.some(rule => rule.declarations.some(d => d.prop === declaration.prop && resolveColors(d.value, values) === expected && d.important === declaration.important)), `${selector} ${declaration.prop}: ${expected}`).toBe(true);
            }
        }
    });
    it('通常リストの点・番号・入れ子・字下げ、目次とチェックのマーカー非表示', () => {
        const rules = snapshotCssRules(css());
        const declaration = (selector: string, prop: string) => rules.filter(r => r.selector === selector).flatMap(r => r.declarations).findLast(d => d.prop === prop)?.value;
        expect(declaration('.dva-deployment-page .content ul', 'list-style-type')).toBe('disc');
        expect(declaration('.dva-deployment-page .content ol', 'list-style-type')).toBe('decimal');
        expect(declaration('.dva-deployment-page .content ul ul', 'list-style-type')).toBe('circle');
        for (const tag of ['ul','ol']) {
            expect(declaration(`.dva-deployment-page .content ${tag}`, 'list-style-position')).toBe('outside');
            expect(declaration(`.dva-deployment-page .content ${tag}`, 'padding-left')).toBe('40px');
        }
        expect(declaration('.dva-deployment-page .sidebar ul', 'list-style-type')).toBe('none');
        expect(declaration('.dva-deployment-page .content li.chk', 'list-style-type')).toBe('none');
    });
    it('14px・Source Serif・290px幅・図のライト配色・ページスコープを保持', () => {
        const source = css();
        expect(source).toContain('font-size: 14px !important');
        expect(source).toContain('preserve');
        const values = globals();
        expect(values['--font-dva-serif']).toContain('Source Serif 4 Variable');
        expect(readFileSync(`${route}/page.tsx`, 'utf8')).toContain('@fontsource-variable/source-serif-4/index.css');
        const rules = snapshotCssRules(source);
        expect(rules.every(rule => postcss.list.comma(rule.selector).every(selector => selector.trim().startsWith('.dva-deployment-page')))).toBe(true);
        expect(rules.flatMap(r => r.declarations).some(d => d.prop.startsWith('--'))).toBe(false);
        expect(rules.find(r => r.selector === '.dva-deployment-page .sidebar' && !r.media)?.declarations).toContainEqual({ prop: 'width', value: '290px', important: false });
        expect(source).not.toContain('@layer');
        expect(source).not.toContain('word-break: break-word');
    });
});
