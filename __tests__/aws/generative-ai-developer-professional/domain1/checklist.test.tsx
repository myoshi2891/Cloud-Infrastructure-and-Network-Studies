import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Checklist from '@/app/aws/generative-ai-developer-professional/domain1/Checklist';
import fixture from '@/docs/migration-inventory/aws-aip-c01-domain1-guide.fidelity.json';
import { snapshotGuideChecks } from '@/scripts/guide-interaction-extraction.mjs';

describe('source checklist semantics and progress', () => {
    it('preserves all 16 labelled controls and initial states, including inline code', () => {
        const { container } = render(<Checklist />);
        expect(snapshotGuideChecks(container)).toEqual(fixture.guideInteractions.checks);
        expect(screen.getAllByRole('checkbox')).toHaveLength(16);
        expect(container.querySelector('.count')).toHaveTextContent('0 / 16 完了');
        expect(container.querySelector('.count')).toHaveAttribute('aria-live', 'polite');
        expect(container.querySelector('label code')).toHaveTextContent('SearchVectors');
    });
    it('supports every label, counts all selections and deselections, and resets on remount', () => {
        const { container, unmount } = render(<Checklist />);
        fixture.guideInteractions.checks.forEach((item, index) => {
            const box = screen.getByRole('checkbox', { name: item.label });
            const label = container.querySelector(`label[for="${item.id}"]`)!;
            fireEvent.click(label);
            expect(box).toBeChecked();
            expect(container.querySelector('.count')?.textContent).toBe(`${index + 1} / 16 完了`);
        });
        fixture.guideInteractions.checks.forEach((item, index) => {
            fireEvent.click(screen.getByRole('checkbox', { name: item.label }));
            expect(screen.getByRole('checkbox', { name: item.label })).not.toBeChecked();
            expect(container.querySelector('.count')?.textContent).toBe(`${15 - index} / 16 完了`);
        });
        fireEvent.click(screen.getAllByRole('checkbox')[0]!);
        unmount();
        const fresh = render(<Checklist />);
        expect(snapshotGuideChecks(fresh.container)).toEqual(fixture.guideInteractions.checks);
    });
});
