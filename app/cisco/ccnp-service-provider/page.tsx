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
        'CCNP Service Provider 認定の取得要件・試験構成・基本用語・学習ロードマップと、コア試験 350-501 SPCOR のアーキテクチャ領域（15%）を初学者向けに解説。ルーティング、MPLS・セグメントルーティング、VPN、自動化などその他のコア領域とコンセントレーション試験の詳細解説は未収録。',
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

