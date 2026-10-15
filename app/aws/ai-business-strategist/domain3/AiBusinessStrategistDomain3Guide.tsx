'use client';

import { useState } from 'react';
import { NavBar } from './NavBar';

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

                    <div id="content">
                        {/* セクションは Step 3 で段階的に実装 */}
                    </div>
                </div>
            </div>
        </div>
    );
}
