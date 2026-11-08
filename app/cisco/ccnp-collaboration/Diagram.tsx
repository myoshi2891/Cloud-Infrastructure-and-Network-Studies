'use client';

import { memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS } from './constants';
import theme from './render-theme.json';

interface DiagramProps {
    id: string;
    label?: string;
}

const CCNP_COLLAB_CONFIG_PREFIX = `---\nconfig: ${JSON.stringify(theme)}\n---\n`;

/**
 * CCNP Collaboration ガイド用のメモ化ダイアグラムコンポーネント。
 * 原本準拠のライトテーマ（全派生色固定）、自然スケール（preserveNaturalScale）およびアクセシビリティラベルを保証します。
 */
export const Diagram = memo(function Diagram({ id, label }: DiagramProps) {
    const rawChart = DIAGRAMS[id];
    if (!rawChart) return null;

    const chart = `${CCNP_COLLAB_CONFIG_PREFIX}${rawChart}`;
    const effectiveLabel = label || `図解 ${id}`;

    return (
        <div id={`diag-${id}`} className="diagram">
            {/* 横長の図はこのコンテナ内で横スクロールするため、キーボードで到達できる名前付き領域にする */}
            <div className="mm" tabIndex={0} role="region" aria-label={`${effectiveLabel}（横スクロール可能な図）`}>
                <MermaidDiagram
                    chart={chart}
                    ariaLabel={effectiveLabel}
                    preserveNaturalScale
                    preserveChartTheme
                    deferUntilVisible
                    theme="light"
                />
            </div>
        </div>
    );
});

