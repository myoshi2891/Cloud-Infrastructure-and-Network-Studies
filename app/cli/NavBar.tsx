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
 * CLIコマンド実践ワンライナー集 サイドバーナビゲーションコンポーネント
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

        const buildObserver = () => {
            const visibleIds = new Set<string>();
            const bottomPx = Math.max(0, window.innerHeight - 160);
            const obs = new IntersectionObserver(
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
                    rootMargin: `-80px 0px -${bottomPx}px 0px`,
                    threshold: [0, 0.25, 0.5, 0.75, 1],
                },
            );

            for (const item of NAV_ITEMS) {
                const el = document.getElementById(item.id);
                if (el) {
                    obs.observe(el);
                }
            }

            return obs;
        };

        let observer = buildObserver();

        const handleResize = () => {
            observer.disconnect();
            observer = buildObserver();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            observer.disconnect();
        };
    }, []);

    const handleLinkClick = (id: string) => {
        setActiveId(id);
        setIsOpen(false);
        const el = document.getElementById(id);
        if (el) {
            el.tabIndex = -1;
            el.focus({ preventScroll: true });
        }
    };

    return (
        <>
            <button
                type="button"
                id="sidebarToggle"
                className="sidebar-toggle"
                aria-label="目次を開閉"
                aria-expanded={isOpen}
                aria-controls="sidebar"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                ☰
            </button>
            <nav id="sidebar" className={`sidebar ${isOpen ? 'open' : ''}`} aria-label="サイドバーナビゲーション">
                <div className="brand">CLIワンライナー実践ガイド</div>
                <div className="brand-sub">日常の開発・トラブルシューティングで使う実践コマンド集</div>
                <ul className="toc">
                        {NAV_ITEMS.map((item) => (
                            <li key={item.id}>
                                <a
                                    href={`#${item.id}`}
                                    className={activeId === item.id ? 'active' : ''}
                                    onClick={() => handleLinkClick(item.id)}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
            </nav>
        </>
    );
}
