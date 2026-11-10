// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { snapshotSvgDiagrams } from '@/scripts/svg-fidelity-extraction.mjs';

/** SVGの属性・階層・foreignObjectを比較するための原本相当DOMを作る。 */
function mount(markup: string) {
    const root = document.createElement('div');
    root.innerHTML = `<div class="mermaid-diagram" id="mmd-1" aria-label="関係図">${markup}</div>`;
    return root;
}

describe('描画済みSVGの忠実性スナップショット', () => {
    it('空のstyle属性の有無は、描画に影響しない同一の図として扱う', () => {
        expect(snapshotSvgDiagrams(mount('<svg><path style="" d="M0 0L1 1"/></svg>')))
            .toEqual(snapshotSvgDiagrams(mount('<svg><path d="M0 0L1 1"/></svg>')));
    });
    it('属性順とstyle宣言順を正規化し、同じ図を同じ値として比較する', () => {
        const a = mount('<svg width="400" viewBox="0 0 400 200"><path d="M0 0L1 1" style="fill: red; stroke: blue"/></svg>');
        const b = mount('<svg viewBox="0 0 400 200" width="400"><path style="stroke: blue; fill: red" d="M0 0L1 1"/></svg>');
        expect(snapshotSvgDiagrams(a)).toEqual(snapshotSvgDiagrams(b));
    });

    it('座標・自然寸法・階層・ラベル・埋め込みCSSの欠落や変更を検出する', () => {
        const original = '<svg width="400" viewBox="0 0 400 200"><style>.node{fill:red}</style><g><path d="M0 0L1 1"/><foreignObject><div>クラウドサービス</div></foreignObject></g></svg>';
        const expected = snapshotSvgDiagrams(mount(original));
        for (const changed of [
            original.replace('width="400"', 'width="40"'),
            original.replace('M0 0L1 1', 'M0 0L2 2'),
            original.replace('<g>', '').replace('</g>', ''),
            original.replace('クラウドサービス', 'クラウド'),
            original.replace('fill:red', 'fill:blue'),
        ]) expect(snapshotSvgDiagrams(mount(changed))).not.toEqual(expected);
    });
});
