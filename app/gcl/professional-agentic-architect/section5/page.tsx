import type { Metadata } from 'next';
import Section5Guide from './Section5Guide';
import './page.css';

export const metadata: Metadata = {
    title: 'Professional Agentic Architect 試験ガイド — セクション5: セキュリティとガバナンス（配点 約15%）',
    description:
        'Google Cloud Professional Agentic Architect 認定試験 セクション5「セキュリティとガバナンス」完全解説ガイド。自律型AIエージェントの脅威モデル（SAIF、OWASP Top 10 for Agentic Security Threats）、Agent Identity（SPIFFE/SPIRE、DPoP、PAB、IAM Conditions）、ネットワーク境界（VPC-SC、CMEK、Sensitive Data Protection、PSC）、Model Armor（Floor Settings、Template）、Semantic Governance Policy（NLC、PDP）、Human-in-the-Loop（HITL）、Agent Observability、Agent Anomaly Detection、意思決定フローチャートを網羅。',
};

export default function ProfessionalAgenticArchitectSection5Page() {
    return <Section5Guide />;
}
