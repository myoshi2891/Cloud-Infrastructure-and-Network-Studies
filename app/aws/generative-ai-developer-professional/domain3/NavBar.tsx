'use client';

import { useEffect, useRef, useState } from 'react';
import { NAV_ITEMS } from './constants';

/** モバイル開閉と見出しに連動する目次。 */
export default function NavBar() {
    const [open, setOpen] = useState(false);
    const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0].id);
    const toggleRef = useRef<HTMLButtonElement>(null);
    // 開いている間だけ Escape を監視し、閉じた状態でのフォーカス奪取を防ぐ
    useEffect(() => {
        if (!open) return;
        const escape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); }
        };
        document.addEventListener('keydown', escape);
        return () => document.removeEventListener('keydown', escape);
    }, [open]);
    useEffect(() => {
        const visibleIds = new Set<string>();
        const observer = typeof IntersectionObserver === 'undefined' ? undefined : new IntersectionObserver(entries => {
            for (const entry of entries) {
                if (entry.isIntersecting) visibleIds.add(entry.target.id);
                else visibleIds.delete(entry.target.id);
            }
            // 通知の順番ではなく原本の見出し順で選び、隣の見出しによる上書きを防ぐ。
            const firstVisible = NAV_ITEMS.find(item => visibleIds.has(item.id));
            if (firstVisible) setActiveId(firstVisible.id);
        }, { rootMargin: '-15% 0px -75% 0px', threshold: 0 });
        for (const item of NAV_ITEMS) {
            const target = document.getElementById(item.id);
            if (target) observer?.observe(target);
        }
        const endOfPage = () => {
            if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
                setActiveId(NAV_ITEMS[NAV_ITEMS.length - 1]?.id ?? NAV_ITEMS[0].id);
            }
        };
        window.addEventListener('scroll', endOfPage, { passive: true });
        return () => {
            observer?.disconnect();
            window.removeEventListener('scroll', endOfPage);
        };
    }, []);
    return (
        <>
            <button ref={toggleRef} className="sidebar-toggle" type="button" aria-label="メニュー" aria-controls="aip-domain3-sidebar" aria-expanded={open} onClick={() => setOpen(value => !value)}>☰</button>
            <aside className={`sidebar${open ? ' open' : ''}`} id="aip-domain3-sidebar">
                <div className="sidebar-header">
                    <div className="kicker">AWS AIP-C01</div>
                    <h2>Domain 3: AI Safety, Security, and Governance</h2>
                </div>
                <nav id="sidebarNav" aria-label="AIP-C01 Domain 3 学習ガイド目次">
                    <ul>{NAV_ITEMS.map(item => (
                        <li key={item.id}><a href={`#${item.id}`} className={`${item.level === 3 ? 'lvl3' : ''}${activeId === item.id ? ' active' : ''}`} aria-current={activeId === item.id ? 'location' : undefined} onClick={event => {
                            const target = document.getElementById(item.id);
                            if (!target) return;
                            event.preventDefault();
                            window.history.pushState(null, '', `#${item.id}`);
                            const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches === true;
                            target.scrollIntoView?.({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
                            target.focus({ preventScroll: true });
                            setActiveId(item.id); setOpen(false);
                        }}>{item.label}</a></li>
                    ))}</ul>
                </nav>
            </aside>
        </>
    );
}
