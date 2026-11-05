// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ExamPrep from '@/app/aws/security-specialty/domain3/sections/ExamPrep';
import fixture from '@/docs/migration-inventory/aws-scs-c03-domain3-guide.fidelity.json';

describe('ExamPrep Section (9. 理解度チェック 演習問題10問)', () => {
    const part = fixture.guideParts.examprep;

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

