import type { Metadata } from 'next';
import AnsDomain4Guide from './AnsDomain4Guide';
import './page.css';
export const metadata: Metadata = {
    title: 'ANS-C01 Domain 4: ネットワークセキュリティ・コンプライアンス・ガバナンス',
    description: 'AWS Advanced Networking SpecialtyのDomain 4を全3タスク、58表、31図、14コード例、確認問題8問で学ぶガイド。',
};
/** ネットワークセキュリティ学習ガイドのServer入口。 */
export default function Page() { return <AnsDomain4Guide />; }
