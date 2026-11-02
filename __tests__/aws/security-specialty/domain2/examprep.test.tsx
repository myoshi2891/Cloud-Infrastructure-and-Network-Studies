// __tests__/aws/security-specialty/domain2/examprep.test.tsx
// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ExamPrep from '@/app/aws/security-specialty/domain2/sections/ExamPrep';

describe('Exam Preparation Section', () => {
    it('renders exam preparation heading and all subheadings', () => {
        const { container } = render(<ExamPrep />);
        const h2 = container.querySelector('h2');
        expect(h2?.textContent?.trim()).toBe('6. 試験対策');

        const h3Texts = [...container.querySelectorAll('h3')].map((h) => h.textContent?.trim());
        expect(h3Texts).toContain('6.1 「こんなときはこのサービス」早見表');
        expect(h3Texts).toContain('6.2 ひっかけポイント集');
        expect(h3Texts).toContain('6.3 練習問題 (10 問)');
    });

    it('renders all 10 practice questions and answers', () => {
        const { container } = render(<ExamPrep />);
        const text = container.textContent ?? '';
        for (let i = 1; i <= 10; i++) {
            expect(text).toContain(`Q${i}`);
        }
        const answerLists = container.querySelectorAll('ul');
        expect(answerLists.length).toBeGreaterThanOrEqual(10);
    });

    it('renders quick reference and trap tables with thead and scope=col', () => {
        const { container } = render(<ExamPrep />);
        const tables = container.querySelectorAll('table');
        expect(tables.length).toBeGreaterThanOrEqual(2);
        tables.forEach((table) => {
            expect(table.querySelector('thead th[scope="col"]')).not.toBeNull();
        });
    });
});

