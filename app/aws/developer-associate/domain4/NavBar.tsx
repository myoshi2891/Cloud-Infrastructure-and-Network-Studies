'use client';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { NAV_ITEMS } from './constants';

/** 目次・現在位置・モバイルドロワー・hashとフォーカスを同期する。 */
export function NavBar() {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState<string>(NAV_ITEMS[0].id);
    const button = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        const root = button.current?.closest('.dva-troubleshooting-page');
        root?.classList.toggle('menu-open', open);
        return () => root?.classList.remove('menu-open');
    }, [open]);
    useEffect(() => {
        const close = () => { setOpen(false); button.current?.focus(); };
        const key = (event: KeyboardEvent) => { if (event.key === 'Escape') close(); };
        const resize = () => { if (window.innerWidth > 900) setOpen(false); };
        const hash = () => {
            const id = window.location.hash.slice(1);
            if (NAV_ITEMS.some(item => item.id === id)) setActive(id);
        };
        const visible = new Set<string>();
        const observer = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(entries => {
            entries.forEach(entry => { if(entry.isIntersecting) visible.add(entry.target.id); else visible.delete(entry.target.id); });
            const first = NAV_ITEMS.find(item => visible.has(item.id));
            if(first) setActive(first.id);
        }, {rootMargin:'-10% 0px -65% 0px'}) : undefined;
        NAV_ITEMS.forEach(item => { const target = document.getElementById(item.id); if(target) observer?.observe(target); });
        const end = () => { if(window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) setActive(NAV_ITEMS.at(-1)!.id); };
        document.addEventListener('keydown',key); window.addEventListener('resize',resize); window.addEventListener('hashchange',hash); window.addEventListener('scroll',end,{passive:true}); hash();
        return () => { observer?.disconnect(); document.removeEventListener('keydown',key); window.removeEventListener('resize',resize); window.removeEventListener('hashchange',hash); window.removeEventListener('scroll',end); };
    }, []);
    const navigate = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
        event.preventDefault(); window.history.pushState(null,'','#'+id); setActive(id); setOpen(false);
        const target = document.getElementById(id); target?.scrollIntoView?.({block:'start'}); target?.focus({preventScroll:true});
    };
    return <>
        <button ref={button} className="menu-btn" type="button" aria-label="目次を開く" aria-expanded={open} aria-controls="dva4-sidebar" onClick={() => setOpen(value => !value)}>☰</button>
        <button className="backdrop" type="button" aria-label="目次を閉じる" onClick={() => {setOpen(false);button.current?.focus();}} />
        <aside className="sidebar" id="dva4-sidebar" aria-label="目次">
            <div className="sidebar-brand"><span className="badge">DVA-C02 · Domain 4</span><p className="brand-title">Troubleshooting and Optimization</p></div>
            <nav className="nav" aria-label="学習ガイド目次"><ul>{NAV_ITEMS.map(item => <li key={item.id}>
                {item.group && <div className="nav-group">{item.group}</div>}
                <a href={'#'+item.id} className={active === item.id ? 'active' : undefined} aria-current={active === item.id ? 'location' : undefined} onClick={event => navigate(event,item.id)}><span className="n">{item.n}</span><span className="t">{item.label}</span></a>
            </li>)}</ul></nav>
        </aside>
    </>;
}
