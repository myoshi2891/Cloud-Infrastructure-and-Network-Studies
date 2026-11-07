'use client';

import { useEffect, useRef, useState } from 'react';
import { NavBar } from './NavBar';
import HeroIntro from './sections/HeroIntro';
import CoreRouting from './sections/CoreRouting';
import ArchitecturesServices from './sections/ArchitecturesServices';
import AccessConnectivity from './sections/AccessConnectivity';
import HighAvailability from './sections/HighAvailability';
import Security from './sections/Security';
import AssuranceAutomation from './sections/AssuranceAutomation';
import Appendix from './sections/Appendix';

interface CcieSpGuideProps {
    children?: React.ReactNode;
}

/**
 * CCIE Service Provider ガイドのクライアント側ルートコンポーネント。
 * サイドバー開閉、ScrollSpy、レイアウトを提供します。
 */
export default function CcieSpGuide({ children }: CcieSpGuideProps) {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const menuButtonRef = useRef<HTMLButtonElement>(null);

    // 開いている間だけ Escape を監視し、閉じた状態でのフォーカス奪取を防ぐ
    useEffect(() => {
        if (!isNavOpen) return;
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key !== 'Escape') return;
            setIsNavOpen(false);
            menuButtonRef.current?.focus();
        };
        document.addEventListener('keydown', closeOnEscape);
        return () => document.removeEventListener('keydown', closeOnEscape);
    }, [isNavOpen]);

    return (
        <div className={`ccie-sp-page ${isNavOpen ? 'nav-open' : ''}`}>
            <button
                ref={menuButtonRef}
                type="button"
                className="menu-btn"
                id="menuBtn"
                aria-label={isNavOpen ? '目次を閉じる' : '目次を開く'}
                aria-expanded={isNavOpen}
                aria-controls="sidebar"
                onClick={() => setIsNavOpen((prev) => !prev)}
            >
                <i className="ti ti-menu-2" aria-hidden="true" />
            </button>
            <div
                className="scrim"
                id="scrim"
                onClick={() => setIsNavOpen(false)}
                aria-hidden="true"
            />
            <div className="layout">
                <NavBar isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
                <main>
                    <HeroIntro />
                    <CoreRouting />
                    <ArchitecturesServices />
                    <AccessConnectivity />
                    <HighAvailability />
                    <Security />
                    <AssuranceAutomation />
                    <Appendix />
                    {children}
                </main>
            </div>
        </div>
    );
}

