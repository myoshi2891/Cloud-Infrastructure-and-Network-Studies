import { render } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import Page from '@/app/aws/advanced-networking-specialty/page';
import fixture from '@/docs/migration-inventory/aws-ans-c01-guide.fidelity.json';
import { snapshotTokens } from '@/scripts/archive-fidelity-extraction.mjs';
vi.mock('@/components/MermaidDiagram',async()=>({MermaidDiagram:(await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock}));
it('retains the exact text and order of all source syntax highlight tokens', () => {
 const {container}=render(<Page/>);
 const actual=snapshotTokens(container,Object.fromEntries(Object.keys(fixture.syntaxTokens).map(key=>[key,'.code-block span.'+key])));
 expect(actual).toEqual(fixture.syntaxTokens);
});
