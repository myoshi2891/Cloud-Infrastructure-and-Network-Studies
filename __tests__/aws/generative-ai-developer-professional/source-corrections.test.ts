import { describe, expect, it } from 'vitest';
import domain1 from '@/docs/migration-inventory/aws-aip-c01-domain1-guide.json';
import domain2 from '@/docs/migration-inventory/aws-aip-c01-domain2-guide.json';
import domain1Fidelity from '@/docs/migration-inventory/aws-aip-c01-domain1-guide.fidelity.json';
import domain2Fidelity from '@/docs/migration-inventory/aws-aip-c01-domain2-guide.fidelity.json';
import domain3 from '@/docs/migration-inventory/aws-aip-c01-domain3-guide.json';
import domain4 from '@/docs/migration-inventory/aws-aip-c01-domain4-guide.json';
import { AIP_DOMAIN1_CORRECTIONS, AIP_DOMAIN2_CORRECTIONS, AIP_DOMAIN3_CORRECTIONS, AIP_DOMAIN4_CORRECTIONS, AIP_DOMAIN4_REFERENCE_ROWS, withSourceCorrections } from '@/__tests__/helpers/aip-source-corrections';

const count = (text: string, part: string) => text.split(part).length - 1;

describe('AIP domain1/2 AWS公式ドキュメントにもとづく訂正', () => {
    it.each([
        ['domain1', domain1, AIP_DOMAIN1_CORRECTIONS],
        ['domain2', domain2, AIP_DOMAIN2_CORRECTIONS],
    ] as const)('%s: 各訂正が原本inventoryの対象箇所に一致する（空振りしない）', (_name, inventory, corrections) => {
        const body = inventory.bodyContent.map(block => block.text).join('\n');
        // 図の定義はinventoryに含まれないため、fidelity fixtureの図も照合対象にする
        const fidelity = inventory === domain2 ? domain2Fidelity : domain1Fidelity;
        const diagrams = Object.values(fidelity.guideParts).flatMap(part => part.diagrams).join('\n');
        const target = [body, inventory.td.join('\n'), inventory.listItems.join('\n'), diagrams].join('\n');
        for (const [from] of corrections) expect(count(target, from), from).toBeGreaterThanOrEqual(1);
    });

    it.each([
        ['domain3', domain3, AIP_DOMAIN3_CORRECTIONS],
        ['domain4', domain4, AIP_DOMAIN4_CORRECTIONS],
    ] as const)('%s: 各訂正が原本inventoryの本文・表セル・リスト項目に一致する（空振りしない）', (_name, inventory, corrections) => {
        const target = [...inventory.bodyContent.map(block => block.text), ...inventory.td, ...inventory.listItems].join('\n');
        for (const [from] of corrections) expect(count(target, from), from).toBeGreaterThanOrEqual(1);
    });

    it('domain3: 公平性メトリクスはアプリが算出してCloudWatchへ発行し、事前定義の指標とは書かない', () => {
        const corrected = withSourceCorrections(domain3, AIP_DOMAIN3_CORRECTIONS);
        const skill = corrected.bodyContent.find(block => block.text.includes('Skill 3.4.2:'))?.text ?? '';
        expect(skill).not.toContain('事前定義');
        expect(skill).toContain('アプリケーション側で公平性メトリクスを算出して CloudWatch にカスタムメトリクスとして発行');
    });

    it('domain3: Q2はGuardrailIdentifier条件キーが効く4つの推論APIに要件を限定し、解説も同じ範囲にする', () => {
        const corrected = withSourceCorrections(domain3, AIP_DOMAIN3_CORRECTIONS);
        const texts = corrected.bodyContent.map(block => block.text);
        const apis = 'Converse、ConverseStream、InvokeModel、InvokeModelWithResponseStream';
        expect(texts).toContain(`社内の全開発者が Bedrock の推論 API（${apis}）を呼ぶ際、必ず特定のガードレールを使わせたい。`);
        expect(texts).toContain('答え: B。条件キーで、これら 4 つの推論 API でガードレールなしの呼び出しを拒否できる。');
        expect(texts).not.toContain('社内の全開発者が Bedrock を呼ぶ際、必ず特定のガードレールを使わせたい。');
    });

    it('domain4: 直列ステップは所要時間の合計、最も遅い経路は並列時だけとし、キャッシュのトークン数を別に扱う', () => {
        const corrected = withSourceCorrections(domain4, AIP_DOMAIN4_CORRECTIONS);
        const workflow = corrected.bodyContent.find(block => block.text.includes('複数ステップの連鎖です'))?.text ?? '';
        expect(workflow).toContain('各ステップの所要時間の合計');
        expect(workflow).toContain('並列実行している場合だけ');
        expect(workflow).not.toContain('最も遅いステップ');
        const metric = corrected.td.indexOf('InputTokenCount / OutputTokenCount / CacheReadInputTokenCount / CacheWriteInputTokenCount');
        expect(metric).toBeGreaterThanOrEqual(0);
        expect(corrected.td[metric + 1]).toBe('入出力トークン数');
        expect(corrected.td[metric + 2]).toContain('読み取りは通常の入力より割安、書き込みは割高');
        expect(corrected.td[metric + 2]).toContain('クォータ');
    });

    it('domain4: HYBRIDの対応ストアをOpenSearch Serverless・RDS (Aurora PostgreSQL)・MongoDB Atlasとし、Step 22に根拠ページを足す', () => {
        const corrected = withSourceCorrections(domain4, AIP_DOMAIN4_CORRECTIONS, AIP_DOMAIN4_REFERENCE_ROWS);
        const hybrid = corrected.listItems.find(item => item.includes('HYBRID または SEMANTIC')) ?? '';
        expect(hybrid).toContain('Amazon OpenSearch Serverless、Amazon RDS (Aurora PostgreSQL)、MongoDB Atlas');
        expect(hybrid).toContain('フィルタ可能なテキストフィールドを持たない構成では SEMANTIC');
        expect(hybrid).not.toContain('(他の構成では SEMANTIC のみ)');
        const kbTestConfig = 'https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-config.html';
        const standardApi = domain4.td.indexOf('https://docs.aws.amazon.com/bedrock/latest/APIReference/API_agent-runtime_KnowledgeBaseVectorSearchConfiguration.html');
        expect(corrected.td.slice(standardApi + 1, standardApi + 5)).toEqual(['確認済み', '4.2.2', expect.stringContaining('HYBRID の対応ベクトルストア'), kbTestConfig]);
        expect(corrected.td).toHaveLength(domain4.td.length + 4);
        expect(corrected.links.map(link => link.href).filter(href => href === kbTestConfig)).toHaveLength(1);
        expect(corrected.links).toHaveLength(domain4.links.length + 1);
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

    it('domain1: 旧コネクタURLを残さず、廃止日と既存コネクタの継続、Managed Knowledge BaseのSalesforce対応を明記する', () => {
        const corrected = withSourceCorrections(domain1, AIP_DOMAIN1_CORRECTIONS);
        expect(corrected.links.map(link => link.href)).not.toContain('https://docs.aws.amazon.com/bedrock/latest/userguide/kb-data-source-connectors.html');
        const connectorCell = corrected.td.find(cell => cell.startsWith('ナレッジベースのコネクタを利用'));
        expect(connectorCell).toContain('2026年9月30日以降');
        expect(connectorCell).toContain('既存のコネクタは取り込みと検索を引き続き利用可能');
        expect(connectorCell).toContain('Confluence、SharePoint、Salesforce のネイティブコネクタを提供する');
        expect(corrected.td.find(cell => cell.startsWith('ナレッジベースのウェブクローラーを利用'))).toContain('2026年9月30日以降');
    });

    it('domain1: Salesforceコネクタは文書単位のACLに対応せず、保護が必要な内容はサーバー側で別途認可すると明記する', () => {
        const corrected = withSourceCorrections(domain1, AIP_DOMAIN1_CORRECTIONS);
        const connectorCell = corrected.td.find(cell => cell.startsWith('ナレッジベースのコネクタを利用')) ?? '';
        expect(connectorCell).toContain('Salesforce コネクタは文書単位の ACL に対応しない');
        expect(connectorCell).toContain('クロールした Salesforce のコンテンツはナレッジベースの利用者全員が取得できる');
        expect(connectorCell).toContain('保護が必要な内容はサーバー側で別途認可を行う');
    });

    it('domain1: Task 1.5の埋め込みの出典を、ナレッジベースが埋め込みを作成・検索する仕組みのページへ差し替える', () => {
        const corrected = withSourceCorrections(domain1, AIP_DOMAIN1_CORRECTIONS);
        const hrefs = corrected.links.map(link => link.href);
        expect(hrefs).not.toContain('https://docs.aws.amazon.com/bedrock/latest/userguide/embeddings.html');
        expect(hrefs).toContain('https://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-it-works.html');
        const citation = corrected.bodyContent.find(block => block.text.startsWith('出典: Bedrock Embeddings の考え方'))?.text ?? '';
        expect(citation).toBe('出典: Bedrock Embeddings の考え方 https://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-it-works.html');
    });

    it('domain1: PIIのガードレールはモデル入力をマスクするが呼び出しログはサニタイズしないことを明記する', () => {
        const corrected = withSourceCorrections(domain1, AIP_DOMAIN1_CORRECTIONS);
        expect(corrected.listItems.join('\n')).not.toContain('マスキングするか、ガードレールで保護する');
        const item = corrected.listItems.find(text => text.startsWith('PII は')) ?? '';
        expect(item).toContain('Bedrock へのリクエスト前にマスキング');
        expect(item).toContain('モデル呼び出しログはサニタイズしない');
        expect(item).toContain('呼び出しログを別途保護');
    });

    it('domain1: Task 1.4はKnowledge BasesをマネージドRAGとして区別し、userContextはACL対応ソースに限定する', () => {
        const corrected = withSourceCorrections(domain1, AIP_DOMAIN1_CORRECTIONS);
        const kbCell = corrected.td.find(cell => cell.startsWith('Bedrock Knowledge Bases(マネージド')) ?? '';
        expect(kbCell).toContain('マネージド RAG');
        expect(kbCell).toContain('ベクトルストアではなく');
        for (const store of ['Amazon OpenSearch Service / Serverless', 'Amazon Aurora PostgreSQL + pgvector', 'Amazon DynamoDB(ベクトルインデックス)', 'Amazon S3 Vectors']) expect(corrected.td).toContain(store);
        const item = corrected.listItems.find(text => text.startsWith('権限属性を持たせ')) ?? '';
        expect(item).toContain('制限のあるすべてのデータソースが ACL に対応している場合に限る');
        expect(item).toContain('ACL 非対応のデータソースでは認証済み ID からサーバー側で生成したメタデータフィルター');
        expect(item).toContain('クライアントが送ってきた権限フィルターをそのまま使ってはならない');
    });

    it('domain1: 図diag-11は関数呼び出し・MCPの検索ツールを回答生成より前に置き、その結果を回答に渡す', () => {
        const charts = withSourceCorrections(Object.values(domain1Fidelity.guideParts).flatMap(part => part.diagrams), AIP_DOMAIN1_CORRECTIONS);
        const chart = charts.find(item => item.includes('1.5.6 関数呼び出しや MCP')) ?? '';
        expect(chart).not.toContain('FM --> ACC');
        expect(chart).not.toContain('CTX --> FM');
        expect(chart).toContain('CTX --> ACC["1.5.6 関数呼び出しや MCP で FM から検索を利用"]');
        expect(chart).toContain('ACC -->|"検索結果をツール結果として FM へ返す"| FM["FM が回答を生成"]');
        // ACC の定義は1回だけ（ノードの重複定義を残さない）
        expect(count(chart, 'ACC["')).toBe(1);
    });

    it('domain2: 推論プロファイルは全リージョンの基盤モデル許可が必要で、直接呼び出し防止にInferenceProfileArn条件を勧める', () => {
        const corrected = withSourceCorrections(domain2, AIP_DOMAIN2_CORRECTIONS);
        const note = corrected.bodyContent.find(block => block.text.startsWith('Resource を * にしない'))?.text ?? '';
        expect(note).not.toContain('そのARNも含めて指定します');
        expect(note).toContain('プロファイルに関連付けられたすべてのリージョンの基盤モデル ARN も許可');
        expect(note).toContain('AccessDeniedException');
        expect(note).toContain('bedrock:InferenceProfileArn');
        expect(note).toContain('基盤モデルの直接呼び出しを防ぐ');
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
