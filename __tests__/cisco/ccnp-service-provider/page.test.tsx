// __tests__/cisco/ccnp-service-provider/page.test.tsx
// @vitest-environment jsdom
import { readFileSync } from 'node:fs';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    /** 原本との全量照合に使うページ全体のDOMを描画する。 */
    const renderPage = () => {
        const { container } = render(<Page />);
        return container;
    };

    it('スコープCSSにサイドバーブランド、ナビゲーション、金色ドットリスト、インディゴ数字バッジ、Tabler Icons、図解カード透過、コールアウト、コードブロックがすべて定義されている', () => {
        const css = readFileSync('app/cisco/ccnp-service-provider/page.css', 'utf8');
        const squashed = css.replace(/\s+/g, '').replace(/;\}/g, '}');

        expect(css).toContain('@import');
        expect(css).toContain('@tabler/icons-webfont/tabler-icons.min.css');

        // サイドバーのブランドとクレストSVG
        expect(squashed).toContain('.ccnp-service-provider-page.brand{display:flex;align-items:center;gap:12px;padding:20px20px16px;border-bottom:1pxsolidvar(--color-ccnp-sp-border-tertiary)');
        expect(squashed).toContain('.ccnp-service-provider-page.brandsvg');
        expect(squashed).toContain('.ccnp-service-provider-page.crest.ring{fill:var(--color-ccnp-sp-tint-indigo);stroke:var(--color-ccnp-sp-indigo);stroke-width:1.5}');
        expect(squashed).toContain('.ccnp-service-provider-page.brand-title{font-family:var(--font-ccnp-sp-serif);font-weight:500;font-size:1rem');
        expect(squashed).toContain('.ccnp-service-provider-page.brand-sub{font-size:1rem');

        // サイドバーのナビゲーション（.nav, .nav a, .nav a.l2, .nav a.l3, .nav a.l4, .nav a.active）
        expect(squashed).toContain('.ccnp-service-provider-page.nav{position:relative;flex:1;overflow-y:auto;padding:12px12px28px}');
        expect(squashed).toContain('.ccnp-service-provider-page.nava{display:block;padding:6px12px;border-left:3pxsolidtransparent;border-radius:var(--border-radius-md,8px);color:var(--color-ccnp-sp-text-secondary);font-size:1rem');
        expect(squashed).toContain('.ccnp-service-provider-page.nava.l2{margin-top:8px;color:var(--color-ccnp-sp-ink);font-weight:500}');
        expect(squashed).toContain('.ccnp-service-provider-page.nava.l3{padding-left:24px}');
        expect(squashed).toContain('.ccnp-service-provider-page.nava.l4{padding-left:36px}');
        expect(squashed).toContain('.ccnp-service-provider-page.nava.active{background:var(--color-ccnp-sp-tint-indigo);border-left-color:var(--color-ccnp-sp-indigo);color:var(--color-ccnp-sp-indigo);font-weight:500}');

        // Hero・メタ情報（.hero, .hero-meta, .meta-row, .meta-label, .meta-text）
        expect(squashed).toContain('.ccnp-service-provider-page.hero{padding:48px48px32px;background:var(--color-ccnp-sp-surface);border-bottom:1pxsolidvar(--color-ccnp-sp-border-secondary)}');
        expect(squashed).toContain('.ccnp-service-provider-page.heroh1{margin:0020px;font-family:var(--font-ccnp-sp-serif);font-weight:500;font-size:2rem');
        expect(squashed).toContain('.ccnp-service-provider-page.hero-meta{display:grid;gap:10px;margin:0}');
        expect(squashed).toContain('.ccnp-service-provider-page.meta-row{display:flex;flex-wrap:wrap;align-items:baseline;gap:8px14px}');
        expect(squashed).toContain('.ccnp-service-provider-page.meta-label{flex:none;padding:2px12px;border:1pxsolidvar(--color-ccnp-sp-border-primary);border-radius:var(--border-radius-md,8px);background:var(--color-ccnp-sp-tint-indigo);color:var(--color-ccnp-sp-indigo);font-weight:500}');
        expect(squashed).toContain('.ccnp-service-provider-page.meta-text{min-width:0;overflow-wrap:anywhere}');

        // セクション余白・見出し（h2〜h6）
        expect(squashed).toContain('.ccnp-service-provider-page.section{padding:36px48px;border-bottom:1pxsolidvar(--color-ccnp-sp-border-tertiary)}');
        expect(squashed).toContain('.ccnp-service-provider-page.section.lvl4{padding-top:30px;padding-bottom:30px}');
        expect(squashed).toContain('.ccnp-service-provider-page.section.intro{padding-top:28px;padding-bottom:12px}');
        expect(squashed).toContain('.ccnp-service-provider-page.section.lvl2:has(>h2:only-child){padding-top:28px;padding-bottom:20px}');
        expect(squashed).toContain('.ccnp-service-provider-pageh2{margin:0022px;padding-left:14px;border-left:4pxsolidvar(--color-ccnp-sp-gold);font-size:1.625rem;color:var(--color-ccnp-sp-indigo)}');
        expect(squashed).toContain('.ccnp-service-provider-pageh3{margin:0018px;font-size:1.375rem;color:var(--color-ccnp-sp-indigo)}');
        expect(squashed).toContain('.ccnp-service-provider-pageh4{margin:0018px;font-size:1.1875rem}');
        expect(squashed).toContain('.ccnp-service-provider-pageh5{margin:30px012px;padding-bottom:6px;border-bottom:1pxsolidvar(--color-ccnp-sp-border-secondary);font-size:1.0625rem;color:var(--color-ccnp-sp-indigo)}');
        expect(squashed).toContain('.ccnp-service-provider-pageh6{margin:24px010px;font-size:1rem}');

        // 箇条書き（金色丸ドット）とサイドバー内のドット無効化
        expect(squashed).toContain('.ccnp-service-provider-pageul>li::before{content:\'\';position:absolute;left:6px;top:0.72em;width:6px;height:6px;border-radius:50%;background:var(--color-ccnp-sp-gold)');
        expect(squashed).toContain('.ccnp-service-provider-page.sidebarnavli::before{content:none!important');

        // 番号付きリスト（インディゴ数字バッジ）
        expect(squashed).toContain('.ccnp-service-provider-pageol{counter-reset:item');
        expect(squashed).toContain('.ccnp-service-provider-pageol>li::before{content:counter(item);position:absolute;left:0;top:0.12em;width:26px;height:26px;border-radius:50%;background:var(--color-ccnp-sp-tint-indigo);color:var(--color-ccnp-sp-indigo)');

        // テーブル（セル間の縦罫線 th + th, td + td）
        expect(squashed).toContain('.ccnp-service-provider-pageth+th,.ccnp-service-provider-pagetd+td{border-left:1pxsolidvar(--color-ccnp-sp-border-tertiary)}');

        // 図解カード（白背景）と MermaidDiagram 内側ラッパーの背景透過・自然幅維持
        expect(squashed).toContain('.ccnp-service-provider-page.diagram{');
        expect(squashed).toContain('.ccnp-service-provider-page.diagram.mm>[role="img"]');
        expect(squashed).toContain('background:transparent!important;border:0;border-radius:0;padding:0;margin:0;width:100%;overflow:visible');
        expect(squashed).toContain('.ccnp-service-provider-page.diagram.mm.mermaid-target{display:flex;justify-content:center;justify-content:safecenter;width:100%');
        expect(squashed).toContain('.ccnp-service-provider-page.diagram.mmsvg{flex-shrink:0;max-width:none;height:auto;overflow:visible');

        // コールアウト（.callout-title / .callout）
        expect(squashed).toContain('.ccnp-service-provider-page.callout{margin:0022px;padding:14px20px8px;border:1pxsolidvar(--color-ccnp-sp-border-secondary);border-left-width:5px;border-radius:var(--border-radius-lg,12px);background:var(--color-ccnp-sp-surface)');
        expect(squashed).toContain('.ccnp-service-provider-page.callout-title{display:flex;align-items:center;gap:8px;margin:0010px');
        expect(squashed).toContain('.ccnp-service-provider-page.callout.practice{border-left-color:var(--color-ccnp-sp-gold);background:var(--color-ccnp-sp-tint-gold)}');
        expect(squashed).toContain('.ccnp-service-provider-page.callout.note{border-left-color:var(--color-ccnp-sp-plum);background:var(--color-ccnp-sp-tint-plum)}');
        expect(squashed).toContain('.ccnp-service-provider-page.callout.source{border-left-color:var(--color-ccnp-sp-forest);background:var(--color-ccnp-sp-tint-forest)}');

        // コードブロック（.code-block と構文トークン .tk-kw, .tk-cmd, .tk-ph 等）
        expect(squashed).toContain('.ccnp-service-provider-page.code-block,');
        expect(squashed).toContain('border-left:4pxsolidvar(--color-ccnp-sp-indigo)');
        expect(squashed).toContain('.ccnp-service-provider-page.tk-prompt{color:var(--color-ccnp-sp-text-secondary)}');
        expect(squashed).toContain('.ccnp-service-provider-page.tk-kw,.ccnp-service-provider-page.tk-cmd{color:var(--color-ccnp-sp-indigo);font-weight:500}');
        expect(squashed).toContain('.ccnp-service-provider-page.tk-comment{color:var(--color-ccnp-sp-text-tertiary);font-style:italic}');
        expect(squashed).toContain('.ccnp-service-provider-page.tk-ip{color:var(--color-ccnp-sp-forest)}');
        expect(squashed).toContain('.ccnp-service-provider-page.tk-ph{color:var(--color-ccnp-sp-plum)}');
        expect(squashed).toContain('.ccnp-service-provider-page.tk-num{color:var(--color-ccnp-sp-plum)}');

        // リンク・ホバー色・640pxブレイクポイント
        expect(squashed).toContain('.ccnp-service-provider-pagea:hover{color:var(--color-ccnp-sp-plum)}');
        expect(squashed).toContain('@media(max-width:640px)');
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

    it('全19個の h5 見出し・全41個のコールアウト・構文トークン・Heroメタ・セクション階層・layoutラッパー・Mermaid設定が原本と100%一致する', () => {
        const container = renderPage();

        // .layout ラッパーの存在
        expect(container.querySelector('.ccnp-service-provider-page > .layout')).not.toBeNull();
        expect(container.querySelector('.ccnp-service-provider-page > .layout > aside.sidebar')).not.toBeNull();
        expect(container.querySelector('.ccnp-service-provider-page > .layout > main.main')).not.toBeNull();

        // h5 見出し全19件の順序とテキスト一致
        const expectedH5 = [
            '① 1.1.a コアアーキテクチャ',
            '② 1.1.b トランスポート技術',
            '③ 1.1.c モビリティ',
            '④ 1.1.d ルーテッド オプティカル ネットワーク（RON）',
            '① 1.4.a MPLS QoS モデル（パイプ、ショートパイプ、ユニフォーム）',
            '② 1.4.b MPLS TE QoS（MAM、RDM、CBTS、PBTS、DS-TE）',
            '③ 1.4.c DiffServ と IntServ の QoS モデル',
            '④ 1.4.d エンタープライズ環境と SP 環境の間の信頼境界',
            '⑤ 1.4.e IPv6 フローラベル',
            '① 1.5.a コントロールプレーン保護（LPTS と CoPP）',
            '② 1.5.b BGP-TTL のセキュリティとプロトコル認証',
            '③ 1.5.c BGP プレフィックスの抑制',
            '④ 1.5.d LDP セキュリティ（認証およびラベル割り当てフィルタリング）',
            '⑤ 1.5.e BGPsec',
            '⑥ 1.5.f BGP Flowspec',
            '① 1.7.a uRPF（Unicast Reverse Path Forwarding）',
            '② 1.7.b ACL',
            '③ 1.7.c RTBH（Remotely Triggered Black Hole）',
            '④ 1.7.d MACsec',
        ];
        const renderedH5 = [...container.querySelectorAll('main h5')].map((el) =>
            (el.textContent ?? '').replace(/\s+/g, ' ').trim(),
        );
        expect(renderedH5).toEqual(expectedH5);

        // Hero・メタ情報のDOM構造
        expect(container.querySelectorAll('main .hero')).toHaveLength(1);
        expect(container.querySelectorAll('main .hero-meta')).toHaveLength(1);
        expect(container.querySelectorAll('main .meta-row')).toHaveLength(4);
        expect(container.querySelectorAll('main .meta-label')).toHaveLength(4);
        expect(container.querySelectorAll('main .meta-text')).toHaveLength(4);

        // セクション階層のDOM構造
        expect(container.querySelectorAll('main > section.section')).toHaveLength(28);
        expect(container.querySelectorAll('main > section.section.intro')).toHaveLength(1);
        expect(container.querySelectorAll('main > section.section.lvl2')).toHaveLength(5);
        expect(container.querySelectorAll('main > section.section.lvl3')).toHaveLength(15);
        expect(container.querySelectorAll('main > section.section.lvl4')).toHaveLength(7);

        // コールアウトとアイコンの件数
        expect(container.querySelectorAll('main .callout')).toHaveLength(41);
        expect(container.querySelectorAll('main .callout.practice')).toHaveLength(18);
        expect(container.querySelectorAll('main .callout.source')).toHaveLength(19);
        expect(container.querySelectorAll('main .callout.note')).toHaveLength(4);
        expect(container.querySelectorAll('main .callout-title')).toHaveLength(41);
        expect(container.querySelectorAll('main .ti-bulb')).toHaveLength(18);
        expect(container.querySelectorAll('main .ti-external-link')).toHaveLength(19);
        expect(container.querySelectorAll('main .ti-info-circle')).toHaveLength(4);

        // コードブロック構文ハイライトトークンの件数
        expect(container.querySelectorAll('main .tk-comment')).toHaveLength(5);
        expect(container.querySelectorAll('main .tk-prompt')).toHaveLength(9);
        expect(container.querySelectorAll('main .tk-kw')).toHaveLength(35);
        expect(container.querySelectorAll('main .tk-cmd')).toHaveLength(9);
        expect(container.querySelectorAll('main .tk-ip')).toHaveLength(4);
        expect(container.querySelectorAll('main .tk-ph')).toHaveLength(4);
        expect(container.querySelectorAll('main .tk-num')).toHaveLength(24);

        // Mermaid テーマ設定の検証
        expect(theme.theme).toBe('base');
        expect(theme.flowchart.wrappingWidth).toBe(360);
        expect(theme.themeVariables.primaryColor).toBe('#EEF1F8');
        expect(theme.themeVariables.primaryBorderColor).toBe('#2E3F72');
    });

    it('目次リンクのクリックで active クラスと aria-current が付与され、モバイル閉鎖コールバックが呼ばれる', () => {
        const container = renderPage();
        const toggle = container.querySelector('.sidebar-toggle') as HTMLButtonElement;
        const sidebar = container.querySelector('#sidebar');
        fireEvent.click(toggle);
        expect(sidebar).toHaveClass('open');
        expect(toggle).toHaveAttribute('aria-expanded', 'true');
        const firstLink = container.querySelector('.nav a[href="#s1"]') as HTMLAnchorElement;
        expect(firstLink).not.toBeNull();
        fireEvent.click(firstLink);
        expect(sidebar).not.toHaveClass('open');
        expect(toggle).toHaveAttribute('aria-expanded', 'false');
        expect(firstLink.classList.contains('active')).toBe(true);
        expect(firstLink.getAttribute('aria-current')).toBe('location');
    });

    it.each([
        ['Enter', '{Enter}'],
        ['Space', ' '],
        ['Escape', '{Escape}'],
    ] as const)('背景ボタンは %s キーで開いた目次を閉じる', async (_name, key) => {
        const user = userEvent.setup();
        const { container, getByRole, queryByRole } = render(<CcnpServiceProviderGuide />);
        const toggle = getByRole('button', { name: '目次を開閉' });
        await user.click(toggle);
        expect(container.querySelector('#sidebar')).toHaveClass('open');

        const backdrop = getByRole('button', { name: '目次を閉じる' });
        backdrop.focus();
        await user.keyboard(key);

        expect(container.querySelector('#sidebar')).not.toHaveClass('open');
        expect(toggle).toHaveAttribute('aria-expanded', 'false');
        expect(queryByRole('button', { name: '目次を閉じる' })).not.toBeInTheDocument();
    });
});
