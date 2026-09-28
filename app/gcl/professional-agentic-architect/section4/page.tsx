import type { Metadata } from 'next';
import Section4Guide from './Section4Guide';
import './page.css';

export const metadata: Metadata = {
    title: 'Professional Agentic Architect 試験ガイド — セクション4: 評価とデプロイ（配点 約22%）',
    description:
        'Google Cloud Professional Agentic Architect 認定試験 セクション4「評価とデプロイ」完全解説ガイド。テストセット作成（ゴールデンデータ、プロンプト、エッジケース）、継続的評価パイプライン（Online Monitor、OpenTelemetry）、評価フレームワーク選定（ADK evalset、Agent Platform Gen AI Evaluation Service、custom autoraters）、ゴールデンデータセット評価、デプロイランタイム選定（Agent Runtime、Cloud Run、GKE）、トラブルシューティング（ドリフト、ツールレイテンシ、推論ループ、障害、Agent Anomaly Detection）、パフォーマンス・信頼性・コスト最適化（コールドスタート、min_instances、container_concurrency）を網羅。',
};

export default function ProfessionalAgenticArchitectSection4Page() {
    return <Section4Guide />;
}
