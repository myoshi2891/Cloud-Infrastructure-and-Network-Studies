import type { Metadata } from 'next';
import { AiBusinessStrategistGuide } from './AiBusinessStrategistGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'AWS Certified AI Business Strategist (AIB-C01) 初学者向け完全ガイド | Cloud Infrastructure Studies',
    description:
        'AWS Certified AI Business Strategist (AIB-C01) 試験の初学者向け完全学習ガイド。AIの基本概念、戦略と価値創出、ガバナンスと責任あるAI、組織変革とスケール、試験対策を網羅。',
};

export default function AiBusinessStrategistPage() {
    return <AiBusinessStrategistGuide />;
}
