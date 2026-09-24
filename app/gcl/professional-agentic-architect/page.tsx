import type { Metadata } from 'next';
import ProfessionalAgenticArchitectGuide from './ProfessionalAgenticArchitectGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'Google Cloud Professional Agentic Architect 認定試験 技術ガイド',
    description:
        '初学者向けに、Professional Agentic Architectベータ試験の出題範囲を項目ごとに解説し、各サービス・機能のベストプラクティスをまとめた技術文書です。',
};

export default function ProfessionalAgenticArchitectPage() {
    return <ProfessionalAgenticArchitectGuide />;
}
