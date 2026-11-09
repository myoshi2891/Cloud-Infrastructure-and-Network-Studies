import type { Metadata } from 'next';
import '@fontsource-variable/source-serif-4/index.css';
import './page.css';
import CcnpEnterpriseGuide from './CcnpEnterpriseGuide';
import HeroIntro from './sections/HeroIntro';
import Chapter2 from './sections/Chapter2';
import Chapter3 from './sections/Chapter3';
import Chapter4 from './sections/Chapter4';
import Chapter5 from './sections/Chapter5';
import Chapter6 from './sections/Chapter6';
import Chapter7 from './sections/Chapter7';

export const metadata: Metadata = {
    title: 'CCNP Enterprise 認定 初学者向け完全ガイド | Cloud Infrastructure Studies',
    description:
        'エンタープライズ有線・無線・SD-WAN・自動化のプロフェッショナル認定。コア試験(350-401 ENCOR)とコンセントレーション試験を初学者向けに体系的かつ網羅的に解説。',
};

/**
 * CCNP Enterprise ガイドの本文をサーバーで描画し、クライアント側コンテナへ渡します。
 */
export default function Page() {
    return (
        <CcnpEnterpriseGuide>
            <HeroIntro />
            <Chapter2 />
            <Chapter3 />
            <Chapter4 />
            <Chapter5 />
            <Chapter6 />
            <Chapter7 />
        </CcnpEnterpriseGuide>
    );
}

