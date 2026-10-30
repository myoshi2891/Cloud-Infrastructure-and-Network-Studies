import { snapshotCssRules } from './tanenbaum-fidelity.mjs';
export { snapshotCssRules };
/** 原本・描画結果の本文構造を同じ規則で比較する。図は別途DSL比較する。 */
export function snapshotDdia(root) {
 const main = root.querySelector('main');
 function visit(n) {
  // 書式上の改行・字下げは1つの空白に畳み、語間の空白（REPEATABLE READ 等）は残す
  if (n.nodeType === 3) return n.textContent.replace(/\s+/g, ' ').trim();
  if (n.nodeType !== 1) return null;
  if (n.matches('pre.mermaid, .ddia-diagram')) return { diagram: true };
  return {tag:n.tagName.toLowerCase(), attrs:[...n.attributes].filter(a=>!['tabindex','scope'].includes(a.name)&&!(n.matches('.table-scroll')&&['role','aria-label'].includes(a.name))).map(a=>[a.name,a.value]), children:[...n.childNodes].map(visit).filter(v=>v!==null&&v!=='')};
 }
 return visit(main);
}
