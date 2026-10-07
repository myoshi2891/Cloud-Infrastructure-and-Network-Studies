'use client';

import { useState } from 'react';
import NavBar from './NavBar';
import HeroSection from './sections/HeroSection';
import SectionIntro from './sections/SectionIntro';

/**
 * AWS Certified CloudOps Engineer - Associate (SOA-C03) 完全ガイド。
 */
export default function CloudOpsGuide() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className={`aws-cloudops-page ${menuOpen ? 'menu-open' : ''}`}>
            <NavBar isOpen={menuOpen} onToggle={setMenuOpen} />
            <main className="main">
                <HeroSection />
                <div className="content">
                    <SectionIntro />
                </div>
            </main>
        </div>
    );
}
