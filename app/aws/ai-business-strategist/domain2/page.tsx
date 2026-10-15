import type { Metadata } from 'next';
import { AiBusinessStrategistDomain2Guide } from './AiBusinessStrategistDomain2Guide';
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
    return <AiBusinessStrategistDomain2Guide />;
}
