import type { Metadata } from 'next';
import './page.css';
import { ComptiaNetworkTroubleshootingGuide } from './ComptiaNetworkTroubleshootingGuide';

export const metadata: Metadata = {
    title: 'CompTIA Network+ (N10-009) ネットワークトラブルシューティング完全ガイド | Cloud Infrastructure Studies',
    description:
        'CompTIA Network+ 認定資格試験（N10-009）の出題比率第1位であるドメイン5.0 Network Troubleshooting（24%）を、初学者向けにステップバイステップで徹底解説。7ステップ問題解決プロセス、ケーブル・物理層障害、ネットワークサービス障害、パフォーマンス問題、各種ツール・コマンドを網羅。',
};

/**
 * CompTIA Network+ Network Troubleshooting ガイドページのエントリポイント (Server Component)
 */
export default function Page() {
    return <ComptiaNetworkTroubleshootingGuide />;
}
