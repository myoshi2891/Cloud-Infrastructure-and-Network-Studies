'use client';

import { useEffect, useCallback } from 'react';
import { NAV_ITEMS } from './constants';

interface NavBarProps {
    isOpen: boolean;
    onClose: () => void;
    onToggle: () => void;
}

/**
 * CCNP Enterprise ガイド用のサイドバー目次コンポーネント。
 */
export function NavBar({ isOpen, onClose, onToggle }: NavBarProps) {
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
            sidebar.querySelectorAll('li.active').forEach((l) => {
                l.classList.remove('active');
                l.querySelector('a')?.removeAttribute('aria-current');
            });
            const li = last ? itemOf.get(last.id) : undefined;
            if (!li) return;
            li.classList.add('active');
            const a = li.querySelector('a');
            if (a) {
                a.setAttribute('aria-current', 'location');
            }
        };

        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) visible.add(e.target);
                else visible.delete(e.target);
            });
            update();
        }, { rootMargin: '-20% 0px -70% 0px' });

        itemOf.forEach((_, id) => {
            const el = document.getElementById(id);
            if (el) io.observe(el);
        });

        return () => io.disconnect();
    }, []);

    return (
        <>
            <button
                type="button"
                className="menu-toggle"
                onClick={onToggle}
                aria-label="目次を開閉"
                aria-expanded={isOpen}
            >
                <i className="ti ti-menu-2" />
            </button>
            <aside id="sidebar" className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="brand">
                    <span className="badge">CCNP Enterprise</span>
                    <span className="brand-sub">学習ガイド</span>
                </div>
                <nav aria-label="ページ内目次">
                    <ul>
                        {NAV_ITEMS.map((item) => (
                            <li
                                key={item.href}
                                className={item.isChapter ? 'g' : 'sub'}
                            >
                                <a
                                    href={item.href}
                                    onClick={() => handleLinkClick(item.href)}
                                >
                                    {item.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    );
}
