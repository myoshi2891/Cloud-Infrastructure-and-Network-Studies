// __tests__/recommended-books/tcpip-illustrated-vol1/page.test.tsx
// @vitest-environment jsdom
import fs from 'node:fs';
import { fireEvent, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import inventory from '@/docs/migration-inventory/tcpip-illustrated-vol1.json';
import Page from '@/app/recommended-books/tcpip-illustrated-vol1/page';
import { DIAGRAMS, NAV_ITEMS } from '@/app/recommended-books/tcpip-illustrated-vol1/constants';
import {
    MermaidDiagramMock,
    codeBlockSelector,
    extractBodyContent,
    squash,
} from '@/__tests__/helpers/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

afterEach(() => {
    vi.unstubAllGlobals();
    window.history.replaceState(null, '', '/');
});

const mount = () => render(<Page />).container;

describe('tcpip-illustrated-vol1 — 移行元コンテンツの全量照合', () => {
    it.each([
        ['h1', inventory.h1],
        ['h2', inventory.h2],
        ['h3', inventory.h3],
        ['h4', inventory.h4],
        ['th', inventory.th],
        ['td', inventory.td],
        ['main li', inventory.listItems],
    ] as const)('%s の件数・順序・テキストが移行元と一致する', (selector, expectedItems) => {
        const container = mount();
        const rendered = [...container.querySelectorAll(selector)].map((element) =>
            squash(element.textContent ?? ''),
        );
        expect(rendered).toEqual(expectedItems.map(squash));
    });

    it('サイドバーナビゲーションの li 件数が NAV_ITEMS と一致する', () => {
        const container = mount();
        expect(container.querySelectorAll('nav ul > li')).toHaveLength(NAV_ITEMS.length);
    });

    it('外部リンクが件数・順序・URL・ラベルまで移行元と一致する', () => {
        const container = mount();
        const rendered = [...container.querySelectorAll('a[href^="http"]')].map((anchor) => ({
            href: anchor.getAttribute('href'),
            text: squash(anchor.textContent ?? ''),
        }));
        expect(rendered).toEqual(
            inventory.links.map((link) => ({ href: link.href, text: squash(link.text) })),
        );
    });

    it('本文・注釈・コールアウト全文が移行元の順序どおり一致する', () => {
        const container = mount();
        expect(extractBodyContent(container)).toEqual(inventory.bodyContent);
    });

    it('35点の図が件数どおり存在し、説明と自然スケール(preserveNaturalScale)を持つ', () => {
        const container = mount();
        const diagramSelector = '[data-testid="mermaid-diagram"]';
        const diagrams = [...container.querySelectorAll(diagramSelector)];
        expect(diagrams).toHaveLength(inventory.counts.diagram);
        expect(diagrams).toHaveLength(35);

        diagrams.forEach((element) => {
            const hasLabel = Boolean(element.getAttribute('aria-label')?.trim());
            const isDecorative = element.getAttribute('data-decorative') === 'true'
                || element.getAttribute('aria-hidden') === 'true';
            expect(hasLabel || isDecorative).toBe(true);
            expect(element.getAttribute('data-preserve-natural-scale')).toBe('true');
        });

        // コードブロックや不正な静的画像がないこと
        expect(container.querySelectorAll(codeBlockSelector)).toHaveLength(0);
        expect(container.querySelectorAll('img, svg:not([data-testid="mermaid-diagram"] svg)')).toHaveLength(0);
    });

    it('テーブルが22件存在し、thead と th[scope="col"] を正しく持つ', () => {
        const container = mount();
        const tables = [...container.querySelectorAll('table')];
        expect(tables).toHaveLength(inventory.counts.table);
        expect(tables).toHaveLength(22);

        tables.forEach((table, index) => {
            expect(table.querySelector('thead')).not.toBeNull();
            expect(table.querySelectorAll('thead th[scope="col"]').length).toBe(
                inventory.structures.tableColumnHeaders[index],
            );
        });
    });

    it('原本の全アンカーIDを保持し、内部リンクの到達先が100%存在する', () => {
        const container = mount();
        const ids = [...container.querySelectorAll('[id]')].map((el) => el.id);
        expect(new Set(ids).size).toBe(ids.length);

        const internalLinks = [...container.querySelectorAll('a[href^="#"]')];
        expect(internalLinks.length).toBeGreaterThan(0);
        for (const link of internalLinks) {
            const href = link.getAttribute('href');
            if (!href || href === '#') continue;
            const target = container.querySelector(href);
            expect(target, `Missing anchor target for ${href}`).not.toBeNull();
        }
    });

    it('横スクロールする全35図と全22表にキーボードフォーカス(tabIndex=0)と領域名(role="region", aria-label)がある', () => {
        const container = mount();
        const regions = [...container.querySelectorAll('.mermaid-wrap, .table-scroll')];
        expect(regions).toHaveLength(35 + 22);

        regions.forEach((region) => {
            expect(region).toHaveAttribute('tabindex', '0');
            expect(region).toHaveAttribute('role', 'region');
            expect(region.getAttribute('aria-label')?.trim()).toBeTruthy();
        });
    });
});

describe('tcpip-illustrated-vol1 — 操作・インタラクション', () => {
    it('サイドバー目次のリンク数が 24 件存在し、NAV_ITEMS と同期していること', () => {
        const container = mount();
        const navLinks = [...container.querySelectorAll('.sidebar nav a')];
        expect(navLinks).toHaveLength(24);
        expect(navLinks).toHaveLength(NAV_ITEMS.length);
        navLinks.forEach((link, idx) => {
            expect(link.getAttribute('href')).toBe(`#${NAV_ITEMS[idx]?.id}`);
            expect(squash(link.textContent ?? '')).toBe(squash(NAV_ITEMS[idx]?.label ?? ''));
        });
    });

    it('モバイルサイドバートグルが正しく動作し、aria-expanded が同期すること', () => {
        const container = mount();
        const toggle = container.querySelector<HTMLButtonElement>('.sidebar-toggle');
        expect(toggle).not.toBeNull();
        expect(toggle).toHaveAttribute('type', 'button');
        expect(toggle).toHaveAttribute('aria-expanded', 'false');

        const sidebar = container.querySelector('.sidebar');
        expect(sidebar).not.toBeNull();

        // 開く
        fireEvent.click(toggle!);
        expect(toggle).toHaveAttribute('aria-expanded', 'true');
        expect(sidebar?.classList.contains('open')).toBe(true);

        // Escapeキーで閉じ、フォーカスをトグルへ戻す
        fireEvent.keyDown(window, { key: 'Escape' });
        expect(toggle).toHaveAttribute('aria-expanded', 'false');
        expect(sidebar?.classList.contains('open')).toBe(false);
        expect(toggle).toHaveFocus();

        // リンククリックで閉じる
        fireEvent.click(toggle!);
        expect(toggle).toHaveAttribute('aria-expanded', 'true');
        const firstNavLink = container.querySelector('.sidebar nav a');
        if (firstNavLink) {
            fireEvent.click(firstNavLink);
            expect(toggle).toHaveAttribute('aria-expanded', 'false');
            expect(sidebar?.classList.contains('open')).toBe(false);
        }
    });

    it('章末チェックリストが 26 項目存在し、トグルでカウンターが正しく更新されること', () => {
        const container = mount();
        const checklistCard = container.querySelector('.checklist-card');
        expect(checklistCard).not.toBeNull();

        const checkboxes = container.querySelectorAll<HTMLInputElement>('.checklist-card input[type="checkbox"]');
        expect(checkboxes).toHaveLength(26);

        const counter = container.querySelector('.checklist-header .count');
        expect(counter?.textContent?.trim()).toBe('0 / 26 完了');

        // 1つ目をチェック
        fireEvent.click(checkboxes[0]!);
        expect(counter?.textContent?.trim()).toBe('1 / 26 完了');

        // 2つ目をチェック
        fireEvent.click(checkboxes[1]!);
        expect(counter?.textContent?.trim()).toBe('2 / 26 完了');

        // 1つ目を解除
        fireEvent.click(checkboxes[0]!);
        expect(counter?.textContent?.trim()).toBe('1 / 26 完了');
    });

    it('すべての Mermaid ダイアグラム定義（35点）が構文エラーなく parse できること', async () => {
        const { DIAGRAMS } = await import('@/app/recommended-books/tcpip-illustrated-vol1/constants');
        const mermaidModule = await import('mermaid');
        const mermaid = mermaidModule.default;
        mermaid.initialize({ startOnLoad: false });

        expect(Object.keys(DIAGRAMS)).toHaveLength(35);
        for (const [id, chart] of Object.entries(DIAGRAMS)) {
            const result = await mermaid.parse(chart);
            expect(result, `Diagram ${id} failed syntax validation`).toBeTruthy();
        }
    });
});

describe('tcpip-illustrated-vol1 — CSSスタイル・リスト設定の検証', () => {
    const cssPath = 'app/recommended-books/tcpip-illustrated-vol1/page.css';

    it('CSSファイルが存在し、Tailwind preflightに負けないリストスタイルが定義されていること', () => {
        expect(fs.existsSync(cssPath)).toBe(true);
        const css = fs.readFileSync(cssPath, 'utf8');

        // 本文リストの disc, decimal が定義されていること
        expect(css).toMatch(/\.tcpip-page[^{}]*\s+ul[^{}]*\{[^}]*list-style-type:\s*disc/);
        expect(css).toMatch(/\.tcpip-page[^{}]*\s+ol[^{}]*\{[^}]*list-style-type:\s*decimal/);

        // チェックリスト・サイドバーのリストスタイルが none であること
        expect(css).toMatch(/\.checklist-card\s+ul[^{}]*\{[^}]*list-style:\s*none/);
        expect(css).toMatch(/\.sidebar\s+nav\s+ul[^{}]*\{[^}]*list-style:\s*none/);

        // 人工的な maxWidth 幅制限がなく、全幅と中央寄せが保たれていること
        expect(css).not.toMatch(/\.tcpip-page\s+\.mermaid-wrap\s*\{[^}]*max-width:\s*\d/);

        // @layer components を使っていないこと（plain CSS）
        expect(css).not.toContain('@layer');

        // 非推奨プロパティ word-break: break-word がないこと
        expect(css).not.toContain('word-break: break-word');
    });
});

describe('tcpip-illustrated-vol1 — Mermaid 図の原本忠実描画', () => {
    const cssPath = 'app/recommended-books/tcpip-illustrated-vol1/page.css';
    const ruleBody = (css: string, selector: string): string => {
        const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+');
        const match = css.match(new RegExp(`(?:^|[}\\s])${escaped}\\s*\\{([^}]*)\\}`));
        return match?.[1] ?? '';
    };

    it('35点の図が原本 pre.mermaid と同じ出現順で DIAGRAMS(diag-0〜diag-34) を描画する', () => {
        const container = mount();
        const charts = [...container.querySelectorAll('[data-testid="mermaid-diagram"]')].map((el) =>
            el.getAttribute('data-chart'),
        );
        const expected = Array.from({ length: 35 }, (_, i) => DIAGRAMS[`diag-${i}` as keyof typeof DIAGRAMS]);
        expect(charts).toEqual(expected);
    });

    it('全35図が原本の mermaid.initialize(theme: base / 明色ノード) と同じライトテーマで描画される', () => {
        const container = mount();
        const themes = [...container.querySelectorAll('[data-testid="mermaid-diagram"]')].map((el) =>
            el.getAttribute('data-theme'),
        );
        expect(themes).toEqual(Array.from({ length: 35 }, () => 'light'));
    });

    it('図カードは原本 pre.mermaid と同じ白背景・#d8e0ec 枠・角丸14px・padding 28px 20px の単一カードである', () => {
        const css = fs.readFileSync(cssPath, 'utf8');
        const wrap = ruleBody(css, '.tcpip-page .mermaid-wrap');
        expect(wrap).toMatch(/background:\s*#ffffff/);
        expect(wrap).toMatch(/border:\s*1px solid #d8e0ec/);
        expect(wrap).toMatch(/border-radius:\s*14px/);
        expect(wrap).toMatch(/padding:\s*28px 20px/);
        expect(wrap).toMatch(/overflow-x:\s*auto/);
        expect(wrap).toMatch(/margin:\s*1\.5rem auto 2rem/);

        // 共通コンポーネント側のライトカードを打ち消し、カードの二重化を防ぐ
        const inner = ruleBody(css, '.tcpip-page .mermaid-wrap > [data-theme="light"]');
        expect(inner).toMatch(/background:\s*transparent/);
        expect(inner).toMatch(/border:\s*0/);
        expect(inner).toMatch(/padding:\s*0/);
        expect(inner).toMatch(/margin:\s*0/);
        expect(inner).toMatch(/overflow:\s*visible/);
        expect(inner).toMatch(/box-shadow:\s*none/);
    });

    it('preserveNaturalScale 図の SVG に max-width: 100% !important を当てない (AGENTS.md §2 例外規定)', () => {
        const css = fs.readFileSync(cssPath, 'utf8');
        expect(css).not.toMatch(/\.mermaid-wrap[^{]*svg\s*\{[^}]*max-width:\s*100%\s*!important/);
    });

    it('classDef の color 指定(例: acked #8695ab / bad #7a1f30)がノードラベル子孫へ継承される', () => {
        const css = fs.readFileSync(cssPath, 'utf8');
        const inherit = ruleBody(css, '.tcpip-page .mermaid-wrap .mermaid-target .node .nodeLabel *');
        expect(inherit).toMatch(/color:\s*inherit\s*!important/);
    });
});

describe('tcpip-illustrated-vol1 — レビュー指摘の回帰防止', () => {
    const luminance = (hex: string): number => {
        const ch = (i: number) => {
            const s = parseInt(hex.slice(i, i + 2), 16) / 255;
            return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
        };
        return 0.2126 * ch(1) + 0.7152 * ch(3) + 0.0722 * ch(5);
    };
    const contrast = (a: string, b: string): number => {
        const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
        return (hi + 0.05) / (lo + 0.05);
    };

    it('目次リンクの移動先見出しは tabIndex=-1 を持ち、メニューを閉じた後にフォーカスが移る', () => {
        const container = mount();
        NAV_ITEMS.forEach((item) => {
            expect(container.querySelector(`#${item.id}`)).toHaveAttribute('tabindex', '-1');
        });
        const toggle = container.querySelector('.sidebar-toggle')!;
        fireEvent.click(toggle);
        fireEvent.click(container.querySelector('.sidebar nav a[href="#part3"]')!);
        expect(toggle).toHaveAttribute('aria-expanded', 'false');
        expect(container.querySelector('#part3')).toHaveFocus();
    });

    it('モバイルで閉じたサイドバーは visibility: hidden でキーボード操作から外れ、open で戻る', () => {
        const css = fs.readFileSync('app/recommended-books/tcpip-illustrated-vol1/page.css', 'utf8');
        const media = css.slice(css.indexOf('@media (max-width: 900px)'));
        expect(media).toMatch(/\.tcpip-page \.sidebar \{[^}]*transform:\s*translateX\(-100%\)[^}]*visibility:\s*hidden/);
        expect(media).toMatch(/\.tcpip-page \.sidebar\.open \{[^}]*transform:\s*translateX\(0\)[^}]*visibility:\s*visible/);
    });

    it('diag-18 の Fragment Offset は8バイト単位の符号化値（0 / 185 / 370）で表示する', () => {
        const chart = DIAGRAMS['diag-18'];
        expect(chart).toContain('Offset=0, MF=1');
        expect(chart).toContain('Offset=185');
        expect(chart).toContain('Offset=370');
        expect(chart).toContain('8byte単位');
        expect(chart).not.toContain('Offset=1480');
        expect(chart).not.toContain('Offset=2960');
    });

    it('diag-18 はペイロード長と IPv4 ヘッダ込みの全長を区別する（4000byte = ヘッダ20 + ペイロード3980）', () => {
        const chart = DIAGRAMS['diag-18'];
        expect(chart).toContain('ペイロード1480byte<br/>全長1500byte');
        expect(chart.match(/ペイロード1480byte/g)).toHaveLength(2);
        expect(chart).toContain('ペイロード1020byte<br/>全長1040byte');
    });

    it('diag-25 は3回目の重複ACKの後に高速再送し、受信済み全セグメントを累積ACKする', () => {
        const chart = DIAGRAMS['diag-25'];
        const dupAcks = [...chart.matchAll(/重複ACK 2000/g)].map((m) => m.index ?? -1);
        expect(dupAcks).toHaveLength(3);
        const retransmit = chart.indexOf('セグメント2を再送');
        expect(dupAcks[2]).toBeLessThan(retransmit);
        expect(chart).toContain('セグメント5 (seq=5000)');
        expect(chart.slice(retransmit)).toContain('ACK 6000');
        expect(chart).not.toContain('ACK 4000');
    });

    it('diag-27 の acked / future クラスは塗りに対して 4.5:1 以上のコントラストを持つ', () => {
        const chart = DIAGRAMS['diag-27'];
        for (const cls of ['acked', 'future']) {
            const m = chart.match(new RegExp(`classDef ${cls} fill:(#[0-9a-f]{6}),stroke:#[0-9a-f]{6},color:(#[0-9a-f]{6})`));
            expect(m, cls).not.toBeNull();
            expect(contrast(m![2]!, m![1]!), cls).toBeGreaterThanOrEqual(4.5);
        }
    });

    it('diag-28 のスロースタートは「新規データのACKごとに最大1MSS増、1RTTで約2倍」と表す', () => {
        const chart = DIAGRAMS['diag-28'];
        expect(chart).not.toContain('倍増');
        expect(chart).toContain('新規データのACKごとに<br/>cwndを最大1MSS増加');
        expect(chart).toContain('1RTTあたり約2倍');
        expect(chart).toContain('SS -->|"cwndがssthreshに到達"| CA');
    });
});
