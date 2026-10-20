import {act,fireEvent,render} from '@testing-library/react';
import {expect,it,vi} from 'vitest';
import Page from '@/app/aws/advanced-networking-specialty/domain1/page';
import quiz from '@/docs/migration-inventory/aws-ans-c01-domain1-guide.quiz.json';
import fixture from '@/docs/migration-inventory/aws-ans-c01-domain1-guide.fidelity.json';
import {normalizeSpaces} from '@/__tests__/helpers/migration-test-utils';
import {snapshotGuideChecks} from '@/scripts/guide-interaction-extraction.mjs';
vi.mock('@/components/MermaidDiagram',async()=>({MermaidDiagram:(await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock}));
const cardFor=(container:HTMLElement,id:string)=>container.querySelector<HTMLElement>(`#${id}`)!;
const options=(card:HTMLElement)=>[...card.querySelectorAll<HTMLElement>('.q-options li')];
const choose=(card:HTMLElement,answer:number[])=>answer.forEach(n=>fireEvent.click(options(card)[n-1]!));
const toggle=(card:HTMLElement,open:boolean)=>act(()=>{const details=card.querySelector('details')!;details.open=open;fireEvent(details,new Event('toggle'));});
it('retains all original question attributes, options, hints, explanations and initial collapsed state',()=>{
 const {container}=render(<Page/>);expect(container.querySelectorAll('.q-card')).toHaveLength(quiz.length);
 for(const source of quiz){const card=cardFor(container,source.id);expect(card).not.toBeNull();
  expect(card.dataset.answer).toBe(source.answer.join(','));expect(card.dataset.multi).toBe(String(source.multi));
  expect(normalizeSpaces(card.querySelector('.q-stem')?.textContent??'')).toBe(source.stem);
  expect(card.querySelector('.q-head')).toHaveAttribute('data-badge',source.badge);
  expect(options(card).map(li=>normalizeSpaces(li.textContent??''))).toEqual(source.options);
  expect(normalizeSpaces(card.querySelector('details p')?.textContent??'')).toBe(source.explanation);
  expect(card.querySelector('summary')).toHaveTextContent(source.summary);expect(card.querySelector('details')).not.toHaveAttribute('open');
  for(const option of options(card)){expect(option).toHaveAttribute('role',source.multi?'checkbox':'radio');expect(option).toHaveAttribute('aria-checked','false');expect(option).toHaveAttribute('tabindex','0');}
 }
});
it.each(quiz)('$id grades exact source answer automatically, opens explanations and regrades changes',source=>{
 const {container}=render(<Page/>);const card=cardFor(container,source.id);choose(card,source.answer);
 expect(card).toHaveClass('is-graded-correct');expect(card.querySelector('details')).toHaveAttribute('open');expect(card.querySelector('summary')).toHaveAttribute('data-verdict','correct');
 expect(container.querySelector('#quizAnsweredCount')).toHaveTextContent('回答済み 1 / 6 問');expect(container.querySelector('#quizCorrectCount')).toHaveTextContent('正解 1 / 6 問');
 const wrong=options(card).find((_,index)=>!source.answer.includes(index+1))!;fireEvent.click(wrong);
 expect(card).toHaveClass('is-graded-wrong');expect(wrong).toHaveClass('is-wrong');expect(card.querySelector('summary')).toHaveAttribute('data-verdict','wrong');
 expect(container.querySelector('#quizCorrectCount')).toHaveTextContent('正解 0 / 6 問');
});
it.each(quiz.filter(q=>q.multi))('$id handles incomplete, extra, deselected and manually revealed multi answers',source=>{
 const {container}=render(<Page/>);const card=cardFor(container,source.id);
 choose(card,[source.answer[0]!]);expect(card).toHaveAttribute('data-graded','false');expect(card.querySelector('details')).not.toHaveAttribute('open');
 toggle(card,true);expect(card).toHaveClass('is-graded-wrong');
 choose(card,[source.answer[1]!]);expect(card).toHaveClass('is-graded-correct');
 const extra=options(card).find((_,index)=>!source.answer.includes(index+1))!;fireEvent.click(extra);expect(card).toHaveClass('is-graded-wrong');
 fireEvent.click(extra);expect(card).toHaveClass('is-graded-correct');
 choose(card,source.answer);expect(card).toHaveAttribute('data-graded','false');expect(card.querySelector('summary')).not.toHaveAttribute('data-verdict');
 expect(container.querySelector('#quizAnsweredCount')).toHaveTextContent('回答済み 0 / 6 問');
});
it('supports Enter and Space, exact progress and a complete reset independently of checklist',()=>{
 const {container}=render(<Page/>);
 for(const source of quiz){const card=cardFor(container,source.id);for(const [index,answer] of source.answer.entries())fireEvent.keyDown(options(card)[answer-1]!,{key:index%2?' ':'Enter'});expect(card).toHaveClass('is-graded-correct');}
 expect(container.querySelector('#quizCorrectCount')).toHaveTextContent('正解 6 / 6 問');expect(container.querySelector('#quizProgressFill')).toHaveStyle({width:'100%'});
 const check=container.querySelector<HTMLInputElement>('.checklist-card input')!;fireEvent.click(check);fireEvent.click(container.querySelector('#quizResetBtn')!);
 expect(container.querySelector('#quizCorrectCount')).toHaveTextContent('正解 0 / 6 問');expect(container.querySelector('#quizProgressFill')).toHaveStyle({width:'0%'});
 expect(container.querySelectorAll('.is-selected,.is-correct,.is-wrong,.is-graded-correct,.is-graded-wrong')).toHaveLength(0);
 expect(container.querySelectorAll('.q-card details[open]')).toHaveLength(0);expect(check.checked).toBe(true);
});
it('keeps all ten original check labels, exact progress, all-done decoration and clear',()=>{
 const {container}=render(<Page/>);expect(snapshotGuideChecks(container)).toEqual(fixture.guideInteractions.checks);
 const card=container.querySelector('.checklist-card')!,boxes=[...card.querySelectorAll<HTMLInputElement>('input')];expect(boxes).toHaveLength(10);
 for(const [i,box] of boxes.entries()){fireEvent.click(box);expect(card.querySelector('.count')).toHaveTextContent(`${i+1} / 10 完了`);expect(card.querySelector('.checklist-bar-fill')).toHaveStyle({width:`${(i+1)*10}%`});}
 expect(card).toHaveClass('is-all-done');fireEvent.click(boxes[0]!);expect(card).not.toHaveClass('is-all-done');
 fireEvent.click(card.querySelector('.checklist-reset')!);expect(boxes.every(b=>!b.checked)).toBe(true);expect(card.querySelector('.count')).toHaveTextContent('0 / 10 完了');expect(card.querySelector('.checklist-bar-fill')).toHaveStyle({width:'0%'});
});
