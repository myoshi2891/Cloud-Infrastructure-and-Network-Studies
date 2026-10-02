import type { Metadata } from 'next';
import SecureCicdPipelineGuide from './SecureCicdPipelineGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'セキュアなコンテナ CI/CD パイプライン構築ガイド | Artifact Registry × Binary Authorization × Cloud Build',
    description:
        'Artifact Registry・Binary Authorization・Cloud Buildで構築するセキュアなコンテナCI/CD。環境準備から脆弱性スキャン・署名・再デプロイまでを解説。',
};

/** セキュアCI/CD学習ガイドのApp Routerエントリ。 */
export default function Page() {
    return <SecureCicdPipelineGuide />;
}
