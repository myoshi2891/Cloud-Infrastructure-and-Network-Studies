import { defineConfig } from '@playwright/test';
import base from './playwright.config';

/** Tanenbaum移行のブラウザ検証はユーザー指定の3001番を使用する。 */
export default defineConfig({
    ...base,
    testMatch: 'computer-networks-tanenbaum.spec.ts',
    use: { ...base.use, baseURL: 'http://localhost:3001' },
    webServer: {
        command: 'bun run dev --port 3001',
        url: 'http://localhost:3001',
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
    },
});
