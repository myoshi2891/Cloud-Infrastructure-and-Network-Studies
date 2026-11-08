'use client';

import { useEffect, useCallback } from 'react';
import { NAV_ITEMS } from './constants';

interface NavBarProps {
    isOpen: boolean;
    onClose: () => void;
    onToggle: () => void;
}

/**
 * CCNP Collaboration ガイド用のサイドバー目次コンポーネント。
 * 目次は constants.ts の NAV_ITEMS から描画し、ScrollSpy・キーボードフォーカス連動・モバイル開閉制御を提供します。
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
                if (typeof a.scrollIntoView === 'function') {
                    a.scrollIntoView({ block: 'nearest' });
                }
            }
        };

        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) visible.add(e.target);
                else visible.delete(e.target);
            });
            update();
        }, { rootMargin: '-20% 0px -70% 0px' });

        document.querySelectorAll('section[id], header[id]').forEach((s) => { io.observe(s); });

        return () => {
            io.disconnect();
        };
    }, []);

    // Escape キーで閉じて開閉ボタンへフォーカスを戻す
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
                const toggle = document.querySelector('.nav-toggle') as HTMLButtonElement | null;
                toggle?.focus();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    return (
        <aside className={`sidebar ${isOpen ? 'open' : ''}`} id="sidebar">
            <button
                className="nav-toggle"
                type="button"
                aria-expanded={isOpen}
                aria-controls="nav"
                onClick={onToggle}
            >
                <i className="ti ti-menu-2"></i>メニュー
            </button>
            <div className="brand">
                <svg viewBox="0 0 48 48" width="40" height="40" aria-hidden="true">
                    <circle cx="24" cy="24" r="21" fill="none" stroke="currentColor" strokeWidth="2"></circle>
                    <circle cx="24" cy="24" r="16" fill="none" stroke="currentColor" strokeWidth="1"></circle>
                    <text x="24" y="29" textAnchor="middle" fontSize="12" fill="currentColor">
                        CCNP
                    </text>
                </svg>
                <div>
                    <div className="brand-name">CCNP Collaboration</div>
                    <div className="brand-sub">学習ガイド</div>
                </div>
            </div>{" "}
            <nav id="nav" aria-label="CCNP Collaboration 学習ガイド 目次">
                <ul>
                    {NAV_ITEMS.map((item) => (
                        <li key={item.href} className={item.isPart ? 'part' : 'chap'}>
                            <a
                                href={item.href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleLinkClick(item.href);
                                    // URL ハッシュを更新
                                    window.history.pushState(null, '', item.href);
                                    // テスト用: 即時 active 付与
                                    const li = (e.currentTarget as HTMLElement).closest('li');
                                    document.querySelectorAll('#sidebar li.active').forEach((l) => {
                                        l.classList.remove('active');
                                        l.querySelector('a')?.removeAttribute('aria-current');
                                    });
                                    li?.classList.add('active');
                                    e.currentTarget.setAttribute('aria-current', 'location');
                                }}
                            >
                                {item.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}

