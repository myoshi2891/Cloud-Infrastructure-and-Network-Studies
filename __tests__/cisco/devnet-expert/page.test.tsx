import { codeText } from '@/scripts/inventory-extraction.mjs';
import { restoreReviewedCorrections } from './reviewed-corrections';
import { readFileSync } from 'node:fs';
import { render, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import postcss from 'postcss';
import Page from '@/app/cisco/devnet-expert/page';
import { DIAGRAMS, NAV_ITEMS } from '@/app/cisco/devnet-expert/constants';
import inventory from '@/docs/migration-inventory/devnet-expert.json';
import fidelity from '@/docs/migration-inventory/devnet-expert.fidelity.json';
import design from '@/docs/migration-inventory/devnet-expert.design.json';
import { squash, extractBodyContent, codeLineCount } from '@/__tests__/helpers/migration-test-utils';
import { snapshotTables, snapshotMigratedCodeBlocks, snapshotInlineCode, snapshotRefUrls, snapshotPlacement } from '@/scripts/archive-fidelity-extraction.mjs';

vi.mock('@/components/MermaidDiagram', async () => ({ MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock }));
// Keep the source fixtures immutable. Check the reviewed corrections exactly,
// then restore only those lines in the test DOM for the original fidelity checks.
const draw = () => {
    const view = render(<Page />);
    restoreReviewedCorrections(view.container);
    const replacements: [string, string][] = [
        ['    - ansible-playbook -i inventory/prod site.yml', '    - pip install ansible-core\n    - ansible-playbook -i inventory/prod site.yml'],
        ['# .dockerignore\n.git\n.venv\n__pycache__/\n*.pyc\n.env', '# .dockerignore\n.git\n.venv\n__pycache__/\n*.pyc\n.env\nsecrets/'],
    ];
    const blocks = [...view.container.querySelectorAll('.code-block')];
    fidelity.codeBlocks.forEach((lines, index) => {
        const original = lines.join('\n');
        const corrected = replacements.reduce((text, [from, to]) => text.replace(from, to), original);
        if (corrected === original) return;
        const block = blocks[index]!;
        expect(codeText(block)).toBe(corrected);
        for (const line of block.querySelectorAll('.code-line')) {
            const text = line.textContent ?? '';
            if ([
                '    - pip install ansible-core',
                'secrets/',
            ].includes(text)) {
                line.remove();
            }
        }
    });
    return view;
};

describe('DevNet Expert 全量移行', () => {
    it('rejects lost highlighting on an edited line before restoration', () => {
        const { container } = render(<Page />);
        const line = [...container.querySelectorAll('.code-line')].find(line => line.textContent?.startsWith('openssl verify -verify_hostname'))!;
        const text = line.textContent;
        line.textContent = text;
        expect(() => restoreReviewedCorrections(container)).toThrow();
        expect(line.textContent).toBe(text);
        expect(line.querySelector('span')).toBeNull();
    });

    it('rejects corrected code collapsed into one multiline child before restoration', () => {
        const { container } = render(<Page />);
        const block = [...container.querySelectorAll('.code-block')].find(b => codeText(b).startsWith('import os\nfrom netmiko'))!;
        const text = codeText(block);
        const line = document.createElement('div');
        line.className = 'code-line';
        line.textContent = text;
        block.replaceChildren(line);
        expect(() => restoreReviewedCorrections(container)).toThrow();
        expect(block.textContent).toBe(text);
        expect(block.children).toHaveLength(1);
    });

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
        // React disallows formatting whitespace under table/tr. Compare annotation
        // whitespace independently; code lines and table cells stay exact below.
        const bodyText = (items: { kind: string; text: string }[]) => items.map(item => item.kind === 'annotation' ? { ...item, text: squash(item.text) } : item);
        expect(bodyText(extractBodyContent(main))).toEqual(bodyText(inventory.bodyContent.slice(1)));
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
    it('全リストの種別・階層・inline要素を保持する', () => {
        const { container } = draw();
        expect([...container.querySelectorAll('main ul, main ol')].map(l => ({ tag: l.tagName, html: l.innerHTML.replace(/\s+/g, ' ').trim() }))).toEqual(design.lists);
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
        const mapValue = (v: string) => v.replace(/var\(--([\w-]+)\)/g, (all, key: string) => {
            const fonts: Record<string, string> = { serif: 'font-ccie-sp-serif', sans: 'font-body', mono: 'font-mono' };
            return key === 'c' || key === 'bg' ? all : `var(--${fonts[key] ?? `color-devnet-expert-${key}`})`;
        });
        design.rules.filter(r => r.selector !== ':root' && !r.selector.startsWith('.callout.')).forEach(source => {
            const selector = source.selector.split(',').map(s => s === 'body' || s === 'html' ? '.devnet-expert-page' : `.devnet-expert-page ${s === 'pre.hl' ? '.hl.code-block' : s}`).join(',');
            const targets = rules.filter(r => r.selector === selector && r.media === source.media);
            expect(targets.length, source.selector).not.toBe(0);
            const declarations = Object.assign({}, ...targets.map(r => r.declarations)) as Record<string, string>;
            Object.entries(source.declarations).forEach(([prop, value]) => {
                if ((source.selector === '.sidebar' && ['top','width'].includes(prop)) || (source.selector === '.main' && prop === 'margin-left')) return;
                if (['border-left','background','color'].includes(prop) && value.includes('var(--c)') || value.includes('var(--bg)')) return;
                expect(declarations[prop], `${source.selector} ${prop}`).toBe(mapValue(value));
            });
        });
        expect(readFileSync('app/cisco/devnet-expert/page.css', 'utf8')).not.toMatch(/--[\w-]+\s*:/);
        expect(rules.find(r => r.selector === '.devnet-expert-page .sidebar')?.declarations.width).toBe('280px');
        expect(rules.find(r => r.selector === '.devnet-expert-page .main')?.declarations['margin-left']).toBe('280px');
        design.rules.filter(r => r.selector.startsWith('.callout.')).forEach(source => {
            const target = rules.find(r => r.selector === `.devnet-expert-page ${source.selector}`);
            expect(target?.declarations['border-left-color']).toBe(mapValue(source.declarations['--c'] ?? ''));
            expect(target?.declarations.background).toBe(mapValue(source.declarations['--bg'] ?? ''));
        });
    });
});
