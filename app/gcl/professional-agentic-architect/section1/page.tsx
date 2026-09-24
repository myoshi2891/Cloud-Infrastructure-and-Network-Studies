import type { Metadata } from 'next';
import Section1Guide from './Section1Guide';
import './page.css';

export const metadata: Metadata = {
    title: 'Professional Agentic Architect 試験ガイド — セクション1: ローコードツールでのエージェント構築（配点 約13%）',
    description:
        'Professional Agentic Architect 認定試験 セクション1「ローコードツールでのエージェント構築」完全解説ガイド。Workflow Builder、CX Agent Studio、状態ベースワークフロー、インストラクション設計、Agent Search、マルチモーダルデータ接続を徹底解説。',
};

export default function ProfessionalAgenticArchitectSection1Page() {
    return <Section1Guide />;
}
