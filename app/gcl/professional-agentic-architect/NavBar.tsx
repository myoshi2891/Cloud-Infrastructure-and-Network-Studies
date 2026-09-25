'use client';

import { Fragment, useEffect, useState } from 'react';
import { NAV_ITEMS } from './constants';

const sanitizeHash = (hash: string): string | null => {
    try {
        return decodeURIComponent(hash.replace(/^#/, ''));
    } catch {
        return null;
    }
};

/**
 * Google Cloud Professional Agentic Architect 認定試験 技術ガイド サイドバーナビゲーション
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

    const toggleSidebar = () => {
        setIsOpen((prev) => !prev);
    };

    const handleLinkClick = (id: string) => {
        setActiveId(id);
        setIsOpen(false);
    };

    return (
        <>
            <button
                className="sidebar-toggle"
                id="sidebarToggle"
                type="button"
                aria-label="メニュー"
                aria-controls="sidebar"
                aria-expanded={isOpen}
                onClick={toggleSidebar}
            >
                ☰
            </button>
            <aside className={`sidebar ${isOpen ? 'open' : ''}`} id="sidebar">
                <div className="sidebar-header">
                    <div className="kicker">Google Cloud</div>
                    {" "}
                    <h2>Professional Agentic Architect</h2>
                </div>
                <nav id="sidebarNav">
                    {NAV_ITEMS.map((item) => (
                        <Fragment key={item.id}>
                            {" "}
                            <a
                                href={`#${item.id}`}
                                className={`${item.level === 3 ? 'lvl3' : ''} ${activeId === item.id ? 'active' : ''}`.trim()}
                                onClick={() => handleLinkClick(item.id)}
                            >
                                {item.title}
                            </a>
                        </Fragment>
                    ))}
                </nav>
            </aside>
        </>
    );
}
