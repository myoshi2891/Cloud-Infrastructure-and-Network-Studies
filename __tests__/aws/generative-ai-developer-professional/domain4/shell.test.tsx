import {render,fireEvent} from '@testing-library/react';
import {expect,it,vi} from 'vitest';
import NavBar from '@/app/aws/generative-ai-developer-professional/domain4/NavBar';
import {NAV_ITEMS} from '@/app/aws/generative-ai-developer-professional/domain4/constants';
import fixture from '@/docs/migration-inventory/aws-aip-c01-domain4-guide.fidelity.json';
it('retains every source navigation label and target in order',()=>{
 const {container}=render(<NavBar/>);
 expect(NAV_ITEMS).toEqual(fixture.guideDesign.nav);
 expect([...container.querySelectorAll('nav a')].map(a=>({id:a.getAttribute('href')?.slice(1),label:a.textContent}))).toEqual(fixture.guideDesign.nav.map(({id,label})=>({id,label})));
 expect(container.querySelectorAll('nav ul > li')).toHaveLength(fixture.guideDesign.nav.length);
});
it('opens, closes with Escape, and cleans up its observer',()=>{
 const disconnect=vi.fn();
 vi.stubGlobal('IntersectionObserver',class{observe=vi.fn();disconnect=disconnect;});
 const {container,unmount}=render(<NavBar/>);
 const button=container.querySelector('button')!;
 fireEvent.click(button);expect(button).toHaveAttribute('aria-expanded','true');
 fireEvent.keyDown(document,{key:'Escape'});expect(button).toHaveAttribute('aria-expanded','false');
 expect(button).toHaveFocus();unmount();expect(disconnect).toHaveBeenCalled();vi.unstubAllGlobals();
});
