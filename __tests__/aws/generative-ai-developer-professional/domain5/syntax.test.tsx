import {render} from '@testing-library/react';
import {expect,it,vi} from 'vitest';
import {readFileSync} from 'node:fs';
import postcss from 'postcss';
import Page from '@/app/aws/generative-ai-developer-professional/domain5/page';
import fixture from '@/docs/migration-inventory/aws-aip-c01-domain5-guide.syntax.json';
vi.mock('@/components/MermaidDiagram',async()=>({MermaidDiagram:(await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock}));
it('retains every source-highlighted token class and exact token text in both code blocks',()=>{
 const {container}=render(<Page/>);
 expect([...container.querySelectorAll('.code-block')].map(block=>[...block.querySelectorAll('span')].map(span=>({class:span.className,text:span.textContent})))).toEqual(fixture.tokens);
});
it('retains the original github-dark syntax palette in scoped local CSS',()=>{
 const rules=new Map<string,Record<string,string>>();
 postcss.parse(readFileSync('app/aws/generative-ai-developer-professional/domain5/page.css','utf8')).walkRules(rule=>{const values:Record<string,string>={};rule.walkDecls(d=>{values[d.prop]=d.value;});rules.set(rule.selector,values);});
 postcss.parse(fixture.css).walkRules(rule=>{
  const selector=rule.selector.split(',').map(s=>'.aip-domain5-page .code-block '+s.trim()).join(', ');
  const actual=rules.get(selector);expect(actual,selector).toBeDefined();rule.walkDecls(d=>expect(actual?.[d.prop],selector+' '+d.prop).toBe(d.value));
 });
});
