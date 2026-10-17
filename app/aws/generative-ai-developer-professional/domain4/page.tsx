import type { Metadata } from 'next';
import AipDomain4Guide from './AipDomain4Guide';
import './page.css';
export const metadata: Metadata = { title: 'AWS AIP-C01 Domain 4: 運用効率と最適化 初学者向け学習ガイド', description: '全3タスク・16スキル、84表・22図・12問で学ぶ運用効率と最適化。' };
/** Domain 4ガイドのServer入口。 */
export default function Page() { return <AipDomain4Guide />; }
