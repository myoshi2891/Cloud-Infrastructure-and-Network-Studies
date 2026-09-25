'use client';

import { useEffect, useState } from 'react';
import { NAV_ITEMS } from './constants';

const sanitizeHash = (hash: string): string | null => {
    try {
        return decodeURIComponent(hash.replace(/^#/, ''));
    } catch {
        return null;
    }
};

/**
 * Professional Agentic Architect Section 2 サイドバーナビゲーションコンポーネント
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

    const handleLinkClick = (id: string) => {
        setActiveId(id);
        setIsOpen(false);
        const target = document.getElementById(id);
        if (target) {
            if (!target.hasAttribute('tabindex')) {
                target.setAttribute('tabindex', '-1');
            }
            target.focus();
        }
    };

    return (
        <>
            <button
                className="sidebar-toggle"
                id="sidebarToggle"
                type="button"
                aria-label="目次メニューを開閉"
                aria-controls="sidebar"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                ☰
            </button>
            <aside
                className={`sidebar ${isOpen ? 'open' : ''}`}
                id="sidebar"
                aria-label="セクションナビゲーション"
            >
                <div className="sidebar-header">
                    <div className="kicker">Google Cloud Agentic Architect</div>{' '}
                    <h2>Section 2: コーディングエージェントの活用</h2>
                </div>{' '}
                <nav id="sidebarNav" aria-label="ページ内目次">
                    {NAV_ITEMS.map((item) => (
                        <span key={item.id}>
                            <a
                                href={`#${item.id}`}
                                className={`${activeId === item.id ? 'active' : ''} ${item.lvl3 ? 'lvl3' : ''}`}
                                onClick={() => handleLinkClick(item.id)}
                            >
                                {item.label}
                            </a>{' '}
                        </span>
                    ))}
                </nav>
            </aside>
        </>
    );
}
