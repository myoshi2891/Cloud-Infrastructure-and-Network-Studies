import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Page from '@/app/aws/generative-ai-developer-professional/domain5/page';
import fixture from '@/docs/migration-inventory/aws-aip-c01-domain5-guide.fidelity.json';
import quiz from '@/docs/migration-inventory/aws-aip-c01-domain5-guide.quiz.json';
import { normalizeSpaces } from '@/__tests__/helpers/migration-test-utils';
import { snapshotGuideChecks } from '@/scripts/guide-interaction-extraction.mjs';
vi.mock('@/components/MermaidDiagram',async()=>({MermaidDiagram:(await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock}));
const cards = (root: HTMLElement) => [...root.querySelectorAll<HTMLElement>('.q-card')];
const choose = (card: HTMLElement, letters: string) => { for (const letter of letters) fireEvent.click(card.querySelector(`[data-letter="${letter}"]`)!); };
const submit = (card: HTMLElement) => fireEvent.click(card.querySelector('.q-submit')!);
describe('Domain 5 original learning interactions', () => {
 it('retains independent source answer keys, all question text, options and explanations',()=>{
  const {container}=render(<Page/>);
  expect(cards(container).map(card=>({id:card.id,answer:card.dataset.answer,
   stem:normalizeSpaces(card.querySelector('.q-text')?.textContent??''),hint:normalizeSpaces(card.querySelector('.q-hint')?.textContent??''),
   options:[...card.querySelectorAll<HTMLElement>('.q-opt')].map(button=>({letter:button.dataset.letter,text:normalizeSpaces(button.textContent??'')})),
   explanation:normalizeSpaces(card.querySelector('.q-expl-body')?.textContent??'')}))).toEqual(quiz);
 });
 it('retains every original checkbox and independent live completion count',()=>{
  const {container}=render(<Page/>);
  expect(snapshotGuideChecks(container)).toEqual(fixture.guideInteractions.checks);
  const groups=[...container.querySelectorAll('.checklist-card')];expect(groups).toHaveLength(2);
  groups.forEach(group=>{
   const boxes=[...group.querySelectorAll<HTMLInputElement>('input')];
   for(const [i,box] of boxes.entries()){fireEvent.click(box);expect(group.querySelector('.count')).toHaveTextContent(`${i+1} / ${boxes.length} 完了`);}
   for(const box of boxes)fireEvent.click(box);
   expect(group.querySelector('.count')).toHaveTextContent(`0 / ${boxes.length} 完了`);
  });
 });
 it('requires submission for all five questions and restores every state on reset',()=>{
  const {container}=render(<Page/>);expect(cards(container)).toHaveLength(5);
  for(const card of cards(container)){
   expect(card.querySelector('.q-explain')).toHaveAttribute('hidden');submit(card);
   expect(card.querySelector('.q-explain')).toHaveAttribute('hidden');
   choose(card,card.dataset.answer!);expect(card.querySelector('.q-explain')).toHaveAttribute('hidden');submit(card);
   expect(card.querySelector('.q-explain')).not.toHaveAttribute('hidden');expect(card.querySelector('.verdict')).toHaveTextContent('正解です');
   const opts=[...card.querySelectorAll<HTMLButtonElement>('.q-opt')];expect(opts.every(opt=>opt.disabled)).toBe(true);
   expect(card.querySelector('.q-submit')).toBeDisabled();submit(card);
  }
  expect(container.querySelector('#qCorrect')).toHaveTextContent('5');expect(container.querySelector('#qDone')).toHaveTextContent('5');expect(container.querySelector('#qBar')).toHaveStyle({width:'100%'});
  fireEvent.click(container.querySelector('#qReset')!);
  expect(container.querySelector('#qCorrect')).toHaveTextContent('0');expect(container.querySelector('#qDone')).toHaveTextContent('0');expect(container.querySelector('#qBar')).toHaveStyle({width:'0%'});
  expect(container.querySelectorAll('.selected,.correct,.wrong,.q-explain.ok,.q-explain.ng')).toHaveLength(0);
  expect(container.querySelectorAll('.q-explain[hidden]')).toHaveLength(5);
  expect(container.querySelectorAll('.q-opt:disabled,.q-submit:disabled')).toHaveLength(0);
 });
 it('rejects an incorrect answer on every question and permits retry only after reset',()=>{
  const {container}=render(<Page/>);
  for(const card of cards(container)){
   const wrong=[...card.querySelectorAll<HTMLElement>('.q-opt')].find(opt=>!card.dataset.answer!.includes(opt.dataset.letter!))!;
   fireEvent.click(wrong);submit(card);expect(card.querySelector('.q-explain')).toHaveClass('ng');expect(wrong).toHaveClass('wrong');
   expect([...card.querySelectorAll<HTMLElement>('.correct')].map(opt=>opt.dataset.letter).join('')).toBe(card.dataset.answer);
  }
  expect(container.querySelector('#qCorrect')).toHaveTextContent('0');expect(container.querySelector('#qDone')).toHaveTextContent('5');
 });
 it('rejects incomplete and extra multi selections and replaces single selections',()=>{
  const {container}=render(<Page/>);const multi=cards(container).filter(card=>card.dataset.answer!.length>1);expect(multi).toHaveLength(1);
  const card=multi[0]!;choose(card,card.dataset.answer![0]!);submit(card);expect(card.querySelector('.q-explain')).toHaveClass('ng');
  fireEvent.click(container.querySelector('#qReset')!);choose(card,card.dataset.answer!);const extra=[...card.querySelectorAll<HTMLElement>('.q-opt')].find(opt=>!card.dataset.answer!.includes(opt.dataset.letter!))!;fireEvent.click(extra);submit(card);expect(card.querySelector('.q-explain')).toHaveClass('ng');
  fireEvent.click(container.querySelector('#qReset')!);choose(card,card.dataset.answer!);fireEvent.click(card.querySelector(`[data-letter="${card.dataset.answer![0]}"]`)!);expect(card.querySelectorAll('.selected')).toHaveLength(1);
  const single=cards(container)[0]!;choose(single,'AB');expect([...single.querySelectorAll<HTMLElement>('.selected')].map(opt=>opt.dataset.letter)).toEqual(['B']);
 });
});
