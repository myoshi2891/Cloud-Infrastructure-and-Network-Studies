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

    /** 目次リンクや背景の操作でモバイル目次を閉じる。 */
    const handleClose = useCallback(() => setSidebarOpen(false), []);
    /** モバイル目次の開閉状態を切り替える。 */
    const handleToggle = useCallback(() => setSidebarOpen((prev) => !prev), []);

    return (
        <div className="ccnp-service-provider-page">
            <div className="layout">
                <NavBar
                    isOpen={sidebarOpen}
                    onClose={handleClose}
                    onToggle={handleToggle}
                />
                <main className="main">
                    {children}
                </main>
            </div>
        </div>
    );
}

