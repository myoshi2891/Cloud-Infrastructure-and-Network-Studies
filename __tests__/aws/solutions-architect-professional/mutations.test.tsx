import {render} from '@testing-library/react';
import {expect,it,vi} from 'vitest';
import Page from '@/app/aws/solutions-architect-professional/page';
import {snapshotGuidePart} from '@/scripts/guide-fidelity-extraction.mjs';
import {sapGuidePart} from '@/__tests__/helpers/sap-guide-fixture';
vi.mock('@/components/MermaidDiagram',async()=>({MermaidDiagram:(await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock}));
it.each([
 ['foundation','p','text'],['domain1','tbody tr','tables'],['foundation','li','lists'],
 ['revision','a[href^="http"]','links'],['domain2','.mermaid-wrap','diagrams'],
 ['revision','.q-opt','text'],['domain4','.callout-practice .body','text'],
] as const)('detects source loss from %s %s', (part,selector,key)=>{
 const {container}=render(<Page/>);const original=container.querySelector(`[data-part="${part}"]`)!;
 const expected=sapGuidePart(part);
 expect(snapshotGuidePart(original)[key]).toEqual(expected[key]);
 const clone=original.cloneNode(true) as HTMLElement;const target=clone.querySelector(selector);expect(target).not.toBeNull();target!.remove();
 expect(snapshotGuidePart(clone)[key]).not.toEqual(expected[key]);
});
