'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { NAV_ITEMS } from './constants';

const DEFAULT_ID = NAV_ITEMS[0]?.id ?? '0-この資料の使い方と試験情報';

/** URL fragment が目次項目に一致すればその ID、なければ先頭項目の ID を返す。 */
const idFromHash = (): string => {
    const raw = window.location.hash.slice(1);
    let hash = raw;
    try {
        hash = decodeURIComponent(raw);
    } catch (error) {
        if (!(error instanceof URIError)) throw error;
        return DEFAULT_ID;
    }
    return NAV_ITEMS.some((item) => item.id === hash) ? hash : DEFAULT_ID;
};

/** モバイル開閉と見出しに連動する目次。 */
export default function NavBar() {
    const [open, setOpen] = useState(false);
    const [activeId, setActiveId] = useState<string>(DEFAULT_ID);
    const toggleRef = useRef<HTMLButtonElement>(null);

    // 開いている間だけ Escape を監視し、閉じた状態でのフォーカス奪取を防ぐ
    useEffect(() => {
        if (!open) return;
        const escape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpen(false);
                toggleRef.current?.focus();
            }
        };
        document.addEventListener('keydown', escape);
        return () => document.removeEventListener('keydown', escape);
    }, [open]);

    // サーバー描画と一致させるため初期値は先頭項目とし、マウント後と履歴移動時に fragment から同期する
    useEffect(() => {
        const syncFromHash = () => setActiveId(idFromHash());
        syncFromHash();
        window.addEventListener('hashchange', syncFromHash);
        window.addEventListener('popstate', syncFromHash);
        return () => {
            window.removeEventListener('hashchange', syncFromHash);
            window.removeEventListener('popstate', syncFromHash);
        };
    }, []);

    useEffect(() => {
        const visibleIds = new Set<string>();
        const observer =
            typeof IntersectionObserver === 'undefined'
                ? undefined
                : new IntersectionObserver(
                      (entries) => {
                          for (const entry of entries) {
                              if (entry.isIntersecting) visibleIds.add(entry.target.id);
                              else visibleIds.delete(entry.target.id);
                          }
                          const firstVisible = NAV_ITEMS.find((item) =>
                              visibleIds.has(item.id),
                          );
                          if (firstVisible) setActiveId(firstVisible.id);
                      },
                      { rootMargin: '-15% 0px -75% 0px', threshold: 0 },
                  );

        for (const item of NAV_ITEMS) {
            const target = document.getElementById(item.id);
            if (target) observer?.observe(target);
        }

        const endOfPage = () => {
            if (
                window.scrollY > 0 &&
                window.innerHeight + window.scrollY >=
                    document.documentElement.scrollHeight - 2
            ) {
                setActiveId(NAV_ITEMS[NAV_ITEMS.length - 1]?.id ?? DEFAULT_ID);
            }
        };
        window.addEventListener('scroll', endOfPage, { passive: true });

        return () => {
            observer?.disconnect();
            window.removeEventListener('scroll', endOfPage);
        };
    }, []);

    useEffect(() => {
        const sidebar = document.getElementById('sidebar');
        const link = sidebar?.querySelector<HTMLElement>('a[aria-current="location"]');
        if (!sidebar || !link) return;
        const top = link.offsetTop;
        if (
            top < sidebar.scrollTop + 80 ||
            top > sidebar.scrollTop + sidebar.clientHeight - 80
        ) {
            sidebar.scrollTop = top - sidebar.clientHeight / 3;
        }
    }, [activeId]);

    const handleLinkClick = (id: string) => {
        setOpen(false);
        setActiveId(id);
        const heading = document.getElementById(id);
        if (heading) {
            heading.focus();
        }
    };

    return (
        <Fragment>
            <button
                ref={toggleRef}
                type="button"
                id="sidebarToggle"
                className="sidebar-toggle"
                aria-label="目次を開閉"
                aria-expanded={open}
                aria-controls="sidebar"
                onClick={() => setOpen((prev) => !prev)}
            >
                ☰
            </button>
            <aside id="sidebar" className={`sidebar${open ? ' open' : ''}`}>
                <div className="sidebar-header">
                    <div className="kicker">AWS SCS-C03</div>
                    <h2>Domain 2: Incident Response</h2>
                </div>
                <nav id="sidebarNav" aria-label="SCS-C03 Domain 2 目次">
                    {NAV_ITEMS.map((item) => (
                        <Fragment key={item.id}>
                            <a
                                href={`#${item.id}`}
                                className={item.level === 3 ? 'lvl3' : ''}
                                aria-current={activeId === item.id ? 'location' : undefined}
                                onClick={() => handleLinkClick(item.id)}
                            >
                                {item.label}
                            </a>{' '}
                        </Fragment>
                    ))}
                </nav>
            </aside>
        </Fragment>
    );
}
