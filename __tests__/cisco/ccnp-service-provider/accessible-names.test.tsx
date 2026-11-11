// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import HeroIntro from '@/app/cisco/ccnp-service-provider/sections/HeroIntro';
import Chapter2 from '@/app/cisco/ccnp-service-provider/sections/Chapter2';
import Chapter3 from '@/app/cisco/ccnp-service-provider/sections/Chapter3';
import Chapter4 from '@/app/cisco/ccnp-service-provider/sections/Chapter4';
import Chapter5 from '@/app/cisco/ccnp-service-provider/sections/Chapter5';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

const renderAll = () => render(<>
    <HeroIntro /><Chapter2 /><Chapter3 /><Chapter4 /><Chapter5 />
</>).container;

describe('CCNP Service Provider 図・コードの読み上げ名', () => {
    it('各図は直前の最も近い見出し（h5を含む）の名前を持つ', () => {
        const labels = [...renderAll().querySelectorAll('[data-testid="mermaid-diagram"]')]
            .map(diagram => diagram.getAttribute('aria-label'));

        expect(labels).toEqual([
            '2.1 取得要件',
            '3.1 SP ネットワークの典型構成',
            '4.1 推奨学習順序',
            '① 1.1.a コアアーキテクチャ',
            '③ 1.1.c モビリティ',
            '5.1.2 シスコのネットワークソフトウェア アーキテクチャ（出題範囲 1.2）',
            '5.1.3 サービスプロバイダー仮想化（出題範囲 1.3）',
            '① 1.4.a MPLS QoS モデル（パイプ、ショートパイプ、ユニフォーム）',
            '④ 1.4.d エンタープライズ環境と SP 環境の間の信頼境界',
            '⑥ 1.5.f BGP Flowspec',
            '5.1.6 管理プレーンのセキュリティ（出題範囲 1.6）',
            '③ 1.7.c RTBH（Remotely Triggered Black Hole）',
        ]);
    });

    it('フォーカス可能な全コードブロックが最も近い小見出しを含む一意の名前を持つ', () => {
        const labels = [...renderAll().querySelectorAll('section.code-block')]
            .map(block => block.getAttribute('aria-label'));

        expect(labels).toEqual([
            '5.1.2 シスコのネットワークソフトウェア アーキテクチャ（出題範囲 1.2）（コードブロック）',
            '① 1.5.a コントロールプレーン保護（LPTS と CoPP）（コードブロック 1）',
            '① 1.5.a コントロールプレーン保護（LPTS と CoPP）（コードブロック 2）',
            '② 1.5.b BGP-TTL のセキュリティとプロトコル認証（コードブロック）',
            '③ 1.5.c BGP プレフィックスの抑制（コードブロック）',
            '④ 1.5.d LDP セキュリティ（認証およびラベル割り当てフィルタリング）（コードブロック）',
            '① 1.7.a uRPF（Unicast Reverse Path Forwarding）（コードブロック）',
            '④ 1.7.d MACsec（コードブロック）',
        ]);
        expect(new Set(labels).size).toBe(labels.length);
    });
});
