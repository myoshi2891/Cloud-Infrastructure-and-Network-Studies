import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const footerCss = readFileSync(resolve('components/Footer.module.css'), 'utf8');

describe('aws-ai-business-strategist-domain4 — 共通フッター明色対応', () => {
    it('components/Footer.module.css の明色ルールに .aib-domain4-page が登録されている', () => {
        expect(footerCss).toMatch(/\.aib-domain4-page\b/);
    });
});
