import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import mermaid from 'mermaid';
import { EXAMS } from '@/app/constants';
import source from '@/app/aws/solutions-architect-professional/domain3/mermaid-theme.json';
import renderTheme from '@/app/aws/solutions-architect-professional/domain3/render-theme.json';
import { isValid, toHex } from 'khroma';
import fixture from '@/docs/migration-inventory/aws-sap-c02-domain3.fidelity.json';
import { contrastRatio, themeColor } from '@/__tests__/helpers/color-contrast';
import { snapshotCssRules } from '@/scripts/tanenbaum-fidelity.mjs';
import { SAP_D3_COLOR_LITERAL, SAP_D3_COLOR_TOKENS } from '@/scripts/sap-domain3-color-tokens.mjs';

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
 it('サイドバー背景・構文色などの固定色を@themeトークンで参照し、再生成処理にも反映',()=>{
  const css=fs.readFileSync('app/aws/solutions-architect-professional/domain3/page.css','utf8');const globals=fs.readFileSync('app/globals.css','utf8');const theme=globals.slice(globals.indexOf('@theme {'),globals.indexOf('\n}',globals.indexOf('@theme {')));
  expect(SAP_D3_COLOR_TOKENS['#fff']).toBeDefined();for(const literal of ['#7c3aed','#0f7a4a','#b45309','#6b7a99','#1d4ed8'])expect(SAP_D3_COLOR_TOKENS[literal],literal).toMatch(/^hljs-/);
  for(const [literal,token] of Object.entries(SAP_D3_COLOR_TOKENS)){expect(theme).toContain(`--color-sap-d3-${token}: ${literal};`);expect(css).toContain(`var(--color-sap-d3-${token})`);}
  expect(css.match(SAP_D3_COLOR_LITERAL)).toBeNull();
  const sidebar=snapshotCssRules(css).find(r=>r.selector==='.sap-domain3-page .sidebar');expect(sidebar?.declarations).toContainEqual({prop:'background',value:`var(--color-sap-d3-${SAP_D3_COLOR_TOKENS['#fff']})`,important:false});
  expect(fs.readFileSync('scripts/migrate-sap-domain3.mjs','utf8')).toContain("from './sap-domain3-color-tokens.mjs'");
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
 it('目次を開いている間も開閉ボタンを目次より手前に保ち、再生成処理にも反映',()=>{
  const css=fs.readFileSync('app/aws/solutions-architect-professional/domain3/page.css','utf8');const rules=snapshotCssRules(css);
  const z=(selector:string)=>Number(rules.filter(r=>r.selector===selector&&!r.media).flatMap(r=>r.declarations).filter(d=>d.prop==='z-index').at(-1)?.value);
  expect(z('.sap-domain3-page .sidebar-toggle')).toBeGreaterThan(z('.sap-domain3-page .sidebar'));
  expect(z('.sap-domain3-page .sidebar-toggle')).toBeLessThan(50);
  const script=fs.readFileSync('scripts/migrate-sap-domain3.mjs','utf8');
  expect(script).toContain('.sap-domain3-page .sidebar-toggle { top: calc(var(--header-h, 60px) + var(--disclaimer-height, 0px) + 14px); z-index: 41; }');
  expect(css).toContain('.sap-domain3-page .sidebar-toggle { top: calc(var(--header-h, 60px) + var(--disclaimer-height, 0px) + 14px); z-index: 41; }');
 });
 it('チェックボックス枠と完了項目の文字色は白背景に対しWCAGの非テキスト3:1・本文4.5:1を満たし、再生成処理にも反映',()=>{
  const globals=fs.readFileSync('app/globals.css','utf8');const surface=themeColor(globals,'color-sap-d3-surface');
  expect(contrastRatio(themeColor(globals,'color-sap-d3-checkbox-border'),surface)).toBeGreaterThanOrEqual(3);
  expect(contrastRatio(themeColor(globals,'color-sap-d3-checked-label'),surface)).toBeGreaterThanOrEqual(4.5);
  const css=fs.readFileSync('app/aws/solutions-architect-professional/domain3/page.css','utf8');const script=fs.readFileSync('scripts/migrate-sap-domain3.mjs','utf8');
  for(const rule of [".sap-domain3-page .checklist-card input[type='checkbox']:not(:checked) { border-color: var(--color-sap-d3-checkbox-border); }",".sap-domain3-page .checklist-card li:has(input:checked) label { color: var(--color-sap-d3-checked-label); }"]){expect(css).toContain(rule);expect(script).toContain(rule);}
  expect(css.lastIndexOf(".sap-domain3-page .checklist-card li:has(input:checked) label { color: var(--color-sap-d3-checked-label); }")).toBeGreaterThan(css.indexOf('li:has(input:checked) label {'));
 });
 it("本文はServer Componentで描画し、Client状態はチェック進捗のChecklistCardに限定し、再生成処理にも反映",()=>{
  // jsdomのrenderはServer/Clientを区別しないため、境界はソースで検証する
  const dir="app/aws/solutions-architect-professional/domain3";const isClient=(file:string)=>/^\x27use client\x27;/.test(fs.readFileSync(dir+"/"+file,"utf8"));
  const clients=fs.readdirSync(dir).filter(file=>file.endsWith(".tsx")).filter(isClient).sort();
  expect(clients).toEqual(["ChecklistCard.tsx","Diagram.tsx","NavBar.tsx"]);
  expect(fs.existsSync(dir+"/types.ts")).toBe(false);
  for(const file of fs.readdirSync(dir+"/sections")){const code=fs.readFileSync(dir+"/sections/"+file,"utf8");expect(isClient("sections/"+file),file).toBe(false);expect(code,file).not.toMatch(/\bon[A-Z]\w*=|ChecklistProps|progress/);expect(code,file).toMatch(/export default function Content\(\)/);}
  const appendix=fs.readFileSync(dir+"/sections/appendix.tsx","utf8");expect(appendix.match(/<ChecklistCard>/g)).toHaveLength(5);
  const script=fs.readFileSync("scripts/migrate-sap-domain3.mjs","utf8");expect(script).toContain("<ChecklistCard>");expect(script).toContain("write(\x27ChecklistCard.tsx\x27");expect(script).not.toMatch(/updateProgress|ChecklistProps|types\.ts/);
 });
});
