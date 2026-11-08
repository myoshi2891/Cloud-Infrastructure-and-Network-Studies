// __tests__/cisco/ccie/service-provider/page.test.tsx
// @vitest-environment jsdom
import { vi, describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fireEvent, render } from '@testing-library/react';
import mermaid from 'mermaid';
import CcieServiceProviderPage from '@/app/cisco/ccie/service-provider/page';
import { DIAGRAMS, NAV_GROUPS } from '@/app/cisco/ccie/service-provider/constants';
import { ccieSpInventory } from '@/__tests__/helpers/ccie-sp-inventory';
import { defineMigrationSuite } from '@/__tests__/helpers/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

defineMigrationSuite(
    'CCIE Service Provider 完全ガイド — 全量移行検証',
    CcieServiceProviderPage,
    ccieSpInventory,
);

describe('CCIE Service Provider ガイド — リスト・スタイリング・図解・コード検証', () => {
    it('スコープCSSに金色ドットリストと数字バッジ、Tabler Icons、図解ラッパー透過、リンク下線が定義されている', () => {
        const cssPath = resolve('app/cisco/ccie/service-provider/page.css');
        const rawCss = readFileSync(cssPath, 'utf8');
        const css = rawCss.replace(/\s+/g, '');
        expect(css).toContain("@import'@tabler/icons-webfont/tabler-icons.min.css'");
        expect(css).toContain('.ccie-sp-page');
        // .diagram の子孫 .mm 直下の [role="img"] を透過・リセットしていること（.diagram.mm のタイポでないこと）
        expect(rawCss).toMatch(/\.ccie-sp-page\s+\.diagram\s+\.mm\s*>\s*\[role=["']img["']\]/);
        expect(css).toContain('.ccie-sp-page.diagram.mm.mermaid-target');
        expect(css).toContain('.ccie-sp-page.diagram.mmsvg');
        expect(css).toContain('background:transparent!important;');
        expect(css).toContain('.ccie-sp-pagea{color:var(--color-ccie-sp-indigo);text-decoration:underline');
    });

    it('サイドバーとmainに重複する旧288px/top:0ルールが存在せず、ヘッダー高連動の280pxレイアウトと階層展開スタイルが定義されている', () => {
        const css = readFileSync(resolve('app/cisco/ccie/service-provider/page.css'), 'utf8');
        expect(css).not.toMatch(/width:\s*288px/);
        expect(css).not.toMatch(/margin-left:\s*288px/);
        // デスクトップ .sidebar に top: 0 が残っていないこと
        const sidebarRules = [...css.matchAll(/\.ccie-sp-page\s+\.sidebar\s*\{([^}]*)\}/g)].map((m) => m[1] ?? '');
        expect(sidebarRules.length).toBe(2);
        for (const body of sidebarRules) {
            expect(body).not.toMatch(/\btop:\s*0\s*;/);
            expect(body).not.toMatch(/\bposition:\s*static\s*;/);
        }
        // コードブロックとコード行の等幅・インデント保持スタイルが定義されていること
        expect(css).toMatch(/\.ccie-sp-page\s+\.code-block\s*\{[^}]*font-family:\s*var\(--font-ccie-sp-mono\)/);
        expect(css).toMatch(/\.ccie-sp-page\s+\.code-line\s*\{[^}]*white-space:\s*pre/);
    });

    it('コードブロックに IOS XR / Python / YAML の構文ハイライトトークン（.hljs-*）が適用されている', () => {
        const { container } = render(<CcieServiceProviderPage />);
        // PEER-OUT 定義の訂正で keyword +9・number +1・comment +2 を含む
        expect(container.querySelectorAll('.code-block .hljs-keyword').length).toBe(440);
        expect(container.querySelectorAll('.code-block .hljs-built_in').length).toBe(33);
        expect(container.querySelectorAll('.code-block .hljs-number').length).toBe(178);
        expect(container.querySelectorAll('.code-block .hljs-comment').length).toBe(180);
        expect(container.querySelectorAll('.code-block .hljs-meta').length).toBe(7);
        expect(container.querySelectorAll('.code-block .hljs-string').length).toBe(11);
    });

    it('サイドバー目次リンクをクリックすると active クラス・aria-current="location"・親 li.open が付与されサブ階層が展開される', () => {
        const { container } = render(<CcieServiceProviderPage />);
        const subLink = container.querySelector('#sidebar nav a[href="#s4-1"]') as HTMLAnchorElement;
        expect(subLink).not.toBeNull();
        fireEvent.click(subLink);
        expect(subLink.classList.contains('active')).toBe(true);
        expect(subLink.getAttribute('aria-current')).toBe('location');
        const parentCh = subLink.closest('li.ch');
        expect(parentCh?.classList.contains('open')).toBe(true);
        expect(parentCh?.classList.contains('active')).toBe(true);
    });

    it('ページCSSはローカルのカスタムプロパティを定義せず、構文ハイライト以外に生の hex を残さない', () => {
        const css = readFileSync(resolve('app/cisco/ccie/service-provider/page.css'), 'utf8');
        // 非推奨の word-break: break-word を使わず、インライン code の折り返しは overflow-wrap で行う
        expect(css).not.toMatch(/word-break:\s*break-word/);
        expect(css).toMatch(/\.ccie-sp-page code \{[^}]*overflow-wrap:\s*anywhere/);
        expect(css).toMatch(/\.ccie-sp-page pre code\.hljs \{[^}]*overflow-wrap:\s*normal/);
        expect(css.match(/^\s*--[A-Za-z0-9_-]+\s*:/gm)).toBeNull();
        // 構文ハイライト等のルールを除外して生 hex を検出する
        const nonHighlightRules = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)]
            .filter(([, selector]) => !/\.(hljs-|tk-|language-)/.test(selector ?? ''))
            .map(([, selector, body]) => `${(selector ?? '').trim()}{${body ?? ''}}`);
        const offending = nonHighlightRules.filter((rule) => /#[0-9a-fA-F]{3,8}\b/.test(rule));
        expect(offending).toEqual([]);
    });

    it('ページCSSが参照する --color-ccie-sp-* / --font-ccie-sp-* はすべて globals.css の @theme に定義されている', () => {
        const css = readFileSync(resolve('app/cisco/ccie/service-provider/page.css'), 'utf8');
        const globals = readFileSync(resolve('app/globals.css'), 'utf8');
        const referenced = [...new Set([...css.matchAll(/var\((--(?:color|font)-ccie-sp-[\w-]+)\)/g)].map((m) => m[1]))];
        expect(referenced.length).toBe(20);
        const missing = referenced.filter((name) => !new RegExp(`^\\s*${name}\\s*:`, 'm').test(globals));
        expect(missing).toEqual([]);
    });

    it('試験アイコン用の icon-theme-ccie-sp ユーティリティが Cisco テーマ配色で globals.css に定義されている', () => {
        const globals = readFileSync(resolve('app/globals.css'), 'utf8');
        const block = globals.match(/@utility icon-theme-ccie-sp\s*\{([^}]*)\}/)?.[1] ?? '';
        expect(block.replace(/\s+/g, '')).toBe(
            'background:var(--color-theme-cisco-bg);color:var(--color-theme-cisco-fg);',
        );
    });

    it('サイドバーの nav ランドマークに読み上げ名があり、目次は NAV_GROUPS と同じ順序・文言で描画される', () => {
        const { container } = render(<CcieServiceProviderPage />);
        const nav = container.querySelector('#sidebar nav');
        expect(nav?.getAttribute('aria-label')?.trim()).toBeTruthy();

        const expected: string[] = [];
        for (const group of NAV_GROUPS) {
            if (group.href) expected.push(`${group.href}|${group.title}`);
            for (const item of group.items) {
                expected.push(`${item.href}|${item.title}`);
            }
        }
        const rendered = [...container.querySelectorAll('#sidebar nav a')].map(
            (a) => `${a.getAttribute('href')}|${a.textContent?.trim()}`,
        );
        expect(rendered).toEqual(expected);
    });

    it('全47図の Mermaid DSL が構文解析をパスする', async () => {
        mermaid.initialize({ startOnLoad: false });
        const charts = Object.values(DIAGRAMS);
        expect(charts).toHaveLength(ccieSpInventory.counts.diagram);
        for (const chart of charts) {
            const result = await mermaid.parse(chart);
            expect(result).toBeTruthy();
        }
    });

    it('全47図が遅延描画、自然スケール、アクセシビリティラベルを指定している', () => {
        const { container } = render(<CcieServiceProviderPage />);
        const diagrams = container.querySelectorAll('.mm > [data-testid="mermaid-diagram"]');
        expect(diagrams.length).toBe(47);
        diagrams.forEach((diag) => {
            expect(diag.getAttribute('data-preserve-natural-scale')).toBe('true');
            expect(diag.getAttribute('data-defer-until-visible')).toBe('true');
            expect(diag.getAttribute('data-theme')).toBe('light');
            expect(diag.getAttribute('aria-label')?.trim()).toBeTruthy();
        });
        // role を持たない外側ラッパーには読み上げ名を付けない（内側の region と img が名前を持つ）
        expect(container.querySelectorAll('.diagram[aria-label]')).toHaveLength(0);
    });

    it('全125表が見出し由来の固有の読み上げ名を持つ', () => {
        const { container } = render(<CcieServiceProviderPage />);
        const labels = [...container.querySelectorAll('table')].map((table) => table.getAttribute('aria-label') ?? '');
        expect(labels).toHaveLength(ccieSpInventory.counts.table);
        expect(new Set(labels).size).toBe(labels.length);
        expect(labels.filter((label) => label.startsWith('比較・仕様表'))).toEqual([]);
    });

    it('目次の文言に原本 HTML の整形改行・連続空白を残さない', () => {
        const titles = NAV_GROUPS.flatMap((group) => [group.title, ...group.items.map((item) => item.title)]);
        expect(titles.filter((title) => /\n|\s{2,}/.test(title) || title !== title.trim())).toEqual([]);
    });

    it('本文セクションをクライアント境界の外（Server の page.tsx）で組み立てる', () => {
        const guide = readFileSync(resolve('app/cisco/ccie/service-provider/CcieSpGuide.tsx'), 'utf8');
        const page = readFileSync(resolve('app/cisco/ccie/service-provider/page.tsx'), 'utf8');
        expect(guide).not.toContain('./sections/');
        expect(page).not.toContain('use client');
        expect(page.match(/from '\.\/sections\//g)).toHaveLength(8);
    });

    it('開いた目次を Escape で閉じ、フォーカスを開閉ボタンへ戻す', () => {
        const { container } = render(<CcieServiceProviderPage />);
        const btn = container.querySelector('#menuBtn') as HTMLButtonElement;
        expect(btn).not.toBeNull();

        // メニューを開く
        fireEvent.click(btn);
        expect(container.querySelector('.ccie-sp-page')?.classList.contains('nav-open')).toBe(true);

        // Escape キーで閉じる
        fireEvent.keyDown(document, { key: 'Escape' });
        expect(container.querySelector('.ccie-sp-page')?.classList.contains('nav-open')).toBe(false);
        expect(document.activeElement).toBe(btn);
    });
});

describe('CCIE Service Provider ガイド — Mermaid 描画テーマ', () => {
    it('render-theme.json は算出不能な NaN 色を含まず、quadrantPointFill は線色を使う', () => {
        // Arrange
        const raw = readFileSync(resolve('app/cisco/ccie/service-provider/render-theme.json'), 'utf8');
        const theme: unknown = JSON.parse(raw);

        // Act
        const variables =
            typeof theme === 'object' && theme !== null && 'themeVariables' in theme
                ? (theme.themeVariables as Record<string, unknown>)
                : {};

        // Assert
        expect(raw).not.toContain('NaN');
        expect(variables.quadrantPointFill).toBe(variables.lineColor);
    });
});
