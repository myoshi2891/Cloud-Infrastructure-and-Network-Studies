'use client';

import { useState } from 'react';
import { NavBar } from './NavBar';
import { HeroSection } from './sections/HeroSection';
import { Step0Section } from './sections/Step0Section';
import { Domain1Section } from './sections/Domain1Section';
import { Domain2Section } from './sections/Domain2Section';
import { Domain3Section } from './sections/Domain3Section';

interface AiBusinessStrategistGuideProps {
    children?: React.ReactNode;
}

export const AiBusinessStrategistGuide = ({ children }: AiBusinessStrategistGuideProps) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <div className={`aib-guide-page ${menuOpen ? 'menu-open' : ''}`}>
            <button
                className="menu-btn"
                type="button"
                aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
                aria-expanded={menuOpen}
                onClick={toggleMenu}
            >
                <span className="bars" />
            </button>
            <div className="backdrop" onClick={closeMenu} />
            <NavBar onLinkClick={closeMenu} />
            <main>
                <HeroSection />
                <Step0Section />
                <Domain1Section />
                <Domain2Section />
                <Domain3Section />
                {children}
            </main>
        </div>
    );
};
