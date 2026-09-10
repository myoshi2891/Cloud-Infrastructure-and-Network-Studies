// __tests__/comptia/network-plus/network-troubleshooting-guide/page.test.tsx
// @vitest-environment jsdom
import { vi } from 'vitest';
import inventory from '@/docs/migration-inventory/comptia-network-plus-network-troubleshooting-guide.json';
import Page from '@/app/comptia/network-plus/network-troubleshooting-guide/page';
import { defineMigrationSuite } from '@/__tests__/gcl/agwa/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/gcl/agwa/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

defineMigrationSuite(
    'CompTIA Network+ Domain 5.0 Network Troubleshooting Guide — 全量移行検証',
    Page,
    inventory,
);
