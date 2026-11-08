import type { Metadata } from 'next';
import '@fontsource-variable/source-serif-4/index.css';
import './page.css';
import CcieSpGuide from './CcieSpGuide';
import HeroIntro from './sections/HeroIntro';
import CoreRouting from './sections/CoreRouting';
import ArchitecturesServices from './sections/ArchitecturesServices';
import AccessConnectivity from './sections/AccessConnectivity';
import HighAvailability from './sections/HighAvailability';
import Security from './sections/Security';
import AssuranceAutomation from './sections/AssuranceAutomation';
import Appendix from './sections/Appendix';

export const metadata: Metadata = {
    title: 'CCIE Service Provider 完全ガイド（初学者向け・ステップバイステップ）',
    description:
        'CCIE Service Provider 認定（SPCOR 350-501 および 8時間実技ラボ試験）の全出題範囲、Core Routing・MPLS/SR・アーキテクチャ・自動化を網羅した初学者向けステップバイステップ完全解説ガイド。',
};

export default function CcieServiceProviderPage() {
    return (
        <CcieSpGuide>
            <HeroIntro />
            <CoreRouting />
            <ArchitecturesServices />
            <AccessConnectivity />
            <HighAvailability />
            <Security />
            <AssuranceAutomation />
            <Appendix />
        </CcieSpGuide>
    );
}

