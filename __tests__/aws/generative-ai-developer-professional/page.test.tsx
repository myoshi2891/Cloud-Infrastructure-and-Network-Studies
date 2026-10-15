import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Page from '@/app/aws/generative-ai-developer-professional/page';
import inventory from '@/docs/migration-inventory/aws-aip-c01-guide.json';
import fixture from '@/docs/migration-inventory/aws-aip-c01-guide.fidelity.json';
import { normalizeSpaces, extractBodyContent, withBlockBoundarySpaces } from '@/__tests__/helpers/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

describe('AIP page: independent full source inventory', () => {
    it.each(['h1', 'h2', 'h3', 'h4', 'th', 'td'] as const)('preserves every %s, including sidebar heading', tag => {
        const { container } = render(<Page />);
        expect([...container.querySelectorAll(tag)].map(el => normalizeSpaces(el.textContent ?? ''))).toEqual(inventory[tag].map(normalizeSpaces));
    });
    it('matches all 60 content list items without counting the new semantic navigation list', () => {
        const { container } = render(<Page />);
        expect([...container.querySelectorAll('main li')].map(el => normalizeSpaces(el.textContent ?? ''))).toEqual(inventory.listItems.map(normalizeSpaces));
    });
    it('preserves external link texts, duplicate hrefs and their complete order', () => {
        const { container } = render(<Page />);
        expect([...container.querySelectorAll('a[href^="http"]')].map(el => ({ href: el.getAttribute('href'), text: normalizeSpaces(el.textContent ?? '') }))).toEqual(inventory.links.map(link => ({ ...link, text: normalizeSpaces(link.text) })));
    });
    it('retains all source body blocks, code lines and exact component counts', () => {
        const { container } = render(<Page />);
        const normalize = (blocks: { kind: string; text: string }[]) => blocks.map(block => ({ ...block, text: block.kind === 'code' ? block.text : normalizeSpaces(block.text) }));
        expect(normalize(extractBodyContent(withBlockBoundarySpaces(container)))).toEqual(normalize(inventory.bodyContent));
        expect(container.querySelectorAll('table')).toHaveLength(inventory.counts.table);
        expect(container.querySelectorAll('[data-testid="mermaid-diagram"]')).toHaveLength(inventory.counts.diagram);
        expect(container.querySelectorAll('.code-block')).toHaveLength(inventory.counts.codeBlock);
        expect(container.querySelectorAll('img,svg')).toHaveLength(inventory.counts.figure);
        expect(container.querySelectorAll('.code-block > .code-line')).toHaveLength(inventory.structures.codeLines[0] ?? -1);
    });
    it('keeps all six source parts once, all anchor targets and all styled content classes', () => {
        const { container } = render(<Page />);
        expect([...container.querySelectorAll('[data-part]')].map(el => el.getAttribute('data-part'))).toEqual(Object.keys(fixture.guideParts));
        const ids = [...container.querySelectorAll('[id]')].map(el => el.id);
        expect(new Set(ids).size).toBe(ids.length);
        for (const item of fixture.guideDesign.nav) expect(container.querySelector(`[id="${item.id}"]`)).not.toBeNull();
        for (const name of fixture.styledClasses) {
            expect(container.querySelector(`.${name === 'mermaid' ? 'mermaid-wrap' : name}`), name).not.toBeNull();
        }
    });
    it('exposes every focusable diagram wrapper as a labelled region', () => {
        const { container } = render(<Page />);
        const wraps = [...container.querySelectorAll('.mermaid-wrap')];
        expect(wraps).toHaveLength(inventory.counts.diagram);
        for (const wrap of wraps) {
            expect(wrap.getAttribute('role')).toBe('region');
            expect(wrap.getAttribute('tabindex')).toBe('0');
            expect(wrap.getAttribute('aria-label')?.trim()).toBeTruthy();
            expect(wrap.querySelector('[data-testid="mermaid-diagram"]')?.getAttribute('aria-label')).toBe(wrap.getAttribute('aria-label'));
            expect(wrap.querySelector('[data-testid="mermaid-diagram"]')).toHaveAttribute('data-theme', 'light');
        }
    });
});
