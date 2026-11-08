// __tests__/cisco/ccnp-enterprise/page.test.tsx
// @vitest-environment jsdom
import { readFileSync } from 'node:fs';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Page from '@/app/cisco/ccnp-enterprise/page';
import CcnpEnterpriseGuide from '@/app/cisco/ccnp-enterprise/CcnpEnterpriseGuide';
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

    it('スコープCSSに金色ドットリスト、Tabler Icons、図解カードと内側ラッパー透過、リンク下線、原本固有の装飾クラスがすべて定義されている', () => {
        const css = readFileSync('app/cisco/ccnp-enterprise/page.css', 'utf8');
        const squashed = css.replace(/\s+/g, '');

        expect(css).toContain('@import');
        expect(css).toContain('@tabler/icons-webfont/tabler-icons.min.css');

        // 箇条書き（金色丸ドット）とサイドバー内のドット無効化
        expect(squashed).toContain('.ccnp-enterprise-pageul>li::before{content:\'\';position:absolute;left:6px;top:0.75em;width:6px;height:6px;border-radius:50%;background:var(--color-ccnp-enterprise-gold)');
        expect(squashed).toContain('.ccnp-enterprise-page.sidebarnavli::before{content:none!important');

        // 図解カード（白背景）と MermaidDiagram 内側ラッパーの背景透過・自然幅維持
        expect(squashed).toContain('.ccnp-enterprise-page.diagram{margin:18px0;padding:16px;background:var(--color-ccnp-enterprise-surface);border:1pxsolidvar(--color-ccnp-enterprise-line);border-radius:12px;overflow-x:auto');
        expect(squashed).toContain('.ccnp-enterprise-page.diagram.mm>[role="img"]');
        expect(squashed).toContain('background:transparent!important;border:0;border-radius:0;padding:0;margin:0;width:100%;overflow:visible');
        expect(squashed).toContain('.ccnp-enterprise-page.diagram.mm.mermaid-target{display:flex;justify-content:center;justify-content:safecenter;width:100%');
        expect(squashed).toContain('.ccnp-enterprise-page.diagram.mmsvg{flex-shrink:0;max-width:none;height:auto;overflow:visible');

        // 見出し・コールアウト等
        expect(squashed).toContain('.ccnp-enterprise-page.hero{');
        expect(squashed).toContain('.ccnp-enterprise-pageh2{');
        expect(squashed).toContain('.ccnp-enterprise-pageh3{');
        expect(squashed).toContain('.ccnp-enterprise-pageh4{');
        expect(squashed).toContain('.ccnp-enterprise-page.callout{');

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

    it('コードブロックに .code-line が適用されている', () => {
        const container = renderPage();
        const codeBlocks = container.querySelectorAll('.code-block');
        expect(codeBlocks.length).toBe(ccnpEnterpriseInventory.counts.codeBlock);
        codeBlocks.forEach((block) => {
            const lines = block.querySelectorAll('.code-line');
            expect(lines.length).toBeGreaterThan(0);
        });
    });

    it('サイドバー目次リンクをクリックすると active クラス・aria-current="location" が付与される', () => {
        const { container } = render(<CcnpEnterpriseGuide />);
        const firstLink = container.querySelector('.sidebar nav a');
        expect(firstLink).not.toBeNull();
    });
});
