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
import { Sec7_DecisionPatterns } from './sections/Sec7_DecisionPatterns';
import { Sec8_PracticeQuestions } from './sections/Sec8_PracticeQuestions';
import { Sec9_Checklist } from './sections/Sec9_Checklist';
import { Sec10_Glossary } from './sections/Sec10_Glossary';
import { Sec11_References } from './sections/Sec11_References';

export function AiBusinessStrategistDomain2Guide() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

    const handleToggleCheck = (index: number) => {
        setCheckedItems((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <div className={`aib-domain2-page ${menuOpen ? 'menu-open' : ''}`}>
            <button
                type="button"
                className="menu-btn"
                aria-label="メニューを開く"
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
                    <HeroSection />

                    <main className="content prose">
                        <Sec1 />
                        <Sec2 />
                        <Sec3 />
                        <Sec4 />
                        <Sec5 />
                        <Sec6_Services />
                        <Sec7_DecisionPatterns />
                        <Sec8_PracticeQuestions />
                        <Sec9_Checklist
                            checkedItems={checkedItems}
                            onToggle={handleToggleCheck}
                        />
                        <Sec10_Glossary />
                        <Sec11_References />
                    </main>

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
