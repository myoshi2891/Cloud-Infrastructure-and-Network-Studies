'use client';

import React from 'react';
import { NavBar } from './NavBar';

/**
 * CompTIA Network+ Network Troubleshooting 完全ガイドコンポーネント (Client Component)
 */
export function ComptiaNetworkTroubleshootingGuide() {
    return (
        <div className="comptia-network-troubleshooting-page">
            <div className="layout">
                <NavBar />
                <main className="main-content">
                    <header className="hero">
                        <div className="badge-row">
                            <span className="badge">CompTIA Network+</span>
                            <span className="badge">試験番号: N10-009</span>
                            <span className="badge">ドメイン 5.0</span>
                        </div>
                        <h1>ネットワークトラブルシューティング完全ガイド</h1>
                        <p className="lead">
                            CompTIA Network+
                            認定資格試験（N10-009）の5ドメインのうち、出題比率が最も高い「5.0 Network
                            Troubleshooting」を、初学者でも理解できるようにステップバイステップで解説します。内容は公式
                            Exam Objectives ドキュメントに基づいています。
                        </p>
                    </header>
                </main>
            </div>
        </div>
    );
}
