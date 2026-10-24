import { render } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { Diagram } from '@/app/aws/security-specialty/Diagram';
import { DIAGRAMS } from '@/app/aws/security-specialty/constants';
vi.mock('@/components/MermaidDiagram',async()=>({MermaidDiagram:(await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock}));
it('provides actual YAML newlines before each original Mermaid chart',()=>{
 for(const id of Object.keys(DIAGRAMS) as (keyof typeof DIAGRAMS)[]){
  const {container,unmount}=render(<Diagram id={id} label="図の説明"/>);
  const chart=container.querySelector('[data-chart]')!.getAttribute('data-chart')!;
  expect(chart).toMatch(/^---\nconfig: /);
  expect(chart).toContain('\n---\n'+DIAGRAMS[id]);
  expect(chart).not.toContain(String.raw`---\nconfig:`);
  unmount();
 }
});
