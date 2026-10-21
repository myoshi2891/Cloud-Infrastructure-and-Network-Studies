import { normalizeAnsDomain2Quiz } from '@/__tests__/helpers/ans-domain2-quiz';
import { expect, it, vi } from 'vitest';
import { fireEvent, render, within } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import Guide from '@/app/aws/advanced-networking-specialty/domain2/sections/Revision';
import { ansDomain2Part } from '@/__tests__/helpers/ans-domain2-fixture';
import { defineGuidePartSuite } from '@/__tests__/helpers/guide-fidelity-suite';
vi.mock('@/components/MermaidDiagram',async()=>({MermaidDiagram:(await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock}));

// Normalize the intentionally redesigned quiz presentation back to the source
// structure so the full original content and surrounding sections stay audited.
function ContentWithoutQuizPresentation() {
    const root = document.createElement('div');
    root.innerHTML = renderToStaticMarkup(<Guide />);
    const normalized = normalizeAnsDomain2Quiz(root);
    return <div dangerouslySetInnerHTML={{__html: normalized.innerHTML}} />;
}
defineGuidePartSuite(ContentWithoutQuizPresentation,'revision',ansDomain2Part('revision'));

it('supports single and multiple choices with independently expandable explanations', () => {
    const { container } = render(<Guide />);
    const cards = container.querySelectorAll('.quiz-card');
    expect(cards).toHaveLength(8);
    for (const [index, card] of [...cards].entries()) {
        const [first, second] = within(card as HTMLElement).getAllByRole(index === 0 || index === 4 ? 'checkbox' : 'radio');
        if (!first || !second) throw new Error(`quiz ${index + 1} has fewer than 2 choices`);
        fireEvent.click(first);
        fireEvent.click(second);
        expect(second).toBeChecked();
        if (index === 0 || index === 4) expect(first).toBeChecked();
        else expect(first).not.toBeChecked();
        expect(card.querySelector('fieldset legend')).toHaveAttribute('id', `quiz-title-${index + 1}`);
        expect(card.querySelector('details')).not.toHaveAttribute('open');
        expect(card.querySelector('summary')).toHaveTextContent('正解・解説を見る');
    }
});
