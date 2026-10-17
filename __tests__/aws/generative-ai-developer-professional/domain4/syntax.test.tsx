import { render } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import Page from '@/app/aws/generative-ai-developer-professional/domain4/page';
import fixture from '@/docs/migration-inventory/aws-aip-c01-domain4-guide.fidelity.json';
import { snapshotTokens } from '@/scripts/archive-fidelity-extraction.mjs';
import { FIDELITY_PAGES } from '@/scripts/archive-fidelity-config.mjs';
vi.mock('@/components/MermaidDiagram',async()=>({MermaidDiagram:(await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock}));
it('keeps all source syntax highlight tokens in order for every class, including comments',()=>{
 const {container}=render(<Page/>);expect(snapshotTokens(container,FIDELITY_PAGES['aws-aip-c01-domain4-guide'].syntaxSelectors)).toEqual(fixture.syntaxTokens);
});
