'use client';

import { useState, type ReactNode } from 'react';
import { NavBar } from './NavBar';

interface AiBusinessStrategistDomain2GuideProps {
    /** Server 側で描画済みのヒーロー */
    hero: ReactNode;
    /** Server 側で描画済みの本文セクション */
    children: ReactNode;
}

/**
 * Domain 2 ガイドの Client シェル。メニュー開閉状態のみを持ち、
 * 静的な本文は Server ページから受け取ってクライアントバンドルに含めない。
 */
export function AiBusinessStrategistDomain2Guide({ hero, children }: AiBusinessStrategistDomain2GuideProps) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className={`aib-domain2-page ${menuOpen ? 'menu-open' : ''}`}>
            <button
                type="button"
                className="menu-btn"
                aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((prev) => !prev)}
            >
                <i className="ti ti-menu-2"></i>
            </button>
            <div
                className="backdrop"
                onClick={() => setMenuOpen(false)}
                role="presentation"
            ></div>

            <div className="layout">
                <NavBar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

                <div className="main">
                    {hero}

                    <main className="content prose">{children}</main>

                    <footer className="footer">
                        <p>
                            本ガイドは AWS 公式の認定ページおよび試験ガイド (AIB-C01)
                            を一次情報として、2026-09-28
                            時点の公開情報をもとに作成しています。料金・サービス名・機能は変更される可能性があるため、最新情報は必ず公式ドキュメントで確認してください。
                        </p>
                    </footer>
                </div>
            </div>
        </div>
    );
}
