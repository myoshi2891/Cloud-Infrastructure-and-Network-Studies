import { snapshotCssRules } from './tanenbaum-fidelity.mjs';
export { snapshotCssRules };
/** 原本・描画結果の本文構造を同じ規則で比較する。図は別途DSL比較する。 */
export function snapshotDdia(root) {
 const main = root.querySelector('main');
 function visit(n) {
  if (n.nodeType === 3) return n.textContent.replace(/\s+/g, '');
  if (n.nodeType !== 1) return null;
  if (n.matches('pre.mermaid, .ddia-diagram')) return { diagram: true };
  return {tag:n.tagName.toLowerCase(), attrs:[...n.attributes].filter(a=>!['tabindex','scope'].includes(a.name)).map(a=>[a.name,a.value]), children:[...n.childNodes].map(visit).filter(v=>v!==null&&v!=='')};
 }
 return visit(main);
}
