'use client';

import { useEffect, useState, useCallback } from 'react';
import { NAV_ITEMS } from './constants';

interface NavBarProps {
    isOpen: boolean;
    onToggle: () => void;
    onClose: () => void;
}

/**
 * AIB-C01 Domain 1 のサイドバーナビゲーションコンポーネント。
 * デスクトップでは固定300px表示、モバイルではトグル開閉ドロワー。
 * スクロール位置に応じたアクティブ項目の自動更新（IntersectionObserver）とフォーカス移動を提供。
 */
export function NavBar({ isOpen, onToggle, onClose }: NavBarProps) {
    const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0]?.id ?? 'top');

    const handleLinkClick = useCallback(
        (id: string) => {
            setActiveId(id);
            onClose();
            const target = document.getElementById(id);
            if (target) {
                target.focus();
            }
        },
        [onClose]
    );

    useEffect(() => {
        if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
            return;
        }

        const elements = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
            (el): el is HTMLElement => el !== null
        );

        if (elements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                        break;
                    }
                }
            },
            {
                rootMargin: '-15% 0px -75% 0px',
                threshold: 0,
            }
        );

        elements.forEach((el) => observer.observe(el));

        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    return (
        <>
            <button
                type="button"
                className="sidebar-toggle"
                id="menuBtn"
                aria-label="メニュー"
                aria-controls="sidebar"
                aria-expanded={isOpen}
                onClick={onToggle}
            >
                ☰
            </button>
            <div
                className={`backdrop ${isOpen ? 'show' : ''}`}
                id="backdrop"
                onClick={onClose}
                aria-hidden="true"
            />
            <aside className={`sidebar ${isOpen ? 'open' : ''}`} id="sidebar">
                <div className="sidebar-header">
                    <div className="kicker">AWS Certified AI Business Strategist</div>
                    <h2>Domain 1: AI Fundamentals and Literacy</h2>
                </div>
                <nav id="sidebarNav" aria-label="セクション目次">
                    {NAV_ITEMS.map((item) => {
                        const isActive = activeId === item.id;
                        return (
                            <div key={item.id}>
                                {item.group && <div className="side-group">{item.group}</div>}
                                <a
                                    href={`#${item.id}`}
                                    className={`side-link ${item.isTop ? 'side-top' : ''} ${
                                        isActive ? 'active' : ''
                                    }`}
                                    onClick={() => handleLinkClick(item.id)}
                                >
                                    {item.title}
                                </a>
                            </div>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}
