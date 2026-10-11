'use client';

import { useEffect, useState } from 'react';
import { NAV_ITEMS } from './constants';

interface NavBarProps {
    onLinkClick?: () => void;
}

export const NavBar = ({ onLinkClick }: NavBarProps) => {
    const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0]?.id ?? 's2');

    useEffect(() => {
        if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
            return;
        }

        const sectionIds = NAV_ITEMS.map((item) => item.id);
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-80px 0px -75% 0px',
                threshold: 0,
            },
        );

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        if (onLinkClick) {
            onLinkClick();
        }
        const target = document.getElementById(id);
        if (target) {
            // 見出し等の非インタラクティブ要素はそのままでは focus() が無視されるため、プログラム的にフォーカス可能にする
            if (!target.hasAttribute('tabindex')) {
                target.setAttribute('tabindex', '-1');
            }
            target.focus();
        }
    };

    return (
        <aside className="sidebar">
            <p className="brand">AIB-C01 完全ガイド</p>{' '}
            <nav aria-label="ページ内目次">
                {NAV_ITEMS.map((item) => {
                    const isActive = activeId === item.id;
                    const className = item.isGroup
                        ? `grp ${isActive ? 'on' : ''}`.trim()
                        : (isActive ? 'on' : '');

                    return (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={className || undefined}
                            onClick={(e) => handleClick(e, item.id)}
                        >
                            {item.title}
                        </a>
                    );
                })}
            </nav>
        </aside>
    );
};
