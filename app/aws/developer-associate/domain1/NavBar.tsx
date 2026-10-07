'use client';

import { useCallback, useEffect, useState, type MouseEvent, type ReactNode } from 'react';
import { NAV_ITEMS } from './constants';

/** 単一の目次データから現在地・hash・フォーカス・モバイル開閉を管理する。 */
export function NavBar({ children }: { children: ReactNode }) {
    const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0]?.id ?? '');
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const fromHash = () => {
            let id: string;
            try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
            if (!id) setActiveId(NAV_ITEMS[0]?.id ?? '');
            else if (NAV_ITEMS.some(item => item.id === id)) setActiveId(id);
        };
        const onScroll = () => {
            if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
                setActiveId(NAV_ITEMS.at(-1)?.id ?? '');
            }
        };
        const visible = new Set<string>();
        const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(entries => {
            for (const entry of entries) {
                const id = entry.target.closest('section')?.id;
                if (!id) continue;
                if (entry.isIntersecting) visible.add(id);
                else visible.delete(id);
            }
            // DOMの順序を保ち、境界で見出しが複数交差しても現在地を安定させる。
            const first = NAV_ITEMS.find(item => visible.has(item.id));
            if (first) setActiveId(first.id);
        }, { rootMargin: `0px 0px -${Math.round(window.innerHeight * 0.65)}px 0px`, threshold: 0 });
        for (const item of NAV_ITEMS) {
            const heading = document.getElementById(item.id)?.querySelector('h2');
            if (heading) observer?.observe(heading);
        }
        fromHash();
        window.addEventListener('hashchange', fromHash);
        window.addEventListener('popstate', fromHash);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            observer?.disconnect();
            window.removeEventListener('hashchange', fromHash);
            window.removeEventListener('popstate', fromHash);
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    // 開いている間だけ Escape を監視し、閉じた状態ではフォーカスを動かさない。
    useEffect(() => {
        if (!open) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key !== 'Escape') return;
            setOpen(false);
            document.getElementById('menu-btn')?.focus();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);

    useEffect(() => {
        const onResize = () => { if (window.innerWidth > 900) setOpen(false); };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const navigate = useCallback((event: MouseEvent<HTMLAnchorElement>, id: string) => {
        if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
        const target = document.getElementById(id);
        if (!target) return;
        event.preventDefault();
        const hash = `#${encodeURIComponent(id)}`;
        if (window.location.hash !== hash) window.history.pushState(null, '', hash);
        target.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
        target.focus({ preventScroll: true });
        setActiveId(id);
        setOpen(false);
    }, []);

    return <div className={`dva-development-page layout${open ? ' menu-open' : ''}`}>
        <aside className="sidebar" id="sidebar">
            <div className="sidebar-brand"><i className="ti ti-brand-aws" aria-hidden="true" /><div><strong>DVA-C02 Domain 1</strong><span className="badge">Development with AWS Services</span></div></div>{' '}
            <nav aria-label="目次"><ul className="nav-list">{NAV_ITEMS.map(item => <li key={item.id} className={item.group}><a href={`#${item.id}`} className={activeId === item.id ? 'active' : undefined} aria-current={activeId === item.id ? 'location' : undefined} onClick={event => navigate(event, item.id)}>{item.label}</a></li>)}</ul></nav>
        </aside>
        <button type="button" className="backdrop" id="backdrop" aria-label="目次を閉じる" tabIndex={open ? 0 : -1} aria-hidden={!open} onClick={() => setOpen(false)} />
        <main>
            <div className="mobile-bar"><button type="button" id="menu-btn" aria-label="目次を開く" aria-controls="sidebar" aria-expanded={open} onClick={() => setOpen(value => !value)}><i className="ti ti-menu-2" aria-hidden="true" />目次</button><span>DVA-C02 Domain 1</span></div>
            {children}
        </main>
    </div>;
}
