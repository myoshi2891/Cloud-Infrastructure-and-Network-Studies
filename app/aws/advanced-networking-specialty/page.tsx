import type { Metadata } from 'next';
import AdvancedNetworkingGuide from './AdvancedNetworkingGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'AWS Certified Advanced Networking - Specialty (ANS-C01) 初学者向けステップバイステップ完全ガイド',
    description: 'ANS-C01全4ドメイン・16タスクを104表・39図・14コードで学ぶ完全ガイド。ネットワーク基礎、横断比較、学習計画と91件の参考文献を収録。',
};

/** ANS-C01の基礎から全16タスクまで学ぶ総合ガイド。 */
export default function AdvancedNetworkingPage() { return <AdvancedNetworkingGuide />; }
