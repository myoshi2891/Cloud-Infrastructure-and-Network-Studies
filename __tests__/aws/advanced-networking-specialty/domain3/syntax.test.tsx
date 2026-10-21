import {render} from '@testing-library/react';
import {expect,it,vi} from 'vitest';
import Page from '@/app/aws/advanced-networking-specialty/domain3/page';
import fixture from '@/docs/migration-inventory/aws-ans-c01-domain3-guide.fidelity.json';
import {snapshotTokens} from '@/scripts/archive-fidelity-extraction.mjs';
vi.mock('@/components/MermaidDiagram',async()=>({MermaidDiagram:(await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock}));
it('retains highlighted text for every source token class, with code whitespace checked separately line by line',()=>{
 const {container}=render(<Page/>);
 const selectors=Object.fromEntries(Object.keys(fixture.syntaxTokens).map(key=>[key,'.code-block span.'+key]));
 const actual=snapshotTokens(container,selectors);
 for(const [key,tokens] of Object.entries(fixture.syntaxTokens)){
  expect(actual[key]?.join('').replace(/\s/g,''),key).toBe(tokens.join('').replace(/\s/g,''));
 }
});
