import {render} from '@testing-library/react';
import {readFileSync} from 'node:fs';
import postcss from 'postcss';
import {expect,it,vi} from 'vitest';
import Page from '@/app/aws/advanced-networking-specialty/domain1/page';
import fixture from '@/docs/migration-inventory/aws-ans-c01-domain1-guide.fidelity.json';
import {FIDELITY_PAGES} from '@/scripts/archive-fidelity-config.mjs';
import {snapshotTokens} from '@/scripts/archive-fidelity-extraction.mjs';
vi.mock('@/components/MermaidDiagram',async()=>({MermaidDiagram:(await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock}));
it('retains every original highlighted span, including whitespace, bold and italic tokens',()=>{
 const {container}=render(<Page/>);
 const selectors=Object.fromEntries(Object.keys(fixture.syntaxTokens).map(key=>[key,'.code-block .'+key]));
 expect(snapshotTokens(container,selectors)).toEqual(fixture.syntaxTokens);
 const css=postcss.parse(readFileSync('app/aws/advanced-networking-specialty/domain1/page.css','utf8'));
 const config=FIDELITY_PAGES['aws-ans-c01-domain1-guide'];
 if(!config?.syntaxSelectors)throw new Error('Missing source syntax selectors');
 for(const [name,selector] of Object.entries(config.syntaxSelectors)){
  const raw=selector.match(/\[style=(".*")\]$/)?.[1];expect(raw).toBeDefined();
  const expected:Record<string,string>={};postcss.parse('x{'+JSON.parse(raw!)+'}').walkDecls(d=>{expected[d.prop]=d.value;});
  const actual:Record<string,string>={};css.walkRules(rule=>{if(rule.selector==='.ans-domain1-page .'+name)rule.walkDecls(d=>{actual[d.prop]=d.value;});});
  expect(actual,name).toEqual(expected);
 }
});
