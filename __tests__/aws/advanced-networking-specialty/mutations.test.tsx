import {render} from '@testing-library/react';
import {expect,it,vi} from 'vitest';
import Page from '@/app/aws/advanced-networking-specialty/page';
import {snapshotGuidePart} from '@/scripts/guide-fidelity-extraction.mjs';
import {ansGuidePart} from '@/__tests__/helpers/ans-guide-fixture';
vi.mock('@/components/MermaidDiagram',async()=>({MermaidDiagram:(await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock}));
it.each([
 ['foundation','p','text'],['domain1','tbody tr','tables'],['foundation','li','lists'],
 ['revision','a[href^="http"]','links'],['domain2','.mermaid-wrap','diagrams'],
 ['domain2','.code-line','codes'],['domain4','.callout-practice .body','text'],
] as const)('detects source loss from %s %s', (part,selector,key)=>{
 const {container}=render(<Page/>);const original=container.querySelector(`[data-part="${part}"]`)!;
 const expected=ansGuidePart(part);
 expect(snapshotGuidePart(original)[key]).toEqual(expected[key]);
 const clone=original.cloneNode(true) as HTMLElement;const target=clone.querySelector(selector);expect(target).not.toBeNull();target!.remove();
 expect(snapshotGuidePart(clone)[key]).not.toEqual(expected[key]);
});
