import {render} from '@testing-library/react';
import {expect,it,vi} from 'vitest';
import Page from '@/app/aws/security-specialty/page';
import {snapshotGuidePart} from '@/scripts/guide-fidelity-extraction.mjs';
import {scsPart} from '@/__tests__/helpers/scs-fixture';
vi.mock('@/components/MermaidDiagram',async()=>({MermaidDiagram:(await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock}));
it.each([
 ['foundation','p','text'],['domain1','tbody tr','tables'],['foundation','li','lists'],
 ['revision','a[href^="http"]','links'],['domain2','.mermaid-wrap','diagrams'],
 ['domain2','.code-line','codes'],['revision','.q-card details p','text'],
] as const)('detects source loss from %s %s', (part,selector,key)=>{
 const {container}=render(<Page/>);const original=container.querySelector(`[data-part="${part}"]`)!;
 const expected=scsPart(part);
 expect(snapshotGuidePart(original)[key]).toEqual(expected[key]);
 const clone=original.cloneNode(true) as HTMLElement;const target=clone.querySelector(selector);expect(target).not.toBeNull();target!.remove();
 expect(snapshotGuidePart(clone)[key]).not.toEqual(expected[key]);
});
