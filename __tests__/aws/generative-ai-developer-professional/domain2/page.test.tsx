import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Page from '@/app/aws/generative-ai-developer-professional/domain2/page';
import sourceInventory from '@/docs/migration-inventory/aws-aip-c01-domain2-guide.json';
import { AIP_DOMAIN2_CORRECTIONS, withSourceCorrections } from '@/__tests__/helpers/aip-source-corrections';
import fixture from '@/docs/migration-inventory/aws-aip-c01-domain2-guide.fidelity.json';
import { retainedDomain2Blocks } from '@/__tests__/helpers/aip-domain2-fixture';
import { extractBodyContent, normalizeSpaces, withBlockBoundarySpaces } from '@/__tests__/helpers/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => ({ MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock }));

// AWS公式ドキュメントにもとづく訂正を、原本inventoryの複製へ適用した表示期待値
const inventory = withSourceCorrections(sourceInventory, AIP_DOMAIN2_CORRECTIONS);

describe('AIP domain2 independent complete inventory', () => {
    it.each(['h1', 'h2', 'h3', 'h4', 'th', 'td'] as const)('retains every %s text in source order', tag => {
        const { container } = render(<Page />);
        expect([...container.querySelectorAll(tag)].map(el => normalizeSpaces(el.textContent ?? ''))).toEqual(inventory[tag].map(normalizeSpaces));
    });
    it('retains all 296 source list items, including nested lists and checklist', () => {
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
        expect(normalize(extractBodyContent(withBlockBoundarySpaces(container)))).toEqual(normalize(retainedDomain2Blocks(inventory.bodyContent)));
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
