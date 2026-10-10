import type { Metadata } from 'next';
import { AiBusinessStrategistGuide } from './AiBusinessStrategistGuide';
import { HeroSection } from './sections/HeroSection';
import { Step0Section } from './sections/Step0Section';
import { Domain1Section } from './sections/Domain1Section';
import { Domain2Section } from './sections/Domain2Section';
import { Domain3Section } from './sections/Domain3Section';
import { Domain4Section } from './sections/Domain4Section';
import { CrossDomainSection } from './sections/CrossDomainSection';
import { AppendicesSection } from './sections/AppendicesSection';
import './page.css';

export const metadata: Metadata = {
    title: 'AWS Certified AI Business Strategist (AIB-C01) 初学者向け完全ガイド | Cloud Infrastructure Studies',
    description:
        'AWS Certified AI Business Strategist (AIB-C01) 試験の初学者向け完全学習ガイド。AIの基本概念、戦略と価値創出、ガバナンスと責任あるAI、組織変革とスケール、試験対策を網羅。',
};

export default function AiBusinessStrategistPage() {
    return (
        <AiBusinessStrategistGuide>
            <HeroSection />
            <Step0Section />
            <Domain1Section />
            <Domain2Section />
            <Domain3Section />
            <Domain4Section />
            <CrossDomainSection />
            <AppendicesSection />
        </AiBusinessStrategistGuide>
    );
}
