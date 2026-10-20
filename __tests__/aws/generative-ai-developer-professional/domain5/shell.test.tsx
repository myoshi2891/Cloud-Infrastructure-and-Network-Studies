import {act,render,fireEvent} from '@testing-library/react';
import {afterEach,expect,it,vi} from 'vitest';
import NavBar from '@/app/aws/generative-ai-developer-professional/domain5/NavBar';
import {NAV_ITEMS} from '@/app/aws/generative-ai-developer-professional/domain5/constants';
import fixture from '@/docs/migration-inventory/aws-aip-c01-domain5-guide.fidelity.json';
afterEach(()=>{vi.unstubAllGlobals();});
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
 expect(button).toHaveFocus();unmount();expect(disconnect).toHaveBeenCalled();
});
it('preserves source task group navigation decorations',()=>{
 const {container}=render(<NavBar/>);
 expect([...container.querySelectorAll('nav a.part')].map(a=>a.getAttribute('href')?.slice(1))).toEqual(fixture.guideDesign.nav.filter(item=>item.level !== 3 && item.id.startsWith('task-')).map(item=>item.id));
});
it('syncs aria-current from a valid fragment and history navigation, falling back to the first item',()=>{
 const current=(container:HTMLElement)=>container.querySelector('nav a[aria-current="location"]')?.getAttribute('href');
 const target=NAV_ITEMS[2]!.id;
 window.history.replaceState(null,'',`#${target}`);
 const {container,unmount}=render(<NavBar/>);
 expect(current(container)).toBe(`#${target}`);
 act(()=>{window.history.replaceState(null,'','#unknown-section');window.dispatchEvent(new PopStateEvent('popstate'));});
 expect(current(container)).toBe(`#${NAV_ITEMS[0]!.id}`);
 act(()=>{window.history.replaceState(null,'','#%E0%A4%A');window.dispatchEvent(new HashChangeEvent('hashchange'));});
 expect(current(container)).toBe(`#${NAV_ITEMS[0]!.id}`);
 unmount();window.history.replaceState(null,'',window.location.pathname);
});
