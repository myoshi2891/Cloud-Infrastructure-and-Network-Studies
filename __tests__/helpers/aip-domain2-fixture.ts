import fixture from '@/docs/migration-inventory/aws-aip-c01-domain2-guide.fidelity.json';

// ユーザー指定で削除した原本末尾の案内文は、表示内容の期待値に含めない。
const removedClosingNote = fixture.guideParts.revision.body.at(-1)?.text;
/** 原本の監査fixtureを保持し、削除指定された案内文だけを期待値から除く。 */
export function retainedDomain2Blocks<T extends { text: string }>(blocks: T[]): T[] {
 return blocks.filter(block => block.text !== removedClosingNote);
}
/** 原本の配色を補完し、暗いグローバル設定を継承しない描画契約。 */
export function aipDomain2Part(id:keyof typeof fixture.guideParts){
 const source=fixture.guideInteractions.mermaidConfig;
 const config={...source,themeVariables:{...source.themeVariables,
 mainBkg:'#e8eeff',actorBkg:'#e8eeff',stateBkg:'#e8eeff',activationBkgColor:'#e8eeff',
 actorBorder:'#9db2ee',stateBorder:'#9db2ee',activationBorderColor:'#9db2ee',
 actorTextColor:'#1c2a40',stateLabelColor:'#1c2a40',signalTextColor:'#1c2a40',labelTextColor:'#1c2a40',titleColor:'#1c2a40',
 actorLineColor:'#5b6f94',signalColor:'#5b6f94',labelBoxBkgColor:'#ffffff',labelBoxBorderColor:'#9db2ee',
 noteBkgColor:'#f1f5fd',noteTextColor:'#1c2a40',noteBorderColor:'#9db2ee'}};
 const prefix=`---\nconfig: ${JSON.stringify(config)}\n---\n`;
 const part=fixture.guideParts[id];
 return {...part,
 text:id==='revision'&&removedClosingNote ? part.text.replace(` ${removedClosingNote}`, '') : part.text,
 body:retainedDomain2Blocks(part.body),inline:retainedDomain2Blocks(part.inline),
 diagrams:part.diagrams.map(chart=>prefix+chart)};
}
