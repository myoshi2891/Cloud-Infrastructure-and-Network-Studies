'use client';

import { useState } from 'react';
import { NavBar } from './NavBar';
import { HeroSection } from './sections/HeroSection';
import { Sec0 } from './sections/Sec0';
import { Step1 } from './sections/Step1';
import { Step2 } from './sections/Step2';
import { Step3 } from './sections/Step3';
import { Step4 } from './sections/Step4';
import { Step5 } from './sections/Step5';
import { Step6 } from './sections/Step6';
import { Step7 } from './sections/Step7';
import { Step8 } from './sections/Step8';
import { Step9 } from './sections/Step9';
import { Step10 } from './sections/Step10';
import { Step11 } from './sections/Step11';
import { Step12 } from './sections/Step12';
import { Step13 } from './sections/Step13';

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
                <Step1 />
                <Step2 />
                <Step3 />
                <Step4 />
                <Step5 />
                <Step6 />
                <Step7 />
                <Step8 />
                <Step9 />
                <Step10 />
                <Step11 />
                <Step12 />
                <Step13 />
                {/* 後続ステップで 付録 A〜E を追加 */}
            </main>
        </div>
    );
}
