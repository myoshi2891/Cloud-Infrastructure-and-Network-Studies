import { readFileSync, writeFileSync } from 'node:fs';

const html = readFileSync(
    'archive/Gcl/Professional-Agentic-Architect/Professional-agentic-architect-section4.html',
    'utf8',
);

// Extract content inside <main class="main"> ... </main>
const mainMatch = html.match(/<main class="main">([\s\S]*?)<\/main>/);
if (!mainMatch) {
    console.error('Could not find <main class="main">');
    process.exit(1);
}

let mainContent = mainMatch[1];

// 1. Convert Mermaid pre blocks into <Diagram id="diag-N" ariaLabel="..." />
const diagramLabels = [
    '開発・CI/CD・本番フェーズのライフサイクル循環図',
    'ユーザーシミュレーションによるテスト生成と評価のフロー',
    'Online Monitorがトレースをサンプリングして評価し結果を出力する周期ループのシーケンス図',
    '評価ケースの定義からエージェントの最適化までの6段階評価ワークフロー',
    'ADK Conformance Testingのベースライン記録と回帰テストフロー',
    'デプロイランタイム選定の判断フローチャート',
    'エージェント障害モードの診断フローチャート',
    'Agent Anomaly Detectionの3層分析アーキテクチャ',
    'コールドスタートと並行度チューニングによるレイテンシ改善フロー'
];

let diagIndex = 0;
mainContent = mainContent.replace(/<pre\s+class="mermaid">[\s\S]*?<\/pre\s*>/g, () => {
    diagIndex++;
    const label = diagramLabels[diagIndex - 1];
    return `<Diagram id="diag-${diagIndex}" ariaLabel="${label}" />`;
});

// 2. Convert code blocks into <pre className="code-block" role="region" aria-label="..."> with <div className="code-line">
const codeBlockLabels = [
    'テレメトリ設定環境変数',
    'Cloud Storage書き出し設定環境変数',
    'Loss Clusters生成のPythonコード例',
    'pytestによる評価テスト例'
];

let codeIndex = 0;
mainContent = mainContent.replace(/<pre[\s\S]*?class="code-block"[^>]*><code>([\s\S]*?)<\/code><\/pre\s*>/g, (match, codeInner) => {
    const label = codeBlockLabels[codeIndex++] || 'コード例';
    // split by newlines
    const lines = codeInner.split('\n');
    // wrap each line
    const wrappedLines = lines.map(line => {
        if (!line.trim()) {
            return `                        <div className="code-line">{''}</div>`;
        }
        const tokens = line.split(/(<[^>]+>)/);
        const escaped = tokens.map(token => {
            if (token.startsWith('<') && token.endsWith('>')) {
                return token;
            }
            return token.replace(/'/g, '&apos;').replace(/"/g, '&quot;');
        }).join('');
        return `                        <div className="code-line">${escaped}</div>`;
    }).join('\n');

    return `<pre className="code-block" role="region" aria-label="${label}">\n${wrappedLines}\n                    </pre>`;
});

// 3. Convert table th to <th scope="col">
mainContent = mainContent.replace(/<th>/g, '<th scope="col">');

// 4. Convert checklist inputs
mainContent = mainContent.replace(/<input id="(chk\d+)" type="checkbox" \/>/g, (match, id) => {
    return `<input id="${id}" type="checkbox" checked={!!checkedItems.${id}} onChange={() => handleCheckChange('${id}')} />`;
});

// 5. Convert checklist count display
mainContent = mainContent.replace(/<span class="count">0 \/ 17 完了<\/span>/g, '<span className="count">{checkedCount} / {totalChecklist} 完了</span>');

// 6. JSX attribute conversions
mainContent = mainContent.replace(/\bclass="/g, 'className="');
mainContent = mainContent.replace(/\bfor="chk/g, 'htmlFor="chk');

// 7. Callout whitespace preservation
mainContent = mainContent.replace(/<div className="icon">(&#10003;|!)<\/div>\s*<div className="body">\s*<div className="label">(.*?)<\/div>/g, (m, icon, label) => {
    return `<div className="icon">${icon}</div>{' '}\n                    <div className="body">\n                        <div className="label">${label}</div>{' '}`;
});
mainContent = mainContent.replace(/<\/li>\s*<li>/g, `</li>{' '}\n                            <li>`);

// 8. Specific inline whitespace adjustments where tags meet Japanese text or english terms
mainContent = mainContent.replace(/さらに\s*<code[^>]*>\s*Traces\s*<\/code[^>]*>\s*タブ/g, "さらに{' '}<code>Traces</code>{' '}タブ");
mainContent = mainContent.replace(/でき、\s*<code[^>]*>\s*Topology\s*<\/code[^>]*>\s*タブ/g, "でき、<code>Topology</code>{' '}タブ");
mainContent = mainContent.replace(/支えているのが\s*<strong[^>]*>\s*OpenTelemetry Semantic Conventions for generative AI systems\s*<\/strong[^>]*>\s*で/g, "支えているのが{' '}<strong>OpenTelemetry Semantic Conventions for generative AI systems</strong>{' '}で");
mainContent = mainContent.replace(/Agents CLIの\s*<code[^>]*>\s*infra\s*<\/code[^>]*>\s*→\s*<code[^>]*>\s*deploy\s*<\/code[^>]*>\s*の分離/g, "Agents CLIの <code>infra</code> →{' '}<code>deploy</code>{' '}の分離");
mainContent = mainContent.replace(/<strong[^>]*>\s*system failures（システム障害）\s*<\/strong[^>]*>\s*――\s*は/g, "<strong>system failures（システム障害）</strong>{' '}―― は");
mainContent = mainContent.replace(/<strong[^>]*>\s*ドリフト（drift）\s*<\/strong[^>]*>\s*は/g, "<strong>ドリフト（drift）</strong>{' '}は");
mainContent = mainContent.replace(/<strong[^>]*>\s*ツール呼び出しレイテンシ（tool invocation latency）\s*<\/strong[^>]*>\s*は/g, "<strong>ツール呼び出しレイテンシ（tool invocation latency）</strong>{' '}は");
mainContent = mainContent.replace(/Observabilityダッシュボードの\s*<strong[^>]*>\s*Toolsタブ\s*<\/strong[^>]*>\s*で/g, "Observabilityダッシュボードの{' '}<strong>Toolsタブ</strong>{' '}で");
mainContent = mainContent.replace(/モデル呼び出し側の\s*<strong[^>]*>\s*Modelsタブ\s*<\/strong[^>]*>/g, "モデル呼び出し側の{' '}<strong>Modelsタブ</strong>");
mainContent = mainContent.replace(/<strong[^>]*>\s*エージェントの推論ループ（reasoning loops）\s*<\/strong[^>]*>\s*は/g, "<strong>エージェントの推論ループ（reasoning loops）</strong>{' '}は");
mainContent = mainContent.replace(/この種の問題を\s*<strong[^>]*>\s*OWASP ASI08（Agentic Cascading Failures）\s*<\/strong[^>]*>\s*という/g, "この種の問題を{' '}<strong>OWASP ASI08（Agentic Cascading Failures）</strong>{' '}という");
mainContent = mainContent.replace(/第一歩は、\s*<code[^>]*>\s*Traces\s*<\/code[^>]*>\s*タブで/g, "第一歩は、<code>Traces</code>{' '}タブで");
mainContent = mainContent.replace(/<strong[^>]*>\s*システム障害（system failures）\s*<\/strong[^>]*>\s*は/g, "<strong>システム障害（system failures）</strong>{' '}は");
mainContent = mainContent.replace(/Google Cloudが提供する\s*<strong[^>]*>\s*Agent Anomaly Detection\s*<\/strong[^>]*>/g, "Google Cloudが提供する{' '}<strong>Agent Anomaly Detection</strong>");
mainContent = mainContent.replace(/<code[^>]*>\s*min_instances\s*<\/code[^>]*>\s*をベースライン/g, "<code>min_instances</code>{' '}をベースライン");
mainContent = mainContent.replace(/<code[^>]*>\s*container_concurrency\s*<\/code[^>]*>\s*は既定/g, "<code>container_concurrency</code>{' '}は既定");
mainContent = mainContent.replace(/同時処理可能リクエスト数は\s*<code[^>]*>\s*container_concurrency \/ 9\s*<\/code[^>]*>\s*で決まります/g, "同時処理可能リクエスト数は{' '}<code>container_concurrency / 9</code>{' '}で決まります");
mainContent = mainContent.replace(/非同期エージェントでは\s*<code[^>]*>\s*container_concurrency\s*<\/code[^>]*>\s*を9の倍数/g, "非同期エージェントでは{' '}<code>container_concurrency</code>{' '}を9の倍数");
mainContent = mainContent.replace(/<code[^>]*>\s*min_instances\s*<\/code[^>]*>\s*を上げると/g, "<code>min_instances</code>{' '}を上げると");
mainContent = mainContent.replace(/非同期（ADKベースなど）エージェントは\s*<code[^>]*>\s*container_concurrency\s*<\/code[^>]*>\s*を既定値/g, "非同期（ADKベースなど）エージェントは{' '}<code>container_concurrency</code>{' '}を既定値");
mainContent = mainContent.replace(/<code[^>]*>\s*adk conformance create\s*<\/code[^>]*>\s*による/g, "<code>adk conformance create</code>{' '}による");
mainContent = mainContent.replace(/Conformance Testingは\s*<code[^>]*>\s*adk conformance test\s*<\/code[^>]*>\s*として/g, "Conformance Testingは{' '}<code>adk conformance test</code>{' '}として");
mainContent = mainContent.replace(/<code[^>]*>\s*hallucinations_v1\s*<\/code[^>]*>\s*は応答/g, "<code>hallucinations_v1</code>{' '}は応答");
mainContent = mainContent.replace(/後方互換性のため\s*<code[^>]*>\s*ReasoningEngine\s*<\/code[^>]*>\s*という/g, "後方互換性のため{' '}<code>ReasoningEngine</code>{' '}という");
mainContent = mainContent.replace(/Goエージェントの場合は\s*<code[^>]*>\s*adkgo\s*<\/code[^>]*>\s*CLIから/g, "Goエージェントの場合は{' '}<code>adkgo</code>{' '}CLIから");
mainContent = mainContent.replace(/Agent Runtimeでは、\s*<code[^>]*>\s*ReasoningEngine\s*<\/code[^>]*>\s*リソースの\s*<code[^>]*>\s*trafficConfig\s*<\/code[^>]*>\s*フィールドを通じて、常に最新リビジョンにトラフィックを流す\s*<code[^>]*>\s*trafficSplitAlwaysLatest\s*<\/code[^>]*>\s*設定と/g, "Agent Runtimeでは、<code>ReasoningEngine</code>{' '}リソースの{' '}<code>trafficConfig</code>{' '}フィールドを通じて、常に最新リビジョンにトラフィックを流す{' '}<code>trafficSplitAlwaysLatest</code>{' '}設定と");
mainContent = mainContent.replace(/Conformance Testingのディレクトリ構成は\s*<code[^>]*>\s*tests\/&lt;category_name&gt;\/&lt;test_case_name&gt;\/\s*<\/code[^>]*>\s*の階層/g, "Conformance Testingのディレクトリ構成は{' '}<code>tests/&lt;category_name&gt;/&lt;test_case_name&gt;/</code>{' '}の階層");
mainContent = mainContent.replace(/<code[^>]*>\s*--generate_report\s*<\/code[^>]*>\s*フラグを付けることで/g, "<code>--generate_report</code>{' '}フラグを付けることで");
mainContent = mainContent.replace(/Exam Guideが挙げる3つの選択肢 ――\s*<strong[^>]*>\s*ADK evaluation tooling \(evalset\)\s*<\/strong[^>]*>/g, "Exam Guideが挙げる3つの選択肢 ――{' '}<strong>ADK evaluation tooling (evalset)</strong>");
mainContent = mainContent.replace(/Evaluation Serviceの中で\s*<strong[^>]*>\s*Custom functions\s*<\/strong[^>]*>\s*として/g, "Evaluation Serviceの中で{' '}<strong>Custom functions</strong>{' '}として");
mainContent = mainContent.replace(/標準のLLM-as-judge指標や\s*<code[^>]*>\s*rubric_based_\*\s*<\/code[^>]*>\s*系の指標/g, "標準のLLM-as-judge指標や{' '}<code>rubric_based_*</code>{' '}系の指標");
mainContent = mainContent.replace(/コスト管理のために\s*<strong[^>]*>\s*サンプリング率\s*<\/strong[^>]*>\s*と\s*<strong[^>]*>\s*1回あたりの最大サンプル数\s*<\/strong[^>]*>/g, "コスト管理のために{' '}<strong>サンプリング率</strong> と{' '}<strong>1回あたりの最大サンプル数</strong>");
mainContent = mainContent.replace(/<code[^>]*>\s*OnlineEvaluator\s*<\/code[^>]*>\s*の作成権限/g, "<code>OnlineEvaluator</code>{' '}の作成権限");
mainContent = mainContent.replace(/定性的な品質を採点させる\s*<strong[^>]*>\s*Custom LLM Metrics\s*<\/strong[^>]*>\s*（例：/g, "定性的な品質を採点させる{' '}<strong>Custom LLM Metrics</strong>（例：");
mainContent = mainContent.replace(/決定論的な\s*<strong[^>]*>\s*Custom Code Metrics\s*<\/strong[^>]*>\s*（例：/g, "決定論的な{' '}<strong>Custom Code Metrics</strong>（例：");
mainContent = mainContent.replace(/自動的に\s*<strong[^>]*>\s*Loss Clusters（損失クラスタ）\s*<\/strong[^>]*>\s*として/g, "自動的に{' '}<strong>Loss Clusters（損失クラスタ）</strong>{' '}として");
mainContent = mainContent.replace(/つまり\s*<code[^>]*>\s*hallucinations_v1\s*<\/code[^>]*>\s*は/g, "つまり{' '}<code>hallucinations_v1</code>{' '}は");
mainContent = mainContent.replace(/「<code[^>]*>\s*hallucinations_v1\s*<\/code[^>]*>\s*による応答/g, "「<code>hallucinations_v1</code>{' '}による応答");
mainContent = mainContent.replace(/高いのに\s*<code[^>]*>\s*hallucinations_v1\s*<\/code[^>]*>\s*が低ければ/g, "高いのに{' '}<code>hallucinations_v1</code>{' '}が低ければ");
mainContent = mainContent.replace(/さらにADKは、\s*<strong[^>]*>\s*Conformance Testing（適合性テスト）\s*<\/strong[^>]*>\s*という/g, "さらにADKは、<strong>Conformance Testing（適合性テスト）</strong>{' '}という");
mainContent = mainContent.replace(/workflows（評価とデプロイ）\s*<\/strong[^>]*>\s*――\s*出題比率/g, "workflows（評価とデプロイ）</strong>{' '}―― 出題比率");
mainContent = mainContent.replace(/公式認定ページ\s*<a[\s\S]*?id="fnref1"[\s\S]*?<\/a\s*>\s*と/g, "公式認定ページ{' '}<a className=\"footnote-ref\" href=\"#ref1\" id=\"fnref1\" role=\"doc-noteref\"><sup>1</sup></a>{' '}と");
mainContent = mainContent.replace(/Exam Guide PDF\s*<a[\s\S]*?id="fnref2"[\s\S]*?<\/a\s*>\s*の/g, "Exam Guide PDF{' '}<a className=\"footnote-ref\" href=\"#ref2\" id=\"fnref2\" role=\"doc-noteref\"><sup>2</sup></a>{' '}の");
mainContent = mainContent.replace(/この正解データを\s*<strong[^>]*>\s*EvalSet\s*<\/strong[^>]*>/g, "この正解データを{' '}<strong>EvalSet</strong>");
mainContent = mainContent.replace(/ツール定義を含む\s*<code[^>]*>\s*gen_ai\.client\.inference\.operation\.details\s*<\/code[^>]*>\s*イベント/g, "ツール定義を含む{' '}<code>gen_ai.client.inference.operation.details</code>{' '}イベント");
mainContent = mainContent.replace(/動的にユーザー応答を生成する\s*<strong[^>]*>\s*User Simulation（ユーザーシミュレーション）\s*<\/strong[^>]*>/g, "動的にユーザー応答を生成する{' '}<strong>User Simulation（ユーザーシミュレーション）</strong>");
mainContent = mainContent.replace(/ADKの\s*<strong[^>]*>\s*評価基準（Evaluation Criteria）\s*<\/strong[^>]*>\s*とAgent Platformの\s*<strong[^>]*>\s*Online Monitor（継続的品質監視）\s*<\/strong[^>]*>\s*の両輪/g, "ADKの{' '}<strong>評価基準（Evaluation Criteria）</strong> とAgent Platformの{' '}<strong>Online Monitor（継続的品質監視）</strong>{' '}の両輪");
mainContent = mainContent.replace(/ADKは既定で\s*<code[^>]*>\s*tool_trajectory_avg_score=1\.0\s*<\/code[^>]*>（完全一致を要求）と\s*<code[^>]*>\s*response_match_score=0\.8\s*<\/code[^>]*>/g, "ADKは既定で{' '}<code>tool_trajectory_avg_score=1.0</code>（完全一致を要求）と{' '}<code>response_match_score=0.8</code>");
mainContent = mainContent.replace(/厳密に見たい場合は\s*<code[^>]*>\s*final_response_match_v2\s*<\/code[^>]*>\s*を、参照回答がないケースでは\s*<code[^>]*>\s*rubric_based_final_response_quality_v1\s*<\/code[^>]*>\s*を追加する/g, "厳密に見たい場合は{' '}<code>final_response_match_v2</code> を、参照回答がないケースでは{' '}<code>rubric_based_final_response_quality_v1</code>{' '}を追加する");
mainContent = mainContent.replace(/回す仕組みが\s*<strong[^>]*>\s*Online Monitor\s*<\/strong[^>]*>\s*です。/g, "回す仕組みが{' '}<strong>Online Monitor</strong> です。");
mainContent = mainContent.replace(/アップロードは\s*<code[^>]*>\s*OTEL_INSTRUMENTATION_GENAI_UPLOAD_FORMAT\s*<\/code[^>]*>\s*単体では/g, "アップロードは{' '}<code>OTEL_INSTRUMENTATION_GENAI_UPLOAD_FORMAT</code>{' '}単体では");
mainContent = mainContent.replace(/<code[^>]*>\s*OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT\s*<\/code[^>]*>\s*は/g, "<code>OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT</code>{' '}は");
mainContent = mainContent.replace(/<code[^>]*>\s*OTEL_INSTRUMENTATION_GENAI_UPLOAD_FORMAT\s*<\/code[^>]*>\s*は/g, "<code>OTEL_INSTRUMENTATION_GENAI_UPLOAD_FORMAT</code>{' '}は");
mainContent = mainContent.replace(/有効化前に次を満たすこと。[\s\S]*?<\/p>\s*<ul>/g, "有効化前に次を満たすこと。</p>{' '}\n                        <ul>");
mainContent = mainContent.replace(/<strong>マスキング／秘匿化<\/strong>：<code[^>]*>\s*EVENT_ONLY\s*<\/code[^>]*>\s*は/g, "<strong>マスキング／秘匿化</strong>：<code>EVENT_ONLY</code>{' '}は");
mainContent = mainContent.replace(/<code[^>]*>\s*NO_CONTENT\s*<\/code[^>]*>\s*を選択する/g, "<code>NO_CONTENT</code>{' '}を選択する");
mainContent = mainContent.replace(/agentスパンと\s*<code[^>]*>\s*gen_ai\.client\.inference\.operation\.details\s*<\/code[^>]*>\s*イベント/g, "agentスパンと{' '}<code>gen_ai.client.inference.operation.details</code>{' '}イベント");
mainContent = mainContent.replace(/<code[^>]*>\s*EVENT_ONLY\s*<\/code[^>]*>\s*を設定しただけで/g, "<code>EVENT_ONLY</code>{' '}を設定しただけで");
mainContent = mainContent.replace(/<code[^>]*>\s*roles\/storage\.objectViewer\s*<\/code[^>]*>\s*などを/g, "<code>roles/storage.objectViewer</code>{' '}などを");
mainContent = mainContent.replace(/agent's/g, 'agent&apos;s');
mainContent = mainContent.replace(/I\/O '26/g, 'I/O &apos;26');

// 7. Fix standalone braces or entity encoding in text where appropriate
// In code blocks or paragraphs, &quot; is fine. Convert naked { or } if inside text
// Be careful not to replace {checkedCount} or {!!checkedItems...}
// Let's inspect where { or } might be in text:
// In original HTML, let's see if there are raw { or }

const fullTsx = `'use client';

import { memo, useState } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { NavBar } from './NavBar';
import { DIAGRAMS, type DiagramId } from './constants';

interface DiagramProps {
    id: DiagramId;
    ariaLabel: string;
}

const Diagram = memo(function Diagram({ id, ariaLabel }: DiagramProps) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap">
            <MermaidDiagram
                chart={chart}
                ariaLabel={ariaLabel}
                preserveNaturalScale={true}
                theme="light"
            />
        </div>
    );
});

export default function Section4Guide() {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
    const totalChecklist = 17;
    const checkedCount = Object.values(checkedItems).filter(Boolean).length;

    const handleCheckChange = (id: string) => {
        setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="agentic-section4-page">
            <div className="layout">
                <NavBar />
                <main className="main">
${mainContent}
                </main>
            </div>
        </div>
    );
}
`;

writeFileSync('app/gcl/professional-agentic-architect/section4/Section4Guide.tsx', fullTsx, 'utf8');
console.log('Successfully generated Section4Guide.tsx');
