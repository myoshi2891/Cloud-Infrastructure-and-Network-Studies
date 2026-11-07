import { fireEvent, render, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import PracticeOptions from '@/app/aws/security-specialty/domain5/PracticeOptions';
import ExamPrep from '@/app/aws/security-specialty/domain5/sections/ExamPrep';

/** 各入力の値と、ラベルに表示された選択肢の文面を組にして返す。 */
const choices = (container: HTMLElement) =>
    [...container.querySelectorAll('input')].map((input) => [
        input.value,
        input.closest('label')?.textContent?.trim().replace(/\s+/g, ' '),
    ]);

describe('Domain 5 instant practice feedback', () => {
    it.each([[0, 1], [1, 1], [3, 2], [4, 2], [5, 1], [6, 1], [7, 1]])(
        'grades question %i immediately and supports changing an answer', (question, answer) => {
            const { container } = render(<ExamPrep />);
            const group = container.querySelectorAll('ul')[question]!;
            const inputs = within(group as HTMLElement).getAllByRole('radio');
            const status = container.querySelectorAll('[role="status"]')[question]!;
            expect(status).toBeEmptyDOMElement();
            fireEvent.click(inputs[0]!);
            expect(status).toHaveTextContent('不正解');
            fireEvent.click(inputs[answer]!);
            expect(status).toHaveTextContent(/^正解です/);
            expect(inputs[0]).not.toBeChecked();
            expect(inputs[answer]).toBeChecked();
        },
    );

    it('requires exactly A and C for question 3 and updates when toggled', () => {
        const { container } = render(<ExamPrep />);
        const inputs = within(container.querySelectorAll('ul')[2]! as HTMLElement).getAllByRole('checkbox');
        const status = container.querySelectorAll('[role="status"]')[2]!;
        fireEvent.click(inputs[0]!);
        expect(status).toHaveTextContent('あと1つ');
        expect(status).not.toHaveTextContent('不正解');
        fireEvent.click(inputs[1]!);
        expect(status).toHaveTextContent('不正解');
        fireEvent.click(inputs[1]!);
        fireEvent.click(inputs[2]!);
        expect(status).toHaveTextContent(/^正解です/);
        fireEvent.click(inputs[4]!);
        expect(status).toHaveTextContent('不正解');
        fireEvent.click(inputs[4]!);
        fireEvent.click(inputs[0]!);
        fireEvent.click(inputs[2]!);
        expect(status).toBeEmptyDOMElement();
    });

    it('assigns every source choice the answer-key letter shown in its label', () => {
        const { container } = render(<ExamPrep />);
        const pairs = choices(container);
        expect(pairs).toHaveLength(33);
        pairs.forEach(([value, label]) => expect(label?.startsWith(`${value}. `), label).toBe(true));
    });

    it('keeps letters aligned when non-li elements or fragments appear among the choices', () => {
        const { container } = render(
            <PracticeOptions questionId="question" answers={['C']}>
                {'\n'}
                <li>A. first</li>
                <hr />
                <>
                    <li>B. second</li>
                    <li>C. third</li>
                </>
                <li>D. fourth</li>
            </PracticeOptions>,
        );
        expect(choices(container)).toEqual([
            ['A', 'A. first'],
            ['B', 'B. second'],
            ['C', 'C. third'],
            ['D', 'D. fourth'],
        ]);
        fireEvent.click(container.querySelector('input[value="C"]')!);
        expect(container.querySelector('[role="status"]')).toHaveTextContent(/^正解です/);
    });

    it('keeps questions independent and labels every input with the original choice', () => {
        const { container } = render(<ExamPrep />);
        const radios = within(container.querySelectorAll('ul')[0]! as HTMLElement).getAllByRole('radio');
        fireEvent.click(radios[1]!);
        expect(container.querySelectorAll('[role="status"]')[1]).toBeEmptyDOMElement();
        container.querySelectorAll('input').forEach(input => expect(input).toHaveAccessibleName());
        expect(container.querySelectorAll('details')).toHaveLength(8);
    });
});
