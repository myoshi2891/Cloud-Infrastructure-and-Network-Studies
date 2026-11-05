import { render, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import fs from 'node:fs';
import mermaid from 'mermaid';
import Page from '@/app/aws/solutions-architect-professional/domain4/page';
import { DIAGRAMS } from '@/app/aws/solutions-architect-professional/domain4/constants';
import theme from '@/app/aws/solutions-architect-professional/domain4/mermaid-theme.json';
import rawInventory from '@/docs/migration-inventory/aws-sap-c02-domain4.json';
import rawFixture from '@/docs/migration-inventory/aws-sap-c02-domain4.fidelity.json';
import { withSourceCorrections } from '@/__tests__/helpers/aip-source-corrections';
import { SAP_DOMAIN4_CORRECTIONS, SAP_DOMAIN4_DIAGRAM_CORRECTIONS } from '@/__tests__/helpers/sap-domain4-source-corrections';
import { FIDELITY_PAGES } from '@/scripts/archive-fidelity-config.mjs';
import { snapshotGuideParts } from '@/scripts/guide-fidelity-extraction.mjs';
import { snapshotGuideChecks } from '@/scripts/guide-interaction-extraction.mjs';
import { snapshotCssRules } from '@/scripts/tanenbaum-fidelity.mjs';
import { SAP_D4_COLOR_LITERAL, SAP_D4_COLOR_TOKENS } from '@/scripts/sap-domain4-color-tokens.mjs';
import { codeLineCount, extractBodyContent, squash, withBlockBoundarySpaces } from '@/__tests__/helpers/migration-test-utils';
import { normalizeCodeContainers } from '@/scripts/inventory-extraction.mjs';

const inventory = withSourceCorrections(rawInventory, [...SAP_DOMAIN4_CORRECTIONS, ...SAP_DOMAIN4_DIAGRAM_CORRECTIONS]);
const fixture = withSourceCorrections(rawFixture, [...SAP_DOMAIN4_CORRECTIONS, ...SAP_DOMAIN4_DIAGRAM_CORRECTIONS]);

vi.mock('@/components/MermaidDiagram', async () => ({
    MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock,
}));

/** 描画結果を複製し、図を除いて比較用に分解する。 */
function parts(c: HTMLElement) {
    const clone = c.cloneNode(true) as HTMLElement;
    clone.querySelectorAll('[data-chart]').forEach((e) => {
        const value = e.getAttribute('data-chart')!;
        expect(value).toMatch(/^---\nconfig: /);
        e.setAttribute('data-chart', value.slice(value.indexOf('\n---\n') + 5));
    });
    return snapshotGuideParts(
        { querySelector: () => clone.querySelector('main'), createElement: (tag: string) => document.createElement(tag) },
        FIDELITY_PAGES['aws-sap-c02-domain4']!.guideBoundaries,
    );
}

describe('SAP Domain 4 原本全量契約', () => {
    it('図の訂正は原本の図全体と一致し、訂正後の図だけを描画する', () => {
        const raw = Object.values(rawFixture.guideParts).flatMap((p) => p.diagrams).map((d) => d.trim());
        const fixed = Object.values(fixture.guideParts).flatMap((p) => p.diagrams).map((d) => d.trim());
        for (const [from, to] of SAP_DOMAIN4_DIAGRAM_CORRECTIONS) {
            expect(raw.filter((d) => d === from)).toHaveLength(1);
            expect(fixed).toContain(to);
            expect(fixed).not.toContain(from);
        }
    });

    it('目次内にフォーカスがある状態のEscapeは目次を閉じ、開閉ボタンへフォーカスを戻す', () => {
        const c = render(<Page />).container;
        const toggle = c.querySelector<HTMLButtonElement>('#sidebarToggle')!;
        fireEvent.click(toggle);
        expect(toggle).toHaveAttribute('aria-expanded', 'true');
        const link = c.querySelector<HTMLAnchorElement>('#sidebarNav a')!;
        link.focus();
        expect(document.activeElement).toBe(link);
        fireEvent.keyDown(window, { key: 'Escape' });
        expect(toggle).toHaveAttribute('aria-expanded', 'false');
        expect(document.activeElement).toBe(toggle);
    });

    it('目次外にフォーカスがある状態のEscapeは目次を閉じるだけでフォーカスを動かさない', () => {
        const c = render(<Page />).container;
        const toggle = c.querySelector<HTMLButtonElement>('#sidebarToggle')!;
        fireEvent.click(toggle);
        const outside = c.querySelector<HTMLElement>('main a, main [tabindex="0"]')!;
        outside.focus();
        expect(document.activeElement).toBe(outside);
        fireEvent.keyDown(window, { key: 'Escape' });
        expect(toggle).toHaveAttribute('aria-expanded', 'false');
        expect(document.activeElement).toBe(outside);
    });

    it('原本の装飾クラスを省略しない', () => {
        const c = render(<Page />).container;
        for (const name of fixture.styledClasses) {
            expect(c.querySelector('.' + (name === 'mermaid' ? 'mermaid-wrap' : name)), name).not.toBeNull();
        }
    });

    it('Preflightで消える段落の余白と目次見出しの太字を復元する', () => {
        const css = fs.readFileSync('app/aws/solutions-architect-professional/domain4/page.css', 'utf8');
        expect(css).toContain('.sap-domain4-page .main p { margin: 1em 0; }');
        expect(css).toContain('.sap-domain4-page .sidebar-header h2 { font-weight: 700; }');
    });

    it('表のアクセシブル名は通し番号と直前の見出しで一意になる', () => {
        const c = render(<Page />).container;
        const wrappers = [...c.querySelectorAll('.table-scroll')];
        for (const [index, wrapper] of wrappers.entries()) {
            let heading = wrapper.previousElementSibling;
            while (heading && !heading.matches('h2,h3,h4')) heading = heading.previousElementSibling;
            expect(wrapper).toHaveAttribute(
                'aria-label',
                `比較表 ${index + 1}：` + (heading?.textContent ?? '学習資料').replace(/\s+/g, ' ').trim(),
            );
        }
        const names = wrappers.map((w) => w.getAttribute('aria-label'));
        expect(new Set(names).size).toBe(names.length);
    });

    it('表の構造要素の直下にテキストノードを置かない', () => {
        const c = render(<Page />).container;
        expect(
            [...c.querySelectorAll('table,thead,tbody,tfoot,tr')].flatMap((e) =>
                [...e.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent),
            ),
        ).toEqual([]);
    });

    it.each(Object.keys(fixture.guideParts))('%s 本文・表結合・コード・リスト階層・配置順を完全照合', (key) => {
        expect((parts(render(<Page />).container) as Record<string, unknown>)[key]).toEqual(
            fixture.guideParts[key as keyof typeof fixture.guideParts],
        );
    });

    it.each(['h1', 'h2', 'h3', 'h4', 'th', 'td', 'li'] as const)('%s 全件・順序を照合', (tag) => {
        const c = render(<Page />).container;
        const expected = tag === 'li' ? inventory.listItems : inventory[tag];
        expect([...c.querySelectorAll(tag === 'li' ? 'main li' : tag)].map((e) => squash(e.textContent ?? ''))).toEqual(
            expected.map(squash),
        );
    });

    it('本文・注釈・コード全文と外部リンク102出現の順序', () => {
        const c = render(<Page />).container.cloneNode(true) as HTMLElement;
        normalizeCodeContainers(c);
        expect(extractBodyContent(withBlockBoundarySpaces(c))).toEqual(inventory.bodyContent);
        expect([...c.querySelectorAll('a[href^="http"]')].map((e) => e.getAttribute('href'))).toEqual(
            inventory.links.map((e) => e.href),
        );
    });

    it('全42表の列見出し・スクロール領域', () => {
        const c = render(<Page />).container;
        const tables = [...c.querySelectorAll('table')];
        expect(tables).toHaveLength(inventory.counts.table);
        tables.forEach((table, i) => {
            expect(table.querySelectorAll('thead th[scope="col"]')).toHaveLength(inventory.structures.tableColumnHeaders[i]!);
            expect(table.closest('.table-scroll')).toHaveAttribute('tabindex', '0');
        });
    });

    it('全7コード例の行数・空行・インデント・構文色', () => {
        const c = render(<Page />).container;
        const blocks = [...c.querySelectorAll('pre:not(.mermaid)')];
        expect(blocks).toHaveLength(inventory.counts.codeBlock);
        blocks.forEach((b, i) => {
            expect(codeLineCount(b)).toBe(inventory.structures.codeLines[i]);
            expect(b.querySelector(':scope > .code-line')).not.toBeNull();
            expect([...b.children].filter((e) => !e.matches('.code-line'))).toEqual([]);
            expect([...b.childNodes].filter((n) => n.nodeType === 3 && n.textContent?.trim()).map((n) => n.textContent)).toEqual([]);
            expect(b.querySelector('span[class]')).not.toBeNull();
        });
    });

    it('全16図のDSL・アクセシビリティ・自然倍率・原本配色と構文', async () => {
        const c = render(<Page />).container;
        const diagrams = [...c.querySelectorAll('[data-testid="mermaid-diagram"]')];
        expect(diagrams).toHaveLength(inventory.counts.diagram);
        expect(theme).toMatchObject(fixture.guideInteractions.mermaidConfig);
        expect(Object.values(DIAGRAMS)).toEqual(Object.values(fixture.guideParts).flatMap((p) => p.diagrams).map((s) => s.trim()));
        mermaid.initialize({ startOnLoad: false });
        for (const d of diagrams) {
            expect(d.getAttribute('aria-label')?.trim()).toBeTruthy();
            expect(d).toHaveAttribute('data-preserve-natural-scale', 'true');
            expect(d).toHaveAttribute('data-theme', 'light');
            expect(await mermaid.parse(d.getAttribute('data-chart')!)).toBeTruthy();
        }
    });

    it('全コード例と全図はキーボードでフォーカスできる', () => {
        const c = render(<Page />).container;
        const codes = [...c.querySelectorAll('pre.code-block')];
        expect(codes).toHaveLength(inventory.counts.codeBlock);
        codes.forEach((e) => expect(e).toHaveAttribute('tabindex', '0'));
        const diagrams = [...c.querySelectorAll('[data-testid="mermaid-diagram"]')];
        expect(diagrams).toHaveLength(inventory.counts.diagram);
        diagrams.forEach((e) => expect(e).toHaveAttribute('tabindex', '0'));
        const generator = fs.readFileSync('scripts/migrate-sap-domain4.mjs', 'utf8');
        expect(generator).toContain('<pre className="code code-block" tabIndex={0}');
        expect(generator).toContain('preserveNaturalScale focusable');
    });

    it('フォーカス可能なコード例はrole=groupでaria-labelの名前を支援技術へ公開し、再生成でも保持する', () => {
        const c = render(<Page />).container;
        const codes = [...c.querySelectorAll('pre.code-block')];
        expect(codes).toHaveLength(inventory.counts.codeBlock);
        codes.forEach((e) => {
            expect(e).toHaveAttribute('role', 'group');
            expect(e.getAttribute('aria-label')?.trim()).toBeTruthy();
        });
        expect(fs.readFileSync('scripts/migrate-sap-domain4.mjs', 'utf8')).toContain('<pre className="code code-block" tabIndex={0} role="group" aria-label=');
    });

    it('全CSS宣言値とリストの点・番号・字下げを保持', () => {
        const css = fs.readFileSync('app/aws/solutions-architect-professional/domain4/page.css', 'utf8');
        const rules = snapshotCssRules(css);
        for (const r of fixture.guideDesign.rules) {
            if (r.selector === ':root') continue;
            const selector = r.selector
                .split(',')
                .map((s) =>
                    ['html', 'body'].includes(s.trim())
                        ? '.sap-domain4-page'
                        : '.sap-domain4-page ' +
                          s
                              .trim()
                              .replaceAll('pre.mermaid', '.mermaid-wrap')
                              .replaceAll('pre.code code', 'pre.code .code-line')
                              .replaceAll('pre:not(.mermaid) code', 'pre:not(.mermaid) .code-line'),
                )
                .join(', ');
            const actual = rules.find((a) => a.selector === selector && (a.media ?? '') === r.media);
            expect(actual, selector).toBeDefined();
            for (const [prop, value] of Object.entries(r.declarations)) {
                if (prop === 'word-break') continue;
                const expected = value
                    .replace(/var\(--([\w-]+)\)/g, (_: string, key: string) =>
                        key === 'sidebar-w' ? '300px' : key === 'font-jp' ? 'var(--font-body)' : `var(--color-sap-d4-${key})`,
                    )
                    .replace(SAP_D4_COLOR_LITERAL, (literal: string) => {
                        const token = SAP_D4_COLOR_TOKENS[literal];
                        return token ? `var(--color-sap-d4-${token})` : literal;
                    });
                expect(actual!.declarations, `${selector}:${prop}`).toContainEqual({
                    prop,
                    value: expected,
                    important: selector.endsWith('.mermaidTooltip'),
                });
            }
        }
        expect(css).toContain('.sap-domain4-page .main ul { list-style-type: disc; }');
        expect(css).toContain('.sap-domain4-page .main ol { list-style-type: decimal; }');
        expect(css).toContain('.sap-domain4-page .main .checklist-card ul { list-style: none; padding: 0; }');
    });

    it('10チェック項目はグループ単位で進捗・解除を反映', () => {
        const c = render(<Page />).container;
        expect(snapshotGuideChecks(c)).toEqual(fixture.guideInteractions.checks);
        const cards = [...c.querySelectorAll('.checklist-card')];
        cards.forEach((card) => {
            const boxes = [...card.querySelectorAll('input')];
            boxes.forEach((box) => fireEvent.click(box));
            expect(card.querySelector('.count')).toHaveTextContent(`${boxes.length} / ${boxes.length} 完了`);
            boxes.forEach((box) => fireEvent.click(box));
            expect(card.querySelector('.count')).toHaveTextContent(`0 / ${boxes.length} 完了`);
        });
    });

    it('修飾キー付き・主ボタン以外の目次クリックはブラウザーに任せる', () => {
        const c = render(<Page />).container;
        const link = c.querySelector('nav a')!;
        const before = location.hash;
        for (const init of [{ ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { altKey: true }, { button: 1 }]) {
            expect(fireEvent.click(link, init)).toBe(true);
            expect(location.hash).toBe(before);
        }
        expect(fireEvent.click(link)).toBe(false);
    });

    it('全目次の階層・開閉・hash・フォーカス', () => {
        const c = render(<Page />).container;
        expect(
            [...c.querySelectorAll('nav a')].map((e) => ({
                id: e.getAttribute('href')!.slice(1),
                label: e.textContent,
                level: e.classList.contains('lvl3') ? 3 : e.classList.contains('lvl4') ? 4 : 2,
            })),
        ).toEqual(fixture.guideDesign.nav);
        const toggle = c.querySelector('button')!;
        for (const link of c.querySelectorAll('nav a')) {
            fireEvent.click(toggle);
            expect(toggle).toHaveAttribute('aria-expanded', 'true');
            fireEvent.click(link);
            expect(toggle).toHaveAttribute('aria-expanded', 'false');
            expect(document.activeElement?.id).toBe(link.getAttribute('href')!.slice(1));
            expect(decodeURIComponent(location.hash.slice(1))).toBe(document.activeElement?.id);
        }
    });

    it('本文削除・リスト階層・コード行欠落を検出する', () => {
        for (const selector of ['main p', 'main li', 'main .code-line']) {
            const c = render(<Page />).container;
            expect(parts(c)).toEqual(fixture.guideParts);
            c.querySelector(selector)!.remove();
            expect(parts(c)).not.toEqual(fixture.guideParts);
        }
    });

    it('上方向へのスクロールでも、判定線（見出しのscroll-margin）より上の最後の見出しを現在位置にする', async () => {
        const root = document.documentElement;
        root.style.setProperty('--header-h', '60px');
        root.style.setProperty('--disclaimer-height', '40px');
        const { container: c, unmount } = render(<Page />);
        const links = [...c.querySelectorAll('nav a')];
        const targets = links.map((a) => document.getElementById(decodeURIComponent(a.getAttribute('href')!.slice(1)))!);
        /** 2番目の見出しを指定位置へ置いたものとしてスクロールを発火する。 */
        const placeSecond = (top: number) => {
            targets.forEach((t, i) => {
                t.getBoundingClientRect = () => ({ top: i === 0 ? -1000 : i === 1 ? top : 99999 } as DOMRect);
            });
            fireEvent.scroll(window);
        };
        try {
            expect(fs.readFileSync('app/aws/solutions-architect-professional/domain4/page.css', 'utf8')).toContain(
                '.sap-domain4-page .main h2, .sap-domain4-page .main h3 { scroll-margin-top: calc(var(--header-h, 60px) + var(--disclaimer-height, 0px) + 24px); }',
            );
            expect(targets.map((t) => t?.tagName)).toEqual(links.map(() => expect.stringMatching(/^H[234]$/)));
            placeSecond(124);
            await waitFor(() => expect(links[1]).toHaveAttribute('aria-current', 'location'));
            placeSecond(130);
            await waitFor(() => expect(links[0]).toHaveAttribute('aria-current', 'location'));
            root.style.setProperty('--disclaimer-height', '56px');
            placeSecond(130);
            await waitFor(() => expect(links[1]).toHaveAttribute('aria-current', 'location'));
        } finally {
            unmount();
            root.style.removeProperty('--header-h');
            root.style.removeProperty('--disclaimer-height');
        }
    });
});
