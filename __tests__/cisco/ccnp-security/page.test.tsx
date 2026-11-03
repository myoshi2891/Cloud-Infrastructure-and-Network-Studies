// __tests__/cisco/ccnp-security/page.test.tsx
// @vitest-environment jsdom
import { vi, describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render } from '@testing-library/react';
import inventory from '@/docs/migration-inventory/cisco-ccnp-security.json';
import CcnpSecurityGuide from '@/app/cisco/ccnp-security/CcnpSecurityGuide';
import { NAV_GROUPS } from '@/app/cisco/ccnp-security/constants';
import { defineMigrationSuite, extractBodyContent } from '@/__tests__/helpers/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

defineMigrationSuite(
    'CCNP Security 完全ガイド — 全量移行検証',
    CcnpSecurityGuide,
    inventory,
);

describe('CCNP Security ガイド — リスト・スタイリング・図解・コード検証', () => {
    it('スコープCSSに金色ドットリストと数字バッジ、Tabler Icons、図解ラッパー透過、リンク下線が定義されている', () => {
        const cssPath = resolve('app/cisco/ccnp-security/page.css');
        const css = readFileSync(cssPath, 'utf8').replace(/\s+/g, '');
        expect(css).toContain("@import'@tabler/icons-webfont/tabler-icons.min.css'");
        expect(css).toContain('.ccnp-security-page');
        expect(css).toContain('mainul>li::before');
        expect(css).toContain('mainol>li::before');
        expect(css).toContain('.srclistli::before');
        expect(css).toContain('.diagram.mm>[role="img"]{background:transparent');
        expect(css).toContain('.ccnp-security-pagea{color:var(--color-ccnp-security-indigo);text-decoration:underline');
    });

    it('ページCSSはローカルのカスタムプロパティを定義せず、構文ハイライト以外に生の hex を残さない', () => {
        const css = readFileSync(resolve('app/cisco/ccnp-security/page.css'), 'utf8');
        expect(css.match(/^\s*--[A-Za-z0-9_-]+\s*:/gm)).toBeNull();
        // 構文ハイライト（.hljs-* / .tk-*）のルールだけを除外して生 hex を検出する
        const nonHighlightRules = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)]
            .filter(([, selector]) => !/\.(hljs-|tk-)/.test(selector ?? ''))
            .map(([, selector, body]) => `${(selector ?? '').trim()}{${body ?? ''}}`);
        const offending = nonHighlightRules.filter((rule) => /#[0-9a-fA-F]{3,8}\b/.test(rule));
        expect(offending).toEqual([]);
    });

    it('ページCSSが参照する --color-ccnp-security-* / --font-ccnp-security-* はすべて globals.css の @theme に定義されている', () => {
        const css = readFileSync(resolve('app/cisco/ccnp-security/page.css'), 'utf8');
        const globals = readFileSync(resolve('app/globals.css'), 'utf8');
        const referenced = [...new Set([...css.matchAll(/var\((--(?:color|font)-ccnp-security-[\w-]+)\)/g)].map((m) => m[1]))];
        expect(referenced.length).toBeGreaterThan(0);
        const missing = referenced.filter((name) => !new RegExp(`^\\s*${name}\\s*:`, 'm').test(globals));
        expect(missing).toEqual([]);
    });

    it('サイドバーの nav ランドマークに読み上げ名があり、目次は NAV_GROUPS と同じ順序・文言で描画される', () => {
        const { container } = render(<CcnpSecurityGuide />);
        const nav = container.querySelector('#sidebar nav');
        expect(nav?.getAttribute('aria-label')?.trim()).toBeTruthy();
        const expected: string[] = [];
        for (const group of NAV_GROUPS) {
            if (group.href) expected.push(`${group.href}|${group.title}`);
            for (const item of group.items) {
                expected.push(`${item.href}|${item.title}`);
                for (const sub of item.subItems ?? []) expected.push(`${sub.href}|${sub.title}`);
            }
        }
        const rendered = [...container.querySelectorAll('#sidebar nav a')].map(
            (a) => `${a.getAttribute('href')}|${a.textContent}`,
        );
        expect(rendered).toEqual(expected);
        const plainHeaders = [...container.querySelectorAll('#sidebar nav .nav-group.nav-plain')].map((e) => e.textContent);
        expect(plainHeaders).toEqual(NAV_GROUPS.filter((g) => !g.href).map((g) => g.title));
        expect(container.querySelectorAll('#sidebar nav .nav-group > a')).toHaveLength(NAV_GROUPS.filter((g) => g.href).length);
    });

    it.each([
        ['d5', 'SCOR v2.0 出題比率'],
        ['d31', 'SNCF v1.2 出題比率'],
        ['d36', 'SISE v1.2 出題比率'],
        ['d45', 'SSCA v2.0 出題比率'],
        ['d49', 'SDSI v1.0 出題比率'],
    ])('出題比率の円グラフ %s は内容を表す短い読み上げ名「%s」を持つ', (id, label) => {
        const { container } = render(<CcnpSecurityGuide />);
        expect(container.querySelector(`#diag-${id}`)?.getAttribute('aria-label')).toBe(label);
    });

    it('モバイルメニューボタンに Tabler Icon (.ti-menu-2) が使用され、コードブロックに原本の .tk-c / .tk-p / .hljs-subst が保持されている', () => {
        const { container } = render(<CcnpSecurityGuide />);
        expect(container.querySelector('#menuBtn i.ti.ti-menu-2')).not.toBeNull();
        expect(container.querySelectorAll('.code-block .tk-c').length).toBe(18);
        expect(container.querySelectorAll('.code-block .tk-p').length).toBe(8);
        expect(container.querySelectorAll('.code-block .hljs-subst').length).toBe(3);
    });

    it('Diagram コンポーネントが原本単体の全派生色を含む render-theme.json を使用している', () => {
        const themePath = resolve('app/cisco/ccnp-security/render-theme.json');
        const theme = JSON.parse(readFileSync(themePath, 'utf8'));
        expect(theme.theme).toBe('base');
        expect(theme.flowchart.padding).toBe(15);
        expect(theme.sequence.wrap).toBe(false);
        expect(theme.themeVariables.mainBkg).toBe('#EEF1F8');
        expect(theme.themeVariables.nodeBkg).toBe('#EEF1F8');
        expect(theme.themeVariables.clusterBkg).toBe('#F6F7F9');
    });
});

describe('CCNP Security ガイド — モバイル目次のアクセシビリティ', () => {
    const css = readFileSync(resolve('app/cisco/ccnp-security/page.css'), 'utf8');
    const mobile = css.slice(css.indexOf('@media (max-width: 1024px)'));
    const ruleOf = (selector: string): string => {
        const start = mobile.indexOf(`${selector} {`);
        expect(start, `missing mobile rule: ${selector}`).toBeGreaterThanOrEqual(0);
        return mobile.slice(start, mobile.indexOf('}', start));
    };

    it('閉じたサイドバーは visibility: hidden でフォーカス・読み上げ対象から外れ、スライド後に隠れる', () => {
        const closed = ruleOf('.ccnp-security-page .sidebar');
        expect(closed).toMatch(/transform:\s*translateX\(-100%\);/);
        expect(closed).toMatch(/visibility:\s*hidden;/);
        expect(closed).toMatch(/transition:\s*transform \.2s ease,\s*visibility 0s linear \.2s;/);
    });

    it('nav-open 時はサイドバーを即座に可視へ戻す', () => {
        const open = ruleOf('.ccnp-security-page.nav-open .sidebar');
        expect(open).toMatch(/transform:\s*none;/);
        expect(open).toMatch(/visibility:\s*visible;/);
        expect(open).toMatch(/transition:\s*transform \.2s ease,\s*visibility 0s;/);
    });

    it('目次ボタンは免責事項バナーの高さも含めて下へずらす', () => {
        const button = ruleOf('.ccnp-security-page .menu-btn');
        expect(button).toMatch(
            /top:\s*calc\(var\(--header-h, 60px\) \+ var\(--disclaimer-height, 0px\) \+ 12px\);/,
        );
    });
});
