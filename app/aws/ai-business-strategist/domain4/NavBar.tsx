'use client';

import { useEffect, useState, useTransition } from 'react';
import { NAV_ITEMS, type NavItem } from './constants';

interface NavBarProps {
    isOpen: boolean;
    onClose: () => void;
}

/**
 * AIB-C01 Domain 4 サイドバーナビゲーションコンポーネント。
 * スクロール位置に応じたアクティブ項目のハイライト、URLハッシュ同期、キーボードフォーカス管理を提供。
 */
export function NavBar({ isOpen: _isOpen, onClose }: NavBarProps) {
    const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0]?.id ?? '');
    const [, startTransition] = useTransition();

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        const syncFromHash = () => {
            let hashId = window.location.hash.slice(1);
            try {
                hashId = decodeURIComponent(hashId);
            } catch {
                // 不正なエンコードはそのまま扱い、一致しなければ無視する
            }
            if (
                hashId &&
                NAV_ITEMS.some(
                    (item) => item.id === hashId || item.subItems?.some((s) => s.id === hashId),
                )
            ) {
                setActiveId(hashId);
            }
        };
        // 初期ハッシュはエフェクト本体で同期的にsetStateせず、コールバック経由で反映する
        const timer = window.setTimeout(syncFromHash, 0);
        window.addEventListener('hashchange', syncFromHash);
        return () => {
            window.clearTimeout(timer);
            window.removeEventListener('hashchange', syncFromHash);
        };
    }, []);

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
            setActiveId(id);
            target.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState(null, '', `#${id}`);
            if (!target.hasAttribute('tabindex')) {
                target.setAttribute('tabindex', '-1');
            }
            target.focus({ preventScroll: true });
        }
        onClose();
    };

    return (
        // 原本の aside 構造は移行忠実性 fixture の注釈として照合されるため保持し、目次は内側の nav で公開する
        <aside className="sidebar" id="sidebar">
            <nav aria-label="目次ナビゲーション">
                <div className="brand">
                    AIB-C01 Domain 4<br />準備度・リーダーシップ・変革
                </div>{' '}
                {NAV_ITEMS.map((item: NavItem) => {
                    const isParentActive =
                        activeId === item.id ||
                        (item.subItems?.some((sub) => sub.id === activeId) ?? false);

                    return (
                        <span key={item.id}>
                            <a
                                className={`nav-a ${isParentActive ? 'active' : ''}`}
                                aria-current={activeId === item.id ? 'location' : undefined}
                                href={`#${item.id}`}
                                onClick={(e) => handleClick(e, item.id)}
                            >
                                {item.icon && <i className={item.icon}></i>}
                                <span>{item.label}</span>
                            </a>{' '}
                            {item.subItems && item.subItems.length > 0 &&
                                item.subItems.map((sub) => (
                                    <span key={sub.id}>
                                        <a
                                            className={`nav-sub ${activeId === sub.id ? 'active' : ''}`}
                                            aria-current={activeId === sub.id ? 'location' : undefined}
                                            href={`#${sub.id}`}
                                            onClick={(e) => handleClick(e, sub.id)}
                                        >
                                            {sub.label}
                                        </a>{' '}
                                    </span>
                                ))
                            }
                        </span>
                    );
                })}
            </nav>
        </aside>
    );
}
