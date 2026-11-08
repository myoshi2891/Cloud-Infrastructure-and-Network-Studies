/**
 * 見出し ID の境界に基づいて、原本 DOM からセクションに属する兄弟要素を出現順に返す。
 * 境界設定の誤りで本文が空になったり後続セクションまで取り込んだりしないよう、到達できない境界は失敗として扱う。
 *
 * @param {Document} doc 原本 DOM
 * @param {string} startId 開始見出しの ID。空文字なら `.main` の先頭要素から始める
 * @param {string | undefined} nextId 次セクションの開始 ID。未設定なら兄弟要素の末尾まで
 * @returns {Element[]}
 */
export function collectSectionNodes(doc, startId, nextId) {
    const startNode = startId === '' ? doc.querySelector('.main > :first-child') : doc.getElementById(startId);
    if (!startNode) {
        throw new Error(
            startId === ''
                ? 'セクション開始要素（.main の先頭要素）が見つかりません'
                : `セクション開始 ID が見つかりません: ${startId}`,
        );
    }

    const nodes = [];
    for (let curr = startNode; curr; curr = curr.nextElementSibling) {
        if (nextId && curr.id === nextId) {
            if (nodes.length === 0) {
                throw new Error(`次セクションの開始 ID ${nextId} が開始要素と同じ位置にあり、本文が空になります（開始: ${startId || '.main 先頭'}）`);
            }
            return nodes;
        }
        nodes.push(curr);
    }
    if (nextId) {
        throw new Error(`次セクションの開始 ID ${nextId} へ到達する前に兄弟要素が尽きました（開始: ${startId || '.main 先頭'}）`);
    }
    return nodes;
}
