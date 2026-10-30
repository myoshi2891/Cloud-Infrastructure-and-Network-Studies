'use client';
import { useEffect, useState } from 'react';
import { NAV_ITEMS } from './constants';
/** 原本の二階層目次。現在位置・開閉・hash/focusを同期する。 */
export default function NavBar() {
 const [open,setOpen]=useState(false);
 const [active,setActive]=useState<string>(NAV_ITEMS[0].id);
 useEffect(()=>{
  if(typeof IntersectionObserver==='undefined')return;
  const visible=new Set<string>();
  const observer=new IntersectionObserver(entries=>{
   for(const e of entries){if(e.isIntersecting)visible.add(e.target.id);else visible.delete(e.target.id);}
   const first=NAV_ITEMS.find(i=>visible.has(i.id));if(first)setActive(first.id);
  },{rootMargin:'-15% 0px -75% 0px'});
  NAV_ITEMS.forEach(i=>{const el=document.getElementById(i.id);if(el)observer.observe(el);});
  const onScroll=()=>{if(window.scrollY+window.innerHeight>=document.documentElement.scrollHeight-2)setActive(NAV_ITEMS[NAV_ITEMS.length-1]!.id);};
  const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false);};
  window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('keydown',onKey);
  return()=>{observer.disconnect();window.removeEventListener('scroll',onScroll);window.removeEventListener('keydown',onKey);};
 },[]);
 return <><button className="sidebar-toggle" id="sidebarToggle" type="button" aria-label="メニュー" aria-controls="sidebar" aria-expanded={open} onClick={()=>setOpen(value=>!value)}>☰</button><aside className={`sidebar${open?' open':''}`} id="sidebar"><div className="sidebar-header"><div className="kicker">AWS SAP-C02</div>{' '}<h2>Domain 3: 既存ソリューションの継続的改善</h2>{' '}</div><nav id="sidebarNav" aria-label="Domain 3 目次"><ul>{NAV_ITEMS.map(i=><li key={i.id}><a href={'#'+i.id} className={`${i.level===3?'lvl3 ':''}${active===i.id?'active':''}`} aria-current={active===i.id?'location':undefined} onClick={e=>{if(e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();window.history.pushState(null,'','#'+i.id);const el=document.getElementById(i.id);el?.scrollIntoView?.();el?.focus();setActive(i.id);setOpen(false);}}>{i.label}</a>{' '}</li>)}</ul></nav></aside></>;
}
