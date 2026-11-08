// __tests__/cisco/ccnp-collaboration/page.test.tsx
// @vitest-environment jsdom
import { readFileSync } from 'node:fs';
import { fireEvent, render } from '@testing-library/react';
import mermaid from 'mermaid';
import postcss from 'postcss';
import { describe, expect, it, vi } from 'vitest';
import Page from '@/app/cisco/ccnp-collaboration/page';
import CcnpCollaborationGuide from '@/app/cisco/ccnp-collaboration/CcnpCollaborationGuide';
import { DIAGRAMS, NAV_ITEMS } from '@/app/cisco/ccnp-collaboration/constants';
import theme from '@/app/cisco/ccnp-collaboration/render-theme.json';
import { ccnpCollabInventory } from '@/__tests__/helpers/ccnp-collab-inventory';
import { defineMigrationSuite } from '@/__tests__/helpers/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

defineMigrationSuite(
    'CCNP Collaboration 完全ガイド — 全量移行検証',
    Page,
    ccnpCollabInventory,
);

describe('CCNP Collaboration ガイド — リスト・スタイリング・図解・コード検証', () => {
    const renderPage = () => {
        const { container } = render(<Page />);
        return container;
    };

    it('スコープCSSに金色ドットリストと数字バッジ、Tabler Icons、図解ラッパー透過、リンク下線が定義されている', () => {
        const css = readFileSync('app/cisco/ccnp-collaboration/page.css', 'utf8');

        expect(css).toContain('@import');
        expect(css).toContain('@tabler/icons-webfont/tabler-icons.min.css');

        expect(css).toMatch(/\.ccnp-collab-page\s+ul(?:\s*,\s*[\w\s.-]+)*\s*\{[^}]*list-style:\s*none/);
        expect(css).toMatch(/\.ccnp-collab-page\s+ul\s+li::before\s*\{[^}]*content:\s*['"]•['"]/);
        expect(css).toContain('var(--color-ccnp-collab-gold)');

        expect(css).toMatch(/\.ccnp-collab-page\s+ol\s+li::before/);
        expect(css).toContain('counter(item)');

        expect(css).toMatch(/\.ccnp-collab-page\s+\.diagram\s*\{[^}]*background:\s*transparent/);
        expect(css).toMatch(/\.ccnp-collab-page\s+\.mm\s*\{[^}]*background:\s*transparent/);

        expect(css).toMatch(/\.ccnp-collab-page\s+a\s*\{[^}]*text-decoration:\s*underline/);
    });

    it('サイドバーとmainに重複する旧288px/top:0ルールが存在せず、ヘッダー高連動の280pxレイアウトと階層展開スタイルが定義されている', () => {
        const css = readFileSync('app/cisco/ccnp-collaboration/page.css', 'utf8');

        expect(css).toMatch(
            /\.ccnp-collab-page\s+\.sidebar\s*\{[^}]*width:\s*280px[^}]*top:\s*calc\(var\(--header-h,\s*60px\)\s*\+\s*var\(--disclaimer-height,\s*0px\)\)/,
        );
        expect(css).toMatch(/\.ccnp-collab-page\s+\.main\s*\{[^}]*margin-left:\s*280px/);

        expect(css).not.toMatch(/width:\s*288px/);
        expect(css).not.toMatch(/\.sidebar\s*\{[^}]*top:\s*0\b/);
    });

    it('コードブロックに .code-line が適用されている', () => {
        const container = renderPage();
        const codeBlocks = container.querySelectorAll('.code-block');
        expect(codeBlocks.length).toBe(ccnpCollabInventory.counts.codeBlock);
        codeBlocks.forEach((block) => {
            const lines = block.querySelectorAll('.code-line');
            expect(lines.length).toBeGreaterThan(0);
        });
    });

    it('サイドバー目次リンクをクリックすると active クラス・aria-current="location" が付与される', () => {
        const { container } = render(<CcnpCollaborationGuide />);
        const links = container.querySelectorAll('#sidebar a[href^="#"]');
        expect(links.length).toBeGreaterThan(0);

        const target = links[0];
        expect(target).toBeDefined();
        if (target) {
            fireEvent.click(target);
            const parentLi = target.closest('li');
            expect(parentLi?.classList.contains('active')).toBe(true);
            expect(target.getAttribute('aria-current')).toBe('location');
        }
    });

    it('ページCSSはローカルのカスタムプロパティを定義せず、構文ハイライト以外に生の hex を残さない', () => {
        const css = readFileSync('app/cisco/ccnp-collaboration/page.css', 'utf8');
        expect(css).not.toMatch(/:root\s*\{/);

        const root = postcss.parse(css);
        const prohibitedHex: { selector: string; prop: string; value: string }[] = [];
        root.walkRules((rule) => {
            if (rule.selector.includes('.hljs-') || rule.selector.includes('.tk-')) return;
            rule.walkDecls((decl) => {
                if (/#(?:[0-9a-fA-F]{3,8})\b/.test(decl.value)) {
                    prohibitedHex.push({ selector: rule.selector, prop: decl.prop, value: decl.value });
                }
            });
        });
        expect(prohibitedHex).toEqual([]);
    });

    it('ページCSSが参照する --color-ccnp-collab-* / --font-ccnp-collab-* はすべて globals.css の @theme に定義されている', () => {
        const pageCss = readFileSync('app/cisco/ccnp-collaboration/page.css', 'utf8');
        const globalsCss = readFileSync('app/globals.css', 'utf8');

        const referencedTokens = new Set<string>();
        const regex = /var\((--(?:color|font)-ccnp-collab-[a-z0-9-]+)\)/g;
        let match: RegExpExecArray | null;
        while ((match = regex.exec(pageCss)) !== null) {
            const token = match[1];
            if (token) referencedTokens.add(token);
        }

        expect(referencedTokens.size).toBeGreaterThan(0);
        referencedTokens.forEach((token) => {
            const pattern = new RegExp(`${token}\\s*:`, 'm');
            expect(globalsCss).toMatch(pattern);
        });
    });

    it('試験アイコン用の icon-theme-ccnp-collab ユーティリティが Cisco テーマ配色で globals.css に定義されている', () => {
        const globalsCss = readFileSync('app/globals.css', 'utf8');
        expect(globalsCss).toMatch(/@utility\s+icon-theme-ccnp-collab\s*\{/);
    });

    it('サイドバーの nav ランドマークに読み上げ名があり、目次は NAV_ITEMS と同じ順序・文言で描画される', () => {
        const { container } = render(<CcnpCollaborationGuide />);
        const nav = container.querySelector('#sidebar nav');
        expect(nav).not.toBeNull();
        expect(nav?.getAttribute('aria-label') || nav?.getAttribute('aria-labelledby')).toBeTruthy();

        const renderedTexts = [...container.querySelectorAll('#sidebar nav a[href^="#"]')].map((a) =>
            (a.textContent || '').replace(/\s+/g, ' ').trim(),
        );
        const expectedTexts = NAV_ITEMS.map((item) => item.title.replace(/\s+/g, ' ').trim());
        expect(renderedTexts).toEqual(expectedTexts);
    });

    it('全83図の Mermaid DSL が構文解析をパスする', async () => {
        mermaid.initialize({ startOnLoad: false, securityLevel: 'loose' });
        const ids = Object.keys(DIAGRAMS);
        expect(ids).toHaveLength(ccnpCollabInventory.counts.diagram);

        for (const id of ids) {
            const code = DIAGRAMS[id];
            expect(code).toBeDefined();
            if (code) {
                const parseResult = await mermaid.parse(code, { suppressErrors: true });
                expect(parseResult).toBe(true);
            }
        }
    });

    it('全83図が遅延描画、自然スケール、アクセシビリティラベルを指定している', () => {
        const container = renderPage();
        const diagrams = [...container.querySelectorAll('[data-testid="mermaid-diagram"]')];
        expect(diagrams).toHaveLength(ccnpCollabInventory.counts.diagram);
        diagrams.forEach((diagram) => {
            expect(diagram.getAttribute('data-defer-until-visible')).toBe('true');
            expect(diagram.getAttribute('data-preserve-natural-scale')).toBe('true');
            const hasAria = Boolean(diagram.getAttribute('aria-label')?.trim());
            const hasDescribedBy = Boolean(diagram.getAttribute('aria-describedby')?.trim());
            const isDecorative = diagram.getAttribute('data-decorative') === 'true'
                || diagram.getAttribute('aria-hidden') === 'true';
            expect(hasAria || hasDescribedBy || isDecorative).toBe(true);
        });
    });

    it('全178表が見出し由来の固有の読み上げ名を持つ', () => {
        const container = renderPage();
        const tables = [...container.querySelectorAll('table')];
        expect(tables).toHaveLength(ccnpCollabInventory.counts.table);
        const labels = tables.map((t) => t.getAttribute('aria-label')?.trim() ?? '');
        labels.forEach((label) => {
            expect(label).toBeTruthy();
        });
        const unique = new Set(labels);
        expect(unique.size).toBe(tables.length);
    });

    it('本文セクションをクライアント境界の外（Server の page.tsx）で組み立てる', () => {
        const pageSource = readFileSync('app/cisco/ccnp-collaboration/page.tsx', 'utf8');
        expect(pageSource).not.toMatch(/^\s*['"]use client['"]/m);
        expect(pageSource).toContain('HeroIntro');
        expect(pageSource).toContain('PartA');
        expect(pageSource).toContain('PartB');
        expect(pageSource).toContain('PartC');
        expect(pageSource).toContain('PartD');
        expect(pageSource).toContain('PartE');
        expect(pageSource).toContain('PartF');
        expect(pageSource).toContain('Appendix');
    });

    it('開いた目次を Escape で閉じ、フォーカスを開閉ボタンへ戻す', () => {
        const { container } = render(<CcnpCollaborationGuide />);
        const toggle = container.querySelector('.nav-toggle') as HTMLButtonElement | null;
        expect(toggle).not.toBeNull();
        if (toggle) {
            fireEvent.click(toggle);
            expect(toggle.getAttribute('aria-expanded')).toBe('true');

            fireEvent.keyDown(window, { key: 'Escape' });
            expect(toggle.getAttribute('aria-expanded')).toBe('false');
            expect(document.activeElement).toBe(toggle);
        }
    });
});

describe('CCNP Collaboration ガイド — Mermaid 描画テーマ', () => {
    it('render-theme.json は算出不能な NaN 色を含まない', () => {
        const raw = JSON.stringify(theme);
        expect(raw).not.toContain('NaN');
        expect(raw).not.toContain('undefined');
    });
});

