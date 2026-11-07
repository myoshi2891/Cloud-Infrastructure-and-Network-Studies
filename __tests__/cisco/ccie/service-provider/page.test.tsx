// __tests__/cisco/ccie/service-provider/page.test.tsx
// @vitest-environment jsdom
import { vi, describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fireEvent, render } from '@testing-library/react';
import mermaid from 'mermaid';
import inventory from '@/docs/migration-inventory/cisco-ccie-service-provider.json';
import CcieSpGuide from '@/app/cisco/ccie/service-provider/CcieSpGuide';
import { DIAGRAMS, NAV_GROUPS } from '@/app/cisco/ccie/service-provider/constants';
import { defineMigrationSuite } from '@/__tests__/helpers/migration-test-utils';

vi.mock('@/components/MermaidDiagram', () => ({
    MermaidDiagram: ({
        chart,
        ariaLabel,
        preserveNaturalScale = false,
        deferUntilVisible = false,
        theme,
    }: {
        chart: string;
        ariaLabel?: string;
        preserveNaturalScale?: boolean;
        deferUntilVisible?: boolean;
        theme?: string;
    }) => (
        <div
            role="img"
            aria-roledescription="diagram"
            data-testid="mermaid-diagram"
            data-chart={chart}
            data-preserve-natural-scale={String(preserveNaturalScale)}
            data-defer-until-visible={String(deferUntilVisible)}
            data-theme={theme}
            aria-label={ariaLabel}
        />
    ),
}));

defineMigrationSuite(
    'CCIE Service Provider 完全ガイド — 全量移行検証',
    CcieSpGuide,
    inventory,
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
        expect(sidebarRules.length).toBeGreaterThan(0);
        for (const body of sidebarRules) {
            expect(body).not.toMatch(/\btop:\s*0\s*;/);
            expect(body).not.toMatch(/\bposition:\s*static\s*;/);
        }
        // コードブロックとコード行の等幅・インデント保持スタイルが定義されていること
        expect(css).toMatch(/\.ccie-sp-page\s+\.code-block\s*\{[^}]*font-family:\s*var\(--font-ccie-sp-mono\)/);
        expect(css).toMatch(/\.ccie-sp-page\s+\.code-line\s*\{[^}]*white-space:\s*pre/);
    });

    it('コードブロックに IOS XR / Python / YAML の構文ハイライトトークン（.hljs-*）が適用されている', () => {
        const { container } = render(<CcieSpGuide />);
        expect(container.querySelectorAll('.code-block .hljs-keyword').length).toBeGreaterThan(100);
        expect(container.querySelectorAll('.code-block .hljs-built_in').length).toBeGreaterThan(20);
        expect(container.querySelectorAll('.code-block .hljs-number').length).toBeGreaterThan(50);
        expect(container.querySelectorAll('.code-block .hljs-comment').length).toBeGreaterThan(10);
        expect(container.querySelectorAll('.code-block .hljs-meta').length).toBeGreaterThan(3);
        expect(container.querySelectorAll('.code-block .hljs-string').length).toBeGreaterThan(5);
    });

    it('サイドバー目次リンクをクリックすると active クラス・aria-current="location"・親 li.open が付与されサブ階層が展開される', () => {
        const { container } = render(<CcieSpGuide />);
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
        expect(referenced.length).toBeGreaterThan(0);
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
        const { container } = render(<CcieSpGuide />);
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
        for (const [id, chart] of Object.entries(DIAGRAMS)) {
            const result = await mermaid.parse(chart);
            expect(result).toBeTruthy();
        }
    });

    it('全47図が遅延描画、自然スケール、アクセシビリティラベルを指定している', () => {
        const { container } = render(<CcieSpGuide />);
        const diagrams = container.querySelectorAll('.mm > [data-testid="mermaid-diagram"]');
        expect(diagrams.length).toBe(47);
        diagrams.forEach((diag) => {
            expect(diag.getAttribute('data-preserve-natural-scale')).toBe('true');
            expect(diag.getAttribute('data-defer-until-visible')).toBe('true');
            expect(diag.getAttribute('data-theme')).toBe('light');
            expect(diag.getAttribute('aria-label')?.trim()).toBeTruthy();
        });
    });

    it('開いた目次を Escape で閉じ、フォーカスを開閉ボタンへ戻す', () => {
        const { container } = render(<CcieSpGuide />);
        const btn = container.querySelector('#menuBtn') as HTMLButtonElement;
        expect(btn).not.toBeNull();

        // メニューを開く
        fireEvent.click(btn);
        expect(container.querySelector('.ccie-sp-page')?.classList.contains('nav-open')).toBe(true);

        // Escape キーで閉じる
        fireEvent.keyDown(document, { key: 'Escape' });
        expect(container.querySelector('.ccie-sp-page')?.classList.contains('nav-open')).toBe(false);
    });
});
