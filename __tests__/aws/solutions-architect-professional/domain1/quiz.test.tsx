import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Quiz from '@/app/aws/solutions-architect-professional/domain1/Quiz';

describe('AWS SAP-C02 Domain 1 — Quiz コンポーネントの対話動作', () => {
    it('全6問のカードとリセットボタンが正しく初期描画される', () => {
        const { container } = render(<Quiz />);
        const cards = container.querySelectorAll('.quiz-card');
        expect(cards).toHaveLength(6);

        expect(container.querySelector('#quizStat')?.textContent).toBe('回答 0 / 6 ・ 正解 0');

        const resetBtn = container.querySelector('#quizReset');
        expect(resetBtn).not.toBeNull();
    });

    it('選択肢をクリックすると正誤判定が行われ、解説が開き、スコアが更新される', () => {
        const { container } = render(<Quiz />);
        const firstCard = container.querySelector('.quiz-card')!;

        // 正解の選択肢をクリック (Q1の正解は index 1: B)
        const opts = firstCard.querySelectorAll('.quiz-opt');
        expect(opts.length).toBeGreaterThan(0);

        fireEvent.click(opts[1]!); // 正解 B
        expect(opts[1]).toHaveClass('correct');
        expect(firstCard).toHaveClass('answered');

        const details = firstCard.querySelector('details');
        expect(details).toHaveAttribute('open');

        expect(container.querySelector('#quizStat')?.textContent).toBe('回答 1 / 6 ・ 正解 1');
    });

    it('不正解の選択肢をクリックすると incorrect クラスが付与され、正解もハイライトされる', () => {
        const { container } = render(<Quiz />);
        const firstCard = container.querySelector('.quiz-card')!;
        const opts = firstCard.querySelectorAll('.quiz-opt');

        fireEvent.click(opts[0]!); // 不正解 A
        expect(opts[0]).toHaveClass('incorrect');
        expect(opts[1]).toHaveClass('correct'); // 正解 B もハイライト
        expect(firstCard).toHaveClass('answered');

        expect(container.querySelector('#quizStat')?.textContent).toBe('回答 1 / 6 ・ 正解 0');
    });

    it('「やり直す」ボタンをクリックするとすべての回答とスコアがリセットされる', () => {
        const { container } = render(<Quiz />);
        const firstCard = container.querySelector('.quiz-card')!;
        const opts = firstCard.querySelectorAll('.quiz-opt');

        fireEvent.click(opts[1]!); // 正解 B
        expect(container.querySelector('#quizStat')?.textContent).toBe('回答 1 / 6 ・ 正解 1');

        const resetBtn = container.querySelector('#quizReset')!;
        fireEvent.click(resetBtn);

        expect(container.querySelector('#quizStat')?.textContent).toBe('回答 0 / 6 ・ 正解 0');
        expect(firstCard).not.toHaveClass('answered');
        expect(firstCard.querySelectorAll('.quiz-opt.correct')).toHaveLength(0);
        expect(firstCard.querySelectorAll('.quiz-opt.incorrect')).toHaveLength(0);
        expect(firstCard.querySelector('details')).not.toHaveAttribute('open');
    });
});
