'use client';
import { useEffect, useState } from 'react';
import { NAV_ITEMS } from './constants';
/** 見出しの scroll-margin-top（ヘッダー＋免責バナー＋24px）と同じ値。目次クリックの着地位置と現在位置の判定線を揃える。 */
function headingOffset() {
    const style = getComputedStyle(document.documentElement);
    const px = (name: string, fallback: number) => { const v = Number.parseFloat(style.getPropertyValue(name)); return Number.isFinite(v) ? v : fallback; };
    return px('--header-h', 60) + px('--disclaimer-height', 0) + 24;
}
/** 開閉・現在位置・リンク先フォーカスに対応する原本目次。 */
export default function NavBar() {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState<string>(NAV_ITEMS[0].id);
    useEffect(() => { if (typeof IntersectionObserver === 'undefined')
        return; let observer: IntersectionObserver | undefined; const observe = () => { observer?.disconnect(); const top = headingOffset(); const bottom = Math.max(0, window.innerHeight * 0.9 - top); observer = new IntersectionObserver(entries => { for (const e of entries)
        if (e.isIntersecting)
            setActive(e.target.id); }, { rootMargin: `-${top}px 0px -${bottom}px 0px` }); NAV_ITEMS.forEach(i => { const e = document.getElementById(i.id); if (e)
        observer?.observe(e); }); }; observe(); const offsetWatcher = new MutationObserver(observe); offsetWatcher.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] }); const end = () => { if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2)
        setActive(NAV_ITEMS[NAV_ITEMS.length - 1]!.id); }; window.addEventListener('scroll', end, { passive: true }); window.addEventListener('resize', observe); return () => { observer?.disconnect(); offsetWatcher.disconnect(); window.removeEventListener('scroll', end); window.removeEventListener('resize', observe); }; }, []);
    return <><button className="sidebar-toggle" id="sidebarToggle" type="button" aria-label="メニュー" aria-controls="sidebar" aria-expanded={open} onClick={() => setOpen(!open)}>☰</button><aside className={`sidebar${open ? ' open' : ''}`} id="sidebar"><div className="sidebar-header"><div className="kicker">DDIA 解説ガイド</div>{" "}<h2>初学者向け完全ガイド</h2>{" "}</div><nav id="sidebarNav" aria-label="DDIA 目次"><ul>{NAV_ITEMS.map(i => <li key={i.id}><a href={'#' + i.id} className={active === i.id ? 'active' : ''} aria-current={active === i.id ? 'location' : undefined} onClick={e => { if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return; e.preventDefault(); window.history.pushState(null, '', '#' + i.id); document.getElementById(i.id)?.scrollIntoView?.(); document.getElementById(i.id)?.focus(); setActive(i.id); setOpen(false); }}>{i.label}</a>{" "}</li>)}</ul></nav></aside></>;
}
