'use client';

import { useCallback, useEffect, useState } from 'react';
import { type NavItem, NAV_ITEMS } from './constants';

const sanitizeHash = (hash: string): string | null => {
    try {
        return decodeURIComponent(hash.replace(/^#/, ''));
    } catch {
        return null;
    }
};

/**
 * Kubernetes in Action 完全解説ガイド サイドバーナビゲーション
 */
export function NavBar() {
    const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0]?.id ?? '');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const updateFromHash = () => {
            const id = sanitizeHash(window.location.hash);
            if (id === null) return;
            if (id === '') {
                setActiveId(NAV_ITEMS[0]?.id ?? '');
                return;
            }
            if (NAV_ITEMS.some((item) => item.id === id)) {
                setActiveId(id);
            }
        };

        updateFromHash();
        window.addEventListener('hashchange', updateFromHash);
        window.addEventListener('popstate', updateFromHash);

        return () => {
            window.removeEventListener('hashchange', updateFromHash);
            window.removeEventListener('popstate', updateFromHash);
        };
    }, []);

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        const visibleIds = new Set<string>();

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    const id = entry.target.id;
                    if (entry.isIntersecting) {
                        visibleIds.add(id);
                    } else {
                        visibleIds.delete(id);
                    }
                }

                if (visibleIds.size === 0) return;

                let topId = '';
                let minTop = Infinity;
                let fallbackId = '';
                let maxNegativeTop = -Infinity;

                for (const item of NAV_ITEMS) {
                    if (!visibleIds.has(item.id)) continue;
                    const el = document.getElementById(item.id);
                    if (!el) continue;
                    const top = el.getBoundingClientRect().top;
                    if (top >= 0) {
                        if (top < minTop) {
                            minTop = top;
                            topId = item.id;
                        }
                    } else if (top > maxNegativeTop) {
                        maxNegativeTop = top;
                        fallbackId = item.id;
                    }
                }

                if (!topId) {
                    topId = fallbackId;
                }

                if (topId) {
                    setActiveId(topId);
                }
            },
            {
                rootMargin: '-80px 0px -60% 0px',
                threshold: [0, 0.25, 0.5, 0.75, 1],
            },
        );

        for (const item of NAV_ITEMS) {
            const el = document.getElementById(item.id);
            if (el) {
                observer.observe(el);
            }
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    const handleLinkClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
            if (
                e.defaultPrevented ||
                e.metaKey ||
                e.ctrlKey ||
                e.shiftKey ||
                e.altKey ||
                e.button !== 0
            ) {
                return;
            }

            e.preventDefault();
            setActiveId(id);
            setIsOpen(false);

            const target = document.getElementById(id);
            if (target) {
                if (typeof target.scrollIntoView === 'function') {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
                target.tabIndex = -1;
                target.focus({ preventScroll: true });
            }

            const hash = `#${encodeURIComponent(id)}`;
            window.location.hash = hash;
        },
        [],
    );

    return (
        <>
            <button
                type="button"
                className="sidebar-toggle"
                aria-label="目次を開閉"
                aria-expanded={isOpen}
                aria-controls="sidebar"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                ☰
            </button>
            <aside
                id="sidebar"
                className={`sidebar ${isOpen ? 'open' : ''}`}
                aria-label="学習ガイド目次"
            >
                <div className="sidebar-header">
                    <div className="kicker">Book Guide</div>
                    <h2>Kubernetes in Action</h2>
                </div>
                <nav id="sidebarNav" aria-label="ページ内ナビゲーション">
                    {NAV_ITEMS.map((item: NavItem) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={`${item.level === 'h3' ? 'lvl3' : ''} ${
                                activeId === item.id ? 'active' : ''
                            }`}
                            aria-current={activeId === item.id ? 'location' : undefined}
                            onClick={(e) => handleLinkClick(e, item.id)}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>
            </aside>
        </>
    );
}
