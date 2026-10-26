import fixture from '@/docs/migration-inventory/aws-ans-c01-guide.fidelity.json';
import { withSourceCorrections } from './aip-source-corrections';
import { ANS_GUIDE_CORRECTIONS } from './aws-guide-source-corrections';
/** 原本の明色を共有コンポーネントの既定値から保護する表示期待値。 */
export function ansGuidePart(id: keyof typeof fixture.guideParts) {
 const source=fixture.guideInteractions.mermaidConfig;
 const {primaryColor:p,primaryBorderColor:b,primaryTextColor:t,lineColor:l,background:bg,secondaryColor:s}=source.themeVariables;
 const config={...source,themeVariables:{...source.themeVariables,
 mainBkg:p,actorBkg:p,stateBkg:p,activationBkgColor:p,
 actorBorder:b,stateBorder:b,activationBorderColor:b,
 actorTextColor:t,stateLabelColor:t,signalTextColor:t,labelTextColor:t,titleColor:t,
 actorLineColor:l,signalColor:l,labelBoxBkgColor:bg,labelBoxBorderColor:b,
 noteBkgColor:s,noteTextColor:t,noteBorderColor:b}};
 const prefix=`---\nconfig: ${JSON.stringify(config)}\n---\n`;
 const part=withSourceCorrections(fixture.guideParts[id],ANS_GUIDE_CORRECTIONS);
 return {...part,diagrams:part.diagrams.map(chart=>prefix+chart)};
}
