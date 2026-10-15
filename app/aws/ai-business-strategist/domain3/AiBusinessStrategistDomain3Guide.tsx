'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { NavBar } from './NavBar';

interface AiBusinessStrategistDomain3GuideProps {
    /** Server Component で描画した Hero と本文セクション */
    children: ReactNode;
}

/**
 * AIB-C01 Domain 3 のレイアウト（サイドバー・メニューボタン・オーバーレイ）を担う Client Component。
 * 本文は Server Component から children として受け取る。
 */
export function AiBusinessStrategistDomain3Guide({ children }: AiBusinessStrategistDomain3GuideProps) {
    const [navOpen, setNavOpen] = useState(false);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const wasOpenRef = useRef(false);
    // 目次リンクで閉じた場合はリンク先へフォーカスが移るため、トグルへ戻さない
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
        <div className={`aib-domain3-page ${navOpen ? 'nav-open' : ''}`}>
            <div className="layout">
                <NavBar isOpen={navOpen} onClose={closeAfterNavigation} />
                <div
                    className="overlay"
                    id="overlay"
                    onClick={() => setNavOpen(false)}
                    role="presentation"
                />
                <div className="main">
                    <div className="mobile-bar">
                        <button
                            ref={menuButtonRef}
                            type="button"
                            id="menuBtn"
                            aria-controls="sidebar"
                            aria-expanded={navOpen}
                            onClick={() => setNavOpen((prev) => !prev)}
                        >
                            <i className="ti ti-menu-2"></i>
                            <span>目次</span>
                        </button>
                        <div className="mb-title">AIB-C01 Domain 3</div>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
}
