// __tests__/cisco/ccnp-security/page.test.tsx
// @vitest-environment jsdom
import { vi, describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render } from '@testing-library/react';
import inventory from '@/docs/migration-inventory/cisco-ccnp-security.json';
import CcnpSecurityGuide from '@/app/cisco/ccnp-security/CcnpSecurityGuide';
import { defineMigrationSuite, extractBodyContent } from '@/__tests__/helpers/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

defineMigrationSuite(
    'CCNP Security 完全ガイド — 全量移行検証',
    CcnpSecurityGuide,
    inventory,
);

describe('CCNP Security ガイド — リスト・スタイリング検証', () => {
    it('スコープCSSに金色ドットリストと数字バッジのセレクタが定義されている', () => {
        const cssPath = resolve('app/cisco/ccnp-security/page.css');
        let css = '';
        try {
            css = readFileSync(cssPath, 'utf8').replace(/\s+/g, '');
        } catch {
            css = '';
        }
        expect(css).toContain('.ccnp-security-page');
        expect(css).toContain('mainul>li::before');
        expect(css).toContain('mainol>li::before');
        expect(css).toContain('.srclistli::before');
    });
});
