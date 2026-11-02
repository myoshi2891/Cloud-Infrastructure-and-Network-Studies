'use client';

import { memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS } from './constants';
import theme from './render-theme.json';

interface DiagramProps {
    id: string;
    label?: string;
}

const CCNP_SECURITY_CONFIG_PREFIX = `---\nconfig: ${JSON.stringify(theme)}\n---\n`;

/**
 * CCNP Security ガイド用のメモ化ダイアグラムコンポーネント。
 * 原本準拠のライトテーマ（全派生色固定）、自然スケール（preserveNaturalScale）およびアクセシビリティラベルを保証します。
 */
export const Diagram = memo(function Diagram({ id, label }: DiagramProps) {
    const rawChart = DIAGRAMS[id];
    if (!rawChart) return null;

    const chart = `${CCNP_SECURITY_CONFIG_PREFIX}${rawChart}`;
    const effectiveLabel = label || `図解 ${id}`;

    return (
        <div id={`diag-${id}`} className="diagram" data-testid="mermaid-diagram" aria-label={effectiveLabel}>
            <div className="mm">
                <MermaidDiagram
                    chart={chart}
                    ariaLabel={effectiveLabel}
                    preserveNaturalScale
                    preserveChartTheme
                    theme="light"
                />
            </div>
        </div>
    );
});
