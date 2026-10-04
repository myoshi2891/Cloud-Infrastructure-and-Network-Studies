import type { Metadata } from 'next';
import './page.css';
import { TcpipIllustratedVol1Guide } from './TcpipIllustratedVol1Guide';

export const metadata: Metadata = {
    title: 'TCP/IP Illustrated, Volume 1: The Protocols（第2版）解説ガイド | Cloud Infrastructure Studies',
    description:
        'W. Richard Stevens, Kevin R. Fall 著『TCP/IP Illustrated, Volume 1: The Protocols (Second Edition)』の体系的な解説学習ガイド。リンク層からTCP輻輳制御、HTTP/3・QUIC等の2026年最新動向まで網羅。',
};

export default function TcpipIllustratedVol1Page() {
    return <TcpipIllustratedVol1Guide />;
}
