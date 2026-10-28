import fs from 'node:fs';
import postcss from 'postcss';
import { expect, it } from 'vitest';
import fixture from '@/docs/migration-inventory/aws-dva-domain4.fidelity.json';
import { snapshotCssRules } from '@/scripts/tanenbaum-fidelity.mjs';

it('元HTMLの全CSS宣言・メディア条件・装飾を保持する', () => {
    const css = fs.readFileSync('app/aws/developer-associate/domain4/page.css','utf8');
    const actual = snapshotCssRules(css);
    const vars: Record<string,string> = {};
    postcss.parse(fs.readFileSync('app/globals.css','utf8')).walkDecls(d => { if(d.prop.startsWith('--')) vars[d.prop]=d.value; });
    const original = fixture.css.find(rule => rule.selector === ':root')!;
    const sourceVars = Object.fromEntries(original.declarations.map(d => [d.prop,d.value]));
    const resolve = (value: string, variables: Record<string,string>): string => value.replace(/var\((--[\w-]+)\)/g, (_, key: string) => resolve(variables[key] ?? 'MISSING:'+key,variables)).replace(/\s/g,'').toLowerCase();
    for(const rule of fixture.css) {
        if(rule.selector === ':root') continue;
        const selector = [...new Set(rule.selector.split(',').map(part => {
            const s = part.trim().replaceAll('body.menu-open','.dva-troubleshooting-page.menu-open').replaceAll('.code-block','.code-sample').replaceAll('pre code','.code-block').replaceAll('pre','.code-block');
            return ['html','body'].includes(s) ? '.dva-troubleshooting-page' : s.startsWith('.dva-troubleshooting-page') ? s : '.dva-troubleshooting-page '+s;
        }))].join(', ');
        const found = actual.find((candidate: {selector:string;media:string|null}) => candidate.selector === selector && candidate.media === rule.media);
        expect(found,selector).toBeDefined();
        for(const decl of rule.declarations) {
            const observed = found?.declarations.find((d: {prop:string}) => d.prop === decl.prop);
            expect(observed,selector+' '+decl.prop).toBeDefined();
            if(decl.prop === 'font-family') continue;
            if(decl.prop === 'top' && ['.sidebar','.menu-btn'].includes(rule.selector)) { expect(observed?.value).toContain('var(--header-h, 60px)'); continue; }
            if(decl.prop === 'scroll-margin-top') { expect(observed?.value).toContain('var(--header-h, 60px)'); continue; }
            if(decl.prop === 'overflow-wrap' && decl.value === 'break-word') { expect(observed?.value).toBe('anywhere'); continue; }
            expect(resolve(observed?.value ?? '',vars),selector+' '+decl.prop).toBe(resolve(decl.value,sourceVars));
            expect(observed?.important).toBe(decl.important);
        }
    }
});
