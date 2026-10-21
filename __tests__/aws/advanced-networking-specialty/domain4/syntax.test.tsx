import {render} from '@testing-library/react';
import {expect,it,vi} from 'vitest';
import Page from '@/app/aws/advanced-networking-specialty/domain4/page';
import syntaxTokens from '@/docs/migration-inventory/aws-ans-c01-domain4-guide.syntax.json';
import {snapshotTokens} from '@/scripts/archive-fidelity-extraction.mjs';
vi.mock('@/components/MermaidDiagram',async()=>({MermaidDiagram:(await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock}));
it('retains highlighted text for every source token class, with code whitespace checked separately line by line',()=>{
 const {container}=render(<Page/>);
 const selectors=Object.fromEntries(Object.keys(syntaxTokens).map(key=>[key,'.code-block span.'+key]));
 const actual=snapshotTokens(container,selectors);
 for(const [key,tokens] of Object.entries(syntaxTokens)){
  expect(actual[key]?.join('').replace(/\s/g,''),key).toBe(tokens.join('').replace(/\s/g,''));
 }
});
