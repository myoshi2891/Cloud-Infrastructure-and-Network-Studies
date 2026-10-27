import { fireEvent, render } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import ChecklistSection from '@/app/aws/security-specialty/domain1/sections/ChecklistSection';
import { defineGuidePartSuite } from '@/__tests__/helpers/guide-fidelity-suite';
import { scsDomain1Part } from '@/__tests__/helpers/scs-domain1-fixture';
import fixture from '@/docs/migration-inventory/aws-scs-c03-domain1-guide.fidelity.json';

vi.mock('@/components/MermaidDiagram', async () => ({
    MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock,
}));

defineGuidePartSuite(ChecklistSection, 'checklist', scsDomain1Part('checklist'));

it('retains all 19 checklist items and updates group completion counts interactively', () => {
    const { container } = render(<ChecklistSection />);
    const inputs = [...container.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')];
    expect(inputs.map((i) => ({ id: i.id, label: container.querySelector(`label[for="${i.id}"]`)?.textContent?.trim(), checked: i.checked }))).toEqual(
        fixture.guideInteractions.checks,
    );
    const firstCard = container.querySelector('.checklist-card')!;
    const countEl = firstCard.querySelector('.count')!;
    expect(countEl.textContent).toBe('0 / 4 完了');
    fireEvent.click(inputs[0]!);
    expect(inputs[0]).toBeChecked();
    expect(countEl.textContent).toBe('1 / 4 完了');
    fireEvent.click(inputs[1]!);
    expect(countEl.textContent).toBe('2 / 4 完了');
    fireEvent.click(inputs[0]!);
    expect(inputs[0]).not.toBeChecked();
    expect(countEl.textContent).toBe('1 / 4 完了');
});
