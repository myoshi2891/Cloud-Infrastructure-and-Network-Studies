import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Diagram } from '@/app/aws/solutions-architect-professional/domain1/Diagram';
import { DIAGRAMS } from '@/app/aws/solutions-architect-professional/domain1/constants';

vi.mock('@/components/MermaidDiagram', async () => ({
    MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock,
}));

describe('SAP-C02 Domain 1 Mermaid Diagram Component', () => {
    it('provides actual YAML newlines, light-theme overrides, and a focusable .mermaid-wrap region for each chart', () => {
        for (const id of Object.keys(DIAGRAMS) as (keyof typeof DIAGRAMS)[]) {
            const { container, unmount } = render(<Diagram id={id} label="図の説明" />);
            const wrapper = container.querySelector('.mermaid-wrap');
            expect(wrapper).not.toBeNull();
            expect(wrapper).toHaveAttribute('role', 'region');
            expect(wrapper).toHaveAttribute('tabindex', '0');
            expect(wrapper).toHaveAttribute('aria-label', `図の説明（図${id.slice(5)}）`);

            const chart = container.querySelector('[data-chart]')!.getAttribute('data-chart')!;
            expect(chart).toMatch(/^---\nconfig: /);
            expect(chart).toContain('\n---\n' + DIAGRAMS[id]);
            expect(chart).not.toContain(String.raw`---\nconfig:`);
            expect(chart).toContain('"mainBkg":"#e8ecfa"');
            expect(chart).toContain('"clusterBkg":"#f2efe6"');
            unmount();
        }
    });
});
