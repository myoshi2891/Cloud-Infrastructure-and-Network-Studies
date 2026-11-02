// __tests__/aws/security-specialty/domain2/appendix.test.tsx
// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Appendix from '@/app/aws/security-specialty/domain2/sections/Appendix';

describe('Appendix Section (Reference URLs and Notes)', () => {
    it('renders appendix headings', () => {
        const { container } = render(<Appendix />);
        const h2Texts = [...container.querySelectorAll('h2')].map((h) => h.textContent?.trim());
        expect(h2Texts).toContain('8. 参考 URL 一覧');
        expect(h2Texts).toContain('9. 検証できなかった点と注意事項');

        const h3Texts = [...container.querySelectorAll('h3')].map((h) => h.textContent?.trim());
        expect(h3Texts).toContain('8.1 試験ガイド (一次情報)');
        expect(h3Texts).toContain('8.2 インシデントレスポンスの基本');
        expect(h3Texts).toContain('8.3 準備・自動化・テスト');
        expect(h3Texts).toContain('8.4 ログ・調査・根本原因分析');
    });

    it('renders reference tables with thead and scope=col', () => {
        const { container } = render(<Appendix />);
        const tables = container.querySelectorAll('table');
        expect(tables.length).toBeGreaterThanOrEqual(4);
        tables.forEach((table) => {
            expect(table.querySelector('thead th[scope="col"]')).not.toBeNull();
        });
    });

    it('renders external links with valid http/https URLs', () => {
        const { container } = render(<Appendix />);
        const links = container.querySelectorAll('a[href^="http"]');
        expect(links.length).toBeGreaterThanOrEqual(20);
    });
});

