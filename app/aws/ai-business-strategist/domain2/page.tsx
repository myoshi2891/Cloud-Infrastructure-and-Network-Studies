import type { Metadata } from 'next';
import { AiBusinessStrategistDomain2Guide } from './AiBusinessStrategistDomain2Guide';
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
import './page.css';

export const metadata: Metadata = {
    title: 'AWS Certified AI Business Strategist (AIB-C01) Domain 2 完全ガイド | AI Strategy and Business Value Creation',
    description:
        'AIB-C01 Domain 2: AI Strategy and Business Value Creation の初学者向け解説ガイド。Task 2.1〜2.3、14 の Skill を図解付きで整理。',
};

/**
 * AWS AIB-C01 Domain 2 ガイドの Server ルート。
 */
export default function AiBusinessStrategistDomain2Page() {
    return (
        <AiBusinessStrategistDomain2Guide hero={<HeroSection />}>
            <Sec1 />
            <Sec2 />
            <Sec3 />
            <Sec4 />
            <Sec5 />
            <Sec6_Services />
            <Sec7_DecisionPatterns />
            <Sec8_PracticeQuestions />
            <Sec9_Checklist />
            <Sec10_Glossary />
            <Sec11_References />
        </AiBusinessStrategistDomain2Guide>
    );
}
