'use client';

import { memo, useEffect, useId, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import styles from './MermaidDiagram.module.css';
import mermaid from 'mermaid';

export interface MermaidDiagramProps {
    /** Mermaid DSL（flowchart / stateDiagram-v2 等） */
    chart: string;
    /** スクリーンリーダー向けの説明ラベル（必須） */
    ariaLabel: string;
    /** ルートクラス名の追加（任意） */
    className?: string;
    /** SVGをviewBoxの自然倍率で表示し、文字の描画サイズを維持する */
    preserveNaturalScale?: boolean;
    /** テーマ（'dark' | 'light'、デフォルト: 'dark'） */
    theme?: 'dark' | 'light';
}

/**
 * 原本HTML (Professional-agentic-architect-guide.html) に完全準拠したライトテーマ設定。
 * Mermaid 11 の %%{init: ...}%% ディレクティブとして DSL 先頭に注入される。
 */
export const LIGHT_THEME_DIRECTIVE = `%%{init: {
  'theme': 'base',
  'themeVariables': {
    'fontSize': '16px',
    'background': '#ffffff',
    'mainBkg': '#eaf1ff',
    'nodeBkg': '#eaf1ff',
    'nodeBorder': '#1a56db',
    'primaryColor': '#eaf1ff',
    'primaryTextColor': '#16233a',
    'primaryBorderColor': '#1a56db',
    'lineColor': '#5b6b85',
    'secondaryColor': '#eef2f9',
    'tertiaryColor': '#eef2f9',
    'edgeLabelBackground': '#ffffff',
    'clusterBkg': '#f5f8fc',
    'clusterBorder': '#c7d3e8',
    'nodeTextColor': '#16233a',
    'titleColor': '#16233a',
    'stateBkg': '#eaf1ff',
    'stateLabelColor': '#16233a',
    'altBackground': '#eaf1ff',
    'actorBkg': '#eaf1ff',
    'actorBorder': '#1a56db',
    'actorTextColor': '#16233a',
    'actorLineColor': '#5b6b85',
    'signalColor': '#16233a',
    'signalTextColor': '#16233a',
    'labelBoxBkgColor': '#eaf1ff',
    'labelBoxBorderColor': '#1a56db',
    'labelTextColor': '#16233a',
    'loopTextColor': '#16233a',
    'activationBorderColor': '#1a56db',
    'activationBkgColor': '#eaf1ff',
    'sequenceNumberColor': '#16233a',
    'pie1': '#1a56db',
    'pie2': '#157a43',
    'pie3': '#92400e',
    'pie4': '#b91c3c',
    'pie5': '#6b46c1',
    'pie6': '#0f766e',
    'pieOpacity': 1,
    'pieStrokeColor': '#ffffff',
    'pieOuterStrokeColor': '#ffffff',
    'pieSectionTextColor': '#ffffff',
    'pieLegendTextColor': '#16233a'
  },
  'flowchart': {
    'useMaxWidth': false,
    'htmlLabels': true,
    'subGraphTitleMargin': { 'top': 12, 'bottom': 18 },
    'nodeSpacing': 70,
    'rankSpacing': 60,
    'curve': 'basis'
  }
}}%%`;

if (typeof window !== 'undefined') {
    // 設定値は正本である Gcp-ace-complete-advanced-guide.html の表示を再現するもの。
    // DIAGRAMS は静的・作者管理の定数のみ（外部入力なし）のため securityLevel: 'loose' で問題ない。
    mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        securityLevel: 'loose',
        themeVariables: {
            primaryColor: '#1a73e8',
            primaryTextColor: '#e8f0fe',
            primaryBorderColor: '#1a73e8',
            lineColor: '#5f7fb8',
            secondaryColor: '#0f9d58',
            tertiaryColor: '#0d1a2e',
            background: '#060b14',
            mainBkg: '#0f2040',
            nodeBorder: '#1a73e8',
            clusterBkg: '#0d1a2e',
            titleColor: '#e8f0fe',
            edgeLabelBackground: '#0d1a2e',
            attributeBackgroundColorEven: '#0f2040',
            attributeBackgroundColorOdd: '#0d1a2e',
            fontFamily: "'Noto Sans JP', sans-serif",
            fontSize: '16px',
            pie1: '#7c9eff',
            pie2: '#e0a9ff',
            pie3: '#5fd6c4',
            pie4: '#f6b866',
            pie5: '#ff9d9d',
            pie6: '#9db4f5',
            pieOpacity: '1',
            pieStrokeColor: '#07111e',
            pieStrokeWidth: '2px',
            pieTitleTextColor: '#e7ecf6',
            pieSectionTextColor: '#0b1424',
            pieSectionTextSize: '15px',
            pieLegendTextColor: '#c7d0e4',
            pieLegendTextSize: '15px',
        },
        flowchart: { curve: 'basis', padding: 20 },
        sequence: { actorMargin: 60, mirrorActors: true },
    });
}

const canRenderInBrowser = (): boolean => {
    if (typeof window === 'undefined') return false;
    const SVGGraphicsElementCtor = (window as any).SVGGraphicsElement;
    const SVGElementCtor = (window as any).SVGElement;
    return Boolean(
        SVGGraphicsElementCtor?.prototype?.getBBox ||
        SVGElementCtor?.prototype?.getBBox
    );
};

/**
 * テキストを行ごとに分割し、各行に一意で安定したキー（行文字列 + 出現回数）を付与したオブジェクトの配列を生成します。
 *
 * @param text 分割対象のテキスト
 */
const toCodeLines = (text: string): { line: string; key: string }[] => {
    const seen = new Map<string, number>();
    return text.split('\n').map((line) => {
        const count = seen.get(line) ?? 0;
        seen.set(line, count + 1);
        return { line, key: `${line}::${count}` };
    });
};

/**
 * 注入済みのライブ SVG 要素に、正本 HTML と同じ下部見切れ対策を直接施す。
 *
 * 文字列を DOMParser/XMLSerializer で往復させると foreignObject 内の HTML（htmlLabels）の
 * 名前空間が壊れてラベルが空になるため、innerHTML 注入後の実 DOM を操作する。
 *
 * - width/height 属性を除去し、viewBox の自然幅 / height:auto で比率を維持
 * - overflow:visible で viewBox から数px はみ出す描画の途切れを防止
 * - viewBox の高さを拡張（flowchart は +15、sequence/state は下部にアクター/メモが伸びるため +110）
 *
 * @param svgEl 注入済みの SVG 要素
 * @param chart 元の DSL（図種別の判定に使用）
 * @param preserveNaturalScale 自然倍率維持フラグ
 */
export const applySvgFixups = (
    svgEl: SVGSVGElement,
    chart: string,
    preserveNaturalScale = false
): void => {
    svgEl.removeAttribute('width');
    svgEl.removeAttribute('height');
    svgEl.style.height = 'auto';
    svgEl.style.overflow = 'visible';
    svgEl.style.marginBottom = '10px';
    // ⚠️ viewBox 検証による早期 return より前にクリアする。同一 SVG を再処理する経路
    //    （HMR・再レンダリング）で前回の min-width が残ると、縮小されるべき図が
    //    固定幅のまま横スクロールを発生させる。
    svgEl.style.minWidth = '';

    const viewBox = svgEl.getAttribute('viewBox');
    if (!viewBox) {
        // 横幅の上限は CSS の共通契約に委ねる
        return;
    }

    const parts = viewBox.split(/\s+/).map(Number);
    if (parts.length !== 4 || !parts.every((n) => Number.isFinite(n))) return;

    const trimmed = chart.trim();
    const isSequenceOrState =
        trimmed.startsWith('sequenceDiagram') || trimmed.startsWith('stateDiagram');
    const extraHeight = isSequenceOrState ? 110 : 15;
    const [x, y, w, h] = parts as [number, number, number, number];
    // ⚠️ SKILL.md「SVG 幅の鉄則」: viewBox 由来の自然 px 幅を基準にする。
    // preserveNaturalScale は Mermaid が採寸した倍率を維持したい図に個別指定する。
    let targetWidth = w;
    if (preserveNaturalScale && w > 0) {
        // preserveNaturalScale=true: viewBox 由来の自然 px 幅 (1.0倍) をそのまま使い、
        // 拡大・縮小せず Mermaid が採寸した 16px の文字サイズで描画する
        targetWidth = w;
    } else if (!preserveNaturalScale && w > 0 && w < 550) {
        targetWidth = Math.min(650, Math.max(Math.round(w * 1.35), 480));
    }
    svgEl.style.width = `${targetWidth}px`;
    // 有効な viewBox が取れた場合のみ、自然幅を min-width で固定する
    if (preserveNaturalScale && targetWidth > 0) {
        svgEl.style.minWidth = `${targetWidth}px`;
    }
    svgEl.style.maxHeight = preserveNaturalScale ? 'none' : h > 550 ? '580px' : 'none';
    svgEl.setAttribute('viewBox', `${x} ${y} ${w} ${h + extraHeight}`);
};

/**
 * Mermaid 図を遅延ロード・クライアント描画するラッパー。
 *
 * - SSR / 初回マウント前は DSL を `<pre className="codeblock" aria-hidden>` として見せてハイドレーションエラーを防ぐ。
 * - jsdom 等 `getBBox` が無い環境ではフォールバック表示（DSL の `<pre>`）のまま描画しない。
 */
export const MermaidDiagram: React.FC<MermaidDiagramProps> = memo(({
    chart,
    ariaLabel,
    className,
    preserveNaturalScale = false,
    theme = 'dark',
}) => {
    const reactId = useId();
    const [isMounted, setIsMounted] = useState(false);
    const [rendered, setRendered] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [svgStr, setSvgStr] = useState<string>('');
    const targetRef = useRef<HTMLDivElement>(null);

    // マウント状態のみを管理する Effect (ESLint の set-state-in-effect 回避)
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted || !canRenderInBrowser()) return;

        let cancelled = false;
        const renderChart = async () => {
            setError(null);
            setRendered(false);
            try {
                // Web フォント（Noto Sans JP）読込前に採寸するとノード幅が狭く算出され文字が切れるため、完了を待つ
                if (typeof document !== 'undefined' && 'fonts' in document) {
                    try {
                        await document.fonts.ready;
                    } catch {
                        // フォント API が失敗してもフォールバックフォントで描画は続行する
                    }
                }
                if (cancelled) return;
                const id = `mermaid-${reactId.replace(/[^a-zA-Z0-9]/g, '')}`;
                const chartToRender =
                    theme === 'light' && !chart.trim().startsWith('%%{init:')
                        ? `${LIGHT_THEME_DIRECTIVE}\n${chart}`
                        : chart;
                const { svg } = await mermaid.render(id, chartToRender);
                if (cancelled) return;
                setSvgStr(svg);
                setRendered(true);
            } catch (e) {
                if (cancelled) return;
                setError(e instanceof Error ? e.message : String(e));
            }
        };

        renderChart();

        return () => {
            cancelled = true;
        };
    }, [chart, reactId, isMounted, theme]);

    // SVG 注入後（svgStr 反映後）に、実 DOM の SVG へ下部見切れ対策を適用する
    useEffect(() => {
        if (!rendered || !svgStr) return;
        const svgEl = targetRef.current?.querySelector('svg');
        if (svgEl instanceof SVGSVGElement) {
            applySvgFixups(svgEl, chart, preserveNaturalScale);
        }
    }, [svgStr, rendered, chart, preserveNaturalScale]);

    // マウント前、またはブラウザ環境でない（jsdomテストなど）場合は、ハイドレーション不一致を防ぐためフォールバックを表示
    const showFallback = !isMounted || !canRenderInBrowser() || (!rendered && !error);

    return (
        <div
            className={cn(
                styles.mermaidWrapper,
                theme === 'light' && styles.lightWrapper,
                className
            )}
            role="img"
            aria-label={ariaLabel}
            aria-roledescription="diagram"
            data-theme={theme}
        >
            {isMounted && rendered && !error && (
                <div
                    ref={targetRef}
                    className={cn(styles.mermaidTarget, "mermaid-target")}
                    dangerouslySetInnerHTML={{ __html: svgStr }}
                />
            )}
            {showFallback && (
                <pre className="codeblock" aria-hidden="true">
                    {toCodeLines(chart).map(({ line, key }) => (
                        <div className="code-line" key={key} data-key={key}>
                            {line}
                        </div>
                    ))}
                </pre>
            )}
            {isMounted && error && (
                <pre className="codeblock" data-testid="mermaid-error">
                    {toCodeLines(`Mermaid render error: ${error}\n\n${chart}`).map(({ line, key }) => (
                        <div className="code-line" key={key} data-key={key}>
                            {line}
                        </div>
                    ))}
                </pre>
            )}
        </div>
    );
});

MermaidDiagram.displayName = 'MermaidDiagram';

