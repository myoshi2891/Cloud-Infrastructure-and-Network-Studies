import type { Metadata } from 'next';
import { AiBusinessStrategistDomain4Guide } from './AiBusinessStrategistDomain4Guide';
import { HeroSection } from './sections/HeroSection';
import { Sec0_About } from './sections/Sec0_About';
import { Sec1_Overview } from './sections/Sec1_Overview';
import { Sec2_Map } from './sections/Sec2_Map';
import { Sec3_Task41 } from './sections/Sec3_Task41';
import { Sec4_Task42 } from './sections/Sec4_Task42';
import { Sec5_Task43 } from './sections/Sec5_Task43';
import { Sec6_Task44 } from './sections/Sec6_Task44';
import { Sec7_Services } from './sections/Sec7_Services';
import { Sec8_Rules } from './sections/Sec8_Rules';
import { Sec9_PracticeQuestions } from './sections/Sec9_PracticeQuestions';
import { Sec10_Checklist } from './sections/Sec10_Checklist';
import { Sec11_Glossary } from './sections/Sec11_Glossary';
import { Sec12_References } from './sections/Sec12_References';
import './page.css';

export const metadata: Metadata = {
    title: 'AWS Certified AI Business Strategist (AIB-C01) Domain 4 完全ガイド | Business Readiness, Leadership, and AI Transformation',
    description:
        'AIB-C01 Domain 4: Business Readiness, Leadership, and AI Transformation の初学者向け解説ガイド。Task 4.1〜4.4、AI準備度・成熟度、データ戦略、変革リーダーシップ、スケールを図解付きで整理。',
};

/**
 * AWS AIB-C01 Domain 4 ガイドの Server ルート。
 * 静的な本文セクションはここで描画し、Client のレイアウトへ children として渡す。
 */
export default function AiBusinessStrategistDomain4Page() {
    return (
        <AiBusinessStrategistDomain4Guide>
            <HeroSection />

            <div id="content" className="content">
                <Sec0_About />
                <Sec1_Overview />
                <Sec2_Map />
                <Sec3_Task41 />
                <Sec4_Task42 />
                <Sec5_Task43 />
                <Sec6_Task44 />
                <Sec7_Services />
                <Sec8_Rules />
                <Sec9_PracticeQuestions />
                <Sec10_Checklist />
                <Sec11_Glossary />
                <Sec12_References />
            </div>

            <footer className="footer">
                AWS 公式資料に基づく学習用ガイドです。最新情報は必ず公式ページで確認してください。
            </footer>
        </AiBusinessStrategistDomain4Guide>
    );
}
