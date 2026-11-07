import type { Metadata } from 'next';
import '@fontsource-variable/source-serif-4/index.css';
import './page.css';
import CcieSpGuide from './CcieSpGuide';

export const metadata: Metadata = {
    title: 'CCIE Service Provider 完全ガイド（初学者向け・ステップバイステップ）',
    description:
        'CCIE Service Provider 認定（SPCOR 350-501 および 8時間実技ラボ試験）の全出題範囲、Core Routing・MPLS/SR・アーキテクチャ・自動化を網羅した初学者向けステップバイステップ完全解説ガイド。',
};

export default function CcieServiceProviderPage() {
    return <CcieSpGuide />;
}

