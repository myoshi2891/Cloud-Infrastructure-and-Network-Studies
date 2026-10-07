// @vitest-environment jsdom
import { readFileSync } from 'node:fs';
import { act, fireEvent, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import postcss from 'postcss';
import Page from '@/app/aws/developer-associate/domain1/page';
import { DIAGRAMS, NAV_ITEMS } from '@/app/aws/developer-associate/domain1/constants';
import inventory from '@/docs/migration-inventory/aws-dva-domain1-development.json';
import design from '@/docs/migration-inventory/aws-dva-domain1-development.design.json';
import theme from '@/docs/migration-inventory/aws-dva-domain1-development.mermaid.json';
import { codeLineCount, extractBodyContent, squash } from '@/__tests__/helpers/migration-test-utils';
import { snapshotDvaDevelopment } from '@/scripts/dva-development-fidelity.mjs';
import { snapshotCssRules } from '@/scripts/tanenbaum-fidelity.mjs';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});
afterEach(() => { vi.unstubAllGlobals(); window.history.replaceState(null, '', '/'); });
const mount = () => render(<Page />).container;
const route = 'app/aws/developer-associate/domain1';
// JSXではtable直下の整形用空白を除去する。セル全文は別途厳密照合する。
const normalizedSections = (sections: typeof design.structure.sections) => sections.map(section => ({...section,text:squash(section.text)}));

describe('DVA Domain 1 全量移行', () => {
    it.each(['h1','h2','h3','h4','th','td','listItems'] as const)('%s 全件・全文・順序', key => {
        expect([...mount().querySelectorAll(key === 'listItems' ? 'li' : key)].map(el => squash(el.textContent ?? ''))).toEqual(inventory[key].map(squash));
    });
    it('外部リンクは重複を含めURL・順序が一致', () => {
        expect([...mount().querySelectorAll('a[href^="http"]')].map(el => el.getAttribute('href'))).toEqual(inventory.links.map(link => link.href));
    });
    it('本文・sidebar・注釈・コード全文が一致', () => expect(extractBodyContent(mount())).toEqual(inventory.bodyContent));
    it('全文・表結合・リスト・15解説・31図の配置・全アイコンが一致', () => {
        const actual=snapshotDvaDevelopment(mount());
        expect({...actual,sections:normalizedSections(actual.sections)}).toEqual({...design.structure,sections:normalizedSections(design.structure.sections)});
    });
    it.each(['intro','task1','task2','task3','remainder'])('段階 %s の全セクション全文', stage => {
        const matches = (id: string) => stage === 'intro' ? id === 'sec-0' : stage === 'remainder' ? /^sec-3[3-7]$/.test(id) : id === `task-${stage.slice(-1)}` || id.startsWith(`sk-1-${stage.slice(-1)}-`);
        const actual = snapshotDvaDevelopment(mount()).sections.filter(section => matches(section.id));
        expect(normalizedSections(actual)).toEqual(normalizedSections(design.structure.sections.filter(section => matches(section.id))));
    });
    it('全116表のthead・列数・scopeと横スクロール操作', () => {
        const tables = [...mount().querySelectorAll('table')];
        expect(tables).toHaveLength(inventory.counts.table);
        tables.forEach((table, i) => {
            expect(table.querySelector('thead')).not.toBeNull();
            expect(table.querySelectorAll('thead th[scope="col"]')).toHaveLength(inventory.structures.tableColumnHeaders[i]!);
            expect(table.closest('.table-wrap')).toHaveAttribute('tabindex', '0');
        });
    });
    it('全図の原本DSL・解決済みライト配色・14px採寸・自然倍率・説明', () => {
        const root = mount();
        expect(DIAGRAMS).toEqual(design.charts);
        const diagrams = [...root.querySelectorAll('[data-testid="mermaid-diagram"]')];
        expect(diagrams).toHaveLength(inventory.counts.diagram);
        diagrams.forEach((el, index) => {
            const chart = el.getAttribute('data-chart')!;
            const init = chart.match(/^%%\{init: (.+)\}%%\n/);
            expect(init).not.toBeNull();
            expect(JSON.parse(init![1]!)).toEqual({...theme.resolved, themeVariables:{...theme.resolved.themeVariables,fontFamily:'"Noto Sans JP Variable","Noto Sans JP",sans-serif',fontSize:'14px'}});
            expect(chart.slice(init![0].length)).toBe(Object.values(design.charts)[index]);
            expect(el).toHaveAttribute('data-preserve-natural-scale', 'true');
            expect(el.getAttribute('aria-label')?.trim()).toBeTruthy();
        });
        expect(root.querySelectorAll('img,svg')).toHaveLength(inventory.counts.figure);
    });
    it('18コードの言語見出し・全行・空行・インデントと構文色', () => {
        const blocks = [...mount().querySelectorAll('.code-block')];
        expect(blocks).toHaveLength(inventory.counts.codeBlock);
        blocks.forEach((block, i) => {
            expect(codeLineCount(block)).toBe(inventory.structures.codeLines[i]);
            expect(block.querySelector(':scope > .code-line .cb-head')?.textContent).toBe(design.structure.codeHeaders[i]);
            expect(block.querySelector('.hljs-comment,.hljs-keyword,.hljs-string,.hljs-attr')).not.toBeNull();
        });
    });
    it('38目次ターゲットへhash・focus・現在地を一致させる', () => {
        const root = mount();
        expect(NAV_ITEMS.map(item => item.id)).toEqual(design.structure.anchors);
        for (const item of NAV_ITEMS) {
            const link = root.querySelector(`nav a[href="#${item.id}"]`)!;
            fireEvent.click(link);
            expect(window.location.hash).toBe(`#${item.id}`);
            expect(root.querySelector(`#${item.id}`)).toHaveFocus();
            expect(link).toHaveAttribute('aria-current', 'location');
        }
    });
    it('drawer開閉・Escape・背景・移動・画面幅変更', () => {
        const root = mount(), toggle = root.querySelector('#menu-btn')!;
        expect(toggle).toHaveAttribute('type','button');
        expect(toggle).toHaveAttribute('aria-controls','sidebar');
        expect(toggle).toHaveAttribute('aria-expanded','false');
        fireEvent.click(toggle);
        expect(root.firstElementChild).toHaveClass('menu-open');
        fireEvent.keyDown(window, {key:'Escape'});
        expect(toggle).toHaveAttribute('aria-expanded','false');
        expect(toggle).toHaveFocus();
        fireEvent.click(toggle);
        fireEvent.click(root.querySelector('#backdrop')!);
        expect(toggle).toHaveAttribute('aria-expanded','false');
        fireEvent.click(toggle);
        fireEvent.click(root.querySelector('a[href="#sec-0"]')!);
        expect(toggle).toHaveAttribute('aria-expanded','false');
        fireEvent.click(toggle);
        fireEvent(window,new Event('resize'));
        expect(toggle).toHaveAttribute('aria-expanded','false');
    });
    it('scroll spy・hash・popstate・cleanup', () => {
        let callback: IntersectionObserverCallback | undefined;
        const observe = vi.fn(), disconnect = vi.fn();
        vi.stubGlobal('IntersectionObserver',class {
            constructor(cb:IntersectionObserverCallback) {callback=cb;}
            observe=observe; disconnect=disconnect;
        });
        const {container,unmount}=render(<Page />);
        expect(observe.mock.calls.map(call => (call[0] as HTMLElement).id)).toEqual(design.structure.anchors);
        act(() => callback?.([{isIntersecting:true,target:container.querySelector('#sk-1-2-4')!} as IntersectionObserverEntry],{} as IntersectionObserver));
        expect(container.querySelector('a[href="#sk-1-2-4"]')).toHaveAttribute('aria-current','location');
        for(const event of ['hashchange','popstate']) {
            window.history.replaceState(null,'','#sec-36'); fireEvent(window,new Event(event));
            expect(container.querySelector('a[href="#sec-36"]')).toHaveAttribute('aria-current','location');
        }
        unmount(); expect(disconnect).toHaveBeenCalledOnce();
    });
});

const scope = (selector:string) => selector.split(',').map(part => {
    const s=part.trim();
    return s==='html'||s==='body' ? '.dva-development-page' : s.startsWith('body.menu-open') ? s.replace('body.menu-open','.dva-development-page.menu-open') : `.dva-development-page ${s}`;
}).join(', ');
const mapValue = (value:string,prop:string) => {
    const scaled=prop==='font-size' && value.endsWith('rem') ? `${Number((parseFloat(value)*.875).toFixed(8))}rem` : value;
    return scaled.replace(/var\((--[\w-]+)\)/g,(_,key:string) => key==='--sidebar-w' ? '288px' : `var(${key.startsWith('--font-') ? `--font-dva-development-${key.slice(7)}` : key==='--shadow' ? '--shadow-dva-development' : `--color-dva-development-${key.slice(2)}`})`).replace(/#[\da-f]{3,6}\b/gi,hex => `var(--color-dva-development-${hex.slice(1).toLowerCase()})`);
};
describe('DVA Domain 1 原本の全CSSとリスト記号',()=>{
    it('全CSSセレクタ・メディア条件・宣言・importantを保持',()=>{
        const actual=snapshotCssRules(readFileSync(`${route}/page.css`,'utf8'));
        for(const rule of design.rules.filter(rule=>rule.selector!==':root')) {
            const candidates=actual.filter(r=>r.selector===scope(rule.selector)&&r.media===rule.media);
            expect(candidates.length,rule.selector).toBeGreaterThan(0);
            for(const decl of rule.declarations) {
                if((rule.selector==='aside.sidebar'&&decl.prop==='top')||(rule.selector==='.mobile-bar'&&['top','z-index'].includes(decl.prop))||(rule.selector==='.backdrop'&&decl.prop==='inset')) continue;
                expect(candidates.some(r=>r.declarations.some(d=>d.prop===decl.prop&&d.value===mapValue(decl.value,decl.prop)&&d.important===decl.important)),`${rule.selector} ${decl.prop}`).toBe(true);
            }
        }
    });
    it('原本配色・影・フォントをグローバルトークンに保持',()=>{
        const globals:Record<string,string>={};
        postcss.parse(readFileSync('app/globals.css','utf8')).walkDecls(d=>{if(d.prop.startsWith('--')) globals[d.prop]=d.value;});
        for(const decl of design.rules.find(rule=>rule.selector===':root')!.declarations.filter(d=>d.prop!=='--sidebar-w')) {
            const key=decl.prop.startsWith('--font-')?`--font-dva-development-${decl.prop.slice(7)}`:decl.prop==='--shadow'?'--shadow-dva-development':`--color-dva-development-${decl.prop.slice(2)}`;
            expect(globals[key]).toBe(decl.value.replace('"Noto Sans JP"','"Noto Sans JP Variable"').replace('"Source Serif 4"','"Source Serif 4 Variable"'));
        }
        for(const rule of design.rules) for(const decl of rule.declarations) for(const [hex] of decl.value.matchAll(/#[\da-f]{3,6}\b/gi)) expect(globals[`--color-dva-development-${hex.slice(1).toLowerCase()}`]).toBe(hex.toLowerCase());
    });
    it('点・番号・入れ子・目次のマーカー、14pxと原本余白',()=>{
        const css=readFileSync(`${route}/page.css`,'utf8'),rules=snapshotCssRules(css);
        for(const [selector,type] of [['main ul','disc'],['main ol','decimal'],['main ul ul','circle'],['.nav-list','none']]) expect(rules.some(r=>r.selector===`.dva-development-page ${selector}`&&r.declarations.some(d=>d.prop==='list-style-type'&&d.value===type))).toBe(true);
        expect(css).toContain('font-size: 14px !important');
        expect(css).toContain('scroll-margin-top: calc(var(--header-h');
        expect(css).not.toMatch(/@layer|fonts.googleapis/);
        const blocks=rules.filter(r=>r.selector==='.dva-development-page .code-block');
        expect(Object.fromEntries(blocks.flatMap(r=>r.declarations.map(d=>[d.prop,d.value]))).margin).toBe('16px 0 22px');
        expect(readFileSync(`${route}/page.tsx`,'utf8')).toContain("import '@fontsource-variable/source-serif-4/index.css'");
        expect(readFileSync(`${route}/Diagram.tsx`,'utf8')).toContain('preserveChartTheme={true}');
    });
});
