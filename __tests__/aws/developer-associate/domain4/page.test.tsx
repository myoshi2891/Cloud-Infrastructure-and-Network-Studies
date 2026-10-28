import { readFileSync } from 'node:fs';
import { render, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Page from '@/app/aws/developer-associate/domain4/page';
import inventory from '@/docs/migration-inventory/aws-dva-domain4.json';
import fixture from '@/docs/migration-inventory/aws-dva-domain4.fidelity.json';
import { snapshotTroubleshooting } from '@/scripts/dva-troubleshooting-fidelity.mjs';
import { codeBlockSelector, codeLineCount, extractBodyContent, squash } from '@/__tests__/helpers/migration-test-utils';
vi.mock('@/components/MermaidDiagram', async () => ({ MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock }));
const mount = () => render(<Page />);
describe('DVA Domain 4 全量移行', () => {
    it.each(['h1','h2','h3','h4','th','td','listItems'] as const)('%s 全文・順序・件数', key => {
        const selector = key === 'listItems' ? 'main li' : key;
        expect([...mount().container.querySelectorAll(selector)].map(el => squash(el.textContent ?? ''))).toEqual(inventory[key].map(squash));
    });
    it('本文・コード・注釈を全文・出現順で保持する', () => {
        expect(extractBodyContent(mount().container)).toEqual(inventory.bodyContent);
    });
    it('全リスト階層・表結合・図配置・コード・リンク・アイコン・各節全文を保持する', () => {
        expect(snapshotTroubleshooting(mount().container)).toEqual(fixture.structure);
    });
    it('全表の列見出しと全コードの行数・字下げを保持する', () => {
        const root = mount().container;
        const tables = [...root.querySelectorAll('table')];
        expect(tables).toHaveLength(inventory.counts.table);
        tables.forEach((table, i) => expect(table.querySelectorAll('thead th[scope="col"]')).toHaveLength(inventory.structures.tableColumnHeaders[i]!));
        const blocks = [...root.querySelectorAll(codeBlockSelector)];
        expect(blocks).toHaveLength(inventory.counts.codeBlock);
        blocks.forEach((block, i) => { expect(block.querySelector(':scope > .code-line')).not.toBeNull(); expect(codeLineCount(block)).toBe(inventory.structures.codeLines[i]); });
    });
    it('34図の原本DSL・テーマ・説明・自然倍率を保持する', () => {
        const diagrams = mount().container.querySelectorAll('[data-testid="mermaid-diagram"]');
        expect(diagrams).toHaveLength(inventory.counts.diagram);
        diagrams.forEach((el, i) => {
            expect(el.getAttribute('aria-label')?.trim()).toBeTruthy();
            expect(el.getAttribute('data-preserve-natural-scale')).toBe('true');
            expect(el.getAttribute('data-chart')).toContain(Object.values(fixture.diagrams)[i]);
            expect(el.getAttribute('data-chart')).toContain('"primaryColor":"#ffffff"');
        });
    });
    it.each(['main p','tbody tr','main li','main a','[data-diagram-id]','.code-line'])( '%s を欠落させると全量比較が失敗する', selector => {
        const root = mount().container;
        expect(snapshotTroubleshooting(root)).toEqual(fixture.structure);
        const target = root.querySelector(selector);
        expect(target).not.toBeNull(); target!.remove();
        expect(snapshotTroubleshooting(root)).not.toEqual(fixture.structure);
    });
    it('全目次・モバイル開閉・hash/focusを提供する', () => {
        const {container} = mount();
        const links = [...container.querySelectorAll('nav a')];
        expect(links.map(el => el.getAttribute('href'))).toEqual(fixture.nav.map(item => '#'+item.id));
        const toggle = container.querySelector('.menu-btn')!;
        fireEvent.click(toggle); expect(toggle).toHaveAttribute('aria-expanded','true');
        fireEvent.keyDown(document, {key:'Escape'}); expect(toggle).toHaveAttribute('aria-expanded','false');
        fireEvent.click(links[1]!); expect(window.location.hash).toBe('#step-0');
        expect(document.activeElement?.id).toBe('step-0');
    });
    it('点・番号・入れ子・参照リストの装飾を明示する', () => {
        const css = readFileSync('app/aws/developer-associate/domain4/page.css','utf8');
        for (const value of ['list-style-type: disc','list-style-type: decimal','list-style-type: circle','list-style-type: none','display: list-item','padding-left: 1.6rem']) expect(css).toContain(value);
        expect(css).not.toMatch(/@layer|^[ \t]*--[\w-]+\s*:/m);
    });
});
