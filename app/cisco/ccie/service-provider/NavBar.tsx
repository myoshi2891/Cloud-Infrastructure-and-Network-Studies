'use client';

import { useEffect, useCallback } from 'react';
import { NAV_GROUPS } from './constants';

interface NavBarProps {
    onClose: () => void;
}

/**
 * CCIE Service Provider ガイド用のサイドバー目次コンポーネント。
 * 目次は constants.ts の NAV_GROUPS から描画し、ScrollSpy・サブ階層展開（li.open）・キーボードフォーカス連動・モバイル開閉制御を提供します。
 */
export function NavBar({ onClose }: NavBarProps) {
    const activateTargetId = useCallback((id: string, scrollIntoSidebarView = false) => {
        if (typeof document === 'undefined') return;
        const sidebar = document.getElementById('sidebar');
        if (!sidebar) return;

        const targetAnchor = [...sidebar.querySelectorAll<HTMLAnchorElement>('nav a')].find(
            (anchor) => anchor.getAttribute('href') === `#${id}`,
        );
        if (!targetAnchor) return;

        sidebar.querySelectorAll('nav a.active').forEach((a) => {
            a.classList.remove('active');
            a.removeAttribute('aria-current');
        });
        sidebar.querySelectorAll('nav li.active, nav li.open').forEach((li) => {
            li.classList.remove('active', 'open');
        });

        targetAnchor.classList.add('active');
        targetAnchor.setAttribute('aria-current', 'location');

        const ownLi = targetAnchor.closest('li');
        if (ownLi) ownLi.classList.add('active');

        const parentCh = targetAnchor.closest('li.ch');
        if (parentCh) {
            parentCh.classList.add('open', 'active');
            const chAnchor = parentCh.querySelector<HTMLAnchorElement>(':scope > a');
            if (chAnchor && chAnchor !== targetAnchor) {
                chAnchor.classList.add('active');
            }
        }

        if (scrollIntoSidebarView && typeof targetAnchor.scrollIntoView === 'function') {
            targetAnchor.scrollIntoView({ block: 'nearest' });
        }
    }, []);

    const handleLinkClick = useCallback((href: string) => {
        onClose();
        if (href.startsWith('#')) {
            const targetId = href.slice(1);
            activateTargetId(targetId, false);
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                targetEl.tabIndex = -1;
                targetEl.focus({ preventScroll: true });
                targetEl.scrollIntoView?.({ behavior: 'instant' });
            }
        }
    }, [onClose, activateTargetId]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const initialHash = window.location.hash.replace(/^#/, '');
        if (initialHash) {
            activateTargetId(initialHash, true);
        } else {
            const firstHref = NAV_GROUPS[0]?.href;
            if (firstHref?.startsWith('#') && firstHref.length > 1) {
                activateTargetId(firstHref.slice(1), false);
            }
        }

        if (typeof IntersectionObserver === 'undefined') return;

        const sidebar = document.getElementById('sidebar');
        if (!sidebar) return;

        const knownIds = new Set<string>();
        sidebar.querySelectorAll<HTMLAnchorElement>('nav a[href^="#"]').forEach((a) => {
            const href = a.getAttribute('href');
            if (href && href.length > 1) {
                knownIds.add(href.slice(1));
            }
        });

        const visible = new Set<Element>();
        const update = () => {
            if (!visible.size) return;
            const arr = Array.from(visible).sort((a, b) => {
                return (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) ? -1 : 1;
            });
            const last = arr[arr.length - 1];
            if (last?.id) {
                activateTargetId(last.id, true);
            }
        };

        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) visible.add(e.target);
                else visible.delete(e.target);
            });
            update();
        }, { rootMargin: '-18% 0px -70% 0px' });

        document.querySelectorAll('main .chapter > h2[id], main h3[id], section[id]').forEach((s) => {
            if (s.id && knownIds.has(s.id)) {
                io.observe(s);
            }
        });

        return () => {
            io.disconnect();
        };
    }, [activateTargetId]);

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
