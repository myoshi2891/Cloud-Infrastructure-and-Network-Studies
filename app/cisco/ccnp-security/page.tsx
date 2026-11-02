import type { Metadata } from 'next';
import './page.css';
import CcnpSecurityGuide from './CcnpSecurityGuide';

export const metadata: Metadata = {
    title: 'CCNP Security 認定 初学者向けステップバイステップ完全ガイド',
    description:
        'CCNP Security コア試験(350-701 SCOR)および各種コンセントレーション試験の出題領域、各ドメイン解説、学習ロードマップ、参考文献を網羅した初学者向け解説ガイド。',
};

export default function CcnpSecurityPage() {
    return <CcnpSecurityGuide />;
}
