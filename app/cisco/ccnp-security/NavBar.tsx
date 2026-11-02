'use client';

import { useEffect, useState, useCallback } from 'react';
import { NAV_GROUPS } from './constants';

interface NavBarProps {
    isOpen: boolean;
    onClose: () => void;
}

/**
 * CCNP Security ガイド用のサイドバー目次コンポーネント。
 * ScrollSpy、キーボードフォーカス連動、モバイル開閉制御を提供します。
 */
export function NavBar({ isOpen, onClose }: NavBarProps) {
    const [activeId, setActiveId] = useState<string>('s1');

    const handleLinkClick = useCallback((href: string) => {
        onClose();
        if (href.startsWith('#')) {
            const targetId = href.slice(1);
            setActiveId(targetId);
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                targetEl.tabIndex = -1;
                targetEl.focus();
            }
        }
    }, [onClose]);

    useEffect(() => {
        if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;

        const visible = new Set<Element>();
        const itemOf = new Map<string, string>();

        NAV_GROUPS.forEach((group) => {
            group.items.forEach((item) => {
                if (item.href.startsWith('#')) {
                    itemOf.set(item.href.slice(1), item.href.slice(1));
                }
                item.subItems?.forEach((sub) => {
                    if (sub.href.startsWith('#')) {
                        itemOf.set(sub.href.slice(1), sub.href.slice(1));
                    }
                });
            });
        });

        const updateActive = () => {
            if (!visible.size) return;
            const arr = Array.from(visible).sort((a, b) => {
                return (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) ? -1 : 1;
            });
            const last = arr[arr.length - 1];
            if (last?.id) {
                setActiveId(last.id);
            }
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        visible.add(entry.target);
                    } else {
                        visible.delete(entry.target);
                    }
                });
                updateActive();
            },
            { rootMargin: '-20% 0px -70% 0px' },
        );

        document.querySelectorAll('section[id], header.part[id]').forEach((sec) => {
            observer.observe(sec);
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <aside className="sidebar" id="sidebar" aria-label="目次ナビゲーション">
            <div className="brand">
                <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
                    <path
                        d="M20 3 L35 9 V20 C35 28 28.500 34 20 37 C11.500 34 5 28 5 20 V9 Z"
                        fill="#EEF1F8"
                        stroke="#2E3F72"
                        strokeWidth="2"
                    />
                    <path
                        d="M13 20 L18 25 L27 15"
                        fill="none"
                        stroke="#B8802A"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <b>CCNP Security<br />学習ガイド</b>
            </div>
            <nav aria-label="ガイド目次">
                {NAV_GROUPS.map((group, gIdx) => (
                    <div key={gIdx}>
                        <div className={`nav-group ${group.href ? '' : 'nav-plain'}`}>
                            {group.href ? (
                                <a
                                    href={group.href}
                                    onClick={() => group.href && handleLinkClick(group.href)}
                                >
                                    {group.title}
                                </a>
                            ) : (
                                group.title
                            )}
                        </div>
                        <ul>
                            {group.items.map((item, iIdx) => {
                                const itemId = item.href.slice(1);
                                const isItemActive = activeId === itemId;
                                const isSubActive = item.subItems?.some(
                                    (sub) => activeId === sub.href.slice(1),
                                );
                                const isActive = isItemActive || isSubActive;

                                return (
                                    <li key={iIdx} className={isActive ? 'active' : ''}>
                                        <a
                                            href={item.href}
                                            onClick={() => handleLinkClick(item.href)}
                                        >
                                            {item.title}
                                        </a>
                                        {item.subItems && (
                                            <ul className="sub">
                                                {item.subItems.map((sub, sIdx) => {
                                                    const subId = sub.href.slice(1);
                                                    const isSubItemActive = activeId === subId;
                                                    return (
                                                        <li
                                                            key={sIdx}
                                                            className={isSubItemActive ? 'active' : ''}
                                                        >
                                                            <a
                                                                href={sub.href}
                                                                onClick={() => handleLinkClick(sub.href)}
                                                            >
                                                                {sub.title}
                                                            </a>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </nav>
        </aside>
    );
}
