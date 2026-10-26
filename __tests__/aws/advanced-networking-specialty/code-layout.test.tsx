import { render } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import Page from '@/app/aws/advanced-networking-specialty/page';
import fixture from '@/docs/migration-inventory/aws-ans-c01-guide.fidelity.json';
import { snapshotTokens } from '@/scripts/archive-fidelity-extraction.mjs';
import { withSourceCorrections } from '@/__tests__/helpers/aip-source-corrections';
import { ANS_GUIDE_CORRECTIONS, ANS_GUIDE_SYNTAX_CORRECTIONS, withSyntaxCorrections } from '@/__tests__/helpers/aws-guide-source-corrections';

vi.mock('@/components/MermaidDiagram', async () => ({
    MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock,
}));

it('renders every original code line in one code element, including empty lines', () => {
    const { container } = render(<Page />);
    const expected = Object.values(withSourceCorrections(fixture.guideParts, ANS_GUIDE_CORRECTIONS)).flatMap(part => part.codes);
    const blocks = [...container.querySelectorAll('.code-block')];
    expect(blocks).toHaveLength(14);
    expect(expected.flat()).toHaveLength(168);
    blocks.forEach((block, index) => {
        const lines = [...block.querySelectorAll(':scope > .code-line')];
        expect(lines).toHaveLength(expected[index]!.length);
        lines.forEach((line, lineIndex) => {
            expect(line.childNodes, `block ${index + 1}, line ${lineIndex + 1}`).toHaveLength(1);
            const code = line.firstElementChild;
            expect(code?.tagName).toBe('CODE');
            expect(code?.getAttribute('class')).toMatch(/^language-[\w-]+$/);
            expect(code?.querySelector('code')).toBeNull();
            expect(code?.textContent).toBe(expected[index]![lineIndex]);
        });
    });
    expect(snapshotTokens(container, Object.fromEntries(Object.keys(fixture.syntaxTokens)
        .map(key => [key, '.code-block span.' + key])))).toEqual(withSyntaxCorrections(fixture.syntaxTokens, ANS_GUIDE_SYNTAX_CORRECTIONS));
});
