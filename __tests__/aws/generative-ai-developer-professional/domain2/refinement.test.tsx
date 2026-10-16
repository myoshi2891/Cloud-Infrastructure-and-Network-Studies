import {render} from '@testing-library/react';
import {expect,it,vi} from 'vitest';
import Guide from '@/app/aws/generative-ai-developer-professional/domain2/AipDomain2Guide';
import fixture from '@/docs/migration-inventory/aws-aip-c01-domain2-guide.fidelity.json';
import {codeLines} from '@/scripts/inventory-extraction.mjs';
import {AIP_DOMAIN2_CORRECTIONS,withSourceCorrections} from '@/__tests__/helpers/aip-source-corrections';
vi.mock('@/components/MermaidDiagram',async()=>({MermaidDiagram:(await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock}));
it('isolates every diagram from inherited dark node, actor and state backgrounds',()=>{
 const {container}=render(<Guide/>);const diagrams=container.querySelectorAll('[data-chart]');expect(diagrams).toHaveLength(42);
 diagrams.forEach(d=>{const chart=d.getAttribute('data-chart')!;expect(chart).toMatch(/^---\nconfig: /);const config=JSON.parse(chart.split('\n')[1]!.slice(8));
 for(const key of ['mainBkg','actorBkg','stateBkg','activationBkgColor'])expect(config.themeVariables[key]).toBe('#e8eeff');
 for(const key of ['actorTextColor','stateLabelColor','signalTextColor','labelTextColor','titleColor'])expect(config.themeVariables[key]).toBe('#1c2a40');});
});
it('highlights every source code block while retaining every line and whitespace',()=>{
 const {container}=render(<Guide/>);const blocks=[...container.querySelectorAll('.code-block')];
 expect(blocks).toHaveLength(9);expect(blocks.map(codeLines)).toEqual(Object.values(withSourceCorrections(fixture.guideParts,AIP_DOMAIN2_CORRECTIONS)).flatMap(p=>p.codes));
 for(const block of blocks){expect(block.getAttribute('data-language')).toMatch(/^(python|json|logs-insights)$/);if(block.getAttribute('data-language')!=='logs-insights')expect(block.querySelector('.hljs-string')).not.toBeNull();expect(block.querySelector('.hljs-keyword,.hljs-attr')).not.toBeNull();expect(block).toHaveAttribute('tabindex','0');}
});
it('groups all 15 unchanged questions and answers into labelled practice cards',()=>{
 const {container}=render(<Guide/>);const cards=[...container.querySelectorAll('.practice-question')];expect(cards).toHaveLength(15);
 const source=fixture.guideParts.revision;expect(cards.map(c=>c.querySelector('h3')?.id)).toEqual(source.headings.filter(h=>h.id.startsWith('問題-')).map(h=>h.id));
 for(const c of cards){const h=c.querySelector('h3')!;expect(c).toHaveAttribute('aria-labelledby',h.id);expect(c.querySelectorAll('.practice-options > li')).toHaveLength(4);expect(c.querySelectorAll('details > summary')).toHaveLength(1);expect(c.querySelector('details')).not.toHaveAttribute('open');}
});
