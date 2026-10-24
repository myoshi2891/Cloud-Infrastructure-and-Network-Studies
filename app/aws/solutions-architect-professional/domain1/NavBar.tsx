'use client';

import { Fragment, useEffect, useState } from 'react';
import { NAV_ITEMS } from './constants';

/**
 * SAP-C02 Domain 1 のサイドバーナビゲーション（目次）。
 * 原本 HTML に完全準拠したマークアップ（直下の a タグ構造）、
 * IntersectionObserver によるスクロールスパイとモバイル開閉トグルを提供。
 */
export default function NavBar() {
    const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0].id);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
            return;
        }

        const handleIntersection: IntersectionObserverCallback = (entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id);
                    break;
                }
            }
        };

        const observer = new IntersectionObserver(handleIntersection, {
            rootMargin: '-15% 0px -75% 0px',
            threshold: 0,
        });

        NAV_ITEMS.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) {
                observer.observe(el);
            }
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    const handleLinkClick = (id: string) => {
        setIsOpen(false);
        setActiveId(id);
        if (typeof window !== 'undefined') {
            window.history.pushState(null, '', `#${id}`);
            const target = document.getElementById(id);
            if (target) {
                target.focus();
            }
        }
    };

    return (
        <>
            <button
                type="button"
                className="sidebar-toggle"
                id="sidebarToggle"
                aria-label="目次を開閉"
                aria-expanded={isOpen}
                aria-controls="sidebar"
                onClick={() => setIsOpen(!isOpen)}
            >
                ☰ 目次
            </button>
            <aside className={`sidebar ${isOpen ? 'open' : ''}`} id="sidebar">
                <div className="sidebar-header">
                    <div className="kicker">AWS SAP-C02</div>
                    <h2>Domain 1: 組織の複雑さに対応する設計</h2>
                </div>
                <nav className="toc" id="sidebarNav" aria-label="ドメイン1 目次">
                    {NAV_ITEMS.map((item) => (
                        <Fragment key={item.id}>
                            <a
                                href={`#${item.id}`}
                                className={`${item.level === 3 ? 'lvl3' : ''} ${
                                    activeId === item.id ? 'active' : ''
                                }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleLinkClick(item.id);
                                }}
                            >
                                {item.label}
                            </a>{' '}
                        </Fragment>
                    ))}
                </nav>
            </aside>
        </>
    );
}
