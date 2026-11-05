import type { Metadata } from 'next';
import ScsDomain3Guide from './ScsDomain3Guide';
import './page.css';

export const metadata: Metadata = {
    title: 'SCS-C03 Domain 3: Infrastructure Security 学習ガイド | Cloud Infrastructure Studies',
    description: 'AWS Certified Security - Specialty (SCS-C03) Content Domain 3: Infrastructure Security 初学者向けステップバイステップガイド。エッジ、コンピュート、ネットワークのセキュリティ制御を体系的に解説。',
};

export default function Page() {
    return <ScsDomain3Guide />;
}
