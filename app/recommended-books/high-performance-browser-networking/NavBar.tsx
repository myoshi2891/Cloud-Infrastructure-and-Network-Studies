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
 * High Performance Browser Networking 初学者向け完全ガイド サイドバーナビゲーション
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

        const visibleMap = new Map<string, number>();

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    const id = entry.target.id;
                    if (entry.isIntersecting) {
                        visibleMap.set(id, entry.boundingClientRect.top);
                    } else {
                        visibleMap.delete(id);
                    }
                }

                if (visibleMap.size === 0) return;

                let topId = '';
                let minTop = Infinity;

                for (const item of NAV_ITEMS) {
                    const top = visibleMap.get(item.id);
                    if (top !== undefined && top < minTop) {
                        minTop = top;
                        topId = item.id;
                    }
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
                target.scrollIntoView({ behavior: 'smooth' });
                target.tabIndex = -1;
                target.focus({ preventScroll: true });
            }

            const newUrl = `${window.location.pathname}#${encodeURIComponent(id)}`;
            window.history.pushState(null, '', newUrl);
        },
        [],
    );

    return (
        <>
            <button
                type="button"
                className="sidebar-toggle"
                aria-label="目次メニューを開閉する"
                aria-expanded={isOpen}
                aria-controls="guide-sidebar"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                &#9776;
            </button>
            <aside
                id="guide-sidebar"
                className={`sidebar ${isOpen ? 'open' : ''}`}
                aria-label="学習ガイド目次"
            >
                <p className="sidebar-title">目次</p>
                <nav aria-label="ページ内ナビゲーション">
                    <ul>
                        {NAV_ITEMS.map((item: NavItem) => (
                            <li key={item.id}>
                                <a
                                    href={`#${item.id}`}
                                    className={`nav-link ${item.level === 2 ? 'level-h2' : 'level-h3'} ${
                                        activeId === item.id ? 'active' : ''
                                    }`}
                                    onClick={(e) => handleLinkClick(e, item.id)}
                                >
                                    {item.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    );
}
