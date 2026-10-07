'use client';

import { useEffect, useState, useCallback } from 'react';
import { NAV_ITEMS } from './constants';

interface NavBarProps {
    isOpen: boolean;
    onToggle: (open: boolean) => void;
}

/**
 * AWS CloudOps ガイド用サイドバー目次ナビゲーション。
 * 280px サイドバー契約、アクセシビリティ（nav, button, aria）、
 * IntersectionObserver によるスクロールスパイおよびモバイルドロワーに対応。
 */
export default function NavBar({ isOpen, onToggle }: NavBarProps) {
    const [activeId, setActiveId] = useState<string>(
        NAV_ITEMS[0]?.href.slice(1) ?? 's-h2-1',
    );

    const handleLinkClick = useCallback(
        (href: string) => {
            onToggle(false);
            const targetId = href.slice(1);
            setActiveId(targetId);
            if (typeof window !== 'undefined') {
                window.history.pushState(null, '', href);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.setAttribute('tabindex', '-1');
                    targetElement.focus();
                }
            }
        },
        [onToggle],
    );

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

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
                rootMargin: '-80px 0px -70% 0px',
                threshold: 0,
            },
        );

        NAV_ITEMS.forEach((item) => {
            const id = item.href.slice(1);
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <button
                className="menu-btn"
                id="menuBtn"
                type="button"
                aria-label="目次メニューを開閉"
                aria-controls="sidebar"
                aria-expanded={isOpen}
                onClick={() => onToggle(!isOpen)}
            >
                ☰
            </button>
            <div
                className="backdrop"
                id="backdrop"
                onClick={() => onToggle(false)}
            />
            <aside className="sidebar" id="sidebar">
                <div className="sidebar-head">
                    <div className="kicker">AWS CloudOps Engineer</div>
                    <div className="sb-title">SOA-C03 学習ガイド</div>
                </div>
                <nav id="sidebarNav" aria-label="ガイド目次">
                    <ul>
                        {NAV_ITEMS.map((item) => {
                            const id = item.href.slice(1);
                            const isActive = activeId === id;
                            const levelClass =
                                item.level === 1
                                    ? 'lvl1'
                                    : item.level === 2
                                      ? 'lvl2'
                                      : 'lvl3';
                            return (
                                <li key={item.href}>
                                    <a
                                        href={item.href}
                                        className={`${levelClass} ${isActive ? 'active' : ''}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleLinkClick(item.href);
                                            const el = document.getElementById(id);
                                            if (el) {
                                                el.scrollIntoView({ behavior: 'smooth' });
                                            }
                                        }}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </aside>
        </>
    );
}
