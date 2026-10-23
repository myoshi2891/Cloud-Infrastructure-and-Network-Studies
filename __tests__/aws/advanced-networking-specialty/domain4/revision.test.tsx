import {vi} from 'vitest';
import Guide from '@/app/aws/advanced-networking-specialty/domain4/sections/Revision';
import {ansDomain4Part} from '@/__tests__/helpers/ans-domain4-fixture';
import {defineGuidePartSuite} from '@/__tests__/helpers/guide-fidelity-suite';
vi.mock('@/components/MermaidDiagram',async()=>({MermaidDiagram:(await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock}));
defineGuidePartSuite(Guide,'revision',ansDomain4Part('revision'),true);

import {render,fireEvent} from '@testing-library/react';
import {expect,it} from 'vitest';
import quiz from '@/docs/migration-inventory/aws-ans-c01-domain4-guide.quiz.json';
it('retains all 8 questions, 33 labelled native choices and all disclosure explanations',()=>{
 const {container}=render(<Guide/>);
 const cards=[...container.querySelectorAll('.quiz-card')];expect(cards).toHaveLength(8);
 expect(cards.map(card=>({text:card.textContent?.replace(/\s+/g,' ').trim(),options:[...card.querySelectorAll('input')].map(input=>({type:input.type,name:input.name,value:input.value,label:input.closest('label')?.textContent?.replace(/\s+/g,' ').trim(),checked:input.checked})),answer:card.querySelector('details')?.textContent?.replace(/\s+/g,' ').trim()}))).toEqual(quiz);
 const radios=container.querySelectorAll<HTMLInputElement>('input[name="review-q1"]');fireEvent.click(radios[0]!);fireEvent.click(radios[1]!);expect(radios[0]).not.toBeChecked();expect(radios[1]).toBeChecked();
 const checks=container.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');expect(checks).toHaveLength(5);fireEvent.click(checks[0]!);fireEvent.click(checks[3]!);expect(checks[0]).toBeChecked();expect(checks[3]).toBeChecked();fireEvent.click(checks[0]!);expect(checks[0]).not.toBeChecked();
 expect(container.querySelectorAll('details:not([open])')).toHaveLength(8);
});
