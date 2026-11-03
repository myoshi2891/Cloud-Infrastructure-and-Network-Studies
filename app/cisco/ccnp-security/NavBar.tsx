'use client';

import { Fragment, useEffect, useCallback } from 'react';
import { NAV_GROUPS } from './constants';

interface NavBarProps {
    isOpen: boolean;
    onClose: () => void;
}

/**
 * CCNP Security ガイド用のサイドバー目次コンポーネント。
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
                targetEl.focus();
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

        document.querySelectorAll('section[id]').forEach((s) => { io.observe(s); });

        return () => {
            io.disconnect();
        };
    }, []);

    // 原本の目次は項目間に空白テキストを持つため、{" "} で区切りを保持する（本文 fixture の annotation と一致させる）
    return (
        <aside className="sidebar" id="sidebar">
            <div className="brand">
                <svg aria-hidden="true" width="40" height="40" viewBox="0 0 40 40"><path d="M20 3 L35 9 V20 C35 28 28.500 34 20 37 C11.500 34 5 28 5 20 V9 Z" fill="#EEF1F8" stroke="#2E3F72" strokeWidth="2"></path><path d="M13 20 L18 25 L27 15" fill="none" stroke="#B8802A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                <b>{"CCNP Security"}<br />{"学習ガイド"}</b>
            </div>{" "}
            <nav aria-label="CCNP Security 学習ガイド 目次">
                {NAV_GROUPS.map((group) => {
                    const groupHref = group.href;
                    return (
                        <Fragment key={groupHref ?? group.title}>
                            {groupHref ? (
                                <><div className="nav-group"><a href={groupHref} onClick={() => handleLinkClick(groupHref)}>{group.title}</a></div>{" "}</>
                            ) : (
                                <><div className="nav-group nav-plain">{group.title}</div>{" "}</>
                            )}
                            <ul>
                                {group.items.map((item) => (
                                    <li key={item.href}>
                                        <a href={item.href} onClick={() => handleLinkClick(item.href)}>{item.title}</a>{" "}
                                        {item.subItems ? (
                                            <ul className="sub">
                                                {item.subItems.map((sub) => (
                                                    <li key={sub.href}><a href={sub.href} onClick={() => handleLinkClick(sub.href)}>{sub.title}</a>{" "}</li>
                                                ))}
                                            </ul>
                                        ) : null}
                                    </li>
                                ))}
                            </ul>
                        </Fragment>
                    );
                })}
            </nav>
        </aside>
    );
}
