import { render } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import Page from '@/app/aws/security-specialty/domain1/page';
import { snapshotGuidePart } from '@/scripts/guide-fidelity-extraction.mjs';
import { scsDomain1Part } from '@/__tests__/helpers/scs-domain1-fixture';

vi.mock('@/components/MermaidDiagram', async () => ({
    MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock,
}));

it.each([
    ['hero', 'p', 'text'],
    ['task11', 'tbody tr', 'tables'],
    ['task11', 'li', 'lists'],
    ['updates', 'a[href^="http"]', 'links'],
    ['task11', '.mermaid-wrap', 'diagrams'],
    ['task11', '.code-line', 'codes'],
    ['questions', 'details p', 'text'],
] as const)('detects source loss from %s %s', (part, selector, key) => {
    const { container } = render(<Page />);
    const original = container.querySelector(`[data-part="${part}"]`)!;
    const expected = scsDomain1Part(part);
    expect(snapshotGuidePart(original)[key]).toEqual(expected[key]);
    const clone = original.cloneNode(true) as HTMLElement;
    const target = clone.querySelector(selector);
    expect(target).not.toBeNull();
    target!.remove();
    expect(snapshotGuidePart(clone)[key]).not.toEqual(expected[key]);
});
