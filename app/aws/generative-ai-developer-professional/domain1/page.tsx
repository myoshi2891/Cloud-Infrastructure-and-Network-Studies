import type { Metadata } from 'next';
import AipDomain1Guide from './AipDomain1Guide';
import './page.css';

export const metadata: Metadata = {
    title: 'AIP-C01 Domain 1: FM統合・データ管理・コンプライアンス | Cloud Infrastructure Studies',
    description: 'AIP-C01 Domain 1の全6タスク・28スキル、21図、51表を解説する初学者向け学習ガイド。',
};

/** AIP-C01 Domain 1詳細ガイドのServerエントリ。 */
export default function AipDomain1Page() {
    return <AipDomain1Guide />;
}
