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

    it('スコープCSSに金色ドットリスト、Tabler Icons、図解カードと内側ラッパー透過、リンク下線、原本固有の装飾クラスがすべて定義されている', () => {
        const css = readFileSync('app/cisco/ccnp-collaboration/page.css', 'utf8');
        const squashed = css.replace(/\s+/g, '');

        expect(css).toContain('@import');
        expect(css).toContain('@tabler/icons-webfont/tabler-icons.min.css');

        // 箇条書き（金色丸ドット）とサイドバー内のドット無効化
        expect(squashed).toContain('.ccnp-collab-pageul>li::before{content:\'\';position:absolute;left:6px;top:0.75em;width:6px;height:6px;border-radius:50%;background:var(--color-ccnp-collab-gold)');
        expect(squashed).toContain('.ccnp-collab-page.sidebarnavli::before{content:none!important');
        expect(squashed).toContain('.ccnp-collab-page.sidebarnavli.chapa{padding-left:18px');

        // 図解カード（白背景）と MermaidDiagram 内側ラッパーの背景透過・自然幅維持
        expect(squashed).toContain('.ccnp-collab-page.diagram{margin:18px0;padding:16px;background:var(--color-ccnp-collab-surface);border:1pxsolidvar(--color-ccnp-collab-line);border-radius:12px;overflow-x:auto');
        expect(squashed).toContain('.ccnp-collab-page.diagram.mm>[role="img"]');
        expect(squashed).toContain('background:transparent!important;border:0;border-radius:0;padding:0;margin:0;width:100%;overflow:visible');
        expect(squashed).toContain('.ccnp-collab-page.diagram.mm.mermaid-target{display:flex;justify-content:center;justify-content:safecenter;width:100%');
        expect(squashed).toContain('.ccnp-collab-page.diagram.mmsvg{flex-shrink:0;max-width:none;height:auto;overflow:visible');

        // 原本の見出し・コールアウト・計算式・参考ソースカード・チェックリストの完全再現
        expect(squashed).toContain('.ccnp-collab-page.hero-meta{background:var(--color-ccnp-collab-tint-indigo);border-left:4pxsolidvar(--color-ccnp-collab-indigo)');
        expect(squashed).toContain('.ccnp-collab-pageh1.part{font-family:var(--font-ccnp-collab-serif);font-weight:500;font-size:1.375rem;color:var(--color-ccnp-collab-surface);background:var(--color-ccnp-collab-indigo)');
        expect(squashed).toContain('.ccnp-collab-pageh2.chapter{font-family:var(--font-ccnp-collab-serif);font-weight:500;font-size:1.125rem;color:var(--color-ccnp-collab-indigo);border-bottom:2pxsolidvar(--color-ccnp-collab-gold)');
        expect(squashed).toContain('.ccnp-collab-pageh3{font-family:var(--font-ccnp-collab-serif);font-weight:500;font-size:1rem;color:var(--color-ccnp-collab-ink);margin:28px010px;padding-left:10px;border-left:4pxsolidvar(--color-ccnp-collab-forest)');
        expect(squashed).toContain('.ccnp-collab-pageh4{font-weight:500;font-size:1rem;color:var(--color-ccnp-collab-plum)');
        expect(squashed).toContain('.ccnp-collab-page.formula{margin:14px0;padding:12px18px;background:var(--color-ccnp-collab-tint-gold);border:1pxsolidvar(--color-ccnp-collab-gold)');
        expect(squashed).toContain('.ccnp-collab-page.callout-title{');
        expect(squashed).toContain('.ccnp-collab-page.callout.practice.callout-title{color:var(--color-ccnp-collab-gold)');
        expect(squashed).toContain('.ccnp-collab-page.callout.source.callout-title{color:var(--color-ccnp-collab-forest)');
        expect(squashed).toContain('.ccnp-collab-page.callout.note.callout-title{color:var(--color-ccnp-collab-plum)');
        expect(squashed).toContain('.ccnp-collab-page.src-card{');
        expect(squashed).toContain('.ccnp-collab-page.src-num{');
        expect(squashed).toContain('.ccnp-collab-page.check-list{counter-reset:chk');
        expect(squashed).toContain('.ccnp-collab-page.check-item:has(input:checked)');

        expect(css).toMatch(/\.ccnp-collab-page\s+a\s*\{[^}]*text-decoration:\s*underline/);
    });

    it('サイドバー280px固定とメインコンテンツ全幅展開（calc(100% - 280px) / max-width: none）およびモバイル切替が定義されている', () => {
        const css = readFileSync('app/cisco/ccnp-collaboration/page.css', 'utf8');

        expect(css).toMatch(
            /\.ccnp-collab-page\s+\.sidebar\s*\{[^}]*width:\s*280px[^}]*top:\s*calc\(var\(--header-h,\s*60px\)\s*\+\s*var\(--disclaimer-height,\s*0px\)\)/,
        );
        expect(css).toMatch(
            /\.ccnp-collab-page\s+\.main\s*\{[^}]*margin-left:\s*280px;\s*width:\s*calc\(100%\s*-\s*280px\);\s*max-width:\s*none;\s*box-sizing:\s*border-box;/,
        );

        expect(css).not.toMatch(/width:\s*288px/);
        expect(css).not.toMatch(/\.sidebar\s*\{[^}]*top:\s*0\b/);
    });

    it('page.tsx が Source Serif 4 Variable フォントを読み込んでいる', () => {
        const pageSource = readFileSync('app/cisco/ccnp-collaboration/page.tsx', 'utf8');
        expect(pageSource).toContain("import '@fontsource-variable/source-serif-4/index.css'");
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
                expect(parseResult).toBeTruthy();
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
    it('render-theme.json は算出不能な NaN 色を含まず、原本 HTML の mermaid.initialize 設定値と一致する', () => {
        const raw = JSON.stringify(theme);
        expect(raw).not.toContain('NaN');
        expect(raw).not.toContain('undefined');
        expect(theme.theme).toBe('base');
        expect(theme.flowchart.nodeSpacing).toBe(40);
        expect(theme.flowchart.rankSpacing).toBe(45);
        expect(theme.sequence.actorMargin).toBe(50);
        expect(theme.sequence.messageMargin).toBe(30);
        expect(theme.themeVariables.primaryColor).toBe('#EEF1F8');
        expect(theme.themeVariables.primaryBorderColor).toBe('#2E3F72');
        expect(theme.themeVariables.primaryTextColor).toBe('#161B26');
        expect(theme.themeVariables.secondaryColor).toBe('#FAF1DF');
        expect(theme.themeVariables.tertiaryColor).toBe('#F6F7F9');
        expect(theme.themeVariables.lineColor).toBe('#4A5263');
        expect(theme.themeVariables.mainBkg).toBe('#EEF1F8');
        expect(theme.themeVariables.nodeBkg).toBe('#EEF1F8');
        expect(theme.themeVariables.nodeBorder).toBe('#2E3F72');
        expect(theme.themeVariables.clusterBkg).toBe('#F6F7F9');
        expect(theme.themeVariables.clusterBorder).toBe('#B9C0CF');
        expect(theme.themeVariables.edgeLabelBackground).toBe('#FFFFFF');
        expect(theme.themeVariables.actorLineColor).toBe('#B9C0CF');
        expect(theme.themeVariables.signalColor).toBe('#161B26');
        expect(theme.themeVariables.labelBoxBkgColor).toBe('#FAF1DF');
        expect(theme.themeVariables.labelBoxBorderColor).toBe('#B8802A');
        expect(theme.themeVariables.noteBkgColor).toBe('#FAF1DF');
        expect(theme.themeVariables.noteBorderColor).toBe('#B8802A');
    });
});

