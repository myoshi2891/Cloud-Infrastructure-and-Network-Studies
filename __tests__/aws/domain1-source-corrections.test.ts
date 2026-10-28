import { describe, expect, it } from 'vitest';
import sapFixture from '@/docs/migration-inventory/aws-sap-c02-domain1.fidelity.json';
import scsFixture from '@/docs/migration-inventory/aws-scs-c03-domain1-guide.fidelity.json';
import {
    SAP_DOMAIN1_CORRECTIONS,
    SCS_DOMAIN1_CORRECTIONS,
} from '@/__tests__/helpers/domain1-source-corrections';
import { withSourceCorrections } from '@/__tests__/helpers/aip-source-corrections';

describe.each([
    ['SAP-C02', sapFixture.guideParts, SAP_DOMAIN1_CORRECTIONS],
    ['SCS-C03', scsFixture.guideParts, SCS_DOMAIN1_CORRECTIONS],
] as const)('%s Domain 1 訂正の適用', (_, parts, corrections) => {
    it('訂正対象が原本に存在し、全対象を置換して原本fixtureは保持する', () => {
        const before = JSON.stringify(parts);
        const corrected = JSON.stringify(withSourceCorrections(parts, corrections));
        for (const [from, to] of corrections) {
            expect(before).toContain(from);
            expect(corrected).toContain(to);
        }
        expect(corrected).not.toBe(before);
        expect(JSON.stringify(parts)).toBe(before);
    });
});
