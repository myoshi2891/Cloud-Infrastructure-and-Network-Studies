import type { Metadata } from 'next';
import SolutionsArchitectProfessionalGuide from './SolutionsArchitectProfessionalGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'AWS Certified Solutions Architect - Professional (SAP-C02) 初学者向けステップバイステップ完全ガイド',
    description: 'SAP-C02全4ドメインを143表・50図・12問の練習問題で学ぶ完全ガイド。Step 0〜23と105件の参考文献を収録。',
};

/** SAP-C02の基礎から全ドメインまで学ぶ総合ガイド。 */
export default function SolutionsArchitectProfessionalPage() { return <SolutionsArchitectProfessionalGuide />; }
