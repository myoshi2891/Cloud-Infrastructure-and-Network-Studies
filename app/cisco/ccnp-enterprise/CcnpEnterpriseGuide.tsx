'use client';

import { useState, useCallback, type ReactNode } from 'react';
import { NavBar } from './NavBar';

interface CcnpEnterpriseGuideProps {
    children?: ReactNode;
}

/**
 * CCNP Enterprise ガイドのサイドバー開閉を管理し、サーバーで描画した本文を配置します。
 */
export default function CcnpEnterpriseGuide({ children }: CcnpEnterpriseGuideProps) {
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
                {children}
            </main>
        </div>
    );
}

