'use client';

import { useEffect, useState, useTransition } from 'react';
import { NAV_ITEMS, type NavItem } from './constants';

interface NavBarProps {
    isOpen: boolean;
    onClose: () => void;
}

/**
 * AIB-C01 Domain 3 サイドバーナビゲーションコンポーネント。
 * スクロール位置に応じたアクティブ項目のハイライト、URLハッシュ同期、キーボードフォーカス管理を提供。
 */
export function NavBar({ isOpen: _isOpen, onClose }: NavBarProps) {
    const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0]?.id ?? '');
    const [, startTransition] = useTransition();

    useEffect(() => {
        if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
            return;
        }

        // 監視対象のセクションID一覧を導出
        const sectionIds = NAV_ITEMS.flatMap((item) => {
            const ids = [item.id];
            if (item.subItems) {
                ids.push(...item.subItems.map((s) => s.id));
            }
            return ids;
        });

        const elements = sectionIds
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null);

        const observer = new IntersectionObserver(
            (entries) => {
                const intersecting = entries.filter((e) => e.isIntersecting);
                if (intersecting.length > 0) {
                    const topEntry = intersecting[0];
                    if (topEntry?.target.id) {
                        startTransition(() => {
                            setActiveId(topEntry.target.id);
                        });
                    }
                }
            },
            {
                rootMargin: '-20% 0px -70% 0px',
            },
        );

        elements.forEach((el) => observer.observe(el));

        return () => {
            observer.disconnect();
        };
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const target = document.getElementById(id);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState(null, '', `#${id}`);
            target.focus({ preventScroll: true });
        }
        onClose();
    };

    return (
        <nav className="sidebar" id="sidebar" aria-label="目次ナビゲーション">
            <div className="brand">
                <i className="ti ti-shield-check"></i><span>AIB-C01 Domain 3<br />責任ある AI とガバナンス</span>
            </div>
            <ul className="nav">
                {NAV_ITEMS.map((item: NavItem) => {
                    const isParentActive =
                        activeId === item.id ||
                        (item.subItems?.some((sub) => sub.id === activeId) ?? false);

                    return (
                        <li key={item.id}>
                            <a
                                className={isParentActive ? 'active' : ''}
                                href={`#${item.id}`}
                                onClick={(e) => handleClick(e, item.id)}
                            >
                                {item.icon && <i className={item.icon}></i>}
                                <span>{item.label}</span>
                            </a>
                            {item.subItems && item.subItems.length > 0 && (
                                <ul className="sub">
                                    {item.subItems.map((sub) => (
                                        <li key={sub.id}>
                                            <a
                                                className={activeId === sub.id ? 'active' : ''}
                                                href={`#${sub.id}`}
                                                onClick={(e) => handleClick(e, sub.id)}
                                            >
                                                {sub.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
