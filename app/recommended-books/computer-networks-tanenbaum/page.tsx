import type { Metadata } from 'next';
import { ComputerNetworksTanenbaumGuide } from './ComputerNetworksTanenbaumGuide';
import './page.css';

export const metadata: Metadata = {
    title: "コンピュータネットワーク入門ガイド ― 初学者のためのステップバイステップ解説",
    description: 'Tanenbaum & Wetherall著 Computer Networks の学習順序に着想を得た入門ガイド。物理層からアプリケーション層、セキュリティまで全10ステップ・21図解で体系的に学びます。',
};

/** コンピュータネットワーク入門ガイドのServerルート。 */
export default function ComputerNetworksTanenbaumPage() {
    return <ComputerNetworksTanenbaumGuide />;
}
