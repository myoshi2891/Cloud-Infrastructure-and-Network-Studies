'use client';

import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { NAV_ITEMS } from './constants';
import Brand from './Brand';

/** Responsive table of contents with hash navigation, focus and scroll tracking. */
export default function NavBar() {
    const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0].id);
    const [open, setOpen] = useState(true);
    const navigationTarget = useRef<string | null>(null);
    useEffect(() => {
        if (typeof window.matchMedia !== 'function') return;
        const mq = window.matchMedia('(max-width:1024px)');
        const sync = () => setOpen(!mq.matches);
        sync();
        mq.addEventListener('change', sync);
        const visible = new Set<string>();
        const update = () => {
            if (navigationTarget.current) return;
            const current = NAV_ITEMS.filter(item => visible.has(item.id)).at(-1);
            if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) setActiveId(NAV_ITEMS.at(-1)!.id);
            else if (current) setActiveId(current.id);
        };
        const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(entries => {
            entries.forEach(entry => entry.isIntersecting ? visible.add(entry.target.id) : visible.delete(entry.target.id));
            update();
        }, { rootMargin: '-20% 0px -70% 0px' });
        NAV_ITEMS.forEach(item => { const el = document.getElementById(item.id); if (el) observer?.observe(el); });
        const release = () => { navigationTarget.current = null; };
        const releaseKey = (event: KeyboardEvent) => {
            if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) release();
        };
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('wheel', release, { passive: true });
        window.addEventListener('touchstart', release, { passive: true });
        window.addEventListener('pointerdown', release, { passive: true });
        window.addEventListener('keydown', releaseKey);
        window.addEventListener('popstate', release);
        return () => {
            observer?.disconnect(); mq.removeEventListener('change', sync);
            window.removeEventListener('scroll', update); window.removeEventListener('wheel', release);
            window.removeEventListener('touchstart', release); window.removeEventListener('pointerdown', release);
            window.removeEventListener('keydown', releaseKey); window.removeEventListener('popstate', release);
        };
    }, []);
    return <aside className="sidebar"><Brand /><div className="toc">
        <button className="toc-toggle" type="button" aria-expanded={open} aria-controls="devnet-expert-toc" onClick={() => setOpen(!open)}><i className="ti ti-list" aria-hidden="true" /><span>目次</span></button>
        <nav id="devnet-expert-toc" aria-label="DevNet Expert 目次" hidden={!open}><ul>
            {NAV_ITEMS.map(item => <li key={item.id}><a href={`#${item.id}`} className={`nav-link l${item.level}${activeId === item.id ? ' active' : ''}`} aria-current={activeId === item.id ? 'location' : undefined} onClick={event => {
                if (event.ctrlKey || event.metaKey) return;
                event.preventDefault();
                navigationTarget.current = item.id;
                history.pushState(null, '', `#${item.id}`);
                if (window.matchMedia?.('(max-width:1024px)').matches) flushSync(() => setOpen(false));
                document.getElementById(item.id)?.focus();
                document.getElementById(item.id)?.scrollIntoView?.({ block: 'start' });
                setActiveId(item.id);
            }}>{item.label}</a></li>)}
        </ul></nav>
    </div></aside>;
}
