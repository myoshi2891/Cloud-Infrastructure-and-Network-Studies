import type { Metadata } from 'next';
import ScsDomain4Guide from './ScsDomain4Guide';
import './page.css';

export const metadata: Metadata = {
    title: 'AWS Certified Security - Specialty (SCS-C03) ドメイン4: アイデンティティとアクセス管理 (IAM) ガイド',
    description: 'AWS SCS-C03 Content Domain 4: Identity and Access Management (IAM) の出題範囲をステップバイステップで学ぶ完全ガイド。認証戦略、認可戦略、ABAC/RBAC、最小権限ポリシー、アクセスアナライザー、トラブルシューティングまで網羅。',
};

export default function Page() {
    return <ScsDomain4Guide />;
}
