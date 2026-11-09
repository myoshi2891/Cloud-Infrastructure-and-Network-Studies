import type { Metadata } from 'next';
import '@fontsource-variable/source-serif-4/index.css';
import './page.css';
import CcnpServiceProviderGuide from './CcnpServiceProviderGuide';
import HeroIntro from './sections/HeroIntro';
import Chapter2 from './sections/Chapter2';
import Chapter3 from './sections/Chapter3';
import Chapter4 from './sections/Chapter4';
import Chapter5 from './sections/Chapter5';

export const metadata: Metadata = {
    title: 'CCNP Service Provider 認定 初学者向け完全ガイド | Cloud Infrastructure Studies',
    description:
        'サービスプロバイダーインフラ（コアルーティング、MPLS、セグメントルーティング、VPN、QoS、セキュリティ、自動化）のプロフェッショナル認定。コア試験(350-501 SPCOR)とコンセントレーション試験を初学者向けに体系的かつ網羅的に解説。',
};

/**
 * CCNP Service Provider ガイドの本文をサーバーで描画し、クライアント側コンテナへ渡します。
 */
export default function Page() {
    return (
        <CcnpServiceProviderGuide>
            <HeroIntro />
            <Chapter2 />
            <Chapter3 />
            <Chapter4 />
            <Chapter5 />
        </CcnpServiceProviderGuide>
    );
}
