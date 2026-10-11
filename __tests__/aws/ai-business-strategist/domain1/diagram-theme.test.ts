import { describe, it, expect } from 'vitest';
import sourceTheme from '@/app/aws/ai-business-strategist/domain1/mermaid-theme.json';
import { DIAGRAMS } from '@/app/aws/ai-business-strategist/domain1/constants';

describe('AWS AIB-C01 Domain 1 Mermaid Theme & Diagrams', () => {
    it('defines explicit light theme variables to prevent global dark theme leakage', () => {
        const tv = sourceTheme.themeVariables;
        expect(tv.mainBkg).toBe('#eef0fd');
        expect(tv.nodeBkg).toBe('#eef0fd');
        expect(tv.nodeBorder).toBe('#4338ca');
        expect(tv.primaryColor).toBe('#eef0fd');
        expect(tv.primaryTextColor).toBe('#2b2620');
        expect(tv.primaryBorderColor).toBe('#4338ca');
        expect(tv.lineColor).toBe('#9a93c9');
        expect(tv.defaultLinkColor).toBe('#9a93c9');
    });

    it('contains all 16 diagrams d0 through d15 with proper definitions', () => {
        expect(Object.keys(DIAGRAMS)).toHaveLength(16);
        for (let i = 0; i < 16; i++) {
            const key = `d${i}`;
            expect(DIAGRAMS).toHaveProperty(key);
            expect(DIAGRAMS[key as keyof typeof DIAGRAMS].length).toBeGreaterThan(0);
        }
    });

    it('ensures diagram d10 has all nodes including monitoring and correction loop', () => {
        const d10 = DIAGRAMS.d10;
        expect(d10).toContain('本番で AI を稼働');
        expect(d10).toContain('入出力と成果指標を記録');
        expect(d10).toContain('基準線 ベースライン と比較');
        expect(d10).toContain('しきい値を超えたか');
        expect(d10).toContain('アラートで担当者に通知');
        expect(d10).toContain('原因を調べる データ プロンプト 環境の変化');
        expect(d10).toContain('対処 データ更新 再学習 プロンプトやRAG更新 一時停止');
        expect(d10).toContain('再評価して再展開');
    });
});
