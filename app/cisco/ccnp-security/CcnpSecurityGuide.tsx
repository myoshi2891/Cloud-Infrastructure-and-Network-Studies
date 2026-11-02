'use client';

import { useState } from 'react';
import { NavBar } from './NavBar';
import HeroIntro from './sections/HeroIntro';
import PartA from './sections/PartA';
import PartB from './sections/PartB';
import PartC from './sections/PartC';
import PartD from './sections/PartD';
import PartE from './sections/PartE';
import Appendix from './sections/Appendix';

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
                <i className="ti ti-menu-2" aria-hidden="true" />
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
                <PartB />
                <PartC />
                <PartD />
                <PartE />
                <Appendix />
                {children}
            </main>
        </div>
    );
}
