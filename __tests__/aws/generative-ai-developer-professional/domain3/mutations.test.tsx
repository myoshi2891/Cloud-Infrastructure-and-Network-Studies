import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Guide from '@/app/aws/generative-ai-developer-professional/domain3/AipDomain3Guide';
import { snapshotGuidePart } from '@/scripts/guide-fidelity-extraction.mjs';
import {aipDomain3Part} from '@/__tests__/helpers/aip-domain3-fixture';
import { squash } from '@/__tests__/helpers/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => ({ MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock }));
describe('AIP domain3 gates detect injected omissions', () => {
    it.each([['paragraph','p','body'],['table row','tbody tr','tables'],['list item','li','lists'],['diagram','.mermaid-wrap','diagrams'],['external link','a[href^="http"]','links']] as const)('rejects a missing %s', (_name, selector, key) => {
        const { container } = render(<Guide />);
        const part = container.querySelector('[data-part="foundation"]')!;
        const expected = aipDomain3Part('foundation');
        const read = () => key === 'body' ? snapshotGuidePart(part).body.map(block => ({ ...block, text: squash(block.text) })) : snapshotGuidePart(part)[key];
        const wanted = key === 'body' ? expected.body.map(block => ({ ...block, text: squash(block.text) })) : expected[key];
        expect(read()).toEqual(wanted);
        const target = part.querySelector(selector); if (!target) throw new Error(`No mutation target ${selector}`);
        target.remove();
        expect(read()).not.toEqual(wanted);
    });
});
