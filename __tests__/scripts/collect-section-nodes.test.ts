// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { collectSectionNodes } from '@/scripts/collect-section-nodes.mjs';

/** `.main` 直下に見出しと段落を並べた最小の文書を作る。 */
const buildDoc = (body: string): Document =>
    new DOMParser().parseFromString(`<div class="main">${body}</div>`, 'text/html');

const SOURCE = '<h2 id="a">A</h2><p>a1</p><h2 id="b">B</h2><p>b1</p><h2 id="c">C</h2>';
const ids = (nodes: readonly Element[]) => nodes.map((node) => node.id || node.textContent);

describe('collectSectionNodes — 見出し境界によるセクション抽出', () => {
    it('開始見出しから次の境界の直前までの兄弟要素を返す', () => {
        expect(ids(collectSectionNodes(buildDoc(SOURCE), 'a', 'b'))).toEqual(['a', 'a1']);
    });

    it('開始 ID が空文字なら .main の先頭要素から始める', () => {
        expect(ids(collectSectionNodes(buildDoc(`<p>lead</p>${SOURCE}`), '', 'a'))).toEqual(['lead']);
    });

    it('次の境界が未設定の最終セクションは兄弟要素の末尾まで返す', () => {
        expect(ids(collectSectionNodes(buildDoc(SOURCE), 'b', undefined))).toEqual(['b', 'b1', 'c']);
    });

    it('開始 ID に一致する要素がなければ失敗する', () => {
        expect(() => collectSectionNodes(buildDoc(SOURCE), 'missing', 'b')).toThrow(/missing/);
    });

    it('開始 ID が空文字で .main の先頭要素がなければ失敗する', () => {
        expect(() => collectSectionNodes(buildDoc(''), '', 'a')).toThrow(/\.main/);
    });

    it('次の境界へ到達する前に兄弟要素が尽きたら失敗する', () => {
        expect(() => collectSectionNodes(buildDoc(SOURCE), 'b', 'missing')).toThrow(/missing/);
    });

    it('次の境界が開始位置より前にあり到達できなければ失敗する', () => {
        expect(() => collectSectionNodes(buildDoc(SOURCE), 'b', 'a')).toThrow(/a/);
    });
});
