import type { Metadata } from 'next';
import '@fontsource-variable/source-serif-4/index.css';
import './page.css';
import CcnpEnterpriseGuide from './CcnpEnterpriseGuide';

export const metadata: Metadata = {
    title: 'CCNP Enterprise 認定 初学者向け完全ガイド | Cloud Infrastructure Studies',
    description:
        'エンタープライズ有線・無線・SD-WAN・自動化のプロフェッショナル認定。コア試験(350-401 ENCOR)と8つのコンセントレーション試験を初学者向けに体系的かつ網羅的に解説。',
};

/**
 * CCNP Enterprise 完全ガイド ページ
 */
export default function Page() {
    return <CcnpEnterpriseGuide />;
}

