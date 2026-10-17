import fixture from '@/docs/migration-inventory/aws-aip-c01-domain3-guide.fidelity.json';
/** 原本の配色を補完し、暗いグローバル設定を継承しない描画契約。 */
export function aipDomain3Part(id:keyof typeof fixture.guideParts){
 const source=fixture.guideInteractions.mermaidConfig;
 const config={...source,themeVariables:{...source.themeVariables,
 mainBkg:'#e8eefc',actorBkg:'#e8eefc',stateBkg:'#e8eefc',activationBkgColor:'#e8eefc',
 actorBorder:'#8fa7e3',stateBorder:'#8fa7e3',activationBorderColor:'#8fa7e3',
 actorTextColor:'#1b2740',stateLabelColor:'#1b2740',signalTextColor:'#1b2740',labelTextColor:'#1b2740',titleColor:'#1b2740',
 actorLineColor:'#5b6f95',signalColor:'#5b6f95',labelBoxBkgColor:'#ffffff',labelBoxBorderColor:'#8fa7e3',
 noteBkgColor:'#eef2f9',noteTextColor:'#1b2740',noteBorderColor:'#8fa7e3'}};
 const prefix=`---\nconfig: ${JSON.stringify(config)}\n---\n`;
 const part=fixture.guideParts[id];
 return {...part,diagrams:part.diagrams.map(chart=>prefix+chart)};
}
