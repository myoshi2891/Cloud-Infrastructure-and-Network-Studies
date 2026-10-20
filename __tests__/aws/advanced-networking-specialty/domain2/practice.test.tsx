import {render,fireEvent} from '@testing-library/react';
import {expect,it,vi} from 'vitest';
import Revision from '@/app/aws/advanced-networking-specialty/domain2/sections/Revision';
import {ansDomain2Part} from '@/__tests__/helpers/ans-domain2-fixture';
vi.mock('@/components/MermaidDiagram',async()=>({MermaidDiagram:(await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock}));
it('retains eight independently expandable answer explanations and all question options',()=>{
 const {container}=render(<Revision/>);const details=container.querySelectorAll<HTMLDetailsElement>('details.qa');
 expect(details).toHaveLength(8);
 const expected=ansDomain2Part('revision');
 expect([...container.querySelectorAll('li')]).toHaveLength(expected.lists.reduce((n,list)=>n+list.items.length,0));
 for(const panel of details){
  expect(panel.open).toBe(false);expect(panel.querySelector('summary')).toHaveTextContent('解答と解説');
  expect(panel.querySelector('.qa-body p')?.textContent?.trim()).toBeTruthy();
  fireEvent.click(panel.querySelector('summary')!);expect(panel.open).toBe(true);
  fireEvent.click(panel.querySelector('summary')!);expect(panel.open).toBe(false);
 }
});
