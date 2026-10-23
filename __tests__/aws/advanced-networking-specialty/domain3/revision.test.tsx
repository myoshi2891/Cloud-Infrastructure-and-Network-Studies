import { expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import Guide from '@/app/aws/advanced-networking-specialty/domain3/sections/Revision';
import { ansDomain3Part } from '@/__tests__/helpers/ans-domain3-fixture';
import { defineGuidePartSuite } from '@/__tests__/helpers/guide-fidelity-suite';
vi.mock('@/components/MermaidDiagram',async()=>({MermaidDiagram:(await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock}));
defineGuidePartSuite(Guide,'revision',ansDomain3Part('revision'));
it('retains all eight native scenario disclosures and their source choices without adding answer state',()=>{
 const {container}=render(<Guide/>);
 expect(container.querySelectorAll('article.scenario-card')).toHaveLength(8);
 expect(container.querySelectorAll('details.scenario-answer')).toHaveLength(8);
 container.querySelectorAll('details').forEach(panel=>{
  expect(panel).not.toHaveAttribute('open');
  expect(panel.querySelector('summary')).toHaveTextContent('解答と解説');
  expect(panel.querySelector('p')?.textContent?.trim()).toBeTruthy();
 });
 expect(container.querySelectorAll('input')).toHaveLength(0);
});
