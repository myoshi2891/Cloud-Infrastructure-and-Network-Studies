// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ExamPrep from '@/app/aws/security-specialty/domain4/sections/ExamPrep';
import fixture from '@/docs/migration-inventory/aws-scs-c03-domain4-guide.fidelity.json';

describe('ExamPrep Section (13. 練習問題 (確認テスト))', () => {
    const part = fixture.guideParts.examprep;

    it('renders heading matching fixture', () => {
        const { container } = render(<ExamPrep />);
        const h2 = container.querySelector('h2');
        expect(h2?.id).toBe(part.headings[0]?.id);
        expect(h2?.textContent?.trim().replace(/\s+/g, ' ')).toBe(
            part.headings[0]?.text.replace(/\s+/g, ' '),
        );
    });

    it('renders all 8 practice questions with details and summary', () => {
        const { container } = render(<ExamPrep />);
        const details = container.querySelectorAll('details');
        expect(details).toHaveLength(8);
        details.forEach((d) => {
            const summary = d.querySelector('summary');
            expect(summary?.textContent?.trim()).toBe('答えを見る');
            expect(d.textContent?.trim()).toBeTruthy();
        });
        const prompts = container.querySelectorAll('p strong');
        expect(prompts).toHaveLength(8);
        ['Q1.', 'Q2.', 'Q3.', 'Q4.', 'Q5.', 'Q6.', 'Q7.', 'Q8.'].forEach((q, i) => {
            expect(prompts[i]?.textContent?.trim()).toBe(q);
        });
    });
});
