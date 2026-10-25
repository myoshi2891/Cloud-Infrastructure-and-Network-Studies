import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

    it('選択肢をクリックすると正誤判定が行われ、解説が開き、スコアが更新される', async () => {
        const user = userEvent.setup();
        const { container } = render(<Quiz />);
        const firstCard = container.querySelector('.quiz-card')!;

        // 正解の選択肢をクリック (Q1の正解は index 1: B)
        const opts = firstCard.querySelectorAll('.quiz-opt');
        expect(opts.length).toBeGreaterThan(0);

        await user.click(opts[1]!); // 正解 B
        expect(opts[1]).toHaveClass('correct');
        expect(firstCard).toHaveClass('answered');

        const details = firstCard.querySelector('details');
        expect(details).toHaveAttribute('open');

        expect(container.querySelector('#quizStat')?.textContent).toBe('回答 1 / 6 ・ 正解 1');
    });

    it('不正解の選択肢をクリックすると incorrect クラスが付与され、正解もハイライトされる', async () => {
        const user = userEvent.setup();
        const { container } = render(<Quiz />);
        const firstCard = container.querySelector('.quiz-card')!;
        const opts = firstCard.querySelectorAll('.quiz-opt');

        await user.click(opts[0]!); // 不正解 A
        expect(opts[0]).toHaveClass('incorrect');
        expect(opts[1]).toHaveClass('correct'); // 正解 B もハイライト
        expect(firstCard).toHaveClass('answered');

        expect(container.querySelector('#quizStat')?.textContent).toBe('回答 1 / 6 ・ 正解 0');
    });

    it('「やり直す」ボタンをクリックするとすべての回答とスコアがリセットされる', async () => {
        const user = userEvent.setup();
        const { container } = render(<Quiz />);
        const firstCard = container.querySelector('.quiz-card')!;
        const opts = firstCard.querySelectorAll('.quiz-opt');

        await user.click(opts[1]!); // 正解 B
        expect(container.querySelector('#quizStat')?.textContent).toBe('回答 1 / 6 ・ 正解 1');

        const resetBtn = container.querySelector('#quizReset')!;
        await user.click(resetBtn);

        expect(container.querySelector('#quizStat')?.textContent).toBe('回答 0 / 6 ・ 正解 0');
        expect(firstCard).not.toHaveClass('answered');
        expect(firstCard.querySelectorAll('.quiz-opt.correct')).toHaveLength(0);
        expect(firstCard.querySelectorAll('.quiz-opt.incorrect')).toHaveLength(0);
        expect(firstCard.querySelector('details')).not.toHaveAttribute('open');
    });

    it('各選択肢が選択状態を aria-pressed、回答後のロックを aria-disabled で公開する', async () => {
        // Arrange
        const user = userEvent.setup();
        const { container } = render(<Quiz />);
        const [firstCard, secondCard] = [...container.querySelectorAll('.quiz-card')];
        const opts = [...firstCard!.querySelectorAll('.quiz-opt')];
        expect(opts.map((opt) => opt.getAttribute('aria-pressed'))).toEqual(['false', 'false', 'false', 'false']);
        expect(opts.map((opt) => opt.getAttribute('aria-disabled'))).toEqual(['false', 'false', 'false', 'false']);

        // Act
        await user.click(opts[0]!);
        await user.click(opts[2]!); // ロック中のため選択は変わらない

        // Assert
        expect(opts.map((opt) => opt.getAttribute('aria-pressed'))).toEqual(['true', 'false', 'false', 'false']);
        expect(opts.map((opt) => opt.getAttribute('aria-disabled'))).toEqual(['true', 'true', 'true', 'true']);
        // 他の問題はロックされない
        expect([...secondCard!.querySelectorAll('.quiz-opt')].map((opt) => opt.getAttribute('aria-disabled'))).toEqual(['false', 'false', 'false', 'false']);

        await user.click(container.querySelector('#quizReset')!);
        expect(opts.map((opt) => opt.getAttribute('aria-pressed'))).toEqual(['false', 'false', 'false', 'false']);
        expect(opts.map((opt) => opt.getAttribute('aria-disabled'))).toEqual(['false', 'false', 'false', 'false']);
    });
    it.each([
        ['Enter', '{Enter}'],
        ['Space', ' '],
    ])('フォーカスした選択肢を %s キーで選択できる', async (_name, key) => {
        // Arrange
        const user = userEvent.setup();
        const { container } = render(<Quiz />);
        const firstCard = container.querySelector('.quiz-card')!;
        const opts = [...firstCard.querySelectorAll<HTMLElement>('.quiz-opt')];

        // Act
        opts[1]!.focus();
        await user.keyboard(key);

        // Assert
        expect(opts[1]).toHaveFocus();
        expect(opts[1]).toHaveClass('correct');
        expect(opts.map((opt) => opt.getAttribute('aria-pressed'))).toEqual(['false', 'true', 'false', 'false']);
        expect(firstCard).toHaveClass('answered');
        expect(firstCard.querySelector('details')).toHaveAttribute('open');
        expect(container.querySelector('#quizStat')?.textContent).toBe('回答 1 / 6 ・ 正解 1');
    });

    it('回答後にロックされた選択肢は Enter と Space の両方を無視し、回答状態が変わらない', async () => {
        // Arrange
        const user = userEvent.setup();
        const { container } = render(<Quiz />);
        const firstCard = container.querySelector('.quiz-card')!;
        const opts = [...firstCard.querySelectorAll<HTMLElement>('.quiz-opt')];
        await user.click(opts[0]!); // 不正解 A で回答しロック
        const answeredClasses = opts.map((opt) => opt.className);

        // Act
        opts[2]!.focus();
        await user.keyboard('{Enter}');
        await user.keyboard(' ');

        // Assert
        expect(opts.map((opt) => opt.className)).toEqual(answeredClasses);
        expect(opts.map((opt) => opt.getAttribute('aria-pressed'))).toEqual(['true', 'false', 'false', 'false']);
        expect(opts.map((opt) => opt.getAttribute('aria-disabled'))).toEqual(['true', 'true', 'true', 'true']);
        expect(container.querySelector('#quizStat')?.textContent).toBe('回答 1 / 6 ・ 正解 0');
    });
});
