'use client';

import { useState } from 'react';
import { NavBar } from './NavBar';
import { HeroSection } from './sections/HeroSection';
import { Sec1 } from './sections/Sec1';
import { Sec2 } from './sections/Sec2';
import { Sec3 } from './sections/Sec3';
import { Sec4 } from './sections/Sec4';
import { Sec5 } from './sections/Sec5';
import { Sec6_Services } from './sections/Sec6_Services';
import { Sec7_ExamTips } from './sections/Sec7_ExamTips';
import { Sec8_PracticeQuestions } from './sections/Sec8_PracticeQuestions';
import { Sec9_References } from './sections/Sec9_References';
import { Sec10_Notes } from './sections/Sec10_Notes';

export function AiBusinessStrategistDomain3Guide() {
    const [navOpen, setNavOpen] = useState(false);

    return (
        <div className={`aib-domain3-page ${navOpen ? 'nav-open' : ''}`}>
            <div className="layout">
                <NavBar isOpen={navOpen} onClose={() => setNavOpen(false)} />
                <div
                    className="overlay"
                    id="overlay"
                    onClick={() => setNavOpen(false)}
                    role="presentation"
                />
                <div className="main">
                    <div className="mobile-bar">
                        <button
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

                    <HeroSection />

                    <div id="content" className="content">
                        <Sec1 />
                        <Sec2 />
                        <Sec3 />
                        <Sec4 />
                        <Sec5 />
                        <Sec6_Services />
                        <Sec7_ExamTips />
                        <Sec8_PracticeQuestions />
                        <Sec9_References />
                        <Sec10_Notes />
                    </div>
                </div>
            </div>
        </div>
    );
}
