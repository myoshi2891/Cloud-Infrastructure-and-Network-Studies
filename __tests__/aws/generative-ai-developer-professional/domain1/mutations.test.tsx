import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Guide from '@/app/aws/generative-ai-developer-professional/domain1/AipDomain1Guide';
import { snapshotGuidePart } from '@/scripts/guide-fidelity-extraction.mjs';
import { snapshotGuideChecks } from '@/scripts/guide-interaction-extraction.mjs';
import { aipDomain1Part } from '@/__tests__/helpers/aip-domain1-fixture';
import fixture from '@/docs/migration-inventory/aws-aip-c01-domain1-guide.fidelity.json';
import { squash } from '@/__tests__/helpers/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => ({ MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock }));
describe('AIP domain1 gates detect injected omissions', () => {
    it.each([['paragraph','p','body'],['table row','tbody tr','tables'],['list item','li','lists'],['diagram','.mermaid-wrap','diagrams']] as const)('rejects a missing %s', (_name, selector, key) => {
        const { container } = render(<Guide />);
        const part = container.querySelector('[data-part="task12"]')!;
        const expected = aipDomain1Part('task12');
        const read = () => key === 'body' ? snapshotGuidePart(part).body.map(block => ({ ...block, text: squash(block.text) })) : snapshotGuidePart(part)[key];
        const wanted = key === 'body' ? expected.body.map(block => ({ ...block, text: squash(block.text) })) : expected[key];
        expect(read()).toEqual(wanted);
        const target = part.querySelector(selector); if (!target) throw new Error(`No mutation target ${selector}`);
        target.remove();
        expect(read()).not.toEqual(wanted);
    });
    it('rejects a removed checkbox and a missing label', () => {
        const { container } = render(<Guide />);
        expect(snapshotGuideChecks(container)).toEqual(fixture.guideInteractions.checks);
        container.querySelector('input')!.remove();
        expect(snapshotGuideChecks(container)).not.toEqual(fixture.guideInteractions.checks);
        container.querySelector('label[for="chk2"]')!.remove();
        expect(() => snapshotGuideChecks(container)).toThrow('label');
    });
});
