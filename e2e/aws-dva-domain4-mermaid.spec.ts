import { expect, test } from '@playwright/test';
import type mermaid from 'mermaid';
import source from '../docs/migration-inventory/aws-dva-domain4.fidelity.json';
import renderTheme from '../app/aws/developer-associate/domain4/render-theme.json';
import { DIAGRAMS } from '../app/aws/developer-associate/domain4/constants';

test('全34 SVGのノード・グループ・ラベル配色が原本単体と一致する', async ({page}) => {
    await page.setContent('<html><body><div id="target"></div></body></html>');
    await page.addScriptTag({path:'node_modules/mermaid/dist/mermaid.min.js'});
    const results = await page.evaluate(async ({charts,sourceTheme,targetTheme}) => {
        const api = (window as unknown as {mermaid:typeof mermaid}).mermaid;
        const target = document.getElementById('target')!;
        const draw = async (id:string,chart:string) => {
            const {svg} = await api.render(id,chart);
            target.innerHTML = svg;
            const colors = [...target.querySelectorAll('.node rect,.node polygon,.node circle,.node path,.cluster rect,.nodeLabel,.cluster-label,.edgeLabel')].map(el => {
                const style = getComputedStyle(el);
                return {tag:el.tagName,fill:style.fill,stroke:style.stroke,color:style.color};
            });
            target.replaceChildren();
            return colors;
        };
        const results = [];
        for(const [id,chart] of Object.entries(charts)) {
            api.initialize(sourceTheme as Parameters<typeof api.initialize>[0]);
            const expected = await draw('original-'+id,chart);
            const dark: Parameters<typeof api.initialize>[0] = {theme:'dark',themeVariables:{primaryColor:'#1a73e8',primaryTextColor:'#e8f0fe',mainBkg:'#0f2040',clusterBkg:'#0d1a2e',nodeBorder:'#1a73e8',titleColor:'#e8f0fe',background:'#060b14',secondaryColor:'#0f9d58',tertiaryColor:'#0d1a2e'}};
            api.initialize(dark);
            const before = await draw('before-'+id,`---\nconfig: ${JSON.stringify(sourceTheme)}\n---\n${chart}`);
            api.initialize(dark);
            const actual = await draw('migrated-'+id,`---\nconfig: ${JSON.stringify(targetTheme)}\n---\n${chart}`);
            results.push({id,expected,actual,before});
        }
        return results;
    },{charts:DIAGRAMS,sourceTheme:source.theme,targetTheme:renderTheme});
    expect(results).toHaveLength(34);
    const affected = results.filter(item => JSON.stringify(item.before) !== JSON.stringify(item.expected));
    expect(affected.length,'修正前のSVG配色不一致を実際に再現する').toBeGreaterThan(0);
    console.log('修正前の配色不一致: '+affected.length+'/34図（'+affected.map(item => item.id).join(', ')+')。修正後: 全34図で原本と一致。');
    for(const {id,expected,actual} of results) {
        expect(expected.length,id+' shapes').toBeGreaterThan(0);
        expect(actual,id+' computed SVG colors').toEqual(expected);
    }
});
