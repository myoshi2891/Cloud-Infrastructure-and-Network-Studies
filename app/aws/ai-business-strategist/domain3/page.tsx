import type { Metadata } from 'next';
import { AiBusinessStrategistDomain3Guide } from './AiBusinessStrategistDomain3Guide';
import './page.css';

export const metadata: Metadata = {
    title: 'AWS Certified AI Business Strategist (AIB-C01) Domain 3 完全ガイド | AI Governance and Responsible AI',
    description:
        'AIB-C01 Domain 3: AI Governance and Responsible AI Leadership の初学者向け解説ガイド。Task 3.1〜3.3、責任ある AI 原則、ガバナンス体制、リスク軽減策を図解付きで整理。',
};

/**
 * AWS AIB-C01 Domain 3 ガイドの Server ルート。
 */
export default function AiBusinessStrategistDomain3Page() {
    return <AiBusinessStrategistDomain3Guide />;
}
