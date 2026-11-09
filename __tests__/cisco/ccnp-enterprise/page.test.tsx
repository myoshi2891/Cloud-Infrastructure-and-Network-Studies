// __tests__/cisco/ccnp-enterprise/page.test.tsx
// @vitest-environment jsdom
import { readFileSync } from 'node:fs';
import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Page from '@/app/cisco/ccnp-enterprise/page';
import CcnpEnterpriseGuide from '@/app/cisco/ccnp-enterprise/CcnpEnterpriseGuide';
import theme from '@/app/cisco/ccnp-enterprise/render-theme.json';
import { ccnpEnterpriseInventory } from '@/__tests__/helpers/ccnp-enterprise-inventory';
import { defineMigrationSuite } from '@/__tests__/helpers/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

defineMigrationSuite(
    'CCNP Enterprise 完全ガイド — 全量移行検証',
    Page,
    ccnpEnterpriseInventory,
);

describe('CCNP Enterprise ガイド — リスト・スタイリング・図解・コード検証', () => {
    const renderPage = () => {
        const { container } = render(<Page />);
        return container;
    };

    it('スコープCSSにサイドバーブランドロゴ48px、アコーディオン目次、Heroメタグリッド、金色ドットリスト、Tabler Icons、図解カード透過、コールアウト、コードブロック、参照ソースカードがすべて定義されている', () => {
        const css = readFileSync('app/cisco/ccnp-enterprise/page.css', 'utf8');
        const squashed = css.replace(/\s+/g, '').replace(/;\}/g, '}');

        expect(css).toContain('@import');
        expect(css).toContain('@tabler/icons-webfont/tabler-icons.min.css');

        // サイドバーのブランド（48x48px SVG とブロック表示のテキスト）
        expect(squashed).toContain('.ccnp-enterprise-page.brandsvg{flex:none;width:48px;height:48px}');
        expect(squashed).toContain('.ccnp-enterprise-page.brandb{display:block;');
        expect(squashed).toContain('.ccnp-enterprise-page.brandspan{display:block;');

        // サイドバーのアコーディオン階層（.sub 非表示 / .g.open > .sub 表示）
        expect(squashed).toContain('.ccnp-enterprise-page.sidebar.g>a{font-weight:600;color:var(--color-ccnp-enterprise-ink);margin-top:6px}');
        expect(squashed).toContain('.ccnp-enterprise-page.sidebar.sub{display:none;margin:2px06px10px;border-left:2pxsolidvar(--color-ccnp-enterprise-line)}');
        expect(squashed).toContain('.ccnp-enterprise-page.sidebar.g.open>.sub{display:block}');

        // Hero の .meta グリッドカード
        expect(squashed).toContain('.ccnp-enterprise-page.meta{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px;margin:0}');
        expect(squashed).toContain('.ccnp-enterprise-page.meta>div{background:var(--color-ccnp-enterprise-surface);border:1pxsolidvar(--color-ccnp-enterprise-line);border-radius:12px;padding:12px16px}');
        expect(squashed).toContain('.ccnp-enterprise-page.metadt{color:var(--color-ccnp-enterprise-forest);font-weight:600}');
        expect(squashed).toContain('.ccnp-enterprise-page.metadd{margin:4px00}');

        // 箇条書き（金色丸ドット）とサイドバー内のドット無効化
        expect(squashed).toContain('.ccnp-enterprise-pageul>li::before{content:\'\';position:absolute;left:6px;top:0.72em;width:7px;height:7px;border-radius:50%;background:var(--color-ccnp-enterprise-gold)');
        expect(squashed).toContain('.ccnp-enterprise-page.sidebarnavli::before{content:none!important');

        // 図解カード（白背景）と MermaidDiagram 内側ラッパーの背景透過・自然幅維持
        expect(squashed).toContain('.ccnp-enterprise-page.diagram{');
        expect(squashed).toContain('background:var(--color-ccnp-enterprise-surface);border:1pxsolidvar(--color-ccnp-enterprise-line);border-radius:12px;overflow-x:auto');
        expect(squashed).toContain('.ccnp-enterprise-page.diagram.mm>[role="img"]');
        expect(squashed).toContain('background:transparent!important;border:0;border-radius:0;padding:0;margin:0;width:100%;overflow:visible');
        expect(squashed).toContain('.ccnp-enterprise-page.diagram.mm.mermaid-target{display:flex;justify-content:center;justify-content:safecenter;width:100%');
        expect(squashed).toContain('.ccnp-enterprise-page.diagram.mmsvg{flex-shrink:0;max-width:none;height:auto;overflow:visible');

        // コールアウト（.callout-head / .callout-body）
        expect(squashed).toContain('.ccnp-enterprise-page.callout{margin:20px0;border:1pxsolidvar(--color-ccnp-enterprise-line);border-left-width:5px;border-radius:12px;background:var(--color-ccnp-enterprise-surface);padding:018px12px}');
        expect(squashed).toContain('.ccnp-enterprise-page.callout-head{display:flex;align-items:center;gap:8px;padding:12px04px;font-weight:600}');
        expect(squashed).toContain('.ccnp-enterprise-page.callout.practice{border-left-color:var(--color-ccnp-enterprise-gold);background:var(--color-ccnp-enterprise-tint-gold)}');
        expect(squashed).toContain('.ccnp-enterprise-page.callout.note{border-left-color:var(--color-ccnp-enterprise-plum);background:var(--color-ccnp-enterprise-tint-plum)}');
        expect(squashed).toContain('.ccnp-enterprise-page.callout.source{border-left-color:var(--color-ccnp-enterprise-forest);background:var(--color-ccnp-enterprise-tint-forest)}');

        // コードブロック（ライト背景 .codeblock と .code-label）
        expect(squashed).toContain('.ccnp-enterprise-page.codeblock{margin:16px0;border:1pxsolidvar(--color-ccnp-enterprise-line);border-radius:12px;background:var(--color-ccnp-enterprise-code-bg);overflow:hidden}');
        expect(squashed).toContain('.ccnp-enterprise-page.code-label{padding:6px14px;background:var(--color-ccnp-enterprise-tint-indigo);color:var(--color-ccnp-enterprise-indigo);font-weight:600;border-bottom:1pxsolidvar(--color-ccnp-enterprise-line)}');

        // 第7章 参照ソースカード（.refs, .ref, .badge, .ref-title, .ref-tag）
        expect(squashed).toContain('.ccnp-enterprise-page.refs{display:grid;gap:10px;margin:16px0}');
        expect(squashed).toContain('.ccnp-enterprise-page.ref{display:grid;grid-template-columns:36px1fr;gap:12px;align-items:start;background:var(--color-ccnp-enterprise-surface);border:1pxsolidvar(--color-ccnp-enterprise-line);border-radius:12px;padding:12px16px}');
        expect(squashed).toContain('.ccnp-enterprise-page.badge{width:36px;height:36px;border-radius:50%;background:var(--color-ccnp-enterprise-indigo);color:var(--color-ccnp-enterprise-surface);display:flex;align-items:center;justify-content:center;font-weight:600;line-height:1}');
        expect(squashed).toContain('.ccnp-enterprise-page.ref-title{font-weight:600}');
        expect(squashed).toContain('.ccnp-enterprise-page.ref-tag{display:inline-block;margin-left:8px;padding:010px;border-radius:999px;background:var(--color-ccnp-enterprise-tint-gold);color:var(--color-ccnp-enterprise-gold-text);font-weight:600}');

        expect(css).toMatch(/\.ccnp-enterprise-page\s+a\s*\{[^}]*text-decoration:\s*underline/);
    });

    it('サイドバー280px固定とメインコンテンツ全幅展開（calc(100% - 280px) / max-width: none）およびモバイル切替が定義されている', () => {
        const css = readFileSync('app/cisco/ccnp-enterprise/page.css', 'utf8');

        expect(css).toMatch(
            /\.ccnp-enterprise-page\s+\.sidebar\s*\{[^}]*width:\s*280px[^}]*top:\s*calc\(var\(--header-h,\s*60px\)\s*\+\s*var\(--disclaimer-height,\s*0px\)\)/,
        );
        expect(css).toMatch(
            /\.ccnp-enterprise-page\s+\.main\s*\{[^}]*margin-left:\s*280px;\s*width:\s*calc\(100%\s*-\s*280px\);\s*max-width:\s*none;\s*box-sizing:\s*border-box;/,
        );
    });

    it('page.tsx が Source Serif 4 Variable フォントを読み込んでいる', () => {
        const pageSource = readFileSync('app/cisco/ccnp-enterprise/page.tsx', 'utf8');
        expect(pageSource).toContain("import '@fontsource-variable/source-serif-4/index.css'");
    });

    it('コードブロックに .code-line が適用され、原本の構文ハイライトトークン（.t-kw, .t-sub, .t-cm 等）と構造クラスが完全保持されている', () => {
        const container = renderPage();
        const codeBlocks = container.querySelectorAll('.code-block');
        expect(codeBlocks.length).toBe(ccnpEnterpriseInventory.counts.codeBlock);
        codeBlocks.forEach((block, index) => {
            const lines = block.querySelectorAll('.code-line');
            expect(lines.length).toBe(ccnpEnterpriseInventory.structures.codeLines[index]);
        });

        // 原本の構文ハイライト span 件数と構造クラス件数の完全一致
        expect(container.querySelectorAll('main .codeblock').length).toBe(ccnpEnterpriseInventory.counts.codeBlock);
        expect(container.querySelectorAll('main .code-label').length).toBe(ccnpEnterpriseInventory.counts.codeBlock);
        // インベントリにない構文トークン・装飾クラスの件数は、移行元を固定するリテラルを保持する。
        expect(container.querySelectorAll('main .t-kw').length).toBe(114);
        expect(container.querySelectorAll('main .t-sub').length).toBe(171);
        expect(container.querySelectorAll('main .t-cm').length).toBe(50);
        expect(container.querySelectorAll('main .t-n').length).toBe(65);
        expect(container.querySelectorAll('main .t-ph').length).toBe(10);
        expect(container.querySelectorAll('main .t-s').length).toBe(5);
        expect(container.querySelectorAll('main .k').length).toBe(6);
        expect(container.querySelectorAll('main .kn').length).toBe(6);
        expect(container.querySelectorAll('main .s2').length).toBe(38);
        expect(container.querySelectorAll('main .c1').length).toBe(2);
        expect(container.querySelectorAll('main .mi').length).toBe(3);

        // コールアウトと参照ソースカードの構造クラス
        expect(container.querySelectorAll('main .callout-head').length).toBe(72);
        expect(container.querySelectorAll('main .callout-body').length).toBe(72);
        expect(container.querySelectorAll('main .refs').length).toBe(4);
        expect(container.querySelectorAll('main .ref').length).toBe(71);
        expect(container.querySelectorAll('main .badge').length).toBe(71);
        expect(container.querySelectorAll('main .ref-tag').length).toBe(31);
    });

    it('render-theme.json に flowchart / sequence / pie の原本描画設定が含まれている', () => {
        expect(theme).toMatchObject({
            theme: 'base',
            flowchart: {
                useMaxWidth: false,
                htmlLabels: true,
                nodeSpacing: 40,
                rankSpacing: 45,
            },
            sequence: { useMaxWidth: false },
            pie: { useMaxWidth: false },
        });
    });

    it('サイドバーの初期状態で第1章の .g が open になり、別章のリンクをクリックすると該当 .g が open かつリンクが active になる', () => {
        const { container } = render(<CcnpEnterpriseGuide />);
        const groups = container.querySelectorAll('.sidebar .g');
        expect(groups.length).toBe(7);
        expect(groups[0]?.classList.contains('open')).toBe(true);

        const ch2Link = groups[1]?.querySelector('a');
        expect(ch2Link).not.toBeNull();
        if (ch2Link) {
            fireEvent.click(ch2Link);
            expect(ch2Link.classList.contains('active')).toBe(true);
            expect(ch2Link.getAttribute('aria-current')).toBe('location');
            expect(groups[1]?.classList.contains('open')).toBe(true);
            expect(groups[0]?.classList.contains('open')).toBe(false);
        }
    });
});
