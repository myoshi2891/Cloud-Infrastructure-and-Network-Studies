import type { Metadata } from 'next';
import { HighPerformanceBrowserNetworkingGuide } from './HighPerformanceBrowserNetworkingGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'High Performance Browser Networking 初学者向け完全ガイド',
    description:
        'Ilya Grigorik著『High Performance Browser Networking』の目次構成に沿って初学者向けに再構成し、HTTP/3・QUIC・TLS 1.3・BBRv3・WebTransport・Core Web Vitals等の2026年最新動向を独自に追加した完全学習ガイド。',
};

export default function HighPerformanceBrowserNetworkingPage() {
    return <HighPerformanceBrowserNetworkingGuide />;
}
