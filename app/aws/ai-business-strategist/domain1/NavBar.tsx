'use client';

import { useState, useEffect, useCallback, useRef, Fragment } from 'react';
import { NAV_ITEMS } from './constants';

/**
 * サイドバー目次（Client Component）。モバイルの開閉状態と scroll spy を内包する。
 */
export function NavBar() {
    const [activeId, setActiveId] = useState<string>('top');
    const [isOpen, setIsOpen] = useState(false);
    const menuBtnRef = useRef<HTMLButtonElement>(null);

    const onToggle = useCallback(() => setIsOpen((prev) => !prev), []);
    const onClose = useCallback(() => setIsOpen(false), []);

    const handleLinkClick = useCallback(
        (id: string) => {
            setActiveId(id);
            onClose();
        },
        [onClose]
    );

    useEffect(() => {
        if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
            return;
        }

        const elements = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
            (el): el is HTMLElement => el !== null
        );

        if (elements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                        break;
                    }
                }
            },
            {
                rootMargin: '-15% 0px -75% 0px',
                threshold: 0,
            }
        );

        elements.forEach((el) => observer.observe(el));

        return () => {
            elements.forEach((el) => observer.unobserve(el));
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }
        return () => {
            document.body.classList.remove('menu-open');
        };
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
                // 閉じたサイドバー内にフォーカスが残らないようトグルへ戻す
                menuBtnRef.current?.focus();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    return (
        <>
            <button
                ref={menuBtnRef}
                type="button"
                className="sidebar-toggle"
                id="menuBtn"
                aria-label="メニュー"
                aria-controls="sidebar"
                aria-expanded={isOpen}
                onClick={onToggle}
            >
                ☰
            </button>
            <div
                className={`backdrop ${isOpen ? 'show' : ''}`}
                id="backdrop"
                onClick={onClose}
                aria-hidden="true"
            />
            <aside className={`sidebar ${isOpen ? 'open' : ''}`} id="sidebar">
                <div className="sidebar-header">
                    <div className="kicker">AWS Certified AI Business Strategist</div>{' '}
                    <h2>Domain 1: AI Fundamentals and Literacy</h2>
                </div>{' '}
                <nav id="sidebarNav" aria-label="セクション目次">
                    {NAV_ITEMS.map((item) => {
                        const isActive = activeId === item.id;
                        return (
                            <Fragment key={item.id}>
                                {item.group && (
                                    <>
                                        <div className="side-group">{item.group}</div>{' '}
                                    </>
                                )}
                                <a
                                    href={`#${item.id}`}
                                    className={`side-link ${item.isTop ? 'side-top' : ''} ${
                                        isActive ? 'active' : ''
                                    }`}
                                    onClick={() => handleLinkClick(item.id)}
                                >
                                    {item.title}
                                </a>{' '}
                            </Fragment>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}
