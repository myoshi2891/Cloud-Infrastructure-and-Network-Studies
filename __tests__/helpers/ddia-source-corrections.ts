type Correction = readonly [from: string, to: string];

/**
 * DDIA: 図の訂正。固定Git由来fixtureは保持し、表示の期待値にだけ適用する。
 * 全体図の5区分は本ガイド独自の整理であり、原著の部構成ではないことを図中に明示する（章の対応は変えない）。
 */
export const DDIA_DIAGRAM_CORRECTIONS: readonly Correction[] = [
    ['Start(["DDIA 第2版<br/>全14章 + 序文"])', 'Start(["DDIA 第2版<br/>全14章 + 序文<br/>以下は本ガイド独自の5区分<br/>原著の部構成ではない"])'],
    ['subgraph P1["Part I: ', 'subgraph P1["本ガイドの区分 I: '],
    ['subgraph P2["Part II: ', 'subgraph P2["本ガイドの区分 II: '],
    ['subgraph P3["Part III: ', 'subgraph P3["本ガイドの区分 III: '],
    ['subgraph P4["Part IV: ', 'subgraph P4["本ガイドの区分 IV: '],
    ['subgraph P5["Part V: ', 'subgraph P5["本ガイドの区分 V: '],
];
