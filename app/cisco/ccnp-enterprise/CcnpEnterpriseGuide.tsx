'use client';

import { useState, useCallback } from 'react';
import { NavBar } from './NavBar';
import HeroIntro from './sections/HeroIntro';
import Chapter2 from './sections/Chapter2';
import Chapter3 from './sections/Chapter3';
import Chapter4 from './sections/Chapter4';
import Chapter5 from './sections/Chapter5';
import Chapter6 from './sections/Chapter6';
import Chapter7 from './sections/Chapter7';

/**
 * CCNP Enterprise 完全ガイドのメインクライアントコンポーネント。
 */
export default function CcnpEnterpriseGuide() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleClose = useCallback(() => setSidebarOpen(false), []);
    const handleToggle = useCallback(() => setSidebarOpen((prev) => !prev), []);

    return (
        <div className="ccnp-enterprise-page">
            <NavBar
                isOpen={sidebarOpen}
                onClose={handleClose}
                onToggle={handleToggle}
            />
            <main className="main">
                <HeroIntro />
                <Chapter2 />
                <Chapter3 />
                <Chapter4 />
                <Chapter5 />
                <Chapter6 />
                <Chapter7 />
            </main>
        </div>
    );
}

