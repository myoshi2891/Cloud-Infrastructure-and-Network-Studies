// app/recommended-books/terraform-up-and-running/page.tsx
import type { Metadata } from 'next';
import { TerraformUpAndRunningGuide } from './TerraformUpAndRunningGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'Terraform: Up and Running 実践ガイド ― 初学者のためのステップバイステップ解説',
    description:
        'Yevgeniy Brikman 著『Terraform: Up & Running』の構成を土台に、2026年最新エコシステム（S3ネイティブロック、OpenTofu、terraform test、Ephemeral Resources、Stacks 等）を踏まえて完全解説した学習ガイド。',
};

/**
 * Terraform: Up and Running 実践ガイド ページコンポーネント (Server Component)。
 */
export default function TerraformUpAndRunningPage() {
    return <TerraformUpAndRunningGuide />;
}
