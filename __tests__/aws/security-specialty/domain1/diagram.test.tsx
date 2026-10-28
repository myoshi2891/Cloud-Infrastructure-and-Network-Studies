import { render } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { Diagram } from '@/app/aws/security-specialty/domain1/Diagram';
import { DIAGRAMS } from '@/app/aws/security-specialty/domain1/constants';
import fixture from '@/docs/migration-inventory/aws-scs-c03-domain1-guide.fidelity.json';

vi.mock('@/components/MermaidDiagram', async () => ({
    MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock,
}));

it('provides actual YAML newlines before each original Mermaid chart', () => {
    for (const id of Object.keys(DIAGRAMS) as (keyof typeof DIAGRAMS)[]) {
        const { container, unmount } = render(<Diagram id={id} label="図の説明" />);
        const chart = container.querySelector('[data-chart]')!.getAttribute('data-chart')!;
        expect(chart).toMatch(/^---\nconfig: /);
        expect(chart).toContain('\n---\n' + DIAGRAMS[id]);
        expect(chart).not.toContain(String.raw`---\nconfig:`);
        unmount();
    }
});

it('preserves source Mermaid themeVariables and flowchart settings over shared dark defaults', () => {
    const { container } = render(<Diagram id="diag-1" label="検出全体フロー" />);
    const chart = container.querySelector('[data-chart]')!.getAttribute('data-chart')!;
    const config = JSON.parse(chart.split('\n')[1]!.slice('config: '.length));
    const expectedVars = fixture.guideInteractions.mermaidConfig.themeVariables;
    expect(Object.fromEntries(Object.keys(expectedVars).map((key) => [key, config.themeVariables[key]]))).toEqual(
        expectedVars,
    );
    expect(config.flowchart).toEqual(fixture.guideInteractions.mermaidConfig.flowchart);
});
