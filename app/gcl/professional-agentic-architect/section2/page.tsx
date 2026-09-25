import type { Metadata } from 'next';
import Section2Guide from './Section2Guide';
import './page.css';

export const metadata: Metadata = {
    title: 'Professional Agentic Architect 試験ガイド — セクション2: コーディングエージェントを使用したアプリケーション開発（配点 約17%）',
    description:
        'Professional Agentic Architect 認定試験 セクション2「コーディングエージェントを使用したアプリケーション開発」完全解説ガイド。MCPサーバー・カスタムスキル・ツールアクセス、セキュアサンドボックス（GKE Agent Sandbox / gVisor / Cloud Workstations）、リファクタリング・最適化・脆弱性パッチ、Antigravity拡張（ルール・スキル・プラグイン・フック・サブエージェント）、Agents CLIとガバナンス（Agent/Skill Registry）を徹底解説。',
};

export default function ProfessionalAgenticArchitectSection2Page() {
    return <Section2Guide />;
}
