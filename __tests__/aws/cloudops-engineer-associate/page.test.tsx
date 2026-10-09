// __tests__/aws/cloudops-engineer-associate/page.test.tsx
// @vitest-environment jsdom
import { vi } from 'vitest';
import inventory from '@/docs/migration-inventory/aws-cloudops-engineer-associate.json';
import CloudOpsGuide from '@/app/aws/cloudops-engineer-associate/CloudOpsGuide';
import { defineMigrationSuite } from '@/__tests__/helpers/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

defineMigrationSuite(
    'AWS Certified CloudOps Engineer - Associate (SOA-C03) 完全ガイド — 全量移行検証',
    CloudOpsGuide,
    inventory,
);
