import type { Metadata } from 'next';
import ScsDomain1Guide from './ScsDomain1Guide';
import './page.css';

export const metadata: Metadata = {
    title: 'AWS Certified Security - Specialty (SCS-C03) Content Domain 1: Detection 初学者向けステップバイステップガイド | Cloud Infrastructure Studies',
    description:
        'AWS Certified Security - Specialty (SCS-C03) Content Domain 1: Detection の完全ガイド。監視・アラート、ログ収集・保管・分析、トラブルシューティング、Mermaid図9点、表51点、確認問題8問を体系的に解説。',
};

export default function Page() {
    return <ScsDomain1Guide />;
}
