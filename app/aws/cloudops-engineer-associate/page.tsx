import type { Metadata } from 'next';
import CloudOpsGuide from './CloudOpsGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'AWS Certified CloudOps Engineer - Associate (SOA-C03) 初学者向けステップバイステップ解説ガイド',
    description:
        'AWS公式 Exam Guide (SOA-C03) の5ドメイン・13タスクステートメントに完全準拠した完全対策ガイド。モニタリング、信頼性、プロビジョニング、セキュリティ、ネットワークの運用管理を比較表とMermaid図解で徹底解説。',
};

export default function Page() {
    return <CloudOpsGuide />;
}
