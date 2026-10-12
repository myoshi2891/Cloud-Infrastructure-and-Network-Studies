// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';
import mermaid from 'mermaid';
import type { MermaidConfig } from 'mermaid';
import { DIAGRAMS } from '@/app/aws/developer-associate/domain3/constants';
import pageTheme from '@/app/aws/developer-associate/domain3/mermaid-theme.json';
import fixture from '@/docs/migration-inventory/aws-dva-domain3-deployment.mermaid.json';

// 共通MermaidDiagramが初期化する暗色値を実際のMermaidへ注入する。
const darkSite: MermaidConfig = {
    theme: 'dark', securityLevel: 'loose',
    themeVariables: {
        primaryColor: '#1a73e8', primaryTextColor: '#e8f0fe', primaryBorderColor: '#1a73e8',
        lineColor: '#5f7fb8', secondaryColor: '#0f9d58', tertiaryColor: '#0d1a2e', background: '#060b14',
        mainBkg: '#0f2040', nodeBorder: '#1a73e8', clusterBkg: '#0d1a2e', titleColor: '#e8f0fe',
        edgeLabelBackground: '#0d1a2e', attributeBackgroundColorEven: '#0f2040', attributeBackgroundColorOdd: '#0d1a2e',
        fontSize: '16px',
    },
    flowchart: { curve: 'basis', padding: 20 },
};
const chartWithPageTheme = (chart: string) => `---\nconfig: ${JSON.stringify({ ...pageTheme, themeVariables: { ...pageTheme.themeVariables, fontFamily: '"Noto Sans JP Variable","Noto Sans JP",sans-serif', fontSize: '14px' } })}\n---\n${chart}`;
afterEach(() => mermaid.initialize(darkSite));

describe('DVA Deployment Mermaid 原本配色の独立性', () => {
    it.each(Object.entries(DIAGRAMS))('%s: 共通dark設定に関係なく淡色ノード・濃色文字・原本の枠線', async (_id, chart) => {
        mermaid.initialize(fixture.source as MermaidConfig);
        const original = structuredClone(mermaid.mermaidAPI.getConfig());
        mermaid.initialize(darkSite);
        await mermaid.parse(chartWithPageTheme(chart));
        const actual = mermaid.mermaidAPI.getConfig();
        for (const key of ['mainBkg','nodeBkg','nodeBorder','nodeTextColor','clusterBkg','clusterBorder','titleColor','edgeLabelBackground','defaultLinkColor','primaryColor','primaryTextColor']) {
            expect(actual.themeVariables?.[key], key).toBe(original.themeVariables?.[key]);
        }
        expect(actual.themeVariables?.fontSize).toBe('14px');
        expect(actual.flowchart?.padding).toBe(original.flowchart?.padding);
    });
    it('別のdarkページを解析しても次のライト図へ暗色が残らない', async () => {
        mermaid.initialize(darkSite);
        await mermaid.parse('flowchart TD\nA-->B');
        expect(mermaid.mermaidAPI.getConfig().themeVariables?.mainBkg).toBe('#0f2040');
        await mermaid.parse(chartWithPageTheme(DIAGRAMS.d0));
        expect(mermaid.mermaidAPI.getConfig().themeVariables?.mainBkg).toBe('#e8ebf8');
        expect(mermaid.mermaidAPI.getConfig().themeVariables?.nodeTextColor).toBe('#1f2430');
    });
});
