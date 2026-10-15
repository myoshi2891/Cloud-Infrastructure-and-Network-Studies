import type { Metadata } from 'next';
import { AiBusinessStrategistDomain3Guide } from './AiBusinessStrategistDomain3Guide';
import { HeroSection } from './sections/HeroSection';
import { Sec1 } from './sections/Sec1';
import { Sec2 } from './sections/Sec2';
import { Sec3 } from './sections/Sec3';
import { Sec4 } from './sections/Sec4';
import { Sec5 } from './sections/Sec5';
import { Sec6_Services } from './sections/Sec6_Services';
import { Sec7_ExamTips } from './sections/Sec7_ExamTips';
import { Sec8_PracticeQuestions } from './sections/Sec8_PracticeQuestions';
import { Sec9_References } from './sections/Sec9_References';
import { Sec10_Notes } from './sections/Sec10_Notes';
import './page.css';

export const metadata: Metadata = {
    title: 'AWS Certified AI Business Strategist (AIB-C01) Domain 3 完全ガイド | AI Governance and Responsible AI',
    description:
        'AIB-C01 Domain 3: AI Governance and Responsible AI Leadership の初学者向け解説ガイド。Task 3.1〜3.3、責任ある AI 原則、ガバナンス体制、リスク軽減策を図解付きで整理。',
};

/**
 * AWS AIB-C01 Domain 3 ガイドの Server ルート。
 * 静的な本文セクションはここで描画し、Client のレイアウトへ children として渡す。
 */
export default function AiBusinessStrategistDomain3Page() {
    return (
        <AiBusinessStrategistDomain3Guide>
            <HeroSection />

            <div id="content" className="content">
                <Sec1 />
                <Sec2 />
                <Sec3 />
                <Sec4 />
                <Sec5 />
                <Sec6_Services />
                <Sec7_ExamTips />
                <Sec8_PracticeQuestions />
                <Sec9_References />
                <Sec10_Notes />
            </div>
        </AiBusinessStrategistDomain3Guide>
    );
}
