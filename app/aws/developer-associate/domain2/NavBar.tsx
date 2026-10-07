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
            document.getElementById('menuBtn')?.focus();
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
        <div className="mobile-bar"><button id="menuBtn" type="button" aria-label="目次を開く" aria-controls="dvaSidebar" aria-expanded={open} onClick={() => setOpen(value => !value)}>目次</button><span>DVA-C02 Security</span></div>
        {open && <button type="button" className="sidebar-backdrop" aria-label="目次を閉じる" onClick={() => setOpen(false)} />}
        <nav className={`sidebar${open ? ' open' : ''}`} id="dvaSidebar" aria-label="目次">
            <div className="brand">AWS DVA-C02<br />ドメイン2 セキュリティ</div>
            <ul>{NAV_ITEMS.map(item => <li key={item.id}><a href={`#${item.id}`} className={`nav-a${activeId === item.id ? ' active' : ''}`} aria-current={activeId === item.id ? 'location' : undefined} onClick={event => navigate(event, item.id)}>{item.label}</a></li>)}</ul>
            <div className="nav-group">Task 1</div><div className="nav-group">Task 2</div><div className="nav-group">Task 3</div>
        </nav>
    </>;
}
