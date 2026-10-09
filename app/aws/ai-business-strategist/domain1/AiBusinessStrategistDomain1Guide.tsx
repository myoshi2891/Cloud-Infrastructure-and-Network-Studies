'use client';

import { useState } from 'react';
import { NavBar } from './NavBar';
import { HeroSection } from './sections/HeroSection';
import { Sec0 } from './sections/Sec0';

export function AiBusinessStrategistDomain1Guide() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="aib-domain1-page">
            <NavBar
                isOpen={isMenuOpen}
                onToggle={() => setIsMenuOpen((prev) => !prev)}
                onClose={() => setIsMenuOpen(false)}
            />
            <main className="main" id="top">
                <HeroSection />
                <Sec0 />
                {/* 後続ステップで Step 1〜13 および 付録 A〜E を追加 */}
            </main>
        </div>
    );
}
