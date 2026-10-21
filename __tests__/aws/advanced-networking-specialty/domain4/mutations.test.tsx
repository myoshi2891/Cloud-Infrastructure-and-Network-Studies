import {render} from '@testing-library/react';
import {expect,it,vi} from 'vitest';
import Page from '@/app/aws/advanced-networking-specialty/domain4/page';
import {snapshotGuidePart} from '@/scripts/guide-fidelity-extraction.mjs';
import {ansDomain4Part} from '@/__tests__/helpers/ans-domain4-fixture';
vi.mock('@/components/MermaidDiagram',async()=>({MermaidDiagram:(await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock}));
it.each([
 ['foundation','p','text'],['task1','tbody tr','tables'],['foundation','li','lists'],
 ['revision','a[href^="http"]','links'],['task2','.mermaid-wrap','diagrams'],
 ['task2','.code-line','codes'],['revision','.quiz-explanation p','text'],
] as const)('detects source loss from %s %s', (part,selector,key)=>{
 const {container}=render(<Page/>);const original=container.querySelector(`[data-part="${part}"]`)!;
 const expected=ansDomain4Part(part);
 expect(snapshotGuidePart(original)[key]).toEqual(expected[key]);
 const clone=original.cloneNode(true) as HTMLElement;const target=clone.querySelector(selector);expect(target).not.toBeNull();target!.remove();
 expect(snapshotGuidePart(clone)[key]).not.toEqual(expected[key]);
});
