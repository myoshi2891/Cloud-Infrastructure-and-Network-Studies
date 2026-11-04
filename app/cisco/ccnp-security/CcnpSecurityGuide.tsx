'use client';

import { useEffect, useRef, useState } from 'react';
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
        <div className={`ccnp-security-page ${isNavOpen ? 'nav-open' : ''}`}>
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
