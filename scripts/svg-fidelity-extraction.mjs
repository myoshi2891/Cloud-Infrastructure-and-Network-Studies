import { normalize } from './inventory-extraction.mjs';

/**
 * 描画済みSVGの幾何・階層・ラベル・埋め込みCSSを、属性順に依存せず記録する。
 * @param {ParentNode} root - 原本または移行後のDOM。
 * @returns {object[]} 図のID・読み上げ名とSVGツリー。
 */
export function snapshotSvgDiagrams(root) {
    /** 空白ノードを除き、属性とinline styleを正規化したノードツリーを返す。 */
    function snapshot(node) {
        if (node.nodeType === 3) return normalize(node.textContent) || null;
        if (node.nodeType !== 1) return null;
        const attributes = [...node.attributes].filter(({ name }) => name !== 'style' || node.style.length > 0).map(({ name, value }) => [name,
            name === 'style'
                ? Array.from({ length: node.style.length }, (_, index) => node.style.item(index))
                    .sort().map(property => [property, node.style.getPropertyValue(property).trim(), node.style.getPropertyPriority(property)])
                : value,
        ]).sort(([a], [b]) => a.localeCompare(b));
        return { tag: node.localName, attributes, children: [...node.childNodes].map(snapshot).filter(value => value !== null) };
    }
    return [...root.querySelectorAll('.mermaid-diagram')].map(element => ({
        id: element.id,
        label: element.getAttribute('aria-label'),
        svg: snapshot(element.querySelector('svg')),
    }));
}
