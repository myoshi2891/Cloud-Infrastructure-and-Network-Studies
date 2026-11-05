import renderTheme from '@/app/aws/security-specialty/domain3/render-theme.json';
import fixture from '@/docs/migration-inventory/aws-scs-c03-domain3-guide.fidelity.json';

/** 原本の明色を共有コンポーネントの既定値から保護する表示期待値。 */
export function scsDomain3Part(id: keyof typeof fixture.guideParts) {
    const prefix = `---\nconfig: ${JSON.stringify(renderTheme)}\n---\n`;
    const part = fixture.guideParts[id];
    return { ...part, diagrams: part.diagrams.map((chart) => prefix + chart) };
}
