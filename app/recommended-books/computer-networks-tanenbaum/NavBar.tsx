'use client';

import { useCallback, useEffect, useState, type MouseEvent } from 'react';
import { NAV_ITEMS } from './constants';

/** 単一の目次データから現在地・hash・フォーカス・モバイル開閉を管理する。 */
export function NavBar() {
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
                if (entry.isIntersecting) visible.add(entry.target.id);
                else visible.delete(entry.target.id);
            }
            // DOMの順序を保ち、境界で見出しが複数交差しても現在地を安定させる。
            const first = NAV_ITEMS.find(item => visible.has(item.id));
            if (first) setActiveId(first.id);
        }, { rootMargin: '-15% 0px -75% 0px', threshold: 0 });
        for (const item of NAV_ITEMS) {
            const heading = document.getElementById(item.id);
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
            document.getElementById('sidebarToggle')?.focus();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);

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

    return <>
        <button className="sidebar-toggle" id="sidebarToggle" type="button" aria-label="メニュー" aria-controls="sidebar" aria-expanded={open} onClick={() => setOpen(value => !value)}>☰</button>
        {open && <button type="button" className="sidebar-backdrop" aria-label="メニューを閉じる" onClick={() => setOpen(false)} />}
        <aside className={`sidebar${open ? ' open' : ''}`} id="sidebar">
            <div className="sidebar-header">
                <div className="kicker">Computer Networks{' '}</div>
                <h2>初学者向けステップバイステップガイド{' '}</h2>
            </div>
            <nav id="sidebarNav" aria-label="ガイドの目次"><ul>
                {NAV_ITEMS.map(item => <li key={item.id}><a href={`#${item.id}`} className={`${item.level === 3 ? 'lvl3 ' : ''}${activeId === item.id ? 'active' : ''}`} aria-current={activeId === item.id ? 'location' : undefined} onClick={event => navigate(event, item.id)}>{item.label}{' '}</a></li>)}
            </ul></nav>
        </aside>
    </>;
}
