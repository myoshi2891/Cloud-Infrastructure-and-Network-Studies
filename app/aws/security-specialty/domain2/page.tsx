import type { Metadata } from 'next';
import ScsDomain2Guide from './ScsDomain2Guide';
import './page.css';

export const metadata: Metadata = {
    title: 'AWS Certified Security - Specialty (SCS-C03) Content Domain 2: Incident Response 初学者向けステップバイステップガイド',
    description:
        'AWS Certified Security - Specialty (SCS-C03) Content Domain 2: Incident Response の完全ガイド。インシデント対応計画・テスト、セキュリティイベント対応、実践シナリオ3本、Mermaid図18点、表68点、練習問題10問を体系的に解説。',
};

export default function Page() {
    return <ScsDomain2Guide />;
}
