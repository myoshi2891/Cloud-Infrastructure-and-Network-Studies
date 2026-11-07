'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { NAV_ITEMS } from './constants';

const DEFAULT_ID = NAV_ITEMS[0]?.id ?? '';

/** URL の fragment から目次のアクティブ ID を導出する。 */
const idFromHash = (): string => {
    if (typeof window === 'undefined') return DEFAULT_ID;
    const hash = window.location.hash.replace(/^#/, '');
    if (!hash) return DEFAULT_ID;
    let decoded: string;
    try {
        decoded = decodeURIComponent(hash);
    } catch (error) {
        if (!(error instanceof URIError)) throw error;
        return DEFAULT_ID;
    }
    return NAV_ITEMS.some((item) => item.id === decoded) ? decoded : DEFAULT_ID;
};

/** モバイル開閉と見出しに連動する目次。 */
export default function NavBar() {
    const [open, setOpen] = useState(false);
    const [activeId, setActiveId] = useState<string>(DEFAULT_ID);
    const toggleRef = useRef<HTMLButtonElement>(null);

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
                          const firstVisible = NAV_ITEMS.find((item) => visibleIds.has(item.id));
                          if (firstVisible) setActiveId(firstVisible.id);
                      },
                      { rootMargin: '-15% 0px -75% 0px', threshold: 0 },
                  );

        if (observer) {
            for (const item of NAV_ITEMS) {
                const element = document.getElementById(item.id);
                if (element) observer.observe(element);
            }
        }

        return () => observer?.disconnect();
    }, []);

    useEffect(() => {
        const sidebar = document.getElementById('sidebar');
        const link = sidebar?.querySelector<HTMLAnchorElement>(`a[href="#${activeId}"]`);
        if (!sidebar || !link) return;
        const top = link.offsetTop;
        if (top < sidebar.scrollTop + 80 || top > sidebar.scrollTop + sidebar.clientHeight - 80) {
            sidebar.scrollTop = top - sidebar.clientHeight / 3;
        }
    }, [activeId]);

    const handleLinkClick = (id: string) => {
        setOpen(false);
        setActiveId(id);
        const heading = document.getElementById(id);
        if (heading) {
            heading.tabIndex = -1;
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
                    <h2>Domain 6: Security Foundations and Governance</h2>
                </div>
                <nav id="sidebarNav" aria-label="SCS-C03 Domain 6 目次">
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
