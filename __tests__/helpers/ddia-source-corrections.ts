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
    // 過半数の承認を得られなくても、リーダーが稼働していれば同じリーダーが複製を再試行する。
    // リーダーの再選出はリーダー障害時に限る。
    [
        'Vote -->|"いいえ"| Retry["リーダーを再選出し<br/>再試行"]\n    Retry --> Start',
        'Vote -->|"いいえ"| Alive{"リーダーは<br/>稼働しているか?"}\n    Alive -->|"はい"| Retry["同じリーダーが<br/>複製を再試行"]\n    Retry --> Vote\n    Alive -->|"いいえ リーダー障害"| Elect["リーダーを再選出"]\n    Elect --> Start',
    ],
];
