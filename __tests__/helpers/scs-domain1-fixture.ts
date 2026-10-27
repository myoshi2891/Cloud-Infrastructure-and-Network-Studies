import fixture from '@/docs/migration-inventory/aws-scs-c03-domain1-guide.fidelity.json';

/** 原本の明色を共有コンポーネントの既定値から保護する表示期待値。 */
export function scsDomain1Part(id: keyof typeof fixture.guideParts) {
    const source = fixture.guideInteractions.mermaidConfig;
    const {
        primaryColor: p,
        primaryBorderColor: b,
        primaryTextColor: t,
        lineColor: l,
        background: bg,
        secondaryColor: s,
    } = source.themeVariables;
    const config = {
        ...source,
        themeVariables: {
            ...source.themeVariables,
            mainBkg: p,
            actorBkg: p,
            stateBkg: p,
            activationBkgColor: p,
            actorBorder: b,
            stateBorder: b,
            activationBorderColor: b,
            actorTextColor: t,
            stateLabelColor: t,
            signalTextColor: t,
            labelTextColor: t,
            titleColor: t,
            actorLineColor: l,
            signalColor: l,
            labelBoxBkgColor: bg,
            labelBoxBorderColor: b,
            noteBkgColor: s,
            noteTextColor: t,
            noteBorderColor: b,
        },
    };
    const prefix = `---\nconfig: ${JSON.stringify(config)}\n---\n`;
    const part = fixture.guideParts[id];
    return { ...part, diagrams: part.diagrams.map((chart) => prefix + chart) };
}
