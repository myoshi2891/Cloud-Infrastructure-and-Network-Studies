'use client';
import { useEffect, useState } from 'react';
import { NAV_ITEMS } from './constants';
/** 開閉・現在位置・リンク先フォーカスに対応する原本目次。 */
export default function NavBar(){
 const [open,setOpen]=useState(false); const [active,setActive]=useState<string>(NAV_ITEMS[0].id);
 useEffect(()=>{if(typeof IntersectionObserver==='undefined')return;const observer=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting)setActive(e.target.id);},{rootMargin:'-15% 0px -75% 0px'});NAV_ITEMS.forEach(i=>{const e=document.getElementById(i.id);if(e)observer.observe(e);});const end=()=>{if(window.scrollY+window.innerHeight>=document.documentElement.scrollHeight-2)setActive(NAV_ITEMS[NAV_ITEMS.length-1]!.id);};window.addEventListener('scroll',end,{passive:true});return()=>{observer.disconnect();window.removeEventListener('scroll',end);};},[]);
 return <><button className="sidebar-toggle" id="sidebarToggle" type="button" aria-label="メニュー" aria-controls="sidebar" aria-expanded={open} onClick={()=>setOpen(!open)}>☰</button><aside className={`sidebar${open?' open':''}`} id="sidebar"><div className="sidebar-header"><div className="kicker">DDIA 解説ガイド</div>{" "}<h2>初学者向け完全ガイド</h2>{" "}</div><nav id="sidebarNav" aria-label="DDIA 目次"><ul>{NAV_ITEMS.map(i=><li key={i.id}><a href={'#'+i.id} className={active===i.id?'active':''} aria-current={active===i.id?'location':undefined} onClick={e=>{e.preventDefault();window.history.pushState(null,'','#'+i.id);document.getElementById(i.id)?.scrollIntoView?.();document.getElementById(i.id)?.focus();setActive(i.id);setOpen(false);}}>{i.label}</a>{" "}</li>)}</ul></nav></aside></>;
}
