import {render} from '@testing-library/react';
import {expect,it,vi} from 'vitest';
import Page,{metadata} from '@/app/aws/generative-ai-developer-professional/domain2/page';
import fixture from '@/docs/migration-inventory/aws-aip-c01-domain2-guide.fidelity.json';
vi.mock('@/components/MermaidDiagram',async()=>({MermaidDiagram:(await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock}));
it('provides source navigation, metadata and accessible mobile toggle',()=>{
 const {container,getByRole}=render(<Page/>);
 expect(metadata.title).toContain('Domain 2');
 expect(container.querySelector('.aip-domain2-page')).not.toBeNull();
 expect([...container.querySelectorAll('nav a')].map(a=>({id:decodeURIComponent(a.getAttribute('href')!.slice(1)),label:a.textContent,level:a.classList.contains('lvl3')?3:2}))).toEqual(fixture.guideDesign.nav);
 expect(getByRole('button',{name:'メニュー'})).toHaveAttribute('aria-expanded','false');
});
