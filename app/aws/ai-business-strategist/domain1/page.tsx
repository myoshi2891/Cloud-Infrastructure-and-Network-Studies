import type { Metadata } from 'next';
import { AiBusinessStrategistDomain1Guide } from './AiBusinessStrategistDomain1Guide';
import './page.css';

export const metadata: Metadata = {
    title: 'AWS Certified AI Business Strategist (AIB-C01) Domain 1: AI Fundamentals and Literacy 初学者向けステップバイステップ解説ガイド',
    description:
        'AWS Certified AI Business Strategist (AIB-C01) Domain 1: AI Fundamentals and Literacy (配点 24%) の全3タスク・13スキル・Mermaid 16図・付録5を初学者・ビジネス職向けに完全解説する学習ガイド。',
};

/**
 * AWS AIB-C01 Domain 1 ガイドの Server ルート。
 */
export default function AiBusinessStrategistDomain1Page() {
    return <AiBusinessStrategistDomain1Guide />;
}
