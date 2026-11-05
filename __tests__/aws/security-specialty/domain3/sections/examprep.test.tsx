// @vitest-environment jsdom
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import ExamPrep from '@/app/aws/security-specialty/domain3/sections/ExamPrep';
import fixture from '@/docs/migration-inventory/aws-scs-c03-domain3-guide.fidelity.json';

describe('ExamPrep Section (9. 理解度チェック 演習問題10問)', () => {
    const part = fixture.guideParts.examprep;

    it('grades every option against the original explanation and allows choosing again', async () => {
        const user = userEvent.setup();
        const { container } = render(<ExamPrep />);
        const cards = container.querySelectorAll('.practice-card');

        for (const card of cards) {
            const answer = card.querySelector('details p strong')!.textContent;
            const options = card.querySelectorAll('button');
            const status = card.querySelector('[role="status"]')!;
            expect(options).toHaveLength(4);
            expect(status).toBeEmptyDOMElement();
            for (const option of options) {
                await user.click(option);
                const correct = option.textContent!.trim().startsWith(`${answer}.`);
                expect(status).toHaveTextContent(correct ? '正解です。' : `不正解です。正解は ${answer} です。`);
                expect(option).toHaveAttribute('aria-pressed', 'true');
                expect(option).toHaveAttribute('data-result', correct ? 'correct' : 'incorrect');
                expect(card.querySelectorAll('[aria-pressed="true"]')).toHaveLength(1);
            }
        }
    });

    it('supports keyboard selection and keeps questions independent', async () => {
        const user = userEvent.setup();
        const { container } = render(<ExamPrep />);
        const cards = container.querySelectorAll('.practice-card');
        const options = cards[0].querySelectorAll('button');
        options[0].focus();
        await user.keyboard('{Enter}');
        expect(cards[0].querySelector('[role="status"]')).toHaveTextContent('不正解です。');
        await user.tab();
        await user.keyboard(' ');
        expect(options[1]).toHaveAttribute('aria-pressed', 'true');
        expect(cards[0].querySelector('[role="status"]')).toHaveTextContent('正解です。');
        expect(cards[1].querySelector('[role="status"]')).toBeEmptyDOMElement();
    });

    it('renders heading matching fixture', () => {
        const { container } = render(<ExamPrep />);
        const h2 = container.querySelector('h2');
        expect(h2?.id).toBe('9-理解度チェック演習問題');
        expect(h2?.textContent?.trim()).toBe('9. 理解度チェック(演習問題)');
    });

    it('renders exactly 10 question answer details accordions', () => {
        const { container } = render(<ExamPrep />);
        const details = container.querySelectorAll('details.answer');
        expect(details).toHaveLength(10);
        details.forEach((d) => {
            const summary = d.querySelector('summary');
            expect(summary?.textContent?.trim()).toBe('答えと解説');
            expect(d.querySelector('p')).not.toBeNull();
        });
    });

    it('retains body content matching fixture text for all questions and answers', () => {
        const { container } = render(<ExamPrep />);
        const renderedText = container.textContent?.replace(/\s+/g, ' ').trim() ?? '';
        for (let q = 1; q <= 10; q++) {
            expect(renderedText).toContain(`Q${q}.`);
        }
        const expectedWords = part.text.replace(/\s+/g, ' ').trim().split(' ');
        for (const word of expectedWords.slice(0, 50)) {
            expect(renderedText).toContain(word);
        }
    });
});
