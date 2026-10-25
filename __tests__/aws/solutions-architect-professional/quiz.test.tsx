import { fireEvent, render, within } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import Revision from '@/app/aws/solutions-architect-professional/sections/Revision';
import quiz from '@/docs/migration-inventory/aws-sap-c02-guide.quiz.json';
import { normalizeText } from '@/scripts/archive-fidelity-extraction.mjs';
vi.mock('@/components/MermaidDiagram', async () => ({ MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock }));

it('retains all twelve questions, 48 options, answers and full explanations from source', () => {
    const { container } = render(<Revision />);
    expect(container.querySelectorAll('.q-card')).toHaveLength(12);
    expect(container.querySelectorAll('.q-opt')).toHaveLength(48);
    for (const question of quiz) {
        const card = container.querySelector('#' + question.id)!;
        expect(card).toHaveAttribute('data-answer', question.answer);
        expect(normalizeText(card.querySelector('.q-text')!.textContent)).toBe(question.question);
        expect(normalizeText(card.querySelector('.q-expl')!.textContent)).toBe(question.explanation);
        for (const option of question.options) {
            const button = card.querySelector(`[data-key="${option.key}"]`)!;
            expect(button.tagName).toBe('BUTTON');
            expect(normalizeText(button.textContent)).toBe(option.text);
            expect(button).toBeEnabled();
        }
        expect(card.querySelector('.q-result')).not.toBeVisible();
    }
});
it('grades every correct answer, locks choices, reveals explanations and resets all state', () => {
    const { container } = render(<Revision />);
    quiz.forEach((question, i) => {
        const card = container.querySelector('#' + question.id)!;
        fireEvent.click(card.querySelector(`[data-key="${question.answer}"]`)!);
        expect(card).toHaveClass('is-correct');
        expect(card.querySelector('.q-verdict')).toHaveTextContent('✓ 正解です');
        expect(card.querySelector('.q-result')).toBeVisible();
        card.querySelectorAll('.q-opt').forEach(option => expect(option).toBeDisabled());
        expect(container.querySelector('#qScore')).toHaveTextContent(String(i + 1));
        expect(container.querySelector('#qDone')).toHaveTextContent(String(i + 1));
        expect(container.querySelector('#qFill')).toHaveStyle({ width: `${(i + 1) / 12 * 100}%` });
        fireEvent.click(card.querySelector('.q-opt:not(.is-correct)')!);
        expect(container.querySelector('#qScore')).toHaveTextContent(String(i + 1));
    });
    expect(container.querySelector('#qFinal')).toHaveTextContent('全 12 問終了:12 / 12(100%) 合格ラインの目安に到達しています。間違えた問題を解説で復習しましょう。');
    fireEvent.click(within(container).getByRole('button', { name: 'リセット' }));
    expect(container.querySelector('#qScore')).toHaveTextContent('0');
    expect(container.querySelector('#qDone')).toHaveTextContent('0');
    expect(container.querySelector('#qFill')).toHaveStyle({ width: '0%' });
    expect(container.querySelector('#qFinal')).not.toBeVisible();
    expect(container.querySelectorAll('.is-correct,.is-wrong,.is-dim')).toHaveLength(0);
    container.querySelectorAll('.q-opt').forEach(option => expect(option).toBeEnabled());
    container.querySelectorAll('.q-result').forEach(result => expect(result).not.toBeVisible());
});
it('grades every wrong answer and identifies the correct option without allowing a second answer', () => {
    const { container } = render(<Revision />);
    quiz.forEach(question => {
        const card = container.querySelector('#' + question.id)!;
        const wrong = question.options.find(option => option.key !== question.answer)!;
        fireEvent.click(card.querySelector(`[data-key="${wrong.key}"]`)!);
        expect(card).toHaveClass('is-wrong');
        expect(card.querySelector('.q-verdict')).toHaveTextContent(`✗ 不正解です。正解は ${question.answer} です`);
        expect(card.querySelector(`[data-key="${question.answer}"]`)).toHaveClass('is-correct');
        expect(card.querySelector(`[data-key="${wrong.key}"]`)).toHaveClass('is-wrong');
        expect(card.querySelectorAll('.is-dim')).toHaveLength(2);
    });
    expect(container.querySelector('#qScore')).toHaveTextContent('0');
    expect(container.querySelector('#qFinal')).toHaveTextContent('正答率が 75% 未満です');
});
it.each([8, 9])('uses the original 75%% threshold with %i correct answers', correct => {
    const { container } = render(<Revision />);
    quiz.forEach((question, i) => {
        const key = i < correct ? question.answer : question.options.find(option => option.key !== question.answer)!.key;
        fireEvent.click(container.querySelector(`#${question.id} [data-key="${key}"]`)!);
    });
    expect(container.querySelector('#qFinal')).toHaveTextContent(correct === 9 ? '合格ラインの目安に到達しています' : '正答率が 75% 未満です');
});
