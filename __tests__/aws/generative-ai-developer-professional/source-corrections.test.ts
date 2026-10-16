import { describe, expect, it } from 'vitest';
import domain1 from '@/docs/migration-inventory/aws-aip-c01-domain1-guide.json';
import domain2 from '@/docs/migration-inventory/aws-aip-c01-domain2-guide.json';
import { AIP_DOMAIN1_CORRECTIONS, AIP_DOMAIN2_CORRECTIONS, withSourceCorrections } from '@/__tests__/helpers/aip-source-corrections';

const count = (text: string, part: string) => text.split(part).length - 1;

describe('AIP domain1/2 AWS公式ドキュメントにもとづく訂正', () => {
    it.each([
        ['domain1', domain1, AIP_DOMAIN1_CORRECTIONS],
        ['domain2', domain2, AIP_DOMAIN2_CORRECTIONS],
    ] as const)('%s: 各訂正が原本inventoryの対象箇所に一致する（空振りしない）', (_name, inventory, corrections) => {
        const body = inventory.bodyContent.map(block => block.text).join('\n');
        for (const [from] of corrections) expect(count(body + inventory.td.join('\n'), from), from).toBeGreaterThanOrEqual(1);
    });

    it('domain1: 旧コネクタURLを残さず、廃止日と既存コネクタの継続、Salesforceの対象外を明記する', () => {
        const corrected = withSourceCorrections(domain1, AIP_DOMAIN1_CORRECTIONS);
        expect(corrected.links.map(link => link.href)).not.toContain('https://docs.aws.amazon.com/bedrock/latest/userguide/kb-data-source-connectors.html');
        const connectorCell = corrected.td.find(cell => cell.startsWith('ナレッジベースのコネクタを利用'));
        expect(connectorCell).toContain('2026年9月30日以降');
        expect(connectorCell).toContain('既存のコネクタは取り込みと検索を引き続き利用可能');
        expect(connectorCell).toContain('Salesforce は含まれない');
        expect(corrected.td.find(cell => cell.startsWith('ナレッジベースのウェブクローラーを利用'))).toContain('2026年9月30日以降');
    });

    it('domain2: 検証パターンがtoolSpecと一致し、A123/ のような不正IDを拒否する', () => {
        const corrected = withSourceCorrections(domain2, AIP_DOMAIN2_CORRECTIONS);
        const code = corrected.bodyContent.find(block => block.text.includes('def handler(event, context):'))?.text ?? '';
        const pattern = /re\.compile\(r"([^"]+)"\)/.exec(code)?.[1];
        expect(pattern).toBe('A[0-9A-Z]{4,}');
        expect(code).toContain('ORDER_ID_PATTERN.fullmatch(order_id)');
        expect(code).not.toContain('startswith');
        // Python の fullmatch と同じく全体一致で判定する
        const fullmatch = new RegExp(`^(?:${pattern})$`);
        expect(['A1234', 'AB12C', 'A0000Z'].every(id => fullmatch.test(id))).toBe(true);
        expect(['A123/', 'A12', 'a1234', 'B1234', 'A12345\n', 'Aabcd'].some(id => fullmatch.test(id))).toBe(false);
    });

    it('domain2: エラー集計はerrorCodeを出力するアプリログを対象にし、呼び出しログのトークン集計は保持する', () => {
        const corrected = withSourceCorrections(domain2, AIP_DOMAIN2_CORRECTIONS);
        const queries = corrected.bodyContent.filter(block => block.text.includes('| filter')).map(block => block.text);
        expect(queries[0]).toMatch(/^# アプリが出力する構造化エラーログが対象.*errorCode がない）\nfields @timestamp, requestId, modelId, errorCode\n\| filter ispresent\(errorCode\)/);
        expect(queries[0]).not.toContain('inputTokenCount');
        expect(queries[1]).toContain('input.inputTokenCount as inTok');
    });
});
