import { describe, expect, it } from 'vitest';
import { metadata } from '@/app/cisco/ccnp-service-provider/page';

describe('CCNP Service Provider ページの説明文', () => {
    it('実際の収録範囲（アーキテクチャまで）と未収録の領域を明示し、網羅を主張しない', () => {
        const description = String(metadata.description);

        expect(description).toContain('アーキテクチャ');
        expect(description).toContain('未収録');
        for (const topic of ['ルーティング', 'MPLS', 'VPN', '自動化']) {
            expect(description).toContain(topic);
        }
        expect(description).not.toMatch(/網羅|完全/);
    });
});
