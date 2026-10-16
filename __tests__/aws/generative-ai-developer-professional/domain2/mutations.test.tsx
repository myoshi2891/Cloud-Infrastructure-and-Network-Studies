import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Guide from '@/app/aws/generative-ai-developer-professional/domain2/AipDomain2Guide';
import { snapshotGuidePart } from '@/scripts/guide-fidelity-extraction.mjs';
import fixture from '@/docs/migration-inventory/aws-aip-c01-domain2-guide.fidelity.json';
import { squash } from '@/__tests__/helpers/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => ({ MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock }));
describe('AIP domain2 gates detect injected omissions', () => {
    it.each([['paragraph','p','body'],['table row','tbody tr','tables'],['list item','li','lists'],['diagram','.mermaid-wrap','diagrams'],['code line','.code-line','codes']] as const)('rejects a missing %s', (_name, selector, key) => {
        const { container } = render(<Guide />);
        const part = container.querySelector('[data-part="foundation"]')!;
        const expected = {...fixture.guideParts.foundation,diagrams:fixture.guideParts.foundation.diagrams.map(chart=>`%%{init: ${JSON.stringify(fixture.guideInteractions.mermaidConfig)}}%%\n${chart}`)};
        const read = () => key === 'body' ? snapshotGuidePart(part).body.map(block => ({ ...block, text: squash(block.text) })) : snapshotGuidePart(part)[key];
        const wanted = key === 'body' ? expected.body.map(block => ({ ...block, text: squash(block.text) })) : expected[key];
        expect(read()).toEqual(wanted);
        const target = part.querySelector(selector); if (!target) throw new Error(`No mutation target ${selector}`);
        target.remove();
        expect(read()).not.toEqual(wanted);
    });
});
