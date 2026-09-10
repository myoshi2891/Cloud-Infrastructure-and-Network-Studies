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
 * コンピュータネットワーク入門ガイド サイドバーナビゲーション
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

        // 交差中の id のみを保持する。top はコールバック時点の値が
        // スクロールにより陳腐化するため保存せず、判定時に再計測する。
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

                // ビューポート上端以下にある交差要素のうち最も上のものを優先する。
                // 上端を越えて上へ抜けた要素（top < 0）は、他に候補がない場合のみ
                // 上端に最も近いものを採用する。
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
            const target = document.getElementById(id);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                target.focus({ preventScroll: true });
            }
            const hash = `#${encodeURIComponent(id)}`;
            if (window.location.hash !== hash) {
                window.history.pushState(null, '', hash);
            }
            setActiveId(id);
            setIsOpen(false);
        },
        [],
    );

    return (
        <>
            <button
                className="sidebar-toggle"
                id="sidebarToggle"
                type="button"
                aria-label="メニューを開閉"
                aria-controls="sidebar"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                ☰
            </button>
            <aside className={`sidebar ${isOpen ? 'open' : ''}`} id="sidebar">
                <div className="sidebar-header">
                    <div className="kicker">Computer Networking</div>{' '}
                    <h2>トップダウンアプローチ入門ガイド</h2>
                </div>{' '}
                <nav id="sidebarNav" aria-label="コンピュータネットワーク学習ガイド目次">
                    {NAV_ITEMS.map((item) => (
                        <span key={item.id}>
                            <a
                                href={`#${item.id}`}
                                className={`${item.lvl3 ? 'lvl3' : ''} ${activeId === item.id ? 'active' : ''}`}
                                aria-current={activeId === item.id ? 'location' : undefined}
                                onClick={(e) => handleLinkClick(e, item.id)}
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
