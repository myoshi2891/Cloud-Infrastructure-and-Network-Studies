import {render,fireEvent,within} from '@testing-library/react';
import {describe,it,expect,vi} from 'vitest';
import {renderToString} from 'react-dom/server';
import Guide from '@/app/aws/generative-ai-developer-professional/domain3/AipDomain3Guide';
import rawQuestions from '@/docs/migration-inventory/aws-aip-c01-domain3-guide.quiz.json';
import {AIP_DOMAIN3_CORRECTIONS,withSourceCorrections} from '@/__tests__/helpers/aip-source-corrections';
// 原本fixtureは改変せず、表示の期待値にだけ公式ドキュメントにもとづく訂正を適用する
const questions=withSourceCorrections(rawQuestions,AIP_DOMAIN3_CORRECTIONS);
vi.mock('@/components/MermaidDiagram',async()=>({MermaidDiagram:(await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock}));
describe('Domain 3 all ten interactive quizzes',()=>{
 it('keeps js off server markup so explanations stay visible without JavaScript, and adds it after hydration',()=>{
 const doc=new DOMParser().parseFromString(renderToString(<Guide/>),'text/html');
 expect(doc.querySelectorAll('.quiz')).toHaveLength(10);expect(doc.querySelectorAll('.quiz.js')).toHaveLength(0);
 const {container}=render(<Guide/>);expect(container.querySelectorAll('.quiz.js')).toHaveLength(10);
 });
 it('preserves every question key, answer and full explanation',()=>{
 const {container}=render(<Guide/>);expect(container.querySelectorAll('.quiz')).toHaveLength(10);
 for(const q of questions){const card=container.querySelector('#'+q.id)!;expect(card).not.toBeNull();expect(card).toHaveAttribute('data-answer',q.answer);
 expect([...card.querySelectorAll('.quiz-opt')].map(x=>x.getAttribute('data-key'))).toEqual(q.keys);
 expect(card.querySelector('.quiz-answer')?.textContent?.replace(/\s+/g,' ').trim()).toBe(q.explanation);expect(card).not.toHaveClass('answered');}
 });
 it('scores every correct answer, locks answered questions, and resets all ten',()=>{
 const {container}=render(<Guide/>);
 for(const q of questions){const card=container.querySelector('#'+q.id)!;expect(card).not.toBeNull();fireEvent.click(card.querySelector('[data-key="'+q.answer+'"]')!);expect(card).toHaveAttribute('data-result','ok');expect(card.querySelector('.correct')).toHaveAttribute('data-key',q.answer);
 const wrong=q.keys.find(k=>k!==q.answer)!;fireEvent.click(card.querySelector('[data-key="'+wrong+'"]')!);expect(card).toHaveAttribute('data-result','ok');}
 expect(container.querySelector('.s-done')).toHaveTextContent('10');expect(container.querySelector('.s-ok')).toHaveTextContent('10');
 fireEvent.click(within(container).getByRole('button',{name:'リセット'}));expect(container.querySelectorAll('.answered,.correct,.wrong')).toHaveLength(0);expect(container.querySelector('.s-done')).toHaveTextContent('0');expect(container.querySelector('.s-ok')).toHaveTextContent('0');
 });
 it('marks every wrong choice and reveals answers without credit, including after reset',()=>{
 const {container}=render(<Guide/>);
 for(const q of questions){const card=container.querySelector('#'+q.id)!;expect(card).not.toBeNull();const wrong=q.keys.find(k=>k!==q.answer)!;fireEvent.click(card.querySelector('[data-key="'+wrong+'"]')!);expect(card).toHaveAttribute('data-result','ng');expect(card.querySelector('.wrong')).toHaveAttribute('data-key',wrong);expect(card.querySelector('.correct')).toHaveAttribute('data-key',q.answer);}
 expect(container.querySelector('.s-done')).toHaveTextContent('10');expect(container.querySelector('.s-ok')).toHaveTextContent('0');
 fireEvent.click(within(container).getByRole('button',{name:'リセット'}));
 for(const q of questions){const card=container.querySelector('#'+q.id)!;fireEvent.click(card.querySelector('.quiz-reveal')!);expect(card).toHaveClass('answered');expect(card).toHaveAttribute('data-result','ng');expect(card.querySelectorAll('.wrong')).toHaveLength(0);}
 expect(container.querySelector('.s-done')).toHaveTextContent('10');expect(container.querySelector('.s-ok')).toHaveTextContent('0');
 });
});
