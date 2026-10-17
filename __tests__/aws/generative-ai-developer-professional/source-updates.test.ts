import { describe, expect, it } from 'vitest';
import inventory from '@/docs/migration-inventory/aws-aip-c01-guide.json';
import fixture from '@/docs/migration-inventory/aws-aip-c01-guide.fidelity.json';

// AWS公式告知（2026-06-30）とBedrock Data encryptionを根拠にした原本訂正。
// 原本を必要とせず、固定Gitから生成した期待値の更新漏れを検出する。
describe('AIP independently sourced factual corrections', () => {
    it('records Agents Classic availability and AgentCore guidance in source cells', () => {
        expect(inventory.td).toContain('マネージドのエージェント(アクショングループ、ナレッジベース連携、トレース)。2026年7月30日に新規顧客の受付を終了(Agents Classic、メンテナンスモード)');
        expect(inventory.td).toContain('既存顧客向けの選択肢。新規のエージェント開発は AgentCore へ');
    });
    it('records A2I eligibility in the complete source paragraph', () => {
        expect(inventory.bodyContent.some(block => block.text.includes('Augmented AI(A2I)は2026年7月30日に新規顧客の受付を終了しており、既存顧客のみの選択肢)'))).toBe(true);
    });
    it('distinguishes TLS in transit from KMS at rest and retains both emphases', () => {
        expect(inventory.td).toContain('TLSで転送時、KMSで対応リソースの保存時を暗号化。カスタムモデルやKBのデータにも顧客管理キー');
        expect(fixture.guideParts.domain3.inline).toContainEqual({ tag: 'strong', text: 'TLS' });
        expect(fixture.guideParts.domain3.inline).toContainEqual({ tag: 'strong', text: 'KMS' });
    });
});
