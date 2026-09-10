import type { Metadata } from 'next';
import { ComputerNetworkingTopdownGuide } from './ComputerNetworkingTopdownGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'コンピュータネットワーク入門ガイド ― トップダウンアプローチで学ぶインターネットの仕組み',
    description:
        'James F. Kurose, Keith W. Ross 著『Computer Networking: A Top-Down Approach』を軸に、アプリケーション層から物理層までインターネットの全体像と2026年最新動向を体系的に解説した完全学習ガイド。',
};

export default function ComputerNetworkingTopdownPage() {
    return <ComputerNetworkingTopdownGuide />;
}
