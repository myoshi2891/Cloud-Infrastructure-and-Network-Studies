'use client';

import { useState } from 'react';
import NavBar from './NavBar';
import HeroSection from './sections/HeroSection';
import SectionIntro from './sections/SectionIntro';
import SectionDomain1 from './sections/SectionDomain1';
import SectionDomain2 from './sections/SectionDomain2';
import SectionDomain3 from './sections/SectionDomain3';
import SectionDomain4 from './sections/SectionDomain4';
import SectionDomain5 from './sections/SectionDomain5';

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
                    <SectionDomain1 />
                    <SectionDomain2 />
                    <SectionDomain3 />
                    <SectionDomain4 />
                    <SectionDomain5 />
                </div>
            </main>
        </div>
    );
}
