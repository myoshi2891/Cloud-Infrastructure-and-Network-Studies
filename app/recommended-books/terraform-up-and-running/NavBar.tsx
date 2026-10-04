// app/recommended-books/terraform-up-and-running/NavBar.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { NAV_ITEMS, type NavItem } from './constants';

interface NavBarProps {
    isOpen: boolean;
    onToggle: () => void;
    onClose: () => void;
}

/**
 * Terraform: Up and Running 実践ガイドのサイドバー目次コンポーネント。
 * スクロール位置に追従する ScrollSpy とモバイル用ドロワー開閉機能を提供します。
 */
export function NavBar({ isOpen, onToggle, onClose }: NavBarProps) {
    const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0]?.target ?? '');
    const toggleRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        const targets = NAV_ITEMS.map((item) => item.target);
        const elements = targets
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null);

        if (elements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                }
            },
            { rootMargin: '-15% 0px -75% 0px', threshold: 0 },
        );

        elements.forEach((el) => observer.observe(el));

        return () => {
            observer.disconnect();
        };
    }, []);

    // 開いている間だけ Escape を監視し、閉じた状態ではフォーカスを動かさない。
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key !== 'Escape') return;
            onClose();
            toggleRef.current?.focus();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isOpen, onClose]);

    const handleLinkClick = (href: string, targetId: string) => {
        onClose();
        setActiveId(targetId);
        window.history.pushState(null, '', href);
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;
        // 見出しはフォーカス不可のため必要時のみ tabindex=-1 を付与し、
        // スクロール後のフォーカスで位置が戻らないよう preventScroll を指定する。
        if (!targetElement.hasAttribute('tabindex')) targetElement.setAttribute('tabindex', '-1');
        targetElement.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
        targetElement.focus({ preventScroll: true });
    };

    return (
        <>
            <button
                ref={toggleRef}
                type="button"
                className="sidebar-toggle"
                onClick={onToggle}
                aria-expanded={isOpen}
                aria-controls="sidebar"
                aria-label="目次を開閉"
            >
                ☰
            </button>
            <nav
                className={`sidebar ${isOpen ? 'open' : ''}`}
                id="sidebar"
                aria-label="目次"
            >
                <div className="sidebar-title">目次</div>
                {NAV_ITEMS.map((item: NavItem) => {
                    const isActive = activeId === item.target;
                    const className = `nav-link ${item.isH2 ? 'nav-h2' : 'nav-h3'} ${isActive ? 'active' : ''}`;
                    return (
                        <a
                            key={item.target}
                            href={item.href}
                            className={className}
                            data-target={item.target}
                            onClick={(e) => {
                                e.preventDefault();
                                handleLinkClick(item.href, item.target);
                            }}
                        >
                            {item.text}
                        </a>
                    );
                })}
            </nav>
        </>
    );
}
