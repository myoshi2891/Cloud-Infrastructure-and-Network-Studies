'use client';

import { memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS } from './constants';
import theme from './render-theme.json';

interface DiagramProps {
    id: string;
    label?: string;
}

const CCNP_ENTERPRISE_CONFIG_PREFIX = `---\nconfig: ${JSON.stringify(theme)}\n---\n`;

/**
 * CCNP Enterprise ガイド用のメモ化ダイアグラムコンポーネント。
 * 原本準拠のライトテーマ（全派生色固定）、自然スケール（preserveNaturalScale）およびアクセシビリティラベルを保証します。
 */
export const Diagram = memo(function Diagram({ id, label }: DiagramProps) {
    const rawChart = DIAGRAMS[id];
    if (!rawChart) return null;

    const chart = `${CCNP_ENTERPRISE_CONFIG_PREFIX}${rawChart}`;
    const effectiveLabel = label || `図解 ${id}`;

    return (
        <div id={`diag-${id}`} className="diagram">
            {/* biome-ignore lint/a11y/noNoninteractiveTabindex: 横スクロール可能な図の名前付き領域にキーボードで到達して操作できるようにする */}
            <section className="mm" tabIndex={0} aria-label={`${effectiveLabel}（横スクロール可能な図）`}>
                <MermaidDiagram
                    chart={chart}
                    ariaLabel={effectiveLabel}
                    preserveNaturalScale
                    preserveChartTheme
                    deferUntilVisible
                    theme="light"
                />
            </section>
        </div>
    );
});

