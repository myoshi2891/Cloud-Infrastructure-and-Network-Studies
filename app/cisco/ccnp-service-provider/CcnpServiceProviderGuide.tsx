'use client';

import { useState, useCallback, type ReactNode } from 'react';
import { NavBar } from './NavBar';

interface CcnpServiceProviderGuideProps {
    children?: ReactNode;
}

/**
 * CCNP Service Provider ガイドのサイドバー開閉を管理し、サーバーで描画した本文を配置します。
 */
export default function CcnpServiceProviderGuide({ children }: CcnpServiceProviderGuideProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleClose = useCallback(() => setSidebarOpen(false), []);
    const handleToggle = useCallback(() => setSidebarOpen((prev) => !prev), []);

    return (
        <div className="ccnp-service-provider-page">
            <NavBar
                isOpen={sidebarOpen}
                onClose={handleClose}
                onToggle={handleToggle}
            />
            <main className="main">
                {children}
            </main>
        </div>
    );
}

