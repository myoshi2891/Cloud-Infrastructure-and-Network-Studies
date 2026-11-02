// __tests__/aws/security-specialty/domain2/checklist.test.tsx
// @vitest-environment jsdom
import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ChecklistSection from '@/app/aws/security-specialty/domain2/sections/ChecklistSection';

describe('Checklist and Glossary Section', () => {
    it('renders checklist heading and glossary subheading', () => {
        const { container } = render(<ChecklistSection />);
        const h2 = container.querySelector('h2');
        expect(h2?.textContent?.trim()).toBe('7. 学習チェックリストと用語集');

        const h3Texts = [...container.querySelectorAll('h3')].map((h) => h.textContent?.trim());
        expect(h3Texts).toContain('7.1 学習チェックリスト');
        expect(h3Texts).toContain('7.2 用語集');
    });

    it('renders both checklist cards with total 21 checkboxes', () => {
        const { container } = render(<ChecklistSection />);
        const cards = container.querySelectorAll('.checklist-card');
        expect(cards).toHaveLength(2);

        const boxes = container.querySelectorAll('input[type="checkbox"]');
        expect(boxes).toHaveLength(21);
    });

    it('updates completion counter when checking/unchecking items', () => {
        const { container } = render(<ChecklistSection />);
        const card1 = container.querySelectorAll('.checklist-card')[0]!;
        const count1 = card1.querySelector('.count');
        expect(count1?.textContent).toBe('0 / 11 完了');

        const box1 = card1.querySelectorAll('input[type="checkbox"]')[0]!;
        fireEvent.click(box1);
        expect(count1?.textContent).toBe('1 / 11 完了');

        fireEvent.click(box1);
        expect(count1?.textContent).toBe('0 / 11 完了');
    });

    it('renders glossary table with proper structure', () => {
        const { container } = render(<ChecklistSection />);
        const table = container.querySelector('table');
        expect(table).not.toBeNull();
        expect(table?.querySelector('thead th[scope="col"]')).not.toBeNull();
    });
});
