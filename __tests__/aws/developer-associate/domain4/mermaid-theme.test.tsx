import { render } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import mermaid from 'mermaid';
import type { MermaidConfig } from 'mermaid';
import { Diagram } from '@/app/aws/developer-associate/domain4/Diagram';
import { DIAGRAMS } from '@/app/aws/developer-associate/domain4/constants';
import fixture from '@/docs/migration-inventory/aws-dva-domain4.fidelity.json';

vi.mock('@/components/MermaidDiagram', async () => ({MermaidDiagram:(await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock}));
const darkSite: MermaidConfig = {
    theme:'dark', themeVariables:{primaryColor:'#1a73e8',primaryTextColor:'#e8f0fe',primaryBorderColor:'#1a73e8',mainBkg:'#0f2040',nodeBorder:'#1a73e8',clusterBkg:'#0d1a2e',titleColor:'#e8f0fe',secondaryColor:'#0f9d58',tertiaryColor:'#0d1a2e',background:'#060b14',lineColor:'#5f7fb8',edgeLabelBackground:'#0d1a2e',attributeBackgroundColorEven:'#0f2040',attributeBackgroundColorOdd:'#0d1a2e'},
};
afterEach(() => mermaid.initialize(darkSite));

it.each(Object.keys(DIAGRAMS) as (keyof typeof DIAGRAMS)[])('%s: darkページの設定を継承せず、全描画色が原本単体のライト設定と一致する', async id => {
    mermaid.initialize(fixture.theme as MermaidConfig);
    const expected = structuredClone(mermaid.mermaidAPI.getConfig().themeVariables);
    const {container,unmount} = render(<Diagram id={id} label={id}/>);
    const chart = container.querySelector('[data-chart]')!.getAttribute('data-chart')!;
    expect(chart).toMatch(/^---\nconfig: /);
    mermaid.initialize(darkSite);
    await mermaid.parse('flowchart TD\nA-->B');
    expect(mermaid.mermaidAPI.getConfig().themeVariables?.mainBkg).toBe('#0f2040');
    await mermaid.parse(chart);
    const actual = mermaid.mermaidAPI.getConfig().themeVariables;
    for(const [key,value] of Object.entries(expected ?? {})) {
        if(key === 'fontFamily') continue; // 自己ホストフォントへの対応付けのみ許容
        expect(actual?.[key],id+' '+key).toEqual(value);
    }
    unmount();
});
