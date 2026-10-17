import type { Metadata } from 'next';
import AipDomain3Guide from './AipDomain3Guide';
import './page.css';
export const metadata: Metadata = { title: 'AIP-C01 Domain 3: AI安全性・セキュリティ・ガバナンス | Cloud Infrastructure Studies', description: '全4タスク・15スキル、19図・44表・練習問題10問で学ぶAIP-C01 Domain 3完全ガイド。' };
/** Domain 3学習ガイドのServer入口。 */
export default function Page() { return <AipDomain3Guide />; }
