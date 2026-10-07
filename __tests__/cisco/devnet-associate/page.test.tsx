// __tests__/cisco/devnet-associate/page.test.tsx
// @vitest-environment jsdom
import { vi } from 'vitest';
import inventory from '@/docs/migration-inventory/devnet-associate-guide.json';
import DevNetAssociateGuide from '@/app/cisco/devnet-associate/DevNetAssociateGuide';
import { defineMigrationSuite } from '@/__tests__/helpers/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

defineMigrationSuite(
    'Cisco Certified DevNet Associate (200-901) 初学者向け完全ガイド — 全量移行検証',
    DevNetAssociateGuide,
    inventory,
);
