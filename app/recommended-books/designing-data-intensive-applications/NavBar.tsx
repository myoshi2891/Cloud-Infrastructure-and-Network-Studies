'use client';
import { useEffect, useState } from 'react';
import { NAV_ITEMS } from './constants';
/** 開閉・現在位置・リンク先フォーカスに対応する原本目次。 */
export default function NavBar() {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState<string>(NAV_ITEMS[0].id);
    useEffect(() => {
        // スクロール方向に関係なく、表示基準線（画面上端から15%）より上にある最後の見出しを現在位置にする。
        const update = () => {
            const doc = document.documentElement;
            if (doc.scrollHeight > window.innerHeight && window.scrollY + window.innerHeight >= doc.scrollHeight - 2) {
                setActive(NAV_ITEMS[NAV_ITEMS.length - 1]!.id);
                return;
            }
            const offset = window.innerHeight * 0.15;
            let next: string = NAV_ITEMS[0].id;
            for (const i of NAV_ITEMS) {
                const e = document.getElementById(i.id);
                if (e && e.getBoundingClientRect().top <= offset)
                    next = i.id;
            }
            setActive(next);
        };
        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
    }, []);
    return <><button className="sidebar-toggle" id="sidebarToggle" type="button" aria-label="メニュー" aria-controls="sidebar" aria-expanded={open} onClick={() => setOpen(!open)}>☰</button><aside className={`sidebar${open ? ' open' : ''}`} id="sidebar"><div className="sidebar-header"><div className="kicker">DDIA 解説ガイド</div>{" "}<h2>初学者向け完全ガイド</h2>{" "}</div><nav id="sidebarNav" aria-label="DDIA 目次"><ul>{NAV_ITEMS.map(i => <li key={i.id}><a href={'#' + i.id} className={active === i.id ? 'active' : ''} aria-current={active === i.id ? 'location' : undefined} onClick={e => { if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return; e.preventDefault(); window.history.pushState(null, '', '#' + i.id); document.getElementById(i.id)?.scrollIntoView?.(); document.getElementById(i.id)?.focus(); setActive(i.id); setOpen(false); }}>{i.label}</a>{" "}</li>)}</ul></nav></aside></>;
}
