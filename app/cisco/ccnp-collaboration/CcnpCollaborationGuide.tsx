'use client';

import { useState, type ReactNode } from 'react';
import { NavBar } from './NavBar';

interface CcnpCollaborationGuideProps {
    children?: ReactNode;
}

/**
 * CCNP Collaboration ガイドのクライアント側コンテナ。
 * モバイルでのサイドバー開閉状態を管理し、NavBar と main コンテンツを配置します。
 */
export default function CcnpCollaborationGuide({ children }: CcnpCollaborationGuideProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="ccnp-collab-page">
            <NavBar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onToggle={() => setSidebarOpen((prev) => !prev)}
            />
            <main className="main" id="main-content">
                {children}
            </main>
        </div>
    );
}

