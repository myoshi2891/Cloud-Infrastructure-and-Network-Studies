'use client';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { NAV_ITEMS } from './constants';

/** 原本の目次とscroll spyを保持し、URL・フォーカス・モバイル開閉を同期する。 */
export default function NavBar({ open, onClose, onToggle }: { open: boolean; onClose: () => void; onToggle: () => void }) {
    const [active, setActive] = useState<string>(NAV_ITEMS[0].id);
    const toggle = useRef<HTMLButtonElement>(null);
    const sidebar = useRef<HTMLElement>(null);
    // 目次から移動した見出しと着地位置。利用者のスクロールで位置が変わるまで選択を保つ。
    const pinned = useRef<{ id: string; top: number } | null>(null);
    useEffect(() => {
        const targets = NAV_ITEMS.map(({ id }) => document.getElementById(id))
            .filter((target): target is HTMLElement => target !== null);
        /** 見出しのscroll-margin-top（目次移動の着地位置）を読み始めの境界とする。1pxの着地誤差を許容する。 */
        function readingBoundary() {
            const first = targets[0];
            const margin = first ? Number.parseFloat(window.getComputedStyle(first).scrollMarginTop) : Number.NaN;
            return Number.isFinite(margin) ? margin + 1 : window.innerHeight * 0.15;
        }
        function updateActive() {
            const pin = pinned.current;
            if (pin) {
                const landed = document.getElementById(pin.id);
                if (landed && Math.abs(landed.getBoundingClientRect().top - pin.top) < 1) return;
                pinned.current = null;
            }
            // 読み始めの境界を最後に通過した見出しを選ぶ。長い節内の逆スクロールにも対応する。
            const boundary = readingBoundary();
            let current = targets[0];
            for (const target of targets) {
                if (target.getBoundingClientRect().top <= boundary) current = target;
            }
            if (current) {
                setActive(current.id);
                const link = [...(sidebar.current?.querySelectorAll<HTMLAnchorElement>('a') ?? [])]
                    .find(anchor => anchor.dataset.target === current.id);
                const viewport = sidebar.current;
                if (link && viewport) {
                    const topInset = window.innerWidth <= 900 && toggle.current
                        ? Math.max(0, toggle.current.getBoundingClientRect().bottom - viewport.getBoundingClientRect().top)
                        : 0;
                    if (link.offsetTop < viewport.scrollTop + topInset) viewport.scrollTop = Math.max(0, link.offsetTop - topInset);
                    else if (link.offsetTop + link.offsetHeight > viewport.scrollTop + viewport.clientHeight) {
                        viewport.scrollTop = link.offsetTop + link.offsetHeight - viewport.clientHeight;
                    }
                }
            }
        }
        const observer = typeof IntersectionObserver === 'undefined' ? null
            : new IntersectionObserver(entries => { const last = entries.filter(entry => entry.isIntersecting).at(-1); if (last && !pinned.current) setActive(last.target.id); else updateActive(); }, { rootMargin: '-15% 0px -75% 0px' });
        targets.forEach(target => observer?.observe(target));
        // 連続するscrollは1フレームにつき1回だけ見出し位置を読む。
        let frame = 0;
        function scheduleUpdate() {
            if (frame) return;
            frame = window.requestAnimationFrame(() => { frame = 0; updateActive(); });
        }
        window.addEventListener('scroll', scheduleUpdate, { passive: true });
        window.addEventListener('resize', updateActive);
        updateActive();
        return () => {
            observer?.disconnect();
            if (frame) window.cancelAnimationFrame(frame);
            window.removeEventListener('scroll', scheduleUpdate);
            window.removeEventListener('resize', updateActive);
        };
    }, []);
    useEffect(() => {
        /** Escapeで開いた目次を閉じ、開閉ボタンへフォーカスを返す。 */
        function onKeyDown(event: KeyboardEvent) { if (open && event.key === 'Escape') { onClose(); toggle.current?.focus(); } }
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [open, onClose]);
    /** 目次の選択・URLハッシュ・移動先のフォーカスを一度の操作で更新する。 */
    function navigate(event: MouseEvent<HTMLAnchorElement>, id: string) {
        if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault(); setActive(id); onClose();
        window.history.pushState(null, '', '#' + id);
        const target = document.getElementById(id);
        if (target) { target.tabIndex = -1; target.focus({ preventScroll: true }); target.scrollIntoView?.({ behavior: 'instant' });
            pinned.current = { id, top: target.getBoundingClientRect().top }; }
    }
    /** 原本の親項目・子項目を同じul/li階層で組み立てる。 */
    function link(item: typeof NAV_ITEMS[number]) {
        return <a href={'#' + item.id} data-target={item.id} className={active === item.id ? 'active' : undefined} aria-current={active === item.id ? 'location' : undefined} onClick={event => navigate(event, item.id)}>{item.text}</a>;
    }
    return <>
        <button className="nav-toggle" id="navToggle" type="button" ref={toggle} aria-label="目次を開く" aria-expanded={open} aria-controls="sidebar" onClick={onToggle}>目次</button>
        <nav ref={sidebar} className={`sidebar${open ? ' open' : ''}`} id="sidebar" aria-label="目次"><p className="brand">ISO/IEC 22123-2:2023</p><ul>{NAV_ITEMS.filter(item => !item.sub).map(item => {
            const start = NAV_ITEMS.indexOf(item);
            const children = NAV_ITEMS.slice(start + 1).filter((child, index, rest) => child.sub && rest.slice(0, index).every(previous => previous.sub));
            return <li className="nav-h2" key={item.id}>{link(item)}{children.length > 0 && <ul className="nav-sub">{children.map(child => <li key={child.id}>{link(child)}</li>)}</ul>}</li>;
        })}</ul></nav>
    </>;
}
