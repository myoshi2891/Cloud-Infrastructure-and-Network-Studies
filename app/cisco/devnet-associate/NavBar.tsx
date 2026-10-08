'use client';

import { useEffect, useState } from 'react';
import { NAV_ITEMS, type NavItem } from './constants';

/**
 * DevNet Associate 完全ガイドのサイドバー目次ナビゲーションコンポーネント。
 * ScrollSpy 連動、キーボード操作継続性のためのフォーカス移動を提供します。
 */
export default function NavBar() {
    const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0]?.id ?? 'sec-1');

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        const observer = new IntersectionObserver(
            (entries) => {
                const intersecting = entries.filter((e) => e.isIntersecting);
                if (intersecting.length > 0) {
                    const topEntry = intersecting[0];
                    if (topEntry?.target.id) {
                        setActiveId(topEntry.target.id);
                    }
                }
            },
            {
                rootMargin: '-20% 0px -70% 0px',
                threshold: 0,
            },
        );

        NAV_ITEMS.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const target = document.getElementById(id);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            target.focus({ preventScroll: true });
            window.history.pushState(null, '', `#${id}`);
            setActiveId(id);
        }
    };

    const introItems = NAV_ITEMS.filter((item) => item.group === '導入');
    const chapterItems = NAV_ITEMS.filter((item) => item.group === '試験範囲の各章');

    const renderLink = (item: NavItem) => (
        <li key={item.id}>
            <a
                href={`#${item.id}`}
                className={activeId === item.id ? 'active' : ''}
                aria-current={activeId === item.id ? 'location' : undefined}
                onClick={(e) => handleClick(e, item.id)}
            >
                <span>{item.label}</span>
                {item.weight && <span className="w">{item.weight}</span>}
            </a>{' '}
        </li>
    );

    return (
        <aside className="sidebar">
            <div className="brand">
                <svg viewBox="0 0 56 56" width="48" height="48" aria-hidden="true">
                    <circle cx="28" cy="28" r="25" fill="none" stroke="#B8802A" strokeWidth="1.5" />
                    <circle cx="28" cy="28" r="20" fill="#2E3F72" />
                    <path
                        d="M28 14 L40 21 V33 C40 39 34 43 28 45 C22 43 16 39 16 33 V21 Z"
                        fill="none"
                        stroke="#F6F7F9"
                        strokeWidth="1.5"
                    />
                    <path
                        d="M22 29 L26.5 33.5 L35 24"
                        fill="none"
                        stroke="#B8802A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <div>
                    <div className="brand-title">DevNet Associate</div>{' '}
                    <div className="brand-sub">CCNA Automation 200-901</div>
                </div>
            </div>{' '}
            <nav aria-label="目次">
                <div className="nav-group">導入</div>{' '}
                <ul>
                    {introItems.map(renderLink)}
                </ul>{' '}
                <div className="nav-group">試験範囲の各章</div>{' '}
                <ul>
                    {chapterItems.map(renderLink)}
                </ul>
            </nav>
        </aside>
    );
}
