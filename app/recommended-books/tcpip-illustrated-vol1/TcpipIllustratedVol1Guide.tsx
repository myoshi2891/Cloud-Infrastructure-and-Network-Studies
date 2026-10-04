'use client';

import { memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS, type DiagramId } from './constants';
import { NavBar } from './NavBar';

/**
 * ダイアグラムコンポーネント。
 * scroll-spy による再レンダリングで SVG がリセットされるのを防ぐため memo 化。
 */
export const Diagram = memo(function Diagram({ id, label }: { id: DiagramId; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap" tabIndex={0} role="region" aria-label={label}>
            <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale={true} />
        </div>
    );
});

export function TcpipIllustratedVol1Guide() {
    return (
        <div className="tcpip-page">
            <div className="layout">
                <NavBar />
                <main className="main">
                    {/* Content will be filled by sections */}
                </main>
            </div>
        </div>
    );
}
