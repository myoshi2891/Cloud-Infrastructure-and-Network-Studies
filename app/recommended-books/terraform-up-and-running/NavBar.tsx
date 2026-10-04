// app/recommended-books/terraform-up-and-running/NavBar.tsx
'use client';

import { useEffect, useState } from 'react';
import { NAV_ITEMS, type NavItem } from './constants';

interface NavBarProps {
    isOpen: boolean;
    onToggle: () => void;
    onClose: () => void;
}

/**
 * Terraform: Up and Running 実践ガイドのサイドバー目次コンポーネント。
 * スクロール位置に追従する ScrollSpy とモバイル用ドロワー開閉機能を提供します。
 */
export function NavBar({ isOpen, onToggle, onClose }: NavBarProps) {
    const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0]?.target ?? '');

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        const targets = NAV_ITEMS.map((item) => item.target);
        const elements = targets
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null);

        if (elements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                }
            },
            { rootMargin: '-15% 0px -75% 0px', threshold: 0 },
        );

        elements.forEach((el) => observer.observe(el));

        return () => {
            observer.disconnect();
        };
    }, []);

    const handleLinkClick = (href: string, targetId: string) => {
        onClose();
        setActiveId(targetId);
        window.history.pushState(null, '', href);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.focus();
        }
    };

    return (
        <>
            <button
                type="button"
                className="sidebar-toggle"
                onClick={onToggle}
                aria-expanded={isOpen}
                aria-controls="sidebar"
                aria-label="目次を開閉"
            >
                ☰
            </button>
            <nav
                className={`sidebar ${isOpen ? 'open' : ''}`}
                id="sidebar"
                aria-label="目次"
            >
                <div className="sidebar-title">目次</div>
                <ul className="sidebar-nav">
                    {NAV_ITEMS.map((item: NavItem) => {
                        const isActive = activeId === item.target;
                        const className = `nav-link ${item.isH2 ? 'nav-h2' : 'nav-h3'} ${isActive ? 'active' : ''}`;
                        return (
                            <li key={item.target}>
                                <a
                                    href={item.href}
                                    className={className}
                                    data-target={item.target}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleLinkClick(item.href, item.target);
                                    }}
                                >
                                    {item.text}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </>
    );
}
