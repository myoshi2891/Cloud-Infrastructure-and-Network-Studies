import type { ComponentType } from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { snapshotGuidePart } from '@/scripts/guide-fidelity-extraction.mjs';

type GuidePart = ReturnType<typeof snapshotGuidePart>;

/** Compare every field against a source fixture, never against an implementation snapshot. */
export function defineGuidePartSuite(Page: ComponentType, id: string, expected: GuidePart): void {
    describe(`AIP ${id} 全量・順序・構造`, () => {
        const content = () => {
            const { container } = render(<Page />);
            const part = container.querySelector(`[data-part="${id}"]`);
            expect(part, `missing ${id} content`).not.toBeNull();
            if (!part) throw new Error(`missing ${id}`);
            return part;
        };
        for (const key of Object.keys(expected) as (keyof GuidePart)[]) {
            it(`preserves all ${key}`, () => {
                expect(snapshotGuidePart(content())[key]).toEqual(expected[key]);
            });
        }
        it('retains table header scopes, focusable anchors and diagram accessibility', () => {
            const root = content();
            expect(root.querySelectorAll('table')).toHaveLength(expected.tables.length);
            [...root.querySelectorAll('table')].forEach((table, i) => {
                expect(table.querySelector('thead')).not.toBeNull();
                expect(table.querySelectorAll('thead th[scope="col"]')).toHaveLength(expected.tables[i]?.[0]?.length ?? -1);
            });
            root.querySelectorAll('h2[id],h3[id]').forEach(heading => expect(heading).toHaveAttribute('tabindex', '-1'));
            const diagrams = root.querySelectorAll('[data-testid="mermaid-diagram"]');
            expect(diagrams).toHaveLength(expected.diagrams.length);
            diagrams.forEach(diagram => {
                expect(diagram.getAttribute('aria-label')?.trim()).toBeTruthy();
                expect(diagram).toHaveAttribute('data-preserve-natural-scale', 'true');
            });
            [...root.querySelectorAll('.code-block')].forEach((code, index) => {
                expect(code.children).toHaveLength(expected.codes[index]?.length ?? -1);
                [...code.children].forEach(line => expect(line).toHaveClass('code-line'));
            });
        });
    });
}
