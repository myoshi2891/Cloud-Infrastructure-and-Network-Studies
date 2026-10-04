'use client';

import { useCallback, useEffect, useState } from 'react';
import { NAV_ITEMS } from './constants';

/**
 * サイドバーナビゲーションコンポーネント。
 * 単一正本配列 NAV_ITEMS から導出し、モバイル開閉、Escapeキー対応、
 * スクロールスパイ、キーボードアクセシビリティを提供します。
 */
export function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0]?.id ?? 'part0');

    const toggleSidebar = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const closeSidebar = useCallback(() => {
        setIsOpen(false);
    }, []);

    // Escape キーでサイドバーを閉じる
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                closeSidebar();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, closeSidebar]);

    // スクロールスパイ (IntersectionObserver)
    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-15% 0px -75% 0px', threshold: 0 },
        );

        NAV_ITEMS.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const handleLinkClick = (id: string) => {
        closeSidebar();
        setActiveId(id);
        const target = document.getElementById(id);
        if (target) {
            target.focus();
        }
    };

    return (
        <>
            <button
                type="button"
                className="sidebar-toggle"
                aria-expanded={isOpen}
                aria-controls="sidebar"
                aria-label="目次を開閉"
                onClick={toggleSidebar}
            >
                ☰
            </button>
            <aside id="sidebar" className={`sidebar ${isOpen ? 'open' : ''}`} aria-label="ガイドの目次">
                <div className="sidebar-header">
                    <div className="kicker">TCP/IP Illustrated</div>{' '}
                    <h2>Volume 1: The Protocols（第2版）</h2>{' '}
                </div>
                <nav aria-label="セクション目次">
                    <ul>
                        {NAV_ITEMS.map((item) => {
                            const isActive = activeId === item.id;
                            const className = `${isActive ? 'active' : ''} ${item.isSub ? 'lvl3' : ''}`.trim();
                            return (
                                <li key={item.id}>
                                    <a
                                        href={`#${item.id}`}
                                        className={className || undefined}
                                        aria-current={isActive ? 'location' : undefined}
                                        onClick={() => handleLinkClick(item.id)}
                                    >
                                        {item.label}
                                    </a>{' '}
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </aside>
        </>
    );
}
