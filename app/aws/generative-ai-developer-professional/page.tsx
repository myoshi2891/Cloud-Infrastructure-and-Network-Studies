import type { Metadata } from 'next';
import AipGuide from './AipGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'AWS Certified Generative AI Developer - Professional (AIP-C01) 初学者向けステップバイステップ解説ガイド | Cloud Infrastructure Studies',
    description: 'AIP-C01の全5ドメイン・Step 1〜20を解説。FM統合、RAG、エージェント、安全性、運用最適化、評価、トラブルシューティングを学ぶガイド。',
};

/** AIP-C01 学習ガイドのServerエントリ。 */
export default function AipPage() {
    return <AipGuide />;
}
