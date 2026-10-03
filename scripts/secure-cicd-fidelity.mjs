/** 移行元と移行先で共有するリスト・装飾・ナビゲーションの抽出。 */
export function snapshotGuideStructure(root) {
    return {
        lists: [...root.querySelectorAll('main ul, main ol')].map(list => ({
            tag: list.tagName.toLowerCase(),
            className: list.className,
            start: list.getAttribute('start'),
            items: [...list.children].map(item => (item.textContent ?? '').replace(/\s+/g, '').trim()),
        })),
        icons: [...root.querySelectorAll('i.ti')].map(icon => icon.className),
        sections: [...root.querySelectorAll('main section[id]')].map(section => section.id),
        navigation: [...root.querySelectorAll('.sidebar nav a')].map(link => ({
            href: link.getAttribute('href'), text: (link.textContent ?? '').replace(/\s+/g, ''),
        })),
    };
}

/** 原本スクリプト内の静的 Mermaid 定義だけを抽出する。実行はしない。 */
export function extractGuideDiagrams(html) {
    const block = html.match(/var DIAGRAMS = \{([\s\S]*?)\n\s*\};/);
    if (!block) throw new Error('DIAGRAMS not found');
    return Object.fromEntries([...block[1].matchAll(/(\w+): `([^`]+)`/g)].map(match => [match[1], match[2]]));
}
