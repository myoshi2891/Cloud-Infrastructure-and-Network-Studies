'use client';
import { useEffect, useState } from 'react';
import { NAV_ITEMS } from './constants';
/** 見出しの scroll-margin-top（ヘッダー＋免責バナー＋24px）と同じ値。目次クリックの着地位置と現在位置の判定線を揃える。 */
function headingOffset(){
 const style=getComputedStyle(document.documentElement);
 const px=(name:string,fallback:number)=>{const v=Number.parseFloat(style.getPropertyValue(name));return Number.isFinite(v)?v:fallback;};
 return px('--header-h',60)+px('--disclaimer-height',0)+24;
}
/** 原本の二階層目次。現在位置・開閉・hash/focusを同期する。 */
export default function NavBar() {
 const [open,setOpen]=useState(false);
 const [active,setActive]=useState<string>(NAV_ITEMS[0].id);
 useEffect(()=>{
  // スクロール方向に関係なく、判定線（見出しの scroll-margin-top と同じ位置）より上にある最後の見出しを現在位置にする
  const update=()=>{
   const doc=document.documentElement;
   if(doc.scrollHeight>window.innerHeight&&window.scrollY+window.innerHeight>=doc.scrollHeight-2){setActive(NAV_ITEMS[NAV_ITEMS.length-1]!.id);return;}
   // 目次クリック後の着地位置がサブピクセルで判定線をわずかに超えても、その見出しを現在位置にする
   const offset=headingOffset()+1;
   let next:string=NAV_ITEMS[0].id;
   for(const i of NAV_ITEMS){const el=document.getElementById(i.id);if(el&&el.getBoundingClientRect().top<=offset)next=i.id;}
   setActive(next);
  };
  // scroll・resize は高頻度で届くため、見出し位置の読み取りは次の描画フレームで1回にまとめる
  let frame=0;
  const schedule=()=>{if(frame!==0)return;frame=window.requestAnimationFrame(()=>{frame=0;update();});};
  const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false);};
  update();
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);window.addEventListener('keydown',onKey);
  return()=>{window.cancelAnimationFrame(frame);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);window.removeEventListener('keydown',onKey);};
 },[]);
 return <><button className="sidebar-toggle" id="sidebarToggle" type="button" aria-label="メニュー" aria-controls="sidebar" aria-expanded={open} onClick={()=>setOpen(value=>!value)}>☰</button><aside className={`sidebar${open?' open':''}`} id="sidebar"><div className="sidebar-header"><div className="kicker">AWS SAP-C02</div>{' '}<h2>Domain 2: Design for New Solutions</h2>{' '}</div><nav id="sidebarNav" aria-label="Domain 2 目次"><ul>{NAV_ITEMS.map(i=><li key={i.id}><a href={'#'+i.id} className={`${i.level===3?'lvl3 ':''}${active===i.id?'active':''}`} aria-current={active===i.id?'location':undefined} onClick={e=>{if(e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();window.history.pushState(null,'','#'+i.id);const el=document.getElementById(i.id);el?.scrollIntoView?.();el?.focus();setActive(i.id);setOpen(false);}}>{i.label}</a>{' '}</li>)}</ul></nav></aside></>;
}
