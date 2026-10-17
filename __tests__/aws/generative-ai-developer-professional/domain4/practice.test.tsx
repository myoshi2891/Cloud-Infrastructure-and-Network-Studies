import { render, fireEvent, within } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import Guide from '@/app/aws/generative-ai-developer-professional/domain4/AipDomain4Guide';
import quiz from '@/docs/migration-inventory/aws-aip-c01-domain4-guide.quiz.json';
import { normalizeSpaces } from '@/__tests__/helpers/migration-test-utils';
vi.mock('@/components/MermaidDiagram',async()=>({MermaidDiagram:(await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock}));
const cardFor=(container:HTMLElement,id:string)=>{const card=container.querySelector<HTMLElement>(`#${id}`);expect(card).not.toBeNull();if(!card)throw Error(`Missing ${id}`);return card;};
it('keeps all 12 source questions, options, answer keys, explanations and hidden initial state',()=>{
 const {container}=render(<Guide/>);expect(container.querySelectorAll('.q-card')).toHaveLength(quiz.length);
 for(const source of quiz){const card=cardFor(container,source.id);
 expect(normalizeSpaces(card.querySelector('.q-stem')?.textContent??'')).toBe(source.stem);
 expect(card.dataset.answer).toBe(source.answer.join(','));expect(card.dataset.multi).toBe(String(source.multi));
 expect([...card.querySelectorAll('.q-opt')].map(b=>({key:b.getAttribute('data-key'),text:normalizeSpaces(b.textContent??'')}))).toEqual(source.options);
 expect(normalizeSpaces(card.querySelector('.q-explain')?.textContent??'')).toBe(source.explanation);
 expect(card.querySelector('.q-explain')).toHaveAttribute('hidden');
 if(source.multi)expect(card.querySelector('.q-check')).toBeDisabled();
 }
});
it.each(quiz)('$id grades the complete correct answer, locks options, reveals exact verdict and updates score',source=>{
 const {container}=render(<Guide/>);const card=cardFor(container,source.id);
 for(const key of source.answer)fireEvent.click(card.querySelector(`[data-key="${key}"]`)!);
 if(source.multi){expect(card.querySelector('.q-explain')).toHaveAttribute('hidden');fireEvent.click(card.querySelector('.q-check')!);}
 expect(card.querySelector('.q-explain')).not.toHaveAttribute('hidden');expect(card.querySelector('.q-explain')).toHaveClass('ok');
 expect(card.querySelector('.verdict')).toHaveTextContent('正解です。 '+source.answerText);
 for(const button of card.querySelectorAll('.q-opt')){expect(button).toBeDisabled();expect(button.classList.contains('correct')).toBe(source.answer.includes(button.getAttribute('data-key')!));}
 expect(container.querySelector('.score span')).toHaveTextContent('1');
 expect(parseFloat(container.querySelector<HTMLElement>('.fill')!.style.width)).toBeCloseTo(100/quiz.length,10);
});
it('rejects wrong single answers, incomplete multi answers and extra selections, and supports deselection',()=>{
 const {container}=render(<Guide/>);
 const single=quiz.find(q=>!q.multi)!;const multi=quiz.filter(q=>q.multi);expect(multi).toHaveLength(1);
 const card=cardFor(container,single.id);const wrong=single.options.find(o=>!single.answer.includes(o.key))!;
 fireEvent.click(card.querySelector(`[data-key="${wrong.key}"]`)!);expect(card.querySelector('.q-explain')).toHaveClass('ng');expect(card.querySelector(`[data-key="${wrong.key}"]`)).toHaveClass('wrong');
 const incomplete=cardFor(container,multi[0]!.id);const key=multi[0]!.answer[0]!;const option=incomplete.querySelector(`[data-key="${key}"]`)!;
 fireEvent.click(option);expect(option).toHaveAttribute('aria-pressed','true');fireEvent.click(option);expect(option).toHaveAttribute('aria-pressed','false');expect(incomplete.querySelector('.q-check')).toBeDisabled();
 fireEvent.click(option);fireEvent.click(incomplete.querySelector('.q-check')!);expect(incomplete.querySelector('.q-explain')).toHaveClass('ng');
 fireEvent.click(within(container).getByRole('button',{name:'やり直す'}));
 const extra=cardFor(container,multi[0]!.id);for(const b of extra.querySelectorAll('.q-opt'))fireEvent.click(b);fireEvent.click(extra.querySelector('.q-check')!);expect(extra.querySelector('.q-explain')).toHaveClass('ng');
 expect(container.querySelector('.score span')).toHaveTextContent('0');
});
it('scores all 12 questions once and resets score, progress, selections, explanations and disabled states',()=>{
 const {container}=render(<Guide/>);
 for(const source of quiz){const card=cardFor(container,source.id);for(const key of source.answer)fireEvent.click(card.querySelector(`[data-key="${key}"]`)!);if(source.multi)fireEvent.click(card.querySelector('.q-check')!);}
 expect(container.querySelector('.score')).toHaveTextContent('正解数 12 / 12');expect(container.querySelector('.fill')).toHaveStyle({width:'100%'});
 fireEvent.click(within(container).getByRole('button',{name:'やり直す'}));
 expect(container.querySelector('.score')).toHaveTextContent('正解数 0 / 12');expect(container.querySelector('.fill')).toHaveStyle({width:'0%'});
 expect(container.querySelectorAll('.selected,.correct,.wrong')).toHaveLength(0);
 container.querySelectorAll('.q-explain').forEach(el=>expect(el).toHaveAttribute('hidden'));
 container.querySelectorAll('.q-opt').forEach(el=>expect(el).not.toBeDisabled());
 container.querySelectorAll('.q-check').forEach(el=>expect(el).toBeDisabled());
});
