import { readFileSync } from 'node:fs';
import { render, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import postcss from 'postcss';
import Page from '@/app/cisco/devnet-expert/page';
import { DIAGRAMS, NAV_ITEMS } from '@/app/cisco/devnet-expert/constants';
import inventory from '@/docs/migration-inventory/devnet-expert.json';
import fidelity from '@/docs/migration-inventory/devnet-expert.fidelity.json';
import design from '@/docs/migration-inventory/devnet-expert.design.json';
import { MermaidDiagramMock, squash, extractBodyContent, codeLineCount } from '@/__tests__/helpers/migration-test-utils';
import { snapshotTables, snapshotMigratedCodeBlocks, snapshotInlineCode, snapshotRefUrls, snapshotPlacement } from '@/scripts/archive-fidelity-extraction.mjs';

vi.mock('@/components/MermaidDiagram', () => ({ MermaidDiagram: MermaidDiagramMock }));
const draw = () => render(<Page />);

describe('DevNet Expert 全量移行', () => {
    it.each(['h1', 'h2', 'h3', 'h4', 'th', 'td', 'li'] as const)('%s 全件の件数・順序・全文', tag => {
        const { container } = draw();
        const expected = tag === 'li' ? inventory.listItems : inventory[tag];
        expect([...container.querySelectorAll(`main ${tag}`)].map(e => squash(e.textContent ?? ''))).toEqual(expected.map(squash));
    });
    it.each(design.sections)('$id 章全文（コード・参照番号も含む）', section => {
        const { container } = draw();
        expect(squash(container.querySelector(`#${section.id}`)?.textContent ?? '')).toBe(section.text);
    });
    it('本文・注釈・コードの全文と配置順', () => {
        const { container } = draw();
        const main = container.querySelector('main')!;
        // 原本の先頭annotationは本文外のaside（目次）。目次は別の全件検査で照合する。
        expect(extractBodyContent(main)).toEqual(inventory.bodyContent.slice(1));
        expect(snapshotPlacement(main, 'table, pre, .code-block, figure, .callout')).toEqual(fidelity.placements);
        expect(snapshotTables(main)).toEqual(fidelity.tables);
        expect(snapshotInlineCode(main)).toEqual(fidelity.inlineCode);
        expect(snapshotRefUrls(main)).toEqual(fidelity.refUrls);
    });
    it('リンクのURL・順序・重複・安全な別タブ属性', () => {
        const { container } = draw();
        const links = [...container.querySelectorAll('a[href^="http"]')];
        expect(links.map(a => a.getAttribute('href'))).toEqual(inventory.links.map(a => a.href));
        links.forEach(a => { expect(a).toHaveAttribute('target', '_blank'); expect(a.getAttribute('rel')).toContain('noopener'); });
    });
    it('全43コードの行・空行・字下げ・全ハイライトトークン', () => {
        const { container } = draw();
        expect(snapshotMigratedCodeBlocks(container)).toEqual(fidelity.codeBlocks);
        const blocks = [...container.querySelectorAll('.code-block')];
        expect(blocks).toHaveLength(inventory.counts.codeBlock);
        expect(blocks.map(codeLineCount)).toEqual(inventory.structures.codeLines);
        expect([...container.querySelectorAll('.code-line span')].map(s => ({ className: s.className, text: s.textContent }))).toEqual(design.tokens);
        blocks.forEach(block => expect([...block.children].every(c => c.matches('.code-line'))).toBe(true));
    });
    it('全表の列見出しscope・件数と装飾SVG', () => {
        const { container } = draw();
        expect([...container.querySelectorAll('table')].map(t => t.querySelectorAll('thead th[scope="col"]').length)).toEqual(inventory.structures.tableColumnHeaders);
        expect(container.querySelectorAll('table')).toHaveLength(inventory.counts.table);
        expect(container.querySelectorAll('svg')).toHaveLength(inventory.counts.figure);
        expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    });
    it('全23図のDSL・順序・読み上げ名・自然寸法', () => {
        expect(DIAGRAMS).toEqual(design.diagrams);
        const { container } = draw();
        const diagrams = [...container.querySelectorAll('[data-testid="mermaid-diagram"]')];
        expect(diagrams).toHaveLength(inventory.counts.diagram);
        expect(diagrams.map(e => e.getAttribute('data-chart')?.split('\n---\n').at(-1))).toEqual(Object.values(design.diagrams));
        diagrams.forEach(e => {
            expect(e.getAttribute('aria-label')?.trim()).toBeTruthy();
            expect(e).toHaveAttribute('data-preserve-natural-scale', 'true');
        });
    });
    it('目次全62項目の順序・階層・hashとfocus', () => {
        expect(NAV_ITEMS).toEqual(design.nav);
        const { container } = draw();
        const links = [...container.querySelectorAll('nav a')];
        expect(links.map(a => ({ id: a.getAttribute('href')?.slice(1), label: a.textContent, level: a.classList.contains('l3') ? 3 : 2 }))).toEqual(design.nav);
        expect(container.querySelectorAll('nav > ul > li')).toHaveLength(design.nav.length);
        links.forEach(a => {
            fireEvent.click(a);
            expect(location.hash).toBe(a.getAttribute('href'));
            expect(document.activeElement?.id).toBe(a.getAttribute('href')?.slice(1));
        });
    });
    it('チェックリスト8項目の全文・初期値・独立した切替', () => {
        const { container } = draw();
        const inputs = [...container.querySelectorAll<HTMLInputElement>('.check-item input')];
        expect(inputs.map(i => ({ id: i.id, label: i.closest('label')?.textContent?.replace(/\s+/g, ' ').trim(), checked: i.checked }))).toEqual(fidelity.guideInteractions.checks);
        inputs.forEach(input => { fireEvent.click(input); expect(input.checked).toBe(true); fireEvent.click(input); expect(input.checked).toBe(false); });
    });
    it('CSS全宣言を原本と照合（点・番号・余白・モバイルを含む）', () => {
        const css = postcss.parse(readFileSync('app/cisco/devnet-expert/page.css', 'utf8'));
        const rules: { selector: string; media: string; declarations: Record<string, string> }[] = [];
        css.walkRules(r => {
            const declarations: Record<string, string> = {};
            r.walkDecls(d => { declarations[d.prop] = d.value; });
            rules.push({ selector: r.selector, media: r.parent?.type === 'atrule' ? r.parent.params : '', declarations });
        });
        const tokens: Record<string, string> = { paper: 'background', ink: 'foreground', indigo: 'google-blue', gold: 'google-yellow', forest: 'google-green', plum: 'gcp-purple', surface: 'card', line: 'gcp-border', muted: 'muted-foreground', 'indigo-t': 'gcp-card-hover', 'gold-t': 'card', 'forest-t': 'card', 'plum-t': 'card', serif: 'font-display', sans: 'font-body', mono: 'font-mono' };
        const mapValue = (v: string) => v.replace(/var\(--([\w-]+)\)/g, (all, key: string) => tokens[key] ? `var(--${key === 'serif' || key === 'sans' || key === 'mono' ? '' : 'color-'}${tokens[key]})` : all);
        design.rules.filter(r => r.selector !== ':root' && !r.selector.startsWith('.callout.')).forEach(source => {
            const selector = source.selector.split(',').map(s => s === 'body' || s === 'html' ? '.devnet-expert-page' : `.devnet-expert-page ${s}`).join(',');
            const target = rules.find(r => r.selector === selector && r.media === source.media);
            expect(target, source.selector).toBeDefined();
            Object.entries(source.declarations).forEach(([prop, value]) => {
                if ((source.selector === '.sidebar' && ['top','width'].includes(prop)) || (source.selector === '.main' && prop === 'margin-left')) return;
                if (['border-left','background','color'].includes(prop) && value.includes('var(--c)') || value.includes('var(--bg)')) return;
                expect(target?.declarations[prop], `${source.selector} ${prop}`).toBe(mapValue(value));
            });
        });
        expect(readFileSync('app/cisco/devnet-expert/page.css', 'utf8')).not.toMatch(/--[\w-]+\s*:/);
    });
});
