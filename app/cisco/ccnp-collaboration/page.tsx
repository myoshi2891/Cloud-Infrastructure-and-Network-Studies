import type { Metadata } from 'next';
import './page.css';
import CcnpCollaborationGuide from './CcnpCollaborationGuide';
import HeroIntro from './sections/HeroIntro';
import PartA from './sections/PartA';
import PartB from './sections/PartB';
import PartC from './sections/PartC';
import PartD from './sections/PartD';
import PartE from './sections/PartE';
import PartF from './sections/PartF';
import Appendix from './sections/Appendix';

export const metadata: Metadata = {
    title: 'CCNP Collaboration 認定 初学者向けステップバイステップ学習ガイド',
    description:
        'Cisco CCNP Collaboration 認定試験（350-801 CLCOR および各コンセントレーション試験 300-810 CLICA, 300-815 CLACCM, 300-820 CLCEI, 300-835 CLAUTO）の体系的学習ガイド。',
};

/**
 * CCNP Collaboration 完全ガイドの Server Component ページ。
 * 本文セクションは Server Component として描画し、対話操作のみ Client Component へ委譲します。
 */
export default function Page() {
    return (
        <CcnpCollaborationGuide>
            <HeroIntro />
            <PartA />
            <PartB />
            <PartC />
            <PartD />
            <PartE />
            <PartF />
            <Appendix />
        </CcnpCollaborationGuide>
    );
}

