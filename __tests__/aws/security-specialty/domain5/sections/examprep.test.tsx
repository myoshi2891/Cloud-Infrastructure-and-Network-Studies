// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ExamPrep from '@/app/aws/security-specialty/domain5/sections/ExamPrep';
import fixture from '@/docs/migration-inventory/aws-scs-c03-domain5-guide.fidelity.json';

describe('ExamPrep Section (7. 理解度チェック演習問題)', () => {
    const part = fixture.guideParts.examprep;

    it('renders all headings matching fixture', () => {
        const { container } = render(<ExamPrep />);
        const renderedHeadings = [...container.querySelectorAll('h1, h2, h3, h4')].map((el) => ({
            tag: el.tagName.toLowerCase(),
            id: el.id,
            text: el.textContent?.trim().replace(/\s+/g, ' ') ?? '',
        }));
        expect(renderedHeadings).toHaveLength(part.headings.length);
        part.headings.forEach((h, i) => {
            expect(renderedHeadings[i]!.tag).toBe(h.tag);
            expect(renderedHeadings[i]!.id).toBe(h.id);
            expect(renderedHeadings[i]!.text).toBe(h.text.replace(/\s+/g, ' '));
        });
    });

    it('renders all 8 practice questions with details and summary', () => {
        const { container } = render(<ExamPrep />);
        const details = container.querySelectorAll('details');
        expect(details).toHaveLength(8);
        details.forEach((d) => {
            const summary = d.querySelector('summary');
            expect(summary?.textContent?.trim()).toBe('答えと解説');
            expect(d.textContent?.trim()).toBeTruthy();
        });
        const h3s = [...container.querySelectorAll('h3')];
        expect(h3s).toHaveLength(8);
        ['問題 1', '問題 2', '問題 3', '問題 4', '問題 5', '問題 6', '問題 7', '問題 8'].forEach(
            (label, i) => {
                expect(h3s[i]?.textContent?.trim()).toBe(label);
            },
        );
    });
});
