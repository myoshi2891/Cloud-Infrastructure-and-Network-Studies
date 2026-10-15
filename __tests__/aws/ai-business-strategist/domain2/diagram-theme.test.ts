import { describe, it, expect } from 'vitest';
import sourceTheme from '@/app/aws/ai-business-strategist/domain2/mermaid-theme.json';
import { DIAGRAMS } from '@/app/aws/ai-business-strategist/domain2/constants';

describe('AWS AIB-C01 Domain 2 Mermaid Theme & Diagrams', () => {
    it('defines explicit light theme variables to prevent global dark theme leakage', () => {
        const tv = sourceTheme.themeVariables;
        expect(tv.background).toBe('#ffffff');
        expect(tv.mainBkg).toBe('#f1e9d8');
        expect(tv.nodeBkg).toBe('#f1e9d8');
        expect(tv.nodeBorder).toBe('#ded2b8');
        expect(tv.primaryColor).toBe('#f1e9d8');
        expect(tv.primaryTextColor).toBe('#2b2420');
        expect(tv.primaryBorderColor).toBe('#ded2b8');
        expect(tv.lineColor).toBe('#5a5048');
        expect(tv.defaultLinkColor).toBe('#5a5048');
        expect(tv.nodeTextColor).toBe('#2b2420');
        expect(tv.clusterBkg).toBe('#faf6ee');
        expect(tv.clusterBorder).toBe('#ded2b8');
    });

    it('contains all 20 diagrams d0 through d19 with proper definitions', () => {
        expect(Object.keys(DIAGRAMS)).toHaveLength(20);
        for (let i = 0; i < 20; i++) {
            const key = `d${i}`;
            expect(DIAGRAMS).toHaveProperty(key);
            expect(DIAGRAMS[key as keyof typeof DIAGRAMS].length).toBeGreaterThan(0);
        }
    });
});
