import type { Metadata } from 'next';
import './page.css';
import { ComptiaNetworkImplementationGuide } from './ComptiaNetworkImplementationGuide';

export const metadata: Metadata = {
    title: 'CompTIA Network+ (N10-009) ネットワーク実装完全ガイド | Cloud Infrastructure Studies',
    description:
        'CompTIA Network+ 認定資格試験（N10-009）のドメイン2.0 Network Implementation（出題比率20%）を初学者向けに徹底解説。ルーティング技術（静的/動的、NAT/PAT、FHRP）、スイッチング技術（VLAN、STP、MTU）、ワイヤレス機器（規格、暗号化、配置）、物理インストレーション（設置・電源・環境要因）を網羅。',
};

/**
 * CompTIA Network+ Network Implementation ガイドページのエントリポイント (Server Component)
 */
export default function Page() {
    return <ComptiaNetworkImplementationGuide />;
}
