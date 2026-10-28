import { defineConfig } from '@playwright/test';

/** 開発サーバーもビルドも起動せず、実ブラウザーでMermaid SVG配色を検証する。 */
export default defineConfig({
    testDir: './e2e',
    testMatch: 'aws-dva-domain4-mermaid.spec.ts',
    workers: 1,
    timeout: 180000,
    reporter: 'line',
    use: { browserName: 'chromium', channel: process.env.PLAYWRIGHT_BROWSER_CHANNEL },
});
