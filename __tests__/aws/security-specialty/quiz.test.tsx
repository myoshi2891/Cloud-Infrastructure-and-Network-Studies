import { fireEvent, render, within } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import Revision from '@/app/aws/security-specialty/sections/Revision';
import { QuizProvider } from '@/app/aws/security-specialty/Quiz';
vi.mock('@/components/MermaidDiagram', async () => ({ MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock }));
const setup = () => render(<QuizProvider><Revision /></QuizProvider>);
const answers = ['B', 'B', 'B', 'B', 'A,B', 'C', 'B', 'B'];
it('preserves all 8 answer sets, 33 option labels, question modes and initial summary', () => {
 const { container } = setup();
 expect([...container.querySelectorAll('.q-card')].map(card => card.getAttribute('data-answer'))).toEqual(answers);
 expect([...container.querySelectorAll('.q-card')].map(card => card.getAttribute('data-multi'))).toEqual(['1','1','1','1','2','1','1','1']);
 expect(container.querySelectorAll('[role="radio"]')).toHaveLength(28);
 expect(container.querySelectorAll('[role="checkbox"]')).toHaveLength(5);
 expect(container.querySelectorAll('[aria-checked="true"],details[open]')).toHaveLength(0);
 expect(container.querySelector('#quizAnsweredCount')).toHaveTextContent('回答済み 0 / 8 問');
});
it('grades every answer, opens explanations, updates the aggregate score and fully resets', () => {
 const { container } = setup();
 [...container.querySelectorAll('.q-card')].forEach((card, i) => {
  for (const opt of answers[i]!.split(',')) fireEvent.click(card.querySelector(`[data-opt="${opt}"]`)!);
  expect(card).toHaveClass('is-graded-correct'); expect(card.querySelector('details')).toHaveAttribute('open');
 });
 expect(container.querySelector('#quizAnsweredCount')).toHaveTextContent('回答済み 8 / 8 問');
 expect(container.querySelector('#quizCorrectCount')).toHaveTextContent('正解 8 / 8 問');
 expect(container.querySelector('#quizProgressBar')).toHaveStyle({ width: '100%' });
 fireEvent.click(within(container).getByRole('button', { name: '選択をリセット' }));
 expect(container.querySelectorAll('.is-selected,.is-correct,.is-wrong,.is-graded-correct,.is-graded-wrong,details[open]')).toHaveLength(0);
 expect(container.querySelector('#quizCorrectCount')).toHaveTextContent('正解 0 / 8 問');
 expect(container.querySelector('#quizProgressBar')).toHaveStyle({ width: '0%' });
});
it('supports keyboard selection, deselection, wrong answers and manual explanation toggling', () => {
 const { container } = setup(); const card = container.querySelector('.q-card')!;
 const wrong=card.querySelector('[data-opt="A"]')!, correct=card.querySelector('[data-opt="B"]')!;
 fireEvent.keyDown(wrong,{key:'Enter'}); expect(wrong).toHaveAttribute('aria-checked','true'); expect(card).toHaveClass('is-graded-wrong');
 fireEvent.keyDown(correct,{key:' '}); expect(wrong).toHaveAttribute('aria-checked','false');expect(card).toHaveClass('is-graded-correct');
 fireEvent.click(card.querySelector('summary')!);expect(card.querySelector('details')).not.toHaveAttribute('open');
 fireEvent.click(correct);expect(card.querySelectorAll('[aria-checked="true"]')).toHaveLength(0);expect(card).not.toHaveClass('is-graded-correct');
});
it('waits for two multi-select choices and enforces the source limit and replacement order', () => {
 const { container } = setup(); const card = container.querySelectorAll('.q-card')[4]!;
 const pick=(opt:string)=>fireEvent.click(card.querySelector(`[data-opt="${opt}"]`)!);
 pick('B'); expect(card).not.toHaveClass('is-graded-wrong');expect(card.querySelector('details')).not.toHaveAttribute('open');
 pick('C');expect(card).toHaveClass('is-graded-wrong');
 pick('A');expect([...card.querySelectorAll('[aria-checked="true"]')].map(el=>el.getAttribute('data-opt'))).toEqual(['A','C']);
 pick('C');expect(card.querySelector('[data-opt="C"]')).toHaveAttribute('aria-checked','false');
 pick('B');expect(card).toHaveClass('is-graded-correct');
});
