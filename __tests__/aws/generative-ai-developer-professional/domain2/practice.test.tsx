import {render,within,waitFor,cleanup} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {expect,it,vi,afterEach} from 'vitest';
import Revision from '@/app/aws/generative-ai-developer-professional/domain2/sections/Revision';
import fixture from '@/docs/migration-inventory/aws-aip-c01-domain2-guide.fidelity.json';
vi.mock('@/components/MermaidDiagram',async()=>({MermaidDiagram:(await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock}));
afterEach(cleanup);
const part=fixture.guideParts.revision;
const questions=part.headings.filter(h=>h.id.startsWith('問題-'));
const correct=part.inline.filter(i=>i.tag==='strong'&&/^[A-D]( と [A-D])?$/.test(i.text)).map(i=>i.text.match(/[A-D]/g)!);
const cardFor=(container:HTMLElement,index:number)=>{const id=questions[index]!.id;const card=container.querySelector('[id="'+id+'"]')?.closest('.practice-question');if(!(card instanceof HTMLElement))throw Error('Missing question');return card;};
it('retains all 15 source answer keys, question group names, 60 labels and closed answers',()=>{
 expect(correct).toHaveLength(15);const{container}=render(<Revision/>);
 questions.forEach((q,index)=>{const card=cardFor(container,index);const ui=within(card);expect(ui.getByRole('group',{name:q.text})).toBeInTheDocument();
 const inputs=ui.getAllByRole(correct[index]!.length>1?'checkbox':'radio');expect(inputs).toHaveLength(4);
 inputs.forEach((input,i)=>{expect(input).toHaveAccessibleName(part.lists[index]!.items[i]!.text);expect(input).not.toBeChecked();});
 expect(ui.queryByRole('status')).toBeNull();expect(card.querySelector('details')).not.toHaveAttribute('open');});
});
it.each(questions.map((q,index)=>({title:q.text,index})))('$title judges an incorrect selection then the exact correct answer',async({index})=>{
 const user=userEvent.setup();const{container}=render(<Revision/>);const card=cardFor(container,index);const ui=within(card);const keys=correct[index]!;const type=keys.length>1?'checkbox':'radio';const inputs=ui.getAllByRole(type);
 const wrong=['A','B','C','D'].find(k=>!keys.includes(k))!;await user.click(inputs[wrong.charCodeAt(0)-65]!);expect(ui.queryByRole('status')).toBeNull();
 await user.click(ui.getByText('答えと解説',{selector:'summary'}));await waitFor(()=>expect(ui.getByRole('status')).toHaveTextContent('不正解です。'));
 expect(ui.getByRole('status')).toHaveTextContent('正解は '+keys.join('・')+' です。');
 if(type==='checkbox')await user.click(inputs[wrong.charCodeAt(0)-65]!);
 for(const key of keys)await user.click(inputs[key.charCodeAt(0)-65]!);
 await waitFor(()=>expect(ui.getByRole('status')).toHaveTextContent('正解です。'));
 for(let i=0;i<4;i++)expect((inputs[i] as HTMLInputElement).checked).toBe(keys.includes(String.fromCharCode(65+i)));
});
it('shows unanswered guidance, retains choices on close, and updates verdict after reopening',async()=>{
 const user=userEvent.setup();const{container}=render(<Revision/>);const ui=within(cardFor(container,0));const summary=ui.getByText('答えと解説',{selector:'summary'});
 await user.click(summary);await waitFor(()=>expect(ui.getByRole('status')).toHaveTextContent('未回答です。'));
 await user.click(ui.getAllByRole('radio')[1]!);expect(ui.getByRole('status')).toHaveTextContent('正解です。');await user.click(summary);await waitFor(()=>expect(ui.queryByRole('status')).toBeNull());
 expect(ui.getAllByRole('radio')[1]).toBeChecked();await user.click(ui.getAllByRole('radio')[0]!);await user.click(summary);await waitFor(()=>expect(ui.getByRole('status')).toHaveTextContent('不正解です。'));
});
it.each([2,7,11,14])('multi-answer question %i rejects partial and extra selections and accepts reversed order',async(index)=>{
 const user=userEvent.setup();const{container}=render(<Revision/>);const ui=within(cardFor(container,index));const inputs=ui.getAllByRole('checkbox');const keys=correct[index]!;
 await user.click(inputs[keys[1]!.charCodeAt(0)-65]!);await user.click(ui.getByText('答えと解説',{selector:'summary'}));await waitFor(()=>expect(ui.getByRole('status')).toHaveTextContent('不正解です。'));
 await user.click(inputs[keys[0]!.charCodeAt(0)-65]!);expect(ui.getByRole('status')).toHaveTextContent('正解です。');const wrong=['A','B','C','D'].find(k=>!keys.includes(k))!;
 await user.click(inputs[wrong.charCodeAt(0)-65]!);expect(ui.getByRole('status')).toHaveTextContent('不正解です。');await user.click(inputs[wrong.charCodeAt(0)-65]!);expect(ui.getByRole('status')).toHaveTextContent('正解です。');
 for(const key of keys)await user.click(inputs[key.charCodeAt(0)-65]!);expect(ui.getByRole('status')).toHaveTextContent('未回答です。');
});
it('keeps selections and answer visibility independent between questions and resets on remount',async()=>{
 const user=userEvent.setup();const{container,unmount}=render(<Revision/>);const first=within(cardFor(container,0)),second=within(cardFor(container,1));await user.click(first.getAllByRole('radio')[1]!);await user.click(first.getByText('答えと解説',{selector:'summary'}));await waitFor(()=>expect(first.getByRole('status')).toHaveTextContent('正解です。'));expect(second.queryByRole('status')).toBeNull();second.getAllByRole('radio').forEach(i=>expect(i).not.toBeChecked());unmount();const next=render(<Revision/>);within(cardFor(next.container,0)).getAllByRole('radio').forEach(i=>expect(i).not.toBeChecked());
});
