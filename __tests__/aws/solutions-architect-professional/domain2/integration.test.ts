import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import mermaid from 'mermaid';
import { EXAMS } from '@/app/constants';
import source from '@/app/aws/solutions-architect-professional/domain2/mermaid-theme.json';
import renderTheme from '@/app/aws/solutions-architect-professional/domain2/render-theme.json';
import { isValid, toHex } from 'khroma';
import fixture from '@/docs/migration-inventory/aws-sap-c02-domain2.fidelity.json';
import { snapshotCssRules } from '@/scripts/tanenbaum-fidelity.mjs';

describe('SAP Domain 2 統合契約',()=>{
 it('ホームとHeaderの共通EXAMS導線はDomain 2と29%を表示',()=>{
  expect(EXAMS.find(e=>e.id==='aws-sap')?.domains).toContainEqual({label:'ドメイン2: 新しいソリューションの設計',href:'/aws/solutions-architect-professional/domain2',pct:'29%'});
 });
 it('原本ライトテーマと共有フッターが連動',()=>{
  expect(fs.readFileSync('components/Footer.module.css','utf8')).toContain('.sap-domain2-page');
  expect(fs.readFileSync('app/aws/solutions-architect-professional/domain2/Diagram.tsx','utf8')).toMatch(/preserveChartTheme/);
 });
 it('原本の全ローカル色をグローバルテーマトークンに対応付け',()=>{
  const globals=fs.readFileSync('app/globals.css','utf8');const root=fixture.guideDesign.rules.find(r=>r.selector===':root')!;
  for(const [key,value] of Object.entries(root.declarations))if(key.startsWith('--')&&!['--sidebar-w','--font-jp'].includes(key))expect(globals).toContain(`--color-sap-d2-${key.slice(2)}: ${value};`);
 });
 it('原本単体の派生色を全量固定し、共有dark設定の混入を防ぐ',()=>{
  mermaid.initialize({...source,theme:'base',flowchart:{...source.flowchart,curve:'basis'},startOnLoad:false});const expected=Object.fromEntries(Object.entries(mermaid.mermaidAPI.getConfig().themeVariables??{}).map(([k,v])=>[k,typeof v==='string'&&/^(?:hsl|rgb)a?\(/.test(v)&&isValid(v)?toHex(v):v]));
  expect(renderTheme.themeVariables).toEqual({...expected,fontFamily:'"Noto Sans JP Variable",sans-serif'});
 });
 it('固定目次・アンカー着地が共有ヘッダーの高さを含む',()=>{
  const rules=snapshotCssRules(fs.readFileSync('app/aws/solutions-architect-professional/domain2/page.css','utf8'));
  const sidebar=rules.filter(r=>r.selector==='.sap-domain2-page .sidebar');expect(sidebar.at(-1)?.declarations).toContainEqual({prop:'top',value:'calc(var(--header-h, 60px) + var(--disclaimer-height, 0px))',important:false});
 });
 it('モバイルで閉じた目次をフォーカス・読み上げ対象から外す',()=>{
  const rules=snapshotCssRules(fs.readFileSync('app/aws/solutions-architect-professional/domain2/page.css','utf8'));
  const closed=rules.find(r=>r.selector==='.sap-domain2-page .sidebar:not(.open)'&&r.media==='(max-width: 980px)');
  expect(closed?.declarations).toContainEqual({prop:'visibility',value:'hidden',important:false});
  expect(rules.some(r=>r.selector==='.sap-domain2-page .sidebar.open'&&r.declarations.some(d=>d.prop==='visibility'))).toBe(false);
 });
});
