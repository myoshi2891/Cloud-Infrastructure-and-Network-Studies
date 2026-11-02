// __tests__/aws/security-specialty/domain2/mutations.test.tsx
// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import Page from '@/app/aws/security-specialty/domain2/page';
import { snapshotGuidePart } from '@/scripts/guide-fidelity-extraction.mjs';
import { scsDomain2Part } from '@/__tests__/helpers/scs-domain2-fixture';

vi.mock('@/components/MermaidDiagram', async () => ({
    MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock,
}));

it.each([
    ['hero', 'p', 'text'],
    ['task21', 'tbody tr', 'tables'],
    ['task21', 'li', 'lists'],
    ['task21', '.mermaid-wrap', 'diagrams'],
    ['task21', '.code-line', 'codes'],
    ['task22', 'tbody tr', 'tables'],
    ['task22', '.code-line', 'codes'],
    ['appendix', 'a[href^="http"]', 'links'],
] as const)('detects source loss from %s %s', (part, selector, key) => {
    const { container } = render(<Page />);
    const original = container.querySelector(`[data-part="${part}"]`)!;
    const expected = scsDomain2Part(part);
    expect(snapshotGuidePart(original)[key]).toEqual(expected[key]);
    const clone = original.cloneNode(true) as HTMLElement;
    const target = clone.querySelector(selector);
    expect(target).not.toBeNull();
    target!.remove();
    expect(snapshotGuidePart(clone)[key]).not.toEqual(expected[key]);
});
