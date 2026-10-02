import fs from 'node:fs';
import { render, fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi, afterEach } from 'vitest';
import postcss from 'postcss';
import Page from '@/app/gcl/hands-on/secure-cicd-pipeline-guide/page';
import { DIAGRAMS, NAV_ITEMS } from '@/app/gcl/hands-on/secure-cicd-pipeline-guide/constants';
import {
    squash,
    extractBodyContent,
    codeLineCount,
} from '@/__tests__/helpers/migration-test-utils';
import inventory from '@/docs/migration-inventory/secure-cicd-pipeline-guide.json';
import fidelity from '@/docs/migration-inventory/secure-cicd-pipeline-guide.fidelity.json';
import design from '@/docs/migration-inventory/secure-cicd-pipeline-guide.design.json';
import { snapshotGuideStructure } from '@/scripts/secure-cicd-fidelity.mjs';
import {
    snapshotTables,
    snapshotSupplemental,
    snapshotPlacement,
    snapshotMigratedCodeBlocks,
    snapshotTexts,
} from '@/scripts/archive-fidelity-extraction.mjs';
import { FIDELITY_PAGES } from '@/scripts/archive-fidelity-config.mjs';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});
afterEach(() => vi.unstubAllGlobals());
const mount = () => render(<Page />).container;

describe('Secure CI/CD 原本全量移行', () => {
    it.each(['h1', 'h2', 'h3', 'h4', 'th', 'td'] as const)('%s の全文・件数・順序', (tag) => {
        expect(
            [...mount().querySelectorAll(tag)].map((el) => squash(el.textContent ?? '')),
        ).toEqual(inventory[tag].map(squash));
    });
    it('全リスト項目・リスト種別・番号・全アイコン・全セクション・目次', () => {
        const root = mount();
        expect(
            [...root.querySelectorAll('main li')].map((el) => squash(el.textContent ?? '')),
        ).toEqual(inventory.listItems.map(squash));
        expect(snapshotGuideStructure(root)).toEqual(design.structure);
        expect(NAV_ITEMS.map((item) => item.id)).toEqual(design.structure.sections);
    });
    it('全リンクのURL・表示文・重複・順序・別タブ保護', () => {
        const links = [...mount().querySelectorAll('a[href^="http"]')];
        expect(
            links.map((link) => ({
                href: link.getAttribute('href'),
                text: squash(link.textContent ?? ''),
            })),
        ).toEqual(inventory.links.map((link) => ({ ...link, text: squash(link.text) })));
        for (const link of links) {
            expect(link).toHaveAttribute('target', '_blank');
            expect(link.getAttribute('rel')).toContain('noopener');
        }
    });
    it('全本文・補足・参考文献番号・装飾テキスト・配置順', () => {
        const root = mount();
        const config = FIDELITY_PAGES['secure-cicd-pipeline-guide'];
        expect(extractBodyContent(root)).toEqual(inventory.bodyContent);
        expect(snapshotTexts(root, config.textSelector)).toEqual(fidelity.texts);
        expect(snapshotSupplemental(root, config.supplementalSelector)).toEqual(
            fidelity.supplemental,
        );
        expect(snapshotPlacement(root, config.placementSelector)).toEqual(fidelity.placements);
        for (const cls of fidelity.styledClasses)
            expect(root.querySelector(`.${cls}`), cls).not.toBeNull();
    });
    it('全6表の行列・結合属性・列見出し', () => {
        const root = mount();
        expect(snapshotTables(root)).toEqual(fidelity.tables);
        const tables = [...root.querySelectorAll('table')];
        expect(tables).toHaveLength(inventory.counts.table);
        expect(
            tables.map((table) => table.querySelectorAll('thead th[scope="col"]').length),
        ).toEqual(inventory.structures.tableColumnHeaders);
    });
    it('全9コードの全文・空行・インデント・行数・構文色', () => {
        const root = mount();
        const blocks = [...root.querySelectorAll('.code-block')];
        expect(blocks).toHaveLength(inventory.counts.codeBlock);
        expect(snapshotMigratedCodeBlocks(root)).toEqual(fidelity.codeBlocks);
        expect(blocks.map(codeLineCount)).toEqual(inventory.structures.codeLines);
        for (const block of blocks) {
            expect([...block.children].every((line) => line.classList.contains('code-line'))).toBe(
                true,
            );
            expect(block.querySelector('[class^="hl-"]')).not.toBeNull();
        }
        expect(root.querySelectorAll('pre, script, img, svg')).toHaveLength(0);
    });
    it('全4図のDSL・順序・配置・自然倍率・説明', () => {
        const root = mount();
        const diagrams = [...root.querySelectorAll('[data-testid="mermaid-diagram"]')];
        expect(diagrams).toHaveLength(inventory.counts.diagram);
        expect(DIAGRAMS).toEqual(design.diagrams);
        expect(diagrams.map((el) => el.getAttribute('data-chart'))).toEqual(
            Object.values(design.diagrams),
        );
        diagrams.forEach((el) => {
            expect(el.getAttribute('aria-label')?.trim()).toBeTruthy();
            expect(el).toHaveAttribute('data-preserve-natural-scale', 'true');
        });
    });
    it('目次はul/li、リンク操作でハッシュ・フォーカス・現在地を更新', () => {
        const root = mount();
        const nav = screen.getByRole('navigation', { name: 'ガイドの目次' });
        expect(nav.querySelectorAll('ul > li')).toHaveLength(12);
        const link = nav.querySelector<HTMLAnchorElement>('a[href="#task3"]')!;
        fireEvent.click(link);
        expect(window.location.hash).toBe('#task3');
        expect(root.querySelector('#task3')).toHaveFocus();
        expect(link).toHaveAttribute('aria-current', 'location');
    });
    it('scroll spy は全セクションを監視しcleanupする', () => {
        const observe = vi.fn();
        const disconnect = vi.fn();
        let callback: IntersectionObserverCallback | undefined;
        vi.stubGlobal(
            'IntersectionObserver',
            class {
                constructor(cb: IntersectionObserverCallback) {
                    callback = cb;
                }
                observe = observe;
                disconnect = disconnect;
            },
        );
        const result = render(<Page />);
        expect(observe.mock.calls.map((call) => (call[0] as HTMLElement).id)).toEqual(
            design.structure.sections,
        );
        callback?.(
            [
                {
                    isIntersecting: true,
                    target: result.container.querySelector('#task4')!,
                } as IntersectionObserverEntry,
            ],
            {} as IntersectionObserver,
        );
        expect(result.container.querySelector('a[href="#task4"]')).toHaveAttribute(
            'aria-current',
            'location',
        );
        result.unmount();
        expect(disconnect).toHaveBeenCalledOnce();
    });
});

describe('Secure CI/CD CSS の全宣言移転', () => {
    const cssPath = 'app/gcl/hands-on/secure-cicd-pipeline-guide/page.css';
    const resolve = (value: string, vars: Map<string, string>): string =>
        value
            .replace(/var\((--[\w-]+)\)/g, (_, name: string) => {
                const replacement = vars.get(name);
                if (!replacement) throw new Error(`未定義: ${name}`);
                return resolve(replacement, vars);
            })
            .replace(/\s+/g, ' ')
            .trim();
    it('原本のCSS宣言を省略せず、既存トークン・共通ヘッダー・コード行構造へ対応付ける', () => {
        const css = postcss.parse(fs.readFileSync(cssPath, 'utf8'));
        const vars = new Map<string, string>();
        postcss.parse(fs.readFileSync('app/globals.css', 'utf8')).walkDecls((d) => {
            if (d.prop.startsWith('--')) vars.set(d.prop, d.value);
        });
        const originalVars = new Map(
            design.rules
                .find((r) => r.selector === ':root')!
                .declarations.map((d) => [d.prop, d.value]),
        );
        // 許可する差分はフォントの統一・共通ヘッダー配置・280pxサイドバー・コード行構造だけ。
        const exceptions: Record<string, string[]> = {
            'html,\n            body': ['font-family'],
            '.sidebar': ['top', 'width', 'height'],
            '.content': ['margin-left'],
            section: ['scroll-margin-top'],
            'pre code.hljs': ['font-family'],
            code: ['font-family'],
            '.reference-index': ['font-family'],
            '.reference-body .reference-url': ['font-family'],
        };
        const selectorFor = (s: string) =>
            s
                .split(',')
                .map((part) => {
                    const p = part.trim();
                    if (p === 'html' || p === 'body') return '.secure-cicd-page';
                    if (p === 'pre code.hljs') return '.secure-cicd-page .code-block .code-line';
                    if (p === 'pre code' || p === 'pre') return '.secure-cicd-page .code-block';
                    return `.secure-cicd-page ${p}`;
                })
                .filter((s, i, a) => a.indexOf(s) === i)
                .join(', ');
        for (const rule of design.rules.filter((r) => r.selector !== ':root')) {
            const found: postcss.Rule[] = [];
            css.walkRules((r) => {
                if (
                    r.selector.replace(/\s+/g, ' ') ===
                        selectorFor(rule.selector).replace(/\s+/g, ' ') &&
                    (r.parent?.type === 'atrule' ? (r.parent as postcss.AtRule).params : null) ===
                        rule.media
                )
                    found.push(r);
            });
            expect(found.length, rule.selector).toBeGreaterThan(0);
            for (const declaration of rule.declarations) {
                if (exceptions[rule.selector]?.includes(declaration.prop)) continue;
                const candidates = found
                    .flatMap((r) => r.nodes)
                    .filter(
                        (n): n is postcss.Declaration =>
                            n.type === 'decl' && n.prop === declaration.prop,
                    );
                expect(
                    candidates.some(
                        (d) =>
                            resolve(d.value, vars) === resolve(declaration.value, originalVars) &&
                            Boolean(d.important) === declaration.important,
                    ),
                    `${rule.selector}: ${declaration.prop}`,
                ).toBe(true);
            }
        }
        css.walkDecls((d) => expect(d.prop.startsWith('--')).toBe(false));
    });
    it('Tailwind resetで消える点・番号を復元し、参考文献の独自番号を二重表示しない', () => {
        const css = postcss.parse(fs.readFileSync(cssPath, 'utf8'));
        const value = (selector: string, prop: string) => {
            let result = '';
            css.walkRules((r) => {
                if (r.selector === selector)
                    r.walkDecls(prop, (d) => {
                        result = d.value;
                    });
            });
            return result;
        };
        expect(value('.secure-cicd-page ul', 'list-style-type')).toBe('disc');
        expect(value('.secure-cicd-page ol', 'list-style-type')).toBe('decimal');
        expect(value('.secure-cicd-page .reference-list', 'list-style-type')).toBe('none');
        expect(value('.secure-cicd-page .sidebar nav ul', 'list-style-type')).toBe('none');
        expect(value('.secure-cicd-page .code-line', 'white-space')).toBe('pre');
        expect(value('.secure-cicd-page .table-scroll', 'overflow-x')).toBe('auto');
    });
});
