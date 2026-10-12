'use client';

import { useCallback, useEffect, useState, type MouseEvent } from 'react';
import { NAV_ITEMS } from './constants';

/** ビューポート上端から読書位置までの比率。 */
const READING_RATIO = 0.35;

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
        let frame = 0;
        // 読書位置より上にある最後の見出しを現在地とし、上下どちらのスクロールでも同じ規則で判定する。
        const updateActive = () => {
            frame = 0;
            if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
                setActiveId(NAV_ITEMS.at(-1)?.id ?? '');
                return;
            }
            const readingLine = window.innerHeight * READING_RATIO;
            let current: string = NAV_ITEMS[0]?.id ?? '';
            for (const item of NAV_ITEMS) {
                const heading = document.getElementById(item.id);
                if (!heading) continue;
                if (heading.getBoundingClientRect().top > readingLine) break;
                current = item.id;
            }
            setActiveId(current);
        };
        // 計測は1フレームに1回へまとめる。
        const scheduleUpdate = () => { if (!frame) frame = window.requestAnimationFrame(updateActive); };
        const onScroll = scheduleUpdate;
        // 図の描画などスクロールを伴わない配置変化も、見出しが読書位置を跨いだ時点で再判定する。
        const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(scheduleUpdate,
            { rootMargin: `0px 0px -${Math.round(window.innerHeight * (1 - READING_RATIO))}px 0px`, threshold: 0 });
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
            if (frame) window.cancelAnimationFrame(frame);
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
            document.getElementById('mb')?.focus();
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
        <div className="mobile-bar"><button id="mb" type="button" aria-label="目次を開く" aria-controls="sb" aria-expanded={open} onClick={() => setOpen(value => !value)}>目次</button><span>Domain 3: Deployment</span></div>
        {open && <button type="button" className="sidebar-backdrop" aria-label="目次を閉じる" onClick={() => setOpen(false)} />}
        <nav className={`sidebar${open ? ' open' : ''}`} id="sb" aria-label="目次">
            <div className="brand">DVA-C02<br />Domain 3: Deployment</div>
            <ul>{NAV_ITEMS.map(item => <li key={item.id}><a href={`#${item.id}`} className={`${item.className}${activeId === item.id ? ' active' : ''}`} aria-current={activeId === item.id ? 'location' : undefined} onClick={event => navigate(event, item.id)}>{item.label}</a></li>)}</ul>
        </nav>
    </>;
}
