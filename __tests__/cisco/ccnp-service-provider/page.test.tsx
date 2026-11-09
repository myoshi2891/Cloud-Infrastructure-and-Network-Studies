// __tests__/cisco/ccnp-service-provider/page.test.tsx
// @vitest-environment jsdom
import { readFileSync } from 'node:fs';
import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Page from '@/app/cisco/ccnp-service-provider/page';
import CcnpServiceProviderGuide from '@/app/cisco/ccnp-service-provider/CcnpServiceProviderGuide';
import { NAV_ITEMS } from '@/app/cisco/ccnp-service-provider/constants';
import theme from '@/app/cisco/ccnp-service-provider/render-theme.json';
import { ccnpServiceProviderInventory } from '@/__tests__/helpers/ccnp-service-provider-inventory';
import { defineMigrationSuite } from '@/__tests__/helpers/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

defineMigrationSuite(
    'CCNP Service Provider 完全ガイド — 全量移行検証',
    Page,
    ccnpServiceProviderInventory,
);

describe('CCNP Service Provider ガイド — リスト・スタイリング・図解・コード検証', () => {
    const renderPage = () => {
        const { container } = render(<Page />);
        return container;
    };

    it('スコープCSSにサイドバーブランド、ナビゲーション、金色ドットリスト、インディゴ数字バッジ、Tabler Icons、図解カード透過、コールアウト、コードブロックがすべて定義されている', () => {
        const css = readFileSync('app/cisco/ccnp-service-provider/page.css', 'utf8');
        const squashed = css.replace(/\s+/g, '').replace(/;\}/g, '}');

        expect(css).toContain('@import');
        expect(css).toContain('@tabler/icons-webfont/tabler-icons.min.css');

        // サイドバーのブランド
        expect(squashed).toContain('.ccnp-service-provider-page.brandsvg');
        expect(squashed).toContain('.ccnp-service-provider-page.brand-title');
        expect(squashed).toContain('.ccnp-service-provider-page.brand-sub');

        // サイドバーのナビゲーション（.nav a.l2, .nav a.l3, .nav a.l4, .nav a.active）
        expect(squashed).toContain('.ccnp-service-provider-page.nava{');
        expect(squashed).toContain('.ccnp-service-provider-page.nava.l2{');
        expect(squashed).toContain('.ccnp-service-provider-page.nava.l3{');
        expect(squashed).toContain('.ccnp-service-provider-page.nava.l4{');
        expect(squashed).toContain('.ccnp-service-provider-page.nava.active{');

        // 箇条書き（金色丸ドット）とサイドバー内のドット無効化
        expect(squashed).toContain('.ccnp-service-provider-pageul>li::before{content:\'\';position:absolute;left:6px;top:0.72em;width:6px;height:6px;border-radius:50%;background:var(--color-ccnp-sp-gold)');
        expect(squashed).toContain('.ccnp-service-provider-page.sidebarnavli::before{content:none!important');

        // 番号付きリスト（インディゴ数字バッジ）
        expect(squashed).toContain('.ccnp-service-provider-pageol{counter-reset:item');
        expect(squashed).toContain('.ccnp-service-provider-pageol>li::before{content:counter(item);position:absolute;left:0;top:0.12em;width:26px;height:26px;border-radius:50%;background:var(--color-ccnp-sp-tint-indigo);color:var(--color-ccnp-sp-indigo)');

        // 図解カード（白背景）と MermaidDiagram 内側ラッパーの背景透過・自然幅維持
        expect(squashed).toContain('.ccnp-service-provider-page.diagram{');
        expect(squashed).toContain('.ccnp-service-provider-page.diagram.mm>[role="img"]');
        expect(squashed).toContain('background:transparent!important;border:0;border-radius:0;padding:0;margin:0;width:100%;overflow:visible');
        expect(squashed).toContain('.ccnp-service-provider-page.diagram.mm.mermaid-target{display:flex;justify-content:center;justify-content:safecenter;width:100%');
        expect(squashed).toContain('.ccnp-service-provider-page.diagram.mmsvg{flex-shrink:0;max-width:none;height:auto;overflow:visible');

        // コールアウト（.callout-title / .callout）
        expect(squashed).toContain('.ccnp-service-provider-page.callout{margin:24px0;padding:18px22px;border:1pxsolidvar(--color-ccnp-sp-border-secondary);border-left-width:5px;border-radius:var(--border-radius-lg,12px);background:var(--color-ccnp-sp-surface)');
        expect(squashed).toContain('.ccnp-service-provider-page.callout-title{display:flex;align-items:center;gap:8px;margin:0010px');
        expect(squashed).toContain('.ccnp-service-provider-page.callout.practice{border-left-color:var(--color-ccnp-sp-gold);background:var(--color-ccnp-sp-tint-gold)}');
        expect(squashed).toContain('.ccnp-service-provider-page.callout.note{border-left-color:var(--color-ccnp-sp-plum);background:var(--color-ccnp-sp-tint-plum)}');
        expect(squashed).toContain('.ccnp-service-provider-page.callout.source{border-left-color:var(--color-ccnp-sp-forest);background:var(--color-ccnp-sp-tint-forest)}');

        // コードブロック（.code-block と構文トークン）
        expect(squashed).toContain('.ccnp-service-provider-page.code-block,');
        expect(squashed).toContain('border-left:4pxsolidvar(--color-ccnp-sp-indigo)');
        expect(squashed).toContain('.ccnp-service-provider-page.tk-prompt{color:var(--color-ccnp-sp-text-secondary)}');
        expect(squashed).toContain('.ccnp-service-provider-page.tk-cmd{color:var(--color-ccnp-sp-indigo);font-weight:500}');
        expect(squashed).toContain('.ccnp-service-provider-page.tk-comment{color:var(--color-ccnp-sp-text-tertiary);font-style:italic}');
        expect(squashed).toContain('.ccnp-service-provider-page.tk-kw{color:var(--color-ccnp-sp-plum);font-weight:500}');
        expect(squashed).toContain('.ccnp-service-provider-page.tk-ip{color:var(--color-ccnp-sp-forest)}');
        expect(squashed).toContain('.ccnp-service-provider-page.tk-num{color:var(--color-ccnp-sp-plum)}');

        expect(css).toMatch(/\.ccnp-service-provider-page\s+a\s*\{[^}]*text-decoration:\s*underline/);
    });

    it('サイドバー280px固定とメインコンテンツ全幅展開（calc(100% - 280px) / max-width: none）およびモバイル切替が定義されている', () => {
        const css = readFileSync('app/cisco/ccnp-service-provider/page.css', 'utf8');

        expect(css).toMatch(
            /\.ccnp-service-provider-page\s+\.sidebar\s*\{[^}]*width:\s*280px[^}]*top:\s*calc\(var\(--header-h,\s*60px\)\s*\+\s*var\(--disclaimer-height,\s*0px\)\)/,
        );
        expect(css).toMatch(
            /\.ccnp-service-provider-page\s+\.main\s*\{[^}]*margin-left:\s*280px;\s*width:\s*calc\(100%\s*-\s*280px\);\s*max-width:\s*none;\s*box-sizing:\s*border-box;/,
        );
    });

    it('page.tsx が Source Serif 4 Variable フォントを読み込んでいる', () => {
        const pageSource = readFileSync('app/cisco/ccnp-service-provider/page.tsx', 'utf8');
        expect(pageSource).toContain("import '@fontsource-variable/source-serif-4/index.css'");
    });

    it('NAV_ITEMS の対象だけを順番に監視し、目次にない section を監視しない', () => {
        const observedIds: string[] = [];
        const originalIO = globalThis.IntersectionObserver;

        class MockIntersectionObserver implements IntersectionObserver {
            readonly root: Element | Document | null = null;
            readonly rootMargin: string = '';
            readonly thresholds: ReadonlyArray<number> = [];

            constructor(private callback: IntersectionObserverCallback) {}

            observe(element: Element) {
                if (element.id) observedIds.push(element.id);
            }
            unobserve() {}
            disconnect() {}
            takeRecords(): IntersectionObserverEntry[] {
                return [];
            }
        }

        globalThis.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;

        try {
            const { unmount } = render(
                <CcnpServiceProviderGuide>
                    {NAV_ITEMS.map((item) => (
                        <section key={item.id} id={item.id} className="section">
                            <h2>{item.label}</h2>
                        </section>
                    ))}
                    <section id="unexpected-section" className="section">
                        <h2>対象外</h2>
                    </section>
                </CcnpServiceProviderGuide>,
            );

            expect(observedIds).toEqual(NAV_ITEMS.map((i) => i.id));
            expect(observedIds).not.toContain('unexpected-section');

            unmount();
        } finally {
            globalThis.IntersectionObserver = originalIO;
        }
    });
});
