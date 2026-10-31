import { snapshotCssRules } from './tanenbaum-fidelity.mjs';
export { snapshotCssRules };
const INLINE = 'a, abbr, b, cite, code, em, i, kbd, label, mark, q, s, samp, small, span, strong, sub, sup, time, u, var';
/** 空白だけのテキストは描画時に隣の空白へ畳まれるため、兄弟として数えない。 */
function contentSibling(node, sibling) {
 let next = node[sibling];
 while (next?.nodeType === 3 && !next.textContent.trim()) next = next[sibling];
 return next;
}
/** インライン祖先をたどり、その方向に兄弟がないままブロック境界へ達するかを判定する。 */
function atBlockEdge(n, sibling) {
 for (let node = n; !contentSibling(node, sibling); node = node.parentNode) if (!node.parentNode?.matches?.(INLINE)) return true;
 return false;
}
/** 原本・描画結果の本文構造を同じ規則で比較する。図は別途DSL比較する。 */
export function snapshotDdia(root) {
 // JSX の {' '} で分かれた隣接テキストを原本と同じ1ノードにまとめる（描画結果そのものは変更しない）
 const main = root.querySelector('main').cloneNode(true);
 main.normalize();
 function visit(n) {
  // 書式上の改行・字下げは1つの空白に畳み、語間とインライン要素境界の空白は残す。ブロック要素の先頭・末尾に接する空白だけを除く
  if (n.nodeType === 3) {
   let text = n.textContent.replace(/\s+/g, ' ');
   // 表の構造要素の間の空白は描画されず、React も出力しないため比較しない
   if (text === ' ' && n.parentNode.matches('table, thead, tbody, tfoot, tr, colgroup')) return '';
   if (atBlockEdge(n, 'previousSibling')) text = text.trimStart();
   if (atBlockEdge(n, 'nextSibling')) text = text.trimEnd();
   return text;
  }
  if (n.nodeType !== 1) return null;
  if (n.matches('pre.mermaid, .ddia-diagram')) return { diagram: true };
  return {tag:n.tagName.toLowerCase(), attrs:[...n.attributes].filter(a=>!['tabindex','scope'].includes(a.name)&&!(n.matches('.table-scroll')&&['role','aria-label'].includes(a.name))).map(a=>[a.name,a.value]), children:[...n.childNodes].map(visit).filter(v=>v!==null&&v!=='')};
 }
 return visit(main);
}
