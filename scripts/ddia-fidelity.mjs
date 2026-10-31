import { snapshotCssRules } from './tanenbaum-fidelity.mjs';
export { snapshotCssRules };
/** 原本・描画結果の本文構造を同じ規則で比較する。図は別途DSL比較する。 */
export function snapshotDdia(root) {
 // JSX の {' '} で分かれた隣接テキストを原本と同じ1ノードにまとめる（描画結果そのものは変更しない）
 const main = root.querySelector('main').cloneNode(true);
 main.normalize();
 function visit(n) {
  // 書式上の改行・字下げは1つの空白に畳み、語間とインライン要素境界の空白は残す。親要素の先頭・末尾の空白だけを除く
  if (n.nodeType === 3) {
   let text = n.textContent.replace(/\s+/g, ' ');
   // 表の構造要素の間の空白は描画されず、React も出力しないため比較しない
   if (text === ' ' && n.parentNode.matches('table, thead, tbody, tfoot, tr, colgroup')) return '';
   if (!n.previousSibling) text = text.trimStart();
   if (!n.nextSibling) text = text.trimEnd();
   return text;
  }
  if (n.nodeType !== 1) return null;
  if (n.matches('pre.mermaid, .ddia-diagram')) return { diagram: true };
  return {tag:n.tagName.toLowerCase(), attrs:[...n.attributes].filter(a=>!['tabindex','scope'].includes(a.name)&&!(n.matches('.table-scroll')&&['role','aria-label'].includes(a.name))).map(a=>[a.name,a.value]), children:[...n.childNodes].map(visit).filter(v=>v!==null&&v!=='')};
 }
 return visit(main);
}
