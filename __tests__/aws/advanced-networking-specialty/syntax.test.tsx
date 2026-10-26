import { render } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import Page from '@/app/aws/advanced-networking-specialty/page';
import fixture from '@/docs/migration-inventory/aws-ans-c01-guide.fidelity.json';
import { snapshotTokens } from '@/scripts/archive-fidelity-extraction.mjs';
import { ANS_GUIDE_SYNTAX_CORRECTIONS, withSyntaxCorrections } from '@/__tests__/helpers/aws-guide-source-corrections';
vi.mock('@/components/MermaidDiagram',async()=>({MermaidDiagram:(await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock}));
it('retains the exact text and order of all source syntax highlight tokens', () => {
 const {container}=render(<Page/>);
 const actual=snapshotTokens(container,Object.fromEntries(Object.keys(fixture.syntaxTokens).map(key=>[key,'.code-block span.'+key])));
 // 公式ドキュメントにもとづく訂正だけを適用した原本トークン
 expect(actual).toEqual(withSyntaxCorrections(fixture.syntaxTokens,ANS_GUIDE_SYNTAX_CORRECTIONS));
});
