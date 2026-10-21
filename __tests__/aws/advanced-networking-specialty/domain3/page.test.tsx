import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Page from '@/app/aws/advanced-networking-specialty/domain3/page';
import sourceInventory from '@/docs/migration-inventory/aws-ans-c01-domain3-guide.json';

import fixture from '@/docs/migration-inventory/aws-ans-c01-domain3-guide.fidelity.json';


import { extractBodyContent, normalizeSpaces, withBlockBoundarySpaces } from '@/__tests__/helpers/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => ({ MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock }));

// 原本から独立して固定した全量期待値
const inventory = sourceInventory;

describe('ANS domain3 independent complete inventory', () => {
    it.each(['h1', 'h2', 'h3', 'h4', 'th', 'td'] as const)('retains every %s text in source order', tag => {
        const { container } = render(<Page />);
        expect([...container.querySelectorAll(tag)].map(el => normalizeSpaces(el.textContent ?? ''))).toEqual(inventory[tag].map(normalizeSpaces));
    });
    it('retains all 38 source list items, including nested lists and checklist', () => {
        const { container } = render(<Page />);
        const main = container.querySelector('main')!;
        expect([...withBlockBoundarySpaces(main).querySelectorAll('li')].map(el => normalizeSpaces(el.textContent ?? ''))).toEqual(inventory.listItems.map(normalizeSpaces));
    });
    it('retains all duplicate external links with text and original order', () => {
        const { container } = render(<Page />);
        expect([...container.querySelectorAll('a[href^="http"]')].map(a => ({ href: a.getAttribute('href'), text: normalizeSpaces(a.textContent ?? '') }))).toEqual(inventory.links.map(link => ({ ...link, text: normalizeSpaces(link.text) })));
    });
    it('retains complete body and exact counts without requiring source HTML or archive', () => {
        const { container } = render(<Page />);
        const normalize = (blocks: { kind: string; text: string }[]) => blocks.map(block => ({ ...block, text: normalizeSpaces(block.text) }));
        expect(normalize(extractBodyContent(withBlockBoundarySpaces(container)))).toEqual(normalize(inventory.bodyContent));
        expect(container.querySelectorAll('table')).toHaveLength(inventory.counts.table);
        expect(container.querySelectorAll('[data-testid="mermaid-diagram"]')).toHaveLength(inventory.counts.diagram);
        expect(container.querySelectorAll('.code-block')).toHaveLength(inventory.counts.codeBlock);
        container.querySelectorAll('.code-block').forEach(block => expect(block).toHaveAttribute('tabindex', '0'));
        expect([...container.querySelectorAll('[data-part]')].map(el => el.getAttribute('data-part'))).toEqual(Object.keys(fixture.guideParts));
        const ids = [...container.querySelectorAll('[id]')].map(el => el.id);
        expect(new Set(ids).size).toBe(ids.length);
        [...container.querySelectorAll('table')].forEach((table, index) => expect(table.querySelectorAll('thead th[scope="col"]')).toHaveLength(inventory.structures.tableColumnHeaders[index] ?? -1));

    });
});

it('makes every source table horizontally scrollable by keyboard with an accessible label', () => {
    const { container } = render(<Page />);
    const wrappers = container.querySelectorAll('.table-scroll');
    expect(wrappers).toHaveLength(91);
    wrappers.forEach(wrapper => {
        expect(wrapper).toHaveAttribute('tabindex', '0');
        expect(wrapper).toHaveAttribute('role', 'region');
        expect(wrapper.getAttribute('aria-label')?.trim()).toBeTruthy();
    });
});

it('gives all code scroll regions unique accessible names derived from their headings', () => {
 const {container}=render(<Page/>);const blocks=[...container.querySelectorAll('.code-block')];
 const labels=blocks.map(block=>block.getAttribute('aria-label'));
 expect(labels.every(label=>Boolean(label?.trim()))).toBe(true);
 expect(new Set(labels).size).toBe(inventory.counts.codeBlock);
});

it('gives every table, diagram and code scroll region a unique accessible name',()=>{
 const {container}=render(<Page/>);const regions=[...container.querySelectorAll('[role="region"]')];
 expect(regions).toHaveLength(inventory.counts.table+inventory.counts.diagram+inventory.counts.codeBlock);
 const labels=regions.map(region=>region.getAttribute('aria-label'));
 expect(labels.every(label=>Boolean(label?.trim()))).toBe(true);
 expect(new Set(labels).size).toBe(regions.length);
});

it('avoids hydration-invalid whitespace children in every table structural element',()=>{
 const {container}=render(<Page/>);
 container.querySelectorAll('table,thead,tbody,tfoot,tr,colgroup').forEach(element=>{
  expect([...element.childNodes].filter(node=>node.nodeType===Node.TEXT_NODE),element.tagName).toHaveLength(0);
 });
});
