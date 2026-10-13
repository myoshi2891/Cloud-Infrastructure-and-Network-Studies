import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Guide from '@/app/aws/generative-ai-developer-professional/AipGuide';
import fixture from '@/docs/migration-inventory/aws-aip-c01-guide.fidelity.json';
import { snapshotGuidePart } from '@/scripts/guide-fidelity-extraction.mjs';
import { squash } from '@/__tests__/helpers/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

describe('AIP migration gates detect real omissions', () => {
    it.each([
        ['paragraph', 'p', 'body'],
        ['table row', 'tbody tr', 'tables'],
        ['list item', 'li', 'lists'],
        ['diagram', '.mermaid-wrap', 'diagrams'],
        ['code line', '.code-line', 'codes'],
    ] as const)('rejects a missing %s', (_label, selector, key) => {
        const { container } = render(<Guide />);
        const part = container.querySelector('[data-part="domain1"]');
        if (!part) throw new Error('missing domain1');
        if (key !== 'body') expect(snapshotGuidePart(part)[key]).toEqual(fixture.guideParts.domain1[key]);
        else expect(snapshotGuidePart(part).body.map(block => squash(block.text))).toEqual(fixture.guideParts.domain1.body.map(block => squash(block.text)));
        const element = part.querySelector(selector);
        if (!element) throw new Error(`mutation target absent: ${selector}`);
        element.remove();
        expect(snapshotGuidePart(part)[key]).not.toEqual(fixture.guideParts.domain1[key]);
    });
});
