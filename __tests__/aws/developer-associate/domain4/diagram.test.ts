import fs from 'node:fs';
import { expect, it } from 'vitest';
import mermaid from 'mermaid';
import { DIAGRAMS } from '@/app/aws/developer-associate/domain4/constants';
import theme from '@/app/aws/developer-associate/domain4/mermaid-theme.json';
import fixture from '@/docs/migration-inventory/aws-dva-domain4.fidelity.json';

it('全34図の原本DSLとテーマが一致しMermaid構文解析が成功する', async () => {
    expect(DIAGRAMS).toEqual(fixture.diagrams);
    expect(theme).toEqual(fixture.theme);
    mermaid.initialize({startOnLoad:false, securityLevel:'strict'});
    for(const chart of Object.values(DIAGRAMS)) {
        expect(chart.split('\n').every(line => !/^\s/.test(line))).toBe(true);
        expect(await mermaid.parse(chart)).toHaveProperty('diagramType');
    }
}, 20000);
it('全アイコンの自己ホストCSSを読み込み、全グリフがローカルに存在する', () => {
    const page = fs.readFileSync('app/aws/developer-associate/domain4/page.tsx','utf8');
    expect(page).toContain("import '@tabler/icons-webfont/tabler-icons.min.css'");
    const css = fs.readFileSync('node_modules/@tabler/icons-webfont/tabler-icons.css','utf8');
    for(const icon of fixture.structure.icons) expect(css).toContain('.'+icon.split(' ')[1]+':');
});
