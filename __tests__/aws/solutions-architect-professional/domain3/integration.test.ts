import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import mermaid from 'mermaid';
import { EXAMS } from '@/app/constants';
import source from '@/app/aws/solutions-architect-professional/domain3/mermaid-theme.json';
import renderTheme from '@/app/aws/solutions-architect-professional/domain3/render-theme.json';
import { isValid, toHex } from 'khroma';
import fixture from '@/docs/migration-inventory/aws-sap-c02-domain3.fidelity.json';
import { snapshotCssRules } from '@/scripts/tanenbaum-fidelity.mjs';

describe('SAP Domain 3 統合契約',()=>{
 it('ホームとHeaderの共通EXAMS導線はDomain 3と25%を表示',()=>{
  expect(EXAMS.find(e=>e.id==='aws-sap')?.domains).toContainEqual({label:'ドメイン3: 既存ソリューションの継続的改善',href:'/aws/solutions-architect-professional/domain3',pct:'25%'});
 });
 it('原本ライトテーマと共有フッターが連動',()=>{
  expect(fs.readFileSync('components/Footer.module.css','utf8')).toContain('.sap-domain3-page');
  expect(fs.readFileSync('app/aws/solutions-architect-professional/domain3/Diagram.tsx','utf8')).toMatch(/preserveChartTheme/);
 });
 it('原本の全ローカル色をグローバルテーマトークンに対応付け',()=>{
  const globals=fs.readFileSync('app/globals.css','utf8');const root=fixture.guideDesign.rules.find(r=>r.selector===':root')!;
  for(const [key,value] of Object.entries(root.declarations))if(key.startsWith('--')&&!['--sidebar-w','--font-jp'].includes(key))expect(globals).toContain(`--color-sap-d3-${key.slice(2)}: ${value};`);
 });
 it('原本単体の派生色を全量固定し、共有dark設定の混入を防ぐ',()=>{
  mermaid.initialize({...source,theme:'base',flowchart:{...source.flowchart,curve:'basis'},startOnLoad:false});const expected=Object.fromEntries(Object.entries(mermaid.mermaidAPI.getConfig().themeVariables??{}).map(([k,v])=>[k,typeof v==='string'&&/^(?:hsl|rgb)a?\(/.test(v)&&isValid(v)?toHex(v):v]));
  expect(renderTheme.themeVariables).toEqual({...expected,fontFamily:'"Noto Sans JP Variable",sans-serif'});
 });
 it('固定目次・アンカー着地が共有ヘッダーの高さを含む',()=>{
  const rules=snapshotCssRules(fs.readFileSync('app/aws/solutions-architect-professional/domain3/page.css','utf8'));
  const sidebar=rules.filter(r=>r.selector==='.sap-domain3-page .sidebar');expect(sidebar.at(-1)?.declarations).toContainEqual({prop:'top',value:'calc(var(--header-h, 60px) + var(--disclaimer-height, 0px))',important:false});
 });
 it('モバイルで閉じた目次をフォーカス・読み上げ対象から外し、再生成処理にも反映',()=>{
  const rule='@media (max-width: 980px) { .sap-domain3-page .sidebar:not(.open) { visibility: hidden; transition: transform 0.25s, visibility 0s linear 0.25s; } }';
  const css=fs.readFileSync('app/aws/solutions-architect-professional/domain3/page.css','utf8');const rules=snapshotCssRules(css);
  const closed=rules.find(r=>r.selector==='.sap-domain3-page .sidebar:not(.open)'&&r.media==='(max-width: 980px)');
  expect(closed?.declarations).toContainEqual({prop:'visibility',value:'hidden',important:false});
  expect(closed?.declarations).toContainEqual({prop:'transition',value:'transform 0.25s, visibility 0s linear 0.25s',important:false});
  expect(rules.some(r=>r.selector==='.sap-domain3-page .sidebar.open'&&r.declarations.some(d=>d.prop==='visibility'))).toBe(false);
  expect(css).toContain(rule);expect(fs.readFileSync('scripts/migrate-sap-domain3.mjs','utf8')).toContain(rule);
 });
});
