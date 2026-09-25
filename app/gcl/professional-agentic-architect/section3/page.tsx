import type { Metadata } from 'next';
import Section3Guide from './Section3Guide';
import './page.css';

export const metadata: Metadata = {
    title: 'Professional Agentic Architect 試験ガイド — セクション3: カスタムエージェントの開発（配点 約33%）',
    description:
        'Google Cloud Professional Agentic Architect 認定試験 セクション3「カスタムエージェントの開発」完全解説ガイド。言語モデル選定基準（LLM/SLM, self-hosted/SaaS, OSS/proprietary）、Agent Development Kit (ADK) によるエージェント構築、セッションとメモリ設定（Memory Bank, Managed Sessions）、Agents CLI スキル設定、RAGパイプラインとVector Search 1.0 / Agent Retrieval、Agent Identity、事前構築・カスタムツール、エージェントプロトコル（MCP / A2A）、マルチエージェントオーケストレーション（Sequential, Parallel, Loop, Graph）を網羅。',
};

export default function ProfessionalAgenticArchitectSection3Page() {
    return <Section3Guide />;
}
