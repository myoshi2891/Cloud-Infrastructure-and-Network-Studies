'use client';

import { useState } from 'react';
import { NavBar } from './NavBar';
import HeroIntro from './sections/HeroIntro';
import PartA from './sections/PartA';

interface CcnpSecurityGuideProps {
    children?: React.ReactNode;
}

/**
 * CCNP Security ガイドのクライアント側ルートコンポーネント。
 * サイドバー開閉、ScrollSpy、レイアウトを提供します。
 */
export default function CcnpSecurityGuide({ children }: CcnpSecurityGuideProps) {
    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
        <div className={`ccnp-security-page ${isNavOpen ? 'nav-open' : ''}`}>
            <button
                type="button"
                className="menu-btn"
                id="menuBtn"
                aria-label={isNavOpen ? '目次を閉じる' : '目次を開く'}
                aria-expanded={isNavOpen}
                aria-controls="sidebar"
                onClick={() => setIsNavOpen((prev) => !prev)}
            >
                ☰
            </button>
            <div
                className="scrim"
                id="scrim"
                onClick={() => setIsNavOpen(false)}
                aria-hidden="true"
            />
            <NavBar isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
            <main>
                <HeroIntro />
                <PartA />
                {children}
            </main>
        </div>
    );
}
