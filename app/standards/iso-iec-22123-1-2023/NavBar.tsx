'use client';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { NAV_ITEMS } from './constants';

/** 原本の目次とscroll spyを保持し、URL・フォーカス・モバイル開閉を同期する。 */
export default function NavBar({ open, onClose, onToggle }: { open: boolean; onClose: () => void; onToggle: () => void }) {
    const [active, setActive] = useState<string>(NAV_ITEMS[0].id);
    const toggle = useRef<HTMLButtonElement>(null);
    const sidebar = useRef<HTMLElement>(null);
    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;
        const observer = new IntersectionObserver(entries => {
            for (const entry of entries) if (entry.isIntersecting) {
                setActive(entry.target.id);
                const link = [...(sidebar.current?.querySelectorAll<HTMLAnchorElement>('a') ?? [])]
                    .find(anchor => anchor.dataset.target === entry.target.id);
                const viewport = sidebar.current;
                if (link && viewport) {
                    if (link.offsetTop < viewport.scrollTop) viewport.scrollTop = link.offsetTop;
                    else if (link.offsetTop + link.offsetHeight > viewport.scrollTop + viewport.clientHeight) {
                        viewport.scrollTop = link.offsetTop + link.offsetHeight - viewport.clientHeight;
                    }
                }
            }
        }, { rootMargin: '-15% 0px -75% 0px' });
        for (const { id } of NAV_ITEMS) { const target = document.getElementById(id); if (target) observer.observe(target); }
        return () => observer.disconnect();
    }, []);
    useEffect(() => {
        /** Escapeで開いた目次を閉じ、開閉ボタンへフォーカスを返す。 */
        function onKeyDown(event: KeyboardEvent) { if (open && event.key === 'Escape') { onClose(); toggle.current?.focus(); } }
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [open, onClose]);
    /** 目次の選択・URLハッシュ・移動先のフォーカスを一度の操作で更新する。 */
    function navigate(event: MouseEvent<HTMLAnchorElement>, id: string) {
        event.preventDefault(); setActive(id); onClose();
        window.history.pushState(null, '', '#' + id);
        const target = document.getElementById(id);
        if (target) { target.tabIndex = -1; target.focus({ preventScroll: true }); target.scrollIntoView?.({ behavior: 'instant' }); }
    }
    return <>
        <button className="toggle" id="toggle" type="button" ref={toggle} aria-label="目次を開閉" aria-expanded={open} aria-controls="sidebar" onClick={onToggle}>☰ 目次</button>
        <nav ref={sidebar} className={`sidebar${open ? ' open' : ''}`} id="sidebar" aria-label="目次"><div className="brand">ISO/IEC 22123-1:2023</div><ul>{NAV_ITEMS.map(item => <li key={item.id}><a href={'#' + item.id} data-target={item.id} className={active === item.id ? 'active' : undefined} aria-current={active === item.id ? 'location' : undefined} onClick={event => navigate(event, item.id)}>{item.text}</a>{'\n'}</li>)}</ul></nav>
    </>;
}
