// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import Page from '@/app/aws/security-specialty/domain3/page';
import { snapshotGuidePart } from '@/scripts/guide-fidelity-extraction.mjs';
import { scsDomain3Part } from '@/__tests__/helpers/scs-domain3-fixture';

vi.mock('@/components/MermaidDiagram', async () => ({
    MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock,
}));

it.each([
    ['herointro', 'p', 'text'],
    ['task31', 'tbody tr', 'tables'],
    ['task31', 'li', 'lists'],
    ['task31', '.mermaid-wrap', 'diagrams'],
    ['task31', '.code-line', 'codes'],
    ['task32', 'tbody tr', 'tables'],
    ['task32', '.code-line', 'codes'],
    ['task33', '.mermaid-wrap', 'diagrams'],
    ['appendix', 'a[href^="http"]', 'links'],
] as const)('detects source loss from %s %s', (part, selector, key) => {
    const { container } = render(<Page />);
    const original = container.querySelector(`[data-part="${part}"]`)!;
    const expected = scsDomain3Part(part) as Record<string, unknown>;
    expect(snapshotGuidePart(original)[key]).toEqual(expected[key]);
    const clone = original.cloneNode(true) as HTMLElement;
    const target = clone.querySelector(selector);
    expect(target).not.toBeNull();
    target!.remove();
    expect(snapshotGuidePart(clone)[key]).not.toEqual(expected[key]);
});
