// @vitest-environment jsdom
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import ExamPrep from '@/app/aws/security-specialty/domain6/sections/ExamPrep';
import fixture from '@/docs/migration-inventory/aws-scs-c03-domain6-guide.fidelity.json';

describe('ExamPrep Section (Part D: 17. 確認問題(10問) + 解答と解説)', () => {
    const part = fixture.guideParts.examprep;

    it('judges every single-answer question against the existing answer table and permits retrying', async () => {
        const user = userEvent.setup();
        render(<ExamPrep />);
        const questions = screen.getAllByRole('group');
        for (const [index, question] of questions.entries()) {
            if (index === 5) continue;
            const answer = part.tables[0]![index + 1]![1]!.text.trim();
            const correctIndex = answer.charCodeAt(0) - 65;
            const options = within(question).getAllByRole('button');
            await user.click(options[(correctIndex + 1) % 4]!);
            expect(within(question).getByRole('status')).toHaveTextContent('不正解');
            await user.click(options[correctIndex]!);
            expect(within(question).getByRole('status').textContent).toBe('✓ 正解');
            expect(options.filter((option) => option.getAttribute('aria-pressed') === 'true')).toHaveLength(1);
        }
    });

    it('requires both Q6 answers and updates the result when selections are toggled with the keyboard', async () => {
        const user = userEvent.setup();
        render(<ExamPrep />);
        const question = screen.getAllByRole('group')[5]!;
        const options = within(question).getAllByRole('button');
        options[0]!.focus();
        await user.keyboard('{Enter}');
        expect(within(question).getByRole('status')).toHaveTextContent('あと1つ選択してください');
        await user.keyboard('{Tab} ');
        expect(within(question).getByRole('status').textContent).toBe('✓ 正解');
        await user.click(options[2]!);
        expect(within(question).getByRole('status')).toHaveTextContent('不正解');
        await user.click(options[2]!);
        expect(within(question).getByRole('status').textContent).toBe('✓ 正解');
        await user.click(options[0]!);
        expect(within(question).getByRole('status')).toHaveTextContent('あと1つ選択してください');
        await user.click(options[1]!);
        expect(within(question).getByRole('status')).toBeEmptyDOMElement();
    });

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

    it('renders all 10 practice question option lists matching fixture', () => {
        const { container } = render(<ExamPrep />);
        const uls = container.querySelectorAll('ul');
        expect(uls).toHaveLength(10);
        uls.forEach((ul, i) => {
            const expectedOptions = part.lists[i]!.items.map((item) => item.text.replace(/\s+/g, ' '));
            const actualOptions = [...ul.querySelectorAll('li')].map(
                (li) => li.textContent?.trim().replace(/\s+/g, ' ') ?? '',
            );
            expect(actualOptions).toEqual(expectedOptions);
        });
    });

    it('renders the answers and explanations comparison table matching fixture', () => {
        const { container } = render(<ExamPrep />);
        const table = container.querySelector('table');
        expect(table).toBeTruthy();
        if (!table) return;

        const expectedCells = part.tables[0]!.flatMap((row) =>
            row.map((c) => c.text.replace(/\s+/g, ' ')),
        );
        const ths = [...table.querySelectorAll('th')];
        const allCells = [...table.querySelectorAll('th, td')].map(
            (c) => c.textContent?.trim().replace(/\s+/g, ' ') ?? '',
        );
        expect(allCells).toEqual(expectedCells);
        ths.forEach((th) => {
            expect(th).toHaveAttribute('scope', 'col');
        });

        const scroll = container.querySelector('.table-scroll');
        expect(scroll).toHaveAttribute('role', 'region');
        expect(scroll).toHaveAttribute('tabIndex', '0');
        expect(scroll?.getAttribute('aria-label')).toBeTruthy();
    });
});
