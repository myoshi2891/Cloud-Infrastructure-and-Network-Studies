'use client';

import React, { useEffect, useState } from 'react';
import { NavBar } from './NavBar';

/**
 * CompTIA Network+ (N10-009) Domain 2.0 Network Implementation ガイドのメインコンポーネント (Client Component)
 */
export function ComptiaNetworkImplementationGuide() {
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setProgress(pct);
        };

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();

        return () => {
            window.removeEventListener('scroll', updateProgress);
        };
    }, []);

    return (
        <div className="comptia-network-implementation-page">
            <div className="progress-track">
                <div
                    className="progress-fill"
                    id="progressFill"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <div className="layout">
                <NavBar />
                <main className="content main-content">
                    <section id="overview" tabIndex={-1}>
                        {/* スケルトン */}
                    </section>
                </main>
            </div>
        </div>
    );
}
