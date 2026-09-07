'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { NAV_ITEMS, type NavItem } from './constants';

const SECTION_IDS: readonly string[] = NAV_ITEMS.map((item) => item.id);
const DEFAULT_ACTIVE_ID = NAV_ITEMS[0]?.id ?? 'overview';

/**
 * Resolves the current URL hash to a valid navigation section ID.
 *
 * Returns `null` during server-side rendering, for unknown section IDs, or for malformed percent escapes.
 *
 * @returns The matching section ID, or `null` when the hash does not identify a valid section.
 */
function readHashSectionId(): string | null {
    if (typeof window === 'undefined') return null;
    const raw = window.location.hash.replace(/^#/, '');
    let id: string;
    try {
        id = decodeURIComponent(raw);
    } catch (error) {
        if (error instanceof URIError) return null;
        throw error;
    }
    return SECTION_IDS.includes(id) ? id : null;
}

/**
 * Domain 2.0 ネットワーク実装ガイドのサイドバーナビゲーションを表示します。
 *
 * スクロール位置、URLハッシュ、リンク操作に応じてアクティブなセクションを更新し、
 * モバイル表示ではサイドバーの開閉を管理します。
 */
export function NavBar() {
    const [activeId, setActiveId] = useState<string>(DEFAULT_ACTIVE_ID);
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);

    useEffect(() => {
        const syncFromHash = () => {
            const id = readHashSectionId();
            if (id !== null) setActiveId(id);
        };

        syncFromHash();
        window.addEventListener('hashchange', syncFromHash);
        window.addEventListener('popstate', syncFromHash);

        return () => {
            window.removeEventListener('hashchange', syncFromHash);
            window.removeEventListener('popstate', syncFromHash);
        };
    }, []);

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        const elements = SECTION_IDS
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null);

        if (elements.length === 0) return;

        const intersectingTopMap = new Map<string, number>();

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    const id = entry.target.id;
                    if (entry.isIntersecting) {
                        intersectingTopMap.set(id, entry.boundingClientRect.top);
                    } else {
                        intersectingTopMap.delete(id);
                    }
                }

                if (intersectingTopMap.size === 0) return;

                let topMostId: string | null = null;
                let minTop = Number.POSITIVE_INFINITY;
                for (const [id, top] of intersectingTopMap.entries()) {
                    if (top < minTop) {
                        minTop = top;
                        topMostId = id;
                    }
                }

                if (topMostId !== null) {
                    setActiveId(topMostId);
                }
            },
            {
                rootMargin: '-80px 0px -60% 0px',
                threshold: [0, 0.25, 0.5, 0.75, 1],
            },
        );

        for (const el of elements) {
            observer.observe(el);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
            e.preventDefault();
            setActiveId(id);
            setMobileOpen(false);

            if (typeof window !== 'undefined') {
                window.history.pushState(null, '', `#${id}`);
                const target = document.getElementById(id);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    target.focus({ preventScroll: true });
                }
            }
        },
        [],
    );

    const toggleMobile = useCallback(() => {
        setMobileOpen((prev) => !prev);
    }, []);

    return (
        <>
            <button
                type="button"
                className="mobile-nav-toggle"
                onClick={toggleMobile}
                aria-expanded={mobileOpen}
                aria-controls="guide-sidebar"
                aria-label="目次メニューの開閉"
            >
                <i className={`ti ${mobileOpen ? 'ti-x' : 'ti-menu-2'}`}></i>
                <span>目次</span>
            </button>

            <aside
                id="guide-sidebar"
                className={`sidebar ${mobileOpen ? 'open' : ''}`}
                aria-label="Domain 2.0 目次"
            >
                <div className="sidebar-brand">
                    <i className="ti ti-certificate"></i>
                    <span>Network+ Guide</span>
                </div>
                <div className="sidebar-title">目次｜Domain 2.0</div>
                <nav className="nav-group" aria-label="セクション目次">
                    {NAV_ITEMS.map((item: NavItem) => {
                        const isActive = activeId === item.id;
                        return (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                className={`nav-item ${isActive ? 'active' : ''}`}
                                onClick={(e) => handleClick(e, item.id)}
                                aria-current={isActive ? 'location' : undefined}
                            >
                                {item.num !== '' && (
                                    <span className={`nav-num ${item.numClass ?? ''}`}>
                                        {item.num}
                                    </span>
                                )}
                                {item.icon && <i className={`ti ${item.icon}`}></i>}
                                <span>{item.title}</span>
                                {item.badge && <span className="nav-badge">{item.badge}</span>}
                            </a>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}
