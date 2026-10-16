import { describe, expect, it } from 'vitest';
import domain1 from '@/docs/migration-inventory/aws-aip-c01-domain1-guide.json';
import domain2 from '@/docs/migration-inventory/aws-aip-c01-domain2-guide.json';
import domain2Fidelity from '@/docs/migration-inventory/aws-aip-c01-domain2-guide.fidelity.json';
import { AIP_DOMAIN1_CORRECTIONS, AIP_DOMAIN2_CORRECTIONS, withSourceCorrections } from '@/__tests__/helpers/aip-source-corrections';

const count = (text: string, part: string) => text.split(part).length - 1;

describe('AIP domain1/2 AWS公式ドキュメントにもとづく訂正', () => {
    it.each([
        ['domain1', domain1, AIP_DOMAIN1_CORRECTIONS],
        ['domain2', domain2, AIP_DOMAIN2_CORRECTIONS],
    ] as const)('%s: 各訂正が原本inventoryの対象箇所に一致する（空振りしない）', (_name, inventory, corrections) => {
        const body = inventory.bodyContent.map(block => block.text).join('\n');
        // 図の定義はinventoryに含まれないため、fidelity fixtureの図も照合対象にする
        const diagrams = inventory === domain2 ? Object.values(domain2Fidelity.guideParts).flatMap(part => part.diagrams).join('\n') : '';
        const target = [body, inventory.td.join('\n'), inventory.listItems.join('\n'), diagrams].join('\n');
        for (const [from] of corrections) expect(count(target, from), from).toBeGreaterThanOrEqual(1);
    });

    it('domain2: カスタムモデルのProvisioned Throughputを条件付きにし、オンデマンドデプロイに触れ、問題5の正解は保持する', () => {
        const corrected = withSourceCorrections(domain2, AIP_DOMAIN2_CORRECTIONS);
        const all = [...corrected.bodyContent.map(block => block.text), ...corrected.td, ...corrected.listItems].join('\n');
        expect(all).not.toContain('Bedrock で使うときは Provisioned Throughput が必要');
        expect(all).not.toContain('Bedrock のカスタムモデル推論には Provisioned Throughput が必要');
        expect(all).not.toContain('カスタムモデルを推論に使うには Provisioned Throughput が必要です');
        const step9 = corrected.listItems.find(item => item.includes('（試験の定番）'));
        expect(step9).toContain('すべてのカスタムモデルで Provisioned Throughput が必須ではなく');
        expect(step9).toContain('オンデマンドデプロイ');
        expect(corrected.td).toContain('カスタムモデルを安定したスループットで本番推論（Bedrock）');
        const misconception = corrected.td.indexOf('カスタムモデルはオンデマンドでも処理能力が確保される');
        expect(misconception).toBeGreaterThanOrEqual(0);
        expect(corrected.td[misconception + 1]).toContain('オンデマンドデプロイも可能');
        // 問題5は「安定したスループット」が前提のため、正解Bの説明として Provisioned Throughput を保持する
        const answer5 = corrected.bodyContent.find(block => block.text.includes('C は Lambda の機能で'))?.text ?? '';
        expect(answer5).toMatch(/^B。問題文は安定したスループットを求めているため/);
        expect(answer5).toContain('Provisioned Throughput');
        expect(answer5).toContain('オンデマンドデプロイ');
    });

    it('domain2: Step 15はDirect Connectのプライベート接続と暗号化を区別し、図diag-22も同じ区別にする', () => {
        const corrected = withSourceCorrections(domain2, AIP_DOMAIN2_CORRECTIONS);
        const cell = corrected.td.find(item => item.startsWith('オンプレミスとAWSのプライベート接続')) ?? '';
        expect(cell).toContain('Direct Connect は既定では暗号化されない');
        for (const method of ['TLS', 'MACsec', 'Site-to-Site VPN']) expect(cell).toContain(method);
        expect(corrected.td.join('\n')).not.toContain('閉域・暗号化接続');
        const chart = withSourceCorrections(domain2Fidelity.guideParts.task3.diagrams, AIP_DOMAIN2_CORRECTIONS).find(item => item.includes('Direct Connect または VPN')) ?? '';
        expect(chart).not.toContain('暗号化された専用経路');
        expect(chart).toContain('|Direct Connect または VPN<br/>プライベート経路<br/>暗号化は TLS MACsec VPN で行う|');
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

    it('domain1: PIIのガードレールはモデル入力をマスクするが呼び出しログはサニタイズしないことを明記する', () => {
        const corrected = withSourceCorrections(domain1, AIP_DOMAIN1_CORRECTIONS);
        expect(corrected.listItems.join('\n')).not.toContain('マスキングするか、ガードレールで保護する');
        const item = corrected.listItems.find(text => text.startsWith('PII は')) ?? '';
        expect(item).toContain('Bedrock へのリクエスト前にマスキング');
        expect(item).toContain('モデル呼び出しログはサニタイズしない');
        expect(item).toContain('呼び出しログを別途保護');
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
