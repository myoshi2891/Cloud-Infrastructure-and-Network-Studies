'use client';

import { useEffect, useCallback } from 'react';
import { NAV_GROUPS } from './constants';

interface NavBarProps {
    isOpen: boolean;
    onClose: () => void;
}

/**
 * CCIE Service Provider ガイド用のサイドバー目次コンポーネント。
 * 目次は constants.ts の NAV_GROUPS から描画し、ScrollSpy・キーボードフォーカス連動・モバイル開閉制御を提供します。
 */
export function NavBar({ isOpen: _isOpen, onClose }: NavBarProps) {
    const handleLinkClick = useCallback((href: string) => {
        onClose();
        if (href.startsWith('#')) {
            const targetId = href.slice(1);
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                targetEl.tabIndex = -1;
                targetEl.focus({ preventScroll: true });
                targetEl.scrollIntoView?.({ behavior: 'instant' });
            }
        }
    }, [onClose]);

    useEffect(() => {
        if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;

        const sidebar = document.getElementById('sidebar');
        if (!sidebar) return;

        const itemOf = new Map<string, HTMLElement>();
        sidebar.querySelectorAll('a[href^="#"]').forEach((a) => {
            const li = a.closest('li');
            const href = a.getAttribute('href');
            if (li && href) {
                itemOf.set(href.slice(1), li as HTMLElement);
            }
        });

        const visible = new Set<Element>();
        const update = () => {
            if (!visible.size) return;
            const arr = Array.from(visible).sort((a, b) => {
                return (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) ? -1 : 1;
            });
            const last = arr[arr.length - 1];
            sidebar.querySelectorAll('li.active').forEach((l) => { l.classList.remove('active'); });
            const li = last ? itemOf.get(last.id) : undefined;
            if (!li) return;
            li.classList.add('active');
            const parent = li.parentElement && li.parentElement.closest('li');
            if (parent) parent.classList.add('active');
            const a = li.querySelector('a');
            if (a && typeof a.scrollIntoView === 'function') {
                a.scrollIntoView({ block: 'nearest' });
            }
        };

        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) visible.add(e.target);
                else visible.delete(e.target);
            });
            update();
        }, { rootMargin: '-20% 0px -70% 0px' });

        document.querySelectorAll('section[id], h2[id], h3[id]').forEach((s) => { io.observe(s); });

        return () => {
            io.disconnect();
        };
    }, []);

    return (
        <aside className="sidebar" id="sidebar">
            <div className="brand">
                <svg width="44" height="44" viewBox="0 0 44 44" role="img" aria-label="CCIE SP">
                    <circle cx="22" cy="22" r="20.5" fill="#FFFFFF" stroke="#2E3F72" strokeWidth="1.5" />
                    <circle cx="22" cy="22" r="16" fill="none" stroke="#B8802A" strokeWidth="1" />
                    <text x="22" y="27" textAnchor="middle" fontFamily="Source Serif 4, serif" fontSize="14" fontWeight="500" fill="#2E3F72">
                        SP
                    </text>
                </svg>{" "}
                <div>
                    <div className="brand-title">{"CCIE Service Provider"}</div>{" "}
                    <div className="brand-sub">{"完全ガイド"}</div>
                </div>
            </div>{" "}
            <nav aria-label="CCIE Service Provider 完全ガイド 目次">
                <ul>
                    {NAV_GROUPS.map((group) => {
                        const href = group.href || '#';
                        return (
                            <li key={href} className="ch">
                                <a href={href} onClick={() => handleLinkClick(href)}>
                                    {group.title}
                                </a>{" "}
                                {group.items.length > 0 && (
                                    <ul>
                                        {group.items.map((item) => (
                                            <li key={item.href}>
                                                <a href={item.href} onClick={() => handleLinkClick(item.href)}>
                                                    {item.title}
                                                </a>{" "}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
}
