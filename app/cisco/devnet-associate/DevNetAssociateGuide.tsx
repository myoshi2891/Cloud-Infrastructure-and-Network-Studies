'use client';

import NavBar from './NavBar';
import HeroSection from './sections/HeroSection';
import SectionIntro from './sections/SectionIntro';
import Section1 from './sections/Section1';
import Section2 from './sections/Section2';
import Section3 from './sections/Section3';
import Section4 from './sections/Section4';
import Section5 from './sections/Section5';
import Section6 from './sections/Section6';
import Section7 from './sections/Section7';

/**
 * Cisco Certified DevNet Associate (CCNA Automation / 200-901) 初学者向け完全ガイド。
 * 全10セクションの学習コンテンツ、Mermaid 34図、112テーブル、31コードブロックを網羅。
 */
export default function DevNetAssociateGuide() {
    return (
        <div className="devnet-associate-page">
            <NavBar />
            <main className="layout">
                <HeroSection />
                <SectionIntro />
                <Section1 />
                <Section2 />
                <Section3 />
                <Section4 />
                <Section5 />
                <Section6 />
                <Section7 />
            </main>
        </div>
    );
}
