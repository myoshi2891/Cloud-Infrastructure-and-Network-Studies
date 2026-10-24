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
it('retains every implicit source pie color, label size and opacity over shared dark defaults', async()=>{
 const {default: pieTheme}=await import('@/docs/migration-inventory/aws-scs-c03-guide.pie-theme.json');
 const {container}=render(<Diagram id="diagram-1" label="ドメイン配分"/>);
 const chart=container.querySelector('[data-chart]')!.getAttribute('data-chart')!;
 const config=JSON.parse(chart.split('\n')[1]!.slice('config: '.length));
 expect(Object.fromEntries(Object.keys(pieTheme).map(key=>[key,config.themeVariables[key]]))).toEqual(pieTheme);
});
