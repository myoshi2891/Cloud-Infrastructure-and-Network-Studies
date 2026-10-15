import fixture from '@/docs/migration-inventory/aws-aip-c01-domain1-guide.fidelity.json';

/** 原本の描画設定をDSLに付与した期待値。実装側の定数には依存しない。 */
export function aipDomain1Part(id: keyof typeof fixture.guideParts) {
    const part = fixture.guideParts[id];
    return { ...part, diagrams: part.diagrams.map(chart => `%%{init: ${JSON.stringify(fixture.guideInteractions.mermaidConfig)}}%%\n${chart}`) };
}
