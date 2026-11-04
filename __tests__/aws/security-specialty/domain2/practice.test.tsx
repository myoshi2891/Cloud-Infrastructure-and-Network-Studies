// __tests__/aws/security-specialty/domain2/practice.test.tsx
// @vitest-environment jsdom
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import PracticeQuestions from '@/app/aws/security-specialty/domain2/sections/PracticeQuestions';

const card = (number: number) => {
    const element = document.getElementById(`quiz-question-${number}`)?.closest('article');
    if (!element) throw new Error(`Q${number} のカードがありません`);
    return element;
};
const feedback = (number: number) => within(card(number)).getByRole('status');
const slot = (position: number) =>
    within(card(1)).getByRole('combobox', { name: `${position}番目` });

const selectOrder = async (order: readonly string[]) => {
    const user = userEvent.setup();
    for (const [index, value] of order.entries()) {
        await user.selectOptions(slot(index + 1), value);
    }
};

// 正解は各問の既存の「答え」に対応する。実装のデータから導出しないことで取り違えを検出する
const CORRECT_CHOICES: readonly (readonly [number, RegExp])[] = [
    [2, /接続追跡/],
    [3, /トークンの発行時刻より前/],
    [4, /OpsCenter/],
    [5, /停止条件/],
    [6, /Detective の検出結果グループ/],
    [7, /SRT にアクセスを許可する IAM ロール/],
    [8, /EventBridge ルールで受け/],
    [9, /validate-logs/],
    [10, /ゾーンシフト/],
];

describe('練習問題の採点 (Q2〜Q10)', () => {
    it('Q2〜Q10 に 4 択の単一選択を未選択の状態で表示する', () => {
        render(<PracticeQuestions />);
        for (const [number] of CORRECT_CHOICES) {
            const radios = within(card(number)).getAllByRole('radio');
            expect(radios).toHaveLength(4);
            radios.forEach((radio) => expect(radio).not.toBeChecked());
            expect(feedback(number)).toHaveTextContent(/^$/);
        }
    });

    it.each(CORRECT_CHOICES)('Q%i は正解の選択肢だけを正解と判定する', async (number, correct) => {
        const user = userEvent.setup();
        render(<PracticeQuestions />);
        const radios = within(card(number)).getAllByRole<HTMLInputElement>('radio');
        const matches = radios.filter((radio) => correct.test(radio.closest('label')?.textContent ?? ''));
        expect(matches).toHaveLength(1);
        for (const radio of radios) {
            await user.click(radio);
            expect(radio).toBeChecked();
            expect(feedback(number)).toHaveTextContent(radio === matches[0] ? /^正解です/ : /^不正解です/);
            expect(radio.closest('label')).toHaveAttribute(
                'data-state',
                radio === matches[0] ? 'correct' : 'incorrect',
            );
        }
    });

    it('選択を変更すると判定が追従し、変更前の選択の表示が消える', async () => {
        const user = userEvent.setup();
        render(<PracticeQuestions />);
        const radios = within(card(4)).getAllByRole('radio');
        const correct = radios.find((radio) => /OpsCenter/.test(radio.closest('label')?.textContent ?? ''))!;
        const wrong = radios.find((radio) => radio !== correct)!;
        await user.click(wrong);
        await user.click(correct);
        expect(feedback(4)).toHaveTextContent(/^正解です/);
        expect(wrong.closest('label')).not.toHaveAttribute('data-state');
        expect(correct.closest('label')).toHaveAttribute('data-state', 'correct');
    });

    it('各問の選択と判定は独立している', async () => {
        const user = userEvent.setup();
        render(<PracticeQuestions />);
        await user.click(within(card(2)).getAllByRole('radio')[0]!);
        expect(feedback(2)).not.toHaveTextContent(/^$/);
        within(card(3)).getAllByRole('radio').forEach((radio) => expect(radio).not.toBeChecked());
        expect(feedback(3)).toHaveTextContent(/^$/);
        expect(slot(1)).toHaveValue('');
    });

    it('採点しても既存の解説は閉じたまま保持される', async () => {
        const user = userEvent.setup();
        render(<PracticeQuestions />);
        await user.click(within(card(5)).getAllByRole('radio')[0]!);
        const answer = card(5).querySelector('details');
        expect(answer).not.toHaveAttribute('open');
        expect(answer?.querySelector('.quiz-answer-content')).toHaveTextContent('答え');
    });
});

describe('Q1 の並べ替え採点', () => {
    it('4 つの順番それぞれで全操作を選べ、単一選択の入力を持たない', () => {
        render(<PracticeQuestions />);
        expect(within(card(1)).queryAllByRole('radio')).toHaveLength(0);
        for (const position of [1, 2, 3, 4]) {
            const options = within(slot(position)).getAllByRole('option');
            expect(options.map((option) => option.getAttribute('value'))).toEqual(['', 'a', 'b', 'c', 'd']);
        }
    });

    it('(d) → (c) → (b) → (a) の順序だけを正解にする', async () => {
        render(<PracticeQuestions />);
        await selectOrder(['d', 'c', 'b', 'a']);
        expect(feedback(1)).toHaveTextContent(/^正解です/);
        for (const position of [1, 2, 3, 4]) {
            expect(slot(position).closest('label')).toHaveAttribute('data-state', 'correct');
        }
    });

    it.each([
        ['末尾の 2 つを入れ替えた順序', ['d', 'c', 'a', 'b'], ['correct', 'correct', 'incorrect', 'incorrect']],
        ['先頭だけ正しい順序', ['d', 'a', 'c', 'b'], ['correct', 'incorrect', 'incorrect', 'incorrect']],
        ['逆順', ['a', 'b', 'c', 'd'], ['incorrect', 'incorrect', 'incorrect', 'incorrect']],
    ] as const)('%s は不正解で、順番ごとの正誤を示す', async (_name, order, states) => {
        render(<PracticeQuestions />);
        await selectOrder(order);
        expect(feedback(1)).toHaveTextContent(/^不正解です/);
        states.forEach((state, index) => {
            expect(slot(index + 1).closest('label')).toHaveAttribute('data-state', state);
        });
    });

    it('すべて選ぶまでは判定しない', async () => {
        render(<PracticeQuestions />);
        await selectOrder(['d', 'c', 'b']);
        expect(feedback(1)).toHaveTextContent(/^$/);
        expect(slot(1).closest('label')).not.toHaveAttribute('data-state');
    });

    it('同じ操作を重複して選ぶと判定せず案内する', async () => {
        render(<PracticeQuestions />);
        await selectOrder(['d', 'd', 'b', 'a']);
        expect(feedback(1)).toHaveTextContent('同じ操作は 1 回だけ選んでください');
        expect(feedback(1)).not.toHaveTextContent('正解');
        expect(slot(1).closest('label')).not.toHaveAttribute('data-state');
    });

    it('順序を修正すると判定が追従する', async () => {
        const user = userEvent.setup();
        render(<PracticeQuestions />);
        await selectOrder(['d', 'c', 'a', 'b']);
        await user.selectOptions(slot(3), 'b');
        await user.selectOptions(slot(4), 'a');
        expect(feedback(1)).toHaveTextContent(/^正解です/);
    });

    it('案内文が選択による採点を説明する', () => {
        render(<PracticeQuestions />);
        expect(screen.getByText(/選択すると正誤を表示します/)).toBeInTheDocument();
    });
});
