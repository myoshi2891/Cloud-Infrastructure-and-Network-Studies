'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { NavBar } from './NavBar';

interface AiBusinessStrategistDomain4GuideProps {
    /** Server Component で描画した Hero と本文セクション */
    children: ReactNode;
}

/**
 * AIB-C01 Domain 4 のレイアウト（サイドバー・メニューボタン・オーバーレイ）を担う Client Component。
 * 本文は Server Component から children として受け取る。
 */
export function AiBusinessStrategistDomain4Guide({ children }: AiBusinessStrategistDomain4GuideProps) {
    const [navOpen, setNavOpen] = useState(false);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const wasOpenRef = useRef(false);
    const restoreFocusRef = useRef(true);

    useEffect(() => {
        if (navOpen) {
            document.querySelector<HTMLAnchorElement>('#sidebar a')?.focus();
        } else if (wasOpenRef.current && restoreFocusRef.current) {
            menuButtonRef.current?.focus();
        }
        wasOpenRef.current = navOpen;
        restoreFocusRef.current = true;
    }, [navOpen]);

    const closeAfterNavigation = () => {
        restoreFocusRef.current = false;
        setNavOpen(false);
    };

    return (
        <div className={`aib-domain4-page ${navOpen ? 'menu-open' : ''}`}>
            <div className="layout">
                <NavBar isOpen={navOpen} onClose={closeAfterNavigation} />
                <div
                    className="backdrop"
                    id="backdrop"
                    onClick={() => setNavOpen(false)}
                    role="presentation"
                />
                <div className="main">
                    <div className="mobile-bar">
                        <button
                            ref={menuButtonRef}
                            type="button"
                            id="menuBtn"
                            aria-label="目次を開く"
                            aria-controls="sidebar"
                            aria-expanded={navOpen}
                            onClick={() => setNavOpen((prev) => !prev)}
                        >
                            <i className="ti ti-menu-2"></i>
                            <span>目次</span>
                        </button>
                        <span>AIB-C01 Domain 4</span>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
}
